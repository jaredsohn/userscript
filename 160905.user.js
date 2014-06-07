// ==UserScript==
// @name            Powerplay Manager Enhanced.
// @namespace       http://www.team-rebel.com
// @version         0.1
// @description     enter something useful
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require         http://dev.team-rebel.com/wessel/ppme.utils.js
// @match           http://soccer.powerplaymanager.com/*
// @match           http://hockey.powerplaymanager.com/*
// @copyright       2013+, Wessel van der Veen
// ==/UserScript==

var sUrls = {"s1":"http://soccer.powerplaymanager.com/en/lineup.html?data=club-a-1",
            "s2":"http://soccer.powerplaymanager.com/en/players-practice.html?data=5120-a"};
var hUrls = {"h1":"http://hockey.powerplaymanager.com/en/edit-line.html?data=1-1",
            "h2":"http://hockey.powerplaymanager.com/en/players-practice.html?data=5289-a"};
var p = {};

function myCallback(_html, sitekey){
    _html.find('#table-1').find('tbody').find('tr').each(function(index, tr){
        var body_mock = '<div id="body-mock">' + tr.innerHTML + '</div>';
        var _tr = $(body_mock);
        var _a = _tr.find('a');
        var str = _a[1].href;
        var n = str.split('=');
        var v = n[1].split('-');
        var surname = "";
        var id = v[0];
        for(var y=2; y<v.length; y++){
            surname = surname + " " + v[y];
        }
        if(urls[sitekey] == urls['s1']){
            p[id] = new sPlayer(v[0],v[1],surname,strip_tags(tr.cells[2].innerHTML),'','',strip_tags(tr.cells[3].innerHTML),strip_tags(tr.cells[4].innerHTML),strip_tags(tr.cells[5].innerHTML),strip_tags(tr.cells[6].innerHTML),strip_tags(tr.cells[7].innerHTML),strip_tags(tr.cells[8].innerHTML),strip_tags(tr.cells[9].innerHTML),strip_tags(tr.cells[10].innerHTML),strip_tags(tr.cells[11].innerHTML),strip_tags(tr.cells[12].innerHTML),strip_tags(tr.cells[13].innerHTML),strip_tags(tr.cells[14].innerHTML),strip_tags(tr.cells[15].innerHTML),strip_tags(tr.cells[16].innerHTML),tr.cells[1].children[0].children[0].alt);
        }else if(urls[sitekey] == urls['s2']){
            p[id].cl=strip_tags(tr.cells[4].innerHTML);
            p[id].goaq=strip_tags(tr.cells[5].children[1].innerHTML);
            p[id].defq=strip_tags(tr.cells[6].children[1].innerHTML);
            p[id].midq=strip_tags(tr.cells[7].children[1].innerHTML);
            p[id].offq=strip_tags(tr.cells[8].children[1].innerHTML);
            p[id].shoq=strip_tags(tr.cells[9].children[0].innerHTML);
            p[id].pasq=strip_tags(tr.cells[10].children[1].innerHTML);
            p[id].tecq=strip_tags(tr.cells[11].children[1].innerHTML);
            p[id].speq=strip_tags(tr.cells[12].children[1].innerHTML);
            p[id].heaq=strip_tags(tr.cells[13].children[1].innerHTML);
        }else if(urls[sitekey] == urls['h1']){
            p[id] = new hPlayer(v[0],v[1],surname,strip_tags(tr.cells[4].innerHTML),'','',strip_tags(tr.cells[6].innerHTML),strip_tags(tr.cells[7].innerHTML),strip_tags(tr.cells[8].innerHTML),strip_tags(tr.cells[9].innerHTML),strip_tags(tr.cells[10].innerHTML),strip_tags(tr.cells[11].innerHTML),strip_tags(tr.cells[12].innerHTML),strip_tags(tr.cells[13].innerHTML),'',strip_tags(tr.cells[5].innerHTML),strip_tags(tr.cells[15].innerHTML),strip_tags(tr.cells[14].innerHTML),tr.cells[2].children[0].children[0].alt);
        }else if(urls[sitekey] == urls['h2']){
            p[id].cl=strip_tags(tr.cells[4].innerHTML);
            p[id].goaq=strip_tags(tr.cells[5].children[0].innerHTML);
            p[id].defq=strip_tags(tr.cells[6].children[0].innerHTML);
            p[id].offq=strip_tags(tr.cells[7].children[0].innerHTML);
            p[id].shoq=strip_tags(tr.cells[8].children[0].innerHTML);
            p[id].pasq=strip_tags(tr.cells[9].children[0].innerHTML);
            p[id].tecq=strip_tags(tr.cells[10].children[0].innerHTML);
            p[id].agrq=strip_tags(tr.cells[11].children[0].innerHTML);
        }
    });
    
}

function objToCSV(obj, type){
    if(type == "soccer"){
        csv = "Nationality,Name,Surname,Age,Cl,Goa,Def,Mid,Off,Sho,Pas,Tec,Spe,Hea,Exp,Che,Ene,PrS,Or\n";
        for(var key in obj){
            csv = csv + obj[key].nat + "," + obj[key].name + "," + obj[key].surname + "," + obj[key].age + "," + obj[key].cl + "," + obj[key].goa + "," + obj[key].def + "," + obj[key].mid + "," + obj[key].off + "," + obj[key].sho + "," + obj[key].pas + "," + obj[key].tec + "," + obj[key].spe + "," + obj[key].hea + "," + obj[key].exp + "," + obj[key].che + "," + obj[key].ene + "," + obj[key].prs + "," + obj[key].or + "\n";        
        }
        csv = csv + "\n\nNationality,Name,Surname,Age,Cl,GoaQ,DefQ,MidQ,OffQ,ShoQ,PasQ,TecQ,SpeQ,HeaQ\n";
        for(var key in obj){
            csv = csv + obj[key].nat + "," + obj[key].name + "," + obj[key].surname + "," + obj[key].age + "," + obj[key].cl + "," + obj[key].goaq + "," + obj[key].defq + "," + obj[key].midq + "," + obj[key].offq + "," + obj[key].shoq + "," + obj[key].pasq + "," + obj[key].tecq + "," + obj[key].speq + "," + obj[key].heaq + "\n";        
        }
    }else if(type == "hockey"){
        csv = "Nationality,Name,Surname,Age,Cl,Goa,Def,Off,Sho,Pas,Tec,Agr,Exp,Che,Ene,PrS\n";
        for(var key in obj){
            csv = csv + obj[key].nat + "," + obj[key].name + "," + obj[key].surname + "," + obj[key].age + "," + obj[key].cl + "," + obj[key].goa + "," + obj[key].def + "," + obj[key].off + "," + obj[key].sho + "," + obj[key].pas + "," + obj[key].tec + "," + obj[key].agr + "," + obj[key].exp + "," + obj[key].che + "," + obj[key].ene + "," + obj[key].prs + "," + "\n";        
        }
        csv = csv + "\n\nNationality,Name,Surname,Age,Cl,GoaQ,DefQ,OffQ,ShoQ,PasQ,AgrQ,HeaQ\n";
        for(var key in obj){
            csv = csv + obj[key].nat + "," + obj[key].name + "," + obj[key].surname + "," + obj[key].age + "," + obj[key].cl + "," + obj[key].goaq + "," + obj[key].defq + "," + obj[key].offq + "," + obj[key].shoq + "," + obj[key].pasq + "," + obj[key].tecq + "," + obj[key].agrq + "\n";        
        }
    }
    return csv;
}

function retrievePlayers(type){
    $("body").append ( '                                                          \
        <div class="white_box" id="gmPopupContainer">                                               \
            <div id="loading">One moment please, gathering player information.</br></br><div><img src="http://dev.team-rebel.com/wessel/ajax-loader.gif"></img></div></div>           \
                      \
        </div>                                                                    \
    ' );
    GM_addStyle ( "#gmPopupContainer {\
        position:               fixed;\
        top:                    50%;\
        left:                   35%;\
        padding:                1em 2em 2em 2em;\
        z-index:                777;\
        height: 60px;\
        text-align: center;\
    }");
    if(type == "soccer"){
        urls = sUrls;
    }else if(type == "hockey"){
        urls = hUrls;
    }
    for(var key in urls){
        var jqxhr = $.ajax({
            url:urls[key],
            type:'get',
            async:false,
            dataType:'html',
        }).done(function(data, status, xhr){
            body = '<div id="body-mock">' + data.replace(/^[\s\S]*<body.*?>|<\/body>[\s\S]*$/g, '') + '</div>';
            var _html = $(body);
            myCallback(_html, key);
        });
    }
    string = objToCSV(p, type);
    constructDownloadLink(string);
}

function constructDownloadLink(csv){
    $("#gmPopupContainer").remove ();
    var div =  '                                                          \
        <div class="white_box" id="gmPopupContainer">Here\'s the download link:</br></br><a id="download" download="players.csv" href="data:application/csv;charset=utf-8,' + encodeURIComponent(csv) + '">Click me!</a></br></br>Just change the .part in .csv, and it\'ll open with Excel!<div/>                                                                  \
    ' ;
    $("body").append (div);
    var link2 = document.getElementById("download");
      link2.addEventListener('click',function(){ $("#gmPopupContainer").remove(); },false);
    
}

function addExportOption(sport){
    $("#sub_menu_ua_" + sport + "_season_bonuses").parent().append('<li id="export_' + sport + '_players"><a href="#">Export players to CSV</a></li>');
    addLinkListener(sport);
}
 
function addLinkListener(sport){
    $("#export_" + sport + "_players").click(function() {
        retrievePlayers(sport);
    });
}

window.addEventListener("load", function(e) {
    var currentURL = (document.location+'');
    var c = currentURL.split('//');
    var s = c[1].split('.');
    addExportOption(s[0]);
}, false);