// ==UserScript==
// @name        better_esomap
// @namespace   com
// @include     http://tamrielfoundry.com/map*
// @version     1
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require		http://www.rodinger.me/teso/js/jquery.cookie.js
// ==/UserScript==

var cfg = {
	activeShard: 'http://www.rodinger.me/teso/img/skyshard_green.png',
	inActiveShard: 'http://www.rodinger.me/teso/img/skyshard_red.png'
};

// Local Storge DB
function localStorageDB(e,t){function a(){delete o[r];s=null}function f(){var e=0;for(var t in s.tables){if(s.tables.hasOwnProperty(t)){e++}}return e}function l(e){return s.tables[e].fields}function c(e){return s.tables[e]?true:false}function h(e){if(!c(e)){L("The table '"+e+"' does not exist.")}}function p(e,t){var n=false;var r=s.tables[e].fields;for(var i in r){if(r[i]==t){n=true;break}}return n}function d(e,t){s.tables[e]={fields:t,auto_increment:1};s.data[e]={}}function v(e){delete s.tables[e];delete s.data[e]}function m(e){s.tables[e].auto_increment=1;s.data[e]={}}function g(e,t,n){s.tables[e].fields=s.tables[e].fields.concat(t);if(typeof n!="undefined"){for(var r in s.data[e]){if(!s.data[e].hasOwnProperty(r)){continue}for(var i in t){if(typeof n=="object")s.data[e][r][t[i]]=n[t[i]];else s.data[e][r][t[i]]=n}}}}function y(e){var t=0;for(var n in s.data[e]){if(s.data[e].hasOwnProperty(n)){t++}}return t}function b(e,t){t.ID=s.tables[e].auto_increment;s.data[e][s.tables[e].auto_increment]=t;s.tables[e].auto_increment++;return t.ID}function w(e,t){var n=null,r=[],i=null;for(var o=0;o<t.length;o++){n=t[o];i=s.data[e][n];r.push(A(i))}return r}function E(e,t,n,r){var i=[],o=false,u=null;start_n=0;for(var a in s.data[e]){if(!s.data[e].hasOwnProperty(a)){continue}u=s.data[e][a];o=true;for(var f in t){if(!t.hasOwnProperty(f)){continue}if(typeof t[f]=="string"){if(u[f].toString().toLowerCase()!=t[f].toString().toLowerCase()){o=false;break}}else{if(u[f]!=t[f]){o=false;break}}}if(o){if(typeof r==="number"&&start_n<r){start_n++;continue}i.push(a)}if(i.length==n){break}}return i}function S(e,t,n,r){var i=[],o=false,u=null,a=0;for(var f in s.data[e]){if(!s.data[e].hasOwnProperty(f)){continue}u=s.data[e][f];if(t(A(u))==true){if(typeof r==="number"&&a<r){a++;continue}i.push(f)}if(i.length==n){break}}return i}function x(e,t,n){var r=[],i=0;for(var o in s.data[e]){if(s.data[e].hasOwnProperty(o)){if(typeof n==="number"&&i<n){i++;continue}r.push(o);if(r.length==t){break}}}return r}function T(e,t){for(var n=0;n<t.length;n++){if(s.data[e].hasOwnProperty(t[n])){delete s.data[e][t[n]]}}return t.length}function N(e,t,n){var r="",i=0;for(var o=0;o<t.length;o++){r=t[o];var u=n(A(s.data[e][r]));if(u){delete u["ID"];var a=s.data[e][r];for(var f in u){if(u.hasOwnProperty(f)){a[f]=u[f]}}s.data[e][r]=M(e,a);i++}}return i}function C(){try{o[r]=JSON.stringify(s);return true}catch(e){return false}}function k(){return JSON.stringify(s)}function L(e){throw new Error(e)}function A(e){var t={};for(var n in e){if(e.hasOwnProperty(n)){t[n]=e[n]}}return t}function O(e){return e.toString().match(/[^a-z_0-9]/ig)?false:true}function M(e,t){var n="",r={};for(var i=0;i<s.tables[e].fields.length;i++){n=s.tables[e].fields[i];if(t[n]!==null&&t[n]!==undefined){r[n]=t[n]}}return r}function _(e,t){var n="",r={};for(var i=0;i<s.tables[e].fields.length;i++){n=s.tables[e].fields[i];r[n]=t[n]===null||t[n]===undefined?null:t[n]}return r}var n="db_",r=n+e,i=false,s=null;try{var o=t==sessionStorage?sessionStorage:localStorage}catch(u){var o=t}s=o[r];if(!(s&&(s=JSON.parse(s))&&s.tables&&s.data)){if(!O(e)){L("The name '"+e+"'"+" contains invalid characters.")}else{s={tables:{},data:{}};C();i=true}}return{commit:function(){return C()},isNew:function(){return i},drop:function(){a()},serialize:function(){return k()},tableExists:function(e){return c(e)},tableFields:function(e){return l(e)},tableCount:function(){return f()},columnExists:function(e,t){return p(e,t)},createTable:function(e,t){var n=false;if(!O(e)){L("The database name '"+e+"'"+" contains invalid characters.")}else if(this.tableExists(e)){L("The table name '"+e+"' already exists.")}else{var r=true;for(var i=0;i<t.length;i++){if(!O(t[i])){r=false;break}}if(r){var s={};for(var i=0;i<t.length;i++){s[t[i]]=true}delete s["ID"];t=["ID"];for(var o in s){if(s.hasOwnProperty(o)){t.push(o)}}d(e,t);n=true}else{L("One or more field names in the table definition contains invalid characters.")}}return n},createTableWithData:function(e,t){if(typeof t!=="object"||!t.length||t.length<1){L("Data supplied isn't in object form. Example: [{k:v,k:v},{k:v,k:v} ..]")}var n=Object.keys(t[0]);if(this.createTable(e,n)){this.commit();for(var r=0;r<t.length;r++){if(!b(e,t[r])){L("Failed to insert record: ["+JSON.stringify(t[r])+"]")}}this.commit()}return true},dropTable:function(e){h(e);v(e)},truncate:function(e){h(e);m(e)},alterTable:function(e,t,n){var r=false;if(!O(e)){L("The database name '"+e+"'"+" contains invalid characters.")}else{if(typeof t=="object"){var i=true;for(var s=0;s<t.length;s++){if(!O(t[s])){i=false;break}}if(i){var o={};for(var s=0;s<t.length;s++){o[t[s]]=true}delete o["ID"];t=[];for(var u in o){if(o.hasOwnProperty(u)){t.push(u)}}g(e,t,n);r=true}else{L("One or more field names in the table definition contains invalid characters.")}}else if(typeof t=="string"){if(O(t)){var a=[];a.push(t);g(e,a,n);r=true}else{L("One or more field names in the table definition contains invalid characters.")}}}return r},rowCount:function(e){h(e);return y(e)},insert:function(e,t){h(e);return b(e,_(e,t))},insertOrUpdate:function(e,t,n){h(e);var r=[];if(!t){r=x(e)}else if(typeof t=="object"){r=E(e,M(e,t))}else if(typeof t=="function"){r=S(e,t)}if(r.length==0){return b(e,_(e,n))}else{var i=[];for(var s=0;s<r.length;s++){N(e,r,function(e){i.push(e.ID);return n})}return i}},update:function(e,t,n){h(e);var r=[];if(!t){r=x(e)}else if(typeof t=="object"){r=E(e,M(e,t))}else if(typeof t=="function"){r=S(e,t)}return N(e,r,n)},query:function(e,t,n,r){h(e);var i=[];if(!t){i=x(e,n,r)}else if(typeof t=="object"){i=E(e,M(e,t),n,r)}else if(typeof t=="function"){i=S(e,t,n,r)}return w(e,i,n)},deleteRows:function(e,t){h(e);var n=[];if(!t){n=x(e)}else if(typeof t=="object"){n=E(e,M(e,t))}else if(typeof t=="function"){n=S(e,t)}return T(e,n)}}};

var lib;
var loggedInChar;
var char_locations;

var $customDiv;
var $userInfo;
var $userSelect;
var $newChar;

var original_get_markers;

$(document).ready(function(){
	initAction();
});

function initAction(){
	// hijack original function
	original_get_markers = window.get_markers;
	window.get_markers = hijack_get_markers;
	
	// DB initialisieren
	initStorage();
	
	test();
	
	// Eingeloggten Char holen, wenn möglich.
	loggedInChar = Auth.getLoggedIn();
	
	// Map daten zum User laden
	if(loggedInChar) char_locations = Char_Location.getByCharId(loggedInChar.ID);
	
	// Custon Div erstellen.
	createLoginDiv();
}

function test(){
	//Char_Location.deleteByCharId(1);
	//Char_Location.deleteByCharId(2);
}

// Erstellt ein Div rechts am Bildschirmrand, über dass die Charactere gesteuert werden können.
function createLoginDiv(){
	$customDiv = $('<div style="width: 200px; min-height: 100px; color: black; background-color: white; position: fixed; right: 0; top: 200px; border:3px solid black;"></div>');
	
	if(loggedInChar){
		$userInfo = $('<div>Eingeloggt als: '+loggedInChar.name+'</div>');
	}else{
		$userInfo = $('<div>nicht eingeloggt</div>');
	}
	
	$customDiv.append($userInfo);
	
	// Char Dropdown erstellen und eingeloggten Char selectieren, wenn möglich.
	$userSelect = $('<select style="color: black"><option></option></select>');
	$.each(Char.getAll(), function(){
		var selected = '';
		if(loggedInChar && loggedInChar.ID === this.ID) selected = 'selected="selected"';
		$userSelect.append('<option value="'+this.ID+'" '+selected+'>'+this.name+'</option>');
	});
	$userSelect.change(function(){
		if($(this).val()) loginAction($(this).val());
	});
	$customDiv.append($userSelect);
	
	// Input zum erstellen eines neuen Chars
	$newChar = $('<input placeholder="New Char">');
	$newChar.keypress(function(e){
		if(e.keyCode !== 13) return;
		if($(this).val()) createCharAction($(this).val());
	});
	$customDiv.append($newChar);
	
	// Alles an den body hängen.
	$('body').append($customDiv);
}


// über Auth einloggen, Map Daten laden und auf der Map setzten. Daten im Logindiv ändern.
function loginAction(char_id){
	Auth.login(char_id);
	
	// Alle Map Daten zum User laden.
	char_locations = Char_Location.getByCharId(char_id);
	
	// marker reload
	reloadMarkers();
	
	$userInfo.html('Eingeloggt als: '+loggedInChar.name);
}

function createCharAction(name){
	var lastId = Char.create({name:name});
	$newChar.val('');
	
	// Meldung anzeigen, dass ein Char erstellt wurde...danach wieder ausblenden.
	var $created = $('<div style="color: green;">Char "'+name+'" erstellt</div>');
	$newChar.after($created);
	setTimeout(function(){
		$created.fadeOut(500, function(){
			$created.remove();
		});
	},2000);
	
	$userSelect.append('<option value="'+lastId+'">'+name+'</option>');
}

function toggleMarker(marker){
	if(!loggedInChar) return;
	
	var icon = cfg.activeShard;
	
	if(marker.is_active){
		icon = cfg.inActiveShard;
		
		// Skyshard aus lokaler DB löschen
		Char_Location.deleteByCharIdAndTitle(loggedInChar.ID, marker.title);
	}else{
		// Skyshard in lokaler DB speichern
		Char_Location.create({char_id:loggedInChar.ID, title: marker.title});
	}
	
	marker.is_active = !marker.is_active;
	marker.setIcon(icon);
}

function reloadMarkers(){
	$.each(activeMarkers, function(i, marker){
		if(marker.type !== 'skyshard') return true;
		
		var icon_url = cfg.inActiveShard;
		var is_active = false;
		
		$.each(char_locations, function(j, char_location){
			if(char_location.title === marker.title){
				icon_url = cfg.activeShard;
				is_active = true;
				return false;
			}
		});
		
		marker.is_active = is_active;
		marker.setIcon(icon_url);
	});
}

function hijack_get_markers() {
	clear_markers();
    zone = $("select#zone-select :selected").attr("value");
    coords = get_zone_coords(zone);
    zoneCoords = new google.maps.LatLng(coords[0], coords[1]);
    esomap.setZoom(coords[2]);
    esomap.panTo(zoneCoords);
    if (is_zone_enabled(zone)) {
		
		$.getScript(assets + "zones/" + zone + ".js", function () {
            for (i = 0; i < locations.length; i++) {

				// überprüfen ob man den Skyshard schon hat,
				// und dann entsprechend die Skyshard icons anpassen.
				var icon_url = assets + "icons/" + locations[i][1] + ".png?ver=" + iconver;
				var is_skyshard = false;
				var is_active = false;
				
				if(locations[i][1] === 'skyshard'){
					is_skyshard = true;
				}
				
				if(loggedInChar && is_skyshard){
					icon_url = cfg.inActiveShard;
					$.each(char_locations, function(){
						if(this.title === locations[i][0]){
							icon_url = cfg.activeShard;
							is_active = true;
							return false;
						}
					});
				}
				
				
				var a = {
					url: icon_url,
					size: new google.maps.Size(24, 24),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(12, 12)
				};
                marker = new google.maps.Marker({
					position: new google.maps.LatLng(locations[i][3], locations[i][4]),
					map: esomap,
					id: i,
					title: locations[i][0],
					desc: locations[i][2],
					type: locations[i][1],
					icon: a,
					is_active: is_active
				});
                activeMarkers.push(marker);
                google.maps.event.addListener(marker, "click", (function () {
                    var d = $("<div />").html(this.desc).text();
                    var c = $("<div />").html(this.title).text();
                    var b = '<div class="marker-window"><h3 class="marker-title">' + c + '</h3><p class="marker-content">' + d + "</p></div>";
                    infowindow.setContent(b);
                    infowindow.open(esomap, this);
                }));
				
				if(is_skyshard){
					google.maps.event.addListener(marker, "dblclick", (function () {
						toggleMarker(this);
					}));
				}
            }
        });
    }
}




// DB Funktionen
function initStorage(){
	lib = new localStorageDB('eso_map', localStorage);

	if(lib.isNew()){
		// Create Character Table
		lib.createTable('char', ['name']);

		// Create original Location Table (wird nur benutzt um daten zu crawlen um später evtl. in eigene Map zu speichern.)
		lib.createTable('original_location', ['title', 'type', 'description', 'x', 'y']);
		
		// Create Character.Locations Table
		lib.createTable('char_location', ['char_id', 'title']);
		
		lib.commit();
	}
}

// Char_Location Model
var Char_Location = {
	create: function(obj){
		var id =  lib.insert('char_location', obj);
		lib.commit();
		return id;
	},
	getAll: function(){
		return lib.query('char_location');
	},
	getById: function(id){
		var erg = lib.query('char_location', {ID:id});
		if(erg) return erg[0];
		return false;
	},
	getByCharId: function(id){
		return lib.query('char_location', {char_id:id});
	},
	deleteByCharId: function(id){
		lib.deleteRows('char_location', {char_id: id});
		lib.commit();
	},
	deleteByCharIdAndTitle: function(char_id, title){
		lib.deleteRows('char_location', {char_id: char_id, title: title});
		lib.commit();
	}
};

// Char Model
var Char = {
	create: function(char){
		var id =  lib.insert('char', char);
		lib.commit();
		return id;
	},
	getAll: function(){
		return lib.query('char');
	},
	getById: function(id){
		var erg = lib.query('char', {ID:id});
		if(erg) return erg[0];
		return false;
	}
};


// Authenticator
var Auth = {
	getLoggedIn: function(){
		var char_id = $.cookie('logged_in_char');
		if(typeof char_id === 'undefined'){
			return false;
		}
		return Char.getById(char_id);
	},
	
	login: function(char_id){
		$.cookie('logged_in_char', char_id);
		loggedInChar = Char.getById(char_id);
	},
	
	logout: function(){
		$.removeCookie('logged_in_char');
		loggedInChar = false;
	}
};