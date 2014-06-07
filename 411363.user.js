// ==UserScript==
// @id             Affiliate_killer
// @name           Affiliate killer
// @version        2.8
// @namespace      
// @license        https://creativecommons.org/licenses/by-nc/2.1/jp/
// @author         noi
// @description    Affiliate Original URL
// @include        http*
// @exclude        /https?\:\/\/www.amazon..*2799399051/
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/411363.user.js
// @delay 800
// ==/UserScript==

/////////////////////////////////////////////////////
// The original script is below:                   //
// アフィリエイト殺し for greasemonkey             //
// http://d.hatena.ne.jp/deraw/20060902/1157143806 //
// and                                             //
// A Killer Mod                                    //
// http://www7b.biglobe.ne.jp/~yamj/               //
// and require ecl.js                              //
// http://www.drk7.jp/pub/js/ecl_test/ecl_new.js   //
/////////////////////////////////////////////////////


/****************************************************
備忘録
・excludeに追加した*tbm=isch*はGoogleImage検索用
→対応したので廃止
・デコードエラーはどうやらdecodeURIComponentだとEUC-JPやShift-JISの文字列が来ると発生する模様？
→ecl.js(Escape Codec Library)をお借りすることに
→requireから埋め込みに変更(GreasyForkでrequire使うと色々と面倒なため)
・linkifierの種類(linkify plus)によってはディレイを100入れないと表示できない場合あり
→楽天の埋め込み型ブログツールの読み込みが遅いので500に変更
→facebookの楽天広告の読み込みが遅く800に変更(それでも読み込みが遅いと修正ミス発生する模様)
・amazonの埋め込み型flashの場合、リダイレクト発生するのでNoRedirectでブロック後修正
・海外製アドオンのためかnoredirectがブロックすると日本語が文字化けを起こす模様(楽天で確認)
・amazonの定期おトク便ページでうまく表示されない事象を解決できないので
  該当ページ(http://www.amazon.co.jp/l/2799399051)を除外@exclude

******************************************************/



/************************************************************************
前書き

自分用のスクリプトで気が向いたときに追加してったので正直美しくないです

[経緯]
ユーザースクリプトA Killer Modの配布終了。
微妙に取りこぼしもあるので自分用に補足スクリプトをなんとなく作成。
処理の二重化も何なのでいっそのこと全部移植。
→PGのソースがスパゲッティ状態にorz
→A Killer Modの方に追加した方が綺麗だったのになと思いつつ整理するは気ないです。。。

最近のアフィリエイトURLは単純なリダイレクトじゃないのも出てきてるので
対応できない場合も多々ありますが、一応可能な限り移植。
また、まだ実験段階のためブラウザごとフリーズする場合もあるかもしれないので報告ください。
→体調が良ければ直します

※このスクリプトは、A Killer Mod作者様と連絡不可のため無断で引用しています。
万が一作者様から抗議があった場合、即刻公開停止します。

このソースは基本的に改変、再配布自由です。
「A Killer Mod」の引用部分と「ecl_new.js」の引用部分は、
それぞれの作者様に問い合わせてください。
また、配布する場合は引用元として当方の名前を入れてくれるだけでOKです。
とはいえ悪質だったり詐欺などの用途での改変は当然NGです。

注意点はファイル保存の際、文字エンコードはUTF-8で保存してください。
じゃないと文字化けてエラーの原因になるようです。

*************************************************************************
前提条件(必須ではないけどやった方がいい)

1、基本的にadblock系アドオンと併用推奨
大体のアフィリエイトはこれで抹殺されます。
adblockを無効にすると、このスクリプトが対応していればリンクを修正します
このアドオンはしっかり設定しないとたまに関係ないものまで非表示になるので注意

2、可能ならアドオンNoRedirectと併用推奨
リダイレクトをブロックしてリダイレクト先URLを表示してくれるので
アフィリエイトリンクを修正します。
要設定。(↓で簡易解説あります)

*************************************************************************
NoRedirectが良くわかんね！正規表現ってなんぞ？って人用(とはいえ自分も勉強中)

まず初期に登録されているものを全部削除する

・以下を追加するとほぼ全てのURLでリダイレクトをブロックしてくれるようになる。

^http
(↑転送元にだけチェックを入れる。先頭のキャレット(^)を忘れずに)
※↑これが絶対に一番下になるようにする。

・許可したいリダイレクトURLは以下のように追加する。
　ホワイトリストのようなもの。上記「^http」よりも上に追加すること
　例としてgoogleの場合

^https?\:\/\/google.co.jp
(↑転送元と許可にチェックを入れる。ここが一番先頭であるという意味のキャレット(^)を忘れずに)


・「転送元」にチェック入れると今表示されているURL(転送元)からのリダイレクトの許可・ブロック設定
　チェックを外すと”転送先”のURLに対して許可・ブロック設定

・「許可」にチェック入れると指定したURLのリダイレクトを止めずにそのまま転送する
　チェックを外すとリダイレクトをブロックして転送先URLを表示してくれるけど
　ホワイトリストのように使いたいので追加する場合は基本的に許可にチェックを入れる

・「DNS」に関しては基本的にチェックしなくてOK

※注意点
転送元にチェックを入れるかどうかはちゃんと考えないとブロックすべきところをスルーして
意味ないことになります。
可能ならばドメインだけでなく細かく指定するなどした方が万全と思われます。


覚えておくと便利な正規表現規則--------------------------------------------

前提として当然半角英数字です。

\/
(↑http://などで使われる/(スラッシュ)は前に\(半角円マーク￥)を付けないとだめ)

https?
(↑httpsまたはhttpという意味。クエスチョンマーク(?)の前1文字の有無の2パターンに対応可能)

(co.jp|com|ne.jp)
(↑co.jpまたはcomまたはne.jpという意味。パイプライン(|)で区切ると何パターンにも対応可能。括弧で囲むのを忘れずに)

*************************************************************************/

(function() {

	//文字エンコード用の関数読み込み
	ecl();

	//メイン処理実行
	main(document);


	//メイン処理===============================================================================================
	function main(document){
		var allLinks = document.getElementsByTagName("a");
		var cutNum ="";
		var strUrl = "";	//修正したURL


try{
		for (i = 0; i < allLinks.length; i++){

			var flgUnDec = 0;			//デコードフラグ(0:デコードする(初期値),1:デコードしない)

			var href = allLinks[i].href;	//元のURL(極力上書きしないこと！)
//			strUrl = href;
			strUrl = decURI(href);


			//アマゾンのURLを事前に修正
			if(href.indexOf("amazon.jp") > -1){
				strUrl  = href.replace(/amazon.jp/,"amazon.co.jp");

			//アマゾンのリダイレクト除去
			}else if(href.match("amazon.co.jp") && href.match(/\/redirect/) ){
				var params  =  createParamArray(href);	//パラメータ格納

//http://www.amazon.co.jp/exec/obidos/redirect?tag=bestgate-22&path=http%3A%2F%2Fwww.amazon.co.jp%2Fgp%2Foffer-listing%2FB00CL7LC3O%2F%3Fcondition%3Dnew
				if(href.match(/(\&|\?)path=http/)){
					strUrl = decURI(params["path"]);

//http://www.amazon.co.jp/exec/obidos/redirect?link_code=ur2&camp=247&tag=naritanetmap-22&creative=1211&path=external-search%3Fsearch-type=ss%26keyword=%25E3%2583%25AA%25E3%2582%25B9%25E3%2583%2588%25E3%2583%25A9%25E6%2592%2583%25E9%2580%2580%25EF%25BC%25A1%25EF%25BC%25A2%25EF%25BC%25A3%25E3%2580%2580%26index=books-jp
//http://www.amazon.co.jp/exec/obidos/redirect?link_code=ur2&camp=247&tag=naritanetmap-22&creative=1211&path=external-search?search-type=ss&keyword=%E3%83%AA%E3%82%B9%E3%83%88%E3%83%A9%E6%92%83%E9%80%80%EF%BC%A1%EF%BC%A2%EF%BC%A3%E3%80%80&index=books-jp
				}else if(href.match(/(\?|\&)path=/)){
					var strKey = "";
					if(params["keyword"] != undefined){
						strKey = '&keyword=' + params["keyword"];
					}
					strUrl = href.replace(/(.*)redirect\?.*$/i,'$1' + decURI(params["path"]) + strKey);
				}else{
				}
				setLink();


//http://c.kakaku.com/forwarder/forward.aspx?ShopCD=3904&PrdKey=K0000616989&Url=http%3A%2F%2Fkakaku%2Ecom%2Fjump%2Faf%2F0051%2Foutside%5F30993%2Ehtml&Hash=3f6d5b0c9f3989d76acd2e1697ada044
			//価格コムのURLを事前に修正
			}else if(location.href.indexOf("kakaku.com/") > -1 && href.indexOf("kakaku.com/") < 10){
				if(href.match("Url=http")){

					strUrl = decURI(href.replace(/ *[\s\S]*Url=http/, "http")).replace(/.html.*$/,".html");
					strUrl = strUrl.replace(/(\?|\&)(Hash|kad1|sc_e).*$/,"");

					setLink();

//http://kakaku.com/ksearch/redirect.asp?u=http%3A%2F%2Fhb%2Eafl%2Erakuten%2Eco%2Ejp%2Fhgc%2Fg00pukw1%2E4f3hl703%2Eg00pukw1%2E4f3hme41%2F%5FRTkcom10000111%3Fpc%3Dhttp%253A%252F%252Fitem%2Erakuten%2Eco%2Ejp%252Fjism%252F4953103168619%2D42%2D4479%2Dn%252F%26amp%3Bm%3Dhttp%253A%252F%252Fm%2Erakuten%2Eco%2Ejp%252Fjism%252Fi%252F10177711%252F&h=81bdf420e29289c4c563172c6ba7eccd
				}else if(href.indexOf("redirect.asp") > -1 && href.match("u=http")){
					var params  =  createParamArray(href);	//パラメータ格納

					strUrl = decURI(params["u"]);
					setLink();
				}

//正しいhttp://www.coneco.net/goshop.asp?m_id=8a10cdab5989ac93eb1259042f9750a4&shop_id=1222
//http://www.coneco.net/goshop.asp?m_id=8a10cdab5989ac93eb1259042f9750a4&com_id=1131010179&shop_id=1222&c_id=01155022&goshop=1&ta=5.9
			//conecoのリンクを可能な限り削除
			}else if(location.href.indexOf("www.coneco.net") < 10 && location.href.indexOf("www.coneco.net") > 0 
				&& href.match("m_id=") && href.match("shop_id=") && href.match("com_id=")){

					var params  =  createParamArray(strUrl);	//パラメータ格納

					strUrl = strUrl.replace(/(.*)goshop.asp\?.*$/i,"http://www.coneco.net/goshop.asp?") + "m_id=" + params["m_id"] + "&shop_id=" + params["shop_id"];
					setLink();

//正しいhttp://www.bestgate.net/go.phtml?productid=gigabytegbbxi74770r&id=3625063
//http://www.bestgate.net/go.phtml?siteid=A000001&categoryid=001006008000000&productid=gigabytegbbxi74770r&sort=epc1&orderNumber=1&pointPrice=105408&price=105408&id=3625063&type=b
			//bestgateのリンクを可能な限り削除
			}else if(location.href.indexOf("www.bestgate.net") < 10 && location.href.indexOf("www.bestgate.net") > 0){
				if(strUrl.match("productid=") && strUrl.match("siteid=")){

					var params  =  createParamArray(href);	//パラメータ格納

					strUrl = strUrl.replace(/(.*)go.phtml\?.*$/i,"$1go.phtml?") + "productid=" + params["productid"] + "&id=" + params["id"];
					setLink();

//http://www.bestgate.net/hop_auction.php?url=http%3A%2F%2Fpage13.auctions.yahoo.co.jp%2Fjp%2Fauction%2Fr112484393&type=at
				//bestgateにあるヤフオクリンク修正
				}else if(href.match("hop_auction.php") && href.match("url=http")){
					var params  =  createParamArray(href);	//パラメータ格納

					strUrl = decURI(params["url"]);
					setLink();
				}

			}else{
			}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


			//リンク修正開始-----------------------------------------------------------

			//アフィリエイト関連-----------------------------------------------------------

//sample
//http://px.a8.net/svt/ejp?a8mat=10FZ8L+9U8XPU+5WS+C28PV&a8ejpredirect=http%3A%2F%2Fitem.rakuten.co.jp%2Ftv-ya%2商品%2F
			//a8.net(現状リダイレクトでは見かけないので無意味？)===========================================
			if(strUrl.indexOf("px.a8.net")>-1){
				if(strUrl.indexOf("a8ejpredirect")>-1){
					var params  =  createParamArray(strUrl);	//パラメータ格納

					strUrl = params["a8ejpredirect"];

					setLink();
				}

//http://www.accesstrade.net/at/c.html?rk=英数字&url=http%3A%2F%2Fwww.サイト.html%3Fsort%3D5d%26page%3D1
			//accesstrade(リダイレクトでは見かけない)==================================================
			}else if(strUrl.indexOf("accesstrade.net/at/c.html") > -1 &&  strUrl.match("&url=http")){

				strUrl = strUrl.replace(/ *[\s\S]*&url=/,"").replace(/.html.*$/,".html");

				setLink();

			//fc2==================================================================================
			}else if(strUrl.indexOf("blog.fc2.com/goods/") > -1){

				strUrl = strUrl.replace(/(blog\.fc2\.com\/goods\/\w+\/).+$/i, "$1");

				setLink();

//https://www2.liveads.jp/widgets_src/cc.php?c=vs%3D2439871%26amp%3Bvp%3D876489954%26amp%3Bvcptn%3Dfeb92ec1_2_106001%26amp%3Bvc_url%3Dhttp%253A%252F%252F
			//liveads.jp==================================================================================
			}else if(strUrl.indexOf("www2.liveads.jp") > -1 && strUrl.indexOf("vc_url") > -1){
				strUrl = strUrl.replace(/&amp;/g, "&");
				var params  =  createParamArray(strUrl);	//パラメータ格納

				strUrl = params["vc_url"];

				setLink();

//http://www.google.co.jp/aclk?sa=l&ai=CscvKshs4U-e6JMHAlAXf74G4BK-Lq5cEv72pjHHHvvOyvgEIBBABKAVQ0tL2oANgicvBhOwToAGZis3bA8gBB6kCxOgqt9HjRD6qBCVP0NYfuJc3xTwD_YPY33CG2FOeBMEPRY4tchOkmx_9saBJpN8wwAUFoAYmgAfP9bIkkAcB4BKqgKnV-7C6z58B&sig=AOD64_1ERLIr2li_OU5jev_gF23LyMkuAw&ctype=5&rct=j&q=%E3%82%AD%E3%83%BC%E3%83%9C%E3%83%BC%E3%83%89%E3%81%AE%E9%AB%98%E3%81%95&ved=0CCsQwg8&adurl=http://product.rakuten.co.jp/product/-/9ed6c7ead94e3d087fa4f88896cd725c/%3Fsc2id%3Dgmc_211213_9ed6c7ead94e3d087fa4f88896cd725c%26scid%3Ds_kwa_pla&cad=rja
			//googleAd==================================================================================
//			}else if(strUrl.indexOf("googleads.g.doubleclick.net/aclk?") > -1 && strUrl.indexOf("adurl") > -1){
			}else if(strUrl.indexOf(".google.") > -1 && strUrl.indexOf(".google.") < 15){
				if(strUrl.indexOf("&adurl=") > -1){
					var params  =  createParamArray(strUrl);	//パラメータ格納

					strUrl = decURI(params["adurl"]);
					strUrl = strUrl.replace(/\?adid=.*$/,"");

					setLink();

//https://www.google.co.jp/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&docid=P5Srr3ocO7LUlM&tbnid=dwrfHg15I_WHmM:&ved=0CAEQjxw&url=http%3A%2F%2Fwww.amazon.co.jp%2FT-mart%25E6%2597%25A5%25E6%259C%25AC-%25E3%2582%25AD%25E3%2583%25BC%25E3%2583%259C%25E3%2583%25BC%25E3%2583%2589%25E3%2582%25B9%25E3%2582%25BF%25E3%2583%25B3%25E3%2583%2589-%25E9%25AB%2598%25E3%2581%2595%25E8%25AA%25BF%25E7%25AF%2580%25E4%25BB%2598%25E3%2581%258D-%25E6%25A5%25BD%25E5%2599%25A8-%25E3%2582%25B7%25E3%2583%25B3%25E3%2582%25BB%25E3%2582%25B5%25E3%2582%25A4%25E3%2582%25B6%25E3%2583%25BC%25E4%25B8%25A6%25E8%25A1%258C%25E8%25BC%25B8%25E5%2585%25A5%25E5%2593%2581%2Fdp%2FB00HV8GIPU&ei=VC84U-u_CYTVkAWI3IDgDw&psig=AFQjCNEwf895lq12uQpb-yS7nneXGbr8aQ&ust=1396277458397147
				}else if(strUrl.indexOf("&url=http") > -1){
					var params  =  createParamArray(strUrl);	//パラメータ格納

					strUrl = decURI(params["url"]);
					setLink();
				}
//http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=13940&pid=877084383&vc_url=http://www.dospara.co.jp/5shopping/detail_parts.php?ic=80552&waad=vx2bADUp
			//valuecommerce（conecoで確認）
			}else if(strUrl.indexOf("valuecommerce.com") > -1 &&  strUrl.indexOf("vc_url") > -1){

				strUrl = strUrl.replace(/ *[\s\S]*vc_url=/,"").replace(/&waad=.*$/,"").replace(/\?vos=.*$/,"");

				setLink();

//http://a5.tuhan.ne.jp/r.php?site=coneco&ec=1715&pagetype=coneco&sku=4549210020560&cat=01011010&price=59886&op=category_name%3D%2583%2566%2583%2558%2583%254E%2583%2567%2583%2562%2583%2576%2583%2570%2583%255C%2583%2552%2583%2593%26item_id%3D1130829060%26ta%3D20%26item_name%3DFMVD0502NP%2BESPRIMO%2BD551%252FGX%2BSP%2528Celeron%2BG1610%252F2GB%252F500GB%252FDVD%252FWin7%2BPro%2529&url=http%3A%2F%2Fwww.coneco.net%2Fgoshop.asp%3Fm_id%3Dea2fafcdb4251e13f7c9172f0d089e98%26com_id%3D1130829060%26shop_id%3D1715%26c_id%3D01011010%26goshop%3D1%26ta%3D20
			//a5.tuhan（conecoで確認）
			}else if(strUrl.indexOf("a5.tuhan.ne.jp") > -1 && strUrl.match("&url=http")){
//				strUrl = strUrl.replace(/ *[\s\S]*&url=http/,"http");

				var params  =  createParamArray(href);	//パラメータ格納
				strUrl = decURI(params["url"]);

				setLink();
				allLinks[i].setAttribute("style", "height:auto!important;background:none;");


			//linksynergy（conecoで確認）
			}else if(strUrl.indexOf(".linksynergy.") > -1 && strUrl.match("&murl=http") || strUrl.indexOf("RD_PARM1=") > -1){

				strUrl = strUrl.replace(/ *[\s\S]*murl=http/,"http");
				strUrl = strUrl.replace(/ *[\s\S]*RD_PARM1=http/,"http");
				strUrl = strUrl.replace(/(\&jumpid=|\&gid).*$/,"");

				setLink();

//http://ad2.trafficgate.net/t/r/18/702/44662/0/-/https://shop.elecom.co.jp/Store/Product.aspx?JanCd=4953103062849
			//trafficgate
			}else if(strUrl.indexOf("trafficgate.net") > -1){
				if(strUrl.match("/-/http")){
					strUrl = strUrl.replace(/.*\/-\/http/,"http");
					setLink();
				}

//http://ls.j-a-net.jp/?a=36882&d=494714&url=http%3A%2F%2Fwww%2E10keiya%2Ecom%2Fitem%2F5083%2Ehtml
			//Janet（conecoで確認）
			}else if(strUrl.indexOf(".j-a-net.jp") > -1 && strUrl.match("&url=http")){
				strUrl = strUrl.replace(/ *[\s\S]*&url=http/,"http");
				setLink();


//http://rd.listing.yahoo.co.jp/o/shop/FOR=S1i43IwqjlY6D7pQe57uxmGLnstXXQo1xbvXhyeuVhgpSb9J7jjgtHs1.cDrqA--;/aclk;_ylt=A3JvdlJIaDFTX34AMlOkKdhE;_ylu=X3oDMTRkZTBza3F0BE9WTANOBFIDMQRhZGdyaWQDOTI1MTE5NDAxMwRjb3N0A29aLllOSHhLaFd2awRjcnR2aWQDMzA1NzM2NTc2NTMEZ2NsbnRpZANleHRlcm5hbC15ai1wYXJ0bmVyLWczLWFkLTAwMDA0MARvbW0DZQRzZWMDb3YtdG9wBHNwYWNlaWQDMTE1NTAxNzEyNA--?sa=l&ai=CbBULSGgxU8-OLNHB-QOe8IC4Br3T8t4EzYnri3KbnsnhUAgAEAEgiq3GGygCUOOCuL35_____wFgicvBhOwToAG7jvPZA8gBAakCobEkFGAGRT6qBCBP0PlWubvcavx2c1oHxugF_cK0CWlnZeNXj4yL7OLhyKoGAIAHrfGMJpAHAQ&sig=zOu8r1I75B6If2Q8VWzjkkTKFV4_a1yaiXW_2MQWxJ4geCFv5_y7/**http://www.yodobashi.com/ec/category/index.html%3Fword%3DHD598%26yad1%3De%26yad3%3Dhd598%26yad4%3D30573657653%26xfr%3Dyad%26utm_source%3Dyahoo%26utm_medium%3Dcpc%26utm_term%3DHD598
			//yahoo広告
			}else if(strUrl.indexOf("rd.listing.yahoo.co.jp") > 0 && strUrl.match(/\*\*http/)){
				strUrl = strUrl.replace(/.*\/\*\*http(.*$)/i,'http$1' );
				setLink();

//http://rd.yahoo.co.jp/shopping/adwords/evt=71758/0bc80r6/*http://rd.yahoo.co.jp/shp/listing/ad/evt=86270/evj=0bc80r6/?http://store.shopping.yahoo.co.jp/eastnoboru/y00119.html
			//yahoo広告(ヤフオクのカレンダー追加が文字化けのため調整中。アフィIDが含まれるかもわからないので一時凍結)
/*			}else if(strUrl.indexOf("rd.yahoo.co.jp") > 0 && strUrl.match(/\?http/)){
				strUrl = strUrl.replace(/.*\/\?http/,"http");
				setLink();
*/

//http://rd.ane.yahoo.co.jp/rd?ep=Zu8M71vT9mdngAGwggXc7XSnf9kuszvHyFc5TZbjl2TngsfCpch0pxpjcag_g.93uqTr2ZyM1ZNOlxs2LxSkPO1NdV.l3tpu9e6mhYL8G9wqOKRxhOJW4xj3XQKKxQvtqyqtUJKeifRur24Svte1UnOJ_0KWk0JT8NNDyGpvrdMGYw--&a=hY1Vje8_xD5MDIo7Jw--&s=FSi8Pp49lQ--&t=DpEYQJl6yQAvrid1soQ834am&C=9&D=1&I=&RI=b819b94c4e16443476c39e842f1bc244&S=124a3ff80a84&as=1&f=1&ff=0&fq_d=1,1,1,0&fq_m=3,3,3,0&fq_w=1,1,1,0&g=4&lp=http%3a//promotionalads.yahoo.co.jp/ads/listing04/%3fo=JP1000&maf=0&mid=0&o=9&p=9&qfid=&r=0&rfm=&sfid=0&skwid=0&F=0&tlid=0&u=detail.chiebukuro.yahoo.co.jp/qa/question_detail/
			//yahoo広告
			}else if(strUrl.indexOf("rd.ane.yahoo.co.jp") > 0 && strUrl.match(/lp=http/)){
				var params  =  createParamArray(strUrl);	//パラメータ格納
				strUrl = decURI(params["lp"]);
				setLink();


			//2ch==============================================================================
			}else if(strUrl.match(/(\/ime.(nu|st)\/|jump.2ch.net\/\?|pinktower.com\/)/)){
				strUrl=strUrl.replace(/.*(\/ime.(nu|st)\/|jump.2ch.net\/\?|pinktower.com\/)/,"http://");
				setLink();


			//2chまとめ=======================================================================
//http://bubjs.com/http://www.4gamer.net/games/106/G010649/20140305012/
			//Rちゃんねる
			}else if(strUrl.match(/bubjs.com\/http/)){
				strUrl = strUrl.replace(/https?:\/\/bubjs.com\/http/,"http");
				setLink();

			}else{
			}


			//共通トラッカー系---------------------------------------------------------------------

//http://www.suruga-ya.jp/database/107100001000.html?utm_source=coneco&utm_medium=CPC&utm_campaign=kakaku_new&i4c=190&i4a=5
//http://www.caravan-yu.com/shop/g/g4905524811384/?utm_source=kakaku.com&utm_medium=priceComparison&utm_campaign=kakaku.com
			//多分トラッカーと思われる
			if(strUrl.indexOf("utm_source") > -1){
				strUrl = strUrl.replace(/(\?|\&)utm_source=.*$/,"");
				setLink();

			//多分トラッカーと思われる(list.Q10とかで確認)
			}else if(strUrl.indexOf("jaehuid") > -1){
				strUrl = strUrl.replace(/(\?|\&)jaehuid=.*$/,"");
				setLink();

//http://www.ksdenki.com/ec/commodity/00000000/4905524811384&vcptn=DPF-C70A%20W/
			//ks電気の不要で不明なパラメータ削除
			}else if(strUrl.indexOf("vcptn") > -1){

				strUrl = strUrl.replace(/(\&|\?)vcptn.*$/,"");

				setLink();

//http://tracking.yourguide.co.jp/in/ya-575042/http://shopping.yourguide.co.jp/word/HD598/
			//tracking.yourguide
			}else if(strUrl.indexOf("tracking.yourguide.co.jp/in/") > -1){
				strUrl = strUrl.replace(/.*tracking.yourguide.co.jp\/in\/.*\/(http.*$)/i,"$1");

				setLink();


//http://dms.netmng.com/si/CM/Tracking/TrackRedirect.aspx?siclientid=2520&redirecturl=http://www.amazon.co.jp/dp/B0019DPHVO/ref=asc_df_B0019DPHVO953949/?tag=coneco-ce-22&creative=9311&creativeASIN=B0019DPHVO&linkCode=asn&me=AN1VRQENFRJN5&SICustTransType=9854&transactionamount=52.6&x1=2828&x2=01109999&x3=1090909212&x4=8f001b2487cda54cc46496c3308668c1&jscript=0
			//netmng
			}else if(strUrl.indexOf("dms.netmng.com") > -1){
				if(strUrl.indexOf("redirecturl=") > -1){
					strUrl = strUrl.replace(/ *[\s\S]*redirecturl=/,"").replace(/ref=.*$/,"").replace(/&waad=.*$/,"");

					setLink();
				}

//http://dms.netmng.com/si/cm/tracking/clickredirect.aspx?sitrackingid=565231550&siclientid=7722&siadtrackid=31891032366&sinetwork=s&simobile=&sidevice=c
//http://track.searchignite.com/si/cm/tracking/clickredirect.aspx?sitrackingid=696296406&siclientid=9992&siadtrackid=42697278684&sinetwork=s&simobile=&sidevice=c
			//パラメータsitrackingid以降除去(実験的実装)
			}else if(strUrl.match("sitrackingid")){
				var params  =  createParamArray(strUrl);	//パラメータ格納
				strUrl = strUrl.replace(/(.*sitrackingid).*$/i,'$1=') + params["sitrackingid"];
				setLink();

			}else{
			}

			//サイト別----------------------------------------------------------------

			//amazon==============================================================================
			if(strUrl.match(/amazon.(co.jp|com|ca|com.br|com.mx|co.uk|de|fr|it|es|cn|in|com.au)/)
			  //ページスクロール系は除外
			  && href != location.href + "#"){

//http://www.amazon.co.jp/gp/product/images/4048919377/ref=dp_otherviews_z_0?ie=UTF8&img=0&s=books
				//商品画像の切り替えURLだったら除外
				if(strUrl.match("/gp/product/images/")){
					//何もしない

//最小URLhttp://www.amazon.co.jp/gp/feature.html/?docId=3077105266
//http://www.amazon.co.jp/gp/feature.html/ref=amb_link_62524409_1?ie=UTF8&docId=3077105266&pf_rd_m=AN1VRQENFRJN5&pf_rd_s=right-3&pf_rd_r=15JXRW95NTA1HR1HTFBJ&pf_rd_t=1401&pf_rd_p=108877009&pf_rd_i=3077105566&tag=jgpto1-22
				//今年一番売れたランキング
				}else if(strUrl.match("gp/feature.html")){
					var params  =  createParamArray(strUrl);	//パラメータ格納
					strUrl=strUrl.replace(/(feature.html).*$/i, "$1/?docId=" + params["docId"]);

//http://www.amazon.co.jp/gp/offer-listing/4047318752/ref=as_li_tf_tl?ie=UTF8&camp=247&creative=1211&creativeASIN=4047318752&linkCode=おそらくアフィリエイトID&tag=タグ名
				//オファーリスト
				}else if(strUrl.match("gp/offer-listing/")){
					var setPage = "";
					var setCond = "";
					var setSPFilter = "";
					var setFlg = 0;

					//ページ移動用パラメータ
					if(strUrl.match("startIndex")){
						var params  =  createParamArray(strUrl);	//パラメータ格納
						setPage = "?startIndex=" + params["startIndex"];
						setFlg = 1;
					}

//正しいhttp://www.amazon.co.jp/gp/offer-listing/B00CS9LOMY/?condition=used
//正しいhttp://www.amazon.co.jp/gp/offer-listing/B00CS9LOMY/?condition=new
//http://www.amazon.co.jp/gp/offer-listing/B00CS9LOMY/sr=/qid=/ref=olp_tab_new?ie=UTF8&colid=&coliid=&condition=new&me=&qid=&seller=&sr=
//http://www.amazon.co.jp/gp/offer-listing/B00CS9LOMY/sr=/qid=/ref=olp_tab_all?ie=UTF8&colid=&coliid=&condition=all&me=&qid=&seller=&shipPromoFilter=&sort=sip&sr=
					//すべて、新品、中古の切り替えcondition=used
					if(strUrl.match("condition")){
						var params  =  createParamArray(strUrl);	//パラメータ格納
						if(setFlg == 1){
							setCond = "&condition=" + params["condition"];
						}else{
							setCond = "?condition=" + params["condition"];
						}
						setFlg = 1;
					}

//正しいhttp://www.amazon.co.jp/gp/offer-listing/B00CS9LOMY/?condition=all&shipPromoFilter=1
//http://www.amazon.co.jp/gp/offer-listing/B00CS9LOMY/sr=/qid=/ref=olp_sss_all?ie=UTF8&colid=&coliid=&condition=all&me=&qid=&seller=&shipPromoFilter=1&sort=sip&sr=
					//amazonのみ表示(shipPromoFilterが1だとamazon発送のみの模様)
					if(strUrl.match("shipPromoFilter")){
						var params  =  createParamArray(strUrl);	//パラメータ格納
						if(setFlg == 1){
							setSPFilter = "&shipPromoFilter=" + params["shipPromoFilter"];
						}else{
							setSPFilter = "?shipPromoFilter=" + params["shipPromoFilter"];
						}
						setFlg = 1;
					}

					strUrl=strUrl.replace(/(offer-listing)\/(\w+).*$/i, "$1/$2/" + setPage + setCond + setSPFilter);


//http://www.amazon.co.jp/gp/bestsellers/videogames/ref=pd_ts_zgc_vg_videogames_more?pf_rd_p=124383849&pf_rd_s=right-5&pf_rd_t=101&pf_rd_i=489986&pf_rd_m=AN1VRQENFRJN5&pf_rd_r=17WR411NGHX711WEVSTF
				//ベストセラー
				}else if(strUrl.match("/bestsellers/")){
					strUrl=strUrl.replace(/ref=.*$/, "");

//http://www.amazon.co.jp/OUTDOOR-PRODUCTS(%E3%82%A2%E3%82%A6%E3%83%88%E3%83%89%E3%82%A2%E3%83%97%E3%83%AD%E3%83%80%E3%82%AF%E3%83%84)/b/ref=dp_apparel_byline_ety?_encoding=UTF8&node=2331646051
				//該当店舗の商品一覧
				}else if(strUrl.match(/\/b\//) && strUrl.match(/node=/)){
					var params  =  createParamArray(strUrl);	//パラメータ格納
					strUrl=strUrl.replace(/(\/b\/).*$/i, "$1?node=" + params["node"]);

//正しいアドレスhttp://www.amazon.co.jp/gp/aw/d/B003YU3XUM
//http://www.amazon.co.jp/gp/aw/rd.html?uid=アフィIDらしきもの&at=アフィIDらしきもの&a=B003YU3XUM&url=%2Fgp%2Faw%2Fd.html&lc=msn
				//スマホ用アドレス(暫定対応)
				}else if(strUrl.match(/\/gp\/aw\//)){
					if(strUrl.match(/uid=/) || strUrl.match(/&at=/)){
						var params  =  createParamArray(strUrl);	//パラメータ格納
						strUrl=strUrl.replace(/(amazon\.(co.jp|com|ca|com.br|com.mx|co.uk|de|fr|it|es|cn|in|com.au))\/.*$/i, "$1" + "/gp/aw/d/" + params["a"]);
					}

					//「amazon.co.jp/dp/商品ID/?tag=色々」用に念のため対応
					strUrl=strUrl.replace(/(\/gp\/aw\/d\/)(.*(\/|))?tag=.*$/i, "$1" + "$2");
					//「amazon.co.jp/gp/aw/d/商品ID/ref=リファラ/?tag=色々」の場合取りこぼすようなので対応
					strUrl=strUrl.replace(/(\/gp\/aw\/d\/)(.*)\/ref.*$/i, "$1" + "$2/");
					//「amazon.co.jp/文字/dp/商品ID」用に念のため対応
					strUrl=strUrl.replace(/(amazon\.(co.jp|com|ca|com.br|com.mx|co.uk|de|fr|it|es|cn|in|com.au))\/.*(\/gp\/aw\/d\/.*$)/i, "$1" + "$3");

					//商品説明のリンクで必要なパラメータまで消すので補てん
					if(!strUrl.match("dsc=") && href.match("dsc=")){
						var params  =  createParamArray(href);	//パラメータ格納
						strUrl = strUrl + "?dsc=" + params["dsc"];
					}
					//詳細説明のリンクで必要なパラメータまで消すので補てん
					if(!strUrl.match("pd=") && href.match("pd=")){
						var params  =  createParamArray(href);	//パラメータ格納
						strUrl = strUrl + "?pd=" + params["pd"];
					}

//http://www.amazon.co.jp/s/?ie=UTF8&keywords=%EF%BD%88%EF%BD%84%EF%BC%95%EF%BC%99%EF%BC%98&tag=yahhyd-22&index=aps&jp-ad-ap=0&hvadid=38791875337&hvdev=c&ref=pd_sl_5gvni8sdbi_b
//http://www.amazon.co.jp/gp/search?keywords=SD-ANW1475P81&__mk_ja_JP=%83J%83%5E%83J%83i&tag=memotora-22
				}else if(strUrl.match(/\/s\//) 
				  || strUrl.match(/\/search\?/)){
					//keywords(keywordsとfield-keywordsの2種類ある模様）
					if(strUrl.match(/(\?|\&)keywords=/)){
						var strPage = "";	//表示ページ数
						var strPriceOff = "";	//割引率

						var params  =  createParamArray(strUrl);	//パラメータ格納
						if(strUrl.match("page=")){
							strPage = "&page=" + params["page"];
						}
						if(strUrl.match("pct-off=")){
							strPriceOff = "&pct-off=" + params["pct-off"];
						}
						strUrl=strUrl.replace(/(.*\/(s\/|search)).*$/i, "$1?keywords=" + params["keywords"] + strPage + strPriceOff);

					//field-keywords
					}else if(strUrl.match(/(\?|\&)field-keywords=/)){
						var strPage = "";	//表示ページ数
						var strPriceOff = "";	//割引率

						var params  =  createParamArray(strUrl);	//パラメータ格納
						if(strUrl.match("page=")){
							strPage = "&page=" + params["page"];
						}
						if(strUrl.match("pct-off=")){
							strPriceOff = "&pct-off=" + params["pct-off"];
						}
						strUrl=strUrl.replace(/(.*\/(s\/|search)).*$/i, "$1?field-keywords=" + params["field-keywords"] + strPage + strPriceOff);

					}else if(strUrl.match(/(\?|\&)rh=/)){
						var params  =  createParamArray(href);	//パラメータ格納
						strUrl=strUrl.replace(/(.*\/s\/).*$/i, "$1?rh=" + params["rh"]);
					}

//http://www.amazon.co.jp/G246%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA-24%E5%9E%8B%E3%83%AF%E3%82%A4%E3%83%89%E6%B6%B2%E6%99%B6%E3%83%A2%E3%83%8B%E3%82%BF%E3%83%BC-1920%C3%971080-%E5%85%A5%E5%8A%9B%E7%AB%AF%E5%AD%90%E3%83%9F%E3%83%8BD-Sub15%E3%83%94%E3%83%B3%E3%83%BBDVI-D%E2%80%BBHDCP%E5%AF%BE%E5%BF%9C%E3%83%BBHDMI-G246HLABID/dp/B00ADGM1A8%3FSubscriptionId%3D0571BBGTQZ5YYPEDSY02%26tag%3Dkakaku-pc-pcother-22%26linkCode%3Dxm2%26camp%3D2025%26creative%3D165953%26creativeASIN%3DB00ADGM1A8%26me%3dAN1VRQENFRJN5
				//通常の商品URL
				}else {

					var strNewUrl=strUrl.replace(/(amazon\.(co.jp|com|ca|com.br|com.mx|co.uk|de|fr|it|es|cn|in|com.au))\/.*\/(ASIN|product|dp)\/(\w+)(\/|\?|\%3F).*$/i, "$1/" + "dp/" + "$4/");
					if (strUrl == strNewUrl) {
						//「amazon.co.jp/文字/dp/商品ID/?tag=色々」の場合の除去
						strUrl=strUrl.replace(/(amazon\.(co.jp|com|ca|com.br|com.mx|co.uk|de|fr|it|es|cn|in|com.au))\/.*\/(ASIN|product|dp)\/(\w+)$/i, "$1/" + "dp/" + "$4");


						//「amazon.co.jp/dp/商品ID/?tag=色々」の場合取りこぼすようなので対応
						strUrl=strUrl.replace(/(\/dp\/)(.*(\/|))\?tag=.*$/i, "$1" + "$2");
						//「amazon.co.jp/dp/商品ID/ref=リファラ/?tag=色々」の場合取りこぼすようなので対応
						strUrl=strUrl.replace(/(\/dp\/)(.*)\/ref.*$/i, "$1" + "$2/");

						//「amazon.co.jp/文字/dp/商品ID」文字が残るので削除
						//Amazon定期おトク便は除外
						if(!strUrl.match("/gp/subscribe-and-save/")){
							strUrl=strUrl.replace(/(amazon\.(co.jp|com|ca|com.br|com.mx|co.uk|de|fr|it|es|cn|in|com.au))\/.*(\/dp\/.*$)/i, "$1" + "$3");
						}

					}else{
						strUrl = strNewUrl;
					}
				}

				setLink();	//リンク変更

//sample
//http://pt.afl.rakuten.co.jp/c/数字/_RTvrgj数字?url=http%3A%2F%2Fitem.rakuten.co.jp%2Fサイト名とか
			//楽天==============================================================================
			}else if(strUrl.indexOf("rakuten.co.jp")>0){
//				var raktenPrms = "";

//http://item.rakuten.co.jp/jet-pc/4300_15/--hybrid--http://item.rakuten.co.jp/jet-pc/4300_15/&subid=&type=10&tmpid=11045
				//楽天のリダイレクト除去
				if(href.indexOf("--hybrid--http") > -1){
					cutNum = strUrl.indexOf("--hybrid--");
					strUrl = strUrl.slice(cutNum+10);
					strUrl = strUrl.replace(/(\?|\&)subid=.*$/,'');
				}

				//アフィリエイト除去
				if(href.indexOf("pt.afl.rakuten.co.jp")>-1 &&href.indexOf("url=")>-1){
					var params  =  createParamArray(href);	//パラメータ格納
					strUrl = decsURI(params["url"]);
					flgUnDec = 1;

				}else if(href.indexOf("hb.afl.rakuten.co.jp")>-1 && href.indexOf("pc=")>-1){
					var params  =  createParamArray(href);	//パラメータ格納
					strUrl = decURI(params["pc"]);
					flgUnDec = 1;
				}

/*
//http://esearch.rakuten.co.jp/rms/sd/esearch/vc?sv=2&v=2&e=0&s=28&sub=0&k=0&oid=000&c=2836&sitem=%A5%D1%A5%BD%A5%B3%A5%F3%A5%C7%A5%B9%A5%AF+180cm+BON&f=A&nitem=&g=0&min=&max=&p=0
				//esearchはパラメータの文字エンコードUTF8(？)をデコードするらしい
				if(href.match("/esearch.rakuten.co.jp") && href.match("sitem=")){
					var params  =  createParamArray(href);	//パラメータ格納

					raktenPrms = rakutenParam();

					strUrl = "http://esearch.rakuten.co.jp/rms/sd/esearch/vc?" + raktenPrms;

					flgUnDec = 1;
				}

//http://search.rakuten.co.jp/search/mall?v=2&s=1&p=1&min=&max=&g=101164&sitem=web+money&st=A&nitem=%92%99%8B%E0%94%A0+%82%A0%82%C2%82%DC%82%EA+Confidential++Fallout
				if(href.match("/search.rakuten.co.jp") && href.match("sitem=")){
					var params  =  createParamArray(strUrl);	//パラメータ格納

					raktenPrms = rakutenParam();

					strUrl = "http://search.rakuten.co.jp/search/mall?sitem=" + raktenPrms;
					
					flgUnDec = 1;
				}

//http://search.books.rakuten.co.jp/bksearch/nm?sitem=%BF%B7%CA%A1%CA%DD%CE%B4&sv=30&v=2&spv=2
				if(href.match("/search.books.rakuten.co.jp") && href.match("sitem=")){
					var params  =  createParamArray(strUrl);	//パラメータ格納

					raktenPrms = rakutenParam();

					strUrl = "http://search.books.rakuten.co.jp/bksearch/nm?sitem=" + raktenPrms + "&spv=2";
					
					flgUnDec = 1;
				}
*/

				//おそらくパラメータのscidはトラッカーでsc2idがアフィIDと思われるのでまとめて削除
				strUrl = strUrl.replace(/(\/|\?|\&)scid=.*$/,"").replace(/(\/|\?|\&)sc2id=.*$/,"");

				setLink();
//https://www.mydocomo.com/onlineshop/products/smart_phone/SO02F.html?cid=OLS_PRD_SO02F_from_kdc_PRD_SO02F
			//docomo==================================================================================
			}else if(strUrl.indexOf("mydocomo.com") > -1 && strUrl.indexOf(".html?") > -1){

				strUrl = strUrl.replace(/.html?.*$/,".html");

				setLink();

			//DMM==============================================================================
			}else if(strUrl.indexOf("//ad.dmm.com/ad")>-1 && strUrl.indexOf("_lurl=") > -1){
				cutNum=strUrl.indexOf("_lurl=");
				strUrl=strUrl.slice(cutNum+6);
				setLink();

			//Dlsite==============================================================================
			}else if(strUrl.indexOf(".dlsite.com") > -1 &&  strUrl.match(/(\/|%2F)dlaf(\/|%2F)/)){


//正しいURL http://www.dlsite.com/maniax(←ジャンル)/work/=/product_id/RJ番号/
//http://www.dlsite.com/home/dlaf/=/aid/ユーザーID/url/http://www.dlsite.com/maniax/work/=/product_id/RJ番号.html/?medium=blog&program=on_sale&source=blogparts_v_ranking
//http://www.dlsite.com/maniax/work/=/product_id/RJ番号/?medium=blog&program=on_sale&source=blogparts_RankingParts&unique_op=af
				//商品ページへのジャンプクッションを削除----------------------
				if(strUrl.indexOf("/url/http://") > -1){
					cutNum=strUrl.indexOf("/url/http://");
					strUrl=strUrl.slice(cutNum+5);

					strUrl=strUrl.replace(/.html.*$/,"/");

					strUrl = strUrl.replace(/\?.*$/,"/");

//正しいURL http://www.dlsite.com/maniax/work/=/product_id/RJ番号/
//http://www.dlsite.com/maniax/dlaf/=/link/work/aid/ユーザーID/id/RJ番号.html
//http://maniax.dlsite.com/dlaf/=/link/work/aid/ユーザーID/id/RJ番号.html
				//商品ページ--------------------------------------------
				}else if(strUrl.match(/id\/(R|B|V)J/) ){

					strUrl=strUrl.replace(/.html.*$/,"/").replace(/aid\/ *[\s\S]*\/id/,'=/product_id').replace(/\/dlaf\/=\/link/,'');

//正しいURLhttp://www.dlsite.com/maniax/circle/profile/=/maker_id/RG番号.html
//http://www.dlsite.com/maniax/dlaf/=/link/profile/aid/ユーザーID/maker/RG番号.html
				//出版グループ---------------------------------------
				}else if(strUrl.match(/maker\/(R|B)G/)){
					strUrl=strUrl.replace(/dlaf\/ *[\s\S]*\/maker/,'maker');

//http://www.dlsite.com/home/dlaf/=/aid/ユーザーID/link/top.html
//http://www.dlsite.com/maniax/dlaf/=/aid/ユーザーID/url/http://www.dlsite.com/home/welcome
				//その他(トップページとか)・・・一度ユーザーIDのURL開くとクッキーが残るっぽい----------
				}else{
					if(strUrl.indexOf("/top/") > -1 || strUrl.indexOf("/link/") > -1){
						strUrl = strUrl.replace(/dlaf\/.*$/,"");

					}else if(strUrl.indexOf("/url/") > -1){
						strUrl=strUrl.replace(/\/url\/http:\/\/.*$/,"").replace(/.htm/,"/");
					}
				}

				setLink();
				//CSS修正
				dlsiteCSS()

			//Dlsite残り===========================================================================
			}else if(strUrl.indexOf(".dlsite.com") > -1){
				if(strUrl.indexOf("/?") > -1){
					strUrl=strUrl.replace(/\/\?.*$/,"/");
					setLink();
					dlsiteCSS()
				}

//http://www.dospara.co.jp/5shopping/detail_parts.php?bg=2&br=98&sbr=529&ic=356714/
			//dosparaの不要で不明なパラメータ削除
			}else if(strUrl.indexOf("dospara.co.jp") > -1 && strUrl.indexOf("ic=") > -1){
				var params  =  createParamArray(strUrl);	//パラメータ格納
				strUrl = strUrl.replace(/.php.*$/,".php?ic=") + params["ic"] + "&lf=0";

				setLink();

////http://www.yodobashi.com/ec/category/index.html?word=HD598&yad1=e&yad3=hd598&yad4=30573657653&xfr=yad
			//ヨドバシ
			}else if(strUrl.indexOf("yodobashi.com") > -1 && strUrl.indexOf("yad") > -1){
				var params  =  createParamArray(strUrl);	//パラメータ格納
				strUrl = strUrl.replace(/(.*index.html\?word=).*$/i,"$1") + params["word"];

				setLink();

//http://www.nissen.co.jp/sho_item/regular/6400/6400_12861.asp?book=6400&cat=other003/
			//ニッセンの不要で不明なパラメータ削除
			}else if(strUrl.indexOf("nissen.co.jp") > -1 && strUrl.indexOf(".asp") > -1){

				strUrl = strUrl.replace(/.asp.*$/,".asp");

				setLink();

//正しいhttp://www.askul.co.jp/p/商品ID/
//http://www.askul.co.jp/stn?mode=affiliate&tool=215&frameURL=/p/商品ID/&sc_e=cp_a_as_vc_ps_a_p_kakaku
			//askul
			}else if(strUrl.indexOf("www.askul.co.jp") > -1 && strUrl.indexOf("/p/") > -1){
				strUrl = strUrl.replace(/(www.askul.co.jp)\/.*(\/p\/)(.*\/).*$/i,"$1"+ "$2" + "$3");

				setLink();

//http://askulcorporation.tt.omtrdc.net/m2/askulcorporation/ubox/page?mbox=Lohaco_pc_yshppoint_redirect&mboxDefault=http%3A%2F%2Flohaco.jp%2Fevent%2Fbonus_winter%2F%3Fbk%3Dy%26sc_e%3Dj_as_ya_pc_n_pc
//http://askulcorporation.tt.omtrdc.net/m2/askulcorporation/ubox/page?mbox=Lohaco_pc_yshppoint_redirect&mboxDefault=http://lohaco.jp/event/bonus_winter/?bk=y
			}else if(strUrl.match(/askulcorporation.tt.omtrdc.net/) && strUrl.match(/mboxDefault/)){
				var params  =  createParamArray(href);	//パラメータ格納

				strUrl = decURI(params["mboxDefault"])
				strUrl = strUrl.replace(/(\?|\&)bk=.*$/,'');

				setLink();

//http://lohaco.jp/product/2690832/?sc_e=a_as_vc_ps_a_kakaku
//http://lohaco.jp/lksearch/?categoryLl=&categoryL=&categoryM=&categoryS=&searchWord=%E6%8E%83%E9%99%A4%E6%A9%9F&andOr=&itemExpl=0&resultType=&resultCount=&itemSpec=&sortDir=&sc_e=l_dt_ya_se_c_pc_58000000000_458653&ioneid=SI_692255038__1&sissr=1
			//lohaco
			}else if(strUrl.indexOf("lohaco.jp") > -1){
				if(strUrl.indexOf("sc_e=") > -1){
					strUrl=strUrl.replace(/(.*)(\?|\&)sc_e=.*$/i,'$1');

					setLink();
				}

//http://www.dena-ec.com/item/167425291?aff_id=ckk
			//dena
			}else if(strUrl.indexOf("dena-ec.com") > -1 && strUrl.indexOf("?aff_id=") > -1){
				cutNum = strUrl.indexOf("?aff_id=");
				strUrl=strUrl.slice(0,cutNum);

				setLink();

			//ツクモのトラッカー
			}else if(strUrl.indexOf("tsukumo.co.jp") > -1 && strUrl.indexOf("?cid=") > -1){
				strUrl = strUrl.replace(/\?cid=.*$/,"");
				setLink();

//http://www.ark-pc.co.jp/i/20104755/?cid=kakaku
			//ark-pcのトラッカー
			}else if(strUrl.indexOf("ark-pc.co.jp") > -1 && strUrl.indexOf("?cid=") > -1){
				strUrl = strUrl.replace(/\?cid=.*$/,"");
				
				setLink();

			}else{
			}


			//スマホ関連(無駄かもしれないけど余分なパラメータ削除)===================================

//http://appdriver.jp/s/smart-c/click?digest=ff3e42b83eea658736cade80fd6c0a7faaf447484fcdad0d00acf253a2a4c23d&campaign_id=17571&identifier=2w4olVtC
			//app-adforce====================================================================
			if(strUrl.match("appdriver.jp/s/")){
				strUrl = strUrl.replace(/identifier=.*$/,'identifier=');
				
				setLink();

//最小構成http://app-adforce.jp/ad/p/r?_article=56674&_image=1731291
//http://app-adforce.jp/ad/p/r?_site=9364&_article=56674&_link=1731290&_image=1731291&suid=eae08ff6d51e68e81788caa37cd7eb80435272c7aa68bf6432373904dffe967c&sad=324379238
			//app-adforce====================================================================
			}else if(strUrl.match("app-adforce.jp/ad/p/")){
				strUrl = strUrl.replace(/\/ad\/p\/r\?.*$/i,'/ad/p/');
				var params  =  createParamArray(strUrl);	//パラメータ格納
				strUrl = strUrl + "r?_article=" + params["_article"] + "&_image=" + params["_image"];

				setLink();
			}else{

			}

		}
}catch(e){
	throw(e);
}

	//==================================共通ファンクション====================================================

//A mod killerより抜粋-----------
		function createParamArray(url)
		{
		    var params  = new Array();
		    var pos = url.indexOf("?");

		    if(pos < 0) {
		        throw new Error("invalid url :" + url);
		    }
		    var tmpAry = url.substring(pos+1,url.length).split("&");

		    for(var i=0; i<tmpAry.length; i++) {
		        var str = tmpAry[i];
		        var ampersandPos = str.indexOf("=");
		        if(ampersandPos < 0) {
		            params[str] = "";
		        }
		        else {
		            var key =str.substring(0,ampersandPos);
		            var val=str.substring(ampersandPos+1,str.length);
		            params[key] = val;
		        }
		    }
		    params.toString = function() {
		        var thisFunc = this.toString;
		        delete this.toString;
		        var returnVal = "";
		        for(var key in this) {
		            returnVal =returnVal + key + "=" + this[key] + "&";
		        }
		        this.toString = thisFunc;
		        return returnVal;
		    }
		    return params;
		}

/*		function getRedirectUrl(url, paramName)
		{
		    var params = createParamArray(url);
		    var redirectUrl = params[paramName];
		    return decodeURIComponent(redirectUrl);
		    throw new Error();
		}
*/
//A mod killerより抜粋ここまで-----------



		//URLデコード
		function decURI(str){
			var charCode = "";
			if (str.match("%")) {
				try {
					charCode = GetEscapeCodeType(str);
					if ( charCode == "UTF8" ) {
						str = UnescapeUTF8(str);
					}else if ( charCode == "EUCJP" ) {
						str = UnescapeEUCJP(str);
					}else if ( charCode == "SJIS" ) {
						str = UnescapeSJIS(str);
					}else if ( charCode == "Unicode" ) {
						str = unescape(str);
					}
					
					return str;
					
				}catch(e){
					throw(e);
				}
			}else{
				return str;
			}
//		throw new Error();
		}



		//URLを変更＆オリジナルURL追加
		function setLink(){
try{

			if(flgUnDec == 0){
				strUrl = decURI(strUrl);
			}

			//ポイントが付くリンクは何もしない
			if(href.indexOf("coneco.net/point") > -1 
			  || location.href.indexOf("://tmall.tsite.jp") > 0 && location.href.indexOf("://tmall.tsite.jp") < 10
			  //ループ防止用
			  || decURI(decURI(allLinks[i].href)) == strUrl){

				//何もしない

			//備忘録ループ防止に以下は&&でなければならない
			}else if(href != strUrl && !allLinks[i].innerHTML.match("Killer")){

				//新しいウィンドウ(タブ)に開く設定だけは継承
				var setBlank = "";
				if(allLinks[i].target == "_blank"){
					setBlank = ' target="_blank"';
				}

				//class名も引き継がないと配置がずれるため継承(Amazonで確認。対象のclassにCSSで設定してる模様)
				//スクリプトなんかでclass名指定してくるアフィリエイトがあるかは未確認
				var setClass = "";
				if(allLinks[i].getAttribute("class") != null){
					setClass = 'class="' + allLinks[i].getAttribute("class") + '"';
				}

				//元のデータを残す(imgなど)
				var strTxt = allLinks[i].innerHTML;

				//元のリンクの後に修正したリンクを追加
				allLinks[i].insertAdjacentHTML('afterend', '<a ' + setClass + setBlank + ' href="' + strUrl + '">' + strTxt + '</a>'); 

				//元のリンクは中身を消してリンクだけ残す
				allLinks[i].innerHTML = '<font color="black">[Killer]</font>';

				//価格コムとconecoのボタンからonclickで起動されるトラッカーを除去(実験的実装)
				allLinks[i+1].removeAttribute("onclick");

				//googleイメージ検索の場合
				if(location.href.match(/.google./) && location.href.match(/tbm=isch/)
				  || location.href.match(/.google./) && location.href.match(/blank.html/)){
					//マウスクリックイベントの付加(詳細を開く機能)
					if(allLinks[i].getAttribute("jsaction") != null){
						allLinks[i+1].setAttribute("jsaction", 'isr.hc;mousedown:isr.hmd;mouseover:isr.hmov;mouseout:isr.hmou');
					}
					//「ページを表示」ボタン
					if(allLinks[i].getAttribute("class") == "irc_vpl irc_but"){
						allLinks[i+1].setAttribute("target", "_blank" );
					}

					//画面切り替え用のパラメータ追加
					if(allLinks[i].getAttribute("data-ved") != null){
						allLinks[i+1].setAttribute("data-ved", allLinks[i].getAttribute("data-ved"));
					}
					if(allLinks[i].getAttribute("data-item-id") != null){
						allLinks[i+1].setAttribute("data-item-id", allLinks[i].getAttribute("data-item-id"));
					}
					if(allLinks[i].getAttribute("data-target-tbnid") != null){
						allLinks[i+1].setAttribute("data-target-tbnid", allLinks[i].getAttribute("data-target-tbnid"));
					}

					//元のリンクのクラス名削除(バグ回避：画像開くたびにクラス名やID指定でURL変更されるみたいで、残ってるとそっちのURLが変わってしまうみたい)
					allLinks[i].removeAttribute("class");
					allLinks[i].removeAttribute("id");

					//元のリンクにCSS付加(positionとz-indexが違う)
					allLinks[i].setAttribute("style", 'height:auto;width:auto;position:absolute;z-index:999;background:none;margin:0!important;padding:0!important;');
					allLinks[i].getElementsByTagName("font")[0].setAttribute("style",'color:gray;');

				//それ以外
				}else{
					//元のリンクにCSS付加
					allLinks[i].setAttribute("style", 'height:auto;width:auto;position:relative;background:none;margin:0!important;padding:0!important;z-index:999;');
				}

				//修正したリンクの配下にimgタグがあった場合
				if(allLinks[i+1].getElementsByTagName("img")[0] != undefined){
					//価格.comの対応(画像が表示されなくなるので埋め込むように変更)
					if(allLinks[i+1].getElementsByTagName("img")[0].getAttribute("data-original") != null){
						var strImg = allLinks[i+1].getElementsByTagName("img")[0].getAttribute("data-original");
						allLinks[i+1].getElementsByTagName("img")[0].setAttribute("src",strImg);
						allLinks[i+1].getElementsByTagName("img")[0].setAttribute("style","display: inline; width: 146px; height: 146px;");
					}
				}
			}

//			throw new Error();
}catch(e){
	throw(e);
}

		}


		//Dlsiteのリンク修正用CSS
		function dlsiteCSS(){
try{
			if(href != strUrl){

				//CSS付加
				allLinks[i].setAttribute("style", 'height:auto;width:auto;float:left;position:absolute;z-index:999;background-image: none;margin:0!important;padding:0!important;');
				//画像埋め込みタイプ以外にCSS付加
				if(allLinks[i+1].innerHTML.indexOf("src=")<=0){
					allLinks[i+1].setAttribute("style", "margin-left:55px;");
				}
			}
//			throw new Error();
}catch(e){
	throw(e);
}

		}

/***パラメータ多すぎなので凍結。元から必要ないかも？(so many whitelist.blacklist is ...? I have no idea.)
		//楽天パラメータ
		function rakutenParam(){
				var strSitem = "";	//検索
				var strNitem = "";	//検索除外
				var strPage = "";	//ページ数
				var strType = "";	//サーバ？
				var strSid = "";	//ショップID(ショップ内検索用？)
				var strGenre = "";	//ジャンル
				var strView = "";	//表示方法
				var strFromD = "";	//発売日範囲始点
				var strToD = "";	//発売日範囲終点
				var strMinp = "";	//最低価格
				var strMaxp = "";	//最大価格

			if(strUrl.match("sitem") && params["sitem"] != undefined){
				strSitem = "sitem=" + params["sitem"];
			}
			if(strUrl.match("nitem") && params["nitem"] != undefined){
				strNitem = "&nitem=" + params["nitem"];
			}
			if(strUrl.match("o=") && params["o"] != undefined){
				strPage = "&o=" + params["o"];
			}
			if(strUrl.match("sv=") && params["sv"] != undefined){
				strType = "&sv=" + params["sv"];
			}
			if(strUrl.match("sid=") && params["sid"] != undefined){
				strSid = "&sid=" + params["sid"];
			}
			if(strUrl.match("g=") && params["g"] != undefined){
				strGenre = "&g=" + params["g"];
			}
			if(strUrl.match("fromd=") && params["fromd"] != undefined){
				strFromD = "&fromd=" + params["fromd"];
			}
			if(strUrl.match("tod=") && params["tod"] != undefined){
				strToD = "&tod=" + params["tod"];
			}
			if(strUrl.match("minp=") && params["minp"] != undefined){
				strMinp = "&minp=" + params["minp"];
			}
			if(strUrl.match("maxp=") && params["maxp"] != undefined){
				strMaxp = "&maxp=" + params["maxp"];
			}
			if(strUrl.match("v=") && params["v"] != undefined){
				strView = "&v=" + params["v"];
			}

			return + strSitem + strNitem + strPage + strType + strSid + strGenre + strFromD + strToD
				+ strMinp + strMaxp + strView;
		}
*/


//		throw new Error();
	}//main終了


//--------------------------------------------

//googleイメージ検索のみマウスクリックしたらメイン処理再実行
if(location.href.match(/.google./) && location.href.match(/tbm=isch/)
  || location.href.match(/.google./) && location.href.match(/blank.html/)){
	document.body.addEventListener('mousedown',function(evt){

		//詳細ウィンドウ右側
		window.setTimeout( function() {main(document)}, 1500 );

		//詳細ウィンドウ左側のiframe
		iframe = document.getElementsByClassName("irc_ifr")[0]; // iframeエレメント
		var ifrDoc = iframe.contentWindow.document;  //document
		window.setTimeout( function() {main(ifrDoc)}, 3000 );

		//詳細ウィンドウ左側のiframeのコピー(何故か2回目以降は複製してる方を表示する模様)
		var ifrCopy = document.getElementsByClassName("irc_mutc")[0];
		window.setTimeout( function() {main(ifrCopy)}, 3000 );

	}, false);
}



//For AutoPagerize
document.body.addEventListener('AutoPagerize_DOMNodeInserted',function(evt){
	var node = evt.target;
	window.setTimeout( function() {main(node)}, 1500 );
}, false);
//For AutoPager
document.body.addEventListener('AutoPagerAfterInsert', function(evt){
	var node = evt.target;
	window.setTimeout( function() {main(node)}, 1500 );
}, false);
//For AutoPatchWork
document.body.addEventListener('AutoPatchWork.DOMNodeInserted', function(evt){
	var node = evt.target;
	window.setTimeout( function() {main(node)}, 1500 );
}, false);




//==============================================================
//GreaseForkがrequireの審査必要なのでいっそのこと埋め込みました。
//require (c)http://www.drk7.jp/pub/js/ecl_test/ecl_new.js
//==============================================================
function ecl(){

	//
	// Escape Codec Library: ecl.js (Ver.041208)
	//
	// Copyright (C) http://nurucom-archives.hp.infoseek.co.jp/digital/
	//

	EscapeSJIS=function(str){
	    return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
	        var c=s.charCodeAt(0),m;
	        return c<128?(c<16?"%0":"%")+c.toString(16).toUpperCase():65376<c&&c<65440?"%"+(c-65216).toString(16).toUpperCase():(c=JCT11280.indexOf(s))<0?"%81E":"%"+((m=((c<8272?c:(c=JCT11280.lastIndexOf(s)))-(c%=188))/188)<31?m+129:m+193).toString(16).toUpperCase()+(64<(c+=c<63?64:65)&&c<91||95==c||96<c&&c<123?String.fromCharCode(c):"%"+c.toString(16).toUpperCase())
	    })
	};

	UnescapeSJIS=function(str){
	    return str.replace(/%(8[1-9A-F]|[9E][0-9A-F]|F[0-9A-C])(%[4-689A-F][0-9A-F]|%7[0-9A-E]|[@-~])|%([0-7][0-9A-F]|A[1-9A-F]|[B-D][0-9A-F])/ig,function(s){
	        var c=parseInt(s.substring(1,3),16),l=s.length;
	        return 3==l?String.fromCharCode(c<160?c:c+65216):JCT11280.charAt((c<160?c-129:c-193)*188+(4==l?s.charCodeAt(3)-64:(c=parseInt(s.substring(4),16))<127?c-64:c-65))
	    })
	};

	EscapeEUCJP=function(str){
	    return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
	        var c=s.charCodeAt(0);
	        return (c<128?(c<16?"%0":"%")+c.toString(16):65376<c&&c<65440?"%8E%"+(c-65216).toString(16):(c=JCT8836.indexOf(s))<0?"%A1%A6":"%"+((c-(c%=94))/94+161).toString(16)+"%"+(c+161).toString(16)).toUpperCase()
	    })
	};

	UnescapeEUCJP=function(str){
	    return str.replace(/(%A[1-9A-F]|%[B-E][0-9A-F]|%F[0-9A-E]){2}|%8E%(A[1-9A-F]|[B-D][0-9A-F])|%[0-7][0-9A-F]/ig,function(s){
	        var c=parseInt(s.substring(1),16);
	        return c<161?String.fromCharCode(c<128?c:parseInt(s.substring(4),16)+65216):JCT8836.charAt((c-161)*94+parseInt(s.substring(4),16)-161)
	    })
	};

	EscapeJIS7=function(str){
	    var u=String.fromCharCode,ri=u(92,120,48,48,45,92,120,55,70),rj=u(65377,45,65439,93,43),
	    H=function(c){
	        return 41<c&&c<58&&44!=c||64<c&&c<91||95==c||96<c&&c<123?u(c):"%"+c.toString(16).toUpperCase()
	    },
	    I=function(s){
	        var c=s.charCodeAt(0);
	        return (c<16?"%0":"%")+c.toString(16).toUpperCase()
	    },
	    rI=new RegExp;rI.compile("[^*+.-9A-Z_a-z-]","g");
	    return ("g"+str+"g").replace(RegExp("["+ri+"]+","g"),function(s){
	        return "%1B%28B"+s.replace(rI,I)
	    }).replace(RegExp("["+rj,"g"),function(s){
	        var c,i=0,t="%1B%28I";while(c=s.charCodeAt(i++))t+=H(c-65344);return t
	    }).replace(RegExp("[^"+ri+rj,"g"),function(s){
	        var a,c,i=0,t="%1B%24B";while(a=s.charAt(i++))t+=(c=JCT8836.indexOf(a))<0?"%21%26":H((c-(c%=94))/94+33)+H(c+33);return t
	    }).slice(8,-1)
	};

	UnescapeJIS7=function(str){
	    var i=0,p,q,s="",u=String.fromCharCode,
	    P=("%28B"+str.replace(/%49/g,"I").replace(/%1B%24%4[02]|%1B%24@/ig,"%1B%24B")).split(/%1B/i),
	    I=function(s){
	        return u(parseInt(s.substring(1),16))
	    },
	    J=function(s){
	        return u((3==s.length?parseInt(s.substring(1),16):s.charCodeAt(0))+65344)
	    },
	    K=function(s){
	        var l=s.length;
	        return JCT8836.charAt(4<l?(parseInt(s.substring(1),16)-33)*94+parseInt(s.substring(4),16)-33:2<l?(37==(l=s.charCodeAt(0))?(parseInt(s.substring(1,3),16)-33)*94+s.charCodeAt(3):(l-33)*94+parseInt(s.substring(2),16))-33:(s.charCodeAt(0)-33)*94+s.charCodeAt(1)-33)
	    },
	    rI=new RegExp,rJ=new RegExp,rK=new RegExp;
	    rI.compile("%[0-7][0-9A-F]","ig");rJ.compile("(%2[1-9A-F]|%[3-5][0-9A-F])|[!-_]","ig");
	    rK.compile("(%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E]){2}|(%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E])[!-~]|[!-~](%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E])|[!-~]{2}","ig");
	    while(p=P[i++])s+="%24B"==(q=p.substring(0,4))?p.substring(4).replace(rK,K):"%28I"==q?p.substring(4).replace(rJ,J):p.replace(rI,I).substring(2);
	    return s
	};

	EscapeJIS8=function(str){
	    var u=String.fromCharCode,r=u(92,120,48,48,45,92,120,55,70,65377,45,65439,93,43),
	    H=function(c){
	        return 41<c&&c<58&&44!=c||64<c&&c<91||95==c||96<c&&c<123?u(c):"%"+c.toString(16).toUpperCase()
	    },
	    I=function(s){
	        var c=s.charCodeAt(0);
	        return (c<16?"%0":"%")+(c<128?c:c-65216).toString(16).toUpperCase()
	    },
	    rI=new RegExp;rI.compile("[^*+.-9A-Z_a-z-]","g");
	    return ("g"+str+"g").replace(RegExp("["+r,"g"),function(s){
	        return "%1B%28B"+s.replace(rI,I)
	    }).replace(RegExp("[^"+r,"g"),function(s){
	        var a,c,i=0,t="%1B%24B";while(a=s.charAt(i++))t+=(c=JCT8836.indexOf(a))<0?"%21%26":H((c-(c%=94))/94+33)+H(c+33);return t
	    }).slice(8,-1)
	};

	UnescapeJIS8=function(str){
	    var i=0,p,s="",
	    P=("%28B"+str.replace(/%1B%24%4[02]|%1B%24@/ig,"%1B%24B")).split(/%1B/i),
	    I=function(s){
	        var c=parseInt(s.substring(1),16);
	        return String.fromCharCode(c<128?c:c+65216)
	    },
	    K=function(s){
	        var l=s.length;
	        return JCT8836.charAt(4<l?(parseInt(s.substring(1),16)-33)*94+parseInt(s.substring(4),16)-33:2<l?(37==(l=s.charCodeAt(0))?(parseInt(s.substring(1,3),16)-33)*94+s.charCodeAt(3):(l-33)*94+parseInt(s.substring(2),16))-33:(s.charCodeAt(0)-33)*94+s.charCodeAt(1)-33)
	    },
	    rI=new RegExp,rK=new RegExp;
	    rI.compile("%([0-7][0-9A-F]|A[1-9A-F]|[B-D][0-9A-F])","ig");
	    rK.compile("(%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E]){2}|(%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E])[!-~]|[!-~](%2[1-9A-F]|%[3-6][0-9A-F]|%7[0-9A-E])|[!-~]{2}","ig");
	    while(p=P[i++])s+="%24B"==p.substring(0,4)?p.substring(4).replace(rK,K):p.replace(rI,I).substring(2);
	    return s
	};

	EscapeUnicode=function(str){
	    return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
	        var c=s.charCodeAt(0);
	        return (c<16?"%0":c<256?"%":c<4096?"%u0":"%u")+c.toString(16).toUpperCase()
	    })
	};

	UnescapeUnicode=function(str){
	    return str.replace(/%u[0-9A-F]{4}|%[0-9A-F]{2}/ig,function(s){
	        return String.fromCharCode("0x"+s.substring(s.length/3))
	    })
	};

	EscapeUTF7=function(str){
	    var B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),
	    E=function(s){
	        var c=s.charCodeAt(0);
	        return B[c>>10]+B[c>>4&63]+B[(c&15)<<2|(c=s.charCodeAt(1))>>14]+(0<=c?B[c>>8&63]+B[c>>2&63]+B[(c&3)<<4|(c=s.charCodeAt(2))>>12]+(0<=c?B[c>>6&63]+B[c&63]:""):"")
	    },
	    re=new RegExp;re.compile("[^+]{1,3}","g");
	    return (str+"g").replace(/[^*+.-9A-Z_a-z-]+[*+.-9A-Z_a-z-]|[+]/g,function(s){
	        if("+"==s)return "+-";
	        var l=s.length-1,w=s.charAt(l);
	        return "+"+s.substring(0,l).replace(re,E)+("+"==w?"-+-":"*"==w||"."==w||"_"==w?w:"-"+w)
	    }).slice(0,-1)
	};

	UnescapeUTF7=function(str){
	    var i=0,B={};
	    while(i<64)B["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(i)]=i++;
	    return str.replace(RegExp("[+][+/-9A-Za-z]*-?","g"),function(s){
	        if("+-"==s)return "+";
	        var b=B[s.charAt(1)],c,i=1,t="";
	        while(0<=b){
	            if((c=i&7)<6)c=c<3?b<<10|B[s.charAt(++i)]<<4|(b=B[s.charAt(++i)])>>2:(b&3)<<14|B[s.charAt(++i)]<<8|B[s.charAt(++i)]<<2|(b=B[s.charAt(++i)])>>4;
	            else{c=(b&15)<<12|B[s.charAt(++i)]<<6|B[s.charAt(++i)];b=B[s.charAt(++i)]}
	            if(c)t+=String.fromCharCode(c)
	        }
	        return t
	    })
	};

	EscapeUTF8=function(str){
	    return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
	        var c=s.charCodeAt(0);
	        return (c<16?"%0"+c.toString(16):c<128?"%"+c.toString(16):c<2048?"%"+(c>>6|192).toString(16)+"%"+(c&63|128).toString(16):"%"+(c>>12|224).toString(16)+"%"+(c>>6&63|128).toString(16)+"%"+(c&63|128).toString(16)).toUpperCase()
	    })
	};

	UnescapeUTF8=function(str){
	    return str.replace(/%(E(0%[AB]|[1-CEF]%[89AB]|D%[89])[0-9A-F]|C[2-9A-F]|D[0-9A-F])%[89AB][0-9A-F]|%[0-7][0-9A-F]/ig,function(s){
	        var c=parseInt(s.substring(1),16);
	        return String.fromCharCode(c<128?c:c<224?(c&31)<<6|parseInt(s.substring(4),16)&63:((c&15)<<6|parseInt(s.substring(4),16)&63)<<6|parseInt(s.substring(7),16)&63)
	    })
	};

	EscapeUTF16LE=function(str){
	    var H=function(c){
	        return 41<c&&c<58&&44!=c||64<c&&c<91||95==c||96<c&&c<123?String.fromCharCode(c):(c<16?"%0":"%")+c.toString(16).toUpperCase()
	    };
	    return str.replace(/[^ ]| /g,function(s){
	        var c=s.charCodeAt(0);return H(c&255)+H(c>>8)
	    })
	};

	UnescapeUTF16LE=function(str){
	    var u=String.fromCharCode,b=u(92,120,48,48,45,92,120,70,70);
	    return str.replace(/^%FF%FE/i,"").replace(RegExp("%[0-9A-F]{2}%[0-9A-F]{2}|%[0-9A-F]{2}["+b+"]|["+b+"]%[0-9A-F]{2}|["+b+"]{2}","ig"),function(s){
	        var l=s.length;
	        return u(4<l?"0x"+s.substring(4,6)+s.substring(1,3):2<l?37==(l=s.charCodeAt(0))?parseInt(s.substring(1,3),16)|s.charCodeAt(3)<<8:l|parseInt(s.substring(2),16)<<8:s.charCodeAt(0)|s.charCodeAt(1)<<8)
	    })
	};

	GetEscapeCodeType=function(str){
	    if(/%u[0-9A-F]{4}/i.test(str))return "Unicode";
	    if(/%([0-9A-DF][0-9A-F]%[8A]0%|E0%80|[0-7][0-9A-F]|C[01])%[8A]0|%00|%[7F]F/i.test(str))return "UTF16LE";
	    if(/%E[0-9A-F]%[8A]0%[8A]0|%[CD][0-9A-F]%[8A]0/i.test(str))return "UTF8";
	    if(/%F[DE]/i.test(str))return /%8[0-9A-D]|%9[0-9A-F]|%A0/i.test(str)?"UTF16LE":"EUCJP";
	    if(/%1B/i.test(str))return /%[A-D][0-9A-F]/i.test(str)?"JIS8":"JIS7";
	    var S=str.substring(0,6143).replace(/%[0-9A-F]{2}|[^ ]| /ig,function(s){
	        return s.length<3?"40":s.substring(1)
	    }),c,C,i=0,T;
	    while(0<=(c=parseInt(S.substring(i,i+=2),16))&&i<4092)if(128<=c){
	        if((C=parseInt(S.substring(i,i+2),16))<128)i+=2;
	        else if(194<=c&&c<240&&C<192){
	            if(c<224){T="UTF8";i+=2;continue}
	            if(2==parseInt(S.charAt(i+2),16)>>2){T="UTF8";i+=4;continue}
	        }
	        if(142==c&&161<=C&&C<224){if(!T)T="EUCJP";if("EUCJP"==T)continue}
	        if(c<161)return "SJIS";
	        if(c<224&&!T)
	            if((164==c&&C<244||165==c&&C<247)&&161<=C)i+=2;
	            else T=224<=C?"EUCJP":"SJIS";
	        else T="EUCJP"
	    }
	    return T?T:"EUCJP"
	};

	JCT11280=Function('var a="zKV33~jZ4zN=~ji36XazM93y!{~k2y!o~k0ZlW6zN?3Wz3W?{EKzK[33[`y|;-~j^YOTz$!~kNy|L1$353~jV3zKk3~k-4P4zK_2+~jY4y!xYHR~jlz$_~jk4z$e3X5He<0y!wy|X3[:~l|VU[F3VZ056Hy!nz/m1XD61+1XY1E1=1y|bzKiz!H034zKj~mEz#c5ZA3-3X$1~mBz$$3~lyz#,4YN5~mEz#{ZKZ3V%7Y}!J3X-YEX_J(3~mAz =V;kE0/y|F3y!}~m>z/U~mI~j_2+~mA~jp2;~m@~k32;~m>V}2u~mEX#2x~mBy+x2242(~mBy,;2242(~may->2&XkG2;~mIy-_2&NXd2;~mGz,{4<6:.:B*B:XC4>6:.>B*BBXSA+A:X]E&E<~r#z+625z s2+zN=`HXI@YMXIAXZYUM8X4K/:Q!Z&33 3YWX[~mB`{zKt4z (zV/z 3zRw2%Wd39]S11z$PAXH5Xb;ZQWU1ZgWP%3~o@{Dgl#gd}T){Uo{y5_d{e@}C(} WU9|cB{w}bzvV|)[} H|zT}d||0~{]Q|(l{|x{iv{dw}(5}[Z|kuZ }cq{{y|ij}.I{idbof%cu^d}Rj^y|-M{ESYGYfYsZslS`?ZdYO__gLYRZ&fvb4oKfhSf^d<Yeasc1f&a=hnYG{QY{D`Bsa|u,}Dl|_Q{C%xK|Aq}C>|c#ryW=}eY{L+`)][YF_Ub^h4}[X|?r|u_ex}TL@YR]j{SrXgo*|Gv|rK}B#mu{R1}hs|dP{C7|^Qt3|@P{YVV |8&}#D}ef{e/{Rl|>Hni}R1{Z#{D[}CQlQ||E}[s{SG_+i8eplY[=[|ec[$YXn#`hcm}YR|{Ci(_[ql|?8p3]-}^t{wy}4la&pc|3e{Rp{LqiJ],] `kc(]@chYnrM`O^,ZLYhZB]ywyfGY~aex!_Qww{a!|)*lHrM{N+n&YYj~Z b c#e_[hZSon|rOt`}hBXa^i{lh|<0||r{KJ{kni)|x,|0auY{D!^Sce{w;|@S|cA}Xn{C1h${E]Z-XgZ*XPbp]^_qbH^e[`YM|a||+=]!Lc}]vdBc=j-YSZD]YmyYLYKZ9Z>Xcczc2{Yh}9Fc#Z.l{}(D{G{{mRhC|L3b#|xK[Bepj#ut`H[,{E9Yr}1b{[e]{ZFk7[ZYbZ0XL]}Ye[(`d}c!|*y`Dg=b;gR]Hm=hJho}R-[n}9;{N![7k_{UbmN]rf#pTe[x8}!Qcs_rs[m`|>N}^V})7{^r|/E}),}HH{OYe2{Skx)e<_.cj.cjoMhc^d}0uYZd!^J_@g,[[[?{i@][|3S}Yl3|!1|eZ|5IYw|1D}e7|Cv{OHbnx-`wvb[6[4} =g+k:{C:}ed{S]|2M]-}WZ|/q{LF|dYu^}Gs^c{Z=}h>|/i|{W]:|ip{N:|zt|S<{DH[p_tvD{N<[8Axo{X4a.^o^X>Yfa59`#ZBYgY~_t^9`jZHZn`>G[oajZ;X,i)Z.^~YJe ZiZF^{][[#Zt^|]Fjx]&_5dddW]P0C[-]}]d|y {C_jUql] |OpaA[Z{lp|rz}:Mu#]_Yf6{Ep?f5`$[6^D][^u[$[6^.Z8]]ePc2U/=]K^_+^M{q*|9tYuZ,s(dS{i=|bNbB{uG}0jZOa:[-]dYtu3]:]<{DJ_SZIqr_`l=Yt`gkTnXb3d@kiq0a`Z{|!B|}e}Ww{Sp,^Z|0>_Z}36|]A|-t}lt{R6pi|v8hPu#{C>YOZHYmg/Z4nicK[}hF_Bg|YRZ7c|crkzYZY}_iXcZ.|)U|L5{R~qi^Uga@Y[xb}&qdbd6h5|Btw[}c<{Ds53[Y7]?Z<|e0{L[ZK]mXKZ#Z2^tavf0`PE[OSOaP`4gi`qjdYMgys/?[nc,}EEb,eL]g[n{E_b/vcvgb.{kcwi`~v%|0:|iK{Jh_vf5lb}KL|(oi=LrzhhY_^@`zgf[~g)[J_0fk_V{T)}I_{D&_/d9W/|MU[)f$xW}?$xr4<{Lb{y4}&u{XJ|cm{Iu{jQ}CMkD{CX|7A}G~{kt)nB|d5|<-}WJ}@||d@|Iy}Ts|iL|/^|no|0;}L6{Pm]7}$zf:|r2}?C_k{R(}-w|`G{Gy[g]bVje=_0|PT{^Y^yjtT[[[l!Ye_`ZN]@[n_)j3nEgMa]YtYpZy].d-Y_cjb~Y~[nc~sCi3|zg}B0}do{O^{|$`_|D{}U&|0+{J3|8*]iayx{a{xJ_9|,c{Ee]QXlYb]$[%YMc*]w[aafe]aVYi[fZEii[xq2YQZHg]Y~h#|Y:thre^@^|_F^CbTbG_1^qf7{L-`VFx Zr|@EZ;gkZ@slgko`[e}T:{Cu^pddZ_`yav^Ea+[#ZBbSbO`elQfLui}.F|txYcbQ`XehcGe~fc^RlV{D_0ZAej[l&jShxG[ipB_=u:eU}3e8[=j|{D(}dO{Do[BYUZ0/]AYE]ALYhZcYlYP/^-^{Yt_1_-;YT`P4BZG=IOZ&]H[e]YYd[9^F[1YdZxZ?Z{Z<]Ba2[5Yb[0Z4l?]d_;_)a?YGEYiYv`_XmZs4ZjY^Zb]6gqGaX^9Y}dXZr[g|]Y}K aFZp^k^F]M`^{O1Ys]ZCgCv4|E>}8eb7}l`{L5[Z_faQ|c2}Fj}hw^#|Ng|B||w2|Sh{v+[G}aB|MY}A{|8o}X~{E8paZ:]i^Njq]new)`-Z>haounWhN}c#{DfZ|fK]KqGZ=:u|fqoqcv}2ssm}.r{]{nIfV{JW)[K|,Z{Uxc|]l_KdCb%]cfobya3`p}G^|LZiSC]U|(X|kBlVg[kNo({O:g:|-N|qT}9?{MBiL}Sq{`P|3a|u.{Uaq:{_o|^S}jX{Fob0`;|#y_@[V[K|cw[<_ }KU|0F}d3|et{Q7{LuZttsmf^kYZ`Af`}$x}U`|Ww}d]| >}K,r&|XI|*e{C/a-bmr1fId4[;b>tQ_:]hk{b-pMge]gfpo.|(w[jgV{EC1Z,YhaY^q,_G[c_g[J0YX]`[h^hYK^_Yib,` {i6vf@YM^hdOKZZn(jgZ>bzSDc^Z%[[o9[2=/YHZ(_/Gu_`*|8z{DUZxYt^vuvZjhi^lc&gUd4|<UiA`z]$b/Z?l}YI^jaHxe|;F}l${sQ}5g}hA|e4}?o{ih}Uz{C)jPe4]H^J[Eg[|AMZMlc}:,{iz}#*|gc{Iq|/:|zK{l&}#u|myd{{M&v~nV};L|(g|I]ogddb0xsd7^V})$uQ{HzazsgxtsO^l}F>ZB]r|{7{j@cU^{{CbiYoHlng]f+nQ[bkTn/}<-d9q {KXadZYo+n|l[|lc}V2{[a{S4Zam~Za^`{HH{xx_SvF|ak=c^[v^7_rYT`ld@]:_ub%[$[m](Shu}G2{E.ZU_L_R{tz`vj(f?^}hswz}GdZ}{S:h`aD|?W|`dgG|if{a8|J1{N,}-Ao3{H#{mfsP|[ bzn+}_Q{MT{u4kHcj_q`eZj[8o0jy{p7}C|[}l){MuYY{|Ff!Ykn3{rT|m,^R|,R}$~Ykgx{P!]>iXh6[l[/}Jgcg{JYZ.^qYfYIZl[gZ#Xj[Pc7YyZD^+Yt;4;`e8YyZVbQ7YzZxXja.7SYl[s]2^/Ha$[6ZGYrb%XiYdf2]H]kZkZ*ZQ[ZYS^HZXcCc%Z|[(bVZ]]:OJQ_DZCg<[,]%Zaa [g{C00HY[c%[ChyZ,Z_`PbXa+eh`^&jPi0a[ggvhlekL]w{Yp^v}[e{~;k%a&k^|nR_z_Qng}[E}*Wq:{k^{FJZpXRhmh3^p>de^=_7`|ZbaAZtdhZ?n4ZL]u`9ZNc3g%[6b=e.ZVfC[ZZ^^^hD{E(9c(kyZ=bb|Sq{k`|vmr>izlH[u|e`}49}Y%}FT{[z{Rk}Bz{TCc/lMiAqkf(m$hDc;qooi[}^o:c^|Qm}a_{mrZ(pA`,}<2sY| adf_%|}`}Y5U;}/4|D>|$X{jw{C<|F.hK|*A{MRZ8Zsm?imZm_?brYWZrYx`yVZc3a@f?aK^ojEd {bN}/3ZH]/$YZhm^&j 9|(S|b]mF}UI{q&aM]LcrZ5^.|[j`T_V_Gak}9J[ ZCZD|^h{N9{~&[6Zd{}B}2O|cv]K}3s}Uy|l,fihW{EG`j_QOp~Z$F^zexS`dcISfhZBXP|.vn|_HYQ|)9|cr]<`&Z6]m_(ZhPcSg>`Z]5`~1`0Xcb4k1{O!bz|CN_T{LR|a/gFcD|j<{Z._[f)mPc:1`WtIaT1cgYkZOaVZOYFrEe[}T$}Ch}mk{K-^@]fH{Hdi`c*Z&|Kt{if[C{Q;{xYB`dYIX:ZB[}]*[{{p9|4GYRh2ao{DS|V+[zd$`F[ZXKadb*A] Ys]Maif~a/Z2bmclb8{Jro_rz|x9cHojbZ{GzZx_)]:{wAayeDlx}<=`g{H1{l#}9i|)=|lP{Qq}.({La|!Y{i2EZfp=c*}Cc{EDvVB|;g}2t{W4av^Bn=]ri,|y?|3+}T*ckZ*{Ffr5e%|sB{lx^0]eZb]9[SgAjS_D|uHZx]dive[c.YPkcq/}db{EQh&hQ|eg}G!ljil|BO]X{Qr_GkGl~YiYWu=c3eb}29v3|D|}4i||.{Mv})V{SP1{FX}CZW6{cm|vO{pS|e#}A~|1i}81|Mw}es|5[}3w{C`h9aL]o{}p[G`>i%a1Z@`Ln2bD[$_h`}ZOjhdTrH{[j_:k~kv[Sdu]CtL}41{I |[[{]Zp$]XjxjHt_eThoa#h>sSt8|gK|TVi[Y{t=}Bs|b7Zpr%{gt|Yo{CS[/{iteva|cf^hgn}($_c^wmb^Wm+|55jrbF|{9^ q6{C&c+ZKdJkq_xOYqZYSYXYl`8]-cxZAq/b%b*_Vsa[/Ybjac/OaGZ4fza|a)gY{P?| I|Y |,pi1n7}9bm9ad|=d{aV|2@[(}B`d&|Uz}B}{`q|/H|!JkM{FU|CB|.{}Az}#P|lk}K{|2rk7{^8^?`/|k>|Ka{Sq}Gz}io{DxZh[yK_#}9<{TRdgc]`~Z>JYmYJ]|`!ZKZ]gUcx|^E[rZCd`f9oQ[NcD_$ZlZ;Zr}mX|=!|$6ZPZYtIo%fj}CpcN|B,{VDw~gb}@hZg`Q{LcmA[(bo`<|@$|o1|Ss}9Z_}tC|G`{F/|9nd}i=}V-{L8aaeST]daRbujh^xlpq8|}zs4bj[S`J|]?G{P#{rD{]I`OlH{Hm]VYuSYUbRc*6[j`8]pZ[bt_/^Jc*[<Z?YE|Xb|?_Z^Vcas]h{t9|Uwd)_(=0^6Zb{Nc} E[qZAeX[a]P^|_J>e8`W^j_Y}R{{Jp__]Ee#e:iWb9q_wKbujrbR}CY`,{mJ}gz{Q^{t~N|? gSga`V_||:#mi}3t|/I`X{N*|ct|2g{km}gi|{={jC}F;|E}{ZZjYf*frmu}8Tdroi{T[|+~}HG{cJ}DM{Lp{Ctd&}$hi3|FZ| m}Kr|38}^c|m_|Tr{Qv|36}?Up>|;S{DV{k_as}BK{P}}9p|t`jR{sAm4{D=b4pWa[}Xi{EjwEkI}3S|E?u=X0{jf} S|NM|JC{qo^3cm]-|JUx/{Cj{s>{Crt[UXuv|D~|j|d{YXZR}Aq}0r}(_{pJfi_z}0b|-vi)Z mFe,{f4|q`b{}^Z{HM{rbeHZ|^x_o|XM|L%|uFXm}@C_{{Hhp%a7|0p[Xp+^K}9U{bP}: tT}B|}+$|b2|[^|~h{FAby[`{}xgygrt~h1[li`c4vz|,7p~b(|mviN}^pg[{N/|g3|^0c,gE|f%|7N{q[|tc|TKA{LU}I@|AZp(}G-sz{F |qZ{}F|f-}RGn6{Z]_5})B}UJ{FFb2]4ZI@v=k,]t_Dg5Bj]Z-]L]vrpdvdGlk|gF}G]|IW}Y0[G| /bo|Te^,_B}#n^^{QHYI[?hxg{[`]D^IYRYTb&kJ[cri[g_9]Ud~^_]<p@_e_XdNm-^/|5)|h_{J;{kacVopf!q;asqd}n)|.m|bf{QW|U)}b+{tL|w``N|to{t ZO|T]jF}CB|0Q{e5Zw|k |We}5:{HO{tPwf_uajjBfX}-V_C_{{r~gg|Ude;s+}KNXH}! `K}eW{Upwbk%ogaW}9EYN}YY|&v|SL{C3[5s.]Y]I]u{M6{pYZ`^,`ZbCYR[1mNg>rsk0Ym[jrE]RYiZTr*YJ{Ge|%-lf|y(`=[t}E6{k!|3)}Zk} ][G{E~cF{u3U.rJ|a9p#o#ZE|?|{sYc#vv{E=|LC}cu{N8`/`3`9rt[4|He{cq|iSYxY`}V |(Q|t4{C?]k_Vlvk)BZ^r<{CL}#h}R+[<|i=}X|{KAo]|W<`K{NW|Zx}#;|fe{IMr<|K~tJ_x}AyLZ?{GvbLnRgN}X&{H7|x~}Jm{]-| GpNu0}.ok>|c4{PYisrDZ|fwh9|hfo@{H~XSbO]Odv]%`N]b1Y]]|eIZ}_-ZA]aj,>eFn+j[aQ_+]h[J_m_g]%_wf.`%k1e#Z?{CvYu_B^|gk`Xfh^M3`afGZ-Z|[m{L}|k3cp[it ^>YUi~d>{T*}YJ{Q5{Jxa$hg|%4`}|LAgvb }G}{P=|<;Ux{_skR{cV|-*|s-{Mp|XP|$G|_J}c6cM{_=_D|*9^$ec{V;|4S{qO|w_|.7}d0|/D}e}|0G{Dq]Kdp{}dfDi>}B%{Gd|nl}lf{C-{y}|ANZr}#={T~|-(}c&{pI|ft{lsVP}){|@u}!W|bcmB{d?|iW|:dxj{PSkO|Hl]Li:}VYk@|2={fnWt{M3`cZ6|)}|Xj}BYa?vo{e4|L7|B7{L7|1W|lvYO}W8nJ|$Vih|{T{d*_1|:-n2dblk``fT{Ky|-%}m!|Xy|-a{Pz}[l{kFjz|iH}9N{WE{x,|jz}R {P|{D)c=nX|Kq|si}Ge{sh|[X{RF{t`|jsr*fYf,rK|/9}$}}Nf{y!1|<Std}4Wez{W${Fd_/^O[ooqaw_z[L`Nbv[;l7V[ii3_PeM}.h^viqYjZ*j1}+3{bt{DR[;UG}3Og,rS{JO{qw{d<_zbAh<R[1_r`iZTbv^^a}c{iEgQZ<exZFg.^Rb+`Uj{a+{z<[~r!]`[[|rZYR|?F|qppp]L|-d|}K}YZUM|=Y|ktm*}F]{D;g{uI|7kg^}%?Z%ca{N[_<q4xC]i|PqZC]n}.bDrnh0Wq{tr|OMn6tM|!6|T`{O`|>!]ji+]_bTeU}Tq|ds}n|{Gm{z,f)}&s{DPYJ`%{CGd5v4tvb*hUh~bf]z`jajiFqAii]bfy^U{Or|m+{I)cS|.9k:e3`^|xN}@Dnlis`B|Qo{`W|>||kA}Y}{ERYuYx`%[exd`]|OyiHtb}HofUYbFo![5|+]gD{NIZR|Go}.T{rh^4]S|C9_}xO^i`vfQ}C)bK{TL}cQ|79iu}9a];sj{P.o!f[Y]pM``Jda^Wc9ZarteBZClxtM{LW}l9|a.mU}KX}4@{I+f1}37|8u}9c|v${xGlz}jP{Dd1}e:}31}%3X$|22i<v+r@~mf{sN{C67G97855F4YL5}8f{DT|xy{sO{DXB334@55J1)4.G9A#JDYtXTYM4, YQD9;XbXm9SX]IB^4UN=Xn<5(;(F3YW@XkH-X_VM[DYM:5XP!T&Y`6|,^{IS-*D.H>:LXjYQ0I3XhAF:9:(==.F*3F1189K/7163D,:@|e2{LS36D4hq{Lw/84443@4.933:0307::6D7}&l{Mx657;89;,K5678H&93D(H<&<>0B90X^I;}Ag1{P%3A+>><975}[S{PZE453?4|T2{Q+5187;>447:81{C=hL6{Me^:=7ii{R=.=F<81;48?|h8}Uh{SE|,VxL{ST,7?9Y_5Xk3A#:$%YSYdXeKXOD8+TXh7(@>(YdXYHXl9J6X_5IXaL0N?3YK7Xh!1?XgYz9YEXhXaYPXhC3X`-YLY_XfVf[EGXZ5L8BXL9YHX]SYTXjLXdJ: YcXbQXg1PX]Yx4|Jr{Ys4.8YU+XIY`0N,<H%-H;:0@,74/:8546I=9177154870UC]d<C3HXl7ALYzXFXWP<<?E!88E5@03YYXJ?YJ@6YxX-YdXhYG|9o{`iXjY_>YVXe>AYFX[/(I@0841?):-B=14337:8=|14{c&93788|di{cW-0>0<097/A;N{FqYpugAFT%X/Yo3Yn,#=XlCYHYNX[Xk3YN:YRT4?)-YH%A5XlYF3C1=NWyY}>:74-C673<69545v {iT85YED=64=.F4..9878/D4378?48B3:7:7/1VX[f4{D,{l<5E75{dAbRB-8-@+;DBF/$ZfW8S<4YhXA.(5@*11YV8./S95C/0R-A4AXQYI7?68167B95HA1*<M3?1/@;/=54XbYP36}lc{qzSS38:19?,/39193574/66878Yw1X-87E6=;964X`T734:>86>1/=0;(I-1::7ALYGXhF+Xk[@W%TYbX7)KXdYEXi,H-XhYMRXfYK?XgXj.9HX_SX]YL1XmYJ>Y}WwIXiI-3-GXcYyXUYJ$X`Vs[7;XnYEZ;XF! 3;%8;PXX(N3Y[)Xi1YE&/ :;74YQ6X`33C;-(>Xm0(TYF/!YGXg8 9L5P01YPXO-5%C|qd{{/K/E6,=0144:361:955;6443@?B7*7:F89&F35YaX-CYf,XiFYRXE_e{}sF 0*7XRYPYfXa5YXXY8Xf8Y~XmA[9VjYj*#YMXIYOXk,HHX40YxYMXU8OXe;YFXLYuPXP?EB[QV0CXfY{:9XV[FWE0D6X^YVP*$4%OXiYQ(|xp|%c3{}V`1>Y`XH00:8/M6XhQ1:;3414|TE|&o@1*=81G8<3}6<|(f6>>>5-5:8;093B^3U*+*^*UT30XgYU&7*O1953)5@E78--F7YF*B&0:%P68W9Zn5974J9::3}Vk|-,C)=)1AJ4+<3YGXfY[XQXmT1M-XcYTYZXCYZXEYXXMYN,17>XIG*SaS|/eYJXbI?XdNZ+WRYP<F:R PXf;0Xg`$|1GX9YdXjLYxWX!ZIXGYaXNYm6X9YMX?9EXmZ&XZ#XQ>YeXRXfAY[4 ;0X!Zz0XdN$XhYL XIY^XGNXUYS/1YFXhYk.TXn4DXjB{jg|4DEX]:XcZMW=A.+QYL<LKXc[vV$+&PX*Z3XMYIXUQ:ZvW< YSXFZ,XBYeXMM)?Xa XiZ4/EXcP3%}&-|6~:1(-+YT$@XIYRBC<}&,|7aJ6}bp|8)K1|Xg|8C}[T|8Q.89;-964I38361<=/;883651467<7:>?1:.}le|:Z=39;1Y^)?:J=?XfLXbXi=Q0YVYOXaXiLXmJXO5?.SFXiCYW}-;|=u&D-X`N0X^,YzYRXO(QX_YW9`I|>hZ:N&X)DQXP@YH#XmNXi$YWX^=!G6YbYdX>XjY|XlX^XdYkX>YnXUXPYF)FXT[EVTMYmYJXmYSXmNXi#GXmT3X8HOX[ZiXN]IU2>8YdX1YbX<YfWuZ8XSXcZU%0;1XnXkZ_WTG,XZYX5YSX Yp 05G?XcYW(IXg6K/XlYP4XnI @XnO1W4Zp-9C@%QDYX+OYeX9>--YSXkD.YR%Q/Yo YUX].Xi<HYEZ2WdCE6YMXa7F)=,D>-@9/8@5=?7164;35387?N<618=6>7D+C50<6B03J0{Hj|N9$D,9I-,.KB3}m |NzE0::/81YqXjMXl7YG; [.W=Z0X4XQY]:MXiR,XgM?9$9>:?E;YE77VS[Y564760391?14941:0=:8B:;/1DXjFA-564=0B3XlH1+D85:0Q!B#:-6&N/:9<-R3/7Xn<*3J4.H:+334B.=>30H.;3833/76464665755:/83H6633:=;.>5645}&E|Y)?1/YG-,93&N3AE@5 <L1-G/8A0D858/30>8<549=@B8] V0[uVQYlXeD(P#ID&7T&7;Xi0;7T-$YE)E=1:E1GR):--0YI7=E<}n9|aT6783A>D7&4YG7=391W;Zx<5+>F#J39}o/|cc;6=A050EQXg8A1-}D-|d^5548083563695D?-.YOXd37I$@LYLWeYlX<Yd+YR A$;3-4YQ-9XmA0!9/XLY_YT(=5XdDI>YJ5XP1ZAW{9>X_6R(XhYO65&J%DA)C-!B:97#A9;@?F;&;(9=11/=657/H,<8}bz|j^5446>.L+&Y^8Xb6?(CYOXb*YF(8X`FYR(XPYVXmPQ%&DD(XmZXW??YOXZXfCYJ79,O)XnYF7K0!QXmXi4IYFRXS,6<%-:YO(+:-3Q!1E1:W,Zo}Am|n~;3580534*?3Zc4=9334361693:30C<6/717:<1/;>59&:4}6!|rS36=1?75<8}[B|s809983579I.A.>84758=108564741H*9E{L{|u%YQ<%6XfH.YUXe4YL@,>N}Tv|ve*G0X)Z;/)3@A74(4P&A1X:YVH97;,754*A66:1 D739E3553545558E4?-?K17/770843XAYf838A7K%N!YW4.$T19Z`WJ*0XdYJXTYOXNZ 1XaN1A+I&Xi.Xk3Z3GB&5%WhZ1+5#Y[X<4YMXhQYoQXVXbYQ8XSYUX4YXBXWDMG0WxZA[8V+Z8X;D],Va$%YeX?FXfX[XeYf<X:Z[WsYz8X_Y]%XmQ(!7BXIZFX]&YE3F$(1XgYgYE& +[+W!<YMYFXc;+PXCYI9YrWxGXY9DY[!GXiI7::)OC;*$.>N*HA@{C|}&k=:<TB83X`3YL+G4XiK]i}(fYK<=5$.FYE%4*5*H*6XkCYL=*6Xi6!Yi1KXR4YHXbC8Xj,B9ZbWx/XbYON#5B}Ue}+QKXnF1&YV5XmYQ0!*3IXBYb71?1B75XmF;0B976;H/RXU:YZX;BG-NXj;XjI>A#D3B636N;,*%<D:0;YRXY973H5)-4FXOYf0:0;/7759774;7;:/855:543L43<?6=E,.A4:C=L)%4YV!1(YE/4YF+ F3%;S;&JC:%/?YEXJ4GXf/YS-EXEYW,9;E}X$}547EXiK=51-?71C%?57;5>463553Zg90;6447?<>4:9.7538XgN{|!}9K/E&3-:D+YE1)YE/3;37/:05}n<}:UX8Yj4Yt864@JYK..G=.(A Q3%6K>3(P3#AYE$-6H/456*C=.XHY[#S.<780191;057C)=6HXj?955B:K1 E>-B/9,;5.!L?:0>/.@//:;7833YZ56<4:YE=/:7Z_WGC%3I6>XkC*&NA16X=Yz2$X:Y^&J48<99k8}CyB-61<18K946YO4{|N}E)YIB9K0L>4=46<1K0+R;6-=1883:478;4,S+3YJX`GJXh.Yp+Xm6MXcYpX(>7Yo,/:X=Z;Xi0YTYHXjYmXiXj;*;I-8S6N#XgY}.3XfYGO3C/$XjL$*NYX,1 6;YH&<XkK9C#I74.>}Hd`A748X[T450[n75<4439:18A107>|ET}Rf<1;14876/Yb983E<5.YNXd4149>,S=/4E/<306443G/06}0&}UkYSXFYF=44=-5095=88;63844,9E6644{PL}WA8:>)7+>763>>0/B3A545CCnT}Xm|dv}Xq1L/YNXk/H8;;.R63351YY747@15YE4J8;46;.38.>4A369.=-83,;Ye3?:3@YE.4-+N353;/;@(X[YYD>@/05-I*@.:551741Yf5>6A443<3535;.58/86=D4753442$635D1>0359NQ @73:3:>><Xn?;43C14 ?Y|X611YG1&<+,4<*,YLXl<1/AIXjF*N89A4Z576K1XbJ5YF.ZOWN.YGXO/YQ01:4G38Xl1;KI0YFXB=R<7;D/,/4>;$I,YGXm94@O35Yz66695385.>:6A#5}W7n^4336:4157597434433<3|XA}m`>=D>:4A.337370?-6Q96{`E|4A}C`|Qs{Mk|J+~r>|o,wHv>Vw}!c{H!|Gb|*Ca5}J||,U{t+{CN[!M65YXOY_*B,Y[Z9XaX[QYJYLXPYuZ%XcZ8LY[SYPYKZM<LMYG9OYqSQYM~[e{UJXmQYyZM_)>YjN1~[f3{aXFY|Yk:48YdH^NZ0|T){jVFYTZNFY^YTYN~[h{nPYMYn3I]`EYUYsYIZEYJ7Yw)YnXPQYH+Z.ZAZY]^Z1Y`YSZFZyGYHXLYG 8Yd#4~[i|+)YH9D?Y^F~Y7|-eYxZ^WHYdYfZQ~[j|3>~[k|3oYmYqY^XYYO=Z*4[]Z/OYLXhZ1YLZIXgYIHYEYK,<Y`YEXIGZI[3YOYcB4SZ!YHZ*&Y{Xi3~[l|JSY`Zz?Z,~[m|O=Yi>??XnYWXmYS617YVYIHZ(Z4[~L4/=~[n|Yu{P)|];YOHHZ}~[o33|a>~[r|aE]DH~[s|e$Zz~[t|kZFY~XhYXZB[`Y}~[u|{SZ&OYkYQYuZ2Zf8D~[v}% ~[w3},Q[X]+YGYeYPIS~[y}4aZ!YN^!6PZ*~[z}?E~[{3}CnZ=~[}}EdDZz/9A3(3S<,YR8.D=*XgYPYcXN3Z5 4)~[~}JW=$Yu.XX~] }KDX`PXdZ4XfYpTJLY[F5]X~[2Yp}U+DZJ::<446[m@~]#3}]1~]%}^LZwZQ5Z`/OT<Yh^ -~]&}jx[ ~m<z!%2+~ly4VY-~o>}p62yz!%2+Xf2+~ly4VY-zQ`z (=] 2z~o2",C={" ":0,"!":1},c=34,i=2,p,s=[],u=String.fromCharCode,t=u(12539);while(++c<127)C[u(c)]=c^39&&c^92?i++:0;i=0;while(0<=(c=C[a.charAt(i++)]))if(16==c)if((c=C[a.charAt(i++)])<87){if(86==c)c=1879;while(c--)s.push(u(++p))}else s.push(s.join("").substr(8272,360));else if(c<86)s.push(u(p+=c<51?c-16:(c-55)*92+C[a.charAt(i++)]));else if((c=((c-86)*92+C[a.charAt(i++)])*92+C[a.charAt(i++)])<49152)s.push(u(p=c<40960?c:c|57344));else{c&=511;while(c--)s.push(t);p=12539}return s.join("")')();

	JCT8836=JCT11280.substring(0,8836);

}

//============================引用ここまで===================================



})();
