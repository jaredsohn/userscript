// ==UserScript==
// @name           Facebook - Use Font with Arabic Characters
// @namespace      MunahidFacebookArabicFonts
// @description    xx
// @feature        Changes the font for arabic texts because FB uses Lucida Grande which is not able to join the characters correctly together so all characters are shown in their single form.
// @version        1.0
// @include        http*://*.facebook.com/*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude	       htt*://www.facebook.com/advertising/*
// @exclude	       htt*://www.facebook.com/ads/*
// ==/UserScript==

function addStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

body = document.body;
if (body != null) {
  // Change font here: <span data-jsid="text" class="commentBody"><span dir="rtl">
  // font-family:"Times New Roman", Times, serif;
  addStyle('textarea,div,span,h1,h2,h3,h4,h5,h6 { font-family:"Arial" !important; }');

  var s = document.getElementsByTagName('span');
  for (i=0; i<s.length; i++) {
    //alert(s[i].getAttribute("class"));
    if (s[i].getAttribute('dir') === 'rtl') {
      s[i].style.fontSize = "20px";
    }
  }
}

