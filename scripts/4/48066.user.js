// ==UserScript==
// @name           ALT - Old Man View Profile
// @namespace      http://home.myspace.com/index.cfm?fuseaction=user*
// @include        http://alt.com/p/member.cgi*
// Version         1.5.5.2 05-03-2009
// Desc             I have trouble seeing the website for long time b/c of the black background.  I change the colors so I can see longer.  :)
// ==/UserScript==




GM_addStyle("a { color: blue !important;}");

Changestyle("body");
Changestyle("div");
Changestyle("table");
Changestyle("td");
Changestyle("tr");
Changestyle("span");
Changestyle("p");



//Funcation START
function Changestyle(Item) {
    GM_addStyle(Item + " {color: black !important; background-color: white !important; }");
}

