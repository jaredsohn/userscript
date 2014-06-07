// ==UserScript==
// @id             				AutoLoadImags.Function
// @name           				Auto Load Imags On LV1 (Function)
// @author         				Tast
// @version        				1.0
// @description    				Auto Load Imags On LV1 (Function)
// ==/UserScript==

function isImageOk(img) { // http://tw.newtonstudio.com/?p=59
    if (!img.complete || (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0)) {
        return false;
    }
    return true;
}

function Images_Checking(){
	var ImgsLink = '';
    for (var i = 0; i < document.images.length; i++) {
        if (!isImageOk(document.images[i]) && !document.images[i].src.match('data')) {
            document.images[i].src = document.images[i].src + "#";
        }
		ChangeImg(document.images[i]);
    }
	//if(ImgsLink) alert(ImgsLink);
	
	var ImgHideDiv = document.getElementsByTagName('div')
	for (var i = 0; i < ImgHideDiv.length; i++) {
		var ImgHideDivN = ImgHideDiv[i];
		ImgHideDivN.addEventListener("DOMAttrModified",function (DomTarget){
			for (var i = 0; i < document.images.length; i++) {
				ChangeImg(document.images[i]);
			}
		},false);
	}
}

//GM_registerMenuCommand("圖片縮圖測試", Images_Checking);

function ChangeImg(e) {
	var MaxWidth = 800;
	var MaxHeight = 700;
	/*
	if(!e.offsetWidth || !e.offsetHeight){
		e.offsetWidth = e.naturalWidth;
		e.offsetHeight = e.naturalHeight;
	}
	*/
	var HeightWidth = e.offsetHeight / e.offsetWidth;
	var WidthHeight = e.offsetWidth / e.offsetHeight;
	
	if (e.offsetWidth > MaxWidth) {
		e.width = MaxWidth;
		e.height = MaxWidth * HeightWidth;
	}
	
	if (e.offsetHeight > MaxHeight) {
		e.height = MaxHeight;
		e.width = MaxHeight * WidthHeight;
	}
}

function URL_Compatibility(insertURL){
	if(url.match('http://lv1.in')) 			return insertURL.replace('http://www.lv1.in','http://lv1.in');
	else if(url.match('http://www.lv1.in')) return insertURL.replace('http://lv1.in','http://www.lv1.in');
	else 									return 'http://lv1.in';
	//Error
}

function get_cookies_array() {
    var cookies = { };

    if (document.cookie && document.cookie != '') {
        var split = document.cookie.split(';');
        for (var i = 0; i < split.length; i++) {
            var name_value = split[i].split("=");
            name_value[0] = name_value[0].replace(/^ /, '');
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(name_value[1]);
        }
    }

    return cookies;
   
}
/*
var cookies = get_cookies_array();
for(var name in cookies) {
  //document.write( name + " : " + cookies[name] + "<br />" );
  alert(name + " : " + cookies[name] + "<br />");
}
*/
function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	if(is_chrome){
		return readCookie(c_name);
	}
	else {
		for (i=0;i<ARRcookies.length;i++){
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			
			if (x==c_name){
				return unescape(y);
			}
		}
	}
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function getQueryString( paramName,paramURL){
	paramName = paramName .replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]").toLowerCase();
	//alert(paramName);
	var reg = "[\\?&]"+paramName +"=([^&#]*)";
	var regex = new RegExp( reg );
	var regResults = regex.exec( paramURL.toLowerCase());
	if( regResults == null ) {
		   //alert(regResults);
		   return "";
	} else {
		   //alert(regResults[1]);
		   return regResults [1];
	}
}

function SubmitOutput(){
	if(!url.match('bbs.php') && !url.match('edit.php') && !url.match('read.php')) return ;
	
	var smit = document.getElementsByName("submit");
	if(smit[0].value == "確定"){
		if(Vcbox_ShortcutAlert && confirm("確定送出修改??")  || !Vcbox_ShortcutAlert)
			smit[0].click();
	}
	else if(smit[0].value == "貼新文章"){
		if(Vcbox_ShortcutAlert && confirm("確定送出新文章??") || !Vcbox_ShortcutAlert){
			if(document.getElementById('btnSign'))
					document.getElementById('btnSign').click();
			else 	smit[0].click();
		}
	}
	else if(smit[0].value == "送出"){
		if(Vcbox_ShortcutAlert && confirm("確定送出回覆??") || !Vcbox_ShortcutAlert){
			if(document.getElementById('MESSAGE').value)
				smit[0].click();
		}
	}
	
}

function KeyUsing(){
	addEventListener("keydown", keyDownOut, false);
	addEventListener("keyup", keyUpOut, false);
	
	window.addEventListener("blur",function () {
		keyEnter = 0; //13
		keyCtrl = 0 ; //17
		Ctrlfirst = 0;
	},false);
	
	window.addEventListener("focus",function () {
		keyEnter = 0; //13
		keyCtrl = 0 ; //17
		Ctrlfirst = 0;
	},false);
}

var keyEnter = 0; //13
var keyCtrl = 0 ; //17
var Ctrlfirst = 0;
function KeyUse(KeyCode,type){
	if(!type){
		if(KeyCode == 13){
			if(keyCtrl) Ctrlfirst = 1
			keyEnter = 1;
		}
		if(KeyCode == 17) keyCtrl = 1;
		
		if(keyEnter && keyCtrl && Ctrlfirst){
            SubmitOutput();
			keyEnter = 0;
			keyCtrl = 0;
			Ctrlfirst = 0;
        }
	}
	else {
		if(KeyCode == 13) keyEnter = 0;
		if(KeyCode == 17) keyCtrl = 0;
		Ctrlfirst = 0;
	}
}

function keyDownOut(e) {
    var keyCode = e.keyCode;
    //alert(keyCode);
	if(keyCode == 13
	|| keyCode == 17) KeyUse(keyCode,0);
}

function keyUpOut(e){
    //alert(e.keyCode);
    var keyCode = e.keyCode;
	if(keyCode == 13 
	|| keyCode == 17) KeyUse(keyCode,1);
}

function InsertCSS(TargetUrl){
	var headID = document.getElementsByTagName("head")[0];         
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = TargetUrl;
	cssNode.media = 'screen';
	headID.appendChild(cssNode);
}

function RemoveC(Target){
	Target.parentNode.removeChild(Target);
}

function InsertsJS(TargetUrl){
	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = TargetUrl;
	headID.appendChild(newScript);
}

function smartslider(){
	GM_addStyle(
		'.jscroller{position: static;z-index: 998;}'+
		'.slider{position: absolute;z-index: 1000;}'+
		'.inner{width: 1px;height: 100%;z-index: 999;}'+
		'.lgripper{position: relative;z-index: 1001;top: 0px;border: none;outline: none;}'+
		'.ticks{list-style: none;margin: 0;padding: 0;float: left;position: absolute;z-index: 997;}'+
		'.ticks li{display: inline;float: left;font-size: xx-small;}'+
		'.slider.style1{background-color: #D7D7D7;border: solid 1px #B6B6B6;-moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) inset;-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) inset;}'+
		'.inner.style1{background-color: #DFECF4;-moz-box-shadow: 0 1px 2px rgba(17, 35, 45, 0.6) inset;-webkit-box-shadow: 0 1px 2px rgba(17, 35, 45, 0.6) inset;}'+
		'.lgripper.style1{background: url(' + GM_getResourceURL('tracker') + ') 0px 0px no-repeat;}'+

		'.slider.style2{background-color: #D7D7D7;border: solid 4px #888F97;-moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) inset;-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) inset;}'+
		'.inner.style2{background-color: #DFECF4; -moz-box-shadow: 0 1px 2px rgba(17, 35, 45, 0.6) inset;-webkit-box-shadow: 0 1px 2px rgba(17, 35, 45, 0.6) inset;}'+
		'.lgripper.style2{background: url(' + GM_getResourceURL('tracker_black') + ') 0px 0px no-repeat;}'+

		'.slider.style3{background-color: #D7D7D7;border: solid 2px #888F97;-moz-box-shadow: 2 1px 2px #000 inset;-webkit-box-shadow: 2 1px 2px #000 inset;}'+
		'.inner.style3{background-image:url(' + GM_getResourceURL('gradient_red') + ');background-repeat:repeat-x;-moz-box-shadow: 2 1px 2px rgba(17, 35, 45, 0.6) inset;-webkit-box-shadow: 2 1px 2px rgba(17, 35, 45, 0.6) inset;}'+
		'.lgripper.style3{background: url(' + GM_getResourceURL('tracker_simple') + ') 0px 0px no-repeat;}'
	);
}

function niutuku(){
	GM_addStyle(
		'body,h1,h2,h3,p,quote,small,form,input,ul,li,ol,label{margin:0px;padding:0px;}'+
		'body{color:#cccccc;font-size:13px;background: #302b23;font-family:Arial, Helvetica, sans-serif;}'+
		'ul{margin:0;padding:0;}'+
		'ul.container{width:240px;margin:0 auto;padding:50px;}'+
		'li{list-style:none;text-align:left;	}'+
		'li.menu{padding:5px 0;width:100%;	}'+
		'li.button a{display:block;font-family:BPreplay,Arial,Helvetica,sans-serif;font-size:21px;height:34px;overflow:hidden;padding:10px 20px 0;position:relative;width:70%;}'+
		'li.button a:hover{text-decoration:none;}'+
		'li.button a span{height:44px;position:absolute;right:0;top:0;width:4px;display:block;}'+
		'li.button a.blue{background:url(' + GM_getResourceURL('easing_blue') + ') repeat-x top left; color:#074384;}'+
		'li.button a.blue span{ background:url(' + GM_getResourceURL('easing_blue') + ') repeat-x top right;}'+
		'li.button a.green{background:url(' + GM_getResourceURL('easing_green') + ') repeat-x top left; color:#436800;}'+
		'li.button a.green span{ background:url(' + GM_getResourceURL('easing_green') + ') repeat-x top right;}'+
		'li.button a.orange{background:url(' + GM_getResourceURL('easing_orange') + ') repeat-x top left; color:#882e02;}'+
		'li.button a.orange span{ background:url(' + GM_getResourceURL('easing_orange') + ') repeat-x top right;}'+
		'li.button a.red{background:url(' + GM_getResourceURL('easing_red') + ') repeat-x top left; color:#641603;}'+
		'li.button a.red span{ background:url(' + GM_getResourceURL('easing_red') + ') repeat-x top right;}'+
		'li.button a:hover{ background-position:bottom left;}'+
		'li.button a:hover span{ background-position:bottom right;}'+
		'.dropdown{display:none;padding-top:5px;width:100%;}'+
		'.dropdown li{background-color:#373128;border:1px solid #40392C;color:#CCCCCC;margin:5px 0;padding:4px 18px;}'+
		'h1{font-family:"Myriad Pro",Arial,Helvetica,sans-serif;font-size:36px;font-weight:normal;margin-bottom:15px;}'+
		'h2{font-family:"Myriad Pro",Arial,Helvetica,sans-serif;font-size:12px;font-weight:normal;padding-right:140px;right:0;text-align:right;text-transform:uppercase;top:15px;}'+
		'.clear{clear:both;}'+
		'#main{margin:15px auto;text-align:center;width:920px;position:relative;}'+
		'a, a:visited {color:#0196e3;text-decoration:none;outline:none;}'+
		'a:hover{text-decoration:underline;}'+
		'p{padding:10px;text-align:center;}'
	);
}
function SideWay(data){
	//alert(data.body);
	//alert(data.head);
	
	var ImgsLink = '';
	var ImgLink = '';
	var ImgCounter = 0;
	for (var i = 0; i < document.images.length; i++) {
		//ImgsLink = document.images[i].src;
		if(!document.images[i].src.match('p_logo') 
		&& !document.images[i].src.match('img/lv') 
		&& !document.images[i].src.match('data')
		&& !document.images[i].src.match('lib')){
			if(!ImgLink) ImgLink = document.images[i].src;
			ImgsLink = ImgsLink  + 
			'<a href="' + document.images[i].src + '" class="thumb_link"><span class="selected"></span>'+
			'<div style="display:block;height:91px;width:145px;text-align:middle" align="center">'+
				'<img src="' + document.images[i].src + '" class="thumb" />'+
			'</div>'+
			'</a>';
			ImgCounter++
		}
    }
	//alert(ImgsLink);
	if(!ImgCounter){
		alert('無法轉換畫廊模式(無圖可用)');
		return;
	}
	
	document.head.innerHTML = GM_getResourceText('SideWays');
	document.body.innerHTML = GM_getResourceText('SideWaysBody')
		.replace('CheckFlag_InnerIMGs',ImgsLink)
		//.replace('imgs/space/Universe_and_planets_digital_art_wallpaper_lucernarium.jpg',ImgLink)
		.replace('imgs/space/Universe_and_planets_digital_art_wallpaper_lucernarium.jpg','http://i.minus.com/i0e9iGYI4jv71.png')
		.replace('Supremus Lucernarium','Starter');
		
	$(document).bind('keydown', 'esc', function (evt){
		document.body.innerHTML = data.body;
		document.head.innerHTML = data.head;
		
		lv1Read();
		Func_Talking(1500);
		
		return false;
	});
	//alert(document.head.innerHTML);
//======================================================================================
//modify
	//set default view mode
	$defaultViewMode="fit"; //full (fullscreen background), fit (fit to window), original (no scale)
	//cache vars
	$bg=$("#bg");
	$bgimg=$("#bg #bgimg");
	$preloader=$("#preloader");
	$outer_container=$("#outer_container");
	$outer_container_a=$("#outer_container a.thumb_link");
	$toolbar=$("#toolbar");
	$nextimage_tip=$("#nextimage_tip");
	
//$(window).load(function() {
Loadin();
function Loadin(){
	$toolbar.data("imageViewMode",$defaultViewMode); //default view mode
	ImageViewMode($toolbar.data("imageViewMode"));
	//cache vars
	$customScrollBox=$("#customScrollBox");
	$customScrollBox_container=$("#customScrollBox .container");
	$customScrollBox_content=$("#customScrollBox .content");
	$dragger_container=$("#dragger_container");
	$dragger=$("#dragger");
	
	$( "#bg" ).draggable({ axis: "x" });
	
	Images_Checking();
	function Images_Checking(){
		for (var i = 0; i < document.images.length; i++) {
			ChangeImg(document.images[i]);
		}
	}
	
	function ChangeImg(e) {
		var MaxWidth = 145;
		var MaxHeight = 91;
		var HeightWidth = e.offsetHeight / e.offsetWidth;
		var WidthHeight = e.offsetWidth / e.offsetHeight;
		
		if (e.offsetWidth > MaxWidth) {
			e.width = MaxWidth;
			e.height = MaxWidth * HeightWidth;
		}
		
		if (e.offsetHeight > MaxHeight) {
			e.height = MaxHeight;
			e.width = MaxHeight * WidthHeight;
		}
		
		//$(e).center({ horizontal: true, vertical: true });
	}
	
	CustomScroller();
	function CustomScroller(){
		outerMargin=0;
		innerMargin=20;
		$customScrollBox.height($(window).height()-outerMargin);
		$dragger_container.height($(window).height()-innerMargin);
		visibleHeight=$(window).height()-outerMargin;
		if($customScrollBox_container.height()>visibleHeight){ //custom scroll depends on content height
			$dragger_container,$dragger.css("display","block");
			totalContent=$customScrollBox_content.height();
			draggerContainerHeight=$(window).height()-innerMargin;
			animSpeed=400; //animation speed
			easeType="easeOutCirc"; //easing type
			bottomSpace=1.05; //bottom scrolling space
			targY=0;
			draggerHeight=$dragger.height();
			$dragger.draggable({ 
				axis: "y", 
				containment: "parent", 
				drag: function(event, ui) {
					Scroll();
				}, 
				stop: function(event, ui) {
					DraggerOut();
				}
			});

			//scrollbar click
			$dragger_container.click(function(e) {
				var mouseCoord=(e.pageY - $(this).offset().top);
				var targetPos=mouseCoord+$dragger.height();
				if(targetPos<draggerContainerHeight){
					$dragger.css("top",mouseCoord);
					Scroll();
				} else {
					$dragger.css("top",draggerContainerHeight-$dragger.height());
					Scroll();
				}
			});

			//mousewheel
			//$(function($) {
				$customScrollBox.bind("mousewheel", function(event, delta) {
					vel = Math.abs(delta*10);
					$dragger.css("top", $dragger.position().top-(delta*vel));
					Scroll();
					if($dragger.position().top<0){
						$dragger.css("top", 0);
						$customScrollBox_container.stop();
						Scroll();
					}
					if($dragger.position().top>draggerContainerHeight-$dragger.height()){
						$dragger.css("top", draggerContainerHeight-$dragger.height());
						$customScrollBox_container.stop();
						Scroll();
					}
					return false;
				});
			//});

			function Scroll(){
				var scrollAmount=(totalContent-(visibleHeight/bottomSpace))/(draggerContainerHeight-draggerHeight);
				var draggerY=$dragger.position().top;
				targY=-draggerY*scrollAmount;
				var thePos=$customScrollBox_container.position().top-targY;
				$customScrollBox_container.stop().animate({top: "-="+thePos}, animSpeed, easeType); //with easing
				//$customScrollBox_container.stop().animate({top: "-="+thePos}); //with easing
			}

			//dragger hover
			$dragger.mouseup(function(){
				DraggerOut();
			}).mousedown(function(){
				DraggerOver();
			});

			function DraggerOver(){
				$dragger.css("background", "url(http://i.minus.com/iblKz2ht4MlzJU.png)");
			}

			function DraggerOut(){
				$dragger.css("background", "url(http://i.minus.com/in6SPt37zBmjL.png)");
			}
		} else { //hide custom scrollbar if content is short
			$dragger,$dragger_container.css("display","none");
		}
	}

	//resize browser window functions
	
	$(window).resize(function() {
		FullScreenBackground("#bgimg"); //scale bg image
		$dragger.css("top",0); //reset content scroll
		$customScrollBox_container.css("top",0);
		$customScrollBox.unbind("mousewheel");
		CustomScroller();
	});
	LargeImageLoad($bgimg);
};
//});
	
	//loading bg image
	$bgimg.load(function() {
		LargeImageLoad($(this));
	});
	
	function LargeImageLoad($this){
		$preloader.fadeOut("fast"); //hide preloader
		$this.removeAttr("width").removeAttr("height").css({ width: "", height: "" }); //lose all previous dimensions in order to rescale new image data
		$bg.data("originalImageWidth",$this.width()).data("originalImageHeight",$this.height());
		if($bg.data("newTitle")){
			$this.attr("title",$bg.data("newTitle")); //set new image title attribute
		}
		FullScreenBackground($this); //scale new image
		$bg.data("nextImage",$($outer_container.data("selectedThumb")).next().attr("href")); //get and store next image
		$bg.data("prevImage",$($outer_container.data("selectedThumb")).prev().attr("href")); //get and store prev image
		if(typeof itemIndex!="undefined"){
			if(itemIndex==lastItemIndex){ //check if it is the last image
				$bg.data("lastImageReached","Y");
				$bg.data("nextImage",$outer_container_a.first().attr("href")); //get and store next image
			} else {
				$bg.data("lastImageReached","N");
			}
		} else {
			$bg.data("lastImageReached","N");
		}
		$this.fadeIn("slow"); //fadein background image
		if($bg.data("nextImage") || $bg.data("lastImageReached")=="Y"){ //don't close thumbs pane on 1st load
			SlidePanels("close"); //close the left pane
		}
		NextImageTip();
	}

	//slide in/out left pane
	$outer_container.hover(
		function(){ //mouse over
			SlidePanels("open");
		},
		function(){ //mouse out
			SlidePanels("close");
		}
	);
	
	//Clicking on thumbnail changes the background image
	$outer_container_a.click(function(event){
		event.preventDefault();
		var $this=this;
		$bgimg.css("display","none");
		$preloader.fadeIn("fast"); //show preloader
		//style clicked thumbnail
		$outer_container_a.each(function() {
    		$(this).children(".selected").css("display","none");
  		});
		$(this).children(".selected").css("display","block");
		//get and store next image and selected thumb 
		$outer_container.data("selectedThumb",$this); 
		$bg.data("nextImage",$(this).next().attr("href")); 	
		$bg.data("prevImage",$(this).prev().attr("href")); 	
		$bg.data("newTitle",$(this).children("img").attr("title")); //get and store new image title attribute
		itemIndex=getIndex($this); //get clicked item index
		lastItemIndex=($outer_container_a.length)-1; //get last item index
		$bgimg.attr("src", "").attr("src", $this); //switch image
	}); 
	
	$("#bg").mousewheel(function(event, delta){
		//alert(delta);
		if(delta < 0) $bgimg.click();
		else if(delta > 0){
			var $this=$bgimg;
			if($bg.data("prevImage")){ //if next image data is stored
				$this.css("display","none");
				$preloader.fadeIn("fast"); //show preloader
				$($outer_container.data("selectedThumb")).children(".selected").css("display","none"); //deselect thumb
				if($bg.data("lastImageReached")!="Y"){
					$($outer_container.data("selectedThumb")).prev().children(".selected").css("display","block"); //select new thumb
				} else {
					$outer_container_a.first().children(".selected").css("display","block"); //select new thumb - first
				}
				//store new selected thumb
				var selThumb=$outer_container.data("selectedThumb");
				if($bg.data("lastImageReached")!="Y"){
					$outer_container.data("selectedThumb",$(selThumb).prev()); 
				} else {
					$outer_container.data("selectedThumb",$outer_container_a.first()); 
				}
				$bg.data("newTitle",$($outer_container.data("selectedThumb")).children("img").attr("title")); //get and store new image title attribute
				if($bg.data("lastImageReached")!="Y"){
					itemIndex++;
				} else {
					itemIndex=0;
				}
				$this.attr("src", "").attr("src", $bg.data("prevImage")); //switch image
			}
		}
		return false;
	});

	//clicking on large image loads the next one
	$bgimg.click(function(event){
		var $this=$(this);
		if($bg.data("nextImage")){ //if next image data is stored
			$this.css("display","none");
			$preloader.fadeIn("fast"); //show preloader
			$($outer_container.data("selectedThumb")).children(".selected").css("display","none"); //deselect thumb
			if($bg.data("lastImageReached")!="Y"){
				$($outer_container.data("selectedThumb")).next().children(".selected").css("display","block"); //select new thumb
			} else {
				$outer_container_a.first().children(".selected").css("display","block"); //select new thumb - first
			}
			//store new selected thumb
			var selThumb=$outer_container.data("selectedThumb");
			if($bg.data("lastImageReached")!="Y"){
				$outer_container.data("selectedThumb",$(selThumb).next()); 
			} else {
				$outer_container.data("selectedThumb",$outer_container_a.first()); 
			}
			$bg.data("newTitle",$($outer_container.data("selectedThumb")).children("img").attr("title")); //get and store new image title attribute
			if($bg.data("lastImageReached")!="Y"){
				itemIndex++;
			} else {
				itemIndex=0;
			}
			$this.attr("src", "").attr("src", $bg.data("nextImage")); //switch image
		}
	});
	
	//function to get element index (fuck you IE!)
	function getIndex(theItem){
		for ( var i = 0, length = $outer_container_a.length; i < length; i++ ) {
			if ( $outer_container_a[i] === theItem ) {
				return i;
			}
		}
	}
	
	//toolbar (image view mode button) hover
	$toolbar.hover(
		function(){ //mouse over
			$(this).stop().fadeTo("fast",1);
		},
		function(){ //mouse out
			$(this).stop().fadeTo("fast",0.8);
		}
	); 
	$toolbar.stop().fadeTo("fast",0.8); //set its original state
	
	//Clicking on toolbar changes the image view mode
	$toolbar.click(function(event){
		if($toolbar.data("imageViewMode")=="full"){
			ImageViewMode("fit");
		} else if($toolbar.data("imageViewMode")=="fit") {
			ImageViewMode("original");
		} else if($toolbar.data("imageViewMode")=="original"){
			ImageViewMode("full");
		}
	});

	//next image balloon tip
	function NextImageTip(){
		if($bg.data("nextImage")){ //check if this is the first image
			$nextimage_tip.stop().css("right",20).fadeIn("fast").fadeOut(2000,"easeInExpo",function(){$nextimage_tip.css("right",$(window).width());});
		}
	}

	//slide in/out left pane function
	function SlidePanels(action){
		var speed=900;
		var easing="easeInOutExpo";
		if(action=="open"){
			$("#arrow_indicator").fadeTo("fast",0);
			$outer_container.stop().animate({left: 0}, speed,easing);
			$bg.stop().animate({left: 585}, speed,easing);
		} else {
			$outer_container.stop().animate({left: -710}, speed,easing);
			$bg.stop().animate({left: 0}, speed,easing,function(){$("#arrow_indicator").fadeTo("fast",1);});
		}
	}

//Image scale function
function FullScreenBackground(theItem){
	var winWidth=$(window).width();
	var winHeight=$(window).height();
	var imageWidth=$(theItem).width();
	var imageHeight=$(theItem).height();
	if($toolbar.data("imageViewMode")!="original"){ //scale
		$(theItem).removeClass("with_border").removeClass("with_shadow"); //remove extra styles of orininal view mode
		var picHeight = imageHeight / imageWidth;
		var picWidth = imageWidth / imageHeight;
		if($toolbar.data("imageViewMode")!="fit"){ //image view mode: full
			if ((winHeight / winWidth) < picHeight) {
				$(theItem).css("width",winWidth).css("height",picHeight*winWidth);
			} else {
				$(theItem).css("height",winHeight).css("width",picWidth*winHeight);
			};
		} else { //image view mode: fit
			if(imageWidth > winWidth || imageHeight > winHeight){
				if ((winHeight / winWidth) > picHeight) {
					$(theItem).css("width",winWidth).css("height",picHeight*winWidth);
				} else {
					$(theItem).css("height",winHeight).css("width",picWidth*winHeight);
				};
			};
		};
		//center it
		$(theItem).css("margin-left",((winWidth - $(theItem).width())/2)).css("margin-top",((winHeight - $(theItem).height())/2));
	} else { //no scale
		//add extra styles for orininal view mode
		$(theItem).addClass("with_border").addClass("with_shadow");
		//set original dimensions
		$(theItem).css("width",$bg.data("originalImageWidth")).css("height",$bg.data("originalImageHeight"));
		//center it
		$(theItem).css("margin-left",((winWidth-$(theItem).outerWidth())/2)).css("margin-top",((winHeight-$(theItem).outerHeight())/2));
	}
}

//image view mode function - full or fit
function ImageViewMode(theMode){
	$toolbar.data("imageViewMode", theMode); //store new mode
	FullScreenBackground($bgimg); //scale bg image
	//re-style button
	if(theMode=="full"){
		$toolbar.html("<span class='lightgrey'>IMAGE VIEW MODE &rsaquo;</span> FULL");
	} else if(theMode=="fit") {
		$toolbar.html("<span class='lightgrey'>IMAGE VIEW MODE &rsaquo;</span> FIT");
	} else {
		$toolbar.html("<span class='lightgrey'>IMAGE VIEW MODE &rsaquo;</span> ORIGINAL");
	}
}

//preload script images
var images=["http://i.minus.com/i9G5NzjRTp5Oi.gif","http://i.minus.com/iblKz2ht4MlzJU.png"];
$.each(images, function(i) {
  images[i] = new Image();
  images[i].src = this;
});
}