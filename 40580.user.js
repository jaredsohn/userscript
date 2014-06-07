// ==UserScript==
// @name           Amazon Urayasu Library
// @namespace      http://straitmouth.jp
// @description    Make a link between Urayasu Public Library and Amazon.co.jp
// @include        http://*.amazon.co.jp/*
// @include        http://opac.city.urayasu.chiba.jp/opw/OPW/*
// @include        https://opac.city.urayasu.chiba.jp/opw/OPW/*
// ==/UserScript==

if(window != top) return;

if (location.hostname == 'opac.city.urayasu.chiba.jp')
    u2a();
else
    a2u();

function a2u() {
    var asin = document.getElementById('ASIN').value;
    if (!asin) return;
    if (document.getElementById('storeID').value != 'books') return;

    var U_ROOT = 'http://opac.city.urayasu.chiba.jp/opw/OPW/';
    var httpobj = {
	method: 'GET',
	url: U_ROOT + 'OPWSRCHLIST.CSP?DB=LIB&FLG=SEARCH&PID2=OPWSRCH2&MODE=1'
	    + '&opr(1)=OR&qual(1)=IB&text(1)=' + asin,
	onload: function(req) {
	    if (req.responseText.match(/(OPWSRCHTYPE.CSP.*?)\'>/)) {
		var ele = document.createElement('a');
		ele.setAttribute('href', U_ROOT + RegExp.lastParen);
		ele.innerHTML = '\u6d66\u5b89\u56f3\u66f8\u9928\u3067\u30c1\u30a7\u30c3\u30af';
	    } else {
		var ele = document.createElement('span');
		ele.innerHTML = '\u6d66\u5b89\u56f3\u66f8\u9928\u3067\u306f\u307f\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f';
	    }
	    var div = document.getElementById('btAsinTitle').parentNode.parentNode;
	    div.insertBefore(ele, div.lastChild.previousSibling);
	}
    };

    GM_xmlhttpRequest(httpobj);
}

function u2a() {
    var bs = document.getElementsByTagName('b');
    for (var i=0; i<bs.length; i++) {
	if (bs[i].innerHTML == 'ISBN') {
	    var A_ROOT = 'http://www.amazon.co.jp/o/ASIN/';
	    var isbn_node = bs[i].parentNode.parentNode.nextSibling;
	    var isbn = isbn_node.innerHTML.replace('-', '', 'g');
	    
	    if (isbn.length == 13) {
		var asin = isbn.substr(3, 9);
		var checkdigit = 0
		for(var j=0; j<asin.length; j++)
		    checkdigit += parseInt(asin[j]) * (10 - j)
		checkdigit = (11 - checkdigit % 11) % 10;
		if (checkdigit == 0)
		    asin = asin + 'X';
		else
		    asin = asin + String(checkdigit);
	    } else
		var asin = isbn;

	    var anc = document.createElement('a');
	    anc.setAttribute('href', A_ROOT + asin);
	    anc.style.marginLeft = '10px';
	    anc.innerHTML = 'Amazon.co.jp\u3067\u30c1\u30a7\u30c3\u30af';
	    isbn_node.appendChild(anc);
	    break
	}
    }

    


    if (document.getElementsByName('call')) {
	var ops = document.getElementsByName('call')[0].getElementsByTagName('option');
	for (var i=0; i<ops.length; i++) {
	    if (ops[i].value == '2') {
		ops[i].setAttribute('selected', 'selected');
	    } else {
		ops[i].removeAttribute('selected');
	    }
	}
    }

}