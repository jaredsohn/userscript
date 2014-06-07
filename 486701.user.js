// ==UserScript==
// @name        HFColours
// @namespace   www.dezinated.ca
// @description Change the HF colours from http://www.hackforums.net/usercp.php?action=options
// @version     1
// @match      http://*.hackforums.net/*
// @match      https://*.hackforums.net/*
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

document.head.innerHTML=document.head.innerHTML.replace(/x.hackforums.net\/cache\/themes\/theme3\/global.css/g,'dezinated.ca/dez/hf/global.php?colour='+GM_getValue("colour",350));
document.head.innerHTML=document.head.innerHTML.replace(/x.hackforums.net\/cache\/themes\/theme5\/global.css/g,'dezinated.ca/dez/hf/global.php?colour='+GM_getValue("colour",350));

document.body.innerHTML=document.body.innerHTML.replace('<td colspan="2"><span class="smalltext">Board Style:</span></td>','<td colspan="2"><input type="number" min="0" max="360" style="width:3em;" value="'+GM_getValue("colour",350)+'" id="themeColour"/><input type="button" id="changeTheme" value="Change theme colour"/></td></tr><tr><td colspan="2"><span class="smalltext">Board Style:</span></td>');
document.getElementById('changeTheme').addEventListener('click', changeTheme, false);

function changeTheme(){
	var col = document.getElementById("themeColour");
    GM_setValue("colour", col.value);
    location.reload();
}