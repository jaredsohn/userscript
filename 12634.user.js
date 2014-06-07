// ==UserScript==
// @name           2ch.ru CAPTCHA fix
// @namespace      urn:uuid:ec9e3abf-72c1-45f1-ae32-d683f9a8a92a
// @description    Tries to fix problems with CAPTCHA display
// @include        http://2ch.ru/*
// ==/UserScript==

if (location.hostname.indexOf('2ch.ru') != -1) {
    (function () {
	// This is for Internet's Creator.
	// If this piece of crap puts too much strain on servers, behaves buggy or became not
	// required, or whatever the hell else, just add '&nofix=n' (where 'n' corresponds to
	// the 'this_version' variable's value) to CAPTCHA URLs.

	var this_version = 1;

	// The following code is full of ugly hacks, black (OH NOES!) magic and crackpottery.
	// Obviously, it is not portable.

        var img_error = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs' +
	    '%2B9AAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZT' +
	    'wAAAGDSURBVHjaYvz%2F%2Fz8DCBzR1w8HUqlA7MwAAXuBeLbNxYsrQRyAAGIEKTysp9cirKxQLW' +
	    '6gw8CjqABW9eX%2BA4aXF64wvL37oNX20qUagABi3K%2BtHS4kJ71C0tqM4T83N8OfHz8YGH7%2F' +
	    'YmACKmYGsp%2Bfu8Lw7vGzCIAAYvrz71%2BqqIw4w6%2BP7xnE0vIYWASEGFjFJBkkimsYfrx%2B' +
	    'ySDKx8EAUgMQQCx%2F%2Fvxx5udiZ3j25BHDq%2FnTGcSi4hkYgM55MbWX4ceb1wySbCwMIDUAAc' +
	    'Ty%2B%2B9fhv9fPzP8ef6M4c%2BbVwz%2Fv3wCu%2FEfkP77%2Fh3Df052BpAagABi%2Bf37996X' +
	    'T144M%2F34ziARFs7wYvYUhv9ACYmYeIYvu7YxvP72gwGkBiCAGJdLSoYLC%2FCuUJPgZ%2Fjz6w' +
	    'fDH2hwsTAyMjD%2F%2B89w%2B9UXhrfffkYABBA4eBaJibVIiQpV60gKMogJ8YIVvnrzkeHKkzcM' +
	    'zz58bo179aoGIIAYYQE%2BT0gIa4AnvXsHDnCAAAMAEVCnLmDwlo0AAAAASUVORK5CYII%3D';
	
	var base64 = function(data) {
	    var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	    var c1, c2, c3, e1, e2, e3, e4;
	    var out = "";
	    var i = 0;
	    while (i < data.length) {
		// '& 0xff' is a hack, that fixes up unicode private range weirdness.
		c1 = data.charCodeAt(i++) & 0xff;
		c2 = data.charCodeAt(i++) & 0xff;
		c3 = data.charCodeAt(i++) & 0xff;
		e1 = c1 >> 2;
		e2 = ((c1 & 3) << 4) | (c2 >> 4);
		e3 = ((c2 & 15) << 2) | (c3 >> 6);
		e4 = c3 & 63;
		if (isNaN(c2)) {
		    e3 = e4 = 64;
		} else if (isNaN(c3)) {
		    e4 = 64;
		}
		out += key.charAt(e1) + key.charAt(e2) + key.charAt(e3) + key.charAt(e4);
	    }
	    return out;
	};
	
	var update_image = function (img, url) {
	    img.src = 'data:image/gif;base64,R0lGODlhMQAHALMIAG2euNXj6qHA0bvS3oevxYevxG6euP' +
	    '%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh' +
	    '%2BQQFAAAIACwAAAAAMQAHAAAEJtDISau9ONfDu%2F9gKI4cYBwnqa6qibJw3LmAbK%2FurY%2Bm5v' +
	    '9AAyACACH5BAUAAAgALAIAAgAFAAMAAAQIUKCCjKR21ggAIfkEBQAACAAsAgACAAkAAwAABA0woIEE' + 
	    'IshIarGe1ZVFACH5BAUAAAgALAIAAgANAAMAAAQS8MgTzjjikGMmtZjGedWVbUYEACH5BAUAAAgALA' +
	    'YAAgANAAMAAAQS8MgTzjjikGMmtZjGedWVbUYEACH5BAUAAAgALAoAAgANAAMAAAQS8MgTzjjikGMm' + 
	    'tZjGedWVbUYEACH5BAUAAAgALA4AAgANAAMAAAQS8MgTzjjikGMmtZjGedWVbUYEACH5BAUAAAgALB' + 
	    'IAAgANAAMAAAQS8MgTzjjikGMmtZjGedWVbUYEACH5BAUAAAgALBYAAgANAAMAAAQS8MgTzjjikGMm' + 
	    'tZjGedWVbUYEACH5BAUAAAgALBoAAgANAAMAAAQS8MgTzjjikGMmtZjGedWVbUYEACH5BAUAAAgALB' +
	    '4AAgANAAMAAAQS8MgTzjjikGMmtZjGedWVbUYEACH5BAUAAAgALCIAAgANAAMAAAQS8MgTzjjikGMm' +
	    'tZjGedWVbUYEACH5BAUAAAgALCYAAgAHAAMAAAQJ8MgTzpjU4joiACH5BAUAAAgALCoAAgADAAMAAA' +
	    'QE8Mg5IwAh%2BQQFAAAIACwAAAAAMQAHAAAEJBCgSau9OGsqt%2F%2Bg0YHkZyAFIiBi6W5nurZvbc' +
	    'UqO9r83f%2B3CAAh%2BQQFAAAIACwmAAIACQADAAAEDdAgggQaKEhqsZ7VlUUAIfkEBQAACAAsIgAC' +
	    'AA0AAwAABBLQHHLEGSecfSS1mMZ51ZVxRwQAIfkEBQAACAAsHgACAA0AAwAABBLQHHLEGSecfSS1mM' +
	    'Z51ZVxRwQAIfkEBQAACAAsGgACAA0AAwAABBLQHHLEGSecfSS1mMZ51ZVxRwQAIfkEBQAACAAsFgAC' +
	    'AA0AAwAABBLQHHLEGSecfSS1mMZ51ZVxRwQAIfkEBQAACAAsEgACAA0AAwAABBLQHHLEGSecfSS1mM' +
	    'Z51ZVxRwQAIfkEBQAACAAsDgACAA0AAwAABBLQHHLEGSecfSS1mMZ51ZVxRwQAIfkEBQAACAAsCgAC' +
	    'AA0AAwAABBLQHHLEGSecfSS1mMZ51ZVxRwQAIfkEBQAACAAsBgACAA0AAwAABBLQHHLEGSecfSS1mM' +
	    'Z51ZVxRwQAIfkEBQAACAAsAgACAA0AAwAABBLQHHLEGSecfSS1mMZ51ZVxRwQAIfkEBQAACAAsBAAC' +
	    'AAcAAwAABAlwnHDqkdRieyIAOw%3D%3D'; // loading
	    url = url.replace(/&dummy=[^&?;]*/, '') + '&dummy=fc' + Math.round(Math.random() * 9001)
	    try {
		var r = new XMLHttpRequest();
		r.open("GET", url, true);
		r.overrideMimeType('text/plain; charset=x-user-defined');
		r.onreadystatechange = function() {
		    if (r.readyState == 4) {
			if (r.status == 200 && r.responseText){
			    img.src = 'data:image/png;base64,' + base64(r.responseText);
			} else if (r.status == 503) {
			    // Retry in 10 seconds
			    setTimeout(function() { update_image(img, url); }, 10000);
			} else {
			    img.src = img_error;
			}
		    }
		}
		r.send(null);
	    } catch(e) {
		img.src = img_error;
	    }
	};

	var nofix_re = /[&;?]nofix=(\d+)/;
	var s = document.evaluate("//img[starts-with(@src, '/cgi-bin/captcha.pl/')]", document,
				  null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < s.snapshotLength; i++) {
	    var img = s.snapshotItem(i);
	    var src = img.src;
	    var a = nofix_re.exec(src);
	    if (!a || a[1] < this_version) {
		if (!img.id) { img.id = 'x_captcha'; }
		var update_link = document.createElement('a');
		update_link.appendChild(document.createTextNode('update'));
		update_link.href = 'javascript:;//' + src;
		update_link.style.margin = '0 0.6em 0 0';
		update_link.addEventListener('click', function() { update_image(img, src); }, true);
		img.parentNode.insertBefore(update_link, img);
		if (typeof img.naturalWidth != "undefined" && img.naturalWidth < 1) {
		    update_image(img, src);
		}
	    }
	}
    })();
}
