// ==UserScript==
// @name         nicovideo mylistofmylist
// @version      1.2.1
// @author       shimomire
// @namespace    http://www.nicovideo.jp/mylistofmylist
// @description  マイリストのマイリストを登録することができます。
// @include		http://www.nicovideo.jp/my/mylist*
// @include		http://www.nicovideo.jp/mylist/*
// ==/UserScript==

//保存先　 mylistofmylist (webstorage)
//JSON形式で　{マイリスト番号:{userId:ユーザーID,userName:ユーザー名,title:タイトル,infomation:説明文HTML,count:件数,thumbnailId:表示画像},…}で保存する。



(function (d, func) {
   var h = d.getElementsByTagName('head')[0];
   var s = d.createElement("script");
   s.textContent = "(" + func.toString() + ")(jQuery);";
   h.appendChild(s);
})(document, function($) {
	var MYLIST_DIR="http://www.nicovideo.jp/mylist/";
	var MYLIST_IMG_DIR="http://res.nimg.jp/img/watch/my_btn/mylist_1.png";

	//URL編集用クラス。
	var URL=function(url){
		//GET用クラス
		//パラメータリストとしても使用可能
		var GET =function(paramlist){
			var _get=paramlist.split("&");
			for(var i in _get){
				var _p=_get[i].split("=");
				if(_p.length<2)throw new Exception("get invalidate");
				this[_p[0]]=_p[1];
			}

			this.hasParam=function(key){
				return typeof this[key]!="undefinded";
			};
			this.toString=function(){
				var str="";
				var first=true;
				for(var id in this){
					str+=first?id+"="+this[id]:"&"+id+"="+this[id];
					first=false;
				}
				return str;
			};
		};
		if(typeof url!="undefined"){
			var _url=url.split("?");
			var _dir=_url[0].split("/");
			if(_dir.length<2)throw new Exception("url invalidate");

			this.server=_dir[1];
			this.dir=_dir;
			this.get=_url.length==1?new GET(_url[1]):null;
			this.toString=function (){
				return dir.join("/")+"?"+this,get;
			};
		}
		this.protocol=function (){
			return (typeof _dir=="Array"&&typeof _dir[0]!="undefinded")?_dir[0]:null;
		};
	};


	var getUrlVars=function(url)
	{
	    var vars = [], hash;
	    var hashes =url.slice(url.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++) {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	};
	//classを配列で返す関数
	jQuery.fn.extend({
		getClass: function() {
			return this[0].className.split(" ");
		},
		allDeleteClass:function(){
			var classes=this.getClass();
			for(var i=0;i<classes.length;i++){
				jQuery(this).removeClass(classes[i]);
			}
		},setClass:function(array){
			this.allDeleteClass();
			for(var i=0;i<array.length;i++){
				jQuery(this).addClass(array[i]);
			}
		}
	});

	//マイリスト登録処理
	if(location.href.indexOf(MYLIST_DIR)>-1){
		(function (){
				$("#SYS_box_mylist_header table tbody tr").prepend(
					$("<td></td>").append(
						$("<a></a>").attr("href","javascript:void(0)").attr("id","BTN_set_mylist").append(
							$("<img src=\""+MYLIST_IMG_DIR+"\" />").attr("alt","マイリスト")
						).click(function(){
							var mylist_id=location.href.indexOf("?")>-1?
									location.href.substr(MYLIST_DIR.length,location.href.indexOf("?")):
									location.href.substr(MYLIST_DIR.length);
								var list;
								var data=new Object;
								data["userId"]=$("#SYS_box_mylist_header div p:eq(0) a").attr("href").substr($("#SYS_box_mylist_header div p a").attr("href").indexOf("/")+1);
								data["userName"]=$("#SYS_box_mylist_header div p a strong").html();
								data["title"]=$("#SYS_box_mylist_header div h1").html();
								data["information"]=$("#SYS_box_mylist_header div p:eq(1)").html()?$("#SYS_box_mylist_header div p:eq(1)").html():"";
								data["count"]=$("#SYS_box_mylist_body td:eq(0) strong").html().substring(1,$("#SYS_box_mylist_body td:eq(0) strong").html().length-1);
								var thumbnail=getUrlVars($("#SYS_page_items div:eq(0) img").attr("src"));
								data["thumbnailId"]=thumbnail["i"];
								data["createDate"]=(new Date).toString();
								//console.info(data);
								try{
									list=JSON.parse(localStorage.getItem("mylistofmylist"));
								}catch(e){
									list=new Object;
								}
								if(list==null){
									list=new Object;
								}
								var isset=mylist_id.toString() in list;
								list[mylist_id.toString()]=data;
								window.localStorage.setItem("mylistofmylist",JSON.stringify(list));
								if(isset){
									alert("マイリスト情報の更新が完了しました。");
								}else{
									alert("マイリストのマイリストに追加されました。");
								}
							})));
		})();
		//マイリストフォルダの処理
	}else if(location.href.indexOf("http://www.nicovideo.jp/my/mylist")>-1){

		(function (){
			var loaded_wait=function(){
				if($("div#myNavMylist div.navInner").html()!=null){
					return loaded_after();
				}
				setTimeout(loaded_wait,1000);
			};
			var loaded_after=function(){

			    //フォルダセット
				var append="<li id=\"myNavMylistOfMylist\" class=\"folder0-locked\">" +
						"<a href =\"http://www.nicovideo.jp/my/mylist/#/MylistOfMylist\"><small>└</small><span>マイリストのマイリスト</span></a>" +
						"</li>";
				$("#myNavMylistTemp").after(append);
				var clicked=function(){
					var reflesh_ContBody=function(){
						var list=JSON.parse(window.localStorage.getItem("mylistofmylist"));
						var getLength=function(){
							var len=0;
							for(var id in list){
								len++;
							}
							return len;
						};
						var content="<div class=\"articleBody\">"+
							"<div class=\"outer listOption\">"+
								"<div class=\"spBox\">"+
									"<p class=\"itemTotalNum\">全"+getLength()+"件</p>"+
									"<form class=\"organizeForm\" action=\"\" id=\"SYS_box_check_editor\">" +
										"<p class=\"itemAction\"><span>チェックした項目を</span>" +
										"<input id=\"SYS_btn_remove_mylist\" class=\"delete\" type=\"button\" value=\"削除\"></p>"+
									"</form>" +
								"</div>"+
							"</div>" +
							"<ul class=\"myContList videoList\" id=\"SYS_page_items\"></ul>"+
						"</div>";
						$("#myContBody").html(content);
						if(list==new Object){
							$("#SYS_page_items").append("このマイリストには登録されてません");
						}
						for(var mylistId in list){
							var data=list[mylistId];
							if(data["information"]==""){
								data["information"]="</>";
							}
							$("#SYS_page_items").append(
								$("<li />").addClass("SYS_box_item M_O_M-"+mylistId).attr("data-id",mylistId)
								.append($("<div></div>").addClass("checkBoxOuter")
											.append($("<input type=\"checkbox\" />")
													.attr("name","checkbox")
													.addClass("editCheckbox")))
								.append($("<div></div>").addClass("thumbContainer")
									.append($("<a />").attr("href",MYLIST_DIR+mylistId).addClass("mypageThumb")
											.append($("<img src=\"http://tn-skr4.smilevideo.jp/smile?i="+data["thumbnailId"]+"\" />").addClass("lazyimage"))
											.append($("<span />").addClass("videoTime").html("全"+data["count"]+"件"))
									))
								.append($("<div />").addClass("mylistVideo")
									.append($("<h5><a href="+MYLIST_DIR+mylistId+">"+data["title"]+"</a></h5>"))
									.append(
											$("<p />").attr("contenteditable","true").addClass("group_description").html(
													data["information"]
												))
									.append($("<p class=\"mylistTime\">"+data["createDate"]+"登録"+"</p>"))
									.append($("<p class=\"posRight\">")
											.append($("<a href=\"http://www.nicovideo.jp/playlist/mylist/"+mylistId+"?sort=1\" class=\"arrow\">")
													.append($("<span></span>"))
													.append("ここから連続再生")))
									.append($("<dl class=\"pullout\" data-nico-hided=\"true\"></dl>")
										.append($("<dt></dt>")
											.append($("<a class=\"SYS_btn_edit_list\" href=\"javascript:void(0);\"></a>")
												.append($("<span></span>"))
												.append("編集")))
										.append($("<dd></dd>")
											.append($("<ul><a href=\"javascript:void(0)\" class=\"editBtnDel SYS_btn_remove_item\">削除</a></ul>")))
									)
								)
							);
						}
						$(".SYS_btn_edit_list").click(function(){
							var dd=$(this).closest("dl").children("dd");
							dd.css("display",dd.css("display")=="none"?"block":"none");
						});
						$("p.group_description").keydown(function(){
							try{
								list=JSON.parse(localStorage.getItem("mylistofmylist"));
							}catch(e){
								return false;
							}
							if(list==null){
								return false;
							}
							var mylist_id=$(this).closest("li").attr("data-id");
							if(!mylist_id in list)return false;
							list[mylist_id]["information"]=$(this).html();
							window.localStorage.setItem("mylistofmylist",JSON.stringify(list));
							
						});

						$(".group_description").css({
							"background":" none repeat scroll 0 0 #E9EFEF",
							"border":"2px solid #999F9F",
					    	"font-size":"12px",
					    	"line-height":"1.25",
					    	"margin":"4px 0 0",
					    	"padding":"6px"
						});
						$(".SYS_btn_remove_item").click(function(){
							var li=$(this).closest("li.SYS_box_item");
							var mylistid=$(li).getClass()[1];
							mylistid=mylistid.substr(mylistid.indexOf("-")+1);
							if(window.confirm('マイリストのマイリストを削除しますよろしいですか？')){
								var list=JSON.parse(window.localStorage.getItem("mylistofmylist"));
								delete list[mylistid];
								window.localStorage.setItem("mylistofmylist",JSON.stringify(list));
								alert("削除が完了しました。");
								//画面を更新
								reflesh_ContBody();
							}
						});
						$("#SYS_btn_remove_mylist").click(function(){
							if(window.confirm('マイリストのマイリストを一括削除しますよろしいですか？')){
								var list=JSON.parse(window.localStorage.getItem("mylistofmylist"));
								$(".SYS_box_item").each(function(){
									if($(this).children("input:eq(0)").attr("checked")){
										var mylistid=$(this).getClass()[1];
										mylistid=mylistid.substr(mylistid.indexOf("-")+1);
										delete list[mylistid];
									}
								});
								window.localStorage.setItem("mylistofmylist",JSON.stringify(list));
								alert("削除が完了しました。");
								//画面を更新
								reflesh_ContBody();
							}
						});
					};
					//アクティブを削除
					$("#myNavMylist ul.child li").each(function(){
						if($(this).hasClass("active")){
							$(this).removeClass("active");
							var classes=$(this).getClass();
							classes[0]=classes[0].substring(0,classes[0].indexOf("-"));
							$(this).setClass(classes);
						}
					});
					//アクティブ変更
					var classes=$("#myNavMylistOfMylist").getClass();
					classes[0]=classes[0]+"-active";
					classes[1]="active";
					$("#myNavMylistOfMylist").setClass(classes);
					$("#myContHead").html("<h3>マイリストのマイリスト</h3>");
					reflesh_ContBody();
				};
				$("#myNavMylistOfMylist").click(clicked);
				//リロード,バック
				if(location.href.indexOf("http://www.nicovideo.jp/my/mylist/#/MylistOfMylist")>-1){
					clicked();
				}
			};
			loaded_wait();
		})();
	}else{
		console.log("error");
	}
});