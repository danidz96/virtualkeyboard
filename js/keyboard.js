const keys = document.querySelectorAll('#keyboard li');
let text = document.getElementById('text');
let shift = false;
let capslock = false;
const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Muestra por pantalla la fecha actual
 *
 * @author Daniel Domínguez Zamorano
 * @version 1.0
 * @param
 */
function showDate(){ 
    const date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    const dayOfWeek = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getUTCDate();
    let suffix = '';

    if (day === 1) {
        suffix = 'st';
    } else if (day === 2) {
        suffix = 'nd';
    } else if (day === 3) {
        suffix = 'rd';
    } else {
        suffix = 'th';
    }

    if (hour < 10) {
        hour = `0${hour}`;
    }
    if (minute < 10) {
        minute = `0${minute}`;
    }
    if (second < 10) {
        second = `0${second}`;
    }

    const output = `${weekdayArr[dayOfWeek]} ${day}${suffix}, ${monthsArr[month]} ${year}, ${hour}:${minute}:${second} ` ;

    document.querySelector('.date').innerHTML = output;
    
    setTimeout('showDate()', 1000);
}

showDate();

keys.forEach(key => {
    key.addEventListener('click', keyboard);
});

/**
 * Controla todas las teclas del teclado y sus funciones
 *
 * @author Daniel Domínguez Zamorano
 * @version 1.0
 * @param
 */
function keyboard() {
    switch (this.className) {
        case 'letter':
        case 'symbol':
            text.value += this.innerHTML;
            if (shift && !capslock) {
                lowerCase();
                shift = false; 
            }
            break;

        case 'space':
            text.value += ' ';
            break;

        case 'tab':
            text.value += '    ';
            break;

        case 'enter':
            text.value += '\n';
            break;
            
        case 'capslock':
        case 'capslock active':
        console.log(this);
            capsLock(this);
            
            break;

        case 'left-shift':
        case 'right-shift':
            shift = true;
            upperCase();
            break;
            
        case 'delete':
            deleteCharacter();
            break;

        default:
            break;
    } 
}

/**
 * Convierte las letras del teclado en mayúsculas
 *
 * @author Daniel Domínguez Zamorano
 * @version 1.0
 * @param
 */
function upperCase() {
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].className === "letter") {
            keys[i].innerHTML = keys[i].innerHTML.toUpperCase();
        }
    }
}

/**
 * Convierte las letras del teclado en minúsculas
 *
 * @author Daniel Domínguez Zamorano
 * @version 1.0
 * @param
 */
function lowerCase() {
    for (let i = 0; i < keys.length; i++) {
        if (keys[i].className === "letter") {
            keys[i].innerHTML = keys[i].innerHTML.toLowerCase();
        }
    }
}

/**
 * Controla el estado de la tecla caps lock
 *
 * @author Daniel Domínguez Zamorano
 * @version 1.0
 * @param
 */
function capsLock(key) {
    if (capslock === false) {
        upperCase();
        capslock = true;
        key.classList.add('active');
        document.querySelector('.led').style.backgroundColor = '#40ff00';
    } else if (capslock === true) {
        lowerCase();
        capslock = false;
        key.classList.remove('active');
        document.querySelector('.led').style.backgroundColor = '#afafaf';
    }
}

/**
 * Borra el último caracter
 *
 * @author Daniel Domínguez Zamorano
 * @version 1.0
 * @param
 */
function deleteCharacter() {
    let newText = text.value.substring(0, text.value.length-1);
    text.value = newText;
}