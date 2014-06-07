(function () {

// ==UserScript==
// @name          Assembla, Better TimeEntry Edit 
// @namespace     http://localhost.localdomain
// @description   Provides additional link allowing to open edit form with possibility to chose space for the time entry
// @copyright     20014+, Przemek Polanski
// @version       0.0.2
//
// @include   https://www.assembla.com/spaces/*/time_entries*
//
// ==/UserScript==

    var $ = unsafeWindow.jQuery;
    $('div#export_details table tbody tr td a') .filter(function (index) {
        return $(this) .text() == 'Edit';
    }) .each(function (key, value) {
        var editAnchor = $(this);
        var betterEditHref = editAnchor.attr('href')
        betterEditHref = betterEditHref.replace(/spaces\/.*time_entries/,'user\/time_entry_edit');
        betterEditHref = betterEditHref.replace('/edit','');
        
        var newAnchor = editAnchor.clone(); 
        newAnchor.attr('href',betterEditHref);
        newAnchor.attr('target','_blank');
        newAnchor.text('Better Edit');
        editAnchor.before(newAnchor);
        editAnchor.before($('<span>&nbsp;|&nbsp;</span>'));
        
        //make the column little bit more wide
        $('div#export_details tr td:last-of-type').css('width', '150px');
        
    });
}) ();
