// ==UserScript==
// @name           Google Suggest 4 Google Insights for Search
// @namespace      http://spanishgringo.blogspot.com
// @description    Add Google Suggest functionality to Google Insights for Search
// @include        http://www.google.*/insights/search/*
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
       
		 
		 
		  var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');
            GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            //GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
		
			
			
			GM_JQUI = document.createElement('script');
            GM_JQUI.src = 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.js';
            GM_JQUI.type = 'text/javascript';
          //  GM_JQUI.async = true;
    
            GM_Head.insertBefore(GM_JQUI, GM_Head.lastChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            unsafeWindow.setTimeout(GM_wait, 110);
        } else {
            jQuery = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
		var cache = {};
		
		jQuery("<style>  .ui-autocomplete {border:1px dotted; background:#fff; max-width:328px;width:100%;float:left;padding:4px 2px 6px 0; cursor:default;} .ui-widget-content {color:#222222;} .ui-widget {font-size:.9em;} .ui-menu {list-style:none outside none;}  .ui-widget-content a { color:#222222; } .ui-widget:active {outline:medium none;} .ui-widget-content a {color:#333333;} .ui-menu .ui-menu-item {clear:left;float:left;margin:0;padding:0;width:100%;} .ui-menu .ui-menu-item a {display:block; line-height:1.8;padding:2px 0 2px 6px;text-decoration:none;border-bottom:1px dashed #ddd;} .ui-menu-item a:hover, .ui-menu-item a.ui-state-hover {background:#5F5F5F;color:gold;font-weight:bold;border-bottom:1px dashed #fff} #langSelector {font-size:0.9em;margin:1px 8px 0px 76px;width:130px;height:1.7em;} </style>").appendTo('head');
		
		jQuery(".multiPickerTable input").autocomplete({
			source: function(request, response) {
				if (cache.term == request.term && cache.content) {
					response(cache.content);
				}
				if (new RegExp(cache.term).test(request.term) && cache.content && cache.content.length < 13) {
					var matcher = new RegExp(jQuery.ui.autocomplete.escapeRegex(request.term), "i");
					response(jQuery.grep(cache.content, function(value) {
	    				return matcher.test(value.value)
					}));
				}
				//unsafeWindow.console.log("autocomplete being called");
				jQuery.ajax({
					//url: "/complete/search?client=hp&q="+ encodeURI(jQuery(this).val()) +"&cp=20&hl=en",
					//url: "http://www.google.com/complete/search?ds=&client=suggest&hjson=t&gl=es&hl=es&q="+ encodeURI(jQuery(this).val()),
					url: "http://www.google.com/complete/search",
					dataType: "json",
					data: {
						gl: jQuery("#resPckrgeoC").val().toLowerCase(),
						hl: jQuery("#langSelector").val(),
						ds: "",
						client: "suggest",
						hjson: "t",
						q: request.term.replace(/^[\+ \.\-\s\W]*/gi,"")
					},
					beforeSend: function(xhr){
						//unsafeWindow.console.log(request.term.replace(/^[\+ \.\-\s\W]*/gi,""));
					
					},
					focus: function(event, ui) {
						$(this).val(ui.item.value);
						return false;
					},
					success: function(data) {
						cache.term = request.term.replace(/^[\+ \.\-\s\W]*/gi,"");
						//loop through to build the array from JSON
						var terms = new Array();
						//unsafeWindow.console.log(data[1]);
						for (var i in data[1]){
							terms[i] = data[1][i][0];//+" | "+ data[1][i][1];
						}
						cache.content = terms;
						response(terms);
					}
				});
			},
			minLength: 3,
			select: function(event, ui) {
				jQuery(this).val(ui.item ? ui.item.value : this.value);
				//jQuery("#cmpPckrqP0T").val("","none");
				return false;
			}
		});
	//add spanishgringo credit
	jQuery("#main").css("position","relative").prepend("<p style='position:absolute;z-index:999;left:14px;top:27px;font-size:.9em;font-weight:bold;' id='userCredit'><em>enhanced with Google Suggest</em> <a style='position:relative;display:inline-block;left:6px;' href='http//spanishgringo.blogspot.com'>by Spanishgringo</a></p>");

	//setup language select box
	var cssLang = jQuery("link[rel=Stylesheet]").attr("href");
	cssLang = cssLang.substr(cssLang.lastIndexOf("/"));
	switch(cssLang.match("_"))
	{
		case 1:
			cssLang = cssLang.substr(cssLang.lastIndexOf("_")+1,2)
		break;
		
		case 2:
			cssLang = cssLang.substr(cssLang.lastIndexOf("_")-2,2)
		break;
		
		default: 
			cssLang="en";
	}
		
	var selectHTML = "<select id='langSelector' ><option value='"+ cssLang +"' selected>"+jQuery('#lsis a').text()+"</option></select>";
	jQuery(selectHTML).insertAfter('#mulColTdate');
	
	jQuery(".localeSelectorInternal a").each(function(){
		var href = jQuery(this).attr("href");
		jQuery("<option value='"+ href.substr(href.lastIndexOf("=")+1,2) +"'>"+ jQuery(this).text() +"</option>").appendTo('#langSelector');
	});


    }