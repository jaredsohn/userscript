// ==UserScript==
// @name        Facebook Remaker
// @description Facebook Remaker is a little Greasemonkey script that remakes Facebook!
// The features are, reload link, removes home link, removes junk from the home page,
// and so much more! You can also control what it removes from your Facebook.
// @include     https://*.facebook.com*
// @exclude     https://*.facebook.com/login.php*
// ==/UserScript==




// -------- Control Center ---------> | <-----
// Sorry for the confusion ._.!

urlcleaner = true;  // True - Work | False - No Work 
toolbarremake = true; // True - Work | False - No Work 
facebooktoolbar = false;  // True - No Work | False - Work
profiletohome = false;  // True - Work | False - No Work
homebegone = true;  // True - Work | False - No Work
friendsinvremove = true;  // True - Work | False - No Work
findfriendremove = true;  // True - Work | False - No Work
pepcareless = true;  // True - Work | False - No Work
reload = true;  // True - Work | False - No Work
age = true;  // True - Work | False - No Work
login = true;  // True - Work | False - No Work
adsremove = true;  // True - Work | False - No Work

// Sorry for the confusion!
// -------- End Control Center --------> | <--

// Auto Login!

if(login) {

if (p=document.getElementById('pass')) {
	if (p.value) {
		a=p.parentNode;
		while(!a.submit && (a!=null)) {a=a.parentNode;}
		a.submit();
	}
}
}

// End Auto Login


// Auto Update

CheckScriptForUpdate = {
 name: 'Facebook Remaker',
 version: '1.4',
 id: '39048',
 days: 1,

 time: new Date().getTime().toString(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you 

want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new 

Date().getTime().toString());CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response == 'return') alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (parseInt(this.time) > (parseInt(GM_getValue('updated', 0)) + (1000*60*60*24*this.days))) && (GM_getValue('updated', 0) 

!= 'off') ) {
      this.call('none');
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new 

Date().getTime().toString());CheckScriptForUpdate.call('return');});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new 

Date().getTime().toString());CheckScriptForUpdate.call('return');});
    }
    }
};
if (self.location == top.location) CheckScriptForUpdate.check();

// End Auto Update

// Facebook URL Cleaner


if(urlcleaner) {

window.gm_cleanURL = function() {
   // if the url is ugly, change it
   var reg = /^(https?:\/\/([-a-z0-9]+\.)*facebook\.com)\/[^#]+#(\/.+)/i;
   if (reg.test(window.location.href)) {
      var foo = window.location.href.replace(reg,'$1$3');
      window.location.replace(foo);
   }
   else {
      window.setTimeout(gm_cleanURL, 500);
   }
}
gm_cleanURL();
}

// End Facebook URL Cleaner

// Facebook Toolbar Make Over - IT'S SO CONFUSING!! Don't hurt your brain now :).

if(toolbarremake) {

GM_addStyle("#presence_bar{background: url(http://i74.photobucket.com/albums/i273/jhfire_2006/chat_bar.png) repeat-x top left 

!important;}#presence_popin_bar{background: url(http://i74.photobucket.com/albums/i273/jhfire_2006/chat_bar.png) repeat-x top 

left !important;}#presence.full, #presence_ui{margin-left:15px;margin-right:15px;border-left:1px solid 

#404040;border-right:1px solid #404040; background: url(http://i74.photobucket.com/albums/i273/jhfire_2006/chat_bar.png) 

repeat-x top left; !important;} #presence .presence_bar_button{border-left:0px;border-right:0px !important;} #presence 

#presence_applications_tab{border-left:0px !important;} #presence #chat_status_control_tab{border-right:0px !important} 

#presence #presence_bar_buttons .presence_bar_button.chat_status_control.hover{border-right:0px !important;}#presence 

#presence_applications_icon_garden{height:25px;margin-left:1px;border-left:1px solid #404040 !important;} #presence 

#presence_applications_bookmark_app 

.bookmark_app_plus{background:url(http://i74.photobucket.com/albums/i273/jhfire_2006/green_plus.png) left top 

no-repeat;width:8px;height:8px !important;} #presence #presence_applications_icon_garden .icon_garden_elem.hover{background: 

url() repeat-x top left; !important;} .bookmark_top 

.bookmark_app_plus{background:url(http://i74.photobucket.com/albums/i273/jhfire_2006/green_plus.png) left top 

no-repeat;width:8px;height:8px !important;} #newsfeed_wrapper {height:0;padding:5px 0 0 7px !important;} #home_main { 

float:right; width:565px !important;} .UITwoColumnLayout_Content { float:right !important;} .profile .right_column_container 

.profile_sidebar_ads { float:right; visibility:hidden; width:180px !important;} #fb_menubar_core .fb_menu_count_holder .bl { 

background-position:right top; padding:0 6px 1px !important;}"); // Confusing?

}

// End Facebook Toolbar Make Over! - Don't worry it's over :).

// Ad Remover Start

if(adsremove) {

GM_addStyle('#sidebar_ads { visibility:hidden !important }');
GM_addStyle('.social_ad { display:hidden !important }');
GM_addStyle('.sponsor { display:hidden !important }');

}

// End Ad Remover


// Facebook Toolbar Removal

if(facebooktoolbar) {

GM_addStyle("#presence {display: none !important;}");

}

// End Facebook Removal


// Profile to Home

if(profiletohome) {

	while(document.body.innerHTML.indexOf("Profile")>0)
	{

	document.body.innerHTML = document.body.innerHTML.replace	("Profile", "Home");

}
}

// End Profile to Home


// Home be Gone

if(homebegone) {

document.getElementById('fb_menu_home').innerHTML = '';}

// End Home be Gone


// Invite Friends Removal

if(friendsinvremove) {

friendsinv = ['sidebar_item invitefriends'];

Tags = document.getElementsByTagName('*');                                      
for(i=0; i<Tags.length; i++){
    tagClass = Tags[i].className;                                               
            for(count=0; count<friendsinv.length; count++){
                if (tagClass == friendsinv[count])
                    Tags[i].style.display = 'none';}        
}
}

// End Invite Friends


// Find Friends Removal

if(findfriendremove) {

friendsfind = ['sidebar_item findfriends'];

Tags = document.getElementsByTagName('*');                                      
for(i=0; i<Tags.length; i++){
    tagClass = Tags[i].className;                                               
            for(count=0; count<friendsfind.length; count++){
                if (tagClass == friendsfind[count])
                    Tags[i].style.display = 'none';}  

}
}

// End Find Friends Removal


// People I can care less about

if(pepcareless) {

peoplecareless = ['sidebar_item pymk'];

Tags = document.getElementsByTagName('*');                                      
for(i=0; i<Tags.length; i++){
    tagClass = Tags[i].className;                                               
            for(count=0; count<peoplecareless.length; count++){
                if (tagClass == peoplecareless[count])
                    Tags[i].style.display = 'none';}  

}
}

// End people I can care less about


// Reload

if(reload) {

function insertAfter(newNode, node) {
	if (node.nextSibling)
		node.parentNode.insertBefore(newNode, node.nextSibling);
	else node.parentNode.appendChild(newNode);		last
}

try {
	var fbdiv = document.getElementById('fb_menubar_aux');
	if (fbdiv) {
		var reloadDiv = document.createElement('div');
		reloadDiv.setAttribute('id','fb_reload');
		reloadDiv.innerHTML = "<div id='fb_menubar_core'><div class='fb_menu' id='fb_menu_home'><div 

class='fb_menu_title'><a href='#' OnClick='window.location.href=window.location.href'><span 

class='menu_title'>Reload</span></a></div></div>";
		insertAfter(reloadDiv, fbdiv);
		
	}
} catch (err) { GM_log("Error: " + err); }

}

// End Reload


// Age Display

if(age) {

var info='';
var birthdayTD;
var bday = new Date();
var birthdayInfo

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp('(^|\\\\s)'+searchClass+'(\\\\s|$)');
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}


birthdayDIV = getElementsByClass('birthday', document, '*')[0];
birthdayTD = birthdayDIV.getElementsByTagName('DD')[0];
var birthdayInfo = birthdayTD.innerHTML;  
var birthdaySplit = birthdayTD.innerHTML.split(',');
var monthDay = birthdaySplit[0];
try {
	var year = birthdaySplit[1];
	bday.setTime(Date.parse(birthdayInfo));
	var now = new Date();
	var age = now.getFullYear()-bday.getFullYear();
	if (now.getMonth()<bday.getMonth()) { age-=1; }
	else if (now.getMonth()==bday.getMonth() && now.getDate()<bday.getDate()) { age-=1; }
	info = '<div class="birthday" style=""><dt>Age:</dt>'+ age+' years old';
} catch(x) {
	bday.setTime(Date.parse(monthDay+', 2007'));
}

	var ageSpan = document.createElement('DD');
	ageSpan.innerHTML = info;
	birthdayDIV.appendChild(ageSpan);

}

// End Age Display