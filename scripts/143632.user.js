// ==UserScript==
// @name		MrRobot - SortTrinkets
// @namespace	http://www.naturalstudios.nl/userscripts/mr.robot
// @version		0.5
// @description	Adds sorting to the trinkets list of Mr. Robot.
// @match		http://www.askmrrobot.com/wow/trinkets/*
// @require		http://code.jquery.com/jquery-1.7.2.min.js
// @copyright	2012+, You
// ==/UserScript==

// History
//  - 0.1  Initial private release

var wnd = $.browser.mozilla ? window : unsafeWindow;
var isTopWindow = $.browser.mozilla ? wnd == wnd.parent : wnd == top;
var displayHtmlLogging = isTopWindow && $.browser.mozilla; // || $.broswer.msie;

if(wnd == 'undefined')
{
    console.log('Error: window-object not found.');
    alert('Error: window-object not found.');
    return;
}

if (!isTopWindow)
{
	console.log('Detected that the script is being loaded in an iframe, exiting.');
	return;
}

if(typeof($) === 'undefined')
{
    console.log('jQuery not found.');
    return;
}

//////////////////////////////////////////
/**
* jQuery.fn.sortElements
* --------------
* @author James Padolsey (http://james.padolsey.com)
* @version 0.11
* @updated 18-MAR-2010
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
jQuery.fn.sortElements = (function () {

	var sort = [].sort;

	return function (comparator, getSortable) {

		getSortable = getSortable || function () { return this; };

		var placements = this.map(function () {

			var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,

			// Since the element itself will change position, we have
			// to have some way of storing it's original position in
			// the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );

			return function () {

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

		return sort.call(this, comparator).each(function (i) {
			placements[i].call(getSortable.call(this));
		});

	};

})();

//////////////////////////////////////////

function getValue(rawValue, dataType, format) {
	var inputType = typeof (rawValue);
	if (dataType == null) dataType = 'string';

	if (inputType == dataType) return rawValue;

	switch (dataType) {
		case 'string':
			return '' + rawValue;
		case 'int':
			return parseInt(rawValue, format == null ? 10 : format);
		case 'float':
			return parseFloat(rawValue);
		case 'date':
			// for now only support dates in dd-mm-yyyy.
			var parts = rawValue.match(/(\d+)/g);
			// new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
			return new Date(parts[2], parts[1] - 1, parts[0]); // months are 0-based
		default:
			// Not supported yet.
	}

	return null;
}

function sortTrinkets(columnIndex, type, format) {
    var column;
    switch (columnIndex) {
        case 0:
            column = '.trinket .name a';
            break;
        case 1:
            column = '.trinket .stats div label';
            break;
        case 2:
            column = '.trinket .stats div span';
            break;
        default:
            // Not supported.
            return;
    }

	var rootElement = this.get(0);

	// Handle administration
	if (typeof (rootElement.sorting) == 'undefined') {
		rootElement.sorting = {};
		rootElement.sorting.lastColumn = null;
		rootElement.sorting.direction = 1;
	}

	if (rootElement.sorting.lastColumn == null) {
		rootElement.sorting.lastColumn = columnIndex;
		rootElement.sorting.direction = 1;
	}
	else if (rootElement.sorting.lastColumn != columnIndex) {
		$(rootElement.sorting.lastColumn).removeClass('sortAsc');
		$(rootElement.sorting.lastColumn).removeClass('sortDesc');

		rootElement.sorting.lastColumn = columnIndex;
		rootElement.sorting.direction = 1;
	} else {
		rootElement.sorting.direction *= -1;
	}

	if (rootElement.sorting.direction == 1) {
		$(rootElement.sorting.lastColumn).addClass('sortAsc');
		$(rootElement.sorting.lastColumn).removeClass('sortDesc');
	} else {
		$(rootElement.sorting.lastColumn).removeClass('sortAsc');
		$(rootElement.sorting.lastColumn).addClass('sortDesc');
	}

	var direction = rootElement.sorting.direction;

	var columns = $(column, this);
    
	// Sorting
	this.find(column)
	    //.filter(function () { return $(this).index() === columnIndex; })
	    .sortElements(function (a, b) {
            var vl = getValue($.text([a]), type, format);
            var vr = getValue($.text([b]), type, format);
            var r = vl > vr ? 1 : -1;
            return r * direction;
        }, function () {
            // parentNode is the element we want to move
            return $(this).closest('div.trinket').get(0);
        });
	return;
}
//////////////////////////////////////////

$(document).ready(function(){
    var tableish = $('.trinket-container');
    var header = CreateHeader(tableish);
    header.insertBefore(tableish);
});

function CreateHeader(tableish) {
    var styleBlock = $('#mineStyles', 'head');
    
    if(styleBlock.length == 0){
        styleBlock = $('style').attr('type', 'text/css').attr('id', 'mineStyles');

        styleBlock.append('.tableHeader { font-weight: bold; font-size: 18px; color: #549AD3; }');
        styleBlock.append('.tableHeader a { color: #549AD3; }');
        styleBlock.append('.tableHeader .name { display: table-cell; vertical-align: middle; width: 375px; padding-left: 4px; }');
        styleBlock.append('.tableHeader .stats { display: table-cell; vertical-align: middle;  width: 375px; padding: 6px 0px; }');
        styleBlock.append('.tableHeader .stats label { display: inline-block; width: 90px; }');
        styleBlock.append('.tableHeader .stats span{ display: inline-block; width: 70px; text-align: right; }');
        styleBlock.append('.tableHeader .comment { display: table-cell; vertical-align: middle; font-weight: bold; padding: 6px 0px 6px 8px; text-align: left; }');
    
        styleBlock.appendTo('head');
    }
        
    var row = $('<div class="tableHeader trinket">');
    var nameCell = $('<div class="name">');
    $('<a href="#">').text('Trinketname').click(function(e){
        e.preventDefault();
        sortTrinkets.bind(tableish)(0);
        return false;
    }).appendTo(nameCell);
    nameCell.appendTo(row);
    
    var statsCell = $('<div class="stats">');
    var div = $('<div>');

    var label = $('<label>');
    $('<a href="#">').text('Stat').click(function(e){
        e.preventDefault();
        sortTrinkets.bind(tableish)(1);
        return false;
    }).appendTo(label);
    label.appendTo(div);
    
    var span = $('<span>');
    $('<a href="#">').text('Value').click(function(e){
        e.preventDefault();
        sortTrinkets.bind(tableish)(2, 'float');
        return false;
    }).appendTo(span);
    span.appendTo(div);

    div.appendTo(statsCell);
    statsCell.appendTo(row);

    $('<div class="comment">').text('Comments').appendTo(row);

    return row;
}
