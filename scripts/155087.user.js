// ==UserScript==
// @name           Omnivore
// @namespace      http://kol.cmeister2.co.uk
// @description    Highlights food and drink that you haven't eaten yet. Version 0.2
// @include        http://*kingdomofloathing.com/main.php
// @include        http://*kingdomofloathing.com/inventory.php*
// @include        http://*kingdomofloathing.com/showconsumption.php*
// ==/UserScript==
// Version 0.2 Changed a load of code around, added last consumed field
// Version 0.1 Started this file

const ITEMDB_URL = "kol.cmeister2.co.uk/items/?mode=fooddrink";

Array.prototype.in_array = function(search_term) {
	var i = this.length;
	if(i > 0) do{if(this[i] === search_term)return true;}while(i--);
	return false;
}

function docval(path,node){
	return document.evaluate(path,node,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

function getElementByXPathNode(path,node){
	tmp = docval(path,node);
	if(tmp.snapshotLength==0){return null;}else{return tmp.snapshotItem(0);}
}

function getElementsByXPathNode(path,node){
	tmpa = [];
	tmp = docval(path,node);
	if(tmp.snapshotLength==0){
		return null;
	}else{
		for(var i = 0; i < tmp.snapshotLength; i++) tmpa.push(tmp.snapshotItem(i));
		return tmpa;
	}
}

function getElementByXPath(path){return getElementByXPathNode(path,document);}
function getElementsByXPath(path){return getElementsByXPathNode(path,document);}
function elem(name, attrs, style, text, htmlflag) {
    var e = document.createElement(name);
    if(attrs){
        for(key in attrs){
			switch(key){
				case 'class': e.className = attrs[key]; break;
				case 'id': e.id = attrs[key]; break;
				default: e.setAttribute(key, attrs[key]);
			}
        }
    }
    if(style) {
		var i,ltr,key2;
        for(key in style){
			key2 = key;
			i=key2.indexOf('-');
			while(i+1){
				ltr=key2.substr(i+1,1);
				key2 = key2.replace(new RegExp('-'+ltr,'g'),ltr.toUpperCase());
				i=key2.indexOf('-');
			}
			e.style[key2]=style[key];
		}
    }
    if(text){
		if(htmlflag){
			e.innerHTML = text;
		}else{
			e.appendChild(document.createTextNode(text));
		}
	}
    return e;
}

function debug(x){ if(true) GM_log(x); }

function GM_get(dest, callback){
//Wrapper
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://' + dest,
		onload:function(details) {
			if(details.status==200){	//Custom - fails if 304
				if( typeof(callback)=='function' ){
					callback(details.responseText);
				}
			}
		}
	});
}

function updatedb(){
	var lastupdated = GM_getValue('lastUpdate',0);
	var version = GM_getValue('version',0);

	var now = (new Date()).getTime()/1000; //make unix timestamp

	if( (now - lastupdated) > 60*60*24 ){	//have we checked today?
		debug('Checking item db');
		GM_get(ITEMDB_URL+'&version='+version,function(response){
			if(response!=''){			//we get here if our version is not current
				debug('Saving database to Greasemonkey');
				GM_setValue('itemdb',response);
				if(m=(/"version":"(\d+)"/).exec(response)){
					GM_setValue('version',m[1]);
				}
			}
			updateconsumed();
		});
		x=Math.floor((new Date()).getTime()/1000);
		GM_setValue('lastUpdate',x);
	}else{
		updateconsumed();
	}
}

function getdb(){
	//Simple function to load itemdb from config and return as an object
	var tmp = GM_getValue('itemdb','');
	if(tmp!=''){
		var itemdb = eval('('+tmp+')');
		return itemdb;
	}else{
		return false;
	}
}

function GetDomain(){ return window.location.host; }

function jNum(x){
	//returns only numerics in x
	tmp = x.replace(/[^0-9]/g,'');
	return (tmp)?tmp:0;
}

function updateconsumed(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://' + GetDomain() + '/showconsumption.php',
		onload:function(details) {
			synclist(details.responseText);
		}
	});
}

function synclist(response){
	debug('Got consumption data');
	var m = response.match(/descitem\(\d+\)/g);
	var consumed = [];
	for(i=0;i<m.length;i++) consumed[i]=jNum(m[i]);
	strn = consumed.join(':');
	GM_setValue('consumed',strn);

	var itemdb = getdb();
	var unconsumed = new Array();
	for(a in itemdb.items){
		if(!consumed.in_array(a))
			unconsumed.push(a);	
	}
	strn = unconsumed.join(':');
	GM_setValue('unconsumed',strn);
}

function highlight(){
	strn = GM_getValue('unconsumed','');
	var unconsumed = strn.split(/:/);
	for(var i=0,n=unconsumed.length;i<n;i++){
		itemid = unconsumed[i];
		if(img = getElementByXPath('//img[contains(@onclick,"'+itemid+'")]')){
			img.style.border = "2px solid red";
		}
	}
}

function lX(x){return x<10?'0'+x:x;}

function mdate(strfmt){
	var content = '';
	var c = new Date();
	for(var i=0,n=strfmt.length;i<n;i++){
		chrfmt = strfmt.charAt(i);
		switch(chrfmt){
			case '\\':	i++; content += strfmt.charAt(i);	break;
			case 'd':	content += lX(c.getDate());			break;
			case 'm':	content += lX(c.getMonth()+1);		break;
			case 'Y':	content += c.getFullYear();			break;
			case 'H':	content += lX(c.getHours());		break;
			case 'i':	content += lX(c.getMinutes());		break;
			case 's':	content += lX(c.getSeconds());		break;
			default: content += chrfmt; break;
		}
	}
	return content;
}

function checkjustused(){
	//Gets the item we just consumed, if any
	var justconsumed = GM_getValue('justconsumed',0);
	if(justconsumed){
		GM_setValue('justconsumed',0);
		//Firstly, check for an error
		x = getElementByXPath('//blockquote[contains(.,"You\'re too full to eat that")]');
		if(x){ debug('Too full!'); return; }

		x = getElementByXPath('//blockquote[contains(.,"You\'re way too drunk already.")]');
		if(x){ debug('Too drunk!'); return; }
		
		//We must have been ok!
	
		//Record this time for posterity
		var dt = mdate('Y/m/d H:i:s');

		GM_setValue('lc'+justconsumed,dt);

		strn = GM_getValue('unconsumed','');
		var unconsumed = strn.split(/:/);
		if(unconsumed.in_array(justconsumed)){

			strn = GM_getValue('consumed','');
			var consumed = strn.split(/:/);
			consumed.push(justconsumed);
			strn = consumed.join(':');

			GM_setValue('consumed',strn);

			//Synclist
			var itemdb = getdb();
			var unconsumed = [];
			for(a in itemdb.items){
				if(!consumed.in_array(a)){
					unconsumed.push(a);
				}
			}
			strn = unconsumed.join(':');
			GM_setValue('unconsumed',strn);
		}
	}
}

function isinventory1(){
	return !!getElementByXPath('//font[contains(.,"Food and Drink")]');
}

function clickhandler(e){
	var target = e.target;
	if(target.tagName!='A')return;

	var atc = target.textContent;
	
	if(atc.indexOf('eat')<0 && atc.indexOf('drink')<0 && atc.indexOf('chug')<0)return;
	//This was a food link.

	i=10;
	do{
		if(target.tagName=='TD')break;
		target = target.parentNode;
	}while(target && --i)
	if(!i || !target)return;
	//Got links parent td

	//Get previous TD, should contain image
	var prevTD = target.previousSibling;
	var iH = prevTD.innerHTML;

	if(match = iH.match(/descitem\((\d+)\)/)){
		GM_setValue('justconsumed',match[1]);
	}
}
function displaytimes(){
	var trs = getElementsByXPath('//a/parent::td/parent::tr');
	var iH,lc;
	
	for(i=0,n=trs.length;i<n;i++){
		iH = trs[i].innerHTML;
		if(match = iH.match(/descitem\((\d+)\)/)){
			lc = '&nbsp;&nbsp;&nbsp;&nbsp;'+GM_getValue('lc'+match[1],'n/a');
			trs[i].appendChild(elem('td',null,null,lc,1));
		}
	}
}

switch(window.location.pathname){
	case '/main.php':
		updatedb();
		break;

	case '/inventory.php':
		if(!isinventory1()) break;

		checkjustused();
		highlight();

		//Add Click Handler
		document.addEventListener('click',clickhandler,false);
		break;

	case '/showconsumption.php':
		synclist(document.body.innerHTML);
		displaytimes();

		break;
}