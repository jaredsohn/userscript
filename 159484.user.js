// ==UserScript==
// @name        Rozwija galerie na gazeta.pl
// @description Scala wszystkie części galerii/foto-opowieści na pierwszej stronie, eliminując konieczność "przewijania".
// @namespace   unj
// @version     0.1.3
// @copyright   2013+, Andrzej Lichnerowicz
// @include     http://*.gazeta.pl/*.html*
// @include     http://*.plotek.pl/*.html*
// @include     http://*.tokfm.pl/*.html*
// @include     http://*.moto.pl/*.html*
// @include     http://moto.pl/*.html*
// @include     http://wyborcza.biz/*.html*
// @include     http://deser.pl/*.html*
// @include     http://wysokieobcasy.pl/*.html*
// @include     http://*.wysokieobcasy.pl/*.html*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/*
Copyright (C) 2013 Andrzej Lichnerowicz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function getNextFotostory(ndoc, subseq) {
    if($(ndoc).find("#gazeta_article a.next").length > 0) {
	var url = $($(ndoc).find("#gazeta_article a.next")[0]).attr("href");
	var rem = [ "#widget-controls", ".navigation div", "#article_comments", ".relatedHolder",
		    ".article_toolbar", "#articleToolbar", ".mod_sociallist", "#gazeta_article_tags",
		    "#gazeta_article_author", "#gazeta_article_date", "#gazeta_article_tools", "#gazeta_article_toolbar",
		    "#gazeta_article_lead", "script" ];
	jQuery.each(rem, function(i, ii) {
	    $(ndoc).find(ii).remove();
	});

	if (subseq) {
	    $(ndoc).find("h2").remove();
	    $(ndoc).find(".gazeta_article_related_new").remove();
	}
	var ga = $(ndoc).find("#gazeta_article");
	var ab = $(ndoc).find("#gazeta_article_body");

	GM_xmlhttpRequest({
	    method: 'GET',
	    url:    url,
	    onload: function(response) {
		var a = getNextFotostory($("<div>").html(response.responseText), true);
		a != undefined && a.insertAfter(ab)
	    }
	});
	return ga;
    }
}

if($("#gazeta_article_miniatures").length > 0) {
  $("div.navigation").remove();
  $("#gazeta_article_image p.desc").remove();
  var images = $("#gazeta_article_miniatures > ul > li");
  var gai = $("#gazeta_article_image");
  var gab = $("#gazeta_article_body");
  gab.insertAfter(gai);

  var src = $(gai[0].children[0].children[0].children[0]).attr("src"); 
  var l = src.match(/\/z[0-9A-Za-z]+([A-Z])[\.,]/);
  var gab_p = gab;

  images.each(function(index, item) {
    if (index==0) return true;
    var img = $($(item)[0].children[0].children[0]);
    
    var gai_n = gai.clone();
    var gab_n = gab.clone();

    $(gai_n[0].children[0].children[0].children[0]).attr("src", img.attr("src").replace(/(\/z[0-9A-Za-z]+)([A-Z])([\.,])/, "$1"+l[1]+"$3"));
    $(gab_n).html(img.attr("title"));
    gai_n.insertAfter(gab_p);
    gab_n.insertAfter(gai_n);

    gab_p = gab_n; 
  });
  $("#gazeta_article_miniatures").remove();
} else if ($(".fotostory").length > 0) {
    getNextFotostory(document, false);
}
