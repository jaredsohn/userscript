// ==UserScript==
// @name           WF Map Helper
// @namespace      http://www.nowhere.com
// @description    A script to help you navigate empire controlled ships (version 2)
// @include        http://*.war-facts.com/extras/view_universe.php?*// @include        http://*.war-facts.com/fleet_navigation.php?*
// ==/UserScript==
function calcDistance(A,B) {
	var A = A.replace(/[a-z ()]/gi,"").split(",");	var B = B.replace(/[a-z ()]/gi,"").split(",");
	var distance = Math.round(Math.sqrt(Math.pow(A[0]-B[0],2)+Math.pow(A[1]-B[1],2)+Math.pow(A[2]-B[2],2))*4000);
	return distance;
}
function addcommas(num) {
	var newn = '';
	while (num.length > 3) {
		newn += ',' + num.substring(num.length - 3);
		num = num.substring(0, num.length - 3);
	}
	newn = num + newn;
	return newn;
}function getURLParam(strParamName) {
	var strReturn = "";
	var strHref = window.location.href;
	if ( strHref.indexOf("?") > -1 ) {
		var strQueryString = strHref.substr(strHref.indexOf("?"))//.toLowerCase();
		var aQueryString = strQueryString.split("&");		for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){			if (aQueryString[iParam].indexOf(strParamName + "=") > -1 ){				var aParam = aQueryString[iParam].split("=");				strReturn = aParam[1].replace(/\+/g," ");				break;			}
		}	}
	return unescape(strReturn);
}

// Meat and Potatoesif ( window.location.href.search("fleet_navigation.php") > 0 ) {
	// Lets make sure we're not moving.
	var objTransitCheck = document.evaluate("//b[text()='In Transit']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	objTransitCheck = objTransitCheck.iterateNext();
	if (objTransitCheck) { return }
	// Get the main <p> tag containing everything
	var fleetmain = document.getElementsByName('form2')[0].parentNode.parentNode.parentNode.parentNode.parentNode;
	// Get the fleet's name
	var fleetname = fleetmain.getElementsByTagName('strong')[0].innerHTML.replace(/<\/?[^>]+>/gi, '').replace(/^\s*|\s*$/g,"");
	// Get the cell with the Coordinates in it	var coords_cell = fleetmain.getElementsByTagName('table')[0].getElementsByTagName('table')[0].rows[1].cells[3];	// Get the Global coordinates
	var coords_link = document.evaluate("//td[(child::text() = 'Fleet Coordinates:')]/following-sibling::node()/a[contains(text(),'global')]", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();	var global_coords = coords_link.innerHTML.replace(/[a-z ]/gi,"");	// Modify the map link	coords_link.href = coords_link.href.substring(0,coords_link.href.length-3)+"&fleetpos="+global_coords+"&fleetname="+fleetname.replace(/'/g,"\\'")+coords_link.href.substring(coords_link.href.length-3,coords_link.href.length);} else if ( window.location.href.search("view_universe.php") > 0 && getURLParam('fleet') && unsafeWindow.mscroll) {
// Javascript Map
	var modx = unsafeWindow.modx;
	var mody = unsafeWindow.mody;
	var modz = document.getElementsByName('newz')[0];
	
	//window.addEventListener('resize',function(){var view = document.getElementsByTagName('div')[0];view.style.width = document.width;view.style.height = document.height;alert(document.body.offsetHeight)},false);	
	function updateDistance() {
		var txt = addcommas(String(calcDistance(getURLParam('fleetpos'),modx.value+","+mody.value+","+modz.value)))+"km<br/>"+getURLParam('fleetname');		distance.innerHTML = txt.fontsize(2)
	}
	
	var distance = document.createElement('div');
	distance.id = "GM_WF_MapHelper_distance";
	distance.style.position = "absolute";
	distance.style.top = "30";
	distance.style.left = "10"	document.body.appendChild(distance);
	updateDistance();
	
	
	// Make the distance update when you let go of the mouse button
	unsafeWindow.document.onmouseup = function() {
		updateDistance();
		unsafeWindow.document.onmousemove = null;
		unsafeWindow.init = 0;
	}
	
	// Fix the loading issue where fleetname and fleetpos are no longer available
	var navform = document.getElementById('navigation');

	var fpos = document.createElement('input');
	fpos.type = "hidden";
	fpos.name = "fleetpos";
	fpos.value = getURLParam('fleetpos');
	navform.appendChild(fpos);
	
	var fname = document.createElement('input');
	fname.type = "hidden";
	fname.name = "fleetname";
	fname.value = getURLParam('fleetname');
	navform.appendChild(fname);
	} else if ( window.location.href.search("view_universe.php") > 0 && getURLParam('fleet')) {// CSS Map
	var nav = document.getElementsByTagName('table')[0].getElementsByTagName('a');	for (var i = 0; i < nav.length; i++) {		nav[i].href += "&fleetpos="+getURLParam('fleetpos')+"&fleetname="+getURLParam('fleetname');	}	var distance = document.createElement('div');	var txt = addcommas(String(calcDistance(getURLParam('fleetpos'),getURLParam('x')+","+getURLParam('y')+","+getURLParam('z'))))+"km<br/>"+unescape(getURLParam('fleetname'));	distance.innerHTML = txt.fontsize(2)	distance.style.marginTop=20;	distance.style.marginLeft=2;	document.body.appendChild(distance);}