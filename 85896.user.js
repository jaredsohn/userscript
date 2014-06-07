/*****************************************************************/
/* Author: Romain Schmitz                                        */
/* Website: http://userscripts.org/scripts/show/85896            */
/*                                                               */
/* [Proprietary License]                                         */ 
/*                                                               */
/* You are allowed to download and install this script from the  */
/* website above.                                                */
/* You are not allowed to modify and to redistribute this script */
/* without my permission. If you want to contribute create an    */
/* account on http://userscripts.org and send me a message. Then */
/* I add you as a script contributor.                            */
/* The author is not responsible for any damage that this script */
/* might cause. You use this script on your own risk.            */ 
/*****************************************************************/

var fileMETA = parseHeaders(<><![CDATA[
// ==UserScript==
// @name           VCRP Blackboard
// @version        0.3
// @description    Improves the user interaction of the blackboard forum which is really really crap.
// @namespace      vcrpblackboard
// @include        https://vcrp5.vcrp.de/webct/urw/*
// @license        Proprietary license;
// @uso:script     85896
// ==/UserScript==
]]></>.toString());

// TODO frame check to reduce the executions (per frame) 

var jqlib = "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js";
var host = "https://vcrp5.vcrp.de";

/**********************************************************/

	// 1 = Debugging on
	// 0 = Debugging off
	var GM_Debug = 1;
	
	if(GM_Debug)
		if(unsafeWindow.console)
			var GM_log = unsafeWindow.console.log;
	else
	   var GM_log = function(){};

/**********************************************************/

function parseHeaders(metadataBlock) {
  var headers = {};
  var line, name, prefix, header, key, value;

    var lines = metadataBlock.split(/\n/).filter(/\/\/ @/);
    for each (line in lines) {
      [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);

      switch (name) {
        case "licence":
          name = "license";
          break;
      }

      [key, prefix] = name.split(/:/).reverse();

      if (prefix) {
        if (!headers[prefix]) 
          headers[prefix] = new Object;
        header = headers[prefix];
      } else
        header = headers;

      if (header[key] && !(header[key] instanceof Array))
        header[key] = new Array(header[key]);

      if (header[key] instanceof Array)
        header[key].push(value);
      else
        header[key] = value;
    }

    headers["licence"] = headers["license"];

  return headers;
}

/**********************************************************/

(function() {			
	// add css
	/*
	GM_addStyle(
		'.row1 { display: none; }'+
		'.onlinelist { width: 25% !important; }'+
		'.shouts { width: 75% !important; }'+
		'.table1 tbody { display: none; }'+
		'#sh_online_users { margin-left: 10px; }'+
		'.sh_user { margin-right: 5px; }'
	);
	*/
	
	// Add jQuery
	// TODO: 	adding jQuery support by using @require is easier but one could run into snags. 
	// 			Greasemonkey won't execute the script at all if config.xml contains an required tag.
	// 			As soon as this tag is removed the script will be executed properly. DAMN. Why?
	var GM_JQ = document.createElement('script');
	GM_JQ.src = jqlib;
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	
	GM_wait();
})();


// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery;
		letsJQuery();
	}
}

function letsJQuery() {
	autoUpdate(fileMETA['uso']['script'],fileMETA['version']);
	
	// get rid of the fucking frames.
	$("#ctdiscussion").attr("target", "_blank");	
	var context = $("form[name='discussionHomepageForm']");
	
	// hidden feature
	$("h1:first", context).wrap('<a href="http://www.youtube.com/watch?v=26UA578yQ5g" target="_blank" />');
	
	$("a", context)
		.click(function(event){
			event.preventDefault();
			
			// the link element
			var elem = $(this);
			
			// get the src from the link
			var src = elem.attr("href");
			src = src.replace("javascript:isPreview('", "");
			src = src.replace("')", "");
			var new_src = host + src;
			
			// get the topic ID
			var pattern = /topicid=([^&]*)/gi;
			var topic_id = pattern.exec(src);
			
			// return if no match found
			if ( topic_id !== null )
				topic_id = topic_id[1]; // [0] = full match, [1] = submatch
			else
				return false;
			
			// Append a new div after the description section
			var div_id = 'topics_'+ topic_id;
			elem.parent().parent().append('<div id="'+ div_id +'" />');;
			var jTopics = $('#'+ div_id, context);
			
			
			$.get(new_src, function(data){
				var posts = $("#datatable", data);

				jTopics.append('<ul />');				
				
				
				// iterate over all topics and preload all the threads asynchronously
				var label, msg_id, link, li;
				var list = $('ul', jTopics);
				$("label:gt(0)", posts).each(function(index, elem){
					label = $(elem);
					
					// get the message ID
					msg_id = label.attr("for");

					// create new list item
					li = $("<li />");

					// append the topic link to the list
					link = $(label.html())
						.addClass(msg_id)
						.appendTo(li);
					list.append(li);
					
					// load the thread
					load_thread( topic_id, msg_id );						
				});
					
			});
			
			
			GM_log(new_src);
		});
		
		
	
}

function load_thread( topic_id, msg_id ) {
	$.get( get_thread_url(topic_id, msg_id), 
		function(data) {		

			$('.'+ msg_id).click(function(event){
				event.preventDefault();				
				show_thread(data)
				
			});
			
			
		}
	);		
}

// opens a popup with the thread
function show_thread(document) {
	
	//TODO get the title from the thread document
	var title = $('.entrydiv:first td:first', document).text().replace("Betreff: ","");
	GM_log(title);
	
	var box = new function(){
		
		this.header = null,
		this.content = null,
		this.popupHeight = 0,
		this.popupWidth = 0,
		this.contentHeight = 0,
		this.headerHeight = 24, // this is equal to the image height
		
		this.create = function(){
		
			// compute the widths and heights
			this.popupHeight = $(window).height() - 200;
			this.popupWidth = $(window).width() - 200;
			
			// Create the background
			$('<div id="popup_background"></div>')
			.css({
				 width: '100%',
				 height: '100%',
				 backgroundColor: 'black',
				 opacity: '0.8',
				 position: 'fixed',
				 left: '0px',
				 top: '0px',
				 zIndex: '50',
				 display: 'none',
				 overflow: 'auto',
				 scroll: 'no'
			})
			.click(function(event){box.hide();})
			.appendTo('body');
				
			// Create the popup header
			var ph = $('<div/>')
				.css({
					width: '100%',
					backgroundColor: '#8A8A8A', 
					fontSize: '12pt', 
					fontWeight: 'bold',
					height: 24,
					color: 'white'
				})
				.append('<img style="width: 30px; height: '+ this.headerHeight +'px; float: right; cursor: pointer;" alt="Close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAYAAADtaU2/AAAACXBIWXMAABMqAAATKgFrb2emAAAEUklEQVRIDb2VW08TaxSG32lnpkckIBXQVgjgMegNmhgvTDxdmajR+Af8IV7sf2SM8U6yxUPQaDTbIyCn0jZSRCxY2+l0Zr/rK1OnZRrvupLCHNa3nvWutb5vtHOTk+sXp6ZSpuuiG2ZpGqZfvy7qV8+cSf1z9y6wudkNLtDfj3ualtJd24ZTLOIXf92wRL0OYeqO46BmWaj+/h3MZWnCoRDq9MPf2kHfEH0lZidfkyx53wBXq4FgjUG0aBTzGxs43NcHjX6uBA0w8XVNE1v0ScVisMvlQN8o3yuwS+m1SiUQHI7HsVqrYZmBKvSb0HXY29t7AgpU7+nBApNaD4dxiGsO0l9j3PaRFZYwlWJLFDNDsFSeaby2eFNIJDB16RJKHL7FT59wSOClEivZCCl++r59WCU8duIETu/fj9lHj+D+/IlB+qoWeUG5RlgNxcyyFgAWX52O4wy6VSggw6B5Psu+f49BzkONcDGD77ORiIKmx8ex9OEDxqi6j4mUd3aUT/MP4wlL2vVHsQyXT7E4V1mWCCcwTMc1BkofP44cnxfevsUAh0RUF5JJJCYnkZ6YwOrnz3BYlV7ORNlXFT94r+IAsILzeZQJ2OybwDNHj2KNwNLcnAInjh1D+sgRZHlfYULJfB7bW1vNVjShctGiWIarQ6m9RbLVBF4WOKuSIezX0JB6nZBSE7rz8iWiKysoCZQVCrRdsCPDZTHgRi6H3NevrPSf4WpfKJMbZ+AK4f2EjrDnYlLezWfPUH7xAgWWWCa2k0lrDE6/MBvgbBb5+fm/gpPs29CpU61xmWyFO+Lb0hK2OYQd1XKVgJOceksUi8YwF8uvk2I5jeIDA+i5cAHDV64g0duLLBMVS1DB8OXLKH//Dm16GmWqVieXetv6Rzag4vC/rvYh91vEMALBqsTMMk7oyO3bqsS5xUWsP36sFAxyj0vP3Tt3sMLkzSdPVBJBykWxTpYmikWNwRszACzQGL8m0fPnkb51C6Oyl5eXkb1/H5WZGQWu8iTDzZs4zK3mMjEZPvP580C46jFZIc6JUmxww7eDpQUmy6ifPYvhGzcwcvIk8hyutQcPYHOYrN2vmcHrHNdr16+rajj0zVNRiMNmyV72VVuBxZfJNcBSaikBH3gW4nWVH4Y6lRzIZFAgtPDwIUA1NvtpsBpiNo9Sg5Ac791r15Ci7xorE/7yBRFuQ4F55ilWYAEElprPY5I5t9p/T5/CYImNV69QFZBAd8EStM5n5uwscvRfHBtDkrtEvrkVto9kj6uSEJYwG8NF+TJclNx0kosQM468eweXe9xkL20eDu1Qb4Hz4wciktjHj9C5vWr8mYS0mAyXV2q/4nawLHLYp6h8CmVRm9KWoLzR6NfHD4MjviJCxPiNz1sVM6DJTILAzVL5SuuPteeawWWv+lvR9NlNXvVY5yftwOgowLJ2w4Sls2X6v3NzRZ40KZfnZzdMe/MGMwsLxf8BtyF0Rix53vwAAAAASUVORK5CYII=" />')
				.append('<span id="title">'+ title +'</span>');
				
			$('#title', ph).css({
				marginLeft: 10
			});
			
			// Create the popup and append it to the form
			var p = $('<div id="popup" />')
				.css({
					 backgroundColor: 'white',
					 position: 'fixed',
					 zIndex: '51',
					 display: 'none',
					 overflow: 'no-scroll'
				})
				.append(ph)
				.append('<div id="popup_content" />')
				.appendTo('body');
			
			this.content = $('#popup_content');
			
			// set some css adjustment
			this.content.css({
				height: this.popupHeight - this.headerHeight,
				padding: 0,
				overflow: 'auto'
			});
			
			// add the close event handler
			$('img', ph)
				.click(function(event){
					GM_log('kill the popup');
					box.hide();
				});
		};
		
		this.set_content = function(){
			
			var pc = this.content;
			
			// define the reverse function. Could be used to reverse the post order
			/*
			$.fn.reverse = function() { 
				this.pushStack(this.get().reverse());
				return this;
			} 
			*/
			
			// set the content
			$(".entrydiv", document).each(function(index, post){
				pc.append(post);
			});
			
		};
		
		this.center = function(){
		
			// compute the widths and heights
			var windowWidth = $(window).width(); // document.documentElement.clientWidth;  
			var windowHeight = $(window).height(); // document.documentElement.clientHeight;
			this.popupHeight = windowHeight - 200; // $("#popup").height();  
			this.popupWidth = windowWidth - 200; // $("#popup").width(); 

			// center the popup
			$('#popup').css({
				top: windowHeight/2- this.popupHeight/2,
				left: windowWidth/2- this.popupWidth/2,
				width: this.popupWidth,
				height: this.popupHeight
			});
			
			// recalculate the background height
			// works not properly but it's not needed as I saw
			//$("#popup_background").css("height", windowHeight); 
		};
		
		this.show = function(){			
			// now let the popup popup :-)
			$('#popup_background').show();
			$('#popup').fadeIn("slow");
		};
		
		this.hide = function(){
			// now let the popup go :-(
			$('#popup').fadeOut("slow");
			$('#popup_background').hide();
			$('#popup').remove();
		};
		
		// a flag that tells the caller if the box was already displayed
		this.already_shown = false;
	}
		
	// Add the box to the DOM
	box.create();
	box.show();
	box.center();
	box.set_content();
}


function get_thread_url( topic_id, msg_id ) {
	var url = host + '/webct/urw/lc349503582001.tp349503604001/compiledMessageThreadView.dowebct?'+
						'compileaction=displayCompleteThread' + 
						'&messageid='+ msg_id + 
						'&topicid='+ topic_id + 
						'&areaid=';
	return url;
}


/************************************************************/
/* THE AUTOUPDATER - http://buzzy.hostoi.com/AutoUpdater.js */
/* The code here is a rewrite. It will be completely        */
/* replaced by jQuery code in next versions.                */
/************************************************************/

function autoUpdate (id, version){
	
	GM_log('Looking for a new version ...');
	
	function eliminaElem(e){if(e)e.parentNode.removeChild(e)}
	
	function addGlobalStyle(css){var head,style;head=document.getElementsByTagName('head')[0];style=document.createElement('style');style.type='text/css';style.innerHTML=css;head.appendChild(style)}
	
	function trim(cad){return cad.replace(/^\s+|\s+$/g,"")}
	
	function menuCommand (){
		GM_registerMenuCommand ("Turn auto-updater on",
			function (){
				GM_setValue ("update", new Date ().getTime ().toString () + "#1");
			});
	}
	
	function showMessage (){
		addGlobalStyle (
			"#autoUpdater_capaAutopUpdate {" +
				"position: absolute;" +
				"left: 20px;" +
				"width: 280px;" +
				"background-color: #EEE;" +
				"padding: 7px;" +
				"font-family: Calibri;" +
				"font-size: 14px;" +
				"-moz-border-radius: 5px;" +
				"border: solid thin #C7C7C7;" +
				"z-index: 100" +
			"}"
		);
	
		var t;
		
		function move2 (capa){
			if (capa.style.left == "-301px"){
				clearTimeout (t);
				eliminaElem (capa);
			}else{
				capa.style.left = parseInt (capa.style.left) - 3 + "px";
				t = setTimeout (function (){ move2 (capa); }, 20);
			}
		}
		
		function move (capa){
			if (capa.style.top == "20px"){
				clearTimeout (t);
				t = setTimeout (function (){ move2 (capa); }, 5000);
			}else{
				capa.style.top = parseInt (capa.style.top) + 1 + "px";
				t = setTimeout (function (){ move (capa); }, 20);
			}
		}
		
		var capa = document.createElement ("div");
		capa.id = "autoUpdater_capaAutopUpdate";
		capa.innerHTML = "<img style='float: left; position: relative; top: 1px;' src='data:image/png;base64,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'/>" +
						 "<span style='cursor: default; text-align: center;'>You can turn the auto-updater on in the Greasemonkey Menu Command.</span>";

		document.getElementsByTagName ("body")[0].appendChild (capa);
		
		capa.style.top = "-50px";
		capa.style.left = "20px";
		move (capa);
	}
	
	var ms = new Date ().getTime ();
	
	var update = GM_getValue ("update");
	var search = false;
	var days;
	
	if (update == undefined){
		search = true;
		
		//By default it searches updates every 1 day.
		GM_setValue ("update", (24*60*60*1000 + ms).toString () + "#1");
		days = 1;
	}else{
		days = parseInt (update.split ("#")[1]);
		if (days != 0){
			var next_ms = update.split ("#")[0];
			if (ms >= parseInt (next_ms)){
				search = true;
				
				GM_setValue ("update", (days*24*60*60*1000 + ms).toString () + "#" + days);
			}
		}else{
			//Register Menu Command
			menuCommand ();
		}
	}

	if (!search) return;
	
	GM_xmlhttpRequest ({
		method: "GET",
		url: "http://userscripts.org/scripts/show/" + id,
		headers: {
					"User-agent": "Mozilla/5.0",
					"Accept": "text/html",
				 },
		onload: function (respuesta){
			var userScripts = document.implementation.createDocument ("", "", null);
			var html = document.createElement ("html");
			html.innerHTML = respuesta.responseText;
			userScripts.appendChild (html);
			
			//Get new version
			var newVersion = userScripts.getElementById ("summary").getElementsByTagName ("b")[1].nextSibling.textContent;
			
			//Get the name of the script
			var name = userScripts.getElementById ("details").childNodes[1].innerHTML;
			
			if (trim (newVersion) != trim (version)){
				//There's a new version
				addGlobalStyle (
					"#autoUpdater_divVersion { text-align: left; height: 75px; position: fixed; top: 10px; left: 10px; background: #EEE; border: solid thin #C7C7C7; padding: 8px; font-family: Calibri; font-size: 14px; -moz-border-radius: 5px; cursor: default; z-Index: 100;}" +
					"#autoUpdater_imgVersion { position: relative; top: 4px; margin-right: 5px; }" +
					"#autoUpdater_install { position: absolute; top: 45px; right: 8px; width: 75px; padding: 5px; border: 1px solid #DEDEDE; background-color: #F5F5F5; color: #565656; text-decoration: none; cursor: pointer; }" +
					"#autoUpdater_install img { padding: 0; margin: 0 2px 0 2px; position: relative; top: 2px; right: 4px; }" +
					"#autoUpdater_install span { position: relative; bottom: 1px; }" +
					"#autoUpdater_currentVersion { color: #373737; width: 105px; }" +
					"#autoUpdater_newVersion { color: #373737; width: 105px; }" +
					"#autoUpdater_versionTitle { color: #373737; }" +
					"#autoUpdater_numCurrentVersion { color: #232323; }" +
					"#autoUpdater_numNewVersion { color: #232323; }" +
					"#autoUpdater_table { border-spacing: 0 0; }" +
					"#autoUpdater_table td { font-family: Calibri; font-size: 14px; }" +
					"#autoUpdater_linkScript { font-family: Calibri; font-size: 14px; color: #000099; text-decoration: none; }"
				);
				
				var capa = document.createElement ("div");
				capa.setAttribute ("id", "autoUpdater_divVersion");
				capa.innerHTML = "<img id='autoUpdater_imgVersion' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKcSURBVDjLpZPLa9RXHMU/d0ysZEwmMQqZiTaP0agoaKGJUiwIxU0hUjtUQaIuXHSVbRVc+R8ICj5WvrCldJquhVqalIbOohuZxjDVxDSP0RgzyST9zdzvvffrQkh8tBs9yy9fPhw45xhV5X1U8+Yhc3U0LcEdVxdOVq20OA0ooQjhpnfhzuDZTx6++m9edfDFlZGMtXKxI6HJnrZGGtauAWAhcgwVnnB/enkGo/25859l3wIcvpzP2EhuHNpWF9/dWs/UnKW4EOGDkqhbQyqxjsKzMgM/P1ymhlO5C4ezK4DeS/c7RdzQoa3x1PaWenJjJZwT9rQ1gSp/js1jYoZdyfX8M1/mp7uFaTR8mrt29FEMQILr62jQ1I5kA8OF59jIItVA78dJertTiBNs1ZKfLNG+MUHX1oaURtIHEAOw3p/Y197MWHEJEUGCxwfHj8MTZIcnsGKxzrIURYzPLnJgbxvG2hMrKdjItjbV11CYKeG8R7ygIdB3sBMFhkem0RAAQ3Fuka7UZtRHrasOqhYNilOwrkrwnhCU/ON5/q04vHV48ThxOCuoAbxnBQB+am65QnO8FqMxNCjBe14mpHhxBBGCWBLxD3iyWMaYMLUKsO7WYH6Stk1xCAGccmR/Ozs/bKJuXS39R/YgIjgROloSDA39Deit1SZWotsjD8pfp5ONqZ6uTfyWn+T7X0f59t5fqDhUA4ry0fYtjJcWeZQvTBu4/VqRuk9/l9Fy5cbnX+6Od26s58HjWWaflwkusKGxjm1bmhkvLXHvh1+WMbWncgPfZN+qcvex6xnUXkzvSiYP7EvTvH4toDxdqDD4+ygT+cKMMbH+3MCZ7H9uAaDnqytpVX8cDScJlRY0YIwpAjcNcuePgXP/P6Z30QuoP4J7WbYhuQAAAABJRU5ErkJggg=='/><span id='autoUpdater_versionTitle'>New version available for <a id='autoUpdater_linkScript' target='_blank' href='http://userscripts.org/scripts/show/" + id + "'><b><u>" + name + "</u></b></a>!</span>" +
								 "<br/><hr/>" +
								 "<table id='autoUpdater_table'>" +
									"<tr><td id='autoUpdater_currentVersion'>Current version:</td><td id='autoUpdater_numCurrentVersion'><b>" + version + "</b></td></tr>" +
									"<tr><td id='autoUpdater_newVersion'>New version:</td><td id='autoUpdater_numNewVersion'><b>" + newVersion + "</b></td></tr>" +
								 "</table>" +
								 "<a id='autoUpdater_install' title='Install script'><center><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII=' alt='Install script'/><span><b>Install</b></span></center></a>";
				
				document.getElementsByTagName ("body")[0].appendChild (capa);
				
				var ok = true;
				
				function install_update (){
					
					GM_log('Installing the update');
					
					var days = 1;
					var ms = new Date ().getTime ();
					
					if (ok){
						if (days == 0){
							GM_setValue ("update", "#0");
							
							menuCommand ();
							showMessage ();
						}else{
							GM_setValue ("update", (days*24*60*60*1000 + ms).toString () + "#" + days);
						}
						
						window.open ("http://userscripts.org/scripts/source/" + id + ".user.js", "_self");
						eliminaElem (document.getElementById ("autoUpdater_divVersion"));
					}
				}
				
				$("#autoUpdater_install")
					.click(function(){ install_update(); })
					.mouseover(function(){
						$(this).css('background', '#E6EFC2');
						$(this).css('borderColor', '#C6D880');
						$(this).css('color', '#529214');					
					})
					.mouseout(function(){
						$(this).css('background', '#F5F5F5');
						$(this).css('borderColor', '#DEDEDE');
						$(this).css('color', '#565656');
					})
					.mousedown(function(){
						$(this).css('background', '#529214');
						$(this).css('borderColor', '#529214');
						$(this).css('color', '#FFF');
					})
					.mouseup(function(){
						$(this).css('background', '#E6EFC2');
						$(this).css('borderColor', '#C6D880');
						$(this).css('color', '#529214');
					});
				
			}
		}
	});
}