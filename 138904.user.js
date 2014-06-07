// ==UserScript==
// @name           Planet Menu
// @namespace      pl
// @description    Left-hand menu of the planets, one-click FS, transport and attack
// @include        http://*.ogame.*/game/index.php?page=*

// @version		   1.2.1
// @copyright      

// @require        http://code.jquery.com/jquery-1.5.1.min.js
// @resource	   OgReCss	http://keveqiah.hu/projects/ogre/ogre_planet_menu.css

// ==/UserScript==

var chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

var isStorage = (window.localStorage) ? true : false;
var $ = ((typeof unsafeWindow) != "undefined") ? unsafeWindow.$ : window.$;

var url = document.location.href;
var session = url.match (/\&session=([a-f0-9]{1,12})/i);
if (session && session.length > 1)
	session = "&session=" + session [1];
else
	session = "";

(function() {
	if(!GM_getValue)
	{
		function GM_getValue(key,defaultVal)
		{
			var retValue = localStorage.getItem(key);
			if ( !retValue )
			{
				return defaultVal;
			}
			return retValue;
		}

		function GM_setValue(key,value)
		{
			localStorage.setItem(key, value);
		}

		function GM_deleteValue(value)
		{
            localStorage.removeItem(value);
        }
	}

	// ----- Variables, Settings ----- //
	if(GM_getValue("Opt")==null)
	{
		GM_setValue("Opt", "");
		GM_setValue("defLang", "HU");
		GM_setValue("eventHide", false);
		GM_setValue("msgMenu", false);
		GM_setValue("shortHeader", false);
    }

	// ------ Language ------ //
	var Language = {
			Magyar : 'HU',
			English : 'EN'
		};
	var DefLang = GM_getValue("defLang");
	var OgReLang = new Array();
        // Magyar / Hungary
		OgReLang.HU = {};
		OgReLang.HU.planetMenu = {
			overview 	: "Podgląd",
			resources	: "Surowce",
			station		: "Stacja",
			research	: "Badania",
			shipyard	: "Stocznia",
			defense		: "Obrona",
			fleet1		: "Flota",
			movement	: "Ruch floty",
			galaxy		: "Galaktyka",
			messages	: "Wiadomości",
			alliance	: "Sojusz",
			transport	: "Transport",
			fly_safe	: "Ucieczka"
		};
		OgReLang.HU.infoBox = {
			info: "Przygotowywanie floty i surowca ...",
            info2: "Wszystkie surowce i statki zostały bezpiecznie wysłane!"
			titleTransport	: "Transportuj",
			titleFS		: "Uciekaj",
			titleAttack	: "Atakuj",
			startKoord	: "Współżędne startowe:",
			destKoord	: "Współżędne celu:",
			speed		: "Prędkość:",
			metal		: "Metal",
			crystal		: "Kryształ",
			deuterium	: "Deuter",
			capacity	: "Pojemność:",
			ShipSC		: "Mały transporter",
			ShipLC		: "Duży transporter"
		};
		OgReLang.HU.ShipsName = {
		    	am204: "Lekki myśliwiec",
                am205: "Ciężki myśliwiec",
                am206: "Krążownik",
                am207: "Okręt wojenny",
                am215: "Pancernik",
                am211: "Bombowiec",
                am213: "Niszczyciel",
                am214: "Gwiazda śmierci",
                am202: "Mały transporter",
                am203: "Duży transporter",
                am208: "Statek kolonizacyjny",
                am209: "Recykler",
                am210: "Sonda szpiegowska"
		};
        OgReLang.HU.options = {
        	title		: "Ustawienia",
        	language	: "Wybierz język",
         	event		: "Ukryj wydarzenia",
         	message		: "Lewe menu wydarzeń",
         	header		: "Wieksze zdjęcia nagłówka"
        };
        // Angil / Englis
		OgReLang.EN = {};
		OgReLang.EN.planetMenu = {
			overview 	: "Overview",
			resources	: "Resources",
			station		: "Station",
			research	: "Research",
			shipyard	: "Shipyard",
			defense		: "Defense",
			fleet1		: "Fleet",
			movement	: "Fleet movement",
			galaxy		: "Galaxy",
			messages	: "Messages",
			alliance	: "Alliance",
			transport	: "Transport",
			fly_safe	: "Escape"
		};
		OgReLang.EN.infoBox = {
			info	: "Fleet and preparation of raw material ..",
			info2	: "All raw materials and ship escaped!",
			titleTransport	: "Transport",
			titleFS		: "Escape",
			titleAttack	: "Attack",
			startKoord	: "Initial coordinates:",
			destKoord	: "Target coordinates:",
			speed		: "Speed:",
			metal		: "Metal",
			crystal		: "Crystal",
			deuterium	: "Deuterium",
			capacity	: "Capacity:",
			ShipSC		: "Small Cargo",
			ShipLC		: "Large Cargo"
		};
		OgReLang.EN.ShipsName = {
		    	am204 : "Light Fighter",
		    	am205 : "Heavy Fighter",
		    	am206 : "Cruiser",
		    	am207 : "Battleship",
		    	am215 : "Battlecruiser",
		    	am211 : "Bomber",
		    	am213 : "Destroyer",
		    	am214 : "Deathsta",
		    	am202 : "Small Cargo",
		    	am203 : "Large Cargo",
		    	am208 : "Colony Ship",
		    	am209 : "Recycler",
		    	am210 : "Espionage Probe"
		};
        OgReLang.EN.options = {
	        title		: "OgRe Settings",
        	language	: "Select the language",
         	event		: "Hide events",
         	message		: "Messages left menu",
         	header		: "Large header images collapse "
        };

		// Ships
		var Ships = {
		   	am204 : 0,
		   	am205 : 0,
		   	am206 : 0,
		   	am207 : 0,
		   	am215 : 0,
		   	am211 : 0,
		   	am213 : 0,
		   	am214 : 0,
		   	am202 : 0,
		   	am203 : 0,
		   	am208 : 0,
		   	am209 : 0,
		   	am210 : 0
		};
		// Capacity
		var Capacity = {
		   	am204 : 50, 	// Könnyű harcos
		   	am205 : 100,	// Nehéz harcos
		  	am206 : 800,	// Cirkáló
		   	am207 : 1500,	// Csatahajó
		   	am215 : 750,	// Csatacirkáló
		   	am211 : 500,	// Bombázó
		   	am213 : 2000,	// Romboló
		   	am214 : 1000000,// Halálcsillag
		   	am202 : 5000,	// Kis szállító
		   	am203 : 25000,	// Nagy szállító
		   	am208 : 7500,	// Kolónia hajó
		   	am209 : 20000,	// Szemetes
		   	am210 : 0		// Kémszonda
		};
		var Cargo = 0;

	    var Resources = new Array();
	    Resources['metal'] = $("span#resources_metal").text().replace(".", "");
	    Resources['crystal'] = $("span#resources_crystal").text().replace(".", "");
	    Resources['deuterium'] = $("span#resources_deuterium").text().replace(".", "");

		// Cél koordináta
		var DestKoord = new Array();
		var dest = $("div.smallplanet a.planetlink").mouseover( function()
		{
			var des = $(this).find("span.planet-koords").text().slice(1,-1);
			var koord_dest = des.split(":");
			DestKoord['galaxy'] = koord_dest[0];
			DestKoord['system'] = koord_dest[1];
			DestKoord['position'] = koord_dest[2];
		});

		// Menüpontok
		var pm_menu = {
			overview 	: OgReLang[DefLang].planetMenu.overview,
			resources	: OgReLang[DefLang].planetMenu.resources,
			station		: OgReLang[DefLang].planetMenu.station,
			research	: OgReLang[DefLang].planetMenu.research,
			shipyard	: OgReLang[DefLang].planetMenu.shipyard,
			defense		: OgReLang[DefLang].planetMenu.defense,
			fleet1		: OgReLang[DefLang].planetMenu.fleet1,
			movement	: OgReLang[DefLang].planetMenu.movement,
			galaxy		: OgReLang[DefLang].planetMenu.galaxy,
			messages	: OgReLang[DefLang].planetMenu.messages,
			alliance	: OgReLang[DefLang].planetMenu.alliance,
			transport	: OgReLang[DefLang].planetMenu.transport,
			fly_safe	: OgReLang[DefLang].planetMenu.fly_safe
			};

    // ---- Initial Functions ---- //
	try {
		if (CheckURL() == 1) {
			GalaxyAttack();
		}

		Settings();
		if(GM_getValue("eventHide")==true) { hideEventList(); }
		if(GM_getValue("msgMenu")==true) { messageMenu(); }
		if(GM_getValue("shortHeader")==true) { shortHeader(); }
		SlideMenu(session);	// Slide Menu in Planets
	}
	catch(e) {}

	// Start Functions
	function GalaxyAttack() {
		$("#galaxyContent").ajaxSuccess(function(e,xhr,settings) {			if (settings.url.indexOf("page=galaxyContent") == -1) return;
			AddAttackLnk();

			$("img.ogre_gal_att").click(function()
			{
				$Target = $(this).attr('rel');
				InfoBox('', '<h3>'+OgReLang[DefLang].infoBox.info+'</h3>', 300, null);
				SearchShips($Target, session, "galaxy");
				return false;
			});
		});
	}
    // Bolygó menü létrehozás
	function SlideMenu(session)
	{
	    $planet = $(".smallplanet a.planetlink,a.moonlink");
		$planet.bind({
			mouseover : function ()
			  {
				act = $(this).attr("class").toString();
				if (act.match(/active/))
					var is_Active = true;
				else
					var is_Active = false;

				$("#planet_menu").remove();

				var cps = $(this).attr("href").match (/\&cp=([\d]{1,8})/i);
				if ((cps == null) || (cps.length < 2))
					return true;
				var cp = cps [1];

			    $(this).attr({id : "pm_active"});

			    pos = $(this).offset(); // Pozíció
			    // Új bővített menü
			    menu =  $("<div/>", { "id":"planet_menu",
			    					  "css": {	"left": pos.left-125,
			    					  			"top": pos.top+25 }
			    					}).appendTo("body");
	            links = $("<ul/>", { "id" : "pm_links", "class" : "pm_links" });

	            menu.append(links);

			    link_list = "";
			    // Linkek kiiratása
			    $.each(pm_menu, function(i, val) {
			        if(i=="movement")
			            link_list += "<li><a class='links_pm' href='index.php?page="+i+ session + "'>"+val+"</a></li>";
			        else if(i=="transport")
			            link_list += "<li><a class='links_pm' style='color: #229922;' id='transport' onclick='return false;' href='javascript:void(0);'>"+val+"</a></li>";
			        // Biztonsági mentés és fgv hívás
			        else if(i=="fly_safe")
			        {
			            if(!is_Active)
				            link_list += "<li><a id='fly_safe' class='links_pm pm_links_red' onclick='return false;' href='javascript:void(0);'>"+val+"</a></li>";
			        }
			        else
			        	link_list += "<li><a class='links_pm' href='index.php?page="+i+ session + "&cp="+cp+"'>"+val+"</a></li>";
			    });
	    	    links.append(link_list);

				$("a.#fly_safe").click(function()
				{
					InfoBox('', '<h3>'+OgReLang[DefLang].infoBox.info+'</h3>', 300, null);
					SearchShips(DestKoord, session, "escape");
				});
				$("a.#transport").click(function()
				{
					InfoBox('', '<h3>'+OgReLang[DefLang].infoBox.info+'</h3>', 300, null);
					SearchShips(DestKoord, session, "transport");
				});
			  },
			// Menü eltüntetése
			mouseleave : function(event)
			  {
			  	if(event.relatedTarget.id!=="planet_menu")
				  	$("#planet_menu").delay(800).queue(function() { $(this).remove(); });

				$("#planet_menu").hover(
					function(event)
					{
						 $(this).stop(true);
					},
					function() { $(this).delay(800).remove().queue(function() { $(this).remove(); }); }
				);
			 }
		});
	}
	// Warning FS
	function WarningFS()
	{	    // Kiinduló koordináta
	    var StartKoord = new Array();

		// Kiinduló koord kigyűjtése
		var start = $("div.smallplanet a.active span.planet-koords").text().slice(1,-1);
		var koord_start = start.split(":");
		StartKoord['galaxy'] = koord_start[0];
		StartKoord['system'] = koord_start[1];
		StartKoord['position'] = koord_start[2];

	    // Kapacitás, nyersanyagok
	    if(Space_Cargo(Cargo, Resources)==0)
	    {
			metal = parseInt(Resources['metal']);
			crystal = parseInt(Resources['crystal']);
			deu = parseInt(Resources['deuterium']);

			EmptySpace = Cargo - (metal + crystal + deu);

			$Text = $('<div />');
			$Info = $('<ul />', {'class' : 'ogre_koords'});
			target = '['+DestKoord['galaxy']+':'+DestKoord['system']+':'+DestKoord['position']+']';
			$Info.append($('<li />').append(OgReLang[DefLang].infoBox.destKoord+'<span class="ogre_start">'+target+'</span>'));

			$Resources = $('<form />' , { 'method' : "#",  'id' : "ogre_resources" });
			$Res = $('<ul />', {'class':"ogre_resources"});
			$Res.append($('<li />').append(OgReLang[DefLang].infoBox.metal+' <input id="res_metal" name="res_metal" class="ogre_ships" type="text" value="'+metal+'" /><a href="javascript:void(0)" id=""></a>'));
			$Res.append($('<li />').append(OgReLang[DefLang].infoBox.crystal+' <input id="res_crystal" name="res_crystal" class="ogre_ships" type="text" value="'+crystal+'" /><a href="javascript:void(0)" id=""></a>'));
			$Res.append($('<li />').append(OgReLang[DefLang].infoBox.deuterium+' <input id="res_deuterium" name="res_deuterium" class="ogre_ships" type="text" value="'+deu+'" /><a href="javascript:void(0)" id=""></a>'));

			$Text.append($Info);
	        $Text.append($Resources.append($Res));

		    $Text.append('<ul class="ogre_otherinfo"><li class="space">'+OgReLang[DefLang].infoBox.capacity+' <span id="space">'+EmptySpace+'</span></li></ul>');

			InfoBox(OgReLang[DefLang].infoBox.titleFS, $Text, 300, "true");

		    CheckCargo();

		    $.each(Ships, function(i, v)
		    {		    	if(v<=0)
	        		$("a#ogre_accept").css({"visibility" : "hidden"});
	        });

		    $("a#ogre_accept").click(function()
		    {
		     	Resources['metal'] = $('#sub_metal').val();
		       	Resources['crystal'] = $('#sub_crystal').val();
		       	Resources['deuterium'] = $('#sub_deuterium').val();
		       	// Floatt küldése FS-re
		       	SendFleet(StartKoord, DestKoord, Resources, Ships, session, 1, 4);

		       	InfoBoxRemove(500);
			 });
		     $("a#ogre_remove").click(function() { InfoBoxRemove(); window.location.reload(); });
		}
		else
		{
            InfoBox(OgReLang[DefLang].infoBox.info2, "", 300)
            // Floatt küldése FS-re
            SendFleet(StartKoord, DestKoord, Resources, Ships, session, 1, 4);
		}
	}
	// Transport
	function Transport()
	{		metal = parseInt(Resources['metal']);
		crystal = parseInt(Resources['crystal']);
		deu = parseInt(Resources['deuterium']);

	    // Kiinduló koordináta
	    var StartKoord = new Array();

		// Kiinduló koord kigyűjtése
		var start = $("div.smallplanet a.active span.planet-koords").text().slice(1,-1);
		var koord_start = start.split(":");
		StartKoord['galaxy'] = koord_start[0];
		StartKoord['system'] = koord_start[1];
		StartKoord['position'] = koord_start[2];

		var target = "";
		myword = $("div#myWorlds").find("span.planet-koords").text().split("]");
		$.each(myword, function(index, val) {		   kord = val.slice(1);
		   target += "<option value='"+kord+"'>"+kord+"</option>";
		});

		$AttOptions = "";
		for (i=10;i>=1;i--)
		{
			$AttOptions += '<option value="'+i+'">'+(i*10)+' % </option>';
		}

		$Text = $('<div id="boxinfo" />');
		$Info = $('<ul />', {'class' : 'ogre_koords'});
		$Info.append($('<li />').append(OgReLang[DefLang].infoBox.destKoord+'<select id="OGdest" class="ogre_gal_select">'+target+'</select>'));
		$Info.append($('<li />').append(OgReLang[DefLang].infoBox.speed+'<select id="OGspeed" class="ogre_gal_select">'+$AttOptions+'</select>'));

		$Resources = $('<form />' , { 'method' : "#",  'id' : "ogre_resources" });
		$Res = $('<ul />', {'class':"ogre_resources"});
		$Res.append($('<li />').append(OgReLang[DefLang].infoBox.metal+' (<span class="res" style="color: #f8f6f2">'+metal+'</span>) <input id="res_metal" name="res_metal" class="ogre_ships" type="text" value="0" /><a href="javascript:void(0)" rel="max_res"></a>'));
		$Res.append($('<li />').append(OgReLang[DefLang].infoBox.crystal+' (<span class="res" style="color: #f8f6f2">'+crystal+'</span>) <input id="res_crystal" name="res_crystal" class="ogre_ships" type="text" value="0" /><a href="javascript:void(0)" rel="max_res"></a>'));
		$Res.append($('<li />').append(OgReLang[DefLang].infoBox.deuterium+' (<span class="res" style="color: #f8f6f2">'+deu+'</span>) <input id="res_deuterium" name="res_deuterium" class="ogre_ships" type="text" value="0" /><a href="javascript:void(0)" rel="max_res"></a>'));

		$AttShips = '<form method="#" id="ogre_ships_form"><ul class="ogre_ships">';

	    $.each(Ships, function(index, val)
	    {
	       if(index=="am202" || index=="am203")
	    	   $AttShips += '<li>'+OgReLang[DefLang].ShipsName[index]+': (<span id="a'+index+'" style="color: yellow">'+val+'</span>) <input id="'+index+'" name="'+index+'" class="ogre_ships" type="text" value="0" /><a href="javascript:void(0)" rel="max_ship"></a></li>';
		});
		$AttShips += '</ul></form>';

		$Text.append($Info);
        $Text.append($Resources.append($Res));
        $Text.append($AttShips);

	    $Text.append('<ul class="ogre_otherinfo"><li class="space">'+OgReLang[DefLang].infoBox.capacity+' <span id="space">0</span></li></ul>');

		InfoBox(OgReLang[DefLang].infoBox.titleTransport, $Text, 300, "true");

        $('a[rel="max_res"], a[rel="max_ship"]').click(function(){        	$(this).prev('input').val( $(this).prev().prev().text() );
        	$(this).prev('input').focus();
        });

		CheckCargo();

        if((Ships.am202+Ships.am203)<=0)
        	$("a#ogre_accept").css({"visibility" : "hidden"});

	    $("a#ogre_accept").click(function()
	    {
			speed = $('#OGspeed').val();

			var start = $('span.planet-koords').text();
				start = start.slice(1,-1);
			var koord_start = start.split(":");
			var Start = [];
			Start['galaxy'] = koord_start[0];
			Start['system'] = koord_start[1];
			Start['position'] = koord_start[2];

			var dest = $('#OGdest').val();
			var koord_dest = dest.split(":");
			var Target = [];
			Target['galaxy'] = koord_dest[0];
			Target['system'] = koord_dest[1];
			Target['position'] = koord_dest[2];

	    	Resources['metal'] = $('#res_metal').val();
	    	Resources['crystal'] = $('#res_crystal').val();
	    	Resources['deuterium'] = $('#res_deuterium').val();

		    SendShips = {};
	        $.each($('#ogre_ships_form').serializeArray(), function(i, field)
	        {
		       SendShips[field.name] = field.value;
	        });

	    	SendFleet(Start, Target, Resources, SendShips, session, speed, 3);
	    	InfoBoxRemove(500);
		 });
	     $("a#ogre_remove").click(function() { InfoBoxRemove(); window.location.reload(); });
	}
	// Attack planet in galaxy view
	function AttackPlanet(target)
	{
		$Text = $('<div />');
		$Info = $('<ul />', {'class' : 'ogre_koords'});
		$AttOptions = "";
		for (i=10;i>=1;i--)
		{
			$AttOptions += '<option value="'+i+'">'+(i*10)+' % </option>';
		}
		$Info.append($('<li />').append(OgReLang[DefLang].infoBox.destKoord+'<span class="ogre_start">'+target+'</span>'));
		$Info.append($('<li />').append(OgReLang[DefLang].infoBox.speed+'<select class="ogre_gal_select">'+$AttOptions+'</select>'));

		$Resources = $('<form />' , { 'method' : "#",  'id' : "ogre_resources" });
		$Res = $('<ul />', {'class':"ogre_resources"});
		$Res.append($('<li />').append(OgReLang[DefLang].infoBox.metal+' (<span style="color: yellow">'+Resources['metal']+'</span>) <input id="res_metal" name="res_metal" class="ogre_ships" type="text" value="0" /><a href="javascript:void(0)" id="" rel="max_ship"></a>'));
		$Res.append($('<li />').append(OgReLang[DefLang].infoBox.crystal+' (<span style="color: yellow">'+Resources['crystal']+'</span>) <input id="res_crystal" name="res_crystal" class="ogre_ships" type="text" value="0" /><a href="javascript:void(0)" id="" rel="max_ship"></a>'));
		$Res.append($('<li />').append(OgReLang[DefLang].infoBox.deuterium+' (<span style="color: yellow">'+Resources['deuterium']+'</span>) <input id="res_deuterium" name="res_deuterium" class="ogre_ships" type="text" value="0" /><a href="javascript:void(0)" id="" rel="max_ship"></a>'));

		$AttShips = '<form method="#" id="ogre_ships_form"><ul class="ogre_ships">';
	    $.each(Ships, function(index, val)
	    {
	       if(val>0)
	    	   $AttShips += '<li>'+OgReLang[DefLang].ShipsName[index]+': (<span id="a'+index+'" style="color: yellow">'+val+'</span>) <input id="'+index+'" name="'+index+'" class="ogre_ships" type="text" value="0" /><a href="javascript:void(0)" id="" rel="max_ship"></a></li>';
		});
		$AttShips += '</ul></form>';

		$Text.append($Info);
        $Text.append($Resources.append($Res));
		$Text.append($AttShips);

	    $Text.append('<ul class="ogre_otherinfo"><li class="space">'+OgReLang[DefLang].infoBox.capacity+' <span id="space">0</span></li></ul>');

		InfoBox(OgReLang[DefLang].infoBox.titleAttack, $Text, 300, "true");

        $('a[rel="max_res"], a[rel="max_ship"]').click(function(){
        	$(this).prev('input').val( $(this).prev().prev().text() );
        	$(this).prev('input').focus();
        });

		CheckCargo();

	    $('#ogre_accept').click(function()
	    {
			speed = $('.ogre_gal_select').val();

			var start = $('span.planet-koords').text();
				start = start.slice(1,-1);
			var koord_start = start.split(":");
			var Start = [];
			Start['galaxy'] = koord_start[0];
			Start['system'] = koord_start[1];
			Start['position'] = koord_start[2];

			var dest = target.slice(1,-1);
			var koord_dest = dest.split(":");
			var Target = [];
			Target['galaxy'] = koord_dest[0];
			Target['system'] = koord_dest[1];
			Target['position'] = koord_dest[2];

	    	Resources['metal'] = $('#res_metal').val();
	    	Resources['crystal'] = $('#res_crystal').val();
	    	Resources['deuterium'] = $('#res_deuterium').val();

		    SendShips = {};
	        $.each($('#ogre_ships_form').serializeArray(), function(i, field)
	        {
		       SendShips[field.name] = field.value;
	        });

	    	SendFleet(Start, Target, Resources, SendShips, session, speed, 1);
	    	InfoBoxRemove(500);
	    });
	    $('#ogre_remove').click(function() { InfoBoxRemove(); window.location.reload(); });
	}
	// Attack link in Galaxy view
	function AddAttackLnk()
	{
		$('div[id*="planet"]').each(function(index)
		{
			try
			{
				$trg = $('.planetname').eq(index).prev().find('#pos-planet').text();
				$img = $('<img />',
				   		{'src' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAIAAAC0D9CtAAAAKnRFWHRDcmVhdGlvbiBUaW1lAEggMiBqYW4uIDIwMTIgMTg6MTY6MjEgKzAxMDBp5b+vAAAAB3RJTUUH3AECES4JUX7vAAAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAG7SURBVHjaY2RgYKhWV7/z9SsDEUCFm7v15k1GoIaPf/4IsbISo+fd79/8LCxMQBuwagheuRJTEKgSqJ4FTVQ7LEzR0ZFLVBTIDluz5tvr1/f377+6ahWyGiZkjkVenn5U1MeHD491dbGwsABJIBsoAhRHVoawRy8yUtXV9diECXf37gVymZmZn5w6BUTKzs5WBQVACy8tX45uj7q7+7PTpyEaQIaxQI0DigDFgbJY3MYvJXV/715WJiYIAtoDZwPFgbJwlYzhMjLqPDzpMOPh4MXFixL6+miCM52db375wgLnZB88eGnRohcXLkBE3Pr6dhUVQdgSBgZ6cXFT7e0RYSDCzg4kf7x+Laqmdn3JEogE0G3vr1yBsHXDwoCyEGVAe0D+YWdiAqLHe/Yo2NtreHlBuMAwgDCAIkDxuxs2QLhQezjArLuLFwtISVlWVcnb2T3asQNoj5KdnZyHh5SNzcPt2x+vXw9RBg0Df0lJuC81EhLkPD25JCQg3G8vXtxdvfrumjVwBRufPwfpCZWWxkxafocPb7K1xRRf/fQpKF1zMDPr8vExEAEuf/r04+9fRgZS8s/KJ0+AJADzqKgQtSN3zAAAAABJRU5ErkJggg%3D%3D",
				   		 'class' : 'ogre_gal_att',
				   		 'css' : {'cursor' : 'pointer',
				   				 'padding-left' : 2,
				   				 'float' : 'left',
				   				 'width' : 17,
				   				 'height' : 17},
				   		 'rel' : $trg });

			    $('.planetname').eq(index).prev().find('.ListLinks li').each(function(ind)
			    {
			    	$lnk = $('.planetname').eq(index).prev().find('.ListLinks li a[href$="mission=1"]');
					if ($lnk.attr('href').match(/mission=1/)) {
						$('.planetname').eq(index).append($img);
					}
			    });
			}
			catch(e) {}
		});
	}
	// Info Box
	function InfoBox(header, text, width, act)
	{
		var pageX = $(window).width();
	    var $infoBox = $("<div/>", {
	       	"id" : "ogre_infobox",
	       	"css" : { "left" : (pageX/2)-(width/2),
	       			  "top" : 180,
	     			  "width" : width,
	       			}
	    }).appendTo("body");

	    $infoBox.append($('<h3 />').html(header));
	    $infoBox.append(text);

	    if(act=="true")
	    {
		    var $Accept = $('<a>', {'id':'ogre_accept', 'class':'accept'});
		    var $Remove = $('<a>', {'id':'ogre_remove', 'class':'remove'});
		    var $Actions = $('<div />', {'class' : 'ogre_infobox_actions'});
		    $Actions.append($Accept);
		    $Actions.append($Remove);
		    $Actions.appendTo($infoBox);
	    }
	    $('<br />', {"style" : "clear: both;"}).appendTo($infoBox);
	}
	// Info Box Remove
	function InfoBoxRemove(delay)
	{
		if(delay)
		    $('#ogre_infobox').fadeOut(delay, function() { $(this).remove() });
		else
			$('#ogre_infobox').remove();
	}


	// ----- Extra Functions ------ //

		function shortHeader() { $("div#planet").addClass("shortHeader"); }
		function hideEventList()
		{
			var tgs = '';
			$("#eventboxContent").css("display","none");
		    tgs = $("div.smallplanet a.active").attr("href");
		    var cps = tgs.match (/\&cp=([\d]{1,8})/i);
		}
		function messageMenu()
		{
			var new_msg = "";
			var ico = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAdCAYAAADGgB7AAAAAB3RJTUUH2wwcCDssa2uRCQAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAOSSURBVHja7Vc7j9NAEB6vHTvO60IkTkIoOnTihHi09DQUCH4BSBT8C37DFdDR8ROQaGgRPS0o6IoohJMCl0vOl6efy8w6TuLcOrHvUlAw0mbX3pnZz9/OzG4UWMj9vYN7n33PvQ7blXNVy71sHX3/mMVInfXa3u27b3zfe4hjZT7LJRaK5B1fMwdgMKY+KlUqjcFZ/ygLsAfI1DsE9RTHeiKgtCIBx/2ghL/PzEJ5fzSwvuAre5Mbhq02GQ0fY1+4Apw4e6uNFmJaBbvnREQaN2xmylYdbUsUJaSQ8yBaT91gokWKQoLA3y6iiEDOF0yuAbIkxRgwDFDpl14R1WKYjMxLg1ZIEASwf6sOOzs7FwBvQCIYInvLOodmqw3skh8oBUZsGboBw+EQKpUKqGp6cL7vw2g0AsMwlljnWXZAUDvfyllwhsCw6UZYOfr9PriOK1jY1EiP9El0XV+qHEqWpHJiwGSsmaYJgR/Aae8UPM9bC4rmSY/0yY4x5bIJPo0Bc103zid6ZQqDQrEgtqfT6awFRvOkR/pkJ7JxKfhd10nkQPZSALP63ZBDxw4bOsGTAFlwBXPFYlGUk2azCZ7rCXY8zxdACFSr1RJASqUSMsXA80OduT9sNG/1TmQY7mC7cD6L4LcnY/gz+RmbGOzdXPkCDq49gR+Nb1Cv1wUgkna7Dfl8HvK6hn5G2BY2J51fabevKwUmE1o4Ko7EzHQ6hWq1imXAEmBqtRr0ej0BisrKeDwWulEGZ8jCU5CkRmLwR9vkOI4ARQFNQtulaRocHx+Lnp5JaJ70SH/5o1KINPjWMhbGkidSnxaiRkyUy2UBhIDRc7StuVxuDozGKcWVvUwERoxRpkYLRIvPDTUt8f1qhpMomBR8RXcm40zAbNsWrGSp+pGQTRRzkSSASpREYI1GIzOgbQq7uov/wCQyq0lU1S8TcyuSKtgIWFfPm0N60A1TrjWrSZSBlK1XBGWlUaTgb6hq7q1Z0l5j/S2Z9J9B4eKWII7XQF4o7el4o3MjH/6/oduryhhWXaU7mQx/pwEWnRusVK29Rzwv0Ik2JynpahzDypfccCpYYjQenEGxcg2jQCiPsH0aWmeH2H+FFLez5QNtt7Z74xBNngScF4VteHt0Qt44neN0+2OxP7hcmQGSj5mqko8P/ZPOK+xTx4EieT7AVoMwHs4hPGTd2bbT9aQK2bKZfFJR7Gaw+WeF/QXCkf+WkQ9J/wAAAABJRU5ErkJggg%3D%3D";
			if($("#message_alert_box span").html()!==null)
			{
				new_msg = "<span style='color: #ffffff'>("+$("#message_alert_box span").html()+")</span>";
				ico = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAdCAMAAADxXu7yAAAAB3RJTUUH2wwcCDoH3sxZCAAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAGJUExURQAAABIWGRIVGRAUGBAUFxATFg8TFQ8SFQ8SFhEVGAwQEg0PEgwPEQsOEQsNEAoNDwoMDwoMDgoNEAAAAAwPEAkMDQkLDQkLDgcJCwcKCwcICgYICQkKCwkJDAYHCQABAQICAgMDAwkVFSEyMiY2NgkUFCk6Osvc3Nvs7N/v7zJDQ9np6cvb29Xk5Nno6AECAjZGRuPw8NTi4s3d3dnn59zq6tjm5tHf3zdHR+fy8t/r69jl5c/e3t7q6uDs7Nro6MHQ0Km6ujlJSer19eTv7+Pv793p6c7e3sTT07nIyNrm5jtLS+329uny8tzp6cLT07TExAcJChYaHkdZW/D4+Oz09Ovz8+Lt7cXV1QcICRwgJUtdX/T5+fD29ubv78va2sXT0/H29hcbHxsfI01eYff7++3z89Pg4NDc3PH39/X5+U5fYd3o6Njj4/L29vj7++jw8Pb4+Pz9/RwgJBwhJUpdX97p6fr8/P7+/hsgJC4+QjNHSjNGSRoeIh0hJh0iJx8lKhsgIx8kKfeoSH4AAAABdFJOUwBA5thmAAABhUlEQVR42mNgYGBoKMEGGNBAE0gwCgRKICyIsgZUVQ0wRQgAUd4YhKwsCFMZBNSjKsOqJqouqgRVWW0UDoBhWlV1DRqoioqqxFBWWlZegQzKy0qxKcsuyCksQoDCnILsqGI0tyUDlWXl5Oblw0Bebk5WNobbgMpSUtPSMzKzICAzIz0tNQVDGdDW6JjYuPiERAhIiI+LjYmOikpCURYYFBQUHBIaFh7hGQoCnhHhYaEhwUDRSGRlwkDg7ePr6+vnHwAkA/z9gKSPN0gYLI2kzMnZxdXN3crD08vTw8rdzdXF2QmmDNk0C0sraxtbO3sHRwd7O1sbaytLC2zKDAyNjE1MTU3NzM2ApImxkaEBNmVa2jq6egigq6OtJSysj6FMTV1DExloqKthM01JWQUVKKtiU4YDUKBMXlhBEY8yaWE5YkxjEBUTF5WQlAIDuAopKWkZWRRlXNw8PLx8fHz8/PwCAgKCQCQkJMwrIiKClp8ZmZhZWFlZ2djZ2NnZOKCIk5OBZgAA2dG0Jlec3xwAAAAASUVORK5CYII%3D";
		    }
			var msg = '<li><span class="menu_icon"><a target="_self" class="" href="index.php?page=messages"><img width="38" height="29" rel="http://gf2.geo.gfsrv.net/cdndd/2a714b5e1d5709caaa29cb29a46747.gif" src="'+ico+'"></a></span><a target="_self" accesskey="" href="index.php?page=messages" class="menubutton "><span class="textlabel">'+OgReLang[DefLang].planetMenu.messages+' '+new_msg+'</span></a></li>';
			$("#menuTable li::nth-child(10)").after(msg);
		}
	// ----- Extra Functions ------ //

	// ----- System Functions ----- //
		function CheckCargo()
		{
		    var materials = 0;
		    var empty_space = 0;
		    $('#ogre_resources input[type="text"]').bind({		        focusin : function()
		        {		       	   materials = 0;
			       $.each($('#ogre_resources').serializeArray(), function(i, field)
			       {
				       materials += parseInt(field.value);
			       });
		        }
		    });
		    $('#ogre_ships_form input[type="text"]').bind({			    focusin : function()
			    {		           empty_space = 0;
			       $.each($('#ogre_ships_form').serializeArray(), function(i, field)
			       {
				       empty_space += Capacity[field.name] * field.value;
			       });
			    }
		    });
		    $('#ogre_ships_form input[type="text"], #ogre_resources input[type="text"]').bind({			    focusin : function()
		    	{
		       		$("#space").html(empty_space-materials);
			    }
			});
		}
		function SearchShips(target, session, mission)
		{
			$loadFleet = $("<div/>", {"id" : "ogre_loadFleets",
									  "css" : {'display': 'none'}
							  	      }).appendTo("body");

			$.ajax({
			  type : "POST",
			  url: "index.php?page=fleet1"+session,
			  dataType: "html",
			  success: function(data)
			  {
                 $loadFleet.html(data);

                 $("#ogre_loadFleets ul#civil .on, #ogre_loadFleets ul#military .on").find("a:first").each( function(index)
                 {
                    var res = $(this).attr("onclick").toString();

                     if(chrome)
                      var myregexp = /.(am2[0-9]{2}).value=([0-9])/;
                     else
                      var myregexp = /\.(am\d{3})\.value\s+=\s+(\d+)/g;

                    var result = myregexp.exec(res);
                    Ships[result[1]] = result[2];
                    Cargo += Capacity[result[1]] * result[2];
                 });
			  },
			  complete : function()
			  {			  		InfoBoxRemove();
				  	$loadFleet.remove();

			  		if(mission=="galaxy")
			  			AttackPlanet(target, Cargo);
				  	else if(mission=="escape")
				  		WarningFS(target, Cargo);
				  	else if(mission=="transport")
				  		Transport(target, Cargo);
			  }
			});
		}
		function SendFleet(StartKoord, DestKoord, Resources, ShipInfo, session, speed, mission)
		{
				var data_one = {
					galaxy: StartKoord['galaxy'],
					system: StartKoord['system'],
					position: StartKoord['position'],
					mission: 0,
					speed: speed,
					type: 1
				};
				data_one = $.extend(ShipInfo, data_one);

				var data_two = {
					galaxy: DestKoord['galaxy'],
					system: DestKoord['system'],
					position: DestKoord['position'],
					speed: speed,
					mission: 0,
					type: 1,
					union: 0
				};
				data_two = $.extend(ShipInfo, data_two);

				var data_three = {
					galaxy: DestKoord['galaxy'],
					system: DestKoord['system'],
					position: DestKoord['position'],
					expeditiontime: 1,
					holdingOrExpTime: 0,
					holdingtime: 1,
					metal: Resources['metal'],
					crystal: Resources['crystal'],
					deuterium: Resources['deuterium'],
					mission: mission,
					speed: speed,
					type: 1,
					union2: 0
				};
				data_three = $.extend(ShipInfo, data_three);

				// Flotta küldés 1. lépés
				$.ajax({
				  type: 'GET',
				  url: 'index.php?page=fleet1',
				  success: function()
				  	{
						$.ajax({
						  type: 'POST',
						  url: 'index.php?page=fleet2',
						  data: data_one,
						  success: function()
						  	{

								// Flotta küldés 2. lépés
								$.ajax({
								  type: 'POST',
								  url: 'index.php?page=fleet3',
								  data: data_two,
								  success: function()
								  	{
										// Flotta küldés 3. lépés
										$.ajax({
										  type: 'POST',
										  url: 'index.php?page=movement',
										  data: data_three,
										  success: function()
										  	{
		                                       window.location = "index.php?page=movement"+session;
		                                       return false;
										  	}
										}); // 3. lépés vége
								  	}
								});	// 2. lépés vége
						  	}
						}); // 1. lépés vége
					}
				});
	    }
		function CheckURL()
		{
			if (document.location.href.search(new RegExp("http://.*\.ogame\..*/game/index.php\\?page=galaxy*")) != -1) return 1;
			return 0;
		}
    // Nyersanyag kapacitás
    function Space_Cargo(space, Resources)
    {

			// Teherbírás, fém
			if(space >= Resources['metal']) {
				space = space - Resources['metal'];
			}
			else {
				Resources['metal'] = parseInt(space);
				space = 0;
			}

			// Teherbírás, Kristály
			if(space >= Resources['crystal']) {
				space = space - Resources['crystal'];
			}
			else {
				Resources['crystal'] = parseInt(space);
				space = 0;
			}

			// Teherbírás, Deutérium
			if(space >= Resources['deuterium']) {
				space = space - Resources['deuterium'];
			}
			else {
				Resources['deuterium'] = parseInt(space);
				space = 0;
			}
		return space;
    }
    function Settings()
    {		sett = '<li><span class="menu_icon"></span><a id="ogreSett" target="_self" accesskey="" href="javascript:void(0)" class="menubutton"><span class="textlabel">OgRe Settings</span></a></li>';
		$("#menuTable li::nth-child(11)").after(sett);
		$("#ogreSett").click(function()
		{
            setTimeout(function() {
				var sel = "";
				$.each(Language, function(index, val)
				{					if(GM_getValue("defLang")==val)
					{
						sel += '<option value="'+val+'" selected="selected">'+index+'</option>';
					}
					else
						sel += '<option value="'+val+'">'+index+'</option>';
				});

				$text = $('<div />');
				$sett = $('<ul />');
				$sett.append($('<li />').html(OgReLang[DefLang].options.language+' <select id="lang" name="lang" class="ogre_select">'+sel+'</select>'));
				$sett.append($('<li />').html(OgReLang[DefLang].options.event+'<input class="opt_check" type="checkbox" value="" name="eventHide" id="eventHide" />'));
				$sett.append($('<li />').html(OgReLang[DefLang].options.message+'<input class="opt_check" value="" type="checkbox" name="msgMenu" id="msgMenu" />'));
				$sett.append($('<li />').html(OgReLang[DefLang].options.header+'<input class="opt_check" value="" type="checkbox" name="shortHeader" id="shortHeader" />'));

				$text.append($sett);

				InfoBox(OgReLang[DefLang].options.title, $text, 300, "true");


		            if(GM_getValue("eventHide")) { $("#eventHide").attr('checked', 'checked'); }
		            if(GM_getValue("msgMenu")) { $("#msgMenu").attr('checked', 'checked'); }
		            if(GM_getValue("shortHeader")) { $("#shortHeader").attr('checked', 'checked'); }

			    $("a#ogre_accept").click(function() {
					setTimeout(function() {
						GM_setValue("Opt", 1);
						GM_setValue("defLang", $("#lang").val() );
						GM_setValue("eventHide",  ($("#eventHide:checked").attr("checked")) ? true : false );
						GM_setValue("msgMenu",  ($("#msgMenu:checked").attr("checked")) ? true : false );
						GM_setValue("shortHeader",  ($("#shortHeader:checked").attr("checked")) ? true : false );
					}, 0);
		           	InfoBoxRemove(500);
				});
			    $("a#ogre_remove").click(function() {
			       	InfoBoxRemove(500);
			    });
            }, 0);
		});
    }
	// ----- System Functions ----- //
})();

// Css és Js fájl betöltése
function LoadJsCssFile(filename, filetype)
{
	 if (filetype=="js")
	 {
	  var fileref=document.createElement('script')
	  fileref.setAttribute("type","text/javascript")
	  fileref.setAttribute("src", filename)
	 }
	 else if (filetype=="css")
	 {
	  var fileref=document.createElement("style")
	  fileref.setAttribute("type", "text/css")
	  fileref.innerHTML = filename
	 }
	 if (typeof fileref!="undefined")
	  document.getElementsByTagName("head")[0].appendChild(fileref)
}

LoadJsCssFile(GM_getResourceText ('OgReCss'), "css");