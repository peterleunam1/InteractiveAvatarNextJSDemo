import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ className, title, children, ...rest }: Props) => {
  const cardClassName = `bg-white border border-gray-200 rounded-2xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`;

  return (
    <section className={cardClassName} {...rest}>
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      )}
      <div className="flex flex-col gap-4 w-full">{children}</div>
    </section>
  );
};
