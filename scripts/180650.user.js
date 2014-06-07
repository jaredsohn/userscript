// ==UserScript==
// @name       		Complexity Thread-sorter
// @author			Doctor Blue
// @namespace  		http://hackforums.net/
// @version    		0.2.1
// @description		This userscript will sort all threads in the Complexity subforum and group the sub-threads into different sections according to their prefixes
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include      	http://*.hackforums.net/forumdisplay.php?fid=276*
// @copyright  		2013
// ==/UserScript==

console.log("Sorting posts...");

// Get all threads into an array as DOMNodes
var threads = {official: [], announcements: [], gaming: [], programming: [], graphics: [], marketing: [], miscellaneous: []};

console.log($('tr:has(.forumdisplay_regular,.forumdisplay_sticky)').length + " matching elements");

// WORKAROUND
// Strip all scripts within the changed rows to ensure complete execution
$('tr:has(td.forumdisplay_regular,.forumdisplay_sticky)').find('script').remove();

$('tr:has(td.forumdisplay_regular,.forumdisplay_sticky)').map(function(){
    // Iterate through all table rows (threads)
    // Step through all the child elements to get the thread title
    sticky = false;
    if($(this).find('.subject_new,.subject_old').parent().parent().parent().hasClass("forumdisplay_sticky")){
        sticky = true;
    }
    prefix = $(this).find('.subject_new,.subject_old').prev().html();
    title = $(this).find('.subject_new,.subject_old').html().replace(/\&amp;/g, '&');
    
    // Sort into arrays
    if(prefix.indexOf("[Announcement]") !== -1 || sticky == true){
        if (sticky == true){
            $(this).css("background-color", "#444444");
            console.log("Sticky found");
        }
        threads.announcements.push($(this));
	}else if(prefix.indexOf("[Official]") !== -1){
        threads.official.push($(this));
    }else if(prefix.indexOf("[Gaming]") !== -1){
        threads.gaming.push($(this));
    }else if(prefix.indexOf("[Coding]") !== -1){
        threads.programming.push($(this));
    }else if(prefix.indexOf("[GFX]") !== -1){
        threads.graphics.push($(this));
    }else if(prefix.indexOf("[Marketing]") !== -1){
        threads.marketing.push($(this));
    }else{
        threads.miscellaneous.push($(this));
    }
});

// Add expand/collapse buttons to the two initial headers
//$header = $('tr:has(td.trow_sep):nth-child(1)').before('<td class="trow_sep"><img class="collapsebtn" id="forumdisplay_sticky" src="http://i.imgur.com/yFsE3J4.png"></td>');
//$header.next().before('<td class="trow_sep"><img class="collapsebtn" id="forumdisplay_normal" src="http://i.imgur.com/yFsE3J4.png"></td>');
$('.trow_sep').first().remove();
$('.trow_sep').first().remove();

if(threads.announcements.length){
    $last = $('<tr id="announcements_header"><td class="trow_sep" colspan="7">Announcements/Stickies</td></tr>').insertAfter('tr:has(.forumdisplay_regular,.forumdisplay_sticky):last');
    
    for (var i = 0; i < threads.announcements.length; i++){
        $last = threads.announcements[i].insertAfter($last).addClass("announcement");
    }
}

if(threads.official.length){
    $last = $('<tr id="official_header"><td class="trow_sep" colspan="7">Official</td></tr>').insertAfter('tr:has(.forumdisplay_regular,.forumdisplay_sticky):last');
    
    for (var i = 0; i < threads.official.length; i++){
        $last = threads.official[i].insertAfter($last).addClass("official");
    }
}

if(threads.programming.length){
    $last = $('<tr id="programming_header"><td class="trow_sep" colspan="7">Programming</td></tr>').insertAfter('tr:has(.forumdisplay_regular):last');
    
    for (var i = 0; i < threads.programming.length; i++){
        $last = threads.programming[i].insertAfter($last).addClass("programming");
    }
}

if(threads.gaming.length){
    $last = $('<tr id="gaming_header"><td class="trow_sep" colspan="7">Gaming</td></tr>').insertAfter('tr:has(.forumdisplay_regular):last');
    
    for (var i = 0; i < threads.gaming.length; i++){
        $last = threads.gaming[i].insertAfter($last).addClass("gaming");
    }
}


if(threads.graphics.length){
    $last = $('<tr id="graphics_header"><td class="trow_sep" colspan="7">Graphics</td></tr>').insertAfter('tr:has(.forumdisplay_regular):last');
    
    for (var i = 0; i < threads.graphics.length; i++){
        $last = threads.graphics[i].insertAfter($last).addClass("graphics");
    }
}

if(threads.marketing.length){
    $last = $('<tr id="marketing_header"><td class="trow_sep" colspan="7">Marketing</td></tr>').insertAfter('tr:has(.forumdisplay_regular):last');
    
    for (var i = 0; i < threads.marketing.length; i++){
        $last = threads.marketing[i].insertAfter($last).addClass("marketing");
    }
}

if(threads.miscellaneous.length){
    $last = $('<tr id="miscellaneous_header"><td class="trow_sep" colspan="7">Miscellaneous</td></tr>').insertAfter('tr:has(.forumdisplay_regular):last');
    
    for (var i = 0; i < threads.miscellaneous.length; i++){
        $last = threads.miscellaneous[i].insertAfter($last).addClass("miscellaneous");
    }
}