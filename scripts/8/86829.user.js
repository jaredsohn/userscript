// ==UserScript==
// @name          Youtube by count
// @namespace     youtube.com
// @description	Sorts youtube videos directly by view count
// It doesn't work at youtube.com home
// @author        Valmen
// @include       *youtube.com/*
// @exclude      *sort=*
// ==/UserScript==

window.location=window.location+'&search_sort=video_view_count'