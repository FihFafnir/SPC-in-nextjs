const jsonPeriodicTable =
    '{"Ac":{"molarMass":227},"Al":{"molarMass":26.9815},"Am":{"molarMass":243},"Sb":{"molarMass":121.75},"Ar":{"molarMass":39.948},"As":{"molarMass":74.9216},"At":{"molarMass":210},"Ba":{"molarMass":137.34},"Bk":{"molarMass":247},"Be":{"molarMass":9.0122},"Bi":{"molarMass":209},"Bh":{"molarMass":262.1},"B":{"molarMass":10.811},"Br":{"molarMass":79.909},"Cd":{"molarMass":112.4},"Ca":{"molarMass":40.08},"Cf":{"molarMass":251},"C":{"molarMass":12.01115},"Ce":{"molarMass":140.12},"Cs":{"molarMass":132.905},"Pb":{"molarMass":207.19},"Cl":{"molarMass":35.453},"Co":{"molarMass":58.93},"Cu":{"molarMass":63.55},"Cn":{"molarMass":285},"Kr":{"molarMass":83.8},"Cr":{"molarMass":51.996},"Cm":{"molarMass":247},"Ds":{"molarMass":269},"Dy":{"molarMass":162.5},"Db":{"molarMass":262},"Es":{"molarMass":252},"S":{"molarMass":32.064},"Er":{"molarMass":167.26},"Sc":{"molarMass":44.956},"Sn":{"molarMass":118.69},"Sr":{"molarMass":87.62},"Eu":{"molarMass":151.96},"Fm":{"molarMass":257},"Fe":{"molarMass":55.847},"Fl":{"molarMass":289},"F":{"molarMass":18.9984},"P":{"molarMass":30.9738},"Fr":{"molarMass":223},"Gd":{"molarMass":157.25},"Ga":{"molarMass":69.72},"Ge":{"molarMass":72.59},"Hf":{"molarMass":178.49},"Hs":{"molarMass":265},"He":{"molarMass":4.0026},"H":{"molarMass":1.00797},"Ho":{"molarMass":164.93},"In":{"molarMass":114.82},"I":{"molarMass":126.9044},"Ir":{"molarMass":192.2},"Yb":{"molarMass":173.04},"Y":{"molarMass":88.905},"La":{"molarMass":138.91},"Lr":{"molarMass":260},"Li":{"molarMass":6.941},"Lv":{"molarMass":292},"Lu":{"molarMass":174.97},"Mg":{"molarMass":24.312},"Mt":{"molarMass":269},"Mn":{"molarMass":54.938},"Md":{"molarMass":258},"Hg":{"molarMass":200.59},"Mo":{"molarMass":95.94},"Mc":{"molarMass":288},"Nd":{"molarMass":144.24},"Ne":{"molarMass":20.183},"Np":{"molarMass":237},"Nh":{"molarMass":284},"Nb":{"molarMass":92.906},"Ni":{"molarMass":58.69},"N":{"molarMass":14.0067},"No":{"molarMass":259},"Og":{"molarMass":294},"Os":{"molarMass":190.2},"Au":{"molarMass":196.967},"O":{"molarMass":15.9994},"Pd":{"molarMass":106.4},"Pt":{"molarMass":195.09},"Pu":{"molarMass":244},"Po":{"molarMass":209},"K":{"molarMass":39.098},"Pr":{"molarMass":140.907},"Ag":{"molarMass":107.87},"Pm":{"molarMass":145},"Pa":{"molarMass":231},"Ra":{"molarMass":226},"Rn":{"molarMass":222},"Re":{"molarMass":186.2},"Rh":{"molarMass":102.905},"Rg":{"molarMass":272},"Rb":{"molarMass":85.47},"Ru":{"molarMass":101.07},"Rf":{"molarMass":261},"Sm":{"molarMass":150.35},"Sg":{"molarMass":263.1},"Se":{"molarMass":78.96},"Si":{"molarMass":28.086},"Na":{"molarMass":22.9898},"Tl":{"molarMass":204.37},"Ta":{"molarMass":180.948},"Tc":{"molarMass":98},"Te":{"molarMass":127.6},"Ts":{"molarMass":294},"Tb":{"molarMass":158.924},"Ti":{"molarMass":47.9},"Th":{"molarMass":232},"Tm":{"molarMass":168.934},"W":{"molarMass":183.85},"U":{"molarMass":238},"V":{"molarMass":50.942},"Xe":{"molarMass":131.38},"Zn":{"molarMass":65.38},"Zr":{"molarMass":91.22}}';
const periodicTable = JSON.parse(jsonPeriodicTable);

const getAtomicMass = (symbol: string): number =>
    periodicTable[symbol]?.molarMass;

function calculateMolarMass(formula: string): number {
    const formulaArray: string[] = formula.match(/[a-zA-Z]+|\d+/g) ?? [""];

    const atomicMasses: number[] = formulaArray.map(
        (element: string): number => {
            const atomicMass: number = getAtomicMass(element);
            return atomicMass === undefined ? Number(element) : atomicMass;
        }
    ) ?? [0];

    return atomicMasses.reduce((a: number, b: number) => a * b) ?? 0;
}

function getMolecularMass(formula: string): number {
    if (formula === "") {
        return 0;
    }
    const molecules: string[] = formula.split(/(?=[A-Z])/);
    const molecularMasses: number[] = molecules.map((item: string) =>
        calculateMolarMass(item)
    );

    return molecularMasses.reduce((a: number, b: number) => a + b);
}

interface IUnraveledMolecularMassWithCharacters {
    formulaBeforeCharacters: string;
    formulaInsideCharacters: string;
    formulaAfterCharacters: string;
    charactersCoefficient: number;
}

function unravelMolecularMassWithCharacters(
    formula: string,
    character: string
): IUnraveledMolecularMassWithCharacters {
    const indexOfOpeningCharacters: number = formula.indexOf(character[0]);
    const indexOfClosingCharacters: number = formula.indexOf(character[1]);

    const afterCharacters: string = formula.substring(
        indexOfClosingCharacters + 1
    );
    const charactersCoefficient: number = Number(afterCharacters.match(/\d+/));

    const formulaBeforeCharacters: string = formula.substring(
        0,
        indexOfOpeningCharacters
    );

    const formulaInsideCharacters: string = formula.substring(
        indexOfOpeningCharacters + 1,
        indexOfClosingCharacters
    );

    const formulaAfterCharacters: string = afterCharacters.replace(
        String(charactersCoefficient),
        ""
    );

    return {
        formulaBeforeCharacters,
        formulaInsideCharacters,
        formulaAfterCharacters,
        charactersCoefficient,
    };
}

function getFinalMolecularMass(formula: string): number {
    const coefficient: number = isNaN(Number(formula[0]))
        ? 0
        : Number(formula.match(/\d+/));

    if (coefficient !== 0) {
        const formulaWithoutCoefficient: string = formula.replace(
            String(coefficient),
            ""
        );

        return getFinalMolecularMass(formulaWithoutCoefficient) * coefficient;
    }

    const hasBrackets: boolean = /\[.*\]/.test(formula);
    const hasParentheses: boolean = /\(.*\)/.test(formula);

    const isBracketsOrParentheses: string = hasBrackets
        ? "[]"
        : hasParentheses
        ? "()"
        : "";

    if (isBracketsOrParentheses === "") return getMolecularMass(formula);

    const {
        formulaBeforeCharacters,
        formulaInsideCharacters,
        formulaAfterCharacters,
        charactersCoefficient,
    } = unravelMolecularMassWithCharacters(formula, isBracketsOrParentheses);

    const molecularMasses: number[] = [
        getFinalMolecularMass(formulaBeforeCharacters),
        getFinalMolecularMass(formulaInsideCharacters) * charactersCoefficient,
        getFinalMolecularMass(formulaAfterCharacters),
    ];

    return molecularMasses.reduce((a: number, b: number) => a + b);
}

// console.log(getFinalMolecularMass("Ca3[Fe(CN)6]2"));

export { getMolecularMass, getFinalMolecularMass };
