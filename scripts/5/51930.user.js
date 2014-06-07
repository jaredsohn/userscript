// ==UserScript==
// @name           gamefaqs forums fix
// @namespace      boo
// @description    Removes trash from gamefaqs forums
// @include        http://www.gamefaqs.com/boards/genmessage.php*
// ==/UserScript==



// /html/body/div/div[6]/div[4]/div[3]/table/tbody/tr[*]

var list=document.evaluate("/html/body/div[2]/div/div/div/div/div/div[2]/div/div[2]/div[3]/table/tbody/tr[*]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0;i<list.snapshotLength;i++) {
	var post=list.snapshotItem(i);
	var username=post.childNodes[0].childNodes[0].innerHTML;
	var time=post.childNodes[0].childNodes[2].textContent.replace(/\n?Posted (.*) (\d+:\d+):\d+ (.*)/,"$1 $2 $3");
	
	var text=post.childNodes[1].innerHTML
		.replace(/(.*)<br>---<br>.*/,'$1')
		.replace(/(^|[^"])(http:\/\/[^\s"<>]*)/g,'$1<a href="$2">$2<\/a>');

	/* Oh wow. Thanks for letting us know, really */
	if(text.match(/\[This message was deleted at the request of the original poster\]/)){
		post.parentNode.removeChild(post);
		continue;
	}
	
	post.innerHTML="<td colspan=\"2\"><b>"+username+"</b> "+time+"<br><br> "+text+"</td>";
	post.childNodes[0].style.border="none";
}
