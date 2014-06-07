// ==UserScript==

// @name           DoubanMuzikDiggin

// @namespace      http://www.douban.com/people/down2crawl/

// @description    diggin muzik from blogspot.com 2 douban

// @include        http://www.douban.com/subject/*

// @exclude        http://www.douban.com/subject/discussion/*

// @exclude        http://www.douban.com/subject/*/collections*

// @exclude        http://www.douban.com/subject/*/doings*

// @exclude        http://www.douban.com/subject/*/wishes*

// @exclude        http://www.douban.com/subject/*/edit*

// @exclude        http://www.douban.com/subject/*/detail_edit*

// @exclude        http://www.douban.com/subject/*/update_image*

// @exclude        http://www.douban.com/subject/*/new_post*

// @exclude        http://www.douban.com/subject/*/new_review*

// @exclude        http://www.douban.com/subject/*/group_collectors*

// @exclude        http://www.douban.com/subject/*/discussion*

// @exclude        http://www.douban.com/subject/discussion*

// @exclude        http://www.douban.com/subject/*/new_offer*

// @exclude        http://www.douban.com/subject/*/offers*



// ==/UserScript==



if(typeof unsafeWindow.jQuery !== "undefined") {

  var jQuery = unsafeWindow.jQuery;

  var $ = jQuery 

}



$(document).ready(function(){



	function getContentByRegExp (myRegExp, queryStr){

		var re = new RegExp(myRegExp, "g");

		var returnArr = re.exec(queryStr);



		if (returnArr != null) {

			return returnArr;

		}

	}



	function addStyle(css){

		var head, style;

		head = document.getElementsByTagName('head')[0];

		style = document.createElement('style');

		style.type = 'text/css';

		style.innerHTML = css;

		head.appendChild(style);

	}



	function addClickForDiggin (){

		$("a.diggin").click(function(){

			var digginId = $(this).attr("id");

			window.setTimeout(function(){getResultOfGoogle(digginId);}, 100);

		});

	}



	function getResultOfGoogle (digginId){

		var loadingArea = "<h1>Loading...</h1></br>";

//		loadingArea = loadingArea + "<span id=\"loadingicon\" style=\"display: block;\"><div style=\"line-height: 30px; text-align: center; margin: 20px;\" ><img src=\"http://pic.yupoo.com/down2crawl/601975728339/5c6xq7dk.jpg\" border=\"0\"></div></span><br/>";

		loadingArea = loadingArea + "<span id=\"loadingicon\" style=\"display: block;\"><div style=\"line-height: 30px; text-align: center; margin: 20px;\" ><img src=\"http://pic.yupoo.com/burning/651104b80dd1/pimsz51w.jpg\" border=\"0\"></div></span><br/>";

		$(changeArea).html(loadingArea+originalText);



		var searchBase;

		searchBase = QUERY[digginId];

//		alert(searchBase);

		var searchDetail = " site:blogspot.com download||rapidshare||megaupload||sendspace||zshare||sharebee||mediafire||badongo||divshare||yousendit||filefront";

		var searchQuery = encodeURIComponent(searchBase + searchDetail);

		var googleLink = "http://www.google.cn/search?q=" + searchQuery + "&num=100";



		GM_xmlhttpRequest({

			method:"GET",

			url:googleLink,

			headers:{

				"User-Agent":"Mozilla/5.0",      

				"Accept":"text/xml",

			},

			onerror:function(response){ alert("Can not connect Google corectly!"); },

			onload:function(response) {

				if (response.status == 200){

					var searchResult = response.responseText;

					searchResult = searchResult.replace(/[\r\n]/g,"").replace(/<a /g, "\n");

					var eachLines = searchResult.split("\n");

					var titleArr = [], abstArr = [], urlArr = [];

					for (var i = 0; i < eachLines.length; i++) {

						var titleRec = getContentByRegExp(RE.TITLE, eachLines[i]);

						if (titleRec != undefined) titleArr.push(titleRec[1]);



						var abstRec = getContentByRegExp(RE.ABST, eachLines[i]);

						if (abstRec != undefined) abstArr.push(abstRec[1]);



						var urlRec = getContentByRegExp(RE.URL, eachLines[i]);

						if (urlRec != undefined) urlArr.push(urlRec[0]);

					}

//					alert(titleArr.length+"|"+abstArr.length+"|"+urlArr.length);



					var redKeyword = "<style>em {color: #cc0033;font-weight: normal;font-style: normal;}</style>"

					var resultHead = "<div id=\"__dope\" class=\"down2crawl\">";

					var resultFoot = "</div><br/>";

					var resultMore = "<a href=\"" + googleLink + "\" target=_blank >[Get More\@Google] </a><br/>";

					var resultLine = "";

					var resultNext = URI.ResultNext;

					var resultPrev = URI.ResultPrev;

					var pageLines = 4;



					if (titleArr.length != 0 && abstArr.length != 0 && urlArr.length != 0){

						if (urlArr.length < pageLines) {pageLines = urlArr.length;}

						for (var j = 0 ; j < pageLines ; j++) {

							resultLine = resultLine + "<li><h3><a " + urlArr[j] + " target=\"_blank\">" + titleArr[j] + "</a></h3><p>" + abstArr[j] + "</p></li>";

						}

					}else{

						resultLine = resultLine + "<h1>No Result 4 diggin [" + searchBase + "]</h1>";

					}



					var resultRecord = resultHead + resultLine + resultFoot;

					if (resultLine.length > 500){resultRecord = resultPrev + resultNext + resultRecord + resultPrev + resultNext };

					$(changeArea).html(redKeyword+URI.BACK+BUTTON[digginId]+resultRecord+originalText);

					addClickForDiggin();

					document.location.hash = "__back";



//					$('a.blogspotUrl').hover(function () {

//						$(this).css({ backgroundColor:"#d5ddf3", fontWeight:"bolder" });

//					});



					var dopeCss = "#__dope{background:#d5ddf3;color:#000;padding:5px 1px 4px;border-top:1px}";

					addStyle(dopeCss);



					var beginLines = 0;

					$("a.pagedown").click(function(){

						beginLines = beginLines + pageLines;

//						following line is just temp method

						if ((beginLines + pageLines) <= urlArr.length){

							var newPage = "<div class=\"new_crawl\">";						

							for (var j = beginLines ; j < beginLines+pageLines ; j++) {

								newPage = newPage + "<li><h3><a " + urlArr[j] + " target=\"_blank\">" + titleArr[j] + "</a></h3><p>" + abstArr[j] + "</p></li>";

							}

							newPage = newPage + "</div>";

							$("div.down2crawl").html(newPage);

							document.location.hash = "__back";

						}else{

							alert("Do You Want More?!!!??!");

						}

					});



					$("a.pageup").click(function(){

						beginLines = beginLines - pageLines;

						if (beginLines >= 0){

							var newPage = "<div class=\"new_crawl\">";						

							for (var j = beginLines ; j < beginLines+pageLines ; j++) {

								newPage = newPage + "<li><h3><a " + urlArr[j] + " target=\"_blank\" >" + titleArr[j] + "</a></h3><p>" + abstArr[j] + "</p></li>";

							}

							newPage = newPage + "</div>";

							$("div.down2crawl").html(newPage);

							document.location.hash = "__back";

						}else{

							alert("At The Beginning!");

						}

					});



					$("a.go_back").click(function(){

						$(changeArea).html(URI.PERFORMER+URI.ALBUM+URI.BOTH+originalText);

						addClickForDiggin();

						document.location.hash = "maxw";

					});



				}else{

					alert("Can not connect Google corectly!");

				}

			}	

		});

	}

	

	var RE = {

		TITLE: ">(.*)</a></h3>",

		ABST: "<div class=\"s\">(.*)<br><cite>",

		URL: "^href=\"http://(\\S+).blogspot.com(\\S+) target=_blank class=l",

		AREA: "^(\\S+) &nbsp; &middot",

		COLLECT: "加入我的收藏",

	};



	var URI = {

		PERFORMER: "<a href=\"javascript:void(0)\" id=\"diggin_performer\" class=\"diggin\">[Diggin performer] </a>",

		ALBUM: "<a href=\"javascript:void(0)\" id=\"diggin_album\" class=\"diggin\">[Diggin album] </a>",

		BOTH: "<a href=\"javascript:void(0)\" id=\"diggin_both\" class=\"diggin\">[Diggin both] </a>",

		BACK: "<a href=\"javascript:void(0)\" id=\"__back\" class=\"go_back\">[Go Back] </a>",

		ResultPrev: "<a href=\"javascript:void(0)\" id=\"page_prev\" class=\"pageup\">[Previous Page] </a>",

		ResultNext: "<a href=\"javascript:void(0)\" id=\"page_next\" class=\"pagedown\">[Next Page] </a>",

	};



	var BUTTON = {

		"diggin_performer": URI.ALBUM+URI.BOTH,

		"diggin_album": URI.PERFORMER+URI.BOTH,

		"diggin_both": URI.PERFORMER+URI.ALBUM,

	};



//	following lines 4 performorer deep analysis like " &amp; ", ", "

	var performerTotal = $("a[@href^='/subject_search?search_text=']");

	var performerDiggin = "";

	if (performerTotal){

		if (performerTotal.length == 1){

			performerDiggin = "\"" + performerTotal.html() + "\"";

		}else{

			for (var k = 0; k < performerTotal.length; k++){

				performerDiggin = performerDiggin + " \"" + $(performerTotal[k]).html() + "\"";	

			}

		}

	}

//	end



    var QUERY = {

        "diggin_album": "\"" + $($("h1")[0]).html() + "\"",

        "diggin_performer": "\"" + $("a[@href^='/music/search/']").html() + "\"",

        "diggin_both": "\"" + $("a[@href^='/music/search/']").html() + "\" " + "\"" + $($("h1")[0]).html() + "\"",     };





	var subjectCat = $("a.now");

	if (subjectCat && subjectCat.attr("href") == "/music/") {

		var changeArea = $("h2")[0];

		if ($("h2").length <= 3) {

			changeArea = $("div.related_info"); 

		}

		if (getContentByRegExp(RE.COLLECT, $(changeArea).html()) != undefined) {

			changeArea = $("h2")[1];

		}

		var originalText = "<br/><br/>" + $(changeArea).html();



		$(changeArea).html(URI.PERFORMER+URI.ALBUM+URI.BOTH+originalText);

		addClickForDiggin();

	}

});



/*

* Change Log:

* 1.1.3  - 2008-10-07 - resolve wrong position of search area in some pages

* 1.1.2  - 2008-08-21 - deal with google changing some html labels and add style for red keyword

* 1.1.1  - 2008-05-28 - performer path from "/subject_search?search_text=" to "/music/search/"

* 1.1.0  - 2008-05-05 - styled page up/down, add hooks

* 1.0.1  - 2008-04-16 - add some exclude pathes and page up/down

* 1.0.0  - 2008-04-15 - initial version

*/
