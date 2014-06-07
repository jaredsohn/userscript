// ==UserScript==
// @name       TM PlayerList show ASI and Routine
// @author     XpQ
// @include    http://trophymanager.com/players/
// @include    http://trophymanager.com/players/#/a/*
// ==/UserScript==
function embed() {
    show_training=0;
    headers_ar["routine"] = {"header":"經","title":"經驗值","style":"border","width":"30px"};
    headers_ar["months"] = {"header":"月","title":"月","style":"border","width":"30px"};
    
    var constructTR = construct_tr;    
    construct_tr = function(ply_ar, count, mode) {
        var tempMonths = ply_ar["months"];
        if(ply_ar["months"]<10) ply_ar["months"]="0"+ply_ar["months"];
        constructTR(ply_ar, count, mode);        
        ply_ar["months"]=tempMonths;
        var myRow = myTable.insertRow(-1);
    }
    
    var oldFunc = makeTable;
    makeTable = function() {
            if (!show_training) {
                    ths = ["no","name","age","months","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","asi","rec","routine","bteam"];
                    gk_ths = ["no","name","age","months","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,"asi","rec","routine","bteam"];
                    myTable = document.createElement('table');
                    myTable.className = "hover zebra";
                    construct_th();
                    var z=0;
                    for (i=0; i<players_ar.length; i++) {
                            if (players_ar[i]["fp"] != "GK" && add_me(players_ar[i]) && filter_squads()) {
                                    construct_tr(players_ar[i], z);
                                    z++;
                            }
                    }
                    if (z == 0) {
                            var myRow = myTable.insertRow(-1);
                            var myCell = myRow.insertCell(-1);
                            myCell.colSpan = 24;
                            myCell.innerHTML = other_header;
                    }
                    if (filters_ar[1] == 1) {
                            var myRow = myTable.insertRow(-1);
                            var myCell = myRow.insertCell(-1);
                            myCell.className = "splitter";
                            myCell.colSpan = "50";
                            myCell.innerHTML = gk_header;
                            construct_th(true);
                            z=0;
                            for (i=0; i<players_ar.length; i++) {
                                    if (players_ar[i]["fp"] == "GK" && filter_squads()) {
                                            if (!(players_ar[i]["age"] < age_min || players_ar[i]["age"] > age_max)) {
                                                    construct_tr(players_ar[i], z, true);
                                                    z++;
                                            }
                                    }
                            }
                    }
                    $e("sq").innerHTML = "";
                    $e("sq").appendChild(myTable);
                    activate_player_links($(myTable).find("[player_link]"));
                    init_tooltip_by_elems($(myTable).find("[tooltip]"));
                    zebra();
                    $('table.zebra th:nth-child(20)').css('width', '65px');
                    $('.rec').width(75);
                    $('.position').width(69);
            } else {
                    oldFunc();
            }
    };
    makeTable();
}
var inject = document.createElement("script");
inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + embed + ")()"));
document.body.appendChild(inject);