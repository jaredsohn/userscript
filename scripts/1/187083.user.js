// ==UserScript==
// @name        enaplo-tanmenet
// @namespace   enaplo
// @include     https:*.mozanaplo.hu/*
// @include     http:*.mozanaplo.hu/*
// @include     file:///*
// @version     1
// ==/UserScript==

var planedTexts = {unknown : "???"};
var elmFoo = document.getElementById('user_config_button');

var elmLabel = document.createElement('div');
elmLabel.innerHTML = 'Válassz tanmenet file-okat!';
elmFoo.parentNode.insertBefore(elmLabel, elmFoo);

var elmFileContent = document.createElement('input');
elmFileContent.type = 'file';
elmFileContent.id = 'fileSelect';
elmFileContent.multiple = true;
elmFileContent.addEventListener('change', readFile, false);
elmFoo.parentNode.insertBefore(elmFileContent, elmFoo);

var elmNewContent = document.createElement('input');
elmNewContent.type = 'button';
elmNewContent.id = 'PlanTextButton';
elmNewContent.disabled = true;
elmNewContent.value = 'Tanmenet szerinti órák';
elmNewContent.addEventListener('click', WriteOverAllByDefault, false);
// var elmFoo = document.getElementById('user_config_button');
elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);

function readFile()
{
    var fileList = this.files;
    for (var i = 0, numFiles = fileList.length; i < numFiles; i++) {
	(function (file) {
	    var reader = new FileReader();
	    reader.onload = function(e) {
	    planedTexts[file.name] = e.target.result;
	    };
	    reader.readAsText(file);
//	alert(file.name);
	})(fileList[i]);
    }
    document.getElementById('PlanTextButton').disabled = false;
}

function getPlanedText( tantargy, osztaly, ora)
{
    var returnText = "";
    var oraSzam = 0;
    var convText = "";
    var fileName = "";

    convText = tantargy.replace(/(<([^>]+)>)/g, "");
    fileName = convText.toLowerCase() + "-" +
	osztaly.toLowerCase().replace(/(<([^>]+)>)/g, "").replace(/\,\ /g, "_");
//    alert(fileName);
    oraSzam = Number(ora) - 1;
    returnText = planedTexts[fileName].split("\n")[oraSzam];
    return returnText;
}

function WriteOverAllByDefault()
{
    var Text = "";
    var table = document.getElementById('lista');
    if (table.rows.length > 1) {
	for (var r = 2, n = table.rows.length; r < n; r++) {
	    Text = getPlanedText(table.rows[r].cells[1].innerHTML,
				 table.rows[r].cells[2].innerHTML,
				 table.rows[r].cells[6].innerHTML);

	    table.rows[r].cells[7].getElementsByTagName('input')[0].value =
		Text;
        }
    }
}