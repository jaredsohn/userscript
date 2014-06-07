// ==UserScript==
// @name        Automatic Bing Search
// @namespace   http://userscripts.org/users/515778
// @description Automatic Bing Search
// @match     http://www.bing.com/search?q=*
// @grant none
// @version     1.4
// @copyright  2013, James Sullivan
// ==/UserScript==

// Load jQuery, wait for it to finish loading, then call the callback function
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// Function executed after jQuery is loaded
function main() {    
    function doSearch() {
        var requestStr = "http://randomword.setgetgo.com/get.php";
        jQ.ajax({
            type: 'GET',
            url: requestStr,
            async: false,
            jsonpCallback: 'RandomWordComplete',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
                var randomNumber = Math.floor(Math.random()*(35000-5000)) + 5000,
                    randomWord = json.Word.trim();
                
                console.log("Word: " + randomWord + " Time: " + randomNumber);
                
                setTimeout(function(){
                    jQ(".b_searchbox").attr("value", randomWord);
                }, (randomNumber - 1000));
                
                setTimeout(function(){
                    jQ("#sb_form_go").click();
                }, randomNumber);
            },
            error: function(e) {
                console.log(e.message);
            }
        });
    }
    
    var loadedFlyout = jQ("<div/>",{id:'loadedFlyout'}).hide().appendTo('body');
    
    jQ(loadedFlyout).load("/rewardsapp/bepflyoutpage", function(){
        console.log("flyout loaded");
        
        if(jQ(".offer span.progress:contains('of 15')").not(":contains('150')").length > 0) {
            // Flyout is there, and has a progress number we can parse
            if(jQ(".offer span.progress:contains('of 15')").not(":contains('150')").html() !== "15 of 15") {
                doSearch();
            } 
            else {
                console.log("searching complete");
            }
        } 
        else {
            // flyout doesn't have a progress number we can parse, load the rewards page instead
            var rewardsPage = jQ("<div/>",{id:'rewardsPage'}).hide().appendTo('body');
            jQ(rewardsPage).load("/rewards/dashboard", function() {
                console.log("rewards dashboard loaded");
                if(jQ("li:contains('Search Bing')").find(".progress").html() !== "15 credits") {
                    doSearch();
                }
                else {
                    console.log("searching complete");
                }
            });
        }
    });
}
// load jQuery and execute the main function
addJQuery(main);
