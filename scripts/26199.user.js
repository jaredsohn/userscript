// ==UserScript==
// @name           wykop comment mark
// @namespace      http://www.wykop.pl
// @include        http://www.wykop.pl/link/*
// ==/UserScript==
// Authors: fanzonun, Alpha_Male

var wnc_script = " "+<r><![CDATA[
	var wnc_comments = 4; //liczba podswietlanych ostatnich komentarzy
	function wnc_get_max_id(wnc_count)
	{
		var wnc_max_arr = new Array();
		var wnc_li_arr  = document.getElementsByTagName("li");
		for (wnc_li in wnc_li_arr) 
		{
			if (wnc_li_arr[wnc_li].id && wnc_li_arr[wnc_li].id.indexOf("comment-") == 0)
			{
				wnc_id = /comment-(\d+)/.exec(wnc_li_arr[wnc_li].id);
				wnc_max_arr.push(wnc_id[1]);
			}
		}
		return wnc_max_arr.length <= wnc_comments
					 ? wnc_max_arr
					 : wnc_max_arr.sort().reverse().splice(0,wnc_count);
	}
	function wnc_hilight(wnc_count)
	{
		if (!wnc_count)
		{
			wnc_count = document.getElementById("highlightCount").value;
		}
		if (wnc_max = wnc_get_max_id(wnc_count))
		{
			for (wnc_id in wnc_max)
			{
				document.getElementById("comment-"+wnc_max[wnc_id]).style.backgroundColor="#AABBBB";
			}
		}
	}
]]></r>;

wkc = document.getElementById('wykop-comments');
el  = document.createElement('li'); 
el.innerHTML  = '<input type="text" id="highlightCount" value="4"/><input onclick="wnc_hilight(0);" type="button" value="podswietl" id="highlightButton" />';
el.innerHTML  = el.innerHTML + '<script language="javascript" type="text/javascript">'+wnc_script+'</script>'; //sandbox bypass :P
wkc.insertBefore(el,wkc.firstChild);