// ==UserScript==
// @name        oabt.org gets douban
// @namespace   oabt
// @include     http://oabt.org/show.php*
// @require     http://res.yyets.com/js/jquery-1.7.1.min.js
// @copyleft    Wooooo
// @version     1.2
// history
// 1.0			从 yyets.com get douban 改改就成了这个
// 1.1			改进有些电影名称取不到的问题
// 1.2			继续改进有些电影名称取不到的问题
// ==/UserScript==

$(document).ready(
	function()
	{
		// get movie title
		var movieTitle = "";
		var strRaw = $('div.component td.name p a').text();
		var arrayRawByDot = strRaw.split(".");
		var reAllNumOrCN=/^[\u4E00-\u9FA5\uF900-\uFA2D\d：:\s]*$/;
		var reAllNum=/^[\d\s]*$/;
		var reSymbols = /[\s\[\]():：-]*/g;
		
		for(var i = 0; i<arrayRawByDot.length; i++)
		{
			var candidate = arrayRawByDot[i];
			candidate = candidate.replace(reSymbols, "");
			console.log(candidate);
			if(candidate.length>1 && reAllNumOrCN.test(candidate) && !reAllNum.test(candidate))
			{
				// 取中文名称
				movieTitle = candidate;
				break;
			}
		}
		
		if (movieTitle == "")
		{
			var arrayRawBySpace = strRaw.split(" ");
			// console.log("failed to get movie title. 1st try");
			for(var i = 0; i<arrayRawBySpace.length; i++)
			{
				var candidate = arrayRawBySpace[i];
				candidate = candidate.replace(reSymbols, "");
				console.log(candidate);
				if(candidate.length>1 && reAllNumOrCN.test(candidate) && !reAllNum.test(candidate))
				{
					// 取中文名称
					movieTitle = candidate;
					break;
				}
			}
		}
		
		
		if (movieTitle == "")
		{
			console.log("failed to get movie title.");
			return;
		}
		else
		{
			console.log("movieTitle:" + movieTitle);
		}
		
		$('head').append("<style type='text/css'>\n" +
			" #douban .itemTit{padding:5px; background:-moz-radial-gradient(center bottom , #FF0000, transparent) repeat scroll 0 0%, -moz-linear-gradient(center top , #545454 48%, #333333 49%, #000000 85%, #333333) repeat scroll 0 0 transparent !important;}\n" +
			" #douban table{border: 1px dotted #AAAAAA; border-collapse: separate;}\n" +
			" #douban .clearfix:after{content:'.';display:block;height:0;clear:both;visibility:hidden}\n" +
			" #douban .clearfix{zoom:1;display:inline-block;_height:1px}\n" +
			" #douban *html .clearfix{height:1%}\n" +
			" #douban *+html .clearfix{height:1%}\n" +
			" #douban .clearfix{display:block}\n" +
			" #douban .pl{font:12px Arial,Helvetica,sans-serif;line-height:150%;color:#666}\n" +
			" #douban .pl2{font:14px Arial,Helvetica,sans-serif;line-height:150%;color:#666}\n" +
			" #douban .gact{color:#bbb;font-size:12px;text-align:center;cursor:pointer}\n" +
			" #douban .gact a:link,a.gact:link{color:#bbb;font-size:12px;text-decoration:none;text-align:center}\n" +
			" #douban .gact a:visited,a.gact:visited{color:#bbb;font-size:12px;text-decoration:none;text-align:center}\n" +
			" #douban .gact a:hover,a.gact:hover{color:#fff;font-size:12px;border-left:1px solid #f99;border-top:1px solid #f99;border-right:1px solid #f33;border-bottom:1px solid #f33;background-color:#733;text-align:center}\n" +
			" #douban .infobox a.gact:link,.infobox a.gact:visited,.infobox .gact a:link,.infobox .gact a:visited{border-color:#fff6ee}\n" +
			" #douban .infobox a.gact:hover,.infobox .gact a:hover{border-color:#f99 #f33 #f33 #f99}\n" +
			" #douban .starstop{float:left;background:url(http://img3.douban.com/pics/all_star.gif);display:block;width:50px;height:14px;margin:1px 0 0 7px}\n" +
			" #douban .sub_ins .starstop{float:none;width:50px;display:inline;position:absolute}\n" +
			" #douban .stars{display:-moz-inline-block;display:inline-block;background:url(http://img3.douban.com/pics/stars.gif);width:50px;height:14px;margin:1px 0 0 7px}\n" +
			" #douban .stars4{background-position:left 61px}\n" +
			" #douban .stars3{background-position:left 45px}\n" +
			" #douban .stars2{background-position:left 30px}\n" +
			" #douban .stars1{background-position:left 15px}\n" +
			" #douban .thumblst .thumb .pl{padding:2px;border:1px solid #ddd;margin-bottom:6px;background:#fff}\n" +
			" #douban .allstar50,.allstar45,.allstar40,.allstar35,.allstar30,.allstar25,.allstar20,.allstar15,.allstar10,.allstar05{display:inline-block;*display:inline;*zoom:1;height:12px;overflow:hidden;width:55px;font:12px/1 tahoma;background:url(http://img3.douban.com/pics/allstar.gif) no-repeat 0 0;margin-bottom:7px}\n" +
			" #douban .allstar50{background-position:0 0}\n" +
			" #douban .allstar45{background-position:0 -12px}\n" +
			" #douban .allstar40{background-position:0 -24px}\n" +
			" #douban .allstar35{background-position:0 -36px}\n" +
			" #douban .allstar30{background-position:0 -48px}\n" +
			" #douban .allstar25{background-position:0 -60px}\n" +
			" #douban .allstar20{background-position:0 -72px}\n" +
			" #douban .allstar15{background-position:0 -84px}\n" +
			" #douban .allstar10{background-position:0 -96px}\n" +
			" #douban .allstar05{background-position:0 -108px}\n" +
			" #douban .movie_headerline .allstar50,.movie_headerline .allstar45,.movie_headerline .allstar40,.movie_headerline .allstar35,.movie_headerline .allstar30,.movie_headerline .allstar25,.movie_headerline .allstar20,.movie_headerline .allstar15,.movie_headerline .allstar10,.movie_headerline .allstar05,.star .allstar50,.star .allstar45,.star .allstar40,.star .allstar35,.star .allstar30,.star .allstar25,.star .allstar20,.star .allstar15,.star .allstar10,.star .allstar05{float:left;margin-top:3px}\n" +
			" #douban .clearfix:after{content:'.';display:block;height:0;clear:both;visibility:hidden}\n" +
			" #douban .clearfix{zoom:1;display:inline-block;_height:1px}\n" +
			" #douban *html .clearfix{height:1%}\n" +
			" #douban .clearfix{display:block}\n" +
			" #douban .rating_num{color:red;font-size:14px;line-height:18px;padding:0 0 0 8px}\n" +
			" #douban .rating_nums{color:#ff5138;font-size:18px;padding:0 5px 0 0}\n" +
			" #douban .footer{background:none !important; height:20px !important; padding:0 !important;}\n" +
			" #douban .result-item {border-bottom: medium none;border-top: 1px dashed #CCCCCC;margin: 0;padding: 10px 0; }\n" +
			" #douban .result-item .content {color: #666666;display: inline-block;vertical-align: top;width: 460px; }\n" +
			" #douban .result-item .pic {display: inline-block;text-align: left;width: 100px; }\n" +
			"  </style>");
		
		$('div.component').after("<div id='douban' class='box_4'> <div class='itemTit'><h2 style='color:#fff'>还是豆瓣的评分靠谱</h2></div> </div> <div class='blank'></div>");

		GM_xmlhttpRequest
		(
			{
				method: "GET",
				url: "http://movie.douban.com/subject_search?search_text=" + movieTitle + "&cat=1002",
				onload: function(response) 
				{
					var doubanResponse = response.responseText;
					
					$("#douban").append($(doubanResponse).find('div[class=article]'));
					
					if ($("#douban div[class=article]").html().trim().length > 0)
					{
						// change style
						$("#douban").css("background-color", "#f3f3f3");
						$("#douban").css("overflow", "auto");
						$("#douban").css("min-height", "220px");
						$("#douban").css("max-height", "520px");
						$("#douban .article").css("border-bottom", "1px solid #BBBBBB");
						$("#douban #content").css("min-height", "0px");
						$("#douban #wrapper").css("width", "700px");
						$("#douban .bd").css("width", "80%");
						// change behavior: open link in new tab
						$("#douban .pl2 a").attr("target", "_blank");
					}
					else
					{
						console.log("http://movie.douban.com/subject_search?search_text=" + movieTitle + "&cat=1002");
						console.log(doubanResponse);
					}
				}
			}
		);
	}
);