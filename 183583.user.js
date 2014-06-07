// ==UserScript==
// @name               Google Search Past 6 Months Custom Search Filter
// @namespace          http://techexplored.com
// @description        Adds a custom search filter to limit the search results to the past 6 months.
// @contributor		   techXplored
// @version            2013.11.19
//
// @icon		  	   http://www.google.com/favicon.ico
// @include            /(http|https)?://.*\.google\.[^\/]+?/(#.*|search\?.*)?$/
// @grant              none
// @run-at 		       document-end
// ==/UserScript==

// Version History
// -------------------------------
// 2013.11.19
// Issue: custom search option was removed when changing search preferences or changing the search results page 
// added a continuous check so the custom search would be re-added after changing search preferences or changing the search results page
// -------------------------------
// 2013.06.26
// created basic script
// -------------------------------

var timer, log, start;

function addElement() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yy = today.getFullYear();
    
    var pdd = dd;
    var pmm = (mm-6)%12;
    var pyy = yy;
    if(dd-6 < 1)
        pyy--;
    
    
    var search = document.getElementById('qdr_m').firstChild.getAttribute('href');
    var beginURL = search.match(/.*(?=&tbs)/);
    
    var url = beginURL + "&tbs=cdr%3A1%2Ccd_min%3A" + pmm + "%2F" + pdd + "%2F" + pyy + "%2Ccd_max%3A" + mm + "%2F" + dd + "%2F" + yy + "&tbm=";
    
    var li = document.createElement('li');
    li.setAttribute('class', 'hdtbItm');
    
    var a = document.createElement('a');
    a.setAttribute('class', 'q qs');
    a.setAttribute('href', url);
    a.innerHTML = 'Past 6 Months';
    
    li.appendChild(a);
    
    var pos = document.getElementById('qdr_y').parentNode;
	pos.insertBefore(li, pos.childNodes[5]);
}

log = document.getElementById("log");
function repeatXI(callback, interval, repeats, immediate) {
    var timer, trigger;
    trigger = function() {
        callback();
        --repeats || clearInterval(timer);
    };

    interval = interval <= 0 ? 1000 : interval; // default: 1000ms
    repeats = parseInt(repeats, 10) || 0; // default: repeat forever
    timer = setInterval(trigger, interval);

    if ( !! immediate) { // Coerce boolean
        trigger();
    }

    return timer;
}

function cb() {
    var nav = document.getElementById('top_nav');
    var search = nav.childNodes[0].childNodes[1].getElementsByTagName('ul');
    var length = search[0].children.length;
    
    if(length > 7) {
        //console.log('element already added');
    	return true;
    }
    //console.log('element not yet added');
    addElement();
}

if( timer ) { clearInterval(timer); }
start = (new Date).getTime();
var args = [ 4000, 0, true ];
timer = repeatXI.apply(null, [cb].concat(args));
