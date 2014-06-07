// ==UserScript==
// @name           Torrenty.org
// @namespace      torrenty.org.user.js
// @description    Torrenty.org magnetizer
// @include        http://torrenty.org/torrent/*
// @include        http://www.tnp.net.pl/torrent*
// @include		   http://www.elitetorrent.pl/details.php*
// @include        http://torrent-spider.pl/torrent/*
// ==/UserScript==
function hash2magnet(hash)
{
 hash = hash.toLowerCase();

 var znaki = '0123456789abcdef';
 var noweznaki = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

 var dl = hash.length;
 var ret = '';
 var t = new Array();

 for (i=0; i<dl; i++)
 {
  t[i] = znaki.indexOf(hash.substr(i,1));
 }

 do
 {
  var d = 0;
  var ndl = 0;
  for (i=0; i<dl; i++)
  {
   d = d * 16 + t[i];
   if (d>=32)
   {
    t[ndl] = Math.floor(d/32);
    ndl++;
    d = d%32;
   }
   else if (ndl>0)
   {
    t[ndl] = 0;
    ndl++;
   }
  }
  dl = ndl;
  ret = noweznaki.substr(d,1) + ret;
 }
 while (ndl != 0);

 dl = ret.length;
 while (dl<32)
 {
  ret = 'A'+ret;
  dl++;
 }

 return 'magnet:?xt=urn:btih:' + ret;
}

function post(url, data, cb) {
 GM_xmlhttpRequest({
 method: "POST",
 url: url,
 headers:{'Content-type':'application/x-www-form-urlencoded'},
 data:encodeURI(data),
 onload: function(xhr) { cb(xhr.responseText); }
}); 
}

if (document.domain=='torrenty.org')
{
	var pattern='pobierz.php?id=';
	var opis=document.getElementsByClassName('kom_h')[0];
	var tor=opis.innerHTML.indexOf(pattern);
	var url=opis.innerHTML.substring(tor+15,tor+55);
}
else if (document.domain=='www.tnp.net.pl')
{
	var pattern='/dl,';
	var opis=document.getElementsByClassName('details')[0];
	var tor=opis.innerHTML.indexOf(pattern);
	var url=opis.innerHTML.substring(tor+4,tor+44);
}
else if (document.domain=='www.elitetorrent.pl')
{
	var pattern='?id=';
	var opis=document.getElementById('staty');
	var tor=document.location.href.indexOf(pattern);
	var url=document.location.href.substring(tor+4,tor+44);	
}
else if (document.domain=='torrent-spider.pl')
{
	var pattern='url=';
	var opis=document.getElementsByClassName('dzial')[0];
	var url=opis.childNodes[34].href;	
	var remote=true;
}

if(remote)
{
console.log('r');
opis.innerHTML+='<ul><li><a href="#" id="magnet" style="font-weight: bold;">Pobieram magnet...</a></li></ul>';
post('http://torrent.centrump2p.com/magnet/', 'hash='+url, function(text) {
		document.getElementById('magnet').href=text.substring(text.indexOf('magnet:?'),text.indexOf('magnet:?')+52);
		document.getElementById('magnet').innerHTML='Magnet Link';
		alert(text);
	}); 
}
else
{
opis.innerHTML+='<ul><li><a href="'+hash2magnet(url)+'" id="magnet" style="font-weight: bold;">Magnet Link</a></li></ul>';
}

