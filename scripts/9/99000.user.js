// ==UserScript==
// @name          GOMTV-STREAM-URL-LINK-BRUTALITY
// @namespace     PrettyWhore(Original by hiddename)
// @include       http://www.gomtv.net/*/live/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
//  
// -------------------------- NOTE ------------------------------
// THIS SCRIPT IS NOT SUPPOSED TO STEAL, SHARE, STREAM, RESTREAM, 
// DISTRIBUTE OR REDISTRIBUTE PROPERTY OF Gretech Corp. 
// IT ONLY WORKS WITH A VALID ACCOUNT WHICH HAS SUFFICENT RIGHTS.
// --------------------------------------------------------------

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
$(document).ready(function() {
	hr = $('<hr/>').css('margin','1em 0.5em').css('height','1px');
	
	$('<input type="text" onClick="this.select();" id="mymenuHQ" value="HQ URL Loading" readonly="readonly">').css('width','200px').css('margin-top','6px').insertBefore('#box_viewlive_outter:first .box_viewlive_inner_l .bandwidth_info');
	
	$('<a id="mylinkHQ" title="Starts a file download that you in most video players will be able to start playing when you want to, effectively watching the stream desynchronized(ofc. you can fast forward to the recentmost downloaded bit in most players, too).">Streamed File</a>').insertBefore('#mymenuHQ').css('width','200px').css('background-position',$('#box_viewlive_outter:first .box_viewlive_inner a:first').css('background-position')).before($('<hr/>').css('margin','1em 0.5em').css('height','1px'));

	$('<input type="text" onClick="this.select();" id="mymenuSQ" value="SQ URL Loading" readonly="readonly">').css('width','200px').css('margin-top','6px').insertBefore('#box_viewlive_outter:first .box_viewlive_inner_m .bandwidth_info');
	
	$('<a id="mylinkSQ" title="Starts a file download that you in most video players will be able to start playing when you want to, effectively watching the stream desynchronized(ofc. you can fast forward to the recentmost downloaded bit in most players, too).">Streamed File</span></a>').insertBefore('#mymenuSQ').css('width','200px').css('background-position',$('#box_viewlive_outter:first .box_viewlive_inner a:first').css('background-position')).before($('<hr/>').css('margin','1em 0.5em').css('height','1px'));
	
	$('<div id="liveStatus"></div>').css('height','50px').css('width','170px').css('font-size','17px').css('padding','6px').css('color','#333').html($('.golive_btn .tooltip').html()).insertBefore($('.box_viewlive_inner_r').children().first()).after(hr);
	
	var scriptsrc = $('script')[5].innerHTML;
	if(scriptsrc.match(/mb_no=([A-Za-z0-9]+)/gi)){
		mb_no = RegExp.$1;
		scriptsrc.match(/"leagueid":([0-9]+)/gi);
		leagueid = RegExp.$1;
		scriptsrc.match(/this.title	= "([A-Za-z0-9+%.]+)"/gi);
		title = RegExp.$1;
		$.ajax({
			url: "http://www.gomtv.net/gox/gox.gom?leagueid="+leagueid+"&strLevel=SQ&target=live&mb_no="+mb_no+"&title="+title,
			success: function(xml) {
				$('#mymenuSQ').val($(xml).find('REF').attr('href'));
				$('#mylinkSQ').attr('href',$(xml).find('REF').attr('href'));
			}
		});
		$.ajax({
			url: "http://www.gomtv.net/gox/gox.gom?leagueid="+leagueid+"&strLevel=HQ&target=live&mb_no="+mb_no+"&title="+title,
			success: function(xml) {
				$('#mymenuHQ').val($(xml).find('REF').attr('href'));
				$('#mylinkHQ').attr('href',$(xml).find('REF').attr('href'));
			}
		});
	}
});
}

// load jQuery and execute the main function
addJQuery(main);