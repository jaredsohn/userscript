// ==UserScript==
// @name	Ikariam Faster Login
// @version	0.8
// @namespace	IkFL
// @description	auto expand Login
// @include	http://*.ikariam.com/*
// @exclude	http://s*.ikariam.com/*
// ==/UserScript==
//-----------------------------------------------------------------------------

// update part 
var scriptName = "Faster Login"
var scriptID = 79839;
var thisVersion="0.8";

function linkForUpdate()
{	lastUpdateCheck = GM_getValue("lastUpdateCheck","0");
	newestVersion = GM_getValue("newestVersion","");
	var time="";
	if (thisVersion == GM_getValue("thisVersion","")) { time += new Date().getDate() }
	else { GM_setValue("thisVersion",thisVersion) };
	if (lastUpdateCheck != time)
	{	GM_xmlhttpRequest ({
			method: "GET",
			url: "http://userscripts.org/scripts/source/"+scriptID+".meta.js",
			onload: function (response) {
				var regex = /\bversion\b\s*(\d+)\.(\d+)s*/.exec(response.responseText);
				if (regex) {
					newestVersion = regex[1]+"."+regex[2];
					GM_setValue("lastUpdateCheck", time);
					GM_setValue("newestVersion", newestVersion);
				}
			}	
		});
	};
	var needsUpdate = thisVersion != newestVersion;
	var innerHTML = '<a open" href="http://userscripts.org/scripts/show/'+scriptID+'" ';
	innerHTML += 'title="'+scriptName+' version '+newestVersion+'" target=_BLANK>';
	if (needsUpdate) { innerHTML += scriptName + ' <b>neue Version '+newestVersion+'!</b></a>' }
	else { innerHTML += scriptName +' v'+thisVersion+'</a>' };
	return innerHTML;
};

document.getElementById("loginWrapper").style.display="block";
document.getElementById("pageContent").innerHTML='<h3>'+linkForUpdate()+'</h3><br>';
document.getElementById("tab1").parentNode.innerHTML='<a>Info</a>';
GM_addStyle( "#content ul#menu{ float: right; }" );