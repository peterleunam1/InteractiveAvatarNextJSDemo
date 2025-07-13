import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ className, title, children, ...rest }: Props) => {
      const cardClassName: string = `bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 lg:p-6 shadow-md hover:shadow-indigo-500/10 transition-shadow duration-300 ${className}`

    return (
    <section className={cardClassName} {...rest}>
      {title && (
        <h2 className="text-lg font-semibold text-indigo-300 mb-4">{title}</h2>
      )}
      <div className="flex flex-col gap-4 w-full">{children}</div>
    </section>
  );
};
