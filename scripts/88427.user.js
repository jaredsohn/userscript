// ==UserScript==
// @name           incisozluk.info
// @namespace      inci
// @include       http://incisozluk.info/*
// @include       http://*.incisozluk.info/*
// @include       http://incisozluk.org/*
// @include       http://*.incisozluk.org/*
// ==/UserScript==
(function() {
var _win = window;
var window = unsafeWindow, document = window.document;
var EBT = function(tag, doc){return (doc||document).getElementsByTagName(tag)};
var EBI = function(id, doc){return (doc||document).getElementById(id)};
var EL = function(tag, doc){return (doc||document).createElement(tag)};
var B = document.body;

//adjust frameset rows
if (B.tagName == 'FRAMESET') {
  var fs = EBT('frameset')[0];
  fs && fs.setAttribute('rows', '48,*');
}

else if (B.className == 'bgtop') {
}

else if (B.className == 'bgleft') {
}

else if (!B.className) {
  var href = location.href;
  var solframe = window.parent && window.parent.document.querySelector('frame[name=left]');
  var doc = solframe && solframe.contentDocument;
  var trs = doc && EBT('tr', doc) || [];
  for (var a, tr, i = 0; tr = trs[i]; i++) {
    tr.className = '';
    a = EBT('a', tr)[0];
    if (a && a.href == href) {
	  tr.className = 'active';
	}
  }
  var lnks = EBT('a');
  var src, ext, a, ytb, vid, sp, i = 0;
  for (; a = lnks[i]; i++) {
    // Disable mouseover links
    window.jQuery && (window.jQuery.fn.cluetip = function(){});
    // Image-swf previewing
    ext = a.href.substr(-4).toLowerCase(), src = 0;
    if (ext == '.jpg' || ext == '.gif' || ext == '.png' || ext == '.swf') {
	  src = a.href;
	}
	else if (a.href.substr(0, 29) == 'http://www.capsver.com/image/') {
	  src = 'http://www.capsver.com/pics/' + a.href.substr(29) + '.jpg';
	}
	else if ((ytb = a.href.indexOf('youtube.com/watch?v=')) > -1 && (vid = a.href.substr(ytb + 20).split('&')[0])) {
	  src = 'http://youtube.com/v/' + vid;
	}
	if (src) {
	  src = src.replace('?v=', 'img/'); // hizliupload.com
	  sp = EL('span');
	  sp.className = 'resim-ac'
	  sp.innerHTML = '<span onclick="iResGos(this)" title="' + src + '">\u25e2</span>';
	  a.nextSibling ? a.parentNode.insertBefore(sp, a.nextSibling) : a.parentNode.appendChild(sp);
	}
  }
  window.iResGos = function(sp) {
	var img = sp.nextSibling;
    if (!img) {
	  var ytb = sp.title.indexOf('youtube.com/v/') > -1;
	  var maxW = ytb ? 640 : sp.parentNode.parentNode.offsetWidth - 20;
	  if (ytb || sp.title.substr(-3) == 'swf') {
	    img = EL('embed');
		img.type = 'application/x-shockwave-flash';
	    img.width = maxW;
		img.height = ytb ? 400 : parseInt(maxW * 3 / 4);
	  }
	  else {
	    img = EL('img');
	    img.setAttribute('onclick', 'iResGos(this.previousSibling)');
	  }
	  img.style.maxWidth = maxW + 'px';
	  img.style.display = 'none';
	  sp.parentNode.appendChild(img);
	  img.src = sp.title;
	}
	if (img.style.display == 'none') {
	  img.style.display = 'block';
	  sp.innerHTML = '\u25e4';
	}
	else {
	  img.style.display = 'none';
	  sp.innerHTML = '\u25e2';
	}
  };
}
})();