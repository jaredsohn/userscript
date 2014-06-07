// ==UserScript==
// @name          Webmonkey's Hello World
// @namespace     http://www.webmonkey.com
// @description   A basic example of Greasemonkey that causes an alert at each page load.
// @include       *
// ==/UserScript==

function scrape() {
        var valyou = $("input#run").attr("value");
        if(valyou.toLowerCase()=="run"){
            $("input#run").click();
            console.log("Starting again");
        }else if(valyou.toLowerCase()=="sending"){
            location.reload();
        }else if(valyou.toLowerCase()=="unconnected"){
            location.reload();
            console.log("Starting again");
        }else{
            console.log(valyou);

        }
        setTimeout( function() { scrape(); }, 5000 );
};
scrape();