scr_meta=<><![CDATA[
// ==UserScript==
// @name           Google Main Page Cleaned Up
// @version        1.9
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// @exclude        http://www.google.*/*q=*
// ==/UserScript==
]]></>.toString();

// addGlobalStyle
function addGlobalStyle(css) {
	if(typeof GM_addStyle=='function') GM_addStyle(css);
    else if((head=document.getElementsByTagName('head')[0])) {
    var style = document.createElement('style');
    style.setAttribute('type', 'text/css');
	style.innerHTML=css;
    head.appendChild(style);
	}
}

// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// See script page for syntax examples: http://userscripts.org/scripts/show/51532
function $g(que, obj) {
if(!que || !(que=que.replace(/^\s+/,''))) return;
var obj=(obj?obj:({del:false,type:6,node:document})), r,
	class_re=/^\.[A-Za-z0-9-_]/, id_re=/^\#[^\s]/, xp_re=/^\.?(\/\/|count|id)\(?[A-Za-z0-9\'\"]/;
if(!que || typeof que!='string' || que=='') return false;
else if(id_re.test(que)) {
var s=que.split(' '), r=new Array();
for(var n=0;n<s.length;n++) r.push(document.getElementById(s[n].substring(1)));
if(r.length==1) r=r[0];
} else if(xp_re.test(que)) {
r = document.evaluate(que,(obj['node']||document),null,(obj['type']||6),null);
switch((obj['type']||6)){case 1:r=r.numberValue;break;case 2: r=r.stringValue;break;case 3:r=r.booleanValue;break;case 8:case 9:r=r.singleNodeValue;break;}
} else if(class_re.test(que)) {
var expr='', s=que.split(' ');
for(var n=0;n<s.length && s[n].indexOf('.')==0;n++) expr+="@class='"+s[n].substring(1)+"' or ";
r = document.evaluate("//*["+expr.replace(/( or )$/,'')+"]",document,null,6,null);
if(r.snapshotLength==1) r=r.snapshotItem(0);
} else r = document.createElement('div');
if(obj['del']===true && r) {
if(r.nodeType==1) r.parentNode.removeChild(r);
else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
} else return r;
}


$g("#footer", {del:true});
$g("//font", {del:true});


 // Variable block
var AnotherAutoUpdater = {
 id: '61665',
 
 // Static block
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      return false;
    }
    if ( +this.xversion > +this.version ) {
      GM_setValue('updated_'+this.id, this.time+'');
	  var answer = confirm ("Update available for №"+this.id+"\n\nPress 'ОК' to update the script")
	  if (answer)
      top.location.href = 'http://userscripts.org/scripts/source/'+this.id+'.user.js';
    }
  },
  check: function() {
      if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60)) {
        GM_setValue('updated_'+this.id, this.time+'');
	this.call();
      }
  }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();
