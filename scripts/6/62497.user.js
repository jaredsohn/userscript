// ==UserScript==
// @name           iFriends-PureHD
// @namespace      http://userscripts.org
// @description    Provides a DL link for the Pure WMV on the Fanclub HD Library page. Based heavily on another iFriends script by planet.
// @include        http://*.ifriends.net/*
// ==/UserScript==
/* Example:
    If img src is as followes:
       http://hdlocal.ifriends.net/0602/hd/PERFORMERNAME/T0001_S000_4_12.jpg
    Then the Pure HD video is at:
       http://hdlocal.ifriends.net/0602/hd/PERFORMERNAME/FCM.T0001_S000_PURE.WMV
*/

img = document.getElementsByTagName('img');
for(i=0; i<img.length; i++)
{
  if (img[i].src.indexOf('hdlocal') != -1)
  {
    if (img[i].src.indexOf('4_12.jpg') != -1)
    {	
	  src = img[i].src;
	  insertionindex = src.lastIndexOf('/')+1;
	  if (insertionindex > 0)
	  {
        vidsrc = src.substring(0, insertionindex) + 'FCM.' + src.substring(insertionindex);
        vidsrc = vidsrc.replace('4_12.jpg','PURE.WMV');
        downlink = '<a href="' + vidsrc + '">Download</a>';
        img[i].parentNode.parentNode.innerHTML = img[i].parentNode.parentNode.innerHTML + '<center>' + downlink + '</center>';
	  }
    }
  }
}