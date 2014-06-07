{\rtf1\ansi\ansicpg1252\deff0\deflang1031{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           Travian: Antifarm\\Troop saver - Original\par
// @namespace      n\\a\par
// @include        http://welt5.travian.de/dorf1.php*\par
// ==/UserScript==\par
\par
// =)\par
\par
//Change these to some valid coordinates for your server\par
xSave = "97";\par
ySave =  "174";\par
\par
var reload = true;\par
\par
loginCheck();\par
setTimeout(function()\{autoreload()\},900000); \par
checkImg(document)\par
function getArrivalTime()\par
\{\par
\par
div = document.getElementById('ltbw0');\par
if (!div) \{div = document.getElementById('ltbw1'); \}\par
rows = div.getElementsByTagName("tr");\par
  for (x=0;x<rows.length;x++)\par
  \{\par
  cells = rows[x].getElementsByTagName("td");\par
    \par
    if (cells[0].innerHTML.search('att1') > 0)\par
    \{\par
     arrival = cells[4].getElementsByTagName("span")[0].innerHTML;\par
     \par
    \}\par
  \} \par
hours = parseInt(arrival.split(':')[0]);\par
minutes = parseInt(arrival.split(':')[1]);\par
seconds = parseInt(arrival.split(':')[2]);\par
\par
totSeconds = hours*60*60 + minutes*60 + seconds \par
  if (totSeconds < 30)\par
  \{\par
  GM_log(">30 seconds");\par
  reload = false;\par
  saveTroops();\par
  \}else\{\par
  window.setTimeout(function()\{getArrivalTime()\},1000);\par
  \}\par
\par
\}\par
\par
\par
function checkImg(doc)\par
\{\par
\par
\tab var ex = "//img[contains(@src,'att1')]";\par
\tab tag = document.evaluate( \par
  \tab ex,\par
    \tab doc,\par
    \tab null,\par
    \tab XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\par
    \tab null);\par
\par
\tab if (tag.snapshotLength) \{ getArrivalTime();\}\par
\}\par
\par
\par
\par
//saveTroops();\par
\par
\par
\par
function saveTroops()\{\par
GM_log("Preparing to send away");\par
url = "http://" + document.domain + "/a2b.php?" + getActiveVillage();\par
  GM_xmlhttpRequest(\{\par
    method: "GET",\par
    url: url,\par
    onload: function(responseDetails) \par
    \{\par
\tab   pulled = document.createElement('div');\par
    pulled.innerHTML = responseDetails.responseText; \par
    prepSave(pulled);\par
    \}\par
  \tab\tab     \});\par
\}\par
function prepSave(pulled) \par
\{\par
t1 = getTotalUnit(pulled,'t1')\par
t2 = getTotalUnit(pulled,'t2')\par
t3 = getTotalUnit(pulled,'t3')\par
t4 = getTotalUnit(pulled,'t4')\par
t5 = getTotalUnit(pulled,'t5')\par
t6 = getTotalUnit(pulled,'t6')\par
t7 = getTotalUnit(pulled,'t7')\par
t8 = getTotalUnit(pulled,'t8')\par
t9 = getTotalUnit(pulled,'t9')\par
t10 = getTotalUnit(pulled,'t10')\par
t11 = getTotalUnit(pulled,'t11')\par
\par
if (t1 < 1 && t2 < 1 && t3 < 1 && t4 < 1 && t5 < 1 && t6 < 1 && t7 < 1 && t8 < 1 && t9 < 1 && t10 < 1 && t11 < 1)\par
\{\par
return;\par
\}\par
\par
url = "http://" + document.domain + "/a2b.php?" + getActiveVillage();\par
data = 'b=1&t1='+t1+'&t4='+t4+'&t7='+t7+'&t9='+t9+'&t2='+t2+'&t5='+t5+'&t8='+t8+'&t10='+t10+'&t11='+t11+'&t3='+t3+'&t6='+t6+'&c=2&dname=&x='+xSave+'&y='+ySave+'&s1=ok';\par
\par
GM_log(url + data);\par
\par
    GM_xmlhttpRequest(\{\par
    method: "POST",\par
    url: url,\par
    headers:\{'Content-type':'application/x-www-form-urlencoded'\},\par
    data:encodeURI(data),\par
    onload: function(responseDetails) \par
    \{\par
\tab   pulled = document.createElement('div');\par
    pulled.innerHTML = responseDetails.responseText;\par
    finishSave(pulled);\par
\par
    \}\par
  \tab\tab     \});\par
\}\par
\par
function finishSave(pulled)\par
\{\par
\tab idValue = getValue(pulled, 'id');\par
\tab aValue = getValue(pulled, 'a');\par
\tab cValue = getValue(pulled, 'c');\par
\tab kidValue = getValue(pulled, 'kid');\par
\tab t1Value = getValue(pulled, 't1');\par
\tab t2Value = getValue(pulled, 't2');\par
\tab t3Value = getValue(pulled, 't3');\par
\tab t4Value = getValue(pulled, 't4');\par
\tab t5Value = getValue(pulled, 't5');\par
\tab t6Value = getValue(pulled, 't6');\par
\tab t7Value = getValue(pulled, 't7');\par
\tab t8Value = getValue(pulled, 't8');\par
\tab t9Value = getValue(pulled, 't9');\par
\tab t10Value = getValue(pulled, 't10');\par
\tab t11Value = getValue(pulled, 't11');\par
url = "http://" + document.domain + "/a2b.php?" + getActiveVillage();\par
  data = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1='+t1Value+'&t2='+t2Value+'&t3='+t3Value+'&t4='+t4Value+'&t5='+t5Value+'&t6='+t6Value+'&t7='+t7Value+'&t8='+t8Value+'&t9='+t9Value+'&t10='+t10Value+'&t11='+t11Value+'&s1=ok&attacks=&cords=';\par
  GM_log(url + data);\par
    GM_xmlhttpRequest(\{\par
    method: "POST",\par
    url: url,\par
    headers:\{'Content-type':'application/x-www-form-urlencoded'\},\par
    data:encodeURI(data),\par
    onload: function(responseDetails) \par
    \{\par
    GM_log("Troops sent away");\par
\tab   pulled = document.createElement('div');\par
    pulled.innerHTML = responseDetails.responseText; \par
    window.setTimeout(function()\{retreat()\},16000);\par
    GM_log("Troops will be retreated in 16 seconds");\par
    \}\par
  \tab\tab     \});\par
  \par
\}\par
\par
function retreat ()\par
\{\par
GM_log("Preparing to retreat troops");\par
url = "http://" + document.domain + "/build.php?id=39&" + getActiveVillage();\par
  GM_xmlhttpRequest(\{\par
    method: "GET",\par
    url: url,\par
    onload: function(responseDetails) \par
    \{\par
\tab   pulled = document.createElement('div');\par
    pulled.innerHTML = responseDetails.responseText; \par
    \par
    finishRetreat(pulled);\par
    \}\par
  \tab\tab     \});\par
\}\par
function finishRetreat(code)\par
\{\par
GM_log('yey');\par
\tab var ex = ".//img[contains(@src,'del.gif')]/..[contains(@href,'t=')]";\par
\tab tag = document.evaluate( \par
  \tab ex,\par
    \tab code,\par
    \tab null,\par
    \tab XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\par
    \tab null);\par
    \tab\par
    \tab if(tag.snapshotLength)\par
    \tab\{\par
      url = "" + tag.snapshotItem(0)\par
      t = parseInt(url.split('t=')[1]);\par
      for(var i=1; i<=tag.snapshotLength;i++)\par
\tab    \{\par
\tab    temp = "" + tag.snapshotItem(i);\tab    GM_log(temp);\par
\tab    thisT = parseInt(temp.split('t=')[1]);\par
\tab    if (thisT > t)\par
\tab    \{\par
     url = temp;\par
     \}\par
\tab  \par
\tab  \}\par
      GM_xmlhttpRequest(\{\par
    method: "GET",\par
    url: url,\par
    onload: function(responseDetails) \par
    \{\par
    GM_log("Troops retreated");\par
\tab   pulled = document.createElement('div');\par
    pulled.innerHTML = responseDetails.responseText; \par
    \par
    GM_log("saved");\par
    \}\par
  \tab\tab     \});\par
  \tab\tab     \par
      \}\par
\par
\par
\}\par
\par
function getTotalUnit(doc,t)\par
\{\par
var ex = ".//a[contains(@OnClick,'" + t + "')][@href='#']";\par
\tab result = document.evaluate( \par
  \tab ex,\par
    \tab doc,\par
    \tab null,\par
    \tab XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\par
    \tab null);\par
if (result.snapshotLength)\par
\{\par
thisResult = result.snapshotItem(0).innerHTML;\par
return ((thisResult.substring(1,thisResult.length-1)))\par
\}else\{\par
      return 0;\par
      \}\par
\par
\}\par
\par
function getValue(doc, name)\par
\{\par
var ex = ".//input[@type='hidden'][@name='" + name + "']";\par
tag = document.evaluate( \par
  \tab ex,\par
    \tab doc,\par
    \tab null,\par
    \tab XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\par
    \tab null);\par
if (tag.snapshotLength)\par
  \{\par
\tab aTag = tag.snapshotItem(0);\par
\tab return(aTag.value);\par
\tab\}else\{\par
  return 0;\par
  \}\par
\par
\}\par
function getActiveVillage()\par
\{\par
var ex = "//a[contains(@href,'newdid')][@class='active_vl']";\par
\tab tag = document.evaluate( \par
  \tab ex,\par
    \tab document,\par
    \tab null,\par
    \tab XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\par
    \tab null);\par
\par
  if (tag.snapshotLength)\par
  \{\par
\tab temp = tag.snapshotItem(0).href.split("?")[1].split('&');\par
\tab return temp[0];\par
  \}else\{\par
  return 0\tab\par
\}\par
\}\par
loginCheck();\par
function loginCheck()\par
\{\par
if (document.getElementsByName('login'))\par
\{\par
var ex = ".//input[@value='login']";\par
tag = document.evaluate( \par
  \tab ex,\par
    \tab document,\par
    \tab null,\par
    \tab XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\par
    \tab null);\par
\par
var ex = ".//input[@type='password' and contains(@value, '*')]";\par
tag2 = document.evaluate( \par
  \tab ex,\par
    \tab document,\par
    \tab null,\par
    \tab XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\par
    \tab null);\par
    if(tag.snapshotLength && tag2.snapshotLength)\par
    \{\par
    loginButton = tag.snapshotItem(0);\par
    loginButton.click();\par
    \}\par
\}\par
\}\par
\par
function autoreload()\par
\{\par
if (reload)\par
\{\par
url = "http://google.com";\par
  GM_xmlhttpRequest(\{\par
    method: "GET",\par
    url: url,\par
    onload: function(responseDetails) \par
    \{\par
\tab   pulled = document.createElement('div');\par
    pulled.innerHTML = responseDetails.responseText; \par
        // this reloading method avoids the browser asking whether to submit form again\par
    if (location.href.indexOf('#') > 0) \{\par
        location.href = location.href.substring(0, location.href.length - 1);  // remove trailing '#' or reload won't work   \par
    \}\par
    else \{\par
        location.href = location.href;\par
    \}\par
    \}\par
  \tab\tab     \});\par
\}\par
\par
\}\par
}
 