// ==UserScript==
// @name           Ek$i PRO
// @description    Ek$i PRO 
// @namespace      http://userscripts.org/users/228522
// @version        0.5
// @author         ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://antik.eksisozluk.com/*
// @include        https://antik.eksisozluk.com/*
// ==/UserScript==

function iyi_gunler_tesekkurler() {
var fieldset = document.getElementsByTagName("fieldset")[0];
var div =  fieldset.getElementsByTagName("div")[0];
var iyi_gunler = "<input type=\"button\" class=\"but\" onclick=\"hen('d', 'merhaba,\\n\\r','selamlar, iyi g\u00FCnler.', '')\" value=\"merhaba...\" title=\"merhaba ibaresi\" />";
var rica_ederim = "<input type=\"button\" class=\"but\" onclick=\"hen('d', 'rica ederim. iyi g\u00FCnler.','', '')\" value=\"rica ederim...\" title=\"rica ederim ibaresi\" />";
div.innerHTML += iyi_gunler + rica_ederim;

}

function sub_etha_button() 
{
 
var mytr = document.getElementsByTagName("tr");
mytr[1].innerHTML += "<td onmousedown=\"md(this)\" onmouseup=\"bn(this)\" onmouseover=\"ov(this)\" onmouseout=\"bn(this)\" class=\"but\" onclick=\"window.open('http://www.eksisozluk.com/sub_etha.asp?name=eksiduyuru')\" target=\"blank\">eksi duyuru</td><td onmousedown=\"md(this)\" onmouseup=\"bn(this)\" onmouseover=\"ov(this)\" onmouseout=\"bn(this)\" class=\"but\" onclick=\"window.open('http://www.eksisozluk.com/sub_etha.asp?name=sourberry')\" target=\"blank\">sourberry</td>";

mytr[2].innerHTML += "<td onmousedown=\"md(this)\" onmouseup=\"bn(this)\" onmouseover=\"ov(this)\" onmouseout=\"bn(this)\" class=\"but\" onclick=\"window.open('http://www.eksisozluk.com/sub_etha.asp?name=eksibition')\" target=\"blank\">ek$ibition</td><td onmousedown=\"md(this)\" onmouseup=\"bn(this)\" onmouseover=\"ov(this)\" onmouseout=\"bn(this)\" class=\"but\" onclick=\"window.open('http://www.eksisozluk.com/sub_etha.asp?name=eksibeta')\" target=\"blank\">beta</td>";	
}

if (window.location.href.match(/\/cc\.asp?sec=ma/))
{
 iyi_gunler_tesekkurler();	
}
else if (window.location.href.match(/\/top\.asp/))
{
 sub_etha_button();
}
