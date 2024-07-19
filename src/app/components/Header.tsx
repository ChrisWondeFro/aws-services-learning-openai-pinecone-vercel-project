import Image from "next/image";
import PineconeLogo from "../../../public/pinecone.svg";
import VercelLogo from "../../../public/vercel.svg";
import AWSLogo from "../../../public/aws.png";
import PerScholasLogo from "../../../public/perscholas.jpg";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={`flex items-center justify-center text-gray-200 text-2xl ${className}`}
    >
      <Image
        src={AWSLogo}
        alt="aws-logo"
        width="230"
        height="50"
        className="ml-3"
      />{" "}
      <div className="text-4xl ml-3 mr-3">+</div>
      <Image
        src={PerScholasLogo}
        alt="perscholas-logo"
        width="160"
        height="50"
        className="mr-3 mt-3"
      />
    </header>
  );
}
