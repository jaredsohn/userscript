// ==UserScript==
// @name           Craigslist Keywords
// @version        0.1
// @author         Wil Langford, userscripts@trustissues.net
// @namespace      http://fanglord.net/wiki/
// @description    Highlight key words on craigslist (based on Craigslist Personal Ads "Curvy Detector" by Donny Viszneki)
// @include        http://*.craigslist.org/*
// ==/UserScript==

/* Yellow */
document.body.innerHTML = document.body.innerHTML.replace(

/(full|partial|bath)/ig

,function(s){return '<span style="background:#FFFFaa">'+s+'</span>'});

/* Red */
document.body.innerHTML = document.body.innerHTML.replace(

/(gresham|sandy|hillsboro|wilsonville|university of portland|1\.5 ?b[a-z]*|1\.0 ?b[a-z]*|\d\d\d\d\d [ns][ew]|[67890]\d\d\d [ns][ew]|st\.? johns|townho(me|use)|condo)/ig

,function(s){return '<span style="background:#FFaaaa">'+s+'</span>'});

/* Green */
document.body.innerHTML = document.body.innerHTML.replace(

/(A\/C|air conditioning|[^0-9][12345]\d\d\d [ns][ew]|[^0-9]\d\d\d [ns][ew]|PSU)/ig

,function(s){return '<span style="background:#aaFFaa">'+s+'</span>'});

