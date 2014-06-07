// ==UserScript==
// @name        Comment Adder
// @namespace   http://*
// @include     http://192.168.200.7:8085/ComplianceReportHtml.aspx*
// @version     4
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant  GM_addStyle
// ==/UserScript==





// ADD BUTTONS


$("#body_btnCompare").parent().append("<div id='buttonCWT'><a style='color:white;'>CWT</a></div>");
$("#body_btnCompare").parent().append("<div id='buttonSAVE'><a>Save Comments</a></div>");



// FORMAT BUTTONS

$("#buttonCWT").css({
	"cursor":"pointer",
	"background":"#ee82ee",
	"color":"white",
	"font-size":"18px",
	"padding":"4px",
	"margin-left":"4px",
	"border":"solid 1px #be3cbe",
	"display":"inline-block"
});	

$("#buttonSAVE").css({
	"cursor":"pointer",
	"text-align":"center",
	"background":"lightgreen",
	"color":"white",
	"font-size":"18px",
	"padding":"4px",
	"margin-left":"4px",
	"border":"solid 1px green",
	"display":"inline-block"
});	



// BUTTON FUNCTIONS



$("#buttonCWT").click(function () {

	$("#body_GridView1 tr").not(':first, :last-of-type').each(function(){
		if( $(this).css("background-color") == "rgb(238, 130, 238)" ){
			$(this).children("td:last-of-type").children("input").val("CWT");
		}
	});

});

var $nextpage

	$("#body_GridView1 tr:last-of-type").each(function(){
		
		//strange trap because of nested each, and this is just easier... for now
		if($(this).index() == 51){
			//$(this).children("td").children("table").css("background-color","green")
			var $pagelinks = new Array();
			var $pagecount = 0;
			$(this).children("td").children("table").children("tbody").children("tr").children("td").each(function(){
				var curpagelink = $(this).children("a").attr("href");
				if( typeof curpagelink != "undefined" ){

					$pagelinks[$pagecount] = curpagelink;
					$pagecount++;
				}
			});
			// calculation of the first available page link... it will be page 2 when visiting the first page, otherwise it should be page 1
			$nextpage = $pagelinks[0].split("Page$")[1].split("'")[0];	
		}
	});


	// preloading?
$('<img/>').src = 'http://www.loadinfo.net/main/download?spinner=142877&disposition=inline';
	
	
   $("#buttonSAVE").children("a").click( function(){ funcSaver(); });

 var funcSaver = function(){
   
	$("#buttonSAVE").css("cursor","default");
	$("#buttonSAVE").html("Saving&nbsp;<img style='vertical-align:bottom;' src='http://www.loadinfo.net/main/download?spinner=142877&disposition=inline'>");	
	
	var $argumentloader = "Page$"+$nextpage;

	$("#__EVENTTARGET").val("ctl00$body$GridView1");
	$("#__EVENTARGUMENT").val("Page$"+$nextpage);
	
	var $formData = $("#Form1").serialize();
		
	$.ajax({
		dataType: "html",
		type: 'POST',
		url: $("#Form1").attr('action'),
		data: $formData,
		success: function (data) {
			var dataholder = data;
			var n=dataholder.search("An Error Has Occurred");
			if(n>0){ alert("Error Saving Comments"); }
			
			$("#buttonSAVE").text("Saved!");
			setTimeout(function() { $("#buttonSAVE").html("&nbsp;"); }, 100);
			setTimeout(function() { $("#buttonSAVE").text("Saved!"); }, 200);
			setTimeout(function() { $("#buttonSAVE").html("&nbsp;"); }, 300);
			setTimeout(function() { $("#buttonSAVE").text("Saved!"); }, 400);
			setTimeout(function() { $("#buttonSAVE").html("&nbsp;"); }, 500);
			setTimeout(function() { $("#buttonSAVE").text("Saved!"); }, 600);
			setTimeout(function() { $("#buttonSAVE").html("<a>Save Comments</a>"); 
				$("#buttonSAVE").css("cursor","pointer");
				$("#buttonSAVE").children("a").click( function(){ funcSaver(); });			
			}, 1500);
		}
	});

}
	
var $lastNormalClick;
var $thisShiftClick;
var $isHighlighted = false;

var $thisCtrlClick;


// remove the click event from the comment field
$("#body_GridView1 tr").not(':first, :last-of-type').children("td:last-of-type").children("input").click(function( e ) {
	

	if (e.ctrlKey){
		$thisCtrlClick = $(this).parent().parent().index();
		$("#body_GridView1 tr:eq("+$lastNormalClick+")").children("td:last-of-type").children("input").css({"background":"#b7d3ef","border":"solid 1px #3399ff", "padding":"2px"}).addClass("highlighted");	
		$(this).css({"background":"#b7d3ef","border":"solid 1px #3399ff", "padding":"2px"}).addClass("highlighted");
		$isHighlighted = true;
		
	}
    else if (e.shiftKey) {
		$thisShiftClick = $(this).parent().parent().index();
		if($thisShiftClick > $lastNormalClick){
			$hlMod = 1;
		}
		else{
			$hlMod = -1;
		}

		
		$(this).parent().parent().parent().children("tr").each(function(){ 
			$x = $(this).index();
			if( $x >= $lastNormalClick && $x <= $thisShiftClick || $x >= $thisShiftClick && $x <= $lastNormalClick ){
				$(this).children("td:last-of-type").children("input").css({"background":"#b7d3ef","border":"solid 1px #3399ff", "padding":"2px"}).addClass("highlighted");
			}
		});
		$isHighlighted = true;
    }
	else {
		if($isHighlighted){
			if($thisShiftClick > $lastNormalClick){
				$hlMod = 1;
			}
			else{
				$hlMod = -1;
			}
			

			$("#body_GridView1 tr").not(':first, :last-of-type').children("td:last-of-type").children("input").each(function(){
				$(this).css({"background":"","border":"", "padding":""}).removeClass("highlighted");	
			});
			$isHighlighted = false;
		}
		
		$lastNormalClick = $(this).parent().parent().index();
	}

}).keyup(function(event){
		if ( event.which == 16 ||  event.which == 17 ) {
		// ignores 16 = shift, 17 = ctrl
		}
		else{
			var $typingText = $(this).val();
			$("#body_GridView1 tr").not(':first, :last-of-type').children("td:last-of-type").children(".highlighted").each(function(){
					$(this).val($typingText);
			});
		}


});
	