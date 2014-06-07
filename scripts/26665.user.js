// ==UserScript==
// @name           externalLinks
// @namespace      all
// @include        *
// ==/UserScript==

function URLEncode (clearString) {
  var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9_.\-]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
    	output += match[1];
      x += match[1].length;
    } else {
      if (clearString[x] == ' ')
        output += '+';
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
}

var hrefs = document.getElementsByTagName("a");
for(var i=0; i<hrefs.length; i++) {
 if (hrefs[i].innerHTML.substr(0, 7)=='http://') {
 if (hrefs[i].href!=hrefs[i].innerHTML) {
    if (hrefs[i].href.indexOf(hrefs[i].innerHTML)>0 ||
        hrefs[i].href.indexOf(URLEncode(hrefs[i].innerHTML))>0) {
    var span=document.createElement("span");
    span.innerHTML = '&nbsp;';
    hrefs[i].parentNode.insertBefore(span, hrefs[i].nextSibling);

    var aa=document.createElement("a");
    aa.innerHTML = "&lt;GO!&gt;";
    aa.href = hrefs[i].innerHTML;
	aa.target = "_blank";
    hrefs[i].parentNode.insertBefore(aa, span.nextSibling);
	len = 10;
	if (hrefs[i].innerHTML.length>len*2)
	hrefs[i].innerHTML = hrefs[i].innerHTML.substr(0,len)+"..."+hrefs[i].innerHTML.substr(hrefs[i].innerHTML.length-len);
 }
}
}
}