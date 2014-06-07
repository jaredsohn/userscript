scr_meta=<><![CDATA[
// ==UserScript==
// @name           CDR Carto
// @namespace      vmor_cdr
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @description    Affiche la carte globale à coté de la carte locale dans CDR
// @include        http://*campagne-de-russie.com/carte_locale.php
// @include        http://*campagne-de-russie.com/cartes.php
// @version        1.1.0
// 1.0.0 Premiere version
// 1.0.1 Fonctionne aussi sans le www
// 1.1.0 Affichage de l'image des unités (adresse récupérée sur la carte globale)
// ==/UserScript==

]]></>.toString();







function calc()

{

	var factor = 232/300;
	var firstline = document.evaluate("/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr", 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

	var coords=firstline.getElementsByTagName('td');
	var xa=parseInt(coords[1].innerHTML);
	var xb=parseInt(coords[coords.length-1].innerHTML);
	var width=xb-xa+1;
	var table = document.evaluate("/html/body/table/tbody/tr/td[2]/table/tbody/tr[2]/td[2]/table", 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

	coords=table.getElementsByTagName('td');
	var ya=parseInt(coords[width+1].innerHTML);
	var yb=parseInt(coords[coords.length-width-1].innerHTML);
	var obj=document.getElementById("carte_4");
	obj.style.marginLeft=Math.round(xa*factor)+'px';
	obj.style.marginTop=Math.round(ya*factor)+'px';
	obj.style.width=Math.round(width*factor)+'px';
	obj.style.height=Math.round((yb-ya+1)*factor)+'px';
}


if (document.URL.indexOf('campagne-de-russie.com/carte_locale.php')>=0)
{

   var maphtml = '<div style="position: absolute; z-index: 4; border: 1px solid red; font-size: 1px; padding: 0px; margin: 0px;" id="carte_4"></div>';
   var imgCompagnie = GM_getValue('imgCompagnie',0);
   if ( imgCompagnie != 0 )
      maphtml += '<img src="'+imgCompagnie+'" id="imgCompagnie" width="178px" height="232px" style="position:absolute;" />';
   maphtml += '<img width="178px" height="232px" id="imgCarte" src="carte/carte.png">';

   document.evaluate("/html/body/table/tbody/tr/td/table[2]/tbody/tr[2]/td[2]/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML = maphtml



   calc();

   
}
else if (document.URL.indexOf('campagne-de-russie.com/cartes.php')>=0)
{
   var imgCompagnie = document.getElementById('imgCompagnie').getAttribute('src');
   GM_setValue("imgCompagnie",imgCompagnie);

}






var AnotherAutoUpdater = {
 // Config values, change these to match your script
 id: '75666', // Script id on Userscripts.org
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