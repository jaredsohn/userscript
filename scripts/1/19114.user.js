// ==UserScript==
// @name          betterLink
// @namespace     http://www.petitnoir.net/
// @description   
// @include       *
// ==/UserScript==

///////////////////////////////////////////////////////
//無視するclass
//リンク自身のclass
var ignore_target_class = ["keyword"];
//そのリンクを持つdiv要素のclass
var ignore_parentdiv_class = [];
//リンクアイコンはA Trial Product's 素材置き場さんからいただきました。
//http://atp.boo.jp/


 var out = 'http://www.petitnoir.net/external_link_out.gif';//外部ドメイン
 var image = 'http://www.petitnoir.net/external_link_image.gif'; //画像ファイル
 var media = 'http://www.petitnoir.net/external_link_media.gif';//メディアファイル
 var packing = 'http://www.petitnoir.net/external_link_packing.gif';//圧縮ファイル
 var exe = 'http://www.petitnoir.net/external_link_exe.gif';//実行ファイル・dllファイル
 var doc = 'http://www.petitnoir.net/external_link_word.gif';//ワードファイル
 var xls = 'http://www.petitnoir.net/external_link_excel.gif';//エクセルファイル
 var pdf = 'http://www.petitnoir.net/external_link_pdf.gif';//PDFファイル
 var normal = 'http://www.petitnoir.net/external_link_normal.gif';//その他一般
 
 ///////////////////////////////////////////////////////

(function (){

	var ignore = new Array();
	
	var links = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i < links.snapshotLength; i++) {
	var link_type = normal;
			links.snapshotItem(i).title += ' ' +links.snapshotItem(i).href;
			if (links.snapshotItem(i).firstChild.nodeName == 'IMG'){
				links.snapshotItem(i).firstChild.title +=' ' +links.snapshotItem(i).href;
			}
			if (links.snapshotItem(i).textContent != ''){
				var parent = links.snapshotItem(i).parentNode;
				if (ignore_parentdiv_class.length > 0){　//class名表示機能を使うときはこの行をコメントアウトしてください
					for (;;){
						if ( parent.nodeName == "DIV"){break;}
						if (parent.parentNode == null){break;}
						parent = parent.parentNode;
					}
					for (m=0; m < ignore_parentdiv_class.length ; m++){
						if (parent.className == ignore_parentdiv_class[m]){
							ignore[i] = true;
							break;
						}
					}
				}　//class名表示機能を使うときはこの行をコメントアウトしてください
				if (ignore_target_class.length > 0){
					for (t=0; t < ignore_target_class.length ; t++){
						if (links.snapshotItem(i).className == ignore_target_class[t]){
						ignore[i] = true;
						break;
						}
					}
				}
				if(links.snapshotItem(i).href.substr(0,10) == 'javascript' || ignore[i] == true){
					continue;
				}

				if ( links.snapshotItem(i).target == "_blank"){
					links.snapshotItem(i).target = "_self";
				}
				var external_link =document.createElement('a');
				external_link.href = links.snapshotItem(i).href;
				external_link.title = links.snapshotItem(i).title;
				external_link.target = "_blank";
				external_link.textContent= '';
				external_link.style.display = 'inline';
				//links.snapshotItem(i).style.display = 'inline' ;
				if ( links.snapshotItem(i) == links.snapshotItem(i).parentNode.lastChild){
					links.snapshotItem(i).parentNode.appendChild(external_link);
					} else{
				links.snapshotItem(i).parentNode.insertBefore(external_link, links.snapshotItem(i).nextSibling);
				}
				var external_link_image = document.createElement('img');
					reg = new RegExp("\.(doc)$","i");
					if(external_link.href.match(reg)){link_type = doc};
					reg = new RegExp("\.(xls)$", "i");
					if(external_link.href.match(reg)){link_type = excel};					
					reg = new RegExp("\.(pdf)$", "i");
					if(external_link.href.match(reg)){link_type = pdf};
					if(!external_link.href.match(location.hostname)){link_type = out};						
					 reg = new RegExp("\.(jpg|jpeg|gif|tif|png|bmp|ico|tiff)$", "i");
					if(external_link.href.match(reg)){link_type = image};
					reg = new RegExp("\.(zip|lzh|cab)$", "i");
					if(external_link.href.match(reg)){link_type = packing};
					reg = new RegExp("\.(avi|flv|mpeg|mp4|mid|mov|mpg|mp3|ram|rm|wav|wmv)$", "i");
					if(external_link.href.match(reg)){link_type = media};
					reg = new RegExp("\.(exe|dll)$", "i");
					if(external_link.href.match(reg)){link_type = exe};					
				external_link_image.src = link_type;
				external_link_image.style.border = 'none';
				external_link_image.style.height = '12px';
				external_link_image.style.width = '12px';
				external_link_image.style.paddingLeft = '3px';
				external_link_image.style.cssFloat = 'none';
				external_link.appendChild(external_link_image);



				
			//各リンクの後ろにリンク自身のclassをTclass,そのリンクを持つdiv要素のclassをPclassとして表示させます。
			//下の行をコメントアウトを外せば各classがすぐにわかるようになるので無視設定を利用したいときに参考にしてください。
			//なお下の行のコメントアウトを外すときは35行目と47行目をコメントアウトしてください。
			//でないとそのリンクを持つdiv要素ではなくただのparentNodeのclassが表示されます。
			//links.snapshotItem(i).textContent += "Tclass:" +links.snapshotItem(i).className + "; " + "Pclass:" + parent.className+ "; ";
			}
	}
})();