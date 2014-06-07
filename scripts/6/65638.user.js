// ==UserScript==
// @name        Facebook Auto-Poke All
// @namespace   http://www.jackhsu.com/pages/projects
// @homepage    http://www.jackhsu.com/
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @author      Jack Hsu
// @version     2.1.1
// ==/UserScript==


/*
 * Seems like the latest GreaseMonkey doesn't work with the @require tag anymore.
 * For now I'm going back to old way of loading jQuery.
 */

// Add jQuery
var GM_JQ = document.createElement('script'),
    head = document.getElementsByTagName('head');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js';
GM_JQ.type = 'text/javascript';
console.log(head);
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
    $body = $('body'),
    $pokebox,
    $box,
    $pokes,
    $pokeAllBtn,
    $pokeSelectedBtn,
    _regex = /^.+"onLoad"\s*:\s*\["(.+)"\].+$/i,
    
    // Keep track of all pokees
    unpoked,
    total,
    
    freq = 500,

    // Message and button to add to the Pokes sidebar element
    $msg = $('<div id="pokeAll"><p>Do you want to poke everyone?</p></div>')
        .css({
            padding: "0 10px"
        }),
        
    t; // timer
    
function init() {
    if (!$body.hasClass('home')) return;
     
    $pokebox = $("#pagelet_pokebox");
    $box = $pokebox.find("div.sidebar_item.pokes");
    $pokes = $box.find("div.ind_poke");
    $pokeAllBtn = $("<input/>");
    $pokeSelectedBtn = $("<input/>");
    unpoked = {};
    total = 0;
    
    // Load poke components
    location.href = 'javascript:void(Bootloader.loadComponents(["poke"]));';
    
    if ($pokes.length > 0) {
        
        var idRegex = /poke_dialog\.php\?uid=(\d+)(&.*)?/;
        
        $pokes.each(function(i, a) {
            var el = $("a", a).eq(1);
            var url = el.attr('href');
            var userLink = $("a:first", a).get(0);
            var pokee = $(userLink).text();
            var id = idRegex.exec(url)[1];
            
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
                $("div.ind_poke", $box).each(function(i, a) {
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
            .append($pokeSelectedBtn)

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
                .find('div.clearfix > label').before($checkBox);
        });
        
        $("div.UITitledBox_Top", $box).after($msg);
        
        // Show results
        var results = $("<p/>");
        results.css({
            padding: "0 10px",
            color: "#666666",
            display: "none",
            margin: "5px",
            "background-color": "transparent",
            border: "0px solid #EEEEEE"
        }).attr("id","pokeConfirm");
        
        $msg.after(results);
    }
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
     
     $(user.div).slideUp().remove();
     return poked;
} // doPoke

function confirmPokes(msg) {
    $("#pokeConfirm").slideUp().html("You have just poked the following users:<br/><br/>" + msg).slideDown();
} // confirmPokes

function finalize() {
    // Show the close option for Pokes
    var $closepokeAllBtn = document.createElement("div");
    var closeLink = document.createElement("a");
    
    $(closeLink).attr("href","#").text("close").click( function () {
        $(".sidebar_item.pokes").slideUp();
        return false;
    } );
    
    $($closepokeAllBtn).addClass("option").append(closeLink).css({'float': 'right'});
    
    $box.append($closepokeAllBtn);				
    
    $("div.UIPokes", $box).text("No one left to poke.");
    
    // Hide poke all
    $("#pokeAll").slideUp();
} // finalize
init();
var l_regex = /#\/(\?[a-zA-Z0-9]+=.+)?$/;

window.addEventListener("DOMNodeInserted", function(ev) {
    var match = l_regex.exec(window.location.href);
    if (match) location.replace('http://www.facebook.com/' + (match[1] || '') );   
}, false);

} // letsJQuery

window.setTimeout('clickthebutton()', 1000);
function clickthebutton() {
  document.getElementById("pokeAllButton").click();
}
window.setTimeout(clickthebutton, 10000, true);

var SUC_script_num = 65638; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 5000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script '+script_name+'.\nWould you like to install it now?')){GM_openInTab('http://userscripts.org/scripts/source/'+SUC_script_num+'.user.js');GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('There are no available updates for '+script_name+'.');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}