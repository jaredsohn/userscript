// ==UserScript==
// @name           k++
// @description    k++ 
// @namespace      
// @version        0.5
// @author         self abandonment/ocanal
// @license        GPL v3 or later; http://www.gnu.org/licenses/gpl.html
// @include        http://sozluk.sourtimes.org/*
// @include        http://www.eksisozluk.com/*
// @include        http://eksisozluk.com/*
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
mytr[1].innerHTML += "<td onmousedown=\"md(this)\" onmouseup=\"bn(this)\" onmouseover=\"ov(this)\" onmouseout=\"bn(this)\" class=\"but\" onclick=\"window.open('http://www.eksisozluk.com/sub_etha.asp?name=eksiduyuru')\" target=\"blank\"><a  title=\"eksi duyuru\" >&nbsp;eksi duyuru&nbsp;</a></td><td onmousedown=\"md(this)\" onmouseup=\"bn(this)\" onmouseover=\"ov(this)\" onmouseout=\"bn(this)\" class=\"but\" onclick=\"window.open('http://www.eksisozluk.com/sub_etha.asp?name=sourberry')\" target=\"blank\"><a  title=\"sourberry\" >&nbsp;sourberry&nbsp;</a></td><td onmousedown=\"md(this)\" onmouseup=\"bn(this)\" onmouseover=\"ov(this)\" onmouseout=\"bn(this)\" class=\"but\" onclick=\"top.sozmain.location.href = 'http://www.eksisozluk.com/cc.asp?sec=ad'\" target=\"sozindex\"><a  title=\"konduktor++\" >&nbsp;konduktor++&nbsp;</a></td>";


var turkeyTime = new Date();
                    var localTime = new Date();
                    var UTC = localTime.getTime() + (localTime.getTimezoneOffset()*60000);
                    turkeyTime = new Date(UTC + (3*60*60000)); // Yaz saati
                    //turkeyTime = new Date(UTC + (2*60*60000)); // Kis saati
                

var month = turkeyTime.getMonth() + 1;
                    var day = turkeyTime.getDate();
                    var year = turkeyTime.getFullYear();


mytr[2].innerHTML += "<td onmousedown=\"md(this)\" onmouseup=\"bn(this)\" onmouseover=\"ov(this)\" onmouseout=\"bn(this)\" class=\"but\" onclick=\"window.open('http://www.eksisozluk.com/sub_etha.asp?name=eksibition')\" target=\"blank\"><a  title=\"ek$ibition\" >&nbsp;ek$ibition&nbsp;</a></td><td onmousedown=\"md(this)\" onmouseup=\"bn(this)\" onmouseover=\"ov(this)\" onmouseout=\"bn(this)\" class=\"but\" onclick=\"window.open('http://www.eksisozluk.com/sub_etha.asp?name=eksibeta')\" target=\"blank\"><a  title=\"beta\" >&nbsp;beta&nbsp;</a></td><td onmousedown=\"md(this)\" onmouseup=\"bn(this)\" onmouseover=\"ov(this)\" onmouseout=\"bn(this)\" class=\"but\" onclick=\"top.sozindex.location.href = 'http://www.eksisozluk.com/index.asp?a=sr&kw=&au=&so=y"+"&fd="+day+"&fm="+month+"&fy="+year+"'\" target=\"sozindex\"><a  title=\"bugun++\" >&nbsp;bugun++&nbsp;</a></td>";	
}

if (window.location.href.match(/\/cc\.asp?sec=ma/))
{
 iyi_gunler_tesekkurler();	
}
else if (window.location.href.match(/\/top\.asp/))
{
 sub_etha_button();
}
