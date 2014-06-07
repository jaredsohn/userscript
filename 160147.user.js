// ==UserScript==
// @name       ErogameScape Remove Uid
// @namespace  http://blueblueblue.fool.jp/wp/
// @version    3.1
// @description  エロゲー批評空間のレビューをユーザー条件で非表示
// @include	http://erogamescape*/~ap2/ero/toukei_kaiseki/*
// @copyright  2013-2014, ebi
// ==/UserScript==

    /* << exit url */
    if(location.href.indexOf("loginExe", 0) !== -1) { return };
    if(location.href.indexOf("keijiban", 0) !== -1) { return };
    if(location.href.indexOf("example", 0) !== -1) { return };
    if(location.href.indexOf("memo.php", 0) !== -1) { return };
    if(location.href.indexOf("usersql_exec", 0) !== -1) { return };
    if(location.href.indexOf("usersql", 0) !== -1) { return };
    if(location.href.indexOf("sql_for_erogamer_index", 0) !== -1) { return };
    if(location.href.indexOf("sql_for_erogamer_form", 0) !== -1) { return };
    if(location.href.indexOf("select.php", 0) !== -1) { return };
    if(location.href.indexOf("loginExe", 0) !== -1) { return };
    if(location.href.indexOf("keijiban", 0) !== -1) { return };
    if(location.href.indexOf("example", 0) !== -1) { return };
    if(location.href.indexOf("memo.php", 0) !== -1) { return };
    if(location.href.indexOf("select.php", 0) !== -1) { return };
	/*if(location.href.indexOf("contents", 0) !== -1) { return };*/
    /* exit url >> */

function main() {
    /* << favorite and dislike */
	if(location.href.indexOf("contents_fav_user.php", 0) !== -1 || location.href.indexOf("contents_dis_user.php", 0) !== -1) {
		var uid = "";
		if(location.href.indexOf("contents_fav_user.php", 0) !== -1){
			var lst_uid = "favorite_user_stylesheet<hr>.favorite_user";
		} else {
			var lst_uid = "dislike_user_stylesheet<hr>.dislike_user";
		}
        
		$("tr a[href*='user_infomation.php']").each(function(){
				uid = $(this).attr("href").split("user_infomation.php")[1].split("user=")[1].split(/=|&|#/g)[0];
				uid = uid.replace(/\./g, "-_-");
				uid = uid.replace(/\+/g, "_-_");
				uid = uid.replace(/%/g, "--");
				lst_uid += ", .uid_" + uid;
		});
        
		if(location.href.indexOf("contents_fav_user.php", 0) !== -1){
			lst_uid += "{display:block !important; opacity: 1 !important;}";
		} else {
			lst_uid += "{display:none !important;}";
		}
        $div = $("<div/>");
		$div.html(lst_uid);
		$div.css({"color" : "#fff"
	  			 , "font-family" : "Arial"
	  			 , "font-size" : "9px"
	  			 , "text-align" : "center"
	  			 , "background" : "rgba(0,0,0,0.8)"
	  			 , "margin" : "0"
	  			 , "padding" : "2px 0px"
				 , "width" : "300px"
				 , "position" : "fixed"
				 , "top" : "0"
				 , "right" : "5px"
	  			 , "cursor" : "pointer"
	  			 , "border-bottom-left-radius" : "5px"
	  			 , "border-bottom-right-radius" : "5px"
	  			 , "-webkit-border-bottom-left-radius" : "5px"
	  			 , "-webkit-border-bottom-right-radius" : "5px"
	  			 , "-moz-border-bottom-left-radius" : "5px"
	  			 , "-moz-border-bottom-right-radius" : "5px"
		});
		$("body").append($div);
		return;
	};
    /* favorite and dislike >> */

    /* cookie */
	function read_cookie(name, value){
		if (document.cookie) {
			var cookies = document.cookie.split("; ");
			for (var i = 0; i < cookies.length; i++) {
				var str = cookies[i].split("=");
				if (str[0] == name) {
					value = cookie_value = unescape(str[1]);
					break;
				}
			}
		}
		return value;
	}
	
    /* << config */
    var uid = "";
    var comment = "";
    var comment_arr = new Array();
	var body_height = 0;
	var count = read_cookie("removeUid_count", 0);
	var interval = read_cookie("removeUid_interval", 0);
	var type = read_cookie("removeUid_type", "opacity");
        /*
	var checked = "";
	if ( type == "opacity" ) {
		checked = "checked";
	}
        */
	var short_length = read_cookie("removeUid_short_length", "0");
	var long_length = read_cookie("removeUid_long_length", "0");
	var dt = new Date ();
	var ver = dt.getFullYear() + ("0"+(dt.getMonth ()+1)).slice (-2) + ("0"+dt.getDate ()).slice (-2);
    /* config >> */
    
    /* << DOM create */
	$css = $("<link/>");
	$css.attr("id", "removeUid_css");
	$css.attr("rel", "stylesheet");
	$css.attr("type", "text/css");
	$css.attr("href", "http://blueblueblue.fool.jp/php/es_uid_css.php?count=" + count + "&interval=" + interval + "&type=" + type + "&ver=" + ver);
	$("body").append($css);
	
	$div = $("<div/>");
	$div.css({ "color" : "#fff"
			 , "font-family" : "Arial"
			 , "font-size" : "9px"
			 , "text-align" : "center"
			 , "background" : "rgba(0,0,0,0.8)"
			 , "margin" : "0"
			 , "padding" : "2px 0px"
			 , "width" : "230px"
			 , "position" : "fixed"
			 , "top" : "0"
			 , "left" : "5px"
			 , "cursor" : "pointer"
			 , "border-bottom-left-radius" : "5px"
			 , "border-bottom-right-radius" : "5px"
			 , "-webkit-border-bottom-left-radius" : "5px"
			 , "-webkit-border-bottom-right-radius" : "5px"
			 , "-moz-border-bottom-left-radius" : "5px"
			 , "-moz-border-bottom-right-radius" : "5px"
			 , "z-index" : "98"
			});
	$div.attr("id", "removeUid");
	$div.html("remove cnt." + count + " int." + interval + " short." + short_length + " long." + long_length);
	$("body").append($div);
    
	$div = $("<div/>");
	$div.css({ "background" : "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAI0lEQVQIW2NkwARpjGhiaUD+LGRBsABIEUwQLgATRBEACQIAw+IEbPD2jzoAAAAASUVORK5CYII=) repeat"
			 , "margin" : "0"
			 , "padding" : "0px"
			 , "width" : "5000px"
			 , "height" : "5000px"
			 , "position" : "fixed"
			 , "top" : "0"
			 , "left" : "0"
			 , "cursor" : "pointer"
			 , "z-index" : "99"
			 , "display" : "none"
			});
	$div.attr("id", "black-out");
	$("body").append($div);

	$div = $("<div/>");
	$div.css({ "color" : "#fff"
			 , "font-family" : "Arial"
			 , "font-size" : "12px"
			 , "text-align" : "left"
			 , "background" : "rgba(0,0,0,0.8)"
			 , "margin" : "0"
			 , "padding" : "2px 10px"
			 , "width" : "210px"
			 , "position" : "fixed"
			 , "top" : "30px"
			 , "left" : "5px"
			 , "display" : "none"
			 , "border-radius" : "5px"
			 , "border-radius" : "5px"
			 , "-webkit-border-radius" : "5px"
			 , "-webkit-border-radius" : "5px"
			 , "-moz-border-radius" : "5px"
			 , "-moz-border-radius" : "5px"
			 , "z-index" : "100"
			});
	$div.attr("id", "removeUid_config");
	$div.html("reviewUid Config<hr />"
			+ "*感想投稿数<br /><input style=\"margin-left:15px;width:50px;\" id=\"removeUid_count\" value=\"" + count + "\" />(min5)<br />"
			+ "*投稿期間（日数）<br /><input style=\"margin-left:15px;width:50px;\" id=\"removeUid_interval\" value=\"" + interval + "\" />(min30)<br />"
			+ "*非表示方法<br />"
			+ "<input id=\"opacity\" type=\"radio\" name=\"removeUid_type\" value=\"0\"><label>透過</label>"
			+ "<input id=\"hidden\" type=\"radio\" name=\"removeUid_type\" value=\"1\"><label>非表示</label>"
			+ "<input id=\"opacity_rev\" type=\"radio\" name=\"removeUid_type\" value=\"2\"><label>透過反転</label>"
			+ "<br />"
			+ "*長文感想文字数下限<br /><input style=\"margin-left:15px;width:50px;\" id=\"removeUid_short_length\" value=\"" + short_length + "\" /><br />"
			+ "*長文感想文字数上限<br /><input style=\"margin-left:15px;width:50px;\" id=\"removeUid_long_length\" value=\"" + long_length + "\" />"
			 );
/*
	$div.html("reviewUid Config<hr />"
			+ "*review_count<br /><input style=\"margin-left:15px;width:50px;\" id=\"removeUid_count\" value=\"" + count + "\" />(min5)<br />"
			+ "*review_interval<br /><input style=\"margin-left:15px;width:50px;\" id=\"removeUid_interval\" value=\"" + interval + "\" />(min30)<br />"
			+ "*review_hide_type<br /><label><input type=\"checkbox\" style=\"margin-left:15px;\" id=\"removeUid_type\" " + checked + "/>opacity</label><br />"
			+ "*short_review_length<br /><input style=\"margin-left:15px;width:50px;\" id=\"removeUid_short_length\" value=\"" + short_length + "\" /><br />"
			+ "*long_review_length<br /><input style=\"margin-left:15px;width:50px;\" id=\"removeUid_long_length\" value=\"" + long_length + "\" />"
			 );
*/
	$("body").append($div);
	$("#" + type).val(['1']);
    /* DOM create >> */
    
    /* << event */
    /* display event */
	$(window).on("load scroll", function(){
		if ( body_height !== $("body").height() ) {
			var selector_str = "div[class*='game_'], div[class*='uid_'], div.coment > div";
			$(selector_str).each( function() {
                if ( !$(this).hasClass("us-remove-uid") ) {
                    $(this).addClass( "us-remove-uid" );
    				uid = $(this).html().split("user_game.php")[1].split("user=")[1].split(/=|&|#/g)[0];
    				uid = uid.replace(/\./g, "-_-");
    				uid = uid.replace(/\+/g, "_-_");
    				uid = uid.replace(/%/g, "--");
    				$(this).addClass( "uid_" + uid );
    				$(this).addClass( "game_" + $(this).html().split("user_game.php")[1].split("game=")[1].split(/=|&|#/g)[0] );
    				comment = $(".comment1, .comment2, .odd, .even", $(this)).html().replace(/<span.*?\/span>|\n/gi, "");
    				comment_arr = comment.split(/<br>|<a\shref="memo\.php|<div/);
    				if ( comment.indexOf("memo.php", 0) == -1 ) {
    					data_short = comment_arr[1].length;
                        $(this).attr("data-short-comment", data_short);
    				} else {
    					data_short = comment_arr[1].length - 3;
    					data_long = comment_arr[2].split(/\(|\)/)[1];
                        $(this).attr("data-short-comment", data_short);
                        $(this).attr("data-long-comment", data_long);
    				}
                } // if hasClass
                $(this).removeClass("hidden_short_comment_length");
                $(this).removeClass("hidden_long_comment_length");
				if ( short_length !== 0 || long_length !== 0 ) {
	                if ( $(this).attr("data-short-comment") * 1 < short_length * 1 ) {
	                    $(this).addClass("hidden_short_comment_length");
	                }
	                if ( $(this).attr("data-long-comment") * 1 < long_length * 1 ) {
	                    $(this).addClass("hidden_long_comment_length");
	                }
				}
			})
			var body_height = $("body").height();
		}
    });

    /* setting event */
	$(document).on("click", "#removeUid", function(){
        $("#black-out").show();
        $("#removeUid_config").slideToggle("100");
	})
	$(document).on("click", "#black-out", function(){
        $("#black-out").hide();
		$("#removeUid_config").slideToggle("100", function(){
			count = $("#removeUid_count").val();
			if ( count > 0 && count < 5) {
				count = 5;
				$("#removeUid_config").val(5);
			}
			interval = $("#removeUid_interval").val();
			if ( interval > 0 && interval < 30) {
				interval = 30;
				$("#removeUid_interval").val(30);
			}
			document.cookie = "removeUid_count=" + escape(count) + "; expires=Thu, 1-Jan-2030 00:00:00 GMT;"
			document.cookie = "removeUid_interval=" + escape(interval) + "; expires=Thu, 1-Jan-2030 00:00:00 GMT;"
			type = $('input[name="removeUid_type"]:checked').attr("id");
			document.cookie = "removeUid_type=" + type + "; expires=Thu, 1-Jan-2030 00:00:00 GMT;";
            short_length = $("#removeUid_short_length").val();
			document.cookie = "removeUid_short_length=" + escape(short_length) + "; expires=Thu, 1-Jan-2030 00:00:00 GMT;"
            long_length =  $("#removeUid_long_length").val();
			document.cookie = "removeUid_long_length="  + escape(long_length)  + "; expires=Thu, 1-Jan-2030 00:00:00 GMT;"
			$("#removeUid").html("remove cnt." + count + " int." + interval + " short." + short_length + " long." + long_length);
			$("#removeUid_css").attr("href", "http://blueblueblue.fool.jp/php/es_uid_css.php?count=" + count + "&interval=" + interval + "&type=" + type + "&ver=" + ver);
            //check_remove_uid();
		});
	})
    /* event >> */
} //function main()

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}
addJQuery(main);