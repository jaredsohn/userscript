// ==UserScript==
// @name           Mob Wars - Focus on first target in hit list
// @namespace      http://apps.facebook.com/mobwars/hitlist/
// @description    Focuses on the first "attack" button in the hit list page of Mob Wars
// @include        http://apps.facebook.com/mobwars/hitlist/*
// ==/UserScript==

window.addEventListener( 'load', function( e ) {

	var inputs = document.getElementsByTagName('input');
	var elt = null, type = null;
	
	for (var j=0; j < inputs.length; j++)
	{
		elt = inputs[j];
		type = elt.getAttribute('type');
		if (type != null && type.toLowerCase() == 'submit')
		{
			elt.focus();
			break;
		}
	}


},false);
