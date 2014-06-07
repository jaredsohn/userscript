// ==UserScript==
// @name       MobileTwitter
// @desription Enforcing the use of the mobile version of twitter
// @include    *
// @version    0.2
// ==/UserScript==

urls = document.links;
for (i = 0 ; i < urls.length ; i++)
{
  urls[i].href = urls[i].href.replace('www.twitter.', 'm.twitter.');
  urls[i].href = urls[i].href.replace('://twitter.', '://m.twitter.');
}

