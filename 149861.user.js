// ==UserScript==
// @name       Primo by Ex Libris Search Result Adder
// @namespace  http://twitter.com/spike2050
// @version    0.1.7
// @description  Adds description and endless scrolling to Primo by Ex Libris Search Results
// @match      http://*/primo_library/libweb/action/search.do*
// @require    http://code.jquery.com/jquery-1.7.2.min.js
// @copyright  2012+, You
// ==/UserScript==

var jq_window = $(window);

function load_descriptions_and_nr() {
    $('div#resultsListNoId table tr.EXLResult:not(.desc_loaded)').each( function(index, ele) {
        ele = $(ele);
        ele.find('td.EXLResultNumber').show();
        var desc_link = ele.find('td.EXLSummary div.EXLSummaryContainer div.EXLSummaryFields h2.EXLResultTitle a');
        if (desc_link.length == 1) {
            $.ajax({
                url: desc_link.attr('href'),
                success: function(data) {
                    var desc = $(data).find('strong:contains("Beschreibung:"), strong:contains("Additional Information:"), strong:contains("Summary:"), strong:contains("Snippet:"), strong:contains("Description:"), strong:contains("Beskrivelse:"), strong:contains("Contient")');
                    desc.each( function(index2, ele2) {
                        ele.find('td.EXLSummary div.EXLSummaryContainer div.EXLSummaryFields').append( '<p>' + $(ele2).parent().html() + '</p>' );
                    });
                }
            });
        };
        ele.addClass('desc_loaded');
    });
}

var load_nxt_pending = false;
function load_nxt_when_visible() {
    //this function loads the next items IF the last item is visible and there are more items to get
    //if it detects that there are no more items to load it removes itself as listener from the window
    if (!load_nxt_pending) {
        var jq_last_ele = $('div#resultsListNoId table tr.EXLResult:last');
        var docViewTop = jq_window.scrollTop();
        var docViewBottom = docViewTop + jq_window.height();
        var elemTop = jq_last_ele.offset().top;
        var elemBottom = elemTop + jq_last_ele.height();
        if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
            $.ajax({
                url: $('div#resultsHeaderNoId div#resultsNavNoId a.EXLNext').attr('href'),
                beforeSend: function () {
                    load_nxt_pending = true;
                },
                success: function (data) {
                    data = $(data);
                    $('div#resultsListNoId table#exlidResultsTable tbody').append( data.find('div#resultsListNoId table#exlidResultsTable tbody').html() ) ;
                    var div_resultsNavNoId = $('div#resultsHeaderNoId div#resultsNavNoId');
                    div_resultsNavNoId.html( data.find('div#resultsHeaderNoId div#resultsNavNoId').html() );
                    div_resultsNavNoId.find('a').hide();
                    div_resultsNavNoId.find('span.EXLDisplayedCount').html( div_resultsNavNoId.find('span.EXLDisplayedCount').html().replace(/\d+/, '1') );
                    var div_resultsNavNoIdBottom = $('div#resultsFooterNoId div#resultsNavNoIdBottom');
                    div_resultsNavNoIdBottom.html( data.find('div#resultsFooterNoId div#resultsNavNoIdBottom').html() );
                    div_resultsNavNoIdBottom.find('a').hide();
                    div_resultsNavNoIdBottom.find('span.EXLDisplayedCount').html( div_resultsNavNoIdBottom.find('span.EXLDisplayedCount').html().replace(/\d+/, '1') );
                    if (div_resultsNavNoId.find('a.EXLNext').length == 0)
                        jq_window.unbind('scroll', load_nxt_when_visible);
                    load_descriptions_and_nr();
                },
                complete: function () {
                    load_nxt_pending = false;
                }
            });
        }
    }
};

load_descriptions_and_nr();

//when there is a next button (respectively any search results) a scroll listener is added to the window object
var nxt_links = $('div#resultsHeaderNoId div#resultsNavNoId a.EXLNext, div#resultsFooterNoId div#resultsNavNoIdBottom a.EXLNext');
if (nxt_links.length > 0) {
    nxt_links.hide();
    $('div#resultsTileNoId div#aubidPagination, div#oxfPagination').hide();
    jq_window.bind('scroll', load_nxt_when_visible);
}