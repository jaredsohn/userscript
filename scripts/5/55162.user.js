// ==UserScript==
// @name           LILE Downloader
// @namespace      http://lile.latymer.co.uk/LILEDownloader
// @description    Add download functionality for all filetypes on the latymer LILE website
// @include        http://lile.latymer.co.uk/explorer*
// ==/UserScript==

mainBox=document.getElementById("ctl07_tblDetails").childNodes[1];
			for(i=1; i<mainBox.childNodes.length-1;i++) {
				if(mainBox.childNodes[i].innerHTML.indexOf("minibar/upload.png")==-1 && mainBox.childNodes[i].innerHTML.indexOf("minibar/download.png")==-1) {
					deleteButton=mainBox.childNodes[i].childNodes[7].getElementsByTagName("div")[0].childNodes[1].getElementsByTagName("table")[0].getElementsByTagName("td")[2];

					fileDir=deleteButton.innerHTML.substr(deleteButton.innerHTML.indexOf("?file=")+6);
					fileDir=fileDir.substr(0,fileDir.indexOf("'"));

							
					space=mainBox.childNodes[i].childNodes[7].getElementsByTagName("div")[0].childNodes[1].getElementsByTagName("table")[0].getElementsByTagName("td")[1];	
					space.innerHTML='<a class="navlink2" href="/explorer/Download.aspx?file=' + fileDir + '" target="_blank"><img src="/images/explorer/minibar/download.png" alt="Download" align="absmiddle" style="height:16px;width:17px;border-width:0px;" /></a>';
					
				}
			}