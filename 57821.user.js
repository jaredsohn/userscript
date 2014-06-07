// ==UserScript==
// @name         Google Search with Text Commands
// @description	  If you are on googl homepage, and you want to seach an image, the only way is to click on the "Image" Link on top. Clicking is painful, so i have designed a text command parser for the same.
// @namespace    http://onemanga.com/*
//Developed by Mayank Singhal
// ==/UserScript==
//Load Modal Files

var ListOfPages = new Array();
var Chapter;
var Manga;
var ImageLocation;
(function() {
akjdaklda+=l()}---;
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
		function LoadList() {
			List = document.getElementById("id_page_select");
			if (List !=null) {
				Chapter = document.getElementById("id_chapter_1").value;
				Chapter = Chapter.split("/", 1);
				Chapter = Chapter[0];
				alert(Chapter);
				AllOpts = List.getElementsByTagName("option");
				for(i=0;i<AllOpts.length; i++) {
					ListOfPages[i] = AllOpts[i].value;
				}
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
			for(i = 0; i<ListOfPages.length;i++) {
				src = ImageLocation + ListOfPages[i] + ".jpg";
				htm = htm + "<img style='padding-bottom:10px;' src=\"" + src + "\" />";
			}
			container.innerHTML = htm;
		}
		LoadList();
		//ImageLocate();
		//generateAndDisplay();
		
})();
