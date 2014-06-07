// ==UserScript==
  
// @name            GM find Villages
  
// @author          Tjeerdo (skypenaam: tjeerdov ,AF-naam: .Arrogant )
// @version         1.0i   
// @description     geeft je de mogelijkheid om dorpen van een andere spelers te vinden binnen een bepaalde radius en onder een bepaald aantal punten
// @include         http://nl*.tribalwars.nl/game.php?*screen=info_player*
  
// ==/UserScript==

(function (f) {
    var d = document,
        s = d.createElement('script');
    s.textContent = '$(document).ready(' + f.toString() + ')';
    (d.body || d.head || d.documentElement).appendChild(s);
})(function () {
    
    $('#villages_list').before('<table class="vis"><tr><td><input type="button" class="GetVillages" value="Get Villages"/><input type="button" class="GetAllVillages" value="Get All Villages"/></td></tr></table>');
    $('.GetVillages').click(function(){
        var maxPoints = prompt('Geef hier het maximale puntenaantal aan', 9000),
            TempVillages = {};
        $('#villages_list tr:has(td)').each(function(){
            var columns = $(this).find('td'),
                coord = $(columns).eq(1).html(),
                points = $(columns).eq(2).text().match(/\d+/g).join('');
                
                if(points <= maxPoints) {
                    TempVillages[coord] = "";
                }
        });
        var OwnVillages = prompt('Vul hier je eigen dorpen in (gescheiden door een spatie)', 'Example: 123|456 123|456'),
            VillagesArray = OwnVillages.split(' '),
            Radius = prompt('Vul hier de minimale en maximale radius (aantal velden) in (gescheiden door een spatie)', 'Example: 0 10'),
            RadiusArray = Radius.split(' '),
            Villages = [];
        for(var key in TempVillages) {
            $.each(VillagesArray, function(i){
                var ownCoord = VillagesArray[i].split('|');
                var otherCoord = key.split('|')
                var fields = Math.sqrt(Math.pow(parseInt(ownCoord[0])-parseInt(otherCoord[0]),2)+Math.pow(parseInt(ownCoord[1])-parseInt(otherCoord[1]),2));
                if(fields < RadiusArray[1] && fields > RadiusArray[0]) {
                    Villages.push(key);
                }
            });
        }
        var GematchteVillages = Villages.join('\n');
        $('<div id="GetVillagesPopup" style="background-color:#ecd6ad;border:2px solid #7d510f;z-index:500;top:130px;left:40%;position:absolute;padding-top:7px;padding-left:7px;width:400px;border-radius:7px;box-shadow:0 0 50px 15px #000000;"><h2 style="text-align: center;">Dorpen die aan de voorwaarden voldoen</h2><input type="checkbox" id="VillageInBBcode" name="VillageInBBcode" value="BB-code toevoegen"/><label for="VillageInBBcode">BB-code toevoegen</label><br/><textarea cols="50" rows="15" id="TextareaVillages">'+GematchteVillages+'</textarea><a id="GetVillagesPopupSluiten" href="javascript:void(0)" style="display: block;text-align:right;">Sluiten</a></div>').appendTo('body');
        $('#VillageInBBcode').on('click', function(){
            if($(this).is(':checked')) {
                var temp = $('#TextareaVillages').html().split("\n"),
                    VillageBB = []
                $.each(temp, function(){
                    VillageBB.push('[coord]'+this+'[/coord]');
                })
                $('#TextareaVillages').html(VillageBB.join('\n'));
                $('label[for="VillageInBBcode"]').html('BB-code verwijderen');
            } else {
                var temp = $('#TextareaVillages').html().split("\n"),
                    VillageWithoutBB = []
                $.each(temp, function(){
                    VillageWithoutBB.push(this.match(/\d{1,3}\|\d{1,3}/));
                })
                $('#TextareaVillages').html(VillageWithoutBB.join('\n'));
                $('label[for="VillageInBBcode"]').html('BB-code toevoegen');
            }
        })
    $('#GetVillagesPopupSluiten').click(function() {
        $('#GetVillagesPopup').remove();
    })
    
    }) // end getVillages
    $('.GetAllVillages').click(function(){
        TempVillages = [];
        $('#villages_list tr:has(td)').each(function(){
            var columns = $(this).find('td'),
                coord = $(columns).eq(1).html();
                TempVillages.push(coord);
        });
        $('<div id="GetAllVillagesPopup" style="background-color:#ecd6ad;border:2px solid #7d510f;z-index:500;top:130px;left:40%;position:absolute;padding-top:7px;padding-left:7px;width:400px;border-radius:7px;box-shadow:0 0 50px 15px #000000;"><h2 style="text-align: center;">Alle dorpen gescheiden door een spatie</h2><br/><textarea cols="50" rows="10" id="TextareaAllVillages">'+TempVillages.join(' ')+'</textarea><br/><a id="GetAllVillagesPopupSluiten" href="javascript:void(0)" style="display: block;text-align:right;">Sluiten</a></div>').appendTo('body');
        
    $('#GetAllVillagesPopupSluiten').click(function() {
        $('#GetAllVillagesPopup').remove();
    })
    }) // end get all villages
    
});
