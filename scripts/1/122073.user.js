// ==UserScript==
// @name           Absterge
// @namespace      http://userscripts.org/users/astojanov
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==

function parseUri (str) {
	var	o = parseUri.options,
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

window.addEventListener('load', function()  {

	var fb_dtsg = null;
	var abstergeProcessingTimeout = 2000;

	// Unfriend as an action as well ?
	var deleteActions = ["Delete", "Report/Remove Tag", "Delete Photo", "Unlike"]; 

	// Verify the delete action
	var isDeleteAction = function (actionType) {
		return (deleteActions.indexOf(actionType) >= 0);
	}
	
	// Get the value of fb_dtsg
	var getConstantParameters = function () {
		if ( fb_dtsg !== null ) {
			return true;
		} else {

			if ( fb_dtsg === null ) {
				$('input[name="fb_dtsg"]').each(function(){
					fb_dtsg = $(this).attr("value");
				});
			}
			return (fb_dtsg !== null);
		}
	}

	// Mimic physical mouse click event (testing only)
	var physicalClick = function (obj) {
		var x = obj.offset().left + ( obj.width () / 2 );	
		var y = obj.offset().top  + ( obj.height() / 2 );	
		$(document.elementFromPoint(x, y)).click();
	}

	// Delete any ministory passed to this function
	var processMinistory = function (ministory, actionObj) {
		var ajaxify = parseUri("http://facebook.com" + actionObj.attr("ajaxify"));
		if ( ajaxify.file === "take_action_on_story.php" ) {
			var data = {
					'fb_dtsg'  : fb_dtsg,
					'confirmed': "true",
					'ban_user' : "0"
			};
			for ( var key in ajaxify.queryKey ) {
				data[key] = ajaxify.queryKey[key];
			}
			$.ajax({
				type    : "POST",
				url     : "https://www.facebook.com/ajax/timeline/take_action_on_story.php",
				data    : data,
				complete: function(jqXHR, textStatus) {
					if ( jqXHR.status === 200 ) {
						if ( $('#cmdAbsterge').attr('deletecount') === undefined || $('#cmdAbsterge').attr('deletecount') === null ) {
							$('#cmdAbsterge').attr('deletecount', '0');
						}
						var deleteCount = parseInt($('#cmdAbsterge').attr('deletecount')) + 1;
						$('#cmdAbsterge').html("Absterge (" + deleteCount + ")");
						$('#cmdAbsterge').attr('deletecount', '' + deleteCount);
						ministory.remove();
					}
					console.log("Deleting:", jqXHR);
				}
			});
		}
	}


	var onAbstergeClick = function () {
		getConstantParameters ();
		console.log("Absterge is starting ...");
		$("div > div > div > div.fbTimelineSection > div > div > div > div > ul > li").each(function() {
			var ministory = $(this);
			ministory.find('a').each(function(){
				if ( $(this).attr("aria-label") === "Allowed on Timeline" ) {
					var editButton = $(this);
					editButton.mousemove();
					editButton.find('i').click();
					setTimeout ( function() { editButton.parent().find('a[ajaxify]').each (function() {	
						if ( isDeleteAction($(this).text()) ) {
							// console.log(ministory, $(this).text());
							processMinistory (ministory, $(this));
						}
					})}, abstergeProcessingTimeout);
				}
			});
		});
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
		console.log("Absterge done ...: ", fb_dtsg);
		setTimeout(onAbstergeClick, 3000);
	};


	// Include the 
	$('<li id="navAbsterge" class="navItem middleItem"><a id="cmdAbsterge" class="navLink bigPadding" href="#">Absterge</a></li>').insertAfter('#navHome');
	var pathname = window.location.pathname;    
	if ( pathname.indexOf('/allactivity') === -1 ) {
		$('#cmdAbsterge').click(function () {
			alert('You must navigate to "Activity Log" using the "Timeline" feature in order to use Absterge');          
		});
	} else {
		$('#cmdAbsterge').css("color", "#FAFAD2");
		$('#cmdAbsterge').click(function () {
			onAbstergeClick();
		});
	}
});
