// page.tsx

"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import { Context } from "@/components/Context";
import Header from "@/components/Header";
import Chat from "@/components/Chat";
import { useChat } from "ai/react";
import InstructionModal from "./components/InstructionModal";
import { AiFillGithub, AiOutlineInfoCircle } from "react-icons/ai";

import Image from "next/image";
import PineconeLogo from "public/pinecone.svg";
import VercelLogo from "public/vercel.svg";
import OpenAILogo from "public/openai.svg";


const Page: React.FC = () => {
  const [gotMessages, setGotMessages] = useState(false);
  const [context, setContext] = useState<string[] | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: async () => {
      setGotMessages(true);
    },
  });

  const prevMessagesLengthRef = useRef(messages.length);

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    setContext(null);
    setGotMessages(false);
  };

  useEffect(() => {
    const getContext = async () => {
      const response = await fetch("/api/context", {
        method: "POST",
        body: JSON.stringify({
          messages,
        }),
      });
      const { context } = await response.json();
      setContext(context.map((c: any) => c.id));
    };
    if (gotMessages && messages.length >= prevMessagesLengthRef.current) {
      getContext();
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages, gotMessages]);

  return (
    <div className="flex flex-col justify-between h-screen bg-yellow-800 p-2 mx-auto max-w-full">
      <Header className="my-5" />
      <a
        className="fixed left-4 top-4 md:right-14 md:top-6 text-xl text-white"
      >
        <Image
        src={PineconeLogo}
        alt="pinecone-logo"
        width="80"
        height="50"
        className="mr-3"
      />{" "}
      <div className="text-4xl ml-3 mr-3">+</div>
      <Image
        src={OpenAILogo}
        alt="openai-logo"
        width="30"
        height="10"
        className="mr-3 mt-1 ml-2"
      />
       <div className="text-4xl ml-3 mr-3">+</div>
      <Image
        src={VercelLogo}
        alt="vercel-logo"
        width="60"
        height="50"
        className="mr-3 mt-3"
      />{" "}
      </a>
      <button
        onClick={() => {
          window.open(
            "https://github.com/ChrisWondeFro",
            "_blank"
          );
        }}
        className="fixed right-12 top-4 md:right-12 md:top-6 text-xl text-white github-button"
      >
        <AiFillGithub />
      </button>

      <button
        onClick={() => setModalOpen(true)}
        className="fixed right-4 top-4 md:right-6 md:top-6 text-xl text-white animate-pulse-once info-button"
      >
        <AiOutlineInfoCircle />
      </button>

      <InstructionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <div className="flex w-full flex-grow overflow-hidden relative">
        <Chat
          input={input}
          handleInputChange={handleInputChange}
          handleMessageSubmit={handleMessageSubmit}
          messages={messages}
        />
        <div className="absolute transform translate-x-full transition-transform duration-500 ease-in-out right-0 w-2/3 h-full bg-gray-700 overflow-y-auto lg:static lg:translate-x-0 lg:w-2/5 lg:mx-2 rounded-lg">
          <Context className="" selected={context} />
        </div>
        <button
          type="button"
          className="absolute left-20 transform -translate-x-12 bg-gray-800 text-white rounded-l py-2 px-4 lg:hidden"
          onClick={(e) => {
            e.currentTarget.parentElement
              ?.querySelector(".transform")
              ?.classList.toggle("translate-x-full");
          }}
        >
          ☰
        </button>
      </div>
    </div>
  );
};

export default Page;
