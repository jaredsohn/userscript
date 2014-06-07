// ==UserScript==
// @name       IBD Extensions
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  
// @match      http://research.investors.com/quotes/*
// @copyright  2012+, Stas Levich
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require    http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @resource   jqueryuicss http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/smoothness/jquery-ui.min.css
// ==/UserScript==

GM_addStyle (GM_getResourceText ("jqueryuicss"));
var buttonCss = 'margin:0px 3px 0px 3px !important;';
var buttonTextCss = 'padding:3px !important; font-size:10px !important;';
var buttonCloseTextCss = 'padding-top:1px !important; font-size:8px !important; ';

$(document).ready(function() {       
    //clearNotes();
    
    $("<div style='clear:both' /><br><div id='IBDExtensions' style='padding:5px; border:solid 1px #aaaaaa; z-index:1001;'></div><div style='clear:both' />").insertBefore('#Charts');
    $("#IBDExtensions").append("<h1 style='width:87px; font-size:12px; margin:-13px 0px 0px 5px; padding-left:2px; background:white;'>IBD Extensions<h1>")   
    
    $("#IBDExtensions").append("<div id='notes' style='' ></div>")
    renderNotes();
    
    $("#IBDExtensions").append("<div id='controls' style='width=100%; margin:7px 0px 0px;'></div>");
    
    $("#controls").append("<input id='newnote' style='height:15px; font-size:10px;' type='text' />")
    $("#controls").append("<div id='newnotebutton'  >Add</div>")
    $("#controls").append("<div id='clearall' >Clear all</div>")
    
    $("#newnotebutton").button({
    }).click(function () {
        var dt = new Date();
        GM_setValue($('#qteSymb').text() + ":" + guid(), $('#newnote').val() + "-:-" + $.datepicker.formatDate('mm/dd/yy', dt) + " " + dt.getHours() + ":" + dt.getMinutes());  
        renderNotes();
    }).attr('style', buttonCss).find('span.ui-button-text').attr('style', buttonTextCss);
    
    $("#clearall").button({
    }).click(function () {
        clearNotes($('#qteSymb').text());
        renderNotes();
    }).attr('style', buttonCss).find('span.ui-button-text').attr('style', buttonTextCss);
});

function renderNotes(){ 
    
    $('#notes').fadeOut('fast', function(){           
        $('#notes').empty();
        $.each(GM_listValues(), function(index, node) {            
            if (node.indexOf($('#qteSymb').text()) > -1)
            {
                var note = GM_getValue(node);
                $('#notes').append("<div style='width:100%; border-bottom:solid 1px #cccccc; padding:4px 1px 4px 2px;'><div class='delete' data-noteid='" + node + "' style='font-size:8px; padding: 1px;'>x</div><i>" + note.split('-:-')[1] + "</i><br />" + note.split('-:-')[0] + "</div>");		 
            }
        });
        
        $('.delete').button().click(function () {        
            GM_deleteValue($(this).data('noteid'));
            renderNotes();
        }).attr('style', buttonCss  + 'float:right;').find('span.ui-button-text').attr('style', buttonTextCss + buttonCloseTextCss);
        
        $('#notes').fadeIn('normal');
    });
};

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

function guid() {
    return s4() + s4() + s4() + s4();
};

function clearNotes(symbol)
{
    $.each(GM_listValues(), function(index, node) {
        if (node.indexOf(symbol) > -1)
        {
            GM_deleteValue(node);
        }
    });
};


