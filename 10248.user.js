// ==UserScript==
// @name           Virginia DMV Wait Times
// @namespace      http://jobson.us/
// @description    Wait timer lookup for DMV offices.
// @include        http://www.dmv.virginia.gov/*
// ==/UserScript==


var lURL = 'http://www.dmv.virginia.gov/exec/csc/csc.asp?id=';

var districts = ['Fairfax North','Fairfax South','Staunton','Richmond','Portsmouth','Bristol'];
var locations = [
	// Fairfax North
	{ d: 0, n: 'Arlington', i: 5 },
	{ d: 0, n: 'Fairfax / Westfields', i: 16 },
	{ d: 0, n: 'Fair Oaks Mall', i: 36 },
	{ d: 0, n: 'Leesburg', i: 14 },
	{ d: 0, n: 'Sterling', i: 11 },
	{ d: 0, n: 'Tysons Corner', i: 7 },
	// Fairfax South
	{ d: 1, n: 'Alexandria', i: 4 },
	{ d: 1, n: 'Franconia', i: 18 },
	{ d: 1, n: 'Fredericksburg', i: 55 },
	{ d: 1, n: 'Manassas', i: 17 },
	{ d: 1, n: 'Pentagon Satellite', i: 76 },
	{ d: 1, n: 'Springfield Mall', i: 15 },
	{ d: 1, n: 'Stafford', i: 52 },
	{ d: 1, n: 'Woodbridge', i: 13 },
	// Staunton
	{ d: 2, n: 'Charlottesville', i: 39 },
	{ d: 2, n: 'Culpeper', i: 51 },
	{ d: 2, n: 'Front Royal', i: 44 },
	{ d: 2, n: 'Harrisonburg', i: 40 },
	{ d: 2, n: 'Lexington', i: 49 },
	{ d: 2, n: 'Staunton', i: 12 },
	{ d: 2, n: 'Warrenton', i: 48 },
	{ d: 2, n: 'Waynesboro', i: 19 },
	{ d: 2, n: 'Winchester', i: 47 },
	{ d: 2, n: 'Woodstock', i: 43 },
	// Richmond
	{ d: 3, n: 'Chester', i: 37 },
	{ d: 3, n: 'Chesterfield', i: 38 },
	{ d: 3, n: 'East Henrico', i: 3 },
	{ d: 3, n: 'Emporia', i: 75 },
	{ d: 3, n: 'Farmville', i: 30 },
	{ d: 3, n: 'Hopewell', i: 34 },
	{ d: 3, n: 'Kilmarnock', i: 10 },
	{ d: 3, n: 'North Henrico', i: 74 },
	{ d: 3, n: 'Petersburg', i: 33 },
	{ d: 3, n: 'Richmond Central', i: 1 },
	{ d: 3, n: 'South Hill', i: 28 },
	{ d: 3, n: 'Tappahannock', i: 8 },
	{ d: 3, n: 'West Henrico', i: 6 },
	// Portsmouth
	{ d: 4, n: 'Chesapeake', i: 24 },
	{ d: 4, n: 'Courtland', i: 21 },
	{ d: 4, n: 'Gloucester', i: 26 },
	{ d: 4, n: 'Hampton', i: 20 },
	{ d: 4, n: 'Newport News', i: 72 },
	{ d: 4, n: 'Norfolk / Military Circle', i: 32 },
	{ d: 4, n: 'Norfolk / Widgeon Road', i: 31 },
	{ d: 4, n: 'Onancock', i: 25 },
	{ d: 4, n: 'Portsmouth', i: 29 },
	{ d: 4, n: 'Smithfield', i: 35 },
	{ d: 4, n: 'Suffolk', i: 22 },
	{ d: 4, n: 'Virginia Beach / Buckner', i: 2 },
	{ d: 4, n: 'Virginia Beach / Hilltop', i: 27 },
	{ d: 4, n: 'Williamsburg', i: 23 },
	// Bristol
	{ d: 5, n: 'Abingdon', i: 62 },
	{ d: 5, n: 'Bristol', i: 65 },
	{ d: 5, n: 'Clintwood', i: 63 },
	{ d: 5, n: 'Galax', i: 67 },
	{ d: 5, n: 'Gate City', i: 58 },
	{ d: 5, n: 'Jonesville', i: 59 },
	{ d: 5, n: 'Lebanon', i: 64 },
	{ d: 5, n: 'Marion', i: 61 },
	{ d: 5, n: 'Norton', i: 60 },
	{ d: 5, n: 'Pulaski', i: 68 },
	{ d: 5, n: 'Tazewell', i: 69 },
	{ d: 5, n: 'Vansant', i: 66 },
	{ d: 5, n: 'Wytheville', i: 70 }
];

//------------------------------------------------
var d=document;
var b=d.getElementsByTagName('body')[0];
var cL = 0;

var div = b.appendChild(d.createElement('div'));
	div.style.backgroundColor = '#ff9999';
	div.style.border = '1px solid black';
	div.style.zIndex = '999';
	div.style.position = 'absolute';
	div.style.top = '115px';
	div.style.right = '5px';
	div.style.fontFamily = 'Arial';
	div.style.fontSize = '12px';
	div.style.cursor = 'pointer';
	div.style.margin = 0;
	div.style.padding = '3px';
	div.innerHTML = 'Show Wait Times';
	div.addEventListener('click', function(event) {
		d.getElementById('rightside').style.visibility = 'hidden';
		d.getElementById('waitTimes').style.visibility = 'visible';
		d.getElementById('waitTimes').style.display = 'block';
		this.style.visibility = 'hidden';
		processLoc();
	}, true);

var div = b.appendChild(d.createElement('div'));
	div.setAttribute('id','waitTimes');
	div.style.backgroundColor = 'white';
	div.style.border = '1px solid black';
	div.style.position = 'absolute';
	div.style.top = '5px';
	div.style.right = '5px';
	div.style.fontFamily = 'Arial';
	div.style.fontSize = '10px';
	div.style.padding = '5px';
	div.style.visibility = 'hidden';
	div.style.display = 'none';


for (var i=0;i<districts.length;i++) {
	var h3 = div.appendChild(d.createElement('h3'));
		h3.appendChild(d.createTextNode(districts[i]));
		h3.style.margin = 0;
		h3.style.padding = 0;
		h3.style.fontSize = '12px';
	var bc = div.appendChild(d.createElement('blockquote'));
		bc.style.margin = 0;
		bc.style.padding = 0;
		bc.style.textAlign = 'right';
		bc.setAttribute('id','bc'+i);
}

function processLoc() {
	if (!locations[cL]) return;
	var bc = d.getElementById('bc'+ locations[cL].d);
	var p = bc.appendChild(d.createElement('p'));
	var a = p.appendChild(d.createElement('a'));
		a.appendChild(d.createTextNode(locations[cL].n));
		a.href = lURL + locations[cL].i;
	var s = p.appendChild(d.createElement('span'));
		s.setAttribute('id',locations[cL].n.replace(/\s/g,'_'));
	GM_xmlhttpRequest({
		method: 'GET',
		url: lURL+locations[cL].i,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible)',
			'Accept': 'application/atom+xml,application/xml,text/xml'
		},
		onload: function(responseDetails) {
			cL++;
			var loc  = responseDetails.responseText;
				loc  = loc.replace(/[\r\n]/g,'').replace(/.*<div id="group"><h1>/,'').replace(/ Customer Service Center.*/,'').replace(/\s/g,'_');
			var time = responseDetails.responseText;
			if (!time.match(/id="large"/)) {
				d.getElementById(loc).innerHTML = ' <span style="color: red;">NA</span>';
			} else {
				time = time.replace(/[\r\n]/g,'').replace(/.*<table id="large">.+?<b>.+?<\/b>.+?<td>\s+(.+?)<\/td>.*/g,'$1');
				time = time.replace(/[a-z]/ig,'').replace(/\s*$/,'').replace(/\s+/g,':');
				d.getElementById(loc).innerHTML = ' <span style="color: red;">'+ (time==''?'NA':time) +'</span>';
			}
			processLoc();
		}
	});
}

