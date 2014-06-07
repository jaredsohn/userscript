// ==UserScript==
// @name           feedly tag shorcut
// @description    Tag by keyboard, layout, css fix
// @author         chulian
// @include        http*://cloud.feedly.com/*
// @include        http*://feedly.com/*
// @require        http://code.jquery.com/jquery-latest.js 
// @version        1.3
// ==/UserScript==

//json with the key => tag combination , will work wen you press alt+key
var tags = {
	a : "tag1", //press ALT + a  to tag with tag1
	b : "'tag2",//press ALT + b  to tag with tag2
	c : "tag3"	//press ALT + c  to tag with tag3
	//add your own to this json
};

function tag(pick){
	//console.log("pick "+pick);
	var $selected = $(".selectedEntry");
	if($selected.size()==0){
		$selected = $(".inlineFrame:first");
	}
	$selected.find(".toBeTagged:first").trigger("click");
	//console.log("a  "+$selected.attr("class"));
	if(pick!="t"){		
		//console.log("click al tag  "+tags[pick]+" size "+$selected.find(".picker .option[data-tagname='"+tags[pick]+"']").size());
		$(".picker .option[data-tagname='"+tags[pick]+"']").trigger("click");
		$(".picker").hide();
	}else{
		$(".picker .option:first").focus();
	}
	return false;
}

function cssFix(){
	$("#sideArea").hide();
	$("#feedlyPage").width("100%");
        $("#feedlyFrame").width("100%");
	$('head').append('<style type="text/css"> #sideArea { display:none !important;} #feedlyPage, #feedlyFrame, #feedlyPart{ width:100% !important;}   </style> ');
};
    $(document).keydown(function (e) { 	
        element=e.target; 
        //GM_log("tag name: "+element.tagName ); 
        if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;//if cursor on a textarea or input, disable hotkey 
          
        tecla=String.fromCharCode(e.which).toLowerCase(); 
        GM_log(e.which+" tecla "+tecla + " pick "+tags[tecla]+ "  alt : " +e.altKey ) 
        //76=l 
	if(e.altKey && tags[tecla]){
		tag(tecla);	
	}else if(tecla == 2 ){
		$("#pageActionCustomize").click();
		$("#lvc_u0").click();	
	}else if(tecla == 1 ){
		$("#pageActionCustomize").click();
		$("#lvc_u100").click();	
	}else if(tecla == 3 ){
		$("#pageActionLayout4").click();
	}else if(tecla == 4 ){
		$("#pageActionLayout6").click();
	}
    }); 
cssFix();