// ==UserScript==
// @name       ituring2douban
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.ituring.com.cn/book/*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==


!function(){
	var isbn = $('#info tbody:first tr:eq(1) td').text();
	GM_xmlhttpRequest({
		method:	'GET',
		url:	'http://api.douban.com/book/subject/isbn/' + isbn + '?alt=json',
		onload:	function(res) {
			var rejson = JSON.parse(res.responseText);

			var numRaters = rejson['gd:rating']['@numRaters'];
			var average = rejson['gd:rating']['@average'];
			var link = rejson['link'][1]['@href'];
						var pemp = document.getElementsByClassName('span8')[0];
            			var ppemp = pemp.childNodes[2];
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

                        var htmlstr = document.createElement("div");
            htmlstr.style.cssText="border-style:solid;border-width:1px;border-radius:5px;box-shadow: 5px 5px 5px #888888;width:50%;margin-bottom:20px";
            htmlstr.innerHTML =  "&nbsp&nbsp<img src='data:image/png;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAABILAAASCwAAAAEAAAABAAA4jSoAEHMAAIW4fQCtz6gAQZIzAODt3gAQcgAARJQ3AFCbRAA3iikA3uzcAKvNpQDL4cgAFHQEADiMKgBfpFQAN4oqAD+OMgCRwIkAQJAyACqDGwBHkzsAR5Y6ABV3BABEkDcARJE3ACqFGwBQmkQA3OvZAIa4fQA2iikAQ5Q2AF+hVADb6tkAcKpmAFCYRABDkDYAkL6JAEiWOwCZxZIAzOHIAIa5fQBHlDoArtCoAJnEkgBwrWYAPo4xADaJKQCszqYAOIsrAIS3fAA4iyoAEXYAABF1AAARdAAA////ABF3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDg1NgE2NjY2NjY2NgE2EzgPKwMwCzAwMDALMAMDIDU4Jzc3Nzc3Nzc3Nzc3Nyw0ODg4OBI3IjU4LTclATQ4ODg4ODQFNw02NRc3BQY2NDg4ODgbNzcvLhEeNzcjATU4ODgmNzc3Nzc3Nzc3NxU1ODg4BzchEAAAAAAAHDcYNTg4OB83DAY2NTU1NSg3JDU4ODgHNwoxMTExMTEKNxk1ODg4Fjc3Nzc3Nzc3NzcqNDg4ODQOMwkzMzMzCTMzNjU0OBopHQIyMjIyMjICAgIUNDgINzc3Nzc3Nzc3Nzc3CDg4ODg4ODg4ODg4ODg4ODg4BDg4ODg4ODg4ODg4ODg4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=' title='豆瓣' />&nbsp&nbsp评分:<span style='background-image:url(http://img3.douban.com/pics/all_bigstars.gif); background-repeat:no-repeat; background-position:0 "+ pos +"; width:75px;'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>";

                        if(numRaters < 10) htmlstr.innerHTML += "<span>&nbsp少于10人评价&nbsp<a href='"+ link +"'>链接</a></span>";
                        else htmlstr.innerHTML += "<span>"+ average +"&nbsp("+ numRaters +"人评价)&nbsp<a href='"+ link +"'>链接</a></span>";
			pemp.insertBefore(htmlstr,ppemp);
		}
	});
}();