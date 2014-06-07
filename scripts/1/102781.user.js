// ==UserScript==
// @name          grooveShark+rateyourmusic
// @namespace     tukankaan
// @description	  Adds grooveShark links to rateyourmusic
// @version       0.1
// @include       http://rateyourmusic.com/*
// @include       http://www.rateyourmusic.com/*
// ==/UserScript==

// This script borrows heavily from the spotify.fm script
// Many thanks to the original author of that script that adds spotify links to Last.FM  --> script no = 75127
// I suppose http://userscripts.org/scripts/75127
// This script is also a hacked version of the modified script "Spotify+rateyourmusic" .
// And I "only" hacked that script   http://userscripts.org/scripts/78614


(function() {

	GM_addStyle('.groovesharkLink img { border:none !important; margin-left:3px; width:9px; height:9px; background:transparent !important; vertical-align:baseline; }');
	GM_addStyle('ul.artistsSquare .groovesharkLink img { margin:0 !important; width:9px; height:9px; }');
	GM_addStyle('.mediumChartWithImages li .groovesharkLink { margin-top:-12px; height:auto; }');

	var cleanurl = function(url) {
		var url1 = url.replace(/_and_/g, '_');
		var str = url1.replace(/f[0-9]+/g, '');
		return decodeURIComponent(str.replace(/\_/g, '%20'));
	};

	// Creates a link element
	var createLink = function(link) {
	    var a = document.createElement('a');
	    a.href = link;
	    a.title = 'Search on Grooveshark'
    	a.className = 'groovesharkLink';
	    a.setAttribute('groovesharkLink', true);
	    var img = document.createElement('img');
	    img.src = 'data:text/plain;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADmqDhI3IMQ59p9Cv/LRwj/2n0K/9p9Cv/JRQj/zVAI/9p9Cv/afQr/zVAI/81QCP/NUAj/0FsJ/8tNDOfeii1I1FgO5OKNL//uvFD/7LVL/+68UP/mnzz/7rxQ/+afPP/opUD/7rxQ/+ilQP/opUD/5p88/+afPP/pqjv/0lQO5ON9Cv/rpUH/8b9Y//G/WP/xv1j/8b9Y/+ulQf/xv1j/66VB/+2uSf/rpUH/7KpG//G/WP/xv1j/8b9Y/+WHC//mfQr/9cRg//O9Wv/75pn/++iD//fQa//1xGD/8KtI//ndi//76IP/++aZ//O9Wv/ytlP/8rlV//rkkf/531D/yNmC//fBYf/W04j/fH5b/1NWQf+kpnf/+tp9//vjnP+Vl2j/U1ZB/3x+W//W04j/+dF5/9/cov9wclL/Cj6m/wY/z//a4Kr/LlBw/xQbLP8TFCH/EBIg/4OBYf+EgmL/EBIg/xMUIf8SEyH/ICMp/9/cq/8uabf/KIfm/wQr0/8GWuD/Wazi/0uq7/9AkdD/GSA7/xQUK/8nKDb/Jic1/xQUK/8UFCv/FBQr/yRQf/9Mmt7/MZfr/zme7P8EPtn/BmHk/0uu8f9Qs/L/Sazx/zdyp/8SEjX/ERE0/xERNP8SEjX/EhI1/xs1Yf85oev/MJnt/zSe7v80nu7/BE7g/wVy6v9UtvT/bsv3/1q59P9Jp+X/ERE//xERQP8REUD/ERFA/xUhU/80l9//Pqnx/zel8f83pvH/PKjy/wVq6P8GkO//etD5/5Dn/P+H2vr/cMv3/xETT/8PD0z/EBBN/xUiYv89n93/PLD0/0Ky9f88rvP/VcD3/1W69v8Ecez/BZ/z/3PN+f+W3Pv/YMX4/2jJ+f8RFF3/EBBb/x09i/9Fsuf/Rb/4/0K79/9Iuvj/UsH4/3HS+v9Pu/f/A3rv/wSj9f950fr/j9n7/4jW+/920vr/HjOI/0GUyv9Zz/n/Us/7/1jO+v9a0Pv/bdT7/4nj/P+N6f3/Zs/6/wOb9f8Dpvn/fNT8/4PW/P+N2v3/oOH9/5Pg/f9s3fz/Zt79/2Xe/f9l3Pz/dtv9/37a/P+F3/3/keX9/2PN/P8Cj/f/Aq75/5vf/f+P3fz/l+D9/6Xl/f+w6v7/ker+/2rp/v9q6f7/ier+/3/k/v993v3/etv9/4Pd/f901/3/Apb5/yW6+Oar5v7//////////////////////////////////////////////////P///+D////k////g9/+/wqc8+bI5vI2Tr/1xynB//8zyf//WdX//0vf//9L6f//ifH//4Hx//9H6f//M93//wXN//8Avf//AK///xel6sSkzuIvAAAAAAAAAAAAACofAAAAAAAAW0gAAHQgAABobgAAc2gAAGRlAAAtYwAAcHUAAHIuAABjYQAAIFsAAG5kAAAEAA%3D%3D';
	    a.appendChild(img);

	    return a;
	}

	// Add links for the content under this element.
	var addLinks = function(topElem) {
	    // Check if we already added links for this content
	    if (topElem.hasAttribute('groovesharkLinksAdded'))
	        return;
	    topElem.setAttribute('groovesharkLinksAdded', true);

	    // This is a rateyourmusic url that we want to rewrite
	    var re = /^http:\/\/(.*\.|)rateyourmusic\.com\/(artist|release\/[a-zA-Z]*)\/([^\?#]*)$/i;

	    var elems = topElem.getElementsByTagName('a');
	    for (var i = 0; i < elems.length; i++) {
	        var elem = elems[i];

	        // Check if the link matches
	        if (m = re.exec(elem.href)) {
	            var found = false;

	            // Go though parts and check if it is an url that we want to change
	            parts = m[3].split('/');
	            for (var j = 0; j < parts.length; j++) {
	                if (parts[j][0] == '_') {
	                    found = true;
	                    break;
	                }
	            }

	            if (found)
	                continue;

		        // Create the grooveShark url
	            q = [];
				
				// modify the 1 line below if you dont want to search the name of the artist (you can use //)
	            if(parts[0] && parts[0] != 'Various_Artists_f2') {
					q.push('%22'+ cleanurl(parts[0]) +'%22');
				}
	            
	            if (parts[1] ) {
	                q.push(cleanurl(parts[1]));
	            }
	            if(q.length == 0) {
	            	continue;
	            }
	            var a = createLink('http://grooveshark.com/#/search?q='+ q.join('%20'));

	            // Insert the link after the found link
	            // Check if it already have a grooveShark url
	            if (!elem.nextSibling || !elem.nextSibling.hasAttribute || !elem.nextSibling.hasAttribute('groovesharkLink')) {
	                elem.parentNode.insertBefore(a, elem.nextSibling);
	            }
	        }
	    }
	}

	// Add listener so if the content changes we add links to the new content
	document.addEventListener('DOMNodeInserted', function(ev){ addLinks(ev.originalTarget); }, true);

	// Find links and add grooveShark links to them
	addLinks(document.body);
	
})();