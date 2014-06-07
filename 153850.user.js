// ==UserScript==
// @name          ESPN Fantasy Baseball/Basketball Extras
// @author		  Flipperbw
// @version       2.2.1
//
// @include       http://games.espn.go.com/fba/clubhouse*
// @include       http://games.espn.go.com/fba/freeagency*
// @include       http://games.espn.go.com/flb/clubhouse*
// @include       http://games.espn.go.com/flb/freeagency*
//
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

/*
var tag = document.createElement("script");
tag.type="text/javascript";
tag.src = "http://code.jquery.com/jquery-latest.min.js";
document.body.appendChild(tag);
*/

function add_games(){
	
    if (window.location.pathname.split("/")[1] == 'fba') {
    	var firstgame = new Date(2012,9,29);
        var mxweek = 25;
        var teamlist = ['ATL','BKN','BOS','CHA','CHI','CLE','DAL','DEN','DET','GS','HOU','IND','LAC','LAL','MEM','MIA','MIL','MIN','NOR','NY','OKC','ORL','PHI','PHO','POR','SAC','SA','TOR','UTA','WSH'];
        var weeklist = {
            '6':[3,3,3,4,4,4,3,4,4,4,3,4,4,4,3,3,4,3,4,4,3,4,3,4,3,3,3,4,4,3],
            '7':[4,4,3,4,3,4,4,4,4,4,4,3,3,4,3,3,3,3,4,3,2,3,4,2,3,4,4,4,3,4],
            '8':[4,3,3,4,4,4,4,3,4,4,3,4,4,2,4,3,4,4,4,4,3,4,4,4,3,4,4,3,4,4],
            '9':[3,4,4,3,3,3,3,4,3,3,4,3,4,3,2,4,3,2,3,3,3,3,3,3,3,3,3,3,3,3],
            '10':[4,4,3,3,3,3,3,4,3,2,4,4,4,3,4,4,3,3,3,3,4,3,4,4,4,4,4,3,3,4],
            '11':[4,3,3,3,4,4,4,3,2,3,4,4,2,4,4,3,4,4,4,4,4,3,3,4,4,3,4,3,4,2],
            '12':[4,3,4,4,4,3,4,4,2,3,4,3,4,3,4,3,3,3,3,1,4,4,2,2,3,4,3,4,2,4],
            '13':[4,4,4,3,4,3,2,2,4,4,4,3,5,4,4,3,3,4,4,4,4,3,3,4,4,4,4,3,3,4],
            '14':[2,3,3,3,4,3,3,3,4,4,3,3,3,4,3,3,4,3,4,3,2,4,3,3,3,4,2,4,4,4],
            '15':[3,4,3,4,2,3,3,4,4,4,4,3,4,4,4,4,3,4,3,4,4,4,3,4,4,3,3,3,4,3],
            '16':[2,2,2,2,2,2,2,2,2,1,2,2,3,2,1,2,2,2,2,1,2,1,2,1,2,2,2,2,2,2],
            '17':[3,4,4,4,4,3,3,3,4,4,3,3,2,3,4,4,3,3,4,3,3,4,3,4,3,3,4,3,2,3],
            '18':[4,3,2,3,4,3,4,3,4,4,3,4,4,3,3,3,3,3,3,3,3,4,4,3,2,4,3,4,3,4],
            '19':[4,3,4,4,3,4,3,4,3,4,3,3,3,4,3,4,4,4,4,4,4,4,4,3,4,4,2,4,4,3],
            '20':[4,3,3,3,2,3,4,3,3,4,3,3,2,4,4,4,4,4,3,4,4,3,3,4,3,2,4,3,3,4],
            '21':[4,4,4,4,4,3,4,4,3,3,3,4,3,2,4,4,4,4,3,4,4,3,4,4,5,4,3,3,4,4],
            '22':[4,3,4,3,3,3,3,3,3,3,3,4,4,4,4,4,3,4,4,4,3,4,4,3,3,3,3,3,4,4],
            '23':[4,3,4,4,4,4,4,3,4,3,4,3,3,3,4,3,4,4,3,4,3,4,3,3,4,3,4,4,4,4],
            '24':[2,4,3,3,4,4,3,3,2,3,3,3,3,4,3,4,4,4,4,4,3,2,4,3,3,3,3,3,2,3],
            '25':[2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2]
        };
    } else {
        var firstgame = new Date(2014,2,31);
        var mxweek = 26;
		var teamlist = ['PIT','TB','TOR','COL','ARI','ATL','KC','HOU','LAA','STL','MIN','MIL','OAK','BAL','CIN','CHC','WSH','CLE','CWS','DET','TEX','NYM','SF','LAD','NYY','MIA','SD','PHI','SEA','BOS'];
        var weeklist = {
			'1':[6,7,7,7,9,6,6,6,6,6,6,6,7,6,6,6,6,6,6,6,6,6,7,8,6,7,6,6,7,6],
			'2':[6,6,6,6,6,6,6,7,6,6,6,6,6,6,6,6,6,7,7,5,6,6,6,5,7,6,6,6,5,7],
			'3':[7,7,6,7,6,7,6,6,6,7,6,7,6,6,6,5,7,6,6,6,7,6,6,6,6,6,7,7,7,6],
			'4':[7,6,6,6,7,6,7,7,6,7,6,6,7,7,7,7,7,7,7,7,6,7,6,7,6,6,7,7,6,7],
			'5':[5,7,6,7,6,6,6,5,6,6,6,7,6,5,7,6,5,6,6,5,6,6,6,6,6,6,6,5,6,6],
			'6':[6,6,7,7,6,6,7,7,6,6,7,6,6,6,5,7,6,7,7,7,7,6,7,7,6,7,7,7,7,5],
			'7':[6,7,7,5,6,6,6,6,7,7,6,6,6,7,6,7,6,6,6,6,6,7,7,6,7,7,6,5,6,6],
			'8':[6,6,6,6,6,7,6,7,6,6,5,7,6,6,6,6,7,7,7,7,6,6,6,6,6,6,6,6,6,6],
			'9':[7,6,7,6,7,7,7,7,7,7,7,6,7,7,7,6,6,6,6,7,7,7,7,7,6,6,6,7,7,7],
			'10':[6,7,6,6,6,5,7,6,6,7,7,7,6,6,6,6,6,6,6,6,6,6,6,6,6,7,6,6,5,6],
			'11':[7,6,7,7,7,7,6,7,6,5,6,6,6,7,7,7,7,7,7,7,6,6,7,7,7,5,6,6,7,7],
			'12':[6,7,6,6,7,7,6,6,7,7,7,7,7,6,6,6,6,7,6,6,6,7,5,6,6,7,7,7,7,7],
			'13':[7,6,7,7,5,6,6,6,6,7,6,7,5,6,7,7,7,5,7,6,6,6,7,7,6,7,6,7,6,6],
			'14':[6,7,6,7,6,6,6,7,7,6,7,5,7,7,6,6,6,6,6,7,7,6,6,7,7,6,6,6,6,6],
			'15':[7,6,6,6,6,7,7,6,7,7,7,7,7,7,7,7,7,7,7,6,7,7,7,6,7,6,7,7,7,7],
			'16':[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
			'17':[6,5,7,6,6,7,7,6,7,5,7,7,6,7,6,6,6,7,7,7,7,7,7,6,7,7,6,7,7,7],
			'18':[7,6,7,7,7,7,6,7,6,6,6,6,6,6,7,7,7,6,6,6,6,6,6,6,6,7,7,7,6,6],
			'19':[6,6,6,6,6,5,6,6,7,6,6,6,7,6,7,6,6,7,7,7,6,7,7,7,7,6,5,6,6,6],
			'20':[7,7,6,7,6,7,7,7,5,7,6,7,7,6,6,7,6,5,5,7,7,7,5,7,6,7,7,6,6,6],
			'21':[6,6,5,5,7,7,6,6,7,6,7,5,5,6,7,7,7,6,6,6,5,6,6,6,6,5,6,6,6,7],
			'22':[6,7,6,7,5,6,6,7,7,6,6,6,7,7,6,6,6,6,6,6,7,6,7,5,6,6,6,6,6,6],
			'23':[6,7,6,6,7,6,6,5,6,7,7,7,6,7,6,6,6,7,5,7,7,6,6,6,6,6,7,6,7,7],
			'24':[7,6,6,6,6,6,7,6,6,7,6,7,7,6,7,6,7,6,7,6,6,7,6,6,6,7,6,7,6,7],
			'25':[6,6,7,7,7,6,6,7,7,6,6,6,6,6,6,7,7,7,6,6,6,6,6,7,7,7,7,7,7,6]
        };
    }

    var today = new Date();
    var currentweek = Math.max(1,Math.ceil((today.getTime()-firstgame.getTime()) / (1000*60*60*24*7)));
    var numweeks = 8;
    var maxweek = Math.min(currentweek + numweeks, mxweek);
    
    $.each($('[id^=playertable_] tbody tr.playerTableBgRowHead'), function () {
        var currrow = $(this);
        currrow.append('<td class="sectionLeadingSpacer"></td><th id="future_games" colspan="' + (numweeks+1) + '">Week No.</th>');
    });
    
    $.each($('[id^=playertable_] tbody tr.playerTableBgRowSubhead'), function () {
        var currrow = $(this);
        currrow.append('<td class="sectionLeadingSpacer"></td>');
        for (var i=currentweek; i<=maxweek; i++) {
            currrow.append('<td>' + i + '</td>');
        }
    });
    
    var pagetype = window.location.pathname.split("/")[2];
    var cellno = (window.location.pathname.split("/")[2] == 'clubhouse') ? 1 : 0;
    
    $.each($('[id^=playertable_] tbody tr.pncPlayerRow').not('.emptyRow'), function() {
        var currcell = $(this);
        var teamname = currcell.find('td').eq(cellno).text().split(",")[1].split(/\s|\xa0/)[1].toUpperCase();
        var teamindex = teamlist.indexOf(teamname);
        currcell.append('<td class="sectionLeadingSpacer"></td>');
        for (var i=currentweek; i<=maxweek; i++) {
            var numgames = weeklist[String(i)][teamindex];
            currcell.append('<td>' + numgames + '</td>');
        }
    });
}

add_games();

//$('#ajaxFilterShell').append('<button style="float:right" id="add_future">Add Future Games</button>');
$('.games-topcol').after('<button style="float:right" id="add_future">Add Future Games</button>');

$('#add_future').click(function(){
    if ($('#future_games').length == 0) {
    	add_games();
    }
});
