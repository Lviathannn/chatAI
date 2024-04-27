import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Response from "./components/features/Response";
import ResponseSkeleton from "./components/features/ResponseSkeleton";
import { animateScroll } from "react-scroll";

type Response = {
  role: "AI" | "You";
  content: string;
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response[]>([]);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      setResponse((prevResponse) => [
        ...prevResponse,
        { content: prompt, role: "You" },
      ]);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const res = await result.response;
      const newResponse = {
        content: res.text(),
        role: "AI" as "AI" | "You",
      };

      setResponse((prevResponse) => [...prevResponse, newResponse]);
      animateScroll.scrollToBottom({
        duration: 500,
        smooth: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <>
      <main className="container mx-auto py-10">
        <section className="flex flex-col gap-14 max-w-2xl mx-auto pb-40">
          {response.map((item, index) => (
            <Response key={index} content={item.content} role={item.role} />
          ))}
          {loading && <ResponseSkeleton />}
        </section>
        <footer className="fixed z-20 right-0 py-6 left-0 bottom-0 space-y-4 bg-white container">
          <form onSubmit={handleSubmit} className="w-full flex justify-center ">
            <div className="grid w-full max-w-2xl items-center gap-1.5">
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="prompt"
                  placeholder="Your message"
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                  required
                  disabled={loading}
                />
                <Button type="submit" disabled={loading}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
          <p className="text-xs text-stone-500 text-center">
            AI can make mistakes. Consider checking important information.
          </p>
        </footer>
      </main>
    </>
  );
}

export default App;
