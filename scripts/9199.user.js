// Brian Shaler's AutoSmile for Flickr
// version 1.1
// 2007.05.08
// Copyright (c) 2007 - Brian Shaler
// Brian's Interwebs: // http://brian.shaler.name/
// brian@shaler.name // Feedback is ALWAYS appreciated!
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// --------------------------------------------------------------------
// Version Details:
// 1.1 // 2007.05.10
// | Initial version. Replaces about 58 character combinations 
// | with 25 different 16x16 emoticons. Update notification added
// | in this version.
// View full details on the download page
// --------------------------------------------------------------------
// Security Note:
// | No identifying information about the user is sent using this
// | script. Users should be warned that installing Greasemonkey 
// | user scripts can be a security risk. ALWAYS inspect the code
// | before installing it!!
// --------------------------------------------------------------------
// "Flickr" is a trademark of Yahoo!
// This script is not affiliated, sponsored, or endorsed by Yahoo!
// Brian Shaler reserves the right to deactivate this free service at 
// any time without notice.
// (This includes but is not limited to image hosting)
// --------------------------------------------------------------------
// ==UserScript==
// @name          Brian Shaler's AutoSmile for Flickr
// @namespace     http://brian.shaler.name/flickr/autosmile/
// @description   Replaces common "emoticon" character combinations with 16x16 images
// @include       http://flickr.com/*
// @include       http://*.flickr.com/*
// ==/UserScript==

currentVersion = "1.1";

document.uid = GM_getValue("uid", 0);
if (document.uid == undefined || document.uid == 0)
{
  GM_xmlhttpRequest({ method: 'GET', url: 'http://brian.shaler.name/flickr/autosmile/newuser.php5',
    onload: function(responseDetails)
    {
      var parser = new DOMParser();
      var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
      document.uid = dom.getElementsByTagName('uid')[0].textContent;
      GM_setValue("uid", document.uid);
    }
  });
}

document.updateAvailable = false;
d = new Date();
currentTime = d.getTime();

// check date of last update
lastUpdate = parseInt(GM_getValue("lastUpdate", 0));

// if you just installed a new version, clear update
if (GM_getValue("version", "") != currentVersion)
{
  GM_setValue("version", currentVersion);
  GM_setValue("update", 0);
}
if (GM_getValue("update", 0) == 1)
{
  document.updateAvailable = true;
  lastUpdate = currentTime;
}

// if you haven't checked for an update yet today..
if (currentTime-lastUpdate >= 1000*60*60*24)
{
  GM_xmlhttpRequest({ method: 'GET', url: 'http://brian.shaler.name/flickr/autosmile/checkVersion.php5?v='+currentVersion+'&uid='+document.uid,
    onload: function(responseDetails)
    {
      var parser = new DOMParser();
      var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
      up = dom.getElementsByTagName('update')[0].textContent;
      if (up == "yes")
      {
        GM_setValue("update", 1);
        document.updateAvailable = true;
      }
      GM_setValue("lastUpdate", currentTime + " ");
    }
  });
}

if (document.getElementById("message") !== null)
{

mx = document.getElementById("message"); 
mx.name = "messagex";
mx.id = "messagex";
m = document.createElement("input");
m.type = "hidden";
m.name = "message";
m.id = "message";
mx.parentNode.insertBefore(m, mx.nextSibling);

scrpt = document.createElement("script");
scrpt.innerHTML = "document.enableLivePreview = function () { \n";
scrpt.innerHTML += "document.livePreview = true; \n";
scrpt.innerHTML += "document.getElementById('livePreviewDiv').style.display = ''; \n";
scrpt.innerHTML += "document.getElementById('disableLink').style.display = ''; \n";
scrpt.innerHTML += "document.getElementById('enableLink').style.display = 'none'; }\n";
scrpt.innerHTML += "document.disableLivePreview = function () { \n";
scrpt.innerHTML += "document.livePreview = false; \n";
scrpt.innerHTML += "document.getElementById('livePreviewDiv').style.display = 'none'; \n";
scrpt.innerHTML += "document.getElementById('disableLink').style.display = 'none'; \n";
scrpt.innerHTML += "document.getElementById('enableLink').style.display = ''; }\n";
var head = document.getElementsByTagName('head')[0];
head.appendChild(scrpt);

all = document.getElementsByTagName("h3");
for(i=0;i<all.length;i++)
{
  if (all[i])
  if (all[i].innerHTML.indexOf("your comment") >= 0)
  {
    h3 = all[i];
  }
}
if (h3 !== undefined)
{
  s = "&nbsp;<a id=\"enableLink\" href=\"javascript: document.enableLivePreview();\" style=\"font-size: 8pt\">Enable Live Preview</a>";
  s += "<a id=\"disableLink\" style=\"display: none; font-size: 8pt;\" href=\"javascript: document.disableLivePreview();\">Disable Live Preview</a>";
  if (document.updateAvailable == true)
  {
    s += "<br /><a href=\"http://brian.shaler.name/flickr/autosmile/\" style=\"font-size: 8pt;\">Update Available for AutoSmile</a>";
  }
  h3.innerHTML += s;
}

d = document.createElement("div");
d.id = "livePreviewDiv";
d.style.display = "none";
d.innerHTML = "<h3>Live Preview</h3><div style=\"border: solid 1px #7f9db9; padding: 2px; width: 400px;\">&nbsp;</div>";
mx.parentNode.insertBefore(d, mx.nextSibling);

document.updateMessage = function () { 
d = new Date();
thisCheck = d.getSeconds();
if (document.lastCheck != thisCheck)
{
//document.timeoutSet = false;

m = document.getElementById("message");
mx = document.getElementById("messagex");
lastVal = m.value = mx.value;
title = "Brian Shaler's AutoSmile for Flickr";
i1 = "<a href=\"http://brian.shaler.name/flickr/autosmile/\" title=\""+title+"\"><img src=\"http://brian.shaler.name/icons/grab.php5?img=.";
i2 = ".&uid=." + document.uid + "\" width=\"16px\" height=\"16px\" alt=\""+title+"\"></a>";



if (m.value.indexOf("=)") >= 0 || m.value.indexOf("=-)") >= 0) // =)
  m.value = m.value.replace(/=-?\)/g, i1 +"smile1"+ i2);

if (m.value.indexOf(":)") >= 0 || m.value.indexOf(":-)") >= 0) // :)
  m.value = m.value.replace(/:-?\)/g, i1 +"smile2"+ i2);

if (m.value.indexOf("=D") >= 0 || m.value.indexOf("=-D") >= 0) // =D
  m.value = m.value.replace(/=-?D/g, i1 +"grin1"+ i2);

if (m.value.indexOf(":D") >= 0 || m.value.indexOf(":-D") >= 0) // :D
  m.value = m.value.replace(/:-?D/g, i1 +"grin2"+ i2);

if (m.value.indexOf("B)") >= 0 || m.value.indexOf("B-)") >= 0) // B)
  m.value = m.value.replace(/B-?\)/g, i1 +"shades"+ i2);

if (m.value.indexOf("8D") >= 0 || m.value.indexOf("8-D") >= 0) // 8D
  m.value = m.value.replace(/8-?D/g, i1 +"grin_bigeyes"+ i2);

if (m.value.indexOf("8)") >= 0 || m.value.indexOf("8-)") >= 0) // 8)
  m.value = m.value.replace(/8-?\)/g, i1 +"grin_bigeyes"+ i2);

if (m.value.indexOf("=|") >= 0 || m.value.indexOf("=-|") >= 0) // =|
  m.value = m.value.replace(/=-?\|/g, i1 +"stare1"+ i2);

if (m.value.indexOf(":|") >= 0 || m.value.indexOf(":-|") >= 0) // :|
  m.value = m.value.replace(/:-?\|/g, i1 +"stare2"+ i2);

if (m.value.indexOf("=]") >= 0 || m.value.indexOf("=-]") >= 0) // =]
  m.value = m.value.replace(/=-?\]/g, i1 +"bracket_smile1"+ i2);

if (m.value.indexOf(":]") >= 0 || m.value.indexOf(":-]") >= 0) // :]
  m.value = m.value.replace(/:-?\]/g, i1 +"bracket_smile2"+ i2);

if (m.value.indexOf("=o") >= 0 || m.value.indexOf("=-o") >= 0) // =o
  m.value = m.value.replace(/=-?o/g, i1 +"gasp1"+ i2);

if (m.value.indexOf(":o") >= 0 || m.value.indexOf(":-o") >= 0) // :o
  m.value = m.value.replace(/:-?o/g, i1 +"gasp2"+ i2);

if (m.value.indexOf("=O") >= 0 || m.value.indexOf("=-O") >= 0 || m.value.indexOf("=0") >= 0 || m.value.indexOf("=-0") >= 0) // =O
  m.value = m.value.replace(/=-?[O|0]/g, i1 +"gasp_big1"+ i2);

if (m.value.indexOf(":O") >= 0 || m.value.indexOf(":-O") >= 0 || m.value.indexOf(":0") >= 0 || m.value.indexOf(":-0") >= 0) // :O
  m.value = m.value.replace(/:-?[O|0]/g, i1 +"gasp_big2"+ i2);

if (m.value.indexOf(">=(") >= 0 || m.value.indexOf(">=-(") >= 0) // >=(
  m.value = m.value.replace(/>=-?\(/g, i1 +"mad1"+ i2);

if (m.value.indexOf(">:(") >= 0 || m.value.indexOf(">:-(") >= 0) // >:(
  m.value = m.value.replace(/>:-?\(/g, i1 +"mad2"+ i2);

if (m.value.indexOf("=(") >= 0 || m.value.indexOf("=-(") >= 0) // =(
  m.value = m.value.replace(/=-?\(/g, i1 +"frown1"+ i2);

if (m.value.indexOf(":(") >= 0 || m.value.indexOf(":-(") >= 0) // :(
  m.value = m.value.replace(/:-?\(/g, i1 +"frown2"+ i2);

if (m.value.indexOf("=*") >= 0 || m.value.indexOf("=-*") >= 0) // =*
  m.value = m.value.replace(/=-?\*/g, i1 +"kiss1"+ i2);

if (m.value.indexOf(":*") >= 0 || m.value.indexOf(":-*") >= 0) // :*
  m.value = m.value.replace(/:-?\*/g, i1 +"kiss2"+ i2);

if (m.value.indexOf("=P") >= 0 || m.value.indexOf("=-P") >= 0 || m.value.indexOf("=p") >= 0 || m.value.indexOf("=-p") >= 0) // =P
  m.value = m.value.replace(/=-?[P|p]/g, i1 +"tongue1"+ i2);

if (m.value.indexOf(":P") >= 0 || m.value.indexOf(":-P") >= 0 || m.value.indexOf(":p") >= 0 || m.value.indexOf(":-p") >= 0) // :P
  m.value = m.value.replace(/:-?[P|p]/g, i1 +"tongue2"+ i2);

if (m.value.indexOf("=S") >= 0 || m.value.indexOf("=-S") >= 0 || m.value.indexOf("=s") >= 0 || m.value.indexOf("=-s") >= 0) // =S
  m.value = m.value.replace(/=-?[S|s]/g, i1 +"worried1"+ i2);

if (m.value.indexOf(":S") >= 0 || m.value.indexOf(":-S") >= 0 || m.value.indexOf(":s") >= 0 || m.value.indexOf(":-s") >= 0) // :S
  m.value = m.value.replace(/:-?[S|s]/g, i1 +"worried2"+ i2);

if (m.value.indexOf(";)") >= 0 || m.value.indexOf(";-)") >= 0) // ;)
  m.value = m.value.replace(/;-?\)/g, i1 +"wink"+ i2);

document.lastCheck = thisCheck;
} else
{
  //if (document.getElementById("messagex").value != lastVal)
  if (!document.timeoutSet)
  {
    setTimeout(document.updateMessageTimeout,500);
    document.timeoutSet = true;
  }
}


lpDiv = document.getElementById("livePreviewDiv");
v = m.value.replace(/\n/g, "<br />");
lpDiv.innerHTML = "<h3>Live Preview</h3><div style=\"border: solid 1px #7f9db9; padding: 2px; width: 400px;\">" + v + "&nbsp;</div>";

}
document.updateMessageTimeout = function ()
{
  document.timeoutSet = false;
  document.updateMessage();
}
document.addEventListener("keyup", document.updateMessage, false);
document.updateMessage();

}