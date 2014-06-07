// ==UserScript==
// @name          gmAnubadok
// @namespace     http://bangla.org.bd/
// @description   Bangla translation appears when you click to select text with the alt key pressed
// @include       *
// @version       0.0.2
// ==/UserScript==

window.addEventListener('mouseup', function(mouseEvent) {
	var boxLeft = window.gmAnubadok.offsetLeft;
	var boxRight = boxLeft + window.gmAnubadok.offsetWidth;
	var boxTop = window.gmAnubadok.offsetTop;
	var boxBottom = boxTop + window.gmAnubadok.offsetHeight;

	if (window.gmAnubadok.style.display == "inline"
			&& (mouseEvent.pageX < boxLeft
					|| mouseEvent.pageX > boxRight
					|| mouseEvent.pageY < boxTop
					|| mouseEvent.pageY > boxBottom)) {
		window.gmAnubadok.stopCapture();
	} else if (window.getSelection() != '' && mouseEvent.altKey) {
		window.gmAnubadok.psychicalWavesCapture(mouseEvent, window.getSelection());
	}
}, true);

function engageAnubadok() {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (head) {
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = "span.gmAnubadokToolBar {margin: 1px; border: 1px dotted gray; padding: 0px 5px 0px 5px;}";
	head.appendChild(style);


	var gmAnubadok = document.createElement("div");
	gmAnubadok.id = "gmAnubadok";
	gmAnubadok.spinner_imgSrc = "data:image/gif;base64,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";
	gmAnubadok.ektr_imgSrc = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMAUExURcR2J+mYqJZkDsyylvLYqfz19M6brPbS2sCFkuraueeIlue4SOni2K13Rfr5+uMwVqlWC6iKhQogRPz59OjU2Nu5pr2flLiWRVYpBdenNvXy64lXDPTk4ffdtf7+/mkxAKd4FYNKCIU3CLaJKMekTfr+/tSGCPb29/Xk7vTcx9zb3P38+b6VPOjKyObRpenLeXVABPT2+fCitMWoavDUpPPFzL26uvbhw00cAPry5vDn0v///v79/vrv3OWujtnJwNebE8+WE9KvYvK4vrJ4D6aWkMdyS/HPs9ygrP79/PjozezhxeTLnMqUffz37b11g/76+pF1ZqeAKff//quEPLWNN72QJZCQdPXx5XpnY9mwUTxDVP7779/O08KGC34yQsOME/Lc3snCv9/PoV9AMMJ4g+PVrvbO0u3VqdvMseWlu+qLe9u6a5aNirCPjmJEL/Tp66BsEP3llK90B/K1x8JzCfDGYfR7hvTs2vjr1eiervz8++PYwP7//93Hk////4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v////tkRcQAAACAdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AOAVLZwAAAL5JREFUeNpisGKu+f6vHgEYPDmNkwKQBeq1ZUQTNZAF6qu9edgTLZEE6oVlhQvY01kRAtZetv9tpNJNA35DBYBKrP+o/pPxMPv+HyJQz/JfONaIK1JJjBUqIHsuMrKcX01AUZwPKsArxKyvn5MgrZQEEXBXyynjdjIOYpLPgwk4SKqEhhZKSwhCBDiL4+KCFAqZDCzMIAKsboWFTEyKEhKBhhABT3cBA3mJlNyNb6HW/g/QFQxcHysF9DZAgAEAdTBfegG1YUoAAAAASUVORK5CYII=";

	gmAnubadok.stopCapture = function() {
		this.style.display = "none";
	}

	gmAnubadok.psychicalWavesCapture = function(mouseEvent, selectedText) {
		if (this.style.display == "none") {
			this.style.display = "inline";
			this.gmAnubadokImage.style.display = "inline";
			this.style.left = (mouseEvent.pageX - 20).toString(10) + 'px';
			this.style.top  = (mouseEvent.pageY - 5).toString(10) + 'px';
			this.gmAnubadkSpan.innerHTML = selectedText;
		}
	}

	gmAnubadok.defecates = function () {
		this.gmAnubadokImage.src = this.spinner_imgSrc;
	  GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://www.bengalinux.org/cgi-bin/abhidhan/bdict.pl?en_word=' + this.gmAnubadkSpan.innerHTML,
	    onload: function(responseDetails) {
	    	var t = responseDetails.responseText;
	    	var resultCheck = t.search('<hr> <ul> <ul><ul></ul> </ul>');
	    	if (resultCheck != -1) {
	    		window.gmAnubadok.gmAnubadkSpan.innerHTML = "Sorry! Anubadok failed to translate: " + window.gmAnubadok.gmAnubadkSpan.innerHTML;
	    	}  else {
	    		window.gmAnubadok.gmAnubadkSpan.innerHTML = t.substring(t.search('<br><li>') + 52, t.search('</font> <br><ul>'));
}
		window.gmAnubadok.gmAnubadokImage.src = window.gmAnubadok.ektr_imgSrc;
	    }
	  });
	}

	gmAnubadok.style.border = "1px solid black";
	gmAnubadok.style.display = "none";
	gmAnubadok.style.position = "absolute";
	gmAnubadok.style.backgroundColor = "#FFFFFF";
	gmAnubadok.style.padding = "2px";
	gmAnubadok.style.MozBorderRadius = "5px";
	gmAnubadok.style.font = "arial";
	gmAnubadok.style.fontSize = "14px";
	gmAnubadok.style.color = "black";
	gmAnubadok.style.zIndex = "100";

	var padd = document.createElement("span");
	padd.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

	var gmAnubadkImg = document.createElement("img");
	gmAnubadkImg.src = gmAnubadok.ektr_imgSrc;
	gmAnubadkImg.title = "Click to translate";
	gmAnubadkImg.style.border = "none";
	gmAnubadkImg.style.cursor = "pointer";
	gmAnubadkImg.addEventListener('click', function() {gmAnubadok.defecates();}, true);

	var gmAnubadkSpan = document.createElement("span");

	var closeButton = document.createElement("span");
	closeButton.innerHTML = "x";
	closeButton.style.position = "absolute";
	closeButton.style.right = "0";
	closeButton.style.top = "0";
	closeButton.style.cursor = "pointer";
	closeButton.className = "gmAnubadokToolBar";
	closeButton.title = "Close Anubadok";
	closeButton.addEventListener('click', function() {gmAnubadok.stopCapture();}, true);

	var toolBarDiv = document.createElement("div");
	toolBarDiv.style.borderBottom = "1px dotted black";
	toolBarDiv.style.paddingBottom = "2px";
	toolBarDiv.style.paddingTop = "2px";
	toolBarDiv.style.paddingTop = "2px";

	toolBarDiv.appendChild(gmAnubadkImg);
	toolBarDiv.appendChild(padd);
	toolBarDiv.appendChild(closeButton);

	gmAnubadok.appendChild(toolBarDiv);
	gmAnubadok.appendChild(gmAnubadkSpan);

	gmAnubadok.gmAnubadokImage = gmAnubadkImg;
	gmAnubadok.gmAnubadkSpan = gmAnubadkSpan;

	window.gmAnubadok = gmAnubadok;
	document.body.insertBefore(window.gmAnubadok, document.body.firstChild);
    }
}

engageAnubadok();
