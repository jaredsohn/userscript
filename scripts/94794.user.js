// ==UserScript==
// @name           MyFreeCams Refresh Cam Previews
// @description    This script enables the Cam Preview images to be refreshed frequently.
// @namespace      p69n320
// @include        http://www.myfreecams.com/*
// ==/UserScript==

if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

window.jQuery_is_loaded = false;
if (typeof jQuery != 'undefined') {
	window.jQuery_is_loaded = true;
 }else{
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
	  script.addEventListener('load', function() {
	    var script = document.createElement("script");
	    script.textContent = "(" + callback.toString() + ")();";
	    document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}
	// load jQuery and execute the main function
	addJQuery(function() {
		window.jQuery_is_loaded = true;
	});
 }

function HackState(master_div, button_clicked_callback) {
	var root_div = master_div;
	var self = this;

	var create_button = function(name, func) {
		var button = $('<a href="#"><span style="font-size: 8px; color:#ffffff;text-decoration:none;"> (' + name + ')</span></a>');
		button.click(func);
		return button;
	}

	this.about_me_content = function() {
		var div = $('<div></div>');
		var content = "<span style='text-align: center; font-size: 12'>About Me</span><br /><br />";
		var text = "I am a software developer and in my free time I like to hack through this webpages, personalizing it for my taste.<br/><br/>"
		text += "Very recently it became clear that I spent quite more time then what I should compared to the benefit of doing it (no support at all).";
		text += "If you like my developements please consider posting some comments in userscripts.org page and vote for the scripts.<br/><br/>";
		text += "Unfortunately this webpage adapts very quickly and a huge extra ammount of work is necessary to make this scripts to work once again.<br/>";
		text += "Please consider supporting me by refering me at Apple Freebie Jeebies, where I am now for more then 2 years registered and still wasn't able to have sufficient refers.";
		text += "Please help me fix that and be able to get a free iPad 2. Site is authentic so don't worry with scams, here is a"
		text += " <a href='http://www.youtube.com/watch?v=NUUdJ4zLBYU' target='_newtab'>prof1</a> "
		text += "or <a href='http://www.youtube.com/watch?v=eIPB6Zk8imc' target='_newtab'>prof2</a> videos."
		text += "Other videos explaining the process can be found <a href='http://www.youtube.com/watch?v=QwcfFnyoyAg&NR=1' target='_newtab'>here</a>. See the remaining parts of the video if you need.<br />"
		text += "(Don't click the link on the prof page otherwise you refer the author of the video)."
		text += "Compared with the possible ammounts of money lots of people spend with models, it is nothing. ";
		text += "Apart from that you will have my personal email contant to buggy directly in case it stops working. ;-)<br/>"
		text += "Moreover you can as well try to get refers for yourself and get an Apple product.<br/><br>"

		text += "<a href='http://apple.freebiejeebies.co.uk/263912' target='_newtab'><span style='text-align: center; font-size:14'>Press here to refer me at Apple.FreebieJeebies</span></a><br/><br/>"
		content += "<span style='text-align: center; font-size: 12'>" +text+ "</span>";
		div.append(content);
		return div;
	}

	var draw_div = function() {

		var span = '<span style="font-size: 12px; color:#ffffff;text-decoration:none;">p69n320 MFC Browser Scripts</span>';
		span += '<div id="hack_loaded_scripts"></div>';
		root_div.append($(span));

		root_div.append(create_button('about_me', function() {
			load_panel(self.about_me_content());
		}));
		root_div.append(create_button('scripts list', function() {
			window.open('http://userscripts.org/users/135292/scripts','_newtab');
		}));
		root_div.append(create_button('refer me', function() {
			window.open('http://apple.freebiejeebies.co.uk/263912','_newtab');
		}));		
	}
	draw_div();

	var load_panel = function(content) {
		var main_div = $('<div id="hack_panel"> </div>')
		main_div.css('width', 700);
		main_div.css('position', 'absolute');
		main_div.css('top', 150);
		main_div.css('left', '50%');
		main_div.css('margin-left', -350);
		main_div.css('background-color', '#008000');
		main_div.css('border', 'solid 2px #00c000');
		main_div.css('padding', '10px');

		main_div.append(content);

		var close_button = create_button('close', function() {
			$('#hack_panel').remove();
		})
		main_div.append(close_button);

		$('body').append(main_div);
	}
	this.add_module = function(module) {
		var content = $('<div><span style="font-size: 10px; color:#ffffff;text-decoration:none;"> - '+ module.name +'</span></div>');
		var help_button = create_button('help', function() {
			load_panel(module.help_content());
		});
		content.append(help_button);
		$('#hack_loaded_scripts').append(content);
	}
}


window.current_timestamp = new Array();
var refreshRate = 15000;
var script_enabled = false;

var hack_message = undefined;
var hack_msg_id = undefined;

window.setRefreshRate = function(rate)
{
	if(rate == 0)
		script_enabled = false;
	else
	{
		refreshRate = rate;		
		if(script_enabled == false)
		{
			script_enabled = true;
			window.enable_preview_script();
		}
	}
}

window.enable_preview_script = function() {

	var date = new Date();
	var timestamp = date.getTime();
	
	match = "http://img.myfreecams.com/livesnap";
	if(script_enabled == true && $("img.img_border:first").attr('src').substr(0, match.length) == match)
	{		
		$.each($("img.img_border"), function(index, img) {
			img = $(img)
			var src = img.attr('src');
			var id = src.split('user=')[1];
			id = id.split('&')[0];
			//var id = img.attr('id')
			var image = new Image();
			image.src = "http://img.myfreecams.com/livesnap100/?user=" + id + "&timestamp=" + timestamp;
			$(image).attr('ref', id);
			$(image).load(function() {
				var src = $(this).attr('src');
				$('#' + id).attr('src', this.src);
				window.current_timestamp[id] = timestamp;
			});
		});
	}
	
 	if(script_enabled = true)
 		setTimeout(window.enable_preview_script, refreshRate);
}

function get_id_from_link(link) {
	var tmp = $(link);
	tmp = tmp.parent().html()
	tmp = tmp.split("broadcaster_id: '");
	tmp = tmp[1];
	tmp = tmp.split("'")[0];
	return "" + (100000000 + parseInt(tmp));	
}

var prv_SetHtml1 = window.SetHTML;
var executed = false;
window.SetHTML = function(name, sOutput) {

	if(window.jQuery_is_loaded == true)
	{
		if(executed == false)
		{			
			if(document.hack_state == undefined)
			{
				var master_div = $('<div></div>');
				master_div.attr('id', 'hack_state');
				master_div.css('position', 'relative');
				master_div.css('top', '5');
				master_div.css('right', '350');
				master_div.css('float', 'right');
				$('#login_box').parent().append(master_div);
				document.hack_state = new HackState(master_div, function(object_id) {
					hack_state.clicked(object_id);
				});
			}
			document.hack_state.add_module({ name: 'Refresh Cam Previews', help_content: function() {
				var text = "This script enables the bottom preview images to be refreshed frequently. <br/><br />";
				text += "Right next to the search text box there is a combo box to select the refresh rate.<br><br>";
				text += "For it to work you have to select 'Cam Previews' in Filter/Sort -> Display Type combo box.";
				
				return text;
			} });
			executed = true;
		}
		
		if(name == 'online_broadcasters')
		{		
			var all = $(sOutput);
			var a = all.find('img.img_border')
			a.each(function() {
				img = $(this);
				var link = img.parent().parent()
			
				var id = get_id_from_link(link.html());
				img.attr('id', id);
			
				var match = 'http://img.myfreecams.com/livesnap';
				if(img.attr('src').substr(0, match.length) == match )
				{
					img.attr('src', img.attr('src') + "&timestamp=" + window.current_timestamp[id]);
				}
			});
			
			sOutput = all.parent().html();
		}
		
		if(name == 'online_broadcaster_controls')
		{
			var bla = '<tr> <td nowrap="nowrap" style="font-size:12px;padding-right:10px;padding:0px 10px 1px 0px;">Refresh Rate: </td>';
			bla += '<td> <select style="font-size:11px;" onchange="setRefreshRate(this.value)">';
			bla += '<option selected value="0">off</option>';
			bla += '<option value="2000">2s</option>';
			bla += '<option value="5000">5s</option>';
			bla += '<option value="10000">10s</option>';
			bla += '<option value="15000">15s</option>';
			bla += '<option value="30000">30s</option>';
			bla += '</select> </td> </tr>';
							
			sOutput = bla + sOutput;
		}
	}
	
	prv_SetHtml1(name, sOutput);
}