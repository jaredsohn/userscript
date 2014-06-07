// tested with GreaseMonkey 0.8.20080609.0 and DGS 1.0.14
// boilerplate {{{
// ==UserScript==
// @name           Dragon Senseis
// @namespace      http://www.dmwit.com
// @description    Include go diagrams in DGS messages using Senseis' Library syntax
// @include        *dragongoserver.net*
// ==/UserScript==
// xpath {{{
function xpath(query, node) {
    if(node == null) node = document;
    return document.evaluate(query, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathSingle(query, node) { return xpath(query, node).snapshotItem(0); }
function xpathText  (query, node) { return xpathSingle(query, node).textContent; }
// }}}

function map(f, xs) {
    var out = [];
    for each(x in xs) {
        out.push(f(x));
    }
    return out;
}

function trim(s) { return s.replace(/^\s+|\s+$/g, ""); }
// }}}
// a parse buffer; totally naive for now {{{
function buffer(s) {
    // The buffer containing the empty string and the EOF buffer are
    // conceptually different.  Nevertheless, as a matter of defensive
    // programming, we maintain the invariant that if this.eof is true, then
    // this.s = "" (and conversely, if this.s != "", then this.eof is false).
    this.eof = (s == undefined);
    this.s   = (this.eof ? "" : s);

    this.unget = function(s) { this.s = s + this.s; this.eof = false; }
    this.line  = function( ) { return this.splitKeep("\n"); }

    // buffer.split(s) will search for the exact string s
    // If it matches, return the part of the buffer up to the beginning of s,
    // and drop everything in the buffer up to the end of s.
    // If it doesn't match, return the whole buffer, and set the buffer to EOF.
    this.split = function(s) {
        var n  = this.s.indexOf(s), out;

        if(n == -1) {
            out      = this.s;
            this.s   = "";
            this.eof = true;
        } else {
            out      = this.s.substring(0, n);
            this.s   = this.s.substring(n + s.length, this.s.length);
        }

        return out;
    }

    // buffer.splitKeep(s) will search for the exact string s
    // If it matches, return the part of the buffer up to the end of s, and
    // drop everything in the buffer up to the end of s.
    // If it doesn't match, return the whole buffer, and set the buffer to EOF.
    this.splitKeep = function(s) {
        var out = this.split(s);
        if(!this.eof) out = out + s;
        return out;
    }

    // buffer.splitRegex(r) will search the string for the regex r
    // If it matches, return the part of the buffer up to the beginning of the
    // match, and drop everything in the buffer up to the beginning of the
    // match.
    // If it doesn't match, return the whole buffer, and set the buffer to EOF.
    this.splitRegex = function(regex) {
        var out = this.s.match(regex);
        if(out) {
            var n    = this.s.indexOf(out[0]);
            out      = this.s.substring(0, n);
            this.s   = this.s.substring(n);
        } else {
            out      = this.s;
            this.s   = "";
            this.eof = true;
        }
        return out;
    }

    // If the exact string s matches the beginning of the buffer, remove s from
    // the beginning of the buffer and return true.  Otherwise, do not modify
    // the buffer and return false.
    this.consume = function(s) {
        var out = !this.eof && (this.s.substring(0, s.length) == s);
        if(out) this.s = this.s.substring(s.length, this.s.length);
        return out;
    }

    // If the regex r matches the beginning of the buffer, remove the match
    // from the beginning of the buffer and return the match.  Otherwise, do
    // not modify the buffer and return null.
    this.match = function(regex) {
        if(this.eof) return null;
        var out = this.s.match(regex);
        if(out && this.consume(out[0])) return out[0];
        return null;
    }
}
// }}}
// a hoshi-guessing heuristic {{{
// hoshiPositions(numberOfRows, numberOfColumns) returns a list of [row, col]
// points (in virtual board coordinates, see comments on the board class) that
// are probably hoshi points.
function hoshiPositions(m, n) {
    if(n == undefined) {
        if(m < 5) return [];

        var corner = m < 12 ? 3 : 4;
        var middle = (m > 12 && m % 2 == 1) ? [(m - 1) / 2] : [];

        return [].concat([corner - 1], middle, [m - corner]);
    } else {
        var out = (m % 2 == 1 && n % 2 == 1) ? [[(m - 1) / 2, (n - 1) / 2]] : [];
        for each(x in hoshiPositions(n))
            for each(y in hoshiPositions(m))
                out.push([y, x]);
        return out;
    }
}
// }}}
// some renderable types {{{
function render   (r) { return r.render(); }
function wrapImage(s) { return "<image board/" + s + ".gif>"; }

function literal(s) {
    this.s = s;
    this.render = function() { return this.s; }
}

function codeBlock(s) {
    this.s = s;
    this.render = function() { return "<code>" + this.s + "</code>"; }
}

enum_mark = {
    // positive marks are numbers for stones and letters for empty points
    none        :  0,
    circle      : -1,
    square      : -2,
    triangle    : -3,
    cross       : -4,
    SIZE        :  5
};
enum_stone = {
    hoshi       : -1,
    empty       :  0,
    black       :  1,
    white       :  2,
    SIZE        :  4
};
enum_position = {
    beginning   :  0,
    middle      :  1,
    end         :  2,
    SIZE        :  3
};

function opponent(stone) {
    if(stone == enum_stone.black) return enum_stone.white;
    if(stone == enum_stone.white) return enum_stone.black;
}

// A graphic represents a single point on the board.  The "ud" and "lr" fields
// indicate whether the point is on the edge of the board.
function graphic(stone, mark) {
    if(stone == undefined) stone = enum_stone.empty;
    if(mark  == undefined) mark  = enum_mark.none;

    this.stone = stone;
    this.mark  = mark;
    this.ud    = enum_position.middle;
    this.lr    = enum_position.middle;

    // graphics that hash to the same value will all be linked equivalently
    this.hash   = function() { return this.mark * enum_stone.SIZE + Math.max(this.stone, enum_stone.empty); }
    this.render = function() { return wrapImage(this.image()); }
    this.image  = function() {
        var base = ["h", "e", "b", "w"][this.stone + 1];
        if(this.stone == enum_stone.empty) {
            base = "ued"[this.ud];
            base = base + ["l", "", "r"][this.lr];
        }

        var mark = "";
        if(this.mark <= 0)
            mark = ["", "c", "s", "t", "x"][-this.mark];
        else if(this.stone == enum_stone.black || this.stone == enum_stone.white)
            mark = String(this.mark);

        return base + mark;
    }

    this.setHoshi = function() {
        if(this.stone == enum_stone.empty)
            this.stone = enum_stone.hoshi;
    }
}

const coordinateNames = "abcdefghjklmnopqrstuvwxyz"; // note: no 'i'

// A board represents an entire diagram.
//
// There is some subtlety here, because there are actually three coordinate
// systems coexisting.
// "readable" coordinates: these are the coordinates like "c11" that will
//      actually be printed on the board.  They start at "a1" in the lower
//      left of the board; letters increase as you move right, and numbers
//      increase as you move up.
// "virtual" coordinates: these are the coordinates with respect to the entire
//      board.  They begin at [0, 0] at the top left of the board; the first
//      coordinate increases as you go down, and the second coordinate
//      increases as you move right.
// "physical" coordinates: these are the coordinates in the 2D array used to
//      represent the board.  They use [0, 0] to be *some* point on the board;
//      the first coordinate increases as you move down, and the second
//      coordinate increases as you move right.
// Obviously, this kind of sucks.  Patches to reduce the number of coordinate
// systems to two (or even one) will be gratefully accepted.
//
// upper, lower, left, right: indicate which edges have been requested
// coordinates: indicate whether coordinate rendering has been requested
// point: a 2D array of graphic objects
// color: which player does the base move belong to?
// move : which move is the base move?
// size : the requested board size
// links: a map from graphic hashes to URLs
// lowerleft: tracks the relationship between virtual and physical coordinates;
//      this is the physical coordinate corresponding to the virtual coordinate
//      [this.point.length, 0]
function board() {
    this.title = "";
    this.upper = this.lower = this.left = this.right = this.coordinates = false;
    this.point = [];
    this.color = enum_stone.black;
    this.move  = 1;
    this.size  = 19;
    this.links = {};
    this.lowerleft = [18, 0];

    this.render = function() {
        var out = [], row, point;
        out.push("<center>\n");
        out.push(this.title);
        out.push("\n");

        if(this.upper) this.renderCoordinateRow(out);
        for(i = 0; i < this.point.length; i++) {
            var row = this.point[i];
            if(this.left) this.renderCoordinateColumn(out, i);
            for each(point in row) {
                var url = this.links[point.hash()];
                if(url != null) out.push('<a href="' + url + '">');
                out.push(point.render());
                if(url != null) out.push('</a>');
            }
            if(this.right) this.renderCoordinateColumn(out, i);
            out.push("\n");
        }
        if(this.lower) this.renderCoordinateRow(out);

        out.push("</center>\n");
        return out.join("");
    }

    this.renderCoordinateRow = function(out) {
        if(!this.coordinates) return;
        if(!this.left && !this.right) return;
        const width = this.point[0].length;
        const left  = this.lowerleft[1];

        if(this.left ) out.push(wrapImage('c'));
        for each(c in coordinateNames.substring(left, left + width))
            out.push(wrapImage('c' + c));
        if(this.right) out.push(wrapImage('c'));
        out.push("\n");
    }

    this.renderCoordinateColumn = function(out, i) {
        if(!this.coordinates) return;
        if(!this.upper && !this.lower) return;
        const height = this.point.length;
        const lower  = this.lowerleft[0];

        out.push(wrapImage('c' + (lower + height - i)));
    }

    // Using our knowledge of where the edges are, conclude() sets the position
    // information for the edge points.  It also makes a guess about where
    // hoshi points should go, and updates any empty positions accordingly.
    this.conclude = function() {
        if(this.upper) for each(point in this.point[0                  ]) point.ud = enum_position.beginning;
        if(this.lower) for each(point in this.point[this.point.length-1]) point.ud = enum_position.end;
        if(this.left ) for each(row   in this.point) row[0             ].lr = enum_position.beginning;
        if(this.right) for each(row   in this.point) row[row.length - 1].lr = enum_position.end;

        var boardRows = this.size, boardCols = this.size;
        var rows = this.point.length, cols = this.point[0].length;
        if(this.upper && this.lower) boardRows = rows;
        if(this.left  && this.right) boardCols = cols;
        this.lowerleft[0] = (this.lower || rows > boardRows) ? 0 : boardRows - rows;
        this.lowerleft[1] = (this.left  || cols > boardCols) ? 0 : boardCols - cols;

        for each(point in hoshiPositions(boardRows, boardCols))
            this.setHoshi(point);
    }

    this.setHoshi = function(point) {
        point[0]  = this.lowerleft[0] + this.point.length - point[0] - 1;
        point[1]  = point[1] - this.lowerleft[1];

        if(!this.inBounds(point[0], this.point.length)) return;
        if(!this.inBounds(point[1], this.point[point[0]].length)) return;
        this.point[point[0]][point[1]].setHoshi();
    }

    this.inBounds = function(i, max) { return 0 <= i && i < max; }
}
// }}}
// parser {{{
// The top level parser for our grammar.  The grammar at this stage looks something like
// comment         ::= EOF | board comment | commentFragment comment
// commentFragment ::= inlineMarkup codeBlock | inlineMarkup '\n'
function parseComment(b) {
    if(b.eof) return [];

    var line = b.line();
    var lineBuffer = new buffer(line);

    if(lineBuffer.consume("$$")) {
        b.unget(line);
        var board = parseBoard(b);
        var rest  = parseComment(b);
        return [board].concat(rest);
    }

    var code = new literal();
    line = lineBuffer.split("<code>");
    if(!lineBuffer.eof) {
        b.unget(lineBuffer.s);
        code = parseCode(b);
    }

    var markup = parseInlineMarkup(new buffer(line));
    var rest   = parseComment(b);

    markup = markup.concat([code], rest);
    return markup;
}

// board ::= titleLine optionalUDEdge boardLine* optionalUDEdge footerLine*
function parseBoard(b) {
    var board = parseTitleLine(b);

    parseOptionalUDEdge(b, board, true );
    while(parseBoardLine(b, board));
    parseOptionalUDEdge(b, board, false);
    while(parseFooterLine(b, board));

    board.conclude();
    return board;
}

// titleLine ::= "$$" 'W'? 'c'? number? ('m' number)? string '\n'
//             | "$$" 'B'? 'c'? number? ('m' number)? string '\n'
// string does not include '\n'
function parseTitleLine(b) {
    var out = new board;
    b.consume("$$");

    if(b.consume("W")) out.color = enum_stone.white;
    if(b.consume("B")) out.color = enum_stone.black;
    if(b.consume("c")) out.coordinates = true;

    var size = b.match(/[1-9][0-9]*/);
    if(size != null)   out.size = Number(size);

    if(b.consume("m")) {
        var n = b.match(/[1-9][0-9]*/);
        if(n == null) b.unget("m");
        else out.move = Number(n);
    }

    out.title = trim(b.line());
    return out;
}

// optionalUDEdge ::= "$$" space* edge space* edge space* edge* space* '\n'
// edge           ::= '-' | '|' | '+'
// space does not include '\n'
function parseOptionalUDEdge(b, board, upper) {
    if(!b.consume("$$")) return;

    var line = b.line();
    if(!line.match(/^\s*([-|+]\s*){2,}$/)) {
        b.unget("$$" + line);
        return;
    }

    if(upper) board.upper = true;
    else      board.lower = true;
}

// footerLine ::= "$$" space* '[' boardPoint '|' string ']' '\n'
function parseFooterLine(b, board) {
    if(!b.consume("$$")) return;
    var line       = b.line();
    var spaceless  = trim(line);

    if(!spaceless.match(/^\[[#,.@0-9BCMOPQSTWXYZa-z]\|[^\n]*\]$/)) {
        b.unget("$$" + line);
        return false;
    }

    var graphic = parseBoardPoint(board, spaceless[1]);
    var url     = spaceless.substring(3, spaceless.length - 1);
    board.links[graphic.hash()] = url;

    return true;
}

// boardLine ::= "$$" optionalEdge (space* boardPoint){2,} optionalEdge space* '\n'
// optionalEdge ::= space* edge?
function parseBoardLine(b, board) {
    if(!b.consume("$$")) return false;
    var line = b.line();
    var spaceless = line.replace(/\s+/g, "");

    if(!spaceless.match(/^[-|+]?[#,.@0-9BCMOPQSTWXYZa-z]{2,}[-|+]?$/)) {
        b.unget("$$" + line);
        return false;
    }

    if(spaceless[0].match(/[-|+]/)) {
        spaceless   = spaceless.substring(1, spaceless.length);
        board.left  = true;
    }
    if(spaceless[spaceless.length - 1].match(/[-|+]/)) {
        spaceless   = spaceless.substring(0, spaceless.length - 1);
        board.right = true;
    }

    board.point.push([]);
    var row = board.point.length - 1;
    for each(c in spaceless) {
        board.point[row].push(parseBoardPoint(board, c));
    }
    return true;
}

function parseBoardPoint(board, c) {
    if(c == ',') return new graphic(enum_stone.hoshi, enum_mark.none    );
    if(c == '.') return new graphic(enum_stone.empty, enum_mark.none    );
    if(c == 'C') return new graphic(enum_stone.empty, enum_mark.circle  );
    if(c == 'S') return new graphic(enum_stone.empty, enum_mark.square  );
    if(c == 'T') return new graphic(enum_stone.empty, enum_mark.triangle);
    if(c == 'M') return new graphic(enum_stone.empty, enum_mark.cross   );
    if(c == 'X') return new graphic(enum_stone.black, enum_mark.none    );
    if(c == 'B') return new graphic(enum_stone.black, enum_mark.circle  );
    if(c == '#') return new graphic(enum_stone.black, enum_mark.square  );
    if(c == 'Y') return new graphic(enum_stone.black, enum_mark.triangle);
    if(c == 'Z') return new graphic(enum_stone.black, enum_mark.cross   );
    if(c == 'O') return new graphic(enum_stone.white, enum_mark.none    );
    if(c == 'W') return new graphic(enum_stone.white, enum_mark.circle  );
    if(c == '@') return new graphic(enum_stone.white, enum_mark.square  );
    if(c == 'Q') return new graphic(enum_stone.white, enum_mark.triangle);
    if(c == 'P') return new graphic(enum_stone.white, enum_mark.cross   );
    if(c == '0') return new graphic(opponent(board.color), board.move + 10);
    if(c >= '1' && c <= '9') {
        var n = Number(c), color = board.color;
        if(n % 2 == 0)     color = opponent(color);
        return new graphic(color, board.move + n - 1);
    }
    if(c >= 'a' && c <= 'z') return new graphic(enum_stone.empty, c.charCodeAt(0) - 'a'.charCodeAt(0) + 1);
}

// code ::= "<code>" (string '\n')* string "</code>"
function parseCode(b) { return new codeBlock(b.split("</code>")); }

// I won't try to write this one in EBNF form.  It splits out words, looking
// for words like BO and stuff.  The Senseis' Library page has the full list.
// You can use n copies of ! to escape the same string with n-1 copies of !;
// for example, !!BO becomes !BO, !BO becomes BO, and !!NOTMARKUP becomes
// !!NOTMARKUP.
function parseInlineMarkup(b) {
    var out = [];

    while(true) {
        out.push(new literal(b.splitRegex(/(^|\W)\!*([BWE][CSTX]|[BW](O|[1-9][0-9]*))(\W|$)/)));
        if(b.eof) break;
        out.push(new literal(b.match(/[^!BWE]*/)));

        var parsable = b.match(/\!*([BWE][CSTX]|[BW](O|[1-9][0-9]*))/);
        if(parsable[0] == '!') {
            out.push(new literal(parsable.substring(1)));
        } else {
            var stoneM = { B : enum_stone.black,
                           W : enum_stone.white,
                           E : enum_stone.empty
                         };
            var markM  = { O : enum_mark.none,
                           C : enum_mark.circle,
                           S : enum_mark.square,
                           T : enum_mark.triangle,
                           X : enum_mark.cross
                         };

            var stone = stoneM[parsable[0]];
            var mark  = markM [parsable[1]];
            if(mark == undefined) mark = Number(parsable.substring(1));

            out.push(new graphic(stone, mark));
        }
    }

    return out;
}
// }}}
// go! {{{
function translate   (s) { return map(render, parseComment(new buffer(s))).join(""); }
function translateAll(e) {
    for each(textarea in document.getElementsByTagName("textarea"))
        if(textarea.name != "gamenotes")
            textarea.value = translate(textarea.value);
}

buttons = xpath("//input[@type='submit']");
for(i = 0; i < buttons.snapshotLength; i++)
    buttons.snapshotItem(i).addEventListener("click", translateAll, false);
// }}}