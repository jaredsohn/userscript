// ==UserScript==
// @name           FB phonebook Exporter
// @namespace      elleestcrimi
// @include        http://www.facebook.com/friends/edit/?sk=phonebook
// ==/UserScript==

var $;

// Add jQuery
(function()
{
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() 
{
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() 
{
	var CSV = 'First Name,Middle Name,Last Name,Mobile Phone,Home Phone';
	$('#contentArea ul.uiList li.uiListItem.uiListLight.uiListVerticalItemBorder').each(function(){
		var name = $(this).find('div.fsl.fwb.fcb a').text();
		var namesbf = name.split("'");
		name = '';		
		
		for(var i =0; i < namesbf.length; i++)
			name = name + namesbf[i];
			
		var names = name.split(" ");
		var middleName = '';
		
		for(var i =1; i < names.length-1; i++)
			middleName = middleName + " "+names[i];

		CSV = CSV + "\n"+names[0]+","+middleName+","+names[names.length-1];
		var hasMobile = false;
		$(this).find('div.fsl').each(function(){
			if(!$(this).hasClass('fwb'))
			{
				var label = $(this).find('span').first().text();
				if(label == "MOBILE")
					hasMobile=true;
				var number = $(this).text().split(label)[0];
				if(!hasMobile)
				{
					CSV = CSV + ",,"+number
				}
				else
				{
					CSV = CSV + ","+number
				}
			}
		});
	});
	window.location='data:text/csv;charset=utf8,' + encodeURIComponent(CSV);
}