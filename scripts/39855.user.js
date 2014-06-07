// ==UserScript==
// @name           Who r u?
// @namespace      http://userscripts.org/users/77028
// @include        http://*leprosorium.ru/*
// ==/UserScript==

(function() {

function getUserId(user_link)
{
    r = new RegExp("[0-9]+");
    return r.exec(user_link.href);
}

function getMyId()
{
    me = document.evaluate("//div[@id='greetings']/a", document, null, XPathResult.ANY_TYPE, null).iterateNext();
    return getUserId(me);
}

function getRank(base_id, id)
{
    if (id == 1)
        return "пользователь №1"
    if (id < 10)
        return "однознак";
    if (id < 100)
        return "двузнак";
    if (id < 1000)
        return "трёхзнак";

    id_num = Math.floor(id / 1000);
    base_num = Math.floor(base_id / 1000);

    prefix = id_num <= base_num ? "элитни " : "сирани ";

    return prefix + id_num + "k";
}

function addGlobalStyle(css)
{
    head = document.getElementsByTagName('head')[0];
    if (!head)
        return;
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function letsGo()
{
    my_id = getMyId();

    user_links = document.evaluate("//div[@class='p']/a[contains(@href, '/users/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < user_links.snapshotLength; ++i)
    {
        user_link = user_links.snapshotItem(i);

        id = getUserId(user_link);
        user_link.previousSibling.textContent += " " + getRank(my_id, id) + " ";
    }
    
    // colorizing author's comments

    addGlobalStyle("a.author { color: #CC3333 !important }");

    author_link = document.evaluate("//div[contains(@class, 'ord')]/div[@class='dd']/div[@class='p']/a[contains(@href, '/users/')]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
    author_id = getUserId(author_link);

    user_links = document.evaluate("//div[@class='p']/a[@href='/users/" + author_id + "']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 1; i < user_links.snapshotLength; ++i)
    {
        user_link = user_links.snapshotItem(i);
        if (user_link.className != "")
            user_link.className += " author";
        else
            user_link.className = "author";
    }
}

letsGo();
})();
