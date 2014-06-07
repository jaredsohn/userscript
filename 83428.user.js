// ==UserScript==
// @name          Kongregate beta!
// @description   Replaces the "beta"-tag.
// @include       http://www.kongregate.com/*
// ==/UserScript==

var betaLogoData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAANCAYAAAAnigciAAAAAXNSR0IArs4c6QAAAahJREFUOMvFkbFL42AYhx%2FTBKQYHRRa2sXTpSJ3o0ImMZi10U1QyegfoEehsxBI516d%2FMBZyFyxYwedFKRZqi4FCzpco0EoVAdJD2lT7A3tb%2Fx43%2Fd7eH4Tx%2FBeU1Xuk0kCRWGUmQsC1h4ekEKAdizGqBMoCjVVRR6HgTDtWIzm7CxyFEAinebg6AiAZqNBybZ58X0M02TDNLtzJdtmP5fr2T%2B0LAAcISjZNnXP64WQJP5OTiJHUSZTqe6xrb099nM5Cvk8iVSKm8tLTovFng%2FLt7cYy8vdd03XeW212Mhm%2B0KEINJ31TUbjaF1G9ksp8UiP1dXB84NhFjIZHCEYHNnh2ql8u%2B4aeIIgSNE5O6UqrKYyVD3PO5rNTRdj5yVB0HceR6HlkUinaZwcsKuYXxqd90vdfSLpuvEp6dxhOhWW724GB4izGurNXQV2vo6vy2Luucxpar8OTv7PxNhHQCFfP5LHb9WVgA4d13KrhtZBcCL73N9dYWm631tTGzPz78%2FxeOMK%2FF2Gynx%2FMxcEIwFQOl0%2BPH4iLzk%2BwCM2obS6TDz9saS7%2FMBIPuaPAeD2rAAAAAASUVORK5CYII%3D";
var betaLogo = document.createElement("img");
betaLogo.setAttribute("src", betaLogoData);

with(betaLogo.style) {
	position = "absolute";
	left = "311px";
	top = "32px";
}

var kongregateHeader = document.getElementById("header_logo");
var kongregateLogoContainer = kongregateHeader.getElementsByTagName("h2")[0];
kongregateLogoContainer.appendChild(betaLogo);