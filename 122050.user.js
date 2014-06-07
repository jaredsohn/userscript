// ==UserScript==
// @id             music.google.com-5404f481-1418-4321-bf37-e40b26875b27@scriptish
// @name           Google Music Album Downloader
// @version        08.01.2012
// @namespace      
// @author         Foso 
// @description    Adds a link where you can download a whole Album automatically
// @include        *//music.google.com/music/listen*
// @include       *//music.google.com/music/download?u=0&songid=*
// @exclude       *//music.google.com/music/listen#*_pl
// @exclude       *//music.google.com/music/listen#*_ar
// @run-at         window-load
// ==/UserScript==


/////////////////////////////////////////////////////////////////
///// Check if the downloadpage is opened                   /////

var url=document.URL;

if(url.indexOf('download') != -1){

var quelltext =  document.body.innerHTML;
var quelltext = quelltext.replace(/\&amp;/g,'&');
var link = quelltext.substring(13,(quelltext.length-8));

window.location.href = link;

// about:config
// dom.allow_scripts_to_close_windows=true
window.setTimeout("window.close()", 20000);

}


/////////////////////////////////////////////////////////////////
///// check if the backButton get clicked                   /////

var back = document.getElementById('breadcrumbs').firstChild;
back.addEventListener('click', deleteButton, false);

/////////////////////////////////////////////////////////////////
///// insert downloadButton                                 /////
var LinkDiv = document.createElement('div');
LinkDiv.className = 'tab-text';
LinkDiv.id = 'tab-text';
LinkDiv.innerHTML += 'DOWNLOAD ALBUM';
document.getElementById('breadcrumbs').appendChild(LinkDiv);
LinkDiv.addEventListener('click', Download, false);

//delete the created button
function deleteButton() {
document.getElementById('breadcrumbs').removeChild(LinkDiv);
}

/////////////////////////////////////////////////////////////////
///// Download                                              /////


function Download() {

Check = confirm("Album Download?");
if (Check == true)
  var quelltext = document.getElementsByClassName('artistViewTable')[0].innerHTML;


//detect needed size of Songarrray
var arrlaenge = quelltext.substring((quelltext.indexOf('albumViewSubInfo')+18),(quelltext.indexOf('SONGS')-1));

//declare array
var Song = new Array(parseInt(arrlaenge));


//searching the first appearance of "songs_"
var linkstart= (quelltext.indexOf('songs_'));

//delete unnecessary crap
quelltext = quelltext.substring(linkstart); 

//initialize array

for(i=0;i<Song.length;i++)
{
var songstart= (quelltext.indexOf('songs_')+6);
var songende= (quelltext.indexOf('songRow artistAlbumRow')-9);
Song[i]=quelltext.substring(songstart,songende);
quelltext = quelltext.substring((songende+14));
}

//Downloadlink
var link= 'https://music.google.com/music/download?u=0&songid=';


//Open downloadlinks


for(i=0;i<Song.length;i++)
{
popup('download?u=0&songid='+Song[i]);
}



function popup (url) {
 fenster = window.open(url, url, "width=400,height=300,resizable=yes");
  return false;
  
}


}

