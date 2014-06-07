// ==UserScript==
// @name         StarsQuest : autoCaptcha
// @namespace    StarsQuest : autoCaptcha
// @description	 Valide automatiquement le captcha [StarsQuest's scripts string]
// @author       Benoit485
// @version      0.2
// @date         2013-05-10 12H10
// @include      http://s*.starsquest.co.uk/game.php?page=botcaptcha*
// ==/UserScript==
	
/*
	V_0.2 => 2013-10-20 19H20 (Ansaerys devient StarsQuest)
	V_0.1 => 2013-05-10 12H10
*/

var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'autoCaptcha',
	name: 'Valide automatiquement le captcha',
	version: '0.2',
	url: 'http://userscripts.org/scripts/source/167112.user.js', 
	options: {}
}) );

var realImg = 'iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABv0lEQVRYhe3Yv0tVYRzH8VeTQ+46V0MFFTQopOne6FB/QUFGv82oIIc0M3S4RJreoamhiAIbDCoqSko06efcbNCchvo0eKIavHgfuN+g/MB7PPDiPGc4PKzvP9wG1GMzmtGG9hrWhhbsRCPqCsOqq9/Gvi6mSyyMslzrbrDUx5cOrm1nLzZWAm7pYrZMim6Q+S4msakSsPk638ukGdKngD6S7hbIEvNoqgRsG2O5THpP+hDUuwI4zJKVY1517aMF8G3xYESzv4CLawbOkN4ENZ0DfE2aCupVDvAlaTKoFznAZ6TnQT3NAT4mPQnqUQ5wgvQwqIkc4DjpQVDjOcD7gd3LAd4J7HYO8FZwVQNvBlc18G9UFXAkuKqBpeCqBg4GNpQD7A/sSg6wl3QpqN4cYA/pYlA9OcDzpHNBXcgBdpPOBHU2B3iKdDKo0znAY6SjQR3PAXaSDgd1pACOrAHY+hN4iHQwqL4/32BLJeCuAb6WSVcLZK3rLHBjpH7msKMSsLGD4SEWov9kTvB5PwNoqASs20p7N1Mlvg2zGNFl5g4wuHvlnrCuEvD3C8wmtFr5aGvZnuJYG6zhAnN9/9R+ADtofpNWqhJbAAAAAElFTkSuQmCC';

setTimeout(checkCaptcha, 500);

function checkCaptcha()
{
	var images = getId('botcaptcha').getElementsByTagName('img');
	if(images.length<8) { setTimeout(checkCaptcha, 500); return; }
	
	for(var i=1, j=images.length; i<j; i++)
		if(getBase64Image(images[i]) == realImg)
			document.location.replace(images[i].parentNode.href);
}

function getBase64Image(img) 
{
	// Create an empty canvas element
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;

	// Copy the image contents to the canvas
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);

	// Get the data-URL formatted image
	// Firefox supports PNG and JPEG. You could check img.src to
	// guess the original format, but be aware the using "image/jpg"
	// will re-encode the image.
	var dataURL = canvas.toDataURL("image/png");

	//console.log(dataURL); //here is where I get 'data:,'       

	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
