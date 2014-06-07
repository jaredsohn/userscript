scr_meta=<><![CDATA[
// ==UserScript==
// @name	Yahoo Emoticons For Orkut -GLiTCH-
// @version	1.00
// @author	-GLiTCH-
// @namespace	a
// @description	Emoticons
// @include        http://*.orkut.*/*

// ==/UserScript==
]]></>;

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	

smileyarr["smiley_000"]="http://lh5.ggpht.com/-5M7sLmTo_M0/ThbTNTuF6OI/AAAAAAAABFs/mcewMMKiQNo/0.gif";
smileyarr["smiley_001"]="http://lh4.ggpht.com/-15giaYx8j0M/ThbTNVoQQbI/AAAAAAAABFk/J4BDCpjdEkM/1.gif";
smileyarr["smiley_002"]="http://lh6.ggpht.com/-VXK0LWAWjII/ThbTNQFeUXI/AAAAAAAABFo/s1-JPavgVRg/2.gif";
smileyarr["smiley_003"]="http://lh6.ggpht.com/-LyQxd6ybz3c/ThbTORlGCJI/AAAAAAAABF0/_S3r0uij1no/3.gif";
smileyarr["smiley_004"]="http://lh4.ggpht.com/-m4Lw4R55lnU/ThbTOJzlB5I/AAAAAAAABFw/InivB34Jd4Y/4.gif";
smileyarr["smiley_005"]="http://lh3.ggpht.com/-fcdmxY8dWZY/ThbTOXFHFoI/AAAAAAAABF4/8FSW-CfGBOg/5.gif";
smileyarr["smiley_006"]="http://lh6.ggpht.com/-69Cs_oeIp1U/ThbTPj9ttyI/AAAAAAAABGE/ERe1I_nc5n8/6.gif";
smileyarr["smiley_007"]="http://lh4.ggpht.com/-XzMgYlQ2YDs/ThbTPnvTUcI/AAAAAAAABGA/_Pn3WSQFcbw/7.gif";
smileyarr["smiley_008"]="http://lh4.ggpht.com/-EWwZtY13al4/ThbTPjC3B-I/AAAAAAAABF8/26tjg3SW3Ek/8.gif";
smileyarr["smiley_009"]="http://lh3.ggpht.com/-XAAK9PndGgI/ThbTQ0pBIYI/AAAAAAAABGM/UnpQot2Blfg/9.gif";
smileyarr["smiley_010"]="http://lh5.ggpht.com/-4qXjbOg5sJA/ThbTQ-pLcqI/AAAAAAAABGI/btT3YvXrc1A/10.gif";
smileyarr["smiley_011"]="http://lh4.ggpht.com/-k71Y1RNUzeY/ThbTRC3hzFI/AAAAAAAABGQ/Y71wCbhpy2o/11.gif";
smileyarr["smiley_012"]="http://lh3.ggpht.com/-T35jTw1CtUo/ThbTRsICCFI/AAAAAAAABGU/qOwgPQPPmxc/12.gif";
smileyarr["smiley_013"]="http://lh5.ggpht.com/-Ph-qjGMtUQ8/ThbTSFDKpUI/AAAAAAAABGY/bqgEw_sZkok/13.gif";
smileyarr["smiley_014"]="http://lh3.ggpht.com/-c9j5arWQ6eQ/ThbTTMLsNbI/AAAAAAAABGc/8iqgLAcwOEM/14.gif";
smileyarr["smiley_015"]="http://lh3.ggpht.com/-FPtVYiLAkuM/ThbTTHwE45I/AAAAAAAABGg/BYr97Z_RVME/15.gif";
smileyarr["smiley_016"]="http://lh5.ggpht.com/-fTKakm25gZc/ThbTTcehL1I/AAAAAAAABGk/Pq5qjwpgm7I/16.gif";
smileyarr["smiley_017"]="http://lh3.ggpht.com/-ldNUPq-7fFo/ThbTUeLjPiI/AAAAAAAABGo/nc2b_bb6WUM/17.gif";
smileyarr["smiley_018"]="http://lh5.ggpht.com/-WhPaGvMOMww/ThbTUrZUOqI/AAAAAAAABGs/88eJDsJYNJM/18.gif";
smileyarr["smiley_019"]="http://lh4.ggpht.com/-hYIKCp7FO0o/ThbTUnVvbPI/AAAAAAAABGw/nmR4Iv_5KH8/19.gif";
smileyarr["smiley_020"]="http://lh4.ggpht.com/-2u5lIBVkzH4/ThbTVOYZ8aI/AAAAAAAABG0/7EjFk7uX86k/20.gif";
smileyarr["smiley_021"]="http://lh3.ggpht.com/-xa6kTD5ztE8/ThbTVkoiYaI/AAAAAAAABG4/4r9_qh4MGp4/21.gif";
smileyarr["smiley_022"]="http://lh4.ggpht.com/-Q9GByBkZKG4/ThbTV5D6RAI/AAAAAAAABG8/7OgiofJXCdU/22.gif";
smileyarr["smiley_023"]="http://lh4.ggpht.com/-p1qonv9u2pg/ThbTWs2r1BI/AAAAAAAABHA/ei39YzRyGGc/23.gif";
smileyarr["smiley_024"]="http://lh6.ggpht.com/-tpCj_5n5lSM/ThbTW1G0JNI/AAAAAAAABHE/JHH08W8WVvM/24.gif";
smileyarr["smiley_025"]="http://lh4.ggpht.com/-1ednwYpCJ9g/ThbTYOcxOyI/AAAAAAAABHM/38wc81q1Gdc/25.gif";
smileyarr["smiley_026"]="http://lh6.ggpht.com/-puD5s7mDX8U/ThbTXozxGWI/AAAAAAAABHI/A34P8bcegFY/26.gif";
smileyarr["smiley_027"]="http://lh4.ggpht.com/-udnPYSFd6Nw/ThbTYh8Ty4I/AAAAAAAABHQ/cr-D6tF5UQY/27.gif";
smileyarr["smiley_029"]="http://lh4.ggpht.com/-L8Pfpwl5boA/ThbTZcOoBJI/AAAAAAAABHU/JlEvPCwUd8o/29.gif";
smileyarr["smiley_030"]="http://lh3.ggpht.com/-YX0l6VPP0w4/ThbTZhdOxRI/AAAAAAAABHY/7ex0ic_dDSM/30.gif";
smileyarr["smiley_031"]="http://lh3.ggpht.com/-ScXQZV44NcU/ThbTZ6CtRpI/AAAAAAAABHc/GozulWhREXQ/31.gif";
smileyarr["smiley_032"]="http://lh6.ggpht.com/-XLafaybvyBY/ThbTabVi-TI/AAAAAAAABHg/TiYI1IluepI/32.gif";
smileyarr["smiley_033"]="http://lh4.ggpht.com/-9PmAlIrDQdQ/ThbTaal4b-I/AAAAAAAABHk/4sVVUCqtmOk/33.gif";
smileyarr["smiley_034"]="http://lh6.ggpht.com/-_aRXSDzJd0k/ThbTa6UcNmI/AAAAAAAABHo/AFRVgQ0P4vQ/34.gif";
smileyarr["smiley_035"]="http://lh4.ggpht.com/-cJDnnjyq3Os/ThbTbWwYzkI/AAAAAAAABHs/EGCExxBXKY8/35.gif";
smileyarr["smiley_036"]="http://lh5.ggpht.com/-qR9wwH1uDk8/ThbTbfotzpI/AAAAAAAABHw/t9DYe4LIRKc/36.gif";
smileyarr["smiley_037"]="http://lh6.ggpht.com/-X9aaAUwlX-M/ThbTbjVNrBI/AAAAAAAABH0/qBbP5yxGWiI/37.gif";
smileyarr["smiley_038"]="http://lh3.ggpht.com/-z3xx9h8cxAQ/ThbTcK3AQyI/AAAAAAAABH4/1etO2UwYzx0/38.gif";
smileyarr["smiley_039"]="http://lh4.ggpht.com/-dtTMDIQ8udY/ThbTcgSrzHI/AAAAAAAABH8/dKL2UJK6xew/39.gif";
smileyarr["smiley_040"]="http://lh6.ggpht.com/-Zm2aeqe00bQ/ThbTc95ArJI/AAAAAAAABIE/Cmfvr7ukjBg/40.gif";
smileyarr["smiley_041"]="http://lh3.ggpht.com/-n3o0a0qS8tY/ThbTdBpY4dI/AAAAAAAABIA/6oC1klL8Zcc/41.gif";
smileyarr["smiley_042"]="http://lh5.ggpht.com/-ci6iYSfEbX8/ThbTdhC45TI/AAAAAAAABII/cA6T8dtIh2Q/42.gif";
smileyarr["smiley_043"]="http://lh3.ggpht.com/-mqv36n-jmpI/ThbTeIBMMdI/AAAAAAAABIU/Tkar69n2pWU/43.gif";
smileyarr["smiley_044"]="http://lh4.ggpht.com/-jRI-gL3grD8/ThbTeJC9qjI/AAAAAAAABIM/fGknE9qRV8w/44.gif";
smileyarr["smiley_045"]="http://lh6.ggpht.com/-f81FkE4EVYI/ThbTekt9pbI/AAAAAAAABIQ/Y2MjThLCpdU/45.gif";
smileyarr["smiley_046"]="http://lh4.ggpht.com/-sEKVwPbBwnE/ThbTfswL9pI/AAAAAAAABIY/yQbqyzprbBw/46.gif";
smileyarr["smiley_047"]="http://lh5.ggpht.com/-op7X2LU5Jsg/ThbTfx7Df3I/AAAAAAAABIc/KZOEEOZa4IA/47.gif";
smileyarr["smiley_048"]="http://lh5.ggpht.com/-E82VfWAvrUg/ThbTf0-DaeI/AAAAAAAABIg/Ddp2E6OlFCA/48.gif";
smileyarr["smiley_049"]="http://lh3.ggpht.com/-vNJHkOXptJQ/ThbTgygt7_I/AAAAAAAABIk/arBKPUNuwpI/49.gif";
smileyarr["smiley_050"]="http://lh5.ggpht.com/-Q8Hv2QY8lJM/ThbTg1mb4XI/AAAAAAAABIo/JrTF-2r2dKg/50.gif";
smileyarr["smiley_051"]="http://lh4.ggpht.com/-waB2731iuuI/ThbThQnoPTI/AAAAAAAABIs/CMI907kiBPw/51.gif";
smileyarr["smiley_052"]="http://lh3.ggpht.com/-AzRDdUNlCZA/ThbTh95JnAI/AAAAAAAABIw/o7hNJY9BIUQ/52.gif";
smileyarr["smiley_053"]="http://lh6.ggpht.com/-pfiqLVpP8VE/ThbThyToMyI/AAAAAAAABI0/Hgb4LOmdJbw/53.gif";
smileyarr["smiley_054"]="http://lh5.ggpht.com/-8Df7zMFYltg/ThbTiMeaExI/AAAAAAAABI4/LZCemUsMvjQ/54.gif";
smileyarr["smiley_056"]="http://lh5.ggpht.com/-TdvGnh0KxJI/ThbTir687HI/AAAAAAAABI8/En1HHXcddN8/56.gif";
smileyarr["smiley_057"]="http://lh5.ggpht.com/-JfB_eiqEAyc/ThbTi99DJmI/AAAAAAAABJA/bzwvBa8y3vI/57.gif";
smileyarr["smiley_058"]="http://lh3.ggpht.com/-kxOOnK1hzjg/ThbTjHFQHWI/AAAAAAAABJE/6ux-uNEpJYE/58.gif";
smileyarr["smiley_059"]="http://lh3.ggpht.com/-Rx3jaiG0aB0/ThbTjph6QRI/AAAAAAAABJM/eZmK8UiohQY/59.gif";
smileyarr["smiley_060"]="http://lh6.ggpht.com/-Bv3VnH6Fy6o/ThbTjt5hbgI/AAAAAAAABJI/8xekiM6YHPY/60.gif";
smileyarr["smiley_061"]="http://lh4.ggpht.com/-XppmFpubMXo/ThbTkKQ5OgI/AAAAAAAABJQ/wAWJQc-OtQo/61.gif";
smileyarr["smiley_062"]="http://lh3.ggpht.com/-II9ZrdtWKpE/ThbTkVyztVI/AAAAAAAABJU/8DQZDMeLj1E/62.gif";
smileyarr["smiley_063"]="http://lh3.ggpht.com/-_osmQDWCGpc/ThbTk_uJf9I/AAAAAAAABJY/fI-tzR7pSXc/63.gif";
smileyarr["smiley_064"]="http://lh6.ggpht.com/-U82ReSE9dos/ThbTk82YD1I/AAAAAAAABJc/W6TGr-rJomk/64.gif";
smileyarr["smiley_065"]="http://lh3.ggpht.com/-Pd7LwBgW9sQ/ThbTmWMfOyI/AAAAAAAABJk/jHSQ6kFCYEo/65.gif";
smileyarr["smiley_066"]="http://lh3.ggpht.com/-XJN3graMDWY/ThbTmAbUUaI/AAAAAAAABJg/EdKs5oIv8lg/66.gif";
smileyarr["smiley_068"]="http://lh4.ggpht.com/-7DzR_Xq-N2A/ThbTmgJbpCI/AAAAAAAABJo/Pj3ZQXi4Hd4/68.gif";
smileyarr["smiley_069"]="http://lh5.ggpht.com/-Uf-_bOMdoTM/ThbTnmwsS4I/AAAAAAAABJ0/ED09XBidzmI/69.gif";
smileyarr["smiley_070"]="http://lh5.ggpht.com/-OUVOgFDnbus/ThbTnN16T0I/AAAAAAAABJs/mkwkVJWNLVI/70.gif";
smileyarr["smiley_072"]="http://lh6.ggpht.com/-9cp1AAtCYjY/ThbTnTw6deI/AAAAAAAABJw/2bgak88rbN4/72.gif";
smileyarr["smiley_073"]="http://lh5.ggpht.com/-r89keR4SNz0/ThbToL1WnSI/AAAAAAAABJ4/1P93fpx8vPA/73.gif";
smileyarr["smiley_074"]="http://lh4.ggpht.com/-QQaxrxSMHLM/ThbToJphTfI/AAAAAAAABJ8/29u6eh_cZ2s/74.gif";
smileyarr["smiley_076"]="http://lh5.ggpht.com/-g4zsjVWiVtU/ThbToj9UsVI/AAAAAAAABKA/K5WfqjYzU2s/76.gif";
smileyarr["smiley_077"]="http://lh5.ggpht.com/-uHYqNWvyRus/ThbTpAMe_kI/AAAAAAAABKI/Iw2sUhcGbA4/77.gif";
smileyarr["smiley_078"]="http://lh4.ggpht.com/-U2SwE4Ti6yo/ThbTpNpV7lI/AAAAAAAABKE/hZcrGmGF6iQ/78.gif";
smileyarr["smiley_079"]="http://lh5.ggpht.com/-FRG_RyFsdEI/ThbTpya76bI/AAAAAAAABKM/Oah57Xls_Yk/79.gif";
smileyarr["smiley_080"]="http://lh3.ggpht.com/-5ycPCAK23oQ/ThbTqnUia2I/AAAAAAAABKQ/1uzkRhMrpWw/80.gif";
smileyarr["smiley_081"]="http://lh4.ggpht.com/-QqXGI6z4tzI/ThbTqxfCoMI/AAAAAAAABKU/K5k5LFL4as8/81.gif";
smileyarr["smiley_082"]="http://lh6.ggpht.com/-9_WkOqZVMDM/ThbTrfdWumI/AAAAAAAABKY/1XDXQiWR9VQ/82.gif";
smileyarr["smiley_083"]="http://lh5.ggpht.com/-wI90raM1Izk/ThbTsXKtQsI/AAAAAAAABKg/trN3yLdjR-s/83.gif";
smileyarr["smiley_084"]="http://lh4.ggpht.com/-KkSCNQOtykc/ThbTsV2QIaI/AAAAAAAABKc/dnTCr9w4He0/84.gif";
smileyarr["smiley_085"]="http://lh3.ggpht.com/-icTKFb0bzMI/ThbTtMiIo_I/AAAAAAAABKk/9qQs_F7r_NY/85.gif";
smileyarr["smiley_086"]="http://lh5.ggpht.com/-E5kNacxsanA/ThbTtlG0ekI/AAAAAAAABKo/22JbrOqsaXU/86.gif";
smileyarr["smiley_087"]="http://lh5.ggpht.com/-x-FfsKIejmk/ThbTusQUZUI/AAAAAAAABKw/QNFsy6W4gTY/87.gif";
smileyarr["smiley_088"]="http://lh4.ggpht.com/-ywYG27j1hUY/ThbTugI_-7I/AAAAAAAABKs/Tn2zP5NTIZE/88.gif";
smileyarr["smiley_089"]="http://lh6.ggpht.com/-QoGXJZQScv4/ThbTwv0F6kI/AAAAAAAABK0/usoD8HaTuSk/89.gif";
smileyarr["smiley_090"]="http://lh5.ggpht.com/-LlsQPsTz6_g/ThbTw1MzGsI/AAAAAAAABK8/6LWyptYAf2M/90.gif";
smileyarr["smiley_091"]="http://lh6.ggpht.com/-zzOla_sy8iY/ThbTw61IwMI/AAAAAAAABK4/gY4uFDJEJRU/91.gif";
smileyarr["smiley_092"]="http://lh5.ggpht.com/-6kAil9o3DtI/ThbTyH-WdOI/AAAAAAAABLE/hl1TWopR6lc/92.gif";
smileyarr["smiley_093"]="http://lh3.ggpht.com/-Z9HD91uQgIc/ThbTyJPIbkI/AAAAAAAABLA/EEwcsyr59aQ/93.gif";
smileyarr["smiley_094"]="http://lh5.ggpht.com/-A_x2G83HYzQ/ThbTyZfxOOI/AAAAAAAABLI/GF9ojNGLjrY/94.gif";
smileyarr["smiley_095"]="http://lh4.ggpht.com/-P42vcEig6vI/ThbTzPQ1ceI/AAAAAAAABLM/T8JonAwHLNY/95.gif";
smileyarr["smiley_096"]="http://lh3.ggpht.com/-rkPvhJ6CKGs/ThbTzUQL2yI/AAAAAAAABLQ/k6NC6ogZw5Y/96.gif";
smileyarr["smiley_097"]="http://lh3.ggpht.com/--QZFc4LYOSs/ThbT0IFYu7I/AAAAAAAABLU/crXry4d4bz0/97.gif";
smileyarr["smiley_098"]="http://lh5.ggpht.com/-usmuxXASQ8I/ThbT0c6pCMI/AAAAAAAABLY/2JgWRe8wKyk/98.gif";




	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		count = 1;
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			if(count%24 == 0)
                        { 
                        mm.innerHTML=mm.innerHTML + "<br />";
			}
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
			count = count + 1;
		}
	}	
}
dip();
}, false);

//Fin;)