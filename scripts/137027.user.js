// ==UserScript==
// @name           ByPass Myegy Counter(redirector)
// @author         Max789 
// @description    Fast Redercting to The Forum
// @version        2.5
// @match          http://myegy.com/*
// ==/UserScript==
(function(){
	var page = window.location.pathname;
        if (page.search('.html') === -1) {
            if (~(page.search('counter.php'))) {
                window.top.stop();
                this.refresh_redirector(1, "3;");
            } else {
                document.getElementById('content').addEventListener('click', function (event) {
                    if (event.target.tagName == "H1") {
                        event.preventDefault();
                        window.location = event.target.parentElement.nextSibling.nextSibling.href;
                    }
                }, false);
            }
        } else {
            var link = document.getElementsByClassName('url')[0].children[0].href;
            window.location = link;
        }
}());//End Self-Invoking Function