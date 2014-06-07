// ==UserScript==
// @name           Douban Columns Search View 
// @namespace      http://qixinglu.com
// @description    让豆瓣搜索页面并排显示图书、电影、音乐的搜索结果
// @include        http://www.douban.com/search?search_text=*
// ==/UserScript==

var search_links = document.querySelectorAll('div.result-top p a');
var book_search_url = search_links[0].href;
var movie_search_url = search_links[1].href;
var music_search_url = search_links[2].href;

var content_node = document.getElementById('content');
var result_container_node = document.createElement('div');
result_container_node.id = 'result_container';
result_container_node.innerHTML = '' +
'<div id="book_result" class="extra_result">' +
    '<h3><a href="#">图书</a></h3>' +
'</div>' +
'<div id="movie_result" class="extra_result">' +
    '<h3><a href="#">电影</a></h3>' +
'</div>' +
'<div id="music_result" class="extra_result">' +
    '<h3><a href="#">音乐</a></h3>' +
'</div>';
GM_addStyle('' +
'.extra_result { ' +
    'float: left; ' +
    'margin-right: 10px; ' +
'}' +
'#result_container { ' +
    'float: left; ' +
'}' +
'#book_result {' +
    'width: 360px; ' +
'}' +
'#movie_result {' +
    'width: 450px; ' +
'}' +
'#music_result {' +
    'width: 300px; ' +
'}' +
'#wrapper { ' +
    'width: 1140px; ' +
'}' +
'#db-nav-main .bd {' +
    'width: 964px;' +
'}');
content_node.replaceChild(result_container_node, content_node.lastElementChild);

var get_result_node = function(response) {
    var temp_document = document.createElement('html');
    temp_document.innerHTML = response.responseText;
    return temp_document.getElementsByClassName('article')[0];
}

GM_xmlhttpRequest({
    method: "GET",
    url: book_search_url,
    onload: function(response) {
        var result_node = get_result_node(response);
        result_node.removeChild(result_node.firstElementChild);
        result_node.removeChild(result_node.firstElementChild);
        var result_container_node = document.getElementById('book_result');
        result_container_node.appendChild(result_node);
        document.querySelector('#book_result a').href = book_search_url;
        var link_nodes = result_node.querySelectorAll('.paginator a')
        var i, link_node;
        for (i = 0; i < link_nodes.length; i += 1) {
            link_node = link_nodes[i];
            link_node.href = link_node.href.replace('http://www', 'http://book');
        }
    }
});

GM_xmlhttpRequest({
    method: "GET",
    url: movie_search_url,
    onload: function(response) {
        var result_node = get_result_node(response);
        var result_container_node = document.getElementById('movie_result');
        result_container_node.appendChild(result_node);
        document.querySelector('#movie_result a').href = movie_search_url;
    }
});

GM_xmlhttpRequest({
    method: "GET",
    url: music_search_url,
    onload: function(response) {
        var result_node = get_result_node(response);
        var result_container_node = document.getElementById('music_result');
        result_container_node.appendChild(result_node);
        document.querySelector('#music_result a').href = music_search_url;
    }
});
