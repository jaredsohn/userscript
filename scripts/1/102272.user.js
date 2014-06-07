// ==UserScript==
// @name           YouTube "Lights Out" Fixed  
// @namespace      orex
// @description    Turn the lights out for easier watching of YouTube videos! Fixed versuion for FF4 Google Chrome
// @include        http://*.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/user/*
// @include        http://youtube.com/user/*
// ==/UserScript==

function addLightsButton()
{
  if (location.href.match(/youtube\.com\/user\//i)) {
    var divNavBar = document.evaluate("//div[@id='playnav-navbar']//tr", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    var tdLights = divNavBar.insertBefore(document.createElement('td'), divNavBar.firstChild);
    var buttonLights = tdLights.insertBefore(document.createElement('a'), tdLights.firstChild);
    buttonLights.setAttribute('class', 'navbar-tab inner-box-link-color');
    buttonLights.href='javascript:;'
    buttonLights.appendChild(document.createTextNode("Lights out"));
    var divUPN = document.evaluate("//div[@id='user_playlist_navigator']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    divUPN.style.overflow = "visible";
    var divPlayer = document.evaluate("//div[@id='playnav-player']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  } else {
    var offButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAe1JREFUeNpkU02rcVEUXuc4vkOGRAwpZSgxUZShuQm/4vYO3pzzdsd+jCjyF5QiKQMkmSDymc/97meVm3vvqtXe7bOetZ71rHUUIQS9bLPZVNbrtb7f7wl+Pp/p8XiQ2WymYDCoRyIR4xWrvIDj8VhcLhdyOp1ks9nIYrGQoiiEN5mM+v0+x+Xzed3tdhsMHAwGwuFwkNfrpefzSff7nR3V8B2JkLDT6dBwOKRSqaQrk8lEgFIgEKDr9cqVQA0nDBW32y17OBymWq1GHo+H1NlsxheAQE3TNK4CABwM7HY7mUwmGo1GlEwmmba22+2YyvF4JFVVv1HECSCSrlYr7jUUCrFoGqocDgeyWq3U7Xb5BFUkARhBOJfLJbeDQmClgTcopFIpDsAH0Hr1h17lmPgei8Wo3W6THAup0WhUx6NUlhKJxBfodruxwwDOZrM0nU45LpfLVTRJyUin09RoNHQEoVdIz3Skw7AMi8WCWq0Wj8Llcv37WgBsTbPZ1CEAgOgR4qDnXq9HcuhULpd1v99vfNsc2Hw+r9TrdR10oSKqn04nrlatVv9K0OcrVqU3k6oZUBjjgYJyP0kG8xzfQTCNfhhWz+fzUTweJywHhi17ol8Gqu8uaf0pFotCKicymYwoFApC/gAfP+P+CzAAmPhAEzyJ4TsAAAAASUVORK5CYII=";
    var overButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoFJREFUeNpsUltLVFEU/vY5e67OTVMnqSxBKHLK1BBS6gdED+FT89ZLPfVcoNCciaIbBPVeD12g6KWwwgtCFJJBhRReEhlpsshRZ5wZz5mZc/bMbs3IhFmLvdjszfet9a0Lk1KiaunEbKSYWdBUsQJZWIM00xD5HAoCkL6QtqsrHK1iWZlo5rMR/eeE5nYUoToDYA5y7gZjDKW8AZGKQZ9/iUxWR23PgOYPtkaZsAqRdGxQ89YFofp2U6wSHZ1SmJAls/JmNj8FacD65COszAwhePKBxhJzQ9LnErAHOwhogCkuQPFs3GTlP2l+R8mKg3uOYPnVRayaTigsPQ3V00wIg4RzcmclS4VADinAVB/9cYj1Ufg6T0NZfAfOCkkoDi9KYolINuLkIItFugWktKgJJFkxUCzEIK152P09BMmBF/ImRDYBHvDATDwmiW7kPsxRAspMxGJmCTXHuqlJM7D5O2AmlygQh2J5QzAW3pCc7ZTFQubFEzgONcAR8sC+3wZ3716k7l9FqbAKvq0PyYmHsOrboezsCt9Ir/yCPjsMR9MZKrHcFJqtSvXxcncllBov3Hv6kZ2cRHJqBM3H+zWuqvyCv/OskRy/pkEy2LwHNiZcdFF9zkoQXteNzKd5/Bi9hZoT17VAsCXKqpuTXJyOLL+9o/lyC6htscG+T1RmWYoF8H14HCl7C4J9N7UdbUejfzanal8/T0TGnt3VfPWN0PXXWNctJFJt+Db1EZdv39Na2w7/vXKbLdJ/TraGekmqAiOnI2vk8H7sOZ4OjrDNOI4tJmmETcFGtB9sRzwex5epafB/UP8hhsOntEj0iramCwhhwWUHogPnL23F/RZgALZtJ5mXblnLAAAAAElFTkSuQmCC";
    var divWatchHeadline = document.evaluate("//div[@id='watch-headline-user-info']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    divWatchHeadline.appendChild(document.createTextNode("\n"));
    var buttonLights = divWatchHeadline.appendChild(document.createElement('button'));
    divWatchHeadline.appendChild(document.createTextNode("\n"));
    buttonLights.title = 'Lights out';
    buttonLights.setAttribute('class', 'yt-uix-button yt-uix-tooltip');
    buttonLights.setAttribute('data-tooltip-title', 'Lights out');
    var imgLights = buttonLights.appendChild(document.createElement('img'));
    imgLights.alt = '';
    imgLights.src = offButton;
    buttonLights.addEventListener('mouseover', function() { imgLights.src = overButton; }, false);
    buttonLights.addEventListener('mouseout', function() { imgLights.src = offButton; }, false);
    var divPlayer = document.evaluate("//div[@id='watch-player']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  }
  buttonLights.setAttribute('onclick', '; return false;');
  buttonLights.addEventListener('click', function() { lightsOut(); }, false);
  divPlayer.style.zIndex = "200";
}

function lightsOut()
{
  var lightImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAAA1BMVEUAAACnej3aAAAAAXRSTlOzEo46UAAAAA5JREFUGJVjYBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC";
  
  
  if(!document.getElementById('lightsOut')) {
    var imgLightsOut = document.createElement('img');
    if (youtubeLightsOutSequence == "immediate_off") {
      imgLightsOut.src = lightImg;
    } else {
      imgLightsOut.src = lightImg;
    }
    imgLightsOut.setAttribute('id', 'lightsOut');
    imgLightsOut.setAttribute('style', 'position:fixed;top:0;left:0;width:100%;height:' + document.documentElement.scrollHeight + 'px;z-index:199;');
    imgLightsOut.addEventListener('click', function () {
        if ((youtubeLightsOutSequence == "dim_only") || (document.getElementById('lightsOut').src == lightImg)) {
          if (location.href.match(/youtube\.com\/user\//i)) {
            document.evaluate("//div[@id='playnav-body']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.removeChild(document.getElementById('lightsOut'));
          } else {
            document.body.removeChild(document.getElementById('lightsOut'));
          }
        } else {
          lightsOut();
        }
      }, false);
    if (location.href.match(/youtube\.com\/user\//i)) {
      document.evaluate("//div[@id='playnav-body']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.appendChild(imgLightsOut);
    } else {
      document.body.appendChild(imgLightsOut);
    }
  } else {
    document.getElementById('lightsOut').src = lightImg;
  }
}

lightsOut()

function addMenuCommands()
{
  GM_registerMenuCommand("Set Lights Dim then Off", function () {
    youtubeLightsOutSequence = "dim_then_off";
    GM_setValue("youtube_lights_out_sequence", youtubeLightsOutSequence);
  });
  GM_registerMenuCommand("Set Lights Immediately Off", function () {
    youtubeLightsOutSequence = "immediate_off";
    GM_setValue("youtube_lights_out_sequence", youtubeLightsOutSequence);
  });
}

var youtubeLightsOutSequence = GM_getValue("youtube_lights_out_sequence", "immediate_off");

addMenuCommands();
addLightsButton();


