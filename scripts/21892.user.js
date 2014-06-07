// ==UserScript==
// @name           VoipBuster addressbook
// @namespace      http://menno.b10m.net/greasemonkey/
// @description    Forget about those phone numbers!
// @include        https://myaccount.voipbuster.com/clx/webcalls2.php
// @version 1.1
// ==/UserScript==

// JSON minified (from http://www.json.org/json.js) ///////////////////////
if(!Object.prototype.toJSONString){Array.prototype.toJSONString=function(w){var a=[],i,l=this.length,v;for(i=0;i<l;i+=1){v=this[i];switch(typeof v){case'object':if(v&&typeof v.toJSONString==='function'){a.push(v.toJSONString(w));}else{a.push('null');}break;case'string':case'number':case'boolean':a.push(v.toJSONString());break;default:a.push('null');}}return'['+a.join(',')+']';};Boolean.prototype.toJSONString=function(){return String(this);};Date.prototype.toJSONString=function(){function f(n){return n<10?'0'+n:n;}return'"'+this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z"';};Number.prototype.toJSONString=function(){return isFinite(this)?String(this):'null';};Object.prototype.toJSONString=function(w){var a=[],k,i,v;if(w){for(i=0;i<w.length;i+=1){k=w[i];if(typeof k==='string'){v=this[k];switch(typeof v){case'object':if(v){if(typeof v.toJSONString==='function'){a.push(k.toJSONString()+':'+v.toJSONString(w));}}else{a.push(k.toJSONString()+':null');}break;case'string':case'number':case'boolean':a.push(k.toJSONString()+':'+v.toJSONString());}}}}else{for(k in this){if(typeof k==='string'&&Object.prototype.hasOwnProperty.apply(this,[k])){v=this[k];switch(typeof v){case'object':if(v){if(typeof v.toJSONString==='function'){a.push(k.toJSONString()+':'+v.toJSONString());}}else{a.push(k.toJSONString()+':null');}break;case'string':case'number':case'boolean':a.push(k.toJSONString()+':'+v.toJSONString());}}}}return'{'+a.join(',')+'}';};(function(s){var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};s.parseJSON=function(filter){;var j;function walk(k,v){var i,n;if(v&&typeof v==='object'){for(i in v){if(Object.prototype.hasOwnProperty.apply(v,[i])){n=walk(i,v[i]);if(n!==undefined){v[i]=n;}}}}return filter(k,v);}if(/^[\],:{}\s]*$/.test(this.replace(/\\./g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(:?[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+this+')');return typeof filter==='function'?walk('',j):j;}throw new SyntaxError('parseJSON');};s.toJSONString=function(){if(/["\\\x00-\x1f]/.test(this)){return'"'+this.replace(/[\x00-\x1f\\"]/g,function(a){var c=m[a];if(c){return c;}c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}return'"'+this+'"';};})(String.prototype);}
///////////////////////////////////////////////////////////////////////////

// Initial values /////////////////////////////////////////////////////////
var ournumber   = document.getElementById('anrphonenr');
var theirnumber = document.getElementById('bnrphonenr');

ournumber.value = GM_getValue('ournumber', '');
document.getElementById('callbutton').disabled = false;
///////////////////////////////////////////////////////////////////////////

// Load existing addressbook //////////////////////////////////////////////
var addressbook;
eval('addressbook = ' + GM_getValue('addressbook', '{a:[]}'));
///////////////////////////////////////////////////////////////////////////

// Create dropdown list ///////////////////////////////////////////////////
var dropdown = document.createElement('select');
    dropdown.id = 'dropdown';
theirnumber.parentNode.insertBefore(dropdown, theirnumber.nextSibling);
for(var x=0;x<addressbook.a.length;x++) {
   var el = document.createElement('option');
       el.text  = addressbook.a[x].na;
       el.value = addressbook.a[x].no;
   _add_to_dropdown(dropdown,el);
}
GM_addStyle("#dropdown { font-size: 12px; margin-left: 10px; font-family: Arial,Helvetica,sans-serif; }");
///////////////////////////////////////////////////////////////////////////

// Create status bar //////////////////////////////////////////////////////
var footer 	 = document.getElementById('footer');
var mystatus     = document.createElement('span');
mystatus.className = 'mystatus';
mystatus.innerHTML = 'VoipBuster addressbook loaded';
footer.appendChild(mystatus);
GM_addStyle(".mystatus { float: left; padding-top: 7px; color: #ffffff}");
///////////////////////////////////////////////////////////////////////////

// Event Listeners ////////////////////////////////////////////////////////
dropdown.addEventListener('change', function(event) {
   theirnumber.value = dropdown.options[dropdown.selectedIndex].value;
   _status("Selected "+dropdown.options[dropdown.selectedIndex].text+"'s number");
}, true);

ournumber.addEventListener('change', function(event) {
   GM_setValue('ournumber', ournumber.value);
   _status("Storing our number: "+ournumber.value);
}, true);

theirnumber.addEventListener('change', function(event) {
   _status("Checking if the number exists");
   if(!_in_addressbook(addressbook,theirnumber.value)) {
      _status("Number is new, prompting for name now");
      var name = prompt("Whose phone number is this ("+
      			theirnumber.value+
			") ?\n(press cancel to ignore this number)");
      if(name) {
	 addressbook.a.push({'no': theirnumber.value, 'na': name});
	 _store_addressbook(addressbook);

	 var el = document.createElement('option');
             el.text  = name;
             el.value = theirnumber.value;
   	 _add_to_dropdown(dropdown,el);

         _status("New number for "+name+" ("+theirnumber.value+") stored");
      } else {
         _status("Ignoring "+theirnumber.value);
      }
   } else {
      _status(theirnumber.value+" already exists in addressbook");
   }
}, true);
///////////////////////////////////////////////////////////////////////////

// Helper Functions ///////////////////////////////////////////////////////
function _status(txt) {
   mystatus.innerHTML = txt;
}

function _store_addressbook(addressbook) {
   var addressbookJSON = addressbook.toJSONString();
   GM_setValue('addressbook', addressbookJSON);
}

function _in_addressbook(addressbook,number) {
   for(var x=0; x<addressbook.a.length; x++) {
      if(addressbook.a[x].no == number)
         return true;
   }
   return false;
}

function _add_to_dropdown(dropdown,el) {
   dropdown.add(el,null);
}
///////////////////////////////////////////////////////////////////////////
