// ==UserScript==
// @name        anthony testing tools
// @description   testing
// @include      http://www.monopolycitystreets.com/*
// @version      v1
// ==/UserScript==

var auto = true;

function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	style = document.createElement('link');

	style.type = 'text/css';
	style.rel = 'stylesheet';
	style.href = css;
	head.appendChild(style);
}

function addInlineJavascript(content)
{
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	script = document.createElement('script');
    script.innerHTML = content.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	head.appendChild(script);
}

function addJavascript(src)
{
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	head.appendChild(script);
}

function init() {
    if (typeof (MCS) == 'undefined' || MCS.getPlayerData() == null) {
        //alert("timeout");
        window.setTimeout("init()", 1000);
        return;
    }
    else if (typeof(MCS.getPlayerData()) == 'object' && MCS.getPlayerData() != null) {
        //alert("object");
        loopFunctions();        
        //escPressed();
        fillPressed();
        keyPressed();
    }
}

function loopFunctions() {
if (typeof(MCS.getPlayerData()) == 'object' && MCS.getPlayerData() != null) {
        alert("loop start");
        sortProperty();
        sortBuyStreet();
        buyBuildingLabel();
        //alert(MCS.STREET.getStreetData().id);
        //if (MCS.STREET.getStreetData().id != null) {
        //getLocation(MCS.STREET.getStreetData().id, "7");
        //}
        alert("loop end");
        
        window.setTimeout("loopFunctions()", 3000);
        return;
        }

}

function keyPressed() {
$(window).keydown(function(event){
    alert(event.keyCode);
    if (event.keyCode == "27") {
    //alert(auto);
    alert("esc pressed");
    //auto = new Boolean(false);
    //alert(auto);
    }
    if (auto) {
       alert("auto = true");
    }
    if (!auto) {
       alert("auto = false");
    }
});

}

function escPressed() {
$(document).keydown( function( e ) {
				if (e.which == 27) {
alert(auto);
					alert("esc pressed");
auto = false;
alert(auto);
				}
			});
}

function fillPressed() {
$('div.dialog.build ol.clearfix').find("li[class *= 'canBuy'] .autofill span").live("click", function () {
    var type = $(this).parents('li').attr('_type');
    alert(type);
    return false;
});
}

function sortProperty() {
var dlg = $('div.dialog.property');
        var stlist = dlg.find('div.table');
        var length = stlist.find('table tr:visible').length;
        var $table = stlist.find('table');
        
        if (length > 0) {
        var rows = $table.find('tbody > tr').get();
        
        $.each(rows, function(index,row) {			

row.sortKey = $(row).children('td').text().replace(/[^0-9]/ig,"");

row.sortKey = parseInt(row.sortKey);
		});
        rows.sort(function(a, b) {
			var ret = (a.sortKey > b.sortKey) ? 1 : ((a.sortKey < b.sortKey) ? -1 : 0);
			// order flip
			if (ret != 0) { ret = (ret == 1) ? -1 : 1; }
			return ret;
		});
$.each(rows, function(index,row) {
			$table.children('tbody').append(row);
			row.sortKey = null;
		});

        }
//alert("END sort property()");
}

function sortBuyStreet() {
var dlg = $('div.dialog.buy');
        var stlist = dlg.find('div.street-list');
        var length = stlist.find('table tr:visible').length;
        var $table = stlist.find('table');
        if (length > 0) {
        var rows = $table.find('tbody > tr').get();
        $.each(rows, function(index,row) {			
row.sortKey = $(row).children('td').text().replace(/[^0-9]/ig,"");
row.sortKey = parseInt(row.sortKey);
		});
        rows.sort(function(a, b) {
			var ret = (a.sortKey > b.sortKey) ? 1 : ((a.sortKey < b.sortKey) ? -1 : 0);
			// order flip
			if (ret != 0) { ret = (ret == 1) ? -1 : 1; }
			return ret;
		});
$.each(rows, function(index,row) {
			$table.children('tbody').append(row);
			row.sortKey = null;
		});

        }
//alert("END sortBuyStreet()");
}

function buyBuildingLabel() {
alert("buyBuildingLabel()");
//alert($('div.dialog.build').find('p.autofill').length);
if ($('div.dialog.build').find('p.autofill').length == 0) {
$('div.dialog.build ol.clearfix').find("li[class *= 'canBuy']").each(function() {
			$(this).append('<p class="autofill">Fill: <span class="all" title="all">all</span></p>');
		});
}
alert("END buyBuildingLabel()");
}

function buildAll(streetId,buildingType) {
alert("buildAll()");
$.ajax({
			url: "/build/getlocations",
			cache: false,
			data: {
				id: streetId,
				type: buildingType
			},
			dataType: "json",
			complete: MCS.LOADING.hide,
			success: function (data, status) {
                                alert("success");
				var found = false;
				$.each(data, function (foo, point) {
					if (point && !found) {
						// only 1st pos
						found = true;
						var split = point.split("/");
						var lat = parseInt(split[0]) / MCS.intToFloat;
						var lng = parseInt(split[1]) / MCS.intToFloat;
						
						MCS.map().setCenter(new google.maps.LatLng(lat, lng), MCS.zoomLevels.STREET);
						
					}
				});
			}
		});
}


function buyBuilding(streetId, buildingType, location)
	{
		
		if (!autofillrun) {
			return;
		}
		var player = MCS.getPlayerData();		

		$.ajax({
			url: "/negotiate/buybuilding",
			type: "post",
			data: {
				nickname: player.nickname,
				hash: player.hash,
				id: streetId,
				type: buildingType,
				loc: location
			},
			dataType: "json",
			complete: MCS.LOADING.hide,
			success: function (data, status) {
						
				MCS.ALERT.hide();
				
				player.balance -= parseInt(MCS.buildings[buildingType].price);
				MCS.STATUSBAR.redraw();
				MCS.DIALOG.hide("build-confirm");
				if (data.c) {
					
					MCS.CHANCE.take(data.c, streetId);
				} else {
					MCS.STREET.show(streetId, null, false, false);
				}
				
			}
		});
	}


addInlineJavascript(addJavascript);
addInlineJavascript(keyPressed);
addInlineJavascript(buyBuilding);
addInlineJavascript(sortProperty);
addInlineJavascript(sortBuyStreet);
addInlineJavascript(buildAll);
addInlineJavascript(loopFunctions);
addInlineJavascript(escPressed);
addInlineJavascript(fillPressed);
addInlineJavascript(buyBuildingLabel);
addInlineJavascript(init);
init();