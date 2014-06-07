// ==UserScript==
// @name	PSV src image redirect
// @namespace	qih
// @description	autoredirect to jpg
// @version	3.0.2
// @icon	http://www.timendum.net/sji2.png
// @updateURL	http://userscripts.org/scripts/source/164908.user.js
// @grant	GM_registerMenuCommand
// @grant	GM_xmlhttpRequest
// @grant	GM_setValue
// @grant	GM_getValue
// @grant	GM_deleteValue
// ==/UserScript==

//15:26 06.05.2013: 3.0.2: hrefs[i].onmousemove

var SkipHosts = Array();
var hosts = Array();
var hostsGet = Array();
window.allHrefs = Array();

var imgDiv = document.createElement('DIV');
imgDiv.style.background = 'Silver';
imgDiv.style.border = '1px solid red';
imgDiv.style.padding = '6px';
imgDiv.onclick = OnImageClick;

function addHost(ahost, amethod, hosts) { hosts.push(Array(ahost, amethod));}

SkipHosts = JSON.parse(GM_getValue('ImageRedirskipHost', JSON.stringify(SkipHosts)));

var  hostIdx = SkipHosts.indexOf(document.location.host);
if (hostIdx != -1)
{
  GM_registerMenuCommand('Включить image redirect на этой странице', GM_Douse);
  return;
}
GM_registerMenuCommand('Не использовать image redirect на этой странице', GM_Unuse);

function ExtractFileExt(path)
{
 var lpos = path.lastIndexOf('.');
 if (lpos >= 0)
   return path.slice(lpos, path.length);
 return '';
}

function ParseUrl(surl, spart)
{
  var pattern = "^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$";
  var rx = new RegExp(pattern);
  var parts = rx.exec(surl);

  for(var i = 0; i<10; i++)
    parts[i] = parts[i] || "";
  //parts[7] || "/";

  if ('href' == spart)     return parts[0];
  if ('protocol' == spart) return parts[1];
  if ('host' == spart)     return parts[4];
  if ('hostname' == spart) return parts[5];
  if ('port' == spart)     return parts[6];
  if ('pathname' == spart) return parts[7];
  if ('search' == spart)   return parts[8];
  if ('hash' == spart)   return parts[10];
  return parts;
}

function base64_decode( data ) 
{	// Decodes data encoded with MIME base64
	// 
	// +   original by: Tyler Akins (http://rumkin.com)

	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

	do {  // unpack four hexets into three octets using index points in b64
		h1 = b64.indexOf(data.charAt(i++));
		h2 = b64.indexOf(data.charAt(i++));
		h3 = b64.indexOf(data.charAt(i++));
		h4 = b64.indexOf(data.charAt(i++));

		bits = h1<<18 | h2<<12 | h3<<6 | h4;

		o1 = bits>>16 & 0xff;
		o2 = bits>>8 & 0xff;
		o3 = bits & 0xff;

		if (h3 == 64)	  enc += String.fromCharCode(o1);
		else if (h4 == 64) enc += String.fromCharCode(o1, o2);
		else			   enc += String.fromCharCode(o1, o2, o3);
	} while (i < data.length);

	return enc;
}

function GM_Douse()
{
  var  hostIdx = SkipHosts.indexOf(document.location.host);
  SkipHosts.splice(hostIdx, 1); 
  GM_setValue('ImageRedirskipHost', JSON.stringify(SkipHosts));
  document.location.href = document.location.href;
}

function GM_Unuse()
{
  SkipHosts.push(document.location.host);
  GM_setValue('ImageRedirskipHost', JSON.stringify(SkipHosts));
  document.location.href = document.location.href;
}

function GetImageUrl(url)
{
 var ahost = ParseUrl(url, 'host');
 if ((ahost == 'www.girlscanner.com') || (ahost == 'x.epidemz.net') || (ahost == 'xxx.styanulo.net'))
 {
    url = ParseUrl(decodeURIComponent( url), 'search');
    if (url.charAt(0) == '?')
      url = url.slice(1, url.length);
    url = url.split('&');
    if (url[0] == '')
      return '';
    for (var i = 0; i < url.length; i++)
    if (url[i].split(':')[0] == 'a')
    {
      url = base64_decode(url[i].split(':')[1]);
      ahost = ParseUrl(url, 'host');
      break;
    }
    if (url == '') return '';   
 }

 for (var i = 0; i < hosts.length; i++)
 if (hosts[i][0] == ahost)
  return hosts[i][1](url);

 for (var i = 0; i < hostsGet.length; i++)
 if (hostsGet[i][0] == ahost)
  return hostsGet[i][1](url);

 return '';
}

function GetImageFrom_exclusivefaile_(PageLink)
{
  return '';

  var imgs = dom.getElementsByTagName('img');
  
  if (imgs)
  for (var n = 0;n <imgs.length; n++ )
  if (imgs[n].className == 'pic')
    return imgs[n].src;
  return '';
}

function ImageQrroHunt(aHref)
{
  var hr = aHref;
  var lp = hr.lastIndexOf('.html');
  if ((lp) == (hr.length-5))
    return hr.slice(0, lp);
}
function ImagepicseeHunt(aHref) //if ((location.host == 'picsee.net')) 
{

 var aLoc = ParseUrl(aHref, '');
 var hr = aLoc[7];
 var lp = hr.lastIndexOf('.html'); 
 if ((lp) == (hr.length-5))
   return aLoc[1]+'//'+ aLoc[4]+'/upload'+ hr.slice(0, lp)
 else
   return '';
}
function Imagepic4youHunt(aHref)
{
 var hr = ParseUrl(aHref, 'pathname');
 var lp = hr.lastIndexOf('/1/'); 
 if (lp != (hr.length-3))
   return aHref+'1/';
 return '';
}
function ImagepostimagecurlHunt(aHref)
{
 if (aHref.indexOf('viewer.php')>0)
 {
   aHref = aHref.replace('viewer.php','download.php');
   return aHref;
 }
 return '';
}
function ImagepostimgnetHunt(aHref)
{
 var aLoc = ParseUrl(aHref, '');
 var qry = aLoc[8].slice(1).split('&');
 var lnk='';
 if (qry.length>0)
 {
  for (var i=0;i<qry.length;i++)
  if (qry[i].split('=')[0] == 'file')
  {
    lnk = qry[i].split('=')[1];
    break;
  }
  if (lnk.slice(lnk.length-4) != '.jpg')
   lnk = lnk+'.jpg';
 };
 if (lnk != '')
   return aLoc[1]+'//'+ aLoc[4]+'/images/'+lnk;
}
function ImagephotosexbizHunt(aHref)
{
 var aLoc = ParseUrl(aHref, '');
 var qry = aLoc[8].slice(1).split('&');
 var lnk='';
 if (qry.length>0)
 {
  for (var i=0;i<qry.length;i++)
  if (qry[i].split('=')[0] == 'id')
  {
    lnk = qry[i].split('=')[1];
    break;
  }
  if (lnk.slice(lnk.length-4) != '.jpg')
   lnk = lnk+'.jpg';
 };
 if (lnk != '')
   return aLoc[1]+'//'+ aLoc[4]+'/pic_b/'+lnk;
}
function ImagefullpixHunt(aHref) 
{
 var hr = aHref;
 var lp = hr.lastIndexOf('.html'); 
 if (lp > 0 )
   return hr.slice(0, lp);
 return '';
}
function ImageimagepdbHunt(aHref)
{
 var aLoc = ParseUrl(aHref, '');
 var qry = aLoc[8].slice(1).split('&');
 var lnk='';
 if (qry.length > 0)
 {
  for (var i=0;i < qry.length;i++)
  if (qry[i].split('=')[0] == 'v')
    lnk = qry[i].split('=')[1];

  if ((lnk != '') && (lnk.slice(lnk.length-4) != '.jpg'))
    lnk = lnk+'.jpg';
 };
 if (lnk != '')
   return aLoc[1]+'//'+ aLoc[4]+'/images/'+lnk;
}
function ImagepicrakHunt(aHref) //if ((location.host == 'imagepdb.com')||(location.host == 'tippic.eu'))
{
 var aLoc = ParseUrl(aHref, '');
 var qry = aLoc[8].slice(1).split('&');
 var lnk='';
 if (qry.length>0)
 {
  for (var i=0;i<qry.length;i++)
  if (qry[i].split('=')[0] == 'file')
  {
   lnk = qry[i].split('=')[1];
   break;
  }
  if (lnk.slice(lnk.length-4) != '.jpg')
   lnk = lnk+'.jpg';
 };
 if (lnk != '')
   return aLoc[1]+'//'+ aLoc[4]+'/images/'+lnk;
}
function ImageyourfreepornHunt(aHref) 
{
 var aLoc = ParseUrl(aHref, '');
 var qry = aLoc[8].slice(1).split('&');
 var lnk='';
 if (qry.length>0)
 {
  for (var i=0;i<qry.length;i++)
  if (qry[i].split('=')[0] == 'im')
   lnk = qry[i].split('=')[1];
  if (lnk.slice(lnk.length-4) != '.jpg')
   lnk = lnk+'.jpg';
 };
 if (lnk != '')
   return aLoc[1]+'//'+ aLoc[4]+lnk;
}
function ImagexxxhostHunt(aHref) 
{
 var aLoc = ParseUrl(aHref, '');
 var qry = aLoc[8].slice(1).split('&');
 var lnk='';
 if (qry.length>0)
 {
  for (var i=0;i<qry.length;i++)
  if (qry[i].split('=')[0] == 'file')
  {
   lnk = qry[i].split('=')[1];
   break;
  }

  if ((lnk != '') &&(lnk.slice(lnk.length-4) != '.jpg'))
   lnk = lnk+'.jpg';
 }; 
 if (lnk != '')
   return aLoc[1]+'//'+ aLoc[4]+'/files/'+lnk;
 return '';
}
function ImagepixsorHunt(aHref)
{
 var aLoc = ParseUrl(aHref,'');
 var hr = aLoc[7]; 
 var idx = hr.indexOf('/share-');
 var lnk = '';
 if ((idx >= 0) && (hr.slice(hr.length- 5) == '.html'))
  lnk = hr.slice(7+idx, hr.length- 5);
 var prevlnk = hr.slice(0,idx); 
 if (lnk != '')
   return 'http://'+aLoc[4]+prevlnk+'/image.php?id='+lnk;
 return aHref;
}
function ImageamateurfreakHunt(aHref)
{
 var aLoc = ParseUrl(aHref,'');
 var hr = aLoc[7]; 
 var idx = hr.indexOf('/share-');
 var lnk = '';
 if ((idx >= 0) && (hr.slice(hr.length- 5) == '.html'))
  lnk = hr.slice(7+idx, hr.length- 5);
 var prevlnk = hr.slice(0,idx); 
 if (lnk != '')
   return 'http://'+aLoc[4]+prevlnk+'/image-'+lnk+'.jpg';
 return aHref;
}
function ImagefastpicHunt(aHref)
{
 var aLoc = ParseUrl(aHref,'');
 var hr = aLoc[7]; 
 var lnks = hr.split('/');
 lnks.shift(); //убираем /
 lnks.shift(); //убираем /
 var serv = lnks.shift();

 var ext = ExtractFileExt(lnks[2]); 
 if (ext == '.html')
  lnks[2] = lnks[2].slice(0, lnks[2].length- 5);

 var ext = ExtractFileExt(lnks[2]);
 var subst = lnks[2].length-2-ext.length;
 var sublnk = lnks[2].slice(subst,subst+2);
 var lnk = lnks[0]+'/'+lnks[1]+'/'+sublnk+'/'+lnks[2];

 if (lnk != '')
   return 'http://i'+serv+'.'+aLoc[4]+'/big/'+lnk;
}
function ImagepixdirHunt(aHref) //if ((location.host == 'www.euro-pic.eu') || (location.host == 'www.pixsor.com') || (location.host == 'hosttrain.org'))
{
 var aLoc = ParseUrl(aHref,'');
 var hr = aLoc[7]; 
 var idx = hr.indexOf('/show/');
 var lnk = '';
 if ((idx == 0) &&(hr.slice(hr.length- 4) == '.jpg'))
  lnk = hr.slice(6);
 if (lnk != '')
   return 'http://'+aLoc[4]+'/images/'+lnk;
}
function ImagephotoscreenHunt(aHref) //if ((location.host == 'photoscreen.ru')) 
{
 var hr = ParseUrl(aHref, 'href');
 var lp = hr.lastIndexOf('.html');
 if ((lp) == (hr.length-5))
   return hr.slice(0, lp);
}
function ImageimagepixHunt(aHref) //if ((location.host == 'photoscreen.ru')) 
{
 var hr = ParseUrl(aHref, 'pathname');
 var lp = hr.lastIndexOf('.html');
 if ((lp) == (hr.length-5))
   hr = hr.slice(0, lp)
 else return
  aHref;
 hr = hr +'.jpg';
 if (hr.indexOf('/image') == 0)
  hr = '/full'+hr.slice(6, hr.length);
 var ln = ParseUrl(aHref, '');
 return ln[1]+'//'+ln[4]+hr;
}
function ImagepicdumperHunt(aHref)
{
 if (aHref.indexOf('.jpg')>=0) return;
 aHref = aHref.split('/');
 var fname = aHref[aHref.length -1];
 var ffold = aHref[aHref.length -2];
 aHref = 'http://www.picdumper.com/screens/'+fname.substr(0,4)+'/'+ffold+'_'+fname+'.jpg';
 return aHref;
}
function ImageShareZoneHunt(aHref)
{
 var aLoc = ParseUrl(aHref, '');
 var qry = aLoc[8].slice(1).split('&');
 var lnk='';
 if (qry.length>0)
 {
  for (var i=0;i<qry.length;i++)
  if (qry[i].split('=')[0] == 'filename')
  {
   lnk = qry[i].split('=')[1];
   break;
  }

  if ((lnk != '') &&(lnk.slice(lnk.length-4) != '.jpg'))
   lnk = lnk+'.jpg';
 }; 
 if (lnk != '')
   return aLoc[1]+'//'+ aLoc[4]+'/images/'+lnk;
 return '';
}
function ImageSeedimageHunt(aHref)
{
 if (aHref.indexOf('viewer.php')<0) return;
 return aHref.replace('viewer.php?file=', 'images/');
}
addHost('www.seedimage.com', ImageSeedimageHunt, hosts);

addHost('sharezones.biz', ImageShareZoneHunt, hosts);
addHost('www.picbank.asia', ImagepostimgnetHunt, hosts);
addHost('imgnip.com', ImagepostimgnetHunt, hosts);
addHost('www.imgnip.com', ImagepostimgnetHunt, hosts);
addHost('www.picdumper.com', ImagepicdumperHunt, hosts);
addHost('qrrro.com', ImageQrroHunt, hosts);
addHost('sexscreen.ws', ImageQrroHunt, hosts);
addHost('exclusivefaile.com', GetImageFrom_exclusivefaile_, hostsGet);
addHost('picsee.net', ImagepicseeHunt, hosts);
addHost('pic4you.ru', Imagepic4youHunt, hosts);
addHost('imagecurl.com', ImagepostimagecurlHunt, hosts);
addHost('imagecurl.org', ImagepostimagecurlHunt, hosts);
addHost('postimg.net', ImagepostimgnetHunt, hosts);
addHost('photosex.biz', ImagephotosexbizHunt, hosts);
addHost('fullpix.net', ImagefullpixHunt, hosts);
addHost('www.fastpics.net', ImageimagepdbHunt, hosts);
addHost('imagepdb.com', ImageimagepdbHunt, hosts);
addHost('tippic.eu', ImageimagepdbHunt, hosts);
addHost('imageapache.com', ImageimagepdbHunt, hosts);
addHost('imgfantasy.com', ImageimagepdbHunt, hosts);
addHost('imagedomino.net', ImageimagepdbHunt, hosts);
addHost('www.picturevip.com', ImageimagepdbHunt, hosts);
addHost('www.picturescream.com', ImageimagepdbHunt, hosts);
addHost('www.picrak.com', ImagepicrakHunt, hosts);
addHost('www.tinypix.me', ImagepicrakHunt, hosts);
addHost('lingur.net', ImagepicrakHunt, hosts);
//addHost('dumppix.com', ImagepicrakHunt, hosts);
addHost('www.yourfreeporn.us', ImageyourfreepornHunt, hosts);
//addHost('xxxhost.me', ImagexxxhostHunt, hosts); // http://xxxhost.me/viewer.php?file=twj96kwwzjm5it7v55cs.jpg
//addHost('www.4ufrom.me', ImagexxxhostHunt, hosts); // http://xxxhost.me/viewer.php?file=twj96kwwzjm5it7v55cs.jpg
//addHost('4ufrom.me', ImagexxxhostHunt, hosts); // http://xxxhost.me/viewer.php?file=twj96kwwzjm5it7v55cs.jpg
addHost('www.euro-pic.eu', ImagepixsorHunt, hosts);
addHost('euro-pic.eu', ImagepixsorHunt, hosts);
addHost('www.pixsor.com', ImagepixsorHunt, hosts);
addHost('pixsor.com', ImagepixsorHunt, hosts);
addHost('hosttrain.org', ImagepixsorHunt, hosts);
addHost('amateurfreak.org', ImageamateurfreakHunt, hosts);
addHost('fastpic.ru', ImagefastpicHunt, hosts);
addHost('www.pixdir.net', ImagepixdirHunt, hosts);
addHost('imagezilla.net', ImagepixdirHunt, hosts);
addHost('photoscreen.ru', ImagephotoscreenHunt, hosts);
addHost('imagepix.org', ImageimagepixHunt, hosts);


function PinImage(e)
{
  imgDiv.setAttribute('pinned', 'true');

  var ow = parseInt(imgDiv.firstChild.getAttribute('ow'));
  var oh = parseInt(imgDiv.firstChild.getAttribute('oh'));

  imgDiv.style.width = (ow+14)+'px';
  imgDiv.style.height = (oh+14)+'px';
  imgDiv.firstChild.width = imgDiv.firstChild.getAttribute('ow');
  imgDiv.firstChild.height = imgDiv.firstChild.getAttribute('oh');

  var pictop;
  var picleft;
  if (e) 
  {
   pictop = e.clientY +pageYOffset;
   picleft = e.clientX +pageXOffset;
  }else
  {
    pictop = parseInt(imgDiv.style.top);
    picleft = parseInt(imgDiv.style.left);
  }

  if ((picleft + ow +40) > window.innerWidth)
    picleft = window.innerWidth - ow -40;

  if (((pictop + oh+40) > (window.innerHeight +pageYOffset)) && (oh < window.innerHeight))
    pictop = window.innerHeight - oh -40 +pageYOffset;

  imgDiv.style.top = String(pictop +1)+'px';
  imgDiv.style.left = String(picleft +1)+'px';
  imgDiv.style.position = 'absolute';

  imgDiv.style.overflow= 'auto';
  imgDiv.style.cursor = 'pointer';
}


function OnClickHandler(e)
{
  if (e.ctrlKey == 1)
  {
    window.open(e.target.parentNode.href,  '_blank');
    return false;
  }

  imgDiv.removeAttribute('pinned');
  OnMouseEnter(e, 'click');
  PinImage(e);
  return false;
}

function OnMouseClick(e)
{
}

function CalcThumbSize(inW, inH, mw, mh)
{
//  var mw = 400;
//  var mh = 400;

  var w = 0; 
  var h = 0;
  if ((inW <= mw) && (inH <= mh))
  {
   w = inW;
   h = inH;
  }
  else
  if ((inW/inH) > (mw/mh))
  {
   w = mw;
   h = mw / (inW/ inH);
  }
  else
  {
   h = mh;
   w = mh / ( inH / inW);
  };
  return new Array(w, h);
}

function OnPreviewLoad(img, e)
{
  img.setAttribute('lowsrc', '');

  var oh = img.height;
  var ow = img.width;
  imgDiv.firstChild.setAttribute('oh', oh);
  imgDiv.firstChild.setAttribute('ow', ow);

  if (imgDiv.getAttribute('pinned') == 'true')
  {
    PinImage();
  }
  else
    OnMouseEnter(img.src, 'loaded');
}

function OnMouseEnter(e, param)
{
//  if ((param == 'loaded')&&(imgDiv.getAttribute('pinned') == 'true'))
//  {
//    PinImage();
//    return false;
//  }

  if (imgDiv.hasAttribute('pinned') && (imgDiv.getAttribute('pinned') == 'true'))
  {
    return false;
  }

  var IMG = new Image();

  if (typeof(e) == 'string')
    IMG.src = e
  else
  {
    IMG.src = e.target.parentNode.href;
    IMG.onload = function(){ OnPreviewLoad(IMG, e);};
  }

  var oh = IMG.height;
  var ow = IMG.width;
  var sizes = CalcThumbSize(ow, oh, 400, 300);
  var w = sizes[0]; 
  var h = sizes[1];
  imgDiv.innerHTML = '<img src="'+IMG.src+'" lowsrc="http://www.kingswaytransport.com/Images/wait.gif" qrro_checked="1" />';
  imgDiv.style.position = 'fixed';

  imgDiv.firstChild.setAttribute('oh', oh);
  imgDiv.firstChild.setAttribute('ow', ow);
  imgDiv.firstChild.setAttribute('width', w);
  imgDiv.firstChild.setAttribute('height', h);

  if (typeof(e) == 'object')
  {
    var pictop = e.clientY;
    var picleft = e.clientX;
    if (pictop +h > window.innerHeight)
      pictop = window.innerHeight -h;
    if (picleft +w > window.innerWidth)
      picleft = window.innerWidth -w;
    imgDiv.style.top = String(pictop +4)+'px';
    imgDiv.style.left = String(picleft +4)+'px';
    imgDiv.style.zIndex = '1000';
    document.body.appendChild(imgDiv);
  }
}

function OnImageClick(e)
{
  imgDiv.removeAttribute('pinned');
  imgDiv.style.height = '';
  imgDiv.style.width = '';
  imgDiv.style.overflow= 'hidden';
  
  DoMouseLeaveDelayed();
  return false;
}

function DoMouseLeaveDelayed()
{
  if (imgDiv.hasAttribute('pinned') && (imgDiv.getAttribute('pinned') == 'true'))
  {
    return false;
  }
  else
    document.body.removeChild(imgDiv);
}

function OnMouseLeave(e)
{
 setTimeout(DoMouseLeaveDelayed, 50);
}

var newHR = GetImageUrl(location.href);
if ((newHR != '') && (newHR != null) && (newHR != location.href))
  window.location = newHR;

function OnImageLoaded(imgTag, ParTag)
{
  if ((imgTag.width<40) || (imgTag.height<40))
    return;

  sizes = CalcThumbSize(imgTag.width, imgTag.height, 200, 150);
  imgTag.width = sizes[0];
  imgTag.height = sizes[1];
  imgTag.style.cssText = 'width: '+sizes[0]+'px; height: '+sizes[1]+'px; ';
  ParTag.innerHTML = '';
  ParTag.appendChild(imgTag);

  var hint = ParseUrl(imgTag.src, 'host');
  if (hint.split('.').length > 2) 
  {
    var ha = hint.split('.');
    hint = ha[ha.length -2]+'.'+ha[ha.length -1];

    var srvImg = document.createElement('img');
    srvImg.src = 'http://'+hint +'/favicon.ico';
    srvImg.setAttribute('qrro_checked', '1');
    ParTag.appendChild(srvImg);
  }

//  {
//    var inImg = imgTag;
//    var style = 'background-image:url('+imgTag.src+'); display: inline-block;';
//    ParTag.innerHTML = '<table style="'+style+'" width="'+sizes[0]+'" height="'+sizes[1]+'" cellspacing="0" ><tr valign="top" align="left"><td>'
//                           sizes[0]+'x'+sizes[1]+'<a href="http://yandex.ru"><img style="background:#777;padding: 1px;" src="http://'+hint +'/favicon.ico" />_</a>'
//                           +'</td><tr></table>';
//    inImg.onclick = OnClickHandler;
//    inImg.onmouseout = OnMouseLeave;
//    inImg.onmousemove = OnMouseEnter;
//    inImg.onmousedown = OnMouseClick;
//  }
}

function findParentTag(aElement, tagName)
{
  var anode = aElement;
  var aName = aElement.nodeName;
  while ((anode.nodeName.toLowerCase() != tagName) && (anode != document.documentElement))
  {
    anode = anode.parentNode;
    aName = anode.nodeName +'\\'+ aName;
  }
  if (anode != document.documentElement)
  if (anode.nodeName.toLowerCase() == tagName)
  {
    return anode;
  }
  return null;
}

function CheckImages()
{
//    all[i].text.replaceAll("(.*://.*)", "<a href=\"$1\">$</a>");

  var imgExt = ExtractFileExt(document.location.href);

  if (!(( imgExt == '.jpg')||(imgExt == '.jpeg')||(imgExt == '.png')||(imgExt == '.gif')))
  {
    var imgs = document.getElementsByTagName('img');
    for (var i = imgs.length -1; i>=0; i--)
    if (! imgs[i].hasAttribute('qrro_checked'))
    {
      if ((findParentTag(imgs[i], 'a') == null)&& (imgs[i].height>40)&&(imgs[i].width>40))
      {
        imgs[i].outerHTML = '<a href="'+imgs[i].src+'"><img src="'+imgs[i].src+'" title="'+imgs[i].title+'"/></a>';
      }
      imgs[i].setAttribute('qrro_checked', '1');
    }  
  }

  var hrefs = document.getElementsByTagName('a');

  for (var i=0;i<hrefs.length; i++)
  if (!hrefs[i].hasAttribute('qrro_checked'))
  {
   hrefs[i].setAttribute('qrro_checked', '1');
   var origHr = hrefs[i].href;
   var imgHR = GetImageUrl(origHr);
   var imgExt = ExtractFileExt(hrefs[i].href);

   if ((imgHR == '') && (( imgExt == '.jpg')||(imgExt == '.jpeg')||(imgExt == '.png')||(imgExt == '.gif'))) 
     imgHR = hrefs[i].href;

   if (imgHR != '')
   {
     hrefs[i].href = imgHR;

     var inImg = null;
     var sizes = [];

     if (hrefs[i].getElementsByTagName('img').length == 1)
     {
       inImg = hrefs[i].getElementsByTagName('img')[0];
       inImg.setAttribute('qrro_checked', '1');
       OnImageLoaded(inImg, hrefs[i]);
     }

     if (hrefs[i].getElementsByTagName('img').length == 0)
     {
       inImg = document.createElement('img');
       inImg.setAttribute('qrro_checked', '1');
       inImg.src = imgHR;
       inImg.title = hrefs[i].title;
       inImg.setAttribute("Owner", window.allHrefs.length);
       window.allHrefs.push(hrefs[i]);
       inImg.onload = function()
       {
         OnImageLoaded(this, window.allHrefs[this.getAttribute("Owner")]); 
       };
     };

     hrefs[i].onclick = OnClickHandler;
     hrefs[i].onmouseout = OnMouseLeave;
     hrefs[i].onmousemove = OnMouseEnter;
//     hrefs[i].onmousedown = OnMouseClick;
     hrefs[i].onmouseover = OnMouseEnter;
   } 
  }
}


setInterval(CheckImages, 3000);
CheckImages();