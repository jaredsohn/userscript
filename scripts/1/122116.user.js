// ==UserScript==
// @name           reistijd
// @namespace      http://jgeo.nl/o
// @version        1.2
// @description    bereken reistijd naar plaats
// @include        http://www.orientatie.org/kalender.php
// @include        http://orientatie.org/evenementen
// @include        http://www.nolb.nl/o-kalender.html
// @include        http://www.nolb.nl/o-kalender/eventlist.html
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @description    Voeg reistijden en afstanden toe aan plaatsen in de NL en B orientatieloop-kalenders

// @copyright      Jan-Gerard van der Toorn <jgeo.2012@xs4all.nl>

// ==/UserScript==

// v1.1 : updated handling of new VVO website format
//        uses GPS coordinates in map-tile for better accuracy
// v1.2 : changed nightorienteering icon
//        added vcal link for cration of calendar items
//        changed colors of nearby events, for better printing visiblity

API_js_callback = "http://maps.google.com/maps/api/js?sensor=false&callback=initialize";

var script = document.createElement('script');
    script.src = API_js_callback;
    var head = document.getElementsByTagName("head")[0];
    (head || document.body).appendChild(script);

var google;
var directionsService ;

function update_all_times_and_distances() {
	var ii = 1;
	var spacing = 1000;
	$("table tr td:nth-child(4)").each(function(){ //:first
		calcRoute($(this));
		setTimeout(calcRoute,spacing*(ii),($(this)));
		ii++;
	});
	$(".address-city").each(function(){
		//calcRoute($(this));
		setTimeout(calcRoute,spacing*(ii),($(this)));
		ii++;
	});
}

initialize = setTimeout(function () {
    google = unsafeWindow.google;
    directionsService = new google.maps.DirectionsService();
    update_all_times_and_distances();
}, 1000);

function calcRoute(this_one) {
	var max_minutes = $("#max_min").val();
	//alert(max_minutes);
	this_one.css("color","red");
	var this_url = window.location.href;
	var land = "";
	if (this_url.indexOf("orientatie.org") !=-1) land = ", Belgie";
	else if (this_url.indexOf("nolb.nl") !=-1) land = ", Nederland";
	var location_link = $(this_one).parent().parent().next().find("img").attr('data-href');
	//alert(location_link);
	//location_link  = '';
	if ((location_link) && location_link.length>0) {
		var myreg = /.*center=([^,]+),([^&]+).*/;
		var matches = [];
		myreg.exec(location_link);
		var destination = RegExp.$1+","+RegExp.$2;
		this_one.attr('id',destination);
		plaats = this_one.text();
	} else {
		if (this_one.attr('id')) {
			var plaats = this_one.attr('id');
		} else {
			var plaats = this_one.text();
			if (plaats=="-") return;
			this_one.attr('id',plaats);
		}
		var destination = plaats.trim()+land;
	}
	//alert(plaats);
	var start = $("#start").val();
  var request = {
		origin: start, 
    destination: destination,
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };
	//this_one.css("color","cyan");
	directionsService.route(request, function(response, status) {
		this_one.append(": "+status);
		//alert(status);
  	if (status == google.maps.DirectionsStatus.OK) { // & !(this_one.hasClass("tijd"))) {
  		var sec = response.routes[0].legs[0].duration.value;
  		// var timestr = (sec/60/60>1?Math.floor(sec/60/60)+":":"")+((sec/60)%60<10?"0":"")+Math.floor(sec/60)%60+":"+(sec%60<10?"0":"")+Math.floor(sec%60);
  		var timestr = Math.floor(sec/60/60)+":"+((sec/60)%60<10?"0":"")+Math.round(sec/60)%60;
  		//alert(timestr);
  		this_one.html(
  			"<a href='http://maps.google.com/maps?saddr="+start+"&daddr="+destination+"' target='routebeschrijving' onClick='alert("+'"De ligging van de plaatsnamen kan afwijken van de werkelijke locatie. En als er meerdere plaatsen met dezelfde naam zijn kiest Google er eentje voor je uit. Let daarom op!"'+");'>"+
  			"<span class='plaats'>"+plaats+"</span></a>"+
  			"<br><span class='afstand'>"+response.routes[0].legs[0].distance.text+"</span>, <span class='tijd'"+(sec<max_minutes*60?" style='background-color: #55ff55; color: green;'>":" style='color: red;'>")+timestr+"</span>"
  		);
			this_one.css("color","green");
		}
	});
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

// get saved parameters
if (!GM_getValue("maximale_reistijd")) GM_setValue("maximale_reistijd","45");
if (!GM_getValue("start_adres_of_locatie")) GM_setValue("start_adres_of_locatie","nederland");
if (!GM_getValue("een_disclaimer_vooraf")) {
	GM_setValue("een_disclaimer_vooraf","getoond");
	alert('De ligging van de plaatsnamen kan afwijken van de werkelijke locatie. En als er meerdere plaatsen met dezelfde naam zijn kiest Google er eentje voor je uit. Let daarom op!');
}

$("table tr td:nth-child(4)").css('color', 'blue');
$(".message").before("<input type='text' id='max_min' class='parameters' title='maximaal aantal minuten' value='"+GM_getValue("maximale_reistijd")+"'>"+
  "<input type='text' id='start' class='parameters' title='start adres of locatie' value='"+GM_getValue("start_adres_of_locatie")+"' size='70'>");

$("table").before("<input type='text' id='max_min' class='parameters' title='maximaal aantal minuten' value='"+GM_getValue("maximale_reistijd")+"'>"+
  "<input type='text' id='start' class='parameters' title='start adres of locatie' value='"+GM_getValue("start_adres_of_locatie")+"' size='70'>");

$('.parameters').change(function() {
  //$("table tr td:nth-child(4)").removeClass('tijd');
  GM_setValue("maximale_reistijd",$("#max_min").val());
  GM_setValue("start_adres_of_locatie",$("#start").val());
  update_all_times_and_distances();
});


$("h2 a").each(function(){
		$(this).after(' <a href="http://jgeo.nl/vcal.php?link='+window.location.protocol+'//'+window.location.host+'/'+$(this).attr('href')+'" style="font-size: x-small;">(.vcal)</a>');
	});

//$("img[src$='FootOrienteeringNight.png']").attr("src","http://jgeo.nl/smuck/FootOrienteeringNight.png");
var newnightpng = "data:image/png;base64,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";
$("img[src$='FootOrienteeringNight.png']").attr("src",newnightpng);
$("img[src$='FootOrienteeringNight_0.png']").attr("src",newnightpng);

/*
$("table tr td:nth-child(4)").hover(function(){
	if (!($(this).hasClass("tijd"))) {
		calcRoute($(this));
	} 
});
*/


