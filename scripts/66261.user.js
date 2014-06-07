// ==UserScript==
// @name           Extreme Tube FLV Linker
// @namespace      etflvl
// @version        0.0.8
// @description    Provides Links to FLV files on Extreme Tube
// @include        *www.extremetube.com*
// @history	   0.0.8 Updated for website changes, "Hello scraper"
// @history	   0.0.7 Updated for website change, ?r=100 added to download url
// @history	   0.0.6 Updated for new website. Again.
// @history	   0.0.5 Updated for new website.
// @history	   0.0.4 Code cleanup and retry for unresponsive requests.
// ==/UserScript==

//Written by Chris

//Helper function for searching by classname
function isMember(element, classname)
{
	var classes = element.className;
	if (!classes) return false;
        if (classes == classname) return true;

        var whitespace = /\s+/;
        if (!whitespace.test(classes)) return false;

        var c = classes.split(whitespace);
        for(var i = 0; i < c.length; i++)
	{
            if (c[i] == classname) return true;
        }
        return false;
}

//class for download button:
//buttons-img float-left video-download
function getDivWithClassName(name)
{
	var div_elements = document.getElementsByTagName("div");
	if (!div_elements) return;
	for(var i = 0; i < div_elements.length; i++)
	{
		if (isMember(div_elements[i], name)) return div_elements[i];
	}
	return false;	
}

//Check for download button
var el_button = getDivWithClassName("buttons-img float-left video-download");
if (!el_button) return;

//Find Flash Container
//video-container absolute
var el_flash = getDivWithClassName("video-container absolute");
if (!el_flash) return;

//Get the flv url and decode
var flv_url = el_flash.innerHTML.match(/flashvars\.video_url = '([\w'%\.]+)';/)[1];
flv_url = flv_url.replace(/%3A/g,":");
flv_url = flv_url.replace(/%2F/g,"/");
flv_url = flv_url.replace(/%3F/g,"?");
flv_url = flv_url.replace(/%3D/g,"=");
flv_url = flv_url.replace(/%26/g,"&");
//alert(flv_url);

el_button.firstChild.href=flv_url;

//alert("done");