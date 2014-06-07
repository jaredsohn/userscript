// ==UserScript==
// @name           xrel.to Search Engine Integration
// @namespace      http://example.net/xreltocollectr/
// @description    Dieses Addon fügt bei XRel.to die passende Symbolic hinzu, um direkt zum Download zu gelangen.
// @include        http://www.xrel.to/*
// @include        http://xrel.to/*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==
// autor: One C
// version: 1.1
// requires Greasemonkey 0.8.20100408.6
// 
// changelog:
//  - 1.1: wsearch.in hinzugefügt | collectr.net entfernt
//  - 1.0: SDX.cc, Collectr.net und Movie-Blog.org hinzugefügt.

/////////////////////////////////////////
// settings
/////////////////////////////////////////
var searchEngines = new Array();

// sdx.cc
newEngine = new Object();
newEngine["title"] = "sdx.cc";
newEngine["baseUrl"] = "http://www.sdx.cc/infusions/pro_download_panel/search.php?stext=%s";
newEngine["icon"] = "data:image/png;base64,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%3D%3D";
newEngine["active"] = true;
searchEngines.push(newEngine);


// wsearch.in
newEngine = new Object();
newEngine["title"] = "wsearch.in";
newEngine["baseUrl"] = "http://wsearch.in/search/result/all/%s/";
newEngine["icon"] = "data:image/png;base64,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%3D%3D";
newEngine["active"] = true;
searchEngines.push(newEngine);


// movie-blog.org
newEngine = new Object();
newEngine["title"] = "movie-blog.org";
newEngine["baseUrl"] = "http://www.movie-blog.org/index.php?s=%s";
newEngine["icon"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKBg8xLofp7XoAAAL7SURBVDjLjZPLb1RVAMZ/5865c2fmTgu1M8p0KkgrNrZqtCiaroiJEtyQYmThK3Ghe/8CZYVxoRtMxI2aGFmYmKgxVcpDKaOQFiykCbbQp0OHgXmVmencx7nnuJEEN8bf6su3+K2+T/BvHCAPLN3T5eJxe/T+TGb34MBDT/T350fOX5guLy2vHjEwKQCEEPtyudyBsbGxZ3N9fUOfHD162HXd6p6nRw8ODz+6Z1tffxanm1ZgseELrpfusHDprFqZmRiVAOPj48c+PfbZjmymF4DhoV0ftn1FILtYqYRM3VQ0Ng2BFiAsEqkHSeVGJEwMSYDtOwfsbKaXxbUip385x+Wy4Ppti4bfwQgbgQ0mQloAGh1sYrtbsGR8UAIIGbc2lOLwx59ztZ4G2wUjAYWFQiBAGEBgb+kh3pMluNbCTnbttAC8MNRKxJCpLkLhoPwOkfKJoogwVARhSBCGmGSa+uN7uVNcJTICmejKWQDNZsfXMUG3myT02niBj5NM8Oo7b5DJ9uJ5PtpJ0d79As7MJK16BV9FYCd6JEC93mj7GtJugjC8RahAKUW5WOLQm68w9fssF53tOHMF6sVVDAYRMyBkWgLUapVqywM33Y1WAZu+YX29xNdfHOepZ55k6KWX2bWhWJwN8QIfY0DEQBsRlwDlG8X1+gYk090QhXi+RsYElhDs3fc8hbMnWKn7DL54gK0DjzD/8/eEQYDSkZYA63+t/nmjdJNE2gWj8LwQWwre/+A9pn+7wInvJjBAcW4WS8ZpewHa7xB1mm0J4G02/7h29Qrb8nksNEEQMDzyGCcnTjL50ykQAmPZeLcq4DegthSY6sIp2rc/kv/sfeZS4dfK/tfeykhLQKTRWnNu6jzaioMOoLEG1fllGivforzjwEWAu4LS9JkfTz+3/+ChuONAzOfK3AL4TWgsRVQXztAqfwX8ANTufV/sbmjWKq1E+r7XW8altDwPpZkia4UvqS++S9A+AlwGOvwHlpNKf7M1/3ABeBt4gP/B33UPYZAriBv5AAAAAElFTkSuQmCC";
newEngine["active"] = true;
searchEngines.push(newEngine);

// show the icons in a own Line?
var newLineAfterSearchIcons = false;

/////////////////////////////////////////
// code [do not modify, unless you know what you are doing"]
/////////////////////////////////////////

// urlencode function
function urlencode (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: This reflects PHP 5.3/6.0+ behavior
    // *     example 1: urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
    // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
    // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'
 
    var hexStr = function (dec) {
        return '%' + dec.toString(16).toUpperCase();
    };
 
    var ret = '',
            unreserved = /[\w.-]/; // A-Za-z0-9_.- // Tilde is not here for historical reasons; to preserve it, use rawurlencode instead
    str = (str+'').toString();
 
    for (var i = 0, dl = str.length; i < dl; i++) {
        var ch = str.charAt(i);
        if (unreserved.test(ch)) {
            ret += ch;
        }
        else {
            var code = str.charCodeAt(i);
            // Reserved assumed to be in UTF-8, as in PHP
            if (code === 32) {
                ret += '+'; // %20 in rawurlencode
            }
            else if (code < 128) { // 1 byte
                ret += hexStr(code);
            }
            else if (code >= 128 && code < 2048) { // 2 bytes
                ret += hexStr((code >> 6) | 0xC0);
                ret += hexStr((code & 0x3F) | 0x80);
            }
            else if (code >= 2048 && code < 65536) { // 3 bytes
                ret += hexStr((code >> 12) | 0xE0);
                ret += hexStr(((code >> 6) & 0x3F) | 0x80);
                ret += hexStr((code & 0x3F) | 0x80);
            }
            else if (code >= 65536) { // 4 bytes
                ret += hexStr((code >> 18) | 0xF0);
                ret += hexStr(((code >> 12) & 0x3F) | 0x80);
                ret += hexStr(((code >> 6) & 0x3F) | 0x80);
                ret += hexStr((code & 0x3F) | 0x80);
            }
        }
    }
    return ret;
}

// DOM start -jQuery 
(function() {
	// release list (add a collectr icon to the rel-list)
	$('div.release_title > a.sub_link > span').each( function (idx) {

		var titleSpan = $(this);
		var relName;

		if(titleSpan.hasClass("truncd") && titleSpan.attr("title") != "") {
			relName = titleSpan.attr("title");
		} else {
			relName = titleSpan.text();
		} 		

		titleSpan.parent().before( createIconWithLink(relName) + '&nbsp;');		

		return;
	});

	// nfo view (add a collectr icon to the nfo view title)
	$('div.nfo_title > div > span.sub').each( function(idx) {

		var relName = $(this).text();
		$(this).append( '&nbsp; ' + createIconWithLink(relName) );

	});

	// creates a Icon with a collectr link
	function createIconWithLink(relName) {

        var links = "";		

        for (var i = 0; i < searchEngines.length; i++) {
            engine = searchEngines[i];
            if(engine.active)
            {
                if(engine.modifyReleaseName)
                    relNameMod = engine.modifyReleaseName(relName);
                else
                    relNameMod = relName;

                url = engine.baseUrl.replace(/%s/, relNameMod);

                links += '&nbsp;<a href="' + url + '" target="_blank" title="Suche auf '+ engine.title +' (Neues Fenster)"><img border="0" src=' + engine.icon + 
		                    ' alt="' + engine.title + '" width="13" height="13" /></a>';
            }
        }

        if(newLineAfterSearchIcons) {  
            links = links + "<br />";         
        }

        return links;
	}

// jQuery end
}());