// ==UserScript==
// @name        Filtre escouade EW
// @namespace   http://*.epic-war.net
// @include     http://*.epic-war.net/frame_escouade.php
// @version     1.0.0
// @grant       none
// ==/UserScript==


var fe_table = document.getElementsByName('membres').item(0).parentNode.nextSibling.nextSibling;
var fe_checkbox_list = {'Surface' : '', 'Souterrain' : '', 'Cloaque' : '', 'Mort' : '', 'Vacances' : ''};


function feCreateCheckbox(txt)
{
	var feLabelNode = document.createElement('label');
	feLabelNode.style.marginRight = '20px';
	feLabelNode.style.display = 'inline-block';
	feLabelNode.style.lineHeight = '23px';
	feLabelNode.style.padding = '1px 4px 0 0';
	feLabelNode.style.marginRight = '20px';
	feLabelNode.style.border = '1px solid transparent';
	feLabelNode.onmouseover = function() { this.style.border = '1px solid #604706'; };
	feLabelNode.onmouseout = function() { this.style.border = '1px solid transparent'; };
	
	var feInputNode = document.createElement('input');
	feInputNode.type = 'checkbox';
	feInputNode.checked = 'checked';
	feInputNode.onclick = feCheckTable;
	feInputNode.onchange = feCheckTable;
	feInputNode.onkeyup = feCheckTable;
	
	feLabelNode.appendChild(feInputNode);
	feLabelNode.appendChild(document.createTextNode(txt));
	
	
	fe_checkbox_list[txt] = feInputNode;
	
	return(feLabelNode);
}

function feCheckTable()
{
	var feListTr = fe_table.getElementsByTagName('tr');
	
	for(var i = 0; i < feListTr.length; i++)
	{
		if(feListTr[i].childNodes[7].tagName == 'TD')
		{
			if(fe_checkbox_list[feListTr[i].childNodes[7].innerHTML].checked)
				feListTr[i].style.display = 'table-row';
			else
				feListTr[i].style.display = 'none';
		}
	}
}

function feCreateCheckBox()
{
	var divNode = document.createElement('div');
	divNode.style.padding = '3px 0px 10px 0px';
	
	for(var i in fe_checkbox_list)
		divNode.appendChild(feCreateCheckbox(i));
	
	fe_table.parentNode.insertBefore(divNode, fe_table);
	feCheckTable();
}

feCreateCheckBox();
