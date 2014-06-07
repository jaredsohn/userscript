// ==UserScript==
// @name           Google Keyword Enhanced MultiSearch
// @creator        Xavi Esteve
// @namespace      http://www.xaviesteve.com
// @description    Fast, customized and enhanced access to all website results
// @version        1.27
// @include        http://www.google.*
// @exclude        http://www.google.*/*/*
// ==/UserScript==

var kw = new Array(

/* --- CREATE OR CUSTOMIZE YOUR SEARCH KEYWORDS DOWN HERE --- */
/* --- Example: new Array("Name of the search",   "Keyword", "StartingURL", "EndingURL"), --- */
/* --- If you leave "Name of the search" as "", it won't show in the list but it will be available too --- */

/* --- Big Sites --- */
new Array("Yahoo",         ".yahoo",          "http://search.yahoo.com/search?p=AAA",""),
new Array("MSN Live",      ".live",           "http://search.live.com/results.aspx?q=",""),
new Array("Google Lucky",  ".lucky",          "http://www.google.com/search?q=","&btnI"),
new Array("Google Maps",   ".maps",           "http://maps.google.com/maps?&q=",""),
new Array("Google Images", ".images",         "http://images.google.com/images?q=",""),
new Array("YouTube",       ".youtube",        "http://www.youtube.com/results?search_query=",""),
new Array("Download video",".downvid",        "http://keepvid.com/?url="), 
new Array("Answers",       ".answers",        "http://www.answers.com/",""),
new Array("Wikipedia",     ".wiki",           "http://wikipedia.org/wiki/Especial:Search?search=",""),
new Array("Addons",        ".addons",         "https://addons.mozilla.org/firefox/search/?q=",""),
new Array("Delicious",     ".delicious",      "http://delicious.com/search?p=",""),
new Array("Facebook",      ".facebook",       "http://www.facebook.com/s.php?q=",""),
new Array("UserScripts",   ".userscripts",    "http://userscripts.org/scripts/search?q=",""),
new Array("LinkedIn",      ".linkedin",       "http://www.linkedin.com/search?keywords=","&sortCriteria=4&origin=gsf"),
new Array("",              ".linkedinpeople", "http://www.google.com/search?q=site%3Awww.linkedin.com+intitle%3Alinkedin+","+-intitle%3Aanswers+-intitle%3Aupdated+-intitle%3Ablog+-intitle%3Adirectory+-inurl%3Ajobs+-inurl%3Amegite.com"),
new Array("StumbleUpon",   ".stumbleupon",    "http://www.stumbleupon.com/search?q=",""),
new Array("Skreemr",       ".skreemr",        "http://skreemr.com/results.jsp?q=", "&search=SkreemR+Search",""),
new Array("Tagoo",         ".tagoo",          "http://tagoo.ru/en/search.php?for=audio&search=",""),
new Array("Amazon",        ".amazon",         "http://www.amazon.com/s/ref=nb_ss_gw?url=search-alias%3Daps&field-keywords=",""),
new Array("Serialz",       ".serialz",        "http://www.serialz.to/",".htm"),
new Array("BugMeNot",      ".bugmenot",       "http://www.bugmenot.com/view/",""),
new Array("Open Dir",      ".opendirectory",  "http://search.dmoz.org/cgi-bin/search?search=",""),
new Array("PirateBay",     ".tpb",            "http://thepiratebay.org/search/",""),
new Array("Flickr",        ".flickr",         "http://www.flickr.com/search/?q=","&m=text"), 
new Array("TibiaWiki",     ".tibia",          "http://tibia.wikia.com/wiki/Special:Search?search=","&go=1"), 
new Array("IMDb",          ".imdb",           "http://www.imdb.com/find?s=all&q=","&x=15&y=15"), 
new Array("MySpace",       ".myspace",        "http://searchservice.myspace.com/index.cfm?fuseaction=sitesearch.results&qry=","&type=AllMySpace"), 
new Array("eBay",          ".ebay",           "http://shop.ebay.com/items/","#findingsearchbarfrm"), 
new Array("Last.fm",       ".lastfm",         "http://www.last.fm/search?m=all&q=",""),
new Array("Deezer.com",    ".deezer",         "http://www.deezer.com/#music/result/all/",""),

/* --- Google Translate --- */
new Array("",              ".en2es",          "http://translate.google.com/translate_t#en|es|",""),
new Array("",              ".es2en",          "http://translate.google.com/translate_t#es|en|",""),
new Array("",              ".en2it",          "http://translate.google.com/translate_t#en|it|",""),
new Array("",              ".it2en",          "http://translate.google.com/translate_t#it|en|",""),
new Array("",              ".en2de",          "http://translate.google.com/translate_t#en|de|",""),
new Array("",              ".de2en",          "http://translate.google.com/translate_t#de|en|",""),
new Array("",              ".en2ru",          "http://translate.google.com/translate_t#en|ru|",""),
new Array("",              ".ru2en",          "http://translate.google.com/translate_t#ru|en|",""),
new Array("",              ".en2fr",          "http://translate.google.com/translate_t#en|fr|",""),
new Array("",              ".fr2en",          "http://translate.google.com/translate_t#fr|en|",""),
new Array("",              ".pl2en",          "http://translate.google.com/translate_t#pl|en|",""),
new Array("",              ".en2pl",          "http://translate.google.com/translate_t#en|pl|",""),
new Array("",              ".en2al",          "http://translate.google.com/translate_t#en|al|",""),
new Array("",              ".al2en",          "http://translate.google.com/translate_t#al|en|",""),
new Array("",              ".en2ar",          "http://translate.google.com/translate_t#en|ar|",""),
new Array("",              ".ar2en",          "http://translate.google.com/translate_t#ar|en|",""),
new Array("",              ".en2bg",          "http://translate.google.com/translate_t#en|bg|",""),
new Array("",              ".bg2en",          "http://translate.google.com/translate_t#bg|en|",""),
new Array("",              ".en2ca",          "http://translate.google.com/translate_t#en|ca|",""),
new Array("",              ".ca2en",          "http://translate.google.com/translate_t#ca|en|",""),
new Array("",              ".en2ch",          "http://translate.google.com/translate_t#en|zh-CN|",""),
new Array("",              ".ch2en",          "http://translate.google.com/translate_t#zh-CN|en|",""),
new Array("",              ".en2hr",          "http://translate.google.com/translate_t#en|hr|",""),
new Array("",              ".hr2en",          "http://translate.google.com/translate_t#hr|en|",""),
new Array("",              ".en2cs",          "http://translate.google.com/translate_t#en|cs|",""),
new Array("",              ".cs2en",          "http://translate.google.com/translate_t#cs|en|",""),
new Array("",              ".en2da",          "http://translate.google.com/translate_t#en|da|",""),
new Array("",              ".da2en",          "http://translate.google.com/translate_t#da|en|",""),
new Array("",              ".en2dl",          "http://translate.google.com/translate_t#en|dl|",""),
new Array("",              ".dl2en",          "http://translate.google.com/translate_t#dl|en|",""),
new Array("",              ".en2fi",          "http://translate.google.com/translate_t#en|fi|",""),
new Array("",              ".fi2en",          "http://translate.google.com/translate_t#fi|en|",""),

/* --- Google Services --- */
new Array("Google Mail",   ".gmail",          "https://mail.google.com/mail/#search/",""),
new Array("Google Docs",   ".gdocs",          "https://docs.google.com/#search/",""),
new Array("Google Reader", ".greader",        "https://www.google.com/reader/view/?tab=my#search/","/"),
new Array("Google Calendar",".gcal",          "https://www.google.com/calendar/render?q=",""),

/* --- Google Improved Searches --- */
new Array("Download",       ".download",      "http://www.google.com/search?q=download|torrent+",""),
new Array("Filehost",       ".filehost",      "http://www.google.com/search?q=","+inurl%3Arapidshare|megaupload|mediafire|filefactory"),
new Array("Rapidshare",     ".rs",            "http://www.google.com/search?q=","+site%3Arapidshare.com+inurl%3Afiles"),
new Array("",               ".tutorial",      "http://www.google.com/search?q=","+~tutorial|~guide|~manual|~reference|~examples"),
new Array("",               ".indexof",       "http://www.google.com/search?q=","+intitle%3A\"index+of\"+size+\"last+modified\"+\"greatest+hits\"|\"top+3..30\"|\"the+best+of\"|music|favourite|favorite+mp3")
);
/* Remember that last Array doesn't have any trailing comma! */

/* --- Select list visualization style (available: "namekey", "name", "cloud") */
var liststyle = "namekey";




/* --- DO NOT EDIT FURTHER IF YOU DON'T KNOW WHAT YOU ARE DOING --- */
/* Display cheat sheet */
/* Inserted HTML */
var menuCode = new Array();
  menuCode.push('<div id="divkeywordlist">');
  menuCode.push('<h4><a title="Click to Show/Hide" onclick="showhide();">MultiSearch</a></h4>');
  menuCode.push('<table id="keywordlist" style="display:none">');

  for (var i=0; i<kw.length; i++){
    if (kw[i][0] != "") {
      if (liststyle=="namekey"){menuCode.push('<tr title="'+kw[i][1]+'" onclick="insertit(\''+kw[i][1]+'\');"><td>'+kw[i][0]+'</td><th>'+kw[i][1]+'</th></tr>');}
      if (liststyle=="name"){menuCode.push('<tr title="'+kw[i][1]+'" onclick="insertit(\''+kw[i][1]+'\');"><td>'+kw[i][0]+'</td></tr>');}
      if (liststyle=="cloud"){menuCode.push('<span onclick="insertit(\''+kw[i][1]+'\');" title="'+kw[i][1]+'">'+kw[i][0]+'</span> &nbsp; ');}
    }
  }
  menuCode.push('</table>');
  menuCode.push('</div>');
  
var menu = document.createElement('div');
  menu.id = 'cheatsheet';
  menu.innerHTML = menuCode.join('\n');
  menuCode.length = 0;
  
/* Inserted CSS */
  menuCode.push("#cheatsheet {z-index:999;position:fixed;bottom:0;right:0;-moz-opacity:0.7}  #divkeywordlist {overflow:auto;border:1px solid #5385C1; background-color:#f1f1f1;padding:5px;font-family:Arial,sans-serif}  #divkeywordlist h4 {margin-top:0;margin-bottom:4px;text-align:center;font-size:11px;color:#5385C1}  #divkeywordlist table {width:100%;}  #divkeywordlist tr, span {cursor: pointer; cursor: hand;}  #divkeywordlist td, th, span {font-size:9px;list-style:none;color:#333;padding:0;margin:0}  #divkeywordlist tr:hover {background:#fff}");
  
var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = menuCode.join('');
  menuCode.length = 0;
  
/* Inserted Script */
  menuCode.push('function insertit(what) {');
  menuCode.push(' try {document.gs.q.value = what+" ";document.gs.q.focus();}catch (e) {}');
  menuCode.push(' try {document.f.q.value = what+" ";document.f.q.focus();}catch (e) {}');
  menuCode.push('}');
  menuCode.push('var listdisplay = 0;');
  menuCode.push('function showhide() {');
  menuCode.push(' if (listdisplay == 1) {');
  menuCode.push('  listdisplay = 0;');
  menuCode.push('  document.getElementById("keywordlist").style.display = "none";');
  menuCode.push('  document.getElementById("divkeywordlist").style.overflow = "auto";');
  menuCode.push('  document.getElementById("divkeywordlist").style.maxHeight = "auto";');
  menuCode.push(' }else{');
  menuCode.push('  listdisplay = 1;');
  menuCode.push('  document.getElementById("divkeywordlist").style.overflow = "scroll";');
  menuCode.push('  document.getElementById("divkeywordlist").style.maxHeight = "200px";');
  menuCode.push('  document.getElementById("keywordlist").style.display = "block";');
  menuCode.push(' }');
  menuCode.push('}');
var script = document.createElement('script');
  script.innerHTML = menuCode.join('\n');
  menuCode.length = 0;

/* Embed all code */
try { document.getElementsByTagName('head')[0].appendChild(style); }
  catch(e) {}
try { document.getElementsByTagName('head')[0].appendChild(script); }
  catch(e) {}
document.body.insertBefore(menu, document.body.lastChild);

/* --- Get URL parameters --- */
var qs = (document.URL.search(/q=/i));
var qe = document.URL.substr(qs).search(/\&/);
var q = (document.URL.substr(qs+2,qe-2));

if ((document.URL.search("/search?") > -1 || document.URL.search("/custom?") > -1) & qs > -1) {
  /* --- Loop through kw array and act --- */
  for (var i=0; i<kw.length; i++){
    if (q.substr(0,kw[i][1].length+1)==(kw[i][1]+'+') || q.substr(0,kw[i][1].length+3)==(kw[i][1]+'%20')) {
      document.location = kw[i][2]+q.substr(kw[i][1].length+1)+kw[i][3];
    }
  }
}