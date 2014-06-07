// ==UserScript==
// @name          Hover Links (v2)
// @namespace     http://www.userscripts.org
// @description   A tooltip pops up when hovering over links.
// @include       *
// ==/UserScript==

// define 
const popTTDelay = 300;  //amount of time(in ms) after mouseover before popup (0 for immediatly)
var bg_color = "#ffffe0";
var border_color = "#ffd700";
var font_color = "#4682b4";
var font_face = "verdana";
var font_size = "10px"; // sorry, change slyles manually in function create_window   :-)
//add favicon to link on page for EVERY external link,  for faster showing in tooltip, 
//and also very usefull to see links follow external sites (my preference of course)
var add_favicon = true; 
const offSBRRight = 24;   //horizontal constant. if the popup makes horizontal scrollbars appear, increase this constant until it doesn't (default:18)
const offSBRTop = 24;     //vertical constant. if the popup makes vertical scrollbars appear, increase this constant until it doesn't (default:18)
// variables
var ttH, ttW; 

(function() {
	function locate(event)
	{   
		var ttWin = find_window();
		if (ttWin) {
		var tempLeft=(event.clientX + window.pageXOffset)+9;
		var tempTop=(event.clientY + window.pageYOffset)+10;

		if( (tempLeft+ttW) > (window.innerWidth+window.pageXOffset-offSBRRight) ) { //if its too far right
		tempLeft= (window.innerWidth+window.pageXOffset-offSBRRight-ttW-10);
		}

	    if( (tempTop+ttH) > (window.innerHeight+window.pageYOffset-offSBRTop) ) { //if its too far down
		tempTop-=(ttH+offSBRTop);
		}

		if(tempLeft < window.pageXOffset) { //if it is too far left, i.e. it is a super-wide box
			tempLeft=window.pageXOffset+1; //set it all the way to the left
		}
		ttWin.style.top = tempTop + "px";
		ttWin.style.left = tempLeft + "px";
		}
	}

	function find_window()
	{	return document.getElementById("link_tt");
	}

	function create_window(id, ttTitle)
	{  
		var tt_err ='';
		var tt_div = document.createElement("div");
		tt_div.setAttribute("id", "link_tt");
		tt_div.setAttribute("style", "text-align: left; background:" + bg_color + ";border:1px solid " + border_color + ";padding:2px;color:" + font_color + ";font-family:" + font_face + ";font-size:" + font_size + ";position:absolute;z-index:1000000;"+
								'padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px; ' +
								'max-width: 95% !important; line-height: 1.2 !important; width: auto !important;' +
								'-moz-border-radius: 0.7em !important;' );

		try {var decodedUrl=decodeURIComponent(id.href); }
		catch (err) { tt_err += '<br><font style="font-size: 8px; color: grey;">'+'bad url )'+'</font>';
						decodedUrl=id.href;} // ?? :)

		var ttUrlHost=decodedUrl.split('/'); ttUrlHost=ttUrlHost[2];
		var favIco = '';
		if (ttUrlHost) {favIco="<img style='display: none;' onLoad=this.style.display=''; src=http://"+ttUrlHost+"/favicon.ico>  ";} 
		else {ttUrlHost='';}
		var dUrlLeng=decodedUrl.length;
		var urlPage =decodedUrl.slice(decodedUrl.indexOf(ttUrlHost)+ttUrlHost.length,decodedUrl.length);
		if (urlPage=='/') {urlPage='';} else {urlPage='<br>'+urlPage;}

		if (ttTitle) {ttTitle='<font style="font-size: 13px; color: #8b0000;">' + ttTitle+'</font><br>';} 
		 else {ttTitle='';}

		tt_div.innerHTML = ttTitle+favIco + 
		'<font style="font-size: 12px">' + ttUrlHost+'</font>' + urlPage+tt_err;

		document.body.appendChild(tt_div);
		ttH=tt_div.offsetHeight;
		ttW=tt_div.offsetWidth;
		if (popTTDelay) 
			{	find_window().style.display='none';
				window.setTimeout('show_windowTT()', popTTDelay); 
			}
	}

	function show_windowTT()
	{if (find_window()) {find_window().style.display = '';}
	}

	function kill_window()
	{		if (find_window()) find_window().parentNode.removeChild(find_window());
	}

	function create_event(id)
	{	if (id.title)
		{ var ttTitle = id.title;
			id.addEventListener("mouseover", function() { create_window(id, ttTitle); }, false);
			id.title='';
		}
		else {id.addEventListener("mouseover", function() { create_window(id); }, false);}

		id.addEventListener("mouseout", function() { kill_window(); }, false);
		id.addEventListener("mousemove", function(event) { locate(event); }, true);

		if (add_favicon) // add favicon on page before link
		 { var idH = id.href; 
			if(idH&&(!idH.match(document.domain+'|@|javascript:|mailto:'))) {
				var C=idH.split("/");
				// var 1 - in background
				id.style.background="url("+C[0]+"//"+C[2]+"/favicon.ico) center left no-repeat";
				id.style.paddingLeft="18px";
				
				//var 2
				//var iconImg= document.createElement('img');
				//iconImg.src= "http://"+C[2]+"/favicon.ico";
				//iconImg.style.display = 'none';
				//iconImg.addEventListener("load",  function() { this.style.display=''; 
				//			this.appendChild(document.createTextNode('\u00A0'));
				//			}, false);
				//id.insertBefore(iconImg, id.firstChild);	
				
				// var 3 
				// id.innerHTML= "<img style='display: none;' onLoad=this.style.display=''; src=http://"+C[2]+"/favicon.ico>&thinsp;" + id.innerHTML;
				//v4
				//id.innerHTML= "<img src=http://"+C[2]+"/favicon.ico>&thinsp;" + id.innerHTML;
			}
		  }

	}

unsafeWindow.show_windowTT = show_windowTT;
var link = document.getElementsByTagName("a");
for (i = 0; i < link.length; i++)
 { 	create_event(link[i]);
 }
})()