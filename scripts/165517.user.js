// ==UserScript==
// @name           Solve1doostSudoku
// @namespace      http://serverfire.net/gmscripts
// @include        http://*.1doost.com/*
// @include        http://1doost.com/*
// @include        https://*.1doost.com/*
// @include        https://1doost.com/*
// @grant	   none
// ==/UserScript==
;(function(window){
    document.addEventListener('DOMContentLoaded', init, false);
    var width = 9;
    var height = 9;
    var xdiv = 3;
    var ydiv = 3;
    var values = [ '1', '2', '3', '4' , '5', '6', '7', '8', '9' ];
    function init()
    {
	var sudoku_control_elm = findSodukoControlElement(document);
	var sudoku_elm = findSodukoElement(document);
	if(!sudoku_elm || !sudoku_control_elm)
	    return;
	var solve_btn = document.createElement('button')
	solve_btn.innerHTML = 'Solve!!';
	sudoku_control_elm.appendChild(solve_btn);
	solve_btn.addEventListener('click', function()
	  {
	      if(solve_sudoku(sudoku_elm))
		  solve_btn.innerHTML = 'Solve Success!!';
	      else
		  solve_btn.innerHTML = 'Solve Failed!!';
	      return false;
	  }, false);
    }

    function solve_sudoku(sudoku_elm)
    {
	var sel_vals = sudokuGetDefinedValues(sudoku_elm);
	if(!sel_vals)
	    return false;
	var board = new SudokuRectBoard(width, height, xdiv, ydiv,
					sel_vals, values);
	if(sudoku_solver_solve2(board) != true)
	    return false;
	for(var x = 0; x < width; ++x)
	{
	    for(var y = 0; y < height; ++y)
	    {
		var v = board.getXY(x, y);
		if(v.type != 'static')
		    sodukoSetValue(sudoku_elm, x, y, v.value);
	    }
	}
	return true;
    }
    function sudokuGetDefinedValues(el)
    {
	var r = [], v;
	for(var x = 0; x < width; ++x)
	    for(var y = 0; y < height; ++y)
		if((v = sodukoGetValue(el, x, y)))
		    r.push({
			x: x,
			y: y,
			value: v
		    });
	return r
    }
    function findSodukoControlElement(doc)
    {
	var sa = doc.getElementById('allSudokuObjectsHolder');
	if(!sa)
	    return;
	var nodes = sa.childNodes;
	for(var i = 0; i < nodes.length; ++i)
	    if(elementHasClass(nodes[i], 'sdkPanelRight'))
		return nodes[i];
	return sa;
    }
    function findSodukoElement(doc)
    {
	return doc.getElementById('sudokuTableHolder');
    }
    function getChildElement(el, i)
    {
	var childs = el.childNodes;
	for(var r = 0, c = 0; c < childs.length; ++c)
	{
	    if(childs[c].nodeType == document.ELEMENT_NODE)
	    {
		if(r == i)
		{
		    return childs[c];
		}
		r++;
	    }
	}
	return null;
    }
    function sudokuGetXYElement(el, x, y)
    {
	var divs = el.getElementsByTagName('div');
	var rowsHolder;
	for(var i = 0; i < divs.length; ++i)
	    if(elementHasClass(divs[i], 'rowsHolder'))
	    {
		rowsHolder = divs[i];
		break;
	    }
	if(!rowsHolder)
	    return null;
	var row;
	var row = getChildElement(rowsHolder, y);
	if(!row)
	    return null;
	return getChildElement(row, x);
    }
    function sodukoSetValue(el, x, y, v)
    {
	if(!window.setSudokuNumber)
	    throw new Error("setSudokuNumber method does not exists");
	var xy_el = sudokuGetXYElement(el, x, y);
	if(!xy_el)
	    return false;
	xy_el.click();
	window.setSudokuNumber(parseInt(v));
	return true;
    }
    function sodukoGetValue(el, x, y)
    {
	var xy_el = sudokuGetXYElement(el, x, y);
	if(!xy_el)
	    return undefined;
	var v = xy_el.innerHTML.trim();
	if(values.indexOf(v) < 0)
	    return null;
	return v;
    }
})(window);;(function(root){
    var board = function(width, height, xdiv, ydiv, static_values, values)
    {
	this._width = width;
	this._height = height;
	this._xdiv = xdiv;
	this._ydiv = ydiv;
	this._values = values;
	this.board = new Array(width * height);
	// no x, y occulsion allowed for static_values
	for(var i = 0; i < static_values.length; ++i)
	{
	    var v = static_values[i];
	    this.setXY({
		type: 'static',
		value: v.value
	    }, v.x, v.y);
	}
	this._reminder = width * height - static_values.length;
	this._curX = 0;
	this._curY = 0;
	forward_to_undefined_xy.call(this);
    }
    board.prototype.getXY = function(x, y)
    {
	return this.board[x + y * this._width];
    }
    board.prototype.setXY = function(v, x, y)
    {
	this.board[x + y * this._width] = v;
    }
    board.prototype.setValue = function(v, x, y)
    {
	if(v === undefined || v === null)
	{
	    if(this.getXY(x, y))
	    {
		this.setXY(undefined, x, y);
		this._reminder++;
	    }
	}
	else
	{
	    if(!this.getXY(x, y))
		this._reminder--;
	    this.setXY({
		type: 'guess',
		value: v
	    }, x, y);
	}
    }
    board.prototype.allChoices = function()
    {
	var r = [];
	var w = this._width, h = this._height, v;
	for(var x = 0; x < w; ++x)
	{
	    for(var y = 0; y < h; ++y)
	    {
		if((v = this.getXY(x, y)) === undefined)
		    r.push({
			x: x,
			y: y,
			choices: this.choices(x, y)
		    });
	    }
	}
	return r;
    }
    board.prototype.getValue = function(x, y)
    {
	return this.getXY(x, y).value;
    }
    function forward_to_undefined_xy()
    {
	var v;
	var w = this._width, h = this._height;
	while((v = this.getXY(this._curX, this._curY)) !== undefined)
	{
	    if(++this._curX >= w)
	    {
		this._curX = 0;
		if(++this._curY >= h)
		{
		    --this._curY;
		    this._curX = w - 1;
		    return false;
		}
	    }
	}
	return true;
    }
    function backward_to_guess_xy()
    {
	var v, w = this._wdith, h = this._height;
	while((v = this.getXY(this._curX, this._curY)) === undefined ||
	      v.type != 'guess')
	{
	    if(--this._curX < 0)
	    {
		this._curX = w - 1;
		if(--this._curY < 0)
		{
		    this._curY = 0;
		    this._curX = 0;
		    return false;
		}
	    }
	}
	return v;
    }
    board.prototype.push = function(v)
    {
	if(this._reminder <= 0)
	    return false;
	if(!forward_to_undefined_xy.call(this))
	    return false;
	this.setXY({
	    type: 'guess',
	    value: v
	}, this._curX, this._curY);
	this._reminder--;
	return true;
    }
    board.prototype.pop = function()
    {
	var v;
	if(!(v = backward_to_guess_xy.call(this)))
	    return false;
	this.setXY(undefined, this._curX, this._curY);
	this._reminder++;
	return v;
    }
    function sub_table_values(xt, yt)
    {
	var sxlen = Math.floor(this._width / this._xdiv);
	var sylen = Math.floor(this._height / this._ydiv);
	var r = [], v;
	var sx = xt * sxlen;
	var sy = yt * sylen;
	for(var x = 0; x < sxlen; ++x)
	{
	    for(var y = 0; y < sylen; ++y)
	    {
		if((v = this.getXY(sx + x, sy + y)) !== undefined)
		    r.push(v.value);
	    }
	}
	return r;
    }
    function table_row_values(y)
    {
	var width = this._width, r = [], v;
	for(var x = 0; x < width; ++x)
	    if((v = this.getXY(x, y)) !== undefined)
		r.push(v.value);
	return r;
    }
    function table_column_values(x)
    {
	var height = this._height, r = [], v;
	for(var y = 0; y < height; ++y)
	    if((v = this.getXY(x, y)) !== undefined)
		r.push(v.value);
	return r;
    }
    board.prototype.choices = function(x, y)
    {
	if(x === undefined)
	    x = this.curX;
	if(y === undefined)
	    y = this.curY;
	if(!forward_to_undefined_xy.call(this))
	    return false;
	var xt = Math.floor(x / this._xdiv);
	var yt = Math.floor(y / this._ydiv);
	var values = this._values;
	var evalues = sub_table_values.call(this, xt, yt);
	evalues = evalues.concat(table_row_values.call(this, y));
	evalues = evalues.concat(table_column_values.call(this, x));
	var r = [];
	for(var i = 0; i < values.length; ++i)
	    if(evalues.indexOf(values[i]) < 0)
		r.push(values[i]);
	return r;
    }
    board.prototype.reminder = function()
    {
	return this._reminder;
    }
    root.SudokuRectBoard = board;
})(window);function sudoku_solver_solve(board)
{
    if(board.reminder() <= 0)
	return true;
    var choices = board.choices();
    if(!choices)
	return false;
    for(var i = 0; i < choices.length; ++i)
    {
	board.push(choices[i]);
	if(sudoku_solver_solve(board))
	    return true;
	board.pop();
    }
    return false;
}
function sudoku_solver_solve2(board)
{
    if(board.reminder() <= 0)
	return true;
    var allChoices = board.allChoices();
    allChoices.sort(function(a, b)
	{
	    return a.choices.length - b.choices.length;
	});
    if(allChoices.length <= 0)
	return false;
    var target = allChoices[0];
    if(target.choices.length <= 0)
	return false;
    var x = target.x;
    var y = target.y;
    var choices = target.choices;
    for(var i = 0; i < choices.length; ++i)
    {
	board.setValue(choices[i], x, y);
	if(sudoku_solver_solve2(board) == true)
	    return true;
    }
    board.setValue(undefined, x, y);
    return false;
};(function(root){
    if(!String.prototype.trim)
	String.prototype.trim = function()
        {
	    return this.replace(/^\s+|\s+$/g, '');
	}
    /* IE issues */
    if(!Array.prototype.indexOf)
	Array.prototype.indexOf = function(obj, i)
        {
	    i = i > 0 ? i : 0;
	    while(i < this.length)
	    {
		if(this[i] == obj)
		    return i;
		i++;
	    }
	    return -1;
	}
    if(document.ELEMENT_NODE === undefined)
    {
	document.ELEMENT_NODE = 1;
	document.ATTRIBUTE_NODE = 2;
	document.TEXT_NODE = 3;
	document.CDATA_SECTION_NODE = 4;
	document.ENTITY_REFERENCE_NODE = 5;
	document.ENTITY_NODE = 6;
	document.PROCESSING_INSTRUCTION_NODE = 7;
	document.COMMENT_NODE = 8;
	document.DOCUMENT_NODE = 9;
	document.DOCUMENT_TYPE_NODE = 10;
	document.DOCUMENT_FRAGMENT_NODE = 11;
	document.NOTATION_NODE = 12;
    }
    /* IE issues end */
    root.addSlashes = function(str)
    {
	return str.replace(/['"]/g, function(s)
		    {
			return '\\' + s;
		    });
    }
    function XMLNodeGetInnerString(node)
    {
	var r = '';
	var childs = node.childNodes;
	for(var i = 0; i < childs.length; ++i)
	    r += XMLNodeGetOuterString(childs[i]);
	return r;
    }
    function XMLNodeGetOuterString(node)
    {
	var r = '';
	switch(node.nodeType)
	{
	case document.ELEMENT_NODE:
	    r += '<' + node.nodeName;
            if(node.attributes && node.attributes.length > 0)
	    {
		for(var i = 0; i < node.attributes.length; ++i)
		{
		    var attr = node.attributes[i];
		    r += ' ' + attr.name + '="' + addSlashes(attr.value) + '"';
		}
	    }
	    if(node.childNodes && node.childNodes.length > 0)
	    {
		/* are we going after children too, and does 
		   the node have any? */
		r += '>';
		for(var i = 0; i < node.childNodes.length; ++i)
		    r += nodeGetInnerString(node.childNodes[i]);
		r += '</' + node.nodeName + '>';
	    }
	    else
		r += '/>';
            break;
	case document.TEXT_NODE:
	case document.CDATA_SECTION_NODE:
	case document.COMMENT_NODE:
            r = node.nodeValue;
            break;
	}
	return r;
    }
    root.XMLNodeGetInnerString = XMLNodeGetInnerString;
    root.XMLNodeGetOuterString = XMLNodeGetOuterString;
    root.elementEmpty = function(ele)
    {
	while(ele.childNodes.length > 0)
	    ele.removeChild(ele.childNodes[0]);
    }
    root.elementToggleClass = function(el, cn, v)
    {
	if(v === undefined)
	{
	    if(elementHasClass(el, cn))
		elementRemoveClass(el, cn);
	    else
		elementAddClass(el, cn);
	}
	else
	{
	    elementRemoveClass(el, cn);
	    if(v)
		elementAddClass(el, cn);
	}
    }
    root.elementHasClass = function(el, cn)
    {
	var clss = el.className.split(' ');
	for(var i = 0; i < clss.length; ++i)
	    if(clss[i] == cn)
		return true;
	return false;
    }
    root.elementRemoveClass = function(el, cn)
    {
	var r = '';
	var clss = el.className.split(' ');
	for(var i = 0; i < clss.length; ++i)
	    if(clss[i] != cn)
		r += clss[i] + (i + 1 == clss.length ? '' : ' ');
	el.className = r;
    }
    root.elementAddClass = function(el, cn)
    {
	if(el.className == '')
	    el.className = cn;
	else
	    el.className += ' ' + cn;
    }
    root.elementBlink = function(elm, dur, delay)
    {
	miniTween.opacity(elm, dur / 2, 1.0, 1, 0, 60);
	setTimeout(function(){
	    miniTween.opacity(elm, dur / 2, -1.0, 0, 1, 60);
	}, dur * 1000 / 2 + delay * 1000);
    }
    root.elementAddEventListener = function(elm, ev, cb, capture)
    {
	if(elm.addEventListener)
	    elm.addEventListener(ev, cb, capture);
	else if(elm.attachEvent)
	{
	    elm.attachEvent(ev, cb);
	    if(elm.setCapture)
		elm.setCapture(capture);
	}
    }
    root.elementRemoveEventListener = function(elm, ev, cb)
    {
	if(elm.removeEventListener)
	    elm.removeEventListener(ev, cb);
	else if(elm.detachEvent)
	    elm.detachEvent(ev, cb);
    }
    root.urlencode = function(str)
    {
	str = (str + '').toString();
	return encodeURIComponent(str).replace(/!/g, '%21')
	    .replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29')
	    .replace(/\*/g, '%2A').replace(/%20/g, '+');

    }
})(window);