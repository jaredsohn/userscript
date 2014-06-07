// ==UserScript==
// @name           Q-Load MultiF
// @author         PattyPat
// @version        1.0
// @namespace      www.q-load.me
// @description    Auf der Q-Load.me Startseite können mehrere Felder hinzugefügt werden...
// @include        http://q-load.me/index.php
// @include        http://q-load.me
// @include        http://q-load.me/
// @include        http://q-load.me/home
// ==/UserScript==

var quelltext_form = '\n<table style="width: 100%"><tr><td style="width: 80%; padding-left: 10px;"><input type="text" id="reqFile" style="width: 100%;" name="reqFile" value="" /></td><td style="width: 20%; text-align: left; padding-left: 20px;"><input type="submit" value="Runterladen!"/></td></tr></table>';


function set_att(createat, nodevalue)
{
	att = document.createAttribute(createat);
	att.nodeValue = nodevalue;
	return att;
}
function set_form()
{
	navbar = document.getElementsByTagName("form")[0];
	if (navbar) {
		newElement = document.createElement('form');
		action = set_att('action', 'download');
		method = set_att('method', 'post');
		id = set_att('id', 'formg1');
		style = set_att('style', 'margin-top:5px;');
		target = set_att('target', '_blank');
		navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
		document.getElementsByTagName("form")[1].setAttributeNode(action);
		document.getElementsByTagName("form")[1].setAttributeNode(method);
		document.getElementsByTagName("form")[1].setAttributeNode(id);
		document.getElementsByTagName("form")[1].setAttributeNode(style);
		document.getElementsByTagName("form")[1].setAttributeNode(target);
		document.getElementsByTagName("form")[1].innerHTML = quelltext_form;
	}
}
function set_forms(zahl)
{
	navbar = document.getElementById("formg"+zahl);
	if (navbar) {
		newElement = document.createElement('form');
		action = set_att('action', 'download');
		method = set_att('method', 'post');
		style = set_att('style', 'margin-top:5px;');
		target = set_att('target', '_blank');
		ons = set_att('onsubmit', 'return fn_evaluateDownload();');
		id = set_att('id', 'formg'+(zahl+1));
		navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
		document.getElementsByTagName("form")[(zahl+1)].setAttributeNode(id);
		document.getElementById("formg"+(zahl+1)).setAttributeNode(action);
		document.getElementById("formg"+(zahl+1)).setAttributeNode(method);
		document.getElementById("formg"+(zahl+1)).setAttributeNode(style);
		document.getElementById("formg"+(zahl+1)).setAttributeNode(target);
		document.getElementById("formg"+(zahl+1)).setAttributeNode(ons);
		document.getElementById("formg"+(zahl+1)).innerHTML = quelltext_form;
	}
}

function create_textarea()
{
	wert = document.getElementById('ftxtarea').getAttribute('style');
	if (wert == 'display: none;')
	{
		document.getElementById('ftxtarea').setAttribute('style', '');
	} 
	else
	{
		document.getElementById('ftxtarea').setAttribute('style', 'display:none;');
	}
}

function create_forms()
{
	zZ = document.getElementById('anzf').value;
	zZ -= 1;
	set_form();
	for (i=1; i<=zZ;i++)
	{
		set_forms(i);
	}
}

function ltf()
{
	text = document.getElementById('flinks').value;
	text = text.split('\n');
	var nr = 0;
	for each (var vue in text)
	{
		field = document.getElementsByName('reqFile')[nr];
		field.value = vue;
		nr += 1;
	}
	
}

old_quell = document.getElementById('download-box').innerHTML;
add_quell = 'Q-Load MultiF - Script by <a target="_blank"href="http://q-board.me/pattypat-u2356/">PattyPat</a><br /><div style="padding:3px;">'+
				'Anzahl der Felder die sie hinzufügen wollen:<input id="anzf" type="text" size="2"/>'+
				'&nbsp;&nbsp;<input type="submit" id="fsubmit" value="Hinzufügen" />'+
			'</div><a href="javascript:create_textarea()" id="fmore">Mehrere Links einfügen</a><div id="ftxtarea" style="display:none;"><span style="font-size:small;">Info: Bevor sie Links eintragen und sie zu den Feldern hinzufügen wollen müssen sie zuerst die Felder Hinzufügen!</span><textarea id="flinks" rows="20" cols="100%"></textarea><br /><input type="submit" id="finputter" value="Einfügen.." /></div>';
document.getElementById('download-box').innerHTML = add_quell + old_quell;
document.getElementById('fsubmit').addEventListener('click',create_forms, false);
document.getElementById('fmore').addEventListener('click',create_textarea, false);
document.getElementById('finputter').addEventListener('click',ltf, false);
document.getElementsByTagName("form")[0].setAttribute('target', '_blank');
