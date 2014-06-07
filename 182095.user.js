// ==UserScript==
// @name       Imgsrc EZ Pass Buttons
// @namespace  http://mattman00000.com
// @version    0.5.1
// @description  Adds buttons for entering EZ passes
// @match      http://imgsrc.ru/*
// @copyright  2013+, mattman00000
// ==/UserScript==

console.warn("Activating EZ pass button insertion");


var newButtonOne = document.createElement("input");
newButtonOne.setAttribute("value","1");
newButtonOne.setAttribute("onclick","document.getElementsByName('pwd')[0].value = document.getElementsByName('pwd')[0].value.concat(1)");
newButtonOne.setAttribute("type","button");
newButtonOne.setAttribute("style","font-size:16px;");
document.getElementsByName('pwd')[0].parentNode.appendChild(newButtonOne);

var newButtonTwoThreeFour = document.createElement("input");
newButtonTwoThreeFour.setAttribute("value","234");
newButtonTwoThreeFour.setAttribute("onclick","document.getElementsByName('pwd')[0].value = document.getElementsByName('pwd')[0].value.concat(234)");
newButtonTwoThreeFour.setAttribute("type","button");
newButtonTwoThreeFour.setAttribute("style","font-size:16px;");
document.getElementsByName('pwd')[0].parentNode.appendChild(newButtonTwoThreeFour);

var newButtonFive = document.createElement("input");
newButtonFive.setAttribute("value","5");
newButtonFive.setAttribute("onclick","document.getElementsByName('pwd')[0].value = document.getElementsByName('pwd')[0].value.concat(5)");
newButtonFive.setAttribute("type","button");
newButtonFive.setAttribute("style","font-size:16px;");
document.getElementsByName('pwd')[0].parentNode.appendChild(newButtonFive);

var newButtonFourThreeTwo = document.createElement("input");
newButtonFourThreeTwo.setAttribute("value","432");
newButtonFourThreeTwo.setAttribute("onclick","document.getElementsByName('pwd')[0].value = document.getElementsByName('pwd')[0].value.concat(432)");
newButtonFourThreeTwo.setAttribute("type","button");
newButtonFourThreeTwo.setAttribute("style","font-size:16px;");
document.getElementsByName('pwd')[0].parentNode.appendChild(newButtonFourThreeTwo);
