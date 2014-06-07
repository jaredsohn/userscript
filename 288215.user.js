// ==UserScript==
// @name        LSX Enhancement Suite
// @namespace   http://skid.pro/
// @version	    1.0.15
// @description The LSX Enhancement Suite adds a large array of new features to your browsing experience.
// @match       http://leak.sx/*
// @match       http://www.leak.sx/*
// @include     http://leak.sx/*
// @include     http://www.leak.sx/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @updateURL   http://userscripts.org/scripts/source/288215.meta.js
// @downloadURL http://userscripts.org/scripts/source/288215.user.js
// @run-at      document-start
// ==/UserScript==

/*
 * $(function() { }); whey don't you work properly in Userscripts? ;_;
 */
addEventListener('DOMContentLoaded', doHaksPlz, false); 

/*
 * Style shit
 */

var style = '\
#lights-off-please {\
	width: 100%;\
	height: 100%;\
	position: fixed;\
    background-color: rgba(0, 0, 0, 0.6);\
	z-index: 999;\
}\
\
div#cog {\
	display: inline-block;\
	width: 0px;\
	height: 0px;\
	padding: 12px;\
    background-color: #fff;\
    background-image: url(data:image/png;base64,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);\
	float: right;\
    margin-top: 7px;\
}\
\
#sett {\
    display: table;\
    position: fixed;\
    height: 100%;\
    width: 100%;\
    z-index: 1000;\
}\
\
#sett-wrap {\
    display: table-cell;\
    vertical-align: middle;\
}\
\
#sett-content {\
    margin-left: auto;\
    margin-right: auto;\
    width: 500px;\
    background: #202020;\
    text-align: left;\
}\
\
#sett-content ul\
{\
  list-style:none;\
  margin:0;\
  padding:0;\
  color:#fff;\
}\
\
#sett-content ul li img.icon\
{\
  vertical-align:middle;\
  margin-right:5px;\
}\
\
#sett-content ul li\
{\
  display:block;\
  padding:0;\
}\
\
#sett-content > ul > li a:link,#sett-content > ul > li a:visited\
{\
  position:relative;\
  display: block;\
  height:20px;\
  padding:10px 20px;\
  border-left:1px solid #303030;\
  color:#fff;\
  font-weight:400;\
  text-decoration:none;\
  -webkit-transition-duration:.15s;\
  -moz-transition-duration:.15s;\
  -o-transition-duration:.15s;\
  -ms-transition-duration:.15s;\
  transition-duration:.15s;\
}\
\
#sett-content > ul > li a:hover,#sett-content > ul > li a:active\
{\
  background:#303030;\
  color:#fff;\
  text-decoration:none;\
}\
\
.success-bar {\
	background: #0B0;\
	border-radius: 8px;\
    padding: 5px;\
    color: #FFF;\
    text-align: center;\
    margin: 5px 0;\
}\
\
.failed-bar {\
	background: #B00;\
	border-radius: 8px;\
    padding: 5px;\
    color: #FFF;\
    text-align: center;\
    margin: 5px 0;\
}\
\
#doPostKey {\
	width 0;\
    height: 0;\
    padding: 12.5px;\
    background-image: url(data:image/png;base64,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);\
	display: inline-block;\
}\
\
.suite-refresh {\
	width 0;\
    height: 0;\
    padding: 12.5px;\
    background-image: url(data:image/png;base64,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);\
	display: inline-block;\
}\
\
#fav-icon {\
	overflow: visible;\
    padding: 6px;\
    height: 20px;\
    width: 22px;\
}\
\
#unfav-icon {\
	overflow: visible;\
    padding: 6px;\
    height: 20px;\
    width: 22px;\
}\
\
#bin-icon {\
	overflow: visible;\
    padding: 6px 11px;\
    height: 20px;\
    width: 12px;\
}\
\
.page-control {\
	position: fixed;\
    border-radius: 50%;\
	left: 20px;\
    bottom: 40px;\
    z-index: 90;\
}\
\
.fav-icon {\
	background: #F71C9F!important;\
	left: 20px\
}\
\
.unfav-icon {\
	background: #F00!important;\
	left: 20px\
}\
\
.bin-icon {\
	background: #F00!important;\
	left: 65px\
}\
\
.favsec-clone {\
	background-color: #303030;\
	z-index: 999;\
}\
\
.section-clone {\
	background-color: #1a1a1a;\
	z-index: 999;\
}\
\
#suite-settings td {\
	padding: 2px;\
}\
\
#suite-settings tr > td:first-child {\
	padding-right: 4px;\
    text-align: right;\
}\
\
.suite-message {\
	position: fixed;\
	bottom: 35px;\
	right: 60px;\
    padding: 12px;\
	\
	border-radius: 20px 0;\
	\
    color: #fff;\
    \
	z-index: 998;\
}\
\
#favth li, #favsec li {\
	min-width: 200px;\
	background: #202020;\
    padding: 5px;\
    margin: 5px 0;\
    border: 1px solid #303030;\
    border-radius: 2px;\
    -moz-border-radius: 2px;\
    -webkit-border-radius: 2px;\
    color: #a0a0a0;\
    font-family: \'Roboto\',arial,sans-serif;\
    text-align: center;\
}\
\
#favth, #favsec {\
	list-style: none;\
	padding-left: 20px;\
}\
\
.suite-window {\
	position: fixed;\
	min-width: 250px;\
	z-index: 999;\
}\
\
.suite-window-top {\
	border-radius: 5px 0 0 0;\
	padding: 2px;\
	color: #fff;\
	font-weight: bold;\
}\
\
.suite-window-content {\
	border-radius: 0 0 5px 0;\
	padding: 10px;\
	background-color: #111;\
	color: #fff;\
}\
.suite-window-content table td {\
	text-align: left;\
	padding: 5px;\
}\
.suite-window-content table td:first-child {\
	text-align: right!important;\
}\
\
.user-tag {\
	display: inline-block;\
	padding: 0 4px;\
	border-radius: 5px;\
	color: #FFF;\
}\
\
.favthreads {\
	padding: 15px;\
	text-align: center;\
}\
\
.favthreads li {\
	display: block !important;\
	padding: 5px 10px !important;\
	margin: 5px 0;\
	background: #1A1A1A;\
	border: 1px solid #141414;\
	border-radius: 20px;\
}\
';

GM_addStyle(style);

/*
 * Pre-initialization stuff
 */
var debug = false;

var GM_SuperValue = new function () {

	var JSON_MarkerStr  = 'json_val: ';
	var FunctionMarker  = 'function_code: ';

	function ReportError (msg) {
		if (console && console.error)
			console.log (msg);
		else
			throw new Error (msg);
	}
	
	if (typeof GM_setValue != "function")
		ReportError ('This library requires Greasemonkey! GM_setValue is missing.');
	if (typeof GM_getValue != "function")
		ReportError ('This library requires Greasemonkey! GM_getValue is missing.');
	
	this.set = function (varName, varValue) {

		if ( ! varName) {
			ReportError ('Illegal varName sent to GM_SuperValue.set().');
			return;
		}
		if (/[^\w _-]/.test (varName) ) {
			ReportError ('Suspect, probably illegal, varName sent to GM_SuperValue.set().');
		}

		switch (typeof varValue) {
			case 'undefined':
				ReportError ('Illegal varValue sent to GM_SuperValue.set().');
			break;
			case 'boolean':
			case 'string':
				GM_setValue (varName, varValue);
			break;
			case 'number':
				if (varValue === parseInt (varValue)  &&  Math.abs (varValue) < 2147483647)
				{
					GM_setValue (varName, varValue);
					break;
				}
			case 'object':
				var safeStr = JSON_MarkerStr + JSON.stringify (varValue);
				GM_setValue (varName, safeStr);
			break;
			case 'function':
				var safeStr = FunctionMarker + varValue.toString ();
				GM_setValue (varName, safeStr);
			break;

			default:
				ReportError ('Unknown type in GM_SuperValue.set()!');
			break;
		}
	}
	
	this.get = function (varName, defaultValue) {

		if ( ! varName) {
			ReportError ('Illegal varName sent to GM_SuperValue.get().');
			return;
		}
		if (/[^\w _-]/.test (varName) ) {
			ReportError ('Suspect, probably illegal, varName sent to GM_SuperValue.get().');
		}
		
		var varValue	= GM_getValue (varName);
		if (!varValue && varValue !== '')
			return defaultValue;
		
		if (typeof varValue == "string") {
			
			var regxp	   = new RegExp ('^' + JSON_MarkerStr + '(.+)$');
			var m		   = varValue.match (regxp);
			if (m  &&  m.length > 1) {
				varValue	= JSON.parse ( m[1] );
				return varValue;
			}
			
			var regxp	   = new RegExp ('^' + FunctionMarker + '((?:.|\n|\r)+)$');
			var m		   = varValue.match (regxp);
			if (m  &&  m.length > 1) {
				varValue	= eval ('(' + m[1] + ')');
				return varValue;
			}
		}

		return varValue;
	}
	
	this.runTestCases = function (bUseConsole) {

		if (bUseConsole) {
			this.testStorage	= {};
			var context		 = this;
			this.oldSetFunc	 = (typeof GM_setValue == "function") ? GM_setValue : null;
			this.oldGetFunc	 = (typeof GM_getValue == "function") ? GM_getValue : null;

			GM_setValue	= function (varName, varValue) {
				console.log ('Storing: ', varName, ' as: ', varValue);
				context.testStorage[varName] = varValue;
			}

			GM_getValue	= function (varName, defaultValue) {
				var varValue	= context.testStorage[varName];
				if (!varValue)
					varValue	= defaultValue;

				console.log ('Retrieving: ', varName, '. Got: ', varValue);

				return varValue;
			}
		}

		var dataBefore  =   [null, true, 1, 1.1, -1.0, 2.0E9,  2.77E9,  2.0E-9, 0xA9, 'string',
							[1,2,3], {a:1, B:2}, function () {a=7; console.log ("Neat! Ain't it?"); }
						];

		for (var J = 0;  J <= dataBefore.length;  J++)
		{
			var X	   = dataBefore[J];
			console.log (J, ': ', typeof X, X);

			this.set ('Test item ' + J, X);
			console.log ('\n');
		}

		console.log ('\n***********************\n***********************\n\n');

		var dataAfter   = [];

		for (var J = 0;  J < dataBefore.length;  J++)
		{
			var X	   = this.get ('Test item ' + J);
			dataAfter.push (X);
			console.log ('\n');
		}

		console.log (dataBefore);
		console.log (dataAfter);

		dataAfter[12]();

		var bPass;
		if (dataBefore.toString()  ==  dataAfter.toString() ) {
			var pfStr   = 'PASS!';
			bPass	   = true;
		} else {
			var pfStr   = 'FAIL!';
			bPass	   = false;
		}
		console.log ( "\n***************************		\
					   \n***************************		\
					   \n***************************		\
					   \n*****	 " + pfStr + "	   *****		\
					   \n***************************		\
					   \n***************************		\
					   \n***************************\n");

		if (bUseConsole) {
			GM_setValue	= this.oldSetFunc;
			GM_getValue	= this.oldGetFunc;
		}
		else {

			for (var J = 0;  J < dataBefore.length;  J++)
			{
				GM_deleteValue ('Test item ' + J);
			}
		}

		return bPass;

	}
};


function GET() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getVar(key) {
	if(debug)
		console.log('Got var \'' + key + '\'');
	return GM_SuperValue.get(key);
}
function setVar(key, val) {
	if(debug)
		console.log('Set var \'' + key + '\' to \'' + val + '\'');
	return GM_SuperValue.set(key, val);
}

function setclicks(settdata, favsec) {
	//==========================================================================
		//                                Fav threads
		$('#kwanzaa-juice').click(function() {
			var favth = getVar('favth');
			var fvt = '\
			<div class="favthreads">\
				<h2>Favourite Threads</h2>\
				<hr />\
				<ul>';
					if(favth.length < 1)
						fvt += '<li>No favourites</li>';
					else
						for(i = 0; i < favth.length; i++)
							fvt += '<li><a href="thread-' + favth[i]['id'] + '">' + favth[i]['name'] + '</a></li>';
                    fvt += '\
				</ul>\
				<hr />\
				<input type="button" id="favback" class="button" value="Back" />\
			</div>\
			';
			
			$('#sett-content').html(fvt);
			
			$('#favback').click(function() { $('#sett-content').html(settdata); setclicks(settdata); });
		});
		//==========================================================================
		
		
		//==========================================================================
		//                  I'd turn back right now if I were you
        $('#edit-mode').click(function() {
        	closemenu();
            $('body').append('\
            <a class="page-control bin-icon" style="display: inline;"><img id="bin-icon" src="data:image/png;base64,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" alt=""></a>\
            ');
        	/*$('#index_constraint tbody tr').each(function() {
            	$(this).draggable({ revert: "invalid", helper: 'clone', cursorAt: { top: $(this).height() / 2, left: $(this).width() / 2 },
                    start: function(e, ui)
                    {
                        $(ui.helper).addClass("section-clone");
                    }
                });
            });*/
            
        	$('#nav-bar li:not(#nofav)').each(function() {
            	$(this).draggable({ revert: "invalid", helper: 'clone', cursorAt: { top: $(this).height() / 2, left: $(this).width() / 2 },
                    start: function(e, ui)
                    {
                        $(ui.helper).addClass("favsec-clone");
                    }
                });
            });
            //$($('.thead > strong:contains("Forums in\'")')[0].parentNode.parentNode.parentNode.parentNode).find('a[href^="forum-"')
            $('td > a[href^="forum-"]').each(function() {
            	var actual = $(this).parent().parent();
            	actual.draggable({ revert: "invalid", helper: 'clone',
                    start: function(e, ui)
                    {
                    	actual.css('visibility', 'hidden');
                    	var children = actual.children();
                        $(ui.helper).addClass("section-clone");
                        $(ui.helper).css('width', actual.width());
                        $(ui.helper).children().width(function(i,val) {
                            return children.eq(i).width();
                        });
                    },
                    stop: function(e, ui)
                    {
                    	actual.css('visibility', 'visible');
                    }
                });
            });
            $('.bin-icon').droppable({
            	accept: "#nav-bar li",
                drop: function( event, ui ) {
                	var object = ui.draggable;
                    
                    var stuff = object.children(':first');
                    var id = stuff.attr('href').replace(/[^\d]/gi, '');
                    var name = stuff.text();
                    favsec = getVar('favsec');
                    for(i = 0; i < favsec.length; i++)
                    	if(favsec[i]['id'] == id && favsec[i]['name'] == name)
                        	favsec.splice(i, 1);
                    setVar('favsec', favsec);
                    
                    object.fadeOut(function() {
                    	$(this).remove();
                        if(favsec.length < 1)
                            $('#nav-bar > ul').append('<li id="nofav"><a href="#">No favourite sections</a></li>');
                    });
                }
            });
            $('.nav-bar-actually-fucking-useable').droppable({
            	tolerance: "pointer",
            	accept: "tr",//#index_constraint tbody 
                drop: function( event, ui ) {
                	var object = ui.draggable.find('a[href^="forum-"]').first();
                    var id = object.attr('href').replace(/[^\d]/gi, '');
                    var name = object.text();
                    
                    //favsec = GM_getValue('favsec');
                    if($('#nofav').length > 0){
                    	$('#nofav').fadeOut(function() {
                        	$(this).remove();
                            $('#nav-bar > ul').append('<li><a href="forum-' + id + '">' + name + '</a></li>');
                            $('#nav-bar li:not(#nofav):not(.ui-draggable)').each(function() {
                                $(this).draggable({ revert: "invalid", helper: 'clone', cursorAt: { top: $(this).height() / 2, left: $(this).width() / 2 },
                                    start: function(e, ui)
                                    {
                                        $(ui.helper).addClass("favsec-clone");
                                    }
                                });
                            });
                        });
                    } else {
                            $('#nav-bar > ul').append('<li style="display: none;"><a href="forum-' + id + '">' + name + '</a></li>');
                            $('#nav-bar li:not(#nofav):not(.ui-draggable)').each(function() {
                            	$(this).fadeIn();
                                $(this).draggable({ revert: "invalid", helper: 'clone', cursorAt: { top: $(this).height() / 2, left: $(this).width() / 2 },
                                    start: function(e, ui)
                                    {
                                        $(ui.helper).addClass("favsec-clone");
                                    }
                                });
                            });
                    }
                    favsec.push({
                    	'id': id,
                    	'name': name
                    });
                    setVar('favsec', favsec);
                }
            });
            
        });
		//==========================================================================
}

var menuopen = false;
function menu(favsec) {
		menuopen = true;
    	$('body').prepend('<div id="lights-off-please"></div>');
        $('#lights-off-please').css('display', 'none');
        $('#lights-off-please').fadeIn();
     	var settdata = '<ul>\
                        	<li>\
                            	<a id="kwanzaa-juice" href="javascript: void(0);">Favourite Threads</a>\
                        	</li>\
                        	<li>\
                            	<a href="/usercp.php?suite=options">Settings</a>\
                        	</li>\
                        	<li>\
                            	<a id="edit-mode" href="javascript: void(0);">Edit mode</a>\
                        	</li>\
                    	</ul>';
		
		$('body').prepend('\
        <div id="sett" style="display: none;">\
        	<div id="sett-wrap">\
            		<div id="sett-content">\
                    	' + settdata + '\
                    </div>\
        	</div>\
        </div>\
        ');
        $('#sett').show("drop", {direction: "up"});
        $('#sett-content').click(function(e) {
        	e.stopPropagation();
        });
        $('#sett').click(function() {
        	closemenu();
        });
        
		setclicks(settdata, favsec);
}

function closemenu(){
	$('#sett').hide("drop", {direction: "down"}, function() {
        $(this).remove();
    });
    $('#lights-off-please').fadeOut(400, function() {
        $(this).remove();
        menuopen = false;
    });
}

var msgnum = 0;
function newMessage(text, color) {
	msgnum++;
    $('body').prepend('\
    <div id="msg-' + msgnum + '" class="suite-message" style="background-color: ' + color + '; display: none;">\
    	' + text + '\
    </div>\
    ');
    
    var msg = $('#msg-' + msgnum);
    msg.fadeIn(800).delay(4000).fadeOut(800);
}

jQuery.fn.center = function () {
    this.css("position","fixed");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2)) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2)) + "px");
    return this;
}

jQuery.extend
(
	{
		getHTML: function(url) 
		{
			var result = null;
			$.ajax({
				url: url,
				type: 'get',
				async: false,
				cache: false,
				success: function(data) 
				{
					result = data;
				}
			});
			return result;
		}
	}
);

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function getStaff() {
	var data = $($.getHTML("showteam.php"));
	var staff = [];
	$('#content table', data).each(function(index) {
		var table = $(this);
		var obj = { group: table.find('.thead').text(), users: [] };
		table.find('a[href^="user-"]').each(function(index) {
			obj['users'].push($(this).text());
		});
		staff.push(obj);
	});
	return staff;
}

var winnum = 0;
function newWindow(title, content, color) {
	winnum++;
	$('body').prepend('\
	<div id="window-' + winnum + '" class="suite-window">\
		<div class="suite-window-top" style="background-color: ' + color + '">\
			' + title + '\
		</div>\
		<div class="suite-window-content">\
			' + content + '\
		</div>\
	</div>\
	');
	
	$('#window-' + winnum).draggable({
		handle: '.suite-window-top',
		stack: '.suite-window'
	}).center();
	
	return $('#window-' + winnum);
}

function quickpm(key, color) {
	var stuffkek = "";
	if(typeof key == 'undefined' || key == "")
		stuffkek = '\
		<form action="private.php" method="post" name="input">\
			This function requires your post key, please<br />visit the suite settings to set it.\
			<hr />\
			<input type="button" id="qpm-cancel" class="button" value="Close" />\
		</form>\
		';
	else
		stuffkek = '\
		<form action="private.php" method="post" name="input">\
			<input type="hidden" name="my_post_key" value="' + key + '">\
			<input type="hidden" name="bbc" value="">\
			<input type="hidden" name="action" value="do_send">\
			<input type="hidden" name="pmid" value="0">\
			<input type="hidden" name="do" value="">\
			<table>\
				<tbody>\
					<tr>\
						<td><strong>Recipient:</strong></td>\
						<td>\
							<input type="text" class="textbox" name="to" id="to" size="40" maxlength="85" value="" tabindex="1" autocomplete="off">\
							<select id="qpm-staff">\
								<option value="" disabled selected>Staff Members</option>\
							</select>\
							<div id="qpm-staff-refresh" class="suite-refresh"></div>\
						</td>\
					</tr>\
					<tr>\
						<td><strong>Subject:</strong></td>\
						<td><input type="text" class="textbox" name="subject" size="40" maxlength="85" value="" tabindex="3"></td>\
					</tr>\
					<tr>\
						<td><strong>Message:</strong></td>\
						<td><textarea cols="70" rows="20" id="message_old" name="message" tabindex="4" style="height: 229px; width: 544px;"></textarea></td>\
					</tr>\
					<tr>\
						<td><strong>Options:</strong></td>\
						<td><span class="smalltext">\
						<label><input type="checkbox" class="checkbox" name="options[signature]" value="1" tabindex="5"><strong>Signature:</strong> include your signature in this message.</label><br>\
						<label><input type="checkbox" class="checkbox" name="options[disablesmilies]" value="1" tabindex="6"><strong>Disable Smilies:</strong> disable smilies from showing in this message.</label><br>\
						<label><input type="checkbox" class="checkbox" name="options[savecopy]" value="1" tabindex="7" checked="checked"><strong>Save a Copy:</strong> save a copy of this message in your Sent Items folder.</label><br>\
						<label><input type="checkbox" class="checkbox" name="options[readreceipt]" value="1" tabindex="8"><strong>Request Read Receipt:</strong> receive a message when this message is read.</label><br>\
						</span></td>\
					</tr>\
				</tbody>\
			</table>\
			<hr />\
			<input type="submit" class="button" name="submit" value="Send Message" tabindex="9" accesskey="s">\
			<input type="submit" class="button" name="preview" value="Preview" tabindex="11">\
			<input type="button" id="qpm-cancel" class="button" value="Cancel" />\
		</form>\
		';
	
	var window = newWindow('Quick PM', stuffkek, color);
	window.find('#qpm-cancel').click(function() {
		window.remove();
	});
	
	var staffs = window.find('#qpm-staff');
	var populated = false
	window.find('#qpm-staff-refresh').click(function() {
		if(populated == true) {
			newMessage('Staff list was already populated', '#B00'/* lol scared you */);
			return;
		}
		
		populated = true;
		var staff = getStaff();
		
		for(i = 0; i < staff.length; i++) {
			var group = staff[i];
			var grouphtml = '<optgroup label="' + group['group'] + '">';
			for(i2 = 0; i2 < group['users'].length; i2++)
				grouphtml += '<option value="' + group['users'][i2] + '">' + group['users'][i2] + '</option>';
			grouphtml += "</optgroup>";
			staffs.append(grouphtml);
		}
		
		newMessage('Staff list populated', '#0B0');
	});
	
	staffs.change(function() {
		var selected = staffs.find('option:selected');
		window.find('#to').val(selected.text());
		selected.prop('selected', false);
		staffs.find('option:first').prop('selected', true);
	});
}

function faved(id, favth) {
	for(i = 0; i < favth.length; i++)
		if(favth[i]['id'] == id)
			return true;
	return false;
}

function bindFav(tnum, tname, favth, btn) {
	var unfav = '\
			<a class="page-control unfav-icon" style="display: inline;"><img id="unfav-icon" src="data:image/png;base64,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" alt=""></a>\
			';
	
	btn.click(function() {
		favth.push({ id: tnum, name: tname });
		setVar('favth', favth);
		
		btn.html(unfav);
		btn.unbind();
		bindUnfav(tnum, tname, favth, btn);
	});
}

function bindUnfav(tnum, tname, favth, btn) {
	var fav = '\
			<a class="page-control fav-icon" style="display: inline;"><img id="fav-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAANxJREFUeNq0lVENwjAURc+rAeYAJEwCEpAwCZOAhEqYhEmYhEmYhKLg8lMSKBus0N6kP83rOUnbl2ckkdQBF6CJWzPgzWxJ6k5AD7RxKwAjMJpZYAXcSlq0Hf9Ue/1Qt0hq1+BB3+Pj2pMzgElq4jUcKZsbcHJAVwEOcAA6Fx+0Vi4mKURbjdxc/F61EhwwVRRMDhgqCoZHH+z92znxabPNBeFz7K8XQVNI8g4vKNmGF5B8h/8h2Q//QZIPz5D8Dk8ka7Mi/A3/MJDC29QqIDmn06p4JPWS+pwz9wEADEADM/X79wIAAAAASUVORK5CYII=" alt=""></a>\
			';
	
	btn.click(function() {
		for(i = 0; i < favth.length; i++)
			if(favth[i]['id'] == tnum && favth[i]['name'] == tname)
				favth.splice(i);
		setVar('favth', favth);
		
		btn.html(fav);
		btn.unbind();
		bindFav(tnum, tname, favth, btn);
	});
}

function editTag(id, name, user_tags, color, obj) {
	var tag = "";
	var tcolor = "";
	for(i = 0; i < user_tags.length; i++) {
		if(user_tags[i]['id'] == id) {
			tag = user_tags[i]['tag'];
			tcolor = user_tags[i]['color'];
			break;
		}
	}
	
	var stuffkek = '\
	<table>\
		<tbody>\
			<tr>\
				<td><strong>Tag:</strong></td>\
				<td>\
					<input type="text" class="textbox" id="tag" size="40" maxlength="85" value="' + tag + '" tabindex="1" autocomplete="off">\
				</td>\
			</tr>\
			<tr>\
				<td><strong>Color:</strong></td>\
				<td>\
					<input type="text" class="textbox" id="color" size="40" maxlength="85" value="' + tcolor + '" tabindex="2" autocomplete="off">\
				</td>\
			</tr>\
		</tbody>\
	</table>\
	<hr />\
	<input type="button" id="tag-save" class="button" value="Save" />\
	<input type="button" id="tag-cancel" class="button" value="Cancel" />\
	';
	
	var window = newWindow('Edit Tag For \'' + name + '\'', stuffkek, color);
	
	window.find('#tag-cancel').click(function() {
		window.remove();
	});
	
	window.find('#tag-save').click(function() {
		var ntag = window.find('#tag').val();
		var ntcolor = window.find('#color').val();
		if(tag == "" && tcolor == "")
			user_tags.push({ id: id, name: name, tag: ntag, color: ntcolor });
		else {
			for(i = 0; i < user_tags.length; i++) {
				if(user_tags[i]['id'] == id) {
					user_tags[i]['tag'] = ntag;
					user_tags[i]['color'] = ntcolor;
				}
			}
		}
		obj.css('background-color', ntcolor);
		obj.text(ntag);
		setVar('user_tags', user_tags);
		window.remove();
	});
}

var alt = false;
var ctrl = false;
var shift = false;

function doHaksPlz() {
	/*
	 * Initialization
	 */
	var disallowed = [
		'png',
		'jpg',
		'jpeg',
		'gif',
		'js',
		'css',
		'swf',
		'txt',
		'zip',
		'rar',
		'svg'
	];
	
	for(i = 0; i < disallowed.length; i++)
		if(location.pathname.toLowerCase().substr(-3) == disallowed[i])
			return;
	
	var disallowedpg = [
		['/reputation.php', { action: 'add' }],
		['/report.php']
	];
	
	for(i = 0; i < disallowedpg.length; i++) {
		var obj = disallowedpg[i];
		
		if(location.pathname == obj[0]) {
			if(typeof obj[1] === 'undefined' || obj[1].size < 1)
				return;
			
			var get = GET();
			for(k in obj[1])
				//console.log(get[k] + obj[1][k]);
				if(typeof get[k] !== 'undefined' && get[k] == obj[1][k])
					return;
		}
	}
	
	var color = getVar('color');
	if(typeof color == 'undefined' || location.pathname == "/" || location.pathname == "/index.php" || (location.pathname == "/usercp.php" && GET()['action'] == 'theme')) {
		var cn = $('.logo img').attr('src').split('?')[1];
		if(cn == '<!--color-->') cn = '70a40e';
        setVar('color', cn);
        color = cn;
	}
    
    var settings = [
    	['favsec', '[]'],
    	['favth', '[]'],
    	['favth_enabled', '"true"'],
        ['gen_postkey', '""'],
        ['nav_position', '"static"'],
        ['nav_enabled', '"true"'],
        ['post_pre', '""'],
        ['post_post', '""'],
        ['post_ppenabled', '"true"'],
		['user_tags_enabled', '"true"'],
		['user_tags', '[]']
    ];
    
    for(i = 0; i < settings.length; i++){
    	var obj = settings[i];
    	eval('var ' + obj[0] + ' = getVar("' + obj[0] + '");');
    	eval('if(typeof ' + obj[0] + ' == "undefined") { ' + obj[0] + ' = ' + obj[1] + '; setVar("' + obj[0] + '", ' + obj[0] + ')}');
    }
    
	/*
	 * Keystuffs
	 */
    $(document).keydown(function(e) {
        var key = String.fromCharCode(e.which);
        alt = e.altKey;
        ctrl = e.ctrlKey
        shift = e.shiftKey;
        if(key == 'M' && ctrl && !menuopen)
            menu(favsec);
        if(key == 'P' && alt)
            quickpm(gen_postkey, '#' + color);
        if(e.which == 27 && menuopen)
            closemenu();
    });
    $(document).keyup(function(e) {
        alt = e.altKey;
        ctrl = e.ctrlKey
        shift = e.shiftKey;
    });
    var secreti = 0;
    var secret = 'secretplz'.split(''); //This'll be our little secret eh?  o 3 o
    $(document).keypress(function(e) {
        var key = String.fromCharCode(e.which);
        if(secreti == secret.length - 1) {
        	secreti = -1;
			//bd2B6SjMh_w 20%
        	$("#header").css('background', 'none');
            $("#header").prepend('<object width="100%" height="110%" style="top: 0px; left: 0px; z-index: -1;position: fixed; margin-top: -25%;">\
              <param name="movie" value="https://www.youtube.com/v/0J2QdDbelmY?version=3&amp;autoplay=1&amp;controls=0&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0">\
              <param name="allowFullScreen" value="true">\
              <param name="allowScriptAccess" value="always">\
              <param name="wmode" value="transparent">\
              <embed src="http://youtube.googleapis.com/v/0J2QdDbelmY?version=3&amp;autoplay=1&amp;controls=0&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0" wmode="transparent" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="110%">\
            </object>');
			/*$('body *').contents().filter(function() { 
				return (this.nodeType == 3) && this.nodeValue.length > 0; 
			}).each(function() {
				var obj = $(this);
				obj.replaceWith(obj.text().replace(/[a-zA-Z0-9]+/gi, 'Worms'));
				//console.log(obj.text());
			});*/
        } else if(secreti > -1 && key == secret[secreti])
        	secreti++;
        else if(secreti > -1)
        	secreti = 0;
    });
    
    /*
     * Header changes
     */
    if(nav_enabled == 'true') {
        var nav_css = 'border-bottom: 5px solid #' + color + '; ';
        var nav_after = '';
        
        if(nav_position != 'static') {
            nav_css += 'position: fixed';
            nav_after += '<br /><br />';
        }
        
        var favsecbar = '\
            <div id="bridge" class="nav-bar-actually-fucking-useable" style="z-index: 998; ' + nav_css + '">\
                <div class="wrap">\
                    <div id="nav-bar" class="menu">\
                        <ul>\
                            ';
        
        if(favsec.length <= 0) favsecbar += '<li id="nofav"><a href="#">No favourite sections</a></li>';
        else for(i = 0; i < favsec.length; i++) favsecbar += '<li><a href="/forum-' + favsec[i]['id'] + '">' + favsec[i]['name'] + '</a></li>';
        
        favsecbar += '\
                            \
                        </ul>\
                        <div id="cog"></div>\
                    </div>\
                </div>\
            </div>\
        ' + nav_after;
        
        
        $('body').prepend(favsecbar);
        $('#cog').css('background-color', '#' + color);
    }
    
    /*
     * Menu
     */
    $('#cog').click(function() {
     	if(menuopen == false)
     		menu(favsec);
    });
     
    /*
     * Settings page
     */
    if(location.pathname == '/usercp.php' && typeof GET()['suite'] !== 'undefined' && GET()['suite'] == 'options') {
     	console.log('Loading suite settings');
        $('td[valign="top"][width!="180"] *').each(function(iteration) {
        	$(this).remove();
        });
        
        var obj1 = $('ul.navigation > li.active');
        $(obj1).removeClass();
        $(obj1).html('<a href="usercp.php">User Control Panel</a>');
        $(obj1).after('<li class="active">Suite Settings</li>');
        document.title = 'Suite Settings';
        
        var settpage = '\
        <table border="0" cellspacing="0" cellpadding="10" class="tborder">\
            <tbody>\
                <tr>\
                    <td class="thead" colspan="2"><strong>Suite Settings</strong></td>\
                </tr>\
                <tr>\
                    <td width="50%" class="trow1" valign="top" id="suite-settings">\
                        <fieldset class="trow2">\
                            <legend><strong>General</strong></legend>\
                            <table cellspacing="0" cellpadding="10">\
                            <tbody>\
                                <tr>\
                                	<td>\
                                    	Post key: \
                                    </td>\
                                	<td>\
                                        <input type="text" class="textbox" name="gen_postkey" size="25" value="" disabled readonly="readonly">\
                                    </td><td><div id="doPostKey"></div></td>\
                                </tr>\
                            </tbody></table>\
                        </fieldset>\
                        <fieldset class="trow2">\
                            <legend><strong>Navigation Bar</strong></legend>\
                            <table cellspacing="0" cellpadding="10">\
                            <tbody>\
                                <tr>\
                                	<td>\
                                    	Enabled: \
                                    </td>\
                                	<td>\
                                        <select name="nav_enabled">\
                                            <option value="true">True</option>\
                                            <option value="false">False</option>\
                                        </select>\
                                        <span class="smalltext">(To open the menu without the navbar press Ctrl + M)</span>\
                                    </td>\
                                </tr>\
                                <tr>\
                                	<td>\
                                    	Postion: \
                                    </td>\
                                	<td>\
                                        <select name="nav_position">\
                                            <option value="static">Static</option>\
                                            <option value="dynamic">Dynamic</option>\
                                            <option value="stuck">Stuck</option>\
                                        </select>\
                                    </td>\
                                </tr>\
                            </tbody></table>\
                        </fieldset>\
                        <fieldset class="trow2">\
                            <legend><strong>Pre/Post Reply Formatting</strong></legend>\
                            <table cellspacing="0" cellpadding="10">\
                            <tbody>\
                                <tr>\
                                	<td>\
                                    	Enabled: \
                                    </td>\
                                	<td>\
                                        <select name="post_ppenabled">\
                                            <option value="true">True</option>\
                                            <option value="false">False</option>\
                                        </select>\
                                    </td>\
                                </tr>\
                                <tr>\
                                	<td>\
                                    	Pre-Reply: \
                                    </td>\
                                	<td colspan="2">\
                                        <input type="text" class="textbox" name="post_pre" size="25">\
                                    </td>\
                                </tr>\
                                <tr>\
                                	<td>\
                                    	Post-Reply: \
                                    </td>\
                                	<td colspan="2">\
                                        <input type="text" class="textbox" name="post_post" size="25">\
                                    </td>\
                                </tr>\
                            </tbody></table>\
                        </fieldset>\
                        <fieldset class="trow2">\
                            <legend><strong>Favourite Sections</strong></legend>\
                            <table cellspacing="0" cellpadding="10">\
                            <tbody>\
                                <tr>\
                                	<td style="text-align: left; font-weight: bold;">\
                                    	Sort\
                                    </td>\
                                	<td>\
                                    	<ul id="favsec">\
                                    		';
                                            
                                            if(favsec.length < 1)
                                            	settpage += '<li id="sec-none">No favourites</li>';
                                            else
                                            	for(i = 0; i < favsec.length; i++)
                                            		settpage += '<li id="sec-' + favsec[i]['id'] + '">' + favsec[i]['name'] + '</li>';
                                            
                                            settpage += '\
                                    	</ul>\
                                    </td>\
                                </tr>\
                            </tbody></table>\
                        </fieldset>\
                        <fieldset class="trow2">\
                            <legend><strong>Favourite Threads</strong></legend>\
                            <table cellspacing="0" cellpadding="10">\
                            <tbody>\
                                <tr>\
                                	<td>\
                                    	Enabled: \
                                    </td>\
                                	<td>\
                                        <select name="favth_enabled">\
                                            <option value="true">True</option>\
                                            <option value="false">False</option>\
                                        </select>\
                                    </td>\
                                </tr>\
                                <tr>\
                                	<td style="text-align: left; font-weight: bold;">\
                                    	Sort\
                                    </td>\
                                	<td>\
                                    	<ul id="favth">\
                                    		';
                                            
                                            if(favth.length < 1)
                                            	settpage += '<li id="th-none">No favourites</li>';
                                            else
                                            	for(i = 0; i < favth.length; i++)
                                            		settpage += '<li id="th-' + favth[i]['id'] + '"><a href="thread-' + favth[i]['id'] + '">' + favth[i]['name'] + '</a></li>';
                                            
                                            settpage += '\
                                    	</ul>\
                                    </td>\
                                </tr>\
                            </tbody></table>\
                        </fieldset>\
                        <fieldset class="trow2">\
                            <legend><strong>User-tags</strong></legend>\
                            <table cellspacing="0" cellpadding="10">\
                            <tbody>\
                                <tr>\
                                	<td>\
                                    	Enabled: \
                                    </td>\
                                	<td>\
                                        <select name="user_tags_enabled">\
                                            <option value="true">True</option>\
                                            <option value="false">False</option>\
                                        </select>\
                                    </td>\
                                </tr>\
                            </tbody></table>\
                        </fieldset>\
                    </td>\
                </tr>\
            </tbody>\
        </table>\
        <br />\
        <div align="center"><input id="suite-save" type="button" class="button" value="Save Options"></div>\
        ';
        
        $('td[valign="top"][width!="180"]').append(settpage);
        
        $('#favsec').sortable({ revert: true });
        $('#favth').sortable({ revert: true });
        
        $('#doPostKey').click(function() {
        	try {
            	var obj2 = $('input[name="gen_postkey"]');
                $(obj2).val(/my_post_key = "([0-9a-zA-Z]+)"/gi.exec($('head').html())[1]);
                $(obj2).animate({
                	backgroundColor: "#009900",
                    color: "#FFF"
                }, {duration: 500, easing: 'linear'});
            } catch(error) {
                $("#suite-settings").prepend('\
                <div class="failed-bar">An error occurred when searching for your post key</div>\
                ');
                $('.failed-bar').delay(1000).fadeOut(1000, function() {
                    $(this).remove();
                });
            }
        });
        
        $('input[name="gen_postkey"]').val(gen_postkey);
        
        $('select[name="nav_enabled"]').val(nav_enabled);
        $('select[name="nav_position"]').val(nav_position);
        
        $('select[name="post_ppenabled"]').val(post_ppenabled);
        $('input[name="post_pre"]').val(post_pre);
        $('input[name="post_post"]').val(post_post);
        
        $('select[name="favth_enabled"]').val(favth_enabled);
		
        $('select[name="user_tags_enabled"]').val(user_tags_enabled);
        
        $('#suite-save').click(function() {
        	try {
                //==================================================================
                
                setVar('gen_postkey', $('input[name="gen_postkey"]').val());
                
                setVar('nav_enabled', $('select[name="nav_enabled"]').val());
                setVar('nav_position', $('select[name="nav_position"]').val());
                
                setVar('post_ppenabled', $('select[name="post_ppenabled"]').val());
				console.log(getVar('post_ppenabled'));
                setVar('post_pre', $('input[name="post_pre"]').val());
                setVar('post_post', $('input[name="post_post"]').val());
                
                var newfavsec = [];
                $('#favsec li:not(#sec-none)').each(function(index) {
                	var id = $(this).attr('id').replace('sec-', '');
                    var name = $(this).text();
                    newfavsec.push({
                    	id: id,
                        name: name
                    });
                });
                setVar('favsec', newfavsec);
                
                setVar('favth_enabled', $('select[name="favth_enabled"]').val());
                var newfavth = [];
                $('#favth li:not(#th-none)').each(function(index) {
                	var id = $(this).attr('id').replace('th-', '');
                    var name = $(this).text();
                    newfavth.push({
                    	id: id,
                        name: name
                    });
                });
                setVar('favth', newfavth);
				
                setVar('user_tags_enabled', $('select[name="user_tags_enabled"]').val());
                
                //==================================================================
                
                $("#suite-settings").prepend('\
                <div class="success-bar">Saved settings successfully!</div>\
                ');
                $('html, body').animate({
                    scrollTop: $(".navigation").offset().top
                }, 500);
                $('.success-bar').delay(1000).fadeOut(500, function() {
                    $(this).remove();
                });
            } catch(error) {
                $("#suite-settings").prepend('\
                <div class="failed-bar">An error occurred when saving your settings</div>\
                ');
                $('.failed-bar').delay(1000).fadeOut(1000, function() {
                    $(this).remove();
                });
            }
        });
    }
     
     /*
      * Favorite thread
      */
    if(favth_enabled == 'true' && location.pathname.indexOf('/thread-') === 0 && gen_postkey != "") {
		var tnum = /^\/thread-(\d+).*$/.exec(location.pathname)[1];
		var tname = /^(.*?)( - Page \d+|$)/.exec(document.title)[1];
		var unfav = '\
			<a class="page-control unfav-icon" style="display: inline;"><img id="unfav-icon" src="data:image/png;base64,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" alt=""></a>\
			';
		var fav = '\
			<a class="page-control fav-icon" style="display: inline;"><img id="fav-icon" src="data:image/png;base64,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" alt=""></a>\
			';
		
		if(faved(tnum, favth)) {
			$('body').append(unfav);
		} else {
			$('body').append(fav);
		}
		
		bindFav(tnum, tname, favth, $('.fav-icon'));
		bindUnfav(tnum, tname, favth, $('.unfav-icon'));
    }
	
	/* 
	 * Favourite threads out in the wild
	 */
	if(favth_enabled == 'true') {
		$('#sidebar').find('a[href$="&action=lastpost"]').each(function() {
			var item = $(this);
			var id = item.attr('href').replace('Thread-', '').replace('thread-', '').replace('&action=lastpost', '');
			var name = item.attr('title');
			for(i = 0; i < favth.length; i++) {
				if(favth[i]['id'] == id && favth[i]['name'] == name) {
					var tr = item.parent().parent();
					tr.css('background-color', '#FF57DF').css('color', 'rgb(213, 0, 172)');
					tr.find('td:first').css('border-radius', '15px 0 0 15px');
					tr.find('td:last').css('border-radius', '0 15px 15px 0');
				}
			}
		});
		
		$('a[id^="tid_"]').each(function() {
			var item = $(this);
			var id = item.attr('id').replace('tid_', '');
			var name = item.text();
			for(i = 0; i < favth.length; i++) {
				if(favth[i]['id'] == id && favth[i]['name'] == name) {
					var tr = item.closest('tr');
					var ftd = tr.find('td:first');
					var bg = '';
					if(ftd.find('img:first').attr('src').indexOf('new') !== -1) {
						bg = '#FF57DF';
					} else {
						bg = 'rgba(255, 87, 223, 0.34)';
					}
					
					tr.find('td').each(function() {
						$(this).css('background-color', bg).css('color', 'rgb(213, 0, 172)');
					});
					
					ftd.css('border-radius', '15px 0 0 15px');
					tr.find('td:last').css('border-radius', '0 15px 15px 0');
				}
			}
		});
		
		$('.trow1 > span > a[href^="thread-"]').each(function() {
			var item = $(this);
			var id = item.attr('href').replace('thread-', '');
			var name = item.text();
			for(i = 0; i < favth.length; i++) {
				if(favth[i]['id'] == id && favth[i]['name'] == name) {
					var tr = item.closest('tr');
					var ftd = tr.find('td:first');
					if(ftd.find('img:first').attr('src').indexOf('new') !== -1)
						tr.css('background-color', '#FF57DF').css('color', 'rgb(213, 0, 172)');
					else
						tr.css('background-color', 'rgba(255, 87, 223, 0.34)').css('color', 'rgb(213, 0, 172)');
					ftd.css('border-radius', '15px 0 0 15px');
					tr.find('td:last').css('border-radius', '0 15px 15px 0');
				}
			}
		});
	}
      
    /*
     * Pre/Post Reply Formatting
     */
    if(post_ppenabled == 'true') {
        $('form[action="private.php"][name="input"], form[action^="newreply.php"]:not(#quick_reply_form)').submit(function(e) {
            var msgbox = $('#message_new');
            if(msgbox.val().indexOf(post_pre) !== 0 && msgbox.val().indexOf(post_post) !== msgbox.val().length - 1 - post_post.length)
                msgbox.val(post_pre + msgbox.val() + post_post);
        });
		
        var qreply = $('#quick_reply_submit');
        qreply.after('<input type="button" value="Post Reply" class="button" tabindex="2" id="quick_reply_submit_lsx">');
        qreply.hide();
        $('#quick_reply_submit_lsx').click(function() {
            var msgbox = $('#quick_reply_form textarea[name="message"]');
            if(msgbox.val().indexOf(post_pre) !== 0 && msgbox.val().indexOf(post_post) !== msgbox.val().length - 1 - post_post.length)
                msgbox.val(post_pre + msgbox.val() + post_post);
            qreply.click();
        });
        
        $('form#quick_reply_form').submit(function(e) {
         var msgbox = $('#message');
            if(msgbox.val().indexOf(post_pre) !== 0 && msgbox.val().indexOf(post_post) !== msgbox.val().length - 1 - post_post.length)
                msgbox.val(post_pre + msgbox.val() + post_post);
        });
    }
	
	/* 
	 * User-tags
	 */
	
	if(user_tags_enabled == 'true') {
		$('.post_user').each(function(index) {
			var obj = $(this).find('a[href*="user-"]:first');
			var id = /user-(\d+)/gi.exec(obj.attr('href'))[1];
			var name = obj.text();
			
			var tag = "+";
			var tcolor = "#B00"/*Lol scared you again  o u o*/;
			
			for(i = 0; i < user_tags.length; i++) {
				if(user_tags[i]['id'] == id) {
					if(user_tags[i]['tag'] != '')
						tag = user_tags[i]['tag'];
					if(user_tags[i]['color'] != '')
						tcolor = user_tags[i]['color'];
					break;
				}
			}
			
			obj.after('\
			<a id="tag-' + id + '-' + index + '" class="user-tag" style="background-color: ' + tcolor + '">\
				' + tag + '\
			</a>\
			');
			
			//$('#tag-' + id).each(function() {
				$('#tag-' + id + '-' + index).click(function() {
					editTag(id, name, user_tags, '#' + color, $(this));
				});
			//});
		});
	}
	
	/* 
	 * Rep to post ratio (RTPR)
	 */
	
	if(true) {
		$('.post_user').each(function() {
			var obj = $(this);
			
			var prerep = obj.find('a[href^="reputation.php"] > strong[class^="reputation_"]').text().replace(/[^\d-]/, '');
			if(!parseInt(prerep))
				return true;
			var rep = parseInt(prerep);
			
			var preposts = /Posts: ([\d,.-]+)/.exec(obj.text())[1].replace(/[^\d-]/, '');
			if(!parseInt(preposts))
				return true;
			var posts = parseInt(preposts);
			
			var ratio = Math.round((rep / posts) * 1000) / 1000;
			
			var min = 0.05;
			var shit = ratio / min;
			
			var mid = 0.1;
			var neutral = ratio / mid;
			
			var max = 0.5;
			var good = ratio / max;
			
			var r = 0;
			var g = 0;
			var b = 0;
			
			if(shit >= 1 && neutral < 1) {
				r = 255;
				g = 255 * ((ratio - min) / (mid - min));
			} else if(neutral >= 1 && good < 1) {
				r = 255 * (1 - ((ratio - mid) / (max - mid)));
				g = 255;
			} else if(good >= 1 ) {
				if(ratio >= 1)
					b = 255;
				else
					g = 255;
			} else {
				r = 255;
			}
			
			obj.find('li.aw').before('<li>RTPR: <strong><span style="color: rgb(' + Math.round(r) + ', ' + Math.round(g) + ', ' + Math.round(b) + ')">' + ratio + '</style></strong></li>');
		});
	}
	
	/* 
	 * Do the voodoo that you to so well
	 * (Just colour the fucking quotes niggloo ,_,)
	 */
	
	/**
	 * Why did I ever try this? 
	 **/
	
	/*if(true) {
		var names = []
		$('cite').each(function() {
			names.push(/\)(.+?) Wrote:/.exec($(this).text())[1]);
		});
		var names = $.unique(names);
		for(i = 0; i < names.length; i++) {
			var r = Math.round(255 * Math.random(i));
			var g = Math.round(255 * Math.random(i * 2);
			var b = Math.round(255 * Math.random(i * 3);
			$('cite:contains("' + names[i] + '")').closest('blockquote')
				.attr('style', 'background: rgba(' + r + ', ' + g + ', ' + b + ', 0.1) !important');
		}
	}*/
}