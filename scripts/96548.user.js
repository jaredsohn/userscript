// ==UserScript==
// @name           Facebook 'Lover'
// @description    Changes the likes on Facebook to 'Loves'
// @author         Mike Benich
// @include        *.facebook*
// @version        1.0
// ==/UserScript==

//Replaces Like links
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('<span class=\"default_message\">Like<\/span>', 'g'), '<span class=\"default_message\">Love<\/span>');
//Replaces Like link title
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('title=\"Like this item\"', 'g'), 'title=\"Love this item\"');
//Replaces "(friend) likes this" with "(friend) loves this"
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('likes this', 'g'), 'loves this');
//Replaces "(friends) like this" with "(friends) love this"
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('like this', 'g'), 'love this');
//Replaces Like comment title
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('title=\"Like this comment\"', 'g'), 'title=\"Love this comment\"');
//Replaces Unlike with Unlove
document.body.innerHTML = document.body.innerHTML.replace(new RegExp('<span class=\"default_message\">Unlike<\/span>', 'g'), '<span class=\"default_message\">Unlove<\/span>');