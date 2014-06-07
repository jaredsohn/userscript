// ==UserScript==
// @name           League Forum Links
// @namespace      pbr_lfl
// @include        http://goallineblitz.com/game/team.pl?*
// @include        http://goallineblitz.com/game/league.pl?*
// @version        09.03.01
// ==/UserScript==

/*
 *
 * pabst did this
 *
 */

var forumNames = [
"USA","Canada","Europe East","Europe West","Oceania","South America","Southeast Asia","Africa","Casual Leagues","Pee Wee Leagues","Europe West Pro League","Europe West AAA League","Europe West AA League","Europe West A Leagues","Europe West BBB Leagues","Europe West Alternative Language Forum","Casual A Leagues","Casual BBB Leagues","Europe East Pro League","Europe East AAA Leagues","Europe East AA Leagues","Europe East A Leagues","Europe East Alternative Languages Forum","Europe East BBB Leagues","toysldr0's Eastern Europe Pro Daily League Preview","Canadian Pro League","Canadian AAA Leagues","Canadian AA Leagues","Canadian A Leagues","Canadian BBB Leagues","Southeast Asia Pro League","Southeast Asia AAA Leagues","Southeast Asia AA Leagues","Southeast Asia A Leagues","Pee Wee League #1","Pee Wee League #2","Pee Wee League #3","Pee Wee League #4","Pee Wee League #5","Pee Wee League #6","Pee Wee League #7","Pee Wee League #8","Pee Wee League #9","Pee Wee League #10","Pee Wee League #11","Pee Wee League #12","Pee Wee League #13","Pee Wee League #14","Pee Wee League #15","Pee Wee League #16","Pee Wee League #17","Pee Wee League #18","Pee Wee League #19","Pee Wee League #20","Pee Wee League #21","Pee Wee League #22","Pee Wee League #23","Pee Wee League #24","Pee Wee League #25","USA Pro League","USA AAA Leagues","USA AA Leagues","USA A Leagues","USA BBB Leagues","South America Pro League","South America AAA Leagues","South America AA Leagues","South America A Leagues","South America BBB Leagues","Africa Pro League","Africa AAA League","Africa AA League","Africa A League","Casual A #1","Casual A #2","Casual A #3","Casual A #4","Casual A #5","Oceania Pro League","Oceania AAA Leagues","Oceania AA Leagues","Oceania A Leagues","Europe West AAA #1","Europe West AAA #2","Western Europe A #1","Western Europe A #2","Western Europe A #3","Western Europe A #4","Western Europe A #5","Western Europe A #6","Western Europe A #7","Western Europe A #8","Casual BBB #1","Casual BBB #2","Casual BBB #4","Casual BBB #5","Casual BBB #6","Casual BBB #7","Casual BBB #8","Casual BBB #3","Casual BBB #9","Casual BBB #10","Europe West BBB #1","Europe West BBB #2","Europe West BBB #3","Europe West BBB #4","Europe West BBB #5","Europe West BBB #6","Europe West BBB #7","Europe West BBB #8","Europe West BBB #9","Europe West BBB #10","Europe West BBB #11","Europe West BBB #12","Europe West BBB #13","Europe West BBB #14","Europe West BBB #15","Europe West BBB #16","Europe East AA #1","Europe East AA #2","Europe East AA #3","Europe East AA #4","Europe West AA #1","Europe West AA #2","Europe West AA #3","Europe West AA #4","Europe East AAA #1","Europe East AAA #2","Canada AAA #1","Canada AAA #2","Canada AA #1","Canada AA #2","Canada AA #3","Canada AA #4","Europe East A #1","Europe East A #2","Europe East A #3","Europe East A #4","Europe East A #5","Europe East A #6","Europe East A #7","Europe East A #8","Southeast Asia AA #1","Southeast Asia AA #2","Southeast Asia AA #3","Southeast Asia AA #4","Europe East BBB #1","Europe East BBB #2","Europe East BBB #3","Europe East BBB #4","Europe East BBB #5","Europe East BBB #6","Europe East BBB #7","Europe East BBB #8","Europe East BBB #9","Europe East BBB #10","Europe East BBB #11","Europe East BBB #12","Europe East BBB #13","Europe East BBB #14","Europe East BBB #15","Europe East BBB #16","South America AAA #1","South America AAA #2","Southeast Asia A #1","Southeast Asia A #2","Southeast Asia A #3","Southeast Asia A #4","Southeast Asia A #5","Southeast Asia A #6","Southeast Asia A #7","Southeast Asia A #8","Canadian A #1","Canadian A #2","Canadian A #3","Canadian A #4","Canadian A #5","Canadian A #6","Canadian A #7","Canadian A #8","Oceania AA #1","Oceania AA #2","Oceania AA #3","Oceania AA #4","Southeast Asia AAA #1","Southeast Asia AAA #2","Africa AAA #1","Africa AAA #2","South America AA #1","South America AA #2","South America AA #3","South America AA #4","Canadian BBB #1","Canadian BBB #2","Canadian BBB #3","Canadian BBB #4","Canadian BBB #5","Canadian BBB #6","Canadian BBB #7","Canadian BBB #8","Canadian BBB #9","Canadian BBB #10","Canadian BBB #11","Canadian BBB #12","Canadian BBB #13","Canadian BBB #14","Canadian BBB #15","Canadian BBB #16","Africa AA #1","Africa AA #2","Africa AA #3","Africa AA #4","USA AAA #1","USA AAA #2","South America A #1","South America A #2","South America A #3","South America A #4","South America A #5","South America A #6","South America A #7","South America A #8","Oceania A #1","Oceania A #2","Oceania A #3","Oceania A #4","Oceania A #5","Oceania A #6","Oceania A #7","Oceania A #8","USA AA #1","USA AA #2","USA AA #3","USA AA #4","Africa A #1","Africa A #2","Africa A #3","Africa A #4","Africa A #5","Africa A #6","Africa A #7","Africa A #8","Oceania AAA #1","Oceania AAA #2","South America BBB #1","South America BBB #2","South America BBB #3","South America BBB #4","South America BBB #5","South America BBB #6","South America BBB #7","South America BBB #8","USA A #1","USA A #2","USA A #3","USA A #4","USA A #5","USA A #6","USA A #7","USA A #8","USA BBB #1","USA BBB #2","USA BBB #3","USA BBB #4","USA BBB #5","USA BBB #6","USA BBB #7","USA BBB #8","USA BBB #9","USA BBB #10","USA BBB #11","USA BBB #12","USA BBB #13","USA BBB #14","USA BBB #15","USA BBB #16"
];

var forumID = [
11,12,13,14,15,16,17,140,3601,3602,51,52,53,177,1877,54,3603,3604,48,49,50,251,65,2783,69,45,46,47,187,1167,126,127,168,269,3620,3621,3622,3623,3624,3625,3626,3627,3628,3629,3630,3631,3632,3633,3634,3635,3636,3637,3638,3639,3640,3641,3642,3643,3644,40,41,42,43,44,122,123,124,242,3652,141,142,143,1184,3605,3606,3607,3608,3609,118,119,173,260,112,113,178,179,180,181,182,183,184,185,3610,3611,3613,3614,3615,3616,3617,3612,3618,3619,1878,1879,1880,1881,1882,1883,1884,1885,1886,1887,1888,1889,1890,1891,1892,1893,108,109,110,111,114,115,116,117,106,107,100,101,102,103,104,105,252,253,254,255,256,257,258,259,129,169,170,171,2784,2785,2786,2787,2788,2789,2790,2791,2792,2793,3646,3647,3648,3649,3650,3651,162,163,270,271,272,273,274,275,276,277,188,189,190,191,192,193,194,195,121,174,175,176,167,128,144,145,125,164,165,166,1168,1169,1170,1171,1172,1173,1174,1175,1176,1177,1178,1179,1180,1181,1182,1183,146,147,148,149,70,71,243,244,245,246,247,248,249,250,261,262,263,264,265,266,267,268,72,73,74,75,1186,1187,1188,1189,1190,1191,1192,1193,172,120,3653,3654,3655,3656,3657,3658,3659,3660,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99
];

window.setTimeout( function() {
    if (window.location.toString().indexOf("team.pl") != -1) {
        var league = document.getElementById("team_league").firstChild;
        leagueForumMain(league);
    }
    else if (window.location.toString().indexOf("/league.pl") != -1) {
        var league = document.getElementsByClassName("big_head subhead_head")[0].firstChild;
        leagueForumMain(league);
    }
    else {
        //leagueForumLinksSearch();
    }
}, 250
);

var continents = ["Africa","America","Asia","Canadian","Canada","Europe","Oceania","USA","Casual","Pee Wee"];
var forumLinks = [];

var fnames;
var fids;

function leagueForumLinksSearch() {
    // include        http://goallineblitz.com/game/forum_main.pl
    fnames = document.createElement("div");
    fnames.id = "fnames";
    document.getElementById("header").appendChild(fnames);
    fids = document.createElement("div");
    fids.id = "fids";
    document.getElementById("footer").appendChild(fids);
	
    var forums = document.getElementsByClassName("forum_title");
    for (var i=0; i<forums.length; i++) {
        for (var j=0; j<continents.length; j++) {
            if (forums[i].innerHTML.indexOf(continents[j]) != -1) {
                var href = forums[i].href.toString().slice(forums[i].href.toString().indexOf("=")+1);
                //console.log(forums[i].innerHTML+" --- "+href);
                forumLinks.push(forums[i]);
				
                var href = forums[i].href.toString().slice(forums[i].href.toString().indexOf("=")+1);
                fnames.innerHTML += '"'+forums[i].innerHTML+'",';
                fids.innerHTML += href+',';
				
                getInetPage(forums[i].href, forumLinkHandler, null);
                break;
            }
        }
    }
}

function forumLinkHandler(address, page) {
    var div = document.createElement("div");
    div.innerHTML = page.responseText;
    var forums = div.getElementsByClassName("forum_title");
    for (var i=0; i<forums.length; i++) {
        var href = forums[i].href.toString().slice(forums[i].href.toString().indexOf("=")+1);
        fnames.innerHTML += '"'+forums[i].innerHTML+'",';
        fids.innerHTML += href+',';
		
        //console.log(forums[i].innerHTML+" --- "+href);
        forumLinks.push(forums[i]);
        getInetPage(forums[i].href, forumLinkHandler, null);
    }
}

function getInetPage(address, func, target) {
    var req = new XMLHttpRequest();
    req.open( 'GET', address, true );
    req.onreadystatechange = function() {
        if (target != null) {
            var d = ["..","...","."];
            var str = target.innerHTML.split(" ");
            target.innerHTML = str[0]+" "+d[str[1].length-1];
        }
    };
    req.onload = function() {
        if (this.status != 200) {
            console.log("pbr gm script: Error "+this.status+" loading "+address);
            getInetPage(address, func, target);
        }
        else {
            //console.log("loaded: "+address)
            func(address,this);
        }
    };
	
    req.send(null);
    return req;
}

var lead="http://goallineblitz.com/game/forum_thread_list.pl?forum_id="
function leagueFix(l) {
    var r = l.replace("African","Africa");
    r = r.replace("Canadian","Canada");
    r = r.replace("Eastern Europe","Europe East");
    r = r.replace("Western Europe","Europe West");
    return r;
}

function leagueForumMain(league) {
    var strings = [];
    var splits = league.innerHTML.split(" ");
    if (splits.length == 3) {
        strings[0] = splits[0];
    //console.log(splits.length);
    }
    else if (splits.length == 4) {
        strings[0] = splits[0]+" "+splits[1];
    //console.log(splits.length);
    }
    else {
        console.log("wtf? --- "+splits);
    }
    strings[0] = leagueFix(strings[0]);
    strings[1] = strings[0]+" "+splits[splits.length-2];
    strings[2] = strings[1]+" "+splits[splits.length-1];
    //console.log("strings="+strings);

    var count = 0;
    var myForums = [];
    for (var i=0; i<forumNames.length; i++) {
        var t = forumNames[i];
        t = t.replace(" Leagues","");
        t = t.replace(" League","");
        t = leagueFix(t);
        var id = forumID[i];
        for (var j=0; j<strings.length; j++) {
            //console.log("'"+strings[j]+"' || '"+t+"'"+" : "+count);
            if (strings[j].replace(" League","") == t) {
                myForums.push([t,id]);
                strings.splice(j,1);
                count++;
                break;
            }
        }
        if (count == 3) break;
    }
    //console.log(forumNames.length+"/"+forumID.length+"/"+myForums.length+"="+myForums);

    var bar = document.getElementsByClassName("subhead_link_bar")[0];
    if (window.location.toString().indexOf("league.pl") == -1) {
        var teamid = window.location.toString().slice(window.location.toString().indexOf("=")+1);
        bar.appendChild(createLink("Team Forum","/game/forum_thread_list.pl?team_id="+teamid));
    }

    var lead="/game/forum_thread_list.pl?forum_id="
    for (var i=myForums.length-1; i>=0; i--) {
        bar.appendChild(createLink(myForums[i][0]+" Forum",lead+myForums[i][1]));
    }
}

function createLink(name, address) {
    var a = document.createElement("a");
    a.href = address;
    a.innerHTML = name;

    var d = document.createElement("div");
    d.setAttribute("style","height: 20px; float: left; margin-right: 1px;");
    d.appendChild(a);
    return d;
}

