// ==UserScript==
// @name		菊花文测试
// @namespace		http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul
// @include		http://tieba.baidu.com/*
// @grant		GM_registerMenuCommand
// @grant		GM_getResourceText
// @grant		GM_getResourceURL
// @grant		GM_deleteValue
// @grant		GM_listValues
// @grant		GM_openInTab
// @grant		GM_addStyle
// @grant		GM_setValue
// @grant		GM_getValue
// @grant		GM_info
// @grant		GM_log
// @grant		unsafeWindow
// @grant		Metadata Block
// @updateURL		https://userscripts.org/scripts/source/155931.meta.js
// @downloadURL		https://userscripts.org/scripts/source/155931.user.js
// @icon		http://tb.himg.baidu.com/sys/portrait/item/b772d3eab5ced4dad0c4cdb70e0d
// @author		527836355、雨滴在心头
// @version		1.01
// ==/UserScript==
var c;
var  op=document.createElement('select');
 op.innerHTML='<select><option>上菊</option><option>中菊</option><option>下菊</option></select>';
document.getElementsByClassName('pt_submit')[0].appendChild(op);
op.setAttribute('class','subbtn_bg');
op.style.color='rgb(0,0,200)';
       
  
  
		GM_addStyle('select.subbtn_bg{vertical-align:bottom;} #ps{position:relative;top:8px;} #sp{position:relative;top:8px;} .subbtn_bg{margin-right:5px!important;}');
   var m=document.getElementsByClassName('tb-editor-editarea')[0];
	   
	// c = 773;
	// c = 818
    var t='test';
	function charCh(){
		t = aAss(m.textContent,op.selectedIndex);
	}
	function offcharCh(){
		t = offaAss(m.textContent,op.selectedIndex);
	}
    
	function aAss(inStr,code) {
	    var code1=1161;
	    if(code==0) code1=773;
		else if(code==1) code1=1161;
		else code1=818;
	
		var c1 = String.fromCharCode(code1);
		var outStr = '';
		for(var i=0,l=inStr.length; i<l; i++)
		{
		    if(inStr.charAt(i).match(/[^\u4e00-\u9fa5]/g)&&ra.checked)
	　　　　outStr += inStr.charAt(i) ;
	        else outStr += inStr.charAt(i)+ c1;
		}
		return outStr;
	    }
	function offaAss(inStr,code) {
	    var code1=1161;
	    if(code==0) code1=773;
		else if(code==1) code1=1161;
		else code1=818;
	
		var c1 = String.fromCharCode(code1);
		var outStr = '';
		for(var i=0,l=inStr.length; i<l; i++){
		    if(inStr.charAt(i)==c1)continue;
			outStr += inStr.charAt(i);
		}
		return outStr;
	}
	
	
	m.onkeyup=function(){charCh();};
	var ti=document.createElement("input");
	    ti.setAttribute('type','button');
		ti.setAttribute('class','subbtn_bg');
		ti.setAttribute('value','菊花开');
		document.getElementsByClassName('pt_submit')[0].appendChild(ti);
		ti.addEventListener('click',function(){charCh();m.textContent=t;},false);
		var mi=document.createElement("span");
	 mi.innerHTML="<input type='button' class='subbtn_bg' value='菊花谢' />";
		document.getElementsByClassName('pt_submit')[0].appendChild(mi);
		var ra=document.createElement("input");
	    ra.setAttribute('type','checkbox');
		 ra.setAttribute('id','ps');
		ra.setAttribute('checked','checked');
		document.getElementsByClassName('pt_submit')[0].appendChild(ra);
		  var   tx=document.createElement('span');tx.innerHTML="<span id='sp'>只转中文</span>";

    document.getElementsByClassName('pt_submit')[0].appendChild(tx);;
		mi.addEventListener('click',function(){offcharCh();m.textContent=t;},false);
op.style.verticalAligh='bottom';ra.style.verticalAligh='bottom';ti.verticalAligh='bottom';mi.style.verticalAligh='bottom';