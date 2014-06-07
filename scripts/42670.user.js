// ==UserScript==
// @name           TheVistaForumsFix
// @namespace      http://userscripts.org/users/81164
// @description    Remove stupid navbar on left side.
// @include        http://thevistaforums.com/*
// @include        http://*.thevistaforums.com/*
// @include        http://thevistaforums.com
// ==/UserScript==


var ientrycrap = [
"//table[@class='ientry-left-col']",
"//div[@id='ipbwrapper']/div[9]",
"//body/div[@class='top-ientry-bar']",
"//object[@id='ad']",
"//div[@id='ipbwrapper']/div[@class='ientry-ipbcolumn']/div[@class='vistasoftware']/a/img",
"//table[tbody/tr/td/@class='topbarad']",
];


function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}


ientrycrap.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
                item.parentNode.removeChild(item);
            }
        );
    }
);

$x("//div[@id='ipbwrapper']/div[@class='ientry-ipbcolumn']").forEach(function(ad1) {
	ad1.style.margin = '0px';
});


$x("//table[@class='ipbtable']").forEach(function(ad2) {
	ad2.style.width = '100%';
});