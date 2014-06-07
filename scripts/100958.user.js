// ==UserScript==
// @name           HoN MMR Forum
// @namespace      Heroes of Newerth
// @include        *.heroesofnewerth.com/*
// @description    Display a MMR and Stats button under a username on the Heroes of Newerth forum. Pressing the MMR button will load and display the user MMR and the stat button will open a new window to the stats of the user.
// ==/UserScript==


function getStats(evt)
{
	var aid = evt.currentTarget.parentNode.getAttribute('name');
	
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://xml.heroesofnewerth.com/xml_requester.php?f=player_stats&opt=aid&aid[]=" + aid,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/atom+xml,application/xml,text/xml"
        },
        onload: function(response) {
            if (!response.responseXML) {
                statsXML = new DOMParser().parseFromString(response.responseText, "application/xml");
                var aid = statsXML.getElementsByTagName('player_stats')[0].getAttribute('aid');
                var stats = statsXML.getElementsByTagName('stat');
                var i = 0;
                while (i < stats.length && stats[i].getAttribute('name') != 'rnk_amm_team_rating')
                {
                    ++i;
                }
                if (stats[i].getAttribute('name') == 'rnk_amm_team_rating')
                {
                    containers = document.getElementsByName(aid);
                    for (var j = 0; j < containers.length; ++j)
                    {
                        containers[j].innerHTML = 'MMR: ' + stats[i].childNodes[0].nodeValue;
                    }
                }
            }
        }
    });
}

function init()
{
    var users = document.getElementsByClassName('bigusername');
    if (users.length > 0)
    {
        for (var i = 0; i < users.length; ++i)
        {
            var href = users[i].href;
            var aid = href.substring(href.lastIndexOf('u=') + 2);
            var container = document.createElement('div');
            container.setAttribute('class', 'smallfont');
            var mmr = document.createElement('div');
            mmr.setAttribute('name', aid);
            
            var linkMMR = document.createElement('a');
            linkMMR.setAttribute('href', 'javascript:void(0);');
            
            mmr.appendChild(linkMMR);
            container.appendChild(mmr);
            
            
            linkMMR.innerHTML = 'MMR';
            
            linkMMR.addEventListener("click", getStats, true);
            
            
            var username = users[i].children[0].textContent.trim();
            if (username.indexOf(']') != -1)
            {
                username = username.substring(username.indexOf(']') + 1);
            }
            
            var temp = document.createElement('div');
            var linkStats = document.createElement('a');
            linkStats.setAttribute('href', 'http://hon.rychlis.cz/' + username + '/');
            linkStats.setAttribute('target', '_blank');
            linkStats.innerHTML = 'Stats';
            
            temp.appendChild(linkStats);
            container.appendChild(temp);            
            
            users[i].parentNode.parentNode.appendChild(container);
        }
    }
}

init();