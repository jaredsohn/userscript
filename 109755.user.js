// ==UserScript==
// @name           ExSauce
// @namespace      herfdurf & cobaltex
// @icon           http://g.e-hentai.org/favicon.ico
// @include        http://boards.4chan.org/*
// @description    Searches images on ExHentai for 4chan
// ==/UserScript==

function addLinks(x) {
	var targets = x.querySelectorAll('img[md5]');
	for (var i=0;i<targets.length;i++) {
		var a = document.createElement('a'),
			md5 = targets[i].getAttribute('md5').replace(/\+/g,'-');
		a.innerHTML = 'exhentai';
		a.href = targets[i].parentNode.href;
		a.addEventListener('click',fetchImage,false);
		a.style.margin = '0px 3px 0px 3px';
		document.evaluate('preceding-sibling::span[@class="filesize"][1]',targets[i].parentNode,null,9,null).singleNodeValue.appendChild(a);
	}
}

function fetchImage(e) {
	if (e.which != 1) return;
	e.preventDefault();
	this.textContent = 'loading';
	GM_xmlhttpRequest({
		method : 'GET',
		url : this.href,
		data : this,
		overrideMimeType : 'text/plain; charset=x-user-defined',
		headers : { 'Content-Type':'image/jpeg' },
		onload : function(x) { checkTitles(this.data,x.responseText); }
	});
}

function checkTitles(anchor,data) {
	var hash = sha1Hash(data_string(data));
	anchor.innerHTML = 'checking';
	var div = document.createElement('div');
	div.className = 'exPopup';
	div.id = 'ex' + hash;
	div.style.display = 'none';
	anchor.href = 'http://exhentai.org/?f_shash=' + hash + '&fs_similar=1';
	anchor.removeEventListener('click',fetchImage,false);
	document.body.appendChild(div);
	GM_xmlhttpRequest({
		method:'GET',
		url:anchor.href,
		data:anchor,
		onload:function(x) {
			var temp = document.createElement('div'), target,
				target = document.getElementById('ex' + this.data.href.match(/f_shash=([^&]+)/)[1]);
			temp.innerHTML = x.responseText;
			var results = temp.querySelectorAll('div.it3 > a:not([rel="nofollow"]), div.itd2 > a:not([rel="nofollow"])');
			for (var i=0;i<results.length;i++) {
				target.appendChild(document.createTextNode(results[i].innerHTML));
				if (i<results.length-1) target.appendChild(document.createElement('br'));
			}
			anchor.innerHTML = 'found: ' + results.length;
			if (results.length) {
				anchor.addEventListener('mouseover',function(e) { document.getElementById('ex' + this.href.match(/f_shash=([^&]+)/)[1]).style.display = null; },false);
				anchor.addEventListener('mousemove',function(e) { var target = document.getElementById('ex' + this.href.match(/f_shash=([^&]+)/)[1]); target.style.left = (e.clientX+50) + 'px'; target.style.top = (e.clientY+10) + 'px'; },false);
				anchor.addEventListener('mouseout',function() { document.getElementById('ex' + this.href.match(/f_shash=([^&]+)/)[1]).style.display = 'none'; },false);
			}
		}
	});
}

// ----------

function data_string(data) {
        var data_string='';
        for (var i=0,il=data.length;i<il;i++) data_string+=String.fromCharCode(data[i].charCodeAt(0)&0xff);
        return data_string;
}


function sha1Hash(msg) {
    var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
    msg += String.fromCharCode(0x80);
    var l = msg.length/4 + 2;
    var N = Math.ceil(l/16);
    var M = new Array(N);
    for (var i=0; i<N; i++) {
        M[i] = new Array(16);
        for (var j=0; j<16; j++) {
            M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) |
                      (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
        }
    }
	
    M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
    M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;

    var H0 = 0x67452301;
    var H1 = 0xefcdab89;
    var H2 = 0x98badcfe;
    var H3 = 0x10325476;
    var H4 = 0xc3d2e1f0;

    var W = new Array(80); var a, b, c, d, e;
    for (var i=0; i<N; i++) {
        for (var t=0;  t<16; t++) W[t] = M[i][t];
        for (var t=16; t<80; t++) W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);
        a = H0; b = H1; c = H2; d = H3; e = H4;
        for (var t=0; t<80; t++) {
            var s = Math.floor(t/20);
            var T = (ROTL(a,5) + f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
            e = d;
            d = c;
            c = ROTL(b, 30);
            b = a;
            a = T;
       	}
        H0 = (H0+a) & 0xffffffff;
        H1 = (H1+b) & 0xffffffff;
        H2 = (H2+c) & 0xffffffff;
        H3 = (H3+d) & 0xffffffff;
        H4 = (H4+e) & 0xffffffff;
    }
    return H0.toHexStr() + H1.toHexStr() + H2.toHexStr() + H3.toHexStr() + H4.toHexStr();
}

function f(s, x, y, z) {
    switch (s) {
		case 0: return (x & y) ^ (~x & z);
		case 1: return x ^ y ^ z;
		case 2: return (x & y) ^ (x & z) ^ (y & z);
		case 3: return x ^ y ^ z;
    }
}

function ROTL(x, n) {
    return (x<<n) | (x>>>(32-n));
}

Number.prototype.toHexStr = function() {
    var s="", v;
    for (var i=7; i>=0; i--) { v = (this>>>(i*4)) & 0xf; s += v.toString(16); }
    return s;
}

// ----------


var style = document.createElement('style');
style.innerHTML = '.exPopup { position: fixed; background: white; padding: 5px; border: 1px black solid; color: black; }';
document.head.appendChild(style);

addLinks(document);
document.addEventListener('DOMNodeInserted',function(e) { if (e.target.nodeName == 'TABLE') addLinks(e.target); },false);