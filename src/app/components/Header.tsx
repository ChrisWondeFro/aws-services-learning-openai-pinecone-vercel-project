import Image from "next/image";
import AWSLogo from "../../../public/aws.png";
import PerScholasLogo from "../../../public/perscholas.jpg";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={`flex items-center justify-center text-gray-200 text-2xl mt-20 ${className}`}
    >
       <Image
        src={PerScholasLogo}
        alt="perscholas-logo"
        width="80"
        height="50"
        className="mr-3 mb-8"
      />{" "}
      <div className="text-4xl ml-3 mr-3">+</div>
      <Image
        src={AWSLogo}
        alt="aws-logo"
        width="130"
        height="50"
        className="ml-3 mb-8"
      />
    </header>
  );
}
