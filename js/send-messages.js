// Sends a batch of messages to the course message board, one per second.
// Run with `node js/send-messages.js`, or paste into the browser Console.

const API = "https://oim.zhili.dev/message";
const TOKEN = "SamYe-git"; // your GitHub username
const FIRST = 2;           // message 1/100 was already posted
const LAST = 100;

async function postMessage(text) {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Token": TOKEN
    },
    body: JSON.stringify({ message: text })
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendAll() {
  for (let i = FIRST; i <= LAST; i++) {
    try {
      await postMessage(`Message ${i}/${LAST} from Sam`);
      console.log(`${i}: sent`);
    } catch (err) {
      console.log(`${i}: failed (${err.message}), stopping`);
      return;
    }
    await wait(1000);
  }
  console.log("Done");
}

sendAll();
