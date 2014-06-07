// ==UserScript==
// @name		Swagbucks Hourly Winner Checker
// @namespace	Crazycatz00
// @description	Periodically checks Swagbucks.com for the hourly winner. Only runs on http:// sites.
// @copyright	2012 Crazycatz
// @icon		http://www.swagbucks.com/images/favicon.ico
// updateURL	https://www.example.com/myscript.meta.js
// @match		http://*/*
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_xmlhttpRequest
// @version		2.0.1
// LastEdited	12-20-2012
// ==/UserScript==
/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, boss:true, bitwise:false, strict:true, undef:true, unused:true, curly:true, browser:true*/
/*global GM_getValue, GM_setValue, GM_xmlhttpRequest, confirm, prompt*/
if(window.top===window.self&&Date.now()-GM_getValue('lastchecked',0)>GM_getValue('interval',1800000)){(function(){'use strict';
	var time;GM_setValue('lastchecked',time=String(Date.now()));
	var div=document.createElement('div'),divFade=function(d){div.style.webkitTransitionDelay=div.style.MozTransitionDelay=div.style.transitionDelay=(d=(d||5))+'s';div.style.opacity='0';setTimeout(function(){div.parentNode.removeChild(div);},3100+d*1000);};
		div.textContent='Loading...';div.style.cssText='position:fixed !important;right:8px !important;bottom:8px !important;z-index:214695 !important;clear:both !important;border:1px solid #000 !important;border-radius:10% !important;padding:3px !important;background:#000 !important;opacity:.9 !important;box-shadow:3px 3px 4px 1px #000 !important;font:normal normal normal 16px Tahoma,sans-serif !important;text-align:right !important;color:#FFF !important;text-overflow:ellipsis !important;display:block !important;overflow:visible !important;height:auto !important;width:auto !important;min-height:0 !important;min-width:0 !important;max-height:none !important;max-width:none !important;outline-style:none !important;margin:0 !important;text-indent:0 !important;text-decoration:none !important;text-transform:none !important;letter-spacing:normal !important;line-height:normal !important;transition:opacity 3s ease-in-out 0s !important;-moz-transition:opacity 3s ease-in-out 0s !important;-webkit-transition:opacity 3s ease-in-out 0s !important;-o-transition:opacity 3s ease-in-out 0s !important';
	(document.body||document.getElementsByTagName('body')[0]).appendChild(div);
	var sbClaim=function(){window.open('http://www.swagbucks.com/?cmd=cp-claim-random');},
		abort=function(){if(typeof req.abort==='function'){req.abort();}window.removeEventListener('unload',abort,false);div.textContent='Error getting page!';divFade(3);},
	req=GM_xmlhttpRequest({
		timeout:15000,
		method:'GET',
		url:'http://www.swagbucks.com/?nocache='+time,
		headers:{'Referer':'http://www.swagbucks.com/'},
		onerror:abort,
		ontimeout:abort,
		onprogress:function(r){div.textContent='Loading'+(r.lengthComputable?': '+(r.loaded/r.total*100|0)+'%':'...');},
		onload:function(r){
			window.removeEventListener('unload',abort,false);
			var doc=new DOMParser().parseFromString(r.responseText,'text/html'),win=null;
			if(win=doc.getElementById('randomWinnerName')){win=win.textContent.trim().toLowerCase();
			}else if(win=doc.getElementById('rndmImg')){win=win.alt.trim().toLowerCase();
			}else if(doc.getElementById('signInBoxLocal')){win=false;
			}else if(false&&(win=doc.getElementById('rndmCaimPending'))&&win.textContent.search(/within\s+(\d+)\s+minute/i)!==-1){win=RegExp.$1|0;}
			switch(typeof win){
				case 'boolean':div.textContent="You're not logged in!";div.addEventListener('click',function(){window.open('http://www.swagbucks.com/');},false);div.style.cursor='pointer';divFade();break;
				case 'number':div.textContent='Next winner chosen in '+win+' minutes...';divFade();if((win=(win+1)*60000)<(user=GM_getValue('interval',360000))){GM_setValue('lastchecked',String(Date.now()-user+win));}break;
				case 'string':
					div.textContent='Winner: '+win;div.addEventListener('click',sbClaim,false);div.style.cursor='pointer';
					var user=GM_getValue('username',false);
					if(user===false){if((user=prompt('Swagbucks username. Not your email!\n  Leave blank to ask again next time\n  Click cancel to use autodetection only',''))===null){GM_setValue('username',user=true);}else if((user=user.trim().toLowerCase()).length>0){GM_setValue('username',user);}else{user=false;}}
					if(typeof user!=='string'){try{
						if((user=document.getElementById('00N80000004dmtv'))&&(user=user.value)&&(user=user.trim()).length>0){throw'break';}user=true;
						if(r.responseText.search(/swagname:\s*['"]([^'"]+)['"]/)!==-1){user=RegExp.$1;}
					}catch(e){}}
					if(user===win){div.style.opacity='1';if(confirm('You are the Swagbucks hourly winner!\nOpen the claim page?')){sbClaim();}
					}else if(win===GM_getValue('lastwinner',false)){divFade(3);
					}else{divFade(5);}
					GM_setValue('lastwinner',win);break;
				default:div.textContent='Unable to detect status!';divFade(3);break;
			}
		}
	});
	window.addEventListener('unload',abort,false);
})();}