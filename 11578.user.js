// ==UserScript==
// @name           DiggRatingExtender
// @namespace      http://www.neaveru.com/
// @version        0.3.1
// @date           2008-06-13
// @include           http://digg.com/*
// @include           http://*.digg.com/*
// ==/UserScript==

location.href = "javascript:(" + encodeURI(function() 
{
    if (!window.Comment || !window.diggComments) return;
    var diggCommentTransform = Comment.prototype.transform;
    var diggCommentUpdate = Comment.prototype.update;
    var setElementCommentStats = function(elem, up, down)
    {
	var count = up - down;
	elem.innerHTML = 
	    "<em>+" + up + "</em> - " +
	    down + " = " +
	    "<em>" + (count > 0 ? "+" : "") + count + "</em> diggs";
    }
    var neaveruCommentTransform = function()
    {
	var el = this.el.get(0);
	var div = el.getElementsByTagName("div")[0];
	var links = div.getElementsByTagName("a");
	var ratingLink = links[0];
	var upDownLink = links[1];
	var span = document.createElement("span");
	setElementCommentStats(span, this.content['diggs-up'], this.content['diggs-dn']);

	this.neaveruCommentStatSpan = span;
	for (var i = 0; i < links.length && i < 2; i++)
	    links[i].style.display = 'none';

	if (ratingLink && upDownLink)
	    div.insertBefore(span, div.firstChild);
    }
    var neaveruCommentUpdate = function(json)
    {
	setElementCommentStats(this.neaveruCommentStatSpan, json.up, json.down);
    }
    Comment.prototype.transform = function()
    {
	var rv = diggCommentTransform.apply(this, arguments);
	if (rv != false)
	    neaveruCommentTransform.apply(this, arguments);
	return rv;
    }
    Comment.prototype.update = function()
    {
	var rv = diggCommentUpdate.apply(this, arguments);
	neaveruCommentUpdate.apply(this, arguments);
	return rv;
    }
    for (var commentId in diggComments)
    {
	neaveruCommentTransform.apply(diggComments[commentId]);
    }
}) + ")()";
