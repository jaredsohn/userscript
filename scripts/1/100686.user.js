// ==UserScript==
// @name           Process Recorder Rewarder
// @namespace      http://matuszek.net/greasemonkey
// @description    Helps you blow right through the job of process recording
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        https://cf.umaryland.edu/ssw_fieldeducation/students/process_recording.cfm*
// ==/UserScript==

//  Thanks to Uzbekjon
//  http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }

  // Get object of URL parameters
  // var allVars = $.getUrlVars();

  // Getting URL var by its name
  // var byName = $.getUrlVar('name');

});

//  Thanks to cobbal
//  http://stackoverflow.com/questions/646628/javascript-startswith
function startsWith(data, input) {
    return (data.substr(0, input.length) === input);
}

var currentPRid = $.getUrlVar('prgroup');

//alert(currentPRid);

//  This is the HTML of the new row that is inserted into the table.
var replacement =
'<tr style="background-color: #CCFFCC; font-family: sans-serif;">' +
'    <td></td>' +
'    <td>' +
'      <select id="workerC_visible" name="workerClient">' +
'           <option value="c" selected>Client</option>' +
'           <option value="w">Worker</option>' +
'      </select></td>' +
'   <td><textarea id="content_visible"   style="width: 100%; padding:5px"></textarea></td>' +
'   <td><textarea id="skillUsed_visible" style="width: 100%; padding:5px"></textarea></td>' +
'   <td><textarea id="reaction_visible"  style="width: 100%; padding:5px"></textarea></td>' +
'   <td><textarea id="analysis_visible"  style="width: 100%; padding:5px"></textarea></td>' +
'   <td>' +
'      <form action="https://cf.umaryland.edu/ssw_fieldeducation/students/addProcessRecordingAct.cfm?prgroup=' + currentPRid + '" ' +
//'      <form action="https://cf.umaryland.edu/ssw_fieldeducation/students/addProcessRecordingAct.cfm?prgroup=6" ' +
//'      <form action="http://www.tipjar.com/cgi-bin/test?prgroup=' + currentPRid + '" ' +
//'      <form action="http://www.tipjar.com/cgi-bin/test" ' +
'          method="post" id="addPR" name="addPR">' +
'      <input id="workerC_hidden"   value=" " type="hidden" name="workerClient"/>' +
'      <input id="content_hidden"   value=" " type="hidden" name="content"     />' +
'      <input id="skillUsed_hidden" value=" " type="hidden" name="skillUsed"   />' +
'      <input id="reaction_hidden"  value=" " type="hidden" name="reaction"    />' +
'      <input id="analysis_hidden"  value=" " type="hidden" name="analysis"    />' +
'      <button type="submit" style="width: 100px; font-size: 200%;">Submit</button></form>' +
'   </td>' +
'</tr>';

//  Copies the values in the visible fields to the hidden fields --
//  this is a workaround for the fact that forms and tables don't
//  intersect well and the entire form must be in a single cell.
function copyVisibleToHidden() {

    //  the val() of a select is supposed to be its VALUE, not its text,
    //  but that is not what was happening. So I had to pull out the value
    //  by hand.

	var ohcomeon = startsWith($("#workerC_visible").val(), "W") ? "w" : "c";
	$("#workerC_hidden").val(ohcomeon);

	$("#content_hidden"  ).val(   $("#content_visible"  ).val()   );
	$("#skillUsed_hidden").val(   $("#skillUsed_visible").val()   );
	$("#reaction_hidden" ).val(   $("#reaction_visible" ).val()   );
	$("#analysis_hidden" ).val(   $("#analysis_visible" ).val()   );
}


//alert($().jquery); // check jQuery version


function replaceProcessRecordingLink()
{
	//  Find the second instance of the link to addProcessRecording.cfm?prgroup=6 (or whatever number)
	var tableRow = $('a[href*="addProcessRecording.cfm?prgroup="]').eq(1).parent().parent();

	//  Also find the previous row -- this has to happen before the replacement!
    var previousRow = tableRow.prev();

    //  and replace it with our row
    tableRow.replaceWith(replacement);

	//  Now we can figure out whether the previous entry was Worker or Client
    var secondCell = previousRow.children().eq(1);

	//  Whichever one it was, set the next row to be the opposite.
	if (secondCell.html() === "Client")
	{
		//GM_log("found client");
		$("#workerC_visible").val("Worker");
	}
	else if (secondCell.html() === "Worker")
	{
		//GM_log("found worker");
		$("#workerC_visible").val("Client");
	}
	else
	{
		//GM_log("dang");
	}

}
replaceProcessRecordingLink();

function scrollToNewLink()
{
	if( $("#content_visible").position()['top'] )
	{
		window.scrollTo(0, $("#content_visible").position()['top']);
	}
}
scrollToNewLink();

//  When the form is submitted, copy the values and continue with the submission
$('#addPR').submit(function() {

	copyVisibleToHidden();

	return true;
});


//  Thanks to James Padolsey
//  http://james.padolsey.com/javascript/jquery-plugin-autoresize/
(function($){

    $.fn.autoResize = function(options) {

        // Just some abstracted details,
        // to make plugin users happy:
        var settings = $.extend({
            onResize : function(){},
            animate : true,
            animateDuration : 150,
            animateCallback : function(){},
            extraSpace : 20,
            limit: 1000
        }, options);

        // Only textarea's auto-resize:
        this.filter('textarea').each(function(){

                // Get rid of scrollbars and disable WebKit resizing:
            var textarea = $(this).css({resize:'none','overflow-y':'hidden'}),

                // Cache original height, for use later:
                origHeight = textarea.height(),

                // Need clone of textarea, hidden off screen:
                clone = (function(){

                    // Properties which may effect space taken up by chracters:
                    var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
                        propOb = {};

                    // Create object of styles to apply:
                    $.each(props, function(i, prop){
                        propOb[prop] = textarea.css(prop);
                    });

                    // Clone the actual textarea removing unique properties
                    // and insert before original textarea:
                    return textarea.clone().removeAttr('id').removeAttr('name').css({
                        position: 'absolute',
                        top: 0,
                        left: -9999
                    }).css(propOb).attr('tabIndex','-1').insertBefore(textarea);

                })(),
                lastScrollTop = null,
                updateSize = function() {

                    // Prepare the clone:
                    clone.height(0).val($(this).val());
                    clone.scrollTop(10000);

                    //GM_log(clone.scrollTop());
                    //GM_log(origHeight);

                    // Find the height of text:
                    var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
                        toChange = $(this).add(clone);

                    // Don't do anything if scrollTip hasen't changed:
                    if (lastScrollTop === scrollTop) { return; }
                    lastScrollTop = scrollTop;

                    // Check for limit:
                    if ( scrollTop >= settings.limit ) {
                        $(this).css('overflow-y','');
                        return;
                    }
                    // Fire off callback:
                    settings.onResize.call(this);

                    // Either animate or directly apply height:
                    settings.animate && textarea.css('display') === 'block' ?
                        toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
                        : toChange.height(scrollTop);
                };

            // Bind namespaced handlers to appropriate events:
            textarea
                .unbind('.dynSiz')
                .bind('keyup.dynSiz', updateSize)
                .bind('keydown.dynSiz', updateSize)
                .bind('change.dynSiz', updateSize)
                .bind('paste', updateSize)
                .bind('input paste', updateSize);

        });

        // Chain:
        return this;
    };



})(jQuery);

$('textarea').autoResize();