// ==UserScript==
// @name       Youtube to Fullrip
// @match      http://www.youtube.com/*
// @copyright  2012+, Alan McDonagh
// ==/UserScript==

var videoURL = document.URL;
var videoURL2 = videoURL.replace('https://','http://');
var id = videoURL2.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i)[1];
var url = 'http://www.fullrip.net/mp3/'+id

var position = document.getElementById('guide').children[0]//watch7-video-container
var button = document.getElementById('masthead-upload-button-group');
button = button.cloneNode(true);
button.style.display = 'inline-block';
button.style.marginBottom = '20px';
button.style.marginLeft = '27px';
if (button.children.length != 1){
	button.removeChild(button.children[1]);
}
button.children[0].innerHTML = 'Download as Mp3';
button.children[0].href = url;

position.insertBefore(button, position.children[0]);