// ==UserScript==
// @name           Fav4.org Keyboard Shortcuts
// @include        http://fav4.org/
// ==/UserScript==

var shortcutkey = new Array();

// RETRIEVE PERSISTENT VALUES
// IF THEY DON'T EXIST ASSIGN DEFAULT VALUES

showNumbers = GM_getValue("showNumbers", 1);
shortcutkey[0] = GM_getValue("shortcut1", "1");
shortcutkey[1] = GM_getValue("shortcut2", "2");
shortcutkey[2] = GM_getValue("shortcut3", "3");
shortcutkey[3] = GM_getValue("shortcut4", "4");


// TOGGLES WHETHER THE SHORTCUT KEYS ARE SHOWN OR NOT
// ON COMMAND OF THE MENU COMMAND
function toggleNumbers() {
showNumbers = GM_getValue("showNumbers", 1);
 if (showNumbers) {
   GM_setValue("showNumbers", 0);
   showNumbers = 0;
   for (x=0; x<4; x++) {
    liTags[x].innerHTML = oldHTML[x];
   }
  // initiateToggleCommand();
 }
 else {
   GM_setValue("showNumbers", 1);
   showNumbers = 1;
   showNumbersNow();
  // initiateToggleCommand();
 }
}


function changeShortcut1() {
 var prompt1 = prompt("Enter the letter or number for shortcut 1 which directs to " + document.links[0].href + " ", "");
 if (prompt1.length > 1) {
  while (prompt1.length > 1) {
   prompt1 = prompt("Shorcuts can only be one character long. Please try again.", "");
  }
 }
 if (prompt1.length == 1) {
  GM_setValue("shortcut1", prompt1);
  shortcutkey[0] = prompt1;
 }
 else {
  alert("You did not enter anything, so your shortcut 1 will remain the same");
 }
 shortcutUpdated();
}

function changeShortcut2() {
 var prompt2 = prompt("Enter the letter or number for shortcut 2 which directs to " + document.links[1].href + " ", "");
 if (prompt2.length > 1) {
  while (prompt2.length > 1) {
   prompt2 = prompt("Shorcuts can only be one character long. Please try again.", "");
  }
 }
 if (prompt2.length == 1) {
  GM_setValue("shortcut2", prompt2);
  shortcutkey[1] = prompt2;
 }
 else {
  alert("You did not enter anything, so your shortcut 2 will remain the same");
 }
 shortcutUpdated();
}

function changeShortcut3() {
 var prompt3 = prompt("Enter the letter or number for shortcut 3 which directs to " + document.links[2].href + " ", "");
 if (prompt3.length > 1) {
  while (prompt3.length > 1) {
   prompt3 = prompt("Shorcuts can only be one character long. Please try again.", "");
  }
 }
 if (prompt3.length == 1) {
  GM_setValue("shortcut3", prompt3);
  shortcutkey[2] = prompt3;
 }
 else {
  alert("You did not enter anything, so your shortcut 3 will remain the same");
 }
 shortcutUpdated();
}

function changeShortcut4() {
 var prompt4 = prompt("Enter the letter or number for shortcut 4 which directs to " + document.links[3].href + " ", "");
 if (prompt4.length > 1) {
  while (prompt4.length > 1) {
   prompt4 = prompt("Shorcuts can only be one character long. Please try again.", "");
  }
 }
 if (prompt4.length == 1) {
  GM_setValue("shortcut4", prompt4);
  shortcutkey[3] = prompt4;
 }
 else {
  alert("You did not enter anything, so your shortcut 4 will remain the same");
 }
 shortcutUpdated();
}


function shortcutUpdated() {
 if (showNumbers) {
  for (x=0; x<4; x++) {
   liTags[x].innerHTML = oldHTML[x] + "<BR><DIV STYLE=\"position: relative; top: -20px; right: -138px; font-family: arial; color: black\"><B>" + shortcutkey[x] + "</B></DIV>";
   liTags[x].innerHTML = liTags[x].innerHTML + "<DIV STYLE=\"position: relative; top: -38px; right: -136px; font-family: arial;\"><B>" + shortcutkey[x] + "</A></B></DIV>";
  }
 }
 doUnicode();
}


// COLLECT ALL THE UNICODE INFORMATION FOR EACH KEY
var unicodeNO = new Array();
var unicodeNO2 = new Array();

function doUnicode() {
for (x=0; x<4; x++) {

 if (shortcutkey[x] == "1") { unicodeNO[x] = 49;  unicodeNO2[x] = 97; }
 if (shortcutkey[x] == "2") { unicodeNO[x] = 50;  unicodeNO2[x] = 98; }
 if (shortcutkey[x] == "3") { unicodeNO[x] = 51;  unicodeNO2[x] = 99; }
 if (shortcutkey[x] == "4") { unicodeNO[x] = 52;  unicodeNO2[x] = 100; }
 if (shortcutkey[x] == "5") { unicodeNO[x] = 53;  unicodeNO2[x] = 101; }
 if (shortcutkey[x] == "6") { unicodeNO[x] = 54;  unicodeNO2[x] = 102; }
 if (shortcutkey[x] == "7") { unicodeNO[x] = 55;  unicodeNO2[x] = 103; }
 if (shortcutkey[x] == "8") { unicodeNO[x] = 56;  unicodeNO2[x] = 104; }
 if (shortcutkey[x] == "9") { unicodeNO[x] = 57;  unicodeNO2[x] = 105; }
 if (shortcutkey[x] == "0") { unicodeNO[x] = 58;  unicodeNO2[x] = 106; }
 if (shortcutkey[x] == "A" | shortcutkey[x] == "a") { unicodeNO[x] = 65; }
 if (shortcutkey[x] == "B" | shortcutkey[x] == "b") { unicodeNO[x] = 66; }
 if (shortcutkey[x] == "C" | shortcutkey[x] == "c") { unicodeNO[x] = 67; }
 if (shortcutkey[x] == "D" | shortcutkey[x] == "d") { unicodeNO[x] = 68; }
 if (shortcutkey[x] == "E" | shortcutkey[x] == "e") { unicodeNO[x] = 69; }
 if (shortcutkey[x] == "F" | shortcutkey[x] == "f") { unicodeNO[x] = 70; }
 if (shortcutkey[x] == "G" | shortcutkey[x] == "g") { unicodeNO[x] = 71; }
 if (shortcutkey[x] == "H" | shortcutkey[x] == "h") { unicodeNO[x] = 72; }
 if (shortcutkey[x] == "I" | shortcutkey[x] == "i") { unicodeNO[x] = 73; }
 if (shortcutkey[x] == "J" | shortcutkey[x] == "j") { unicodeNO[x] = 74; }
 if (shortcutkey[x] == "K" | shortcutkey[x] == "k") { unicodeNO[x] = 75; }
 if (shortcutkey[x] == "L" | shortcutkey[x] == "l") { unicodeNO[x] = 76; }
 if (shortcutkey[x] == "M" | shortcutkey[x] == "m") { unicodeNO[x] = 77; }
 if (shortcutkey[x] == "N" | shortcutkey[x] == "n") { unicodeNO[x] = 78; }
 if (shortcutkey[x] == "O" | shortcutkey[x] == "o") { unicodeNO[x] = 79; }
 if (shortcutkey[x] == "P" | shortcutkey[x] == "p") { unicodeNO[x] = 80; }
 if (shortcutkey[x] == "Q" | shortcutkey[x] == "q") { unicodeNO[x] = 81; }
 if (shortcutkey[x] == "R" | shortcutkey[x] == "r") { unicodeNO[x] = 82; }
 if (shortcutkey[x] == "S" | shortcutkey[x] == "s") { unicodeNO[x] = 83; }
 if (shortcutkey[x] == "T" | shortcutkey[x] == "t") { unicodeNO[x] = 84; }
 if (shortcutkey[x] == "U" | shortcutkey[x] == "u") { unicodeNO[x] = 85; }
 if (shortcutkey[x] == "V" | shortcutkey[x] == "v") { unicodeNO[x] = 86; }
 if (shortcutkey[x] == "W" | shortcutkey[x] == "w") { unicodeNO[x] = 87; }
 if (shortcutkey[x] == "X" | shortcutkey[x] == "x") { unicodeNO[x] = 88; }
 if (shortcutkey[x] == "Y" | shortcutkey[x] == "y") { unicodeNO[x] = 89; }
 if (shortcutkey[x] == "Z" | shortcutkey[x] == "z") { unicodeNO[x] = 90; }
 
 if (unicodeNO[x] > 64 && unicodeNO[x] < 91) { unicodeNO2[x] = unicodeNO[x]; }

}
}

doUnicode();

var oldHTML = new Array();


// CREATES AN ARRAY OF ALL THE <LI> ITEMS
var liTags = document.getElementsByTagName("li");
for (x=0; x<4; x++) {
  oldHTML[x] = liTags[x].innerHTML;
}


function showNumbersNow() {
 if (showNumbers) {

  // GOES THROUGH THE FIRST 4 <LI> ITEMS AND ADDS THE SHORCUT KEY OVER THE IMAGE WITH A SHADOW
  for (x=0; x<4; x++) {
   liTags[x].innerHTML = liTags[x].innerHTML + "<BR><DIV STYLE=\"position: relative; top: -20px; right: -138px; font-family: arial; color: black\"><B>" + shortcutkey[x] + "</B></DIV>";
   liTags[x].innerHTML = liTags[x].innerHTML + "<DIV STYLE=\"position: relative; top: -38px; right: -136px; font-family: arial;\"><B>" + shortcutkey[x] + "</A></B></DIV>";
  }
 }
}


function shortcutKeys(e){

 // GETS THE UNICODE NUMBER OR SOMETHING LIKE THAT
 var unicode=e.keyCode? e.keyCode : e.charCode

 // LOOPS THROUGH KEYS 1-4 TO SEE IF THEY ARE PRESSED
 // AND CHANGES THE WINDOW LOCATION TO THE ASSOCIATED URL
 for (x=0; x<4; x++) {
  if (unicode==unicodeNO[x] | unicode==unicodeNO2[x]) { window.location = document.links[x].href; }
 }

}

// LISTENS TO SEE IF A KEY IS RELEASED
// AND THEN EXECUTES THE FUNCTION ABOVE
window.addEventListener("keyup", shortcutKeys, false);


showNumbersNow();

//function initiateToggleCommand() {
//if (showNumbers) {
GM_registerMenuCommand("Toggle Shorcut Visibility", toggleNumbers);
//}
//else {
//GM_registerMenuCommand("Show shortcuts", toggleNumbers);
//}
//}

//initiateToggleCommand();

GM_registerMenuCommand("Change shortcut 1", changeShortcut1);
GM_registerMenuCommand("Change shortcut 2", changeShortcut2);
GM_registerMenuCommand("Change shortcut 3", changeShortcut3);
GM_registerMenuCommand("Change shortcut 4", changeShortcut4);
