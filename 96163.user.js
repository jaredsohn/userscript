// ==UserScript==
// @name           account helper function
// @namespace      kolCtH
// @exclude *
// ==/UserScript==
function buildPrefs()
{
	if (!document.querySelector('#privacy'))
		return;
	if (!document.querySelector('#scripts'))
	{
		//scripts tab is not built, do it here
		var scripts = document.querySelector('ul').appendChild(document.createElement('li'));
		scripts.id = 'scripts';
		var a = scripts.appendChild(document.createElement('a'));
		a.href = '#';
		var img = a.appendChild(document.createElement('img'));
		img.src = 'http://images.kingdomofloathing.com/itemimages/cmonkey1.gif';
		img.align = 'absmiddle';
		img.border = '0';
		img.style.paddingRight = '10px';
		a.appendChild(document.createTextNode('Scripts'));
		a.addEventListener('click', function (e)
		{
			//make our new tab active when clicked, clear out the #guts div and add our settings to it
			e.stopPropagation();
			document.querySelector('.active').className = '';
			document.querySelector('#scripts').className = 'active';
			document.querySelector('#guts').innerHTML = '<div class="scaffold"></div>';
			document.querySelector('#guts').appendChild(getSettings())
		}, false);
	}
	else
	{
		//script tab already exists
		$('#scripts').firstChild.addEventListener('click', function (e)
		{
			//some other script is doing the activation work, just add our settings
			e.stopPropagation();
			document.querySelector('#guts').appendChild(getSettings());
		}, false);
	}
	
	function getSettings()
	{
		//build our settings and return them for appending
		var contents = document.body.appendChild(document.createElement('div'))
		contents.id = scriptID
		var fieldset = contents.appendChild(document.createElement('fieldset'))
		fieldset.setAttribute('style', 'width:33%; margin-top:20px')
		var legend = fieldset.appendChild(document.createElement('legend'))
		legend.className = 'subhead'
		legend.textContent = scriptName
		var section = fieldset.appendChild(document.createElement('div'))
		section.className = 'indent'
		//call function in main script to actually make the settings
		section.appendChild(buildSettings());
	}
}
