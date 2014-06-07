// ==UserScript==
// @name           LUELinks Religion Truthifier
// @author         EKY
// @description    Improves discussions of religion on a website that doesn't exist
// @include        http://endoftheinter.net/*
// @include        https://endoftheinter.net/*
// @include        http://boards.endoftheinter.net/*
// @include        https://boards.endoftheinter.net/*
// ==/UserScript==

(function() {
var replacements, regex, key, textnodes, node, s;
textnodes = document.evaluate( "//body//text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
node = textnodes.snapshotItem(i);
if(node != null && node.nodeName == '#text' && /\S/.test(node.nodeValue))
{

s = node.data;

s = s.replace( /\bMuslims\b/g, "religious people");
s = s.replace( /\bChristians\b/g, "religious people");
s = s.replace( /\bJews\b/g, "religious people");
s = s.replace( /\bmuslims\b/g, "religious people");
s = s.replace( /\bMusLLims\b/g, "religious people");
s = s.replace( /\bmusLLims\b/g, "religious people");
s = s.replace( /\bchristians\b/g, "religious people");
s = s.replace( /\bjews\b/g, "religious people");

s = s.replace( /\bMuslim\b/g, "religious");
s = s.replace( /\bmuslim\b/g, "religious");
s = s.replace( /\bMusLLim\b/g, "religious");
s = s.replace( /\bmusLLim\b/g, "religious");
s = s.replace( /\bchristian\b/g, "religious");
s = s.replace( /\bChristian\b/g, "religious");
s = s.replace( /\bJewish\b/g, "religious");
s = s.replace( /\bjewish\b/g, "religious");
s = s.replace( /\bJudaic\b/g, "religious");
s = s.replace( /\bjudaic\b/g, "religious");
s = s.replace( /\bIslamic\b/g, "religious");
s = s.replace( /\bislamic\b/g, "religious");
s = s.replace( /\bIsLLamic\b/g, "religious");
s = s.replace( /\bisLLamic\b/g, "religious");

s = s.replace( /\bIslam\b/g, "religion");
s = s.replace( /\bislam\b/g, "religion");
s = s.replace( /\bChristianity\b/g, "religion");
s = s.replace( /\bchristianity\b/g, "religion");
s = s.replace( /\bJudaism\b/g, "religion");
s = s.replace( /\bjudaism\b/g, "religion");
s = s.replace( /\bIsLLam\b/g, "religion");
s = s.replace( /\bisLLam\b/g, "religion");

s = s.replace( /\bJesus\b/g, "a wizard");
s = s.replace( /\bjesus\b/g, "a wizard");
s = s.replace( /\bMoses\b/g, "a wizard");
s = s.replace( /\bmoses\b/g, "a wizard");
s = s.replace( /\bMuhammed\b/g, "a wizard");
s = s.replace( /\bmuhammed\b/g, "a wizard");
s = s.replace( /\bMohammed\b/g, "a wizard");
s = s.replace( /\bmohammed\b/g, "a wizard");
s = s.replace( /\bMuhammad\b/g, "a wizard");
s = s.replace( /\bmuhammad\b/g, "a wizard");
s = s.replace( /\bMohammad\b/g, "a wizard");
s = s.replace( /\bmohammad\b/g, "a wizard");

s = s.replace( /\bBible\b/g, "Book Of Fairy Tales");
s = s.replace( /\bbible\b/g, "Book Of Fairy Tales");
s = s.replace( /\bTorah\b/g, "Book Of Fairy Tales");
s = s.replace( /\btorah\b/g, "Book Of Fairy Tales");
s = s.replace( /\bTalmud\b/g, "Book Of Fairy Tales");
s = s.replace( /\btalmud\b/g, "Book Of Fairy Tales");
s = s.replace( /\bKoran\b/g, "Book Of Fairy Tales");
s = s.replace( /\bkoran\b/g, "Book Of Fairy Tales");
s = s.replace( /\bKuran\b/g, "Book Of Fairy Tales");
s = s.replace( /\bkuran\b/g, "Book Of Fairy Tales");
s = s.replace( /\bQuran\b/g, "Book Of Fairy Tales");
s = s.replace( /\bquran\b/g, "Book Of Fairy Tales");
s = s.replace( /\bQuron\b/g, "Book Of Fairy Tales");
s = s.replace( /\bquron\b/g, "Book Of Fairy Tales");

node.data = s;

}} })();