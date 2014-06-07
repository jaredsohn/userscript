// ==UserScript==
// @name           Divxplanet'tan cok hizli indir
// @description    Divxplanet'tan cok hizli indirmek icin. Her altyazi icin ayri ayri sayfa acmaya gerek kalmadan cok hizli bir sekilde indirmek icin.Alt yazi linklerinin yanina Download linki ekler.
// 				   Divxplanet'in aldigi onlemlere karsi guncellendi.
// @author         talo pien
//				   @changes: sanilunlu
// @version        1.2
// @include        http://www.divxplanet.com/sub/*
// @include        http://*divxplanet.com/sub/*

// ==/UserScript==

// Special thanks to Nitec

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

if (window.divxCokHizli) return;

window.divxCokHizli = true;

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function encode64(input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + 
         keyStr.charAt(enc3) + keyStr.charAt(enc4);
   } while (i < input.length);
   
   return output;
}

function insertAfter(new_node, existing_node) 
{
if (existing_node.nextSibling) 
	existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);
else 
	existing_node.parentNode.appendChild(new_node);
} 

// These codes was written by Talo Pien
// talopien@gmail.com
//
var suburl = (window.location.href.indexOf('https://') > 0 ? "https://" : "http://") + window.location.host + "/sub/s/";
var downurl= (window.location.href.indexOf('https://') > 0 ? "https://" : "http://") + window.location.host + "/indir.php?id=";
var objects = document.body.getElementsByTagName('A');
for(var no=0;no<objects.length;no++)
{	
	var urlhref=objects[no].href;

    var devam=0;
	if (objects[no].parentNode.nodeName == 'TD' &&
		objects[no].parentNode.getAttribute('align') == 'left' &&
		objects[no].parentNode.getAttribute('valign') == 'top' &&
		objects[no].parentNode.getAttribute('width') == 150) 
	{
		devam=1;
	}
	else
	{
		devam=0;
	}
	
	if (urlhref.substring(0,suburl.length) == suburl && devam==1)
	{
        // Changes by sanilunlu
        var div = document.createElement('div');
        div.innerHTML = '<form action="/indir.php" method="post">' +
            '	<input type="hidden" name="postc" value="">' +
            '	<input type="hidden" name="id" value="">' + 
            '	<input type="image" src="/images/loading.gif" style="border:0">' +
            '</form>';
        div.setAttribute('style', "float: right");
        insertAfter(div, objects[no]);
        GM_xmlhttpRequest({
			method: 'get', 
			url: urlhref, 
			onload: function(resp) {
				var i = resp.responseText.indexOf('name="postc"');
				var str = resp.responseText.substring(i-100,i+100);
                var i1 = str.indexOf('value="');
				var i2 = str.indexOf('"', i1 + 'value="'.length);
				var postc = str.substring(i1 + 'value="'.length, i2);
				var spl = resp.finalUrl.split('/');
				/*var div = document.createElement('div');
				div.innerHTML = '<form action="/indir.php" method="post">' +
					'	<input type="hidden" name="postc" value="' + postc + '">' +
					'	<input type="hidden" name="id" value="' + encode64("DP" + spl[5]) + '">' + 
					'	<input type="image" src="/_img/download.gif" style="border:0">' +
					'</form>';
				div.setAttribute('style', "float: right");*/
                for(var n=0;n<objects.length;n++)
				{
                    if (objects[n].parentNode.nodeName == 'TD' &&
                        objects[n].parentNode.getAttribute('align') == 'left' &&
                        objects[n].parentNode.getAttribute('valign') == 'top' &&
                        objects[n].parentNode.getAttribute('width') == 150) 
                    {
                        var div = objects[n].nextElementSibling;
                        div.firstElementChild.firstElementChild.setAttribute('value', postc);
                        div.firstElementChild.firstElementChild.nextElementSibling.setAttribute('value', encode64("DP" + spl[5]));
                        div.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.setAttribute('src', "/_img/download.gif");
                    }
//					if(objects[n].href == resp.finalUrl)
//						insertAfter(div, objects[n]);
				}
			}
		});
 	}
}
