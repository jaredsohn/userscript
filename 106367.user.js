// ==UserScript==
// @name           CDR missives
// @namespace      vmor_cdr
// @include        http://*campagne-de-russie.com/missives.php*
// @version        1.0.0
// @author         vmor
// @icon           http://tux.crystalxp.net/png/ortizvlasich-napoleon-tux-2225.png
// ==/UserScript==


var msgall = document.evaluate("/html/body/div/div/div/div[2]/div[4]/div/div[2]/div/div/div/div/div[4]/div/div[2]/a[3]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var scriptCode = "function supprimerToutesLesMissives()\n{\n";
for ( var i=0 ; i < msgall.snapshotLength; i++ )  
{  
    var msg_href = msgall.snapshotItem(i).getAttribute('href');
    var args = msg_href.split(/\(|\)|,/g);
    
    scriptCode += "  document.getElementById('divObjet"+args[3]+"').innerHTML = 'Message supprimé';\n";
    scriptCode += "  document.getElementById('divObjet"+args[3]+"').className += ' rouge';\n";
    scriptCode += "  connexionAjax('ajax/supprimerMissive.php?missive="+args[1]+"&destinataire="+ args[2] +"');\n";
	 scriptCode += "  document.getElementById('divMessage"+args[3]+"').className = 'cacher';\n";
}

scriptCode += "   location.reload();\n}\n"; 
    
var script = document.createElement('script');
script.innerHTML = scriptCode;
document.getElementsByTagName('head')[0].appendChild(script); 

    
var onglet1 = document.getElementById("contenu_onglet_1");
var nouvelleMissiveDiv = onglet1.getElementsByTagName('div')[0];
var newdiv2 = document.createElement("span");
newdiv2.innerHTML = '<a href="javascript:supprimerToutesLesMissives()">'+
   '<img src="interface/picto/missive_supprimer.gif">' +
   '</a> Supprimer tout ';
nouvelleMissiveDiv.appendChild(newdiv2);




var AnotherAutoUpdater = {
 // Config values, change these to match your script
 id: '106367', // Script id on Userscripts.org
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