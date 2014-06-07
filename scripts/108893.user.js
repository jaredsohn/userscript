// ==UserScript==
// @name           WWOOF Japan links
// @namespace      http://multani.info/projects/greasemonkey
// @description    Transform WWOOF Japan hosts list into real HTML links
// @include        http://www.wwoofjapan.com/*
// ==/UserScript==


function transformHostsLinks() {

    var table = document.getElementById('cbUserTable');
    var tbody = table.getElementsByTagName('tbody')[0];
    var lines = tbody.getElementsByTagName('tr');

    for(var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var host_id_tag = line.getElementsByClassName('cbUserListFC_cb_hostcode')[0];
        var seeking_wwoofer_tag= line.getElementsByClassName('cbUserListFC_cb_seekingwwoofers')[0];

        var host_id = host_id_tag.textContent;

        var link = document.createElement('a');
        link.setAttribute("href",
                "http://www.wwoofjapan.com/main/index.php?option=com_comprofiler&task=userProfile&user="
                + host_id + "&Itemid=36&lang=en");

        reParent(host_id_tag, link);
        //reParent(seeking_wwoofer_tag, link);

        var location_tags = line.getElementsByClassName('cbUserListFC_cb_hostshichousoneng');
        if (location_tags.length == 1) {
            var location_tag = location_tags[0];
            var map_link = document.createElement('a');
            map_link.setAttribute("href",
                    "http://maps.google.com/maps?q=" + encodeURIComponent(location_tag.textContent)
                    );
            reParent(location_tag, map_link);
        }
    }
}


function reParent(node, newParent) {
    var parent = node.parentNode;
    parent.removeChild(node);
    newParent.appendChild(node);
    parent.appendChild(newParent);
}


window.addEventListener('load', transformHostsLinks, false);
