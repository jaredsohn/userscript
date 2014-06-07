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
	
	function Comma(number) {
		number = '' + number;
		if (number.length > 3) {
			var mod = number.length % 3;
			var output = (mod > 0 ? (number.substring(0,mod)) : '');
			for (i=0 ; i < Math.floor(number.length / 3); i++) {
				if ((mod == 0) && (i == 0))
					output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
				else
					output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
			}
			return (output);
		}
		else return number;
	}
		
	// How to add stats
	function addStat(name, value){
		if (value!='')
		document.getElementById('deviantstats').innerHTML+='<li class="f"><strong>'+value+' <\/strong> '+name+'<\/li>';
		else
		document.getElementById('deviantstats').innerHTML+='<li class="f">'+name+'<\/li>';
	}
	
	// Make the element (w00t no interference with other scripts!!) 
	var nodes;
	var node;
	nodes = document.evaluate("//ul[@class='f']/li[@class='f']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; node=nodes.snapshotItem(i); i++)
	{
		if (node.innerHTML.indexOf('Pageviews')>-1){
			node.innerHTML += '</li><div id="faderingthing" style="position:absolute;bottom:0;left:0; right:0;height:48px;z-index:102;background:url(http://s.deviantart.com/styles/minimal/minish/deviant-fade.png) repeat-x bottom;"></div><span id="deviantstats"><div id="fading"></div></span><li style="display:none !important;">';
		}		
	}	
	
	nodes = document.evaluate("//div[@id='deviant-stats']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=0; node=nodes.snapshotItem(i); i++)
	{
		if (node.innerHTML.indexOf('Pageviews')>-1){
			node.setAttribute('style', "position:relative;overflow:hidden;padding:6px;cursor:default;height:139px;z-index:1;margin:-6px -6px -121px -6px;");
			node.setAttribute('onmouseover', 'this.style.height="auto"; this.style.overflow="show"; this.style.margin="-6px -6px -181px -6px"; document.getElementById(\'faderingthing\').style.display="none";this.style.border="1px solid #9AA59A"; this.style.background="#CAD5CA";');
			node.setAttribute('onmouseout', 'this.style.height="139px"; this.style.overflow="hidden"; this.style.margin="-6px -6px -121px -6px"; document.getElementById(\'faderingthing\').style.display="block";this.style.border="1px solid transparent"; this.style.background="transparent";');
		}		
	}	
	// Get/Add Stats!
	if (_GF.friends){
		if (_GF.friends!=1){
			addStat('Friends', Comma(_GF.friends));
		} else {
			addStat('Friend', Comma(_GF.friends));
		}
	}
	if (_GF.friendswatching){
		if (_GF.friendswatching!=1){
			addStat('Watchers', Comma(_GF.friendswatching));
		} else {
			addStat('Watcher', Comma(_GF.friendswatching));
		}
	}
	if (_GF.comments){
		if (_GF.comments!=1){
			addStat('Comments Given', Comma(_GF.comments));
		} else {
			addStat('Comment Given', Comma(_GF.comments));
		}
	}
	if (_GF.comments_received){
		if (_GF.comments_received!=1){
			addStat('Comments Received', Comma(_GF.comments_received));
		} else {
			addStat('Comment Received', Comma(_GF.comments_received));
		}
	}
	if (_GF.favourites){
		if (_GF.favourites!=1){
			addStat('Favourites', Comma(_GF.favourites));
		} else {
			addStat('Favourite', Comma(_GF.favourites));
		}
	}
	if (_GF.shouts){
		if (_GF.shouts!=1){
			addStat('Shouts', Comma(_GF.shouts));
		} else {
			addStat('Shout', Comma(_GF.shouts));
		}
	}
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
	addStat('<u><a class="a" href="http://www.deviantart.com/deviation/'+mostv+'/" title="'+mostvt+'">Most Viewed</a></u> (<b><acronym title="Views">'+Comma(mostvn)+'</acronym></b>)', '');
	addStat('<u><a class="a" href="http://www.deviantart.com/deviation/'+mostfv+'/" title="'+mostfvt+'">Most Downloaded</a></u> (<b><acronym title="Downloads">'+Comma(mostfvn)+'</acronym></b>)', '');
	addStat('<u><a class="a" href="http://www.deviantart.com/deviation/'+mostf+'/" title="'+mostft+'">Most Favourited</a></u> (<b><acronym title="Favourites">'+Comma(mostfn)+'</acronym></b>)', '');
	addStat('<u><a class="a" href="http://www.deviantart.com/deviation/'+mostc+'/" title="'+mostct+'">Most Commented</a></u> (<b><acronym title="Comments">'+Comma(mostcn)+'</acronym></b>)', '');
	}
	

	// Events

	
    }
});
// w00t! We're done!