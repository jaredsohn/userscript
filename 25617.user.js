// ==UserScript==
// @name        TripCost 1.0
// @namespace   http://www.userscripts.org
// @description show the gas cost of trips on google maps
// @version     1.0
// @date        2008-04-26
// @include     *maps.google.com*
// ==/UserScript==


// ===================================================================================
// SCRIPT CONFIGURATION

var mpg = 25;

// ===================================================================================


// extremely useful function
function strBetween(source, strA, strB) {
    var indA = (strA=='') ? 0 : source.indexOf(strA)+strA.length;
    var indB = (strB=='') ? source.length : source.indexOf(strB, indA);
    return source.substring(indA, indB);
}

// navigate dom tree
function navDOM(id, path) {
	var elem = document.getElementById(id);
	for (i=0; i<path.length; i++) {
		elem = elem.childNodes[path[i]];
	}
	return elem;
}

// rounds to certain decimal place
function roundNumber(num, dec) {
    return result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
}

// gets [address, city, state, zip] of starting address
function getGoogleStartAddress() {
    line1 = document.getElementById('sxaddr').childNodes[0].innerHTML;
    line1 = [line1.replace(/ /g, '+')];
    line2 = document.getElementById('sxaddr').childNodes[1].innerHTML;
    line2 = line2.replace(/,/, '').split(' ');
    return line1.concat(line2);
}

// gets distance of trip
function getGoogleDistance() {
    distText = navDOM('ddr0', [1,0,0,1,0,0]).innerHTML;
    return Number(strBetween(distText, '', '&'));
}

// make search url for gasprices.mapquest.com
function makeGasURL(address) {
    street=address[0], city=address[1], state=address[2], zip=address[3];
    link = 'http://gasprices.mapquest.com/searchresults.jsp?search=true&latitude=&longitude=&gasPriceType=3&address=' + street + '&city=' + city + '&stateProvince=' + state + '&postalCode=' + zip + '&radius=10&brand=&sortOrder=2';
    return link;
}

// get gas price by address from mapquest
GM_xmlhttpRequest({
    method: 'GET',
    url: makeGasURL(getGoogleStartAddress()),
    onload: function(responseDetails) {
        source = responseDetails.responseText;
        var dpg = Number(strBetween(source, '<strong>', '</strong>').replace(/\$/, ''));
        var miles = getGoogleDistance();
        var vals = [roundNumber(miles/mpg*dpg,2), roundNumber(miles/mpg*dpg*2,2)];
        
        gasContainer = document.createElement('table');
        gasContainer.width = "300";
        gasContainer.border = "1";
        gasContainer.innerHTML = 
            '<tr>' +
            '<td>distance \\ gas type</td>' +
            '<td>87 octane</td>' +
            '</tr>' +
            '<tr>' +
            '<td>one way</td>' +
            '<td>$' + vals[0] + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>roundtrip</td>' +
            '<td>$' + vals[1] + '</td>' +
            '</tr>';
        
        navDOM('d_form', [3,0,0]).appendChild(gasContainer);
    }
});


// ===================================================================================
// autochecks for updates to script

var GM_update = function(title, version, updateUrl, versionUrl) {
			var title = title;
			var today = new Date();
			today = today.getDate();
			var last = GM_getValue(title);
			var current;
			var answer;
			var updateUrl = updateUrl;
			var versionUrl = versionUrl;
			this.init = function() {
				if(last != undefined) {
					if(today - last >= 3 || today - last <= -24) {
						GM_setValue(title, today);
						this.check();
					}
				}
				else {
					GM_setValue(title, today);
					this.check();
				}
			}
			this.check = function() {
				GM_xmlhttpRequest({
					method:"GET",
					url:versionUrl,
					onreadystatechange:this.finish
				});
			}
			this.finish = function(o) {
				if(o.readyState == 4) {
					current = o.responseText;
					current = current.split(".");
					version = version.split(".");
					if(version[0] < current[0]) {
						answer = confirm("Update " + title + " to version " + current.join(".") + "?");
						if(answer) { GM_openInTab(updateUrl); }
					}
					else if(version[1] < current[1]) {
						answer = confirm("Update " + title + " to version " + current.join(".") + "?");
						if(answer) { GM_openInTab(updateUrl); }
					}
					else if(version[2] < current[2]) {
						answer = confirm("Update " + title + " to version " + current.join(".") + "?");
						if(answer) { GM_openInTab(updateUrl); }
					}
					else {
						// up to date
					}
				}
			}
		//start
		this.init();
		}
GM_update('TripCost', '1.0.0', 'http://userscripts.org/scripts/show/25617', 'http://bettertube.googlepages.com/version_tripcost.txt');





