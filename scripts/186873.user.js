// ==UserScript==
// @name           Derpibooru - Enhanced Navigation
// @namespace      luckydonald - admin@flutterb.at - http://flutterb.at/
// @author         luckydonald
// @description    Complete Script With enhanced Laptop mode and autofaves etc.
// @grant          GM_getValue
// @grant          GM_setValue
// @include        https://derpibooru.org/*
// @include        http://derpibooru.org/*
// @include        https://derpiboo.ru/*
// @include        http://derpiboo.ru/*
// @include        https://trixieboo.ru/*
// @include        http://trixieboo.ru/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_listValues
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @updateURL      http://userscripts.org/scripts/source/186873.meta.js
// @downloadURL    http://userscripts.org/scripts/source/186873.user.js
// @version        0.1.3.2
// @history        0.1.3.2 added history and helper classess
// @history        0.1.3.1 added Settings
// @history        0.1.3.0 added Button to a working state
// @history        0.0.0.0 initial beta release
// ==/UserScript==
//
// Licenced under a Woona-Will-Cry-If-You-Modify-Or-Distribute-This 1.0 Licence.


// User Settings:
// Please Note: 
//  - The Settings got an GUI, accessable on the derpibooru page somewere (atm at the end of each image page)...
//  - modefieing this settings will only have an effect before running the script at the first time!
//  - this means: Use the Settings!
    //  - at the moment they are available at each image page, just scoll aaaaall the way down...
    //  - they will be available at http://derbibooru.org/#settings (or other similar domains, see @include 's above)

    var useRawFile = false; 
    //Set to true  to use the number only filename, e.g. "197941.png"
    //Set to false t0 use the full filename, e.g. "197941__safe_rainbow+dash_artist-colon-luckydonald.png"
    //Default is false.
	
	var rateOnDownload = true;
    //Set to true  to enable the automatic like/fave* when downloading the image.
    //Set to false to disable the automatic like/fave* function.
    // *) Specify in next line.
    //Default is true.
    
	var useVoteUp = true;
	//Set to true  to automaticly Vote Up when downloading the image.
    //Set to true  to automaticly Fave the image when downloading the image.
    //Default is true.
    
    
    var buttonMode = 1; 
    //Set to 0 to disable Button resizing/moving.
    //Set to 1 to use the Laptop Mode, coming with little bigger buttons, which will be positioned fix in the upper left corner, and almost transparent uppon hover.
    //Set to 2 to use the Laptop Mode, like 1, but the buttons will not move higher then the picture beginning.
    //Set to   to use the Smartphone Mode  (the buttons are Over the Image, tap on the left lower part of it to go to the previous picture, and lower right to go to the next.
    //Default is 1.
    
    var backgroundColor = "#777";
    // Set the backgrund color. 
    // Defaut is #777

// End of User Settings.
// Do not modify the Script below.
// Licenced under a Woona-Will-Cry-If-You-Modify-Or-Distribute-This 1.0 Licence.
// More Infos: http://Flutterb.at/script

var bestPony;
bestPony = "Daring Do";

//Dump it into the database and prefer the already stored part
useRawFile = GM_getValue('useRawFile',useRawFile);
             GM_setValue('useRawFile',useRawFile);
rateOnDownload = GM_getValue('rateOnDownload',rateOnDownload);
                 GM_setValue('rateOnDownload',rateOnDownload);
useVoteUp = GM_getValue('useVoteUp',useVoteUp);
            GM_setValue('useVoteUp',useVoteUp);
buttonMode = GM_getValue('buttonMode',buttonMode);
             GM_setValue('buttonMode',buttonMode);
backgroundColor = GM_getValue('backgroundColor',backgroundColor);
                  GM_setValue('backgroundColor',backgroundColor);



//alert("Daring Do is bestpony");

(function ($) {
   $(document);
}(jQuery));

function $_(id){
	return document.getElementById(id);
}

function _(class_name){
	return document.getElementsByClassName(class_name);
}


//http://javascript.about.com/library/bldom08.htm
document.getElementsByClassName = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
}; 
document.getElementsByTitle = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].title;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
};

document.getElementsByTag = function(tagname,tagvalue) {
	var retnode = [];
	var myclass = new RegExp('\\b'+ tagvalue +'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].getAttribute(tagname);
		if (myclass.test(classes))
			retnode.push(elem[i]);
	}
	return retnode;
}; 
// http://24ways.org/2010/calculating-color-contrast/
function getContrastYIQ(hexcolor){
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'black' : 'white';
}

//based on http://onetarek.com/javascript-and-jquery/how-to-add-or-remove-a-class-using-raw-javascript-and-jquery/
function addClass(obj,classname){
    if(oldClassName == undefined || oldClassName.trim() == ""){
        obj.className = classname;
    }else{
        var oldClassName = obj.className;
        oldClassName = oldClassName.replace(classname,"") // first  remove the class name if that already exists
        oldClassName = oldClassName.trim();               // second remove whitespaces at beginning/end
        oldClassName = oldClassName.replace(/\s+/g, ' '); // third  remove multiple Whitespaces
        oldClassName = oldClassName + " " + myClassName;  // fourth append the new class
        obj.className = oldClassName;                     // fiveth set the changed class
    }
}

function removeClass(obj,classname){
    if(oldClassName != undefined && oldClassName.trim() == ""){
        var oldClassName = obj.className;
        oldClassName = oldClassName.replace(classname,"") // first  remove the class name if that already exists
        oldClassName = oldClassName.trim();               // second remove whitespaces at beginning/end
        oldClassName = oldClassName.replace(/\s+/g, ' '); // third  remove multiple Whitespaces
        obj.className = oldClassName;                     // fourth set the changed class
    }
}
// http://stackoverflow.com/questions/10193294/how-can-i-tell-if-a-browser-supports-input-type-date#comment28536897_10199306
function supportsColorInput() {
    	var el = document.createElement('input'),
     			 notADateValue = 'not-a-date';
     	el.setAttribute('type','date'); el.setAttribute('value', notADateValue);
     	return !(el.value === notADateValue);
}

function checkColor1() {
	console.log(checkColor($_("element_3_1").value));
}

function checkColor(color){
	var d = document.createElement("div");
	d.style.color = color;
	d.style.display="none";
	document.body.appendChild(d)
	var colorInRGB = window.getComputedStyle(d).color;
	document.body.removeChild(d);
	var hexChars = '0123456789ABCDEF';
	var rgb = colorInRGB.match(/\d+/g);
	var g = parseInt(rgb[1]).toString(16);
	var b = parseInt(rgb[2]).toString(16);
	var hex = '#' + r + g + b;
	return hex;
}






function show_img(imgUrl){
 	img_status.innerHTML ='loading...';
 	img_status.style.display='block';
 	img_img.style.display='none';
 	img_div.style.display='block';
 	scrollTo(0,0);
 	//GM_setValue("current_luscious_mode", 2);
 	img_img.src=imgUrl;
 	img_img.addEventListener("load" , final_img);
 	if(loaded){
 	 	all_.style.display='none';
	}else{
 		all_.style.visibility='collapse';
 		loaded=true;
 	}


}
function show_img(imgUrl){
 	img_status.innerHTML ='loading...';
 	img_status.style.display='block';
 	img_img.style.display='none';
 	img_div.style.display='block';
 	scrollTo(0,0);
 	//GM_setValue("current_luscious_mode", 2);
 	current_mode = 2;
 	img_img.src=imgUrl;
 	img_img.addEventListener("load" , final_img);
 	if(loaded){
 	 	all_.style.display='none';
	}else{
 		all_.style.visibility='collapse';
 		loaded=true;
 	}
}
var pron=false;
/**
 * Function to hide everything, in case you get catched.
 **/
function prono(){
if (!pron){
 	img_cover.innerHTML ='Loading...';
 	img_cover.style.color ='black';
 	img_cover.style.backgroundColor ='white';
 	img_cover.style.display='block';
 	img_cover.style.width='10000em';
 	img_cover.style.heigth='10000em';
 	img_cover.style.height='10000em';
 	img_div.style.display='block';
 	scrollTo(0,0);
 	pron=true;
 	}
 	else {
 	pronor();
    }
 	//GM_setValue("current_luscious_mode", 2);
 
 	
}
/**
 * Function to show everything, the opposite of hiding (and the prono(); function) .
 **/
function pronor(){
	img_cover.style.display='none';
	window.scrollTo(0,0);
	pron=false;
}
function hide_img(){
	img_img.src='';
	img_img.style.display='';
	img_div.style.display='none';
	all_.style.display='block';
	all_.style.visibility='visible';
	window.scrollTo(0,0);
	//GM_setValue("current_luscious_mode", 1);
	current_mode = 1;
}
function final_img(){
	img_img.style.display='block';
	img_status.innerHTML ='-';
	img_status.style.display='none';
	scrollTo(0,0);
}
																																																																																																																																																																														var _0x81e4=["\x44\x61\x72\x69\x6E\x67\x20\x44\x6F","\x44\x75\x64\x65\x21\x20\x44\x61\x72\x69\x6E\x67\x20\x44\x6F\x20\x69\x73\x20\x62\x65\x73\x74\x20\x50\x6F\x6E\x79\x21"];if(bestPony!=_0x81e4[0]){alert(_0x81e4[1]);} ;

function img_goto(symbl,int){
	if(symbl=='#'){
		if (current_mode==1){
			//var new_url = img_list[GM_getValue("current_luscious_picture")].src.replace("thumb_100_","");
			show_img(full_img_src);
			
		}else if (current_mode==2){
			hide_img();
		}
		return;
	}
	if(symbl=="+"){
		location.href=next_img_page_href;
	}else if(symbl=='-'){
		location.href=last_img_page_href;
	}else{
		highlight_li(null, new_pic_number);
	}
}


pron=false;


















function bookmark(){
    //$("a:contains('Up')")[2].click();
    
    var clickEvent  = document.createEvent ("HTMLEvents");
    clickEvent.initEvent ("click", true, true);
    //alert($("span[id^='vote_up_']"));
    //$("input[id^='vote']").val('news here!');
    //$("span[id^='vote_up_']").dispatchEvent (clickEvent);
    //$("a[caption='Up']")[0].dispatchEvent (clickEvent);
    var upvote_span = $(".vote_up_link")[0];
    var is_already_voted = upvote_span.getAttribute("class").contains("voted_up");
    if(!is_already_voted){
        upvote_span.dispatchEvent (clickEvent);
        img_frame.src=download_img_src;

    }
    //$("a:has('Up')")[0].dispatchEvent (clickEvent);
    
    //alert($("a:contains('Up')")[2]);
    
    //vote_frame.click();//.scr=up_vote_page_href;
    //vote_frame.src=up_vote_page_href;
    //img_frame.href=download_img_src;
    
    return;
   $('div[id^="vote_"]').each(function(){
        if($(this).attr("caption")=="Up"){
            $(this).dispatchEvent (clickEvent)
	   }
	   alert($(this).attr("caption"));
    }
    );

    //document.getElementById("vote_frame").src=up_vote_page_href;
    return;
    var marks=bookmark_getUrlList(false);
		var bookmark_text = GM_getValue("bookmarks");
		var can_add=true;
		for (var i = 0; i < marks.length; i++) {
		  var each = marks[i];
		  if(each == full_img_src){
		      can_add=false;
		      return;
		  }
		}
		bookmark_text+='[||]'+img_img.src;
		GM_setValue("bookmarks", bookmark_text);	
}
function bookmark_getUrlList(use_cached_list){
	if(use_cached_list && bookmark_list != null){
		return bookmark_list;
	}else{
		bookmark_list = GM_getValue("bookmarks").split("[||]");
		return bookmark_list;
	}
}
var bookmark_list = null;

//Everything for Button moving///////////////////////////////////////////////////////////////////////////////////////////////////////////////


// http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
function getWindowSize() {
  var myWidth = 0, myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
    myHeight = document.body.clientHeight;
  }
  return {w:myWidth,h:myHeight}
}
// http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return {x: scrOfX, y:scrOfY };
}


//http://cgd.io/2008/using-javascript-to-scroll-to-a-specific-elementobject/
//Finds y value of given object
function findScrollPos(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	return [curtop];
	}
}


function scrollToPic(){
	var isHidden = (document.getElementsByClassName("image-hidden image-warning")[0].style.display=="block");
	var isSpoilerd = (document.getElementsByClassName("image-spoilered image-warning")[0].style.display=="block");
	//if(isHidden||isSpoilerd){alert(isHidden+"|"+isSpoilerd);}
	//scrollToElem($_("image_display"));
	//scrollToElem(_("image-hidden image-warning")[0]);
	//scrollToElem(_("image-spoilered image-warning")[0]);
	//alert(findScrollPos($_("image_display")) + " | " + findScrollPos(_("image-hidden image-warning")[0]) + " | " + findScrollPos(_("image-spoilered image-warning")[0]) + " |=(-)=| " + (findScrollPos($_("image_display")) || findScrollPos(_("image-hidden image-warning")[0]) || findScrollPos(_("image-spoilered image-warning")[0])));
	window.scroll(0,(findScrollPos($_("image_display")) || findScrollPos(_("image-hidden image-warning")[0]) || findScrollPos(_("image-spoilered image-warning")[0])));
	checkButtonPos(0);


}

function setBigButtonPos(button,number,mode){
	if(mode) button.style.width = "25px";
	//button.style.height = "50px";
	//button.style.textAlign = "center";
	//button.style.verticalAlign="middle";
	//button.style.backgroundColor = "#dfd";
	//button.style.color = "black";
	//button.style.position = "fixed";
	//button.style.top = "10px";
	button.style.left = (10 + 60*number) + "px";
}
function setBigButtonPos(button,number){
	//button.style.width = "50px";
	//button.style.height = "50px";
	//button.style.textAlign = "center";
	//button.style.verticalAlign="middle";
	//button.style.backgroundColor = "#dfd";
	//button.style.color = "black";
	//button.style.position = "fixed";
	//button.style.top = "10px";
	button.style.left = (10 + 60*number) + "px";
}

function checkButtonPos(y){
	var button = $_("hoverboxthingie");
	var h = getWindowSize().h;
	var scroll = getScrollXY().y;
	var offset = findScrollPos(_("metasection")[0]);
    var buttons_atop = (GM_getValue('buttonMode') == 2);
	var transform = "translateY(" + (y < h/2 ? ((scroll-offset>0+30)||(!buttons_atop) ?0:offset-scroll+30) : h-60) + "px)";
	button.style.position = "fixed";
    button.style.webkitTransform = transform;
	button.style.MozTransform = transform;
	button.style.transform = transform;
}




//get Links ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
var next_img_page_href = document.getElementsByClassName("next")[0].getElementsByTagName('a')[0].href;
var last_img_page_href = document.getElementsByClassName("prev")[0].getElementsByTagName('a')[0].href;
var up_vote_page_href = location.href;
var down_vote_page_href = location.href;
var fave_vote_page_href = location.href;

var metasection_divs = document.getElementsByClassName("metasection");
var full_img_src = "View is spy!";
var download_img_src = "DL is spy!";

for (var i2 = 0; i2 < metasection_divs.length; i2++) {
	var meta_each = metasection_divs[i2].getElementsByTagName('a');
	for (var i = 0; i < meta_each.length; i++) {
    	var each = meta_each[i];
    	//alert(each);
        if (each.length != 0){
            if( each.innerHTML == "View"){
                full_img_src = each.href;
                each.setAttribute('target', '_blank');
                each.setAttribute('onclick', 'this.focus()');
            }else if( each.innerHTML == "Download" && !useRawFile){
                download_img_src = each.href;
                download_img_src = download_img_src.replace('http://','https://');
            }else if( each.innerHTML == "DLS" && useRawFile){
                download_img_src = each.href;
                download_img_src = download_img_src.replace('http://','https://');
            }else if( each.innerHTML == "Up"){
                up_vote_page_href = each;
            }else if( each.innerHTML == "Down"){
                down_vote_page_href = each;
            }else if( each.innerHTML == "Fave"){
                fave_vote_page_href = each;
            }else{
                //alert(each.innerHTML + " = " + each.href);
            }
        }
    }
}

// Vars ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var current_mode = 1;

var loaded=false;
//GM_setValue("Bookmarks","");
//alert(full_img_src);


//Gui
var all_=document.createElement('div');
all_.id='own_content';
var img_div = document.createElement('div');
var img_status = document.createElement('h1');
var img_cover = document.createElement('h1');
img_div.style.display='none';

img_div.style.position = "absolute";
img_div.style.backgroundColor = "red";
img_div.style.left = "0";
img_div.style.top = "0";

img_status.style.float='center';
img_status.innerHTML ='-';
img_status.style.display='none';

img_cover.style.float='center';
img_cover.innerHTML ='-';
img_cover.style.display='none';

var img_img=document.createElement('img');
img_img.src='';
img_img.style.display='none';
img_div.appendChild(img_status);
img_div.appendChild(img_cover);
img_div.appendChild(img_img);

var img_frame=document.createElement('iframe');
img_frame.src='';
img_frame.href='';
img_frame.style.display='none';
img_div.appendChild(img_frame);
var vote_frame=document.createElement('iframe');
vote_frame.src='';
vote_frame.href='';
vote_frame.id='vote_frame';
vote_frame.style.display='none';
img_div.appendChild(vote_frame);

var all_note = document.createElement('h1');
all_note.style.float='center';
all_note.innerHTML ='-';
all_note.style.display='none';

all_.appendChild(all_note);

if(false){
	while (document.body.lastChild != null ) {
	document.body.removeChild(document.body.lastChild);
	document.title=document.body.lastChild;
	}
}

document.body.appendChild(img_div);
document.body.appendChild(all_);


// The Buttons again. ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.body.onmousemove = function(evt){
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	checkButtonPos(evt.clientY||1);
}
document.body.onscroll = function(evt){
	evt = (evt) ? evt : ((window.event) ? window.event : "");
	checkButtonPos(evt.clientY||1);
}
var last_img_button = document.getElementsByClassName("prev")[0].getElementsByTagName('a')[0];
var next_img_button = document.getElementsByClassName("next")[0].getElementsByTagName('a')[0];
var load_img_button = document.getElementsByTitle("Download this image at full res with tags in the filename")[0];
var button_parent = next_img_button.parentNode;
var sub_element = document.createElement('div');
var link = document.createElement('a');
sub_element.appendChild(last_img_button);
sub_element.appendChild(load_img_button);
sub_element.appendChild(next_img_button);
//sub_element.appendChild(link); //TODO Download;
link.innerHTML="v";
load_img_button.innerHTML='<i class="fa fa-arrow-down"></i>';
button_parent.appendChild(sub_element);
//sub_element.style.opacity = "0.4";
sub_element.id="hoverboxthingie";

checkButtonPos(0);
load_img_button
setBigButtonPos(last_img_button,0);
setBigButtonPos(load_img_button,1, true);
setBigButtonPos(next_img_button,1.5);
//setBigButtonPos(link,2);
checkButtonPos(0);


var css='\
	#hoverboxthingie a {           \n\
		opacity:0.3;               \n\
		height: 20px;              \n\
		width: 50px;               \n\
		color: white;              \n\
		text-align: center;        \n\
		vertical-align: center;    \n\
		background-color: rgba(81, 158, 215, 0.3);\n\
		border: 1px solid #519ED7; \n\
	}                              \n\
	#hoverboxthingie:hover a{      \n\
		opacity:0.5;               \n\
		color: black;              \n\
		background-color: #519ED7; \n\
		border: 1px solid transparent;           \n\
	}                              \n\
	#hoverboxthingie a:hover{      \n\
		opacity:1;                 \n\
		background-color: #dfd;    \n\
	}                              \n\
	#hoverboxthingie {             \n\
		height: 20px;              \n\
		position: fixed;           \n\
		top: 10px;                 \n\
		left: 10px;                \n\
	}                                            \n\
	#hoverboxthingie, #hoverboxthingie a {       \n\
		-webkit-transition:all 0.3s ease-in-out; \n\
		   -moz-transition:all 0.3s ease-in-out; \n\
		     -o-transition:all 0.3s ease-in-out; \n\
		        transition:all 0.3s ease-in-out; \n\
	}                                            \n\
	';
	css += (GM_getValue('backgroundColor')!='none' ? "\tbody {\t\t\t\t\t\t\t\t\t   \n\t\t\t\t\t\t\t\t\t\t\t\t\tbackground-color: "+GM_getValue('backgroundColor')+";\t\t\t\t  \n}\t\t\t\t\t\t\t\t\t\t\t\n":"");
css +='		                                         \n\
		                                         \n\
\
#settingsbody {                                                               \n\
    margin: 0px auto;                                                         \n\
    padding: 1em;                                                             \n\
    text-align: center;                                                       \n\
}                                                                             \n\
#settingsbox{                                                                 \n\
    background-color:white;                                                   \n\
    color:black;                                                              \n\
    box-shadow: 0px 0px 40px rgb(33, 33, 33);                                 \n\
    padding: 1em;                                                             \n\
    ///margin: auto !important;                                               \n\
    //width: auto;                                                            \n\
    //height: auto;                                                           \n\
    //width: 740px;                                                           \n\
    display:inline-block;                                                     \n\
    //float:left;                                                             \n\
    //overflow: auto;                                                         \n\
    text-align:left;                                                          \n\
    background-color: #ffffff;                                                \n\
    width: 400px;                                                             \n\
                                                                              \n\
}                                                                             \n\
#settingsbox * {                                                              \n\
    margin: 0;                                                                \n\
    padding: 0;                                                               \n\
    text-align: left;                                                         \n\
    line-height:1.5em;                                                        \n\
    display: inline-block;                                                    \n\
}                                                                             \n\
                                                                              \n\
#settingsbox label.description {                                              \n\
    border: medium none;                                                      \n\
    color: #222;                                                              \n\
    display: block;                                                           \n\
    font-size: 150%;                                                          \n\
    font-weight: 700;                                                         \n\
    ///padding: 0px 0px 1px !important;                                       \n\
    font-family: \"Lucida Grande\",Tahoma,Arial,Verdana,sans-serif;           \n\
    font-size: small;                                                         \n\
}                                                                             \n\
#settingsbox input{                                                           \n\
    border: 1px solid #CDCDCD;                                                \n\
    background: #EEE;                                                         \n\
    background: none repeat scroll 0% 0% #EEE;                                \n\
}                                                                             \n\
#settingsbox input.checkbox,#settingsbox input.radio {                        \n\
    //display: block;                                                         \n\
    height: 13px;                                                             \n\
    line-height: 1.4em;                                                       \n\
    //margin: 7px 0px 1px 5px;                                                \n\
    width: 13px;                                                              \n\
}                                                                             \n\
#settingsbox label.choice {                                                   \n\
    color: #444;                                                              \n\
    //display: block;                                                         \n\
    display: inline-block;                                                    \n\
    font-size: small;                                                         \n\
    line-height: 1.4em;                                                       \n\
    //margin: -1.55em 0px 0px 25px;                                           \n\
    //padding: 4px 0px 5px !important;                                        \n\
    width: 90%;                                                               \n\
}                                                                             \n\
#settingsbox label {                                                          \n\
    font-family: \"Lucida Grande\",Tahoma,Arial,Verdana,sans-serif;           \n\
    text-align: left;                                                         \n\
    float: clear !important;                                                  \n\
    width:auto !important;                                                    \n\
    height:auto !important;                                                   \n\
}                                                                             \n\
#settingsbox li,#settingsbox ul{                                              \n\
    //padding: 0px;                                                           \n\
    ///padding:4px 5px 2px 2px;                                               \n\
    list-style-type: none;                                                    \n\
    margin: 0px;                                                              \n\
    padding: 0px;                                                             \n\
}                                                                             \n\
#settingsbox li{                                                              \n\
    margin-top: 1em;                                                          \n\
}                                                                             \n\
#settingsbox li:first-child{                                                  \n\
    margin-top: 0;                                                            \n\
}                                                                             \n\
#settingsbox li .grouper{                                                     \n\
    margin-left: 1em;                                                         \n\
}                                                                             \n\
#settingsbox li .grouper label {                                              \n\
    margin-top: 0.5em;                                                        \n\
}                                                                             \n\
#settingsbox li .grouper .guidelines{                                         \n\
    margin-left: 1.5em;                                                       \n\
}                                                                             \n\
                                                                              \n\
#settingsbox #li_1 p {                                                        \n\
    ///padding:4px 0px 20px 30px;                                             \n\
}                                                                             \n\
#settingsbox #li_2 p {                                                        \n\
    ///padding:4px 0px 2px 30px;                                              \n\
}                                                                             \n\
                                                                              \n\
#settingsbox input.button {                                                   \n\
    font-size: 100%;                                                          \n\
    ///margin:20px 0px 0px 0px;                                               \n\
    border: 1px solid darkgray;                                               \n\
    padding: 5px;                                                             \n\
                                                                              \n\
}                                                                             \n\
#settingsbox input.button:hover, #settingsbox input[type=\"button\"]:hover {  \n\
    font-size: 100%;                                                          \n\
    ///margin:20px 0px 0px 0px;                                               \n\
    border: 1px solid dark-gray;                                              \n\
    color: black;                                                             \n\
       -webkit-box-shadow: inset 0 0 10px #000000;                            \n\
       -moz-box-shadow: inset 0 0 10px #000000;                               \n\
            box-shadow: inset 0 0  5px darkgrey;                              \n\
}                                                                             \n\
#settingsbox .block {                                                         \n\
    display: block;                                                           \n\
}                                                                             \n\
#settingsbox .colorpickerresult {                                             \n\
    border: 1px solid darkgrey;                                               \n\
    padding: 5px 10px 5px 10px;                                               \n\
}                                                                             \n\
';
style=document.createElement('style');
style.id = "stylethingie";
if (style.styleSheet){
    style.styleSheet.cssText=css;
}else{ 
    style.appendChild(document.createTextNode(css));
}
document.getElementsByTagName('head')[0].appendChild(style);

window.onload = scrollToPic;






//Init Key Bindings
window.addEventListener("keypress" , function(e){
	if (e.shiftKey === true){
		return false;
	}
	if(e.keyCode == 35){ //kp_1
		img_goto('-',1);
	}else if(e.keyCode == "+"){ //Down
		bookmark();
	}else if(e.keyCode == 34){//kp_3
		img_goto('+',1);
	}else if(e.keyCode == 12){ //kp_5
		img_goto('#',0);
	} else if(e.keyCode == 13){ //Enter or Zero
		bookmark();
	} else if(e.keyCode == 0){ //Other Keys
		if(e.charCode == 45) // "-" kp_minus
		prono();
	}else{
	   //alert(e.keyCode);
	}
}, false);




//Settings

settingsHTML="\
<a name=\"derpsettings\" /></a>                                                                                                                                                                                                                                                                               \n\
<div id=\"settingsbox\" name=\"settingbox\">                                                                                                                                                                                                                                                                  \n\
<ul>                                                                                                                                                                                                                                                                                                          \n\
    <li id=\"li_1\" >                                                                                                                                                                                                                                                                                         \n\
        <label class=\"description\" for=\"element_1\">Download Settings</label>                                                                                                                                                                                                                              \n\
        <div class=\"grouper\" id=\"element_1\">                                                                                                                                                                                                                                                              \n\
            <label class=\"choice\" for=\"element_1_1\"><input id=\"element_1_1\" name=\"element_1_1\" class=\"element checkbox\" type=\"checkbox\" value=\"1\" />                                                                                                                                            \n\
            Raw Filename</label>                                                                                                                                                                                                                                                                              \n\
            <p class=\"guidelines\" for=\"element_1_1\"><small>Set to <code>true</code>  to use the number only filename, e.g. \"197941.png\"<br>Set to <code>false</code> to use the full filename, e.g. \"197941__safe_rainbow+dash_artist-colon-luckydonald.png\"<br>Default is <code>false</code>.        \n\
            </small></p>                                                                                                                                                                                                                                                                                      \n\
            <label class=\"choice\" for=\"element_1_2\"><input id=\"element_1_2\" name=\"element_1_2\" class=\"element checkbox\" type=\"checkbox\" value=\"1\" />                                                                                                                                            \n\
            Rate on Download</label>                                                                                                                                                                                                                                                                          \n\
            <p class=\"guidelines\" for=\"element_1_2\"><small>Set to <code>true</code>  to enable the automatic like/fave* when downloading the image.<br>Set to <code>false</code> to disable the automatic like/fave* function.<br>*) Specify in next line.<br>Default is <code>true</code>.</small></p>   \n\
            <label class=\"choice\" for=\"element_1_3\"><input id=\"element_1_3\" name=\"element_1_3\" class=\"element checkbox\" type=\"checkbox\" value=\"1\" />                                                                                                                                            \n\
            Vote-Up on Download</label>                                                                                                                                                                                                                                                                       \n\
            <p class=\"guidelines\" for=\"element_1_3\"><small> Set to <code>true</code> to automaticly Vote Up when downloading the image.<br>Set to <code>true</code> to automaticly Fave the image when downloading the image.<br>Default is <code>true</code>.                                            \n\
            </small></p>                                                                                                                                                                                                                                                                                      \n\
        </div>                                                                                                                                                                                                                                                                                                \n\
    </li>                                                                                                                                                                                                                                                                                                     \n\
    <li id=\"li_2\" >                                                                                                                                                                                                                                                                                         \n\
        <label class=\"description\" for=\"element_2\">Button Mode</label>                                                                                                                                                                                                                                    \n\
        <div class=\"grouper\" id=\"element_2\">                                                                                                                                                                                                                                                              \n\
            <label class=\"choice\" for=\"element_2_1\"><input id=\"element_2_1\" name=\"element_2\" class=\"element radio\" type=\"radio\" value=\"1\" />                                                                                                                                                    \n\
            Disable Button resizing/moving</label>                                                                                                                                                                                                                                                            \n\
            <p class=\"guidelines\" for=\"element_2_1\"><small>Disable Button resizing/moving.</small></p>                                                                                                                                                                                                    \n\
            <label class=\"choice\" for=\"element_2_2\"><input id=\"element_2_2\" name=\"element_2\" class=\"element radio\" type=\"radio\" value=\"2\" />                                                                                                                                                    \n\
            Laptop Mode 1 (default)</label>                                                                                                                                                                                                                                                                   \n\
            <p class=\"guidelines\" for=\"element_2_2\"><small>Use the Laptop Mode, coming with little bigger buttons, which will be positioned fix in the upper left corner, and almost transparent uppon hover.</small></p>                                                                                 \n\
            <label class=\"choice\" for=\"element_2_3\"><input id=\"element_2_3\" name=\"element_2\" class=\"element radio\" type=\"radio\" value=\"3\" />                                                                                                                                                    \n\
            Laptop Mode 2</label>                                                                                                                                                                                                                                                                             \n\
            <p class=\"guidelines\" for=\"element_2_3\"><small>Use the Laptop Mode, like above, but the buttons will not move higher then the picture beginning.</small></p>                                                                                                                                  \n\
                                                                                                                                                                                                                                                                                                              \n\
                                                                                                                                                                                                                                                                                                              \n\
        </div>                                                                                                                                                                                                                                                                                                \n\
        </li>                                                                                                                                                                                                                                                                                                 \n\
        <li id=\"li_3\" >                                                                                                                                                                                                                                                                                     \n\
        <label class=\"description\" for=\"element_3\">Styles</label>                                                                                                                                                                                                                                         \n\
        <div class=\"grouper\" id=\"element_3\">                                                                                                                                                                                                                                                              \n\
            <div class=\"block\">                                                                                                                                                                                                                                                                             \n\
                <label class=\"choice\" for=\"element_3_1\">Background color </label>                                                                                                                                                                                                                         \n\
                <input id=\"element_3_1\" name=\"element_3_1\" class=\"element\" type=\"color\" value=\"#777\" />                                                                                                                                                                                             \n\
                <span class=\"colorpickerresult\" id=\"colorpickerresult\">#777</span>                                                                                                                                                                                                                        \n\
            </div>                                                                                                                                                                                                                                                                                            \n\
            <p class=\"guidelines\" for=\"element_3_1\"><small>Set the backgrund color. <br> Default is <code>#777</code>.                                                                                                                                                                                    \n\
            </small></p>                                                                                                                                                                                                                                                                                      \n\
        </div>                                                                                                                                                                                                                                                                                                \n\
        </li>                                                                                                                                                                                                                                                                                                 \n\
        <li id=\"li_0\" >                                                                                                                                                                                                                                                                                     \n\
            <input type=\"button\" id=\"prefSubmitButton\" class=\"element submit button\" value=\"Save\" onclick=\"saveoptions(this)\" />                                                                                                                                                                    \n\
        </li>                                                                                                                                                                                                                                                                                                 \n\
        </ul>                                                                                                                                                                                                                                                                                                 \n\
    </div>                                                                                                                                                                                                                                                                                                    \n\
    </div>                                                                                                                                                                                                                                                                                                    \n\
";

settingsBody=document.createElement('div');
settingsBody.id = "settingsbody";
settingsBody.innerHTML= settingsHTML;
document.getElementsByTagName('body')[0].appendChild(settingsBody);
var buttonElem = document.getElementById("prefSubmitButton");
buttonElem.addEventListener('click', saveoptions, false);

document.getElementById("element_1_1").checked=GM_getValue('useRawFile');
document.getElementById("element_1_2").checked=GM_getValue('rateOnDownload');
document.getElementById("element_1_3").checked=GM_getValue('useVoteUp');

//document.getElementById("element_2_"+GM_getValue('buttonMode')).checked=true;
theButtonMode = GM_getValue('buttonMode',0);
var zwei_buttonModes = document.getElementsByName("element_2");
for(var i = 0; i<zwei_buttonModes.length; i++){
    zwei_buttonModes[i].checked = (zwei_buttonModes[i].value==theButtonMode); //buttonMode
}
document.getElementById("element_3_1").value = GM_getValue('backgroundColor'); //backgroundColor
document.getElementById("colorpickerresult").innerText = GM_getValue('backgroundColor'); //backgroundColor
document.getElementById("colorpickerresult").style.backgroundColor = GM_getValue('backgroundColor'); //backgroundColor
document.getElementById("colorpickerresult").style.color = getContrastYIQ();
document.getElementById("colorpickerresult").addEventListener('click', checkColor1, false);
document.getElementById("colorpickerresult").addEventListener('click', function(){
	console.log(checkColor($_("element_3_1").value));
}, false);

function saveoptions(){
    var elem = document.getElementById("settingsbox");
    var eins_1 = document.getElementById("element_1_1"); //useRawFile
    GM_setValue('useRawFile',eins_1.checked);
    var eins_2 = document.getElementById("element_1_2"); //rateOnDownload  
    GM_setValue('rateOnDownload',eins_2.checked);
    var eins_3 = document.getElementById("element_1_3"); //useVoteUp
    GM_setValue('useVoteUp',eins_3.checked);

    
    theButtonMode = 0;
    
    var zwei_buttonModes = document.getElementsByName("element_2");
    for(var i = 0; i<zwei_buttonModes.length; i++){
        if (zwei_buttonModes[i].checked==true){
            theButtonMode =  zwei_buttonModes[i].value; //buttonMode
        }
    }
    var drei_color = document.getElementById("element_3_1"); //backgroundColor
    //validate color as real color.
    
    
    document.getElementById("colorpickerresult").innerText = drei_color;
    document.getElementById("colorpickerresult").style.backgroundColor = drei_color;
    GM_setValue('backgroundColor',drei_color);

    GM_setValue('buttonMode',theButtonMode);
    var theArray = GM_listValues();
    //alert("{"+theArray +"}");
    

 
    
}