// ==UserScript==
// @name       Github Pull Request Review Helper Thingy by Jeremy Wentworth
// @namespace  http://spidasoftware.com/
// @version    0.1
// @description  Give some order to your pull request
// @match      https://github.com/*/*/pull/*
// @copyright  2013+, Jeremy Wentworth (SPIDAWeb)
// @require http://code.jquery.com/jquery-latest.js
// @require http://code.jquery.com/ui/1.10.3/jquery-ui.js
// ==/UserScript==

///////////////////////////////////////////////////////////////
// Style
///////////////////////////////////////////////////////////////
$(".container").width("90%");
$("#js-repo-pjax-container").width("90%");
$(".meta").css("padding","0px 10px");
$(".file").css("margin-bottom","3px");


///////////////////////////////////////////////////////////////
// DnD Sort
///////////////////////////////////////////////////////////////
$("#files").sortable({
    cursor: "move",
    handle: ".handle",
	start: function( event, ui ) {},
    stop: function( event, ui ) {}
});


///////////////////////////////////////////////////////////////
// Toggle data view for all files
///////////////////////////////////////////////////////////////
$('<a>',{
    text: 'Show Data',
    class: 'minibutton',
    style: 'margin-left:10px;',
    title: 'Show Data',
    href: '#',
    click: function(){ 
		$(".data").show()
    }
}).insertBefore($(".show-diff-stats"));

$('<a>',{
    text: 'Hide Data',
    class: 'minibutton',
    style: 'margin-left:10px;',
    title: 'File Data',
    href: '#',
    click: function(){ 
		$(".data").hide()
    }
}).insertBefore($(".show-diff-stats"));


///////////////////////////////////////////////////////////////
// Buttons for each file
///////////////////////////////////////////////////////////////
var bodyTag = $('body');
var filesContainer = $("#files");
$(".file").each(function(){
    var fileDiv = $(this);
    var actionsDiv = fileDiv.find(".actions");
    var dataDiv = fileDiv.find(".data");
    
    $('<a>',{
        text: 'Data',
	    class: 'minibutton',
        style: '',
        title: 'Toggle',
        href: '#',
        click: function(){ 
            dataDiv.toggle();
            return false;
        }
	}).appendTo(actionsDiv);
    
    $('<a>',{
        text: 'Top',
	    class: 'minibutton',
        style: '',
        title: 'Moves File to Top',
        href: '#',
        click: function(){ 
            fileDiv.detach(); 
			filesContainer.prepend(fileDiv);
            return false;
        }
	}).appendTo(actionsDiv);
    
    $('<a>',{
        text: 'Bottom',
	    class: 'minibutton',
        style: '',
        title: 'Moves File to Bottom',
        href: '#',
        click: function(){ 
            fileDiv.detach(); 
			filesContainer.append(fileDiv);
            return false;
        }
	}).appendTo(actionsDiv);
    
    $('<div>',{
        text: '☰',
        class: 'handle',
        style: '',
        style: 'font-size:20px; display: inline-block; line-height:20px; padding-left:10px; cursor:move;'
	}).appendTo(actionsDiv);
    
});
