//
// Written by Omar Cherif
// Script Version: 0.0.6
//
//
// ==UserScript==
// @name           Dark theme for Wikipedia
// @description    A cool dark theme for Wikipedia
// @include        http://*.wikipedia.org/*
// ==/UserScript==

function DarkStyles(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

DarkStyles(
	'h1, h2, h3, h4, h5, h6 { color: white ! important; }'
	+
	'body  { background: #222222 ;}'
	+
	'div#mw-panel div.portal div.body ul li a { color: #00ccff ;}' 
	+
	'div#mw-panel div.portal div.body ul li a:visited { color: #8AD6FF;}' 
	+
	'div.vectorTabs li a { color: #00ccff;}'
	+
	'div.vectorTabs li.selected a, div.vectorTabs li.selected a:visited  { color: #ededed ;}'
	+
	'table { color: white ! important; background-color: #222222 ! important;}'
	+
	'#content {background: black ! important; color: white ! important;}'
	+
	'.pBody { color: white ! important; background-color: #222222 ! important;}'
	+
	'.catlinks {background-color: #222222 ! important;}'
	+
	'th {background-color: #222222 ! important;}'
	+
	'code {background-color: #000000 ! important;}'
	+
	'.ns-0 #p-cactions li a {background-color: #222222 ! important;}'
	+
	'#p-logo a { background-image: url("") ; background-color: transparent}'
	+
	'div.thumbinner {background-color: #222222 ! important;}'
	+
	'.navbox-group {background: #222222 ! important;}'	
	+
	'.articleFeedback-panel .articleFeedback-buffer {background: #222222 ! important;}'	
	+ 
	'.articleFeedback-rating-label, .articleFeedback-rating-clear {background: #222222 ! important;}'	
	+  
	'.navbox-even {background: #999999 ! important; border-left: 2px solid #222222 ! important;}'
	+
	'.navbox-odd {border-left: 2px solid #222222 ! important;}'
	+
	'.infobox.sisterproject {color: white ! important; background-color: #222222 ! important;}'
	+
	'img {background-color: white ! important;}'
	+				
	'#mp-tfa-h2, #mp-itn-h2, #mp-dyk-h2, #mp-otd-h2, #mp-tfp-h2 {background-color: #666666 !important;}'
	+
	'p {color: white ! important; background-color: #222222 ! important;}'
	+
	'a {color: #00ccff ; background-color: #222222}'
	+
	'a:hover, a:focus {color: #008bad ; background-color: #222222}'
	+
	'a:visited {color: #555bad ;}'
	+
	'div#mw-head {background: #222222;}'
	+
	'li {color: white ! important; background-color: #222222 ! important;}'
	+
	'div {color: white ! important;}'
	+
	'.MainPageBG {background-color: #222222 !important;}'
	+
	'td {color: white ! important; background-color: #222222 ! important;}'
	+
	'#column-one {border-bottom-color: #FF0000 ! important;}'
	+
	'#content {background: #222222 ! important;}'
	+
	'div.mw-warning-with-logexcerpt, div.mw-cascadeprotectedwarning {background: #222222 ! important;}'
);

// ==UserScript==
// @name           Script Update Checker
// @namespace      http://www.crappytools.net
// @description    Code to add to any Greasemonkey script to let it check for updates.
// @include        *
// ==/UserScript==

// NOTES:
// Feel free to copy this into any script you write; that's what it's here for. A credit and/or URL back to here would be appreciated, though.
// I was careful to use as few variables as I could so it would be easy to paste right into an existing script. All the ones you need to set are at the very top.
// The target script needs to be uploaded to userscripts.org. The update checks will -not- increase the install count for the script there.
// This script is set up to check for updates to itself by default. It may be a good idea to leave it like this.

var SUC_script_num = 104629; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 864 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}