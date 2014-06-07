// ==UserScript==
// @name           SSW Animate War
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Replaces the animated gif on the war record pages.
// @include        http://www.secretsocietywars.com/index.php?p=help&a=wars*
// ==/UserScript==

var cssStyle = (<r><![CDATA[
.dynamic-slider-control {
	position:			relative;
	background-color:	rgb(230,230,230);
	-moz-user-focus:	normal;
	-moz-user-select:	none;
	cursor:				default;
}

.horizontal {
	width:				200px;
	height:				27px;
}

.vertical {
	width:				29px;
	height:				200px;
}

.dynamic-slider-control input {
	display:	none;
}

.dynamic-slider-control .handle {
	position:			absolute;	
	font-size:			1px;
	overflow:			hidden;
	-moz-user-select:	none;
	cursor:				default;
}

.dynamic-slider-control.horizontal .handle {
	width:				31px;
	height:				14px;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAOCAMAAADg+jc1AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAVUExURf/6/5yZnM3OzVphWv///+bm5v////B3FhMAAAAHdFJOU////////wAaSwNGAAAAfElEQVR42mJgY2PGDdjYAAKIgY2ZBTdgZgMIIAZmFlbcgIkZIIAIyQMEEKY8I4o8QAAhy4NlGBmQ1DAxAwQQkjxEBk5A5AECCCGPRRooDxBAcHls0kB5gABCcR+SDEweIIAI+Q8ggAjJAwQQMHyZcANmNoAAYiAQPwABBgA1xgboirgRygAAAABJRU5ErkJggg==)
}

.dynamic-slider-control.horizontal .handle div {}
.dynamic-slider-control.horizontal .handle.hover {}

.dynamic-slider-control.vertical .handle {
	width:				15px;
	height:				31px;
	background-image:	url("handle.vertical.png");

}

.dynamic-slider-control.vertical .handle.hover {}

.dynamic-slider-control .line {
	position:			absolute;
	font-size:			0.01mm;
	overflow:			hidden;
	border:				1px solid rgb(90,97,90);
	background:			rgb(189,190,189);
	
	-moz-box-sizing:	content-box;
}
.dynamic-slider-control.vertical .line {
	width:				3px;
}

.dynamic-slider-control.horizontal .line {
	height:				3px;
}

.dynamic-slider-control .line div {
	width:		1px;
	height:		1px;
	
	border:				1px solid;
	border-color:		rgb(230,230,230) rgb(189,190,189)
						rgb(189,190,189) rgb(230,230,230);
}
]]></r>).toString();

GM_addStyle(cssStyle);

var last_frame = -1;
var the_slider;
var sdiv;
var slider;
var frames = new Array();
var ctx;
var textobj;
var pobj;
var req;
var loading_frame = false;

insert_load_link();

function insert_load_link() {
	var insert_point = document.evaluate('//a[contains(@href, "/wins/drone_map")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(insert_point) {
		insert_point.innerHTML = "Load Javascript Animation";
		insert_point.addEventListener('click', load_animation, false);
	}
}

function load_animation(ev) {
	ev.preventDefault();
	sdiv = document.createElement('div');
	var sinput = document.createElement('input');
	var canvas = document.createElement('canvas');
	var span = document.createElement('div');
	var gif = document.evaluate('//img[contains(@src, "/wins/drone_map")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var dataurl = ev.target.href;
	textobj = document.createTextNode("Loading data...");
	pobj = document.createElement('p');
	pobj.style.fontSize = "9px";
	ev.target.removeEventListener('click', load_animation, false);
	ev.target.parentNode.replaceChild(textobj, ev.target);
	textobj.parentNode.insertBefore(pobj, textobj.nextSibling);
	canvas.width = 330;
	canvas.height = 330;
	sdiv.style.width = "330";
	sdiv.id = "slider-1";
	sdiv.tabIndex = 1;
	sdiv.appendChild(sinput);
	span.appendChild(canvas);
	span.appendChild(sdiv);
	span.style.textAlign = "left";
//	span.style.marginLeft = "0px";
//	span.style.marginRight = "auto";

	sdiv.style.visibility = "hidden";
	ctx = canvas.getContext("2d");

	if(!gif) {
		gif = document.createElement('span');
		textobj.parentNode.insertBefore(gif, textobj);
		textobj.parentNode.insertBefore(document.createElement('br'), textobj);
	}

	if(gif) {
		req = new XMLHttpRequest();
		gif.parentNode.replaceChild(span, gif);
		slider = new Slider(sdiv, sinput);
		slider.setValue(0);
		slider.onchange = slider_moved;
//		req.onreadystatechange = function() {loading_data(req, textobj);};
		req.onreadystatechange = loading_data;
		req.open('GET', dataurl, true);
		req.send(null);

/*		
		GM_xmlhttpRequest({
			method: 'GET',
			url: dataurl,
			onload: function(responseDetails) {data_loaded(responseDetails, textobj);},
			onreadystatechange: function(responseDetails) {loading_data(responseDetails, textobj);},
		});
*/
	} else {
		alert("Unable to find gif.  Sorry, this script isn't going to work :(");
	}
}

function parse(data, textobj) {
	var lines = data.split(/\r?\n/);
	var timestamp;
	var data = "";
	var vars = new Array();
	var re;
	for(var i = 0; i < lines.length; i++) {
		if(lines[i].substr(0, 10) == "timestamp|") {
			if(timestamp) {
				modify_vars(vars);
				frames.push([timestamp, data, vars]);
				data = "";
				vars = new Array();
			}
			timestamp = lines[i].substr(10);
		} else if(lines[i].indexOf(":") > 0) {
			var replacements = [["illuminati:", "Illuminati - "], ["oddfellows:", "Oddfellows - "], ["amaranth:", "Amaranth - "],
			                    ["eastern_star:", "Eastern Star - "], ["triad:", "Triad - "], ["SPACE|", "Space: "],
			                    ["INV|", "Inv: "], ["FACT|", "Factory: "], ["DC|", "DC: "], ["STOR|", "Storage: "]];
			var val = lines[i];
			for(var j = 0; j < replacements.length; j++) {
				val = val.replace(replacements[j][0], replacements[j][1]);
			}
			vars.push(val);
		} else {
			data += lines[i];
		}
	}
	GM_log("parsed");
	slider.setMaximum(frames.length-1);
	textobj.data = frames.length+" frames loaded";
	sdiv.style.visibility = "visible";
}

function modify_vars(vars) {
	var totals = new Array();
	var max = 0;
	var all_drones = 0;
	for(var i = 0; i < vars.length; i++) {
		totals[i] = count_drones(vars[i]);
		all_drones += totals[i];
		if(totals[i] > max) {
			max = totals[i];
		}
//		vars[i] = vars[i].replace(/ - /, " - Total: "+totals[i]+"<br>");
//		vars[i] = add_commas(vars[i]);
	}
	for(var i = 0; i < vars.length; i++) {
		if(all_drones) {
			vars[i] = vars[i].replace(/ - /, " - Total: "+totals[i]+" - "+(Math.round(totals[i]/all_drones*1000)/10)+"%<br>");
		} else {
			vars[i] = vars[i].replace(/ - /, " - Total: "+totals[i]+"<br>");
		}
		vars[i] = add_commas(vars[i]);
		if(max && (totals[i] == max)) {
			vars[i] = '<b style="font-size: 10px">'+vars[i]+"</b>";
		}
	}
}

function add_commas(line) {
	var old_line = line;
	var new_line;
	while((new_line = line.replace(/(\d)(\d\d\d)\b/, "$1,$2")) != old_line) {
		line = old_line = new_line;
	}
	return new_line;
}

function count_drones(line) {
	var count = 0;
	var re;
	while(re = /(\d+)/g.exec(line)) {
		count += parseInt(re[1], 10);
	}
	return count;
}

function data_loaded(responseText, textobj) {
	textobj.data = "Parsing "+responseText.length+" bytes";
	parse(responseText, textobj);
}

function loading_data() {
	if(req.readyState < 4) {
//		textobj.data = "Data: " + parseInt(req.responseText.length / 1024, 10) + "KB";
//		GM_log(req.responseText.length);
	} else if(req.status == 200) {
		data_loaded(req.responseText, textobj);
	} else {
		alert("Error requesting file");
	}
}

function slider_moved() {
	var framenum = slider.getValue();
	if(framenum != last_frame) {
		last_frame = framenum;
		if(framenum < frames.length) {
			load_frame(framenum);
		}
	}
}

function load_frame(framenum) {
	var colors = {'P': "rgb(255, 255, 255)", 'A': "rgb(153, 153, 153)", 'T': "rgb(255, 51, 0)", 'E': "rgb(255, 0, 0)", 'O': "rgb(0, 0, 153)", 'I': "rgb(0, 153, 0)", 'X': "rgb(0, 0, 0)"};
	if(!loading_frame) {
		var str = frames[framenum][1];
		var vars = frames[framenum][2];
		loading_frame = true;
//		textobj.data = frames[framenum][0] + vars.join("\r\n");
		textobj.data = frames[framenum][0];
		pobj.innerHTML = vars.join("<br>");
		for(var i = 0; i < str.length; i++) {
			var x = (i%33)*10;
			var y = parseInt(i/33, 10)*10;
			ctx.fillStyle = colors[str.charAt(i)];
			ctx.fillRect(x, y, x+10, y+10);
		}
	}
	loading_frame = false;
}











/*----------------------------------------------------------------------------\
|                                Range Class                                  |
|-----------------------------------------------------------------------------|
|                         Created by Erik Arvidsson                           |
|                  (http://webfx.eae.net/contact.html#erik)                   |
|                      For WebFX (http://webfx.eae.net/)                      |
|-----------------------------------------------------------------------------|
| Used to  model the data  used  when working  with  sliders,  scrollbars and |
| progress bars.  Based  on  the  ideas of  the javax.swing.BoundedRangeModel |
| interface  defined  by  Sun  for  Java;   http://java.sun.com/products/jfc/ |
| swingdoc-api-1.0.3/com/sun/java/swing/BoundedRangeModel.html                |
|-----------------------------------------------------------------------------|
|                Copyright (c) 2002, 2005, 2006 Erik Arvidsson                |
|-----------------------------------------------------------------------------|
| Licensed under the Apache License, Version 2.0 (the "License"); you may not |
| use this file except in compliance with the License.  You may obtain a copy |
| of the License at http://www.apache.org/licenses/LICENSE-2.0                |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
| Unless  required  by  applicable law or  agreed  to  in  writing,  software |
| distributed under the License is distributed on an  "AS IS" BASIS,  WITHOUT |
| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |
| License  for the  specific language  governing permissions  and limitations |
| under the License.                                                          |
|-----------------------------------------------------------------------------|
| 2002-10-14 | Original version released                                      |
| 2005-10-27 | Use Math.round instead of Math.floor                           |
| 2006-05-28 | Changed license to Apache Software License 2.0.                |
|-----------------------------------------------------------------------------|
| Created 2002-10-14 | All changes are in the log above. | Updated 2006-05-28 |
\----------------------------------------------------------------------------*/


function Range() {
	this._value = 0;
	this._minimum = 0;
	this._maximum = 100;
	this._extent = 0;

	this._isChanging = false;
	this.setExtent = function (extent) {
		if (this._extent != extent) {
			if (extent < 0)
				this._extent = 0;
			else if (this._value + extent > this._maximum)
				this._extent = this._maximum - this._value;
			else
				this._extent = extent;
			if (!this._isChanging && typeof this.onchange == "function")
				this.onchange();
		}
	};
	this.setValue = function (value) {
		value = Math.round(parseFloat(value));
		if (isNaN(value)) return;
		if (this._value != value) {
			if (value + this._extent > this._maximum)
				this._value = this._maximum - this._extent;
			else if (value < this._minimum)
				this._value = this._minimum;
			else
				this._value = value;
			if (!this._isChanging && typeof this.onchange == "function")
				 this.onchange();
		}
	};
	this.getValue = function () {
		return this._value;
	};
	this.getExtent = function () {
		return this._extent;
	};
	this.setMinimum = function (minimum) {
		if (this._minimum != minimum) {
			var oldIsChanging = this._isChanging;
			this._isChanging = true;
	
			this._minimum = minimum;
	
			if (minimum > this._value)
				this.setValue(minimum);
			if (minimum > this._maximum) {
				this._extent = 0;
				this.setMaximum(minimum);
				this.setValue(minimum)
			}
			if (minimum + this._extent > this._maximum)
				this._extent = this._maximum - this._minimum;
	
			this._isChanging = oldIsChanging;
			if (!this._isChanging && typeof this.onchange == "function")
				this.onchange();
		}
	};
	this.getMinimum = function () {
		return this._minimum;
	};
	this.setMaximum = function (maximum) {
		if (this._maximum != maximum) {
			var oldIsChanging = this._isChanging;
			this._isChanging = true;
	
			this._maximum = maximum;
	
			if (maximum < this._value)
				this.setValue(maximum - this._extent);
			if (maximum < this._minimum) {
				this._extent = 0;
				this.setMinimum(maximum);
				this.setValue(this._maximum);
			}
			if (maximum < this._minimum + this._extent)
				this._extent = this._maximum - this._minimum;
			if (maximum < this._value + this._extent)
				this._extent = this._maximum - this._value;
	
			this._isChanging = oldIsChanging;
			if (!this._isChanging && typeof this.onchange == "function")
				this.onchange();
		}
	};
	this.getMaximum = function () {
		return this._maximum;
	};
}




/*----------------------------------------------------------------------------\
|                                 Timer Class                                 |
|-----------------------------------------------------------------------------|
|                         Created by Erik Arvidsson                           |
|                  (http://webfx.eae.net/contact.html#erik)                   |
|                      For WebFX (http://webfx.eae.net/)                      |
|-----------------------------------------------------------------------------|
| Object Oriented Encapsulation  of setTimeout  fires ontimer when the  timer |
| is triggered. Does not work in IE 5.00                                      |
|-----------------------------------------------------------------------------|
|                   Copyright (c) 2002, 2006 Erik Arvidsson                   |
|-----------------------------------------------------------------------------|
| Licensed under the Apache License, Version 2.0 (the "License"); you may not |
| use this file except in compliance with the License.  You may obtain a copy |
| of the License at http://www.apache.org/licenses/LICENSE-2.0                |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
| Unless  required  by  applicable law or  agreed  to  in  writing,  software |
| distributed under the License is distributed on an  "AS IS" BASIS,  WITHOUT |
| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |
| License  for the  specific language  governing permissions  and limitations |
| under the License.                                                          |
|-----------------------------------------------------------------------------|
| 2002-10-14 | Original version released                                      |
| 2006-05-28 | Changed license to Apache Software License 2.0.                |
|-----------------------------------------------------------------------------|
| Created 2002-10-14 | All changes are in the log above. | Updated 2006-05-28 |
\----------------------------------------------------------------------------*/

function Timer(nPauseTime) {
	this._pauseTime = typeof nPauseTime == "undefined" ? 1000 : nPauseTime;
	this._timer = null;
	this._isStarted = false;
}

Timer.prototype.start = function () {
	if (this.isStarted())
		this.stop();
	var oThis = this;
	this._timer = window.setTimeout(function () {
		if (typeof oThis.ontimer == "function")
			oThis.ontimer();
	}, this._pauseTime);
	this._isStarted = false;
};

Timer.prototype.stop = function () {
	if (this._timer != null)
		window.clearTimeout(this._timer);
	this._isStarted = false;
};

Timer.prototype.isStarted = function () {
	return this._isStarted;
};

Timer.prototype.getPauseTime = function () {
	return this._pauseTime;
};

Timer.prototype.setPauseTime = function (nPauseTime) {
	this._pauseTime = nPauseTime;
};

/*----------------------------------------------------------------------------\
|                                Slider 1.02                                  |
|-----------------------------------------------------------------------------|
|                         Created by Erik Arvidsson                           |
|                  (http://webfx.eae.net/contact.html#erik)                   |
|                      For WebFX (http://webfx.eae.net/)                      |
|-----------------------------------------------------------------------------|
| A  slider  control that  degrades  to an  input control  for non  supported |
| browsers.                                                                   |
|-----------------------------------------------------------------------------|
|                Copyright (c) 2002, 2003, 2006 Erik Arvidsson                |
|-----------------------------------------------------------------------------|
| Licensed under the Apache License, Version 2.0 (the "License"); you may not |
| use this file except in compliance with the License.  You may obtain a copy |
| of the License at http://www.apache.org/licenses/LICENSE-2.0                |
| - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - |
| Unless  required  by  applicable law or  agreed  to  in  writing,  software |
| distributed under the License is distributed on an  "AS IS" BASIS,  WITHOUT |
| WARRANTIES OR  CONDITIONS OF ANY KIND,  either express or implied.  See the |
| License  for the  specific language  governing permissions  and limitations |
| under the License.                                                          |
|-----------------------------------------------------------------------------|
| Dependencies: timer.js - an OO abstraction of timers                        |
|               range.js - provides the data model for the slider             |
|               winclassic.css or any other css file describing the look      |
|-----------------------------------------------------------------------------|
| 2002-10-14 | Original version released                                      |
| 2003-03-27 | Added a test in the constructor for missing oElement arg       |
| 2003-11-27 | Only use mousewheel when focused                               |
| 2006-05-28 | Changed license to Apache Software License 2.0.                |
|-----------------------------------------------------------------------------|
| Created 2002-10-14 | All changes are in the log above. | Updated 2006-05-28 |
\----------------------------------------------------------------------------*/

var the_slider;

function Slider(oElement, oInput, sOrientation) {

	var eventHandlers = {
	
		// helpers to make events a bit easier
		getEvent:	function (e, el) {
			if (!e) {
				if (el)
					e = el.document.parentWindow.event;
				else
					e = window.event;
			}
			if (!e.srcElement) {
				var el = e.target;
				while (el != null && el.nodeType != 1)
					el = el.parentNode;
				e.srcElement = el;
			}
			if (typeof e.offsetX == "undefined") {
				e.offsetX = e.layerX;
				e.offsetY = e.layerY;
			}
	
			return e;
		},
	
		getDocument:	function (e) {
			if (e.target)
				return e.target.ownerDocument;
			return e.srcElement.document;
		},
	
		getSlider:	function (e) {
			var el = e.target || e.srcElement;
			while (el != null && el.slider == null)	{
				el = el.parentNode;
			}
			if (el)
				return el.slider;
			return null;
		},
	
		getLine:	function (e) {
			var el = e.target || e.srcElement;
			while (el != null && el.className != "line")	{
				el = el.parentNode;
			}
			return el;
		},
	
		getHandle:	function (e) {
			var el = e.target || e.srcElement;
			var re = /handle/;
			while (el != null && !re.test(el.className))	{
				el = el.parentNode;
			}
			return el;
		},
		// end helpers
	
		onfocus:	function (e) {
			var s = the_slider;
			s._focused = true;
			s.handle.className = "handle hover";
		},
	
		onblur:	function (e) {
			var s = the_slider;
			s._focused = false;
			s.handle.className = "handle";
		},
	
		onmouseover:	function (e) {
			e = eventHandlers.getEvent(e, this);
			var s = the_slider;
			if (e.srcElement == s.handle)
				s.handle.className = "handle hover";
		},
	
		onmouseout:	function (e) {
			e = eventHandlers.getEvent(e, this);
			var s = the_slider;
			if (e.srcElement == s.handle && !s._focused)
				s.handle.className = "handle";
		},
	
		onmousedown:	function (e) {
			e = eventHandlers.getEvent(e, this);
			var s = the_slider;
			if (s.element.focus)
				s.element.focus();
	
			Slider._currentInstance = s;
			var doc = s.document;
			if (doc.addEventListener) {
				doc.addEventListener("mousemove", eventHandlers.onmousemove, true);
				doc.addEventListener("mouseup", eventHandlers.onmouseup, true);
			}

			if (eventHandlers.getHandle(e)) {	// start drag
				Slider._sliderDragData = {
					screenX:	e.screenX,
					screenY:	e.screenY,
					dx:			e.screenX - s.handle.offsetLeft,
					dy:			e.screenY - s.handle.offsetTop,
					startValue:	s.getValue(),
					slider:		s
				};
			}
			else {
				var lineEl = eventHandlers.getLine(e);
				s._mouseX = e.offsetX + (lineEl ? s.line.offsetLeft : 0);
				s._mouseY = e.offsetY + (lineEl ? s.line.offsetTop : 0);
				s._increasing = null;
				s.ontimer();
			}
		},
	
		onmousemove:	function (e) {
			e = eventHandlers.getEvent(e, this);
	
			if (Slider._sliderDragData) {	// drag
				var s = Slider._sliderDragData.slider;
	
				var boundSize = s.getMaximum() - s.getMinimum();
				var size, pos, reset;
	
				if (s._orientation == "horizontal") {
					size = s.element.offsetWidth - s.handle.offsetWidth;
					pos = e.screenX - Slider._sliderDragData.dx;
					reset = Math.abs(e.screenY - Slider._sliderDragData.screenY) > 100;
				}
				else {
					size = s.element.offsetHeight - s.handle.offsetHeight;
					pos = s.element.offsetHeight - s.handle.offsetHeight -
						(e.screenY - Slider._sliderDragData.dy);
					reset = Math.abs(e.screenX - Slider._sliderDragData.screenX) > 100;
				}
				s.setValue(reset ? Slider._sliderDragData.startValue :
							s.getMinimum() + boundSize * pos / size);
				return false;
			}
			else {
				var s = Slider._currentInstance;
				if (s != null) {
					var lineEl = eventHandlers.getLine(e);
					s._mouseX = e.offsetX + (lineEl ? s.line.offsetLeft : 0);
					s._mouseY = e.offsetY + (lineEl ? s.line.offsetTop : 0);
				}
			}
	
		},
	
		onmouseup:	function (e) {
			e = eventHandlers.getEvent(e, this);
			var s = Slider._currentInstance;
			var doc = s.document;
			if (doc.removeEventListener) {
				doc.removeEventListener("mousemove", eventHandlers.onmousemove, true);
				doc.removeEventListener("mouseup", eventHandlers.onmouseup, true);
			}
			else if (doc.detachEvent) {
				doc.detachEvent("onmousemove", eventHandlers.onmousemove);
				doc.detachEvent("onmouseup", eventHandlers.onmouseup);
				doc.detachEvent("onlosecapture", eventHandlers.onmouseup);
				s.element.releaseCapture();
			}
	
			if (Slider._sliderDragData) {	// end drag
				Slider._sliderDragData = null;
			}
			else {
				s._timer.stop();
				s._increasing = null;
			}
			Slider._currentInstance = null;
		},
	
		onkeydown:	function (e) {
			e = eventHandlers.getEvent(e, this);
			//var s = eventHandlers.getSlider(e);
			var s = the_slider;
			var kc = e.keyCode;
			switch (kc) {
				case 33:	// page up
					s.setValue(s.getValue() + s.getBlockIncrement());
					break;
				case 34:	// page down
					s.setValue(s.getValue() - s.getBlockIncrement());
					break;
				case 35:	// end
					s.setValue(s.getOrientation() == "horizontal" ?
						s.getMaximum() :
						s.getMinimum());
					break;
				case 36:	// home
					s.setValue(s.getOrientation() == "horizontal" ?
						s.getMinimum() :
						s.getMaximum());
					break;
				case 38:	// up
				case 39:	// right
					s.setValue(s.getValue() + s.getUnitIncrement());
					break;
	
				case 37:	// left
				case 40:	// down
					s.setValue(s.getValue() - s.getUnitIncrement());
					break;
			}
	
			if (kc >= 33 && kc <= 40) {
				return false;
			}
		},
	
		onkeypress:	function (e) {
			e = eventHandlers.getEvent(e, this);
			var kc = e.keyCode;
			if (kc >= 33 && kc <= 40) {
				return false;
			}
		},
	
		onmousewheel:	function (e) {
			e = eventHandlers.getEvent(e, this);
			var s = the_slider;
			if (s._focused) {
				s.setValue(s.getValue() + e.wheelDelta / 120 * s.getUnitIncrement());
				// windows inverts this on horizontal sliders. That does not
				// make sense to me
				return false;
			}
		}
	};

	if (!oElement) return;
	the_slider = this;
	this._orientation = sOrientation || "horizontal";
	this._range = new Range();
	this._range.setExtent(0);
	this._blockIncrement = 10;
	this._unitIncrement = 1;
	this._timer = new Timer(100);

	if (oElement) {

		this.document = oElement.ownerDocument || oElement.document;

		this.element = oElement;
		this.element.slider = this;
		this.element.unselectable = "on";

		// add class name tag to class name
		this.classNameTag = "dynamic-slider-control";
		this.element.className = this._orientation + " " + this.classNameTag + " " + this.element.className;

		// create line
		this.line = this.document.createElement("DIV");
		this.line.className = "line";
		this.line.unselectable = "on";
		this.line.appendChild(this.document.createElement("DIV"));
		this.element.appendChild(this.line);

		// create handle
		this.handle = this.document.createElement("DIV");
		this.handle.className = "handle";
		this.handle.unselectable = "on";
		this.handle.appendChild(this.document.createElement("DIV"));
		this.handle.firstChild.appendChild(
			this.document.createTextNode(String.fromCharCode(160)));
		this.element.appendChild(this.handle);
	}

	this.input = oInput;

	// events
	var oThis = this;
	this._range.onchange = function () {
		oThis.recalculate();
		if (typeof oThis.onchange == "function")
			oThis.onchange();
	};

	if (oElement) {
		this.element.addEventListener('focus', eventHandlers.onfocus, false);
		this.element.addEventListener('blur', eventHandlers.onblur, false);
		this.element.addEventListener('mousedown', eventHandlers.onmousedown, false);
		this.element.addEventListener('mouseover', eventHandlers.onmouseover, false);
		this.element.addEventListener('mouseout', eventHandlers.onmouseout, false);
		this.element.addEventListener('keydown', eventHandlers.onkeydown, false);
		this.element.addEventListener('keypress', eventHandlers.onkeypress, false);
		this.element.addEventListener('mousewheel', eventHandlers.onmousewheel, false);
/*
		this.handle.onselectstart	=
		this.element.onselectstart	= function () { return false; };
*/

/*
		this.element.onfocus		= eventHandlers.onfocus;
		this.element.onblur			= eventHandlers.onblur;
		this.element.onmousedown	= eventHandlers.onmousedown;
		this.element.onmouseover	= eventHandlers.onmouseover;
		this.element.onmouseout		= eventHandlers.onmouseout;
		this.element.onkeydown		= eventHandlers.onkeydown;
		this.element.onkeypress		= eventHandlers.onkeypress;
		this.element.onmousewheel	= eventHandlers.onmousewheel;
		this.handle.onselectstart	=
		this.element.onselectstart	= function () { return false; };
*/

		this._timer.ontimer = function () {
			oThis.ontimer();
		};

		// extra recalculate for ie
		window.setTimeout(function() {
			oThis.recalculate();
		}, 1);
	}
	else {
		this.input.onchange = function (e) {
			oThis.setValue(oThis.input.value);
		};
	}
	
	this.setValue = function (v) {
		this._range.setValue(v);
		this.input.value = this.getValue();
	};
	
	this.getValue = function () {
		return this._range.getValue();
	};
	
	this.setMinimum = function (v) {
		this._range.setMinimum(v);
		this.input.value = this.getValue();
	};
	
	this.getMinimum = function () {
		return this._range.getMinimum();
	};
	
	this.setMaximum = function (v) {
		this._range.setMaximum(v);
		this.input.value = this.getValue();
	};
	
	this.getMaximum = function () {
		return this._range.getMaximum();
	};
	
	this.setUnitIncrement = function (v) {
		this._unitIncrement = v;
	};
	
	this.getUnitIncrement = function () {
		return this._unitIncrement;
	};
	
	this.setBlockIncrement = function (v) {
		this._blockIncrement = v;
	};
	
	this.getBlockIncrement = function () {
		return this._blockIncrement;
	};
	
	this.getOrientation = function () {
		return this._orientation;
	};
	
	this.setOrientation = function (sOrientation) {
		if (sOrientation != this._orientation) {
			if (true && this.element) {
				// add class name tag to class name
				this.element.className = this.element.className.replace(this._orientation,
										sOrientation);
			}
			this._orientation = sOrientation;
			this.recalculate();
	
		}
	};
	
	this.recalculate = function() {
		if (!true || !this.element) return;
	
		var w = this.element.offsetWidth;
		var h = this.element.offsetHeight;
		var hw = this.handle.offsetWidth;
		var hh = this.handle.offsetHeight;
		var lw = this.line.offsetWidth;
		var lh = this.line.offsetHeight;
	
		// this assumes a border-box layout
	
		if (this._orientation == "horizontal") {
			this.handle.style.left = (w - hw) * (this.getValue() - this.getMinimum()) /
				(this.getMaximum() - this.getMinimum()) + "px";
			this.handle.style.top = (h - hh) / 2 + "px";
	
			this.line.style.top = (h - lh) / 2 + "px";
			this.line.style.left = hw / 2 + "px";
			//this.line.style.right = hw / 2 + "px";
			this.line.style.width = Math.max(0, w - hw - 2)+ "px";
			this.line.firstChild.style.width = Math.max(0, w - hw - 4)+ "px";
		}
		else {
			this.handle.style.left = (w - hw) / 2 + "px";
			this.handle.style.top = h - hh - (h - hh) * (this.getValue() - this.getMinimum()) /
				(this.getMaximum() - this.getMinimum()) + "px";
	
			this.line.style.left = (w - lw) / 2 + "px";
			this.line.style.top = hh / 2 + "px";
			this.line.style.height = Math.max(0, h - hh - 2) + "px";	//hard coded border width
			//this.line.style.bottom = hh / 2 + "px";
			this.line.firstChild.style.height = Math.max(0, h - hh - 4) + "px";	//hard coded border width
		}
	};
	
	this.ontimer = function () {
		var hw = this.handle.offsetWidth;
		var hh = this.handle.offsetHeight;
		var hl = this.handle.offsetLeft;
		var ht = this.handle.offsetTop;
	
		if (this._orientation == "horizontal") {
			if (this._mouseX > hl + hw &&
				(this._increasing == null || this._increasing)) {
				this.setValue(this.getValue() + this.getBlockIncrement());
				this._increasing = true;
			}
			else if (this._mouseX < hl &&
				(this._increasing == null || !this._increasing)) {
				this.setValue(this.getValue() - this.getBlockIncrement());
				this._increasing = false;
			}
		}
		else {
			if (this._mouseY > ht + hh &&
				(this._increasing == null || !this._increasing)) {
				this.setValue(this.getValue() - this.getBlockIncrement());
				this._increasing = false;
			}
			else if (this._mouseY < ht &&
				(this._increasing == null || this._increasing)) {
				this.setValue(this.getValue() + this.getBlockIncrement());
				this._increasing = true;
			}
		}
	
		this._timer.start();
	};
}
