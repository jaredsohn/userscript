// ==UserScript==
// @name           Advanced Array Functions
// @namespace      LWChris
// @description    JavaScript functions for easier array handling
// @include        http://*
// ==/UserScript==

Array.prototype.clear = function () {
	this.splice(0, this.length);
}

Array.prototype.contains = function (obj) {
	return (this.indexOf(obj) > -1);
};

Array.prototype.indexOf = function (obj) {
	for (var i = 0; i < this.length; i++)
		if (this[i] === obj)
			return i;
	return -1;
}

Array.prototype.lastIndexOf = function (obj) {
	for (var i = this.length - 1; i > -1; i--)
		if (this[i] === obj)
			return i;
	return -1;
}

Array.prototype.removeFirst = function (obj) {
	var i = this.indexOf(obj);
	if (i > -1)
		this.splice(i, 1);
}

Array.prototype.removeLast = function (obj) {
	var i = this.lastIndexOf(obj);
	if (i > -1)
		this.splice(i, 1);
}

Array.prototype.removeAll = function (obj) {
	var i = this.indexOf(obj);
	while (i > -1) {
		this.splice(i, 1);
		i = this.indexOf(obj);
	};
}