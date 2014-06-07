// ==UserScript==
// @name       Issue Builder Box Size
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  makes the boxes in issue builder bigger
// @match      http://*.com/cms/Modules/IMG/ContentHero/Issue/IssueBuilder.aspx
// @copyright  2012+, You
// ==/UserScript==
var boxes = document.getElementsByTagName("select");
console.log(boxes.length);
for (var i= 1; i <boxes.length; i++){
    boxes[i].setAttribute("style", "height:220px;");
}