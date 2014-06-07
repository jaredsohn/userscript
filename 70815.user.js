// ==UserScript==
// @name           IGN Pirated Version
// @namespace      www.malako.se
// @description    ign.com enhancer for pirates
// @include        http://*.ign.com/*
// @license        GNU GENERAL PUBLIC LICENSE
// @agreement      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// @version 0.2
// ==/UserScript==

// code corrections and h33t addition from queeup http://userscripts.org/users/76449
//---------------------------------------------------------------------------//
///////////////////////// START OF USER CONFIGURATION /////////////////////////
//---------------------------------------------------------------------------//

var compatible = (navigator.userAgent.match(/firefox/i));

var message0 = "Fetching torrents...";
var message1 = "Click this bar to show torrents!";
var message2 = "Click this bar to hide torrents!";
var message3 = "Only compatible with Firefox...";

var image;

// the ajax image
imageWaiting = 'data:;base64,'+
'R0lGODlhEAAQAPIAAP/3hQAAAMK8ZUJAIgAAAGJfM4J+RJKNTCH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWph'+
'eGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkY'+
'DAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZ'+
'siUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKp'+
'ZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5'+
'TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh'+
'+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJ'+
'CgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAA'+
'LAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';  

imageDone = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKbSURBVHjalFPPTxNBGH2zOzO7LdZWaFEv'+
'Box6MMHoib/AxIvxgAYvngkHw4UQLypwERNNRGP05sFII8YToPWEBY1giDGSaCIGSYgH0aiUlu7u'+
'bHf9ZhpSOLLZb2Z29nvv+zFv2MTExBUAvWSHsLtnkewBZ4zdSKdb4FV9SEfAcVwyB64r4dLsuA6k'+
'lMaE4OCcw7YtlMvljmKx2Mtt20a1GuDhp2eI4whECBpg0WTZDDazCMAMiF5wWjtcYPTSiM6ig+vR'+
'oWgaXApKsMiJfOog+icIJWj2A6BWA5qSNhyRRRTVTB2WHnSqOrIBW8yABZnkBOZ1oMtTGLk4iGOt'+
'xxGEVYS1cBsB1anT5jpFMsmJwBgoM/2dwvD5ARw90I6+Mz2mjFJlo0GQcF0TWZcfRrRpMUMSRUTK'+
'khju6kdbrn5I01+mTWY85g0C3ekNr4JMMofuznP4vLqKtdIfii4w2DWAw61txnny4xTmV14i6SSo'+
'J4HZMzRCCrxdWsDyndfIpprRRIS3X9zHze7LOLK/3TgWFgt4932Syo0Q+RY8399ZQiaZQN/j61Ch'+
'woXOs5gbKuBU2wnjlJ/LI79wF378CxX1Eyu/v8LfTiAdiVw6jfnlIvrz13bIbfz9U4x/uIfI+oty'+
'+APV2hoYavC9bQSC1CWoMdmMjZmlV7j6fAi+8jE294Qij2LvnhipBENCWHBlXVhbGZge2NyGJMEw'+
'wZBusvDm2xRO3yqgJc2QSQFJl9Qn6ycjiYTcqYmqQWDR+R1szuHfJgkntqgnzDhxkrHaZKh4gGfX'+
'daKPOOM0Q22dQo1ktl5ax1jvI0S0VipEQD8VRfBVgMALKJpPKdPaVwhoTymFluw+VCrrRR7Hcc/s'+
'zKy+zid3c5c1WF/n/wIMAN0B7LSV8ppiAAAAAElFTkSuQmCC';

imageWarning = 'data:image/gif;base64,'+
'R0lGODlhEAAQALMAAOQQKPavt+YgN+cwRelAU/vf4vGAjetQYvSfqf///+IAGgAAAAAAAAAAAAAA'+
'AAAAACH5BAAAAAAALAAAAAAQABAAAAROMMmEiLqKoDnLwKAyFB0ACgIIkMmHHdIBDlRoSEZY2Xho'+
'8YlcaHgLDoewhOwYQh1/r5gPEQpIqKCN65JcXmiJggnjxKw629CIc4VmNpMIADs=';

if (!compatible)
{
	message = message3;
	image	= imageWarning;
}
else
{
	message = message0;
	image	= imageWaiting;
}

if (validate())
{
	var titleElement = getElementsByClassName("nav-community-hdr")[0];
	var parentElement = document.getElementById("articleHeader");

	var strTitle = titleElement.textContent;
	
	strTitle = strTitle.replace(" Review", "");
	//strTitle = strTitle.replace(" ", "+");
	
	var malakoRules = document.createElement('div');
	var html = "";
	html    += "<div id='malakoBar' style='border:1px solid #555; margin-top:3px; margin-bottom:2px;cursor:pointer'>";
	html	+= "	<table><tr><td><img style='padding:2px' id='malakoImage' width='16' weight='16' src='" + image + "' alt='Getting Results Please Wait' /></td>";
	html    += "	<td style='font-weight:bold; padding-left:2px; vertical-align:top; padding-top:3px;' id='malakoHeading'>" + message + "</td></tr></table>";
	html    += "	<div id='torrentResult' style='display:none'>";
	html    += "	</div>";
	html	+= "</div>";
	
	malakoRules.innerHTML = html;
	
	parentElement.insertBefore(malakoRules, parentElement.firstChild);
	
	if (compatible)
	{
		get_btjunkie_org(strTitle);
		
		unsafeWindow.doItDamnit = function(url)
		{
		/*	var iframe = document.createElement('iframe');
			iframe.setAttribute("src", url);
			iframe.style.width = 640+"px";
			iframe.style.height = 480+"px";
			document.body.appendChild(iframe);
			iframe.setAttribute("src", url);*/
		//	alert(url);
			window.open(url);
		//	window.location = url;
		}
	}	
}

function validate()
{
	if(document.title.indexOf(" Review ") > 0)
		return true;
	
	return false;
}

function getElementsByClassName(classname, node)
{ 
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 
	var a = [], re = new RegExp('\\b' + classname + '\\b'); 
	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if ( re.test(els[i].className) ) 
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}

function showHide()
{
	var element = document.getElementById("torrentResult");

	if (element.style.display == "block")
	{
		element.style.display = "none";
		document.getElementById("malakoHeading").innerHTML = message1
	}
	else
	{
		element.style.display = "block";
		document.getElementById("malakoHeading").innerHTML = message2
	}
}

function get_btjunkie_org(query)
{
	search='http://btjunkie.org/search?q=';
	url = search+escape(query)+'&c=2'; 
	var SpaceForTorrentResults = document.getElementById("torrentResult");
	var SpaceForHeading = document.getElementById("malakoHeading");

    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
        onload: function(rd) 
		{
			if (rd.status == 200) 
			{        
				if (rd.responseText.match(/Did you mean:/))
				{
					SpaceForTorrentResults.innerHTML += "No Torrents Found <a href='"+url+"'>at btjunkie.org</a>";
				}
				else
				{ 
	
					rd.responseText = rd.responseText.replace(/\n/g,'');
					rd.responseText = rd.responseText.replace(/\r/g,'');
	
					var re = new RegExp('<table cellpadding="1".*?Next', 'i', 'm');
	 
					var htmlResult = re.exec(rd.responseText);
			
					htmlResult = htmlResult.toString();
					htmlResult = htmlResult.replace(/<(?:|\/)font.*?>/g,'');
					htmlResult = htmlResult.replace(/FFFF99/g,'F3EEAD');
					htmlResult = htmlResult.replace(/<tr bgcolor="#F1F2F6"><th colspan="7" height="4"><\/th><\/tr>/g,'');
					htmlResult = htmlResult.replace(/<tr bgcolor="#FFFFFF"><th colspan="7" height="4"><\/th><\/tr>/g,'<tr bgcolor="#F3EEAD"><th colspan="7" height="1"></th></tr>');
					htmlResult = htmlResult.replace(/="\//g,'="http://btjunkie.org/');
					htmlResult = htmlResult.replace(/>\t\t<a href=.*?\/files\/.*?listfiles.*?<\/a>/g,'>');
					htmlResult = htmlResult.replace(/<th bgcolor="#FFFF66".*?<\/th>/g,'');
					htmlResult = htmlResult.replace(/align="center"><table.*/g,'align="center"></table>');
					htmlResult = htmlResult.replace(/'\/images/g,"'http://btjunkie.org/images");
					
					// Remove headings
					htmlResult = htmlResult.replace(/<tr class="row_header">.*Health<\/th>\t<\/tr>/, "");
					htmlResult = htmlResult.replace(/<th width="8%" align="center"><a class="LightOrange" href="http:\/\/btjunkie.org\/browse\/Games"><b>Games<\/b><\/a><\/th>/g, "");
			
					// Remove comment count
					htmlResult = htmlResult.replace(/<th align="right"><table.*?<\/th>/gi, "");
					htmlResult = htmlResult.replace(/<th align="right"><div align.*?<\/th>/gi, "");

					// Remove seeds / leechers
					htmlResult = htmlResult.replace(/<th width="5%" align="center">[0-9X\/]+<\/th>/gi, "");

					// Add onclick event
					// TODO: Try to get direct download button working (iframe doesn't work...)
					htmlResult = htmlResult.replace(/(<th align="left" class="label"><a href=")(.*?)(" rel="nofollow")(><img src=".*?" alt=".*?" border="0"><\/a>)/gi, "$1#$3 onclick=\"doItDamnit('$2'); return false;\"$4");

					SpaceForTorrentResults.innerHTML = htmlResult;
		   			SpaceForHeading.innerHTML = message1;
		   
					GM_addStyle('.label {color:brown !important;}');  
				 
					GM_addStyle('.barback { border: 1px solid #B5B5B5;display: block; background-color:#FFFFFF;width: 38px;height: 7px; }');
					GM_addStyle('.barback2 { border: 1px solid #B5B5B5;display: block; background-color:#FFFFFF;width: 120px;height: 5px; }');
					GM_addStyle('.bar1 { background-color:#FF0000;display: block;width: 6px; height: 7px; }');
					GM_addStyle('.bar2 { background-color:#FFFF00;display: block;width:14px; height:7px; }');
					GM_addStyle('.bar3 { background-color:#32CD32;display: block;width: 22px; height: 7px; }');
					GM_addStyle('.bar4 { background-color:#32CD32;display: block;width: 30px; height: 7px; }');
					GM_addStyle('.bar5 { background-color:#32CD32;display: block;width: 38px; height: 7px;}');
	
					GM_addStyle('.tab_results { color: #000000; font-weight: normal; font-size:10px !important; background-color:#F3EEAD; padding:1px 0; }');
	
					document.getElementById('malakoImage').src = imageDone;
					
					document.getElementById('malakoBar').addEventListener("click", showHide, false);
				}
			}
		}
  	});
}