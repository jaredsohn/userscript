// ==UserScript==
// @name		douban_marks_on_amazon
// @namespace		douban_marks_on_amazon
// @version		0.5
// @include		http://www.amazon.cn/*
// author		udonmai@gmail.com
// 2012-02-22		inition
// 2012-02-25		Thanks to wong2
// 2012-02-26           Taking into use
// 2012-09-16           update with the amazon.cn's update
// 2013-10-08			support the ebook pages on anmazon.cn
// ==/UserScript==

var $ = function(selector){
	return document.querySelectorAll(selector);
}

!function(){
	//var nav = $('.nav-category-button a').text;
	//if(nav !== "图书") {
	//	return;
	//}

	var isbn = "";
    var olink = "";

	var infos = $("div.content b");
	//遍历目标节点获取isbn
	for (var i = 0; i <= 10; i++) {
		var info = infos[i];
		if (info.textContent == "ISBN:") {
			isbn = info.nextSibling.data;
			isbn = isbn.split(",")[0].substring(1);
			break;
		}
	}
    
    var xht2 = function(pnum){
        GM_xmlhttpRequest({
            method:	'GET',
            url:	'http://api.douban.com/book/subject/isbn/' + isbn + '?alt=json',
            onload:	function(res) {
                var rejson = JSON.parse(res.responseText);
    
                var numRaters = rejson['gd:rating']['@numRaters'];
                var average = rejson['gd:rating']['@average'];
                var link = rejson['link'][1]['@href'];
                            var emp = $('.buying')[pnum];
    
                            var pos;
    
                if(average < 1) pos = -151;
                else if(average >=1 && average < 2) pos = -136;
                else if(average >=2 && average < 3) pos = -121;
                else if(average >=3 && average < 4) pos = -106;
                else if(average >=4 && average < 5) pos = -91;
                else if(average >=5 && average < 6) pos = -76;
                else if(average >=6 && average < 7) pos = -61;
                else if(average >=7 && average < 8) pos = -46;
                else if(average >=8 && average < 9) pos = -31;
                else if(average >=9 && average < 10) pos = -16;
                else if(average = 10) pos = -1;
    
                            var htmlstr = document.createElement("span");
                htmlstr.innerHTML =  "&nbsp|&nbsp<span style='color:#0C7823; font-weight:700;'>豆瓣</span>评分:<span style='background-image:url(http://img3.douban.com/pics/all_bigstars.gif); background-repeat:no-repeat; background-position:0 "+ pos +"; width:75px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>";
    
                            if(numRaters < 10) htmlstr.innerHTML += "<span>&nbsp少于10人评价&nbsp<a href='"+ link +"'>链接</a></span>";
                            else htmlstr.innerHTML += "<span>"+ average +"&nbsp("+ numRaters +"人评价)&nbsp<a href='"+ link +"'>链接</a></span>";
                emp.appendChild(htmlstr);
            }
		});
    }
    
	//若找不到ISBN，初步认为此页是电子书页面
	if(isbn == '') {
        
		var olinks = $(".tmm_bookTitle a");
		for (var i = 0; i <= 2; i++) {
			olink = olinks[i];
			if(olink) {
                if(olink.textContent == "平装"){
					olink = olink.href;
                    break;
                    //olink = olink.split("/")[5];
                    //olink = 'http://www.amazon.cn/dp/'+ olink;
                }
			}
		}

		GM_xmlhttpRequest({
			method: 'GET',
            url: 	olink,
			onload: function(res) {
                //ajax返回的HTML文档实为string类型
                var el = document.createElement('div');
                el.innerHTML = res.responseText;
                
                var isbns = el.querySelectorAll("div.content b");
                for (var i = 0; i <= 10; i++) {
                    var info = isbns[i];
                    if (info.textContent == "ISBN:") {
                        isbn = info.nextSibling.data;
                        isbn = isbn.split(",")[0].substring(1);
                        break;
                    }
                }
                
                xht2(3);//电子书
                return;
			}
		});
	}
  
    xht2(2);//纸书

}();
