// ==UserScript==
// @name           Gaybook
// @description    Changes the likes on Facebook to gay (inspired by "Facebook Me Gustaizer")
// @author         dwile (original by AfinitE)
// @include        *.facebook*
// @version        1.11
// ==/UserScript==

//Replaces Like links
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('<span class=\"default_message\">Like<\/span>', 'g'), '<span class=\"default_message\">Gay<\/span>');
//Replaces Like link title
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('title=\"Like this item\"', 'g'), 'title=\"Gay this item\"');
//Replaces "(friend) likes this"
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('likes this', 'g'), 'gets all gay for this');
//Replaces "(friends) like this"
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('like this', 'g'), 'get gay for this');
//Replaces Like comment title
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('title=\"Like this comment\"', 'g'), 'title=\"Get gay for this comment\"');
//Replaces Unlike
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('<span class=\"default_message\">Unlike<\/span>', 'g'), '<span class=\"default_message\">Un-Gay<\/span>');

