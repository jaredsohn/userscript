// ==UserScript==
// @name           Google Keywords plus
// @creator        hanns
// @description    Adds a bunch of other search engines to google!
// @version        1.0
// @include        http://www.google.*
// @exclude        http://www.google.*/*/*
// ==/UserScript==

var kw = new Array(

/* --- CREATE OR CUSTOMIZE YOUR SEARCH KEYWORDS DOWN HERE --- */
/* --- Example: new Array("Name of the search","Keyword", "StartingURL", "EndingURL"), --- */
/* --- If you leave "Name of the search" as "", it won't show in the list but it will be available too --- */

/* --- Big Sites --- */

new Array("Google Maps","gmaps","http://maps.google.com/maps?&q=",""),
new Array("Google Bildersuche","gpic","http://images.google.at/images?hl=de&newwindow=1&q=","&btnG=Bilder-Suche"),
new Array("Yahoo! Answers","y!a","http://www.answers.com/",""),
new Array("Wikipedia","wiki","http://de.wikipedia.org/wiki/",""),
new Array("Wirtschaftslexikon","eco","http://www.wirtschaftslexikon24.net/suche/search.php?query=","&search=1&Submit=Volltextsuche"),
new Array("Open Dir","opdi","http://search.dmoz.org/cgi-bin/search?search=",""),
new Array("Clusty","cl","http://clusty.com/search?input-form=clusty-simple&v%3Asources=webplus&query=",""),

new Array("","en2de","http://translate.google.com/translate_t#en|de|",""),
new Array("","de2en","http://translate.google.com/translate_t#de|en|",""),
new Array("LEO","leo","http://dict.leo.org/ende?lp=ende&lang=de&searchLoc=0&cmpType=relaxed&sectHdr=on&spellToler=on&chinese=both&pinyin=diacritic&search=","&relink=on"),

new Array("Firefox Addons","ffadd","https://addons.mozilla.org/firefox/search/?q=",""),
new Array("UserScripts","usr","http://userscripts.org/scripts/search?q=",""),

new Array("YouTube","youtube","http://www.youtube.com/results?search_query=",""),


new Array("StumbleUpon","stu","http://www.stumbleupon.com/search?q=",""),
new Array("Delicious","del","http://delicious.com/search?p=",""),

new Array("IconFinder","icfi","http://www.iconfinder.net/index.php?q=","&x=0&y=0"),
new Array("IconLook","iclo","http://www.iconlook.com/search.icon?q=","&s12=on&s16=on&s22=on&s32=on&s48=on&s64=on&s128=on"),

new Array("DownTape","dt","http://downtape.luckyshot.es/?q=","&n=10"),
new Array("MP3Tube","m3t","http://mp3tube.somdigital.net/index.php?cx=partner-pub-7011163767469207%3A6wckecvimof&cof=FORID%3A9&ie=ISO-8859-1&go=gsearch&q=",""),
new Array("4shared","4s","http://www.4shared.com/network/search.jsp?searchmode=2&searchName=",""),
new Array("Zoozle","zo","http://www.zoozle.net/xxx/",",torrent,download,0.html"),
new Array("Tagoo","tgo","http://tagoo.ru/en/search.php?for=audio&search=",""),
new Array("Skreemr","skr","http://skreemr.com/results.jsp?q=","&search=SkreemR+Search"),
new Array("RapidSearch","rsf","http://www.rsfind.com/search.jsp",""),
new Array("Mp3Raid","m3r","http://www.mp3raid.com/search/",""),
new Array("Maxalbums","maxa","http://www.maxalbums.com/search.php?find=","&search=albums"),
new Array("KOHit","koh","http://","-search-downloads.kohit.net/_/"),
new Array("Dilandau","dil","http://www.dilandau.com/cgi/search.cgi?q=","&kind=music&lang=en"),
new Array("MP3000","mp3k","http://www.mp3000.net/mp3_0/",""),


new Array("Serialz","srz","http://www.serialz.to/",".htm"),
new Array("BugMeNot","bgn","http://www.bugmenot.com/view/",""),


/* --- Google Improved Searches --- */
new Array("Download","download","http://www.google.com/search?q=download|torrent+",""),
new Array("Filehost","filehost","http://www.google.com/search?q=","+inurl%3Arapidshare|megaupload|mediafire|filefactory"),
new Array("","indexof","http://www.google.com/search?q=","+intitle%3A\"index+of\"+size+\"last+modified\"+\"greatest+hits\"|\"top+3..30\"|\"the+best+of\"|music|favourite|favorite+mp3")

);
/* Remember that last Array doesn't have any comma! */




/* --- DO NOT EDIT FURTHER IF YOU DON'T KNOW WHAT YOU ARE DOING --- */
/* Display cheat sheet */
/* Inserted HTML */
var menuCode = new Array();
  menuCode.push('<div id="divkeywordlist">');
  menuCode.push('<h4><a title="Click to Show/Hide" onclick="if (document.getElementById(\'keywordlist\').style.display==\'none\'){document.getElementById(\'keywordlist\').style.display=\'block\';}else{document.getElementById(\'keywordlist\').style.display=\'none\';}">Schlagwörter</a></h4>');
  menuCode.push('<table id="keywordlist">');
  
  /* --- Select list visualization style */
  var liststyle = "name";
   for (var i=0; i<kw.length; i++){
     if (kw[i][0] != "") {
       if (liststyle=="namekey"){menuCode.push('<tr onclick="insertit(\''+kw[i][1]+'\');"><td>'+kw[i][0]+'</td><td><strong>'+kw[i][1]+'</strong></td></tr>');}
       if (liststyle=="name"){menuCode.push('<tr onclick="insertit(\''+kw[i][1]+'\');"><td title="'+kw[i][1]+'">'+kw[i][0]+'</td></tr>');}
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
  menuCode.push("#cheatsheet { z-index: 10; position:fixed; bottom:10px; right:10px;}");
  menuCode.push("#divkeywordlist {overflow-x:none;overflow-y:scroll;max-height:200px;"); /* Remove to unlimit list height */
  menuCode.push("border:1px solid #6B90DA; background-color:#ffffff; padding:5px;}");
  menuCode.push("#cheatsheet h4 {margin-top:4px;margin-bottom:4px;text-align:center;font-size:12px;color:#6B90DA}");
  menuCode.push("#cheatsheet table {width:100%;}");
  menuCode.push("#cheatsheet tr, span {cursor: pointer; cursor: hand;}");
  menuCode.push("#cheatsheet tr :hover, span:hover {color:#000000;text-decoration:underline;}");
  menuCode.push("#cheatsheet td, span {font-size:9px;list-style:none;color:#333;padding:0;margin:0}");
  
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = menuCode.join('');
  menuCode.length = 0;
  
/* Inserted Script */
  menuCode.push('function insertit(what) {');
  menuCode.push(' try {document.gs.q.value = what+" ";document.gs.q.focus();}catch (e) {}');
  menuCode.push(' try {document.f.q.value = what+" ";document.f.q.focus();}catch (e) {}');
  menuCode.push('}');
  menuCode.push('var listdisplay = 1;');
  menuCode.push('klist = document.getElementById("keywordlist");');
  menuCode.push('divklist = document.getElementById("divkeywordlist");');
  menuCode.push('function showhide() {');
  menuCode.push(' if (listdisplay == 1) {');
  menuCode.push('  listdisplay = 0;');
  menuCode.push('  klist.style.display = "none";');
  menuCode.push('  divklist.style.overflow = "auto";');
  menuCode.push('  divklist.style.maxHeight = "auto";');
  menuCode.push(' }else{');
  menuCode.push('  listdisplay = 1;');
  menuCode.push('  divklist.style.overflow = "scroll";');
  menuCode.push('  divklist.style.maxHeight = "200px";');
  menuCode.push('  klist.style.display = "block";');
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