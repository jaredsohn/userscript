// ==UserScript==
// @name           Multi fleet builder
// @namespace      sk.seko
// @description    Builds number of fleet from the template
// @include        http://*.war-facts.com/fleet_management.php*
// @version        1.1
// ==/UserScript==

// Version 1.0 = Initial release
// Version 1.1 = Changed UI integration

// never create more than this number of fleets at once; be nice to the server!
var MAX_FLEETS = 100;

function startsWith(str, prefix) {
    if (!str) {
        return false;
    }
    return str.indexOf(prefix) == 0;
}

// pads string with leading zeroes
function pad0(str, len) {
  if (str && len) {
    str = str.toString();
    while (str.length < len) {
      str = '0' + str;
    }
  }
  return str;
}

// trims leading and trailing white chars
function trimSpaces(str) {
  return str ? str.replace(/^\s+/, '').replace(/\s+$/, '') : str;
}

// sends 'create fleet' request
window.requestCreate = function(fleetTemplate, number, onload) {
  var params = 'flagship=' + fleetTemplate.flagship;
  params += '&newname=' + fleetTemplate.name.replace(/%n/g, pad0(number, 2));
  params += '&newfleet=Start+new+Fleet';
  params += '&colony=' + fleetTemplate.colony;
  params += '&types=0';
  //GM_log('requestCreate #' + number + ' params: ' + params);
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://'+window.location.hostname+'/fleet_management.php',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/xml,text/xml,text/html',
			'Content-Type': 'application/x-www-form-urlencoded'
			},
		data: params,
		onload: function(responseDetails) {onload(responseDetails, fleetTemplate, number, onload);}
	});
}

// sends 'add to fleet' request
window.requestAdd = function(fleetId, fleetTemplate, number, onload) {
  var params = 'fleet=' + fleetId;
  params += '&addships=Add+to+fleet';
  params += '&colony=' + fleetTemplate.colony;
  for (var i = 1; i <= fleetTemplate.ships.length; ++i) {
    params += '&amount' + i + '=' + fleetTemplate.ships[i-1].shipCount;
    params += '&design' + i + '=' + fleetTemplate.ships[i-1].designId;
  }
  params += '&types=' + fleetTemplate.ships.length;
  //GM_log('requestAdd #' + number + ' params: ' + params);
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://'+window.location.hostname+'/fleet_management.php',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/xml,text/xml,text/html',
			'Content-Type': 'application/x-www-form-urlencoded'
			},
		data: params,
		onload: function(responseDetails) {onload(responseDetails, fleetTemplate, number, onload);}
	});
}

// set fleet orders
window.requestOrders = function(fleetId, fleetTemplate, number, onload, what) {
    //&fratConfirm=0&orders=Set+Orders&stanceindex=1&refuse=1&testbatt=0&aenemy=1&afaction=1
    var params = 'fleet=' + fleetId;
    if (what) {
        params += "&fratConfirm=0&orders=Set+Orders&stanceindex=1&refuse=1&testbatt=0&aenemy=1&afaction=1";
    } else {
        params += "&fratConfirm=0&orders=Set+Orders&stanceindex=5&refuse=1&testbatt=0&aenemy=0&afaction=0";
    }
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://'+window.location.hostname+'/fleet_navigation.php',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/xml,text/xml,text/html',
			'Content-Type': 'application/x-www-form-urlencoded'
			},
		data: params,
		onload: function(responseDetails) {onload(responseDetails, fleetTemplate, number, onload);}
	});
}

window.templateFleets = function() {
  // parse fleet template ( the format is: "fleetCount flagshipId [shipCount designId]*" )
  var mfbTemplate = trimSpaces(document.getElementById('mfbTemplate').value);
  //GM_log('fleet template=' + mfbTemplate);
  if (!mfbTemplate || mfbTemplate=='') {
    alert('No fleet template specified!');
    return;
  }
  var tmpl = mfbTemplate.split(/[\s,]+/);
  if (tmpl.length < 2 || tmpl.length % 2 == 1) {
    alert('Wrong fleet template format!');
    return;
  }
  // create fleet template object
  var tmplObj = {};
  tmplObj.fleetCount = tmpl[0];
  if (tmplObj.fleetCount > MAX_FLEETS) {
    alert('Can\'t create more than ' + MAX_FLEETS + ' fleets at once!');
  }
  tmplObj.flagship = tmpl[1];
  tmplObj.ships = [];
  for (var i = 2; i < tmpl.length; i+=2) {
    ship = {};
    ship.shipCount = tmpl[i];
    ship.designId = tmpl[i+1];
    tmplObj.ships.push(ship);
  }
  tmplObj.colony = document.getElementsByName('colony')[0].value;
  tmplObj.name = document.getElementById('newname').value;
  requestCreate(tmplObj, tmplObj.fleetCount, function(responseDetails, fleetTemplate, number, onload) {
    var fleetParam = responseDetails.responseText.match(/<input type=hidden name=fleet value=(\d+)/);
    if (fleetParam) {
      fname = fleetTemplate.name;
      what = (!startsWith(fname, 'Probe-') && !startsWith(fname, 'Sur-') && !startsWith(fname, 'Survey-'));
      requestOrders(fleetParam[1], fleetTemplate, number, function() {}, what);
      requestAdd(fleetParam[1], fleetTemplate, number, function() {
        //GM_log('fleet finished #' + number)
        if (number == 1) {
          alert('All fleets created');
          window.location.replace('/fleet_management.php?colony=' + fleetTemplate.colony);
        }
      });
    } else {
      alert('No fleet id after fleet created?');
    }
    if (number > 1) {
      requestCreate(fleetTemplate, number-1, onload);
    }
  });
}

// register callbacks and draw UI
window.onMultiToggle = function() {
  var row1 = document.getElementById('mfbRow');
  if (row1) {
    row1.style.display = (row1.style.display == 'none') ? '' : 'none';
  }
  var tg = document.getElementById('mfbToggle');
  if (tg) {
    if (tg.value.indexOf('[+]') == -1)
      tg.value = tg.value.replace(/\[-\]/,'[+]');
    else
      tg.value = tg.value.replace(/\[\+\]/,'[-]');
  }
}

// register callbacks and draw UI
window.onMultiInit = function(e) {
  // is create button displayed?
  var createBtn = document.getElementById('newfleet');
  if (!createBtn) {
    // no button = no function
    return;
  }

  // create toggle button
  var row1 = document.createElement('tr');
  row1.setAttribute('id', 'mfbRow');
  row1.setAttribute('align', 'center');
  row1.setAttribute('style', 'display: none;');

  var col1 = document.createElement('td');
  col1.setAttribute('align', 'left');
  col1.setAttribute('class', 'head');
  col1.setAttribute('colspan', '2');
  row1.appendChild(col1);

  var textField = document.createElement('input');
  textField.setAttribute('id', 'mfbTemplate');
  textField.setAttribute('type','text');
  textField.setAttribute('size','40');
  textField.setAttribute('title','Fleet template; format is "fleetCount flagshipId [shipCount designId]*"');
  col1.appendChild(textField);
  
  var col3 = document.createElement('td');
  col3.setAttribute('align', 'center');
  col3.setAttribute('class', 'head');
  row1.appendChild(col3);

  var startBtn = document.createElement('input');
  startBtn.setAttribute('type','button');
  startBtn.setAttribute('value','Start new Fleets');
  startBtn.setAttribute('title','Create number of fleets specified by Fleet template');
  startBtn.addEventListener('click', window.templateFleets, false);
  col3.appendChild(startBtn);

  var col4 = document.createElement('td');
  col4.setAttribute('align', 'center');
  col4.setAttribute('class', 'head');
  col4.setAttribute('colspan', '3');
  col4.innerHTML = '<small>Format is <i>"fleetCount flagshipId [shipCount designId]*"</i>.<br/>Use <i>%n</i> in the fleet name to use auto-numbering.</small>'
  row1.appendChild(col4);

  var toggleBtn = document.createElement('input');
  toggleBtn.setAttribute('id', 'mfbToggle');
  toggleBtn.setAttribute('type','button');
  toggleBtn.setAttribute('value','Multi Fleet [+]');
  toggleBtn.setAttribute('title','Toggle display of multi fleet creation tool');
  toggleBtn.addEventListener('click', window.onMultiToggle, false);

  createBtn.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.appendChild(toggleBtn);
  createBtn.parentNode.parentNode.parentNode.insertBefore(row1,createBtn.parentNode.parentNode.nextSibling);
}

window.addEventListener('load', window.onMultiInit, false);
