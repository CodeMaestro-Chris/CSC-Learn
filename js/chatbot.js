const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Function to send message to backend
async function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    appendMessage("You", userMessage);
    chatInput.value = "";

    try {
        const response = await fetch("http://localhost:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        appendMessage("AI", data.reply || "AI did not respond.");
    } catch (error) {
        console.error("Fetch Error:", error);
        appendMessage("AI", "Error reaching the AI service.");
    }
}

// Append messages to chat UI
function appendMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "You" ? "user-message" : "ai-message");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
}

// Event Listeners
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});
