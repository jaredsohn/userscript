// ==UserScript==
// @name         Google+ SNS Button
// @namespace    googleplussnsbutton
// @include      https://plus.google.com/*
// @version      1.80.2
// @icon         data:image/png;base64,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
// ==/UserScript==
var reg_gp = /https:\/\/plus\.google\.com(\/u\/\d+)?\/.*\/posts\/.*/;
var reg_pa = /https:\/\/plus\.google\.com(\/u\/\d+)?\/b\/.*?/;
var reg_g = /https:\/\/plus\.google\.com(\/u\/\d+)?\/(\?hl=ja)?$/;
var reg_t = /https:\/\/plus\.google\.com(\/u\/\d+)?\/(stream|hot)(\/.*)?/;
var reg_a = /https:\/\/plus\.google\.com(\/u\/\d+)?\/\d*\/posts\/?/;
var reg_s = /https:\/\/plus\.google\.com(\/u\/\d+)?\/(u\/\d+\/)?settings\/.*\/?$/;
var reg_v = /https:\/\/plus\.google\.com(\/u\/\d+)?\/\?gpinv=.*/;
var reg_n = /https:\/\/plus\.google\.com(\/u\/\d+)?\/s\/.*?/;
var reg_o = /https:\/\/plus\.google\.com(\/u\/\d+)?\/me\/posts\/?/;




//読み込み（指定したURL以外ではロードしない）
var a = location.href;
if (a.match(reg_g)||a.match(reg_gp)||a.match(reg_t)||a.match(reg_s)||a.match(reg_a)||a.match(reg_v)||a.match(reg_n)||a.match(reg_o)||a.match(reg_pa)){

	//言語設定
	var lang = document.getElementsByTagName("html")[0].lang;
	var TextList = {
		Reply:(function(){
			switch(lang){
				case "ja":
					return "返信";
				default:
					return "Reply";
			}
		})(),
		HatenaID:(function(){
			switch(lang){
				case "ja":
					return "はてなID：";
				default:
					return "Hatena ID : ";
			}
		})(),
		HatenaBookmarks:(function(){
			switch(lang){
				case "ja":
					return "はてなブックマーク";
				default:
					return "Hatena Bookmarks";
			}
		})(),
		Stream:(function(){
			switch(lang){
				case "ja":
					return "ストリームの各ポストに表示する";
				default:
					return "Show this button";
			}
		})(),
		Aisatsu:(function(){
			switch(lang){
				case "ja":
					return "あいさつ";
				default:
					return "Hello Button";
			}
		})(),
		Dokoina:(function(){
			switch(lang){
				case "ja":
					return "どこいな";
				default:
					return "Dokoina Button";
			}
		})(),
		Command:(function(){
			switch(lang){
				case "ja":
					return "コマンドを実行";
				default:
					return "Command Button";
			}
		})(),
		OpenFullSize:(function(){
			switch(lang){
				case "ja":
					return "フルサイズ画像を開く";
				default:
					return "Open the images";
			}
		})(),
		DonwloadFullSize:(function(){
			switch(lang){
				case "ja":
					return "フルサイズ画像をダウンロード";
				default:
					return "Download the images";
			}
		})(),
		ScrollLock:(function(){
			switch(lang){
				case "ja":
					return "スクロールを固定(非推奨)";
				default:
					return "Scroll Lock(Deprecated)";
			}
		})(),
		ReplySetting:(function(){
			switch(lang){
				case "ja":
					return "返答の設定";
				default:
					return "Config";
			}
		})(),
		SettingInfo:(function(){
			switch(lang){
				case "ja":
					return "Google+ SNS Button で表示させるボタンを選択できます。";
				default:
					return "You can choose a favorite SNS Button.";
			}
		})()
		/*
		:(function(){
			switch(lang){
				case "ja":
					return "";
				default:
					return "";
			}
		})(),
		*/
	}

	//正規表現
	var reg1 = /\/h\d*\//;
	var reg2 = /\/w\d*\//;
	var reg3 = /\/w\d*-h\d*-p\//;
	var reg4 = /<br>/g;
	var reg5 = /<wbr>/g;
	var reg6 = /<a href="/g;
	var reg7 = /" class=".*">/g;
	var reg8 = /<\/a>/g;
	var reg9 = /<b>/g;
	var reg10 = /<\/b>/g;
	var reg11 = /<i>/g;
	var reg12 = /<\/i>/g;
	var reg13 = /<i>/g;
	var reg14 = /<\/i>/g;
	var reg15 = /<span class=".*">編集<\/span>/g;
	var reg_p = /\+/;
	var reg_i = /https:\/\/lh\d*\.googleusercontent.com\/.*\/.*\/.*\/.*\/.*\/.*[^photo.jpg]/;
	var reg_m = /gpme-.*/;
	var reg_e = /.*\.editor/;
	var reg_f = /.*\.f/;
	var reg_r = /\n/g;
	var reg_h = /https?:\/\//;
	var reg_d = /(^.*)[ ]/;
	var reg_u = /update-.*/;
	var reg_b = /\/s\/.*/;
	var reg_ri = /https:\/\/plus\.google\.com(\/u\/\d+)?\/\d+\/posts\/(.+)/;
	var reg_cm = /comment:.*/;
	var reg_bz = /buzz:.*/;
	var reg_id = /https:\/\/plus\.google\.com(\/u\/\d+)?\/(\d+)/;
	//挨拶ボタン：オブジェクト
	var Aisatsu = {
		/*オブジェクト名は頭を大文字 Stoは全て小文字 Str:タイトル Reg:正規表現 Sto:localStorageに使用するname
		:{
			Str:"",
			Reg:/()/,
			Sto:""
		},
		*/
		//おはようございます
		Ohayou:{
			Str:"おはようございます",
			Reg:/(おはよう|おはです|おっは[ー〜]|オハヨー|おは(ＹＯ|YO)|あっはよお|[おはようございます]{9}|おはよ|[起お]きた|おはお|おっはよ|おー?はー?よー?ん|おはろ|はろはろ|おーはー|目が覚めた|めがさめた|おはほむ|おはいお)/,
			Sto:"ohayou"
		},
		//こんにちは
		Konnitiwa:{
			Str:"こんにちは",
			Reg:/([こんにちは]{5})/,
			Sto:"konnitiwa"
		},
		//こんばんは
		Konbanwa:{
			Str:"こんばんは",
			Reg:/([こんばんは]{5}|ばんです|おばんです|[こんばんわ]{5})/,
			Sto:"konbanwa"
		},
		//今から帰ります
		Kaerimasu:{
			Str:"今から帰ります",
			Reg:/((帰|かえ)ります|(帰宅|帰宅)します|かえる|カエル|会社[出で]ます|(帰|かえ)ろう|(帰|かえ)る|(帰|かえ)っちゃう|(仕事|しごと)(オワタ|おわた|[終お]わった))/,
			Sto:"kaerimasu"
		},
		//ただいま帰宅しました
		Tadaima:{
			Str:"ただいま帰宅しました",
			Reg:/(ただいま|帰還|(戻|もど)りました|(帰宅|きたく)|かえりました|(帰|かえ)りました|(帰|かえ)ってきた|(帰|かえ)った|(戻|もど)った|(戻|もど)ってきた|ただい.*|(帰|かえ)ってこれた|(帰|かえ)って[来き]ました|帰社った|家着|たっだいま|(戻|もど)ってきました)/,
			Sto:"tadaima"
		},
		//おやすみなさい
		Oyasuminasai:{
			Str:"おやすみなさい",
			Reg:/([おやすみなさい]{7}|おやす|[寝ね]ます|寝|ｵﾔ.*ｽﾐ|zzz|ねまー|[ね寝]る|[ね寝]っるよ|寝)/,
			Sto:"oyasuminasai"
		},
		//いただきます
		Itadakimasu:{
			Str:"いただきます",
			Reg:/(いただきま(〜|ー)?す|頂きます|いただきまーす)/,
			Sto:"itadakimasu"
		},
		//ごはん食べてきます
		Tabetekimasu:{
			Str:"ご飯食べてきます",
			Reg:/((ご飯|飯|ごはん|ディナー|朝食|昼食|ランチ|夕食)[食た]べて[き来]ます|(飯|めし)って[来く]る|(飯|めし)いてくる|(ご飯|ごはん|飯|めし)[行い]ってきます)/,
			Sto:"tabetekimasu"
		},
		//ごはん食べてきました
		Tabetekimashita:{
			Str:"ご飯食べてきました",
			Reg:/((ご飯|飯|ごはん|ディナー|朝食|昼食|ランチ|夕食)[食た]べて[き来]ました|(飯|めし)って[来き](た|ました)|(飯|めし)った)/,
			Sto:"tabetekimashita"
		},
		//うまい
		Umai:{
			Str:"おいしい",
			Reg:/(うまい|おいしい|オイシイ)/,
			Sto:"umai"
		},
		//風呂行ってきます
		FuroShower:{
			Str:"風呂行ってきます",
			Reg:/(風呂|シャワー?)/,
			Sto:"furoshower"
		},
		//あがって来ました
		Agattekimashita:{
			Str:"あがってきました",
			Reg:/([あ上]がってきました|[あ上]がった)/,
			Sto:"agattekimashita"
		},
		//行ってきます
		Ittekimasu:{
			Str:"行ってきます",
			Reg:/([行い]て[き来]..す|[行い]って..す|[行い]って[き来].す|[行い]って[く来]る|[行い]きます|いてきます|[行い]ってきまー?す)/,
			Sto:"ittekimasu"
		},
		//ほかってきます
		Hokattekimasu:{
			Str:"ほかってきます",
			Reg:/(ほかってきます|ほかってくる)/,
			Sto:"hokattekimasu"
		},
		//ほかってきました
		Hokattekimashita:{
			Str:"ほかってきました",
			Reg:/(ほかってきました|ほかった|ほかってきた)/,
			Sto:"hokattekimashita"
		},
		//誕生日の人
		Tanjyobi:{
			Str:"誕生日の人",
			Reg:/(誕生日)/,
			Sto:"tanjyoubi"
		},
		//笑った
		Waratta:{
			Str:"笑った",
			Reg:/(笑った|ワラタ|ワロス|ワロ(タ|ッシュ)|わろた|www+|ｗｗｗ+)/,
			Sto:"waratta"
		},
		//ぬるぽ
		Nurupo:{
			Str:"ぬるぽ",
			Reg:/(ぬるぽ)/,
			Sto:"nurupo"
		},
		//発想
		Hassou:{
			Str:"発想",
			Reg:/(発想|じゃね[？?!！]|だろうか[？?])/,
			Sto:"hassou"
		},
		//キター
		Kita:{
			Str:"キター",
			Reg:/(キター|キタキタ|きたきた)/,
			Sto:"kita"
		},
		//ぎゃああ
		GYAAAA:{
			Str:"ギャアアア",
			Reg:/(ぎゃあ+|うおお+|ギャア+|ぎゃぁ+|ギャァ+)/,
			Sto:"gyaaaa"
		},
		//だったんだよ！
		dattanndayo:{
			Str:"〜だったんだよ！",
			Reg:/(だったんだよ[！!?]+)/,
			Sto:"dattanndayo"
		},
		//地震？
		Jishin:{
			Str:"地震？",
			Reg:/(地震|[揺ゆ]れ(た|てい?る)|どこいな)/,
			Sto:"jishin"
		},
		//眠い
		Nemui:{
			Str:"眠い",
			Reg:/([眠ね]むい)/,
			Sto:"nemui"
		},
		//寒い
		Samui:{
			Str:"寒い",
			Reg:/([寒さ]むい)/,
			Sto:"sugoi"
		},
		//暑い
		Atsui:{
			Str:"暑い",
			Reg:/((暑|あつ)い)/,
			Sto:"atui"
		},
		//頑張ります
		Ganbarimasu:{
			Str:"頑張ります",
			Reg:/(頑張ります|がんばります|がんばる|ガンバル)/,
			Sto:"ganbarimasu"
		},
		//あけおめ
		AkeOme:{
			Str:"あけましておめでとう",
			Reg:/([明あ]けましておめでとう|あけおめ)/,
			Sto:"akeome"
		},
		//メリークリスマス
		MerryChristmas:{
			Str:"メリークリスマス",
			Reg:/(メリークリスマス|めりくり)/,
			Sto:"xmas"
		}
	};
	
	//挨拶ボタン：オブジェクト：返答メッセージの読み込み
	for( a in Aisatsu ){
		var b = eval("Aisatsu."+a);
		b.Rep = localStorage.getItem("gpsb.aisatsu."+b.Sto);
	}
	

	//拡張のアイコン
	var imagedata_icon = "data:image/png;base64,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";
	
	//ストリームを固定
	var imagedata_pin1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAADHmlDQ1BJQ0MgUHJvZmlsZQAAeAGFVN9r01AU/tplnbDhizpnEQk+aJFuZFN0Q5y2a1e6zVrqNrchSJumbVyaxiTtfrAH2YtvOsV38Qc++QcM2YNve5INxhRh+KyIIkz2IrOemzRNJ1MDufe73/nuOSfn5F6g+XFa0xQvDxRVU0/FwvzE5BTf8gFeHEMr/GhNi4YWSiZHQA/Tsnnvs/MOHsZsdO5v36v+Y9WalQwR8BwgvpQ1xCLhWaBpXNR0E+DWie+dMTXCzUxzWKcECR9nOG9jgeGMjSOWZjQ1QJoJwgfFQjpLuEA4mGng8w3YzoEU5CcmqZIuizyrRVIv5WRFsgz28B9zg/JfsKiU6Zut5xCNbZoZTtF8it4fOX1wjOYA1cE/Xxi9QbidcFg246M1fkLNJK4RJr3n7nRpmO1lmpdZKRIlHCS8YlSuM2xp5gsDiZrm0+30UJKwnzS/NDNZ8+PtUJUE6zHF9fZLRvS6vdfbkZMH4zU+pynWf0D+vff1corleZLw67QejdX0W5I6Vtvb5M2mI8PEd1E/A0hCgo4cZCjgkUIMYZpjxKr4TBYZIkqk0ml0VHmyONY7KJOW7RxHeMlfDrheFvVbsrj24Pue3SXXjrwVhcW3o9hR7bWB6bqyE5obf3VhpaNu4Te55ZsbbasLCFH+iuWxSF5lyk+CUdd1NuaQU5f8dQvPMpTuJXYSWAy6rPBe+CpsCk+FF8KXv9TIzt6tEcuAcSw+q55TzcbsJdJM0utkuL+K9ULGGPmQMUNanb4kTZyKOfLaUAsnBneC6+biXC/XB567zF3h+rkIrS5yI47CF/VFfCHwvjO+Pl+3b4hhp9u+02TrozFa67vTkbqisXqUj9sn9j2OqhMZsrG+sX5WCCu0omNqSrN0TwADJW1Ol/MFk+8RhAt8iK4tiY+rYleQTysKb5kMXpcMSa9I2S6wO4/tA7ZT1l3maV9zOfMqcOkb/cPrLjdVBl4ZwNFzLhegM3XkCbB8XizrFdsfPJ63gJE722OtPW1huos+VqvbdC5bHgG7D6vVn8+q1d3n5H8LeKP8BqkjCtbCoV8yAAACEklEQVQoFY2Tz2sTURCAv/eSNQmhbZRCWotSpaBUE2Ny0v9A8F5Pggc9CAr+ASrizYui4KGXQvHgUbSiUg/exGpaqW3FWlvx4EFojeRHu83uW+dt2t2ChzrsG4Z5872dNzNPBVNTJW5fuorZKKJ0hd0kMFUM09waf6iCM0dHOXX2YnC8DCbYDQ331cIMvH89lkRTDoZPEvQNxWBSYRKg1W+YmYdGHU4XML0F9KZvN1DvJoo6TtUIbJeVAN0W8NmEgKvoH8voB2P4byc7ETZDuaLuBIvWYoZLQWsNXjyBTApzYQRTGMbUGySev6K1OBchychKCLQtbYNe/QNNFx4/RX9dxlUKt97EW6tBNh1GxrCWS1pRNhkfc+UG6tMH9PgdSOdxvYB1OZTMDiQErHLEaVdS8zOQUsxXsVU1Jkl9w8N1DW6uB6d7X4TEd3ZS4jT4rRYvPy/x69FdWl8+0jxUxk1laRw8gDNyjtzA4QiOc3Cc0Dm5UCUvhWpdu0d3vhd3aRG/VqNncJCurpzESKu2ZAec4M3KN5y9OYqZLPsH+qVg66SGjkjnpDWe3Ndvx92UAyK4ufKdnLOH0rETEiyBntc537egtcUnnxSh4xedlMCqTEwl299HyboDSSvcF2X77m12/rwNOltdEU7GMz2r5qYr/zvX4Wja2ZbHocJXdfP8ZTvj8ahGmf1rhJmmZ7k+ev8vxaLG95eO1d0AAAAASUVORK5CYII=";
	
	//ストリームを固定2
	var imagedata_pin2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAADHmlDQ1BJQ0MgUHJvZmlsZQAAeAGFVN9r01AU/tplnbDhizpnEQk+aJFuZFN0Q5y2a1e6zVrqNrchSJumbVyaxiTtfrAH2YtvOsV38Qc++QcM2YNve5INxhRh+KyIIkz2IrOemzRNJ1MDufe73/nuOSfn5F6g+XFa0xQvDxRVU0/FwvzE5BTf8gFeHEMr/GhNi4YWSiZHQA/Tsnnvs/MOHsZsdO5v36v+Y9WalQwR8BwgvpQ1xCLhWaBpXNR0E+DWie+dMTXCzUxzWKcECR9nOG9jgeGMjSOWZjQ1QJoJwgfFQjpLuEA4mGng8w3YzoEU5CcmqZIuizyrRVIv5WRFsgz28B9zg/JfsKiU6Zut5xCNbZoZTtF8it4fOX1wjOYA1cE/Xxi9QbidcFg246M1fkLNJK4RJr3n7nRpmO1lmpdZKRIlHCS8YlSuM2xp5gsDiZrm0+30UJKwnzS/NDNZ8+PtUJUE6zHF9fZLRvS6vdfbkZMH4zU+pynWf0D+vff1corleZLw67QejdX0W5I6Vtvb5M2mI8PEd1E/A0hCgo4cZCjgkUIMYZpjxKr4TBYZIkqk0ml0VHmyONY7KJOW7RxHeMlfDrheFvVbsrj24Pue3SXXjrwVhcW3o9hR7bWB6bqyE5obf3VhpaNu4Te55ZsbbasLCFH+iuWxSF5lyk+CUdd1NuaQU5f8dQvPMpTuJXYSWAy6rPBe+CpsCk+FF8KXv9TIzt6tEcuAcSw+q55TzcbsJdJM0utkuL+K9ULGGPmQMUNanb4kTZyKOfLaUAsnBneC6+biXC/XB567zF3h+rkIrS5yI47CF/VFfCHwvjO+Pl+3b4hhp9u+02TrozFa67vTkbqisXqUj9sn9j2OqhMZsrG+sX5WCCu0omNqSrN0TwADJW1Ol/MFk+8RhAt8iK4tiY+rYleQTysKb5kMXpcMSa9I2S6wO4/tA7ZT1l3maV9zOfMqcOkb/cPrLjdVBl4ZwNFzLhegM3XkCbB8XizrFdsfPJ63gJE722OtPW1huos+VqvbdC5bHgG7D6vVn8+q1d3n5H8LeKP8BqkjCtbCoV8yAAAB8ElEQVQoFYWT3WoTQRTH/zOz20gprlYbLf3Q4PZCxCCmWL0pIuh7eOuFD+OFTyG+gVChV9rmIuAHVhIDaZCEamvNpvsxM54zm92oF+2BmVl2zm/+58ycI+zDx3f2fg+fZ0bUhRANnGHW2l0D0bx1/tJL78Ovg2dXwptPvVqNMHsG6rYbWedbY6/9yfMk7F2vdh1y4TKxOSykdF4mGkP3erDjCGr1GtTSEmCMAYTMvn6uyzLUCVhIM5ju7sAeH0MPBki23iBttXibTrZgLpfgX0KUw4wiJO/fAb6PmfsbUMvLSJOY4CZ0u83ezkqYQy0GrKFQR7CjEZJmE6bfhya1cZLAUCSFlXCpTIdYSuvo8Cf823XM3NuA/jFEaixiTvev9LziFKjppz08gk9Ksx+/IKI1yjKkBPmUmrwQlMiUUArIUtg4xnB7C4Mkg/7eRdZvo0LRzEqBufUHUCur0Ps9d8AU9ggmG79+haBSQfXRE3Jcge52XZ5y8SrU/LzzKaYS5suKt99CBhfh3QjhrYWwJzFUGEJxnpyvy5nWiZWw3u9DBAHObW66S7F64sSA1rk7vcI/F8a1Sg/ckNUqeLhNVuJB0fwPWq4HMuaoPm0r63SoIfLSzCVOmwWotsHNIbiruDm4xstSPYV1iiS4Nrfw4g9qW+kg2EgwagAAAABJRU5ErkJggg==";
	
	//Tumblr
	var imagedata_tumblr = "data:image/png;base64,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";

	//Read It Later登録完了
	var imagedata_Read = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAACB0lEQVQoFY1TTWsTURQ9b2YyM8bGGWssKH50rzSpDX5QjGgcIljcSX+BG0NcCC7ddFEQd4YUlCKFQosIgoKLIriTrCyJUIRx11WLgp0aZjKZTp7vzoTBgUp74T3exzn3nnvffcy27WKtVnvEGJuQZXkKB1gYhl8Fdr3RaCygWq2+arVa3PM87rpuNGgtQMno9/vJHWEIb1nWa4VzfqlQKEDX9f/GlCQJmUwmuS8WiyClymGkEsvb3sbAccB0DezkGIinJO5owTmEy9QRbXY3NrD38QNMcOz0fKiPn0SYNJmIwoFIhWRFjnZtG/7bVZhCuiMrkK5eg6LENOnfMIPBICIwASQF3a0tuCvLyO78hhMEwPR15CoWVFVNR+5ubsIRQPnMWRgz96Dmcui+WYH24zv+HDORuVOGUb4BKl5AjoQlsn+9XIC8+gyBSNttPYA6WUL4eQ1y9ijYdBm5W5WISGn5vp8mj9ysoBvuwX23iOzaErwvn3Akfwr+5GWM3p2JpQ4LKiodkZOc87ctnJ6bR37xPYKSADOOvnkCI/dnkT0+CgzrEbGGUyKb9lSIMZGXdu48fs49hV66AvPCxRi6zxMqw16Ne5pkCTPGx6HOP4ekaalni73EM/GoPb+12+0patGUGQZC4azX66WO6f07nQ71wTqjX1Wv1x9Sjx+mVSkiBWw2my/+ApxN26t+HlJ3AAAAAElFTkSuQmCC";

	var Buttonlist = {
		//はてなブックマーク
		HatenaBookmark:{
			name : TextList.HatenaBookmarks,
			storagename : "hatenabookmark",
			class  : "gpsb_hatenabookmark",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					if(hatenaid == null || hatenaid == '' || hatenaid == 0){
						var a = 'http://b.hatena.ne.jp/entry/s/'+encodeURI(_permlink.replace(reg_h,""));
					} else {
						var a = 'http://b.hatena.ne.jp/'+hatenaid+'/add.confirm?url='+encodeURI(_permlink);
					}
					window.open(a,'','width=980,height=720,scrollbars=yes');
				}, false);
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAADHmlDQ1BJQ0MgUHJvZmlsZQAAeAGFVN9r01AU/tplnbDhizpnEQk+aJFuZFN0Q5y2a1e6zVrqNrchSJumbVyaxiTtfrAH2YtvOsV38Qc++QcM2YNve5INxhRh+KyIIkz2IrOemzRNJ1MDufe73/nuOSfn5F6g+XFa0xQvDxRVU0/FwvzE5BTf8gFeHEMr/GhNi4YWSiZHQA/Tsnnvs/MOHsZsdO5v36v+Y9WalQwR8BwgvpQ1xCLhWaBpXNR0E+DWie+dMTXCzUxzWKcECR9nOG9jgeGMjSOWZjQ1QJoJwgfFQjpLuEA4mGng8w3YzoEU5CcmqZIuizyrRVIv5WRFsgz28B9zg/JfsKiU6Zut5xCNbZoZTtF8it4fOX1wjOYA1cE/Xxi9QbidcFg246M1fkLNJK4RJr3n7nRpmO1lmpdZKRIlHCS8YlSuM2xp5gsDiZrm0+30UJKwnzS/NDNZ8+PtUJUE6zHF9fZLRvS6vdfbkZMH4zU+pynWf0D+vff1corleZLw67QejdX0W5I6Vtvb5M2mI8PEd1E/A0hCgo4cZCjgkUIMYZpjxKr4TBYZIkqk0ml0VHmyONY7KJOW7RxHeMlfDrheFvVbsrj24Pue3SXXjrwVhcW3o9hR7bWB6bqyE5obf3VhpaNu4Te55ZsbbasLCFH+iuWxSF5lyk+CUdd1NuaQU5f8dQvPMpTuJXYSWAy6rPBe+CpsCk+FF8KXv9TIzt6tEcuAcSw+q55TzcbsJdJM0utkuL+K9ULGGPmQMUNanb4kTZyKOfLaUAsnBneC6+biXC/XB567zF3h+rkIrS5yI47CF/VFfCHwvjO+Pl+3b4hhp9u+02TrozFa67vTkbqisXqUj9sn9j2OqhMZsrG+sX5WCCu0omNqSrN0TwADJW1Ol/MFk+8RhAt8iK4tiY+rYleQTysKb5kMXpcMSa9I2S6wO4/tA7ZT1l3maV9zOfMqcOkb/cPrLjdVBl4ZwNFzLhegM3XkCbB8XizrFdsfPJ63gJE722OtPW1huos+VqvbdC5bHgG7D6vVn8+q1d3n5H8LeKP8BqkjCtbCoV8yAAACRUlEQVQoFYWTS2sTURTH//fOK8/WjKadxtBCtS5aUHDtRhTRjbhQAhZ0UwW/gCv9DOLCnUtdxMc3UBH1CwgquqilTSVpjEmmk8dMMg/PuSFCF9IDZ+Zy5/zO/Z9zz4i1Gy9y41z66cDtVZAkONSEQGY2VzV6ww2dwaVjVsVec4g9HBYEt/c6lW06RQ7cfsWeLyiQ4SiKDjjvsYdhqDyOY3A8czqSeHIiBZgIkEtxghCCMseJhBsICJHAyUsYUqLujZGINJjTpzVKCjhTNrF+YYVgSmRoaLtDvP64iV8tDw9vnoNj53Hv8Xu0glhhcgpTKmRMiVLRRj6bQa3hYtGxcevSKuayAl7PV6Esf9obBUtqAjtLYfv2s45Hz95gs9ZEs9NHEEYQkguhJtFLxfKaN9q9ETr9EfzRBF5ddvDgzhWsLM3hw+ct1H73qYxJhZ4fqXjmdJaw+2cIXUTwytQIsu16F09efsL65bO4fv40vtf28erdFyyXCthq+uiGUkk/IJuVs6UtHSfLNoqFDNV9BBY1b56atXA0B410T2UrLWo0iLRMU8GnSO792xfVuvr2K37serh7dQEnSjMwTULG6hPE8WvPk8KiQ/eaYMYYoUj3iZgaRMloHtDwIvSDBKWCCUsX2GnTEEkLnZ0G3bOgYG50ItAJDLQGEaXVVGquQmoGBEE1l4eJvmimSsycTM1mq353nxJQLTRBhmH8c53WvMcqNE2DrmvESAzbXTCnp/r+hp9NkYw9+qsmVzWp6D9POpFB5v4CTZHzZnw28TIAAAAASUVORK5CYII="		//画像データ
		},
		//Delicious
		Delicous:{
			name : "Delicous",
			storagename : "delicious",
			class : "gpsb_delicious",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					window.open('http://www.delicious.com/save?url='+encodeURIComponent(_permlink)+'&title='+encodeURIComponent(_auther)+'+-+'+encodeURIComponent('Google+ ('+_time)+'%29&notes='+encodeURIComponent(_bodytext.substring(0, 1000))+'&v=6&noui=1&jump=doclose','','width=525,height=590,scrollbars=yes');
				}, false);
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAACMUlEQVQoFV1STYoTQRT+XqcmJpmlkoUgifizcBPiCUSY2cwZhHEXPISewsvoAcSFEBB0IQwxEYmTSdJJJ1XdXV1VvlfpOGBB09316vt53ysajUb9Xq/3rtPpXHrvcbsc9nQPq8YjEDxCXSAiOGev0h+fL1S/3397dnZ2ORwOHYPpCK6cx2S+x9efGTneLquA3Absi0CZKR+Gyn5Q7Xb79WAwCLyQJEktEEAVoXAEXSI4F2AYmJcBWe5I58GnBg+UWC3LEo1GA0zArijwB9nKh7y02GhPhfXYFQw0Duu9x1bnlP7ZQIniERyB7DsEDwZjpy3m64LVGcDSaVbQOjPQZhfs+jeU9CgE4qDuWZQhatdrje/TRfw2haW9NjC5gbealNVQkl6WZZB3VVXMI9gDeHGzxHxxw/SctucceL/V5GzUHZDvQG23W4zHY2mWR+AiUBgsp2szhef908AVmQKj+RU5PIrFNdR0Oo3KnHQE1m0wVxIeP32GVy+ekGdVFgVLMzw6xJdP36BWq5XYTfi0q4HSQjg5UWiQxf27p4HrPALGii6/LP/LfYq2xWY9KsFHB81mE3leCDEqV8X9AxTc3uE/znmz2fj/bEPAkke220UC5o+hCosQyoqjWi6XdHu7OFu+pq1WK0hLaZqStTbuHQVkrBHMxY/GmJeStrDLkjbkwI5VmYCv5yGOWOSe8zxPWP1KdbvdN3z2PT/n/BzB8bpqrTGZTP7ZlGIt8ms2m138BU7TvJGG92zNAAAAAElFTkSuQmCC"
		},
		//Twitter
		Twitter:{
			name : "Twitter",
			storagename : "twitter",
			class : "gpsb_twitter",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					var a = _auther+' - Google+ ('+_time+') - ';
					a = a.replace(reg_r, "");
					window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(a)+encodeURIComponent(_bodytext.substring(0, 140-a.length-30)+' ')+'&url='+encodeURIComponent(_permlink),'','width=600,height=340,scrollbars=yes');
				}, false);
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAADHmlDQ1BJQ0MgUHJvZmlsZQAAeAGFVN9r01AU/tplnbDhizpnEQk+aJFuZFN0Q5y2a1e6zVrqNrchSJumbVyaxiTtfrAH2YtvOsV38Qc++QcM2YNve5INxhRh+KyIIkz2IrOemzRNJ1MDufe73/nuOSfn5F6g+XFa0xQvDxRVU0/FwvzE5BTf8gFeHEMr/GhNi4YWSiZHQA/Tsnnvs/MOHsZsdO5v36v+Y9WalQwR8BwgvpQ1xCLhWaBpXNR0E+DWie+dMTXCzUxzWKcECR9nOG9jgeGMjSOWZjQ1QJoJwgfFQjpLuEA4mGng8w3YzoEU5CcmqZIuizyrRVIv5WRFsgz28B9zg/JfsKiU6Zut5xCNbZoZTtF8it4fOX1wjOYA1cE/Xxi9QbidcFg246M1fkLNJK4RJr3n7nRpmO1lmpdZKRIlHCS8YlSuM2xp5gsDiZrm0+30UJKwnzS/NDNZ8+PtUJUE6zHF9fZLRvS6vdfbkZMH4zU+pynWf0D+vff1corleZLw67QejdX0W5I6Vtvb5M2mI8PEd1E/A0hCgo4cZCjgkUIMYZpjxKr4TBYZIkqk0ml0VHmyONY7KJOW7RxHeMlfDrheFvVbsrj24Pue3SXXjrwVhcW3o9hR7bWB6bqyE5obf3VhpaNu4Te55ZsbbasLCFH+iuWxSF5lyk+CUdd1NuaQU5f8dQvPMpTuJXYSWAy6rPBe+CpsCk+FF8KXv9TIzt6tEcuAcSw+q55TzcbsJdJM0utkuL+K9ULGGPmQMUNanb4kTZyKOfLaUAsnBneC6+biXC/XB567zF3h+rkIrS5yI47CF/VFfCHwvjO+Pl+3b4hhp9u+02TrozFa67vTkbqisXqUj9sn9j2OqhMZsrG+sX5WCCu0omNqSrN0TwADJW1Ol/MFk+8RhAt8iK4tiY+rYleQTysKb5kMXpcMSa9I2S6wO4/tA7ZT1l3maV9zOfMqcOkb/cPrLjdVBl4ZwNFzLhegM3XkCbB8XizrFdsfPJ63gJE722OtPW1huos+VqvbdC5bHgG7D6vVn8+q1d3n5H8LeKP8BqkjCtbCoV8yAAACXklEQVQoFYVSy2pTURRd576Smz6SNrHaPKQ+IChKkVIEwQciOimIdCDorIMOHIh/4UCc1C/wE4ROHATBF5QOBPGB+MA0TY0xSWOSJjH33nNc52rEguCGc3fOzl5rr73PFli6l3YT8RVTiEsQYhT/M6U6gVIPe83vNy13InE3f+TAYnYmDdMy/glVv6OCPvDl6ObnrcV3bz5Kg+mXMzP7YBgCMlBQcveRvDsERTWSv3VemC+MBUMIuEKQQim4JjAIJDwpQWnw6fczeCU3hrN7YrCFjil2Z/DADXX6QUB2iQt7R3As7mDSNuD5PqIsdiOfwrWDkzieiCDCHMncgEdbCFas1h/oZIU781ksH05iLhHFyVQU+bimAE5Pj2M27lK6hEFV2iztJANtL8CD999wjkln0mOYTbqodAcw2ePQzmfG0fEDvNzuhaGwsmRlndP44eP+qzJ83uMRC/mJ2BAX+rmpUSzk4lAk0MUtzeuw+z4H0WWksNlE6kUJSydycMyQ+w/B7acf8LbZR9cbyqYXHMDVQ0ls9z20ex5SI5FdcjX6WamOwsY2mpyV6+rHY2X9afcHWCs1cP3oNE5lEnDYAzdO/xXa8406VtaLVMb3iRIyHBjrwuflda2DlbVPeJwcwXw2galYBG3O4EmxhvVKC1VfwXYc4n5J1jhLKdnjyrkGd62842GrVcejYj2szDGgx480TVi2FQIDDkuSQOMMutVatRFujulQkmOja1pocYs6JFS86zgVhyD9ErWvDW6EWrV6A//Wl3LVrpSrF7l2fJuhrGHHf3uhQTssXNC4n2kuHSUolG64AAAAAElFTkSuQmCC"
		},
		//Evernote
		Evernote:{
			name : "Evernote",
			storagename : "evernote",
			class : "gpsb_evernote",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					try{
						var a = _event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
					}catch( _error ){
					}
					var b = document.createRange();
					//G+meがインストールされているかどうか調べる
					if(a.className.match(reg_m)){
						b.setStart(a.firstChild, 0);
						b.setEnd(a.firstChild.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling, 0);	
					} else {
						b.setStart(a.firstChild, 0);
						b.setEnd(a.firstChild.firstChild.nextSibling.firstChild.nextSibling, 0);
					}
					var c = getSelection();
					c.removeAllRanges();
					c.addRange(b);
					
					location.href = "javascript:(function()%7BEN_CLIP_HOST='http://www.evernote.com';try%7Bvar%20x=document.createElement('SCRIPT');x.type='text/javascript';x.src=EN_CLIP_HOST+'/public/bookmarkClipper.js?'+(new%20Date().getTime()/100000);document.getElementsByTagName('head')%5B0%5D.appendChild(x);%7Dcatch(e)%7Blocation.href=EN_CLIP_HOST+'/clip.action?url='+encodeURIComponent(location.href)+'&title='+encodeURIComponent(document.title);%7D%7D)();";
					
					setTimeout(function(){
						c.removeAllRanges();
					}, 5000);
					
				}, false);
			},
			imagedata : "data:image/png;base64,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"
		},
		//Facebook
		Facebook:{
			name : "Facebook",
			storagename : "facebook",
			class : "gpsb_facebook",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					window.open('http://www.facebook.com/sharer/sharer.php?src=bm&v=4&u='+encodeURIComponent(_permlink)+'&t='+encodeURIComponent(_auther)+'','','width=626,height=436');
				}, false);
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAADHmlDQ1BJQ0MgUHJvZmlsZQAAeAGFVN9r01AU/tplnbDhizpnEQk+aJFuZFN0Q5y2a1e6zVrqNrchSJumbVyaxiTtfrAH2YtvOsV38Qc++QcM2YNve5INxhRh+KyIIkz2IrOemzRNJ1MDufe73/nuOSfn5F6g+XFa0xQvDxRVU0/FwvzE5BTf8gFeHEMr/GhNi4YWSiZHQA/Tsnnvs/MOHsZsdO5v36v+Y9WalQwR8BwgvpQ1xCLhWaBpXNR0E+DWie+dMTXCzUxzWKcECR9nOG9jgeGMjSOWZjQ1QJoJwgfFQjpLuEA4mGng8w3YzoEU5CcmqZIuizyrRVIv5WRFsgz28B9zg/JfsKiU6Zut5xCNbZoZTtF8it4fOX1wjOYA1cE/Xxi9QbidcFg246M1fkLNJK4RJr3n7nRpmO1lmpdZKRIlHCS8YlSuM2xp5gsDiZrm0+30UJKwnzS/NDNZ8+PtUJUE6zHF9fZLRvS6vdfbkZMH4zU+pynWf0D+vff1corleZLw67QejdX0W5I6Vtvb5M2mI8PEd1E/A0hCgo4cZCjgkUIMYZpjxKr4TBYZIkqk0ml0VHmyONY7KJOW7RxHeMlfDrheFvVbsrj24Pue3SXXjrwVhcW3o9hR7bWB6bqyE5obf3VhpaNu4Te55ZsbbasLCFH+iuWxSF5lyk+CUdd1NuaQU5f8dQvPMpTuJXYSWAy6rPBe+CpsCk+FF8KXv9TIzt6tEcuAcSw+q55TzcbsJdJM0utkuL+K9ULGGPmQMUNanb4kTZyKOfLaUAsnBneC6+biXC/XB567zF3h+rkIrS5yI47CF/VFfCHwvjO+Pl+3b4hhp9u+02TrozFa67vTkbqisXqUj9sn9j2OqhMZsrG+sX5WCCu0omNqSrN0TwADJW1Ol/MFk+8RhAt8iK4tiY+rYleQTysKb5kMXpcMSa9I2S6wO4/tA7ZT1l3maV9zOfMqcOkb/cPrLjdVBl4ZwNFzLhegM3XkCbB8XizrFdsfPJ63gJE722OtPW1huos+VqvbdC5bHgG7D6vVn8+q1d3n5H8LeKP8BqkjCtbCoV8yAAACF0lEQVQoFYVSS2sTURT+ZnLTPEqjaZlaH9RKB1y1caHtQnGhuHBRKLgUEYSCa3Xpyq2L/gFB8A+4chW6ETeKiBXFosVaY51KE4ckTTKPe+94zq2NYbroZQYO95zvce451uLdp1O+t14VQ3k3QYLDjgULMgrWy8fda2Jna61aOX/ZLZeHD8P1877fcVffvqwKy8q7ktg2vWY/mQ60TqCUIl8JsiKL4UIWjBNSS7S7IdVbaQwVAHEsMVoaQiFLYCJodDNoUT3jhFbMyr0e7DdJEowUM7izWMHc7KQhv/e4itrvNhgnlNJQWh9QZdkgVFi6cc4Av/zw0doN0e5FUETKOKG0IgspMAHjKEK90UQ+Zxvi5Wev8PpDDScmxiAyNgkqtk3KxvZ/cXYyXs5j7mwJztGCSVyqTODkmMDqtw565IhxIqZHiCkYPL0gxsz8FO7fmu9f31y4YOKlRy/Q3G0RhpVJJd2zEDbefPyFB8sruL0wixnXwZPn7/G15mO70YGmnhlHtkk5Vn2FvcCCt9PG2kYd1y9O05WDd589IvT+zdgi26ycaBwbL5kFSDHgSCBRpIXg4zgjmDzVA7viFf35iV+b+o17IUROpLEgerrbm79FNhP6QV8cSjMqW8vg+/ZWHRHNj5cioVUc/Pd3h3NUYOq4nnGWe+XhdPfPxopt507vqwxayNBMbZq7lKRsmKhfHW4WR89c/Qu1PR/tZBsKtgAAAABJRU5ErkJggg=="
		},
		//Tumblr
		Tumblr:{
			name : "Tumblr",
			storagename : "tumblr",
			class : "gpsb_tumblr",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					window.open('http://www.tumblr.com/share?v=3&u='+encodeURIComponent(_permlink)+'&t='+encodeURIComponent(_auther)+'+-+'+encodeURIComponent('Google Plus ('+_time)+'%29&s='+encodeURIComponent(_bodytext)+'','','width=500,height=450');
				}, false);
			},
			imagedata : imagedata_tumblr
		},
		//ReadItLator
		ReadItLater:{
			name : "Read It Later",
			storagename : "readitLater",
			class : "gpsb_readitlater",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					var a = _event.target;
					a.removeEventListener("click", arguments.callee);
					if(a.className=="Read"){
						return;
					}
					a.src=imagedata_Read;
					a.className="Read";
					var b = document.createElement("img");
					b.src = "http://readitlaterlist.com/v2/r.gif?v=1&h=bf6b&u="+encodeURIComponent(_permlink)+"&t="+encodeURIComponent(_auther)+"+-+"+encodeURIComponent("Google+ ("+_time)+"%29&rand="+Math.random();
					b.style.display = "none"; 
				}, false);
				
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAADHmlDQ1BJQ0MgUHJvZmlsZQAAeAGFVN9r01AU/tplnbDhizpnEQk+aJFuZFN0Q5y2a1e6zVrqNrchSJumbVyaxiTtfrAH2YtvOsV38Qc++QcM2YNve5INxhRh+KyIIkz2IrOemzRNJ1MDufe73/nuOSfn5F6g+XFa0xQvDxRVU0/FwvzE5BTf8gFeHEMr/GhNi4YWSiZHQA/Tsnnvs/MOHsZsdO5v36v+Y9WalQwR8BwgvpQ1xCLhWaBpXNR0E+DWie+dMTXCzUxzWKcECR9nOG9jgeGMjSOWZjQ1QJoJwgfFQjpLuEA4mGng8w3YzoEU5CcmqZIuizyrRVIv5WRFsgz28B9zg/JfsKiU6Zut5xCNbZoZTtF8it4fOX1wjOYA1cE/Xxi9QbidcFg246M1fkLNJK4RJr3n7nRpmO1lmpdZKRIlHCS8YlSuM2xp5gsDiZrm0+30UJKwnzS/NDNZ8+PtUJUE6zHF9fZLRvS6vdfbkZMH4zU+pynWf0D+vff1corleZLw67QejdX0W5I6Vtvb5M2mI8PEd1E/A0hCgo4cZCjgkUIMYZpjxKr4TBYZIkqk0ml0VHmyONY7KJOW7RxHeMlfDrheFvVbsrj24Pue3SXXjrwVhcW3o9hR7bWB6bqyE5obf3VhpaNu4Te55ZsbbasLCFH+iuWxSF5lyk+CUdd1NuaQU5f8dQvPMpTuJXYSWAy6rPBe+CpsCk+FF8KXv9TIzt6tEcuAcSw+q55TzcbsJdJM0utkuL+K9ULGGPmQMUNanb4kTZyKOfLaUAsnBneC6+biXC/XB567zF3h+rkIrS5yI47CF/VFfCHwvjO+Pl+3b4hhp9u+02TrozFa67vTkbqisXqUj9sn9j2OqhMZsrG+sX5WCCu0omNqSrN0TwADJW1Ol/MFk+8RhAt8iK4tiY+rYleQTysKb5kMXpcMSa9I2S6wO4/tA7ZT1l3maV9zOfMqcOkb/cPrLjdVBl4ZwNFzLhegM3XkCbB8XizrFdsfPJ63gJE722OtPW1huos+VqvbdC5bHgG7D6vVn8+q1d3n5H8LeKP8BqkjCtbCoV8yAAACPElEQVQoFYVT22oTURRd58ycTNLcW5uaCCoFtV4bH1pKIaCvil8Rgm9+g58hhL76BeqDiFRE6kPFhz6Uxtgatbk0iclM7pmb++QiDghuZs6wZ/Zea5119rBCoZDO5XKvdF1PmqaJ/4UQAuFwuLyzs/OQZTKZ03g8nup0DHDGp71MPibLDMsF6JpHMBQCkVXUTqeT8vl8UFUVjgPEIxzXLoUQ0BS49OK43MOPmo0/uITZ7XbRarWS6t9SXdfF+pUFPHn8CKGlm4Bt4O2bF3j2/ADtvoDKHcgaGbZtY6ZzKogxhmp9gEqjAR71gy+uYHPrOrbXw7QlamLqtHC2KolE4mmI9sA5B2MK6m0bTv8nbqxa8EcFtMgCIryLw6MqfnUVApHsU+lcss2Dcxdc0fD50MKnvSIcvTn5tHb7Ku5vLSMcsCf5pIcQPLKlo5pgaPYE9va/4+zbETBoQYksYiN9Gan4dL9ylbd3EyTCoSMSioNYREAIH2ARm6WjdtaEMZgQU+cUxMtMjaOxjZXoANsbF7F0/gJVc5SLX/B69wTVlrecz62XmDadc1AMcW9zGbfSd0COwdTbeP+hgINjOhrFK9STuY6N1RTD3bUYSsWv0AJ+NGoNvNvX0Rtr5IcDkwhkSNNUOavzRL4YDB3sfiyhdDrCuZiC/kjBSV1QsQ3TIkeoRqqVE6lGo9FKMBhMzme7WAaK5bHEJkdpLMlCT5Cpci6Gw6HB5F+VzWZfGoaRsizLU/evRCqVhPl8/sFv2XziBlamjp4AAAAASUVORK5CYII="
		},
		//RTM
		Rtm:{
			name : "Remember The Milk",
			storagename : "rtm",
			class : "gpsb_rtm",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					_time.match(reg_d);
					window.open('http://www.rememberthemilk.com/services/ext/addtask.rtm?d='+encodeURIComponent(RegExp.$1)+'&t='+encodeURIComponent(_bodytext),'','width=475,height=260');
				}, false);
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAACj0lEQVQoFXVTTU8TURQ905mBToC2QkspaRpaCIFECFLDwpjYYtSS+JFYWJjowoUbbfwL4j8wRl2w0fgVcGdiohGRxAQWGkpFA1PKV4B+DNMCCdSOtDPje4OFYOJJ5s69c+e8e+a9M8zQxHLX4ON3d3Vd7TSxrB9l6CRhysXhXVPVKVJF70euPGFc1x4MdZxou9XT1ghVowyANTHgeRYMs88ulTQUS6rRo2FqPo2fscRTjuTd/lYXfA2Wg+bq+9dQfu2gKRBGKh5FeuYbahqbcfLqdUMNXfzHtNjJlaUufPmI9JIIWcrgRvgy0pkMUpl1VKsFhAfCEBOLSK0soN7dZCikPDrZQIuNg7PFg08rCTx/9gLShoTp7zH0nglid2sT4mwcSmkMlto6uC7dNjgH5A1pAyzHGg9VXYWz3om+8yGjHv0wCpY3IdTXB13XoZD9oDggZxgBlkoBpwNBhC6cxfj4OCr5SlisFvh8PoyMvMF6Novm9g6o/5J7QmH8Vgo4lo3D2+TFsDQMj9uDufgc+gf6MbuwBM3ThSqLFWJq++hkWsmLItpaHKiuqUYkEkF+Nw+rzYpCoQCF5CgWYdY05JWiQTYZ8W/Y25LR0OA0vstut8Pr88LhcIDneFRVCdjMyWBZFhXcPu0IOZ9LE4Ow+Dw2BlmWMTkxCSkjwSyYYSMKKkxHXj/cMJXI2dreQTKZRCAYhEZqm80GQRCQy+WwlkzBfvwUWfxQK0e9ShzjrxF4tAZ68fLVCGLRGFxul7HbiqJgfj6BQq0b9dY6mMmRUVAexzDszFcx5Td8zThhOXcTq6RJL32PuJEeabuPBCC2nDV8T71NEGXoX3Xv0Vtqme6yVWnnf6AT6cDBOxcf/gGwP/nmAUD1ogAAAABJRU5ErkJggg=="
		},
		//あいさつ
		aisatsu:{
			name : TextList.Aisatsu,
			storagename : "aisatsu",
			class : "gpsb_aisatsu",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					var a =_event.target;
					var b = 1;
					for( c in Aisatsu ){
						var d = eval("Aisatsu."+c);
						if(d.Reg.test(_bodytext)){
							if(d.Rep){
								autopost(a, d.Rep, 0);
								b = 0;
							}
							break
						}
					}
					if(b){
						alert("該当する返答メッセージが見つかりませんでした")
					}
					
				}, false);
				
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAACM0lEQVQoFV1TQWgTQRR9k51G00ijJxGkJ8X2kDXbUIkR1BK04qlKpXqooGgtQQIF8aY3BQ+KBNpiQCIKIiVVq1BQpEU9SdW0KZZ66qHYi8Q2umjcbHb8k91sNr7D7J+Z9+b/+fuGreRHIw8zuVQVULnCo3AgBMBYfdb4mlXzEwQ+n7vUP8auD/dk+vpOXNTCfmKTQkKQiit2XBvp6KqzR/N8oYKXU8+yHAxdmtoCBFtdstQyi86Az13zBlpYx/MpqD63VE9SVi7h8Z2cl98cU4VSx72r8ws/sfR6GnrxB0rrRYxfTcMwyoBpIti2FRduJm26oGsQXLGgCiNqKyIdCbx99R1FfQ0nzxymu1aIFYCQBBe2zLtCd/RD+LejrX0nNpZXMPN0Cekro5iZLAA+akIdTjMbYssOmVHE+wcZSlhFaM9uWFUTpmFg/EYacs+GXXZDTKtzhRLGbj9C/PwwuJ+DWyY6ehM4cnofYr2DmHjywa6AeiDRJP44nUVyZBBaOIRfSgnvXtzHseNqjdi1dzO+zc0DskJme6BJbKz+BgLboOAv/qzq6E4MQCibyGkW3kwuoz2m1Q6qD263ZUM64z24m7pF7hDYdSiGQHALZicW8OXrLHkJuHwthYrJQZaqgdteZVG9HEL81FEcHEg4W86ncwf24wC4zyAhUDYDJF6H1MmmF/KLRlRT15pFcia9Lr3qQYvYQH6R/j09DiZfVfZeLik97lrVQ/4/lBllwrND/el/LPXL3x9RjfsAAAAASUVORK5CYII="
		},
		//Ripples
		Ripples:{
			name : "Ripples",
			storagename : "ripples",
			class : "gpsb_ripples",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					_permlink.match(reg_ri);
					window.open('https://plus.google.com/ripples/details?activityid='+encodeURIComponent(RegExp.$2),'_blank','');
				}, false);
				
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAACRElEQVQoFW1Tz29SQRD+9r1dHrRFaKlyqBFiTVATQtpq0kTTgzGc/RPUpBf/Je8eOfTQm70QTo0Rfx4MFk2AqgmiIPD62B/O0Lxqo5Psm53d+WZmv5knms3mxt7e3pPZbFZxzm2CRAihSRmyjed5rHW8N8a8ovvX1Wr1mazVarulUulhsViUdAhy4uVzEALOba11fM56tdvt3q3X6wuSjM1CoeDn83mwUywc5H8ipUwopRKtVus2g29RRhFH5+wDN8OBeYEwZREMNe4HFWS9zDw7lQ3f93m/4ZGzzwCWWDf1ESZJBxVqyAuLOJx9PndP/DA4YPD8Iv5MncVX3UFWLCHhAqwkMjgOge/DaewCKp3B5h9wQMGWqMTI/cJCMgXjARnlsJxOnoF5Q0mN5A2zyhJZjcMPGt3hdXwrdnAl18GkZ/Dg+Rr02ie47TSUys196aPn7WFLE7kHRwQ8SWH9Yhayt4R+PYVHX/oo3rwKG43Qq/eh7uUQRdFp2XFWa4DjQYCMLzEZD7GaSyI1ymIlm8HUjBG6FMTHU34YQ+vPm4kASGLRWiqDHnMyNfAoonAC1iUhPQ0/PeYiOSsvzY9ldygpsLMu8GP0E84q2HGIna0ErNJQUYhRfwC1fZld58JsS2r4G7IqCSVRyAO7lxQcQsrmw8MicOMaphDwzTJE4MOnNpHMiO33PGHv2u122VrLDzrXdC6Pp+lMTuhvoQmj2Y4I3BT7+/t3Go3GYyJgi5wqPDS8WFgzOX+dMegtBXxZLpef/gbMCB4q43ZyugAAAABJRU5ErkJggg=="
		},
		//どこいな
		Dokoina:{
			name : TextList.Dokoina,
			storagename : "dokoina",
			class : "gpsb_dokoina",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : false,
			defaultshowflag_s : "false",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					autopost(_event.target, "どこいな", 0);
				}, false);
				
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAACZElEQVQoFW2TX0hTURzHv/fu3iFzsqb7yxRnEFE2sk3KHnpIi6BUEh9FJBBfejWCURTsIRYW4kPsbQ8K9RDr2ZJKH9ZDm5RFsM2BbWwKW0vyYbi//X4HryzoB79zfzv3fH7n+73nTEqn055wOHyzVCrdUhTFK8tye7PZBKckSeDQno1GY79Wq3222+1v5ubmNiS/33/P4/FcdzqdXlpkIkhhgJq0QqIZzVUJ/p3L5aKJRCKq0I6jDoej3+fzdTHwZesrXkcimJ6aQv+Zs9xHgIlkEkajUbVaLLZyuXypUCh0ynq93keQiUGdTodBrw9b377jSTAoduf5WDwu6oePHyGXz7Mii6qqPoVetpOXY4/sz9LVictDQ2KOd74wMIDRiQm8WFoCqUQqmVSJUxX+MBzaR+HaZDLBbrNziTo1pl3wcnlZzDfqdaGCOVmsoIFhrcHI1WG8//gBD0im66QbzxYX0Wk2QyFbbIOT47+wwWDA6toa8vldPA8+xZ2ZGbGYB7bIySGORVRHQ3BhAXQciEU/4QTJ52CJrckwq/wH3t3bA10U3J+fP4ZEQQMDLFezJzxrPvlHMpVCR4dRWy+efw4O8KtUEsfIR6kFczJ13KfJKr/g41l9+w5XRoYxPjmJ3tOnYLXb0N3Xi9T2ttiZ15GCQ+YU8henPE9pYcmvVlYQ29zEzs8d3B4fQ1tbG3q6e9DndqNSqYgksFCtVn9IgUDgrtvtvmY2my9SR2u9Xlc1aa3PI6+HZI9uZmE9m81uSJlM5lwoFLpRLBbH6KoOUgPxr2oFuWaYpZLCmMvliszOzq7/BesbDy0+TkndAAAAAElFTkSuQmCC"
		},
		//コマンドを実行
		Command:{
			name : TextList.Command,
			storagename : "command",
			class : "gpsb_command",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : false,
			defaultshowflag_s : "false",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					var a = prompt("コマンドを入力", "");
					var b = _event.target;
					try{
						var c = _event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;	//ポスト全体
					}catch( _error ){
						var c = 0;
						console.error("ポストエレメントが見つかりませんでした(error: - "+_error+")");
					}
					switch(a){
						case "po":
							function GplusPost (_message){
								//SendIdとUserIdの取得
								var ajax1 = new XMLHttpRequest();
								ajax1.onreadystatechange = function() {
									if ( ajax1.readyState == 4 && ajax1.status == 200) {
										if(ajax1.responseText.match(/\"(AObGSA.*:\d*)\"/)){
											var sendid = RegExp.$1;			//SendIdの取得
											ajax1.responseText.match(/OZ_initData[ ]?=[ ]?\{\"2\":\[\"(\d*)\"/);
											var userid = RegExp.$1;			//UserIdの取得
											
											//Google+に一般投稿をする
											var ajax2 = new XMLHttpRequest();
											ajax2.onreadystatechange = function( ) {
												if ( ajax2.readyState == 4 && ajax2.status == 200) {
												}
											};
				
											//重複を防ぐためのカウント
											var gSeq = 0;
				
											//文字列のエンコード
											var encStr = function(s){
												return escape(s).replace(/%/g, '');
											}
											
											//投稿対象になるエリア
											var scopeData = {
												aclEntries: [
													{
														scope: {
															scopeType: 'anyone',
															name: encStr('全員'),
															id: 'anyone',
															me: true,
															requiresKey: false
														},
														role: 20
													},
													{
														scope: {
															scopeType: 'anyone',
															name: encStr('全員'),
															id: 'anyone',
															me: true,
															requiresKey: false
														},
														role: 60
													}
												]
											};
											
											//投稿内容
											var spar = [
												encodeURIComponent(_message),
												'oz:' + userid + '.' + new Date().getTime().toString(16) + '.' + (function(){return gSeq++})(),
												null,
												null,
												null,
												null,
												'[]',
												null,
												JSON.stringify(scopeData),
												true,
												[],
												false,
												false,
												null,
												[],
												false,
												false
											];
											
											ajax2.open('POST', "https://plus.google.com/_/sharebox/post/?spam=20&_reqid="+(function(){
												//_reqidは7桁のランダム数
												var a = String(Math.floor(Math.random(9999999)*1000000));
												while(a.length<7){
													a = "0"+a;
												}
												return a;
											})()+"&rt=j", true);
											
											//投稿用ヘッダの設定
											ajax2.setRequestHeader('X-Same-Domain', '1');
											ajax2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
											ajax2.setRequestHeader('Pragma', 'no-cache');
											ajax2.setRequestHeader('Cache-Control', 'no-cache');
											ajax2.setRequestHeader('Connection', 'keep-alive');
											
											//ポスト
											ajax2.send("spar="+JSON.stringify(spar)+"&at="+sendid);
										}
									}
								};
								ajax1.open( 'GET', "https://plus.google.com/", true );
								ajax1.send();
							};
							GplusPost("投稿テスト");
							break;
						case "se":
							var d = document.createRange();
							d.setStart(c.firstChild,0);
							d.setEnd(c.firstChild.firstChild.nextSibling.firstChild.nextSibling,0);
							var e = getSelection();
							e.removeAllRanges();
							e.addRange(d);
							break;
						case "dokoina":
							autopost(b, "どこいな", 0);
							break;
						case "clear":
								var d = contentpane.getElementsByTagName("div");
								var e = d.length;
								for(var f=0;f<e;f++){
									if(d[f].id.match(reg_u)){
										d[f].removeChild(d[f].firstChild);
										d[f].style.display = "none";
									}
								}
		
								
							break;
						case "red":
							c.style.backgroundColor = "red";
							break;
						case "black":
							c.style.backgroundColor = "black";
							c.style.color = "white";
							break;
						case "gbn":
							document.getElementById("gb").style.display = "none";
							break;
						case "":
							window.alert("見入力です。");
							break;
						default:
							window.alert("無効なコマンドです。");
							break;
					}
				}, false);
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAACIUlEQVQoFXVTTWgTQRT+9ifJRqhUW0IOIpFmUdBmbXMpRjEIhRKLUm39yyEXe9BDclG8WJSeBCmSPSioUInQg9JWEFtBIYVWSgMGLRaJyb10LV5yTuJ7Y2aoVB/MzL6f75v33rzVSqXScdd1s61WK2YYRhxtIR2apklVnY1G4zMp5Vwu91hLp9NPM5nMuG3bYAALg3w+n/jmjQBiSUOtVkOhUJg2ydAfjUYRCoWkD7quo9lswjTZvVuYnDPVZaoM+LS2BmdgAN8rP2BZlgAzwc7FpJwh4xT1u8X3KH/9goX5Nwh1d+2+rm3x+/2qBAUevTCCSqWCnkMRvF1YpJpNDA0O4tXcPLq79uHM6aQilOXo0vKxWMRD18XK6ipevCzgzsQE6vU6ro6NYnNzS4aJUzbTcBznfjKZhBOLwe6x4f304HkewuEwPiwtoddxqIEG9gSDaBI0GLQEaZEuU2kz5ZHDtljbv7YRORjBg6kp3L19C4kTCRwIT+PJs+e4MX4d+zs7RQZ/gYWFtrGRi/DTO8/NzMAwDTxy8xhKpeD09WF5eQXnzqZEqKpZAvkMUEf5LbmzBqXc0bEX3zY28Hp2Fr3HjqpQBW62uKJ/SyBg4d7kJM4PD+PUyYQKMnlW6Za4z/wzjnJEOYK/OYNrly/hCnWdRT4T40xyrler1fhOkIiiTYKlzieT8WyTlDX+q/L5/E1S+uWosud/0s50PZvNur8BPIu1lnkHmzgAAAAASUVORK5CYII="
		},
		//フルサイズ画像を開く
		OpenFullsizeImage:{
			name : TextList.OpenFullSize,
			storagename : "openfullsizeimage",
			class : "gpsb_fullopen",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 1,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					var a = _imageurl.length;
					for(var b=0;b<a;b++){
						window.open(_imageurl[b],'','width='+(screen.width/2)+',height='+(screen.width/2.66666)+',scrollbars=yes');
					}
				}, false);
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAADHmlDQ1BJQ0MgUHJvZmlsZQAAeAGFVN9r01AU/tplnbDhizpnEQk+aJFuZFN0Q5y2a1e6zVrqNrchSJumbVyaxiTtfrAH2YtvOsV38Qc++QcM2YNve5INxhRh+KyIIkz2IrOemzRNJ1MDufe73/nuOSfn5F6g+XFa0xQvDxRVU0/FwvzE5BTf8gFeHEMr/GhNi4YWSiZHQA/Tsnnvs/MOHsZsdO5v36v+Y9WalQwR8BwgvpQ1xCLhWaBpXNR0E+DWie+dMTXCzUxzWKcECR9nOG9jgeGMjSOWZjQ1QJoJwgfFQjpLuEA4mGng8w3YzoEU5CcmqZIuizyrRVIv5WRFsgz28B9zg/JfsKiU6Zut5xCNbZoZTtF8it4fOX1wjOYA1cE/Xxi9QbidcFg246M1fkLNJK4RJr3n7nRpmO1lmpdZKRIlHCS8YlSuM2xp5gsDiZrm0+30UJKwnzS/NDNZ8+PtUJUE6zHF9fZLRvS6vdfbkZMH4zU+pynWf0D+vff1corleZLw67QejdX0W5I6Vtvb5M2mI8PEd1E/A0hCgo4cZCjgkUIMYZpjxKr4TBYZIkqk0ml0VHmyONY7KJOW7RxHeMlfDrheFvVbsrj24Pue3SXXjrwVhcW3o9hR7bWB6bqyE5obf3VhpaNu4Te55ZsbbasLCFH+iuWxSF5lyk+CUdd1NuaQU5f8dQvPMpTuJXYSWAy6rPBe+CpsCk+FF8KXv9TIzt6tEcuAcSw+q55TzcbsJdJM0utkuL+K9ULGGPmQMUNanb4kTZyKOfLaUAsnBneC6+biXC/XB567zF3h+rkIrS5yI47CF/VFfCHwvjO+Pl+3b4hhp9u+02TrozFa67vTkbqisXqUj9sn9j2OqhMZsrG+sX5WCCu0omNqSrN0TwADJW1Ol/MFk+8RhAt8iK4tiY+rYleQTysKb5kMXpcMSa9I2S6wO4/tA7ZT1l3maV9zOfMqcOkb/cPrLjdVBl4ZwNFzLhegM3XkCbB8XizrFdsfPJ63gJE722OtPW1huos+VqvbdC5bHgG7D6vVn8+q1d3n5H8LeKP8BqkjCtbCoV8yAAAB9UlEQVQoFX1TS2tTQRT+Zu7cmz6VbhoNWmu0WK1FQXyBG/FniPgDujEgVDeCC+lKW/prRLpzUwpudCEhUKGKpQWb+MKb3Mf4nZk7sQv1QLhn5nyvmSGqtTSzMKqP3rMol8FSSsvnr2Vt6fYV1Oaz9Xc3TQ1H7tbrs8tXzp9GY3oKaVaAQ4LsUGDAPanJsaT8vN/Vb95/uPFo6dJrkxX548WzMzh5bAq9gx6222/pLlAvIZ1UaRWa5y5qwYnYzqfOLSODrz9TjI/E2GxvY3fiPkpoJgCKYE6xUXzHoP0Sd25fd3jhmXCObJAh0hp6+jL6TNnpAak/IqiFBrqYzV5BcFLCc85i4KMC39IcObcnIkZ1MHJJrsGfW3AhkCN7Jb8rUXNRJiGpyBF7ajmW5dlDObJfWucuUQtuiENcSUfspfXpiKvYQ+cQ+0dhUIoNf+IoGRXPp6usASf8P2QuDg9k6EpcKTLOr8yDq8xE21W4hLD+1/cwzjn3B7xfkyArSpzAR+yhjj5ijNg+jqsucl7SZJS6ueAEL2U036GWUENZzM+dQtJZwzz7UL6zfFegObfgcIIXnokitbqzu9/aoNqFMw00F685XhK7x6k0FO/NIs8LbGx1sPflgK5mRVlKPmldXc2LXw/+948aJuHNx2bs+dMXWw9/A4XBs9AbEEZiAAAAAElFTkSuQmCC"
		},
		//フルサイズ画像をダウンロード
		DownloadFullsizeImage:{
			name : TextList.DonwloadFullSize,
			storagename : "downloadfullsizeimage",
			class : "gpsb_fulldown",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 1,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					var a = _imageurl_d.length;
					for(var b=0;b<a;b++){
						window.open(_imageurl_d[b],'','');
						window.focus();
					}
				}, false);
			},
			imagedata : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAACM0lEQVQoFX1T30tUQRT+5v7Y9bpCu6i1krWmLVRSEAVtEAYF/RORUO+lkSCBhvYSGOVLb/0DJvQaRfhUD/sURVSQuCEVi6a1u7bm7tw70zkz3tWH6OzDzJw533e++c5dcXfy2GBKpK9oocZBIYTLyz9D68jkBVC8NV086wV6z+XubH78eL4fezvTaMgIgn6AbhHI0IJSQUKtrlec94ulwv0J75UnVXj7yKEcsl1pbFSr+Lr0lrozzlLEDEoLHBg44XCdDHP49v3jOY8vNza3ECR9vCstYaVjGIrQDQlEcXMia0MdsvQChcIZU884L35HKCVc4UB0HYVUwGIN+EOrCQfYjxoONl+C6zgYZzpzAyuVVDQjhHDRQb7ZlwIOgZOxWaQiFmTAlsk81EhlED0RyW3jXdrHM9B8sR0GbI/aeNwgqRElWIlPHa/OTSDza5nAIfyoDL/4CeLSkIHTtY1Y9u/IRZ10KWp1bZ6AleW4BLg+A3d1DSefPje5HTAfrYRWcfqnBTKxIe/NmbugUjFrCxyb0ELu2ujhEaj519Bt7buyZCSfmk3y100gVIpGUkYSPA72QNE4JJzzF+FNj0D39JIEh8ZkW3mO4yKRIN+ERn9fH/wvj5CnPYduX4Nfq0MvzEHfGIP/4Y0h3cpkaHwuxMyd0w+z+wZvdmc6cTjXQ6wGB9+zw8k+fgL/x7pJalJTDQI8GzqFlfLne8ai2akLs5HeHP3fP8pSkhr+srzUg9HJhbG/64vFDuDkp58AAAAASUVORK5CYII="
		},
		//スクロールを固定
		ScrollLock:{
			name : TextList.ScrollLock,
			storagename : "scrollLock",
			class : "gpsb_scrollllock",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : false,
			defaultshowflag_s : "false",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
						var gpsbimid = _event.target;
						if(gpsbscrolllock_flag == true){
							pagelock.end(gpsbimid);
						}else{
							//イベントの登録：スクロールを固定：イベント登録
							pagelock.start(gpsbimid);
							
						}
				}, false);
			},
			imagedata : imagedata_pin1
		}
	/*****************************************************************************
		{
			name : "",
			storagename : "",
			class : "gpsb_",
			noconfigflag : 0,
			showflag : 0,
			defaultshowflag_i : true,
			defaultshowflag_s : "true",
			postshowflag : 0,
			imageshowflag : 0,
			event : function(_element, _bodytext, _permlink, _auther, _time, _imageurl, _imageurl_d){
				_element.addEventListener("click", function(_event){
					
				}, false);
				
			},
			imagedata : ""
		}
	******************************************************************************/
	};
}

//Google+ストリーム：Google+が開かれたとき実行
var a = location.href;
if (a.match(reg_g)||a.match(reg_gp)||a.match(reg_t)||a.match(reg_a)||a.match(reg_v)||a.match(reg_n)||a.match(reg_o)||a.match(reg_pa)){
	
	//変数の初期化
	var scrolllockstop = 0;
	
	//新規ページの全てのポストにボタンを追加
	function pageopen(){
		setTimeout(function(){
			//全てのポストにSNSボタンを挿入
			var a = contentpane.getElementsByTagName("div");
			var b = a.length;
			for(var c=0; c<b;c++){
				if(a[c].id.match(reg_u)){
					sbminsert(a[c]);			//挿入
				}
			}
			
			//全てのコメントに返信ボタンを挿入
			try{
				var a = document.getElementsByTagName("button");
				var b = a.length;
				for(var c=0;c<b;c++){
					try{
						if(a[c].getAttribute("g:entity").match(reg_cm)){			//コメントの+1があるかどうか調べる
							replyinsert(a[c]);										//コメントの+1の親に返信ボタンを挿入する
						}
					}catch(_error){
					}
				}
			}catch(_error){
			}
		},timeout);
	}
	
	//ページが切り替わったことを通知し、ボタンを表示する
	var PushEnter = {
		Flag : 0,
		Button : function(){
			if(Buttonlist.ScrollLock.showflag){
				try{
					pagelock.end(gpsbscrolllock_element);
				}catch( _error ){
				}
			}
			PushEnter.Flag = 1;
			setTimeout(function(){
				if(PushEnter.Flag){
					PushEnter.Flag == 0;
					pageopen();
				}
			}, 1500);
		},
		Draw : function(_event){
			if(PushEnter.Flag){
				if(_event.tagName == "A"){
					if(_event.href.match(reg_gp)){
						PushEnter.Flag = 0;
						pageopen();
					}
				} else {
					var a = _event.getElementsByTagName("div");
					var b = a.length;
					for(var c=0;c<b;c++){
						if(a[c].id.match(reg_u)){
							pageopen();
							break;
						}
					}
				}
			}
		}
	};
	
	//自動ポスト（ボタン一覧でのみ使用可能）
	function autopost(_element, _text, _flag){
		scrolllockstop = 1;
		try{
			if(_flag == 0){
				//通常の実行
				try{
					//google+snsbutton
					var a = _element.parentNode.parentNode;
					var b = _element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;	//ポスト全体
				}catch(_error){
					console.error("Google+ SNS Button - Error : ストリームへの返信に失敗しました");
				}
			} else {
				//返信の実行
				try{
					var b = _element.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;	//ポスト全体
					
					//google+snsbutton
					var a = (function(_element){
						var a = _element.getElementsByTagName("Button");
						var b = a.length;
						for(var c=0;c<b;c++){
							if(a[c].getAttribute("g:entity").match(reg_bz)){
								return a[c];
							}
						}
						
					})(b);
				}catch(_error){
					console.error("Google+ SNS Button - Error : お知らせウィンドウへの返信に失敗しました");
				}
				
				//返信IDの取得
				var reply = (function(_element){
					_element.parentNode.parentNode.previousSibling.firstChild.href.match(reg_id);
					return RegExp.$2;
				})(_element);
				
				//返信するユーザー名の取得
				var username = (function(_element){
					return _element.parentNode.parentNode.previousSibling.firstChild.innerHTML;
				})(_element);
			}
			
			//「.editor」要素があるか調べる
			var d = b.getElementsByTagName("div");
			var e = d.length;
			var f = 0;
			for (var g=0; g < e; g++) {
				if(d[g].id.match(reg_e)){
					f = 1;
				}
			}
			
			if(f == 0){
				//投稿ボタンが見つかるまで実行
				while(1){
					try{
						a = a.nextSibling;
					}catch(_error){
						//見つからなかった場合ループを抜ける
						break;
					}
					try{
						//コメントリンクボタンが見つかるまで繰り返す
						if(a.getAttribute("role")=="button"){
						
							//コメントリンクボタンをクリックする
							var c = document.createEvent("MouseEvents");
							c.initEvent("click", true, false);
							a.dispatchEvent(c);
							break;
						}
					}catch( _error ){
					}
				}
			}
			
			//遅延させる
			setTimeout(function(){
				
				//「.editor」エレメントを探す
				var d = b.getElementsByTagName("div");
				var e = d.length;
				for (var f=0; f < e; f++) {
				
					//.editorが見つかった
					if(d[f].id.match(reg_e)){
						try{
						
							//.editorをクリックする
							(function(_elm){
								var a = document.createEvent("MouseEvents");
								a.initEvent("click", true, false);
								_elm.dispatchEvent(a);
							})(d[f].firstChild);
							
						}catch(_error){
							console.error("Google+ SNS Button - Error : .editorのフォーカスの取得に失敗しました");
						}
						
						try{
							if(_flag){
								//Firefoxの場合
								if (navigator.userAgent.indexOf("Firefox") > -1) {
									//テキストを入力する(Firefox)
									try{
										d[f].firstChild.firstChild.firstChild.contentDocument.body.innerHTML = "+"+reply+" <br>";
										
										//入力エリアのアクティベート
										var g = document.createEvent("KeyboardEvent");
										g.initKeyEvent ("keypress", true, true, window, false, false, false, false, 0, 13);
										d[f].firstChild.firstChild.firstChild.contentDocument.body.dispatchEvent(g);
										
									}catch(_error){
										console.error("Google+ SNS Button - Error : 返信時の操作に失敗しました");
									}
								//Chromeの場合
								}else{
									//スペースを挿入
									(function(){
										var a = document.createTextNode(" ");
										d[f].firstChild.firstChild.insertBefore(a, d[f].firstChild.firstChild.firstChild);
									})(d[f]);
									
									(function(){
										var a = document.createElement("button");
										a.setAttribute("tabindex", "-1");
										a.setAttribute("id", "btnplus"+reply);
										a.setAttribute("contenteditable", "false");
										a.innerHTML = "+<span style=\"display:none\">"+reply+"</span><style>button#btnplus"+reply+" { white-space: nowrap; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(238, 238, 238); border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(221, 221, 221); border-right-color: rgb(221, 221, 221); border-bottom-color: rgb(221, 221, 221); border-left-color: rgb(221, 221, 221); border-top-left-radius: 2px 2px; border-top-right-radius: 2px 2px; border-bottom-right-radius: 2px 2px; border-bottom-left-radius: 2px 2px; display: inline-block; font: normal normal normal 13px/1.4 Arial, sans-serif; margin-top: 0px; margin-right: 1px; margin-bottom: 0px; margin-left: 1px; padding-top: 0px; padding-right: 1px; padding-bottom: 0px; padding-left: 1px; vertical-align: baseline; color: rgb(51, 102, 204); background-position: initial initial; background-repeat: initial initial; } button#btnplus"+reply+":after { content:\""+username+"\" }</style>";
										d[f].firstChild.firstChild.insertBefore(a, d[f].firstChild.firstChild.firstChild);
									})();
								}
							} else {
								if (navigator.userAgent.indexOf("Firefox") > -1) {
									//テキストを入力する(Firefox)
									try{
										d[f].firstChild.firstChild.firstChild.contentDocument.body.innerHTML = _text+"<br>";
										
										//入力エリアのアクティベート
										var g = document.createEvent("KeyboardEvent");
										g.initKeyEvent ("keypress", true, true, window, false, false, false, false, 0, 13);
										d[f].firstChild.firstChild.firstChild.contentDocument.body.dispatchEvent(g);
										
									}catch(_error){
										console.error("Google+ SNS Button - Error : 自動ポストに失敗しました");
									}
						
								}else{
									//テキストを入力する(Chrome)
									try{
										var g = document.createEvent("TextEvent");
										g.initTextEvent ('textInput', true, true, null, (function(){
											return _text;
										})());
										d[f].firstChild.firstChild.dispatchEvent(g);
										
										//入力エリアのアクティベート
										var g = document.createEvent("KeyboardEvent");
										g.initKeyboardEvent("keypress", true, false, window, 13, false, false, false, "", false);
										d[f].firstChild.firstChild.dispatchEvent(g);
									}catch(_error){
										console.error("Google+ SNS Button - Error : テキストの入力に失敗しました");
									}
								}
							}
						}catch( _error ){
							console.error("Google+ SNS Button - Error : 自動ポスト中に例外エラーが発生しました");
						}
						
						//投稿ボタンを押す
						if(_flag == 0){
							var c = document.createEvent("MouseEvents");
							c.initEvent("mousedown", true, true);
							d[f].nextSibling.dispatchEvent(c);
							
							var c = document.createEvent("MouseEvents");
							c.initEvent("mouseup", true, true);
							d[f].nextSibling.dispatchEvent(c);
						}
						break;
					}
				}
			}, 150);
			return;
		}catch( _error ){
		}
	}
	
	//スクロール固定
	var pagelock = new Object();
	
	
	pagelock.getposty = function(){
		var a = 0;
			
		//上部バー
		if(window.innerHeight<523){
			try{
				a+= document.getElementById("gb").parentNode.clientHeight;
			}catch( _error ){
				console.error("Googleバーの縦サイズの取得に失敗しました(error:007)");
			}
		}
		
		//検索バー
		if(window.innerHeight<800){
			try{
				a+= document.getElementById("gb").parentNode.nextSibling.nextSibling.clientHeight;
			}catch( _error ){
				console.error("検索バーの縦サイズの取得に失敗しました(error:008)");
			}
		}
		
		//ストリームバー
		try{
			a += (function(){
					var a = contentpane.firstChild.firstChild.clientHeight+16;
					if(a>100){
						return contentpane.firstChild.firstChild.firstChild.clientHeight+16;
					} else {
						return a;
					}
				})();
		}catch( _error ){
			console.error("ストリームバーの縦サイズの取得に失敗しました(error:009)");
		}
		
		//共有バー
		try{
			a += contentpane.firstChild.firstChild.nextSibling.clientHeight+10;
			
		}catch( _error ){

			a += contentpane.firstChild.firstChild.firstChild.nextSibling.clientHeight+10;

		}
		
		//フォロー追加バー
		try{
			if(contentpane.firstChild.firstChild.nextSibling.nextSibling.firstChild.getAttribute("role")=="button"){
				a += contentpane.firstChild.firstChild.nextSibling.nextSibling.clientHeight+10;
			}
		}catch( _error ){
			console.error("フォロー追加バーの縦サイズの取得に失敗しました(error:0017)");
		}
		
		//全てのサイズ取得
		try{
			return gpsbscrolllock_element.offsetParent.offsetParent.offsetTop+a;
		}catch( _error ){
			console.error("ストリーム全体の縦の長さを取得できませんでした(error:018 - "+_error+")");
		}
		return 0;
	}
	
	//ページロック設定
	pagelock.run = function(_event){
		var b = _event.target;
		var d = pagelock.getposty();	
		//固定要素が指定のオフセットの位置にあるかどうか
		if(window.pageYOffset<d){
			setTimeout(function(){
				try{
					if(gpsbscrolllock_count<gpsbscrolllock_length){
						if(window.pageYOffset+gpsbscrolllock_smooth[gpsbscrolllock_count]<d){
							window.scrollBy(0, gpsbscrolllock_smooth[gpsbscrolllock_count]);
							gpsbscrolllock_count++;
							
							//最終チェック
							setTimeout(function(){
								var e = pagelock.getposty();
								if(window.pageYOffset>e){
									window.scroll(0,e);
									gpsbscrolllock_count = 0;
								}
							}, 200);
						} else {
							window.scroll(0,d);				//固定する
							gpsbscrolllock_count = 0;
						}
					} else {
						if(window.pageYOffset+5<d){
							window.scrollBy(0, 5);
							gpsbscrolllock_count++;
							
							//最終チェック
							setTimeout(function(){
								var e = pagelock.getposty();
								if(window.pageYOffset>e){
									window.scroll(0,e);
									gpsbscrolllock_count = 0;
								}
							}, 200);
						} else {
							window.scroll(0,d);				//固定する
							gpsbscrolllock_count = 0;
						}
					}
				}catch( _error ){
					if(window.pageYOffset+5<d){
							window.scrollBy(0, 5);
							gpsbscrolllock_count++;
							
							//最終チェック
							setTimeout(function(){
								var e = pagelock.getposty();
								if(window.pageYOffset>e){
									window.scroll(0,e);
									gpsbscrolllock_count = 0;
								}
							}, 200);
						} else {
							window.scroll(0,d);				//固定する
							gpsbscrolllock_count = 0;
						}
				}
			}, 0);
		}

	}
	
	//イベント関数
	pagelock.event = function(){}
	
	pagelock.event.scroll = function(){
			pagelock.run(element_pin);
	}
	
	pagelock.event.dom = function(){
			pagelock.run(element_pin);
	}
	
	
	//ページをロックする
	pagelock.start = function(_element){
		
		//ページをロックする：イベント読み込み
		element_pin = _element;
		contentpane.addEventListener('DOMNodeInserted', pagelock.event.dom, false);
		window.addEventListener('scroll', pagelock.event.scroll, false);
		gpsbscrolllock_flag = true;
		_element.src=imagedata_pin2;
		_element.classList.add('gpsbtoggle');
		gpsbscrolllock_element = _element;
		pagelock.run(_element);
	}
	
	//ページのロックを解除する
	pagelock.end = function(_element){
		element_pin = 0;
		gpsbscrolllock_flag = false;
		gpsbscrolllock_element = 0;
		gpsbscrolllock_count = 0;
		var gpsbi=document.getElementsByTagName('img');
		var gpsbl = gpsbi.length;
		for(var gpsbc=0;gpsbc<gpsbl;gpsbc++){
			if(gpsbi[gpsbc].classList.contains('gpsbtoggle')){
				gpsbi[gpsbc].src = ''+imagedata_pin1+'';
				gpsbi[gpsbc].classList.remove('gpsbtoggle');
			}
		}
		_element.src=''+imagedata_pin1+'';
		
		//イベントの登録：スクロールを固定：イベント読み込みを解除
		contentpane.removeEventListener('DOMNodeInserted', pagelock.event.dom);
		window.removeEventListener('scroll', pagelock.event.scroll);
	}
	
	//コメントリプライボタンの挿入
	function replyinsert(_commentplusone){
		var a = _commentplusone.parentNode;
		var b = a.getElementsByTagName("span");
		var c = b.length;
		for(var d=0;d<c;d++){
			if(b[d].className == "gpsb_reply"){
				return;
			}
		}
		var d = document.createElement("span");
		d.className = "gpsb_reply";
		d.innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;<a>"+TextList.Reply+"</a>";
		a.appendChild(d);
		d.getElementsByTagName("a")[0].addEventListener("click", function(e){
			autopost(_commentplusone, "test", 1);
		}, false);
	}
	
	//返信ボタンの挿入(通知ボタン)
	function replyinsert_notify(_widget){
		try{
			//実行
			var a = _widget;
			var b = a.getElementsByTagName("button");
			var c = b.length;
			for(var d=0;d<c;d++){
				try{
					if(b[d].getAttribute("g:entity").match(reg_cm)){			//コメントの+1があるかどうか調べる
						replyinsert(b[d]);										//コメントの+1の親に返信ボタンを挿入する
					}
				}catch(_error){
				}
			}
		}catch(_error){
			console.error("Google+ SNS Button - Error : 返信ボタンの要素が見つかりませんでした");
		}
	}
	
	//SNSボタンの挿入
	function sbminsert(_post){
	
		try{
			//G+meがインストールされているかどうか調べる
			if(_post.firstChild.className.match(reg_m)){
				var element_update = _post.firstChild.nextSibling.firstChild.nextSibling.nextSibling;
			} else {
				var element_update = _post.firstChild;
			}
		}catch( _error ){
			console.error("アップデートエレメントの取得に失敗しました(error:017 - "+_error+")");
		}
		
	
	
		//すでにボタンが追加されているかどうか調べる
		var d = element_update.getElementsByTagName("span");			//spanタグを探す
		var e = d.length;
		for(var f=0;f<e;f++){
			//GooglePlusSNSButtonがすでに存在していた場合はBreak
			if(d[f].classList.contains("googleplussnsbutton")){
				return;
			}
		}
		
		//投稿時間の取得
		try{
			var time = element_update.firstChild.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.title;
		}catch( _error ){
			var time = "";
			console.error("投稿時間を取得することが出来ませんでした。“_post”が正しくない可能性があります。(error:005 - "+_error+")");
		}
	
		//パーマリンクの取得
		try{
			var permlink = element_update.firstChild.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.href;
		}catch( _error ){
			var permlink = "";
			console.error("パーマリンクを取得することが出来ませんでした。“_post”が正しくない可能性があります。(error:006)");
		}
		
		//投稿者名の取得
		try{
			var auther = element_update.firstChild.firstChild.nextSibling.nextSibling.nextSibling.firstChild.firstChild.innerHTML;
		}catch( _error ){
			var auther = "";
			console.error("投稿者名を取得することが出来ませんでした。“_post”が正しくない可能性があります。(error:003)");
		}
	
		//本文の取得
		try{
			var bodytext = element_update.firstChild.nextSibling.firstChild.firstChild.firstChild.innerHTML;
			
			bodytext = bodytext.replace(reg4,"\n");
			bodytext = bodytext.replace(reg5,"");
			bodytext = bodytext.replace(reg6,"");
			bodytext = bodytext.replace(reg7,"");
			bodytext = bodytext.replace(reg8,"");
			bodytext = bodytext.replace(reg9,"");
			bodytext = bodytext.replace(reg10,"");
			bodytext = bodytext.replace(reg11,"");
			bodytext = bodytext.replace(reg12,"");
			bodytext = bodytext.replace(reg13,"");
			bodytext = bodytext.replace(reg14,"");
			bodytext = bodytext.replace(reg15,"");
		}catch( _error ){
			var bodytext = "";
		}
		
		//SNSボタンの挿入
		var imgstyle = 'style="padding-left:2px;margin-top:0px;cursor: pointer;display: inline;overflow: hidden;vertical-align: top"';
		
		//フルサイズ画像URLの取得
		var a = _post.getElementsByTagName("img");	//img要素の取得
		var b = a.length;
	
		//フルサイズ画像URLの取得：変数の初期化
		var c = 0;
		var imageurl = new Array();
		var imageurl_d = new Array();
		imageurl[0] = 0;
		for(var e = 0; e<b; e++){
		
			//フルサイズ画像URLの取得：URLの取得
			if(a[e].src.match(reg_i)){
				imageurl[c] = a[e].src;
				imageurl_d[c] = imageurl[c].replace(reg1,"/d/");
				imageurl_d[c] = imageurl_d[c].replace(reg2,"/d/");
				imageurl_d[c] = imageurl_d[c].replace(reg3,"/d/");
				imageurl[c] = imageurl[c].replace(reg1,"/");
				imageurl[c] = imageurl[c].replace(reg2,"/");
				imageurl[c] = imageurl[c].replace(reg3,"/");
				c++;
			}
		} 
		
		//+1ボタンが含まれているエレメント
		var a = element_update.firstChild.nextSibling.firstChild.nextSibling;
		var d = document.createElement("span");				//ボタンエレメントの作成
		d.className = "googleplussnsbutton";				//class要素を追加
		try{
			//+1ボタンのエレメント
			var c = element_update.firstChild.nextSibling.firstChild.nextSibling.firstChild;
		}catch( _error ){
			console.error("+1ボタンの取得に失敗しました(error:016)");
		}
		try{
			//+1ボタンの配置の設定（.nextSibling）
			if(c.nextSibling.match(reg_p)){
				a.insertBefore(d, c.nextSibling.nextSibling.nextSibling);
			} else {
				a.insertBefore(d, c.nextSibling.nextSibling);
			}
		} catch(h) {
			try{
				a.insertBefore(d, c.nextSibling.nextSibling);
			}catch( _error ){
				console.error("+1ボタンの挿入に失敗しました(error:015)");
			}
		}
		
		
		//ボタンの追加：★
		
		//オブジェクト
		(function(_d, _imgstyle){
			var a = 0;
			for( b in Buttonlist ){
				var c = eval("Buttonlist."+b);
				if(c.showflag){
					if(c.postshowflag == 1){
						if(imageurl != 0){
							continue;
						}
					}
					if(c.imageshowflag == 1){
						if(imageurl == 0){
							continue;
						}
					}
					
					_d.innerHTML+='<a class="'+c.class+'"><img src="'+c.imagedata+'" title="'+c.name+'" '+_imgstyle+' /></a>';

					a = 1;
					
				}
			}
			//セパレータ
			if(a==1){
				d.innerHTML +='&nbsp;&nbsp;-&nbsp;&nbsp;';
			}
		})(d, imgstyle);
		
		
		//イベントの登録★
		var j  = d.getElementsByTagName("a");
		var k = j.length;
		for(var l=0;l<k;l++){
			//イベントの登録：オブジェクト
			(function(){
				for( a in Buttonlist ){
					var b = eval("Buttonlist."+a);
					if(j[l].classList.contains(b.class)){
						b.event(j[l], bodytext, permlink, auther, time, imageurl, imageurl_d);
					}
				}
			})();
		}
		return;
	}

	
	


	//設定を取得(showservices_**)★
	if(localStorage.getItem("gpsb.initialization") == "true"){
		var hatenaid = localStorage.getItem("gpsb.hatenaid");
		(function(){
			for( a in Buttonlist ){
				var b = eval("Buttonlist."+a);
				b.showflag = localStorage.getItem("gpsb.button."+b.storagename) == "true";
			}
		})();
		
	} else {
		//初めての使用★
		localStorage.setItem("gpsb.initialization", "true");
		var hatenaid = "";
		(function(){
			for( a in Buttonlist ){
				var b = eval("Buttonlist."+a);
				if(b.noconfigflag==0){
					b.showflag = b.defaultshowflag_i;
				}
			}
		})();
		localStorage.setItem("gpsb.hatenaid", "");
		
		//オブジェクト
		(function(){
			for( a in Buttonlist ){
					var b = eval("Buttonlist."+a);
				if(b.noconfigflag==0){
					localStorage.setItem("gpsb.button."+b.storagename, b.defaultshowflag_s);
				}
			}
		})();
	}

	//変数の定義
	var contentpane = document.getElementById("contentPane");
	var notify = document.getElementById("notify-widget-pane");
	var timeout = 0;
	var gpsbscrolllock_element = 0;
	var gpsbscrolllock_flag = false;
	var gpsbscrolllock_count = 0;
	var gpsbscrolllock_smooth = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5];	
	var gpsbscrolllock_length = gpsbscrolllock_smooth.length;
	var element_pin;
	var oldyoffset;
	

	//個別ページではない場合
	if (!location.href.match(reg_gp)){

		//Google+検索が行われた場合実行
		document.getElementById("searchForm").firstChild.nextSibling.nextSibling.addEventListener('keydown', function(a){
			if(a.keyCode==13){
				if(Buttonlist.ScrollLock.showflag){
					try{
						pagelock.end(gpsbscrolllock_element);
					}catch( _error ){
					}
				}
				PushEnter.Button();
				setTimeout(function(){
					if(PushEnter.Flag){
						PushEnter.Flag == 0;
						pageopen();
					}
				}, 1500);
			}
		}, false);

		//ボタンがクリックされたら再描画する
		document.addEventListener("click", function(a){
			var b = a.target;
			if(b.tagName == "A"){
				if(b.href.match(reg_b)){
					PushEnter.Button();
				} else if(b.getAttribute("aria-label")){
					PushEnter.Button();
				} else if(b.href.match(reg_t)){
					PushEnter.Button();
				}
			} else if(b.tagName == "SPAN"){
				if(b.getAttribute("data-tooltip")){
					PushEnter.Button();
				}
			} else if(b.tagName == "IMG"){
				if(b.getAttribute("alt")=="google.com"){
					PushEnter.Button();
				}
			}
		}, false);
		/*
			notify.nextSibling.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling
		*/
		//通知ウィンドウがクリックされたとき実行
		try{
			var a = notify.nextSibling.firstChild.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.firstChild.firstChild.nextSibling;	//通知ボタン
			
			//一度だけ実行
			a.addEventListener("click", function(b){
			
				//イベント削除
				a.removeEventListener("click", arguments.callee);
				
				//遅延させる
				setTimeout(function(){
					try {
					
						//wigetiframeを探す
						var c = notify.nextSibling.firstChild.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild.firstChild;		//iframe
						var d = c.contentDocument;
						var widget = d.getElementById("widget");
						
						//一度だけイベントを登録する(DOM)
						widget.addEventListener("DOMNodeInserted", function(_target){
							//通知ウィンドウが更新されたとき実行
							replyinsert_notify(widget);
						}, false);
						
					}catch(_error){
						console.error("Google+ SNS Button - Error : 通知ウィンドウのフレーム位置が不正です");
					}
				}, 3000);
			}, false);
			
		}catch(_error){
			console.error("Google+ SNS Button - Error : 通知ボタンの位置が不正です");
		}
		
		//新しいポストがされたとき通知(DOMNodeInserted)
		contentpane.addEventListener('DOMNodeInserted', function(a){
			var b = a.target;

			//個別ページではない場合
			if (!location.href.match(reg_gp)){
			
				//ボタンが押されているフラグが発生している場合実行しボタンを描画
				PushEnter.Draw(b);
			
				//スクロール固定ボタンが表示されている場合実行
				if(Buttonlist.ScrollLock.showflag){
					if(scrolllockstop==0){
						//コメント入力ボックスが開かれた
						try{
							if(b.firstChild.id.match(reg_e)){
								var c = b.parentNode.previousSibling.firstChild.nextSibling;				//+1ボタンのあるエレメント
								var d = c.getElementsByTagName("a");		//span探す
								var e = d.length;
								for (var f=0; f < e; f++) {
									if(d[f].classList.contains("gpsb_scroll")){
										pagelock.start(d[f].firstChild);		//ページロック開始
										b.firstChild.nextSibling.addEventListener("mouseup", function(){
											pagelock.end(d[f].firstChild);
											b.firstChild.nextSibling.removeEventListener("mouseup", arguments.callee);
										}, false);
										b.firstChild.nextSibling.addEventListener("keydown", function(_key){
											if(_key.keyCode==13 || _key.keyCode==32){
												pagelock.end(d[f].firstChild);
												b.firstChild.nextSibling.removeEventListener("keydown", arguments.callee);
											}
										}, false);
										b.firstChild.nextSibling.nextSibling.addEventListener("mouseup", function(){
											pagelock.end(d[f].firstChild);
											b.firstChild.nextSibling.nextSibling.removeEventListener("mouseup", arguments.callee);
										}, false);
										b.firstChild.nextSibling.nextSibling.addEventListener("keydown", function(_key){
											if(_key.keyCode==13 || _key.keyCode==32){
												pagelock.end(d[f].firstChild);
												b.firstChild.nextSibling.removeEventListener("keydown", arguments.callee);
											}
										}, false);
										break;
									}
								}
							}
						}catch( _error ){
						}
					} else {
						scrolllockstop = 0;
					}
				}
				
				//ストリームが更新されたら挿入 (Be zj)
				try{
					if(b.id.match(reg_u)){
					setTimeout(function(){
							sbminsert(b);		//SNSボタンを挿入
					},timeout);
				}
				}catch( _error ){
				}
				
				//新しいコメントが追加されたら挿入
				setTimeout(function(){
					try{
						var c = b.getElementsByTagName("button");
						var d = c.length;
						for(var e=0;e<d;e++){
							try{
								if(c[e].getAttribute("g:entity").match(reg_cm)){			//コメントの+1があるかどうか調べる
									replyinsert(c[e]);										//コメントの+1の親に返信ボタンを挿入する
								}
							}catch(_error){
							}
						}
					}catch(_error){
					}
				},timeout);
				
			} else {
			//個別ページ
				setTimeout(function(){
					try{
						if(contentpane.firstChild.firstChild.className == b.className){
						sbminsert(b.firstChild);		//SNSボタンを挿入
					}
					}catch( _error ){
						console.error("ポストページが見つかりません(error:001)");
					}
				},500);
			}
		}, false);
	}
	pageopen();					//全ての項目にボタンを追加
	
	
	
//設定ページを開いたとき実行
} else if (location.href.match(reg_s)){
	
	//サービスの追加
	function addservices(_title, _servicesname, _imagedata) {
		var a = '<li style="border-top: 1px solid #CCC;height: 60px;padding: 5px 10px;width: 750px;">'+
		'<div style="display: inline;float: left;height: 30px;margin: 5px 20px 5px 0;overflow: hidden;white-space: nowrap;width: 200px;">'+
			'<div style="margin-top: 5px;white-space: nowrap;list-style-type: none;">'+
				'<img src="'+_imagedata+'" width="15" height="15" class="a-zb-if" alt=""> '+_title+
			'</div>'+
		'</div>'+
		'<div style="display: inline;float: left;height: 40px;margin-right: 20px;margin-top: 10px;overflow: hidden;padding: 0 5px 5px 1px;width: 310px;list-style-type: none;">'+
			'<label>'+
				'<input type="checkbox" checked="checked" name="'+_servicesname+'"> '+TextList.Stream+
			'</label>';
		if (_servicesname == "hatenabookmark") {
			a += '<br>'+TextList.HatenaID+'<input type="text" name="hatenaid">';
		} else if(_servicesname == "aisatsu"){
			a += '<br><button id="gpsb_settingaisatsu">'+TextList.ReplySetting+'</button>';
		}
		
		a += '</div></li>';
		return a;
	}

	//正規表現
	var reg_f = /-da$/;
	//Google+SNSButton新規に追加されるGoogle + SNS Button の項目（仕様が変更された場合は、他の項目からコピーする。IDは必ずつける）
	
	try{
		var a = document.body.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild.firstChild;		//メニューのエレメント
	}catch( _error ){
		console.error("メニューエレメントの取得に失敗しました(error:010)");
	}
	//クローンエレメントを作成
	if(a.firstChild.className.match(reg_f)){
		try{
			var b = a.firstChild.nextSibling.cloneNode(true);
		}catch( _error ){
			console.error("クローンエレメントの作成に失敗しました(error:011)");
		}
	} else {
		try{
			var b = a.firstChild.cloneNode(true);
		}catch( _error ){
			console.error("クローンエレメントの作成に失敗しました(error:012)");
		}
		
	}

	b.firstChild.removeAttribute("href");
	b.firstChild.id = "gpsbsettings";
	b.firstChild.firstChild.style.background = "url("+imagedata_icon+")  no-repeat 0 0";
	b.firstChild.firstChild.nextSibling.innerHTML = "Google+ SNS Button";
	
	//クローンエレメントを代入
	a.appendChild(b);
	
	//項目がクリックされたときのイベント
	b.addEventListener("click", function(){

		//
		var a = document.getElementById("gpsbsettings");
		
		//フォーカスだった項目を元に戻す
		try{
			var b = document.body.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild.firstChild;		//メニューのエレメント
		}catch( _error ){
			console.error("項目がクリックされたときのイベントで本文のエレメントの取得に失敗しました(error:013)");
		}
		var c = b.getElementsByTagName("div");
		var d = c.length;
		
		//フォーカス項目判定
		for(var e=0;e<d;e++){
		
			//フォーカス項目判定：フォーカス項目のStyleを変更
			if(c[e].className.match(reg_f)){
				
				a.style.display = "none";
				
				//Google+ SNS Button設定項目を選択されたものに置換え
				var b = a.parentNode;
				b.innerHTML = c[e].innerHTML;
				
				//Google＋ SNS Buttonをフォーカスに設定
				b.firstChild.firstChild.nextSibling.nextSibling.innerHTML = "Google+ SNS Button";
				b.firstChild.firstChild.style.background = "url("+imagedata_icon+")  no-repeat 0 0";
				b.firstChild.style.color = "white";
				b.firstChild.style.fontWeight = "bold";
				b.firstChild.removeAttribute("href");
				b.firstChild.id = "gpsbsettings";
				b.firstChild.firstChild.nextSibling.style.display = "inherit";
				b.style.backgroundColor = "#36F";
				b.style.display = "inherit";
				
				//フォーカスだった項目からフォーカスを解除
				c[e].style.backgroundColor = "white";
				c[e].firstChild.style.color = "#36C";
				c[e].firstChild.style.fontWeight = "normal";
				c[e].firstChild.firstChild.nextSibling.style.display = "none";

				break;
			}
		}
		
		//本文の挿入
		try{
			var f = document.body.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.firstChild.nextSibling.firstChild;
		}catch( _error ){
			console.error("本文のエレメントの取得に失敗しました(error:014)");
		}
		f.innerHTML = ''+
		'<div>'+
			'<div style="margin-bottom: 25px;">'+
				'<div style="float: left;height: 17px;margin: 5px 0 5px 3px;width: 17px;background-position: 0 -102px;background-image: url('+imagedata_icon+');"></div>'+
				'<span style="font-size: 17pt;margin-left: 8px;">Google+ SNS Button</span>'+
			'</div>'+
			'<div style="margin-top: 10px;">'+
				'<span style="font-weight: bold;">'+TextList.SettingInfo+'</span>'+
			'</div>'+
			'<div>'+
				'<div style="margin-top: 15px;">'+
					'<ul id="gpsb_servicesstatus" style="list-style-type: none;padding: 0;">'+
						//設定項目の追加★
						(function(){
							var a = "";
							for( b in Buttonlist ){
								var c = eval("Buttonlist."+b);
								if(c.noconfigflag==0){
									a += addservices(c.name, c.storagename, c.imagedata);
								}
							}
							return a;
						})()+
					'</ul>'+
				'</div>'+
			'</div>'+
		'</div>';
		
		var g = f.getElementsByTagName("input");
		var h = g.length;
		for(var i=0;i<h;i++){
			//クリック
			g[i].addEventListener("click", function(j){
				var k = j.target;
				if(k.type=="checkbox"){
					if(k.checked == true){
						localStorage.setItem("gpsb.button."+k.name, "true");
					} else {
						localStorage.setItem("gpsb.button."+k.name, "false");
					}
				}
			}, false);
			
			
			
			//キー入力
			g[i].addEventListener("keyup", function(j){
				var k = j.target;
				if(k.type=="text"){
					if(k.checked == true){
						localStorage.setItem("gpsb."+k.name, k.value);
					} else {
						localStorage.setItem("gpsb."+k.name, k.value);
					}
				}
			}, false);

			//データの読み込み
			if(g[i].type=="checkbox"){
				g[i].checked = localStorage.getItem("gpsb.button."+g[i].name) == "true";
			} else if(g[i].type=="text"){
				g[i].value = localStorage.getItem("gpsb."+g[i].name);
			}
		}
		//挨拶ボタンの設定
		document.getElementById("gpsb_settingaisatsu").addEventListener("click", function(e){
			if(document.getElementById("gpsb_settingaisatuwindow")){
				var a = document.getElementById("gpsb_settingaisatuwindow");
				a.style.display="block"; 
			} else {
				var a = document.createElement("div");
				a.id = "gpsb_settingaisatuwindow";
				a.style.width="40%";
				a.style.height="70%";
				a.style.position = 'fixed';
				a.style.top = "20%";
				a.style.left = "30%";
				a.style.backgroundColor = "white";
				a.style.border = "1px solid gray"; 
				document.body.appendChild(a);
			}
			a.innerHTML='<div style="background-color:black;width:100%;height:30px;color:white;font-size:12px;"><div style="padding-left:6px;padding-top:6px;"><div style="float:left;">返答の設定</div><div style="float:right;"><button id="gpsb_aisatsusettingcansel" style="height:20px;margin-right:5px">キャンセル</button><button id="gpsb_aisatsusettingsave" style="height:20px;margin-right:5px">保存</button></div>';
				a.innerHTML+=(function(){
					var a = '<div style="width:100%;height:90%;overflow: auto">';
					for( b in Aisatsu ){
						var c = eval("Aisatsu."+b);
						a+= '<div style="padding:10px;border-bottom:1px solid gray;">「'+c.Str+'」に対する返答：<br><textarea cols="50" rows="3" style="margin-left:10px;" type="text" name="'+c.Sto+'">'+(function(){var a = localStorage.getItem("gpsb.aisatsu."+c.Sto);if(a){return a;}else{return "";}})()+'</textarea></div>';
					}
					a+="</div>";
				return a;
				})();
				a.innerHTML+='</div>';
				document.getElementById("gpsb_aisatsusettingsave").addEventListener("click", function(e){
					a.style.display="none";
					var b = a.getElementsByTagName("textarea");
					var c = b.length;
					for(var d=0;d<c;d++){
						localStorage.setItem("gpsb.aisatsu."+b[d].name, b[d].value);
					}
					for( e in Aisatsu ){
						var f = eval("Aisatsu."+e);
						f.Rep = localStorage.getItem("gpsb.aisatsu."+f.Sto);
					}
				}, false);
				document.getElementById("gpsb_aisatsusettingcansel").addEventListener("click", function(e){
					a.style.display="none";
					
				}, false);
		}, false);
	}, false);
}



