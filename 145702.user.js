// ==UserScript==
// @name       Friendcodes show report article button.
// @namespace  http://friendcodes.com
// @version    1.0
// @description  Adds a report button to the article comments for Friendcodes.com
// @match      http://*friendcodes.*/forums/content/*
// @copyright  2012+, Hello2u
// ==/UserScript==

function getByClass (className, parent) {
    parent || (parent=document);
    var descendants=parent.getElementsByTagName('*'), i=-1, e, result=[];
    while (e=descendants[++i]) {
        ((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) && result.push(e);
    }
    return result;
}
var nodes = getByClass("postcontrols"), i=-1, node;
while (node=nodes[++i]) {
    var reportLink = document.createElement('a');
    var id_number = parseInt(node.parentNode.parentNode.id.replace('post_',''), 10);
    reportLink.setAttribute('onClick', 'document.location="report.php?p=' + id_number + '"');
    var reportBut = new Image();
    reportBut.src="http://static.friendcodes.com/images/buttons/report-40b.png";
    reportLink.appendChild(reportBut);
    node.appendChild(reportLink);
}