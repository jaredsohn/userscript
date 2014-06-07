// ==UserScript==
// @name        MyFitnessPal Autocomplete Additions
// @namespace   real.billy
// @version     1.1
// @description Autocomplete when adding food items
// @match       *://www.myfitnesspal.com/food/add_to_diary*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// ==/UserScript==

var recentList = [];

function doWork() {
    var meal = getParameterByName('meal'); // 0-indexed
    var page = 1; //1-indexed
    
    addRecentToList(meal, page);
    
    $("#search").autocomplete({
        source: recentList,
        minLength: 0,
        response: function( event, ui ) {
            var matchList = ui.content;
            
            // has results
            if (matchList.length > 0) {
                // remove others
                $("tr.favorite").each(function(i, el) {
                    // always keep checked items
                    if ($(el).find("td:eq(0)").find("input.checkbox").is(":checked")) {
                        $(this).show();
                        return true; // continue
                    }
                    
                    var name = $(el).find("td:eq(1)").text();
                    var found = false;
                    $.each(matchList, function(i, el) {
                        if (el.label == name) {
                            found = true;
                            return false; // break
                        }
                    });
                    if (found) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });
            } else {
                // no results because of empty input
                if ($("#search").val().length == 0) {
                    $("tr.favorite").each(function(i, el) {
                    	$(this).show();
                    });
                } else { // no results because of no matches
                    $("tr.favorite").each(function(i, el) {
                    	$(this).hide();
                    });
                }
            }
        }
    });
    // hide autocomplete dropdown
    $.ui.autocomplete.prototype._resizeMenu = function() {  this.menu.element.hide(); }
    
    // match multiple words anywhere in text
    $.ui.autocomplete.filter = function (array, terms) {
        words = $.trim(terms).split(" ");
        return match(array, words);
    };
}

function match(array, words) {    
    var matcher = new RegExp($.ui.autocomplete.escapeRegex(words.shift()), "i");
    array = $.grep(array, function (value) {
        return matcher.test(value.label || value.value || value);
    });
    
    if (words.length == 0) {
        return array;
    } else {
        return match(array, words);
    }
}

// add first page to list even if it doesn't come back in ajax response

function addRecentToList(meal, page) {
    $.ajax({
        url: "/food/load_recent",
        type: "POST",
        data: {"meal": meal, "base_index": 25 * page, "page": page},
        headers: {
            "X-CSRF-Token": AUTH_TOKEN
        },
        success: function(data) {            
            if (page > 1) { // first page already there
            	console.log("appending data to recent list for page: " + page);
            	$('#recent').append(data);
            }
            
            var html = $.parseHTML(data);
            
            var oldSize = recentList.length;
            
            $.each($(html).find("tr.favorite"), function( i, el ) {
                var food = $(el).find("td:eq(1)").text();
                recentList.push(food);
            });
            
            console.log("Finished loading recent list [" + meal + "," + page + "], size is: " + recentList.length);
            
            if (recentList.length > oldSize && page < 5) {
                //console.log("old: " + oldSize + " new: " + recentList.length);
                addRecentToList(meal, page+1);
            } else {
                console.log(recentList.length + " total items in list");
                
                // hide extra add buttons
                $("div.table-footer").hide();
            }
  		}
	});
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

doWork();
