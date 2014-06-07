// ==UserScript==
// @name           AMVNews More Info on Main Page     
// @description    This script gives an option of viewing the vid's creator and download links right on the main page of AMVNews.ru.
// @include        http://amvnews.ru
// @include        http://amvnews.ru/
// @include        http://amvnews.ru/index.php
// @include        http://amvnews.ru/index.php?go=News&page=*
// ==/UserScript==


//=================================================================================================


var loadVidInfo = function (somelink)
{
var fullDownload, previewDownload;

var videoPage = document.createElement('videoPage');

xmlhttp = new XMLHttpRequest();
// Why does it crash?..
// xmlhttpFullDownloadLink.setRequestHeader("Accept-Language", "ru, en");
// xmlhttpFullDownloadLink.setRequestHeader("Accept-Charset", "windows-1251");
xmlhttp.open('GET', 'http://amvnews.ru' + somelink, true);
xmlhttp.send(null);

var button = document.getElementById('morebutton'+ somelink);
button.value='Loading...';

xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4) {


videoPage = xmlhttp.responseText;
fullDownload=videoPage.substr(videoPage.indexOf('onClick="MM_openBrWindow'),138);
var fullDownloadID = fullDownload.substr(fullDownload.indexOf('id='),10).match(/\d+/);

var author = videoPage.substr(videoPage.indexOf('index.php?go=Ratings&file=byauthor&author=')+10,videoPage.length);
author = author.substr(0,author.indexOf('width=')-1);
author = author.substr(author.indexOf('>')+1,author.length);
author = author.substr(0,author.indexOf('<'));



//Let's get direct links
xmlhttpFullDownloadLink = new XMLHttpRequest();
// Why does it crash?..
// xmlhttpFullDownloadLink.setRequestHeader("Accept-Language", "ru, en");
// xmlhttpFullDownloadLink.setRequestHeader("Accept-Charset", "windows-1251"); 
xmlhttpFullDownloadLink.open('GET', 'http://amvnews.ru/index.php?go=Files&file=down&id='+fullDownloadID, true);
xmlhttpFullDownloadLink.send(null);

xmlhttpFullDownloadLink.onreadystatechange = function() {
button.value='Loading links...';
if (xmlhttpFullDownloadLink.readyState == 4) {

button.value='Loaded';


  var downPage = xmlhttpFullDownloadLink.responseText;
  downPage = downPage.substr(downPage.indexOf('http://amvnews.ru/Video/'),downPage.indexOf('target=')-2-downPage.indexOf('http://amvnews.ru/Video/'));
  fullDownload = downPage;
  
  var folder = fullDownload.substr(fullDownload.indexOf('http://amvnews.ru/Video/Full'),fullDownload.lastIndexOf('/'));
  folder = folder.substr(folder.indexOf('Full')+4,folder.lastIndexOf('/'));

  var filename = fullDownload.substr(fullDownload.lastIndexOf('/'),fullDownload.length);
  filename = filename.substr(0,filename.indexOf('amvnews.ru.'));

  var extension = fullDownload.substr(fullDownload.lastIndexOf('.'),fullDownload.length);
  
  previewDownload = 'http://amvnews.ru/Video/Preview/'+folder+filename+'preview.amvnews.ru'+ extension;
  
  
  para1 = document.createElement('A');
  para1.href = previewDownload; 
  para1.innerHTML = 'Preview version';
  
  para2 = document.createElement('A');
  para2.href = fullDownload; 
  para2.innerHTML = 'Full version';
  
  para3 = document.createElement('BR');
  
  para6 = document.createElement('b');
  para6.innerHTML = 'Created by: ';
  
  para4 = document.createElement('A');
  para4.href = 'index.php?go=Ratings&file=byauthor&author='+author; 
  para4.innerHTML = author;
  
  para5 = document.createElement('BR');
  

  button.parentNode.replaceChild(para1,button);
  para1.parentNode.insertBefore(para2,para1); 
  para1.parentNode.insertBefore(para3,para1);
  para1.parentNode.insertBefore(para5,para2);
  para1.parentNode.insertBefore(para4,para5);
  para1.parentNode.insertBefore(para6,para4);


}  
}








}
}

return 1;
}



//=================================================================================================



function createLoadButton(link)
{
button = document.createElement('input');
button.id = 'morebutton'+link;
button.value='Load more info';
button.setAttribute('TYPE', 'BUTTON');
button.addEventListener("click", function(){loadVidInfo(link)}, false);


return button;
}



//=================================================================================================




var allVids, thisVid;


allVids=document.getElementsByTagName('B');

for (var i = 0; i < allVids.length; i++)
{

thisVid = allVids[i];

if(thisVid.parentNode.getAttribute('href'))
{
var entryLink=thisVid.parentNode.getAttribute('href') 


if((entryLink.indexOf('Files')!=-1))
{

para = document.createElement('BR');

thisVid.parentNode.parentNode.insertBefore(createLoadButton(entryLink),thisVid.parentNode);
thisVid.parentNode.parentNode.insertBefore(para,thisVid.parentNode);  
thisVid.parentNode.parentNode.insertBefore(para,thisVid.parentNode); 
}


}



}



//=================================================================================================
