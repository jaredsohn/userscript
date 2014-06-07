// ==UserScript==
// @name       Universal Script
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  A Universal API That Allows Data Transmission Between Domains Within JS
// @match *://*/*
// @copyright  2014 Anubis
// ==/UserScript==

unsafeWindow.String.prototype.between = function(prefix, suffix) {
  s = this;
  var i = s.indexOf(prefix);
  if (i >= 0) {
    s = s.substring(i + prefix.length);
  }
  else {
    return '';
  }
  if (suffix) {
    i = s.indexOf(suffix);
    if (i >= 0) {
      s = s.substring(0, i);
    }
    else {
      return '';
    }
  }
  return s;
}



loadplugin = function loadplugin(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 else if (filetype=="css"){ //if filename is an external CSS file
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}
unsafeWindow.readd2 = function readd2() {
    var e = location.href; // Ok, so this is where the magic happens, this reads the URL, don't fuck with this unless you know what you're doing
    var r = e.between("?&","=&e");
    var m = e.between("44","45"); // The first entry, usually used for commands
    var n = e.between("54","55"); // second entry, usually used for sub commands, like defining options
    var o = e.between("64","65"); // this one is usually used for more intensive stuff that requires more commands
    var oe = e.between("74","75"); // same here
    var ox = e.between("84","85"); // same here
    commandcheck(m,n,o,oe,ox); // this leads to the function that checks all the entrys and executes functions
}
function commandcheck(m,n,o,oe,ox) {
    var comstring = m+n+o+oe+ox; // This is the default var for setting up commands
    // To make a command, you need to use if(comstring == "texthere", and if you are going ot have sub commands, then you need to make sure it includes +n+o+oe+ox, or else it might not work
    if(m+n == "aboutthis") alert("This is a prototype API that allows cross domain communication between JS.")
    else if(comstring == "read"+n+o+oe+ox) alert(document.cookie.between("safevar=","END98"))
    else if(comstring == "write"+n+o+oe+ox) document.cookie="safevar="+n+"END98; expires=Thu, 18 Dec 2023 12:00:00 GMT;"
    else if(comstring == "advancedwrite"+n+o+oe+ox) createcook(n,o)
    else if(comstring == "advancedwrite2"+n+o+oe+ox) createcook2(n,o,oe)
    else if(comstring == "advancedread"+n+o+oe+ox) readcook(o,0,0)
    else if(comstring == "advancedread2"+n+o+oe+ox) readcook(n,1,o)
    else if(comstring == "gowrite"+n+o+oe+ox) gonwrite(n,o,oe,ox)
    else if(comstring == "getcook"+n+o+oe+ox) gonget(n,o,oe)
    else if(comstring == "go"+n+o+oe+ox) gocommand(n,"lol",n)
        }
function gonget(one,two,three) {
    OpenInNewTab(one+".com/?&44advancedread24554"+two+"55=&e");
    unsafeWindow.ea = ea;
}

function gonwrite(n,o,oe,ox) {
    var a = n+".com/?&44"+o+"4554"+oe+"5564"+ox+"65=&e";
    OpenInNewTab(a);
}
function getcook2(o,e,a) {
    var r = document.cookie.between(o+"=",o+"32");
    OpenInNewTab(a+".com/?&44advancedwrite4554"+o+"5564"+r+"65=&e");
}
function gocommand(com1, com2, com3) {
    if(com3 == "same") {
        var g = com1+com2;
        location.href = location.hostname+"&nE"+com1+"nR"+com2+"END=&e";
    } else {
        var g = com1+com2;
        location.href = com3+"&nE"+com1+"nR"+com2+"END=&e";
    }
}
function createcook(o,oe) {
        document.cookie=o+"="+oe+o+"32; expires=Thu, 18 Dec 2023 12:00:00 GMT;";
}
function readcook(o,eee,ln) {
    var e = document.cookie.between(o+"=",o+"32");
    alert(e);
    if(eee == 1) OpenInNewTab(ln+".com/?&44advancedwrite4554"+o+"5564"+e+"65=&e");
}
unsafeWindow.OpenInNewTab = function OpenInNewTab(url )
{
  var win=window.open("http://www."+url, '_window');
}
readd2();