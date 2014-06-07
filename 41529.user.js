// ==UserScript==
// @name          PipelineDeals Show All Notes
// @namespace     PipelineDeals
// @description   Provides a "Show/Hide All" link for contact notes
// @include       https://www.pipelinedeals.com/contacts/*
// @include       http://www.pipelinedeals.com/contacts/*
// ==/UserScript==

var $ = unsafeWindow.$;

if($('content')) {
  // For the contact details page
  $('content').down(".section",1).insert(
    {"top" : "<a href='javascript:;' onClick='$$(\"#notes_table .odd .dealnote\").each(function(el) { el.toggle(); });' style='float: right; margin-top: 2px;'>Show/Hide All</a>"}
  );
} else if ($('recent_notes')) {
  // For the company details page
  $('recent_notes').insert(
    {"top" : "<a href='javascript:;' onClick='$$(\"#notes_table .odd .dealnote\").each(function(el) { el.toggle(); });' style='float: right; margin-top: 10px;'>Show/Hide All</a>"}
  );
}

