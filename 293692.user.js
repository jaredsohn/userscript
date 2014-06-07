// ==UserScript==
// @name       Mantis Own Look
// @version    1.2
// @include     http://*mantis*/view_all_bug_page.php
// @include     https:/*mantis*/view_all_bug_page.php
// @include     http://*mantis*/view.php?id=*
// @include     https:/*mantis*/view.php?id=*
// @description  Modify mantis table
// @copyright  2014+, Łukasz 'PerSOft' Malicki
// ==/UserScript==


// Header
try
{
    if (document.body.children.length > 0)
        document.body.children[0].remove();
    if (document.body.children.length > 2)
        document.body.children[2].remove();
    if (document.body.children.length > 6)
        document.body.children[6].remove();
    
    // Move filters
    var tmp1 = document.getElementById('filter_open');
    var tmp2 = document.getElementById('filter_closed');
    
    if (tmp1 != null)
        tmp1.remove();
    if (tmp2 != null)
        tmp2.remove();
    var hr = document.getElementsByTagName('hr')[0];
    hr.parentNode.insertBefore(tmp1, hr);
    hr.parentNode.insertBefore(tmp2, hr);
    if (hr != null)
        hr.remove();
}
catch(err)
{
}
if (document.getElementsByName("bug_id").length > 0)
	document.getElementsByName("bug_id")[0].focus();