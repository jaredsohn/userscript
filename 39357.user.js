// ==UserScript==
// @name          Amazon YokohamaLib Linky
// @namespace     http://www.hatena.ne.jp/r-west/
// @description   Yokohama Library Lookup from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

(
function() {
    var mainmatch = window.location.href.match(/\/(\d{9}[\d|X])/);
    if (!mainmatch) {
       return;
    }
    var asin = mainmatch[1];
    if (!asin){
        return;
    }
    var bs = document.getElementsByTagName('span');
    for (i in bs) {
      if (bs[i].getAttribute('id') == 'btAsinTitle') {
        var header = bs[i];
        break;
      }
    }
    if (!header) {
        return
    }
    var spl_link = document.createElement('b');
    spl_link.innerHTML =
'<FORM METHOD="POST" ACTION="http://www.lib.city.yokohama.jp/cgi-bin/Swissken.sh?0+-+0">' +
'<INPUT TYPE=submit  VALUE="Search Yokohama Lib. !">' +
'<INPUT TYPE="hidden" NAME="ktyp0"  VALUE="FUL">' +
'<INPUT TYPE="hidden" NAME="key0" ID="ISDNforYOKOHAMALIB" VALUE="">' +
'<INPUT TYPE="hidden" NAME="itfg0" VALUE="F"><INPUT TYPE="hidden" NAME="ron0" VALUE="m"><INPUT TYPE="hidden" NAME="ktyp1"  VALUE="SHK"><INPUT TYPE="hidden" NAME="key1" VALUE="">' +
'<INPUT TYPE="hidden" NAME="itfg1" VALUE="F"><INPUT TYPE="hidden" NAME="ron1" VALUE="m"><INPUT TYPE="hidden" NAME="ktyp2"  VALUE="SHK"><INPUT TYPE="hidden" NAME="key2" VALUE="">' +
'<INPUT TYPE="hidden" NAME="itfg2" VALUE="F"><INPUT TYPE="hidden" NAME="ron2" VALUE="m"><INPUT TYPE="hidden" NAME="ktyp3"  VALUE="SHK"><INPUT TYPE="hidden" NAME="key3" VALUE="">' +
'<INPUT TYPE="hidden" NAME="itfg3" VALUE="F"><INPUT TYPE="hidden" NAME="ron3" VALUE="m"><INPUT TYPE="hidden" NAME="ktyp4"  VALUE="SHK"><INPUT TYPE="hidden" NAME="key4" VALUE=""><INPUT TYPE="hidden" NAME="itfg4" VALUE="F">' +
'<INPUT TYPE="hidden" NAME="tgid" VALUE="010A"><INPUT TYPE="hidden" NAME="tkey" VALUE="">' +
'<INPUT TYPE="hidden" NAME="sgid" VALUE="SPNO"><INPUT TYPE="hidden" NAME="kkey" VALUE="">' +
'<INPUT TYPE="hidden" NAME="skey" VALUE=""><INPUT TYPE="hidden" NAME="srsl0" VALUE="1">' +
'<INPUT TYPE="hidden" NAME="srsl1" VALUE="1"><INPUT TYPE="hidden" NAME="srsl2" VALUE="1"></FORM>';
    header.parentNode.insertBefore(spl_link, header.nextSibling);
    var varelement = document.getElementById("ISDNforYOKOHAMALIB");
    varelement.setAttribute('VALUE', asin);
}
)();
