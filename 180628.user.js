// ==UserScript==
// @name MyFonts Downloader
// @author Tommy Smith
// @description Download Pro fonts from myfonts.com . Might be a bit finicky under Tampermonkey in Google Chrome.
// @version 3.8
// @include http://myfonts.com/fonts/*/*
// @include http://*.myfonts.com/fonts/*/*
// @include http://easy.myfonts.net/?myfontsdownloadername*
// ==/UserScript==

// Here's to Trixie users, you lucky ducks.
// leveldocumentgetelementsbyclassnamestackoverflow.js
// Of course, Internet Exploder does not support the getElementsByClassName function used for detecting where the platforms are. Rewrite the function which should be built in. Function rewritten from a user on Stack Overflow.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
document.getElementsByClassName = function (className) {
    return document.querySelectorAll('.' + className.replace(/ /g, "."))
}
  }

// Normal MyFonts Page

if (window.location.hostname.indexOf("myfonts.com") != -1 && (window.location.href.indexOf(".htm") == -1 || window.location.href.indexOf("index.htm") != -1)) {
// create the button to trigger MyFonts Downloader
var script = document.createElement('script');
script.type = "text/javascript";
script.innerHTML = function(){/*
function step0() {
// the user has started MyFonts Downloader. Begin creating the iframe for step1!!
console.log("myfontsdownloader: step0");
// change licensetype-web to something else for testing purposes below if nessecary
if (!document.getElementsByClassName("licensetype-web")[0]) {
// glyphs
ANCESTORlist = new Array();
for(i=0;i<document.getElementsByClassName("sample").length;i++) {
ANCESTORlist.push(escape(document.getElementsByClassName("sample")[i].getElementsByTagName("a")[0].innerHTML));
}
webfontpreview = document.getElementsByClassName("sample")[0].getElementsByTagName("a")[0].getAttribute("href").replace(/\/+$/, "")+"/glyphs.html?myfontsdownloadername&myfontsdownloaderglyphs&render=webfont&"+ANCESTORlist.join("&");
} else {
// webfont
webfontpreview = window.location.href.replace(/\/+$/, "")+"/webfont_preview.html?myfontsdownloadername&myfontsdownloaderwebfont";
}
document.getElementById("autoboxdownloaderiframediv").innerHTML="<iframe src='"+webfontpreview+"' width='171' height='342' frameborder='0' scrolling='no'></iframe>";
}
*/}.toString().slice(14,-3)
document.getElementsByTagName('body')[0].appendChild(script);
var autoboxdownloader = document.createElement("div");
autoboxdownloader.id = "autoboxdownloaderdiv";
autoboxdownloader.className = "autobox clearfix";
autoboxdownloader.innerHTML="<a href='javascript:step0();'>MyFonts Downloader</a><br><span id='autoboxdownloaderiframediv'></span>";
document.getElementsByClassName("autobox")[1].parentNode.insertBefore(autoboxdownloader, document.getElementsByClassName("autobox")[1]);
}

// Webfont Preview Page

if (window.location.search.indexOf("?myfontsdownloadername&myfontsdownloaderwebfont") != -1) {
// retreive the name of the nessecary stylesheet, then create another iframe to prevent cross-domain errors
console.log("myfontsdownloader: step1a");
document.getElementsByTagName('body')[0].innerHTML="ERROR: step1a";
// a little trick I've learned. Pass the info from one domain to another using the search/hash part of url. It will limit out this userscript if accessing the Easy Webfonts Page without using this userscript as well, and the frame could even be opened in a popup and still work reliably.
myfontsdownloadernames = "&";
for (i=0;i<document.getElementsByTagName("link").length;i++) {
if (document.getElementsByTagName("link")[i].getAttribute("href").indexOf("//easy.myfonts.net/v") != -1) {
myfontsdownloadernames += ""+escape(document.getElementsByTagName("link")[i].getAttribute("href"))+"&";
}
}
document.getElementsByTagName('body')[0].innerHTML="<iframe src='http://easy.myfonts.net/?myfontsdownloadername&myfontsdownloadereasy"+myfontsdownloadernames+""+window.location.pathname.split('/')[window.location.pathname.split('/').length-2]+"' width='171' height='342' frameborder='0' scrolling='yes'></iframe>";
}

// Glyph Page

if (window.location.search.indexOf("?myfontsdownloadername&myfontsdownloaderglyphs") != -1) {
console.log("myfontsdownloader: step1b");
myfontsdownloadernames="&";
var vidi = 1;
if (!document.getElementsByName("vid")[0]) {
} else {
vidi = document.getElementsByName("vid")[0].getElementsByTagName("option").length;
}
SLIGHTLYLESSANCESTORlist = new Array();
for(i=3;i<window.location.search.split("&").length*vidi;i++) {
myfontsdownloadernames += "//easy.myfonts.net/v0/css?vid="+((document.getElementsByTagName("area")[0].getAttribute("href").replace("glyphs/", "").substring(0, document.getElementsByTagName("area")[0].getAttribute("href").replace("glyphs/", "").lastIndexOf("/"))*1)+i)+"&";
if (i<window.location.search.split("&").length) {
SLIGHTLYLESSANCESTORlist.push(window.location.search.split("&")[i]);
}
}
document.getElementsByTagName('body')[0].innerHTML="<iframe src='http://easy.myfonts.net/?myfontsdownloadername&myfontsdownloadereasy"+myfontsdownloadernames+"MyFonts-Glyph-Map&"+SLIGHTLYLESSANCESTORlist.join("&")+"&"+window.location.pathname.split('/')[window.location.pathname.split('/').length-3]+"' width='171' height='342' frameborder='0' scrolling='yes'></iframe>";
}

// Easy Webfonts Page

if (window.location.search.indexOf("?myfontsdownloadername&myfontsdownloadereasy") != -1) {
// cross-domain problem solved! Now to start harvesting those fonts...
for (i=2;i<window.location.search.split("&").length-1;i++) {
if (window.location.search.split("&")[i].toLowerCase() == "myfonts-glyph-map") {
break;
}
document.getElementsByTagName("head")[0].innerHTML+="<link rel='stylesheet' type='text/css' href='http:"+unescape(window.location.search.split("&")[i])+"'>";
}
// CSS with the font files is in place! Now, drum roll please, we will place a script in the unsafeWindow scope... without using unsafeWindow!
var script = document.createElement('script'); 
script.type = "text/javascript";
script.innerHTML = function(){/*
// Instructions for Usage are written into the iframe instead of the 404 homepage
document.getElementsByTagName('body')[0].innerHTML="<b style=\"font-family: 'Times New Roman', serif;\";>MyFonts Downloader</b> by <b style=\"font-family: 'Times New Roman', serif;\";>Tommy Smith</b><p>Please pick a format (eot, woff, ttf, etc.) and font family (bold, italic, etc.) below.</p><span id='WOFFlistspan'><ul><li>No accessable results - it is possible that an error has occured.</li></ul></span><b>Instructions for Usage</b><p>To use the font upon downloading, add a dot (.) before the name it comes with, and add a name before that dot. This is nessecary because of the way MyFonts processes the file URLs.</p><p>If Windows tells you the file is &quot;not a valid font file&quot; try using a different format - woff seems to be the most reliable.</p><p>If you need the font in a different format than listed here, try one of the following free websites/programs for a good font converter: <ul><li><a href='http://everythingfonts.com/' target='_blank' style='font-family: sans-serif;'>Everything Fonts</a></li><li><a href='http://freefontconverter.com/' target='_blank' style='font-family: sans-serif;'>Free Font Converter</a></li><li><a href='http://fontforge.org' target='_blank' style='font-family: sans-serif;'>FontForge</a></li></ul></p><p>If the font is free, the downloader will not work. However, because it is a free font, you may download the font directly from MyFonts instead.</p><p>If you wish to refresh this list, simply press the above <strong>MyFonts Downloader</strong> link again. Thanks for using this userscript!</p><span style=\"font-family: 'Astaire Pro', 'AstairePro', 'Cedarville Cursive', cursive;\">-Tommy</span>";
// theWOFF: Enumerate @font-face URLs using Javascript/JQuery, modified function from ADW on Stack Overflow
function theWOFF() {
WOFFlist = new Array();
FAMILYlist = new Array();
var pattern=/url\(.*?\)/g;
var pattern2=/font-family: ?"?.*?"?;/g;
// h: added so multiple stylesheets will also be checked
for (var h=0;h<document.styleSheets.length;h++)
{
for (var i=0;i<document.styleSheets[h].cssRules.length;i++)
{
    var urls=document.styleSheets[h].cssRules[i].cssText.match(pattern);
    if (urls)
    {
        for (var j=0;j<urls.length;j++)
        {
            var url = urls[j].substring(urls[j].indexOf('/v'), urls[j].lastIndexOf(')')).replace(/['"]/g, "");
            WOFFlist.push(url);
        }
    }
}
for (var i=0;i<document.styleSheets[h].cssRules.length;i++)
{
    var urls=document.styleSheets[h].cssRules[i].cssText.match(pattern2);
    if (urls)
    {
        for (var j=0;j<urls.length;j++)
        {
            var url = urls[j].substring(urls[j].indexOf('font-family:')+12, urls[j].lastIndexOf(';')).replace(/ /, "").replace(/['"]/g, "");
            FAMILYlist.push(url);
        }
    }
}
}
for (i=2;i<window.location.search.split("&").length-1;i++) {
if (FAMILYlist[0] == "myfonts-glyph-map") {
FAMILYlist.push(unescape(window.location.search.split("&")[i]));
}
if (window.location.search.split("&")[i].toLowerCase() == "myfonts-glyph-map") {
FAMILYlist = [];
FAMILYlist[0] = "myfonts-glyph-map";
}
}
if (FAMILYlist[0] == "myfonts-glyph-map") {
FAMILYlist.splice(0, 1);
}
wofflisthtmlv="";
if (FAMILYlist[0] != "undefined") {
for (i=0;i<WOFFlist.length;i++) {
// check that the font selected is actually the font the user wants by checking if it has the same name.
// This part might need some occasional maintenance; it relies on a few assumptions about how MyFonts sorts their stylesheets and that might be changed in the future.
// So here's a brief guide for possible future script writers who want to modify this script.
// We have two variables. WOFFlist is an array containing a list of formats for each family, like this:
// "woff", "ttf", "eot", "svg", "woff", "ttf", "eot", "svg", "woff", "ttf"... and so on
// We also have FAMILYlist, which is a list of the different versions (family members) of the font, for example:
// "Arial Light", "Arial Bold", "Arial Italic", "Arial Black" etc.
// However, each MyFonts stylesheet is riddled with other fonts that are not the ones the user is looking for, but just for decorating their website pages, such as Proxima Nova Soft.
// Hence, the following for loop first checks if the name of the font which corresponds with the current format is the one the user is looking for.
// If we have woff, ttf, eot, and svg as our four formats, that means the FAMILYlist is four times shorter than WOFFlist.
// If svg is no longer a supported format, FAMILYlist is now only three times shorter than WOFFlist.
// And if only one format is supplied, for example, if only woff is available, both arrays are now the same length.
// So we divide the length of WOFFlist by the length of FAMILYlist, then divide that number by i to get the current font family member's name...
// And then we replace spaces with hyphens like MyFonts does with their urls...
// And then we check to see if the font's name matches that of the font's url on MyFonts.
// The last "indexOf" portion gets the font's name from the url of the font on MyFonts site and checks that they match.
if (FAMILYlist[(Math.floor(i/(WOFFlist.length/FAMILYlist.length)))].toLowerCase().replace(/ /g, "-").indexOf(window.location.search.substring(window.location.search.lastIndexOf("&")+1)) != -1) {
wofflisthtmlv+="<li><a href='"+WOFFlist[i]+"' style='font-family: sans-serif;'>"+FAMILYlist[(Math.floor(i/(WOFFlist.length/FAMILYlist.length)))]+" font family, "+WOFFlist[i].replace(/\/v.+\//, "").substring(0,WOFFlist[i].replace(/\/v.+\//, "").indexOf("?"))+" format</a></li>";
}
}
}
if (wofflisthtmlv == "") {
wofflisthtmlv+="<li>No accessable results - it is possible that an error has occured.</li>";
}
document.getElementById("WOFFlistspan").innerHTML="<ul>"+wofflisthtmlv+"</ul>";
}
// code excerpt from http://www.phpied.com/when-is-a-stylesheet-really-loaded/
  var ti = setInterval(function() {
    if (document.styleSheets[0].cssRules.length > 0) {
      // needs more work when you load a bunch of CSS files quickly
      // e.g. loop from cssnum to the new length, looking
      // for the document.styleSheets[n].href === url
      // ...
      
      // FF changes the length prematurely :( )
      theWOFF();
      clearInterval(ti);
      
    }
  }, 10);
*/}.toString().slice(14,-3)
document.getElementsByTagName('head')[0].appendChild(script);
// Replace the 404 Error Page title just for the sake of razzle dazzle
document.title="MyFonts Downloader by Tommy Smith";
}