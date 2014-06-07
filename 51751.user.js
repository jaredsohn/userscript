// ==UserScript==
// @name           TweetFilter
// @namespace      org.phpz.gm.TweetFilter
// @description    Twitter timeline filter.
// @version        1.0.3
// @author         Seven Yu
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var $, jQuery;
var timeoutId;

// run
loading();

function loading()
{
    unsafeWindow.jQuery ? init() : setTimeout(loading, 100);
}

function init()
{
    $ = jQuery = unsafeWindow.jQuery;
    createUI();
    bindEvents();
}

function createUI()
{
    $('#primary_nav').after('<hr /><h2 class="sidebar-title"><span>TweetFilter</span></h2>' +
        '<div id="tf_canvas" style="padding:5px 15px;">' +
        '<input id="tf_input" style="padding:3px;" /></div><hr />');

}

function bindEvents()
{
    $('#tf_input')
        .keydown(function(e)
        {
            clearTimeout(timeoutId);
        })
        .keyup(function(e)
        {
            if(27 == e.which) this.value = '';
            clearTimeout(timeoutId);
            timeoutId = setTimeout(filterTimeline, 500);
        });
    $('#tf_clean').click(function()
    {
        $('#tf_input').val('');
        showAll();
    });
}

function filterTimeline()
{
    var input = trim($('#tf_input').val());
    showAll();
    if(input == '' || input == '!')
        return;
    if(input.indexOf('!') == 0)
    {
        input = input.substring(1);
        $('#timeline li:contains(' + input + ')').hide();
    }
    else
    {
        $('#timeline li:not(:contains(' + input + '))').hide();
    }
}

function showAll()
{
    $('#timeline li').show();
}

function trim(str)
{
    return str.replace(/^\s+|\s+$/g, '');
}