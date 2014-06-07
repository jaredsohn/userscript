// ==UserScript==
// @name           Ikariam Empire Finder
// @namespace      http://userscripts.org/scripts/show/67724
// @description    Allows you to easily locate all cities owned by a given player (that you know about) when browsing the island screen.  Ever had the experience that you just know you've seen another town of that player's, but can't find it again.  This script solves that problem.
//
// @include        http://s*.ikariam.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/88158.user.js
// @require        http://userscripts.org/scripts/source/94662.user.js
//
// @version 0.04
//
// @history 0.04   Updated to no longer use PhasmaExMachina scripts (because of delete-city hack done to his/her scripts).
// @history 0.03   Fixed a bug that prevented working in some versions of firefox due to String.trim
// @history 0.02   Working version.
// @history	0.01   Initial version.
// ==/UserScript==

ScriptUpdater.check(67724, '0.04')

config = {
  debug: true
};

String.prototype.trim = function () {
  return $.trim(this);
}

// We don't need to init IkaTools because we only need access to its "static" methods.
// This makes things a little faster, since it won't try to record city/building/military data.
  
function curry(f) {
  var args = [].slice.call(arguments, 1);
  return function () {
    return f.apply(this, args.concat([].slice.call(arguments, 0)));
  };
}
  
function curry_scope(f, scope) {
  var args = [].slice.call(arguments, 2);
  return function () {
    return f.apply(scope, args.concat([].slice.call(arguments, 0)));
  };
}

function debug(message) {
  if (config.debug && unsafeWindow.console) {
    if (typeof(message) == 'string') {
        unsafeWindow.console.log('IEF: ' + message);
    } else {
        unsafeWindow.console.log(message);
    }
  }
}

IkariamEmpireFinder = function() {
	debug('Starting IEF, view=' + IkaTools.getView());
	this.registerStyles();
	this.loadData();
	this.updateData();
	this.updateDisplay();
};

IkariamEmpireFinder.prototype.registerStyles = function() {
    // Not really related, just makes the Player: label look better
    GM_addStyle('#information .owner .textLabel { margin-top: 4px; }');
    
    // Old-style for floating divs in map view
    //GM_addStyle('.cityLocation:hover .IEF_empire_view { display: block; }');
    //GM_addStyle('.cityLocation .IEF_empire_view { background-color: white; border: 2px solid black; display: none; position: absolute; top: 50px; left: -30px; z-index: 750; padding: 2px;}');
    //GM_addStyle('.cityLocation .IEF_empire_view h4 { white-space: nowrap }');
    //GM_addStyle('.cityLocation .IEF_empire_view .city_entry { white-space: nowrap }');
    //GM_addStyle('.cityLocation .IEF_empire_view li { white-space: nowrap }');
};

IkariamEmpireFinder.prototype.loadData = function() {
	this.islands = IkaTools.getVal('islands_db', true) || { version: 1 };
	this.empires = IkaTools.getVal('empire_db', true) || { version: 1 };
	this.cities = IkaTools.getVal('cities_db', true) || { version: 1 };
	debug('islands_db ' + this.islands + " cities" + this.cities);
};

IkariamEmpireFinder.prototype.saveData = function() {
    IkaTools.setVal('islands_db', this.islands, true);
    IkaTools.setVal('empire_db', this.empires, true);
    IkaTools.setVal('cities_db', this.cities, true);
};

IkariamEmpireFinder.prototype.updateData = function() {
    //window.setTimeout(curry_scope(this.doUpdateData, this), 0);
    this.doUpdateData();
};

IkariamEmpireFinder.prototype.doUpdateData = function() {
	start = new Date();
    if (IkaTools.getView() == 'island') {
	    var nameAndLocation = $('#breadcrumbs span.island').html();
	    var islandName = nameAndLocation.split('[')[0]
	    var islandLocation = nameAndLocation.split('[')[1].split(']')[0];
	    var islandX = parseInt(islandLocation.split(':')[0]);
	    var islandY = parseInt(islandLocation.split(':')[1]);
	    // islands are identified by an id of their coordinates, since there is no way to consistently
	    // get the island id from the page.  (It can be found in the mill/mine, but only if you have a 
	    // colony on the island, or from colonization spots, but only if some spots are available.)
	    var islandId = parseInt($('.espionage:first a:first').attr('href').split('islandId=')[1])
	    
	    var cityNodes = $('#cities li.city');
		
	    debug('Updating island: ' + islandId + ', name=' + islandName + ', islandX=' + islandX + ', islandY=' + islandY);
	    
	    var islandInfo = {
	       id: islandId,
	       name: islandName,
	       locationX: islandX,
	       locationY: islandY,
	       cities: {},
	       lastUpdate: new Date().getTime()
	    };
		
		cities = this.cities;
		var empires = this.empires;
	    cityNodes.each(function() {
                debug('name field: ' + $('.cityinfo .name:eq(0)', this).text());
		    var name = $('.cityinfo .name:eq(0)', this).text().split(':')[1].trim();
		    var level = parseInt($('.cityinfo .citylevel', this).text().split(':')[1].trim());
		    var player = $('.cityinfo .owner', this).text().split(':')[1].trim();
		    var position = parseInt($(this).attr('id').substring(12)); // remove cityLocation from start of id to get position
		    var cityId = parseInt($('a:eq(0)', this).attr('id').substring(5)); // remove city_ from start of id to get city id
			
		    var playerIdNode = $('.cityinfo .owner .messageSend', this);
		    if (playerIdNode.length) {
		    	var playerIdHref = playerIdNode.attr('href');
		    	var playerId = parseInt(playerIdHref.split('&receiverId=')[1]);
		    } else {
		    	// If not found, its one of our own cities.
			    playerId = -1;
		    }
			
			var cityInfo = {
			    id: cityId,
			    islandId: islandId,
			    name: name,
			    level: level,
			    playerName: player,
			    playerId: playerId,
			    position: position,
			};
			
			islandInfo.cities[position] = cityId;
			cities[cityId] = cityInfo;
			var empire = empires[playerId];
			if (!empire) {
			    empire = { cityIds: {}};
			    empires[playerId] = empire;
			}
			empire.cityIds[cityId] = cityId;
			
		    debug('Updating city: id=' + cityId + ', name=' + name + ', level=' + level + ', player=' + player + ", playerid=" + playerId + ", position=" + position);
	    });
	    
	    this.islands[islandId] = islandInfo;
	    this.saveData();
	    debug('Finishing data update, time elapsed ' + (new Date() - start));
    }
};
IkariamEmpireFinder.prototype.updateDisplay = function() {
    start = new Date();
    if (IkaTools.getView() == 'island') {
        var cityNodes = $('#cities li.city');
        var self = this;
        cityNodes.each(function() {
            var cityId = $('a:eq(0)', this).attr('id').substring(5); // remove city_ from start of id to get city id
            self.updateDisplayForCity($('.cityinfo', this), cityId);
        });
        
        // Directed to a specific city.  Update initially visible city info.
        $('#information .cityinfo').each( function() { 
            var cityId = document.location.href.match(/[&?]cityId=(\d+)/i)[1];
            self.updateDisplayForCity($(this), cityId);
        });
    }
    debug('Finishing display update, time elapsed ' + (new Date() - start));
};

IkariamEmpireFinder.prototype.updateDisplayForCity = function(cityInfoNode, cityId) {
    var playerIdNode = $('.owner .messageSend', cityInfoNode);
    debug("Showing empire for " + cityId);
    
    if (playerIdNode.length) {
    	var playerIdHref = playerIdNode.attr('href');
    	var playerId = playerIdHref.split('&receiverId=')[1];
    } else {
    	// If not found, its one of our own cities.
	    playerId = -1;
    }
    
    var empire = this.empires[playerId];
    
//    debug("Empire is : ");
//    debug(empire.cityIds);
    
    var empireViewDiv = $('<li class="IEF_empire_view"><h4>Empire:</h4></div>');
    var citiesList = $('<ul class="IEF_empire_list"></ul>');
    
    var empireCity;
    var empireCityIsland;
    var added = false;
    for (empireCityId in empire.cityIds) {
        if (empireCityId != cityId) {
            added = true;
            debug("Adding " + empireCityId + " to empire " + playerId);
            empireCity = this.cities[empireCityId];
            debug("Island id: " + empireCity.islandId);
            empireCityIsland = this.islands[empireCity.islandId];
            citiesList.append($('<li><a href="/index.php?view=island&cityId=' + empireCity.id + '>' + 
                empireCity.name + ' [' + empireCityIsland.locationX + ':' + empireCityIsland.locationY + ']' + '</a></li>'));
        }
    }
    if (!added) {
        citiesList.append($('<li>-No other cities known-</li>'));
    }
    
    empireViewDiv.append(citiesList);
    cityInfoNode.append(empireViewDiv);
};

new IkariamEmpireFinder();