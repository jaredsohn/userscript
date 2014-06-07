// ==UserScript==
// @name          Collapse Details Box
// @namespace     http://code.chimericdream.com/gmscripts/
// @description
// @version       1.0 2009-06-19
// @include       http://www.rememberthemilk.com/*
// @include       https://www.rememberthemilk.com/*
// ==/UserScript==

function addCollapseDetails() {
    dCollapse = document.createElement('span');
    dCollapse.id = 'detailsCollapse';
    dCollapse.className = 'expanded';
    dCollapse.innerHTML = '&nbsp;';
    dCollapse.title = 'Hide details box';

    dCollapse.addEventListener('click', collapseDetails, false);
    detailsBox = document.getElementById('detailsbox');
    detailsBox.insertBefore(dCollapse, detailsBox.firstChild);
}

function collapseDetails() {
    if (this.className == 'collapsed') {
        this.className = 'expanded';
        this.title = 'Hide details box';
        document.getElementById('details').style.display = '';
        showHideSnakeDivs('show');
    } else {
        this.className = 'collapsed';
        this.title = 'Un-hide details box';
        document.getElementById('details').style.display = 'none';
        showHideSnakeDivs('hide');
    }
}

function showHideSnakeDivs(mode) {
    var divNodes = document.getElementsByTagName('div');
    for (var i = 0; i < divNodes.length; i++) {
        if (divNodes[i].className == 'snake' || divNodes[i].className == 'snake hidden') {
            if (mode == 'show') {
                divNodes[i].style.display = '';
            } else {
                divNodes[i].style.display = 'none';
            }
        }
    }
}

function addCollapseStyle() {
    css = "#detailsCollapse {";
    css += "    cursor: pointer !important;";
    css += "    display: inline-block !important;";
    css += "    height: 16px !important;";
    css += "    overflow: hidden !important;";
    css += "    width: 16px !important;";
    css += "}";
    css += "#detailsCollapse.expanded {";
    css += "    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAImSURBVDjLpZNPSFVBFMZ/9859+C9J9PmPwpeUi8qyIB5JLQqEoqAQIUqCFiFB4aJWrsIgW0TLyHYRBFJgYBiUKUkmPYwio02kuZBMny8JzT95Z860uI93n62MBoaPc4b5zne+meNYa/mf5QE8GPp51VpajJXNIoIR0CIYIxixaCNZ22C0xYi87ThbE/cAxNrWpnhh9F8qtz8c251RYESiAD1f76NFo43GF41v/BCNzpy11Xfg+yYniyDwoXnH+XVVX1zR+NqEHhgjAHS9Tq6L4MS+YlazCXSaAODMwTIeDc9w6kB5JtedmKFpfxin5lfWKvCNINbiKeh+k0Qpl8eJJI4LbvpSz0gSrCXiwfZN+az6f7VgAU85NMZL6RmZ5WS8bI2C7Hhsah6tZa0CK+C50PtuFqUChCAH8Oz2TXIS95DpcZxoJXVFx4H6NIEWrLVEFBzdW0r/aIqGuvBbDN69RclkLzXNLeRU72T5Yx+FQwO8aIi0BiZKIEe5Dv2jKYAMug74LzvZdu4SueOD8Oo6+RuLqI7FeP/ZXg4ItA48cOHwriiDn1Icqg0VDPyYJLeiGo5dCWegvRIlzpbQA2uprdrA97lltpbnMTH9KzMLlFSw9OEpBU8u8nt5miVgYV5hFFPpV7DD17q+7Fk1UuBrg68NRgu+EbTR1Jc3UpB4Tqw4D09FWJjVTMy41iJ3nPWO8/DpqrbFuakLyjgxo+w3C51H+vSNP9H7LzNBaB8uAAAAAElFTkSuQmCC) !important;";
    css += "    background-position: center center !important;";
    css += "    background-repeat: no-repeat !important;";
    css += "}";
    css += "#detailsCollapse.collapsed {";
    css += "    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIpSURBVDjLpZNPSFRRFMZ/749/Kt3IqFTSRoSMmrGIYTTbpEJtjBCCok1Em9JVG1dRC8FFEES5aGFEgRRZWq1iLKKxBiNqLDcltQgmHR9hY6LOu+feFm+YGVsZXbh8nHO53/nud8+xjDH8z3IB7r5avGgMZ8XoBq01okFpjYhGtEGJLtmCKINo/XbgVFPUBdDG9PVEq0P/UvnSvdlwQYFoHQIY/3obpRVKFL5W+OIXUVThrL91AN+XihKCwIeTu85sqPryqsJXUvRARAMwkshsiKB7fw25UgKVJwA40V7H/cl5jh+oL+RGk/P0xIqxl11dr8AXjTYG14HRNxkcx+ZhMoNlg52/ND6VAWMoc6F5+2Zy/l9PMIDrWByL1jI+tcDRaN06BaXxbDqLUnq9AqPBteHpuwUcJ0AIcgBXH93h+/wEyyuLrPk5cmv7gNY8gdIYYyhz4PDeWuIpj85IsS2ujQ2zJAk6DkZpqGnixcwYyU+PifUOX7Eh6DoAx7aIpzwA4imPeMrj+bTH+88PaNkZQWwhsrULsXxie9oAzgcESgUe2NAZCeE6AXZGQhwKh/Cyc5RZVXQ39wFwoeMmjXVhgMqiB8awe0cVP36u0Fi/iW9zvwuzkF3+xUz6Nal0gv6uWww+O02lUwGwmv8FM3l55EtLTvQWXwm+EkRpfNEoUZRXHCE5PUFbuJ0nH4cot1wSH14C3LA2Os6x3m2DwDmgGlgChpLX0/1/AIu8MA7WsWBMAAAAAElFTkSuQmCC) !important;";
    css += "    background-position: center center !important;";
    css += "    background-repeat: no-repeat !important;";
    css += "    margin-bottom: 5px !important;";
    css += "}";

    if (typeof GM_addStyle == 'function') {
        GM_addStyle(css);
    } else if ((head = document.getElementsByTagName('head')[0])) {
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
	style.innerHTML = css;
        head.appendChild(style);
    }
}

window.addEventListener('load', addCollapseStyle, false);
window.addEventListener('load', addCollapseDetails, false);