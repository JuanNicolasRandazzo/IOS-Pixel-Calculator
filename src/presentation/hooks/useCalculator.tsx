import { useEffect, useRef, useState } from "react"
import { View } from "react-native"


enum Operator{
    add = '+',
    substract = '-',
    multiply = 'x',
    divide = '÷',
}



export const useCalculator = () => {

    const [formula, setformula] = useState('');

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operator>();

    useEffect(() => {
        if( lastOperation.current ){
            const firstFormulaPart = formula.split(' ').at(0);
            setformula(`${firstFormulaPart} ${lastOperation.current} ${number}`)
        }else{
            setformula(number);
        }
      
        
    
      
    }, [number]) // El useEffect() se va a disparar cada vez que el número cambie.
    
    
    useEffect(() => {
      const subResult = calculateSubResult();
      setPrevNumber(`${subResult}`);
    }, [formula])
    



    // Cleans everything
    const clean =() => {

        setNumber('0');
        setPrevNumber('0');
        lastOperation.current = undefined;
        setformula('0');
        

    }

    // Deletes the last digit entered

    const deleteOpration =() => {

        let currentSign = '';
        let temporalNumber = number;

        
        if (number.includes('-')){
            currentSign ='-';
            temporalNumber = number.substring(1); //Replaces '-' for ''

        }

        if (temporalNumber.length > 1){
            return setNumber(currentSign + temporalNumber.slice(0,-1));
        }

        setNumber('0')

    }

    const toggleSign = () => {

        if (number.includes('-')){

            return setNumber (number.replace('-',''))
        }

        setNumber( '-' + number);
    }


    const buildNumber = ( numberString: string) => {

        if(number.includes('.') && numberString === '.') return;

        
        if(number.startsWith('0') || number.startsWith('-0')){

            // Punto decimal:
            if(numberString === '.'){
                return setNumber(number + numberString );
            }

            // Evaluar si es otro cero y no hay punto:
            if (numberString === '0' && number.includes('.')){
                return setNumber(number + numberString );
            }


            // Evaluar si es diferente de cero, no hay punto decimal y es el primer número:
            if (numberString !== '0' && !number.includes('.')){
                return setNumber(numberString );
            }


            // Evitar el 00000.00:
            if(numberString === '0' && !number.includes('.')){
                return;
            }

            return setNumber(number + numberString);
            
        }

        setNumber(number + numberString);

    }

    const setLastNumber = () => {

        calculateResult();
        if(number.endsWith('.')){
            setPrevNumber(number.slice(0,-1));
        }else{
            setPrevNumber(number);
        }

        setNumber('0');

    }

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }

    const substractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.substract;
    }

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const calculateResult = () => {

        const restult = calculateSubResult();
        setformula(`${ restult }`);

        lastOperation.current = undefined;
        

        setPrevNumber('0');
    };

    const calculateSubResult = (): number =>{

        const [ firstValue, operation, secondValue] = formula.split(' ');

        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if (isNaN(num2)) return num1;

        switch(operation){

            case Operator.add:
                return num1 + num2;
                
            case Operator.substract:
                return num1 - num2;
                

            case Operator.multiply:
                return num1 * num2;
                
             case Operator.divide:
                return num1 / num2;
                        
            default:
                throw new Error('Operation not implemented');
        }
    }


  return{
    // Properties
    number,
    prevNumber,
    formula,
    // Methods
    buildNumber,
    toggleSign,
    clean,
    deleteOpration,
    divideOperation,
    multiplyOperation,
    substractOperation,
    addOperation,
    calculateResult,
  } 
  // Creo entender que cuando el return tiene las llabes "{}", implica
  // que vas a retornar un objeto.
   
  
}






/*

Notes:
        for ( let i = 0; number.length > 0; i-- ){

            if(number.length > 1){
                return setNumber(number.slice( 0, -1 ));
            }
            else if(number[number.length - 1] === '-'){
            return setNumber('0' + number.slice(0 , 3));
                
            }
            else if ( number.length === 1 ){
                return setNumber('0' );
            }
            
        }*/