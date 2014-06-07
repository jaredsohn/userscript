// ==UserScript==
// @name           RetkikarttaYouloc
// @namespace      retkikartta
// @include        http://retkikartta.fi/*
// @include        http://www.retkikartta.fi/*
// ==/UserScript==

var youloc_timer;
var youloc_running = false;

var parseUrl = function() {
	var url = window.location.href;
	var vars = url.substring(url.indexOf('?')+1).split('&');
	settings = new Array;
	settings['areas'] = '';
	
	for (x=0;x < vars.length;x++) {
		v = vars[x].split('=');
		if (v.length != 2) {
			continue;
		}
		if (v[0] != 'areas' && v[0] != 'yu') {
			settings[v[0]] = parseFloat(v[1]);
		} else {
			settings[v[0]] = v[1];
		}
		
	}
	if (settings['x'] == undefined && settings['y'] == undefined) {
		if (settings['lat'] != undefined && settings['lon'] != undefined) {
			var coords = unsafeWindow.WGSToKKJ(settings['lon'],settings['lat']);
			settings['x'] = coords[0];
			settings['y'] = coords[1];
		} else if (settings['yu'] == undefined) {
			return;
		}
	}

	return settings
}



var setCenter = function() {
	parameters = parseUrl();
	if (parameters == undefined) return;
	if (parameters['z'] == undefined) return;
	unsafeWindow.naviciAjaxApi.setMapZoom(parameters['z']);
	if (parameters['x'] == undefined || parameters['y'] == undefined) return;
	
	//alert(coordinates['x'] + '\n' + coordinates['y'] + '\n' + coordinates['z']);
	
	unsafeWindow.naviciAjaxApi.setMapCenter(parameters['x'],parameters['y']);
	//unsafeWindow.toggleLayerSelection(this,'MapLayerMenuListItem');

	var areas = String(parameters['areas']);
	
	if (areas.substr(-1,1) != ',') {
		areas = areas+',';
	}
	areas = areas.split(',');
	//<input type="checkbox" id="ml_16" name="16" onclick="javascript:toggleLayerSelection(this,'MapLayerMenuListItem');"/>

	for (x=0;x<areas.length;x++) {
		if (areas[x] == '' || areas[x] == undefined) continue;
		inp = document.getElementById('ml_'+areas[x]);
		inp.checked = true;
		unsafeWindow.toggleLayerSelection(inp,'MapLayerMenuListItem')

	}
	//unsafeWindow.naviciAjaxApi.setView(coordinates['x'],coordinates['y'],coordinates['z']);
}

var StartStopYouloc = function(event) {
    if (youloc_running == false) {
        youloc_running=true;
        youloc(true);
        //youloc_timer = setTimeout(function() {youloc(true);},10000);        
    } else {
        clearTimeout(youloc_timer);
        youloc_timer = null;
        youloc_running = false;
    }
}

var inityouloc = function() {
    var youloc_running = false;
    navbar = document.getElementById('coordSearchArea');
   
    parameters = parseUrl();
    if (parameters['yu'] == undefined) yun = '';
    else yun = parameters['yu'];
    if (navbar) {
        newElement = document.createElement('div');
        newElement.id = 'yupanel2';
        newElement.innerHTML = '<hr/><strong>Käyttäjän tiedot</strong>';
        navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
        
        newElement = document.createElement('div');
        newElement.id = 'yupanel';
        newElement.innerHTML = '<hr/><strong>Youloc seuranta</strong><br/>Käyttäjä:<br/><input type="text" name="n" id="yun" value="' +yun + '"/><br/>Käynnissä: <input type="checkbox" id="yo" checked="checked"/><br/>Valitse mittakaava sivun alareunan mittakaavavalinnasta';
        navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
        

        document.getElementById('yo').addEventListener('click',StartStopYouloc, true);
    }
    StartStopYouloc('a');
}


var youloc = function(timer) {
    parameters = parseUrl();
    if (parameters['yu'] == undefined) return;
    if (youloc_running == false) return;
    GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://proto.youloc.net/xml.php',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
        var users = dom.getElementsByTagName('user');
        var title;
        found = false;
        z = parameters['z'];
        if (z == undefined) {
           x = document.getElementById('zoomLevel').selectedIndex+1;
        }
        //alert(z);
        for (var i = 0; i < users.length; i++) {
            username = users[i].getAttribute('username');
            if (username != parameters['yu']) continue;
            found = true;
            lat = parseFloat(users[i].getAttribute('lat'));
            lon = parseFloat(users[i].getAttribute('lon'));
            kkj = unsafeWindow.WGSToKKJ(lon,lat);
            
            t = users[i].getAttribute('time_received');
            sp = users[i].getAttribute('speed');
            c = users[i].getAttribute('course');
            h = users[i].getAttribute('hdop');
            a = users[i].getAttribute('active');
            
            time = new Date();
            var h=time.getHours();
            var i=time.getMinutes();
            var s=time.getSeconds();
            var y=time.getFullYear()
            var m=time.getMonth()+1;
            var d=time.getDate();
            if (i < 10) i = '0'+i;
            if (m < 10) m = '0'+m;
            if (d < 10) d = '0'+d;
            if (s < 10) s = '0'+s;
            if (h < 10) h = '0'+h;
            
            status = document.getElementById('yupanel2');
            status.innerHTML = '<hr><strong>Käyttäjän tiedot</strong><br/><br/>Sijainnin aikaleima<br/>'+t+'<br/>Viim. päivitys<br/>' +y+':'+m+':'+d+' '+h+':'+i+':'+s+'<br/>Nopeus ja suunta<br/>'+sp+'km/h ('+c+')<br/>HDOP<br/>'+h+'<br/>Aktiivinen<br/>'+(a==0?'<span style="color:red">EI</span>':'<span style="color:green;">KYLLÄ</span>');
            unsafeWindow.naviciAjaxApi.setMapZoom();
            unsafeWindow.naviciAjaxApi.setMapCenter(kkj[0],kkj[1]);
            //alert(username+'\n'+lat+'\n'+lon);
            break;
        }
        if (!found) {
            alert('Tuntematon käyttäjä');
            StartStopYouloc();
            return false;
        }
        
    }
    });
    
    if (timer == true) {
        youloc_timer = setTimeout(function() {youloc(true);},10000);
    }
}
window.addEventListener('load', function() {setCenter(); inityouloc();},true);