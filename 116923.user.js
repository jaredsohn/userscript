// ==UserScript==
// @name		AlphabounceEnhancer
// @namespace	        http://zilliox.me
// @description	        Improve the Alphabounce interface by adding the direction of the missions, the planets and the asteroids. This script also add a bloc-note.
// @include		*.alphabounce.com/
// @include		*.alphabounce.com/?*
// ==/UserScript==
(function () {
	var $;

	// Add jQuery
	(function(){
		if (typeof unsafeWindow.jQuery == 'undefined') {
			var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement, GM_JQ = document.createElement('script');
			GM_JQ.src   = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js';
			GM_JQ.type  = 'text/javascript';
			GM_JQ.async = true;
			GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
		}
		GM_wait();
	})();

	// Check if jQuery's loaded
	function GM_wait() {
		if (typeof unsafeWindow.jQuery == 'undefined') {
			window.setTimeout(GM_wait, 100);
		} else {
			$ = unsafeWindow.jQuery.noConflict(true);
			letsJQuery();
		}
	}

	// All your GM code must be inside this function
	function letsJQuery() {
		var user = {};
		var planets = {
			Khorlan:   [{x:175 ,y:-196},{x:184 ,y:-187}],
			Balixt:    [{x:-14 ,y:-44 },{x:-5  ,y:-35 }],
			Balmanch:  [{x:-345,y:347 },{x:-336,y:366 }],
			Chagarina: [{x:-324,y:-578},{x:-317,y:-571}],
			Cilorile:  [{x:73  ,y:-28 },{x:82  ,y:-19 }],
			'D-Tritus':[{x:245 ,y:-46 },{x:248 ,y:-43 }],
			Douriv:    [{x:-91 ,y:-109},{x:-78 ,y:-96 }],
			Folket:    [{x:571 ,y:-257},{x:576 ,y:-252}],
			Grimorn:   [{x:77  ,y:-126},{x:84  ,y:-119}],
			Holovan:   [{x:-156,y:105 },{x:-145,y:116 }],
			Karbonis:  [{x:23  ,y:2   },{x:30  ,y:9   }],
			Khorlan:   [{x:175 ,y:-196},{x:184 ,y:-187}],
			Lycans:    [{x:-7  ,y:6   },{x:8   ,y:21  }],
			Moltear:   [{x:-62 ,y:27  },{x:-49 ,y:40  }],
			Nalikors:  [{x:63  ,y:149 },{x:70  ,y:156 }],
			Pofiak:    [{x:-21 ,y:82  },{x:-16 ,y:87  }],
			Samosa:    [{x:401 ,y:82  },{x:422 ,y:103 }],
			Senegarde: [{x:88  ,y:43  },{x:97  ,y:52  }],
			Soupaline: [{x:-9  ,y:-1  },{x:-6  ,y:2   }],
			Spignysos: [{x:-41 ,y:-15 },{x:-32 ,y:-6  }],
			Tarciturne:[{x:189 ,y:112 },{x:194 ,y:117 }],
			Tiboon:    [{x:7   ,y:-12 },{x:10  ,y:-9  }],
			Volcer:    [{x:-306,y:-157},{x:-291,y:-142}]
		};
		var asteroids = [
			[{x:-13,y:-14},{x:-7 ,y:-8 }],
			[{x:43 ,y:8  },{x:53 ,y:18 }],
			[{x:-28,y:37 },{x:-16,y:49 }],
			[{x:-74,y:-39},{x:-60,y:-25}]
		]
		// Utils
		var coord_from_string = function(str) {
			var coord = str.replace('][', ',').replace('[', '').replace(']', '').split(',');
			return {x:coord[0].match(/[-?\d\.]+/g)[0], y:coord[1].match(/[-?\d\.]+/g)[0]};
		}
		var add_mission_distance_from_coord = function(coord, mission) {
			var delta = {x:(coord.x-user.x), y:(coord.y-user.y)};
			add_mission_distance_from_delta(delta, mission);
		}
		var get_delta_from_coords = function(coords) {
			var delta = {};
			if (coords.length > 0) {
				for (var i in user) {
					if ((coords[0][i] < user[i] && coords[1][i] > user[i]) || (coords[0][i] > user[i] && coords[1][i] < user[i])) {
						delta[i] = 0;
					} else {
						if (Math.abs(coords[0][i] - user[i]) < Math.abs(coords[1][i] - user[i])) {
							delta[i] = coords[0][i] - user[i];
						} else {
							delta[i] = coords[1][i] - user[i];
						}
					} 
				}
			}
			return delta;
		}
		var add_mission_distance_from_coords = function(coords, mission) {
			var delta = get_delta_from_coords(coords);
			add_mission_distance_from_delta(delta, mission);
		}
		var get_distance_from_delta = function(delta) {
			return Math.abs(delta.x) + Math.abs(delta.y);
		}
		var get_angle_from_delta = function(delta) {
			return Math.round(Math.atan2(delta.y, delta.x+0.01)/Math.PI*180);
		}
		var add_mission_distance_from_delta = function(delta, mission) {
			var mission_distance = get_distance_from_delta(delta);
			var angle = get_angle_from_delta(delta);
			var image_path = '/img/icons/small_next.gif';
			if (mission_distance == '0') {
				image_path = '/img/icons/small_go.gif';
				angle = 0;
			} else {
				$('<div class="mission_distance_number date" ></div>').prependTo(mission)
					.text(mission_distance)
					.css({
						height: '16px',
						lineHeight: '16px',
						margin: '3px 0 -3px 10px'
					});
			}
			$('<div class="mission_distance_picto date" ></div>').prependTo(mission)
				.css({
					backgroundImage: 'url("'+image_path+'")',
					backgroundPosition: 'right center',
					backgroundRepeat: 'no-repeat',
					height: '16px',
					width: '16px',
					lineHeight: '16px',
					margin: '3px 0 -3px 5px',
					'-webkit-transform': 'rotate('+angle+'deg)',
					'-moz-transform': 'rotate('+angle+'deg)'
				});
		}
		var add_proximities = function(proximities, parent) {
			for (var i in proximities) {
				add_proximity(proximities[i], parent);
			}
		}
		var add_proximity = function(proximity, parent) {
			var indication_class = 'KLevelMissionStart';
			if (proximity.is_warning) indication_class = 'KMissionEnd';
			var title = proximity.title;
			if (proximity.href) title = '<a href="'+proximity.href+'" target="_blank">'+title+'</a>';
			mission = $('	<div class="mission" style="min-height: 0px; overflow: hidden;">\
								<h3 style="margin-bottom: 0; background-image: url('+proximity.image_path+'); background-size: auto 200%; background-position: 0 2px; padding-left: 40px;">\
									'+title+'\
								</h3>\
							</div>')
				.appendTo($('<div class="'+indication_class+'"></div>').appendTo(parent));
			add_mission_distance_from_delta(proximity.delta, mission);
		}
		// Get user info
		var initialize = function(iframe) {
			iframe = iframe.contents();
			if (iframe.get(0).location.href == 'http://www.alphabounce.com/user/missions') {
				$.ajax({
					url: "/user/data.xml",
					success: function(data){
						data = $(data).find('data');
						user.x = parseInt(data.attr('x'));
						user.y = parseInt(data.attr('y'));
						refactor_mission_iframe(iframe);
					}
				});
			}
			
		}
		// Customize mission page
		var refactor_mission_iframe = function(iframe) {
			iframe.find('.missions').prepend('<h1>Missions</h1><hr>').css({marginTop:0});
			iframe.find('a.button').css({position:'absolute',top:'-6px',right:0});
			iframe.find('.mission').each(function(){
				var mission = $(this);
				mission.find('.date').remove();
				var content = $(this).find('.content');
				// Add toggle on mission
				mission.css({minHeight: 0, overflow: 'hidden'});
				mission.find('h3').css({
					cursor: 'pointer',
					marginBottom: 0,
					backgroundImage: 'none',
					paddingLeft: '5px'
				}).prepend('[<span style="display:inline-block;width:1em;text-align:center;">+</span>] ').click(function(){
					if (content.is(':visible')) {
						content.hide();
						mission.find('span').text('+');
					} else {
						content.show();
						mission.find('span').text('-');
					}
				});
				// Level mission
				if (mission.parent().hasClass('KLevelMissionStart')) {
					var coords=[];
					content.find('em').each(function() {
						if ($(this).text().match('Mine')) {
							$('<div class="date"></div>').prependTo(mission)
								.text(parseInt($(this).text()))
								.css({
									backgroundImage: 'url("/img/icons/small_money.gif")',
									backgroundPosition: 'right center',
									backgroundRepeat: 'no-repeat',
									height: '16px',
									lineHeight: '16px',
									paddingRight: '18px',
									marginBottom: '-3px'
								});
						} else {
							coords[coords.length] = coord_from_string($(this).text());
						}
					});
					add_mission_distance_from_coords(coords, mission);
				} else {
					content.find('em').each(function() {
						if ($(this).text().match(']')) {
							var coord = coord_from_string($(this).text());
							add_mission_distance_from_coord(coord, mission);
						} else {
							for (i in planets) {
								if ($(this).text().match(i)) {
									add_mission_distance_from_coords(planets[i], mission);
								}
							}
						}
					});
				}
			});
			// Add warning on asteroids
			var proximities = [];
			for (var i in asteroids) {
				var delta = get_delta_from_coords(asteroids[i]);
				var distance = get_distance_from_delta(delta);
				if (get_distance_from_delta(delta) < 20) {
					proximities[proximities.length] = {
						delta: delta,
						distance: distance,
						image_path: 'http://gaia-qg.info/images/Asteroide2.png',
						is_warning: true,
						title: 'Asteroids'
					};
				}
			}
			for (var i in planets) {
				var delta = get_delta_from_coords(planets[i]);
				var distance = get_distance_from_delta(delta);
				proximities[proximities.length] = {
					delta: delta,
					distance: distance,
					image_path: 'http://gaia-qg.info/images/'+i+'.png',
					is_warning: false,
					title: 'Planet '+i,
					href: 'http://gaia-qg.info/index.php?title='+i
				};
			}
			proximities.sort( function(a, b){return (a.distance - b.distance + 0.01)/Math.abs(a.distance - b.distance + 0.01);} );
			proximities = proximities.slice(0, 6);
			var proximities_parent = $('<div class="missions proximity"></div>').appendTo(iframe.find('#section'))
				.append('<h1>A Proximité</h1><hr>');
			add_proximities(proximities, proximities_parent);
			iframe.find('.content').css({marginTop: '10px'}).hide();
		};
		// Run Baby ! Run !
		initialize($('#iframe').load(function(){
			initialize($(this));
		}));
		// Add bloc-note
		var container = document.getElementById("center");
		if (container != null) {
			container.style.position = "relative";
			var textarea = document.createElement("textarea");
			textarea.setAttribute("id", "notebook");
			textarea.innerHTML = GM_getValue("notebook", "vos notes...");
			textarea.setAttribute("style", "position: absolute; top: 43px; left: 367px; height: 30px; width: 270px;");
			textarea.addEventListener("keyup", function() { 
					GM_setValue('notebook',document.getElementById('notebook').value);
				}, true);
			container.appendChild(textarea);
		}
	}
})();