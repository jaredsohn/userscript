// ==UserScript==
// @name           neoGAF - YOUTUBE ME! 3.0
// @namespace      http://www.neogaf.com/
// @description    Inspired by neoGAF - YOUTUBE ME! 2 by hateradio; Adds a button to YouTube URLs to play the linked video inline. New version features UI tweaks and code tweaks.
// @include        http://www.neogaf.com/forum/*
// ==/UserScript==


//<!-- begin hide

	var YTM_UI_Strings = new Array();
	YTM_UI_Strings['show'] = String.fromCharCode(187)+' Show Video ';
	YTM_UI_Strings['hide'] = String.fromCharCode(171)+' Hide Video ';
	YTM_UI_Strings['err'] = ' Bad URL ';

	var YTM_W = 480;
	var YTM_RATIO = 0.75; // 4:3; use 0.5625 for 16:9
	var YTM_H = parseInt( YTM_W * YTM_RATIO );


	YTM_Code = '<object width="'+YTM_W+'" height="'+YTM_H+'" style="display:block">'
			+ '<param name="movie" value="http://www.youtube.com/v/YTM_HASH&hl=en&fs=1&hq=1"></param>'
			+ '<param name="allowFullScreen" value="true"></param>'
			+ '<param name="allowscriptaccess" value="always"></param>'
			+ '<embed src="http://www.youtube.com/v/YTM_HASH&hl=en&fs=1" '
			+ 'type="application/x-shockwave-flash" '
			+ 'allowfullscreen="true" '
			+ 'allowscriptaccess="always" '
			+ 'width="'+YTM_W+'" height="'+YTM_H+'"></embed>'
			+ '</object>';

	function YTM_Toggle()
	{
		if( !this || !this.getAttribute('YTM') ) return;

		var movie = document.getElementById(this.getAttribute('YTM'));
		var re = new RegExp(/play_([A-Za-z0-9-_]{11})/);

		if( movie && re.test(movie.id) )
		{
			if( movie.style['display'] == 'none' )
			{
				if( !movie.innerHTML )
				{
					var yt_id;
					if( RegExp.lastParen )
						yt_id = RegExp.lastParen;
					else {
						yt_id = movie.id.match(re)[0].toString();
						yt_id = yt_id.replace(/^play_/, '');
					}
					movie.innerHTML = YTM_Code.replace(/YTM_HASH/g, yt_id);
				}
				movie.style['display'] = "block";
				this.innerHTML = YTM_UI_Strings['hide'];
			} else {
				movie.style['display'] = "none";
				this.innerHTML = YTM_UI_Strings['show'];
			}
		}
	}

	// scans page for YouTube links and adds the video toggle button after each link.
	function YTM_CreateButtons()
	{
		
		var anchors = getElementsByAttribute(document,'a','href','youtube.com/watch');
		var re = new RegExp(/v=([A-Za-z0-9-_]{11})/);

		for (var i = 0; i < anchors.length; i++)
		{
			// get the video code
			var href = anchors[i].getAttribute("href"); 
			if( anchors[i].parentNode.getAttribute("class") != "smallfont" )
			{
				var button = document.createElement('span');
				var yt_div = null;
				if( re.test(href) ) // valid YT ID
				{
					var yt_id;
					if( !RegExp.lastParen )
					{
						yt_id = href.match(re)[0].toString();
				 		yt_id = yt_id.replace(/^v=/, '');
					} else {
						yt_id = RegExp.lastParen;
					}
					var yt_div = document.createElement('div');
					yt_div.setAttribute("style", "width: "+YTM_W+"px; height: "+YTM_H+"px; background-color: #fff; margin-top: 10px; display:none");
					yt_div.setAttribute("id", "play_"+yt_id+i);
					button.setAttribute("YTM", "play_"+yt_id+i);
					// add id to youtube anchor tags based on video code
					// also adds i to bypass doubles
					anchors[i].setAttribute('id',yt_id+i);
					button.setAttribute("style","background:#DF2929;margin-left: 4px; color: #fff; padding: 2px;-moz-border-radius: 2px; cursor: pointer");
					button.innerHTML = YTM_UI_Strings['show'];
					button.setAttribute('id','show_'+yt_id+i);
					button.addEventListener('click', YTM_Toggle, true); 
				} else { // bad YT link
					button.setAttribute("style", "background: #aaa;margin-left: 4px; color: #fff; padding: 2px;-moz-border-radius: 2px;");
					button.innerHTML = YTM_UI_Strings['err'];
				}
				// start injecting
				anchors[i].parentNode.insertBefore(button, anchors[i].nextSibling);
				if( yt_div )
					anchors[i].parentNode.insertBefore(yt_div, button.nextSibling);

			}
		}
	}

	// element attributes
	// original : http://snipplr.com/view/1853/get-elements-by-attribute/
	
	function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
		var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
		var arrReturnElements = new Array();
		var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp(strAttributeValue) : null;
		var oCurrent;
		var oAttribute;
		for(var i=0; i<arrElements.length; i++){
			oCurrent = arrElements[i];
			oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
			if(typeof oAttribute == "string" && oAttribute.length > 0){
				if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
					arrReturnElements.push(oCurrent);
				}
			}
		}
		return arrReturnElements;
	}
	
	YTM_CreateButtons();

// end hide -->