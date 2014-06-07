// ==UserScript==
// @name			FF.net changes by toasty2
// @namespace		http://files.randomresources.org/projects/gm_misc
// @description   	Author filter and visual tweaks for FanFiction.net
// @version			0.7
// @include			http://www.fanfiction.net/*/*
// @include			http://fanfiction.net/*/*
// @include			https://www.fanfiction.net/*/*
// @include			https://fanfiction.net/*/*
// ==/UserScript==
// ======================================================
if(!GM_addStyle) // for Chrome
{
	GM_addStyle = function(css)
	{
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
    }
}
Array.prototype.contains = function(obj){var i = this.length;while(i--){if (this[i] === obj) {return true;}} return false;}
// Settings
	//localStorage.setItem(name, value);
	//localStorage.getItem(name);
	//var author_filter = localStorage.getItem('author_filter');
var filtered = 0;
	
function filterAuthors()
{
	if(!(localStorage.getItem('author_filter') === null))
	{
		var a = document.getElementsByTagName('a');
		for(var i=0;i<a.length;i++)
		{
			var c = a[i];
			if (c)
			{
				var d = localStorage.getItem('author_filter').split(',');
				var e = c.innerHTML;
				if (d.contains(e))
				{
					c.parentNode.style.display='none';
					c.parentNode.style.visibility='hidden';
					//GM_log('filtering '+e);
					filtered++;
				}
				//GM_log(e);
			}
		}
	}
}
function editFilter()
{
	f = prompt('Authors/titles to filter:\n - separate by commas\n - no extra spaces or commas\n - cancelling will clear it\n - copy & paste to ensure correct names (must be exact)',localStorage.getItem('author_filter'));
	(!(f === null) && f.length>0) ? localStorage.setItem('author_filter',f) : localStorage.setItem('author_filter','ExampleAuthor');
	window.location.reload();
}

function addFilter()
{
	alert(this.name+' added to the filter');
	localStorage.setItem('author_filter',localStorage.getItem('author_filter')+','+this.name);
	window.location.reload();
}

filterAuthors();

// Visuals
GM_addStyle('body {background-color:rgb(102, 102, 102) !important;'); // overall document
GM_addStyle('a:link, a:visited {color:#78AADD !important;} .z-high {background-color:#333399 !important;}'); // links, story list
GM_addStyle('#content_wrapper_inner {background-color:#222222 !important;color: white !important;}'); // links, story list
//GM_addStyle('.zmenu, .zui, #content_parent{background-color:#222222;} .menu-linklor:#222222;}'); // nav
GM_addStyle('.zmenu, .zui, #content_parent {background-color:#222222 !important;}');
GM_addStyle('.storytextp, #storytextp, .storytext, #storytext {color:white;background-color:black;}'); // story area
GM_addStyle('center div {background-image:none !important;padding:0 !important;border-bottom:none !important;}'); // white bar under nav
GM_addStyle('.a2a_kit {display:none !important;}'); // Share
GM_addStyle('div.lc {background-color: #222222 !important;}'); // the centered story settings bar


document.getElementById('top').getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML +='&nbsp; <i><a href="#" id="editFilter">Filter ('+filtered+')</a>&nbsp;&nbsp;</i>'
document.getElementById('editFilter').addEventListener('click',editFilter,false);

if(document.getElementById('content_wrapper_inner'))
{
	var a = document.getElementById('content_wrapper_inner').getElementsByClassName('z-list');
	for(var b=0;b<a.length;b++)
	{
		var c = a[b].getElementsByTagName('a');
		for(i=0;i<c.length;i++)
		{	
			if(c[i].href.search(/\/u\//i) != -1)
			{
				var d = c[i].innerHTML;
			}
		}
		a[b].innerHTML='<a href="#" name="'+d+'" class="filterlink">x</a> '+a[b].innerHTML;
	}
	a = document.getElementsByClassName('filterlink');
	for(var b=0;b<a.length;b++)
	{
		a[b].addEventListener('click',addFilter,false);
	}
}