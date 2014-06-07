// ==UserScript==
// @name           MH Assignments Tweaker
// @description    Add mice location to assignments
// @author         Dusan Djordjevic
// @include        http://www.mousehuntgame.com/*
// @include        https://www.mousehuntgame.com/*
// @include        http://apps.facebook.com/mousehunt/*
// @include        https://apps.facebook.com/mousehunt/*
// @version        1.00
// @history        1.00 - Initial release
// ==/UserScript==

VERSION = 1.00;

var mice = {
    "Archer Mice": "Training Grounds / SB+",
    "Bark Mice": "Living Garden / Gouda",
    "Bionic Mice": "Town of Digby / SB+ or Brie",
    "Blacksmith Mice": "Muridae Market / SB+ / Artisan",
    "Burglar Mice": "King's Arms / Gilded",
    "Calalilly Mice": "Living Garden / Gouda",
    "Derr Lich Mice": "Balack's Cove / Vengeful Vanilla Stilton",
    "Dojo Senseis": "Pinnacle Chamber / Onyx Gorgonzola",
    "Draconic Warden Mice": "Dracano / Inferno Havarti",
    "Dunehopper Mice": "Lost City / Dewthief Camembert",
    "Effervescent Mice": "Crystal Library / SB+",
    "Elub Lich Mice": "Balack's Cove / Vengeful Vanilla Stilton",
    "Ethereal Enchanter Mice": "Lost City / Dewthief Camembert",
    "Ethereal Engineers": "Lost City / Dewthief Camembert",
    "Ethereal Librarians": "Lost City / Dewthief Camembert",
    "Ethereal Thief Mice": "Lost City / Dewthief Camembert",    
    "Gate Guardian Mice": "Acolyte Realm / Radioactive Blue",
    "Glass Blower Mice": "Muridae Market / SB+ / Artisan",
    "Gorgon Mice": "Acolyte Realm / Ancient",
    "Granite Mice": "Town of Digby / SB+",
    "Keeper Mice": "Catacombs / Ancient / Antiskele",
    "Knight Mice": "King's Gauntlet / Tier 3",
    "Kung Fu Mice": "Training Grounds / SB+",
    "Lambent Crystal Mice": "Town of Digby / Limelight",
    "Lasso Cowgirl Mice": "Claw Shot City / Gouda",
    "Limestone Miner Mice": "Muridae Market / SB+ / Artisan",
    "Lumberjack Mice": "Muridae Market / SB+ / Artisan",
    "Lycan Mice": "Forbidden Grove / Moon",
    "Mage Weaver Mice": "Muridae Market / SB+ / Artisan",
    "Market Guard Mice": "Muridae Market / SB+",
    "Masters Burglar Mice": "Town of Gnawnia / Gilded",
    "Masters of Dojo Mouse": "Pinnacle Chamber / Rumble",
    "Masters of the Cheese Belt Mouse": "Meditation Room / Glutter",
    "Masters of the Cheese Claw Mouse": "Meditation Room / Susheese",
    "Masters of the Cheese Fang Mouse": "Meditation Room / Combat",    
    "Monster Mice": "Laboratory / Radioactive Blue",
    "Mystic Bishop Mice": "Zugzwang's Tower / SB+",
    "Nerg Lich Mice": "Balack's Cove / Vengeful Vanilla Stilton",
    "Page Mice": "King's Gauntlet / Tier 3",
    "Phalanx Mice": "King's Gauntlet / Tier 3",
    "Pie Thief Mice": "Muridae Market / Gouda",
    "Pocketwatch Mice": "Crystal Library / Gouda",
    "Polar Bear Mice": "Iceberg - Bulwark / SB+",
    "Prospector Mice": "Claw Shot City",
    "Pyrite Mice": "Claw Shot City",
    "Quesodillo Mice": "Sand Dunes / Dewthief Camembert",
    "Ravenous Zombie Mice": "Mousoleum / Radioactive Blue",
    "Realm Rippers": "Forbidden Grove / SB+",
    "Ruffian Mice": "Claw Shot City",
    "Saloon Gal Mice": "Claw Shot City",
    "Samurai Mice": "Dojo / Brie",
    "Sand Pilgrims": "Sand Dunes / Dewthief Camembert",
    "Shopkeeper Mice": "Claw Shot City",
    "Shroom Mice": "Living Garden / Gouda",
    "Snow Slinger Mice": "Iceberg - Bulwark / SB+",
    "Snow Soldier Mice": "Slushy Shoreline / SB+",
    "Spiky Devil Mice": "Sand Dunes / Dewthief Camembert",
    "Stealth Mice": "King's Gauntlet / Tier 2",
    "Strawberry Hotcakes Mice": "Living Garden / SB+",
    "Swarm of Pygmy Mice": "Jungle of Dread / Vanilla Stilton",
    "Technic Bishop Mice": "Zugzwang's Tower / SB+",
    "Terra Mice": "King's Gauntlet / Tier 5",
    "Thistle Mice": "Living Garder / Gouda",
    "Tome Sprite Mice": "Crystal Library / SB+",
    "Tumbleweed Mice": "Claw Shot City",
    "Walker Mice": "Crystal Library / SB+",
    "Whelpling Mice": "Dracano / Inferno Havarti ",
    "Zombie Mice": "Mousoleum / Radioactive Blue"
};

var m400 = {
    "a": ["Terror Knight","Ruffian","Protector","Fiery Warpath","Master Burglar - Bazaar","Stonework Warrior","Essence Collector","Realm Rippers","Sorcerer Mice","M400 Acolyte Realm"],
    "b": ["Guardian","Prospector","Mystic","Fiery Warpath","Cavalier","Sand pilgrims","Ethereal Enchanter","Strawberry Hotcakes","Gate Guardian","M400 Balacks Cove"],
    "c": ["Seer","-","Vanquisher","Ninja - Training Grounds","Chipper Mice - Slushy Shoreline","Grubling herder","Ethereal Librarian","Bark","Derr Lich","M400 Bazaar"],
    "d": ["Renegade Mouse","Sand Colossus","Pack Mice","Fiery Warpath","Snow Sniper","Sand Pilgrim","Essence Guardian","Thistle","Elub Lich","M400 Calm Clearing"],
    "e": ["Grunt","Serpentine","Scout","Buccaneer","Snow Slinger - Slushy Shoreline","Grubling Herder","Cursed Librarian","Camoflower Mice","Draconic Warden Mice","M400 in Cape Clawed"],
    "f": ["Trailblazer","Scarab","Master of the Cheese Fang","Captain","Snow Soldier - Slushy Shoreline","Primal","Cursed Enchanter", "Merchant Mice", "Masters of the Dojo","M400 Catacombs"],
    "g": ["Seasonal Garden","Iceberg","Master of the Cheese Belt","-","Yeti - Slushy Shoreline","Magma Carrier","Barkshelll","Blacksmith Mice","Mystic Knight","M400 Claw Shot City"],
    "h": ["Seasonal Garden","-","Master of the Cheese Claw","-","-","-","Thorn Mouse","Market Guard","Technic Knight","M400 Derr Dunes"],
    "i": ["Seasonal Garden","-","Defender Mice","-","-","-","Twisted Hotcakes","Mage Weaver","Bionic Mice","M400 Muridae Market"],
    "j": ["Seasonal Garden","-","Finder","-","-","-","Camofusion","-","Bionic in Meadow","M400 Living Garden"],
    "k": ["Lycan ","-","Conqueror","-","-","-","-","-","Gate Guardian","M400 Fiery Warpath"],
    "l": ["-","-","Conjurer","-","-","-","-","-","-","M400 Dojo"],
    "m": ["-","-","Pathfinder","-","-","-","-","-","-","M400 Dracano"],
    "n": ["-","-","-","-","-","-","-","-","-","M400 Elub Shore"],
    "o": ["-","-","-","-","-","-","-","-","-","M400 Dracano"],
    "p": ["-","-","-","-","-","-","-","-","-","M400 Great Gnarled Tree"],
    "q": ["-","-","-","-","-","-","-","-","-","M400 Harbour"],
    "r": ["-","-","-","-","-","-","-","-","-","M400 Iceberg"],
    "s": ["-","-","-","-","-","-","-","-","-","M400 Jungle of Dread"],
    "t": ["-","-","-","-","-","-","-","-","-","M400 Kins Arms"],
    "u": ["-","-","-","-","-","-","-","-","-","M400 King Gauntlet"],
    "v": ["-","-","-","-","-","-","-","-","-","M400 Labarotory"],
    "w": ["-","-","-","-","-","-","-","-","-","M400 Lagoon"],
    "x": ["-","-","-","-","-","-","-","-","-","M400 Lost City"],
    "y": ["-","-","-","-","-","-","-","-","-","M400 Meadow"],
    "z": ["-","-","-","-","-","-","-","-","-","M400 Meditation Room"],
    "aa": ["-","-","-","-","-","-","-","-","-","M400 Mountain"],
    "ab": ["-","-","-","-","-","-","-","-","-","M400 Mousoleum"],    
    "ac": ["-","-","-","-","-","-","-","-","-","M400 Nerg Plains"],
    "ad": ["-","-","-","-","-","-","-","-","-","M400 Pinnacle Chamber"],
    "ae": ["-","-","-","-","-","-","-","-","-","M400 Sand Dunes"],
    "af": ["-","-","-","-","-","-","-","-","-","M400 Seasonal Garden"],
    "ag": ["-","-","-","-","-","-","-","-","-","M400 Slushy Shorelines"],
    "ah": ["-","-","-","-","-","-","-","-","-","M400 S.S.Huntington III"],
    "ai": ["-","-","-","-","-","-","-","-","-","M400 Tournament Hall"],
    "aj": ["-","-","-","-","-","-","-","-","-","M400 Town Of Digby"],
    "ak": ["-","-","-","-","-","-","-","-","-","M400 Town of Gnawnia"],
    "al": ["-","-","-","-","-","-","-","-","-","M400 Gnawnian Express"],
    "am": ["-","-","-","-","-","-","-","-","-","M400 Training Grounds"],
    "an": ["-","-","-","-","-","-","-","-","-","M400 Windmill"],
    "ao": ["-","-","-","-","-","-","-","-","-","M400 Crystal Library"],
    "ap": ["-","-","-","-","-","-","-","-","-","M400 ZT"]
}

var locationsLoaded = false;
    
var taskButton = document.getElementById('questBar');
taskButton.addEventListener('click', doTask, false);

function doTask() {
    var loaded = (document.getElementsByClassName('questContainer').length == 0) ? false : true;
    
    if(loaded) {
	   prepareLocations();
    } else {
        setTimeout(doTask, 1000);
    }
}

function prepareLocations() {
    var questContainer = document.getElementsByClassName('questContainer')[0],
        miceObjectives = questContainer.getElementsByClassName('objective'),
        secondTask = (miceObjectives.length > 1) ? false : true,
	    re1 = /from (.*?)\</g;

    if(secondTask) {
        getProgress();
    }
    else
    {
        for(var i=0; i<miceObjectives.length; i++) {
            var mouseCollect = miceObjectives[i].getElementsByClassName('content')[0];
            var match1;
            while (match1 = re1.exec(mouseCollect.innerHTML)) {
                var mouseName = match1[1],
                    mouseDesc = mouseCollect.getElementsByClassName('description')[0];
    
                mouseDesc.innerHTML = mice[mouseName];
            }        
        }
    }
}

function getProgress() {
    var protocol = location.protocol,
        dom = location.host,
	    url1 = protocol+'//www.mousehuntgame.com/managers/ajax/users/questsprogress.php',
        url2 = protocol+'//apps.facebook.com/mousehunt/managers/ajax/users/questsprogress.php',
        url = (dom == "www.mousehuntgame.com") ? url1 : url2,
	    request = new XMLHttpRequest();
	
	request.onreadystatechange = function () {
	   if(request.readyState == 4) {
			if(request.status == 200) {
				var result = eval('('+request.responseText+')');
                    tasks = result.progress.library_m400_research_quest_item.progress,
                    mice = '',
                    re1 = /([0-9]+)([a-z]+)/g;
                
                for(task in tasks) {
                   var match1;
                       
                   while (match1 = re1.exec(task)) {
                      var n = parseInt(match1[1])-1,
                          l = match1[2],
                          row = m400[l];
                      
                         for(key in row) {
                             if(key == n) {
                                 c = parseInt(key)+1;
                                 mice = mice + c + '. ' + row[key] + '<br/> ';
                             }
                         }
                   }
                }
                
                var questContainer = document.getElementsByClassName('questContainer')[0],
                    miceObjectives = questContainer.getElementsByClassName('objective')[0],
                    mouseCollect = miceObjectives.getElementsByClassName('content')[0],
                    mouseDesc = mouseCollect.getElementsByClassName('description')[0];
                
                
                mouseDesc.innerHTML = mice;
			}
		}
	}
	
	request.open("GET", url, true);
	request.send();
}
