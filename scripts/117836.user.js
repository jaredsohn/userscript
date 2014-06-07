// ==UserScript==
// @name           Beta Foto Master v2
// @namespace      http://darkostanimirovic.com/
// @description    AJAX-enabled photo fetcher for BETA photo service.
// @include        http://users.beta.co.rs/novo.asp*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.js
// @require        http://yui.yahooapis.com/combo?2.9.0/build/yuiloader-dom-event/yuiloader-dom-event.js&2.9.0/build/calendar/calendar-min.js&2.9.0/build/selector/selector-min.js
// @resource       yCSS http://yui.yahooapis.com/combo?2.9.0/build/calendar/assets/skins/sam/calendar.css
// ==/UserScript==

/* 
 * TO DO: 	1) Kada predje limit dostupnih fotki, program se zaglupi i samo otvara nove stranice
 *			2) Unaprediti status:
 *				Da pise do kog je dana stiglo, koliko ukupno fotografija, koliko vremena sve traje...
 *			3) Popraviti Component is not available, mislim da je YUI Calendar
 *			4) Unaprediti kako da finalni $.post zna da je on poslednji i da posle njega treba da se ispisu fotke
 *			5) Ispraviti pravopis za broj fotografija
 *
 *  U ovoj verziji:
 *   Ne otvaraju se novi tabovi, vec se pomocu AJAX-a pozivaju stranice, cita HTML i na KRAJU otvara novi prazan prozor u koji smesta sve fotografije.
 *   Sa te stranice bi se moglo ici na DownThemAll.
 *
 */
YAHOO.namespace("master.beta"); 

// add Yahoo! css to head
var yCSS = GM_getResourceText("yCSS");
GM_addStyle(yCSS);

// Setup the page
var debugging = true;
var status_codes = new Array("", "loading", "finished");
var process={}

YAHOO.master.beta.init = function() 
{ 
	// Set-up the process
	
	// Read cookies
	if( getCookie('last_download_time' ) ) $('#timecode').val(getCookie('last_download_time'));
	
	var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('style');
	
	var last7days = new Date();
	var lastDate = getCookie('last_download_date');
	
	if(lastDate) {
		lastDate = lastDate.match(/([\d]{1,2})-([\d]{1,2})-([\d]{4})/);
		lastDate = lastDate[2] + "/" + lastDate[1] + "/" + lastDate[3];
	} else {
		lastDate = (last7days.getMonth()-1) + "/" + last7days.getDate() + "/" + last7days.getFullYear();
	}
	
	var css = document.createTextNode(
	'.old_content{ display:none; }\
	.new_content{ margin:0 auto; width:800px; }\
	.new_content .content{ text-align:center; background-color:white; padding:2em 3em 4em; margin: 40px 0 3em; text-align: center; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) }\
	h1 { font-family: Calibri,Trebuchet MS,sans-serif; font-weight:bold; margin:1em 0 .7em; line-height:.1em; font-size:2.5em; }\
	h1, p.description.main{ text-align:center; }\
	h2{ font-family:Trebuchet MS, Arial, sans-serif; font-size: 1.3em; margin:1em 0 .7em; }\
	p{ font-size: .7em; }\
	p.description{ margin-bottom:2em; }\
	//#advanced{ display:none; }\
	#datetimepicker{ margin: 0 auto; width:200px; }\
	.submit{ margin-top:1.5em; }\
	.button:active, .button-pressed {\
		background: -moz-linear-gradient(#F9F9F9, #F1F1F1 70%, #F9F9F9) repeat scroll 0 0 transparent;\
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) inset;\
	}\
	.button:hover {\
		cursor: pointer;\
		border: 1px solid #ABABAB;\
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);\
		color: #555555;\
		text-decoration: none;\
	}\
	.button-disabled{\
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16) inset;\
    	color: #AAAAAA;\
	}\
	.button {\
		background: -moz-linear-gradient(#FFFFFF, #F3F3F3 70%, #FFFFFF) repeat scroll 0 0 transparent;\
		border: 1px solid #CCCCCC;\
		border-radius: 2px 2px 2px 2px;\
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);\
		color: #777;\
		font-family: Trebuchet MS,sans-serif;\
		font-size: 0.8em;\
		line-height: 2.4em;\
		min-width: 50px;\
		padding: 10px 22px;\
	}\
	.yui-calcontainer{ float:none; }\
	#status, #status_image{ display:none; }\
	#status_wrap{ margin-top:2em; }\
	#status{ margin-top: 1em; }\
	#status .small{ font-size:0.7em; line-height:3em; }\
	#status_image{ margin:0 auto; }\
	#status_image.loading { background: url("http://i42.tinypic.com/doxhl0.gif") no-repeat; width:48px; height:48px; }\
	#status_image.finished{ background: url("http://i40.tinypic.com/2d6p9gy.png") no-repeat; width:47px; height:44px; }\
	.photos_wrap{ margin-top: 2.5em; text-align: left;}\
	.photo{ float:left; height: 126px; margin: 0 17px 17px 0; overflow: hidden; position: relative; vertical-align: bottom; width: 126px;}\
	.photo img{ position: absolute;  min-height: 126px; min-width: 126px;}');
	
	style.appendChild(css);
	head.appendChild(style);

	var staro = document.getElementsByTagName('body')[0].innerHTML;
	var novo =
	'<div class="old_content">' + staro + '</div>\
	<div class="new_content">\
		<div class="content">\
			<h1>Beta foto pimp</h1>\
			<p class="description main">Lako do fotografija sa Beta foto servisa!</p>\
			<div id="advanced">\
				<h2>Datum</h2>\
				<p class="description">Kog datuma je poslednja fotografija koju imate?</p>\
				<div id="dateform">\
					<div id="datetimepicker" style="padding-bottom:20px;"></div><br />\
				</div>\
				<h2>Vreme</h2>\
				<p class="description">Koje je vreme poslednje fotografije koju imate?</p>\
				<div class="timeform"><input id="timecode" type="text" value="00:00" /></div>\
				<div class="submit">\
					<input type="button" id="getphotos" class="button" value="Preuzmi fotografije &rarr;" />\
					<p class="description" id="statusdesc"></p>\
				</div>\
			</div>\
			<div id="status_wrap"><div id="status_image"></div><div id="status"></div></div>\
		</div>\
	</div>';
	
	// Update layout
	document.getElementsByTagName('body')[0].innerHTML = novo;
	
	// Required for the calendar
	$('body').addClass('yui-skin-sam');

	// Setup calendar picker
	last7days.setDate(last7days.getDate() - 7);
	YAHOO.master.beta.calendar = new YAHOO.widget.Calendar("calendar_main", "datetimepicker", {
		mindate: last7days,
		maxdate: new Date(),		
		selected: lastDate
	}); 
	YAHOO.master.beta.calendar.render(); 
	
	// Make a mask for time-code input
	$("#timecode").mask("99:99");

	// Insert Status area
	$('<div id="status" class="processing"></div>').appendTo('#beta_master');
	
	// Validation and processing
	$('#getphotos').click( function()
	{
		// Get the date
		var selectedDate = YAHOO.master.beta.calendar.getSelectedDates()[0];

		// Check if time code is right
		if( $('#timecode').val() !== $('#timecode').val().match(/[\d]{1,2}:[\d]{1,2}/).join("") ) {
			alert( "Vreme mora biti u formatu 24:60" );
			return false;
		}
	
		$('#advanced').slideUp('slow', function(){
			// Show status
			$('#status, #status_image').slideDown('slow');
			
			// Start working!
			process.getRawHTML( process.current_page );
		});
	});
} 
YAHOO.util.Event.onDOMReady(YAHOO.master.beta.init);

process = {
	finished: false,
	current_page: 1,
	photos: [],
	photos_html: "",
	photos_per_batch: 500,
	batches: 0,
	partial_download: false,
	photos_count: 0,
	partial_download: false,
	
	
	/*
	 * Used to fetch raw HTML data from a photo page
	 */
	getRawHTML: function()
	{
		_status( '<span class="small">Prikupljam...</span>', 1 );
		
		// current_page is 1-based
		$.get("http://users.beta.co.rs/foto1.asp?do=" + ((this.current_page-1) * 100), 
			function(data){
				process.processRawHTML( data );
			});
	},
	
	/*
	 * Process raw HTML data and select photos for download
	 */
	processRawHTML: function( html )
	{
		// Get the date
		var selectedDate = YAHOO.master.beta.calendar.getSelectedDates()[0];
	
		// Check if time code is right
		if( $('#timecode').val() !== $('#timecode').val().match(/[\d]{1,2}:[\d]{1,2}/).join("") ) {
			alert( "Vreme mora biti u formatu 24:60" );
			return false;
		}
	
		// Set hours and minutes to the final Date object
		var hours = $('#timecode').val().match(/([\d]{1,2}):/);
		var mins  = $('#timecode').val().match(/:([\d]{1,2})/);
		selectedDate.setHours( hours[1] );
		selectedDate.setMinutes( mins[1] );
		
		// If we have reached beyond the maximum of allowed photos, break out!
		/*if( $(fetched_html).find('#nekefotke table tbody').children().size() <= 2 ) {
			_status("You have reached the limit of available photos: " + $('#nekefotke table tbody').children().size());
			_status($('#nekefotke table tbody'));
			return;
		}*/
		
		// Go through all p.tkst and get their dates
		$(html).find('.sivbi .tkst').each( function()
		{
			// Search for time and date code
			var this_date = this.innerHTML.match(/[\d]{1,2}\-[\d]{1,2}\-[\d]{4}/);
			var this_time = this.innerHTML.match(/[\d]{1,2}:[\d]{1,2}/);
			var photo_id  = this.innerHTML.match(/id - (\d{7})/);
			if(photo_id) photo_id = photo_id[1];
			
			// If time codes are correct, get a real Date object
			if( this_time !== null && this_date !== null )
			{
				reggie = /(\d{1,2})-(\d{1,2})-(\d{4}) (\d{1,2}):(\d{1,2}):(\d{2})/;
				dateArray = reggie.exec(this_date + " " + this_time + ":00");
	
				photo_date = new Date(
					dateArray[3],
					dateArray[2]-1, // Careful, month starts at 0!
					dateArray[1],
					dateArray[4],
					dateArray[5],
					"00"
				);
	
				// Select this photo for download
				if( photo_date > selectedDate ) 
				{
					process.photos[process.photos_count] = photo_id;
					process.photos_count++;
					//process.photos_count++;
					process.updateStatus();
				} else {
					process.partial_download = true;
					return;
				}
			}
		}); // <-- .tkst.each() -->
	
		// Submit the form only if we're downloading all photos
		// Otherwise the user might want to re-check the photos around the "edge time"
		if( !this.partial_download ) 
		{
			// Advance one page and fetch the photos
			this.current_page++;
			this.getRawHTML();
			
		} else {
			_status( "<strong>Finalna obrada...</strong>" );
			
			// Since Beta Foto server has max_execution time which sometimes is not enough for a lot of photos,
			// we will limit the batch with 'photos_per_batch'
			this.batches = Math.ceil(this.photos_count/this.photos_per_batch);
			for( var d=1; d<=this.batches; d++)
			{
				var post={};
				
				// Get the current batch of photos
				post.broj_slika = this.photos_per_batch;		//(photos_count > photos_per_batch) ? d * photos_per_batch : photos_count;
				if(post.broj_slika > this.photos_count-((d-1) * this.photos_per_batch)) post.broj_slika = this.photos_count - ((d-1) * this.photos_per_batch);
				
				for (var c=1; c<=post.broj_slika; c++){
					post['cb' + c] = 'on';
					post['id' + c] = this.photos[((d-1)*this.photos_per_batch) + (c-1)];
				}
				
				// Fetch the photos
				$.post("http://users.beta.co.rs/foto12.asp", post, function(data)
				{
					// Process the FINAL photos
					process.finalProcess( data );
					
					// If this is the final batch
					console.log(d + "; " + process.batches);
					if(process.finished)
					{
						// Put photos into the page
						$('<div class="photos_wrap">' + process.photos_html + '</div><div style="clear:both;"></div>').appendTo('.new_content .content');
						$('.photos_wrap').slideDown( 2000 );
				
						// All done, do some maintenance
						// Remember current time, that's where we want to start from next time. Ensure hours and minutes are zero-preceding if less then 10
						now = new Date();
						setCookie( 'last_download_date', now.getDate() + "-" + (parseInt(now.getMonth()) + 1) + "-" + now.getFullYear(), 7  );
						setCookie( 'last_download_time', ((now.getHours() < 10) ? "0" + now.getHours() : now.getHours()) + ":" + ((now.getMinutes() < 10 ) ? "0" + now.getMinutes() : now.getMinutes()), 7  );
						
						_status( "<strong>Završeno!</strong><br /><span class='small'>" + process.photos_count + " fotografija za preuzimanje.</span>", 2 );
					}
				});
				
				if(d==this.batches) this.finished = true;
			}
			/*
			d=1 d<=2 d++
				broj slika = 1000;
				(1000 > 2300-(2*1000)) broj slika = 
				
				for c=1 c<=800 c++
					post[id1] = photos[1000 + 0]
			
			
			
			*/
		}
	},
	
	/*
	 * Final processing
	 *  Takes all photos selected for download, strips them of unnecessary HTML and displays them inline
	 *
	 */
	finalProcess: function( html )
	{
		// Remove hidden input fields from html since they cause uncaught exception when there are over 1000 or so images
		// uncaught exception: Syntax error, unrecognized expression: (aktivna-mod(aktivna,4))/4
		//console.log("Hajde da pokusamo");
		//html = html.replace("(aktivna-mod(aktivna,4))/4", "");
		
		//html = html.replace(/mod\(\(aktivna\-mod\(aktivna,4\)\)\/4/, "");
		//console.log(html);
		//html = $(html).find('input').remove();
		
		$(html).find('td').each( function()
		{
			var fullsize  = this.innerHTML.match(/a href="(foto\/[\d]{4}\/[\d]{1,2}\/[\d]{1,2}\/[A-Z]+\.jpg)/);
			var thumbnail = this.innerHTML.match(/src="(foto\/[\d]{4}\/[\d]{1,2}\/[\d]{1,2}\/[0-9]+\.jpg)/);
			console.log( fullsize + " :: " + thumbnail );
			if( fullsize && thumbnail ) process.photos_html += '<div class="photo"><a href="' + fullsize[1] + '"><img src="' + thumbnail[1] + '" /></a></div>';
		});
		console.log(this.photos_html);
	},
	
	updateStatus: function(){
		
	}
	
	
	
	
}

function _status( message, code )
{
	code = typeof(code) != 'undefined' ? code : 0;
	
	$('#status').html(message);
	$('#status_image').addClass( status_codes[code] );
		
	if(debugging) console.log(message);
}

/*
 * Additional scripts / plugins without CDN versions
 *
 */

// Cookie manipulation
// @link: http://jquery-howto.blogspot.com/2010/09/jquery-cookies-getsetdelete-plugin.html
function setCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString()}else var expires="";document.cookie=name+"="+value+expires+"; path=/"}function getCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length)}return null}function deleteCookie(name){setCookie(name,"",-1)}

/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2011 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license) 
	Version: 1.3
*/
(function(a){var b=(a.browser.msie?"paste":"input")+".mask",c=window.orientation!=undefined;a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn"},a.fn.extend({caret:function(a,b){if(this.length!=0){if(typeof a=="number"){b=typeof b=="number"?b:a;return this.each(function(){if(this.setSelectionRange)this.setSelectionRange(a,b);else if(this.createTextRange){var c=this.createTextRange();c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select()}})}if(this[0].setSelectionRange)a=this[0].selectionStart,b=this[0].selectionEnd;else if(document.selection&&document.selection.createRange){var c=document.selection.createRange();a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length}return{begin:a,end:b}}},unmask:function(){return this.trigger("unmask")},mask:function(d,e){if(!d&&this.length>0){var f=a(this[0]);return f.data(a.mask.dataName)()}e=a.extend({placeholder:"_",completed:null},e);var g=a.mask.definitions,h=[],i=d.length,j=null,k=d.length;a.each(d.split(""),function(a,b){b=="?"?(k--,i=a):g[b]?(h.push(new RegExp(g[b])),j==null&&(j=h.length-1)):h.push(null)});return this.trigger("unmask").each(function(){function v(a){var b=f.val(),c=-1;for(var d=0,g=0;d<k;d++)if(h[d]){l[d]=e.placeholder;while(g++<b.length){var m=b.charAt(g-1);if(h[d].test(m)){l[d]=m,c=d;break}}if(g>b.length)break}else l[d]==b.charAt(g)&&d!=i&&(g++,c=d);if(!a&&c+1<i)f.val(""),t(0,k);else if(a||c+1>=i)u(),a||f.val(f.val().substring(0,c+1));return i?d:j}function u(){return f.val(l.join("")).val()}function t(a,b){for(var c=a;c<b&&c<k;c++)h[c]&&(l[c]=e.placeholder)}function s(a){var b=a.which,c=f.caret();if(a.ctrlKey||a.altKey||a.metaKey||b<32)return!0;if(b){c.end-c.begin!=0&&(t(c.begin,c.end),p(c.begin,c.end-1));var d=n(c.begin-1);if(d<k){var g=String.fromCharCode(b);if(h[d].test(g)){q(d),l[d]=g,u();var i=n(d);f.caret(i),e.completed&&i>=k&&e.completed.call(f)}}return!1}}function r(a){var b=a.which;if(b==8||b==46||c&&b==127){var d=f.caret(),e=d.begin,g=d.end;g-e==0&&(e=b!=46?o(e):g=n(e-1),g=b==46?n(g):g),t(e,g),p(e,g-1);return!1}if(b==27){f.val(m),f.caret(0,v());return!1}}function q(a){for(var b=a,c=e.placeholder;b<k;b++)if(h[b]){var d=n(b),f=l[b];l[b]=c;if(d<k&&h[d].test(f))c=f;else break}}function p(a,b){if(!(a<0)){for(var c=a,d=n(b);c<k;c++)if(h[c]){if(d<k&&h[c].test(l[d]))l[c]=l[d],l[d]=e.placeholder;else break;d=n(d)}u(),f.caret(Math.max(j,a))}}function o(a){while(--a>=0&&!h[a]);return a}function n(a){while(++a<=k&&!h[a]);return a}var f=a(this),l=a.map(d.split(""),function(a,b){if(a!="?")return g[a]?e.placeholder:a}),m=f.val();f.data(a.mask.dataName,function(){return a.map(l,function(a,b){return h[b]&&a!=e.placeholder?a:null}).join("")}),f.attr("readonly")||f.one("unmask",function(){f.unbind(".mask").removeData(a.mask.dataName)}).bind("focus.mask",function(){m=f.val();var b=v();u();var c=function(){b==d.length?f.caret(0,b):f.caret(b)};(a.browser.msie?c:function(){setTimeout(c,0)})()}).bind("blur.mask",function(){v(),f.val()!=m&&f.change()}).bind("keydown.mask",r).bind("keypress.mask",s).bind(b,function(){setTimeout(function(){f.caret(v(!0))},0)}),v()})}})})(jQuery)