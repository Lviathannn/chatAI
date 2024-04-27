import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  content: string;
  role: "AI" | "You";
};

export default function Response({ content, role }: Props) {
  return (
    <div className="flex gap-14 flex-col">
      <div className="flex gap-5 ">
        <Avatar className="size-6">
          <AvatarImage
            src={
              role === "AI"
                ? "https://cdn-icons-png.flaticon.com/128/10479/10479785.png"
                : "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
            }
          />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <p className="font-semibold leading-none">{role}</p>
          <div className="leading-none text-sm space-y-5">
            <Markdown
              children={content}
              components={{
                code(props) {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      PreTag="div"
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      style={atomOneDark}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
