// ==UserScript==
// @name           Rate.ee Rater
// @description    Automatically rates pictures with 5
// @include        *
// @author	   iAreCow ;)
// ==/UserScript==

if(radio=document.evaluate('//input[@type="radio" and @value="5" and @onclick="destroy_ten_div(); if(pressed.value==0){pressed.value=1;this.form.submit()}"]',document,null,9,null).singleNodeValue) {
radio.checked = true;
radio.click();
}