// ==UserScript==
// @name        Use Chosen JQuery Plugin on Host My Site Website DropDowns
// @namespace   com.visionlinemedia.www
// @description Use Chosen JQuery Plugin on Host My Site Website DropDowns
// @include     https://my.hostmysite.com/*
// @matches     https://my.hostmysite.com/*
// @version     1
// @require     https://raw.github.com/kilrizzy/Host-My-Site-Chosen/master/resources/jquery-1.11.0.min.js
// @require     https://raw.github.com/kilrizzy/Host-My-Site-Chosen/master/resources/chosen/chosen.jquery.min.js
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addStuff() {  
	var disabled = false;
	$("#header #sel_sub_id option").each(function() {
	    var text = $(this).text();
	    if(text == "== Disabled Hosting Subscriptions =="){
	    	//mark remaining items as disabled
			disabled = true;
		}
		if(text == "== Views =="){
			disabled = false;
		}
	    text = text.replace("(", "");
	    text = text.replace(")", "");
	    text = text.replace("Linux Shared Hosting Standard", "LSHS - ");
	    text = text.replace("Reseller Linux Starter Yearly", "RLSY");
	    text = text.replace("Reseller Linux Builder Yearly", "RLBY");
	    text = text.replace("Reseller Linux Builder Plus Yearly", "RLBY");
	    text = text.replace("Reseller Linux Standard Yearly", "RLSY");
	    text = text.replace("Reseller Foundation Yearly", "RFY");
	    text = text.replace("Linux Builder Yearly", "LBY");
	    if(disabled){
	    	text = text+' <span style="color:#FF0000;">X</span>';
	    }
	    $(this).html(text);
	});
	
	var link = document.createElement('LINK');
	link.rel = 'stylesheet';
	link.href = 'https://raw.github.com/kilrizzy/Host-My-Site-Chosen/master/resources/chosen/chosen.min.css';
	link.type = 'text/css';
	document.body.insertBefore(link, null);
	
	startChosen();
}

function startChosen()
{
    $('#header #sel_sub_id').chosen();
    addStyles();
}
function addStyles(){
	//CSS
	var css = '														\
		#header{													\
			height: 150px;											\
			position: relative;										\
		}															\
		#header .top-user-info-row{									\
			position: absolute;										\
			left: 0px;												\
			top: 0px;												\
			width: 960px;											\
		}															\
		#header #user_name{											\
			position: absolute;										\
			top: 5px;												\
			right: 0px;												\
		}															\
		#header .shortcuts{											\
			float: none;											\
		}															\
		#header .logo,#header #sub_caption,							\
		#header .top-logout,#header .top-help{						\
			display: none;											\
		}															\
		#header .chosen-results{										\
			width: 960px;											\
			height: 90px;											\
			overflow-y: scroll;										\
			overflow-x: hidden;										\
			margin-top: 5px;										\
			border-bottom:double 3px #DDD;							\
		}															\
		#header .chosen-results li{									\
			display: none;											\
			padding:5px;											\
			font-size:9px;											\
			float: left !important;									\
			width: 210px !important;								\
			margin-right:5px;										\
			margin-bottom:5px;										\
			background-color: #EEE;									\
			border-radius: 3px;										\
		}															\
		#header .chosen-results li.active-result{						\
			display: block !important;								\
		}															\
	';
	css = '<style>'+css+'</style>';
	$('head').append(css);
}
// load jQuery and execute the main function
addStuff();
//alert('test');//