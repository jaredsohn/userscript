// ==UserScript==
// @name           Razzas FISO script
// @namespace      FISO
// @description    Show FPL rankings for members who show the link to their FPL squad
// @include        http://www.fiso.co.uk/forum/*
// ==/UserScript==

    function extract_from_response(resp) {
        var extract;
        try {
            var captures = resp.responseText.match( /(Overall\: ([0-9,]+) \(([0-9,]+))/ , 'i')
            extract = captures[1] + ')';
            var points = captures[2];
            var rank = captures[3];

            var regexp_year_histories = /<tr class="ism_row_[01]">\s*<td>[0-9/]*<\/td>\s*<td><\/td>\s*<td><\/td>\s*<td><\/td>\s*<td><\/td>\s*<td>[0-9]*<\/td>\s*<td><\/td>\s*<td>[0-9,]*<\/td>\s*<td><\/td>\s*<\/tr>/gi ;
            var histories = resp.responseText.match( regexp_year_histories );
            histories.push("<tr class='ism_row_0'><td>2010/11</td><td></td><td></td><td></td><td></td><td>" + points + "</td><td></td><td>" + rank + "</td><td></td></tr>");
            var history_table = "<table>" + histories.reverse().join("") + "</table>"

            var rank = captures[3].replace(',','')
            var style = '';
            if (rank < 5000)
                style = 'text-decoration: blink; font-weight: bold; color: green';
            else if (rank < 20000)
                style = 'font-weight: bold; color: green';
            else if (rank < 100000)
                style = 'color: green';
            else if (rank < 250000)
                style = 'color: brown';
            else if (rank < 1000000)
                style = 'color: red';
            else 
                style = 'color: red';

            extract = "<div style='font-size: 8pt; " + style + "'>" + "" + "<div style='font-size: 7pt'>" + history_table + "</div></div>";

	} catch (err) {
            GM_log(err);
            extract = 'Could not find rank';
            return null;
	}
        return extract;
    }

    var working = {};

    var cache = {};

    var services = {
	'fantasy.premierleague.com': true
    };

    function get_team_rank(anchor) {
	var url = anchor.href;
        if (url)
		GM_xmlhttpRequest({
		    method: "GET",
		    url: url,
		    onload: function(resp) {
                        team_rank = extract_from_response(resp);
			if (team_rank) {
			    cache[anchor.href] = team_rank;
                            working[anchor.href] = false;
			}
		    },
		    onerror: function(resp) {
			GM_log('Oops! Access error to ' + anchor.href);
		    }
		});
    }

    function update_anchor(anchor) {
        if (cache[anchor.href]) {
            var nodeToModify = anchor.parentNode.parentNode.parentNode.parentNode.firstChild;
            if (nodeToModify.innerHTML.indexOf("Author") > 0)
            {
                // First post is layed out differently
                nodeToModify = anchor.parentNode.parentNode.parentNode.parentNode.childNodes[2];
            }
            try {
                if (nodeToModify.innerHTML.indexOf('Overall') == -1)
                {
                    // alert(nodeToModify.innerHTML);
                    nodeToModify.innerHTML = nodeToModify.innerHTML.replace(/<b.*?postauthor.*?>(.*?)<\/b>/i ,"<b style='color: rgb(0, 0, 102);' class='postauthor'>$1" + cache[anchor.href] + "</b>");
                }
            } catch (err) {
                GM_log("error with " + cache[anchor.href] + nodeToModify);
            }
	} else {
	    if (working[anchor.href])
		return;
	    else
		working[anchor.href] = true;
            get_team_rank(anchor);
        }

    }

    function main() {
	var counter = 0;
	var anchors = document.getElementsByTagName('a');
	var anchors_length = anchors.length;
	for (var i=0; i<anchors_length; i++) {
	    if (anchors[i].pathname.length === 1 && anchors[i].search.length < 2)
		continue;
	    else if (anchors[i].hostname in services) {
		anchors[i].href = anchors[i].href.replace(/event/,"entry");
                if (anchors[i].href.match(/eventhist|entryhist/)) {
                    update_anchor(anchors[i]);
                }
		counter++;
	    }
	}

	if (counter === 0) {
	    setTimeout(main, 60000);
	    working = {};
	} else {
	    setTimeout(main, 10000 / counter);
	}
    }

    main();