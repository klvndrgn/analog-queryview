import React, { useEffect, useState } from "react";
import { TimegraphClient } from "@analog-labs/timegraph-js";
import { web3Enable } from "@polkadot/extension-dapp";

const sessionKey = "your_session_key"; // replace your_session_key with your session key
const timegraphGraphqlUrl = "https://timegraph.testnet.analog.one/graphql";

async function watchSDKTesting(
  setData,
  setAliasResponse,
  name,
  hashId,
  sponsorView
) {
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

  const fund = await client.tokenomics.sponsorView({
    viewName: name,
    amount: "2000000000",
  });

  sponsorView(fund);
}

function App() {
  const [data, setData] = useState(null);
  const [aliasResponse, setAliasResponse] = useState(null);
  const [name, setName] = useState("");
  const [hashId, setHashId] = useState("");
  const [fund, sponsorView] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    watchSDKTesting(setData, setAliasResponse, name, hashId, sponsorView, fund);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Analog - Query & Fund Unique View</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            View Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </label>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            View Hash ID:
            <input
              type="text"
              value={hashId}
              onChange={(e) => setHashId(e.target.value)}
              required
              style={styles.input}
            />
          </label>
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      {aliasResponse && (
        <div style={styles.result}>
          <h2 style={styles.subHeader}>Alias Response</h2>
          <pre style={styles.pre}>{JSON.stringify(aliasResponse, null, 2)}</pre>
        </div>
      )}

      {fund && (
        <div style={styles.result}>
          <h2 style={styles.subHeader}>Fund</h2>
          <pre style={styles.pre}>{JSON.stringify(fund, null, 2)}</pre>
        </div>
      )}

      {data ? (
        <div style={styles.result}>
          <h2 style={styles.subHeader}>Timegraph Data</h2>
          <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p style={styles.loadingText}>Loading data...</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#f7f7f7",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    display: "block",
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#679b40",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  result: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#e7f3fe",
    borderRadius: "8px",
    border: "1px solid #b3d4fc",
  },
  subHeader: {
    color: "#333",
    marginBottom: "10px",
  },
  pre: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "4px",
    overflowX: "auto",
  },
  loadingText: {
    textAlign: "center",
    color: "#888",
  },
};

export default App;
