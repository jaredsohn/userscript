// ==UserScript==
// @name           KillBotProtection
// @namespace      broody@cogeco.ca
// @description    Automatically detects broken circle and clicks on it.
// @include        http://*.tribalwars.net/*
// ==/UserScript==

//Thanks The_Iceman :)
function get_sitter() {
	var tid = location.href.match(/[\?&]t=(\d+)/);
	if (!tid) { return ""; }
	return tid[1];
}

//=============================================================================
//=============================Kill Bot Protection=============================
//=============================================================================
//Retrieves binary stream
function getBinaryImage(link) {
	var req = new XMLHttpRequest();
	req.open('GET',link,false);
	//XHR binary charset opt by mgran 2006 [http://mgran.blogspot.com]
	req.overrideMimeType('text/plain; charset=x-user-defined');
	req.send(null);
	if (req.status != 200) return '';
	var data = req.responseText;
	var arr = new byteArray();
	for (var i=0; i<data.length; i++) {
		var c = data.charCodeAt(i);
		arr.push((c > 255) ? c - 63232 : c);
	}
	return arr;
}

//Encodes binary stream and sends it to server
//Returns x,y coords
function sendImageToServer(data)
{
		var thepic = "pic="+escape(data.toHexString(0,data.getLength()));
		GM_xmlhttpRequest({
			method:'POST',
			url:"http://www.tribalwars.byethost13.com/killbot/tw_bot.php",
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: thepic,
			onload:function(page) {
				//alert(page.responseText);
				var form = document.getElementsByName('captcha')[0].parentNode;
				var info = page.responseText.split(";");
				form.innerHTML += '<input type="hidden" name="captcha_x" value="'+info[0]+'"/>';
				form.innerHTML += '<input type="hidden" name="captcha_y" value="'+info[1]+'"/>';
				form.submit();
			}
		});
}

//Binary Array
//Taken and modified from http://www.xs4all.nl/~jlpoutre/BoT/Javascript/ExifThumbs/
function byteArray(arr) {
	this.arr = arr || [];
	this.hex = "0 1 2 3 4 5 6 7 8 9 a b c d e f".split(/\s/);
	this.swapBytes = false;
	this.push = function(a) {
		this.arr.push(a);
	};
	this.getLength = function() {
		return this.arr.length;
	};
	this.toHexString = function(offset, num) {
		if (! offset) offset = 0;
		if (! num) num = this.arr.length;
		var s = "";
		for (var i=offset; i<offset+num; i++) {
			s += "%";
			s += this.hex[Math.floor(this.arr[i] / 16)];
			s += this.hex[Math.floor(this.arr[i] % 16)];
		}
		return s;
	};
}

function killbp() {
	var allElements, thisElement;
	allElements = document.getElementsByTagName('*');
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if (thisElement.textContent=="Bot protection") break;
		else thisElement = 0;
	}
	if (thisElement) {
		var data = getBinaryImage("http://" + location.host + "/captcha.php" + get_sitter());
		var img = document.getElementsByName('captcha')[0];
		img.src = "data:image/png," + data.toHexString(0,data.getLength());
		sendImageToServer(data);
		return 1;
	}
	return 0;
}

killbp();