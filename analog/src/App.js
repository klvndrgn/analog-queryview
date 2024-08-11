import React, { useEffect, useState } from "react";
import { TimegraphClient } from "@analog-labs/timegraph-js";
import { web3Enable } from "@polkadot/extension-dapp";

const sessionKey = "your_session_key"; // replace your_session_key with your session key
const timegraphGraphqlUrl = "https://timegraph.testnet.analog.one/graphql";

async function watchSDKTesting(setData, setAliasResponse, name, hashId) {
  await web3Enable("abcd");

  const client = new TimegraphClient({
    url: timegraphGraphqlUrl,
    sessionKey: sessionKey,
  });

  let aliasResponse = await client.alias.add({
    name: name,
    hashId: hashId,
    identifier: name,
  });

  console.log(aliasResponse);
  setAliasResponse(aliasResponse);

  const data = await client.view.data({
    _name: name,
    hashId: hashId,
    fields: ["_index"],
    limit: 10,
  });

  setData(data);
}

function App() {
  const [data, setData] = useState(null);
  const [aliasResponse, setAliasResponse] = useState(null);
  const [name, setName] = useState("");
  const [hashId, setHashId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    watchSDKTesting(setData, setAliasResponse, name, hashId);
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Timegraph Data</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </label>
        </div>
        <div style={inputContainerStyle}>
          <label style={labelStyle}>
            Hash ID:
            <input
              type="text"
              value={hashId}
              onChange={(e) => setHashId(e.target.value)}
              required
              style={inputStyle}
            />
          </label>
        </div>
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>

      {aliasResponse && (
        <div style={dataSectionStyle}>
          <h2 style={subHeaderStyle}>Alias Response</h2>
          <pre style={preStyle}>{JSON.stringify(aliasResponse, null, 2)}</pre>
        </div>
      )}

      {data ? (
        <div style={dataSectionStyle}>
          <h2 style={subHeaderStyle}>Timegraph Data</h2>
          <pre style={preStyle}>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p style={loadingStyle}>Result will be displayed here</p>
      )}
    </div>
  );
}

const containerStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: "auto",
  textAlign: "center",
};

const headerStyle = {
  color: "#333",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputContainerStyle = {
  marginBottom: "10px",
};

const labelStyle = {
  fontWeight: "bold",
  color: "#555",
  display: "block",
  marginBottom: "5px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  fontSize: "16px",
  width: "100%",
};

const buttonStyle = {
  padding: "10px 15px",
  borderRadius: "4px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  transition: "background-color 0.3s ease",
};

const dataSectionStyle = {
  marginTop: "20px",
  textAlign: "left",
};

const subHeaderStyle = {
  color: "#444",
  marginBottom: "10px",
};

const preStyle = {
  backgroundColor: "#f9f9f9",
  padding: "15px",
  borderRadius: "4px",
  border: "1px solid #eee",
  maxHeight: "200px",
  overflowY: "auto",
};

const loadingStyle = {
  color: "#777",
};

export default App;
