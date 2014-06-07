// ==UserScript==
// @name		FailraidAnnihilator
// @description		Removes any mention of the term "samefag"
// @version		1.3
// @copyright		2010 - itaots
// @license		CC-BY-SA :Creative Commons Attribution-Share Alike 3.0 Unported License; http://creativecommons.org/licenses/by-sa/3.0/
// @include http://*
// ==/UserScript==

(function(){
	
	var samefagInstances = document.body.innerHTML.match(/samefag/ig);
	
	if (samefagInstances != null)
	{
		if (samefagInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/samefag/ig,'HURR I AM A HUEG FAGGOT PLEASE RAPE MY FACE');

		}	
	}

	var sameffagInstances = document.body.innerHTML.match(/same fag/ig);

	if (sameffagInstances != null)
	{
		if (sameffagInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/same fag/ig,' HURR I AM A HUEG FAGGOT PLEASE RAPE MY FACE');

		}	
	}

	var samefffagInstances = document.body.innerHTML.match(/SAMEFAG/ig);

	if (samefffagInstances != null)
	{
		if (samefffagInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/SAMEFAG/ig,'HURR I AM A HUEG FAGGOT PLEASE RAPE MY FACE');

		}	
	}

	var sameffffagInstances = document.body.innerHTML.match(/SAME FAG/ig);

	if (sameffffagInstances != null)
	{
		if (sameffffagInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/SAME FAG/ig,'HURR I AM A HUEG FAGGOT PLEASE RAPE MY FACE');

		}	
	}

	if (samefffagInstances != null)
	{
		if (samefffagInstances.length > 0)
		{
			document.body.innerHTML = document.body.innerHTML.replace(/SAMEFAG/ig,'HURR I AM A HUEG FAGGOT PLEASE RAPE MY FACE');

		}	
	}
	
})();