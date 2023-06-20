/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const TextNode = (props) => {
  return (
    <div
      onClick={() => {
        props.data.setNodeIdName(props); // Call setNodeIdName function from props.data when clicked
      }}
      style={{
        background: "white",
        borderRadius: 10,
        border: "1px solid black",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#88cf88",
          width: "100%",
          overflow: "hidden",
          paddingInline: 15,
        }}
      >
        <span style={{ fontSize: 11, marginLeft: 5 }}>Send message</span>
      </div>
      <Handle
        type="source"
        id="a"
        isConnectable={true}
        position={Position.Left}
        style={{ background: "#000" }}
      />
      <span
        style={{
          fontSize: 12,
          padding: 15,
        }}
      >
         {/* Render the label from props.data if it exists */}
        {props?.data?.label}  
      </span>
      <Handle
        type="target"
        id="b"
        position={Position.Right}
        isConnectable={true}
        // isValidConnection={(connection) => connection.source === 'some-id'}
        // onConnect={(params) => console.log("handle onConnect", params)}
        style={{ background: "#000" }}
      />
    </div>
  );
};

export default memo(TextNode);

