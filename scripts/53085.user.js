{\rtf1\fbidis\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}{\f1\fswiss\fcharset178 Arial;}}
{\*\generator Msftedit 5.41.15.1507;}\viewkind4\uc1\pard\ltrpar\f0\fs20 // ==UserScript==\par
// @name           DS_Sounds\par
// @namespace      none\par
// @description    Version 1.60.22 english, deutsch, francais, nederlands, arabic. sound for TribalWars, Sound f\'fcr Die-Staemme, son pour TribalWars, \lang1025\f1\rtlch\'c7\'d5\'cf\'d1 \'c7\'e1\'d5\'e6\'ca \'da\'e4\'cf \'de\'cf\'e6\'e3 \'e5\'cc\'e6\'e3 \'c7\'e6 \'d1\'d3\'c7\'e1\'e5\lang1033\f0\ltrch\\.\par
// @author         Peety (thx Heinzel)\par
// @include        http://*.*staemme.*/*game.php*\par
// @include        http://*.triburile.*/*game.php*\par
// ==/UserScript==\par
\par
\par
\par
(function()\{\par
var lang = GM_getValue("ds_lang", "en");\par
\tab // Textbausteine, neue \'dcbersetzung unten eintragen\par
if (lang  == "en") \{\par
\tab var Text1 = " TW_Sounds options "; \tab\tab\tab\tab\tab\tab // Sound Options \par
\tab var Text2 = " general sound on/off ";\par
\tab var Text3 = " minutes repeat time ";\par
\tab var Text4 = " volume: ";\par
\tab var Text5 = " - attack mainaccounts sound url: ";\par
\tab var Text6 = " - attack HR accounts sound url: ";\par
\tab var Text7 = " loop attack sound?";\par
\tab var Text8 = " - attack end sound url: ";\par
\tab var Text9 = " - message sound url: ";\par
\tab var Text10 = " - report sound url: ";\par
\tab var Text11 = " - forum sound url: ";\par
\tab var Text12 = " forum url: ";\par
\}\par
else if (lang == "de") \{\par
\tab var Text1 = " DS_Sounds Optionen "; \tab\tab\tab\tab\tab // Sound Options (title)\par
\tab var Text2 = " Sound an/aus ";\tab\tab\tab\tab\tab\tab // sound on/off\par
\tab var Text3 = " Minuten Pause vor Soundwiederholung "; \tab // repeat time\par
\tab var Text4 = " Lautst\'e4rke: ";\tab\tab\tab\tab\tab\tab // volume:\par
\tab var Text5 = " - Angriff Hauptaccounts Sound URL: ";\tab\tab // - attack mainaccounts sound url:\par
\tab var Text6 = " - Angriff UV-Accounts Sound URL: ";\tab\tab // - attack HR accounts sound url:\par
\tab var Text7 = " Angriffssounds dauernd wiederholen? (nur in Kaserne/Rekrutieren)";\tab // loop attack sound?\par
\tab var Text8 = " - Angriff beendet Sound URL: ";\tab\tab\tab // - attack end sound url:\par
\tab var Text9 = " - IGM Sound URL: ";\tab\tab\tab\tab\tab // - message sound url:\par
\tab var Text10 = " - Bericht Sound URL: ";\tab\tab\tab\tab // - report sound url:\par
\tab var Text11 = " - Forum Sound URL: ";\tab\tab\tab\tab\tab // - forum sound url:\par
\tab var Text12 = " Forum URL: ";\tab\tab\tab\tab\tab\tab // forum url:\par
\}\par
else if (lang == "fr") \{\tab  \tab\tab\tab\tab\tab\tab\tab // pardon, je ne parle pas francais\par
\tab var Text1 = " TW_Sons options "; \tab\tab\tab\tab\tab // Sound Options (title)\par
\tab var Text2 = " son marche/arr\'eat ";\tab\tab\tab\tab\tab // sound on/off\par
\tab var Text3 = " minutes pause avant r\'e9p\'e9tition "; \tab\tab // repeat time\par
\tab var Text4 = " volume: ";\tab\tab\tab\tab\tab\tab\tab // volume:\par
\tab var Text5 = " - attaque (utilisateur) son url: ";\tab\tab // - attack mainaccounts sound url:\par
\tab var Text6 = " - attaque (compte sitt\'e9) son url: ";\tab\tab // - attack HR accounts sound url:\par
\tab var Text7 = " attaque son rab\'e2chage? ";\tab\tab\tab\tab // loop attack sound?\par
\tab var Text8 = " - attaque fini son url: ";\tab\tab\tab\tab // - attack end sound url:\par
\tab var Text9 = " - mail son url: ";\tab\tab\tab\tab\tab // - message sound url:\par
\tab var Text10 = " - rapport son url: ";\tab\tab\tab\tab\tab // - report sound url:\par
\tab var Text11 = " - forum son url: ";\tab\tab\tab\tab\tab // - forum sound url:\par
\tab var Text12 = " forum url: ";\tab\tab\tab\tab\tab\tab // forum url:\par
\}\tab\par
else if (lang == "nl") \{\tab\tab\tab\tab\tab\tab\tab\tab // dutch\par
\tab var Text1 = " TW_Sounds Instellingen"; \tab\tab\tab\tab // Sound Options (title)\par
\tab var Text2 = " Toon aan/uit";\tab\tab\tab\tab\tab\tab // sound on/off\par
\tab var Text3 = " Pauze tot aanstaande toon";\tab\tab\tab // repeat time\par
\tab var Text4 = " Volume: ";\tab\tab\tab\tab\tab\tab\tab // volume:\par
\tab var Text5 = " - Aanvallen tegen jouw account (toon URL): ";\tab\tab // - attack mainaccounts sound url:\par
\tab var Text6 = " - Aanvallen tegen vakantie accounts (toon URL): ";\tab // - attack HR accounts sound url:\par
\tab var Text7 = " Aanvallen toon altijd weer herhalen: ";  \tab // loop attack sound?\par
\tab var Text8 = " - Aanvallen ge\'ebindigdn (toon URL): ";\tab\tab // - attack end sound url:\par
\tab var Text9 = " - Nieuw mededelingen (toon URL): ";\tab\tab\tab // - message sound url:\par
\tab var Text10 = " - Nieuw bericht toon (toon URL): ";\tab\tab // - report sound url:\par
\tab var Text11 = " - Nieuw antwoort in de forum (toon URL): ";\tab // - forum sound url:\par
\tab var Text12 = " Forum URL: ";\tab\tab\tab\tab\tab\tab // forum url:\par
\}\par
else if (lang == "ar") \{\tab\tab\tab\tab\tab\tab\tab\tab // arabic\par
\tab var Text1 = " TW_Sounds \lang1025\f1\rtlch\'c7\'e1\'ce\'ed\'c7\'d1\'c7\'ca\lang1033\f0\ltrch  "; \tab\tab\tab\tab // Sound Options (title)\par
\tab var Text2 = " \lang1025\f1\rtlch\'ca\'d4\'db\'ed\'e1 \'c7\'e1\'d5\'e6\'ca  \'ca\'d4\'db\'ed\'e1 \\\'ca\'da\'d8\'ed\'e1\lang1033\f0\ltrch   ";\tab\tab\tab // sound on/off\par
\tab var Text3 = " \lang1025\f1\rtlch\'e3\'cf\'c9 \'c7\'e1\'ca\'cd\'cf\'ed\'cb \'dd\'ed\'d3 \'c7\'e1\'cf\'de\'c7\'ed\'de\lang1033\f0\ltrch  ";\tab\tab\tab // repeat time\par
\tab var Text4 = " \lang1025\f1\rtlch\'cf\'d1\'cc\'c9 \'c7\'e1\'d5\'e6\'ca\lang1033\f0\ltrch : ";\tab\tab\tab\tab\tab\tab // volume:\par
\tab var Text5 = " - \lang1025\f1\rtlch\'d1\'c8\'d8 \'c7\'e1\'e3\'de\'d8\'da \'c7\'e1\'d5\'e6\'ca\'ed \'da\'e4\'cf \'cd\'cf\'e6\'cb \'e5\'cc\'e6\'e3\lang1033\f0\ltrch : ";\tab\tab // - attack mainaccounts sound url:\par
\tab var Text6 = " - \lang1025\f1\rtlch\'d1\'c8\'d8 \'c7\'e1\'e3\'de\'d8\'da \'c7\'e1\'d5\'e6\'ca\'ed \'da\'e4\'cf \'cd\'cf\'e6\'cb \'e5\'cc\'e6\'e3\lang1033\f0\ltrch : ";\tab\tab // - attack HR accounts sound url:\par
\tab var Text7 = " \lang1025\f1\rtlch\'c7\'da\'cf \'ca\'d4\'db\'c8\'e1 \'c7\'e1\'d5\'e6\'ca \'da\'e4\'cf \'cd\'cf\'e6\'cb \'e5\'cc\'e6\'e3 \'da\'e1\'ec \'d4\'df\'e1 \'cf\'e6\'d1\'e5\lang1033\f0\ltrch ?"; // loop attack sound?\par
\tab var Text8 = " - \lang1025\f1\rtlch\'c7\'d5\'cf\'d1 \'d5\'e6\'ca \'da\'e4\'cf \'c7\'e4\'ca\'e5\'c7\'c1 \'c7\'e1\'e5\'cc\'e6\'e3\lang1033\f0\ltrch : ";\tab\tab\tab // - attack end sound url:\par
\tab var Text9 = " - \lang1025\f1\rtlch\'c7\'d5\'cf\'d1 \'d5\'e6\'ca \'da\'e4\'cf \'de\'e6\'e3 \'d1\'d3\'c7\'e1\'e5\lang1033\f0\ltrch : ";\tab\tab\tab // - message sound url:\par
\tab var Text10 = " - \lang1025\f1\rtlch\'d1\'c8\'d8 \'e3\'de\'da \'c7\'e1\'d5\'e6\'ca  \'e1 \'d1\'d3\'c7\'e1\'e5\lang1033\f0\ltrch : ";\tab\tab\tab // - report sound url:\par
\tab var Text11 = " -  \lang1025\f1\rtlch\'d5\'e6\'ca \'e1\'ed \'c7\'e1\'e3\'e4\'ca\'cf\'ec\lang1033\f0\ltrch  : ";\tab\tab\tab\tab // - forum sound url:\par
\tab var Text12 = " \lang1025\f1\rtlch\'d1\'c8\'d8 \'c7\'e1\'e3\'e4\'ca\'cf\'ec\lang1033\f0\ltrch : ";\tab\tab\tab\tab\tab // forum url:\par
\}\par
\par
\par
// +++ insert your new translation here +++ Hier eine neue \'dcbersetzung einf\'fcgen +++\par
\par
else if (lang == "new") \{ // <-- do not change this , "new" hier nicht \'e4ndern\par
/*    for other languages translate only Text1 to Text12 and send it to win4@gmx.net please\par
\tab  f\'fcr eine weitere Sprache hier nur Text1 bis Text12 ersetzen und das Script bitte an win4@gmx.net senden\par
\tab  und bei translation = ""; den Namen der Sprache eintragen --> var translation = "Sprache";\par
*/\par
\tab var Text1 = " DS_Sounds Options "; \tab\tab\tab // Sound Options (title)\par
\tab var Text2 = " sound on/off ";\tab\tab\tab\tab\tab // sound on/off\par
\tab var Text3 = " repeat time "; \tab\tab\tab\tab\tab // repeat time\par
\tab var Text4 = " volume: ";\tab\tab\tab\tab\tab\tab // volume:\par
\tab var Text5 = " - attack mainaccounts sound url: ";\tab // - attack mainaccounts sound url:\par
\tab var Text6 = " - attack HR accounts sound url: ";\tab // - attack HR accounts sound url:\par
\tab var Text7 = " loop attack sound? ";\tab\tab\tab // loop attack sound?\par
\tab var Text8 = " - attack end sound url: ";\tab\tab // - attack end sound url:\par
\tab var Text9 = " - message sound url: ";\tab\tab\tab // - message sound url:\par
\tab var Text10 = " - report sound url: ";\tab\tab\tab // - report sound url:\par
\tab var Text11 = " - forum sound url: ";\tab\tab\tab // - forum sound url:\par
\tab var Text12 = " forum url: ";\tab\tab\tab\tab\tab // forum url:\par
\}\par
//\tab name of translation: +++ Name der neuen Sprache: \par
\tab var translation = "";\par
\tab\par
\tab\par
\tab\par
\tab\par
\tab\par
// ------------------------------------------------------------------------\tab\par
// +++ Bitte ab hier nichts aendern +++ No changes beyond this point +++\par
//-------------------------------------------------------------------------\par
\par
\par
var welt = document.location.host.split('.')[0];\tab\tab\tab\tab // Welt ermitteln\par
var uv = (location.href.match(/[&,?]t=(\\d+)/)) ? RegExp.$1 : "";\tab // testen ob UV\par
var cn = "ds_sound_"+welt+"_"+uv+"0"; \tab\tab\tab\tab\tab\tab // Cookienamen\par
var cwert;\tab\tab\tab\tab\tab\tab\tab\tab\par
var awert;\tab\tab\tab\tab\tab\tab\tab\tab\par
var interval;\par
\par
var sound_on = GM_getValue("sound_on", true);\par
var zeit = GM_getValue("zeit", 10);\par
var sound1 = GM_test("sound1", "0");\par
var sound1_on = GM_getValue("sound1_on", true);\par
var sound1_vol = GM_getValue("sound1_vol", 100);\par
var sound2 = GM_test("sound2", "0");\par
var sound2_on = GM_getValue("sound2_on", true);\par
var sound2_vol = GM_getValue("sound2_vol", 100);\par
var loop = false;\par
var sound3 = GM_test("sound3", "0");\par
var sound3_on = GM_getValue("sound3_on", true);\par
var sound3_vol = GM_getValue("sound3_vol", 70);\par
var sound_nm = GM_test("sound_nm", "0");\par
var sound_nm_on = GM_getValue("sound_nm_on", true);\par
var sound_nm_vol = GM_getValue("sound_nm_vol", 50);\par
var sound_nr = GM_test("sound_nr", "0");\par
var sound_nr_on = GM_getValue("sound_nr_on", true);\par
var sound_nr_vol = GM_getValue("sound_nr_vol", 100);\par
var sound_nf = GM_test("sound_nf", "0");\par
var sound_nf_on = GM_getValue("sound_nf_on", true);\par
var sound_nf_vol = GM_getValue("sound_nf_vol", 30);\par
\par
var dsphpbb = false;\par
try \{\par
\tab var wert = document.body.innerHTML.match(/action=is_newer_post/)[0]; if (wert) dsphpbb = true;\par
\} catch(e) \{dsphpbb = false;\}\par
\tab\par
if (dsphpbb) \{ \par
\tab var forum = GM_getValue("dsphpbb_adr"+welt+uv, "0");\par
\tab var pic1f = forum  + "images/ds/ds_newpost.gif";\par
\}\par
\par
\tab\par
\tab //graphic bell\par
var picsndon = 'data:image/png;base64,' +\par
\tab 'iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +\par
\tab '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAq5JREFUOMuFlL2LXGUUxn/vx/2cndyZnUmc' +\par
\tab '3dm4JhiJH1gYAoIWil0QrEQMNitEFwuxUBIbBasE/wK1UFnEFDYJKSzEQrSQoIhIdCUfEiSbdXZ2' +\par
\tab 'yO7O3Hvfe9/3tRBCINnxdM95zvlxeIoD/1Pe+6m+nGZ++fGZv89+8uFn3rtdZ8S9mt9+fSG4+MN3' +\par
\tab 'Rw88sO9751x1YzA+cnzptT96c/16KuDkqXei9etX36eqXm+m6ezhhw9wc22DtbU1dJjc8N6f+uiL' +\par
\tab 'r1bu3NF3iu2N9QdjKd7VacL9+/ezuHCQXrdPEsasD4bzk3x8DFjZNYNbw8GVJI4ItKLbnUUrTZqm' +\par
\tab 'xHFCoCTpTLM7NcROd6+vrSWKIrx3zPf7hGGIUoqiLFFKzU0FFKbq3RwM2djcJJ9ss7fTIAr9f7oo' +\par
\tab 'yCc72ekP3tsdoJROhBAIIdESwmKILLfRWiGlROugf/2va4tTANEx4QWBVigvoHAoIVFCY5FIgaiq' +\par
\tab '4ol7AlY+/1Qg/KtCCJRUhKHGhZDEAWmSEIQRwoK39fLLLz5/N2D10q/PCuyjQoAQkryoMSolbXTQ' +\par
\tab 'QYAUgp0yBx0+18k6j92+GuCt5aXMVua8Vqoz02jQ2pPRmMlQUZPR2JBPcqSSREmKQsginzzz9JNH' +\par
\tab 'v/nxp1+GwnvPG0vHV733DxljyJpN2nsyOu1ZsnYLW1u2t7YYbd1iOBphjME5R2Gqjd5c/6Cu61rV' +\par
\tab '3i/WxqCFxAFOSoyzFHmBcxbjHQ6IkhiHJ01iiqLcuXrlcqmVxEr4szBlO4nifiCVaMQx8737WFiY' +\par
\tab 'RynF6uVrjMdj6qrCWrtpTPV7UZZPnT13wWipAoDHl0+8IkKlDyVRXCZx+lLazF6YlFXQzhplq9W6' +\par
\tab '9M9g8JsbjS4eOvzIz2++fdIASKnA2UpM+wnOVjhb7er/C3AAFHJlPpo3AAAAAElFTkSuQmCC';\par
\par
var picsndoff = 'data:image/png;base64,' +\par
\tab 'iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +\par
\tab '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAylJREFUOMt91F9oW1UcwPHvubm3TW7+3GRp' +\par
\tab 'XbO0ab1tsy5mdplkaNGBij7ofFNQUFAmspdpn2QIE5WB2x5U8EWGMMbAP+CDg734UFBEwSnE6VZX' +\par
\tab 'SW7TNG10XZomXdIkN/deH5Zgx5zn6ZzD7/c5v3N+cARARteTwA7ABn5MGYZNdziOgxCitySj62NA' +\par
\tab 'DGimDOOS1N0fB74Fvgde6gV/+tE7J898cGKP49i9ZD8wB3wHzAD0gAvA+e789C8HD0ZOHX9zJuD3' +\par
\tab 'Hb6xtvrqh++/m/yrtCIDpwG9i3wMILaVFgJ+B6JXQwHzp+SUMj4xQvnGBqVSiclG++8n57ODQA2Y' +\par
\tab 'ThlGYXsFpAyjsuZxH3OARKWmpDxeJu6Ns2/vNJORKA9ll3Z241/vJd8GAJyLj5aykUEEMPVzBtkB' +\par
\tab 'VVXZ+0cWf9tk3av+uu2qdwLhgUHlkh6j4XHjqWwwfHWBYHGVSG6RRp/CXCqppAyDuwLNtulbqmzw' +\par
\tab 'za5BAMyvL+L+/CtwYG4kQsU2tZPvvX13wOWSh4QQlAZCLI0NQ7sN1Rq54QjLIQ1ZVqKF/OLo/wD9' +\par
\tab 'MeEIFFn+tz2A2mpjISEJhGk29/8ncP7cWYFwnhJCEFuvEssXkQdCuDQ/kbUyyXIFYYFjdY688Nyh' +\par
\tab 'O4GF+d8eFVj3qZ0OD2cLIASho4fxvfgsADOFIlKtCnLf42EtnLwNmD3yira1WfvErcg8s17Fa5qU' +\par
\tab 'E1PkAgMsjo5Tj43Qb9k8sXIdzaO6zObWl2+89nIcQHIcB8e2T9Xr9cl7/swxtlZmy6uSe2Afyyur' +\par
\tab 'FFdLXEvvx3K5GCpX0I0lhBCJarX2w7HZo36p0+m4Gqb5vLy5ySP5Io4QXE6naLgkmltNWq0mtYCP' +\par
\tab 'XGI3AAfyy4x63OwIaVUjl21JLglLsp3ZxxaMdr9lYYxEuTkcZdfQTvYk4tw/nSQcDpONj7Ph8yJb' +\par
\tab 'FjOZK5tT0eihLy5cbMuSSyGj60GgDzAWJ/S3PG71QdWvHWi0TCWkeVvBYHD+us93ZV3z14M362cC' +\par
\tab '5Yo/ffazp6XjJ64J2zLF5cndacANFFKGkd/eZ9syb732rYMA0oCn96H8A/0ENrlijrmBAAAAAElF' +\par
\tab 'TkSuQmCC';\par
\par
\tab //graphic test sound\par
var stest = 'data:image/png;base64,' +\par
\tab 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +\par
\tab 'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAANuSURBVHjaXNO9bxtl' +\par
\tab 'AMfx3z3P2Wf77MTUzvklidOXNAMgRUqcCqQGMbEwgIqqspS5XVgQ4l9gQJUYKgESExKIDgy8DEBU' +\par
\tab 'oENTSOIEpbYDJE5qR+f4bN+de8nd47t77mEoE9/t+wd8pM8+/QQAEAYh/DB4aczYbd/3rzDG0pZp' +\par
\tab 'Gn/vNdca9cd3K3Pn28+/8CLCMIQQAmEYgHMOGQAkSYIA3g2D4KNCoRDLZDIYj8c46XZnCsXi0kxl' +\par
\tab '7p3Dg/33hRBPADgR53UhRAAAMqUUYcivy5R8vLq6CsYYnKcO8vkpLC4uolFvgHNeVBTli5gsY2Jy' +\par
\tab 'MgJQOzps3eKcb8myLGeDILizvLSM2nYNRq+HicksEgkFqVQK1eoKEkkFD357AMs0cWl+nnDOq6qq' +\par
\tab 'frO1ufEyYYy9deH8hZnd3V0YhoGZ2VmUyyWUyiWcy+Ww8cfvmL+8gIsXLyESApZlIa4oKBaLlVwu' +\par
\tab 'f5tQQl6HBHSOOygWS8hMZJBOp5HNPgdZlqHrXTx6uI6VKytQVRW9kxPk83mEnKM8XX6NJJPJBdse' +\par
\tab 'IRaLI5lKQokrSKkqkskUurqO6koVrueCUgpN0+A4DszhEJ12G5Zll2RCaYaxMSRCceYyREKCRGXE' +\par
\tab '4wp2ajV0dR17zSYWLi9A0zTsbNewubkBSihc1x2RwPd9QinGAcfY9xGPx5BOq8jlctA0DV9/9SX+' +\par
\tab '3N7CaGRDSSTAeQTbsjAa2TB6J2uy4zi6VijOJ2IUU+eySCoKLMtGRk3j+o0bgCThr2YDE5OT0HUd' +\par
\tab 'nIfwXBeMeX3P9e7IpmU9LE9Pv0IpgWU/xcAaQZvKw/fHcBwJb167BqN3Fel0GsedDjzXg9E7MSMh' +\par
\tab '3qaEdIjv+/e6uh6VymV0e32ISECJybBtG8PhEO0nbXiei8Ggj+PjYwz6xg5j7FVCyH1JkkA459sH' +\par
\tab 'rdY9SQhMl4oYe2cwLQu2baPfN2CaQ2haAb/+ch+Dfj80zeHNKIp2wyBAEAQgnuuCc/7eo/X1QyVG' +\par
\tab 'UKnMIgo5GGNIqSrm5ubww/ffoVFvoNM5+lAI8TgIApydnsJxHNDq8hKiKHI45z/v7/+z6p6dFVRV' +\par
\tab 'hUwp+oaBtZ9+RKNeR/vo8O7IHn1AKRV4JhCSJD3T+N83JIlcbR20bu01m2+EYVjxXM8/PXXqg77x' +\par
\tab 'OWPet5RS/L9/BwDYGsraJJa3swAAAABJRU5ErkJggg==';\par
\par
\par
check_angriff();\tab\tab\tab // Angriff?\par
check_other();\tab\tab\tab\tab // anderes Ereignis?\par
grafik();\tab\tab\tab\tab\tab // Soundsymbol anzeigen\par
\par
\par
// ---------------- Functions --------------------- //\par
\par
\tab // testet auf Angriffe und merkt sich, welche bekannt sind\par
function check_angriff()\{\par
\tab cwert = kuchenlesen(cn);\par
\tab try \{\tab // auf Angriffssymbol pruefen\par
\tab\tab awert = document.body.innerHTML.match(/graphic\\/unit\\/att\\.png[?*][0-9*]" alt=""> \\((\\d+)\\)/)[1];\par
\tab\} catch(e) \{awert = '';\}\par
\tab\par
\tab if (awert) \{\par
\tab\tab var jetzt = zeit_holen();\par
\tab\tab var barracks; var train;\par
\tab\tab try \{\tab // auf Kaserne pruefen\par
\tab\tab\tab barracks = document.location.href.match(/screen=barracks/)[0];\par
\tab\tab\} catch(e) \{barracks = '';\}\par
\tab\tab\par
\tab\tab try \{\tab // Rekrutierenansicht pruefen\par
\tab\tab\tab train = document.location.href.match(/screen=train/)[0];\par
\tab\tab\} catch(e) \{train = '';\}\par
\par
\tab\tab if (cwert != awert) \{\par
\tab\tab\tab var a1wert = awert; var c1wert = cwert;\par
\tab\tab\tab if (awert == '') a1wert="0"; \par
\tab\tab\tab if (cwert == '') c1wert="0";\par
\tab\tab\tab if (parseInt(a1wert, 10) > parseInt(c1wert, 10)) \{\par
\tab\tab\tab\tab attacksound();\par
\tab\tab\tab\tab GM_setValue("adelay"+welt+uv, jetzt);\par
\tab\tab\tab\tab GM_setValue("known_"+welt+uv, 0);\par
\tab\tab\tab\}\par
\tab\tab\tab else \{\par
\tab\tab\tab\tab if (sound3_on) \{ \par
\tab\tab\tab\tab\tab play_sound(sound3, sound3_vol);\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\tab kuchensetzen(cn,awert);\par
\tab\tab\}\par
\tab\tab else if (train || barracks) \{\par
\tab\tab\tab if (GM_getValue("known"+welt+uv, 0) == 0) \{\par
\tab\tab\tab\tab var adelay = GM_getValue("adelay"+welt+uv, 220255);\par
\tab\tab\tab\tab if ((jetzt - adelay) > (60 * zeit)) \{\par
\tab\tab\tab\tab\tab attacksound();\par
\tab\tab\tab\tab\tab GM_setValue("adelay"+welt+uv, jetzt);\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab else \{ \par
\tab\tab\tab GM_setValue("known"+welt+uv, 1);\par
\tab\tab\}\par
\tab\} \par
\tab else if (cwert) \{\par
\tab\tab kuchenloeschen(cn);\par
\tab\tab if (sound3_on) \{ \par
\tab\tab\tab play_sound(sound3, sound3_vol);\par
\tab\tab\}\par
\tab\tab GM_setValue("known"+welt+uv, 1);\par
\tab\}\par
\par
\}\par
\par
\par
\par
\tab // testet auf andere Ereignisse\par
function check_other() \{\par
\tab check_new("igm", sound_nm, sound_nm_vol);\tab\tab // IGM?\par
\tab check_new("report", sound_nr, sound_nr_vol);\tab\tab // Bericht?\par
\tab check_new("forum", sound_nf, sound_nf_vol);\tab\tab // Forum?\par
\}\par
\par
\par
\par
\tab // gibt's was neues ?\par
function check_new(name, soundfile, volume) \{\par
\tab if (soundfile == "") return;\par
\tab var wert;\par
\tab var zeit1 = GM_getValue("alarm_"+name, 220255);\par
\tab var delay = GM_getValue("delay", 220255);\par
\tab var jetzt = zeit_holen();\par
\par
\tab if ((jetzt - zeit1) > (60 * zeit)) \{\par
\tab\tab if ((name == "igm") && sound_nm_on) \{\par
\tab\tab\tab try \{ \par
\tab\tab\tab\tab wert = document.body.innerHTML.match(/screen=mail"><img src="\\/graphic\\/new_mail\\.png/)[0];\par
\tab\tab\tab\} catch(e) \{wert = '';\}\par
\tab\tab\tab\par
\tab\tab\tab if (wert == '') \{\par
\tab\tab\tab\tab try \{ \par
\tab\tab\tab\tab\tab wert = document.body.innerHTML.match(/screen=mail"><img src="graphic\\/new_mail\\.png/)[0];\par
\tab\tab\tab\tab\} catch(e) \{wert = '';\}\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab else if ((name == "report") && sound_nr_on) \{\par
\tab\tab\tab try \{ \par
\tab\tab\tab\tab wert = document.body.innerHTML.match(/graphic\\/new_report\\.png/)[0];\par
\tab\tab\tab\} catch(e) \{wert = '';\}\par
\tab\tab\}\par
\tab\tab else if ((name == "forum") && sound_nf_on && (dsphpbb == false)) \{\par
\tab\tab\tab try \{ \par
\tab\tab\tab\tab wert = document.body.innerHTML.match(/graphic\\/ally_forum\\.png/)[0];\par
\tab\tab\tab\} catch(e) \{wert = '';\}\par
\tab\tab\}\par
\tab\tab else if ((name == "forum") && sound_nf_on && (dsphpbb == true)) \{\par
\tab\tab\tab extforum(name, zeit, jetzt, soundfile, volume);\par
\tab\tab\tab wert = '';\par
\tab\tab\}\par
\tab\tab\par
\tab\tab if (wert) \{\par
\tab\tab\tab if ((jetzt - delay) < 3) \{\tab // falls innerhalb von 3 Sek schon ein Sound gespielt wurde\par
\tab\tab\tab\tab if (zeit > 2) \{\par
\tab\tab\tab\tab\tab interval = window.setTimeout("location.reload()", (delay + 3 - jetzt) * 1000);\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\tab else \{\par
\tab\tab\tab\tab if (zeit > 2) \{window.clearTimeout(interval);\}\par
\tab\tab\tab\tab GM_setValue("alarm_"+name, jetzt); \par
\tab\tab\tab\tab GM_setValue("delay", jetzt); \par
\tab\tab\tab\tab play_sound(soundfile, volume);\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
\par
\par
\tab // neuer Eintrag im DSphpBB-Forum?\par
function extforum(name, zeit, jetzt, soundfile, volume)\{\par
\tab var a = document.getElementsByTagName("a");\par
\tab for(var i = 0; i < a.length-1; i++) \{\par
\tab\tab if (a[i].href == forum) \{\par
\tab\tab\tab var img = a[i].firstChild;\par
\tab\tab\tab var pic2f = img.src;\par
\tab\tab\tab GM_xmlhttpRequest\par
\tab\tab\tab (\{\par
\tab\tab\tab\tab method:'GET',\par
\tab\tab\tab\tab url: pic2f,\par
\tab\tab\tab\tab onload: function(responseDetails) \{\par
\tab\tab\tab\tab\tab if(responseDetails.status == 200) \{\tab\tab\tab\tab\tab\par
\tab\tab\tab\tab\tab\tab var pic2 = responseDetails.responseText;\par
\tab\tab\tab\tab\tab\tab var len2 = pic2.length;\par
\par
\tab\tab\tab\tab\tab\tab GM_xmlhttpRequest\par
\tab\tab\tab\tab\tab\tab (\{\par
\tab\tab\tab\tab\tab\tab\tab method:'GET',\par
\tab\tab\tab\tab\tab\tab\tab url: pic1f,\par
\tab\tab\tab\tab\tab\tab\tab onload: function(responseDetails) \{\par
\tab\tab\tab\tab\tab\tab\tab\tab if(responseDetails.status == 200) \{\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab var pic1 = responseDetails.responseText;\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab var len1 = pic1.length;\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab if (len1 == len2) \{\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab if (zeit > 2) \{\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab window.clearTimeout(interval);\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab GM_setValue("alarm_"+name, jetzt); \par
\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab GM_setValue("delay", jetzt); \par
\tab\tab\tab\tab\tab\tab\tab\tab\tab\tab play_sound(soundfile, volume);\par
\tab\tab\tab\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab\tab\});\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\});\tab\tab\tab\tab\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
\par
\tab // holt Zeitstempel\par
function zeit_holen() \{\par
\tab var jetzt = new Date();\par
\tab return parseInt(jetzt.getTime() / 1000);\par
\}\par
\par
\par
\tab // zeigt Optionen\par
function optionen()\{\par
\tab var pos = document.getElementById("Glocke");\par
\tab var Optionen = document.createElement("table");\par
\tab Optionen.setAttribute("id","options");\par
\tab Optionen.setAttribute("class", "main");\par
\tab Optionen.setAttribute("style", "padding: 5px;");\par
\tab var tbody = document.createElement('tbody');\par
\tab var tr = document.createElement('tr');\par
\tab var td = document.createElement('td');\par
\tab\par
\tab var th = document.createElement('th');\par
\tab th.setAttribute("style", "text-align: center");\par
\tab th.appendChild(document.createTextNode(Text1)); \tab\tab // Title: Sound Options\par
\tab var table = document.createElement("table");\par
\tab table.setAttribute("class","vis");\par
\tab table.appendChild(th);\par
// Sound on\par
\tab var row0 = document.createElement("tr");\par
\tab var td0 = document.createElement("td");\par
\tab var check0 = document.createElement("input");\par
\tab check0.setAttribute("type","checkbox");\par
\tab check0.setAttribute("name","sound_on");\par
\tab check0.checked = sound_on;\par
\tab check0.addEventListener("change",function()\{GM_setValue("sound_on", this.checked); sound_on = GM_getValue("sound_on");\},false);\par
\tab td0.appendChild(check0);\par
\tab var img0 = document.createElement("img");\par
\tab img0.setAttribute("width", "17");\par
\tab img0.setAttribute("style", "vertical-align: bottom");\par
\tab img0.src = picsndon;\par
\tab td0.appendChild(img0);\par
\tab td0.appendChild(document.createTextNode(Text2));\tab\tab // Sound an/aus\par
\tab row0.appendChild(td0);\par
\tab table.appendChild(row0);\par
// repeat time\par
\tab var rowx = document.createElement("tr");\par
\tab var tdx = document.createElement("td");\par
\tab rowx.appendChild(tdx);\par
\tab table.appendChild(rowx);\par
\tab var row1 = document.createElement("tr");\par
\tab var td1 = document.createElement("td");\par
\tab var check1 = document.createElement("input");\par
\tab check1.setAttribute("type","text");\par
\tab check1.setAttribute("style", "text-align: center");\par
\tab check1.setAttribute("name", "zeitspanne");\par
 \tab check1.value = zeit;\par
\tab check1.setAttribute("size","2");\par
\tab check1.setAttribute("maxlength", "2");\par
\tab check1.setAttribute("method", "post");\par
\tab check1.setAttribute("enctype", "multipart/form-data");\par
\tab check1.addEventListener("change",function()\{if (this.value < 1) \{this.value = 10;\} GM_setValue("zeit", parseInt(this.value, 10)); zeit = GM_getValue("zeit");\},false);\par
\tab td1.appendChild(check1);\par
\tab td1.appendChild(document.createTextNode(Text3));\tab\tab // repeat time\par
\tab row1.appendChild(td1);\par
\tab table.appendChild(row1);\par
// inc main account\par
\tab var rowx = document.createElement("tr");\par
\tab var tdx = document.createElement("td");\par
\tab rowx.appendChild(tdx);\par
\tab table.appendChild(rowx);\par
\tab var rowx = document.createElement("tr");\par
\tab var tdx = document.createElement("td");\par
\tab rowx.appendChild(tdx);\par
\tab table.appendChild(rowx);\par
\tab var row5 = document.createElement("tr");\par
\tab var td5 = document.createElement("td");\par
\tab check5 = document.createElement("input");\par
\tab check5.setAttribute("type", "checkbox");\par
\tab check5.setAttribute("name", "sound1_on");\par
\tab check5.checked = sound1_on;\par
\tab check5.addEventListener("change",function()\{GM_setValue("sound1_on", this.checked); sound1_on = GM_getValue("sound1_on");\},false);\par
\tab td5.appendChild(check5);\par
\tab var img5 = document.createElement("img");\par
\tab img5.setAttribute("width", "17");\par
\tab img5.src = "./graphic/unit/att.png";\par
\tab td5.appendChild(img5);\par
\tab var check51 = document.createElement("input");\par
\tab check51.setAttribute("type","text");\par
\tab check51.setAttribute("style", "text-align: center");\par
\tab check51.setAttribute("name", "sound1_vol");\par
\tab check51.value = sound1_vol;\par
\tab check51.setAttribute("size", "2");\par
\tab check51.setAttribute("maxlength", "3");\par
\tab check51.setAttribute("method", "post");\par
\tab check51.setAttribute("enctype", "multipart/form-data");\par
\tab check51.addEventListener("change",function()\{ sound1_vol = check_vol("sound1_vol", this.value);\},false);\par
\tab td5.appendChild(document.createTextNode(Text4)); \tab\tab // volume\par
\tab td5.appendChild(check51);\par
\tab td5.appendChild(document.createTextNode("% "));\par
\tab var test5 = document.createElement("input");\par
\tab test5.setAttribute("type","image");\par
\tab test5.setAttribute("style", "vertical-align: middle");\par
\tab test5.setAttribute("src", stest);\par
\tab test5.setAttribute("title", "test");\par
\tab test5.addEventListener("click",function()\{play_sound(sound1, sound1_vol)\},true);\par
\tab td5.appendChild(test5);\par
\tab td5.appendChild(document.createTextNode(Text5));\tab\tab // attack main account sound url\par
\tab row5.appendChild(td5);\par
\tab table.appendChild(row5);\par
\tab var row50 = document.createElement("tr");\par
\tab var td50 = document.createElement("td");\par
\tab var check50 = document.createElement("input");\par
\tab check50.setAttribute("type","text");\par
\tab check50.setAttribute("style", "text-align: left");\par
\tab check50.setAttribute("name", "sound1");\par
\tab check50.value = sound1;\par
\tab check50.setAttribute("size","92");\par
\tab check50.setAttribute("maxlength", "200");\par
\tab check50.setAttribute("method", "post");\par
\tab check50.setAttribute("enctype", "multipart/form-data");\par
\tab check50.addEventListener("change",function()\{sound1 = GM_test("sound1", this.value);\},false);\par
\tab td50.appendChild(check50);\par
\tab row50.appendChild(td50);\par
\tab table.appendChild(row50);\par
// inc hr account\par
\tab var rowx = document.createElement("tr");\par
\tab var tdx = document.createElement("td");\par
\tab rowx.appendChild(tdx);\par
\tab table.appendChild(rowx);\par
\tab var row6 = document.createElement("tr");\par
\tab var td6 = document.createElement("td");\par
\tab check6 = document.createElement("input");\par
\tab check6.setAttribute("type", "checkbox");\par
\tab check6.setAttribute("name", "sound2_on");\par
\tab check6.checked = sound2_on;\par
\tab check6.addEventListener("change",function()\{GM_setValue("sound2_on", this.checked); sound2_on = GM_getValue("sound2_on");\},false);\par
\tab td6.appendChild(check6);\par
\tab var img6 = document.createElement("img");\par
\tab img6.setAttribute("width", "17");\par
\tab img6.src = "./graphic/unit/att.png";\par
\tab td6.appendChild(img6);\par
\tab var check61 = document.createElement("input");\par
\tab check61.setAttribute("type","text");\par
\tab check61.setAttribute("style", "text-align: center");\par
\tab check61.setAttribute("name", "sound2_vol");\par
\tab check61.value = sound2_vol;\par
\tab check61.setAttribute("size", "2");\par
\tab check61.setAttribute("maxlength", "3");\par
\tab check61.setAttribute("method", "post");\par
\tab check61.setAttribute("enctype", "multipart/form-data");\par
\tab check61.addEventListener("change",function()\{ sound2_vol = check_vol("sound2_vol", this.value);\},false);\par
\tab td6.appendChild(document.createTextNode(Text4)); \tab\tab // volume\par
\tab td6.appendChild(check61);\par
\tab td6.appendChild(document.createTextNode("% "));\par
\tab var test6 = document.createElement("input");\par
\tab test6.setAttribute("type","image");\par
\tab test6.setAttribute("style", "vertical-align: middle");\par
\tab test6.setAttribute("src", stest);\par
\tab test6.setAttribute("title", "test");\par
\tab test6.addEventListener("click",function()\{play_sound(sound2, sound2_vol)\},true);\par
\tab td6.appendChild(test6);\par
\tab td6.appendChild(document.createTextNode(Text6));  \tab\tab //attack HR-account sound url\par
\tab row6.appendChild(td6);\par
\tab table.appendChild(row6);\par
\tab row6.appendChild(td6);\par
\tab table.appendChild(row6);\par
\tab var row60 = document.createElement("tr");\par
\tab var td60 = document.createElement("td");\par
\tab var check60 = document.createElement("input");\par
\tab check60.setAttribute("type","text");\par
\tab check60.setAttribute("style", "text-align: left");\par
\tab check60.setAttribute("name", "sound2");\par
\tab check60.value = sound2;\par
\tab check60.setAttribute("size","92");\par
\tab check60.setAttribute("maxlength", "200");\par
\tab check60.setAttribute("method", "post");\par
\tab check60.setAttribute("enctype", "multipart/form-data");\par
\tab check60.addEventListener("change",function()\{sound2 = GM_test("sound2", this.value);\},false);\par
\tab td60.appendChild(check60);\par
\tab row60.appendChild(td60);\par
\tab table.appendChild(row60);\par
// loop incs sound\par
\tab var row8 = document.createElement("tr");\par
\tab var td8 = document.createElement("td");\par
\tab var check8 = document.createElement("input");\par
\tab check8.setAttribute("type","checkbox");\par
\tab check8.setAttribute("name","loop");\par
\tab check8.checked = GM_getValue("loop");\par
\tab check8.addEventListener("change",function()\{GM_setValue("loop", this.checked); loop = GM_getValue("loop");\},false);\par
\tab td8.appendChild(check8);\par
\tab var img8 = document.createElement("img");\par
\tab img8.src = "./graphic/unit/att.png";\par
\tab td8.appendChild(img8);\par
\tab td8.appendChild(document.createTextNode(Text7));\tab // loop attack sound?\par
\tab row8.appendChild(td8);\par
\tab table.appendChild(row8);\par
// inc arrived\par
\tab var rowx = document.createElement("tr");\par
\tab var tdx = document.createElement("td");\par
\tab rowx.appendChild(tdx);\par
\tab table.appendChild(rowx);\par
\tab var row7 = document.createElement("tr");\par
\tab var td7 = document.createElement("td");\par
\tab check7 = document.createElement("input");\par
\tab check7.setAttribute("type", "checkbox");\par
\tab check7.setAttribute("name", "sound3_on");\par
\tab check7.checked = sound3_on;\par
\tab check7.addEventListener("change",function()\{GM_setValue("sound3_on", this.checked); sound3_on = GM_getValue("sound3_on");\},false);\par
\tab td7.appendChild(check7);\par
\tab var img7 = document.createElement("img");\par
\tab img7.setAttribute("width", "17");\par
\tab img7.src = "./graphic/command/cancel.png";\par
\tab td7.appendChild(img7);\par
\tab var check71 = document.createElement("input");\par
\tab check71.setAttribute("type","text");\par
\tab check71.setAttribute("style", "text-align: center");\par
\tab check71.setAttribute("name", "sound3_vol");\par
\tab check71.value = sound3_vol;\par
\tab check71.setAttribute("size", "2");\par
\tab check71.setAttribute("maxlength", "3");\par
\tab check71.setAttribute("method", "post");\par
\tab check71.setAttribute("enctype", "multipart/form-data");\par
\tab check71.addEventListener("change",function()\{ sound3_vol = check_vol("sound3_vol", this.value);\},false);\par
\tab td7.appendChild(document.createTextNode(Text4)); \tab\tab // volume\par
\tab td7.appendChild(check71);\par
\tab td7.appendChild(document.createTextNode("% "));\par
\tab var test7 = document.createElement("input");\par
\tab test7.setAttribute("type","image");\par
\tab test7.setAttribute("style", "vertical-align: middle");\par
\tab test7.setAttribute("src", stest);\par
\tab test7.setAttribute("title", "test");\par
\tab test7.addEventListener("click",function()\{play_sound(sound3, sound3_vol)\},true);\par
\tab td7.appendChild(test7);\par
\tab td7.appendChild(document.createTextNode(Text8));\tab\tab // attack end sound url\par
\tab row7.appendChild(td7);\par
\tab table.appendChild(row7);\par
\tab var row70 = document.createElement("tr");\par
\tab var td70 = document.createElement("td");\par
\tab var check70 = document.createElement("input");\par
\tab check70.setAttribute("type","text");\par
\tab check70.setAttribute("style", "text-align: left");\par
\tab check70.setAttribute("name", "sound3");\par
\tab check70.value = sound3;\par
\tab check70.setAttribute("size","92");\par
\tab check70.setAttribute("maxlength", "200");\par
\tab check70.setAttribute("method", "post");\par
\tab check70.setAttribute("enctype", "multipart/form-data");\par
\tab check70.addEventListener("change",function()\{sound3 = GM_test("sound3", this.value);\},false);\par
\tab td70.appendChild(check70);\par
\tab row70.appendChild(td70);\par
\tab table.appendChild(row70);\par
// igm\par
\tab var rowx = document.createElement("tr");\par
\tab var tdx = document.createElement("td");\par
\tab rowx.appendChild(tdx);\par
\tab table.appendChild(rowx);\par
\tab var rowx = document.createElement("tr");\par
\tab var tdx = document.createElement("td");\par
\tab rowx.appendChild(tdx);\par
\tab table.appendChild(rowx);\par
\tab var row4 = document.createElement("tr");\par
\tab var td4 = document.createElement("td");\par
\tab check4 = document.createElement("input");\par
\tab check4.setAttribute("type", "checkbox");\par
\tab check4.setAttribute("name", "sound_nm_on");\par
\tab check4.checked = sound_nm_on;\par
\tab check4.addEventListener("change",function()\{GM_setValue("sound_nm_on", this.checked); sound_nm_on = GM_getValue("sound_nm_on");\},false);\par
\tab td4.appendChild(check4);\par
\tab var img4 = document.createElement("img");\par
\tab img4.setAttribute("width", "17");\par
\tab img4.src = "./graphic/new_mail.png";\par
\tab td4.appendChild(img4);\par
\tab var check41 = document.createElement("input");\par
\tab check41.setAttribute("type","text");\par
\tab check41.setAttribute("style", "text-align: center");\par
\tab check41.setAttribute("name", "sound_nm_vol");\par
\tab check41.value = sound_nm_vol;\par
\tab check41.setAttribute("size", "2");\par
\tab check41.setAttribute("maxlength", "3");\par
\tab check41.setAttribute("method", "post");\par
\tab check41.setAttribute("enctype", "multipart/form-data");\par
\tab check41.addEventListener("change",function()\{ sound_nm_vol = check_vol("sound_nm_vol", this.value);\},false);\par
\tab td4.appendChild(document.createTextNode(Text4)); \tab\tab //volume\par
\tab td4.appendChild(check41);\par
\tab td4.appendChild(document.createTextNode("% "));\par
\tab var test4 = document.createElement("input");\par
\tab test4.setAttribute("type","image");\par
\tab test4.setAttribute("style", "vertical-align: middle");\par
\tab test4.setAttribute("src", stest);\par
\tab test4.setAttribute("title", "test");\par
\tab test4.addEventListener("click",function()\{play_sound(sound_nm, sound_nm_vol)\},true);\par
\tab td4.appendChild(test4);\par
\tab td4.appendChild(document.createTextNode(Text9));\tab\tab // message sound url\par
\tab row4.appendChild(td4);\par
\tab table.appendChild(row4);\par
\tab var row40 = document.createElement("tr");\par
\tab var td40 = document.createElement("td");\par
\tab var check40 = document.createElement("input");\par
\tab check40.setAttribute("type","text");\par
\tab check40.setAttribute("style", "text-align: left");\par
\tab check40.setAttribute("name", "sound_nm");\par
\tab check40.value = sound_nm;\par
\tab check40.setAttribute("size","92");\par
\tab check40.setAttribute("maxlength", "200");\par
\tab check40.setAttribute("method", "post");\par
\tab check40.setAttribute("enctype", "multipart/form-data");\par
\tab check40.addEventListener("change",function()\{sound_nm = GM_test("sound_nm", this.value);\},false);\par
\tab td40.appendChild(check40);\par
\tab row40.appendChild(td40);\par
\tab table.appendChild(row40);\par
// report\par
\tab var rowx = document.createElement("tr");\par
\tab var tdx = document.createElement("td");\par
\tab rowx.appendChild(tdx);\par
\tab table.appendChild(rowx);\par
\tab var row3 = document.createElement("tr");\par
\tab var td3 = document.createElement("td");\par
\tab check3 = document.createElement("input");\par
\tab check3.setAttribute("type", "checkbox");\par
\tab check3.setAttribute("name", "sound_nr_on");\par
\tab check3.checked = sound_nr_on;\par
\tab check3.addEventListener("change",function()\{GM_setValue("sound_nr_on", this.checked); sound_nr_on = GM_getValue("sound_nr_on");\},false);\par
\tab td3.appendChild(check3);\par
\tab var img3 = document.createElement("img");\par
\tab img3.setAttribute("width", "17");\par
\tab img3.src = "./graphic/new_report.png";\par
\tab td3.appendChild(img3);\par
\tab var check31 = document.createElement("input");\par
\tab check31.setAttribute("type","text");\par
\tab check31.setAttribute("style", "text-align: center");\par
\tab check31.setAttribute("name", "sound_nr_vol");\par
\tab check31.value = sound_nr_vol;\par
\tab check31.setAttribute("size", "2");\par
\tab check31.setAttribute("maxlength", "3");\par
\tab check31.setAttribute("method", "post");\par
\tab check31.setAttribute("enctype", "multipart/form-data");\par
\tab check31.addEventListener("change",function()\{ sound_nr_vol = check_vol("sound_nr_vol", this.value);\},false);\par
\tab td3.appendChild(document.createTextNode(Text4)); \tab\tab // volume\par
\tab td3.appendChild(check31);\par
\tab td3.appendChild(document.createTextNode("% "));\par
\tab var test3 = document.createElement("input");\par
\tab test3.setAttribute("type","image");\par
\tab test3.setAttribute("style", "vertical-align: middle");\par
\tab test3.setAttribute("src", stest);\par
\tab test3.setAttribute("title", "test");\par
\tab test3.addEventListener("click",function()\{play_sound(sound_nr, sound_nr_vol)\},true);\par
\tab td3.appendChild(test3);\par
\tab td3.appendChild(document.createTextNode(Text10));\tab\tab // report sound url\par
\tab row3.appendChild(td3);\par
\tab table.appendChild(row3);\par
\tab var row30 = document.createElement("tr");\par
\tab var td30 = document.createElement("td");\par
\tab var check30 = document.createElement("input");\par
\tab check30.setAttribute("type","text");\par
\tab check30.setAttribute("style", "text-align: left");\par
\tab check30.setAttribute("name", "sound_nr");\par
\tab check30.value = sound_nr;\par
\tab check30.setAttribute("size","92");\par
\tab check30.setAttribute("maxlength", "200");\par
\tab check30.setAttribute("method", "post");\par
\tab check30.setAttribute("enctype", "multipart/form-data");\par
\tab check30.addEventListener("change",function()\{sound_nr = GM_test("sound_nr", this.value);\},false);\par
\tab td30.appendChild(check30);\par
\tab row30.appendChild(td30);\par
\tab table.appendChild(row30);\par
// forum\par
\tab var rowx = document.createElement("tr");\par
\tab var tdx = document.createElement("td");\par
\tab rowx.appendChild(tdx);\par
\tab table.appendChild(rowx);\par
\tab var row2 = document.createElement("tr");\par
\tab var td2 = document.createElement("td");\par
\tab var check2 = document.createElement("input");\par
\tab check2.setAttribute("type", "checkbox");\par
\tab check2.setAttribute("name", "sound_nf_on");\par
\tab check2.checked = sound_nf_on;\par
\tab check2.addEventListener("change",function()\{GM_setValue("sound_nf_on", this.checked); sound_nf_on = GM_getValue("sound_nf_on");\},false);\par
\tab td2.appendChild(check2);\par
\tab var img2 = document.createElement("img");\par
\tab img2.setAttribute("width", "16");\par
\tab img2.src = "./graphic/ally_forum.png";\par
\tab td2.appendChild(img2);\par
\tab var check21 = document.createElement("input");\par
\tab check21.setAttribute("type","text");\par
\tab check21.setAttribute("style", "text-align: center");\par
\tab check21.setAttribute("name", "sound_nf_vol");\par
\tab check21.value = sound_nf_vol;\par
\tab check21.setAttribute("size", "2");\par
\tab check21.setAttribute("maxlength", "3");\par
\tab check21.setAttribute("method", "post");\par
\tab check21.setAttribute("enctype", "multipart/form-data");\par
\tab check21.addEventListener("change",function()\{ sound_nf_vol = check_vol("sound_nf_vol", this.value);\},false);\par
\tab td2.appendChild(document.createTextNode(Text4)); \tab\tab // volume\par
\tab td2.appendChild(check21);\par
\tab td2.appendChild(document.createTextNode("% "));\par
\tab var test2 = document.createElement("input");\par
\tab test2.setAttribute("type","image");\par
\tab test2.setAttribute("style", "vertical-align: middle");\par
\tab test2.setAttribute("src", stest);\par
\tab test2.setAttribute("title", "test");\par
\tab test2.addEventListener("click",function()\{play_sound(sound_nf, sound_nf_vol)\},true);\par
\tab td2.appendChild(test2);\par
\tab td2.appendChild(document.createTextNode(Text11));\tab\tab // forum sound url\par
\tab row2.appendChild(td2);\par
\tab table.appendChild(row2);\par
\tab var row20 = document.createElement("tr");\par
\tab var td20 = document.createElement("td");\par
\tab var check20 = document.createElement("input");\par
\tab check20.setAttribute("type","text");\par
\tab check20.setAttribute("style", "text-align: left");\par
\tab check20.setAttribute("name", "sound_nf");\par
\tab check20.value = sound_nf;\par
\tab check20.setAttribute("size","92");\par
\tab check20.setAttribute("maxlength", "200");\par
\tab check20.setAttribute("method", "post");\par
\tab check20.setAttribute("enctype", "multipart/form-data");\par
\tab check20.addEventListener("change",function()\{sound_nf = GM_test("sound_nf", this.value);\},false);\par
\tab td20.appendChild(check20);\par
\tab row20.appendChild(td20);\par
\tab table.appendChild(row20);\par
//forum DSphpBB\par
\tab if (dsphpbb) \{\par
\tab\tab var row10 = document.createElement("tr");\par
\tab\tab var td10 = document.createElement("td");\par
\tab\tab var check10 = document.createElement("input");\par
\tab\tab check10.setAttribute("type","text");\par
\tab\tab check10.setAttribute("style", "text-align: left");\par
\tab\tab check10.setAttribute("name", "forum");\par
 \tab\tab check10.value = forum;\par
\tab\tab check10.setAttribute("size","65");\par
\tab\tab check10.setAttribute("maxlength", "200");\par
\tab\tab check10.setAttribute("method", "post");\par
\tab\tab check10.setAttribute("enctype", "multipart/form-data");\par
\tab\tab check10.addEventListener("change",function()\{forum = GM_test("dsphpbb_adr"+welt+uv, this.value);\},false);\par
\tab\tab td10.appendChild(document.createTextNode(Text12));\tab // forum url\par
\tab\tab td10.appendChild(check10);\par
\tab\tab var img10a = document.createElement("img");\par
\tab\tab img10a.setAttribute("width", "17");\par
\tab\tab img10a.src = forum + "images/ds/ds_nonewpost.gif";\par
\tab\tab var img10b = document.createElement("img");\par
\tab\tab img10b.setAttribute("width", "17");\par
\tab\tab img10b.src = forum + "images/ds/ds_newpost.gif";\par
\par
\tab\tab td10.appendChild(document.createTextNode(" "));\par
\tab\tab td10.appendChild(img10a);\par
\tab\tab td10.appendChild(document.createTextNode(" "));\par
\tab\tab td10.appendChild(img10b);\par
\tab\tab row10.appendChild(td10);\par
\tab\tab table.appendChild(row10);\par
\tab\}\par
\tab\par
// Sprache einstellen\par
\tab var rowx = document.createElement("tr");\par
\tab var tdx = document.createElement("td");\par
\tab rowx.appendChild(tdx);\par
\tab table.appendChild(rowx);\par
\tab var row12 = document.createElement("tr");\par
\tab var td12 = document.createElement("td");\par
\tab var check12 = document.createElement("input");\par
\tab check12.setAttribute("type", "radio");\par
\tab check12.setAttribute("name", "lang");\par
\tab check12.setAttribute("value", "en");\par
\tab check12.addEventListener("change",function()\{check_lang(this.value);\},false);\par
\tab if (lang == "en") check12.checked = true;\par
\tab td12.appendChild(check12);\par
\tab td12.appendChild(document.createTextNode("english "));\par
\tab\par
\tab var check13 = document.createElement("input");\par
\tab check13.setAttribute("type", "radio");\par
\tab check13.setAttribute("name", "lang");\par
\tab check13.setAttribute("value", "de");\par
\tab check13.addEventListener("change",function()\{check_lang(this.value);\},false);\par
\tab if (lang == "de") check13.checked = true;\par
\tab td12.appendChild(check13);\par
\tab td12.appendChild(document.createTextNode("deutsch "));\par
\tab\par
\tab var check14 = document.createElement("input");\par
\tab check14.setAttribute("type", "radio");\par
\tab check14.setAttribute("name", "lang");\par
\tab check14.setAttribute("value", "fr");\par
\tab check14.addEventListener("change",function()\{check_lang(this.value);\},false);\par
\tab td12.appendChild(check14);\par
\tab td12.appendChild(document.createTextNode("fran\'e7ais "));\par
\tab\par
\tab var check15 = document.createElement("input");\par
\tab check15.setAttribute("type", "radio");\par
\tab check15.setAttribute("name", "lang");\par
\tab check15.setAttribute("value", "nl");\par
\tab check15.addEventListener("change",function()\{check_lang(this.value);\},false);\par
\tab td12.appendChild(check15);\par
\tab td12.appendChild(document.createTextNode("nederlands "));\par
\tab\par
\tab var check16 = document.createElement("input");\par
\tab check16.setAttribute("type", "radio");\par
\tab check16.setAttribute("name", "lang");\par
\tab check16.setAttribute("value", "ar");\par
\tab check16.addEventListener("change",function()\{check_lang(this.value);\},false);\par
\tab td12.appendChild(check16);\par
\tab td12.appendChild(document.createTextNode("arabic "));\par
\tab\par
\tab if (translation != "") \{\par
\tab\tab var check17 = document.createElement("input");\par
\tab\tab check17.setAttribute("type", "radio");\par
\tab\tab check17.setAttribute("name", "lang");\par
\tab\tab check17.setAttribute("value", "new");\par
\tab\tab check17.addEventListener("change",function()\{check_lang(this.value);\},false);\par
\tab\tab td12.appendChild(check17);\par
\tab\tab td12.appendChild(document.createTextNode(translation));\par
\tab\}\par
\tab\par
\tab if (lang == "en") check12.checked = true;\par
\tab if (lang == "de") check13.checked = true;\par
\tab if (lang == "fr") check14.checked = true;\par
\tab if (lang == "nl") check15.checked = true;\par
\tab if (lang == "ar") check16.checked = true;\par
\tab if (lang == "new" && translation != "") check17.checked = true;\par
\tab row12.appendChild(td12);\par
\tab table.appendChild(row12);\par
\par
\tab\par
// submit\par
\tab var row9 = document.createElement("p");\par
\tab row9.setAttribute("align", "right");\par
\tab var check9 = document.createElement("input");\par
\tab check9.setAttribute("type","submit");\par
\tab check9.addEventListener("click",function() \{location.reload();\},false);\par
\tab row9.appendChild(check9);\par
\tab table.appendChild(row9);\par
\tab td.appendChild(table);\par
\tab tr.appendChild(td);\par
\tab tbody.appendChild(tr);\par
\tab Optionen.appendChild(tbody);\par
\tab pos.replaceChild(Optionen, pos.firstChild);\par
\}\par
\par
\tab // change language\par
function check_lang(wert)\{\par
\tab switch (wert) \par
\tab\{\par
\tab\tab case "en":\par
\tab\tab\tab lang = "en";\par
\tab\tab\tab break;\par
\tab\tab case "de":\par
\tab\tab\tab lang = "de";\par
\tab\tab\tab break;\par
\tab\tab case "fr":\par
\tab\tab\tab lang = "fr";\par
\tab\tab\tab break;\par
\tab\tab case "nl":\par
\tab\tab\tab lang = "nl";\par
\tab\tab\tab break;\par
\tab\tab case "ar":\par
\tab\tab\tab lang = "ar";\par
\tab\tab\tab break;\par
\tab\tab case "new":\par
\tab\tab\tab lang = "new";\par
\tab\tab\tab break;\par
\tab\tab\tab\par
\tab\tab default:\par
\tab\tab\tab return "en"; \par
\tab\tab\tab break;\par
\tab\}\par
\tab GM_setValue("ds_lang", lang); \par
\tab return lang;\par
\}\par
\par
\par
\par
function check_vol(name, wert)\{\par
\tab wert = parseInt(wert, 10);\par
\tab if (isNaN(wert)) \{ wert = 70;\}\par
\tab if (wert <= 0) \{ wert = 100;\}\par
\tab if (wert <= 10) \{ wert = 10;\}\par
\tab if (wert >= 100) \{ wert = 100;\}\par
\tab GM_setValue(name, wert); \par
\tab return wert;\par
\}\par
\par
\par
\par
function GM_test(name, url)\{\par
\tab var test;\par
\tab var GM = GM_getValue(name); \par
\tab if (url == "0") \{\par
\tab\tab if (GM != "") \{ \par
\tab\tab\tab GM = http(name, GM); \par
\tab\tab\tab if (GM) \{ return GM;\}\par
\tab\tab\}\par
\tab\tab url = "";\par
\tab\}\par
\tab else\tab\{\par
\tab\tab if (url != "") \{ \par
\tab\tab\tab test = http(name, url); \par
\tab\tab\tab if (test) \{\par
\tab\tab\tab\tab GM_setValue(name, test); \par
\tab\tab\tab\tab return test;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab url = "";\par
\tab\}\par
\par
\tab if (url == "")\tab\{\par
\tab\tab switch (name) \par
\tab\tab\{\par
\tab\tab\tab case "dsphpbb_adr"+welt+uv:\par
\tab\tab\tab\tab url = "";\par
\tab\tab\tab\tab break;\par
\tab\tab\tab case "sound_nf":\par
\tab\tab\tab\tab url = "http://www.wav-sounds.com/vehicle/train.wav";\par
\tab\tab\tab\tab break;\par
\tab\tab\tab case "sound_nr":\par
\tab\tab\tab\tab url = "http://www.pacdv.com/sounds/interface_sound_effects/sound107.wav";\par
\tab\tab\tab\tab break;\par
\tab\tab\tab case "sound_nm":\par
\tab\tab\tab\tab url = "http://www.wav-sounds.com/mail/mailbox.wav";\par
\tab\tab\tab\tab break;\par
\tab\tab\tab case "sound1":\par
\tab\tab\tab\tab url = "http://www.policeinterceptor.com/sounds/newgq.wav";\par
\tab\tab\tab\tab break;\par
\tab\tab\tab case "sound2":\par
\tab\tab\tab\tab url = "http://www.acoustica.com/sounds/user_requests/policesiren2.wav";\par
\tab\tab\tab\tab break;\par
\tab\tab\tab case "sound3":\par
\tab\tab\tab\tab url = "http://www.mediacollege.com/downloads/sound-effects/star-trek/tos/tos-intercom.wav";\par
\tab\tab\tab\tab break;\par
\tab\tab\tab default:\par
\tab\tab\tab\tab return ""; \par
\tab\tab\tab\tab break;\par
\tab\tab\}\par
\tab\tab GM_setValue(name, url);\par
\tab\tab return url;\par
\tab\}\par
\tab else \{ \par
\tab\tab test = http(name, url); \par
\tab\tab if (test) \{\par
\tab\tab\tab GM_setValue(name, test);\par
\tab\tab\tab return test;\par
\tab\tab\}\par
\tab\}\par
\}\par
\par
\par
\par
function http(name, url)\{\par
\tab var test\par
\tab try \{\par
\tab\tab test = url.match(/http\\:\\/\\//)[0];\par
\tab\} catch(e) \{test = '';\}\par
\par
\tab if (test) \{\par
\tab\tab if (name == "dsphpbb_adr"+welt+uv) \{url = test_slash(url);\} \par
\tab\tab return url;\par
\tab\}\par
\tab else \{\par
\tab\tab if (url && url.length > 14) \{\par
\tab\tab\tab if (name == "dsphpbb_adr"+welt+uv) \{\par
\tab\tab\tab\tab url = test_slash(url);\par
\tab\tab\tab\} \par
\tab\tab\tab url = "http://"+url;\par
\tab\tab\tab return url;\par
\tab\tab\}\par
\tab\}\par
\tab return false;\par
\}\par
\par
\par
\par
function test_slash(url)\{\par
\tab if  (url) \{\par
\tab\tab if (url.substr(1,url.length) != "/")\{url = url + "/"; \}\par
\tab\}\par
\tab return url;\par
\}\par
\par
\par
\par
\tab // bindet Grafik Glocke ein\par
function grafik() \{\par
\tab var test = document.getElementsByClassName("navi-border"); \tab // DS-Version >= 5.x?\par
\par
\tab var glocke = document.createElement('td');\par
\tab glocke.setAttribute("id", "Glocke");\par
\tab glocke.setAttribute("align", "center");\par
\tab var table = document.createElement('table');\par
\tab table.setAttribute("class", "box");\par
\tab table.setAttribute("cellspacing", "0");\par
\tab var tbody = document.createElement('tbody');\par
\tab var tr = document.createElement('tr');\par
\tab var td = document.createElement('td');\par
\tab td.setAttribute("width", "16");\par
\tab td.setAttribute("height","20");\par
\tab var a = document.createElement('a');\par
\tab a.setAttribute("id", "Alarm");\par
\tab a.setAttribute("href", "javascript: ");\par
\tab a.addEventListener("click", function()\{if (test[0]) \{rtable.setAttribute("class", "content-border");\} optionen();\}, false);\par
\par
\tab var img = document.createElement('img');\par
\tab img.setAttribute("title", "sound options");\par
\tab if (sound_on) \{\par
\tab\tab img.setAttribute("alt", "on");\par
\tab\tab img.src = picsndon;\par
\tab\}\par
\tab else \{\par
\tab\tab img.setAttribute("alt", "off");\par
\tab\tab img.src = picsndoff;\par
\tab\}\tab\par
\tab a.appendChild(img);\par
\tab td.appendChild(a);\par
\tab tr.appendChild(td);\par
\tab tbody.appendChild(tr);\par
\tab table.appendChild(tbody);\par
\tab glocke.appendChild(table);\par
\par
\tab if (test[0]) \{\tab\tab // is DS-Version >= 5.x?\par
\tab\tab var glocke1 = document.createElement('td');\par
\tab\tab glocke1.setAttribute("align", "center");\par
\tab\tab var rtable = document.createElement('table');\par
\tab\tab rtable.setAttribute("style", "border-collapse: collapse;");\par
\tab\tab rtable.setAttribute("class", "navi-border");\par
\tab\tab var rtbody = document.createElement('tbody');\par
\tab\tab var rtr = document.createElement('tr');\par
\tab\tab rtr.appendChild(glocke);\par
\tab\tab rtbody.appendChild(rtr);\par
\tab\tab rtable.appendChild(rtbody);\par
\tab\tab glocke1.appendChild(rtable);\par
\tab\tab var line = document.getElementsByTagName("hr"); \par
\tab\tab var pos1 = line[0].nextSibling.nextSibling.firstChild.nextSibling.firstChild;\par
\tab\tab var pos2 = pos1.firstChild.nextSibling.nextSibling.nextSibling;\par
\tab\tab pos1.insertBefore(glocke1, pos2);\par
\tab\}\par
\tab else \{\par
\tab\tab var pos = document.getElementsByClassName("box");\par
\tab\tab var pos1 = pos[0].parentNode.parentNode;\tab\par
\tab\tab var pos2 = pos1.firstChild;\par
\tab\tab pos1.insertBefore(glocke, pos2);\par
\tab\}\par
\}\par
\par
\par
\par
function attacksound() \{\par
\tab loop = GM_getValue("loop", false);\par
\tab if (uv) \{\par
\tab\tab if (sound2_on) \{ play_sound(sound2, sound2_vol);\}\par
\tab\} \par
\tab else \{\par
\tab\tab if (sound1_on) \{ play_sound(sound1, sound1_vol);\}\par
\tab\} \par
\tab loop = false;\par
\}\par
\par
\par
\par
\tab // spielt Sound \par
function play_sound(soundfile, volume) \{\par
\tab if (soundfile == "") return;\par
\tab volume = parseInt(volume, 10);\par
\tab if (sound_on) \{\par
\tab\tab var arr = soundfile.split('.');\par
\tab\tab var typ = arr[arr.length-1];\par
\tab\tab var buffer = document.createElement('embed');\par
\tab\tab buffer.setAttribute("title", "Sound");\par
\tab\tab buffer.setAttribute("src", soundfile);\par
\tab\tab buffer.setAttribute("autostart", "true");\par
\tab\tab buffer.setAttribute("autoplay", "true");\par
\tab\tab buffer.setAttribute("cache", "true");\par
\tab\tab buffer.setAttribute("hidden", "true");\par
\tab\tab buffer.setAttribute("width", "0");\par
\tab\tab buffer.setAttribute("height", "0");\par
\tab\tab buffer.setAttribute("loop", loop);\par
\tab\tab buffer.setAttribute("volume", volume);\par
\tab\tab if (typ == 'wav') buffer.setAttribute("type", 'audio/x-wav');\par
\tab\tab else if (typ == 'midi') buffer.setAttribute("type", 'audio/mid');\par
\tab\tab else if (typ == 'mp3') buffer.setAttribute("type", 'audio/mpeg');\par
\tab\tab else if (typ == 'wma') buffer.setAttribute("type", 'audio/x-ms-wma');\par
\tab\tab document.body.appendChild(buffer);\par
\tab\}\par
\}\par
\par
\par
\tab // sucht Classnames\par
function getElementsByClassName(classname) \{\par
\tab var arr = [];\par
\tab var reg = new RegExp('\\\\b' + classname + '\\\\b');\par
\tab var knoten = document.getElementsByTagName("body")[0];\par
\tab var elemente = knoten.getElementsByTagName("*");\par
\tab var l = elemente.length;\par
\tab for(var i=0; i<l; i++) \{\par
\tab\tab if (reg.test(elemente[i].className)) arr.push(elemente[i]);\par
\tab\}\par
\tab return arr;\par
\}\par
\par
\par
\par
\tab // setzt Cookie\par
function kuchensetzen(n,w) \{\par
\tab var cDat = new Date();\par
\tab cDat = new Date(cDat.getTime() +1000*60*60*24*5);  // 5 Tage g\'fcltig reicht\par
\tab document.cookie = n+'='+w+'; expires='+cDat.toGMTString()+';';\par
\}\par
\par
\par
\par
\tab // liest Cookie\par
function kuchenlesen(n) \{\par
\tab var a = document.cookie;\par
\tab var cookiewert\par
\tab var i\par
\tab res = '';\par
\tab while(a != '')\tab\{\par
 \tab\tab while(a.substr(0,1) == ' ')\{a = a.substr(1,a.length);\}\par
 \tab\tab cookiename = a.substring(0,a.indexOf('='));\par
\tab\tab if(a.indexOf(';') != -1)\par
\tab\tab\{cookiewert = a.substring(a.indexOf('=')+1,a.indexOf(';'));\}\par
\tab\tab else\{cookiewert = a.substr(a.indexOf('=')+1,a.length);\}\par
\tab\tab if(n == cookiename)\{res = cookiewert;\}\par
\tab\tab i = a.indexOf(';')+1;\par
\tab\tab if(i == 0)\{i = a.length\}\par
\tab\tab a = a.substring(i,a.length);\par
\tab\}\par
\tab return(res)\par
\}\par
\par
\par
\par
\tab // l\'f6scht Cookie\par
function kuchenloeschen(n) \{\par
\tab document.cookie = n+'=; expires=Thu, 01-Jan-70 22:02:55 GMT;';\par
\} \par
\par
\par
\}) ()\par
}
