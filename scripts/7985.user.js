// ==UserScript==
// @name           userscripts - warn if unsafeWindow in script
// @namespace      http://www.digivill.net/~joykillr
// @description    Add a visual warning when scripts use unsafeWindow
// @include        http://*.userscripts.org/scripts/show/*
// @include        http://userscripts.org/scripts/show/*
// ==/UserScript==
//v 2.2

function getDocument(url) {
    GM_xmlhttpRequest({
        method:"GET",
        url:url,
        onload:function(details) {
			var s = new String(details.responseText);
			if ((s.indexOf("unsafeWindow") != -1) || (s.indexOf("unsafeDocument") != -1)) {addNotify();}
        }
    });
}

function addNotify() {
	GM_addStyle('p#install_script::after {content: url("data:x-png\/image;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAwCAYAAADab77TAAAABGdBTUEAANbY1E9YMgAAAAlwSFlzAAASdAAAEnQB3mYfeAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYyLjcyclqEXQAAB01JREFUeF7tmulTFEcYxuPHfA1WeRdSsKgIgoggx6KA3EiICyLIacKZEm+ipZaCR9SYQ4nBxCrLJCb5YEzyPySVMqnEUgqNcoNGUI7dnVlIJV+evN2wuLvs7CwEw7D0VnXBzgzNO\/3r53nfnp55AF4RHw8eAQZYNM8dAwHXwye4ACwAe659zYXUJBQsFCwUPJuVLhQsFCwULBTs4SoQgAVgzaY6zQY2m1WjpdgFYA93H1XAtww5Md9sTpJubNwEu7Ypjn\/\/Kj4BV1asQsOSZcYLi5aE0mP7eVqawXM9FpeAv9+Wq\/8uM1PqOXUII5+ex8iVc9TOYuSTMxi+fBrDDScxcqkewxfr0Fa1HY3e3qYTCxZGCMjaWXkoArbC7WZwCarlZA0sxythOVYOy5EyWA7vhFxbAsuBQlhqizH8wVG0VuZyyHULFgnIGrF+p4B\/yN8ReysjQ+o5fZgr11JXTUBLCWQRAS2AtCcfxl3bMFRpgKliK8zlWZB352L4wmG0VY8quW6hgKyF9DABMFPut2mpUvfpQ\/jr6nuw1L8NmeDK7xRDPlgIaW8e+qqy0bK3FC31B9FZkYOhnVsgvZkBc7UBw+dr0UrHRpUs7HqmIdsBvpmVFX0zNVXqOllLyj1nD5fUK+\/fgaGaXDzYXYJ\/ZIliBzqvN6KvOBVSaTrMRakwkpqHzx5Aa1m2ULIGbNoO8NcJiVLX8f28iGL5Vj5UMqbcAg5X3rsdTyuy0HL9CofLPg8uvoveHUmQCLKpIAWDeckYKM2EfGYf2soMuLRkmYmKrldneiaPvZrE3k\/izVU81mtsr7U9ptSXO30r\/V\/H\/qdrvOwAfxkTi5GPT1ER9RbZMUGlfCvvz6eWB3lPLmTKu53F6Wi+2sDh\/i2Z8VumHoNFyRywsSCZAKfgeU4K+ksySckH0bB4KRtQr+kKeKr9THbwnV3vODGcfVebPO5MrKneo7O\/swP8RVQMRhrquVJ528NaLqSaHIKbDal6K9oKU\/Ds91844KbGD9GeFQ1Tth7GrEgMpoejPyUcfUkReBIfAcvRClwaBbxgOoOeSl\/\/B+CpxGX7N5ON0Z3\/Zwf488goDH90gsN80QwcrFT9BqTyTDw0xOLZrz9zwLcNcehLCIAxfiUGNvrjeZQf+iJ0+DNMh+61OpokeeOAlSzOGqQzO3Q6I8cs1lYpjpaqpCzHAXRmxUoD7ix+Z9c6i8vW0h3vSe2+lWJUSiOO6cMO8PWIDbSePQa5KguStRFUc3ESzLkxMGWtR3Pcagzdb0L7zRu4H+mLwbgVMMbq0B\/th2eROvSGE+B1DLA\/qf8FYMebVLJA6wC5c14tn7lShxLsqQJWgugKoKsc76w\/VzErTUB7wOEE+MIRSGUZtOxJg1QQD5MhAqbMUJi2UEsPQZN+BVfvnap8PNb7wbhJh0ECbFXv0\/Wj6u0MZgrOt7Nod2er2mA5y3PuqtjRMVyp2BUAVzGoTRJnrjVZoEqCsRUIv8Y2mGth4VQY1ZJa9TC9HgZTxloCuxbGtBAYU9dgKCUIf+j9MXj7R9zd4IN+suWhcfX6gcHl6g3xR\/saUjABpmfU4zn4vwJ2tB93B8qdwVNzA1fOohSHmmupuYja+Ql27Cx92d7YZwGBkI9WEsxgUiu1tDUwEVjWjEmBGEoMQE9aGDprCtAdQ\/Y8Bvc5s2bKvU+5NevQEeyP1iAGePot2h1YavbuTh+TmTxaAKwYry1gWrPSuncnTFvDYUoOJKirYUyktjkAA5tXoVOvQ1OED5ojluNJlO9Y3vXjcFlh9ThUhy7KvW0EtyM6ENLu7XYKdjWjlYowpWLKUXHOLNpRdZMtsqYyEdRsXS0GtfNK9+0e4MVLjY9o\/SofKCKLDoUxYRW1lbxK7orxQ+e1yzz\/mu7fQ0u4DxVVo3B7yZoZXFZYMWvuiAmEeVcOHhWk4uLipWYKesaXSUoW7OnH7XLw+7Sfy54htxRv4U+ujBnBVET580KqLdIHxuZ7HHDr1Y\/xMMxnXLk9ZMvdITqCS8XVGNyWwlQ0Lvc2l3vNTyTAM\/6gw9NBKtYQticIxDy2nzsKOQPyvjwqsIIwQNbcQ0uiOyHe+CloGe6GLEf3Ol9eUDG4XQwu5d0O\/Wqu3JaiNA637DUvBnc+NU08qpyLkCfsJjHIbKuPQy5Kp0IpF\/1UYPVu8MOTcF90h\/nh8Tr6ncEdy7ntQROVawuX9TkXB1cL9+x0P5hDtiqZIEu01\/ssPpAXUlbVsqUQq5ZZzmW2zB5njtuyjXIF3Jl9u0PxjQ47JRcyJdOGA2v7aPPB2midK9HTKnbcIedyWxZwZxYuXwW4shGrktmWH9s0sG3sAQbbKWI\/2XFWLQtbnnmgE5ZRanmCQR5Toxdb7qg0do1QrgY2+sfXxWqAxXntqXIyTFTfi55MZ+Ja7U0GAVhDdvoyBCIAC8Das52XMdM9tU+hYKFgoeDZrG6hYKFgoWChYA9XgQAsAGs21Wk2sNmsGi3F\/i\/CNsncxX\/MfQAAAABJRU5ErkJggg==\")!important;}');
}

if (document.getElementById("install_script")) {
	var go2 = document.getElementById("install_script");
	go2 = go2.getElementsByTagName("a")[0].href.toString();
	go2 = go2 + "?source";
	//go2 = go2.split("source\/")[1].split(".user.js")[0];
	//go2 = "http:\/\/userscripts.org\/scripts\/source\/" + go2;
	getDocument(go2);
}
