// ==UserScript==
// @name           SU Random Groups sidebar
// @namespace      thlayli.detrave.net
// @description    Replaces the "Suggested groups" sidebar section with a random list
// @include        http://*.stumbleupon.com/groups/
// @version        1.4
// ==/UserScript==

var h3s = document.getElementsByTagName('h3');

for(i=0;i<h3s.length;i++){
	if(h3s[i].innerHTML == 'Suggested groups')
		var side_div = h3s[i].parentNode;
}

side_div.innerHTML = '<h3>Random groups</h3>';
side_div.style.height = '369px';
getRandGroup();

function getRandGroup(){
	side_div.innerHTML = '<h3>Random groups</h3>';
	GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://thlayli.detrave.net/su-randomgroup-sidebar_backend.php',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
    },
    onload: function(responseDetails) {
			var rand_groups = responseDetails.responseText.split('|');
			//side_div.innerHTML += "<!--" + responseDetails.responseText + "-->";
			for(i=0;i<rand_groups.length;i++){
				group_part = rand_groups[i].split(',');
				side_div.innerHTML += '<dl><dd class="thumbnail"><a href="http://' + group_part[0] + '.group.stumbleupon.com/" title="' + group_part[4] + '"><img alt="" src="http://www.stumbleupon.com/groupsuperminipics/' + group_part[2] + '.jpg"/></a></dd><dt><a href="http://' + group_part[0] + '.group.stumbleupon.com/" title="' + group_part[4] + '">' + group_part[1] + '</a></dt><dd class="textSm textUncolor">' + group_part[3] + ' members</dd></dl>';
			}
			side_div.innerHTML += '<div class="clear pdgTop"><!-- --></div><ul class="cmds"><li class="textlink"><a class="textlink" href="javascript:void(0);" id="refresh_groups">Show me more</a></li></ul>';
			document.getElementById('refresh_groups').wrappedJSObject.onclick = getRandGroup;
    }
	});
}

