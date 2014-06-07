// ==UserScript==
// @name           deviantART deviations zoomed in by default
// @namespace      http://henrik.nyh.se
// @description    Shows full size deviantART deviations by default, rather than reduced size images. Still shows the reduced size if the full size image is wider than the viewport or taller than twice its height.
// @include        http://www.deviantart.com/deviation/*
// @include        http://www.deviantart.com/view/*
// ==/UserScript==

var devWidth = unsafeWindow.deviantART.pageData.fullview.width;
var devHeight = unsafeWindow.deviantART.pageData.fullview.height;
var portWidth = self.innerWidth;
var portHeight = self.innerHeight;

if (devWidth <= portWidth && devHeight <= portHeight*2)
	unsafeWindow.Deviation.zoomIn();