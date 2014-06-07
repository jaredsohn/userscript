// ==UserScript==

// @name           dokujunkies_-_dokudb.user.js
// @namespace      http://stevo.saxn.at/scripts
// @include        http://*dokujunkies.org*
// @copyright stevo

// ==/UserScript==

var formular = document.createElement('form');
var inputTitel = document.createElement('input');
var inputText = document.createElement('textarea');
var submitter = document.createElement('input');
var inputImage = document.createElement('input');
var dokuDBdiv = document.createElement('div');
var spanAchtung = document.createElement('span');
var inputFile = document.createElement('input');
var BR1 = document.createElement('br');

dokuDBdiv.id = "dokuDBdiv";
dokuDBdiv.style.background = "#303030";
dokuDBdiv.style.position = "absolute";
dokuDBdiv.style.right = "10px";
dokuDBdiv.style.top = "20px";
dokuDBdiv.style.border = "1px solid #AACC00";
dokuDBdiv.style.width = "390px";
dokuDBdiv.style.height = "470px";
dokuDBdiv.style.paddingTop = "8px";
dokuDBdiv.style.color = "#B0B0B0";
dokuDBdiv.textContent = "send to the incredible dokuDB!"

formular.id = "DBformular";
formular.method = "post";
formular.name = "DBformular";
formular.action = "http://stevo.saxn.at/dokuDB/dokuCC.php";
formular.acceptCharset = "ascii";

inputTitel.type = "text";
inputTitel.name = "titel";
inputTitel.style.width = "350px";
inputTitel.style.marginTop = "20px";
inputTitel.style.marginBottom = "2px";

inputText.name = "text";
inputText.style.width = "350px";
inputText.style.height = "270px";

inputImage.type = "text";
inputImage.name = "image";
inputImage.style.marginTop = "2px";
inputImage.style.width = "350px";

submitter.type = "submit";
submitter.id = "submitter";
submitter.style.marginTop = "14px";


document.body.appendChild(dokuDBdiv);
document.getElementById('dokuDBdiv').appendChild(formular);
document.getElementById('DBformular').appendChild(inputTitel);
document.getElementById('DBformular').appendChild(inputText);
document.getElementById('DBformular').appendChild(inputImage);
document.getElementById('DBformular').appendChild(BR1);
document.getElementById('DBformular').appendChild(submitter);



inputTitel.value = document.getElementById("content").getElementsByTagName("A")[0].textContent;
inputText.value = document.getElementById("content").getElementsByTagName("p")[1].innerHTML;
if (document.getElementById("content").getElementsByTagName("p")[1].innerHTML.substring(0, 6) == "Dauer:") {
	inputText.value = document.getElementById("content").getElementsByTagName("p")[2].innerHTML;
}else if (document.getElementById("content").getElementsByTagName("p")[1].innerHTML.substring(0, 14) == "<strong>Dauer:") {
	inputText.value = document.getElementById("content").getElementsByTagName("p")[2].innerHTML;
}

inputText.value = inputText.value.replace(/”/g,"!ascii34");
inputText.value = inputText.value.replace(/“/g,"!ascii34");
inputText.value = inputText.value.replace(/’/g,"!ascii39");
inputText.value = inputText.value.replace(/…/g,"...");


var Bildl = document.getElementById("content").getElementsByTagName("IMG")[0];
inputImage.value = Bildl.getAttribute("src");