// ==UserScript==
// @name           AntiTnt
// @namespace      http://kataho.net/
// @description    Peeks layers of an oekakiko
// @include        http://dic.nicovideo.jp/*
// @license        New BSD License
// ==/UserScript==

// parameter settings
var oekakiInfoPrefix = "/oekaki_info/";
var oekakiInfoSuffix = "";
var layersPrefix = "/oekaki_layers/";
var layersSuffix = "";
var myUnsafeWindow = null;
var backgroundDataUrl = "url('data:image/gif;base64,R0lGODlhCAAIAIAAAP///4CAgCH5BAAAAAAALAAAAAAIAAgAAAINhBEZh8q6DoTPSWvoKQA7')";

try {
	myUnsafeWindow = unsafeWindow;
} catch (e) {
	myUnsafeWindow = window;
}

try {
	if (antiTntDebugging) {
		oekakiInfoPrefix = "";
		oekakiInfoSuffix = "_info.js";
		layersPrefix = "";
		layersSuffix = "_layers.png";
	}
} catch (e) {}


function calcColorDefault(oc, bc, oaa, ba) {
	var nc = oc * oaa + bc * ba * (1.0 - oaa);
	return nc > 1.0 ? 1.0 : nc;
}
function calcAlphaDefault(oaa, ba) {
	return oaa + ba - oaa * ba;
}

function calcColorAdd(oc, bc, oaa, ba) {
	var nc = oc * oaa + bc * ba;
	return nc > 1.0 ? 1.0 : nc;
}
function calcAlphaAdd(oaa, ba) {
	var na = oaa + ba;
	return na > 1.0 ? 1.0 : na;
}

function calcColorMultiply(oc, bc, oaa, ba) {
	var oca = oc * oaa;
	var bca = bc * ba;
	var nc = oca * bca + oca * (1.0 - ba) + bca * (1.0 - oaa);
	return nc > 1.0 ? 1.0 : nc;
}

function calcColorScreen(oc, bc, oaa, ba) {
	var oca = oc * oaa;
	var bca = bc * ba;
	return oca + bca - oca * bca;
}

function calcColorOverlay(oc, bc, oaa, ba) {
	var oca = oc * oaa;
	var bca = bc * ba;
	var nc = 0.0;
	if (2.0 * bca < ba) {
		nc = 2 * oca * bca + oca * (1.0 - ba) + bca * (1.0 - oaa);
	} else {
		nc = oaa * ba - 2.0 * (ba - bca) * (oaa - oca) + oca * (1.0 - ba) + bca * (1.0 - oaa);
	}
	return nc > 1.0 ? 1.0 : nc;
}

function calcColorHardLight(oc, bc, oaa, ba) {
	var oca = oc * oaa;
	var bca = bc * ba;
	var nc = 0.0;
	if (2.0 * oca < oaa) {
		nc = 2 * oca * bca + oca * (1.0 - ba) + bca * (1.0 - oaa);
	} else {
		nc = oaa * ba - 2.0 * (ba - bca) * (oaa - oca) + oca * (1.0 - ba) + bca * (1.0 - oaa);
	}
	return nc > 1.0 ? 1.0 : nc;
}

var mMin = Math.min;
function calcColorDifference(oc, bc, oaa, ba) {
	var oca = oc * oaa;
	var bca = bc * ba;
	return oca + bca - 2 * mMin(oca * ba, bca * oaa);
}

function calcColorSubtract(oc, bc, oaa, ba) {
	var oca = oc * oaa;
	var bca = bc * ba;
	var nc = oca + bca - 2.0 * oca * ba;
	return nc < 0.0 ? 0.0 : nc;
}

function calcColorDarken(oc, bc, oaa, ba) {
	var a = oaa * ba;
	if (oc * a < bc * a) {
		return calcColorDefault(oc, bc, oaa, ba);
	} else {
		return calcColorDefault(bc, oc, ba, oaa);
	}
}

function calcColorLighten(oc, bc, oaa, ba) {
	var a = oaa * ba;
	if (oc * a > bc * a) {
		return calcColorDefault(oc, bc, oaa, ba);
	} else {
		return calcColorDefault(bc, oc, ba, oaa);
	}
}

function calcColorInvert(oc, bc, oaa, ba) {
	return (1.0 - 2.0 * bc) * oaa + bc;
}
function calcAlphaInvert(oaa, ba) {
	return ba;
}

function calcColorExclusion(oc, bc, oaa, ba) {
	var oca = oc * oaa;
	var bca = bc * ba;
	var nc = oca * ba + bca * oaa - 2.0 * oca * bca + oca * (1.0 - ba) + bca * (1.0 - oaa);
	return nc > 1.0 ? 1.0 : nc;
}

function getCalcColor(blendMode) {
	switch (blendMode) {
	case "add":
		return calcColorAdd;
	case "multiply":
		return calcColorMultiply;
	case "screen":
		return calcColorScreen;
	case "overlay":
		return calcColorOverlay;
	case "hardlight":
		return calcColorHardLight;
	case "difference":
		return calcColorDifference;
	case "subtract":
		return calcColorSubtract;
	case "darken":
		return calcColorDarken;
	case "lighten":
		return calcColorLighten;
	case "invert":
		return calcColorInvert;
	default:
		return calcColorDefault;
	}
}

function getCalcAlpha(blendMode) {
	switch (blendMode) {
	case "add":
		return calcAlphaAdd;
	case "invert":
		return calcAlphaInvert;
	case "multiply":
	case "screen":
	case "overlay":
	case "hardlight":
	case "difference":
	case "subtract":
	case "darken":
	case "lighten":
	default:
		return calcAlphaDefault;
	}
}

// synthesize two layers
function synthLayers(baseImage, layersImage, layerIndex, alpha, blendMode) {
	var width = baseImage.width;
	var height = baseImage.height;
	var calcColor = getCalcColor(blendMode);
	var calcAlpha = getCalcAlpha(blendMode);
	var bData = baseImage.data;
	var oData = layersImage.data;
	var len = bData.length;
	var round = Math.round;
	var layersImageBase = width * height * 4 * layerIndex;
	for (var ib = 0, ibo = layersImageBase; ib < len; ib += 4, ibo += 4) {
		var oa = oData[ibo + 3];
		if (oa != 0)  {
			oaa = oa * alpha / 255;
//			oa = oa / 255;
			var ba = bData[ib + 3] / 255;
			for (var c = 0; c < 3; ++c) {
				var bc = bData[ib + c] / 255;
				var oc = oData[ibo + c] / 255;
				var nc = calcColor(oc, bc, oaa, ba);
				bData[ib + c] = round(nc * 255);
			}
			bData[ib + 3] = round(calcAlpha(oaa, ba) * 255);
		}
	}
	return baseImage;
}

// compose layers and shows the composed image
function compose(oekakiCtrlDiv) {
	var oekakiId = oekakiCtrlDiv['oekakiId'];
	var oekakiInfo = oekakiCtrlDiv['oekakiInfo'];
	var layersImg = oekakiCtrlDiv['layersImg'];
	var compositeCanvas = oekakiCtrlDiv['compositeCanvas'];
	var width = oekakiInfo['width'];
	var height = oekakiInfo['height'];
	var ctxc = compositeCanvas.getContext('2d');
	var ctxcUptodate = false;
	var numLayers = oekakiInfo['layer_infos'].length;
	var layersImageData = oekakiCtrlDiv['layersImageData'];
	var imageData = ctxl.getImageData(0, 0, width, height);
	var len = imageData.data.length;
	var data = new Array(len);
	imageData.data = data;
	for (var i = 0; i < len; ++i) {
		data[i] = 0;
	}
	for (var i = 0; i < numLayers; ++i) {
		var check = document.getElementById('oekakiCtrl' + oekakiId + 'Check' + i)
		var layerInfo = oekakiInfo['layer_infos'][i];
		if (!check.checked || layerInfo['alpha'] == 0) {
			continue;
		}
		if (layerInfo['blendMode'] == 'normal') {
			if (!ctxcUptodate) {
				ctxc.putImageData(imageData, 0, 0);
				ctxcUptodate = true;
			}
			ctxc.globalAlpha = layerInfo['alpha'];
			ctxc.drawImage(layersImg, 0, height * i, width, height, 0, 0, width, height);
			globalAlpha = 1.0;
			imageData = ctxc.getImageData(0, 0, width, height);
		} else {
			ctxcUptodate = false;
			synthLayers(imageData, layersImageData, i, layerInfo['alpha'], layerInfo['blendMode']);
		}
	}
	if (!ctxcUptodate) {
		ctxc.putImageData(imageData, 0, 0);
	}
	var dataUrl = compositeCanvas.toDataURL();
	oekakiCtrlDiv['oekakiImg'].src = dataUrl;
}

// creates a canvas for an ImageData
function createBaseImg(oekakiCtrlDiv) {
	var oekakiId = oekakiCtrlDiv['oekakiId'];
	var oekakiInfo = oekakiCtrlDiv['oekakiInfo'];
	var width = oekakiInfo['width'];
	var totalHeight = oekakiInfo['height'] * oekakiInfo['layer_infos'].length;

	var layersCanvas = myUnsafeWindow.document.createElement('canvas');
	layersCanvas.id = 'oekaki' + oekakiId + 'layersCanvas';
	layersCanvas.width = width;
	layersCanvas.height = totalHeight;
	layersCanvas.style.display = 'none';
//	oekakiCtrlDiv.appendChild(layersCanvas);
	oekakiCtrlDiv["layersCanvas"] = layersCanvas;
}

// called when a checkbox clicked
function onClickCheck(oekakiCtrlDiv, eventArg) {
	if (!oekakiCtrlDiv['baseImgCreated']) {
		oekakiCtrlDiv['oekakiImg'].style.backgroundImage = backgroundDataUrl;
		createBaseImg(oekakiCtrlDiv);
		oekakiCtrlDiv['baseImgCreated'] = true;
	}
	var func = function() {
		if (oekakiCtrlDiv['layersImg'].complete) {
			if (!oekakiCtrlDiv['compositeCreated']) {
				var compositeCanvas = myUnsafeWindow.document.createElement('canvas');
				compositeCanvas.id = 'oekaki' + oekakiCtrlDiv['oekakiId'] + 'compositeCanvas';
				compositeCanvas.width = oekakiCtrlDiv['oekakiInfo']['width'];
				compositeCanvas.height = oekakiCtrlDiv['oekakiInfo']['height'];
//				oekakiCtrlDiv['oekakiDiv'].removeChild(oekakiCtrlDiv['oekakiImg']);
//				oekakiCtrlDiv['oekakiDiv'].appendChild(compositeCanvas);
				oekakiCtrlDiv['compositeCanvas'] = compositeCanvas;

				ctxl = oekakiCtrlDiv['layersCanvas'].getContext('2d');
				var layersImg = oekakiCtrlDiv['layersImg'];
				ctxl.drawImage(layersImg, 0, 0, layersImg.width, layersImg.height, 0, 0, layersImg.width, layersImg.height);
				oekakiCtrlDiv['layersImageData'] = ctxl.getImageData(0, 0, layersImg.width, layersImg.height);

				oekakiCtrlDiv['compositeCreated'] = true;
			}
			try {
			compose(oekakiCtrlDiv);
			} catch(e) {alert(e);}
		} else {
			setTimeout(func, 100);
		}
	}
	func();
}

function onMouseOverCheck(oekakiCtrlDiv, eventArg) {
	var func = function() {
		if (oekakiCtrlDiv['layersImg'].complete) {
			try{
			var oekakiId = oekakiCtrlDiv['oekakiId'];
			var layerIndex = parseInt(eventArg.target.id.replace(/.*layerPreview/, ''));
			var previewCanvas = document.getElementById('previewCanvas');
			width = oekakiCtrlDiv['oekakiInfo']['width'];
			height = oekakiCtrlDiv['oekakiInfo']['height'];
			previewCanvas.width = width;
			previewCanvas.height = height;
			var ctx = previewCanvas.getContext('2d');
			ctx.drawImage(oekakiCtrlDiv['layersImg'], 0, height * layerIndex, width, height, 0, 0, width, height);
			var previewAbsoluteSpan = document.getElementById('previewAbsoluteSpan');
			var previewRelativeSpan = document.getElementById('oekakiCtrl' + oekakiId + 'relativeSpan');
			previewAbsoluteSpan.parentNode.removeChild(previewAbsoluteSpan);
			previewRelativeSpan.appendChild(previewAbsoluteSpan);
			previewAbsoluteSpan.style.display = 'inline-block';
			previewAbsoluteSpan.style.left = '0px'
			previewAbsoluteSpan.style.top = '0px';
			}catch(e){alert(e);}
		}
		else {
			setTimeout(func, 100);
		}
	}
	func();
}

function onMouseOutCheck(oekakiCtrlDiv, eventArg) {
	var previewAbsoluteSpan = document.getElementById('previewAbsoluteSpan');
	var placeHolderDiv = document.getElementById('placeHolderDiv');
	previewAbsoluteSpan.style.display = 'none';
	previewAbsoluteSpan.parentNode.removeChild(previewAbsoluteSpan);
	placeHolderDiv.appendChild(previewAbsoluteSpan);
}

// creates layer list (oekakiCtrlDiv) and source image of layers
function loadOekakiInfoCallback(oekakiId, xmlhttp) {
	var oekakiInfo = {};
	if (xmlhttp.responseText != '') {
		oekakiInfo = eval('(' + xmlhttp.responseText + ')');
	}

	var oekakiDiv = document.getElementById('oekaki' + oekakiId);
	oekakiDiv.style.cssFloat = 'left';

	var oekakiCtrlDiv = document.createElement('div');
	oekakiCtrlDiv.id = 'oekakiCtrl' + oekakiId;
	oekakiCtrlDiv["oekakiDiv"] = oekakiDiv;
	var oekakiImg = oekakiDiv.getElementsByTagName('img')[0];
	oekakiCtrlDiv["oekakiImg"] = oekakiImg;
	oekakiCtrlDiv["oekakiId"] = oekakiId;
	oekakiCtrlDiv["oekakiInfo"] = oekakiInfo;
	oekakiCtrlDiv["baseImgCreated"] = false;

	var oekakiBreakDiv = document.createElement('div');
	oekakiBreakDiv.style.clear = 'both';

	var oekakiParent = oekakiDiv.parentNode;
	oekakiParent.insertBefore(oekakiBreakDiv, oekakiDiv.nextSibling);
	oekakiParent.insertBefore(oekakiCtrlDiv, oekakiBreakDiv);

	if (oekakiInfo['layer_infos'] == undefined) {
		var span = document.createElement('span');
		span.style.marginLeft = '4px';
		span.appendChild(document.createTextNode('No layers'));
		oekakiCtrlDiv.appendChild(span);
		return;
	}

	var width = oekakiInfo['width'];
	var height = oekakiInfo['height'];
	var totalHeight = height * oekakiInfo['layer_infos'].length;
	var layersImg = document.createElement('img');
	layersImg.id = 'oekaki' + oekakiId + 'layersImg';
	layersImg.width = width;
	layersImg.height = totalHeight;
	layersImg.src = layersPrefix + oekakiId + layersSuffix;
	layersImg.style.display = 'none';
	oekakiCtrlDiv.appendChild(layersImg);
	oekakiCtrlDiv["layersImg"] = layersImg;

	var numLayers = oekakiInfo["layer_infos"].length;

	for (var i = numLayers - 1; i >= 0; --i) {
		var canvas = document.createElement('canvas');
		canvas.id = 'oekakiCtrl' + oekakiId + 'layerPreview' + i;
		canvas.width = 32;
		canvas.height = 32;
		canvas.style.border = 'solid 1px black';
		canvas.style.backgroundImage = backgroundDataUrl;
		canvas.style.verticalAlign = 'middle';
		canvas.style.marginLeft = '4px';
		canvas.style.marginBottom = '4px';
		canvas.addEventListener('mouseover', function(eventArg) {
				onMouseOverCheck(oekakiCtrlDiv, eventArg);
			}, false);
		canvas.addEventListener('mouseout', function(eventArg) {
				onMouseOutCheck(oekakiCtrlDiv, eventArg);
			}, false);
		oekakiCtrlDiv.appendChild(canvas);
		var check = document.createElement('input');
		check.type = 'checkbox';
		check.id = 'oekakiCtrl' + oekakiId + 'Check' + i;
		check.value = '' + i;
		check.checked = oekakiInfo['layer_infos'][i]['visible'] == 'true';
		check['layerIndex'] = i;
		check.addEventListener('click', function(eventArg) {
				onClickCheck(oekakiCtrlDiv, eventArg);
			}, false);
		oekakiCtrlDiv.appendChild(check);
		var label = document.createElement('label');
		label.htmlFor = check.id;
		label.appendChild(document.createTextNode(oekakiInfo['layer_infos'][i]['name'] + ', ' + oekakiInfo['layer_infos'][i]['blendMode']));
		label.appendChild(document.createElement('br'));
		oekakiCtrlDiv.appendChild(label);
	}

	if (oekakiDiv.clientHeight < oekakiCtrlDiv.clientHeight) {
		oekakiDiv.style.height = '' + oekakiCtrlDiv.clientHeight + 'px';
	}

	var previewRelativeSpan = document.createElement('span');
	previewRelativeSpan.id = 'oekakiCtrl' + oekakiId + 'relativeSpan';
	previewRelativeSpan.style.position = 'relative';
	previewRelativeSpan.style.display = 'inline-block';
	previewRelativeSpan.style.height = '' + height + 'px';
	oekakiDiv.insertBefore(previewRelativeSpan, oekakiImg);

	oekakiImg.addEventListener('click', function(eventArg) {
		oekakiCtrlDiv.parentNode.removeChild(oekakiCtrlDiv);
	}, false);

	var func = function() {
		if (layersImg.complete) {
			for (var i = 0; i < numLayers; ++i) {
				var canvas = document.getElementById('oekakiCtrl' + oekakiId + 'layerPreview' + i);
				var ctx = canvas.getContext('2d');
				ctx.drawImage(layersImg, 0, height * i, width, height, 0, 0, 32, 32);
			}
		} else {
			setTimeout(func, 100);
		}
	};
	func();
}

// loads /oekaki_info/<id>
// callbacks loadOekakiInfoCallback
function loadOekakiInfo(oekakiId) {
	var oekakiInfoUrl = oekakiInfoPrefix + oekakiId + oekakiInfoSuffix;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			loadOekakiInfoCallback(oekakiId, xmlhttp);
		}
	}
	xmlhttp.open('GET', oekakiInfoUrl, true);
	xmlhttp.send(null);
}


// main procedure
function mainProcedure() {
	if (document.body.id == 'tinymce') {
		return;
	}

	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; ++i) {
		if (divs[i].id.match(/^oekaki[0-9]+$/)) {
			oekakiId = parseInt(divs[i].id.substring(6));
			loadOekakiInfo(oekakiId);
		}
	}
	var previewAbsoluteSpan = document.createElement('span');
	previewAbsoluteSpan.id = 'previewAbsoluteSpan';
	previewAbsoluteSpan.style.display = 'none';
	previewAbsoluteSpan.style.position = 'absolute';
	previewAbsoluteSpan.style.lineHeight = '0';
	var previewCanvas = document.createElement('canvas');
	previewCanvas.id = 'previewCanvas';
	previewCanvas.style.backgroundImage = backgroundDataUrl;
	previewAbsoluteSpan.appendChild(previewCanvas);
	var placeHolderDiv = document.createElement('div');
	placeHolderDiv.id = 'placeHolderDiv';
	placeHolderDiv.appendChild(previewAbsoluteSpan);
	document.body.appendChild(placeHolderDiv);
}

mainProcedure();
