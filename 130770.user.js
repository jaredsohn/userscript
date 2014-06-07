// ==UserScript==
// @name           lol
// @namespace      http://www.reddit.com
// @include        about:addons
// @match          *reddit*
// @match         *imgur*
// @match       *youtube*
// ==/UserScript==

// Trolling by Kemus
// dont judge my code,
// I fucking hate JS
// <3

function horse(horses){
var z = document.URL.indexOf("youtube")==-1;
var y = document.URL.indexOf("dicks")==-1;

var neigh = [""]
horselines = horses.split(',"text":"');
for (i=1; i<horselines.length; i++)
{
neigh.push(horselines[i].split('"')[0].split("http:")[0]);
}
var randomnumber,r;
var text = document.getElementsByTagName('p');

for (i=0; i<text.length && z&&y; i++)
{
randomnumber=Math.floor(Math.random()*neigh.length);
if(text[i].innerHTML.replace(/<(?:.|\n)*?>/gm, '').length > 2 && text[i].innerHTML.indexOf(".com/user/")==-1){
if(text[i].innerHTML.indexOf("</a>")==-1){
r=Math.floor(Math.random()*11);
text[i].innerHTML = neigh[randomnumber];

while(r>=2){
randomnumber=Math.floor(Math.random()*neigh.length);
text[i].innerHTML +=" "+ neigh[randomnumber];
r=Math.floor(Math.random()*11);
}
}
}
}

var a = document.getElementsByTagName('a');
for (i=0; i<a.length; i++)
{
randomnumber=Math.floor(Math.random()*neigh.length);
if(a[i].className.indexOf("title")!=-1 && z&&y){

a[i].innerHTML = neigh[randomnumber];
}
if(a[i].href.indexOf("watch?")!=-1 && !z&&y){
a[i].href="http://www.youtube.com/watch?v=kffacxfA7G4";
}
}
var img = document.getElementsByTagName('img');
for (i=0; i<img.length && z&&y; i++)
{
r=Math.floor(Math.random()*11);
if((img[i].src.indexOf("thumb")!=-1 || img[i].src.indexOf("imgur")!=-1) && r<=2){
img[i].src="http://i.imgur.com/gRBHrs.jpg";
}
}
}

function genStats(){
  GM_xmlhttpRequest({
    method: "GET",
    url: "https://api.twitter.com/1/statuses/user_timeline.json?include_entities=false&include_rts=false&screen_name=horse_ebooks&count=200",
    onload: function(response) {
      horse(response.responseText);
    }
  });
}
genStats();


