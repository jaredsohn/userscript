{\rtf1\ansi\ansicpg1252\deff0\deflang1036{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.21.2507;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name       cdv by appli'\par
// @version    0.2\par
// @match      http://www.jeuxvideo.com/profil/*\par
// ==/UserScript==\par
var url = "http://www.jeuxvideo.com/profil/ajax_cdv_description.php";\par
function cdv() \{\par
 \par
var date=new Date()\par
if (date.getSeconds() < 10) \{\par
var secondes = '0'+date.getSeconds();\par
\}\par
else \{\par
        var secondes = date.getSeconds();\par
\}\par
if (date.getHours() < 10) \{\par
var he = '0'+date.getHours();\par
\}\par
else \{\par
var     he = date.getHours();\par
\}\par
if (date.getMinutes() < 10) \{\par
var min = '0'+date.getMinutes();\par
\}\par
else \{\par
        var min = date.getMinutes();\par
\}\par
    var req = new XMLHttpRequest();\par
req.open('GET', 'http://www.jeuxvideo.com/messages-prives/get_message_nonlu.php?skipmc=1/', true);\par
req.onreadystatechange = function () \{\par
    if (req.readyState == 4) \{\par
    if(req.status == 200)\{\par
     console.log(req.responseText);\par
    var mp = req.responseText;\par
        mp = mp.split(':')[1].split('\}')[0];\par
   \par
var horr = he+":"+min+":"+secondes;\par
        var mess = 'Il est :cd:'+horr+":cd: \\n \\n PauvreGrosMoche > all :ok: \\n \\n J'ai "+mp+" MP :noel:";\par
var data = "action=save&donnees="+mess+"&hash_cdv="+unsafeWindow.hash_cdv+"&time_cdv="+unsafeWindow.time_md5;\par
        var xhr = new XMLHttpRequest();\par
                                        xhr.open('POST', url, true);\par
                                        xhr.setRequestHeader('Content-Type',\par
'application/x-www-form-urlencoded');\par
                                        xhr.onload = function()\par
                                        \{\par
                                               \par
                                                                                       \par
                                                console.log('done');\par
                                        \}\par
                                        xhr.send(data);\par
                               \par
  \}\par
\}\par
\};\par
req.send(null); \par
\}\par
setInterval(cdv,1000);\par
}
