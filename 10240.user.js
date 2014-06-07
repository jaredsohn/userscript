// ==UserScript==
// @name        Gmail Special Searches
// @namespace	http://gmail.1o4.jp/
// @description Special Search Buttons for Gmail and Google Apps. A slim button is used for clear. 
// @include     http*://mail.google.com/mail/*
// @include     http*://mail.google.com/a/*
// @version     1.1
// ==/UserScript==

window.addEventListener("load", function(e) {
addButton();
function addSearch(qe,command1,command2) {
	if(qe.value.indexOf("in:inbox is:unread") != -1){
		qe.value = qe.value.replace("in:inbox is:unread","is:unread");
	}
	if(qe.value.indexOf("in:inbox is:read") != -1){
		qe.value = qe.value.replace("in:inbox is:read","is:read");
	}
	if(qe.value.indexOf(command1) == -1){
		if(qe.value.indexOf(command2) == -1){
			qe.value += " " + command1;
		}else{
			qe.value = qe.value.replace(command2,command1);
		}
	}else{
		qe.value = qe.value.replace(command1,command2);
	}
}
function addButton() {
	var sf = document.getElementById('s');
	if (sf) {
		var q = sf.elements[0];
		var j=0;
		if(sf.elements[1].value == "メールを検索"){
			j = 1;
		}
//Clear
		var btn0 = document.createElement('button');
		btn0.addEventListener('click', function(event) {
			q.value = "";
		}, true);
//Attachment
		var btn3 = document.createElement('button');
		btn3.addEventListener('click', function(event) {
			addSearch(q," has:attachment","-has:attachment");
		}, true);
//Document
		var btn6 = document.createElement('button');
		btn6.addEventListener('click', function(event) {
			var docfile="filename:(.doc OR .xls OR .ppt OR .mdb OR .mdt OR .mdw OR .pdf OR .txt OR .rtf OR .html OR .htm OR .psw OR .pwd OR .one OR .cdb OR .cwk OR .dat OR .dot OR .gra OR .jaw OR .jbw OR .jfw OR .jhd OR .jsw OR .jtd OR .odb OR .odf OR .odg OR .odp OR .ods OR .odt OR .sxc OR .sxd OR .sxg OR .sxi OR .sxm OR .sxw OR .xdw OR .xbd OR .qpc OR .qda)";
			addSearch(q," " + docfile,"has:attachment -" + docfile);
		}, true);
//Image
		var btn4 = document.createElement('button');
		btn4.addEventListener('click', function(event) {
			var imagefile="filename:(.jpg OR .jpeg OR .jpe OR .bmp OR .gif OR .psd OR .ico OR .png OR .tif OR .pct OR .eps)";
			addSearch(q," " + imagefile,"has:attachment -" + imagefile);
		}, true);
//Mobile
	if(j == 1){
		var btn7 = document.createElement('button');
		btn7.addEventListener('click', function(event) {
			var mobiles="from:(docomo.ne.jp OR ezweb.ne.jp OR vodafone.ne.jp OR softbank.ne.jp OR pdx.ne.jp)";
			addSearch(q," " + mobiles,"-" + mobiles);
		}, true);
	}
//Unread
		var btn2 = document.createElement('button');
		btn2.addEventListener('click', function(event) {
			if(q.value == "" || q.value == " " || q.value == "　"){
				q.value = " in:inbox is:unread";
			}else	if(q.value.indexOf("is:unread") == -1){
				if(q.value.indexOf("is:read") == -1){
					q.value += " is:unread";
				}else{
					q.value = q.value.replace("is:read","is:unread");
				}
			}else{
				q.value = q.value.replace("is:unread","is:read");
			}
		}, true);
//Archive
		var btn1 = document.createElement('button');
		btn1.addEventListener('click', function(event) {
			addSearch(q,"(-in:inbox -in:spam -in:trash -is:sent -in:drafts)","in:inbox");
		}, true);
//Labeling (Japanese or English)

		btn0.innerHTML = " ";
		if(j == 1){
			btn2.innerHTML = "未読";
			btn1.innerHTML = "アーカイブ";
			btn3.innerHTML = "添付";
			btn4.innerHTML = "画像";
			btn6.innerHTML = "文書";
			btn7.innerHTML = "携帯";
		}else{
			btn2.innerHTML = "Unread";
			btn1.innerHTML = "Archived";
			btn3.innerHTML = "Files";
			btn4.innerHTML = "Images";
			btn6.innerHTML = "Docs";
		}
//------
		sf.parentNode.insertBefore(btn0, sf);
		sf.appendChild(btn2);
		sf.appendChild(btn1);
		sf.appendChild(btn3);
		sf.appendChild(btn4);
		sf.appendChild(btn6);
		if(j == 1){sf.appendChild(btn7);}
	}
}

}, false);