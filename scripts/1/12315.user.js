// ==UserScript==
// @name           StudiVZ: Web Suche mit Google anstatt mit Yahoo
// @namespace      http://nowebpageyet.org
// @description    Dieses Script ersetzt die neue Yahoo Suche (Tab "studiVZ/Web" oben links) durch eine Google Suche
// @include        http://www.studivz.net/*
// ==/UserScript==

(function()
{

	/*********************************************
	**** Web-Suche Tab bei QuickSearch oben links ***
	*********************************************/
	
	var yahooForm = document.getElementById('yahoo_search_form').childNodes[0];
	if(yahooForm != null)
	{
		changeSearchForm(yahooForm);

		//changed powered by string
		var yahooPoweredBy = document.getElementById('yahoo_powered_by_yahoo');

		if(yahooPoweredBy != null)
			yahooPoweredBy.innerHTML = 'powered by Google';
	}
		
		
	/*********************************************
	*********** Web-Suche Tab bei Suche ***********
	*********************************************/
	
	if(gup('search_tab') == 'yahoo')
	{
		yahooForm = document.forms[2];
		if(yahooForm != null)
		{
			changeSearchForm(yahooForm);

			//changed powered by string
			var yahooPoweredBy = yahooForm.getElementsByTagName('span');

			for (var i=0; i<yahooPoweredBy.length; i++)
			{
				if(yahooPoweredBy[i].id == 'yahoo_powered_by_yahoo')
				{
					yahooPoweredBy[i].innerHTML = 'powered by Google';
					break;
				}
			}	
		}
	}
	
	/* thanks to [http://www.netlobo.com/url_query_string_javascript.html] */
	function gup(name)
	{
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results == null )
			return "";
		else
			return results[1];
	}
	
	
	function changeSearchForm(form)
	{
		//remove and change all input form elements
		for (var i=form.childNodes.length - 1; i >= 0; i--)
		{
			if(form.childNodes[i].type == 'hidden')
				 form.removeChild(form.childNodes[i]);
	 
			if((form.childNodes[i].type == 'text') && (form.childNodes[i].name == 'p'))
				form.childNodes[i].name = 'q';	
		}
		
		//change get url
		form.action = 'http://www.google.com/search';
		
		//create google get parameter hidden fields
		var newHidden = document.createElement('input');
		newHidden.setAttribute('type', 'hidden');
		newHidden.setAttribute('name', 'ie');
		newHidden.setAttribute('value', 'utf-8');
		form.appendChild(newHidden);

		newHidden = document.createElement('input');
		newHidden.setAttribute('type', 'hidden');
		newHidden.setAttribute('name', 'oe');
		newHidden.setAttribute('value', 'utf-8');
		form.appendChild(newHidden);

		newHidden = document.createElement('input');
		newHidden.setAttribute('type', 'hidden');
		newHidden.setAttribute('name', 'aq');
		newHidden.setAttribute('value', 't');
		form.appendChild(newHidden);
	}
}
)();