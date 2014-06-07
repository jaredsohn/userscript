    // ==UserScript==
    // @name           ExSauce
    // @namespace      hurfdurf
    // @version        2.0
    // @include        http://boards.4chan.org/*
    // @include        https://boards.4chan.org/*
    // ==/UserScript==
     
    // Original from http://pastebin.com/TTDJNH7c
    // Modified by /a/nonymous
    // Thanks to 4chan SS for helping me figure this shit out.
    // No thanks to 4chan SS for making it hard by using jQuery!
    // Works with the new 4chan HTML.
     
    function addLinks(x) {
            setTimeout(function()
                    {
                        var targets = x.querySelectorAll('a[class=fileThumb], a[class="fileThumb imgspoiler"]');
                                            for (var i=0;i<targets.length;i++)
                        {
                            var node = targets[i].previousSibling;
                            var a = document.createElement('a');
                                                    a.innerHTML = 'exhentai';
                                                    a.href = targets[i].href;
                                                    a.addEventListener('click',fetchImage,false);
                            node.appendChild(document.createTextNode(" "));
                                                    node.appendChild(a);
                        };
                    }, 10);
    }
     
    function fetchImage(e) {
            if (e.which !== 1) return;
            e.preventDefault();
            var a = e.target;
            a.textContent = 'loading';
            GM_xmlhttpRequest(
                    {
                        method: "GET",
                        url: a.href,
                        overrideMimeType: "text/plain; charset=x-user-defined",
                        headers: { "Content-Type": "image/jpeg" },
                        onload: function(x) { checkTitles(a, x.responseText); }
                    });
    }
     
    function checkTitles(anchor,data) {
            var hash = sha1Hash(data_string(data));
            anchor.innerHTML = 'checking';
            var div = document.createElement('div');
            div.className = 'exPopup';
            div.id = 'ex' + hash;
            div.style.display = 'none';
            anchor.href = 'http://exhentai.org/?f_shash=' + hash + '&fs_similar=1&fs_exp=1';
            anchor.removeEventListener('click',fetchImage,false);
            document.body.appendChild(div);
            GM_xmlhttpRequest({
                    method:'GET',
                    url:anchor.href,
                    onload:function(x) {
                   
                            var temp = document.createElement('div');
                            temp.innerHTML = x.responseText;
                            var results = temp.querySelectorAll('div.it3 > a:not([rel="nofollow"]), div.itd2 > a:not([rel="nofollow"])');
                            var MAX = results.length;
                           
                            target = document.getElementById('ex' + hash);
                           
                            for (var i=0;i<MAX;i++) {
                                    target.appendChild(document.createTextNode(results[i].innerHTML));
                                    if (i<results.length-1) target.appendChild(document.createElement('br'));
                            }
                            anchor.innerHTML = 'found: ' + MAX;
                            anchor.setAttribute('target','_blank');
                            if (results.length) {
                                    anchor.addEventListener('mouseover',function(e) { document.getElementById('ex' + hash).style.display = null; },false);
                                    anchor.addEventListener('mousemove',function(e) { var target = document.getElementById('ex' + hash); target.style.left = (e.clientX+50) + 'px'; target.style.top = (e.clientY+10) + 'px'; },false);
                                    anchor.addEventListener('mouseout',function() { document.getElementById('ex' + hash).style.display = 'none'; },false);
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
                    for (var i = 0; i < N; i++)
                    {
                        M[i] = new Array(16);
                        for (var j = 0; j < 16; j++)
                            M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) |
                                      (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
                    }
                   
                    M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
                    M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;
     
                    var H0 = 0x67452301;
                    var H1 = 0xefcdab89;
                    var H2 = 0x98badcfe;
                    var H3 = 0x10325476;
                    var H4 = 0xc3d2e1f0;
     
                    var W = new Array(80);
                                    var a, b, c, d, e;
                    for (var i = 0; i < N; i++)
                    {
                        for (var t = 0; t < 16; t++)
                            W[t] = M[i][t];
                           
                        for (var t = 16; t < 80; t++)
                            W[t] = ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);
                           
                        a = H0;
                                            b = H1;
                                            c = H2;
                                            d = H3;
                                            e = H4;
                                           
                        for (var t = 0; t < 80; t++)
                        {
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
    document.addEventListener('DOMNodeInserted',function(e) { if (e.target.nodeName == 'DIV') addLinks(e.target); },false);
