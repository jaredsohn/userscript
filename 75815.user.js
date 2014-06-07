// ==UserScript==
// @name          YouTube: Pop-out Video
// @description   Add button to Youtube video title to pop-out video
// @version       1.2
// @include       youtube.com/watch*
// @include       *.youtube.com/watch*
// ==/UserScript==



// Create Button
    var divWatchHeadline = document.evaluate("//div[@id='watch-headline-user-info']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
    divWatchHeadline.appendChild(document.createTextNode("\n"));
    var buttonPopout = divWatchHeadline.appendChild(document.createElement("button"));
    divWatchHeadline.appendChild(document.createTextNode("\n"));
    buttonPopout.title = "Pop-out Video";
    buttonPopout.setAttribute("class", "yt-uix-button yt-uix-button-default yt-uix-tooltip");
    buttonPopout.setAttribute("data-tooltip-title", "Pop-out Video");
	var popoutImage = document.createElement("img");
    var offButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAABKVBMVEVmZmZaWlp1dXVsbGxjY2NkZGRnZ2d0dHRYWFhoaGhZWVlpaWlzc3NxcXFubm52dnZ2dnZoaGh3d3dzc3NfX19paWlnZ2dqampeXl5vb29ra2tubm5vb29nZ2dzc3Nqampqampzc3N2dnZfX19ycnJYWFhVVVVeXl5oaGhfX19hYWFoaGj////Dw8PGxsZeXl6ioqJ2dnZiYmJzc3OysrLT09P09PTLy8vp6emfn5+9vb2YmJhqamrX19fNzc3AwMCRkZFcXFzk5OS8vLy5ubnPz8/a2tqkpKTBwcHJycn29vbMzMyJiYmdnZ3W1taMjIxhYWGIiIjf39+cnJy6urrQ0NCbm5tvb291dXXIyMj6+vqPj49ubm6FhYWXl5dpaWmnp6dwcHCEhISvBaPYAAAALHRSTlMA8gDyAAAANvIAxQB8APJf8rvlhsXF6vLF7fL08u6QxABqZMkAysra5fLywMzgc80AAAC2SURBVHheHcpVcsQwFAXRK1myBxmCzCCZhpk5zEz7X0TepP9OVUMGOefxRMyg1lOAMDmPePOybdvfP1g4aq0MFNVcAiVFOO1MiFMDyeVQKJPNVUtE28D1jVv49asErUarCLRUJf9Icp37hzWwYsk5J403Np+ePbCX18+vW3Xnb21bO7tgNaXqjbf3jz2xzzlYm85Ot9c/kCYxMFTUTBUOIYIczoXWunypr44AEcbxCfvv9AyA/AMMShwGeYE4AgAAAABJRU5ErkJggg==";
    var overButton = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAABZVBMVEUAT8QAZv8AZs0AZswAZv4ATsQASsMAZtIATMMAT/8AZsIAZscAZsUAYv8AaP8AZ9YAV/8AYP8AS/8CVv8ATP8AZ/8AZsMAYv0Aas0AVscAav8AYLwAaNUAQ/4AZfEAZ9gAVP8AVf8ATv8AQv8AYf8AZ9cAZsEAYP8AZ/8AYbsAZfYAZtAASsMAZtEARcEAZv0AVscAZtUAas0AWMcAXMkAas3///+bw+sALf+VwP/r8/9Khf+fxv+VwOo3gf8AKP/N4v+Vwd6WwP8AXcmv0O/u9v+QveoANv8AZf8AaP+lyer1+f9IhP8AR//C3P9KkP8ANv6gyP+20/+rze8FZf8RU/9PiP8ASf84fP8AVP8sf+UAWf9Qkv9Wlv8ALP9/sv+oyv+Muv+bw/+51eosdv9ZmP9bnf+AsuU5iNhkouAAV8dbnd4oguOqzOu92Os/i9mDtd2AsP8AVv9Rkv/U6f+WuP+61v9CiQWZAAAANnRSTlPyAAAAAPLyAMXyAAAANvIA8nzy7fJfAIa7xeXFxeoAAPL08u6QxABqZMkAAMoAygDaAOXy8sAxRV+aAAAAw0lEQVR4Xh3OxXLDUBBE0XlCW7LMzA4z50kyMzOGmZm/P1O+u1PViwZZ5AhxmaMzmNUPjLTOEduwl9R1/e4YWHRYcXxSrG8HlmVMbovn7BJ5ZQSvz2AIBEMncWTeCIWHx4+Xyjfil/45QRjQn9EYdaqdX8SAv45rN6jb2bmvag34eqPZatNOdz6iLC4BX6Y0MTk4PFpeWCEE+BQu05lsbs20yhEQihQr0fsNRhI34elZVdXXN/V9C/9tw84uTNvbx3/yP8AgJKm6HHSaAAAAAElFTkSuQmCC";
    buttonPopout.appendChild(popoutImage);
    popoutImage.src = offButton;
    buttonPopout.addEventListener("mouseover", function() { popoutImage.src = overButton; }, false);
    buttonPopout.addEventListener("mouseout", function() { popoutImage.src = offButton; }, false);
	popoutImage.setAttribute("alt", "External link icon");
	popoutImage.setAttribute("style", "padding:0px 0px 2px 1px;");



// Opens a new window in which to display the video	
	buttonPopout.addEventListener("click", popoutVideo, false);
 	function popoutVideo() {
		// Thanks to JoeSimmons for help with the time and stop functions
		player=unsafeWindow.document.getElementById("movie_player");
		window.open("http://www.youtube.com/v/" + window.location.href.slice(window.location.href.indexOf("watch?v=") + 8) + "&start=" + player.getCurrentTime().toString().split(".")[0] + "&autoplay=1","Youtube","width=480,height=288,resizable");
		player.stopVideo();
	}