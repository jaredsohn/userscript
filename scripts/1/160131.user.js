// Reddit Sidebar Hider
// version 0.1
// 2013-02-23
// Last update: 2013-02-23
// Copyright (c) 2011, Mike McGowan
// Released under the CC BY-SA 3.0 license
// http://creativecommons.org/licenses/by-sa/3.0/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name       Reddit Sidebar Hider
// @version    0.1
// @description  Hides sidebar when browser is less than 950px wide. Or whatever.
// @include http://*reddit.com*
// ==/UserScript==

var side = document.getElementsByClassName('side')[0];

function check(){
    if(self.innerWidth < 950){
        side.style.display = 'none';
    }else{
        side.style.display = 'block';
    }
}

setInterval(function(){check();}, 500);