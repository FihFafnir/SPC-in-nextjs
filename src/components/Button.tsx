import { MouseEventHandler } from "react";

const Button = ({
    children,
    onClick,
}: {
    children: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <button
            type="submit"
            className="bg-white bg-opacity-10 select-none max-w-xs w-full text-white tracking-widest font-semibold rounded-lg py-4 hover:inner-border hover:bg-opacity-0"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
