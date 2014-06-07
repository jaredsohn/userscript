// ==UserScript==
// @name           Separate Parentheses
// @namespace      http://www.prism.gatech.edu/~mflaschen3
// @description    Automatically separates URLs from parentheses on Yahoo Answers form submission.  Prevents them from being linkified by Yahoo incorrectly.
// @include        http://answers.yahoo.*/question/*
// ==/UserScript==

var regex = /\(\s*((?:http|ftp)[^\s\(\)]+)\s*\)/g;
function fixURLs(boxes)
{
    for(var i = 0; i < boxes.length; i++)
    {
	boxes[i].value = boxes[i].value.replace(regex, "( $1 )");
    }
    return true;
}

var previewButton;
var form = document.evaluate("//form[@name = 'best_answer_template_form']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if(form)
{
    form.addEventListener("submit", function(){
	    var boxes = new Array();
	    boxes.push(document.getElementById("textarea2"));
	    boxes.push(document.getElementById("refer"));
	    fixURLs(boxes)}
	, false);
}
else if(previewButton = document.evaluate("//button[@name = 'preview-button']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue)
{
    var mainBox = document.getElementById("yan-answer-answer");
    var refBox = document.getElementById("yan-answer-source");
    mainBox.addEventListener("change", function(){
	    fixURLs([this]);
	}, false);
    refBox.addEventListener("change", function(){
	    fixURLs([this]);
	}, false);
}
