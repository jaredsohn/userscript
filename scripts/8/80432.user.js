// ==UserScript==
// @name           	AttackLink2 v 0.4
// @author         	envy
// @namespace      http://ikariamlibrary.com/
// @description    	Add general link to toolbar
// @include        	http://s*.ikariam.*/index.php*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

var title = document.title.split(' ');
var server = title[title.length-1];

var cityId = 17350;

window.addEventListener('load',  function() 
{
	try
	{
		if (document.getElementById('errorLoggedOut') != null)
		{
			return; // Don't do anything on the error page
		}
		
		var divToolbar = document.getElementById('GF_toolbar');	
		if (divToolbar && divToolbar != 'undefined') {
			
			var link = document.createElement('a');
			link.innerHTML = 'Атаки';
			link.href = '/index.php?view=embassyGeneralAttacksToAlly&id=' + cityId;
			
			var liElem = document.createElement('li');
			liElem.className = 'help';

			liElem.appendChild(link);		
			divToolbar.childNodes[3].appendChild(liElem);		
		}
		
		
	}
	catch(er){alert("Error.\n" + er)}
	},
	true);
