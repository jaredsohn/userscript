// ==UserScript==
// @name           Digg Comment Colorizer
// @namespace      http://www.neaveru.com/
// @version        0.1
// @date           2008-05-17
// @include           http://digg.com/*
// @include           http://*.digg.com/*
// ==/UserScript==

//Feel free to edit the values before or add more colors
var colors = ["#F3F6F9", "#FFFFFF"];

//The rest of this you probably shouldn't mess with

var colorCount = colors.length;
for (var i = 0; i < colorCount; i++)
    GM_addStyle(".diggCommentColorizer" + i + " { background-color: " + colors[i] + ";}");

location.href = "javascript:(" + encodeURI(function() 
{
    if (!window.Comment || !window.diggComments) return;
    var diggCommentTransform = Comment.prototype.transform;
    var dccCommentTransform = function()
    {
	var commentObj = this.el;
	var parentObj = commentObj.parent(0);
	var currentColor = parseInt(parentObj.attr("currentColor")) || 0;
	commentObj.addClass("diggCommentColorizer" + currentColor);
	parentObj.attr({currentColor : ((currentColor + 1) % 2)});
    }
    Comment.prototype.transform = function()
    {
	var rv = diggCommentTransform.apply(this, arguments);
	dccCommentTransform.apply(this);
	return rv;
    }
    for (var commentId in diggComments)
	dccCommentTransform.call(diggComments[commentId]);
}) + ")()";
