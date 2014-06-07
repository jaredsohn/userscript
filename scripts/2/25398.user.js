// ==UserScript==
// @name           WP No Word Break
// @namespace      userscripts.org
// @description    Helps you to remove hidden word breaks once you have previewed your post
// @include        http://forums.whirlpool.net.au/forum-reply.cfm?r=*
// @include        http://whirlpool.net.au/forum-reply.cfm?r=*
// ==/UserScript==

$ =unsafeWindow.jQuery;

$('#modewc').parent().append('<br /><br /><button style="font-size:10px;" id="remHwb">Remove Word Breaks</button>');

if(!$("a[@name='preview']")[0]){

	$('#remHwb').attr('disabled','disabled');

}
else{
	$('#remHwb').mouseup(function(e){
			
		var sdf = $.trim($('.bodytext:last>p').html()).split("\xAD\x20")

		$('#body').val('');

		for(var p=0;p<sdf.length;p++){

			if( (p == sdf.length-1) && ((sdf[p].length<34) || (sdf[p].indexOf(' ')> 0)) ){
			
				$('#body').val($('#body').val()+sdf[p].replace(RegExp("<br>", "gim"), "\n"));
			
				break;
			
			}	
		
			else{

				sdf[p] = sdf[p].slice(0,-2)+'[**]'+sdf[p].slice(-1); 

			}
			sdf[p] = sdf[p].replace(RegExp("<br>", "gim"), "\n");

			$('#body').val($('#body').val()+sdf[p]);
			
		}			
		
		$(this).attr('disabled','disabled');
				
		return false;
			
	});
}