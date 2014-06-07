// ==UserScript==
// @id             GitHub: remove canonical
// @name           GitHub: remove canonical
// @namespace      http://efcl.info
// @description    remove Github's canonical link
// @include        https://github.com/*/*
// ==/UserScript==

(function() {
    //const currentPath = unsafeWindow.GitHub.currentPath;// 現在地
    const repoName = unsafeWindow.GitHub.repoName;// レポジトリかどうか確認に使う
    const controllerName = unsafeWindow.GitHub.controllerName;// tree , commmit
    const currentRef = unsafeWindow.GitHub.currentRef;// master - Canonicalはmasterの時の変更されてるかな?
    if (!repoName) {
        return; // レポジトリじゃない
    }
    main();
    function checkCanonical(href) {
        // 状況をtreeに限定して、masterにいる時(原因のGithub)はcanonicalを書き換える。
        // 今は困った仕様でlocation.pathname !== href の状況なので、一致になったらこの子はいらない
        if (controllerName === "tree" && currentRef === "master"
                && location.pathname === href) {
            alert("Githubは何か変更したよ\n私はもういらない子かも");
        }
    }

    function getCanonical() {
        var link = document.querySelector('link[rel="canonical"]');
        if (link) {
            return link;
        }
    }

    function main() {
        var link = getCanonical();
        if (!link) {
            return;
        }
        // checkCanonical(link.href);// Githubが変更してくれるといいね
        link.parentNode.removeChild(link);
    }
})();