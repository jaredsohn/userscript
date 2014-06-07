// ==UserScript==
// @name           Hoptoad Textmate Backtrace
// @namespace      hoptoad
// @description    Add textmate links to application stacktrace lines on error pages
// @include        https://*.hoptoadapp.com/errors/*
// ==/UserScript==

//
// based on original script from http://userscripts.org/scripts/show/63465
// with much help from @orta
//

// make sure jQuery 
!window.jQuery && document.write(unescape('%3Cscript src="//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js"%3E%3C/script%3E'))

//update the path below to match the common parent directory of all your applications
var project_parent_directory ='/Users/dave/projects/wgrids/'

// github links are nicely marked up in hoptoad
var github_links = jQuery("a.github-link")[0]

//pull the github project name from the github link
var project_name =   jQuery(github_links).attr("href").split('/')[4]

jQuery("a.github-link").each(function(index,item) {
  var i = item.text.split(':')
  jQuery(item).attr("href", "txmt://open?url=file://" + project_parent_directory + project_name + "/" + i[0] + "&line=" + i[1])
})