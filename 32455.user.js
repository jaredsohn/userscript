// ==UserScript==
// @name          Whirlpool Plus
// @namespace     http://www.onlinelife.com
// @description   Adds suite of extra optional features to Whirlpool forums.  Please UNINSTALL any other script that this script already integrates - more information at http://whirlpool.net.au/wiki/?tag=whirlpool_plus
// @version       2.035
// @include       http://forums.whirlpool.net.au/*
// @include       http://bc.whirlpool.net.au/*
// @include       http://whirlpool.net.au/*
// @include       http://chat.onlinelife.com/*
// @exclude       http://forums.whirlpool.net.au/whim-send*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm?*p=-2*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm*&r=*#r*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm*&ux* 
// @exclude       http://forums.whirlpool.net.au/forum-replies-print.cfm*
// @exclude       http://forums.whirlpool.net.au/forum-replies-archive.cfm*
// ==/UserScript==
// This is a user script for the Greasemonkey Firefox extension available at:
//http://greasemonkey.mozdev.org/
//this script uses functions introduced in 0.3 and does not support earlier versions of greasemonkey nor does it support the nobbled GM 0.3.5
/*

CREDITS:
Meatsack:  Original Whirlpool Last Read script for previous WP design with various added things
Yansky:  AJAX Quick Reply Box; New standalone Whirlpool Last Read Basic script for new WP design; Dynamic Menus; Edit in Place; Whirlcode for wiki, whim and new thread page; No Gluteus Maximus; Whim Big
Johnny Bravo (JB): Inline Images and Videos (Youtube/ Google); Whirlpool Plus logo
Tromac Auto-Subscribe when Post; Hide Deleted or Removed Threads 
skiitz: Disable Animated Avatars; Hide Moved Threads from Thread View; Added option to subscribe/mark as read form q-quote
Erwin: Versioning system with auto-update to new versions; Chatbox; Custom Links; Thread Archive View, Thread Print View, Auto-Subscribe; Permanently set number of Recent Activity days; Make Breadcrumb and Side Menu fonts Arial; List of custom WP CSS themes option; Updating old WLR integrated script changing it to Whirlpool Plus; Integrating all the above standalone scripts into the one main script, replacing old code with new; Adding suite of new WP+ settings and options to control the standalone scripts

LIST OF CHANGES: Please visit here for a list of changes and versions: http://whirlpool.net.au/wiki/?tag=whirlpool_plus

*/

(function() {	

if(unsafeWindow && unsafeWindow.jQuery){
$ = unsafeWindow.jQuery;
} 

var scriptVersion = '2.035';

// JB functions 
	GM_Storage={
    unique:"wimage_",
    age:1000*60*60*24* 30, // 30 days enough??
    setCookie:function(name, value, expires) {
      document.cookie= name + "=" + escape(value) +
                       "; expires=" + expires.toGMTString();
    },
    getCookie:function(name) {
      var dc = ""+document.cookie;
      var prefix = name + "=";
      var begin = dc.indexOf("; " + prefix);
      if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
      }
      else {
        begin += 2;
      }
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) end = dc.length;
      return unescape(dc.substring(begin + prefix.length, end));
    },
    cookie_setValue:function(name, value) {
      expires=new Date();
      expires.setTime(expires.getTime() + this.age);
      this.setCookie(this.unique+name, value, expires);
    },
    cookie_getValue:function(name, def) {
      var value=this.getCookie(this.unique+name);
      if(!value) value=def;
	  //alert('JB GM name: ' +name +" value: " +value);
      return value;
    }
  };
  if(typeof GM_setValue != "function") {
    GM_setValue=function(){
      return GM_Storage.cookie_setValue(arguments[0], arguments[1])
    };
    GM_getValue=function(){
      return GM_Storage.cookie_getValue(arguments[0], arguments[1])
    };
  }

  function editObject(tgt) {
    this.tgt=tgt;
    this.text=null;
    this.obj=null;
    if(window.getSelection || document.getSelection) {
      this.getSelectedText = this.getSelectedTextDOM;
      this.addReplaceSelectedText = this.addReplaceSelectedTextDOM;
    }
    else if(document.selection) {
      this.range=null;
      this.getSelectedText = this.getSelectedTextIE;
      this.addReplaceSelectedText = this.addReplaceSelectedTextIE;
    }
  }
  editObject.prototype.getSelectedTextDOM=function() {
    this.text=null;
    this.obj=null;
    if (window.getSelection) {
      this.text=(window.getSelection()).toString();
    }
    else if (document.getSelection) {
      this.text=(document.getSelection()).toString();
    }
    if(this.text.length==0) {
	   var el = document.getElementById("qqText");
	   if(!el){ el=document.getElementById("body");}
	   if(el){
        if(0<(el.selectionEnd-el.selectionStart)) {
          this.obj=el;
          this.text=el.value.substring(el.selectionStart,el.selectionEnd);

			}
		}
    }
    return this.text;
  }
  editObject.prototype.addReplaceSelectedTextDOM=function(s) {
    var scrollTop=this.tgt.scrollTop;
    var scrollLeft=this.tgt.scrollLeft;
    var before;
    var after;
    var caretStart;
    var caretEnd;
    if(this.obj == this.tgt) { // src and destination element are the same - we replace
      caretStart=this.tgt.selectionStart;
      caretEnd=caretStart+s.length;
    } else {
      caretEnd=this.tgt.selectionEnd+s.length;
      caretStart=caretEnd;
    }
    before=(this.tgt.value).substring(0,this.tgt.selectionStart);
    after=(this.tgt.value).substring(this.tgt.selectionEnd);
    this.tgt.value=before+s+after;
    this.tgt.setSelectionRange(caretStart, caretEnd);
    this.tgt.focus();
    this.tgt.scrollTop=scrollTop;
    this.tgt.scrollLeft=scrollLeft;
  }

  function writeConfig() {
    var config="";
    for(o in buttons) {
      if(buttons[o].hidden) {
        config+=(config.length?":":"")+o;
      }
    }
    GM_setValue("hiddenButtons", config);
  }
  function addConfigCheckbox(where, id, label, state) {
    var newInput=document.createElement("INPUT");
    newInput.id=id;
    newInput.type="checkbox";
    newInput.checked=state;
    var newLabel=document.createElement("LABEL");
    newLabel.setAttribute("for",id);
    newLabel.appendChild(document.createTextNode(label));
    where.appendChild(newInput);
    where.appendChild(newLabel);
    where.appendChild(document.createElement("BR"));
    return newInput;
  }
  function clickConfig(event) {
    if(event) {
      event.stopPropagation();
      event.preventDefault();
    }
    var newDiv=document.getElementById("wc_config");
    if(newDiv)
      return;
    newDiv=document.createElement("DIV");
    newDiv.style.position="fixed";
    newDiv.style.left="10px";
    newDiv.style.top="10px";
    newDiv.id="wc_config";
    newDiv=document.body.appendChild(newDiv);
    newDiv=newDiv.appendChild(document.createElement("DIV"));
    newDiv.style.backgroundColor="#ddddff";
    newDiv.style.border="ridge 3px";
    newDiv.style.color="#000000";
    for(o in buttons)
      addConfigCheckbox(newDiv, "wc_config_"+o, buttons[o].value.replace(/\-/g,""), 
                        buttons[o].hidden?false:true);
    newDiv.appendChild(document.createElement("BR"));
    var inClose=newDiv.appendChild(document.createElement("INPUT"));
    inClose.type="button";
    inClose.value="CANCEL";
    inClose.addEventListener('click', function() {
      var div=document.getElementById("wc_config");
      document.body.removeChild(div);
    }, false);
    var inSubmit=newDiv.appendChild(document.createElement("INPUT"));
    inSubmit.type="button";
    inSubmit.value="ACCEPT";
    inSubmit.addEventListener('click',function() {
      var div=document.getElementById("wc_config");
      var btns=div.getElementsByTagName("INPUT");
      for(var i=0; i < btns.length; i++) {
        var btn=btns[i];
        if(btn.type=="checkbox") {
          buttons[btn.id.substr(10)].hidden=btn.checked?false:true;
        }
      }
      writeConfig();
      document.body.removeChild(div);
    }, false);
  }
   
 // end JB functions

function is_all_ws( nod ){
  return !(/[^\t\n\r ]/.test(nod.data));
}


function loadWLRvalues(){
    //load values from threadRead into associative array and return it.
	var test = GM_getValue('threadRead');
	var basicArray = test.split(RegExp(" *, *", "gi"));
	var assArray = new Array();
	//alert('values stored: ' +basicArray.length);
	for (var i = 0; i < basicArray.length; i++){
		tempArray = basicArray[i].split(RegExp(" *: *", "gi"));
		assArray[eval('\"' +tempArray[0] +'\"')] = tempArray[1];
	}
	return assArray;
}

function WLR_getValue(key, wlrArray, defaultValue){
	for ( var j in wlrArray){
		if ( j == key){
			return wlrArray[j]
		}
	}
	return defaultValue;
}
function WLR_setValue(event, WLRkey, WLRvalue){
	WLRarray = loadWLRvalues();
	//else check array length < max value
	var arL=0;
	var match =0;
	for ( var j in WLRarray){
		arL++;
		//check if already in array
		if(j==WLRkey){
			//if yes mark value for deletion
			WLRarray[WLRkey]='delete';
			match=1;
		}
	}

	WLRmaxValue = GM_getValue('WLRmaxValue');
	if( (arL+1 - match ) >= WLRmaxValue){
		//greater than or equal to max value, even counting match deletion..
		var count =0;
		for (var i in WLRarray){
			if (count < (arL-match-WLRmaxValue)){
				WLRarray[i]= 'delete';
				count++;
				
			}
		}
	}
	var arrayString = "";
	for (var k in WLRarray){
		if(WLRarray[k]!= 'delete'){
			//add to array
			arrayString += k +":" +WLRarray[k] +", ";
		}else{
			//alert('deleting: '+k +" : " +WLRarray[k]);
		}
	}
	//add final new value
	arrayString += WLRkey +":" +WLRvalue +", ";
	GM_setValue('threadRead', arrayString);
	event.preventDefault();

}
function WLR_settings(e){
		GM_setValue(e.target.name.substr(2), e.target.value);	
		//e.preventDefault();
	}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addRadioSetting(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
	WLRset.id = 'id_'+setting;
	var settingValue = eval(setting);
	sp = document.createElement("span");
	sp.className ="setting";
	lab1 = document.createElement("label");
	lab2 = document.createElement("label");
	lab1.innerHTML = 'on';
	lab2.innerHTML = 'off';
	in1 = document.createElement("input");
	in1.name = 'r_'+setting;
	in1.type = 'radio';
	in1.value = '1';
	in2 = document.createElement("input");
	in2.name = 'r_'+setting;
	in2.type = 'radio';
	in2.value = '0';
	if (settingValue == 1){
		in1.checked = true;
	}else{
		in2.checked=true;
	}
	in1.addEventListener("click",function(event){ WLR_settings(event);},false);
	in2.addEventListener("click",function(event){ WLR_settings(event);},false);
	lab1.appendChild(in1);
	lab2.appendChild(in2);
	sp.appendChild(lab1);
	sp.appendChild(lab2);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);

	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}
	 
function addListSetting(settingAr, labelAr, setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	sel = document.createElement("select");
	sel.name = 's_'+setting;
	deflt = GM_getValue(setting);
	for (i=0; i<settingAr.length; i++){
		opt = document.createElement('option');
		opt.value = settingAr[i];
		if(opt.value == deflt){
			opt.selected = true;
		}
		optTxt = document.createTextNode(labelAr[i]);
		opt.appendChild(optTxt);
		sel.appendChild(opt);
	}
	sel.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(sel);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");

	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);

	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}
function addTextSetting(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('customCSS');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);

	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}	 

// Erwin Custom Links

function addTitleSettinga(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('titlea');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);
	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}

function addURLSettinga(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('urla');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);
	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}

function addTitleSettingb(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('titleb');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);
	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}

function addURLSettingb(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('urlb');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);
	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}

function addTitleSettingc(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('titlec');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);
	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}

function addURLSettingc(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('urlc');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);
	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}

function addTitleSettingd(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('titled');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);
	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}

function addURLSettingd(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('urld');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);
	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}

function addTitleSettinge(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('titlee');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);
	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}

function addURLSettinge(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('urle');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);
	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}

//
	 
function showNote(evt){
	txtBlock = evt.target.parentNode.firstChild.nextSibling;
	if(txtBlock.style.display =="none"){
	txtBlock.style.display ="block";
	txtBlock.value = GM_getValue('u'+txtBlock.id,'');
	txtBlock.addEventListener('change', function(evt){GM_setValue('u'+evt.target.id, evt.target.value);},false);
	}else{
	txtBlock.style.display ="none";
	txtBlock.removeEventListener('change',function(evt){},false);
	}
	
}

function hideUser(evt){
	var customCSS = GM_getValue('customCSS');
	customCSS += ".wlr_"+evt.target.id +" {display:none;}"
	GM_setValue('customCSS', customCSS);
}

//Smilies - define swaps much further down below
//The angry, confused, ninja and glaring smilies were created and are copyrighted by Tromac (1/3/2008)
//confused
var smlConfused = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%D0%D6%E3%003%99%11%40%9F-V%A9%3Ff%B3Jm%B3%94%A7%CD(W%AB%2F%5C%AD2_%AEDl%B5%A8%BC%DC%CF%D6%E2%AC%C0%DEe%8F%C6%7B%9E%CD%84%A4%D0%88%A7%D2%91%AD%D4%9A%B4%D8u%9B%CBv%A4%D1%7D%A8%D4%7F%AA%D4%84%AD%D6%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%B7%D0%E7%BC%D3%E8%C3%D8%EB%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00*%00%2C%00%00%00%00%0F%00%0F%00%00%06%98%40%95P%858%10%06%84%03b8%14%14%0C%8F%13%8AD1%14%1CC%07%A1%91B%95F%E0%90%84%80U%15%B8%00%80H%14J%83%22%05%E2!%05%20%ADC%A0%3C%00%B4(FKwy%1E%83%1D%11F%1F%26%60%7B%20%1C%00%1B%8F%1BG'vm%8C%8D%1A%98%1AH(a%20%1E%1D%1B%98%19%A3I%15%23!m%8E%1B%19%00%17%17%10J%0Cl%00%1E%1B%00%1A%18%AD%17%09K%05%13m%9F%B6%AD%16%10q*%02%04%12%9E%A0%B8%AF%04%02M%05%0A%12%CC%16%0B%05%D0LrGIKCA%00%3B\" align = baseline alt \":S\" border=\"none\">";
//ninja
var smlNinja = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%18%18%1F%18%18%1D%18%18%1C%18%18%1A%18%19'%18%1A%2C%18%1A%2B%18%1B0%18%1B%2F%18%1C2%18%1D4%1A%1F6%19%1D2%1C%22%3A%19%1F6%1D%24%3D%19!%3A%19%207%1A%23%3D%1B%26A%1D)D%D0%D6%E3%1D*E%94%A7%CD%20%2FJ%221J%CF%D6%E2%AC%C0%DE%267N.%3FW%7B%9E%CDv%A4%D1%7F%AA%D4%84%AD%D6%3CM_%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%001%00%2C%00%00%00%00%0F%00%0F%00%00%06%95%C0%980%96%11%14%8E%82%CCpx!%08%22%1F%8F%C6!%20p%86%9C%C2%83%E4%D9%60%BE%15E%E1%1A%23l%A5%16K%85%C2%3E%10%88%02%18%60%CEZ%A9%E6%00%D5%A0%D8%01%A4%FEy~%80%20F)~%87w%86%86%25G.%82%86%26%8F%00%23G%2F-x('%25x%22%22%05%02%0D-%2Bv(%25%25%22!%A9%06I%02j%14%12%10%10%0C%0B%09%B5%04J%04%09k%12%13%B2%B4%08%06o1%17%05%0A%AF%BD%B3%09%06%05%17L%04%03%0A%C8%08%03%04%CDKpG%9FJCA%00%3B\" align = baseline alt \"ninja\" border=\"none\">";
//glare
var smlGlare = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%D0%D6%E3%003%99%11%40%9F-V%A9%3Ff%B3Jm%B3%94%A7%CD(W%AB%2F%5C%AD2_%AEDl%B5%A8%BC%DC%CF%D6%E2%AC%C0%DEe%8F%C6%7B%9E%CD%84%A4%D0%88%A7%D2%91%AD%D4%9A%B4%D8u%9B%CBv%A4%D1%7D%A8%D4%7F%AA%D4%84%AD%D6%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%B7%D0%E7%BC%D3%E8%C3%D8%EB%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00*%00%2C%00%00%00%00%0F%00%0F%00%00%06%92%40%95P%858%10%06%84%03b8%14%14%0C%8F%13%8AD1%14%1CC%07%A1%91B%95F%E0%90%84%80U%15%B8S%91(%14%02%81%22%05%E2%A1KR%B7%DD%EEE1%0A%E8%03%40~%00%1D%11F%1F%26%00%23w%00%1C%1B%8D%1BG'uw%1C%8C%1A%96%1AH(a%20%1E%1D%8D%1A%19%A1I%15%89m%1E%8D%19%17%AA%10J%0Ck%9C%7D%1A%18%AA%17%09K%05%13%A6%9E%B2%17%16%10q*%02%04%12%9C%BB%B3%10%04%02M%05%0A%12%BB%16%0B%05%CALrGIKCA%00%3B\" align = baseline alt \"glare\" border=\"none\">";
//angry
var smlAngry = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%D0%D6%E3%003%99%11%40%9F-V%A9%3Ff%B3Jm%B3%94%A7%CD(W%AB%2F%5C%AD2_%AEDl%B5%A8%BC%DC%CF%D6%E2%AC%C0%DEe%8F%C6%7B%9E%CD%84%A4%D0%88%A7%D2%91%AD%D4%9A%B4%D8u%9B%CBv%A4%D1%7D%A8%D4%7F%AA%D4%84%AD%D6%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%B7%D0%E7%BC%D3%E8%C3%D8%EB%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00*%00%2C%00%00%00%00%0F%00%0F%00%00%06%99%40%95P%858%10%06%84%03b8%14%14%0C%8F%13%8AD1%14%1CC%07%A1%01%40%95F%60%80%84%80U%15%1A%A9%13%40%24%0A%01%40%A0H%81xHME%007%1C%BE(FKl!p%1E%84%1D%11F%1F%26ap%1C%00%1B%8F%1BG'%24mo%1C%8D%1A%99%1AH(%60%82%1E%1D%1B%99%19%A4I%15%23!%82%1C%8F%A4%17%17%10J%0Cm%20%00%B5%B5%AE%17%09K%05%13n%A0%A2%18%00%16%10s*%02%04%12%20%BF%1A%18%AF%04%02M%05%0A%12%A1%1A%16%0B%05%D0LtGIKCA%00%3B\" align = baseline alt \":D\" border=\"none\">";
//smiling
var smlHappy = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%8D%B3%D8%3Ff%B3%003%99%B7%D0%E7u%A3%D1%FF%FF%FFe%8F%C6-V%A9%A8%BC%DC%CF%E0%EF%94%A7%CD%96%B9%DC%BC%D3%E8%11%40%9F%84%A4%D0f%99%CC%AC%C8%E3%CF%D6%E2%93%B6%D9u%9B%CB%D6%E3%F0%AC%C0%DE%84%AD%D6%2F%5C%AD%8C%A5%D6Jm%B3%7D%A8%D4%94%B8%DB%C5%D9%EA%D0%D6%E3%9C%BE%DE%A6%C4%E1%AF%CA%E4%DD%E9%F3%AD%C5%DE%91%AD%D42_%AEDl%B5f%99%CC%7B%9E%CD%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%96%40%96%90%B5%D08%06%0E%CDb8%F4%20%04%16E%87%40%12%20%24C%89%23!%EA4B%60%D0%C3%81e!%B8%00%40%24%02J%7FP%08%A2%A6KX%83%3Ex%7C%A9%18mD%00w%1F%00%1C%84(F%15)%60%00x%1C%00%01%8F%01G%0Au%20w%84%01%17%99%17H%1D!%80%1F%0C%0C%98%17%00%1B%1BI%2B%9Ei%AB%AB%05%07J%26l%00%06%B4%B4%00%05%05*K%08%0Fw%AC%B7%AEq%2C%1E%0E%0Fx%13%98%1B%AE%0E%1EM%08%18%0F%C8%17%14%25%08%CDLrGIKCA%00%3B\" align = \"baseline\" title=\":)\" alt=\":)\" border=\"none\">";
// frowning
var smlFrown = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6-V%A9%003%99%AF%CA%E4%94%A7%CD%CF%D6%E2%7D%A8%D4%A8%BC%DC%3Ff%B3f%99%CC%8D%B3%D8%CF%E0%EF%11%40%9F%7B%9E%CD%BC%D3%E8%9C%BE%DE%AC%C0%DE%84%AD%D6%D6%E3%F0u%9B%CB%AC%C8%E3%93%B6%D9%2F%5C%AD%88%A7%D2Jm%B3%97%BA%DC%C5%D9%EA%84%A4%D0%D0%D6%E3%A6%C4%E1%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AE%7F%AA%D4v%A4%D1Dl%B5f%99%CC%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%95%40%96%90e%D08%08%0E%8Da8%F4%0C%14%92%06'4R%0C%0E%C3%83%23%01%E2%40%0A%E0O%C7%81e%0D%B8%80%90%C5%F2%01%00%22%8F%01Q%D3%0D%01%3E%9F%88%5EO*F!ky%11%1B%84%17%0FF%14)%60o%11%01%00%0C%90%0CG%0Djm%8D%8E%13%99%13H%1Ca%83%17%0C%99%25%A3I%2B%05x%8D%90%A3%26%26%02J'l%11n%B3%AC%26*K%03%19m%1B%A0%13%08%00%15%02r%2C%1E%0E%1D%9F%A1%08%AD%0E%1EM%03%18%1D%BD%15%24%03%CDLsGIKCA%00%3B\" align = baseline title=\":(\" alt=\":(\" border=\"none\">";
// sticking tongue out
var smlRazz = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%7D%A8%D4-V%A9%FF%00%00%003%99f%99%CC%AC%C0%DE%BC%D3%E8%96%B9%DC%3Ff%B3%94%A7%CDe%8F%C6%8D%B3%D8%CF%E0%EF%11%40%9F%7B%9E%CD%A8%BC%DC%AF%CA%E4%CF%D6%E2%93%B6%D9%88%A7%D2%D6%E3%F0u%9B%CB%AC%C8%E3%2F%5C%AD%84%AD%D6Jm%B3%94%B8%DB%C5%D9%EA%84%A4%D0%D0%D6%E3%9C%BE%DE%A6%C4%E1%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AEu%A3%D1f%99%CCDl%B5%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%96%40%96%90%A5%D08%08%0E%8Db8%F4%08%12%86%06GDJ%08%24C%89%03%12%E2%1C%22%60P%C7%81e%09%B8%00%C0%E5%02J%7F%1E%02%A2%A6%2BZ%83%3Ex%7C%A9%18%3D%5C%00w%1F%00%1B%84%0FF%15)%60%00x%1B%00%0C%8F%0CG%0Du%20w%84%0C%19%99%19H%1C%11%80%1F%08%08%98%19%00%01%01I%2B%9Ei%AB%AB%26%0BJ(l%00%03%B4%B4%00%26%26*K%02%14w%B3%B6%B8%0Bq%2C%1E%0E%1Dx%B3%A5%AE%0E%1EM%02%18%1D%13%98%16%25%02%CDLrGIKCA%00%3B\" align = baseline title=\":P\" alt=\":P\" border=\"none\">";
// big grin
var smlGrin ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DB%3Ff%B3%003%99%CF%D6%E2u%A3%D1%FF%FF%FFe%8F%C6-V%A9%AC%C8%E3%94%A7%CD%A8%BC%DC%84%AD%D6%BC%D3%E8%CF%E0%EF%11%40%9Ff%99%CC%84%A4%D0%91%AD%D4%9A%BC%DDu%9B%CB%D6%E3%F0%AC%C0%DE%AF%CA%E4%8D%B3%D8%2F%5C%AD%C5%D9%EBJm%B3%A6%C4%E1%D0%D6%E3%7C%A8%D3%94%BD%DE%8C%A5%D6%DD%E9%F3%9A%B4%D8%AD%C5%DE%B7%D0%E72_%AE%C5%D9%EADl%B5f%99%CC%7B%9E%CD(W%AB%93%B6%D9%C8%DB%EC%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00-%00%2C%00%00%00%00%0F%00%0F%00%00%06%8F%C0%96%B0%A5%D8%3C%06%8F%8Db8%EC%20%04%16%87%86%24%11%20%08C%C2c%11b5.%60N%E4%81m!%B8%2CR%22%C1isR%08%E2%A6K%02%B8%01%93%7C%A9%18m%24%ECy%00%01%83)F%15%00ay%83%18%18%00%18G%0E%00%92%93%94%00%0CH%26%00%06%9B%9C%9C%00%1EI%22%17%9A%9D%9B%00%05%07J'l%A4%9E%05%05*K%08%11%1C%13%95%AF%07q-%1D%0F%11y%2B%18%0C%1E%A8%0F%1DM%08%19%11%C0%0C%14%25%08%C6LrGIKCA%00%3B\" align = baseline alt \":D\" border=\"none\">";
// neutral, straight mouth
var smlNtl ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6%003%99%AC%C0%DE-V%A9%BC%D3%E8%94%A7%CD%7D%A8%D4%3Ff%B3%9C%BE%DEf%99%CC%CF%E0%EF%8D%B3%D8%11%40%9F%7B%9E%CD%AF%CA%E4%A8%BC%DC%CF%D6%E2%84%AD%D6%D6%E3%F0u%9B%CB%AC%C8%E3%93%B6%D9%2F%5C%AD%88%A7%D2Jm%B3%C5%D9%EA%84%A4%D0%97%BA%DC%D0%D6%E3%A6%C4%E1%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AE%7F%AA%D4u%A3%D1Dl%B5f%99%CC%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%95%40%96%90u%D08%06%0E%CDa8%F4%14%12%04%C6%264J%14%24C%89%23%02%DA%18%20%E0%0F%C7%81e%15%B8%80%90%C5%F2%01%00%14%8F%02Q%03J%AF%3F%8A%7C%9ET%8C%1A%2C%00x%0A%00%01%85%0FF%14)%60o%0A%01%00%0D%90%0DG%0Cj%1Fx%85%0D%13%9A%13H%1Ba%0A%1D%17%99%13%25%A5I%2B%10%96%8D%90%A5%26%26%02J'ln%B4n%AE*K%05%19x%A1%99%08%AE%02r%2C%1E%0E%1C%A0%A2%13%BF%02%0E%1EM%05%18%1C%C8%15%24%05%CDLsGIKCA%00%3B\" align = baseline alt \":|\" border=\"none\" >";
// wink
var smlWink ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6-V%A9%003%99%AC%C0%DE%BC%D3%E8%94%A7%CD%7D%A8%D4%3Ff%B3%A8%BC%DCf%99%CC%CF%E0%EF%8D%B3%D8%11%40%9F%7B%9E%CD%AF%CA%E4%9C%BE%DE%CF%D6%E2%84%AD%D6%D6%E3%F0u%9B%CB%AC%C8%E3%93%B6%D9%2F%5C%AD%88%A7%D2Jm%B3%C5%D9%EA%84%A4%D0%A6%C4%E1%94%BD%DE%D0%D6%E3%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AE%7F%AA%D4u%A3%D1Dl%B5f%99%CC%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%97%40%96%90u%D08%08%0E%CDa8%FC%0C%12%05%C6%264J%0C%24C%89C%01%DA%18%20%E0%0E%C7%81e%0D%B8%80%90%C5%D2iw%1E%03%A2%06%94%5Ew%22x%3C%A9%185X%00w%11%00%00%17%17%0FF%14)%60%00x%01%01%0D%90%0DG%0Cjm%11%8E%0D%13%9A%13H%1Ba%97%8F%13%00%25%A4I%2B%10%96%8F%0D%25%00%26%26%02J'l%00%1E%17%99%AD%AE*K%03%19w%83%83%08%AE%02q%2C%1F%0E%1Cx%B6%13%C1%02%0E%1FM%03%18%1C%CA%15%24%03%CFLrGIKCA%00%3B\" align = baseline alt \";)\" border=\"none\" >";

var smlRoll ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%E6%00%00%FF%FF%FF%ED%ED%ED%DD%E9%F3%D9%E7%F2%D6%E3%F0%CF%E0%EF%CE%DF%ED%CA%DC%ED%C5%D9%EB%D0%D6%E3%CF%D6%E2%C5%D9%EA%C3%D8%EB%BD%D4%E8%BC%D3%E8%BB%D2%E8%B9%D1%E7%B7%D0%E7%B9%CF%E6%B1%CB%E5%B0%CA%E4%AE%C9%E4%AD%C9%E3%AC%C8%E3%AA%C6%E2%A9%C6%E2%A8%C5%E2%A7%C5%E1%A6%C4%E1%AE%C1%DF%A5%C3%E1%A4%C2%E0%A3%C2%E0%AC%C0%DE%A0%C0%DF%A8%BC%DC%9F%BF%DF%9E%BF%DE%9D%BE%DE%9C%BE%DE%9A%BC%DD%99%BB%DD%98%BA%DC%98%BB%DC%97%BA%DC%96%B9%DC%94%B8%DB%92%B7%DA%93%B6%D9%9A%B4%D8%92%B6%DA%91%B6%DA%90%B5%DA%8D%B3%D9%8D%B3%D8%8B%B2%D8%8A%B1%D8%87%AF%D6%87%AF%D7%91%AD%D4%85%AE%D6%86%AE%D6%84%AD%D6%83%AD%D6%95%A8%CE%96%A8%CE%81%AB%D5%94%A7%CD%80%AA%D4%88%A7%D2%7F%AA%D4~%A9%D4%7D%A8%D4%7C%A8%D3%84%A4%D0%82%A3%D0%82%A2%D0x%A5%D2v%A4%D1u%A3%D1~%9F%CEs%A1%D0%7B%9E%CDo%9F%CFu%9B%CBk%93%C8e%8F%C6_%8B%C4Lo%B4Io%B6Kn%B4Jm%B3Dl%B5%40i%B3%3Ff%B32_%AE2%5E%AE%2F%5C%AD.W%A9(W%AB-V%A9%12A%9F%11%40%9F%10%3F%9F%035%9A%024%9A%014%99%00%00%00%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%0A%00l%00%2C%00%00%00%00%0F%00%0F%00%00%07%B9%80l%82lC%5Bfif%5B%40%83%83%09d%5E%1D%06%08%12%3B%5Db%0A%83%0Af%23%03%07%0E%14%17%18%1AJg%98lb%9Ckk%16%19%1C%AA%22PblAY%02k%00%00k%1F%B7%B9%2B_%40X!%BC%B8%C3%B9R%5Be%04%B7%AA%B9%B9%CB6gh%05%0D%AA%AF%D5k7%3Eje%0B%13%19%AA-47%AAFHDgX1%15%1B%22(.5%3ABIMNUZA%5C%17%1C%24%2B2%D9GM%A2L%19%B3HL%11%0F%25%AE%ADy2%E5%8A%2C6%09%CC0)%A1b%06%8E%1FI%9CX9%93%A0%91%980K%60%DC%C8A%05%8C%98%8E%8C%D8%00%D1b%06%8D%99%7B%8C%02%01%00!%F9%04%05%0A%00l%00%2C%04%00%05%00%08%00%07%00%00%07%18%80lk%83l%82%84%87%82%00%85%85%8A%8B%8E%8F%90%91l%2C%8Ekl%81%00!%F9%04%05%0A%00l%00%2C%04%00%04%00%07%00%09%00%00%07%16%80lkl%84%82%85%87%00%88%84%89%85%8C%87%8F%90%91%8F%83%87%81%00!%F9%04%052%00l%00%2C%04%00%04%00%08%00%07%00%00%07%17%80kl%83lk%86%86%00%83%88%00%8C%84%8D%84%90%91%92%93%91k%81%00!%F9%04%05%0A%00l%00%2C%04%00%04%00%07%00%09%00%00%07%1A%80%00%00l%84%82%83%84%85k%8Al%8Ak%8C%88%8E%88%92%93%94%95%92*%93%81%00!%F9%04%05%0A%00l%00%2C%02%00%03%00%0B%00%09%00%00%075%80l%82%11%82l%20%85l%07%11%17%1Al%22%26()l%05k%95k%25%96k2%88%00l%9D%88l%96.%96%88%20'%85%3DB%A0%AB%AC%88Q%88%99kO%82%81%00!%F9%04%05%0A%00l%00%2C%02%00%04%00%0B%00%07%00%00%07%2B%80lkl%84%85%82%84%0F%16%1A%20l(%2C.%2Fl%0C%83%82)%94k7l%17%1C%22(l47%3A%3C%86%A4%A5%A6%85%94%A5%81%00!%F9%04%09%0A%00l%00%2C%00%00%00%00%0F%00%0F%00%00%07%2B%80l%82%83%84%85%86%87%88%89%8A%88%07%87)%86k%91kl%92%93%84k%00%82%00%98%9A%96%83%95%94%92%8B%A3%A4%A5%A6%A7%A8%8A%81%00%3B\" align = baseline alt \"rolls eyes\" border=\"none\" >";

var smlShock ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6%003%99%BC%D3%E8-V%A9%FF%FF%FF%88%A7%D2%A6%C4%E1%84%A4%D0%3Ff%B3%CF%E0%EFu%A3%D1%8D%B3%D8%AC%C8%E3%11%40%9F%9D%BE%DEf%99%CC%CF%D6%E2%A8%BC%DCu%9B%CB%D6%E3%F0%AF%CA%E4%91%AD%D4%7D%A8%D4%84%AD%D6%2F%5C%ADJm%B3%AE%C1%DF%C5%D9%EA%D0%D6%E3%94%A7%CD%94%BD%DE%DD%E9%F3%9A%B4%D8%B7%D0%E7%AC%C0%DE2_%AE%7F%AA%D4Dl%B5f%99%CC%7B%9E%CD%C3%D8%EB(W%AB%93%B6%D9%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00-%00%2C%00%00%00%00%0F%00%0F%00%00%06%92%C0%96%B0%F5%D9%3C%06%8F%CDg8%F4%14%14%9CEgtQ%14%24C%C9c%12%EA%10%2C%60D%E2%81m%15%B8%00%80%C3%81HCR%05%E2%A6%3BZ%23%20x%7C%A9HZ%10%1C%00w%10%00%01%85)F%15*%60%00x%01%00%0D%90%0DG%0Bu%08w%85%0D%19%9A%19H%1Dai%A0%26%A2%26I%22%16m%06%A9%A9%00%0C%0C%02J'l%00%AA%AB%AD%2BK%05%07w%B3%B5%AEq-%1E%0F%09x%A0%18%AE%0F%1EM%05%1A%09%2C%99%14%25%05%C9LrGIKCA%00%3B\" align = baseline alt \"rolls eyes\" border=\"none\" >";

var smlEvil ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%E6%00%00%00%00%00f%99%CC%A3%A3%A3JJJ%FF%00%00%BF%C7%CE333k%81%97%FFf%00%FF%FF%FF%96%B9%DC%C8%DB%ED%FF%3C%00%8C%AC%CDAAAY%5B%5C%B6%CF%E6w%92%AB%A5%C3%E1%FF%99%00%FF%1E%00%8F%B5%DA%7C%A8%D3%D7%E1%EB%FF%99%00%9B%B7%D1%8B%98%A5%A7%B4%BE%AD%C8%E3%CC%CC%CC%81%81%81%BE%D4%E9UUU%5E__%3C%3C%3C%DC%E8%F3%8C%9F%B2DGJ%83%AD%D6%C7%D5%E3%FFv%00%FFJ%00%AD%C5%DE%BC%CF%E1%CC%DA%E7%8F%B4%D7NUZ%9C%BD%DEu%A3%D1%AE%CA%E4p%85%99%A3%B3%C4%93%B7%DBfff%7B%AD%D6Y%5D%60%D8%E6%F2%C3%D7%EB%CE%DF%EF%8C%AD%D6%7C%94%AC%FF'%00%8F%9B%A7PTX%E5%E5%E5%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%40%00%2C%00%00%00%00%0F%00%0F%00%00%07%B5%80%03%20%1D%40%025%0E%06%0E5%02%40%17%1E!%06%04%3D!%0F%05%2C9%2B37%03%0C%14%25%22)(%178%0B%1F1%A7%12*%08)%22%22%13%13%00%0B%10%1C%1C%12%B6%00%13(%AD%23%23%0B%00%B4%B6%2F%00%0A%C4%BB%3A%1F%00%00%12%2F%C2%004%CF%06%2289%00%04%C9%0A%C9%D6%3B%3B%06%06%3A%10%D5%04%2F%CF%04%D6%26%26%89'%A7%D7%15%15%C9%16%16%0D%8A%1B1%00%1F%E34%E7%16%000%11%8B%0F%1C%92%09%1C%08%C3%05%23%10%3E%24%00H%C0%90!%BF%03%20%80%00%E9%E0%40C3%810d8%20%24%B1%03%88%1F%242%B4%D8%C1%A3%C4%20%89(%0B%1DJ%B4(e%20%00%3B\" align = baseline alt \"rolls eyes\" border=\"none\" >";

var imgStar ="<img src =\"data:image/gif,GIF89a%15%00%14%00%B3%02%00%F6%DDd%DF%D6%B1%FF%FF%FE%C8%B7d%EB%CBB%D4%B65%F6%E6%A5%B9%B0%7C%CF%C7%A9%EC%EC%E2%F1%EE%E8%F4%F2%EC%E3%DF%BF%C3%ABF%D6%C7%82%E5%E1%D1!%F9%04%01%00%00%02%00%2C%00%00%00%00%15%00%14%00%00%04yP%C8I%11%BD%F8%9E%CC%AF%0B%5D%F7%18N%C89%00ab%0F%90%82%EB%14%B8D%99%3D%01%A3%3F8%9A%129%9En%E7(%B8%0C%06%17M%89L%0D%1E%12D%81%A0TR%8F%84%82m%F2%18L%09WZ%B6%01%C3%14%BF%E0l%E1%19r%A4%D1%83%95%5B%8D%5E%81%0Bx4%23%14%B87%06%0D_%5B%19n%05d%02%0F%07_!%04%0D%1B%15%81%7B%19%01%0D%16%2C%03%83%15P%1D%96%12%11%00%3B\" align = baseline alt \"rolls eyes\" border=\"none\" >";

//these are not editable, the numbers are just defaults that will be used if values in about:config get damaged.
var penaltyBox= GM_getValue('penaltyBox',1);
var cBoxA = GM_getValue('cBoxA',1);
var cBoxW = GM_getValue('cBoxW','170');
var hideAjaxPreview = GM_getValue('hideAjaxPreview','1');
var titlea = GM_getValue('titlea','');
var urla = GM_getValue('urla','http://');
var titleb = GM_getValue('titleb','');
var urlb = GM_getValue('urlb','http://');
var titlec = GM_getValue('titlec','');
var urlc = GM_getValue('urlc','http://');
var titled = GM_getValue('titled','');
var urld = GM_getValue('urld','http://');
var titlee = GM_getValue('titlee','');
var urle = GM_getValue('urle','http://');
var aView = GM_getValue('aView',1);
var pView = GM_getValue('pView',1);
var mView = GM_getValue('mView',1);
var rView = GM_getValue('rView',1);
var cBox = GM_getValue('cBox',1);
var qBrow = GM_getValue('qBrow',10);
var qBwidth = GM_getValue('qBwidth','100');
var autoUpdate = GM_getValue('autoUpdate','1');
var SFont = GM_getValue('SFont','1');
var BFont = GM_getValue('BFont','1');
var Footer = GM_getValue('Footer','1');
var Wide = GM_getValue('Wide','1');
var hideDRThreads = GM_getValue('hideDRThreads','0');
var hideMVThreads = GM_getValue('hideMVThreads','0');
var autoSubscribe = GM_getValue('autoSubscribe','0');
var noRedirect = GM_getValue('noRedirect','1');
var logo = GM_getValue('logo','1');
var customtheme = GM_getValue('customtheme','@import url(http://members.optusnet.com.au/foonly/wpblue/1/css/core.css);');
var customCSS = GM_getValue('customCSS','');
var whimwidth = GM_getValue('whimwidth','400px');
var csswidth = GM_getValue('csswidth',700);
var cssrow = GM_getValue('cssrow',300);
var actdays = GM_getValue('actdays',3);
var whimrow = GM_getValue('whimrow',10);
var nogluteus = GM_getValue('nogluteus',1);
var usernote = GM_getValue('usernote',1);
var ImgWidth =GM_getValue('imgWidth', 300);
var lRead = GM_getValue('lRead',1);
var smallMon = GM_getValue('smallMon');
var styleFlip = GM_getValue('styleFlip');
var avatar = GM_getValue('avatar',1);
var anim_avatar = GM_getValue('anim_avatar',1);
var theme_enabled = GM_getValue('theme_enabled', 0);
var smilies =GM_getValue('smilies',1);
var threadrater =GM_getValue('threadrater',1);
var autoClear = GM_getValue('autoClear',1);
var qBox = GM_getValue('qBox',1);
var qPost = GM_getValue('qPost',1);
var ignoreSwitch = GM_getValue('ignoreSwitch',1);
var qqRows = GM_getValue('qqRows',10);
var navMenu = GM_getValue('navMenu', 1);
var editinplace = GM_getValue('editinplace', 1);
var inlinevideo = GM_getValue('inlinevideo', 1);
var expandvideo = GM_getValue('expandvideo', 1);
var whirlcodewiki = GM_getValue('whirlcodewiki', 1);
var prevDone = GM_getValue('prevDone')*1;
var imgL = GM_getValue('imgL',1);
var noword = GM_getValue('noword',1);
var floatQuote = GM_getValue('floatQuote', 0);
var rank = GM_getValue('rank', 0);
var qqNum = GM_getValue('qqNum', 3);
var currentQq = GM_getValue('currentQq', 1);
//end user modifiable settings, Only change things below this line if you know what you're doing.

var threadDisplay = "&n=" +GM_getValue('threadDisplay',30);

hideAjaxPreview = Number(GM_getValue('hideAjaxPreview'));

// Erwin's versioning and auto update system

var installedVersion = GM_getValue('version',0)*1;
var lastCheck = GM_getValue('lastCheck', 0);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000);
	
var newFeatures = '';
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.onlinelife.com/scripts/whirlpoolplusversion.txt',
		headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
		onload: function(responseDetails) {
		var currentVersion = responseDetails.responseText;
		
if(urlcheck.indexOf('chat.onlinelife.com')!=-1){	
// Erwin - Switch off Chatbox Avatars
  	if (cBoxA ==0){    	
  		addGlobalStyle('.pic {display: none !important;}');
  	}		   
} else {
if(scriptVersion < currentVersion && !isNaN(currentVersion)){

if (autoUpdate==1) {	
  var upDate = confirm ('There is a new version of Whirlpool Plus '+currentVersion+' - you have '+installedVersion+' installed.  Do you want to update now?');
  if (upDate) {
	$('head').prepend('<script type="text/javascript">window.location.href="http://www.onlinelife.com/scripts/whirlpool_plus.user.js";</script>');
  } 

} else if (autoUpdate==2) {	

if (currentTime > (lastCheck + 86400)) {	
var upDate = confirm ('There is a new version of Whirlpool Plus '+currentVersion+' - you have '+installedVersion+' installed.  Do you want to update now?');
  if (upDate) {
	$('head').prepend('<script type="text/javascript">window.location.href="http://www.onlinelife.com/scripts/whirlpool_plus.user.js";</script>');
  } else {
	GM_setValue('lastCheck', currentTime);
	alert("You will not received this notification again until 24 hours later.");
  }
}

}
	
}
	    
if(installedVersion < scriptVersion && scriptVersion == currentVersion){
	if(installedVersion < 2.035){
	   	newFeatures += 'Added WP Steel Yellow theme to list of themes - thanks to Life Begins, Fixed the chatbox popup error - renamed chat.html to chatbox.html';
	}
	if(installedVersion < 2.034){
	   	newFeatures += 'Thanks to skiitz - Fixed quick quote bug, rep and mod post filter';
	}
	if(installedVersion < 2.01){
	   	newFeatures += 'Updated to latest WLR Basic, Edit in Place and Quick Quote to fix bugs, ';
	}
	if(installedVersion < 2.00){
	   	newFeatures += 'Updated to latest WLR Basic, Edit in Place, added option to enable RepMod Post link, ';
	    GM_setValue('mView','1');
		GM_setValue('rView','1');
	}
	if(installedVersion < 1.986){
	   	newFeatures += 'WP+ 1.986 now has WLR Basic 1.5 which has added the option to disable tracking sticky threads, ';
	}
	if(installedVersion < 1.983){
	   	newFeatures += 'The Show the Preview Pane option has been changed to Hide Preview Pane until you start typing, switched ON to only show when typing, ';
	    GM_setValue('hideAjaxPreview','1');
	}
	if(installedVersion < 1.98){
	   	newFeatures += 'Added spoiler/URL/link buttons to Whim Page, Whim User Page, and Wiki Edit Pages, ';
		}
	if(installedVersion < 1.978){
	   	newFeatures += 'Fixed it so the version check does not check the chatbox iframe causing multiple popups, also added option to disable penalty box graphics, ';
	    GM_setValue('penaltyBox',1);
		}
	if(installedVersion < 1.977){
	   	newFeatures += 'Added option to show or disable Chatbox Avatars and set width of Chatbox in sidemenu, ';
	    GM_setValue('cBoxA',1);
	    GM_setValue('cBoxW','170');
	}
	if(installedVersion < 1.975){
	   	newFeatures += 'Tidied up Thread Archive and Print View links at the bottom of thread, ';
	   	newFeatures += 'Added a Go to the Top of Page link to bottom of Thread, '
	}
	if(installedVersion < 1.974){
	   	newFeatures += 'Added option to limit Auto-Updates to once every 24 hours - default is instant, ';
	   	newFeatures += 'Fixed height of left column with chatbox and custom links bug, '
	   	newFeatures += 'Thread Archive and Print View links to show all posts in a Thread now at the TOP and BOTTOM of each THREAD, ';
	}
	if(installedVersion < 1.97){
	   	newFeatures += 'Added Custom Links to Sidemenu (at the moment you can have 5), ';	   	
	    newFeatures += 'Added a ChatBox to sidemenu with Online Users & Popup Option - can be switched off, ';
	    newFeatures += 'Fixed Avatar showing bug, ';
	    GM_setValue('titlea','');
	    GM_setValue('urla','http://');
	    GM_setValue('titleb','');
	    GM_setValue('urlb','http://');
	    GM_setValue('titlec','');
	    GM_setValue('urlc','http://');
	    GM_setValue('titled','');
	    GM_setValue('urld','http://');
	    GM_setValue('titlee','');
	    GM_setValue('urle','http://');
	    GM_setValue('cBox',1);
	    GM_setValue('aView',1);
	    GM_setValue('pView',1);
	}
	if(installedVersion < 1.964){
	    newFeatures += 'WLR Basic Thread Colour Tracking finally fixed, this time for real! ';
	}
	if(installedVersion < 1.962){
	    newFeatures += 'Added option to choose between Dynamic Icon Menu, Right-Click Menu or No Menu.  Fixed whirlcode button bug between Edit in Place and Quick Quote. ';
	}	
	if(installedVersion < 1.961){
	    newFeatures += 'New Dynamic Menu System - Right Click to Access Menu anytime! Switched on by default! ';
	    GM_setValue('navMenu',1);
	}
	if(installedVersion < 1.96){
	    newFeatures += 'Fixed URL button bug, added Link button, ';
	}
	if(installedVersion < 1.958){
		GM_setValue('qBwidth', '100');
		GM_setValue('qBrow', 10);		
		GM_setValue('autoPreview','true');
	    newFeatures += 'Added latest version of Quick Reply Box with new Auto Preview feature switched on by default, Fixed duplicate whirlcode bug, Added latest version of Edit in Place, Added Option to set default Quick Reply Box width and height - change this in the WP+ settings page!';
	}
	if(installedVersion < 1.957){
	    newFeatures += 'Added Life Begins new WP CSS theme to list of custom themes - go check it out now!';
	}
	if(installedVersion < 1.956){
        GM_setValue('autoSubscribe', 0);
	    newFeatures += 'Auto-Subscribe Option is back - default is set to no, ';
	}
	if(installedVersion < 1.952){
	    GM_setValue('autoUpdate','1');
	    newFeatures += 'New Auto-Updating Versioning System, ';
	    newFeatures += 'Testing only, ';
	}
	if(installedVersion < 1.838){
	    GM_setValue('BFont','1');
	    GM_setValue('SFont','1');
	}
		if(installedVersion < 1.833){
	    GM_setValue('hideMVThreads', 0);
	}	
		if(installedVersion < 1.832){
	    GM_setValue('anim_avatar', 1);
	}	
	if(installedVersion < 1.831){
		GM_setValue('customtheme','@import url(http://members.optusnet.com.au/foonly/wpblue/1/css/core.css);');
	    GM_setValue('Font','1');
	    GM_setValue('Footer','1');
	    GM_setValue('Wide','1');
	}
	if(installedVersion < 1.83){
	    GM_setValue('hideDRThreads', 0);
	}		
	if(installedVersion < 1.76){
	    GM_setValue('logo','1');
	    GM_setValue('customCSS','');
	}	
	if(installedVersion < 1.74){
		GM_setValue('whimwidth', '400px');
		GM_setValue('csswidth', 700);
		GM_setValue('cssrow', 300);
	}
	if(installedVersion < 1.6){
		GM_setValue('actdays', 3);
	}
	if(installedVersion < 1.52){
		GM_setValue('whimrow', 10);
	}
	if(installedVersion < 1.5){
		GM_setValue('nogluteus', 1);
	}
	if(installedVersion < 1.4){
		GM_setValue('usernote', 1);
	}
	if(installedVersion < 1.2){
		GM_setValue('lRead', 1);
		GM_setValue('styleFlip', 0);
		GM_setValue('smilies', 1);
		GM_setValue('preName', "");
		GM_setValue('postName', " writes...");
		GM_setValue('prevDone',0);
		GM_setValue('threadRead',"");	
		GM_setValue('qBox', 1);
		GM_setValue('qPost', 1);
		GM_setValue('ignoreSwitch', 1);
	    GM_setValue('qqRows', 10);
		GM_setValue('imgL', 1);		
		GM_setValue('noword', 1);	
		GM_setValue('autoClear', 1);
		GM_setValue('smallMon', 0);
		GM_setValue('avatar', 1);
		GM_setValue('editinplace',1);		
		GM_setValue('inlinevideo',1);
		GM_setValue('expandvideo',1);
		GM_setValue('whirlcodewiki',1);
		GM_setValue('theme_enabled', 0);	
		GM_setValue('floatQuote', 0);
		GM_setValue('qqNum', 3);
		GM_setValue('currentQq',1);
                GM_setValue('imgWidth', 300);
	}		

if (newFeatures == '') {
	var newFeaturesSentence = 'This update fixed some minor bugs but there was no major new feature.';
} else {
	var newFeaturesSentence = 'This update has added the following new features: "'+newFeatures+'".';
}

alert ('You have just upgraded Whirlpool Plus from '+installedVersion+' to '+currentVersion+'. '+newFeaturesSentence+'');

GM_setValue('version', scriptVersion);

}

}

if(urlcheck.indexOf('tag=whirlpool_plus') != -1){
addGlobalStyle('.setHead {	font-family: Arial, Helvetica, sans-serif;	font-size: 16px;	color: #000000;	font-style: normal;	font-weight: bolder;}'
+'.setExp {	font-family: Arial, Helvetica, sans-serif;	padding: 10px; border-top: solid 1px; position:relative;background:#EEEEEE;border:1px solid grey; margin:0.5em 0.5em 0.5em 0.5em; z-index:3;} '
+'.setting {	background-color: #EEEEEE;	float: right;	clear:both;	padding: 3px;	color: #000000;	font-weight: bold; }'
+'.settingLink {	font: 0.6em Arial; color: #000000;	font-weight: bold; text-decoration: none;}'
+'#id_customCSS {height: '+cssrow+'px;}'
+'#id_customCSS textarea{width:'+csswidth+'px; height: '+cssrow+'px;}'
+'#id_titlea textarea{width:500px; height: 20px;}'
+'#id_urla textarea{width:500px; height: 20px;}'
+'#id_titleb textarea{width:500px; height: 20px;}'
+'#id_urlb textarea{width:500px; height: 20px;}'
+'#id_titlec textarea{width:500px; height: 20px;}'
+'#id_urlc textarea{width:500px; height: 20px;}'
+'#id_titled textarea{width:500px; height: 20px;}'
+'#id_urld textarea{width:500px; height: 20px;}'
+'#id_titlee textarea{width:500px; height: 20px;}'
+'#id_urle textarea{width:500px; height: 20px;}');

if(typeof GM_xmlhttpRequest != "undefined") {
	GM_xmlhttpRequest({
	  method:"GET",
	  url:"http://www.onlinelife.com/scripts/whirlpoolplus/theme.xml",
	  headers:{
	    "User-Agent":"monkeyagent",
	    "Accept":"text/monkey,text/xml",
	    },
	  onload:function(doc) {
		doc = doc.responseText.replace(/<\?xml.*\?>/,'');
		doc = new XML(doc);
		nameAr = new Array();
		j =0;
		for each( i in doc..name){
			nameAr[j] =i;
			j++
		}
		valueAr = new Array();
		k = 0;
		for each (l in doc..url){
			valueAr[k] = l;
			k++
		}
		addListSetting(valueAr , nameAr, 'theme_enabled', 'Layout', 'How avatars and/or rankings are laid out');
	  },
	  onerror:function(details){
	   alert('error');
	  }
	});
	//rank XML load
	GM_xmlhttpRequest({
	  method:"GET",
	  url:"http://www.onlinelife.com/scripts/whirlpoolplus/rank.xml",
	  headers:{
	    "User-Agent":"monkeyagent",
	    "Accept":"text/monkey,text/xml",
	    },
	  onload:function(doc) {
		doc = doc.responseText.replace(/<\?xml.*\?>/,'');
		doc = new XML(doc);
		nameAr = new Array();
		j =0;
		for each( i in doc..name){
			nameAr[j] =i;
			j++
		}
		valueAr = new Array();
		k = 0;
		for each (l in doc..url){
			valueAr[k] = l;
			k++
		}
		addListSetting(valueAr , nameAr,'rank', 'Rank Graphics', 'What set of rank icons to use');
	  },
	  onerror:function(details){
	   alert('error');
	  }
	});
}

    var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
	WLRset.innerHTML ='<center><span class="setHead"><a href="http://whirlpool.net.au/wiki/?tag=whirlpool_plus"><font color=red>WHIRLPOOL PLUS SETTINGS</font></a></span><br /><b><font color=blue>Installed Version: '+scriptVersion+'</font></b><br /><b><font color=green>Latest Version: '+currentVersion+' </font></b><br /><br />Upgrade to latest version of WP+ by clicking here:<br /><a href=http://www.onlinelife.com/scripts/whirlpool_plus.user.js>http://www.onlinelife.com/scripts/whirlpool_plus.user.js</a></center>';
	var wikiN = document.getElementById('breadcrumb');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
	addListSetting(['','1','2'] , ['Disable','Instant Updates','Once Every 24 Hours'],'autoUpdate', 'Auto Update WP+', 'When turned on, WP+ automatically updates to the latest version when you visit WP - you can set this to happen each time an update is released or once every 24 hours.');
	addListSetting(['','1','2'] , ['No Menu','Right-Click Menu','Dynamic Menu Icon'],'navMenu', 'Dynamic Menu System', 'Choose a menu system - To access the Right-Click Menu, right click. To access the Dynamic Menu Icon, visit the forum home page first so that the script knows which forums you have access to, and then click on the icon on top left screen.');
	addRadioSetting('cBox', "ChatBox", "A real-time remotely hosted Chatbox in the sidemenu - with number of online WP+ users - click on the link at top to popup the Chatbox.");
	addRadioSetting('cBoxA', "ChatBox Avatars", "Show Chatbox Avatars.  Choose no to switch them off.");
	addListSetting(['160','165', '170', '175', '180','185','190','195','200'] , ['160','165', '170', '175', '180','185','190','195','200'],'cBoxW', 'ChatBox Width', 'Change the width of the Chatbox in the Sidemenu.');
	addRadioSetting('qBox', "Quick Reply Box", "When turned on, a Quick Reply Box appears at the bottom of threads, and Quick Quote next to posts.");
	addListSetting(['10','15', '20', '25', '30', '40','50','60','70','80','90','100'] , ['10','15', '20', '25', '30', '40','50','60','70','80','90','100'],'qBrow', 'Quick Reply Box TextArea Height', 'Increase the number of rows of the Quick Reply Box.');
	addListSetting(['50','75', '100', '125', '150','175','200'] , ['50','75', '100', '125', '150','175','200'],'qBwidth', 'Quick Reply Box TextArea Width', 'Increase the width of the Quick Reply Box.');
	addRadioSetting('hideAjaxPreview', "Hide Preview Pane Until Typing", "Switch to ON to only show Preview Pane when you start typing.");
	addRadioSetting('hideDRThreads', "Hide Deleted/Removed Threads in forum view", "Self explanatory.  Forum view becomes much less cluttered."); 
	addRadioSetting('aView', "Thread Archive View", "Show all Posts in Thread Archive View Link at top of thread.");
	addRadioSetting('pView', "Thread Print View", "Show all Posts in Thread Print View Link at top of thread."); 
	addRadioSetting('mView', "Moderator Post View", "Show a link to view only moderator posts."); 
	addRadioSetting('rView', "Representative Post View", "Show a link to view only representative posts."); 
	addRadioSetting('hideMVThreads', "Hide Moved Threads in forum view", "Self explanatory.  Forum view becomes much less cluttered."); 
	addRadioSetting('autoSubscribe', "Auto-Subscribe", "Automatically subscribe to a thread when you make a post.");
	addRadioSetting('editinplace', "Edit in Place", "Turn on ability to edit post in thread using Ajax."); 
	addRadioSetting('usernote', "User Notes", "Turn on ability to write notes on other users."); 
	addRadioSetting('whirlcodewiki', "Whirlcode in Wiki, Whim and New Thread", "Turn this on to use Whirlcode in Wiki and New Page Thread."); 
	addRadioSetting('nogluteus', "No Gluteus Maximus", "Removes the &p=-1#bottom from thread links on the main index page on Whirlpool"); 
	addListSetting(['1','2', '3', '5', '7', '10', '12', '15' , '20', '30', '60'] , ['1','2', '3', '5', '7', '10', '12', '15' , '20', '30', '60'],'actdays', 'Recent Activity Days', 'Set your default Recent Activity Days on your user page.  Default is 3 - set it to 3 to disable this custom function.');
	addListSetting(['10','15', '20', '25', '30', '35'] , ['10','15', '20', '25', '30', '35'],'whimrow', 'WhIM Message TextArea Height', 'Increase the number of rows of the WhIM Message Area.');
	addListSetting(['100px','200px', '300px', '400px', '500px'] , ['100px','200px', '300px', '400px', '500px'],'whimwidth', 'WhIM Message TextArea Width', 'Increase the width of the WhIM Message Area.');
	addRadioSetting('smilies', "Smilies", "With smilies on, script will automatically change: :) into: "+smlHappy);
	addRadioSetting('avatar', "Static Avatars", "Display static avatars in posts.  To add an avatar, click <a href=http://goodbyepolar.com/cgi-bin/avatar.py>here</a>."); 
	addRadioSetting('anim_avatar', "Animated  Avatars", "Display animated avatars in posts.");
	addRadioSetting('imgL', "Inline Images", "Turns links to images, into images, won't work unless link is direct to image");
	addRadioSetting('inlinevideo', "Inline Videos", "Turn on ability to change YouTube video links to embedded YouTube videos, with title."); 
	addRadioSetting('ignoreSwitch', "Ignore User Button", "Adds a button next to each user's aura vote smilies, which when activated will prevent you from seeing that user. WARNING: Ignoring a user will cause ALL of their posts not to appear for you any more. If you want to remove someone from being ignored, you must remove their entry in the custom css box below.");
	addRadioSetting('smallMon', "Small Monitor", "If you use the 'small monitor' setting in the official whirlpool settings, turn this on as well"); 
	addListSetting(['100','200', '300', '400', '500', '600','700','800', '900', '1000'] , ['100','200', '300', '400', '500', '600','700','800', '900', '1000'],'cssrow', 'Custom CSS TextArea Height', 'Increase the number of rows of the Custom CSS Box (in pixels). <a href="http://whirlpool.net.au/wiki/?tag=whirlpool_plus">Click here to see new Custom CSS Box settings.</a>');
	addListSetting(['100','200', '300', '400', '500', '600','700','800', '900', '1000'] , ['100','200', '300', '400', '500', '600','700','800', '900', '1000'],'csswidth', 'Custom CSS TextArea Width', 'Increase the width of the Custom CSS Box (in pixels). <a href="http://whirlpool.net.au/wiki/?tag=whirlpool_plus">Click here to see new Custom CSS Box settings.</a>');
	addTextSetting('customCSS','Custom Global CSS' , 'Adds any CSS entered in text field. <br />Any entry in here will override the Custom WP Theme. <br /><a href="http://whirlpool.net.au/wiki/?tag=whirlpool_plus">Click here to see new Custom CSS in action.</a>');
	addListSetting(['','@import url(http://members.optusnet.com.au/whirlpoolian/classic/css/core.css);','@import url(http://members.optusnet.com.au/foonly/wpblue/1/css/core.css);','@import url(http://members.optusnet.com.au/whirlpoolian/greyscale/css/core.css);','@import url(http://members.optusnet.com.au/whirlpoolian/steelyellow/css/core.css);'] , ['Default','WP Classic','WP Blue','WP Grey','WP Steel Yellow'],'customtheme', 'Custom WP Theme', 'Choose a WP Theme to Use. <a href="http://whirlpool.net.au/wiki/?tag=whirlpool_plus">Click here to see new Custom WP Theme in action.</a>');
	addRadioSetting('logo', "Whirlpool Plus Logo", "Turn on or off the Whirlpool Plus logo.");
	addRadioSetting('BFont', "Whirlpool Breadcrumb Font", "Make the Breadcrumb Font Arial.");
	addRadioSetting('SFont', "Whirlpool Sidemenu Font", "Make the Sidemenu Font Arial.");
    addRadioSetting('Footer', "Show Whirlpool Footer Links", "Turn on or off the Whirlpool Footer with Links.");
	addRadioSetting('Wide', "Enable Wide Whirlpool", "Make Whirlpool Forums Wide to fit widescreen.");
	addRadioSetting('penaltyBox', "Penalty Box Background", "Highlight when a user is in the penalty box.");	
	addTitleSettinga('titlea','Custom Link Title #1' , 'Title of Link #1');
	addURLSettinga('urla','Custom Link URL #1' , 'URL of Link #1');
	addTitleSettingb('titleb','Custom Link Title #2' , 'Title of Link #2');
	addURLSettingb('urlb','Custom Link URL #2' , 'URL of Link #2');
	addTitleSettingc('titlec','Custom Link Title #3' , 'Title of Link #3');
	addURLSettingc('urlc','Custom Link URL #3' , 'URL of Link #3');
	addTitleSettingd('titled','Custom Link Title #4' , 'Title of Link #4');
	addURLSettingd('urld','Custom Link URL #4' , 'URL of Link #4');
	addTitleSettinge('titlee','Custom Link Title #5' , 'Title of Link #5');
	addURLSettinge('urle','Custom Link URL #5' , 'URL of Link #5');	
	addRadioSetting('lRead', "WLR LAST READ TRACKER", "Turns WLR Last Read Tracker on or off.<br />More options to choose number of threads to track and custom colours below.");	 	
	}					
			
	    }
	});

// Number of posts per page, DONT CHANGE THIS YET OR YOU"LL BREAK STUFF
var pperpage =  20;

// Number of alternate images for current theme.
var theme_alt =2;
//misc. variables, 
var allThread, thisThread, topic, position, startPos, userNum;
//url of current page
urlcheck = window.location.href;
window.picArray = new Array();

function $a(p, c) {
	return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}
function $e(t, a){
	var n = document.createElement(t);
	for (var b in a) if (a.hasOwnProperty(b)){
		n.setAttribute(b, a[b]);
	}
	return n;
}

// Erwin's Font and CSS Style options

addGlobalStyle(customtheme);
addGlobalStyle(customCSS);

  	if (BFont ==1){  
	addGlobalStyle('#breadcrumb * { font-family: arial !important; }'
	+'#breadcrumb_footer * { font-family: arial !important; }');  		
  	}

  	if (SFont ==1){  
	addGlobalStyle('#menu * { font-family: arial !important; }'
	+'#left dl dt * { font-family: arial !important; }');
  	}

  	if (Footer ==0){  
	addGlobalStyle('#footer {display: none !important;}'
	+'#content > span.shim2 {display: none !important;}');  		
  	}
  	
  	if (Wide ==1){  
  	addGlobalStyle('#root, #footer {width: 100% !important;max-width: none !important;}'
	+'#content > span.shim2 {display: none !important;}');  		
  	}

// Erwin - WP+ links
$('#menu_forum ul').append('<li><a href="http://forums.whirlpool.net.au/wiki/?tag=whirlpool_plus">Whirlpool Plus</a></li>');

var tt=$a('//div[@id="footer"]/DL[@class="wikilist"]');
if(tt) {
	tt=tt.appendChild($e('DD'));
	tt = tt.appendChild($e('A', { 'href' : '//whirlpool.net.au/wiki/?tag=whirlpool_plus' }));
	tt.appendChild(document.createTextNode('Whirlpool Plus'));
}

if(urlcheck.indexOf('?f') != -1){
		//Hide removed/deleted threads
		if (hideDRThreads == 1) {
			addGlobalStyle('.threadP0, .threadP1, .threadP2, .threadP3, .deleted{display:none;}');
		}
		if (hideMVThreads == 1) {
			addGlobalStyle('.threadP0, .threadP1, .threadP2, .threadP3, .pointer{display:none;}');
		}
}

// Erwin - Show All Posts in Print View Link, Link to Top of Page
if(urlcheck.indexOf('?t=') != -1 || urlcheck.indexOf('?r=') != -1) {

if (aView ==1){
var nthreadLink = window.location.href;
nthreadLink = nthreadLink.replace("forum-replies.cfm?t=", "forum-replies-archive.cfm/");
$('#replies div.buttons').append('<a href="'+nthreadLink+'" class="bwatch">Thread Archive</a>');
$('.foot_subs').append('· <a href="'+nthreadLink+'">Thread Archive</a>  ');
}
if (pView ==1){
var threadLink = window.location.href;
threadLink = threadLink.replace("forum-replies.cfm", "forum-replies-print.cfm");
$('#replies div.buttons').append('<a href="'+threadLink+'" class="bwatch">Print View</a>');
$('.foot_subs').append('· <a href="'+threadLink+'">Print View</a>  ');
}
if (mView ==1){
var threadLink = window.location.href;
threadLink = threadLink.replace("forum-replies.cfm?", "forum-replies.cfm?um=1&");
$('#replies div.buttons').append('<a href="'+threadLink+'" class="bwatch">Mod Posts</a>');
$('.foot_subs').append('· <a href="'+threadLink+'">View moderator posts</a>  ');
}
if (rView ==1){
var threadLink = window.location.href;
threadLink = threadLink.replace("forum-replies.cfm?", "forum-replies.cfm?ur=1&");
$('#replies div.buttons').append('<a href="'+threadLink+'" class="bwatch">Rep Posts</a>');
$('.foot_subs').append('· <a href="'+threadLink+'">View representative posts</a>  ');
}

$('.foot_subs').append(' <a href="#top" onclick="self.scrollTo(0, 0); return false;">· Go to Top of Page</a> · ');

}


// Erwin - Custom Links
var uu=$a('//div[@id="left"]/DL[@class="userinfo"]');
if(uu) {
	uu=uu.appendChild($e('DD'));
	uu.innerHTML = '<br />';
}

  	if (titlea){  
var uu=$a('//div[@id="left"]/DL[@class="userinfo"]');
if(uu) {
	uu=uu.appendChild($e('DD'));
	var cLink1 = '<font size=2><a href="'+urla+'">'+titlea+'</a>';
	uu.innerHTML = cLink1;
}
  	}

  	if (titleb){  
var uu=$a('//div[@id="left"]/DL[@class="userinfo"]');
if(uu) {
	uu=uu.appendChild($e('DD'));
	var cLink2 = '<font size=2><a href="'+urlb+'">'+titleb+'</a>';
	uu.innerHTML = cLink2;
}
  	}
  	
  	if (titlec){  
var uu=$a('//div[@id="left"]/DL[@class="userinfo"]');
if(uu) {
	uu=uu.appendChild($e('DD'));
	var cLink3 = '<font size=2><a href="'+urlc+'">'+titlec+'</a>';
	uu.innerHTML = cLink3;
}
  	}

  	if (titled){  
var uu=$a('//div[@id="left"]/DL[@class="userinfo"]');
if(uu) {
	uu=uu.appendChild($e('DD'));
	var cLink4 = '<font size=2><a href="'+urld+'">'+titled+'</a>';
	uu.innerHTML = cLink4;
}
  	}

  	if (titlee){  
var uu=$a('//div[@id="left"]/DL[@class="userinfo"]');
if(uu) {
	uu=uu.appendChild($e('DD'));
	var cLink5 = '<font size=2><a href="'+urle+'">'+titlee+'</a>';
	uu.innerHTML = cLink5;
}
  	}
  	
// Erwin - ChatBox 

  	if (cBox ==1){  
addGlobalStyle('#root{min-height:1800px}');
var uu=$a('//div[@id="left"]/DL[@class="userinfo"]');
if(uu) {
	uu=uu.appendChild($e('DD'));
	var chatBox = '<br /><a onmouseover="this.style.cursor=\'pointer\'" onclick="ANY_NAME=window.open(\'http://www.onlinelife.com/chatbox.html\', \'chatpop\',\'status=0,directories=0,toolbar=0,location=0,menuBar=0,scrollbars=1,resizable=1,width=700,height=580,left=100,top=100\')">Chat (POPUP)</a><div align="center" id="cboxdiv"><iframe frameborder="0" width="'+cBoxW+'" height="300" src="http://chat.onlinelife.com/box/?boxid=2818612&amp;boxtag=1700&amp;sec=main" marginheight="2" marginwidth="2" scrolling="auto" allowtransparency="yes" name="cboxmain" style="border: 0px solid;" id="cboxmain"></iframe> <iframe frameborder="0" width="170" height="75" src="http://chat.onlinelife.com/box/?boxid=2818612&amp;boxtag=1700&amp;sec=form" marginheight="2" marginwidth="2" scrolling="no" allowtransparency="yes" name="cboxform" style="border: 0px solid;border-top:0px" id="cboxform"></iframe></div>';
	uu.innerHTML = chatBox;
}
  	} else {
var uu=$a('//div[@id="left"]/DL[@class="userinfo"]');
if(uu) {
	uu=uu.appendChild($e('DD'));
	var chatBox = '<br /><a onmouseover="this.style.cursor=\'pointer\'" onclick="ANY_NAME=window.open(\'http://www.onlinelife.com/chatbox.html\', \'chatpop\',\'status=0,directories=0,toolbar=0,location=0,menuBar=0,scrollbars=1,resizable=1,width=700,height=580,left=100,top=100\')">Chat (POPUP)</a>';
	uu.innerHTML = chatBox;
}  		
  	}
  	
//Operations for thread pages)

if(urlcheck.indexOf('?t=') != -1 || urlcheck.indexOf('forum-replies.cfm?r=') != -1) {
if(smallMon>0){
	addGlobalStyle('#replies td.bodyuserRead{vertical-align: top !important;}');
}
//css for thread pages
if(rank!=0){addGlobalStyle('@import "' +rank +'";')};
if(theme_enabled!=0){addGlobalStyle('@import "'+theme_enabled +'";' )};
			
addGlobalStyle('#replies td.bodyuserRead{ background: url("data:image/gif,GIF89a%08%00d%00%B3%00%00%F3%E8%DC%F4%EA%DF%F5%EC%E2%F3%E9%DD%F8%F2%EB%F5%ED%E3%F4%EB%E0%F6%EF%E6%F7%F0%E8%F7%F1%E9%F6%EE%E5%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%08%00d%00%00%04W%90%C8I%AB%BD4%E9%CD%7BB%60(%8E%C8a%9Ehz(l%CB%16p%2C%CFt%2C%DCx%AE%EF%7C%EF%E3%86%A0pH%2C%0A%03%C8%A4r%C9l%3A%9F%D0%C0%60J%ADZ%AF%D8l%15%C0%EDz%BF%E0%B0xL.%9B%CF%E8%B4z%CDn%BB%DF%F0%B8%7CN%AF%DB%EF%F8%BC%3C%02%00%3B") #F3E8DC repeat-x top; vertical-align: bottom; border-bottom: 1px solid #bbb; font: 10px "Lucida Grande",Verdana,Arial,Helvetica,sans-serif; } '
+'.previewCSS {border:0px solid gray; color:black; background:#FFDCBF; width:150px; font:16px Arial;} '
+'.clearCSS {border:0px solid gray; color:black; background:#DAF2B3; width:150px; font:16px Arial;} .textCSS {width: 80%; border:0px solid gray; color:black; background:#e5e5e5;}'
+'img {border:none;}'
+'.greylink{background:none; border:none; padding:0px; margin:0px; font: 1em arial, sans-serif; color:grey; cursor: pointer;}'
+'a.greylink:hover{color:grey}'
+'div.userNote {position: absolute !important; float:left; clear:both; z-index: 5 !important;}'
+'.noteTxt{position:absolute !important; z-index: 20 !important; right:-200px; top:-5px;-moz-border-radius:8px; border: solid black 1px; padding:5px;}'
+'.noteAvail button{border: solid 2px #990000 !important}'
+'.infoBut{height:20px; width:20px;}');
if(floatQuote>0){
	addGlobalStyle('#quickQuote{position: fixed; top:3px; left:460px; background: white; -moz-border-radius:18px; border: solid black 3px;}'
	+'.op25{-moz-opacity: 0.25;}'
	+'.op95{-moz-opacity: 0.95;}');
}  		
  	
	//find user #'s
	userNum = document.evaluate(
		"//td[@class = 'bodyuser' or @class='bodyuser_u' or @class='bodyuser_r']/div[1]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	//find user rank
	var userRank = document.evaluate(
		"//td[@class = 'bodyuser' or @class='bodyuser_u' or @class='bodyuser_r']/div[3]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
		for(var i=0; i<userRank.snapshotLength; i++){
			//alert('user rank: ' +userRank.snapshotItem(i).innerHTML);
			rankT= userRank.snapshotItem(i).innerHTML;
			if(rankT == '<a style="color: rgb(85, 85, 85);" href="/index.cfm?a=wiki&amp;tag=WP_SectionMods">Section Mod</a>'){
				rankT = 'Section_Mod';
			}
			//rankT = rankT.replace(/<a style="color:#555" href="\/index.cfm?a=wiki&tag=WP_SectionMods">Section Mod<\/a>/g,"Section_Mod");
			rankT = rankT.replace(/<\/a>/g, "");
			rankT = rankT.replace(/\s/g, "_");
			rankT = rankT.replace(/'/g, "_");
			rankT = rankT.replace(/,/g, "_");
			
			userRank.snapshotItem(i).parentNode.parentNode.className = rankT; 
		}

	lastReadArray = loadWLRvalues();
	//thread page, get topic #////////////////
	startPos =urlcheck.indexOf('=') + 1;
	endPos = urlcheck.indexOf('&');
	GM_setValue('prevDone',0);
	var endPos2 = urlcheck.indexOf('#');
	if (endPos<0 && endPos2<0){
		//no extra arguments in url check
		topic = urlcheck.substring(startPos );
	}else{
		if(endPos<0){
			//no '&' so use index of # as endpoint
			endPos = endPos2;
		}
		topic = urlcheck.substring(startPos, endPos);
	}
	
	//get current page # in breadcrumb menu
		var cPage = document.evaluate(
		"//td[@class = 'm2a']//span |//td[@class = 'm2']//span",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		if(cPage.snapshotItem(0)){
			cPage = cPage.snapshotItem(0);
			// next page access key
			if(cPage.nextSibling.nextSibling){
				cPage.nextSibling.nextSibling.accessKey =".";
			}
			//previous page access key
			if(cPage.previousSibling.previousSibling){
				cPage.previousSibling.previousSibling.accessKey =",";
			}
		}
			
	//userName
	var userName = document.evaluate(
		"//span[@class = 'bu_name']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	userNameAr = new Array();	
	for( var lp=0; lp<userName.snapshotLength; lp++){
		var nameTemp = userName.snapshotItem(lp).innerHTML;
		nameTemp =nameTemp.replace("'", "\'");
		userNameAr[lp] = nameTemp;
	}
	
	//reply #
	replyNumAr = document.evaluate(
		"//div/a[@class = 'greylink'][2]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	newreplyNumAr = document.evaluate(
		"//td[@class = 'bodyuser' or @class='bodyuser_u' or @class='bodyuser_r']/a[@name][2]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		//post reply link (for keyboard shortcut)
	pReply = document.evaluate(
		"//td[@class = 'breadtask']/a",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		var userNumber = new Array();
	for (var loop = 0; loop < userNum.snapshotLength; loop++) {
		var userNTemp = userNum.snapshotItem(loop).innerHTML;
		var userNode = userNum.snapshotItem(loop);
		var startUser = userNTemp.indexOf('#') + 1;
		var endUser = userNTemp.indexOf('&') - 1;
		if (endUser < 0){
			//User is online, can't use &nbsp for end position
			endUser = userNTemp.indexOf('<');
		}	
		
		var ut = userNTemp.substring(startUser, endUser);
		userNumber[loop] = ut;
		userNode.parentNode.parentNode.className += "  wlr_" +ut;

	}
	

	var replyLink = pReply.snapshotItem(0);
	for (var loop=0; loop < replyNumAr.snapshotLength; loop++){
		var nodeTemp = replyNumAr.snapshotItem(loop);
		var replyTemp = replyNumAr.snapshotItem(loop).href;
		var startPos = replyTemp.indexOf('#r') + 2;
		var anchorAr = new Array();
		anchorAr[loop] = replyTemp.substring(startPos);
		var cPost = anchorAr[loop];
		var cPost2 = newreplyNumAr.snapshotItem(loop).name;
	if (usernote ==1){
		userNote = document.createElement('div');
		userNote.id = userNumber[loop];
		noteButton = document.createElement('button');
		buttTxt = document.createTextNode('i');
		noteButton.appendChild(buttTxt);
		noteButton.className='infoBut';

		noteButton.addEventListener("click", function(evt){showNote(evt);}, false);
		noteTxt = document.createElement('textarea');
		noteTxt.columns ="50";
		noteTxt.rows ="10";
		noteTxt.style.display ="none";
		noteTxt.className = 'noteTxt';
		noteTxt.id = userNumber[loop];
		userNote.appendChild(noteButton);
		userNote.appendChild(noteTxt);
		userNote.className = "userNote";	
		if(GM_getValue("u"+userNote.id)){
			userNote.className +=" noteAvail";
		}
		noteZ =newreplyNumAr.snapshotItem(loop).parentNode.parentNode;
		noteZ.parentNode.insertBefore(userNote,noteZ);
        }
		//alert(cPost2);
		cPost2 = cPost2.substring(1);
		//Add quick quote button
		if (urlcheck.indexOf("&")>0){
			urltopic = urlcheck.substring(0, urlcheck.indexOf("&"));
		}else{
			urltopic = urlcheck;
		}
	
	}	
	for(i=0; i<userNum.snapshotLength; i++){
		var divWrap = document.createElement('div');
		tdBody = userNum.snapshotItem(i).parentNode;
		divWrap.innerHTML = tdBody.innerHTML;
		divWrap.className = "name_cont";
		tdBody.innerHTML ='';
		tdBody.appendChild(divWrap);
	}

	
	//ignore user button display. not in use yet
if (ignoreSwitch == 1) {
	ignoreUser = document.evaluate(
		"//span[@class = 'voteitem'][1]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < ignoreUser.snapshotLength; i++) {
		userTemp = ignoreUser.snapshotItem(i);
		var ignoreCtr = document.createElement("span");
		var ignoreBtn = document.createElement("span");
		ignoreBtn.className ="voteitem";
		ignoreBtn.title ="ignore user";
		ignoreBtn.id = userNumber[i];
		ignoreBtn.addEventListener('click',function(evt){hideUser(evt)},false);
		smlTxt = document.createTextNode(":X");
		ignoreBtn.appendChild(smlTxt);
		ignoreCtr.appendChild(ignoreBtn);
		spc = document.createTextNode(" ");
		ignoreCtr.appendChild(spc);
		userTemp.parentNode.insertBefore(ignoreCtr, userTemp);
	}

}

	//smiley code
if(smilies ==1){	
	smileys = {	
		"\\*ninja\\*" : smlNinja,
		":-S"  		: smlConfused,
		":S"  		: smlConfused,
		"\\*confused\\*": smlConfused,
		"\\*glare\\*": smlGlare,
		"&gt;:\\)"  : smlEvil,
		"&gt;:-\\)" : smlEvil,
		"\\*angry\\*": smlAngry,
		"&gt;:\\("  : smlAngry,
		":-@" 		: smlAngry,
		":@"  		: smlAngry,
		"&gt;:-\\(" : smlAngry,
		":\\)"		: smlHappy,
		":-\\)"		: smlHappy,
	    ":\\("		: smlFrown,
		":-\\("		: smlFrown,
		":D"  		: smlGrin,
		":-D"  		: smlGrin,
		":\\|"		: smlNtl,
		":-\\|"		: smlNtl,
		":P"		: smlRazz,
		":-P"		: smlRazz,
		";\\)"		: smlWink,
		";-\\)"		: smlWink,
		"\\*rolls eyes\\*": smlRoll,
		"rolls eyes": smlRoll,
		":o" 		: smlShock,
		":-o" 		: smlShock,
		"\\*gold star\\*" :imgStar,
		"gold star" : imgStar
	};
	regex = {};
	for (key in smileys) {
		regex[key] = new RegExp(key, 'g');
		//alert('regex: ' +regex[key]);
	}

	textnodes = document.evaluate(
	"//td[@class = 'bodytext']//text()",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	k=0;
	for (var i = 0; i < textnodes.snapshotLength; i++) {
		node = textnodes.snapshotItem(i);
		if(!is_all_ws(node)){
			var s = document.createElement("span");
			node.data = node.data.replace(/</g,"&lt;"); 
			node.data = node.data.replace(/>/g,"&gt;"); 
			s.innerHTML = node.data.replace(/\s+$/g, '&nbsp;');
		     
			for (key in smileys) {
				s.innerHTML = s.innerHTML.replace(regex[key], smileys[key]);
			}
			node.parentNode.replaceChild(s, node);
		}
	}
	
		

}

}

// Skiitz & Erwin's Auto-Subscribe/ Mark Read

if ((GM_getValue('subscribed') == 'true')||(autoSubscribe == 1)) {
var markSubscribebox = '<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="t" id="modesu" name="modesu" /><label style="cursor: pointer;font-size:10px;" for="modesu"> Watch / Mark read</label></p>';
} else {
var markSubscribebox = '<p><input type="checkbox" style="cursor: pointer;" value="true" wc2="t" id="modesu" name="modesu"/><label style="cursor: pointer;font-size:10px;" for="modesu"> Watch  / Mark read</label></p>';
}

// Yansky Edit in Place

if (editinplace ==1){

function kitAndKaboodle(){

	var docloc = document.location.host;

	var ajaxloaderimgsrc = "data:image/gif;base64,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%3D%3D";

	var editLink = $(".bodypost a[@href^='/forum-reply.cfm?e']");
	
	editLink.each(function(){
	
		if($(this).parent().next().text() != '(edit in place)'){
		
		
			$(this).parent().after('<div style="margin: 5px;"><a class="eip" href="#">(edit in place)</a></div>');
		
		
		}
		
	});

	var xDate = new Date();	

	var gF = xDate.getFullYear();
	var gM = xDate.getMonth()+1;
	//Stupid daylight savings
	var getTtex = $('.nav_item_time').text();
	var getHr = getTtex.slice(getTtex.indexOf(':')-2, getTtex.indexOf(':'));

	var dArr = [''+gM+'', ''+xDate.getDate()+'', ''+xDate.getMinutes()+'', ''+xDate.getSeconds()+''];

	for(var i=0;i<dArr.length;i++){

	    if(dArr[i].length == 1){

	        dArr[i] = '0'+dArr[i];

	    }

	}

	var currTime = gF+"-"+dArr[0]+"-"+dArr[1]+"+"+getHr+"%3A"+dArr[2]+"%3A"+dArr[3];

	var bt, saveOriginalHTML;

	$('.eip').unbind('click').bind("click", function(){

		var clicker = $(this);

		if(clicker.text() == '(cancel edit)'){
		
			clicker.text('(edit in place)');
			
			$('#opInputs, #options, #savEdit, #eipTexta, #buttonsDiv').remove();
			
			bt.html(saveOriginalHTML);
			
			$('.meh, .mehbar').remove();

		}
		else{
			
			var btextHtml;
			bt = clicker.parent().parent().prev();
			saveOriginalHTML = bt.html();
			clicker.text('(cancel edit)');

			var bth = bt.height()-8;
			var btw = bt.width()-25;		
			
			var loaderHeight = bth+5;
			var loaderWidth = btw+5;		
			
			var olt = '';
			var ult = '';
			
			bt.children('*').each(function(){

				//it's easier to change them to unique tags rather than have to deal with nested closing div tags with regex
				
				var iGottaP = $(this);
				var tagN = iGottaP.attr('tagName');

				if(tagN == "HR"){
				
					iGottaP.remove();			
					(btextHtml)? btextHtml += '-----\n\n': btextHtml = '-----\n\n';
				
				}
				else if(tagN == "PRE"){

					var tPreRep = iGottaP.html().replace(RegExp('<br>', 'gim'), '</icanhazbreak>')
									.replace(RegExp('</?span>', 'gim'), '');	//WLR compatibility

					(btextHtml)? btextHtml += '$ '+tPreRep: btextHtml = '$ '+tPreRep;
				}			
				else if(tagN == "UL"){
				
					function ulLI(ut){
					
						ult += '*';
						var addspaceu = ult+' ';		
						ut.find('br').each(function(){
						
							$(this).after('<icanhazbreak>');
							$(this).remove();
			
						});						
						ut.children('li').each(function(){
						
							$(this).after(addspaceu+$(this).html());
							$(this).remove();
						
						});
						//$(this).after($(this).html());
						$(this).remove();

						//ut.after('<icanhazbreak>');
						//ut.remove();
						
					}
					ulLI(iGottaP);
					iGottaP.find('ul').each(function(){
					
						ulLI($(this));
					
					});
					var ulht = iGottaP.html().replace(RegExp('</?ul>', 'gi'), '');	

					(btextHtml)? btextHtml += ulht: btextHtml = ulht;
					//(btextHtml)? btextHtml += iGottaP.html(): btextHtml = iGottaP.html();				

				}	
				else if(tagN == "OL"){
				
					function olLI(ot){
					
						olt += '#';
						var addspaceo = olt+' ';		
						/*ot.find('br').each(function(){
						
							$(this).after('<icanhazbreak>');
							$(this).remove();
			
						});		*/				
						ot.children('li').each(function(){

							$(this).after(addspaceo+$(this).html());
							$(this).remove();
						
						});
						//ot.after('</icanhazbreak>');
						//ot.remove();
						
					}
					olLI(iGottaP);
					iGottaP.find('ol').each(function(){

						olLI($(this));
					
					});
					var olht = iGottaP.html().replace(RegExp('</?ol>', 'gim'), '');	

					(btextHtml)? btextHtml += olht: btextHtml = olht;			
					
				}					
				else if(tagN == "P"){

					iGottaP.find('br').each(function(){
					
						$(this).after('<icanhazbreak>');
						$(this).remove();
		
					});
					
					iGottaP.find('img').each(function(){
					
						var iThis = $(this);
					
						if(this.hasAttribute('title')){
						
							iThis.after(iThis.attr('title').replace("\\", ""));

						}
						var imgParent = iThis.parent();
						iThis.remove();
						if(imgParent.attr('tagName') == 'DIV'){
						
							imgParent.after(imgParent.html());
							imgParent.remove();
						
						}
					
					});

			
					if(iGottaP.attr('class') == 'reference'){
						   
							var refF = iGottaP.children('a:first');
							
							var referenceNum = refF.attr('onclick').split('(')[1].split(')')[0];
												
							refF.after('@'+referenceNum+' '+refF.text());

							refF.remove();
						   
					}		
					if(iGottaP.attr('class') == 'wcauth'){
						   
							var oldOne = iGottaP.children('a:first');
							
							var replyNum = oldOne.attr('onclick').split('(')[1].split(')')[0];
												
							oldOne.after('<wcauth>'+replyNum+oldOne.text()+'</wcauth>');
							
							oldOne.remove();
						   
					}					

					iGottaP.find('span').each(function(){
					
						var sThis = $(this);
					
						var spanClass = sThis.attr('class');
						
						if(!spanClass){  //WLR compatibility

							sThis.children( 'img' ).each(function(){
							
								$(this).after($(this).attr( 'alt' ).replace(/\\/gm,  ''));
								
								$(this).remove( );
								
							});

	                        sThis.after($(this).text());						
						}					
						else{
						
							sThis.after('<'+spanClass+'>'+sThis.text()+'</'+spanClass+'>');
							
						}
					
						sThis.remove();
					
					});
					
					iGottaP.find('a').each(function(){
					
						var aThis = $(this);

						var hr = aThis.attr('href');
						var tx = aThis.text();
						var aClass = aThis.attr('class');

						if(aClass == 'wiki'){

							aThis.after('[['+tx+']]');
							
						}
						else if( (aThis.attr('class') == 'internal') || (aThis.text().indexOf('http://')>-1)){

							aThis.after(hr);
							
						}
						else{
						
							aThis.after('<a href="'+hr+'">'+tx+'</a>');
						
						}

						aThis.remove();	

					});

					if(iGottaP.attr('class') != 'reference'){
					
						/*if(iGottaP.prev().attr('class') == 'reference'){
						
						iGottaP.append('<endparagraph>');
						}
						else{*/
						
							iGottaP.prepend('<endparagraph>').append('<endparagraph>');							
						
						//}

					}
					
					(btextHtml)? btextHtml += iGottaP.html(): btextHtml = iGottaP.html();				
					
				}

				iGottaP.remove();
				
				

			});
			
			/*var myRe = /<br\/?>/gim;
			var str = btextHtml;
			var myArray;
			var breakIndexes = [];
			while ((myArray = myRe.exec(str)) != null){
			   
			   breakIndexes.push(Number(myRe.lastIndex-5));
			  
			}
			
			$(breakIndexes).each(function(){
			
				var breakMinusOneChar = btextHtml.slice(Number($(this)[0]), 5)
				btextHtml = btextHtml.replace(breakMinusOneChar, "\n\r")
			
			});*/
			
			
			//urge to kill rising
			btextHtml = btextHtml.replace(RegExp('</wcrep2>', 'gim'), "']")
			.replace(RegExp('<wcrep2>', 'gim'), "['")	
			.replace(RegExp('</wcrep1>', 'gim'), '"]')
			.replace(RegExp('<wcrep1>', 'gim'), '["')
			//.replace(RegExp('<hr/?>', 'gim'), '-----')
			.replace(RegExp('<endparagraph>', 'gim'), "")	
			.replace(RegExp('</endparagraph>', 'gim'), "\n")
			.replace(RegExp('<wbr/?>', 'gim'), '')
			.replace(RegExp('</wcauth>', 'gim'), "+]\n")
			.replace(RegExp('<wcauth>', 'gim'), "[+")	
			.replace(RegExp('<icanhazbreak>', 'gim'), "")		
			.replace(RegExp('</icanhazbreak>', 'gim'), "\n")
			//.replace(RegExp('</reference>', 'gim'), "")
			//.replace(RegExp('<reference>', 'gim'), "\n")
			.replace(RegExp('</wcsml>', 'gim'), ")]")
			.replace(RegExp('<wcsml>', 'gim'), "[(")
			.replace(RegExp('</wcspoil>', 'gim'), "_]")
			.replace(RegExp('<wcspoil>', 'gim'), "[_")			
			.replace(RegExp('</wcgrey>', 'gim'), "`]")
			.replace(RegExp('<wcgrey>', 'gim'), "[`")
			.replace(RegExp('</wcserif>', 'gim'), "~]")
			.replace(RegExp('<wcserif>', 'gim'), "[~")
			.replace(RegExp("<a class=\"wiki\" href=\"http://.*(whirlpool.*?wiki)", "gim"), '[[')
			.replace(RegExp("<a class=\"wiki\" href=\"http://.*(whirlpool.*?wiki) ", "gim"), ']]')		
			//.replace(RegExp("<br>", "gim"), "\r")
			//.replace(RegExp("<br/>", "gim"), "\r")
			.replace(RegExp("<tt>", "gim"), "[#")
			.replace(RegExp("</tt>", "gim"), "#]")
			.replace(RegExp("<b>", "gim"), "[*")
			.replace(RegExp("</b>", "gim"), "*]")
			.replace(RegExp("<i>", "gim"), "[/")
			.replace(RegExp("</i>", "gim"), "/]")
			.replace(RegExp("<sup>", "gim"), "[^")
			.replace(RegExp("</sup>", "gim"), "^]")
			.replace(RegExp("<sub>", "gim"), "[\\")
			.replace(RegExp("</sub>", "gim"), "\\]")
			.replace(RegExp("<strong>", "gim"), "[*")
			.replace(RegExp("</strong>", "gim"), "*]")		
			.replace(RegExp("<strike>", "gim"), "[-")
			.replace(RegExp("</strike>", "gim"), "-]");
			
			bt.children().hide();

			bt.append('<textarea id="eipTexta" style="background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom;'+
					'border:1px solid #BBBBBB;width:'+btw+'px;height:'+bth+'px;">'+btextHtml+'</textarea>'+
					'<div id="tresize" style="height:10px;width:10px;background-color:orange;float:right;cursor:se-resize;"></div>');
			
			var tArea = $('#eipTexta');
			var tRes = $('#tresize');
			
			//kitchen sink
			/*******whirlcode********/

			var whirlCode = { 	                
								wc_whirlBold :			{ encloseLeft : "[*", encloseRight  : "*]"},
								wc_whirlItalic :		{ encloseLeft : "[/", encloseRight  : "/]"},
								wc_whirlSingleQuote :	{ encloseLeft : "['", encloseRight  : "']"},
								wc_whirlDoubleQuote :	{ encloseLeft : "[\"", encloseRight  : "\"]"},
								wc_whirlQuote :			{ encloseLeft : "[+", encloseRight  : "+]"},
								wc_whirlSuperscript :	{ encloseLeft : "[^", encloseRight  : "^]"},
								wc_whirlSubscript :		{ encloseLeft : "[\\", encloseRight  : "\\]"},
								wc_whirlStrike :		{ encloseLeft : "[-", encloseRight  : "-]"},
								wc_whirlCourier :		{ encloseLeft : "[#", encloseRight  : "#]"},
								wc_whirlSmall :			{ encloseLeft : "[(", encloseRight  : ")]"},
								wc_whirlGrey :			{ encloseLeft : "[`", encloseRight  : "`]"},
								wc_whirlSerif :			{ encloseLeft : "[~", encloseRight  : "~]"},
								wc_whirlGoogle :		{ encloseLeft : "[?", encloseRight  : "?]"},
								wc_whirlEscape :		{ encloseLeft : "[.", encloseRight  : ".]"},
								wc_whirlWiki :			{ encloseLeft : "[[", encloseRight  : "]]"},
								wc_whirlSpoil :			{ encloseLeft : "[_", encloseRight  : "_]"}
						   }; 

			/********whirlcode buttons*********/

			var wcButtons = '<div id="buttonsDiv" style="background-color: #666666;text-align:center;position:absolute;width:'+tArea.width()+'px;padding-bottom:10px;">' +
						'<div style="background:#444 none repeat scroll 0%; height:15px; margin-bottom:10px;cursor:move;text-align:center;font-size:11px;color:#666" class="jqHandle jqDrag">Drag Here</div>'+
						'<button type="button" class="wcodeButtons" title="Bold WhirlCode" accesskey="b" id="wc_whirlBold" >Bold</button>' +
						'<button type="button" class="wcodeButtons" title="Italic WhirlCode" accesskey="i" id="wc_whirlItalic" >Italic</button>' +
						'<button type="button" class="wcodeButtons" title="SingleQuote WhirlCode" accesskey="t" id="wc_whirlSingleQuote" >\'quote\'</button>' +
						'<button type="button" class="wcodeButtons" title="DoubleQuote WhirlCode" accesskey="q" id="wc_whirlDoubleQuote" >"quote"</button>' +
						'<button type="button" class="wcodeButtons" title="Quote WhirlCode" accesskey="h" id="wc_whirlQuote" >who</button>' +
						'<button type="button" class="wcodeButtons" title="Superscript WhirlCode" accesskey="p" id="wc_whirlSuperscript" >Super</button>' +
						'<button type="button" class="wcodeButtons" title="Subscript WhirlCode" accesskey="\\" id="wc_whirlSubscript" >Sub</button>' +
						'<button type="button" class="wcodeButtons" title="Strike WhirlCode" accesskey="k" id="wc_whirlStrike" >Strike</button>' +
						'<button type="button" class="wcodeButtons" title="Courier WhirlCode" accesskey="c" id="wc_whirlCourier" >Courier</button>' +
						'<button type="button" class="wcodeButtons" title="Small WhirlCode" accesskey="m" id="wc_whirlSmall" >Small</button>' +
						'<button type="button" class="wcodeButtons" title="Grey WhirlCode" accesskey="r" id="wc_whirlGrey" >Grey</button>' +
						'<button type="button" class="wcodeButtons" title="Serif WhirlCode" accesskey="s" id="wc_whirlSerif" >Serif</button>' +
						'<button type="button" class="wcodeButtons" title="Google WhirlCode" accesskey="g" id="wc_whirlGoogle" >Google</button>' +
						'<button type="button" class="wcodeButtons" title="Escape WhirlCode" accesskey="e" id="wc_whirlEscape" >Esc</button>' +
						'<button type="button" class="wcodeButtons" title="Wiki WhirlCode" accesskey="w" id="wc_whirlWiki" >Wiki</button>' +
						'<button type="button" class="wcodeButtons" title="Spoiler WhirlCode" accesskey="o" id="wc_whirlSpoil" >Spoiler</button>' +
						'<button type="button" class="wcodeButtons" title="URL Link" accesskey="u" id="wc_whirlurl" >URL</button>' +
						'<button type="button" class="wcodeButtons" title="Link" accesskey="l" id="wc_whirllink" >Link</button>' +
						'<button type="button" class="wcodeButtons" title="Sink" accesskey="meh" id="wc_Sink" >Sink</button>' +

						'</div>';
			
			bt.prepend(wcButtons);
			
			var butMarg = $("#buttonsDiv").height()+25;

			$('#buttonsDiv')[0].style.marginTop = "-"+butMarg+"px";
			GM_addStyle('.wcodeButtons{font-size:0.8em;}');			
			
			var kImg = "data:image/gif;base64,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";
			
			$('#wc_Sink').unbind('mouseup').mouseup(function(evt){
			
				if($('#ks')[0]){
				
					$('#ks').remove();
				
				}
				else{

					var ey = evt.pageY+30;
					var eX = evt.pageX-200;

					$('body').prepend('<img id="ks" style="position:absolute;top:'+ey+'px;left:'+eX+'px;z-index:5;"src="'+kImg+'" />');
					
				}
			
			});
			
			//make buttons div draggable
			/*
			 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
			 *
			 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
			 * Licensed under the MIT License:
			 * http://www.opensource.org/licenses/mit-license.php
			 * 
			 * $Version: 2007.08.19 +r2
			 */
			 
			$.fn.jqDrag=function(h){return i(this,h,'d');};
			$.fn.jqResize=function(h){return i(this,h,'r');};
			$.jqDnR={dnr:{},e:0,
			drag:function(v){
			 if(M.k == 'd')E.css({left:M.X+v.pageX-M.pX,top:M.Y+v.pageY-M.pY});
			 else E.css({width:btw,height:Math.max(v.pageY-M.pY+M.H,0)});
			  return false;},
			stop:function(){E.css('opacity',M.o);$().unbind('mousemove',J.drag).unbind('mouseup',J.stop);}
			};
			var J=$.jqDnR,M=J.dnr,E=J.e,
			i=function(e,h,k){return e.each(function(){h=(h)?$(h,e):e;
			 h.bind('mousedown',{e:e,k:k},function(v){var d=v.data,p={};E=d.e;
			 // attempt utilization of dimensions plugin to fix IE issues
			 if(E.css('position') != 'relative'){try{E.position(p);}catch(e){}}
			 M={X:p.left||f('left')||0,Y:p.top||f('top')||0,W:f('width')||E[0].scrollWidth||0,H:f('height')||E[0].scrollHeight||0,pX:v.pageX,pY:v.pageY,k:d.k,o:E.css('opacity')};
			 E.css({opacity:0.8});
			 $().mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);
			 return false;
			 });
			});},
			f=function(k){return parseInt(E.css(k))||false;};
				
			
			$('#buttonsDiv').jqDrag('.jqDrag');
			
			//make textarea resizable
			tArea.jqResize(tRes[0]);
				
			/*******whirlcode buttons event handler********/		
					   
			$('.wcodeButtons').unbind('mouseup').mouseup(function(){
			
				var buttonID = $(this).attr('id');		

				tArea[0].focus();
				
				var currentValue = tArea[0].value;
				
				var theSelection = tArea[0].value.substring(tArea[0].selectionStart, tArea[0].selectionEnd);

					function insertAtCursor(myField, myValue) {

						if (myField.selectionStart || myField.selectionStart == '0') {
						
							var startPos = myField.selectionStart;
							var endPos = myField.selectionEnd;
							myField.value = myField.value.substring(0, startPos)
							+ myValue
							+ myField.value.substring(endPos, myField.value.length);
							
						} 
						else {
						
							myField.value += myValue;
							
						}
						
					}

				if(theSelection === ""){
					
					if(((currentValue.split(whirlCode[buttonID].encloseLeft).length+currentValue.split(whirlCode[buttonID].encloseRight).length)  % 2) === 0){
						
						insertAtCursor(tArea[0], whirlCode[buttonID].encloseLeft);
						
					}
					else{
						
						insertAtCursor(tArea[0], whirlCode[buttonID].encloseRight);
							
					}
					
				}
				else if(buttonID == "wc_whirlurl"){ 

					var uPrompt = window.prompt("Enter URL:", "http://"); 
					
					if ((uPrompt !== "http://") && (uPrompt !== "") & (uPrompt !== null)) {

						insertAtCursor(tArea[0], '<a href="'+uPrompt+'">'+theSelection+'</a>');
					
					}
						
				}		
				else if(buttonID == "wc_whirllink"){
				
					var uPrompt = window.prompt("Enter Text:", ""); 
					
					if ((uPrompt !== "") & (uPrompt !== null)) {
					
						if(theSelection.indexOf('http://')<0){
						
							theSelection = 'http://'+theSelection;
						
						}

						insertAtCursor(tArea[0], '<a href="'+theSelection+'">'+uPrompt+'</a>');
					
					}
						

				}			
				else{
				
					if(theSelection.indexOf('\n')>-1 || theSelection.indexOf('\r')>-1){

					var tSel = theSelection.replace(/^(.+)$/mg, whirlCode[buttonID].encloseLeft+"$1"+whirlCode[buttonID].encloseRight);
				
					tArea.val(tArea.val().replace(theSelection, tSel));
					
					}
					else{
					
						insertAtCursor(tArea[0], whirlCode[buttonID].encloseLeft+theSelection+whirlCode[buttonID].encloseRight);
					
					}
					
				}	
				
				
				tArea.focus();
				
			
			});		
			
			tArea.focus();
			
			clicker.parent().after('<div id="opInputs" style="position: absolute; display:none; margin:-163px 0 0 -125px;text-align: left; width: 150px; '+
									'background-color: orange; height: 180px;border:2px solid">'+
									'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="w" id="modewc" name="modewc"/>'+
									'<label style="cursor: pointer;font-size:10px;" for="modewc"> Use WhirlCode</label></p>'+
									'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="b" id="modeht" name="modeht"/>'+
									'<label style="cursor: pointer;font-size:10px;" for="modeht"> Allow HTML</label></p>'+
									'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" id="modest" wc2="e" name="modest"/>'+
									'<label style="cursor: pointer;font-size:10px;" for="modest"> Auto entities </label></p>'+
									'<p><input checked="checked" type="checkbox" style="cursor: pointer;" value="true" id="modewl" wc2="a" name="modewl"/>'+
									'<label style="cursor: pointer;font-size:10px;" for="modewl"> Make links clickable</label></p>'+
									'</div>'+
									'<button id="options" type="button">Options</button>'+
									'<input type="submit" value="Save Edit" style="" id="savEdit" name="post"/>');	

			$('#options').unbind('mouseup').bind("mouseup", function() { 
			
				($('#opInputs').css('display') == 'none')? $('#opInputs').css('display', 'block'): $('#opInputs').css('display', 'none');
			
			});
			
			function mUp(){
			
				if(!$('#loader')[0]){
			
					var textOptions = "&";
					
					var settingStr = "pfl";
				
					$('#opInputs :checkbox').each(function(i){
					
						var opThis = $(this);
					
						if($(this).attr('checked')){
						
							settingStr += ''+opThis.attr('wc2');

							textOptions+= ''+opThis.attr('name')+'=true&';
						
						}

					});		

					var textArtex = $('#eipTexta').val();	
					var saveBTH = bt.html();					
					var forPostSuccess = textArtex;
					
					tArea.remove();
					tRes.remove();
					$('#buttonsDiv').remove();

					var previewStr = unsafeWindow.whirlcode2(forPostSuccess, settingStr);				
					
					if($('#loader')[0]){
			
							$('#loader').html('<img src="'+ajaxloaderimgsrc+'" style="relative: absolute; z-index: 5; top: 40%; left: 45%;"/>');
						
						}
					else{

							bt.prepend('<div id="loader" style="position: relative; z-index: 5; background:#EEEEEE url(/img/forum/reply-eeeeee.gif) repeat-x scroll center bottom; height: '+
							loaderHeight+'px; width: '+loaderWidth+'px;"><img src="'+ajaxloaderimgsrc+'" style="position: absolute; z-index: 5; top: 40%; left: 45%;"/></div>');

						}
						
					}
					
					$.ajax({
						type: "POST",
						url: clicker.parent().prev().children('a:last')[0].href,
						data: "version=2&post2=post&form=too+right&"+ 		
						"timestart=%7Bts+%27"+currTime+"%27%7D&"+
						"body="+encodeURIComponent(textArtex)+textOptions+
						"cliptemp=Paste+external+quotes+here",
						success: function(msg){
						
							if( (msg.indexOf('Post edited.') > -1) || (msg.indexOf('You pressed submit more than once') > -1)){
								
								$('#savEdit, #options, #opInputs').hide();
								
								$('#loader').remove();
								
								bt.children().show();
								
								clicker.text('(edit in place)');
		
								bt.append(previewStr);
								
								$('.meh, .mehbar').remove();

							}
							else{
							
								$('#loader').html('<p>Server Timeout. Click the "Save Edit" button to try again.</p>');
							
							}
							
						},
						error: function(XMLHttpRequest, textStatus, errorThrown){
						
							clicker.remove();
							
							$('.meh, .mehbar, #loader, #savEdit, #options, #opInputs').remove();
						
							var runSrc = "data:image/gif;base64,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";
						
							bt.html('<p><img src="'+runSrc+'" alt="runaway.gif" /></p><p>Something Broke!</p><p id="broked">'+
							'You should try editing your post again from the regular edit page. Click on the button below to show your edit.'+
							'<br /><br /><button id="copPost">Show Edit</button></p>');
							
							$('#copPost').one('mouseup', function(){
							
								bt.html(saveBTH);
								$('#buttonsDiv').remove();
								$('#eipTexta').val(textArtex);

							});
							
						}
					
					
				 });	
			
				return false; 

			}		
			
			tArea[0].addEventListener('keydown', function(event) {
			
				if(event.ctrlKey==1 && event.keyCode==13 ){
				
					mUp();
					
				}
					
			}, false);


			
			$('#savEdit').unbind('mouseup').bind("mouseup", function() { 
				
				mUp();
			
			});
			
			//quick-quote to inline edit
			if($('#eipTexta')[0]){
				
				$('.bodypost').each(function(){
				
					$(this).children('div:first').after('<a class="meh greylink" href="">eip-quote</a>');

				});
				$('.meh').unbind('click').bind("click", function(){
				
					var trParent = $(this).parent().parent();
				
					var pre = trParent.attr('id').split('r')[1];
					
					var uNam;
					
					$(trParent[0].getElementsByTagName('span')).each(function(){

					    if($(this).attr('class') == 'bu_name'){

					        uNam = $(this).text();

					    }

					});
					var tSel = window.getSelection().toString().replace(/^(.+)$/mg, '["$1"]');
				
					if(tArea.val().length > 0){
					
					tArea.val(tArea.val()+'\n\n@'+pre+' '+uNam+' writes... \n'+tSel);

					}
					else{
					
						tArea.val(tArea.val()+'@'+pre+' '+uNam+' writes... \n'+tSel);
					
					}

					tArea[0].focus();		
					
					return false;

				});
				
				

			}		
				
		}

		return false; 
		
	});

}

kitAndKaboodle();

$("#replies").ajaxComplete(function(ev, xhr, s) {
	
	if(s.type == 'POST' && s.url.indexOf('forum-reply.cfm?e')<0){
	
		kitAndKaboodle();
	
	}
	
});
	
}
	
// JB Whirlpool Plus logo

  	if (logo ==1){  
  		
var $$plus='data:image/png;base64,'+
	'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';
GM_addStyle('#logo H1 A {background:transparent url("'+$$plus+'") no-repeat bottom right;}');
GM_addStyle('#footer DL.copyright DT.whirlpool A:before {position:absolute;display:block;height:150px;content:url('+$$plus+');padding:110px 0 0 110px;}');

  	}

// Yansky Menu

	if (navMenu ==1){

var grabBod = document.getElementsByTagName('body')[0];

var uNumber = $('#menu+.userinfo a')[0].href.split('id=')[1];

var rClickBox = document.createElement('div');
rClickBox.id = 'rClickBox';
rClickBox.className = 'notarget';
rClickBox.setAttribute('style','position:absolute;left:-100px;');
/***http://www.cssplay.co.uk/menus/slide_definition.html***/
rClickBox.innerHTML = '<div id="dlmenu">'+
'<ul id="rclickmenu">'+
'<li>'+
'<dl class="gallery">'+
	'<dt>WP User</dt>'+
	'	<dd><a href="http://forums.whirlpool.net.au/wiki/?tag=whirlpool_plus">Whirlpool Plus</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/forum-user.cfm?id='+uNumber+'">Your Posts</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/forum-user-online.cfm">People Online</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/whim-contacts.cfm">Contacts</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/forum-subs.cfm">Subscriptions</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/forum-search.cfm">Thread Search</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/profile/">Your Settings</a></dd> '+
	'	<dd><a href="http://forums.whirlpool.net.au/profile/index.cfm?a=logout&amp;logout='+uNumber+'">Log out</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
	'<dt>Technology</dt>'+
	'	<dd><a href="/forum-threads.cfm?f=100">Broadband</a></dd> '+
	'	<dd><a href="/forum-threads.cfm?f=82">DSL Hardware</a></dd> '+
	'	<dd><a href="/forum-threads.cfm?f=9">Networking</a></dd> '+
	'	<dd><a href="/forum-threads.cfm?f=107">Voice over IP</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>IT Industry</dt>'+
'		<dd><a href="/forum-threads.cfm?f=80">IT Industry</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=125">Telecomms</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=116">Web Hosting</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=63">Web Development</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=127">Programming</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Computers</dt>'+

'		<dd><a href="/forum-threads.cfm?f=7">PC Hardware</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=10">Windows</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=38">Apple</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=39">Linux/BSD</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Internet</dt>'+
'		<dd><a href="/forum-threads.cfm?f=91">On the internet</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=87">Peer to peer</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Lounges</dt>'+
'		<dd><a href="/forum-threads.cfm?f=112">Music</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=8">Gaming</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=83">Gadgets</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=58">Movies</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=106">Television</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=126">Home Theatre</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=71">Lifestyle</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=118">Sports</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=85">In the News</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Whirlpool</dt>'+
'		<dd><a href="/forum-threads.cfm?f=35">Forum feedback</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=92">Choosing an ISP</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=117">The Pool Room</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Mobile</dt>'+
'		<dd><a href="/forum-threads.cfm?f=114">Mobile Carriers</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=123">Mobile Phones</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=18">Wireless ISPs</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Companies</dt>'+
'		<dd><a href="/forum-threads.cfm?f=14">BigPond</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=15">OptusNet</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=68">Internode</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=72">iiNet</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=69">Netspace</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=94">Westnet</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=90">TPG</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=102">aaNet</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=105">Exetel</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=109">Adam</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=119">AAPT</a></dd> '+
'</dl>'+
'</li>'+
'<li>'+
'<dl class="gallery">'+
'	<dt>Connections</dt>'+
'		<dd><a href="/forum-threads.cfm?f=67">Regional, Satellite</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=31">Other broadband</a></dd> '+
'		<dd><a href="/forum-threads.cfm?f=5">Other connections</a></dd> '+
'</dl>'+
'</li>'+
'</ul>'+
'</div>';


GM_addStyle('#dlmenu {height:10em;}'+
	'#rclickmenu {list-style-type:none; margin:0 0 10px; padding:0; position:absolute; width:9em; background:#fff; z-index:100;left:-25px;border:2px solid orange;border-top:none;}'+
	'#rclickmenu li {display:block; padding:0; margin:0; position:relative; z-index:100;}'+
	'#rclickmenu li a, #rclickmenu li a:visited {display:block; text-decoration:none;}'+
	'#rclickmenu li dd {display:none;}'+
	'#rclickmenu li:hover, #rclickmenu li a:hover {border:0;}'+
	'#rclickmenu li:hover dt a , #rclickmenu li a:hover dt a {background:#d4d8bd center center; color:#ff0; }'+
	'#rclickmenu li:hover dd, #rclickmenu li a:hover dd {display:block;}'+
	'#rclickmenu li:hover dl, #rclickmenu li a:hover dl {background:#616CA3;}'+
	'#rclickmenu table {border-collapse:collapse; padding:0; margin:-4px; font-size:1em;}'+
	'#rclickmenu dl {width: 9em; margin: 0; background: #616CA3; cursor:pointer;}'+
	'#rclickmenu dt {margin:0; padding:5px; font-size: 1.1em; border-top:2px solid orange;}'+
	'#rclickmenu dd {margin:0; padding:0; font-size: 1em; text-align:left; }'+
	'.gallery dt a, .gallery dt a:visited {display:block; color:#fff; padding:5px 5px 5px 10px; background:#949e7c url(top_grad.gif) center center;}'+
	'.gallery dd a, .gallery dd a:visited {color:#000; min-height:1em; text-decoration:none; display:block; padding:4px 5px 4px 20px; background:#DFD7CA;}'+
	'* html .gallery dd a, * html .gallery dd a:visited {height:1em;}'+
	'.gallery dd a:hover {background:#EDEDED; color:#666;}');

document.addEventListener('mouseup', function(e) {

	if(e.which==3 && e.target.tagName != 'A' && e.target.tagName != 'TEXTAREA'){

		
		rClickBox.style.left = ''+e.pageX-115+'px';
		rClickBox.style.top = ''+e.pageY+'px';
	
		grabBod.appendChild(rClickBox);
		$(rClickBox).find('*').addClass('notarget');

	}
	if(e.which==1 && $('#rClickBox')[0] && e.target.className != 'notarget'){
	
		$('#rClickBox').remove();
	
	}

			
}, false);  

	} else if (navMenu == 2) {
		
			if(document.URL == 'http://forums.whirlpool.net.au/' || document.URL == 'http://forums.whirlpool.net.au/forum.cfm'){
	
		function checkIfSimonHasChangedShitAgain(gm){

			var arrHolder = [], hrefArr = [], dGetter;
			
			(gm == 'h3check')?dGetter = $('h3') : dGetter = $("h3:contains('"+gm+"')").next().find("div.title a[@href*='forum-threads.cfm']");		
		
			dGetter.each(function(){

				arrHolder.push($(this).text());

				if(gm != 'h3check'){
				
					hrefArr.push($(this)[0].href);
					
				}
			  
			});

			var ts = arrHolder.toString();

			if(!GM_getValue(''+gm+'') || ts != GM_getValue(''+gm+'') ){

				GM_setValue(''+gm+'',''+ts+'');
				
				if(gm != 'h3check'){
				
					GM_setValue(''+gm+'href',''+hrefArr.toString()+'');
				
				}

			}		
			
		}
	
		checkIfSimonHasChangedShitAgain('h3check');
		
		var splith3 = GM_getValue('h3check').split(',');

		for(var i=0;i<splith3.length;i++){
		
			checkIfSimonHasChangedShitAgain(splith3[i]);
		
		}
	
	}

	GM_addStyle("#pmenu {padding:0;list-style-type: none; position:fixed;z-index:50;height:19px;overflow:hidden;width:18px;}"+
				"#pmenu img{margin;0;padding:0;border:none;background:transparent;width:16px;}"+
				"#pmenu:hover {height:auto;overflow:visible;}"+
				"#pmenu ul {padding:0; margin:0; list-style-type: none; width:101px;}"+
				"#pmenu li {position:relative;z-index:51;}"+
				"#pmenu a{display:block;width:100px; font-size:10px; color:#000; height:23px; line-height:22px; "+
					"text-decoration:none; text-indent:5px; background:#D4CCC3; border:1px solid #fff; border-width:0 1px 1px 0;}"+
				"#pmenu>li>ul>li>a{background:#EDEDED;}"+
				"#pmenu li:hover > a {background:#dfd7ca; color:#c00;}"+
				"#pmenu li ul {display: none;} "+
				"#pmenu li:hover > ul {display:block; position:absolute; top:0; z-index:52;margin-left:101px;}");	

	
	var unLi = document.createElement('ul');
	unLi.setAttribute('id', 'pmenu');
	
	var uNumber = $('#menu+dl>dd:first').text().split('User ID: #')[1];
	
	var loc = document.location.host;
	
	var spinner="data:image/png;base64,"+
		"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"+
		"RK5CYII=";

	var gfx = 'http://forums.whirlpool.net.au/skin/web/img/favicon.gif';	
	
	var pol = 'data:image/png;base64,R0lGODlhFAAcAOU+AAICAjKa/qKCCuLCEv4CAtKaCprK/gJiyv6amtrSxmJKEtKyEurq4nJiMqKa'+
				'eoJiCv7iIv5iYrqKCnJaCppqAvLSGtra0mJSGv6iQuKyEgIyYvLKGtqqEv7+8opyEsqaCpKKYkIy'+
				'Ev7+AgIaMv7i4v7Kyqp6ArKSCv7y8pJqCv7aGurKGtq6GnpqOuLi2tKiCrqSCppyCuK6EmpKCGpS'+
				'CnpiOqqagopiAqqCCurCEtqyEtqiCsKSCmpSGv7+/gAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQF'+
				'BQA/ACwAAAAAFAAcAAAG/8CfcPgDGI/EJBFAaDoBSiXT2YRGl9TqFZu1botZgvd6LCOjxoN6fdC4'+
				'jUkAO30wut9DufotMmIAdyMjUIBvRyIiH39HgoOFAAEGkmUBlXWClGaackhHbmx3GphwPyieGiF3'+
				'IY1HHUIJExUQRiFHtUY5HDMJQg4eIcDBwsIPDkI1LCoQwsvBKhsyPC1CCivKwRDZztAfF9TW2eHi'+
				'ECorGd1CDQuy4+IVOToS0z8OOBsqIe3kITI7FMY/EtAYUAHfOHy5CuwSggKEgBwbKgwLAe8FBRAo'+
				'hrjocUJGjhUbNqzIIYPDCxM9XCSx0CAFhwwyZGTQsePDjQYWojBwMCMGjBcXBSRQmOGAwZYOCWy0'+
				'UKCghY0ErogEAQAh+QQFBQA/ACwHAAEAAgAFAAAGB0AEojQsEoMAIfkEBQUAPwAsBwABAAQABQAA'+
				'Bg3AiDCC+Al9xgjymAwCACH5BAUFAD8ALAYAAAAIAAYAAAYbwB9hSBQijsjhr8QsIYYlkpRUgk6p'+
				'Q0SU+gwCACH5BAUFAD8ALAYAAAAIAAYAAAYawB9gSBQSCIgkYnhMlkpMJKLkizqrgOa0GgQAIfkE'+
				'BQUAPwAsCQABAAQABQAABg1AAgGBECJKRuRQeQwCADs=';
	
	function qSett(){
	
		var qnsArray;

		var pO = window.pageYOffset+20;
		
		GM_addStyle("#setD{position:absolute;width:160px;height:330px;background-color:#D8D0C8;border:3px solid orange;left:35%;top:"+pO+"px;z-index:20;padding:20px;}"+
					"#setDh3{margin:0;background-color:#525D94;color:white;padding:10px;}"+
					"#setDcancel{margin-top:20px;}"+
					"#setDok{margin-top:20px;margin-left:20px;padding:0 20px;}");
	
		var setD = document.createElement('div');
		setD.id="setD"; 
		setD.innerHTML='<h3 id="setDh3">QuickNav Settings</h3>'+
			'<div id="setDcontentA">'+
			'<h4 id="setDhA4">Select Image To Use:</h4>'+
			'<form id="iSrc" name="iSrc">'+
			'<input type="radio" name="qnS" gm="imgSrc" value="'+spinner+'"> <img height="18px" width="18px" src="'+spinner+'" />'+
			'<br />'+
			'<input type="radio" name="qnS" gm="imgSrc" value="'+gfx+'"> <img src="'+gfx+'" />'+
			'<br />'+
			'<input type="radio" name="qnS" gm="imgSrc" value="'+pol+'"> <img src="'+pol+'" />'+			
			'</form>'+	
			'<br />'+
			'<h4 id="setDhA4">Select QuickNav Position:</h4>'+
			'<form id="quickNav" name="quickNav">'+
			'<input type="radio" name="qnS" gm="nPos" value="left">Far Left'+
			'<br />'+
			'<input type="radio" name="qnS" gm="nPos" value="right">Right Of Menu'+
			'</form>'+	
			'<br />'+		
			'</div>';
			
		var bC = document.createElement('button');
		bC.id="setDcancel"; 
		bC.value="Cancel";
		bC.textContent="Cancel";
		setD.appendChild(bC);
		$(bC).mouseup(function(){
		
			$(this).parent().remove();
		
		})		

		var bOk = document.createElement('button');
		bOk.id="setDok"; 
		bOk.value="OK";
		bOk.textContent="OK";
		setD.appendChild(bOk);
		bOk.addEventListener('click', function() {

			for(var n=0;n<qnsArray.length;n++){
			
		        var aCheck = qnsArray[n].checked;
				
				if(aCheck){
				
					var meh = qnsArray[n].getAttribute('gm');
				
					GM_setValue(''+meh+'', ''+qnsArray[n].value+'');

				}		
			
			}
			
			$(this).parent().remove();
		
		}, false);		
		
		$('body').prepend(setD);
		
		qnsArray = document.getElementsByName('qnS');
		
		for(var m=0;m<qnsArray.length;m++){
	
		    if( qnsArray[m].value == (GM_getValue('imgSrc')) || (qnsArray[m].value == GM_getValue('nPos')) ){

		        qnsArray[m].setAttribute('checked', 'checked');

		    }			
		
		}		
	
	}

	GM_registerMenuCommand('QuickNav Settings', qSett);

	
	if(!GM_getValue('h3check')){
	
		GM_setValue('imgSrc' , 'http://forums.whirlpool.net.au/skin/web/img/favicon.gif');
		GM_setValue('navPos' , '25px 0 50px 5px');
		
		unLi.style.display.margin = GM_getValue('navPos');
		unLi.innerHTML = '<a style="font-size:9px;" href="http://forums.whirlpool.net.au">Please Visit The Forum Index</a>';
	
		$('body').prepend(unLi);
	
	}
	else{
	
		var br = ($('body').width() - $('#root').width())/2+$('#left').width();
		
		(GM_getValue('nPos') == 'left')? GM_addStyle("#pmenu {margin: 25px 0 50px 5px}"): GM_addStyle("#pmenu {margin: 25px 0 50px "+br+"px}");

		var imgSrc = GM_getValue('imgSrc');
	
		unLi.innerHTML = '<img src="'+imgSrc+'" />'+
			'<li><a href="#">WP User</a>'+
				'<ul> ' +
					'<li><a href="http://'+loc+'/forum-user.cfm?id='+uNumber+'">Your Posts</a></li> ' +
					'<li><a href="http://'+loc+'/forum-user-online.cfm">People Online</a></li> ' +
					'<li><a href="http://'+loc+'/whim/?action=inbox">Inbox</a></li> ' +
					'<li><a href="http://'+loc+'/whim/?action=outbox">Outbox</a></li> ' +
					'<li><a href="http://'+loc+'/whim-contacts.cfm">Contacts</a></li> ' +
					'<li><a href="http://'+loc+'/forum/?action=popular_views">Popular Topics</a></li> ' +
					'<li><a href="http://'+loc+'/forum/?action=watched">Watched Threads</a></li> ' +
					'<li><a href="http://'+loc+'/forum-search.cfm">Thread Search</a></li> ' +
					'<li><a href="http://'+loc+'/profile/">Your Settings</a></li> ' +
					'<li><a href="http://'+loc+'/index.cfm?a=wiki&tag=whirlpool_plus">WP Plus Settings</a></li> ' +				
					'<li><a href="http://'+loc+'/profile/index.cfm?a=logout&logout='+uNumber+'">Log out</a></li> ' +
				'</ul> ' +
			'</li> ';	

		$('body').prepend(unLi);

		var h3splitSecond = GM_getValue('h3check').split(',');
		
		for(var j=0;j<h3splitSecond.length;j++){
		
			var hrArrSplit = GM_getValue(''+h3splitSecond[j]+'href').split(',');	
			
			var splitagain = GM_getValue(''+h3splitSecond[j]+'').split(',');
			
			var l = document.createElement('li');
			l.setAttribute('class', 'theeighthli');
			l.innerHTML = '<a href="#">'+h3splitSecond[j]+'</a>';

			var ul2 = document.createElement('ul');
			ul2.setAttribute('class', 'theeighthul');
			l.appendChild(ul2);		
			
			for(var k=0;k<splitagain.length;k++){
			
				var l2 = document.createElement('li');
				l2.setAttribute('class', 'theeighthli2');
				l2.innerHTML = '<a href="'+hrArrSplit[k]+'">'+splitagain[k]+'</a>';	
				ul2.appendChild(l2);	
				
			}	
			
			unLi.appendChild(l);
			
		}
			
	}

	}

// Whirlcode Whim Wiki

if (whirlcodewiki ==1){
var tArea;

var dUrl = document.URL.indexOf('wiki/?action=edit')>-1;

(dUrl)? tArea = $('textarea#f_body'): tArea = $('textarea#body');



//var bt = document.evaluate( '/html/body/table/tbody/tr/td[2]/div/form/div/table/tbody/tr[3]/td[2]' ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

//kitchen sink
/*******whirlcode********/

var whirlCode = { 	                
								wc_whirlBold :			{ encloseLeft : "[*", encloseRight  : "*]"},
								wc_whirlItalic :		{ encloseLeft : "[/", encloseRight  : "/]"},
								wc_whirlSingleQuote :	{ encloseLeft : "['", encloseRight  : "']"},
								wc_whirlDoubleQuote :	{ encloseLeft : "[\"", encloseRight  : "\"]"},
								wc_whirlQuote :			{ encloseLeft : "[+", encloseRight  : "+]"},
								wc_whirlSuperscript :	{ encloseLeft : "[^", encloseRight  : "^]"},
								wc_whirlSubscript :		{ encloseLeft : "[\\", encloseRight  : "\\]"},
								wc_whirlStrike :		{ encloseLeft : "[-", encloseRight  : "-]"},
								wc_whirlCourier :		{ encloseLeft : "[#", encloseRight  : "#]"},
								wc_whirlSmall :			{ encloseLeft : "[(", encloseRight  : ")]"},
								wc_whirlGrey :			{ encloseLeft : "[`", encloseRight  : "`]"},
								wc_whirlSerif :			{ encloseLeft : "[~", encloseRight  : "~]"},
								wc_whirlGoogle :		{ encloseLeft : "[?", encloseRight  : "?]"},
								wc_whirlEscape :		{ encloseLeft : "[.", encloseRight  : ".]"},
								wc_whirlWiki :			{ encloseLeft : "[[", encloseRight  : "]]"},
								wc_whirlSpoil :			{ encloseLeft : "[_", encloseRight  : "_]"}
			   }; 

/********whirlcode buttons*********/

var wcButtons = '<div id="buttonsDiv" style="text-align:center;">' +
			'<button type="button" class="wcodeButtons" title="Bold WhirlCode" accesskey="b" id="wc_whirlBold" >Bold</button>' +
			'<button type="button" class="wcodeButtons" title="Italic WhirlCode" accesskey="i" id="wc_whirlItalic" >Italic</button>' +
			'<button type="button" class="wcodeButtons" title="SingleQuote WhirlCode" accesskey="t" id="wc_whirlSingleQuote" >\'quote\'</button>' +
			'<button type="button" class="wcodeButtons" title="DoubleQuote WhirlCode" accesskey="q" id="wc_whirlDoubleQuote" >"quote"</button>' +
			'<button type="button" class="wcodeButtons" title="Quote WhirlCode" accesskey="h" id="wc_whirlQuote" >who</button>' +
			'<button type="button" class="wcodeButtons" title="Superscript WhirlCode" accesskey="p" id="wc_whirlSuperscript" >Super</button>' +
			'<button type="button" class="wcodeButtons" title="Subscript WhirlCode" accesskey="\\" id="wc_whirlSubscript" >Sub</button>' +
			'<button type="button" class="wcodeButtons" title="Strike WhirlCode" accesskey="k" id="wc_whirlStrike" >Strike</button>' +
			'<button type="button" class="wcodeButtons" title="Courier WhirlCode" accesskey="c" id="wc_whirlCourier" >Courier</button>' +
			'<button type="button" class="wcodeButtons" title="Small WhirlCode" accesskey="m" id="wc_whirlSmall" >Small</button>' +
			'<button type="button" class="wcodeButtons" title="Grey WhirlCode" accesskey="r" id="wc_whirlGrey" >Grey</button>' +
			'<button type="button" class="wcodeButtons" title="Serif WhirlCode" accesskey="s" id="wc_whirlSerif" >Serif</button>' +
			'<button type="button" class="wcodeButtons" title="Google WhirlCode" accesskey="g" id="wc_whirlGoogle" >Google</button>' +
			'<button type="button" class="wcodeButtons" title="Escape WhirlCode" accesskey="e" id="wc_whirlEscape" >Esc</button>' +
			'<button type="button" class="wcodeButtons" title="Wiki WhirlCode" accesskey="w" id="wc_whirlWiki" >Wiki</button>' +
						'<button type="button" class="wcodeButtons" title="Spoiler WhirlCode" accesskey="o" id="wc_whirlSpoil" >Spoiler</button>' +
						'<button type="button" class="wcodeButtons" title="URL Link" accesskey="u" id="wc_whirlurl" >URL</button>' +
						'<button type="button" class="wcodeButtons" title="Link" accesskey="l" id="wc_whirllink" >Link</button>' +

			'</div>';

GM_addStyle('.wcodeButtons{font-size:0.9em;}');			
	
(dUrl)? tArea.before(wcButtons) : tArea.before(wcButtons);			


/*******whirlcode buttons event handler********/		
		   
$('.wcodeButtons').mouseup(function(){

	var buttonID = $(this).attr('id');		

	tArea[0].focus();
	
	var currentValue = tArea[0].value;
	
	var theSelection = tArea[0].value.substring(tArea[0].selectionStart, tArea[0].selectionEnd);

	if(theSelection === ""){
	
		alert('No Text Selected');
		
	}
	else if(buttonID == "wc_whirlurl"){ 

		var uPrompt = window.prompt("Enter URL:", "http://"); 
		
		if ((uPrompt !== "http://") && (uPrompt !== "") & (uPrompt !== null)) {

			tArea.val(tArea.val().replace(theSelection,'<a href="'+uPrompt+'">'+theSelection+'</a>'));
		
		}
			
	}		
	else if(buttonID == "wc_whirllink"){
			
		var uPrompt = window.prompt("Enter Text:", ""); 
					
		if ((uPrompt !== "") & (uPrompt !== null)) {
			
			if(theSelection.indexOf('http://')<0){
						
				var theChosen = 'http://'+theSelection;
					
			}
			tArea.val(tArea.val().replace(theSelection,'<a href="'+theChosen+'">'+uPrompt+'</a>'));
				
		}
						

	}	
				
	else if((theSelection !== "") && (buttonID != 'wc_whirlurl') && (buttonID != 'wc_whirllink')){
			
		//tArea.val(tArea.val().replace(theSelection, whirlCode[buttonID].encloseLeft + theSelection + whirlCode[buttonID].encloseRight));
		
		var selLength = tArea[0].textLength;
		var selStart = tArea[0].selectionStart;
		var selEnd = tArea[0].selectionEnd;
		if (selEnd == 1 || selEnd == 2)
			selEnd = selLength;

		var s1 = (tArea.val()).substring(0,selStart);
		var s2 = (tArea.val()).substring(selStart, selEnd)
		var s3 = (tArea.val()).substring(selEnd, selLength);
		tArea.val(s1 + whirlCode[buttonID].encloseLeft + s2 + whirlCode[buttonID].encloseRight + s3);
		
	}
	
	tArea.focus();
	
	theSelection = '';		

});		

}
	
// No Gluteus Maximus

if (nogluteus ==1){

$('.threads a').each( function(){

this.href = this.href.replace("&p=-1#bottom", "");

});

}

// Whim Big Setting

var dU = document.URL;
var uId = $('.userinfo dd:first').text().split('User ID: #')[1];

if(dU.indexOf('forum-user.cfm?id=')>-1){

$("textarea").width(whimwidth).attr("rows",whimrow);

}

// Yansky WLR Basic for New Design

if (lRead ==1){

var dUrl = document.URL.toLowerCase();

if(GM_getValue('lastRead0') && (GM_getValue('lastRead0').charAt(0) == ',') ){

	$('body').prepend('<div style="border: 3px solid grey; position: absolute; height: 100px; width: 100%; background-color: rgb(97, 105, 166); z-index: 99;" id="wlrAlert">'+
					'	<p style="margin: 5px 0pt 0pt 40px; color: white; font-size: 20px;width:600px;">An error has occured in the greasemonkey script.</p>'+
					'	<p style="margin: 5px 0pt 0pt 40px; color: white; font-size: 20px;width:600px;">Click this button to fix it. '+
					'		<button id="fixtrack" style="height:20px;width:60px;margin:0 0 0 20px;padding:0px 0 17px 0;">Fix</button>'+
					'	</p> '+
					'	<p style="margin: 18px 0pt 0pt 40px; color: white; font-size: 12px;">Note: In order to fix this error for good, it would help if you could post to the '+
					'	greasemonkey thread and describe what you were doing before the error occured.</p>'+
					'</div>');
					
	$('#fixtrack').mouseup(function(){

		$('#wlrAlert').remove();
		
		window.setTimeout(function(){
		
			var getV = GM_getValue('lastRead0');
			
			var tttest = getV.substr(getV.indexOf(',')+1);
			
			GM_setValue('lastRead0', tttest);

		}, 0);		
	
	});
					
}

/**check if threadnumber is in gm storage***/

function checkIfPrev(tn){

	var ofTheMac, checkForAmp;
	var cLR = GM_getValue('lastRead0');

	if(cLR){

		if(cLR.match(tn) ){

			var clrThis = cLR.split(',');
			
			clrThis.pop();

			for(var u =0;u<clrThis.length;u++){

				checkForAmp = clrThis[u].split('t=')[1].split('&')[0].split('#')[0];

				if( checkForAmp == tn ){

					ofTheMac = clrThis[u];
					
					break;

				}	

			}

		}
		else{
		
			ofTheMac = 'newThread';
		
		}
				
	}
	else{
	
		ofTheMac = 'newCookie';
	
	}

	return ofTheMac;

}


var numTotrack, bcg, hpc, jtbgc, nptc, nojtbgc, nnptc, lbox, flip, setSplit;

if(GM_getValue('wlrSettings0')){

	setSplit = GM_getValue('wlrSettings0').split(',');
	
	numTotrack = setSplit[0];
	bcg = setSplit[1];
	hpc = setSplit[2];
	jtbgc = setSplit[3];
	nptc = setSplit[4];
	nojtbgc = setSplit[5];
	nnptc = setSplit[6];
	lbox = setSplit[7];
	flip = setSplit[8];
	(setSplit.length < 10)? nostick = 'false': nostick = setSplit[9];
	(setSplit.length < 11)? noColourEnd = 'false': noColourEnd = setSplit[10];
	(setSplit.length < 12)? scrollTo = 'false': scrollTo = setSplit[11];

}
else{

	numTotrack = '1000';
	bcg = '#CFCBBC';
	hpc = 'false';
	jtbgc = "#95b0cb";
	nptc = 'false';
	nojtbgc = "#cbc095";
	nnptc = 'false';
	lbox = 'false';
	flip = 'false';
	nostick = 'false';
	noColourEnd = 'false';
	scrollTo = 'false';
	
	GM_setValue('wlrSettings0', '1000,#CFCBBC,false,#95b0cb,false,#cbc095,false,false,false,false,false');
}

// Erwin change
//$('#menu_forum ul').append('<li><a href="http://forums.whirlpool.net.au/wiki/?tag=wlr">WLR</a></li>');

if(dUrl.indexOf('wiki/?tag=whirlpool_plus') > -1){
// Erwin
	/********
	Colour Picker Code - http://acko.net/dev/farbtastic
	***********/
	// $Id: farbtastic.js,v 1.2 2007/01/08 22:53:01 unconed Exp $
	// Farbtastic 1.2
	jQuery = unsafeWindow.jQuery;
	jQuery.fn.farbtastic = function (callback) {
	  $.farbtastic(this, callback);
	  return this;
	};

	jQuery.farbtastic = function (container, callback) {
	  var container = $(container).get(0);
	  return jQuery._farbtastic(container, callback);
	  
	  //return container.farbtastic || ( container.farbtastic = new jQuery._farbtastic(container, callback));	  
	  
	}

	jQuery._farbtastic = function (container, callback) {
	  // Store farbtastic object
	  var fb = this;

	  // Insert markup
	  $(container).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');
	  var e = $('.farbtastic', container);
	  fb.wheel = $('.wheel', container).get(0);
	  // Dimensions
	  fb.radius = 84;
	  fb.square = 100;
	  fb.width = 194;

	  // Fix background PNGs in IE6
	  if (navigator.appVersion.match(/MSIE [0-6]\./)) {
	    $('*', e).each(function () {
	      if (this.currentStyle.backgroundImage != 'none') {
	        var image = this.currentStyle.backgroundImage;
	        image = this.currentStyle.backgroundImage.substring(5, image.length - 2);
	        $(this).css({
	          'backgroundImage': 'none',
	          'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
	        });
	      }
	    });
	  }

	  /**
	   * Link to the given element(s) or callback.
	   */
	  fb.linkTo = function (callback) {
	    // Unbind previous nodes
	    if (typeof fb.callback == 'object') {
	      $(fb.callback).unbind('keyup', fb.updateValue);
	    }

	    // Reset color
	    fb.color = null;

	    // Bind callback or elements
	    if (typeof callback == 'function') {
	      fb.callback = callback;
	    }
	    else if (typeof callback == 'object' || typeof callback == 'string') {
	      fb.callback = $(callback);
	      fb.callback.bind('keyup', fb.updateValue);
	      if (fb.callback.get(0).value) {
	        fb.setColor(fb.callback.get(0).value);
	      }
	    }
	    return this;
	  }
	  fb.updateValue = function (event) {
	    if (this.value && this.value != fb.color) {
	      fb.setColor(this.value);
	    }
	  }

	  /**
	   * Change color with HTML syntax #123456
	   */
	  fb.setColor = function (color) {
	    var unpack = fb.unpack(color);
	    if (fb.color != color && unpack) {
	      fb.color = color;
	      fb.rgb = unpack;
	      fb.hsl = fb.RGBToHSL(fb.rgb);
	      fb.updateDisplay();
	    }
	    return this;
	  }

	  /**
	   * Change color with HSL triplet [0..1, 0..1, 0..1]
	   */
	  fb.setHSL = function (hsl) {
	    fb.hsl = hsl;
	    fb.rgb = fb.HSLToRGB(hsl);
	    fb.color = fb.pack(fb.rgb);
	    fb.updateDisplay();
	    return this;
	  }

	  /////////////////////////////////////////////////////

	  /**
	   * Retrieve the coordinates of the given event relative to the center
	   * of the widget.
	   */
	  fb.widgetCoords = function (event) {
	    var x, y;
	    var el = event.target || event.srcElement;
	    var reference = fb.wheel;

	    if (typeof event.offsetX != 'undefined') {
	      // Use offset coordinates and find common offsetParent
	      var pos = { x: event.offsetX, y: event.offsetY };

	      // Send the coordinates upwards through the offsetParent chain.
	      var e = el;
	      while (e) {
	        e.mouseX = pos.x;
	        e.mouseY = pos.y;
	        pos.x += e.offsetLeft;
	        pos.y += e.offsetTop;
	        e = e.offsetParent;
	      }

	      // Look for the coordinates starting from the wheel widget.
	      var e = reference;
	      var offset = { x: 0, y: 0 }
	      while (e) {
	        if (typeof e.mouseX != 'undefined') {
	          x = e.mouseX - offset.x;
	          y = e.mouseY - offset.y;
	          break;
	        }
	        offset.x += e.offsetLeft;
	        offset.y += e.offsetTop;
	        e = e.offsetParent;
	      }

	      // Reset stored coordinates
	      e = el;
	      while (e) {
	        e.mouseX = undefined;
	        e.mouseY = undefined;
	        e = e.offsetParent;
	      }
	    }
	    else {
	      // Use absolute coordinates
	      var pos = fb.absolutePosition(reference);
	      x = (event.pageX || 0*(event.clientX + $('html').get(0).scrollLeft)) - pos.x;
	      y = (event.pageY || 0*(event.clientY + $('html').get(0).scrollTop)) - pos.y;
	    }
	    // Subtract distance to middle
	    return { x: x - fb.width / 2, y: y - fb.width / 2 };
	  }

	  /**
	   * Mousedown handler
	   */
	  fb.mousedown = function (event) {
	    // Capture mouse
	    if (!document.dragging) {
	      $(document).bind('mousemove', fb.mousemove).bind('mouseup', fb.mouseup);
	      document.dragging = true;
	    }

	    // Check which area is being dragged
	    var pos = fb.widgetCoords(event);
	    fb.circleDrag = Math.max(Math.abs(pos.x), Math.abs(pos.y)) * 2 > fb.square;

	    // Process
	    fb.mousemove(event);
	    return false;
	  }

	  /**
	   * Mousemove handler
	   */
	  fb.mousemove = function (event) {
	    // Get coordinates relative to color picker center
	    var pos = fb.widgetCoords(event);

	    // Set new HSL parameters
	    if (fb.circleDrag) {
	      var hue = Math.atan2(pos.x, -pos.y) / 6.28;
	      if (hue < 0) hue += 1;
	      fb.setHSL([hue, fb.hsl[1], fb.hsl[2]]);
	    }
	    else {
	      var sat = Math.max(0, Math.min(1, -(pos.x / fb.square) + .5));
	      var lum = Math.max(0, Math.min(1, -(pos.y / fb.square) + .5));
	      fb.setHSL([fb.hsl[0], sat, lum]);
	    }
	    return false;
	  }

	  /**
	   * Mouseup handler
	   */
	  fb.mouseup = function () {
	    // Uncapture mouse
	    $(document).unbind('mousemove', fb.mousemove);
	    $(document).unbind('mouseup', fb.mouseup);
	    document.dragging = false;
	  }

	  /**
	   * Update the markers and styles
	   */
	  fb.updateDisplay = function () {
	    // Markers
	    var angle = fb.hsl[0] * 6.28;
	    $('.h-marker', e).css({
	      left: Math.round(Math.sin(angle) * fb.radius + fb.width / 2) + 'px',
	      top: Math.round(-Math.cos(angle) * fb.radius + fb.width / 2) + 'px'
	    });

	    $('.sl-marker', e).css({
	      left: Math.round(fb.square * (.5 - fb.hsl[1]) + fb.width / 2) + 'px',
	      top: Math.round(fb.square * (.5 - fb.hsl[2]) + fb.width / 2) + 'px'
	    });

	    // Saturation/Luminance gradient
	    $('.color', e).css('backgroundColor', fb.pack(fb.HSLToRGB([fb.hsl[0], 1, 0.5])));

	    // Linked elements or callback
	    if (typeof fb.callback == 'object') {
	      // Set background/foreground color
	      $(fb.callback).css({
	        backgroundColor: fb.color,
	        color: fb.hsl[2] > 0.5 ? '#000' : '#fff'
	      });

	      // Change linked value
	      $(fb.callback).each(function() {
	        if (this.value && this.value != fb.color) {
	          this.value = fb.color;
	        }
	      });
	    }
	    else if (typeof fb.callback == 'function') {
	      fb.callback.call(fb, fb.color);
	    }
	  }

	  /**
	   * Get absolute position of element
	   */
	  fb.absolutePosition = function (el) {
	    var r = { x: el.offsetLeft, y: el.offsetTop };
	    // Resolve relative to offsetParent
	    if (el.offsetParent) {
	      var tmp = fb.absolutePosition(el.offsetParent);
	      r.x += tmp.x;
	      r.y += tmp.y;
	    }
	    return r;
	  };

	  /* Various color utility functions */
	  fb.pack = function (rgb) {
	    var r = Math.round(rgb[0] * 255);
	    var g = Math.round(rgb[1] * 255);
	    var b = Math.round(rgb[2] * 255);
	    return '#' + (r < 16 ? '0' : '') + r.toString(16) +
	           (g < 16 ? '0' : '') + g.toString(16) +
	           (b < 16 ? '0' : '') + b.toString(16);
	  }

	  fb.unpack = function (color) {
	    if (color.length == 7) {
	      return [parseInt('0x' + color.substring(1, 3)) / 255,
	        parseInt('0x' + color.substring(3, 5)) / 255,
	        parseInt('0x' + color.substring(5, 7)) / 255];
	    }
	    else if (color.length == 4) {
	      return [parseInt('0x' + color.substring(1, 2)) / 15,
	        parseInt('0x' + color.substring(2, 3)) / 15,
	        parseInt('0x' + color.substring(3, 4)) / 15];
	    }
	  }

	  fb.HSLToRGB = function (hsl) {
	    var m1, m2, r, g, b;
	    var h = hsl[0], s = hsl[1], l = hsl[2];
	    m2 = (l <= 0.5) ? l * (s + 1) : l + s - l*s;
	    m1 = l * 2 - m2;
	    return [this.hueToRGB(m1, m2, h+0.33333),
	        this.hueToRGB(m1, m2, h),
	        this.hueToRGB(m1, m2, h-0.33333)];
	  }

	  fb.hueToRGB = function (m1, m2, h) {
	    h = (h < 0) ? h + 1 : ((h > 1) ? h - 1 : h);
	    if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
	    if (h * 2 < 1) return m2;
	    if (h * 3 < 2) return m1 + (m2 - m1) * (0.66666 - h) * 6;
	    return m1;
	  }

	  fb.RGBToHSL = function (rgb) {
	    var min, max, delta, h, s, l;
	    var r = rgb[0], g = rgb[1], b = rgb[2];
	    min = Math.min(r, Math.min(g, b));
	    max = Math.max(r, Math.max(g, b));
	    delta = max - min;
	    l = (min + max) / 2;
	    s = 0;
	    if (l > 0 && l < 1) {
	      s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
	    }
	    h = 0;
	    if (delta > 0) {
	      if (max == r && max != g) h += (g - b) / delta;
	      if (max == g && max != b) h += (2 + (b - r) / delta);
	      if (max == b && max != r) h += (4 + (r - g) / delta);
	      h /= 6;
	    }
	    return [h, s, l];
	  }

	  // Install mousedown handler (the others are set on the document on-demand)
	  $('*', e).mousedown(fb.mousedown);

	    // Init color
	  fb.setColor('#000000');

	  // Set linked elements/callback
	  if (callback) {
	    fb.linkTo(callback);
	  }
	}

	/************
	end colour picker code
	*******************/
	
	
	
	GM_addStyle(".farbtastic {"+
	 " position: absolute;"+
	"}"+
	".farbtastic * {"+
	"  position: absolute;"+
	"  cursor: crosshair;"+
	"}"+
	".farbtastic, .farbtastic .wheel {"+
	"  width: 195px;"+
	"  height: 195px;"+
	"}"+
	".farbtastic .color, .farbtastic .overlay {"+
	"  top: 47px;"+
	"  left: 47px;"+
	"  width: 101px;"+
	"  height: 101px;"+
	"}"+
	".farbtastic .wheel {"+
	"  background: url(http://img.photobucket.com/albums/v215/thegooddale/wheel.png) no-repeat;"+
	"  width: 195px;"+
	"  height: 195px;"+
	"}"+
	".farbtastic .overlay {"+
	"  background: url(http://img.photobucket.com/albums/v215/thegooddale/mask.png) no-repeat;"+
	"}"+
	".farbtastic .marker {"+
	"  width: 17px;"+
	"  height: 17px;"+
	"  margin: -8px 0 0 -8px;"+
	"  overflow: hidden; "+
	"  background: url(http://img.photobucket.com/albums/v215/thegooddale/marker.png) no-repeat;"+
	"}	"+
	"#cPick{"+
	"	position:relative;	"+
	"	width:200px;"+
	"}"+
	"#colorpicker{"+
	"	background-color:transparent !important;"+
	"}"+
	"#toggleC{"+	
		"color:green;"+
		"font-size:10px;"+
		"opacity:0.5;"+
		"position:relative;"+
		"text-decoration:underline;"+
		"top:5px;"+
	"}"+
	"#resetWLR {"+
	"font-size:10px;"+
	"padding:0;"+
	"width:60px;"+
	"float:left;"+
	"}"+
	"#saveWLR {"+
	"height:58px;"+
	"padding:0;"+
	"width:80px;"+
	"margin-left:20px;"+
	"}"	);	


	var iHazSettinz = '<p>Default Settings Are Enabled</p>';

	if(setSplit){
	
		iHazSettinz = '';
	
	}

	$('#breadcrumb').after('<div id="wlrSettings" style="position:relative;background:#EEEEEE;border:1px solid grey;'+
						'margin:0.5em 0.5em 3em 0.5em;padding:2em 3em; z-index:3;">'+
						'<h2 style="border-bottom:1px dashed #888888;font-family:Arial,sans-serif;margin:0pt 0pt 0.6em;padding:0pt 0pt 0.2em;">Last Read Settings</h2>'+
						iHazSettinz+
						'<p>Number Of Threads To Track:'+
						'	<select selected="'+numTotrack+'" name="wlrsetts">'+
						'		<option value="300">300</option>'+
						'		<option value="500">500</option>'+
						'		<option value="1000">1000</option>'+
						'		<option value="2000">2000</option>'+
						'		<option value="5000">5000</option>'+
						'	</select>'+
						'</p>'+
						'<p>Highlighted Posts Colour:'+
						'	<input type="text" size="7" id="lighted" value="'+bcg+'" name="wlrsetts"/>'+
						'	<a class="wReset" style="margin-left:40px;color:green;text-decoration:underline;" href="#">reset</a>'+
						'	<input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+hpc+'"><span style="opacity:0.5;font-size:10px;">&nbsp;disable colouring</span>'+
						'	<div class="showColourPicker" style="height:22px;width:22px;background:'+bcg+';position:relative;margin:-35px 0 0 230px">'+
						'	</div>'+
						'</p>'+
						'<p>New Posts Thread Colour:'+
						'	<input type="text" size="7" id="last" name="wlrsetts" value="'+jtbgc+'" />'+
						'	<a class="wReset" style="margin-left:40px;color:green;text-decoration:underline;" href="#">reset</a>'+
						'	<input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+nptc+'"><span style="opacity:0.5;font-size:10px;">&nbsp;disable colouring</span>'+
						'	<div class="showColourPicker" style="height:22px;width:22px;background:'+jtbgc+';position:relative;margin:-35px 0 0 230px">'+
						'	</div>						'+
						'</p>'+
						'<p>No New Posts Thread Colour:'+ 
						'	<input type="text" size="7" id="nolast" name="wlrsetts" value="'+nojtbgc+'" />'+
						'	<a class="wReset" style="margin-left:40px;color:green;text-decoration:underline;" href="#">reset</a>'+
						'	<input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+nnptc+'"><span style="opacity:0.5;font-size:10px;">&nbsp;disable colouring</span>'+
						'	<div class="showColourPicker" style="height:22px;width:22px;background:'+nojtbgc+';position:relative;margin:-35px 0 0 250px">'+
						'	</div>						'+
						'</p>'+	
						'<a id="toggleC" href="#">Show Colour Picker</a>'+
						'<div id="toggleColourP" style="display:none;width:200px;height:225px;position:absolute;border:grey 3px solid;background-color:#EEEEEE;z-index:5;"><form id="cPick"><input type="text" id="color" name="color" value="#123456" /></form>'+
						'<div id="colorpicker"></div></div><br />		<br/>	'+
						'<p><input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+lbox+'"><span style="opacity:0.5;font-size:10px;">&nbsp;only colour end square</span>&nbsp;&nbsp;<img src="http://img.photobucket.com/albums/v215/thegooddale/noneread.gif" /></p>'+						
						'<p><input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+flip+'"><span style="opacity:0.5;font-size:10px;">&nbsp;style flip&nbsp;&nbsp; (Colours unread posts in threads rather than read posts)</span>'+
						'<p><input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+nostick+'"><span style="opacity:0.5;font-size:10px;">&nbsp;don\'t track sticky threads</span></p>'+																		
						'<p><input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+noColourEnd+'"><span style="opacity:0.5;font-size:10px;">&nbsp;don\'t colour end square</span></p>'+																								
						'<p><input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+scrollTo+'"><span style="opacity:0.5;font-size:10px;">&nbsp;scroll to anchor after page load</span></p>'+																														
						'</p>'+
						'<br/><br/><button id="resetWLR">Reset Settings To Default Values</button>&nbsp;<button id="saveWLR">Save</button>				'+
						'<span id="changesSaved" style="color:green;margin-left:20px;display:none;">Changes Saved</span>'+
						'</div>');	
						
	
	$('#colorpicker').farbtastic('#color');

	$('.wReset').one("click", function(){
	
		var va;
		var tPrev = $(this).prev();
	
		if(tPrev.attr('id') == 'lighted'){
		
			va = '#CFCBBC';
		}
		else if(tPrev.attr('id') == 'last'){
		
			va = "#95b0cb";
		
		}
		else if(tPrev.attr('id') == 'nolast'){
		
			va = "#cbc095";
		
		}
	
		tPrev.val(va);
		
		tPrev.parent().next().css('background', va);
		
		return false;
	
	});
	
	$('#wlrSettings input[@type="text"]').bind("click mouseup blur keyup input", function() {	

		var wlrSetThis = $(this);
	
		var colourDiv = $(this).parent().next();
		
		colourDiv.css('background', wlrSetThis.val())
		
	});

	$('#toggleC').click(function(evt){

	// Erwin change
		var eY = 70;
		var eX = 400;	
	// Erwin
		
		($(this).text() == 'Show Colour Picker')?$(this).text('Hide Colour Picker') : $(this).text('Show Colour Picker');
		
		$('#toggleColourP').toggle().css({"left": eX, "top": eY});
		
		return false;
	
	});
	
	var wI = document.getElementsByName('wlrsetts');
	
	$(wI).each(function(q){

		if((wI[q].type == "checkbox") && (setSplit[q] == 'true')){
		
			wI[q].checked = true;
		
		}
		else if(wI[q].type == "select-one"){
		
			wI[q].value = setSplit[q];
		
		}
	
	});	
	
	document.getElementById('saveWLR').addEventListener('mouseup', function(){

		var tAr = [];

		$(wI).each(function(i){
		
			var toPush;
		
			(wI[i].type == "checkbox")?toPush=wI[i].checked: toPush=wI[i].value;
		
			tAr.push(toPush);
		
		});
		if(tAr[0] < setSplit[0] && GM_getValue("lastRead0").split(',').length > tAr[0]){

			var getLR2split = GM_getValue("lastRead0").split(',')[tAr[0]];
			
			var getLR2split2 = GM_getValue("lastRead0").split(getLR2split+',')[1];
		
			GM_setValue("lastRead0", getLR2split2);

		}
		
		GM_setValue('wlrSettings0', tAr.toString());
		
		$('#changesSaved').fadeIn(1000).fadeOut(2000);
		
	}, false);
	
	document.getElementById('resetWLR').addEventListener('mouseup', function(){
	
		GM_setValue('wlrSettings0', '1000,#CFCBBC,false,#95b0cb,false,#cbc095,false,false,false');
		
		$('#changesSaved').fadeIn(1000).fadeOut(2000);
	
	}, false);

}



/*******run on forum-threads.cfm page********/
	
if((dUrl.indexOf('threads') > -1) || (dUrl.indexOf('user') > -1)){

	var stupidimages, stupidAtags, lazyFuckers = 'newread', lazyFuckers2 = "nonewread";

	var durM = dUrl.match('user');
	
	var userLink = $('#left .userinfo dt a span').text();
	
	if(	nptc == 'true'){
	
		lazyFuckers = 'lazyFuckers';
	
	}
	if(nnptc == 'true'){
	
		lazyFuckers2 = 'lazyFuckers';
	
	}

													
	if(durM){

		stupidimages = $("td.goend>a");

	}
	else{
	
		stupidimages = $("a[@title='Jump to last post']"); 
		
	}
	
	GM_addStyle("#threads table tbody tr.newread td{background:"+jtbgc+" url(http://img.photobucket.com/albums/v215/thegooddale/generic-gradient6.png) !important}"+
				"#threads table tbody tr.nonewread td{background:"+nojtbgc+" url(http://img.photobucket.com/albums/v215/thegooddale/generic-gradient6.png) !important}"+
				".stopTrack{"+
					"border-bottom-color:grey;"+
					"border-bottom-style:dashed;"+
					"border-bottom-width:1px;"+
					"float:left;"+
					"margin-top:-5px;"+
					"margin-left:-14px;"+
					"opacity:0.3;"+			
				"}			"+	
				".markRead{"+
					"float:right;"+
					"opacity:0.3;"+
					"border-bottom-color:grey;"+
					"border-bottom-style:dashed;"+
					"border-bottom-width:1px;"+	
					"margin-top:-5px;"+					
				"}"+
				".wlrx{"+
				"	position:absolute;"+
				"	font-size:9px !important;"+
				"	width:95px;		"+		
				"}");

	for(var z=0;z<stupidimages.length;z++){

		var jThis = $(stupidimages[z]);
		var checkClass = jThis.parent().parent()[0].className.match('sticky');

		if(nostick == 'true' && checkClass){

			continue;
		
		}
		else{

		var jumpThreadNum = stupidimages[z].href.split('t=')[1].split('&')[0].split('#')[0];
		var tCheck = checkIfPrev(jumpThreadNum);
			var lastPoster, postedInColour;
			var postedin = false, jThisParent = jThis.parent();
				
		
		if(tCheck != 'newCookie' && tCheck != 'newThread'){
		
			var cookArrThreadNum = tCheck.split('t=')[1].split('&')[0].split('#')[0];
			
			if(durM){
			
				stupidAtags = Number(jThis.parent().prev().prev().text());
				lastPoster = jThis.parent().prev().find('b').text();

					if(jThisParent[0].style.backgroundColor == "rgb(226, 208, 187)"){
					
						postedin = true;
						postedInColour = "background-image: url(http://forums.whirlpool.net.au/img/forum/grad-morange.gif) !important; background-color: #E2C6A8 !important;";
					
					}					

			}
			else{
			
				stupidAtags = Number(jThis.parent().prev().prev().prev().prev().text()); 
				lastPoster = jThis.parent().prev().find('a').text();
			
					if(jThisParent[0].style.backgroundColor == "rgb(192, 180, 167)"){
					
						postedin = true;
						postedInColour = "background-color: #C2B7AA !important;";
					
					}					
				
			}
				
			
            var replyNum = stupidAtags+1;

			if( jumpThreadNum == cookArrThreadNum ){
			
					var tholdpare = jThisParent.parent();

				if( (tCheck.split('#r')[1]< replyNum) && (replyNum > 1) && (lastPoster != userLink)){
				
						if( lbox == 'true' && nptc == 'false' ){
					
						lazyFuckers = 'lazyFuckers';
					
							jThisParent.attr("style", "background:"+jtbgc+" url(http://img.photobucket.com/albums/v215/thegooddale/generic-gradient6.png) !important");
						
					}

					var newpostsTitle = replyNum - tCheck.split('#r')[1]+' new posts';
					
					jThis.attr('href', '/forum-replies.cfm?'+tCheck).attr('title', 'Jump to last read post');
						tholdpare.attr("class", lazyFuckers).children('td.reps:first').attr('title', newpostsTitle).prepend('<span attcheat="'+jumpThreadNum+
							','+tCheck+','+replyNum+'" class="small wlrx"><a '+
						'href="# title="Stop Tracking Thread" class="stopTrack">S</a>'+
							'<a href="#" title="Mark All Posts As Read" class="markRead">M</a>'+	
						'</span>');
				
				}
				else{
					if(!tholdpare.hasClass("pointer") ){
					
							if( lbox == 'true' && nnptc == 'false' ){
						
							lazyFuckers2 = 'lazyFuckers2';
						
								jThisParent.attr("style", "background:"+nojtbgc+" url(http://img.photobucket.com/albums/v215/thegooddale/generic-gradient6.png) !important");
							
						}					
					
						tholdpare.attr("class", lazyFuckers2).children('td.reps:first').prepend('<span attcheat="'+jumpThreadNum+','+replyNum+'" class="small wlrx">'+
						'<a href="#" title="Stop Tracking Thread" class="stopTrack">S</a>'+	
							'</span>');
					
					}
					
				}
					if(lbox == 'false' && noColourEnd == 'true' && postedin){
					
						jThisParent.attr('style', postedInColour+' !important;');
						
					}					
			
			}
		
		}

	}
	
	}
	
	/***stop tracking thread***/
	
	var awhof = $('.stopTrack, .markRead');
	
	for(var d=0;d<awhof.length;d++){	
	
		awhof[d].addEventListener('click', function(e){
		
			e.preventDefault();
	
			var mehThis = $(this);
			var mehThisParent = mehThis.parent();
			var aSP = mehThisParent.attr('attcheat').split(',');
			var stRem = GM_getValue("lastRead0");
			var wholeThreadNum = stRem.slice( stRem.indexOf(aSP[0]), stRem.indexOf( ',', stRem.indexOf(aSP[0])) );
			var getLastTD = mehThisParent.parent().parent().children('td:last');
			var wholeReplace, setReadAll;		
			
			if(mehThis.hasClass("stopTrack")){
			
				wholeReplace = stRem.replace("t="+wholeThreadNum+",","");

				GM_setValue("lastRead0", wholeReplace);	
				
				getLastTD.removeAttr("style");

				mehThisParent.parent().parent().removeClass("newread nonewread");
			
			}
			else{
			
				var pageNo = '&p=1';

				var getLastPage = mehThisParent.parent().prev().prev().children('span.small').children('a:last')
				
				if(getLastPage[0]){
				
					pageNo = '&p='+getLastPage[0].href.split('&p=')[1]; 
				
				}

				if(wholeThreadNum.indexOf('&')>-1){
				
					setReadAll = wholeThreadNum.split('&')[0]+pageNo.split('#r')[0]+'#r'+aSP[2];
				
				}
				else{

					setReadAll = wholeThreadNum.split('#r')[0]+'#r'+aSP[2];
				
				}

				wholeReplace = stRem.replace(wholeThreadNum, setReadAll);

				GM_setValue("lastRead0", wholeReplace);	
				
				getLastTD.attr("style", "background:"+nojtbgc+" url(http://img.photobucket.com/albums/v215/thegooddale/generic-gradient6.png) !important");

				mehThisParent.parent().parent().removeClass("newread").attr("class", lazyFuckers2);

			}

			mehThis.remove();

			return false;
		

		}, false);
	
	}
	
	
}	

/*******run on forum-replies page********/

// Erwin
if(dUrl.indexOf('replies') > -1 && dUrl.indexOf('t=') > -1) {
// Erwin

	var lastReadLink;
	var yOff = (window.pageYOffset+window.innerHeight);
	var threadNumber = dUrl.split('t=')[1].split('&')[0].split('#')[0];
	var anchorArrRev = $('a[@title$=specific post]');
		
	function hazRead(rN, eType){

		if(Number(anchorArrRev.eq(anchorArrRev.length-1)[0].href.split('#r')[1]) <= Number(rN) && (eType != 'new') && (hpc == 'false')&&(flip == 'false')){ //if the last link on the page is lower than what already read up to

			GM_addStyle(".bodypost{background:"+bcg+" !important}");

			return 'noNew';
		
		}
		else{
		
			anchorArrRev.each(function(i){	
			
			var h = $(this).attr('href');

				var curtop = 0;
				var t = this;
				curtop = t.offsetTop;
				
				for(t!== null;t=t.offsetParent;){  //http://www.quirksmode.org/blog/archives/2008/01/using_the_assig.html

				    curtop += t.offsetTop;

				}			
				if(i === 0){ 

					/*if( (hpc =='false') && (flip == 'false') ){//always colour and grab the first link just in case first thread post is bigger than viewable area
					
						$(this).parent().parent().css('background', bcg+' !important');
						
					}*/
					lastReadLink = this.href;

				}
				if( (flip == 'false') && ((Number(h.slice(h.lastIndexOf('#r')+2))) < Number(rN)) && (eType == 'load') && (hpc == 'false')){

					$(this).parent().parent().css('background', bcg);

				}		
				else if( (flip == 'true') && ((Number(h.slice(h.lastIndexOf('#r')+2))) > Number(rN)) && (eType == 'load') && (hpc == 'false')){

					$(this).parent().parent().css('background', bcg);
				
				}				
				if( curtop < yOff ){

					lastReadLink = this.href;
					
				}


			});

			return 't='+lastReadLink.split('t=')[1];
		
		}

	}
	
	window.addEventListener('scroll', function() {

			if((window.pageYOffset+window.innerHeight) > yOff){

				yOff = (window.pageYOffset+window.innerHeight);

			}

	}, false);	
	
	window.addEventListener('load', function(){

			var loadCheck = checkIfPrev(threadNumber);

			if(loadCheck != 'newThread' && loadCheck != 'newCookie'){

				hazRead(loadCheck.slice(loadCheck.lastIndexOf('#r')+2), 'load');
			
			}

	}, false);	
	
	
	window.addEventListener('unload', function(){

			var cP = checkIfPrev(threadNumber);
			var returnedLink;
			
			if( cP == 'newThread') {
			
				returnedLink = hazRead(0, 'unload');
			
				var getLR2splitCheck = GM_getValue("lastRead0").split(',');
			
				if(getLR2splitCheck.length < Number(numTotrack)) {
			
					GM_setValue("lastRead0", GM_getValue('lastRead0')+returnedLink+",");
				
				}
				else{
				
					var sliceFirstTrack = GM_getValue("lastRead0");
					
					var sliceFirstTrack2 = sliceFirstTrack.substr(sliceFirstTrack.indexOf(',')+1)+returnedLink+",";
				
					GM_setValue("lastRead0", sliceFirstTrack2);				
				
				}

			}			
			else if(cP == 'newCookie'){
			
					returnedLink = hazRead(0, 'unload');
			
					GM_setValue("lastRead0", returnedLink+",");
			
			}
			else{
			
				var checkSplit = cP.slice(cP.lastIndexOf('#r')+2);
				returnedLink = hazRead(checkSplit, 'unload');

				if( (returnedLink !='noNew')&& ( Number(returnedLink.slice(returnedLink.lastIndexOf('#r')+2)) > Number(checkSplit) ) ){

					var repREturned = GM_getValue("lastRead0").replace(cP,returnedLink);

					GM_setValue("lastRead0", repREturned);

				}

			}
			//unsafeWindow.console.log(GM_getValue("lastRead0"));
	}, false);

	if(dUrl.indexOf('#')>-1 && scrollTo == 'true' && !dUrl.match('bottom')){
		
		window.setTimeout(function(){

			var an = '#'+dUrl.split('#')[1];
			var a = $('a[@href$='+an+']');
			var avatarCheck = a.parent().parent().prev().prev().find('a:first').height();

			if(avatarCheck>30){

				$.scrollTo(a, 500, {offset:-150});
				
			}
			else{
			
				$.scrollTo(a, 500);
			
			}

		
		}, 1000);

	}
	
}


}

// JB Inline Images and Videos

function $p(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
  function injectGoogleVid() {
	$p('//a[contains(@href, "http://video.google.com/videoplay?docid=")]').forEach(function(gv) {
      var lnk=gv.href.replace(/videoplay\?docid=/, 'googleplayer.swf?docId=')+'&hl=en';
      var span=document.createElement("SPAN");
      span=gv.parentNode.insertBefore(span, gv.nextSibling);
      span.innerHTML='<embed style="width:400px; height:326px;" '+
                     'type="application/x-shockwave-flash" '+
                     'src="'+lnk+'"></embed>';
    });
  }
  function injectYouTube() {
	$p('//a[contains(@href, "youtube.com/watch?v=")]').forEach(function(yt) {
      lnk=yt.href.replace(/watch\?v=/, 'v/') + '&hl=en&color1=0xD4CAC4&color2=0x78644F&border=1&fmt=18';
      var span=document.createElement("SPAN");
      span=yt.parentNode.insertBefore(span, yt.nextSibling);
      span.innerHTML='<object width="425" height="373">'+
                     '<param name="movie" value="'+lnk+
                     '"/><param name="wmode" value="transparent"/>'+
                     '<embed src="'+lnk+'" type="application/x-shockwave-flash" '+
                     'wmode="transparent" width="425" height="373"></embed></object>';
    });
  }
  var imagePadding=parseInt(GM_getValue("imagePadding", "12"));
  var maxHeight=parseInt(GM_getValue("maximumHeight", "300"));
  var youTubeX=GM_getValue("embedYoutube", "true");
  var youTube=(youTubeX=="true");
  var googleVidX=GM_getValue("embedGoogleVid", "true");
  var googleVid=(googleVidX=="true");
  var EventManager= {
    _registry: null,
    Initialise: function() {
      if (this._registry == null) {
        this._registry = [];
        EventManager.Add(window, "_unload", this.CleanUp);
      }
    },
    Add: function(obj, type, fn, useCapture) {
      this.Initialise();
      var realType=(type=="_unload"?"unload":type);
      if (typeof obj == "string")
        obj = document.getElementById(obj);
      if (obj == null || fn == null)
        return false;
      if(obj.addEventListener)
        obj.addEventListener(realType, fn, useCapture);
      this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
      return true;
    },
    CleanUp: function() {
      for (var i = 0; i < EventManager._registry.length; i++) {
        with(EventManager._registry[i]) {
          if(type=="unload") fn();
          if(obj.removeEventListener)
            obj.removeEventListener(type,fn,useCapture);
        }
      }
      EventManager._registry = null;
    }
  };
  var imageTable={};
  function clickImage(e) {
    var el=e.target;
    if(imageTable[el.id].width) {
      var cWidth=el.style.width;
      el.style.width=imageTable[el.id].width;
      imageTable[el.id].width=cWidth;
    }
    else if(imageTable[el.id].height) {
      var cHeight=el.style.height;
      el.style.height=imageTable[el.id].height;
      imageTable[el.id].height=cHeight;
    }
  }

  	if (imgL ==1){  
  function makeThumb(inX, inY, maxX, maxY) {
    var retVal={changed:false, widthChanged:false, heightChanged:false, width:inX, height:inY};
    if(inX>maxX || inY>maxY) {
      retVal.changed=true;
      var xRatio=1.0*inX/(1.0 * maxX);
      var yRatio=1.0*inY/(1.0 * maxY);
      if(yRatio>xRatio) {
        retVal.height=maxY;
        retVal.heightChanged=true;
        retVal.width=Math.ceil((1.0*inX)/yRatio);
      }
      else {
        retVal.width=maxX;
        retVal.widthChanged=true;
        retVal.height=Math.ceil((1.0*inY)/xRatio);
      }
    }
    return retVal;
  }
  	  		
    function addImageToImageAnchor(Anchor, Container, num) {
    var extensions=".jpeg.jpg.gif.png.bmp";
  	var href=Anchor.href.toLowerCase();
    var dot=href.lastIndexOf(".");
    if(dot >= 0 && extensions.indexOf(href.substr(dot)) >= 0) {
      var imgObj=document.createElement('IMG');
      EventManager.Add(imgObj,"load", function() {
        var div=document.createElement("DIV");
        var img=document.createElement("IMG");
        img=div.appendChild(img);
        img.style.border="none";
        img.style.padding="0";
        img.style.margin="0";
        var width;
        if(document.defaultView && document.defaultView.getComputedStyle)
          width=parseInt(document.defaultView.getComputedStyle(Container, '').getPropertyValue("width"));
        else
          width=Container.clientWidth-24;
        width=parseInt(width);
        width-=(imagePadding*2);
        var dimension=makeThumb(imgObj.width, imgObj.height, width, maxHeight);
        if(dimension.changed) {
          img.style.cursor="move";
          img.id=imgObj.alt;
          if(dimension.widthChanged) {
            img.style.width=dimension.width+"px";
            imageTable[img.id]={width:imgObj.width+"px"};
          }
          if(dimension.heightChanged) {
            img.style.height=dimension.height+"px";
            imageTable[img.id]={height:imgObj.height+"px"};
          }
          EventManager.Add(img, "click", clickImage, false);
          div.style.paddingLeft=imagePadding+"px";
          div.style.paddingRight=imagePadding+"px";
        }
        Anchor.parentNode.insertBefore(div, Anchor);
        img.src=imgObj.src;
      }, false);
      var id="addImage"+num;
      imgObj.alt=id;
      imgObj.src=Anchor.href;
    }
  }
}
  	
  function configImages(e) {
    var newDiv=document.getElementById("wimage_config");
    if(newDiv)
      return;
    newDiv=document.body.appendChild(document.createElement("DIV"));
    newDiv.style.position="absolute";
    //newDiv.style.display="-moz-stack";
    newDiv.style.top=(e.pageY-10)+"px";
    newDiv.style.left=(e.pageX-10)+"px";
    newDiv.style.zIndex="9999";
    newDiv.style.height="164px";
    newDiv.style.color="black";
    newDiv.id="wimage_config";
    newDiv=newDiv.appendChild(document.createElement("DIV"));
    newDiv.style.border="ridge 2px";
    newDiv.style.padding="10px";
    newDiv.style.backgroundColor="#ddddff";
    newDiv.appendChild(document.createTextNode("Image padding"));
    newDiv.appendChild(document.createElement("BR"));
    var inPadding=newDiv.appendChild(document.createElement("INPUT"));
    inPadding.type="text";
    inPadding.value=imagePadding;
    inPadding.id="wimage_padding";
    newDiv.appendChild(document.createElement("BR"));
    newDiv.appendChild(document.createTextNode("Maximum height"));
    newDiv.appendChild(document.createElement("BR"));
    var inHeight=newDiv.appendChild(document.createElement("INPUT"));
    inHeight.type="text";
    inHeight.value=maxHeight;
    inHeight.id="wimage_height";
    newDiv.appendChild(document.createElement("BR"));

    newDiv.appendChild(document.createTextNode("Inline youTube"));
    var inYouTube=newDiv.appendChild(document.createElement("INPUT"));
    inYouTube.type="checkbox";
    inYouTube.checked=youTube;
    inYouTube.id="wimage_youtube";
    newDiv.appendChild(document.createElement("BR"));

    newDiv.appendChild(document.createTextNode("Inline Google"));
    var inGoogleVid=newDiv.appendChild(document.createElement("INPUT"));
    inGoogleVid.type="checkbox";
    inGoogleVid.checked=googleVid;
    inGoogleVid.id="wimage_googlevid";
    newDiv.appendChild(document.createElement("BR"));

    newDiv.appendChild(document.createElement("BR"));
    var inClose=newDiv.appendChild(document.createElement("INPUT"));
    inClose.type="button";
    inClose.value="CANCEL";
    EventManager.Add(inClose, "click", function() {
      var div=document.getElementById("wimage_config");

      document.body.removeChild(div);
    }, false);
    var inSubmit=newDiv.appendChild(document.createElement("INPUT"));
    inSubmit.type="button";
    inSubmit.value="ACCEPT";
    EventManager.Add(inSubmit, "click", function() {
      var div=document.getElementById("wimage_config");
      var pad=document.getElementById("wimage_padding");
      var hgt=document.getElementById("wimage_height");
      var eyt=document.getElementById("wimage_youtube");
      var egv=document.getElementById("wimage_googlevid");
      var imagePadding=parseInt(pad.value);
      var maxHeight=parseInt(hgt.value);
      var youTube=eyt.checked;
      var googleVid=egv.checked;
      GM_setValue("imagePadding", imagePadding.toString());
      GM_setValue("maximumHeight", maxHeight.toString());
      GM_setValue("embedYoutube", youTube.toString());
      GM_setValue("embedGoogleVid", googleVid.toString());
      document.body.removeChild(div);
    }, false);
  }
  var imgNum=0;
  if (imgL ==1){
  $p(".//TD[@class='bodytext']", document.body).forEach(function(reply) {
    var links=reply.getElementsByTagName("A");
    Array.forEach(links, function(lnk) { addImageToImageAnchor(lnk, reply, imgNum++); });
  });
  var breadTask=document.evaluate(".//DIV[@class='foot_subs']",document.body,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue;
  if(!breadTask) breadTask=document.getElementById('breadcrumb_footer');
  if(breadTask) {
    var sw=breadTask.nodeName == 'DIV';
    var xconfig=breadTask.appendChild(document.createElement(sw?"SPAN":"LI"));
    var config=xconfig.appendChild(document.createElement("SPAN"));
	config.style.fontSize=sw?"0.85em":"0.55em";
    config.appendChild(document.createTextNode("{Images}"));
    xconfig.className="small";
    config.style.color="#000080";
    config.style.cursor="pointer";
    EventManager.Add(config, "click", configImages, false);
  }
	}

	if (inlinevideo ==1){
  if(youTube) injectYouTube();
  if(googleVid) injectGoogleVid();
}
	
// JB's Avatar Script for Meatsack and Yansky Avatar System (modified by Erwin)

if(avatar>0){

function $i(id) { // getById
	return document.getElementById(id);
}
function $x(p, c) { // xpath unordered nodes
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
function $xo(p, c) { // xpath ordered nodes
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}
function $xf(p, c) { // xpath single first node
	return document.evaluate(p, c || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function $xa(p, c) { // xpath single any node
	return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}
function $t(s) { // text node
	return document.createTextNode(s);
}
function $e(type, attributes) { // create Element
	var node = document.createElement(type);
	for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
		node.setAttribute(attr, attributes[attr]);
	}
	return node;
}
function $ed(element) { // delete Element
	element.parentNode.removeChild(element);
}
function $ea(newNode, node) { // insert element after
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}
function $eb(newNode, node) { // insert element before
	return node.parentNode.insertBefore(newNode, node);
}
function $ef(newNode, par) { // make element first child of par
	return par.insertBefore(newNode, par.firstChild);
}
function $el(newNode, par) { // make element last child of par
	return par.appendChild(newNode);
}
var $ev= {
	_registry: null,
	Initialise: function() {
		if (this._registry == null) {
			this._registry = [];
			$ev.Add(window, "_unload", this.CleanUp);
		}
	},
	Add: function(obj, type, fn, useCapture) {
		this.Initialise();
		var realType=(type=="_unload"?"unload":type);
		if (typeof obj == "string") obj = document.getElementById(obj);
		if (obj == null || fn == null) return false;
		if(obj.addEventListener) obj.addEventListener(realType, fn, useCapture);
		this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
		return true;
	},
	CleanUp: function() {
		for (var i = 0; i < $ev._registry.length; i++) {
			with($ev._registry[i]) {
				if(type=="unload") fn();
				if(obj.removeEventListener) obj.removeEventListener(type,fn,useCapture);
			}
		}
		$ev._registry = null;
	}
};
function addStyle(s, id, disable) {
	var e=$el($e('STYLE', { 'type' : 'text/css' }), document.getElementsByTagName('HEAD')[0]);
	if(id) e.id=id;
	$el($t(s), e);
	if(disable) e.disabled = 'disabled';
	return e;
}
var b=[
	"data:image/png;base64,",
	"iVBORw0KGgoAAAANSUhEUgAAABQAAAABCAYAAADeko4lAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gE",
	"FgoSD1eXcvUAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAO0lEQVQI1wXBsQGAIAwAsBSXwn3+fwZ0kZoE3gjV7YSo1mcYdd3iOXy1rNr2sda0",
	"dyIxGcnNCLNbCvMHhQEYTyMYKXEAAAAASUVORK5CYII="
].join('');
//GM_addStyle('@import "http://ideatriage.com/files/wlrtheme/rank/small/themex2.css";');
//GM_addStyle('@import "http://ideatriage.com/wlr/avatar/avatar.css";');
GM_addStyle('@import "http://goodbyepolar.com/wpavatars/avatar.css";');
GM_addStyle('tr td.bodyuser div:first-child > a:first-child {margin: 0 auto;}');
//GM_addStyle('TD.bodytext {vertical-align: top !important;}');
//GM_addStyle('#replies tr .bodyuser div div:last-child:before { padding:5px 0 0; }');
if(penaltyBox>0){GM_addStyle('tr.In_the_penalty_box > td.bodyuser {background-image:url('+b+')!important;background-repeat:repeat !important;');}
if(anim_avatar>0){addStyle('@import url(http://goodbyepolar.com/wpavatars/animatedavatar.css);');}

$x('//TD[@class="bodyuser"]/DIV[contains(@style,"color:")]').forEach(function(d) {
	d.parentNode.parentNode.className += " " + d.textContent.replace(/ /g, '_');
	d.appendChild(document.createElement('DIV'));
});
var u='/forum-user.cfm?id=';
$x('//TD[@class="bodyuser" or @class="bodyuser_u" or @class="bodyuser_r"]/DIV/A[contains(@href,"'+u+'")]').forEach(function(a) {
    var l=a.getAttribute('href');
    a.parentNode.parentNode.parentNode.className += " wlr_" + l.substr(l.indexOf(u)+u.length);
    var n=document.createElement('DIV');
    n.innerHTML='<A href="'+l+'"></A>';
    a.parentNode.parentNode.insertBefore(n, a.parentNode.parentNode.firstChild);
});
$x('//TD[@class="bodyuser_u" or @class="bodyuser_r"]').forEach(function(td) {
    td.className = 'bodyuser '+td.className;
});


}

// Erwin's Default Recent Activity Days

if(actdays != 3){

if(dU.indexOf('forum-user.cfm?id='+uId)>-1 && dU.indexOf('&days')<1){

window.location = dU+'&days='+actdays;

}

function $x(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}

$x('//a[contains(@href, "/forum-user.cfm?id=")][not(contains(@href, "days="))]').forEach(function(e) {
	e.setAttribute('href', e.getAttribute('href').replace(/cfm\?id=/, 'cfm?days='+actdays+'&id='));
});

}

// Yansky AJAX Quick Reply Box

	if (qBox == 1) {

var gottaPee, qqtArea, pReply = $('.foot_reply a');

if(pReply[0]){

	$.get(pReply[0].href, function(data){

	    gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];
	
	});

	var xDate = new Date();	

	var gF = xDate.getFullYear();
	var gM = xDate.getMonth()+1;
	//Stupid daylight savings
	var getTtex = $('.nav_item_time').text();
	var getHr = getTtex.slice(getTtex.indexOf(':')-2, getTtex.indexOf(':'));

	var dArr = [''+gM+'', ''+xDate.getDate()+'', ''+xDate.getMinutes()+'', ''+xDate.getSeconds()+''];

	for(var i=0;i<dArr.length;i++){

	    if(dArr[i].length == 1){

	        dArr[i] = '0'+dArr[i];

	    }

	}

	var currTime = gF+"-"+dArr[0]+"-"+dArr[1]+"+"+getHr+"%3A"+dArr[2]+"%3A"+dArr[3];	

	var theLastOfTheMohicanTableRows = $('#replies>table>tbody>tr:last');
	
	function postPost(textArtex, textOptions){

		$.ajax({
			type: "POST",
			url: pReply[0].href,
			data: "version=2&post2=post&form=too+right&tinkle="+gottaPee+"&"+ 		
			"poll_enabled=false&poll_choice_size=0&pasteheader=true&timestart=%7Bts+%27"+currTime+"%27%7D&"+
			"body="+encodeURIComponent(textArtex)+"&"+textOptions+
			"cliptemp=Paste+external+quotes+here",
			success: function(msg){
		

				if( (msg.indexOf('<th><a name="preview"></a>ERROR</th>') > -1) && (msg.indexOf('You are quoting significantly more words than you have written.') > -1)){

					$('#qqTooManyWords').css('display','block');
					
					$('#wordsOK').mouseup(function(){

						$('#qqTooManyWords').css('display','none');						
					
					});
					qqtArea.css('background','#E5E5E5 none no-repeat scroll 50% 50%');

				}
				else{
				
					var dloc = document.location;
					var dloch = dloc.href;

					if(lastP.attr('checked') && dloch.indexOf("&p=-1#bottom")<0){

						dloc = "http://forums.whirlpool.net.au/forum-replies.cfm?t="+dloch.split('t=')[1].split('&')[0]+"&p=-1#bottom";
					
					}
					else{
				
					qqtArea.css('background','#E5E5E5 none no-repeat scroll 50% 50%').val('');
				
					var removeS = msg.slice(msg.lastIndexOf('<tr id="'));
				
					$('#previewTR').remove();	
				
					theLastOfTheMohicanTableRows.after(removeS.split('</tr>')[0]+'</tr>');
				
				}

					window.setTimeout(function(){

						GM_setValue('textareraSave', '');

					}, 0);

				}
				
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){

				alert('something broke!  ==>'+XMLHttpRequest+textStatus+errorThrown);		

				qqtArea.val(GM_getValue('textareraSave'));	
				
			}


		});	

	}
	

	GM_addStyle('#qQuote{margin-top:20px;} #qqTextArea{background:#E5E5E5 none no-repeat scroll 50% 50%;border:1px solid gray;color:black;}'+
				'#qqpost{width: 150px; font-family: Arial; font-style: normal; font-variant: normal; font-weight: normal; font-size: 16px; '+
				'line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none;} '+
				'#qqpostclear{width: 150px; font-family: Arial; font-style: normal; font-variant: normal; font-weight: normal; font-size: 16px; '+
				'line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none;} '+				
				'#opInputs p{float:left;margin-left:5px;}'+
				'#qqWCPreview{border:solid 1px grey;cursor:default;float:left;height:18px;margin-right:-80px;padding:2px;width:80px;} '+
				'#qqPreview{display:none;text-align:left;padding:5px;background:#EEEEEE url(http://forums.whirlpool.net.au/img/forum/reply-eeeeee.gif) '+
				'repeat-x scroll center bottom;border:2px solid grey;margin-bottom:10px;width:60%;} '+
				'#qqTooManyWords{display:none;background-color:#E8B760;height:250px;position:absolute;width:100%;font-weight:bold;z-index:6;} '+
				'#aloader{display:none;}.qqwcodeButtons{font-size:0.9em;}');

	/*******whirlcode********/

	var whirlCode = { 	                
						qqqqwc_whirlBold :			{ encloseLeft : "[*", encloseRight  : "*]"},
						qqwc_whirlItalic :		{ encloseLeft : "[/", encloseRight  : "/]"},
						qqwc_whirlSingleQuote :	{ encloseLeft : "['", encloseRight  : "']"},
						qqwc_whirlDoubleQuote :	{ encloseLeft : "[\"", encloseRight  : "\"]"},
						qqwc_whirlQuote :			{ encloseLeft : "[+", encloseRight  : "+]"},
						qqwc_whirlSuperscript :	{ encloseLeft : "[^", encloseRight  : "^]"},
						qqwc_whirlSubscript :		{ encloseLeft : "[\\", encloseRight  : "\\]"},
						qqwc_whirlStrike :		{ encloseLeft : "[-", encloseRight  : "-]"},
						qqwc_whirlCourier :		{ encloseLeft : "[#", encloseRight  : "#]"},
						qqwc_whirlSmall :			{ encloseLeft : "[(", encloseRight  : ")]"},
						qqwc_whirlGrey :			{ encloseLeft : "[`", encloseRight  : "`]"},
						qqwc_whirlSerif :			{ encloseLeft : "[~", encloseRight  : "~]"},
						qqwc_whirlGoogle :		{ encloseLeft : "[?", encloseRight  : "?]"},
						qqwc_whirlEscape :		{ encloseLeft : "[.", encloseRight  : ".]"},
						qqwc_whirlWiki :			{ encloseLeft : "[[", encloseRight  : "]]"},
						qqwc_whirlSpoil :			{ encloseLeft : "[_", encloseRight  : "_]"}
				   }; 

	/********whirlcode buttons*********/

	var wcButtons = '<div id="qqbuttonsDiv" style="text-align:center;padding-bottom:10px;">' +
				'<button type="button" class="qqwcodeButtons" title="Bold WhirlCode" accesskey="b" id="qqqqwc_whirlBold" >Bold</button>' +
				'<button type="button" class="qqwcodeButtons" title="Italic WhirlCode" accesskey="i" id="qqwc_whirlItalic" >Italic</button>' +
				'<button type="button" class="qqwcodeButtons" title="SingleQuote WhirlCode" accesskey="t" id="qqwc_whirlSingleQuote" >\'quote\'</button>' +
				'<button type="button" class="qqwcodeButtons" title="DoubleQuote WhirlCode" accesskey="q" id="qqwc_whirlDoubleQuote" >"quote"</button>' +
				'<button type="button" class="qqwcodeButtons" title="Quote WhirlCode" accesskey="h" id="qqwc_whirlQuote" >who</button>' +
				'<button type="button" class="qqwcodeButtons" title="Superscript WhirlCode" accesskey="p" id="qqwc_whirlSuperscript" >Super</button>' +
				'<button type="button" class="qqwcodeButtons" title="Subscript WhirlCode" accesskey="\\" id="qqwc_whirlSubscript" >Sub</button>' +
				'<button type="button" class="qqwcodeButtons" title="Strike WhirlCode" accesskey="k" id="qqwc_whirlStrike" >Strike</button>' +
				'<button type="button" class="qqwcodeButtons" title="Courier WhirlCode" accesskey="c" id="qqwc_whirlCourier" >Courier</button>' +
				'<button type="button" class="qqwcodeButtons" title="Small WhirlCode" accesskey="m" id="qqwc_whirlSmall" >Small</button>' +
				'<button type="button" class="qqwcodeButtons" title="Grey WhirlCode" accesskey="r" id="qqwc_whirlGrey" >Grey</button>' +
				'<button type="button" class="qqwcodeButtons" title="Serif WhirlCode" accesskey="s" id="qqwc_whirlSerif" >Serif</button>' +
				'<button type="button" class="qqwcodeButtons" title="Google WhirlCode" accesskey="g" id="qqwc_whirlGoogle" >Google</button>' +
				'<button type="button" class="qqwcodeButtons" title="Escape WhirlCode" accesskey="e" id="qqwc_whirlEscape" >Esc</button>' +
				'<button type="button" class="qqwcodeButtons" title="Wiki WhirlCode" accesskey="w" id="qqwc_whirlWiki" >Wiki</button>' +
				'<button type="button" class="qqwcodeButtons" title="Spoiler WhirlCode" accesskey="o" id="qqwc_whirlSpoil" >Spoiler</button>' +
				'<button type="button" class="qqwcodeButtons" title="URL Link" accesskey="u" id="qqwc_whirlurl" >URL</button>' +
				'<button type="button" class="qqwcodeButtons" title="Link" accesskey="l" id="qqwc_whirllink" >Link</button>' +
				'</div>';

	$('#replies').append('<div id="qQuote" align="center">'+wcButtons+'<div id="qqPreview"></div><div id="qqTooManyWords">'+
							'<p style="margin:0 auto;margin-top:10px;">ZOMG! You are quoting significantly more words than you have written.<br /><br />'+
							'<img src="http://i27.tinypic.com/142zdi8.jpg" /></p><button type="button" id="wordsOK">OK</button>'+
							'</div><textarea id="qqTextArea" cols="'+qBwidth+'" rows="'+qBrow+'"></textarea><br />'+
							'<button type="button" style="" id="qqpostclear" name="qqpost">Clear</button><button type="button" style="" id="qqpost" name="qqpost">Post Reply</button>'+
							'<img src="http://i28.tinypic.com/jzbn0n.gif" id="aloader" />'+
							'<div id="opInputs" style="height:30px;width:700px;">'+
								'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="w" id="modewc" name="modewc"/>'+
								'<label style="cursor: pointer;font-size:10px;" for="modewc"> Use WhirlCode</label></p>'+
								'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" wc2="b" id="modeht" name="modeht"/>'+
								'<label style="cursor: pointer;font-size:10px;" for="modeht"> Allow HTML</label></p>'+
								'<p><input type="checkbox" checked="checked" style="cursor: pointer;" value="true" id="modest" wc2="e" name="modest"/>'+
								'<label style="cursor: pointer;font-size:10px;" for="modest"> Auto entities </label></p>'+
								'<p><input checked="checked" type="checkbox" style="cursor: pointer;" value="true" id="modewl" wc2="a" name="modewl"/>'+
								'<label style="cursor: pointer;font-size:10px;" for="modewl"> Make links clickable</label></p>'+markSubscribebox+
						         	'<p><input type="checkbox" style="cursor: pointer;" id="autoPreview" name="autoPreview"/>'+
								'<label style="cursor: pointer;font-size:10px;">Auto Preview</label></p>'+								
								'<p><input type="checkbox" style="cursor: pointer;" id="lastPost" name="lastPost"/>'+
								'<label style="cursor: pointer;font-size:10px;">Go To Last Post</label></p>'+									
								'</div></div>');

	qqtArea = $('#qqTextArea');
	
	function getOptions(t){
	
		var textOptions = "&";
		var settingStr = "pfl";
		var ret;
	
		$('#opInputs input').each(function(i){

			var opThis = $(this);

			if(opThis.attr('checked')){

				settingStr += ''+opThis.attr('wc2');
				
				if(i<5){
				
				textOptions+= ''+opThis.attr('name')+'=true&';

				}
				
			}
		
		});

		(t == 'preview')? ret = settingStr: ret = textOptions;

		return ret;
				
				}

	var pTd;
	qqtArea.bind("focus keyup", function() {
	/***preview code by Simon Wright - http://forums.whirlpool.net.au/forum-user.cfm?id=10***/
		if(hideAjaxPreview && !qqtArea.val().length && !$('#previewTR')[0]){
		
			setUpPreview();
		
		}	
		var previewTimer;
		var previewWait = false;

			if (!previewWait) {

				previewWait = true;
				previewTimer = setTimeout(function(){
				
											pTd.html(unsafeWindow.whirlcode2(qqtArea.val(), getOptions('preview')));
											
											previewWait = false;
											
										}, 600);
			}


			
	
	});
	
	$('#qqpostclear').mouseup(function(){
	
		qqtArea.val('');
		
		window.setTimeout(function(){

			GM_setValue('textareraSave', '');
			
		}, 0);		
		
	
	});
	
	var autP = $('#autoPreview');
	
	function setUpPreview(){
	
		theLastOfTheMohicanTableRows.after('<tr height="100" id="previewTR"><td class="bodyuser" style="vertical-align: middle;"><p style="opacity:0.3;font:2em bold Verdana">'+
											'Preview</p></td><td class="bodytext"/><td class="bodypost" style="vertical-align: middle;"><p style="opacity:0.3;font:2em bold '+
											'Verdana">Preview</p></td></tr>');
		
		pTd = $('#previewTR td:eq(1)');
		
		autP.attr('checked', 'checked');
	
	}

	if(GM_getValue('autoPreview') == 'true' && !hideAjaxPreview){
	
		setUpPreview();
		
	}
	
	autP.click(function(){
	
		if($(this).attr('checked')){
	
			window.setTimeout(function(){

				GM_setValue('autoPreview','true');
				
			}, 0);	

			setUpPreview();

		}
		else{

			window.setTimeout(function(){

				GM_setValue('autoPreview','false');

			}, 0);	

			$('#previewTR').remove();			
		
		}

	});

	var lastP = $('#lastPost');
	
	lastP.click(function(){
	
		var w = '';
	
		($(this).attr('checked'))? w='true':w='false';

		window.setTimeout(function(){

			GM_setValue('lastPost', w);
			
		}, 0);	

	});
	
	window.setTimeout(function(){

		if(GM_getValue('lastPost') == 'true'){
		
			lastP.attr('checked', 'checked');
		
		}
				
	}, 0);				
		
	/*******whirlcode buttons event handler********/		
			   
	$('.qqwcodeButtons').mouseup(function(){

		var qqbuttonID = $(this).attr('id');		

		qqtArea.focus();
		
		var qqcurrentValue = qqtArea.val();
		
		var qqtheSelection = qqtArea.val().substring(qqtArea[0].selectionStart, qqtArea[0].selectionEnd);

			function insertAtCursor(qqmyField, qqmyValue) {

				if (qqmyField.selectionStart || qqmyField.selectionStart == '0') {
				
					var qqstartPos = qqmyField.selectionStart;
					var qqendPos = qqmyField.selectionEnd;
					qqmyField.value = qqmyField.value.substring(0, qqstartPos)
					+ qqmyValue
					+ qqmyField.value.substring(qqendPos, qqmyField.value.length);
					
				} 
				else {
				
					qqmyField.value += qqmyValue;
					
				}
				
			}

		
			
		if(qqtheSelection === ""){
		
			if(((qqcurrentValue.split(whirlCode[qqbuttonID].encloseLeft).length+qqcurrentValue.split(whirlCode[qqbuttonID].encloseRight).length)  % 2) === 0){
				
				insertAtCursor(qqtArea[0], whirlCode[qqbuttonID].encloseLeft);
				
			}
			else{
				
				insertAtCursor(qqtArea[0], whirlCode[qqbuttonID].encloseRight);
					
			}
			
		}
		else if(qqbuttonID == "qqwc_whirlurl"){
		
			var uPrompt = window.prompt("Enter URL:", "http://"); 
			
			if ((uPrompt !== "http://") && (uPrompt !== "") & (uPrompt !== null)) {

				insertAtCursor(qqtArea[0], '<a href="'+uPrompt+'">'+qqtheSelection+'</a>');
			
			}
			

		}
		else if(qqbuttonID == "qqwc_whirllink"){
		
			var uPrompt = window.prompt("Enter Text:", ""); 
			
			if ((uPrompt !== "") & (uPrompt !== null)) {
			
				if(qqtheSelection.indexOf('http://')<0){
				
					qqtheSelection = 'http://'+qqtheSelection;
				
				}

				insertAtCursor(qqtArea[0], '<a href="'+qqtheSelection+'">'+uPrompt+'</a>');
			
			}
			

		}		
		else{
		
			if(qqtheSelection.indexOf('\n')>-1 || qqtheSelection.indexOf('\r')>-1){
			
				var tSel = qqtheSelection.replace(/^(.+)$/mg, whirlCode[qqbuttonID].encloseLeft+"$1"+whirlCode[qqbuttonID].encloseRight);
			
				qqtArea.val(qqtArea.val().replace(qqtheSelection, tSel));					
			
			}
			else{
			
				insertAtCursor(qqtArea[0], whirlCode[qqbuttonID].encloseLeft+qqtheSelection+whirlCode[qqbuttonID].encloseRight);
			
			}

		}		
	});


		
	$('.greylink[@href*="forum-replies-herring"]').each(function(){

		$(this).after(' <span class="bar"> | </span><a class="qqlink greylink" href="">q-quote</a>');

	});
	$('.qqlink').bind("click", function(){

		if(!$('#previewTR')[0]){
		
			setUpPreview();
		
		}

		var qqtrParent = $(this).parent().parent().parent();

		var qqpre = qqtrParent.attr('id').split('r')[1];
		
		var qquNam;
		
		qqtrParent.find('span').each(function(){

			if($(this).attr('class') == 'bu_name'){

				qquNam = $(this).text();

			}

		});
		var qqtSel = window.getSelection().toString().replace(/^(.+)$/mg, '["$1"]');

		if(qqtArea.val().length > 0){

		qqtArea.val(qqtArea.val()+'\r@'+qqpre+' '+qquNam+' writes... \n'+qqtSel+'\n\n');
		
		}
		else{
		
			qqtArea.val(qqtArea.val()+'@'+qqpre+' '+qquNam+' writes... \n'+qqtSel+'\n\n');
		
		}
		
		qqtArea.focus();

		window.setTimeout(function(){

			GM_setValue('textareraSave', qqtArea.val());
			
		}, 0);		
		
		return false;

	});
	
	
	function pfft(){
	
		window.setTimeout(function(){

			GM_setValue('textareraSave', qqtArea.val());
			
		}, 0);		
	
		qqtArea.css('background','#E5E5E5 url(http://i28.tinypic.com/jzbn0n.gif) no-repeat scroll 50% 50%');
		
		postPost(qqtArea.val(), getOptions('post'));	
	
	}
	
	$('#qqpost').mouseup(function(){
	
		if(!gottaPee){
		
			$.get(pReply[0].href, function(data){

				gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];

			});
		
		}
	
		pfft();
		
	});
	qqtArea[0].addEventListener('keydown', function(event) {
	
		if(event.ctrlKey==1 && event.keyCode==13 ){
		
			if(!gottaPee){
			
				$.get(pReply[0].href, function(data){

					gottaPee = data.split('name="tinkle" value="')[1].split('">')[0];

				});
			
			}
	
			pfft();
			
		}
			
	}, false);					
	qqtArea[0].addEventListener('keyup', function(event) {
	
			GM_setValue('textareraSave', qqtArea.val());

	}, false);

	if(!qqtArea.val() && GM_getValue('textareraSave')){
	
		qqtArea.val(GM_getValue('textareraSave'));
		

        }			
}
  
	}

})();