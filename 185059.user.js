// ==UserScript==
// @name        Disko Improved Extranet
// @namespace   http://www.disko.fr
// @description Some little improvement for the Disko Extranet
// @include     http://extranet.disko.fr/*
// @include     http://extranet-v1.disko.fr/*
// @version     1.1.0
// @grant       none
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @require     http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.4.0/moment.min.js
// ==/UserScript==

var _$ = jQuery.noConflict(true);

(function ($) {
    /**
     * Converts a duration (like 1:30 for example) to a duration in working
     * days, presuming a working is equal to 8 hours.
     *
     * @param {String} value
     *
     * @return {Float}
     */
    function convert(value) {
        if (value.indexOf(':') < 0) {
            return value;
        }
        
        var parts = value.split(':');
        var hours = parts[0];
        var minutes = parts[1];
        var result = parseInt(hours) * 0.125 + parseInt(minutes) * 0.0020833333333333;
        
        return Math.round(result * 100000) / 100000;
    }
    
    // Setup conversion of durations.
    $(document, 'iframe').on('change', '#temps_fiche', function (event) {
        var $this = $(this);
        
        $this.val(convert($this.val()));
    });
    $(document).on('change', '.modal-body input[type="text"]', function (event) {
        var $this = $(this);
        
        $this.val(convert($this.val()));
    });
    
    // Add "previous week" selection in the calendar.
    var $weekSelect = $('#sl-week');
    var thisWeekTimestamp = Date.parse($weekSelect[0][0].value);
    var previousWeekTimestamp = thisWeekTimestamp - (100 * 60 * 60 * 24 * 7 * 10);
    var value = moment(previousWeekTimestamp).format('YYYY-MM-DD');
    $weekSelect.prepend('<option value="' + value + '" data-href="/planning/calendar/view/2/' + value +'">Semaine précédente</option>');
    // Set the select on the new item if we are viewing the previous week.
    var pattern = '/planning/calendar/view/2/' + value;
    if (window.location.pathname.match(new RegExp(pattern, 'i'))) {
        $weekSelect.val(value);
    }
})(_$);
