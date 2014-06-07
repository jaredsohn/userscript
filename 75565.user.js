// ==UserScript==
// @name           Mousehunt forum filter
// @namespace      http://www.john-bloch.com/mhff
// @description    Replaces commonly misspelled words on the MouseHunt Forums
// @include        http://www.facebook.com/topic.php*
// @include        http://apps.facebook.com/mousehunt/traderequest.php
// @include        http://apps.facebook.com/mousehunt/boards.php
// @include        http://www.facebook.com/board.php?app_id=10337532241*
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

s = s.replace( /\bjuz\b/gi, "just");
s = s.replace( /\bdun\b/gi, "don't");
s = s.replace( /\bhaf\b/gi, "have");
s = s.replace( /\bu\b/gi, "you");
s = s.replace( /\bsry\b/gi, "sorry");
s = s.replace( /\bdint\b/gi, "didn't");
s = s.replace( /\bcuz\b/gi, "cause");
s = s.replace( /\bbcuz\b/gi, "because");
s = s.replace( /\bwad\b/gi, "what");
s = s.replace( /\bwat\b/gi, "what");
s = s.replace( /\bwit\b/gi, "with");
s = s.replace( /\bwot\b/gi, "what");
s = s.replace( /\br\b/gi, "are");
s = s.replace( /\bsum\b/gi, "some");
s = s.replace( /\bsum1\b/gi, "someone");
s = s.replace( /\bwif\b/gi, "with");
s = s.replace( /\bcoz\b/gi, "cause");
s = s.replace( /\bbcoz\b/gi, "because");
s = s.replace( /\bnid\b/gi, "need");
s = s.replace( /\bplz\b/gi, "please");
s = s.replace( /\bpls\b/gi, "please");
s = s.replace( /\bplis\b/gi, "please");
s = s.replace( /\blol\b/gi, "");
s = s.replace( /\bgd\b/gi, "good");
s = s.replace( /\bgud\b/gi, "good");
s = s.replace( /\btiki\b/gi, "tribal");
s = s.replace( /\bill\b/gi, "I'll");
s = s.replace( /\bthx\b/gi, "thanks");
s = s.replace( /\bc\b/gi, "see");
s = s.replace( /\bur\b/gi, "your");
s = s.replace( /\bppl\b/gi, "people");
s = s.replace( /\bsrry\b/gi, "sorry");
//s = s.replace( /\b\b/gi, "");

node.data = s;

}} })();
