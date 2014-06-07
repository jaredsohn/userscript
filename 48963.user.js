// ==UserScript==
// @name						Apache server-status
// @description			Top accesed VHosts + reload every N seconds
// @include					http*://*/server-status*
// ==/UserScript==

// TODO: coloana noua: %
// TODO: link pe domeniile din top
// TODO: link pe VHost si/sau Request din tabelul original
// TODO: count / sum: checkbox, data start, elapsed time, requests / second
// TODO: tabel separat pentru optiuni

Hashtable.prototype.hash = null;
Hashtable.prototype.keys = null;
Hashtable.prototype.location = null;

function Hashtable() {
	this.hash = new Array();
	this.keys = new Array();

	this.location = 0;
}
Hashtable.prototype.get = function (key) {
	return this.hash[key];
}
Hashtable.prototype.put = function (key, value) {
	if (value == null)
		return null;

	if (this.hash[key] == null)
		this.keys[this.keys.length] = key;

	this.hash[key] = value;
}
Hashtable.prototype.sort = function () {
	var tmp = 0;
	for (var i = 0; i < this.keys.length; i++)
		for (var j = 0; j < this.keys.length - Math.ceil(i / 2); j++)
			if (this.get(this.keys[i]) > this.get(this.keys[j])) {
					tmp = this.keys[i];
					this.keys[i] = this.keys[j];
					this.keys[j] = tmp;
				}
}

function addTopTable(nRowsToShow, nRefreshInterval) {
	var sOut = '';

	sOut += '<table width="' + nTableWidth + '">';

	var _nRowsToShow = Math.min(nRowsToShow, hVHosts.keys.length);
	for (i = 0; i < _nRowsToShow; i++) {
		sOut += '<tr><td width="10" align="right" nowrap>' + (i + 1) + '.</td><td>' + hVHosts.keys[i] + '</td><td align="right">' + hVHosts.get(hVHosts.keys[i]) + '</td>';

		if (i == 0) {
			sbVHostRefreshChecked = (nRefreshInterval && nRefreshInterval != '0') ? ' checked' : '';
			sOut += '<td width="280" align="right" nowrap><a class="VHostTopLink" nRowsToShow="100000" href="javascript: ;">all (' + hVHosts.keys.length + ')</a>&nbsp;|&nbsp;<a class="VHostTopLink" nRowsToShow="50" href="javascript: ;">50</a>&nbsp;|&nbsp;<a class="VHostTopLink" nRowsToShow="10" href="javascript: ;">10</a>&nbsp;|&nbsp;<input type="checkbox" name="" id="VHostRefresh"' + sbVHostRefreshChecked + '>&nbsp;<label for="VHostRefresh">Refresh&nbsp;every</label>&nbsp;<input type="" name="" id="VHostRefreshInterval" value="' + nRefreshInterval + '" style="width: 27px;" />s</td>';
		}

		sOut += '</tr>';

		sOut += '<tr><td colspan="3" style="height: 2px;"><div style="height: 2px; width: ' + (hVHosts.get(hVHosts.keys[i]) * nBarRatio) + 'px; background-color: rgb(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*254) + ',' + Math.floor(Math.random()*254) + ');"></div></td></tr>';
	}
	sOut += '</table>';

	var oFloatingDiv;
	if (oFloatingDiv = document.getElementById('VHostTopDiv')) {
		oFloatingDiv.parentNode.removeChild(oFloatingDiv);
	}
	oFloatingDiv = document.createElement('div');
	oFloatingDiv.id = 'VHostTopDiv';

	var sInnerHTML = '<a name="vhosttop"></a><hr /><form>';
	sInnerHTML += '' + sOut;
	sInnerHTML += '<hr /></form>';

	oFloatingDiv.innerHTML = sInnerHTML;

	oTables[tableNo].parentNode.insertBefore(oFloatingDiv, oTables[tableNo]);

	var aLinks = document.getElementsByTagName('a');
	for (i = 0; i < aLinks.length; i++) {
		if (aLinks[i].className == 'VHostTopLink')
			if (aLinks[i].getAttribute('nRowsToShow')) {
				aLinks[i].addEventListener('click', function (ev) {GM_setValue('nRowsToShow', ev.currentTarget.getAttribute('nRowsToShow'));window.location.reload();}, 'true');
				aLinks[i].title = 'see ' + (!isNaN(aLinks[i].innerHTML) ? 'top ' : '') + aLinks[i].innerHTML + ' VHosts';
			}
	}
	document.getElementById('VHostRefresh').addEventListener('click', 
		function (ev) {
			if (!ev.currentTarget.checked) {
				GM_setValue('nRefreshInterval', -1 * document.getElementById('VHostRefreshInterval').value);
			}
			else {
				_nRefreshInterval = document.getElementById('VHostRefreshInterval').value;
				if (_nRefreshInterval && _nRefreshInterval != '0' && _nRefreshInterval > 0) {
					GM_setValue('nRefreshInterval', document.getElementById('VHostRefreshInterval').value);
				}
				else {
					GM_setValue('nRefreshInterval', -1 * GM_getValue('nRefreshInterval'));
				}
			}
				
			//alert('a - ' + document.getElementById('VHostRefreshInterval').value);
			window.location.reload();
		},
		true
	);

	document.getElementById('VHostRefreshInterval').addEventListener('change', 
		function (ev) {
			if (ev.currentTarget.value != GM_getValue('nRefreshInterval')) {
				GM_setValue('nRefreshInterval', document.getElementById('VHostRefreshInterval').value);
				window.location.reload();
			}
		},
		true
	);

	return sOut;
}


var oTables = document.getElementsByTagName('table');
var nTableWidth = 520, nRowsToShow = 10;
var nRefreshInterval = 0;
var i = 0, j = 0, tableNo = -1, vHostColumnNo = -1, aTblHeader;
var hVHosts = new Hashtable();
var sOut = '', sVHost = '';

for (i = 0; i < oTables.length; i++) {
	if (oTables[i].firstChild && oTables[i].firstChild.firstChild && oTables[i].firstChild.firstChild.tagName == 'TR')
		aTblHeader = oTables[i].firstChild.firstChild.childNodes;
	else
		aTblHeader = {'length': 0};
	for (j = 0; j < aTblHeader.length; j++) // TBODY > first TR
		if (aTblHeader[j].innerHTML == 'VHost') {
			tableNo = i;
			vHostColumnNo = j;
			continue;
		}
}

// found VHost table column
if (tableNo != -1 && vHostColumnNo != -1) {
		var oVHostCell = oTables[tableNo].firstChild.firstChild.childNodes[vHostColumnNo];

		oCurrentTableRow = oVHostCell.parentNode;

		i = 0;
		while ((oCurrentTableRow = oCurrentTableRow.nextSibling.nextSibling) && i < 100000) {
			sVHost = oCurrentTableRow.childNodes[vHostColumnNo].innerHTML;
			currentValue = hVHosts.get(sVHost) ? hVHosts.get(sVHost) : 0;
			hVHosts.put(sVHost, currentValue + 1);
			i++;
		}

		hVHosts.sort();
		var nBarRatio = nTableWidth / hVHosts.get(hVHosts.keys[0]);
		
		if (GM_getValue('nRowsToShow'))
			nRowsToShow = GM_getValue('nRowsToShow');

		if (GM_getValue('nRefreshInterval')) {
			nRefreshInterval = GM_getValue('nRefreshInterval');
		}
		if (nRefreshInterval && nRefreshInterval != '0' && nRefreshInterval > 0) {
			//alert(new String(nRefreshInterval).substr(0, 1));
			//if (new String(nRefreshInterval).substr(1))
			window.setTimeout(function(){window.location.reload()}, nRefreshInterval * 1000);
		}
		else {
			nRefreshInterval = 0;
		}

		addTopTable(nRowsToShow, nRefreshInterval);
}
