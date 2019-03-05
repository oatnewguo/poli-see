/*
RULES

1.  Each node must have properties id, successors, layer, identifiable, label, and text.
2.  Each node must have a non-empty string value for id.
3.  Each node must have a unique id.
4.  Each node must have a string array value for successors, where all array elements are ids of other nodes.
5.  No node can be in the successors array of more than one other node (i.e., each node can have at most one parent).
6.  Each node must have a value for layer less than or equal to those of its successors (i.e., links cannot travel inwards).
!! UNCHECKED!! 7.  Each node must be connected by edges to the node at layer 0.
8.  Each node must have 0, 1, 2, or 3 as the value for layer.
9.  Exactly one node must have 0 as the value for layer.
10. Each node must have a boolean value for identifiable.
11. Each node must have a non-empty string value for label.
12. Each node must have a string value for text (it can be an empty string).
!! UNCHECKED!! Each node must have a type in node_types (how to deal with "other"?)
!! UNCHECKED!! Each link must have a type in link_types (how to deal with "other"?)
!! UNCHECKED!! Each use must be in use_types (how to deal with "other"?)
!! UNCHECKED!! Each object must have a unique id (even across different arrays). (there are probably problems in the code when "_identifiable" and "_unidentifiable" are added to node ids.)
!! UNCHECKED!! image paths should lead to valid images
!! UNCHECKED!! Ids must not contain the string "->"

*/

// return the node with a given id from a list of nodes
function getNodeById(node_id, nodes_data)
{
  return nodes_data.find(function(node) { return node.id == node_id; });
}

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
      if(! (n.hasOwnProperty("id") && n.hasOwnProperty("successors") && n.hasOwnProperty("layer") && n.hasOwnProperty("identifiable") && n.hasOwnProperty("label") && n.hasOwnProperty("text")))
        throw "Not every node has properties id, successors, layer, identifiable, label, and text.";

      // Rule 2
      if(typeof(n.id) != "string" || n.id == "")
        throw "Not every node has a non-empty string value for id.";

      // Rule 3
      if(ids.has(n.id))
        throw "Not every node has a unique id.";
      else
        ids.add(n.id);

      // Rule 8
      if(n.layer < 0 || n.layer > 3 || ! Number.isInteger(n.layer))
        throw "Not every node has 0, 1, 2, or 3 as the value for layer.";

      // Rule 9
      if(n.layer == 0)
      {
        if(layer_0_found)
          throw "More than one node has 0 as the value for layer.";
        else
          layer_0_found = true;
      }

      // Rule 10
      if(typeof(n.identifiable) != "boolean")
        throw "Not every node has a boolean value for identifiable.";

      // Rule 11
      if(typeof(n.label) != "string" || n.label == "")
        throw "Not every node has a non-empty string value for label.";

      // Rule 12
      if(typeof(n.text) != "string")
        throw "Not every node has a string value for text.";
    }

    // Rule 9
    if(! layer_0_found)
      throw "No node has 0 as the value for layer.";

    for(var i = 0; i < nodes_data.length; i++)
    {
      n = nodes_data[i];

      // Rule 4
      var successors = n.successors;
      if(! Array.isArray(successors))
        throw "Not every node has a string array for successors.";

      for(var j = 0; j < successors.length; j++)
      {
        var s = successors[j];

        // Rule 4
        if(typeof(s) != "string")
          throw "Not every node has a string array for successors.";
        if(! ids.has(s))
          throw "Not every node has a string array for successors, where all array elements are ids of other nodes.";

        // Rule 5
        if(parent_found.has(s))
          throw "At least one node is in the successors array of more than one node (i.e., not every node has at most one parent).";
        else
          parent_found.add(s);

        // Rule 6
        if(n.layer > getNodeById(s, nodes_data).layer)
          throw "Not every node has a value for layer less than or equal to those of its successors (i.e., at least one link travels inwards).";
      }
    }

    alert("All tests passed! Yay!");
  }
  catch(error)
  {
    alert("There was an error with the encoding of the policy:\n\n" + error);
  }
}
