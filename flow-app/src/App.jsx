/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";

import "./index.css";
import TextNode from "./TextNode";

const nodeTypes = {
  textNode: TextNode,
};


const initialEdges = [];

const initialNodes = [
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const [selectedNodeText, setSelectedNodeText] = useState("");

  function setNodeIdName(nodeDetails) {
    setSelectedNodeId(nodeDetails.id);
    setSelectedNodeText(nodeDetails.data.label);
  }

  function updateName(name) {
    setSelectedNodeText(name);
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: name,
            connectable: true,
          };
        }

        return node;
      })
    );
  }

  function checkNodesAndEdges(nodes, edges) {
    // Check if there are more than one element in nodes
    if (nodes.length > 1) {
      // Create a set of unique target IDs from edges
      const targetIds = new Set(edges.map((element) => element.target));
  
      // Filter nodes that have node.id not present in targetIds
      const nodesNotInEdges = nodes.filter((node) => !targetIds.has(node.id));
  
      // Check if more than one node.id is not present in targetIds
      if (nodesNotInEdges.length > 1) {
        alert("Cannot save flow")
        return(true); // More than one node.id not present in targetIds
      }

    }
    else
    {
      // alert("Cannot save flow")
      return(false) ; 
    }

  
   // Default case: conditions are not met
  }

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `Text node ${id}`, setNodeIdName: setNodeIdName },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
  <div>
      <div style={{
    width:'100%',
    height:'10vh',
    background:'#f3f0ef',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }}>
   <button 
   onClick={()=>{checkNodesAndEdges(nodes, edges)}}
   style={{
    background:'white',
    padding:10
   }}>Save Changes</button>
    </div>   


    <div
      className="dndflow"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
{/* {console.log("This is the node ",nodes)}
 {console.log("This is the edges ",edges)} */}
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
  
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar
          selectedNodeId={selectedNodeId}
          textLabel={selectedNodeText}
          updateName={updateName}
          setSelectedNodeId={setSelectedNodeId}
        />
      </ReactFlowProvider>
    </div>
    </div>
  );
};

export default DnDFlow;
