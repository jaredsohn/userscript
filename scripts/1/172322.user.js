// ==UserScript==
// @name            GM OS importeren/exporteren
// @author          Tjeerdo
// @version         1.1     
// @description     OS tool
// @include         http://nl*.tribalwars.nl/game.php?*
// ==/UserScript==


(function (f) {
    var d = document,
        s = d.createElement('script');
    s.textContent = '$(document).ready(' + f.toString() + ')';
    (d.body || d.head || d.documentElement).appendChild(s);
})(function () {
    if(document.URL.match("type=support")) {
        $("table#commands_table tr:first-child th:first-child").append("<input type='button' id='OS_export' value='OS exporteren' title='hernoemde OS exporteren'>");
        $("#OS_export").click(function() {
            var speler = prompt("Spelersnaam van degene waar de OS naar loopt:");
            var OS = "";
                $("table#commands_table input[id*='editInput']").each(function() {
                    if($(this).val().match(speler)) {
                    var bevelnaam = $(this).val().split(")")[1];
                    var doeldorp = $(this).val().match(/\d{3}\|\d{3}/);
                    bevelnaam = $.trim(bevelnaam.match(/.*?(?=\()/));
                    var ID = $(this).next("input").attr("onclick").match(/id=\d+/);
                    OS += bevelnaam + "--" + ID + "\n";
                    }
                });
                a = document.createElement("div");
                a.id = "OSexports";
                a.style.cssText = "background-color:#ecd6ad;border:2px solid #7d510f;z-index:5;top:130px;left:40%;position:absolute;padding-top:7px;padding-left:7px;width:300px;border-radius:7px;box-shadow:0 0 50px 15px #000000;";
                document.body.appendChild(a);
                a.innerHTML = '<h2 style="text-align: center;">OS exporteren:</h2><br/><textarea name="OS_output" cols="38" rows="15">'+OS+'</textarea>';
                a.innerHTML += '<div style="color:#7d510f;text-align:right;padding-right:7px;padding-bottom:5px;"><a id="sluiten" href="javascript:void(0)">sluiten</a></div>';
                $("#sluiten").click(function () {
                    $("div#OSexports").remove();
                });
            });
    }
    if(document.URL.match("subtype=supports")) {
        $("table#incomings_table tr:first-child th:first-child").append("<input type='button' id='OS_import' value='OS importeren' title='hernoemde OS importeren'>");
        $("#OS_import").click(function() {
            var OS_input = "";
            a = document.createElement("div");
            a.id = "OSimports";
            a.style.cssText = "background-color:#ecd6ad;border:2px solid #7d510f;z-index:5;top:130px;left:40%;position:absolute;padding-top:7px;padding-left:7px;width:300px;border-radius:7px;box-shadow:0 0 50px 15px #000000;";
            document.body.appendChild(a);
            a.innerHTML = '<h2 style="text-align: center;">OS importeren:</h2><textarea name="OS_input" cols="38" rows="15"></textarea>';
            a.innerHTML += '<div style="color:#7d510f;text-align:right;padding-right:7px;padding-bottom:5px;"><a id="sluiten" href="javascript:void(0)">Importeren</a></div>';
            $("#sluiten").click(function () {
                OS_input = $("div#OSimports textarea[name='OS_input']").val();
                $("div#OSimports").remove();
                OS_input = OS_input.split("\n");
                for(var i = 0; i < OS_input.length; i++) {
                    var OS_ID = OS_input[i].split("--")[1];
                    var aantal_troops = OS_input[i].split("--")[0];
                    $("table#incomings_table tr td input[id*='editInput']").each(function() {
                        var IDs = $(this).next("input").attr("onclick").match(/id=\d+/);
                        if(IDs == OS_ID) {
                            $(this).val(aantal_troops);
                            $(this).next("input").click();
                        };
                    });
                }
            });
        })
    }
});