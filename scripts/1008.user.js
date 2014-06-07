// ==UserScript==
// @name          deviantPLUS v3
// @namespace     deviantPLUS
// @description	  Enhances deviantART by adding a toolbar to text fields
// @include       http://*.deviantart.com*
// ==/UserScript==

/*
	BUGS:
	* Disallow : and | in button namespaces and names.
		- Checks should be in saving and importing.
	* Make sure what is entered into the Advanced textarea is a function.  Err if not.

	TODO:
	* Import should have the option for importing via URL or copy/paste
	* Exporting buttons to a file
	* Multi-button export should somehow be implemented
	* Button recovery 
		- Recover default buttons via the User Scripts menu
		- Custom buttons by clicking a "Recover Button" button and entering the ID
			- Would be case-sensitive, but I don't know any way around that other than 
			  forcing lower-case and a bunch of other restrictions on all button names =/
	* Create UI for Toolbars tab
		- Should list all locations in which a toolbar can appear and have the option 
		  to enable/disable the toolbar for each.
*/

if(top != self) return

GM_log('Running deviantPLUS v3');

var dpVersion='3.0.2b';

if(unsafeWindow.deviantART){
	// For some reason these lines seem to get executed several times, for
	// two of which the unsafeWindow.deviantART object does not exist =/
	var subscriber = unsafeWindow.deviantART.deviant.subbed;
	var username = unsafeWindow.deviantART.deviant.username;
}

// Don't bother running the script if they're not logged in.
if(unsafeWindow.deviantART && !unsafeWindow.deviantART.deviant.loggedIn) return;

var loc=window.location.href;
var aryStyleText=[];
var buttonSetImage='url(http://dp.thezikes.org/Images/button_grey_all.png)';
var defaultButtons='http://dp.thezikes.org/Buttons/defaultbuttons.dp.js';

function $E(){
	function applyObj(to, obj){
		for(prop in obj) if(obj.hasOwnProperty(prop)){
			if(typeof(obj[prop])=='object'){
				applyObj(to[prop], obj[prop]);
			}else{
				to[prop]=obj[prop];
			}
		}
	}
	if(arguments.length==0) return;
	var elm=document.createElement(arguments[0]);
	[arguments[1], arguments[2]].forEach(function(arg,idx,ary){
		if(typeof(arg)=='object'){
			if(arg instanceof Array){
				arg.forEach(function(append,idx,ary){elm.appendChild(append)});
			}else{
				for(prop in arg) if(arg.hasOwnProperty(prop)){
					if(prop=='events'){
						var events=arg[prop];
						for(evt in events) if(events.hasOwnProperty(evt)){
							elm.addEventListener(evt, events[evt], false);
						}
					}else{
						if(typeof(arg[prop])=='object'){
							applyObj(elm[prop], arg[prop]);
						}else{
							elm[prop]=arg[prop];
						}
					}
				}
			}
		}
	});
	return elm;
}

function $S(str){
	return document.createTextNode(str);
}

// Classes
var Apply = { // Controls where toolbars are applied
	body:true,
	comments:true,
	descriptions:true,
	forums:true,
	notes:true,
	shoutboard:true,
	shoutbox:true,
	prints:true,
	header:true,
	footer:true,
	signature:true,
	literature:true,
	importSettings:function(strSettings){
		arySettings=strSettings.split('|').clean();
		this.body=(arySettings[0]==1);
		this.comments=(arySettings[1]==1);
		this.descriptions=(arySettings[2]==1);
		this.forums=(arySettings[3]==1);
		this.notes=(arySettings[4]==1);
		this.shoutboard=(arySettings[5]==1);
		this.shoutbox=(arySettings[6]==1);
		this.prints=(arySettings[7]==1);
		this.header=(arySettings[8]==1);
		this.footer=(arySettings[9]==1);
		this.signature=(arySettings[10]==1);
		this.literature=(arySettings[11]==1);
	},
	exportSettings:function(){
		arySettings=[];
		arySettings.push((this.body ? 1 : 0));
		arySettings.push((this.comments ? 1 : 0));
		arySettings.push((this.descriptions ? 1 : 0));
		arySettings.push((this.forums ? 1 : 0));
		arySettings.push((this.notes ? 1 : 0));
		arySettings.push((this.shoutboard ? 1 : 0));
		arySettings.push((this.shoutbox ? 1 : 0));
		arySettings.push((this.prints ? 1 : 0));
		arySettings.push((this.header ? 1 : 0));
		arySettings.push((this.footer ? 1 : 0));
		arySettings.push((this.signature ? 1 : 0));
		arySettings.push((this.literature ? 1 : 0));
		return arySettings.join("|");
	},
	save:function(){
		GM_setValue('dpApply',this.exportSettings())
	}
};
function keySet(){
	this.keys=[];
	this.addKey=function(key, value){
		if(!this.keyExists(key))
			this.keys.push({'key':key,'value':value});
	}
	this.keyExists=function(key){
		var blnKeyExists=false
		this.keys.forEach(function(theKey, idx, ary){if(key===theKey.key) blnKeyExists=true})
		return blnKeyExists;
	}
	this.getKey=function(key){
		var intIndex=-1;
		this.keys.forEach(function(theKey, idx, ary){if(key===theKey.key) intIndex=idx})
		if(intIndex!=-1)
			return this.keys[intIndex];
		else
			return false;
	}
	this.applyKeys=function(str){
		this.keys.forEach(function(theKey,idx,ary){
			str=str.replace(new RegExp("<%"+theKey.key+".*?%>","g"), theKey.value);
		});
		return str;
	}
	this.extractKeys=function(str){
		var lines=str.split("\n").clean();
		str.split('\n').clean().forEach(function(line, idx, ary){
			var matches=line.match(/<%(.+?)%>/g);
			if(matches){
				matches.forEach(function(match, idx, ary){
					match=match.substring(2,match.length-2).split(':').clean();
					var key=match[0];
					var prmpt=match[1] || key;
					if(!this.keyExists(key)){
						var val=prompt(prmpt,"");
						val = val || "";
						this.addKey(key, val);
					}
				},this)
			}
		},this);
	}
}
var Timer= new (function(msg){
	this.lastTime=new Date().getTime();
	this.total=0;
	GM_log(msg)
	this.newTime=function(msg){
		var time=new Date().getTime();
		var diff=time-this.lastTime;
		this.lastTime=time;
		GM_log(diff+"ms: "+msg);
		this.total+=diff;
	}
	this.progressTime=function(msg){
		var time=new Date().getTime();
		var diff=time-this.lastTime;
		GM_log(diff+"ms: "+msg);
	}
	this.totalTime=function(){
		var time=new Date().getTime();
		var diff=time-this.lastTime;
		this.lastTime=time;
		this.total+=diff;		
		GM_log("Script completed in: "+this.total+"ms")
	}
})("Begin timer")

function Toolbar(type){
	this.buttons=[];	
	this.applied=false;
	this.tb=$E('div', {className:'dpToolbar'});
	
	this.type=type || 'comments';
	
	this.apply=function (textField){
		if(this.applied) return;
		if(textField.getAttribute('hasToolbar')=='true') return;
		
		this.tb.style.width=textField.style.width;
		this.tb.setAttribute('type',this.type);
		
		for(var i=0;i<this.buttons.length;i++){
			var btn = Buttons.make(this.buttons[i]);
			if(btn !== false){
				if(btn.getAttribute('allowedIn').indexOf(this.type)>-1){
					if(btn.getAttribute('subscriberonly')=='true'){
						if(subscriber) this.tb.appendChild(btn);
					}else{
						this.tb.appendChild(btn)
					}
				}
			}
		}
		if(this.tb.childNodes.length!=0){
			textField.parentNode.insertBefore(this.tb,textField);
			this.tb.textField=textField;
			textField.setAttribute('hasToolbar','true');
			this.applied=true;
		}
	}
	
	this.LoadActive=function (){
		GM_log(Buttons.Order.join('|'));
		Buttons.Order.forEach(function(btn){
			if(Buttons.Active.has(btn)){
				this.buttons.push(btn)
			}
		},this)
	}
	return this;
}

var IconCache = new (function(){
	this.cached=false;
	this.icons=[];
	this.extract=function(str){
		str.split("\n").forEach(function(line,idx,ary){
			if(line.replace(/ /,'')!='') this.icons.push(line);
		},this);
		this.cached=true;
	}
	this.getIcons=function(){
		if(this.cached){
			var elArray=[];
			this.icons.forEach(function(icon,idx,ary){
				elArray.push("<div class='IconItem'><img src='http://dp.thezikes.org/Icons/"+icon+"' /> "+icon+"</div>")
			},elArray);
			return elArray.join('');
		}else{
			GM_log("Tried to retrieve icons before they were loaded.");
			return [];
		}
	}
	this.fill=function(list){
		if(!this.cached){
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://dp.thezikes.org/Icons/icons.txt",
				headers:{
					"User-Agent":"Firefox / Greasemonkey / deviantPLUS",
					"Accept":"text/plain"
				},
				onload:function(details){
					if(details.status!=200){
						GM_log("Icons could not be retrieved, status returned was "+details.status);
					}else{
						IconCache.extract(details.responseText);
						IconCache.fill(list);
					}
				}
			});
		}else{
			list.innerHTML=IconCache.getIcons();
			var fn=function(evt){
				var txt=$('txtCustomIcon');
				txt.value=this.firstChild.getAttribute('src');
				$('IconList').style.display='none';
				txt.selectionEnd=txt.selectionStart=txt.value.length;
				txt.focus();
			}
			for(var x=0;x<list.childNodes.length; x++){
				addEvent(list.childNodes[x], 'click', fn)
			}
			list.className=list.className.replace(/loading/,'');
		}
	}
})()
// Prototyping
String.prototype.removeButton=function(btn){
	var outary=[];
	this.toString().split('|').clean().forEach(function(str,idx,ary){if(str!=btn){outary.push(str);}});
	return outary.join('|');
}
String.prototype.jsonSafe=function(){
	var arg=this.toString();
	var out=[];
	out.push('"');
	var a=['\n','\\n','\r','\\r','"','\\"'];
	arg+="";
	for(var i=0;i<6;i+=2){arg=arg.split(a[i]).clean().join(a[i+1])};
	out.push(arg);
	out.push('"');
	return out.join('');
}
String.prototype.makeUrl=function(){
	var str=this.toString();
	var url='';
	if(str.match(/^http:\/\//i)){
		url=str;
	}else if(str.match(/^www|^[a-z]*\./i)){
		url='http://'+str;
	}else{
		url=str;
	}
	return url;
}
Array.prototype.remove=function(itm){
	for(var i=0; i<this.length; i++){
		if(this[i]==itm){
			delete this[i];
		}
	}
	return this;
}
Array.prototype.has=function(itm){
	for(var i=0; i<this.length; i++){
		if(this[i]===itm){
			return true;
		}
	}
	return false;
}
Array.prototype.clean=function(){
	var out=[];
	for (var i=0; i<this.length; i++){
		if(this[i]!='' && this[i]!=null && this[i]!=undefined){
			out.push(this[i]);
		}
	}
	return out;
}
Array.prototype.unique=function(){
	var out=[];
	for(var i=0; i<this.length; i++){
		if(!out.has(this[i])){out.push(this[i])}
	}
	return out;
}
Array.prototype.find=function(itm){
	for(var i=0; i<this.length; i++){
		if(this[i]==itm) return i;
	}
	return -1;
}
Array.prototype.move_element=function(idx, delta){
	var idx2, tmp;
	
	if(idx<0 || idx>=this.length){
		return false;
	}
	
	idx2=idx+delta;
	if(idx2<0 || idx2 >= this.length || idx2==idx){
		return false;
	}
	
	tmp=this[idx2];
	this[idx2]=this[idx];
	this[idx]=tmp;
	return true;
}

function $(id){
	var el=(typeof(id)=='string'?document.getElementById(id):id);
	if(el){
		el.remove=function(){this.parentNode.removeChild(this)};
	}
	return el;
}

// Get elements by CSS selector
function $$(xpath,root) { 
  xpath=xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3').
             replace(/\.([\w-]+)(?!([^\]]*]))/g,'[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]').
              replace(/#([\w-]+)/g,'[@id="$1"]').
              replace(/\/\[/g,'/*[');
  str='(@\\w+|"[^"]*"|\'[^\']*\')'
  xpath=xpath.replace(new RegExp(str+'\\s*~=\\s*'+str,'g'),'contains($1,$2)').
              replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'),'starts-with($1,$2)').
              replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'),'substring($1,string-length($1)-string-length($2)+1)=$2');
  var got=document.evaluate(xpath,root||document,null,null,null), result=[];
  while(next=got.iterateNext()) result.push(next);
  return result;
}

function addEvent(obj, evType, fn, useCapture){
	if(!obj) return;
	if(typeof(evType)=='string') evType=[evType];
	evType.forEach(
		function(evnt, idx, ary){
			obj.addEventListener(evnt, fn, useCapture);
		}
	)
}
function extractNumberFromURL(url){var tmp=url.match(/(\d*)\/?$/); return (tmp && tmp[1] ? tmp[1] : tmp) || '';}

function get(url,cb){GM_xmlhttpRequest({method:"GET", url:url, headers:{'User-Agent':'Firefox / GreaseMonkey / deviantPLUS'}, onload:function(xhr){cb(xhr.responseText)}})}
function post(url,data,cb){GM_xmlhttpRequest({method:"POST", url:url, headers:{'User-Agent':'Firefox / GreaseMonkey / deviantPLUS', 'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(data),onload:function(xhr){cb(xhr.responseText)}})}

function getParent(el, pTagName){
	if (el == null)
		return null;
	else if(el.nodeType == 1 && (pTagName == null || el.tagName.toLowerCase() == pTagName.toLowerCase()))	// Gecko bug, supposed to be uppercase
		return el;
	else
		return getParent(el.parentNode, pTagName);
}
unsafeWindow.getParent = getParent;

function surroundText(tf,left,right){
	var tmpScroll=tf.scrollTop;
	t=tf.value;
	s=tf.selectionStart;
	e=tf.selectionEnd;
	var selectedText=tf.value.substring(s,e);
	tf.value=t.substring(0,s)+left+selectedText+right+t.substring(e)
	tf.selectionStart=s+left.length;
	tf.selectionEnd=s+left.length+selectedText.length;
	tf.scrollTop=tmpScroll;
	tf.focus();
}
function insertText(tf,txt){
	var tmpScroll=tf.scrollTop;
	t=tf.value;
	s=tf.selectionStart;
	e=tf.selectionEnd;
	var selectedText=tf.value.substring(s,e);
	tf.value=t.substring(0,s)+txt+selectedText+t.substring(e)
	tf.selectionStart=s;
	tf.selectionEnd=s+txt.length;
	tf.scrollTop=tmpScroll;
	tf.focus();
}

// Initialize
(function(){
	Timer.newTime("Initializing.");
	var dpApplyDefault="1|1|1|1|1|1|1|1|1|1|1|1"
	var dpApply=GM_getValue("dpApply", dpApplyDefault);
	dpApply = (dpApply == "" ? dpApplyDefault : dpApply)
	Apply.importSettings(dpApply);
	Apply.save();
	dpActive=GM_getValue('dpActive',GM_getValue('dpButtons','')).split(/\|/).clean();
	dpOrder=GM_getValue('dpOrder',GM_getValue('dpButtons','')).split(/\|/).clean();
	Timer.newTime("Finished initializing.");
})()

//////////////////////////////////////
////       Load the Buttons       ////
//////////////////////////////////////

var Buttons={
	Button:{},
	Order:[],
	Active:[],
	'reset':function(){
		GM_setValue('dpButtons', '');
		GM_setValue('dpActive', '');
		GM_setValue('dpOrder', '');
		Buttons.Button={};
		Buttons.Order=[];
		Buttons.Active=[];
		Buttons.load();
	},
	'add':function(btns,save,update){
		// Is the value a string?
		if(typeof(btns)=='string'){
			// Eval string and add result button object
			Buttons.add(eval(btns));
		}
		
		// Is the value an array of buttons?
		if(btns instanceof Array){
			// Loop through array values and add each button individually
			btns.forEach(function(btn){
				Buttons.add(btn);
			});
			
		// Is the value already an object?
		}else if(typeof(btns)=='object'){
			
			// Combine namespace and name for unique name
			var btnName=btns.ns+':'+btns.name;
			
			// Check to see if button with that name already exists
			if(Buttons.Button[btnName]!==undefined){
				// Button exists
				
				// Ok to update existing?
				if(!update){
					// Does the button's name already denote a duplicate?
					if(btns.name.indexOf('_dup')!==-1){
						// Yes, increment duplication
						var parts=btns.name.split('_dup');
						btns.name=parts[0]+'_dup'+(parseInt(parts[1],10)+1);
					}else{
						// No, mark as duplicate
						btns.name+='_dup1';
					}
					// Recreate full name
					btnName=btns.ns+':'+btns.name;
				}
			}
			
			// Store button
			Buttons.Button[btnName]=btns;
			
			// If the button does not exist in the Order list, append it
			if(!Buttons.Order.has(btnName)){
				Buttons.Order.push(btnName);
			}
			
			// If the button does not exist in the Active list, append it
			if(!Buttons.Active.has(btnName)){
				Buttons.Active.push(btnName);
			}
		}
		
		if(save!==false){
			// Save button
			Buttons.save();
		}
	},
	'import':function(url, fn_oncomplete){
		fn_oncomplete=fn_oncomplete || function(){};
		get(url, function(results){
			Buttons.add(results, false);
			Buttons.save();
			if($('listButtons')) loadListButtons();
			fn_oncomplete();
		});
	},
	'delete':function(btn){
		delete Buttons.Button[btn];
		Buttons.Order.remove(btn);
		Buttons.Active.remove(btn);
		Buttons.save();
	},
	'save':function(){
		var btnList=[];
		for(btn in Buttons.Button) if(Buttons.Button.hasOwnProperty(btn)){
			if(!btnList.has(btn)) btnList.push(btn);
			GM_setValue(btn, uneval(Buttons.Button[btn]));
		}
		GM_setValue('dpButtons',btnList.clean().join('|'));
		GM_setValue('dpOrder', Buttons.Order.clean().join('|'));
		GM_setValue('dpActive', Buttons.Active.clean().join('|'));
	},
	'load':function(fn_onload){
		fn_onload=fn_onload || function(){};
		var strButtonList=GM_getValue('dpButtons','');
		Buttons.Order=GM_getValue('dpOrder',strButtonList).split('|').clean().unique();
		Buttons.Active=GM_getValue('dpActive',strButtonList).split('|').clean().unique();
		if(strButtonList==''){ 
			// Buttons not loaded, import defaults
			Buttons.import(defaultButtons, function(){
				pageCheck.applyAll();
				fn_onload();
			});
		}else{
			// Buttons loaded, continue
			var ary=strButtonList.split(/\|/).clean().unique();
			ary.forEach(function(btn){
				var btnJSON=GM_getValue(btn,null);
				if(btnJSON===null){
					// Button does not exist, confirm removal
					GM_log('WARNING: Button "'+btn+'" does not exist!');
				}else{
					Buttons.add(btnJSON)
				}
			});
			fn_onload();
		}
	},
	'activate':function(btn){
		if(btn=='' || btn==undefined) return;
		if(!Buttons.Active.has(btn)){
			Buttons.Active.add(btn);
		}
		GM_setValue('dpActive', Buttons.Active.clean().join('|'))
	},
	'deactivate':function(btn){
		if(btn=='' || btn==undefined) return;
		Buttons.Active.remove(btn);
		GM_setValue('dpActive', Buttons.Active.clean().join('|'))
	},
	'moveUp':function(btn){
		var ret=Buttons.Order.move_element(Buttons.Order.find(btn),-1)
		GM_setValue('dpOrder', Buttons.Order.clean().join('|'));
		return ret;
	},
	'moveDown':function(btn){
		var ret=Buttons.Order.move_element(Buttons.Order.find(btn),1);
		GM_setValue('dpOrder', Buttons.Order.clean().join('|'));
		return ret;
	},
	'make':function(str){
		var objButton;
		if(Buttons.Button[str]){
			objButton = Buttons.Button[str]
		}else{
			var ns=str.split(':').clean()[0];
			var name=str.split(':').clean()[1];
			var json=GM_getValue(str, "");
			if(json==""){
				GM_log("The custom button "+str+" does not exist");
				/*var remove=confirm("The custom button "+str+" does not exist, remove it from index?");
				if(remove){
					Buttons.delete(str);
				}*/
				return false;
			}
			objButton = eval('('+json+')');
		}

		if(!objButton.styles){
			objButton.styles={};
			objButton.styles.backgroundImage=buttonSetImage;
		}

		var btn=$E('a', {href:'#'});

		if(objButton.icon){
			btn.appendChild($E('i',{style:{backgroundImage:'url('+objButton.icon+')'}}));
		}
		if(objButton.styles){
			for(prop in objButton.styles){
				btn.style[prop]=objButton.styles[prop]
			}
		}
		// This actually worked on the first try! O.o
		['styles','depressedStyles','hoverStyles'].forEach(function(style,idx,ary){
			if(objButton[style]){
				addEvent(
					btn,
					{styles:'mouseout',depressedStyles:'mousedown',hoverStyles:['mouseover','mouseup']}[style],
					function(evt){
						for(prop in objButton[style]){
							this.style[prop]=objButton[style][prop];
						}
					}
				);
			}
		});

		btn.className='dpButton '+(!!objButton.className ? objButton.className : '');
		btn.setAttribute('title',objButton.title);
		btn.setAttribute('allowedin',objButton.allowedIn)
		switch(objButton.type){
			case 'surround':
				// Create an anonymous function that returns an anonymous function and then call it anonymously
				addEvent(btn, 'click', (function(left, right){
					return function(evt){
						var tf=getParent(this,'div').nextSibling;
						var keys=new keySet();
						[left, right].forEach(function(str,idx,ary){
							keys.extractKeys(str);
						});
						var tmpLeft = keys.applyKeys(left);
						var tmpRight = keys.applyKeys(right);
						surroundText(tf,tmpLeft,tmpRight);
						evt.preventDefault();
					}
				})(objButton.surroundText.left.toString(),objButton.surroundText.right.toString()),true);
				// No, srsly
				break;
			case 'insert':
				// Do it again!
				addEvent(btn, 'click', (function(str){
					return function(evt){
						evt.preventDefault();
						var tf=getParent(this,'div').nextSibling;
						var keys=new keySet();
						keys.extractKeys(str);
						var tmpStr=keys.applyKeys(str);
						insertText(tf,tmpStr);
					}
				})(objButton.insertText.toString()),true);
				break;
			case 'advanced':
				for(evt in objButton.events){addEvent(btn, evt, objButton.events[evt])}
		}
		return btn;
	}
}

Buttons.load();

function setStatusMessage(msg, timeout){
	if($('dpStatusMessage')){
		$('dpStatusMessage').innerHTML=msg;		
		$('dpStatusMessage').style.display="block";
		window.setTimeout(function(){				
			$('dpStatusMessage').style.display="none";		   
		}, timeout || 5000);
	}
}


function showPrefs(evt){
	var tabList=[
		'dpTabButtons',
	//	'dpTabToolbars',
		'dpTabAbout'		
	];
	
	function prefsTabs(){
		return 	"<div id='dpPrefsWindowTabBar'>"
			+"<a id='dpTabButtons' class='dpPrefsTab active' for='dpPageButtons'>Buttons</a>"
		//	+"<a id='dpTabToolbars' class='dpPrefsTab' for='dpPageToolbars'>Toolbars</a>"
			+"<a id='dpTabAbout' class='dpPrefsTab' for='dpPageAbout'>About</a>"
		+"</div>";
	}
	
	function prefsPageButtons(){
		return "<div id='dpPageButtons' class='dpPrefsPage active'>"
			+"<table width='100%' id='tblCustomButtons'>"
				+"<tr>"
					+"<td>"
						+"<div id='listButtons'></div>"
						+"<div align='right'>"
							//+"<input type='button' id='btnImport' value='Import'/>"
							+"<input type='button' id='btnReset' value='Reset'/> "
							+"<input type='button' id='btnNew' value='New Button'/>"
						+"</div>"
					+"</td>"
					+"<td class='scrollvert'>"
						+"<div id='ScrollingDiv'>"
							+"<label for='txtCustomNamespace'>Namespace:</label>"
							+"<input type='text' id='txtCustomNamespace' value='"+username+"' />"
							
							+"<label for='txtCustomName'>Name:</label>"
							+"<input type='text' id='txtCustomName' />"
							
							+"<label for='txtCustomTitle'>Title:</label>"
							+"<input type='text' id='txtCustomTitle' />"
							
							+"<label for='txtCustomIcon'>Icon:</label>"
							+"<input type='text' id='txtCustomIcon' />"
							+"<input type='button' value='&#9662;' id='btnShowIcons' /><br />"

							+"<label for='txtCustomDescription' style='font-weight:normal; font-size:11px;'>Description:</label> <br />"
							+"<textarea id='txtCustomDescription' rows='3'></textarea>"
							
							+"<label for='cbSubscriberOnly' style='width:115px; text-align:left'>Subscribers Only:</label>"
							+"<input type='checkbox' id='cbSubscriberOnly' /> <br />"
							+"<table width='100%'><tr>"
								+"<td valign='top' align='right' width='86'><strong style='white-space:nowrap'>Show in:</strong></td>"
								+"<td valign='top'>"
								    +"<input type='checkbox' id='cbJournalBody' checked='checked' /><label class='cb' for='cbJournalBody'>Journal Body</label><br />"
									+"<input type='checkbox' id='cbJournalHeader' checked='checked' /><label class='cb' for='cbJournalHeader'>Journal Header</label><br />"
									+"<input type='checkbox' id='cbJournalFooter' checked='checked' /><label class='cb' for='cbJournalFooter'>Journal Footer</label><br />"
									+"<input type='checkbox' id='cbComments' checked='checked' /><label class='cb' for='cbComments'>Comments</label><br />"
									+"<input type='checkbox' id='cbForums' checked='checked' /><label class='cb' for='cbForums'>Forums</label><br />"
									+"<input type='checkbox' id='cbDescriptions' checked='checked' /><label class='cb' for='cbDescriptions'>Deviation Descriptions</label><br />"
								+"</td><td valign='top'>"	
									+"<input type='checkbox' id='cbNotes' checked='checked' /><label class='cb' for='cbNotes'>Notes</label><br />"
									+"<input type='checkbox' id='cbShoutboards' checked='checked' /><label class='cb' for='cbShoutboards'>Shoutboards</label><br />"
									+"<input type='checkbox' id='cbShoutboxes' checked='checked' /><label class='cb' for='cbShoutboxes'>Shoutboxes</label><br />"
									+"<input type='checkbox' id='cbPrintsDesc' checked='checked' /><label class='cb' for='cbPrintsDesc'>Prints Descriptions</label><br />"
									+"<input type='checkbox' id='cbSignatures' checked='checked' /><label class='cb' for='cbSignatures'>Signatures</label><br />"
								+"</td>"
							+"</tr></table>"
							
							+"<label for='selCustomType'>Button Type:</label>"
							+"<select id='selCustomType'><option value='insert'>Insert</option><option value='surround'>Surround</option><option value='advanced'>Advanced</option></select>"
														
							+"<div id='trButtonTypeProperties'>"
								+"<div id='pgInsert' class='page active'>"
									+"<label for='txtCustomInsert'>Text to Insert:</label> <br />"
									+"<textarea id='txtCustomInsert' rows='3'></textarea>"
								+"</div>"
								+"<div id='pgAdvanced' class='page'>"
									+"<label for='txtCustomClickFunction'>Click Function:</label> <br />"
									+"<textarea id='txtCustomClickFunction' rows='9'></textarea>"
								+"</div>"
								+"<div id='pgSurround' class='page'>"
									+"<label for='txtCustomSurroundLeft'>Text on Left:</label> <br />"
									+"<textarea id='txtCustomSurroundLeft'></textarea><br />"
									+"<label for='txtCustomSurroundRight'>Text on Right:</label> <br />"
									+"<textarea id='txtCustomSurroundRight'></textarea>"
								+"</div>"
							+"</div><br/>"
							+"<div align='right'>"
								//+"<input type='button' id='btnExport' value='Export' />"
								+"<input type='button' id='btnSaveCustom' value='Save' />"
							+"</div>"
						+"</div>"
					+"</td>"
			+"</table>"
		+"</div>"
	}
	
	function prefsPageToolbars(){
		return "<div id='dpPageToolbars' class='dpPrefsPage'>"
		+"</div>"
	}
	
	function prefsPageAbout(){
		return "<div id='dpPageAbout' class='dpPrefsPage'>"
			+"<h3 align='center'>deviantPLUS v"+dpVersion+"</h3>"
			+"<strong>Programmed By:</strong> <a href='http://zikes.deviantart.com/'>Zikes</a>, <a href='http://solitude12.deviantart.com/'>Solitude12</a>, and <a href='http://electricnet.deviantart.com/'>electricnet</a><br />"
			+"<strong>Designed By:</strong> <a href='http://mynti.deviantart.com/'>mynti</a>, <a href='http://solitude12.deviantart.com/'>Solitude12</a>, and <a href='http://electricnet.deviantart.com/'>electricnet</a><br /><br />"
			+"<div id='Updater'>Checking for updates...</div>"
			+"<p class=\"yellow\">Button icons from <a href=\"http://www.famfamfam.com/lab/icons/silk/\">famfamfam.com</a> (with some modified by the wonderful mynti). Go check 'em out for 1000+ amazing, <em>free</em> 16x16 general purpose icons!</p>"
		+"</div>"
	}
	
	window.setTimeout(function(){
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://dp.thezikes.org/Updates/version.txt",
			headers:{
				"User-Agent":"Firefox / Greasemonkey / deviantPLUS",
				"Accept":"text/plain"
			},
			onload:function(details){
				if(details.status!=200){
					GM_log("Icons could not be retrieved, status returned was "+details.status);
				}else{
					var updater=$('Updater');
					if(updater){
						var str=details.responseText.replace(/[^a-z0-9.]/g,'');
						if(str==dpVersion){
							updater.innerHTML='Your version of deviantPLUS is up to date.';
						}else{
							updater.innerHTML='Your version of deviantPLUS is not up to date, you may download the newer version here: <a href="http://dp.thezikes.org/deviantplus_v3.user.js">http://dp.thezikes.org/deviantplus_v3.user.js</a>';
						}
					}
				}
			}
		});
	}, 1000);
	
	var bg = document.createElement('span');
	bg.setAttribute("id","dpPrefs_bgcover");
	bg.setAttribute("style","position:fixed; top:0px; left:0px; bottom:0px; right:0px; background-image:url('http://st.deviantart.com/styles/minimal/minish/bg-fade.png'); z-index:224;");
	document.getElementsByTagName('body')[0].appendChild(bg);
	
	/*addEvent(bg,'click',function(){
		$('dpPrefsWindow').parentNode.removeChild($('dpPrefsWindow'));
		$('dpPrefs_bgcover').parentNode.removeChild($('dpPrefs_bgcover'));
	},true);*/
	
	var statusMessage = document.createElement('span');
	statusMessage.setAttribute("id", "dpStatusMessage");
	bg.appendChild(statusMessage);
	
	var body=document.getElementsByTagName('body')[0];
	var dpWindow=$E('div', {id:'dpPrefsWindow'});
		
		var width=700;
		var height=500;
		var left=(document.documentElement.clientWidth/2) - (width/2);
		var top=((document.documentElement.clientHeight/2) - (height/2));
		
		dpWindow.style.width=width+"px";
		dpWindow.style.height=height+"px";
		dpWindow.style.left=left+"px";
		dpWindow.style.top=top+"px";
		
		// I tried building from scratch
		// I tried DOM builders
		// They were slow
		// And cumbersome
		// And not nearly flexible enough
		// I refuse to type 3 lines of code per one line of HTML

		dpWindow.innerHTML+=
			"<div id='dpPrefsWindowTitle'>"
				+"<a id='dpPrefsWindowTitleClose'><img src='data:image/gif;base64,R0lGODlhDwAPAJEAAP////X09EdSS////yH5BAEHAAMALAAAAAAPAA8AAAIrnC2Zx6O/GJxnWpRAUAEox2lCt1mjJpoJqa5oabHsp6TnB7ZC1TZqw8MdCgA7' /></a>"
				+"deviantPLUS 3 <span>Preferences</span>"
			+"</div>"
			+prefsTabs()
			+"<div id='dpPrefsWindowBody'>"
				+prefsPageButtons()
				//+prefsPageToolbars()
				+prefsPageAbout()
			+"</div>"
	body.appendChild(dpWindow);
		
	// Attach Window Close button event
	addEvent($('dpPrefsWindowTitleClose'),'click',function(){
		$$('.dpToolbar').forEach(function(el){
			$(el).nextSibling.setAttribute('hasToolbar','false');
			$(el).remove();
		});
		pageCheck.applyAll();
		$('dpPrefsWindow').parentNode.removeChild($('dpPrefsWindow'));
		$('dpPrefs_bgcover').parentNode.removeChild($('dpPrefs_bgcover'));
	},true);
		
	// Attach tab button events
	tabList.forEach(function(elt, idx, ary){
		addEvent($(elt),'click',function(){
			showTab(this.getAttribute('for'));
		});
	});
	
	loadListButtons();

	addEvent($('btnNew'), 'click', function(){
		var rows=$('listButtons').childNodes;
		for(var i=0; i<rows.length; i++){
			rows[i].className=rows[i].className.replace(/selected/g,'')
		}
		resetFields();
		setStatusMessage("Fields have been reset for adding.", 5000);		
	});
	addEvent($('btnReset'), 'click', function(){if(confirm('This will remove all buttons and reload the defaults, are you sure?')){Buttons.reset();}});
	addEvent($('btnImport'), 'click', function(){
		var url = prompt('Please enter the URL of the button to import:');
		if(url){
			Buttons.import(url.makeUrl()+"?"+(new Date()).getTime());
		}
	});
	addEvent($('btnExport'),'click',function(){
		var ns=$('txtCustomNamespace').value;
		var name=$('txtCustomName').value;
		var btnID=ns+':'+name;
		if(Buttons.Button[btnID]){
			var myWindow=window.open('','','width=500,height=400,scrollbars=yes');
			myWindow.document.write("<p>Copy &amp; paste the below text into a text file and change the text file's extension from .txt to .dp.js, then upload it somewhere so that people can import it.</p>");
			//myWindow.document.write("<p>If you upload the file somewhere and link to it on deviantART, deviantPLUS will recognize the link and enable people to import your button(s) by clicking the link.</p>");
			myWindow.document.write("<hr />");
			myWindow.document.write('<pre>'+uneval(Buttons.Button[btnID]).replace(/\</g,'&lt;').replace(/\>/g,'&gt;')+'</pre>');
			myWindow.focus();
		}
	});
	addEvent($('selCustomType'), 'change', function(){
		var pc=$('trButtonTypeProperties');
		for(var x=0; x<pc.childNodes.length; x++){
			pc.childNodes[x].className='page';
		}
		$('pg'+this.options[this.selectedIndex].text.toString().replace(/ /,'')).className+=' active';
	});
	addEvent($('btnSaveCustom'), 'click', function(){
		var ns=$('txtCustomNamespace');
		var name=$('txtCustomName');
		var title=$('txtCustomTitle');
		var desc=$('txtCustomDescription');
		var icon=$('txtCustomIcon');
		var type=$('selCustomType');
		var insert=$('txtCustomInsert');
		var custom=$('txtCustomClickFunction');
		var surroundLeft=$('txtCustomSurroundLeft');
		var surroundRight=$('txtCustomSurroundRight');
		
		var Checks=['cbJournalBody','cbJournalHeader','cbJournalFooter','cbComments','cbForums','cbDescriptions','cbNotes','cbShoutboards','cbShoutboxes','cbPrintsDesc','cbSignatures'];
		var Values=['body|bodies',  'header',         'footer',         'comments',   'forums',   'descriptions',   'notes',   'shoutboard',   'shoutbox',    'prints',       'signature'];

		var btnID=ns.value+":"+name.value;
		var newButton=GM_getValue(btnID, true)===true;
		
		var errs=[];
		if(ns.value==''){errs.push({msg:'Namespace field cannot be left blank.'})}
		if(name.value==''){errs.push({msg:'Name field cannot be left blank.'})}
		if(title.value==''){errs.push({msg:'Title field cannot be left blank.'})}
		switch(type.selectedIndex){
			case 0: // Insert
				if(insert.value==''){errs.push({msg:'An Insert type button requires text to be inserted.'})}
				break;
			case 1: // Surround
				if(surroundLeft.value=='' || surroundRight.value==''){errs.push({msg:'A Surround type button requires a Left and Right text value.'})}
				break;
			case 2: // Workin' on it
				if(custom.value==''){errs.push({msg:'You must provide a click function in the form of function(evt){}'})}
				break;
		}
		if(errs.length>0){ // Cancel save D:
			var aryErrors=[];
			errs.forEach(function(item,idx,ary){aryErrors.push(item.msg)});
			alert(aryErrors.join("\n"));
		}else{ // Continue save :D

			if(!newButton){
				if(!confirm("Overwrite existing button?")){return};
			}

			var strType=['insert','surround','advanced'][type.selectedIndex]
			var btnObj={
				"ns":ns.value,
				"name":name.value,
				"title":title.value,
				"description":desc.value,
				"allowedIn":(function(chks,vals){
					var ret=[];
					chks.forEach(function(chk,idx){
						if($(chk).checked){
							ret.push(vals[idx].split('|').clean()[0]);
						}
					});
					return ret.join(',');
				})(Checks,Values),
				"type":strType,
				"icon":icon.value,
				"styles":{backgroundImage:buttonSetImage, backgroundPosition:'0 0'},
				"hoverStyles":{backgroundPosition:'-25px 0'},
				"depressedStyles":{backgroundPosition:'-50px 0'}
			};
			switch(strType){
				case "insert":
					btnObj.insertText=insert.value;
					break;
				case "surround":
					btnObj.surroundText={left:surroundLeft.value,right:surroundRight.value};
					break;
				case "advanced":
					btnObj.events={
						"click":eval('('+custom.value+')')
					};
					break;
			}
			btnObj.subscriberOnly=!!$('cbSubscriberOnly').checked;
			
			Buttons.add(btnObj,true,true);
			

			if(newButton){ // Append to lists
				setStatusMessage("Created new button successfully!", 5000);
			}else{				
				setStatusMessage("Saved button successfully!", 5000);
			}
			loadListButtons();
			$(btnID).className+=' selected';
		}
	});
	
	['change','click','focus','blur','keyup'].forEach(function(evt,idx,ary){
		addEvent($('txtCustomIcon'), evt, function(){
			this.style.backgroundImage='url('+this.value+')';
		});
	});

	addEvent($('btnShowIcons'), 'click', function(){
		if($('IconList')==null){
			btn=$('btnShowIcons');
			txt=$('txtCustomIcon');
			var listWidth=258;
			var listHeight=205;
			var listLeft=txt.offsetLeft;
			var listTop=txt.offsetTop+txt.offsetHeight-1;
			var list=$E('div', {id:'IconList', className:'loading', style:{
				width:listWidth+'px',
				height:listHeight+"px",
				top:listTop+"px",
				left:listLeft+"px"
			}});
			$('ScrollingDiv').appendChild(list);
			IconCache.fill(list);
		}else{
			var list=$('IconList');
			list.style.display=(list.style.display=='none' ? 'block' : 'none');
		}
	});
	if(evt) evt.preventDefault();
}

function loadListButtons(){
	var lb=$('listButtons');
	var id;
	var sel=lb.getElementsByClassName('selected');
	if(sel && sel[0]){
		id=sel[0].id;
	}
	lb.innerHTML=''; // empty it :D
	for(var i=0; i<Buttons.Order.length; i++){
		
		/*** BUTTON ***/
		var btnName = Buttons.Order[i];
		if(!btnName) continue;
		var btnObj=Buttons.Button[btnName];
		if(!btnObj) continue;
		lb.appendChild($E('div',{title:btnObj.description, className:'row'+(id && id==btnName ? ' selected' : ''), id:btnName, events:{
				click:function(evt){
					loadSavedButton(this.id);
					var rows=$('listButtons').childNodes;
					for(var i=0; i<rows.length; i++){
						rows[i].className=rows[i].className.replace(/selected/g,'')
					}
					this.className+=' selected';
				},
				selectstart:function(evt){
					evt.stopPropagation();
					evt.preventDefault();
				}
			}},[
			$E('i',{className:'icon',style:{backgroundImage:'url('+btnObj.icon+')'}}),
			$E('strong',[$S(btnObj.title)]),
			$E('br'),
			$S(btnObj.description || ''),
			$E('div', {className:"fade"}),
			$E('span', {
				title:(Buttons.Active.has(btnName) ? 'Disable' : 'Enable'),
				className:"active"+(Buttons.Active.has(btnName) ? '' : ' disabled'),
				events:{
					click:function(evt){
						evt.stopPropagation();
						if(this.className.indexOf("disabled")>-1){ // is disabled
							this.className="active";
							Buttons.activate(this.parentNode.id);
						} else { // is enabled							
							this.className="active disabled";
							Buttons.deactivate(this.parentNode.id);
						}
						loadListButtons();
					}					
				}
			}),
			$E('span', {
			   title:"Move Up",
			   className:"moveup",
			   events:{
					click:function(evt){
						evt.stopPropagation();
						if(Buttons.moveUp(this.parentNode.id)){
							loadListButtons();
						}
					}
			   }
			}),
			$E('span', {
			   title:"Move Down",
			   className:"movedown",
			   events:{
					click:function(evt){
						evt.stopPropagation();
						if(Buttons.moveDown(this.parentNode.id)){
							loadListButtons();
						}
					}
			   }
			}),
			$E('span', {
				title:"Delete",
				className:"delete",
				events:{
					click:function(evt){
						evt.stopPropagation();
						var id=this.parentNode.id;
						var btnObj=Buttons.Button[id];
						if(confirm("Are you sure you want to delete the " + btnObj.title + " button?")){
							Buttons.delete(id);
							loadListButtons();
							resetFields();
							setStatusMessage("Deleted button successfully!", 5000);
						}
					}
				}
			})
		]));
	}
}

function resetFields(){
	$('txtCustomNamespace').value=username;
	$('txtCustomName').value='';
	$('txtCustomTitle').value='';
	with($('txtCustomIcon')){value=''; style.backgroundImage='';}
	$('txtCustomDescription').value='';
	
	// Load Checkboxes
	$('cbSubscriberOnly').checked=false;
	var Checks=['cbJournalBody','cbJournalHeader','cbJournalFooter','cbComments','cbForums','cbDescriptions','cbNotes','cbShoutboards','cbShoutboxes','cbPrintsDesc','cbSignatures'];
	Checks.forEach(function(id,idx,ary){$(id).checked=true;});
	
	// Load button type
	$('selCustomType').selectedIndex=0;
	var evt=document.createEvent('HTMLEvents');
	evt.initEvent('change',true,true);
	$('selCustomType').dispatchEvent(evt);
	$('txtCustomInsert').value='';
}

function loadSavedButton(btnName){
	var btnObj=Buttons.Button[btnName];
	
	// Load text inputs
	$('txtCustomNamespace').value=btnObj.ns || '';
	$('txtCustomName').value=btnObj.name || '';
	$('txtCustomTitle').value=btnObj.title || '';
	$('txtCustomIcon').value=btnObj.icon || '';
	$('txtCustomIcon').style.background='url('+btnObj.icon+') no-repeat 0 0';
	$('txtCustomDescription').value=btnObj.description || '';
	
	// Load Checkboxes
	$('cbSubscriberOnly').checked=(btnObj.subscriberOnly===true ? true : false);
	var Checks=['cbJournalBody','cbJournalHeader','cbJournalFooter','cbComments','cbForums','cbDescriptions','cbNotes','cbShoutboards','cbShoutboxes','cbPrintsDesc','cbSignatures'];
	var Values=['body|bodies',  'header',         'footer',         'comment',   'forum',   'description',   'note',   'shoutboard',   'shoutbox',    'print',       'signature'];
	Checks.forEach(function(id,idx,ary){$(id).checked=(btnObj.allowedIn && btnObj.allowedIn.search(new RegExp(Values[idx]))!=-1)});
	
	// Load button type
	$('selCustomType').selectedIndex={'insert':0,'surround':1,'advanced':2}[btnObj.type];
	var evt=document.createEvent('HTMLEvents');
	evt.initEvent('change',true,true);
	$('selCustomType').dispatchEvent(evt);
	switch(btnObj.type.toLowerCase()){
		case 'surround':
			$('txtCustomSurroundLeft').value=btnObj.surroundText.left || '';
			$('txtCustomSurroundRight').value=btnObj.surroundText.right || '';
			break;
		case 'advanced':
			$('txtCustomClickFunction').value=btnObj.events.click || ''
			break;
		case 'insert':
		default:
			$('txtCustomInsert').value=btnObj.insertText || '';
			break;
	}
}

function showTab(id){
	var tabBar=$("dpPrefsWindowTabBar");
	var tabs=tabBar.childNodes;
	for(var x=0;x<tabs.length;x++){
		var tab=tabs[x];
		tab.className="dpPrefsTab"+(tab.getAttribute("for")==id ? " active" : "");
		$(tab.getAttribute("for")).className="dpPrefsPage";
	}
	$(id).className="dpPrefsPage active";
}

// SWEET JESUS OVERRIDE DA'S OWN CODE PLZ
var Overrides={
	GMI:function(){
		unsafeWindow.GMFrame_Gruser
	},
	reply:function(){
		unsafeWindow.Comment.reply = function (parentid, link, event, where) {
			if (event && (event.shiftKey || event.ctrlKey))
				return true;
			var obj, box;
			if (link.hasOpenReply){return unsafeWindow.cancelEvent();}
			link.hasOpenReply = true;

			// Create?  More like CLONE.
			box = unsafeWindow.Comment.create(link, where);
			obj = unsafeWindow.Comment.init(box, parentid, link);
			unsafeWindow.Comment.setup(obj);

			// Make a new toolbar.
			var textarea = box.getElementsByTagName('textarea')[0];
			if(textarea){
				textarea.setAttribute("hasToolbar","false");
				var commentToolbar=new Toolbar('comments');
				commentToolbar.LoadActive();
				commentToolbar.apply(textarea);
			}

			return unsafeWindow.cancelEvent();
		}

		// For the message centre
		if(unsafeWindow.TalkPost){
			var script=$E('script', {type:'text/javascript'});
				script.innerHTML="var dp_tp_proto_on=TalkPost.prototype.on;\n"+
					"TalkPost.prototype.on=function(){\n"+
						"dp_tp_proto_on.apply(this);\n"+
						"var txt=Tree.get(this.node, '.text');\n"+
						"if(txt){applyDPToolbar(txt,'comments')}\n"+
					"}";
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	}
}

unsafeWindow.applyDPToolbar=function(box,type){
	var commentToolbar=new Toolbar(type);
	commentToolbar.LoadActive();
	commentToolbar.apply(box);
}

var pageCheck={
	shoutbox:function(){
		if(!Apply.shoutbox) return;
		if($('shout-body')){
			var shoutBox=$('shout-body');
			var sbToolbar=new Toolbar('shoutbox');
			sbToolbar.LoadActive();
			shoutBox.style.width='100%';
			sbToolbar.tb.style.width='100%';
			shoutBox.style.marginTop='3px';
			if(loc.indexOf('shout.deviantart.com')!=-1){
				var iB=shoutBox.nextSibling;
				var pN=shoutBox.parentNode;
				pN.insertBefore($E('br'),iB);
				parent.document.getElementsByTagName('frameset')[0].setAttribute('rows','20,*,75');
			}
			sbToolbar.apply(shoutBox);
		}else{
			var forms=document.getElementsByTagName('FORM');
			for(var i=0;i<forms.length;i++){
				if(forms[i].getAttribute('action')=='http://shout.deviantart.com/post'){
					var inputs=forms[i].getElementsByTagName('INPUT');
					for(var a=0;a<inputs.length;a++){
						if(inputs[a].getAttribute('type')=='text' && inputs[a].getAttribute('hasToolbar')!='true'){
							var sbToolbar=new Toolbar();
							sbToolbar.type='shoutbox';
							sbToolbar.LoadActive();
							inputs[a].style.width='100%';
							sbToolbar.tb.style.width='100%';
							inputs[a].style.marginTop='3px';
							sbToolbar.apply(inputs[a]);
						}
					}
				}
			}
		}
	},
	journal:function(){
		if(loc.indexOf('deviantart.com/journal')!=-1 && (loc.indexOf('enhancements')==-1) && (loc.indexOf('poll')==-1)){
			var txtSubject = $('subject');
			var ddlMood = $('moodid');
			var txtMood = $('mood');
			var txtSong = $('song');
			var txtBook = $('book');
			var txtMovie = $('movie');
			var txtHeader, txtFooter;
			var chkFlipHeader = $('flipheader');
			if(txtSubject) txtSubject.setAttribute('maxlength','50'); // WHY didn't they do this themselves?
			var txtBody;
			var textAreas=document.getElementsByTagName('TEXTAREA');
			for(var i=0;i<textAreas.length;i++){
				switch(textAreas[i].getAttribute('name')){
					case 'body': txtBody=textAreas[i]; break;
					case 'jheader': txtHeader=textAreas[i]; break;
					case 'jfooter': txtFooter=textAreas[i]; break;
				}
			}
			if(txtBody) txtBody.id='txtBody';
			if(txtBody  && Apply.body){
				var BodyToolbar = new Toolbar('body');
				BodyToolbar.LoadActive();
				BodyToolbar.apply(txtBody);
			}
			if(txtHeader && Apply.header){
				var HeaderToolbar = new Toolbar('header');
				HeaderToolbar.LoadActive();
				HeaderToolbar.apply(txtHeader);
			}
			if(txtFooter && Apply.footer){
				var FooterToolbar = new Toolbar('footer');
				FooterToolbar.LoadActive();
				FooterToolbar.apply(txtFooter);
			}
		}
	},
	shoutboard:function(){
		if(!Apply.shoutboard) return;
		if(loc.indexOf('journal/enhancements')!=-1){
			var shoutBoard=$('shoutboard');
			if(shoutBoard){
				var shoutBoardToolbar=new Toolbar('shoutboard');
				shoutBoardToolbar.LoadActive();
				shoutBoardToolbar.apply(shoutBoard);
			}
		}
	},
	descriptions:function(){
		if(!Apply.descriptions) return;
		if(loc.indexOf('www.deviantart.com/submit')!=-1 || (loc.indexOf('edit')!=-1 && loc.indexOf('title')!=-1)){
			var descBox=$('devdesc');
			if(descBox && Apply.descriptions){
				var descToolbar=new Toolbar('descriptions');
				descToolbar.LoadActive();
				descToolbar.apply(descBox);
			}
		}

		var btn=$('addtext_button');
		if(btn){
			btn.addEventListener('click', function(){
				window.setTimeout(function(){
					var txt=$('modalspace').getElementsByTagName('textarea')[0];
					var litToolbar = new Toolbar('literature');
					litToolbar.LoadActive();
					litToolbar.apply(txt);
				},500);
			},true);
		}

	},
	notes:function(){
		if(!Apply.notes) return;
		if(loc.indexOf('my.deviantart.com/notes')!=-1){
			var notebody=$('notebody');
			if(notebody.tagName.toLowerCase()=='a'){
				notebody.id='notebodyA';
				notebody=$('notebody');
			}
				
			if(notebody){
				var notesToolbar=new Toolbar('notes');
				notesToolbar.LoadActive();
				notesToolbar.apply(notebody)			
			}
		}
	},
	forums:function(){
		if(!Apply.forums) return;
		if(loc.indexOf('/journal/forum/')!=-1 || loc.indexOf('forum.deviantart.com')!=-1){
			var forumbody=$('commentbody');
			if(forumbody){
				var forumToolbar=new Toolbar('forums');
				forumToolbar.LoadActive();
				forumToolbar.apply(forumbody);
			}
		}
	},
	signatures:function(){
		if(!Apply.signature) return;
		if(loc.indexOf('deviantart.com/profile')!=-1){
			var sigBox=$('signature');
			if(sigBox){
				var sigToolbar=new Toolbar('signature');
				sigToolbar.LoadActive();
				sigToolbar.apply(sigBox);
			}
		}
	},
	comments:function(){
		if(!Apply.comments) return;
		var commentBoxes=document.getElementsByTagName('textarea');
		if(commentBoxes){
			for(var i=0;i<commentBoxes.length;i++){
				if(commentBoxes[i].id!='commentbody' && commentBoxes[i].className!=='text')
					continue;
				var commentToolbar=new Toolbar();
				commentToolbar.type='comments';
				commentToolbar.LoadActive();
				commentToolbar.apply(commentBoxes[i]);
			}
		}		
	},
	applyAll:function(){
		this.shoutbox();
		this.journal();
		this.shoutboard();
		this.descriptions();
		this.notes();
		this.forums();
		this.signatures();
		this.comments();
	}
}


Overrides.reply();
pageCheck.applyAll();

Timer.newTime('Applying custom styles.');

// ==== Make moods look right-ish ====
// In the message centre replies
aryStyleText.push('.talk-post .h td.f.rr{background-color:rgb(222, 232, 229)}');
// TODO: In replies for other areas of the site
// TODO: In normal comments (user pages, deviations, etc)
// TODO: In forums

aryStyleText.push('div.item div.item-body .dpToolbar{width:99%;}');
aryStyleText.push('dl.simple dd .dpToolbar{width:80%; _width:100%;}');
aryStyleText.push('dd.textarea textarea, dd.textarea .dpToolbar{width:100% !important;}');
aryStyleText.push('.dpToolbar{margin-bottom:-1px;overflow:hidden;font-size:13px;clear:both;height:auto; border-bottom:1px solid #8A9D93;background:#54695d url(http://dp.thezikes.org/Images/bg_04.png) repeat-x bottom right;}');
aryStyleText.push('div[type="body"].dpToolbar, div[type="header"].dpToolbar, div[type="footer"].dpToolbar{border-color:rgb(127, 157, 185); border-width:1px; border-style:solid; width:100%;}');
aryStyleText.push('div.thought .dpToolbar{border:none;border-bottom:1px solid rgb(157,177,176);width:100%}');
aryStyleText.push('.dpToolbar a.dpButton, .ButtonList a.dpButton{display:block !important;height:20px !important;width:25px !important;padding:0 !important;overflow:hidden !important;float:left;text-decoration:none !important;text-align:center !important;cursor:default !important;margin:2px 0 2px 2px !important;}');
aryStyleText.push('#btnPreview{width:80% !important;}');
aryStyleText.push('#dpMoodEmote{position:relative;left:30px;}');
aryStyleText.push('.Invisible{display:none;}');
aryStyleText.push('#HelpItems{height:350px;overflow:auto;border-style:solid;}');
aryStyleText.push('.ButtonInfo Strong{font-size:8pt !important; white-space: nowrap;}');
aryStyleText.push('.nowrap{font-size:8pt !important; white-space: nowrap;}');
aryStyleText.push('.nowrap input{width:auto !important;}');
aryStyleText.push('.ButtonInfo input, .ButtonInfo select{width:100%;}');
aryStyleText.push('#submit .submissionstep .dpToolbar{width:402px !important}');
aryStyleText.push('#HelpItems div{height:339px;margin-left:10px;padding:5px;overflow:auto;}');
aryStyleText.push('.dpButton{display:block !important;height:20px !important;width:25px !important;padding:0 !important;overflow:hidden !important;float:left;text-decoration:none !important;text-align:center !important;cursor:default !important;margin:2px 0 2px 2px !important}');
aryStyleText.push('.dpButton i{display:block; width:25px; height:20px; background-repeat:no-repeat; background-position:center center;}');

// Preferences Window Styles
aryStyleText.push('span#dpStatusMessage {display:none;position: absolute; right: 4px; top: 4px; background:#D6DED4; border:1px solid #000000; padding:2px; font-size:11px;z-index:225;}');
aryStyleText.push('#dpPrefsWindowTitle span{display:block; font-size:11pt; color:rgb(85,85,85); font-weight:normal;}');
aryStyleText.push('div.dpPrefsPage input[type="text"],#importArea input[type="text"], #ScrollingDiv textarea {padding:2px;font-size:12px;font-family:Verdana;-moz-border-radius: 4px !important;border:1px solid #6F7F74;}');
aryStyleText.push('#dpPrefsWindow{position:fixed; -moz-border-radius: 8px !important; background: url(http://st.deviantart.com/minish/main/bg-bubblb3.gif) repeat-x #BACAB8 0px -35px;  border:none; border-top:1px #BEC9BF solid; z-index:225; font-family:Verdana,sans-serif; font-size:9pt; font-size-adjust:none; font-style:normal; font-variant:normal; font-weight:normal; line-height:normal;}');
aryStyleText.push('#dpPrefsWindowTitle{text-align:left;width:100%;height:25px; padding:12px 20px 28px;color:#94a59b;color:#333333;font-family:Trebuchet MS; font-size:22px;font-weight:bolder;cursor:default;}')
aryStyleText.push('#dpPrefsWindowTitleClose{position:absolute;top:10px; right:10px;cursor:pointer;text-decoration:none !important}');
aryStyleText.push('#dpPrefsWindowTabBar{text-align:right;padding-top:1px;padding-left:10px !important; padding-right:10px !important; padding-bottom:1px;line-height:26px;background:transparent;height:25px;margin-top:-27px; border-bottom:#DDE5DC 1px solid;}');
aryStyleText.push('.dpPrefsTab{-moz-border-radius: 8px 8px 0px 0px !important;border:1px transparent solid;border-bottom:1px transparent solid !important;text-align:center; padding:5px 10px 5px 10px; cursor:pointer;text-decoration:none !important;}');
aryStyleText.push('.dpPrefsTab.active{font-weight:bolder; background:url(http://st.deviantart.com/minish/main/bg-bubblb.gif) repeat-x;border:1px #899E90 solid;border-bottom:1px #BACAB8 solid !important;cursor:default;}');
aryStyleText.push('#dpPrefsWindow a:link, #dpPrefsWindow a:visited{color:rgb(59, 90, 74) !important;}');
aryStyleText.push('#dpPrefsWindow p.yellow{border:1px solid #AEAF15; background-color:#FEFF7F; color:#4E4F05; padding:3px;}');
aryStyleText.push('#dpPrefsWindow p.yellow a:link, #dpPrefsWindow p.yellow a:visited{color:#5F5917 !important;}');
aryStyleText.push('#dpPageButtons{margin:0;padding:10px;padding-top:0 !important;}');

aryStyleText.push('#txtCustomDescription{width:250px !important; margin-left:97px; display:block;}');
aryStyleText.push('div#ScrollingDiv label[for*=txtCustomDescription]{margin-left:97px; text-align:left; width:80px}');
aryStyleText.push('div#ScrollingDiv label[for*=cbSubscriberOnly]{margin-left:97px;}');

aryStyleText.push('#tblCustomButtons{margin-top:7px !important;}');
aryStyleText.push('.scrollvert{overflow:auto;height:410px;display:block;}');
aryStyleText.push('#ScrollingDiv{margin:5px; margin-right:10px; position:relative;}');
aryStyleText.push('#tblCustomButtons textarea{width:100%;}');
aryStyleText.push('#tblCustomButtons, #tblCustomButtons td{margin:0; border:none; vertical-align:top;}');
aryStyleText.push('#tblCustomButtons label{padding-top:4px; padding-right:4px; font-weight:bold; width:94px; white-space:nowrap; text-align:right; font-size:12px;float:left; clear:both;}');
aryStyleText.push('#tblCustomButtons label+img{padding-top:4px;}');
aryStyleText.push('#tblCustomButtons label.ta{display:block; width:100%; white-space:nowrap; text-align:left; float:none;}');
aryStyleText.push('.MaxHeight{height:1000px;}');
aryStyleText.push('#trButtonTypeProperties .page{display:none;}');
aryStyleText.push('#trButtonTypeProperties .active{display:block !important;}');
aryStyleText.push('#txtCustomInsert{height:205px;}');
aryStyleText.push('#txtCustomSurroundRight, #txtCustomSurroundLeft{height:91px; margin-bottom:2px;}');
aryStyleText.push('#btnShowIcons{margin-bottom:4px;}');
aryStyleText.push('#cbSubscriberOnly{margin-top: 6px;}');
aryStyleText.push('.dpPrefsPage{display:none; margin:10px; position:relative;}');
aryStyleText.push('.dpPrefsPage.active{display:block;}');

aryStyleText.push('#dpPrefsWindow .loading{visibility: visible !important; background-image:url("http://dp.thezikes.org/Images/images/loading.gif"); background-position:50% 50%; background-repeat: no-repeat;}');

aryStyleText.push('#tblCustomButtons input[type="text"]{width:250px; margin-bottom:4px;}');

aryStyleText.push('#txtCustomIcon{background-position:2px center !important; background-repeat:no-repeat; background-color:#FFF !important; padding-top:4px !important; padding-left:30px !important; width:223px !important;}');

aryStyleText.push('#selActiveButtons, #selInactiveButtons{width:267px}');
aryStyleText.push('#selCustomButtons{width:165px;}');
aryStyleText.push('#txtImportCustom{width:400px}');
aryStyleText.push('#cornerBtns{float:right;}');
aryStyleText.push('#dpPrefsWindow #tblCustomButtons label.cb{float:none; text-align:left;padding-top:2px;font-size:11px; font-weight:normal; vertical-align:middle !important;}');
aryStyleText.push('#dpPrefsWindow #tblCustomButtons input[type="checkbox"]{margin-bottom:0;vertical-align:middle !important;}');

aryStyleText.push('#IconList{-moz-border-radius: 0px 0px 4px 4px !important;border:1px solid #6F7F74;border-top:dotted 1px #6F7F74 !important;position:absolute;background-color:#FFF; overflow:auto;}');
aryStyleText.push('#IconList .IconItem{height:27px; line-height:27px;}');
aryStyleText.push('#IconList .IconItem:hover{background:url(http://dp.thezikes.org/Images/bgmenubuttonvn3.png); color:#FFF; cursor:pointer; font-weight:bolder;}');
aryStyleText.push('#IconList .IconItem img{vertical-align:middle; margin:0 2px 3px 5px;}');

// Preferences window button list styles
aryStyleText.push('#listButtons{width:250px; height:380px; border-left:1px solid rgb(148, 160, 155); border-bottom:1px solid rgb(148, 160, 155);overflow:auto; margin-bottom:4px; clear:both; overflow-x:hidden; background-color:#D3DCD1;}');
aryStyleText.push('#listButtons .icon{position:absolute; top:0; left:0; display:block; width:25px; height:20px; background-position:center center; background-repeat:no-repeat;}');
aryStyleText.push('#listButtons .row{font-size:11px;line-height:1.3em; border-top:1px solid rgb(148, 160, 155); margin-bottom:-1px; padding:3px 3px 3px 24px !important;white-space:nowrap; position:relative; min-height:1.4em; color:#555; overflow-x:hidden; width:208px;}');
aryStyleText.push('#listButtons .row strong{font-size:12px; margin-bottom:4px; color:#000}');
aryStyleText.push('#listButtons .row img{position:absolute; top:3px;}');
aryStyleText.push('#listButtons .row:hover{background-color:#C5D3C3;}');
aryStyleText.push('#listButtons .row:hover span, #listButtons .row.selected span {display:block;}');
aryStyleText.push('#listButtons .row.selected{background-color:#4C85CC; border-color:#3A74C1; color:#ACE;}');
aryStyleText.push('#listButtons .row.selected strong{color:#FFF;}');
aryStyleText.push('#listButtons .row div.fade{background:url(http://dp.thezikes.org/Images/faderm2.png) repeat-y transparent; height:100%; width:25px; position:absolute; top:0px; right:0px; bottom:0px;}');
aryStyleText.push('#listButtons .row:hover div.fade{background-image:url(http://dp.thezikes.org/Images/fadehoverxo1.png);}');
aryStyleText.push('#listButtons .row.selected div.fade{background-image:url(http://dp.thezikes.org/Images/fadebluerj2.png);}');

aryStyleText.push('#listButtons .row span {cursor:pointer !important; display:none; position:absolute; top:5px; height:12px; width:20px; background:url(http://download.botdom.com/j8icy/modbuttons.gif) no-repeat;}');

aryStyleText.push('#listButtons .row span.delete { right:5px; background-position: -40px 0px;}');
aryStyleText.push('#listButtons .row span.delete:hover {background-position:-40px -12px;}');
aryStyleText.push('#listButtons .row span.delete:active {background-position:-40px -24px;}');
aryStyleText.push('#listButtons .row.selected span.delete {background-position:-140px 0px;}');
aryStyleText.push('#listButtons .row.selected span.delete:hover {background-position:-140px -12px;}');
aryStyleText.push('#listButtons .row.selected span.delete:active {background-position:-140px -24px;}');

aryStyleText.push('#listButtons .row span.movedown { right:25px; background-position: -20px 0px;}');
aryStyleText.push('#listButtons .row span.movedown:hover {background-position:-20px -12px;}');
aryStyleText.push('#listButtons .row span.movedown:active {background-position:-20px -24px;}');
aryStyleText.push('#listButtons .row.selected span.movedown {background-position:-120px 0px;}');
aryStyleText.push('#listButtons .row.selected span.movedown:hover {background-position:-120px -12px;}');
aryStyleText.push('#listButtons .row.selected span.movedown:active {background-position:-120px -24px;}');

aryStyleText.push('#listButtons .row span.moveup { right:45px; background-position: 0px 0px;}');
aryStyleText.push('#listButtons .row span.moveup:hover {background-position:0px -12px;}');
aryStyleText.push('#listButtons .row span.moveup:active {background-position:0px -24px;}');
aryStyleText.push('#listButtons .row.selected span.moveup {background-position:-100px 0px;}');
aryStyleText.push('#listButtons .row.selected span.moveup:hover {background-position:-100px -12px;}');
aryStyleText.push('#listButtons .row.selected span.moveup:active {background-position:-100px -24px;}');

aryStyleText.push('#listButtons .row span.active { right:68px; background-position: -60px 0px;}');
aryStyleText.push('#listButtons .row span.active:hover {background-position:-60px -12px;}');
aryStyleText.push('#listButtons .row span.active:active {background-position:-60px -24px;}');
aryStyleText.push('#listButtons .row.selected span.active {background-position:-160px 0px;}');
aryStyleText.push('#listButtons .row.selected span.active:hover {background-position:-160px -12px;}');
aryStyleText.push('#listButtons .row.selected span.active:active {background-position:-160px -24px;}');

aryStyleText.push('#listButtons .row span.active.disabled { background-position: -80px 0px;}');
aryStyleText.push('#listButtons .row span.active.disabled:hover {background-position:-80px -12px;}');
aryStyleText.push('#listButtons .row span.active.disabled:active {background-position:-80px -24px;}');
aryStyleText.push('#listButtons .row.selected span.active.disabled {background-position:-180px 0px;}');
aryStyleText.push('#listButtons .row.selected span.active.disabled:hover {background-position:-180px -12px;}');
aryStyleText.push('#listButtons .row.selected span.active.disabled:active {background-position:-180px -24px;}');

aryStyleText.push('#btnReset{float:left;}');

GM_addStyle(aryStyleText.join('\n'))

GM_registerMenuCommand('deviantPLUS Preferences', showPrefs)

Timer.newTime('Custom styles applied')

Timer.totalTime();