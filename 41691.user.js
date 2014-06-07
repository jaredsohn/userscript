// ==UserScript==
// @name           VidzBigger
// @namespace      http://vidzbigger.com
// @description   Automatically Scale YouTube Video to Largest Possible Size Scroll down to read comments without missing video 
// @include       http://www.youtube.com/*
// @include       http://youtube.com/*
// @include       http://*.youtube.tld/*
// @include       http://youtube.tld/*
// @include       http://video.google.tld/*
// @include       http://www.dailymotion.com/*
// @include       http://www.metacafe.com/*
// @include       http://www.hulu.com/*
// @include       http://vimeo.com/*
// @include       http://www.escapistmagazine.com/*
// @include       http://*vidzbigger.tld/*
// @match         http://www.youtube.com/watch*
// @exclude       http://www.vidzbigger.com/demo*
// @exclude       http://www.vidzbigger.com/videoSimple*
// @exclude       http://www.vidzbigger.com/blog*
// @exclude       http://vidzbigger.com/demo*
// @exclude       http://vidzbigger.com/videoSimple*
// @exclude       http://vidzbigger.com/blog*
// @exclude       http://video.google.tld/videosearch*
// @exclude       http://*youtube.tld/copyright*
// @exclude       http://*youtube.tld/my*
// @exclude       http://*youtube.tld/watch_popup*
// @exclude       http://*digg.com/tools*
// ==/UserScript==  
	
////*****************************************************************************///
///                                                                               //
//        LOOKS LIKE YOU FORGOT TO ENABLE GreaseMonkey!  Click the monkey!        //
//                                                                                //
//   (the monkey is located in the bottom right corner of your firefox window)    //
//   (in the status bar,which you can show using view status bar if you need)     //
//                                                                                //
//    Once the monkey is Lit Up (not grey) click your back button and try again!  //
//                                                                                //
//               SORRY IE USERS-NO SUPPORT for GreaseMonkey Yet.                  //
//                 Download Firefox and/or visit VidzBigger.com                   //
//                                                                                //
//********************************************************************************//
//********************************************************************************//
//*******************************************************************************//
//******************************************************************************//

var vidz_Version=0.072;
var startTime=new Date().getTime();
var vFlashVars="";
var detectn=false;
var BG_Values={};
var isGlobalSave=false;
var videoNode,videoHidden;

if( typeof(GM_xmlhttpRequest)=='undefined' ){
	function GM_xmlhttpRequest(obj){//ew
		prHTM='<a href="javascript:void(0)" onclick="this.parentNode.parentNode.removeChild(this.parentNode)" style="display:block;background-color:#55F;">Close</a><iframe id="tv_brsr" style="overflow:scroll;display:block" src="'+(obj.url)+(obj.url.indexOf('?')<0?'?':'&')+"unreal=t"+'" width="'+colWidth+'" height="300"></iframe>';
		var lastRequest=document.createElement("DIV");
		var distyl='text-align:center;border:1px solid #55F;';
		if( obj.url.indexOf('version.php') < 0 )distyl+='display:none;';
		lastRequest.setAttribute('style',distyl);
		if( _vt(unwin.ids_right_column) ) $g(unwin.ids_right_column).appendChild(lastRequest);
		else document.body.appendChild(lastRequest);
		lastRequest.innerHTML=prHTM;
	}
}
if (typeof(GM_setValue)=='undefined'){
  function COOK_setValue(name, value) {
    var date=new Date();
    date.setTime(date.getTime() + ((value!=null?1:-1)*(365 * 24 * 60 * 60 * 1000)));   // expires one-year later or ago if null
    var expires="; expires="+date.toGMTString();
    document.cookie=name + "=" + value + expires + "; path=/";
	}
	function GM_setValue(n,v){COOK_setValue(n,v);}
}
if(typeof(GM_getValue)=='undefined'){//||GM_getValue('valtsave',false)
  function COOK_getValue(name, defaultValue){
    var nameEQ=name + "=";
    var cookieArr=document.cookie.split(';');
    for(var i=0;i < cookieArr.length;i++){
      var cookie=cookieArr[i];
      cookie=cookie.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      if (cookie.indexOf(nameEQ) == 0){//rt:Boolean,Integer,String
      	var theval=cookie.substring(nameEQ.length, cookie.length);
      	switch(theval){
	        case 'true': return true;
	        case 'false': return false;
	        default:var intval=new Number(theval);if(!isNaN(intval))return intval;return theval;
    	  }
      }
    }
    return defaultValue;
	}
	function GM_getValue(n,d){return COOK_getValue(n,d);}
}
var styleelem;//,screelem;
if( typeof(GM_addStyle)=='undefined' ){	
function GM_addStyle(styles){
	styleelem=document.createElement('style');
	styleelem.type='text/css';
	styleelem.appendChild(document.createTextNode(''+styles+''));
	GM_addStyle=function(styles){
		styleelem.appendChild(document.createTextNode(''+styles+''));
	}
	VM_ClearStyles=function(){if(styleelem){
		styleelem.innerHTML='';//if mistakenly added something....grr
	}}
	VM_AppendStyles=function(){if(styleelem){//dont't append hte element until its mostly loaded with text nodes
		var e=(document.getElementsByTagName('head')[0]||document.body);
		if(e){e.appendChild(styleelem);GM_setValue('cdelay',-1);
			//e.removeChild(styleelem);
		}else{
			console.log('No document header or document body detected.... please reload the page... or enable auto reload on blank page in preferences... deleting most cookie prefrences you might have... you may want to clear cookies manually');
			if(unwin.vidzb_tf_prefs){
				for( i in unwin.vidzb_tf_prefs ){
					//delete cookie value if exists....
					COOK_setValue(i,null);
				}
			}
			COOK_setValue('cdelay',null);//kinda dangerous but whatever..
			COOK_setValue('positionPersistently',null);
			COOK_setValue('',null);//odd one... wonder if its just in minde
			GM_setValue('cdelay',GM_getValue('cdelay',-1)+1);if(unwin.enableAutoReload){var dl=Math.pow(2,GM_getValue('cdelay',1));window.setTimeout(function(){console.log('retrying..'+dl);if(true||confirm('Something didnt work right (the screen is blank?), attempt reload?')){window.location.reload()}},dl*1000)}
		}
		//else if(confirm('Page not there Dissable VidzBigger ore reload to continue . . :\\')){window.setTimeout(function(){console.log('retrying..');window.location.reload()},1000)};
	}}
}}
var doneloading=false;
function GM_addScript(styles){window.location='javascript:'+styles;}
if(new String(navigator.userAgent).indexOf('Chrome/')>0){
	detectn=true;
	if(typeof(chrome)!='undefined')chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		if (request.getPrefs)
	  	window.vidzb_showPrefs();
	  sendResponse({});
	});
	
//	if( window.location.host.indexOf('youtube.com')>0 ){
//		function ddnodeInserted(E){
//			if(E.relatedNode.innerHTML.indexOf('<embed ') > -1 ){
//				vFlashVars = new String(E.relatedNode.innerHTML);
//				vFlashVars=vFlashVars.qslice('flashvars="','"');
//				preYousableSetup();
//				E.relatedNode.innerHTML = E.relatedNode.innerHTML.replace('<embed','<embed style="display:none;"');videoHidden=true;//delete spiteful rant hide truth
//				console.log(E.relatedNode.innerHTML);
//				document.removeEventListener("DOMNodeInserted", ddnodeInserted,false);
//				videoNode=E.relatedNode;
//			}
//		}
//		document.addEventListener("DOMNodeInserted", ddnodeInserted,false);
//	}
//	function reinstateHiddenVideo(newVideoItself){
//		document.removeEventListener("DOMNodeInserted", ddnodeInserted,false);
//		if(videoHidden){
////			if( newVideoItself.innerHTML.indexOf('<embed style="display:none;"') > -1 ){
////				//OOPS this is the quick repair, allows dissable in chrome by re-enabling the video....
////				newVideoItself.innerHTML=newVideoItself.innerHTML.replace('<embed style="display:none;"','<embed');
////			}else if( document.getElementsByTagName('embed').length > 0 ){
////				var zembeds = document.getElementsByTagName('embed');
////				zembeds[0].parentNode.innerHTML=zembeds[0].parentNode.innerHTML.replace('<embed style="display:none;"','<embed');
////			}else if(typeof(videoNode) != 'undefined' && typeof(videoNode.innerHTML) != 'undefined' && videoNode.innerHTML.indexOf('<embed style="display:none;"') > -1 ){
////				videoNode.innerHTML=videoNode.innerHTML.replace('<embed style="display:none;"','<embed');
////			}else{
////				console.log('error restating video');
////			}
//			
//			//unwin.searchVideoPlayer(newVideoItself).style.display='block';
//		}
//	}
	if(detectn)function GM_xmlhttpRequest(robj){
		robj.msgType="G_xmlhttpRequest";var obj=robj;
		if(typeof(chrome)!='undefined')chrome.extension.sendRequest(robj, function(response){obj.onload(response)});
	}
	function GM_setValue(name, value){
		if(typeof(localStorage)=='object')localStorage[name]=value;
  	else COOK_setValue(name,value);
  	//BG_Values[name]=value;//only for until next reload
  	//if(isGlobalSave)chrome.extension.sendRequest({msgType:'G_setValue',n:name,v:value}, function(response){});
	}
	function GM_getValue(name, defaultVal){
		
		if(typeof(localStorage)=='object' && typeof(localStorage[name]) != 'undefined'){
				//delete cookie value if exists....
				COOK_setValue(name,null);  //these cookie cleaning sections willl eventually need to be removed//but not until after everyone has saved their preferneces.... possible to force save however after//loading preferences i assume... then all cookies could be removed... or another preference could track progress on this//for now we will simply set something in local storage when save is pressed????? or tahts next...//however its simpler than that most likely, if the last known version used is greater than 0.063;lastKnownVersionUsed//then they have probably saved using the new method!  in that case we should probably skip cookie deletion for those people.... i'd rather not force a save to occur as simple as it might be to call the function since its still almost impossible to remove this code unless they are definitely using the next version in case they re-activate it much later.. wow those cookies took up a lot of space hahaha 4096+ extra bytes in every request...
			var val=localStorage[name];
			if(val=='true')return true;
			if(val=='false')return false;
			if(!isNaN(val*1))return val*1;
			return val;
		}else return COOK_getValue(name,defaultVal);
		//if(localStorage[name])return localStorage[name];//lc is per site basis storage
		//if(BG_Values[name])return BG_Values[name];
//		if(isGlobalSave && BG_Values[name]){
//			//console.log(name+"->"+BG_Values[name])
//			return BG_Values[name];
//		}
		//if(localStorage[name])return localStorage[name];
	}
	function loadGloballySaved(){
		isGlobalSave=true;
		var tempValues={}
		chrome.extension.sendRequest({msgType:'G_getValues'}, function(response){
			tempValues=response;
			completeGlobalLoad(tempValues)
		});		
	}
	function completeGlobalLoad(tempValues){
		BG_Values=tempValues;
		console.log(preferencesToString());
		loadPreferences();
		console.log(preferencesToString());
		//unwin.forcevidzb_apply_selected_fixes();//applys and refreshes prefs
		console.log(preferencesToString());
		console.log(unwin.invertColorScheme);
	}
}

///////////////////////////// START OF STRING FUNCTIONS /////////////////////////////
// Extends the String object with a trim funcion
String.prototype.trim=function(){
	return this.replace(/^\s+|\s+$/g,"");
};
// Extends the String object with a replace funcion,does the infinity replace (not just one instance)
String.prototype.qreplace=function(qsearch,qreplace){
	return this.split(qsearch).join(qreplace);
};
String.prototype.qslice=function(before,after){
	var s=this.indexOf(before)+before.length; 
	var n=this.indexOf(after,s);
	if(n<0)return this.substr(s);
	return this.substr(s,n-s);
}
// Adds !important to CSS rules of any type
String.prototype.makeImportant=function(){
	var Selector,DeclarationBlock,CssArray=this.match(/([^{]+)({[^{}]+})/);
	if (CssArray===null){
		// Inline CSS rule (e.g. "display: none") or scripting rule (e.g. element.style.display="none")
		Selector="";
		DeclarationBlock=this;
	}
	else{
		// Complete CSS rule (e.g. ".nd{display: none}")
		Selector=CssArray[1];
		DeclarationBlock=CssArray[2];
	}
	// Adds !important to each rule
	if (DeclarationBlock.indexOf(":") !=-1){
		DeclarationBlock=DeclarationBlock.replace(/[^:;{}]+:[^:;{}]+/g,"$& !important");
	}
	else{
		// No estructure could be recognized,so we'll just add !important
		DeclarationBlock+=" !important";
	}
	// Remove any !important duplicates
	DeclarationBlock=DeclarationBlock.replace(/(?:\s*!important\s*){2,}/gi," !important");
	return Selector+DeclarationBlock;
};
//Transforms a number into a valid CSS dimension (in pixels)
Number.prototype.toCSS=function(){
	return String(Math.round(new Number(this)))+"px";//maybe I should use this more...
};
String.prototype.CSStoInteger=function(){
	return this.qreplace('px','');
}
function _vt(id){// i like this saves so much time
	if(document.getElementById(id))//i hope thats not an expensive test
		return document.getElementById(id);
	else
		return false;
}

//added by vidzbigger// dolla g is only to be used if u already guaranteed with if(_vt('id')) (should only be called if nexted in an if statement using dolla $^
function $g(id){return document.getElementById(id);}
unwin=window;//:0
if(!detectn && GM_getValue('allowUnsafeWindow',false)){
	if( typeof(unsafeWindow)!='undefined' ) unwin=unsafeWindow;//FOIRFOXg
}
unwin.colWidth=new Number(GM_getValue('colWidth','360'));
//unwin._vt=function(id){return _vt(id);}//not compatable...
var wUrl=window.location.href;
/////////////////////////////START CSS STUFF FUNCTIONS /////////////////////////////
var scriptStyles=[];
// Adds a class to set anchors' text decoration
// Anchors with the class and descendant anchors of elements with the class are affected (text-decoration isn't automatically inherited)
scriptStyles.push("a.gsanchors,.gsanchors a{text-decoration: none}");
scriptStyles.push("a.gsanchors:hover,.gsanchors a:hover{text-decoration: underline}");
// Adds classes and a style for the easy-to-use download links (and its parent div)
scriptStyles.push(".gsdownloadLinks{margin: 0px 4px;font-weight: bold}");
scriptStyles.push(".gsdownloadLinkDisabled{color: gray;cursor: default}");
scriptStyles.push("#gsdownloadLinksDiv{border-top: 1px solid #CCCCCC;padding-top:5px;padding-left:10px;padding-bottom:3px;}");
//scriptStyles.push(".expand-content{height:300px;overflow:auto;overflow-x:hidden;position:relative;}");
//VB styles...
scriptStyles.push("#vizbigger_title{text-align:center;color:black;position:relative;}");
scriptStyles.push("#vidzBPrefsHolder{padding:5px;background-color:black;color:white;border:1px solid white;border-top:1px solid none;}");
scriptStyles.push("#vidzBPrefsHolder h3{border-top:1px solid #444; margin:2px;}");
scriptStyles.push("#vizbigger_footer{padding-top:10px;}");
scriptStyles.push("#vizbigger_content_area{min-height:800px;}");//this should be dynamic but this werks good 4 me
scriptStyles.push(".vidzb_pref_row{padding:2px;position:relative;padding-right:10px;}");
scriptStyles.push("#vizbigger_content_column_left,#vizbigger_content_column_right{overflow:auto;overflow-x:hidden;}");
scriptStyles.push("#vidzbigger_prefs_menu input{font-size:10px;}");
scriptStyles.push("#vidzbigger_prefs_menu select{font-size:12px;}");
scriptStyles.push("#vb_scr_indiv {cursor:w-resize}");

//scriptStyles.push("object{display:none}");
//scriptStyles.push("video{display:none}");
//scriptStyles.push("embed{display:none}");


//all sites
scriptStyles.push("body{margin:0px;overflow-x:hidden;}");
//These work great because u can nest them in a hirearchy!Seems not to work correct above always (a tags)
GM_addStyle(
"body{margin:0px;overflow-x:hidden;}"+"\r\n"+
"#vidz_message a{color:#4444FF;}"+"\r\n"+
"#vidzbigger_prefs_menu   a{color:#52A3EE;}");//52a3ee //52A3EE
////////////////////////////// END OF GLOBAL CSS STYLES //////////////////////////////
//thus begins                   var definitions 
unwin.ids_vb_hold="vizbigger_all_content_holder";
unwin.ids_vb_head="vizbigger_head";
unwin.ids_vb_titl="vizbigger_title";
unwin.ids_vb_foot="vizbigger_footer";
unwin.ids_vb_cont="vizbigger_content_area";
unwin.ids_vb_left="vizbigger_content_column_left";
unwin.ids_vb_midl="vizbigger_content_column_center";
unwin.ids_vb_rigt="vizbigger_content_column_right";

//lets us assign an ID to elements that only have a class... although it only matches the first result!
unwin.getElementByClassNameAndAssignID=function(searchelem,clasname,newid,idx){	
	if(searchelem==null)return;
	if(typeof(searchelem)!='undefined'&&typeof(searchelem.getElementsByClassName)=='function'){
		var elm=searchelem.getElementsByClassName(clasname)[0]
		if( elm ){
			 elm.id=newid;
			return elm;
		}
	}
	/*//attempt that failed, above is superior anyway 
	if( !searchelem.childNodes ) return;
	var q="@class("+ clasname + ")";
	var elem=$x1("//]",searchelem)
	elem.id=newid;
	alert(elem.id);
	return elem;
	*/
	var cnt=0;var cn=searchelem.childNodes;
	if(typeof(idx)=='undefined') idx=0;
	if(typeof(cn)!='undefined'){
		for(var c=0;c<cn.length;c++){
			if(cn[c].className==clasname){
				cnt++;
				if(cnt>idx){
					var elem=cn[c];
					elem.id=newid;
					return elem;
				}
			}else if(cn[c].childNodes.length>0){
				unwin.getElementByClassNameAndAssignID(cn[c],clasname,newid);
			}
		}
	}
}
unwin.vidzb_GrabNode=function(nodid){ if(_vt(nodid))return $g(nodid);	else return document.createElement('div');}
unwin.vidzb_GrabAndRemoveNode=function(nodid){if(_vt(nodid)) return $g(nodid).parentNode.removeChild($g(nodid));	else return document.createElement('div');}
unwin.videoitselfchildNodenumber=0;
unwin.jsapimessage='';
unwin.userLoggedInStatus='';
unwin.siteID=0;
//decoes data 
function decodeIncomingData(dattastr){
	var outData=[];
	var datapieces=dattastr.split('<br/>');

	for(i in datapieces){
		var datapiece=new String(datapieces[i]);
		var dataNameVal=datapiece.split("=>");
		if( dataNameVal[0] && dataNameVal.length > 1 )
			outData[dataNameVal[0]]=dataNameVal[1];
	}	
	return outData;
}
//....................................................................
// Events Factory // Copyright (c) 2005 Tim Taylor Consulting
//....................................................................
window.cevents={
	register : function(element,type,func){
		if (typeof(element.addEventListener)=='function'){
			element.addEventListener(type,func,false)
		} else if (element.attachEvent){
			if (!element._listeners) element._listeners=[]
			if (!element._listeners[type]) element._listeners[type]=[]
			var workaroundFunc=function(){
				func.apply(element,[])
			}
			element._listeners[type][func]=workaroundFunc
			element.attachEvent('on'+type,workaroundFunc)
		}
	}
}
//END EVENTS FACTORY*****************************************************
unwin.adDivInfos=[];
unwin.vb_replacementAds=[];
unwin.vb_replacementAds['nothing']='';// these are defaults, can be overriden if vidzb_allowMyObnoxiousAds is checked in preferences under advertising
unwin.vb_replacementAds['box']='<div>Ad Blocked by <a href="http://www.vidzbigger.com/">VidzBigger.org</a> Beta</div>';
unwin.vb_replacementAds['skyscraper']='<div>Ad Blocked by <a href="http://www.vidzbigger.com/">VidzBigger.org</a> Beta</div>';
unwin.vbisreadytogo=true;
unwin.ids_vb_indi='vb_scr_indiv';
var vsiteInitFun=function(){};
// Adds the styles from the script to the page,making them important
function addStylesArray(scriptStyles){
	scriptStyles.forEach(function(s){GM_addStyle(s.makeImportant());});
}/*
//GOOGLE*****************************************
//if(wUrl.indexOf('video.google.')>0){
//	if(wUrl.indexOf('videoplay')>0){
//		/*unwin.getElementByClassNameAndAssignID(_vt('abs-video-container'),'titlebar','titlebar');
//		unwin.getElementByClassNameAndAssignID(_vt('titlebar'),'titlebar-title','titlebar-title');
//		unwin.ids_all_holder_hide='baseDiv';
//		unwin.ids_video_holder='player';
//		unwin.ids_left_column='top-pane';
//		//unwin.ids_left_column2='tv-related';
//		unwin.ids_right_column='bottom-pane';
//		unwin.ids_title='titlebar';
//		unwin.ids_texttitle='titlebar-title';
//		unwin.ids_header0='gbar,guser';
//		unwin.ids_header='header';
//		unwin.ids_header2='titlebar';
//		unwin.ids_footer='guser';
//		//unwin.ids_footer2='gbar';
//		unwin.watchStrings='video.';
//		unwin.videoitselfchildNodenumber=0;	//
//	}else{
//		scriptStyles.push("#vizbigger_footer{border-top:1px solid #C9D7F1;}");
//		scriptStyles.push("#gbar{display:block;}");
//		scriptStyles.push("#guser{display:block;}");
//		scriptStyles.push("#gbi{display:block;top:auto;top:-5px;}");
//		scriptStyles.push(".gb2{display:block;}");
//		scriptStyles.push("#vidzbigger_prefs_menu{top:19px;}");
//	} 
//	if(wUrl.indexOf('videosearch')>0){	
//		//http://video.google.com/videosearch?q=cool+videos&hl=en&emb=0&aq=f#	
//		unwin.ids_all_holder_hide='baseDiv';
//		unwin.ids_video_holder='iplay-embed-container';
//		unwin.ids_left_column='search-results';
//		//unwin.ids_left_column2='iplay-container';
//		unwin.ids_right_column='iplay-container';
//		unwin.ids_title='iplay-title';
//		unwin.ids_texttitle='current-title';
//		unwin.ids_header0='gbar,guser';
//		unwin.ids_header='videoheader';
//		unwin.ids_header2='resultsheadertable';
//		if(_vt('resultsheadertable')){
//			_vt('resultsheadertable').nextSibling.nextSibling.id="suggestheadertable";
//			unwin.ids_header3='suggestheadertable';}
//		//unwin.ids_footer='gbar';
//		//unwin.ids_footer2='guser';
//		unwin.watchStrings='video.';
//		//unwin.videoitselfchildNodenumber=0;
//		scriptStyles.push("body{overflow-y:auto;}");
//		scriptStyles.push("#tv-related{width:"+unwin.colWidth+"px;position:relative;height:auto;overflow:expand;}");
//		scriptStyles.push(".video-list-row{display:inline-table;width:160px;}");
//		scriptStyles.push("#video-data-spacer{top:auto;height:auto;position:relative;}");
//		scriptStyles.push("#video-data{height:auto;}");
//		scriptStyles.push("#search-results{height:auto;}");
//		scriptStyles.push("#related-box{position:relative;}");
//	}else{
//		//http://video.google.com/?hl=en
//		unwin.getElementByClassNameAndAssignID(_vt('hotstuff'),'hot_videos_title_bar','hot_videos_title_bar');
//		unwin.getElementByClassNameAndAssignID(_vt('hotstuff'),'metadata','right1');
//		unwin.ids_all_holder_hide='baseDiv';
//		unwin.ids_video_holder='hs_player';
//		unwin.ids_left_column='thumbnail_grid';
//		unwin.ids_right_column='right1';
//		unwin.ids_right_column2='recommended-pane';
//		//unwin.ids_title='watch-vid-title';
//		unwin.ids_texttitle='hs_title_link';
//		unwin.ids_header0='gbar,guser';
//		unwin.ids_header='videoheader';
//		unwin.ids_header2='hot_videos_title_bar';
//		if(_vt('resultsheadertable')){
//			_vt('resultsheadertable').nextSibling.nextSibling.id="suggestheadertable";
//			unwin.ids_header3='suggestheadertable';}
//		//unwin.ids_footer='gbar';
//		//unwin.ids_footer2='guser';
//		unwin.watchStrings='video.';
//		scriptStyles.push(".video-list-item{height:180px;}");
//		scriptStyles.push(".thumbnail_grid{clear:both;}");
//		scriptStyles.push(".thumbnail_grid td{vertical-align:top;display:inline-table;}");
//		scriptStyles.push(".video{font-size:12px;}");
//		scriptStyles.push(".thumbnail img{padding-right:50px;}");
//		scriptStyles.push(".title,.title img{height:auto;position:relative;}");
//		scriptStyles.push("td.right {text-align:right;width:"+unwin.colWidth+"px;}");
//		scriptStyles.push(".page-numbers{float:right;}");
//		scriptStyles.push(".hot_videos_title_bar{background:#F0F7F9 none repeat scroll 0 0;border-top:1px solid #6B90DA;margin-bottom:7px;width:100%;}");
//	}
//YOUTUBE*****************************************
//}else */
if(wUrl.indexOf('youtube.')>0){
vsiteInitFun=function(){
	unwin.siteID=1;
	if(wUrl.indexOf('/user/')>0){
		unwin.simpleViewMode=true;
		unwin.ids_all=new Array();
		unwin.ids_all[0]='playnav-player';
		unwin.ids_all[1]='playnav-play-panel';
		scriptStyles.push("body{overflow-x:auto;}");
		//var opacity=50 opacity:'+(opacity/100)+'; filter: alpha(opacity='+(opacity)+'); -moz-opacity: '+(opacity/100)+';'
		scriptStyles.push('#o_placer_playnav-player{visibility:hidden)');
	}else if(document.body&&document.body.className.indexOf('watch5-a')==0){
		unwin.ids_header='masthead';
		unwin.ids_title='watch-headline';
		unwin.ids_video_holder='watch-player';
		unwin.ids_left_column='watch-panel';
		unwin.ids_right_column='watch-sidebar';
		unwin.watchStrings='watch?';
		unwin.ids_footer='footer';
		unwin.ids_downloadLinks='watch-info';
		scriptStyles.push(".watch-module{margin-left:0px;margin-right:4px;}");
		scriptStyles.push("#watch-player{width:100%;height:100%;}");
		scriptStyles.push("#watch-sidebar{margin-top:0px;}");
		scriptStyles.push("#watch-comments-actions button{position:relative;top:-20px;}");
		scriptStyles.push("#watch-discussion .wrapper{padding: 5px 5px 10px 0px;}");
		scriptStyles.push("#watch-discussion .indent .wrapper{width:"+(unwin.colWidth-20)+"px;}");
		scriptStyles.push("#masthead-nav a{border-left: 1px solid #CCC;padding: 0.1em 0.8em;white-space: nowrap;margin-top:8px;position:relative;top:10px;left:8px;}");
	}else if(_vt('oo')){//if(document.getElementsByTagName('link')[0].href.indexOf('www-feather')>0){
		//cursory featherlight support....  i guess should be loaded enough to tell by now .. 
		//if(typeof(VM_ClearStyles)!='undefined')
		unwin.ids_video_holder='p';
		unwin.ids_left_column='cm';
		unwin.ids_right_column='rc';
		unwin.ids_title='ct';
		unwin.ids_header='mh';
		unwin.ids_footer='vo';
		unwin.ids_footer2='ft';
		unwin.ids_downloadLinks='vd';
		unwin.watchStrings='watch?';
		scriptStyles.push("body{width:auto;}");
		scriptStyles.push("#p{width:auto;height:auto;}");
		scriptStyles.push("#rc{float:none;}");
		scriptStyles.push('.watch-comment-down,.watch-comment-down-on,.watch-comment-down-hover,.watch-comment-up,.watch-comment-up-on,.watch-comment-up-hover{width:19px;height:19px;border:0;vertical-align:bottom}.watch-comment-down-hover:hover,.watch-comment-down-on{background-position:0 -209px}.watch-comment-down,.watch-comment-down-hover,.watch-comment-voting-off .watch-comment-down-hover{background-position:0 -190px}.watch-comment-up-hover:hover,.watch-comment-up-on{background-position:-19px -209px}.watch-comment-up,.watch-comment-up-hover,.watch-comment-voting-off .watch-comment-up-hover{background-position:-19px -190px}.opacity30,.watch-comment-up,.watch-comment-down,.watch-comment-voting-off .watch-comment-down-hover,.watch-comment-voting-off .watch-comment-up-hover{-moz-opacity:.3;-webkit-opacity:.3;opacity:.3;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=30)}.opacity80,.watch-comment-down-on,.watch-comment-up-on,.watch-comment-down-hover,.watch-comment-up-hover{-moz-opacity:.8;-webkit-opacity:.8;opacity:.8;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=80)}');
		scriptStyles.push(".watch-comment-spam-bug{display:none;}");
		scriptStyles.push(".master-sprite watch-comment-down-hover{display:none;}");
		scriptStyles.push(".master-sprite watch-comment-up-hover{display:none;}");
	}else{
		unwin.ids_all_holder_hide='page';
		unwin.ids_video_holder='watch-player';
		unwin.ids_left_column='watch-panel';
		unwin.ids_right_column='watch-sidebar';
		unwin.ids_title='watch-headline';
		unwin.ids_header='pagebottom';
		unwin.ids_header2='pagetop';
		//unwin.ids_header3='watch-owner';
		unwin.ids_footer='footer';
		//unwin.ids_footer2='pagebottom';
		unwin.ids_downloadLinks='watch-info';
		unwin.watchStrings='watch?';
		unwin.ignoreList=['page','watch-owner'];
//		unwin.extraModControls='quicklist';

		scriptStyles.push("#quicklist{position:relative;padding-bottom:11em;}");
		scriptStyles.push("#quicklist-bar{margin-right:160px;}");
		scriptStyles.push("#pagebottom{overflow:hidden;}");
		scriptStyles.push("#footer-container{display:none;}");
//		scriptStyles.push("#footer{padding-bottom:0px;}");
		
		
		scriptStyles.push("#watch-description-body{max-width:"+(unwin.colWidth-138)+"px;}");
		scriptStyles.push(".video-mini-title{max-height:none}");
		scriptStyles.push("#watch-longform-buttons{top:0px;z-index:999;position:absolute;right:10px;}");
		scriptStyles.push("#annotations-toggle-switch{display:inline;z-index:999;}");
		scriptStyles.push("#watch-video-quality-setting{height:auto;}");
		scriptStyles.push(".watch-tabs{width:"+unwin.colWidth+"px;}");
		//scriptStyles.push(".watch-video-response{width:67px;}");
		//scriptStyles.push(".v90WideEntry{width:92px;}");
		//scriptStyles.push(".v90WrapperOuter{width:92px;}");
		//scriptStyles.push(".v90WrapperInner{width:90px;}");
		//scriptStyles.push(".search-settings-link{position:relative;}");
		scriptStyles.push("#watch-vid-title{position:relative;text-align:center;}");
		scriptStyles.push("#watch-other-vids{margin-top:0px;}");
		scriptStyles.push(".watch-comment-entry{position:relative;}");
		//scriptStyles.push(".spaceholder{color:white;visibility:hidden;}");
		//scriptStyles.push(".floatytitle{width:99%;margin-left:auto;margin-right:auto;}");
		//scriptStyles.push("#watch-highlight-racy-box{color:grey;border:1px solid #CCCCCC;}");
		scriptStyles.push("#watch-views-div{width:120px;}");
		scriptStyles.push("#watch-rating-div{width:220px;}");
		scriptStyles.push("#ratingWrapper{width:166px;}");
		scriptStyles.push(".comments-reply-form{margin-left:0px;}");
		//scriptStyles.push("#search-form{padding-left:270px;}");
		//scriptStyles.push("#save-changes-div{display:block;}");
		//scriptStyles.push(".links{padding-bottom:0px;}");
		//scriptStyles.push("#copyright{padding:0px;}");
		//scriptStyles.push(".basic-dropdown-link .dropdown{font-size:9px;line-height:10px;}");
		//scriptStyles.push(".yt-dropdown-menu li{font-size:9px;line-height:10px;}");
		//scriptStyles.push(".yt-menulink-menu li a{font-size:8px;line-height:9px;}");
		scriptStyles.push(".watch-comment-action{position:absolute;top:0px;right:65px;}");
		if(new String(navigator.userAgent).indexOf('Firefox/2')>0){
			if((wUrl.indexOf('/user/')>0 || wUrl.indexOf('/profile')>0) && wUrl.indexOf('&eurl=')<0)
				scriptStyles.push("#util-links{position:relative;top:40px;}");//firefox2 youtube
		}
		scriptStyles.push(".user-thumb-medium div{margin-left:0px;width:0px;}");
		
	}
	unwin.adDivInfos.push(Array('watch-channel-brand-div','box'));
	unwin.adDivInfos.push(Array('myAd_pva','box'));
	unwin.adDivInfos.push(Array('ad_creative_1','nothing'));
	unwin.adDivInfos.push(Array('chrome-promo','nothing'));//saves cpu :D
	unwin.adDivInfos.push(Array('watch-channel-brand-div','nothing'));//unblocsk content
	//html5player
	scriptStyles.push("#video-player,.video-stream,.video-content,.video-controls,.video-blocker,.video-fallback{width:100%;}");
	scriptStyles.push("#video-player,.video-stream{height:100%;}");
	scriptStyles.push(".video-controls{position:relative;}");
	//endhtml5player
	if(_vt('watch-player-rental-still-frame'))
	unwin.ids_header2='watch-player-rental-still-frame';//fix rental ability??? i  dont know, never tested it!
	scriptStyles.push("#watch-player-rental-still-frame{display:block;}");
	addStylesArray(scriptStyles)
}
//ESCAPIST*****************************************
}else if(wUrl.indexOf('escapistmagazine.')>0){
vsiteInitFun=function(){
	unwin.siteID=2;
	unwin.ids_video_holder='video_player';
	unwin.ids_left_column='content';
	unwin.ids_right_column='right_column';
	unwin.ids_title='video_detail_header';
	unwin.ids_header='site_header';
	unwin.ids_header2='site_menu';
	unwin.ids_footer='legal';
	unwin.ids_footer2='site_footer';
	unwin.watchStrings='/view';
	scriptStyles.push("#legal{margin-top:80px;}");
	scriptStyles.push("#site_header {width:1000px;margin:auto;}");
	scriptStyles.push("#site_menu {width:1000px;margin:auto;padding-left:0px;}");
	scriptStyles.push("body {background-image:none;}");
	scriptStyles.push("#video_detail_header{background-color:white;}");
	scriptStyles.push(".headline{width:auto;text-align:center;}");
	scriptStyles.push(".tags{width:auto;text-align:center;}");
	scriptStyles.push("#site_footer{width:1000px;margin:auto;}");
	scriptStyles.push("#ad_rectangle{height:auto;}");
	scriptStyles.push("#right_column{width:345;padding-left:15px;}");
	scriptStyles.push(".filmstrip_video{margin-left:25px;}");
	unwin.adDivInfos.push(Array('topads','box'));
	unwin.adDivInfos.push(Array('ad_rectangle','box'));
	addStylesArray(scriptStyles)
}//HULU*****************************************
}else if(wUrl.indexOf('hulu.')>0){
vsiteInitFun=function(){
	unwin.siteID=3;
	unwin.simpleViewMode=true;
	unwin.ids_all=new Array();
	unwin.ids_all.push('breakout-container');
	unwin.watchStrings='watch';
	//scriptStyles.push("#breakout-container{position:fixed}");
	scriptStyles.push("body{overflow:hidden}");
//	unwin.getElementByClassNameAndAssignID(document.body,'fluid bar','id_fluid_bar');
//	unwin.getElementByClassNameAndAssignID(document.body,'fluid','id_rightcol');
//	unwin.getElementByClassNameAndAssignID(document.body,'fluid footer','dm_footer',0);
//	unwin.getElementByClassNameAndAssignID(document.body,'fluid footer','dm_footer2',1);
//	//http://www.hulu.com/watch/63877/family-guy-fox-y-lady
//	unwin.ids_video_holder='player-container';
//	unwin.ids_left_column='show-and-watch-container';
//	unwin.ids_right_column='description-container';
//	unwin.ids_right_column2='id_rightcol';
//	unwin.ids_title='description-container';
//	unwin.ids_header='container';
//	unwin.ids_header2='id_fluid_bar';
//	unwin.ids_footer='dm_footer';
//	unwin.ids_footer2='dm_footer2';
//	if(wUrl.indexOf('/hd')>0){
//		unwin.watchStrings='/hd';
//		unwin.ids_left_column='all-container';
//	}else unwin.watchStrings='/watch';
//	scriptStyles.push("#all-container{min-height:500px;}");
//	scriptStyles.push(".container {margin:0px;}");
//	scriptStyles.push(".c0 {width:25px;}");
//	scriptStyles.push(".c1 a{width:105px;display:block;}");
//	scriptStyles.push(".description{width:"+unwin.colWidth+"px;}");
//	
//	window.vidzb_expnadhuluheader=function(evt){sstr="#id_fluid_bar {height:120px; !important;}";GM_addStyle(sstr);window.setTimeout(vidzb_colapshuluheader,6000)}
//	window.vidzb_colapshuluheader=function(evt){sstr="#id_fluid_bar {height:30px; !important;}";GM_addStyle(sstr);}
//	cevents.register(_vt('id_fluid_bar'),'mouseover',vidzb_expnadhuluheader);
//	cevents.register(_vt('container'),'mouseover',vidzb_colapshuluheader);
//	sstr=".absolutized {position:inline-table !important;}";
//	GM_addStyle(sstr);
//	
//	var ht=new String(document.body.parentNode.firstChild.innerHTML)
//	//ht=ht.qreplace("\n",'');
//	var re=new RegExp(/video_cid="[A-z0-9]+/);
//  var m=re.exec(ht);
// 	if (m == null) {
//    //alert("No match");
//  } else {
//    var s='';//"Match at position " + m.index + ":\n";
//    for (i=0; i < m.length; i++) {
//      s=s + m[i] + "\n";
//    }
//    videoCID=s.qreplace('video_cid="','');
//  }
	//var standaloneurl='http://www.hulu.com/stand_alone/'+videoCID;
	//the pop out playe ris much cooler wish we could use that sinc eit scales all the time
	//../stand_alone/playerembed.swf?
	//_vt(unwin.ids_video_holder).firstChild.src='/playerembed.swf';
	//var fSEmbed='<embed id="player" height="100%" width="100%" flashvars="eid=8Li6Q36j74REF4_-kcS8DQ&lcname=SitePlayer_lcname_mc_49150_56&st=28&stage_width=512&stage_height=296" allowfullscreen="true" allowscriptaccess="sameDomain" quality="high" name="player" style="z-index: 10;" src="/playerembed.swf?referrer=http%3A//www.hulu.com/stand_alone/'+videoCID+'%3Flcname%3DSitePlayer_lcname_mc_49150_56" type="application/x-shockwave-flash"/>';
	//var fSEmbed='<object width="512" height="296"><param name="movie" value="http://www.hulu.com/embed/'+videoCID+'"></param><param name="allowFullScreen" value="true"></param><embed src="http://www.hulu.com/embed/'+videoCID+'" type="application/x-shockwave-flash" allowFullScreen="true"  width="512" height="296"></embed></object>';
	//_vt(unwin.ids_video_holder).innerHTML=fSEmbed;
	
	//'<embed height="368" width="790" flashvars="stage_width=790&amp;stage_height=368&amp;bitrate=700000&amp;user_id=-1&amp;=1&amp;=754&amp;=231&amp;content_id=m1pqcs9s&amp;cb=1238564015562" bgcolor="#000000" allowfullscreen="true" allowscriptaccess="sameDomain" quality="high" name="player" id="player" style="z-index: 10; height: 366px; width: 751px; margin-left: 0px; margin-top: 0px;" src="/player.swf" type="application/x-shockwave-flash"/>';
	addStylesArray(scriptStyles)
}//VIMEO*****************************************
}else if(wUrl.indexOf('vimeo.')>0){
vsiteInitFun=function(){
	unwin.siteID=4;
	unwin.simpleViewMode=true;
	unwin.ids_all=new Array();
	unwin.ids_all.push('vb_video_container');
	unwin.watchStrings='/';
	scriptStyles.push("#o_placer_vb_video_container{background-color:white;}");
	addStylesArray(scriptStyles)
}//DAILYMOTION*****************************************
}else if(wUrl.indexOf('dailymotion.')>0){
vsiteInitFun=function(){
	unwin.getElementByClassNameAndAssignID(_vt('content'),'header_center','id_box_header');
	//unwin.getElementByClassNameAndAssignID(_vt('content'),'box_content','id_box_content');
	unwin.getElementByClassNameAndAssignID(_vt('content'),'dmco_box column span-8 left_content','id_leftcol');
	//unwin.getElementByClassNameAndAssignID(_vt('content'),'dm_widget_box sub_box proposed_by_box','id_rightcol');
	unwin.getElementByClassNameAndAssignID(_vt('content'),'dm_widget_videoplayer','videodiv_holder');
	//unwin.getElementByClassNameAndAssignID(_vt('id_box_content'),'box_header','id_box_header_2');
	//if(_vt('videodiv_holder')) $g('videodiv_holder').firstChild.id='just_videodiv_holder';
	unwin.ids_video_holder='videodiv_holder';
	unwin.ids_left_column='id_leftcol';
	unwin.ids_right_column='right_content_box';
	unwin.ids_title='id_box_header';
	unwin.ids_header='header';
	//unwin.ids_header2='id_box_header_2';
	unwin.ids_footer='footer';
	unwin.watchStrings='/video';
	scriptStyles.push("body{background-image:none;");
	scriptStyles.push("div#right_content_box{margin-top:0px;}");
	//scriptStyles.push(".dm_widget_videotools {position:relative;left:0px;width:362px;}");
	//scriptStyles.push(".dm_widget_header {height:70px;}");
	//scriptStyles.push(".box_header {float:none;height:auto;}");
	//scriptStyles.push(".box_header_right {height:auto;text-align:center;}");
	//scriptStyles.push(".nav {color:grey;}");
	//scriptStyles.push(".right_title {position:relative;width:auto;}");
	//scriptStyles.push(".subtitle_link {display:none;}");
	//scriptStyles.push("#top_banner{display:none;}");
	//scriptStyles.push("#dm_header{height:auto;}");
	unwin.adDivInfos.push(Array('player_middle_ad','box'));
	addStylesArray(scriptStyles)
}//METACAFE*****************************************
}else if(wUrl.indexOf('metacafe.')>0){
vsiteInitFun=function(){
	unwin.ids_video_holder='adaptvDiv';
	unwin.ids_left_column='AfterPlayer';
	unwin.ids_right_column='SideCol';
	unwin.ids_title='ItemContainer';
	unwin.ids_texttitle='ItemTitle';
	unwin.ids_header='Header';
	unwin.ids_header2='Top';
	unwin.ids_footer='Footer';
	unwin.watchStrings='watch';
	scriptStyles.push("body{background-image:none;}");
	scriptStyles.push("#Rate{height:55px;}");
	scriptStyles.push("#ItemInfo{clear:both;}");
	scriptStyles.push("#ItemContainer{background-color:transparent;background-image:none;}");
	//scriptStyles.push("#Content{display:none;}");
	scriptStyles.push("#FlashWrap{height:auto;}");
	scriptStyles.push("#FlashObj{background-color:transparent;}");
	scriptStyles.push("#Tags dd{width:auto;margin-right:185px;}");
	scriptStyles.push("#Rate{position:absolute;left:0px;top:-57px;background-color:#030303;}");
	scriptStyles.push("#SocialTools{height:auto;text-align:center;}");
	scriptStyles.push("#SocialTools ul{height:25px;text-align:center;}");
	scriptStyles.push("#SocialTools li{float:none;display:inline-table;}");
	if(_vt('Rate')){ $g('Rate').innerHTML='';
		scriptStyles.push("#Rate{background-color:transparent;}");
	}
	unwin.adDivInfos.push(Array('MedRect','box'));
	unwin.adDivInfos.push(Array('MedRect2','nothing'));
	addStylesArray(scriptStyles)
}//LIVELEAK*****************************************
}else if(false || wUrl.indexOf('liveleak.')>0){
vsiteInitFun=function(){
	//unwin.videoitselfchildNodenumber=2;
	if(_vt('vid')){
		var vidHolderId=$g('vid').childNodes[2].id;
	}
	unwin.ids_video_holder=vidHolderId;//'vid' //kills download link :/
	unwin.ids_left_column='c_l';
	unwin.ids_right_column='c_r';
	unwin.ids_title='s_hd';
	unwin.ids_header='hd';
	unwin.ids_header2='nav';
	unwin.ids_footer='ft_s';
	unwin.ids_footer2='ft';
	unwin.watchStrings='view';
	addStylesArray(scriptStyles)
}//FILECABI*****************************************
//http://filecabi.net/
//video.msn.com soapbox?
//PUTFILE*****************************************
}else if(wUrl.indexOf('putfile.')>0){
vsiteInitFun=function(){
	unwin.ids_video_holder='vid';
	unwin.ids_left_column='c_l';
	unwin.ids_right_column='c_r';//these are classes no ids what a pain
	unwin.ids_title='s_hd';
	unwin.ids_header='dm_header';
	unwin.ids_footer='dm_footer';
	unwin.watchStrings='media.';
	addStylesArray(scriptStyles)
}//BLIP.TV*****************************************
}else if(wUrl.indexOf('blip.')>0){
vsiteInitFun=function(){
	unwin.videoitselfchildNodenumber=3;
	unwin.ids_video_holder='video_player';
	unwin.ids_left_column='MetaPanel';
	unwin.ids_right_column='ContentPanel';
	unwin.ids_title='EpisodeTitle';
	unwin.ids_header='Header';
	unwin.ids_footer='Footer';
	unwin.watchStrings='blip.tv/file';
	scriptStyles.push("#Navigation{float:none;}");
	scriptStyles.push("#EpisodeTitle{float:none;text-align:center;max-width:auto;}");	
	addStylesArray(scriptStyles)
}//VIDEO.AOL*****************************************
}else if(wUrl.indexOf('video.aol.')>0){
vsiteInitFun=function(){
	unwin.getElementByClassNameAndAssignID(document.body,'pnp_lf1','id_pnp_lf1');
	unwin.getElementByClassNameAndAssignID(document.body,'pnp_rt','id_pnp_rt');
	unwin.getElementByClassNameAndAssignID(document.body,'adcont','adcont');
	unwin.ids_video_holder='videoPlayerComponent';
	unwin.ids_left_column='id_pnp_lf1';
	unwin.ids_right_column='id_pnp_rt';
	unwin.ids_title='bcau';
	unwin.ids_header='icehd';
	unwin.ids_footer='iceft';
	unwin.watchStrings='/video';
	unwin.adDivInfos.push(Array('adcont','box'));
	unwin.adDivInfos.push(Array('topads','skyscraper'));
	addStylesArray(scriptStyles)
}//BREAK.COM*****************************************
}else if(wUrl.indexOf('break.')>0){
vsiteInitFun=function(){
	if(_vt('video_wrap')){
		 $g('video_wrap').parentNode.id='id_left_column';
		 $g('video_wrap').parentNode.firstChild.id='id_vidtitle';
	}
	if(_vt('video_desc')) $g('video_desc').parentNode.id='id_right_column';
	unwin.ids_video_holder='defaultDiv';
	unwin.ids_left_column='id_left_column';//'video_wrap:::PARENTNODE';//attempt at dom travel notation
	unwin.ids_right_column='id_right_column';//'video_desc:::PARENTNODE';
	unwin.ids_title='id_vidtitle';			//'video_wrap:::PARENTNODE:::FIRSTCHILD';//what a table mess forget it
	unwin.ids_header='bman_head_top';
	unwin.ids_header2='hdr';
	unwin.ids_header3='subnav';
	unwin.ids_footer='footer';
	unwin.watchStrings='index';//this is not it
	scriptStyles.push("body{overflow:auto;}");
	scriptStyles.push("#playerwrap{height:auto;}");	
	addStylesArray(scriptStyles)
}//THEONION*****************************************
}else if(wUrl.indexOf('theonion.')>0){
vsiteInitFun=function(){
	unwin.videoitselfchildNodenumber=2;
	unwin.ids_video_holder='video_holder';
	unwin.ids_left_column='sidebar';
	unwin.ids_right_column='video_tabs';
	unwin.ids_title='onn_nav';
	unwin.ids_header='empire';
	unwin.ids_header2='header';
	unwin.ids_footer='footer';
	unwin.watchStrings='/video/';
	scriptStyles.push("#empire{position:relative;}");
	scriptStyles.push("#header{position:relative;}");
	scriptStyles.push("#sidebar{position:relative;}");
	addStylesArray(scriptStyles)
}}else{
	//
	unwin.vbisreadytogo=false;
	sitecheckurl='http://www.vidzbigger.com/getsite.php?siteid='+window.location.host;
	//alert(sitecheckurl);
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: sitecheckurl,
	  onload: function(responseDetails) 
	 {
			var rslt=new String(responseDetails.responseText);
			var aversiondata=rslt.qslice('<!--VZB_B-->','<!--VZB_E-->');
			aversiondata=aversiondata.qreplace('&gt;','>');
			//alert(aversiondata);
			var dDataBits=decodeIncomingData(aversiondata);
			var dsttr='';
			for( i in dDataBits ){
				if( i == 'Save' ) break;
				if(dDataBits[i].indexOf('.')===0){
					dDataBits[i]=dDataBits[i].replace('.','');
						unwin.getElementByClassNameAndAssignID(document.body,dDataBits[i],'id_'+dDataBits[i]);
						dDataBits[i]='id_'+dDataBits[i];				}
				unwin[i]=dDataBits[i];
				dsttr+=('['+ i + ']='+dDataBits[i]);
			}
			if( unwin['css'] ){
				GM_addStyle(unwin['css']);
			}
			unwin.vbisreadytogo=true;
			if(typeof readyToVidsBig == 'function' )readyToVidsBig();
	  }
	});
}
//BEGIN FUNCTIONS &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
var video_bottom_button_bar_height=25;// for play button,volume,mute and stuff,cause otherwise if we don't account for it when scaling we get :ugly black bars
//var ratio=(385-video_bottom_button_bar_height)/640;//480;
var dratio=(385-video_bottom_button_bar_height)/480; //default ratio
var fmt22ratio=(385-video_bottom_button_bar_height)/640;//480;
var ratio=dratio;

var lOpVideoWidths=[320,480,640,800,1024,1280,1600,2048,4096,8192,16384];
var lOpMinVideoWidths=[128,256,320,340,360,380,480,550,640,800,1024];
var lOpCommentCounts=[10,15,20,30,50,75,100,128,256,320,480,500];
var lOpColWidth=[150,200,250,300,320,340,360,380,400,420,440,480,550,640,800];
var lOpPosQualities=[37,22,35,34,18];//quality priorities
var lOpDisplayQualities={37:{v:37,q:'HD+ 1080p',d:'MPEG-4 H.264 HD 1080p'},22:{v:22,q:'HD+ 720p',d:'MPEG-4 H.264 HD 720p'},35:{v:35,q:'HD',d:'FLV H.264 35 HQ'},34:{v:34,q:'HD-',d:'FLV H.264 34 HQ'},18:{v:18,q:'HQ',d:'MPEG-4 H.264 18 HQ'}};
var locales={0:{c:'US',n:'United States'},1:{c:'CA',n:'Canada'},2:{c:'DE',n:'Germany'},3:{c:'FR',n:'France'},4:{c:'JP',n:'Japan'},5:{c:'UK',n:'United Kingdom'}}

unwin.lastTimer=0;
unwin.columnMode=0;
unwin.occuranceTestMonitor=0;
unwin.playerState=1;
unwin.prefsShowing=false;
unwin.defaultFlagMs='&nbsp;';// VidzBig';
unwin.defaultOverFlagMs=' &nbsp;Settings';
unwin.hasBeenAwayFromPageTopBtm=false;
unwin.needsFurtherUpdate=true;// this is a good one,if we can determine that no further changes/updates need to be made we can save a LOT of cpu,video plays back much smoother 
unwin.isLoadedOnce=false;
unwin.lastHeight=0;
unwin.lastWidth=0;
unwin.needToSavePreferences=false;
unwin.isInWatchMode=false;// are theres videos on the screens
unwin.myvideoalignThisUpdate="CENTER";
unwin.extraflashvars='';
unwin.vbmaxdisplayquality=0;//levels down from max display quality
unwin.vidzbigSITEenabled=true;//unless otherwise found
unwin.fullscreenmode=false;
var vidzbigSITESdisabled='';

//global 1bit prefs 
unwin.vidzb_tf_prefs=[];
unwin.vidzb_tf_prefs['allowPlayerReload']=true;
unwin.vidzb_tf_prefs['columnViewMode']=true;
unwin.vidzb_tf_prefs['invertColorScheme']=false;
unwin.vidzb_tf_prefs['invertPrefColorScheme']=false;
unwin.vidzb_tf_prefs['autoScrollPastHeader']=true;
unwin.vidzb_tf_prefs['shareVideoViewStatistics']=true;//true;false//privacy//for now maybe
unwin.vidzb_tf_prefs['columnPriorityComments']=false;
unwin.vidzb_tf_prefs['enablePlayNext']=true;
unwin.vidzb_tf_prefs['columnScrollIndependent']=false;
unwin.vidzb_tf_prefs['prefer_png24bits']=true;
unwin.vidzb_tf_prefs['enable_jsapi']=true;//jsapi enable
unwin.vidzb_tf_prefs['enabledownload']=detectn?false:true;
unwin.vidzb_tf_prefs['biggerComments']=false;
unwin.vidzb_tf_prefs['allowPlayerClk']=false;
unwin.vidzb_tf_prefs['useHighQuality']=false;//(depricated) this one updates all links on pages to either fmt 22 or fmt 18 depending on availability... 
unwin.vidzb_tf_prefs['LoadHighQuality']=true;//when the video loads each version available is detected.  if this is true then fmt 22 is enabled when detected
unwin.vidzb_tf_prefs['animateVidThumbnails']=true;
unwin.vidzb_tf_prefs['alwaysAnimateVidThumbnails']=false;
unwin.vidzb_tf_prefs['alwaysAnimateVidThumbnails1LOOP']=false;
unwin.vidzb_tf_prefs['alwaysShowModControlsUnderVideo']=true;
unwin.vidzb_tf_prefs['preventVtBlackBars']=true;// prevent Vt black bars (above and below)
unwin.vidzb_tf_prefs['preventHzBlackBars']=false;		// left and right
unwin.vidzb_tf_prefs['chkAspectRatioXml']=true;		// download xml to verify aspect ratio
unwin.vidzb_tf_prefs['defaultWideAspect']=false;		// default Aspect
unwin.vidzb_tf_prefs['enableTopVidzBrowser']=true;
unwin.vidzb_tf_prefs['enableChannelBrowser']=false;
unwin.vidzb_tf_prefs['useNonFlashPlayer']=false;
unwin.vidzb_tf_prefs['dissableAnnotations']=false;
unwin.vidzb_tf_prefs['indicateHDQuality']=true;//free practically once far enough to do this... lol
unwin.vidzb_tf_prefs['donotautoplayVideos']=false;
unwin.vidzb_tf_prefs['donotautobuffer']=false;
//unwin.vidzb_tf_prefs['positionPersistently']=false;//DISSABED FEATURE remove/add
unwin.vidzb_tf_prefs['positionVideoAutomatically']=true;//owns the b lo
unwin.vidzb_tf_prefs['centerVideoVertically']=true;//no effect?
unwin.vidzb_tf_prefs['scaleVideoAtPageBottom']=true;
unwin.vidzb_tf_prefs['usefixedpositionproof']=false;//identically named prefs like this need to either be eliminated or the order follow this for precompliation to work
unwin.vidzb_tf_prefs['usefixedposition']=detectn?false:true;
if(!detectn)unwin.vidzb_tf_prefs['allowUnsafeWindow']=true;
else unwin.allowUnsafeWindow=true;
unwin.vidzb_tf_prefs['enableAutoReload']=false;
//unwin.vidzb_tf_prefs['loadAllVideoResponseIcons']=false;//planned feature... easy enough... ask
unwin.vidzb_tf_prefs['flipVideo']=false;
unwin.vidzb_tf_prefs['autoLoopOnComplete']=false;
unwin.vidzb_tf_prefs['autoLoopDelay']=false;
unwin.vidzb_tf_prefs['reBrandYouTube']=false;//not re-implemented... yet...
unwin.vidzb_tf_prefs['vidzb_blockAds']=true; //site ads (as defined/submited)
unwin.vidzb_tf_prefs['vidzb_blockPlayerAds']=false; //flash player ads
unwin.vidzb_tf_prefs['vidzb_allowMyObnoxiousAds']=true; //allow vidzbigger ads to replace all youtube ones :)
unwin.vidzb_tf_prefs['autoExpandVideoDescriptions']=false;
unwin.vidzb_tf_prefs['autoConfirmAdultVideos']=false;
unwin.vidzb_tf_prefs['snapfullscreenmode']=true; //UNSPECIFIED (new value), resolves to true by default based on auto configuration
unwin.vidzb_tf_prefs['aspheadersnapfull']=false;
unwin.vidzb_tf_prefs['prefFlagPositionFixed']=false;
unwin.vidzb_tf_prefs['delayVidzBiggerInit']=false;//delays load (1sec) so other plugins (youtrace) can finish loading first
unwin.vidzb_tf_prefs['precompMainFun']=true;//enable 'pre-compilation' of specified function, basically evaluates TF prefs once and defines a new function
for( z in lOpDisplayQualities ){
	if(lOpDisplayQualities[z].v != 22 && lOpDisplayQualities[z].v != 37) unwin.vidzb_tf_prefs['l0pQualz'+lOpDisplayQualities[z].v]=true;
	else unwin.vidzb_tf_prefs['l0pQualz'+lOpDisplayQualities[z].v]=false;//each quality boolen toggle
}
// so if its d3fault unwin delete value??
unwin.vidzb_last_url='';
unwin.fssnapHeight=0;

//preferences
unwin.setDefaultPreferences=function(){
	unwin.vidzbigenabled=true;
	unwin.myvideoalign="CENTER";//"LEFT"CENTER"RIGHT";
	unwin.mypreferednumcolumns=2;
	unwin.maximumVideoWidth=1280;// this can kill flash completely on any computer probably (if screens had enough resolution). Technically full screen mode performs better because it scales everything (rendering only 480x385 pixels) where as this renders a ton more pixels of flash video
	unwin.minimumVideoWidth=800;// this can ... 640
	unwin.maximumCommentCount=15;
	unwin.extraflashvars='&color1=0x000000&color2=0xDDDDDD';
	unwin.vbmaxdisplayquality=0;//levels down from max display quality
	vidzbigSITESdisabled='';
	//unwin.colWidth=360;
	unwin.jsapiRetries=5;
	for( i in unwin.vidzb_tf_prefs ){
		unwin[i]=unwin.vidzb_tf_prefs[i];
	}
}                         	
unwin.setDefaultPreferences();
unwin.vidzbadd1_html='<a target="_blank" href="http://www.vidzbigger.com/advertise.php">Your Ad Here</a> VidzBigger.org';

//CONSTRAINS VALUES TO THE LIST PASSSED-----------------------------------------------------------------------------
window.constrainValues=function(varib,valArr){
	for(i in valArr){
		if(valArr[i]==varib){
			return valArr[i];//found,return the value (from the array)
		}
	}
	return valArr[0];			//not found! return the first value (should be default,not first...)
}
window.cstrainIntToRange=function(varib,min,max){
	if(varib>=min && varib<=max)return varib;else return max;
}
unwin.arrayToString=function(parr){
	var ostr='';
	for(i in parr){
		ostr+=i+'=>'+parr[i]+':::';
	}
	return ostr;
}

window.savePreferences=function(){
	var atf=[true,false];
	//require values to be "safe" acceptable values (since we store this in preferences
	unwin.vidzbigenabled=constrainValues(unwin.vidzbigenabled,atf);
	unwin.myvideoalign=constrainValues(unwin.myvideoalign,Array("LEFT","CENTER","RIGHT"));
	unwin.mypreferednumcolumns=constrainValues(unwin.mypreferednumcolumns,Array(2,3));
	unwin.maximumVideoWidth=constrainValues(unwin.maximumVideoWidth,lOpVideoWidths);
	unwin.minimumVideoWidth=constrainValues(unwin.minimumVideoWidth,lOpMinVideoWidths);
	unwin.maximumCommentCount=constrainValues(unwin.maximumCommentCount,lOpCommentCounts);
	unwin.colWidth=constrainValues(unwin.colWidth,lOpColWidth);
	unwin.jsapiRetries=cstrainIntToRange(unwin.jsapiRetries,0,12);
	unwin.vbmaxdisplayquality=cstrainIntToRange(unwin.vbmaxdisplayquality,0,9);

	for( i in unwin.vidzb_tf_prefs ){
		unwin[i]=constrainValues(unwin[i],atf);
	}
	//all input we are saving should now be clean!		
	GM_setValue('vidzbigenabled',unwin.vidzbigenabled);
	GM_setValue('vidzbigSITESdisabled',vidzbigSITESdisabled);
	GM_setValue('myvideoalign',unwin.myvideoalign);
	GM_setValue('mypreferednumcolumns',unwin.mypreferednumcolumns);
	GM_setValue('maximumVideoWidth',unwin.maximumVideoWidth);
	GM_setValue('minimumVideoWidth',unwin.minimumVideoWidth);
	GM_setValue('colWidth',unwin.colWidth);
	GM_setValue('maximumCommentCount',unwin.maximumCommentCount);
	GM_setValue('jsapiRetries',unwin.jsapiRetries);
	GM_setValue('extraflashvars',unwin.extraflashvars);
	GM_setValue('vbmaxdisplayquality',unwin.vbmaxdisplayquality);
	for( i in unwin.vidzb_tf_prefs ){
		GM_setValue(i,unwin[i]);
	}
	GM_setValue('lastKnownVersionUsed',''+vidz_Version);	
	unwin.needToSavePreferences=false;//since we just savd
	unwin.SETvidz_message('<span style="color:#44FF44;">&nbsp;Preferences Saved</span>');
	isGlobalSave=false;
	
	applyPrecompi()//whooot
} 

var loadPreferences=function(){//add constrained values...
	unwin.vidzbigenabled=GM_getValue('vidzbigenabled',unwin.vidzbigenabled);
	vidzbigSITESdisabled=GM_getValue('vidzbigSITESdisabled',vidzbigSITESdisabled);
	unwin.myvideoalign=GM_getValue('myvideoalign',unwin.myvideoalign);
	unwin.mypreferednumcolumns=GM_getValue('mypreferednumcolumns',unwin.mypreferednumcolumns);
	unwin.maximumVideoWidth=GM_getValue('maximumVideoWidth',unwin.maximumVideoWidth);
	unwin.minimumVideoWidth=GM_getValue('minimumVideoWidth',unwin.minimumVideoWidth);
	unwin.maximumCommentCount=GM_getValue('maximumCommentCount',unwin.maximumCommentCount);
	unwin.jsapiRetries=GM_getValue('jsapiRetries',unwin.jsapiRetries);
	unwin.extraflashvars=GM_getValue('extraflashvars',unwin.extraflashvars);
	unwin.vbmaxdisplayquality=GM_getValue('vbmaxdisplayquality',unwin.vbmaxdisplayquality);
	for( i in unwin.vidzb_tf_prefs ){
		unwin[i]=GM_getValue(i,unwin[i]);
	}
	if(unwin.snapfullscreenmode==3)unwin.snapfullscreenmode=unwin.autoScrollPastHeader?true:false;//'Cool trick' I can use to define a new default value for you based on your existing preferencez...
	unwin.lastKnownVersionUsed=GM_getValue('lastKnownVersionUsed',''+vidz_Version);
  unwin.fullscreenmode=false;//GM_getValue('fullscreenmode',unwin.fullscreenmode)||unwin.snapfullscreenmode;
  if(vidzbigSITESdisabled.length>0){//if this sites is in the disabled sites string, disable this site
  	if( vidzbigSITESdisabled.indexOf(window.location.host) > 0 )unwin.vidzbigSITEenabled=false;
  }
  isGlobalSave=false;
}
loadPreferences();

unwin.preferencesToString=function(){
	var parr=[];
	parr['vidzbigenabled']=unwin.vidzbigenabled;
	parr['vidzbigSITESdisabled']=vidzbigSITESdisabled;
	parr['myvideoalign']=unwin.myvideoalign;
	parr['mypreferednumcolumns']=unwin.mypreferednumcolumns;
	parr['maximumVideoWidth']=unwin.maximumVideoWidth;
	parr['minimumVideoWidth']=unwin.minimumVideoWidth;
	parr['vidzbcolWidth']=unwin.colWidth;
	parr['maximumCommentCount']=unwin.maximumCommentCount;
	parr['jsapiRetries']=unwin.jsapiRetries;
	parr['extraflashvars']=unwin.extraflashvars;
	parr['vbmaxdisplayquality']=unwin.vbmaxdisplayquality;
	for( i in unwin.vidzb_tf_prefs ){
		parr[i]=unwin[i];
	}
	parr['lastKnownVersionUsed']=''+vidz_Version;
	parr['fullscreenmode']=unwin.fullscreenmode;
	return unwin.arrayToString(parr);
}
if( unwin.defaultWideAspect )ratio=fmt22ratio;
if( unwin.chkAspectRatioXml ){
	function fixVideoAspectRatio(){
		////http://gdata.youtube.com/feeds/api/videos/q3pMMwtrwiw?v=2  //known: <yt:aspectRatio>widescreen</yt:aspectRatio>
		var vi=window.location.href.qslice('?v=','&');
		if(vi.length > 7 && vi.length < 12){//rough validation
			var vmeta='http://gdata.youtube.com/feeds/api/videos/'+vi+'?v=2';
			//console.log(vmeta);
			GM_xmlhttpRequest({
			  method: 'GET',
			  url: vmeta,
			  onload: function(responseDetails) 
				{
				 	if(responseDetails.responseText){
				 		var rslt=new String(responseDetails.responseText);
				 		if(rslt.indexOf('<yt:aspectRatio>widescreen')>1){
				 			ratio=fmt22ratio;
				 		}else{
				 			ratio=dratio;
				 		}
				 		unwin.forcevidzb_apply_selected_fixes();
				 	}
				}
			});
		}
	}
	fixVideoAspectRatio();
}
// FORCE THE NEXT FUNCTION TO OCCUR COMPLETELY BY CLEARING SAVED STATE
unwin.forcevidzb_apply_selected_fixes=function(){
	if(!unwin.isInWatchMode) return false;
	unwin.needsFurtherUpdate=true;//force update
	unwin.hasBeenAwayFromPageTopBtm=false;
	unwin.lastHeight=0;
	unwin.lastWidth=0;
	unwin.vidzb_initialSetupAndResize();
	if (!unwin.chkAspectRatioXml){
		if (unwin.defaultWideAspect){ratio=fmt22ratio;
		}else if(!unwin.defaultWideAspect){ratio=dratio;}
	}
	if(_vt('vidzbigger_prefs_menu'))$g('vidzbigger_prefs_menu').style.position=unwin.prefFlagPositionFixed?'fixed':'absolute';
	if(_vt(unwin.ids_vb_midl)){
		if ((unwin.usefixedposition)){
			$g(unwin.ids_vb_midl).style.position='fixed';
			if(detectn&&unwin.usefixedpositionproof)$g(unwin.ids_vb_midl).getElementsByTagName('embed')[0].style.border="3px solid red";
		}else{
			$g(unwin.ids_vb_midl).style.position='absolute';
		}
	}
	unwin.vidzb_apply_selected_fixes();
	unwin.p_refreshPrefs();
	//unwin.occuranceTestMonitor++;//expected: 1
}
unwin.headerHeight=0;
var foldAttempts=0;
var vbfoldRadius=11;//how thick the area that catches the video and forces it fullscreen is defined here... fold stickyness quotient... defines how easy to scroll past unscaled
// LOCKS THE VIDEO IN PLACE AND PERFORMS OTHER CLEANUP AND SIZE ORIENTATION FUNCTIONS (main function)
unwin.vidzb_apply_selected_fixes=function(){
	if(!unwin.isInWatchMode) return false;
	var startTime=new Date().getTime();
	//unwin.occuranceTestMonitor++;//expected: 1
	unwin.p_updatePrefwinHeight();//if pref win is showing make sure its Height fits on screen! (critical for 800x600)
	if(!unwin.needsFurtherUpdate) return true;
	unwin.myvideoalignThisUpdate=unwin.myvideoalign;
	unwin.headerHeight=unwin.getElementYpos($g(unwin.ids_vb_cont));//unwin.getElementHeight($g(unwin.ids_vb_head))+unwin.getElementHeight($g(unwin.ids_vb_titl))+10;
	var win_scr=unwin.getScroll();
	var scr=win_scr;
	var totalWindowHeight=unwin.getWindowHeight();
	var wHei=totalWindowHeight;
	var minm=unwin.headerHeight;//+15;//-0;//Approximate height of the header
	unwin.columnsavailable=3;
	var rightColTopPush=0;
	var colWidth=new Number(unwin.colWidth);//col width 360
	var extraVideoSpace=0;
	var isStupdMode=!unwin.usefixedposition;//detectn;
	var bodyHeight=unwin.getElementHeight(document.body);
	
	if (unwin.snapfullscreenmode){
		var th=bodyHeight-totalWindowHeight;
		if (!unwin.fullscreenmode && (!unwin.aspheadersnapfull || win_scr==th || win_scr > 500 ) ){
			unwin.fssnapHeight=th;
		}else if (unwin.aspheadersnapfull && (!unwin.fullscreenmode || unwin.fssnapHeight==th)){
			unwin.fssnapHeight=unwin.headerHeight-10;
			document.body.style.minHeight="0px";//erm..
		}
	}
		
	//if unwin.fssnapHeight is greater than zero too early... fail, or guarantee success??
	//alert(unwin.snapfullscreenmode && unwin.fullscreenmode && unwin.fssnapHeight>0 && win_scr!=unwin.fssnapHeight);
	if (unwin.snapfullscreenmode && unwin.fssnapHeight>0 || unwin.fullscreenmode ){
		window.clearTimeout(foldAttempts);foldAttempts=0;
		if(!unwin.fullscreenmode && win_scr!=unwin.fssnapHeight&&Math.abs(win_scr-unwin.fssnapHeight)< vbfoldRadius ){
			win_scr=unwin.fssnapHeight,window.scroll(0,win_scr);//i suppose important to check in case of either condition below to avoid extra flips, although it makes scrolling sticky
			return;//scroll should fire this fun again
			//every time it moves zero the counter
		}//else foldAttempts++;
		if( unwin.fullscreenmode && win_scr!=unwin.fssnapHeight ){
			//alert('leave?'+unwin.fullscreenmode +' '+ win_scr+' '+unwin.fssnapHeight);
			unwin.leaveFullscreen();return;
		}else if( !unwin.fullscreenmode && win_scr==unwin.fssnapHeight ){
			//if(foldAttempts>3)
			foldAttempts=window.setTimeout(function(){unwin.goFullscreen()},500);
			return;
			//else window.setTimeout(function(){if(!unwin.disableFixes)unwin.vidzb_apply_selected_fixes()},detectn?300:200);
			//if(foldAttempts!=1)return;
		}
	}
	
//	if( !unwin.fullscreenmode ){
//		document.body.style.height="auto";
//	}
	
	// THIS is independent col scrolling part 1
	if(unwin.needsFurtherUpdate){ 		
		if (unwin.columnScrollIndependent){
			var footerHeight=0;//unwin.getElementHeight($g(unwin.ids_vb_foot));
			var finHeight=totalWindowHeight-10;
			if (!unwin.autoScrollPastHeader){
				finHeight-=unwin.headerHeight+footerHeight;
				//if(unwin.myvideoalign !='RIGHT')
				extraVideoSpace=22;
			}else{
				extraVideoSpace=5;//not in 2 col
			}
			colWidth+=18;
			_vt(unwin.ids_vb_left).style.height=finHeight.toCSS();
			_vt(unwin.ids_vb_rigt).style.height=finHeight.toCSS();
			_vt(unwin.ids_vb_foot).style.height='0px';
			_vt(unwin.ids_vb_foot).style.overflow='hidden';

		}else{
			_vt(unwin.ids_vb_foot).style.height='auto';
			_vt(unwin.ids_vb_foot).style.overflow='auto';
			_vt(unwin.ids_vb_left).style.height='auto';
			_vt(unwin.ids_vb_rigt).style.height='auto';
		}
		_vt(unwin.ids_vb_left).style.width=new Number(colWidth).toCSS();
		_vt(unwin.ids_vb_rigt).style.width=new Number(colWidth).toCSS();
		//_vt(unwin.ids_vb_midl).style.marginLeft=colWidth.toCSS();
		//_vt(unwin.ids_vb_midl).style.marginRight=colWidth.toCSS();
	}
	var areaOffset=0;///-10;//10;
	//if(document.getElementById('watch-high-quality-link')){
	//	areaOffset=20;
	//}	//what a mess!  needs to be re-coded sometime
	{
	minm-=areaOffset;
	var wWid=unwin.getWindowWidth();
	var minw=colWidth;//col width
	var atTop=false;
	var atBtm=false;
	}
	if(scr>minm-5){
			if(isStupdMode)scr-=minm;
	    else scr=-minm+5;
	    //wHei-=30;
	    wHei=totalWindowHeight-areaOffset+-10;
	    if (!unwin.positionVideoAutomatically){
    		wHei-=minm-video_bottom_button_bar_height+15
    	}
	}else{
	    //wHei-=minm-(scr);
	    if(isStupdMode){
	    	wHei=totalWindowHeight-minm-areaOffset+scr-5;
	    	scr=0;
	    }else{
	    	 scr=areaOffset-scr+0;//r+Math.floor(20*(scr/minm));
		    //wHei-=15;//areaOffset;
		    wHei=totalWindowHeight-minm-areaOffset-scr-5;
		  }
	    if (!unwin.positionVideoAutomatically){
    		wHei+=scr
    	}
    	atTop=true;
    	unwin.hasBeenAwayFromPageTopBtm=false;
	}

	//account for footer (shrink video if we scroll that far down so we dont' cover it
	if (unwin.scaleVideoAtPageBottom){
		var scrolly=win_scr;//unwin.getScroll();
		var footerStart=unwin.getElementYpos(document.getElementById(unwin.ids_vb_foot));
		//if(scrolly+wHei>footerStart){
		if(scrolly+totalWindowHeight>footerStart){
			atBtm=true;
			wHei-=(scrolly+wHei)-footerStart+0;
		 if (!unwin.positionVideoAutomatically){
    		wHei-=120;
    	}
     if (!unwin.centerVideoVertically){
    		wHei-=30;
    	}
		}
	}
	
	// width and columns
	if(wWid> ((minw<<1)+(new Number(unwin.minimumVideoWidth)+35)) && unwin.mypreferednumcolumns==3){
		minw=-35+wWid-(colWidth<<1)+Math.floor(extraVideoSpace*1.25);
		unwin.vidzb_SpreadColumns(minw,wHei,totalWindowHeight,atBtm,scr);// go to 3 column mode
	}else if(wWid> minw+(new Number(unwin.minimumVideoWidth)+35)){
		minw=-30+wWid-(colWidth)+Math.floor(extraVideoSpace*0.3);
		unwin.columnsavailable=2;
		if(unwin.myvideoalignThisUpdate=="CENTER") unwin.myvideoalignThisUpdate="LEFT";
		
		//unwin.ids_vb_left or unwin.ids_vb_rigt
		if(unwin.myvideoalignThisUpdate=='LEFT'){
			unwin.vidzb_ConsolodateColumns(unwin.ids_vb_rigt);
		}else{
			unwin.vidzb_ConsolodateColumns(unwin.ids_vb_left);
		}
		
	}else{
		
		minw=unwin.getWindowWidth()-35-minw;//minw;
		unwin.columnsavailable=1;
		//alert('one column not supported');//OR IS IT???...	
		if(unwin.myvideoalignThisUpdate=="CENTER") unwin.myvideoalignThisUpdate="LEFT";
		
		//unwin.ids_vb_left or unwin.ids_vb_rigt
		if(unwin.myvideoalignThisUpdate=='LEFT'){
			unwin.vidzb_ConsolodateColumns(unwin.ids_vb_rigt);
		}else{
			unwin.vidzb_ConsolodateColumns(unwin.ids_vb_left);
		}
	}
	if(unwin.fullscreenmode ){
		minw=wWid-5+(unwin.snapfullscreenmode?-15:0);//-25;
		wHei=totalWindowHeight;//strange +5
		if(_vt(unwin.ids_vb_midl)){
			$g(unwin.ids_vb_midl).style.marginLeft='0px';
			$g(unwin.ids_vb_midl).style.marginTop=(isStupdMode?win_scr:'0')+'px';
		}
	}else if((isStupdMode||unwin.positionVideoAutomatically)&&_vt(unwin.ids_vb_midl)){
  	$g(unwin.ids_vb_midl).style.marginTop=""+(scr)+"px"
  }
	if(unwin.html5mode&&_vt('video-controls'))wHei-=unwin.getElementHeight($g('video-controls'));
	//var YoutubeEnhancer=$x1("//*[@lang='fr']");
	//var decrease=totalWindowHeight-wHei;
	//get height of other controls
	if( unwin.alwaysShowModControlsUnderVideo && unwin.siteID == 1 && !unwin.fullscreenmode ){
		
		if( _vt('eLoopy') ){
			_vt('eLoopy').style.position='relative';
			wHei -= 15;//loop-over-sections-of-youtube-videos 
		}
		var tohei=unwin.getElementHeight($g(unwin.ids_video_holder));
		var vhei=unwin.getElementHeight(unwin.searchVideoPlayer($g(unwin.ids_video_holder)));
		var modCtrlHeight=tohei-vhei;
		wHei -= modCtrlHeight;
	}
	//if(tohei>wHei)alert(wHei+' - '+tohei+'='+(wHei-tohei));;
	if((!unwin.hasBeenAwayFromPageTopBtm || atTop) || (atBtm && unwin.scaleVideoAtPageBottom)){
		unwin.setVideoSize(minw,wHei,totalWindowHeight,atBtm,scr);
		if(!atTop) unwin.hasBeenAwayFromPageTopBtm=true;
		if(atBtm && unwin.scaleVideoAtPageBottom) unwin.hasBeenAwayFromPageTopBtm=false;
	}
	
	//if( detectn&& foldAttempts==1 ){ window.setTimeout(function(){unwin.vidzb_apply_selected_fixes()},0);return;}//y<0=fail when set margin and height on pos fixd flash
	
	//only easy way to be sure,since comments can load much later
	var allComment=document.getElementsByName('comment');
	if(allComment.length>0){
		for(var c=0, l=allComment.length;c<l;c++){
			allComment[c].cols=36;
			allComment[c].style.width=(unwin.colWidth-10)+"px";
			//if(allComment[c].value=='')allComment[c].value='VidzBigger has comment';
			//if(allComment[c].value=='VidzBigger has comment')allComment[c].select();
		}
	}
	
	//SAVE ON THAT CPU BABY
	if(unwin.isLoadedOnce && !unwin.scaleVideoAtPageBottom && !unwin.positionVideoAutomatically){
		unwin.needsFurtherUpdate=false;

	}
	
	var d=new Date();
	var endTime=d.getTime();
	unwin.lastTimer=((endTime-startTime)/1000);
	if(_vt('lastTimer')){
		$g('lastTimer').innerText=unwin.lastTimer;//probably slows it down but good for dev
	}
	
	if (unwin.snapfullscreenmode){
		var sbHeight=(totalWindowHeight-38);//arrows accounted4, and height of scroll bar removed frm distane it can travel
		var r=totalWindowHeight/bodyHeight;
		var hob=Math.ceil(r*sbHeight);
		//console.log(unwin.fssnapHeight);uncomment this line to "fix"
		var scp = (unwin.fssnapHeight/(bodyHeight-totalWindowHeight));
		var isp = 1 - scp;
		var fff = (scp * bodyHeight) + (isp*19) - + (scp*(19+hob));
		if(_vt(unwin.ids_vb_indi)){
			$g(unwin.ids_vb_indi).style.top=fff+'px';
			$g(unwin.ids_vb_indi).style.height=hob+'px';
		}else{//remove creation functionality... but now supports turn on in real time...
			div_indi=document.createElement('div');
			div_indi.setAttribute('id',unwin.ids_vb_indi);
			div_indi.setAttribute('style','position:absolute;top:'+fff+'px;right:0px;width:2px;height:'+hob+'px;background-color:#000;');
			document.body.appendChild(div_indi);
			div_indi.addEventListener('click',function(e){vidzb_cancelFulscButton()},false);
		}
	}
	
	//if(detectn&&_vt(unwin.ids_vb_midl)&&$g(unwin.ids_vb_midl).offsetTop<0){window.setTimeout(function(){unwin.vidzb_apply_selected_fixes()},10)};
}

// remove,hijack,difference?? opinions? (none)
unwin.vidzb_removeAdvertisements=function(){
	//unwin.occuranceTestMonitor++;//expected: 1
	if(unwin.vidzb_blockAds && unwin.adDivInfos.length > 0 ){
	 //remove ads
		for(var a in unwin.adDivInfos){
			var divname=unwin.adDivInfos[a][0];
			var adtype=unwin.adDivInfos[a][1];
			if(_vt(divname)){
				$g(divname).innerHTML=unwin.vb_replacementAds[adtype];
			}
		}
	}
}
unwin.vidzb_oneTimeSetupAndResize=function(){
	unwin.colWidth=new Number(unwin.colWidth);
	n_vb_div_holder=document.createElement('div'),n_vb_div_holder.setAttribute('id',unwin.ids_vb_hold),n_vb_div_holder.setAttribute('style','');
	n_vb_div_title=document.createElement('div'),n_vb_div_title.setAttribute('id',unwin.ids_vb_titl),n_vb_div_title.setAttribute('style','');
	n_vb_div_header=document.createElement('div'),n_vb_div_header.setAttribute('id',unwin.ids_vb_head),n_vb_div_header.setAttribute('style','');
	n_vb_div_footer=document.createElement('div'),n_vb_div_footer.setAttribute('id',unwin.ids_vb_foot),n_vb_div_footer.setAttribute('style','clear:both;text-align:center;');	
	n_vb_div_content=document.createElement('div'),n_vb_div_content.setAttribute('id',unwin.ids_vb_cont),n_vb_div_content.setAttribute('style','');
	n_vb_div_left=document.createElement('div'),n_vb_div_left.setAttribute('id',unwin.ids_vb_left),n_vb_div_left.setAttribute('style','float:left;width:'+unwin.colWidth+'px;');
	n_vb_div_right=document.createElement('div'),n_vb_div_right.setAttribute('id',unwin.ids_vb_rigt),n_vb_div_right.setAttribute('style','float:right;width:'+unwin.colWidth+'px;');
	n_vb_div_midl=document.createElement('div'),n_vb_div_midl.setAttribute('id',unwin.ids_vb_midl),n_vb_div_midl.setAttribute('style','position:'+(unwin.usefixedposition?'fixed':'absolute')+';margin-left:'+(10+unwin.colWidth)+'px;margin-right:'+(10+unwin.colWidth)+'px;');
	//TEST STYLES-borders for all boxen
	/*
	_vt(unwin.ids_vb_hold).style.border="1px solid red";
	_vt(unwin.ids_vb_titl).style.border="1px solid grey";
	_vt(unwin.ids_vb_head).style.border="1px solid green";
	_vt(unwin.ids_vb_foot).style.border="1px solid blue";
	_vt(unwin.ids_vb_cont).style.border="1px solid purple";
	_vt(unwin.ids_vb_left).style.border="1px solid pink";
	_vt(unwin.ids_vb_rigt).style.border="1px solid orange";
	_vt(unwin.ids_vb_midl).style.border="1px solid black";
	*/

	// NOW grab content from the page and place it in the correct boxen
	//_vt(unwin.ids_left_column).cloneNode(true);
	
	if(_vt(unwin.ids_right_column2)){
		var rcol2=unwin.vidzb_GrabNode(unwin.ids_right_column2);
		_vt(unwin.ids_right_column).appendChild(rcol2);
	}
	if(_vt(unwin.ids_left_column2)){
		var rcol2=unwin.vidzb_GrabNode(unwin.ids_left_column2);
		_vt(unwin.ids_left_column).appendChild(rcol2);
	}
	// advice: remove smaller items first from the large ones
	var newVideoItself=unwin.vidzb_GrabNode(unwin.ids_video_holder);
	var newVideoTitle=unwin.vidzb_GrabNode(unwin.ids_title);
	var newHeader=unwin.vidzb_GrabNode(unwin.ids_header);
	var newHeader2=unwin.vidzb_GrabNode(unwin.ids_header2);
	var newHeader3=unwin.vidzb_GrabNode(unwin.ids_header3);
	var newFooter=unwin.vidzb_GrabNode(unwin.ids_footer);
	var newFooter2=unwin.vidzb_GrabNode(unwin.ids_footer2);
	var newLeftCol=unwin.vidzb_GrabNode(unwin.ids_left_column);
	var newRigtCol=unwin.vidzb_GrabNode(unwin.ids_right_column);

	

	//r div?? typically this was done search:GTO599 //append title to heade
	n_vb_div_header.appendChild(newHeader),n_vb_div_header.appendChild(newHeader2),n_vb_div_header.appendChild(newHeader3),n_vb_div_header.appendChild(n_vb_div_title),n_vb_div_footer.appendChild(newFooter),n_vb_div_footer.appendChild(newFooter2),n_vb_div_left.appendChild(newLeftCol),n_vb_div_right.appendChild(newRigtCol),n_vb_div_title.appendChild(newVideoTitle),n_vb_div_midl.appendChild(newVideoItself);                 // _vt(unwin.ids_vb_midl).
//	if(unwin.extraModControls){
//		newVideoItself.appendChild(unwin.vidzb_GrabNode(unwin.extraModControls));
//	}
	//if( typeof(reinstateHiddenVideo)=='function'){reinstateHiddenVideo(newVideoItself);}
	
	//add after creation!
	if(unwin.columnPriorityComments){
		n_vb_div_content.appendChild(n_vb_div_left);
		n_vb_div_content.appendChild(n_vb_div_right);
	}else{
		n_vb_div_content.appendChild(n_vb_div_right);
		n_vb_div_content.appendChild(n_vb_div_left);
	}
	n_vb_div_content.appendChild(n_vb_div_midl);

	n_vb_div_holder.appendChild(n_vb_div_header);
	//GTO599//n_vb_div_holder.appendChild(n_vb_div_title);
	n_vb_div_holder.appendChild(n_vb_div_content);
	n_vb_div_holder.appendChild(n_vb_div_footer);
	
	document.body.appendChild(n_vb_div_holder);
	
	//_vt(unwin.ids_vb_midl).appendChild(newFooter2);
	//_vt('n_vb_div_adz1').innerHTML='hi';
	/*
	if(_vt(unwin.ids_title)){
		//var titleHTML=new String($g(unwin.ids_title).innerHTML);
		//titleHTML=titleHTML.qreplace('<h1>','<h1 class="spaceholder">')+titleHTML.qreplace('<h1>','<h1 id="vidz_floatytitle" class="floatytitle"><div style="margin-left:auto;margin-right:auto;position:relative;top:0px;text-align:center;">').qreplace('</h1>','</div></h1>');
		//$g(unwin.ids_title).innerHTML=titleHTML;
		
		titlePosY=unwin.getElementYpos($g(unwin.ids_title));
		titleHeight=unwin.getElementHeight($g(unwin.ids_title));
	}*/
	//now that we grabbed all the content we wanted,hide everything else
	//if(_vt(unwin.ids_all_holder_hide)){
		//$g(unwin.ids_all_holder_hide).style.display='none';
	//}
	
	//if(_vt(unwin.ids_vb_titl)){
	//	titlePosY=unwin.getElementYpos($g(unwin.ids_vb_titl));
	//	titleHeight=unwin.getElementHeight($g(unwin.ids_vb_titl));
	//}
	initialYousableSetup();
	//OK now REALLY hide everything!!
	unwin.vidzb_hideEverythingNotUs(document.body);
	//now show everything else
	unwin.showIgnoreList();
}

unwin.showIgnoreList=function(){
	if(unwin.ignoreList){
		for(var i=0,l=unwin.ignoreList.length;i<l;i++){
			if(_vt(unwin.ignoreList[i])){
				$g(unwin.ignoreList[i]).style.display='block';
			}
		}
	}
}
unwin.hideIgnoreList=function(){
	if(unwin.ignoreList){
		for(var i=0,l=unwin.ignoreList.length;i<l;i++){
			if(_vt(unwin.ignoreList[i])){
				$g(unwin.ignoreList[i]).style.display='none';
			}
		}
	}
}

//INitial setup and resize of elements.  
unwin.vidzb_initialSetupAndResize=function(){
	
	
	//guessing some of this stuff can go to one time setup?
	unwin.columnMode=0;
	
	if(unwin.ids_footer&&document.getElementById(unwin.ids_footer)){
		var fs=document.getElementById(unwin.ids_footer).style;
		fs.marginLeft="auto",fs.marginRight="auto";
	}
	//I think a few things are missing here,since this is called when we (force apply fixes updates resze)
	// as we apply preferences things need to be applied here..... not that difficult to set up
	
	//shrink or expand stuff to fit within our column sizes
	unwin.vidzb_SizeMaxWidthOfChildNodes(_vt(unwin.ids_vb_left),unwin.colWidth);
	unwin.vidzb_SizeMinWidthOfChildNodes(_vt(unwin.ids_vb_rigt),unwin.colWidth);
		
	unwin.vidzb_initialSkinSetup();
	var vbpm=document.getElementById('vidzbigger_prefs_menu');
	//preference menu positioning &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
	if(unwin.myvideoalign=="LEFT"){
		//*************************************************************************LEFT 
		vbpm.style.left="auto";
		vbpm.style.right="0px";
	}else if(unwin.myvideoalign=="CENTER"){
		//*************************************************************************CENTER 
		vbpm.style.left="auto";
		vbpm.style.right="0px";
	}else if(unwin.myvideoalign=="RIGHT"){
		//*************************************************************************RIGHT 
		vbpm.style.right="auto";
		vbpm.style.left="0px";
		//do something special here to flip the flag around...?
	}else{
		alert('something mysterious code 0x0NINEFIVETWO');
	}
}
unwin.invertColorSchemeLoadValue=unwin.invertColorScheme;
unwin.vidzb_initialSkinSetup=function(){
	var scriptStyles=[];
	
	if( unwin.invertPrefColorScheme ){
		scriptStyles.push("#vidzBPrefsHolder{background-color:#FFF;color:black;border:1px solid #999;}");
	}else{
		scriptStyles.push("#vidzBPrefsHolder{background-color:black;color:white;border:none;}");
	}
	
	if(unwin.invertColorScheme){
		scriptStyles.push("body{background-color:black;color:grey;}");
		scriptStyles.push(".watch-comment-head{background-color:black;color:grey;}");
		scriptStyles.push(".watch-comment-auth-head{background-color:#333;color:grey;}");
		scriptStyles.push("#watch-channel-vids-div{background-color:black;color:grey;}");
		scriptStyles.push("#footer{background-color:#111;color:grey;}");
		scriptStyles.push("textarea{background-color:#666;color:white;}");
		scriptStyles.push(".search-term{background-color:#666;color:white;}");
		scriptStyles.push("input{background-color:#555;color:#AAAAAA;}");
		scriptStyles.push("select{background-color:#555;color:#AAAAAA;}");
		scriptStyles.push("#vidzbigger_prefs_menu input{background-color:#AAA;color:#000;}");
		scriptStyles.push("#watch-channel-brand-div{background-color:#000;color:#FFF;}");
		scriptStyles.push(".expand-header{color:#333;}");
		scriptStyles.push(".watch-stat{color:#333;}");
		scriptStyles.push(".watch-tab-sel{background-color:#000;");
		scriptStyles.push(".watch-tab-sel{feedmodule-data:#000;");
		scriptStyles.push(".watch-tab-sel a{color:#BBBBBB;");
		scriptStyles.push("#left-col{color:#FFF;");
		scriptStyles.push(".radio-label{color:#FFF;");
		scriptStyles.push("#mymedia #list-pane .folder a{color:grey;");
		scriptStyles.push("#mymedia #list-pane .subfolder a{color:grey;");
		scriptStyles.push(".feedmodule-anchor{background-color:black;");
		scriptStyles.push("#watch-video-owner{background-color:black;");
		scriptStyles.push(".statModule-item-line{background-color:black;");
		scriptStyles.push(".img-gray-bottom-cap,.main-tabs-bottom-cap{background-image:none;border-top:1px solid grey;");
		scriptStyles.push("#vizbigger_title{text-align:center;color:grey;}");
		var sstr='';
		//sstr=".master-sprite{background-image:url(\"http://www.vidzbigger.com/img/master-vfl72305f.png\")}";
		sstr=".master-sprite{background-image:url(\""+unwin.vidzb_vidzBiggerInvertedTemplateImage()+"\")}";
		GM_addStyle(sstr);
		unwin.invertColorSchemeLoadValue=true;
	}else if(unwin.invertColorSchemeLoadValue==true){
		scriptStyles.push("body{background-color:white;color:black;}");
		scriptStyles.push(".watch-comment-head{background-color:white;color:grey;}");
		scriptStyles.push(".watch-comment-auth-head{background-color:#AAA;color:grey;}");
		scriptStyles.push("#watch-channel-vids-div{background-color:white;color:grey;}");
		scriptStyles.push("#footer{background-color:#EEE;color:grey;}");
		scriptStyles.push("textarea{background-color:#FFF;color:black;}");
		scriptStyles.push(".search-term{background-color:#FFF;color:black;}");
		scriptStyles.push("input{background-color:#FFF;color:#black;}");
		scriptStyles.push("select{background-color:#FFF;color:#black;}");
		scriptStyles.push("#vidzbigger_prefs_menu input{background-color:#FFF;color:#000;}");
		scriptStyles.push("#watch-channel-brand-div{background-color:#fff;color:#000;}");
		scriptStyles.push(".expand-header{color:#999;}");
		scriptStyles.push("#left-col{color:#000;");
		scriptStyles.push(".radio-label{color:#000;");
		scriptStyles.push(".watch-stat{color:#999;}");
		scriptStyles.push(".watch-tab-sel{background-color:#FFF;");
		scriptStyles.push(".watch-tab-sel{feedmodule-data:#FFFF;");
		scriptStyles.push(".watch-tab-sel a{color:#000;");
		scriptStyles.push("#watch-video-owner{background-color:#e4edfc;");
		scriptStyles.push("#vizbigger_title{text-align:center;color:black;}");
		var sstr='';
		//sstr=".master-sprite{background-image:url(\"http://www.vidzbigger.com/img/master-vfl72305f.png\")}";
		sstr=".master-sprite{background-image:url("+'http://s.ytimg.com/yt/img/master-vfl72305.png'+")}";
		GM_addStyle(sstr);
	}
	scriptStyles.forEach(function(s){GM_addStyle(s.makeImportant());});
}
//unwin.ids_vb_left or unwin.ids_vb_rigt
unwin.vidzb_ConsolodateColumns=function(destinationColumn){
	if(unwin.columnMode==2) return;//already in 2 col mode
	unwin.columnMode=2;
	unwin.thedestinationColumn=destinationColumn;
	var newLeftCol=unwin.vidzb_GrabNode(unwin.ids_left_column);
	var newRigtCol=unwin.vidzb_GrabNode(unwin.ids_right_column);
	newLeftCol.style.marginTop='0px';
	newRigtCol.style.marginTop='0px';
	if(unwin.columnPriorityComments){
		$g(destinationColumn).appendChild(newLeftCol);
		$g(destinationColumn).appendChild(newRigtCol);
	}else{
		$g(destinationColumn).appendChild(newRigtCol);
		$g(destinationColumn).appendChild(newLeftCol);
	}
	unwin.handleColumnAd();
	var cw=new Number(unwin.colWidth);
	if (unwin.columnScrollIndependent){
		if(unwin.columnsavailable>2)
		 	cw+=35;
		else
			cw+=14;
	}
	if(destinationColumn==unwin.ids_vb_left){
		$g(unwin.ids_vb_midl).style.marginRight='5px';
		$g(unwin.ids_vb_midl).style.marginLeft=(cw+10)+'px';
	}else{
		$g(unwin.ids_vb_midl).style.marginRight=(cw+10)+'px';
		$g(unwin.ids_vb_midl).style.marginLeft='5px';
	}
}//alert('inteligent designs naturally selected');
//back to 3 column mode
unwin.vidzb_SpreadColumns=function(minw,wHei,totalWindowHeight,atBtm,scr){
	var newLeftCol,newRigtCol;
//	newLeftCol=unwin.vidzb_GrabNode(unwin.ids_vb_left);
//	newRigtCol=unwin.vidzb_GrabNode(unwin.ids_vb_rigt);
//	
//	var lc,rc,px;
//	lc=unwin.getElementHeight(newLeftCol)
//	rc=unwin.getElementHeight(newRigtCol)
//	
//	console.log('rc '+rc + ' lc '+lc);
//	console.log('hh' +unwin.headerHeight);
//	if(wHei>0){
//		scr=unwin.getScroll();
//		if( lc < rc ){
//			
//			//px=unwin.getOffset(newLeftCol)
//			if(scr>unwin.headerHeight&&scr+wHei>lc+unwin.headerHeight){//lc+wHei+
//				console.log('fixed-LC'+(-(lc-wHei)));
//				newLeftCol.style.position='fixed'
//				newLeftCol.style.top=-(lc-wHei)-totalWindowHeight+'px';
//			}else{
//				console.log('UNfixed-LC'+(-(lc-wHei)));
//				newLeftCol.style.position='relative'
//				newLeftCol.style.top='0px';
//			}
//		}else{
//			console.log(scr+wHei + ' '+(rc+unwin.headerHeight));
//			//px=unwin.getOffset(newRigtCol)
//			if(scr>unwin.headerHeight&&scr+wHei>rc+unwin.headerHeight){//rc+wHei+
//				console.log('fixed-RC'+(-(rc-wHei)));
//				newRigtCol.style.position='fixed'
//				newRigtCol.style.top=-(rc-wHei)+'px';
//			}else{
//				console.log('UNfixed-RC'+(-(rc-wHei)-totalWindowHeight));
//				newRigtCol.style.position='relative'
//				newRigtCol.style.top='0px';
//			}
//		}
//	}
//	

	if(unwin.columnMode==3) return;//already in 3 col mode
	unwin.columnMode=3;
	newLeftCol=unwin.vidzb_GrabNode(unwin.ids_left_column);
	newRigtCol=unwin.vidzb_GrabNode(unwin.ids_right_column);
	if(unwin.columnPriorityComments){
		_vt(unwin.ids_vb_left).appendChild(newLeftCol);
		_vt(unwin.ids_vb_rigt).appendChild(newRigtCol);
		
	}else{
		_vt(unwin.ids_vb_left).appendChild(newRigtCol);
		_vt(unwin.ids_vb_rigt).appendChild(newLeftCol);
	}
	unwin.handleColumnAd();
	var cw=new Number(unwin.colWidth);
	if(unwin.columnScrollIndependent) cw+=14;
	$g(unwin.ids_vb_midl).style.marginRight=(cw+10)+'px';
	$g(unwin.ids_vb_midl).style.marginLeft=(cw+10)+'px';
}
unwin.handleColumnAd=function(){
	var oldadd=unwin.vidzb_GrabAndRemoveNode('n_vb_div_adz1');
	//<div id="n_vb_div_adz1">
	n_vb_div_adz1=document.createElement('div');
	n_vb_div_adz1.setAttribute('id','n_vb_div_adz1');
	n_vb_div_adz1.setAttribute('style','');
	if(unwin.simpleViewMode){
		document.body.appendChild(n_vb_div_adz1);
	}else if(unwin.columnMode==3){
		//taller column does not get ad...	
		if(unwin.getElementHeight(_vt(unwin.ids_vb_rigt)) >unwin.getElementHeight(_vt(unwin.ids_vb_left))){
			_vt(unwin.ids_vb_left).appendChild(n_vb_div_adz1);
		}else{
			_vt(unwin.ids_vb_rigt).appendChild(n_vb_div_adz1);
		}
	}else{
		_vt(unwin.thedestinationColumn).appendChild(n_vb_div_adz1);
	}
	_vt('n_vb_div_adz1').innerHTML=unwin.vidzbadd1_html;
}

unwin.vidzb_hideEverythingNotUs=function(start){
	var cNodes=start.childNodes;
	for(var x=0, l=cNodes.length;x<l;x++){
		if(cNodes[x].id=='vizbigger_all_content_holder' || cNodes[x].id=='vidzbigger_prefs_menu'){
			continue;
		}else{
			if(cNodes[x].style){
				cNodes[x].style.display="none";//onsecondthought
				//unwin.vidzb_hideEverythingNotUs(cNodes[x]);
			}
		}
	}
}

unwin.vidzb_SizeMaxWidthOfChildNodes=function(node,maxw){
	if(node){
		var cNodes=node.childNodes;
		if(cNodes && cNodes.length>0){
			for(var x=0, l=cNodes.length;x<l;x++){
				if(unwin.getElementWidth(cNodes[x])>maxw){
					cNodes[x].style.width=maxw+'px';
				}
				unwin.vidzb_SizeMaxWidthOfChildNodes(cNodes[x],maxw);
			}
		}
	}
}
//okay you two combine
unwin.vidzb_SizeMinWidthOfChildNodes=function(node,minw){
	if(node){
		var cNodes=node.childNodes;
		if(cNodes && cNodes.length>0){
			for(var x=0, l=cNodes.length;x<l;x++){
				//if(unwin.getElementWidth(cNodes[x])>minw){
				if(cNodes[x].style.width.CSStoInteger()<minw){
					cNodes[x].style.width=minw+'px';
				}
				unwin.vidzb_SizeMaxWidthOfChildNodes(cNodes[x],minw);
			}
		}
	}
}

unwin.setVideoSize=function(w,h,totalWindowHeight,atBtm,scr){
	var fvp=0;//finalVideoPosition;
	var fhp=0;//finalHorozontalVideoPosition;
	//385 / 480  ratio
	var fullwidth=w;
	var fullheight=h;

	if(!unwin.fullscreenmode){
		if(w>unwin.maximumVideoWidth) w=unwin.maximumVideoWidth;
		//if(w<unwin.minimumVideoWidth)w=unwin.minimumVideoWidth;
		// now prevent black bars on teh sides if the video is crushed vertically
		if (unwin.preventHzBlackBars){
			var twid=(h-video_bottom_button_bar_height) / ratio;
			if(w>twid){
				//fullwidth=twid;
				w=twid;
			}
		}
		// prevent black bars above and below video
		if (unwin.preventVtBlackBars){
			var maxHeight=Math.floor(w*ratio)+video_bottom_button_bar_height;
			if(h>maxHeight){
				h=maxHeight;
			}
		}
	}
	
	if(unwin.fullscreenmode){
		//if(scr>-unwin.headerHeight && unwin.usefixedposition) fvp=-unwin.headerHeight-scr;
		//else 
			fvp=0;
		//fvp+=20
		// compute video positioning and or centering (do not do for no centering)
	}else if (unwin.positionVideoAutomatically){
		//if(atBtm) fullheight*=1;//1.05;//at btm add extra space above video for mouse
		fvp=(fullheight-h)>>1;//Math.floor((fullheight-h)/2);
	}
	
	if(w<fullwidth){
			if(unwin.fullscreenmode || unwin.columnsavailable==1){
				fhp=0;
			}else{
				leftpad=(fullwidth>>1)-(w>>1);//(fullwidth/2)-(w/2);
				fhp=leftpad;
			}
	}
	unwin.lastHeight=h;
	unwin.lastWidth=w;
	unwin.applyVideoSizePosz(w,h,fhp,fvp);
}
unwin.videoPlayerItself=false;
unwin.html5mode=false;
unwin.searchVideoPlayer=function(startNode){
	if(unwin.videoPlayerItself)return unwin.videoPlayerItself;
	if(unwin.siteID==1){
		unwin.videoPlayerItself=startNode;
		return startNode;//because embed element has 100% width and height...
	}
	var cn=startNode.childNodes;
	for(var i in cn){
		if(cn[i].nodeName=="OBJECT"||cn[i].nodeName=="EMBED"||cn[i].tagName=="VIDEO"){
			 unwin.videoPlayerItself=cn[i];return cn[i];
		}else if(cn[i].className&&cn[i].className.indexOf('video-content')==0){
			unwin.html5mode=true;
			unwin.videoPlayerItself=cn[i];return cn[i];
		}else{
			var thenode= unwin.searchVideoPlayer(cn[i]);
			if(thenode) return thenode;
		}
	}
}
//	return searchImagePlayer(startNode);
//}
//unwin.searchImagePlayer=function(startNode){
//	//if(unwin.videoPlayerItself)return unwin.videoPlayerItself;
//	var cn=startNode.childNodes;
//	for(var i=0;i<1||i<cn.length;i++){
//		if(cn[i].nodeName=="IMG"){ 
//			 //unwin.videoPlayerItself=cn[i];
//			 return cn[i];
//		}else{
//			var thenode= unwin.searchVideoPlayer(cn[i]);
//			if(thenode) return thenode;
//		}
//	}
//}
unwin.applyVideoSizePosz=function(w,h,x,y){
	var mdl=$g(unwin.ids_vb_midl).style;//a simplified function but also always does both
	h=Math.floor(h),w=Math.floor(w),x=Math.floor(x),y=Math.floor(y),mdl.height=(h)+"px",mdl.width=(w)+"px";
		if($g(unwin.ids_video_holder)){var videoItself=unwin.searchVideoPlayer($g(unwin.ids_video_holder));
			if(videoItself&&videoItself.style){videoItself=videoItself.style;
				if(videoItself)videoItself.height=(h)+"px",videoItself.width=(w)+"px",videoItself.marginLeft=(x)+"px",videoItself.marginTop=(y)+"px";
		}
	}
}
unwin.linksByURL=[];
//THIS ONE MAKES ALL LINKS HIGH QUALITY 
unwin.vidzb_fmt18ALlLinks=function(){
	unwin.vidzb_animateAllVideoIcons();
	if(unwin.enablePlayNext)unwin.vidzb_playnextlinks();
	if(unwin.useHighQuality !=true) return;
	unwin.linksByURL=[];
	var allLinks=document.getElementsByTagName('a');
	var gotcount=0;
	for(var x=0,l=allLinks.length;x<l;x++){
		var chref=new String(allLinks[x].href);
		
		if(chref.indexOf('youtube')>0 && chref.indexOf('watch')>0 && chref.indexOf('fmt=18')<0 && chref.indexOf('fmt=22')<0 && chref.indexOf('checkedhd')<0 && chref.indexOf('#')<0 && chref.indexOf('feature=hd')<0){
			var myHref=new String(allLinks[x].href);
			if(myHref.indexOf('&')>0)
				myHref=myHref.substr(0,myHref.indexOf('&'));
			if( unwin.flipVideo )allLinks[x].href+='&flip=1';
			allLinks[x].href+='&fmt=18';
			if(!unwin.linksByURL[myHref]) unwin.linksByURL[myHref]=[];
			unwin.linksByURL[myHref].push(allLinks[x]);
			gotcount++;
		}
		
	}
	if(gotcount>0) vidzb_visualize(allLinks);//Youtube HD Suite functionality to check for HQ version and update each link
}

window.addQueue=function(e){
	var turl=vidzb_getEventTarget(e),n='the_next';
	if(_vt(n)){var p=$g(n);p.id='';p.innerHTML=' [&gt;]';if(p==turl)return;};
	turl.id=n;turl.innerHTML=' [isNext]';
}
unwin.vidzb_playnextlinks=function(){
	var allLinks=document.getElementsByTagName('a');
	for(var x=0,l=allLinks.length;x<l;x++){
		var chref=new String(allLinks[x].href);
		if(allLinks[x].innerHTML.indexOf('<img')<0 && chref.indexOf('youtube')>0 && chref.indexOf('/watch')>0 && chref.indexOf('#')< 0 && (!allLinks[x].nextSibling || (allLinks[x].nextSibling.innerHTML && allLinks[x].nextSibling.innerHTML.indexOf(' [')<0))){
			var nl=document.createElement('a');
			nl.setAttribute('title','Play Next');
			nl.innerHTML=' [&gt;]';//bah entities
			//allLinks[x].parentNode.insertBefore(nl, allLinks[x].parentNode.firstChild);
			allLinks[x].parentNode.insertBefore(nl, allLinks[x].nextSibling);
			nl.addEventListener('click',addQueue,false);
		}
	}
}
unwin.vbcheckIfImageIsThumb=function(srs){
	if( srs.indexOf('default.jpg')>0 || srs.indexOf('1.jpg')>0 || srs.indexOf('2.jpg')>0 || srs.indexOf('3.jpg')>0 ){return true;}return false;
}
unwin.vbattachHoverEventsToThumb=function(img){
	cevents.register(img,'mouseover',vidzb_mouseoverthumb );
	cevents.register(img,'mouseout',vidzb_mouseoutthumb );
}
unwin.imgsToAnimateList=[];//in case we animate in a single timeout instead of a unique timeout for each button
unwin.vidzb_animateAllVideoIcons=function(){
	if(unwin.animateVidThumbnails !=true) return;
	var allImages=document.getElementsByTagName('img');
	for(var x=0,l=allImages.length;x<l;x++){
		if(allImages[x].name=='ready' || allImages[x].name=='loading') continue;//already got this img/skip it
		var srs=new String(allImages[x].src);
		//if( unwin.alwaysAnimateVidThumbnails ){
		//	allImages[x].addEventListener('load',function(e){var timg=vidzb_getEventTarget(e);timg.name='ready';vidzb_mouseoverthumb(timg,1000)},false)
		//}else{
		//	allImages[x].addEventListener('load',function(e){var timg=vidzb_getEventTarget(e);timg.name='ready';},false)
		//}
		if(!unwin.alwaysAnimateVidThumbnails||(unwin.alwaysAnimateVidThumbnails&&!unwin.alwaysAnimateVidThumbnails1LOOP)){
			allImages[x].addEventListener('load',function(e){var timg=vidzb_getEventTarget(e);timg.name='ready';},false)
		}
		if(unwin.vbcheckIfImageIsThumb(srs)){
			allImages[x].name='ready';//probably loaded - we use teh name atrb to store info about if the next image is loaded or not
			if( unwin.alwaysAnimateVidThumbnails ){
				if(unwin.alwaysAnimateVidThumbnails1LOOP){
					unwin.imgsToAnimateList.push(allImages[x]);
				}else{				//allImages[x].addEventListener('load',function(e){var timg=vidzb_getEventTarget(e);timg.name='ready';},false)
					vidzb_mouseoverthumb(allImages[x],(1000 + (x<<8))); //image is loaded probably... do it now
				}
			}else{
				//allImages[x].addEventListener('load',function(e){var timg=vidzb_getEventTarget(e);timg.name='ready';},false)
				unwin.vbattachHoverEventsToThumb(allImages[x]);
			}
		}else{
			//not loaded yet but it might still be a video or video thumbnail
			var srs=new String(allImages[x].getAttribute('thumb'));
			if(unwin.vbcheckIfImageIsThumb(srs)){
				if( unwin.alwaysAnimateVidThumbnails ){
					if(unwin.alwaysAnimateVidThumbnails1LOOP){
						unwin.imgsToAnimateList.push(allImages[x]);
					//allImages[x].addEventListener('load',function(e){var timg=vidzb_getEventTarget(e);timg.name='ready';vidzb_mouseoverthumb(timg,1000)},false)
					}else{
						allImages[x].addEventListener('load',vidzb_mouseoverthumb,false)//when it is loaded start animating!
					}
				}else{
					//allImages[x].addEventListener('load',function(e){var timg=vidzb_getEventTarget(e);timg.name='ready';},false)
					unwin.vbattachHoverEventsToThumb(allImages[x]);//even tho its not loaded attach the events for hover 
				}
			}
		}
	}
	//if( unwin.alwaysAnimateVidThumbnails ){//if we scroll down we will be dissapointed unless this happens again!
	//	window.setTimeout(function(){unwin.vidzb_animateAllVideoIcons()},4000);
	//}
}
var vidzb_anithumb_timeout=0;
window.vidzb_animateAllSingleTimeout=function(){
	for( i in unwin.imgsToAnimateList){
		vidzb_animatethumb(unwin.imgsToAnimateList[i]);
	}
}
window.vidzb_animatethumb=function(w){
	if( w.src.indexOf('.jpg') < 1 )return;// w.src=w.getAttribute('thumb');
	srs=new String(w.src);var sp=srs.lastIndexOf('/');
	cur=new Number(srs.substr(sp+1,1));
	if( isNaN(cur) ) cur=0;cur++;if( cur > 3 ) cur=1;
	w.src=srs.substr(0,sp) + '/'+cur+'.jpg';
	//w.name='loading';//store the next value, so we know if its loaded yet
}
window.vidzb_mouseoverthumb=function(ev,dl){
	var w=0;
	if( ev.src ) w=ev;else w=vidzb_getEventTarget(ev);
	if(w.src.indexOf('pixel')>0)vidzb_initthumb(w);
	try{w.removeEventListener('load',vidzb_mouseoverthumb,false);}catch(xe){GM_log('failed to remove');}//remove the listener for the ones that are not loaded until u scroll if exists
	if( typeof(dl)=='undefined' ){
		dl=0;if(w.name!='ready')dl=1000;//next image is not loaded yet... wait...
	}
	if( dl > 0){//inital delay if animating ALL thumbs
		vidzb_anithumb_timeout=window.setTimeout(function(){vidzb_mouseoverthumb(w)},dl);
		return;
	}
	vidzb_animatethumb(w);
	vidzb_anithumb_timeout=window.setTimeout(function(){vidzb_mouseoverthumb(w)},1000);//doing this onload instead
}
window.vidzb_mouseoutthumb=function(ev){
	clearTimeout(vidzb_anithumb_timeout);
	w=vidzb_getEventTarget(ev);
	srs=new String(w.src);
	var sp=srs.lastIndexOf('/');
	w.src=srs.substr(0,sp) + '/default.jpg';
}
window.vidzb_initthumb=function(t){
	if(!t.attributes)return;//wtf
	tm=t.attributes.getNamedItem('thumb').nodeValue;//so lame
	if(tm)t.src=tm;
}
/***create XmlHttpRequest Youtube HD Suite*/
function createXHR(){
    if (window.ActiveXObject){
        try{
            return new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e){
            try{
                return new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2){
                return null;//lol
            }
        }
    } else if (window.XMLHttpRequest){
        return new XMLHttpRequest();
    } else{
        return null;
    }
}
/***check URL Youtube HD Suite*/
function vbcheckURL(video_id){
		var burl='http://'+location.host+'/watch'+'?v='+video_id;
    var url=burl+'&fmt=22';
    var curl=burl+'&fmt=35';
    var XHR=createXHR();
    XHR.open('GET',url,true);
    XHR.onreadystatechange=function(){ 
        if (XHR.readyState==4){
            if ( match=XHR.responseText.match(/var swfArgs=({.*})/) ){
                json=eval('('+RegExp.$1+')');
                //var s=document.getElementsByTagName('strong');
                var s=unwin.linksByURL[burl];
                if(!s) return;
                var rStr=new String(XHR.responseText);
                for (var i=0,l=s.length;i<l;i++){
               		if (json['fmt_map'].indexOf('22/2000000/9/0/115')>=0){
               	 		//s[i].href=burl+"&fmt=22";
               	 		s[i].href=new String(s[i].href).qreplace('&fmt=18',"&fmt=22");
               	 		if (s[i].innerHTML.indexOf('<img')<0 && s[i].innerHTML.indexOf('&nbsp;HD&nbsp;')<0){
	               	 		if(unwin.indicateHDQuality)	s[i].innerHTML=' <span style="background-color:red;color:#FFF;">&nbsp;HD&nbsp;</span>'+s[i].innerHTML;
	               	 		if(rStr.indexOf('authorized')>0){
	               				s[i].innerHTML='<span style="background-color:red;color:#FFF;">&nbsp;MUTED&nbsp;</span>'+s[i].innerHTML;
			                }else if(rStr.indexOf('This video has been removed by the user')>0){
	               				s[i].innerHTML='<span style="background-color:red;color:#FFF;">&nbsp;DELETED&nbsp;</span>'+s[i].innerHTML;
			                }
	               		}
               		}else{
               				//s[i].href=burl+"&fmt=18&why=false";//already applied
               				if (new String(s[i].href).indexOf('checkedhd')<0) 
               					s[i].href=new String(s[i].href).qreplace('&fmt=18',"&fmt=18&checkedhd=t");
               		}
              	}
            }
        }
    }
    XHR.send('');
}
/***Add HD or MP4 on each links in YouTube List Page Youtube HD Suite*/
function vidzb_visualize(alllinks){
    var a=alllinks;//document.getElementsByTagName('a');
    var a_text='';
    for (var i=0,l=a.length;i<l;i++){
        match='';
        if (a[i].innerHTML.indexOf('<img')>-1)       continue;// Skip Image Link
        if (a[i].getAttribute('vid'))                  continue;// Skip checked Link
        if (a[i].getAttribute('class')=='yt-button') continue;// Skip Button Link
        if (a[i].href.match(/#$/))                     continue;// Skip functional Link
        if (new String(a[i].href).indexOf('fmt=22')>0)                 continue;// Skip already fmt22 Link
        if (new String(a[i].href).indexOf('checkedhd')>0)              continue;// Skip already checked fmt 18 link

        if (a[i].href.match(/watch\?v=([a-zA-Z0-9_-]*)/)){
            match=RegExp.$1;
            vbcheckURL(match);
        }
    }
}

//THIS ONE CREATES VidzBig PREFERENCES AREA
unwin.p_createPreferencesArea=function(){
	nPDiv=document.createElement('div');	
	nPDiv.setAttribute('id','vidzbigger_prefs_menu');
	var opacity=100;
	nPDiv.setAttribute('style','position:'+(unwin.prefFlagPositionFixed?'fixed':'absolute')+';min-width:160px;overflow:auto;right:0px;top:0px;padding:0px;z-index:10000;font-size:12px;font-family:arial,sans-serif;background-color:transparent;color:black;opacity:'+(opacity/100)+';filter: alpha(opacity='+(opacity)+');-moz-opacity: '+(opacity/100)+';');
	if(document.body){
		document.body.appendChild(nPDiv);
		unwin.p_hidePrefs(true);
	}else{
		return;
	}
}
unwin.vidzbPrefsDoNotFitUntilResize=false;
unwin.p_updatePrefwinHeight=function(){
	if(unwin.prefsShowing){
		if( unwin.vidzbPrefsDoNotFitUntilResize ) return;
		if(_vt('vidzbigger_prefs_menu')){
			var pMenuH=unwin.getElementHeight($g('vidzbigger_prefs_menu'));
			var winHei=unwin.getWindowHeight();
			if(unwin.vidzbPrefsDoNotFitUntilResize||pMenuH>winHei){
				$g('vidzbigger_prefs_menu').style.height=(winHei-10)+'px';
				$g('vidzbigger_prefs_menu').style.overflow='scroll';
				$g('vidzbigger_prefs_menu').style.overflowX='hidden';
				unwin.vidzbPrefsDoNotFitUntilResize=true;
			}else{
				$g('vidzbigger_prefs_menu').style.height='auto';
				$g('vidzbigger_prefs_menu').style.overflow='auto';
			}
		}
	}else{
		if(_vt('vidzbigger_prefs_menu')){
			$g('vidzbigger_prefs_menu').style.height='auto';
			$g('vidzbigger_prefs_menu').style.overflow='auto';
		}
	}
}
unwin.p_refreshPrefs=function(){
	if(unwin.prefsShowing){
		//$g('vidzbigger_prefs_menu').innerHTML='';
		unwin.prefsShowing=false;
		unwin.p_vidzbShowPrefs();
	}
}
unwin.p_beginPrefItemRow=function(){
	return '<div class="vidzb_pref_row" onmouseover="this.style.backgroundColor=\'#'+(unwin.invertPrefColorScheme?'DDDDDD':'181818')+'\';" onmouseout="this.style.backgroundColor=\'transparent\';">';
}
unwin.p_endPrefItemRow=function(){
	return '</div>';
}
unwin.p_beginPrefSectn=function(id, title,viz){
	if( typeof(viz)=='undefined')viz='none';
	ost='<h3>';
	ost+='<img id="vizcolexpnader'+id+'_hid" style="display:inline;cursor:pointer;" src="'+unwin.p_vidzColapzed(this)+'" align="bottom" title="Expand" alt="&gt;" />';
	ost+='<img id="vizcolexpnader'+id+'_shw" style="display:none;cursor:pointer;" src="'+unwin.p_vidzXpandD(this)+'" align="bottom" title="Collapse" alt="&lt;" />';
	ost+='&nbsp;<span style="cursor:pointer;color:#52A3EE;" id="vizcolexpnader'+id+'_tog">'+title+'</span></h3>';
	ost+='<div id="vizcolexpnader'+id+'_viv" style="display:'+viz+';">';
	VBlistenersToAdd.push(createPendingEventObject('vizcolexpnader'+id+'_hid','mousedown',eventvidzbpreftoggleme,true));
	VBlistenersToAdd.push(createPendingEventObject('vizcolexpnader'+id+'_shw','mousedown',eventvidzbpreftoggleme,true));
	VBlistenersToAdd.push(createPendingEventObject('vizcolexpnader'+id+'_tog','mousedown',eventvidzbpreftoggleme,true));
	return ost;
}
unwin.p_createPrefCheckbox=function(id, title, help,ndent){
	if( typeof(ndent) == 'undefined' )ndent=0;
	var checkd='';
	if(unwin[id])checkd=' checked';
	ost=unwin.p_beginPrefItemRow();
	for(var i=0;i<ndent;i++){
		ost+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	}
	ost+='<label><input type="Checkbox" id="vbg_prefInput_'+id+'" name="pref_'+id+'" '+checkd+'/>';
	VBlistenersToAdd.push(createPendingEventObject('vbg_prefInput_'+id,'click',vidzb_clickPrefCheckbox,true));
	ost+=title+'</label>'+unwin.p_getQuestionMarkImage(help);
	ost+=unwin.p_endPrefItemRow();
	return ost;
}
window.vidzb_cancelFulscButton=function(){unwin.p_hidePrefs();unwin.finVidzBToggleFullscreen();}
window.vidzb_cancelPrefsButton=function(){unwin.p_hidePrefs();}
window.vidzb_savePrefsButton=function(){unwin.needToSavePreferences=true;unwin.p_hidePrefs();unwin.checkSavePreferences();}
window.vidzb_saveGlobalPrefsButton=function(){isGlobalSave=true;unwin.needToSavePreferences=true;unwin.checkSavePreferences();}
window.vidzb_loadGlobalPrefsButton=function(){loadGloballySaved()}
window.vidzb_resetPrefsButton=function(){if(confirm('Are you sure you want to erase ALL of your custom preferences and restore VidzBigger Defaults?\\n\\nNOTE: to apply some settings you must also reload the page after pressing OK reset.')){unwin.setDefaultPreferences();unwin.forcevidzb_apply_selected_fixes();unwin.needToSavePreferences=true;unwin.p_hidePrefs();unwin.checkSavePreferences();}}
window.eventvidzbpreftoggleme=function(evt){unwin.vidzbpreftoggleme(vidzb_getEventTarget(evt));}
window.vidzb_clickPrefCheckbox=function(evt){
	var elem=vidzb_getEventTarget(evt);var pid=elem.id.replace('vbg_prefInput_','');
	if(pid=='snapfullscreenmode'&&!unwin.snapfullscreenmode&&!unwin.autoScrollPastHeader)unwin.autoScrollPastHeader=true;
	if(elem.checked){unwin[pid]=true}else{unwin[pid]=false};unwin.forcevidzb_apply_selected_fixes();
}
window.vidzb_clickSiteEnablePrefCheckbox=function(evt){
	var elem=vidzb_getEventTarget(evt);var pid=elem.id.replace('vbg_prefInput_','');
	if(elem.checked){unwin[pid]=true}else{unwin[pid]=false};unwin.forcevidzb_apply_selected_fixes();
	if(unwin.vidzbigSITEenabled){
		//make sure its NOT in the vidzbigSITESdisabled list
		vidzbigSITESdisabled=vidzbigSITESdisabled.replace(','+window.location.host,'');
	}else{
		//add it to the 
		vidzbigSITESdisabled+=','+window.location.host
	}
}
window.vidzb_clickPrefTextbox=function(evt){
	var elem=vidzb_getEventTarget(evt);var pid=elem.id.replace('vbg_prefInput_','');
	if(elem.value){unwin[pid]=elem.value}else{unwin[pid]=''};unwin.forcevidzb_apply_selected_fixes();
}
window.vidzb_clickPrefSelect=function(evt){
	var elem=vidzb_getEventTarget(evt);var pid=elem.id.replace('vbg_prefInput_','');var val=elem.value;
	if( new Number(val)>0 ) val=new Number(val);
	unwin[pid]=val;unwin.forcevidzb_apply_selected_fixes();
}
function createPendingEventObject(elID,tpe,func,bubl){var lobj={};lobj.eid=elID;lobj.etype=tpe;lobj.efunc=func;lobj.ebubl=bubl;return lobj;}
var VBlistenersToAdd=new Array();
unwin.p_vidzbShowPrefs=function(){
	if(unwin.prefsShowing) return true;
	unwin.prefsShowing=true;
	
	$g('vidzbigger_prefs_menu').removeEventListener("click",vidzb_showPrefs,true);
	$g('vidzbigger_prefs_menu').removeEventListener("mouseover",vidzb_MouseOverFlag,true);
	$g('vidzbigger_prefs_menu').removeEventListener("mouseout",vidzb_MouseOutFlag,true);
	if( _vt('vidzbigger_prefs_menu') ){
		$g('vidzbigger_prefs_menu').style.textAlign="left";
		$g('vidzbigger_prefs_menu').style.maxHeight="1024px";
		$g('vidzbigger_prefs_menu').style.width="auto";
	}	////questionable... ^ (but has a counterpart elswhere)
	VBlistenersToAdd=new Array();
	var prHTM="";
	var checkd='';	
	prHTM+='<div id="vidzBPrefsHolder" style="width:'+(unwin.colWidth-15)+'px;">';
	var myFloat='right';
	if(unwin.myvideoalignThisUpdate=="RIGHT"){
		myFloat="left";
	}else if(unwin.myvideoalignThisUpdate=="CENTER"){
		myFloat="right";
	}else if(unwin.myvideoalignThisUpdate=="LEFT"){
		myFloat="right";
	}
  var extraCmds='';
	if(unwin.allowPlayerClk||unwin.snapfullscreenmode){
  	extraCmds+='<input type="button" id="vb_xfs" value="Fullscreen" />';
  }
	prHTM+='<span style="float:'+myFloat+'">'+extraCmds+'<input type="button" id="vb_x1" value=" X " /><input id="vb_s1" type="button" onclick="" value="Save" /></span>';	
	prHTM+='<b style="position:relative;top:0px;"><big><img src="'+unwin.vidzb_vidzBiggerFlagImageFull()+'" align="top"/><span style="position:relative;top:3px;"> PREFERENCES</span></big></b><br/>';
	if(unwin.latestversion>vidz_Version){
		var updateAge=Math.round(new Number(unwin.latestversion)*1000-(vidz_Version*1000));
		var plurlal='s';
		if(updateAge==1) plurlal='';
		prHTM+='<div id="upgradeinfo"><br/><big><u><b style="color:red;">Your Version is Outdated</b></u></big>('+(updateAge)+" update"+plurlal+" old)<br/>"+unwin.upgradeMessage+'<br/><a style="font-weight:bold;font-size:14px;" href="'+unwin.latestversionurl+'" onclick="document.getElementById(\'upgradeinfo\').innerHTML=\'<br/><b><big>Thanks for Upgrading!  After installing the upgrade Refresh the page or cointinue browsing to use the new version!</big></b>\'">Click Here & Upgrade to VidzBigger '+unwin.latestversion+'</a><br/></div>';
	}else{
		//prHTM+="<i>Your Version is up to Date!</i><br/>";
	}
	prHTM+='<br style="height:6px;line-height:6px;" />';
	//DISSABLE
	
	var tname='vidzbigSITEenabled';
	if(unwin[tname])checkd=' checked';
	else checkd='';
	var disableThisSiteOnly='</label><label><input type="Checkbox" id="vbg_prefInput_'+tname+'" name="pref_'+tname+'" '+checkd+'/> Enable This Site</label>';
	VBlistenersToAdd.push(createPendingEventObject('vbg_prefInput_'+tname,'click',vidzb_clickSiteEnablePrefCheckbox,true));
	
	prHTM+=unwin.p_createPrefCheckbox('vidzbigenabled','Enable VidzBigger '+disableThisSiteOnly+' (on reload)','When something goes wrong,this checkbox allows you to dissble vidzbigger features without breaking update notifications.\\n\\nDefault Value: ON');
	
	if( unwin.siteID==3 || unwin.siteID==4 ){
		prHTM+=unwin.p_createPrefCheckbox('autoScrollPastHeader','Auto Scroll Past Header','Jumps the page down past the header on page load which makes the video area "as large as possible".\\n\\nDefault Value: ON');
		prHTM+=unwin.p_createPrefCheckbox('prefFlagPositionFixed','Fixed Preference Flag Position (more CPU)','A nice feature to save CPU (in absolute mode) on slower systems, by leaving the prefrence flag at scroll-top. \\n\\nDefault Value: absolute/OFF');
		prHTM+=unwin.p_createPrefCheckbox('enableAutoReload','Auto-reload on blank page','When the document fails to load and is blank this feature will detect that and reload the incessantly page after a short delay \\n\\nDefault Value: OFF');
	}else{
		if(unwin.vidzbigenabled && unwin.vidzbigSITEenabled){
			prHTM+=unwin.p_beginPrefSectn('layout','Instant Layout');

			prHTM+=unwin.p_createPrefCheckbox('columnViewMode','Enable Column Mode (on reload)','This enables the primary feature of VidzBigger, keeping the video on the screen at all times (and possibly filling the entire window).  This will almost always cause the player to be reloaded once until document-start is completed.\\n\\nDefault Value: ON');
			prHTM+=unwin.p_createPrefCheckbox('allowPlayerReload','Allow Player Reload','Several features require this in order to function.  JSAPI cannot listen for player state changes without this feature enabled.  Attempts to manually reload ore reset the player (or select different qualities) may also not work if this is unchecked.  This will serve as a method of disabling JSAPI and reducing the number of player reloads that can occur.\\n\\nDefault Value: ON');
			
			if(unwin.columnViewMode){
				//unwin.myvideoalign="RIGHT";//"LEFT"CENTER"RIGHT";
				VBlistenersToAdd.push(createPendingEventObject('vbg_prefInput_myvideoalign','change',vidzb_clickPrefSelect,true));
				prHTM+=unwin.p_beginPrefItemRow()+'Video Layout <select id="vbg_prefInput_myvideoalign">';
				if(unwin.myvideoalign=='RIGHT')checkd=' selected';
					else checkd='';
					prHTM+='<option value="RIGHT"'+checkd+'>Right &rarr;<br/>';
					if(unwin.myvideoalign=='CENTER')checkd=' selected';
					else checkd='';
					prHTM+='<option value="CENTER"'+checkd+'>Middle<br/>';
					if(unwin.myvideoalign=='LEFT')checkd=' selected';
					else checkd='';
					prHTM+='<option value="LEFT"'+checkd+'>Left &larr;<br/>';
				prHTM+="</select>";
				VBlistenersToAdd.push(createPendingEventObject('vbg_prefInput_mypreferednumcolumns','change',vidzb_clickPrefSelect,true));
				prHTM+=' with <select id="vbg_prefInput_mypreferednumcolumns">';
					if(unwin.mypreferednumcolumns==3)checkd=' selected';
					else checkd='';
					prHTM+='<option value="3"'+checkd+'>3<br/>';
					if(unwin.mypreferednumcolumns==2)checkd=' selected';
					else checkd='';
					prHTM+='<option value="2"'+checkd+'>2<br/>';
				prHTM+="</select>Columns "+unwin.p_getQuestionMarkImage('3 Columns requires ~1024 or greater window width.\\n\\nOtherwise it will default to 2 columns (Just scroll down to see the right column)\\n\\nI&rsquo;m not sure if anyone will use 2 column mode anyway,but if so perhaps you would like to see \\n  a) the option to position the comments below the info/video links or \\n  b) the option to have the setting middle-3 default to right-2 instead of left-2 when space runs out.  \\nLet me know which you like,if any or all.\\n\\nDefault Value: Middle,3 &rarr;uses up to 3 &rarr;If too thin for 3 &rarr;Left,2');
				prHTM+=unwin.p_endPrefItemRow();
				// end first row
				//MinVW
				VBlistenersToAdd.push(createPendingEventObject('vbg_prefInput_minimumVideoWidth','change',vidzb_clickPrefSelect,true));
				prHTM+=unwin.p_beginPrefItemRow()+' Min Video Width <select id="vbg_prefInput_minimumVideoWidth">';
					for(i in lOpMinVideoWidths){
						if(unwin.minimumVideoWidth==lOpMinVideoWidths[i])checkd=' selected';
						else checkd='';
						prHTM+='<option value="'+lOpMinVideoWidths[i]+'"'+checkd+'>'+lOpMinVideoWidths[i]+'<br/>';
					}
				prHTM+="</select>px [2 vs 3 col threshold]"+unwin.p_getQuestionMarkImage('When the video width drops below this value,the third column will be dropped in favor of a 2 column layout. \\n\\nMakes sure your video is at least as big if not bigger than before.  This is for knowing when to drop 3 and go to 2 columns.  Does not go to 1 column at thsi time,so sizes smaller than 800x600 should choose 128.  This is only a horozontal maximum,and is not vertically enforced.\\n\\nDefault Value: 480');
				prHTM+=unwin.p_endPrefItemRow();
				//MaxVW
				VBlistenersToAdd.push(createPendingEventObject('vbg_prefInput_maximumVideoWidth','change',vidzb_clickPrefSelect,true));
				prHTM+=unwin.p_beginPrefItemRow()+' Max Video Width <select id="vbg_prefInput_maximumVideoWidth">';
					for(i in lOpVideoWidths){
						if(unwin.maximumVideoWidth==lOpVideoWidths[i])checkd=' selected';
						else checkd='';
						prHTM+='<option value="'+lOpVideoWidths[i]+'"'+checkd+'>'+lOpVideoWidths[i]+'<br/>';
					}
				prHTM+="</select>px [Saves CPU]"+unwin.p_getQuestionMarkImage('Flash (video) does not always do well at high resolutions,and though you might say &ldquo;but fullscreen works perfectly smooth&rdquo;you would be right,but thats because full screen mode uses your video card to scale up the flash,so its still really only rendering at ~480 pixels wide which is the defalt maximum video width for non-fullscreen mode.\\n\\nVidzBigger bypasses all of that,and changes the dimensions of the flash plugin on the screen,which means that when the video reaches ~1024 width [or &gt;],your CPU has to scale a frame of video and render each of those pixels of video to the screen for each frame [which is a lot of work,one second of 1024 video is typically at least 18,874,368 pixels,not that every last one gets update every time,or so you might hope].\\n\\nIf you notice your CPU is all full up,you might have too much stuff going,or you should use this option to enforce a maximum.  If you don&rsquo;t belive this option works see what happens to your CPU when you drop the video from 1024 [that is,if the video is acutally 1024 wide] to 320.\\n\\n  VidzBigger really only does stuff when you first load the page,scroll,or resize the window,so most of the time the only thing processing is flash. \\n\\nDefault Value: 1024');
				prHTM+=unwin.p_endPrefItemRow();
				
				//VT and HZ black bars 
				prHTM+=unwin.p_beginPrefItemRow()+'Prevent extra black bars '
				if(unwin.preventVtBlackBars)checkd=' checked';
				else checkd='';
				prHTM+='<label><input type="Checkbox" onclick="if(this.checked){preventVtBlackBars=true}else{preventVtBlackBars=false};forcevidzb_apply_selected_fixes();" name="ap" '+checkd+'/>';
				prHTM+=' Above&Below</label> ';
				if(unwin.preventHzBlackBars)checkd=' checked';
				else checkd='';
				prHTM+='<label><input type="Checkbox" onclick="if(this.checked){preventHzBlackBars=true}else{preventHzBlackBars=false};forcevidzb_apply_selected_fixes();" name="ap" '+checkd+'/>';
				prHTM+=' Left&Right</label>';
				prHTM+=unwin.p_getQuestionMarkImage('This really only detects widescreen at this point for FMT22 movies since the ratio varied for some depending on the format, however this feature needs an update!  A new addtion will download an xml feed to detect widescreen videos automatically.  This feature DOES NOT work without access to UNSAFEWINDOW at this point, FireFox only feature, although detecting widescreen automatically now works in Chrome and Firefox.  If you uncheck both of these boxes,the video window will always fill to the maximum size,but the video itself remains the same dimensions,so you will have black bars.  It can be nice if you find that the video is changing size and frequently ends up under your m pointer preventings scroll whell control (flash plugin bug me that there is no parm to dissable flash scrolling...)\\n\\nDefault Value: ON & ON');
				prHTM+=unwin.p_endPrefItemRow();
			///THESE PREFS HAVE NO EFFECT IN CHROME AND DEPEND ON UNSAFE WINDOW TO FUNCTION!!!!		
				//POSITION AUTOMATICALLY ect
				prHTM+=unwin.p_createPrefCheckbox('defaultWideAspect','Use WideScreen Ratio First','The default 4:3 aspect ratio can be over-ridden with the widescreen ratio if you mostly watch WideScreen videos.  If you need to always have the correct aspect ratio verified and applied (on scroll) then you should enable the Lookup Correct Aspect Ratio feature.\\n\\nDefault Value: OFF');
				prHTM+=unwin.p_createPrefCheckbox('chkAspectRatioXml','Lookup Correct Aspect Ratio (xml)','Defaults to 4:3 aspect ratio unless the Use WideScreen Ratio First feature is enabled.  For detecting widescreen correctly and automatically enable this feature to download XML which will verify the correct ratio is selected.\\n\\nDefault Value: ON');
	
				//prHTM+=unwin.p_createPrefCheckbox('positionPersistently','Position Persistently','This setting forces an update each time the scroll event is fired, leading to more realistic display but also more updates fire which can contribute to scroll lag!\\n\\nDefault Value: OFF');
				prHTM+=unwin.p_createPrefCheckbox('positionVideoAutomatically','Position & Scale video automatically [more jumpy]','Window 1024x768 or smaller should probably check this,1280x1024 should not.  For larger screen sizes consider your window aspect ratio-Widescreen generally performs better with this option ON.\\n\\nTrivia:  When this option is off,search box and window title remained in fixed position for ease of use specifically to make use of the extra space at 1280 or larger 4:3 (b0x) aspect.  This is the reason turning this option off performs so poorly at 800 and 1024,since the title takes up so much space (and the video really ought to be up-sized to fill the space as the user scrolls down and more space becomes available,which is precisely what this option does)!\\n\\nDefault Value: ON');
				//prHTM+=unwin.p_createPrefCheckbox('centerVideoVertically','Center Video Vertically Automatically','Only valid if Position Automatically is ON.\\n\\nThis will attempt to center the video in vertical space.  DOES NOT apply when window scroll is near page TOP or BOTTOM,but when scrolling is centered.  Perhaps center vartically when scroll is centered would be more apt title.\\n\\nDoes not apply if the video is already being crushed vertically (ie: video must be at full width,with no black borders on left and right side).  If there is extra space below the video,the video will jump down to a centered position.  The idea behind this is that your mousewheel cannot scroll the window unless its over whitespace,so we distribute the whitespace around the video so that its easier to access for your scrolling pleasure.  Also you may notice this &ldquo;feature&rdquo;when Scale Video at Page Bottom is on.  Any feedback welcome.\\n\\nYou may also note,this option is rendered non-effective by unchecking Prevent Extra Black Bars Above/Below.\\n\\nDefault Value: ON',1);
				prHTM+=unwin.p_createPrefCheckbox('scaleVideoAtPageBottom','Allow Position & Scale at page Footer','When you get to the bottom of the page,there is this pesky thing that happens where the video covers up the search box and whatever other legal nonsense and potentially useful links exist at the bottom of the page!  I don&rsquo;t necessarly endorce ignoring legal stuff so by default the video will shrink so you can see all that.\\n\\nDefault Value: ON');
				prHTM+=unwin.p_createPrefCheckbox('columnPriorityComments','Comment column First (toggle column order)','In 2 column mode this setting determines if the comment column will be added first or second\\n\\nIn 3 column mode this determines if the comments are on the left or the right.\\n\\nDefault Value: OFF');
				prHTM+=unwin.p_createPrefCheckbox('columnScrollIndependent','Scroll columns independent of page (experimental)','Also hides the footer \\n\\nBe aware that checking Auto Scroll Past Header causes the page to get tripple scroll bars but larger video and column size in 2 col mode. \\n\\nDefault Value: OFF');
				prHTM+=unwin.p_createPrefCheckbox('autoScrollPastHeader','Auto Scroll Past Header (bigger video on load)','Jumps the page down past the header on page load which makes the video area as large as possible.\\n\\nThis is a nice option for 2 column mode. \\n\\nDefault Value: ON');
				prHTM+=unwin.p_createPrefCheckbox('snapfullscreenmode','Auto Snap Fullscreen at Scroll Max','Scroll the scroll bar to the marker and gain full window mode, scroll again to leave fullscreen and continue reading comments. \\n\\nDefault Value: ON',(unwin.snapfullscreenmode&&unwin.autoScrollPastHeader)?1:0);
				if(unwin.snapfullscreenmode){
					prHTM+=unwin.p_createPrefCheckbox('aspheadersnapfull','Snap fullscreen at past header point','When auto scrolled past header auto snap fullscreen as well, or any time you reach that point',2);
					//prHTM+='Drag this <a href="javascript:yt.www.watch.player.enableWideScreen();void(0);">ToggleFullscreen</a> bookmarklet to your toolbar, if it breaks in the future delete it.  It will probably stop working soon.';
				}
			}
			prHTM+='</div>';//end layout hider div
			
			
//			prHTM+=unwin.p_beginPrefSectn('display','Elements');
//			
//			z='Dissable Elements';
//			prHTM+='<input type="text" value="'+z+'" onmouseover="if(this.value==\''+z+'\')this.select();"/>';
//			z='Add Feed to Page';
//			prHTM+='<input type="text" value="'+z+'" onmouseover="if(this.value==\''+z+'\')this.select();"/>';
//			
//			
//			prHTM+='</div>';//end layout hider div
			
			prHTM+=unwin.p_beginPrefSectn('display','Display');
			//ColWidth
			VBlistenersToAdd.push(createPendingEventObject('vbg_prefInput_colWidth','change',vidzb_clickPrefSelect,true));
			prHTM+=unwin.p_beginPrefItemRow()+'Column Width <select id="vbg_prefInput_colWidth">';
				for(i in lOpColWidth){
					if(unwin.colWidth==lOpColWidth[i])checkd=' selected';
					else checkd='';
					prHTM+='<option value="'+lOpColWidth[i]+'"'+checkd+'>'+lOpColWidth[i]+'<br/>';
				}
			prHTM+="</select>px (On Reload)"+unwin.p_getQuestionMarkImage('Especially cool if you scroll content to a huge size on a high density display or protjector, widescreen ratio display.  You must reload the page to get the real effect of this unfortunately.  Perhaps I can make this more agressive if you require. \\n\\nDefault Value: 360');
			prHTM+=unwin.p_endPrefItemRow();

			checkd='';
			if(unwin.precompMainFun&&compitot>0)checkd=' saved '+Math.floor((compisav/compitot)*100)+ '%';
			prHTM+=unwin.p_createPrefCheckbox('precompMainFun','Precompile Main Functions (on load)'+checkd,'When the page loads or when you press save, the major functions that get called during scrolling will be &quot;pre-compiled&quot; according to the true false preferences you have selected.  This will improve performance of those functions significantly while also limiting their content and speeding their execution.  To re-enable features the function need to be compiled again which should occur after preferenes are saved, only then will new features that you had checked function properly if this feature is enabled, meaning you will have to save more frequently to get solid previews of the changes you make, however the performance will be improved.  If you are just enabling this feature you will have to reload the page. \\n\\nDefault Value: ON');
			
			prHTM+=unwin.p_createPrefCheckbox('usefixedposition','Use \'Fixed\' Position ['+(detectn?'NOT ':'')+'Recommended]','WARNING: will cause video to reload in FireFox when you change the positioning mode.  This setting makes it less laggy when your processor is doing stuff.  It is broken in the current version of Chrome but is default in Firefox!  To use it in Chrome you need to resize the window to get the element to the right spot.  This is a hack solution, so instead the feature is dissabled until the browser is fixed.  IF your using an HTML5 video player then this feature probably makes sense. \\n\\nDefault Value: ON or OFF(chrome)');
			if(detectn&&unwin.usefixedposition)prHTM+=unwin.p_createPrefCheckbox('usefixedpositionproof','Prove Bug (you must close preferences and then scroll)','This will put a red box on the embed element.  You will see the embed elements red box is rendered where its suppose to be.  You have to resize the window to make the video position itself correctly however.  Oddly if prefrences are open the video positions correctly (because the timer is updated via innerText or innerHTML onscroll, not exactly a solution)',1);
			
			prHTM+=unwin.p_createPrefCheckbox('prefFlagPositionFixed','Fixed Preference Flag Position (more CPU)','A nice feature to save CPU (in absolute mode) on slower systems, by leaving the prefrence flag at scroll-top\\n\\nEnabling this feature keeps the preference flag on the screen at all times! \\n\\nDefault Value: absolute/OFF');
			prHTM+=unwin.p_createPrefCheckbox('enableAutoReload','Auto-reload on white failure','When the document fails to load and is blank this feature will detect that and reload the incessantly page after a short delay.  The delay will increase with each retry. \\n\\nDefault Value: OFF');

			prHTM+=unwin.p_createPrefCheckbox('enableChannelBrowser','Enable on User Channel Pages','This lets you keep the video on the screen while you read channel comments as well! \\n\\nDefault Value: ON');
			prHTM+=unwin.p_createPrefCheckbox('enableTopVidzBrowser','Enable Top Vidz, Accounts and Mini-Browser','This allows you to load TopVidz or other webpages /within this frame/. \\n\\nDefault Value: ON');
			prHTM+=unwin.p_createPrefCheckbox('enablePlayNext','Enable Play Next [&gt;]','This allows you to queue one video to play next after the current video. \\n\\nDefault Value: ON');
			
	
			/*
			VBlistenersToAdd.push(createPendingEventObject('vbg_prefInput_vbmaxdisplayquality','change',vidzb_clickPrefSelect,true));
			prHTM+=unwin.p_beginPrefItemRow()+'Maximum Quality <select id="vbg_prefInput_vbmaxdisplayquality">';
				for(i in lOpDisplayQualities){
					if(unwin.vbmaxdisplayquality==i)checkd=' selected';
					else checkd='';
					prHTM+='<option value="'+i+'"'+checkd+'>'+lOpDisplayQualities[i].q+' (fmt'+lOpDisplayQualities[i].v+')<br/>';
				}
			prHTM+="</select> (On Load)"+unwin.p_getQuestionMarkImage('Lets you define a maximum quality!  This is especially helpful if you are on crappy internet that is tuned to be just so slow that HD does not buffer in time. \\n\\nDefault Value: HD');
			prHTM+=unwin.p_endPrefItemRow();
			*/		
			
		  if(unwin.siteID == 1)
			prHTM+=unwin.p_createPrefCheckbox('alwaysShowModControlsUnderVideo','Always show extra controls under video (if installed)','There are many other user scripts besides this one that work great on youtube.  Many of these place extra controls underneath the video.  Normally these are only accessable when you scroll all the way down, however if this box is checked, they will stay on screen all the time under the video.  Controls that load before VidzBigger show initially, while the rest will show after you move the scroll bar.  Check the box at any tiem to toggle.  To add your controls here just append a new DIV position relative to the watch-player-div (or video positioner) (whatever that container is identified by).\\n\\nDefault Value: OFF');
			
		  prHTM+=unwin.p_createPrefCheckbox('delayVidzBiggerInit','Delay Load for Extra Mod-Support','Other mods such as YouTraceX will work if they have enough time to finish loading first. \\n\\nDefault Value: OFF',1);
			  
			if(unwin.siteID == 1)
			prHTM+=unwin.p_createPrefCheckbox('enabledownload','Enable Yousable Download Links','This option enables the ez download links, enable at your own risk.\\n\\nDefault Value: OFF');
			
			//AUOTCLICK PREFS 
			prHTM+=unwin.p_createPrefCheckbox('autoExpandVideoDescriptions','Auto-Expand Video Description (on load)','So many people post stupid comments answered by the description.  Showing the full description by default reduces the chance of this and gives useful details about the movie,making it easier to spot blatant advertising (and avoid it this one hopes).\\n\\nDefault Value: ON');
			//prefer_png24bits
			prHTM+=unwin.p_createPrefCheckbox('prefer_png24bits','Use 24 Bit PNG Images','If this is checked 24 bit PNG with transparncy will be used.\\n\\nOtherwise 8 bit PNG with a 1 bit mask will be used. \\n\\nThe preference flag and any other embeded images will have nicer rounder corners and smoother fades in 24 bit mode at minimal processing expense.  This option is for people who would notice small visual things like this,otherwise the max performance setting is the default.\\n\\nDefault Value: OFF (8 bit)');
			//invert scheme
			prHTM+=unwin.p_createPrefCheckbox('invertColorScheme','Dim Background/Invert Color Scheme (on reload)','Inverts the color scheme dimming the youtube background.\\n\\nDebating the option of including a color chooser for text and background color,let me know if your interested.  Also dimming other elements with transparency or removing them completely is a possibility. \\n\\nCAUTION: beware of firebug inspecting base 64 encoded PNG images after they have been replaced in this step may crash scripts\\n\\nDefault Value: OFF');
			prHTM+=unwin.p_createPrefCheckbox('invertPrefColorScheme','Invert Preferences Color Scheme','Makes preferences more reader-friendly Default: OFF');
			//biggerComments
			var thtm='Show </label>';
			VBlistenersToAdd.push(createPendingEventObject('vbg_prefInput_maximumCommentCount','change',vidzb_clickPrefSelect,true));
			thtm+='<select id="vbg_prefInput_maximumCommentCount">';
				for(i in lOpCommentCounts){
					if(unwin.maximumCommentCount==lOpCommentCounts[i])checkd=' selected';
					else checkd='';
					thtm+='<option value="'+lOpCommentCounts[i]+'"'+checkd+'>'+lOpCommentCounts[i]+'<br/>';
				}
			thtm+='</select><label> comments per page (on reload)</label>';
			
			prHTM+=unwin.p_createPrefCheckbox('biggerComments',thtm,'Another Feature Thanks to YousableTubeFix\\n\\n500 comments are loaded per page (They are then reversed and the first so many you specify are displayed.  Too many IS SLOW on most compuers).\\n\\nThis can be a little slow on some systems,or generate bugs in 2 column mode. \\n\\nDefault Value: OFF');
	
			//AUTOPLAy and QUALITY settings
			prHTM+=unwin.p_createPrefCheckbox('useHighQuality','Link to HQ/HD Videos, or use <a href="http://www.youtube.com/account#playback/quality" target="_blank">Account Settings</a>','When a youtube page loads,this feature updates all links so that when u click them,you will get the HQ video.  Does not work if you click before the page fully loads,but you can probably watch your links in the status bar as you hover,if it says fmt=18 at the end you are set for HQ.\\n\\nAlso sends an XMLhttp request which checks for fmt=22 which is the latest widescreen HD format.  The second checkbox allows you to enable or disable indicators.\\n\\nSince the whole idea of making Vids Bigger would be to have a closer to widescreen HD expereince,it only makes sense to maximize the video quality by default.  WARNING: does not make much sense at 1024 or 800 pixel width!  Fortunately this is relatively trivial unless you are charged by the megabyte (although I could auto check your window width and turn this on or off automatically if you like,so send feedback if anythings not working for you!). \\n\\nDefault Value: ON');
			if( unwin.useHighQuality ){
				prHTM+=unwin.p_createPrefCheckbox('indicateHDQuality','Indicate <span style="background-color:red;font-weight:bold;">&nbsp;HD&nbsp;</span> when available','If we already are linking to the highest quality videos, also tag HD videos with an HD flag.  Youtube seems to be doing this on their own, but for now this feature has more widespread results.  \\n\\nDefault Value: ON',1);
			}
			prHTM+=unwin.p_createPrefCheckbox('LoadHighQuality','Else load HD as soon as detected on page load','Not necessarily useful unless the above is turned off.  As soon as an HD/Q (FMT22,FMT35,FMT18) version is detected it is swtiched on support for FMT18 also... basically teh highest avaialable format detected will load.  Dissable the above features and save bandwidth with this...  \\n\\nDefault Value: ON');
	
			if(unwin.siteID == 1){
				prHTM+=unwin.p_createPrefCheckbox('animateVidThumbnails','Animate Video Thumbnails (on hover)','Animates the 3 video thumbnails.  Does not load them unitl you mouse over.  The rate is ~1.5 seconds but can vary if your internet is slow.  If you want an option to simply preload all thumbs or to modify the rate, just ask!  \\n\\nDefault Value: ON');
				if(unwin.animateVidThumbnails)prHTM+=unwin.p_createPrefCheckbox('alwaysAnimateVidThumbnails','Always Animate All Video Thumbnails (slow)','Animates the icons even if your mouse is not over them.  The rate is the same but there is a 1+(0.2*n) second delay before this starts happening but it probably still happens for all images at close to the same time which may over trafic your intertubes.  \\n\\nDefault Value: OFF',1);
					if(unwin.alwaysAnimateVidThumbnails)prHTM+=unwin.p_createPrefCheckbox('alwaysAnimateVidThumbnails1LOOP','Use Single Interval (slower?)','Unchecking this looks cooler, using the multi interval, but its more system intensive theoretically.  Using one interval they all flip at the same time.  Thinking about limiting the number they can flip each time to 22.  \\n\\nDefault Value: ON',2);
				prHTM+=unwin.p_createPrefCheckbox('flipVideo','Link to Fliped Videos (on links, after reload)','April Fools!\\n\\nDefault Value:D OFF');
				prHTM+=unwin.p_createPrefCheckbox('dissableAnnotations','Disable Annotations (on reload)','Disables annotations (and the annotations editor).\\n\\nNot default because sometimes annotations contain traces of useful or pertinent information.  Or some hyperlink youtube maze game...\\n\\nDefault Value: OFF');
				if(!unwin.enable_jsapi)prHTM+=unwin.p_createPrefCheckbox('useNonFlashPlayer','Use Non-Flash Player [not-finished!] (QT or VLC ect)','Attempt to use the non-flash player if available.  JSAPI must be dissabled before this option will show up since JSAPI only works with the flash player.  Depending on the format you will either get Quicktime or VLC (if you have the browser plugin installed) I know these featues need improvement, but at least they are pulbic now!  This is mostly for my parents old computer which cannot handle the flash player.  Still have to add the controller for VLC somehow (without breaking other media players) \\n\\nDefault Value: OFF');
			}
			/*
			if(unwin.reBrandYouTube)checkd=' checked';
			else checkd='';
			prHTM+=unwin.p_beginPrefItemRow()+'<input type="Checkbox" onclick="if(this.checked){reBrandYouTube=true}else{reBrandYouTube=false};forcevidzb_apply_selected_fixes();" name="ap" '+checkd+'/>';
			prHTM+='Re-Brand YouTube (on reload)';
			prHTM+=unwin.p_getQuestionMarkImage('Cover the YouTube logo with the VidzBigger logo!  Rock out!\\n\\nDefault Value: OFF');
			prHTM+=unwin.p_endPrefItemRow();
			*/
			//AUTO SKIP
			prHTM+=unwin.p_createPrefCheckbox('autoConfirmAdultVideos','Skip Adult Confirmation (when logged in)','Extra button you have to press after logging in to say you are old enough to watch adult content.  Check the box to skip this extra annoying step.\\n\\nDefault Value: OFF');
			prHTM+='</div>';//end display hider div
			if( unwin.siteID == 1 ){
				prHTM+=unwin.p_beginPrefSectn('qualities','Qualities');
				for( z in lOpDisplayQualities ){
					prHTM+=unwin.p_createPrefCheckbox('l0pQualz'+lOpDisplayQualities[z].v,'Auto-Enable Format '+lOpDisplayQualities[z].q+' '+lOpDisplayQualities[z].v,'Allows dissable of a particular video quality.\\n\\nDefault Value: ON (idk');
				}
				prHTM+='</div>';//end qualities hider div
				//jsapi
				if( unwin.allowUnsafeWindow ){
					var jsamsg=unwin.jsapimessage;
					if( jsamsg.length < 1 ){
						if( unwin.enable_jsapi )jsamsg='<span style="color:orange;">status unknown...</span>';
						else jsamsg='off';
					}
					prHTM+=unwin.p_beginPrefSectn('JSAPI','YouTube JSAPI <span id="jsapimsg" style="font-size:12px;position;relative;top:-2px;">('+jsamsg+')</span>');
					var selHTM=''
					if(unwin.enable_jsapi){
						VBlistenersToAdd.push(createPendingEventObject('vbg_prefInput_jsapiRetries','change',vidzb_clickPrefSelect,true));
						selHTM+=' up to <select id="vbg_prefInput_jsapiRetries">';
						for(var x=0; x<=12; x++ ){
							if(unwin.jsapiRetries==x)checkd=' selected';
							else checkd='';
							selHTM+='<option value="'+x+'"'+checkd+'>'+x+'<br/>';
						}
						selHTM+="</select> retry";
					}
					prHTM+=unwin.p_createPrefCheckbox('allowPlayerReload','Allow Player Reload','Several features require this in order to function.  JSAPI cannot listen for player state changes without this feature enabled.  Attempts to manually reload ore reset the player (or select different qualities) may also not work if this is unchecked.  This will serve as a method of disabling JSAPI and reducing the number of player reloads that can occur.\\n\\nDefault Value: ON');
					prHTM+=unwin.p_createPrefCheckbox('enable_jsapi','Enable Youtube JSAPI (on load)</label>'+selHTM,'The JSAPI is required for certain YouTube features such as Toggling the Annotations Editor to work properly,so this is enabled by default.  Also possible to access VidzLoops features when this is enabled.');
					if(unwin.enable_jsapi){
						//autoplay
						prHTM+=unwin.p_createPrefCheckbox('donotautoplayVideos','Prevent Video Autoplay','Great for the office (or on a slow connection where you need to preload)!  Videos will not play automatically when this box is checked,allowing you to check your volume.  Possible future options might include,auto mute video,if requested.\\n\\nIf the JSAPI fails to pause the video,other JSAPI calls on the page will also fail (such as timecode jump and dissable annotations)\\n\\nDefault Value: OFF');
						if(unwin.donotautoplayVideos)prHTM+=unwin.p_createPrefCheckbox('donotautobuffer','Prevent Video Auto-Buffer (more reliable)','Great for the office (actually)!  \\n\\nDefault Value: OFF',1);
						//Allow Player to be Clicked
						prHTM+=unwin.p_createPrefCheckbox('allowPlayerClk','Scroll When Mouse Over Video (on reload, cpu itensive)','Lets you double-click the player to go fullscreen(youtube) and scroll the window when mouse is over player (requires youtube jsapi).\\n\\nSets the WMODE of the Flash Player element to transparent which means that flash will run more slowly and is rendered as an interactive page element. \\n\\nInadvertently allows you to scroll the page much easier (even if mouse is over video)\\n\\n Trivally You Tube totally stole my initPauseClickFullscreenDoubleclick( funtion, ..\\n\\nDefault Value: OFF');
						prHTM+=unwin.p_beginPrefItemRow();
						prHTM+='Flash Vars:';
						prHTM+='<input style="width:200px;" type="text" value="'+unwin.extraflashvars+'" id="vbg_prefInput_extraflashvars" />';
						VBlistenersToAdd.push(createPendingEventObject('vbg_prefInput_extraflashvars','change',vidzb_clickPrefTextbox,true));
						prHTM+=unwin.p_getQuestionMarkImage('Extra Flash Vars for the Player to Customize it Further.\\n\\n color1:border color\\n color2:bottom color \\n\\n Modifies ONCHANGE so do NOT change it unless you know what you are doing (reload player using the yousable pulldown to see new variables), if you mess up use UNDO (ctrl z) before your cursor leaves the field in your web browser or reset preferences!')+unwin.p_endPrefItemRow();
					}
					prHTM+='</div>';//end jsapi div
				}
				if( unwin.allowUnsafeWindow && unwin.enable_jsapi ){//youtube looper
					prHTM+=unwin.p_beginPrefSectn('vidzLoops','VidzLoops');
						prHTM+='<span style="font-size:12px;">';
						prHTM+=' <a title="Grab Loop Start from Current Time" href="javascript:void(0);" id="loop_a">Start</a>: <input type="text" size="4" id="vbstartseconds" Value="'+unwin.vidzbLoopTimerStart+'" />';
						prHTM+=' <a title="Grab Loop End from Current Time" href="javascript:void(0);" id="loop_b">End</a>: <input type="text" size="4" id="vbendseconds" Value="'+unwin.vidzbLoopTimerEnd+'" />';
						prHTM+=' <input type="button" id="loop_go" Value="go" />';
						prHTM+=' <input type="button" id="loop_clear" Value="clear" /><br/>';
						prHTM+=' <a title="First Click: Start Time, Second Click: End Time and Begin Loop, Third Click: Stop Loop.  Use while video is playing." href="javascript:void(0);" id="loop_ab">'+unwin.p_vidzbWebLoopButtonText()+'</a>';
						prHTM+=' | <a title="Save & Share Loop at VidzLoop.com" href="'+shareLoopsVidzLoops()+'" onclick="vidzPausePlayer();" target="_blank">Share Loop</a>';
						prHTM+=' | <a title="Save & Share Loop at VidzLoop.com and leave this instance playing" href="'+shareLoopsVidzLoops()+'" target="_blank">Duplicate</a></span>';
						prHTM+=unwin.p_createPrefCheckbox('autoLoopOnComplete','Auto Loop Videos at End (beta)','The JSAPI is required for this feature to work.  When the video state changes to STOPPED the player is automatically reset to timecode zero and playing should resume.\\n\\nDefault Value: OFF\\n\\n VidzLoopz Instructions: To submit loops all you have to do is specify start and end seconds.  Click start while the player is at the start time and end when the player is at the end time, or just click the a-b-reset button two times while the video is playing to make a short loop.  Once your loop looks good, click Share Loop.  You will be able to fine tune your loop on the next page, name and describe it, and click save.  The newly saved loop can be linked to anyone in the world. \\n\\nDefault Value: ON');
						if(unwin.autoLoopOnComplete) prHTM+=unwin.p_createPrefCheckbox('autoLoopDelay','Delay End Looping','Adds a 1.5 second delay after the video is complete before it loops.  \\n\\nDefault Value: OFF',1);
					prHTM+='</div>';//end looper
					
					window.vb_vidzbLoopButtonClicked=function(evt){unwin.vidzbLoopButtonClicked();unwin.p_refreshPrefs();}
					window.vb_vidzbLoopAButtonClicked=function(evt){document.getElementById('vbstartseconds').value=vbGetCurrentPosition();}
					window.vb_vidzbLoopBButtonClicked=function(evt){document.getElementById('vbendseconds').value=vbGetCurrentPosition();}
					window.vb_vidzbLoopGoClicked=function(evt){vbResetLoopTimersFromFields();unwin.p_refreshPrefs();}
					window.vb_vidzbLoopClClicked=function(evt){resetVdizLoops();unwin.p_refreshPrefs();}
					
					VBlistenersToAdd.push(createPendingEventObject('loop_ab','click',vb_vidzbLoopButtonClicked,true));
					VBlistenersToAdd.push(createPendingEventObject('loop_a','click',vb_vidzbLoopAButtonClicked,true));
					VBlistenersToAdd.push(createPendingEventObject('loop_b','click',vb_vidzbLoopBButtonClicked,true));
					VBlistenersToAdd.push(createPendingEventObject('loop_go','click',vb_vidzbLoopGoClicked,true));
					VBlistenersToAdd.push(createPendingEventObject('loop_clear','click',vb_vidzbLoopClClicked,true));
				}
			}
			//ADVERTISING PREFS
			prHTM+=unwin.p_beginPrefSectn('Advr','Advertising');
			prHTM+=unwin.p_createPrefCheckbox('vidzb_blockPlayerAds','Disable in-video Ads (on reload)','Removes ads that show up in the flash player on youtube.  For other sites please request!  \\n\\nDefault Value: ON');
			prHTM+=unwin.p_createPrefCheckbox('vidzb_blockAds','Disable or Replace Normal Ads (on reload)','Removes annoying (often hideously slow flash based) YouTube ads, replacing them with a link to VidzBigger.com... or if the [allow replace with vidzbigger ads] setting is checked, my ads show instead of the flash ads or regular BOX ads.  My ads will be less annoying and more simple than youtube ads. [donate to remove these for your IP...]\\n\\nDefault Value: ON');
			if( unwin.vidzb_blockAds) prHTM+=unwin.p_createPrefCheckbox('vidzb_allowMyObnoxiousAds','Replace Normal Ads with VidzBigger Ads','Removes annoying YouTube ads,replacing them with VidzBigger.com ads which will serve to pay for all the time that went into this project and promote future development... [donate to remove these for your IP...]\\n\\nDefault Value: ON');
			prHTM+='</div>';//end ads div
		}//end enabled
		
		//PLUGZ
		if(!unwin.shareVideoViewStatistics){
			prHTM+=unwin.p_beginPrefSectn('me','Support');
			prHTM+="Do you like VidzBigger?  Me too!  I can't live without it.  If you want to share your love of VidzBigger there are a number of ways you can help!<br/>";
			prHTM+='&bull; Rate VidzBigger <a target="_blank" href="'+(detectn?'https://chrome.google.com/extensions/detail/mlmmmmbpbfgcklcjoipilgnmemaclcld':'http://userscripts.org/scripts/show/41691')+'">5 Stars</a><br>';
			if(!detectn)
			{prHTM+='&bull; Vote for VidzBigger as <a target="_blank" href="http://userscripts.org/groups/8/scripts">the best YouTube Plugin</a><br>';
			prHTM+='&bull; Request or Submit new sites with the <a target="_blank" href="http://userscripts.org/scripts/show/52309">Site Submission Tool</a><br>';
			}prHTM+='&bull; Submit or Vote on Ideas or in <a target="_blank" href="http://www.vidzbigger.com/index.php?v=contact">Feedback Forum</a><br>';
			prHTM+='&bull; Checkmark Share View Statistics under Privacy to participate in the community<br>';
			prHTM+='&bull; <a target="_blank" href="http://www.vidzbigger.com/advertise.php">Run an Advertisement</a> in VidzBigger<br>';                                           
			prHTM+='&bull; if you\'re 100% satisfied with this trial, <a target="_blank" href="http://www.vidzbigger.com/index.php?v=download">Buy VidzBigger</a> and I\'ll even disable my ads for you server side without breaking the VersionCheck<br>';
			prHTM+='</div>';//end plugz
		}
		if(unwin.enableTopVidzBrowser){
			prHTM+=unwin.p_beginPrefSectn('topvidz','Top Vidz '+unwin.userLoggedInStatus);
			if(typeof(window.vb_bigged) == 'undefined' ){
				window.vb_bigged=function(evt){if(evt.preventDefault) evt.preventDefault();evt.returnValue=false;return unwin.vb_loadWebpage(versioncheckurl.qreplace('version.php','bigger.php'))}
				window.vb_loadWebpageEvent=function(evt){if(evt.preventDefault) evt.preventDefault();evt.returnValue=false;var sre=vidzb_getEventTarget(evt);if(sre.value!='My Vidz'){return unwin.vb_loadWebpage('http://www.vidzbigger.com/videoSimpleList.php?page='+_vt('tvb_page').value)}else{return unwin.vb_loadWebpage('http://www.vidzbigger.com/videoSimpleList.php?userhits=true&page='+_vt('tvb_page').value)};}
				window.vb_loadWebpageEvent2=function(evt){if(evt.preventDefault) evt.preventDefault();evt.returnValue=false;return unwin.vb_loadWebpage();}
				window.vb_login=function(evt){return unwin.vb_loadWebpage('http://www.vidzbigger.com/blog/wp-login.php');}
				unwin.vb_loadWebpage=function(pURL){
					pURL=(typeof(pURL)!='undefined'?pURL:_vt('tvb_page1').value);
					if(pURL.indexOf('http://')>-1)pURL=pURL.replace('http://','');
					_vt('tv_brsr').src='http://'+pURL;
					_vt('tv_brsr').height=300;
					unwin.vidzb_last_url=_vt('tv_brsr').src;
					return false;
				}
				unwin.vb_graburl=function(pURL){
					_vt('tv_brsr').contentWindow.location.href !=''?_vt('tvb_page1').value=_vt('tv_brsr').contentWindow.location.href :null;
					_vt('tvb_page1').select();
					return false;
				}
			}
			//return vb_loadWebpage(\'http://www.vidzbigger.com/videoSimpleList.php?page=\'+_vt(\'tvb_page\').value);
			
			VBlistenersToAdd.push(createPendingEventObject('vb_BiggedEvent','click',vb_bigged,true));
			VBlistenersToAdd.push(createPendingEventObject('load_top_vid_form','click',vb_loadWebpageEvent,true));
			VBlistenersToAdd.push(createPendingEventObject('load_top_vid_form1b','click',vb_loadWebpageEvent,true));
			VBlistenersToAdd.push(createPendingEventObject('load_top_vid_form2','submit',vb_loadWebpageEvent2,true));
			VBlistenersToAdd.push(createPendingEventObject('doLogin','click',vb_login,true));
			
			prHTM+='<form>Page:<input type="text" size="2" value="1" id="tvb_page" /><input type="button" id="load_top_vid_form" value="Top Vidz" /><input id="load_top_vid_form1b" type="button" value="My Vidz" />';
			prHTM+='<input type="button" id="vb_BiggedEvent" value="Big" title="Click button to have Bigged curent video" /></form><iframe id="tv_brsr" style="overflow:scroll" src="'+unwin.vidzb_last_url+'" width="100%" height="'+(unwin.vidzb_last_url==''?'0':"300")+'">';
				prHTM+='</iframe><form  id="load_top_vid_form2">';
			prHTM+='Load URL:<input type="text" size="20" value="'+(unwin.vidzb_last_url==''?'http://':unwin.vidzb_last_url)+'" id="tvb_page1" /><input type="submit" value="Go" /><input id="doLogin" type="button" value="Login" />';
			prHTM+='</form>';//<input type="button" onclick="vb_graburl()" value="a" />
			prHTM+='</div>';//end  div
		}
		
	}//site ID check
	
	//PRIVACY
	prHTM+=unwin.p_beginPrefSectn('Priva','Privacy');
	if(!detectn)prHTM+=unwin.p_createPrefCheckbox('allowUnsafeWindow','Enable UnsafeWindow (on Reload)','Some features simply will not work with unsafeWindow dissabled.  If you trust the site you are on (youtube.com) for example, then enabling unsafeWindow should be rather safe indeed.  Many features that interact with the player need unsafeWindow to function');
	prHTM+=unwin.p_createPrefCheckbox('shareVideoViewStatistics','Share view statistics','When a video gets popular in the VidzBigger community (10+ unique hits from around the world), it shows up on a list of top videos.  Only the title of the video, and the video URL are transmitted (http).  vidzbigger.com/videos');
	//prHTM+=unwin.p_createPrefCheckbox('valtsave','Alternative Prefs Save Mechanism (on reload)','I had a report of someone not being able to save preferences, possibly due to their FF install version, or GM version, or some combination.  If you insist on saving preferences under these conditions try this feature which will write prefs to a site cookie (WARNING: this feature causes all preferences to on a per-site basis, meaning you must reconfigure each site), this feature is always on when no other storage is available).  TO get the latest versions please visit the vidzbigger.com/downloads now!');
	prHTM+='<span style="margin:10px;font-size:10px;">All features are supported as much as possible for the latest versions of everything.  It\'s your responsibility to keep software upgraded unless updates are automatic.  If automatic updates disable VidzBigger you must re-enable it under Script or Extension Management.  If it matters I can delete any period of hit history for a particular IP address and time range.  I hope people donate and support continued development and completion of hit management and sharing/publishing features, no personal data about you will be made public unless you create an account with a public profile or link your VidzBigger account with another service.  Your privacy is protected in incognito mode regardless of this setting.</span>';
	prHTM+='</div>';//end privacy div

	prHTM+='<br style="height:3px;line-height:3px;" />';
	prHTM+='Last update took: <span id="lastTimer">'+unwin.lastTimer+'</span> seconds [on Scroll or Resize]';

	var binfo='';
	binfo+='clientHeight=>'+document.body.clientHeight+':::';
	binfo+='clientWidth=>'+document.body.clientWidth+':::';
	binfo+='vidz_Version=>'+vidz_Version+':::';	
	binfo+='lastTimer=>'+unwin.lastTimer+':::';	
	binfo+='vuseragent=>'+navigator.userAgent+':::';
	binfo+='vvideourl=>'+window.location+':::';
  binfo+=unwin.preferencesToString();
	binfo+=':::';
	binfo+=':::';
	binfo+=':::';
	binfo+='Your Greasemonkey Version=>'+'?????  '+':::';
	prHTM+='<br/><b><a href="http://www.vidzbigger.com/contact.php?BugReportInfo=1&browserinfo='+urlEncode(binfo)+'" target="_blank">Report Bug/Question/Comment</a> &bull; <a target="_blank" href="http://www.vidzbigger.com/index.php?v=projects&RD=vb_preferences_myProjects">Projects</a> &bull; <a target="_blank" href="http://www.vidzbigger.com/index.php?v=donate">Donate</a></b><br/>';
	
	var sites={'YouTube':'http://www.youtube.com',
	//'Google':'http://video.google.com',
	'Metacafe':'http://www.metacafe.com',
	//'DailyMotion':'http://www.dailymotion.com',
	'Hulu':'http://www.hulu.com',
	'Vimeo':'http://vimeo.com',
	'Escapist':'http://www.escapistmagazine.com'
	};
	
	for( i in sites ){
		prHTM+='<a href="'+sites[i]+'"><img src="'+sites[i]+'/favicon.ico" width="16" height="16" title="'+i+'" /></a> ';//
	}
	//http://www.youtube.com/my_speed
	
	prHTM+='<input type="button" id="madbtn" value="Reset Player" />';
	VBlistenersToAdd.push(createPendingEventObject('madbtn','click',function(){reloadPlayer(true)},true));
	
	//prHTM+='<input type="button" value="Save" />';
	prHTM+='<br/><br/><div style="float:right;margin-right:0px;position:relative;top:-4px;text-align:right;">';
	prHTM+='<a target="_blank" href="http://www.vidzbigger.com?RD=vb_preferences">VidzBigger.com</a>&nbsp;';
	prHTM+=' &bull; <a target="_blank" href="http://www.vidzbigger.com/videos?RD=vb_preferences_topvidz">Top videos</a>';
	prHTM+='<br/>Your version:<a target="_blank" href="http://www.vidzbigger.com/versioninfo.php?v='+vidz_Version+'">'+vidz_Version+'</a>&nbsp;</div>';
	prHTM+='<input type="button" id="vb_x2" value="  X " />';	
	prHTM+='<input type="button" id="vb_s2" value=" OK-Save" />';	
	prHTM+='<input type="button" id="vb_rst" value="Reset" />';	
	prHTM+='</div>';
//	if(detectn){
//		prHTM+='<input type="button" id="vb_sG" value="Save Globally" />';
//		prHTM+='<input type="button" id="vb_lG" value="Load Globally" />';
//	}
	//if($g('vidzbigger_prefs_menu').innerHTML.qreplace('checked','') == prHTM.qreplace('checked','') )return;//meph
	$g('vidzbigger_prefs_menu').innerHTML=prHTM;
	
	//THSE COULD BE DONE IN THE LOOP BELOW, BUT STILL WOULD HAVE ONE LINE EACH ELSEWHERE, SO THIS IS SIMPLER
	$g('vb_x1').addEventListener("click",vidzb_cancelPrefsButton,true);
	$g('vb_x2').addEventListener("click",vidzb_cancelPrefsButton,true);
	$g('vb_s1').addEventListener("click",vidzb_savePrefsButton,true);
	$g('vb_s2').addEventListener("click",vidzb_savePrefsButton,true);
	$g('vb_rst').addEventListener("click",vidzb_resetPrefsButton,true);
	if(_vt('vb_sG'))$g('vb_sG').addEventListener("click",vidzb_saveGlobalPrefsButton,true);
	if(_vt('vb_lG'))$g('vb_lG').addEventListener("click",vidzb_loadGlobalPrefsButton,true);
	if(_vt('vb_xfs'))$g('vb_xfs').addEventListener("click",vidzb_cancelFulscButton,true);

	for( var zi in VBlistenersToAdd ){
		$g(VBlistenersToAdd[zi].eid).addEventListener(VBlistenersToAdd[zi].etype,VBlistenersToAdd[zi].efunc,VBlistenersToAdd[zi].bubl);
	}
	for( zi in unwin.visvidzbpPrefItems ){
		if( unwin.visvidzbpPrefItems[zi] != false && _vt(unwin.visvidzbpPrefItems[zi]) ){
			unwin.vidzbpreftoggleme($g(unwin.visvidzbpPrefItems[zi]));
		}else{
			
		}
	}	
	unwin.p_updatePrefwinHeight();
}

unwin.p_vidzbWebLoopButtonText=function(){
	var aval=unwin.vidzbLoopTimerStart;//document.getElementById('vbstartseconds').value;
	var bval=unwin.vidzbLoopTimerEnd;//document.getElementById('vbendseconds').value;
	var ostr='Loop ';
	if( aval > 0 ) ostr+='A:'+aval+' / ';
	if( bval > 0 && aval > 0 ){
		ostr+='B:'+bval+' / ';
		ostr+='[Reset]';
	}else if(aval==0){
		ostr+='[A:-- ] / ';
		ostr+='B:| Reset';
	}else{
		ostr+='[B:-- ] / ';
		ostr+=' Reset';
	}
	return ostr;
}

unwin.visvidzbpPrefItems=[];
unwin.vidzbpreftoggleme=function(who){
	var idstr=who.id;
	pice=idstr.split('_');
	if(pice[1]=='tog'){
		if( _vt(pice[0]+'_viv').style.display=='block' ){
			pice[1]='shw';
			_vt(pice[0]+'_shw').style.display='none';
			//_vt(pice[0]+'_hid').style.display='inline';
		}else{
			pice[1]='hid';
			_vt(pice[0]+'_hid').style.display='none';
			//_vt(pice[0]+'_shw').style.display='inline';
		}
	}else{
		who.style.display='none';
	}
	if( pice[1]=='hid'){
		_vt(pice[0]+'_viv').style.display='block';
		unwin.visvidzbpPrefItems[pice[0]+'_hid']=pice[0]+'_hid';
		_vt(pice[0]+'_shw').style.display='inline';
	}else{
		_vt(pice[0]+'_viv').style.display='none';
		unwin.visvidzbpPrefItems[pice[0]+'_hid']=false;
		_vt(pice[0]+'_hid').style.display='inline';
	}
}

unwin.p_vidzColapzed=function(){if(unwin.prefer_png24bits)return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAd5JREFUeNqM0jtIHEEYB/BvZ+6xmhwiJ2hIQMTgCT6KGJJYSUwIFiKkSe0LH0UiWAgSgpVVCgvTKKSJTQikEfEsNKYNBCQqCAkEE7HxcaKnd7d7uzP+v2UW5AjBD36zy+z3zew8LK01ISTUQBtUwg78gix4VBooknAbRmEz73h46GXoh7sQ5YGv4uYm9HBB+runGRf+zeg8+qYgVVoozK9VFFy/hWeeWZf0ekVQziXbKfpv0NULjVAOnB80efhhx+Rc3R1J9bd82v5p0asFovVNkiicwPeXZr03wjUxG9qUUh8KjqfepS/0s7c6wO/8u56v0shp4HzL7B6HDSkYxejDuxlJ89805bOKyhKChh5alKqmx/j+VZiCcG0uHMWjslBb6dN0lwo+cqGJGDcRk5yEe9ANzx3Xt/+cSFrdyGGWsiCbB0HqaVhUDV0wUvTU/d/HwlrdcGhxuzzYsJ7mHA10xpUQ1ho69sOiDpjAlqfef3Ho01I2GLmpPU5jTyXVJe2dWESMo2sLDsOiB6UFk31V1NlqHUipZ6UQH9G1B064sEg4JceL7gQNPomfI3EhIq05dO2a+6dK714zTOJ8cq7nf8b7I0iaO0n/wucUNbuXgDPIQJH+E1cP99pxKcAAgzkmQ9381EAAAAAASUVORK5CYII='; else return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAMAAAD6fQULAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF////9/n8lLf12Oj/Rov/t8z8crH+aaT8+Pr8Pmvo+Pn8+/z+/v7//P3++vv94+///v7++vz9/f7++vr9/f3+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzk+D6AAAABZ0Uk5T////////////////////////////AAHSwOQAAABmSURBVHjaVI5bDoMwEAPtfYYgtQXE/a8KRAmF+drRypaxn2DvnAdAPMydXwyjW2i5f5pmXtALflXMhGuvQ9HI0FEOMrMbUFUieBnw0Zabm1GmKXVpiSa+jS0UKf+dqK/VD952CDAAxtsLfrazaSkAAAAASUVORK5CYII=';}
unwin.p_vidzXpandD=function(){if(unwin.prefer_png24bits)return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhhJREFUeNqc0s9rE0EUB/A3k002JjXWpiWWpKVKaqtiQUREtFULCl4KQm8K6U0QxIMoeOpfoBdPXi0qlF6jWAS1RSo5RCQ9VU0hWH+lv4jZzXY3M8/vhkU8FAsOfA6Z7Htv5r0RzEz/WAZEIARugI0dArrgEHTAF/gMm4RKHbAXoiD8yoEEjGmtXzeVqm15eg6/r0DazzYOAhZhqZWJSEMnXLBcGlmqsCj/5OHjWdGTSYqbxFpbWisXGd8hywT0B9UvQmmhzDz+QPH9vGLWTRd7Z41i2Yt9qCg6lTVO7u8OZU1DPEXhWVQ5jTsPvl/26Lsdoa59mixPrsUjtGFU60zP3jZoelbT5eFoMnep7RopOm8a1F6zlfFxhclDz4ZSkuoOVxG0Kc8Mhss3xmK0utqkx3mLZuatsOWoI6iSJhmiFduk3j1oX0RRajc9wQnWZdyUt0eGzNLUZIoP90fp4bxJjxZC9BVJGprJQktO9LrUnRS/SIgXCLL97r3BHW4NZPjO3Vzi3HRBGPmiplhY01pDUl9C0bEDmqQQM8GstB+0AQUETva0c+76KOc6w475ydlFpWWmJI52MGP6z+Yl1FpjDwbpDzUGR9HXe15T/ShUFD9fVFysMFfr+hVGMoD/pf+9+Ovt+QM2IY29UWS6iju4tium4ibNYf8bbLU+3ObBhqEN4uAFR3L8Q/3JvsMr33ZJ+o/1W4ABAFNZIJvqesvtAAAAAElFTkSuQmCC';else return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAMAAAD6fQULAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF/////v7+///+9fr+4e7+/P39+/z/nr727PP+8ff+4uv9/v797fP8e7f+S5b/zdr8PYT78fX7VIPt6PX9zdz5+/z9a6T8j7r/u9L31+P+SHjr9fn9NGTnPmro0eT/N4P/RIj9wdH3+P7/jrX9/v/+/f7/o839aI/w8Pf+n731VZL/zuL/i7j///78//7+Vpj/irD55ev6q8T8+fv9hrb81+L6+vz+8/j+pMH0lr35uND4mb/4+fz/t9T9PIn/x97/TpX9mbXzcaL4YaT9/v39VJP9yuL94+r8////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANpxtdwAAAEl0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////AAwIn1UAAACDSURBVHjaYvBABgwoLDiPkdUMxIPwGcz5jbg8GPS4GcE8e1dlXQ8GEXZTYyYPBiZLOzVmDwYrISlHJRsGQSd5OQ4PBmlFGVkLHiZOfS13kClMkuoC4obCfAasYBtUWHQUrE3EJBgh9jEya/I6OLPAbGcSdbPV1kC4xYURzZ2EeAABBgCkLSw6KXC9KAAAAABJRU5ErkJggg==';}
unwin.p_getQuestionMarkImageData=function(){return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAQCAMAAAAYoR5yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEVQTFRF////2dnZ/v7+3Nzc2tra/f398/Pz4+Pj6urq4ODg8vLy/Pz8+vr629vb+fn53t7e+/v74eHh9PT0+Pj45ubm6enp////7ZKi7QAAABd0Uk5T/////////////////////////////wDmQOZeAAAAZElEQVR42mSMWQ6AQAhDW2ZzH1fuf1Q7Rr8spLwUAhwpl5ITXFUpVUiZMQRyF26zzFjkXQd3xB5wM5HxEkpAiPYgbObRnimLXNpUr5yepToFvOjjmvxNl96+g4H4o03n2PAWYADdiAaTb28wwQAAAABJRU5ErkJggg==';}
unwin.p_getQuestionMarkImage=function(altTip){return '<a href="javascript:void(0);" style="position:absolute;right:5px;top:4px;"><img border="0" align="bottom" onclick="alert(\''+altTip+'\');" src="'+unwin.p_getQuestionMarkImageData()+'" style="cursor:help;" alt="?"></a>';}
unwin.vidzb_vidzBiggerInvertedTemplateImage=function(){return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAArwCAMAAADFCMTWAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ8UExURQAAABcXF0pKShgYGDExMRkZGRoaGkhJSUpIOEpEJTs7Ozk8RDAwMD8/PxYWFkZGRko/CERGSUREREhISEpHMUBESUJCQkpHND9DSUpFKEJFSUpJP0pGLkZHSTw8PENDQxsbGy8vL0NGST1CSUBAQEFBQUdISd4sLEpGKz9CRkpAD0FDR0o/DEJER0pINzs+RDtASEpCG0pCGEpBEi4uLkpEIUpBFUpIO0pDHj5ARklJSTk+RyUlJd1GRs51dQgICGZmZhAQEOksLNddXSwsLBoeJCIiIjMzMz4+PkpHNysrKyoqKkpFKzw/RUVFRT1ARSkpKTc8RUNFSD09PRUVFUdHR30wMHV1dVRUVOc0NBoWFqG02kxMTGJ5rbKysl0yMtVTU3U6Ois5ANTU1NWWlqczM11dXZ4/PyQZGQIBAfX19bpdXVk+PldXVyUWFos8PWFhYUAnJy93K4tLSzaPK1kqKallKS9LY0FKWXNWOEJXdkhlk/8zMw4JCRsmL/5NTRYQENU2Nk5/qsM4ODJplQgHBzQ7TBMaCUBaADF1q1iHFTwgIP1iYu1oaE5yuE2WRThcMk52AJOp6ahIS7K+0Px2dW2RyM1ISc+8vDQfIL+CgiItICtHDw0KChENBTgrKwMEAi94ySVFIw0QDaioqAoLDAoIAf2HhlZAKhwYBStgp/6oqPuWlkx8f5d5dwQFBYWFhaamphkcGVB4VP+7uwkHB+QsUBcoGBYTAp87T2ovOkQuC3RzhR8bEwICAQYGBhMTEywaHjY0LqKiomlkUJGuyKOjo9Y2NkCAuhcXFc6HlvPExPjR0QoJCJNvtyQjIgMDAukuGtpbdAAAAA47L1UAAADUdFJOU/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8Ag4CCPQAAIIhJREFUeNrs3Y1jG3d9x/HvYBuwjfH8tDHpjiczxjY2BnuSLF1c7/n5QVISIdvEkvNU2XFivNl1E8dpumLaBJrFSdO0JFlYKOsT0EKhHQw2xtjz/A/t97s7SacHu5Wrk+/bvD9xpfNPqv173e/h7idZkshLTN1koWAz0hm/tLBu7xHcd3OIeYm1H+mVu+46efLkZz7zmb/18xmbkydXkghYH9kCYAk+4O//4R++9KWvfvXf/+NLJ9eTB1gZ2RowcrKD8NWTyQNUR0b2ZrOTQbIRgfn2rrAfGUFI+PuTwwXM5fOOrWU+n98KYKo60fzmYARgb7trpIPwpbuGCyhVKrbmTqVS3AZwue27KCDoSlHCkAFSqVRMRYyjvM0UtC0gHM0NwsmV4QKKlYrnX243h1bNRG+no/bDQBQQTEiWcLI+XEDZ3/eVrQELrep2HMTaAQ3CyYUhz0K297uVSsmvrdsNKLQDZmZmRkbWZmbWAsDq7OyqJez515mJ2X+1hJOFIQNs75mrVJxgM9jI+w0SjO8OgL/bzZi47G/OhMNiTzBPzZihMHSA6UNOJaywnw5AdTtAo5PNNoa46UfVYR/ITB+qVOZEMrYz1SqVWjtgpAeg7o9te5S2Y9tYDok84w9z05tGhg8wMZ2/5s9H/gGhGAKKLwYYGVkQOdS2OTJ0QCnsN41aV/oCFPzLyObwAd6BAwdsTYsHDuREzDf+ptjNfgB7987uEsDWudQFyEmuP0DrQL0bgBwAKTQXnAkDVPcEsXUMrvbssYBws+Bf+hdhqgkDFF4yoGqOC+YeBQUAeyTuBgSbuweoHTjghnOnD6gFgIW9QSwguPIvLvuXa3vNIv5UuGkPZOYeC0MHHD582AKcw4cPFA8cPpw2lsOHK0VTbAH1FmA2uPITAORUsHkw3Jww96jvFkBslU3N7cHZbuQDwOV2wFV7T3NxrGUxxavhpr3jqaEDisVwPVw7cPhAsLavHDan1cVirVEpk0OHDq2ZqzXTT9amDh2a8ktWL4fCNdsGl1d9adIeVsn2mcQB1vqr/1riAAf7A1xN3mOjE5N9ZCKJj04f23ip1d84mMiH183Ec8xkdsZmY6wjfunMhL1HUp8fGEAc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';}
unwin.vidzb_vidzBiggerFlagImage=function(){
	if(unwin.prefer_png24bits)return 'data:image/png;base64,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';
	else return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAATCAMAAAAZBIXaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADAUExURY239tHR0VNxz5iYmAAAAMbZ+DJp7bW1tXp6etTj+i1VyygoKP///2ZmZkZGRlRUVBgYGJzD8muO6mSq+Tg4OFyZ9ery/abF+mmn6lek+WyG1bfM+xdI01qd5j938kuG9qi46LfS++bm5vLy8g0NDUyW+leY2+Ls+2q0+yla4fT4/qrP9z5k1AUFBZep33y580Fhw7rG6/j4+EiJ5Xyj9g09y/D1/l980YCX3/j7/jt/6oSi5xtDwFOS71OR4wAAAJcwnMcAAABAdFJOU////////////////////////////////////////////////////////////////////////////////////wDCe7FEAAACg0lEQVR42pyT23KjMAyGcagBxz+YFHBIaSAHEnIi55LSNu37v9UKmNmZ3fZm978wwtIny0IYD/8vo11zKf3yofSlzH8KymXohU3ED6x0GHP8MjSZ7f0A58o+48zMv30NmzsbnkBJUyfClt/ZkPEkSbhm4XfWt4ssq0yFJEvgeFJ6ynVVmFOtZLjKxNVK0/QKJ/Q8vyylchw39Mv2XLN+Swtm11FWAXPTnIM0c6Vi6JRZ02maFjOGuSOV3bn99r4OojcBiGwIMZwCU4PEYTMxIGMgqiwDrpmAHiQwz9Xwfjc4C1vWhXHhgBFp8IhYYxFEiwUZfGhEb5Eu7hGqe1SBfw4AHV8ucTydd6zC9nOLYkyO7YiSBCNd80VQzWrU47uAWATDIKLK+Cd53y+HAlVtdjWHZ07cNC6AQVBgE6zQJKAWYNsk5KPRaBE03jElWi4rMGaGZfd9WTGOq9jAHKuVhl4ZqLEKNFDEhw0VE2yFMTrUMMYFtssBdQJM5S3r2zoeT2NxZsRSz1ZbYLNabVAfAgE6nM4sRpQrjjUGS46Z3tIktGzpwHpeP8K0hUUdTaxhszxSb60rqPDUolLXltaWRdddT8ibJrPQ+Ooa/fjyfKpdJtavwH49RJFaHMl6R3VjY603+pVyi/UNmPR3ApOdYLJjFV4/ehtT1af+Ho39tNtNoHsv/afXdy76L7ddQ5z6lFn3Pvq3/lHYvvHVwOHs1JtAefPJ7QQ8HY+3PX2RU+9IunHeazaozafb5GyeC/If93DLjvUdKs3xpUkPuxtD5jj4Q7bbBkl31r6a8oFYokvfc7spdz3pOTTqSuZ+Y5CU+r3RBOWh22zSn96y7dn/rl8CDADmg09j+0sTWwAAAABJRU5ErkJggg==';
}
unwin.vidzb_vidzBiggerFlagImageFull=function(){
	if(unwin.prefer_png24bits)return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAATCAYAAADs6jFsAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAx8SURBVHja7Fh5bFTHGf+9vdfrE3xjxza2wdj44igUAQlXAgkUiCi4VSMaQaVEIBIUGhUlEBGiJFWqqqQJKEIoUNoGUoWScDcOKTfGhMM2GHwb38a7Xu+uvbtv973pN/N8gdNWSqmUPzLS6L05v2+++X3XSAAYfiiPpBge7tDpdAgPD0diYiKMRiPa2tpgt9uhKAoMBgOio6MRGxuLvr4+tLa2iu+jLKGhoUhKShJ0OL1gMAin04n29nbx5e3vc2EDlQTJsrKy2LZt21h5eTm7fv06e/nll1l8fDwjwbLCwkL2wQcfsOrqavb555+zhQsXspCQEDZ8j/+lhoWFseXLl7Pi4mLm9XoZL/xbWVnJdu7cyRYsWMAiIiIeGb3/Qx1qECrY5s2bWZ+fsStVCjt1TREHWrZsGUtNTWW7d+9mdjejfpWVNzJ27NgxNm7cuEfGzJQpU1hZWVk/bZWqRou37W6V3b59m82YMeN7K8wH1NxisSAvLw9tDhXbP/WLvqmZFsyfP1+o39q1a3GkVMWerySsmQcsefppXLhwAZcuXUJ9fb2Yn5aWhoSEBJhMJtHmZoCPEZqFmvJ9MjIyROX/A8Xj8WDmzJnIzc3FG3+VceQbCVazEToEIQcUzJkIvLt6AubNmwdZlgUNvobv29HRIczTmDFjMHHiRGRmZgr6nZ2dqKqqwt27d4Wp4n0pKSliDueTl6amJtAliT3i4uLEWtIQMcbpcDPX0tIieOVrHh4boB8IBDACmR9++CHz+lU2Z6uLTX/Vyerag+zGjRvsyJEj1M/YL973s2feCTCHhw0Wl8vFdu3aJSr/f7jU1tayDRs2sPz8fLZy5UpWWlrK/lNZuL2X5b3iY1+WMVZcprDCTR72xBYXa3UorKGhQaB3gO5rr73GSDhs6dKlgseHC9latm7dOmG+Vq1axc6cOTNiDoGBbdmyhZ04cWLEGKdx4MABdvHixRFjbrebvf7664xs/EhkchTdu3cPFpOEx2JV1HUG0eNVUZCfDxIEbjQq6JEVPPeEHlE24E4bUFLHEB8eihdeeEHscapcRXW7iqAqQWUSTERhatpY7NixA3RYjB8/Hn3mdOw960Nvn4KgwmguQ0SIHlPSjUiNNRBXDGPiJczPFS4Rs3N1qLgXREePgoLUFLQ7Fez9uhfxUSa89dZbAk1FRUXwKib8rUTBoasqFKJdmKLHjMw4bN26FQUFBUKz2nuAj88x4hOQJGBRHpCfPA1vvjld8L/vvIruXgkGPRBCyjUm0ga6BDG296wMh1uFTmKijks0Yfv27QL9hw8fftCbq6qK+/fvi//CdAltniDcPoVaRk1QFT6Ehap4Itsi2l29xNQdoGiqNLjHjRbgq7vAuDiJLgKifl2r4nmau2TJEjGntD4IPVGWSSGuN/lR0xFAVqIZS6Za4PIyGK3AqDBtzx5qN7sVJMWRCYnVi77qdhknKvqwIDeEWmasXr0aHS4Vbx/zoapDgtEgITVajxYPXRQkEX1wQZYTb+99yWD3kEmjIz02CihrU1GYqhP7drgY/kG8d/epeCpHB6OZ+AhH/5hK5/fC7g4iP8WAskYfLtfpUZgWhRUrVoCQOzI0cjgc4ptCjIdYg7D3aaFIkyOIqi6ZbJcZceHaQZtdXM4MMYKg1lflBCIiJLyxGAgnmV9uBH53muHvFSpmj9NB9thRmBxJaLXAH2RYu8+H2Ggd1j1po311uEYI1JkZDBaGP5UyXKyVqS1h09M2Qq+uP34jaiaGrDFD7O8+70Wdk2FWthHP/ciE5EgJLh+Jun8K///4Kl0OYWPlNGB5riT4u+/RISZU4z2gkq7SeaaPk/DS3AGAaF+ZNEg1KPhxlh7blkZgy6EAyggItZ0BzJo1CxTxQPewMLu6uuDz+UiFdDBZGdo9gX7E+WEyq1iYYx6c6yLqZqtKQuhv+/khgegoiRjUDvJ4OhBDbVmnwu1nAvlnz54V878gpCs6hqWTrZicojksMtcCmXa6w+O1QAshM5YQZDUPob+qKwATCcJm1foq2wOopD5Od/1sTZDcKbbUV8LVrWnapSa+F2lMImlSoQSbURFoaqq6DrKVYk4LIZNfUnjoyPjR3qvCYFIQ3X9WmQXIYSvEl+Y8uUPiwlSGL+IesKKiAslRBphpYmWnHz0+FV9V9yIjTo+kSL1YLA7hUEgVVKEywiPLgN6sQ+poLanigT4vVhKOyazZqAkTJmDu3Lmop7Vf1vjINhuxotA2SL+VVNNq1eFnhXpsmi1hZoYenYSqP1/zCSSLS5PpYCTc2DBN7e90BQk1wOxMA6FNAsWpsNlsglZMTIyYU0YyNRAPi7O1S6Y4WYxNmjQJixYt0jyxxMQ+l9sYXjrJ8McSFf5+6fgUssMS+RB/kExFJxq6fRifaER2ghmnTp1Cc3OzEGb7w2peU1MDs1FHGYiOVDmI87V9RAh4JicEFETj1q1b/WpByNQzJPbbNzvdvJ4YSgzXDq3X6+GW+W2RgMiphfWjizO497rM0y38fJKN+nU4ffq0ZiNlJhxgQYIOUwhFSyfoiQ9NyHayZbzUdQepT09CkfqFS2gmXrP7bSolFxiTkYsvqhiq7Nq52ihRo0gLmaO0NZQAQB2VgS/uqmhwavzWdpN50UvITyDnRTUlktZoW6KaLoyf91pzH76u9kBH/RvmxAgeOLJ52MeFeXu4MCkUQF1dHaJtelRfJKN70I9f/9YBf72ErFgTDh48KCBd26rgMhn8phJ5cG1LYxAlR72wOIfAfv5mEGcOeSFXBwaF+fuDXnz2iQ8pXgPyEowoKSkZRPH+v/hQekKGQdYOGCQhlhyRcaNYhoWgzb3p5VMB3DpDKmfTrNS9W9R3VEZNlbbH6NGj8U2lgl37ZDQ0aH3XTvlx7jMfHHbtQni8eOW6go/2k6np02hdPhfEzZMyVqZJ+GU+8JPxQ1bwynkfyosDKEqPRM05BbfPUPzrY6CwT6CSO28++/RwYXJB8Zybl4IUBuZ1wUcCfnaGWRyYYkShHl5fEKzPibwk/+Da6sY++F3d0DNNwK1dCnZ80oUwyYVfPaVd8bkbXuw/eh82uPHiEi0qmDZtmkAKxbHwdLtojx4kjibBkQfdf7wbSq8Tk1Nl8vA6dPcE6fAepMcMXWJ6HAnI78HuQ3ZU1Gn9bWQbXA7aJ0oT3rSxPsguB97/tBu1LZpTLa9yo9fpQlS/jbx5y4mAx0lapI6wmTdvO2CTejEjx4LnnwwRPFwucyE9PV0E+wMPHXuobuWmbWBhd3e3+MZHBhFh9CA7KQyzCkOxb99eEe3z7OV0qQvMbydPbhwk2NHphJ3GDxzzoPiCAZUNProxYOOKOEydYCHhkL3Z24Cmez0YE23Cto8CiAzVIzLMiJmFERgVYYCPvH3n/SDWvBlEXVMf3L0BCrOMeKUoXrugTtJX2YmM+CG6C6eH4HBxKy6VO7Dq1S5MzrbhTr0PVouOBBMuQrvnnjTh4tVWnPynDyXXDMjPtKGi1kvOUU/hT7zgrdfZhc62AN7e46c+AxJGG/DiSj4WgNdtRwipdBJp58w8Kz456sbJ8614du5o5OTkCDPFhcnd3btUtw0w19jYKF5ppmZb8fgkI4oWxZDX0gmjTVE/ent74XD2IjeNYXzyUHji7HYii5Dq7LZTUB+Cn86NwOwp0ZiYoaVgVyscsOo9yE8LkG0KorKqj8ymhPhoC2YWhNCeQWQnBxFp9YtLy0mxYHJOBJbNTURirIZir9ePfIqB8zPMIoXbuXOnSBj+sCkV7+ypQUW1C03NHkRRElC0KBHpSRYcPXoUixcvxq7NSdh5oB6VdW40t3qQQSZm0axYDUA9fkx4TCYv78PdGj/0pLNZadwxxouxnFRKZBI0vKUnU/Qx3oiMRD0cPTI5arN44RooXAcPDaSVFOSK16LhZSBtGjt2LHvvvfceGDt+/Pi/TQ15qrZx40ZGmQr7roWngOvXr2eUbYzgiaeSFLQzyrG/dS1/nOGPI2vWrGGUY3/rHJ6iftdy5coVNmfOHEbCZMIjUJ8WnkoSV/ffkBe2crvIU7Dk5GSR6FM+POJBgQeqPP3kjwV8XnZ2tjDs/M2ROzK+7s6dO2Kchyp8v4E5wwtH+4Cd5u+ow/fgxr2yslJ8+WPDt/EUEhIiVI3zxPnmKBl4YOFhHtc0/sgxfA4/Bw/xOP/8wYK/n3LzNZy34XzxLIrH37zNH4T42fl6vj9/SOFzHxBmv0B5YLaC6uNUM/hDENVRP7yj//fyLwEGAP36IYFoESW/AAAAAElFTkSuQmCC';
	else return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAAATCAMAAADbNMFeAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADAUExURf///0hpzszMzNXi+gAAAHp6ejZq7C9Xz8fb+peXl7Ozs2VlZSoqKkdHR1in+ZjE9lVVVW2Q7liZ/BoaGury/aHF+mSq+WmF2Dg4OIa7+qm77Fua7RlHzrXU/JC3+OHh4UyV+Wir67jN/EyG90B49OHs/A0NDWiz/PHx8Shb5XCm+XG2/Zmt56nP+vj6/AUFBY697lad4oCX3H2z7D9hybvH61t4z/D2/g8+zHmt6YOk9k+S5UKE65Om4YKc6AAAALWbhD8AAABAdFJOU////////////////////////////////////////////////////////////////////////////////////wDCe7FEAAADO0lEQVR42qxUa3OiSBQ90gGap0QaRImCKAgmNvEFTkwm//9f7W3MbtXszIeZqrlV2qf7nj73pY2Hv28YvivXDduHNnTd6lekyk28RDH+QNPVNU0PW9fKbO8XolVgS8jM8qrf16x0yQsEoSUKZrs/cxKNF0XBhZb8vmZol+u1sAIU6wK6F4Ze4DhBUlHNBJzAwpux2Wx20BPPC9vW9XTdScKW3LoeuKFiBZ6bDAt1aMjTkptNqdlysu6B2rJqkGWOG2i429pYLIiSaah1N7B/cGv6sK/tYVfr4b2fOtJ3BrB1BBYtgMWSjMPOWERgzPr1GtgRRYwLWLKPJpMZzywIAhFdJJa6psjUw3bQdLB858AyFeATcs7y3SRXgEfL9D0VZT5Bn6c9+G0MiF2e73bkZUTa7SjSJF9GHCJ93xHZDgfNAPvbHmVKF/Y+iccTIXke9zWNO71xsDyO4gklxFPynvJZiV6if86jHgIo/Zkqu0xP+HbjWTJoJpIfxlisSmAcEz/eEiX2qcXYpxFJ+b6fD96UgaVxD02rsfCfpdSIw/2x0mTpK74dWObef59aeVj1q1fUeN4KiO0MEttYpbA69Sr5PZv5M4lXEt77EYZ5zHzVcgwhn8cS/HB6PZykVQ2aoS1Wh8WKSQ1bSpFt90C/3faQsxWDjYiSL32KsVqJoTt1vyiH8HVJYB/P9tTe/eFwOwh497m3Ooxr8whLYwZNuDCo3oL2eGveQMVtDCq5MYQwDHU2J++mwKahDs83DI/kJnts5k1TZu4DPu+Dn16fLtLJWPMdeKFb5cbgpGtQ/ZBNI8UjxWDmlFQakpjTh06UnoDRlEpzZJbfzbnK8/M++OPTSFqBvJgfINxNz+c5xOhqTo8fnJnXzjRHDBfzSD+l7snszDNlflZgBGFep8cXWs5EmEJv8alEk+zSUQSvnncXgASnH1TOpTufz6OOc1q7j1IdzKUlS/KPXqjNjED3Akbu0ZSWI8ruKP7VDHXKXQ9dixb7/nfUdB0/mOYMJNfJhq2VfIHsfzRPaZJqG3rO/XVwPPVC6E7gVqECZEHw34EiVYmjDt3qCyTeF8tx1NtDT8+gOeT69+wfAQYAa8hivtefKOEAAAAASUVORK5CYII=';
}
window.vidzb_MouseOverFlag=function(){document.getElementById('vidzbfLagimg').src=unwin.vidzb_vidzBiggerFlagImageFull();document.getElementById('vidzbfLagmsg').innerHTML=''+unwin.defaultOverFlagMs+'';}
window.vidzb_MouseOutFlag=function(){document.getElementById('vidzbfLagimg').src=unwin.vidzb_vidzBiggerFlagImage();document.getElementById('vidzbfLagmsg').innerHTML=''+unwin.defaultFlagMs+'';}
window.vidzb_showPrefs=function(elvent){unwin.finVidzBToggleFullscreen(false);unwin.p_vidzbShowPrefs();}
unwin.p_hidePrefs=function(first){
	//var clickEvents='onclick="p_vidzbShowPrefs();" onmouseover="document.getElementById(\'vidzbfLagimg\').src=vidzb_vidzBiggerFlagImageFull();document.getElementById(\'vidzbfLagmsg\').innerHTML=\''+unwin.defaultOverFlagMs+'\';" onmouseout="document.getElementById(\'vidzbfLagimg\').src=vidzb_vidzBiggerFlagImage();document.getElementById(\'vidzbfLagmsg\').innerHTML=\''+unwin.defaultFlagMs+'\';"';
	var clickEvents='';
	var vdzbflagimg='<a href="javascript:void(0)"'+clickEvents+'><img align="top" style="position:relative;" id="vidzbfLagimg" src="'+unwin.vidzb_vidzBiggerFlagImage()+'" width="59" height="19" border="0" /></a>';
	if( _vt('vidzbigger_prefs_menu') ){
				
		vdzbflagimg='<div style="display:inline;position:relative;max-height:19px;height:19px;float:right;background-color:black;padding-top:0px;padding-bottom:0px;"><span id="vidz_message" style="position:relative;top:3px;color:#FF4444;font-weight:bold;"></span><span style="text-decoration:none;color:white;padding-right:0px;cursor:pointer;position:relative;top:3px;" id="vidzbfLagmsg">'+unwin.defaultFlagMs+'</span></div>'+vdzbflagimg;
		$g('vidzbigger_prefs_menu').innerHTML=vdzbflagimg;
		$g('vidzbigger_prefs_menu').style.textAlign="right";
		$g('vidzbigger_prefs_menu').style.maxHeight="19px";
		//$g('vidzbigger_prefs_menu').style.width=unwin.colWidth+"px";//chrome compatability
		//nPDiv.setAttribute('style','position:fixed;overflow:auto;right:0px;top:0px;padding:0px;z-index:10000;font-size:12px;font-family:arial,sans-serif;background-color:transparent;color:black;opacity:'+(opacity/100)+';filter: alpha(opacity='+(opacity)+');-moz-opacity: '+(opacity/100)+';');
		$g('vidzbigger_prefs_menu').addEventListener("click",vidzb_showPrefs,true);
		$g('vidzbigger_prefs_menu').addEventListener("mouseover",vidzb_MouseOverFlag,true);
		$g('vidzbigger_prefs_menu').addEventListener("mouseout",vidzb_MouseOutFlag,true);
		if($g('vidzbigger_prefs_menu').innerHTML==''){
			wbg=document.createElement('div');
			wbg.setAttribute('style','background-color:#000;padding:1px;color:#FFF;');
			wbg.appendChild(document.createTextNode(' vidzbigger settings + reset movie button '));
			nPDiv.appendChild(wbg);
			wbg.addEventListener('mouseover',vidzb_cancelPrefsButton,true);
		}
	}
	if(!first && !unwin.needToSavePreferences){
		if(unwin.prefsShowing)unwin.SETvidz_message('&nbsp;Preferences not Saved');
	}else if(unwin.needToSavePreferences){
		unwin.SETvidz_message('<span style="color:#ff9f22;">&nbsp;Please Wait Saving Preferences...</span>',2500);
	}unwin.prefsShowing=false;
	unwin.p_updatePrefwinHeight();
}
//see if prefs need to be saved (when called)
unwin.checkSavePreferences=function(){
	if(unwin.needToSavePreferences){
		window.setTimeout(savePreferences,999);
	}
}
unwin.SETvidz_message=function(w,tmt){
	_vt('vidz_message').innerHTML=w;
	if(w.length>0){
		if(tmt==undefined) tmt=2000;
		unwin.setTimeout(function(){unwin.SETvidz_message('');},tmt);
	}
}
//HERE IS MY LIBRARY OF POINTLESSLY IE COMPATABLE FUNCTIONS
unwin.fireEvent=function(element,event){
    if (document.createEventObject){
        // dispatch for IE (NEVER happens this is a greasemonkey script! lol)
        var evt=document.createEventObject();
        return element.fireEvent('on'+event,evt)
    }else{
        // dispatch for firefox+others
        var evt=document.createEvent("HTMLEvents");
        evt.initEvent(event,true,true);// event type,bubbling,cancelable
        return !element.dispatchEvent(evt);
    }
}
unwin.fireUIEvent=function(element,event){
    if (document.createEventObject){
        // dispatch for IE (NEVER happens this is a greasemonkey script! lol)
        var evt=document.createEventObject();
        return element.fireEvent('on'+event,evt)
    }else{
        // dispatch for firefox+others
        var evt=document.createEvent("UIEvents");
        evt.initUIEvent(event,true,true,window,1);// event type,bubbling,cancelable,view,detail) 
        return !element.dispatchEvent(evt);
    }
}
unwin.fireMouseEvent=function(element,event){
    if (document.createEventObject){
        // dispatch for IE (NEVER happens this is a greasemonkey script! lol)
        var evt=document.createEventObject();
        return element.fireEvent('on'+event,evt)
    }else{
        // dispatch for firefox+others
        var evt=document.createEvent("MouseEvents");
        //event.initMouseEvent(type,canBubble
        evt.initMouseEvent(event,false,true,null,1,1,1,1,1,false,false,false,false,0,element);
        return !element.dispatchEvent(evt);
    }
}
unwin.getStyle=function(x,styleProp)
{
	if (x.currentStyle)
		var y=x.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var y=document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
	return y;
}
unwin.getOffset=function( el ){
    var _x=0,_y=0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    		_x+=el.offsetLeft;// - el.scrollLeft;
    		_y+=el.offsetTop;// - el.scrollTop;  
        el=el.offsetParent;
    }return { y: _y, x: _x };
}
unwin.getScroll=function(){
    if(document.all){
        return document.body.scrollTop;
    }else{
        return window.pageYOffset;
    }
}
unwin.getWindowHeight=function(){
    if(document.all){
        return document.body.clientHeight;
    }else{
        return window.innerHeight;
    }
}
unwin.getWindowWidth=function(){
    if(document.all){
        return document.body.clientWidth
    }else{
        return window.innerWidth;
    }
}//i give up no more IE compatibility 
unwin.getElementYpos=function(el){
		var _y=0;
		while( el && !isNaN( el.offsetTop ) ) {
				_y +=el.offsetTop;// - el.scrollTop;(thanks ie?)  
		    el=el.offsetParent;
		}return _y;
}
unwin.getElementHeight=function(elem){
   return elem.clientHeight
}
unwin.getElementWidth=function(elem){
   return elem.clientWidth
}
// "BORROWED" CODE-// I AM only stealing this code for the auto pause feature,and the EZ download links.  If you feel any additional credit is due notify me.  I did slightly modify this code so its not quite the same although very similar.  I will very gladly contribute to you a portion of any donations I recieve (none yet) and I am linking to your script next to the download links
//Taken FROM: YousableTubeFix //Author: Mindeye-Script initially based on ETcelera's YousableTube userscript (http://userscripts.org/scripts/show/5906) Version: 23 Sep 2008
// Runs a particular XPath expression p against the context node context (or the document,if not provided)
// If a document (docObj) is provided,its evaluate method is used instead of document.evaluate (and it's also the default context)
// Returns the results as an array
function $x(p,context,docObj){
	if (!docObj) docObj=document;
	if (!context) context=docObj;
	var arr=[],xpr=docObj.evaluate(p,context,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=0,l=xpr.snapshotLength;i<l;i++) arr.push(xpr.snapshotItem(i));
	return arr;
}
// Returns only the first element of the array returned by $x (or null if the array was empty)
function $x1(p,context,docObj){
	var nodeArray=$x(p,context,docObj);
	return (nodeArray.length>0) ? nodeArray[0] : null;
}
// Returns a node from its id or a reference to it
function $ref(idRef){
	return (typeof(idRef)=="string") ? _vt(idRef) : idRef;
}
// Gets a Flash string variable from the player// Returns null if the variable isn't found// The function doesn't escape/unescape variables or values (be careful with special characters like "&" or "=")
function getFlashVar(varName){
	var player=_vt("movie_player");
	// Gets the flashvars from the player
	var flashVars=vFlashVars;
	if(!player.getAttribute){
		if( flashVars.length < 1 ) return;
	}else{
		flashVars=String(player.getAttribute("flashvars"));
	}
	// Searchs for the varName in the flashvars
	var queryRE=new RegExp("(?:^|&)"+varName+"=([^&]*)");
	var queryRet=queryRE.exec(flashVars);
	// Returns the corresponding value or null (if not found)
	return (queryRet===null) ? null : unescape(queryRet[1]);
}
// Sets a Flash string variable to the player// If doReloadPlayer is true it also reloads the player// The function doesn't escape/unescape variables or values (be careful with special characters like "&" or "=")
function setFlashVar(varName,varNewValue,doReloadPlayer,skipEscape){
	var player=_vt("movie_player");
	if( typeof(skipEscape) == 'undefined' || (typeof(skipEscape) != 'undefined' && !skipEscape) ) varNewValue=escape(varNewValue)
	// Gets varName value now and the flashvars from the player
	var varValue=getFlashVar(varName);
	var flashVars=String(player.getAttribute("flashvars"));
	//console.log(varName + ' ' + varValue + ' ' +varNewValue+ ' ' +typeof(flashVars));
	// If varName isn't set,just adds it
	// If varName is set,replaces its value with varNewValue
	if (varValue===null){
		player.setAttribute("flashvars",flashVars+"&"+varName+"="+varNewValue);
	}
	else{
		var replaceRE=new RegExp("(^|&)"+varName+"=[^&]*");
		flashVars=flashVars.replace(replaceRE,"$1"+varName+"="+varNewValue);
		player.setAttribute("flashvars",flashVars);
	}
	// Reloads the player
	if (doReloadPlayer) reloadPlayer();
}
unwin.gsPlayerReady=function(playerId){
	//alert('hi you can try this too, it often helps, if jsapi fails, uncomment this line');
	var player=_vt("movie_player");
	var uwPlayer=getJSobj(player);
	// Initializes the "first reproduction" flag
	if(unwin.donotautoplayVideos)
		unwin.autoplay1Rep=true;//set already in theory..
	// Tries to register the state change event listener	// This sometimes fails for unknown reasons,so the error is cached and the player reloaded up to 4 times to try to do it again
	try{
		uwPlayer.addEventListener("onStateChange","gsStateChangeListener");
	}
	catch(err){
		if (autoplayFailedRegs<unwin.jsapiRetries){
			autoplayFailedRegs++;// Increments the counter by one
			$g('movie_player').style.backgroundColor="#000";//prevent flashy screen while JSAPI is initialized
			//reloadPlayer();
			window.setTimeout(reloadPlayer,22*autoplayFailedRegs);//if this function is too big it fails,or does wrong things at end
				//wait logner and longer each time...??? maybe
		}
		else{
			// Too many failed registration attempts. The API method will be disabled and the video will be substituted with an icon as a fallback mechanism
			deleteFlashVar("jsapicallback",true);
			unwin.jsapimessage='<span style="color:red;">Failed!</span>';
		}
		return;
	}
	if(autoplayFailedRegs<1 && new String(navigator.userAgent).indexOf('Ubuntu') > 0 ){
	 //do at least one reload to fix ubuntu error... i think this should be optional
	 autoplayFailedRegs++;
	 window.setTimeout(reloadPlayer,35*autoplayFailedRegs);
	 return;
	}
	var clr='green';
	if(autoplayFailedRegs>=3) clr='orange';
	unwin.jsapimessage='<span style="color:'+clr+';">OK ['+autoplayFailedRegs+']</span>';
	initPauseClickFullscreenDoubleclick();

	// The registration was successful. Resets the "failed attempts" counter
	autoplayFailedRegs=0;
	// If the player is unmuted,mutes it	// As the pause video code can't pause the video till it's already playing,the sound is muted so the small delay is less noticeable
	if(unwin.autoplay1Rep)
		if (uwPlayer.isMuted()===false) uwPlayer.mute();
	// The default YouTube initialization function is called if it exists
	if (unwin.onYouTubePlayerReady) unwin.onYouTubePlayerReady(playerId);
};
// Function to pause the video first reproduction// It is called by the player when its state changes// Although the function is accesible from unwin,it's executed in the script context
function getJSobj(p){if(typeof(p.wrappedJSObject)!='undefined')return p.wrappedJSObject;return p;}
unwin.gsStateChangeListener=function(stateId){
		unwin.playerState=stateId;
		var player=_vt("movie_player");		
		var uwPlayer=getJSobj(player);
		if( stateId==0 ){
			if(unwin.autoLoopOnComplete){
				if( unwin.autoLoopDelay ){
					window.setTimeout(function(){
						uwPlayer.seekTo(0,true);uwPlayer.playVideo();
					},1500);
				}else{
					uwPlayer.seekTo(0,true);uwPlayer.playVideo();
				}
			}else{
				//alert("playlist-play-next")
				var n='the_next';if(_vt(n))window.location=$g(n).previousSibling.href;
			}
		}
		if (unwin.autoplay1Rep && (stateId===1)){
			// The "first reproduction" flag is active and the player state is PLAYING (1)			// Pauses the video
			uwPlayer.pauseVideo(); 
		}else if (unwin.autoplay1Rep && stateId===2){
			// The player state is now confirmed to have changed to PAUSED (2)			// Deactivates the "first reproduction" flag
			unwin.autoplay1Rep=false;
			// Seeks to the beginning of the video and unmutes it (if it is muted)			// This undoes the muting of the video by gsPlayerReady and corrects the small delay before the pause video code acted
			uwPlayer.seekTo(0,true);uwPlayer.pauseVideo(); 
			if (uwPlayer.isMuted()===true) uwPlayer.unMute();
		}
		vbinitPassedLoop();//if this is a problem contact me
};
//playingall_SPL,$('playingall_SPL').nextSibling.nextSibling.nextSibling.nextSibling.childNodes[1]
if(detectn){// Function to initialize the YouTube API code to stop autoplay// It registers our state change event listener (gsStateChangeListener) and then executes the default YouTube initialization function// It is called by the player when its API module is ready (if the corresponding jsapicallback variable is set)// Although the function is accesible from unwin,it's executed in the script context
var gsPlayerChangeReady=function(s){if(s==0){var node1='playingall_PL',node2='PL_next_video';if(document.getElementById(node1) && document.getElementById(node1).style.display!='none' && document.getElementById(node1).textContent.indexOf('Stop Autoplaying')>-1){var element=document.getElementById(node2);var event="click";var evt=document.createEvent("MouseEvents");evt.initMouseEvent(event,false,true,null,1,1,1,1,1,false,false,false,false,0,element);element.dispatchEvent(evt);}else{var n='the_next';if(document.getElementById(n))window.location=document.getElementById(n).previousSibling.href;}}};
var gsPlayerReady=function(playerId){document.getElementById("movie_player").addEventListener("onStateChange",'gsPlayerChangeReady');}
GM_addScript('var gsPlayerChangeReady='+gsPlayerChangeReady.toString()+';var gsPlayerReady='+gsPlayerReady.toString());
}// Reloads the player by removing it from the DOM tree and inserting it again in the same position// If the video is substituted by an icon,it won't do anything (a reload isn't necessary)
function reloadPlayer(force){
	if(!force && !unwin.allowPlayerReload){
		console.log("Allow Player Reload must be enabled for this feature");
		return;
	}
	if(_vt("movie_player")){
		var player=$g("movie_player");
		var playerParent=player.parentNode;
		var playerNextSibling=player.nextSibling;
		playerParent.removeChild(player);
		playerParent.insertBefore(player,playerNextSibling);
	}else if(_vt("video-player")){
		var player=$g("video-player");
		var playerParent=player.parentNode;
		var playerNextSibling=player.nextSibling;
		playerParent.removeChild(player);
		window.setTimeout(function(){playerParent.insertBefore(player,playerNextSibling);},250);
	}else if(_vt("fpObj")){
		//haced reload code for metacafe-need a generic player reload function for all sites
		var player=$g("fpObj");
		var playerParent=player.parentNode;
		var playerNextSibling=player.nextSibling;
		playerParent.removeChild(player);
		playerParent.insertBefore(player,playerNextSibling);
	}
	//unwin.occuranceTestMonitor++;// expected: 2
}
// Deletes a Flash string variable from the player// If doReloadPlayer is true it also reloads the player// The function doesn't escape/unescape variables or values (be careful with special characters like "&" or "=")
function deleteFlashVar(varName,doReloadPlayer){
	var player=_vt("movie_player");
	// Gets varName value now and the flashvars from the player
	var varValue=getFlashVar(varName);
	var flashVars=String(player.getAttribute("flashvars"));
	// Deletes varName if it's set
	if (varValue !==null){
		// Searchs for varName and deletes it
		var replaceRE=new RegExp("(^|&)"+varName+"="+varValue+"(&?)");
		flashVars=flashVars.replace(replaceRE,lambdaReplacer);
		player.setAttribute("flashvars",flashVars);
	}
	// Reloads the player
	if (doReloadPlayer) reloadPlayer();
	// Lambda function to remove varName in all scenarios	// It is a nested function
	function lambdaReplacer(str,p1,p2,soffset,s){
		return (p1=="") ? p1 : p2;// p1=="" if (^|&) matches ^ (start of string)
	}
}
// Returns an object with the details of the passed video format (or null is the format is unknown)
function getVideoFormatDetails(vFormat){//awesome
	var sFmt,sVq,sMIME,iQI,jq;// iQI is a internal "quality index" used to order the video formats according to its expected quality (higher is better)
	var unknownFormat=false;
	switch(vFormat-0){//22/1280x720/9/0/115,35/854x480/9/0/115,34/640x360/9/0/115,5/320x240/7/0/0
		case 0:// FLV Low Quality format
			sVq="1";sFmt="";sMIME="video/x-flv";iQI=1;jq="small";break;
		case 5:// FLV Mid Quality format
			sVq="2";sFmt="5/320x240/7/0/0";sMIME="video/x-flv";iQI=2;jq="small";break;
		case 6:// FLV High Quality format
			sVq="2";sFmt="6/320x240/7/0/0";sMIME="video/x-flv";iQI=3;jq="small";break;
		case 13:// 3GP LOW Quality format
			sVq="2";sFmt="13/720000/7/0/0";sMIME="video/3gpp";iQI=3;jq="small";break;
		case 17:// 3GP High Quality format
			sVq="2";sFmt="17/720000/7/0/0";sMIME="video/3gpp";iQI=3;jq="small";break;
		case 18:// MPEG-4 H.264 format
			sVq="2";sFmt="18/640x360/9/0/115";sMIME="video/mp4";iQI=5;jq="medium";break;
		case 22:// MPEG-4 H.264 HQ format
			sVq="2";sFmt="22/1280x720/9/0/115";sMIME="video/mp4";iQI=7;jq="large";break;
		case 34:
			sVq="2";sFmt="34/640x360/9/0/115";sMIME="video/mp4";iQI=4;jq="large";break;
		case 35:
			sVq="2";sFmt="35/854x480/9/0/115";sMIME="video/mp4";iQI=6;jq="large";break;
		case 37:
			sVq="2";sFmt="37/1920x1080/9/0/115";sMIME="video/mp4";iQI=8;jq="hd720";break;
		default:// Unknown format
			unknownFormat=true;break;
	}
	return (unknownFormat) ? null :{vq: sVq,fmt_map: sFmt,MIMEString: sMIME,iQI: iQI,jsq:jq};
}
// Creates a new node with the given attributes and properties (be careful with XPCNativeWrapper limitations)
function createNode(type,attributes,props){
	var node=document.createElement(type);
	if (attributes){
		for (var attr in attributes){
			node.setAttribute(attr,attributes[attr]);
		}
	}
	if (props){
		for (var prop in props){
			if (prop in node) node[prop]=props[prop];
		}
	}
	return node;
}
// Function to abort the ajax transaction// It is called by the ajax abort button event listener
function abortAjax(evt){
	abortButton.disabled=true;
	if (xhrComments) xhrComments.abort();
	restoreComments();
}
// Function to remove the ajax wrapper (with the loading icon,etc...) and restore the original comments// It is called if the ajax transaction fails or is aborted
function restoreComments(){
	recentComments.replaceChild(recentCommentsFrag,ajaxWrapper);
}
// Removes all the contents of a node and returns a document fragment with them (or null if the node isn't found)
function removeAllChildren(targetNode){
	// Checks targetNode
	var iNode=$ref(targetNode);
	if (!iNode) return null;
	// Selects the contents of the node with a range and extracts them from the DOM tree into a document fragment
	var contentsRange=document.createRange();
	contentsRange.selectNodeContents(iNode);
	var contentsFrag=contentsRange.extractContents();
	contentsRange.detach();
	// Returns the document fragment
	return contentsFrag;
}
// Builds the download video URL from its parameters (videoId,tId y videoFormat)
function getDownloadVideoURL(vId,vTId,vFormat){
	return ytHost+"/get_video?video_id="+vId+"&t="+vTId+((vFormat=="") ? "" : "&fmt="+vFormat);
}
// Returns an array with the contents of the HTMLCollection,HTMLOptionsCollection or NodeList object passed// This is useful because we can use Array methods like forEach,map,filter,etc... then with the returned array// Returns null if htmlCol is undefined,but its type isn't checked
function colToArray(htmlCol){
	if (!htmlCol) return null;
	var arrayCol=[];
	for (var i=0;i< htmlCol.length;i++) arrayCol.push(htmlCol.item(i));
	return arrayCol;
}
// Updates the URL Input field according to the videoId and the current video format
function updateURLInputField(){
	var URLInput=_vt("watch-url-field");
	if (URLInput) URLInput.value=ytHost+"/watch?v="+videoId+"&fmt="+videoFormat;// &fmt is always included to force LQ if videoFormat is ""
}
// Returns an array with the Options in the Select element (selNode) with the specified value (or null if none is found)// selNode can be a Select node id or a reference to it (if selNode doesn't exist or it's not a Select,the function returns null)// If singleNode is true,it only returns the first Option node found (or null if none)
function selGetOptionsFromValue(selNode,optValue,singleNode){
	var iNode=$ref(selNode);
	if ((!iNode) || (iNode.nodeName.toUpperCase() !="SELECT")) return null;
	var optsArr=colToArray(iNode.options).filter(function(opt){return (opt.value==optValue);});	// Gets a filtered array with the elements with the same value as the one requested
	if (optsArr.length>0){
		return (singleNode) ? optsArr[0] : optsArr;
	}
	else{
		return null;// The array is empty
	}
}
// Gets the YouTube base URL,the video download URL and the MIMEString
//MOVED TO TOP... before doc-start
var videoId,tId,ytHost,videoFormatMatch,videoFormat,ovformat,videoFormats,videoURL,autoVformat,selVideoFormat,defaultVideoFormat,defaultVideoFormatInt;
defaultVideoFormat=GM_getValue("defaultVideoFormat","0");//hmm...
function preYousableSetup(){
	if(typeof(videoId)!='undefined')return;
	videoId=getFlashVar("video_id");
	if(typeof(videoId)=='undefined')return;
	tId=getFlashVar("t");
	ytHost=window.location.protocol+"//"+window.location.host;
	videoFormatMatch=null
	videoFormat=getFlashVar("fmt_map");
	//alert('vf:'+videoFormat)//35/854x480/9/0/115,34/640x360/9/0/115,5/320x240/7/0/0
	//alert('vf:'+unescape(videoFormat));
	ovformat=videoFormat;
	
	if (videoFormat !==undefined && videoFormat !==null) {
		//videoFormatMatch=videoFormat.match(/^(\d+)(?:\/\d+){5}(?:,|$)/);
		videoFormatMatch = (','+videoFormat).match(/(,)(\d+)(\/)/g).toString();
		videoFormatMatch = videoFormatMatch.match(/(\d+)/g);
		autoVformat = videoFormatMatch[0]
	}
	if ((videoFormat===null) || (videoFormatMatch===null)){
		// Video is LQ (its fmt_map isn't set or doesn't match the regex)
		videoFormat="";
	}
	//alert(videoFormatMatch);
	videoFormats=videoFormatMatch!=null?new String(videoFormatMatch).split(','):0;
	if(tId===null || videoId===null){}else{
		videoURL=getDownloadVideoURL(videoId,tId,videoFormat);
	}
	selVideoFormat=createNode("select",{id: "gsselVideoFormat",size: "1",title: "Choose video format"});
	defaultVideoFormatInt=parseInt(defaultVideoFormat,10);// An integer representation of the default video format (it can be NaN)
}
function initialYousableSetup(){
	preYousableSetup();
	window.setTimeout(function(){videoDownloadLinks();},10);
	unwin.hqLoaded=false;
	unwin.gFormatBestAvail=0;//?
	if(unwin.siteID==1&&videoFormats!=undefined){
		if(videoFormats!=null){//&&!unwin['l0pQualz'+videoFormats[0]]
			var tvfmt=ovformat.split(',');
			for( i in tvfmt ){
				for( z in lOpPosQualities ){
					z=lOpPosQualities[z];
					if( unwin['l0pQualz'+z] ){// if its enabled
						if( tvfmt[i].indexOf(z) == 0 ){
							autoVformat=z;
							console.log('selecting format '+z);
							tvfmt=false;
							break;
						}
					}
				}if(!tvfmt)break;//found it already
			}
		}
		if( unwin['l0pQualz'+autoVformat] && lOpDisplayQualities[autoVformat] ){ 
			fmtDetail=getVideoFormatDetails(autoVformat);
			unwin.gFormatBestAvail=fmtDetail.iQI  //secondary IntQ uh..
			//unwin.gFormatBestAvail=new Number(autoVformat);
			if(unwin.LoadHighQuality){
				var evt={};evt.target={};evt.target.value=autoVformat;
				selChangeVideoFormat(evt);
				unwin.hqLoaded=true;
			}
		}
	}
}
function videoDownloadLinks(){  //lovely
	var player=_vt("movie_player");
	//var tId=getFlashVar("t");//var videoId=getFlashVar("video_id");
	thanksstr=ovformat+" Thanks to YousableTubeFix for Download Links & Quality Menu, Please click to Visit & Donate!";
	var quality=createNode("a",{id: "qqu",class: "dllabel",	href:'http://userscripts.org/scripts/show/13333',target:"_blank",title:thanksstr,style:"font-weight:bold;"},{textContent: "Quality & Download: "});											
	var downloadas=createNode("a",{id: "dl",class: "dllabel",	href:'http://userscripts.org/scripts/show/13333',target:"_blank",title:thanksstr},{textContent: ""});											
	var br=createNode('br');var br2=createNode('br');var br3=createNode('br');
	if(true){
		var videoDetailsDiv=_vt(unwin.ids_downloadLinks);
		if (videoDetailsDiv && selVideoFormat){
			// Creates the easy-to-use download links and a container div
			var downloadLinksDiv=createNode("div",{id: "gsdownloadLinksDiv"});
			var downloadLinkFormatLQ=createNode("a",{id: "gsdownloadLinkFormatLQ",class: "gsdownloadLinks",href: getDownloadVideoURL(videoId,tId,""),title: "FLV Low Quality",type: getVideoFormatDetails(0).MIMEString,id:"gsvideoFormat"+""},{textContent: "FLV"});
			var downloadLinkFormat6=createNode("a",{id: "gsdownloadLinkFormat6",class: "gsdownloadLinks",href: getDownloadVideoURL(videoId,tId,"6"),title: "FLV High Quality",type: getVideoFormatDetails(6).MIMEString,id:"gsvideoFormat"+"6"},{textContent: "FLV HQ"});
			
			//var downloadLinkFormat13=createNode("a",{id: "gsdownloadLinkFormat13",class: "gsdownloadLinks",href: getDownloadVideoURL(videoId,tId,"13"),title: "3GP H264/SAMR",type: getVideoFormatDetails("13").MIMEString,id:"gsvideoFormat"+"13"},{textContent: "3GP LQ"});
			//var downloadLinkFormat17=createNode("a",{id: "gsdownloadLinkFormat17",class: "gsdownloadLinks",href: getDownloadVideoURL(videoId,tId,"17"),title: "3GP MPEG4/ACC",type: getVideoFormatDetails("17").MIMEString,id:"gsvideoFormat"+"17"},{textContent: "3GP HQ"});

			
			// Creates and adds the CVF options to the CVF select
			//var optVideoFormat22=createNode("option",{id: "gsoptVideoFormat22",value: "22"},{textContent: "MPEG-4 H.264 HD"});
			//var optVideoFormat35=createNode("option",{id: "gsoptVideoFormat35",value: "35"},{textContent: "FLV H.264 35 HQ"});
			//var optVideoFormat18=createNode("option",{id: "gsoptVideoFormat18",value: "18"},{textContent: "MPEG-4 H.264 18 HQ"});
			//var optVideoFormat34=createNode("option",{id: "gsoptVideoFormat34",value: "34"},{textContent: "FLV H.264 34 HQ"});
			
			var optVideoFormat6=createNode("option",{id: "gsoptVideoFormat6",value: "6"},{textContent: "FLV High Quality"});
			var optVideoFormatLQ=createNode("option",{id: "gsoptVideoFormatLQ",value: ""},{textContent: "FLV Low Quality"});
			selVideoFormat.add(optVideoFormatLQ,null);
			selVideoFormat.add(optVideoFormat6,null);
			
			for( z in lOpDisplayQualities ){
				var optVideoFormat=createNode("option",{id: "gsoptVideoFormat"+z,value: z},{textContent: lOpDisplayQualities[z].d});
				selVideoFormat.add(optVideoFormat,null);
			}
			
			//var optVideoFormat17=createNode("option",{id: "gsoptVideoFormat17",value: "17"},{textContent: "3GP HQ"});
			//var optVideoFormat13=createNode("option",{id: "gsoptVideoFormat13",value: "13"},{textContent: "3GP LQ"});
			//selVideoFormat.add(optVideoFormat13,null);
			//selVideoFormat.add(optVideoFormat17,null);
			
			//selVideoFormat.add(optVideoFormat34,null);
			//selVideoFormat.add(optVideoFormat18,null);
			//selVideoFormat.add(optVideoFormat35,null);
			//selVideoFormat.add(optVideoFormat22,null);
			
			
			
			var fmt=videoFormat
			if(videoFormats!=undefined)fmt=autoVformat;
			
			var optVideoFormatCurrent=selGetOptionsFromValue(selVideoFormat,fmt,true);
			if (optVideoFormatCurrent===null){
				// There isn't any option with a value equal to the current video format. No option is selected
				selVideoFormat.selectedIndex=-1;
			}
			else{
				// Selects the option with a value equal to the current video format
				optVideoFormatCurrent.selected=true;
			}
			
			//It stores how many options in the CVF select are still unckecked for selVideoFormatAvailability's use (all of them at this point) Then sends requests to get information for each CVF option video format availability
			selVideoFormat.setAttribute("gsavToCheck",selVideoFormat.options.length);

			downloadLinksDiv.appendChild(quality);
			downloadLinksDiv.appendChild(br);
			// Inserts the CVF select into the video resize links div
			downloadLinksDiv.appendChild(selVideoFormat);
			selVideoFormat.addEventListener("change",selChangeVideoFormat,false);// Adds an event listener to the CVF select
			
			//downloadLinksDiv.appendChild(br3);
			// Appends the div to the right column (YouTube layout)
			videoDetailsDiv.appendChild(downloadLinksDiv);
			
			if( unwin['enabledownload'] ){
				// Append the links to the div
				downloadLinksDiv.appendChild(br2);
				downloadLinksDiv.appendChild(downloadas);
				downloadLinksDiv.appendChild(downloadLinkFormatLQ);
				downloadLinksDiv.appendChild(downloadLinkFormat6);
				//downloadLinksDiv.appendChild(downloadLinkFormat13);
				//downloadLinksDiv.appendChild(downloadLinkFormat17);
				//var downloadLinkFormat34=createNode("a",{id: "gsdownloadLinkFormat34",class: "gsdownloadLinks",href: getDownloadVideoURL(videoId,tId,"34"),title: "MPEG-4 34 H.264",type: getVideoFormatDetails("34").MIMEString,id:"gsvideoFormat"+"34"},{textContent: "FLV 34"});
				//var downloadLinkFormat18=createNode("a",{id: "gsdownloadLinkFormat18",class: "gsdownloadLinks",href: getDownloadVideoURL(videoId,tId,"18"),title: "MPEG-4 18 H.264",type: getVideoFormatDetails("18").MIMEString,id:"gsvideoFormat"+"18"},{textContent: "MP4"});
				//var downloadLinkFormat35=createNode("a",{id: "gsdownloadLinkFormat35",class: "gsdownloadLinks",href: getDownloadVideoURL(videoId,tId,"35"),title: "MPEG-4 35 H.264",type: getVideoFormatDetails("35").MIMEString,id:"gsvideoFormat"+"35"},{textContent: "FLV 35"});
				//var downloadLinkFormat22=createNode("a",{id: "gsdownloadLinkFormat22",class: "gsdownloadLinks",href: getDownloadVideoURL(videoId,tId,"22"),title: "MPEG-4 H.264 High Quality",type: getVideoFormatDetails("22").MIMEString,id:"gsvideoFormat"+"22"},{textContent: "MP4 HQ"});
				
				for( z in lOpDisplayQualities ){
					var downloadLinkFormat=createNode("a",{id: "gsdownloadLinkFormat"+z,class: "gsdownloadLinks",href: getDownloadVideoURL(videoId,tId,lOpDisplayQualities[z].v),title: lOpDisplayQualities[z].d,type: getVideoFormatDetails(z).MIMEString,id:"gsvideoFormat"+z},{textContent: lOpDisplayQualities[z].q});
					downloadLinksDiv.appendChild(downloadLinkFormat);
				}
			
				//downloadLinksDiv.appendChild(downloadLinkFormat34);
				//downloadLinksDiv.appendChild(downloadLinkFormat18);
				//downloadLinksDiv.appendChild(downloadLinkFormat35);
				//downloadLinksDiv.appendChild(downloadLinkFormat22);		
				
					// Chooses the CVF select selected option based on the current video format
				
			}
			var selVideoFormatOptArray=colToArray(selVideoFormat.options);// Saves an array of the CVF select options for later use
			selVideoFormatOptArray.forEach(function(opt){checkVideoAvailability(videoId,tId,opt.value,selVideoFormatAvailability);});
			//selVideoFormat.value=unwin.gFormatBestAvail;
			
			if(_vt('annotations-toggle-switch')){
				var annotationsed=unwin.vidzb_GrabNode('annotations-toggle-switch');
				_vt('gsdownloadLinksDiv').appendChild(annotationsed);
			}
			
			//if(_vt('watch-longform-buttons')&&_vt(unwin.ids_vb_titl)){
			//	var dimmingFeature=unwin.vidzb_GrabNode('watch-longform-buttons');
			//	_vt(unwin.ids_vb_titl).appendChild(dimmingFeature);
			//}
		}
	}
}

// Function to change the player and the video download link to the selected video format in the CVF select
// It is called by the CVF select event listener
function selChangeVideoFormat(evt){
	var selNewValue=evt.target.value;
	// Gets the video format details and updates the player,videoFormat and MIMEString
	
	//alert(fmtDetail.fmt_map  fmtDetail.iQI);
	if(  unwin.useNonFlashPlayer && !unwin.enable_jsapi ){
		unwin.videoPlayerItself=false;//force find element again 
		var fmtDetail=getVideoFormatDetails(selNewValue);
		var video_id=videoId;//location.search.replace(/.*v=/,'').replace(/&.*/,'');
	  var video_t=tId; //.replace(/.*&t=/,'').replace(/&.*/,'');
	  var video_src=location.protocol + '//' + location.host + '/get_video?video_id=' + video_id + '&t=' + video_t + '&fmt='+selNewValue;
		var new_player='<embed id="movie_player" type="'+fmtDetail.MIMEString+'" src="'+video_src.replace(/&/g, "&amp;") + '" '+'height="100%" width="100%" scale="aspect"></embed>';
		$g(unwin.ids_video_holder).innerHTML=new_player;
		unwin.needsFurtherUpdate=true;
	}else{
		var videoFormatDetails=getVideoFormatDetails(selNewValue);
		if (videoFormatDetails !==null){
			
			//if new style player
			var player=_vt("movie_player");var uwPlayer=getJSobj(player);
			if(typeof(uwPlayer.setPlaybackQuality)=='function'){
				console.log('setting:'+videoFormatDetails.jsq+'=');
				uwPlayer.setPlaybackQuality(videoFormatDetails.jsq);
			}else{
				setFlashVar("vq",videoFormatDetails.vq,false);
				//setFlashVar("start",Math.floor(uwPlayer.getCurrentTime()),false);
				//console.log(videoFormatDetails.fmt_map + ' '+videoFormatDetails.vq);
				setFlashVar("fmt_map",videoFormatDetails.fmt_map+(videoFormatDetails.fmt_map?','+ovformat:''),true);
				//console.log(getFlashVar("fmt_map")+' '+getFlashVar("vq"));
			}
			videoFormat=selNewValue;
			MIMEString=videoFormatDetails.MIMEString;
		}
	}
	// Makes sure that the CVF select color is the same one of the selected option for esthetic purpose
	if (selVideoFormat.selectedIndex !=-1){
		selVideoFormat.style.color=selVideoFormat.options.item(selVideoFormat.selectedIndex).style.color;
	}
	// Updates the download video link
	videoURL=getDownloadVideoURL(videoId,tId,videoFormat);
	// Updates the URL input field
	updateURLInputField();
}

// Function to change the CVF options' appearance to indicate the availability of their formats// It is called by the checkVideoAvailability function when the request returns
function selVideoFormatAvailability(vId,vTId,vFormat,vAvailabilityRet){
	var optAvailability=selGetOptionsFromValue(selVideoFormat,vFormat,true);
	if (optAvailability !==null){
		switch(vAvailabilityRet){
			case true:
			
			
				if(vFormat==22){
					ratio=fmt22ratio;
				}

				//unwin.forcevidzb_apply_selected_fixes(); //ah ha!
				
				if(!unwin.hqLoaded&&unwin.LoadHighQuality){
					var fmtDetail=getVideoFormatDetails(vFormat);
					if(fmtDetail.iQI>unwin.gFormatBestAvail) unwin.gFormatBestAvail=fmtDetail.iQI;
					//unwin.curentVideoFormat=new String(getFlashVar("fmt_map"));
						var evt={};evt.target={};evt.target.value=vFormat;
						selChangeVideoFormat(evt);
						if(_vt('gsselVideoFormat'))$g('gsselVideoFormat').value=vFormat;
						unwin.hqLoaded=true;
				}
				optAvailability.style.color="green";
				optAvailability.textContent+=" (available)";
				optAvailability.setAttribute("gsavailable",1);
				break;
			case false:
				optAvailability.style.color="red";
				optAvailability.textContent+=" (unavailable)";
				optAvailability.setAttribute("gsavailable",0);
				break;
			case null:
				optAvailability.style.color="purple";
				optAvailability.textContent+=" (request error)";
				optAvailability.setAttribute("gsavailable",-1);
				break;
		}
		// Makes sure that the CVF select color is the same one of the selected option for esthetic purpose
		if (selVideoFormat.selectedIndex !=-1){
			selVideoFormat.style.color=selVideoFormat.options.item(selVideoFormat.selectedIndex).style.color;
		}
		// If the video format is unavailable,disables the corresponding easy-to-use download link
		if (vAvailabilityRet !==true){
			var downloadLinkAvailability =_vt('gsvideoFormat'+vFormat);
			//var downloadLinkAvailability=$x1("//div[@id='gsdownloadLinksDiv']/a[@gsvideoformat='"+vFormat+"']");
			if (downloadLinkAvailability){
				downloadLinkAvailability.className+=" gsdownloadLinkDisabled";
				downloadLinkAvailability.href="javascript:void(null)";
				downloadLinkAvailability.title="This video format is unavailable";
			}
		}
		// Updates the "options still unckecked" counter
		selVideoFormat.setAttribute("gsavToCheck",selVideoFormat.getAttribute("gsavToCheck")-1);
		if (selVideoFormat.getAttribute("gsavToCheck")<=0){
			// All the CVF options have been checked. If the user has chosen to autoselect a video format according to its availability,does it now
			if ((defaultVideoFormatInt===-1) || (defaultVideoFormatInt===-2)){
				// Gets the preferred available option according to the user preferences
				var optQualityAuto=selGetAvailableVideoFormatOption((defaultVideoFormatInt===-2) ? true : false);
				if ((optQualityAuto !==null) && (optQualityAuto.selected==false)){
					// The returned options isn't selected. Selects it
					optQualityAuto.selected=true;
					fireChangeEvent(selVideoFormat);// Manual fire of the change event (script changes don't fire it)
				}
			}
		}
	}
}
// Asynchronously checks if a video with the provided parameters is available
// Calls callbackFunc with the video paramaters and an additional one (true,false or null if error) indicating the result
// Returns true if the request was sent,false otherwise
// It uses an indirect method because of the multiple bugs of XMLHttpRequest and redirections (bug 343028,238144,etc...)
function checkVideoAvailability(vId,vTId,vFormat,callbackFunc){
	if ((!callbackFunc) || (typeof(callbackFunc) !="function")) return false;
	if((','+ovformat).indexOf(','+vFormat)>-1){//getFlashVar("fmt_map")//video not always avialable@start
		// Low Quality Format ('') availability can't be checked with this method,so it's asummed to be always available
		callbackFunc(vId,vTId,vFormat,true);
		return true;
	}else if(vFormat!=''){
		callbackFunc(vId,vTId,vFormat,false);
	}
	return;//we are cancaling this finally is the internet measurably faster?
	// Gets the Watch Video URL of the requested format and downloads it
	// Then checks the swfArgs object in its source code for the fmt_map parameter of the would be player
	// YouTube checks the video format availability,and only sends the corresponding fmt_map if it is available
	var vURL=ytHost+"/watch?v="+vId+"&fmt="+vFormat;
	var xhrVideo=new XMLHttpRequest();
	xhrVideo.onerror=function(evt){
		xhrVideo.abort();
		callbackFunc(vId,vTId,vFormat,null);// Error retrieving video availability
	};
	xhrVideo.onload=function(evt){
		// Checks for errors
		if ((xhrVideo.readyState !=4) || (xhrVideo.status !=200)){
			callbackFunc(vId,vTId,vFormat,null);// Error retrieving video availability
			return;
		}
		// Gets the swfArgs object string from the source code
		var responseMatch=xhrVideo.responseText.match(/^\s*var swfArgs=({[^}]*});\s*$/im);
		if (responseMatch===null){
			callbackFunc(vId,vTId,vFormat,null);// Error retrieving video availability
			return;
		}
		else{
			responseMatch=responseMatch[1];
		}
		// Evals the swfArgs object string to a real object and gets its fmt_map member
		var objArgs=eval("("+responseMatch+")");
		var sMap=unescape(objArgs.fmt_map) || "";
		// Tests if the fmt_map correspond to the requested format (that should only happen if the video is available)
		if ((new RegExp("^"+vFormat+"(/\\d+){4}(?:,|$)")).test(sMap)){
			callbackFunc(vId,vTId,vFormat,true);// Video available
		}
		else{
			callbackFunc(vId,vTId,vFormat,false);// Video unavailable
		}
	};
	xhrVideo.open("GET",vURL,true);
	xhrVideo.send(null);
	return true;

}
var abortButton,recentCommentsFrag,ajaxWrapper,xhrComments,recentComments;
unwin.cpageSize='100';//mayiremov?
function bigifyComments(){
	// Substitutes the original page size of comments in video page (10) for the bigger one used in the view all comments page (500)
	// Other page sizes can't be easily used because Youtube ajax page only accepts those values in the pagesize parameter (others seem to default to 10)
	if (unwin.biggerComments){
		var commentsURL=ytHost+"/watch_ajax?v="+videoId+"&action_get_comments=1&p=1&commentthreshold="+((commentsThreshold) ? commentsThreshold.value :-5)+"&page_size=500";
		// Gets necessary data from the page
		recentComments=_vt("recent_comments");
		feathermode=false;
		if( !recentComments ){recentComments=_vt("cm");feathermode=true;}
		var commentsThreshold=$x1("//div[@id='watch-comment-filter']//form//select[@name='commentthreshold']");
		if (recentComments){
			// Creates the elements that will indicate that the comments are being loaded
			var loadingIcon=createNode("img",{id: "gsloadingIcon",alt: "Loading...",
																					 src: ytHost+"/img/icn_loading_animated.gif"});
			var progressMeter=createNode("span",{id: "gsprogressMeter"});
			abortButton=createNode("input",{id: "gsabortButton",title: "Abort the transaction",type: "button",value: "Abort"});
			ajaxWrapper=createNode("div",{id: "gsajaxWrapper",title: "The comments are being loaded..."});
			// Inserts the contents within the wrapper
			ajaxWrapper.appendChild(loadingIcon);
			ajaxWrapper.appendChild(progressMeter);
			ajaxWrapper.appendChild(abortButton);
			// Removes the original comments and save them into a document fragment
			recentCommentsFrag=removeAllChildren(recentComments);
			// Inserts the wrapper within the now empty div
			recentComments.appendChild(ajaxWrapper);
			// Adds an event listener to the abort button
			abortButton.addEventListener("click",abortAjax,false);
			// Gets the XML data from Youtube
			// GM_xmlhttpRequest's privileged features aren't necessary and it doesn't support responseXML without using DOMParser
			xhrComments=new XMLHttpRequest();
			xhrComments.onload=function(evt){
				//responseDetails.responseText
				// Checks for errors
				var cmode_allow=false;
				var finhtml='';
				if ((xhrComments.readyState !=4) || (xhrComments.status !=200)){
					restoreComments();	
					return;
				}else{
				 	if((!xhrComments.responseXML)){
					 	if(xhrComments.responseText){
							//no xml,so check for a html/text response to parse....
							var mhtm=new String(xhrComments.responseText);
							finhtml=qslice.mhtm('<div id="recent_comments">','<!--end recent_comments-->')
							//finhtml=finhtml.qreplace('class="watch-comment-entry"','class="watch-comment-entry" style="display:none;"');
							if(finhtml.length>5)
								var cmode_allow=true;
						}else{
							restoreComments();	
							return;
						}
					}else{
						//regular yousable way
						// The data was received. It is now used to fill the recent comments div
						var xmlData=$x1("//html_content/text()",null,xhrComments.responseXML);
						var xmlReturnCodeNode=$x1("//return_code/text()",null,xhrComments.responseXML);
						var xmlReturnCode=((xmlReturnCodeNode) && (xmlReturnCodeNode.data)) ? xmlReturnCodeNode.data : null;
						if(xmlData)
							finhtml=xmlData.data
						else{restoreComments();	
							return;
						}
					}
				}
				if (cmode_allow || (xmlData) && (xmlData.data) && (xmlReturnCode==="0")){
					if(feathermode)finhtml += '<a href="http://www.youtube.com/comment_servlet?all_comments&v='+videoId+'" target="_blank">View All Comments</a>';
					recentComments.innerHTML=finhtml;
					//reversify comments!!!!
					var allCommentNodes=[];
					var s=recentComments.childNodes;
					for(var x=0,l=s.length;x<l;x++){
						if(s[x].nodeType==1){allCommentNodes.push(s[x]);}
					}recentComments.innerHTML='';//now we got them,blank and reverse them
					recentComments.style.borderBottom='10px solid blue;';
					var countDisplayed=0;
					var repliesTOFlip=[];//if you reverse them all replies come before instead of after the orig,this captures these and flips them to the corret side
					//this adds them in reverse
					for(var i=allCommentNodes.length-1;i>=0;i--){
						if(new String(allCommentNodes[i].innerHTML).indexOf('watch-comment-entry-reply')>0){
							repliesTOFlip.push(allCommentNodes[i]);continue;
						}recentComments.appendChild(allCommentNodes[i]);
						countDisplayed++;
						if(repliesTOFlip.length>0){
							for(var r=repliesTOFlip.length-1;r>=0;r--){
								recentComments.appendChild(repliesTOFlip[r]);
								//countDisplayed++;//count or not count thread replies in total
							}repliesTOFlip=[];
						}if(countDisplayed>=unwin.maximumCommentCount) break;//allCommentNodes[x].style.display="none";}
					}//end comment reversal!!!!
					unwin.handleColumnAd();
				}else{
					restoreComments();return;
				}// Change the commentsThreshold combobox (if it exists) so it won't restore the old pagesize
				if ((commentsThreshold) && (commentsThreshold.hasAttribute("onchange"))){
					commentsThreshold.setAttribute("onchange",commentsThreshold.getAttribute("onchange").replace("&page_size=10","&page_size=500"));
				}
			};
			xhrComments.onprogress=function(evt){
				progressMeter.textContent=Math.round(((evt.position / evt.totalSize)*100))+"% completed";
			};
			xhrComments.onerror=function(evt){
				restoreComments();
			};
			//var commentsURL=http://gdata.youtube.com/feeds/api/videos/"+videoId+"/comments";
			//var commentsURL=ytHost+"/comment_servlet?all_comments&v="+videoId+"&fromurl=/watch%3Fv%3D"+videoId;
			xhrComments.open("GET",commentsURL,true);
			xhrComments.send(null);
		}
	}
}
// END "BORROWED" YOUSABLE CODE*************************************************************************END STEALING (ITS WRONG)
//encode and decode functions from here: http://ostermiller.org/calc/encode.html
function urlDecode(str){
    str=str.replace(new RegExp('\\+','g'),' ');
    return unescape(str);
}
function urlEncode(str){
    str=escape(str);
    str=str.replace(new RegExp('\\+','g'),'%2B');
    return str.replace(new RegExp('%20','g'),'+');
}

//end encode and decode functions
// RESUME VidzBigger code ///  This section does most basic setup stuff...
// Initializes the needed variables and sets the player to call gsPlayerReady when the player API module is ready
unwin.autoplay1Rep=unwin.donotautoplayVideos;//set autoplay value
autoplayFailedRegs=0;
var chref=wUrl;//new String(window.location);


if(new Number(unwin.lastKnownVersionUsed)<vidz_Version){
	//you just upgraded
	if(!unwin.vidzbigenabled){
		unwin.vidzbigenabled=true;
		window.setTimeout(savePreferences,999);
		alert('Thanks for Upgrading!  VidzBigger will now be Re-Enabled.  Please let me know if you are still experiencing problems!');
	}
}

function vidzb_getEventTarget(evt){
    var targ=(typeof(evt.target)!='undefined') ? evt.target : evt.srcElement;
    if(targ !=null){
        if(targ.nodeType==3)
            targ=targ.parentNode;
    }
    return targ;
}
function shareLoopsVidzLoops(){
	return 'http://www.vidzbigger.com/VidzLoops/index.php?new_loop=true&loadvideoid='+videoId+'&startseconds='+unwin.vidzbLoopTimerStart+'&endseconds='+unwin.vidzbLoopTimerEnd;
}	
function initPauseClickFullscreenDoubleclick(){
//	if(!unwin.allowPlayerClk || !_vt("movie_player")) return;
//	window.setTimeout(function(){
//		var player=_vt("movie_player");
//		var uwPlayer=getJSobj(player);
//		player.addEventListener('click',function(e)
//		{
//			if (e.layerY-$g('movie_player').offsetTop>=$g('movie_player').clientHeight-35) return;
//			unwin.isdoubleclick=false;
//			window.setTimeout(function(){
//				if(!unwin.isdoubleclick){
//					//click to pause video
//					//var state=uwPlayer.getPlayerState();
//					//if(state==1) uwPlayer.pauseVideo();
//					//else if(state==2||state==-1||state==0) uwPlayer.playVideo();
//				}
//			},unwin.dblClickTimer);
//			},false);
//		
//		player.addEventListener('dblclick',function(e)
//		{
//			if (e.layerY-$g('movie_player').offsetTop>=$g('movie_player').clientHeight-35) return;
//			unwin.isdoubleclick=true;
//			unwin.finVidzBToggleFullscreen();
//		},false);
//		
//	},1000);
}
unwin.finVidzBToggleFullscreen=function(ttt){//accounts for snap mode
	if(unwin.snapfullscreenmode){
		//if( typeof(ttt) != "undefined" ){ if( ttt ) unwin.goFullscreen(); else unwin.leaveFullscreen();}
		if(unwin.fullscreenmode || (typeof(ttt) != "undefined" && !ttt ) )window.scroll(0,0);else window.scroll(0,unwin.fssnapHeight);
	}else if(typeof(ttt) == "undefined"){if(unwin.fullscreenmode)unwin.leaveFullscreen();else unwin.goFullscreen();}
	foldAttempts=14;
}
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//this block should go after all functions that need to be precomplied have been defined but no latter than necessary either....
var applyPrecompi=function(){};
if(unwin.precompMainFun){
function compil(it){
	var c=oPcmpStr[it];
	var o=c;
	//console.log(c);
	var tpo=0;
	var spo=0;
	var ini=-1,ein=-1; // one could examine additonal keys, or examine more than simply true/false values, evaluate comparitors, allow more complex ect, this is bound to cause a lot of confusion unless you know how to use it and follow the iplicit convention
	for(var i in unwin.vidzb_tf_prefs ){
		tpo=0;
		spo=0;
		ini=-1,ein=-1;
		do{
			tpo=0;
			ini=c.indexOf('if (unwin.'+i,spo)
			ein=c.indexOf('if (!unwin.'+i,spo)
			//console.log('checking '+i +' {'+unwin[i]+'} a:'+ ini+ ' b:'+ein);
			//or an include with an &&
			// basically make sure that if the term is required, it is excluded
			// you could really just drop true false values in the correct places
			// then examine all these 'hardcoded' values to see if entering becomes logically impossible
			// this works based on a lot of assumptions in coding style, and only checks the first element of any if statement
			// the basic incompatibilty is the presence of an OR (||) after the first condition
			// if ([!]unwin.AtrueFalsePref || ) is expected to NOT exist, all first condition true false prefs are of type
			// if ([!]unwin.AtrueFalsePref && ) or otherwise excluded.  A space is required between if_( to function 
			// however... some JS engines automatically add a space here.... leaving an easy disable for some
			// be ware that the spaces cannot be trusted to be the same as in the code, so using spaces is not a reliable
			// way to exclude functions, rather if you wish to exclude from exclusion don't put the TFpref first
			if(ini>-1)tpo=ini;
			if(ein>-1)tpo=ein;
				//its only dumb luck this works without examinig entire logic
				//however the odd || exclusion allows one to provide a test case for the functionality rather easily
				// by adding an || true) in the logic at the end of the if
				// the pre compiler will still exclude it, however otherwise it would execute
				// example: if (unwin.snapfullscreenmode || true){console.log('precompilerfailed'); when snapfullscreenmode is false (it will be removed by the precompiler even though the expression evaluates to true)
			if( (!unwin[i] && ini>-1) || (unwin[i] && ein>-1) ){
				var full=matchBrace(c.substr(tpo),'{','}')//most speed could be gained in this fun
				var el=c.indexOf('else',tpo+full)-tpo-full;//remove possible dangling else
				if(el==0)full+=4;
				if(el==1)full+=5;
				//this accounts for dangling else after the string, there is also a chance
				//that we also need to remove one before teh string!!!!!! although (i think) ONLY if we did NOT find one after the string, 
				// if thre is one after then we are in the middle of a chain of if else [if else] if and can leave the extra else, however
				// if we are the last else if() with no trailing else then we need to trim the else
				// by moving tpo backwards < < or else we may execute whichever line happens to be next conditionally (ie: never) instead of always
				//if( el < 0 ){
					//here we seek 'else' before 'tpo' with a predetermined one space// this code is NOT tested
					var el = c.indexOf('else ',tpo-5 )+5-tpo;
					if(el==0){
						tpo-=5;//should trim that preceding else
						full+=5;
					}
				//}
				//var estr=c.substr(tpo,full);//exclusion string (exact reperesentation of what we are removing) //substr would be faster here...
				//console.log('should Exclude '+i+' ('+unwin[i]+') at '+tpo+': ' + estr);
				//console.log( c.substr(0,tpo)+'MSSINGCODE'+c.substr(tpo+full) );
				//console.log(c.length +' ' +(c.length-estr.length));
				//c=c.replace(estr,'');
				c=c.substr(0,tpo)+c.substr(tpo+full)
				//console.log(c.length);
			}
			spo=tpo+i.length+10;//next start pos, since given pref may occur more than once, this distance is not an exact science here  +('if (unwin.').length (10)
		}while(tpo > 0)
		c=c.qreplace('unwin.'+i,unwin[i]);//fill in TF values instead of unwin.PREF object lookup... or do this while we looked earlier
		//so far only deals with explicitly IFed blocks.... an if(true){/*codea*/}else{/*codeb*/}, the else will not be stripped unless it has an if()
	}
	//at this point we might test for the standalone conditions defined:
	//next steps: true followed by any OR = standalone true
	//            false followed by any AND = standalone false
	//  standalone true - eliminante any else (strange one, since the else is implicitly false, auto handling can be accomplished by adding an: else if(false)
	//										this approach is prefered over what you will find in force_apply where even else clauses are explicitly coded using if statements, which confounds those who disable this compilation feature
	//  standalone false - eleminate the block (extensive)
	// same basic rules apply, the condition or the inversion of it's opposit are equvilent
	// the only remaining question preventing begining this is solved by the following console.log statements: can we expect there to always or never be a space between if(_true ?   guess:never   ODDDLY enough this also is delaying consideration of the conditionals that may follow, should be handled before any other processing if we are going to bother considering them, since there are a lot of other opprations we could employ during that stage as well, some of which are only applicable to chrome (removing comments) or to otherwise ensure consistent fromating that's predictable and less reliant on code style
	
	if(detectn){//DANGER does NOT differentiate between // and http://
		var lin=c.split("\r\n"),l;
		c='';
		for( i in lin ){
			l=lin[i].trim()
			var p=l.indexOf('//');
			if(p!=0){
				if(p>0)l=l.substr(0,p)+"\n";
				else l=l+"\n";
				if(l.length>1)c+=l;
			}
		}
	}
	
	compisav += o.length - c.length,compitot+=o.length;
	//console.log(it+' '+(o.length - c.length)+' Chars Saved, now:'+c.length);
	//console.log(c.substring(0,16)+'...');//new code should/must begin function()=
	//console.log(c);//still better than none
	return (c);//eval(c)
}

function matchBrace(c,sb,eb){
	var bi=[]//braceindex
	bi[sb]=0,bi[eb]=0;
	var i=c.indexOf(sb),tl=c.length,nsb,neb,q;
	if(i<0)return 0;
	while(i<tl){//was checking every char
		if( typeof(bi[c[i]]) != 'undefined' ){
			bi[c[i]]++;
		}
		if(bi[sb]>0 && bi[sb]==bi[eb]){
			return i+1;//found matching brace
		}
		q=i+1,nsb=c.indexOf(sb,q),neb=c.indexOf(eb,q);
		if(nsb>0 && nsb<neb)i=nsb;
		else if(neb>0)i=neb;
		else i++;
	}
	return 0;
}
var oPcmpStr={};
var compisav=0,compitot=0;
function prepairPrecompi(){
	oPcmpStr.vidzb_apply_selected_fixes=unwin.vidzb_apply_selected_fixes.toString();
	oPcmpStr.forcevidzb_apply_selected_fixes=unwin.forcevidzb_apply_selected_fixes.toString();
	oPcmpStr.setVideoSize=unwin.setVideoSize.toString();
}
applyPrecompi=function(){
	compisav=0,compitot=0;
	for(var i in oPcmpStr){
		var nf='unwin.'+i+'='+compil(i);
		eval(nf);
	}
	unwin.forcevidzb_apply_selected_fixes();//this will ensure we run the result at least once... otherwise on scroll...
	//console.log('saved ' +compisav+' characters of '+compitot+' or '+Math.floor((compisav/compitot)*100)+ '%');
}
prepairPrecompi();
applyPrecompi();
}//end initial precompilation block
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function performFunkyChecks(){
	setTimeout(function(){
		mp=document.getElementById('movie_player');
		if(mp&&mp.nodeName=='EMBED'&&typeof(mp.playVideo)!='function'){
			mp.style.display='none';//no one wants this
			setTimeout(function(){
				mp.style.display='block';
				window.setTimeout(function(){
					if( typeof(mp.playVideo)!='function' ){
						//console.log(' please tell me if you see this at vidzbigger.com/contact.  I think that a chrom bug is causing flash to be the ***** that itis');
						unwin.vidzb_apply_selected_fixes();
					}
				},550);
			},250);
		}
	},2000);
}
function readyToVidsBig(){
	vsiteInitFun();//loads some config
	unwin.vidzb_removeAdvertisements();
	document.addEventListener("load", function(){unwin.vidzb_removeAdvertisements();},false);
	if(chref.indexOf('/group')<=0 && chref.indexOf('profile_')<=0){
		unwin.p_createPreferencesArea();
	}
	if(unwin.vidzbigenabled && unwin.vidzbigSITEenabled){
		if(unwin.simpleViewMode&&(unwin.siteID!=1||(unwin.siteID==1 && unwin.enableChannelBrowser))){
			if(unwin.siteID==4&&_vt('meat'))$g('meat').childNodes[1].id='vb_video_container';//vim
			unwin.ids_starty=[];
			var ps;
			if(typeof(VM_AppendStyles)!='undefined')VM_AppendStyles();
			for(var i=0;i<unwin.ids_all.length;i++){
				//console.log(_vt(unwin.ids_all[i]));
				if( _vt(unwin.ids_all[i]) ){
					var sp=document.createElement('div');
					var cn=$g(unwin.ids_all[i]);
					var hi=unwin.getElementHeight(cn);
					var wh=unwin.getWindowHeight();
					//if(typeof(reinstateHiddenVideo)=='function'){reinstateHiddenVideo(cn)}
					ps=unwin.getOffset(cn);
					sp.setAttribute('style','height:'+hi+'px;width:'+unwin.getElementWidth(cn)+'px');
					sp.setAttribute('id','o_placer_'+unwin.ids_all[i]);	
					cn.style.zIndex=1000-i;
					if(_vt('channel-body')){
						var bgc=unwin.getStyle($g('channel-body'),'background-color');
						if(bgc)cn.style.backgroundColor=bgc;
						else cn.style.backgroundColor='#000';
					}else cn.style.backgroundColor='transparent';
					sp.style.position=unwin.getStyle(cn,'position');//cn.style.position;
					sp.style.top=unwin.getStyle(cn,'top');//cn.style.top;
					sp.style.left=unwin.getStyle(cn,'left');//cn.style.left;
					cn.style.top=(ps.y)+'px';
					cn.style.left=(ps.x)+'px';
					cn.style.position="fixed";
					sp.style.backgroundColor=cn.style.backgroundColor;
					sp=cn.parentNode.insertBefore(sp, cn);
					unwin.ids_starty[i]=ps.y;
					if(unwin.ids_all.length==1){
						window.addEventListener('scroll',function(){
							var scr=unwin.getScroll();
							if(scr > ps.y){
								cn.style.top='0px';
								if( wh / 3 > hi )cn.style.top='-'+(hi/3)+'px';
							}else{
								cn.style.top=(ps.y-scr)+'px';
							}
						},ucap)
					}
				}
			}
			if(unwin.ids_all.length>1){
				window.addEventListener('resize',function(){
					for(var i=0;i<unwin.ids_all.length;i++){
						var cn=$g(unwin.ids_all[i]);
						var px=unwin.getOffset($g('o_placer_'+unwin.ids_all[i]));
						cn.style.left=px.x+'px';
					}
				},ucap)
				window.addEventListener('scroll',function(){
					var scr=unwin.getScroll();
					var f1=unwin.getElementHeight($g(unwin.ids_all[0]))
					for(var i=0;i<unwin.ids_all.length;i++){
						var cn=$g(unwin.ids_all[i]);
						var hi=unwin.getElementHeight(cn);
						var ps={y:unwin.ids_starty[i]}//cn.name-0};
						if(scr > ps.y){
							var dif=(f1-hi);
							if( scr > ps.y-dif){
								cn.style.top=(dif)+'px';
							}else{
								cn.style.top=(ps.y-scr)+'px';
							}
						}else{
							cn.style.top=(ps.y-scr)+'px';
						}
					}
				},ucap)
			}
			if(ps && unwin.autoScrollPastHeader){
				if(unwin.getScroll()==0)window.scroll(0,ps.y);
			}
			unwin.handleColumnAd();
			unwin.vidzb_removeAdvertisements();
			unwin.isInWatchMode=true;
		  if(unwin.watchStrings&&chref.indexOf(unwin.watchStrings)>7) vidzbiggerCheckVersion();
			return;
		}
		//if(_vt('oo'))vsiteInitFun();
		if(typeof(VM_AppendStyles)!='undefined')VM_AppendStyles();
		//if(typeof(VM_AppendScripts)!='undefined')VM_AppendScripts();

		unwin.goFullscreen=function(){
			unwin.fullscreenmode=true;
			unwin.oldValue=($g(unwin.ids_vb_midl))?_vt(unwin.ids_vb_midl).style.marginLeft:'0px';
			document.body.style.minHeight=(unwin.getElementHeight(document.body)+355)+"px";
			_vt(unwin.ids_vb_head).style.display='none';
			_vt(unwin.ids_vb_left).style.display='none';
			_vt(unwin.ids_vb_rigt).style.display='none';
			_vt(unwin.ids_vb_foot).style.display='none';
			unwin.hideIgnoreList();
			unwin.forcevidzb_apply_selected_fixes();
		}
		unwin.leaveFullscreen=function(){
			
			unwin.fullscreenmode=false
			_vt(unwin.ids_vb_midl).style.marginLeft=unwin.oldValue;
			_vt(unwin.ids_vb_head).style.display='block';
			_vt(unwin.ids_vb_left).style.display='block';
			_vt(unwin.ids_vb_rigt).style.display='block';
			_vt(unwin.ids_vb_foot).style.display='block';
			document.body.style.height="auto";
			document.body.style.minHeight="0px";
			unwin.showIgnoreList();
			unwin.forcevidzb_apply_selected_fixes();
		}

		unwin.vidTitleOrigPosY=unwin.getElementYpos(_vt(unwin.ids_title));
		
		if( unwin.siteID!=1 ) unwin.fullscreenmode=false; //yet somehow htey all do it anyay?
		
		window.vidzb_checkForNewLinks=function(evt){
			var theElem=vidzb_getEventTarget(evt);
			//if(unwin.fullscreenmode){
			//	if(theElem.nodeName !="EMBED")
			//		unwin.leaveFullscreen();
			//}
			if(theElem.className=='expand-header'|| theElem.parentNode.className=='yt-uix-expander-head' || theElem.parentNode.className=='expand-header'){
				//if the document is clicked, they may have expanded a new section, so check for HD for each once it loads
				window.setTimeout(function(){unwin.vidzb_fmt18ALlLinks();},3000);
			}else if(theElem.id=='watch-comments-show-more-button'){
				window.setTimeout(function(){unwin.vidzb_apply_selected_fixes();},3000);
			}
			
			window.setTimeout(function(){
				handleQuicklistMin();
				if(theElem.id=='quicklist-title' || theElem.parentNode.id=='quicklist-title' || theElem.id=='quicklist-title-button' || theElem.parentNode.id=='quicklist-title-button'){
					var mu=document.getElementsByClassName('yt-uix-button-menu');
					for(var i=0,l=mu.length;i<l;i++){
						var amt=27;
						if(_vt('quicklist-title-button'))amt+=unwin.getElementYpos($g('quicklist-title-button'));
						mu[i].style.top=amt+'px';
					}
				}
				
			},30);
			
		}
		function handleQuicklistMin(){
			var ql=document.getElementById('quicklist');
			var pb=document.getElementById('pagebottom');
			if(ql&&pb){
				if(ql.className=="passive min"){
					ql.style.bottom="0px";
					pb.style.height="27px";
				}else{
					ql.style.bottom="auto";
					pb.style.height="150px";
				}
			}
		}
		handleQuicklistMin();
		//NOT in share_inline?v=dfsdf
		//not /my_profile_theme_background_frame
		//chref.indexOf('next')<=0
		//alert(chref+' '+unwin.watchStrings+' '+_vt(unwin.ids_video_holder));
		// NOT watch_editaudio
			//	alert('ok'+chref.indexOf(unwin.watchStrings)+_vt(unwin.ids_video_holder));
			//alert(unwin.watchStrings + chref.indexOf(unwin.watchStrings));
		if(chref.indexOf('contact.php')<=0 && ((chref.indexOf(unwin.watchStrings)>7) &&  _vt(unwin.ids_video_holder))){
			if(!unwin.columnViewMode)initialYousableSetup();
			else{
				//ARE WE ON A VIDEO PAGE???
			  unwin.isInWatchMode=true;
			  vidzbiggerCheckVersion();
			  unwin.vidzb_oneTimeSetupAndResize();
			  GM_addStyle("embed{display:block}");
				//unwin.vidzb_initialSetupAndResize();
				unwin.forcevidzb_apply_selected_fixes();//unnecessary redundency but looks  cleaner... something
		
				//if(unwin.isInWatchMode){//always in watch mode here.. should it be?
				
					//unwin.headerHeight=unwin.getElementHeight($g(unwin.ids_vb_head))+unwin.getElementHeight($g(unwin.ids_vb_titl));
					unwin.headerHeight=unwin.getElementYpos($g(unwin.ids_vb_cont));//unwin.getElementHeight($g(unwin.ids_vb_head))+unwin.getElementHeight($g(unwin.ids_vb_titl))+10;
	
					if(unwin.autoScrollPastHeader){
						if(unwin.getScroll()==0)window.scroll(0,unwin.headerHeight-10);
						unwin.fssnapHeight=unwin.headerHeight-10;
					}else{
						unwin.fssnapHeight=unwin.headerHeight-10;//serves as a ready point ..???
					}
					
					var getypos='var gyp=function(el){var y=0;while(el&&!isNaN(el.offsetTop )){y +=el.offsetTop;el=el.offsetParent;}return y;};';
					GM_addScript('yt.www.watch.player.enableWideScreen=function(a,b){'+getypos+'var snap=gyp("'+unwin.ids_vb_cont+'");if(window.pageYOffset!='+unwin.fssnapHeight+'){window.scroll(0,'+unwin.fssnapHeight+')}else{window.scroll(0,0)}};yt.www.watch.player.onPlayerSizeClicked=yt.www.watch.player.enableWideScreen;void(0)');
					//apply watch mode CSS
					var scriptStyles=[];
				
					performFunkyChecks();
				
					scriptStyles.push(".video-bar-item{width:70px;}");
					scriptStyles.push(".v90WideEntry{padding-left:0px;;}");
					
					// Adds the styles from the script to the page,making them important
					scriptStyles.forEach(function(s){GM_addStyle(s.makeImportant());});
				//}
		
				if(chref.indexOf('youtube.')>0 && _vt('movie_player') ){
					
					if (unwin.dissableAnnotations){
						setFlashVar("iv_module","",false);
						setFlashVar("iv_storage_server","",false);
					}
					if( unwin.vidzb_blockPlayerAds ){
						setFlashVar("ad_host","",false);
						setFlashVar("ad_module","",false);
						setFlashVar("ad_eurl","",false);
						setFlashVar("ad_module","",false);
						//setFlashVar("ctb_xml","",false);
					}
					if(unwin.enable_jsapi ){
						
						if(unwin.allowPlayerClk){
							$g('movie_player').setAttribute('wmode','transparent');
						}
						if(unwin.donotautoplayVideos&&unwin.donotautobuffer)setFlashVar("autoplay","0",false);
						//if(unwin.donotautoplayVideos){
						setFlashVar("jsapicallback","gsPlayerReady"+unwin.extraflashvars,false,true);// Depends on the Main Reload
						//setFlashVar("color1","0",false);//0x
						//setFlashVar("color2","0",false);
						//setFlashVar("wheelScrollEnabled","0");
						reloadPlayer();//now or later......
					}else{
						//no JSAPI
						
						
						//if(unwin.useNonFlashPlayer){
						//	var video_id=location.search.replace(/.*v=/,'').replace(/&.*/,'');
						//  var video_t=$g('movie_player').getAttribute('flashvars').replace(/.*&t=/,'').replace(/&.*/,'');
						//  var video_src=location.protocol + '//' + location.host + '/get_video?video_id=' + video_id + '&t=' + video_t + '&fmt=18';
						//	var new_player='<embed id="mp4-player" type="video/mp4" src="'+video_src.replace(/&/g, "&amp;") + '" '+'height="385" width="640" scale="aspect"></embed>';
						//	$g(unwin.ids_video_holder).innerHTML=new_player;
						//}
						
					}
				}else if(_vt('fpObj')){//metacafe performs better this way?
					 $g('fpObj').setAttribute('wmode','opaque');
					 reloadPlayer();
				}
				unwin.needsFurtherUpdate=true;//force update
				unwin.isLoadedOnce=true;
				//unwin.onload=function(){	
				//	window.setInterval(function(){unwin.vidzb_apply_selected_fixes()},10);
				//}	
				//ADD EVENT LISTENERS
				unwin.disableFixes=false
				//unwin.onload=function(){
				
				window.addEventListener('scroll',function(){
						unwin.vidzb_apply_selected_fixes();
					},ucap)
				//					if(unwin.positionPersistently||!unwin.disableFixes){window.setTimeout(function(){unwin.vidzb_apply_selected_fixes();},10);//doing these on load or else you catch the scroll event we do
				//						unwin.disableFixes=true;	
				//						window.setTimeout(function(){unwin.disableFixes=false;if(unwin.positionVideoAutomatically)unwin.vidzb_apply_selected_fixes();},550);
				//					}
					window.addEventListener('resize',function(){
						unwin.needsFurtherUpdate=true;//force update
						unwin.hasBeenAwayFromPageTopBtm=false;
						unwin.vidzbPrefsDoNotFitUntilResize=false;
						unwin.vidzb_apply_selected_fixes();
					},ucap)//unwin.forcevidzb_apply_selected_fixes();
	//					if(unwin.positionPersistently||!unwin.disableFixes){window.setTimeout(function(){unwin.vidzb_apply_selected_fixes();},10);//doing these on load or else you catch the scroll event we do
	//						unwin.disableFixes=true;	
	//						window.setTimeout(function(){unwin.disableFixes=false;unwin.vidzb_apply_selected_fixes();},550);
	//					}
				//}
				cevents.register(document.body,'mouseup',vidzb_checkForNewLinks);
				//document.addEventListener("DOMNodeInserted", function(){unwin.vidzb_apply_selected_fixes();},false); prefs kill this??
			
			if( unwin.html5autoscrolcredits ){
					/** This is high-level function.
					 * It must react to delta being more/less than zero.
					 */
					function handle(delta) {
						var player=unwin.searchVideoPlayer($g(unwin.ids_video_holder)).firstChild;
								
					    if (delta < 0)
								player.currentTime=player.currentTime+0.25;
					    else{
								player.currentTime=player.currentTime-1;
						}
					}
					
					/** Event handler for mouse wheel event.
					 */
					function wheel(event){
					        var delta=0;
					        if (!event) /* For IE. */
					                event=window.event;
					        if (event.wheelDelta) { /* IE/Opera. */
					                delta=event.wheelDelta/120;
					                /** In Opera 9, delta differs in sign as compared to IE.
					                 */
					                if (window.opera)
					                        delta=-delta;
					        } else if (event.detail) { /** Mozilla case. */
					                /** In Mozilla, sign of delta is different than in IE.
					                 * Also, delta is multiple of 3.
					                 */
					                delta=-event.detail/3;
					        }
					        /** If delta is nonzero, handle it.
					         * Basically, delta is now positive if wheel was scrolled up,
					         * and negative, if wheel was scrolled down.
					         */
					        if (delta)
					                handle(delta);
					        /** Prevent default actions caused by mouse wheel.
					         * That might be ugly, but we handle scrolls somehow
					         * anyway, so don't bother here..
					         */
					        //if (event.preventDefault)
					       //         event.preventDefault();
					//	event.returnValue=false;
					}
					
					/** Initialization code. 
					 * If you use your own event management code, change it as required.
					 */
					if (window.addEventListener)
					        /** DOMMouseScroll is for mozilla. */
					        window.addEventListener('DOMMouseScroll', wheel, false);
					/** IE/Opera. */
					window.onmousewheel=document.onmousewheel=wheel;
			}
			
				//CALL THINGS AT LEAST ONCE (ON DOCUMENT READY<WHICH IS WHEN THE USERSCRIPT STARTS)
				//unwin.vidzb_apply_selected_fixes(); //(AH HA!)
				//unwin.forcevidzb_apply_selected_fixes();
				bigifyComments();
			}
		}else{
			if(chref.indexOf('vidzbigger.com')<=0){
				unwin.vidzb_initialSkinSetup();
				//if( typeof(reinstateHiddenVideo)=='function')reinstateHiddenVideo(unwin.vidzb_GrabNode(unwin.ids_video_holder));
			}
		}
		
		//unwin.vidzb_fmt18ALlLinks();// update video links into HQ video links
		window.setTimeout(function(){unwin.vidzb_fmt18ALlLinks();},1500);
		
		if(unwin.alwaysAnimateVidThumbnails1LOOP){
			window.setInterval(vidzb_animateAllSingleTimeout,1800);
		}
		
		unwin.isdoubleclick=false;
		unwin.dblClickTimer=250;
		
		
	}else{
		//if( typeof(reinstateHiddenVideo)=='function')reinstateHiddenVideo(unwin.vidzb_GrabNode(unwin.ids_video_holder));
	}
	readyToVidsBig=function(){return 'WRONG';}
	
	//If there is a "more" for the description,click it
	if(unwin.autoExpandVideoDescriptions){
		if(_vt('watch-video-details-toggle-less')&&$g('watch-video-details-toggle-less').getElementsByTagName('a').length>0){
			window.setTimeout(function(){unwin.fireMouseEvent($g('watch-video-details-toggle-less').getElementsByTagName('a')[0],'click')},10);
		}
	}
	/*
	<!--div id="player-toggle-switch" class="reverse-tooltip-wrapper">
			<button id="watch-longform-player" class="master-sprite" onclick="yt.www.watch.player.enableWideScreen(!_hasclass(_gel('baseDiv'), 'watch-wide-mode'), true); return false" onmouseover="yt.www.core.toggleSimpleTooltip(this, true)" onmouseout="yt.www.core.toggleSimpleTooltip(this, false)"></button>
			<div class="reverse-tooltip-wrapper-box hid"><div class="reverse-tooltip-box">Change Player Size</div><img class="reverse-tooltip-box-bot" src="http://s.ytimg.com/yt/img/pixel-vfl73.gif"></div>
		</div-->
	*/
	
	unwin.getElementByClassNameAndAssignID($g(unwin.ids_video_holder),'expand-button','watch-longform-player');
	unwin.getElementByClassNameAndAssignID($g(unwin.ids_video_holder),'video-controls','video-controls');
	if(_vt('watch-longform-player')){$g('watch-longform-player').addEventListener('click',function(e){//fail
		if(!unwin['snapfullscreenmode']&&confirm('You must enable (autoclick fullscreen on scroll).  Enable now?\r\n\r\nIf you enable it just scroll to leave fullscreen.')){
			window.setTimeout(function(){if(!unwin['snapfullscreenmode']){unwin['snapfullscreenmode']=true};vidzb_cancelFulscButton();unwin.needToSavePreferences=true;unwin.p_hidePrefs();unwin.checkSavePreferences();},3)
		}else{ vidzb_cancelFulscButton()}
	},false)
	}
	
	//If there is a extra click through for adult videos
	if(unwin.autoConfirmAdultVideos){
		if(document.getElementsByName('action_confirm')[0]){
			window.setTimeout(function(){unwin.fireMouseEvent(document.getElementsByName('action_confirm')[0],'click')},10);
		}
	}
	
	if(_vt(unwin.ids_vb_foot)){
		cpd=document.createElement('div');
		cpd.setAttribute('id','vcopyright');
		cpd.appendChild(document.createTextNode('Thanks for using VidzBigger'));
		$g(unwin.ids_vb_foot).appendChild(cpd);
	}
	
	//LOOPING FUNCTIONS -- only define if jsapi is enabled.  
	if( unwin.enable_jsapi ){
		unwin.vidzbLoopExpectedLoopEnd=0;
		unwin.vidzbLoopTimeoutId=0;
		unwin.resetVdizLoops=function(){
			unwin.vidzbLoopTimerEngaged=false;
			unwin.vidzbLoopTimerStart=0;
			unwin.vidzbLoopTimerEnd=0;
		};unwin.resetVdizLoops();
		unwin.vidzbLoopButtonClicked=function(){
			if( unwin.vidzbLoopTimerEngaged && unwin.vidzbLoopTimerEnd > 0 ){
				unwin.resetVdizLoops();
			}else{
				var player=_vt("movie_player");
				var uwPlayer=getJSobj(player);
				if( unwin.vidzbLoopTimerStart > 0 && !unwin.vidzbLoopTimerEngaged ){
					//loop timer started, set end time and engage looping
					//var d=new Date();
					unwin.vidzbLoopTimerEnd=uwPlayer.getCurrentTime();//d.getTime();
					unwin.vidzbLoopTimerEngaged=true;
					var currentTime=uwPlayer.getCurrentTime();
					unwin.vidzbLoopExpectedLoopEnd=currentTime;
					vidzbLoopButtonEngage();
				}else{
					//loop timer stopped?
					//var d=new Date();
					unwin.vidzbLoopTimerStart=uwPlayer.getCurrentTime();//d.getTime();
					unwin.vidzbLoopTimerEngaged=false;
				}
			}
			_vt('vbstartseconds').value=unwin.vidzbLoopTimerStart;
			_vt('vbendseconds').value=unwin.vidzbLoopTimerEnd;
		}
		unwin.vbGetCurrentPosition=function(){
			var player=_vt("movie_player");var uwPlayer=getJSobj(player);
			var tme=uwPlayer.getCurrentTime();
			if( tme > 0 ) return tme;
			else return 0;
		}
		unwin.vbResetLoopTimersFromFields=function(){		 	
	   	unwin.vidzbLoopTimerStart=_vt('vbstartseconds').value;
			unwin.vidzbLoopTimerEnd=_vt('vbendseconds').value;
			unwin.vidzbLoopTimerEngaged=true;
			unwin.vidzbLoopExpectedLoopEnd=unwin.vidzbLoopTimerEnd;
			vidzbLoopButtonEngage();
		}
		function vidzbLoopButtonEngage(){
			if( unwin.vidzbLoopTimerEngaged && unwin.vidzbLoopTimerEnd > 0 ){
				var player=_vt("movie_player");
				var uwPlayer=getJSobj(player);
				var loopDuration=(unwin.vidzbLoopTimerEnd-unwin.vidzbLoopTimerStart);
				var currentTime=uwPlayer.getCurrentTime();
				if( currentTime >= unwin.vidzbLoopExpectedLoopEnd ){
					//loop
					//alert( 'cur:'+currentTime+' dur:'+loopDuration);
					uwPlayer.seekTo(unwin.vidzbLoopTimerStart);//currentTime-loopDuration,true);
					unwin.clearTimeout(unwin.vidzbLoopTimeoutId);
					unwin.vidzbLoopTimeoutId=window.setTimeout(function(){vidzbLoopButtonEngage()},loopDuration);
				}else{
					//determine distance from loop end..
					loopDuration=unwin.vidzbLoopExpectedLoopEnd-currentTime;//it should always be slower than expected??
					unwin.clearTimeout(unwin.vidzbLoopTimeoutId);
					unwin.vidzbLoopTimeoutId=window.setTimeout(function(){vidzbLoopButtonEngage()},loopDuration);
				}
			}
		}
		unwin.vidzPausePlayer=function(){
			var player=_vt("movie_player");var uwPlayer=getJSobj(player);
			uwPlayer.pauseVideo();
		}
	}
	var loopinited=false;
	function vbinitPassedLoop(){
		if( !loopinited && chref.indexOf('vidloopzstart')>=0 &&  chref.indexOf('vidloopzend')>=0 ){
			unwin.vidzbLoopTimerStart=chref.qslice('vidloopzstart=','&');
			unwin.vidzbLoopTimerEnd=chref.qslice('vidloopzend=','&');
			unwin.vidzbLoopTimerEngaged=true;
			unwin.vidzbLoopExpectedLoopEnd=unwin.vidzbLoopTimerEnd;
			var player=_vt("movie_player");var uwPlayer=getJSobj(player);
			uwPlayer.seekTo(unwin.vidzbLoopTimerStart,true);uwPlayer.playVideo();
			vidzbLoopButtonEngage();
			loopinited=true;
			unwin.autoplay1Rep=false;
		}
	}
	
	//end looping functions
	//if(unwin.vidzbigenabled&&unwin.vidzbigSITEenabled){//redundant if statement...,move this block up to previous if? NOt exactly
	//	this is a space holder in case something breaks, you know what to do >..<
	//}
	
	var endTime=new Date().getTime();
	unwin.startupTimer=((endTime-startTime)/1000);
	//document.title+=" VB:"+unwin.startupTimer;

	//if(false && unwin.snapfullscreenmode){unwin.goFullscreen();}//resume fullscreen if previously fullscreen
	 unwin.vidzb_apply_selected_fixes();//forcevidzb_apply_selected_fixes();//first full apply of fixes
	
	var endTime=new Date().getTime();
	unwin.startupTimer=((endTime-startTime)/1000);
	//document.title+=" VB:"+unwin.startupTimer;
}

function vidzbiggerCheckVersion(){
	versioncheckurl='http://www.vidzbigger.com/version.php?version='+vidz_Version+'&watch='+unwin.isInWatchMode+'&png24='+unwin.prefer_png24bits;
	var nowViewing='&url='+escape(window.location)+'&title='+escape(document.title);unwin.versioncheckurl=new String(versioncheckurl+nowViewing);//unwin.versioncheckurl version not used here
	if(unwin.shareVideoViewStatistics){
	versioncheckurl+=nowViewing//know
	}
	//console.log(versioncheckurl);
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: versioncheckurl,
	  onload: function(responseDetails) 
	 {
	  	//				 VERSION CHECK ! ! ! (important)*************************************************
	  	//return;//uncomment this line (return) to dissable auto update notification
	  	//return;
			var rslt=new String(responseDetails.responseText);
			var versiondata=rslt.qslice('<!--VZB_B-->','<!--VZB_E-->');
			var versionDataBits=decodeIncomingData(versiondata);
			if(versionDataBits['a'] !=undefined && versionDataBits['a'] !='ad'){
				unwin.vidzbadd1_html=versionDataBits['a'].qreplace('width="360"','width="'+unwin.colWidth+'"');
				if(unwin.vidzb_allowMyObnoxiousAds){
					unwin.vb_replacementAds['box']=unwin.vidzbadd1_html;
					unwin.vidzb_removeAdvertisements()//re-apply
				}
				if(_vt('n_vb_div_adz1')) $g('n_vb_div_adz1').innerHTML=unwin.vidzbadd1_html;
			}
			if(versionDataBits['v']>vidz_Version){
				console.log('helloupgrade');
				unwin.latestversion=versionDataBits['v'];
				unwin.latestversionurl=versionDataBits['url'];
				unwin.upgradeMessage=versionDataBits['msg'];
				unwin.defaultFlagMs=versionDataBits['smsg'];	//disliking yo tab getting messed with comment this or change what it says when u got an update
				unwin.defaultOverFlagMs=' &nbsp;Settings & Upgrade!&nbsp;';	//also this to change the rollover when u gots a nupdate
				window.setTimeout(function(){
					if(!unwin.prefsShowing) unwin.p_hidePrefs(true);//refresh tab
					else unwin.p_vidzbShowPrefs();//testing...
				},200);
			}else{
				//alert('noupgrade');
			}
			if(versionDataBits['u']=='1')unwin.userLoggedInStatus=' <span style="color:white;">Welcome - You are Logged In</span>';;
	    //GM_log(responseDetails.responseText)
	  }
	});
}
//you forgot there might be the funny condition contentloaded already fired by this point..... if it were bigger enough..
//detect if running at document start
if(document.body==null){cevents.register(document,'DOMContentLoaded',function(){testReadyToVidzBig();document.removeEventListener("DOMContentLoaded",arguments.callee,false);}); }else{testReadyToVidzBig()};
//if( detectn || document.body==null){cevents.register(window,'load',function(){testReadyToVidzBig();}); }else{testReadyToVidzBig()};
//TODO - can apply before the "load" event (really, DOMContentLoaded)
//IS it possible to miss the contentLoaded event if the content loads so quick it has already loaded??
var ucap=false;
//if we dont need to download this site profile, load it regularly
function testReadyToVidzBig(){
	//if( detectn )document.removeEventListener("DOMNodeInserted", ddnodeInserted,false);
	if( unwin.vbisreadytogo ){
		var endTime=new Date().getTime();
		unwin.startupTimer=((endTime-startTime)/1000);
		//document.title+=" VB:"+unwin.startupTimer;
		
		if( unwin.delayVidzBiggerInit ){
			window.setTimeout(readyToVidsBig,1000);
		}else{
			readyToVidsBig();
		}
	}
}
