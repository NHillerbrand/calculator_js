/*
 * Copyright (C) 2020 Nicolas Hillerbrand.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

class Calculator {
    constructor(oCurrentOperandElement, oPreviousOperandElement) {
        this.m_oCurrentOperandElement = oCurrentOperandElement;
        this.m_oPreviousOperandElement = oPreviousOperandElement;
        this.clear();
    }

    clear() {
        this.m_sCurrentOperand= '';
        this.m_sPreviousOperand = '';
        this.m_sOperation = undefined; 
        this.m_sFuncOperation = undefined;
    }
    delete() {
        if(this.m_sCurrentOperand.length < 1) {
            return;
        }
        this.m_sCurrentOperand = this.m_sCurrentOperand.slice(0, -1);
    }

    chooseOperation(sOperation) {
        if(this.m_sCurrentOperand === '') {
            return;
        } 
        if(this.m_sPreviousOperand !== '') {
            this.calculate();
        }
        this.m_sOperation = sOperation;
        this.m_sPreviousOperand = this.m_sCurrentOperand;
        this.m_sCurrentOperand = '';
    }

    chooseFuncOperation(sFuncOperation) {
        this.m_sFuncOperation = sFuncOperation;
        this.m_sPreviousOperand = sFuncOperation;
        this.m_bIsFuncCalc = true;
    }

    calculateFunc() {
        let result,
            sFunction = this.m_sPreviousOperand,
            fCurrent = this.m_sCurrentOperand;
        if(isNaN(fCurrent) || typeof sFunction !== "string"){
            this.clear()
            this.m_sCurrentOperand = "Error";
            return;
        }
        switch(this.m_sFuncOperation) {
            case "x²":
                result = fCurrent * fCurrent;
                break;
            case "ln":
                if(fCurrent < 1) {
                    this.clear();
                    this.m_sCurrentOperand = "Error";
                    return;
                }
                result =  Math.log(fCurrent);
                break;
            default: 
                return;
        }
        this.m_sCurrentOperand = result;
        this.m_sPreviousOperand = '';
        this.m_sFuncOperation = undefined;
    }

    appendNumber(sNumber) {
        if (sNumber === "." && this.m_sCurrentOperand.includes(".")) {
            return;
        }
        this.m_sCurrentOperand = `${this.m_sCurrentOperand}${sNumber}`;
    }

    addBracket() {
        alert("Not Implemented Yet!");
    }

    calculate() {
        if(!!this.m_bIsFuncCalc) {
            this.calculateFunc();
            return;
        }
        let result,
            fPrevious = parseFloat(this.m_sPreviousOperand),
            fCurrent = parseFloat(this.m_sCurrentOperand);
        if(isNaN(fPrevious) || isNaN(fCurrent)) {
            this.clear()
            this.m_sCurrentOperand = "Error";
            return;
        }
        switch(this.m_sOperation) {
            case "+":
                result = fPrevious + fCurrent;
                break;
            case "×":
                result = fPrevious * fCurrent;
                break;
            case "-":
                result = fPrevious - fCurrent;
                break;
            case "÷":
                result = fPrevious / fCurrent;
                break;
            case "%":
                result = fPrevious / 100 * fCurrent;
                break;
            default:
                return;
        }
       
        this.m_sCurrentOperand = result;
        this.m_sPreviousOperand = '';
        this.m_sOperation = undefined;
    }

    updateDisplay() {
        this.m_oCurrentOperandElement.innerText = this.m_sCurrentOperand;
        this.m_oPreviousOperandElement.innerText = `${this.m_sPreviousOperand} ${this.m_sOperation ?? ""}`;
    }

}

const aNumberButtons = document.querySelectorAll('[data-number]');
const aOperationButtons = document.querySelectorAll('[data-operation]');
const aFuncOperationButtons = document.querySelectorAll('[data-funcOperation]');
const oEqualsButton = document.querySelector('[data-equals]');
const oDeleteButton = document.querySelector('[data-delete]');
const oClearButton = document.querySelector('[data-clear]');
const oCurrentOperandElement = document.querySelector('[data-current-operand]');
const oPreviousOperandElement = document.querySelector('[data-pevious-operand]');

const calculator = new Calculator(oCurrentOperandElement, oPreviousOperandElement);

aNumberButtons.forEach(oButton => {
    oButton.addEventListener("click", () => {
        calculator.appendNumber(oButton.innerText);
        calculator.updateDisplay();
    });

});

aOperationButtons.forEach(oButton => {
    oButton.addEventListener("click", () => {
        calculator.chooseOperation(oButton.innerText);
        calculator.updateDisplay();
    });
});

aFuncOperationButtons.forEach(oButton => {
    oButton.addEventListener("click", () => {
        calculator.chooseFuncOperation(oButton.innerText);
        calculator.updateDisplay();
    });
});

oClearButton.addEventListener("click", () => {
        calculator.clear();
        calculator.updateDisplay();
});

oDeleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});

oEqualsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});


