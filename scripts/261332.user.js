// ==UserScript==
// @name        Elance: Remove Not Sure Posted Jobs
// @namespace   elance
// @description Removes posted jobs with price set to "Not sure", either fixed price or hourly rate.
// @include     *elance.com/*
// @version     1
// ==/UserScript==

var job_list = document.body.querySelectorAll('.jobCard .stats > span')
for (var i = 0, curlen = job_list.length; i < curlen; i++) {
 var current_span = job_list[i]
 var span_content = current_span.innerHTML.trim()
 if ((span_content == "Fixed Price: Not Sure") || (span_content == "Hourly Rate: Not Sure")) current_span.parentNode.style.display = "none"
}