// ==UserScript==
// @name          What's on
// @namespace     http://userscripts.org/scripts/show/41239
// @description   CaptiveWorks What's on
// @include       http://home.comcast.net/~breeze/whats_on.html
// @version       1.0
// ==/UserScript==

function pad(str, len, pad)
{
	if (str.length < len) {
		str = Array(len - str.length + 1).join(pad) + str;
	}
	return str;
}

function createNode(type, attributes, properties)
{
	var node = document.createElement(type);
	if (attributes) {
		for (var attribute in attributes) {
			node.setAttribute(attribute, attributes[attribute]);
		}
	}
        if (properties) {
                for (var property in properties) {
                        if (property in node) node[property] = properties[property];
                }
        }
	return node;
}

function createFilterButton(tdAttributes, imgAttributes)
{
	var td = createNode('td', tdAttributes);
	imgAttributes.style = 'cursor: pointer';
	imgAttributes.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACqklEQVR42mL4//8/g4qKCoOEhATD9u3bGUDA3t7eNC0tLRyI0zOAIDk5OdrJyckCJNfd3c3AysoKVgfSCxBAYEJGRoaBh4dHZPXq1btevXr1/8GDB/8PHTr0f/ny5f9nzpz5f9asWf9XrVr1//jx4//b29t3A/XywwwACCAwwcfHJ/UfCo4dO/Y/KSnpv6am5n+gof9B6pBxV1fX//nz5/8EsplBegECCGzA3Llz1718+fJ/RETEf3l5ebBCERGR/7q6uv8tLS3/m5qa/peTk4MbcuvWrf9Ab6eA9AIEENgAoB+ngWxXUlLCsJGFhQWFX1lZ+f/Dhw8gcTeQXoAAgvgDCBYvXnwRZMiRI0f+AwPvv6Gh4X9paWmwi4CBCtZ47do1sDednZ1nwMIAIIDgBoDAxo0bH/3HAZ4/f/4f5M3Y2NidMPUgvQABhGIAELDv27fv89+/f/+fPn36P5D9f/369f+nTp36/8CBA//r6upuIisG6QUIILgBzMzMDIyMjCCm+Pnz5/+DonPDhg2gEP9/9uzZ/0uXLv0MlBNGNwAggOAGAAOFgYODA4yBCUXt0qVL/0+cOPH/8OHD/3fv3g1SpMOABkB6AQIIxQsgQ7i5uUHpgsHR0bEC5n8fH5/JDFgASC9AAIGJyMhIMA4PD2cIDQ1lAGpgsLCwyPn+/TvYAFdX1/6oqChQdDOkpqYyAGMJjEF6AQIITAQFBTEEBgaCcUBAAIO3tzeDlZVV0YsXL/7/+fMHFG1TgoODwZaADIJhkF6AAAITYWFhKBhkoIuLS9njx4//f/v27T/QwJnAVMoAjEIUDNILEEBgAmgbHAOTLoOZmRmDlpZWNCj079+//9/IyKjfzs4OFC4MwFwJxyC9AAGEng5QANCQQn19/YlAJh+uQAQIMAAoKaqGfqy6BQAAAABJRU5ErkJggg==';
	imgAttributes.width = 16;
	imgAttributes.height = 16;
	var img = createNode('img', imgAttributes);
	td.appendChild(img);
	return td;
}

function x1(xpath)
{
	var nodes = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	return nodes.singleNodeValue;
}

function x(xpath)
{
	var nodes = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var arr = [];
	for (var i = 0; node = nodes.snapshotItem(i); i++)
		arr.push(node);
	return arr;
}

function Filter(name)
{
	var channels = [];
	var settingsName = name;

	this.save = function()
	{
		var data = '';
		for (var channel in channels) data += (data ? ',' : '') + channel;
		GM_setValue(settingsName, escape(data));
	}

	this.load = function()
	{
		var arr = unescape(GM_getValue(settingsName, '')).split(',');
		for (var i = 0; i < arr.length; i++) channels[arr[i]] = true;
	}

	this.find = function(channel)
	{
		return (typeof(channels[channel]) != 'undefined');
	}

	this.add = function(channel)
	{
		channels[channel] = true;
		this.save();
	}

	this.remove = function(channel)
	{
		if (typeof(channels[channel]) != 'undefined') {
			delete(channels[channel]);
		}
		this.save();
	}
}

var showHiddenChannels = GM_getValue('showHiddenChannels', 0) != 0;

var hiddenChannels = new Filter('filteredChannels');
hiddenChannels.load();

var regChannel = /channel=([0-9,.]+)/;
var regChannelNumber = /[^0-9]/;

var tableHeader = x1("//table[@class='listing']//tr[@class='head']");
if (!tableHeader) {
	return;
}
tableHeader.appendChild(createFilterButton({style: 'padding-left: 3px; padding-right: 5px;'}, {title: 'Show/Hide hidden channels', filtered_all: showHiddenChannels ? 'yes' : 'no'}));

var channels = x("//table[@class='listing']//td[8]//a[contains(@href, 'channel=')]");
for (var i = 0; i < channels.length; i++) {
	var channel = channels[i];
	if (channel.href.match(regChannel)) {
		var channelNumber = RegExp.$1;
		channelNumber = channelNumber.replace(regChannelNumber, '');
		var channelName = channel.textContent;
		var tableRow = channel.parentNode.parentNode.parentNode;
		channel.innerHTML = pad(channelNumber, 4, '0') + ' - ' + channelName;
		var f = false;
		if (hiddenChannels.find(channelNumber)) {
			tableRow.style.backgroundColor = '#eee';
			f = true;
			if (!showHiddenChannels) tableRow.style.display = 'none';
		}
		tableRow.appendChild(createFilterButton({class: 'action rightcol'}, {title: 'Show/Hide channel', filtered: f ? 'yes' : 'no', channel: channelNumber}));
	}
}

tableRow.parentNode.parentNode.addEventListener('click', function(e)
{
	var element = e.target;
	if (element.nodeType == 3) element = element.parentNode;

	if (element.getAttribute('channel')) {
		var channel = parseInt(element.getAttribute('channel'));
		var f = element.getAttribute('filtered') === 'no';
		element.setAttribute('filtered', f ? 'yes' : 'no');
		var row = element.parentNode.parentNode;
		if (f) {
			row.style.backgroundColor = '#eee';
			if (!showHiddenChannels) row.style.display = 'none';
			hiddenChannels.add(channel);
		} else {
			row.style.backgroundColor = '#fff';
			hiddenChannels.remove(channel);
		}
		e.stopPropagation();
		return false;
	} else if (element.getAttribute('filtered_all')) {
		showHiddenChannels = !showHiddenChannels;
		GM_setValue('showHiddenChannels', showHiddenChannels ? 1 : 0);
		var channels = x("//table[@class='listing']//td[9]//img[@filtered]");
		for (var i = 0; i < channels.length; i++) {
			var channel = channels[i];
			if (channel.getAttribute('filtered') === 'yes') {
				var row = channel.parentNode.parentNode;
				row.style.display = showHiddenChannels ? 'table-row' : 'none';
			}
		}
	}
}, true);
