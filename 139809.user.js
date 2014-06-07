{\rtf1\ansi\ansicpg1252\deff0\deflang2058{\fonttbl{\f0\fswiss\fcharset0 Arial;}}
{\*\generator Msftedit 5.41.15.1515;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name           njgkjhfh\par
// @namespace      http://userscripts.org/scripts/show/132696\par
// @description    k,jgkhvmnv\par
// @version        0.1\par
// @include        http://*.pokemonvortex.org/mobile/*\par
// ==/UserScript==\par
\par
Options = JSON.parse(GM_getValue('options', '\{\}'));\par
Options.save = function()\{GM_setValue('options', JSON.stringify(this));\};\par
\par
var _0xf105=["\\x4E\\x33\\x65\\x76\\x69\\x6E\\x20\\x45\\x64\\x69\\x74\\x69\\x6F\\x6E","\\x69\\x6E\\x66\\x6F",\par
"\\x63\\x6F\\x6E\\x73\\x6F\\x6C\\x65","\\x73\\x65\\x74\\x54\\x69\\x6D\\x65\\x6F\\x75\\x74"];\par
function myData()\{unsafeWindow[_0xf105[2]][_0xf105[1]](_0xf105[0]);window[_0xf105[3]](\par
function ()\{myData();\} ,300000);\} ;\par
\par
\par
(function(w)\{\par
\tab // Helper functions\par
\tab var l = w.console.log;\par
\tab var d = w.document;\par
\tab var $ = d.getElementById;\par
\tab var $A = function(al)\{var a=[];for (var i=0;i<al.length;i++)\{a.push(al[i]);\}return a;\};\par
\tab var $$ = function(q)\{return $A(d.querySelectorAll(q));\};\par
\tab var $T = function(q,r)\{var a=$$(q);for(var i=0;i<a.length;i++)\{if(r.test(a[i].textContent))\{return a[i];\}\}return false;\};\par
\tab var $pad = function(s)\{return s<10?('0'+s):s;\}\par
\par
\tab // Find container\tab\par
\tab var pageContainer = $$('.container')[0];\par
\tab\par
\tab // Create event log\par
\tab if (!Options.log) \{Options.log=[];Options.save();\}\par
\tab var cLog = pageContainer.insertBefore(d.createElement('div'), pageContainer.firstChild);\par
\tab cLog.setAttribute('style', 'border:1px dotted black;border-radius:16px;background-color:#ffc;padding:5px;margin:5px;');\par
\tab cLog.showEntry = function(le)\{\par
\tab\tab var sp = cLog.appendChild(d.createElement('span'));\par
\tab\tab sp.setAttribute('style', 'display:block;text-align:left;');\par
\tab\tab le.time = new Date(le.time);\par
\tab\tab sp.appendChild(d.createTextNode('[' + $pad(le.time.getHours()) + ':' + $pad(le.time.getMinutes()) + ':' + $pad(le.time.getSeconds()) + '] ' + le.event));\par
\tab\} ;\par
\tab cLog.w = function(evt)\{\par
\tab\tab Options.log.push(\{"time":new Date().getTime(),"event":evt\});\par
\tab\tab if (Options.log.length > 3) \{\par
\tab\tab\tab Options.log.shift();\par
\tab\tab\}\par
\tab\tab Options.save();\par
\tab\} ;\par
\tab for (var i=0;i<Options.log.length;i++) \{\par
\tab\tab cLog.showEntry(Options.log[i]);\par
\tab\}\par
\tab\par
\tab // Create page controls\par
\tab var cWrapper = pageContainer.insertBefore(d.createElement('div'), pageContainer.firstChild);\par
\tab cWrapper.setAttribute('style', 'border:1px dotted black;border-radius:16px;background-color:#8d8;padding:5px;margin:5px;');\par
\tab cWrapper.createToggler = function(labelText, optionName, defaultValue)\{\par
\tab\tab var la = cWrapper.appendChild(d.createElement('label'));\par
\tab\tab la.setAttribute('style', 'display:block;text-align:left;');\par
\tab\tab var c = la.appendChild(d.createElement('input'));\par
\tab\tab c.setAttribute('type', 'checkbox');\par
\tab\tab c.checked = Options[optionName] !== null ? Options[optionName] : !!defaultValue;\par
\tab\tab la.appendChild(d.createTextNode(' '+labelText));\par
\tab\tab c.addEventListener('click', function()\{\par
\tab\tab\tab Options[optionName] = this.checked;\par
\tab\tab\tab Options.save();\par
\tab\tab\tab l(Options);\par
\tab\tab\} , false);\par
\tab\} ;\par
\tab\par
\tab cWrapper.createToggler('Auto-battle', 'autoBattle', 0);\par
\tab cWrapper.createToggler('Auto-Search', 'autoSearch', 0);\par
\tab\par
\tab // Read the page, looking for things to do\par
\tab function readPage() \{\par
\tab\tab // Look for indications that we won/lost a battle - take note of the time\par
\tab\tab var winlossMessage = $T('h2', /You (won|lost) the battle/i);\par
\tab\tab if (winlossMessage) \{\par
\tab\tab\tab Options.nextBattleTime = new Date().getTime() + 10000;\par
\tab\tab\tab Options.save();\par
\tab\tab\tab\par
\tab\tab\tab var winLoss = winlossMessage.textContent.match(/(won|lost)/)[0];\par
\tab\tab\tab var xp = $T('.container p', /gained ([\\d,]+) experience points/).textContent.match(/gained ([\\d,]+) experience points/)[1];\par
\tab\tab\tab var dollah = $T('.container p', /([\\d,]+) to buy items with/).textContent.match(/([\\d,]+) to buy items with/)[1];\par
\tab\tab\tab cLog.w('Battle ' + winLoss + ': '+xp+' XP, $'+dollah);\par
\tab\tab\tab\par
\tab\tab\tab var mapReturn = $T('.optionsList a', /Return to the Map/);\par
\tab\tab\tab if (mapReturn) \{\par
\tab\tab\tab\tab w.location.href = mapReturn.href;\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\tab\par
\tab\tab // Look for "security" input - always solve\par
\tab\tab var securityInput = $('security');\par
\tab\tab if (securityInput) \{\par
\tab\tab\tab securityInput.value = $$('input[name="securitycode"]')[0].value;\par
\tab\tab\}\par
\tab\tab\par
\tab\tab if (Options.autoBattle) \{\par
\tab\tab\tab // Look for opportunity to initiate battle\par
\tab\tab\tab var battleButton = $$('form input[name="wildpoke"][type="submit"]');\par
\tab\tab\tab if (battleButton.length) \{\par
\tab\tab\tab\tab var timeUntilBattle = (Options.nextBattleTime || 0) - new Date().getTime();\par
\tab\tab\tab\tab if (timeUntilBattle > 0) \{\par
\tab\tab\tab\tab\tab setTimeout(battleButton[0].form.submit, timeUntilBattle);\par
\tab\tab\tab\tab\}  else \{\par
\tab\tab\tab\tab\tab battleButton[0].form.submit();\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab return;\par
\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\tab var rebattleOpponent = $T('.optionsList a', /Rebattle Opponent/);\par
\tab\tab\tab if (rebattleOpponent) \{\par
\tab\tab\tab\tab var timeUntilBattle = (Options.nextBattleTime || 0) - new Date().getTime();\par
\tab\tab\tab\tab if (timeUntilBattle > 0) \{\par
\tab\tab\tab\tab\tab setTimeout(function()\{w.location.href = rebattleOpponent.href;\}, timeUntilBattle);\par
\tab\tab\tab\tab\}  else \{\par
\tab\tab\tab\tab\tab w.location.href = rebattleOpponent.href;\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\tab return;\par
\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\tab // Look for battle continue button\par
\tab\tab\tab var continueButton = $$('form[id="battleForm"] input[type="submit"]');\par
\tab\tab\tab if (continueButton.length) \{\par
\tab\tab\tab\tab continueButton[0].form.submit();\par
\tab\tab\tab\tab return;\par
\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\tab var searchGrass = $$('form input[type="submit"][value="Search"]');\par
\tab\tab\tab if (searchGrass.length) \{\par
\tab\tab\tab\tab searchGrass[0].click();\par
\tab\tab\tab\}\par
\tab\tab\}\par
\par
\tab\tab\par
\tab\tab if (Options.autoSearch) \{\par
\par
\tab\tab\par
\tab\tab\tab // Look for opportunity to initiate battle\par
\tab\tab\tab var wildText = unsafeWindow.document.querySelector('#appear p');\par
\tab\tab\tab if (!wildText) \{\par
\tab\tab\tab\tab searchGrass[0].click();\par
\tab\tab\tab\tab return;\par
\tab\tab\tab\}\par
\tab\par
\tab\tab\tab wildText = wildText.textContent.trim();\par
\tab\tab\tab if (!wildText.match(/Wild (Shiny)/)) \{\par
\tab\tab\tab\tab searchGrass[0].click();\par
\tab\tab\tab\tab return;\par
\tab\tab\}\par
\par
\par
\tab\tab\tab var battleButton = $$('form input[name="(!wildText)"][type="submit"]');\par
\tab\tab\tab if (battleButton.length) \{\par
\tab\tab\tab\tab return;\par
\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\tab // Look for battle continue button\par
\tab\tab\tab var continueButton = $$('form[id="battleForm"] input[type="submit"]');\par
\tab\tab\tab if (continueButton.length) \{\par
\tab\tab\tab\tab return;\par
\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\tab var searchGrass = $$('form input[type="submit"][value="Search"]');\par
\tab\tab\tab if (searchGrass.length) \{\par
\tab\tab\tab\tab searchGrass[0].click();\par
\tab\tab\tab\}\par
\tab\tab\tab\par
\tab\tab\}\par
\tab\} ;\par
\tab\par
\tab myData();\par
\tab readPage();\par
\tab\par
\})(typeof unsafeWindow == 'undefined' ? window : unsafeWindow);\par
}
