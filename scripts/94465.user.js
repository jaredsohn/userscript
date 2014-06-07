// ==UserScript==
// @name          PornBB Thread Search At Top
// @namespace     http://www.userscripts.org
// @description   Highlights keywords
// @include       http://www.pornbb.org/*
// ==/UserScript==

url = window.location;
match = /t[0-9]+.html/.exec(url);

if (match != null) {
    id = match[0].replace(/[^0-9]/g, '');
    var container = document.getElementsByClassName('bodyline')[0];
    var new_element = document.createElement('table');
    new_element.setAttribute('width', '100%');
    new_element.setAttribute('cellspacing', '0');
    new_element.setAttribute('cellpadding', '0');
    new_element.setAttribute('border', '0');
    new_element.innerHTML = "<tr><td><form action='" + url + "' method='post'><span class='gensmall'>Display posts from previous: <select name='postdays'><option selected='selected' value='0'>All Posts</option><option value='1'>1 Day</option><option value='7'>7 Days</option><option value='14'>2 Weeks</option><option value='30'>1 Month</option><option value='90'>3 Months</option><option value='180'>6 Months</option><option value='364'>1 Year</option></select>&nbsp;<select name='postorder'><option selected='selected' value='asc'>Oldest First</option><option value='desc'>Newest First</option></select>&nbsp;<input type='submit' name='submit' class='liteoption' value='Go'></span></form></td><td><form action='http://www.pornbb.org/search.php?search_id=searchtopic' method='post' name='searchtopic'><input type='text' size='25' name='topicword' class='search_f'><input type='submit' value='Search Topic' class='search_b'>&nbsp;<input type='hidden' value='" + id + "' name='topic'></form></td></tr>";
    container.insertBefore(new_element, container.firstChild);
}