// ==UserScript==
// @name        GMail Search Tools
// @namespace   kobachi
// @description Easy to add/remove "is:unread", "is:starred" to GMail search box
// @include     https://mail.google.com/mail/*
// @version     1.1
// ==/UserScript==

(function(){
	function log(s){
		//unsafeWindow.console.log(s);
		//GM_log(s);
	}

	window.addEventListener("load", function(){
		log("Initializing component...");
		initializeComponent();
	}, false);

	function initializeComponent(){
		var box = document.querySelector("#gbqfqw");
		if(box == null){
			setTimeout(initializeComponent, 100);
			return;
		}
		var before = document.querySelector("#gbqfab");
		if(before == null){
			setTimeout(initializeComponent, 100);
			return;
		}

		var s = document.createElement("style");
		s.innerHTML = [
			"#gm-search-tools { display: inline-block; position: absolute; right: 16px; z-index: 9999; }",
			"#gm-search-tools > label { display: inline-block; }",
			"#gm-search-tools > label > input[type=checkbox] { display: none; }",
			"#gm-search-tools label > .icon { width: 26px; height: 26px; background-repeat: no-repeat; background-position: center center; }",
			'#gmst-is-unread:not([checked]) + .icon { background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABkElEQVQ4y6WTsYrCQBCGrX0IiwM7uzyJtdf5DoKiKAkYLAIW0cJCtBICipIQgiE5y6iQd0iVRrAURJjbf3HDJuaqW/hDsrP/N7O7kwoRVf4j/mg0GplGo5EyHA79fr9PQuwb8lVVVeS1HwC2aDadTunxeJA87vc7+b5Puq4Tg1ilAGa2FosFN7xeL/I8j1zX5cL75XKhKIpoMpkAMssBULZhGNx8vV4zozDLsP1+T5qmQUoGGAwGYZIkdLvdcqbj8ZiZD4cDT7Db7cg0TWJJf2QAD8Jg2zY5jpOBZDMGvpfLJQCUAzyfTx4UA6aiWSRZrVZ5AK4pTdMcQJQrD1SH21iv15+AOI55EOWXDcwjexAEn1vo9XrnzWZDYRhySLESYUYcW5rP52iwcwZot9vN8XhM2+2WA5BF3ACEOQFHdlwjPHIjVTudjgUIDghZYDidTlwiM8zoxm63i26sFlu5xrbig44SsRiHBeEdc4i9zbXSf4Hpq9VqfWN/OCRZmENMmP8C8O0w1ZmUgurvWO5v/AUh+qZ6kplSMwAAAABJRU5ErkJggg==") }',
			'#gmst-is-unread[checked] + .icon, #gmst-is-unread + .icon:hover { background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmpJREFUeNqkU01oE1EQ/t52E5PNj01BSqlWyLXeWgvGggpFRAo96c2TImgRKc1B8OLBQ9GmIFVPemlBwYKgFKRQFLyI+bGaUtHYWCzW1ND8NnbT7J/zdpNNtd4cmH3wZr5vvp2ZxwzDwP+YyD+MMfvi9Dh6VA1juo4BTs0jggC0CJgnvzY7ikQjlxdn5qdOcOoW7gW8/svnjl1E98FDUJQKivI6fhZXkVx5j9jyEmqKNjMbxtldBAR+0tnWcebu+Wkk16bw4dsUVJ2ro+rkLkcQFdmHV8lFyDX9PikZtgkGI6zH55Lidy5M4+WnYeQr66ZsUxdryLW8UGxDLJWHZqD3+YiREHhQUXF78PAQFn88QI4kC9QZ1mI5KEOlQ9aASyEDDlce7QFA1zAOK2zaiWD7ASznXpiya+RUAXRApbNKDCP91rRcEuD3mMqO21PgoapWxjYhroasxMgbBgfR16hyuL85atFhTgSN6QvWGIHyr6wluW6jRwxsUuVwqAmeeMsginZbmgQC3eTKGTiJPRJvhq8fbYIjMQb3HgITQtMZGqtjEmjbiH7JpKFXW+FxUfI79se2RRIW2OEESgWGzS3qTRVRuwcbHzH22Zd96nHvxb4uwEskk0kGvb4HEgfT72kKkM0CmYKBLGFsBQuPMVfewMxCuoSVlIBKHnBTNS9120Ndd1KZUo7ha4ohnTFQ4bmPMGf2b8cqd528gYdSKwY6Agw+ydpA8xepFVw2r8zB8zcRpuvVXW+BLNg9hND+XlwR3ehrjIqHVRnR73FMLj3Daw7+52OqG9VGJ7n/r5dbJl8j39r5Gn8LMAAV2Qj37wA9/gAAAABJRU5ErkJggg=="); }',
			'#gmst-is-starred:not([checked]) + .icon { background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4y6VSPWvCUBR10KWD/6GjSymU/piuLoX+i0JW0SgaiSg2AUEwOhjxWwLqIIJmLPoHQnARusrpO49S0uITbAMHTs6997z77rsxADHVVyqVngV0VVzWXjLo9/sn13XxJ4NCofC62+1AkF9lINq+qVarOBwOEuRXGeTzeWu1WmGz2UiQiy7elAblctkqFou+SIKu6zAMA/v9Hp7nSZBTY4w5zGXNt4Fo+YMnsd0wDHE8HuWps9lMgpwaY0EQYLFYgDXRK9wL97DdbmMymWA0GmE8HktOkFMj73Q6EFcMWfN7Bneaprk0Wa/XGA6Hsoggp9ZqtcAc5p4dYjwev3UcB77vQ+wABoOBBPl2u0Wz2QRzlK8ghvM0n88xnU7R6/VkIUFOjfNgjtIgl8uZHFi32wU7qVQqEuTUlsslMpmMqTRoNBoB72xZFrLZ7HsikXgkyKmxg3q9HigNbNuGeN9TOp1+Eb+pyM6kqJmmearVari0iQ9fSJ7Z3GQk/tPgP/gEnXbX5diiKxYAAAAASUVORK5CYII=") }',
			'#gmst-is-starred[checked] + .icon, #gmst-is-starred + .icon:hover { background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgVJREFUeNqkU89LVFEU/u5903McGQ1sbLCpCJohXWQxaYNCIEm0EImWLYYIhn5Af4AboT+hXSZSWbRo1caNLVoUDCSBY1JUGqGSTC+1hpmmsfvO7dznDKjNE6IL33vfvfc73z33nPegtYbf+Hq/9yrjtt++F7ubQSl73S2+zOjdDKTfZn48ecuOnZcNhwc97qeT9VNPhWRj60hgfzsMDP8nA1epO6HOC6C1Zx4Mz4+felBPGzAPZ6JvQrvquCbVBXJ5NQg7GgX9fOOJ7OgxwAqm82Mn05AWhAzkhGXN8lbaMyCiiy19V5oajiTBRpxXK2jlEUjRZpqVHCKX7rFwFQIV/Fp43lWYnjpqDISppBDixPJY99TezkMRe18LNHGg5tsJq1puzkoQTyU2nAJ+vF10DmRenePYmVoNZmKZ6YH57KdJI5CNCW6Ry0ZqE8xlKIHKyjrmswuTHDxgYnYWcfb0cO4m/eZbWc18KG2HaAKVLRiN0dbtwtJod2pPWxyq8I5Pdk11PBhOxQ8IROJYutuT8m1jSaFfhoLQGw4HlFGaW/RgOFUcWGEbxbLq9zUIt8eGqPgZleV1OHNf3h+8/KLHwHCzptV3hCNtQ3//ENWx9nRQOw973dFriRs87dgi6zBr3x6fcVefnNVbY2ttrK0lq++PjMKOj66ZEa/y19sM/mf8EWAAMf8CuW99jq0AAAAASUVORK5CYII="); }'
		].join("\n");
		document.querySelector("head").appendChild(s);

		log("Style Sheet injected.");
		
		var toolbar = document.createElement("div");
		toolbar.setAttribute("id", "gm-search-tools");
		box.insertBefore(toolbar, before);

		var unreadLabel = document.createElement("label");
		unreadLabel.setAttribute("style", "display: inline-block; vertical-align: middle;");
		unreadLabel.setAttribute("title", "is:unread");
		var unreadCheckbox = document.createElement("input");
		unreadCheckbox.setAttribute("id", "gmst-is-unread");
		unreadCheckbox.setAttribute("type", "checkbox");
		unreadCheckbox.setAttribute("style", "vertical-align: middle;");
		unreadLabel.appendChild(unreadCheckbox);
		var unreadIcon = document.createElement("div");
		unreadIcon.setAttribute("class", "icon");
		unreadLabel.appendChild(unreadIcon);
		toolbar.appendChild(unreadLabel);

		log("is:unread checkbox added.");

		var starredLabel = document.createElement("label");
		starredLabel.setAttribute("style", "display: inline-block; vertical-align: middle;");
		starredLabel.setAttribute("title", "is:starred");
		var starredCheckbox = document.createElement("input");
		starredCheckbox.setAttribute("id", "gmst-is-starred");
		starredCheckbox.setAttribute("type", "checkbox");
		starredCheckbox.setAttribute("style", "vertical-align: middle;");
		starredLabel.appendChild(starredCheckbox);
		var starredIcon = document.createElement("div");
		starredIcon.setAttribute("class", "icon");
		starredLabel.appendChild(starredIcon);
		toolbar.appendChild(starredLabel);

		log("Initializing event...");
		initializeEvent();
	}

	function initializeEvent(){
		var searchbox = document.querySelector("#gbqfq");
		if(searchbox == null){
			setTimeout(initializeEvent, 100);
			return;
		}
		var unreadCheckbox = document.querySelector("#gmst-is-unread");
		if(unreadCheckbox == null){
			setTimeout(initializeEvent, 100);
			return;
		}
		var starredCheckbox = document.querySelector("#gmst-is-starred");
		if(starredCheckbox == null){
			setTimeout(initializeEvent, 100);
			return;
		}

		var old = null;
		var changing = false;

		unreadCheckbox.addEventListener("click", function(){
			changing = true;
			if(unreadCheckbox.checked){
				searchbox.value = searchbox.value.replace(/( ?is:unread|is:unread ?)/g, "") + " is:unread";
				unreadCheckbox.setAttribute("checked", "checked");
				log("\"is:unread\" added.");
			}
			else{
				searchbox.value = searchbox.value.replace(/( ?is:unread|is:unread ?)/g, "");
				unreadCheckbox.removeAttribute("checked");
				log("\"is:unread\" removed.");
			}
			old = searchbox.value.toLowerCase();
			log("old = " + old);
			changing = false;
			//
			performSearch();
		});

		starredCheckbox.addEventListener("click", function(){
			changing = true;
			if(starredCheckbox.checked){
				searchbox.value = searchbox.value.replace(/( ?is:starred|is:starred ?)/g, "") + " is:starred";
				starredCheckbox.setAttribute("checked", "checked");
				log("\"is:starred\" added.");
			}
			else{
				searchbox.value = searchbox.value.replace(/( ?is:starred|is:starred ?)/g, "");
				starredCheckbox.removeAttribute("checked");
				log("\"is:starred\" removed.");
			}
			old = searchbox.value.toLowerCase();
			log("old = " + old);
			changing = false;
			//
			performSearch();
		});

		setInterval(function(){
			if(changing){
				return;
			}
			var current = searchbox.value.toLowerCase();
			if(current == old){
				return;
			}
			log("Search query changed.");
			if(0 <= current.indexOf("is:unread")){
				log("\"is:unread\" added: " + current);
				unreadCheckbox.setAttribute("checked", "checked");
				unreadCheckbox.checked = true;
			}
			else{
				log("\"is:unread\" removed: " + current);
				unreadCheckbox.removeAttribute("checked");
				unreadCheckbox.checked = false;
			}
			if(0 <= current.indexOf("is:starred")){
				log("\"is:starred\" added: " + current);
				starredCheckbox.setAttribute("checked", "checked");
				starredCheckbox.checked = true;
			}
			else{
				log("\"is:starred\" removed: " + current);
				starredCheckbox.removeAttribute("checked");
				starredCheckbox.checked = false;
			}
			old = current;
		}, 500);
		
		log("Event initialized.");
	}
	
	function performSearch(){
		var e = document.createEvent("MouseEvents");
		e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.querySelector("#gbqfb").dispatchEvent(e);
	}
})();
