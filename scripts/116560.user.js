// ==UserScript==
// @name                        heulib_recommendation
// @namespace              		heulib_recommendation
// @version                     1.1
// @author                      Mescoda on http://mescoda.com/
// @description              	在哈尔滨工程大学图书馆荐购页面显示到书情况
// @reason						更新图书馆 OPAC v5.0 服务器移交至图书馆
// @include                     http://202.118.176.18:8080/reader/asord_lst.php
// @include                     http://202.118.176.18:8080/reader/asord_lst.php?page=*
// @require                     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	$('table tr:gt(0)').each(function() {
		var $tr = $(this);
		var $titlebox = $tr.children('td:eq(0)');
		var $title = $tr.children('td:eq(0)').text();
		$title=$title.replace(/\s/g,'+');
		var $openLink = "http://202.118.176.18:8080/opac/openlink.php?strSearchType=title&historyCount=1&strText="+$title+"&x=0&y=0&doctype=ALL&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&location=ALL";
		GM_xmlhttpRequest({
			method:'GET',
			url:'http://liblab.hrbeu.edu.cn/gm/lib.php?title='+$title,
			onload:function(data){
				json = eval('('+data.responseText+')');
				$status = json.status;
				if( $status == 'yes') {
					$titlebox.wrapInner('<a style="color:blue;border-bottom:1px dashed;" href='+$openLink+' target="_blank"></a>')
					.attr('bgcolor','#A4A4A4');
				} else {
					var $lstatus = $tr.children('td:eq(4)').text();
					if( $lstatus == '已典藏' ) {
						$titlebox.append('<a style="color:blue;border-bottom:1px dashed;float:right;" href="http://202.118.176.18:8080/opac/search.php" target="_blank">Search&#32;</a>')
						.attr('bgcolor','#A4A4A4');;
					} else {
						$titlebox.append('<a style="color:blue;border-bottom:1px dashed;float:right;" href='+$openLink+' target="_blank">Search&#32;</a>');
					}
				}
			}
		})		
	});
})