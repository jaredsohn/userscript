// ==UserScript==
// @name           Autofill eBay Maximum Bid
// @namespace      http://sopoforic.wordpress.com/
// @description    Automatically fills in the maximum bid box with the minimum possible bid.
// @version        0.4.1
// @copyright      2010+, Tracy Poff (http://sopoforic.wordpress.com/)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        *.ebay.tld/*
// @require        http://sizzlemctwizzle.com/updater.php?id=67507
// ==/UserScript==
try{

var pattern = new Array();

//English patterns
pattern.push(/Enter US \$(\d+\.\d+)/);
pattern.push(/Enter EUR (\d+\.\d+)/);
pattern.push(/Enter GBP (\d+\.\d+)/);
pattern.push(/Enter AU \$(\d+\.\d+)/);
pattern.push(/Enter £(\d+\.\d+)/);

//German patterns
pattern.push(/Geben Sie mindestens EUR (\d+\,\d+)/);
pattern.push(/Geben Sie mindestens&nbsp;EUR (\d+\,\d+)/);
pattern.push(/Geben Sie mindestens £(\d+\,\d+)/);
pattern.push(/Geben Sie mindestens&nbsp;£(\d+\,\d+)/);
pattern.push(/Geben Sie mindestens <span style="white-space: nowrap;">EUR (\d+\,\d+)/);

for (x in pattern) {
    if (document.body.innerHTML.match(pattern[x])) {
        document.getElementsByName("maxbid")[0].value = RegExp.$1;
        break;
    }
}
}
catch(err){
    alert(err);
}