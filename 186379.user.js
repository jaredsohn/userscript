// ==UserScript==
// @name        Leboncoin
// @namespace   http://www.leboncoin.fr
// @include     http://www.leboncoin.fr/*
// @include     http://www*.leboncoin.fr/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function loadScriptCallback() {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = 'var globalInit = false; function initialize() {'+
	'window.globalInit=true;'+
	'}';
    document.body.appendChild(script); // run the script
}

function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAmfADS-nYyRqhY0I0Ow1g-DlvxEnLk3vI&sensor=false&callback=initialize';
	document.body.appendChild(script);
}

loadScriptCallback();
loadScript();
waitForInit();

function waitForInit(){
  if(typeof unsafeWindow.globalInit == "undefined"){
    window.setTimeout(waitForInit,50);
  }
  else {
	initializeMap();
  }
}


(function() {
    console.dump = function(object) {
        if (window.JSON && window.JSON.stringify)
            console.log(JSON.stringify(object));
        else
            console.log(object);
    };
})();

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function initializeMap() {
	var div = $('<div>').html('<input type="checkbox" value="1" name="ur" id="radiomap">Afficher les annonces sur une carte');
	div.insertAfter($('.searchbutton_zone'));

	var mapenable = readCookie('leboncoin_googlemap');
	if(mapenable == "true") {
		$('#radiomap').attr('checked','checked');
		loadMap();
	}

	$('#radiomap').on('click',function() {
		if ($(this).is(':checked')) {
			createCookie('leboncoin_googlemap',"true");
			loadMap();
		} else {
			createCookie('leboncoin_googlemap',"false");
			unloadMap();
		}
	});
}


function loadMap() {
	$('.list-lbc').prepend("<div id='map-canvas' class='map'>carte annonce</div>");
	$('.list-lbc').prepend("<iframe id='annonce-loader' style='display:none;'></iframe>");
	$('#map-canvas').height(600);
	$("#paging").hide();
	$('.list-lbc a').hide();
	initialize();
}

function unloadMap() {
	$('#map-canvas').remove();
	$("#paging").show();
	$('.list-lbc a').show();
}

var allMarkers = new Array();

function getMarker(location) {
	for(var i=0 ; i < allMarkers.length ; i++) {
		if(allMarkers[i].location.equals(location)) {
			return allMarkers[i];
		}
	}
	return;
}
var bounds;
var infowindow;

var nbitem = 1;

function initialize() {
	google = unsafeWindow.google;

	var mapOptions = {
		center: new google.maps.LatLng(46.227638,2.213749),
		zoom: 5
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

	geocoder = new google.maps.Geocoder();

	bounds = new google.maps.LatLngBounds();
	
	generateMarkers($('.list-lbc a'));
	
	loadNextPage($('#paging'));
	
	//map.fitBounds(bounds);
}


function generateMarkers(listAnnonces) {
	var global_deffered = $.Deferred();
	var deffs = [];
	listAnnonces.each(function () {
		var a = $(this);

		var place = getPlace(a);
		var title = getTitle(a);
		
		var deff = $.Deferred();
		deffs.push(deff);
		
		geocoder.geocode( { 'address': place}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				nbitem++;
				var location = results[0].geometry.location;

				var existing=getMarker(location);
				
				var contentStr = getInfoContent(a);
				  
				if(existing) {
					existing.contentStr=existing.contentStr+contentStr;
				} else {
					var marker = new google.maps.Marker({
						map: map,
						position: location,
						title:title
					});
					bounds.extend(location);
					
					google.maps.event.addListener(marker, 'mouseover', function(location) {
						console.dump(location.latLng);
						if (infowindow) {
							infowindow.close();
						}
						infowindow = new google.maps.InfoWindow({
							content: getMarker(location.latLng).contentStr
						});
						infowindow.open(map,marker);
					});
					allMarkers.push({
						marker: marker,
						location: location,
						contentStr : contentStr
					});
				}
				
			} else {
				//deff.reject();
			}
			deff.resolve();
		});
	});
	
	$.when.apply(null,deffs).done(function() {
		global_deffered.resolve();
	}).fail(function() {
		global_deffered.reject();
	});		
	
	return global_deffered.promise()
}

function getPlace(a) {
	var place = $.trim(a.find('.placement').text());
	place = $.trim(place.split('/')[0]);
	place = place + ' France';
	return place;
}

function getTitle(a) {
	var title = $.trim(a.find('.title').text());
	var price = $.trim(a.find('.price').text());
	return title+' - '+price;
}

function getInfoContent(a) {
	var title = getTitle(a);
	var place = getPlace(a);
	var url = a.attr('href');
	var img = a.find('img');
	var contentStr = '<div id="content">'+
	'<div id="siteNotice">'+
	'</div>'+
	'<h2 id="firstHeading" class="firstHeading">'+title+'</h2>'+
	'<div id="bodyContent">'+
	'<a href="'+url+'" target="blank">';
	if(img) {
		var imgClone = img.clone();
		imgClone.wrap('<div>');
		contentStr = contentStr + imgClone.parent().html();
	} else {
		contentStr = contentStr + 'Voir l\'annonce';
	}
	contentStr = contentStr + '</a>'+
	'</div>'+
	'</div>';
	return contentStr;
}

function loadNextPage(pagingElt) {
	var next = pagingElt.find("li a:contains('Page suivante')");
	if(next) {
		$('#annonce-loader').load(next.attr('href'),function() {
			var deff = generateMarkers($('#annonce-loader .list-lbc a'));
			deff.done(function() {
				alert(nbitem);
				loadNextPage($('#annonce-loader #paging'));
			}).fail(function() {
				alert('erreur loading');
			});
		});
	}
}