// ==UserScript==
// @name		Google Bookmarks Nested Labels
// @namespace		http://userscripts.org/users/lorentz
// @description		Add the 'Nested Labels' feature to google bookmarks.
// @include		http://www.google.com/bookmarks/*
// @include		https://www.google.com/bookmarks/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @version		1.2
// @grant		none
// ==/UserScript==

/**
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var containKeys = function(obj) {
    for (var key in obj) {
        return true;
    }
    return false;
}

var Tag = function(label, fullLabel, href, initialOpen, bold) {
    this.label = label;
    this.fullLabel = fullLabel;
    this.href = href;
    this.subLabel = new Object();
    this.initialOpen = initialOpen;
    this.bold = bold;
}

Tag.prototype.separator = '/';

Tag.prototype.addToTree = function(splittedLabel, fullLabel, href, initialOpen){
    if ( splittedLabel.length > 0 ) {
	if (this.subLabel[ splittedLabel[0] ] == undefined) {
	    var bold = initialOpen && splittedLabel.length == 1; // is open and is the last
	    //this must be fix if here there is a middle label
	    this.subLabel[ splittedLabel[0] ] = new Tag(splittedLabel[0], fullLabel, href, initialOpen, bold);
	}
	this.initialOpen = this.initialOpen || initialOpen;
	this.subLabel[ splittedLabel[0] ].addToTree( splittedLabel.slice(1), fullLabel, href, initialOpen);
    }
}

Tag.prototype.toLi = function (prefix) {
    if (prefix == undefined)
	prefix = '';
    
    var labelCssClass = 'item';
    if (this.bold) {
	labelCssClass = 'item selectedLabel';
    }
    var hasSubTree = containKeys(this.subLabel);
    var expandLinkText = '|';
    var olStyle = '';
    if (hasSubTree) {
	if (this.initialOpen){
	    expandLinkText = '[-]';
	}
	else {
	    expandLinkText = '[+]';
	    olStyle = 'display:none;';
	}
	expandLinkText = '<span class="expandLink">' + expandLinkText + '</span>';
    }
    
    var toReturn = new Array();
    var i = 0;
    
    toReturn[i++] = prefix + '<li>';
    toReturn[i++] = prefix + ' <div class="expandLinkContainer">' + expandLinkText + '</div>';
    toReturn[i++] = prefix + ' <a href="' + this.href + '" title="' + this.fullLabel + '" class="' + labelCssClass + '">' + this.label + '</a>'
    
    if (hasSubTree) {
	toReturn[i++] = prefix + ' <ol class="subLabelsList" style="' + olStyle + '">';
	for (var label in this.subLabel) {
	    toReturn[i++] = this.subLabel[label].toLi(prefix + '  ');
	}
	toReturn[i++] = prefix + ' </ol>';
    }
    toReturn[i++] = prefix + '</li>';
    return toReturn.join('\n');
}

Tag.prototype.toString = function (prefix) {
    if (!prefix)
	   prefix = '';
    var toReturn = prefix + this.label + '\n';
    for (var i in this.subLabel) {
	   toReturn += this.subLabel[i].toString(prefix + '-');
    }
    return toReturn
}

Tag.prototype.push = function(label, href, initialOpen) {
    this.addToTree(label.split(this.separator), label, href, initialOpen);
}

Tag.prototype.clickExpandTree =  function(elem) {
    if (elem.html() == '[-]') {
    	elem.parent().siblings('ol').slideUp();
    	elem.html('[+]');
    }
    else
    	if (elem.html() == '[+]') {
    	    elem.parent().siblings('ol').slideDown();
    	    elem.html('[-]');
    	}
    return false;
}


var li = $('#sidenav').find('li:has(a[href^="/bookmarks/lookup?"]) , li:has(a[href^="./find?q="])');
li.hide();

var tags = null;
li.each(function(index){
    var curr = $(this);
    var a = curr.find('a');
    var bdo = a.find('bdo');
    var num = bdo.text();
    bdo.remove();
    var txt = $.trim(a.text());
    if(tags == null)
        tags = new Tag(txt, txt, a.attr('href'));
    else
        tags.push(txt, a.attr('href'), curr.hasClass('selected'));
});
$('#sidenav ul').before( '<ol id="allNestedLabels" class="subLabelsList">' + tags.toLi() + '</ol>');
$('#allNestedLabels .expandLink').click( function() {return Tag.prototype.clickExpandTree( $(this) ); } );
$('#allNestedLabels > li > a').css('color', '#4D90F0');

var history = $('#sidenav').find('li:has(a[href^="/history/lookup?"])');
var historyTitle = history.eq(0);
var historyEntries = history.slice(1);
historyEntries.prepend('<div style="margin-left: 17px;" class="expandLinkContainer">|</div>');
historyEntries.hide();
history.find('a').css('display', 'inline');
history.find('a').css('padding-left', '5px');
historyTitle.prepend('<div style="margin-left: 13px;" class="expandLinkContainer"><span class="expandLink">[+]</span></div>');
historyTitle.find('span').click( function() {
    var elem = $(this);
    if (elem.html() == '[-]') {
    	historyEntries.slideUp();
    	elem.html('[+]');
    }
    else
    	if (elem.html() == '[+]') {
    	    historyEntries.slideDown();
    	    elem.html('[-]');
    	}
    return false;
});


//////////////////////////////////////////////////

var customCss = new Array();
var i=0;
customCss[i++] = '<style type="text/css">';
customCss[i++] = '.expandLinkContainer{display:inline-block;  width:1.5em; text-align:center;}';
customCss[i++] = '.expandLink{cursor:pointer;}';
customCss[i++] = '.subLabelsList{margin-left:1.8em; }';
customCss[i++] = '#allNestedLabels li a {line-height: 18px; display:inline-block;margin:0;padding:0;}';
customCss[i++] = '#allNestedLabels li {white-space:nowrap;}';
customCss[i++] = '#allNestedLabels { margin-left: 1em; margin-bottom: 1em;}';
customCss[i++] = '.selectedLabel{font-weight:bold;}';
customCss[i++] = '</style>'

$('head').append(customCss.join('\n'));

