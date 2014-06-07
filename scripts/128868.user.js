// ==UserScript==
// @name    e-sim dmg
// @namespace      e-sim dmg
// @include http://e-sim.org*
// ==/UserScript==
//Hungarian translation by Campari

var tst ='323';
var newdiv=document.createElement('div');
var divIdName='testDiv';
var divClassName='plate';

var calcdiv="<div id='element'><label class='text'>Food Quality:</label><div id='foodradio'><div id='column'><label for='q1-food'>Q1</label><br><input style='width:15px;' type='text' size='2' maxlength='2' id='q1f' value='0'></div><div id='column'><label for='q2-food'>Q2</label><br><input type='text' style='width:15px;' style='width:15px;' size='2' maxlength='2' id='q2-food-in'></div><div id='column'><label for='q3-food'>Q3</label><br><input type='text' style='width:15px;' size='2' maxlength='2' id='q3-food-in'></div><div id='column'><label for='q4-food'>Q4</label><br><input type='text' style='width:15px;' size='2' maxlength='2' id='q4-food-in'></div><div id='column'><label for='q5-food'>Q5</label><br><input type='text' style='width:15px;' size='2' maxlength='2' id='q5-food-in'></div><div id='column'><div id='food-amount'></div></div></div><div id='food-error'></div></div><div id='element'><label class='text'><br>Gift Quality:</label><div id='giftradio'><div id='column'><label for='q1-gift'>Q1</label><br><input type='text' style='width:15px;' size='2' maxlength='2' id='q1-gift-in'></div><div id='column'><label for='q2-gift'>Q2</label><br><input type='text' style='width:15px;' size='2' maxlength='2' id='q2-gift-in'></div><div id='column'><label for='q3-gift'>Q3</label><br><input type='text' style='width:15px;' size='2' maxlength='2' id='q3-gift-in'></div><div id='column'><label for='q4-gift'>Q4</label><br> <input type='text' style='width:15px;' size='2' maxlength='2' id='q4-gift-in'></div><div id='column'><label for='q5-gift'>Q5</label><br><input type='text' style='width:15px;' size='2' maxlength='2' id='q5-gift-in'></div><div id='column'><div id='gift-amount'></div></div></div></div><div id='element'><label class='text'><br>Weapons:</label><div id='weaponradio'><div id='column'><label for='q0-wep'>No</label><br><input type='text' style='width:15px;' size='2' maxlength='3' id='q0-wep-in'></div><div id='column'><label for='q1-wep'>Q1</label><br><input type='text' style='width:15px;' size='2' maxlength='3' id='q1-wep-in'></div><div id='column'><label for='q2-wep'>Q2</label><br><input type='text' style='width:15px;' size='2' maxlength='3' id='q2-wep-in'></div><div id='column'><label for='q3-wep'>Q3</label><br><input type='text' style='width:15px;' size='2' maxlength='3' id='q3-wep-in'></div><div id='column'><label for='q4-wep'>Q4</label><br><input type='text' style='width:15px;' size='2' maxlength='3' id='q4-wep-in'></div><div id='column'><label for='q5-wep'>Q5</label><br><input type='text' style='width:15px;' size='2' maxlength='3' id='q5-wep-in'> </div></div><div id='weapon-amount'></div></div></div>";

var calcdivre="<table style='text-align: left; width: 100%;' border='1'cellpadding='2' cellspacing='2'><tbody><tr align='center'><td colspan='3' rowspan='1'><spanstyle='font-weight: bold;'>DAMAGE Calculator</span></td></tr><tr><td>Food quality</td><td><form action='' method='get' name='food'><label>Q1</label><input maxlength='2' size='2' name='fq1'><label>Q2</label><input maxlength='2'size='2' name='fq2'><label>Q3</label><input maxlength='2' size='2' name='fq3'><label>Q4</label><input maxlength='2'size='2' name='fq4'><label>Q5</label><input maxlength='2' size='2' name='fq5'></form></td><td colspan='1' rowspan='3'><input value='Click' name='Calculate' type='button' onClick='test()'></td></td></tr><tr><td>Gift quality</td><td><form action='' method='get' name='food'><label>Q1</label><input maxlength='2' size='2' name='gq1'><label>Q2</label><input maxlength='2' size='2' name='gq2'><label>Q3</label><input maxlength='2' size='2' name='gq3'><label>Q4</label><input maxlength='2' size='2' name='gq4'><label>Q5</label><input maxlength='2' size='2' name='gq5'></form></td></tr><tr><td>Wepons</td><td><form action='' method='get' name='food'><label>Q1</label><input maxlength='2' size='2' name='wq1'><label>Q2</label><input maxlength='2' size='2' name='wq2'><label>Q3</label><input maxlength='2' size='2' name='wq3'><label>Q4</label><input maxlength='2' size='2' name='wq4'><label>Q5</label><input maxlength='2' size='2' name='wq5'></form></td></tr><tr><td>Your damage:</td><td colspan='2' rowspan='1'></td></tr></tbody></table>" ;

var tst3="<FORM NAME='myform' ACTION='' METHOD='GET'>Enter something in the box: <BR><INPUT TYPE='text' NAME='inputbox' VALUE=''><P><INPUT TYPE='button' NAME='button' Value='Click' onClick='testResults(this.form)'></FORM>";


newdiv.setAttribute('id',divIdName);
newdiv.setAttribute('class',divClassName);
newdiv.style.width = "500px";
newdiv.style.height = "140px";
newdiv.style.left = "400px";
newdiv.style.top = "5px";
newdiv.style.position = "absolute";
newdiv.innerHTML = calcdivre 
document.body.appendChild(newdiv); 

function explode (delimiter, string, limit) {
    // Splits a string on string separator and return array of components. If limit is positive only limit number of components is returned. If limit is negative all components except the last abs(limit) are returned.  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/explode    // +     original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: kenneth
    // +     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     improved by: d3x
    // +     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)    // *     example 1: explode(' ', 'Kevin van Zonneveld');
    // *     returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
    // *     example 2: explode('=', 'a=bc=d', 2);
    // *     returns 2: ['a', 'bc=d']
    var emptyArray = { 0: ''
    };
 
    // third argument is not required
    if (arguments.length < 2 || typeof arguments[0] == 'undefined' || typeof arguments[1] == 'undefined') { return null;
    }
 
    if (delimiter === '' || delimiter === false || delimiter === null) {
 return false;    }
 
    if (typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object') {
 return emptyArray;
    } 
    if (delimiter === true) {
 delimiter = '1';
    }
     if (!limit) {
 return string.toString().split(delimiter.toString());
    }
    // support for limit argument
    var splitted = string.toString().split(delimiter.toString());    var partA = splitted.splice(0, limit - 1);
    var partB = splitted.join(delimiter.toString());
    partA.push(partB);
    return partA;
}


function getStrength() {
var allHTMLTags=document.getElementsByTagName("table");
for (i=0; i<allHTMLTags.length; i++) {
if (allHTMLTags[i].className=="attributesTable") {
var strtxt=allHTMLTags[i].innerHTML;
var strarr=explode("<td>",strtxt);
strtxt=strarr[10];
strarr=explode("</td>",strtxt,2);
strtxt=strarr[0];
return strtxt;
}
}
}

function getRank() {
var allHTMLTags=document.getElementsByTagName("table");
for (i=0; i<allHTMLTags.length; i++) {
if (allHTMLTags[i].className=="attributesTable") {
var ranktxt=allHTMLTags[i].innerHTML;
var rankarr=explode("<td>",ranktxt);
ranktxt=rankarr[6];
rankarr=explode("</td>",ranktxt,2);
ranktxt=rankarr[0];
return ranktxt;
}
}
}

function testResults (form) {
    var TestVar = form.inputbox.value;
    alert ("You typed: " + TestVar);
}

function test (){
alert ("Működik!!!");
}