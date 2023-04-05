import {
    useRef,
    useState,
    MutableRefObject,
    Dispatch,
    SetStateAction,
} from "react";

import Input from "./Input";
import InputRadio from "./InputRadio";
import Button from "./Button";

export interface IRefs {
    chemicalFormulaInput: MutableRefObject<HTMLInputElement | null>;
    molarMassInput: MutableRefObject<HTMLInputElement | null>;
    molarityInput: MutableRefObject<HTMLInputElement | null>;
    volumeInput: MutableRefObject<HTMLInputElement | null>;
    purityInput: MutableRefObject<HTMLInputElement | null>;
    densityInput: MutableRefObject<HTMLInputElement | null>;
}

const Form = ({
    setResult,
}: {
    setResult: Dispatch<SetStateAction<string>>;
}) => {
    const refs: IRefs = {
        chemicalFormulaInput: useRef(null),
        molarMassInput: useRef(null),
        molarityInput: useRef(null),
        volumeInput: useRef(null),
        purityInput: useRef(null),
        densityInput: useRef(null),
    };

    const [physicalState, setPhysicalState] = useState<string>("solid");

    const getInputValues = () => {
        return Object.values(refs).map((input) => input.current?.value);
    };

    const calculate = () => {
        const [, molarMass, molarity, volume, purity, density] =
            getInputValues().map((values) => Number(values));

        const isEverythingPreenched = (arr: number[]) =>
            !arr.map((value) => value !== 0).includes(false);

        const isSolid = physicalState === "solid";

        if (
            isEverythingPreenched([molarMass, molarity, volume, purity]) &&
            (isSolid || isEverythingPreenched([density]))
        ) {
            const mass = molarity * volume * molarMass;
            const totalMass = mass / (purity * 0.01);
            const volumeToBeMeasured = density ? totalMass / density : 0;
            const newResult = isSolid ? totalMass : volumeToBeMeasured;

            setResult(
                `Será necessário ${newResult} (${
                    isSolid ? "g" : "ml"
                }) para a preparação de ${volume}L da mistura a ${molarity} molar.`
            );
        }
    };

    return (
        <form
            action=""
            autoComplete="off"
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className="m-10 flex flex-col justify-center items-center pt-10"
        >
            <Input
                id="chemicalFormula"
                placeholder="Fórmula Química"
                refs={refs}
                setResult={setResult}
            />
            <Input
                id="molarMass"
                placeholder="Massa Molar (g/mol)"
                refs={refs}
                setResult={setResult}
            />
            <Input
                id="molarity"
                placeholder="Molaridade (mol/L)"
                refs={refs}
                setResult={setResult}
            />
            <Input
                id="volume"
                placeholder="Volume (L)"
                refs={refs}
                setResult={setResult}
            />
            <Input
                id="purity"
                placeholder="Pureza (%)"
                refs={refs}
                setResult={setResult}
            />
            <InputRadio
                physicalState={physicalState}
                setPhysicalState={setPhysicalState}
                setResult={setResult}
            />

            <Input
                id="density"
                placeholder="Densidade (g/mol)"
                disabled={physicalState === "solid"}
                refs={refs}
                setResult={setResult}
            />

            <Button onClick={calculate}>Calcular</Button>
        </form>
    );
};

export default Form;
