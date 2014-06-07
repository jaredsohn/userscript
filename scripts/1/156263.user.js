// ==UserScript==
// @name        Zerter
// @namespace   http://userscripts.org/users/501572
// @description Enters zert giveaways for you.
// @include     http://www.zert.com/giveaways*
// @version     1
// ==/UserScript==
var sum;
var done = 0;
function run() {
setTimeout(click,200);
setTimeout(readValues,400);
setTimeout(setValue,500);
setTimeout(submit,600);
setTimeout(startOver,11500);
if (done === 0) setTimeout(run,12000);
}

function click() {
var greenBtn = document.getElementsByClassName("enter-giveaway-btn");
for (var i = 0; i < 1000; i++) {
if (greenBtn[i].innerHTML === 'CLICK HERE TO ENTER THIS GIVEAWAY') {
greenBtn[i].click();
return;
}
if (i === 999) {
alert("all done");
done = 1;
}
}
}

function readValues() {
var r1 = document.getElementById("rand1").innerHTML;
var r2 = document.getElementById("rand2").innerHTML;
sum = parseInt(r1)+parseInt(r2);
}

function setValue() {
document.getElementById("math-captcha").value = sum;
}

function submit() {
document.evaluate("//button[contains(@id, 'submit-math-captcha')]", document, null, 9, null).singleNodeValue.click();
}

function startOver() {
document.evaluate("//button[contains(@class, 'close-captcha')]", document, null, 9, null).singleNodeValue.click();
}

run();