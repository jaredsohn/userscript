// ==UserScript==
// @name          Tweet this vid!
// @version       0.6
// @namespace     http://erichlotto.com/projects
// @description   Send #NowPlaying from youtube to twitter
// @include       http://www.youtube.com/*
// @include       https://twitter.com/*
// ==/UserScript==

// define if updates will be send automatic or not (0=manual 1=automatic):
automatic = 1;

if(document.getElementById('eow-title')){

video_title = document.getElementById('eow-title').title

var separayt = location.href.split("=");
var separayt2 = separayt[1].split("&");
var urlcompactada = 'http://youtu.be/' + separayt2[0]
document.getElementById('watch-actions-right').innerHTML += '<a target="_blank" href="https://twitter.com/?status=%23NowPlaying: &quot;'+ video_title + '&quot; on YouTube - ' + urlcompactada + '" title="Send #NowPlaying to twitter  ||  Tip: open link in a new tab to keep the focus on video."><br/><DIV ALIGN=CENTER><img src="http://erichlotto.com/projects/ttv.png" alt="image"></div></a>';}
else{
if(automatic == 1){
valor = location.href;
var separa = valor.split(":");
if(separa[1] == '//twitter.com/?status=%23NowPlaying'){
var statusElem = document.getElementById('status');
if (statusElem) {
if(statusElem.value != "") // Refuse to submit empty text
if(statusElem.value.length < 140) {
statusElem.form.submit();
}else{
alert('Failed to send update: 140 character limit reached')
}}}}}