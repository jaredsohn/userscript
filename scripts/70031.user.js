// ==UserScript==
// @name         One Manga Repaging
// @description	  Lists all pages together on OneManga.
// @namespace    http://onemanga.com/*
//Developed by Mayank Singhal
// ==/UserScript==


var ListOfPages = new Array();
var PreChap;
var NexChap;
var Chapter;
var Manga;
var ImageLocation;
(function() {
		function getElementsByClassName(needle) { 
		   var my_array = document.getElementsByTagName("*"); 
		   var retvalue = new Array(); 
		   var i; 
		   var j; 

		   for (i=0,j=0;i<my_array.length;i++) { 
			  var c = " " + my_array[i].className + " "; 
			  if (c.indexOf(" " + needle + " ") != -1) retvalue[j++] = my_array[i]; 
		   } 
		   return retvalue; 
		}
		function getmanga(){
			var Manga2 =  document.location.href ;
			if (Manga2 != "about:blank") {
				MangaTemp = Manga2.split("/");
				Manga ="";
				for(i=0;i<MangaTemp.length-3; i++) {
					if (Manga != "")
						Manga = Manga +"/"+ MangaTemp[i];
					else
						Manga = MangaTemp[i];
				}
				Manga += "/";
			}
			else {
				setTimeOut('getmanga()', 2000);
			}
		}
		function ExtractChapter(chappage) {
			var temp = chappage.split("/", 1);
			return temp[0];
		}
		function LoadList() {
			List = document.getElementById("id_page_select");
			if (List !=null) {
				Chapter = ExtractChapter(document.getElementById("id_chapter_1").value);
				ChapList =  document.getElementById("id_chapter_1");
				ChapList = ChapList.getElementsByTagName("option");
				for (i = 0; i<ChapList.length; i++) {
					tempchap = ExtractChapter(ChapList[i].value);
					if (tempchap == Chapter) {
						if (i == 0) {
							NexChap = "";
						}
						else {
							NexChap = ChapList[i-1].value
						}
						if (i == ChapList.length -1) {
							PreChap = "";
						}
						else {
							PreChap = ChapList[i+1].value
						}
					}
				}
				AllOpts = List.getElementsByTagName("option");
				for(i=0;i<AllOpts.length; i++) {
					ListOfPages[i] = AllOpts[i].value;
				}
				getmanga();
				ImageLocate();
				generateAndDisplay();
			}
			else {
				setTimeOut('LoadList()', 500);
			}
		}
		function ImageLocate() {
			list = getElementsByClassName("manga-page");
			srcname = list[0];
			srcname = srcname.src;
			srcname = srcname.split("/");
			var fina = "http:";
			for(i = 1; i<srcname.length-1;i++) {
				fina = fina +"/"+ srcname[i];
			}
			fina = fina+ "/";
			//alert(fina);
			ImageLocation = fina;
			
		}
		function generateAndDisplay() {
			list = getElementsByClassName("one-page");
			container = list[0];
		//	alert(container.innerHTML);
			var htm = "";
			htm = "<a href='" + Manga + PreChap +"' style='font-size:large;'>Previous Chapter</a><br/>";
			for(i = 0; i<ListOfPages.length;i++) {
				src = ImageLocation + ListOfPages[i] + ".jpg";
				htm = htm + "<img style='padding-bottom:10px;' src=\"" + src + "\" /> <br/>";
			}
			htm += "<a href='" + Manga + NexChap +"' style='font-size:large;'>Next Chapter</a><br/>";
			container.innerHTML = htm;
		}
		LoadList();
		//ImageLocate();
		//generateAndDisplay();
		
})();
