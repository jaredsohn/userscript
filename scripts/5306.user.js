// ==UserScript==
// @name          UrMap Plus
// @version	  2.5
// @description   Display geotagged Flickr photos and Google Maps in UrMap
// @namespace     http://webdev.yuan.cc/
// @include       http://www.urmap.com/*
// @include       http://www.urmap.com.tw/*
// @exclude       http://www.urmap.com/SearchEngine/*
// @exclude       http://www.urmap.com.tw/SearchEngine/*

// Author: ckyuan@gmail.com
//
// ==/UserScript==


(function() {

    function _gt(e) { return document.getElementsByTagName(e); }
    function _gi(e) { return document.getElementById(e); }
    function _ce(e) { return document.createElement(e); }
    function _ct(e) { return document.createTextNode(e); }

    if(unsafeWindow) w = unsafeWindow;
    else w = window;

    Umap = w._Umap;

    w.document.write = function(str) {
	var div = document.createElement('div');
	div.innerHTML = str;
	document.body.appendChild(div);
    }

    var last_x=last_y=-1,myMapApp,flickrPanel,flickrPhotos,flickrPhoto,tags,nsid,username,pages=1,page=1;
    var latlon=false,twd97=true,gmap_click=gearth_click=addtags_click=false,lat_dd,lon_dd;
    var auth_token,auth_nsid,auth_username,authenticated=false,mode=1,photostream;
    var photos = new Array();

    var js = _ce("script");
    js.language = "javascript";
    js.src = "http://webdev.yuan.cc/gmif/maps2.js";
    document.body.appendChild(js);
    var js2 = _ce("script");
    js2.language = "javascript";
    js2.src = "http://webdev.yuan.cc/maps/urmap.js";
    document.body.appendChild(js2);
    var js3 = _ce("script");
    js3.language = "javascript";
    js3.src = "http://webdev.yuan.cc/lib/md5.js";
    document.body.appendChild(js3);

//  Add "Convert to TWD97" to the toolbox
//    var info = _ce('span');
    var go = _ce('a');
    go.innerHTML = 'Convert to TWD97';
    go.href = 'javascript:;';
    go.style.marginRight = '10px';
    go.handler = function() {
	coords.innerHTML = '<b>Datum: TWD97</b><br />X=' + w.a.y;
	coords.innerHTML += ' Y=' + w._Umap.getCenter().lng();
	showLoadingMessage('Convert coords...');
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://webdev.yuan.cc/maps/twd_conv.php?y='+Umap.getCenter().lng()+'&x='+w.a.y+'&method=TM2TOLATLON&coords=TM2',
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
		'Accept': 'application/atom+xml,application/xml,text/xml,text/plain',
	    },
	    onload: function(responseDetails) {
		hideLoadingMessage();
		var parser = new w.DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

		var crds = dom.getElementsByTagName('coords');
		for(var i=0;i<crds.length;i++) {
		    if( crds[i].getAttribute('format') == 'TM2' ) {
			x = 1*crds[i].getElementsByTagName('x').item(0).firstChild.data;
			y = 1*crds[i].getElementsByTagName('y').item(0).firstChild.data;
		    }
		    if( crds[i].getAttribute('format') == 'DMS' ) {
			lat_dms = crds[i].getElementsByTagName('lat').item(0).firstChild.data;
			lon_dms = crds[i].getElementsByTagName('lon').item(0).firstChild.data;
		    }
		    if( crds[i].getAttribute('format') == 'D.d' ) {
			lat_dd = 1*crds[i].getElementsByTagName('lat').item(0).firstChild.data;
			lon_dd = 1*crds[i].getElementsByTagName('lon').item(0).firstChild.data;
			lat_dd = Math.round(lat_dd * 1000000) / 1000000.0;
			lon_dd = Math.round(lon_dd * 1000000) / 1000000.0;
		    }
		}
		var links = dom.getElementsByTagName('links');
		for(var i=0;i<links.length;i++) {
		    if( links[i].getAttribute('resource') == 'GMAPS' ) gmap = links[i].firstChild.data;
		    if( links[i].getAttribute('resource') == 'URMAP' ) urmap = (links[i].firstChild) ? links[i].firstChild.data : '';
		}

		coords.innerHTML = '<b>Datum: TWD97</b><br />Lon=' + lon_dd + ' Lat=' + lat_dd + '<br />X=' + x + ' Y=' + y;
//		info.innerHTML = 'Link to <a href="' + gmap + '&spn=0.024971,0.038242&t=k&hl=en">Google Maps</a>';
		google.url = gmap + '&spn=0.024971,0.038242&t=k&hl=en';
		twd97 = true;
		latlon = true;
		if( gmap_click ) {
		    myMapApp.setCenter(new w.GLatLng(lat_dd, lon_dd), 7+w.a.e);
		    gmap_click = false;
		}
		if( gearth_click ) {
		    flyto(lon_dd,lat_dd);
		    gearth_click = false;
		}
		if( addtags_click ) {
		    addGeoTags();
		    addtags_click = false;
		}
	    }
	});
    }
    go.addEventListener('click', go.handler, true);
    var inspt = _gi('toolbarDiv');
//    inspt.insertBefore(go, inspt.firstChild);

//  Add update script link
    var qform = _gi('queryForm');
    var update_script = _ce('span');
    update_script.style.marginLeft = '20px';
    update_script.innerHTML = '<span style="margin-right:10px;"><a href="http://webdev.yuan.cc/greasemonkey/urmap.plus.about.php" title="About UrMap Plus" target="_blank">About UrMap Plus</a></span>';
    update_script.innerHTML += '<span style="margin-right:10px;"><a href="http://webdev.yuan.cc/greasemonkey/urmap.plus.user.js" title="Right-Click to update UrMap Plus script">Update UrMap Plus</a></span>';
    update_script.innerHTML += '<span style="margin-right:10px;"><a href="http://webdev.yuan.cc/maps/UrMap.kmz" title="Download UrMap location for Google Earth">UrMap for Google Earth</a></span>';
//    qform.appendChild(update_script);
//    inspt.insertBefore(update_script, inspt.firstChild);
    inspt.appendChild(update_script);


//  Add coords box
    var map = _gi('mapDiv');
    var coords = _ce('div');
    coords.style.position = 'absolute';
    coords.style.textAlign = 'left';
    coords.style.top = '10px';
    coords.style.left = '50px';
    coords.style.zIndex = 10000;
    coords.style.padding = '5px';
    coords.style.border = '1px solid #000';
    coords.style.color = '#4358c6';
    coords.style.font = '11px tahoma';
    coords.style.background = 'transparent';
    coords.style.background = '#dbe6f3';
    coords.innerHTML = 'Coords here... ';
    map.appendChild(coords);

//  Add cross cursor above the center of maps
    var cursor = _ce('div');
    cursor.style.position = 'absolute';
    cursor.style.width = '41px';
    cursor.style.height = '41px';
    cursor.style.zIndex = 21000;
//    cursor.style.border = '0px solid #ff0000';
    cursor.innerHTML = '<div style="position:absolute;width:19px;height:19px;border-right:1px solid #ff0000;border-bottom:1px solid #ff0000;"></div><div style="position:absolute;width:19px;height:19px;top:19px;left:19px;border-left:1px solid #ff0000;border-top:1px solid #ff0000;"></div><div id="cursorphoto" style="position:absolute;width:50px;height:50px;top:-5px;left:-5px;z-index:22000"></div>';
    map.appendChild(cursor);
    var showCursor = function() {
//	var mh = ''+map.style.height;
//	var mw = ''+map.style.width;
//	mh = 1*mh.replace(/px/,'');
//	mw = 1*mw.replace(/px/,'');
	var mh = map.clientHeight;
	var mw = map.clientWidth;
	cursor.style.top = Math.round(mh/2-20) + 'px';
	cursor.style.left = Math.round(mw/2-20) + 'px';
	map.removeEventListener('mouseover', showCursor, true);
    }
//    map.addEventListener('resize', showCursor, true);
    _gi('toggleInfoLink').addEventListener('click', function() { map.addEventListener('mouseover', showCursor, true); }, true);
    _gi('toggleHeaderLink').addEventListener('click', function() { map.addEventListener('mouseover', showCursor, true); }, true);
    w.window.addEventListener("resize",showCursor,true);


//  Add Google Maps div
    var google = _ce('a');
    google.setAttribute('style', 'border: 1px solid rgb(148, 148, 148); padding: 2px; background: white none repeat scroll 0%; position: absolute; right: 5px; top: 5px; z-index: 40; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; font-size: 12px; color: rgb(90, 89, 89); cursor: pointer; text-decoration: none;');
    google.style.position = "absolute";
    google.style.zIndex = "40";
    google.style.right = '184px';
    google.style.top = "5px";
    google.href = 'javascript:;';
    google.innerHTML = 'Google Maps';
    google.onclickHandler = function() {

	var lat = w._Umap.getCenter().lat();
	var lon = w._Umap.getCenter().lng();
	if( w.gmap_container.show ) w.gmap_container.style.display = 'none';
	else w.gmap_container.style.display = 'block';
	if ( !w.gmap_container.initialized && w.GBrowserIsCompatible()) {
//	    myMapApp = new w._MapsApplication(w.gmap, w.panel, w.metapanel, w.permalink, w.printheader, w.createMapSpecs());
//	    myMapApp.loadMap();
//	    myMapApp.map.setMapType(w.G_SATELLITE_TYPE);
	    myMapApp = new w.GMap2(w.gmap);
	    myMapApp.addControl(new w.GLargeMapControl());
	    myMapApp.addControl(new w.GMapTypeControl());
//	    myMapApp.setMapType(w.G_SATELLITE_MAP);
	    w.gmap.map = myMapApp;
	    w.gmap_container.initialized = true;
	}
	if ( w.gmap_container.initialized ) w.gmap.resizeMap(myMapApp);
	w.gmap_container.show = !w.gmap_container.show;
	gmap_click = true;
//	if(!latlon) go.handler();
//	else myMapApp.setCenter(new w.GLatLng(lat_dd, lon_dd), 10-w.a.e);
	myMapApp.setCenter(new w.GLatLng(lat, lon), 7+w._Umap.getZoomLevel());
    }
    google.addEventListener('click', google.onclickHandler, true);
    _gi('mapDiv').appendChild(google);

//  Add Google Earth div
    var flyto = function(lon,lat) {
//	document.location = 'http://webdev.yuan.cc/maps/ge.php?BBOX=' + lon + ',' + lat + ',' + lon + ',' + lat;
	document.location = 'http://webdev.yuan.cc/gmif/makeKML.php?src=UrMap&lon=' + lon + '&lat=' + lat + '&img=http://www.urmap.com/SearchEngine/img2/logo2.gif';
    }
    var gearth = _ce('a');
    gearth.setAttribute('style', 'border: 1px solid rgb(148, 148, 148); padding: 2px; background: white none repeat scroll 0%; position: absolute; right: 5px; top: 5px; z-index: 40; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; font-size: 12px; color: rgb(90, 89, 89); cursor: pointer; text-decoration: none;');
    gearth.style.position = "absolute";
    gearth.style.zIndex = "40";
    gearth.style.right = '264px';
    gearth.style.top = "5px";
    gearth.href = 'javascript:;';
    gearth.innerHTML = 'Google Earth';
    gearth.onclickHandler = function() {
	var lat = w._Umap.getCenter().lat();
	var lon = w._Umap.getCenter().lng();
	gearth_click = true;
//	if(!latlon) go.handler();
	flyto(lon, lat);
    }
    gearth.addEventListener('click', gearth.onclickHandler, true);
    _gi('mapDiv').appendChild(gearth);

//  Add event handlers to show TM2 coords value
    var showTM2 = function() {
	if(!w._Umap) return;
	var lat = w._Umap.getCenter().lat();
	var lon = w._Umap.getCenter().lng();
	lat = Math.round(lat * 1000000) / 1000000.0;
	lon = Math.round(lon * 1000000) / 1000000.0;
	if( last_x == lon && last_y == lat ) return;
//	twd97 = false;
	latlon = false;
//	coords.innerHTML = '<b>Datum: TWD97</b><br />';
	coords.innerHTML = 'Lat = ' + lat + '<br />';
	coords.innerHTML += 'Lon = ' + lon;
	last_x = lon;
	last_y = lat;
    }
    map.addEventListener('dblclick', showTM2, true);
    map.addEventListener('mousedown', showTM2, true);
    map.addEventListener('mouseup', showTM2, true);
    map.addEventListener('mousemove', showTM2, true);
    showTM2();

    var showLoadingMessage = function(message) {
	var loadingMessage;
	if (message) loadingMessage = message;
	else loadingMessage = "Loading...";
	var disabledZone = _gi('disabledZone');
	if (!disabledZone) {
	    disabledZone = document.createElement('div');
	    disabledZone.setAttribute('id', 'disabledZone');
	    disabledZone.style.position = "absolute";
	    disabledZone.style.zIndex = "1000";
	    disabledZone.style.left = "0px";
	    disabledZone.style.top = "0px";
	    disabledZone.style.width = "100%";
	    disabledZone.style.height = "100%";
	    document.body.appendChild(disabledZone);
	    var messageZone = document.createElement('div');
	    messageZone.setAttribute('id', 'messageZone');
	    messageZone.style.position = "absolute";
	    messageZone.style.top = "0px";
	    messageZone.style.right = "0px";
	    messageZone.style.background = "red";
	    messageZone.style.color = "white";
	    messageZone.style.fontFamily = "Arial,Helvetica,sans-serif";
	    messageZone.style.padding = "4px";
	    disabledZone.appendChild(messageZone);
	    var text = document.createTextNode(loadingMessage);
	    messageZone.appendChild(text);
	} else {
	    _gi('messageZone').innerHTML = loadingMessage;
	    disabledZone.style.visibility = 'visible';
	}
    }
    var hideLoadingMessage = function() {
	_gi('disabledZone').style.visibility = 'hidden';
    }
    var selectPhotos = function(mode) {
	var html=m1=m2=m3='';
	switch(mode) {
	    case 1: m1 = 'selected'; break;
	    case 2: m2 = 'selected'; break;
	    case 3: m3 = 'selected'; break;
	}
	html += '<div style="text-align:right">';
	html += '<select id="selectphotos" style="font-family:arial;font-size:x-small;margin-right:10px">';
	html += '	<option value="">Select Photostream</option>';
	html += '	<option value="my photos" ' + m1 + '>My photos</option>';
	html += '	<option value="geotagged taiwan" ' + m2 + ' >Geotagged Taiwan</option>';
	html += '	<option value="geotagged flickr" ' + m3 + ' >Geotagging Flickr</option>';
	html += '</select>';
	html += '</div>';
	return html;
    }
    var onChangeSelPhotos = function() {
	if( this.value == '' ) return;
	if( this.value == 'my photos' ) {
	    mode = 1;
	    photostream = auth_nsid;
	    searchPhotos(auth_nsid,1,mode);
	}
	if( this.value == 'geotagged taiwan' ) {
	    mode = 2;
	    photostream = '66961499@N00';
	    searchPhotos(photostream,1,mode);
	}
	if( this.value == 'geotagged flickr' ) {
	    mode = 3;
	    photostream = '94823070@N00';
	    searchPhotos(photostream,1,mode);
	}
    }
    var checkFlickrAuth = function() {
        var url = 'http://flickr.com/services/auth/?api_key=52694df4c74c61a95a898754a5ae610f&perms=write&api_sig=49675f7f091a3add615e46a0f911dd04';
	showLoadingMessage('Login Flickr...');
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
                'Accept': 'application/atom+xml,application/xml,text/xml,text/plain,text/html',
            },
            onload: function(responseDetails) {
//		alert(responseDetails.responseText);
		hideLoadingMessage();
                var parser = new w.DOMParser();
                var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var rsp = dom.getElementsByTagName('rsp');
		if( !dom || rsp.length == 0 ) {
		    GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://webdev.yuan.cc/flickr/auth.php',
			headers: {
			    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
			    'Accept': 'application/atom+xml,application/xml,text/xml,text/plain,text/html',
			},
			onload: function(responseDetails) {
			}
		    });
		    return;
		}
		if( rsp[0].getAttribute('stat') == 'ok' ) {
		    authenticated = true;
		    auth_token = dom.getElementsByTagName('token').item(0).firstChild.data;
		    auth_nsid = dom.getElementsByTagName('user').item(0).getAttribute('nsid');
		    auth_username = dom.getElementsByTagName('user').item(0).getAttribute('username');
		    flickrPanel.innerHTML = 'Logged in Flickr as ' + auth_username + ' ';
		    nsid = auth_nsid;
		    searchPhotos(auth_nsid,1,1);
		} else return;
            }
        });
    }
//  checkFlickrAuth();

//  Add flickr photos to map
    w.flickr = function() {
	var infoPanel = _gi('infoDiv');
	var tmpdivs = infoPanel.getElementsByTagName('div');

	if( tmpdivs.length == 0 ) return;
	clearInterval(flickr_handler);
//	for(var i=0;i<tmpdivs.length;i++) {
//	    if( tmpdivs[i].className == 'tabArea' ) tabArea = tmpdivs[i];
//	    if( tmpdivs[i].className == 'tabBodyArea' ) tabBodyArea = tmpdivs[i];
//	}

	showCursor();
	tabArea = _gi('tabDiv').firstChild;
	tabBodyArea = tabArea.nextSibling;
	var flickrTab = _ce('div');
	flickrTab.setAttribute('style', 'border: 1px solid rgb(136, 136, 255); margin: 0px 3px; padding: 2px 5px 1px; background: transparent none repeat scroll 0%; float: left; height: 15px; cursor: pointer; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;');
	flickrTab.className = 'tab tabOff';
	flickrTab.innerHTML = 'Flickr';
	flickrTab.onclickHandler = function() {
	    flickrBody.style.display = 'block';
	    cursor.style.display = 'block';
	    _gi('listDiv').style.display = 'none';
	    _gi('routingDiv').style.display = 'none';
	    _gi('poiDiv').style.display = 'none';
	    _gi('detailDiv').style.display = 'none';
	    var tmpdivs = tabArea.getElementsByTagName('div');
	    for(var i=0;i<tmpdivs.length;i++) {
		if( tmpdivs[i].className == 'tab tabOn' ) 
		    tmpdivs[i].className = 'tab tabOff';
	    }
	    flickrTab.className = 'tab tabOn';
	    if( authenticated ) {
		flickrPanel.innerHTML = 'Logged in Flickr as ' + auth_username + ' ';
	    } else {
		flickrPanel.innerHTML = 'To geotag photos, please <a href="http://www.flickr.com/services/auth/?api_key=52694df4c74c61a95a898754a5ae610f&perms=write&api_sig=49675f7f091a3add615e46a0f911dd04">login flickr</a> first.';
	    }
	}
	flickrTab.onblurHandler = function() {
	    cursor.style.display = 'none';
	    flickrBody.style.display = 'none';
	    flickrTab.className = 'tab tabOff';
	}
	flickrTab.addEventListener('click', flickrTab.onclickHandler, true);
	var tmpdivs = tabArea.getElementsByTagName('div');
	for(var i=0;i<tmpdivs.length;i++) 
	    tmpdivs[i].addEventListener('click', flickrTab.onblurHandler, true);

	var flickrBody = _ce('div');
	flickrBody.className = 'tabBody';
	flickrBody.id = 'flickrTab';
	flickrBody.style.display = 'none';
	flickrBody.style.textAlign = 'center';

	tabArea.appendChild(flickrTab);
	tabBodyArea.appendChild(flickrBody);

	flickrPanel = _ce('div');
	var flickrSearch = _ce('div');
	flickrPhotos = _ce('div');
	flickrPhoto = _ce('div');
	flickrBody.appendChild(flickrPanel);
	flickrBody.appendChild(flickrSearch);
	flickrBody.appendChild(flickrPhotos);
	flickrBody.appendChild(flickrPhoto);

	flickrPanel.style.background = '#e8f2fd';
	flickrPanel.style.textAlign = 'left';
	flickrPanel.style.color = '#0070d7';
	flickrPanel.style.fontSize = 'small';
	flickrPanel.style.fontFamily = 'arial';
	flickrPanel.style.padding = '4px';
	flickrPanel.style.margin = '5px 5px 1px 5px';
	
	flickrSearch.style.background = '#e8f2fd';
	flickrSearch.style.textAlign = 'left';
	flickrSearch.style.color = '#0070d7';
	flickrSearch.style.fontSize = 'x-small';
	flickrSearch.style.fontFamily = 'arial';
	flickrSearch.style.padding = '2px';
	flickrSearch.style.margin = '0px 5px 5px 5px';
	flickrSearch.innerHTML = '<span><strong>Search Filter: </strong>';
	flickrSearch.innerHTML += '<input type=radio id="flickrtag2" name="flickrtag" value="all"><label for="flickrtag2"> All</label></span>';
	flickrSearch.innerHTML += '<input type=radio id="flickrtag1" name="flickrtag" checked value="geotagged"><input type="text" id="searchtags" name="tags" value="geotagged" style="font-family:arial;font-size:x-small" size="20"><br />';
//	flickrSearch.innerHTML += '<input type=radio id="flickrtag1" name="flickrtag" checked value="geotagged"><label for="flickrtag1"> Geotagged </label><br />';
	flickrSearch.innerHTML += '<span><strong>http://flickr.com/photos/';
	flickrSearch.innerHTML += '<input type=text id="flickruser" style="font-family:arial;font-size:x-small" size=8>/</strong> ';
	flickrSearch.innerHTML += '<input type=button id="flickrsearch" style="font-family:arial;font-size:x-small" value="Search"></span>';

	flickrPhoto.style.padding = '0px';
	flickrPhoto.style.margin = '5px 0px 0px 0px';

	_gi('flickrsearch').addEventListener('click', searchUser, true);
	_gi('flickruser').addEventListener('change', searchUser, true);
	_gi('flickrtag1').addEventListener('click', searchPhotos, true);
	_gi('flickrtag2').addEventListener('click', searchPhotos, true);
	_gi('searchtags').addEventListener('change', searchPhotos, true);
	checkFlickrAuth();
    }
    var flickr_handler = setInterval("flickr()", 500);

    var searchUser = function() {
	username = _gi('flickruser').value;
	var url = 'http://www.flickr.com/photos/' + username + '/';
	showLoadingMessage('Search user...');
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://flickr.com/services/rest/?method=flickr.urls.lookupUser&api_key=bc60075f4ce963fab3fac473d0741fe8&url=' + url,
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
		'Accept': 'application/atom+xml,application/xml,text/xml,text/plain',
	    },
	    onload: function(responseDetails) {
		hideLoadingMessage();
		flickrPhoto.innerHTML = '';
		var parser = new w.DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var users = dom.getElementsByTagName('user');
		if( users.length == 0 ) {
		    alert('No such user');
		    return;
		}
		nsid = users[0].getAttribute('id');
		searchPhotos(nsid,1,1);
	    }
	});
    }

    var searchPhotos = function(userid,page,mode) {
	if( page == undefined || mode == undefined ) {
	    mode = 1;
	    userid = nsid;
	    page = 1;
	}
	if( userid == undefined ) userid = '';
	if(mode == 1) {
	    var str = '' + _gi('searchtags').value;
	    tags = str.replace(/ +/,',');
	    if( _gi('flickrtag1').checked ) tags = '&tag_mode=all&tags=' + tags;
	    if( _gi('flickrtag2').checked ) tags = '';
	    if( tags == '' && userid == '' ) {
		alert('Plesae input username or tags.');
		return;
	    }
	    var url = 'http://flickr.com/services/rest/?method=flickr.photos.search&api_key=bc60075f4ce963fab3fac473d0741fe8&user_id=' + userid + tags + '&per_page=20&page=' + page;
	}
	if(mode==2 || mode==3) {
	    var url = 'http://flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=bc60075f4ce963fab3fac473d0741fe8&group_id=' + userid + '&per_page=20&page=' + page;
	}
	showLoadingMessage('Loading photos...');
	// alert(mode + ',' + url);
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: url,
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
		'Accept': 'application/atom+xml,application/xml,text/xml,text/plain',
	    },
	    onload: function(responseDetails) {
		// alert(responseDetails.responseText);
		hideLoadingMessage();
		var i,id;
		var parser = new w.DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		if( dom.getElementsByTagName('photos').length ) 
		    pages = 1*dom.getElementsByTagName('photos')[0].getAttribute('pages');
		else return;
		var _photos = dom.getElementsByTagName('photo');
		flickrPhotos.innerHTML = selectPhotos(mode);
		for(i=0;i<_photos.length;i++) {
		    id = _photos[i].getAttribute('id');
		    photos[id] = new Object();
		    photos[id].id = id;
		    photos[id].lat = -1;
		    photos[id].lon = -1;
		    photos[id].owner = _photos[i].getAttribute('owner');
		    photos[id].secret = _photos[i].getAttribute('secret');
		    photos[id].server = _photos[i].getAttribute('server');
		    photos[id].title = _photos[i].getAttribute('title');
		    photos[id].img_s = 'http://static.flickr.com/' + photos[id].server + '/' + id + '_' + photos[id].secret + '_s.jpg';
		    photos[id].img_m = 'http://static.flickr.com/' + photos[id].server + '/' + id + '_' + photos[id].secret + '_m.jpg';
		    photos[id].url = 'http://www.flickr.com/photos/' + photos[id].owner + '/' + id + '/';
		    flickrPhotos.innerHTML += '<a href="javascript:;" id="flickr_'+id+'" flickr="'+id+'" title="'+ photos[id].title +'"><img src="' + photos[id].img_s + '" alt="' + photos[id].title + '" border=0 width=50 height=50 style="margin:1px 1px 1px 1px;-moz-opacity:0.8;" onmouseover="this.style.MozOpacity=1" onmouseout="this.style.MozOpacity=0.8" /></a>';
		}
		var _page = _ce('div');
		_page.style.margin = '5px';
		_page.style.fontFamily = 'arial';
		_page.style.fontSize = 'small';
		_page.innerHTML = pager(page,pages);
		w.changePage = function(p) {
		    page = p;
		    if(mode==1) searchPhotos(nsid,p,mode);
		    else searchPhotos(photostream,p,mode);
		}
		flickrPhotos.appendChild(_page);
		_gi('selectphotos').addEventListener('change', onChangeSelPhotos, true);

		for(i=0;i<_photos.length;i++) {
		    id = _photos[i].getAttribute('id');
		    _link = _gi('flickr_'+id);
		    _link.addEventListener('click', locatePhoto, true);
		}
	    }
	});
    }

    var convCoords = function(value) {

	var DMS = /^([\+\-]?)(\d{0,3})\.([0-5]?\d)\.([0-5]?\d)\.(\d+)$/;
	var DMm = /^([\+\-]?)(\d{0,3})\.([0-5]?\d)\.(\d+)$/;
	var Dd =  /^[\+\-]?\d{0,3}\.\d+$/;

	value = '' + value;
	if( DMS.test(value) ) {
	    a = DMS.exec(value);
	    value = ((1*('0.'+a[5]) + 1*a[4])/60 + 1*a[3] )/60 + 1*a[2];
	    if( a[1] == '-' ) value = -1*value;
	    return value;
	}
	if( DMm.test(value) ) {
	    a = DMm.exec(value);
	    value = a[3] + '.' + a[4];
	    value = (1*value)/60 + 1*a[2];
	    if( a[1] == '-' ) value = -1*value;
	    return value;
	}
	if( Dd.test(value) ) {
	    return 1*value;
	}
	return 1*value;
    }

    var addGeoTags = function() {
//	if( !latlon ) {
//	    addtags_click = true;
//	    go.handler();
//	    return;
//	}
	var lat_dd = w._Umap.getCenter().lat();
	var lon_dd = w._Umap.getCenter().lng();
	lat_dd = Math.round(lat_dd * 1000000) / 1000000.0;
	lon_dd = Math.round(lon_dd * 1000000) / 1000000.0;
	var photo_id = _gi('addtags').getAttribute('flickr');
	var newlocation = false;

	if( photos[photo_id].lon == lon_dd && photos[photo_id].lat == lat_dd ) return;
	if( photos[photo_id].lat == -1 ) var newlocation = true;

	photos[photo_id].lon = photos[photo_id].twd97_lon = lon_dd;
	photos[photo_id].lat = photos[photo_id].twd97_lat = lat_dd;
//	photos[photo_id].x = w.a.y;
//	photos[photo_id].y = Umap.getCenter().lng();
	photos[photo_id].datum = 'WGS84';
	var method = 'flickr.photos.addTags';
	var api_key = '52694df4c74c61a95a898754a5ae610f';
	var tags = 'geotagged geo:tool=urmap geo:tool=yuancc geo:lat=' +lat_dd+ ' geo:lon=' +lon_dd;
	var str = '2e2303df15cc90a7api_key' + api_key + 'auth_token' + auth_token + 'method' + method + 'photo_id' + photo_id + 'tags' + tags;
	var api_sig = w.hex_md5(str);
	var url = 'http://www.flickr.com/services/rest/?method=flickr.photos.addTags&api_key=' +api_key+ '&photo_id=' + photo_id + '&tags=' + tags + '&auth_token=' + auth_token + '&api_sig=' + api_sig;
	showLoadingMessage('Add tags...');
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
                'Accept': 'application/atom+xml,application/xml,text/xml,text/plain,text/html',
            },
            onload: function(responseDetails) {
		hideLoadingMessage();
                var parser = new w.DOMParser();
                var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		if( dom.getElementsByTagName('rsp')[0].getAttribute('stat') == 'ok' ) {
//		    alert('Geotags added!');
		    _gi('geotags').innerHTML = 'Coords: ' + photos[photo_id].lon + ', ' + photos[photo_id].lat;
		}
	    }
	});

	if( newlocation ) return;
	var method = 'flickr.photos.removeTag';
	var tag_id = photos[photo_id].tag_lat;
	var str = '2e2303df15cc90a7api_key' + api_key + 'auth_token' + auth_token + 'method' + method + 'tag_id' + tag_id;
	var api_sig = w.hex_md5(str);
	var url = 'http://www.flickr.com/services/rest/?method=flickr.photos.removeTag&api_key=' +api_key+ '&tag_id=' + tag_id + '&auth_token=' + auth_token + '&api_sig=' + api_sig;
//	showLoadingMessage('Remove tags...');
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
                'Accept': 'application/atom+xml,application/xml,text/xml,text/plain,text/html',
            },
            onload: function(responseDetails) {
//		hideLoadingMessage();
                var parser = new w.DOMParser();
                var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		if( dom.getElementsByTagName('rsp')[0].getAttribute('stat') != 'ok' ) {
		    alert('Warning: tag modified fails!');
		}
	    }
	});
	
	var tag_id = photos[photo_id].tag_lon;
	var str = '2e2303df15cc90a7api_key' + api_key + 'auth_token' + auth_token + 'method' + method + 'tag_id' + tag_id;
	var api_sig = w.hex_md5(str);
	var url = 'http://www.flickr.com/services/rest/?method=flickr.photos.removeTag&api_key=' +api_key+ '&tag_id=' + tag_id + '&auth_token=' + auth_token + '&api_sig=' + api_sig;
//	showLoadingMessage('Remove tags...');
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
                'Accept': 'application/atom+xml,application/xml,text/xml,text/plain,text/html',
            },
            onload: function(responseDetails) {
//		hideLoadingMessage();
                var parser = new w.DOMParser();
                var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		if( dom.getElementsByTagName('rsp')[0].getAttribute('stat') != 'ok' ) {
		    alert('Warning: tag modified fails!');
		}
	    }
	});
    }

    var locatePhoto = function(id,lat,lon) {
	if( lat == undefined ) {
	    var id = this.getAttribute('flickr');
	    var html='';
//	    html = '<h4>' + photos[id].title + '</h4>';
	    html += '<div style="padding:4px 4px 4px 4px;border:1px solid #444;background:#fff;margin:2px 5px 2px 5px;text-align:center;">';
	    html += '<a href="' + photos[id].url + '" target="_blank"><img src="' + photos[id].img_m + '" border=0 /></a>';
	    html += '<p style="margin:0px;padding:4px 0px 0px 0px"><span style="font-size:medium;font-weight:bolder;"><strong>' + photos[id].title + '</strong></span><br /><span id="geotags"></span>';
//	    if( authenticated )
	    html += '<br /><input id="addtags" type=button flickr="'+id+'" style="font-family:arial;font-size:x-small" value="Save Location">';
	    html += '</p></div>';
	    flickrPhoto.innerHTML = html;
//	    if( auth_nsid != nsid || mode!=1 ) _gi('addtags').disabled = true;
	    if( auth_nsid != photos[id].owner ) _gi('addtags').disabled = true;
//	    cursor.style.backgroundImage = 'url("' + photos[id].img_s + '")';
	    _gi('cursorphoto').innerHTML = '';
	    _gi('addtags').addEventListener('click', addGeoTags, true);
	    if( photos[id].lat == -1 ) {
		getLatLon(id);
		return;
	    }
	}
	if( lat != undefined && lon != undefined ) w._Umap.centerMap(new w.ULatLng(lat,lon));

        if( !photos[id].marker ) {
            var label = photos[id].title;
            var desc = '<div style="width:200px;font-size:10px"><img src="' + photos[id].img_s + '" width=50 height=50 align="left" /><b>' + photos[id].title + '</b><br />' + photos[id].lat + ', ' + photos[id].lon + '<br />';
            desc += (photos[id].taken) ? photos[id].taken.toGMTString() : '';
            desc += '<br clear="all"><p>' + photos[id].description + '</p>See <a href="javascript:;" onclick="_gi(\'searchtags\').value=\'geotagged\';changeTab(1);searchPhotos(\'' +photos[id].owner+ '\',1,1)">' + ((photos[id].username)? photos[id].username : 'owner') + '\'s geotagged photos</a>. <br /><a href="javascript:;" onclick="ping('+id+')">Ping Yuan.CC Maps</a>.</div>';
            var marker = new w.UMarker(new w.ULatLng(photos[id].lat, photos[id].lon),null,label,desc);
            marker.html = desc;
            marker.addListener('mouseover', function() {
                marker.openInfoWindow(marker.html);
//              map.centerAtLatLng(map.LatLng(photos[id].lat, photos[id].lon));
            });
            photos[id].marker = marker;
            w._Umap.addOverlay(marker);
        }
        photos[id].marker.openInfoWindow(photos[id].marker.html);

	return;

	if( photos[id].datum == 'TWD97' && photos[id].x != undefined ) {
	    w.a.ag(photos[id].x,photos[id].y,w.a.e);
	    if( myMapApp ) myMapApp.setCenter(new w.GLatLng(photos[id].twd97_lat, photos[id].twd97_lon), 7+w.a.e);
	    _gi('geotags').innerHTML = 'Coords: ' + photos[id].twd97_lon + ', ' + photos[id].twd97_lat;
	    _gi('cursorphoto').innerHTML = '<img src="' + photos[id].img_s + '" width=50 height=50 style="-moz-opacity:0.5;" onmouseover="this.style.MozOpacity=1" onmouseout="this.style.MozOpacity=0.5" />';
	    showTM2();
	    return;
	}

	showLoadingMessage('Convert coords...');
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://webdev.yuan.cc/maps/twd_conv.php?lat='+photos[id].lat+'&lon='+photos[id].lon+'&method=LATLONTOTM2&coords=LATLON',
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.6.4',
		'Accept': 'application/atom+xml,application/xml,text/xml,text/plain',
	    },
	    onload: function(responseDetails) {
		hideLoadingMessage();
		var parser = new w.DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var crds = dom.getElementsByTagName('coords');
		for(var i=0;i<crds.length;i++) {
		    if( crds[i].getAttribute('format') == 'TM2' ) {
			x = 1*crds[i].getElementsByTagName('x').item(0).firstChild.data;
			y = 1*crds[i].getElementsByTagName('y').item(0).firstChild.data;
		    }
		    if( crds[i].getAttribute('format') == 'DMS' ) {
			lat_dms = crds[i].getElementsByTagName('lat').item(0).firstChild.data;
			lon_dms = crds[i].getElementsByTagName('lon').item(0).firstChild.data;
		    }
		    if( crds[i].getAttribute('format') == 'D.d' ) {
			lat_dd = 1*crds[i].getElementsByTagName('lat').item(0).firstChild.data;
			lon_dd = 1*crds[i].getElementsByTagName('lon').item(0).firstChild.data;
		    }
		}
		var links = dom.getElementsByTagName('links');
		for(var i=0;i<links.length;i++) {
		    if( links[i].getAttribute('resource') == 'GMAPS' ) gmap = links[i].firstChild.data;
		    if( links[i].getAttribute('resource') == 'URMAP' ) urmap = (links[i].firstChild) ? links[i].firstChild.data : '';
		}

		photos[id].x = x;
		photos[id].y = y;
		photos[id].datum = 'TWD97';
		locatePhoto(id,lat_dd,lon_dd);
	    }
	});

    }

    var getLatLon = function(id) {

	var callback = function(result) {
	    hideLoadingMessage();
	    var parser = new w.DOMParser();
	    var dom = parser.parseFromString(result.responseText, "application/xml");
	    var pid = dom.getElementsByTagName('photo').item(0).getAttribute('id');

	    if(!photos[pid]) photos[pid] = new Object();
	    photos[pid].id = id;
	    photos[pid].lat = -1;
	    photos[pid].lon = -1;
	    photos[pid].owner = dom.getElementsByTagName('owner').item(0).getAttribute('nsid');
	    photos[pid].username = dom.getElementsByTagName('owner').item(0).getAttribute('username');
	    photos[pid].secret = dom.getElementsByTagName('photo').item(0).getAttribute('secret');
	    photos[pid].server = dom.getElementsByTagName('photo').item(0).getAttribute('server');
	    photos[pid].title = (dom.getElementsByTagName('title').item(0).firstChild) ? dom.getElementsByTagName('title').item(0).firstChild.data : '';
	    photos[pid].description = (dom.getElementsByTagName('description').item(0).firstChild) ? dom.getElementsByTagName('description').item(0).firstChild.data: '';
	    photos[pid].img_s = 'http://static.flickr.com/' + photos[pid].server + '/' + pid + '_' + photos[pid].secret + '_s.jpg';
	    photos[pid].img_m = 'http://static.flickr.com/' + photos[pid].server + '/' + pid + '_' + photos[pid].secret + '_m.jpg';
	    photos[pid].url = 'http://www.flickr.com/photos/' + photos[pid].owner + '/' + pid + '/';

	    var tags = dom.getElementsByTagName('tag');
	    for(var i=0; i<tags.length; i++) {
		var splits = tags[i].getAttribute('raw').split('=');
		if( splits[0] == 'geo:lat' ) { var lat = convCoords(splits[1]); var tag_lat = tags[i].getAttribute('id'); }
		if( splits[0] == 'geo:lon' || splits[0] == 'geo:long' ) { var lon = convCoords(splits[1]); var tag_lon = tags[i].getAttribute('id'); }
//		if( splits[0] == 'geo:datum' && ( splits[1] == 'TOKYO' || splits[1] == 'Tokyo' || splits[1] == 'tokyo' ) ) GMiF.datum = 'TOKYO';
	    }
	    if( lat != undefined && lon != undefined ) {
		photos[pid].tag_lat = tag_lat;
		photos[pid].tag_lon = tag_lon;
		photos[pid].lat = lat;
		photos[pid].lon = lon;
		photos[pid].twd97_lat = lat;
		photos[pid].twd97_lon = lon;
		photos[pid].datum = 'TWD97';
		locatePhoto(pid,lat,lon);
	    }
	}

	showLoadingMessage('Read photoinfo...');
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=bc60075f4ce963fab3fac473d0741fe8&photo_id=' + id,
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey GMap in Flickr',
		'Accept': 'application/atom+xml,application/xml,text/xml'
	    },
	    onload: callback
	});
    }

function pager(page,pages) {

    if( pages == 1 ) return '';

    var i, str='Page: ';

    if( pages > 1 && pages <= 10 ) {
        for(i=1; i<=pages; i++) {
            if( i==page ) str += '<a href="javascript:;"><font color=red><b>' + i + '</b></font></a> ';
            else str += '<a href="javascript:;" onClick="changePage('+i+')"><b>' + i + '</b></a> ';
        }
    } else if( pages>10 && page < 10 ) {
        for(i=1; i<=10; i++) {
            if( i==page ) str += '<a href="javascript:;"><font color=red><b>' + i + '</b></font></a> ';
            else str += '<a href="javascript:;" onClick="changePage(' + i + ')"><b>' + i + '</b></a> ';
        }
        i = Math.round((10+1*pages)/2);
        if( i != pages ) str += '...<a href="javascript:;" onClick="changePage(' + i + ')"><b>' + i + '</b></a>...';
        str += '<a href="javascript:;" onClick="changePage(' + pages + ')"><b>' + pages + '</b></a> ';
    } else if( pages>10 && page>=10 && page<(pages-5) ) {
        str += '<a href="javascript:;" onClick="changePage(' +1+ ')"><b>' + 1 + '</b></a>...';
        i = Math.round((page-2)/2);
        str += '<a href="javascript:;" onClick="changePage(' + i + ')"><b>' + i + '</b></a>...';
        for(i=(page-2); i<=(page+2); i++) {
            if( i==page ) str += '<a href="javascript:;"><font color=red><b>' + i + '</b></font></a> ';
            else str += '<a href="javascript:;" onClick="changePage(' + i + ') "><b>' + i + '</b></a> ';
        }
        i = Math.round((1*i+1*pages)/2);
        str += '...<a href="javascript:;" onClick="changePage(' + i + ')"><b>' + i + '</b></a> ';
        str += '...<a href="javascript:;" onClick="changePage(' + pages + ')"><b>' + pages + '</b></a> ';
    } else if( pages>10 && page>=10 & page>=(pages-5) ) {
        i = Math.round((page-2)/2);
        str += '<a href="javascript:;" onClick="changePage(' +1+ ')"><b>' + 1 + '</b></a>...';
        str += '<a href="javascript:;" onClick="changePage(' +i+ ')"><b>' + i + '</b></a>...';
        for(i=page-3; i<=pages; i++) {
            if( i==page ) str += '<a href="javascript:;"><font color=red><b>' + i + '</b></font></a> ';
            else str += '<a href="javascript:;" onClick="changePage(' + i + ')"><b>' + i + '</b></a> ';
        }
    }

    return str;
}


})();

