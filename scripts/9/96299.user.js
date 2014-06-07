// ==UserScript==
// @name           Google Search for 'photovoltaic'
// @namespace      smysore
// @version        1.1
// @description    Adds a section to the google search page
// ==/UserScript== 

document.addEventListener("DOMContentLoaded", startFcn, false);

document.onload=startFcn;
window.onload=startFcn;
var button= document.getElementById('btnG');
xmlHttp.onreadystatechange=startFcn;

function startFcn(){
var str = new String();
  str=window.location.href;
  str=str.toLowerCase();
  var url ='<div sig="PaM" class="vsc" rawurl=""><div class="vspi"></div><span class="tl"><h3 class="r"><a class="l" href="https://na1.salesforce.com/apex/Web2Lead?id=00530000004Bse9"><em>Goodman Group</em> - Retirement Living Communities</a></h3><button class="vspib"></button></span><div class="s" style="font-size:13px; margin-bottom:5px;">The <em>Goodman Group</em> is a privately held company, has seen substantial growth since its early beginnings in 1965. Today, our senior living, health care<b>...</b><br><span class="f"><cite>https://na1.salesforce.com/apex/Web2Lead?id=00530000004Bse9</cite> - <span class="gl"><a  href="">Cached</a> - <a href="">Similar</a></span></span></div></div>';

if (str.match('senior')) {
	document.getElementById('res').innerHTML=url+document.getElementById('res').innerHTML;
  }
}

