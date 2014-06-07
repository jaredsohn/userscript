// ==UserScript==
// @name hellelr
// @author relax
// ==/UserScript==
javascript:(function (){
    function JSONscriptRequest(fullUrl) {
        this.fullUrl = fullUrl;
        this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
        this.headLoc = document.getElementsByTagName("head").item(0);
        this.scriptId = 'YJscriptId' + JSONscriptRequest.scriptCounter++;
    }
    JSONscriptRequest.scriptCounter = 1;
    JSONscriptRequest.prototype.buildScriptTag = function () {
        this.scriptObj = document.createElement("script");
        this.scriptObj.setAttribute("type", "text/javascript");
        this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
        this.scriptObj.setAttribute("id", this.scriptId);
    };
    JSONscriptRequest.prototype.removeScriptTag = function () { this.headLoc.removeChild(this.scriptObj); };
    JSONscriptRequest.prototype.addScriptTag = function () { this.headLoc.appendChild(this.scriptObj); };

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