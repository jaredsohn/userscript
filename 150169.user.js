// ==UserScript==
// @name		Feed Me
// @namespace		http://userscripts.org/users/Devon
// @description		Adds a feed button to sites that don't like to share.
// @icon		data:image/png;base64,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
// @version		20121020
// @include		*facebook.com*
// @include		*formspring.me*
// @include		*plus.google.com*
// @include		*myspace.com/*/blog*
// @include		*pinterest.com*
// @include		*twitter.com*
// @copyright		2012+, Devon Hess
// @license		GPLv3+; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
(function() {
	var feed;
	if (/.*facebook\.com.*/i.test(window.location)) {
		feed = document.getElementById("profile_pic_education").getAttribute("href").replace(/https?:\/\/www\.facebook.com\/photo\.php\?fbid=[^\.]*\.[^\.]*\.[^\.]*\.([^&]*).*/i,"https://www.facebook.com/feeds/page.php?id=$1&format=rss20");
		but = '<span class="uiButtonGroup mtm mlm actionsContents profileHeaderButton uiButtonGroupOverlay"><span class="firstItem lastItem uiButtonGroupItem buttonItem"><a class="uiButton uiButtonOverlay uiButtonLarge" href="'+feed+'" role="button" target="_blank"><span class="mrs img" style="width: 8px; height: 14px; background: url(https://s-static.ak.fbcdn.net/rsrc.php/v2/yf/x/fQQNrwWgIEw.png); display: inline-block; background-position: -55px -75px;"></span><span class="uiButtonText">Feed</span></a></span></span>';
		document.getElementById("pagelet_timeline_page_actions").innerHTML += but;
	}
	if (/.*formspring\.me.*/i.test(window.location)) {
		feed = 'http://www.formspring.me/profile/'+document.getElementsByClassName("header")[0].getElementsByTagName("h2")[0].innerHTML+'.rss';
		but = '<a href="'+feed+'" target="_blank"><input style="margin-left: 5px; margin-bottom: 19px;" class="btn" type="submit" value="Feed"></a>';
		document.getElementsByClassName("follow-ask-button-holder  ")[0].innerHTML += but;
	}
	if (/.*plus\.google\.com.*/i.test(window.location)) {
		feed = 'http://highdn-plusfeed.appspot.com/'+document.getElementById("contentPane").getElementsByClassName("oX")[0].getElementsByTagName("a")[0].getAttribute("href");
		but = '<div style="margin-top:15px; margin-left:10px;" class="er a-f-e"><a href="'+feed+'" target="_blank"><div role="button" class="a-f-e c-b c-b-T y-qa-za-b" tabindex="0" style="-webkit-user-select: none; max-width: 82px; min-width: 36px;"><span>Feed</span></div><a/></div>';
		document.getElementById("contentPane").getElementsByClassName("QX")[0].innerHTML += but;
	}
	if (/.*myspace\.com.*/i.test(window.location)) {
		feed = window.location.href.replace(/.*myspace\.com\/([^\/]*)\/blog\/?.*/i,"http://www.myspace.com/$1/blog/rss");
		but = '<nav class="gearLinks"><a href="'+feed+'" title="Rss Url" target="_blank">Rss</a></nav>';
		document.getElementsByClassName("nagNudge")[0].parentNode.removeChild(document.getElementsByClassName("nagNudge")[0]);
		if (!document.getElementsByClassName("gearLinks")[0]) {
			document.getElementsByClassName("actions")[0].innerHTML += but;
		}
	}
	if (/.*pinterest\.com.*/i.test(window.location)) {
		if (document.getElementById("BoardButton")) {
			feed = window.location.href.replace(/(.*pinterest\.com\/.*)\//,"$1.rss");
			but = '<a style="margin-left: 10px;" class="Button RedButton" href="'+feed+'" target="_blank">Feed</a>';
			document.getElementById("BoardButton").innerHTML += but;
		} else if (document.getElementsByClassName("action")[0]) {
			feed = window.location+"feed.rss";
			but = '<a style="margin-left: 10px;" class="Button RedButton" href="'+feed+'" target="_blank">Feed</a>';
			document.getElementsByClassName("action")[0].innerHTML += but;
		} else {
			feed = window.location+"feed.rss";
			but = '<a style="margin-left: 10px;" class="Button RedButton" href="'+feed+'" target="_blank">Feed</a>';
			document.getElementById("ContextBar").getElementsByClassName("FixedContainer")[0].innerHTML += but;
		}
	}
	if (/.*twitter\.com.*/i.test(window.location)) {
		feed = window.location.href.replace(/.*twitter\.com\/([^\/]*).*/i,"http://api.twitter.com/1/statuses/user_timeline.rss?screen_name=$1");
		but = '<a href="'+feed+'" target="_blank"><button class="btn signup-btn" type="button"><span class="button-text"><img style="position: relative; top: 2px;" src=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAACSElEQVQokU2QS4iOYRiGr+d53+/7/jHDDA2RhnHI4Y+FCDkfokTJwqGUorG1IkkUWdlaKBs5LRSRw8IhkbJgsNCQchgmNSwQM/P/3/e/B4uPyeLuuTfX090lPVtJ7aTZ51qaW7eokokKYgRVEBVQUCOICs6H/Gf/jytF7+s9NplcPduSjNgRB4eQVNBEMSKoKWMSRe3fZ0aykW3tO79QjfLl6KKcwVraumkf2azlhO+fcB8e4z88Qqn/DyEKPg/8HjC5VSGVVNDmUdjxM2D8DNLqOmLtJ+7ZGfyb66hhGHL1gAaTSf/xxVFdjkkNtq0d2zGHtLoBO301IISPD/CPT+AHh3D1EmyEFBUVTCJU5m+msmQ3aoTG/SMU17qIA1/RKWvQZUdx9TgMBh9RNYImgp0wi3TeNiobT1LZfgmRgLvZRRzox0xdhZm7rQTzQPCgKKgV3IsLFHcOET4/QUZ3kmw6TUzHUrtxEGKgsrSLoM34IhJ9REXBJIrUvhJ6H+Lu7sc/PQW2gl17jKLvLfmrO0hTK2l1Pb4IhBBRVUGtYDoWkO26jV15mMbzS7j3j9C2Dsy0NQx13wIgm70CX0QIlHLECGbyYqRpDDplLa4eyLuvAmA7F1J797Ls4zoJrpxqnY+5GslCz2XQjMbH7tLc5zeYV/dofOvD/frNwNPbROcILoIhl/cHqhcnzmzfGYt8WPc/e76I+KK8wZVJWpoomvPztt77ek8f1dg6tm2rRpuFGAk2EiUiCZhKRAPEEEHJa37wsvvUs/cP2pIbXiARA4gAAAAASUVORK5CYII=></span></button></a>';
		if (document.getElementsByClassName("profile-card-actions")[0]) {
			document.getElementsByClassName("profile-card-actions")[0].getElementsByTagName("div")[0].innerHTML += but;
		} else if (document.getElementsByClassName("flex-module profile-banner-footer clearfix")[0]) {
			document.getElementsByClassName("flex-module profile-banner-footer clearfix")[0].getElementsByTagName("div")[0].innerHTML += but;
		} else if (document.getElementsByClassName("follow-bar")[0]) {
			document.getElementsByClassName("follow-bar")[0].getElementsByTagName("div")[0].innerHTML += but;
		}
	}
	document.getElementsByTagName("head")[0].innerHTML += '<link rel="alternate" type="application/rss+xml" href="'+feed+'">';
})();
