// enumerated constants for some types of elements
const element_types =
{
  NODE: "node",
  LINK: "link",
  USE: "use"
}

const NUM_LAYERS = 3;
const OPTS_PAT_ID = "pat_opts";

// objects for policy- and visual-related data
var pol;
var vis;

// arrays for nodes and links
var nodes;
var links = [];

// arrays for node, link, and use types
var node_types;
var link_types;
var use_types;

// object for the saved element
var saved_elt = null;
// array of ids of nodes connected with the saved element
var saved_elt_connected_nodes_ids = [];

// selection of svg to contain the main body of the graph
var svg_s = d3.select("#canvas");
// selection of g to be placed at center of the graph
var g_s = svg_s.append("g");

// selections of div containers for panels and related display elements
var node_panel_box_s = d3.select("#node_panel_box");
var link_panel_box_s = d3.select("#link_panel_box");

// selections of div panels to display additional information about nodes and links
var node_panel_s = node_panel_box_s.select("#node_panel");
var link_panel_s = link_panel_box_s.select("#link_panel");

// selections of divs to display information about options available to the user regarding the data as well as
// permitted actions that can be performed by the entity handling the data
var node_panel_opts_box_s = node_panel_s.select("#node_panel_opts_box");
var node_panel_actions_box_s = node_panel_s.select("#node_panel_actions_box");

// selection of svg to display graphic above link panel
var link_panel_graphic_s = link_panel_box_s.select("#link_panel_graphic");

// selection of panel close buttons
var panel_close_btns_s = d3.selectAll(".close_btn");

// array containing radii of background circles
var bg_circles_rs;

// node-mapping object to generate tree
var root;
// D3 tree to organize nodes
var tree = d3.tree();

// selection of nodes to represent personal data
var nodes_s;
// selection of links to connect nodes
var links_s;

// central node
var central_node;
// array of primary nodes, direct successors of the central node in layer 1 that are not all-data nodes
var primary_nodes = [];



// return the node with a given id
function nodeById(id)
{
  return nodes.find(n => n.id == id);
}

// return the link with a given id
function linkById(id)
{
  return links.find(l => l.id == id);
}

// return the node type with a given id
function nodeTypeById(id)
{
  return node_types.find(t => t.id == id);
}

// return the link type with a given id
function linkTypeById(id)
{
  return link_types.find(t => t.id == id);
}

// return the use type with a given id
function useTypeById(id)
{
  return use_types.find(t => t.id == id);
}

// return the radius of a node
function nodeRadius(n)
{
  if(n.layer == 0)
  {
    return vis.display.r * vis.node.dist_from_center_proportions[1];
  }
  return vis.node.r;
}

// return a string containing the points for a link polyline arrow pointing down, given a link
function linkArrowPoints(l)
{
  var source = nodeById(l.source);
  var dest = nodeById(l.dest);
  var len = linkLen(source.x, source.y, dest.x, dest.y, dest.r + vis.node.outline_width +
    vis.link.head_to_node_dist);
  return linkPointsFromLen(len);
}

// return the length of a link polyline arrow, given relevant values
function linkLen(source_x, source_y, dest_x, dest_y, subtract_len)
{
  return Math.sqrt( Math.pow((dest_x - source_x), 2) + Math.pow((dest_y - source_y), 2)) - subtract_len;
}

// return a string containing the points for a link polyline arrow pointing down, given its length
function linkPointsFromLen(len)
{
  var len_to_head = len - vis.link.head_len;
  var w1 = vis.link.width / 2;
  var w2 = vis.link.head_width / 2;
  return "0 0, " +
    w1 + " 0, " +
    w1 + " " + len_to_head + ", " +
    w2 + " " + len_to_head + ", " +
    "0 " + len + ", " +
    -w2 + " " + len_to_head + ", " +
    -w1 + " " + len_to_head + ", " +
    -w1 + " 0, 0 0";
}

// return the degrees by which a link needs to be rotated counterclockwise from pointing straight down in order to
// point in the right direction
function linkRotation(l)
{
  var source = nodeById(l.source);
  var dest = nodeById(l.dest);
  var theta = Math.atan2((source.y - dest.y), (source.x - dest.x));
  return theta * 180 / Math.PI + 90;
}

// return the outline color of a node
function nodeOutlineColor(n)
{
  if(n.identifiable)
  {
    return vis.node.outline_color_identifiable;
  }
  return vis.node.outline_color_unidentifiable;
}

// return the fill color of a link
function linkFillColor(l)
{
  var n = nodeById(l.dest);
  if(n.all_data)
  {
    return vis.link.fill_color_all_data;
  }
  if(n.identifiable)
  {
    return vis.link.fill_color_identifiable;
  }
  return vis.link.fill_color_unidentifiable;
}

// return the fill color of a link, given its destination id
function linkFillColorByDestId(id)
{
  var n = nodeById(id);
  if(n.all_data)
  {
    return vis.link.fill_color_all_data;
  }
  if(n.identifiable)
  {
    return vis.link.fill_color_identifiable;
  }
  return vis.link.fill_color_unidentifiable;
}

// return the outline color of a link
function linkOutlineColor(l)
{
  if(nodeById(l.dest).identifiable)
  {
    return vis.link.outline_color_identifiable;
  }
  return vis.link.outline_color_unidentifiable;
}

// return the outline color of a link, given its destination id
function linkOutlineColorByDestId(id)
{
  if(nodeById(id).identifiable)
  {
    return vis.link.outline_color_identifiable;
  }
  return vis.link.outline_color_unidentifiable;
}

// return the fill color of a use type
function useTypeFillColor(t)
{
  if(t.all_data)
  {
    return vis.use_icon.fill_color_all_data;
  }
  else if(t.unknown)
  {
    return vis.use_icon.fill_color_unknown;
  }
  return vis.use_icon.fill_color_normal;
}

// return the fill pattern of a node
function getNodePat(n)
{
  return n.identifiable ? "url(#pat_" + n.type + "_identifiable)"
                        : "url(#pat_" + n.type + "_unidentifiable)";
}

// return the icon fill pattern of a link
function getLinkPat(l)
{
  return nodeById(l.dest).identifiable ? "url(#pat_" + l.type + "_identifiable)"
                                       : "url(#pat_" + l.type + "_unidentifiable)";
}

// return the icon fill pattern of a use, given its type id
function getUsePatByTypeId(id)
{
  return "url(#pat_" + id + ")";
}

// return the fill pattern of an options icon
function getOptsPat()
{
  return "url(#" + OPTS_PAT_ID + ")";
}

// set up patterns to fill nodes, link icons, use icons, and other svg elements
function setUpPats()
{
  // node patterns
  var node_pats_identifiable = svg_s.select("defs").selectAll(".node_pat_identifiable")
    .data(node_types)
    .enter()
    .append("pattern")
      .attr("id", d => "pat_" + d.id + "_identifiable")
      .classed(".node_pat_identifiable", true)
      .attr("width", "1")
      .attr("height", "1")
      .attr("patternContentUnits", "objectBoundingBox");
  node_pats_identifiable.append("circle")
    .attr("cx", ".5")
    .attr("cy", ".5")
    .attr("r", ".5")
    .attr("fill", d => d.all_data ? vis.node.fill_color_all_data : vis.node.fill_color_identifiable);
  node_pats_identifiable.append("image")
    .attr("x", ".2")
    .attr("y", ".2")
    .attr("width", ".6")
    .attr("height", ".6")
    .attr("href", d => d.image_identifiable);

  var node_pats_unidentifiable = svg_s.select("defs").selectAll(".node_pat_unidentifiable")
    .data(node_types)
    .enter()
    .append("pattern")
      .attr("id", d => "pat_" + d.id + "_unidentifiable")
      .classed(".node_pat_unidentifiable", true)
      .attr("width", "1")
      .attr("height", "1")
      .attr("patternContentUnits", "objectBoundingBox");
  node_pats_unidentifiable.append("circle")
    .attr("cx", ".5")
    .attr("cy", ".5")
    .attr("r", ".5")
    .attr("fill", d => d.all_data ? vis.node.fill_color_all_data : vis.node.fill_color_unidentifiable);
  node_pats_unidentifiable.append("image")
    .attr("x", ".2")
    .attr("y", ".2")
    .attr("width", ".6")
    .attr("height", ".6")
    .attr("href", d => d.image_unidentifiable);

  // link patterns
  var link_pats_identifiable = svg_s.select("defs").selectAll(".link_pat_identifiable")
    .data(link_types)
    .enter()
    .append("pattern")
      .attr("id", d => "pat_" + d.id + "_identifiable")
      .classed(".link_pat_identifiable", true)
      .attr("width", "1")
      .attr("height", "1")
      .attr("patternContentUnits", "objectBoundingBox");
  link_pats_identifiable.append("circle")
    .attr("cx", ".5")
    .attr("cy", ".5")
    .attr("r", ".5")
    .attr("fill", d => d.all_data ? vis.node.fill_color_all_data : vis.link.fill_color_identifiable);
  link_pats_identifiable.append("image")
    .attr("x", ".2")
    .attr("y", ".2")
    .attr("width", ".6")
    .attr("height", ".6")
    .attr("href", d => d.image_identifiable);

  var link_pats_unidentifiable = svg_s.select("defs").selectAll(".link_pat_unidentifiable")
    .data(link_types)
    .enter()
    .append("pattern")
      .attr("id", d => "pat_" + d.id + "_unidentifiable")
      .classed(".link_pat_unidentifiable", true)
      .attr("width", "1")
      .attr("height", "1")
      .attr("patternContentUnits", "objectBoundingBox");
  link_pats_unidentifiable.append("circle")
    .attr("cx", ".5")
    .attr("cy", ".5")
    .attr("r", ".5")
    .attr("fill", d => d.all_data ? vis.node.fill_color_all_data : vis.link.fill_color_unidentifiable);
  link_pats_unidentifiable.append("image")
    .attr("x", ".2")
    .attr("y", ".2")
    .attr("width", ".6")
    .attr("height", ".6")
    .attr("href", d => d.image_unidentifiable);

  // use icon patterns
  var use_pats = svg_s.select("defs").selectAll(".use_pat")
    .data(use_types)
    .enter()
    .append("pattern")
      .attr("id", d => "pat_" + d.id)
      .classed(".use_pat", true)
      .attr("width", "1")
      .attr("height", "1")
      .attr("patternContentUnits", "objectBoundingBox");
  use_pats.append("circle")
    .attr("cx", ".5")
    .attr("cy", ".5")
    .attr("r", ".5")
    .attr("fill", useTypeFillColor);
  use_pats.append("image")
    .attr("x", ".2")
    .attr("y", ".2")
    .attr("width", ".6")
    .attr("height", ".6")
    .attr("href", d => d.image);

  // options icon pattern
  var opts_pat = svg_s.select("defs").append("pattern")
    .attr("id", OPTS_PAT_ID)
    .attr("width", "1")
    .attr("height", "1")
    .attr("patternContentUnits", "objectBoundingBox");
  opts_pat.append("circle")
    .attr("cx", ".5")
    .attr("cy", ".5")
    .attr("r", ".5")
    .attr("fill", vis.opts_node_icon.fill_color);
  opts_pat.append("image")
    .attr("x", ".2")
    .attr("y", ".2")
    .attr("width", ".6")
    .attr("height", ".6")
    .attr("href", vis.opts_icon.image);
}

// helper function to recursively create a stick with the child at the bottom and num_ancestors ancestors
function makeStick(child, num_ancestors)
{
  return num_ancestors <= 0 ? child
                            : makeStick({ id: null, children: [child] }, num_ancestors - 1);
}

// recursively create a tree, given the root
function makeTree(root)
{
  // make a copy of the root's successor links
  var successor_links = root.successor_links.slice();

  // if there are no successor links, then return the root as a leaf
  if(successor_links.length == 0)
  {
    return { id: root.id, children: [], siblings: [] };
  }
  // else if there are successor links, then return the root's branch
  else
  {
    var children = [];
    var siblings = [];

    // iterate through successor links
    for(let i = 0; i < successor_links.length; i++)
    {
      let s = nodeById(successor_links[i].successor_id);
      let s_branch = makeTree(s);

      // if the successor is in a higher layer than the root, then add it as a child
      if(s.layer > root.layer)
        children.push(makeStick(s_branch, s.layer - root.layer - 1));
      // else if the successor is in the same layer as the root, then add it as a sibling
      else if(s.layer == root.layer)
        siblings.push(makeTree(s));

      // add the successor's siblings as children of the root
      for(let j = 0; j < s_branch.siblings.length; j++)
      {
        children.push(makeStick(s_branch.siblings[j], s.layer - root.layer - 1));
      }
    }

    // return a tree
    return { id: root.id, children: children, siblings: siblings };
  }
}

// update the node panel based on a node
function updateNodePanel(n)
{
  // set color of panel based on whether data is identifiable or not
  var fill_color;
  var outline_color;
  if(n.identifiable)
  {
    fill_color = vis.node_panel.fill_color_identifiable;
    outline_color = vis.node_panel.outline_color_identifiable;
  }
  else
  {
    fill_color = vis.node_panel.fill_color_unidentifiable;
    outline_color = vis.node_panel.outline_color_unidentifiable;
  }
  node_panel_s
    .style("background-color", fill_color)
    .style("border-color", outline_color);


  // set basic panel text
  node_panel_s.select("h1")
    .html(n.label);
  node_panel_s.select("p")
    .html(n.text);

  // set information about options regarding the node
  if(n.opts)
  {
    node_panel_opts_box_s.select("p")
      .html(n.opts_text);
    node_panel_opts_box_s.style("display", "flex");
  }
  else
  {
    node_panel_opts_box_s.style("display", "none");
  }

  // combine uses and links into one array of permitted actions that can be performed on data
  var actions = [];
  // list to prevent the same types of links from being displayed multiple times
  var track_links = [];
  // string to record the id of the all-data use if found, and null otherwise
  var use_all_data = null;
  for(let i = 0; i < n.uses.length; i++)
  {
    if(! useTypeById(n.uses[i]).all_data)
    {
      actions.push({type:n.uses[i], elt_type:element_types.USE});
    }
    else
    {
      use_all_data = n.uses[i];
    }
  }
  for(let i = 0; i < n.successor_links.length; i++)
  {
    let l = n.successor_links[i];
    if(! track_links.includes(l.type) && ! linkTypeById(l.type).all_data)
    {
      actions.push(l);
      actions[actions.length - 1].elt_type = element_types.LINK;
      track_links.push(l.type);
    }
  }
  if(use_all_data != null)
  {
    actions.push({type:use_all_data, elt_type:element_types.USE});
  }

  // if there are no actions to display, then hide the section
  if(actions.length == 0)
  {
    node_panel_actions_box_s
      .style("display", "none");
  }
  // if there are actions to display, then display them
  else
  {
    node_panel_actions_box_s
      .style("display", "block");

    // update the heading
    node_panel_actions_box_s.select("h2")
      .html(n.data_handler + " can use this data to...");

    // remove existing action divs
    node_panel_actions_box_s.selectAll("div").remove();

    // add action divs to the panel
    var action_divs_s = node_panel_actions_box_s.selectAll("div")
      .data(actions)
      .enter().append("div")
        .classed("panel_list_item_box", true)
        .style("border-bottom", vis.node_panel.outline_width + "px solid " + outline_color);

    // remove bottom border from last action div
    node_panel_actions_box_s.select("div:last-child")
      .style("border-bottom", "none");

    // add icons and text to the action divs
    var icon_r_full = vis.use_icon.r + vis.use_icon.outline_width;
    var action_divs_svgs_s = action_divs_s.append("svg")
      .attr("height", icon_r_full * 2 + "px");
    var action_divs_use_svgs_s = action_divs_svgs_s.filter(d => d.elt_type == element_types.USE);
    var action_divs_link_svgs_s = action_divs_svgs_s.filter(d => d.elt_type == element_types.LINK);

    action_divs_use_svgs_s
      .style("width", (icon_r_full * 2) + "px");
    action_divs_link_svgs_s
      .style("width", (icon_r_full * 5 + vis.link.outline_width) + "px");

    action_divs_use_svgs_s.append("circle")
      .attr("r", vis.use_icon.r)
      .attr("cx", icon_r_full)
      .attr("cy", icon_r_full)
      .attr("fill", d => getUsePatByTypeId(d.type))
      .attr("stroke", vis.use_icon.outline_color)
      .attr("stroke-width", vis.use_icon.outline_width);
    action_divs_link_svgs_s.append("circle")
      .attr("r", vis.use_icon.r)
      .attr("cx", 4 * icon_r_full + vis.link.outline_width)
      .attr("cy", icon_r_full)
      .attr("fill", d => getNodePat(nodeById(d.successor_id)))
      .attr("stroke", d => nodeOutlineColor(nodeById(d.successor_id)))
      .attr("stroke-width", vis.use_icon.outline_width);

    action_divs_link_svgs_s.append("polyline")
      .attr("transform", "translate(" + vis.link.outline_width + "," + icon_r_full + ") rotate(270)")
      .attr("points", linkPointsFromLen(linkLen(0, icon_r_full, 4 * icon_r_full, icon_r_full,
        icon_r_full + vis.link.head_to_node_dist)))
      .attr("fill", d => linkFillColorByDestId(d.successor_id))
      .attr("stroke", d => linkOutlineColorByDestId(d.successor_id))
      .attr("stroke-width", vis.link.outline_width);

    // add icons for special types of links
    action_divs_link_svgs_s.filter(d => linkTypeById(d.type).display_on_link).append("circle")
      .attr("transform", function(d)
      {
        let len_to_head = linkLen(0, icon_r_full, 4 * icon_r_full, icon_r_full,
          icon_r_full + vis.link.head_to_node_dist) - vis.link.head_len;
        return "translate(" + (len_to_head/2 + vis.link.outline_width) + "," + icon_r_full + ")";
      })
      .attr("r", vis.link_icon_on_link.r)
      .attr("fill", d => getLinkPat(linkById(n.id + "->" + d.successor_id)))
      .attr("stroke", d => linkOutlineColorByDestId(d.successor_id))
      .attr("stroke-width", vis.link_icon.outline_width);

    action_divs_s.filter(d => d.elt_type == element_types.USE).append("p")
      .html(d => useTypeById(d.type).description);
    action_divs_s.filter(d => d.elt_type == element_types.LINK).append("p")
      .html(d => linkTypeById(d.type).description);
  }

  // show the panel
  node_panel_box_s
    .style("display", "inline-block");
}

// update the link panel based on a link
function updateLinkPanel(l)
{
  var source = nodeById(l.source);
  var dest = nodeById(l.dest);

  // set color of panel based on whether data of destination node is identifiable or not
  var fill_color;
  var outline_color;
  if(dest.identifiable)
  {
    fill_color = vis.link_panel.fill_color_identifiable;
    outline_color = vis.link_panel.outline_color_identifiable;
  }
  else
  {
    fill_color = vis.link_panel.fill_color_unidentifiable;
    outline_color = vis.link_panel.outline_color_unidentifiable;
  }
  link_panel_s
    .style("background-color", fill_color)
    .style("border-color", outline_color);

  var node_r_full = vis.node.r + vis.node.outline_width;

  // update the link graphic
  link_panel_graphic_s.select("polyline")
      .attr("points", linkPointsFromLen(linkLen(node_r_full, node_r_full,
        vis.link_panel_graphic.dist_between_nodes + node_r_full, node_r_full,
        node_r_full + vis.link.head_to_node_dist)))
      .attr("fill", linkFillColor(l))
      .attr("stroke", linkOutlineColor(l))
      .attr("stroke-width", vis.link.outline_width);
  link_panel_graphic_s.select("circle")
      .attr("fill", getNodePat(source))
      .attr("stroke", nodeOutlineColor(source));
  link_panel_graphic_s.select("circle:nth-child(3)")
      .attr("fill", getNodePat(dest))
      .attr("stroke", nodeOutlineColor(dest));

  // set the icon and title for the link panel
  link_panel_s.select("circle")
    .attr("fill", getLinkPat(l))
    .attr("stroke", linkOutlineColor(l));
  link_panel_s.select("h1")
    .html(linkTypeById(l.type).label);
  link_panel_s.select("p")
    .html(l.text);

  // show the panel
  link_panel_box_s
    .style("display", "inline-block");
}

// update either the node or the link panel, based on an input element
function updatePanel(elt)
{
  if(elt.type == element_types.NODE)
  {
    updateNodePanel(elt.data);
  }
  else if(elt.type == element_types.LINK)
  {
    updateLinkPanel(elt.data);
  }
}

// hide the panels
function hidePanels()
{
  node_panel_box_s
    .style("display", "none");
  link_panel_box_s
    .style("display", "none");
}

// change the input element's outline to indicate that it has been saved
function saveElementOutline(elt)
{
  if(elt.type == element_types.NODE)
  {
    elt.s.select("*")
      .attr("stroke", vis.node.outline_color_saved)
      .attr("stroke-width", vis.node.outline_width_saved);
  }
  else
  {
    elt.s.select("*")
      .attr("stroke", vis.link.outline_color_saved)
      .attr("stroke-width", vis.link.outline_width_saved);
  }
}

// change the input element's outline to not indicate that it has been saved
function unsaveElementOutline(elt)
{
  if(elt.type == element_types.NODE)
  {
    elt.s.select("*")
      .attr("stroke", nodeOutlineColor)
      .attr("stroke-width", vis.node.outline_width);
  }
  else if(saved_elt.type == element_types.LINK)
  {
    saved_elt.s.select("*")
      .attr("stroke", linkOutlineColor(saved_elt.data))
      .attr("stroke-width", vis.link.outline_width);
  }
}

// transition a node selection's radius, outline color, and outline width
function transitionNodeSelection(s, r, outline_color, outline_width)
{
  s.select("circle")
    .transition()
    .attr("r", r)
    .attr("stroke", outline_color)
    .attr("stroke-width", outline_width);
}

// find a node's descendants' ids
function findDescendantIds(n)
{
  var descendant_ids = [];

  // iterate through successors and recursively add their descendants
  for(let i = 0; i < n.successor_links.length; i++)
  {
    let s = nodeById(n.successor_links[i].successor_id);

    descendant_ids.push(s.id);
    descendant_ids = descendant_ids.concat(findDescendantIds(s));
  }

  if(n.primary)
  {
    descendant_ids.push(central_node.id);
  }

  return descendant_ids;
}

// handle interactions when the cursor enters an interactive element
function onMouseEnter(elt)
{
  // display the correct panel
  hidePanels();
  updatePanel(elt);

  // if the cursor is over a node, then change its appearance, as well as the appearance of primary nodes if the
  // cursor is over the central node
  if(elt.type == element_types.NODE)
  {
    if(saved_elt == null || elt.data.id != saved_elt.data.id)
    {
      let connected_nodes_s;

      if(elt.data.layer == 0)
      {
        transitionNodeSelection(elt.s, elt.data.r * 1.05, vis.node.outline_color_focus, vis.node.outline_width_focus);

        // primary nodes that are not the saved element
        connected_nodes_s = nodes_s.filter(d => d.primary && (saved_elt == null || d.id != saved_elt.data.id));
      }
      else
      {
        transitionNodeSelection(elt.s, elt.data.r * 1.3, vis.node.outline_color_focus, vis.node.outline_width_focus);

        let descendant_ids = findDescendantIds(elt.data);
        // descendant nodes that are not the saved element
        connected_nodes_s = nodes_s.filter(d => descendant_ids.includes(d.id) &&
          (saved_elt == null || d.id != saved_elt.data.id));
      }

      transitionNodeSelection(connected_nodes_s, d => d.r * (d.id == central_node.id ? 1.05 : 1.1),
        vis.node.outline_color_focus, vis.node.outline_width_focus);
    }
  }
}

// handle interactions when the cursor leaves an interactive element
function onMouseLeave(elt)
{
  // hide the panel
  hidePanels();

  // if there is no saved element, then if the cursor was over a node, then change its appearance back
  if(saved_elt == null)
  {
    if(elt.type == element_types.NODE)
    {
      let connected_nodes_s;

      transitionNodeSelection(elt.s, elt.data.r, nodeOutlineColor(elt.data), vis.node.outline_width);

      if(elt.data.layer == 0)
      {
        // primary nodes
        connected_nodes_s = nodes_s.filter(d => d.primary);
      }
      else
      {
        let descendant_ids = findDescendantIds(elt.data);
        // descendant nodes
        connected_nodes_s = nodes_s.filter(d => descendant_ids.includes(d.id));
      }

      transitionNodeSelection(connected_nodes_s, d => d.r, nodeOutlineColor, vis.node.outline_width);
    }
  }
  // if there is a saved element, then update the panel to display information about the saved element
  else
  {
    updatePanel(saved_elt);

    // if the cursor was over a node, then unless the node is the saved element, change its appearance back
    if(elt.data.id != saved_elt.data.id)
    {
      if(elt.type == element_types.NODE)
      {
        let connected_nodes_s;

        if(saved_elt_connected_nodes_ids.includes(elt.data.id))
        {
          transitionNodeSelection(elt.s, elt.data.r * 1.05, vis.node.outline_color_focus,
            vis.node.outline_width_focus);
        }
        else
        {
          transitionNodeSelection(elt.s, elt.data.r, nodeOutlineColor(elt.data), vis.node.outline_width);
        }

        if(saved_elt.data.layer == 0)
        {
          // primary nodes that are not the saved element or its connected nodes
          connected_nodes_s = nodes_s.filter(d => d.primary && d.id != saved_elt.data.id &&
            ! saved_elt_connected_nodes_ids.includes(d.id));
        }
        else
        {
          let descendant_ids = findDescendantIds(elt.data);
          // descendant nodes that are not the saved element or its connected nodes
          connected_nodes_s = nodes_s.filter(d => descendant_ids.includes(d.id) && d.id != saved_elt.data.id &&
            ! saved_elt_connected_nodes_ids.includes(d.id));
        }

        transitionNodeSelection(connected_nodes_s, d => d.r, nodeOutlineColor, vis.node.outline_width);
      }
    }
  }
}

// handle interactions when the cursor clicks on an interactive element
function onClick(elt)
{
  // if the new clicked element is the saved element, then focus away from it
  if(saved_elt != null && elt.data.id == saved_elt.data.id)
  {
    // change outline of clicked element back to normal
    if(elt.type == element_types.LINK)
    {
      unsaveElementOutline(elt);
    }
    else
    {
      elt.s.select("*")
        .attr("stroke", vis.node.outline_color_focus)
        .attr("stroke-width", vis.node.outline_width_focus);
    }

    saved_elt = null;
    saved_elt_connected_nodes_ids = [];
  }
  // else, focus on the new clicked element
  else
  {
    let new_saved_elt_connected_nodes_ids;
    if(elt.type == element_types.NODE)
    {
      if(elt.data.layer == 0)
      {
        new_saved_elt_connected_nodes_ids = primary_nodes.map(d => d.id);
      }
      else
      {
        new_saved_elt_connected_nodes_ids = findDescendantIds(elt.data);
      }
    }
    else
    {
      new_saved_elt_connected_nodes_ids = [];
    }


    // if there is a saved element that is not the new clicked element, then focus away from the old and on the new
    if(saved_elt != null)
    {
      // display the correct panel
      hidePanels();
      updatePanel(elt);

      // change the outline of the saved element back to normal, and change its appearance otherwise back
      if(saved_elt.type == element_types.LINK)
      {
        unsaveElementOutline(saved_elt);
      }
      else
      {
        if(new_saved_elt_connected_nodes_ids.includes(saved_elt.data.id))
        {
          saved_elt.s.select("*")
            .attr("stroke", vis.node.outline_color_focus)
            .attr("stroke-width", vis.node.outline_width_focus);
        }
        else
        {
          unsaveElementOutline(saved_elt);
        }
      }

      if(saved_elt.type == element_types.NODE)
      {
        let connected_nodes_s;

        if(new_saved_elt_connected_nodes_ids.includes(saved_elt.data.id))
        {
          transitionNodeSelection(saved_elt.s, saved_elt.data.r * (saved_elt.data.id == central_node.id ? 1.05 : 1.1),
            vis.node.outline_color_focus, vis.node.outline_width_focus);
        }
        else
        {
          transitionNodeSelection(saved_elt.s, saved_elt.data.r, nodeOutlineColor(saved_elt.data),
            vis.node.outline_width);
        }

        if(saved_elt.data.layer == 0)
        {
          // primary nodes that are not the new clicked element or its connected nodes
          connected_nodes_s = nodes_s.filter(d => d.primary && d.id != elt.data.id &&
            ! new_saved_elt_connected_nodes_ids.includes(d.id));
        }
        else
        {
          let descendant_ids = findDescendantIds(saved_elt.data);
          // descendant nodes that are not the new clicked element or its connected nodes
          connected_nodes_s = nodes_s.filter(d => descendant_ids.includes(d.id) && d.id != elt.data.id &&
            ! new_saved_elt_connected_nodes_ids.includes(d.id));
        }

        transitionNodeSelection(connected_nodes_s, d => d.r, nodeOutlineColor, vis.node.outline_width);
      }
    }

    // change outline of new clicked element to indicate focus
    saveElementOutline(elt);

    saved_elt = elt;

    saved_elt_connected_nodes_ids = new_saved_elt_connected_nodes_ids;
  }
}



function main()
{
  // set title and intro text
  d3.select("h1").html(pol.title);
  d3.select("p").html(pol.intro);

  // set up patterns for background fills
  setUpPats();

  // set display variables and elements
  {
    let display_r = vis.display.r;

    let node_r_full = vis.node.r + vis.node.outline_width;
    let link_icon_r_full = vis.link_icon.r + vis.link_icon.outline_width;
    let opts_panel_icon_r_full = vis.opts_panel_icon.r + vis.opts_panel_icon.outline_width;

    let node_panel_extra_space = 2 * (vis.node_panel.padding + vis.node_panel.outline_width);
    let node_panel_max_height = 2 * display_r - node_panel_extra_space;

    let link_panel_graphic_height = 2 * node_r_full;
    let link_panel_extra_space = 2 * (vis.link_panel.padding + vis.link_panel.outline_width);
    let link_panel_max_height = 2 * display_r - link_panel_extra_space - link_panel_graphic_height -
      vis.link_panel_graphic.margin_bottom;

    bg_circles_rs = vis.bg_circle.r_proportions.map(function(x) { return x * display_r; });
    svg_s
      .attr("width", 2 * display_r)
      .attr("height", 2 * display_r);
    g_s.attr("transform", "translate(" + display_r + "," + display_r + ")");

    node_panel_s
      .style("border", vis.node_panel.outline_width + "px solid")
      .style("width", vis.node_panel.width + "px")
      .style("max-height", node_panel_max_height + "px")
      .style("padding", vis.node_panel.padding + "px");

    node_panel_opts_box_s.select("svg")
      .attr("width", 2 * opts_panel_icon_r_full)
      .attr("height", 2 * opts_panel_icon_r_full);
    node_panel_opts_box_s.select("h2")
      .html("You have some control over this data.");
    node_panel_opts_box_s.select("circle")
      .attr("cx", opts_panel_icon_r_full)
      .attr("cy", opts_panel_icon_r_full)
      .attr("r", vis.opts_panel_icon.r)
      .attr("fill", getOptsPat())
      .attr("stroke", vis.opts_panel_icon.outline_color)
      .attr("stroke-width", vis.opts_panel_icon.outline_width);

    link_panel_s
      .style("border", vis.link_panel.outline_width + "px solid")
      .style("width", vis.link_panel.width + "px")
      .style("max-height", link_panel_max_height + "px")
      .style("padding", vis.link_panel.padding + "px");

    link_panel_graphic_s
      .attr("width", (vis.link_panel_graphic.dist_between_nodes + 2 * node_r_full) + "px")
      .attr("height", link_panel_graphic_height)
      .style("margin-bottom", vis.link_panel_graphic.margin_bottom);
    link_panel_graphic_s.select("polyline")
      .attr("transform", "translate(" + node_r_full + "," + node_r_full + ") rotate(270)")
      .attr("stroke-width", 0);
    link_panel_graphic_s.select("circle")
      .attr("r", vis.node.r)
      .attr("cx", node_r_full)
      .attr("cy", node_r_full)
      .attr("stroke-width", vis.node.outline_width);
    link_panel_graphic_s.select("circle:nth-child(3)")
      .attr("r", vis.node.r)
      .attr("cx", vis.link_panel_graphic.dist_between_nodes + node_r_full)
      .attr("cy", node_r_full)
      .attr("stroke-width", vis.node.outline_width);

    link_panel_s.select("svg")
      .attr("width", 2 * link_icon_r_full)
      .attr("height", 2 * link_icon_r_full)
      .select("circle")
        .attr("r", vis.link_icon.r)
        .attr("cx", link_icon_r_full)
        .attr("cy", link_icon_r_full)
        .attr("stroke-width", vis.link_icon.outline_width);

    tree
      .size([(2 - vis.layer_title.space_in_pi_radians) * Math.PI, display_r])
      .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });
  }



  // iterate through nodes to record special nodes, change node layers to essentially create a second sub-layer in
  // layer 1, and create links and background links
  for(let i = 0; i < nodes.length; i++)
  {
    let n = nodes[i];

    // if the node is the central node, record it, and add its successor links in layer 1 to the array of primary nodes
    if(n.layer == 0)
    {
      central_node = n;
      for(let j = 0; j < n.successor_links.length; j++)
      {
        let s = nodeById(n.successor_links[j].successor_id);
        if(s.layer == 1 && ! s.all_data)
        {
          primary_nodes.push(s);
          s.primary = true;
        }
        else
        {
          s.primary = false;
        }
      }
    }

    // set the radius of the node
    n.r = nodeRadius(n);

    // fill links array with link objects based on the .json data
    for(let j = 0; j < n.successor_links.length; j++)
    {
      let l = n.successor_links[j];
      links.push({ id: n.id + "->" + l.successor_id, source: n.id, dest: l.successor_id, type: l.type,
        text: l.text });
    }

    // move the node one node outward to accommodate for second sub-layer within layer 1 (center node and primary
    // nodes will later be moved back)
    n.layer += 1;
  }

  // move central node and primary nodes back to their original layer
  central_node.layer -= 1;
  primary_nodes.map(n => n.layer -= 1);



  // map nodes and create a d3 tree
  root = tree(d3.hierarchy(makeTree(central_node)));
  let tree_nodes = root.descendants();

  // set the coordinates of nodes to the coordinates of nodes in the tree, altered to make a radial tree
  for(let i = 0; i < nodes.length; i++)
  {
    let n = nodes[i];
    let offset = vis.layer_title.space_in_pi_radians / 2 * Math.PI;
    let tree_n = tree_nodes.find(function(node) { return node.data.id == n.id; });
    n.x = (tree_n.y = +tree_n.y) * Math.cos((tree_n.x -= Math.PI / 2) + offset);
    n.y = tree_n.y * Math.sin(tree_n.x + offset);

    // adjust the distance of nodes from the center, according to specified dimensions
    if(n.layer != 0)
    {
      n.x = n.x * vis.node.dist_from_center_proportions[n.layer] / (n.layer / NUM_LAYERS);
      n.y = n.y * vis.node.dist_from_center_proportions[n.layer] / (n.layer / NUM_LAYERS);
    }
  }



  // append background circles for layers
  for(let i = NUM_LAYERS - 1; i > 0; i--)
  {
    let r = bg_circles_rs[i];

    g_s.append("circle")
      .attr("r", r)
      .attr("fill", vis.bg_circle.fill_color)
      .attr("stroke", vis.bg_circle.outline_color)
      .attr("stroke-width", vis.bg_circle.outline_width);

    let r_for_text = r - vis.layer_title.font_size - vis.layer_title.dist_from_edge;
    let text = i == 2 ? "Third parties" : pol.provider_name;

    g_s.append("path")
      .attr("id", "text_layer_" + i)
      .attr("d", "M-" + r_for_text + ",0 a" + r_for_text + "," + r_for_text + " 0 0 1 " + (2 * r_for_text) + ",0")
      .attr("fill", "none");
    g_s.append("text")
      .classed("layer_title", true)
      .attr("text-anchor", "middle")
      .style("font-size", vis.layer_title.font_size + "px")
      .style("fill", vis.layer_title.color)
      .append("textPath")
        .html(text)
        .attr("xlink:href", "#text_layer_" + i)
        .attr("startOffset", "50%");
  }



  // append links
  links_s = g_s.append("g").selectAll(".link")
    .data(links)
    .enter().append("g")
      .classed("link", true)
      .attr("transform", function(d)
      {
        let source = nodeById(d.source);
        return "translate(" + source.x + "," + source.y + ") rotate(" + linkRotation(d) + ")";
      });

  // add lines to links
  links_s.filter(d => ! linkTypeById(d.type).all_data).append("polyline")
    .attr("points", linkArrowPoints)
    .attr("fill", linkFillColor)
    .attr("stroke", linkOutlineColor)
    .attr("stroke-width", vis.link.outline_width);

  // add icons for special types of links
  links_s.filter(d => linkTypeById(d.type).display_on_link).append("circle")
    .attr("transform", function(d)
    {
      let source = nodeById(d.source);
      let dest = nodeById(d.dest);
      let len_to_head = linkLen(source.x, source.y, dest.x, dest.y, dest.r + vis.node.outline_width +
        vis.link.head_to_node_dist) - vis.link.head_len;
      let displacement = (len_to_head + source.r) / 2;
      return "translate(0," + displacement + ") rotate(" + (-linkRotation(d)) + ")";
    })
    .attr("r", vis.link_icon_on_link.r)
    .attr("fill", getLinkPat)
    .attr("stroke", linkOutlineColor)
    .attr("stroke-width", vis.link_icon.outline_width);

  // mouse interactions for links
  links_s
    // display more information when the cursor hovers over links
    .on("mouseenter", function(d)
    {
      onMouseEnter({type:element_types.LINK, data:d, s:d3.select(this)});
      d3.select(this).raise();
    })
    // hide information when the cursor leaves a link
    .on("mouseleave", function(d) { onMouseLeave({type:element_types.LINK, data:d, s:d3.select(this)}); })
    // retain focus on an element when it is clicked
    .on("click", function(d) { onClick({type:element_types.LINK, data:d, s:d3.select(this)}); });



  // append nodes
  nodes_s = g_s.append("g").selectAll(".node")
    .data(nodes)
    .enter().append("g")
      .classed("node", true)
      .attr("transform", d => "translate(" + d.x + "," + d.y + ")");

  // add circles to nodes
  nodes_s.append("circle")
    .attr("r", nodeRadius)
    .attr("fill", getNodePat)
    .attr("stroke", nodeOutlineColor)
    .attr("stroke-width", vis.node.outline_width);

  // add options icon to nodes that contain options
  nodes_s.filter(d => d.opts == true).append("circle")
    .attr("cx", vis.opts_node_icon.cx)
    .attr("cy", vis.opts_node_icon.cy)
    .attr("r", vis.opts_node_icon.r)
    .attr("fill", getOptsPat())
    .attr("stroke", vis.opts_node_icon.outline_color)
    .attr("stroke-width", vis.opts_node_icon.outline_width);

  // mouse interactions for nodes
  nodes_s
    // display more information in the node panel when the cursor hovers over nodes
    .on("mouseenter", function(d)
    {
      onMouseEnter({type:element_types.NODE, data:d, s:d3.select(this)});
      if(d.layer != 0)
      {
        d3.select(this).raise();
      }
    })
    // update the node panel when the cursor leaves a node
    .on("mouseleave", function(d) { onMouseLeave({type:element_types.NODE, data:d, s:d3.select(this)}); })
    // retain focus on an element when it is clicked
    .on("click", function(d) { onClick({type:element_types.NODE, data:d, s:d3.select(this)}); });



  // mouse interactions for panel close buttons
  panel_close_btns_s
    .on("click", function(d)
    {
      let c = saved_elt;
      onClick(c);
      onMouseLeave(c);
    });
}



// load data from .json files
var url = new URL(document.URL);
var p = url.searchParams.get("policy");
var v = url.searchParams.get("visual");
if(v == null)
{
  v = "default.json";
}

d3.json("data/policies/" + p).then(function(policy_json)
{
  d3.json("data/visual_customizations/" + v).then(function(visual_json)
  {
    // copy data from .json files
    pol = policy_json;
    vis = visual_json;

    nodes = pol.nodes;
    node_types = pol.node_types;
    link_types = pol.link_types;
    use_types = pol.use_types;

    main();
  });
});
