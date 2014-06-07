// ==UserScript==
// @name           Klean da Beast - SMF ignore script
// @description    Скрывает сообщения написанные Кыциком и Мариком  
// @namespace      zugunder.com
// @include        http://zugunder.com/*
// @version        0.2
// @author         dlja.paketov
// @grant          metadata
// ==/UserScript==

// BASED ON http://userscripts.org/scripts/show/120911
// INSPIRED BY Кыцик и Марик
// ----------------------
// v0.2 - Из-за вонючего dyma добавлено сокрытие тем на странице Терки

// TODO: не удалять посты/темы, а скрывать
var parentUrl = '/index.php';
var banned = new Array();

banned.push(521); //Кыцик
banned.push(184); //Марик
banned.push(518); //Орманди
banned.push(718); //Myx
banned.push(242); //dym

if(window.location.href.indexOf('?topic=') > 0){
    for (var i = 0; i < banned.length; i++){
        var uid = banned[i];
        var url = parentUrl + '?action=profile;u=' + uid;
        var posts = document.evaluate('//div[@class="post_wrapper"][div[@class="poster"]/h4/a[contains(@href,"'+url+'")]]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var j = 0; j < posts.snapshotLength; j++) {
            var node = posts.snapshotItem(j);
            var name = document.evaluate('//h4/a[contains(@href,"'+url+'")]/text()', node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            node.innerHTML = '<center><h3>Здесь насрал(ла) <a href="'+url+'">'+name.singleNodeValue.textContent+'</a></h3></center>';
        }
    }
}
else if(window.location.href.indexOf('?board=') > 0){
    for (var i = 0; i < banned.length; i++){
        var uid = banned[i];
        var url = parentUrl + '?action=profile;u=' + uid;
        var themes = document.evaluate('//tr//p/a[contains(@href,"'+url+'")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var j = 0; j < themes.snapshotLength; j++) {
            var node = themes.snapshotItem(j);
            var name = document.evaluate('//tr//p/a[contains(@href,"'+url+'")]/text()', node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            do{
                node = node.parentNode;
            }
            while(node.tagName != 'TR');
            node.innerHTML = '<td colspan="5" style="text-align:center;line-height:.5em"><sup>Здесь насрал(ла) <a href="'+url+'">'+name.singleNodeValue.textContent+'</a></sup></td>';
        }
    }
}
else if(window.location.href.indexOf('?action=profile;u=') > 0){
    
}