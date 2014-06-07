// ==UserScript==
// @name            GM FA-Filter
// @author          Tjeerdo, 200ms edit by Patricier
// @version         1.2     
// @description     FA-Filter
// @include         http://nl*.tribalwars.nl/game.php?*
/* Functionaliteiten:
 * Sneltoetsen (A, B en C knoppen, vorig en volgende dorp), vorige/volgende pagina
 * Filters om bepaalde dingen eruit te filteren ;)
 * Sorteren op afstand/datum (oplopend/asc) (aflopend = desc)
 * 
 *
 */
/* TO-DO List:
 * 
 */
// ==/UserScript==


(function (f) {
    var d = document,
        s = d.createElement('script');
    s.textContent = '$(document).ready(' + f.toString() + ')';
    (d.body || d.head || d.documentElement).appendChild(s);
})(function () {
    // object waarin de settings worden opgeslagen
    var settings = {};
    // default settings:
    if (localStorage.getItem("settings") === null) {
        settings.attack = true;
        settings.green = false;
        settings.yellow = false;
        settings.red = true;
        settings.blue = false;
        settings.red_blue = true;
        settings.red_yellow = true;
        settings.volle_buit = false;
        settings.lege_buit = false;
        settings.distance = [0,100];
        settings.sortby = ["distance", "asc"];
        settings.sort_gs = false;
        settings.DeleteReports = false;
        localStorage.setItem('settings', JSON.stringify(settings));
        location.reload();
    }
    var settings = JSON.parse(localStorage.getItem('settings'));
    
    if(game_data.screen == "am_farm") {
        $('#linkContainer').append('<a href="#" id="settings" style="margin-left:100px">FA settings</a>');
        $("#settings").click(function () {
            a = document.createElement("div");
            a.id = "FAsettings";
            a.style.cssText = "background-color:#ecd6ad;border:2px solid #7d510f;z-index:5;top:130px;left:40%;position:absolute;padding-top:7px;padding-left:7px;width:300px;border-radius:7px;box-shadow:0 0 50px 15px #000000;";
            document.body.appendChild(a);
            a.innerHTML = '<h2 style="text-align: center;">settings FA-Filter</h2><table style="width: inherit;"><tbody><tr><th colspan="2">Automatische filters:</th></tr><tr><td><input type="checkbox" name="attack" class="filters"></td><td>lopende aanvallen filteren</td></tr><tr><td><input type="checkbox" name="green" class="filters"></td><td>groen filteren</td></tr><tr><td><input type="checkbox" name="yellow" class="filters"></td><td>geel filteren</td></tr><tr><td><input type="checkbox" name="red" class="filters"></td><td>rood filteren</td></tr><tr><td><input type="checkbox" name="blue" class="filters"></td><td>blauw filteren</td></tr><tr><td><input type="checkbox" name="red_blue" class="filters"></td><td>rood_blauw filteren</td></tr><tr><td><input type="checkbox" name="red_yellow" class="filters"></td><td>rood_geel filteren</td></tr><tr><td><input type="checkbox" name="volle_buit" class="filters"></td><td>volle buit filteren</td></tr><tr><td><input type="checkbox" name="lege_buit" class="filters"></td><td>Lege buit filteren</td></tr><tr><th colspan="2">Afstandsfilter</th></tr><tr><td><input type="number" name="min_distance" class="afstandsfilter" style="width:40px"></td><td>Minimale afstand</td></tr><tr><td><input type="number" name="max_distance" class="afstandsfilter" style="width:40px"></td><td>maximale afstand</td></tr></tbody></table><table width="100%"><tbody><tr><th>Automatisch sorteren</th></tr><tr><td><select name="sortby" class="sort"><option name="asc">asc(oplopend)</option><option name="desc">desc(aflopend)</option></select><select name="dur_date" class="sort"><option name="distance">Op afstand</option><option name="date">Op datum</option></select></td></tr><tr><td><input type="checkbox" name="sort_gs" class="filters">GS sorteren</td></tr></tbody></table><table width="100%"><tbody><tr><th colspan="2">Overige instellingen</th></tr><tr><td><input type="checkbox" name="DeleteReports" class="overige"></td><td>Berichten verwijderen</td></tr></tbody></table>';
            a.innerHTML += '<div style="color:#7d510f;text-align:right;padding-right:7px;padding-bottom:5px;"><a id="sluiten" href="javascript:void(0)">sluiten</a></div>';
        for(key in settings) {
            if($.type(settings[key]) === "boolean" && settings[key] == true) {
                $('input[name=' + key + ']').attr('checked', true);
            } else if($.type(settings[key]) === "array") {
                if(!key == "sortby") {
                $('option[name=' + settings[key][0] + ']').attr('selected', true);
                $('option[name=' + settings[key][1] + ']').attr('selected', true);
                } else {
                    $('input[name=min_' + key + ']').val(settings[key][0]);
                    $('input[name=max_' + key + ']').val(settings[key][1]);
                }
            }
        }
            $("#sluiten").click(function () {
                $("input.filters").each(function () {
                    if ($(this).is(':checked')) {
                        var name = $(this).attr("name");
                        settings[name.toString()] = true;
                    } else {
                        var name = $(this).attr("name");
                        settings[name.toString()] = false;
                    }
                });
                settings["distance"][0] = parseFloat($("input.afstandsfilter:first").val());
                settings["distance"][1] = parseFloat($("input.afstandsfilter:last").val());
                var keuze = $("select.sort:first option:selected").attr("name").toString();
                var keuze2 = $("select.sort:last option:selected").attr("name").toString();
                settings["sortby"] = [keuze2, keuze];
                if($("input.overige").is(':checked')) {
                settings["DeleteReports"] = true;
                } else {
                    settings["DeleteReports"] = false;
                }
                localStorage.setItem('settings', JSON.stringify(settings));
                $("div#FAsettings").remove();
                location.reload();
            });
        });
        $("a.farm_icon_c, a.farm_icon_b, a.farm_icon_a").click(function () {
            if(settings["DeleteReports"] == true) {
                $(this).closest('tr').find("img[src*='delete_small.png']").closest('td').find('a').click()
            } else {
            $(this).closest('tr').remove();
            }
        });
        for(key in settings) {
            if($.type(settings[key]) === "boolean" && settings[key] == true) {
                if(key === "volle_buit") {
                    $("div#am_widget_Farm img[src*='1.png']").each(function (i, e) {
                        $(this).closest('tr').remove();
                    })
                } else if(key === "lege_buit") {
                    $("div#am_widget_Farm img[src*='0.png']").each(function (i, e) {
                        $(this).closest('tr').remove();
                    })
                } else if(key === "sort_gs") {
                    function j(a) {
                        var c = a.cells[5].textContent.split(" ");
                        var u = 0;
                        for (var i = 0; i < c.length; i++) u += parseInt(c[i].replace(/\D/g, "")) || 0;
                        return u
                    }
                    void(function () {
                        s = $("tr[class*=\"row_\"]").sort(function (a, b) {
                            return j(b) - j(a)
                        });
                        for (i = 0; i < $("tr[class*=\"row_\"]").length; i++) {
                            $('#am_widget_Farm tr:last').before(s[i])
                        }
                    })();
                } else {
                    $("div#am_widget_Farm img[src*='" + key + ".png']").each(function (i, e) {
                        $(this).closest('tr').remove();
                    })
                }
            } else if($.type(settings[key]) === "array") {
                if(!document.URL.match("&order=" + settings[key][0] + "&dir=" + settings[key][1]) && key === "sortby") {
                    location.href = game_data.link_base_pure + "am_farm&order=" + settings[key][0] + "&dir=" + settings[key][1] + "&Farm_page=0";
                } else if(key === "distance"){
                    
                    $("#am_widget_Farm tr td:nth-child(8)").each(function () {
                    if($(this).text() > settings[key][1]) {
                        $(this).closest("tr").remove();
                    }
                    if($(this).text() < settings[key][0]) {
                        $(this).closest("tr").remove();
                    }
                })
                }
            }
        }
		
		var keys={};
        $(document).keydown(function(event) {
			keys[event.which] = true;
		}).keyup(function(event) {
			delete keys[event.which];
		});
		function keyloop() {
		//39 is de keycode voor het rechterpijltje
            if(keys[39]) location.href = document.getElementById("village_switch_right").href.replace(/page=\d+/, "page=0");
			// 37 is de keycode voor het linkerpijltje
            if(keys[37]) location.href = document.getElementById("village_switch_left").href.replace(/page=\d+/, "page=0");
            //68 is de keycode voor de D
            if(keys[68]) location.href = document.URL.replace(/page=\d+/, "page=" + ++(document.URL.match(/page=(\d+)/) || [, 0])[1]);
            // 83 is de keycode voor de S
            if(keys[83]) location.href = document.URL.replace(/page=\d+/, "page=" + --(document.URL.match(/page=(\d+)/) || [, 0])[1]);
            // 65 is de keycode voor de A
            if(keys[65]) $(".farm_icon_a:first").click();
            // 66 is de keycode voor de B
            if(keys[66]) $(".farm_icon_b:first").click();
			// 67 is de keycode voor de C
            if(keys[67]) $(".farm_icon_c:first").click();  
        }
		setInterval(keyloop,200);
    }
    $(".manager_icon:first").attr("href", $(".manager_icon")[0].href + "&order=" + settings["sortby"][0] + "&dir=" + settings["sortby"][1] + "&Farm_page=0");
	
});