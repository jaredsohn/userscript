// ==UserScript==
// @id             19920306
// @name           Remove Tumblr Annoyances
// @version        1.1.2
// @namespace      
// @author         momokobo
// @description    Remove Tumblr Radar and Spot/Highlights on the dashboard (and possibly other pages)
// @include        http://www.tumblr.com/*
// @run-at         document-end
// ==/UserScript==


// before removing, hide them via css
var htmlhead = document.getElementsByTagName('head')[0];
if(htmlhead != null)
{
    css_style = document.createElement('style');
    css_style.type = 'text/css';
    css_style.innerHTML = '.with_blingy_tag { display: none !important; }';
    htmlhead.appendChild(css_style);
}

var elmDeleted = document.getElementById("tumblr_radar");
if(elmDeleted)
{
    elmDeleted.parentNode.removeChild(elmDeleted);
}

var spotlight = document.getElementById("recommended_tumblelogs");
if(spotlight)
{
    spotlight.parentNode.removeChild(spotlight);
}

function getElementsByClass( searchClass, domNode, tagName) { 
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) { 
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1) 
			el[j++] = tags[i];
	} 
	return el;
} 

function removeAnnoyingElementsByClass(className) { // special for tumblr
   var elements = getElementsByClass(className),
       n = elements.length;
    for (var i = 0; i < n; i++)
    {
        var e = elements[i].parentNode.parentNode.parentNode; // li
        var et = elements[i].parentNode.parentNode.parentNode.nextElementSibling; // notice li
        if(et != null)
        {
            if(et.className.length > 0)
            {
                if(et.className.indexOf('full_answer_container_wrapper') != -1)
                {
                    et.parentNode.removeChild(et);
                    et = elements[i].parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling;
                }
                et.className = et.className.replace(/(first|single)_notification/,''); // remoce ugly space
            }
            e.parentNode.removeChild(e);
            
            if(et.previousElementSibling.className.indexOf('notification') == -1)
            {
                et.className += ' first_notification ';
            }
        }

    }
}

removeAnnoyingElementsByClass('with_blingy_tag');

// ORIGINAL==UserScript==
// ORIGINAL@name           Disable Tumblr Radar
// ORIGINAL@namespace      http://userscripts.org/users/462976
// ORIGINAL@description    Disables Tumblr Radar, because it, you know, sucks.
// ORIGINAL@include        http://www.tumblr.com/*
// ORIGINAL==/UserScript==