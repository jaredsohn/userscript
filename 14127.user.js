// ==UserScript==
// @name           ACF functionality+
// @namespace      .
// @description    adds specific keywords/syntax to make posting easier
// @include        http://acforums.megadoomer.com/viewtopic*
// @include        http://acforums.megadoomer.com/posting.php*
// @include        http://acforums.megadoomer.com/privmsg.php*
// ==/UserScript==

textBox=document.getElementsByTagName("textarea");
textBox=textBox[0];

textBox.addEventListener('keyup',function(){updateBox();},true);

function updateBox(){

if (textBox.value.match(/\[d;.+;.+\]/)){

data=textBox.value.match(/\[d;.+;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/cash.php?mode=donate&u='+wdata[1]+']'+wdata[2]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}


if (textBox.value.match(/\[p;.+;.+\]/)){

data=textBox.value.match(/\[p;.+;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/profile.php?mode=viewprofile&u='+wdata[1]+']'+wdata[2]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[r;.+\]/)){

data=textBox.value.match(/\[r;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewtopic.php?t=53114]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[ac;.+\]/)){

data=textBox.value.match(/\[ac;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=5]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[acww;.+\]/)){

data=textBox.value.match(/\[acww;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=72]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[textures;.+\]/)){

data=textBox.value.match(/\[textures;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=18]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[cat;.+\]/)){

data=textBox.value.match(/\[cat;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=86]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[general;.+\]/)){

data=textBox.value.match(/\[general;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=1]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[newbie;.+\]/)){

data=textBox.value.match(/\[newbie;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=25]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[creativity;.+\]/)){

data=textBox.value.match(/\[creativity;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=48]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[offtopic;.+\]/)){

data=textBox.value.match(/\[offtopic;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=13]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[yeolde;.+\]/)){

data=textBox.value.match(/\[yeolde;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=89]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[entertainment;.+\]/)){

data=textBox.value.match(/\[entertainment;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=2]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[video;.+\]/)){

data=textBox.value.match(/\[video;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=3]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[sport;.+\]/)){

data=textBox.value.match(/\[sport;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=87]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[retro;.+\]/)){

data=textBox.value.match(/\[retro;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=27]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[tomes;.+\]/)){

data=textBox.value.match(/\[tomes;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=44]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[bells;.+\]/)){

data=textBox.value.match(/\[bells;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=54]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[acwwmeetings;.+\]/)){

data=textBox.value.match(/\[acwwmeetings;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=80]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[meetings;.+\]/)){

data=textBox.value.match(/\[meetings;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=81]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[tradereport;.+\]/)){

data=textBox.value.match(/\[tradereport;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewforum.php?f=41]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[trading;.+\]/)){

data=textBox.value.match(/\[trading;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/index.php?c=9]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[newbiefaq;.+\]/)){

data=textBox.value.match(/\[newbiefaq;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewtopic.php?t=129071]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[bellfaq;.+\]/)){

data=textBox.value.match(/\[bellfaq;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/viewtopic.php?t=129217]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}

if (textBox.value.match(/\[search;.+\]/)){

data=textBox.value.match(/\[search;.+\]/)

for(a in data){
data[a]=data[a]+'';
wdata=data[a].replace(/\[/,'').replace(/\]/,'');
wdata=wdata.split(";");
wdata2='[url=http://acforums.megadoomer.com/search.php]'+wdata[1]+'[/url]'
textBox.value=textBox.value.replace(data[a],wdata2)

}}



}