// ==UserScript==
// @name        Facebook Poke All
// @namespace   http://www.jackhsu.com/pages/projects
// @homepage    http://www.jackhsu.com/
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @author      Jack Hsu
// @version     2.1.5
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script'),
    head = document.getElementsByTagName('head');

GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js';
GM_JQ.type = 'text/javascript';

if (head && head.length && head[0].appendChild) {
    head[0].appendChild(GM_JQ);

    // wait for jQuery to load
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
        else { unsafeWindow.jQuery.noConflict(); letsJQuery(); }
    }
    GM_wait();
}

function letsJQuery() {

var $ = unsafeWindow.jQuery,
    $body = $(document.body),
    $pokebox,
    $pokes,
    $pokeAllBtn,
    $pokeSelectedBtn,
    _regex = /^.+"onLoad"\s*:\s*\["(.+)"\].+$/i,

    // Keep track of all pokees
    unpoked,
    total,
    freq = 500,

    // Message and button to add to the Pokes sidebar element
    $msg,
        
    t; // timer

if ($(unsafeWindow).data('pokeall_loaded')) return;

$(unsafeWindow).data('pokeall_loaded', true);

function init() {
  
    $pokebox = $('#rightCol div.pokes');

    if (!$body.hasClass('home') || $pokebox.data('initialized')) {
        setTimeout(init, freq);
        return;
    }
    
    $pokebox.data('initialized', true);
    
    $msg = $('<div id="pokeAll"><p>Do you want to poke everyone?</p></div>')
        .css({
            padding: "0 10px",
            margin: '10px 0'
        });
    $pokes = $pokebox.find("div.ind_poke");
    $pokeAllBtn = $("<input/>");
    $pokeSelectedBtn = $("<input/>");
    unpoked = {};
    total = 0;

    // Load poke components
    location.href = 'javascript:void(Bootloader.loadComponents(["poke"]));';

    if ($pokes.length > 0) {
        var idRegex = /poke_dialog\.php\?uid=(\d+)(&.*)?/;
        $pokes.each(function(i, a) {
            var el = $("a", a).eq(1),
                url = el.attr('href'),
                userLink = $("a:first", a).get(0),
                pokee = $(userLink).text(),
                id = idRegex.exec(url)[1];
            
            unpoked[id] = { div: a, pokeUrl: url + '&__d=1&__a=1', name: pokee, pageUrl: userLink.href };
            ++total;
        });
        
        // Set up Buttons
        $pokeAllBtn
            .attr("value","Poke All!").attr("type","button").addClass("inputsubmit").css( {
                "margin-top": "3px",
                padding: "2px 5px 3px"
            })
            .attr("id","pokeAllButton")
            .click( function () {
                var pokees = [],
                    $this = $(this);
                
                // Disable the button
                $this.attr("disabled", "disabled");
                
                // Loop through each pokee and poke them!
                $("div.ind_poke", $pokebox).each(function(i, a) {
                    var url = $("a", a).get(1).href;
                    var id = idRegex.exec(url)[1];

                    pokees.push(doPoke(id));

                    if (--total === 0) finalize();
                });
                    
                confirmPokes(pokees.join(", "));;
            } );
        
        $pokeSelectedBtn
            .attr("value","Poke Selected!")
            .attr("type","button")
            .addClass("inputsubmit").css( {
                "margin-top": "3px",
                padding: "2px 5px 3px",
                "margin-left": "3px"
            })
            .attr("id","pokeAllButton")
            .click(function () {
                var toPoke = $(".pokeCheckbox:checked");
                
                if (toPoke.length === 0) {
                    alert("You haven't selected users to poke!");
                    return;
                }

                // Keep track of all pokees
                var pokees = [];
                
                $(toPoke).each(function( i, a ) {
                    var id = $(a).attr("value");
                    pokees.push(doPoke(id));
                    if (--total === 0) finalize();
                });
                confirmPokes(pokees.join(", "));;
            });
        
        // Add top message
        $msg
            .append($pokeAllBtn)
            .append($pokeSelectedBtn);

        // Add checkbox to each pokee
        $pokes.each(function(i, a) {
            var url = $("a", a).get(1).href;
            var userLink = $("a:first", a).get(0);
            var pokee = $(userLink).text();
            var id = idRegex.exec(url)[1];
            
            var $checkBox = $("<div>");
            $checkBox
                .attr("id",id+"Poke")
                .css({ 
                        float: 'right'
                    })
                    .html(
                        ' | <input style="vertical-align: middle" value="'+id+'" type="checkbox" id="'+id+'" class="pokeCheckbox" />' + 
                        '<label title="Include '+pokee+' in Poke Selected!" style="font-size: 9px; font-weight: normal" for="'+id+'">?</label>'
                    );
                
            $(a)
                .children('label').eq(0).before($checkBox);
        });
        
        $("div.uiHeader ", $pokebox).after($msg);
        
        // Show results
        var results = $("<p/>");
        results.css({
            padding: "0 10px",
            color: "#666666",
            display: "none",
            margin: "5px",
            "background-color": "#E9E9E9",
            border: "1px solid #EEEEEE"
        }).attr("id","pokeConfirm");
        
        $msg.after(results);
    }
    
    setTimeout(init, freq);
} // init

function doPoke(id) {
    var user = unpoked[id];
    
    // Add pokee to the array
    var poked = '<a href="'+user.pageUrl+'">'+user.name+'</a>';
    
    // We'll send a request for the facebook poke page
    $.ajax( {
        type: "GET",
        url: user.pokeUrl,
        success: function(data) {
            data = data.match(_regex)[1].replace(/\\|;/g, '');
            var code = data + '.poke()';
            location.href = 'javascript:void(' + code +');';
        }
     } );
     
     $(user.div).slideUp(function() { $(this).remove(); });
     return poked;
} // doPoke

function confirmPokes(msg) {
    $("#pokeConfirm").slideUp(function() {
        $(this).html("You have just poked the following users.<br/><br/>" + msg).slideDown();
    });
} // confirmPokes

function finalize() {
    // Show the close option for Pokes
    var $closepokeAllBtn = document.createElement("div");
    var closeLink = document.createElement("a");
    
    $(closeLink).attr("href","#").text("close").click( function () {
        $pokebox.slideUp();
        return false;
    } );
    
    $($closepokeAllBtn).addClass("option").append(closeLink).css({'float': 'right'});
    
    $pokebox.append($closepokeAllBtn);				
    
    $("div.UIPokes", $pokebox).text("No one left to poke.");
    
    // Hide poke all
    $("#pokeAll").slideUp();
} // finalize

init();

} // letsJQuery