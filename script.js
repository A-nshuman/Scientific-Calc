document.addEventListener('DOMContentLoaded', () => {

    // Variables
    let numEnd = false;

    const display = document.querySelector('.screenDisp');
    const abtMeBtn = document.querySelector('.aboutMe');
    const btns = document.querySelectorAll('.btn');

    const clear = document.getElementById('clear');
    const bracket = document.getElementById('bracket');
    const equal = document.getElementById('equal-to');
    const period = document.getElementById('period');
    const plusMinus = document.getElementById('plus-minus');
    const backspace = document.getElementById('backSpace');

    // Functions
    function mulDiv(oldChar, newChar, event) {
        var newEventKey = event.key.replace(oldChar, newChar);
        const lastChar = display.innerHTML.slice(-1);

        if (display.innerHTML === '') {
            display.innerHTML += '';
        } else {
            var correctedString = display.innerHTML.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100*');
            display.innerHTML = eval(correctedString);

            if (oppList.includes(lastChar)) {
                display.innerHTML = display.innerHTML.slice(0, -1) + newEventKey;
            } else {
                display.innerHTML += newEventKey;
            }
        }
        btns.forEach(btn => {
            if (newEventKey === btn.innerHTML) {
                buttonPress(btn);
            }
        });
    }

    if (parseInt(display.style.width) > 210) {
        display.overflow = 'scroll';
    }

    equal.addEventListener('click', () => {
        var correctedString = display.innerHTML.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100*');
        display.innerHTML = eval(correctedString);
    });

    clear.addEventListener('click', () => {
        display.innerHTML = '';
    });

    backspace.addEventListener('click', () => {
        display.innerHTML = display.innerHTML.slice(0, -1);
    });

    period.addEventListener('click', () => {
        if (display.innerHTML === '') {
            display.innerHTML += '0.';
        } else if (display.innerHTML.endsWith('0.')) {
            display.innerHTML += '';
        } else {
            do {
                display.innerHTML += '.';
            } while (numEnd === true)
        }
    });

    plusMinus.addEventListener('click', () => {
        if (display.innerHTML === '') {
            display.innerHTML = '-';
        } else if (display.innerHTML === '-') {
            display.innerHTML = '';
        }
    });

    let paranthesisOpen = false;

    bracket.addEventListener('click', () => {
        if (display.innerHTML === '' || paranthesisOpen === false) {
            display.innerHTML += '(';
            paranthesisOpen = true;
        } else if (paranthesisOpen === true) {
            display.innerHTML += ')';
            paranthesisOpen = false;
        }
    });

    const arithOpp = document.querySelectorAll('.arith');
    var oppList = [
        document.getElementById('percentage').innerHTML,
        document.getElementById('divide').innerHTML,
        document.getElementById('multiply').innerHTML,
        document.getElementById('subtract').innerHTML,
        document.getElementById('add').innerHTML,
    ];

    arithOpp.forEach(opp => {
        opp.addEventListener('click', () => {
            const lastChar = display.innerHTML.slice(-1);
            numEnd = true;

            if (display.innerHTML === '') {
                display.innerHTML += '';
            } else {
                var correctedString = display.innerHTML.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100*');
                display.innerHTML = eval(correctedString);
                if (oppList.includes(lastChar)) {
                    display.innerHTML = display.innerHTML.slice(0, -1) + opp.innerHTML;
                } else {
                    display.innerHTML += opp.innerHTML;
                }
            }
        });
    });

    const nums = document.querySelectorAll('.nums');

    nums.forEach(num => {
        num.addEventListener('click', () => {
            display.innerHTML += num.innerHTML;
            numEnd = false;
        });
    });

    function buttonPress(btn) {
        btn.style.animation = 'buttonPress 0.3s ease-in-out forwards';
        btn.addEventListener('animationend', () => {
            btn.style.animation = '';
        });
    }

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            buttonPress(btn);
            equal.focus();
        });
    });

    document.addEventListener('keydown', (event) => {
        display.focus();

        if (event.key === 'Escape') {
            display.innerHTML = '';
            buttonPress(clear);
        }

        else if (event.key === 'Enter') {
            event.preventDefault();
            display.innerHTML = eval(display.innerHTML);
            buttonPress(equal);
        }

        else if (event.key === 'Backspace') {
            display.innerHTML = display.innerHTML.slice(0, -1);
            buttonPress(backspace);
        }

        else if (/^[0-9]$/i.test(event.key)) {
            display.innerHTML += event.key;

            btns.forEach(btn => {
                if (event.key === btn.innerHTML) {
                    buttonPress(btn);
                }
            });
        }

        else if (/^[\+\-\%\(\)]$/i.test(event.key)) {
            const lastChar = display.innerHTML.slice(-1);

            if (display.innerHTML === '') {
                display.innerHTML += '';
            } else {
                var correctedString = display.innerHTML.replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100*');
                display.innerHTML = eval(correctedString);

                if (oppList.includes(lastChar)) {
                    display.innerHTML = display.innerHTML.slice(0, -1) + event.key;
                } else {
                    display.innerHTML += event.key;
                }
            }
            btns.forEach(btn => {
                if (event.key === btn.innerHTML) {
                    buttonPress(btn);
                }
            });
        }

        else if (event.key === '*') {
            mulDiv('*', '×', event);
        }

        else if (event.key === '/') {
            mulDiv('/', '÷', event);
        }

        else if (event.key === '.') {
            if (display.innerHTML === '') {
                display.innerHTML += '0.';
            } else if (display.innerHTML.endsWith('0.')) {
                display.innerHTML += '';
            } else {
                do {
                    display.innerHTML += '.';
                } while (numEnd === true)
            }
            buttonPress(period);
        }
    });
});