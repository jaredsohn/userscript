// ==UserScript==
// @name           GLB GM Sort
// @namespace      GLB
// @author         DDCUnderground
// @description    Retrieve and sort gm'ed teams based on role
// @include        http://goallineblitz.com/game/home.pl*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
// 



$(document).ready(function(){


function doFilt(){
    var filtstring='';
    var cookiestr='';
    for (w=0;w<checkarray.length;w++) {
        checkarray[w][2]=0;
    }
    $('.GMOptionschk').each(function(p){
        if ($(this).attr('checked') == true){ 
            switch($(this).attr('id')){
            case 'COOWNED':
                filtstring += 'CO OWNED;'
                checkarray[0][2] = 1
                break;
            case 'OC':
                filtstring += 'OC;'
                checkarray[0][2] = 1
                break;
            case 'DC':
                filtstring += 'DC;'
                checkarray[1][2] = 1
                break;
            case 'STCOACH':
                filtstring += 'ST COACH;'
                checkarray[2][2] = 1
                break;
            case 'CFO':
                filtstring += 'CFO;'
                checkarray[3][2] = 1
                break;
            case 'SCOUTS':
                filtstring += 'SCOUTS;'
                checkarray[4][2] = 1
                break;
            case 'RECRUITERS':
                filtstring += 'RECRUITERS;'
                checkarray[5][2] = 1
                break;
            case 'HEADCOACH':
                filtstring += 'HEAD COACH;'
                checkarray[6][2] = 1
                break;
            case 'GM':
                filtstring += 'GM;'
                checkarray[7][2] = 1
                break;
            }
        }
    })
    if (filtstring.length > 0) {
        filtstring = filtstring.substr(0, filtstring.length -1);
    }
    var checkeditems = filtstring.split(';');
    
    for (var loop=0;loop<gmdteams.length;loop++) {
        gmdteams[loop][4] = 0;
        for (var checkloop=0;checkloop<checkeditems.length;checkloop++) {
            if (checkeditems[checkloop].indexOf(gmdteams[loop][3].toUpperCase())>-1) {
                gmdteams[loop][4] = 1;
            }
        }
    }

    $('div[class="team"], div[class*="team_simple"]',$('#gm_teams')).each(function(i){
        // gmdteams[i][0] = team link
        // gmdteams[i][1] = team id
        // gmdteams[i][2] = team name
        // gmdteams[i][3] = team role
        // gmdteams[i][4] = team show
        // gmdteams[i][5] = team html
        // gmdteams[i][6] = team div style
        var teamlink = $('a[href*="/game/team.pl?team_id="]',$(this)).attr('href');
        for (var ddc=0;ddc<gmdteams.length;ddc++) {
            if (gmdteams[ddc][0]==teamlink) {
                gmdteams[ddc][5] = $(this).html();
            }
        }

    })


    var teamsize = $('div[class*="team_simple"]').size();
    var usemargin =1;
    var gmlist = '';
    for (loop=0;loop<gmdteams.length;loop++) {
        gmdteams[loop][6] = gmdteams[loop][6].replace('margin-right: 10px;','');
        if (gmdteams[loop][4] == 1) {
            if (usemargin ==1) {
                gmdteams[loop][6] = 'margin-right: 10px;' + gmdteams[loop][6];
                if (teamsize>0) {
                    gmlist += '<div class="content_container team_simple" style="' + gmdteams[loop][6] + '">' + gmdteams[loop][5] + '</div>';
                }else{
                    gmlist += '<div class="team" style="' + gmdteams[loop][6] + '">' + gmdteams[loop][5] + '</div>';
                }
                usemargin = 0;
            }else{
                if (teamsize>0) {
                    gmlist += '<div class="content_container team_simple" style="' + gmdteams[loop][6] + '">' + gmdteams[loop][5] + '</div>';
                }else{
                    gmlist += '<div class="team" style="' + gmdteams[loop][6] + '">' + gmdteams[loop][5] + '</div>';
                }
                usemargin = 1;
            }
        }
    }

    $('#gm_teams').html('<div class="medium_head">My  GMed Teams<span style="font-size: 12px;"> ( <a href="/game/user_gm.pl">Edit</a> )</span></div>' + gmlist +'<div class="clear">&nbsp;</div>');

    var ddcjavcookie ='';

    $('.GMOptionschk').each(function(o){
        if ($(this).attr('checked')==true) {
            ddcjavcookie += '1,';
        }else{
            ddcjavcookie += '0,';
        }
    })

    $('div[class="team"], div[class*="team_simple"]',$('#gm_teams')).each(function(hj){
        var teamlink = $('a[href*="/game/team.pl?team_id="]',$(this)).attr('href');
        var teamname = $('a[href*="/game/team.pl?team_id="]',$(this)).text();
        for (var ddc=0;ddc<gmdteams.length;ddc++) {
            if (gmdteams[ddc][0]==teamlink) {
                if (gmdteams[ddc][2] == teamname) {
                    $('a[href*="/game/team.pl?team_id="]',$(this)).append(' (' + gmdteams[ddc][3] + ')');
                }
                
            }
        }
        
    })

    ddcjavcookie = ddcjavcookie.substring(0,ddcjavcookie.length -1);

    createCookie('gmDDCsort', ddcjavcookie, 30);
    
}

function doSort(){
    var oSelect = document.getElementById("sortGMs");
    var type = oSelect.options[oSelect.selectedIndex].value;

    var newOrder = new Array();


    switch (type){
        case 'Names':
            sortKey(2, 0);
            break;
        case 'Roles':
            sortKey(3, 0);
            break;
        default:
            sortKey(1, 0);
            break;
    }
    
}

function sortKey(k, num){
	
	
	var sortedArray	= new Array();


    var x, y
    // The Bubble Sort method.
    var holder = new Array(4);
    var sortSelect = document.getElementById("adGMs");
	var sortOrder = sortSelect.options[sortSelect.selectedIndex].value;
    if(sortOrder=="Ascending")	{
            for(x = 0; x < gmdteams.length; x++) {
                for(y = 0; y < (gmdteams.length-1); y++) {
                    if(gmdteams[y][k] < gmdteams[y+1][k]) {
                        holder = gmdteams[y+1];
                        gmdteams[y+1] = gmdteams[y];
                        gmdteams[y] = holder;
                    }
                }
            }
        }else{
            for(x = 0; x < gmdteams.length; x++) {
                for(y = 0; y < (gmdteams.length-1); y++) {
                    if(gmdteams[y][k] > gmdteams[y+1][k]) {
                        holder = gmdteams[y+1];
                        gmdteams[y+1] = gmdteams[y];
                        gmdteams[y] = holder;
                    }
                }
            }
        }

    
	doFilt();
	
}


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

// get current username
var username = $('td[class="account_value"]:first').text();
// build array for each gm'ed teams
var gmdteams = new Array;
$('div[class="team"], div[class*="team_simple"]',$('#gm_teams')).each(function(i){
    gmdteams[i] = new Array;
    // gmdteams[i][0] = team link
    // gmdteams[i][1] = team id
    // gmdteams[i][2] = team name
    // gmdteams[i][3] = team role
    // gmdteams[i][4] = team show
    // gmdteams[i][5] = team html
    // gmdteams[i][6] = team div style
    gmdteams[i][0] = $('a[href*="/game/team.pl?team_id="]',$(this)).attr('href');
    gmdteams[i][1] = gmdteams[i][0].substring(gmdteams[i][0].indexOf('team_id=')+8);
    gmdteams[i][2] = $('a[href*="/game/team.pl?team_id="]',$(this)).text();
    gmdteams[i][3] = '';
    gmdteams[i][4] = '1';
    gmdteams[i][5] = $(this).html();
    gmdteams[i][6] = $(this).attr('style');
    if (typeof(gmdteams[i][6])=='undefined') {
        gmdteams[i][6] ='';
    }else{
        gmdteams[i][6] = gmdteams[i][6].replace('margin-right: 10px;','');
    }
})

// build objects for sorting/filtering
var sortTypes = new Array;
sortTypes[0] = ' ';
sortTypes[1] = 'Names';
sortTypes[2] = 'Roles';
var saved = '';
var options = ""   
var checkarray = new Array(9);
for (var arrayloop = 0; arrayloop<checkarray.length;arrayloop++) {
    checkarray[arrayloop] = new Array(3);
    checkarray[arrayloop][2] = 1;
}

checkarray[0][0] = 'OC';
checkarray[0][1] = 'OC';
checkarray[1][0] = 'DC';
checkarray[1][1] = 'DC';
checkarray[2][0] = 'STCOACH';
checkarray[2][1] = 'ST';
checkarray[3][0] = 'CFO';
checkarray[3][1] = 'CFO';
checkarray[4][0] = 'SCOUTS';
checkarray[4][1] = 'Scout';
checkarray[5][0] = 'RECRUITERS';
checkarray[5][1] = 'Recruiter';
checkarray[6][0] = 'HEADCOACH';
checkarray[6][1] = 'Head Coach';
checkarray[7][0] = 'GM';
checkarray[7][1] = 'GM';
checkarray[8][0] = 'COOWNED';
checkarray[8][1] = 'Co Owned';

var sortbox1 = document.createElement('select');
sortbox1.setAttribute('id', 'sortGMs');
for (var t=0;t<sortTypes.length;t++) {
    sortbox1.options[t] = new Option(sortTypes[t],sortTypes[t], false, false);
}

var sortbox2 = document.createElement('select');
sortbox2.setAttribute('id','adGMs');
sortbox2.options[0] = new Option('Descending','Descending', true, true);
sortbox2.options[1] = new Option('Ascending','Ascending', false, false);

var javcookie = readCookie('gmDDCsort');
if (javcookie != null) {
    var javsplit = javcookie.split(',');
    for (var w=0;w<javsplit.length;w++) {
        checkarray[w][2] = javsplit[w];
    }
}


var checkboxstr ='';
for (arrayloop =0 ; arrayloop<checkarray.length;arrayloop++) {
    if (checkarray[arrayloop][2] ==1) {
        checkboxstr += '  <INPUT TYPE=CHECKBOX class="GMOptionschk" ID="' + checkarray[arrayloop][0] + '" Checked>'+ checkarray[arrayloop][1] + ' ';
    }else{
        checkboxstr += '  <INPUT TYPE=CHECKBOX class="GMOptionschk" ID="' + checkarray[arrayloop][0] + '">'+ checkarray[arrayloop][1] + ' ';
    }
    
}

$('#players_teams').prepend(checkboxstr);
$('#players_teams').prepend(sortbox2);
$('#players_teams').prepend(sortbox1);

$('.GMOptionschk').change(doFilt);
$('#sortGMs,#adGMs').change(doSort);




// total team count
var teamcount = $('div[class="team"], div[class*="team_simple"]',$('#gm_teams')).size();
// get each teams role
for (var q=0;q<gmdteams.length;q++) {
    $.get("http://goallineblitz.com" + gmdteams[q][0],function(teamdata){
        var curteamlink = $('a[href*="/game/team.pl?team_id="]',teamdata).attr('href');
        $('div[class="team_coordinators"],div[id="team_gms"]',teamdata).each(function(z){
            var thishtml = $(this).html();
            if (thishtml.indexOf(username)>-1) {
                for (var z=0;z<gmdteams.length;z++) {
                    if (curteamlink==gmdteams[z][0]) {
                        if (gmdteams[z][3].length>0) {
                            gmdteams[z][3] += ','
                        }
                        gmdteams[z][3] += thishtml.substring(0,thishtml.indexOf('<a'));
                        gmdteams[z][3] = gmdteams[z][3].replace(/ /g,'');
                        gmdteams[z][3] = gmdteams[z][3].replace(/:/g,'');
                        gmdteams[z][3] = gmdteams[z][3].toUpperCase();
                        gmdteams[z][3] = gmdteams[z][3].replace('GMS','GM');
                        switch(gmdteams[z][3]) {
                        case "HEADCOACH":
                            gmdteams[z][3] = "HEAD COACH";
                            break;
                        case "OWNEDBY":
                            gmdteams[z][3] = "CO OWNED";
                            break;
                        case "STCOACH":
                            gmdteams[z][3] = "ST COACH";
                            break;
                        }
                    }
                }
            }
        })
        for (var z=0;z<gmdteams.length;z++) {
            if (curteamlink==gmdteams[z][0]) {
                var prepend = gmdteams[z][5].substring(0, gmdteams[z][5].indexOf('</a>')+4)
                var append = gmdteams[z][5].substring(gmdteams[z][5].indexOf('</a>')+4)
                gmdteams[z][5] = prepend + '(' + gmdteams[z][3] + ')' + append;
                //alert(gmdteams[z][3]);
            }
        }
        teamcount = teamcount - 1;
        if (teamcount == 0) {
            doSort();
        }
    })
}







})
