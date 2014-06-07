// ==UserScript==
// @name       Which Way Script
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  Selects right or left using keyboard shortcuts
// @match      https://s3.amazonaws.com/mturk_bulk/hits*
// @copyright  2012+, You
// ==/UserScript==

var tags = document.getElementsByTagName("input");
var radios = [];
for (var i=0; i<tags.length; i++) {
  // Get the radio buttons
  if (tags[i].type == "radio") {
    radios.push(tags[i]);
  }
}
//var radios = document.getElementsByClassName("radiobutton");
var isDirectionHit = (document.getElementsByName('exp_1')[0] ? true : false);
var idPrefix = "exp_";
console.log(isDirectionHit);

var questionSelector = 0;
var idStart = "";
var name = "";
var div = null;
var newFormat = false;
var numHits = radios.length / 2;
console.log(numHits);

document.onkeydown = showkeycode;
var content = document.getElementById("mturk_form");
content.tabIndex = "0";
content.focus();

function showkeycode(evt){
    if (isDirectionHit){
        var keycode = evt.keyCode;
        console.log(keycode);
        switch (keycode) {
            case 78: //n
                questionSelector++;
                if (questionSelector == numHits+1)
                {
                    questionSelector = 1;
                }
                name = idPrefix+""+questionSelector;
                console.log(name);
                idStart = ""+name.slice(0,-1);
                if (div != null)
                    div.style.backgroundColor = "#FFFFFF";
                div = document.getElementsByName(name)[0].parentNode;
                div.style.backgroundColor="#F3E88E";
                div.scrollIntoView((questionSelector >= numHits ? true : false));
                console.log(idStart);
                break;
            case 72: //h
                questionSelector++;
                if (questionSelector == numHits+1)
                {
                    questionSelector = 1;
                }
                name = idPrefix+""+questionSelector;
                console.log(name);
                idStart = ""+name.slice(0,-1);
                if (div != null)
                    div.style.backgroundColor = "#FFFFFF";
                div = document.getElementsByName(name)[0].parentNode;
                div.style.backgroundColor="#F3E88E";
                div.scrollIntoView((questionSelector >= numHits ? true : false));
                console.log(idStart);
                break;
            case 80: //p
                questionSelector--;
                name = idPrefix+""+questionSelector;
                if (div == null || name == "exp_0"){
                    questionSelector = numHits;
                    name = idPrefix+questionSelector;
                }
                if (div == null)
                    div = document.getElementsByName(name)[0].parentNode;
                else
                    div.style.backgroundColor="#FFFFFF";
                console.log(name);
                div = document.getElementsByName(name)[0].parentNode;
                div.style.backgroundColor="#F3E88E";
                div.scrollIntoView((questionSelector >= numHits ? true : false));
                break;
            case 71: //g
                questionSelector--;
                name = idPrefix+""+questionSelector;
                if (div == null || name == "exp_0"){
                    questionSelector = numHits;
                    name = idPrefix+questionSelector;
                }
                if (div == null)
                    div = document.getElementsByName(name)[0].parentNode;
                else
                    div.style.backgroundColor="#FFFFFF";
                console.log(name);
                div = document.getElementsByName(name)[0].parentNode;
                div.style.backgroundColor="#F3E88E";
                div.scrollIntoView((questionSelector >= numHits ? true : false));
                break;
            case 76: //Left
                name = idPrefix+questionSelector;
                var button = document.getElementsByName(name);
                console.log(name);
                for (var i = 0; i < button.length; i++) {
                    if (button[i].value == 1)
                        button[i].checked = true;
                    console.log(name + " " + button[i].value);
                }
                break;
            case 70: //f
                name = idPrefix+questionSelector;
                var button = document.getElementsByName(name);
                console.log(name);
                for (var i = 0; i < button.length; i++) {
                    if (button[i].value == 1)
                        button[i].checked = true;
                    console.log(name + " " + button[i].value);
                }
                break;
            case 82: //Right
                name = idPrefix+questionSelector;
                var button = document.getElementsByName(name);
                for (var i = 0; i < button.length; i++) {
                    if (button[i].value == 2)
                        button[i].checked = true;
                }
                break;
            case 74: //j
                name = idPrefix+questionSelector;
                var button = document.getElementsByName(name);
                for (var i = 0; i < button.length; i++) {
                    if (button[i].value == 2)
                        button[i].checked = true;
                }
                break;
            case 13: //enter
                var button = document.getElementById("submitButton");
                if (confirm("Submit?")) button.click();
                break;
            case 66: //Bad
                name = "off_"+questionSelector;
                var button = document.getElementsByName(name)[0];
                console.log(name);
                button.checked = !button.checked;
                break;
            case 191: // /
                alert("l/f: Left; r/j: Right; b: Bad Stickman; /: help; enter: submit; n/h: Next; p/g: Previous");
                break;
            default: break;
        }
    }
}