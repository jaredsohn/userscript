// ==UserScript==
// @name           LepraRemoveFromMyThings
// @namespace      leprosorium
// @description    Добавляет [стереть из моих вещей] внутрь поста
// @include        http://*leprosorium.ru/comments/*
// ==/UserScript==

function eval_first (expr, context) {
    return document.evaluate(expr, (context != null) ? context : document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function eval_next (expr, context, message) {
    var n = eval_first(expr, context);
    if(n == null){
        throw message;
    }
    return n;
}

function new_elem(s){
    return document.createElement(s);
}

function new_attr(n, v){
    var a = document.createAttribute(n);
    a.nodeValue = v;
    return a;
}

function main(){
    try {
        var html_kill_from_mythings = '<span>[<a href="#" onmouseout="mythingsHandler.del_from_my_things_out(event, this);" onmouseover="mythingsHandler.del_from_my_things_hover(event);" onmouseup="mythingsHandler.fav(\'del\', \'%postid%\', this); return false;" onclick="return false;">стереть из моих вещей</a>]</span>';

        var xpath_post_ord  = "//div[contains(@class, 'post') and contains(@class, 'ord')]";
        var xpath_post      = "//div[@class='p'][a[@class='login']]";
        var xpath_mythings  = "span[a[@href='#']='в мои вещи']";
        var xpath_uthing    = "a[@class='u']";

        var node_post_ord = eval_next(xpath_post_ord, null, 'no post ord');

        var node_post = eval_next(xpath_post, node_post_ord, 'no post');

        if(eval_first(xpath_mythings, node_post) != null){
            //alert('my thing present');
            return;
        }

        var node_u = eval_next(xpath_uthing, node_post, 'no u-thing');

        /////////////////////////

        var matches = node_post_ord.id.match(/p(\d+)/);
        if(matches == null){
            throw 'no post id';
        }

        var node_div = new_elem('div');

        node_div.setAttributeNode(new_attr('class', 'post'));
        node_div.innerHTML = html_kill_from_mythings.replace('%postid%', matches[1]);
        node_div.style.padding = '0px';
        node_div.style.margin = '0px';
        node_div.style.display = 'inline';

        node_post.insertBefore(node_div, node_u);
    }
    catch (e){
        if(typeof e == 'string'){
            // alert(e);
        }else{
            throw e;
        }
    }
}

main();

