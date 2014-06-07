// ==UserScript==
// @name       Rift Order Tracker
// @version    0.4
// @description  Filters down the large list of riftorders to only include the user_alias defined.
// @match      http://riftorders.aws.af.cm/*
// @copyright  2013+, Nick Bisby
// ==/UserScript==

// Set this to the alias line you are looking to watch.
var user_alias = "bisbyx";
var me = $("tr:contains("+user_alias+")");
me.addClass("myorder");
var not_me = $("tr:not(:first):not(.myorder)");

// Removes extraneous data
var cleanup = true;

// Start with everything hidden that isn't me
not_me.css('display', 'none');

// cleanup if defined
if (cleanup) {
    $("tr").each(function() {
        // Remove adjusted order #
        var orig_number = $(this).children().filter("td:eq(1)").html().split(" (")[0];
        $(this).children().filter("td:eq(1)").html(orig_number);
        // Remove date columns
        $(this).children().filter("td:eq(3),td:eq(4),td:eq(5)").remove();
    });
    
}


// This section adds a toggle button to remove the filter temporarily
var filter_on = true;
$('body').append("<button type='button' id='filter_toggle' style='position: fixed; top: 2%; right: 2%;'>Toggle</button>");
$('#filter_toggle').click( function() {
    if (filter_on) {
      not_me.css('display', '');
    } else {
      not_me.css('display', 'none');
    }
    filter_on = !filter_on;
});