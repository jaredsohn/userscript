// FuckBash
// http://userscripts.org/scripts/show/68366
//
// ==UserScript==
// @name          Fuck Bash
// @namespace     http://ilya.shutov.org.ru/FuckBash
// @description   Cleaning the shit from bash.org.ru
// @include       http://bash.org.ru/abyss*
// ==/UserScript==

    var allDivs, thisDiv, inner, real;

    allDivs = document.evaluate(
        "//div[@class='q']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    for (var i=0; i<allDivs.snapshotLength; i++)
    {
        thisDiv = allDivs.snapshotItem(i);

        real = thisDiv.innerHTML;
        inner = real.toLowerCase();

        if  ((inner.indexOf("смешни") > -1) ||
            (inner.indexOf("смешан") > -1) ||
            (inner.indexOf("плюсан") > -1) ||
            (inner.indexOf("заминус") > -1) ||
            (inner.indexOf("довед") > -1) ||
            (inner.indexOf("увижу в лучшем") > -1) ||
            (inner.indexOf("поддержи") > -1) ||
            (inner.indexOf("__") > -1) ||
            (inner.indexOf("--") > -1) ||
            (inner.indexOf("==") > -1) ||
            (inner.indexOf("**") > -1) ||
            (inner.indexOf("а помни") > -1) ||
            (inner.indexOf("а вы тоже") > -1) ||
            (inner.indexOf("пожелайте") > -1) ||

            (inner.indexOf("сорри за") > -1) ||
            (inner.indexOf("антиуг") > -1) ||
            (inner.indexOf("анти-уг") > -1) ||
            (inner.indexOf("анти уг") > -1) ||
            (inner.indexOf("за уг.") > -1) ||
            (inner.indexOf("это:") > -1) ||
            (inner.indexOf("к этому:") > -1) ||
            (inner.indexOf("народ!") > -1) ||

            (inner.indexOf("спрашиваете") > -1) ||
            (inner.indexOf("добавляем") > -1) ||

            (inner.indexOf("отжиг") > -1) ||
            (inner.indexOf("респект") > -1) ||
            (inner.indexOf("чувак с долларами") > -1) ||

            (inner.indexOf("бездн") > -1) ||
            (inner.indexOf("цитат") > -1) ||

            (real.indexOf("БОР") > -1) ||
            (real.indexOf("УГ") > -1)
        )
        thisDiv.innerHTML="";
    }