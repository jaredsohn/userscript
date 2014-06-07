// ==UserScript==
// @name       InstaTranslate+
// @namespace  http://use.i.E.your.homepage/
// @version    1.0.0
// @description  A tool to quickly & easily translate text.
// @include      http://*
// @include      https://*
// @copyright  2014+, Tyler Jablonski
// ==/UserScript==
function getSelectedText() {
    var text = "";
    if (typeof window.getSelection != "undefined") {
        text = window.getSelection().toString();
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        text = document.selection.createRange().text;
    }
        return text;
}

function doSomethingWithSelectedText() {
    var selectedText = getSelectedText();
    window.onkeydown = function(event) {
        if (selectedText && event.keyCode === 107) {
            var canDo = confirm("Are you sure you would you like to translate this text?");
            if (canDo==true)
            {
                var myword=selectedText;
                var urlSetUp="http://www.translate.google.com/#auto/en/";
                var urlGo=urlSetUp.concat(myword);
                window.open(urlGo);
            }
        }
        else if (event.keyCode === 107) {
            var myword=prompt("What phrase would you like to translate?");
            if (myword!=null)
            {
                var urlSetUp="http://www.translate.google.com/#auto/en/";
                var urlGo=urlSetUp.concat(myword);
                window.open(urlGo);
            }
        }
            }
}

document.onmouseup = doSomethingWithSelectedText;
document.onkeyup = doSomethingWithSelectedText;