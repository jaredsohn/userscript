// ==UserScript==
// @name           4chan Restyled
// @author         bob23646
// @namespace      http://bob23646.deviantart.com/
// @description    enhances header, centers post area, removes posting rules, removes footer, fixes post numbers, shows gets
// @include        http*://boards.4chan.org/*
// ==/UserScript==

(function() {
var css = "#navtopr { display: none !important; }\n #navtop { font-size: 9 !important; float: center !important; }\n #footer { display: none !important; }\n #navbot { display: none !important; }\n .postarea form div { border: none !important; }\n div.postarea { padding: 0 !important; }\n td.rules { display: none !important; }\n td.postblock { vertical-align: top !important; }\n input, textarea { border: #aaa 1px solid !important; margin-right: 2px !important; }\n textarea { height: 10em !important; width: 30em !important; }\n .bf, a[href*=\"affiliates.jlist.com\"], img[src*=\"http://static.4chan.org/support/\" { display: none !important; }\n";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

(function() {
posts = document.getElementsByClassName('quotejs');
for(var i in posts) {
	if (posts[i].href.split('\'')[1] != undefined && location.href.split('/').length != 4) {
		posts[i].innerHTML = posts[i].href.split('\'')[1];
	}
	else if(posts[i].href.split('#q')[1] != undefined){
		posts[i].innerHTML = posts[i].href.split('#q')[1]; 
	}
        postarray = posts[i].innerHTML.split('').reverse();
        get = 0
        last = postarray[0];
        for(var letter in postarray) {
              if (postarray[letter] == last) {
                     get = get + 1;
              }
              else break;
              last = postarray[letter];
        }
        if (get > 1) {
              posts[i].innerHTML = posts[i].innerHTML + '<span style="font-size:' + get * 70 + '%;">' + ' - ' + get + ' get</span>';
        }
}
})();