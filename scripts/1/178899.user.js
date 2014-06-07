// ==UserScript==
// @name       duokan2db
// @namespace  http://userscripts.org/scripts/show/178899
// @version    0.3
// @description  better duokan
// @match      http://www.duokan.com/*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// ==/UserScript==
! function () {
    var imgdata = "data:image/png;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAABILAAASCwAAAAEAAAABAAA4jSoAEHMAAIW4fQCtz6gAQZIzAODt3gAQcgAARJQ3AFCbRAA3iikA3uzcAKvNpQDL4cgAFHQEADiMKgBfpFQAN4oqAD+OMgCRwIkAQJAyACqDGwBHkzsAR5Y6ABV3BABEkDcARJE3ACqFGwBQmkQA3OvZAIa4fQA2iikAQ5Q2AF+hVADb6tkAcKpmAFCYRABDkDYAkL6JAEiWOwCZxZIAzOHIAIa5fQBHlDoArtCoAJnEkgBwrWYAPo4xADaJKQCszqYAOIsrAIS3fAA4iyoAEXYAABF1AAARdAAA////ABF3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDg1NgE2NjY2NjY2NgE2EzgPKwMwCzAwMDALMAMDIDU4Jzc3Nzc3Nzc3Nzc3Nyw0ODg4OBI3IjU4LTclATQ4ODg4ODQFNw02NRc3BQY2NDg4ODgbNzcvLhEeNzcjATU4ODgmNzc3Nzc3Nzc3NxU1ODg4BzchEAAAAAAAHDcYNTg4OB83DAY2NTU1NSg3JDU4ODgHNwoxMTExMTEKNxk1ODg4Fjc3Nzc3Nzc3NzcqNDg4ODQOMwkzMzMzCTMzNjU0OBopHQIyMjIyMjICAgIUNDgINzc3Nzc3Nzc3Nzc3CDg4ODg4ODg4ODg4ODg4ODg4BDg4ODg4ODg4ODg4ODg4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    function mlook() {
    	var query = $('.m-bookdata.j-bookdata.f-cb .cover img').attr('alt');
        var timestamp = new Date().getTime();
    	var murl = "http://www.mlook.mobi/api/search?q={{query}}&limit=1&f=douban&timestamp="+timestamp;
    	murl = murl.replace("{{query}}", query);
    	GM_xmlhttpRequest({
                method: 'GET',
                url: murl,
            	onload: function (res) {
                    var btn;
                    if (res.responseText != '[]'){
                		var rejson = JSON.parse(res.responseText);
                    	var id = rejson['bookid'];
                        var downloads = rejson['downloads'];
                    	var durl = "http://www.mlook.mobi/book/info/"+id+"?rel=doubanbook2mlook";
                    	btn = '<a href="'+durl+'"  title="点击去 www.mlook.mobi 下载电子版" style="float:left;display: inline-block;background: #33A057;border: 1px solid #2F7B4B;color: white;padding: 1px 10px;border-radius:3px;margin-right: 8px;" target="_blank">mLook 存在，推送下载未知</a>';
                        if (Number(downloads) >= 1) {
                            btn = btn.replace('推送下载未知','可推送下载');
                    	}
                    	}
                    else {
                    	btn = '<p style="float:left;display: inline-block;background: #8D37C3;border: 1px solid #8D37C3;color: white;padding: 1px 10px;border-radius:3px;margin-right: 8px;" target="_blank">mLook尚无此书</p>';
                    }
                    btn = $(btn);
            		$('div.j-action').before(btn);
                	}
        });
    }
    
    function getISBN() {
        var isbn = "";
        var infos = $($('.cnt.j-cnt')[2]).find('li');
        //遍历目标节点获取isbn
        for (var i = 0; i <= 10; i++) {
            var info = infos[i];
            var infostr = $(info).text();
            if (infostr.substr(0, 2) == "书号") {
                isbn = infostr.substr(3);
                break;
            }
        }
        return isbn;
    }

    function kindle() {
        if (/www\.duokan\.com\/[\s\S]+\/b\/[\s\S]+/.test(location.href)) {
            var keyword = encodeURIComponent($($('.m-bookdata.j-bookdata.f-cb h1')).text().trim());

            var kprice = $('.g-mn .price')[0];
            var kcprice = kprice.childNodes[0];
            var kdbox = document.createElement('div');
            kdbox.id = 'kdbox';

            kprice.insertBefore(kdbox, kcprice);
            var kindleURL = 'http://www.amazon.cn/s?url=search-alias%3Ddigital-text&field-keywords=' + getISBN();
            kdbox.innerHTML = '<h2>亚马逊Kindle(<a target="_blank" href="http://www.amazon.cn/s?url=search-alias%3Ddigital-text&field-keywords=' + keyword + '">全部</a>) </h2>\
				<ul class="bs noline more-after" id="showKindle"></ul>';
            GM_addStyle('#kdbox ul li{white-space:nowrap; text-overflow:ellipsis;}');

            GM_xmlhttpRequest({
                method: 'GET',
                url: kindleURL,
                onload: function (resp) {

                    if (resp.status < 200 || resp.status > 300) {
                        $('#noKindleSource').style.display = '';
                        return;
                    };

                    var pageDOM = document.createElement('html');
                    pageDOM.innerHTML = resp.responseText;
                    
                    var otherResults = pageDOM.querySelector('#categoryCorrectedResults');

                    var prodUnit = pageDOM.querySelector('.prod');
                    if ( !! prodUnit) {
                        var title = prodUnit.querySelector('h3>a').textContent;
                        var brackets = title.match(/[\(（].*[）\)]/);
                        if ( !! brackets && brackets[0].length > 7) {
                            title = title.replace(/[\(（].*[）\)]/, '');
                        };
                        var href = prodUnit.querySelector('a');
                        href = (href.toString()).replace(/duokan\.com/, 'amazon\.cn');
                        var priceNum = prodUnit.querySelector('.newp>a>.red').textContent.replace(/[^-\.\d]/g, '');
                        var price = (Number(priceNum) > 0) ? ('RMB ' + priceNum) : '<b>免费</b>';

                        kdbox.innerHTML += '<li>\
							<a target="_blank" href="' + href + '" title="' + title + '">\
								<span>' + title + '</span>\
								<span class="buylink-price">( <span>' + price + '</span> )</span>\
							</a>\
						</li>';
                        kdbox.style.display = '';
                    };
                },
                onerror: function () {
                    return;
                }
            });
        };
    };
    //rating function
    function dk2db() {
        var isbn = getISBN();
        
        if (isbn != "") {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://api.douban.com/book/subject/isbn/' + isbn + '?alt=json',
                onload: function (res) {
                    var rejson = JSON.parse(res.responseText);

                    var numRaters = rejson['gd:rating']['@numRaters'];
                    var average = rejson['gd:rating']['@average'];
                    var link = rejson['link'][1]['@href'];
                    var pemp = $($('.w-starfive')[0]).parent()[0];
                    var ppemp = pemp.childNodes[5];
                    var pos;

                    if (average < 1) pos = -151;
                    else if (average >= 1 && average < 2) pos = -136;
                    else if (average >= 2 && average < 3) pos = -121;
                    else if (average >= 3 && average < 4) pos = -106;
                    else if (average >= 4 && average < 5) pos = -91;
                    else if (average >= 5 && average < 6) pos = -76;
                    else if (average >= 6 && average < 7) pos = -61;
                    else if (average >= 7 && average < 8) pos = -46;
                    else if (average >= 8 && average < 9) pos = -31;
                    else if (average >= 9 && average < 10) pos = -16;
                    else if (average == 10) pos = -1;

                    var htmlstr = document.createElement("div");
                    htmlstr.style.cssText = "margin-bottom:20px";
                    htmlstr.innerHTML = "豆瓣评分:<span style='background-image:url(http://img3.douban.com/pics/all_bigstars.gif); background-repeat:no-repeat; background-position:0px " + pos + "px; width:75px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>";

                    if (numRaters < 10) htmlstr.innerHTML += "<span>&nbsp少于10人评价&nbsp<a href='" + link + "'>链接</a></span>";
                    else htmlstr.innerHTML += "<span>" + average + "&nbsp(" + numRaters + "人评价)&nbsp<a href='" + link + "'>链接</a></span>";
                    pemp.insertBefore(htmlstr, ppemp);
                    GM_xmlhttpRequest({
                		method: 'GET',
                		url: link,
                        onload: function (res) {
                            var pageDOM = document.createElement('html');
                    		pageDOM.innerHTML = res.responseText;
                            //需要对标题做个判断，这里也可以把纸质书的价格迭代获取！！！todolist
                            var bparent = $('.g-mn .price')[0];
            				var bpchild = bparent.childNodes[0];
                            var bhtml = document.createElement("div");
                            if (pageDOM.querySelector("#buyinfo-ebook") != null) {
                            	var btitle = pageDOM.querySelector('.bs.noline.more-after>li>a>span').textContent.trim();
                            	var priceNum = pageDOM.querySelector('.buylink-price').textContent.trim().replace(/[^-\.\d]/g, '');
                        		var bprice = (Number(priceNum) > 0) ? ('（RMB ' + priceNum+'）') : '<b>免费</b>';
                            
                            	bhtml.innerHTML += "<p>豆瓣电子书:</p><a href='"+link+"'>"+btitle+"</a>"+bprice;
                                bparent.insertBefore(bhtml,bpchild);
                            }else {
                                bhtml.innerHTML += "<p>豆瓣暂无此电子书出售</p>";
                                bparent.insertBefore(bhtml,bpchild);
                            }
                        }
                    });
                }
            });
        } else {
            var pemp = $($('.w-starfive')[0]).parent()[0].childNodes[3];
            var ppemp = pemp.childNodes[2];
            var htmlstr = document.createElement("div");
            htmlstr.style.cssText = "margin-bottom:20px";
            htmlstr.innerHTML = "<span>也许这本书还未出版，所以未能获取在豆瓣上的信息</span>"
            pemp.insertBefore(htmlstr, ppemp);
        }
    }
  
    function dsearch1(query) {
        var tt = query;

        for (var i = 0; i < tt.length; i++) {
            var parnode = query[i];
            var childnode = parnode.childNodes[0];
            var htmlstr = document.createElement("span");
            htmlstr.innerHTML = '<span><a target="_blank" href="http://book.douban.com/subject_search?search_text=' + $(tt[i]).text() + '"> <img src="'+imgdata+'" title="在豆瓣查找" /></a></span>';
            parnode.insertBefore(htmlstr, childnode);
        }
    }

    var url = window.document.URL;
    re1 = /www\.duokan\.com\/[\s\S]+\/c\/[\s\S]+/;
    re2 = /www\.duokan\.com\/r\/[\s\S]+/;
    re3 = /www\.duokan\.com\/[\s\S]+\/b\/[\s\S]+/;
    re4 = /www\.duokan\.com\/[\s\S]+\/l\/[\s\S]+/;
    re5 = /www\.duokan\.com\/tag\/[\s\S]+/;
    re6 = /www\.duokan\.com\/p\/[\s\S]+/;
    re7 = /www\.duokan\.com\/author\/[\s\S]+/;
    re8 = /www\.duokan\.com\/search\/[\s\S]+/;
    if (re1.test(url)) {
        var qt1 = $('.w-tab.j-tab .title');
        dsearch1(qt1);
    } else if (re2.test(url)) {
        var qt2 = $('.title');
        dsearch1(qt2);
    } else if (re3.test(url)) {
        var qq1 = $('.m-recommend.j-recommend-page .title');
        dsearch1(qq1);
        var qt2 = $('.m-bookdata.j-bookdata.f-cb h1');
        qt2[0].innerHTML += '<span><a target="_blank" href="http://book.douban.com/subject_search?search_text=' + qt2.text() + '"> <img src="'+imgdata+'" title="在豆瓣查找" /></a></span>';
        dk2db();
        kindle();
        mlook();
        

    } else if (re4.test(url)) {
        var qt3 = $('.title');
        dsearch1(qt3);
    } else if (re5.test(url)) {
        var qt4 = $('.m-tag.j-area .title');
        dsearch1(qt4);
    } else if (re6.test(url)) {
        var qt5 = $('.m-publish-list .w-list.j-area .title');
        dsearch1(qt5);
    } else if (re7.test(url)) {
        var qt6 = $('.w-list2.j-list .title');
        dsearch1(qt6);
    } else if (re8.test(url)) {
        var qt7 = $('.title');
        dsearch1(qt7);
    } else {

        var q00 = $('.m-recommend .itm.j-bookitm .title');
        dsearch1(q00);
        var q01 = $('.m-discount .itm.j-bookitm .title');
        dsearch1(q01);
        var q02 = $('.m-new .itm.j-bookitm .title');
        dsearch1(q02);
        var q03 = $('.m-publish.j-publish .itm.j-bookitm .title');
        dsearch1(q03);


        var q1 = $('.m-rank.j-rank .cnt.j-cnt .title');
        dsearch1(q1);

        var q2 = $('.m-bargain .title');
        dsearch1(q2);
    }
    
}();