// ==UserScript==
// @name          Twitter Web Groups
// @namespace     http://userscripts.org/users/88798
// @description	  Bring the functionality of groups into your twitter web experience
// @include       http://twitter.com/*
// ==/UserScript==

// version id
var version_id = "groups_88798_01";

// get existing bits and spieces
var trends = document.getElementById('trends');

var groups = document.createElement('div')

// unique id incase twitter implement similar idea
groups.id = version_id;

var groups_header = document.createElement('h2');
groups_header.id = 'groups_menu';
groups_header.className = 'sidebar-title';

var groups_header_content = document.createElement('span');
groups_header_content.innerHTML = 'Groups';

var groups_list = document.createElement('ul');
groups_list.className = "sidebar-menu";

// loop through groups
group_names = GM_getValue(groups.id);

group_array = new Array();
group_array = group_names.split(',')
for (g in group_array) {
if ( group_array[g].length > 0 ) {
    var search_text = "from:" + GM_getValue(group_array[g]).replace(/,/g, " OR from:");
    var linky = "/timeline/search?q=" + search_text + "&source=sidebar";
        
    var temp = document.createElement('li');
    temp.className = 'link-title';
    temp.innerHTML = '<a href="' + linky + '">' + group_array[g] + '</a>';

    groups_list.appendChild(temp);
}
}

// create group link  
var create_link = document.createElement('li');
create_link.className = "link-title";
create_link.innerHTML = "<a rel='history' href='#'>Create New Group</a>";
create_link.addEventListener('click',function() {
var group_name = prompt("Please enter a name for your group");
var group_members = prompt("Please enter your group members, sperated by a comma (NOTE: no comma on the end, no space between username - this is an alpha after all)","");


if ( typeof(GM_getValue(version_id)) == 'undefined') {
    old_groups = ""
}
else {
    old_groups = GM_getValue(version_id);
}

GM_setValue(group_name, group_members);
GM_setValue(version_id, group_name + "," + old_groups);
}, false);

groups_list.appendChild(create_link);


// piece it all together
groups_header.appendChild(groups_header_content);
groups.appendChild(groups_header);
groups.appendChild(groups_list);
groups.appendChild(document.createElement('hr'));

trends.parentNode.insertBefore(groups, trends);
