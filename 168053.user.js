// ==UserScript==
// @name        Smart scroll for Dz
// @namespace   Smart_scroll_for_Discuz
// @description  Smart scroll script for comfortable view in Dz forum 
// @include     *.kafan.cn/thread-*
// @include    *kafan.cn/forum.php?mod=viewthread*
// @include     *.sanfans.com/thread-*
// @include    *.sanfans.com/forum.php?mod=viewthread*
// @version     1.6.2
// @icon http://a.ikafan.com/5/000/53/99/15_avatar_small.jpg
// @author 		loms126
// @downloadURL https://userscripts.org/scripts/source/168053.user.js
// @run-at document-end
// @updateURL https://userscripts.org/scripts/source/168053.meta.js
// ==/UserScript==

//post list
//v1.6.2  @3/6/2013 
//感谢li13911的反馈，增大了翻页时所需的滚动次数
//感谢ywzhaiqi的指正，修正1.6一处bug

//******************************************************************************************
window.getPagearea=function (){
　　　　if (document.compatMode == "BackCompat"){
　　　　　　return {
　　　　　　　　width: Math.max(document.body.scrollWidth,
　　　　　　　　　　　　　　　　document.body.clientWidth),
　　　　　　　　height: Math.max(document.body.scrollHeight,
　　　　　　　　　　　　　　　　document.body.clientHeight)
　　　　　　}
　　　　} else {
　　　　　　return {
　　　　　　　　width: Math.max(document.documentElement.scrollWidth,
　　　　　　　　　　　　　　　　document.documentElement.clientWidth),
　　　　　　　　height: Math.max(document.documentElement.scrollHeight,
　　　　　　　　　　　　　　　　document.documentElement.clientHeight)
　　　　　　}
　　　　}
　　}
function getPageScrollPosition(){
var posX,posY;  
    if (window.innerHeight) {  
        posX = window.pageXOffset;  
        posY = window.pageYOffset;  
    }  
    else if (document.documentElement && document.documentElement.scrollTop) {  
        posX = document.documentElement.scrollLeft;  
        posY = document.documentElement.scrollTop;  
    }  
    else if (document.body) {  
        posX = document.body.scrollLeft;  
        posY = document.body.scrollTop;  
    }  
	return{
		posX: posX,
		posY: posY
	}
}
window.getViewport=function(){
　　　　if (document.compatMode == "BackCompat"){
　　　　　　return {
　　　　　　　　width: document.body.clientWidth,
　　　　　　　　height: document.body.clientHeight
　　　　　　}
　　　　} else {
　　　　　　return {
　　　　　　　　width: document.documentElement.clientWidth,
　　　　　　　　height: document.documentElement.clientHeight
　　　　　　}
　　　　}
　　}
function getElementTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;

　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}

　　　　return actualTop;
　　}
//******************************************************************************************        ini

function goNextPost(flag){	
	key_mouse_scroll_flag=2;
	if (position_now==post_Arr.length-1)
		refreshPostArr()
	//alert(position_now)
	if (position_now<post_Arr.length-1) //not the last post
		{
			page_turning_count=0
			if( post_Arr[position_now+1].getBoundingClientRect().top <  getViewport().height || 	 (flag==2) ) // in the visible area
				{	
				//alert("from "+position_now)
				scroll(0,getElementTop(post_Arr[++position_now])-200)
				//post_Arr[++position_now].scrollIntoView()
				//alert("To   "+position_now)
				}
		}
		else
		{
			//next page
			if (     (flag==2  ||  document.getElementById('diyfastposttop').getBoundingClientRect().top< getViewport().height  )  && document.getElementsByClassName('nxt').length     )
				{
					if(page_turning_count++>3)
					{
						
						localStorage["Autoscroll_backward_flag"] = "-1"
						document.getElementsByClassName('nxt')[0].click()
					}
				}
		}
		onScroll()
}
function goFormerPost(flag){
	key_mouse_scroll_flag=2;
	if (position_now>0) 				//not the first post
		{
			page_turning_count=0
			if(post_Arr[position_now].getBoundingClientRect().top < 0)
			{
				//post_Arr[++position_now].scrollIntoView()
			}
			else
			{
				//alert("from "+position_now)
				scroll(0,getElementTop(post_Arr[--position_now])+20)
				//post_Arr[--position_now].scrollIntoView()
				//alert("To   "+position_now)
			}
		}
		else
		{
			//former page
			if (  (flag==2  || document.getElementById('pgt').getBoundingClientRect().top>0  ) && document.getElementsByClassName('prev').length)
				{
					if(page_turning_count++>3)
					{
						localStorage["Autoscroll_backward_flag"] = "1"
						document.getElementsByClassName('prev')[0].click()
					}
				}
		}
		onScroll()
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^***************************************_______________________________________


function refreshPostArr(){
    post_Arr=new Array();
for (var i=0;i<(document.getElementsByClassName('pl bm').length);i++ )
{
	if(document.getElementsByClassName('pl bm')[i].id=='postlist')
	{
		var child=document.getElementsByClassName('pl bm')[i].firstChild;
		while(child)
		{    
    	if(child.nodeType==1 && child.nodeName.toLowerCase()=="div" && child.className!="pl"){
        	post_Arr.push(child)
	        }
    	child=child.nextSibling;//
		}
	}
}
}
//===============================================================================================

function getKeyScrollFunc(e){
  if (document.activeElement.id!="nv_forum")
  	return
  e = e || window.event;
  var keycode = e.which ? e.which : e.keyCode;
  if (e.altKey || e.shiftKey || e.ctrlKey )
  	return
  switch (keycode)
	  {
		  case 65:  //a
		  	goFormerPost(1)
		  case 87:  //w
		  	scroll(0,getPageScrollPosition().posY-100)
		  	break;
			
		  case 68:	//d		
		  	goNextPost(1)
		  case 83:	//s	
		  	scroll(0,getPageScrollPosition().posY+100)
		    break;
		  
		  case 90:  //z
		  	goFormerPost(2);scroll(0,getPageScrollPosition().posY-100);break;
		  case 67:  //c
		  	goNextPost(2);break;
		  
		  case 49:  //1
		  	if ( document.getElementsByClassName('prev').length     )
				document.getElementsByClassName('prev')[0].click();
			break;
		  case 51:  //3
		  	if ( document.getElementsByClassName('nxt').length     )
				document.getElementsByClassName('nxt')[0].click();
			break;
				
		  case 69:  //e
		  	//alert(localStorage["Autoscroll_highlight_flag"])
			if( localStorage["Autoscroll_highlight_flag"]=="0" )
				localStorage["Autoscroll_highlight_flag"] = "1";
			else
				localStorage["Autoscroll_highlight_flag"] = "0";
			onScroll();
			break;		
		  case 81:  //q
		  	if (localStorage["Autoscroll_checkbox_enabled"] == "1")
			{    
				localStorage["Autoscroll_checkbox_enabled"] = "0";
    			document.getElementById("Autoscroll_checkbox").checked=false;
			}
			else
			{
    			localStorage["Autoscroll_checkbox_enabled"] = "1";
    			document.getElementById("Autoscroll_checkbox").checked=true;
			}
		  	break;
			
			
	  }

 }
//=====================================================================================================
function scrollFunc(e){ 
    var    scroll_Value; 
	e=e || window.event; 
	if (localStorage["Autoscroll_checkbox_enabled"] != "1")
		return
    if(e.wheelDelta){//IE/Opera/Chrome 
        scroll_Value=e.wheelDelta; 
    }else if(e.detail){//Firefox 
        scroll_Value=-e.detail; 
    } 
    if (scroll_Value<0)  	//scroll down
	{
		//alert('scroll down')
		goNextPost(0)
	}
	else			//scroll up
	{
		//alert('scroll up')
		goFormerPost(0)
	}
	
} 
//======================================================================================================
//on scroll function,  follow scrolling
function onScroll()		
{
    var posX,posY;  
    if (window.innerHeight) {  
        posX = window.pageXOffset;  
        posY = window.pageYOffset;  
    }  
    else if (document.documentElement && document.documentElement.scrollTop) {  
        posX = document.documentElement.scrollLeft;  
        posY = document.documentElement.scrollTop;  
    }  
    else if (document.body) {  
        posX = document.body.scrollLeft;  
        posY = document.body.scrollTop;  
    }  
    var autoscroll_text=document.getElementById("Autoscroll_text");  
    autoscroll_text.style.top=(posY+100)+"px";  
    //ad.style.left=(posX+50)+"px";  
	autoscroll_text.style.left=document.getElementById('scrolltop').style.left
	
	if(key_mouse_scroll_flag<1)
	{
	//alert('key_mouse_scroll_flag==0')
	var position_old=position_now;
	for (var i=0;i< post_Arr.length;i++)
		{
			if(post_Arr[i].getBoundingClientRect().top > 0)
			{
				position_now=Number(i);
				break;
			}
		}
	if 	( (post_Arr[position_now].getBoundingClientRect().top > 0.5* getViewport().height) && ( post_Arr[position_now].getBoundingClientRect().top > 200) )
		position_now--;
	position_now=(position_now<0)?0:position_now;
	position_now=(position_now>post_Arr.length-1)?(post_Arr.length-1):position_now;
	}
	else
	{
		key_mouse_scroll_flag--;
	}
	//if (position_old!=position_now)
		//post_Arr[position_old].getElementsByClassName('pti')[0].style.background="";
	for (var i=0;i<post_Arr.length;i++)
		{		post_Arr[i].style.border=""}
	//post_Arr[position_now].getElementsByClassName('pti')[0].style.background="yellow"
	if( localStorage["Autoscroll_highlight_flag"] =="1" )
		post_Arr[position_now].style.border="2px lightgreen groove"
		
	
}
//------------------------------------------------------------------------------------------------------
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>...

 //（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（
 


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<	
var position_now=0;
var key_mouse_scroll_flag=0;
var post_Arr=new Array();
var page_turning_count=0;
//var post_position_Arr=new Array()


	refreshPostArr()
//ini scroll
 if (localStorage["Autoscroll_backward_flag"] == "1"  && localStorage["Autoscroll_checkbox_enabled"] == "1" )
 {
	//scroll(0,getPagearea().height) 
	position_now=post_Arr.length-1;
	post_Arr[position_now].scrollIntoView()
 }
if (localStorage["Autoscroll_backward_flag"] == "-1")
	scroll(0,140)
localStorage["Autoscroll_backward_flag"] = "0" 
//******************************************************************************************		listener


/*注册事件*/ 
if(document.addEventListener){ 
    document.addEventListener('DOMMouseScroll',scrollFunc,false); 
}//W3C 
//window.onmousewheel=
document.onmousewheel=scrollFunc;//IE/Opera/Chrome 

//******************************************************************************************	KEY	listener

if (document.addEventListener) {
          document.addEventListener( "keydown" ,getKeyScrollFunc, false );
     } else if (document.attachEvent) {
          document.attachEvent( "onkeydown" ,getKeyScrollFunc);
     } else {
         document.onkeydown = getKeyScrollFunc;
}
//===============================================

window.onscroll=onScroll;

//<div id="ad" style="position: absolute; width: 15px;line-height:12px; border: 1px dotted rgb(0, 0, 0);  top: 5638px; left: 50px;word-wrap: break-word;"><input type="checkbox" id="Autoscroll_checkbox" class="pc" value="1">鼠标滚动</div>

//===============================================
//check box 
var autoscroll_checkbox=document.createElement("div");
autoscroll_checkbox.innerHTML='<div id="Autoscroll_text" style="position: absolute; width: 15px;line-height:12px; border: 1px dotted rgb(0, 0, 0);  top: 5638px; left: 50px;word-wrap: break-word;"><input type="checkbox" id="Autoscroll_checkbox" class="pc" value="1">鼠标滚动</div>'

document.getElementById('scrolltop').parentNode.insertBefore(autoscroll_checkbox,document.getElementById('scrolltop'));

document.getElementById("Autoscroll_checkbox").onclick = function(){
       if (this.checked ) {
			localStorage["Autoscroll_checkbox_enabled"] = "1"
       } else {
           	localStorage["Autoscroll_checkbox_enabled"] = "0"
       }
}
	   
if (localStorage["Autoscroll_checkbox_enabled"] == "1")
{    
    //filterLockedPost()
    document.getElementById("Autoscroll_checkbox").checked=true
}
else
    document.getElementById("Autoscroll_checkbox").checked=false
	
 onScroll()	
 //==================================================
 //setting button