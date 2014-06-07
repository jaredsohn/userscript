// ==UserScript==
// @name       Fancy Magicers prijsberekening
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Fancy Magicers prijsberekening
// @match      http://www.magicers.nl/*
// @copyright  2012+, Me
// ==/UserScript==

var prices = [];
var input = [];
var i_delay = 0;
var total_price = 0;

$("head").append("<style>\
    #calc_container{ \
        position:absolute; \
        z-index:9999; \
        top:0px; \
        left:0px; \
        background-color: white; \
        padding: 10px; \
        margin: 10px; \
        border-radius: 10px; \
        width: 417px; \
        color: black; \
    } \
    #status_text{\
        padding: 5px;\
    }\
    #calc_input{ \
        margin: 10px 0px; \
    } \
    #calc{\
        display: none;\
    }\
    #result_calc{\
        max-height: 400px;\
        overflow-y: auto;\
    }\
    #result_calc .price{\
        float: right;\
        padding-right: 10px;\
    }\
    #result_calc li{\
        padding: 5px 0px;\
        list-style: none;\
        margin: 0;\
        margin-left: -20px;\
        border-bottom: 1px dashed rgba(0,0,0,0.5);\
    }\
    #calc_open{ \
        position:absolute;\
        top: 10px;\
        left: 10px;\
    }\
    #result_calc li:last-child{\
        border-bottom: none;\
    }\
    #calc_close{ \
        float: right;\
        margin-top: 10px;\
    }\
    #missing{\
        padding: 10px 0px;\
    }\
    #missing li{\
        margin: 5px;\
        list-style: none;\
    }\
    </style>");

$("body").prepend('<button id="calc_open" type="button">Mass search</button>');
$("body").prepend('<div id="calc_container" style="display:none;"><div id="status_text">Please insert the card list (Export as MTG Salvation on tappedout) then copy only the cards it self inside the [deck] tags, so just "1x    Forest"</div><textarea id="calc_input_text" rows="15" cols="50"></textarea><br><button id="calc_input" type="button">Submit</button><button id="calc_close" type="button">Close window</button><br><ul id="result_calc"></ul></div>');

$("body").append('<div id="calc"></div>');

$("#calc_open").click(function(){
    $(this).slideUp();
    $("#calc_container").slideDown();
});

$("#calc_close").click(function(){
    $("#calc_container").slideUp();
    $("#calc_open").slideDown();
});


$("#calc_input").click(function() {
    prices = [];
    i_delay = 0;
    total_price = 0;
    $("#result_calc").html("");

    input = $("#calc_input_text").val().replace(/\t/g, "").split(/\n/g);
    
    for (var i = 0; i < input.length; i++) {
        $("#result_calc").append("<li>"+input[i]+"</li>");
    };
    
    process_loop(input);

});

function process_loop(input) {
    setTimeout(function() {
        process(input[i_delay].replace(/.*x/,""), i_delay);
        i_delay++;
        if (i_delay < input.length) {
            process_loop(input);
        } else {
            setTimeout(function() {
                process_done();
            }, 1000);
        }
    }, 500)
}

function process(card, index){
    $.post("/inc/public_productsearch.php", {queryString: card}, function(data) { 
        $("#status_text").html("Processing: " + (index + 1) + " / " + input.length);

        if(index > 12){
            $('#result_calc').animate({
                scrollTop: (30 * index) - (30 * 12)
            }, 200);
        }
        

        $("#calc").html(data);
        
        prices = [];

        $("#calc .small").each(function(index) {
            prices.push(parseFloat($(this).text().replace("&#8364;", "").replace("€", "").replace(",", ".")).toFixed(2));
        });

        if(prices[0]){
            prices.sort(function(a,b){return a-b});
            console.log(prices[0]);
            
            $($("#result_calc li")[index]).append("<span class='price'>&#8364;" + (parseFloat(prices[0]) * parseInt(input[index])).toFixed(2) + "</span>");
            console.log(index);
        } else {
            $($("#result_calc li")[index]).append("<span class='price'>Missing</span>");
        }

        
        
    });
}

function process_done(){
    $("#result_calc li").find('span').each(function(index) {
        if($(this).html() != "Missing"){
            total_price += parseFloat($(this).html().replace("€", ""));
        }
    });

    $("#status_text").html("Processing done!<br/> Total price: &#8364;" + total_price.toFixed(2) + "<ul id='missing'>Missing cards:</ul>");

    $("#result_calc li").find('span').each(function(index) {
        if($(this).html() == "Missing"){
            $("#missing").append("<li>" + $($(this).parent()).clone().children().remove().end().text() + "</li>");
        }
    });

    if(!$("#result li")){
        $("#missing").html("");
    }


}