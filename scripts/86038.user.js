// ==UserScript==
// @name           Download Songs from Project Playlist
// @namespace      sizzlemctwizzle | Ron Troyer
// @description    This script allows you to download ALL SONGS on playlist.com and has been updated to work with the latest update of the site.
// @version        2.3.0
// @require        http://sizzlemctwizzle.com/updater.php?id=75716
// @include        http://*.playlist.com/*
// ==/UserScript==

function getSongs() {
  var visitLinks = $x('//a[@class="visit-site-url"]', $('results'));
  forEach($x('//li[starts-with(@id, "tracklink-") and not(@decrypted)]', $('results')), function(li, i) {
    sbox = new Array(255);
    mykey = new Array(255);
    insertAfter(create('a', { href: decrypt(unsafeWindow.PPL.search.trackdata[i].song_url, 'sdf883jsdf22'), 
                              innerHTML: "Download song",
                              className: "a.visit-site-url"
                            }
                      ), visitLinks.snapshotItem(i));
    li.setAttribute('decrypted', 'true');
  });
}

function $(element) { return document.getElementById(element); }
function $c(element) { return document.getElementsByClassName(element); }

function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling) }
function create(A, B, C) {
	if (!B) 
		A = document.createTextNode(A);
	else {
		A = document.createElement(A);
		for (var b in B) {
			if (b.indexOf("on") == 0)
				A.addEventListener(b.substring(2), B[b], false);
			else if (b == "style")
				A.setAttribute(b, B[b]);
			else
				A[b] = B[b];
		}
		if (C) 
			for(var i = 0, len = C.length; i<len; i++)
				A.appendChild(C[i]);
	}
	return A;
}
function forEach(lst, cb) {
    if (lst.snapshotItem) {
        var i = 0, len = lst.snapshotLength;
        while (i < len) 
            cb(lst.snapshotItem(i), i++, lst);
    }
    else if (lst.iterateNext) {
        var item;
        while (item = lst.iterateNext()) 
            cb(item, lst);
    }
    else if (lst.forEach) 
        lst.forEach(cb);
    else if (lst.length && typeof lst === 'object') 
        Array.forEach(lst, cb);
    else if (typeof lst === 'object')
        for (var i in lst) cb(lst[i], i, lst);
    else 
        return false;
}
function $x(x, t, r) {
    if (t && t.nodeType) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case 1:
        p = 'numberValue';
        break;
    case 2:
        p = 'stringValue';
        break;
    case 3:
        p = 'booleanValue';
        break;
    case 8: case 9:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || 6, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}

function hexToChars (hex) {
          var a = new Array();
          var b = (hex.substr(0, 2) == '0x') ? 2 : 0;
          while (b < hex.length) {
            a.push(parseInt(hex.substr(b, 2), 16));
            b += 2;
          }
          return a;
}

function charsToStr (chars) {
          var a = '';
          var b = 0;
          while (b < chars.length) {
            a += String.fromCharCode(chars[b]);
            ++b;
          }
          return a;
}

function strToChars (str) {
          var a = new Array();
          var b = 0;
          while (b < str.length) {
            a.push(str.charCodeAt(b));
            ++b;
          }
          return a;
}

function initialize (pwd) {
          var a = 0;
          var b;
          var c = pwd.length;
          var d = 0;
          while (d <= 255) {
            mykey[d] = pwd[d % c];
            sbox[d] = d;
            ++d;
          }
          d = 0;
          while (d <= 255) {
            a = (a + sbox[d] + mykey[d]) % 256;
            b = sbox[d];
            sbox[d] = sbox[a];
            sbox[a] = b;
            ++d;
          }
}

function calculate (plaintxt, psw) {
          initialize(psw);
          var a = 0;
          var b = 0;
          var c = new Array();
          var d;
          var e;
          var f;
          var g = 0;
          while (g < plaintxt.length) {
            a = (a + 1) % 256;
            b = (b + sbox[a]) % 256;
            e = sbox[a];
            sbox[a] = this.sbox[b];
            sbox[b] = e;
            var h = (sbox[a] + sbox[b]) % 256;
            d = sbox[h];
            f = plaintxt[g] ^ d;
            c.push(f);
            ++g;
          }
          return c;
}

function decrypt(src, key) {
          var plaintxt = hexToChars(src);
          var psw = strToChars(key);
          var chars = calculate(plaintxt, psw);
          return charsToStr(chars);
}

function process() {
   $('searchResultsColumn').removeEventListener('DOMNodeInserted', process, false);
   var checker=setInterval(function(){
      if(unsafeWindow.PPL.search.trackdata.length && $('loadingModal').getAttribute('style').match(/display: none;/)) {
        clearInterval(checker);
        getSongs();
        $('searchResultsColumn').addEventListener("DOMNodeInserted", process, false);
      }
    },200);
}

if(typeof unsafeWindow==='undefined') unsafeWindow = window;
var checker=setInterval(function(){
        if(unsafeWindow.PPL) {
            clearInterval(checker);
            process();
        }
},200);


/***Playlist section***/
addCSSRule = function (css) {
	target=document;
	var heads = target.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = target.createElement("style");
		node.type = "text/css";
		node.appendChild(target.createTextNode(css));
		heads[0].appendChild(node); 
	}
}

if (myPlaylists = $c('playlist-links')) {
	addCSSRule('ul.playlist-links li {width: 154px;}');
	for (i=0;i<myPlaylists.length;i++) {
		playlistID = myPlaylists[i].childNodes[1].childNodes[0].href;
		playlistID = playlistID.match(/[\d]+/)[0];
		var node=document.createElement('li');
		node.innerHTML = '<a href="javascript:">Download Playlist</a>';
		node.id = playlistID;
		node.addEventListener('click',function () {
			getPlaylist(this.id,this.parentNode);
		},false);
		myPlaylists[i].appendChild(node);
	}
}

function getPlaylist(playlistID,el) {
	GM_xmlhttpRequest ({
		method: "GET",
		url: 'http://pl.playlist.com/pl.php?e=1&playlist='+playlistID,
		headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"},
		onload: function (response) {
			myXML = response.responseText;
			myLocations = myXML.match(/\<location\>.*?\<\/location\>/g);
			myAnnotations = myXML.match(/\<annotation\>.*?\<\/annotation\>/g);
			
			myString = '';
			for (i=0;i<myLocations.length;i++) {
				sbox = new Array(255);
				mykey = new Array(255);
				myString += '<a href="';
				myString += decrypt(myLocations[i].replace(/\<.*?\>/g,''), 'sdf883jsdf22');
				myString += '">' + myAnnotations[i].replace(/\<.*?\>/g,'') + '</a><br/>';
			}
			
			el.style.display = 'none';
			var node=document.createElement('ul');
			node.className = 'playlist-links clearfix';
			el.parentNode.insertBefore(node,el);
			
			var nodeli=document.createElement('li');
			nodeli.style.width = '100%';
			nodeli.style.textAlign = 'right';
			nodeli.style.backgroundColor = '#222';
			nodeli.className = playlistID;
			nodeli.innerHTML = '<span style="padding: 15px;"><a href="javascript:">Close This Playlist</a></span>';
			nodeli.addEventListener('click',function () {
				document.getElementById(this.className).parentNode.style.display = 'block';
				this.parentNode.style.display = 'none';
			},false);
			node.appendChild(nodeli);
			
			var nodeli=document.createElement('li');
			nodeli.style.width = '100%';
			nodeli.style.height = '200px';
			nodeli.style.textAlign = 'left';
			nodeli.style.overflowY = 'auto';
			nodeli.innerHTML = '<div style="padding:15px;">' + myString + '</div>';
			node.appendChild(nodeli);
		}
	});
}