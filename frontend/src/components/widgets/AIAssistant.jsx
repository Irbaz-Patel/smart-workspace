// import React, { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Send, Bot, User, Sparkles } from 'lucide-react';

// export const AIAssistant = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: '1',
//       text: 'Hello! I\'m your AI assistant. I can help you with summarizing notes, generating ideas, answering questions, and more. How can I assist you today?',
//       sender: 'ai',
//       timestamp: new Date()
//     }
//   ]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!input.trim()) return;

//   //   const userMessage = {
//   //     id: Date.now().toString(),
//   //     text: input,
//   //     sender: 'user',
//   //     timestamp: new Date()
//   //   };

//   //   setMessages(prev => [...prev, userMessage]);
//   //   setInput('');
//   //   setIsLoading(true);

//   //   // Simulate AI response
//   //   setTimeout(() => {
//   //     const aiResponse = {
//   //       id: (Date.now() + 1).toString(),
//   //       text: generateAIResponse(input),
//   //       sender: 'ai',
//   //       timestamp: new Date()
//   //     };
//   //     setMessages(prev => [...prev, aiResponse]);
//   //     setIsLoading(false);
//   //   }, 1500);
//   // };
// const [sessionId] = useState(() => 'session_' + Date.now());
//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!input.trim()) return;

//   const userMessage = {
//     id: Date.now().toString(),
//     text: input,
//     sender: "user",
//     timestamp: new Date()
//   };

//   setMessages(prev => [...prev, userMessage]);
//   const currentInput = input;
//   setInput("");
//   setIsLoading(true);

//   try {
//     console.log("🚀 Sending request to backend...");

//     const res = await fetch("http://localhost:5000/api/ask-ai", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         prompt: currentInput,
//         sessionId: sessionId,  // Include session ID for context
//         useContext: true       // Enable context-aware responses
//       })
//     });

//     console.log("📡 Response status:", res.status);

//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
//     }

//     const data = await res.json();
//     console.log("📦 Response data:", data);

//     const aiResponse = {
//       id: (Date.now() + 1).toString(),
//       text: data.reply || "No response received from AI.",
//       sender: "ai",
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, aiResponse]);
//   } catch (error) {
//     console.error("❌ Frontend error:", error);

//     const errorMessage = {
//       id: (Date.now() + 2).toString(),
//       text: error.message,
//       sender: "ai",
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, errorMessage]);
//   } finally {
//     setIsLoading(false);
//   }
// };

//   // const generateAIResponse = (userInput) => {
//   //   const responses = [
//   //     'That\'s an interesting question! Based on my analysis, I\'d suggest exploring this from multiple angles.',
//   //     'Here are some key insights I can provide: This topic involves several important considerations.',
//   //     'Let me help you think through this systematically. There are a few approaches we could take.',
//   //     'Great question! I can definitely help you with that. Here\'s what I think would be most effective.',
//   //     'I\'ve analyzed your request and here are some actionable recommendations for you to consider.'
//   //   ];
//   //   return responses[Math.floor(Math.random() * responses.length)];
//   // };

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
//       <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex items-center space-x-2">
//           <Sparkles className="h-5 w-5 text-purple-500" />
//           <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
//         </div>
//         <div className="flex items-center space-x-1">
//           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//           <span className="text-xs text-green-500">Online</span>
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <motion.div
//             key={message.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div className="flex items-start space-x-2 max-w-xs lg:max-w-sm">
//               {message.sender === 'ai' && (
//                 <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Bot className="h-4 w-4 text-white" />
//                 </div>
//               )}
//               <div
//                 className={`p-3 rounded-lg ${
//                   message.sender === 'user'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
//                 }`}
//               >
//                 <p className="text-sm">{message.text}</p>
//                 <p className="text-xs opacity-70 mt-1">
//                   {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </p>
//               </div>
//               {message.sender === 'user' && (
//                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <User className="h-4 w-4 text-white" />
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         ))}
//         {isLoading && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex justify-start"
//           >
//             <div className="flex items-start space-x-2">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
//                 <Bot className="h-4 w-4 text-white" />
//               </div>
//               <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
//                 <div className="flex space-x-1">
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
//         <div className="flex space-x-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Ask me anything..."
//             className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//             disabled={isLoading}
//           />
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             disabled={isLoading || !input.trim()}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             <Send className="h-4 w-4" />
//           </motion.button>
//         </div>
//       </form>
//     </div>
//   );
// };

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

export const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. I can help you with summarizing notes, generating ideas, answering questions, and more. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
      isComplete: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);
  const prevMessageCount = useRef(messages.length);

  useEffect(() => {
    if (messages.length > prevMessageCount.current) {
      scrollToBottom();
    }
    prevMessageCount.current = messages.length;
  }, [messages]);

  const [sessionId] = useState(() => "session_" + Date.now());

  // Function to split response into steps/sentences
  const splitIntoSteps = (text) => {
    // Split by periods, exclamation marks, or question marks followed by space
    const sentences = text
      .split(/(?<=[.!?])\s+/)
      .filter((sentence) => sentence.trim().length > 0)
      .map((sentence) => sentence.trim());

    // If no proper sentences, split by line breaks or double spaces
    if (sentences.length <= 1) {
      return text.split(/\n\n|\n|  /).filter((part) => part.trim().length > 0);
    }

    return sentences;
  };

  // Function to display text step by step
  const displayStepByStep = (text, messageId) => {
    const steps = splitIntoSteps(text);
    let currentStep = 0;

    // Initialize the message with empty text
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, text: "", isComplete: false } : msg
      )
    );

    const displayNextStep = () => {
      if (currentStep < steps.length) {
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === messageId) {
              const currentText = steps.slice(0, currentStep + 1).join(" ");
              return {
                ...msg,
                text: currentText,
                isComplete: currentStep === steps.length - 1,
              };
            }
            return msg;
          })
        );

        currentStep++;
        setTimeout(displayNextStep, 800); // Delay between steps (800ms)
      }
    };

    displayNextStep();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
      isComplete: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      console.log("🚀 Sending request to backend...");

      const res = await fetch("http://localhost:5000/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: currentInput,
          sessionId: sessionId,
          useContext: true,
        }),
      });

      console.log("📡 Response status:", res.status);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("📦 Response data:", data);

      const aiResponseId = (Date.now() + 1).toString();
      const aiResponse = {
        id: aiResponseId,
        text: "",
        sender: "ai",
        timestamp: new Date(),
        isComplete: false,
      };

      // Add the AI message and start step-by-step display
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);

      // Start displaying the response step by step
      displayStepByStep(
        data.reply || "No response received from AI.",
        aiResponseId
      );
    } catch (error) {
      console.error("❌ Frontend error:", error);

      const errorMessage = {
        id: (Date.now() + 2).toString(),
        text: error.message,
        sender: "ai",
        timestamp: new Date(),
        isComplete: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            AI Assistant
          </h3>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-green-500">Online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-start space-x-2 max-w-xs lg:max-w-sm">
              {message.sender === "ai" && (
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={`p-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                }`}
              >
                {/* <p className="text-sm whitespace-pre-line">{message.text}</p> */}
                <div className="text-sm space-y-2">
                  {message.text.split(/\n|(?=\d+\.\s)/).map((line, i) => (
                    <p key={i} className="leading-relaxed">
                      {line.trim()}
                    </p>
                  ))}
                </div>
                {message.sender === "ai" && !message.isComplete && (
                  <div className="inline-flex items-center mt-1">
                    {/* <div className="w-1 h-3 bg-blue-500 animate-pulse"></div> */}
                  </div>
                )}
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.sender === "user" && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={isLoading}
          />
          <motion
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" type="submit"/>
          </motion>
        </div>
      </form>
    </div>
  );
};
