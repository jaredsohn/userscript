// ==UserScript==
// @name           Facebook Cleaner
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @require        http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js
// edited by motionprevails thanks to the help of Oneduality
// ==/UserScript==



/* 
No warranty. Use with your own risk.

*/
function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};
		
	var deletedMap = {};
	var triggeredMap = {};
	
	var post_form_id = null;
	var fb_dtsg = null;

	var expandCount = 3;
	var deleteCount = 3;
	var limit = false;
	var debug=1;
	var delete_time_bevor=null;
	var iamstillontimeline=false;
	var start=false;
	var lastselected=null;
	var only_hide=false;
	var insert_button=false;
	
	
	var expandMoreActivity = function () {
		var links = $('a[onclick]'); //
		for (var i = 0; i < links.length; ++i) {
			if (( links[i].innerHTML === "More Activity") || ( links[i].innerHTML ==="Weitere Aktivitäten")) {
				if (limit) {
					expandCount -= 1;
				}
				links[i].click();			
			}
		}
		
		if ( !limit || (limit && expandCount >= 0) ) {
		if(iamstillontimeline==true)
			{
			setTimeout(expandMoreActivity, 1000);
			scrollTo(0, 1000000000);
			}
		}
		
		if(debug>=2)
			{
			console.log("Expand");
			}
		
	}

	var getConstantParameters = function () {
		if ( post_form_id != null && fb_dtsg !== null ) {
			return true;
		} else {
			if ( post_form_id === null ) {
				$('input[name="post_form_id"]').each(function(){
					post_form_id = $(this).attr("value");
				});
			}
			if ( fb_dtsg === null ) {
				$('input[name="fb_dtsg"]').each(function(){
					fb_dtsg = $(this).attr("value");
				});
			}
			return (post_form_id != null && fb_dtsg !== null);
		}
	}

	var createDeleteRequests = function () {
			
		if ( getConstantParameters() ) {
		if(debug>=2)
			{
			console.log ("Begine.");
			}
			check_for_timeline();
			//Sometimes Facebook change here some shit...
			if($('ul[class="uiList mbm uiStream timelineAllActivityStream fbProfileStream translateParent"]').size()==0)
			{
			if(iamstillontimeline==true)
			{
			alert("ERROR: Maybe Facebook changed his design... \n please take a look for a newer version of this Script...");
			}
			}
			$('ul[class="uiList mbm uiStream timelineAllActivityStream fbProfileStream translateParent"]').each( function() {
			
			

				var year = $(this).attr("id").split("all_activity_stream_")[1];
			
				$(this).find('a[ajaxify]').each(function () {
				
					var remove = true;
				 	var ajaxify = parseUri("http://facebook.com" + $(this).attr("ajaxify"));
				 	
				 	var keys = ['profile_id', 'story_fbid', 'story_fbid', 'story_row_time', 'story_dom_id'];
					for ( var i = 0; i < keys.length; ++i ) {
						if ( ajaxify.queryKey[keys[i]] === undefined ) {
				 			remove = false;
							
				 		}
					}
					
					//console.log("The Timestamp is:",ajaxify.queryKey['story_row_time']);
					
			if(debug>=2)
			{
			console.log("Ajax Datei:", ajaxify.file);
			}
			
			
			/*
			Hier wird überprüft, ob die Post ggf. ein bestimmtes alter haben sollen. 
			Definiert über delete_time_bevor in sec vor now
			*/
			now = Math.round((new Date()).getTime() / 1000);

			if(delete_time_bevor!==false)
			{
if(ajaxify.file !== "show_story_options.php")
{
if((now-ajaxify.queryKey['story_row_time']) <delete_time_bevor)
{
if ( remove && deletedMap[ajaxify.queryKey['story_fbid']] === undefined ) {
deletedMap[ajaxify.queryKey['story_fbid']] = false;
console.log("Der Eintrag ist noch zu Jung, ueberspringen! ID:",ajaxify.queryKey['story_fbid']);
console.log("SollZeit: >",delete_time_bevor," Ist Zeit:",now-ajaxify.queryKey['story_row_time']);
}
}
}
		
			}
			
			
			
				 	if ( ajaxify.file === "show_story_options.php") {
						if ( triggeredMap[ajaxify.queryKey['story_fbid']] === undefined ) {
					

							var evt = document.createEvent("MouseEvents");
							evt.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
							$(this).context.dispatchEvent(evt);
							triggeredMap[ajaxify.queryKey['story_fbid']] = true;
						}
				 	} else if (( ajaxify.file === "take_action_on_story.php" ) && (only_hide==false)){
				 	

						if ( remove && deletedMap[ajaxify.queryKey['story_fbid']] === undefined ) {
							deletedMap[ajaxify.queryKey['story_fbid']] = false;
							if(debug==1)
			{
			
						console.log ("Loesche die ID:",queryKey['story_fbid']);
						}
							var data = {
									'nctr[_mod]'		  : "pagelet_all_activity_" + year,
									'post_form_id'		  : post_form_id,
									'fb_dtsg'			  : fb_dtsg,
									'lsd'				  : "",
									'post_form_id_source' : "AsyncRequest",
									'confirmed'			  : "1",
									'ban_user'			  : "0"
							};
							for ( var key in ajaxify.queryKey ) {
								data[key] = ajaxify.queryKey[key];
							}
						
							$.ajax({
								type    : "POST",
								url     : "http://www.facebook.com/ajax/timeline/take_action_on_story.php?__a=1",
								data    : data,
								success: function() {
									$(this).remove() ;
								}
							});
							
							
						
												
						}
					}
					else if ( ajaxify.file === "story_visibility.php" ) {
				 	

						if ( remove && deletedMap[ajaxify.queryKey['story_fbid']] === undefined ) {
							deletedMap[ajaxify.queryKey['story_fbid']] = false;
						console.log ("Change Visibility to hide for ID:",ajaxify.queryKey['story_fbid'] );
							var data = {
									'nctr[_mod]'		  : "pagelet_all_activity_" + year,
									'action'			  :	"hide",
									'post_form_id'		  : post_form_id,
									'fb_dtsg'			  : fb_dtsg,
									'lsd'				  : "",
									'post_form_id_source' : "AsyncRequest",
									'confirmed'			  : "1",
									'ban_user'			  : "0"
							};
							for ( var key in ajaxify.queryKey ) {
							if(key!='action')
							{
								data[key] = ajaxify.queryKey[key];
							}
							}
							
						
							$.ajax({
								type    : "POST",
								url     : "http://www.facebook.com/ajax/timeline/story_visibility.php?__a=1",
								data    : data,
								success: function() {
									$(this).remove() ;
								}
							});
							
							
						
												
						}
					}
					
					
					
				 	
				});
				
			});
		}
				if(iamstillontimeline==true)
				{
		setTimeout(createDeleteRequests, 1000);
		}
	}
	
	
	function check_for_timeline()
	{
	var suchstring = /(allactivity)/g;
	var suchergebnis = suchstring.test( $(location).attr('href') );
	if (suchergebnis != false){
	iamstillontimeline=true;
	}
	
 else
 {
 if((iamstillontimeline==true) && (start==true))
 {
 alert('Abort!');
 start=false;
 }
 iamstillontimeline=false;
 insert_button=false;
 }
	}
	
	
function check_for_history()
{

	check_for_timeline();
	console.log($(location).attr('href'));
	if (iamstillontimeline==true){
		if(insert_button==false){	
		console.log('Button rein!');
add_button();
insert_button=true;
	}
	
if(document.getElementById("selectvalue"))
{
var selected=document.getElementById("selectvalue").options[document.getElementById("selectvalue").selectedIndex].text;
if(start==false)
{
console.log('ok ist noch nix gestartet');

if((lastselected!=selected) && (selected!=""))
{

  switch (selected) {
  
    case "Hide everything on Timeline":
	var text='WARNING: Are you sure you want hide EVERYTHING on your Timeline? Only you can see the old entrys!';
	only_hide=true;
	delete_time_bevor=false;
	
     break;
	 
    case "Delete everything": 
	var text='WARNING: Are you sure to delete EVERYTHING on your Timeline?!';
	only_hide=false;
	delete_time_bevor=false;
	 break;
						 
    case "Hide everything on Timeline older than 90 days": 
	var text='WARNING: Are you sure you want hide all entrys that older than 90 Days?';
	only_hide=true;
	delete_time_bevor=60*60*24*90;
	break;
	
	
    case "Delete things older than 90 Days": 
	var text='WARNING: Are you sure you want DELETE all entrys that older than 90 Days?';
	only_hide=false;
	delete_time_bevor=60*60*24*90;
	
                       break;
			
  }
  lastselected=selected;
  
   if(confirm(text))
 {
 start=true;
 console.log("Beginne mit ",selected);
createDeleteRequests();	
expandMoreActivity();
	console.log ( "ajaxify:", $('*[ajaxify]').attr("ajaxify") );
	
}
 
} 
 }
 
 }
 else
 {
 add_button();
 }
 }
 
setTimeout(check_for_history, 2000);

}
function add_button()
			{
			insert_button=true;
$('span[class="uiButtonGroup fbStickyHeaderBreadcrumb uiButtonGroupOverlay"]').append('<span class="uiButtonGroupItem selectorItem"><div class="uiSelector inlineBlock sectionMenu uiSelectorNormal uiSelectorDynamicLabel"><div class="wrap "><button class="hideToggler"></button><a rel="toggle" data-length="30" aria-haspopup="1" href="#" role="button" class="uiSelectorButton uiButton uiButtonOverlay "><span class="uiButtonText">Privacy Extension</span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div class="uiMenu uiSelectorMenu" role="menu"><ul class="uiMenuInner"><li class="uiMenuItem uiMenuItemRadio uiSelectorOption " data-key="year_2012" data-label="Hide everything on Timeline" ><a href="#" rel="ignore" class="itemAnchor"   tabindex="0" aria-checked="true"><span class="itemLabel fsm">Hide everything on Timeline older than 90 days</span></a></li><li class="uiMenuItem uiMenuItemRadio uiSelectorOption" data-key="year_2011" data-label="Delete everything"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"  aria-checked="false"><span class="itemLabel fsm">Delete everything</span></a></li><li class="uiMenuItem uiMenuItemRadio uiSelectorOption " data-key="Hide everything on Timeline" data-label="Hide everything on Timeline"><a href="#" rel="ignore"  class="itemAnchor" tabindex="0" aria-checked="false"><span class="itemLabel fsm">Hide everything on Timeline</span></a></li><li class="uiMenuItem uiMenuItemRadio uiSelectorOption" data-key="year_2009" data-label="Delete everything older than 90 Days"><a href="#"  rel="ignore" class="itemAnchor" tabindex="0" aria-checked="false"><span class="itemLabel fsm">Delete everything older than 90 Days</span></a></li></ul></div></div><button class="hideToggler"></button></div><select id="selectvalue"><option value=""></option><option value="year_2012">Hide everything on Timeline older than 90 days</option><option value="year_2011">Delete everything</option><option value="year_201x">Hide everything on Timeline</option><option value="year_2009">Delete things older than 90 Days</option><option value="year_2010" >Hide everything on Timeline older than 90 Days</option></select></div></span>');
			}

	
 setTimeout(check_for_history, 4000);