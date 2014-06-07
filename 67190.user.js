// ==UserScript==
// @name           FreeROMs
// @namespace      DSXC
// @include        http://*.freeroms.com/*
// ==/UserScript==

var IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFBAYMCW+DdHoAAAN1SURBVDjLXZNNTNt1AIaf37+ltEUGBVaKmEyGCIrMTGogUYgzBi4wFzDFxMTFQHZSonFk6UXNTAzJjAvRA+GAB8UEiJjwMTEjIEbctBOTNkBBvrYCK1DStbT/fv9/HhYP23t+nyfv5YXH0tvbm+fz+a6GwuE/ImrsfjQe3w9HIn+vrKz09ff3lwNMTU09CjmdTgAmJiY+CQQC8mhrU/puLciNX6bk2sRPcv3nSelz/SkP/H65uLj4A8DMzAwA4n/J6OjocEN9nSO65EHGokhNoiUTaMkkmWSCtKqSSCQoePUc8RP5qzUvVFeNjY2hPIRHuurtdkfw93nSoQc89XoTUtNIHOyTDBwgFIXT7W8TXfPi7f2M5NZ6pcvl+ratre3hgrX19UTsr4Usbd8vKi69T47JBEJw59PLRDbWeO37cVKpJGoqzUiZhXg8RfPiv7hu3y7Wzc3NNZQUFXUdTo8LYlFWJ8fIq28gx2Si5FwTJa1vEQ6FCKkxZi9eoMC/jRGJvupFTp2tDehLS0vPxu7vkj7c58h9h/TdVeZ/u0HDjBsFSKfTiCwDy53NnNle5viEgXBSI73llZY3musUKaVZAIFbv5L0bZCrl1R/cAVN00ilUiiKgk5qPH/5Cyy5eqy5OgrNOgzZ2SLLYNArXq83Yn2umuD2DgY9lF7/Dsv5d9AJQTwaYdP9D6FQiIitjNg3s5iLT2LSaeTX1nEcDoeUgYGBDV22keLW84hsI/6sJ1DQ2PPdg4+aqPrqXXZXl7BYLIhCG8EsM8G8k1Q2teB2u+8JgKGhIflmS4ucfPlpUahL8uBiD5U3B6gwpBACohlwv/clRSPXMO5uol2fxlh6ir6+PrsOwGw2Z1XX1DTWdl/BO32DovkfMekUYhlBLANpqWBZGGcvmib44dfkP1Mll5eWXN3d3Vd1AG63e9ZkMrVmm3OebP38GsflZ/BHkgTUFIc6M/7iCu7WXyDd0Y05v0Cqqhrt6el5yeFwxAVATU0NHo+H9vb2Ybvd7mhsbJRlp8uFMScHVVUJHh2x5l2RUkqhquqK0+l8ZWdnJyiEQA/g8XgAsNlsXfPz83t7e3uXrFar2WazYTQaiUQiuFyuTDgcnj4+Pv54d3c3KIR49EwdHR0MDw8D0NnZaQkGg89Go1FbJpPBaDQeWq3W9cHBwYPHu/8B/IeoYeNzxNQAAAAASUVORK5CYII=';

/************************ Drag n drop*******************************/
function CreatePopupWindow(name, w, h, display)
{
	if (display == null) display = true;
	
	if ($(name + '_Message') == null)
	{
		if (display)
		{
			var CloseButton = "<A HREF='#' ID='" + name + "_Close'><IMG SRC='" + IMAGE + "' border='0' TITLE='Close' ALT='X' /></A>";
			var PopupWindow = document.createElement("div");
			
			var WindowPosition = GM_getValue("Position - " + name, "90px_300px");
			WindowPosition = WindowPosition.split("_");
			
			PopupWindow.style.position = 'absolute';
			PopupWindow.style.top = WindowPosition[0];
			PopupWindow.style.left = WindowPosition[1];	
			
			PopupWindow.id = name + "_Message";
			PopupWindow.innerHTML = "<DIV STYLE='position:absolute; z-index:100; background: white; padding: 0px 0px; color: black; border: 1px solid; font:10pt Verdana; width: " + w + "px; height: " + h + "px;'><DIV ID='" + name + "_Titlebar' STYLE='background: navy; color: white; cursor:move; font-weight: bold'>&nbsp;" + name + " <DIV STYLE='position:absolute; right:0px; top: 0px'>" + CloseButton + "</DIV></DIV><DIV ID='" + name + "' STYLE='padding: 5px 5px; text-align: left; overflow: auto; height: " + (h - 26) + "px;'></DIV></DIV>";
			
			document.body.appendChild(PopupWindow);
			
			makeDraggable($(name + '_Titlebar'));
			$(name + '_Close').addEventListener("mousedown", function() { $(name + '_Message').parentNode.removeChild($(name + '_Message')) }, false);
			
			return $(name);
		}
	}
	else
	{
		$(name + '_Message').parentNode.removeChild($(name + '_Message'));
	}
		
	return null;
}

function CreateSlider(node, width, minimum, maximum, show)
{
	var SliderCtrl = $(node);
	
	if (SliderCtrl != null)
	{
		SliderCtrl.setAttribute('SliderCtrl', 'idle');
		SliderCtrl.setAttribute('RangeMin', minimum);
		SliderCtrl.setAttribute('RangeMax', maximum);
		SliderCtrl.setAttribute('SliderTrack', 'Slider_Track_' + node);
		SliderCtrl.setAttribute('SliderThumb', 'Slider_Thumb_' + node);
		
		if (show != null) SliderCtrl.setAttribute('SliderValue', show);
		
		SliderCtrl.innerHTML = '<DIV ID="Slider_Track_' + node + '" STYLE="width: 200px; left: 2px; height: 1px; border: 1px solid black"><DIV ID="Slider_Thumb_' + node + '" STYLE="z-index:100; margin-top: -3px; width: 5px; height: 6px; border: 1px solid black; background-color: white"></DIV></DIV>';
		
		SliderCtrl.addEventListener("mousedown", function(ev) { this.setAttribute('SliderCtrl', 'drag'); return false; }, false);
		SliderCtrl.addEventListener("mouseup", function(ev) { this.setAttribute('SliderCtrl', 'idle'); return false; }, false);
		SliderCtrl.addEventListener("mousemove", function(ev) {
			if (this.getAttribute('SliderCtrl') == 'drag')
			{
				var SliderTrack = $(this.getAttribute('SliderTrack'));
				var SliderThumb = $(this.getAttribute('SliderThumb'));
				
				var MousePos = mouseCoords(ev);
				var TrackPos = getPosition(SliderTrack);
				var ThumbPos = getPosition(SliderThumb);
				
				var Range = {
					min: (TrackPos.x + 2),
					max: (TrackPos.x + parseFloat(SliderTrack.style.width) - 6)
				};
				
				SliderThumb.style.position = 'relative';

				if (Range.min > MousePos.x)
				{
					SliderThumb.style.left = '0px';
				}
				else if (Range.max < MousePos.x)
				{
					SliderThumb.style.left = (Range.max - Range.min) + 'px';
				}
				else
				{
					SliderThumb.style.left = (MousePos.x - Range.min) + 'px';
				}
				
				if (this.getAttribute('SliderValue') != null && $(this.getAttribute('SliderValue')) != null)
				{
					$(this.getAttribute('SliderValue')).innerHTML = Math.ceil(((parseFloat(SliderThumb.style.left) + 1) * this.getAttribute('RangeMax')) / parseFloat(SliderTrack.style.width));
				}
				
				return false;
			}
		}, false);
	}
}

var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function $(id)
{
  return document.getElementById(id);
}

function mouseCoords(ev)
{
	return { x: ev.pageX, y: ev.pageY };
}

function makeClickable(object)
{
	object.onmousedown = function()
	{
		dragObject = this;
	}
}

function getMouseOffset(target, ev)
{
	var docPos = getPosition(target.parentNode);
	var mousePos = mouseCoords(ev);
	
	return { x:mousePos.x - docPos.x, y:mousePos.y - docPos.y };
}

function getPosition(e)
{
	var left = 0;
	var top  = 0;
	
	while (e.offsetParent)
	{
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}
	
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	
	return { x:left, y:top };
}

function mouseMove(ev)
{
	var target   = ev.target;
	var mousePos = mouseCoords(ev);

	if (dragObject)
	{
		dragObject.parentNode.style.position = 'absolute';
		dragObject.parentNode.style.top      = (mousePos.y - mouseOffset.y) +"px";
		dragObject.parentNode.style.left     = (mousePos.x - mouseOffset.x) +"px";
	}
	
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev)
{
	if (dragObject != null)
	{
		if (dragObject.parentNode.id.indexOf('_Message') != -1)
		{
			var item_name = dragObject.parentNode.id.substring(0, dragObject.parentNode.id.indexOf('_Message'));
			GM_setValue("Position - " + item_name, dragObject.parentNode.style.top + "_" + dragObject.parentNode.style.left);
		}
		
		dragObject = null;
	}
	
	iMouseDown = false;
}

function mouseDown(ev)
{
	var mousePos = mouseCoords(ev);
	var target = ev.target;
	
	iMouseDown = true;	
	
	if (target.getAttribute('DragObj'))
	{
		return false;
	}	
}

function makeDraggable(item)
{
	if (!item) return;
	
	item.addEventListener("mousedown",
		function(ev)
		{
			dragObject = this.parentNode;
			mouseOffset = getMouseOffset(this.parentNode, ev);
			return false;
		},
		false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);

var DownloadLink = CreatePopupWindow('Download', 200, 50, true, false);

if (DownloadLink != null)
{
	var StartPos = document.body.innerHTML.indexOf('server="') + 8;
	var EndPos = document.body.innerHTML.indexOf('";', StartPos);
	
	if (StartPos < 8)
	{
		$('Download_Message').parentNode.removeChild($('Download_Message'));
	}
	else
	{
		var ServerLink = document.body.innerHTML.substring(StartPos, EndPos);
		
		var StartPos = document.body.innerHTML.indexOf('link="') + 6;
		var EndPos = document.body.innerHTML.indexOf('";', StartPos);
		
		var FileLink = document.body.innerHTML.substring(StartPos, EndPos);
	
		DownloadLink.innerHTML = '<a href="' + ServerLink  + FileLink + '"><b>' + FileLink + '</b></a>';
	}
}
