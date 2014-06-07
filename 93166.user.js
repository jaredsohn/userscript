// ==UserScript==
// @name           Search Selected text on Google
// @copyright      2010 - Amit Patil
// @version        1.0
// @website	   http://www.amitpatil.me	
// @namespace      *
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
   
$(document).ready(function(){
	$("body").mouseup(function(e){
		// get selected text
		var seltext = getSelectedText();	
		if(seltext != ""){
		   if($(".searchit").attr("class") == null)
		   {
				$("<a></a>").appendTo("body")
				.attr("title","Click to know more")
				.attr("class","searchit")
				.css("width","24px")
				.css("height","24px")
				.css("background-image","url(http://lh4.ggpht.com/_9NnLYMRJob8/TQ9GrnFaweI/AAAAAAAAAVc/f4UtNPKEMUU/find.png)")
				.css("display","inline")
				.css("background-position","0px 0px")
				.attr("href","http://www.google.co.in/search?hl=en&q="+seltext)
				.attr("target","_blank")
				.css("left",e.pageX - 5)
				.css("top",e.pageY - 30)
				.css("display","block")
				.css("position","absolute")
				.hide()
				.fadeIn("fast");
		   }
		   else{
			   	$(".searchit").animate({"left": e.pageX - 2,"top" : e.pageY - 30}, "slow")
				.attr("href","http://www.google.co.in/search?hl=en&q="+seltext).fadeIn("slow");
		   }
		}
		else
			$(".searchit").fadeOut("fast");

	});
    $(".searchit").mouseover(function(){
	   alert("asa");
    });

});
function getSelectedText()
{
	// For Firefox, Safari and other non-IE browsers
	if(window.getSelection)
		return window.getSelection(); 
	else if(document.getSelection) 
		return document.getSelection();
	else
	{
		// For IE
		var selection = document.selection && document.selection.createRange();
		if(selection.text)
			return selection.text;
		return false;
	}
	return false;
}
