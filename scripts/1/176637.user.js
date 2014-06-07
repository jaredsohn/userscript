// ==UserScript==
// @name          plugin-dodo_chatroom
// @namespace     
// @description	  Have fun in dodo chatroom
// @author        Jeremy huang
// @homepage      
// @include       *doo.idv.tw/*
// ==/UserScript==

var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
     //   $( document ).ready(function() {
     //       console.log("DOM ready");
     //       letsJQuery();
     //   });
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
    console.log ("Dodo chat room Script start...");
    

        window.parent.window.document.getElementsByTagName("frameset")[0].rows = "0,0,*";


	//取消髒話限制 modify variabl
    var rwscript = document.createElement("script");
    rwscript.type = "text/javascript";
    rwscript.textContent = "word_dirty = [];" //clean the array
    document.documentElement.appendChild(rwscript);
    rwscript.parentNode.removeChild(rwscript);
    //取消私下髒話檢查 modify function
    var scriptCode = new Array();
    scriptCode.push('function word_dirty_chk(s) {return s;}');
    scriptCode.push('function chkempty(s){return true;}');
    scriptCode.push('function disableCtrlKeyCombination(e){return true;}');
    scriptCode.push('function repd(stra) {return stra;}');
    scriptCode.push('function init(inp) {lock2 = 0;}');       
    scriptCode.push('function right(e) {return false;}');
    scriptCode.push('function adver_wait() {}');
    scriptCode.push('function chksays() {');
    scriptCode.push('document.c.lastmessno.value=parent.lastmessno_get();');
    scriptCode.push('document.c.towho.value=parent.towho_get();');
  	scriptCode.push('document.c.towho_sex.value=parent.towho_sex_get();');
  	scriptCode.push('document.c.says.value=document.c.says_temp.value;');
    scriptCode.push('document.c.says_temp.value=\'\';');
 	scriptCode.push('says_last=document.c.says.value;');
	scriptCode.push('parent.private.scroll(0,parent.private.document.body.scrollHeight);');
	scriptCode.push('parent.a2.scroll(0,parent.a2.document.body.scrollHeight);');
  	scriptCode.push('parent.says_focus();');
    scriptCode.push('return true;}');
    
    scriptCode.push('function speed() {');
	scriptCode.push('if(1 < "19")   {');
	scriptCode.push('timegoed=(new Date()).getTime();');
	scriptCode.push('bantd=bant*1000;');
    scriptCode.push('num=0;sec=1000;bant=0;lock=0;');
	scriptCode.push('count=0;timego=timegoed;sayed=document.forms[0].says_temp.value;}');
	scriptCode.push('if(parent.a1.tm) {clearTimeout(parent.a1.tm);}');
	scriptCode.push('chksays();}');
                 
  var script = document.createElement('script');
  script.innerHTML = scriptCode.join('\n');
  scriptCode.length = 0;                            // recover the memory we used to build the script
  document.getElementsByTagName('head')[0].appendChild(script); 

}