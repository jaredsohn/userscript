// ==UserScript==
// @name       AnidbImpr-mylist
// @namespace  terrukallan_scripts
// @version    0.3
// @description  Usability improvements for anidb mylist
// @match      http://anidb.net/perl-bin/*show=mylist*
// @copyright  2012 terrukallan
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

(function() {
    // Style definitions
    var unwatched = ".unwatched { font-weight: bold; } ";
    var hover = ".animelist tr:hover { background-color: #58636E; } ";
    
    // Apply all styles
    var style = unwatched;
    GM_addStyle(style);
    
    // Utility functions
    var parse = function(value) {
        var epsp = value.split("+");
        var part = epsp[0].split("/");
        return [parseInt(part[0]), parseInt(part[1]), parseInt(epsp[1])];
    };
    
    var parseSeen = function(value) {
        var val = parse(value);
        return {
            'seen': val[0],
            'have': val[1],
            'special': val[2]
        };
    };
    
    var parseEps = function(value) {
        var val = parse(value);
        return {
            'have': val[0],
            'total': val[1],
            'special': val[2]
        };
    };
    
    var insertSummaryRow = function($animeList) {
        var row = '<tr class="header summary">';
        row += '<th class="x"></th>';
        row += '<th class="s"></th>';
        row += '<th class="title"></th>';
        row += '<th class="eps"></th>';
        row += '<th class="seen"></th>';
        row += '<th class="rating"></th>';
        row += '<th class="my"></th>';
        row += '<th class="reviews"></th>';
        row += '<th class="aired"></th>';
        row += '<th class="last_update"></th>';
        row += '</tr>';
        
        var $summaryRow = $(row);
        
        if ($('tr.action', $animeList).length > 0) {            
            $('tr:last', $animeList).before($summaryRow);
        } else {
            $('tr:last', $animeList).after($summaryRow);
        }
        
        return $summaryRow;
    };
    
    var updateSummary = function(counts, $summaryRow) {
        $('.seen', $summaryRow).html(counts.seenEpCount + "/" + counts.haveEpCount);
        $('.title', $summaryRow).html('Count: ' + counts.showCount);
        $('.rating', $summaryRow).html('Unseen: ' + (counts.haveEpCount - counts.seenEpCount));
    };
    
    var getCounts = function($rows) {
        var seenEpCount = 0;
        var haveEpCount = 0;
        var showCount = 0;
        $rows.each(function() {
            showCount++;
            
            var $row = $(this);
            var $eps = $('td.eps', $row);
            var $seen = $('td.seen', $row);
            var seen = parseSeen($seen.html());
            var eps = parseEps($eps.html());
            seenEpCount += seen.seen;
            haveEpCount += seen.have;
            
            if (seen.have > seen.seen) {
                $row.addClass('unwatched');
            } else {
                $row.removeClass('unwatched');
            }
        });
        return {
            'seenEpCount': seenEpCount,
            'haveEpCount': haveEpCount,
            'showCount': showCount
        };
    };
    
    // Main work
    var $animeList = $('table.animelist');
    var $rows = $('tr', $animeList).not('.header').not('.action');
    
    // Initial update
    var $summaryRow = insertSummaryRow($animeList);
    var counts = getCounts($rows);
    updateSummary(counts, $summaryRow);
    
    // Listeners for updates
    $('a.i_icon', $animeList).live('click', function() {
        var counts = getCounts($rows);
        updateSummary(counts, $summaryRow);
    });
})();