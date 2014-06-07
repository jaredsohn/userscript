// ==UserScript==
// @name        doubanHelper
// @namespace   http://localhost
// @description 豆瓣小组小助手，新标签打开链接功能
// @include     http://www.douban.com/group/*
// @version     0.0.1
// @grant       none
// ==/UserScript==

function $(q){
    return document.querySelectorAll(q);
}

function jumpLastPage(topic, res){
	var reg = /\d+/;
	var start = parseInt(reg.exec(res) / 100);
	if(1>start)
		return topic;
	else
		return (topic + "?start=" + (start * 100));
}

function popupInfo(ele){
	var buddy = ele.getElementsByTagName('button')[0].nextSibling;
	buddy.innert = "div" + buddy.innertHTML;
}

function letJump(){
    var page = document.getElementById('xgpage').value;
    var link = "http://www.douban.com/group";
    var start = parseInt(page);
    if(1 < start){
        link += "?start=" + ((start - 1) * 50);
    }
    window.location.href = link;
}

(function(){
    function init(){
    	var replys = $('.td-reply');
    	var subjects = $('.td-subject');
    	for(var i = 0; i<subjects.length; ++i){
    		var number = replys[i].innerHTML;
    		var subject_link = subjects[i].getElementsByTagName('a')[0].href;
    		replys[i].innerHTML = "<a target='_blank' href='" + jumpLastPage(subject_link, number) + "'>" + number + "</a>";
            var topic = subjects[i].getElementsByTagName('a')[0];
            topic.target = "_blank";
    	}
    }

    function initJump(){
        var jumpSpan = document.createElement('span');
        var jumpIpt = document.createElement('input');
        var jumpBtn = document.createElement('button');

        jumpIpt.type = "text";
        jumpIpt.id = "xgpage";
        jumpIpt.placeholder = " 跳至該頁";
        jumpIpt.style.width = '50px';

        jumpBtn.innerHTML = "GO";
        jumpBtn.addEventListener('click', letJump);

        jumpSpan.appendChild(jumpIpt);
        jumpSpan.appendChild(jumpBtn);

        var paginator = $('.paginator .next')[0];
        paginator.parentNode.insertBefore(jumpSpan, paginator);
    }

    init();
    initJump();
})();
