// ==UserScript==
// @name           Boards.ie - Add Social Media Links
// @namespace      http://userscripts.org/users/436255
// @description    Adds Google+, Twitter and Facebook share buttons to Boards.ie threads, forums and posts
// @version        2.0.2
// @icon           http://s3.amazonaws.com/uso_ss/icon/125952/large.png
// @include        http://www.boards.ie/vbulletin/showthread.php*
// @include        https://www.boards.ie/vbulletin/showthread.php*
// @include        http://www.boards.ie/vbulletin/forumdisplay.php*
// @include        https://www.boards.ie/vbulletin/forumdisplay.php*
// @include        http://www.boards.ie/vbulletin/showpost.php*
// @include        https://www.boards.ie/vbulletin/showpost.php*
// ==/UserScript==

//v2.0 - Total redesign, changed to using "Share" button, instead of social media links at foot of page.
//       Changed to google share instead of +1. Added ability to share a forum. Share at the bottom of threads now only shares link to start of thread
//       Add share icon to every post for individual post-sharing. Added reddit.
//v2.0.1 - minor colour change
//v2.0.2 - reversed gradient on hover

GM_addStyle(".socialpost {" +
		"position:absolute;" +
		"top:31px;" +
		"left:-1px;" +
		"background-color:white;" +
		"border:1px solid #dddddd;" +
	"}" +
	".sharebtn{" +
		"width:60px;" +
		"height:30px;" +
		"background:#F3F3F3;" +
		"background:-webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#E4E4E4));" +
		"background:-moz-linear-gradient(top,  #ffffff,  #E4E4E4);" +
		"border:#DDDDDD 1px solid;" +
		"display:inline-block;" +
		"position:relative;" +
		"top:-11px;" +
		"text-align:center;" +
		"line-height:30px;" +
		"color:#525252;" +
		"margin-top:0px;" +
		"font-family:Arial;" +
		"font-size:13px;" +
		"font-weight:bold;" +
		"cursor:pointer;" +
	"}" +
	".sharebtn:hover{" +
		"color:#2e4a80;" +
		"background:#F3F3F3;" +
		"background:-webkit-gradient(linear, left top, left bottom, from(#E4E4E4), to(#ffffff));" +
		"background:-moz-linear-gradient(top,  #E4E4E4,  #ffffff);" +
	"}" +
	".sharebtn *{" +
		"display:block;" +
		"padding:0;" +
		"margin:0;" +
	"}" +
	".sharepagebtn{" +
		"width:60px;" +
		"height:31px;" +
		"background:#F3F3F3;" +
		"background:-webkit-gradient(linear, left top, left bottom, from(#ffffff), to(#E4E4E4));" +
		"background:-moz-linear-gradient(top,  #ffffff,  #E4E4E4);" +
		"border:#cccccc 1px solid;" +
		"position:relative;" +
		"text-align:center;" +
		"line-height:31px;" +
		"color:#444444;" +
		"font-family:Verdana;" +
		"margin-left:10px;" +
		"font-size:13px;" +
		"font-weight:bold;" +
		"cursor:pointer;" +
	"}" +
	".sharepagebtn:hover{" +
		"background:#F3F3F3;" +
		"background:-webkit-gradient(linear, left top, left bottom, from(#E4E4E4), to(#ffffff));" +
		"background:-moz-linear-gradient(top,  #E4E4E4,  #ffffff);" +
	"}" +
	".sharebtnpage *{" +
		"display:block;" +
		"padding:0;" +
		"margin:0;" +
	"}");
var loc = document.location.href;
var thread = (loc.indexOf("showthread.php") != -1);
var forum = (loc.indexOf("forumdisplay.php") != -1);
var post = (loc.indexOf("showpost.php") != -1);

var url = loc;
var title = "";
if(thread)
{
	var threadnum = document.getElementById("qr_threadid").value;
	url = "http://www.boards.ie/vbulletin/showthread.php?t=" + threadnum;
}
else if(forum)
{
	var forumnum = document.getElementsByName("f")[0].value;
	if(forumnum == "")
		forumnum = document.getElementsByName("f")[1].value;
	url = "http://www.boards.ie/vbulletin/forumdisplay.php?f=" + forumnum;
}

var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++)
{
	if((forum && links[i].href.indexOf("newthread.php") != -1 && links[i].parentNode.className != "vbmenu_option") ||
		(thread && (links[i].className == "vB_Navigation_PostReplyTop" || links[i].className == "vB_Navigation_PostReplyBottom")))
	{ 
		var td = document.createElement("td");
		td.style.width = "0px";
		var share = document.createElement("div");
		share.className = "sharepagebtn";
		share.innerHTML = "Share";
		share.value = url;
		share.addEventListener("click", function(){
				if(this.value == "exists")
				{
					if(this.getElementsByClassName("socialpost")[0].style.display == "none")
						this.getElementsByClassName("socialpost")[0].style.display = "block";
					else
						this.getElementsByClassName("socialpost")[0].style.display = "none";
				}
				else
				{
					var posturl = this.value;
					this.value = "exists";
					var socialpost = document.createElement("div");
					socialpost.className = "socialpost";
					socialpost.innerHTML =
						"<iframe src='//www.facebook.com/plugins/like.php?href=" + encodeURIComponent(posturl) + "&amp;send=false&amp;layout=button_count&amp;width=88&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:88px; height:21px;' allowTransparency='true'></iframe>" +
						"<iframe allowtransparency='true' frameborder='0' scrolling='no' src='http://platform.twitter.com/widgets/tweet_button.html?url=" + encodeURIComponent(posturl) + "' style='width:88px; height:21px;'></iframe>" +
						"<div class='g-plus' data-action='share' data-annotation='bubble' data-href='" + posturl + "'></div>" +
						"<a style='width:88px; height:21px; line-height: 0px;' href='http://www.reddit.com/submit' onclick=\"window.location = 'http://www.reddit.com/submit?url=' + " + encodeURIComponent(posturl) + "; return false\"><img style='width:88px; height:21px;' src=\"http://www.reddit.com/static/spreddit7.gif\" alt=\"submit to reddit\" border=\"0\" /></a>";
					this.appendChild(socialpost);
					//Google+ script
					window.___gcfg = {lang: 'en-GB'};
					(function() {
					  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
					  po.src = 'https://apis.google.com/js/plusone.js';
					  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
					})();
				}
			}, true);
		td.appendChild(share);
		links[i].parentNode.style.width = "0px";
		links[i].parentNode.parentNode.insertBefore(td, links[i].parentNode.nextSibling);
	}
}

if(thread || post)
{
	var unames = document.getElementsByClassName("bigusername");
	for(var i = 0; i < unames.length; i++)
	{
		var share = document.createElement("div");
		share.className = "sharebtn";
		share.innerHTML = "Share";
		share.value = "http://www.boards.ie/vbulletin/showthread.php?p=" + unames[i].parentNode.id.replace("postmenu_", "");
		share.addEventListener("click", function(){
				if(this.value == "exists")
				{
					if(this.getElementsByClassName("socialpost")[0].style.display == "none")
						this.getElementsByClassName("socialpost")[0].style.display = "block";
					else
						this.getElementsByClassName("socialpost")[0].style.display = "none";
				}
				else
				{
					var posturl = this.value;
					this.value = "exists";
					var socialpost = document.createElement("div");
					socialpost.className = "socialpost";
					socialpost.innerHTML =
						"<iframe src='//www.facebook.com/plugins/like.php?href=" + encodeURIComponent(posturl) + "&amp;send=false&amp;layout=button_count&amp;width=88&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:88px; height:21px;' allowTransparency='true'></iframe>" +
						"<iframe allowtransparency='true' frameborder='0' scrolling='no' src='http://platform.twitter.com/widgets/tweet_button.html?url=" + encodeURIComponent(posturl) + "' style='width:88px; height:21px;'></iframe>" +
						"<div class='g-plus' data-action='share' data-annotation='bubble' data-href='" + posturl + "'></div>" +
						"<a style='width:88px; height:21px; line-height: 0px;' href='http://www.reddit.com/submit' onclick=\"window.location = 'http://www.reddit.com/submit?url=' + " + encodeURIComponent(posturl) + "; return false\"><img style='width:88px; height:21px;' src=\"http://www.reddit.com/static/spreddit7.gif\" alt=\"submit to reddit\" border=\"0\" /></a>";
					this.appendChild(socialpost);
					//Google+ script
					window.___gcfg = {lang: 'en-GB'};
					(function() {
					  var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
					  po.src = 'https://apis.google.com/js/plusone.js';
					  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
					})();
				}
			}, true);
		var alt1s = unames[i].parentNode.parentNode.parentNode.parentNode.getElementsByClassName("alt1");
		var cell = alt1s[alt1s.length - 1];
		cell.insertBefore(share, cell.firstChild);
	}
}

/*
//Google+ script
window.___gcfg = {lang: 'en-GB'};
(function() {
var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
po.src = 'https://apis.google.com/js/plusone.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
})();
//Facebook script
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
//twitter script
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
*/