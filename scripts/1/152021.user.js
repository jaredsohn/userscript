// ==UserScript==
// @name           TM Squad with Training Enhanced (Black Theme) - Credit to TM Auxiliary
// @version 	   1.0.1
// @description	   Show player list with ASI and enhance training display
// @namespace      http://trophymanager.com
// @include        http://trophymanager.com/players
// @include        http://trophymanager.com/players/
// @include        http://trophymanager.com/players/#*
// @include        http://*.trophymanager.com/players
// @include        http://*.trophymanager.com/players/
// @include        http://*.trophymanager.com/players/#*
// ==/UserScript==
function embed() {
    var oldFunc = makeTable;
    makeTable = function() {
        if (!show_training) {
            ths = ["no","name","age","fp","str","sta","pac","mar","tac","wor","pos","pas","cro","tec","hea","fin","lon","set","asi","rec","bteam"];
            gk_ths = ["no","name","age","fp","str","sta","pac","han","one","ref","ari","jum","com","kic","thr",,,,"asi","rec","bteam"];

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
            $('table.zebra th:nth-child(19)').css('width', '65px');
            $('.rec').width(75);
        } else {
            oldFunc();
            // Intensity & +/- alignment
            $('table.zebra tr td:nth-child(19)').css('padding-right', '12px');
            $('table.zebra tr th:nth-child(20)').css('width', '34px');
        }

        // Black/gray alternating table background
        $('table.zebra tr').css('background-color', '#222222');
        $('table.zebra tr.odd').css('background-color', 'rgb(48, 48, 48)');

        // Small training increases
        $('span.training_small').css('border', '1px rgb(141, 182, 82) solid');
        $('span.training_small').css('background-color', '#45521E');

        // Small training decreases
        $('span.training_part_down').css('border', '1px #D7220E solid');
        $('span.training_part_down').css('background-color', '#502927');

        // Big training increases
        $('span.training_big').css('font-size', '13px');
        $('span.training_big').css('font-weight', 'normal');
        $('span.training_big').css('background-color', '#93B751');
        $('span.training_big').css('color', '#000000');

        // Big training decreases
        $('span.training_down').css('font-size', '13px');
        $('span.training_down').css('font-weight', 'normal');
        $('span.training_down').css('background-color', '#D7220E');
        $('span.training_down').css('color', '#000000');

        // Increase all skill space sizes
        $('span.training_big, span.training_small, span.training_part_down, span.training_down, span.subtle').css('width', '15px');

        // No changes
        $('span.subtle').css('color', '#FFFFFF');

        // Remove position background
        $('table.zebra tr .favposition').css('background-color', '#222222');
        $('table.zebra tr.odd .favposition').css('background-color', 'rgb(48, 48, 48)');

        // Add borders to sides of tables
        $('table.zebra').css('border-left', '3px #222222 solid');
        $('table.zebra').css('border-right', '3px #222222 solid');
/*
        // Intensity & +/- alignment
        $('table.zebra tr td:nth-child(18)').css('padding-right', '12px');
        $('table.zebra tr th:nth-child(19)').css('width', '34px');
        $('table.zebra tr td:nth-child(19) span').css('width', '32px');

        // Intensity & +/- alignment for goalie coach
        $('table.zebra:eq(5) tr td:nth-child(15)').css('padding-right', '12px');
        $('table.zebra:eq(5) tr th:nth-child(15)').css('width', '34px');
        $('table.zebra:eq(5) tr td:nth-child(16) span').css('width', '32px');

        // Coach headers
        $('h3').css('background-color', '#222222');

        // Show the stars!
        $('span:contains("19")').html('<img src="/pics/star_silver.png">');
        $('span:contains("20")').html('<img src="/pics/star.png">');

        // Remove text fade
        $('.text_fade div').css('background-image', '');
*/
        $('.name').width(230);
    };
    makeTable();
}
var inject = document.createElement("script");
inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + embed + ")()"));
document.body.appendChild(inject);