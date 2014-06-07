// ==UserScript==
// @name           aboutBlankHomePage
// @namespace      http://cakyus.wordpress.com
// @description    rewrite about blank page to become homepage
// @include        about:blank
// @author         http://userscripts.org/users/288243
// ==/UserScript==

//window.location = 'file:///d:/documents/system/home/index.html';

// Generate iconCollection data
// fill image with zero length string when it have no image

var iconIndex = 0;
var iconCollection = Array();

iconCollection[iconIndex] = Array(
	 'Facebook','https://www.facebook.com/?ref=hp'
	,'data:image/png;base64,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'
	); iconIndex++;

iconCollection[iconIndex] = Array(
	 'Mail','https://mail.google.com/mail/ig/mailmax?hl=en&mid=58&parent=http://www.google.com&ifpctok=-5586571789151507480&gacj=cmH6ge9a&fpp=5X2'
	,'data:image/png;base64,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'
	); iconIndex++;

iconCollection[iconIndex] = Array(
	 'GTalk','https://talkgadget.google.com/talkgadget/popout'
	,'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAADAFBMVEX/gP+5ubmxsbGpqanJycmhoaGZmZnZ2dnh4eLx8fHy8O75+fnBwcHp6emSkpLR0dHw7emxusKgq7ijsL3V2Nvp6Ob++fH59vEzXIQAOH0NPnCpuMU5YIgCOXGSo7Njfpnj5utBcaAdY6gbWppJdaFLbpIAMHSCmrPk4Nw7cKUlaKolYJq0vsggZanq5uLy6+Ndg6kaXqOVqLsiY6Ouu8hMe6ocYaYiXpr78+uLi4tagKYRVpuessZVfaX58Oawt77/+e3d3+Hd3d2irLWqs7uBlKcnU38zaqAwb607bJ1BZYowVn6aprJGao4aToETSoEVSX3h3tvJy80NQHSbqrlaeZ0ALXssa6k7dKwUWJ0AQ40AMHhXdJMFQHsMS4sBSZJBaZG6x9WLqspFe7Frlb+jv9pLbI4UWqFtmMHE0uKrwNYQUZM+bqApYpuCgoLAzdqhuNF3mbvX19hyiKAtZ6LR0M7r5NxwjaqMoLTY1tPK0dnc2dZCcZ6ImqtfepUycK6Tpbg0aJwsXYyywtEkU4AAO4IkXJRjh6sFRIOduNOCo8QqbbAgV4/R1dlUg7OTrMW8v8Jzc3OqtcBigqKks8L2699riaf07+rGycvEx8nw5t1ti6vi3NSUoK0xZpxbd5NsbGwKU5s1ZZa7xMwIQ38vcLFjfZZ7e3sDTZiMp8NCdqru6OEaVpNskLQFUZuWss18ocXM1+J7ociApMiyxdlkZGRbW1tUVFS9wcdLS0s/Pz+tra21tbUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsACvQACuoACo7IKTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAENSgjQAAAEAAAEAADUAAGUAAJbInVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYLZRYAKgAEbAAAAMAAkEAAmgAApDJ6vgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYAKhg1ggAEXAAAAcABvnr+bGEAAAAAXRSTlMAQObYZgAAAAlwSFlzAAALEgAACxIB0t1+/AAABqlJREFUeNrtl/1/00Qcx5fkkrs2D7e6JQynwDbUsNHWMdkaH0ZXp4AC2opuRUVFpSqu6DSTWhARwcep9YmCUzuf4vPzVqv+cX4vfVi6dWuVl6+XP/i59JK7+9473+/dd1nS1va//jvieAHEc+giGIIoCQgT4vMTQpAgicI/oYgi8snL5EOi+DfjkZTqXM/hCklcyxhFImWIzyfXHWUaaRUlYRdS4Syp0nBRLWB4vuzLGgIDrum6S2ozTBnla+KU1AqmjJJa4ajVo6FYPzi+RiaIsqz61BpG9aKWOivVGiSNcSqAWqmqrtetVo0O4vLO8EzyND0V+KQ14ghUrrrgqx6qp66Blvpk0igLBNkzsRZPRe0suZgPss87JAtotcBWsCo9gUs6sFt3ekd9K5dJ4WW9MmoY8nLUOtK1/tJuWb1s/eUdsndA5pb/3WnuZF0lqn/Dxo0BY5PXXPeTnt6+blnfDLXhGSArXEKiTFRWdNV/xforr5JVoteKSvzmlv6BrQbZHASQDrcLbQqxAXBJVOpTkTKQTmAsfHVwcJtBQsTDUs0tQwPXGGT78Eh3hLh9YErAaPmTwJJVnbjD7ZFrh6+7njUZ1mcYbKAd9/SCR2bP0AjgCFnHKp1sAgvZqovMkklZum7eMNy3bdRk14auXLJDj44R8CgIoFhP0PXIuHHc2FSZIGveDOCFKsh/0807d+3afcut3f6If8/efbfdfhnyEx3vDg50G/Ge4EDAT4zEHbfv1/UKiPcmpaT4oM8cIyR6510Tk5PJA3fvN9A99x5IDvYf7MI6gPoHAlEMoO52f7xr8L77w8zcJKYPeRdJQ75YbMyMxeP6A4cenBh66OFDnZHDd6ceefSxyYkjGyJ65+PBqa0RAE0FouF7jgxPqn4ci5mxsZgPeRcpjVSCTTwGxTCuHUxulWVdP/rgE4YsP5lKXhXRKYQWiEw/zlbqqYO9T49FMSaxGNirOO0F2Sr0xaAAbnPvyP4wxjjsN6IzM8+kksdGdbqTgTLgFx2/bXjoWQPGGcZkoKXVRuARrohkjwdH9rezqyg68VzX1Mm+58MmPdU/tbUdQFtOvDC467SBa1JpHYirgcwM7HEHeBSKP/Xi+jN9J08mt4UJBV8CYbq7f/LsYPCliOkBKV6QJiyBKIAgtHj88MvXTb6iPglZFTbtUwAaBdzkqztfe33PqAfEW55EEq12PJvtZMUFdYQy4RMvB99Qjegzqb49uol2Mo8S4Bd+MzW0760wda2npztVybv9fE7FGUpnp+k0to8HB94Oh0LvJFPvRmPvvZ8a6Dhn5k8Fnw6EEeza+ej24b6uTKhsPT3tz3kTksvN4iymGTpN4/R4sO/YBW7mg9Twxrm5D89O9G24YOY/Yh4hCHA8Mjv02pGPL2CaBWuKccH7RFLSIgGPmLIzL81PfHL40vFPj/RP7d37WfLkxO6uG+2p3qkdF9BHvQNvxyPvJj8/+MXcrGtOeMf7HEFiTi8PUDQzOzk/f+DLY9GvhufvO/DGo1/Pf3lmT/Zs6mzgGzSS+nY8TiPffT//zlzWNVdz9Q8kvqBgWiHp5IcfD/0Uyp47+urPr+jRZ3/85aiePf3r6dkMZTW143j7D+swYsYYFfi65xGnOYTatk0RtdHcaGR0xkb2TCQSziATakRD4TB16wyyUTzEGgkbIktr9Q9tJBQ4DHORnbBRWdXzUsMu11Co+6MIKwtCvm2ZSwsY7pGoWLnm1VJtl5uJ8jVF4BEuaMv/iyDBSWOKatMStSvXmwQq99TcSzCkaeUEZRmojRMXBFwXTlNhflFs8DrJS0Wu829xlKLGN3iPVwSryFGUh6KAGTvn8+wiv5xw3q2pUrRWBuaSRKvIYzADjrKisL7zZbErRLliWvytraE40SqJsOAKCDU6KqfzgM2IJUtc9X0bSEVHqfiwgrLEgn1LF9fguKTFhYzSSDUacKhQXFiTw0hOLq6sIZZGXK7kaI3X2ZMEjkjXxCA+VypYEt+E06Y4O2zPLFRj5N02py2WCmlNbP4dmHdgLgdFQaIj8QiVeezESenFUjHHMM3ccUG4yvm9WCqVFguO46Qdp7DIGrm0JYlNo6qEVgYhrVTIASNXWHS1kHPSFlCEVj9uBY1yzB+nyG4uSZKmWSBNkwDCww1aw8ALjoAAxC1AnvwBQI7jeFd/MnqrEKY0TFC4xVwrG7M2CLJIgHz7o6UVXV3IwUgqpZvnWzNxFkkvWNJFhtXGPo3TjiS2/mW/qgRLEi46LFewZRcd1v/6t/UXhm2SMvHJGFMAAAAASUVORK5CYII='
	); iconIndex++;

iconCollection[iconIndex] = Array(
	 'Reader','https://www.google.com/reader/play/'
	,'data:image/png;base64,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'
	); iconIndex++;

iconCollection[iconIndex] = Array(
	 'Calendar','https://www.google.com/calendar/render'
	,'data:image/png;base64,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'
	); iconIndex++;

iconCollection[iconIndex] = Array(
	 'Twitter','https://mobile.twitter.com/'
	,'data:image/png;base64,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'
	); iconIndex++;

GM_addStyle(
	  ' body, textarea { font-family: Century Gothic; }'
	+ ' body { background-color: #000; }'
	+ ' body, a { color: #fff; }'
	+ ' body { text-align: center; width: 95%; }'
	+ ' img { border: 0px; display: block; }'
	+ ' h1 { margin: 0px; }'
	+ ' h1 { font-size: 16px; text-align: right; }'
	+ ' a { text-decoration: none; font-weight: bold; }'
	+ ' .thumbnailCollection { width: 45%; margin-top: 30px; }'
	+ ' .thumbnailCollection { float: right; }'
	+ ' .thumbnail { border-radius: 10px; }'
	+ ' .thumbnail { padding: 9px; }'
	+ ' .thumbnail { margin: 10px; }'
	+ ' .thumbnail { display: inline-block; }'
	+ ' .thumbnail { background-color: #fff; }'
	+ ' .thumbnail { color: #000; }'
	+ ' .thumbnail { opacity: 0.9; }'
	+ ' .thumbnail:hover { opacity: 1; }'
	+ ' .thumbnail img { margin-top: 5px; }'
	+ ' #note { width: 45%; text-align: left; }'
	+ ' #note { margin-top: 30px; }'
	+ ' #note { float: left; }'
	+ ' #note, #note textarea { font-weight: bold; }'
	+ ' #note textarea { width: 100%; height: 45%; }'
	+ ' #note textarea { padding: 5px; margin-top: 10px; }'
	+ ' #note textarea { background-color: #FFFFD4; }'
	+ ' #note textarea:focus { background-color: #FDFDC5; }'
	);

function writeThumbnail() {
	
	var htmlCenter = document.createElement('center');
	var htmlClock = document.createElement('h1');
	
	htmlClock.setAttribute('id','clock');
	htmlClock.innerHTML = getClockString();	
	htmlCenter.appendChild(htmlClock);
	
	htmlCenter.appendChild(getNote());
	
	htmlCenter.appendChild(getIconCollection());
	
	document.body.appendChild(htmlCenter);
}

function getNote() {
	
	var htmlNote = document.createElement('div');
	var htmlNoteEditor = document.createElement('textarea');
	var htmlNoteTitle = document.createTextNode('My Notes');
	
	htmlNote.setAttribute('id','note');
	htmlNoteEditor.setAttribute('id','noteEditor');
	
	if (GM_getValue('htmlNoteEditorInnerHTML') == undefined) {
		GM_setValue('htmlNoteEditorInnerHTML','hello World !');
	}	
	
	htmlNoteEditor.value = GM_getValue('htmlNoteEditorInnerHTML');
	htmlNoteEditor.addEventListener('change', function() {
		GM_setValue(
			 'htmlNoteEditorInnerHTML'
			,document.getElementById('noteEditor').value
			);
		}, true);
	
	htmlNote.appendChild(htmlNoteTitle);
	htmlNote.appendChild(htmlNoteEditor);
	
	return htmlNote;
}

function getIconCollection() {
	
	var htmlIconCollection = document.createElement('div');
	htmlIconCollection.setAttribute('class', 'thumbnailCollection');
	
	for (icon in iconCollection) {
		var htmlIcon = document.createElement('a');
		htmlIcon.setAttribute('class','thumbnail');
		htmlIcon.setAttribute('href',iconCollection[icon][1]);
		if (iconCollection[icon][2] != '') {
			var htmlIconImage = document.createElement('img');
			htmlIconImage.setAttribute('src',iconCollection[icon][2]);
			htmlIcon.appendChild(htmlIconImage);
		}
		var htmlIconText = document.createTextNode(iconCollection[icon][0]);
		htmlIcon.appendChild(htmlIconText);
		htmlIconCollection.appendChild(htmlIcon);
	}
	
	return htmlIconCollection;
}

function getClockString() {
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	var myWeekDayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var myWeekDayName = myWeekDayNames[d.getDay()];
	var myMonthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	var myMonthName = myMonthNames[d.getMonth()];
	var c = '';
	c += ' ' + myWeekDayName;
	c += ' ' + d.getDate();
	c += ' ' + myMonthName;
	c += ' ' + d.getFullYear();
	if (h > 9) { c += ' ' + h; } else { c += ' 0' + h; }
	if (m > 9) { c += ':' + m; } else { c += ':0' + m; }
	if (s > 9) { c += ':' + s; } else { c += ':0' + s; }
	return c;
}

writeThumbnail();

window.setInterval(function() {
	document.getElementById('clock').innerHTML = getClockString();
}, 1000);

