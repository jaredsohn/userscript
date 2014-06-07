// ==UserScript==
// @name           magnetizer
// @namespace      links
// @description    add trackerless magnet links to isohunt (make infohash a magnet link), rockbox (replaces download link)
// @include        http://isohunt.com/torrent_details/*
// @include        http://psychocydd.co.uk/*
// ==/UserScript==
;(function() {
	var b32_js = 'data:application/javascript;base64,LyoqCioKKiAgQmFzZTMyIGVuY29kZSAvIGRlY29kZQoqICB1dGY4IGZ1bmN0aW9ucyBhbmQgZGVjb2RpbmcgYm9ycm93ZWQgZnJvbSBiYXNlNjQgZnJvbSBodHRwOi8vd3d3LndlYnRvb2xraXQuaW5mby8KKiAgYnkgU2FiaW4gSWFjb2IgPGlhY29ic0BtMG41dDNyLmluZm8+CioKKiovCiAKdmFyIEJhc2UzMiA9IHsKIAoJX2tleVN0cjogIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaMjM0NTY3PSIsCgkKCWZyb21TdHJpbmc6IGZ1bmN0aW9uKHN0cikgewoJCXN0ciA9IEJhc2UzMi5fdXRmOF9lbmNvZGUoc3RyKTsKCQl2YXIgcmV0ID0gW107CgkJZm9yKHZhciBsPXN0ci5sZW5ndGg7IGwtLTspIHsKCQkJcmV0LnVuc2hpZnQoc3RyLmNoYXJDb2RlQXQobCkpOwoJCX0KCQlyZXR1cm4gQmFzZTMyLmZyb21CeXRlcyhyZXQpOwoJfSwKCglmcm9tSGV4OiBmdW5jdGlvbihoZXgpIHsKCQl2YXIgcmV0ID0gW107CgoJCXZhciBsID0gaGV4Lmxlbmd0aDsKCgkJaWYobCAlIDIgIT09IDApIHsKCQkJcmV0dXJuIGZhbHNlOwoJCX0KCgkJZm9yKHZhciBpPTA7IGk8bDsgaSs9MikgewoJCQlyZXQucHVzaChwYXJzZUludChoZXguc3Vic3RyKGksIDIpLCAxNikpOwoJCX0KCgkJcmV0dXJuIEJhc2UzMi5mcm9tQnl0ZXMocmV0KTsKCX0sCgoJZnJvbUJ5dGVzOiBmdW5jdGlvbiAoYnl0ZXMpIHsKCQlpZihieXRlcyA9PT0gZmFsc2UpIHsKCQkJcmV0dXJuIGZhbHNlOwoJCX0KCgkJdmFyIHJldCA9IFtdOwoJCXZhciB2ID0gQmFzZTMyLl9rZXlTdHI7CgkJdmFyIGkgPSAwLCBsID0gYnl0ZXMubGVuZ3RoOwoJCXZhciBjMSwgYzIsIGMzLCBjNCwgYzUsIGUxLCBlMiwgZTMsIGU0LCBlNSwgZTYsIGU3LCBlODsKCgkJd2hpbGUoaSA8IGwpIHsKCQkJYzEgPSBieXRlc1tpKytdOwoJCQljMiA9IGJ5dGVzW2krK107CgkJCWMzID0gYnl0ZXNbaSsrXTsKCQkJYzQgPSBieXRlc1tpKytdOwoJCQljNSA9IGJ5dGVzW2krK107CgoJCQllMSA9IGUyID0gZTMgPSBlNCA9IGU1ID0gZTYgPSBlNyA9IGU4ID0gMzI7CgoJCQllMSA9IGMxID4+IDM7CgkJCWUyID0gKChjMSAmIDcpIDw8IDIpIHwgKGMyID4+IDYpOwoJCQlpZihjMiAhPT0gdW5kZWZpbmVkKSB7CgkJCQllMyA9IChjMiAmIDYzKSA+PiAxOwoJCQkJZTQgPSAoKGMyICYgMSkgPDwgNCkgfCAoYzMgPj4gNCk7CgkJCQlpZihjMyAhPT0gdW5kZWZpbmVkKSB7CgkJCQkJZTUgPSAoKGMzICYgMTUpIDw8IDEpIHwgKGM0ID4+IDcpOwoJCQkJCWlmKGM0ICE9PSB1bmRlZmluZWQpIHsKCQkJCQkJZTYgPSAoYzQgJiAxMjcpID4+IDI7CgkJCQkJCWU3ID0gKChjNCAmIDMpIDw8IDMpIHwgKGM1ID4+IDUpOwoJCQkJCQlpZihjNSAhPT0gdW5kZWZpbmVkKSB7CgkJCQkJCQllOCA9IGM1ICYgMzE7CgkJCQkJCX0KCQkJCQl9CgkJCQl9CgkJCX0KCgkJCXJldC5wdXNoKHZbZTFdLHZbZTJdLHZbZTNdLHZbZTRdLHZbZTVdLHZbZTZdLHZbZTddLHZbZThdKTsKCQl9CgoJCXJldHVybiByZXQuam9pbignJyk7Cgl9LAoKCWRlY29kZTogZnVuY3Rpb24gKGlucHV0KSB7CgkJdmFyIG91dHB1dCA9ICIiOwoJCXZhciBjaHIxLCBjaHIyLCBjaHIzOwoJCXZhciBlbmMxLCBlbmMyLCBlbmMzLCBlbmM0OwoJCXZhciBpID0gMDsKIAoJCWlucHV0ID0gaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTlcK1wvXD1dL2csICIiKTsKIAoJCXdoaWxlIChpIDwgaW5wdXQubGVuZ3RoKSB7CiAKCQkJZW5jMSA9IHRoaXMuX2tleVN0ci5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTsKCQkJZW5jMiA9IHRoaXMuX2tleVN0ci5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTsKCQkJZW5jMyA9IHRoaXMuX2tleVN0ci5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTsKCQkJZW5jNCA9IHRoaXMuX2tleVN0ci5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTsKIAoJCQljaHIxID0gKGVuYzEgPDwgMikgfCAoZW5jMiA+PiA0KTsKCQkJY2hyMiA9ICgoZW5jMiAmIDE1KSA8PCA0KSB8IChlbmMzID4+IDIpOwoJCQljaHIzID0gKChlbmMzICYgMykgPDwgNikgfCBlbmM0OwogCgkJCW91dHB1dCA9IG91dHB1dCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMSk7CiAKCQkJaWYgKGVuYzMgIT0gNjQpIHsKCQkJCW91dHB1dCA9IG91dHB1dCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMik7CgkJCX0KCQkJaWYgKGVuYzQgIT0gNjQpIHsKCQkJCW91dHB1dCA9IG91dHB1dCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMyk7CgkJCX0KIAoJCX0KIAoJCW91dHB1dCA9IEJhc2U2NC5fdXRmOF9kZWNvZGUob3V0cHV0KTsKIAoJCXJldHVybiBvdXRwdXQ7CiAKCX0sCiAKCV91dGY4X2VuY29kZTogZnVuY3Rpb24gKHN0cmluZykgewoJCXN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cclxuL2csIlxuIik7CgkJdmFyIHV0ZnRleHQgPSAiIjsKIAoJCWZvciAodmFyIG4gPSAwLCBsPXN0cmluZy5sZW5ndGg7IG4gPCBsOyBuKyspIHsKIAoJCQl2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KG4pOwogCgkJCWlmIChjIDwgMTI4KSB7CgkJCQl1dGZ0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7CgkJCX0KCQkJZWxzZSBpZigoYyA+IDEyNykgJiYgKGMgPCAyMDQ4KSkgewoJCQkJdXRmdGV4dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjID4+IDYpIHwgMTkyKTsKCQkJCXV0ZnRleHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDYzKSB8IDEyOCk7CgkJCX0KCQkJZWxzZSB7CgkJCQl1dGZ0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgPj4gMTIpIHwgMjI0KTsKCQkJCXV0ZnRleHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgPj4gNikgJiA2MykgfCAxMjgpOwoJCQkJdXRmdGV4dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjICYgNjMpIHwgMTI4KTsKCQkJfQogCgkJfQogCgkJcmV0dXJuIHV0ZnRleHQ7Cgl9LAogCglfdXRmOF9kZWNvZGU6IGZ1bmN0aW9uICh1dGZ0ZXh0KSB7CgkJdmFyIHN0cmluZyA9ICIiOwoJCXZhciBpID0gMDsKCQl2YXIgYyA9IGMxID0gYzIgPSAwOwogCgkJd2hpbGUgKCBpIDwgdXRmdGV4dC5sZW5ndGggKSB7CiAKCQkJYyA9IHV0ZnRleHQuY2hhckNvZGVBdChpKTsKIAoJCQlpZiAoYyA8IDEyOCkgewoJCQkJc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7CgkJCQlpKys7CgkJCX0KCQkJZWxzZSBpZigoYyA+IDE5MSkgJiYgKGMgPCAyMjQpKSB7CgkJCQljMiA9IHV0ZnRleHQuY2hhckNvZGVBdChpKzEpOwoJCQkJc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKChjICYgMzEpIDw8IDYpIHwgKGMyICYgNjMpKTsKCQkJCWkgKz0gMjsKCQkJfQoJCQllbHNlIHsKCQkJCWMyID0gdXRmdGV4dC5jaGFyQ29kZUF0KGkrMSk7CgkJCQljMyA9IHV0ZnRleHQuY2hhckNvZGVBdChpKzIpOwoJCQkJc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKChjICYgMTUpIDw8IDEyKSB8ICgoYzIgJiA2MykgPDwgNikgfCAoYzMgJiA2MykpOwoJCQkJaSArPSAzOwoJCQl9CiAKCQl9CgkJcmV0dXJuIHN0cmluZzsKCX0KfQo=';
	var magnet_js = 'data:application/javascript;base64,dmFyIE1hZ25ldCA9IHsKCWZyb21JbmZvSGFzaDogZnVuY3Rpb24oaWgpIHsKCQl2YXIgYnRpaCA9IEJhc2UzMi5mcm9tSGV4KGloKTsKCQlpZihidGloKSB7CgkJCXJldHVybiAnbWFnbmV0Oj94dD11cm46YnRpaDonICsgYnRpaDsKCQl9CgkJcmV0dXJuIGZhbHNlOwoJfQp9Cg==';
	
	var d = unsafeWindow.document;

	var h = d.getElementsByTagName('head')[0];
	var f = d.createDocumentFragment();

	var s1 = document.createElement('script');
	s1.src = b32_js;
	s1.addEventListener('load', magnetise, false);
	f.appendChild(s1);

	var s2 = document.createElement('script');
	s2.src = magnet_js;
	s2.addEventListener('load', magnetise, false);
	f.appendChild(s2);

	h.appendChild(f);

	function magnetise() {
		if(!(unsafeWindow.Base32 && unsafeWindow.Magnet)) {
			return;
		}
		
		Base32 = unsafeWindow.Base32;
		Magnet = unsafeWindow.Magnet;

		var host = unsafeWindow.location.host;
		if(handlers[host]) {
			handlers[host].call();
		}
	}

	var handlers = {
		'psychocydd.co.uk': function() {
			var links = d.getElementsByTagName('a');
			for(var i=links.length; i--;) {
				var a = links[i];
				if(a.href && a.href.substr(0, 36) == 'http://psychocydd.co.uk/download.php') {
					var ih = a.href.replace(/.*id=([0-9a-f]{40}).*/, '$1');
					a.href = Magnet.fromInfoHash(ih);
				}
			}
		},

		'isohunt.com': function() {
			Base32 = unsafeWindow.Base32;
			Magnet = unsafeWindow.Magnet;

			var ihc = d.getElementById('SL_desc');
			if(ihc.innerHTML.substr(0, 9) != 'info_hash') {
				ihc.id = 'SL_desc_wtf';
				ihc = d.getElementById('SL_desc');
			}

			if(!ihc) {
				return;
			}

			var ih = ihc.innerHTML.replace(/.*info_hash: ([0-9a-fA-F]{40}).*/, '$1');

			var lnk = '<a href="' + Magnet.fromInfoHash(ih) + '">' + ih + '</a>';

			ihc.innerHTML = ihc.innerHTML.replace('info_hash: ' + ih, 'info_hash: ' + lnk);
		}
	}
})();
