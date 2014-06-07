// ==UserScript==
// @name           HatenaDiary editor plus
// @namespace      http://d.hatena.ne.jp/galara/
// @description    はてなダイアリー記事編集ページ拡張
// @include        http://d.hatena.ne.jp/galara/edit
// @version        0.1.20100225
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

(function(){

	var image_base64 = {
		mozshot : 'data:image/gif;base64,R0lGODlhRQAYAIYAAAAAACCZEJKSkpnM%2F5ZEHGbGQ%2ByIN9bb9xFw1UCc6Jyy53mAj0NDQ73I2rtVI3KQtl1dXbKyssTkwFy17bPB0XPLTfeVPOT1x8zMzKxoR2RkZMLCwpSozYmJiYGZw7jE1jMzM5t7LFRUVMfS63uVvufr95eeqWa6XtmLXGuLrMbP58VkL01mmc7b74TSWvubP9x3L2hohr3H5zMzZnZ2dv7%2B%2Fk6vRe2KOP7Qo2aZzK2650tLS73L575aJ3OSvV5hbLXC5nnNUc7X76t8TmlpaampqYmPpLvH2Dk5OVFUXHyXwO%2Fz%2F5mZmXPAa26Os8%2FZ8P%2BeQnd8jQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAARQAYAAAI%2FgBTpPBBsKDBgwgTKlzIcCEJDwJrSJxIsaLFixgzatxY40OKGktCihxJsqTJkyhTpqxB4aPKlzBjyuzoUqTEkBRl6txJkqUTkDgdOKghNAACBBN5KlVZYknHn0FxCJV6QcIEBAGGLt160idQohZw4HghdMKEBEGEAuVaEgAAnV6D3njxAgoKBwmanKiglu3JtykB46Tg46sDGBZeSCWQ4ISLAg5uaPVLUvDfkE07Fg4KY67QBAlcVIAsea3bJYAFu029mnVq1CJXh5SN80PhEiWIwqDrIINvGzZCdB6KG7fbEscBIC%2BuXPny586TP4dePLftJQcOENXAnS6ODEd7%2FtyAMTR7dgDn06NPz%2F6AW%2FPu1Ztfv75FiyUfSCwxwV1DBAwRaECWUCu8UJp9CAJgn4ItKMhggwkiuCCDFEK44IX2CYGffhBsQEMHAggAIgRD0GUgeTVIaGGFD1YIoYssRmihfSXkt4QIOApAgwZRCBCBCAaON5SKqzXo4JEUtmZkkkcumSCDGtooAg1ERFEEBkV8KAIM5A0lxJdghinmmGSWaaaY%2BHmwBANEaMBEDDPEwIQGO6hVw5l45qknmjYyIMIOTLAwAAtM7MAASHsmqiiZI6S5BBIM7EBECjmkQMQOSKig6aacdurpp6CGGioPjoIAAgMMQKABBAwgsQAPRLDGKuustNZq6624LtGAmlGY%2BkMSICRhhAzEFmvsscgmq%2ByyzMrAQwk8qEnZtDLlp4AOOgCh7bbcduvtt%2BCGK264HAQEADs%3D',
		image_tag : 'data:image/gif;base64,R0lGODlhiAAYAIYAAAAAAIOPao3C%2F5aScEBDKm2k6sbP52tFQFOGuXKQtmNoQp%2Fg%2F5%2BnirXC5n60716RxDQjLMPv%2F5vX%2F1FXQYBlYIiv2Xiv8TNmmWid5HWo212S3ae92pHA9k5VNc7b74GZwzoxP31TR3aatlZghGaZ3wIXIbuHdGqLrHuVvr30%2F3q8%2F%2Bfr93h%2BVIq98G6o8JXN%2Fz83UaaSkzpETHGg4MPR6WRxUb3L55XZ%2F1FYSEZ5rGSX36m%2F3E5QVtbb94lZWBIcMv7%2B%2FpVxcHGq7YfK%2F5qaeHNOU1mDr3OSvV5nb6Pi%2F7S0tL3H53yz8maZzDEiNmJNXZyy5ztuoZPF%2Fk9TQs3a8UA4K3RQZ2NliGaa426Os3yXwLn7%2F4S7%2Bu%2Fz%2F4V2c4y%2B%2FZnM%2Fzg%2FVU1HUHKn7M7X75je%2F2OW4K265x8bKHOs8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAiAAYAAAI%2FgBPHBlIsKDBgwgTKlzIsKHDhxAbohCRBYjFixgzatzIsaPHjyBDihw58gSQLihTqlzJsqXLlzBjypxJs%2BZMICZt6tzJs6fPnzhP%2FhxKtKhRmUGPKl3KVOeKLkAqrlRCtarVq0qaat1qM6nKrBahngxLNutLAGhrpu0CICXatm7TvpWrEq7MuXjdsl2rl6VdvlGFplQCRIOZw4exmMGw2AwQsy3h2u0beaXkuyjb5lUb%2BXLduXHfqgzchUqTCl0IYynAWgjrAmnGpCmQukuFJlQsn91dt%2FNktn5h%2Ft6ceS9o4H0nw30K5AgQKg%2FAPEgNJA2TNCpUcGHioDsTJo%2B7%2FkR%2FkDvzWtHGzf%2Fdm569ZdDKY14GAIS%2BZvb2LXoujpw%2FyuZAINACAjSskBUXXAzBQQhjJCHAFy8kccNjK9AgIAIrZLgCABly2OGHG2ro4YggkvhWiBqKiBeHK57I4lwovggjiSF6KGKKzXWRQwY5NNADYVJIkEQQJlxxQwpbSCCCDI%2F10MCOOfQgZQ8ASFmllVhSOeWVXGY515RZgrmlmGRqqWV%2BVXZJJVpmbnmlmG964EEXR3SxQRRgROFBVhGkEAMFPFQBQAlIFOHDAal5gGcUG8gpJwCPOgqpB5NOSmmkl2ZqKaVoZeqopp5%2BiumleIEK6Vuijvrppj2sgEIX%2Fh5scIERewIxQhho%2FACDF2JAAIEVIDzxmAdGXNDoqqNWmiymyppan6fKVrppqqpKyiynona6aaeidvHqpz92QYACRAzAQg1T4MBAAB1MMSy1qHJqKbfxtkivtKfORWq91K5qb6T5ajottqKS4YGrXZChsMKEQSUWWWOltvDEFFds8cUYZ6zxxhx3nLG3CU%2BM1chVeWzyySinrLLFIK%2Fs8sswx3wyDSAbYPPNOOes88489%2Bzzz0AHLfTQQXfxQRc2JK300kw37fTTUEct9dRUV2011SscvcTWXHft9ddghy322GSXbfbZaJttNFdst83UB1CccUYDdNdt99145633Dd589%2B3334AH7jcKAQEAOw%3D%3D',
	};
	
	function xpath(query) {
		var results = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodes = new Array();
		for(var i=0; i<results.snapshotLength; i++){
			nodes.push(results.snapshotItem(i));
		}
		return nodes;
	}
	
	function mozshot(elementId, tag) {
		$("#mozshot_img").click(function(){
			window.open("http://mozshot.nemui.org/" , "_blank");
		}).mouseover(function(){
			$("#mozshot_menu").show();
		}).mouseout(function(){
			$("#mozshot_menu").hide();
		});
		$("#mozshot_menu div").each(function(){
			$(this).mouseover(function(){
				$(this).css("background-color","#eeeeee");
				$("#mozshot_menu").show();
			});
			$(this).mouseout(function(){
				$(this).css("background-color","#ffffff");
				$("#mozshot_menu").hide();
			});
			$(this).click(function(){
				$("#mozshot_menu").hide();
				var url = window.prompt("WebサイトURL","");
				if (url==null || url=="") return;
				var param = $(this).attr("img_size").split("x");
				html = '<a href="'+ url +'"><img alt="" width="'+ param[0] +'" height="'+ param[1] +'" border="0" src="http://mozshot.nemui.org/shot/'+ param[2] +'?'+ url +'"></a>';
				var tarea = document.getElementById("textarea-edit");
				var text = tarea.value;
				var at = tarea.selectionStart;
				var tmp = text.substr(0, at);
				tarea.value = tmp + html + "\n" + text.substr(at, text.length);
				tarea.focus();
				var cursor = Math.floor(html.length + 1) + at;
				tarea.setSelectionRange(cursor, cursor);
			});
		});
	}
	
	function fotolife2img(){
		$("#fotolife2img").click(function(){
			var o = document.getElementById("textarea-edit");
			var top = o.scrollTop;
			var pos = { s: o.selectionStart, e: o.selectionEnd };
			var fotolife_code= o.value.slice(pos['s'], pos['e']);
			if (/^\[f:id:[a-z0-9]+:[0-9]+[gpj]:image.*\]$/.test(fotolife_code) == false) {
				alert("fotolife記法が正しく選択されていません");
				return;
			}
			var fotolife_code = fotolife_code.substr(1, fotolife_code.length - 2);
			var param = fotolife_code.split(":");
			var img_date = param[3].substr(0, 8);
			var img_id = param[3].substr(0, param[3].length - 1);
			var img_type = param[3].charAt(param[3].length - 1);
			if (img_type=="g") img_type = "gif";
			else if (img_type=="p") img_type = "png";
			else  img_type = "jpg";
			var html = '<a target="_blank" class="hatena-fotolife" href="http://f.hatena.ne.jp/'+ param[2] +'/' + img_id +'">' +
							'<img class="hatena-fotolife" title="'+ fotolife_code +'" alt="'+ fotolife_code +'" src="http://f.hatena.ne.jp/images/fotolife/g/'+ param[2] +'/' + img_date + '/' + img_id +'.'+ img_type +'">' +
							'</a>';
			if (pos['s'] != pos['e']) {
				o.value = o.value.slice(0, pos['s']) + html + o.value.slice(pos['e']);
				o.scrollTop = top;
				o.setSelectionRange(pos['s'], pos['s']);
			}
			else o.value = html;
			o.focus();
			var cursor = Math.floor(html.length) + pos['s'];
			o.setSelectionRange(cursor, cursor);
		});
	}
	
	function remember_ping(){
		$("#textarea-tburl").val(GM_getValue("ping_list", ""));
		$("#remember_ping").click(function(){
			GM_setValue("ping_list", $("#textarea-tburl").val());
			alert(
				"-----------------------------------------\n" +
				$("#textarea-tburl").val() +
				"\n-----------------------------------------\n" +
				"Ping・トラックバックURLを記憶しました。\n" +
				"ページリロード後から自動で上記URLが入力されます。"
			);
		});
		$("#reset_ping").click(function(){
			GM_setValue("ping_list", "");
			alert("記憶中のPing・トラックバックURLを削除しました。");
		});
	}

	function boot() {
		$(xpath('/html/body/div[2]/div/div/form/div[2]/div/span[2]')[0]).after(
			'<span id="editor_plus">' +
			'<img title="" alt="mozshot" src="'+ image_base64.mozshot +'" id="mozshot_img">' +
			'<img title="" alt="fotolife記法を画像タグに変換" src="'+ image_base64.image_tag +'" id="fotolife2img">' +
			'<div id="mozshot_menu"><div img_size="64x64xsmall">64 x 64</div><div img_size="128x128x">128 x 128</div><div img_size="256x256xlarge">256 x 256</div></div>' +
			'</span>'
		);
		mozshot();
		fotolife2img();
		
		$(xpath('/html/body/div[2]/div/div/form/div[2]/div[2]/div[3]/table/tbody/tr[2]/td')[0]).append(
			'<br /><input type="button" value="Ping・トラックバックURLを記憶" id="remember_ping"> <input type="button" value="記憶しない" id="reset_ping">'
		);
		remember_ping();
	}

	GM_addStyle(<><![CDATA[
		span#editor_plus {
			margin-left:5px;
			position:relative;
		}
		#mozshot_menu {
			display:none;
			position:absolute;
			top:21px;
			left:0px;
			border:1px #999999 solid;
			background-color:white;
		}
		#mozshot_menu div {
			width:100px;
			font-size:12px;
			cursor:pointer;
			padding-left:5px;
		}

	]]></>);
	
	boot();
})();