// ==UserScript==
// @name       Anti-AstroPad
// @version    0.01
// @grant      GM_xmlhttpRequest
// @grant      GM_addStyle
// @match      http://mush.vg/*
// @match      http://mush.vg/#
// @match      http://mush.twinoid.com/*
// @match      http://mush.twinoid.com/#
// @match      http://mush.twinoid.es/*
// @match      http://mush.twinoid.es/#
// @copyright  2014+, Tony Air https://thewebdevelopmentagency.com/ (inspiration Astropad script)
// ==/UserScript==
// @require http://code.jquery.com/jquery-latest.js

$('body').append('<div id="AntiAstroPadBtn" class="antiAstroPadBtn">Fake AstroPad</div>');
$('body').append('<div id="AntiAstroPadForm">\
	<div id="AntiAstroPadFormClose">X</div>\
    <form method="GET" action="http://astropad.sunsky.fr/api.py/addItems">\
		<div>\
            <label for="hid">Submited by:</label>\
            <select name="hid">\
                <option value="0">Jin Su</option>\
                <option value="1">Frieda</option>\
                <option value="2">Kuan Ti</option>\
                <option value="3">Janice</option>\
                <option value="4">Roland</option>\
                <option value="5">Hua</option>\
                <option value="6">Paola</option>\
                <option value="7">Chao</option>\
                <option value="8">Finola</option>\
                <option value="9">Stephen</option>\
                <option value="10">Ian</option>\
                <option value="11">Chun</option>\
                <option value="12">Raluca</option>\
                <option value="13">Gioele</option>\
                <option value="14">Eleesha</option>\
                <option value="15">Terrence</option>\
                <option value="16">Derek</option>\
                <option value="17">Andie</option>\
                <option value="18">Empty</option>\
            </select>\
		</div>\
		<div>\
            <label>Add Item:</label>\
            <select id="AntiAstroPadITEM">\
                <option value="camera">Camera</option>\
                <option value="blaster">Blaster</option>\
                <option value="extinguisher">Extinguisher</option>\
                <option value="medikit">Medikit</option>\
                <option value="antigrav_scooter">Anti-Grav Scooter</option>\
                <option value="soap">Soap</option>\
                <option value="duck_tape">Duck Tape</option>\
                <option value="ration_0">Standart Ration</option>\
                <option value="mad_kube">MAD Kube</option>\
                <option value="rope">Rope</option>\
                <option value="wrench">Adjustable Wrench</option>\
                <option value="space_suit">Spacesuit</option>\
                <option value="microwave">Microwave Broken</option>\
                <option value="bandage">Bandage</option>\
                <option value="fruit_tree00">Banna Tree</option>\
                <option value="tree_pot">HydroPot</option>\
                <option value="grenade">Grenade</option>\
                <option value="freezer">Superfreezer Broken</option>\
                <option value="help_drone">Drone</option>\
            </select>\
		</div>\
		<div>\
            <label>Room:</label>\
            <select id="AntiAstroPadROOM">\
                <option value="1">Alpha Bay</option>\
                <option value="2">Bravo bay</option>\
                <option value="3">Alpha Bay 2</option>\
                <option value="4">Nexus</option>\
                <option value="5">Medlab</option>\
                <option value="6">Labolatory</option>\
                <option value="7">Refectory</option>\
                <option value="8">Hydroponic Garden</option>\
                <option value="9">Engine Room</option>\
                <option value="10">Front Alpha Turret</option>\
                <option value="11">Centere Alpha Turret</option>\
                <option value="12">Rear Alpha Turret</option>\
                <option value="13">Front Bravo Turret</option>\
                <option value="14">Centere Bravo Turret</option>\
                <option value="15">Rear Bravo Turret</option>\
                <option value="30">Bravo Dorm</option>\
                <option value="31">Front Storage</option>\
                <option value="33">Rear Alpha Storage</option>\
                <option value="34">Centre Bravo Storage</option>\
                <option value="35">Rear Bravo Storage</option>\
            </select>\
		</div>\
		<div>\
            <label>Count:</label>\
            <input id="AntiAstroPadCOUNT" type="text" value="1" />\
		</div>\
		<button id="AntiAstroPadADDITEM" class="antiAstroPadBtn">Add Item</button>\
		<div id="AntiAstroPadLIST"></div>\
		<input id="AntiAstroPadID" type="hidden" name="gid" />\
		<input id="AntiAstroPadKey" type="hidden" name="gkey" />\
		<input id="AntiAstroPadData" type="hidden" name="data" value="" />\
		<button type="submit" id="AntiAstroPadSubmit" class="antiAstroPadBtn">Submit</button>\
		<div class="note">Add items one by one then submit.</div>\
    </form>\
</div>');

$('#AntiAstroPadADDITEM').click(function(e){
    e.preventDefault();
    var name = $('#AntiAstroPadITEM option:selected').text();
    var img = $('#AntiAstroPadITEM option:selected').val();
    var room = $('#AntiAstroPadROOM option:selected').val();
    var roomName = $('#AntiAstroPadROOM option:selected').text();
    var count = parseInt($('#AntiAstroPadCOUNT').val());
    
    if(count <= 0){alert('Wrong count param');return;}
    $('#AntiAstroPadLIST').append('<div class="antiAstroPadITEM">'+roomName+': '+count+'x'+name+'</div>');
    
    var value = room+'|'+name+'|'+img+'|'+count+'||';
    var cur = $('#AntiAstroPadData').val();
    if(cur.length > 0){value = cur + '%C2%A7' + value;}
    $('#AntiAstroPadData').val(value);
});

$('#AntiAstroPadBtn').click(function(e){
    e.preventDefault();
    
    // asks astropad credentials
    //var astroID = prompt("Please enter your astro id","");
	//var astroKey = prompt("Please enter your astro key","");
    var gid = localStorage['ASTROPAD_'+language+'gid'];
    var gkey = localStorage['ASTROPAD_'+language+'gkey'];
    if (gid == null && gkey == null){
        alert('Plz, attach astropad');
        return false;
    }
    //
   	$('#AntiAstroPadID').val(gid);
    $('#AntiAstroPadKey').val(gkey);
    $('#AntiAstroPadForm').show('slow');
});

$('#AntiAstroPadForm form').submit(function(e){
	var ar = $(this).serializeArray();
    var astro_data = 'tid=1';
    for (i=0;i<ar.length;i++){
        astro_data = astro_data +'&'+ ar[i]['name']+'='+ar[i]['value'];
    }
	var astro_url = $(this).attr('action');
    console.log(astro_url);
    alert(astro_data);
	setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'POST',
            url: astro_url,
            data: astro_data,
            headers:{'Content-type':'application/x-www-form-urlencoded'},
            onload: function(responseDetails) {
                if(responseDetails.responseText !== '[-1]' && responseDetails.responseText !== '[-2]'){
                    $('#AntiAstroPadData').val('');
    				$('#AntiAstroPadLIST').html('');
                    alert('Success! Plz, refresh your astropad.');
                    return;
                }
                alert('Uknown error, try to refresh the website.');
                return;
            }
        });
    }, 0);
    e.preventDefault();
    e.unbind();
});
$('#AntiAstroPadFormClose').click(function(){
    $('#AntiAstroPadData').val('');
    $('#AntiAstroPadLIST').html('');
    $('#AntiAstroPadForm').hide('slow');
});

/* styling */
GM_addStyle ('\
.antiAstroPadBtn {\
    display:block;\
    padding: 4px 12px;\
    margin-bottom: 0;\
    font-size: 14px;\
    line-height: 20px;\
    border: 1px solid #cccccc;\
    color: #ffffff;\
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);\
    background-color: #363636;\
    background-image: linear-gradient(to bottom, #444444, #222222);\
    background-repeat: repeat-x;\
    border-color: #222222 #222222 #000000;\
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);\
    border-radius: 4px;\
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);\
    z-index:1000;\
}\
.antiAstroPadBtn:hover{\
    text-decoration: none;\
    background-position: 0 -15px;\
    transition: background-position 0.1s linear;\
    color: #FFFFCD;\
    background-color: #222222;\
}\
#AntiAstroPadBtn{\
    position:fixed;\
    top:40px;\
    right:10px;\
}\
#AntiAstroPadForm{\
    display:none;\
    position:fixed;\
    top:50%;\
    left:50%;\
    width:400px;\
    min-height:200px;\
    margin-left:-200px;\
    margin-top:-100px;\
    padding: 20px;\
    background:#000;\
    box-shadow:0 0 10px 2px #00ABFF;\
    color:#fff;\
	font-size:10px;\
    z-index:1000;\
}\
#AntiAstroPadForm input[type="text"],\
#AntiAstroPadForm select{\
	color:#333;\
}\
#AntiAstroPadFormClose{\
position:absolute;\
top:10px;\
right:10px;\
}\
');