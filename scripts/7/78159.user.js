// ==UserScript==
// @name ConcentraMvl
// @namespace faveladogame.com.br
// @description Quita la penalizacion de 75% cuando estas concentrado
// @include http://*menelgame.pl/activities/*
// @include http://*pennergame.de/activities/*
// @include http://*clodogame.fr/activities/*
// @include http://*bumrise.com/activities/*
// @include http://*mendigogame.es/activities/*
// @include http://*serserionline.com/activities/*
// @include http://*dossergame.co.uk/activities/*
// @include http://*faveladogame.com.br/activities/*
// ==/UserScript==

var loc = location.href.replace("http://","").replace("www.","");
var forma = document.getElementsByTagName("form")[4];
var ans = loc.match(/([a-zA-Z\.]+)\/activities/)[1];
if (ans.indexOf("menelgame") != -1)
forma.innerHTML ="dodatkowe zajecie:<strong>"+forma.getElementsByTagName("strong")[0].innerHTML+"</strong><br/><select name=\"mode\" class=\"dropdown\" onChange=\"Konzentration(this.value)\"> <option value=\"1\" >nic</option> <option value=\"2\" >walki</option> <option value=\"3\" >puchy</option> </select><br><input type=\"button\" class=\"button_skill\" name=\"Submit2\" onclick=\"javascript:setupForm('http://www."+ans+"/activities/concentrate/')\" value=\"Koncentruj 4 www.f4c.pl\">";
else
forma.innerHTML ="actual:<strong>"+forma.getElementsByTagName("strong")[0].innerHTML+"</strong><br/><select name=\"mode\" class=\"dropdown\" onChange=\"Konzentration(this.value)\"> <option value=\"1\" >nothing</option> <option value=\"2\" >fight</option> <option value=\"3\" >bottels</option> </select><br><input type=\"button\" class=\"button_skill\" name=\"Submit2\" onclick=\"javascript:setupForm('http://www."+ans+"/activities/concentrate/')\" value=\"Concentrate 4 www.f4c.pl\">";