// ==UserScript==
// @name         YMail Calendar Panel
// @namespace    sy1bzbn
// @description  Makeshift integration of Yahoo! mobile calendar as quick panel in YMail
// @include      *
// ==/UserScript==
// 
var attr=function(tgt,params){ var k,a; for(k in params){ if(params.hasOwnProperty(k)){ a=document.createAttribute(k); a.value=params[k]; tgt.setAttributeNode(a); } } }; function contentAdd(node, lead){ var anchor=lead?document.getElementsByTagName('head')[0]:lead || document.getElementsByTagName('body')[0]; if(lead) anchor.insertBefore(node, anchor.firstChild); else anchor.appendChild(node); } function contentEval(source, lead){ if ('function'==typeof source) source='('+source+')();'; var script=document.createElement('script'); script.setAttribute('type','text/javascript'); script.textContent=source; contentAdd(script, lead); script.parentNode.removeChild(script); }

if(/mail.yahoo.com\/neo\/launch/.test(location.href)){
	GM_addStyle('#theAd{ margin-top:13px !important; border:0 none !important; background:transparent !important; }');
	var QuickPanel=function(){
		var theAd=document.getElementById('theAd');
		if(!theAd){
			var uh=document.getElementById('uh');
			theAd=document.createElement('div');
			theAd.setAttribute('id','theAd');
			uh.parentNode.insertBefore(theAd, uh);
		}
		theAd.style.visibility='hidden';
		var tgtCalendar=document.getElementById('tgtCalendar');
		if(!tgtCalendar){
			var tgtCalendar=document.createElement('iframe');
			attr(tgtCalendar, { 'id':'tgtCalendar', 'class':'darla', 'frameborder':'0', 'scrolling':'no', 'style':'position:absolute; z-index:0; width:160px; height:100%; top:0px; left:0px; visibility:inherit; display:block;', 'marginheight':'0', 'marginwidth':'0', 'tabindex':'-1', 'hidefocus':'true', 'allowtransparency':'true', 'name':'' });
			theAd.innerHTML='';
			theAd.appendChild(tgtCalendar);
			tgtCalendar.src='about:blank';
			tgtCalendar.addEventListener('load', function(){
				var theAd=document.getElementById('theAd');
				theAd.style.visibility='visible';
			}, false);
		}
		tgtCalendar.src='http://m.yahoo.com/w/ygo-calendar?.intl=us&.lang=en';
	};
	var tabinbox=document.getElementById('tabinbox');
	tabinbox.addEventListener('mousedown', function(){
		QuickPanel();
	}, false);
	contentEval(QuickPanel());
}
if(/m.yahoo.com\/w\/ygo-calendar/.test(location.href)){
	GM_addStyle('#titlebar,#pageFooter{ display:none !important; } #pageHeader{ margin-left:1px; margin-bottom:0 !important; } #pageTabs{ border-bottom:0 none !important;} #pageTabs table{ width:100% !important; } #pageBranding{ background:transparent !important; } #content{ overflow-x:hidden; overflow-y:scroll; background:#fff; border-left:1px solid #e0e0e0; } .pageTab{ padding:3px 2px 3px !important; -moz-border-radius:5px 5px 0 0; border-radius:5px 5px 0 0; background:rgba(64,64,64,0.25); } .ptactive{ background:#fbfbfb !important; } .uim{ margin:0 !important; border:0 none !important; } .uip{ padding:0 8px !important; } .uip .uic.title{ display:none; } .uip .blocks:hover .uic.title{ display:block !important; } body{ background:transparent !important; font-size:10px !important }');
	if(/(add|edit)/.test(location.href)){
		window.addEventListener('resize', function(){
			document.getElementById('content').style.height=window.innerHeight+'px';
		}, false);
		document.getElementById('content').style.height=window.innerHeight+'px';
	} else
	if(/event/.test(location.href)){
		window.addEventListener('resize', function(){
			document.getElementById('content').style.height=window.innerHeight-67+'px';
		}, false);
		document.getElementById('content').style.height=window.innerHeight-67+'px';
	} else {
		window.addEventListener('resize', function(){
			document.getElementById('content').style.height=window.innerHeight-17+'px';
		}, false);
		document.getElementById('content').style.height=window.innerHeight-17+'px';
	}
}
if(/m.yahoo.com\/w\/ygo-calendar\/week\.bp/.test(location.href)){
	GM_addStyle('.uip .uic.title,.uip.last.linked{ display:none !important; } .uip:hover .uic.title,.uim:hover .uip.last.linked{ display:block !important; }');
}
if(/m.yahoo.com\/w\/ygo-calendar\/event\.bp/.test(location.href)){
	GM_addStyle('input[type="button"]{ background:none repeat scroll 0 0 #f0f0f0; border-color:#c6c6c6 #a6a6a6 #808080; border-style:solid; border-width:1px; font-size:93%; font-weight:bold; } .uip .uic.title{ display:block !important; }');
	document.getElementById('content').innerHTML+='<br/><input type="button" value="Cancel" onclick="self.location.href=document.referrer;"/>';
}
if(/m.yahoo.com\/w\/ygo-calendar\/(add|edit)\.bp/.test(location.href)){
	GM_addStyle('#pageHeader{ display:none !important; } .collection{ background-color:#fff !important; } .formUim{ margin:0 !important; border:0 !important; } input[type="button"]{ background:none repeat scroll 0 0 #f0f0f0; border-color:#c6c6c6 #a6a6a6 #808080; border-style:solid; border-width:1px; font-size:93%; font-weight:bold; }');
	document.getElementById('input-235').rows="1";
	var tInput=document.getElementsByTagName('input'),box;
	var tILength=tInput.length;
	for(var i=tILength; i>0; i--)
		if(tInput[i-1].name=='__submit') box=tInput[i-1].parentNode;
	box.innerHTML+='<input type="button" value="Cancel" onclick="self.location.href=document.referrer;"/>';
}
