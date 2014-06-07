// ==UserScript==
// @name           Show Boosted GLB Player Stats On Skill Points Page
// @namespace      pbr
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// @include        http://goallineblitz.com/game/training.pl?player_id=*
// @version        09.02.27
// ==/UserScript==

/*
 *
 * written by peteb @userscripts.org
 *
 * rewritten by pabst 12/24/08+
 *
 */

var url = window.location.href;
var currentId = url.substring(url.indexOf('_id=')+4, url.length);

var timeout = 0;

window.setTimeout( function() {
   if (window.location.href.toString().indexOf("skill_points.pl") != -1) {
       GM_xmlhttpRequest({
           method: 'GET',
           url: 'http://goallineblitz.com/game/player.pl?player_id=' + currentId,
           headers: {
               'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
               'Accept': 'application/atom+xml,application/xml,text/xml'
           },
           onload: function(page) {
               getBoostedValues(page.responseText);
           }
       });
   }
   else {
       GM_xmlhttpRequest({
           method: 'GET',
           url: 'http://goallineblitz.com/game/skill_points.pl?player_id=' + currentId,
           headers: {
               'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
               'Accept': 'application/atom+xml,application/xml,text/xml'
           },
           onload: function(page) {
               getBaseValues(page.responseText);
           }
       });
   }
},timeout); 

function getBoostedValues(responseText){
    var split = responseText.split('class="stat_value_tall');
    var odd = [];
    var even = [];
    for (var i=1; i<15; i++) {
        var start = split[i].indexOf(">")+1;
        var end = split[i].indexOf("<");
        if (i%2 == 1) {
            odd[odd.length] = split[i].slice(start,end);
        }
        else {
            even[even.length] = split[i].slice(start,end);
        }
    }

    var stats = odd.concat(even);
    skillPageInsert(stats);
}
function getBaseValues(responseText) {
    var split = responseText.split('class="attribute_value');
    var stats = [];
    for (var i=1; i<15; i++) {
        var start = split[i].indexOf(">")+1;
        var end = split[i].indexOf("<");
        stats.push(split[i].slice(start,end));
    }
    trainingPageInsert(stats);
}

function skillPageInsert(stats) {
    var att = document.getElementsByClassName("attribute_value");
    for (var i=0; i<att.length; i++) {
        if (att[i].innerHTML != stats[i]) {
            var n = att[i].parentNode.getElementsByClassName("attribute_name")[0];
            n.innerHTML = n.innerHTML + "+" + Math.round((parseFloat(stats[i]) - parseFloat(att[i].innerHTML)));
            n.setAttribute("style","color: #0000FF;");
        }
    }
}

function trainingPageInsert(stats) {
    var n = document.getElementsByClassName("stat_head_tall");
    for (var i=0; i<n.length; i++) {
        var idx = (i*2)%(n.length);
        if (i > 6) idx++;
        var att = n[idx].parentNode.getElementsByClassName("stat_value_tall")[0];
        if (att == null) att = n[idx].parentNode.getElementsByClassName("stat_value_tall_boosted")[0];
        if (att.innerHTML != stats[i]) {
            var boost = parseFloat(att.innerHTML);
            var base = parseFloat(stats[i]);
            n[idx].innerHTML = n[idx].innerHTML + " +" + (boost - base).toFixed(0);
            n[idx].setAttribute("style","color: #0000FF;");
	    att.setAttribute("class","stat_value_tall");
            att.innerHTML = base;
        }
    }

}
