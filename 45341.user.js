// ==UserScript==
// @name           Free Rice
// @namespace      Energy Surge
// @description    Automatically answers correct basic chemistry symbol on freerice.com, if it doesn't know the correct answer it will guess the fourth option.
// @include        http://freerice.com/index.php*
// ==/UserScript==

var elements = new Object();
elements['Aluminium'] = "Al";
elements['Argon'] = "Ar";
elements['Arsenic'] = "As";
elements['Boron'] = "B";
elements['Calcium'] = "Ca";
elements['Carbon'] = "C";
elements['Chlorine'] = "Cl";
elements['Cobalt'] = "Co";
elements['Copper'] = "Cu";
elements['Fluorine'] = "F";
elements['Gold'] = "Au";
elements['Helium'] = "He";
elements['Hydrogen'] = "H";
elements['Iodine'] = "I";
elements['Iron'] = "Fe";
elements['Lead'] = "Pb";
elements['Lithium'] = "Li";
elements['Magnesium'] = "Mg";
elements['Manganese'] = "Mn";
elements['Mercury'] = "Hg";
elements['Neon'] = "Ne";
elements['Nickel'] = "Ni";
elements['Nitrogen'] = "N";
elements['Oxygen'] = "O";
elements['Phosphorus'] = "P";
elements['Platinum'] = "Pt";
elements['Plutonium'] = "Pu";
elements['Potassium'] = "K";
elements['Radium'] = "Ra";
elements['Radon'] = "Rn";
elements['Silicon'] = "Si";
elements['Silver'] = "Ag";
elements['Sodium'] = "Na";
elements['Sulfur'] = "S";
elements['Tin'] = "Sn";
elements['Titanium'] = "Ti";
elements['Uranium'] = "U";
elements['Zinc'] = "Zn";

info = document.forms[0].elements[4].value;
info = info.split("|");
answer = elements[info[0]];

for(i = 1; answer != info[i] && i < 4; i++);

setTimeout("window.submitForm("+i+")", 1500);
