// ------------------------------------------------------------------------------------------------------------------------
// Plemiona.pl 8.X Skrypt użytkowy
//
// Nazwa:      Czas dotarcia jednostek
// Wersja:     1.3
// Autor:      adrb (Plemiona Forum)
// Dostosował: Lukasz032 (Plemiona Authorized Scripter)
//
// Tagi specjalne:
// Licencja:   Creative Commons Uznanie autorstwa - Brak komercyjnego zastosowania - Na tych samych warunkach 3.0 Polska
// Informacje: http://creativecommons.org/licenses/by-nc-sa/3.0/pl
// Support:    lvwnbrz@lykamspam.pl
//
// ------------------------------------------------------------------------------------------------------------------------
// ==UserScript==
// @name           Czas dotarcia jednostek
// @namespace	     http://kurierplemion.pl/skryptoteka
// @description    Czas dotarcia jednostek
// @version        1.3
// @license        Creative Commons 3.0 BY-NC-SA (http://creativecommons.org/licenses/by-nc-sa/3.0/pl)
// @author         adrb (Plemiona Forum)
// @contributor    Lukasz032 (Plemiona Authorized Scripter)
// @include        http://pl*.plemiona.pl/game.php*screen=overview_villages*mode=units*type=own_home*
// @include        http://pl*.plemiona.pl/game.php*screen=place*
// @include        http://pl*.plemiona.pl/game.php*screen=info_village*
// ==/UserScript==
// ------------------------------------------------------------------------------------------------------------------------


// Dodano by Lukasz032: obsługa innych przeglądarek, zapis Flashem.
function DS_userScript_SWFStore_Wrapper() {

PlemionaRALS = "redistrib";

JSON = {
  $specialChars: {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\'},
  
  $replaceChars: function(chr){
    return this.JSON.$specialChars[chr] || '\\u00' + Math.floor(chr.charCodeAt() / 16).toString(16) + (chr.charCodeAt() % 16).toString(16);
  },
  
  encode: function(obj){
    switch (typeof obj){
      case 'string':
        return '"' + obj.replace(/[\x00-\x1f\\"]/g, JSON.$replaceChars) + '"';
      case 'array':
        return '[' + String(obj.map(JSON.encode).clean()) + ']';
      case 'object': case 'hash':
        var string = [];
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            var json = JSON.encode(obj[prop]);
            if (json) {
              string.push(JSON.encode(prop) + ':' + json);
            }
          }
        }
        return '{' + string + '}';
      case 'number': case 'boolean': return String(obj);
      case false: return 'null';
    }
    return null;
  },
  
  decode: function(string, secure){
    if ((typeof string != 'string') || !string.length) return null;
    if (secure && !(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, ''))) return null;
    return eval('(' + string + ')');
  }
};


DS_userScript_SWFStore = {
  options : {
    SWFAddress : 'flashStorage.swf',
    storageName : 'myStorage',
    runAfter : function(){},
    logger : function(){}
  },
  doSaves : true,
	initialize : function (options) {
    options = options || {};
    this.options.SWFAddress = options.SWFAddress || this.options.SWFAddress;
    this.options.storageName = options.storageName || this.options.storageName;
    this.options.runAfter = options.runAfter || this.options.runAfter;
    this.options.logger = options.logger || this.options.logger;
    
    this.storageSuffix = "_" + this._time() + "_" + Math.round(Math.random() * 100000);
    // We DO NEED an unique instance of the flash object as it will "work" on a different cookie
    this.createUniqueInstance();
    return this;
  },
  createUniqueInstance : function () {
    var browserId, value, date, div, object;
    value = document.cookie.match('(?:^|;)\\s*' + 'DS_userScript_SWFStore' + '=([^;]*)');
    browserId = (value) ? decodeURIComponent(value[1]) : null;
    if (!browserId) {
      browserId = Math.round(Math.random() * Math.PI * 100000);
      value = encodeURIComponent(browserId);
      date = new Date();
      date.setTime(date.getTime() + this.options.duration * 24 * 60 * 60 * 1000);
      value += '; expires=' + date.toGMTString();
      document.cookie = 'DS_userScript_SWFStore' + '=' + value;
    }
    
    div = document.createElement('div');
    div.id = 'DS_userScript_SWFStoreContainer'+this.storageSuffix;
    div.style.position = 'absolute';
    div.style.width = '300px';
    div.style.height = '200px';
    div.style.display = 'block';
    div.style.top = '100px';
    div.style.left = '-299px';
    div.style.overflow = 'hidden';
    document.getElementById('ds_body').appendChild(div);
    
    this.options.logger('System przechowywania danych - ładowanie flasha z adresu: '+this.options.SWFAddress,8);
    this.options.logger('System przechowywania danych - komentarz pamięci: '+this.storageSuffix,8);
    object = document.createElement('object');
    object.id = 'DS_userScript_SWFStore'+this.storageSuffix;
    object.width = '300px';
    object.height = '200px';
    object.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
    object.type = 'application/x-shockwave-flash';
    object.data = this.options.SWFAddress;
    object.innerHTML =
      '<param name="movie" value="' + this.options.SWFAddress + '" />'+
      '<param name="allowScriptAccess" value="always" />'+
      '<param name="quality" value="low" />'+
      '<param name="swLiveConnect" value="true" />'+
      '<param name="flashVars" value="storageReady=DS_userScript_SWFStore.contentReady&displaySettings=DS_userScript_SWFStore.displaySettings&settingsClosed=DS_userScript_SWFStore.settingsClosed" />'+
      '';
    
    div.appendChild(object);
    this.store = object;
  },
  contentReady : function () {
    var res = this.initStorage();
    if (res != 'STOR_CREATED' && res != 'STOR_READY') {
      this.options.logger('System przechowywania danych - kontenener nie stworzony: '+res, 0);
    } else {
      this.options.logger('System przechowywania danych - kontener załadowany poprawnie', 8);
      // reinstate last commandLine
      this.options.runAfter();
    }
  },
  initStorage : function() {
    this.options.logger('System przechowywania danych - obiekt pamięci lokalnej załadowany: `'+this.options.storageName+'`', 10);
    return this.store.initStorage(this.options.storageName);
  },
  getValue : function (key) {
    var res = this.store.getValue(key)
    this.options.logger('System przechowywania danych - pobieranie zapisu w bazie danych dla klucza '+key+'', 10);
    return res;
  },
  setValue : function(key, val) {
    if (this.doSaves) {
      // let's do some prevention
      if (typeof val != 'string') {
        val = JSON.encode(val);
      }
      this.options.logger('System przechowywania danych - zapisywanie wartości klucza: '+key, 10);
      return this.store.setValue(key, val);
    } else {
      this.options.logger('System przechowywania danych - obiekt nie zapisuje danych',0);
      return false;
    }
  },
  removeValue : function(key) {
    return this.store.removeValue(key);
  },
  removeStorage : function() {
    return this.store.removeStorage();
  },
  getSize : function() {
    return this.store.getSize();
  },
  getAllKeys : function() {
    return this.store.getAllKeys();
  },
  
  displaySettings : function() {
    this.options.logger('System przechowywania danych - wyświetlanie ostrzeżenia pojemności pamięci',8);
    this.doSaves = false;
    document.getElementById('DS_userScript_SWFStoreContainer'+this.storageSuffix).styles.left = '400px';
  },
  settingsClosed : function(flush_result) {
    if (flush_result == 'true') {
      this.doSaves = true;
      this.options.logger('System przechowywania danych - powiększenie pamięci nieudane', 8);
    } else {
      this.options.logger('System przechowywania danych - powiększenie pamięci zakończone', 8);
    }
    document.getElementById('DS_userScript_SWFStoreContainer'+this.storageSuffix).styles.left = '-299px';
  },
  _time : Date.now || function() {
    return +new Date;
  }
};

}
if ((typeof GM_getResourceURL) != "undefined") {
  if ((typeof unsafeWindow.DS_userScript_SWFStore) == 'undefined') {
    unsafeWindow.DS_userScript_SWFStore = {};
    unsafeWindow.JSON = {};
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = '(' + DS_userScript_SWFStore_Wrapper + ')();';
    script.charset = 'utf-8';
    document.body.appendChild(script);
  }
} else if ((typeof webkitStorageInfo) != "undefined") {
  if ((typeof DS_userScript_SWFStore) == 'undefined') {
    DS_userScript_SWFStore = {};
    JSON = {};
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = "(" + DS_userScript_SWFStore_Wrapper + ")();";
    script.charset = "utf-8";
    document.body.appendChild(script);
	}
} else {
  var DS_userScript_SWFStore, JSON, PlemionaRALS;
  DS_userScript_SWFStore_Wrapper();
}


function CzasWrapper() {

function makeGUI() {

	var tab = window.document.getElementById('units_table');

	// wstawiam gui
	var guitr = document.createElement('tr');
	guitr.setAttribute('width', 'auto');
	tab.insertBefore(guitr, tab.firstChild);

	var guitd = document.createElement('td');
	guitd.setAttribute('colspan', tab.getElementsByTagName('th').length + 1);
	guitd.innerHTML = 'Cel: ';
	guitr.appendChild(guitd);

	var elem = document.createElement('input');
	elem.type = 'text';
	elem.id = 'target_cords';
	elem.size = '7';
	guitd.appendChild(elem);

	elem = document.createElement('input');
	elem.type = 'text';
	elem.size = '18';
	elem.id = 'beforeTime';
	guitd.innerHTML += ' Przed: ';
	guitd.appendChild(elem);

	var unitstab = [ 'Pikinier', 'Miecznik', 'Topornik', 'Zwiadowca', 'Lekka', 'Ciężka', 'Taran', 'Katapulta', 'Rycerz', 'Szlachcic' ];
	var unitspeed = [ 18, 22, 18, 9, 10, 11, 30, 30, 10, 35];

	elem = document.createElement('select');
	elem.id = 'unitSpeed';
	for ( var i = 0 ; i < unitspeed.length; i++) {
			var option = document.createElement('option');
			option.text = unitstab[i];
			option.value = unitspeed[i];
			elem.add(option,null);
	}
	guitd.innerHTML += '  Rodzaj:';
	guitd.appendChild(elem);

	elem = document.createElement('input');
	elem.type = 'button';
	elem.id = 'btnfiltr';
	elem.value = 'Filtruj';
	elem.onclick = 'Filtruj();';
	guitd.innerHTML += '&nbsp;&nbsp;';
	guitd.appendChild(elem);
	
	guitd.innerHTML += '  Sortuj po: ';
	elem = document.createElement('input');
	elem.type = 'radio';
	elem.name = 'czasdot_opt';
	elem.id = 'btndist';
	elem.checked = false;
	guitd.appendChild(elem);
	guitd.innerHTML += '  odległości ';
	
	elem = document.createElement('input');
	elem.type = 'radio';
	elem.name = 'czasdot_opt';
	elem.id = 'btntime';
	elem.checked = true;
	guitd.appendChild(elem);
	guitd.innerHTML += '  czasie ';

	document.getElementById('beforeTime').value = CaptureObject.getValue('czasdot_beforeTime');
	document.getElementById('unitSpeed').selectedIndex = CaptureObject.getValue('czasdot_unitSpeed');
	document.getElementById('target_cords').value = location.href.match('coords=') ? location.href.split('coords=')[1].replace(/&.+/, '') : CaptureObject.getValue('czasdot_target_cords');
	document.getElementById('btntime').checked = CaptureObject.getValue('czasdot_btntime');
	document.getElementById('btndist').checked = CaptureObject.getValue('czasdot_btndist');
	
// day/month/year/ hours:minutes:seconds
function getTime( timestr ) {

	timestr = timestr.split(/[:. \/]/);

// year, month, day, hours, minutes, seconds, milliseconds
return new Date(parseInt(timestr[2],10), parseInt(timestr[1],10)-1, parseInt(timestr[0],10), parseInt(timestr[3],10), parseInt(timestr[4],10), parseInt(timestr[5],10), 0 );
}

function getServerTime() {
	return getTime(document.getElementById('serverDate').textContent +':'+ document.getElementById('serverTime').textContent);
}

function Filtruj() {

	var tab = window.document.getElementById('units_table');
	var tab_rows = tab.tBodies;
	var sorted_rows =[];

	var servtime = getServerTime();
	var target_cords = document.getElementById('target_cords');
	var beforeTime = document.getElementById('beforeTime');
	var unitSpeed = document.getElementById('unitSpeed');
	var sortType = document.getElementById('btntime').checked;

	CaptureObject.setValue('czasdot_target_cords',target_cords.value);
	CaptureObject.setValue('czasdot_beforeTime',beforeTime.value);
	CaptureObject.setValue('czasdot_unitSpeed',unitSpeed.selectedIndex);
	CaptureObject.setValue('czasdot_btntime',sortType);
	CaptureObject.setValue('czasdot_btndist',!sortType);

	if ( target_cords.value == '' || beforeTime.value == '' || unitSpeed.selectedIndex == null ) {
		alert('Wypełnij formularz!');
		return;
	} else
		target_cords = target_cords.value;

	// +1 dzień do przodu gdy nie ustawione
	beforeTime = ( beforeTime.value != '' ) ? getTime(beforeTime.value) : new Date(servtime.getTime() +86400000);
	// pik gdy nie ustawione
	unitSpeed = ( unitSpeed.value != '' ) ? parseInt(unitSpeed.value,10) : 18;

	for ( var row_index = 0 ; row_index < tab_rows.length ; row_index++ ) {

		var tab_row = tab_rows[row_index];
		var src_cords = tab_row.getElementsByTagName('span')[1].innerHTML.replace(/\) K[0-9]{1,2}.+/,'').replace(/.+\(/,'');

		// dystans
		var sx = parseInt(src_cords.split('|')[0]);
		var sy = parseInt(src_cords.split('|')[1]);
		var dx = parseInt(target_cords.split('|')[0]);
		var dy = parseInt(target_cords.split('|')[1]);
		var dist = Math.sqrt(Math.pow(sx - dx, 2) + Math.pow(sy - dy, 2));

		var arrival_time = new Date( servtime.getTime() + (unitSpeed * dist * 60000.0) );

		var rozkazy = tab_row.rows[0].cells[ (tab_row.rows[0].cells.length - 1) ].getElementsByTagName('a')[0];
		rozkazy.href = rozkazy.href.replace(/&coords=([^&]+)?/, '') + '&coords='+target_cords;

		// time to send
		var tts = (beforeTime.getTime() - arrival_time.getTime());

		if ( dist >= 1.0 ) {

			var sendtime = new Date( servtime.getTime() + tts );
			rozkazy.innerHTML = 'Rozkazy<br><span class="small grey">('+sendtime.getDate()+'/'+(sendtime.getMonth()+1)+' '+sendtime.getHours()+':'+sendtime.getMinutes()+':'+sendtime.getSeconds()+')</span>';
			
			if ( arrival_time.getTime() < beforeTime.getTime() ) {
				tab_row.style.color = 'green';

			} else {
				tab_row.style.color = 'red';
				tts = Number.MAX_VALUE;		// te wioski na koniec listy
			}
		} else {
			// wioska docelowa
			tab_row.style.color = 'blue';
			tts = 0;
		}

		sorted_rows[row_index] = [ (sortType ? tts : dist), tab_row];
	}

	sorted_rows = sorted_rows.sort(function(a, b) {return a[0] - b[0];});
	for ( i = 0 ; i < sorted_rows.length ; i++ ) {
		var tab_row = sorted_rows[i][1];

		if ( i & 1 )
			tab_row.className = 'row_marker row_a';
		else
			tab_row.className = 'row_marker row_b';

		tab.appendChild(tab_row);
	}
}

function main() {
  CaptureObject = DS_userScript_SWFStore.initialize({
    SWFAddress : 'http://plemiona-skrypty.googlecode.com/svn/testowe/DS_userScriptSWFStore/flashStorage.swf',
    storageName : "PLEMIONA_RA2X",
    logger : function() {}
  });
  if (location.href.match(/screen=overview_villages.*mode=units.*type=own_home/))
    makeGUI();
  else if (location.href.match(/screen=place.*coords=/)) {
    var coords = location.href.split('coords=')[1].replace(/&.*/, '').split('|');
    document.getElementById('inputx').value = coords[0];
    document.getElementById('inputy').value = coords[1];
  } else if (location.href.match(/screen=info_village/)) {
    var tab = document.getElementById('content_value').getElementsByTagName('table')[1];
    var coords = tab.tBodies[0].rows[1].cells[1].innerHTML;
    var newCell = document.createElement('td');
    newCell.setAttribute('colspan', '2');
    newCell.innerHTML = '<a href="'+window.game_data.link_base_pure.replace(/&screen=(\w+)?/,"")+'&screen=overview_villages&mode=units&type=own_home&coords='+coords+'">» Wpisz do kalkulatora</a>';
    tab.tBodies[0].appendChild(document.createElement('tr').appendChild(newCell));
  }
}

main();
}

if ((typeof GM_getResourceURL) != "undefined") {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = "(" + CzasWrapper + ")();";
  script.charset = "utf-8";
  document.body.appendChild(script);
} else if ((typeof webkitStorageInfo) != "undefined") {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = "(" + CzasWrapper + ")();";
  script.charset = "utf-8";
  document.body.appendChild(script);
} else {
  CzasWrapper();
}