// ==UserScript==
// @name	   ErogameScape POV input
// @namespace  http://blueblueblue.fool.jp/wp/archives/2737
// @description  エロスケのPOV入力サポート
// @copyright  2011-2014, ebi
// @version	4.3
// updateURL       http://userscripts.org/scripts/source/113900.meta.js
// @updateURL      http://userscripts.org/scripts/source/113900.meta.js
// @downloadURL    http://userscripts.org/scripts/source/113900.user.js
// @include	http://erogamescape*/~ap2/ero/toukei_kaiseki/contents_game.php?game_id=*
// @include	http://erogamescape*/~ap2/ero/toukei_kaiseki/contents_before_game.php?game_id=*
// @include	http://erogamescape*/~ap2/ero/toukei_kaiseki/povlist.php?pov_id=*
// @include	http://erogamescape*/~ap2/ero/toukei_kaiseki/taglist.php?tag=*
// ==/UserScript==

function main() {
	var checkQuery = false;
	var my_group = false; //my_group = true;  でユーザー分類を強制使用
	var tag_mode = true; //tag_mode = false;  でタグを使用しない
	
	if ( location.href.indexOf("povlist.php", 0) !== -1 || location.href.indexOf("taglist.php", 0) !== -1 ) {
		if ( parent.document.location.href.indexOf("new_contents.php", 0) !== -1) {
			$("#left_menu").hide();
			$("#main > *").css({"margin-left" : "5px", "margin-right" : "5px"});
		}
		return;
	}
	
	if (document.cookie) {
		var cookies = document.cookie.split("; ");
		for (var i = 0; i < cookies.length; i++) {
			var str = cookies[i].split("=");
			if (str[0] == "user_id") {
				var uid = decodeURIComponent(str[1]);
				break;
			}
		}
	}
	
	var param = location.search;
	var parray = param.replace('?','').split('&');
	for(i=0;i<parray.length; i++){
		n = parray[i].split('=');
		if(n[0] == "game_id"){
			var game_id = n[1];
		}
	}

	var hatsubaimae;
	if ( location.href.indexOf("contents_before_game.php", 0) !== -1 ) {
		hatsubaimae = true;
		$("#pov_buttun").click();
	}

var img_loader = 'data:image/gif;base64,'+
	  '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'+
	  'Cwg1RAAAOwAAAAAAAAAAAA==';	

	var msg=
		"<style type=\"text/css\">" +
		"   div#us-pov-input-wrapper {" +
		"	 font-size:13px !important;" +
		"	 width:300px;" +
		"	 position:fixed;" +
		"	 right:5px;" +
		"	 top:5px;" +
		"	 background:none;" +
		"	 border:none;" +
		"	 margin:0px;" +
		"	 padding:0px;" +
		"	 text-align:left;" +
		"	 font-family: \"ヒラギノ角ゴ Pro W3\", \"メイリオ\", \"ＭＳ Ｐゴシック\",sans-serif;" +
		"   }" +
		"   div.us-pov-input {" +
		"	 display:inline-block;" +
		"	 background: #eeeeee;" +
		"	 border:2px solid #7c7c7c;" +
		"	 margin:0px;" +
		"	 padding:0px 3px 6px 3px;" +
		"	 border-bottom-left-radius: 6px;" +
		"	 border-bottom-right-radius: 6px;" +
		"	 -webkit-border-bottom-left-radius: 6px;" +
		"	 -webkit-border-bottom-right-radius: 6px;" +
		"	 -moz-border-radius-bottomleft: 6px;" +
		"	 -moz-border-radius-bottomright: 6px;" +
		"   }" +
		"   h2.us-pov-input {" +
		"	 text-align: left;" +
		"	 height: 17px;" +
		"	 font-size:90%;" +
		"	 display:block;" +
		"	 color:#fcfcfc;" +
		"	 background:#4f4f4f;" +
		"	 border:2px solid #7c7c7c;" +
		"	 margin:0px;" +
		"	 padding:2px 4px;" +
		"	 border-top-left-radius: 6px;" +
		"	 border-top-right-radius: 6px;" +
		"	 -webkit-border-top-left-radius: 6px;" +
		"	 -webkit-border-top-right-radius: 6px;" +
		"	 -moz-border-radius-topleft: 6px;" +
		"	 -moz-border-radius-topright: 6px;" +
		"   }" +
		"   h2.us-pov-input span.us-left {" +
		"	 float:left;" +
		"   }" +
		"   h2.us-pov-input span.us-right {" +
		"	 font-size: 85%;" +
		"	 background:#4f4f4f;" +
		"	 float:right;" +
		"	 margin: 0px 3px 0px 0px;" +
		"	 padding:1px 2px;" +
		"	 cursor: pointer;" +
		"	 border:1px solid #7c7c7c;" +
		"   }" +
		"   h3.us-pov-input {" +
		"	 width:130px;" +
		"	 font-size:85%;" +
		"	 display:block;" +
		"	 float:left;" +
		"	 color:#4f4f4f;" +
		"	 background:#fafafa;" +
		"	 border:2px solid #7c7c7c;" +
		"	 margin:0px 2px;" +
		"	 padding:2px 3px;" +
		"	 border-radius: 6px;" +
		"	 -webkit-border-radius: 6px;" +
		"	 -moz-border-radius: 6px;" +
		"	 cursor: pointer;" +
		"   }" +
		"   h3.us-selected {" +
		"	 color:#fafafa !important;" +
		"	 background:#4f4f4f !important;" +
		"   }" +
		"   ul.us-pov-input {" +
		"	 width:98%;" +
		"	 font-size:85%;" +
		"	 display:none;" +
		"	 margin:0px 0px 1em 0px;" +
		"	 padding:2px;" +
		"	 line-height:1.45em;" +
		"	 border-bottom:1px dotted #7c7c7c;" +
		"	 float:right;" +
		"	 overflow:visible !important;" +
		"   }" +
		"   li.us-pov-input, div.us-pov-input-cnt {" +
		"	 display:inline-block;" +
		"	 list-style-type:none;" +
		"	 color:#ffffff;" +
		"	 background:#999999;" +
		"	 margin:1px 5px 0px 0px;" +
		"	 padding:1px 4px;" +
		"	 white-space: nowrap;" +
		"	 border-radius: 4px;" +
		"	 -webkit-border-radius: 4px;" +
		"	 -moz-border-radius: 4px;" +
		"	 cursor: pointer;" +
		"   }" +
		"   td.us-pov-input-selected {" +
		"	 background:#ccfcfc !important;" +
		"   }" +
		"   li.rank0  {background:#999999;}" +
		"   li.rank1  {background:#9999fc;}" +
		"   li.rank2  {background:#9999fc;}" +
		"   li.rank3  {background:#9999fc;}" +
		"   li.rank4  {background:#df9999;}" +
		"   li.rank5  {background:#df9999;}" +
		"   li.rank6  {background:#df9999;}" +
		"   li.rank7  {background:#df9999;}" +
		"   li.rank8  {background:#df9999;}" +
		"   li.rank9  {background:#df9999;}" +
		"   li.rank10 {background:#df9999;}" +
		"   li.rank11 {background:#4fcc4f;}" +
		"   h2.us-pov-input span.us-right:hover, h3.us-pov-input:hover, li.us-pov-input:hover {" +
		"	 color:#4f4f4f !important;" +
		"	 background:#fcfccc !important;" +
		"   }" +
		"   div#us-pov-input-description {" +
		"	 position:fixed;" +
		"	 font-size:0.9em !important;" +
		"	 right:310px;" +
		"	 top:5px;" +
		"	 display:none;" +
		"	 opacity:0;" +
		"	 text-align:center;" +
		"	 background:none;" +
		"	 border:none;" +
		"	 margin:0px;" +
		"	 padding:0px;" +
		"   }" +
		"   div#us-pov-input-description iframe {" +
		"	 overflow:scroll-y;" +
		"   }" +
		"   .us-checked-A {" +
		"	 border-left: solid 7px #fc4444;" +
		"   }" +
		"   .us-checked-B {" +
		"	 border-left: solid 7px #44fc44;" +
		"   }" +
		"   .us-checked-C {" +
		"	 border-left: solid 7px #4444fc;" +
		"   }" +
		"</style>";
	$("body").append(msg);

	var myQuery=
	"	   chr(60)||'!--start--'||chr(62)" +
	"	|| chr(60)||'div'" +
	"	|| ' id='||chr(34)||'us-pov-input-wrapper'||chr(34)" +
	"	|| chr(62)" +
	"	|| chr(60)||'h2'" +
	"	|| ' class='||chr(34)||'us-pov-input'||chr(34)" +
	"	|| chr(62)" +
	"	|| chr(60)||'span'" +
	"	|| ' class='||chr(34)||'us-left'||chr(34)" +
	"	|| chr(62)" +
	"	|| 'POV入力サポート'" +
	"	|| chr(60)||'/span'||chr(62)" +
	"	|| chr(60)||'span'" +
	"	|| ' class='||chr(34)||'us-toggle-sub us-right'||chr(34)" +
	"	|| chr(62)" +
	"	|| '↑↓'" +
	"	|| chr(60)||'/span'||chr(62)" +
	"	|| chr(60)||'span'" +
	"	|| ' class='||chr(34)||'us-close us-right'||chr(34)" +
	"	|| chr(62)" +
	"	|| '　×　'" +
	"	|| chr(60)||'/span'||chr(62)" +
	"	|| chr(60)||'span'" +
	"	|| ' class='||chr(34)||'us-arrow-right us-right'||chr(34)" +
	"	|| chr(62)" +
	"	|| '→'" +
	"	|| chr(60)||'/span'||chr(62)" +
	"	|| chr(60)||'span'" +
	"	|| ' class='||chr(34)||'us-arrow-left us-right'||chr(34)" +
	"	|| chr(62)" +
	"	|| '←'" +
	"	|| chr(60)||'/span'||chr(62)" +
	"	|| chr(60)||'span'" +
	"	|| ' id='||chr(34)||'us-pov-input-mode'||chr(34)" +
	"	|| ' class='||chr(34)||'us-right us-pov-input-description-open'||chr(34)" +
	"	|| chr(62)" +
	"	|| '　入力　'" +
	"	|| chr(60)||'/span'||chr(62)" +
	"	|| chr(60)||'/h2'||chr(62)" +
	"	|| chr(60)||'div'" +
	"	|| ' class='||chr(34)||'us-pov-input'||chr(34)" +
	"	|| chr(62)";
	  
	if (tag_mode ) {
	myQuery +=
		"	/* タグ挿入 */" +
		"	|| coalesce(" +
		"		   chr(60)||'h3'" +
		"		|| ' class='||chr(34)||'us-pov-input us-pov-input-taglist us-toggle'||chr(34) "+
		"		|| chr(62)" +
		"		|| '■　おすすめタグ　■'" +
		"		|| chr(60)||'/h3'||chr(62)" +
		"		|| chr(60)||'ul'" +
		"		|| ' class='||chr(34)||'us-pov-input'||chr(34)" +
		"		|| chr(62)" +
		"		|| (select array_to_string(array_agg(" +
		"						chr(60)||'li'" +
		"					 || ' class='||chr(34)||'us-pov-input us-pov-input-tag rank'"+
		"					 || (case when count = 1 then 0 when count = 2 then 3 else 5 end)::text ||chr(34)" +
		"					 || chr(62)" +
		"					 || tag" +
		"					 || chr(60)||'/li'||chr(62)" +
		"				   ), '') " +
		"			  from (select tag, count(game)" +
		"					  from userreview_with_tag as urt" +
		"					 where urt.game = " + game_id + 
		"					 group by tag" +
		"					 order by count desc, tag) as foo" +
		"		   )" +
		"		|| chr(60)||'/ul'||chr(62)" +
		"	 , '')" +
		"	|| coalesce(" +
		"		   chr(60)||'h3'" +
		"		|| ' class='||chr(34)||'us-pov-input us-pov-input-taglist us-toggle'||chr(34) "+
		"		|| chr(62)" +
		"		|| '■　マイタグ　■'" +
		"		|| chr(60)||'/h3'||chr(62)" +
		"		|| chr(60)||'ul'" +
		"		|| ' class='||chr(34)||'us-pov-input'||chr(34)" +
		"		|| chr(62)" +
		"		|| (select array_to_string(array_agg(" +
		"						chr(60)||'li'" +
		"					 || ' class='||chr(34)||'us-pov-input us-pov-input-tag rank11'||chr(34)" +
		"					 || chr(62)" +
		"					 || tag" +
		"					 || chr(60)||'/li'||chr(62)" +
		"				   ), '') " +
		"			  from (select tag, count(game)" +
		"					  from userreview_with_tag as urt" +
		"					 where urt.uid = '" + uid + "'" +
		"					 group by tag" +
		"					 order by count desc, tag) as foo" +
		"		   )" +
		"		|| chr(60)||'/ul'||chr(62)" +
		"	 , '')" +
		"	/* タグ挿入終了 */";
	}

	myQuery +=
	"	/* キャラデータ挿入 */" +
	"	|| coalesce(" +
	"		   chr(60)||'h3'" +
	"		|| ' class='||chr(34)||'us-pov-input us-toggle'||chr(34) "+
	"		|| chr(62)" +
	"		|| '■　キャラ名　■'" +
	"		|| chr(60)||'/h3'||chr(62)" +
	"		|| chr(60)||'ul'" +
	"		|| ' class='||chr(34)||'us-pov-input'||chr(34)" +
	"		|| chr(62)" +
	"		|| (select array_to_string(array_agg(" +
	"						chr(60)||'li'" +
	"					 || ' class='||chr(34)||'us-pov-input us-pov-input-chara rank'"+
	"					 || (9 - shubetu_detail * 3)::text ||chr(34)" +
	"					 || chr(62)" +
	"					 || regexp_replace(" +
	"							shubetu_detail_name" +
	"						  , '、'" +
	"						  , chr(60)||'/li'||chr(62)" +
	"						 || chr(60)||'li'" +
	"						 || ' class='||chr(34)||'us-pov-input us-pov-input-chara rank'" +
	"						 || (9 - shubetu_detail * 3)::text ||chr(34)" +
	"						 || chr(62)" +
	"						)" +
	"					 || chr(60)||'/li'||chr(62)" +
	"				   ), '') " +
	"			  from (select *" +
	"					  from shokushu as ss" +
	"						 , createrlist as cl" +
	"					 where ss.creater = cl.id" +
	"					   and ss.shubetu=5" +
	"					   and ss.game = " + game_id + 
	"					 order by ss.shubetu_detail, ss.shubetu_detail_name) as foo" +
	"		   )" +
	"		|| chr(60)||'/ul'||chr(62)" +
	"	 , '')" +
	"	/* キャラデータ挿入終了 */" +
	"	|| array_to_string(array_agg(tmp3.str),'')" +
	"	|| chr(60)||'br'" +
	"	|| ' style='||chr(34)||'clear:both;'||chr(34)" +
	"	|| chr(62)" +
	"	|| chr(60)||'/div'||chr(62)" +
	"	|| chr(60)||'/div'||chr(62)" +
	"	|| chr(60)||'!--end--'||chr(62)" +
	"  from (select" +
	"			   chr(60)||'h3'" +
	"			|| ' class='||chr(34)||'us-pov-input us-toggle'||chr(34)" +
	"			|| chr(62)" +
	"			|| tmp2.system_group" +
	"			|| chr(60)||'/h3'||chr(62)" +
	"			|| chr(60)||'ul'" +
	"			|| ' class='||chr(34)||'us-pov-input'||chr(34)" +
	"			|| chr(62)" +
	"			|| array_to_string(" +
	"				   array_agg(chr(60)||'li'" +
	"						  || ' title='||chr(34)||tmp2.title||chr(34)" +
	"						  || ' class='||chr(34)||'us-pov-input us-pov-input-pov rank'";

	if (hatsubaimae) {
		myQuery +=
		"						  || case when tmp2.povcount=1 then 2 when tmp2.povcount>1 then 7 else 0 end";
	} else {
		myQuery +=
		"						  || 10*tmp2.povcount/" +
		"							 coalesce(" +
		"							   (select case" +
		"									   when the_number_of_uid_which_input_pov=0" +
		"									   then 10000" +
		"									   else the_number_of_uid_which_input_pov" +
		"										end" +
		"								  from gamelist where id=" + game_id + ")" +
		"						   , 10000)";
	}

	myQuery +=
	"						  || chr(34)" +
	"						  || ' povcnt='||chr(34)||tmp2.povcount||chr(34)" +
	"						  || ' povno='||chr(34)||tmp2.id||chr(34)" +
	"						  || chr(62)" +
	"						  || tmp2.system_title||' ('||tmp2.povcount||')'" +
	"						  || chr(60)||'/li'||chr(62))" +
	"			   ,'\n')" +
	"			|| chr(60)||'/ul'||chr(62) as str" +
	"		" +
	"		  from (select pl.*" +
	"					 , coalesce(tmp1.count,0) as povcount" +
	"				  from (select pov, count(*)";

	if (hatsubaimae) {
		myQuery +=
		"						  from povgroups_before";
	} else {
		myQuery +=
		"						  from povgroups";
	}

	myQuery +=
	"						 where game= " + game_id +
	"						 group by pov) as tmp1" +
	"				 right join";
	
	if (my_group) {
		myQuery +=
		"					   (select pl.title" +
		"							 , pl.system_title" +
		"							 , pl.id" +
		"							 , pnl.title as system_group" +
		"						  from povnodelist as pnl" +
		"							 , povnodegroups as png" +
		"							 , povlist as pl" +
		"						 where pnl.id=png.pov_parent_node" +
		"						   and png.pov=pl.id" +
		"						   and pnl.uid='" + uid + "') as pl" +
		"					on tmp1.pov=pl.id) as tmp2";
	} else {
		myQuery +=
		"					   povlist as pl" +
		"					on tmp1.pov=pl.id) as tmp2";
	}

	if (hatsubaimae) {
		myQuery +=
		"		 where tmp2.before";
	}

	myQuery +=
	"		 group by tmp2.system_group" +
	"		 order by tmp2.system_group) tmp3";
	  
	$.ajax({
	  type:"POST",
	  url: "./select.php",
	  data:{SQL: myQuery},
	  success: function(msg,status){
		msg = msg.substring(msg.indexOf("SELECTした結果のテーブル内容",0),msg.length);
		msg = msg.substring(msg.indexOf("<!--start-->",0),msg.length);
		msg = msg.substring(12,msg.indexOf("<!--end-->",0));
		msg += "<div id=\"us-pov-input-description\"><h2 class=\"us-pov-input\"><span class=\"us-left\"><span id=\"us-pov-input-name\"></span>の情報</span><span class=\"us-pov-input-description-close us-right\">　×　</span></h2><div class=\"us-pov-input\"><iframe src=\"\"></iframe></div></div>";
		$("body").append(msg);
		$("#us-pov-input-description iframe").css({"width" : Math.floor($(window).width() - $("#us-pov-input-wrapper").width() - 30) });
		$("#us-pov-input-description iframe").css({"height" : Math.floor($(window).height() / 1.5) });
		$("#us-pov-input-description div.us-pov-input").css({
									   "background-image" : "url(" + img_loader + ")" ,
									   "background-repeat" : "no-repeat" ,
									   "background-position" : "center center"
									   });
		pov_check();
	  }
	});

	$(".us-pov-input-description-open").live('click', function() {
		$(this).toggleClass("us-selected");
		if ( $("#us-pov-input-mode").html() == "　説明　" ) {
			$("#us-pov-input-mode").html("　入力　");
		} else {
			$("#us-pov-input-mode").html("　説明　");
		}
	});

	$(".us-pov-input-description-close").live('click', function() {
		$(this).parent().parent().css({"opacity": 1}).animate({opacity: "0"},{queue: true, duration: 400, easing: "swing", complete: function(){ $(this).hide() }});
		$(".us-pov-input-description-open").removeClass("us-selected");
		$("#us-pov-input-mode").html("　入力　");
	});

	$(".us-toggle, .us-toggle-sub").live('click', function() {
		var e = $(this);
		if ( $(this).hasClass("us-toggle-sub") ) {
			e = $(this).parent();
		}
		e.next().toggle(100);
		e.toggleClass("us-selected");
	});

	$(".us-arrow-left, .us-arrow-right").live('click', function() {
		var rev = 1;
		if ( $(this).hasClass("us-arrow-right") ) { rev = -1 }
		var new_width = Math.floor($("div#us-pov-input-wrapper").width() + 150 * rev);
		if ( new_width >= 300 && new_width <= 900 ) {
			$("div#us-pov-input-wrapper").css({"width" : new_width });
		}
	});

	$("li.us-pov-input-pov").live('click', function() {
		if ( $(".us-pov-input-description-open").hasClass("us-selected") ) {
			$("div#us-pov-input-wrapper").css({"width" : "300px" });
			$("#us-pov-input-name").html( "POV『" + $(this).attr("title") + "』" );
			$("#us-pov-input-description iframe").attr("src", "http://erogamescape.dyndns.org/~ap2/ero/toukei_kaiseki/povlist.php?pov_id=" + $(this).attr("povno") );
			if ( $("#us-pov-input-description:visible").length == 0 ) {
				$("#us-pov-input-description").show();
				$("#us-pov-input-description")
					.css({"opacity": 0})  
					.animate({opacity: "1"},{queue: true, duration: 400, easing: "swing", complete: function(){}});  
			  }
		} else {
			$(this).addClass("us-selected");
			match_str = "td[id*=\"pov_id\"]";
			$(match_str).removeClass("us-pov-input-selected");
			match_str = "td#pov_id_" + $(this).attr('povno') + ":last";
			$(match_str).addClass("us-pov-input-selected");
			tops = $(match_str).offset().top - 50;
			$('body,html').animate({"scrollTop": tops}, "swing");
			$(match_str).next().children("select:last").focus();
		}
	});

	$("li.us-pov-input-tag").live('click', function() {
		$(".us-pov-input-selected").removeClass('us-pov-input-selected');
		if ( $(".us-pov-input-description-open").hasClass("us-selected") ) {
			$("div#us-pov-input-wrapper").css({"width" : "300px" });
			$("#us-pov-input-name").html( "タグ『" + $(this).text() + "』" );
			$("#us-pov-input-description iframe").attr("src", "http://erogamescape.dyndns.org/~ap2/ero/toukei_kaiseki/taglist.php?tag=" + encodeURIComponent( $(this).text() ) );
			if ( $("#us-pov-input-description:visible").length == 0 ) {
				$("#us-pov-input-description").show();
				$("#us-pov-input-description")
					.css({"opacity": 0})  
					.animate({opacity: "1"},{queue: true, duration: 400, easing: "swing", complete: function(){}});  
			  }
		} else {
			$(this).addClass("us-selected");
			match_str = "textarea#tag_input";
			$(match_str).val( $(match_str).val() + " #" + $(this).text() );
			tops = $(match_str).parent().offset().top - 50;
			$('body,html').animate({"scrollTop": tops}, "swing");
			move_last( $(match_str)[0] );
		}
	});

	$("li.us-pov-input-chara").live('click', function() {
		if ( $(".us-pov-input-description-open").hasClass("us-selected") ) {
			$("div#us-pov-input-wrapper").css({"width" : "300px" });
			$("#us-pov-input-name").html( "キャラクター『" + $(this).text() + "』" );
			$("#us-pov-input-description iframe").attr("src", "http://www5.big.or.jp/~seraph/ragna/ragna.cgi?mode=search&q=game%3A" + game_id + "+name%3A" + encodeURIComponent( $(this).text().split(/\(|、/g)[0] ) );
			if ( $("#us-pov-input-description:visible").length == 0 ) {
				$("#us-pov-input-description").show();
				$("#us-pov-input-description")
					.css({"opacity": 0})  
					.animate({opacity: "1"},{queue: true, duration: 400, easing: "swing", complete: function(){}});  
			  }
		} else {
			if ( $(".us-pov-input-selected").size() == 1 ) {
				var comment = $(".us-pov-input-selected").next().next().children().val();
				if ( comment !== "" ) { comment += "、" }
				$(".us-pov-input-selected").next().next().children().val(comment + $(this).text());
				move_last( $(".us-pov-input-selected").next().next().children() );
			} else {
				match_str = "textarea#tag_input";
				$(match_str).val( $(match_str).val() + "##" + $(this).text().replace(/\s/g, "") + " \n");
				move_last( $(match_str)[0] );
			}
		}
	});

	$("li.us-pov-input-pov").live('mouseout', function() {
		pov_check();
	});

	$(".us-close").live('click', function() {
		$("h3.us-toggle").removeClass("us-selected");
		$("h3.us-toggle").next().hide();
	});
	
	function pov_check() {
		$("td[id*=\"pov_id\"] + td select").each( function() {
			pov_id = $(this).attr("name").replace("data[pov][", "").replace("][rank]", "");
			tmp_str = "li[povno='" + pov_id + "']";
			$(tmp_str).removeClass("us-checked-A us-checked-B us-checked-C");
			$(tmp_str).addClass("us-checked-" + $(this).val());
		})
	}

	function move_last( elm ) {
		elm.focus();
		if (elm.createTextRange) {
		  var range = elm.createTextRange();
		  range.move('character', elm.value.length);
		  range.select();
		} else if (elm.setSelectionRange) {
		  elm.setSelectionRange(elm.value.length, elm.value.length);
		}
	}


/*POV以外のサポート*/
	var en = "input[name='data[tokuten]']"
		   + ", input[name='data[before_tokuten]']"
		   + ", input[name='data[total_play_time]']"
		   + ", input[name='data[time_before_understanding_fun]']";
	$(en).css("ime-mode", "disabled");
	$(en).blur(function(){
	  $(this).val($(this).val().replace(eval("/[Ａ-Ｚａ-ｚ０-９]/g"), function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)}));
	});
	
	$("#memo_input").after("<div class='us-pov-input-cnt'>" + $("#memo_input").val().replace(/\n|\r|\n\r/g, "  ").length + " 文字</div>");
	/*Query確認*/
	if(checkQuery) {
	  $("#memo_input").html(myQuery);
	}
	
	$("#memo_input").keyup(function (){
	  $("#memo_input + div").text($(this).val().replace(/\n|\r|\n\r/g, "  ").length + " 文字");
	});
/*POV以外のサポート*/

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
