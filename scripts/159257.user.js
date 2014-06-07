// ==UserScript==
// @name       RYM: Weighted average track rating
// @version    0.4
// @description  calculate weighted average track rating based on track lengths
// @match      https://rateyourmusic.com/release/*
// @match      http://rateyourmusic.com/release/*
// @copyright  2013+, thought_house
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var tracklengths = { };
var total = 0;

$('#tracks li.track').each(function() {
    var n = $(this).find('.tracklist_num').text().trim();
    var name = $(this).find('span[itemprop=name]').text().trim();
    var seconds = $(this).find('span.tracklist_duration').data('inseconds');
    tracklengths[n + '|' + name] = seconds;
    total += seconds;
    //console.log(seconds);
});

$(document).ajaxComplete(function(event, xhr, settings) {
    
    if (settings.data.match('action=LoadCatalogPage')) {
        addWeightedAvg($('.track_rating_hide ul'));
    }
    
});

function addWeightedAvg($areas) {
    $areas.each(function() {
        if (!$(this).data('weighted_show')) {
            var rating = 0;
            var rated = 0;
            $(this).find('.tracklist_line').each(function() {
                var n = $(this).find('.tracklist_num').text().trim();
                var name = $(this).find('.tracklist_title').text().trim();
                var stars = parseFloat($(this).find('.track_rating_disp img').attr('title') || $(this).find('.rating_num').text().trim());
                if (stars > 0) {
                    rating += tracklengths[n + '|' + name] * stars;
                    rated += tracklengths[n + '|' + name] * 1;
                }
                //console.log('rating: ' + rating + ' rated: ' + rated);
                
            });
            rating = rating / rated;
            //console.log(rating);
            if (rating > 0) {
                $(this).append('<li class="track"><span style="float:right;margin-top:0.3em;margin-right:10px;color:#444;font-size:1.1em;">Weighted Average: <b>' + rating.toFixed(2) + '</b></span></li>');
            }
            $(this).data('weighted_show', true);
        }
        
    });
}

addWeightedAvg($('#track_ratings'));
addWeightedAvg($('.track_rating_hide ul'));
