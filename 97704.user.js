// ==UserScript==
// @name           Auto Vote
// @namespace      Desktop
// @description    Automatically Votes for Cx
// @include        http://corruptionx.com/vote.php
// ==/UserScript==
var Div = document.getElementById("content").innerHTML;
function getContent(id) {
    return Div.charAt(id);
}
function getVoteID() {
    return document.getElementsByName("voteid").item(0).value;
}
var One = 597;
var Two = One + 1;
var Three = One + 2;
var Four = One + 3;
var Five = One + 4;
var Six = One + 5;
var AuthCode = (getContent(One)
    + getContent(Two)
    + getContent(Three)
    + getContent(Four)
    + getContent(Five)
    + getContent(Six)
    );
if (AuthCode == "      ") { // Vote Page
    window.open("http://corruptionx.com/vote.php?postback=" + getVoteID());
    setTimeout(document.forms.namedItem("voted").submit(), 1500);
} else if (AuthCode == "ctuall"){ // Note Voted
} else if (AuthCode == " hours"){ // Already Voted
} else { // Voted
}