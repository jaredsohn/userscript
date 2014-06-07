// ==UserScript==
// @name ZippyTube
// @author Sebbern
// @description Adds a Zippyshare button to YouTube videos.
// @namespace tag:Sebbern
// @include http://www.youtube.com/watch?*
// ==/UserScript==

var img_src = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAAEcAAAAUCAYAAADfqiBGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFn' +
		'ZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/' +
		'IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6' +
		'bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8w' +
		'Mi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9y' +
		'Zy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIg' +
		'eG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDov' +
		'L25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20v' +
		'eGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9w' +
		'IENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTZFOUMwRDU3OEE5MTFFMEIy' +
		'OEREOEMzNjg5MDM4REYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTZFOUMwRDY3OEE5MTFFMEIy' +
		'OEREOEMzNjg5MDM4REYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlp' +
		'ZDpFNkU5QzBEMzc4QTkxMUUwQjI4REQ4QzM2ODkwMzhERiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRp' +
		'ZDpFNkU5QzBENDc4QTkxMUUwQjI4REQ4QzM2ODkwMzhERiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9y' +
		'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';

var z = document.createElement("button");
z.setAttribute("onclick", 'window.open("http://www.google.no/#q=' + escape(document.getElementById("eow-title").title) + ' site:zippyshare.com")');
z.setAttribute("title", "ZippyShare");
z.setAttribute("type", "button");
z.setAttribute("class", "yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip");
z.setAttribute("id", "zippyTube");

var l = document.createElement("img");
l.setAttribute("src", img_src);
z.appendChild(l);

document.getElementById("watch-actions").appendChild(z);