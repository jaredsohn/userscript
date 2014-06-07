// ==UserScript==
// @name	Travian OptiCSS
// @namespace	swiftcase
// @description	Version 0.0.2.2 | Native T3, Beyond and/or AutoTask CSS style improver, Preference Pane
// @author	swiftcase
// @version	0.0.2.2
// @date	11:42 AM Saturday, November 28, 2009
// @source	http://userscripts.org/scripts/review/57739
// @identifier	http://userscripts.org/scripts/source/57739.user.js
// @require	http://userscripts.org/scripts/source/57739.user.js?maxage=2&method=update&open=GM&id=(57739)&xhr=GM&storage=GM
// @license	CC by NC ND 3.0 Unported License
// @include	http://*.travian*
// @exclude	http://*.travian*.*/hilfe.php*
// @exclude	http://*.travian*.*/index.php*
// @exclude	http://*.travian*.*/anleitung.php*
// @exclude	http://*.travian*.*/impressum.php*
// @exclude	http://*.travian*.*/anmelden.php*
// @exclude	http://*.travian*.*/gutscheine.php*
// @exclude	http://*.travian*.*/spielregeln.php*
// @exclude	http://*.travian*.*/links.php*
// @exclude	http://*.travian*.*/geschichte.php*
// @exclude	http://*.travian*.*/tutorial.php*
// @exclude	http://*.travian*.*/manual.php*
// @exclude	http://*.travian*.*/ajax.php*
// @exclude	http://*.travian*.*/ad/*
// @exclude	http://*.travian*.*/chat/*
// @exclude	http://forum.travian*.*
// @exclude	http://board.travian*.*
// @exclude	http://shop.travian*.*
// @exclude	http://*.travian*.*/activate.php*
// @exclude	http://*.travian*.*/support.php*
// @exclude	http://help.travian*.*/*log
// @exclude	*.css
// @exclude	*.js
// ==/UserScript==

var suchNum = 57739;
//---Settings
// Preference Pane source by devnull69, http://userscripts.org/scripts/show/45988
// Preference Pane modified by swiftcase
var OSS = {
	node: null,
	darken: null,
	valueList: null,
	theScriptName: 'Travian OptiCSS',
	prefPrefix: '',
	isVisible: false,
	tOscs: ''+
	'#tos-prefs,#tos-prefs * {font-size:10px; font-weight:normal; font-style:normal; font-family:tahoma,sans-serif; color:#000; text-transform:none; text-decoration:none; letter-spacing:normal; word-spacing:normal; line-height:normal; vertical-align:middle; direction:ltr; background:transparent none repeat scroll 0 0; opacity:1; position:static; visibility:visible; z-index:auto; overflow:visible; white-space:normal; clip:auto; float:none; clear:none; cursor:auto; text-align:center}\n/*preserve defaults*/\n'+
	'#tos-prefs{display:block;position:fixed;z-index:999;border:1px solid #aaa;-moz-border-radius:5px;background:rgb(253,255,207) none;color:#FFF0CF;width:400px}\n'+
	'#tos-darken,#tos-darken *{background:transparent none repeat scroll 0 0; opacity:0.5;position:static;visibility:visible;z-index:auto;overflow:visible;white-space:normal;clip:auto;float:none;clear:none;cursor:auto}\n/*preserve defaults*/\n'+
	'#tos-darken{height:100%;width:100%;display:block;position:fixed;z-index:998;background:rgb(113,208,0) none}\n'+
	'#tos-prefs>h1{text-align:center; display:block; font-size:11px !important; letter-spacing:7px; text-transform:uppercase; font-style: normal !important; font-family:tahoma !important; font-weight:normal; border:0;margin:0; padding:10px}\n'+
	'#tos-prefs p{display:inline;margin:10px 5px;font-family:tahoma,sans-serif}\n'+
	'#tos-prefs p>b{font-weight:bold}\n'+
	'#tos-prefs>div{display:block;width:300px;margin:0 auto;text-align:right;}\n'+
	'#tos-prefs>div>div{display:block;width:300px;margin:0 auto;text-align:center}\n'+
	'.tos-radio{margin:0.2em auto !important;padding:5px;border:1px solid #aaa;-moz-border-radius:3px;}\n'+
	'.tos-radio div{display:block;width:100%;margin:0 auto;padding-bottom:5px;text-align:left !important;font-weight:bold !important}\n'+
	'#tos-prefs input, #tos-prefs select {text-align:left; margin:0.7em 0; padding:0 6px; background:#FFE1A2; border:1px solid #aaa; -moz-border-radius:4px; border-color:#5F3E00 #5F3E00 #000000 #5F3E00; font-family:tahoma,sans-serif}\n'+
	'#tos-prefs>div>div input{margin:0 0;padding:0 0;background:#FFE1A2;border:1px solid #aaa;-moz-border-radius:4px;border-color:#5F3E00 #5F3E00 #000 #5F3E00;font-family:tahoma,sans-serif}',
	init: function() {
		var theStyle=document.createElement("style");
		OSS.valueList=arguments;
		theStyle.setAttribute('type','text/css');
		document.getElementsByTagName('head')[0].appendChild(theStyle).innerHTML=OSS.tOscs;
		OSS.prefPrefix='\n<h1>prefer your opticss</h1>\n<p>preferences for the ' + OSS.theScriptName + '</p>\n<div class="OSS-values"></div><input class="button" type="button" value="Save">&nbsp;&nbsp;<input class="button" type="button" value="Save & Reload">&nbsp;&nbsp;<input class="button" type="button" value="Cancel"><br><input class="button" type="button" value="Check for update">\n';
		OSS.node=document.createElement("div");
		OSS.node.innerHTML='<div>'+OSS.prefPrefix+'</div>';
		OSS.node=OSS.node.firstChild;
		OSS.node.id="tos-prefs";
		OSS.node.parentNode.removeChild(OSS.node);
		OSS.darken=document.createElement("div");
		OSS.darken.innerHTML='<div></div>';
		OSS.darken=OSS.darken.firstChild;
		OSS.darken.id="tos-darken";
		OSS.darken.parentNode.removeChild(OSS.darken);
	},
	cb:{},
	EL: function(e) {
		var E=e.type.toLowerCase().replace(/^on/i,""),i=0,n=e.target;
		if(!OSS.cb[E])return;
		for(;i<OSS.cb[E].length;i++) {
			if(OSS.cb[E][i][0]==n) return OSS.cb[E][i][1].call(n,e)
		}// no callbacks found
	},
	addEventListener: function(n,E,f) {
		if(!n+!f)return !1;
		if(!OSS.cb[E]){OSS.cb[E]=[];OSS.node.addEventListener(E,function(e){OSS.EL(e)},!0)}
		OSS.cb[E].push([n,f]);
		return !0;
	},
	removeEventListener: function(n,E,f) {
		if(!n+!E+!f+!OSS.cb[E])return;
		for(var i=0;i<OSS.cb[E].length;i++) {
			if(OSS.cb[E][i][0]==n&&OSS.cb[E][i][1]==f)return !(OSS.cb[E].splice(i,1))||undefined;
		}
	},

	showWindow: function (){
		document.body.appendChild(OSS.darken);
		document.body.appendChild(OSS.node);
		OSS.isVisible=true;
	},

	styleWindow: function() {
		if(typeof SVC=='undefined') {
			OSS.node.getElementsByClassName("button")[3].style.display='none';
		}
		if(OSS.valueList.length==0) {
			OSS.node.getElementsByClassName("button")[0].style.display='none';
			OSS.node.getElementsByClassName("button")[1].style.display='none';
		}
		OSS.darken.style.left=OSS.darken.style.top="50%";
		OSS.darken.style.marginLeft=-(OSS.darken.offsetWidth/2)+"px";
		OSS.darken.style.marginTop=-(OSS.darken.offsetHeight/2)+"px";
		OSS.node.style.left=OSS.node.style.top="50%";
		OSS.node.style.marginLeft=-(OSS.node.offsetWidth/2)+"px";
		OSS.node.style.marginTop=-(OSS.node.offsetHeight/2)+"px";
		if(OSS.valueList.length>0) {
			OSS.addEventListener(OSS.node.getElementsByClassName("button")[0],"click",OSS.saveValues);
			OSS.addEventListener(OSS.node.getElementsByClassName("button")[1],"click",OSS.saveValuesAndReload);
		}
		OSS.addEventListener(OSS.node.getElementsByClassName("button")[2],"click",OSS.killWindow);
		for(var i=0; i<OSS.valueList.length; i++) {
			if(typeof OSS.valueList[i].theDefault=='object' && OSS.valueList[i].theDefault.length) {
				OSS.addEventListener(OSS.node.getElementsByClassName("OSS-DelButton"+i)[0],"click",function() {
				// Delete button clicked
				var theValueNumber = this.className.substring(13);
				for(var j=0; j<OSS.node.getElementsByClassName('OSS-field'+theValueNumber).length; j++) {
					if(OSS.node.getElementsByClassName('OSS-field'+theValueNumber)[j].selected) {
						OSS.node.getElementsByClassName('OSS-field'+theValueNumber)[j].parentNode.removeChild(OSS.node.getElementsByClassName('OSS-field'+theValueNumber)[j]);
					}
				}
			});
			OSS.addEventListener(OSS.node.getElementsByClassName("OSS-AddButton"+i)[0],"click",function() {
					// Add button clicked
					var theValueNumber = this.className.substring(13);
					var theNewValue=OSS.node.getElementsByClassName('OSS-AddText'+theValueNumber)[0].value;
					if(theNewValue!='') {
						var theCurrentSelect=OSS.node.getElementsByClassName('OSS-select'+theValueNumber)[0];
						theCurrentSelect.innerHTML+='<option class="OSS-field'+theValueNumber+'" value="'+theNewValue+'">'+theNewValue+'</option>';
						OSS.node.getElementsByClassName('OSS-AddText'+theValueNumber)[0].value='';
					}
				});
			}
		}
		if(typeof SVC!='undefined') OSS.addEventListener(OSS.node.getElementsByClassName("button")[3],"click",SVC.versionInfo.manualChecking);
	},
	
	killWindow: function(){
		OSS.node.innerHTML=OSS.prefPrefix;
		OSS.node.parentNode.removeChild(OSS.node);
		OSS.darken.parentNode.removeChild(OSS.darken);
		OSS.isVisible=false;
	},

	saveValues: function(){
		var newValue;
		for(var i=0;i<OSS.valueList.length;i++) {
			switch(typeof OSS.valueList[i].theDefault) {
				case 'boolean':
					newValue=OSS.node.getElementsByClassName('OSS-field'+i)[0].checked;
					break;
				case 'number':
					newValue=parseInt(OSS.node.getElementsByClassName('OSS-field'+i)[0].value);
					break;
				case 'string':
					if(OSS.valueList[i].theValues) {
					for(var j=0; j<OSS.node.getElementsByClassName('OSS-field'+i).length; j++) {
					if(OSS.node.getElementsByClassName('OSS-field'+i)[j].checked) newValue=OSS.node.getElementsByClassName('OSS-field'+i)[j].value;
					}
					} else {
					newValue=OSS.node.getElementsByClassName('OSS-field'+i)[0].value;
					}
					break;
				case 'object':
					if(OSS.valueList[i].theDefault.length) {
						// construct a JSON string from option Array
						newValue = '[';
						for(var j=0; j<OSS.node.getElementsByClassName('OSS-field'+i).length; j++) {
							newValue += '"'+OSS.node.getElementsByClassName('OSS-field'+i)[j].value+'",';
						}
						if(OSS.node.getElementsByClassName('OSS-field'+i).length == 0) {
							newValue = '[]';
						} else {
							newValue = newValue.substring(0, newValue.length-1) + ']';
						}
					}
					break;
			}
			GM_setValue(OSS.valueList[i].theName, newValue);
		}
		OSS.killWindow();
	},

	saveValuesAndReload: function(){
		OSS.saveValues();
		window.location.reload();
	},

	getValue: function(valueName){
		if(GM_getValue(valueName) != undefined) {
			var PrefValue = GM_getValue(valueName);
			for(var i=0;i<OSS.valueList.length;i++) {
				if(OSS.valueList[i].theName==valueName && typeof OSS.valueList[i].theDefault=='object' && OSS.valueList[i].theDefault.length) PrefValue = eval(' '+PrefValue+' ');
			}
			return PrefValue;
		} else {
				for(var i=0;i<OSS.valueList.length;i++) {
					if(OSS.valueList[i].theName==valueName) return OSS.valueList[i].theDefault;
				}
		}
	},

	invoke: function(){
		if(!OSS.isVisible) {
			OSS.showWindow();
			for(var i=0;i<OSS.valueList.length;i++) {
			var curVal;
			if(GM_getValue(OSS.valueList[i].theName)!=undefined) {
				curVal=GM_getValue(OSS.valueList[i].theName);
				if(typeof OSS.valueList[i].theDefault=='object' && OSS.valueList[i].theDefault.length) {
					// eval JSON string if theDefault is an Array
					curVal = eval(' '+curVal+' ');
				}
				} else {
					curVal=OSS.valueList[i].theDefault;
				}
				switch(typeof OSS.valueList[i].theDefault) {
					case 'boolean':
						var isChecked='';
						if(curVal) isChecked=' checked';
						OSS.node.getElementsByClassName('OSS-values')[0].innerHTML+='<div>'+OSS.valueList[i].theText+' <input class="OSS-field'+i+'" type="checkbox" name="'+OSS.valueList[i].theName+'"'+isChecked+'></div><br>';
						break;
					case 'number':
						//---awesome replacing
						$$('#clrbox').forEach(function (radd) {
							radd.innerHTML = '...';
						});
					case 'string':
						if(OSS.valueList[i].theValues) {
						var newDiv=document.createElement('div');
						newDiv.setAttribute('class', 'tos-radio');
						newDiv.innerHTML='<div>'+OSS.valueList[i].theText+'</div>';
						var isChecked;
						for(var j=0; j<OSS.valueList[i].theValues.length; j++) {
							if(OSS.valueList[i].theValues[j]==curVal) {isChecked=' checked';} else {isChecked='';}
							newDiv.innerHTML+='<p><input class="OSS-field'+i+'" type="radio" name="'+OSS.valueList[i].theName+'" value="'+OSS.valueList[i].theValues[j]+'"'+isChecked+'><div id="clrbox">'+OSS.valueList[i].theValues[j]+'</div></p>';
						}
						OSS.node.getElementsByClassName('OSS-values')[0].appendChild(newDiv);
						} else {
						OSS.node.getElementsByClassName('OSS-values')[0].innerHTML+=OSS.valueList[i].theText+' <input class="OSS-field'+i+'" type="text" size="30" name="'+OSS.valueList[i].theName+'" value="'+curVal+'"><br>';
						}
						break;
					case 'object':
						if(OSS.valueList[i].theDefault.length) {
						// An object with length is an Array
						var newDiv=document.createElement('div');
						newDiv.setAttribute('class', 'tos-radio');
						newDiv.innerHTML='<div>'+OSS.valueList[i].theText+'</div>';
						var newSelect=document.createElement('select');
						newSelect.setAttribute('name',OSS.valueList[i].theName);
						newSelect.setAttribute('size', '5');
						newSelect.setAttribute('class', 'OSS-select'+i);
						for(var j=0; j<curVal.length; j++) {
						newSelect.innerHTML+='<option class="OSS-field'+i+'" value="'+curVal[j]+'">'+curVal[j]+'</option>';
						}
						newDiv.appendChild(newSelect);
						newDiv.innerHTML+='<br />';
						var newButton = document.createElement('input');
						newButton.setAttribute('type', 'button');
						newButton.setAttribute('value', 'x');
						newButton.setAttribute('class', 'OSS-DelButton'+i);
						newDiv.appendChild(newButton);
						newDiv.innerHTML+='&nbsp;';
						newButton = document.createElement('input');
						newButton.setAttribute('type', 'button');
						newButton.setAttribute('value', '+');
						newButton.setAttribute('class', 'OSS-AddButton'+i);
						newDiv.appendChild(newButton);
						newDiv.innerHTML+='<br />';
						var newText = document.createElement('input');
						newText.setAttribute('type', 'text');
						newText.setAttribute('class', 'OSS-AddText'+i);
						newDiv.appendChild(newText);
						OSS.node.getElementsByClassName('OSS-values')[0].appendChild(newDiv);
						}
						break;
				}
			}
			OSS.styleWindow();
		}
	}
};

//---xpather
function $$(xpath,root) { 
	xpath = xpath
	.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
	.replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
	.replace(/#([\w-]+)/g, '[@id="$1"]')
	.replace(/\/\[/g,'/*[');
	str = '(@\\w+|"[^"]*"|\'[^\']*\')';
	xpath = xpath
	.replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
	.replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
	.replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
	var got = document.evaluate(xpath, root||document, null, 5, null), result=[];
	while (next = got.iterateNext())
	result.push(next);
	return result;
 }

 // ---Loader
window.addEventListener(
	'load',
	function () {
		// The type of 'theDefault' determines the type of the preference value
		OSS.init(
			{theName:'fFamily', theText:'General Font Family', theValues:['monospace','tahoma','Georgia','Verdana'], theDefault:'tahoma'},
			{theName:'fSize', theText:'General Font Size', theValues:['9px','10px','11px','12px','13px'], theDefault:'11px'},
			{theName:'pfFamily', theText:'Profile Font Family', theValues:['monospace','tahoma'], theDefault:'monospace'}, 
			{theName:'pfSize', theText:'Profile Font Size', theValues:['11px','12px','13px','14px'], theDefault:'12px'},
			{theName:'h1Family', theText:'Village Name Font Family', theValues:['Arial','Georgia','Verdana'], theDefault:'Georgia'}, 
			{theName:'h1Style', theText:'Village Name Font Style', theValues:['normal','italic'], theDefault:'italic'},
			{theName:'h1Size', theText:'Village Name Font Size', theValues:['17px','18px','19px','20px','21px','22px'], theDefault:'20px'},
			{theName:'h1Color', theText:'Village Name Colors', theValues:['000','f30','f90','7d0','59c','c6a'], theDefault:'f90'}
		);
		GM_registerMenuCommand(OSS.theScriptName+' - Preferences', OSS.invoke);

		//------------------------------------------------------------------GettingStyles
		var opticss = '';
		opticss += 'body{font-size:' + OSS.getValue("fSize") + '!important; font-family:'+ OSS.getValue("fFamily") +'!important}';
		opticss += 'body{max-width:100% !important}';
		//------------------------------------------------------------------line-height
		opticss += 'table *, table#llist *, table#target_validate tr td *, table#llist tr td, table#llist td, table#llist tbody tr td, table#llist tbody tr td a, table#vlist tr td, table#vlist td, table#vlist tbody tr td, table#vlist tbody tr td a, table#userbookmarks tr, table#userbookmarks td a, table#userbookmarks td b, table#target_validate tr td, table#target_validate tr th, div#build.gid17 table#target_validate td.vil, table#target_select tr td *, table#send_select tr td *, table#target_select tr td, table#send_select tr td, table#dorf3table td {line-height:15px; !important};';
		//------------------------------------------------------------------font-size
		opticss += '#closeautran, #autoResdiv, #translimit, #resremain, #createnewurl, #createUrl, #partylnk, #createImprove, #autotransbtn,#attackbtn,#trainlnk,#customtransbtn, #updataform, #printmsg, #transform, #translimitform, #demolistform, #attackform, #trainform, #customtransform, #resremainform, #partyform, #improveform, #mytablee, table#mytablee tr td, #crtvill,#hero, #demolishdiv, #autoResform1, #changeit, #changeit2, #deletealltask, #clicktostart, #verdisp, #autoResform2, #clicktopause, #demolishlnk, table#production tr td, table#movements tr td, table#troops tr td, table#target_validate tr td, table#target_validate tr th, table#target_select tr td, table#send_select tr td * {font-size:' + OSS.getValue("fSize") + '}';
		//------------------------------------------------------------------active-font-size ;)
		opticss += '#autotransbtn:active, #attackbtn:active, #demolishlnk:active, #createUrl:active, #createnewurl:active, #trainlnk:active, #customtransbtn:active, #partylnk:active, #createImprove:active {font-size:' + OSS.getValue("fSize") + '}';
		//------------------------------------------------------------------important-font-size
		opticss += 'table#tasklisttable th, table#tasklisttable td, table#tasklisttable, table#tasklisttable tr td, table#llist tr td, table#llist td, table#llist tbody tr td, table#llist tbody tr td a, table#vlist tr td, table#vlist td, table#vlist tbody tr td, table#vlist tbody tr td a, table#userbookmarks tr, table#userbookmarks td a, table#userbookmarks td b, table#target_select tr td *, div#res table tr td, #taskForm_wrapper, #MSG_wrapper, #tranForm_wrapper, #tranlmtform_wrapper, #demolistform_wrapper, #attackform_wrapper, #trainform_wrapper, #customtransform_wrapper, #resremainform_wrapper, #partyform_wrapper, #improveform_wrapper, #tasklisttable_wrapper, table#dorf3table tr td {font-size:' + OSS.getValue("fSize") + '!important}';
		//------------------------------------------------------------------h1Styling
		opticss += 'h1 {padding-top:16px}';
		opticss += 'h1 {z-index:300}';
		opticss += 'h1, div.player h1{font-size:' + OSS.getValue("h1Size") + ' !important; font-family:'+ OSS.getValue("h1Family") +' !important; color: #'+ OSS.getValue("h1Color") +' !important;letter-spacing:-1px; font-style:'+ OSS.getValue("h1Style") +'!important}';
		opticss += 'div#side_info td.link {padding-right:0; text-align:left}';
		opticss += 'div.village1 h1 div#loyality {top:45px; font-style:normal; font-weight:bold; letter-spacing:0}';
		//---
		opticss += 'div.player *, td.desc1 *, td.desc2 *, td.details *{font-family:' + OSS.getValue("pfFamily") + ' !important; font-size:' + OSS.getValue("pfSize") + ' !important}';
		opticss += 'div.player table#edit td.desc1 textarea, div.player table#edit td.desc2 textarea{font-family:' + OSS.getValue("pfFamily") + ' !important; font-size:' + OSS.getValue("pfSize") + ' !important}';
		//------------------------------------------------------------------hoverPower
		opticss += 'table#llist tr td:hover, table#llist td:hover, table#llist tbody tr td:hover, table#llist tbody tr td a:hover, table#vlist tr td:hover, table#vlist td:hover, table#vlist tbody tr td:hover, table#vlist tbody tr td a:hover, table#userbookmarks tr:hover, table#userbookmarks td a:hover, table#userbookmarks td b:hover, table#dorf3table td a:hover, table#vlist td a:hover {color:white; background-color:#71D000 !important; cursor:pointer}';
		//------------------------------------------------------------------customStyle
		opticss += 'div#side_info{width:auto !important}';
		opticss += 'div#side_info td.link {padding-right:0; text-align:left}';
		opticss += '#fLnk {position:absolute; right:5px; top:5px}';
		opticss += '#partylnk {top:0}';
		opticss += 'table td.or{padding-left:5px; background-color:#fff;text-align:center;text-transform:uppercase;font-style:normal}';
		//------------------------------------------------------------------
		opticss += 'div#textmenu>a{font-size:12px; font-family:' + OSS.getValue("pfFamily") + ' !important;font-weight:normal;letter-spacing:1px;padding:0 2px;text-transform:uppercase;outline:0}';
		opticss += 'div#textmenu>a:hover{background-color:#71D000 !important;color:white;}';
		opticss += 'div#textmenu>a{-moz-border-radius:2px !important;}';
		opticss += 'div#textmenu>a.selected{border:1px dashed silver !important;}';
		opticss += 'div#textmenu>a.selected:hover{border:1px dashed white !important;}';
		//------------------------------------------------------------------
		opticss += 'table#llist tr td, table#llist td, table#llist tbody tr td, table#llist tbody tr td a, table#vlist tr td, table#vlist td, table#vlist tbody tr td, table#vlist tbody tr td a, table#userbookmarks tr, table#userbookmarks td a, table#userbookmarks td b {padding-left:2px}';
		//------------------------------------------------------------------
		opticss += 'table#send_select tr td *{letter-spacing:-.5px}';
		opticss += 'table#send_select tr td{color:#71D000;font-style:normal; font-weight:bold}';
		opticss += 'table#offs tr td, table#events tr td, table#overview tr td, table#send_select tr td {font-size:11px; vertical-align:middle}';
		opticss += 'table.send_res td {vertical-align:middle !important}';
		//------------------------------------------------------------------
		opticss += 'div#tasklisttable_wrapper:hover{background-color:#e0edcf !important; cursor:move; border:2px solid #f90 !important;}';
		opticss += 'div#tasklisttable_wrapper *:hover{opacity:1}';
		opticss += 'div#tasklisttable_wrapper{color:#224400 !important; background-color:#b4dcdc !important}';
		opticss += 'div#tasklisttable_wrapper{background:transparent none repeat scroll 0 0; opacity:1; z-index:1111 !important; border:2px solid #aaa !important; margin:0; padding:2px !important; overflow:hidden !important}';
		opticss += 'table#tasklisttable{background:none !important; border-collapse:separate; padding:3px; margin:0}';
		opticss += 'table#tasklisttable * {margin:0;background:none !important;border-collapse:collapse}';
		opticss += 'table#tasklisttable hr {height:1px !important}';
		opticss += 'table#tasklisttable caption {background-color: #aaa !important;color:#fff; text-align:right; -moz-border-radius:2px;}';
		opticss += 'table#tasklisttable th{padding-top:2px !important; text-transform:uppercase}';
		opticss += 'table#tasklisttable big {color:#fff; font-weight:bold; font-size:8pt !important; padding: 0 2px}';
		opticss += 'table#tasklisttable:hover{background:none !important}';
		opticss += 'table#tasklisttable caption:hover {background:#f90 url(data:image/gif;base64,R0lGODlhBAAEAIABANbW1vPz8yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAABAAEAAACBQxgaLFZACH5BAkKAAEALAAAAAAEAAQAAAIGTACXaHkFACH5BAkKAAEALAAAAAAEAAQAAAIFRGJosFkAIfkEBQoAAQAsAAAAAAQABAAAAgYEEpdoeQUAOw==) repeat 0 0 !important}';
		//------------------------------------------------------------------
		opticss += 'div#res table{background:none}';
		opticss += 'div#res table tr td{letter-spacing:0 !important; background:none}';
		opticss += 'div#res table td{padding:0 !important}';
		opticss += 'div#res{left:70px !important; top:100px !important; background:none}';
		//------------------------------------------------------------------
		opticss += 'table#vlist tr {padding:1px}';
		opticss += 'div#content div#map_details {margin-top:55px}';
		opticss += 'table#target_validate tr td *{color:#71D000;font-size:12px; font-style:italic; font-weight:bold !important}';
		opticss += 'table#target_validate tr td, table#target_validate tr th{color:#1E90FF; font-style:normal; font-weight:bold}';
		//---
		opticss += 'table#target_validate *{background-color:#DDEEFF; font-family:'+ OSS.getValue("fFamily") +'!important; font-size:12px !important; font-style:normal; font-weight:bold; padding:2px}';
		opticss += 'table#target_validate td.vil{font-family:'+ OSS.getValue("h1Family") +'!important; font-size:13px !important; font-style:'+ OSS.getValue("h1Style") +'!important}';
		//------------------------------------------------------------------
		opticss += 'table#target_select tr td * {color:#1E90FF; font-style:italic; font-weight:normal}';
		opticss += 'table#target_select tr td {color:#1E90FF; font-style:normal; font-weight:bold}';
		opticss += 'table.res_target {top:130px; width:auto; font-size:10px !important; font-weight:bold}';
		opticss += 'table#target_select td.mer {text-transform:uppercase; padding:3px !important; text-align:center; color:#1E90FF !important; background-color:#DDEEFF !important; font-size:10px !important}';
		//---
		opticss += 'div#toffywrapper{z-index:1500;}';
		opticss += 'div#toffylogo{width:24px;height:24px;border:3px solid #71D000; padding: 0; margin:0; position: absolute; color: #71D000; font-size: 9px; top: 0; right: 0;}';
		opticss += 'div#toffylogo{background:url(data:image/png;base64,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) !important}';
		opticss += 'div#toffylogo:hover{border:3px solid #f90; cursor:pointer;}';
		opticss += 'div#toffy{visibility:hidden; border:3px solid #71D000; padding: 2px; position: absolute; color: #71D000; font-size: 9px; top: 30px; right: 30px;background-color:#fff;z-index:1510;}';
		//---
		opticss += 'img.Cola {float:left; cursor:pointer !important; margin:3px !important}';
		opticss += 'img.Pepsi {float:left; cursor:pointer !important; margin:3px !important}';
		opticss += 'div#tasklisttable_wrapper div.data {overflow: hidden !important;height: 100%;width: 100%;}';
		opticss += 'div#clrbox{display:inline !important}';
		//---
		GM_addStyle(opticss);
	},
true);

//---Updater
try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('suchLastUp', '0')) + 86400000 <= (new Date().getTime()))) 
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+suchNum+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rtxt, scriptName;
						
						rtxt=resp.responseText;
						GM_setValue('suchLastUp', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rtxt)[1]);
						local_version=parseInt(GM_getValue('suchCurVer', '-1'));
						if(local_version!=-1)
						{
							scriptName = (/@name\s*(.*?)\s*$/m.exec(rtxt))[1];
							GM_setValue('suchTargetScriptName', scriptName);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+scriptName+'".\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+suchNum);
									GM_setValue('suchCurVer', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+scriptName+'".');
						}
						else
							GM_setValue('suchCurVer', remote_version+'');
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
	GM_registerMenuCommand(GM_getValue('suchTargetScriptName', 'Travian OptiCSS') + ' - Manual Update Check', function(){updateCheck(true);});
	updateCheck(false);
}
catch(err)
{}
//end of script