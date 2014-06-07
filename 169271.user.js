// ==UserScript==
// @name       Minethings ETA 1
// @version    0.4
// @description Estimated time till arival and speed for the vehicles page in Minethings
// @include      *.minethings.com/vehicles/browse/
// @copyright  2012+, Hotrootsoup
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
(function() {
    var listOfSpeeds = {Liner: 47,Ironclad: 44,Schooner: 46,Clipper: 56,Yacht: 56,Steamship: 38,Frigate: 42,Galleon: 52,Whaler: 38,Carrack: 35,Fluyt: 37,Ferry: 45,Corvette: 35,Caravel: 36,Pinnace: 42,Brig: 32,Junk: 26,Barque: 30,Galley: 24,Sloop: 29,Dinghy: 16,Outrigger: 15,RowBoat: 7,WarCanoe: 23,Thing3: 75,Jumper: 65,AssaultTruck: 45,AFV: 55,Flatbed: 75,Tank: 60,ArmoredLimo: 45,GunCar: 50,Snowplow: 60,Scout: 75,Bus: 45,Bandit: 70,SiegeTower: 30,MilkTruck: 50,Ambulance: 60,Tractor: 30,SidecarMotorcycle: 40,ShortBus: 35,Roadster: 60,Chopper: 40,GolfCart: 25,GoKart: 30,Scooter: 35,Van: 45,Stagecoach: 35,Camel: 12,Donkey: 8,Unicycle: 16,Rickshaw: 18,Jalopy: 14,SportsCar: 65,"Sloop'09": 37,"Galley'09": 29,"Barque'09": 38,"Junk'10": 32};
    var gadget = false;
    var start = new Date();
    
    if($('#fullcenter table tr').length < 2) return false;
    if($("#fullcenter table tr:not(:has(td:contains('stopped')))").length == 1) {
        $('#fullcenter table tr').find('th:nth-child(6), td:nth-child(6)').remove();
        $('#fullcenter table tr').find('th:nth-child(5), td:nth-child(5)').remove();
        $('#fullcenter table tr').find('th:nth-child(4), td:nth-child(4)').remove();
        return false;
    };
    
    listOfSpeeds["Champion"] = $('#fullcenter table tr th').eq(1).html() == 'Ship' ? 38 : 45;
    
    function prep() {
        $('#fullcenter table').hide();
        var r = new Array(), j = -1;
        r[++j] = '<table border="1" id="newData"><tr><th>Name</th><th>Vehicle</th><th>Route</th><th style="display:none;">StartKm</th><th>Km</th><th>ETA</th><th>Cargo</th><th>Status</th><th>Send</th></tr>';
        $('#fullcenter table tr:gt(0)').each(function(i,v){
            r[++j] = '<tr><td>';
            r[++j] = $(this).children().eq(0).html();
            r[++j] = '</td><td>';
            r[++j] = $(this).children().eq(1).html();
            r[++j] = '</td><td>';
            r[++j] = $(this).children().eq(6).find('a').html() == 'stopped' ?
                $(this).children().eq(2).text().substr(0,1) :
                    $(this).children().eq(2).text().substr(0,1) + '-' + $(this).children().eq(3).text().substr(0,1);
            r[++j] = '</td><td style="display:none;">';
            r[++j] = $(this).children().eq(4).html();
            r[++j] = '</td><td>';
            r[++j] = $(this).children().eq(4).html();
            r[++j] = '</td><td></td><td>';
            r[++j] = $(this).children().eq(5).html();
            r[++j] = '</td><td>';
            r[++j] = $(this).children().eq(6).html();
            r[++j] = '</td><td>';
            r[++j] = $(this).children().eq(7).html();
            r[++j] = '</td>';
        });
        r[++j] = '</table>';
        $('#fullcenter').append(r.join(''));
    };
    
    function update() {
        $('#newData tr:gt(0)').each(function(i,v) {
            if($(this).children().eq(7).find('a').html() !== 'stopped') {
                var speed = listOfSpeeds[$(this).children().eq(1).find('a').html().replace('&nbsp;','')];
                speed = gadget ? speed * 1.1 : speed;
                var distance = $(this).children().eq(3).html();
                distance = $(this).children().eq(7).find('a').html() == 'moving' ? distance - (new Date() - start) / (1000*60*60) * speed : distance * 1;
                distance = distance <= 0 ? 0 : distance;
                $(this).children().eq(4).html(distance.toFixed(2));
                var eta = new Date(new Date().getTime() + (distance / speed) * 60 *60000);
                $(this).children().eq(5).html(('0' + (eta.getMonth()+1)).slice(-2) + '/' + ('0' + eta.getDate()).slice(-2) + ' ' + ('0' + eta.getHours()).slice(-2) + ':' + ('0' + eta.getMinutes()).slice(-2) + ':' + ('0' + eta.getSeconds()).slice(-2));
            };
        });
        setTimeout(function(){update()}, 1000);
    };
    
    prep();
    update();
    
    $('#fullcenter')
        .append('Turbo')
        .append(
            $('<input type="checkbox" id="gadget">').click(function() {
                gadget = $(this).is(':checked');
                localStorage.setItem("gadget", gadget);
            })
        );
    if(localStorage.getItem("gadget")) {
        $('#gadget').click();
    };
}())