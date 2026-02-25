import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXHO3IQMudC1UXQvqDir3TyledQ6Pch1c",
  authDomain: "tradebot-control.firebaseapp.com",
  projectId: "tradebot-control",
  storageBucket: "tradebot-control.firebasestorage.app",
  messagingSenderId: "598223160537",
  appId: "1:598223160537:web:b9ce67efa5e8458f046ac8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const statusText = document.getElementById("statusText");
const toggleBtn = document.getElementById("toggleBtn");
const lotInput = document.getElementById("lotInput");
const saveLotBtn = document.getElementById("saveLotBtn");

const botRef = doc(db, "bot", "settings");

async function toggleBot(){

    let current = document.getElementById("status").innerText;

    let newState = current === "ON" ? "OFF" : "ON";

    await fetch(
    "https://firestore.googleapis.com/v1/projects/tradebot-control/databases/(default)/documents/bot/settings",
    {
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            fields:{
                status:{
                    stringValue:newState
                }
            }
        })
    });

    alert("Bot toggled to " + newState);
}
async function loadStatus(){

    let res = await fetch(
    "https://firestore.googleapis.com/v1/projects/tradebot-control/databases/(default)/documents/bot/settings"
    );

    let data = await res.json();

    let status = data.fields.status.stringValue;

    document.getElementById("status").innerText = status;
}

setInterval(loadStatus,3000);
loadStatus();