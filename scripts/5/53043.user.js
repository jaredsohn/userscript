var MetaTags = <><![CDATA[
// ==UserScript==
// @name	YouTube Live Search
// @namespace   YouTube Live Search By F1r3fl3x a.k.a. Pockata
// @description Search YouTube, without leaving the current webpage
// @include	http://*youtube.com/watch?*
// @version	1.0
// @copyright	F1r3Fl3x <f1r3fl3x@gmail.com>
// @author 	F1r3fl3x a.k.a. Pockata
// @homepage 	http://pockata.no-ip.org
// ==/UserScript==
]]></>.toString();

//search button class yt-button yt-button-primary
// displaying of search video results 	<div class="video-entry">		<div class="video-cell" style="width:19.6%">
	
	//var YTButton = "{id}, {image}, {title}, {views}, {userName}, {userLink}<br>";

	var emptyString = 'Input search terms';
	var playerWidth = parseInt(getStyle(document.getElementById('watch-this-vid'),'width'));
	var YTButton = '<table cellpadding="0" cellspacing="0"><tr><td valign="top" style="width:120px;height:90px;">'

			+'<a href="/watch?v={id}&feature=related" rel="nofollow">'
				+'<img title="{title}" src="{image}" thumb="{image}" qlicon="{id}" alt="{title}" style="width:100px !important;height:75px !important;">'
			+'</a>'
			+'<div class="addtoQL90" style="margin-top:-16px !important;">'
				+'<a href="#" ql="{id}" title="Add Video to QuickList">'
					+'<button title="" class="master-sprite QLIconImg"'
					+'onclick="return onQuickAddClick(this, this.parentNode.getAttribute(\'ql\'), \'{image}\', \'{title}\')"'
					+'onmouseover="mouseOverQuickAdd(this)"'
					+'onmouseout="mouseOutQuickAdd(this)"'
					+'onmousedown="urchinTracker(\'/Events/VideoWatch/QuickList+AddTo\')"></button>'
				+'</a>'
				+'<div class="hid quicklist-inlist" style="width: 100px !important;">'
					+'<a href="/watch_queue?all">Added</a>'
				+'</div>'
	+'</div>'
	+'</td><td style="width:120px;height:90px;" valign="top">'
	+'<div class="video-main-content">'
		+'<div class="video-mini-title">'
			+'<a href="/watch?v={id}&feature=related" title="{title}" rel="nofollow">{title}</a>'
		+'</div>'
		+'<div class="video-view-count" style="font-size:11px !important;">{views}</div>'
		+'<div class="video-username">'
			+'<a href="{userLink}">{userName}</a>'
		+'</div>'
	+'</div>'
	+'</td></tr></table>';
			
	function getSearchResults(){
	
		var searchTerms = document.getElementById('masthead-search-term').value.replace(' ', '+');
		var searchUrl = 'http://www.youtube.com/results?aq=f&search_type=videos&search_query='+searchTerms;
		var videoEntries = null;
		
		var newDiv = document.createElement('div');
		newDiv.id = "newDiv";
		newDiv.style.display = 'none';
		document.body.appendChild(newDiv);
		
		var objContainer = document.getElementById('newDiv');
		
		GM_xmlhttpRequest({
			
			method: 'GET',
			url: searchUrl,
			headers: {},
			onload: function(responseDetails) {
				//alert(responseDetails.responseText);
				objContainer.innerHTML = responseDetails.responseText;
				var wooHoo = objContainer.getElementsByClassName('video-entry');
				var INS = document.getElementById('searchPanel');
				var insertedHTML = '<div class="video-entry">'
								  +'<table cellpadding="0" cellpsacing="0"><tr>';
				var byRow = 4;
				var onRow = 0;
				for (var i=0;i<wooHoo.length;i++){
					var vInfo = extractVideoInfo(wooHoo[i]);
					var rdyHTML = replaceElements(vInfo);
					insertedHTML += "<td valign='top' style='word-wrap: break-word;'>"+rdyHTML+"</td>";
					onRow++;
					if(byRow <= onRow){
						onRow = 0;
						insertedHTML += '</tr><tr>';
					}
				}
				insertedHTML += "</tr></table></div>";
				var wasap = document.createElement('a');
				wasap.id = "searchPanelCloseButton";
				wasap.innerHTML = '[Close]';
				wasap.href = 'javascript:void(0);';
				wasap.addEventListener('click', closeSearchPanel, true);
				INS.innerHTML = insertedHTML;
				INS.appendChild(wasap);
				
			}
		});
		
		
	}
	
	function showSearchPanel(){

		var sBox = document.getElementById('masthead-search-term');
		var ST = sBox.value;
		
		if(ST.length == 0 || ST == null || ST == emptyString){
			sBox.addEventListener('focus', function (){ document.getElementById('masthead-search-term').value = ''; }, true);
			sBox.value = emptyString;
			return false;
		}
		
		if(!document.getElementById('searchPanel')){
		
			var searchPanelContainer = document.createElement('div');
			searchPanelContainer.id = "SPC";
			searchPanelContainer.setAttribute('style', 'width:100%;height:100%;position:fixed;z-index:10;background-color:#ffffff;-moz-opacity:0.8');
			searchPanelContainer.addEventListener('click', closeSearchPanel, true);
			
			var searchPanelCreate = document.createElement('div');
			searchPanelCreate.id = 'searchPanel';
			searchPanelCreate.setAttribute('style', 'position:fixed;margin:0 auto;left:10%;top:10%;z-index:1100;width:80%;height:80%;overflow:auto;background-color:#ffffff;border: 1px outset blue;-moz-border-radius:40px 10px;padding-left:20px;padding-top:30px;opacity:0.1;');
			document.body.parentNode.insertBefore(searchPanelContainer, document.body);
			document.body.parentNode.insertBefore(searchPanelCreate, document.body);
		}else{
		
			document.getElementById('searchPanel').innerHTML = '';
			document.getElementById('SPC').style.display = 'block';
			document.getElementById('searchPanel').style.opacity = 0;
			document.getElementById('searchPanel').style.display = 'block';
		}
		
		document.getElementById('watch-this-vid').style.zIndex = "-123312312";
		document.getElementById('movie_player').style.width = '0px';
		getSearchResults();
		runFadeIn();
	}
	
	function createLiveSearchButton(){
		
		var liveSearchButton = document.createElement('div');
		liveSearchButton.id = 'liveSearchButton';
		liveSearchButton.style.width = '40px';
		liveSearchButton.style.position = 'absolute';
		liveSearchButton.style.marginTop = '-27px';
		liveSearchButton.style.marginLeft = '340px';
		//liveSearchButton.innerHTML = '<a href="javascript:showSearchPanel();">LiveSearch</a>';
		var anch = document.createElement('a');
		anch.setAttribute('class', 'yt-button yt-button-primary');
		anch.setAttribute('style', 'width: 63px !important;');
		anch.href = 'javascript:void(0);';
		anch.addEventListener('click', showSearchPanel, true);
		anch.innerHTML = '<span>live Search</span>';
		liveSearchButton.appendChild(anch);
		var elmObj = document.getElementById('masthead-search-term');
		elmObj.parentNode.insertBefore(liveSearchButton, elmObj.nextSibling);
	}

	
	function extractVideoInfo(strInputCode){

		var vInfo = new Array;
		vInfo['link'] = strInputCode.getElementsByTagName('a')[0].href;
		if(strInputCode.getElementsByClassName('vimg120')[0].getAttribute("thumb") == null){
			vInfo['img'] = strInputCode.getElementsByClassName('vimg120')[0].src;
		}else{
			vInfo['img'] = strInputCode.getElementsByClassName('vimg120')[0].getAttribute("thumb")
		}
		vInfo['title'] = strInputCode.getElementsByClassName('vimg120')[0].title;
		vInfo['dateAdded'] = strInputCode.getElementsByClassName('video-date-added')[0].innerHTML;
		vInfo['views'] = strInputCode.getElementsByClassName('video-view-count')[0].innerHTML;
		if(typeof(strInputCode.getElementsByTagName('a')[7]) != "undefined"){
			vInfo['uploaderName'] = strInputCode.getElementsByTagName('a')[7].innerHTML;
			vInfo['uploaderLink'] = strInputCode.getElementsByTagName('a')[7].href;
		}else{
			vInfo['uploaderName'] = strInputCode.getElementsByTagName('a')[6].innerHTML;
			vInfo['uploaderLink'] = strInputCode.getElementsByTagName('a')[6].href;
		}
		//vInfo['id'] = /v=(.*)/g.exec(vInfo['link'])[1];
		vInfo['id'] = vInfo['link'].split(/v=/g)[1];
		return vInfo;
	}	

	function replaceElements(vInfo){
	
		formatTitle = (vInfo['title'].length >= 60)?vInfo['title'].substr(0, 54)+'...':vInfo['title'];
		formatTitle = wordwrap(formatTitle, 20, "<br>", true);
		var button = YTButton.replace(/{id}/g, vInfo['id']);
		button = button.replace(/{image}/g, vInfo['img']);
		button = button.replace(/{title}/g, formatTitle);
		button = button.replace(/{views}/g, vInfo['views']);
		button = button.replace(/{userName}/g, vInfo['uploaderName']);
		button = button.replace(/{userLink}/g, vInfo['uploaderLink']);
		return button;
	}

	function closeSearchPanel(){
	
		document.getElementById("movie_player").style.width = playerWidth+"px";
		document.getElementById("SPC").style.display = "none";
		document.getElementById("searchPanel").style.display = "none";
		return false;
	}

	function runFadeIn(){
		
		for (var i=0;i<11;i++){
		
			setTimeout('setOpacity('+i+')',100*i);
		}
	}


	function setOpacity(value){
		
		var obj2 = document.getElementById('searchPanel');
		obj2.style.opacity = value/10;
	}

	function keyListener(e){
	
		switch(e.keyCode){
			case 112: showSearchPanel(); e.preventDefault(); break;
			case 27: closeSearchPanel(); e.preventDefault(); break;
			default: break;
		}
	}

	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkUpdate(){

		var scriptId = "53043";
		var time = new Date().getTime();
		if (GM_getValue('updated', 0) == 0){ 
			GM_setValue('updated', ""+time+"");
		}
		
		var lastUpdate = GM_getValue('updated', 0);
		var diff = (time-lastUpdate)/(1000*60*60);
		
		if(diff >= 24){
		
			GM_xmlhttpRequest({
				
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/'+scriptId+'.meta.js',
				headers: {},
				onload: function(responseDetails) {
					var latestVersion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(responseDetails.responseText)[1].replace(/\./g, '');
					var currentVersion = /\/\/\s*@version\s+(.*)\s*\n/i.exec(MetaTags)[1].replace(/\./g, '');
					if(currentVersion < latestVersion){
						var updateBox = document.createElement('span');
						updateBox.id = 'vb7dl_updateBox';
						updateBox.innerHTML = '<span style="text-decoration:blink;color:red;">New</span> version of YouTube Live Search<a href="http://userscripts.org/scripts/show/'+scriptId+'" style="text-decoration:none;color:red;">Click here</a><a style="position:fixed;right:0;margin-right:5px;text-decoration:none;color:black;" href="javascript:void(0);" onClick="javascript:document.getElementById(\'vb7dl_updateBox\').style.display=\'none\';">[X]</a>';
						updateBox.setAttribute('style', 'position:fixed;z-index:1100;bottom:0;right:0;background-color: #C8FFCA;border: 1px solid #349534;color: #008000;width:422px;height:19px;padding-top:3px;padding-left:8px;font-weight:bold;font-size: 11px;');
						document.body.appendChild(updateBox);
					}else{
					
						GM_setValue('updated', ""+time+"");
					}
				}
			});	
			
			
		}
	}
	
	function wordwrap( str, int_width, str_break, cut ) {
	    // PHP Defaults
	    var m = ((arguments.length >= 2) ? arguments[1] : 75   );
	    var b = ((arguments.length >= 3) ? arguments[2] : "\n" );
	    var c = ((arguments.length >= 4) ? arguments[3] : false);
	 
	    var i, j, l, s, r;
	 
	    str += '';
	 
	    if (m < 1) {
	        return str;
	    }
	 
	    for (i = -1, l = (r = str.split(/\r\n|\n|\r/)).length; ++i < l; r[i] += s) {
	        for(s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")){
	            j = c == 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
	        }
	    }
	    
	    return r.join("\n");
	}


	function getStyle(elem, attribute){
		
		return document.defaultView.getComputedStyle(elem,null).getPropertyValue(attribute);
	}	

	function embedFunction(s) {
	
		var script = document.createElement('script');
		script.innerHTML = s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
		document.body.appendChild(script);
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	embedFunction(setOpacity);
    createLiveSearchButton();
	checkUpdate();
	window.addEventListener('keydown', keyListener, true);

	