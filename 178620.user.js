// ==UserScript==
// @name                MTurk Qualifications Wrapper
// @author              Chet Manley
// @version             0.1
// @description         Word-wraps long qualifications.
// @include             https://www.mturk.com/mturk/*
// @require             http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// v0.1, 2013-09-25     Automatically word-wraps long qualifications.
//                      ---------------------------------------------------------------------------

$('#qualifications\\.tooltip').parent().parent().children('.capsule_field_text').removeAttr('nowrap');