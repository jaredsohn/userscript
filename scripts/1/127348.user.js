{\rtf1\fbidis\ansi\ansicpg1256\deff0\deflang1025{\fonttbl{\f0\fswiss\fcharset0 Arial;}{\f1\fswiss\fcharset178{\*\fname Arial;}Arial (Arabic);}}
{\*\generator Msftedit 5.41.15.1515;}\viewkind4\uc1\pard\ltrpar\lang1036\f0\fs20     Signup\par
    Login\par
\par
Userscripts.org\par
\par
    Scripts\par
    Tags\par
    Forums\par
    People\par
    Blog\par
\par
tribalwars - Smili es-BB-Codes-List-TAKI007-Crazy doctors\par
By taki007 \emdash  Last update Mar 4, 2011 \emdash  Installed 149 times.\par
\par
    About\par
    Source Code\par
    Reviews 0\par
    Discussions 0\par
    Fans 0\par
    Issues\par
    Share\par
\par
There are 9 previous versions of this script.\par
Add Syntax Highlighting (this will take a few seconds, probably freezing your browser while it works)\par
\par
// ==UserScript==\par
// @name          \par
// @version       2.1-arabic\par
// @author        Samuel Essig (http://c1b1.de)\par
// @description   \par
// @namespace     c1b1.de\par
// @homepage      http://c1b1.de\par
// @copyright     2009, Samuel Essig (http://c1b1.de)\par
\par
// @include       http://*.tribalwars.*/*forum.php*answer=true*\par
// @include       http://*.tribalwars.*/*forum.php*edit_post_id*\par
// @include       http://*.tribalwars.*/*forum.php*mode=new_thread*\par
// @include       http://*.tribalwars.*/*forum.php*mode=new_poll*\par
\par
// @include       http://*.tribalwars.*/*screen=memo*\par
\par
// @include       http://*.tribalwars.*/*screen=mail*mode=new*\par
// @include       http://*.tribalwars.*/*screen=mail*mode=view*\par
\par
// @include       http://*.tribalwars.*/*screen=ally*mode=overview*\par
// @include       http://*.tribalwars.*/*screen=ally*mode=properties*\par
\par
// @exclude       http://forum.tribalwars.*/*\par
// ==/UserScript==\par
\par
/*\par
\par
############## Distribution Information ##############\par
\par
All content by c1b1.de\par
Do not distribute this script without this logo.\par
\par
######################## Logo ########################\par
           ___   __       ___             __\par
  _____   <  /  / /_     <  /        ____/ /  ___\par
 / ___/   / /  / __ \\    / /        / __  /  / _ \\\par
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/\par
\\___/   /_/  /_.___/   /_/   (_)   \\__,_/   \\___/\par
\par
######################################################\par
\par
If you have any questions, comments,\par
ideas, etc, feel free to contact me\par
and I will do my best to respond.\par
\par
         mail:info@c1b1.de\par
\par
         skype:c1b1_se\par
\par
         http://c1b1.de\par
\par
####################### License ######################\par
\par
Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:\par
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode\par
\par
English Summary of that license:\par
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en\par
\par
\par
##################### Description ####################\par
\par
\par
Funktioniert mit Firefox 3.5+ (GM 0.8+) und Opera 10+\par
\par
F\'fcr Opera wird folgende Scriptversion empfohlen:\par
http://userscripts.org/scripts/version/39879/112353.user.js\par
\par
F\'fcgt ein Auswahlfeld im Internen Forum hinzu, damit man Smilies und Icons ausw\'e4hlen kann, au\'dferdem die BB-Codes f\'fcr Berichte und Code.\par
Seit Version 2 k\'f6nnen Texte gespeicherter werden.\par
\par
\par
Screenshot:\par
http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.smilies_bb-codes_0.png ( First Version )\par
http://s3.amazonaws.com/uso_ss/1407/large.png ( Version 1.7 )\par
http://s3.amazonaws.com/uso_ss/1406/large.png ( Version 1.7 )\par
http://s3.amazonaws.com/uso_ss/1405/large.png ( Version 1.8 )\par
http://s3.amazonaws.com/uso_ss/1408/large.png ( Version 1.8 )\par
\par
*/\par
const ver = 2.4;\par
\par
\par
\par
var smilies = new Array(\par
'http://skype-emoticons.com/images/emoticon-00173-middlefinger.gif',\par
'http://skype-emoticons.com/images/emoticon-00174-bandit.gif',\par
'http://skype-emoticons.com/images/emoticon-00175-drunk.gif',\par
'http://skype-emoticons.com/images/emoticon-00176-smoke.gif',\par
'http://skype-emoticons.com/images/emoticon-00178-rock.gif',\par
'http://skype-emoticons.com/images/emoticon-00179-headbang.gif',\par
'http://skype-emoticons.com/images/emoticon-00180-bug.gif',\par
'http://skype-emoticons.com/images/emoticon-00181-fubar.gif',\par
'http://skype-emoticons.com/images/emoticon-00182-poolparty.gif',\par
'http://skype-emoticons.com/images/emoticon-00183-swear.gif',\par
'http://skype-emoticons.com/images/emoticon-00184-tmi.gif',\par
'http://skype-emoticons.com/images/emoticon-00185-heidy.gif',\par
'http://skype-emoticons.com/images/emoticon-00172-mooning.gif',\par
\par
var ds_icons = new Array(\par
\par
\par
);\par
\par
\par
var icon_smilies = 'http://www.plapl.com/images/smilies/26.gif';\par
\par
var icon_report_direct = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYFBMVEUAAACvsrebjHDXy7f5+Pausra0po2nmYC+s5qL\\\par
e125ur7QxJ6WDArKvJHRv6rDEBCtsbbTyKLNwZvRgHLJvJTZl4rn3Na2Z1rVzK7t6OLIuI/Ds43Zz7DKu5Lb0bGssLVAcwUHAAAAAXRSTlMAQObYZgAAAKVJ\\\par
REFUeF5tzdcOwzAIQFGG98ruHv//l8WtFNVyzhtXIACC/oOIOgDgpRMAH50R8NV5H8V2k501htvoiJViI3F/tJFTSl3Z1kdTxfY8DCdJhuwkMcboyJ7UNgzF\\\par
EJUYNeA8k1HiuqREZRYIuK6e5FC2UiprJTFncp6t9+6cllzpb/SWvMl5W35xrNGRJ5aBOe+xg0dRy/eOxPvt2bjdA0AYdWMM8AFB7hjReYdZRgAAAABJRU5E\\\par
rkJggg==';\par
\par
var icon_report_link = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABIFBMVEUAAACbjHCvsrfJvJT5+PbXy7e0po2+s5qLe12n\\\par
mYDKvJG5ur6tsbausrbb0bHRv6qWDArZz7DQxJ7DEBDRgHLZl4rNwZvn3NbTyKLDs43IuI+2Z1rt6OLVzK7Ku5KssLV1wtydqZxgosGVqKVXsVBq0eyBqZVf\\\par
mJ26t5ZcndFtgnQsoD+J7vjAvpaKnomnqYlsoGJFWnEob3E8nbJPw+RQxeZKqdpIf8hSf5hsvENKUnkkR38xcaU2iMI5ic09ecc4Wbo1W48+hUxobH4lNoQf\\\par
ZVohgFAudIAxUaksQagrQZo/WoSimotUX4cnY1IUfRwXgCglcl80Xpc8YKN1gZGrpJFqeIc/hVcymURAlXFVi7CCnai2r5JhyuhVlc9biqeITlZjAAAAAXRS\\\par
TlMAQObYZgAAAPNJREFUeF5lzeNyBEEUgNG+bYy1jG3btu33f4t0MqnJbO3389QFQsYthTF2DUK4oy2DcNiWg7BXxITinHleVwkFMEoZ97z/yRQEpbTJVIFM\\\par
NeK4YolDjmEoQFVoGsc+B/DzR1Xg1NZMggD86k8WIwl20U4Fgd/XMxxFkYtwBkIyJaVoBEl37+BElmGECUgFkk/1p0kyMDI0SYhFLUAC06NjjI1/fH5Na+1a\\\par
zJuZnZtfWFxaXtHaKXB1bX1jc2t7Z7eMe/sHh0fHJ6dnWuMCzy8ur65vbu/uf2+Svx4en55fXt/eCbFYq3e2VK8ZhIzjtuQY9A0LLSCs0XdPPQAAAABJRU5E\\\par
rkJggg==';\par
\par
var icon_code = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHGQkYLjfIjVsA\\\par
AAKeSURBVDjLnZRLSFRhFMd/3zejTir2cqNYZDkKPibMR20isVJa9bAWCe0q2rSQamPhIre5L4g2QZsWhVFmiESJoab5GEYszUc6YabkjPNq5t6vxXWuDs5YeeAP3+N//t+5555zBED7\\\par
m07lCwb5HxMIc61QpNls1NZUC/GstU3lZwewWiRSCrZiuq6IaDqzSzuQAFaLNC/i4deyl67uQUKhMLqu8PuDdHUPsuILoOuKqMZKIGgISik2RXtHNzcaW0hJSUJKwYfeYa5ebza/Kgql\\\par
lCH4N+vpc1JRVrS2/+jEUWLHZkuJzasQ/ybY2++ksqx43QMjHC4vicv9q+DUtJv5H0tUlhuCXq+P0bFJDlcUx//7z1rbVOGeUMzhpct3cI19BUCLaASCIdLTU40S0XV8/iBpqTaENOLp\\\par
f/8EAOdMMlaA3yFPjGDd6aNULTkAePr8Ldsz0jh18ggArzt68Hh81J0+ZvLX/DMNQS0SiRGsra4w148ev6T+/AkunKkC4MWrLo4fK6P+/AmTE/UXYjWHmqbFxeSUm5+Lyxw6aEfTNDxe\\\par
H6Ofpyl15MXlC4QRYSQcipvgvk8udu/KICdrJ5FwiP5PLgAK83MS+liNvtTMg4bbD8z15Mw8kYjGrab7AMy6F7FaLTQ2PzRKREpamq/E9PSGsrFYpAn390Wys3abd7NzC+RkZ8Zw1ptS\\\par
qxGut3t3jRe/zS3wrttJ082LHMjNxuP1c/JcIw3XzlJZVpCwbhMWdv/QONszUtm/LwuAwZEJpBQ4inITi23WegNDXygtyUMIY6QNDI9TWLAXmy05oaCZQ4VlAwaGJig9aI/dO+xxuVGY\\\par
rZcpXCQlSaTFsrUBq2mEwzr+lFJjjre/6VQrgSBiawMbpSB9m43amuqkP9SuNod5SVyuAAAAAElFTkSuQmCC';\par
\par
var icon_icons = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHGQkaKOydSuwA\\\par
AAMgSURBVDjLnZRPaBxlGMZ/839md5P9Y3Y3TTZry9pNtJVqD4b2EDWH1JMnteCpXgpBBO2hooeCBW+CJ/UiVFDw4CEQClsVzCUWqlbBGpVgUvxTaNxm081kd2Z35pvxMO402yyCeU/D\\\par
937P8z3zvs/7SgALi7UwJOT/hIQUf4eEJE2TU3OzirSwWAurYw6qIiPLEvuJIAjxRcBfjQwqgKrIcWKvFJ0w6ACgqAaB6A4kVRWZHceNCAcpO/7cZbJTZYRrs3njx+jQ/Qnf6/DL1Q8H\\\par
koZhiDwoMfPaZazcNsK16drbWIUpAMxciaNTVc6+/PbgukpSpHB3vHi+Rv7403hff8x0/k8SBy0sEzbqw+juXbZEFsdp4PhJLLW1h7RP4cmzy/zhjDG5/hmPlZKMFrMcO1KlWjnIo1MV\\\par
XjhdBiBhWpx//cJAlXKvGUEQYv9+g+bKAoaukc0Mc/ihKhMHyhQeSDOSL5LPZRgvejhdGVVP8+ZbH8XYXkNVgG5nGwBtaILnj9xFsXQeHC9SKpVI6QZWIo9xu8746G2efOJvbm342G0H\\\par
4fsxNoqRSKHw/SjZFHzzm42m6qSSSVK6QS6bjq837Xs1Mw2d764vx1jh+0jSvwqFEACIts3E2BjPzu5waGKD8uF1tFwJgIcbdb692qC+2WI83+C9S9+zG9ubHhXA9yLjaumoR7bd5dUL\\\par
Na4srQGQHjIBePfiU2w1nZjskclKjI0NHjFHr2QmhzGNFvWtJG+8Mg3AlaU1mrbbBzo3/wwrq00kORljezPd58OECyThy+UmS9c0DlVmmK/MANBuOTjOHdyO4NbNLSR5CNMw7puU+3z4\\\par
6cWjAHS9Do7r0m45MZkf3FNyp5vEEwHTJ078t7EBDowWMNSAhCHT2kUqRNB3T1Nk5k6W+8kkaS/hmdPH+HX1JqlwMz7reB6+EDiuj9sRmIbO6to6vt/o/+VeDUOUvsSl98+BJPPS/DsU\\\par
CyNksgUArq+4XPthk08+OIMsBwNXsrSwWAtHpJ/RNBlZUfa3YIXA8wLaxuPRHv/8i6/CHcdF2t/CJgwhZZmcmpuV/wER7Et6eXrxhgAAAABJRU5ErkJggg==';\par
\par
var icon_convertCoords = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAA\\\par
ABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAANiSURBVDhPnZVdaFtlGMd/5+Tkc2maNBubTWzW1JTQ6kDprhRBalFECU7GvBoDZTL1wiHb\\\par
wEtBL3Y5ZFgmeDfGrLMbtEOddirKtBCUdjE2nTbFNetam6YfyUl6kuP7npK5kkLUB55zzvue//M/z/t8HWVwcFDZ2xmrres6/0UUlHtwE5MdLhefDl1oVT7/\\\par
4msz3LbclEuzqU0xMws+tLWSzr8B2+1aU0KLyzRNVHXTffmsKP8cpc6w3d527NJeux9cf5Z3qctLd7gzlbZs1Zad1t3uduH3Omnb3dHAKW0azmGRCp37NcnN\\\par
775k9Idf6B8YIBxaI/nHOhPfXCayy0Xi2DtEu2INpFsiXauZXDt3mrdef5uy02eRRQIKe8wcHaEeXko8TmK/n+yCTjo1xdgHx/htcmILqeWhJJJy+vIwzkWT\\\par
pR4fLk8rj7QrREOtrBX+5NKFs+RWFXoDFdq8KgPPPkN+vpvs2EVqvQ/fI1VlIOdULxczScZv/MTRN14h2tvJyaGz9MTCBO0lC1yw7aTvyado3xMkFuvFMIq0\\\par
BHfj69xHWV+1VIpaz3CpXKKnP86Jax9ze+E2gbCf886QBZKkmXmDB7w1Fh1xHnv6BTbKOmfO5/CGuqlVDUtl+BuqtSSAZaGFYoGqVuVD/z6LdCKVZfnmKJXZ\\\par
7xn+0cGr7/7O0YSHGVEFp87kGBkPiN4RWZYXz0KacrGMYX2pSlEvUTUM8ht58jnRRZ1wONEnPL3Be9OHcczeFXGvcvBkBrc7iNu5SjozR3fkQVTZhwpVDnV1\\\par
8ej0ogiWapFV1iv8lSxwfP9Brs9HOPBiP0euPm95WyyV0cuGcKBmrT0eFw7HZgVq9QzLFwMvH6J1PM251HUKqWU+OfUm7qAfnohjbGwa66UVqjUbNs3O/e0d\\\par
DHgR+UUZGh4xO7zT1pekKKIN797Kkvp2BKp52nwOUUIt6MVVllYqvD8mjtUSR7PvELEu81A0zPHXniMeTDJTiKJ8duWqGfJMWWSyGmUnK6pqZSw7OYk5lxWG\\\par
szidHSjtETy79nLgxM9i7earj/osu7rMrnShXLoyaoY9mS0vtlvYNNt221v2sivRzV42aQ5WlOYYya7JSVsRWWsmptFQsg0mkssafnJqy+Eo4/Z/RGbXK8aa\\\par
+AV4/was4VDzReWIEgAAAABJRU5ErkJggg==';\par
\par
var icon_usertexts = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAA\\\par
ABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAMpSURBVDhPjVVNb9NAEH3rtWM7SZOmBTWqgKqBVAJa4ILEmQP8XCQuCA6cOKKWUyVKJShq\\\par
y1cp+awTfy1vNm3iNgeYyNpde+ftm5k3GwXa6zdvzXA0kul/m4Ka7jUwqAQBnj976qgXL1+ZjdWoAKTgqC6y1ANMB8b4yLMOHB3CcXKugVF0CpMreOEavNLC\\\par
1PfwdBGurFztTF/+PnXR+f0dWv1Af3gdnjnAWdpCUNpDkq9D4xvHFR76CzfWciyHM99BNJoAOs6M/uHPGn4ct7G+6iBzH6Lma7J6At98QH3xCZLBRyw2t5AM\\\par
9xGrGlnPUmVI3zIsmtYajx63cWP1LhJTQ9Vvo1pvIks2EFaWGe4dVBYWObbwaX+frodTd6WYrquARmVYai7h8/EvvN9+h+OTDkqBRn15BX7god5Ygus6KFer\\\par
AAGu2hwglIOS76Hb7SFg5eRRkhIW45JxXUzVxTcbcp7Pdps84xq4eesmxxyNpYZlkjE/mnslrAsz3Me6XzrHAsbj3myTYek9jfbGhgUseR4ialRg+mQdj8eo\\\par
1WpoNHgQ4Yq+wLVJUbI0nQLmWYo0ybGzs4OvBwcWMM8ySLHqBDI8pLXesswNjyn6Cnmbw4wOF4/k0NEKw+GQXxQGHIMwRL/ft3m1OS6VbE4FoOgr3WNDTpPx\\\par
jGGaIElzlCsVJEmCwA/Q63UJWmboEUG7uN1qne9Xl3zlpQUk8SkgW4CAIws2GAxsqL7vo0qZVHhItVzGSrOJXHpwEvTUV3p6TtgwGUP20Grfwf0HW2w5n2dQ\\\par
sA5TwVHLnI9U12IWTNbzgMqlcDW+Hx/ZUMMgtBUXdmIT2bAclJr8rto8IHWYpgYxK392FvHicK18pE/FXeaka6tZkK/FFebzgNxsmFMpyrejI2QclbwjYHIu\\\par
ryFzm1CPvc4fzC4vyeh5Dic9MCFfLUuBMtTqddzb3ERE2ezt7lKLOcbRwDLzXOYw7qPkkjnTU7RJp0RjeJ7oT+PawglOvmwjjkVjMVQ2YiFSVtpD6MacG4pd\\\par
I1VnVAfDJ3MRfsJmkFtbOkrxLyCXy7HQppdO/ddCqlsN7V+A/gtSUG0hEZwMIwAAAABJRU5ErkJggg==';\par
\par
Array.prototype.remove = function()\par
  \{\par
  for(var i = 0,l = arguments.length; i < l; i++)\par
    \{\par
    var x = this[arguments[i]];\par
    if (x)\par
      this.splice(x,1);\par
    \}\par
  return this;\par
  \}\par
\par
const url = document.location.href;\par
\par
const forum = url.indexOf('forum.php') != -1 && (url.indexOf('answer=true') != -1 || url.indexOf('mode=new_thread') != -1 || url.indexOf('edit_post_id') != -1 || url.indexOf('mode=new_poll') != -1);\par
const memo = url.indexOf('screen=memo') != -1;\par
const mail = url.indexOf('screen=mail') != -1 && (url.indexOf('mode=new') != -1 || url.indexOf('mode=view') != -1);\par
const ally = url.indexOf('screen=ally') != -1 && (url.indexOf('mode=overview') != -1 || url.indexOf('mode=properties') != -1);\par
\par
const gm = typeof(GM_setValue) != 'undefined';\par
\par
if(document.getElementById('message') || document.getElementById('intern') || document.getElementById('desc_text'))\par
  \{\par
  // Host\par
  var root = 'http://' + document.location.host;\par
\par
  // Div\par
  if(ally && document.getElementById('desc_text'))\par
    var mainDiv = document.getElementById('bb_row').getElementsByTagName('div')[0];\par
  else if(forum || memo || ally)\par
    var mainDiv = document.getElementsByTagName('form')[0].getElementsByTagName('div')[0];\par
  else if(mail)\par
    var mainDiv = document.getElementById('message').parentNode.parentNode.previousElementSibling.getElementsByTagName('div')[0];\par
\par
\par
\par
  // Additional Style\par
  var css = '#bb_icons td a \{ display:none;  \} #bb_icons img \{ max-width:40px; max-height:40px; \} .tdbutton \{ color:DarkBlue; font-family:"Courier New"; text-decoration:underline; \}';\par
\par
  if (typeof GM_addStyle == "undefined")\par
    \{\par
    var head = document.getElementsByTagName("head")[0];\par
    var style = document.createElement("style");\par
    style.type = "text/css";\par
    style.appendChild(document.createTextNode(css));\par
    head.appendChild(style);\par
    \}\par
  else\par
    \{\par
    GM_addStyle(css);\par
    \}\par
\par
  // Add button method\par
  mainDiv.addButton = function(title,img,fct,node)\par
    \{\par
    var a = document.createElement('a');\par
    a.setAttribute('title',title);\par
    a.setAttribute('href','#');\par
    a.addEventListener('click',fct,false);\par
\par
    var div = document.createElement('div');\par
    div.setAttribute('style','float:left; background:url('+img+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');\par
\par
    a.appendChild(div);\par
\par
    if(node)\par
      this.insertBefore(a,node);\par
    else\par
      this.insertBefore(a,document.getElementById('bb_sizes'));\par
    return this;\par
    \}\par
\par
  // Infotext\par
  var a = document.createElement('a');\par
  a.setAttribute('href','http://www.plapl.com');\par
  a.setAttribute('title','Script Homepage: Updates, News, ... ');\par
  a.setAttribute('style','font-weight:bold; font-size:9pt; color:#0082BE; font-family:Broadway,Verdana,Arial; ');\par
  a.appendChild(document.createTextNode(' \\n \lang1025\f1\rtlch\'ca\'da\'cf\'ed\'e1 \lang1036\f0\ltrch elcharro :)\\n  (ver'+ver+')'));\par
  mainDiv.appendChild(a);\par
\par
  // Remove original report button\par
  if(forum || memo || ally || mail)\par
    \{\par
    mainDiv.removeChild(mainDiv.getElementsByTagName('a')[9]);\par
    \}\par
\par
  // Smilies' Box\par
  if(forum || memo)\par
    \{\par
    var table = document.createElement('table');\par
    table.setAttribute('id','bb_smilies');\par
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:100; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 24px; left: 200px; ');\par
\par
    var tr = document.createElement('tr');\par
\par
    var td = document.createElement('td');\par
    td.setAttribute('style','padding:2px;');\par
\par
    for(var i = 0; i < smilies.length; i++)\par
      \{\par
      var img = new Image();\par
      img.setAttribute('src',smilies[i]);\par
      img.setAttribute('style','vertical-align:middle; ');\par
      img.setAttribute('alt','[img]'+smilies[i]+'[/img]');\par
\par
      var a = document.createElement('a');\par
      a.setAttribute('href','#');\par
      a.setAttribute('style','vertical-align:middle; ');\par
      a.addEventListener('click',function() \{\par
        insert(this.title,'');\par
        toggle('bb_smilies');\par
        return false;\par
      \},false);\par
      a.setAttribute('title','[img]'+smilies[i]+'[/img]');\par
      a.appendChild(img);\par
\par
      td.appendChild(a);\par
      \}\par
\par
    tr.appendChild(td);\par
    table.appendChild(tr);\par
    mainDiv.appendChild(table);\par
    \}\par
\par
  // Icons' Box\par
  if(forum || memo)\par
    \{\par
    var table = document.createElement('table');\par
    table.setAttribute('id','bb_icons');\par
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 24px; left: 200px; ');\par
\par
    for(var i = 0; i < ds_icons.length; i++)\par
      \{\par
      var tr = document.createElement('tr');\par
\par
      var td = document.createElement('td');\par
      td.style.fontSize = '7pt';\par
      td.style.cursor = 'pointer';\par
      td.appendChild(document.createTextNode(ds_icons[i][0]+':'));\par
      td.addEventListener('click',toggleLine,false);\par
      tr.appendChild(td);\par
\par
\par
      var td = document.createElement('td');\par
      td.setAttribute('style','padding:2px;');\par
\par
      for(var x = 1; x < ds_icons[i].length; x++)\par
        \{\par
        var img = new Image();\par
        img.setAttribute('src',ds_icons[i][x]);\par
        img.setAttribute('style','padding:1px; border:solid 1px black; -moz-border-radius:5px 0px;');\par
        img.setAttribute('alt','[img]'+ds_icons[i][x]+'[/img]');\par
\par
        var a = document.createElement('a');\par
        a.setAttribute('href','#');\par
        a.setAttribute('style','padding:2px; margin-right:1px;  margin-bottom:2px; ');\par
        a.style.fontSize = '';\par
        a.addEventListener('click',function() \{\par
          insert(this.title,'');\par
          toggle('bb_icons');\par
          return false;\par
        \},false);\par
        a.setAttribute('title','[img]'+ds_icons[i][x]+'[/img]');\par
        a.appendChild(img);\par
\par
        td.appendChild(a);\par
        \}\par
      tr.appendChild(td);\par
      table.appendChild(tr);\par
      \}\par
\par
    mainDiv.appendChild(table);\par
    \}\par
\par
  // ##### Buttons #####\par
\par
  // Code      [code]  [/code]\par
  if(forum || memo || mail || ally)\par
    \{\par
    mainDiv.addButton('Code',icon_code,function() \{\par
      insert('[code]','[/code]');\par
      return false;\par
      \}\par
    ,mainDiv.getElementsByTagName('a')[4]);\par
    \}\par
\par
  // Icons\par
  if(forum || memo)\par
    \{\par
    mainDiv.addButton('Icons',icon_icons,function() \{\par
      toggle('bb_icons');\par
      return false;\par
      \});\par
    \}\par
\par
\par
  // Smilies\par
  if(forum || memo)\par
    \{\par
    mainDiv.addButton('Smilies',icon_smilies,function() \{\par
      toggle('bb_smilies');\par
      return false;\par
      \});\par
    \}\par
\par
  // Report Direct     [report]  [/report]\par
  if(forum || memo || ally || mail)\par
    \{\par
    mainDiv.addButton('\lang1025\f1\rtlch\'d1\'c8\'d8 \'ca\'de\'d1\'ed\'d1\lang1036\f0\ltrch ',icon_report_link,function() \{\par
      var url = prompt('\lang1025\f1\rtlch\'c3\'cf\'ce\'e1 \'da\'e4\'e6\'c7\'e4 \'e1\'e5\'d0\'c7 \'c7\'e1\'ca\'de\'d1\'ed\'d1\lang1036\f0\ltrch  :','');\par
      if(url != '')\par
        \{\par
        if(url.indexOf('=') != -1)\par
          \{\par
          url = url.split('=').pop();\par
          insert('[report]'+url+'[/report]','');\par
          \}\par
        else\par
          \{\par
          url = url.split('/').pop();\par
          insert('[report]'+url+'[/report]','');\par
          \}\par
        \}\par
      else\par
        insert('[report]','[/report]');\par
      return false;\par
      \});\par
    \}\par
\par
  // Report link      [report_display]  [/report_display]\par
  if(forum || memo || ally || mail)\par
    \{\par
    mainDiv.addButton(' \lang1025\f1\rtlch\'ca\'d9\'e5\'d1 \'c7\'e1\'ca\'de\'c7\'d1\'ed\'d1 \'e3\'c8\'c7\'d4\'d1\'c9(\'da\'e1\'ec \'d4\'df\'e1 \'d5\'e6\'d1\'e5\lang1036\f0\ltrch (',icon_report_direct,function() \{\par
      var url = prompt('\lang1025\f1\rtlch\'c3\'cf\'ce\'e1 \'da\'e4\'e6\'c7\'e4 \'e1\'e5\'d0\'c7 \'c7\'e1\'ca\'de\'d1\'ed\'d1\lang1036\f0\ltrch  :','');\par
      if(url != '')\par
        \{\par
        if(url.indexOf('=') != -1)\par
          \{\par
          url = url.split('=').pop();\par
          insert('[report_display]'+url+'[/report_display]','');\par
          \}\par
        else\par
          \{\par
          url = url.split('/').pop();\par
          insert('[report_display]'+url+'[/report_display]','');\par
          \}\par
        \}\par
      else\par
        insert('[report_display]','[/report_display]');\par
      return false;\par
      \});\par
    \}\par
\par
\par
  // Convert Coords to BB-Codes\par
  if(forum || memo || mail || ally)\par
    \{\par
    mainDiv.addButton('\lang1025\f1\rtlch\'ca\'cd\'e6\'ed\'e1 \'c7\'e1\'c5\'cd\'cf\'c7\'cb\'ed\'c7\'ca\lang1036\f0\ltrch  BB-Codes "\lang1025\f1\rtlch\'de\'e3 \'c8\'ed \'ca\'d8\'e1\'ed\'e1 \'df\'e1 \'c7\'e1\'e4\'d5 \'c7\'e1\'e3\'e6\'cc\'e6\'cf \'d5\'e3\'c7 \'c7\'d6\'da\'d8 \'e5\'c7  \'e5\'e6\'e4 \'e6 \'e5\'e6\'e5 \'d1\'ed\'cd \'ed\'de\'e6\'e3 \'c8\'ed \'ca\'cd\'e6\'ed\'e1 \'c7\'e1\'cd\'cf\'cb\'ed\'c7\'ca \'c7\'e1\'ec \'d1\'e6\'c7\'c8\'d8\lang1036\f0\ltrch "',icon_convertCoords,function() \{\par
      document.getElementById('message').value = document.getElementById('message').value.replace(/(\\(\\d\{1,3\}\\|\\d\{1,3\}\\))(?!\\[\\/village\\])/g,'[village]$1[/village]');\par
      document.getElementById('message').value = document.getElementById('message').value.replace(/(\\d\{1,3\}\\|\\d\{1,3\})(?!.*\\[\\/village\\])/g,'[village]($1)[/village]');\par
      return false;\par
      \});\par
    \}\par
\par
  // User Texts\par
  if(gm && (forum || memo || mail || ally))\par
    \{\par
    mainDiv.addButton('\lang1025\f1\rtlch\'c7\'cf\'e5 \'e3\'dd\'ed\'cf\'e5 \'cc\'cf\'c7 \'e1\'ed \'e3\'e4 \'ed\'de\'e6\'e3 \'c8\'ed \'c7\'d3\'ca\'ce\'cf\'e3 \'c8\'da\'d6 \'c7\'e1\'e4\'d5\'e6\'d5 \'c8\'ed \'df\'ca\'d1\'e5 \'dd\'de\'d8 \'de\'e3 \'c8\'ed \'df\'ca\'c7\'c8\'ca\'e5\'c7 \'e3\'d1\'e5 \'e6\'c7\'cd\'cf\'e5 \'dd\'de\'d8 \'e6 \'de\'e3 \'c8\'ed \'cd\'dd\'d6\'e5\'c7 \'e5\'c7  \'e5\'e6\'e4  \'e3\'cb\'e1 \'c7\'e1\'e3\'de\'cf\'e3\'c7\'ca \'c7\'e1\'d8\'e6\'ed\'e1\'e5 \'e6 \'c7\'e1\'d1\'cf\'e6\'cf \'c7\'e1\'e3\'da\'ca\'c7\'cf\'e5 \'c7\'ca\'d1\'df \'e1\'df \'c7\'e1\'ca\'cc\'d1\'c8\'e5\lang1036\f0\ltrch  ',icon_usertexts,function() \{\par
      // User Texts' Box\par
      show_userTextsBox(mainDiv);\par
      toggle('user_texts');\par
      return false;\par
      \});\par
    \}\par
\par
  \}\par
\par
\par
  // User Texts' Box\par
  function show_userTextsBox(mainDiv)\par
    \{\par
    if(document.getElementById('user_texts'))\par
      return;\par
\par
    var div = document.createElement('div');\par
    div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 24px; left: 200px; ');\par
    div.setAttribute('id','user_texts');\par
\par
    var table = document.createElement('table');\par
\par
    var tr = document.createElement('tr');\par
    var th = document.createElement('th');\par
    th.appendChild(document.createTextNode('\lang1025\f1\rtlch\'c7\'e1\'e3\'e6\'c7\'cf \'c7\'e1\'d4\'ce\'d5\'ed\'c9\lang1036\f0\ltrch '));\par
    tr.appendChild(th);\par
    table.appendChild(tr);\par
\par
    var texts = getTexts();\par
    for(var i = 0,len = texts.length; i < len; i++)\par
      \{\par
      var tr = document.createElement('tr');\par
      var td = document.createElement('td');\par
      td.appendChild(document.createTextNode(texts[i].name));\par
      td.addEventListener('click',function(i) \{ return function() \{\par
        insert(texts[i].value,'');\par
        toggle('user_texts');\par
       \} \}(i),false);\par
      td.setAttribute('class','tdbutton');\par
      tr.appendChild(td);\par
      table.appendChild(tr);\par
      \}\par
\par
    if(len == 0)\par
      \{\par
      var tr = document.createElement('tr');\par
      var td = document.createElement('td');\par
      td.setAttribute('style','color:Silver; font-family:Courier,sans-serif; ');\par
      td.appendChild(document.createTextNode('\lang1025\f1\rtlch\'cd\'ca\'ec \'c7\'e1\'c2\'e4 \'e1\'c7 \'ed\'e6\'cc\'cf \'c5\'cf\'ce\'c7\'e1\'c7\'ca\lang1036\f0\ltrch '));\par
      tr.appendChild(td);\par
      table.appendChild(tr);\par
      \}\par
\par
\par
    var tr = document.createElement('tr');\par
    var td = document.createElement('td');\par
    td.appendChild(document.createTextNode('\lang1025\f1\rtlch\'ca\'cd\'d1\'ed\'d1\lang1036\f0\ltrch '));\par
    td.setAttribute('class','tdbutton');\par
    td.setAttribute('style','border-top:solid black 2px; ');\par
    td.addEventListener('click',function() \{\par
      // User Texts Edit Box\par
      show_userTextsEditBox(mainDiv);\par
\par
      toggle('user_texts');\par
      toggle('user_texts_edit');\par
      return false;\par
    \},false);\par
    tr.appendChild(td);\par
    table.appendChild(tr);\par
\par
    div.appendChild(table);\par
\par
    mainDiv.appendChild(div);\par
    \}\par
\par
  // User Texts Edit Box\par
  function show_userTextsEditBox(mainDiv)\par
    \{\par
    if(document.getElementById('user_texts_edit'))\par
      return;\par
\par
    var div = document.createElement('div');\par
    div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 24px; left: 200px; ');\par
    div.setAttribute('id','user_texts_edit');\par
\par
    var table = document.createElement('table');\par
\par
    var tr = document.createElement('tr');\par
    var th = document.createElement('th');\par
    th.setAttribute('colspan','4');\par
    th.appendChild(document.createTextNode('\lang1025\f1\rtlch\'c7\'e1\'d4\'ce\'d5\'ed\'c9 \'ca\'cd\'d1\'ed\'d1 \'c7\'e1\'e4\'d5\'e6\'d5\lang1036\f0\ltrch '));\par
    tr.appendChild(th);\par
    table.appendChild(tr);\par
\par
    var texts = getTexts();\par
    for(var i = 0,len = texts.length; i < len; i++)\par
      \{\par
      var tr = document.createElement('tr');\par
\par
      var td = document.createElement('td');\par
      td.appendChild(document.createTextNode(texts[i].name));\par
\par
      tr.appendChild(td);\par
\par
      var td = document.createElement('td');\par
      td.setAttribute('style','font-size:x-small; font-family:monospace;');\par
       var text = texts[i].value.substring(0,250);\par
        if(text != texts[i].value)\par
        text += '...';\par
         text = text.split('\\n'); \par
      /*\par
      for each(var value in text)\par
        \{\par
        td.appendChild(document.createTextNode(value));\par
        td.appendChild(document.createElement('br'));\par
        \}\par
      */\par
\par
      for(var attr in text)\par
\{\par
if(typeof(text[attr]) != 'function')\par
\{\par
        \}\par
        td.appendChild(document.createTextNode(text[attr]));\par
        td.appendChild(document.createElement('br'));\par
        \}\par
\par
      tr.appendChild(td);\par
\par
      var td = document.createElement('td');\par
      td.setAttribute('class','tdbutton');\par
      td.setAttribute('title','Bearbeiten');\par
      td.appendChild(document.createTextNode('\lang1025\f1\rtlch\'ca\'da\'cf\'ed\'e1\lang1036\f0\ltrch '));\par
      td.addEventListener('click',function(i) \{ return function() \{\par
        var re = workWithEntry(texts,i);\par
        mainDiv.appendChild( re );\par
       \} \}(i),false);\par
      tr.appendChild(td);\par
\par
\par
      var td = document.createElement('td');\par
      td.setAttribute('class','tdbutton');\par
      td.setAttribute('title','L\'f6schen');\par
      td.appendChild(document.createTextNode('\lang1025\f1\rtlch\'cd\'d0\'dd\lang1036\f0\ltrch '));\par
      td.addEventListener('click',function(i) \{ return function() \{\par
       var c = confirm('\lang1025\f1\rtlch\'e5\'e1 \'ca\'d1\'ed\'cf  \'ca\'c7\'df\'ed\'cf \'c7\'e1\'cd\'d0\'dd \'c7\'e3 \'e1\'c7\lang1036\f0\ltrch ');\par
       if(c)\par
         \{\par
         texts.remove(i);\par
         setTexts(texts);\par
         if(document.getElementById('user_texts'))\par
           \{\par
           document.getElementById('user_texts').parentNode.removeChild(document.getElementById('user_texts'));\par
           \}\par
         if(document.getElementById('user_texts_edit'))\par
           \{\par
           document.getElementById('user_texts_edit').parentNode.removeChild(document.getElementById('user_texts_edit'));\par
           \}\par
         show_userTextsBox(mainDiv);\par
         show_userTextsEditBox(mainDiv);\par
         toggle('user_texts_edit');\par
         \}\par
\par
       \} \}(i),false);\par
\par
      tr.appendChild(td);\par
      table.appendChild(tr);\par
      \}\par
\par
    var tr = document.createElement('tr');\par
\par
    var td = document.createElement('td');\par
    td.setAttribute('class','tdbutton');\par
    td.appendChild(document.createTextNode('\lang1025\f1\rtlch\'cc\'cf\'ed\'cf\lang1036\f0\ltrch '));\par
    td.addEventListener('click',function() \{\par
      var re = workWithEntry(texts);\par
      mainDiv.appendChild( re );\par
      return false;\par
    \},false);\par
    tr.appendChild(td);\par
\par
    var td = document.createElement('td');\par
    td.setAttribute('colspan','3');\par
    td.setAttribute('class','tdbutton');\par
    td.appendChild(document.createTextNode('\lang1025\f1\rtlch\'c5\'db\'e1\'c7\'de\lang1036\f0\ltrch '));\par
    td.addEventListener('click',function() \{\par
      toggle('user_texts_edit');\par
      return false;\par
    \},false);\par
    tr.appendChild(td);\par
\par
    table.appendChild(tr);\par
\par
    div.appendChild(table);\par
\par
    mainDiv.appendChild(div);\par
    \}\par
\par
  // User Texts Edit Box - Work with Entry\par
  function workWithEntry(texts,n)\par
    \{\par
    var texts = texts;\par
    if(typeof(n) != 'undefined')\par
      \{\par
      var header = 'Pers\'f6nlichen Text bearbeiten';\par
      var name = texts[n].name;\par
      var text = texts[n].value;\par
      \}\par
    else\par
      \{\par
      var header = '\lang1025\f1\rtlch\'e4\'d5 \'cc\'cf\'ed\'cf\lang1036\f0\ltrch ';\par
      var name = '';\par
      var text = '';\par
      \}\par
\par
\par
    var table = document.createElement('table');\par
    table.setAttribute('id','user_texts_edit_entry');\par
    table.setAttribute('style','clear:both; position:absolute; z-index:121; border: 2px solid #804000; background:#efe6c9; top: 0px; left: -300px; ');\par
\par
    var tr = document.createElement('tr');\par
    var th = document.createElement('th');\par
    th.setAttribute('colspan','2');\par
\par
    th.appendChild(document.createTextNode(header));\par
\par
    tr.appendChild(th);\par
    table.appendChild(tr);\par
\par
    var tr = document.createElement('tr');\par
\par
    var td = document.createElement('td');\par
    td.appendChild(document.createTextNode('\lang1025\f1\rtlch\'c7\'e1\'da\'e4\'e6\'c7\'e4\lang1036\f0\ltrch  '));\par
    tr.appendChild(td);\par
\par
    var td = document.createElement('td');\par
    var input = document.createElement('input');\par
    input.setAttribute('type','text');\par
    input.setAttribute('value',name);\par
    input.setAttribute('size',64);\par
    input.setAttribute('id','UserText_Name');\par
    td.appendChild(input);\par
    tr.appendChild(td);\par
\par
    table.appendChild(tr);\par
\par
\par
    var tr = document.createElement('tr');\par
\par
    var td = document.createElement('td');\par
    td.appendChild(document.createTextNode('\lang1025\f1\rtlch\'e4\'d5\lang1036\f0\ltrch :'));\par
    tr.appendChild(td);\par
\par
    var td = document.createElement('td');\par
    var textarea = document.createElement('textarea');\par
    textarea.setAttribute('cols','40');\par
    textarea.setAttribute('rows','12');\par
    textarea.setAttribute('id','UserText_Text');\par
    textarea.appendChild(document.createTextNode(text));\par
    td.appendChild(textarea);\par
    tr.appendChild(td);\par
\par
    table.appendChild(tr);\par
\par
\par
    var tr = document.createElement('tr');\par
\par
    var td = document.createElement('td');\par
    td.setAttribute('class','tdbutton');\par
    td.appendChild(document.createTextNode('\lang1025\f1\rtlch\'cd\'dd\'d6\lang1036\f0\ltrch '));\par
    td.addEventListener('click',function() \{\par
      var data = \{\par
        'name' : document.getElementById('UserText_Name').value,\par
        'value' : document.getElementById('UserText_Text').value \};\par
\par
      if(typeof(n) != 'undefined')\par
        \{\par
        texts[n] = data;\par
        \}\par
      else\par
        \{\par
        texts.push(data);\par
        \}\par
\par
      setTexts(texts);\par
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);\par
\par
\par
      if(document.getElementById('user_texts'))\par
        \{\par
        document.getElementById('user_texts').parentNode.removeChild(document.getElementById('user_texts'));\par
        \}\par
      if(document.getElementById('user_texts_edit'))\par
        \{\par
        document.getElementById('user_texts_edit').parentNode.removeChild(document.getElementById('user_texts_edit'));\par
        \}\par
      show_userTextsBox(mainDiv);\par
\par
      return false;\par
    \},false);\par
    tr.appendChild(td);\par
\par
    var td = document.createElement('td');\par
    td.setAttribute('class','tdbutton');\par
    td.appendChild(document.createTextNode('\lang1025\f1\rtlch\'e1\'db\'c7\'c1\lang1036\f0\ltrch '));\par
    td.addEventListener('click',function() \{\par
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);\par
      return false;\par
    \},false);\par
    tr.appendChild(td);\par
\par
    table.appendChild(tr);\par
\par
    return table;\par
    \}\par
\par
\par
function getTexts()\par
  \{\par
  var gm = GM_getValue('usertexts');\par
\par
  if(typeof(gm) == 'undefined' || gm == '' || !gm)\par
    return new Array();\par
\par
  try\par
    \{\par
    var ar = JSON.parse( gm );\par
    \}\par
  catch(e)\par
    \{\par
    return new Array();\par
    \}\par
  return ar;\par
  \}\par
\par
function setTexts(ar)\par
  \{\par
  var str = JSON.stringify(ar);\par
  GM_setValue('usertexts',str);\par
  \}\par
\par
\par
function toggleLine(e)\par
  \{\par
  var elist = this.nextSibling.getElementsByTagName('a');\par
  var n = elist[0].style.display=='inline'?'none':'inline';\par
  for(var i = 0; i < elist.length; i++)\par
    \{\par
    elist[i].style.display = n;\par
    \}\par
  \}\par
\par
function toggle(id)\par
  \{\par
  var e = document.getElementById(id);\par
  if(e.style.display == 'block')\par
    e.style.display = 'none';\par
  else\par
    e.style.display = 'block';\par
  \}\par
\par
\par
// Stolen Code:\par
// http://aktuell.de.selfhtml.org/artikel/javascript/bbcode/\par
function insert(aTag, eTag)\par
  \{\par
  var input = document.getElementById('message');\par
  input.focus();\par
  if(typeof input.selectionStart != undefined)\par
    \{\par
    var start = input.selectionStart;\par
    var end = input.selectionEnd;\par
    var insText = input.value.substring(start, end);\par
    input.value = input.value.substr(0,start) + aTag + insText + eTag + input.value.substr(end);\par
    var pos;\par
    if(insText.length == 0)\par
      pos = start + aTag.length;\par
    else\par
      pos = start + aTag.length + insText.length + eTag.length;\par
    input.selectionStart = pos;\par
    input.selectionEnd = pos;\par
    \}\par
  \}\par
\par
Because it's your web\par
\par
Powered by monkeys and unicorns with the help of many friends\par
\par
Policy & Guidelines: DMCA Privacy Policy\par
}
