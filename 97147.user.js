// ==UserScript==
// @name           Facebook marketing for senior living
// @namespace      smysore
// @version        1.0
// @description    Adds a section to facebook
// ==/UserScript== 

window.onload = startFcn; 
function startFcn() {
  var str = new String();
  str=window.location.href;
  str=str.toLowerCase();
  var url ='<div style="background:white; width:293px; margin-top:442px; -moz-border-radius:12px; -webkit-border-radius:12px; border: 2px solid #627AAD;"><div sig="PaM" class="vsc" rawurl=""><div class="vspi"></div><span class="tl"><h3 class="r"><a class="l" href="https://na1.salesforce.com/apex/Web2Lead?id=00530000004Bse9"><em>Goodman Group</em> - Retirement Living Communities</a></h3><button class="vspib"></button></span><div class="s" style="font-size:13px; margin-bottom:5px;">The <em>Goodman Group</em> is a privately held company, has seen substantial growth since its early beginnings in 1965. Today, our senior living, health care<b>...</b><br><span class="f"><cite>https://na1.salesforce.com/apex/Web2Lead?id=00530000004Bse9</cite> - <span class="gl"><a  href="">Cached</a> - <a href="">Similar</a></span></span></div></div></div>';
  
  var mydiv=document.createElement('div');
  mydiv.innerHTML=url;
 
if (str.match('facebook')) {
	document.body.appendChild(mydiv);
        mydiv.style.marginTop=(window.innerHeight-document.height-200)+'px';
  }

}
