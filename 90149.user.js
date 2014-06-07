// ==UserScript==
// @name           Right-Click Enabler for some WebPortals
// @namespace      http://userscript.org/users/oloklir
// @description    Enables right-click and drag in "Naver Blog, Naver Cafe, Daum Blog, Daum Cafe, Cyworld Blog". Other sites can be added by updates.
// @copyright      OLokLiR (http://oloklir.tistory.com/)
// @homepage       http://userscripts.org/scripts/show/90149
// @updateURL      https://userscripts.org/scripts/source/90149.meta.js
// @downloadURL    https://userscripts.org/scripts/source/90149.user.js
// @version        0.531
// @license        http://creativecommons.org/licenses/by-nc-sa/3.0/
// @injectframes   100
// @include         http://*
// @include         https://*
// @include         http://*.naver.com/*
// @include         http://*.daum.net/*
// @include         http://*.cyworld.com/*
// @enable          true
// ==/UserScript==

(function(){

var domain=window.location.host;
var unsafeWindow=this['unsafeWindow']||window;

//Naver enabling script from (http://userscripts.org/scripts/show/61326)
//Original Author : Dong-yoon Han (http://userscripts.org/users/dyhan81)



//Naver Blog, Naver Cafe
if(/blog\.naver\.com/i.test(domain)||/cafe\.naver\.com/i.test(domain)){
	var intervalText="\
		if(window.AutoSourcing!=null){\
			var trueFnc='\
				var e=window.event;\
				if(e.allowDefault){e.allowDefault();}\
				e.returnValue=true;\
				e.cancelBubble=false;\
			';\
			AutoSourcing.copy=new Function(trueFnc);\
			AutoSourcing.aftercopy=new Function(trueFnc);\
			AutoSourcing.keydown=new Function(trueFnc);\
			AutoSourcing.keypress=new Function(trueFnc);\
		}\
	";
	if(/blog[.]/i.test(domain)){intervalText+="\
		if(window.utility!=null){utility.detachSelectPrevent();}\
	";};
	if(/cafe[.]/i.test(domain)){intervalText+="\
		var _enablemouse=function(obj){\
			var fnc=function(){return true;};\
			obj.oncontextmenu=fnc;\
			obj.onselectstart=fnc;\
			obj.ondragstart=fnc;\
		};\
		if(window.CancelBlockMouseRight!=null){\
			CancelBlockMouseRight();\
			cancelBlockDragInFF();\
		};\
		if(window.mlayoutPhoto!=null){\
			_enablemouse(parent.document);\
			_enablemouse(window.mlayoutPhoto.oView);\
			window.mlayoutPhoto.opt.allowRightMouseClick=true;\
		};\
		if(document.getElementById('content-area')&&(document.getElementById('content-area').oncontextmenu!=null)){\
			document.getElementById('content-area').oncontextmenu=null;\
			document.getElementById('content-area').onselectstart=null;\
			document.getElementById('content-area').ondragstart=null;\
		};\
	";};
	intervalText=intervalText.replace(/\t/g,"");

	//For Any Browser(without Chrome)
	setTimeout(intervalText,0);
	var intervalID=setInterval(intervalText,500);
	setTimeout("clearInterval("+intervalID+");",3000);

	//For Chrome
	intervalText='(function(){document.body.setAttribute("onmousemove",document.body.getAttribute("preset_enabler"));document.body.removeAttribute("preset_enabler");setTimeout("'+intervalText+'",0);var intervalID=setInterval("'+intervalText+'",500);setTimeout("clearInterval("+intervalID+");",3000);})();';
	var preset=unsafeWindow.document.body.getAttribute("onmousemove");
	unsafeWindow.document.body.setAttribute("preset_enabler",preset);
	preset=(preset==null)?'':preset;
	unsafeWindow.document.body.setAttribute("onmousemove",preset+";"+intervalText);
}



//Daum Cafe
else if(/cafe[0-9]*\.daum\.net/i.test(domain)){
	if(/var block=function\(e\)/.test(document.head.innerHTML)){
		var cutEvent=function(e){
			if(e.stopImmediatePropagation)e.stopImmediatePropagation();
			else if(e.stopPropagation)e.stopPropagation();
		};//It may properly works only in DOM3 supporting browser(eg. >=FF9)
		if(window.addEventListener){
			document.body.addEventListener("selectstart",cutEvent,false);
			document.body.addEventListener("dragstart",cutEvent,false);
			document.body.addEventListener("contextmenu",cutEvent,false);
			document.body.addEventListener("copy",cutEvent,false);
			document.body.addEventListener("keydown",cutEvent,false);
			document.body.addEventListener("keyup",cutEvent,false);
			document.body.addEventListener("mousedown",cutEvent,false);
			document.body.addEventListener("mouseup",cutEvent,false);
		}
		else if(document.attachEvent){
			document.body.attachEvent("onselectstart",cutEvent);
			document.body.attachEvent("ondragstart",cutEvent);
			document.body.attachEvent("oncontextmenu",cutEvent);
			document.body.attachEvent("oncopy",cutEvent);
			document.body.attachEvent("onkeydown",cutEvent);
			document.body.attachEvent("onkeyup",cutEvent);
			document.body.attachEvent("onmousedown",cutEvent);
			document.body.attachEvent("onmouseup",cutEvent);
		}
		var style=document.styleSheets;
		try{
			for(var i=0;i<document.styleSheets.length;i++){
				try{
				for(var j=0;j<document.styleSheets[i].cssRules.length;j++){
					if(
						/user-select/i.test(document.styleSheets[i].cssRules[j].cssText)
						||/user-focus/i.test(document.styleSheets[i].cssRules[j].cssText)
						||/user-input/i.test(document.styleSheets[i].cssRules[j].cssText)
					){
						document.styleSheets[i].deleteRule(j);
						j--;
					}
				}}catch(e){}
			}
		}catch(e){}
	}
	var intervalText="(function(){\
		if(document.oncontextmenu!=null){document.oncontextmenu=null;}\
		if(document.onkeydown!=null){document.onkeydown=null;}\
		if(document.onkeyup!=null){document.onkeyup=null;}\
		if(document.onmouseup!=null){document.onmouseup=null;}\
		if(document.onmousedown!=null){document.onmousedown=null;}\
		if(document.ondragstart!=null){document.ondragstart=null;}\
		if(document.onselectstart!=null){document.onselectstart=null;}\
		if(document.oncopy!=null){document.oncopy=null;}\
	})()";
	intervalText=intervalText.replace(/\t/g,"");

	//For Any Browser
	setTimeout(intervalText,0);
	var intervalID=setInterval(intervalText,500);
	setTimeout("clearInterval("+intervalID+");",3000);
}



//Daum Blog
else if(/blog\.daum\.net/i.test(domain)){
	var intervalText="(function(){\
		var allowContent=function(e){\
			var e=window.event||e;\
			if(e.allowDefault){e.allowDefault();}\
			e.returnValue=true;\
			e.cancelBubble=false;\
		};\
		if(document.onmousedown!=null){document.onmousedown=null;}\
		if(window.blockContent!=null){\
			if(document.addEventListener){\
				document.addEventListener('selectstart',allowContent,false);\
				document.addEventListener('dragstart',allowContent,false);\
				document.addEventListener('contextmenu',allowContent,false);\
				document.addEventListener('copy',allowContent,false);\
				document.addEventListener('keydown',allowContent,false);\
				document.removeEventListener('selectstart',blockContent,false);\
				document.removeEventListener('dragstart',blockContent,false);\
				document.removeEventListener('contextmenu',blockContent,false);\
				document.removeEventListener('copy',blockContent,false);\
				document.removeEventListener('keydown',blockContent,false);\
			}\
			else if(document.attachEvent){\
				document.attachEvent('onselectstart',allowContent);\
				document.attachEvent('ondragstart',allowContent);\
				document.attachEvent('oncontextmenu',allowContent);\
				document.attachEvent('oncopy',allowContent);\
				document.attachEvent('onkeydown',allowContent);\
				document.detachEvent('onselectstart',blockContent);\
				document.detachEvent('ondragstart',blockContent);\
				document.detachEvent('oncontextmenu',blockContent);\
				document.detachEvent('oncopy',blockContent);\
				document.detachEvent('onkeydown',blockContent);\
			}\
		}\
		if(document.getElementById('_photo_')){\
			if(document.addEventListener){\
				document.addEventListener('selectstart',allowContent);\
				document.addEventListener('dragstart',allowContent);\
				document.addEventListener('contextmenu',allowContent);\
				document.addEventListener('onkeydown',allowContent);\
			}\
			else if(document.attachEvent){\
				document.attachEvent('onselectstart',allowContent);\
				document.attachEvent('ondragstart',allowContent);\
				document.attachEvent('oncontextmenu',allowContent);\
				document.attachEvent('onkeydown',allowContent);\
			}\
			document.onkeydown=null;\
		};\
		document.onselectstart=null;\
		document.ondragstart=null;\
		document.oncontextmenu=null;\
	})()";
	intervalText=intervalText.replace(/\t/g,"");

	//For Any Browser(without Chrome)
	setTimeout(intervalText,0);
	var intervalID=setInterval(intervalText,500);
	setTimeout("clearInterval("+intervalID+");",3000);

	//For Chrome
	intervalText='(function(){document.body.setAttribute("onmousemove",document.body.getAttribute("preset_enabler"));document.body.removeAttribute("preset_enabler");setTimeout("'+intervalText+'",0);var intervalID=setInterval("'+intervalText+'",500);setTimeout("clearInterval("+intervalID+");",3000);})();';
	var preset=unsafeWindow.document.body.getAttribute("onmousemove");
	unsafeWindow.document.body.setAttribute("preset_enabler",preset);
	preset=(preset==null)?'':preset;
	unsafeWindow.document.body.setAttribute("onmousemove",preset+";"+intervalText);
}



//Cyworld Blog
else if(/web[0-9]*\.c[0-9]*\.cyworld\.com/i.test(domain)){
	if(unsafeWindow.document.body.onload!=null){
		var load=String(unsafeWindow.document.body.onload);
		load=load.replace('rightClickYn()','');
		unsafeWindow.document.body.onload=load;
	}

	var intervalText="\
		if(document.onselectstart!=null){document.onselectstart=null;}\
		if(document.oncontextmenu!=null){document.oncontextmenu=null;}\
		if(document.ondragstart!=null){document.ondragstart=null;}\
		if(document.body.onmouseup!=null){document.body.onmouseup=null;}\
		if(document.body.onmouseenter!=null){document.body.onmouseenter=null;}\
		if(document.onmousemove!=null){document.onmousemove=null;}\
		if(document.onmousedown!=null){document.onmousedown=null;}\
	";
	intervalText=intervalText.replace(/\t/g,"");

	//For Any Browser(without Chrome)
	setTimeout(intervalText,0);
	var intervalID=setInterval(intervalText,500);
	setTimeout("clearInterval("+intervalID+");",3000);

	//For Chrome
	intervalText='(function(){document.body.setAttribute("onmousemove",document.body.getAttribute("preset_enabler"));document.body.removeAttribute("preset_enabler");setTimeout("'+intervalText+'",0);var intervalID=setInterval("'+intervalText+'",500);setTimeout("clearInterval("+intervalID+");",3000);})();';
	var preset=unsafeWindow.document.body.getAttribute("onmousemove");
	unsafeWindow.document.body.setAttribute("preset_enabler",preset);
	preset=(preset==null)?'':preset;
	unsafeWindow.document.body.setAttribute("onmousemove",preset+";"+intervalText);
}



//Typical enabler(Limited. Don't cause website's malfunction.)
else{
	var intervalText="(function(){\
		function isOnly_return_false(fnc){\
			if(!fnc){return false;}\
			var fnc=String(fnc);\
			fnc=fnc.replace(/[;{}\\n\\r\\t\\v\\f\\0]/g,'');\
			fnc=fnc.replace(/function[(a-z)(0-9)_ ]*\\([(a-z)(0-9)_, ]*\\)/ig,'');\
			fnc=fnc.replace(/ /g,'');\
			fnc=fnc.replace(/" + '"' + "([^" + '"' + "]*)" + '"' + "/g,'');\
			fnc=fnc.replace(/'([^']*)'/g,'');\
			fnc=fnc.replace(/\\(.*\\)/g,'');\
			return (fnc=='returnfalse'||fnc=='window.alertreturnfalse'||fnc=='ifreturnfalse');\
		}\
\
		if(/none/i.test(document.body.style.MozUserSelect)){document.body.style.MozUserSelect='';}\
		if(/none/i.test(document.body.style.WebkitUserSelect)){document.body.style.WebkitUserSelect='';}\
		if(/none/i.test(document.body.style.KhtmlUserSelect)){document.body.style.KhtmlUserSelect='';}\
		if(/none/i.test(document.body.style.userSelect)){document.body.style.userSelect='';}\
\
		if(isOnly_return_false(document.oncontextmenu)){document.oncontextmenu=null;}\
		if(isOnly_return_false(document.body.oncontextmenu)){document.body.oncontextmenu=null;}\
		if(isOnly_return_false(document.body.getAttribute('oncontextmenu'))){document.body.setAttribute('oncontextmenu',null);}\
\
		if(isOnly_return_false(document.onselectstart)){document.onselectstart=null;}\
		if(isOnly_return_false(document.body.onselectstart)){document.body.onselectstart=null;}\
		if(isOnly_return_false(document.body.getAttribute('onselectstart'))){document.body.setAttribute('onselectstart',null);}\
\
		if(isOnly_return_false(document.ondragstart)){document.ondragstart=null;}\
		if(isOnly_return_false(document.body.ondragstart)){document.body.ondragstart=null;}\
		if(isOnly_return_false(document.body.getAttribute('ondragstart'))){document.body.setAttribute('ondragstart',null);}\
\
		if(isOnly_return_false(document.onmousedown)){document.onmousedown=null;}\
		if(isOnly_return_false(document.body.onmousedown)){document.body.onmousedown=null;}\
		if(isOnly_return_false(document.body.getAttribute('onmousedown'))){document.body.setAttribute('onmousedown',null);}\
\
		if(isOnly_return_false(document.oncopy)){document.oncopy=null;}\
		if(isOnly_return_false(document.body.oncopy)){document.body.oncopy=null;}\
		if(isOnly_return_false(document.body.getAttribute('oncopy'))){document.body.setAttribute('oncopy',null);}\
	})()";
	intervalText=intervalText.replace(/\t/g,"");

	//For Any Browser
	setTimeout(intervalText,0);
	var intervalID=setInterval(intervalText,500);
	setTimeout("clearInterval("+intervalID+");",3000);
}



//Filtered after by "Typical enabler"



//Paran Blog
if(/blog\.paran\.com/i.test(domain)){
	unsafeWindow.document.onmousedown=null;
}



//Naver Comic
else if(/comic\.naver\.com/i.test(domain)){
	var isOnly_return_false=function(fnc){
		if(!fnc){return false;}
		var fnc=String(fnc);
		fnc=fnc.replace(/[;{}\n\r\t\v\f\0]/g,'');
		fnc=fnc.replace(/function[(a-z)(0-9)_ ]*\([(a-z)(0-9)_, ]*\)/ig,'');
		fnc=fnc.replace(/ /g,'');
		fnc=fnc.replace(/" + '"' + "([^" + '"' + "]*)" + '"' + "/g,'');
		fnc=fnc.replace(/'([^']*)'/g,'');
		fnc=fnc.replace(/\(.*\)/g,'');
		return (fnc=='returnfalse'||fnc=='window.alertreturnfalse');
	}
	var imgs=unsafeWindow.document.getElementsByTagName("img");
	var e;
	for(var i=0;i<imgs.length;i++){
		try{if(isOnly_return_false(imgs[i].oncontextmenu)){imgs[i].oncontextmenu=null;}}catch(e){}
		try{if(isOnly_return_false(imgs[i].onselectstart)){imgs[i].onselectstart=null;}}catch(e){}
		try{if(isOnly_return_false(imgs[i].ondragstart)){imgs[i].ondragstart=null;}}catch(e){}
	}
}

})();
