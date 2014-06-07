// ==UserScript==
// @name         YouTube Light Switch
// @description  Adds a "light switch" to YouTube that darkens the page
// @namespace    drnick
// @downloadURL  https://userscripts.org/scripts/source/154394.user.js
// @updateURL    https://userscripts.org/scripts/source/154394.meta.js
// @include      http*://www.youtube.com/watch*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        none
// @version      1.2.3
// ==/UserScript==

(function() {

	if (window.self != window.top) return;	
	var $ = jQuery;

	var imgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABiVBMVEWbmpqPjo6LjI6fn6COj4+sr7Gho6asrrGgo6Z8fHx8e3yqqqrx8vPu7/Dg4uPv8PHs7u/w8fLy9PPz9PT09fX19vjCw8a4ubv2+PmEhIPR0tP5+fqDg4L9/v77+/z8/f36+vuur7GSlJba2tzv8fDm5uf5+vqoqqzk5OXx8vLc3N7t7e6pq62goqVsbG3j4uXJychpampxcXLKyspoaGjR0dBlZWXe4OGipKd4eHdhYmNeXl/h4uXU1dVaWlzV1tfZ2txRUVPf4OJXWFlTVFdNTlHk5eaFhojl5ubi4+Xf4ODS09aFhYWHh4fi4+TOz9LExce6u73P0NPT1NawsbPW19iTlZfe3+Hm5+jn6Onc3d/g4eLMzc/h4uPY2dvX2NpKS03S09WFhYTt7u/LzM7a293j5OXOz9HU1daDg4PX2NnT1NXS09TY2drb3N7s7e7NztCRkpPb3N3U1dfa29zd3t+EhISFhITR0tTZ2tvc3d7W19ne3+DP0NLV1tjQ0dOCgoLf4OH////0qb88AAAB7ElEQVR42nXMZ5eaQBiGYdLLtmzvvffeey/qmmjMGhEMGiDWFRFCcUD45XnnPcmH7Dl7fZp57jPDNATrzwg2MLr/LJ2p+6wkNXtPNEsS69ch3iuK9DRKinKPkYODV/uPBw84jBrLeRqoeaimAY9jNYwVC91J8e8gLt1ZqIJRLFGJ2+sf6Po2gYOIsVqhtJtL0XYcW7y80XCoYjSrlHV1eiIYhnByemXhYEIc8IsmVZEuSqogqKULqYJD0R9gsn6uSFW584eU46QezrkqDjk/CzGWo0z26EDkefHgiDVxiNE46NgUf7Yf39a07fj+GY+DMwhxWHUA/Le3ub6ysr65B79T6jDEoahK2YktOyLLEXsrYeMQHYI4kv9FxayN5bnx8bnlDSuGQ34ky/T2F/LUsbg6PzkzMzm/Kh7jUOjvZfSevgJ1aC5NzU5MzE4tmYc49PXojN7pGlSAX/PRGh/Awe2E2EFcykjtvlmYnl54t5sycCAdENvDxCWEuM6HnbeLi+93Pjp4JeF2iG1hQ3BlmURfj30DY68EIsuuYITbILZGXipuuVwm0dGvYDRA4OIqSqQVYgtRINLa/QV0Q8NIWnQm3ZSU5eRPkOz6DLrwTLemNBNqzDx+ekQZhEeYMo0h5kUo+PuvNPp3C4aYP4i3MpIZjmJZAAAAAElFTkSuQmCC";

	var styles = "#ytLightSw {position:fixed; bottom:5px; left:5px; cursor:pointer; z-index:2147483005;} #ytLightSw.flip {transform:rotate(180deg); -moz-transform:rotate(180deg); opacity:0.7; } #ytLightBack {opacity:0.95; display:none; position:fixed; top:0; left:0; width:100%; height:100%; background-color:black; z-index:2147483000;} body.lightsOff embed, body.lightsOff #watch7-video-container {position:relative; z-index:2147483005 !important;}";
	
	$("head").append("<style type='text/css'>" + styles + "</style>");

	var enabled = false;
	
	var fadeTime = 400;
	var tipOff = "Dim the lights";
	var tipOn = "Raise the lights";

	var img = $("<img src='" + imgSrc + "' id='ytLightSw' title='" + tipOff + "' />");
	var back = $("<div id='ytLightBack' />");

	img.appendTo("body");
	back.appendTo("body");

	img.click(function() {
		$(this).toggleClass("flip");
		$("body").toggleClass("lightsOff");
		
		if (enabled) {
			back.fadeOut(400);
			img.attr("title", tipOff);
		}
		else {
			back.fadeIn(400);
			img.attr("title", tipOn);
		}
		
		enabled = !enabled;
	});

})();