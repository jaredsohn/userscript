// ==UserScript==
// @name           AIB Login
// @namespace      AIB
// @include        https://aibinternetbanking.aib.ie/inet/roi/login.htm
// ==/UserScript==

var step = document.getElementsByClassName("aibImageTitle")[1].getElementsByTagName("span")[0];
if(step != null && step.innerHTML == "Step 2 of 2")
{
    var pass = "12345";
    var digits = document.getElementsByClassName("aibRowRight")[0].getElementsByTagName("strong");
    var inputs = document.getElementsByClassName("aibRowRight")[0].getElementsByTagName("input");
    for(var i = 0; i < digits.length; i++)
    {
        inputs[i].value = pass.charAt(digits[i].innerHTML.replace("Digit ", "") - 1);
    }
}