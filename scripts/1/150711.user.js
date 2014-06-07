// ==UserScript==
// @name		Newgrounds Downloader
// @namespace		http://userscripts.org/users/Devon
// @description		Adds a download link to Newgrounds submissions.
// @version		20121023.2
// @include		*newgrounds.com/portal/view/*
// @include		*newgrounds.com/art/view/*
// @copyright		2012+, Devon Hess
// @license		GPLv3+; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
(function() {
	if (/.*newgrounds\.com\/portal\/view\/.*/i.test(window.location)) {
		document.getElementById("flash_header").getElementsByTagName("div")[0].innerHTML = '<a onmousedown="if(document.getElementById(\'flash_embed\').getAttribute(\'data\')!==\'http://flash.ngfiles.com/video_player/videoplayer.swf\'){this.href=document.getElementById(\'flash_embed\').getAttribute(\'data\')}else{this.href=document.getElementById(\'flash_embed\').getElementsByTagName(\'param\')[3].getAttribute(\'value\').replace(/.*&url=(.*?)&.*/,\'$1\').replace(/%3A/,\':\').replace(/%2F/g,\'/\')}" href="" download="">Download this '+document.getElementsByTagName("meta")[6].getAttribute("content")+'!</a>'+document.getElementById("flash_header").getElementsByTagName("div")[0].innerHTML;
	} else if (/.*newgrounds\.com\/art\/view\/.*/i.test(window.location)) {
		document.getElementById("main").getElementsByTagName("div")[2].innerHTML = '<a href="'+document.getElementById("blackout_center").getElementsByTagName("img")[0].getAttribute("src")+'" download>Download this art!</a>'+document.getElementById("main").getElementsByTagName("div")[2].innerHTML;
	}
})();
