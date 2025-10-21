import Image from "next/image";

export const Logo = () => {
  
  return (
    <div className="relative w-[50px] h-[42px]">
      <Image
        src={`/logo/logo.png`}
        alt="CyLab Africa Logo"
        fill
        className="object-contain text-red-800"
        priority

      />
    </div>
  );
};
