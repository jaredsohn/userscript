// ==UserScript==
// @name           Underlepras Visible!
// @namespace      ACTPOHABT 8110
// @description    Сдержанно выделяет посты подлепр на главной морковным цветом
// @include        http://leprosorium.ru/*
// @include        http://leprosorium.ru/pages/*
// ==/UserScript==


(function() {

function posts() {
    var posts = document.evaluate("//div[contains(@class,'post')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var idx = 0; idx < posts.snapshotLength; idx++) {
	post = posts.snapshotItem(idx);
	if (!post) return; //found "post"
	p = post.getElementsByClassName('p');//search "p"
	if (!p || !p.length) return;
	a = p[0].getElementsByTagName('a');//search link "a"
	if (!a || !a.length) return;
	id = a[1];//taking second element берём второй элемент
	if (!id) return;
	temp=id.innerHTML;
	temp = temp.replace(/(\w+)\.(\w+)\.(\w+)/, '<span style=\'background-color: #f36223\'><font color=white><b>$1<\/b><\/font><\/span>.$2.$3');//here taking innerhtml and chnaging it 
	id.innerHTML=temp;
    }
    return;
}


function heyho() {
    var a = document.location.href;
	if (  (a.indexOf('/pages/') != -1)
	     ||(a == 'http://leprosorium.ru/')
	     ||(a == 'http://www.leprosorium.ru/') )
    {
	posts();
    }

    return;
}

heyho();

})();