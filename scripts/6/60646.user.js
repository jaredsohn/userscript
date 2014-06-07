// ==UserScript==
// @name          Nonograms
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Nonogram helper
// @include       http://www.puzzle-nonograms.com/*
// @version       26 Oct 2009
// ==/UserScript==

function Board(R, C) {
    this.ROWS = R;
    this.COLS = C;
    this.board = new Array(this.ROWS);
    this.vstacks = new Array(this.COLS);
    this.hstacks = new Array(this.ROWS);
    this.changed = false;
    
    for (var r = 0; r < this.ROWS; ++r) {
        this.board[r] = new Array(this.COLS);
    }
}

Board.prototype.getCell = function(r,c) {
    return this.board[r][c];
}

Board.prototype.setCell = function(r, c, v) {
    if (this.board[r][c] == undefined) {
        this.changed = true;
        this.board[r][c] = v;
        if (v) {
             cell_1(r, c);
        }
    }
}

Board.prototype.isSolved = function() {
    for (var r = 0; r < this.ROWS; ++r) {
        for (var c = 0; c < this.COLS; ++c) {
            if (this.getCell(r,c) == undefined)
                return false;
        }
    }
    return true;
}

Board.prototype.cleanVStack = function(c) {
    var stack = this.vstacks[c];

    for (var r = 0; r < this.ROWS; ++r) {
        var cell = this.getCell(r, c);
        if (cell != undefined) {
            for (var s = 0; s < stack.stack.length;) {
                var line = stack.stack[s];
                if (line[r] != cell) {
                    stack.stack.splice(s, 1);
                    this.changed = true;
                }
                else {
                    s += 1;
                }
            }
        }
    }
}

Board.prototype.cleanHStack = function(r) {
    var stack = this.hstacks[r];

    for (var c = 0; c < this.COLS; ++c) {
        var cell = this.getCell(r, c);
        if (cell != undefined) {
            for (var s = 0; s < stack.stack.length;) {
                var line = stack.stack[s];
                if (line[c] != cell) {
                    stack.stack.splice(s, 1);
                    this.changed = true;
                }
                else {
                    s += 1;
                }
            }
        }
    }
}

Board.prototype.applyVStack = function(c) {
    var stack = this.vstacks[c];

    for (var r = 0; r < stack.L; ++r) {
        var ors = 0;
        var ands = stack.stack.length > 0 ? 1 : 0;
        for (var s = 0; s < stack.stack.length; ++s) {
            var line = stack.stack[s];
            ors |= line[r];
            ands &= line[r];
        }
        if (ors == 0) {
            this.setCell(r, c, 0);
        }
        else if (ands == 1) {
            this.setCell(r,c,1);
        }
    }
}

Board.prototype.applyHStack = function(r) {
    var stack = this.hstacks[r];

    for (var c = 0; c < stack.L; ++c) {
        var ors = 0;
        var ands = stack.stack.length > 0 ? 1 : 0;
        for (var s = 0; s < stack.stack.length; ++s) {
            var line = stack.stack[s];
            ors |= line[c];
            ands &= line[c];
        }
        if (ors == 0) {
            this.setCell(r, c, 0);
        }
        else if (ands == 1) {
            this.setCell(r, c, 1);
        }
    }
}

Board.prototype.solve = function() {
    do {
        this.changed = false;
        for (var c = 0; c < this.COLS; ++c) {
            this.cleanVStack(c);
            this.applyVStack(c);
        }
        for (var r = 0; r < this.ROWS; ++r) {
            this.cleanHStack(r);
            this.applyHStack(r);
        }
    } while (this.changed && !this.isSolved());
}

function Stack(L, ranges) {
    this.L = L;
    this.ranges = ranges;
    this.stack = new Array();

    var gaps = 0;
    if (this.ranges.length > 0)
        gaps = this.ranges.length - 1;
    
    var total = 0;
    for (var i = 0; i < this.ranges.length; ++i) {
        total += this.ranges[i];
    }
    var extra = this.L - total - gaps;
    this.fillStackLine(new Array(this.L), extra, 0, 0);
}

Stack.prototype.fillStackLine = function(template, extra, start, r) {
    if (r >= this.ranges.length) {
        var line = template;
        for (var cp = start; cp < line.length; ++cp) {
            line[cp] = 0;
        }
        this.stack.push(line);
    }
    else {
        var count = this.ranges[r];    
        for (var ep = 0; ep <= extra; ++ep) {
            if (ep > 0) {
                template[start + ep - 1] = 0;
            }
            var line = this.createLine(template, start + ep);
            for (var rp = 0; rp < count; ++rp) {
                line[start + ep + rp] = 1;
            }
            var n = start + ep + count;
            if (r + 1 < this.ranges.length) {
                line[start + ep + count] = 0;
                n += 1;
            }
            this.fillStackLine(line, extra - ep, n, r + 1);
        }
    }
}

Stack.prototype.createLine = function(template, start) {
    var line = new Array(template.length);
    for (var l = 0; l < start; ++l) {
        line[l] = template[l];
    }
    return line;
}

Stack.prototype.toString = function() {
    var sb = "L=" + this.L + " ranges=" + formatLine(this.ranges) + "\n";
    for (s = 0; s < this.stack.length; ++s) {
        sb += formatLine(this.stack[s]) + "\n";
    }
    return sb;
}

function parseTable() {
    var nt = document.getElementById('NonogramsTable');
    if (!nt)
        return null;

    var rows = nt.getElementsByTagName('tr');
    var cols = rows.item(0).getElementsByTagName('td');
    
    var board = new Board(rows.length - 1, cols.length - 1);

    for (var c = 1; c < cols.length; ++c) {
        var ranges = [];
        var spans = cols.item(c).getElementsByTagName('span');
        for (var s = 0; s < spans.length; ++s) {
            ranges.push(parseInt(spans.item(s).textContent));
        }
        board.vstacks[c-1] = new Stack(board.ROWS, ranges);
    }

    for (var r = 1; r < rows.length; ++r) {
        var ranges = [];
        var tds = rows.item(r).getElementsByTagName('td');
        var spans = tds.item(0).getElementsByTagName('span');
        for (var s = 0; s < spans.length; ++s) {
            ranges.push(parseInt(spans.item(s).textContent));
        }
        board.hstacks[r-1] = new Stack(board.COLS, ranges);
    }
    return board;
}

function fireEvent(iNode, evtType, evtName, evtBubble, evtCancelable) {
	var evtObj = document.createEvent(evtType);
	evtObj.initEvent(evtName, evtBubble, evtCancelable);
	return iNode.dispatchEvent(evtObj);
}

function cell_1(r,c) {
    var imgs = document.evaluate("//img[@name='i_" + r + "_" + c + "']", document, null,
                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < imgs.snapshotLength; ++i) {
        var node = imgs.snapshotItem(i)
    	fireEvent(node, "MouseEvent", "mousedown", true, true);
    	fireEvent(node, "MouseEvent", "mouseup", true, true);
    }
}

//function board_done() {
//    var imgs = document.evaluate("//input[@name='ready']", document, null,
//                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//    for (var i = 0; i < imgs.snapshotLength; ++i) {
//    	fireEvent(imgs.snapshotItem(i), "MouseEvent", "click", true, true);
//    }
//}

function formatLine(line) {
    var sb = "[";
    for (var i = 0; i < line.length; ++i) {
        if (i > 0) { sb += ","; }
        sb += line[i];
    }
    sb += "]";
    return sb;
}

GM_registerMenuCommand('Solve Nonogram', function() { parseTable().solve(); });
