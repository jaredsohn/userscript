// ==UserScript==
// @name           Wonderful Bidding
// @namespace      AKX
// @include        https://www.projectwonderful.com/pendingbids.php
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

(function()
{
	var $=window.jQuery;
	if(!$) return;
	$("form[action*='pendingbids.php']").each(
	function()
	{
		var form=this;
		var bidid=$("input[name='bidid']",form).val();
		
		$("input[type='submit']",form).click(function()
		{
			var mode=this.name;
			var ajaxData={"bidid":bidid};
			ajaxData[mode]=1;
			if(mode=='reject')
			{
				ajaxData['reason']=$("input[name='reason']",form).val();
				ajaxData['ban']=$("select[name='ban']",form).val();
			}
			$(this).css({"background-color":"yellow","color":"black"});
			$.ajax(
				{
					url: form.action,
					type: "POST",
					data: ajaxData,
					success: function(data, textStatus)
					{
						$(form.parentNode.parentNode).animate({opacity:0.4},1500);
						var status=/"infotitle">([^<]+)</.exec(data);
						if(status&&status[1]) $("<div style=\"font-size:150%;margin-top:10px\">"+status[1]+"</div>").slideDown(1500).prependTo(form.parentNode);
						$("form",form.parentNode).slideUp(1500);
					}
				}
			);
			return false;
		}).each(function(){$(this).val($.trim(this.value)+"*");});
	});
})();