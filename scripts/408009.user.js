// ==UserScript==
// @name        by rating
// @namespace   byrate
// @include     *watchseries.*/episode/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description adds a by rating button
// @grant       none
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function() {
    var _target = {
               table:$('#myTable'),
               body:$('tbody tr',this.table),
               channel:$('.channel-title').eq(1)
        };
    
    var byRating = function () {
        var findRate,percentile,box=[],
            content = $('<tbody></tbody>'),localizer;
        _target.body.each(function(index,element) {
            findRate = $(element).find('.percent');
            if (findRate.length > 0) {
                percentile = parseInt($(findRate).text(),10);
                box[index] = percentile;
            }
        });
        keysSorted = Object.keys(box).sort(function(a,b){return box[b]-box[a]}); // found on SO
        for (var i in keysSorted) {
            var k = keysSorted[i];
            localizer = _target.body.eq(k).clone(true);
            $(content).append(localizer);
        }
        _target.table.empty().append(content);
    };
    $('select',_target.channel).after("<button class='buttonlink'>sort by rate</button>");
    $(".buttonlink",_target.channel).click(byRating);

});