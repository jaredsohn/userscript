// ==UserScript==
// @name           Fusefly Chat stuffs
// @namespace      http://userscripts.org/users/44197
// @include        http://www.fusefly.com/pg/chat/
// @require        http://userscripts.org/scripts/source/49700.user.js
// ==/UserScript==
(function()
{
// nick options
/*
if(typeof GM_config !== 'undefined') {
GM_config.init('Configuration for Personal Data',{
  name:    { label: 'Name:', type: 'text', cols:50, default: 'John Doe' },
  age :    { label: 'Age:', type: 'int', default: 21 },
  gender:  { label: 'Gender:', title: 'Are you a guy - or a girl?', type: 'radio', options:['Male','Female'], default: 'Male' },
});
GM_registerMenuCommand('Fusefly Chat Cfg', GM_config.open);
}*/
var arrNick = ["caleb", "notcaleb", "calibius"];
var prefNick = arrNick[0];
var overrideNick = false; // if true: will change nick to preferred on refresh even if not default

var arrActions = [
{'name':'cry','action':'/me cries.', 'auto':true},
{'name':'crazy dance','action':'/me dances crazily!', 'auto':true},
{'name':'confused','action':'/me is confused!', 'auto':true},
{'name':'dance','action':'/me dances!', 'auto':true},
{'name':'facepalm','action':'/me facepalms!', 'auto':true},
{'name':'scream','action':'/me screams!', 'auto':true},
{'name':'sigh','action':'/me sighs...', 'auto':true},
{'name':'slaps %s','action':'/me slaps %s', 'auto':true},

];

//Array for leave or join options
var arrLeaveJoin = [
{'name':'leave','action':'/leave', 'auto':true},
{'name':'fake timeout','action':'/leave "ch" "Fusefly Lounge" "timeout"', 'auto':true},
{'name':'reason','action':'/leave "ch" "Fusefly Lounge" ""', 'auto':false},
{'name':'main','action':'/join Fusefly Lounge', 'auto':true},
{'name':'myroom','action':'/join myroom', 'auto':true},

];

function create() {
    switch(arguments.length) {
        case 1:
            var A = document.createTextNode(arguments[0]);
	    break;
        default:
            var A = document.createElement(arguments[0]),
                B = arguments[1];
            for (var b in B) {
	        if (b.indexOf("on") == 0)
		    A.addEventListener(b.substring(2), B[b], false);
		else if (",style,accesskey,id,name,src,href,which".indexOf(","+b.toLowerCase())!=-1)
		    A.setAttribute(b, B[b]);
		else
		    A[b] = B[b];
            }
            for(var i = 2, len = arguments.length; i < len; ++i)
	        A.appendChild(arguments[i]);
    }
    return A;
}
function $x1(xpath,root){return document.evaluate(xpath,(root?root:document),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;}

function $c1(className,root){
	if (document.getElementsByClassName) {
		return root ? root.getElementsByClassName(className)[0] : document.getElementsByClassName(className)[0];
	} else {
		return $x1('//*[contains(@class,"'+className+'")][1]',root);
	}
}
if(typeof GM_addStyle == 'undefined') 
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        style.textContent = css;
        head.appendChild(style);
    }
function getInputValue(split,i) {
	var x = document.getElementById("pfc_words").value;
	if(split !== '' && i !== '') {
		x = x.split(split)[i];
	}
	return x;
}
function sendMsg(msg, auto) { 
if (!msg) return;
var input = document.getElementById("pfc_words");

	if(msg.toString().match(/%s/gi) !== null) { //check for %s in msg
		var x = getInputValue(', ', 0);
		GM_log("|"+x+"|");
		if(x !== '') { 
			msg = msg.toString().replace(/%s/gi, x);
		} else {return ;}
	
		
	//pfc.insert_text() ??
	} else{input.value = "missing name in commandbox";}
	input.value = msg;
	if (auto == 'true') {
		unsafeWindow.pfc.doSendMessage(); 
	}
}


var defaultNick = $c1('user_mini_avatar').parentNode.href.split( '/' );

function _nick() {
	var currentNick = document.getElementById('pfc_handle').textContent;
	var n;
	if(overrideNick == true && currentNick !== prefNick) { 
		// override nick is set, current nick isn't what we want.
		n = prefNick; //set nick to what we want
	} else if (currentNick == defaultNick[5]) {
		n = prefNick;
    } else { n = false; }
	if (n !== false) { 
		sendMsg('/nick ' + n);
		//GM_log('/nick ' + n)
	}
}

function _btns () {
	var input = document.getElementById("pfc_words");
	var btn = document.getElementById('pfc_cmd_container');
	if (btn) {
	
	GM_addStyle('.pfc_btn a {padding-right: 2px !important; padding-left:2px !important; border-right:1px solid black !important;}');
	
		/**************** join controls *****************/
	
		/*btn.appendChild(create('div', { className: 'pfc_btn' , id: 'ff_joinMain'}));
		document.getElementById('ff_joinMain').appendChild(create('a', {	textContent: 'main', href: '#', onclick: function(e) { sendMsg("/join Fusefly Lounge");  e.preventDefault(); } } ));*/
		
		/**************** leave/join controls *****************/
		
		btn.appendChild(create('div', { className: 'pfc_btn' , id: 'ff_leaveJoin'}));
		document.getElementById('ff_leaveJoin').appendChild(create('select', {id: 'ff_sLeaveJoin', onchange: function(e) { var chosenoption=this.options[this.selectedIndex]; sendMsg(chosenoption.value, chosenoption.id);}}));
		
		var sLeaveJoin = document.getElementById('ff_sLeaveJoin');
		
		document.getElementById('ff_leaveJoin').appendChild(create('button', {id: 'go', textContent:'go', onclick: function(e) { var chosenoption=sLeaveJoin.options[sLeaveJoin.selectedIndex];	 sendMsg(chosenoption.value, chosenoption.id); e.preventDefault (); }}));
		
		for (var i=0; i<arrLeaveJoin.length; i++) {
			sLeaveJoin.appendChild(create('option', {textContent: arrLeaveJoin[i].name, value: arrLeaveJoin[i].action, id: arrLeaveJoin[i].auto}));
		}
		
		/**************** nickname controls *****************/		
		if (arrNick.length > 0) {
			btn.appendChild(create('div', { className: 'pfc_btn' , id: 'ff_nick'}));
			document.getElementById('ff_nick').appendChild(create('select', {	id: 'ff_sNick', onchange: function(e) { var chosenoption=this.options[this.selectedIndex]; sendMsg(chosenoption.value, chosenoption.id);  e.preventDefault(); } } ));
		}
		
		var sNick = document.getElementById('ff_sNick');
		
		document.getElementById('ff_nick').appendChild(create('button', {id: 'go', textContent:'go', onclick: function(e) { var chosenoption=sNick.options[sNick.selectedIndex];	 sendMsg(chosenoption.value, chosenoption.id); e.preventDefault (); }}));
		
		for (var i=0; i<arrNick.length; i++) {
			sNick.appendChild(create('option', {textContent: arrNick[i], value: "/nick " + arrNick[i], id: arrNick[i].auto}));
		}
		/**************** actions *****************/
		
		btn.appendChild(create('div', { className: 'pfc_btn' , id: 'ff_actions'}));
		
		document.getElementById('ff_actions').appendChild(create('select', {id: 'ff_sActions', onchange: function(e) { var chosenoption=this.options[this.selectedIndex];  sendMsg(chosenoption.value, chosenoption.id);}}));
		
		var sActions = document.getElementById('ff_sActions');
		
		document.getElementById('ff_actions').appendChild(create('button', {id: 'go', textContent:'go', onclick: function(e) {
		var chosenoption=sActions.options[sActions.selectedIndex];
		 sendMsg(chosenoption.value, chosenoption.id);
		e.preventDefault();
		}
	}));
		
		for (var i=0; i<arrActions.length; i++) {
			sActions.appendChild(create('option', {textContent: arrActions[i].name, value: arrActions[i].action, id:arrActions[i].auto}));
		}
			
	} else {
		GM_log('oops');
	}
}


/*
var i = 0;
function _init(){
var x = document.getElementById('pfc_words');
GM_log('init');
	if (!x) {window.setTimeout(_init(), 100); return;}
	_btn(); _nick();
	}
	window.setTimeout(_init(), 100);*/

	
/*
do
  {
 
  window.setTimeout(function() {GM_log(document.getElementById("pfc_words")+ " i");}, 100);
  i++;
  }
while (document.getElementById('pfc_words') == null);
*/

//window.setTimeout(function() {GM_log(document.getElementById("pfc_words")+ " 8000");}, 8000);

window.setTimeout(function() {
_btns(); _nick();
}, 5000);
}) ();