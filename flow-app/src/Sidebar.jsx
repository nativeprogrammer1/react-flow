/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react-refresh/only-export-components */


import React from "react";

export default (props) => {
  // Function called when a drag operation starts
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType); // Set data to be transferred during drag
    event.dataTransfer.effectAllowed = "move"; // Set drag effect to "move"
  };

  return (
    <aside>
      {!props.selectedNodeId ? 
        ( // If selectedNodeId is falsy, render initial nodes
          <div style={{padding:15}}>
            <div className="description">
              You can drag these nodes to the pane on the left
            </div>
            <div
              className="dndnode input"
              onDragStart={(event) => onDragStart(event, "textNode")} // Attach onDragStart event handler to the draggable node
              draggable // Enable dragging for the node
            >
              Text Node
            </div>
          </div>
        ) : 
        ( // If selectedNodeId is truthy, render update form
          <div className="updatenode__controls">
            <span onClick={()=>{props.setSelectedNodeId(null)} } style={{color:'#0000eb',fontSize:16}}> Go Back</span>
    
            <h1 style={{fontSize:24}}>Update Text</h1>
            <input
              value={props.textLabel}
              onChange={(evt) => props.updateName(evt.target.value)} // Call updateName function when input value changes
            />
          </div>
        )
      }
    </aside>
  );
};
