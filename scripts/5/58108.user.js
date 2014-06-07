// ==UserScript==
// @name           zoome Downloader
// @namespace      http://d.hatena.ne.jp/kurumigi/
// @description    Download flv or mp4 files from http://zoome.jp/
// @include        http://zoome.jp/*/diary/*
// @include        http://circle.zoome.jp/*/media/*
// @version        0.5.1
// ==/UserScript==

(function () {
	// === GLOBAL PARAMETERS ===
	var DEBUG = false;
	var arc4Key = '72f27dae3d5ce9ceb803eaad50c3d657';
	var pageType = (location.host == 'zoome.jp') ? 'diary' : ((location.host == 'circle.zoome.jp') ? 'circle' : '');

	// === ARCFOUR DECODE ===
	// cf. http://www.mozilla.org/projects/security/pki/nss/draft-kaukonen-cipher-arcfour-03.txt
	function arc4(key, hexstring) {
		// 3.1.1
		var s = new Array(256);
		var s2 = new Array(256);
		var i, temp, crypt;

		// 3.1.2 and 3.1.3
		var keylen = key.length;
		for (i = 0; i < 256; i++) {
			s[i] = i;
			s2[i] = key.charCodeAt(i % keylen);
		}

		// 3.1.4
		var j = 0;
		for (i = 0; i < 256; i++) {
			j = (j + s[i] + s2[i]) % 256;
			temp = s[i];
			s[i] = s[j];
			s[j] = temp;
		}

		// 3.1.5
		i = 0;
		j = 0;

		// 3.2
		crypt = '';
		for (var k = 0; k < (hexstring.length / 2); k++) {
			i = (i + 1) % 256;
			j = (j + s[i]) % 256;
			temp = s[i];
			s[i] = s[j];
			s[j] = temp;
			crypt += String.fromCharCode(parseInt(hexstring.substr(k * 2, 2), 16) ^ (s[(s[i] + s[j]) % 256]));
		}

		return crypt;
	}

	// === XML CHECK ===
	function checkXml() {
		var xmlXPath = {
			diary  : '//input[@type="hidden"][@id="mypage_diary_xml"]/@value',
			circle : '//input[@type="hidden"][@id="circle_media_xml"]/@value',
		}
		if (DEBUG) { GM_log(document.evaluate(xmlXPath[pageType], document, null, XPathResult.STRING_TYPE, null).stringValue); }
		return (document.evaluate(xmlXPath[pageType], document, null, XPathResult.STRING_TYPE, null).stringValue != '');
	}

	// === GET XML URL ===
	function getXmlUrl() {
		var replaceStr = {
			diary  : '/data_movie?format=xml&diary_id=$1&filename=zpmmdian&dummy=1',
			circle : '/swf_media/$1?filename=zpmcmedn&dummy=1',
		}
		
		if (DEBUG) { GM_log(location.href.replace(/\/(?:diary|media)\/(\d+)\/?(?:\?no_bt=\d)?$/, replaceStr[pageType])); }
		return location.href.replace(/\/(?:diary|media)\/(\d+)\/?(?:\?no_bt=\d)?$/, replaceStr[pageType]);
	}

	// === GET MOVIE URL ===
	function getMovieUrl(responseXML) {
		var imgUrlXPath = {
			diary  : '//flv01//src',
			circle : '//url_movie',
		}
		if (DEBUG) { GM_log(arc4(arc4Key, responseXML.evaluate(imgUrlXPath[pageType], responseXML, null, XPathResult.STRING_TYPE, null).stringValue)) }
		return arc4(arc4Key, responseXML.evaluate(imgUrlXPath[pageType], responseXML, null, XPathResult.STRING_TYPE, null).stringValue);
	}

	// === DETECT FILE TYPE ===
	function detectFileType(responseXML) {
		var fileTypeXPath = {
			diary  : '//mp401/@encode_stat',
			circle : '//h264_encode_stat',
		}
		if (DEBUG) { GM_log(responseXML.evaluate('contains(' + fileTypeXPath[pageType] + ', "encoded")', responseXML, null, XPathResult.BOOLEAN_TYPE, null).booleanValue) }
		return responseXML.evaluate('contains(' + fileTypeXPath[pageType] + ', "encoded")', responseXML, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
	}

	// === DETECT MOVIE URL ===
	function detectMovieUrl(responseXML) {
		var movieUrl = getMovieUrl(responseXML);
		var fileType = detectFileType(responseXML);

		if (DEBUG) { GM_log(movieUrl.replace(/_m1_1\..*$/, '_m1_1.' + (fileType ? 'mp4' : 'flv'))) }
		return movieUrl.replace(/_m1_1\..*$/, '_m1_1.' + (fileType ? 'mp4' : 'flv'));
	}

	// === GET TITLE ===
	function getTitle() {
		return document.title.replace(/ - \u52D5\u753B\u5171\u6709\u30B5\u30A4\u30C8zoome$/,'');
	}

	// === INSERT LINK ===
	function insertLink() {
		if (checkXml()) {
			var req = new XMLHttpRequest();
			req.open('GET', getXmlUrl(), true);
			req.overrideMimeType('text/xml');
			req.onreadystatechange = function (aEvt) {
				if (req.readyState == 4) {
					if (req.status == 200) {
						var logo = document.getElementsByTagName('H1')[0].parentNode;
						
						var span = document.createElement('span');
						span.innerHTML = '\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9:';
						span.className = 'gnavi_s_sub';
						span.style.paddingLeft = '10px';
						
						var a = document.createElement('a');
						a.href = detectMovieUrl(req.responseXML);
						a.innerHTML = getTitle();
						
						span.appendChild(a);
						logo.parentNode.insertBefore(span, logo.nextSibling);
					}
				}
			};
			req.send(null);
		}
	}

	if (pageType != '') {
		insertLink();
	}

})();
