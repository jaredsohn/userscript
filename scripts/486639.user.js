// ==UserScript==
// @name       보고보고 광고 제거
// @namespace  seagreen
// @version    0.1.4
// @description  테스트
// @match      hi-bogo.net/*
// @match      *mybogo.net/*
// @copyright  seagreen
// ==/UserScript==

if (window.top != window.self)
  return;

$( "div#google-ad, div#logo-ad, div.ad_clix" ).remove();
$( "div#logo-right" ).css( "float", "right" );

$( "form:contains('꿈해몽')" ).remove();
$( "div#sidebar1 li:contains('보고보고 광고문의')" ).remove();
$( "div#sidebar2 li:contains('hibogo AD')" ).remove();

$( "li:has(a[href*='id='])" ).remove();
$( "li:has(a[href*='/ad/'])" ).remove();
$( "li:has(a[href*='dofor'])" ).remove();
$( "li:has(script[src*='realclick'])" ).remove();
$( "li:has(a[onclick^='visitWebBanner'])" ).remove();
$( "li:has(iframe[src*='_ad_'])" ).remove();
$( "li:has(script[src^='http://cas.criteo.com'])" ).remove();

$( "ul>ul:has(a[href*='ad.html'])" ).remove();

$( "div#sidebar1 li:has(iframe[src^='http://ads'])" ).remove();
$( "div#sidebar1 li:has(a[href*='/ad'])" ).remove();
$( "div#sidebar2 li:has(a[href*='/ad'])" ).remove();

$( "iframe[src*='id=']" ).remove();
$( "iframe[src*='dofor']" ).remove();
$( "iframe[src^='http://ads']" ).remove();

$( "script[src*='semanticrep']" ).remove();
$( "div[id*='soeaFrame']" ).remove();
$( "form[name^='adswap']" ).remove();

$( "tbody.num > tr:contains('광 고')" ).remove();
$( "tbody.num > tr:contains('[AD]')" ).remove();

$( "a.link[href$='||Y'] > span" ).css( {'background-color':'black','color':'white','border-radius':'2px','font-size':'120%','font-weight':'bold'} );
$( "img[src$='/tor.jpg']" ).remove();