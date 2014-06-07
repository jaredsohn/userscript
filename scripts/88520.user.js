// ==UserScript==
// @name           CNKI Downloader via GZHTCM
// @namespace      cnki_downloader_via_gzhtcm
// @include        http://*.cnki.net/*
// @description    CNKI Downloader via GZHTCM, modified from http://www.gzhtcm.com/bbs/read.php?tid=52788
// @version        1.0
// @author         iHead
// ==/UserScript==
<!-- 
	var title=document.title.substring(0,document.title.search("-"))
	var al = document.getElementsByTagName("A");
	for(i=0;i<al.length;i++)
	  { if(al[i].href.indexOf('download.aspx')>-1){
			al[i].href="http://www.gzhtcm.com/bbs/downcnki.php?"+al[i].href.split("?")[1]+'&title='+title
		}
	  }		  
// -->