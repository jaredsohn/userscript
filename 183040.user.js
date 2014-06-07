// ==UserScript==
// @name       Auto Traffic Generator Bing
// @version    0.1
// @description  search for random words, load up to 5 results in iframes
// @match      http://www.bing.com/search?q*
// @copyright  2012+, me
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    setTimeout(function() {
        var maxlinks = 5;
        var numlinks = 0;
        var number = jQ("div.sb_tlst > h3> a").length;
        console.log(number+" results found");
        while(numlinks < maxlinks && numlinks < number) {
        	var linkNum = Math.floor((Math.random()*number)+1);
        	var linkref = jQ("div.sb_tlst > h3 > a")[linkNum];
        	if(typeof(linkref) == "undefined") {
            	linkref = "http://yahoo.com";
        	} else {
            	linkref = linkref.href;
        	}
        	console.log("loading random result "+linkNum);
        	console.log(linkref);
        	jQ('<iframe>', {
            	src: linkref,
        	}).appendTo(jQ("div.sb_tlst")[linkNum]);
            numlinks++;
        }
        setTimeout(function() {
            //document.location.reload();
            var randomSource = "http://randomword.setgetgo.com/get.php";
            jQ.ajax({
                type: 'GET',
                url: randomSource,
                async: false,
                jsonpCallback: 'RandomWordComplete',
                contentType: "application/json",
                dataType: 'jsonp',
                success: function(json) {
                    var randomNumber = Math.floor(Math.random()*(15000-3000)) + 5000,
                        randomWord = json.Word.trim();
                    if(jQ('.results').length < 1) {
                        randomNumber = 2000;
                    }
                    
                    console.log("Word: " + randomWord + " Time: " + randomNumber);
                    
                    setTimeout(function(){
                        jQ("#sb_form_q").val(randomWord);
                        jQ("#sb_form_go").click();
                    }, randomNumber);
                },
                error: function(e) {
                    console.log(e.message);
                }
            });
        }, 10000);
    }, 800);
}

// load jQuery and execute the main function
addJQuery(main);