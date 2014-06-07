// ==UserScript==
// @name          Dance India Dance
// @namespace     
// @author	  Amrit
// @description   Dream, Achieve and Win
// @include       htt*://*.orkut.*/*

// ==/UserScript==

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

	smileyarr["Charmi"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7oFWZ7Cz6I/AAAAAAAAAIs/r6FmdBETthI/s400/alexandra_doll89.png";

	smileyarr["Sania"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S7dkYYM6rfI/AAAAAAAAACs/4ooldAGPtmU/s400/12342.png";

	smileyarr["Shivani"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S7dlTLVPptI/AAAAAAAAAC0/K-KIsKoTP38/s400/henny.png";

	


	smileyarr["4"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7h-VjRpZwI/AAAAAAAAAD0/NqlQtaEQG-c/s400/eylen.png";
	
	smileyarr["5"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7h-St-XKtI/AAAAAAAAADs/GeqdtU8ZIhY/s400/elea.png";
	

	
	smileyarr["6"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7h9dsR5f5I/AAAAAAAAADM/Luz-S3yCWK8/s400/fille030.png";

	smileyarr["7"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S7h-O2aRr7I/AAAAAAAAADk/5lPH1dpxNDU/s400/danser42.png";


	smileyarr["8"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S7oArTJFlaI/AAAAAAAAAHE/aTfnyNV5Npk/s400/dollzgroep10.png";


	smileyarr["9"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7h-LdcQxRI/AAAAAAAAADc/10KfypKNTD8/s400/dancer071.png";


	smileyarr["10"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7h-IACdjAI/AAAAAAAAADU/0ffzL4WRh54/s400/336677.png";



	smileyarr["11"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7oA0jZtgtI/AAAAAAAAAHM/KLTFJKNH1R8/s400/s00542.png";

	
	smileyarr["12"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S7oBC4Yf4GI/AAAAAAAAAHU/yuisSSgwJVE/s400/stick55.png";

	smileyarr["13"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7oBrn7T3dI/AAAAAAAAAHc/hShvW9pd9dE/s400/damsel.png";

	smileyarr["14"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7oC7MmHcFI/AAAAAAAAAH8/gVvOKIUVDKg/s400/dancersani.png";

	smileyarr["15"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S7oC4ZStCTI/AAAAAAAAAH0/stnwGJGZ44E/s400/dans2.png";

	smileyarr["16"]="http://lh6.ggpht.com/_KP8Q0X8TAJE/S7oC2AZz89I/AAAAAAAAAHs/Kg-yzJkCX0I/s400/dans.png";


	smileyarr["17"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S7oCtUVPKUI/AAAAAAAAAHk/XbX9DLvZ9-4/s400/dans1.png";


	smileyarr["18"]="http://lh3.ggpht.com/_KP8Q0X8TAJE/S7oDvIzQJPI/AAAAAAAAAIE/-Wn2_xywPAA/s400/carnaval11.png";


	smileyarr["19"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7oD4SWQ81I/AAAAAAAAAIM/WNWmurLlMfY/s400/karneval005.png";

	smileyarr["20"]="http://lh4.ggpht.com/_KP8Q0X8TAJE/S7oEBTIkdII/AAAAAAAAAIU/ZRSgRJa9C-Q/s400/joshow.png";



	smileyarr["21"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S7oEEMdejFI/AAAAAAAAAIc/nRgrXM5IIBM/s400/joshow1.png";

	smileyarr["22"]="http://lh5.ggpht.com/_KP8Q0X8TAJE/S7oEHE8CUtI/AAAAAAAAAIk/ar95pMf26zg/s400/joshow3.png";




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
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);

			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);


//Dream, Achieve and Win (Amrit)