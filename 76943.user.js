// ==UserScript==
// @name        Gmail Special Searches [MOD TTrino]
// @namespace   http://gmail.1o4.jp/
// @description Special Search Buttons for Gmail and Google Apps. A slim button is used for clear. 
// @include     http*://mail.google.com/mail/*
// @include     http*://mail.google.com/a/*
// @version     1.2a
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
		if(qe.value.indexOf(command2) == -1){
			qe.value = qe.value.replace(command1,command2);
		}else{
			qe.value = qe.value.replace(command2,command1);
		}
	}
}
function addButton() {
//初期処理
	var ifDoc = document.getElementById("canvas_frame").contentDocument;  //検索条件のiFrameドキュメント
	var sf = ifDoc.getElementById(":rj").parentNode;  //検索ボタンの親ノード
	if (sf) {
		var sb = ifDoc.getElementById(":rj"); //検索ボタン
		var q = ifDoc.getElementById(":rh");  //入力ボックス
		var j=0;
		if(sb.innerHTML == "メールを検索"){
			j = 1;
		}
//Clear
		var btnClear = sb.cloneNode(false);
		btnClear.addEventListener('click', function(event) {
			q.value = "";
		}, true);
//Attachment
		var btnAttachment = sb.cloneNode(false);
		btnAttachment.addEventListener('click', function(event) {
			addSearch(q,"has:attachment","-has:attachment");
		}, true);
//Document
		var btnDocument = sb.cloneNode(false);
		btnDocument.addEventListener('click', function(event) {
			var docfile="filename:(.doc OR .xls OR .ppt OR .mdb OR .mdt OR .mdw OR .pdf OR .txt OR .rtf OR .html OR .htm OR .psw OR .pwd OR .one OR .cdb OR .cwk OR .dat OR .dot OR .gra OR .jaw OR .jbw OR .jfw OR .jhd OR .jsw OR .jtd OR .odb OR .odf OR .odg OR .odp OR .ods OR .odt OR .sxc OR .sxd OR .sxg OR .sxi OR .sxm OR .sxw OR .xdw OR .xbd OR .qpc OR .qda)";
			addSearch(q,docfile,"has:attachment -" + docfile);
		}, true);
//Image
		var btnImage = sb.cloneNode(false);
		btnImage.addEventListener('click', function(event) {
			var imagefile="filename:(.jpg OR .jpeg OR .jpe OR .bmp OR .gif OR .psd OR .ico OR .png OR .tif OR .pct OR .eps)";
			addSearch(q,imagefile,"has:attachment -" + imagefile);
		}, true);
//Mobile
	if(j == 1){
		var btnMobile = sb.cloneNode(false);
		btnMobile.addEventListener('click', function(event) {
			var mobiles="from:(docomo.ne.jp OR ezweb.ne.jp OR vodafone.ne.jp OR softbank.ne.jp OR pdx.ne.jp)";
			addSearch(q,mobiles,"-" + mobiles);
		}, true);
	}
//Unread
		var btnUnread = sb.cloneNode(false);
		btnUnread.addEventListener('click', function(event) {
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
		var btnArchive = sb.cloneNode(false);
		btnArchive.addEventListener('click', function(event) {
			addSearch(q,"(-in:inbox -in:spam -in:trash -is:sent -in:drafts)","in: inbox");
		}, true);
//Star
		var btnStar = sb.cloneNode(false);
		btnStar.addEventListener('click', function(event) {
			addSearch(q,"in:star","-in:star");
		}, true);

//Labeling (Japanese or English)

		btnClear.innerHTML = "Clear";
		if(j == 1){
			btnStar.innerHTML = "スター";
			btnUnread.innerHTML = "未読";
			btnArchive.innerHTML = "アーカイブ";
			btnAttachment.innerHTML = "添付";
			btnImage.innerHTML = "画像";
			btnDocument.innerHTML = "文書";
			btnMobile.innerHTML = "携帯";
		}else{
			btnStar.innerHTML = "Star";
			btnUnread.innerHTML = "Unread";
			btnArchive.innerHTML = "Archived";
			btnAttachment.innerHTML = "Files";
			btnImage.innerHTML = "Images";
			btnDocument.innerHTML = "Docs";
		}
//------
		sf.insertBefore(btnClear, sb);
		sf.appendChild(btnStar);
		sf.appendChild(btnUnread);
		sf.appendChild(btnArchive);
		sf.appendChild(btnAttachment);
		sf.appendChild(btnImage);
		sf.appendChild(btnDocument);
		if(j == 1){sf.appendChild(btnMobile);}
	}
}

}, false);