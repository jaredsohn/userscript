// ==UserScript==
// @name           MaxConsole Sig/Avatar/Ad/Redirect Killer v2.5
// @namespace      Smiths
// @include        http://*maxconsole.net*
// ==/UserScript==


var avs = 1;
var sigs = 1;
var ads = 1;
if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey to use the full features of this script.');
    return;
} else {
avs = Number(GM_getValue('avs', avs));
sigs = Number(GM_getValue('sigs', sigs));
ads = Number(GM_getValue('ads', ads));
GM_registerMenuCommand((avs ? 'Show' : 'Hide') + ' Avatars', avatars);
GM_registerMenuCommand((sigs ? 'Show' : 'Hide') + ' Signatures', signatures);
GM_registerMenuCommand((ads ? 'Show' : 'Hide') + ' Ads/Referral Links', adverts);
}

function avatars() {
  GM_setValue('avs', avs ? 0 : 1 );
  window.location.href = window.location.href;
}
function signatures() {
  GM_setValue('sigs', sigs ? 0 : 1 );
  window.location.href = window.location.href;
}
function adverts() {
  GM_setValue('ads', ads ? 0 : 1 );
  window.location.href = window.location.href;
}

var allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (ads == 1) {
for (var i = 0; i < allLinks.snapshotLength; i++) {
  if (allLinks.snapshotItem(i).href.search(/adredirect\.php\?bannerid=/) >= 0) {
    allLinks.snapshotItem(i).innerHTML = ''; //remove ad banners
  }
  if ((allLinks.snapshotItem(i).href.search(/php\/affstart\.php\?affcode=/) >= 0) || (allLinks.snapshotItem(i).href.search(/&partner=/) >= 0)) {
    //rewrite divineo sponsored links to just go to the product page
    allLinks.snapshotItem(i).href = allLinks.snapshotItem(i).href.replace(/neo\.(..)\/php\/affstart\.php\?affcode=66623&prod=([^<]+)/,'neo.$1/cgi-bin/div-$1/$2.html');
    allLinks.snapshotItem(i).href = allLinks.snapshotItem(i).href.replace(/neo\.(..)\/php\/affstart\.php\?affcode=66623/,'neo.$1/cgi-bin/div-$1/index.html');
    allLinks.snapshotItem(i).href = allLinks.snapshotItem(i).href.replace(/neo\.com\/php\/affstart\.php\?affcode=66623&prod=([^<]+)/,'neo.com/cgi-bin/div-us/$1.html');
    allLinks.snapshotItem(i).href = allLinks.snapshotItem(i).href.replace(/neo\.com\/php\/affstart\.php\?affcode=66623/,'neo.com/cgi-bin/div-us/index.html');
    allLinks.snapshotItem(i).href = allLinks.snapshotItem(i).href.replace(/neo\.co.uk\/php\/affstart\.php\?affcode=66623&prod=([^<]+)/,'neo.co.uk/cgi-bin/div-uk/$1.html');
    allLinks.snapshotItem(i).href = allLinks.snapshotItem(i).href.replace(/neo\.co.uk\/php\/affstart\.php\?affcode=66623/,'neo.co.uk/cgi-bin/div-uk/index.html');

    allLinks.snapshotItem(i).href = allLinks.snapshotItem(i).href.replace(/&partner=65565/,''); //modchipstore.com

  }
  }
}

var alltables = document.getElementsByTagName('table');
for (var i = 0; i < alltables.length; i++) {
  if (alltables[i].id.indexOf('post') >= 0) {
  
if (avs == 1) { killavatars(alltables[i]); }
if (sigs == 1) { killsigs(alltables[i]); }

}
else if ((alltables[i].width == "611") || (alltables[i].width == "172")) {

if (ads == 1) { killadpost(alltables[i]); }
  }
}


function killavatars(post) {
  var avatar = post.getElementsByTagName('img');
    for (var j = 0; j < avatar.length; j++) {
      if (avatar[j].src.indexOf('image.php?') >= 0) {
      avatar[j].src = '';
      avatar[j].alt = '';
      }
    }
}
function killsigs(post) {
    var postdiv = post.getElementsByTagName('div');
    for (var j = 0; j < postdiv.length; j++) {
      if (postdiv[j].innerHTML.indexOf('__________________<br') >= 0) {
      postdiv[j].parentNode.removeChild(postdiv[j]);
      }
    }
}
function killadpost(post) {
      if ((post.innerHTML.indexOf('box_tab-maxdeals.gif') >= 0) || (post.innerHTML.indexOf('tab-sponsors.gif') >=0)) {
      post.parentNode.removeChild(post);
      }
}