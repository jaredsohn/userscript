// ==UserScript==
// @name           hjzlg
// @namespace      Petertangyix
// @description    improve UI
// @include        http://hjzlg.com/dz/*
// @include        http://hjzlg.com/rh/*
// @include        http://hjzlg.com/kz/*
// @include        file:///D:/Petertangyix/Code/Developer/hjzlg/VideoPage/play001.html
// @exclude        http://hjzlg.com/*/
// ==/UserScript==
//==================CreateGMmenu=========================//
//GM_setValue, GM_getValue, GM_deleteValue, GM_registerMenuCommand
//url("http://i313.photobucket.com/albums/ll381/newid2/20101211.jpg")
(function(){
var tyxImgUrl=GM_getValue("bg_URL");
if(tyxImgUrl){
	document.body.style.backgroundImage =  'url("'+tyxImgUrl+'")';
}else{
	if(confirm("You haven't set any background Image yet. Do you want to set it now?")){
		setBgImg();
	}else{
		return;
	}
}
})()
function setBgImg(){
	var tyxImgUrlOrig = GM_getValue("bg_URL");
	var tyxImgUrl = prompt("Page Background Image(absolute Url):", tyxImgUrlOrig || "http://i313.photobucket.com/albums/ll381/newid2/20101211.jpg" );
	document.body.style.backgroundImage =  'url("'+tyxImgUrl+'")';
	if(confirm("Is this what you want?")){
		GM_setValue("bg_URL", tyxImgUrl );
	}else{
		if(confirm("Do you want to try again?")){
			setBgImg();
		}else{
			GM_setValue("bg_URL", tyxImgUrlOrig);
			document.body.style.backgroundImage=tyxImgUrlOrig;
		}
	}
}
function deleteBgImg(){
	GM_deleteValue("bg_URL");
	document.body.style.backgroundImage="";
}
GM_registerMenuCommand("Set Background Image", setBgImg);
GM_registerMenuCommand("Delete Background Image", deleteBgImg);
//===================CSS========================//
(function(){
var tyxTemp=<![CDATA[
/*Override Original CSS - Hide Useless Elements*/
#header, #classpage{display:none;}
/*====================================================*/
*{margin:0; padding:0; border: none;}
html {
	display:table !important;
	width:100% !important;height:100% !important;
}
body{
	display:table-cell !important; vertical-align:middle;
	background:#fff fixed no-repeat center;/*background: -moz-radial-gradient(circle, #618040, #011100);*/
	font-size:12px; font-weight:bold;
}
#tyxAllContainer{
	margin: 0 auto; 
	width: 630px;height:680px;
	-moz-transition: all 0.5s linear;
}
.plTransparent, #tyxPlaylistContainer.plTransparent, #tyxScrollPanel.plTransparent, #tyxSlidePanel.plTransparent{ 
opacity: 0; z-index: -99;}
/*=====================Video Container===============================*/
#tyxVideoContainer{ 
	position:relative;
	overflow:hidden;
	width:630px;height:550px;
	background:#fff;
	-moz-border-radius-topleft:15px;-moz-border-radius-topright:15px;
	-moz-border-radius-bottomleft:60px 35px;-moz-border-radius-bottomright:60px 35px;
	-moz-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.6);
	-moz-transition:all 0.5s linear;
	z-index:1;
}
/*--------------------VideoPanel-----------------------*/
#tyxVideoPanel {
	overflow:hidden;
	margin: 15px auto 0;
	width: 600px; height:500px;
	border:none;
	-moz-transition:all 0.5s linear;
}
#playerObject{ width:800px !important; margin-left: -205px !important;}
#movie_player{ width:600px; height:500px; margin: 0; overflow:hidden;position:relative;/*z-index:4 !important;*/-moz-transition:all 0.5s linear;}
/*--------------------ControlPanel-----------------------*/
#tyxControlPanel {
	/*position:absolute;bottom:0;*/
	position:relative;
	margin:0 auto;
	width: 630px;height: 35px;
	text-align:center;
	z-index:100;
}
#tyxControlPanel>span{
	display: inline-block;
	width: 45px; height:35px;
	background: -moz-linear-gradient(bottom, #84a912, rgba(132,169,18,0)) #B2D740;
	vertical-align:top;
	-moz-transition:all 0.5s ease-in-out;
}
#tyxControlPanel>span:hover, #tyxControlPanel>span ul li:hover{
	cursor: pointer;
	background: -moz-linear-gradient(bottom, #8D1515,rgba(141,21,21,0)) #C82C2C no-repeat;
}
#tyxControlPanel>span.unClickable, #tyxControlPanel>span ul li.unClickable{
	background: -moz-linear-gradient(top, #B4B8BA, #808385);
	/*-moz-box-shadow: #000 0 0 0 1px inset !important;*/
	cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAb5JREFUeNqkUzFLw0AU%2Fs5UsUUs2VVcKkXcDnFSBJd2sUMREcShS12E0qEuHfMXBOcu%2FoWi4OLa0kEDgp2k0iWoSBxsE%2BN7l0uNVqcGXu%2Fufe%2F77st7qQiCAJM8U5jwSfDPhRAQtBpAjhaLou4DTS9W9Btj3wfkPu4gR4C1d3oq%2FbAw9xvbrVTGMCVASdBt1n6tJm3bRrFald53YY73O6WS7Ha72Dw8VJivBQQ3sSGEuoVsWYVyWXY6HWSzWVw2Gm0GNgoF2e%2F3kU6ncXt11abqOqWbR8QdCQShCyWyXSzK7sODIriui6deD7PJJNzHR0WmnjT5yjGBYfg6SmQxk5HPjqNsGoaBN8dRZGpmc5qtawE1hSedmNEd5%2F3w9RWpqFO%2Br8S1Swz0fuw7CHTDVkxTJj0Pc5SLgnOMBT%2Bn83OMdIu1QYURqfPy0uaIzowN%2FxqjF76%2FlY%2BRr4lI%2BTrHdUwkr0W8kW1qxBKt%2B6RaBVr3phnwyudlyi%2F%2Fgy1prpqCEGKBzikJbK0BxzZw1gJuKPdB8cn9XSdsFTi5A87bIfZO3F4kMK%2BHEE3I0%2BHrhht6QAltnIcyIO6bmPTv%2FCXAACPM0BMSi5H%2BAAAAAElFTkSuQmCC"), -moz-zoom-in !important;
	-moz-transition:all 0.5s ease-in-out;
}
#tyxControlPanel>span.first{-moz-border-radius-topleft:5px;-moz-border-radius-bottomleft:5px;}
#tyxControlPanel>span.last{-moz-border-radius-topright:5px;-moz-border-radius-bottomright:5px;}
#tyxControlPanel>span img{-moz-transition:all 1.0s linear;}
#tyxControlPanel>span img.rotated{-moz-transform:rotate(180deg);}
/*===================Menu==============================*/
#tyxControlPanel span ul{
	opacity:0;
	position:absolute;overflow:hidden;
	top:0; margin:0;
	white-space: nowrap;
	-moz-transition:opacity 0.8s ease-in;
}
#tyxControlPanel span ul:hover{
	opacity:1;
}
#tyxControlPanel span ul li{
	display: block;
	padding:0;
	width:45px;height:18px;line-height:18px;
	color:#fff; text-shadow: 1px 1px 0 #1B3B6A, 0 0 5px #1B3B6A;
	background: -moz-linear-gradient(bottom, #84a912, rgba(132,169,18,0)) #B2D740;
	list-style: none outside none;
	-moz-transition:all 0.5s ease-in-out;
}
/*=====================PlaylistContainer===============================*/
#tyxPlaylistContainer{
	margin:-35px auto 0;
	width:530px;
	-moz-transition: all 1.0s ease-in-out;/*for Withdraw Playlist*/
}
/*=====================ScrollPanel===============================*/
#tyxScrollPanel{
	position:absolute; overflow:hidden;
	margin: 0; width:530px;padding: 35px 0 0;
	-moz-transition: opacity 1.0s ease-in-out;/*for Transparent*/
}
#tyxScrollPage{
	overflow-x:hidden; overflow-y:scroll;
	margin: 5px 0 0; padding: 0px 20px;
	width:507px; height: 90px; 
	border: none;
	text-align: center;
}
#tyxScrollPage a{
	overflow:hidden; display: inline-block; direction:rtl; white-space:nowrap; 
	margin:8px 0;
	width: 33%;height: 14px;line-height: 14px;
	background-color: transparent !important;/*override inline style, may delete it in the future*/ 
 	color:#f33; text-shadow: 0em 0em 0.2em #000;  text-decoration: none;
 	-moz-transition: all 0.5s ease-in;
}
#tyxScrollPage a:not([style]):hover{
	color:#fff; text-shadow: 0em 0em 0.2em #aaf;
	-moz-transform: scale(1.5,1.5); 
}
#tyxScrollPage a span{ color: #ceb; cursor: text; z-index:-1;}
/*=====================SlidePanel===============================*/
#tyxSlidePanel{
	position:relative;/*for the use of 2 masks*/
	overflow:hidden;
	padding-top: 35px;
	background-color:#daf3fc; 
	-moz-border-radius-bottomleft:30px;-moz-border-radius-bottomright:30px;
	-moz-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.6);
	-moz-transition: all 1.0s ease-in-out;
}
#tyxSlideContainer{
	padding:5px 0;
	overflow:hidden;
	width:530px;
}
#tyxSlidePage{
	margin:0;padding:0;
	display:inline-block;
	height:90px;
	-moz-transition:all 1.0s ease-in-out;
}
#tyxMaskLeft{
	position:absolute;top:40px; 
	width:40px; height:90px;
	background: -moz-linear-gradient(left, #daf3fc, rgba(218,243,252,0) 40px);
}
#tyxMaskRight{
	position:absolute;top:40px; right:0;
	width:40px; height:90px;
	background: -moz-linear-gradient(right, #daf3fc, rgba(218,243,252,0) 40px);
}
#tyxSlideControl{
	margin:0;padding:0;
	width:530px;height:30px; text-align:center;
	background-color:#95c0d0;
	-moz-box-shadow: #7395a2 0 5px 5px inset;
	-moz-border-radius-bottomleft:30px;-moz-border-radius-bottomright:30px;
}
#tyxSlideControl span{
	display:inline-block;
	padding:5px 0 0;
	width:5%; height:25px;line-height:25px;
	color:#fff; text-shadow: 0em 0em 0.3em #888;
	cursor:pointer; 
}
#tyxSlideControl span.selected {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAHCAYAAADXhRcnAAAACXBIWXMAAArwAAAK8AFCrDSYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAAE9JREFUeNqUzLsNADAIQ0Hvv5T3YA1aJKdJJITIr6DC9yAJ5kHz0MdREjDxT4DmgYpfAlzbDp8CzLsd7gKsmxPOAXb%2FG8YOLjwAAAD%2F%2FwMAtVZU6BbzvHcAAAAASUVORK5CYII%3D") top center no-repeat;font-weight:bolder;}
/*====================================================*/
.tyxSlideContent { 
	float:left;text-align: left;
	padding: 0 15px;
	width:500px; height: 90px; 
	border: none; 
	-moz-transition:opacity 1.0s ease-in-out;
}
.tyxSlideContent a {
	display: inline-block; text-align: center;
	margin: 8px 0; 
	width: 33%;height: 14px;line-height: 14px;
	background-color: transparent !important; 
	color:#006699; text-shadow: 0em 0em 0.2em #006699; text-decoration: none;
	white-space:nowrap; direction:rtl; 
	-moz-transition:all 0.5s ease-in;
}
.tyxSlideContent a:not([style]):hover {
	font-weight:bolder;
	color:#a4c639; text-shadow: 0em 0em 0.3em #fff;
	-moz-transform: scale(1.5,1.5);
}
.tyxSlideContent a span { color: #222; text-shadow: 0em 0em 0.2em #111; cursor: text; z-index:-1;}
]]>.toString();
GM_addStyle(tyxTemp);
})();
//=================Global Variants=======================//
var tyxOrderNow;
//var tyxOrderFirst = 0;
var tyxOrderLast;
//====================Rewrite Displaying Element=======================//
(function(){
var tyxPreHref;
var tyxNextHref;
var tyxAllContainer = document.createElement('div');
tyxAllContainer.id = "tyxAllContainer";
var tyxVideoContainer = document.createElement('div');
tyxVideoContainer.id = "tyxVideoContainer";
var tyxPlaylistContainer = document.createElement('div');
tyxPlaylistContainer.id = "tyxPlaylistContainer";
//---------------------Slide Panel----------------------//
(function () {
var movienews_2 = document.getElementsByClassName('movienews_2')[0];
movienews_2.id = "tyxScrollPage";
movienews_2.className = "tyxScrollContent";
//clone Playlist item to Slider Page
var tyxSlidePage = document.createElement("div");
tyxSlidePage.id = "tyxSlidePage";
var tyxSlideControl = document.createElement("div");
tyxSlideControl.id = "tyxSlideControl"
var tyxA = movienews_2.getElementsByTagName("a");//document.evaluate( 'a', movienews_2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
var tyxItemTotal = tyxA.length;
var tyxOrderLast = tyxItemTotal-1;
tyxSlidePage.style.width = Math.ceil(tyxItemTotal/9)*530 + "px";
var tyxPageTotal = Math.floor(tyxItemTotal/9);
var tyxResidue=  tyxItemTotal%9;
var tempDiv;
var loopIndex;
for (var i=0; i < tyxItemTotal;i++){
	if (tyxA[i].firstChild.hasChildNodes()) {
		tyxOrderNow = i;
	}
}
tyxPreHref = (tyxOrderNow==0)? "" : tyxA[tyxOrderNow - 1].href;
tyxNextHref = (tyxOrderNow==tyxOrderLast)? "" : tyxA[tyxOrderNow + 1].href;
movienews_2.innerHTML = movienews_2.innerHTML.replace(/href=/gi, "onclick=window.location.href=" );
for (var i =0; i < tyxPageTotal; i ++){
	tempDiv = document.createElement("div");
	tempDiv.className = "tyxSlideContent";
	loopIndex = i*9;
	for (var j =0; j < 9; j++){
		tempDiv.appendChild(tyxA[loopIndex + j].cloneNode(true)) ;
	}
	tyxSlidePage.appendChild(tempDiv);
	tempDiv = document.createElement("span");
	tempDiv.innerHTML = (i+1);
	tempDiv.setAttribute("value",i);
	tempDiv.id = "pageNum"+i;
	tempDiv.setAttribute("onclick","tyxSlideRoll(this)");
	tyxSlideControl.appendChild(tempDiv);
}

/*alert("tyxResidue!"+tyxResidue);
alert("tyxItemTotal!"+tyxItemTotal);
alert("tyxOrderNow!"+tyxOrderNow);
alert("tyxOrderLast!"+(tyxItemTotal-1));*/
//alert(tyxA[38].innerHTML);	
if (tyxResidue){
	tempDiv = document.createElement("div");
	tempDiv.className = "tyxSlideContent";
	for ( var j = tyxItemTotal - tyxResidue; j < tyxItemTotal; j++){
		tempDiv.appendChild(tyxA[j].cloneNode(true));
	}
	tyxSlidePage.appendChild(tempDiv);
	tempDiv = document.createElement("span");
	tempDiv.innerHTML = (tyxPageTotal+1);
	tempDiv.setAttribute("value",tyxPageTotal);
	tempDiv.id = "pageNum"+tyxPageTotal;
	tempDiv.setAttribute("onclick","tyxSlideRoll(this)");
	tyxSlideControl.appendChild(tempDiv);
}
var tyxSlideContainer = document.createElement("div");
tyxSlideContainer.id = "tyxSlideContainer";
tyxSlideContainer.appendChild(tyxSlidePage);
//two mask div
tempDiv = document.createElement("div");
tempDiv.id = "tyxMaskLeft";
tyxSlideContainer.appendChild(tempDiv);
tempDiv = document.createElement("div");
tempDiv.id = "tyxMaskRight";
tyxSlideContainer.appendChild(tempDiv);
var tyxSlidePanel = document.createElement("div");
tyxSlidePanel.id = "tyxSlidePanel";
tyxSlidePanel.appendChild(tyxSlideContainer);
tyxSlidePanel.appendChild(tyxSlideControl);
//--------------------ScrollPanel-----------------------//
var tyxScrollPanel = document.createElement("div");
tyxScrollPanel.id = "tyxScrollPanel";
tyxScrollPanel.className = "plTransparent";
tyxScrollPanel.appendChild(movienews_2);
//---------------------Bind----------------------//
tyxPlaylistContainer.appendChild(tyxScrollPanel);
tyxPlaylistContainer.appendChild(tyxSlidePanel);
})();
//====================Video Container=======================//
(function () {
//--------------------Control Panel-----------------------//
var tyxControlPanel = document.createElement("div");
tyxControlPanel.id = "tyxControlPanel";
//Show/hide Playist
tempSpan = document.createElement("span");
tempSpan.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAABslJREFUeNqsmN9PU1kewL%2Ffc8%2FtuaWFAkNXaApRmOA61ELY7PBg9GETE30wuy%2FrPuCjb5r44L9CjInR%2BITiC6NrMOLsOKNs3AnIAJNZCkKLEIShrQPtve39ce4583I7KR0KhfGbnDRpes759Pv7e%2FDq1avwBwQrPqW3jiT0CJcjACgAQIUQihCCeN9JQohARIGIHABcABCHgaOHgKBSSh%2FnnHHOmaIoWjAYDGiaVkcIoUII17Ksgq7rBc55kVJqUUpNRLQBgNcCVQsMlVIy27brCCGhjo6OaDweP9HZ2dne2traGAqFApRSlXPOdV0vbG5ubqdSqfW5ubnk%2B%2Ffv1yzL2maMFRDR9LRVFQr38RkEANV13QDnvOn06dMnz58%2F%2F2VPT88JVVWDZT5SMgUCQMlkIIQoLCwsrL548WJyenr6J0T8hVKqA4BdDUjp7%2B%2BvBsIsy2oIBoPtg4ODFwcHBy%2B0trZGFEUhntrLfUKWgbkA4CIiDYfDfxoYGPiira2tZXl5eTufz9uUUlFNQ3vBIAAw0zQbotHoyRs3bvyzr6%2Bv19vMD%2BGQ0rsUo9FoR29v7%2FGlpaVsOp3WKaWud9a%2BMAgAPtu2Q5FIpPvmzZv%2FikQiHQBg%2FZGQBQAeDAYb%2B%2Fv7OxcWFtLpdHqHUsorgUglnOu6gWAwGLl27drfw%2BFwxAP5FGKHQqHPrl%2B%2F%2Fo9jx44ddxwnWBlA5TAopWSc88bLly%2F%2Frb29vfMQIKRWoJaWlsiVK1fOI2KzlNJfljB3HaLYtl0Xi8X%2BfO7cub8AgFNrDuKcFw6hIauvry82MDAQtyyrDgDUShgEAEYICV28ePGviKh5kXGQKKZpGkNDQ6NbW1vp8oMPcGzlwoULX2qa1iylZCXtlGCI4ziso6MjeurUqc5DaIU8e%2Fbs%2B9evX688fvz4TSl6atjnHD9%2BPNrd3X3CcRxW4ijBKJxzLR6Pd1JKAzVqxbe8vLw0Njb2fSgUyk1MTMxMTU3NAYCvRu34%2Bvr6PnddVys5cgmGKoqidXV1RWvViOM4xoMHD76xLOtnRVEyiJgZGRn5Np%2FPZ2osM7Krqyvi9%2FsDUkoKAEgAAIUQJBgM1rW2tjbVmE%2BUsbGx%2FyYSiUXGWB4Aiqqq6hsbG6uPHj16WVYe9hMRDodD9fX19UIIZReMpmmBhoaGuhpM5EulUsmnT5%2B%2BYYzlvPAXAGBrmpZ79erV9Nu3b2drcGbJGGOUUial3OXASAhRFEVRD9AM4ZwXhoeHv7Esa4sQYnhOCwAgELGIiB9HRka%2By%2BfzH2swFykvriUYKYRwhRD8APXS8fHxN%2FPz8wnPPHZllKiqqq%2Bvr6%2BMjo5%2BV9EFVnNkUU4mEVFYllXUdb2wz2bfyspK8smTJ%2F%2Fz%2BXyGV1eUPZaraVrx5cuXP8zMzPy4j7nQtm2Lc26XgAgASEVRXF3Xjc3Nze0qqZ0UCoWdu3fvfp3NZi3HcTTTNEOmaTbvsRpt29aKxaK4d%2B%2Fet9ls9mcP8ndnZrPZnGEYeUKICwCyZFOXc15MpVLr8Xg8ttfGZDK50tDQoJ09e%2FaLWvIQIpJisWgnEonlM2fOtOz1k1QqtWEYhuH3%2B3fDUErN2dnZ5KVLlwqEEF%2FFhTwWi52MxWKnasyw5eKWOXl5q%2BLMzMwsE0LMUitRMomglForKytr7969W60SBcoRQKCKieiHDx825ufnk6qqWiXY36IJEW3HcbafP38%2B5dUmsofnH3X9LorGx8enDMPIEkJ%2Ba9zKL%2BSMscL09PRPk5OTP9ZYgY8ibHFxcXFiYuIHxphRXpTLYSQimoj4cXh4%2BOutra11AGCfGETN5XKZ%2B%2FfvjzuOkyGEFCvzzK5elVJqZDKZ1aGhoa92dnYyNVbhmkBM09Tv3Lnz79XV1SWfz6dX9sB7TQcupVSk02l9cXFxq6enpz0QCDTW2FZUHXtyuVz29u3bX83MzMz6%2Ff4dADAr%2Fana3OSqqsrT6XRudnZ2LRwO17W1tR3z%2FEgcAkIFAEwkEgu3bt0aTSQS%2F%2FdAinudUw1Geibj%2BXxen5ycTG5sbGSam5vrmpqaGjzTkbKHACybKKm3xNra2vro6Oh%2FHj58%2BGJ7e3tV07ScpxFx2PG29O8UKaXfsqw6TdOau7u7T%2FT29n7e1dUVCYfDIcYYQ0QipZSO41iZTCaXTCY35ubmlufn55OGYWQZY4aX3JyjztqVpZ5KKZnjOMx1Xc3v9weCwWA9pZQhIkopwXVdyzAM3TAMnRBiqqpqlWXYA81b65OIAAAbER2fz1fwwH7Z2dlRvMYIvdQgEVH4%2FX5eNo9%2F8veZyvnZRURbUZS9%2BpUjv179OgAKJ1d98bCTbAAAAABJRU5ErkJggg%3D%3D" >';
tempSpan.id = "tyxPlDrawer";
tempSpan.className = "first";
tempSpan.setAttribute("onclick", 'tyxWithdrawPL(this, -130);');
tyxControlPanel.appendChild(tempSpan);
//Playlist Switcher
tempSpan = document.createElement("span");
tempSpan.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAButJREFUeNrsWG1oU1kafs69N8lNmn6m6aypsZ1pt3Vr6852KWw2rkLZ9aMr%2FVEUwf4oUoriF8UfRRHxhwEVLFLEigoFQVmtUEhECirrslloQVozjjOdWts6pq1p7TSp%2BWg%2B7s3ZP%2BfK3Us6qbP7wx974JCbcO49T573ed%2F3OZdQSvG5DA6f0fiswAjKBSHkU%2B8lbHIAePbJqf4gZTMNQGaTqubHoUhF%2BC8YFQDoAOgBiAAM7DvPQFIAEoAUgDiABJspFbDMzHwCGzzb1AggB0AugFyO43Lz8vLM7JmEEEJTqVQiEomEAYQBRAB8ABBj4CTGGv0lYAhbbwBgBlAIwLJu3brSpqam9Tt27Ciur6%2FPEQSBS6fT4Hke4XBYGhkZiXg8nvkHDx68SSaTAQA%2FAVhmoJJqQESJVxbNKIwYAeQDKDYYDPbDhw%2FXdHZ22jds2CBqdKLc8%2FHT6%2FUunz17duLp06c%2FAAgAWGKMJSmlcjYwRMOIyICU2O32X%2Ff29v5u9%2B7dFpVIsw0%2BFoulz507N3XhwoURADMA3gMIU0oTawkTx%2FRhUoDYbLbK27dv%2F37r1q35LO6ZMgwZmJJNJhM5f%2F58pSAI1OVyJQCsqMT9s8xwLFNMAPIA%2FApAeV9f39cHDhywaoBwiUQi%2FezZs5Xnz5%2BvSJJEzWYzV1VVJW7ZssXI8zxRh0%2BWZezfv3%2Bov79%2FGMA7SmkoGxiBASk4efLkH%2Bfn57%2BIRCJ5d%2B%2FetXMcp05Lbnh4ONbV1TXn9XrfMXHKjNG81tZWe09PT6nFYhFU4dTPzMwsORyOv83MzExSSoPZwkSUEDkcji%2Bbm5ur4%2FF4XAOEeDyeD21tbW9DodA0E2aYbaoDkHvnzp3Q2NhYeGBgoKqsrMwAgHv79u2HixcvvlxYWIiq9catQTN6j8ezDEASRVG9ngSDQenMmTMLoVBoDsAsgDkA8wAWWbb8BGB%2BdHR0vKur63tKaerevXvTTqfz7729vaPJZPKDOtzZwlQAoHTz5s31w8PDfzAajURTOYnf70%2B2t7f%2F4%2FHjxyMAQuzhIguxiRBiopQaBEHQ2e12cXZ2NsRAfCyClNJUNmYoi700Nze3srCwkNKyRiklXq93bmJiIsBA6JSsA1DqdDprnjx5smPbtm3FkiQtT09PTyWTyRnGXpBlk7yWMCm9JREMBkPT09Mxtp4AEF6%2Ffp3Ys2fPN62trf968%2BbNIgNSCMCm0%2Bmqjh8%2F7nz48GFjY2NjdV1dnY3dF2dsRBiQVDbNEFX3JQAkWZZDL1%2B%2BXAIgyLJMrl69OutwOIYGBgZ8TBcyC41106ZNtW6329nT01Odn5%2BvB5Cy2WyFLGyErc3YLIUMBUtphEozFADEJyYmAsFgsOTgwYPf3r9%2F%2F0dG8zLrLwaTyVTY0dFRf%2Fr06d9YrVadin6%2Btra2kNUq%2Fc9FQy1gXtV%2FzACMhBATz%2FOiJEmw2%2B2iXq%2Bnk5OTS4zuKKucAoCi%2Fv7%2Bv%2B7du7dO1Y0%2Fsv%2FixYsVh8Pxz1gs9h3LuLB6jYJBjVKn7j9Wq7Xq0qVLf3a73TuNRqPV7%2FfLk5OTQRbvZQZGBiAQQnIvX74cvXbt2vsMfYpWVFToWTPVGrBVbacOgMhxXFFzc%2FNmr9f7lxMnTtQ2NTWVHT169GsAXzCgRhV7%2BQCKKaXWoaEhLhQKyZreBAAkJydHV1NTIzDwZC0emAPAt7S0VLjd7j9VV1fnKkJzuVxlR44cqQPwJYANANYDsAMoA1AuimJZd3d32alTpyxaUQ4NDUUTiYS8a9euHBZeOasHVrLI7%2FcnIpFI0mw26xSa9Xo9uXLlSun27dvz%2Bvr6Fn0%2B37IkSZJOp9M1NjZaDh06ZGloaDBqgHA%2Bny%2B%2Bc%2BfO8crKyqWioqJ3LJ2lTJZTK%2BA8ln62jo4O5%2FXr139LCElrN6CU0mAwKKdSKWowGEhBQYGQwWSTcDhM9%2B3b98Pg4KAi2sUMlnNVQ64Y5%2FDNmze%2FKykpMbtcrgqNeUoTQlBUVMSr7tMKlo9Go3J7e%2FvY4ODgtwzIEhN8cjUzrmVGcfa5AIoBrG9ra6vr7u6utFgsBrZpOktT5V69ehU9duzY2KNHj74H8I4Vxaim2mY8qqjBEJWhUgx3ycaNG7%2Fq7OysbGlpKbZarXrVMUSttfTU1FT81q1bgRs3bkwEAoEfmaUMaYx35r6TAUwmh5erpG9paWlJfX19cUNDQ0F5eblRFEUuHA7L4%2BPj0dHR0ZDP53u%2FuLgYYABCrLDFtf3nU8GAhYtnoJTzkYldi%2Bx3wjZJsiyJqWZcpY%2BsZj0bGHXDFDSnR%2FWpMa1qfCkGQFKl75pecawFjLaBklXKeVqVIem1AvilZ%2B3%2FOG6sUs7%2FJy95yP9fFq0y%2Fj0A8MsXnVymFZ8AAAAASUVORK5CYII%3D" >';
tempSpan.setAttribute("onclick", 'tyxSwapClassName(document.getElementById("tyxSlidePanel"),document.getElementById("tyxScrollPanel"));tyxToggleClassName(this.firstChild, "rotated")');
tyxControlPanel.appendChild(tempSpan);
//Previous
tempSpan = document.createElement("span");
tempSpan.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAACCpJREFUeNq8WHtMU1ka%2F93blpYO5eXKTHVBBAIIrgIzAoLZgjK74gMcUZDdzQ6rGw1mNT4CAUXXByURGjX4CAlRJEI0SKLBJhIwRh4LLA%2BL6GWGWHcVSoeHFCu0lL7u%2FjHnko6R127ck5y0tz33fL%2Fv%2B37f4xwKPw8KAE0mjzx%2F7sECsAGwk8lSRDAfgBCAgDzzCLDPNewECAvAAmAagJVPBIsAuERHR0dv3rx5A%2Fntcw9bbW1tc1tbWxsxwBTFAVm%2Ffn3c48ePj4rFYhaA9f8Ahm80GqmEhIRLra2tTwFMUgDEAJY%2BePAgOzk5eSmA0QVyxpFnlAMPWAcezMeZpbW1taOJiYmFAEY5N4nFYrEFwAfCn7kGDYBnNpunGYbRqVQqHcMwkzwej3JycqLj4%2BM9AwIC3FesWCEhe1uJ4E%2BND1Kp1EIMwpsRbDKZrPNYhALA12q1k6WlpX3V1dWvXr58OQbARMgIAJRcLhe4ubl9ERUVtSwjIyNo586dPkKhkO%2Bw5hd7WiyWGUrwHQTNZw2UlJQwZ86c6RgeHh5x0Jgl71Pk%2B7RerzfW1dXp6%2BrqNOHh4b5FRUURmzZt8pzDdRQW4JIZIJmZma0lJSXtXBhSFCWJiIgI3Lp1a7i3t7fEarWyNE2zjY2NA01NTT39%2Ff1aAPbJyUlXi8XiuSBGz0dSlmVx8ODBFgLEDIDduHFj7NmzZ3fFxsYuoyhqmvxOAaD279%2B%2FXqfTfXf9%2BvUOAPysrKx1QqFwcCGBMR8YvlwuV3FABAKBKCsrK%2B38%2BfPf0jQ9DKCHJK1fvOPp6emSl5cXTlzZS6zJJdRZI22uLMvr6%2BvT5efnd3KaFxQU%2FFEul8fTNM0A0BBhXHgLAPCVSqVmx44djxsaGloBvCZrRAzDvM%2FIyOgoLi5%2BO5vcuSxDKRQKZnp6WgfAlpSUlHD8%2BPF1ABiiGc8x1BmGGTtx4kRXTU1NPwCLr6%2Bvq0wm85mYmHivUCieFRUVPZ%2BamjL19vauPnz4sN%2BnrDMbGFqr1Rru3bv3GoDdzc3N6%2FLly99SFDVINpmpaTqdzlRcXKxSKBTdBoNBD8AWEhISlJqaGvjw4cMfc3NzmxmG%2BRexkFAsFtuIIuYFg2lubh7T6%2FV6APbExMQ1K1eu5AEwOFR2VFdXq%2FPy8rr6%2Bvo0ZHPhyZMnv0tPTw9XKBTK8vLyZpZlJ0kuYgF8QfINtRg30Vqt9gNHvLi4uF87ABEwDDN26tSp9vv37%2FcBmAJglclkoceOHUsaHh4eSUhIOD80NPQTsYaJkJwPwHmObDw7ZxobG98Rl4jCw8PdAVgMBoP96tWr3efOnWsxGo0jAFh3d3fX3NzcPaGhocuLiooeNjQ0%2FJMINxNluFaB99%2FkGRYAPTo6auZIRlGUGQC9Z8%2BeZ0qlshPAe2IRW3Fx8fc%2BPj4BcXFxFwAYyfsmAsa2mDI%2Ba2jb7TNkt42Ojk4B4G3btu1rLy%2Bvr4gQGoCTUql8ZrPZxhMTEyOIciz5pBfboM22mF69evUSQjRzS0vLCADrgQMHfDo6OrKPHDnyZw8PD18AzlVVVX2HDh16sG%2Ffvm8qKyv%2FFhkZ%2BRvSNboQjggcom%2FRYCgA9vj4%2BBVEQ3tnZ6eGWOOtj4%2FP0KVLl7Z0dHTI09LStgNw7%2B3tHdy1a1dJRUVFS2Fh4Z%2FKysqOS6VSfwKGA8WfD9BslrFERkZ6SSSSJQDY%2Bvr6101NTT8Rjd8DeO7v76%2B7e%2FfuH54%2Bffr3uLi43wJwevToUXdCQsK1V69eva%2BoqMjOzs4%2BIJFIVpKQ5kDxFgvG6ufnJ9myZUsoANZutxtOnz7dbrfbbQ58GAPwXCaTsfX19X%2Btrq7OioqK%2BtpqtaKgoODRkydPei5cuJDS0NCQn5qamgLgSwDOU1NT%2FNnCm0e0dUtPTw8PCgpydkjTdl9fX%2F%2Fbt28zVqvV8ObNm3GNRsMmJSX5UhTlGHkfaJoeDwkJkaalpW1wdXVdZrPZvsrMzAzy9vbul0qlTrt3744LCwsLHRoaEqempoZGR0cLSQ7iabVaU2lpqQrABwqABIB3TU3N3u3bt3s4NON2AMvy8vJ65HJ5BZe49u7dG33t2rVYkUjkRNbaHfpeMQAfsucAaRvsxJLLiXVGAfRz5aSzs3N83bp1NwEM0PO0mcP5%2BfmxKSkpm7hD182bN1s3bNhwr7y8vHdiYsJMosWJnDJsANQDAwMNV65c%2BYdKpdKT%2FygCrssByOKqNtHqbVlZWYqLi4tzeXn5QwCWrq6u1xkZGZr8%2FHyviIgIaWxs7BIAlNFotNbV1Q2%2FePFi5N27d1MikcgjOTnZPycnZ1VYWJjLXKVgQZ0eAJNEIhm8devWzuDgYJ%2FCwsKq8fHxQQAmtVqtUavVmqqqKp5DD8xVdb7JZOJ3d3dTer3exeH%2FBYU2NccaA4AfcnJy1rS3t587evTo98HBwSGEIzRxD3du5gsEAreYmJhvKisrD%2Ff09PxFJpO5z1EaOLkUZxmWz%2BdT84C2AvgxICDA8%2BLFi7%2BTy%2BW%2FV6lUI21tbQMGg8HCsj8rHRgY6LF27drlq1atciU56QdSMD%2FJT5qmZw6AfKLN9ODg4DgAj3lcRgHQAdA5Ozs7x8TEuMfExIR%2BJMhEQPSTCKTmKjvT09Nm7tjDmXhSqVT2cP0qyT2zTWeHvkQH4N%2Bk1%2BXmIIBJksOc59hPBMBy48aNbrLexl2HiIVC4a%2FS0tLW%2BPn5ffmZr0NmEqZarR66c%2BdOj81mGwNgdLyfEZGcwF%2Fg4e5%2FHVYyzTMHw49uFHgf3Sp87psru0MUsv8ZAIYaWEk0%2B2vxAAAAAElFTkSuQmCC" >';
if(!tyxPreHref) tempSpan.className = "unClickable"
tempSpan.setAttribute("onclick", 'tyxPlayControl(0,"'+ tyxPreHref +'");');
tyxControlPanel.appendChild(tempSpan);
//Next
tempSpan = document.createElement("span");
tempSpan.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAACBRJREFUeNq8WG1MVNkZfu6dy8CMoICRFVywKNsVwW2nKx%2Fj1gF3UUDRmfUDDVuDTQMRqEWDGBKNjBSIVGMNRDExGkxsTJWFHcWCURxRUFiQ75HCoi0qrHw7zAzzfW9%2F9Iy5NTKijb7J%2BXFvzr3nOe%2F7vM%2F7nkPhv0YBoMkQkOcPbRwAOwCWDI4iCzMAXAG4kGcBAfahjCVAOABWAGYANoYs7AbAPTIyMjIuLu635N2HNntNTU19Y2NjI3GAkXIAkUql0bdu3donFos5ALaPAIaZnp6mYmJi%2FvrgwYM7APQUADGABdXV1Qfi4uIWABidBWcc%2FKJ4czl%2B%2FGfJmQUqlWpUoVD8BcCoI0xiX19fK4Apwp83mYNb9oGBAV1%2Ff%2F9LtVo9YbFYWLvdzoWEhLhLJBLvkJAQT6FQ6MYjpzObEovFVuIQwauFrVarzYlHBGaz2VZRUdFfVlbW29TUNKTVag2EfA4vCAC4hYaGzt%2B6detnKSkpn%2Fv5%2BbmTkM%2FkKcpkMr2iBMPb9Ywhqa2tHc%2FOzm5ta2v7NwAdAAvZtSNMHHln6u7u1nZ3dz8tLS3tUiqVYbt3715G5jjzEgUnIfkfs1qt3nq9fq4DQEBAQODq1au%2FkMlk%2FizLUgzDUM%2BePdNdv369rbW1tY%2FjON3w8PDPaWlpNzo6OiZLS0ulhGNOwzYbMPa4uLgFXV1dfzh27FgzAFt6enqYt7e3C4Bp4hUOgFCpVK5taGgYys3NLb99%2B3YjAPOZM2eaAHCnT59eRVEU5YzcAiJ281JTUyV%2Bfn4iHnqaJ346hmEmZTJZkEwmWyQSiQYBPAMwAmCcjBGKosYCAgLcd%2B7c%2BbXNZpvb2NjYy7KsuaWl5QXDMGKZTLboNe%2FQfX19pkuXLrUBmJpJZeni4uKBXbt2NWs0mpdEi2wAHtfV1T1QKBS3qqqqnhPPuvBS3QbgOU3TmoKCgjWFhYXfET5Y8vPzW3p7eyecCepMYAQXL14cuHDhQlNYWNj3ubm5TTqdzgrAvbKyckSlUnVu3Ljxplwur9VoNJM8QI5SYgGgycrKCtu0aVM0ALvZbJ44fvy4xlmy0DOIkUAsFtsBaI1G49O8vLxqqVRafu3atX8mJib%2Bcvny5X4AJq5evdoVERFRqVQqWyYmJqy82kYBYCmKGjx58uTaefPm%2BQBgr1y58nhoaMgwkxNoJ6lmJwSdAjCp0Wg0crn8b2fPnn1w%2BfLl7w4ePPgtAMpgMIweOXKkbtWqVary8vL%2B1yq%2FITAwUBAfH%2F8FAFar1Wrr6%2BvH3xUMX94tAAwApjiOmygrK%2FtHTEzMnxcvXjxHpVL9KSoq6nMA0729vU%2B2bdtWtXnz5huvhc4QHR39KXk2Dw0NTb0PmNf7DjMAPQDjixcvnqemphafOHHiWnZ2dkJRUdHvPD09hQAmKysrm8LDw%2F9eVFTUbjAYWABWiUTiCUAIgL179%2B7YuxJ4JlA2ACYyuLq6uq6EhITiiIiIoOLi4m%2BJB43T09PjOTk593bs2NEKgKYoyuLoY0ZHRy1kXe59RO9N1ZohP2Pi4%2BN%2FY7fbJ6uqqlrJ7jkAdh8fn4UJCQlfAhCMjo4aiXfBsuz%2FpcD8blBIhiA8PHxFZmam3NXVFXv27Pnh0aNHzwCIvLy8fJKTk9fu27fvm4CAACOA4fv3748Q7lGhoaHzZ4oIMwsgDE%2BpBb6%2Bvr8oLCzcEhgY6FNUVHSjurq6k%2Bzac%2Fv27V8VFBRsWrp0qRjAAICXAFxaWlqek2QQrlmzZjGvyM4ajACAyBFrDw8P%2F7S0tPjY2Nhf1dbWPkxJSblis9n0ANyio6PDlEqlPCoqygfAUwA%2Fke9c7927N3jz5s3HADgPD4%2F54eHhPqT1mLVnOKPRyBAwcxMTE1fl5ORskkgkCw8dOlRRWFhYDYCJiIj4Mjs7e71cLg9iGGYEQAfZNQ2AZlnWfvjw4R9ZljUA4NavXx%2ByZMkSDwBj7%2BIZLikpKUwkEi3Yu3dvmEKhWEoKY%2FOGDRs%2Ba2ho2BAbG%2FtpRkbGrz08PPQAHpHUdxCc5jiOTklJuXvnzp1eAJybm9sn%2B%2FfvjyLyMGsCUwBMmZmZQZmZmVIAwwDaHDuWSqUearV6M2myfiIqza%2FwjMlksmRkZNw7f%2F58I5EDl6ysrA0rV66cA0D7rgSmSOyfOmoVAGFbW9t4fX19n0Kh8PX395%2FLO%2BYAAHQ6nbGioqKvpKSk7eHDhwOO5nzLli3f5OfnfwWg31mhZN7WCgKg29vb9UePHu1RqVSPTSbTZF5enmjFihU%2B69at%2B0QsFjMAuIaGhvHW1taf%2B%2Fv7R0jIAMAlOTlZUVJSsp5kF%2Fu%2BYF6B0mq17u3t7ZTJZNIBMI6NjenUavWwWq3W8HpgO%2B%2B0CC8vr0UHDhxIzMnJWQngMVFt%2Bm1tJ%2FWWptweFRXl3dnZ%2Bfvy8vLVp06dutHc3NxjtVr1vMMeRxZyW7ZsWUB8fHxYenq6LCgoiAbQQ1KZfksEXsk6aJqmnEweFwqF%2BqSkJL%2BkpKQ%2F9vT0THV0dAz29fVNAgBFUZgzZ45LZGSkv0Qi8RGJRByA5wAmeJcKb%2FYGw7zqix1gbGaz2eLkI5rI%2Bb8AuAQHB88NDg72BRD42mF%2BCkAfAOMsCzE9ODg4STjGMiTW%2BnPnzrVLpdKvSXZwb6neepLaM9Ux0SxrnqWqqqqT%2FM%2FOkLgbysrKfjSbzaagoKCFH%2Bl%2Bhn3y5MlwTU1NFyG3jeK1BK6kIjPv0Vq8j9nIsPDB8G%2BuBLwu%2F2PcXLG8CwLuPwMAWgBUA5YqvgUAAAAASUVORK5CYII%3D" >';
if(!tyxNextHref) tempSpan.className = "unClickable"
tempSpan.setAttribute("onclick", 'tyxPlayControl(1,"'+ tyxNextHref +'");');
tyxControlPanel.appendChild(tempSpan);
//Mode Menu
tempSpan = document.createElement("span");
tempSpan.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAABwBJREFUeNq8WH9MU%2BsZfr7T0x%2B2MHCmnZsgd%2FYKM8E7DQuRaUJqgphIcTeBoFH%2FmEbNgmiWXK1%2FtGgTJGrihRkRYX85o2gc8ccIJhho8deN5VZYAiLWXmcxKzDgCvTnOafn7I%2F7HXMu65gK7CRvmgPt%2BZ7vfZ%2F3ed7zEfxwERoqGgy9X6xLAiACSNCQAEhKEDoAagAs%2FWQWEYwIgAcg0M8YgARLF9UB0JvN5rxdu3YVEULYxc6MJEnC1atX7%2Fv9fi%2F9W5TQLKTk5OTk379%2FvzIzM1MAwP0fyqQZHh5mi4qKGoaGhjwAQioAGgApVVVVxaWlpekAJgHEaeoWM0JpaWmYmJggbrd7AAAnl0kDIEzrt5hcUV6EciZM12fkrmFEUfxkELFYTBQEQfqUctF1GQBkIbLANDY2Rvr6%2BoR5P2gh0s2yrIrn%2BXlrEzOP38maJBmNRk4QhCgFw9L4aGDsR35fBYCMjo7OuFyuYFdX10ggEJh5%2Ffp1nGEYsmrVKn12dnba1q1bf2GxWJZrNBotbYpk5JU%2BFQwBwAYCgan6%2Bvr%2B69evDwWDwXEqAaxsIy9evJDa29ul%2Bvp6dX5%2Bfobdbs%2BzWq2fKSRf3pCkUH5J%2Fh%2FzgUBUV65cebFhw4bWuro6VzAY9AEYoZr0bufOnb%2Fp6uo6vnr16jQAEwCCHo%2Fn76WlpX%2Bz2%2B09Cu9j7t69O7xt27busrKyxwMDA%2F%2FSarWyCCbNDFGoJAHAOBwOT01NzWO6UIhmRJC5UVxcbLBYLExWVhbj8%2FkitDRqAOTUqVM9iUSCra2tXf%2Fs2bPxsrKybp7nJwEgPT1dlZubq6de9R%2BZYdxud7i%2Fvz8kp97pdHpramoeABgD8I6KFEcfIAIQDx061J6Tk3Oqs7PzlTLtsqi53W5OEATW6%2FVO8Dw%2FDmAawAwhhJMkKSlnJABiampqxvnz58c3b948qtfrIydPnuxRZEOcRTwRQCwUCiVevnz5vZxJAHoAqszMzKzjx4%2F%2FzmAw6G0229OysjKzWq1meZ4XABBCiPjfOEMASHl5eVMXLlxYGY%2FHf75nz55vFHJtoO6ubFt5FIhTkqoAqA0Gg8lut%2B%2B5fPny7wcGBp7v3bv3Ul1d3YPJycnwwYMHNygsiMylMwRAQqPR%2FFOr1X43PT09aTKZtB6Px97W1vYVy7K6WdmU9WYJBWqoqKgovn379h%2BXLl3KlJeX%2F%2BnixYv3RFGcBDBVXV3dUVlZ%2BWuj0bhSsbE5W5sAwKVLl54DmNHpdIbMzMzg1NTUO4ZhGGWHAdDSHbJ5eXlf2O32klgsFjl69Ohf%2Bvr6XtFsyWTX9fb2fudyufodDseWw4cP36Ibeb9mUjDBYDAyODg4DiAeCARmcnNzG8PhsMhxXIx%2BR0uDWbFiRZbNZrPm5OQYm5ubO1pbW7%2BlAOQJTlBwUu10Ors7Ozv%2FkJGR8atoNPojC0mmM8Tn80XHxsam6ENnJiYmJmKx2BR9sBbAEp1O99Oqqqod165dO%2FjmzZu3JSUlX7e2tn4DIEJ5Jre4TFABQGx0dHS8ubn5idPp%2FK0kSWpJkmTSJxc9juMYSk5BMavKU%2BESq9VqaWtr%2B8psNqfu3r274dy5c3d5npfbPkRbP5Fk7o0D4BobG70mkylaUVGxJhKJCHPagU6nkyWepeRUAVCtW7cu99ixYyU6nU6srq5uefLkyRBdNKboqLnmGgFAlOf56TNnzjx4%2BPDh3t7e3udzgRGzs7NTly9f%2FrORkZFpAMRoNJqOHDli3bRpU0ZTU1NnS0vLUwqABxClIMQPnH05ALFHjx69am9v%2F1av1zNzeZNoMpmWrF%2B%2F3gwgff%2F%2B%2FV%2FevHnzUCQS%2Bd5qtX7d0tLSTUsRpiF8IJDZ5QrfunVrWKVSJfUmSTGP8DabLb%2BkpCSXEDK%2Bb9%2B%2BP%2Fv9%2FoCiJNwHlOR%2FvcAJCkX%2FERiJECIBQE9Pz3g0GuULCws%2F7%2Bjo8NXW1v5VYQcRhSfN%2B3WFEJJ00hNTUlKYhoaGgY0bN94rLCy8t2PHjtvl5eVZy5YtW0Z3Ef8Ibsxr7JRUKhU8Hs8Yz%2FMjAEZu3Ljh8Xq9gydOnCik5dMs8IsdSQZGAiASQkAISSiz4HA4Hm%2FZsmXl2rVrv6BGmUJbfSFCy3EcyA%2B1kgBI78UtkUhwBQUFv6Q8YgAwwWAwdPbs2ad2u70IwFIKxkBHhE8Ng2ysBQUFqxKJBCeTWVbVn6xZs%2BazO3fuVLpcLs7r9Q5TodOwLKs%2Bffq0uamp6a3P5xtfAM7Io8pKi8Wi2b59e8Pg4OA%2FAEwrj0NSzGZzxoEDBwrVanWq3OqiKCISibzT6%2FUpDMOoF4jAhOf5mebm5m6%2F3%2F%2BWdmuMzBoHdIp7MusQSdnS0nzbWqFT762EJDm5YhX3i3kkIjv5%2B5Orfw8Av%2BEel5Kg0cYAAAAASUVORK5CYII%3D"><ul><li><span onclick="tyxPlayControl(2);">WorkMode</span></li><li><span  onclick="tyxChgWinSize(screen.availWidth*2/3,screen.availHeight*2/3,0,0,screen.availWidth/6,screen.availHeight/8)">Original</span></li></ul>';;
tyxControlPanel.appendChild(tempSpan);
//Aspect Ratio Menu
tempSpan = document.createElement("span");
tempSpan.id ="aspectRatio";
tempSpan.className = "last";
tempSpan.innerHTML = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAgY0hSTQAAeiUAAICDAAD5%2FwAAgOkAAHUwAADqYAAAOpgAABdvkl%2FFRgAAB05JREFUeNrsWE9MFEsa%2F1V1z0wzzAjYsGvgzYAuLkRE9g%2BSyIEYzGaXGDR6QIPixQMhJhIPxsQY4p9ED0oMVzEeDBcTTEz0YIwJyZJoUGFewnug89ZVecD6gBlgYIbpqamqPWw1aecxiHp5h62kMj1d1dW%2Fqu%2F3fd%2FvayKlxG%2BlUfyGGtnAOAGgq%2B4CoH3DJiQADiANgKlfoe5D38ACGgA3AAOARwGiG9xMJhCpAKQAJFVn9rj%2BmVPRAeQCKACQr2laoa7rmxTAr2lCCJFkjM0BmFd9CYC1ETAeAPm6rpd1dHTsa2trq%2FH7%2FW4hxNdxghAIIcTQ0ND05cuXn3z48GHUYbZ1zUQBeAEUdnZ27r1x48YeAAsAYt%2FIU62qqipQWVnZ3NjYuGhZVgJAAoDQ1zgNqszgBVBAKf3u2LFjJQB%2BBrDyhTzJxp1YfX39prq6urLBwcEJxUOuZ5yEC0COApIHoNjtdpf4%2FX6b9dSxYCaB5TpAZYZ3SgDxwsLCHOUYOgCiOya5AfgBmISQItM0yzweT%2FHKykoR51xTYJBIJLTFxUXd5%2FOl%2FX4%2FBwAppYxGo%2B6cnBzh9Xq5E4RlWTQSiRh%2Bv5%2F5%2FX7m3JBaV7dBUnWhqRMxi4qKqvr6%2Bk6%2Bfv365Nu3b%2F%2Fe1ta2dXFxkardiBcvXuR3dHT8pbe3d6sCyF%2B%2BfFlw5syZmsnJSY8NGoCcmZnxnD9%2FfmdnZ%2BefTp8%2B%2FedQKJTvGHee1KppqELnA1B8%2B%2Fbtf7S2tm4xTfNnj8fzzuVycSGE7cp07969kZqamoXZ2VkDgIjFYp6enp4%2FxuNxXUppLywA8L6%2BvuDS0pKru7v7%2B0AgsNLb2%2FsHIQRdz2NsMDnV1dXBpqamXEXWOACLc04zuCAMwxCapkkA8u7du0EpJamoqFg6d%2B5czejoaN7Dhw%2BLBwYGtiwvL%2BumaaaCwWAsEAjELcuiKhfKbGBsM3l8Pp%2FX5XKtqJ0RAGStnUgpQSmFZVnuwcHBohMnTvz76tWr32%2FevDn1%2FPlzk3MOzjk9fPjw1Pv3771nz57966NHj4oPHjw4rWkaz0Z0Z1jXpZTUgVrOz88bb9688bvdbpkRRl2MMeLxeIRpmmJsbCwvFAoVRaPRHNM0U7W1tbHi4uLUzp075y9evDg%2BNjZWsGvXruUDBw7MrpfXdAeJSKY5RkdHN01NTXk1Tfsk5AaDwaV4PE4BiI6Ojp9u3bpVGgqFNjc0NPzS3Nz8nzt37pStrKzoO3bsmItGo66KioqFU6dO%2FaSiLVkPTNboHQqFCjjnhJBPnqfHjx%2F%2FYEfT6urq6M2bNxcYY9QwDE4IwcmTJ9%2Fb69fW1s7v3r07quv6WnFIOvmTDYyMxWLu8fHxPE3Tkr%2ByLf3kpKmu69B1fXXXLpfLfglR12tmeOUEqxIim%2F3k2NiYf2ZmxjAMg6dSqa%2FRRp%2FVSslk0lISQgDI7vMjIyP5ubm5oqmpKfH06dOcjGD1zaJuamoqFQqFFpSmSa%2BVKAFAxuNx1%2FDwcMH27dsXWltbUy0tLeXFxcWvm5ub4263m3ytblYSAuFwGBcuXJj9%2BPHjvBJa2cFMTEzkzszMGIWFhdbjx483lZeXF3Z3d9fev3%2F%2Fl9LS0jjnfMOZ%2B927d78nhMiysrIZQggYYyI%2FP5%2Fl5eVFHEpPZBNXknNOGGP01atX5vDwsCwoKIiXlZX5jh496mtpaUlYlkUVkaWKOyTzBJQHykuXLnmllKSrq2tO3SeGYZBr166Re%2FfufVYD0%2FLy8nh7e%2Fu%2FCCFkfn7e9eDBg5K6urr3DQ0NE5qmJb1eLwEgE4mELoSAz%2BdLOwi7GjQjkYhnenp6y7Zt25a8Xu%2BE8x2cc8shJ34FZtUdDcPghw4dmgbAw%2BHwpv7%2B%2Fu%2Bqq6sXSkpKYs5nenp6tlqWRbu6usaVu4uRkZGC%2Fv7%2BErfbLefm5tyTk5Oe%2Ffv3TypzaA7QZK2gZ%2Fs6p5SKzFQhhKBSSjtH2blMptNpMjk5mZNIJLRUKkUNwxAAMD09nfPs2bMij8cjpJSoqqpabGxsnHWUOBIAUVE97fRS3QYCIJVIJBKcc6lpq%2BKfBoPB5JUrV34IBoMrzlym6zo5cuTIgpTSaxhGLoBlAHTPnj3R69evj1JKcwkh3tLS0ohpmsxhEgAg0Wg0qaoCblvFztguAL%2BjlFY%2BefLkb%2Fv27TNtxe44OZolkNkbEhnzSYZZbKJqkUgkXV9f%2F89wODwCYFqVK9JZ%2F1ApJQYGBlhlZWV%2BIBAwUqkULMsiqVSKMsZIOp0GY8zZJWNMSCmRTCbBGEM6nSaMMcoYI2pcMva%2FOo1zTsLhcKK9vf2HoaGhHwHMKiAcGdnarUR4ka7rWwKBwBZd13PS6bSwM2VGwlz9YxgGsSyLCyHIWnMIITAMgzDGrKmpqcjy8vK0AjKvKg6eyWiqAHlVFZmrzCc3mH%2FEOnNsvjD18oStJB10WPNBzcEj%2BgUJUn5mjnQ4C8vg2Ya%2FQnyuIPvSOVlBk%2F9%2FLMrS%2FjsAouZTO%2BWglzMAAAAASUVORK5CYII%3D" ><ul><li id="tyx423" class="unClickable" onclick="tyxChangeRatio(this,120)"><span>4:3</span></li><li id="tyx1629"   onclick="tyxChangeRatio(this, -120)"><span>16:9</span></li></ul>';
tyxControlPanel.appendChild(tempSpan);
//--------------------Relocate VideoPlayer div-----------------------//
var tyxVideoPanel = document.getElementsByClassName("movienews_1")[0];
tyxVideoPanel.id = "tyxVideoPanel";
tyxVideoPanel.className = "tyxVideoPanel";
tyxVideoContainer.appendChild(tyxVideoPanel);
tyxVideoContainer.appendChild(tyxControlPanel);
})();
//==================Bind=========================//
tyxAllContainer.appendChild(tyxVideoContainer);
tyxAllContainer.appendChild(tyxPlaylistContainer);
document.getElementsByTagName("body")[0].appendChild(tyxAllContainer);
//--------------------Intialize-----------------------//
document.getElementById("tyxScrollPage").scrollTop = Math.floor(tyxOrderNow/3)*30;//(tyxOrderNow - tyxOrderFirst) /3) *30;
document.getElementById("tyxSlideControl").childNodes[Math.floor(tyxOrderNow/9)].className="selected";
document.getElementById("tyxSlidePage").style.MozTransform='translate(-'+Math.floor(tyxOrderNow/9)*530+'px, 0px)';
})();
//================Embed javascript=================//
var scriptElement = document.createElement("script");
scriptElement.type = "text/javascript";
scriptElement.innerHTML =<![CDATA[
function tyxChgWinSize(wth, hht, obj_lft, tp, pstx, psty){
	window.innerWidth = wth;	window.innerHeight = hht;
	if(tp != "undefined" ){	window.scrollTo(obj_lft, tp);	}
	else if (obj_lft != "undefined" ) {	obj_lft.scrollIntoView(true);}	
	if(psty != "undefined") {	window.moveTo(pstx,psty);}
	else if (psty != "undefined"){	window.moveTo(tp,pstx);}
}
function tyxSwapClassName(obj1,obj2){
	var tyxTemp = obj2.className;
	obj2.className = obj1.className;
	obj1.className =  tyxTemp;
}
function tyxToggleClassName(obj, classname){	
	var tempStr = obj.className.split(" ");
	var orginLength = tempStr.length
	for (var i = 0; i < tempStr.length; i++){
		if (tempStr[i] == classname) {
			tempStr.splice(i,1);
			i--;
		}
	}
	if(orginLength == tempStr.length) tempStr.push(classname);
	obj.className = tempStr.join(" ");
}
function tyxChangeHeight(objID, param, bolean){
// ---------------------------bolean----------------------------------
//true	replace with param
//false	add param to the original
// -----------------------------------------------------------------------
	if(bolean){
		document.getElementById(objID).style.height = param+"px";
	}else{
		var orginHeight = parseInt(window.getComputedStyle(document.getElementById(objID), null).getPropertyCSSValue('height').cssText);
		document.getElementById(objID).style.height = orginHeight + param+"px";
	}
}
function tyxPlayControl(ctlAction,hRef){
// ---------------------------Action List----------------------------------
//0: previous
//1: next
//2: withdraw playlist
//pending: to control a flash video player
// ----------------------------------------------------------------------------
	switch(ctlAction){
		case 0:
			if(hRef) window.location.href = hRef;
			else alert("This is the first episode. Nothing previous is available!");
			break;
		case 1:	
			if(hRef) window.location.href = hRef;
			else alert("This is the last episode. Nothing next is available!");
			break;
		case 2:
			var screenHeight = document.getElementById("tyx423").className.match("unClickable")? 550 : 420;
			if(document.getElementById("tyxPlDrawer").firstChild.className.match("rotated")) {tyxChgWinSize(630,screenHeight,0,0,screen.availWidth-640,screen.availHeight/8);break;}
			tyxWithdrawPL(document.getElementById("tyxPlDrawer"),-130);
			var tempTimer3 = window.setTimeout(function(){tyxChgWinSize(630,screenHeight,0,0,screen.availWidth-640,screen.availHeight/8);},2100);
			break;
		default:
	}
}
function tyxSlideRoll(targetObj){
	if(targetObj.className) return;
	var originObj = document.evaluate("span[@class='selected']", targetObj.parentNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	tyxSwapClassName(originObj, targetObj);//originObj.className = "";targetObj.className = "selected";
	var tempobj1 = document.getElementById("tyxSlidePage");
	var tempobj2 = document.evaluate("div[@class='tyxSlideContent plTransparent']",tempobj1, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if( tempobj2 == null){
		tempobj1.childNodes[parseInt(originObj.getAttribute("value"))].className = "tyxSlideContent plTransparent";//intialize
	}else{
		tyxSwapClassName(tempobj1.childNodes[parseInt(originObj.getAttribute("value"))],tempobj2);
	}
	tempobj1.style.MozTransform='translate(-'+(targetObj.getAttribute("value"))*530+'px, 0px)';
}
function tyxWithdrawPL(obj, distance){
	if(obj.className.match("unClickable")) return;
	tyxToggleClassName(obj,"unClickable");
	tyxToggleClassName(obj.firstChild,"rotated");
	if(parseInt(window.getComputedStyle(document.getElementById("tyxPlaylistContainer"), null).getPropertyCSSValue('margin-top').cssText)!=-35){
		if(window.innerHeight < 680) window.innerHeight	= 680;
		tyxChangeHeight("tyxAllContainer", distance*-1, false);
		var tempTimer1 = window.setTimeout(function(){tyxToggleClassName(document.getElementById("tyxPlaylistContainer"), "plTransparent");document.getElementById("tyxPlaylistContainer").style.marginTop = -35 +"px";},500);
		
	}
	else{
		tyxToggleClassName(document.getElementById("tyxPlaylistContainer"), "plTransparent");
		document.getElementById("tyxPlaylistContainer").style.marginTop = (distance - 35) +"px";
		var tempTimer1 = window.setTimeout(tyxChangeHeight,1000,"tyxAllContainer", distance, false);//document.getElementById("tyxAllContainer").style.height = (document.getElementById("tyxAllContainer").offsetHeight + distance) +"px";},1000);
		//document.getElementById("tyxAllContainer").style.height = (document.getElementById("tyxAllContainer").offsetHeight + distance) +"px";
	}
	var tempTimer2 = window.setTimeout(function(){tyxToggleClassName(obj,"unClickable");},2000);
}
function tyxChangeRatio(obj, ht){
	if(obj.className.match("unClickable")) return;
	for(var i=0;i < obj.parentNode.childNodes.length; i++){
		if(obj.parentNode.childNodes[i].className.match("unClickable")) continue;
		tyxToggleClassName(obj.parentNode.childNodes[i],"unClickable");
	}
	switch (obj.id){
		case "tyx423":
			if(document.getElementById("tyxPlDrawer").firstChild.className.match("rotated")){
				if(window.innerHeight < 550) window.innerHeight	= 550;
			}else{	if(window.innerHeight < 680) window.innerHeight	= 680;}
			tyxChangeHeight("tyxAllContainer", ht, false);
			tyxChangeHeight("tyxVideoContainer", ht, false);
			tyxChangeHeight("tyxVideoPanel", ht, false);
			if(document.getElementById("movie_player")) tyxChangeHeight("movie_player", ht, false);
			//if(document.getElementById("playerObject")) tyxChangeHeight("movie_player", ht, false);
			var tempTimer4 = window.setTimeout(function(){
				for(var i=0;i < obj.parentNode.childNodes.length; i++){
					tyxToggleClassName(obj.parentNode.childNodes[i],"unClickable");
				}
				tyxToggleClassName(obj,"unClickable");			
			},500);
			break;
		case "tyx1629":
			if(document.getElementById("tyxPlDrawer").firstChild.className.match("rotated")){
				if(window.innerHeight < 420) window.innerHeight	= 420;
			}else{	if(window.innerHeight < 550) window.innerHeight	= 550;}
			tyxChangeHeight("tyxVideoContainer", ht, false);
			tyxChangeHeight("tyxVideoPanel", ht, false);
			if(document.getElementById("movie_player")) tyxChangeHeight("movie_player", ht, false);
			//if(document.getElementById("playerObject")) alert("3");
			var tempTimer4 = window.setTimeout(function(){
				tyxChangeHeight("tyxAllContainer", ht, false);
				for(var i=0;i < obj.parentNode.childNodes.length; i++){
					tyxToggleClassName(obj.parentNode.childNodes[i],"unClickable");
				}
				tyxToggleClassName(obj,"unClickable");
			},500);
			break;
		default:
	}
}
]]>.toString();
document.getElementsByTagName("head")[0].appendChild(scriptElement);
//====================mouseWheel Event=======================//
function tyxSwapClassName(obj1,obj2){
	var tyxTemp = obj2.className;
	obj2.className = obj1.className;
	obj1.className =  tyxTemp;
}
function tyxSlideRoll(targetObj){
	if(targetObj.className) return;
	var originObj = document.evaluate("span[@class='selected']", targetObj.parentNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	tyxSwapClassName(originObj, targetObj);//originObj.className = "";targetObj.className = "selected";
	var tempobj1 = document.getElementById("tyxSlidePage");
	var tempobj2 = document.evaluate("div[@class='tyxSlideContent plTransparent']",tempobj1, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if( tempobj2 == null){
		tempobj1.childNodes[parseInt(originObj.getAttribute("value"))].className = "tyxSlideContent plTransparent";//intialize
	}else{
		tyxSwapClassName(tempobj1.childNodes[parseInt(originObj.getAttribute("value"))],tempobj2);
	}
	tempobj1.style.MozTransform='translate(-'+(targetObj.getAttribute("value"))*530+'px, 0px)';
}
function tyxWheelScroll(event){
	var delta = event.detail;
	var tyxScrollPage = document.getElementById("tyxScrollPage")
	if (delta > 0){
		//Scroll down or back
		if(tyxScrollPage.scrollTop < (Math.floor(tyxOrderLast /3) *30)) tyxScrollPage.scrollTop = tyxScrollPage.scrollTop + delta*20;
	}else{
		//Scroll up or forward
		if( tyxScrollPage.scrollTop > 0) tyxScrollPage.scrollTop = tyxScrollPage.scrollTop + delta*20;
	}
	if (event.preventDefault){event.preventDefault(); event.stopPropagation();}
}
function tyxWheelSlide(event){
	var delta = event.detail;
	var tyxPageNow = document.evaluate(".//span[@class='selected']",event.currentTarget, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if (delta > 0){
		//Scroll down or back
		if(tyxPageNow.nextSibling){
			tyxSlideRoll(tyxPageNow.nextSibling);
		}
	}else{
		//scroll up(go left)//alert("scrolling up");
		if(tyxPageNow.previousSibling){
			tyxSlideRoll(tyxPageNow.previousSibling);
		}
	}
	if (event.preventDefault){event.preventDefault(); event.stopPropagation();}//event.returnValue = false;
}
document.getElementById("tyxScrollPage").addEventListener('DOMMouseScroll', tyxWheelScroll, false);
document.getElementById("tyxSlidePanel").addEventListener('DOMMouseScroll', tyxWheelSlide, false);
//==================Simulate Click event=========================//
(function(){
//var evt = document.getElementById("tyxPlDrawer");
//window.location.assign( "javascript: alert('1');" + evt.getAttribute("onclick") + ";void(0)");
var evt = document.createEvent("HTMLEvents");
evt.initEvent("click", true, true);
document.getElementById("tyxPlDrawer").dispatchEvent(evt);
var temptimer = window.setTimeout(function(){document.getElementById("tyx1629").dispatchEvent(evt);},1500);
})()
//===========pending function=============//
//prevent js:	http://cpro.baidu.com/cpro/ui/c.js