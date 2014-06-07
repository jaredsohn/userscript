scr_meta=<><![CDATA[
// ==UserScript==
// @name           CDR ACP
// @namespace      vmor_cdr
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @description    Afficheur de cible prioritaire pour le jeu Campagne de Russie
// @include        http://www.campagne-de-russie.com/jeu.php
// @include        http://www.campagne-de-russie.com/carte_locale.php
// @include        http://www.comana.net/CdR/genie/carte_zoom.php
// @version        1.0.3 
// ==/UserScript==
]]></>.toString();

function showWeakUnits()
{
  var td_units_fra = document.evaluate("//td[@onClick and @onMouseOver]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for ( var i=0 ; i < td_units_fra.snapshotLength; i++ )  
  {  
    var td = td_units_fra.snapshotItem(i);
    var onmouseover =  td.getAttribute('onmouseover');
    var args=onmouseover.split(/AffMiniFiche\('|\);|', '|, '|',/g);
    var type = 'inf';
    var nb_hommes = 200;
    if (args.length>4) {
      type = args[4]; nb_hommes = args[2];
    } else {
      args=onmouseover.split(/AffBulle\('<b>|<\/b><br>| hommes<br>|<br>|'\)/g);
      if (args.length>3)
      {
        type = td.getAttribute('class').substring(0,3); nb_hommes = args[2];
      }
    }
    
    if (type=='inf' || type=='gre' || type=='gnt') {
      if (nb_hommes<130) td.style.color = 'red';
      else if (nb_hommes<160) td.style.color = 'orange';
    } else {
      if (nb_hommes<25) td.style.color = 'red';
      else if (nb_hommes<35) td.style.color = 'orange';
    }
  }  
}

showWeakUnits();




var AnotherAutoUpdater = {
 // Config values, change these to match your script
 id: '75434', // Script id on Userscripts.org
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
