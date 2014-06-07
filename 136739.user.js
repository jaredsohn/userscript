// ==UserScript==
// @name          NoelMosaic
// @namespace     http://www.example.org/noelmosaic/
// @description	  Script pour faire facilement des mosaiques d'images sur JVC. :noel:
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://www.jeuxvideo.com/forums/0-*
// @version       3.0
// ==/UserScript==

var textarea = document.getElementById('newmessage');
var things = [];
var URLLOL = window.URL || window.webkitURL;
var cols = 0;

var canvas = document.createElement('canvas');
canvas.width = 136;
canvas.height = 102;

var canvas2 = document.createElement('canvas');
canvas2.width = 476;

var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(255, 255, 255)';

var ctx2 = canvas2.getContext('2d');

var fileSelect = document.createElement('a');
fileSelect.href = '#';
fileSelect.innerHTML = 'Ajouter une mosaïque';
document.getElementsByClassName('message')[0].insertBefore(fileSelect, textarea);

var fileElem = document.createElement('input');
fileElem.type = 'file';

fileSelect.onclick = function(e)
{
	fileElem.click();
	e.preventDefault();
};

function callback(e)
{
	if(this.width > 476 || this.height > 714)
	{
		canvas2.height = this.height * (476 / this.width);
		ctx2.drawImage(this, 0, 0, 476, canvas2.height);
		var img2 = document.createElement('img');
		img2.onload = callback;
		img2.src = canvas2.toDataURL('image/png');
		return;
	}
	
	URLLOL.revokeObjectURL(this.src);

	var sampledh = 0;
	
	while(sampledh < this.height)
	{
		var sampledw = 0;

		while(sampledw < this.width)
		{
			var destw = 68;
			var desth = 51;

			if(this.width - sampledw < 68)
			{
				destw = this.width - sampledw;
			}

			if(this.height - sampledh < 51)
			{
				desth = this.height - sampledh;
			}

			ctx.fillRect(0, 0, 136, 102);
			ctx.drawImage(this, sampledw, sampledh, destw, desth, 0, 0, destw * 2, desth * 2);

			things.push(window.atob(canvas.toDataURL('image/png').split(',')[1]));

			if(sampledh === 0)
			{
				cols++;
			}

			sampledw += 68;
		}
		
		sampledh += 51;
	}

	doThings(0);
}

function doThings(i)
{
	var boundary = "---------------------------";
	boundary += Math.floor(Math.random() * 86328422644298);
	boundary += 12400722650394;
	var data = [];
	data.push('--' + boundary);
	data.push('Content-Disposition: form-data; name="fichier"; filename="' + Math.floor(Math.random()*1000000000) + '.png"');
	data.push('Content-Type: image/png');
	data.push('');
	data.push(things[i]);
	data.push('--' + boundary + '--');
	data = data.join('\r\n');

	if(navigator.userAgent.toLowerCase().indexOf('webkit') !== -1)
	{
		var myArray = new ArrayBuffer(data.length);
		var longInt8View = new Uint8Array(myArray);

		for (var j = 0; j < data.length; j++) {
			longInt8View[j] = data.charCodeAt(j) & 255;
		}

		data = myArray;
	}
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://www.noelshack.com/api.php',
		binary: true,
		headers: {
			"Content-Type": 'multipart/form-data; boundary=' + boundary
		},
		data: data,
		onload: function(res)
		{
			textarea.value += res.responseText + ' ';

			if(i % cols === cols - 1)
			{
				textarea.value += '\n';
			}
			i++;

			if(i < things.length)
			{
				doThings(i);
			}
			else
			{
				cols = 0;
				things = [];
				fileSelect.innerHTML = 'Ajouter une mosaïque';
				
				canvas = document.createElement('canvas');
				canvas.width = 136;
				canvas.height = 102;

				canvas2 = document.createElement('canvas');
				canvas2.width = 476;

				ctx = canvas.getContext('2d');
				ctx.fillStyle = 'rgb(255, 255, 255)';

				ctx2 = canvas2.getContext('2d');
			}
		}
	});
}

fileElem.onchange = function()
{
	fileSelect.innerHTML = 'Veuillez patienter... <img style="vertical-align: middle" src="http://upload.wikimedia.org/wikipedia/commons/d/de/Ajax-loader.gif">';

	if(textarea.value === "Ne postez pas d'insultes, \u00E9vitez les majuscules, faites une recherche avant de poster pour voir si la question n'a pas d\u00E9j\u00E0 \u00E9t\u00E9 pos\u00E9e...\n\nTout message d'incitation au piratage est strictement interdit et sera puni d'un bannissement." || textarea.value==="Ne postez pas d'insultes, \u00E9vitez les majuscules, faites une recherche avant de poster pour voir si la question n'a pas d\u00E9j\u00E0 \u00E9t\u00E9 pos\u00E9e...\r\n\r\nTout message d'incitation au piratage est strictement interdit et sera puni d'un bannissement.")
	{
		textarea.value = "";
	}
	
	var img = document.createElement("img");
	img.onload = callback;
	img.src = URLLOL.createObjectURL(this.files[0]);
}