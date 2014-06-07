// ==UserScript==
// @name          BYBS Ikariam - Alliance Map
// @version       1.0
// @date          04-05-09
// @namespace     archeorbiter.googlecode.com
// @description   Version 1.1 - Adds a "Map" link to the Embassy view to easily create an alliance map with the member locations.
// @include       http://s*.ikariam.tld/index.php?view=embassy*
// @include       http://s*.ikariam.com.pt/index.php?view=embassy*
// @include       http://s*.ikariam.co.il/index.php?view=embassy*
// @include       http://s*.fi.ikariam.com/index.php?view=embassy*
// ==/UserScript==

// For the underlying technology full credit to Johan Sundström.
// Release thread and further explanations: http://corentin.jarnoux.free.fr/kronosutils/index.php?topic=93.0


// ------- Settings -------- //
var type = '0';                // 0: show nothing, 1: show resource types, 2: show +10% wonders, 3: show both
var color = 'DarkSlateBlue';   // highlight color (accepts every type of HTML compatible color code)
var opacity = '100';           // color opacity (0 - invisible to 100 - fully visible) 
// ------- /Settings ------- //


// --- Helper Functions --- //

// Credit to Johan Sundström
function $x( xpath, root ) {
        var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
        var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
        switch (got.resultType) {
                case got.STRING_TYPE:
                        return got.stringValue;
                case got.NUMBER_TYPE:
                        return got.numberValue;
                case got.BOOLEAN_TYPE:
                        return got.booleanValue;
                default:
                        while (next = got.iterateNext())
                                result.push( next );
                                return result;
        }
}
function $X( xpath, root ) {
        var got = $x( xpath, root );
        return got instanceof Array ? got[0] : got;
}

// Credit to Martin Withaar
function unique(a) {
        var r = new Array();
        o:for(var i = 0, n = a.length; i < n; i++) {
                for(var x = 0, y = r.length; x < y; x++)
                        if(r[x]==a[i]) continue o;
                r[r.length] = a[i];
        }
        return r;
}

// Credit to Stephen Chapman
Array.prototype.max = function() {
        var max = this[0];
        var len = this.length;
        for (var i = 1; i < len; i++) if (this[i] > max) max = this[i];
        return max;
}
Array.prototype.min = function() {
        var min = this[0];
        var len = this.length;
        for (var i = 1; i < len; i++) if (this[i] < min) min = this[i];
        return min;
}
// --- /Helper Functions --- //


var cities = $x('id("memberList")/tbody/tr/td[@class="cityInfo"]//a[@class="city"]');
var server = location.host;

if(cities != "") {
        function makeMap() {
                function makeArray(elem) {
                        [coord, x, y] = elem.textContent.match(/(\d+):(\d+)/);
                        xs.push(parseInt(x));
                        ys.push(parseInt(y));
                        islands.push(coord);
                }
        
                var islands = [], xs = [], ys = [];
                cities.forEach(makeArray);
                islands = unique(islands);
                
                var xMin = xs.min(), xMax = xs.max();
                var yMin = ys.min(), yMax = ys.max();
                var width = (xMax - xMin) + 5;
                var height = (yMax - yMin) + 5;
                var center = 'x='+ Math.round((xMin + xMax) / 2) +
                            '&y='+ Math.round((yMin + yMax) / 2);

                var url = 'http://ecmanaut.googlecode.com/svn/trunk/sites/ikariam.org/kronos-utils/'+
                          'minimap.html?s='+ server +'&r='+ type +
                          '&'+ center +'&w='+ width +'&h='+ height +'&'+ color +'/'+ opacity +'='+ islands;
                window.open(url, '_blank');
        }

        var header = $X('id("memberList")/thead/tr/th[3]');
        var link = document.createElement('strong');
        link.innerHTML = ' (<a href="#">Map</a>)';
        link.style.cursor = 'pointer';
        link.addEventListener('click', makeMap, false);
        header.appendChild(link);
}
