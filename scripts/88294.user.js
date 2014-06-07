// ==UserScript==
// @name           Facebook Me Gustaizer
// @description    Changes the likes on Facebook to Me Gusta
// @author         AfinitE
// @include        *.facebook*
// @version        1.2
// ==/UserScript==

//Replaces Like links
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('<span class=\"default_message\">Like<\/span>', 'g'), '<span class=\"default_message\">Me Gusta<\/span>');
//Replaces Like link title
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('title=\"Like this item\"', 'g'), 'title=\"Me gusta this item\"');
//Replaces "(friend) likes this" with "(friend) le gusta this"
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('likes this', 'g'), 'le gusta this');
//Replaces "(friends) like this" with "(friends) les gusta this"
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('like this', 'g'), 'les gusta this');
//Replaces Like comment title
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('title=\"Like this comment\"', 'g'), 'title=\"Me gusta this comment\"');
//Replaces Unlike with No Me Gusta
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('<span class=\"default_message\">Unlike<\/span>', 'g'), '<span class=\"default_message\">No Me Gusta<\/span>');