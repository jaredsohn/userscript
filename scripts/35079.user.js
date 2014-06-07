// ==UserScript==
// @name           SU Element Styles
// @namespace      http://onyxstone.stumbleupon.com/
// @author         http://onyxstone.stumbleupon.com/
// @licence        http://www.gnu.org/copyleft/gpl.html 
// @description    SU Element Styles
// @include        http://*.stumbleupon.com/*
// @license (с) ONYXSTONE (http://onyxstone.stumbleupon.com/)
// ==/UserScript==


//********************AUTO-UPDATER VARIABLES**********************************//

var script_title = "SU Element Styles";
var source_location = "http://userscripts.org/scripts/source/35079.user.js";
var current_version = "0.0.3";
var latest_version = "0.0.3";
var gm_updateparam = "suelementstyles_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

GM_registerMenuCommand("Update SU Element Styles", CheckVersion);

//var version_holder = "http://onyxstone.viviti.com/files/documents/versionholder.txt";
//var version_holder = "http://docs.google.com/View?docid=dgh7b7mj_1hggf4xgk";
var version_holder = "http://www.freewebs.com/onyxstone/suelementstyles.txt";

CheckVersion();

//****************************************************************************//


//*********************************************************************//
//***************************AUTO-UPDATER******************************//
//**************************by psycadelik******************************//
//***************http://userscripts.org/scripts/show/22372*************//
//*********************************************************************//


//Initiate the download of the new script version.
function GetNewVersion() {
        var today = new Date();
        GM_setValue(gm_updateparam, String(today));
        window.location = source_location;
}

//Verify if it's time to update
function CheckForUpdate()
{	
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(lastupdatecheck != "never")
	{
		today = today.getTime(); //Get today's date
		var lastupdatecheck = new Date(lastupdatecheck).getTime();
		var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		

		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 7)			
			CheckVersion();
	}
	else
		CheckVersion();
}

//Make sure we don't have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: version_holder,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));				
				
				if(line != null)
				{
					var strSplit = new Array();
					strSplit = line.split('=');					
					latest_version = strSplit[1];

					if(current_version != latest_version && latest_version != "undefined")
					{
						if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?"))
							GetNewVersion();
						else
							AskForReminder();
					} 
					else if(current_version == latest_version)
					   var t = 5;
						//alert("You have the latest version of " + script_title + ".");
				}
				else
				{
					alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
					SkipWeeklyUpdateCheck();
				}
					
		    }
		});
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder()
{
	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)"))
	{
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms)

		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(gm_updateparam, String(sixdaysago));
	}
	else
		SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}
//===============================================================================
//			- Weekly Auto-Update Check -
//===============================================================================







winO = window.wrappedJSObject;
$ = winO.$;
jQuery = winO.jQuery;


var Preview;
var Flybox;

var textarea 
= $('#blogContent')[0] ||  $('#commentText')[0] || $('#msgContent')[0] || $('#posttext')[0];


//var dot;
var last_edited ="textarea";


var HTML = {

  'blogContent' : 
  '<dl id="oBlog" class="dlSite dlBlog"><dt class="nomargin" >' + 
'<span class="right cmds pdgRight">' +
'<a title="Edit your review or tags" href="#">edit</a>&nbsp;'+
'<a href="">delete</a></span>' +
'<a rel="nofollow" href="#">PREVIEW</a></dt>'+
'<dd class="abs nomargin nothumb" id="oContent">[CONTENT]</dd>'+
'<dd class="abs nomargin">'+
'<div style="line-height: 20px;" class="banner mgnTopSm hidden">'+
'Delete this blog entry?'+
'<input type="button" value="Delete" onclick="" class="mgnLeft btnGreenSm"/>'+
'</div></dd></dl>',

'msgContent' : '<dl class="dlPM"><dd class="thumbnail"><a id="oMyPic" title="me" href=""><img src="http://cdn.stumble-upon.com/images/s.gif"/></a></dd><dt class="message_"><a id="oMyLink" href="#" class="textEm">me</a> <span id="oContent">[CONTENT]</span></dt><dd><span class="message_"><span class="right textUncolor"></span></span></dd></dl>',

'posttext' : '<tr><td align="center" valign="top" class="lightbg pdgTopSm pdgBottomSm"><a href="#"><img hspace="8" border="0" id="oMyPic"/></a><br/><span class="mini"></span></td><td width="100%" valign="top" class="lightbg pdgBottomSm"><table cellspacing="0" cellpadding="2" width="100%"><tbody><tr><td><a name="end"/><a href="#" target="_top"><img border="0" src="http://www.stumbleupon.com/images/arank4d.gif"/> me</a> → </td><td align="right"><span class="date"><b>date</b></span><a href="#"><b> 10</b></a></td></tr><tr><td colspan="2" >[CONTENT]</td></tr></tbody></table><br/><br style="font-size: 4px;"/></td></tr>'

}




var Html = {

  _in : function( string ) {

    string = string.replace( /\<br\>/g, '\n');
    return string;
  },
  
  out : function( string ) {

    string = string.replace( /\n/g , '<br />' );
    return string;
  }


}

var CSS = {
    _in : function( string ) {
      
    
    },
    
    out : function( elem ) {
    
    
      elem.style.MozBackgroundClip = "";
      elem.style.MozBackgroundInlinePolicy = "";
      elem.style.MozBackgroundOrigin = ""; 
      
      if( elem.style.backgroundAttachment == "scroll" ) 
        elem.style.backgroundAttachment = "";
        
      if( elem.style.backgroundImage == "none" ) 
        elem.style.backgroundImage = ""; 
      
      if( elem.style.backgroundRepeat == "repeat" ) 
        elem.style.backgroundRepeat = "";  
      
      if( elem.style.backgroundPosition == "0% 0%" ) 
        elem.style.backgroundPosition = "";
        
        if( elem.style.length < 1)
            elem.removeAttribute( 'style' );
        
        return elem.getAttribute('style');    
    }

}



function submit() {

if( last_edited == "preview") {
$('#oContent')[0].style.background = 'red';
      h = $('#oContent')[0].innerHTML;
      textarea.value = Html._in( h );
      
      
}

if( $('#sendMessageForm')[0])
  $('#sendMessageForm')[0].submit();
    
}


function init( id ) {
      
     if( id == 'blogContent' ) { 
      
      var child = $( HTML[ id ] );
      $('#blogEntries').prepend( child );
     
     
     if( $('#paneAddBlog')[0].style.display == 'none' ) {

       $('#oBlog').hide();
     }
            
            
      $( textarea ).attr('style', "overflow: hidden; width: 600px; height: 100px; min-height: 100px; display: block;").autogrow();
      
       //set toggles for blog
      
      window.wrappedJSObject._toggle_form = window.wrappedJSObject.toggle_form;
      window.wrappedJSObject.toggle_form = toggle_form;
      
      
      window.wrappedJSObject.oSubmit = submit;
      
      button = document.getElementById('submit_buttom');
      button.type = "button";
      button.setAttribute('onclick',"oSubmit(); return post_blog_entry();");
      
      }
      //message
      else if( id == 'msgContent') {
   
        $( '.listMsgs' ).prepend( HTML[ id ] );
        button = $('.btnGreen')[0];
      button.type = "button";
      window.wrappedJSObject.oSubmit = submit;
      button.setAttribute('onclick',"oSubmit();");

        auth();
      

      }

      Preview = new PREVIEW();
      Preview.setHTML( textarea.value );
  
  
      textarea.addEventListener('change', textarea_change, false );
  
      textarea.addEventListener('keyup', textarea_change, false );
      textarea.addEventListener('keydown', textarea_change, false );
      Flybox = new FLYBOX();
      
      
     
      
}

function auth() {

var auth = document.getElementsByName("auth_user")[0];
   
        var href= 'http://cdn.stumble-upon.com/superminipics/'
        
        $('#oMyPic')[0].style.backgroundImage = 'url('+ href + auth.value + '.jpg )';
        var t = document.body.innerHTML.match(/http:\/\/([^\/]+).stumbleupon.com\/inbox\//);

       
       $('#oMyLink').attr('textContent',t[1]).attr('href','http://'+t[1]+'.stumbleupon.com/'); 
}


function PREVIEW() {
  
  this.init = function() {
    this.Content.bind( 'click' , this , this.contentClick );
    GM_addStyle('#oContent *{cursor:crosshair;}')
  }


  this.setHTML = function( string ) {
    

    
    this.Content.html( Html.out( string ) );
  
  }
  
  this.contentClick = function( e ) {

    if( e.originalTarget.nodeType == 1) {
      e.preventDefault();
      Flybox.clear();
      Flybox.showCSS( e.originalTarget );
    
    }
    
      
  } 
  
  

  this.Base = $('#oBlog');
  this.Content = $('#oContent');
  this.init();
}

function findPos(obj) {
	var curleft = curtop = 0;
  do {
			curleft += obj.offsetLeft || 0;
			curtop += obj.offsetTop || 0;
      obj = obj.offsetParent;
  } while (obj);
	return [curleft,curtop];
}



function FLYBOX() {
  this.currentElem;

  this.create = function( ) {
  var html = 
  '<div id="oFlybox" style="display:none;"><span style="float:left;color:black;" class="name"></span><button id="close" type="button" style="float:right;">X</button><p style="clear:both;">CSS</p><textarea class="css txtbox">[no selection]</textarea><br><span>HTML</span><textarea class="html txtbox">[no selection]</textarea></div>'
  
  $(document.body).prepend( html )
  
  var css = "#oFlybox{position:absolute; color:black !important;background: #E9EDEF;  border: 1px outset black; -moz-border-radius:10px;padding: 5px 20px 20px 20px;opacity:0.8;}";
  css+='#oFlybox > .txtbox{background:transparent;color:black;width:300px;max-width:300px;min-height:60px;font-weight:bold;font-size:11px;}'
  css+="#oFlybox span{font-size:13px;border-bottom:2px solid;margin-bottom:5px;}"

  
  GM_addStyle( css );
  
  this.NameBox = $('#oFlybox .name');
  
  this.base = $('#oFlybox')
  this.cssTextarea = $('#oFlybox .css');
  this.htmlTextarea = $('#oFlybox .html');
  this.btnClose = $('#close');
  this.btnClose.bind('click','',function() {
    $('#oFlybox').hide();
  });
  
  $('#oFlybox .txtbox').autogrow();
  this.cssTextarea.bind('keyup',this,this.cssChange);
  this.cssTextarea.bind('mousedown',this,this.cssRefresh);
  this.cssTextarea.bind('keydown',this,this.cssChange);
  this.cssTextarea.bind('keypress',this,this.cssChange);
  this.cssTextarea.bind('mousedown',this,this.cssChange);
  
  this.htmlTextarea.bind('keyup',this,this.htmlChange);

  this.htmlTextarea.bind('keydown',this,this.htmlChange);
  this.htmlTextarea.bind('keypress',this,this.htmlChange);
  this.htmlTextarea.bind('mousedown',this,this.htmlChange);
  
  }
  
  this.clear = function() {
    this.htmlTextarea[0].value ="[no selection]"
    this.cssTextarea[0].value = "[no selection]"
  }
  
  this.showCSS = function( elem ) {
  
   
   this.currentElem = elem;
   
   
   if( elem.id == "oContent") 
      this.showGlobal( elem );
   else this.showElem( elem );
   
    
  
  }
  
  this.showGlobal = function( elem ) {
  this.NameBox[0].textContent = 'Element:  root';
   this.cssTextarea.hide();
    var html = elem.innerHTML;
 
   
   this.htmlTextarea[0].value = Html._in( html );
    this.base.show(); 
   this.updateSize( this.htmlTextarea )
  }
  
  this.showElem = function( elem ) {
  this.NameBox[0].textContent = 'Element:  ' + elem.tagName;
      this.cssCleanup( elem );
      var css = $( elem ).attr( 'style' );
   
     if( css ) 
       this.cssTextarea[0].value = this.cssLineBreak ( css );
     else 
       this.cssTextarea[0].value = "";
   
   var html = elem.innerHTML;

   
   this.htmlTextarea[0].value = Html._in( html );
   
   
   this.base.show(); 
   this.updateSize( this.htmlTextarea )
   this.updateSize( this.cssTextarea )
   
   var xy = findPos( elem );
   this.base[0].style.left = xy[0]+'px';
   this.base[0].style.top = xy[1]+elem.offsetHeight+'px';
   this.cssTextarea.show();
   
   
  }
  
  this.cssLineBreak = function(css) {
  
    return css.replace(/;\s/g,';\n');
  }
  
  this.cssRefresh = function( e ) {
  
    var css = e.data.cssTextarea.attr('value');
    e.data.cssTextarea.attr('value', e.data.cssLineBreak( css ) );
  }
  
  this.cssCleanup = function( elem ) {

      CSS.out( elem );
  }
  
  this.cssChange = function( e ) {
      css = e.data.cssTextarea.attr('value');
      $(e.data.currentElem).attr('style', css );
      var docFr = document.createElement('div');
      docFr.innerHTML = $('#oContent')[0].innerHTML;
      
 
      
      for(i=0;i<docFr.childNodes.length;i++) {
      
      if( docFr.childNodes[i].nodeType == 1 )
        CSS.out( docFr.childNodes[i] );
      }
      
      h = docFr.innerHTML;
      textarea.value = Html._in( h );
      
      last_edited = 'preview'
    
  }
  this.htmlChange = function( e ) {
      html = e.data.htmlTextarea.attr('value');
      $(e.data.currentElem).attr('innerHTML', Html.out(html) );
      h = $('#oContent')[0].innerHTML;
      textarea.value = Html._in( h );
      
      last_edited = 'preview'
  }
  
  this.updateSize = function( area ) {
  

   area[0].style.height = area[0].scrollHeight+'px';
  }
  
  this.hide = function() {
    this.base.hide();
  }
  
  
  this.create();

}





function toggle_form( type ) {

 display_blog_tab = window.wrappedJSObject.display_blog_tab;
 jQuery = $;
 
 if( !display_blog_tab)
 {
 jQuery('#paneAddBlog').toggle();
 jQuery('.post_a_' + type ).toggle();
 $( '#oBlog').toggle();
 display_blog_tab = type;
 }
 else if( type == display_blog_tab )
 {
 jQuery('#paneAddBlog').toggle();
 jQuery('.post_a_' + type ).toggle();
 $( '#oBlog').toggle();
 display_blog_tab = "";
 }
 else
 {
 jQuery('.post_a_' + type ).toggle();
 jQuery('.post_a_' + display_blog_tab ).toggle();

 display_blog_tab = type;
 }

 
 window.wrappedJSObject.display_blog_tab = display_blog_tab;
 
}







var txt_cache;

if( textarea ) {

  init( textarea.id );
}


function textarea_change( e ) {
  Preview.setHTML( e.target.value );
  Flybox.hide();
  last_edited = 'textarea';
  
}


function Textarea( elem ) {

this[0] = elem;

this.value = function() {
  
  

}

}


