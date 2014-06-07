// ==UserScript==
// @name           Full width for widescreen drupal.org
// @version        0.2
// @description    No Limits! Expand the d.o grid layout to better fit your widescreen
// @include        http://drupal.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @copyright      2011 eMPee584
// ==/UserScript==

flex=$('.container-12,.grid-12,.grid-8,.grid-4,.views-field').not('#header *').width('auto');
flex.filter('.container-12').width('97%');
flex.filter('.grid-8').width('65%');
flex.filter('.grid-4').width('30%');
flex.filter('.node-type-project-issue .container-12,.node-type-project-project .container-12').width('70%');
$('.homebox-column-wrapper').width('32%');
$('.views-field-title').width('30%');
$('.views-field-priority').hide();
$('.views-field-name').hide();

