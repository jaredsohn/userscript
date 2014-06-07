// ==UserScript==
// @name          Youtube this month
// @namespace     youtube.com
// @description	Sorts youtube videos directly loaded on current
// month (ascending). It doesn't work at youtube.com home
// @author        Valmen
// @include       *youtube.com/*
// @exclude      *sort=*
// ==/UserScript==

window.location=window.location+'&search_sort=video_date_uploaded&uploaded=m'