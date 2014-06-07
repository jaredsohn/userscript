// ==UserScript==
// @name        io.gov.mo
// @namespace   asldufhiu32hr9283hf83123
// @include     http://bo.io.gov.mo/bo/i/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
// @require        http://www.bitstorm.org/jquery/color-animation/jquery.animate-colors-min.js
// @version     1
// @grant       none
// ==/UserScript==

var W_PANE = 600;

var s="<div id='div_pane_index' style='left:-"+W_PANE+"px; top:9%; width:"+W_PANE+"px; height:79%; position: fixed; background: #FFFFFF; border: 3px solid #EEAAAA; padding: 6px; overflow-x: hidden; overflow-y: hidden; font-size:13px; opacity:0.9; filter:alpha(opacity=90);'>";

var h = $('h2,h3');

for( var i=0; i<h.length; i++ ){
	var I = i;
	h.eq(i).attr("anchor_index", i);
	var text = h.eq(i).text();
	if( (text.indexOf("第")==0 || text.indexOf("附件")==0 || text.indexOf("表")==0
			|| text.indexOf("Artigo ")==0 || text.indexOf("CAPÍTULO ")==0 || text.indexOf("SECÇÃO ")==0 )
			&& i+1<h.length ){
		i++;
		text += "　<b>" + h.eq(i).text() + "</b>";
	}
	s += "<span style='display:block; cursor: pointer; padding-left:50px;text-indent:-50px;' index='"+I+"'>"+ text + "</span>";
//	onclick='$(\"[anchor_index="+I+"]\").css(\"background-color\":\"#DC9900\").animate({\"background-color\":\"#FFFFFF\"},2000);'>"+ text + "</span>";
//	[0].scrollIntoView();
}

s += "</div>";
$('body').append( s);

$('#div_pane_index').hover(
	function(){
		$(this).css("overflow-y", "scroll" );
		$(this).animate({
			left: 0
		}, 100 );
	},
	function(){
		$(this).css("overflow-y", "hidden" );
		$(this).animate({
			left: -W_PANE
		}, 100 );
	}
);

$('#div_pane_index>span').click( function(){
	$("[anchor_index="+$(this).attr("index")+"]")
		.css("background-color","#ffe600")
		.animate( {backgroundColor:"transparent"}, 2000)
		[0].scrollIntoView();
} );

$("<style type='text/css'> #div_pane_index>span:hover{ background-color:#EEee77 } </style>").appendTo("head");