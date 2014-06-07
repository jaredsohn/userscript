// ==UserScript==

// @name           Hotmail auto-login

// @namespace      http://azrael.awardspace.co.uk/

// @description    Auto-complete the Hotmail login form.

// @include        http://login.live.com/login.srf*

// ==/UserScript==
function $x(xpath, root) { // From Johan Sundström
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
  while(next = got.iterateNext())
    result.push(next);
  return result;
}
un = GM_getValue('un','');
pw = GM_getValue('pw','');
unf = $x('//form//input[@type="text"]')[0];
pwf = $x('//form//input[@type="password"]')[0];
unf.value = un;
pwf.value = pw;
function setHotmailScriptValues() {
	GM_setValue('un',unf.value)
	GM_setValue('pw',pwf.value)
	document.body.appendChild(registered_box)
}

GM_registerMenuCommand('Set Hotmail login details',setHotmailScriptValues);
s = ' \
#registeredBox { \
  display: block; \
  position: absolute; \
  left: 50%; top: 200px; \
  width: 300px; \
  margin-left: -160px; \
  background: #ff9; \
  padding: 20px; \
  border: 1px solid #cc6; \
  font-size: 10pt; \
  }';
GM_addStyle(s)
registered_box = document.createElement('div');
registered_box.innerHTML = ' \
<h2>Thankyou...</h2> \
<p>The login details for <strong>'+unf.value+'</strong> have been stored.</p> \
<p>They will be filled in automatically when you visit this page again.</p> \
<p>Please refresh this page to remove this box and fill in the login details.</p>'
registered_box.id = 'registeredBox'
