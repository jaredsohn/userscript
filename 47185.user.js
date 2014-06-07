// ==UserScript==
// @name           housing search minimal
// @namespace      harry
// @include        http://genrislistings.marketlinx.com/SearchDetail/Scripts/PrtBuyFul/PrtBuyFul.asp*
// @require        http://online.rit.edu/includes/js/jquery/jquery-latest.min.js
// ==/UserScript==
 	
$(document).ready(function() {

	var checkout = [906571,905498,906779,905619,909861,909747,909055,906950];
	var toggle_link = $('<a href="javascript:void(0);">toggle display</a>');
	
	function is_match(num) {
		var retval = false;
		for ( var i=0; i < checkout.length && !retval; i++ ) {
			retval = (num == checkout[i]);
		}
		return retval;
	}
	function show_info() {
		var mlsnum = $(this).attr("title");
		if ( $(".info_"+mlsnum+":eq(0)").is(":hidden") ) {
			$(".info_"+mlsnum).fadeIn();
		} else {
			$(".info_"+mlsnum).fadeOut();
		}
	}
	function fix_links(table,mlsnum) {
		var links = $("a",table);
		if ( links.length == 3 ) {
			var link0 = $(links[0]);
			link0.attr("href","javascript:void(0);");	
			link0.attr("title",mlsnum);	
			link0.click(show_info);
			var link1 = $(links[1]);
			link1.attr("href","http://maps.google.com/maps?daddr=91 Lomb Memorial Drive, Rochester, NY 14623&saddr="+link1.html()+", ny "+get_zipcode($(".info_zip",table).html()));
			link1.attr("target","_blank");
			var link2 = $(links[2]);
			//link2.attr("href","javascript:void(0);");	
			//link2.click(show_pics);
			link2.attr("target","_blank");
		}
	}
	function get_mls_num(ele) {
		return ele.substr(ele.length-6,6);	
	}
	function get_zipcode(ele) {
		return ele.substr(ele.length-5,5);
	}
	function toggle_display() {
		if ( $(".nogood:eq(0)").is(":hidden") ) {
			$(".nogood").show();
			$(".checkout_info").css("display","none");
		} else {
			$(".nogood").hide();
		}
	}
	function toggle_show_only() {
		var me = $(this);
		var mlsnum = me.attr("title");
		if ( me.html() == "show only this" ) {
			$(".checkout").css("display","none");
			$(".nogood").css("display","none");
			$(".info_"+mlsnum).show();
			$(".main_info_"+mlsnum).show();
			me.html("show all");
		} else {
			$(".checkout").css("display","");
			$(".nogood").css("display","");
			$(".checkout_info").css("display","none");
			me.html("show only this");
		}
	}
	$(function() {
		
		var tables = $("table");
		for ( var k=0; k < tables.length; k++ ) {
			var mtch = false;
			var tr = $("tr:eq(1)",tables[k]);
			if ( tr ) {
				var td = $("td:eq(0)",tr);
				if ( td.html() ) {
					if ( td.html().indexOf("MLS No:") >= 0 ) {
						var mlsnum = get_mls_num(td.html());
						mtch = is_match(mlsnum);
						td.attr("class","info_mls");
						$("td:eq(1)",tr).attr("class","info_area");
						$("td:eq(2)",tr).attr("class","info_listprice");
						$("tr:eq(4) td:eq(1)",tables[k]).attr("class","info_zip");;
						$("tr:eq(5) td:eq(1)",tables[k]).attr("class","info_sqft");;
						$("tr:eq(5) td:eq(2)",tables[k]).attr("class","info_acres");;
						if ( mtch ) {
							$(tables[k]).attr("class","checkout main_info_"+mlsnum);
							for ( var j=k+1; j < k+12; j++ ) {
								$(tables[j]).attr("class","checkout checkout_info info_"+mlsnum);
							}
						} else {
							$(tables[k]).attr("class","nogood main_info_"+mlsnum);
							for ( var j=k+1; j < k+12; j++ ) {
								$(tables[j]).attr("class","nogood checkout_info info_"+mlsnum);
							}
						}
						$(tables[k+12]).remove();
						fix_links(tables[k],mlsnum);
						var lasttd = $("td:last",tables[k]);
						var linky = $('<a href="javascript:void(0);" title="'+mlsnum+'" class="show_only_link">show only this</a>');
						linky.click(toggle_show_only);
						lasttd.prepend(linky);
					}
				}
			}
		}
		
		
		/*$("table:not(.checkout)").remove();
		*/
		$("div").each( function() {
			if ( $(".checkout",this).length == 0 && $(".nogood",this).length == 0 ) {
				$(this).remove();	
			}
		});
		$(".checkout_info").css("display","none");
		toggle_link.click(toggle_display);
		$("body").prepend(toggle_link);
	});
	
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	addGlobalStyle('.checkout { background-color: #d1e1ff; margin-top:15px; }');
	addGlobalStyle('.nogood { background-color: #ddd; margin-top:15px; }');
	addGlobalStyle('.checkout_info { margin-top:0px; }');
	addGlobalStyle('.show_only_link { float:right;margin-right:4px; }');
});