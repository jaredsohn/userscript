// ==UserScript==
// @name        Improved Slashdot Beta
// @namespace   slashdotbeta.chrishendry.com
// @description Preliminary enhancements for the new Slashdot Beta
// @include     http://*beta.slashdot.org/
// @include     http://*beta.slashdot.org/?*
// @include     http://*beta.slashdot.org/allstories
// @include     http://*beta.slashdot.org/stories
// @include     http://*beta.slashdot.org/recent
// @include     http://*beta.slashdot.org/mostdiscussed
// @include     http://*beta.slashdot.org/story/*
// @include     http://*beta.slashdot.org/stories/*
// @include     http://*beta.slashdot.org/poll/*
// @include     http://*beta.slashdot.org/~*
// @version     0.5.1
// @grant       unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(document).ready(function(){
   
    $('.menu.menu-views a').click(triggerResize);
    $(".layout-article").click(function(e){
		var storyBody = $(this).children(":not('.story-header')");
        storyBody.toggle();
    });
	$(window).resize(triggerResize);
    triggerResize();

});

function triggerResize(){
    var viewMode = $('#view-standard, #view-headline, #view-classic').attr('id');
    var maxWidth = $(window).width();
    var rightColWidth = $('.col-rail.pull-right').width();
    var leftColWidth = maxWidth - rightColWidth;

    //console.log(viewMode);
    if(viewMode == 'view-standard'){ viewStandard(maxWidth, leftColWidth); } 
    else if(viewMode == 'view-headline'){ viewHeadline(maxWidth, leftColWidth); } 
    else if(viewMode == 'view-classic' || 1){ viewClassic(maxWidth, leftColWidth); } 
}

function viewStandard(maxWidth, leftColWidth){
    $(".layout-article:not('.poll, .feature-hero')").css('display', 'inline-block').css('max-width', '625px');
    $(".feature-hero").css('max-width', '625px').hide();
    $('.container, .col-river.pull-left, .col-river.pull-right').css('max-width', maxWidth+'px');
    $('.col-river.pull-left').css('width', leftColWidth+'px');
    $('.col-river.pull-right').css('width', leftColWidth+'px');
}

function viewHeadline(maxWidth, leftColWidth){
    $('.layout-article').css('display', 'block').css('max-width', 'none');
    $('.container, .col-river.pull-left, .col-river.pull-right').css('max-width', maxWidth+'px');
    $('.col-river.pull-left').css('width', leftColWidth+'px');
    $('.col-river.pull-right').css('width', leftColWidth+'px');
}


function viewClassic(maxWidth, leftColWidth){

    var collapse = $("<div>");
    collapse.attr('id', 'collapser').css('width', '19px').css('height', '19px')
    .css('position', 'absolute').css('top', '5px').css('right', '29px')
    .css("background", "#ccc").attr("title", "Toggle Collapse")
    .click(function(){ $('.layout-article').children(":not('.story-header')").toggle(); });

    $('ul.menu-filter').append(collapse);
    $('.story-header a').click(function(e){ e.stopPropagation(); });
    $('.layout-article').css('float', 'none').css('max-width', 'none');
    $('.container, .col-river.pull-left, .col-river.pull-right').css('max-width', maxWidth+'px');
    $('.col-river.pull-left').css('width', leftColWidth+'px');
    $('.col-river.pull-right').css('width', leftColWidth+'px');
    
}