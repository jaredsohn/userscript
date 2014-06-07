// ==UserScript==
// @name            GM FA-Filter
// @author          Tjeerdo
// @version         1.4    
// @description     FA-Filter
// @include         http://nl*.tribalwars.nl/game.php?*screen=am_farm*
// @include         http://es*.guerrastribales.es/game.php?*screen=am_farm*
// @include         http://en*.tribalwars.net/game.php?*screen=am_farm*
// @include         http://de*.die-staemme.de/game.php?*screen=am_farm*
// @include         http://nl*.tribalwars.nl/game.php?*screen=report*
// @include         http://es*.guerrastribales.es/game.php?*screen=report*
// @include         http://en*.tribalwars.net/game.php?*screen=report*
// @include         http://de*.die-staemme.de/game.php?*screen=report*
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
    var settings = JSON.parse(localStorage.getItem('settings')) || {};
    // default settings:
    if (localStorage.getItem("settings") === null || settings.version !== "1.4") {
        settings.version = "1.4";
        settings.attack = true;
        settings.green = false;
        settings.yellow = false;
        settings.red = true;
        settings.blue = false;
        settings.red_blue = true;
        settings.red_yellow = true;
        settings.volle_buit = false;
        settings.lege_buit = false;
        settings.disabled_icon_a = false;
        settings.disabled_icon_b = false;
        settings.disabled_icon_c = false;
        settings.distance = [0,100];
        settings.gsfilter = {
            "per_gs": false,
            "all_gs_combined": true,
            "min_hout":80,
            "min_leem":80,
            "min_ijzer":80,
            "min_gs": 240,
            "unknown_gs": false
        };
        settings.wall = {
            "min_lvl":0,
            "max_lvl":20,
            "wall_sort": false,
            "unknown_wall": false
        };
        settings.sortby = ["distance", "asc"];
        settings.sort_gs = false;
        settings.DeleteReports = false;
        settings.autoSelectFarmReports = true;
        /*settings.hotkeys = {
            
        };*/
        localStorage.setItem('settings', JSON.stringify(settings));
        location.reload();
    }
    
    $('#linkContainer').append('<a href="#" id="FA_settings"> - FA settings</a>');
    $("#FA_settings").click(function () {
        a = document.createElement("div");
        a.id = "FAsettings";
        a.style.cssText = "background-color:#ecd6ad;border:2px solid #7d510f;z-index:5;top:100px;left:"+(($(document).width()-600)/2)+"px;position:absolute;padding-top:7px;padding-left:7px;width:600px;border-radius:7px;box-shadow:0 0 50px 15px #000000;";
        document.body.appendChild(a);
        a.innerHTML = '<h2 style="text-align: center;">settings FA-Filter</h2><table style="width:300px;float:left;"><tbody><tr><th colspan="2">Automatische filters:</th></tr><tr><td><input type="checkbox" name="attack" class="filters"></td><td>lopende aanvallen filteren</td></tr><tr><td><input type="checkbox" name="green" class="filters"></td><td>groen filteren</td></tr><tr><td><input type="checkbox" name="yellow" class="filters"></td><td>geel filteren</td></tr><tr><td><input type="checkbox" name="red" class="filters"></td><td>rood filteren</td></tr><tr><td><input type="checkbox" name="blue" class="filters"></td><td>blauw filteren</td></tr><tr><td><input type="checkbox" name="red_blue" class="filters"></td><td>rood_blauw filteren</td></tr><tr><td><input type="checkbox" name="red_yellow" class="filters"></td><td>rood_geel filteren</td></tr><tr><td><input type="checkbox" name="volle_buit" class="filters"></td><td>volle buit filteren</td></tr><tr><td><input type="checkbox" name="lege_buit" class="filters"></td><td>Lege buit filteren</td></tr><tr><td><input type="checkbox" name="disabled_icon_a" class="filters"></td><td>inactieve A-knoppen filteren</td></tr><tr><td><input type="checkbox" name="disabled_icon_b" class="filters"></td><td>inactieve B-knoppen filteren</td></tr><tr><td><input type="checkbox" name="disabled_icon_c" class="filters"></td><td>inactieve C-knoppen filteren</td></tr><tr><td><input type="checkbox" name="unknown_gs" class="resourcesfilter"></td><td>Onbekend aantal GS wegfilteren</td></tr><tr><td><input type="checkbox" name="unknown_wall" class="wallfilter"></td><td>Onbekende muur lvls wegfilteren</td></tr><tr><td><input type="checkbox" name="autoSelectFarmReports" class="reportfilter"></td><td>farm rapportjes automatisch selecteren</td></tr></table><table style="width:300px;float:left;"><tr><th colspan="2">Afstandsfilter</th></tr><tr><td><input type="number" name="min_distance" class="afstandsfilter" style="width:40px"></td><td>Minimale afstand</td></tr><tr><td><input type="number" name="max_distance" class="afstandsfilter" style="width:40px"></td><td>maximale afstand</td></tr><tr><th colspan="2">Grondstoffen filter</th></tr><tr><td colspan="2"><input type="checkbox" name="allGS"> Alle GS gecombineerd <input type="checkbox" name="perGS"> per GS</td></tr><tr class="perGS"><td><input type="number" name="min_hout" class="resourcesfilter" style="width:40px"></td><td>Minimale aantal hout</td></tr><tr class="perGS"><td><input type="number" name="min_leem" class="resourcesfilter" style="width:40px"></td><td>Minimale aantal leem</td></tr><tr class="perGS"><td><input type="number" name="min_ijzer" class="resourcesfilter" style="width:40px"></td><td>Minimale aantal ijzer</td></tr><tr class="allGS"><td><input type="number" name="min_gs" class="resourcesfilter" style="width:40px"></td><td>Minimale aantal grondstoffen</td></tr><tr><th colspan="2">muur filter</th></tr><tr><td><input type="number" name="min_wall" class="wallfilter" style="width:40px"></td><td>Minimale muurlevel</td></tr><tr><td><input type="number" name="max_wall" class="wallfilter" style="width:40px"></td><td>Maximale muurlevel</td></tr></tbody></table><table style="width:300px;"><tbody><tr><th>Automatisch sorteren</th></tr><tr><td><select name="sortby" class="sort"><option name="asc">asc(oplopend)</option><option name="desc">desc(aflopend)</option></select><select name="dur_date" class="sort"><option name="distance">Op afstand</option><option name="date">Op datum</option></select></td></tr><tr><td><input type="checkbox" name="sort_gs" class="filters">op GS sorteren</td></tr><tr><td><input type="checkbox" name="sort_wall" class="filters">op muur sorteren</td></tr></tbody></table><table style="width:300px;"><tbody><tr><th colspan="2">Overige instellingen</th></tr><tr><td><input type="checkbox" name="DeleteReports" class="overige"></td><td>Berichten verwijderen</td></tr></tbody></table>';
        a.innerHTML += '<div style="color:#7d510f;text-align:right;padding-right:7px;padding-bottom:5px;width:500px;clear:both;"><a id="sluiten" href="javascript:void(0)">sluiten</a></div>';
     if ( settings.gsfilter['per_gs'] ) {
      $( '.allGS' ).hide();
    } else {
      $( '.perGS' ).hide();
    }
    var $allGS = $( 'input[name="allGS"]' );
    var $perGS = $( 'input[name="perGS"]' );
    var $allGSClass = $( '.allGS' );
    var $perGSClass = $( '.perGS' );
    $perGS.on( 'change', function () {
      if ( $perGS.is( ':checked' ) ) {
        $allGS.prop('checked', false);
        $perGSClass.show();
        $allGSClass.hide();
      } else {
        $allGS.prop('checked', true);
        $perGSClass.hide();
        $allGSClass.show();
      }
    } );
    $allGS.on( 'change', function () {
      if ( $allGS.is( ':checked' ) ) {
        $perGS.prop('checked', false);
        $perGSClass.hide();
        $allGSClass.show();
      } else {
        $perGS.prop('checked', true);
        $perGSClass.show();
        $allGSClass.hide();
      }
    } );
    for(key in settings) {
        if($.type(settings[key]) === "boolean" && settings[key] == true) {
            $('input[name=' + key + ']').prop('checked', true);
        } else if($.type(settings[key]) === "array") {
            if(!key == "sortby") {
            $('option[name=' + settings[key][0] + ']').prop('selected', true);
            $('option[name=' + settings[key][1] + ']').prop('selected', true);
            } else {
                $('input[name=min_' + key + ']').val(settings[key][0]);
                $('input[name=max_' + key + ']').val(settings[key][1]);
            }
        } else if(key == "gsfilter") {
            if (settings[key]['all_gs_combined']) {
                $('input[name="allGS"]').prop('checked', 'checked');
            }
            if (settings[key]['per_gs']) {
                $('input[name="perGS"]').prop('checked', 'checked');
            }
            $('input[name="min_hout"]').val(settings[key]['min_hout']);
            $('input[name="min_leem"]').val(settings[key]['min_leem']);
            $('input[name="min_ijzer"]').val(settings[key]['min_ijzer']);
            $('input[name="min_gs"]').val(settings[key]['min_gs'])
            if (settings[key]["unknown_gs"]) {
                $('input[name="unknown_gs"]').prop('checked', true);
            }
        } else if(key == "wall") {
            $('input[name="min_wall"]').val(settings[key]['min_lvl']);
            $('input[name="max_wall"]').val(settings[key]['max_lvl']);
            
            if (settings[key]["unknown_wall"]) {
                $('input[name="unknown_wall"]').prop('checked', true);
            }
            if (settings[key]["wall_sort"]) {
                $('input[name="sort_wall"]').prop('checked', true);
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
            settings["gsfilter"]["all_gs_combined"] = $('input[name="allGS"]').is(':checked');
            settings["gsfilter"]["per_gs"] = $('input[name="perGS"]').is(':checked');
            settings["gsfilter"]["min_hout"] = parseInt($('input[name="min_hout"]').val());
            settings["gsfilter"]["min_leem"] = parseInt($('input[name="min_leem"]').val());
            settings["gsfilter"]["min_ijzer"] = parseInt($('input[name="min_ijzer"]').val());
            settings["gsfilter"]["min_gs"] = parseInt($('input[name="min_gs"]').val());
            settings["gsfilter"]["unknown_gs"] = $('input[name="unknown_gs"]').is(':checked');
            settings.autoSelectFarmReports = $('input[name="autoSelectFarmReports"]').is(':checked');
            // wall
            settings["wall"]["min_lvl"] = parseInt($('input[name="min_wall"]').val());
            settings["wall"]["max_lvl"] = parseInt($('input[name="max_wall"]').val());
            settings["wall"]["wall_sort"] = $('input[name="sort_wall"]').is(':checked');
            settings["wall"]["unknown_wall"] = $('input[name="unknown_wall"]').is(':checked');
            localStorage.setItem('settings', JSON.stringify(settings));
            $("div#FAsettings").remove();
            location.reload();
        });
    });
    if(game_data.screen == "am_farm") {
        $("a.farm_icon_c, a.farm_icon_b, a.farm_icon_a").click(function () {
            if(settings["DeleteReports"] == true ) {
                $(this).closest('tr').find("img[src*='delete_small.png']").closest('td').find('a').click()
            } else {
            $(this).closest('tr').remove();
            }
        });
        for(key in settings) {
            if($.type(settings[key]) === "boolean" && settings[key] == true) {
                if(key === "volle_buit") {
                    $("#am_widget_Farm img[src*='1.png']").each(function (i, e) {
                        $(this).closest('tr').remove();
                    })
                } else if(key === "lege_buit") {
                    $("#am_widget_Farm img[src*='0.png']").each(function (i, e) {
                        $(this).closest('tr').remove();
                    })
                } else if(key.match("disabled_icon_")) {
                    var disabled_icon = key.split("_")[2];
                    $("#am_widget_Farm .farm_icon_disabled.farm_icon_"+disabled_icon).each(function (i, e) {
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
                }  else {
                    $("#am_widget_Farm img[src*='" + key + ".png']").each(function (i, e) {
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
            } else if(key == "gsfilter") {
                var indexResourcesColumn = $('#am_widget_Farm tr th:has(img[src*="graphic/res.png"])').index();
                $('#am_widget_Farm tr[class*="report_"]').each(function (i, e) {
                    var resources = $.trim($(this).find('td').eq(indexResourcesColumn).text().replace(/\./g,'')).split(" ");
                    console.log(resources);
                    if (resources.length > 2) {
                        var hout = $.trim(resources[0]) * 1;
                        var leem = $.trim(resources[1]) * 1;
                        var ijzer = $.trim(resources[2]) * 1;
                        if ((hout < settings[key]["min_hout"] || leem < settings[key]["min_leem"] || ijzer < settings[key]["min_ijzer"]) && settings[key]['per_gs']) {
                            $(this).remove();
                        } else if ( (hout + leem + ijzer <settings["gsfilter"]["min_gs"]) && settings[key]['all_gs_combined']) {
                            $(this).remove();
                        }
                    } else if (settings[key]["unknown_gs"]) {
                       $(this).remove();
                    }
                })
            } else if(key == "wall") {
                var indexWallColumn = $('#am_widget_Farm tr th:has(img[src*="buildings/wall.png"])').index();
                $('#am_widget_Farm tr[class*="report_"]').each(function (i, e) {
                    var wall = $(this).find('td').eq(indexWallColumn).text();
                    if ($.isNumeric(wall)) {
                        if (wall > settings[key]['max_lvl'] || wall < settings[key]['min_lvl'] ) {
                            $(this).remove();
                        }
                    } else if (settings[key]["unknown_wall"]) {
                        $(this).remove();
                    }  
                })
            }
        }
        document.onkeydown = function(e) {
            switch (e.which) {
            case 39: //39 is de keycode voor het rechterpijltje
                location.href = document.getElementById("village_switch_right").href.replace(/page=\d+/, "page=0");
                break;
            case 37: // 37 is de keycode voor het linkerpijltje
                location.href = document.getElementById("village_switch_left").href.replace(/page=\d+/, "page=0");
                break;
            case 68: //68 is de keycode voor de D
                location.href = document.URL.replace(/page=\d+/, "page=" + ++(document.URL.match(/page=(\d+)/) || [, 0])[1]);
                break;
            case 83: // 83 is de keycode voor de S
                location.href = document.URL.replace(/page=\d+/, "page=" + --(document.URL.match(/page=(\d+)/) || [, 0])[1]);
                break;
            case 65: // 65 is de keycode voor de A
                $('tr[class*="report_"] .farm_icon_a').first().click();
                break;
            case 66: // 66 is de keycode voor de B
                $('tr[class*="report_"] .farm_icon_b').first().click();
                break;
            case 67: // 67 is de keycode voor de C
                $('tr[class*="report_"] .farm_icon_c').first().click();
                break;
            default:
                break;
            }
        };
    } else if(game_data.screen == "report") {
        if (settings.autoSelectFarmReports) {
            $("#report_list").find('tr[class*="row_"]').each(function(){
                if ($(this).find('img[src*="farm.png"]').length > 0) {
                    $(this).find('input').first().prop("checked",true);
                }
            });
        }
    }
    $(".manager_icon:first").prop("href", $(".manager_icon")[0].href + "&order=" + settings["sortby"][0] + "&dir=" + settings["sortby"][1] + "&Farm_page=0");
});