// ==UserScript==
// @name           Volta - Ignore
// @namespace      www.voltahorse.pl
// @description    Ignorowanie postów wybranych użytkowników
// @include        http://www.voltahorse.pl/forum/*
// ==/UserScript==


var ignoreUsers = ' uzytkownik1 UrzySzkodnik2 Quniara ';

var userPosts = document.evaluate(
    "//span[@title='Wstaw nick autora do szybkiej odpowiedzi']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    
    
for (var i = 0; i < userPosts.snapshotLength; i++) 
{
    var post = userPosts.snapshotItem(i);
    if(ignoreUsers.indexOf(post.innerHTML) > -1)
    {
      var tr1 = post.parentNode.parentNode.parentNode.parentNode;
      var tr2 = tr1;
      do{
        tr2 = tr2.nextSibling;
      } while(tr2.nodeName != 'TR');
      tr1.style.display='none';
      tr2.style.display='none';
    }
}
