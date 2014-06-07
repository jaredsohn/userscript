// ==UserScript==
// @name           UKFur UTF-8 Unbreaker
// @author         JGR (Sethvir)
// @namespace      GUID7882FAB0-0976-4ED0-9D4D-CA3480E8C061
// @description    UKFur UTF-8 Unbreaker, Revision: 0, Timestamp: 2011-03-14T21:33:35Z
// @include        http://forum.ukfur.org/index.php*
// ==/UserScript==


var posts=document.body.getElementsByClassName("postcolor");
var content=null;

for (var i = 0; i < posts.length; i++ ) {
	if(!posts[i].innerHTML.match(/\uFFFD/)) continue;
	if(!content) content=load_binary_resource(document.location.href);
	var reg=new RegExp("<div class=\"postcolor\" id='" + posts[i].id + "'>([\\s\\S]*?<!--IBF.ATTACHMENT_[\\s\\S]*?)<\\/div>");
	var binpost=content.match(reg);

	var newpost=binpost[1].replace(/([\uF7C0-\uF7FF][\uF780-\uF7BF]*)<br \/>([\uF780-\uF7BF]+)/g,'$1$2<br />');

	newpost = utf8decode(newpost);

	posts[i].innerHTML=newpost;
}

//https://developer.mozilla.org/en/using_xmlhttprequest#Receiving_binary_data
function load_binary_resource(url) {
  var req = new XMLHttpRequest();
  req.open('GET', url, false);
  //XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com]
  req.overrideMimeType('text/plain; charset=x-user-defined');
  req.send(null);
  if(url.match(/^https?:\/\//) && req.status != 200) return '';
  if(url.match(/^file:\/\//) && req.status != 0) return '';
  return req.responseText;
}

//http://codesnippets.joyent.com/posts/show/1212
function utf8encode(string) {
string = string.replace(/\r\n/g,"\n");
	var utftext = "";

	for (var n=0, k=string.length; n < k; n++) {
	    var c = string.charCodeAt(n);

	    if (c < 128) {
		utftext += String.fromCharCode(c);
	    }
	    else if((c > 127) && (c < 2048)) {
		utftext += String.fromCharCode((c >> 6) | 192);
		utftext += String.fromCharCode((c & 63) | 128);
	    }
	    else {
		utftext += String.fromCharCode((c >> 12) | 224);
		utftext += String.fromCharCode(((c >> 6) & 63) | 128);
		utftext += String.fromCharCode((c & 63) | 128);
	    }
	}
	return utftext;
}

function utf8decode(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
	}
	return string;
}

