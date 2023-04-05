import { Dispatch, SetStateAction } from "react";

const Option = ({
    id,
    children,
    physicalState,
    setPhysicalState,
    setResult,
}: {
    id: string;
    children: string;
    physicalState: string;
    setPhysicalState: Dispatch<SetStateAction<string>>;
    setResult: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <div className="w-full relative">
            <input
                type="radio"
                name="physicalState"
                id={id}
                className="peer hidden"
                checked={physicalState === id}
                onChange={() => {
                    setResult("");
                }}
                onClick={() => setPhysicalState(id)}
            />
            <label
                htmlFor={id}
                className="absolute bg-white opacity-40 w-full h-full rounded-lg cursor-pointer select-none flex justify-center items-center bg-opacity-0 hover:border hover:opacity-100 hover:border-white peer-checked:bg-opacity-10 peer-checked:opacity-100 transition-all"
            >
                {children}
            </label>
        </div>
    );
};

const InputRadio = ({
    physicalState,
    setPhysicalState,
    setResult,
}: {
    physicalState: string;
    setPhysicalState: Dispatch<SetStateAction<string>>;
    setResult: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <div className="bg-white bg-opacity-10 text-white max-w-lg w-full h-14 rounded-lg mb-7 flex justify-between gap-1 p-1">
            <Option
                id="solid"
                physicalState={physicalState}
                setPhysicalState={setPhysicalState}
                setResult={setResult}
            >
                Sólido
            </Option>
            <Option
                id="liquid"
                physicalState={physicalState}
                setPhysicalState={setPhysicalState}
                setResult={setResult}
            >
                Líquido
            </Option>
        </div>
    );
};
export default InputRadio;
