// ==UserScript==
// @name        Petit missionaire en tableau
// @namespace   DinoRPG
// @description Affichage du petit missionaire sous forme de tableau
// @include     http://www.dinorpg.com/dino/missions
// @version     1
// @author      fylb
// @grant       none
// ==/UserScript==

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

function MissionaireAsTable () {
    this.dinos = [];
    this.commanditaires = {};
    this.total_missions = 0;
    function Dino(id, name) {
        this.id = id;
        this.name = name;
        this.missions = {};
        this.nb_missions = 0;
    }
    function log(msg) {
        console.log(msg);
    }
    function get_information() {
        $("#centerContent .table tr:gt(0)").each(function(i, el) {
            var dino_id = $(el).find(".swf").attr("id").replace("swf_sdino_oview_", "");
            var toolbar_dino = $("#dinozList li>a[href='/dino/"+dino_id+"']");
            var dino = new Dino(dino_id, $(".name", toolbar_dino).text().trim());
            if (toolbar_dino.length) {
                dinos.push(dino);
            }
            $("ul li", el).each(function(j, elm) {
                var line = $(elm).text().trim();
                if (line.indexOf("Total") != -1) {
                    total_missions = parseInt(line.replace(/.*\d+\//, ''));
                } else {
                    var missions = line.replace(/\s+.*/, ''),
                        nb_missions = parseInt(missions.replace(/\d+\//, '')),
                        missions_done = parseInt(missions.replace(/\/d+/, '')),
                        commanditaire = line.replace(/\d+\/\d+\s+/, '');
                    commanditaires[commanditaire] = nb_missions;
                    dino.missions[commanditaire] = [missions_done, nb_missions];
                    dino.nb_missions += missions_done;
                    //log(dino.name +" "+commanditaire+ " " +missions_done+ "/"+nb_missions);
                }
            });
        });
    }
    function make_table() {
        $("#centerContent").children().remove();
        var $table = $("<table></table>"),
            $header = $("<tr/>");
        $header.append($("<td/>"));
        header_style = 'font-size: 10px; color: black;';
        var comm_array = [];
        for (c in commanditaires) {
            $header.append($("<td/>", { title: c, text: c.substr(0,4), style: header_style }));
            comm_array.push(c);
        }
        $header.append($("<td/>", { text: 'Total', style: header_style} ));
        $table.append($header);
        dinos.sort(function(a,b) { return b.nb_missions - a.nb_missions});
        for (d in dinos) {
            var $tr = $("<tr/>"),
                dino = dinos[d];
            $tr.append($("<td/>", { text: dino.name, style: header_style }));
            for (i in comm_array) {
                var style_mission = 'font-size: 10px; color: black;',
                    done = "",
                    c = comm_array[i];
                if (!dino.missions[c]) {
                    style_mission += 'background-color: red';
                    done = "0/"+commanditaires[c];
                } else if (dino.missions[c][0] < dino.missions[c][1]) {
                    style_mission += 'background-color: yellow';
                    done = dino.missions[c][0]+"/"+dino.missions[c][1];
                } else {
                    style_mission += 'background-color: green';
                    done = dino.missions[c][0]+"/"+dino.missions[c][1];
                }
                $tr.append($("<td/>", { text: done, style: style_mission }));
            }
            $tr.append($("<td/>", { text: dino.nb_missions+"/"+total_missions, style: header_style }));
            $table.append($tr);
        }
        $("#centerContent").append($table);
    }
    $(document).ready(function() {
        get_information();
        make_table();
    });
}
MissionaireAsTable();
