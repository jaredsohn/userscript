// ==UserScript==
// @name           NS replace search
// @namespace      
// @include        http://www.newschoolers.com/web/forums/forumthreads/cat_id/2/
// ==/UserScript==
var searchbar, altText;
searchbar = document.getElementById('search');
if (searchbar) {
    searchbar.innerHTML = '<form method="post" action="/web/submit/search">' +
'<input type="text" value="" name="search_value" size="15"/> ' +
'<select name="search_action">' +
' <option value="forum">Forum</option>' +
' <option value="news">News</option>' +
' <option value="picture">Pictures</option>' +
' <option value="video">Videos</option>' +
' <option value="article">Articles</option>' + 
' <option value="review">Reviews</option>' +
' <option value="member">Members</option>' +
' </select>' +
'<input type="submit" ID="search_submit" value="Search"/>' +
'</form>';
}

var d1=document.getElementById('web_header');
var d2=document.getElementById('advlink');
d1.removeChild(d2); 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'#web_header #search {' +
'  width: 220px !important;' +
'  float: left !important;' +
'  padding-left: 12px !important;' +
'}' +
'#search_submit {' +
'  margin-left: 3px;' +
'  padding-left: 3px;' +
'  padding-right: 3px;' +
'}'