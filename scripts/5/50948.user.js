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
styles.push("http://images.what.cd/styles/holiday.css");
styles.push("http://www.snipertemplates.com/blueworld/blueworld.css");
styles.push("http://unliked.galaxyturbo.xytex.net/whatcd/style.css");
styles.push("http://dl.getdropbox.com/u/121938/what/hero/style.css");
styles.push("http://makemoneytakemoney.net/what_teal/style.css");
styles.push("http://www.ex3.org/whatcd/fresh/fresh.css");
styles.push("http://olvrfshr.com/whatstyle.css");
styles.push("http://blazingwolf.com/whatcss/elevators/style.css");
styles.push("http://dl.getdropbox.com/u/626878/misc/what_css/what_white.css");
styles.push("http://dl.getdropbox.com/u/626878/misc/what_css/what_blue.css");
styles.push("http://makemoneytakemoney.net/what/style_red.css");
styles.push("https://dl.getdropbox.com/u/407115/minimal/style.css");
styles.push("http://dl.getdropbox.com/u/407115/minimal/style.css");
styles.push("http://lukemh.com/whatcd/NOCD.css");
styles.push("http://www.juicybitz.net/static/styles/wt_what/style.css");
styles.push("http://dl-client.getdropbox.com/u/85242/Web/Xuan/style2.css");
styles.push("http://blazingwolf.com/whatcss/red2.css");
styles.push("http://blazingwolf.com/whatcss/dt/style.css");
styles.push("http://blazingwolf.com/whatcss/longcat/longcat.css");
styles.push("http://blazingwolf.com/whatcss/electricblue/style.css");
styles.push("http://blazingwolf.com/whatcss/magical/style.css");
styles.push("http://blazingwolf.com/whatcss/magical/style2.css");

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