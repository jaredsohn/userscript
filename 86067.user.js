scr_meta=<><![CDATA[
// ==UserScript==
// @name           Chatvarnish
// @description    Una ventana de chat conectada con el canal del chat de los Mártires de VArnish aparecerá bajo la batalla.
// @namespace      http://www.erepublik.com/es/citizen/profile/1541111
// @include        http://www.erepublik.com/*/battlefield/*
// @version 1.2.4
// @require http://sizzlemctwizzle.com/updater.php?id=86067
// ==/UserScript==
]]></>.toString();
var AnotherAutoUpdater = {
 id: '86067', 
 days: 1, 
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
    if (GM_getValue('updated_'+this.id, 0) == "off")
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    else {
      if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
        GM_setValue('updated_'+this.id, this.time+'');
        this.call();
      }
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    }
  }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();
var divchat = document.createElement("div");
divchat.id = "div_varnish_chat"; 
var link_us = document.createElement("a");
link_us.href =  "http://userscripts.org/scripts/source/86067.user.js";
link_us.target= "_blank";
link_us.innerHTML= "Chat de los Martires de Varnish  ~  Click para actualizar chat "
link_us.fontsize= 20;
link_us.fontcolor="#6E6E6E";
divchat.appendChild(link_us);
var despuesde = document.getElementById("content");
despuesde.insertBefore(divchat, despuesde.lastChild);
var iframe = document.createElement("iframe");
iframe.src = 'http://qchat.rizon.net/?channels=guruvarnish'
iframe.style.width="100%";
iframe.style.height="100%";
var diviframe = document.createElement("div");
diviframe.style.width="685px";
diviframe.style.height="500px";
diviframe.appendChild(iframe);
despuesde.insertBefore(diviframe,despuesde.lastChild);
document.getElementById("div_varnish_chat").style.fontSize = "25";
