// ==UserScript==
// @name					Eshuyuan Book Ratings
// @namespace		http://eshuyuan.com/space-uid-8462.html
// @description		为E书园论坛(www.eshuyuan.com)的书籍添加常见网站的评分
// @version				0.1.0702
// @include				http://*eshuyuan.com/thread-*
// @include				http://*eshuyuan.com/forum.php?mod=viewthread*
// @thanks				udonmai@userscripts.org
// @author				ppdingmann-gm@yahoo.com.cn
// ==/UserScript==

var $ = function(selector) {
	return document.querySelectorAll(selector);
}

function generate_douban_grade(isbn, img) {
	GM_xmlhttpRequest({
		method:	"GET",
		url:	"http://api.douban.com/book/subject/isbn/" + isbn + "?alt=json",
		onload:	function(responseDetails) {
			var rejson = JSON.parse(responseDetails.responseText);
			var numRaters = rejson['gd:rating']['@numRaters'];
			var average = rejson['gd:rating']['@average'];
			var link = rejson['link'][1]['@href'];
			
			var pos;
			if(average < 1) pos = -150;
			else if(average >=1 && average < 2) pos = -135;
			else if(average >=2 && average < 3) pos = -120;
			else if(average >=3 && average < 4) pos = -105;
			else if(average >=4 && average < 5) pos = -90;
			else if(average >=5 && average < 6) pos = -75;
			else if(average >=6 && average < 7) pos = -60;
			else if(average >=7 && average < 8) pos = -45;
			else if(average >=8 && average < 9) pos = -30;
			else if(average >=9 && average < 10) pos = -15;
			else if(average = 10) pos = -1;
			
			var htmlstr = document.createElement("span");
			htmlstr.setAttribute('style', 'font-size:15px;' );
			htmlstr.innerHTML = 	"<br /><span style='color:#0C7823; font-weight:700;'>豆瓣</span>评分:<span style" +
												"='font-size:13px; background-image:url(http://img3.douban.com/pics/all_bigstars.gif" +
												"); background-repeat:no-repeat; background-position:0px " + pos +
												"px; width:75px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&n" +
												"bsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>";
			if(numRaters < 10) htmlstr.innerHTML += "<span>&nbsp(<a href='"+ link +"'>少于10人评价</a>)</span>";
			else htmlstr.innerHTML += "<span>"+ average +"&nbsp(<a href='"+ link +"'>"+ numRaters +"人评价</a>)</span>";

			if ( (img != null) && (img.nextSibling != null) )	img.parentNode.insertBefore(htmlstr, img.nextSibling);
			else if ( (img != null) && (img.nextSibling == null) )	img.parentNode.appendChild(htmlstr);
		}
	});
}

var posts = $(".t_f");
for (floor = 0; floor < posts.length; floor++) {
	var post = posts[floor];
	
	var postHTML = post.innerHTML;
	var postText = postHTML.replace(/<.+?>/gim,'');
	var pattern = /I ?S ?B ?N[^\d]{0,7}([\d\- x]{10,16}[\dx])/gi
	var isbns = [];
	var num = 0;
	while ( (result = pattern.exec(postText)) != null ) {
		isbns[num] = result[1];
		num++;
	}
	
	var imgs = document.evaluate(
									".//img[not(@src='static/image/common/back.gif') and (@class='zoom')]",
									post,
									null,
									XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
									null);
	
	var isbn_amount = isbns.length;
	var img_amount = imgs.snapshotLength;
	console.log(isbn_amount, img_amount);
	if (isbn_amount != 0)
		if (isbn_amount == img_amount)	for ( book_order = 0; book_order<isbn_amount; book_order++ )
			generate_douban_grade(isbns[book_order], imgs.snapshotItem(book_order));
		else if ( (isbn_amount == 1) && (img_amount == 0) )
			generate_douban_grade(isbns[0], null);
}
