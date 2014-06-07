// ==UserScript==
// @name           TM ASI-Squad Overview
// @version 	   1.0.0
// @description	   Show ASI in Squad Overview
// @namespace      http://trophymanager.com
// @include        http://static.trophymanager.com/club/*
// @include        http://www.trophymanager.com/club/*
// @include        http://trophymanager.com/club/*

// ==/UserScript==

function embed() {
   var oldFunc = makeTable;

    makeTable = function() {

        ths = ["no","name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","asi","rec","bteam"];
        gk_ths = ["no","name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,"asi","rec","bteam"];
        
    myTable = document.createElement('table');
    myTable.className = "zebra padding";

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
    init_tooltip_by_elems($(myTable).find("[tooltip]"))
    zebra();

    };
}

var inject = document.createElement("script");

inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + embed + ")()"));

document.body.appendChild(inject);


var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js", function() {

    $.noConflict();
    jQuery(document).ready(function($) {
        $('table.zebra th:eq(1)').click();
  });
});




        