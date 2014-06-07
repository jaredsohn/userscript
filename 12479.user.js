// ==UserScript==
// @name           deviantSTATS
// @namespace      http://solitude12.deviantart.com/
// @description    Adds deviant stats to the userpage of any deviant!
// @include        http://*.deviantart.com/
// @include        http://*.deviantart.com/?*
// ==/UserScript==

/* 
(c) Solitude12 - http://solitude12.deviantart.com/
or in other words...
RAWR MY CODE, NO TOUCHY!!!!!!!!!!!!
*/

// Get the deviants name
const deviantNAME = window.location.host.substring(0, window.location.host.indexOf(".")).toLowerCase();

// Start the Stats
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://' + deviantNAME + '.deviantart.com/stats/gallery/script.js.php/gallerystats.js',
    onload: function(responseDetails) {
    	var data = responseDetails.responseText;
	eval(data);
	
	// How to add stats
	function addStat(name, value){
		if (value!='')
		document.getElementById('deviantstats').innerHTML+='<li class="f"><strong>'+value+' <\/strong> '+name+'<\/li>';
		else
		document.getElementById('deviantstats').innerHTML+='<li class="f">'+name+'<\/li>';
	}
	// Make the element
	document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(/<li class="f"><strong>(.*) <\/strong> Pageviews<\/li>/, '<li class="f"><strong>$1 </strong> Pageviews</li><li class="f"><b id="deviantstatsmore" title="More..." style="cursor:pointer;"><sup>&#x25BC;</sup></b></li><span id="deviantstats" style="display:none !important;"><b title="deviantSTATS v2.0 by Solitude12" style="cursor:default;">&#x2014;</b></span>');

	// Get/Add Stats!
	if (_GF.friends)
	addStat('Friends', _GF.friends);
	if (_GF.friendswatching)
	addStat('Watchers',  _GF.friendswatching);
	if (_GF.comments)
	addStat('Comments Given',  _GF.comments);
	if (_GF.comments_received)
	addStat('Comments Received',  _GF.comments_received);
	if (_GF.favourites)
	addStat('Favourites',  _GF.favourites);
	if (_GF.shouts)
	addStat('Shouts',  _GF.shouts);
	var mostvn=0;var mostv;var mostvt;
	var mostfn=0;var mostf;var mostft;
	var mostcn=0;var mostc;var mostct;
	var mostfvn=0;var mostfv;var mostfvt;
	var mostscn=0;var mostsc;var mostsct;
	for (var i in _GF.deviations){
		if (_GF.deviations[i].views>=mostvn){
			mostvn = _GF.deviations[i].views;
			mostv = _GF.deviations[i].id;
			mostvt = _GF.deviations[i].title;
		}
		if (_GF.deviations[i].favourites>=mostfn){
			mostfn = _GF.deviations[i].favourites;
			mostf = _GF.deviations[i].id;
			mostft = _GF.deviations[i].title;
		}
		if (_GF.deviations[i].comments>=mostcn){
			mostcn = _GF.deviations[i].comments;
			mostc = _GF.deviations[i].id;
			mostct = _GF.deviations[i].title;
		}
		if (_GF.deviations[i].fullviews>=mostfvn){
			mostfvn = _GF.deviations[i].fullviews;
			mostfv = _GF.deviations[i].id;
			mostfvt = _GF.deviations[i].title;
		}
	}
	if (_GF.deviations.length!=0){
	addStat('<u><a href="http://www.deviantart.com/deviation/'+mostv+'/" title="'+mostvt+'">Most Viewed</a></u> (<b><acronym title="Views">'+mostvn+'</acronym></b>)', '');
	addStat('<u><a href="http://www.deviantart.com/deviation/'+mostfv+'/" title="'+mostfvt+'">Most Fullviewed</a></u> (<b><acronym title="Views">'+mostfvn+'</acronym></b>)', '');
	addStat('<u><a href="http://www.deviantart.com/deviation/'+mostf+'/" title="'+mostft+'">Most Favourited</a></u> (<b><acronym title="Views">'+mostfn+'</acronym></b>)', '');
	addStat('<u><a href="http://www.deviantart.com/deviation/'+mostc+'/" title="'+mostct+'">Most Commented</a></u> (<b><acronym title="Views">'+mostcn+'</acronym></b>)', '');
	}
	
	// Finish it off
	document.getElementById('deviantstats').innerHTML+='<li class="f"><b id="deviantstatsless" title="...Less" style="cursor:pointer;"><sup>&#x25B2;</sup></b></li>';
	
	// Events
	document.getElementById('deviantstatsmore').addEventListener('click', function(e){
		document.getElementById('deviantstats').setAttribute('style', 'display:block;');
		document.getElementById('deviantstatsmore').setAttribute('style', 'display:none;');		
	}, false);

	document.getElementById('deviantstatsless').addEventListener('click', function(e){
		document.getElementById('deviantstatsmore').setAttribute('style', 'display:block; cursor:pointer;');
		document.getElementById('deviantstats').setAttribute('style', 'display:none;');
	}, false);	
	
    }
});
// w00t! We're done!