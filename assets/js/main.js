const inputContainer = document.querySelector('input');
const rootElement = document.documentElement;

window.onload = getThemeFromLocalStorage

const lightTheme = {
    '--background-color': '#FFF',
    '--text-color': '#1A1A1A',
    '--button-background-color': '#9B8AFB'
}

const darkTheme = {
    '--background-color': '#1A1A1A',
    '--text-color': '#FFF',
    '--button-background-color': '#5925DC'
}

inputContainer.addEventListener('change', () => {
    const isChecked = inputContainer.checked;
    isChecked ? changeTheme(darkTheme) : changeTheme(lightTheme);
})

function changeTheme(theme) {
    for (let prop in theme) {
        changeProperty(prop, theme[prop]);
    }

    saveThemeToLocalStorage(theme);

    // Desta forma, ao invés de trabalharmos direto no objeto (for in), transformamos em um array (Object.entries(object)) e podemos fazer um for nas suas propriesdades e valores, de forma desestruturada como a seguir:
    // for (let [property, value] of Object.entries(theme)) {
    //     changeProperty(property, value);
    // }
}

function changeProperty(property, value) {
    rootElement.style.setProperty(property, value);
}

function saveThemeToLocalStorage(theme) {
    localStorage.setItem('theme', JSON.stringify(theme));
}

function getThemeFromLocalStorage() {
    const theme = JSON.parse(localStorage.getItem('theme'));
    if (isThemeEqual(theme, darkTheme)) inputContainer.checked = true;
    changeTheme(theme);
}

function isThemeEqual(firstTheme, secondTheme) {
    for (let prop in firstTheme) {
        if (firstTheme[prop] != secondTheme[prop]) return false;
    }
    return true;
}