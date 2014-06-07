scr_meta=<><![CDATA[
// ==UserScript==
// @name           Crop Finder T4
// @namespace      http://userscripts.org/
// @description    Find 15 and 9 Crop fields
// @version        0.2
// @include        http://ts10.travian.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
]]></>.toString();


function getMap(x, y) {
	$.getJSON('http://ts10.travian.com/ajax.php', "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]=2&", function(data) {
		$(data.data.tiles).each(function(index) {	
			if (typeof this.c != 'undefined') {
				if (this.c.match("{k.f1}")) {
					$('<p>Crop 9: ' + this.t + '</p>').appendTo('#cropResults');
				} else if (this.c.match("{k.f6}")) {
 					$('<p>Crop 15: ' + this.t + '</p>').appendTo('#cropResults');
				}	
			}		
		});  
	});
}

css = 
"#reportdiv { padding: 5px; background-color: white; -moz-border-radius: 5px; -moz-box-shadow: 0 0 5px 5px black; position: absolute; top: 10%; left: 25%; display: none; z-index: 9999999; }" + 
"#reportbackground { opacity: 0.7; position: fixed; top: 0px; left: 0%; z-index: 9999997; display: none; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAz0lEQVRYhcXWQQoEIQwEwNY3hPgv%2FadfdC%2BCq%2BPujI62OQg5SNHQhxjvPWYnxigiqvr9NqtzrvvXHlFDCJPwSxVzid%2BrM%2FASdRhepY7BC9UBeK36FF6uPoJ3qPfwJvUG3qf%2Bg7eqP%2BHdah8mqB2Yo7YwTa1gplpgspphvgrAAOCrAMwRNcZoj6giYo%2BoqmqPqCUxWc2J%2BaqItOXiqKpqj6hVuZhqKRdZzYn5qoiYlBJfVdX%2BzbVbdc51YIKK683FUVuYplYwUy0wWc0wXwXwAfyl8Pg4LSOEAAAAAElFTkSuQmCC) repeat scroll 0 0 transparent; }";


$(function() {
	AnotherAutoUpdater.check();
	var largura = $(document).width();
	var altura = $(document).height();
	GM_addStyle(css);
	$('<div id="reportbackground"></div><div id="reportdiv" width="50%" height="100%"><p>Crop Finder T4 v0.2 - </p><form action="" method="get"><label>x: </label><input name="xTuga" size="10" type="number" /><label>y: </label><input name="yTuga" size="10" type="number" /><label>Radius: </label><input name="radius" value="2" size="10" type="number" /><input name="ok" type="button" value="GO!" /></form><div id="cropResults"></div></div>').appendTo('body');
	$('#reportbackground').css('width', largura).css('height', altura).show();
	$('#reportdiv').slideDown('fast');

	$(":button").click(function() {
		$('#cropResults').empty();
		var originalX = $('input[name="xTuga"]').val();
		var originalY = $('input[name="yTuga"]').val();
		var radius = $('input[name="radius"]').val();
		var xIncrement = 16;
		var yIncrement = 20;
		var radiusX = 8;
		var radiusY = 10;
		var newY = originalY - (radiusY * (radius/2));
		for (y=radius;y>0;y--) {
			var newX = originalX - (radiusX * (radius/2));
			for (x=radius;x>0;x--) {
				getMap(newX, newY);
				newX += xIncrement;
			}
			newY += yIncrement;
		}

	});
});

var AnotherAutoUpdater = { // update script by sizzlemctwizzle THANKS! http://userscripts.org/scripts/show/38017
 
	id: '93230', 
	days: 5, 
	name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
	version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
	time: new Date().getTime(),
	call: function(response) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
			onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
		});
	},
	compare: function(xpr,response) {
		this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
		this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
		if ( (this.xversion) && (this.xname[1] == this.name) ) {
			this.xversion = this.xversion[1].replace(/\./g, '');
			this.xname = this.xname[1];
		} else {
			if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
			GM_setValue('updated_'+this.id, 'off');
			return false;
		}
		if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
			GM_setValue('updated_'+this.id, this.time+'');
			top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
		} else if ( (this.xversion) && (+this.xversion > +this.version) ) {
			if(confirm('Do you want to turn off auto updating for this script?')) {
				GM_setValue('updated_'+this.id, 'off');
				GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
				alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
			} else {
				GM_setValue('updated_'+this.id, this.time+'');
			}
		} else {
			if(response) alert('No updates available for '+this.name);
			GM_setValue('updated_'+this.id, this.time+'');
		}
	},
	check: function() {
		if (GM_getValue('updated_'+this.id, 0) == "off")
			GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
		else {
			if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
			GM_setValue('updated_'+this.id, this.time+'');
			this.call();
		}
		GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
		}
	}
};