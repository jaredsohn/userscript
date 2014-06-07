// ==UserScript==
// @name           What.CD Style Swapper
// @namespace      http://what.cd
// @description    Quick CSS swapper for trying different themes
// @version        0.9
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==

var styles = new Array();
styles.push("http://members.lycos.co.uk/doctor99uk/whatcdxmas2.css");
styles.push("http://dl.getdropbox.com/u/407115/xmas/style.css");
styles.push("http://www.wipet.ro/temp/whatcd/style.css");
styles.push("http://blazingwolf.com/whatcss/red.css");
styles.push("http://blazingwolf.com/whatcss/cbrownchristmas.css");
styles.push("http://blazingwolf.com/whatcss/rudolph.css");
styles.push("http://www.ex3.org/whatcd/whatwinter.css");
styles.push("http://www.ex3.org/whatcd/whatwinter-green.css");
styles.push("http://www.wipet.ro/temp/whatcd/simpsons.css");
styles.push("http://dl-client.getdropbox.com/u/85242/style%20%288a%29.css");
styles.push("http://www.mompljc.com/holiday/style.css");

var linktags = document.getElementsByTagName("link");
for (var i in linktags) if (linktags[i].media == "screen") style = linktags[i];

var stylenum = GM_getValue("stylenum",Math.floor(Math.random()*11)+1);
style.href = styles[stylenum-1];

GM_setValue("stylenum",stylenum);

var profilearea = document.getElementById("userinfo_username");
var changelink = document.createElement("a");
changelink.textContent = "Theme "+stylenum;
changelink.href = "#";
changelink.addEventListener("click",change,false);
var changeli = document.createElement("li");
changeli.className = "brackets";
changeli.appendChild(changelink);
profilearea.appendChild(changeli);

function change() {
    stylenum++;
    if (stylenum > styles.length) stylenum = 1;
    GM_setValue("stylenum",stylenum);
    style.href = styles[stylenum-1];
    changelink.textContent = "Theme "+stylenum;
};