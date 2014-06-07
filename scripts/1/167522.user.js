// ==UserScript==
// @name		MrRobot - Wowhead links
// @namespace		http://www.servme.fr/userscripts/mr.robot.wowhead
// @version		0.5
// @description		Adds link on wowhead
// @match		http://www.askmrrobot.com/wow/gear/*
// @require		http://code.jquery.com/jquery-1.7.2.min.js
// @copyright		thelan
// ==/UserScript==

// History
//  - 0.5  some optimisations
//  - 0.4  Adding links for Gems
//  - 0.3  Public release
//  - 0.2  Adding FR link
//  - 0.1  Initial private release

var wnd = $.browser.mozilla ? window : unsafeWindow;
var isTopWindow = $.browser.mozilla ? wnd == wnd.parent : wnd == top;
var displayHtmlLogging = isTopWindow && $.browser.mozilla; // || $.broswer.msie;

if(wnd == 'undefined')
{
    console.log('Error: window-object not found.');
    alert('Error: window-object not found.');
    return;
}

if (!isTopWindow)
{
	console.log('Detected that the script is being loaded in an iframe, exiting.');
	return;
}

if(typeof($) === 'undefined')
{
    console.log('jQuery not found.');
    return;
}

// Add some jquery

jQuery.fn.watch = function( id, fn ) {
 
    return this.each(function(){
 
        var self = this;
 
        var oldVal = self[id];
        $(self).data(
            'watch_timer',
            setInterval(function(){
                if (self[id] !== oldVal) {
                    fn.call(self, id, oldVal, self[id]);
                    oldVal = self[id];
                }
            }, 100)
        );
 
    });
 
    return self;
};
 
jQuery.fn.unwatch = function( id ) {
 
    return this.each(function(){
        clearInterval( $(this).data('watch_timer') );
    });
 
};
 
// Plus, I finally found use for jQuery.data()! ;)
// end

$(document).ready(function(){	
    $('#panelGearEditorList').attr({xscript_parsing : false});
    
    $('#panelGearEditorList').watch('innerHTML', function(propName, oldVal, newVal){
	if(newVal != "")
	{
        if($('#panelGearEditorList').attr('xscript_parsing') == "false"){
            $('#panelGearEditorList').attr({xscript_parsing : true});
	  		AddWowHeadLinksGearEditor();
        }
	}
	});
});

function AddWowHeadLinksGearEditor(){
	// For items
	orig_link_elements = $('#panelGearEditorList > div.item');
    try {
 		for(i = 0; i < orig_link_elements.length; i++)
 		{		
            curitem = $(orig_link_elements[i]);
    		itemid = curitem.attr('data-tr-val')
			new_uri = 'http://www.wowhead.com/item='+itemid;
			new_fr_uri = 'http://fr.wowhead.com/item='+itemid;
			curitem.find('div.link').append(" - ").append($('<a>Wowhead</a>').attr({ href: new_uri, target: "_blank"}))
			.append(" - ").append($('<a>Wowhead FR</a>').attr({ href: new_fr_uri, target: "_blank"}));
 		}
    }catch(e)
    {
    }
	
	// For gems
	orig_link_elements = $('#panelGearEditorList > div.gem');
    try {
 		for(i = 0; i < orig_link_elements.length; i++)
 		{		
            curitem = $(orig_link_elements[i]);
    		itemid = curitem.attr('data-tr-val')
			new_uri = 'http://www.wowhead.com/item='+itemid;
			new_fr_uri = 'http://fr.wowhead.com/item='+itemid;
			curitem.append($('<div class="link"></div>'))
			curitem.find('div.link').append($('<a>Wowhead</a>').attr({ href: new_uri, target: "_blank"}))
			.append(" - ").append($('<a>Wowhead FR</a>').attr({ href: new_fr_uri, target: "_blank"}));
 		}
    }catch(e)
    {
    }
	
    $('#panelGearEditorList').attr({xscript_parsing : false});
}