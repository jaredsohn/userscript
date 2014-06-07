// ==UserScript==
// @name           Funnyjunk goto page button
// @description    DONT QUESTION ITS USEFULNESS
// @author         posttwo (Post15951)
// @include        *funnyjunk.com*
// @version        6
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
 
 
//Yser Funny pictures
$("<a>",
        {
                "class": "showRepliesButton",
                text: "Go To",
                onclick: 'var MyLovely=prompt("What page you wanna see, princess?"); pictures.loadContentList(MyLovely,\'usersfunnypictures\',\'0\'); return false',
                value: "re!",
                type: "GoTo",
           		style: "font-size: 10px;"
        }).appendTo("span[title=\"funny pictures\"]");

 //User Comments
$("<a>",
        {
                "class": "showRepliesButton",
                text: "Go To",
                onclick: 'var MyLovely=prompt("What page you wanna see, princess?"); comments.loadUserComments(MyLovely); return false;',
                value: "do!",
                type: "GoTo",
           		style: "font-size: 10px;"
        }).appendTo("span[title=\"latest user's comments\"]");

//Yser Fruebds

$("<a>",
        {
                "class": "showRepliesButton",
                text: "Go To",
                onclick: 'var MyLovely=prompt("What page you wanna see, princess?"); pictures.loadUserFriends(MyLovely); return false;',
                value: "do!",
                type: "GoTo",
           		style: "font-size: 10px;"
        }).appendTo("span[title=\"user's friends\"]");

//Comments

$("<a>",
        {
                "class": "showRepliesButton",
                text: "Go To",
                onclick: 'var MyLovely=prompt("What page you wanna see, princess?"); comments.loadPage(MyLovely); return false;',
                value: "do!",
                type: "GoTo",
           		style: "font-size: 10px;"
        }).appendTo(".f_New");
 
 //funny_pictures pictures.loadTypedContentList(10,'picturetop24h','0')

$("<a>",
        {
                "class": "showRepliesButton",
                text: "Go To",
                onclick: 'var MyLovely=prompt("What page you wanna see, princess?"); pictures.loadTypedContentList(MyLovely,\'picturetop24h\',\'0\'); return false;',
                value: "do!",
                type: "GoTo",
           		style: "font-size: 10px;"
        }).appendTo("#picturetop24h_content .comPaginator");

//pictures.loadTypedContentList(135,'picturetop7d','0'); return false;

 $("<a>",
        {
                "class": "showRepliesButton",
                text: "Go To",
                onclick: 'var MyLovely=prompt("What page you wanna see, princess?"); pictures.loadTypedContentList(MyLovely,\'picturetop7d\',\'0\'); return false;',
                value: "do!",
                type: "GoTo",
           		style: "font-size: 10px;"
        }).appendTo("#picturetop7d_content .comPaginator");

//pictures.loadTypedContentList(1024,\'picturetop30d\',\'0\'); return false;

 $("<a>",
        {
                "class": "showRepliesButton",
                text: "Go To",
                onclick: 'var MyLovely=prompt("What page you wanna see, princess?"); pictures.loadTypedContentList(MyLovely,\'picturetop30d\',\'0\'); return false;',
                value: "do!",
                type: "GoTo",
           		style: "font-size: 10px;"
        }).appendTo("#picturetop30d_content .comPaginator");

//pictures.loadTypedContentList(MyLovely,\'picturelatest\',\'0\'); return false;

$("<a>",
        {
                "class": "showRepliesButton",
                text: "Go To",
                onclick: 'var MyLovely=prompt("What page you wanna see, princess?"); pictures.loadTypedContentList(MyLovely,\'picturelatest\',\'0\'); return false;',
                value: "do!",
                type: "GoTo",
           		style: "font-size: 10px;"
        }).appendTo("#picturelatest_content .comPaginator");

//pictures.loadTypedContentList(MyLovely,\'picturetopall\',\'0\'); return false;
$("<a>",
        {
                "class": "showRepliesButton",
                text: "Go To",
                onclick: 'var MyLovely=prompt("What page you wanna see, princess?"); pictures.loadTypedContentList(MyLovely,\'picturetopall\',\'0\'); return false;',
                value: "do!",
                type: "GoTo",
           		style: "font-size: 10px;"
        }).appendTo("#picturetopall_content .comPaginator");