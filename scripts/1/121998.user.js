// ==UserScript==
// @name         oogiriphp my toko
// @version       1.2
// @author       shimomire
// @namespace    oogiri.symphonic-net.com.shimomire.select.my_toko
// @description  自分の回答を投稿画面に表示。自分の回答だと思われるものを投票不可に。
// @include      http://oogiri.symphonic-net.com/one/select.php*
// @include      http://oogiri.symphonic-net.com/two/select.php*
// @include      http://oogiri.symphonic-net.com/select.php*
// @include      http://oogiri.symphonic-net.com/special/select.php*
// @exclude
// ==/UserScript==

//:TODO エラーcheckの追加

//status false データ未確定
//status true データ確定
//データ違反の時 投稿エラー⇒投稿,投稿No削除 投票エラー⇒投票No削除

(function (d, func) {
	 var h = d.getElementsByTagName('head')[0];
	 var s1 = d.createElement("script");
	 s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
	 s1.addEventListener('load', function() {
	 var s2 = d.createElement("script");
	 s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
	 h.appendChild(s2);
	 }, false);
	 h.appendChild(s1);
})(document, function($) {


	var DBNAME="oogiri.symphonic-net.com.shimomire.select.my_toko";
	var lStorage=function(dbname){
		var data={
			database:null,
			init:function(){
				try {
					this.database = JSON.parse(localStorage.getItem(dbname));
				} catch (e) {
					this.database = {};
				}
				if (this.database == null) {
					this.database = {};
				}
			},
			reflesh:function() {
				localStorage.removeItem(dbname);
				try {
					localStorage.setItem(dbname, JSON.stringify(this.database));
				}catch(e){
					console.log("Error inside setItem");
				}
			}
		};
		data.init();
		return data;
	};

	if(typeof String.prototype.trim =="undefined"){
		String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
		};
	}
	/**
	 * my_toko_view
	 */
	var run=function(){
		/**
		 * config
		 */
		var my_toko_color="inherit";//自分の回答の色をcssで指定。ex Cyan,#333333,inherit,""
		var caution_color="Yellow";//警告文字色
		var checkboxdisabled=true;//自分と全く同じ文字列の回答を全て投票不可にします。
		var alert=true;//グーグルクロムの場合にアラートを表示する。
		var tohyohelptime=60;//残りtohyohelptime秒で投票が完了していない場合に通知します。
		alert &=typeof window.webkitNotifications != 'undefined';
		//パーミッションチェック
		if(alert){
	        setTimeout(function(){
	        	var permission = webkitNotifications.checkPermission();
		        if(permission==1){
		        	$("div#header dl.box05 dt").append(
						$("<p>デスクトップ通知を許可</p>")
						.css({
							color:"yellow",
							cursor:"auto",
							"text-decoration":"underline",
							"font-size":"small"
						})
						.click(function(){
						webkitNotifications.requestPermission(function(){
						});
					}));
		        }
	        },0);
		}
		/**
		 * config end
		 */
		var storage=lStorage(DBNAME);
		var isSelectPage=$("h3").size()==0 || $("center > h3").size()>0;
		var nowNo=$("h1:eq(0)").html().slice(3);

		var isToko=function(){
			return nowNo==storage.database["no_kaito"];
		};
		var isTohyo=function(){
			return nowNo==storage.database["no_tohyo"];
		};
		var DomInit=function(){
			if(isSelectPage){
				if($("TITLE:eq(0)").html().indexOf("投稿")>-1){
					$("fieldset p:eq(2)")
						.append("<div id=\"nowkaito\">" +
							"<span>回答状況:</span>" +
							"<p id=\"kaito-status\" style=\"display:inline\"></p></div>");
					if(isToko()){
						$("p#kaito-status").html(storage.database["kaito"]);
					}else{
						$("p#kaito-status").css("color",caution_color).html("未投稿");
					}
					$("input[type=submit][value=投稿]").click(kaito_set);

					//alert 投稿画面　初回表示時
					if(alert && storage.database["no_now"] && storage.database["no_now"]!=nowNo){
						setTimeout(
						function(){
					        if(typeof window.webkitNotifications == 'undefined'){return;}

					        var permission = webkitNotifications.checkPermission();
					        switch(permission){
					            case 0:// 許可されているとき
					                var notification = webkitNotifications.createNotification(
					                    'http://oogiri.symphonic-net.com/oogiri.ico',
					                    $("h1:eq(0)").html(),//回数
					                    $("form[name=rt] fieldset p:eq(1)").html()//お題を通知
					                );
					                notification.show();
					                setTimeout(function(){
						                notification.cancel();
					                },10000);
					                break;
					            case 1:case 2:// 非許可,拒否
					                break;
					        }
						},0);
					}
				}else if($("TITLE:eq(0)").html().indexOf("投票")>-1){
					$("input[type=submit][value=投票]")
						.after("<div id=\"nowtohyo\">" +
								"<span>投票状況:</span>" +
						"<p id=\"tohyo-status\" style=\"display:inline\"></p></div>");
					if(isTohyo()){
						$("p#tohyo-status").html("投票済み");
					}else{
						$("p#tohyo-status").css("color",caution_color).html("未投票");
					}
					$("input[type=submit][value=投票]").click(tohyo_set);
                    if(isToko()){
						for(var i=0;i<$("td[id^=sp]").size();i++){
							var j=$($("td[id^=sp]")[i]);
							var k=storage.database["kaito"];
							if(encodeURI(j.html()).replace(/%E2%80%8B/g,"")==encodeURI(k).replace(/%E2%80%8B/g,"")){
								$tr=j.closest("tr");console.info("b");
								$tr.find("td").eq(0).css("background-color",my_toko_color);
								if(checkboxdisabled){
									$tr.find("td").slice(1,4).remove();
									$tr.find("td").eq(0).after("<td>自分の回答</td>");
									$tr.find("td").eq(1).attr("colspan","3");
								}
							}
						}
                        //残り時間取得
                        var ttext=$("#tokei").text();
                        var resttime=0;
                        var d=ttext.match(/残り(\d+)分(\d+)秒/);
                        if(d.length>=3){
                            resttime=Number(d[1])*60+Number(d[2]);
                        }else{
                        	d=ttext.match(/残り(\d+)秒/);
                            resttime=Number(d[1]);
                        }
                       
                        setTimeout(
                            function(){
                                if(isTohyo())return;
                                if(typeof window.webkitNotifications == 'undefined'){return;}
                                var permission = webkitNotifications.checkPermission();
                                switch(permission){
                                    case 0:// 許可されているとき
                                        var notification = webkitNotifications.createNotification(
                                            'http://oogiri.symphonic-net.com/oogiri.ico',
                                            $("h1:eq(0)").html(),//回数
                                            "残り1分を切ってます。投票しましょう！"
                                        );
                                        notification.show();
                                       // setTimeout(function(){
                                       //     notification.cancel();
                                       // },10000);
                                        break;
                                    case 1:case 2:// 非許可,拒否
                                        break;
                                }
						},Math.max(0,(resttime-tohyohelptime)*1000));
                    }
				}
				storage.database["no_now"]=nowNo;
				storage.reflesh();
			}
		};
		/**
		 * 投稿したことをチェックするためにクッキーを登録します。
		 * 単純化のため投稿ミス時でもクッキーに登録されます。
		 * 投稿時のみ投票"モードの場合には投稿されます。
		 */
		function kaito_set(){
			storage.database["no_kaito"]=nowNo;
			storage.reflesh();
			storage.database["kaito"]=$("input[name=boke]").val();
			storage.reflesh();
		}
		/**
		 * 投票したことをチェックするためにクッキーを登録します。
		 * 自分で投票した場合には自動投票をしません。
		 */
		function tohyo_set(){
			storage.database["no_tohyo"]=nowNo;
			storage.reflesh();
		}
		DomInit();
	};
	$(document).ready(function() {
		run();
	});
});