// ==UserScript==
// @name       Sort AniChart
// @namespace  http://userscripts.org/scripts/show/463932
// @version    0.0.3
// @description  Sorts anime in anichart by closest to release
// @updateURL http://userscripts.org/scripts/source/463932.meta.js
// @downloadURL http://userscripts.org/scripts/source/463932.user.js
// @match      http://anichart.net/*
// @copyright  2014+, fuzetsu
// ==/UserScript==

// takes the card node and returns the total time before release in minutes
var calcTime = function (node) {
    node = node.querySelector('.ctdn');
    if(!node) return Number.MAX_SAFE_INTEGER;
    var text = node.textContent.trim();
    return text.slice(text.indexOf('-') + 2).split(' ').reduce(function (prev, cur) {
        var type = cur[cur.length - 1];
        return prev + parseInt(cur) * (type === 'd' ? 24 * 60 : type === 'h' ? 60 : type === 'm' ? 1 : 0);
    }, 0);
};

var registerNavItem = function(text, action) {
    var navArea = document.querySelector('.nav_extra_text');
    var anchor = document.createElement('a');
    anchor.textContent = text;
    anchor.href = "javascript:void(0)";
    anchor.addEventListener('click', action, false);
    navArea.appendChild(document.createTextNode(' | '));
    navArea.appendChild(anchor);
};

var sortByReleaseTime = function(desc) {
    var groups = [].slice.call(document.querySelectorAll('.cardWrapper'));
    
    groups.forEach(function(group) {
        var result = [].slice.call(group.querySelectorAll('.anime_info, .anime_info_sml')).sort(function(a, b) {
            var aTime = calcTime(a),
                bTime = calcTime(b);
            return aTime > bTime ? 1 : aTime === bTime ? 0 : -1;
        });
        group.innerHTML = "";
        if(desc) result.reverse();
        result.forEach(function(node) {group.appendChild(node);});
    });
};


var init = function() {
    console.log('STARTING - Sort AniChart');
    
    // add nav item
    registerNavItem('Sort by closest release', sortByReleaseTime.bind(null, false));
    registerNavItem('Sort by furthest release', sortByReleaseTime.bind(null, true));
    
};

document.addEventListener('DOMContentLoaded', init);