// ==UserScript==
// @name           YouTube "Darkness".
// @description    Turn the lights out for easier watching of YouTube videos.
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/user/*
// @include        http://youtube.com/user/*
// ==/UserScript==

function addLightsButton()
{
	var offButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAe1JREFUeNpkU02rcVEUXuc4vkOGRAwpZSgxUZShuQm/4vYO3pzzdsd+jCjyF5QiKQMkmSDymc/97meVm3vvqtXe7bOetZ71rHUUIQS9bLPZVNbrtb7f7wl+Pp/p8XiQ2WymYDCoRyIR4xWrvIDj8VhcLhdyOp1ks9nIYrGQoiiEN5mM+v0+x+Xzed3tdhsMHAwGwuFwkNfrpefzSff7nR3V8B2JkLDT6dBwOKRSqaQrk8lEgFIgEKDr9cqVQA0nDBW32y17OBymWq1GHo+H1NlsxheAQE3TNK4CABwM7HY7mUwmGo1GlEwmmba22+2YyvF4JFVVv1HECSCSrlYr7jUUCrFoGqocDgeyWq3U7Xb5BFUkARhBOJfLJbeDQmClgTcopFIpDsAH0Hr1h17lmPgei8Wo3W6THAup0WhUx6NUlhKJxBfodruxwwDOZrM0nU45LpfLVTRJyUin09RoNHQEoVdIz3Skw7AMi8WCWq0Wj8Llcv37WgBsTbPZ1CEAgOgR4qDnXq9HcuhULpd1v99vfNsc2Hw+r9TrdR10oSKqn04nrlatVv9K0OcrVqU3k6oZUBjjgYJyP0kG8xzfQTCNfhhWz+fzUTweJywHhi17ol8Gqu8uaf0pFotCKicymYwoFApC/gAfP+P+CzAAmPhAEzyJ4TsAAAAASUVORK5CYII=";
	var overButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoFJREFUeNpsUltLVFEU/vY5e67OTVMnqSxBKHLK1BBS6gdED+FT89ZLPfVcoNCciaIbBPVeD12g6KWwwgtCFJJBhRReEhlpsshRZ5wZz5mZc/bMbs3IhFmLvdjszfet9a0Lk1KiaunEbKSYWdBUsQJZWIM00xD5HAoCkL6QtqsrHK1iWZlo5rMR/eeE5nYUoToDYA5y7gZjDKW8AZGKQZ9/iUxWR23PgOYPtkaZsAqRdGxQ89YFofp2U6wSHZ1SmJAls/JmNj8FacD65COszAwhePKBxhJzQ9LnErAHOwhogCkuQPFs3GTlP2l+R8mKg3uOYPnVRayaTigsPQ3V00wIg4RzcmclS4VADinAVB/9cYj1Ufg6T0NZfAfOCkkoDi9KYolINuLkIItFugWktKgJJFkxUCzEIK152P09BMmBF/ImRDYBHvDATDwmiW7kPsxRAspMxGJmCTXHuqlJM7D5O2AmlygQh2J5QzAW3pCc7ZTFQubFEzgONcAR8sC+3wZ3716k7l9FqbAKvq0PyYmHsOrboezsCt9Ir/yCPjsMR9MZKrHcFJqtSvXxcncllBov3Hv6kZ2cRHJqBM3H+zWuqvyCv/OskRy/pkEy2LwHNiZcdFF9zkoQXteNzKd5/Bi9hZoT17VAsCXKqpuTXJyOLL+9o/lyC6htscG+T1RmWYoF8H14HCl7C4J9N7UdbUejfzanal8/T0TGnt3VfPWN0PXXWNctJFJt+Db1EZdv39Na2w7/vXKbLdJ/TraGekmqAiOnI2vk8H7sOZ4OjrDNOI4tJmmETcFGtB9sRzwex5epafB/UP8hhsOntEj0iramCwhhwWUHogPnL23F/RZgALZtJ5mXblnLAAAAAElFTkSuQmCC";
	
	if (location.href.match(/youtube\.com\/user\//i)) {
		var divVideo = document.evaluate("//div[@class='profileEmbedVideo']/center", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		var divLights = divVideo.insertBefore(document.createElement('div'), divVideo.firstChild);
		divLights.setAttribute('style', 'background-color:white; margin-bottom:-7px; margin-top:6px; width:20px;');
	} else {
		var divRatings = document.evaluate("//div[@id='watch-ratings-views']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		var divLights = divRatings.insertBefore(document.createElement('div'), divRatings.firstChild);
		document.evaluate(".//div[@id='watch-rating-div']", divRatings, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.setAttribute('style', 'width: 255px !important; padding-left: 10px !important;');
		document.evaluate(".//div[@id='ratingWrapper']", divRatings, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.setAttribute('style', 'width: 200px !important;');
		divLights.setAttribute('class', 'floatL');
	}
	var aLightsButton = divLights.appendChild(document.createElement('a'));
	aLightsButton.setAttribute('href', '#');
	aLightsButton.setAttribute('onclick', 'return false;');
	aLightsButton.addEventListener('click', function() { lightsOut(); }, false);
	aLightsButton.addEventListener('mouseover', function() { imgLightsButton.src = overButton; }, false);
	aLightsButton.addEventListener('mouseout', function() { imgLightsButton.src = offButton; }, false);
	var imgLightsButton = aLightsButton.appendChild(document.createElement('img'));
	imgLightsButton.alt = 'Lights Out';
	imgLightsButton.src = offButton;
	imgLightsButton.setAttribute('style', 'padding: 2px 0;');
	imgLightsButton.setAttribute('title', 'Dark Mode');
}

function lightsOut()
{
	var lightImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUAAACnej3aAAAAAXRSTlOzEo46UAAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC";
	var mediumImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUAAACnej3aAAAAAXRSTlPNpTNmawAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC";
	var darkImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUCAgJ4xuoaAAAAAXRSTlPnfoivvQAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC";
	var outImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUCAgJ4xuoaAAAADklEQVQYlWNgGAWDCQAAAZAAAdjzlT8AAAAASUVORK5CYII=";
	
	if(!document.getElementById('lightsOut')) {
		var imgLightsOut = document.createElement('img');
		imgLightsOut.src = outImg;
		imgLightsOut.setAttribute('id', 'lightsOut');
		imgLightsOut.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:' + document.height + 'px;');
		imgLightsOut.addEventListener('click', function () {
				if(document.getElementById('lightsOut').src == outImg) {
					document.body.removeChild(document.getElementById('lightsOut'));
				} else {
					lightsOut();
				}
			}, false);
		document.body.appendChild(imgLightsOut);
	} else {
		document.getElementById('lightsOut').src = outImg;
	}
}

addLightsButton();

