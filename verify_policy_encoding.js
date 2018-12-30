/*
RULES

1.  Each node must have properties id, edges_out, layer, identifiable, label, and text.
2.  Each node must have a non-empty string value for id.
3.  Each node must have a unique id.
4.  Each node must have a string array value for edges_out, where all array elements are ids of other nodes.
5.  No node can be in the edges_out array of more than one other node (i.e., each node can have at most one parent).
6.  Each node must have 0, 1, 2, or 3 as the value for layer.
7.  Exactly one node must have 0 as the value for layer.
8.  Each node must have a boolean value for identifiable.
9.  Each node must have a non-empty string value for label.
10. Each node must have a string value for text (it can be an empty string).

*/

// check that a policy encoding does not violate the rules listed above
function verifyPolicyEncoding(nodes_data)
{
  try
  {
    var layer_0_found = false;
    var ids = new Set();
    var parent_found = new Set();

    for(var i = 0; i < nodes_data.length; i++)
    {
      n = nodes_data[i];

      // Rule 1
      if(! (n.hasOwnProperty("id") && n.hasOwnProperty("edges_out") && n.hasOwnProperty("layer") && n.hasOwnProperty("identifiable") && n.hasOwnProperty("label") && n.hasOwnProperty("text")))
        throw "Not every node has properties id, edges_out, layer, identifiable, label, and text.";

      // Rule 2
      if(typeof(n.id) != "string" || n.id == "")
        throw "Not every node has a non-empty string value for id.";

      // Rule 3
      if(ids.has(n.id))
        throw "Not every node has a unique id.";
      else
        ids.add(n.id);

      // Rule 6
      if(n.layer < 0 || n.layer > 3 || ! Number.isInteger(n.layer))
        throw "Not every node has 0, 1, 2, or 3 as the value for layer.";

      // Rule 7
      if(n.layer == 0)
      {
        if(layer_0_found)
          throw "More than one node has 0 as the value for layer.";
        else
          layer_0_found = true;
      }

      // Rule 8
      if(typeof(n.identifiable) != "boolean")
        throw "Not every node has a boolean value for identifiable.";

      // Rule 9
      if(typeof(n.label) != "string" || n.label == "")
        throw "Not every node has a non-empty string value for label.";

      // Rule 10
      if(typeof(n.text) != "string")
        throw "Not every node has a string value for text.";
    }

    // Rule 7
    if(! layer_0_found)
      throw "No node has 0 as the value for layer.";

    for(var i = 0; i < nodes_data.length; i++)
    {
      n = nodes_data[i];

      // Rule 4
      var edges_out = n.edges_out;
      if(! Array.isArray(edges_out))
        throw "Not every node has a string array for edges_out.";

      for(var j = 0; j < edges_out.length; j++)
      {
        var e = edges_out[j];

        // Rule 4
        if(typeof(e) != "string")
          throw "Not every node has a string array for edges_out.";
        if(! ids.has(e))
          throw "Not every node has a string array for edges_out, where all array elements are ids of other nodes.";

        // Rule 5
        if(parent_found.has(e))
          throw "At least one node is in the edges_out array of more than one node (i.e., not every node has at most one parent).";
        else
          parent_found.add(e);
      }
    }

    alert("All tests passed! Yay!");
  }
  catch(error)
  {
    alert("There was an error with the encoding of the policy:\n\n" + error);
  }
}
