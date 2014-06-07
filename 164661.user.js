// ==UserScript==
// @name			Craigslist Hide
// @version    		1.0
// @description 	Hides selected craigslist ads
// @include			http*://*.craigslist.*/*
// @exclude			http*://*.craigslist.*/cgi-bin/*
// @exclude			http*://*.craigslist.*/about/*
// @exclude			http*://forums.craigslist.*/*
// @exclude			http*://accounts.craigslist.*/*
// @author 			Jerry: slaaxy@gmail.com the userscript is based on v2.0 of http://userscripts.org/scripts/show/127536 
// ==/UserScript==


var console = unsafeWindow.console;
GM_addStyle ( "                                 \
    #hidden  {               					\
        display:       none;       				\
    }                                           \
" );
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// load jQuery and execute the main function
addJQuery(letsJQuery);
function letsJQuery() {
  ShowHideToggle = 1;  

    if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
      this.GM_getValue=function (key,def) {
          return localStorage[key] || def;
      };
      this.GM_setValue=function (key,value) {
          return localStorage[key]=value;
      };
      this.GM_deleteValue=function (key) {
          return delete localStorage[key];
      };
    }
        
    
	//alert(jQ); // check if the dollar (jquery) function works
	//alert(jQ().jquery); // check jQuery version
	
$(document).ready(function() {
  // Handler for .ready() called.
});	

	
	IDlistArray = String(GM_getValue("IDlist")).split("|");
	IDlistCount = IDlistArray.length - 1;	
	
	jQ('#ef').append('<input type="button" id="UnhideButton" onclick="unhideAll();" value="Unhide All" style="font-size:11px;margin-left:10px;">');
	jQ('#ef').append('<input type="button" id="ShowHideButton" onclick="ShowHidden();" value="Show Hidden" style="font-size:11px;margin-left:10px;">');
	jQ('#ef').append('<span style="margin-left:5px;" id="HiddenCount">[Hidden: '+IDlistCount+']</span>');
	
	jQ('blockquote > p:not(p[align="center"])').prepend(function(i, html) { return '<input title="Hide this listing" type="button" id="hide_'+String(html.match("[0-9]*\.html")).replace(".html","")+'" onclick="hideListing('+String(html.match("[0-9]*\.html")).replace(".html","")+');" value="X" style="position:relative;top:-2px;margin-right:10px;color:#333;font-size:10px;box-shadow: 1px 1px 2px #AAA;">'; });
	
	if (IDlistCount < 1) {
		jQ('#ShowHideButton').attr('disabled','true');
		jQ('#UnhideButton').attr('disabled','true');
	}	
	
	

	for (x in IDlistArray)
	{
		if (IDlistArray[x])
		{
			someID = IDlistArray[x];
			jQ('a[href*="'+someID+'"]').parent().parent().css('display','none');
			jQ('#hide_'+someID+'').parent().attr('id','hidden');
			jQ('p#hidden > input#hide_'+someID).css('display','none');
			jQ('p#hidden > input#hide_'+someID).parent().prepend('<input title="Unhide this listing" type="button" id="unhide_'+someID+'" onclick="unhideListing('+someID+');" value="Unhide" style="position:relative;top:-2px;margin-right:10px;width:70px;color:#333;font-size:10px;box-shadow: 1px 1px 2px #AAA;">');
		}
	}
	
	hideListing = function(someID) {
	  setTimeout(function() {
		listingID = "|"+someID;
		if (!GM_getValue("IDlist")) {
			IDlist = "";
			var checkID = "";
			GM_setValue("IDlist", String(listingID));
		} else {
			IDlist = GM_getValue("IDlist");
			var checkID = IDlist.indexOf(listingID);
			if (checkID == -1) {
				newIDlist = listingID+GM_getValue("IDlist");
				GM_setValue("IDlist", String(newIDlist));
			}
		}
		IDlistArray = String(GM_getValue("IDlist")).split("|");
		IDlistCount = IDlistArray.length - 1;
		jQ('#HiddenCount').html('[Hidden: '+IDlistCount+']');
		if (ShowHideToggle == 0){
			jQ('#hide_'+someID+'').parent().css('opacity','0.3');
            jQ('#hide_'+someID+'').parent().css('display','block');
		} else if (ShowHideToggle == 1){
			jQ('#hide_'+someID+'').parent().css('display','none');
		}
		jQ('#hide_'+someID+'').parent().attr('id','hidden');
		jQ('p#hidden > input#hide_'+someID).css('display','none');
		jQ('p#hidden > input#hide_'+someID).parent().prepend('<input title="Unhide this listing" type="button" id="unhide_'+someID+'" onclick="unhideListing('+someID+');" value="Unhide" style="position:relative;top:-2px;margin-right:10px;width:70px;color:#333;font-size:10px;box-shadow: 1px 1px 2px #AAA;">');
		jQ('#ShowHideButton').removeAttr('disabled');
		jQ('#UnhideButton').removeAttr('disabled');
	  }, 0);
	  


	};

	
	unhideListing = function(someID) {
	  setTimeout(function() {
			remlistingID = "|"+someID;
			IDlist = GM_getValue("IDlist");
			var checkID = IDlist.indexOf(remlistingID);
			if (checkID != -1) 
			{
				newIDlist = IDlist.replace(remlistingID,'');
				GM_setValue("IDlist", String(newIDlist));
			}
		IDlistArray = String(GM_getValue("IDlist")).split("|");
		IDlistCount = IDlistArray.length - 1;
		jQ('#HiddenCount').html('[Hidden: '+IDlistCount+']');
		jQ('#hide_'+someID+'').parent().css('display','block');
		jQ('#hide_'+someID+'').parent().css('opacity','1');
		jQ('#unhide_'+someID+'').remove();
		jQ('#hide_'+someID+'').css('display','inline');
		jQ('#hide_'+someID+'').parent().removeAttr('id');
		IDlistArray = String(GM_getValue("IDlist")).split("|");
		IDlistCount = IDlistArray.length - 1;		
		if (IDlistCount < 1) {
			jQ('#ShowHideButton').attr('disabled','true');
			jQ('#UnhideButton').attr('disabled','true');
		}	
	  }, 0);
	};

	unhideAll = function() {
	  setTimeout(function() {
		GM_deleteValue("IDlist");
		location.reload();
	  }, 0);
	};

	ShowHidden = function() {
	  setTimeout(function() {	
		IDlistArray = String(GM_getValue("IDlist")).split("|");
		if (ShowHideToggle == 1) {
			for (x in IDlistArray)
			{
				if (IDlistArray[x])
				{
					jQ('a[href*="'+IDlistArray[x]+'"]').parent().parent().css('display','block');
					jQ('a[href*="'+IDlistArray[x]+'"]').parent().parent().css('opacity','0.3');
				}
			}
			jQ('#ShowHideButton').attr('value','Hide Again');
			ShowHideToggle = 0;
		} else if (ShowHideToggle == 0) {
			for (x in IDlistArray)
			{
				if (IDlistArray[x])
				{
					jQ('a[href*="'+IDlistArray[x]+'"]').parent().parent().css('display','none');
				}
			}
			jQ('#ShowHideButton').attr('value','Show Hidden');
			ShowHideToggle = 1;
		}
				
		
	  }, 0);		
	}

}
