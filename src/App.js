import React, { useState } from "react";
import "./App.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.start();
var timeStamp = new Date().getUTCMilliseconds();

function App() {
  const [convo, setConvo] = useState([]);
  const [isListening, setIsListeningStatus] = useState(true);

  recognition.onspeechstart = () => {
    setIsListeningStatus(true);
  };

  recognition.onspeechend = () => {
    setIsListeningStatus(false);
    setTimeout(() => {
      recognition.start();
    }, 1000);
  };

  // Do something when we get a result
  recognition.onresult = (e) => {
    let current = e.resultIndex;
    let transcript = e.results[current][0].transcript;
    // console.log('You said: "' + transcript + '"');
    setConvo([transcript, ...convo]);
    const getValueAfterPhrase = (phrase) => transcript.split(phrase)[1];
    if (transcript.includes("google search ")) {
      const val = getValueAfterPhrase("google search ");
      window.open("https://www.google.com/search?q=" + val);
    }
  };

  const convoComponent = (convo) => (
    <div>
      {convo.map((f) => {
        return <div key={timeStamp}>{f}</div>;
      })}
    </div>
  );

  return (
    <div className="App" style={{ height: "100%", overflow: "none" }}>
      <div
        style={{
          overflow: "auto",
          backgroundImage: `url('https://i.pinimg.com/originals/eb/bd/f7/ebbdf7ce4f7f502d1f28b96b5cbd7a1f.gif')`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundColor: "#0c042d",
          color: "white",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "calc(50% - 89px)",
            top: "calc(50% - 53px)",
          }}
        >
          <img
            src={
              "https://nerdylifeofmine.files.wordpress.com/2017/11/loading.gif"
            }
            alt="Loader"
            style={{ height: "100px", display: isListening ? "none" : "block" }}
          />
        </div>
        <div
          style={{
            height: "50%",
            width: "50%",
            margin: "200px auto",
            overflow: "auto",
          }}
        >
          {convoComponent(convo)}
        </div>
      </div>
    </div>
  );
}

export default App;
