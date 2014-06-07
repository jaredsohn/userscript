// ==UserScript==
// @name HZ Mail Simple Spamfilter
// @namespace HZVLD
// @author drie0025
// @version 0.2
// @description Automatically deletes spam from Marum, Aav Aav and Trias Omega. Please make sure to set the name of your delete button in the GM menu. The default value is the Dutch 'Verwijderen'. If something goes wrong, simply turn greasemonkey or this script off and retrieve your deleted emails from your trash before it's too late. Please report any bugs!
// @include https://mail.hzeeland.nl/gw/webacc*
// ==/UserScript==
GM_registerMenuCommand('Set delete button name', function(){ setDeleteName(); } );

var bdelete = 0;
var as = document.getElementsByTagName('a');
for (var i=0; i < as.length; i++)
{
	var a = as[i];
	if ((a.innerHTML.search('Marum') != -1 || a.innerHTML.search('Trias Omega') != -1 || a.innerHTML.search('Aav Aav') != -1) && a.parentNode.parentNode.getElementsByTagName('a')[0] == a) //@todo add menu entry for easy customization
	{
		select(a);
		bdelete = 'blarg';
	}
}

if (bdelete == 'blarg')
{
	deleteSpam();
}

function select(bericht)
{
	var checkbox = a.parentNode.parentNode.getElementsByTagName('td')[0].getElementsByTagName('input')[0];
	checkbox.click();
}

function deleteSpam()
{
	for (var j=0; j < as.length; j++)
	{
		if (as[j].getAttribute('title') == GM_getValue('deleteButton', 'Verwijderen'))
		{
			fireEvent(as[j],'click');
		}
	}
}

function setDeleteName()
{
	var newname = prompt('Please type in what your delete button in HZ Mail is called (Delete or Verwijderen for example)', 'Delete');
	if (newname != null && newname != '')
		GM_setValue('deleteButton', newname);
}

function fireEvent(obj,evt){

	var fireOnThis = obj;
	if( document.createEvent ) {
	var evObj = document.createEvent('MouseEvents');
	evObj.initEvent( evt, true, false );
	fireOnThis.dispatchEvent(evObj);
	} else if( document.createEventObject ) {
	fireOnThis.fireEvent('on'+evt);
	}
	}