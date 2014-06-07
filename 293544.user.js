// ==UserScript==
// @name        Adds a link to merge with statsMaster
// @description Adds a link to merge with statsMaster
// @namespace   github_mat
// @include     https://github.com/graze/Web/*
// @version     1
// ==/UserScript==

statsMasterLink = $('.recently-pushed-branch-actions')[0].cloneNode(true);
cubeRepLink = $('.recently-pushed-branch-actions')[0].cloneNode(true);

statsMasterLink.childNodes[1].href = statsMasterLink.childNodes[1].href.replace('compare/', 'compare/statsMaster...');
statsMasterLink.childNodes[1].innerHTML = "statsMaster merge";

cubeRepLink.childNodes[1].href = cubeRepLink.childNodes[1].href.replace('compare/', 'compare/cubeReporting...');
cubeRepLink.childNodes[1].innerHTML = "cubeRep merge";

$('.recently-pushed-branch-actions')[0].parentNode.insertBefore(statsMasterLink);
$('.recently-pushed-branch-actions')[0].parentNode.insertBefore(cubeRepLink);
