// ==UserScript==
// @name           Lohere négycsan
// @namespace   nem mindegy?
// @description    Lohere négycsan dinamikus featúrapakolt szkript
// @include        http://lohere.net/*
// ==/UserScript==

/* LICENSE * KOMOLY ÜZLET */

// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.


//szaros opera kompatibilitas
if (typeof GM_addStyle === 'undefined') {
    window.GM_addStyle = function(css) {
      var style;
      style = document.createElement('style');
      style.type = 'text/css';
      style.textContent = css;
      return document.getElementsByTagName('head')[0].appendChild(style);
    };
}

GM_addStyle("\
	body {\
	  background-color: #eef2ff !important;\
	  background-image: none !important;\
	  color: #000 !important;\
	  font-size: 10pt !important;\
	  font-family: arial !important;\
	}");

GM_addStyle("\
	.top {\
	  background-color: #eef2ff !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");
	
GM_addStyle("\
	.box {\
	  background-color: #eef2ff !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");


GM_addStyle("\
	.namebutton {\
	  background-color: #eef2ff !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.side {\
	  background-color: #eef2ff !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.corner {\
	  display: none !important;\
	  background-color: #eef2ff !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.bottom {\
	  background-color: #eef2ff !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.bottomback {\
	  background-color: #eef2ff !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.bottomboardlist {\
	  background-color: #eef2ff !important;\
	  background-image: none !important;\
	  color: #34345c !important;\
	  font-size: 10pt !important;\
	  font-family: arial !important;\
	}");

GM_addStyle("\
	.bottomboardlist a.h {\
	  color: #34345c !important;\
	  font-size: 10pt !important;\
	  font-family: arial !important;\
	}");

GM_addStyle("\
	h2 {\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	h4 {\
	  color: #34345c !important;\
	  font-size: 10pt !important;\
	  font-family: arial !important;\
	}");

GM_addStyle("\
	h5 a {\
	  color: #34345c !important;\
	  font-size: 10pt !important;\
	  font-family: arial !important;\
	}");
	
GM_addStyle("\
	.kerdojel {\
	  padding-left: 20px !important;\
	}");	
	
GM_addStyle("\
	h6 {\
	  color: #000000 !important;\
	}");
	
GM_addStyle("\
	h1 {\
	  color: #dd0000 !important;\
	}");
	
GM_addStyle("\
	.rmain {\
	  background-color: #d6daf0 !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.rmain a {\
	  color: #dd0000 !important;\
	  text-decoration: none !important;\
	}");

GM_addStyle("\
	.rtm {\
	  background-color: #d6daf0 !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.rtl {\
	  background-color: #d6daf0 !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.rtr {\
	  background-color: #d6daf0 !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.rml {\
	  background-color: #d6daf0 !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.rmr {\
	  background-color: #d6daf0 !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.rbm {\
	  background-color: #d6daf0 !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.rbl {\
	  background-color: #d6daf0 !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");

GM_addStyle("\
	.rbr {\
	  background-color: #d6daf0 !important;\
	  background-image: none !important;\
	  color: #000000 !important;\
	}");


// Header-ben nev zoldre szinezese
var namefieldXPE = '//td[@class="rtm"]';
var results = document.evaluate(namefieldXPE,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < results.snapshotLength; i++) {
	var result = results.snapshotItem(i);

	var namefield = result.innerHTML;
	var nfTime = namefield.slice(-14);
	var nfName = namefield.slice(0,-14);

	nfName = '<span style="color:#117743;font-weight:bold;">' + nfName + '</span>';
	namefield = nfName + nfTime;
	result.innerHTML = namefield;
}

//Posztok kozti ter
var rbrXPE = '//table[tbody[tr[td[@class="rtl"]]]]';
results = document.evaluate(rbrXPE,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < results.snapshotLength; i++) {
	var result = results.snapshotItem(i);
	
	var sepdiv = document.createElement("div");
	sepdiv.setAttribute("id","sepdiv");
	sepdiv.setAttribute("style","margin-bottom:5px");
	result.appendChild(sepdiv);
}

//>implying this will make greentext work
var namefieldXPE = '//td[@class="rmain"]';
var results = document.evaluate(namefieldXPE,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < results.snapshotLength; i++) {
	var result = results.snapshotItem(i);
	var reply = result.innerHTML;

	var gtcount = reply.match(/(^.|br>.|<.a>.)&gt;/gmi);
	if (gtcount != null) {
	for (var j = 0; j < gtcount.length + 1; j++) {
		var gtpos = reply.search(/(^.|br>.|<.a>.)&gt;/gmi);
		var reply1 = reply.slice(0,gtpos); 
		var reply2 = reply.slice(gtpos);
		var brpos = reply2.search(/<br>/gmi);
		var reply3 = reply2.slice(brpos);
		reply2 = reply2.slice(0,brpos);
		reply = reply1 + '<span style="color:#789922">' + reply2 + '</span>' + reply3;
		
	}
	}
	
	result.innerHTML = reply;
}

//no comment