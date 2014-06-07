// Hide 'em All user script
// version 1.0
// 17/11/2011
// Copyright (c) 2011, Louis Brunner
//
// ==UserScript==
// @name           Hide 'em All
// @version        1.0
// @namespace      http://www.hyrrmadr.net/
// @description    Add a button to hide all activities
// @include        http*://*epitech.*/intra/index.php?section=etudiant&page=vue_hebdo*
// ==/UserScript==

function   get_GETvar(request, name)
{
    var vars;
    var parts;
    
    vars = request.split('&');
    for (var i = 0; i < vars.length; i++)
    {
        parts = vars[i].split('=');
        if (parts[0] == name) {
            return (parts[1]);
        }
    }
    return ("");
}

var activities = document.getElementById("intra_display_zone").getElementsByTagName("td");
var semaine = get_GETvar(document.URL, "semaine");

var links;
var node_a;
var node_img;
var id;

for (var i = 0; i < activities.length; i++)
{
    if (activities[i].hasAttribute("rowspan"))
    {
        links = activities[i].getElementsByTagName("a");
        if (links.length > 0)
        {
            id = get_GETvar(links[links.length - 1].getAttribute("href"), "id");
            node_a = document.createElement('a');
            node_a.setAttribute('href', 'index.php?section=etudiant&page=vue_hebdo&do=hide&activite_instance_id=' + id + '&semaine=' + semaine + '&filtre_prof_resp=&filtre_perso=1');
            node_img = document.createElement('img')
            node_img.setAttribute('alt', 'Hide');
            node_img.setAttribute('src', 'http://cdn1.iconfinder.com/data/icons/softwaredemo/PNG/16x16/Close_Box_Red.png');
            node_a.appendChild(node_img);
            activities[i].appendChild(node_a);
        }
    }
}
