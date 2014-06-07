// ==UserScript==
// @name        tieba.score_egg.click
// @namespace   clumsyman
// @description 自动点击福利彩蛋
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/p?*
// @include     http://tieba.baidu.com/f/*
// @include     http://tieba.baidu.com/f?*
// @version     1
// ==/UserScript==

var selector = "a.score_egg:not(.j_VIP_score)";
var name = "福利彩蛋";
var unit = "枚";

function detect() {
    var nodes = document.querySelectorAll(selector);
    if (nodes) {
        switch(nodes.length) {
            case 0:
                console.log("未能在页面上找到"+name);
                break;
            case 1:
                console.log("自动点击找到的1"+unit+name+"……");
                nodes[0].click();
                break;
            default:
				var error = "在页面上找到"+nodes.length+unit+name+"。";
                console.error(error);
                alert(error);
                break;
        }
    }
}

detect();
var container = document.querySelector('.score_show');
var observer = new MutationObserver(detect);
observer.observe(container, { childList: true, subtree: true });

