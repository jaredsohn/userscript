// ==UserScript==
// @name           Google Bar Classic
// @namespace      bars
// @description    Old-fashioned top and side bars for google sites
// @version        1.6
// @license        MIT License
// @include        http://*.google.*
// @include        http://google.*
// @include        https://*.google.*
// @include        https://google.*

// ==/UserScript==

//build new css
var newStyle = document.createElement('style');
newStyle.type = 'text/css';
newStyle.innerHTML = '\
	#gbx3, #gbx4 {background-color:#FFFFFF;border-bottom:1px solid #CCCCCC;background-image:url(//ssl.gstatic.com/gb/images/b_8d5afc09.png);}\
    .gbts {color:#2A5DB0;}\
    .gbtsa {text-decoration:none;}\
    .gbz0l .gbtb2 {border-top-color: #1A54E1 !important;}\
    .gbz0l .gbts {text-decoration:none;color:#000000;font-weight:bold;}\
    #gbi5 {background-position: -6px -22px !important;}\
    .tbos, .tbots, .tbotu {color:#000000;}\
    .msel {background-color:#3366fe;color:#FFFFFF;font-weight:bold;}\
    #leftnav h2 {color:#000000;font-weight:bold;}\
    .mitem > .kl, #ms > .kl {color:#2200C1;}\
    #lc a, .tbou > a.q, #tbpi, #tbtro, .tbt label, #prc_opt, #set_location_section a, .tbtctlabel, #swr a {color:#2200C1;}\
    .gbzt-hvr,.gbgt-hvr{background-color: #ecf0f8 !important;}\
    #gbz .gbzt, #gbz .gbgt, #gbg .gbgt {color: white!important;}\
    .newmicon {background-image: url("https://www.google.com/images/srpr/nav_logo73.png") !important;}\
';

//insert it
document.getElementsByTagName('head')[0].appendChild(newStyle);
var replaceCount = 50;

function replaceIcons()
{
	replaceCount = replaceCount-1;
	var className='.csb, .ss, .play_icon, .mini_play_icon, .micon, .licon, .close_btn, #tbp, .mbi, .inline_close_btn';
	var styleText='';
    for(var s=0;s<document.styleSheets.length;s++)
    {
    	var classes = document.styleSheets[s].rules || document.styleSheets[s].cssRules;
	    for(var x=0;x<classes.length;x++) 
	    {
	    	
	        if(classes[x].selectorText==className) {	        	
	                if(classes[x].cssText)
                		styleText = classes[x].cssText;
	                else
                		styleText = classes[x].style.cssText;
	        }
	    }
	}

    if(styleText.indexOf("images/experiments/nav_logo78.png")>0)
	{
		objs=document.getElementsByClassName("micon")
		for(i=0;i<objs.length;i++)
		{
			objs[i].className += " newmicon";
			var moreStyle = document.createElement('style');
			moreStyle.type = 'text/css';
			moreStyle.innerHTML = '\
				#showmodes .micon {background-position: -150px -113px;}\
				.open #showmodes .micon {background-position: -131px -113px;}\
			';
			document.getElementsByTagName('head')[0].appendChild(moreStyle);
		}
	}
	
	if(replaceCount>0)
	{
		setTimeout(function(){replaceIcons()},100);		
	}
}

//replace icons
setTimeout(function(){replaceIcons()},100);		