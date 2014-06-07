// ==UserScript==
// @name          	Chrome no-resize
// @description		Stop Chrome automatic image-resizing
// @version		1.2.0
// @include		http://*
// @match		http://*
// ==/UserScript==


img[style="-webkit-user-select: none; cursor: -webkit-zoom-in;"]{
width: auto !important;
height: auto !important;
}
