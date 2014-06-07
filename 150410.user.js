// ==UserScript==
// @name        Pluralsight CourseList Sorter
// @description This script will simply gives you the ability to sort the courses list on the main Pluralsight courses list by any column. or even filter courses according to any criteria you want (Course name, Author, Release month, Level).
// @namespace   MohammedElSayed
// @include     http://*.pluralsight.com/training/Courses/NewReleases
// @include     http://pluralsight.com/training/Courses/NewReleases
// @include     http://pluralsight.com/training/Authors/Details/*
// @include     http://*.pluralsight.com/training/Authors/Details/*
// @version     1.5
// ==/UserScript==
$.getScript('http://tablesorter.com/__jquery.tablesorter.min.js'
, function(data, textStatus, jqxhr){
$("table").addClass('tablesorter').tablesorter();
});

$.getScript('http://github.com/PicNet/picnet_closure_repo/raw/master/picnet.table.filter.min.js'
, function(data, textStatus, jqxhr){
$("table").tableFilter();
});