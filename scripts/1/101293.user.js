// ==UserScript==
// @name           Tumblr - Followers Recent Post
// @namespace      http://nkymyura.tumblr.com
// @include        http://www.tumblr.com/tumblelog/*/followers*
// @include        http://www.tumblr.com/followers*
// ==/UserScript==

(function(){

var line = 1;

var h = line * 190;
var source = document.body.innerHTML;
var users = source.split("class=\"follower ");
var int = 1;

set();

GM_addStyle([
  ".follower{height:" + h + "px}",
  ".description_ img{margin:0 4px 4px 0;border:2px solid #666;vertical-align:top;}"
].join(''));


function set(){
	users[int] = users[int].replace(/[\s\S]*.*class=\"name\">.*?>(.*?)<.*[\s\S]*/,"$1");
	var link = "http://" + users[int] + ".tumblr.com/archive";
	req(link);
}

function req(link){
	GM_xmlhttpRequest({
		method : 'GET',
		url : link,
		onload : function(res){
			reg = new RegExp("<div class=\"description\">");
			if(res.responseHeaders.match(/noindex/)){
				res.responseText = res.responseText.replace(/\n/g,"");
				var img = res.responseText.split("brick photo");
				var link = res.responseText.split("brick photo");
				var posts = "";
				var postlimit = 3 * line +1;
				var count = 0;
				for(var i = 1;i < postlimit;i++){
					if(img[i]){
						img[i] = img[i].replace(/.*(<img src=\"http:\/\/\d.*?)(250|100)(\..*?)width=\"100.*[\s\S]*/,"$1100$3>");
						link[i] = link[i].replace(/.*?(http.*?)(\"|%).*[\s\S]*/g,"$1");
						posts = posts +  "<a href=\"" + link[i] + "\">" + img[i] + "<\/a>";
					}
					count++;
					if(count == 3){
						posts = posts + "<br>";
						count = 0;
					}
				}
				var text = "<div class=\"description_\">" + posts;
				document.body.innerHTML = document.body.innerHTML.replace(reg,text);
			}else{
				var text_ = "<div class=\"description_\">";
				document.body.innerHTML = document.body.innerHTML.replace(reg,text_);
			}
			int++;
			if(int<41){
				set();
			}
		}

	});
}


})();