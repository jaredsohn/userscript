/*
 Google Local View Based Refresh User Script
 version 0.1 BETA
 04-05-2006
 Copyright (c) 2006, Chris McKeever
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 I try to monitor the Grease Monkey Mail List.
 http://www.mozdev.org/mailman/listinfo/greasemonkey
 Please post questions/comments and suggestions.

 
 This script adds a Pseduo-AJAX interface interaction similiar to the GMaps API
 to the Google Local Search Page.


 --------------------------------------------------------------------

 This is a Greasemonkey user script.

 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
 Then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Google Local View Based Refresh", and click Uninstall.

 --------------------------------------------------------------------
*/

// ==UserScript==
// @name            Auto View Based Refresh - Google Local
// @namespace       http://r2unit.com/greasemonkey
// @description     Updates Local Search Results with Map Move
// @include         http://maps.google.com/*
// @include         http://local.google.com/*
// @include         http://*.google.com/loc*
// @include         http://google.com/loc*
// ==/UserScript==


if (top == self){
  unsafeWindow.addEventListener('load', function(){
		
	if (!unsafeWindow.GEvent) return;

	vbr_add();

	// overwrite the loadVPage function to add listeners _after_ they have been rendered
	window.location.href = "javascript:(function(){ "
				+ " window.loadVPage = function(vPage, stateBox){"
				+ " gInitialPage = false;"
				+ " eval(\"try { e('q_d').focus(); } catch (e) {}\");"
				+ " if (gApplication) {"
				+ "  gApplication.clear();"
				+ " }"
				+ " loadVPageText(vPage);"
				+ " if (!gApplication) {"
				+ "  gPendingVPage = vPage;"
				+ "  gPendingState = stateBox;"
				+ "  return;"
				+ " } else {"
				+ "  gApplication.loadVPage(vPage, stateBox);"
				// added listener magic
				+ "  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';"
				+ "  for (var c=0; c<26; c++) {"
				+ "   var m_id = alpha.charAt(c); "
				+ "   if (gApplication.getMarker(m_id)){ "
				+ "    GEvent.addListener(gApplication.getMarker(m_id),'infowindowopen',function(m_id){"
                                + "     if (document.getElementById('vbr').checked == 1){"
				+ "      document.getElementById('vbr_m').value = 0;"
				+ "      document.getElementById('vbr_i').innerHTML = '<I>Info Window Open</I>';"
				+ "     }"
				+ "    });"
				+ "    GEvent.addListener(gApplication.getMarker(m_id),'infowindowclose',function(m_id){"
                                + "     if (document.getElementById('vbr').checked == 1){"
				+ "      document.getElementById('vbr_m').value = 2;"
				+ "      document.getElementById('vbr_i').innerHTML = '';"
				+ "     }"
				+ "    });"
				+ "   }"
				+ "  }"
				// end added code
				+ "  updatePageUrl();"
				+ " }"
				+ " }" // end overwrite function
                                + "  })();";


	// listener event for map move
	unsafeWindow.GEvent.addListener(unsafeWindow.gApplication.getMap(),'moveend',function(){

		var t = 1;
		if (document.getElementById('vbr_m').value == 2) {
			// race condition for markers off map and move triggers a refresh
			t = 500;
		} else if (document.getElementById('vbr_m').value != 1) return;

		setTimeout(function(){
			if (document.getElementById('vbr_m').value == 0) return;
			document.getElementById('vbr_m').value = 1;
                        window.location.href = "javascript:(function(){ "
                        	+ "  var form_n; "
                                // check which form is active
                                + "  if (document.getElementById('q_f').style.display != 'none'){ "
                                + "     form_n = 'q_form';               "
                                + "     if(document.getElementById('q_d').value == '') return;"
                                + "  }else if (document.getElementById('l_f').style.display != 'none'){ "
                                + "     form_n = 'l_form'; "
                                + "     if(document.getElementById('l_d').value == '') return;"
                                + "  }else { "
                                + "     return; "
                                + "  } "
                                + "  window.updatePageUrl;"
                                // trigger the page search submit and onsubmit function
                                + "  window.onSearch(document.getElementById(form_n)); "
                                + "  document.getElementById(form_n).submit();"
                                + "  })();";
		},t);

	});

	 // listener event for map zoom
	unsafeWindow.GEvent.addListener(unsafeWindow.gApplication.getMap(),'zoom',function(){

		var t = 1;
                if (document.getElementById('vbr_m').value == 2) {
			// race condition for markers off map and move triggers a refresh
                	t = 500;
               	} else if (document.getElementById('vbr_m').value != 1) return;

                setTimeout(function(){
                	if (document.getElementById('vbr_m').value == 0) return;
                        document.getElementById('vbr_m').value = 1;
                        window.location.href = "javascript:(function(){ "
                                + "  var form_n; "
                                // check which form is active
                                + "  if (document.getElementById('q_f').style.display != 'none'){ "
                                + "     form_n = 'q_form';               "
                                + "     if(document.getElementById('q_d').value == '') return;"
                                + "  }else if (document.getElementById('l_f').style.display != 'none'){ "
                                + "     form_n = 'l_form'; "
                                + "     if(document.getElementById('l_d').value == '') return;"
                                + "  }else { "
                                + "     return; "
                                + "  } "
                                + "  window.updatePageUrl;"
                                // trigger the page search submit and onsubmit function
                                + "  window.onSearch(document.getElementById(form_n)); "
                                + "  document.getElementById(form_n).submit();"
                                + "  })();";
		},t);

	});

	// if page loads with markers (from a direct link) - add listeners after page load
	var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var c=0; c<26; c++) {
                var marker = alpha.charAt(c);
                if (unsafeWindow.gApplication.getMarker(marker)){
                        unsafeWindow.GEvent.addListener(unsafeWindow.gApplication.getMarker(marker),'infowindowopen',function(){
				if (document.getElementById('vbr').checked == 1){
	                                document.getElementById('vbr_m').value = 0;
					document.getElementById('vbr_i').innerHTML = "<I>Info Window Open</I>";
				}
                        });

                        unsafeWindow.GEvent.addListener(unsafeWindow.gApplication.getMarker(marker),'infowindowclose',function(){
				if (document.getElementById('vbr').checked == 1){
                                	document.getElementById('vbr_m').value = 2;
					document.getElementById('vbr_i').innerHTML = "";
				}
                        });
                }
        }

  },false)
}


function vbr_add(){
	// create VBR toggle
        var search_option, newElement, ex_span;

	if (top == self){
          search_option = document.getElementById('d_l');
          if (search_option) {
                newElement = document.createElement('div');
                search_option.parentNode.insertBefore(newElement, search_option.nextSibling);
		if (newElement.innerHTML == '') {
	                newElement.innerHTML = "<INPUT TYPE=checkbox id='vbr' checked onClick=\"javascript:(function(){"
				+ " var vbr_m = getElementById('vbr_m');"
				+ " if (vbr_m.value == 1){ vbr_m.value = 0; } else {vbr_m.value = 1; }" 		
				+ "})();\"/>&nbsp;<SPAN id=vbr_t>View Based Refresh</SPAN>&nbsp;<SPAN id=vbr_i></SPAN>" 
				+ "<input type='hidden'  id='vbr_m' value=1 name=vbr_m />";
		}
		ex_span = xpath("//span[@class='example']");
		ex_span[0].innerHTML = ex_span[0].innerHTML + "<BR>Search Requests using VBR can not have location information (i.e. \"Coffee Chicago\")";
          }
	}
	unsafeWindow.resizeMap();
}


function xpath(pattern){
	// simple xpath parser
	var a_emt = new Array();
    	var sshot = document.evaluate(pattern, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if( sshot.snapshotLength > 0){
      		for (i=0; i< sshot.snapshotLength; i++){
        		a_emt[i] = sshot.snapshotItem(i);
      		}
      		return a_emt;
    	}
    	return null;
}
