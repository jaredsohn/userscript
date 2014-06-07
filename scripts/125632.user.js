// ==UserScript==
// @name                BvS Mahjong
// @namespace           taltamir
// @description         Plays BvS Mahjong according to the "Level Two Strat"
// @include             http://*animecubed.com/billy/bvs/partyhouse-mahjongplay.html
// @updateURL           http://userscripts.org/scripts/source/125632.user.js
// @version             1.9
// @history             1.9 Rewrote dom parsing (by North)
// @history             1.8 Prevents "you are playing too fast" and slowdowns (by taltamir).
// @history             1.7 Chrome compatibility (by taltamir).
// @history             1.06 Works again (McM changed the Dora mouseover); last version by Garyzx
// @history             1.05 Hotkey now works for "Go to Next Round"
// @history             1.04 Add hotkey ('d')
// @history             1.03 Detect winds, dora, reach
// @history             1.02 Added script updater
// @history             1.01 Less fail
// @history             1.00 Initial version by Garyzx
// ==/UserScript==

(function () {
    var tiles = [], amount = {};
    var yWind, tWind, doras;

    function Tile(node) {
        this.id = node.children[0].src.match(/[A-Z0-9]+(?=.gif)/)[0];
        this.inputId = node.htmlFor;
        this.name = node.textContent;
        if (this.name[1] === "-") {
            this.value = Number(this.name[0]);
            this.suit = this.name.substr(2);
        } else {
            this.value = this.name;
            if (this.value === "Red" || this.value === "White" || this.value === "Green") {
                this.suit = "dragon";
            } else {
                this.suit = "wind";
            }
        }
        this.amount = function (offset) {
            if (offset === 0) {
                return amount[this.name];
            }
            if (this.suit === "dragon" || this.suit === "wind") {
                return 0;
            }
            var n = this.value + offset;
            if (n < 1 || n > 9) {
                return 0;
            }
            if (!amount[n + "-" + this.suit]) {
                amount[n + "-" + this.suit] = 0;
            }
            return amount[n + "-" + this.suit];
        };
    }

    function find(id) {
        return document.evaluate("//img[@height='32'][contains(@src,'" + id + ".gif')]", document, null, 7, null).snapshotLength;
    }

    function match(array, arrays) {
        var i, j;
        for (i = 0; i < arrays.length; i++) {
            var good = true;
            for (j = 0; j < arrays[i].length; j++) {
                if (array[j] !== arrays[i][j] && arrays[i][j] !== -1 && !(arrays[i][j] === 1.5 && array[j] > 0)) {
                    good = false;
                }
            }
            if (good) {
                return true;
            }
        }
        return false;
    }

    function init() {
        var i;
        var matches = document.evaluate('//label[img]', document, null, 7, null);
        if (!matches.snapshotLength) {
            return false;
        }
        for (i = 0; i < matches.snapshotLength; i++) {
            tiles[i] = new Tile(matches.snapshotItem(i));
            if (amount[tiles[i].name] > 0) {
                amount[tiles[i].name]++;
            } else {
                amount[tiles[i].name] = 1;
            }
        }
        yWind = document.evaluate("//td/b[contains(text(),'You (')]", document, null, 7, null).snapshotItem(0).textContent[5];
        try {
            tWind = document.evaluate("//td/b/b/i[contains(text(),'Tiles Left')]", document, null, 7, null).snapshotItem(0).parentNode.parentNode.firstChild.textContent[0];
        } catch (e) {
            tWind = 'E';
        }
        var dorasTitle = document.evaluate("//td/b/span/b[contains(text(),'Dora Indicators:')]", document, null, 7, null).snapshotItem(0).parentNode.title;
        doras = dorasTitle.slice(91, dorasTitle.indexOf('] offsetx') - 1);
        doras = doras.split(/\s/);
        return true;
    }

    function selectTiles() {
        var i, n, neighbors, results = [];
        var reaches = document.evaluate("//td/font/b/i", document, null, 7, null);
        if (reaches.snapshotLength > 0) {
            reaches = reaches.snapshotItem(0).textContent;
            reaches = reaches.replace(/\s/g, '').split(',');
            for (i = 0; i < tiles.length; i++) {
                for (n = 0; n < reaches.length; n++) {
                    if (tiles[i].name === reaches[n]) {
                        results.push(tiles[i]);
                    }
                }
            }
            return results;
        }
        for (i = 0; i < tiles.length; i++) {
            if ((tiles[i].suit === "dragon" || tiles[i].suit === "wind") && tiles[i].amount(0) === 1) {
                results.push(tiles[i]);
            }
        }
        if (results.length > 0) {
            return results;
        }
        var pairs = 0;
        for (i = 0; i < tiles.length; i++) {
            var iso = true;
            for (n = -2; n <= 2; n++) {
                if (n !== 0 && tiles[i].amount(n) > 0) {
                    iso = false;
                }
            }
            if (tiles[i].amount(0) > 1) {
                iso = false;
            }
            if (tiles[i].amount(0) === 2) {
                pairs++;
            }
            if (iso) {
                results.push(tiles[i]);
            }
        }
        if (results.length > 0) {
            return results;
        }
        pairs /= 2;
        for (i = 0; i < tiles.length; i++) {
            neighbors = [];
            for (n = -4; n <= 4; n++) {
                neighbors[n + 4] = tiles[i].amount(n);
            }
            if (match(neighbors, [ [-1, -1, 0, 0, 1, 0, 1, 1, -1], [-1, 1, 1, 0, 1, 0, 0, -1, -1],
                    [-1, -1, 0, 0, 2, 1, 1, 0, -1], [-1, 0, 1, 1, 2, 0, 0, -1, -1],
                    [-1, -1, 0, 1, 2, 1, 0, 0, -1], [-1, 0, 0, 1, 2, 1, 0, -1, -1],
                    [0, 0, 3, 0, 1, 0, 0, -1, -1], [-1, -1, 0, 0, 1, 0, 3, 0, 0],
                    [-1, -1, 0, 0, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 0, 0, -1, -1] ])) {
                results.push(tiles[i]);
            }
        }
        if (results.length > 0) {
            return results;
        }
        if (pairs >= 3) {
            for (i = 0; i < tiles.length; i++) {
                if (tiles[i].amount(0) === 2) {
                    results.push(tiles[i]);
                }
            }
        }
        if (pairs === 1) {
            for (i = 0; i < tiles.length; i++) {
                neighbors = [];
                for (n = -2; n <= 2; n++) {
                    neighbors[n + 2] = tiles[i].amount(n);
                }
                if (match(neighbors, [ [0, 0, 1, 2, 0], [0, 2, 1, 0, 0] ])) {
                    results.push(tiles[i]);
                }
            }
        }
        if (results.length > 0) {
            return results;
        }
        for (i = 0; i < tiles.length; i++) {
            neighbors = [];
            for (n = -2; n <= 2; n++) {
                neighbors[n + 2] = tiles[i].amount(n);
            }
            if (match(neighbors, [ [0, 0, 1, 0, 1.5], [1.5, 0, 1, 0, 0] ])) {
                results.push(tiles[i]);
            } else if (tiles[i].value === 1 && match(neighbors, [[0, 0, 1, 1, 0]])) {
                results.push(tiles[i]);
            } else if (tiles[i].value === 9 && match(neighbors, [[0, 1, 1, 0, 0]])) {
                results.push(tiles[i]);
            }
        }
        if (results.length > 0) {
            return results;
        }
        for (i = 0; i < tiles.length; i++) {
            neighbors = [];
            for (n = -2; n <= 2; n++) {
                neighbors[n + 2] = tiles[i].amount(n);
            }
            if (!match(neighbors, [ [1.5, 1.5, 1.5, -1, -1], [-1, 1.5, 1.5, 1.5, -1], [-1, -1, 1.5, 1.5, 1.5], [-1, -1, 3, -1, -1], [-1, -1, 4, -1, -1] ])) {
                results.push(tiles[i]);
            }
        }
        if (results.length > 0) {
            return results;
        }
        return tiles;
    }

    function key_press(event) {
        if (event.keyCode==68) {
            if(document.forms.namedItem("tsumo")) {
                window.removeEventListener("keyup", key_press, false);		//Remove key listener
                location.assign('javascript:tsumo.submit()');
            } else if(document.forms.namedItem("takeron")) {
                window.removeEventListener("keyup", key_press, false);		//Remove key listener
                location.assign('javascript:takeron.submit()');
            } else if(document.forms.namedItem("startmj")) {
                window.removeEventListener("keyup", key_press, false);		//Remove key listener
                location.assign('javascript:startmj.submit()');
            } else if(document.forms.namedItem("reshuffle")) {
                window.removeEventListener("keyup", key_press, false);		//Remove key listener
                location.assign('javascript:reshuffle.submit()');
            } else if(document.forms.namedItem("discard")) {
                window.removeEventListener("keyup", key_press, false);		//Remove key listener
                location.assign('javascript:discard.submit()');
            } else if(document.forms.namedItem("passontake")) {
                window.removeEventListener("keyup", key_press, false);		//Remove key listener
                location.assign('javascript:passontake.submit()');
            } else if(document.forms.namedItem("backtohome2")) {
                window.removeEventListener("keyup", key_press, false);		//Remove key listener
                location.assign('javascript:backtohome2.submit()');
            }
        }
    }

    if (init()) {
        tiles = selectTiles();
        var maxScore = -9001, bestTile, log = "";
        var i, n;
        for (n = 0; n < tiles.length; n++) {
            log += tiles[n].name + ", ";
            var id = tiles[n].id;
            var score = find(id);
            if (tiles[n].value > 1) {
                score += find(id[0] + (Number(id.substr(1)) - 1)) / 2;
            }
            if (tiles[n].value < 9) {
                score += find(id[0] + (Number(id.substr(1)) + 1)) / 2;
            }
            if (tiles[n].name === tWind) {
                score -= 0.6;
            }
            if (tiles[n].name === yWind) {
                score -= 0.6;
            }
            if (tiles[n].suit === "dragon") {
                score -= 0.6;
            }
            for (i = 0; i < doras.length; i++) {
                if (tiles[n].name === doras[i]) {
                    score -= 0.6;
                }
            }
            if (score > maxScore) {
                maxScore = score;
                bestTile = tiles[n];
            }
        }
        log = log.substr(0, log.length - 2);
        console.log(log);
        var input = document.getElementById(bestTile && bestTile.inputId);
        if (input && !input.disabled) {
            input.click();
        }
        input = document.getElementById("reachbutton");
        if (input) {
            input.click();
        }
    }

    window.addEventListener("keyup", key_press, false);
}) ();
