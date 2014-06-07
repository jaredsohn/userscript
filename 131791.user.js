// ==UserScript==
// @name       v2ex-ajax-fav 
// @namespace  v2ex_ajax_fav
// @version    v1.1
// @match      http://www.v2ex.com/t/*
// @author     wong2(wonderfuly@gmail.com)
//
// ==/UserScript==

var link = document.getElementsByClassName("op")[0];

function fakeAjaxGet(url){
    var image = new Image();
    image.src = url;
}

link.addEventListener("click", function(event){
    var url = this.href,
        fav = ! /unfavorite/.test(url),
        span, text, count;

    fakeAjaxGet(url);

    if(fav){
        this.href = url.replace("favorite", "unfavorite");
        this.innerHTML = "取消收藏";
    } else {
        this.href = url.replace("unfavorite", "favorite");
        this.innerHTML = "加入收藏";
    }

    if(this.previousSibling){
        span  = this.previousSibling; 
        text  = span.innerHTML;
        count = parseInt(text.match(/\d+/)[0], 10) + (fav?1:-1);
        if(count){
            span.innerHTML = text.replace(/\d+/, count);
        } else {
            span.parentNode.removeChild(span);
        }
    } else if(fav){
        span = document.createElement("span")
        span.style.fontSize = "10px";
        span.style.lineHeight = "10px";
        span.style.color = "#99a";
        span.innerHTML = "已有1人收藏此主题 &nbsp;";
        this.parentNode.insertBefore(span, this);
    }

    var total_el = document.getElementsByClassName("bigger")[2],
        total_count = parseInt(total_el.innerHTML, 10);
    total_el.innerHTML = total_count + (fav?1:-1);
        
    event.preventDefault();
}, false);