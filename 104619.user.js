// ==UserScript==
// @name           iTunes store hatena
// @namespace      http://d.hatena.ne.jp/tanku/
// @description    iTunes Store Page to hatena diary HTML
// @include        http://itunes.apple.com/jp/*
// @include        https://itunes.apple.com/jp/*
// ==/UserScript==

function getElementsByTagClassName(tag, klass) {
  var tags = document.getElementsByTagName(tag)
  if (tags.length <= 0) {
    return false;
  }
  var rets = []
  for (var i = 0; i < tags.length; ++i) {
    if (tags[i].className == klass) {
      rets.push(tags[i])
    }
  }
  return rets
}

/** ℗ が EUC に変換できないので &#8471; にするのが主目的 */
function encodeHTMLUnicode(str) {
  var ret = "";
  var len = str.length;
  for (var i=0; i<len; ++i) {
    var c = str[i].charCodeAt();
    // 全部 HTML Unicode すると URL の文字数上限を簡単に超える
    ret += (c <= 255 || c >= 10000) ? str[i] : '&#'+c+';';
  }
  return escape(ret);
}

/** '&' をエスケープしたいので encodeURL だとダメ */
function escapeHTMLUnicode(str) {return encodeHTMLUnicode(str);}

function parseTitle(info, elem) {
    if (!elem) {
        return;
    }
    var e = elem.firstChild;
	while (e) {
		switch (e.nodeType) {
		case 1:
            if (e.tagName == 'H1') {
                info.title = e.firstChild.nodeValue;
            } else if (e.tagName == 'H2') {
                var a = e.firstChild;
                if (a.firstChild) {
                    info.artist = a.firstChild.nodeValue;
                    info.artist_link = a.href;
                } else { // アーティストのリンクがない場合
                    info.artist = a.nodeValue;
                }
            } else {
                parseTitle(info, e);
            }
			break;
		}
		e = e.nextSibling;
	}
    return;
}

function parse() {
    var info = {};
    // id='title'
    parseTitle(info, document.getElementById('title'));
    // id='left-stack'
	e = getElementsByTagClassName('DIV','lockup product album music');
	if (!e || e.length <= 0) {
		e = getElementsByTagClassName('DIV','lockup product application');
	}
    e = e[0].firstChild;
    while (e) {
	if (e.tagName == 'A') {
	    var e1 = e.firstChild;
	    if (e1.tagName == 'DIV' && e1.className == 'artwork') {
		var e2 = e1.firstChild;
		while (e2) {
		    if (e2.tagName == 'IMG' && e2.className == 'artwork') {
			//info.artwork = e;
			info.title_url = e.href;
			info.artwork_img_url = e2.src;
		    }
		    e2 = e2.nextSibling;
		}
	    }
	}
	if (e.tagName == 'UL' && e.className == 'list') {
	    var e1 = e.firstChild;
	    while (e1) {
		if (e1.className == 'genre') {
		    info.genre = e1.innerHTML.replace(/\n/g, "");
		} else if (e1.className == 'release-date') {
		    info.release_date = e1.innerHTML.replace(/\n/g, "");
		} else if (e1.className == 'copyright') {
		    info.copyright = e1.innerHTML.replace(/\n/g, "");
		}
		e1 = e1.nextSibling;
	    }
	}
	e = e.nextSibling;
    }
    return info;
}

function write(info) {
	var bMusic = true;
	var e = getElementsByTagClassName('DIV','lockup product album music');
	if (!e || e.length <= 0) {
		e = getElementsByTagClassName('DIV','lockup product application');
		bMusic = false;
	}
	e = e[0]


    var str = 
	'<div class="hatena-asin-detail">' + 
	'<a href="' + info.title_url + '">' + 
	'<img class="hatena-asin-detail-image" src="' + 
	info.artwork_img_url + '" alt="' + info.title + 
	'" title=' + info.title + '"></a>' + 
	//info.artwork + 
	'<div class="hatena-asin-detail-info">' + 
	'<p class="hatena-asin-detail-title">' + 
	'<a href="' + info.title_url + '">' + info.title + '</a></p>' + 
	'<ul>' + 
	'<li>' + 
	(bMusic ? '<span class="hatena-asin-detail-label">アーティスト:</span>' : '') +
	(info.artist_link
	 ? ('<a href="' + info.artist_link + '">' +info.artist + '</a>')
	 : info.artist) +
	'</li>' +
	'<li>' + info.genre + "</li>" + 
	'<li>' + info.release_date + "</li>" +
	'<li>' + info.copyright + "</li>" + 
	'<li><a href="' + info.title_url + 
	'" target="_blank">iTunes で見る</a></li>' + 
	'</ul>' + 
	'<div class="hatena-asin-detail-foot"></div>' +
	'</div></div>';

    e.innerHTML +=
	'<a href="http://d.hatena.ne.jp/refer?appendbody='+
	escapeHTMLUnicode(str) + '">Hatena::Diary に書く</a>';

    document.body.innerHTML +=
	'<form><textarea rows="8" cols="80">' +
	str + '</textarea></form>';
}

write(parse());