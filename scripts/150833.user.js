// ==UserScript==
// @name           Prey Tech Logo Changer
// @namespace      http://userscripts.org/users/425090
// @description    Changes the Prey Tech logo
// @include        http://www.preytech.com/forum/*
// ==/UserScript==

//if(document.getElementById("breadcrumb").innerHTML.search("Prey Tech")>=0)
{
document.getElementById("logo").innerHTML="<a name='top' href='forum.php'><img src='http://puu.sh/1hZTq' alt='preytech' title='preytech'></a>";
}

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://www.preytech.com/forum/images/vipbanner.png")
{
images[x].src = "http://puu.sh/1lonr";
}
x=x+1;
}