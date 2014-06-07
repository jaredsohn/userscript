// ==UserScript==
// @name            GM troepen tellen
// @description     Telt troepen bij Kazerne, Stal en Werkplaats
// @include         http://nl*.tribalwars.nl/game.php?*screen=barracks*
// @include         http://nl*.tribalwars.nl/game.php?*screen=stable*
// @include         http://nl*.tribalwars.nl/game.php?*screen=garage*
// @include         http://nl*.tribalwars.nl/game.php?*screen=train*
// @exclude         http://nl*.tribalwars.nl/game.php?*mode=mass*
// @author          Tjeerdo (AF: .Arrogant || skypenaam: tjeerdov)
// @contributor     Tuam
// ==/UserScript==

(function (fn) {
	var script = document.createElement("script");
	script.textContent = "(" + fn.toString() + ")();";
	(document.body || document.documentElement).appendChild(script);
})(function () {
    function create_table(refresh){
        if(refresh == true)	$('#AR_troopcounter').remove();
        $("#content_value table").first().after('<table id="AR_troopcounter"><colgroup span="4"><col style="background-color:#ffffee"></col><col style="background-color:#ddddcc"></col><col style="background-color:#ffffee"></col><col style="background-color:#ddddcc"></col></colgroup><tr><th>Eenheid</th><th>Aanwezig</th><th>In opleiding</th><th>Totaal</th></tr></table>');
        var unitContainer = {}
        $('form .vis tr[class*="row_"]').each(function(){
            unitContainer[$.trim($(this).children(':first').text())] = {"aantal":$(this).children(':nth-child(3)').text().split('/')[1],"opleiding":0};
        });
        for(var units in unitContainer) {
            if($('.trainqueue_wrap .lit .lit-item:contains("'+units+'"), .trainqueue_wrap .sortable_row:contains("'+units+'")').size() > 0) { //trainorder_0
                $('.trainqueue_wrap .lit .lit-item:contains("'+units+'"), .trainqueue_wrap .sortable_row:contains("'+units+'")').each(function(){
                    unitContainer[units]["opleiding"] += parseInt($(this).text());
                })
            }
            if(unitContainer[units]["aantal"] > 0 || unitContainer[units]["opleiding"] > 0) {
                $('#AR_troopcounter tr').last().after('<tr><td>'+units+'</td><td>'+unitContainer[units]["aantal"]+'</td><td>'+unitContainer[units]["opleiding"]+'</td><td>'+(parseInt(unitContainer[units]["opleiding"]) + parseInt(unitContainer[units]["aantal"]))+'</td></tr>');
            }
        }
        $time_to_next = $('.timer').html().split(':');
        $time_in_seconds = parseInt($time_to_next[0])*60*60+parseInt($time_to_next[1])*60+parseInt($time_to_next[2]);
        setTimeout(create_table,($time_in_seconds*1000),true);
    }
    create_table();
    $(document).on("change",function() {
        setTimeout(create_table,500,true);
    });
})