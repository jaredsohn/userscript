// ==UserScript==
// @name           Scoutify
// @namespace      FPL
// @description    Scoutify your squad into a format suitable for posting on www.fantasyfootballscout.co.uk. Send feedback to merkin@idnet.com.
// @include        http://fantasy.premierleague.com/*
// ==/UserScript==


function CorrectPage()
{

	if (document.URL.match("http://fantasy.premierleague.com/transfers/"))
	{
	$('<input style="padding: 3px 5px; float: right; background-color: #008F5D;" id="scoutifyBtn" class="ui-button ui-widget ui-state-default ui-corner-all" value="Scoutify" type="reset" role="button" aria-disabled="false">').insertAfter('#ismReset');
	
	$('body').append($('<div id="popupbox" class="window ui-dialog ui-widget ui-widget-content ui-corner-all ism ui-draggable" style="position:fixed; display:none; z-index:9999; padding:20px; background-color: #fff;"><div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span id="ui-dialog-title-ismEiw" class="ui-dialog-title">Scoutify</span><a class="ui-dialog-titlebar-close ui-corner-all" href="#" role="button"><span class="ui-icon ui-icon-closethick">close</span></a></div><div id="ismEiw" class="ismDialog ui-dialog-content ui-widget-content"><div class="inner"></div></div>'));
	
	$('body').append($('<div id="mask" style="position:absolute; top:0; left:0; opacity:0.8; z-index:9998; background-color:#000; display:none;"></div>'));
	
	
	
	$('#popupbox a.ui-dialog-titlebar-close').click(function (e) {
        $('#mask, .window').hide();
        $('#popupbox div.inner').empty();
        return false;
  });   
	
	$("#scoutifyBtn").click(function() {
        scoutifyTransfers();  
  });	
	}		
	
	if (document.URL.match("http://fantasy.premierleague.com/my-team/"))
	{

	$('.ismSB').append($('<div style="clear: both"><input style="padding: 3px 5px; clear: both; background-color: #008F5D;" id="scoutifyBtn" class="ui-button ui-widget ui-state-default ui-corner-all" value="Scoutify" type="reset" role="button" aria-disabled="false"></div>'));
	
		$('body').append($('<div id="popupbox" class="window ui-dialog ui-widget ui-widget-content ui-corner-all ism ui-draggable" style="position:fixed; display:none; z-index:9999; padding:20px; background-color: #fff;"><div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span id="ui-dialog-title-ismEiw" class="ui-dialog-title">Scoutify</span><a class="ui-dialog-titlebar-close ui-corner-all" href="#" role="button"><span class="ui-icon ui-icon-closethick">close</span></a></div><div id="ismEiw" class="ismDialog ui-dialog-content ui-widget-content"><div class="inner"></div></div>'));
	
	$('body').append($('<div id="mask" style="position:absolute; top:0; opacity:0.8; left:0; z-index:9998; background-color:#000; display:none;"></div>'));	
	
	$('#popupbox a.ui-dialog-titlebar-close').click(function (e) {
        $('#mask, .window').hide();
        $('#popupbox div.inner').empty();
        return false;
  });  
	
	$("#scoutifyBtn").click(function() {
        scoutifyTeam();  
    });		
  }	
  
  
}
	


function scoutifyTransfers() {

    // Loop and output keepers to var
    var gks = '';    
    $('.ismPitchRow1 div.ismPlayerContainer').each(function(i, obj) {
     gks += $(this).find(".ismPitchWebName").text();
     if (i != $('.ismPitchRow1 div.ismPlayerContainer').length-1) {
    gks += " / "
    }
    });
        
    // Loop and output defenders to var
    var defs = '';
    $('.ismPitchRow2 div.ismPlayerContainer').each(function(i, obj) {
    defs += $(this).find(".ismPitchWebName").text();
    if (i != $('.ismPitchRow2 div.ismPlayerContainer').length-1) {
      defs += " / "
      }
    });
    
    // Loop and output midfielders to var
    var mids = '';
    $('.ismPitchRow3 div.ismPlayerContainer').each(function(i, obj) {
     mids += $(this).find(".ismPitchWebName").text();
    if (i != $('.ismPitchRow3 div.ismPlayerContainer').length-1) {
    mids += " / "
    }
    });
        // Loop and output forwards to var
    var fors  = '';
    $('.ismPitchRow4 div.ismPlayerContainer').each(function(i, obj) {
     fors += $(this).find(".ismPitchWebName").text();
    if (i != $('.ismPitchRow4 div.ismPlayerContainer').length-1) {
    fors += " / "
    }
    });
    
    var squad = gks + "<br />" + defs + "<br />" + mids + "<br />" + fors + "<br /> <br />";
    
    squad += $('div.ismSBFreeTransfer').text() + " FT, " + $('div#ismToSpend').text() + "m in the bank.";
    
    $('#popupbox div.inner').append(squad);
    $('#popupbox div.ismDialog').fadeIn(0);
    
     //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
     
        //Set height and width to mask to fill up the whole screen
        $('#mask').css({'width':maskWidth,'height':maskHeight});
         
        //transition effect    
        $('#mask').fadeIn(500);   
    
    //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();
               
        //Set the popup window to center
        $('#popupbox').css('top',  winH/2-$('#popupbox').height()/2);
        $('#popupbox').css('left', winW/2-$('#popupbox').width()/2);
     
        //transition effect
        $('#popupbox').fadeIn(100); 
    


}

function scoutifyTeam() {

    // Loop and output keepers to var
    var gks = '';
    
    $('.ismPitchRow1 div.ismPlayerContainer').each(function(i, obj) {
     gks += $(this).find(".ismPitchWebName").text();
     if ($(this).find(".ismCaptainOn").length) {
      gks += "(c)";
      } else if ($(this).find(".ismViceCaptainOn").length) {
        gks += "(vc)";
        } 
        
     if (i != $('.ismPitchRow1 div.ismPlayerContainer').length-1) {
    gks += " / "
    }
    });
    
        // Loop and output defenders to var
    var defs = '';
    $('.ismPitchRow2 div.ismPlayerContainer').each(function(i, obj) {
     defs += $(this).find(".ismPitchWebName").text();
     if ($(this).find(".ismCaptainOn").length) {
      defs += "(c)";
      } else if ($(this).find(".ismViceCaptainOn").length) {
        defs += "(vc)";
        }
    if (i != $('.ismPitchRow2 div.ismPlayerContainer').length-1) {
    defs += " / "
    }
    });
        // Loop and output midfielders to var
    var mids = '';
    $('.ismPitchRow3 div.ismPlayerContainer').each(function(i, obj) {
     mids += $(this).find(".ismPitchWebName").text();
     if ($(this).find(".ismCaptainOn").length) {
      mids += "(c)";
      } else if ($(this).find(".ismViceCaptainOn").length) {
        mids += "(vc)";
        }
        
    if (i != $('.ismPitchRow3 div.ismPlayerContainer').length-1) {
    mids += " / "
    }
    });
        // Loop and output forwards to var
    var fors  = '';
    $('.ismPitchRow4 div.ismPlayerContainer').each(function(i, obj) {
     fors += $(this).find(".ismPitchWebName").text();
     if ($(this).find(".ismCaptainOn").length) {
      fors += "(c)";
      } else if ($(this).find(".ismViceCaptainOn").length) {
        fors += "(vc)";
        }
    if (i != $('.ismPitchRow4 div.ismPlayerContainer').length-1) {
    fors += " / "
    }
    });
            // Loop and output subs to var
    var subs  = '';
    $('.ismPitchRow5 div.ismPlayerContainer').each(function(i, obj) {
     subs += $(this).find(".ismPitchWebName").text();
    if (i != $('.ismPitchRow5 div.ismPlayerContainer').length-1) {
    subs += " / "
    }
    });
    var squad = gks + "<br />" + defs + "<br />" + mids + "<br />" + fors + "<br /> <br />" + subs;
   
   $('#popupbox div.inner').append(squad);
    $('#popupbox div.ismDialog').fadeIn(0);
    
     //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
     
        //Set height and width to mask to fill up the whole screen
        $('#mask').css({'width':maskWidth,'height':maskHeight});
         
        //transition effect    
        $('#mask').fadeIn(500);
    
    //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();
               
        //Set the popup window to center
        $('#popupbox').css('top',  winH/2-$('#popupbox').height()/2);
        $('#popupbox').css('left', winW/2-$('#popupbox').width()/2);
     
        //transition effect
        $('#popupbox').fadeIn(100); 
}

function InsertJSIntoPage()
{
  // THANKS TO RAZZA!
	// Running in chrome
	// Insert this script in to the actual page so it can be evaluated in that isolated world
	var script = document.createElement('script'); 
	script.type = 'text/javascript'; 
	script.src =  chrome.extension.getURL('script.js'); // "http://localhost/34049.user.js?" + Math.random(); // 'http://userscripts.org/scripts/source/34047.user.js' - Use this to always use latest version
	document.body.appendChild(script); 
}

if (!(typeof chrome === 'undefined'))
{
  if (typeof unsafeWindow === 'undefined') {
	// In chrome, but not inside the document's isolated world so can't access JS variables
	InsertJSIntoPage();
	} else {
  $ = unsafeWindow.$;
  ISM = unsafeWindow.ISM;
  $(document).ready(function() {var t=setTimeout(CorrectPage,500);});
  }
    
}
else
{
    
	$ = unsafeWindow.$;
	ISM = unsafeWindow.ISM;
	$(document).ready(function() {var t=setTimeout(CorrectPage,500);});
	
}