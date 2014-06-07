scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           Redirect to autologin
// @namespace      http://rokdd.de
// @exlude         *deviantart.com/* 
// @version        0.2.9.2
// @include        *
//
// @description    Redirects automatically in a new tab to login pag
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below

if(Number(new Date())-Number(GM_getValue('mngmt-status','0'))>60*30*12*1000)
{
var arrAll = GM_listValues();
for (var i = 0; i < arrAll.length; i++) {

if(((arrAll[i]!='updated')||(arrAll[i]!='mngmt-status'))&&(Number(new Date())-Number(GM_getValue(arrAll[i]))>5*24*60*30*1000))
{
GM_deleteValue(arrAll[i]);
}
}
}
GM_setValue('mngmt-status',String(new Date().getTime()));

function isset(varname)  {
if(typeof( window[ varname ] ) != "undefined") return true;
else return false;
}
function melden(input) {
var newPopup = document.createElement('div');
//newPopup.id='rokdd_alert';
newPopup.setAttribute('class','rokdd_alert');
newPopup.textContent=input;
document.body.insertBefore(newPopup, document.body.firstChild);
newPopup.addEventListener('click',function(){
this.parentNode.removeChild(this);
},false);
}

function addGlobalStyle(css) {
//this is from greasemonkey example page - thanks
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
head.appendChild(style);
}

function gugg(a,searchword)
{
//alert(searchword);
searchword=searchword.replace(/&nbsp;/g, "");
searchword=searchword.replace(/<&#91;^>&#93;*>/g, "");
for(var i=0;i<a.length;i++)
{
if((searchword.match(new RegExp(a[i],'i')))&&(searchword.length-a[i].length<4))
{
return true;
}
}
return false;
}


var loginWords=new Array('Login','login','Entra','Einloggen','Sign in', 'Anmelden','log in');
var strxp='';
for(var i=0;i<loginWords.length;i++)
  {
  if(i>0)
    strxp+=" or ";
  strxp+="contains(text(),'"+loginWords[i]+"')";
  }

var alertstr='';
var popUP=null;

if(Number(new Date())-Number(GM_getValue('forward-'+location.hostname,'0'))>60*30*1000)
{
var allElements;
allElements = document.evaluate("//a[@href and ("+strxp+")]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,   null);
for (var i = 0; i < allElements.snapshotLength; i++) {

test = allElements.snapshotItem(i);
if(gugg(loginWords,test.innerHTML))
{   
var allElementsf;
allElementsf = document.evaluate("//input[@type='password']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,   null);
if(allElementsf.snapshotLength>0)
    {
    alertstr='password input also here!';
    break;
    }
else
  {
  addGlobalStyle('a:visited { background-repeat: repeat-y !important;');
  addGlobalStyle('#rokdd_alert, .rokdd_alert { border: 1px dotted rgb(255, 0, 0); padding: 3px; cursor: pointer; position: absolute; z-index: 99999; top: 15px; right: 15px; background-color: rgb(255, 238, 238); color: rgb(255, 0, 0); }');
  var te = getComputedStyle(test,'');
  var te2 = te.getPropertyValue("background-repeat");
  if((te2.match('repeat-y'))||(te.color.match('purple')))
    {
    melden('Login...');
    var zeit = new Date().getTime();
    GM_setValue('forward-'+location.hostname,String(zeit));
    var ifr1 = document.createElement('iframe');
    ifr1.src = test.href;
    document.body.appendChild(ifr1);
    break;
    }
  else
    {
    alertstr='not visited yet';
    }
  }
}
//forschleife
}
if((isset(alertstr)===true) && (alertstr.length>1))
{
var zeit = new Date().getTime();
GM_setValue('forward-'+window.location.host,String(zeit));
addGlobalStyle('#rokdd_alert, .rokdd_alert { border: 1px dotted rgb(255, 0, 0); padding: 3px; cursor: pointer; position: absolute; z-index: 999999; top: 15px; right: 15px; background-color: rgb(255, 238, 238); color: rgb(255, 0, 0); }');
melden('Found login, but '+alertstr);
}
}

AnotherAutoUpdater = {
  // Config values, change these to match your script
 id: '40532', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks
// Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
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
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();