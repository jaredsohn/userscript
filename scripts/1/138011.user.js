// ==UserScript==
// @name           	Youtube Profit Aproximator
// @author	   		Runaurufu
// @description    	Tool to easy approximate cash earned on YouTube video (based on views count)
// @namespace      	http://userscripts.org/scripts/show/138011
// @version        	0.09
// @include        	http://www.youtube.com/watch?*
// @grant			none
// ==/UserScript==

window.addEventListener('load', function()
{

	var chk=setInterval(function()
	{		
		doc = document.getElementsByTagName("body");
		if(doc.length == 0 || doc[0].innerHTML.length < 500)
		{	return;	}
		clearInterval(chk);
		ypa_main();
		
	},100);
}, false);

//	-= Bootstraper =-
function ypa_main()
{
	var isNew = true;
	var view;
	
	isNew = document.getElementById('watch7-user-header') != null;

	
	if(isNew)
	{
		view = document.getElementsByClassName('watch-view-count')[0].innerHTML.replace(/^\s+|\s+$/g,'').split(" ")[0];
	}
	else
	{
		view = document.getElementsByClassName('watch-view-count')[0].getElementsByTagName('strong')[0].innerHTML;
	}
	
	view = new Number(view.replace(/[\D]/g,''));
	var info = document.createElement("span");
	info.title = "Projected earning";
	info.innerHTML = Math.floor((view*4.5)/10)/1000 + "$ " + Math.floor((view)/2)/1000 + "&euro; ";
	
	if(isNew)
		document.getElementById('watch7-user-header').insertBefore(info, document.getElementsByClassName('watch7-views-info')[0]);
	else
		document.getElementById('watch-actions-right').insertBefore(info, document.getElementsByClassName('watch-view-count')[0]);
}