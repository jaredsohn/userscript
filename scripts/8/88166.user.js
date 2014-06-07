// ==UserScript==
// @name           VDex Project Morning/Daytime/Night Info
// @namespace      http://userscripts.org/scripts/show/88166
// @description    Shows you if it's morning, daytime or night
// @include        http://vdexproject.net/map.php*
// @copyright      Mori
// @version        1.0.0
// @license        Creative Commons Attribution-Noncommercial 3.0 License
// ==/UserScript==
(function (){
	try {
		var dayImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAK3RFWHRDcmVhdGlvbiBUaW1lAFdlZCAyIEp1biAyMDA0IDIzOjQyOjU2ICsxMjAwbN6pzQAAAAd0SU1FB9QGAgssJodbyAAAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L%2FGEFAAAAElBMVEUAAAAAvf9rGAD%2F7xDvxhD%2F%2F5Rwjnm4AAAAX0lEQVR42k2OgQnAMAgE006Q%2FARV6QJJJyjZIGT%2FVaIWbATh8PX9lKKOUgprZyM0cgKDicmoqiZOpDOQ792z%2Bh5jtoc4p7NiKMm1kaqjdVP1Qvr7OYfL5hzf%2FgSRKmoBO3oO8CjPtOEAAAAASUVORK5CYII%3D';
		var morningImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAK3RFWHRDcmVhdGlvbiBUaW1lAFdlZCAyIEp1biAyMDA0IDIzOjQzOjAzICsxMjAwmcTjMAAAAAd0SU1FB9QGAgssLomAQDIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L%2FGEFAAAAFVBMVEUAAABrGAD%2FAAD%2F%2FwD%2FjADvxhDepSFNplmZAAAASElEQVR42mNggANmYwgwoJglCGMZKgmDWYaChoLCgsIgliJQTgjMEgaKGQqD1Ym4BILVCRq6hIYJCxowMCoaugJZQgJILDgAAGk7F2U1qmoGAAAAAElFTkSuQmCC';
		var nightImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAK3RFWHRDcmVhdGlvbiBUaW1lAFdlZCAyIEp1biAyMDA0IDIzOjQyOjU5ICsxMjAwmpbZJAAAAAd0SU1FB9QGAgssNQPlid4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L%2FGEFAAAAElBMVEUAAAAAAIRrGADvxhD%2F7xD%2F%2F5Q3EhVwAAAATUlEQVR42mNggANGQQgQQGUJKSlCWcqhQRCWkIlJqCKYpezipBQEZqmYKAoqQVguilC9Ks4wMWWXIKg6IRNXqF5BZRMjDDuwuQDKggMA6t0NrAodutYAAAAASUVORK5CYII%3D';

		var src, alt, title;
		var time = document.getElementById('footer');
		if( time )
		{
			time = time.getElementsByTagName('span');
			if( time.length == 1 )
			{
				time = time[0].innerHTML.replace('Page loaded at ', '').replace('.', '').split(':');
				time = parseInt(time[0]);
				if( time < 4 || time >= 20 ) { src = nightImg; alt = 'It\'s night time'; title = 'It\'s night time'; }
				else
				{
					if( time < 10 ) { src = morningImg; alt = 'It\'s morning time'; title = 'It\'s morning time'; }
					else { src = dayImg; alt = 'It\'s day time'; title = 'It\'s day time'; }
				}
				var placeNameDiv = document.getElementsByClassName('placename')
				if( placeNameDiv.length == 1 )
				{
					placeNameDiv = placeNameDiv[0]; placeNameDiv.innerHTML += ' <img src="'+src+'" alt="'+alt+'" title="'+title+'" style="width: 18px; height: 18px; vertical-align: middle;" />';
				}
			}
		}
	} catch(e){};
})();