// JavaScript Document
// ==UserScript==
// @name           Ikariam Island Time Chromed
// @autor          roselan
// @version        1.5.1.3
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace      ikariamScript
// @description    Display travel times from the current selected city to the island, world and city views.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(main);


//$(document).ready(function(){
function main() {

	// my stuff
	function secondsToHms(d) {
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor(d % 3600 / 60);
		var s = Math.floor(d % 3600 % 60);
		return ((h > 0 ? h + ":" : "00:") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "00:") + (s < 10 ? "0" : "") + s);
		}

	function computeTime (from, to, unformated) {
		var distMins = (from[0] == to[0] && from[1] == to[1]) ? 10 : Math.sqrt(Math.pow(Math.abs(from[0]-to[0]), 2) + Math.pow(Math.abs(from[1]-to[1]), 2))*20;
		return unformated ? distMins*60 : secondsToHms(distMins*60);	
	}
		
	function getCoords (city) {
		var myCity = city.replace("(", "[").replace(")", "]").replace(",",":");
		myCity = myCity.substring(myCity.indexOf('[') + 1, myCity.indexOf(']'));
		return myCity.split(':');	
	}

    
	var activeTown = $("div[class$=coords dropbutton]:first").text();
	var activeCoords = getCoords(activeTown);
	
	function showTime(targetIsland) {
		if (activeTown != "" && targetIsland != "") {
			var targetCoords = getCoords(targetIsland);
			var distTime = computeTime(activeCoords, targetCoords);
			if ($("#timeToIsland").text() == "") { 
				$("#breadcrumbs").append('<span>&nbsp;-&nbsp;</span></span>');
				$("#breadcrumbs").append('<span id="timeToIsland">'+distTime+'</span>');
			}
			else {
				$('#timeToIsland').replaceWith('<span id="timeToIsland">'+distTime+'</span>');
			}
		}
	}	
	
	// island and city views
	var targetIsland = $("span[class=island], a[class=island]").text();
	showTime(targetIsland);	
	
	// spy center
	if ($("body[id=safehouse]").length > 0) {
		var spyCities = $("li[class=city] > a");	
		spyCities.each( function () {
			var targetCoords = getCoords(this.textContent.trim());
			$(this).after("<a> - </a><a class=time value="+computeTime(activeCoords, targetCoords, true)+">"+computeTime(activeCoords, targetCoords)+"</a>");			
		});		
		$("div[class=spyinfo]").sortElements(function(a,b){ return $("li[class=city] > a[class=time]", a).attr("value") > $("li[class=city] > a[class=time]", b).attr("value") ? 1 : -1; });
	}
		
	// world map	
	var islandBread = document.getElementById("islandBread");
	if (islandBread) {
		islandBread.addEventListener('DOMSubtreeModified', function(){
			showTime(this.textContent);			
		},false);
	}


	/**
	 * jQuery.fn.sortElements
	 * --------------
	 * @param Function comparator:
	 *   Exactly the same behaviour as [1,2,3].sort(comparator)
	 *   
	 * @param Function getSortable
	 *   A function that should return the element that is
	 *   to be sorted. The comparator will run on the
	 *   current collection, but you may want the actual
	 *   resulting sort to occur on a parent or another
	 *   associated element.
	 *   
	 *   E.g. $('td').sortElements(comparator, function(){
	 *      return this.parentNode; 
	 *   })
	 *   
	 *   The <td>'s parent (<tr>) will be sorted instead
	 *   of the <td> itself.
	 */
	$.fn.sortElements = (function(){
	 
		var sort = [].sort;
	 
		return function(comparator, getSortable) {
	 
			getSortable = getSortable || function(){return this;};
	 
			var placements = this.map(function(){
	 
				var sortElement = getSortable.call(this),
					parentNode = sortElement.parentNode,
	 
					// Since the element itself will change position, we have
					// to have some way of storing its original position in
					// the DOM. The easiest way is to have a 'flag' node:
					nextSibling = parentNode.insertBefore(
						document.createTextNode(''),
						sortElement.nextSibling
					);
	 
				return function() {
	 
					if (parentNode === this) {
						throw new Error(
							"You can't sort elements if any one is a descendant of another."
						);
					}
	 
					// Insert before flag:
					parentNode.insertBefore(this, nextSibling);
					// Remove flag:
					parentNode.removeChild(nextSibling);
	 
				};
	 
			});
	 
			return sort.call(this, comparator).each(function(i){
				placements[i].call(getSortable.call(this));
			});
	 
		};
	 
	})();


}	
