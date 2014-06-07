// ==UserScript==
// @name           MH Maps Tweaker
// @description    Rearrange mice in the map
// @author         Dusan Djordjevic
// @include        http://www.mousehuntgame.com/*
// @include        https://www.mousehuntgame.com/*
// @include        http://apps.facebook.com/mousehunt/*
// @include        https://apps.facebook.com/mousehunt/*
// @version        1.12
// @history        1.10 - No need to update script when new mice are out
// @history        1.00 - Initial release
// ==/UserScript==

VERSION = 1.12;

getLocations();

var LOCATIONS = {
    "Meadow": ["Field Mouse", "Flying Mouse", "Spotted Mouse", "Tiny Mouse"],
    "Town of Gnawnia": ["Brown Mouse", "Cowardly Mouse", "Dwarf Mouse", "Grey Mouse", "Master Burglar Mouse", "Nibbler Mouse", "White Mouse"],
    "Windmill": ["Spud Mouse"],
    "Harbour": ["Magic Mouse", "Pirate Mouse"],
    "Mountain": ["Black Widow Mouse", "Diamond Mouse", "Gold Mouse", "Silvertail Mouse"],
    "Slushy Shoreline": ["Living Ice Mouse", "Yeti Mouse"],
    "King\'s Arms": [],
    "Tournament Hall": ["Lightning Rod Mouse"],
    "King\'s Gauntlet": [],
    "Calm Clearing": ["Bear Mouse", "Frog Mouse", "Moosker Mouse"],
    "Great Gnarled Tree": [],
    "Lagoon": ["Centaur Mouse", "Elven Princess Mouse", "Hydra Mouse", "Nomad Mouse", "Tiger Mouse"],
    "Claw Shot City": [],
    "Laboratory": ["Monster Mouse", "Steel Mouse"],
    "Town of Digby": ["Bionic Mouse", "Granite Mouse", "Zombie Mouse"],
    "Mousoleum": ["Bat Mouse", "Mummy Mouse", "Ravenous Zombie Mouse"],
    "Bazaar": ["Burglar Mouse"],
    "Training Grounds": ["Monk Mouse", "Ninja Mouse", "Worker Mouse"],
    "Dojo": ["Assassin Mouse", "Student of the Cheese Belt Mouse", "Student of the Cheese Claw Mouse", "Student of the Cheese Fang Mouse"],
    "Meditation Room": ["Hapless Mouse", "Master of the Cheese Belt Mouse", "Master of the Cheese Claw Mouse", "Master of the Cheese Fang Mouse"],
    "Pinnacle Chamber": ["Dojo Sensei", "Master of the Dojo Mouse"],
    "Catacombs": ["Giant Snail Mouse", "Keeper Mouse", "Ooze Mouse", "Scavenger Mouse", "Terror Knight Mouse"],
    "Forbidden Grove": ["Lycan Mouse", "Mutated Grey Mouse", "Mutated White Mouse", "Realm Ripper", "Vampire Mouse"],
    "Acolyte Realm": ["Acolyte Mouse", "Lich Mouse"],
    "S.S. Huntington III": ["Briegull Mouse", "Siren Mouse", "Swabbie Mouse", "Mermouse"],
    "Seasonal Garden": ["Harvest Harrier Mouse", "Icicle Mouse", "Puddlemancer Mouse", "Stinger Mouse"],
    "Zugzwang\'s Tower": ["Chess Master", "Mystic Bishop Mouse", "Mystic King Mouse", "Mystic Rook Mouse", "Technic Bishop Mouse", "Technic King Mouse", "Technic Rook Mouse"],
    "Crystal Library": ["Aether Mouse", "Effervescent Mouse", "Flutterby Mouse", "Infiltrator Mouse", "Pocketwatch Mouse", "Walker Mouse"],
    "Iceberg": ["Chipper Mouse", "General Drheller", "Iceblade Mouse", "Lady Coldsnap", "Living Salt Mouse", "Lord Splodington", "Polar Bear Mouse", "Princess Fist", "Snow Slinger Mouse", "Stickybomber Mouse"],
    "Cape Clawed": ["Aged Mouse"],
    "Elub Shore": ["Elub Chieftain Mouse", "Mystic Mouse", "Pinchy Mouse", "Soothsayer Mouse"],
    "Nerg Plains": ["Chameleon Mouse", "Conjurer Mouse", "Conqueror Mouse", "Nerg Chieftain Mouse"],
    "Derr Dunes": ["Derr Chieftain Mouse", "Mintaka Mouse", "Seer Mouse"],
    "Jungle of Dread": ["Chitinous Mouse", "Fetid Swamp Mouse", "Jurassic Mouse", "Magma Carrier Mouse", "Primal Mouse", "Pygmy Wrangler Mouse", "Stonework Warrior Mouse", "Swarm of Pygmy Mice", "Sylvan Mouse"],
    "Dracano": [],
    "Balack\'s Cove": ["Balack the Banished", "Brimstone Mouse", "Derr Lich Mouse", "Elub Lich Mouse", "Nerg Lich Mouse", "Riptide Mouse", "Twisted Fiend Mouse"],
    "Fiery Warpath": ["Magmarage Mouse", "Sand Cavalry Mouse"],
    "Muridae Market": ["Blacksmith Mouse", "Desert Architect Mouse", "Falling Carpet Mouse", "Mage Weaver Mouse", "Pie Thief Mouse", "Snake Charmer Mouse", "Spice Merchant Mouse"],
    "Living Garden": ["Thirsty Mouse", "Thistle Mouse", "Strawberry Hotcakes Mouse", "Bark Mouse", "Calalilly Mouse", "Shroom Mouse", "Camoflower Mouse", "Carmine the Apothecary"],
    "Lost City": ["Cursed Mouse", "Essence Collector Mouse", "Ethereal Enchanter Mouse", "Ethereal Engineer", "Ethereal Librarian", "Ethereal Thief Mouse"],
    "Sand Dunes": ["Dunehopper Mouse", "Grubling Mouse", "Grubling Herder Mouse", "Quesodillo Mouse", "Sand Pilgrim", "Spiky Devil Mouse"],
    "Twisted Garden": ["Dehydrated Mouse", "Thorn Mouse", "Twisted Hotcakes Mouse", "Barkshell Mouse", "Twisted Lilly Mouse", "Fungal Spore Mouse", "Camofusion Mouse", "Twisted Carmine"],
    "Cursed City": ["Essence Guardian Mouse", "Cursed Enchanter Mouse", "Corrupt Mouse", "Cursed Engineer Mouse", "Cursed Thief Mouse", "Cursed Librarian Mouse"],
    "Sand Crypts": ["Sarcophamouse", "Sand Colossus Mouse", "Serpentine Mouse", "Scarab Mouse", "King Grub Mouse"],
    "Festive Snow Fort": ["Snowflake Mouse", "Nutcracker Mouse", "Candy Cane Mouse", "Snow Scavenger", "Snowglobe Mouse", "Ridiculous Sweater Mouse", "Triple Lutz Mouse", "Destructoy Mouse", "Snowblower Mouse", "Elf Mouse", "Missile Toe Mouse", "Wreath Thief Mouse", "Snow Fort Mouse", "Stocking Mouse"]
};
    
var miceRows = {},
    miceMap = [],
    miceOrdered = '',
    remainingMice = '',
    locationsLoaded = false;
    
var mapButton = document.getElementById('hudmapitem');
mapButton.addEventListener('click', doMap, false);

function doMap() {
    var loaded = (document.getElementsByClassName('mouseRow').length == 0) ? false : true;
    
    if(loaded && locationsLoaded) {
        prepareMice();
        rearrangeMice();
    } else {
        setTimeout(doMap, 1000);
    }
}

function prepareMice() {
    var miceContainer = document.getElementsByClassName('miceContainer')[0],
        miceRowsElements = miceContainer.getElementsByClassName('mouseRow'),
        miceGroupFirst = miceContainer.getElementsByClassName('miceGroup')[0],
        miceMapUncaugth = miceGroupFirst.getElementsByClassName('mouseRow');

    miceRows = {};
    miceMap = [];
    
    for(var i=0; i<miceMapUncaugth.length; i++) {
        var mouseUncaughtElement = miceMapUncaugth[i],
            mouseName = mouseUncaughtElement.getElementsByClassName('name')[0].title;    
        miceRows[mouseName] = mouseUncaughtElement.innerHTML;
        miceMap.push(mouseName);
    }
    
    miceOrdered = '';
    remainingMice = '';
}
    
function rearrangeMice() {
    for(loc in LOCATIONS) {
        var mice = LOCATIONS[loc], miceList = '';
        for(key in mice) {
            var mouse = mice[key];
            if(arrayContains(miceMap, mouse)) {
                var mouseHtml = miceRows[mouse],
                    index = miceMap.indexOf(mouse);
                miceList += '<div class="mouseRow">'+mouseHtml+'</div>';
                miceMap.splice(index, 1); 
            }       
        }
        if(miceList.length > 0) {
            miceOrdered += '<div class="miceGroupTitle">'+loc+'</div>'+miceList;
        }    
    }
    
    for(var i=0; i<miceMap.length; i++) {
        var mouse = miceMap[i];
        remainingMice += '<div class="mouseRow">'+miceRows[mouse]+'</div>';
    }
    
    if(remainingMice != '') {
        miceOrdered += '<div class="miceGroupTitle">Uncaught Mice</div>'+remainingMice;
    }

    var firstMiceGroup = document.getElementsByClassName('miceGroup')[0];
    firstMiceGroup.innerHTML = miceOrdered;
}

function arrayContains(a, obj) { 
    var i = a.length; 
    while(i--) { 
       if(a[i] === obj) { 
           return true; 
       } 
    } 
    return false; 
}

function getLocations() {
    var protocol = location.protocol,
	    url = protocol+'//igrajtenis.net/mousehunt/maps_tweaker.php',
	    request = new XMLHttpRequest();
	
	request.onreadystatechange = function () {
	   if(request.readyState == 4) {
			if(request.status == 200) {
				var result = eval('('+request.responseText+')');
				if(result.status == 'ok') {
					LOCATIONS = result.data;
				}				
			}
			locationsLoaded = true;
		}
	}
	
	request.open("GET", url, true);
	request.send();
}
