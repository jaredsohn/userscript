// ==UserScript==
// @name        Favorites
// @namespace   http://*
// @include     http://192.168.200.7:8085/*
// @version     5
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require       http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @resource    customCSS http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant  GM_setValue
// @grant  GM_getValue
// @grant  GM_deleteValue
// ==/UserScript==

function shadeColor(color, percent) {   
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) - amt, B = (num >> 8 & 0x00FF) - amt, G = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
}


var $xicon = "url('http://code.jquery.com/ui/1.10.3/themes/le-frog/images/ui-icons_ffffff_256x240.png')"

var newCSS = GM_getResourceText ("customCSS");
GM_addStyle (newCSS);

GM_addStyle(".myClass { height: 25px; border: dotted 1px gray; border-radius: 4px;}");
GM_addStyle(".myHolder { position:absolute; background:#e0e0e0; color:white; padding:6px; border:none; box-shadow:-1px -1px 1px rgba(0,0,0,.5) inset, 1px 1px 1px white inset, 4px 4px 4px rgba(0,0,0,.5);}");
GM_addStyle(".myFavBox { cursor:pointer; background:#e0e0e0; color:white; font-size:14px; padding:4px; margin-left:0px; border:solid 1px #e0e0e0 }");
GM_addStyle(".myDelBox { background: "+ $xicon +"; background-position : -82px -130px; border:solid 1px transparent; height:13px; width:13px; padding:0px; margin-top:2px; margin-left:6px; cursor:pointer; color:white; display:inline-block; float:right; }");
GM_addStyle(".myRedx { border:solid 1px darkred; background:red "+ $xicon +"; background-position : -82px -130px;}");
GM_addStyle(".myHi { border:solid 1px "+shadeColor('#FFFF00',25)+"; background:#FFFF00}");



// im using "foo" to store the favorites array, dont forget

//GM_deleteValue("foo");

// Loaded Array eXtreme
var lax = eval( GM_getValue("foo","[]") );


// im using "bar" to store the favorites array, dont forget
//GM_deleteValue("bar");
// Calculation array eXtreme
var cax = eval( GM_getValue("bar","[]") );




// place the favorite button
$(".titlebar").find("td:first").after("<td><div id='favbtn'>&#9734;</div><div id='favholder'></div></td>");


var favWait
var favDur = 500; // number of ms the favorite menu hangs out
var favLocker = false; // the menu will not disapear if favlocker is true

$("#favbtn").button().mouseover(function(event){ 
	event.stopPropagation();
	clearTimeout(favWait);	
	$("#favholder").show( "blind", 100).mouseover(function(event){ 
		event.stopPropagation();
		clearTimeout(favWait);
		$("#favholder").show();
	})
	
});
$("#favbtn .ui-button-text").css({
		"font-size":"24px",
		"padding":"0 .2em .2em .2em",
		"line-height":"1"
});

$("body").mouseover(function(){
	if(!favLocker){
		clearTimeout(favWait);
		favWait = setTimeout(function() { $("#favholder").hide("blind", 100);}, favDur);
	}
});

// Temp Array eXtreme
var saveTax = function() {
	var laxloader = [];
	$(".favbox").each(function(){	
		var tax = new Array();
		tax[0] = $(this).text();
		tax[1] = $(this).children("a").attr("href");
		laxloader.push(tax);		
	});
	// set lax to what it is right now
	lax = laxloader;
	GM_setValue("foo", uneval(laxloader) );	
}


$("#favholder").sortable({ 
			helper: function(event, element){ return element.clone().addClass("myHi").css({"cursor":"move"}); },
			placeholder: "myClass", distance: 5
		}).on( "sortupdate", function( event, ui ) {
			saveTax();
		}).on( "sortstart", function( event, ui ) {
			clearTimeout(favWait);
			favLocker=true;
			$(ui.helper).children().css("cursor","move");
		}).on( "sortbeforestop", function( event, ui ) {
			clearTimeout(favWait);
			favLocker=true;
			$(ui.helper).effect( "transfer",{ to: ui.item, className: "myClass" },250, function(){ favLocker=false; });
		}).addClass('myHolder ui-corner-all').hide();




var favRender = function() {
	$("#favholder").empty();
	for(i=0; i < lax.length; i++){
		$("#favholder").append("<div class='favbox'><a href='"+lax[i][1]+"'>"+lax[i][0]+"</a></div>");
	}
	$(".favbox").addClass('myFavBox ui-corner-all').click(function(){
		window.location.href = $(this).children("a").attr("href");
	}).hover(function(){
		$(this).parent().children(".favbox").removeClass("myHi");
		$(this).toggleClass("myHi");
	},function(){
		$(this).toggleClass("myHi");
	}).children("a").css({"color":"#727272","text-decoration":"none"});
	$(".favbox").append("<div class='favdel'></div>");
	$(".favdel").addClass('myDelBox ui-corner-all').hover(function(){
		$(this).toggleClass("myRedx");
	},function(){
		$(this).toggleClass("myRedx");
	}).click(function(){
		$(this).parent().remove();
		saveTax();
	})
}

favRender();






// Customer View Page
var haver;
$("th:contains('Customer Accounts')").parent().parent().children(".dt tr").not(':first, :eq(1), :eq(2)').each( function(){
	$(this).append("<td style='cursor: pointer;' class='addfavoritebtn'><a>Add to Favorites</a></td>");
});

$(".addfavoritebtn").click(function(){

	$(this).parent().effect( "transfer",{ to: "#favbtn", className: "myClass" },500);
		
	var $custname = $(this).parent().children("td:first").text();
	var $custlink = $(this).parent().children("td:first").children("a").attr("href");
		
	var tax = new Array();
	tax[0] = $custname;
	tax[1] = $custlink;
		
	lax.push(tax);
		
	GM_setValue("foo", uneval(lax) );	
	favRender();
		
});

var $pageAccountView = false;

// Account View
$("th:contains('Calculations'):first").parent().parent().children("tr:eq(1)").each( function(){
	if( $(this).children("td").text() == "Create" ) $pageAccountView = true;
});

if($pageAccountView){
	// Customer View Page
	$("th:contains('Calculations'):first").parent().parent().children("tr:eq(2)").each( function(){

		var $accID = $(".menubar").find("a:last-of-type").attr("href").split("=")[1];	
		var finder = false;
		var checker = "";
		for(var i=0; i < cax.length; i++){
			if(cax[i][0] == $accID){
				if(cax[i][1] == 0){
					checker = "checked"
					$(this).css("background","orange");
				}
				finder = true;
			}
		}
		if(!finder){
			checker = "checked"
			$(this).css("background","orange");
		}

		$(this).append("<td style='cursor: pointer;' class='defaultcalcbtn'><input type='radio' class='boxy' name='defaultcalcrad' value='0' style='vertical-align:bottom; margin-top: -2px' "+ checker +">No Default</td>");
	});

	$("th:contains('Calculations'):first").parent().parent().children(".dt tr").not(':first, :eq(1), :eq(2)').each( function(){
		var $tcalcID = $(this).children("td:first").children("a").attr("href").split("=")[1];
		var $accID = $(".menubar").find("a:last-of-type").attr("href").split("=")[1];	
		var finder = false;
		var checker = "";
		for(var i=0; i < cax.length; i++){
			if(cax[i][0] == $accID){
				if(cax[i][1] == $tcalcID){
					checker = "checked"
					$(this).css("background","orange");
				}
				finder = true;
			}
		}
		if(!finder){
			// not this one!
		}

		$(this).append("<td style='cursor: pointer;' class='defaultcalcbtn'><input type='radio' class='boxy' name='defaultcalcrad' value='"+ $tcalcID +"' style='vertical-align:bottom; margin-top: -2px' "+ checker +">Default Calc</td>");

	});



	$(".defaultcalcbtn").click(function(){

		$(this).parent().parent().children("tr:odd").css("background","transparent");
		$(this).parent().parent().children("tr:eq(2)").css("background","transparent");	
		$(this).parent().parent().children("tr:even").not(":eq(1)").css("background","#f0f0f0");
		$(this).parent().css("background","orange");
		

		$(this).children("input").prop('checked',true);	

		var $accID = $(".menubar").find("a:last-of-type").attr("href").split("=")[1];
		var $tcalcID = $("input:radio[name=defaultcalcrad]:checked").val();
		
		var finder = false;

		for(var i=0; i < cax.length; i++){
			if(cax[i][0] == $accID){
				//alert("its here! "+i+":"+cax[i][1]);
				cax[i][1] = $tcalcID;
				finder = true;
				GM_setValue("bar", uneval(cax) );	
			}
		}
		if(!finder){
			//alert("it ain't here! we should probably save it, huh?" + $tcalcID);
			var tax = new Array();
				tax[0] = $accID;
				tax[1] = $tcalcID;
			cax.push(tax)
			GM_setValue("bar", uneval(cax) );	
		}
	});



	$("th:contains('Recent Transaction Imports'):first").parent().parent().children(".dt tr").not(':first, :eq(1), :eq(2)').each( function(){
		$(this).append("<td style='cursor: pointer;' class='quickbtn'><a>Quick View</a></td>");
	});


	$(".quickbtn").click(function(){

		var $tcalcID = $("input:radio[name=defaultcalcrad]:checked").val();
		var $timpID = $(this).parent().children("td:eq(9)").children("a").attr("href").split("=")[1].split("&")[0];
		if($tcalcID == 0){
			var $quickLink = $(this).parent().children("td:eq(9)").children("a").attr("href")
		}
		else{
			var $quickLink = "http://192.168.200.7:8085/ComplianceReportHtml.aspx?ID="+$tcalcID+"&ImportID="+$timpID
		}
		//alert( $quickLink);
		window.location.href = $quickLink;
	});

}
