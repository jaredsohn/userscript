// ==UserScript==
// @name          Image Search Preview
// @version       0.2.6
// @include       http://images.google.tld/images?*
// @include       http://www.google.tld/images?*
// @include       http://images.google.com/images?*
// @include       http://images.google.de/images?*
// @include       http://www.google.com/images?*
// @include       http://www.google.de/images?*
// @include       http://www.flickr.com/search/?*
// @include       http://www.flickr.com/photos/*
// @include       http://www.linkedin.com/*
// @include       http://www.bing.com/images/search?q*
// @include       http://*images.search.yahoo.com/search/images*
// @include       http://*.search.yahoo.com/search/images*
// @include       http://www.last.fm/*
// @include       http://www.last.fm.*/*
// @include       http://www.kramery.com/*
// @include 	  http://www.google.com.au/search?*
// @include 	  http://www.google.com/search?*
// @include 	  http://www.google.com.*/*
// @include       http://www.flickr.com/groups/* 



// @history     0.2.6 turned direct link off... turn back on in prefs if 

want...
// @history     0.2.5 added linked in in a brazen attempt to get noticed
// @history     0.2.4 fixed google after months of incactivity - sry all
// @history     0.2.3 added google general to see what happens, max height 

for some guy
// @history     0.2.2 added myspace
// @history	0.2.1 fixed bug
// @history	0.2.0 added kramery as requested
// @history	0.1.9 refactor and lastfm
// @history	0.1.8 fixed delay bug, flickr favorites pages
// @history	0.1.7 fixed background color height bug
// @history	0.1.6 added delay
// @history	0.1.5 fixed some flickr
// @history	0.1.4 added relink preference (not bing yet)
// @history	0.1.3 fixed max width bug
// @history	0.1.2 added pref pane (Ctrl+p in search box)
// @history	0.1.1 added loading msg
// @history	0.1.0 added no conflict 
// @history	0.0.9 fixed flickr direct link
// @history	0.0.8 bing!
// @history	0.0.7 fixed some flickr
// @history	0.0.6 added yahoo and flickr
// @history	0.0.5 added direct link
// @history	0.0.4 auto updates


// ==/UserScript==
//
// 

---------------------------------------------------------------------------

--
//
// Licence: yeah whatever
//
// 

---------------------------------------------------------------------------

--
// if you want to remove ur site... just ask
// 

---------------------------------------------------------------------------

--

//(function(){wrap for opera?})
var ispDebug="";
    
    // init
    var idOfPreviewer='GM_imagePrevViewer';
    var idOfLoading='GM_imagePrevLoader';
    var idOfPrefs='GM_imagePrevPrefs'; 
    var isInBing=false;
    
    try{ScriptUpdater.check(66385);}catch(e){} //updating - breaks in other 

browsers / chrome
    
    // user prefs
    var ShowLoadingMessageCheck = false;
    var RelinkInsteadOfDirectLinkCheck = false;
    var DelayInMillisecondsNum=0;
    var MaxWidthNum=0;
    var MaxHeightNum=0;
    var ShowDirectLinkCheck = false;
    var BackColorText='';
    
    var prefs=

["ShowLoadingMessageCheck","MaxWidthNum","MaxHeightNum","BackColorText","Sh

owDirectLinkCheck","RelinkInsteadOfDirectLinkCheck","DelayInMillisecondsNum

"];
    
    var userPrefHtml='<div id="'+idOfPrefs+'" 

style="padding:20px;position:absolute;width:400px;top:100px;left:100px;z-

index: 99999;background-color:white;border:1px solid 

black;"><div></div><b>Image Search Preview Preferences</b><div></div><div 

id="'+idOfPrefs+'Inner"></div><div></div><input type="button" value="Apply" 

></input><input type="button" value="Cancel" ></input><div></div>  </div>';
    
    //delay
    var delayTimeout=null;
    
    

//////SETUP
    
    

// Add jQuery - could just embed it - faster... hrrmmm...
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 

'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js'; // I 

KNOW its old... its smaller tho
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
 
// Check if jQuery's loaded
    function GM_waitForJq() 
    {
	
	if(typeof unsafeWindow.jQuery == 'undefined')
	{ window.setTimeout(GM_waitForJq,100); }
	else { jQuery = unsafeWindow.jQuery; letsDoSomeMods(); }
    }
    GM_waitForJq();
    loadPrefs();

//////CORE




//GO!!!!
    function letsDoSomeMods()
    {
	
	jQuery.noConflict();

	
        //this line is basically the crux of the whole thing - the rest is 

specifics for URLs / preferences and hide show stuff.
	jQuery("img,canvas").filter(imgIsCool).not("#FlickrLogo").each

(setLinks).each(addHoverForLFM).hover(hoverIn,hoverOut);
	
	jQuery(".tc_zm").hover(function(){},function(){hide();}) //force 

bing to cooperate
	
	//setup preference keys
	jQuery("body").keypress(function(e){
	 
                if ((e.which == 112 || e.which == 121)  && e.ctrlKey) 
                {
                   showUserPrefs();
                };
            }); 

	//alert(ispDebug)

    }
    function addHoverForLFM()
    {
	//implement hover functionality for lastfm
	if (document.title.indexOf('Last.fm') >0 )// && imglink
	{
	    jQuery(this).parents("a").hover(hoverIn,hoverOut);
	}
	
    }
    
    function setLinks(i)	  //add link
	{
	
	try{
	    
	    var imgLink=getImgLink(this);
	    var daParent=jQuery(this).parents("a");
	    
	    if(ShowDirectLinkCheck)
	    {
		    //direct link
		
		//if(i==15)   alert(imgLink);
		
		var newHtml="<br/><a class='fl std eft' href='"+imgLink

+"'>Direct Link</a>";
		
		
		    var isflickr=false;
		    if (imgLink)
			isflickr=document.title.indexOf('Flickr') >=0;
		    if ( imgLink && !isflickr) 
		    {
			//alert(i);
			 daParent.after(newHtml);
		    }
		    else if ( imgLink && isflickr) //flikr is SPECIAL
		    {
			//alert('f');
			daParent=jQuery(jQuery(this).parent('a').parent()

[0]);
			if(document.location.href.indexOf('favorites') >0 )
			{
			    daParent=jQuery(this).parent('a');
			    daParent.append('<div style="font-

size:.5em;"><a href="'+imgLink+'">Direct Link</a></div>');
			}
			else if(daParent.size()>0)
			    daParent.after('<div style="font-size:.5em;"><a 

href="'+imgLink+'">Direct Link</a></div>');
		    }
		
	    }
	    if(RelinkInsteadOfDirectLinkCheck && imgLink)		

//relink
	    {
		daParent.attr("href",imgLink);
		//TODO make work for bing
	      //  daParent.parents(".tc_zm").click(function(){alert

('f');document.location=imgLink;});
	    }
		
	}catch(ex)
	{
	    debug(ex.message);
	}
	    
	}
    
    function hoverIn(e)
    {
	
	
	var thiz=this;
	
	
	if(document.title.indexOf('Last.fm') >0)
	    thiz=jQuery(this).find("img")[0];
	
	var link, gmatch, ymatch,font, newDiv, newLink, contextLink, 

imgLink, domain;      
	var imgLink=getImgLink(thiz,true);
	
	if(RelinkInsteadOfDirectLinkCheck)
	{
	    var daParent=jQuery(thiz).parents("a");
	    imgLink= daParent.attr("href");
	}
	if(imgLink)
	{
	  
	  var lr = e.pageX > document.body.clientWidth / 2 ? 'Left' : 

'Right'; 
	  show(imgLink,lr);
	}
    }
    
    function hoverOut(e)
    {
	
	if(!inNewImg(e) && !isBing(jQuery(this)))   //bing is SPECIAL
	{
	  hide();
	}
	
	
    }

//some helper functions
    function inNewImg(e) 
    {
      var theDiv=jQuery('#'+idOfPreviewer);
      if(theDiv.size()<=0)
	return false;
      theDiv=theDiv.find("img");
      var theOffset = theDiv.offset();
      var leftOffset = theOffset.left;
      var topOffset = theOffset.top;
      var xIn=e.pageX>leftOffset && e.pageX< (leftOffset+theDiv.width() );
      var yIn=e.pageY> topOffset && e.pageY< (topOffset+theDiv.height() );  

   
      return xIn && yIn;
    }
    
    function showLoading(lr,pos)
    {
	var loading =  jQuery("#"+idOfLoading);
	if(loading.size()<=0)
	{
	    jQuery("body").append("<div id='"+idOfLoading+"' 

style='padding:20px;position:absolute;width:250px;top:100px;left:100px;z-

index: 99999;background-color:white;border:1px solid black;'>Loading 

Image...</div>")                
	}
	
	loading =  jQuery("#"+idOfLoading);
	loading.css("top",pos);
	if(lr=='Right')
	{
	    var nleft= document.body.clientWidth - 260 ;
	    loading.css("left",nleft);
	}
	else loading.css("left","0px");
	
	loading.stop(true,true).fadeIn();
	hideLoading();
    }
    function hideLoading(force)
    {
	if (force)
	    jQuery("#"+idOfLoading).stop(true,true).fadeOut(800);
	    
	var preview =  jQuery("#"+idOfPreviewer);
	var prevW =preview.width();
	if(prevW == 0 || flickrBug(preview, prevW))
	    window.setTimeout(hideLoading,200);
	else jQuery("#"+idOfLoading).stop(true,true).fadeOut(800);
    }
    
    
    function show(imgLink, lr)
    {
	var pos = jQuery(window).scrollTop();
	if ( ShowLoadingMessageCheck )
	    showLoading(lr, pos);
	var preview =  jQuery("#"+idOfPreviewer);
	var loading =  jQuery("#"+idOfLoading);
	
	
	if(preview.size()<=0)
	{
	    jQuery("body").append("<div id='"+idOfPreviewer+"' 

style=';position:absolute;top:100px;text-align:center;left:100px;z-index: 

9999;padding:0;border:0;margin:0;'></div>")                
	    jQuery("#"+idOfPreviewer).click(function(){hide()}).hover

(function(){},hide).hide();
	}
	
	preview = jQuery("#"+idOfPreviewer);

	preview.html("").html("<img src='"+imgLink+"' ></img>");
	
	preview.css("top",pos);
	
	
	
	//alert(DelayInMillisecondsNum);
	if(DelayInMillisecondsNum > 1 )
	{
	  
	    if(delayTimeout)
		window.clearTimeout(delayTimeout);
		
	    delayTimeout =window.setTimeout(function(){showPartTwo(lr)}, 

DelayInMillisecondsNum);
	  //  alert(delayTimeout);
	}
	else
	{
	   showPartTwo(lr); 
	}
	
    }
    function showPartTwo(lr)
    {
	preview = jQuery("#"+idOfPreviewer);
	preview.stop(true,true).fadeIn(200);
	
	//alert("link: "+imgLink+" src:"+preview.html());
	if(BackColorText && BackColorText.length>0)
	{
	    preview.css("backgroundColor",BackColorText);
	    fixDivHeight();   
	}

	if(lr=='Right')
	{
	  setRight();
	}
	else preview.css("left",'10px');
	
	setMaxWidthIfNecessary();
	
	
	
    }
    
    function fixDivHeight()
    {
	var x =jQuery("#"+idOfPreviewer+" img").height();
	if(x == 0 )
	{
	  window.setTimeout(fixDivHeight,2000);
	}
	jQuery("#"+idOfPreviewer).height(x);
    }
    
    function setMaxWidthIfNecessary()
    {
	var newVal='';
	if (MaxWidthNum > 0 )
	{
	    newVal=MaxWidthNum;
	}
	var preview =  jQuery("#"+idOfPreviewer);
	preview.css("max-width",newVal);
	preview.find("img").css("max-width",newVal);
	
	if (MaxHeightNum > 0 )
	{
	    newVal=MaxHeightNum;
	}
	var preview =  jQuery("#"+idOfPreviewer);
	preview.css("max-height",newVal);
	preview.find("img").css("max-height",newVal);
	
    }
    function isFlickr(obj)
    {
	var x=obj.find("img").attr("src");
	if(x)
	    return x.indexOf('flickr')>=0 ;
	return false;
    }
    function isBing(obj)
    {    
	var x=obj.attr("src");
	if(x)
	    return x.indexOf('bing')>=0;
	return false;
    }
  
    function flickrBug(obj, w)
    {
	if(w !=24)
	    return false;
	if (isFlickr(obj)) 
	    return true;
	return false;
    }
    
    function setRight()
    {
      var preview =  jQuery("#"+idOfPreviewer);
      var prevW =preview.width();
      if(prevW == 0 || flickrBug(preview, prevW))
      {
	window.setTimeout(setRight,50);
      }
      else
      {
	    var nleft= document.body.clientWidth -prevW ;
	    preview.css("left",nleft);
      }
    }
    function hide()
    {
	if(delayTimeout)
	    window.clearTimeout(delayTimeout);
	jQuery('#'+idOfPreviewer).stop(true,true).fadeOut(200);
    }
    
    function getImgLink(obj)
    {
	//NEED to make this more managable
	var fmMatch =null;
	  var   kMatch =null;
	  var   lMatch =null;
	 var   gmatch=null;
	 var   ymatch=null;
	
	var imgLink; //the whole purpose of this function
	var jObj=jQuery(obj);
	var link=jObj.parents("a")[0];
	
	var src=jObj.attr("src");
	
	if(src)
	{
	     fmMatch = src.indexOf("last.fm")>0;
	     kMatch = src.indexOf("DUgallery")>0;
	     lMatch = src.indexOf("shrink_")>0 ;
	    
	   // alert(src+ ": "+lMatch);
	}
	if(link)
	{
	    gmatch = link.href.match(/&imgrefurl=(.*?)(&start=|&h=|

&usg=)/);	
	     ymatch = link.href.match( /imgurl\=(.*?)(&|%26)?rurl\=/ );
	}
	var fmatch = isFlickr(jObj.parent("a"));
	var mMatch = src.indexOf("myspacecdn.com")>0;
	
	var bmatch = isBing(jObj);
	var wmatch = true;
	
	if(gmatch)
	{
	  gmatch = link.href.match(/\/imgres\?imgurl=(.*?)&imgrefurl=/);
	  imgLink = decodeURIComponent(gmatch[1]);
	}
	else if(ymatch)
	{
	    imgLink= "http://" + decodeURIComponent(decodeURIComponent

(ymatch[1]));
	}
	else if(lMatch)
	{
	       
	    imgLink= src.replace("shrink_40_40/", "");
	    imgLink= imgLink.replace("shrink_80_80/", "");
	   
	    return imgLink;
	}
	else if (fmatch)
	{
	   
	    imgLink= src.replace("_m","");
	    imgLink= imgLink.replace("_t","");
	    imgLink= imgLink.replace("_s","");
	    
	    if (src.indexOf('buddyicons') >0)
	    {
		   imgLink=null;  //kill some flikr if its in the wrong 

spot
	    }
	}
	else if(bmatch)
	{
	 
	    imgLink=decodeURIComponent(src.substring(src.indexOf

('&url=')+5));
	}
	else if (fmMatch)
	{
	    
	    if(src.indexOf("64")>0 || src.indexOf("34s")>0)
	    {
		 imgLink= src.replace("64s","252").replace

("34s","252").replace("64","252");
	    }
    	}
	else if (kMatch)
	{
	    //alert('fd');
	     imgLink= src.replace("thumbSmall/","");
	}
	else if(mMatch)
	{
	    imgLink= src.replace("s_","l_");
	}
	
	return imgLink;
    }
    
    function imgIsCool()
    {
	// image is in a link and not the last fm user avatar.
	return jQuery(this).parents("a").size()>0 && jQuery(this).parents

("#idBadgerUser").size()==0; 

    }
    

    function debug(myString)
    {
	//this is just so i can catch these and look at them later if need.
	ispDebug+="::"+myString;
	
    }
    
/////////USER Preferences below

//please dont try to understand this... its a complex solution to an easy 

problem

function showUserPrefs()
{
    //ADDS OR SHOWS
    if(jQuery('#'+idOfPrefs).show().size()<=0)
    {
	jQuery("body").prepend(userPrefHtml);
	jQuery('#'+idOfPrefs).find("input:eq(0)").click(function()

{applyUserPrefs()});
	jQuery('#'+idOfPrefs).find("input:eq(1)").click(function()

{cancelUserPrefs()});
    }
    
    //SET VALS
    
    for (var i =0;i<prefs.length;i++)
	{
	    //create input for pref, set its value based on our variables
	    if(jQuery('#'+prefs[i]+"Pref").size()==0 )
		jQuery('#'+idOfPrefs+'Inner').append(getNiceText(prefs

[i])+": <input type='"+getPrefType(prefs[i])+"' id='"+prefs[i]+"Pref' 

></input><div></div>");
	    
	    var newVal=eval(prefs[i]);
	  //  alert(newVal);
	    
	    if (newVal==true)
		jQuery('#'+prefs[i]+'Pref').attr("checked","true");
	    else if (newVal == false)
		jQuery('#'+prefs[i]+'Pref').removeAttr("checked");
	    else jQuery('#'+prefs[i]+'Pref').val(newVal);
	    
	}
   
}

function getNiceText(oldText)
{
    var newText="";
    var x = oldText.match(/[A-Z]?[a-z]+/g);
    for ( var i = 0 ; i < (x.length-1);i++) //removes last
    {
	newText+=x[i]+" ";
    }
    
   // if(oldText.indexOf('Num')>0)
	//newText +='(Number)';
    
    return newText;
}

function getPrefType(prefName)
{
    if (prefName.indexOf("Check")!=-1)
	return "checkbox";
    
    if (prefName.indexOf("Text")!=-1)
	return "text";
    
    if (prefName.indexOf("Num")!=-1)
	return "text";
    
    return "text";
    
}

function cancelUserPrefs()
{
     jQuery("#"+idOfPrefs).hide();
}
function applyUserPrefs()
{
    var newPrefs="";
    for (var i =0;i<prefs.length;i++)
    {
	var newVal=jQuery('#'+prefs[i]+'Pref').val();
	if(prefs[i].indexOf('Check')>0)
	{
	    newVal=jQuery('#'+prefs[i]+'Pref').attr("checked");
	}
	else if(prefs[i].indexOf('Text')>0)
	{
	     newVal="'"+newVal+"'";
	}
	//else number - fine as is
	//alert('setting: '+prefs[i]+' to '+newVal);
	newPrefs += prefs[i]+"="+ newVal+";-"
    }
    //apply now
    loadPrefs(newPrefs);
    
    //save
    window.setTimeout(function(e) { reallyApply(newPrefs); },500);    
    jQuery("#"+idOfPrefs).hide();
}
function reallyApply(newPrefs)
{
   // alert(newPrefs);
     GM_setValue("prefs",newPrefs);
     document.location=document.location;
}
function loadPrefs(newPrefString)
{
    window.setTimeout(function(){reallyloadPrefs(newPrefString)},1);
    
}

function reallyloadPrefs(newPrefString)
{
   // var prefString=false;
   var prefString = GM_getValue("prefs");
  
    if(newPrefString)
	prefString=newPrefString;
    if (prefString)
    {
	var storedPrefs=prefString.split("-");
	// load up our variables - just stored as javascript!
	for (var i =0;i<storedPrefs.length;i++)
	{
	    try
	    {
		
		//TODO make better
		var jsToSetVariable = storedPrefs[i].replace

("=on","=true").replace("=;","=0;");
		//alert(jsToSetVariable);
		if(jsToSetVariable)
		{
		    //alert("loading:" +jsToSetVariable);
		    eval(jsToSetVariable); //set our variables...
		}
	    }
	    catch(e)
	    {
		debug(e.message)
	    }
	}
    }
}


// KEYBOARD

// 'sif


    