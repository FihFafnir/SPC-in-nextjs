import { getFinalMolecularMass } from "@/chemitry";
import { IRefs } from "./Form";
import { Dispatch, SetStateAction } from "react";

const Input = ({
    id,
    placeholder,
    disabled,
    refs,
    setResult,
}: {
    id: string;
    placeholder: string;
    disabled?: boolean;
    refs: IRefs;
    setResult: Dispatch<SetStateAction<string>>;
}) => {
    const clearInputValue = () => {
        const currentInput = refs[(id + "Input") as keyof IRefs];

        if (currentInput.current) {
            currentInput.current.value = "";
        }
    };

    const formatInputValue = () => {
        const currentInput = refs[(id + "Input") as keyof IRefs];
        const newValue: string | undefined =
            currentInput.current?.value.replace(",", ".");

        if (newValue && currentInput.current) {
            currentInput.current.value ??= newValue;
        }
    };

    const calculateMolarMass = () => {
        const { molarMassInput, chemicalFormulaInput } = refs;
        if (molarMassInput.current && chemicalFormulaInput.current) {
            molarMassInput.current.value &&= getFinalMolecularMass(
                chemicalFormulaInput.current.value
            ).toString();
        }
    };

    return (
        <div className="input-container relative max-w-lg w-full h-min mb-7">
            <input
                id={id}
                type="text"
                className="peer bg-white bg-opacity-10 w-full rounded-lg p-4 outline-none text-white disabled:opacity-10 transition-all"
                placeholder=" "
                required={true}
                disabled={disabled}
                ref={refs[(id + "Input") as keyof IRefs]}
                onDoubleClick={clearInputValue}
                onChange={() => {
                    formatInputValue();
                    setResult("");

                    if (id === "chemicalFormula") {
                        calculateMolarMass();
                    }
                }}
            />
            <label
                htmlFor={id}
                className="absolute top-1/2 left-1 -translate-y-1/2 select-none text-white cursor-text bg-primary bg-opacity-0 opacity-60 rounded-xl py-0.5 px-2.5 transition-all peer-disabled:opacity-10"
            >
                {placeholder}
            </label>
        </div>
    );
};

export default Input;
