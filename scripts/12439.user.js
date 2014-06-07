// ==UserScript==
// @name			Scheming Mind: Toggle Game Comments Button
// @description		Creates a button to toggle game comments on and off
// @include			http://www.schemingmind.com/game.aspx?game_id=*
// ==/UserScript==

var objDiv = document.getElementById('Div1');
var siblingObj = document.getElementById('ctl00_ContentPlaceHolder1_Table8');
var spanArray = objDiv.getElementsByTagName('span');

var toggleLink = document.createElement('a');
var linkText = document.createTextNode('[Toggle Comments]');
toggleLink.setAttribute('href','#');
toggleLink.appendChild(linkText);
toggleLink.addEventListener('click',schemingMindToggleComments,true);

var toggleLink2 = document.createElement('a');
var linkText2 = document.createTextNode('[Toggle Comments]');
toggleLink2.setAttribute('href','#');
toggleLink2.appendChild(linkText2);
toggleLink2.addEventListener('click',schemingMindToggleComments,true);

objDiv.insertBefore(toggleLink,siblingObj.nextSibling);
objDiv.appendChild(toggleLink2);

var schemingMindCommentsAreVisible = true;
function schemingMindToggleComments()
{
	for (var i=0; i < spanArray.length; i++)
	{
		var thisSpan = spanArray[i];
		if ((thisSpan.style.fontStyle == 'italic')|(thisSpan.style.color == 'Green'))
		{
			if(schemingMindCommentsAreVisible==false)
			{
				thisSpan.style.display = '';
			}
			else
			{
				thisSpan.style.display = 'none';
			}
		}
	}
	schemingMindCommentsAreVisible = !schemingMindCommentsAreVisible;
}