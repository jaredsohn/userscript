// ==UserScript==
// @name           ForecastAdvisor.com Fahrenheit To Celsius
// @author         SpookyET
// @namespace      http://www.studioindustryllc.com
// @description    Converts fahrenheit degrees to celsius degrees on ForecastAdvisor.com
// @version        1.3
// @date           2006-12-22
// @include        http://forecastadvisor.com/*
// @include        http://*.forecastadvisor.com/*
// ==/UserScript==

(function()
{
	var forecastContainerElement;
	var divElements;
	var aElements;
	
	function convertFahrenheitToCelsius(divElements)
	{
		var fahrenheitValue;
		var celsiusValue; 
		var celsiusDegrees;
		var celsiusDegreesTextNode;
		
		for (var index = 0, divElement; divElement = divElements[index]; index++)
		{
			if (divElement.hasAttribute("class") &&
					(divElement.getAttribute("class") == "lo temp" ||
						divElement.getAttribute("class") == "hi temp"))
			{
				fahrenheitValue = parseInt(
					divElement.lastChild.nodeValue.replace("°", ""));
						
				celsiusValue = Math.round((fahrenheitValue - 32) * (5/9)); 
				celsiusDegrees = celsiusValue + "°C";
				celsiusDegreesTextNode = document.createTextNode(celsiusDegrees);
  
				divElement.replaceChild(
					celsiusDegreesTextNode,
					divElement.lastChild);
			}
		}
	}
	
	function addEventListernerToAnchor(aElement)
	{	
		aElement.addEventListener(
			'click',
			{
				intervalID: null,
				handleEvent: function(eventArgs)
				{
					var self = this;		
					var lbContentElement = document.getElementById("lbContent");
					
					if (lbContentElement != null)
					{
						convertFahrenheitToCelsius(
							lbContentElement.getElementsByTagName("div"));
						
						// Events are cleared after click; It has to be added again.
						addEventListernerToAnchor(aElement);
							
						if (self.intervalID)
						{
							clearInterval(self.intervalID);
						}
						
						return;
					}
					
					if (!self.intervalID)
					{
						self.intervalID = setInterval(
							function(eventArgs) { self.handleEvent(eventArgs) },
							100,
							eventArgs);
					}
				}
			},
			false);
	}

	
	forecastContainerElement = document.getElementById("fcs");
	
	if (!forecastContainerElement)
	{
		return;
	}
	
	divElements = forecastContainerElement.getElementsByTagName("div");
	aElements = forecastContainerElement.getElementsByTagName("a");
	
	convertFahrenheitToCelsius(divElements);

	for (var index = 0, aElement; aElement = aElements[index]; index++)
	{
		addEventListernerToAnchor(aElement);
	}
})();