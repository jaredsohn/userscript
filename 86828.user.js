// ==UserScript==
// @name          Youtube by date
// @namespace     youtube.com
// @description	Sorts youtube videos directly by date uploaded
// It doesn't work at youtube.com home
// @author        Valmen
// @include       *youtube.com/*
// @exclude      *sort=*
// ==/UserScript==

window.location=window.location+'&search_sort=video_date_uploaded'