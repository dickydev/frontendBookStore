import React from "react";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <Link href={href} passHref>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default CustomLink;
