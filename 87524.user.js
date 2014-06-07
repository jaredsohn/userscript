// ==UserScript==
// @name           FWZ: Emoticons next to Names
// @namespace      ET IS A FAGGOT HUMPING DICK BISHOP WHO WON'T CODE SHIT THAT LEETLOL WANTS
// @include        http://*.forumwarz.com/discussions*
// @include        http://forumwarz.com/discussions*
// ==/UserScript==

function do_emots(fwz_users){
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.forumwarz.com/discussions/emoticons",
		onload: function(response) {
			table = response.responseText.replace(/\n/g,"").match(/<table.*?<\/table>/gi)[1];
			emoticons = table.match(/<tr class.*?<\/tr>/gi);
			url = [];
			emot = [];
			get_image = function(e){
				return url[emot.indexOf(e)];
			};
			for(i in emoticons){
				url.push(emoticons[i].replace(/(^.*?src="|".*)/gi, ""));
				emot.push(emoticons[i].replace(/(<\/td><\/tr>$|^.*<td>)/gi, ""));
			}
			get_width = function(n){
				x=new Image;
				x.src=get_image(n);
				return x.width+5;
			};
			h1 = document.getElementsByTagName("h1");
			for(i in h1){
				if(h1[i].children[0].innerHTML.replace("-<br>","") in fwz_users){
					name = h1[i].children[0].innerHTML.replace("-<br>","").replace(/ /g,"");
					uemot = fwz_users[h1[i].children[0].innerHTML.replace("-<br>","")]+"";
					h1[i].className = h1[i].children[0].innerHTML.replace("-<br>","").replace(/ /g,"");
					document.body.innerHTML += "<style>."+name+"{background-image:url('"+get_image(uemot)+"');background-repeat:no-repeat;padding:1px 0 0 "+get_width(uemot)+"px;height:25px;}</style>";
				}
			}
		}
	});
}
	
GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.somethingafal.com/fwzemots/",
	onload: function(response) {
		do_emots(eval("("+response.responseText+")"));
	}
});