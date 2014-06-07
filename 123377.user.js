// ==UserScript==
// @name           CR Slowmo
// @namespace      Moyyom
// @include        http://canvasrider.com/draw
// ==/UserScript==

var goals = document.createElement('div');
goals.innerHTML = '<input id="bomb" type="button" value="BOMBS" onclick="javascript:document.getElementById(&quot;trackcode&quot;).value = document.getElementById(&quot;trackcode&quot;).value.replace(/\\O/g,&quot;S&quot;);">';

var bombs = document.createElement('div');
bombs.innerHTML = '<input id="goal" type="button" value="GOALS"  onclick="javascript:document.getElementById(&quot;trackcode&quot;).value = document.getElementById(&quot;trackcode&quot;).value.replace(/\\T/g,&quot;S&quot;);">';

document.getElementsByClassName("floatRight")[1].appendChild(goals);
document.getElementsByClassName("floatRight")[1].appendChild(bombs);

document.getElementById("trackcode").rows = "8";