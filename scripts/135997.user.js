// ==UserScript==
// @name        TiebaStylePlus
// @namespace   archangelsdy
// @include     http://tieba.baidu.com/f*
// @version     0.4
// ==/UserScript==
(function () {
	if (document.URL.match(/kw=/)) {
		var HIGHLIGHT = 15;

		var thInfos = document.getElementsByClassName("th_info");
		while (thInfos.length > HIGHLIGHT - 2) {
			thInfos[thInfos.length - 1].parentNode.removeChild(thInfos[thInfos.length - 1]);
		}
		for (var i = 0; i < thInfos.length; ++ i) {
			thInfos[i].style.marginTop = "10px";
		}

		var thAuthors = document.getElementsByClassName("th_author");
		while (thAuthors.length > HIGHLIGHT) {
			thAuthors[thAuthors.length - 1].parentNode.removeChild(thAuthors[thAuthors.length - 1]);
		}

	  	var thAuthors = document.getElementsByClassName("th_author");
		for (var i = 2; i < HIGHLIGHT; ++ i) {
			try {
				var ahref = thAuthors[i].firstElementChild.href;
				var author = /un=(.*)/g.exec(ahref)[1];
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://tieba.baidu.com/i/data/panel?un=" + author,
					onload: function (j) {
						var func = function (response) {
							var regex = /class="head_img"\ssrc="(.*)"\s\>/g;
							var matches = regex.exec(response.responseText);
						    var gravatarUrl = matches[1];

						  	var thWs = document.getElementsByClassName("th_w1");
					  		var gravatar = document.createElement("img");
							gravatar.src = gravatarUrl;
							gravatar.style.maxHeight = "50px";
							gravatar.style.maxWidth = "50px";
							gravatar.style.marginTop = "5px";
							gravatar.style.borderRadius = "3px 3px 3px 3px";
							thWs[j].appendChild(gravatar);
						};
						return func;
					}(i)
				});

				var thReplyer = thAuthors[i].nextElementSibling;
				while (!thReplyer.classList.contains("th_replyer")) {
					thReplyer = thReplyer.nextElementSibling;
				}
				var rehref = thReplyer.firstElementChild.href;
				var replyer = /un=(.*)/g.exec(rehref)[1];
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://tieba.baidu.com/i/data/panel?un=" + replyer,
					onload: function (j) {
						var func = function (response) {
							var regex = /class="head_img"\ssrc="(.*)"\s\>/g;
							var matches = regex.exec(response.responseText);
						    var gravatarUrl = matches[1];

						  	var thWs = document.getElementsByClassName("th_w1");
					  		var gravatar = document.createElement("img");
							gravatar.src = gravatarUrl;
							gravatar.style.maxHeight = "30px";
							gravatar.style.maxWidth = "30px";
							gravatar.style.marginTop = "5px";
							gravatar.style.position = "absolute";
							gravatar.style.left = "30px";
							gravatar.style.top = "55px";
							gravatar.style.borderRadius = "3px 3px 3px 3px";
							thWs[j].appendChild(gravatar);
							thWs[j].style.position = "relative";
						};
						return func;
					}(i)
				});
			} catch (err) {
				continue;
			}
		}
	} else if (document.URL.match(/\/p\//)) {
		// Latest reply
		var ding = document.getElementsByClassName("p_ding_last")[0];
		var dingData = eval("(" + ding.getAttribute("field-data") + ")");
		var dingHref = "#" + dingData.post_id;
		var btnList = document.getElementsByClassName("d_thread_btns")[0];
		var liLast =  document.createElement("li");
		var aLast = document.createElement("a");
		aLast.href = dingHref;
		aLast.addEventListener(
			"click",
			function (post_id) {
				var func = function () {
					var a = document.getElementsByName(post_id)[0];
					var divReply = a.nextElementSibling;
					while (!divReply.classList.contains("d_post_reply")) {
						divReply = divReply.nextElementSibling;
					}
					var lzlContainer = divReply.children[1].children[0];
					lzlContainer.style.display = "block";
				};
				return func;
			} (dingData.post_id),
			"true"
		);
		aLast.innerHTML = "最新";
		aLast.className = "j_quick_reply";
		liLast.appendChild(aLast);
		btnList.appendChild(liLast);

		// Lowest
		var lposts = document.getElementsByClassName("l_post");
		var liLowest = document.createElement("li");
		var aLowest = document.createElement("a");
		aLowest.href = "##" + lposts.length;
		aLowest.innerHTML = "底楼";
		aLowest.className = "j_quick_reply";
		liLowest.appendChild(aLowest);
		btnList.appendChild(liLowest);

		// Do not display lzl
		var lzls = document.getElementsByClassName("j_lzl_container");
		for (var i = 0; i < lzls.length; ++ i) {
			lzls[i].style.display = "none";
		}

		var link_folds = document.getElementsByClassName("lzl_link_fold");
		for (var i = 0; i < link_folds.length; ++ i) {
			link_folds[i].style.display = "none";
		}

		var link_unfolds = document.getElementsByClassName("lzl_link_unfold");
		for (var i = 0; i < link_unfolds.length; ++ i) {
			link_unfolds[i].style.display = "inline";
		}
	}
})();