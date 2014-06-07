// ==UserScript==
// @name fribid
// @namespace http://userscripts.org/mudhead
// @description fribid on skandiabanken
// @include https://secure3.skandiabanken.se/login/login.aspx?t=sb
// ==/UserScript==

function addHTML (ele, html) {
  if (document.all)
    ele.insertAdjacentHTML('beforeEnd', html);
  else if (document.createRange) {
    var range = document.createRange();
    range.setStartAfter(ele.lastChild);
    var docFrag = range.createContextualFragment(html);
    ele.appendChild(docFrag);
  }
  else if (document.layers) {
    var l = new Layer(window.innerWidth);
    l.document.open();
    l.document.write(html);
    l.document.close();
    l.top = document.height;
    document.height += l.document.height;
    l.visibility = 'show';
  }
}

fribid_js = 
"<script language='javascript'>\n" + 
"<!-- \n" + 
"self.isInstalled = function () {\n" +
"  try { var myObj = new ActiveXObject('Nexus.SignerV2Ctl');\n" +
"    if (myObj) { return 'ActiveX'; }\n" +
"  } catch (e) {\n" +
"    if (navigator.plugins['Nexus Personal']) { return 'Plugin'; }\n" +
"    else if (navigator.plugins['FriBID']) { return 'Plugin'; }\n" +
"    else { return false; }\n" +
"  }\n" +
"  return false;\n" +
"}\n" +
"-->\n" + 
"</script>\n";
addHTML(document.body, fribid_js);
