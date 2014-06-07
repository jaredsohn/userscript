// ==UserScript==
// @name       MTurk Check If Accepted
// @version    0.1
// @description  enter something useful
// @match      https://www.mturk.com/mturk/*groupId*
// @copyright  2012+, Tjololo
// ==/UserScript==


var images = document.getElementsByName("/accept");
var len = images.length;
console.log(len);
var haveChecked = false;

var prev = /prevRequester/g;
if (document.URL.indexOf("prevRequester") >= 0){
    console.log("match");
    checkAccept();
}

document.onkeydown = checkAccept;

function checkAccept()
{
    console.log("Checking");
    console.log(document.activeElement.tagName);
    console.log(len);
    if (haveChecked == false && len == 2 || document.activeElement == document.getElementsByTagName("HTMLQuestionIFrame")[0]){
        if (confirm("You have not accepted this hit yet, accept now?"))
            images[0].click();
        haveChecked = true;
    }
}