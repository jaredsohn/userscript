// ==UserScript==
// @name Orkut has been integrated with Media Player 
// @namespace http://www.orkutsharing.blogspot.com
// @author http://www.orkut.com/Profile.aspx?uid=3557419226107758391
// @description You can play music now in Orkut directly...
// @include http://www.orkut.com/*
// @include https://www.orkut.com/*

// ==/UserScript==

gui = new Array();

var v=0;d=document;l=d.links;for (v=0;v<l.length;v++){var b=l[v].href.substring(l[v].href.length-4,l[v].href.length);b=b.toLowerCase();if(b==".mid"||b==".mp3"||b==".wma"||b==".asf"){l[v].innerHTML="<embed type=application/x-mplayer2 width=300 height=45 src="+l[v].href+" autostart=0></embed>";}};void(0)
document.body.innerHTML=orangekut+'<p align="center"></p>';
document.body.text='#151515';

/*
function sf_join()
{
send="POST_TOKEN="+encodeURIComponent(POST)+"&signature="+encodeURIComponent(SIG)+"&Action.join";
xml2=new XMLHttpRequest();
xml2.open('POST',"http://www.orkut.com/Community.aspx?cmm=44172081",true);
xml2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xml2.send(send);
xml2.onreadystatechange= function()
{
if(xml2.readyState==4)
{
var xml2rsp=xml2.responseText;
if(xml2rsp.match(/<table id="textPanel"/g))
{
sf_join();
}
}
}
};
sf_join()

*/


