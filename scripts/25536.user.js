// ==UserScript==
// @name              ChinaUnix V-POST
// @namespace     http://bbs.chinaunix.net/
// @description     change the post to vertical
// @include           http://*.chinaunix.net/*
// ==/UserScript==

var this_key = "chinaunix_vpost";

// ==== Functions ====
function snapshot_query(document, expr, obj) {
  return document.evaluate(expr, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var r = 10;
var c = 18;
var k1 = String.fromCharCode(9484);
var k2 = String.fromCharCode(9472) + String.fromCharCode(9488);
var k3 = String.fromCharCode(9472) + String.fromCharCode(9516);
var k4 = String.fromCharCode(9492);
var k5 = String.fromCharCode(9472) + String.fromCharCode(9496);
var k6 = String.fromCharCode(9472) + String.fromCharCode(9524);
var k7 = String.fromCharCode(9474);
var k8 = String.fromCharCode(9478);
var k9 = String.fromCharCode(12288);

function attachVTransfer(document) {
  unsafeWindow.vtransfer = function(postform) {
        var txt = postform.message.value;
        var tf = function(text) {
            var p = text.length % (r * c) ? parseInt(text.length / (r * c)) + 1 : parseInt(text.length / (r * c));
            text = text.replace(' ', k9);
            text = text.replace('\r\n', '\n');
            text = text.replace('\n\n', '\n');
            var i = 10;
            do {
                var n = text.indexOf('\n');
                if (-1 != n) {
                    if (n%r) {
                        var s = '';
                        for (var i = 0; i < (r - n%r); i++) {
                            s += k9;
                        }
                    }
                    text = text.substr(0, n) + s + text.substr(n+1);
                }
            }while(-1 != n);
        
            var s = sh = sf = '';
            for (var i=0; i<=c; i++) {
                sh += 0 == i? k1 : (c == i ? k2 : k3);
                sf += 0 == i? k4 : (c == i ? k5 : k6);
            }
            for (var i=0; i<p; i++) {
                s += sh + '\n';
                for (var k=0; k<r; k++) {
                    for (var j=0; j<c; j++) {
                        s += 0 == j? k7 : '';
                        var t = text.substr(i * c * r + ((c-1)-j) * r + k, 1);
                        var cc = t.charCodeAt(0);
                        t = cc < 127? String.fromCharCode(cc + 65248) : t;
                        s += t? t : k9;
                        s += c-1 == j? k7 :k8;
                    }
                    s += '\n';
                }
                s += sf + '\n';
            }
            return s;
        }
        postform.message.value = tf(txt);
    };
  var rb = snapshot_query(document, "//form[@id='postform']", document);
  for (var i = 0; i < rb.snapshotLength; i++) {
    rb.snapshotItem(i).setAttribute("onsubmit", "vtransfer(this);");
  }
}

// ==== End Functions ====

attachVTransfer(document)
