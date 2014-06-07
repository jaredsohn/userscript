// ==UserScript==
// @name       RnR Script
// @version    3.76
// @description  Helpful things to do the ProductRnR adult content hits
// @match      https://www.mturkcontent.com/dynamic/hit*
// @copyright  2012+, You
// ==/UserScript==

var radios = document.getElementsByClassName("radiobutton");
var radios2 = document.getElementsByTagName("input");
var isRnRHit = false;
var isResultsHit = false;
var isCaptionHit = false;
var isSimilarHit = false;
var idPrefix = (document.getElementById('__Result0_1') ? "__Result" : "Q");
console.log(idPrefix);
var mark = (GM_getValue("mark") ? GM_getValue("mark") : false);

for (i = 0; i < radios.length; i++) {
    if (radios[i].value == 'nowatermark' || radios[i].value.match(/.*no(t|n)adult/i) || radios[i].value.match(/.*Unrelated/i)) {
            radios[i].checked = true;
            isRnRHit = true;
        }
}

for (i = 0; i < radios2.length; i++) {
    var val = (mark ? radios2[i].value.replace(/unrelated/i,"") : radios2[i].value);
    var name = new RegExp((mark ? "related" : "unrelated"), 'i');
    if (radios2[i].type == "radio"){
        if (name.test(val)){
            radios = radios2;
            radios[i].checked = true;
            isRnRHit = true;
            isResultsHit = true;
        }
        if (radios2[i].value.match(/imagecaption.*/i))
        {
            radios = radios2;
            isCaptionHit = true;
            isRnRHit = true;
        }
    }
}

if (!isRnRHit){
    for (i = 0; i < radios2.length; i++){
        if (radios2[i].type == "radio"){
            if (radios2[i].value.match(/.*imagesimilarity.*/i)){
                isSimilarHit = true;
                isRnRHit = true;
            }
        }
        if (isRnRHit)
            break;
    }
}

function reMark(){
    mark = !mark;
    GM_setValue("mark", mark);
    var name = new RegExp((mark ? "related" : "unrelated"), 'i');
    for (i = 0; i < radios.length; i++) {
        var val = (mark ? radios[i].value.replace(/unrelated/i,"") : radios[i].value);
        if (name.test(val)){
            radios[i].checked = true;
        }
    }
}

var questions = document.getElementsByClassName((isCaptionHit || isSimilarHit || isResultsHit ? "documentbox" : "singlebox"));
var names = [];
for (i = 0; i < questions.length; i++) {
    names.push(questions[i]);
}

var questionSelector = -1;
var idStart = "";
var name = "";
var div = null;
var newFormat = false;

document.onkeydown = showkeycode;
var content = document.getElementById("content");
content.tabIndex = "0";
content.focus();

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
        };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
        };
}

function toggle(obj) {
    console.log("Toggle: "+obj);
	var el = document.getElementById(obj);
    var disp = GM_getValue('disp');
    console.log(disp)
	if ( !disp || disp != 'none' ) {

		el.style.display = 'none';
        GM_setValue('disp', 'none');
	}

	else {

		el.style.display = '';
        GM_setValue('disp', '');
	}

}
var first = true;
if (first){
    var disp = GM_getValue('disp');
    var el = document.getElementById("sidebar");
    if (disp == 'none')
        el.style.display = 'none';
    first = false;
}

function showkeycode(evt){
    if (isRnRHit){
        var keycode = evt.keyCode;
        console.log(keycode);
        switch (keycode) {
            case 78: //n
                questionSelector++;
                if (questionSelector == (isResultsHit || isCaptionHit || isSimilarHit ? names.length : names.length-1))
                {
                    questionSelector = 0;
                }
                name = idPrefix+""+questionSelector+"_1";
                idStart = ""+name.slice(0,-1);
                if (div != null)
                    div.style.backgroundColor = "#FFFFFF";
                if (isCaptionHit)
                    div = document.getElementById(name).parentNode.parentNode.parentNode.parentNode;
                else if (isSimilarHit)
                    div = document.getElementById(name).parentNode.parentNode.parentNode;
                else
                    div = document.getElementById(name).parentNode;
                div.style.backgroundColor="#F3E88E";
                div.scrollIntoView((questionSelector >= names.length-1 ? true : false));
                console.log(idStart);
                break;
            case 80: //p
                questionSelector--;
                name = idPrefix+""+questionSelector+"_1";
                console.log(names.length);
                if (div == null || name == idPrefix+"-1_1"){
                    questionSelector = (isResultsHit || isCaptionHit || isSimilarHit ? names.length - 1 : names.length - 2);
                    name = idPrefix+""+questionSelector+"_1";
                }
                if (div == null){
                    if (isCaptionHit)
                        div = document.getElementById(name).parentNode.parentNode.parentNode.parentNode;
                    else if (isSimilarHit)
                        div = document.getElementById(name).parentNode.parentNode.parentNode;
                    else
                        div = document.getElementById(name).parentNode;
                }
                else
                    div.style.backgroundColor="#FFFFFF";
                console.log(idStart);
                idStart = ""+name.slice(0,-1);
                if (isCaptionHit)
                    div = document.getElementById(name).parentNode.parentNode.parentNode.parentNode;
                else if (isSimilarHit)
                    div = document.getElementById(name).parentNode.parentNode.parentNode;
                else
                    div = document.getElementById(name).parentNode;
                div.style.backgroundColor="#F3E88E";
                div.scrollIntoView((questionSelector >= names.length-1 ? true : false));
                break;
            case 77: //m
                name = idStart+"7";
                var button = document.getElementById(name);
                if (button == null)
                {
                    name = idStart+"2";
                    button = document.getElementById(name);
                }
                button.checked = true;
                break;
            case 192: //`
                console.log("Remark Started");
                reMark();
                console.log("remark end");
                break;
            case 85: //u
                name = idStart+"2";
                button = document.getElementById(name);
                button.checked = true;
                break;
            case 13: //enter
                var button = document.getElementById("SubmitButton");
                if (confirm("Submit?")) button.click();
                break;
            case 72: //h
                name = idStart+"1";
                var button = document.getElementById(name);
                console.log(name);
                button.checked = true;
                break;
            case 82: //r
                name = idStart+"1";
                var button = document.getElementById(name);
                console.log(name);
                button.checked = true;
                break;
            case 49: //1
                name = idStart+"1";
                var button = document.getElementById(name);
                console.log(name);
                button.checked = true;
                break;
            case 97: //numpad 1
                name = idStart+"1";
                var button = document.getElementById(name);
                console.log(name);
                button.checked = true;
                break;
            case 88: //x
                name = idStart+"2";
                var button = document.getElementById(name);
                button.checked = true;
                break;
            case 50: //2
                name = idStart+"2";
                var button = document.getElementById(name);
                button.checked = true;
                break;
            case 98: //numpad 2
                name = idStart+"2";
                var button = document.getElementById(name);
                button.checked = true;
                break;
            case 69: //e
                name = idStart+"3";
                var button = document.getElementById(name);
                button.checked = true;
                break;
            case 83: //s
                name = idStart+"4";
                var button = document.getElementById(name);
                button.checked = true;
                break;
            case 87: //w
                name = idStart+"1";
                var button = document.getElementById(name);
                button.checked = true;
            case 66: //b
                name = idStart+"5";
                var button = document.getElementById(name);
                button.checked = true;
                break;
            case 71: //g
                name = idStart+"6";
                var button = document.getElementById(name);
                button.checked = true;
                break;
            case 68: //d
                name = idStart+"8";
                var button = document.getElementById(name);
                if (button == null)
                {
                    name = idStart+"3";
                    button = document.getElementById(name);
                }
                button.checked = true;
                break;
            case 90: //z
                toggle("sidebar");
                break;
            case 191: // /
                alert("n: next, p: previous. m: non-nude/no watermark/unrelated; r: related; w: watermark; h: hardcore; x: explicit; e: educational nudity; s: suggestive; b: bad language; g: gruesome; d: did not load; z: toggle sidebar visibility; `: Switch related/unrelated; 1: Choose first caption/image; 2: Choose second caption/image");
                break;
            default: break;
        }
    }
}