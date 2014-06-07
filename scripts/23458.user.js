// ==UserScript==
// @name           Gamefaqs - Add Page Jumper
// @namespace      gamefaqs
// @include        *.gamefaqs.com/boards/search.php*
// @include        *.gamefaqs.com/boards/myposts.php*
// ==/UserScript==


page=(a=document.body.innerHTML).match(/Page ([0-9]+) of ([0-9]+)/)||[1,0];
if(!page[1])return false;
b=document.createElement("div");
b.className="pagejumper";
if(t=document.location.toString().match(/search\.php/)){
  link=a.match(/boards\/search\.php\?board=([0-9]+)(?:&amp;page=[0-9]+)?&amp;search=([^"]+)/i)||[,];
  d='<ul>\n<li class="first">Jump to Page: '+((parseInt(page[1])-1)?'<a href="/boards/search.php?board='+link[1]+'&amp;search='+link[2]+'">1':1)+((parseInt(page[1])-1)?'</a>':'')+'</li>';
  for(c=1;c<parseInt(page[2]);c+=1)
  d+='<li>'+((c!=parseInt(page[1])-1)?'<a href="/boards/search.php?board='+link[1]+'&amp;search='+link[2]+'&amp;page='+c+'">':'')+(c+1)+((c!=parseInt(page[1])-1)?'</a>':'')+'</li>';
}else{
d='<ul>\n<li class="first">Jump to Page: '+((parseInt(page[1])-1)?'<a href="/boards/myposts.php">1':1)+((parseInt(page[1])-1)?'</a>':'')+'</li>';
  for(c=1;c<parseInt(page[2]);c+=1)
  d+='<li>'+((c!=parseInt(page[1])-1)?'<a href="/boards/myposts.php?page='+c+'">':'')+(c+1)+((c!=parseInt(page[1])-1)?'</a>':'')+'</li>';
}

var r;
v=["Search","Active Messages"];

for(k in g=document.getElementsByTagName("div"))
if(g[k].className=="pagejumper")d="<p>The page jumper is now present on the gamefaqs "+((t)?v[r=0]:v[r=1])+" page. You should check if it is present on the "+v[!r-0]+" page. If it is, you can now uninstall the greasemonkey script that adds it.</p>";

b.innerHTML=d+'</ul>';
document.getElementById("board_wrap").appendChild(b);
