// ==UserScript==
// @name           Load Planet Data
// @description    Load planet data from a planets.nu VGA Planets game into the tax/happiness calculator.
// @namespace      http://userscripts.org/users/oliphaunt
// @include        http*://*vgaplanets.ca/vgapcalc.php*
// @copyright      2011-2012, Léon Planken (http://userscripts.org/users/oliphaunt)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        0.7
// ==/UserScript==

/*******************
 Version History

 Version 0.7 (2012/05/16):
   Adapt to new version of planets.nu API.  Also some nicer error handling.
 Version 0.6 (2011/12/23):
   Remove form with submit method, detect enter with keyup instead
 Version 0.5 (2011/12/23):
   Change @include pattern to also include http://vgaplanets.ca
 Version 0.4 (2011/12/23):
   Add link for switching games
   Add version history
 Version 0.3 (2011/12/23):
   Now also works in Chrome (added init() function)
 Version 0.2 (2011/12/23):
   Can log in and select game ID through interface
 Version 0.1 (2011/12/23):
   First alpha version; API key and game ID added in script source
*******************/

/*******************
 Wishlist

 - offer a list of all available games
 - automatically find hissing ships
 - search for planets by name or ID
*******************/

// ** variables

const VERSION = '0.7'
const USERAGENT = 'LoadPlanetData/' + VERSION;

var planetData   = [];
var mygameid     = null;
var myraceid     = -1;
var myplayerid   = -1;

var LPD_div      = null;
var planetSelect = null;
var userbox      = null;
var passbox      = null;
var gamebox      = null;



// ** MAIN begin

if ( add_LPD_div() ) {
    init();

    if ( GM_getValue('apikey') == undefined ) {
	showKeyRetrieve();
    } else {
	showGameSelect();
    }
}
return;

// ** MAIN end



// ** functions that modify the page

function add_LPD_div() {
    var anchor = document.getElementsByName('taxhappy');
    if ( anchor.length != 1 ) {
	return false;
    }
    var node = anchor[0];

    while ( node != null && (node.tagName == undefined || node.tagName.toLowerCase() != 'table') ) {
	    node = node.nextSibling;
    }
    if ( node == null ) {
	return false;
    }

    LPD_div = document.createElement('div');
    LPD_div.style.border="black solid 2px";
    LPD_div.style.background="#CFF";
    LPD_div.style.width="50ex";
    LPD_div.style.padding="1em";
    LPD_div.style.paddingLeft="2em";
    node.parentNode.insertBefore(LPD_div,node);

    return true;
}

function switchGame() {
    planetData = [];
    mygameid     = null;
    myraceid     = -1;
    myplayerid   = -1;

    showGameSelect();
}

function addPlanetSelect() {
    clearDiv();

    planetSelect = document.createElement('select');
    planetSelect.style.margin='1ex';
    switchLink = document.createElement('a');
    switchLink.appendChild(document.createTextNode('Switch game'));
    switchLink.addEventListener('click',function(){ switchGame(); return false; },false);
    switchLink.style.color='blue';
    switchLink.style.textDecoration='underline';
    switchLink.style.fontSize='smaller';
    switchLink.style.cursor='pointer';

    LPD_div.appendChild(document.createTextNode('Select planet: '));
    LPD_div.appendChild(planetSelect);
    LPD_div.appendChild(switchLink);
}

function showKeyRetrieve() {
    clearDiv();
    LPD_div.appendChild(document.createTextNode('Please enter your planets.nu credentials.'));
    LPD_div.appendChild(document.createElement('br'));

    userbox = document.createElement('input');
    userbox.type='text';
    userbox.style.width ='15ex';
    userbox.style.margin='1ex';
    handleEnter(userbox,login);

    passbox = document.createElement('input');
    passbox.type='password';
    passbox.style.width ='15ex';
    passbox.style.margin='1ex';
    handleEnter(passbox,login);

    button = document.createElement('input');
    button.type='button';
    button.value='Go';
    button.addEventListener('click',login,false);

    LPD_div.appendChild(document.createTextNode('User:'));
    LPD_div.appendChild(userbox);
    LPD_div.appendChild(document.createTextNode('Pass:'));
    LPD_div.appendChild(passbox);
    LPD_div.appendChild(button);
}

function showGameSelect() {
    clearDiv();
    LPD_div.appendChild(document.createTextNode('Please enter the planets.nu game ID.'));
    LPD_div.appendChild(document.createElement('br'));

    gamebox = document.createElement('input');
    gamebox.type='text';
    gamebox.style.width ='15ex';
    gamebox.style.margin='1ex';
    handleEnter(gamebox,loadGame);

    button = document.createElement('input');
    button.type='button';
    button.value='Go';
    button.addEventListener('click',loadGame,false);

    LPD_div.appendChild(document.createTextNode('Game ID:'));
    LPD_div.appendChild(gamebox);
    LPD_div.appendChild(button);
}

function showLoading() {
    clearDiv();
    LPD_div.appendChild(document.createTextNode('Loading planet data...'));
}

function clearDiv() {
    if ( LPD_div.hasChildNodes() ) {
	while ( LPD_div.childNodes.length >= 1 ) {
	    LPD_div.removeChild( LPD_div.firstChild );
	}
    }
}



// ** accessing planets.nu API

function login() {
    if ( !userbox || !passbox ) return;

    var url = 'http://api.planets.nu/login';

    var user = userbox.value;
    var pass = passbox.value;
    var query = 'username=' + user + '&password=' + pass;

    GM_xmlhttpRequest({
      method: "POST",
      url: url,
      data: query,
      headers: {
	    "User-Agent": USERAGENT,
	    "Content-Type": "application/x-www-form-urlencoded"
      },
      onload: function(response) {
	  var done = 4, ok = 200;
	  if ( isError(response.responseText) ) {
	      alert(response.responseText);
	  } else if ( response.readyState == done && response.status == ok) {
	      try {
		  var loginResult = JSON.parse(response.responseText);
		  if ( !loginResult.success ) {
		      alert('login failure');
		  } else {
		      GM_setValue('apikey',loginResult.apikey);
		      showGameSelect();
		  }
	      } catch(e) {
		  alert("couldn't parse planets.nu response");
	      }
	  }
      }
    });
}

function loadGame() {
    if ( !gamebox ) return;

    showLoading();

    var url = 'http://api.planets.nu/game/loadturn';
    var query = 'gameid=' + gamebox.value + '&apikey=' + GM_getValue('apikey');
    url = url + '?' + query;

    GM_xmlhttpRequest({
	method: "GET",
	url: url,
	headers: {
	    "User-Agent": USERAGENT
	},
	onload: function(response) {
	    var done = 4, ok = 200;
	    if ( response.readyState == done && response.status == ok) {
		if ( isError(response.responseText) ) {
		    errormsg();
		    return;
		}
		try {
		    var turndata = JSON.parse(response.responseText);
		    if ( !turndata || !turndata.success || !turndata.rst ) {
			alert("couldn't retrieve turn data");
			showGameSelect();
			return;
		    }
		    myraceid   = turndata.rst.player.raceid;
		    myplayerid = turndata.rst.player.id;
		    planetData = turndata.rst.planets;
		    listPlanets();
		} catch(e) {
		    alert("Couldn't parse planets.nu response.\nWas the game ID you entered correct?");
		    showGameSelect();
		    return;
		}
	    } else {
		errormsg();
	    }
	}
    });
}



// ** filling the planet selection box

function listPlanets() {
    addPlanetSelect();
    for ( var i = 0; i < planetData.length; ++i ) {
	var planet = planetData[i];
	if ( planet.ownerid == myplayerid ) {
	    var option = document.createElement('option');
	    option.value=i;
	    option.appendChild(document.createTextNode('#'+planet.id + ' ' + planet.name));
	    planetSelect.appendChild(option);
	}
    }
    planetSelect.addEventListener('change',fillFields,false);
    planetSelect.addEventListener('keyup',fillFields,false);
    fillFields();
}



// ** updating vgapcalc fields

function fillFields() {
    var id = planetSelect.value;
    var planet = planetData[id];
    if ( planet.temp < 0 ) return;

    setField('planet_colonist_race',
	    myraceid);
    setField('planet_temperature',
	    planet.temp);
    setField('planet_mines',
	    planet.mines);
    setField('planet_factories',
	    planet.factories);
    setField('planet_defense',
	    planet.defense);
    // TODO hissing ships
    setField('planet_supplies',
	    planet.supplies);
    setField('planet_mc',
	    planet.megacredits);

    setField('planet_colonist_population',
	    planet.clans);
    setField('planet_colonist_tax',
	    planet.colonisttaxrate);
    setField('planet_colonist_happiness',
	    planet.colonisthappypoints);

    if ( planet.nativeclans > 0 ) {
	setField('planet_native_race',
		planet.nativeracename);
	setField('planet_native_population',
		planet.nativeclans);
	setField('planet_native_tax',
		planet.nativetaxrate);
	setField('planet_native_happiness',
		planet.nativehappypoints);
	setField('planet_native_government',
		planet.nativegovernment);
    } else {
	setField('planet_native_race',
		'none');
    }

    triggerUpdate();
}

function setField(name,value) {
    var field = document.getElementsByName(name);
    if ( field.length != 1 ) return;
    field=field[0];

    field.value = value;
}

function triggerUpdate() {
    var fields = document.getElementsByName('planet_temperature');
    if ( fields.length != 1 ) return;

    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("keyup", true, true);
    fields[0].dispatchEvent(evt);
}



// ** utility functions

function init() {
    // provide persistent data storage for Chrome
    // source: http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
    if (
	    !this.GM_getValue ||
	    (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)
    ) {
        this.GM_getValue=function (key,def) {
	        return localStorage[key] || def;
        };
        this.GM_setValue=function (key,value) {
	        return localStorage[key]=value;
        };
        this.GM_deleteValue=function (key) {
	        return delete localStorage[key];
        };
    }
}

function isError(responseText) {
    return (responseText.indexOf('Error') == 0);
}

function errormsg() {
    alert('something went wrong getting game data.  sorry.');
}

function handleEnter(textbox,func) {
    textbox.addEventListener('keyup',function(event){ if ( event.which == 13 ) func(); },false);
}
