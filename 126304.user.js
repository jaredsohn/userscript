// Date: 06.12.2012
//
// It could be very dangerous to save the TAN hashes in this script.
// So keep the file in a save place.
//
// ==UserScript==
// @name        Flatex Sessionlogin
// @namespace   http://unknown/
// @description Flatex Login with session password
// @include     https://konto.flatex.de/*
// @version     1
// @grant       none
// ==/UserScript==

// The secret TANs. Fill in your TANs here.
var rowA=['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'];
var rowB=['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'];
var rowC=['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'];
var rowD=['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'];
var rowE=['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'];
var rowF=['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'];
var rowG=['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'];
var rowH=['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9'];
var rowK=['K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9'];
var rowL=['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9'];
var rowM=['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9'];

var i, j, inputs, input, tan, tansplit, texts, text;
tan='';

texts  = document.getElementsByClassName('FormAreaInputFieldLeftLabel');
inputs = document.getElementsByTagName('INPUT');

// Look up the Word TAN: and find the right TAN
for (i=0; i<texts.length; i++) {
    text = texts[i];
    if (text.textContent.indexOf("TAN:") != -1) {
        tansplit=text.textContent.split(" ");

        // Look up TAN
        for (j=1; j<5; j++) {
            switch(tansplit[j].charAt(0)) {
                case "A": tan=tan + rowA[tansplit[j].charAt(1)-1]; break;
                case "B": tan=tan + rowB[tansplit[j].charAt(1)-1]; break;
                case "C": tan=tan + rowC[tansplit[j].charAt(1)-1]; break;
                case "D": tan=tan + rowD[tansplit[j].charAt(1)-1]; break;
                case "E": tan=tan + rowE[tansplit[j].charAt(1)-1]; break;
                case "F": tan=tan + rowF[tansplit[j].charAt(1)-1]; break;
                case "G": tan=tan + rowG[tansplit[j].charAt(1)-1]; break;
                case "H": tan=tan + rowH[tansplit[j].charAt(1)-1]; break;
                case "K": tan=tan + rowK[tansplit[j].charAt(1)-1]; break;
                case "L": tan=tan + rowL[tansplit[j].charAt(1)-1]; break;
                case "M": tan=tan + rowM[tansplit[j].charAt(1)-1]; break;
            }
        }
    }
}

// Find the TAN input box and set the value
for (i=0; i<inputs.length; i++) {
    input = inputs[i];
    if (input.name == "sessionPasswordEditField.text" || input.name == "securityMethodSubForm.tan.text") {
        input.value=tan;
        // Press login button
        document.getElementsByName('sessionPasswordButton')[0].click();
    }
}
