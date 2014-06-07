scr_meta=<><![CDATA[
// ==UserScript==
// @name           mrslades Crop Finder T4
// @namespace      http://userscripts.org/
// @description    Find 15 and 9 Crop fields
// @version        0.1
// @include        http://ts4.travian.se/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
]]></>.toString();


function getMap(x, y) {
	$.getJSON('http://ts4.travian.se/ajax.php', "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]=2&", function(data) {
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

var AnotherAutoUpdater = { // update script by omdano THANKS! http://userscripts.org/scripts/show/38017
 

};