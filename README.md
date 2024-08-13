<!DOCTYPE html>
<html>
<body>
    <h1>Analog Query View (Alternative)</h1>
    Since the normal function for analog query is having issues, let’s try using an alternative method.
    <br>
    <h2>Getting Started</h2>
    <p>You can use this guide to set up and run the application either on your local PC with an IDE like Visual Studio Code or on GitHub Codespaces. On this guide I'm using local setup using VS Code.</p>
        <li><strong>Create a React Application:</strong>
            <pre><code>npx create-react-app analog
cd analog</code></pre>
        </li>
        <li><strong>Install Required Packages:</strong>
            <pre><code>npm i @polkadot/extension-dapp @analog-labs/timegraph-js dotenv</code></pre>
        </li>
        <li><strong>Edit the <code>src/App.js</code> File:</strong>
            <p>Replace the content of <code>src/App.js</code> with the code from <a href="https://github.com/klvndrgn/analog-queryview/blob/main/analog/src/App.js">this link</a>.</p>
            <p>On line 5, replace <code>your_session_key</code> with your session key.</p>
            <p><strong>How to find your SESSION KEY:</strong></p>
            <ul>
                <li>Go to <a href="https://watch.testnet.analog.one/profile">Watch Analog Profile</a>.</li>
                <li>Click on the download session key icon beside your profile address.</li>
                <li>Copy the value starting from <code>0;</code> from the <code>sessionkey.txt</code> file.</li>
            </ul>
        </li>
        <li><strong>Start the Application:</strong>
            <pre><code>npm start</code></pre>
            <p>The app will be accessible at <a href="http://localhost:3000">http://localhost:3000</a>. Open this URL in your browser to run the query.</p>
        </li>
    </ol>
</body>
</html>
