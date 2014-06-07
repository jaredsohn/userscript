scr_meta=<><![CDATA[
// ==UserScript==
// @name           Google default Search Language
// @version        1.6
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// @exclude        http://www.google.*/*q=*
// ==/UserScript==
]]></>.toString();


var form = document.getElementsByName('f')[0];

var langs = document.createElement('div');

langs.id = 'langs';

langs.innerHTML = "<input type='hidden' name='meta' value='lr=lang_en|lang_uk'>";

form.appendChild(langs);




 // Variable block
var AnotherAutoUpdater = {
 id: '61664',
 
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
	  var answer = confirm ("Знайдено оновлення до скрипту №"+this.id+"\n\nНатисніть 'ОК' для завантаження")
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
