// ==UserScript==
// @name        Nyan's revenge
// @namespace   robotex
// @description DIY revenge against MTV Italy's injustice!
// @include     http://artistsaga.mtv.it/challenges/3/matches/59*
// @version     1.2.1
// @grant       none
// ==/UserScript==

/*
    Dedicato a chi non vuole subire soprusi di gente mentalmente incapace <3
*/

function ama() {
    xvote("\x35\x39",$( "#vwho").val());
}

var cachedata = { };
var cached = false;
function xvote(e, t) {
    if (cached==false) {
    FB.api("/me", function (n) {
        
        cachedata = jQuery.extend(true, {}, {match_id: e, player: t, user_json: n});
        cached = true;
        
        "error" in n || (data = {
            match_id: e,
            player: t,
            user_json: n
        }, $.ajax({
            type: "POST",
            url: "/votes",
            data: data,
            success: xtvote_success(data),
            dataType: "json"
        }))
    })
    }
    else {
    $.ajax({
            type: "POST",
            url: "/votes",
            data: cachedata,
            success: xvote_success(cachedata),
            dataType: "json"
        });
    }
}

function xvote_success(e) {
    $psel = $('#vwho option:selected').html();
    if ($("#vwho2").html() == $psel) {
        e.player = "player_one";
    }
    if ($.jStorage.get(e.match_id + "-" + e.player)) {
        var t = $.jStorage.get(e.match_id + "-" + e.player).dates;
        t.push(new Date);
        var n = {
            votes: $.jStorage.get(e.match_id + "-" + e.player).votes + 1,
            dates: t
        }
    } else var n = {
        votes: 1,
        dates: [new Date]
    };
    
    $.jStorage.set(e.match_id + "-" + e.player, n);
    var i = "#" + e.match_id + "-" + e.player;
    //$(i).html("+" + n.votes), $.jStorage.set(date_key(), $.jStorage.get(date_key()) + 1), update_max_votes(), xset_user_storage();
    $(i).html("+" + n.votes);
}
var vmade = 0;
function xfastvote_success(e) {
    vmade = vmade + 1;
    var i = "#" + e.match_id + "-" + e.player;
    $(i).html("+" + vmade);
}

function xset_user_storage() {
    set_user_votes(cachedata.user_json.id)
}

function xendVote(e) {
    window.location.href = "/challenges/" + document.getElementById("light").getAttribute("data-challenge") + "/matches/" + e;
}

var left = 10;
var mph = 1000;

$("#59-player_two").after('<p>Cicli (3x): <input type="text" id="cicli" size="5" value="5" />   Attesa: <input type="text" id="mph" size="5" value="1000" /><select id="vwho"><option value="\x70\x6C\x61\x79\x65\x72\x5F\x74\x77\x6F" id="vwho1">Super Junior</option><option value="\x70\x6C\x61\x79\x65\x72\x5F\x74\x77\x6F" id="vwho2">Marco Mengoni</option></select><input type="button" id="test" value="Start!" /><input type="button" id="vsv" value="Conteggio voti" /></p>');

$("#test").click(function(){
        left = parseInt($("#cicli").val());
        mph = parseInt($("#mph").val());
        var loopid = setInterval(function(){
            ama();
            ama();
            ama();
            left--;
            if(left === 0) {
                clearInterval(loopid);
            }
        }, mph);
    });
    
$( "#vsv").click(function(){
    window.open('http://robotex.altervista.org/tmpsv/','Voti','width=600,height=300')
    });
