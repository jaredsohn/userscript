// ==UserScript==
// @name unframeeee
// @author 5y5
// ==/UserScript==
javascript:
(function(){
	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	if (/m.mafiawars.com/.test(document.location)) {
		window.location.href = document.location+'?iframe=1';
	}
	else if (/apps.facebook.com.inthemafia/.test(document.location)) {
		//Credits to Christopher(?) for this new fix
		for (var i = 0; i < document.forms.length; i++) {
			if (/canvas_iframe_post/.test(document.forms[i].id) && document.forms[i].target == "mafiawars") {
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
		}
	}
	else if (document.getElementById('some_mwiframe')) {
		// new mafiawars.com iframe
		window.location.href = document.getElementById('some_mwiframe').src;
		return;
	}
	else {
		document.body.parentNode.style.overflowY = "scroll";
		document.body.style.overflowX = "auto";
		document.body.style.overflowY = "auto";
		try {
			document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
			if (typeof FB != 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent;
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer = -1;
			}
			document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);

		} catch (fberr) {}
		//Revolving Revolver of Death from Arun, http://arun.keen-computing.co.uk/?page_id=33
		$('#LoadingBackground').hide();
		$('#LoadingOverlay').hide();
		$('#LoadingRefresh').hide();
		//hack to kill the resizer calls
		iframeResizePipe = function() {};
		
		if ($('#final_wrapper').attr('spocklet_popup') != 'enable_ze_evil_popups_of_doom') {
			if (confirm('Enable workaround to show ingame popups, like bank and hospital?\nYou will have to rerun Unframe-MW on each pageload to kill the popups.')) {
				$('#content_row').append('<style type="text/css">div.pop_box { display: block; }</style>');
				$('#final_wrapper').attr('spocklet_popup','enable_ze_evil_popups_of_doom');
			}
		}
		
		//kill the new wierd div, effects unknown
		//$('#FB_HiddenContainer').remove();
		$('div[id*="pop_1"]').each(function(){
			$(this).css('display','none');
			//if (/The Bank/.test($(this).html())) {
				//$(this).css('display','block');
				//$(this).find('div').css('display','block');
			//}
		});
		
		// close all popups
		// var popbuttons=document.getElementsByClassName('pop_close');
		// for(i=0;i<popbuttons.length;i++){
			// popbuttons[i].onclick();
		// }	for (var i = 0; i < document.forms.length; i++) {
			   if (document.forms[i].action.indexOf('index2.php')!=-1) {
				  document.forms[i].target = '';
				  document.forms[i].submit();
				  return false;
			   }
			 }
		}
       else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
            for (var i = 0; i < document.forms.length; i++)
			{if (/^canvas_iframe_post/.test(document.forms[i].id))
			{
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
			}
            return;
        }
        else if (document.getElementById('some_mwiframe')) {
            // new mafiawars.com iframe
            window.location.href = document.getElementById('some_mwiframe').src;
            return;
        }
        else {
            document.body.parentNode.style.overflowY = "scroll";
            document.body.style.overflowX = "auto";
            document.body.style.overflowY = "auto";
            try {
                document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
                if (typeof FB != 'undefined') {
                    FB.CanvasClient.stopTimerToSizeToContent;
                    window.clearInterval(FB.CanvasClient._timer);
                    FB.CanvasClient._timer = -1;
                }
                document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);
			
            }
	catch (fberr) {}
	}
}catch(err) {}
function icanhaztitle() {
        document.title = 'MW - GuessX mod';
        }		
		icanhaztitle()
		
function ihatemissionbar() {
try {		document.getElementById('quest').parentNode.removeChild(document.getElementById('quest'))
}catch(err) {}
		}
		ihatemissionbar()

function closepop(){
	if($('#pop_zmc').length>0){
	$('#pop_zmc').remove();
	}
	if ($('#popup_fodder').length>0){
    $('#popup_fodder').remove();
	}
  setTimeout(function(){closepop()},500);
 }
closepop()

//	var by = true, levelup_text = 'Off';
	var div_main_body = '<div id="main_body" style="background-color:black; border: 2px solid #a99e9e;-moz-border-radius: 3px;border-radius: 3px;-webkit-border-radius: 10px;color: #fff; padding-left:0.1em;display:inline-block;padding:2px;width:200px;position:fixed;right:17px;top:3px;z-index:997;">'+
	'	<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><th align="center" style="text-align:left;vertical-align:bottom;padding-top:5px;padding-left:5px;background-color: black; width="25px">'+
	'	<th align="center" style="text-align:center;vertical-align:center;padding-top:5px;background-color: black" width="150px"><span id="drag_one" style="cursor:move;font-size:16px;"><font color="yellow">Popup Killer</font></span></th>'+
	'	<th align="center" style="text-align:right;vertical-align:bottom;padding-top:5px;padding-right:5px;background-color: black" width="25px"><img id="close_one" src="http://www.mistyfied.net/wizard/Images/close.png" alt="Exit" height="16px" width="16px"/></th></tr></table>'+'<div id="ring_row"><table border="1" cellpadding="0" cellspacing="0" width="100%">'+
	'		<tr id="stamina_row"><td align="center" style="text-align:center"><div class="clean-gray"><table border="0" cellpadding="0px" cellspacing="0px"><tr><td width="1250px" height="35px" align="center" style="text-align:center">'+
//	'Popup Killer is <a id="levelup" href="#">' + levelup_text + '</a>'+
	'Popup Killer is <font color="#FFD927">On</font>'+
	'<br><a id="heal" href="#">Heal with NY Money</a></td></td></tr></table></div></td></tr>'+
	'		</table>'+
	'	</div>'+
	'</div>'+
	'<style type="text/css">'+
	'	#about_holder{display:none;width:100%;height:3000px;position:relative;overflow:hidden;z-index:998;}'+
	'	#about_holder #shadow_box{opacity:0.5;background-color:black;width:100%;height:3000px;position:fixed;top:0px;left:0px;z-index:-1;}'+
	'	#about_header{z-index:999;background-color:black;border:3px solid #A99E9E;border-radius:8px;-moz-border-radius:8px;width:650px;margin-left:auto;margin-right:auto;padding:10px;}'+
	'	#about_content{z-index:999;background-color:black;border:3px solid #A99E9E;border-radius:8px;-moz-border-radius:8px;width:650px;margin-left:auto;margin-right:auto;padding:10px;}'+
	'	#about_footer{z-index:999;background-color:black;border:3px solid #A99E9E;border-radius:8px;-moz-border-radius:8px;width:650px;margin-left:auto;margin-right:auto;padding:10px;}'+
	//drag smoothing by Eike and Spockholm
	'	#drag_one::-moz-selection{background-color:#eaeaea;color:#252525;}'+
	'	#drag_one::selection{background-color:#eaeaea;color:#252525;}'+	'</style>';
	if($('#main_body').length == 0){
		$('body').append(div_main_body);
	}
	$("#mainbody").draggable({ handle: "#drag_one" });
$("#mainbody").disableSelection();


	document.getElementById("heal").onclick = function () {
				do_ajax('','remote/html_server.php?xw_controller=hospital&xw_action=heal&xw_city=7&xcity=1',1,1,0,0);
				return;
	};

/*
	document.getElementById("levelup").onclick = function () {
		if (by) {
			by = false;
			levelup_text = document.getElementById("levelup").innerHTML = "On"
		} else {
			by = true;
			levelup_text = document.getElementById("levelup").innerHTML = "Off"
		}
		return false
	};
*/	
	$('#close_about').live("click", function(){$('#about_holder').css('display','none');});
	$('#close_one').click(function() {
		$('#main_body').remove();
		$('#close_about').die();
		$('#toggle_slots').die();
		$('#close_one').die();
	});
	// drag code from Eike @ Team Spockholm
	// drag drop code, thanks selfhtml
	var dragobjekt = null;
	var dragx = 0;
	var dragy = 0;
	var posx = 0;
	var posy = 0;

	function dragmove(ereignis) {
	  posx = document.all ? window.event.clientX : ereignis.pageX;
	  posy = document.all ? window.event.clientY : ereignis.pageY;
	  if(dragobjekt != null) {
		dragobjekt.style.left = (posx - dragx) + "px";
		dragobjekt.style.top = (posy - dragy) + "px";
	  }
	};
	document.onmousemove=dragmove;
	
	function dragstart(element) {
		document.onmousemove=dragmove;
		dragobjekt = element;
		dragx = posx - dragobjekt.offsetLeft;
		dragy = posy - dragobjekt.offsetTop;
	  }

	  document.getElementById("drag_one").onmousedown=function(e){
		dragstart(document.getElementById("main_body"));
	}
	document.onmouseup=function(e){
		dragobjekt=null;
		document.onmousemove=null;

	}
})()