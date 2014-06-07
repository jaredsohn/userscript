// ==UserScript==
// @name           iFriends-PureHD (updated by orimarc, original script by n33tfr33k) 
// @namespace      http://userscripts.org
// @description    Provides a DL link for the Pure MP4 on the Fanclub HD Library page. Based heavily on another iFriends script by planet.
// @include        http://*.ifriends.net/*
// ==/UserScript==
/* Example:
    If img src is as followes:
       http://video.ifriends.net/HD/MP4_HD077/SEXONTHEBEACH/T0005_S014_4_12.jpg
    Then the Pure HD video is at:
       http://video.ifriends.net/HD/MP4_HD077/SEXONTHEBEACH/MP4.T0005_S014_1080.MP4
*/

img = document.getElementsByTagName('img');
for(i=0; i<img.length; i++)
{
  if (img[i].src.indexOf('video') != -1)
  {
    if (img[i].src.indexOf('4_12.jpg') != -1)
    {	
	  src = img[i].src;
	  insertionindex = src.lastIndexOf('/')+1;
	  if (insertionindex > 0)
	  {
        vidsrc = src.substring(0, insertionindex) + 'MP4.' + src.substring(insertionindex);
        vidsrc = vidsrc.replace('4_12.jpg','1080.MP4');
        downlink = '<a href="' + vidsrc + '">Download 1080i</a>';
        img[i].parentNode.parentNode.innerHTML = img[i].parentNode.parentNode.innerHTML + '<center>' + downlink + '</center>';
	  }
    }
  }
}

img = document.getElementsByTagName('img');
for(i=0; i<img.length; i++)
{
  if (img[i].src.indexOf('video') != -1)
  {
    if (img[i].src.indexOf('4_12.jpg') != -1)
    {	
	  src = img[i].src;
	  insertionindex = src.lastIndexOf('/')+1;
	  if (insertionindex > 0)
	  {
        vidsrc = src.substring(0, insertionindex) + 'MP4.' + src.substring(insertionindex);
        vidsrc = vidsrc.replace('4_12.jpg','360.MP4');
        downlink = '<a href="' + vidsrc + '">Download 640x360</a>';
        img[i].parentNode.parentNode.innerHTML = img[i].parentNode.parentNode.innerHTML + '<center>' + downlink + '</center>';
	  }
    }
  }
}

img = document.getElementsByTagName('img');
for(i=0; i<img.length; i++)
{
  if (img[i].src.indexOf('aarchives') != -1)
  {
    if (img[i].src.indexOf('_12.jpg') != -1)
    {	
	  src = img[i].src;
	  insertionindex = src.lastIndexOf('/')+1;
	  if (insertionindex > 0)
	  {
        vidsrc = src.substring(0, insertionindex) + src.substring(insertionindex);
        vidsrc = vidsrc.replace('_12.jpg','.jpg');
        downlink = '<a href="' + vidsrc + '">Download</a>';
        img[i].parentNode.parentNode.innerHTML = img[i].parentNode.parentNode.innerHTML + '<center>' + downlink + '</center>';
	  }
    }
  }
}