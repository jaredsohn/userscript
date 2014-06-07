// ==UserScript==
// @name        SchoolOnlineBe_PuntenboekLeerkrachtEdit
// @namespace   http://www2.schoolonline.be/
// @description Maak het gemakkelijker om commentaar lijnen toe te voegen uit een vaste lijst met zinnen
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include		https://www2.schoolonline.be/*/PuntenboekLeerkracht/PuntenboekLeerkrachtEdit.php?*
// @include		https://*.schoolonline.be/PuntenboekLeerkracht/PuntenboekLeerkrachtEdit.php?*
// @include		file:///home/thomas/projects/SarahHomeWork/EasyCommentMashup/POC3/PuntenboekLeerkrachtEdit.html
// @version     1.0.6
// ==/UserScript==

log=GM_log;
//Comment next line to enable logging into javascript error console
log=function(){};
gmCacheDataKey="FixedCommentList";


try {
    	addEventListener("load", function() {
			 addStyle();
			 addFixedList();
			 initPopupFields();
			 setInterval(function() {keepAlive();}, 60000 );
	    },0);
} catch(e) { log(e); throw(e) }

function addFixedList() {
	log("Adding fixed list");	

	$('select[name^="VakLinkLeerkrachtKlasDoel"]').parent().append('<br>mogelijke commentaar lijnen <textarea COLS=100 ROWS=6 id="myFixedList">'+ GM_getValue(gmCacheDataKey,"")+'</textarea>');
	$('#myFixedList').change(function() {
		log("Fixed list changes, updating GM cached value:"+$(this).val());
		GM_setValue(gmCacheDataKey,$(this).val());
	});
}


function keepAlive() {
	log("Keep session "+getParameterByName('SessionID')+" alive...");
	var keepAliveUrl= $(location).attr('protocol')+'//'+$(location).attr('host')+'/PuntenboekLeerkracht/PuntenboekLeerkrachtRapportPrintHistory.php?SessionID='+getParameterByName('SessionID');
	callUrl(keepAliveUrl);
}

function callUrl(myUrl) {
	log("Calling "+myUrl);	
	
  GM_xmlhttpRequest({
    method: "GET",
    url: myUrl,
    headers: {
      "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
      "Accept": "text/xml"            // If not specified, browser defaults will be used.
    },
    onload: function(response) {

    // It is a page, but first let's check for a 404.
    if(response.status == 404){
      log([
        "404 - Page not found! Report:",
        response.status,
        response.statusText,
        response.readyState,
        response.responseHeaders,
        //response.responseText,
        response.finalUrl,
        "End of report."
      ].join("\n"));
      return;
    }


    var res = response.responseText;
		
    log([
      "Beginning of page notes:",
      response.status,
      response.statusText,
      response.readyState,
      response.responseHeaders,
      response.finalUrl,
      "End of page notes."
    ].join("\n"));

	//parseData(res);
		
    },
    onerror: function(response) {
      log([
        "Beginning of error message:",
        response.status,
        response.statusText,
        response.readyState,
        response.responseHeaders,
        response.responseText,
        response.finalUrl,
        "End of error message."
      ].join("\n"));
    
    }

  });
	
}

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function initPopupFields() {
	log("Init popup fields");	

	$('textarea[id^="EvaluatieMomentLijnCommentaar"]').each(function() {
		$(this).attr("onmouseover","if ($(this).val().length > 0) {return overlib($(this).val(), DELAY, 0, TIMEOUT, 0 ,CAPTION, 'Commentaar');} else { return void(0);};");
		$(this).attr("onmouseout","return nd();");
		$(this).popBox();
	});		
}

function addStyle() {
	log("Init popup Style");
	GM_addStyle(".popBox-holder { display:none; position: fixed; left: 0px; top: 0px; width:100%; height:100%; text-align:center; z-index: 900; background-color:#000; filter:alpha(opacity=40); opacity:0.5; }");
	GM_addStyle(".popBox-container { display:none; overflow: auto; background-color: #fff; border:4px solid #000; padding:10px; text-align:left; z-index: 9999; -webkit-border-radius: .5em;  -moz-border-radius: .5em; border-radius: .5em; -webkit-box-shadow: 0 0px 25px rgba(0,0,0,.9); -moz-box-shadow: 0 0px 25px rgba(0,0,0,.9); box-shadow: 0 1px 2px rgba(0,0,0,.2); border: 5px solid rgb(000, 0, 0); border: 5px solid rgba(000, 0, 0, .9); position: fixed;}");
	GM_addStyle(".popBox-container .done-button{ margin-top:10px;}");
	GM_addStyle(".popBox-container .button { display: inline-block; zoom: 1; *display: inline; vertical-align: baseline; margin: 0 2px; outline: none; cursor: pointer; text-align: center; text-decoration: none; font: 14px/100% Arial, Helvetica, sans-serif; padding: .5em 2em .55em; text-shadow: 0 1px 1px rgba(0,0,0,.3); -webkit-border-radius: .5em;  -moz-border-radius: .5em; border-radius: .5em; -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2); -moz-box-shadow: 0 1px 2px rgba(0,0,0,.2); box-shadow: 0 1px 2px rgba(0,0,0,.2);}");
	GM_addStyle(".popBox-container .button:hover { text-decoration: none;}");
	GM_addStyle(".popBox-container .button:active { position: relative; top: 1px;}");
	GM_addStyle(".popBox-container .small { font-size: 11px; padding: .2em 1em .275em;}");
	GM_addStyle(".popBox-container .blue { color: #d9eef7; border: solid 1px #0076a3; background: #0095cd; background: -webkit-gradient(linear, left top, left bottom, from(#00adee), to(#0078a5)); background: -moz-linear-gradient(top, #00adee, #0078a5); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00adee', endColorstr='#0078a5');}");
	GM_addStyle(".popBox-container .blue:hover { background: #007ead; background: -webkit-gradient(linear, left top, left bottom, from(#0095cc), to(#00678e)); background: -moz-linear-gradient(top, #0095cc, #00678e); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0095cc', endColorstr='#00678e');}");
	GM_addStyle(".popBox-container .blue:active { color: #80bed6; background: -webkit-gradient(linear, left top, left bottom, from(#0078a5), to(#00adee)); background: -moz-linear-gradient(top, #0078a5, #00adee); filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#0078a5', endColorstr='#00adee');}");		
}


(function ($) {
    $.fn.popBox = function (options) {

        var defaults = {
            height: 500,
            width: 800,
            newlineString: " "
        };
        var options = $.extend(defaults, options);


        return this.each(function () {

            obj = $(this);

            var inputName = 'popBoxInput' + obj.attr("Id");
            var doneButtonName = 'doneButton' + obj.attr("Id");
            var cancelButtonName = 'cancenButton' + obj.attr("Id");
            var labelValue = $("label[for=" + obj.attr('id') + "]").text();

            obj.after('<div class="popBox-holder"></div><div class="popBox-container"><label style="display: none;" for="' + inputName + '">' + labelValue + '</label> <div class="popBox-container-checkboxes"></div><div class="done-button"><input type="button" id="'+doneButtonName+'" value="Done" class="button blue small"/><input type="button" id="'+cancelButtonName+'" value="Cancel" class="button blue small"/></div><div class="cancel-button" id="'+cancelButtonName+'"></div></div>');
            obj.focus(function () {
				GM_addStyle("#top_nav {z-index: 0;}");
                $(this).next(".popBox-holder").show();
                var popBoxContainer = $(this).next().next(".popBox-container");
                var change = true;
                popBoxContainer.css({ maxHeight: options.height, width: options.width });
                popBoxContainer.show();

                var winH = $(window).height();
                var winW = $(window).width();
                var objH = popBoxContainer.height();
                var objW = popBoxContainer.width();
                var left = (winW / 2) - (objW / 2);
                var top = (winH / 2) - (objH / 2);
                var top=50;
                var arrayFixedList = $('#myFixedList').val().split('\n');
                var variableString = $(this).val();
                
                popBoxContainer.children(".popBox-container-checkboxes").empty();
                var selectCounter=0;
                var selectCounterView="";
                var initContainer = [];
                $.each(arrayFixedList, function(index,value) {
					if (value.trim().length != 0) {
						initContainer[index] = {
							counter: -1,
							fixedIndex: index,
							positionInVariableString : variableString.indexOf(value),
							comment: value
						}
					}
				});
				initContainer.sort(function(a,b) {
					return a.positionInVariableString - b.positionInVariableString;
				});
				$.each(initContainer, function(index,obj) {
					if (obj.positionInVariableString >= 0) {
						obj.counter = ++selectCounter;
					}					
				});
				initContainer.sort(function(a,b) {
					return a.fixedIndex - b.fixedIndex;
				});
				$.each(initContainer, function(index,obj) {
					popBoxContainer.children(".popBox-container-checkboxes").append('<div><input type="checkbox" class="popBox-checkbox-'+index+'" value="'+index+'" '+((obj.counter >0) ?"checked":"")+'><div class="popBox-SelectIndex" style="display: inline; min-height: 1px; width: 20px; float: left;">'+((obj.counter >0)? obj.counter : "") +'</div> '+obj.comment+'</input><div>');
				});				
                				
                popBoxContainer.css({ position: 'fixed', margin: 0, top: (top > 0 ? top : 0) + 'px', left: (left > 0 ? left : 0) + 'px' });
                popBoxContainer.children(".popBox-container-checkboxes").find('.popBox-checkbox-0').focus();


                popBoxContainer.children().keydown(function (e) {
					
                    if (e == null) { // ie
                        keycode = event.keyCode;
                    } else { // mozilla
                        keycode = e.which;
                    }
					log("keydown on popContainerChildren:"+keycode);
                    if (keycode == 27) { // escape
						GM_addStyle("#top_nav {z-index: 1;}");
                        $(this).parent().hide();
                        $(this).parent().prev().hide();
                        change = false;
                    }
                    if (keycode == 13) { // enter
						log("enter pressed:");						
						$('#'+doneButtonName).trigger('click');
						
                    }                    
                });

				popBoxContainer.children(".popBox-container-checkboxes").find('input').click(function(e) {					
					if ($(this).is(':checked')) {// Add next selectCounter value;						
						$(this).next().text(++selectCounter);
					} else {//Remove selectCounter + subscract one from all NEXT selectCounters
						var myCounter=parseInt($(this).next().text());
						$(this).next().text("");
						$(this).parent().parent().find(':checked').each(function(index) {
							if (parseInt($(this).next().text())>myCounter) {
								$(this).next().text(parseInt($(this).next().text()-1));
							}
						});
						selectCounter--;					
					}
				});

				popBoxContainer.children('.done-button').children('#'+cancelButtonName).click(function () {
						GM_addStyle("#top_nav {z-index: 1;}");
                        $(this).parent().parent().hide();
                        $(this).parent().parent().prev().hide();
                        change = false;					
				});

                popBoxContainer.children('.done-button').children('#'+doneButtonName).click(function () {
                    if (change) {
						GM_addStyle("#top_nav {z-index: 1;}");
                        $(this).parent().parent().hide();
                        $(this).parent().parent().prev().hide();
                        $(this).parent().parent().prev().prev().val('');

                        var container = [];
                        $(this).parent().parent().find('.popBox-container-checkboxes').find(':checked').each(function(index) {
							container[index] = {
								counter: parseInt($(this).next().text()),
								fixedIndex: $(this).val()
							}
                        });
						container.sort(function(a,b) {
							return a.counter - b.counter;
						});
                        
                        var newString = '';                        
                        $.each(container, function(index,obj) {
							if (newString.length > 0 ) {
								newString = newString + '\n' + arrayFixedList[obj.fixedIndex];
							}else {
								newString = arrayFixedList[obj.fixedIndex];
							}														
						});
                        
                        $(this).parent().parent().prev().prev().val(newString.replace(/\n/g, options.newlineString));
                    }
                });

            });

        });

    };

})(jQuery);

