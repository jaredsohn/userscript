scr_meta=<><![CDATA[
// ==UserScript==
// @name           Google Pr0
// @namespace      Didrik Hansen
// @description    Google search result
// @version        0.3
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/
// @include        http://www.google.*/
// @include        http://www.google.*/search*
// @include        http://www.google.*/search*
// @include        *google.*/firefox*
// @include        *google.*/firefox*
// @exclude        *images.google*
// @exclude        *video.google*

// ==/UserScript==
]]></>.toString();


//SearchBox
function GoogleSearchOptions() {
if((document.title==='Google') || (document.title==='Mozilla Firefox Start Page')){
    var i=0;var ii=0;
  var optionList = new Array();
  var span = document.getElementsByTagName('span')[3];
  var parent = span.parentNode;
  
  while (i<span.children.length) {
    if (span.children[i].tagName.toLowerCase()=="input") {
      optionList[ii] = new Array(4);
      a=i+1;
      optionList[ii]['title'] = span.children[a].innerHTML;
      optionList[ii]['id']    = span.children[i].id;
      optionList[ii]['value'] = span.children[i].value;
      optionList[ii]['name']  = span.children[i].name;
      ii++;
    }
    i++;
  }i=ii;
  parent.removeChild(span);
  
  optionList[i] = new Array(4);
    optionList[i]['title'] = 'Music (mp3/aac)';
    optionList[i]['id']    = null;
    optionList[i]['value'] = 'intitle:"index.of" (mp3|aac) "Parent Directory" -htm -html -asp -php -listen77 -idmusic -airmp3 -shexy -vmp3 -hyooge -audiozen -musicindexof -mp3s -musik';
    optionList[i]['name']  = 'q';
    i++;
  optionList[i] = new Array(4);
    optionList[i]['title'] = 'Movies (avi/mp4/etc)';
    optionList[i]['id']    = null;
    optionList[i]['value'] = 'intitle:"index.of" (avi|mp4|mpg|wmv) "Parent Directory" -htm -html -asp -php -listen77 -idmovies -airmp3 -shexy -moviez -musicindexof -mp3s -musik -eucontest -0x7 -inurl:htm -inurl:html -inurl:php';
    optionList[i]['name']  = 'q';
    i++;
  optionList[i] = new Array(4);
    optionList[i]['title'] = 'Ebooks (pdf/pdb/etc)';
    optionList[i]['id']    = null;
    optionList[i]['value'] = '"Parent Directory" intitle:"index.of" (chm|pdf|pdb|prc|lit|doc|rtf|txt) "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -opendivx -md5 -md5sums -htm -html -php -idpdf';
    optionList[i]['name']  = 'q';
    i++;
  optionList[i] = new Array(4);
    optionList[i]['title'] = 'FTP Folder';
    optionList[i]['id']    = null;
    optionList[i]['value'] = '"Parent Directory" intitle:"index.of" "Name" "Last modified" "Size" "Description" -inurl:htm -inurl:html -inurl:php -idftp -xxx -shtml -opendivx -md5 -md5sums -asp';
    optionList[i]['name']  = 'q';
    i++;
  optionList[i] = new Array(4);
    optionList[i]['title'] = 'Torrent';
    optionList[i]['id']    = null;
    optionList[i]['value'] = 'filetype:torrent';
    optionList[i]['name']  = 'q';
    i++;
  
  
  document.getElementsByName('q')[0].focus();
  var Tselect = document.createElement('select');
    Tselect.setAttribute('id', 'Toptions');
    Tselect.setAttribute('onchange','this.name=this.children[this.selectedIndex].className');
    parent.appendChild(Tselect);
  
  function newoption(title,id,value,name){
    var search = document.getElementById('Toptions');
    var option = document.createElement('option');
    var text = document.createTextNode(title);
      option.setAttribute('Id', id);
      option.setAttribute('class', name);
      option.setAttribute('Value', value);
      search.appendChild(option);
      option.appendChild(text);
  }
  
  i=0;
  while (i<optionList.length) {
    newoption(optionList[i]['title'],optionList[i]['id'],optionList[i]['value'],optionList[i]['name']);
    i++;
  }
  
}}
window.onload = GoogleSearchOptions();







/* sizzlemctwizzle's Another Auto Update Script */
CheckScriptForUpdate = {
 id: '59331',
 days: 7,
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


