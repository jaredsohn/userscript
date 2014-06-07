// ==UserScript==
// @name           youRate
// @namespace      http://userscripts.org/users/107277
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*
// @run-at         document-end
// @version        1.0.1
// ==/UserScript==
var c = false;
var loaded = new Array();
var lang = 'English';
var	LOC = {
	  'Afrikaans ' : {ld : '#L# laaiks, #D# laaik nies', s : ','}
	, 'Bahasa Indonesia' : {ld : '#L# suka, #D# tidak suka', s : ','}
	, 'Bahasa Melayu' : {ld : '#L# suka, #D# tak suka', s : ','}
	, 'Català' : {ld : '#L# \"M\'agrada\" i #D# \"No m\'agrada\"', s : ''}
	, 'Čeština' : {ld : 'Líbí se: #L#, nelíbí se: #D#', s : ' '}
	, 'Dansk' : {ld : '#L# synes godt om, #D# synes ikke godt om', s : '.'}
	, 'Deutsch' : {ld : 'Gefällt #L#, gefällt #D# nicht', s : '.'}
	, 'Eesti' : {ld : '#L# kasutajale meeldis, #D# ei meeldinud ', s : ','}
	, 'English' : {ld : '#L# likes, #D# dislikes', s : ','}
	, 'Español' : {ld : 'Me gusta: #L# No me gusta: #D#', s : ''}
	, 'Euskara' : {ld : '#L# erabiltzaileri gustatu zaie, #D# erabiltzaileri ez', s : ''}
	, 'Filipino' : {ld : '#L# (na) gusto, #D# (na) hindi gusto', s : ','}
	, 'Français' : {ld : '#L# aiment, #D# n\'aiment pas', s : ' '}
	, 'Galego' : {ld : '#L# \"Gústame\", #D# \"Non me gusta\"', s : ''}
	, 'Hrvatski' : {ld : '#L# za sviđa, #D# za ne sviđa', s : ''}
	, 'IsiZulu' : {ld : 'Ukuthandwa #L#, Ukungathandwa #D#', s : ','}
	, 'Íslenska' : {ld : '#L# líkar þetta, #D# mislíkar þetta', s : ','}
	, 'Italiano' : {ld : '#L# Mi piace, #D# Non mi piace', s : ''}
	, 'Kiswahili' : {ld : '#L# waliipenda, #D# hawakuipenda', s : ','}
	, 'Latviešu valoda' : {ld : '#L# — patīk, #D# — nepatīk', s : ','}
	, 'Lietuvių' : {ld : '#L# teig. įvertinim., #D# neig.', s : ','}
	, 'Magyar' : {ld : '#L# embernek tetszik, #D# embernek nem', s : '.'}
	, 'Nederlands' : {ld : '#L# stemmen voor leuk, #D# stemmen voor niet leuk', s : ''}
	, 'Norsk' : {ld : '#L# stemmen voor leuk, #D# stemmen voor niet leuk', s : ' '}
	, 'Polski' : {ld : 'Głosy na tak: #L# Głosy na nie: #D#', s : ''}
	, 'Português' : {ld : '#L# utilizadores que gostaram deste vídeo, #D# utilizadores que não gostaram deste vídeo', s : ''}
	, 'Română' : {ld : '#L# au apreciat, #D# n-au apreciat', s : ','}
	, 'Slovenščina' : {ld : '#L# glasov »Všeč mi je«, #D# glasov »Ni mi všeč«', s : ','}
	, 'Slovenský' : {ld : '#L#-krát „Páči sa mi to“, #D#-krát „Nepáči sa mi to“', s : ' '}
	, 'Suomi' : {ld : '#L# pitää, #D# ei pidä', s : ' '}
	, 'Svenska' : {ld : '#L# gillar, #D# gillar inte', s : ' '}
	, 'Tiếng Việt' : {ld : '#L# người thích, #D# người không thích', s : ','}
	, 'Български' : {ld : '#L# харесвания, #D# нехаресвания', s : ','}
	, 'Русский' : {ld : '#L# понравилось, #D# не понравилось', s : ''}
	, 'Српски' : {ld : 'Свиђа се: #L#; не свиђа се: #D#', s : ''}
	, 'Українська' : {ld : 'Сподобалося: #L#, не сподобалося #D#', s : ','}
	, 'Ελληνικά' : {ld : '#L# θετικές, #D# αρνητικές ψήφοι', s : ''}
	, 'עברית' : {ld : '#L# אהבתי, #D# לא אהבתי', s : ''} // [1]
	, 'اردو' : {ld : '#L# پسند کرتا ہے، #D# ناپسند کرتا ہے', s : ','} // [1]
	, 'العربية' : {ld : 'أثار الفيديو إعجاب #L# من الأشخاص، بينما لم يعجب #D# من الأشخاص', s : ','} // [1]
	, 'فارسی' : {ld : '#L# دوست داشتن، #D# دوست نداشتن', s : ','} // [1]
	, 'हिन्दी' : {ld : '#L# पसंद, #D# नापसंद', s : ','}
	, 'ภาษาไทย' : {ld : 'ชอบ #L# คน ไม่ชอบ #D# คน', s : ','}
	, 'አማርኛ' : {ld : '#L# ወድጄዋለሁ, #D# አልወደድኩትም', s : ''} // [2]
	, '中文' : {ld : '#L# 人顶了此视频，#D# 人踩了此视频', s : ','}
	, '日本語' : {ld : '高評価 #L# 人、低評価 #D# 人', s : ','}
	, '한국어' : {ld : '좋아요 #L#개, 싫어요 #D#개', s : ','}
	// [1] possible incorrect direction or numbers positioning due to copy/paste operation
	// [2] youtube has no own translation for this locale, copied from like/dislike buttons; incorrect plural forms possible
};

try {
	var langA = document.evaluate (
		  "//button[contains(@onclick,'yt.www.masthead.loadPicker')]//span[@class='yt-uix-button-content']"
		, document
		, null
		, XPathResult.FIRST_ORDERED_NODE_TYPE
		, null
		).singleNodeValue;
	if (langA) {
		if (langA.firstChild.nodeValue) {
			lang = langA.firstChild.nodeValue.trim();
		}
	} else {
		//alert("Element not found");
	}
	var rels = document.getElementsByClassName('related-video');
	for (var i=0; i<rels.length; i++) {
		var id = rels[i].href.replace(/^[^v]+v.(.{11}).*/,"$1");
		if (inViewport(rels[i])) {
			GM_xmlhttpRequest({
				  method: "GET"
				, url: 'http://gdata.youtube.com/feeds/api/videos/' + id
				, onload: process.bind( {}, rels[i] )
			});
		}
	}
} catch (e) {
	GM_log(e);
	// alert(e);
}

function process (el, res) {
	// if (c) return;
	// c = confirm(res);
	if (!loaded[el]) {
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(res.responseText, "text/xml");
		var evaluator = new XPathEvaluator();
		var resolver = evaluator.createNSResolver(xmlDoc.documentElement);
		var result = evaluator.evaluate("gd:rating", xmlDoc.documentElement, resolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		var rating = result.singleNodeValue;

		var divSparkbars = document.createElement('div');
		divSparkbars.className = 'watch-sparkbars';
		el.appendChild(divSparkbars);
		loaded[el] = 1;
		if (rating) {
			var average = rating.getAttribute('average');
			var max = rating.getAttribute('max');
			var min = rating.getAttribute('min');
			var numRaters = rating.getAttribute('numRaters');
			var likes = 100*(average-min)/(max-min);
			var dislikes = 100-likes;

			divSparkbars.title = numRaters + ' votes';

			if (likes > 0) {
				var divSparkbarsLikes = document.createElement('div');
				divSparkbarsLikes.className = 'watch-sparkbar-likes';
				divSparkbarsLikes.style.width = likes + '%';
				divSparkbars.appendChild(divSparkbarsLikes);
			}
			if (dislikes > 0) {
				var divSparkbarsDislikes = document.createElement('div');
				divSparkbarsDislikes.className = 'watch-sparkbar-dislikes';
				divSparkbarsDislikes.style.width = dislikes + '%';
				divSparkbars.appendChild(divSparkbarsDislikes);
			}
			var spanLikesDislikes = document.createElement('span');
			spanLikesDislikes.className = 'stat';
			var locText = LOC[lang].ld;
			var rep = new RegExp('#L#', 'g');
			locText = locText.replace(rep, group(Math.round(numRaters*likes/100), LOC[lang].s));
			rep = new RegExp('#D#', 'g');
			locText = locText.replace(rep, group(Math.round(numRaters*dislikes/100), LOC[lang].s));
			var textLikesDislikes = document.createTextNode(locText);
			spanLikesDislikes.appendChild(textLikesDislikes);
			divSparkbars.title = locText
			el.appendChild(spanLikesDislikes);
		}
	}
}

Function.prototype.bind = function( thisObject ) {
	var method = this;
	var oldargs = [].slice.call( arguments, 1 );
	return function () {
		var newargs = [].slice.call( arguments );
		return method.apply( thisObject, oldargs.concat( newargs ));
	};
}

document.addEventListener (
	  'DOMNodeInserted'
	, function (e) {
		if(e.target.firstChild.className.indexOf("related-video") > -1) {
			var id = e.target.firstChild.href.replace(/^[^v]+v.(.{11}).*/,"$1");
			if (inViewport(e.target.firstChild)) {
				setTimeout ( function () { 
					GM_xmlhttpRequest({
						  method: "GET"
						, url: 'http://gdata.youtube.com/feeds/api/videos/' + id
						, onload: process.bind( {}, e.target.firstChild )
					});
				}, 0);
			}
		}
	}
	, false
	);

window.addEventListener (
	  'scroll'
	, function (e) {
		var rels = document.getElementsByClassName('related-video');
		for (var i=0; i<rels.length; i++) {
			if (!loaded[rels[i]]) {
				var id = rels[i].href.replace(/^[^v]+v.(.{11}).*/,"$1");
				if (inViewport(rels[i])) {
					GM_xmlhttpRequest({
						  method: "GET"
						, url: 'http://gdata.youtube.com/feeds/api/videos/' + id
						, onload: process.bind( {}, rels[i] )
					});
				}
			}
		}
	}
	, false
	);

function inViewport ( el ) {
	var top = el.offsetTop;
	var left = el.offsetLeft;
	var width = el.offsetWidth;
	var height = el.offsetHeight;

	while(el.offsetParent) {
		el = el.offsetParent;
		top += el.offsetTop;
		left += el.offsetLeft;
	}
	return (
		top < (window.pageYOffset + window.innerHeight) &&
		left < (window.pageXOffset + window.innerWidth) &&
		(top + height) > window.pageYOffset &&
		(left + width) > window.pageXOffset
	);
}

function group (num, sep) {
	var str = new String(num);
	if (sep.length) {
		var grp = /(\d+)(\d{3})/;
		while (grp.test(str)) {
			str = str.replace(grp, '$1' + sep + '$2');
		}
	}
	return str;
}