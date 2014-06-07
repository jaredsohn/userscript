//  @licstart The following is the entire license notice for the
//  JavaScript code in this page (or file).
//
//  This file is part of Linterna Mágica
//
//  Copyright (C) 2010, 2011, 2012, 2013  Ivaylo Valkov <ivaylo@e-valkov.org>
//  Copyright (C) 2010, 2011, 2012, 2013  Anton Katsarov <anton@katsarov.org>
//
//  The JavaScript code in this page (or file) is free software: you
//  can redistribute it and/or modify it under the terms of the GNU
//  General Public License (GNU GPL) as published by the Free Software
//  Foundation, either version 3 of the License, or (at your option)
//  any later version.  The code is distributed WITHOUT ANY WARRANTY
//  without even the implied warranty of MERCHANTABILITY or FITNESS
//  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
//
//  As additional permission under GNU GPL version 3 section 7, you
//  may distribute non-source (e.g., minimized or compacted) forms of
//  that code without the copy of the GNU GPL normally required by
//  section 4, provided you include this license notice and a URL
//  through which recipients can access the Corresponding Source.
//
//  @licend The above is the entire license notice for the JavaScript
//  code in this page (or file).
//
// @source http://linterna-magica.nongnu.org

//  Linterna Mágica Greasemonkey script
//  Version 0.0.13
//
//  This script searches for flash objects with video links in web sites
//  and replaces them with objects playable with browser video
//  plugin (totem/vlc/xine/gecko-mediaplayer).

// ==UserScript==
// @name          Linterna Mágica
// @namespace Linterna Mágica
// @description  Watch video on the web in a brand new way: You don't need a glint, the magic lantern is ignited!
// @include        http://*
// @include        https://*
// @grant none
// ==/UserScript==
(function(){
if (typeof(unsafeWindow) == "object")
{
    (function inject_in_page() 
     {
	 var userscript_data = inject_in_page.caller.toString();
	 var script = document.createElement("script");
	 script.setAttribute("type", "text/javascript");
	 script.setAttribute("src", 
			     "data:text/javascript;charset=UTF-8;base64,"+
			     btoa("("+userscript_data+")();"));
	 var inject_data = function()
	 {
	     var head = document.getElementsByTagName("head")[0];
	     head.appendChild(script);
	     head.removeChild(script);
	 }
	 setTimeout(inject_data, 0);
     })();
    throw "Linterna Mágica left the Greasemonkey scope!"+
	" Script was injected in page.";
}


// This object initializes the LinternaMagica object
var linterna_magica_options =
    {
	// Print debugging information
	// log level 0,1, 2, 3, 4, 5
	"debug": 0,
	// Where to print the debugging information
	// web: Print messages in the web page (default)
	// console: Use the debugging console of the browser
	"log_to": "web",
 	// Should the web logger be automatically expanded by default
	// false: No (default)
	// true: Yes
	"web_log_expand": false,
	// Should Linterna  Mágica automatically check and notify for
	// updates.
	// <time><type>: Check at interval. (default 3w)
		// <time>: number
		// <type>:  d/w/m/y
		// d = day, w = week, m = month, y = year
	// Linterna Mágica will check for updates also at the first
	// and at the second day after the exact match that is
	// configured.
	// off/disabled/no/never/false/0: Do not check
	"updates": "1w",
	// This options determines how opbject found by Linterna Mágica
	// should be played. You can set multiple values separated with
	// ",", without the quotes. Default value is "html5, self,
	// plugin".
        // self: Replace the flash object
	// plugin: Add link after the swf object that replaces it
	// html5: Add link after the HTMl5 player (if a site provides
	// one) that replaces it
	// Default value "html5, self, plugin"
	"priority": "html5, self, plugin",
	// Automatically start the video playback
	// enabled: Auto start the clip (default)
	// disabled:  Do not start the clip
	"autostart": "on",
	// Web controls or video plugin controls
	// self: Use controls provided by Linterna Mágica (default)
	// plugin: Use controls provided by the video plugin
	"controls": "self",
	// Interface language
	// auto: Use the language of the browser interface if
	// translation is available (default)
	// <lc>_<CC>: Set language to lc_CC, where
	// <lc>:  language code (lowercase)
	//  <CC>: country code (uppercase)
	// Example: en_US, en_UK, bg_BG
	"locale": "auto",
	// The way cookies are proccessed. The explanation is too long
	// to fit here. Please ***read*** "A note on cookies", in the
	// HELP file.
	// delete: Just delete the cookies.
	// restore: Extract and restore cookies.
	"cookies": "restore",
	// Timeout before background processing (XHR) starts  in
	// milliseconds. 1 s = 1000 ms. If you have problems increase the
	// value.
	// off/no/disabled/false/0: Don't wait (defult)
        // <integer>: Wait for <integer> milliseconds.
	"wait_xhr": "off",
	// Preferred video quality.
	//
	// low/medium/high: Automatically select the link for
	// low/medium/high from the list of links (default low)
	//
	// <number>: Start the <number> link from the list. If not
	// available the highest quality. Use "1" for lowest quality.
	//
	// <number>%: Start the link that corresponds to <number>
	// percent from the list. Float numbers are allowed - 34.56%,
	// 18,6%.
	"quality": "low",
    };

// NO MINIMISATION ABOVE THIS LINE
function LinternaMagica(params)
{
    if (window.top != window.self)
    {
	this.log("LinternaMagica.constructor:\n"+
		 "Skipping (i)frame with address: "+
		 window.location,1);
	return null;
    }
    this.set_locale(params.locale);
    this.debug_level = parseInt(params.debug);
    this.set_web_log_expand(params.web_log_expand);
    if (this.debug_level && params.log_to == "web")
    {
	var logger = this.create_web_logger();
	this.log_to = "web";
	if (!logger)
	{
	    this.log_to = "console";
	}
	var body = document.getElementsByTagName("body")[0];
	if (!body)
	{
	    this.log_to = "console";
	}
	else
	{
	    body.appendChild(logger);
	}
    }
    else
    {
	this.log_to = "console";
    }
    var self = this;
    var val = this.call_site_function_at_position.apply(self,[
	"before_options_init",
	window.location.hostname]);
    if (!val)
    {
	return null;
    }
    this.check_flash_plugin();
    this.set_priority(params.priority);
    this.set_autostart(params.autostart);
    this.set_controls(params.controls);
    this.set_cookies(params.cookies);
    this.set_wait_xhr(params.wait_xhr);
    this.set_check_updates(params.updates);
    this.set_hd_link_quality(params.quality);
    this.updates_data = null;
    this.check_for_updates();
    this.create_stylesheet();
    this.found_flash_video_objects = -1;
    this.requested_ids =new Object();
    if (this.controls)
    {
	this.player_timers = new Array();
	this.volume_slider_timers = new Array();
    }
    var position_function = null ;
    if (this.plugin_is_installed)
    {
	position_function = "flash_plugin_installed";
    }
    else
    {
	position_function = "no_flash_plugin_installed";
    }
    var self = this;
    var val = this.call_site_function_at_position.apply(self,[
	position_function,
	window.location.hostname]);
    if (!val)
    {
	return null;
    }
    this.log("LinternaMagica.constructor:\n"+
	     "Adding DOM event listener for inserted node.",1);
    var self = this;
    var body = document.getElementsByTagName("body")[0];
    if (!body)
	return;
    this.inserted_node_listener =  function(ev)
			  {
			      var el = this;
			      self.if_node_is_inserted.
				  apply(self, [ev, el]);
			  };
    body.addEventListener("DOMNodeInserted",  
			  this.inserted_node_listener, true);
    this.log("LinternaMagica.constructor:\n"+
	     "Checking DOM for objects",1);
    this.extract_objects_from_dom(document);
}
LinternaMagica.prototype = new Object ();
LinternaMagica.constructor = LinternaMagica;
LinternaMagica.prototype.version = "0.0.13";
LinternaMagica.prototype.name =  "Linterna Mágica";
LinternaMagica.prototype.release_date = "1357458910";
LinternaMagica.prototype.updates_page =
    "http://linterna-magica.nongnu.org/downloads/updates.js";
LinternaMagica.prototype.description = function()
{
    return (
	this._("Watch video on the web ")+
	    this._("in a brand new way: ")+
	    this._("You don't need a glint, ")+
	    this._("the magic lantern is ignited!")
    );
}
LinternaMagica.prototype.license = function()
{
    return (
	this._("This program is free software; ")+
	    this._("you can redistribute it and/or ")+
	    this._("modify it under the terms of the ")+
	    this._("GNU  General Public License (GNU GPL)")+
	    this._(" version 3 (or later). ")+
	    this._("A copy of the license can be downloaded from ")
    );
}
LinternaMagica.prototype.absolute_min_height = 212;
LinternaMagica.prototype.absolute_min_width = 300;
LinternaMagica.prototype.min_width = 400;
LinternaMagica.prototype.min_remote_object_height = 169;
LinternaMagica.prototype.license_link =
    "https://www.gnu.org/licenses/gpl.html";
LinternaMagica.prototype.homepage = 
    "http://linterna-magica.nongnu.org";
LinternaMagica.prototype.savannah_page =
    "https://savannah.nongnu.org/projects/linterna-magica";
LinternaMagica.prototype.bug_report_link = 
    "https://sv.nongnu.org/bugs/?func=additem&amp;group=linterna-magica";
LinternaMagica.prototype.microblog_link =
    "https://identi.ca/group/linternamagica";
LinternaMagica.prototype.copyrights = new Array();
LinternaMagica.prototype.copyrights.push("Copyright (C) 2010, 2011, 2012,"+
					 " 2013 Ivaylo Valkov <ivaylo@e-valkov.org>");
LinternaMagica.prototype.copyrights.push("Copyright (C) 2010, 2011, 2012,"+
					 " 2013 Anton Katsarov <anton@katsarov.org>");
LinternaMagica.prototype.player = new Object();
LinternaMagica.prototype.player.init = function(id)
{
    this.player.set_player_name.apply(this,[id]);
    var self = this;
    var started_clip = this.find_started_clip();
    if (this.autostart &&
	(started_clip == null || started_clip == id))
    {
	this.player_timers[id] = 
	    setInterval(function()
			{
			    self.ticker.apply(self,[id]);
			}, 500);
    }
    var volume_interval_function =    function()
    {
	var knob =
	    document.getElementById("linterna-magica-controls-"+
				    "volume-slider-knob-"+id);
	if (!knob)
	{
	    return null;
	}
	var slider = knob.parentNode;
	var vol = null;
	var video_object = self.get_video_object(id);
	var player_name = video_object.getAttribute("player_name");
	if (/gecko/i.test(player_name)
	    || /quicktime plug-in/i.test(player_name))
	{
	    try
	    {
		vol = video_object.GetVolume();
		if (/quicktime/i.test(player_name))
		{
		    vol = parseInt(vol * 100/255);
		}
	    }
	    catch(e)
	    {
	    }
	}
	else if (/vlc/i.test(player_name))
	{
	    if (video_object.audio)
	    {
		vol =
		    video_object.audio.
		    volume;
	    }
	}
	if (vol)
	{
	    var pos = 
		parseInt((slider.clientWidth*vol/100) -
			 knob.clientWidth-knob.clientWidth/2);
	    knob.style.setProperty("left", pos+"px", "important");
	    clearInterval(volume_interval);
	}
    }
    var volume_interval =
	setInterval(volume_interval_function, 800);
}
LinternaMagica.prototype.languages = new Object();
LinternaMagica.prototype.languages["C"] = 
    {
	__direction: "ltr",
	__translators: null,
    };
LinternaMagica.prototype.static_strings = function()
{
    this.N_("Jan");
    this.N_("Feb");
    this.N_("Mar");
    this.N_("Apr");
    this.N_("May");
    this.N_("Jun");
    this.N_("Jul");
    this.N_("Aug");
    this.N_("Sep");
    this.N_("Oct");
    this.N_("Noe");
    this.N_("Dec");
    this.N_("__translators");
    this.N_("__direction");
};
LinternaMagica.prototype.set_cookies = function(cookies)
{
    var set_cookies_to = cookies ? cookies :"";
    if (!cookies ||
	(!/delete/i.test(cookies) &&
	 !/restore/i.test(cookies)))
    {
	set_cookies_to = "delete";
    }
    this.process_cookies = set_cookies_to;
}
LinternaMagica.prototype.set_priority = function(priority)
{
    var std_priority = new Object();
    std_priority.html5 = 13;
    std_priority.self = 12;
    std_priority.plugin = 11;
    std_priority.options = 3;
    if (!priority ||
	typeof(priority) !== "string")
    {
	priority = "html5,self,plugin";
    }
    priority = priority.replace(/\s*/g,"");
    var set_priority_to = priority.split(/,/) ;
    var t = new Object();
    t.options = 0;
    for (var i=0, l=set_priority_to.length; i< l; i++)
    {
	var o = set_priority_to[i];
	if (/plugin/i.test(o) || /self/i.test(o) || /html5/i.test(o))
	{
	    t[o] = (l+10) - i;
	    t.options ++;
	}
    }
    if (!t.options)
    {
	set_priority_to = std_priority;
    }
    else
    {
	set_priority_to = new Object();
	set_priority_to.html5  = t.html5 ? t.html5 : (std_priority.html5 -10);
	set_priority_to.self  = t.self ? t.self : (std_priority.self - 10);
	set_priority_to.plugin  = t.plugin ? t.plugin : (std_priority.plugin - 10);
	set_priority_to.options = 3;
    }
    if (!this.plugin_is_installed &&
	(set_priority_to.plugin > set_priority_to.self))
    {
	t = set_priority_to.self;
	set_priority_to.self = set_priority_to.plugin;
	set_priority_to.plugin = t;
    }
    this.priority = set_priority_to;
}
LinternaMagica.prototype.set_controls = function(controls)
{
    var set_controls_to;
    if (!controls ||
	(!/plugin/i.test(controls) &&
	 !/self/i.test(controls)))
    {
	set_controls_to = false;
    }
    if (/plugin/i.test(controls))
    {
	set_controls_to=false;
    }
    if (/self/i.test(controls))
    {
	set_controls_to=true;
    }
    this.controls = set_controls_to;
}
LinternaMagica.prototype.set_autostart = function(autostart)
{
    var start = autostart ? autostart : true;
    if (!autostart ||
	(!/enabled/i.test(autostart) && 
	 !/disabled/i.test(autostart) &&
	 !/on/i.test(autostart) &&
	 !/off/i.test(autostart) &&
	 !/true/i.test(autostart) &&
	 !/false/i.test(autostart)))
    {
	start = false;
    }
    if (/enabled/i.test(autostart) ||
	/on/i.test(autostart) ||
	/true/i.test(autostart))
    {
	start = true;
    }
    if (/disabled/i.test(autostart)
	|| /off/i.test(autostart)
	|| /false/i.test(autostart))
    {
	start = false;
    }
    this.autostart = start;
}
LinternaMagica.prototype.set_wait_xhr = function(wait)
{
    var set_wait_to = wait ? wait :"";
    if (!wait ||
	(typeof(wait) != "number" &&
	 !/[0-9]+/i.test(wait) &&
	 !/false/i.test(wait) &&
	 !/no/i.test(wait) &&
	 !/off/i.test(wait) &&
	 !/disabled/i.test(wait)))
    {
	set_wait_to = 1500;
    }
    if ( /false/i.test(wait) ||
	 /no/i.test(wait) ||
	 /off/i.test(wait) ||
	 /disabled/i.test(wait))
    {
	set_wait_to = 0;
    }
    if (/[0-9]+/i.test(wait))
    {
	set_wait_to = parseInt(wait);
    }
    this.wait_xhr = set_wait_to;
}
LinternaMagica.prototype.set_check_updates = function(updates)
{
    var set_updates_to = updates ? updates : "";
    if (!updates ||
	(!/^[0-9]+(d|w|m||y)$/i.test(updates) &&
	 !/false/i.test(updates) &&
	 !/no/i.test(updates) &&
	 !/off/i.test(updates) &&
	 !/disabled/i.test(updates) &&
	 !/never/i.test(updates)))
    {
	set_updates_to = "3w";
    }
    if ((/false/i.test(updates) ||
	 /no/i.test(updates) ||
	 /off/i.test(updates) ||
	 /disabled/i.test(updates) ||
	 /never/i.test(updates)) ||
	updates >= 0)
    {
	set_updates_to = -1;
    }
    this.updates = set_updates_to;
}
LinternaMagica.prototype.set_locale = function(locale)
{
    this.set_env_lang();
    if (/auto/i.test(locale))
    {
	locale = this.env_lang;
    }
    if (/.*_.*/.test(locale))
    {
	locale = locale.split(/_/);
	locale[locale.length-1] = 
	    locale[locale.length-1].toUpperCase();
	locale[0] = 
	    locale[0].toLowerCase();
	locale = locale.join("_");
    }
    var set_lang_to = locale ? locale : this.env_lang;
    if (!set_lang_to ||
	!/[a-z][a-z]_[A-Z][A-Z]/i.test(set_lang_to) ||
	this.languages[set_lang_to] == undefined)
    {
	set_lang_to = "C";
    }
    this.lang = set_lang_to;
}
LinternaMagica.prototype.set_hd_link_quality = function(quality)
{
    var set_quality_to = quality ? quality : "low";
    var err = null;
    if (!/^(low|medium|high|[0-9]+|[0-9.,]+%)$/i.test(set_quality_to) ||
	/^low$/i.test(set_quality_to))
    {
	set_quality_to = -0.33;
    }
    else if (/^medium$/i.test(set_quality_to))
    {
	set_quality_to = -0.66;
    }
    else if (/^high$/i.test(set_quality_to))
    {
	set_quality_to = -1;
    }
     else if (/^[0-9]+$/i.test(set_quality_to))
    {
	set_quality_to = parseInt(set_quality_to);
	if (!set_quality_to)
	{
	    err = 1;
	}
    }
    else if (/^[0-9.,]+%$/i.test(set_quality_to))
    {
	set_quality_to = set_quality_to.replace(/,/g,".");
	set_quality_to = - parseFloat(set_quality_to)/100;
	if (isNaN(set_quality_to))
	{
	    err = 1;
	}
    }
    if (err) 
    {
	set_quality_to = -0.33;
    }
    this.preferred_hd_quality = set_quality_to;
}
LinternaMagica.prototype.set_web_log_expand = function(web_log_expand)
{
    if (/true/i.test(web_log_expand))
    {
	web_log_expand = true;
    }
    else if (/false/i.test(web_log_expand))
    {
	web_log_expand = false;
    }
    this.web_log_expand = web_log_expand;
}
LinternaMagica.prototype.sites = new Object();
LinternaMagica.prototype.sites.__before_options_init = function ()
{
    return true;
}
LinternaMagica.prototype.sites.__no_flash_plugin_installed = function()
{
    this.log("LinternaMagica.sites.__no_flash_plugin_installed:\n"+
	     "Examining scripts.", 4);
    this.extract_objects_from_scripts();
    return true;
}
LinternaMagica.prototype.sites.__flash_plugin_installed = function()
{
    return true;
}
LinternaMagica.prototype.sites.__set_cookies_domain = function()
{
    return true;
}
LinternaMagica.prototype.sites.__process_cookies = function()
{
    return true;
}
LinternaMagica.prototype.sites.__do_not_force_iframe_detection =
function()
{
    return true;
}
LinternaMagica.prototype.sites.__skip_video_id_extraction = function()
{
    return true;
}
LinternaMagica.prototype.sites.__skip_xhr_if_video_id = function(object_data)
{
    return true;
}
LinternaMagica.prototype.sites.__skip_link_extraction = function()
{
    return true;
}
LinternaMagica.prototype.sites.__extract_hd_links_from_dom_if_link =
function(data)
{
    return true;
}
LinternaMagica.prototype.sites.__extract_hd_links_from_script_if_link =
function()
{
    return true;
}
LinternaMagica.prototype.sites.__skip_script_processing = function()
{
    if (this.script_data.length >= 17408)
    {
	this.log("LinternaMagica.sites.__skip_script_processng:\n"+
		 "Skipping script with size "+this.script_data.length,5);
	return false;
    }
    else
    {
	this.log("LinternaMagica.sites.__skip_script_processng:\n"+
		 "Processing script with size "+this.script_data.length,5);
    }
    return true;
}
LinternaMagica.prototype.sites.__extract_object_from_script = function()
{
    return true;
}
LinternaMagica.prototype.sites.__stop_if_one_extracted_object_from_script =
function()
{
    return true;
}
LinternaMagica.prototype.sites.__libswfobject_skip_video_id_extraction =
function()
{
    return true;
}
LinternaMagica.prototype.sites.__replace_extracted_object_from_script =
function(object_data)
{
    return true;
}
LinternaMagica.prototype.sites.__set_video_link_regex = function()
{
    return true;
}
LinternaMagica.prototype.sites.__process_extracted_link = function(link)
{
    return true;
}
LinternaMagica.prototype.sites.__do_not_clean_amps_in_extracted_link =
function()
{
    return true;
}
LinternaMagica.prototype.sites.__set_video_id_regex = function()
{
    return true;
}
LinternaMagica.prototype.sites.__plugin_install_warning = function(node)
{
    return true;
}
LinternaMagica.prototype.sites.__plugin_install_warning_loop =
function(node)
{
    return true;
}
LinternaMagica.prototype.sites.__prepare_xhr = function(object_data)
{
    return false;
}
LinternaMagica.prototype.sites.__process_xhr_response =
function(args)
{
    return true;
}
LinternaMagica.prototype.sites.__process_duplicate_object_before_xhr =
function(object_data)
{
    return true;
}
LinternaMagica.prototype.sites.__insert_object_after_xhr = function(object_data)
{
    return true;
}
LinternaMagica.prototype.sites.__css_fixes = function(object_data)
{
    return true;
}
LinternaMagica.prototype.sites.__skip_flowplayer_links_fix =
function(object_data)
{
    return true;
}
LinternaMagica.prototype.sites.__custom_html5_player_finder =
function(parent)
{
    return true;
}
LinternaMagica.prototype.call_site_function_at_position =
function (position_name, match_site, data)
{
    var self = this;
    var debug_level  =  6;
    if (position_name == "process_cookies" ||
	position_name == "extract_object_from_script" || 
	position_name == "skip_script_processing")
    {
	debug_level = 7;
    }
    if (this.sites[match_site])
    {
	if (typeof(this.sites[match_site]) == "object" &&
	    typeof(this.sites[match_site][position_name]) == "function")
	{
	    this.log("LinternaMagica.call_site_function_at_position:\n"+
		     "Calling function "+position_name+
		     " for site (both site and function defined)",debug_level);
	    return this.sites[match_site][position_name].apply(self,[data]);
	}
	else if (typeof(this.sites[match_site]) == "object" &&
		 typeof(this.sites[match_site][position_name]) == "string")
	{
	    var ref_to = this.sites[match_site][position_name];
	    this.log("LinternaMagica.call_site_function_at_position:\n"+
		     "Calling referenced function "+
		     position_name+" (site defined,"+
		     " function reference): "+match_site+" -> "+ref_to,debug_level);
	    return this.call_site_function_at_position.apply(self, [
		position_name, ref_to, data]);
	}
	else if (typeof(this.sites[match_site]) == "string")
	{
	    var ref_to = this.sites[match_site];
	    if (typeof(this.sites[ref_to][position_name]) != "undefined")
	    {
		this.log("LinternaMagica.call_site_function_at_position:\n"+
			 "Using another site config (reference) for function "+
			 position_name+": "+match_site+" -> "+ref_to,debug_level);
		return this.call_site_function_at_position.apply(self, [
		    position_name, ref_to, data]);
	    }
	}
    }
    if ((this.sites[match_site] &&
	 !this.sites[match_site][position_name]) ||
	!this.sites[match_site])
    {
	this.log("LinternaMagica.call_site_function_at_position:\n"+
		 "Using default function "+position_name+
		 " (no site specific config)",debug_level);
	return this.sites["__"+position_name].apply(self, [data]);
    }
    return true;
}
LinternaMagica.prototype.create_about_box = function(id)
{
    var box = document.createElement("div");
    box.style.setProperty("display", "none", "important");
    box.setAttribute("id", "linterna-magica-about-box-"+id);
    box.setAttribute("class", "linterna-magica-about-box");
    var p = document.createElement("p");
    var text = document.createTextNode(
	this.name+this._(" version: ")+this.version);
    p.appendChild(text);
    box.appendChild(p);
    for (var l=0, length=this.copyrights.length; l< length; l++)
    {
	p = document.createElement("p");
	text = document.createTextNode(this.copyrights[l]);
	p.appendChild(text);
	box.appendChild(p);
    }
    if (this.languages[this.lang] &&
	this.languages[this.lang].__translators)
    {
	var translation = null;
	if (typeof (this.languages[this.lang].__translators) == "object")
	{
	    translation = this.languages[this.lang].__translators;
	}
	else
	{
	    translation = new Array();
	    translation.push(this.languages[this.lang].__translators);
	}
	p = document.createElement("p");
	text = document.createTextNode(this._("Translation")+":");
	p.appendChild(text);
	box.appendChild(p);
	for (var l=0, length=translation.length; l< length; l++)
	{
	    p = document.createElement("p");
	    text = document.createTextNode(translation[l]);
	    p.appendChild(text);
	    box.appendChild(p);
	}
    }
    p = document.createElement("p");
    text = document.createTextNode(this.description());
    p.appendChild(text);
    box.appendChild(p);
    p = document.createElement("p");
    text = document.createTextNode(this.license());
    p.appendChild(text);
    box.appendChild(p);
    var license_link = this.pack_external_link(this.license_link,
					  this.license_link);
    license_link.setAttribute("title", this.license_link);
    p = document.createElement('p');
    p.appendChild(license_link);
    box.appendChild(p);
    var homepage = 
	this.pack_external_link(this.homepage,
				this._("Linterna Mágica Home page"));
    homepage.setAttribute("title", this.homepage);
    p = document.createElement('p');
    p.appendChild(homepage);
    box.appendChild(p);
    var savannah_link = 
	this.pack_external_link(
	    this.savannah_page,
	    this._("Linterna Mágica project page at Savannah"));
    savannah_link.setAttribute("title", this.savannah_page);
    p = document.createElement("p");
    p.appendChild(savannah_link);
    box.appendChild(p);
    var bug_report_link = 
	this.pack_external_link(
	    this.bug_report_link,
	    this._("Report a bug at our Savannah project page"));
    bug_report_link.setAttribute("title", this.bug_report_link);
    p = document.createElement("p");
    p.appendChild(bug_report_link);
    box.appendChild(p);
    var microblog_link = 
	this.pack_external_link(
	    this.microblog_link,
	    this._("Linterna Mágica microbloging group at Identi.ca"));
    microblog_link.setAttribute("title", this.microblog_link);
    p = document.createElement("p");
    p.appendChild(microblog_link);
    box.appendChild(p);
    return box;
}
LinternaMagica.prototype.about = function(event, element)
{
    if (event)
    {
	event.preventDefault();
    }
    var id = element.getAttribute("id");
    id = id.split("-");
    id = id[id.length-1];
    var obj =  document.getElementById("linterna-magica-video-object-"+id);
    var about = document.getElementById("linterna-magica-about-box-"+id);
    var updates = document.
	getElementById("linterna-magica-update-info-box-"+id);
    if (about)
    {
	if (updates && !updates.style.display)
	{
	    updates.style.setProperty("display","none", "important");
	}
	if(about.style.display)
	{
	    about.style.removeProperty("display");
	    this.hide_lm_video_object(id);
	}
	else
	{
	    about.style.setProperty("display","none", "important");
	    this.show_lm_video_object(id);
	}
    }
}
LinternaMagica.prototype.check_for_updates = function()
{
    if (this.updates == -1 || 
	/svn/i.test(this.version))
    {
    	return  null;
    }
    if (this.check_for_updates_once)
    {
	return null;
    }
    this.check_for_updates_once = true;
    var updates_mul;
    var in_seconds ;
    if (/d$/i.test(this.updates))
    {
	updates_mul = parseInt(this.updates.split('d')[0]);
	in_seconds = 60*60*24;
    }
    else if (/w$/i.test(this.updates))
    {
	updates_mul = parseInt(this.updates.split('w')[0]);
	in_seconds = 60*60*24*7;
    }
    else if (/m$/i.test(this.updates))
    {
	updates_mul = parseInt(this.updates.split('m')[0]);
	in_seconds = 60*60*24*7*31;
    }
    else if (/y$/i.test(this.updates))
    {
	updates_mul = parseInt(this.updates.split('y')[0]);
	in_seconds = 60*60*24*365;
    }
    var update_date = 
	new Date(parseInt(this.release_date)*1000);
    var plus_day = 60*60*24;
    var plus_two_days = 2*plus_day;
    var update_date_d1 = 
	new Date((parseInt(this.release_date)+plus_day)*1000);
    var update_date_d2 = 
    new Date((parseInt(this.release_date)+plus_two_days)*1000);
    var now = new Date();
    var date_diff =  now - update_date;
    var d1_diff = now - update_date_d1;
    var d2_diff = now  - update_date_d2;
    if ((Math.floor(date_diff/1000/(in_seconds)) % updates_mul) &&
	(Math.floor(d1_diff/1000/(in_seconds)) % updates_mul) && 
	(Math.floor(d2_diff/1000/(in_seconds)) % updates_mul))
    {
	return null;
    }
    var jsonp_request_data = new Object();
    jsonp_request_data.frame_id = "linterna-magica-updates-checker";
    jsonp_request_data.parser_timeout = this.updates_timeout;
    jsonp_request_data.parser_timeout_counter = 
	this.updates_timeout_counter;
    jsonp_request_data.jsonp_script_link =  this.updates_page;
    jsonp_request_data.jsonp_function = "linterna_magica_latest_version";
    jsonp_request_data.parser_function = this.parse_updated_version_data;
    this.create_checker_frame(jsonp_request_data);
}
LinternaMagica.prototype.parse_updated_version_data = function(data)
{
    var new_release_date = new Date(data.date * 1000);
    var current_release_date  = new Date(this.release_date*1000);
    if ( new_release_date > current_release_date )
    {
	var date = data.date;
	date = new Date (parseInt(date)*1000);
	var format_date = date.toString().replace(/[0-9]+:[0-9]+.*/,"");
	format_date = format_date.split(" ");
	this.updates_data = new Object();
	this.updates_data.date = date;
	this.updates_data.version = data.version;
	this.updates_data.format_date = format_date;
	var notifier_buttons = 
	    document.querySelectorAll('.linterna-magica-update-'+
				      'notifier-link');
	for(var i=0, l=notifier_buttons.length; i<l; i++)
	{
	    var button = notifier_buttons[i];
	    button.style.removeProperty("display");
	    button.setAttribute("title",
				this._("New version")+
				": "+data.version+". "+this._("Date")+": "+
				this._(format_date[2]) + " "+
				this._(format_date[1]) + " " +
				this._(format_date[3]));
	    var id = button.getAttribute("id").split(/-/);
	    id = id[id.length-1];
	    var video_object = this.get_video_object(id);
	    var heigh = this.extract_object_height(video_object);
	    var info_box = 
		document.getElementById("linterna-magica-"+
					"update-info-box-"-id);
	    if (!info_box)
	    {
		var info_box = this.create_update_info_box(id,video_object);
		var lm = document.getElementById("linterna-magica-"+id);
		if (lm)
		{
		    lm.appendChild(info_box);
		}
	    }
	}
	var side_button = this.create_side_update_notifier_button();
    }
}
LinternaMagica.prototype.create_update_notifier_link = function(id)
{
    var title = 
	this._("New version");
    if (this.updates_data)
    {
	var date = this.updates_data.date;
	var version = this.updates_data.version;
	var format_date =  this.updates_data.format_date;
	title +=
	": "+version+". "+this._("Date")+": "+
	    this._(format_date[2]) + " "+
	    this._(format_date[1]) + " " +
	    this._(format_date[3]);
    }
    var notifier = document.createElement("a");
    notifier.setAttribute("title", title);
    notifier.setAttribute("href", "#");
    notifier.setAttribute("class", "linterna-magica-update-notifier-link ");
    notifier.setAttribute("id",  "linterna-magica-update-"+
					  "notifier-link-"+id);
    notifier.textContent = this._("Update");
    return notifier;
}
LinternaMagica.prototype.create_update_info_box = function(id, object_height)
{
    var date = this.updates_data.date;
    var version = this.updates_data.version;
    var format_date =  this.updates_data.format_date;
    var div = document.createElement("div");
    div.style.setProperty("display", "none", "important");
    div.setAttribute("class", "linterna-magica-update-info-box");
    div.setAttribute("id", "linterna-magica-update-info-box-"+id);
    div.style.setProperty("height", 
			  parseInt(object_height-40)+"px",
			  "important");
    var p = document.createElement('p');
    var t = document.createTextNode(this._("New version is available."));
    p.appendChild(t);
    div.appendChild(p);
    p = document.createElement('p');
    t = document.createTextNode(
	"Linterna Mágica"+" "+version+
	    " "+this._("released at")+" "+this._(format_date[2]) + " "+
 	    this._(format_date[1]) + " "+this._(format_date[3]));
    p.appendChild(t);
    div.appendChild(p);
    var a = this.pack_external_link(
	this.homepage+"/#news",
	this._("Read the news section at the home page"));
    p = document.createElement('p');
    p.appendChild(a);
    div.appendChild(p);
    return div;
}
LinternaMagica.prototype.show_or_hide_update_info = function(event, element)
{
    if (event)
    {
	event.preventDefault();
    }
    var id = element.getAttribute("id");
    id = id.split("-");
    id = id[id.length-1];
    var obj =  document.getElementById("linterna-magica-video-object-"+id);
    var updates = document.
	getElementById("linterna-magica-update-info-box-"+id);
    var about = document.
	getElementById("linterna-magica-about-box-"+id);
    if (updates)
    {
	if (about && !about.style.display)
	{
	    about.style.setProperty("display","none", "important");
	}
	if (updates.style.display)
	{    
	    updates.style.removeProperty("display");
	    this.hide_lm_video_object(id);
	}
	else
	{
	    updates.style.setProperty("display","none", "important");
	    this.show_lm_video_object(id);
	}
    }
}
LinternaMagica.prototype.create_side_update_notifier_button = function()
{
    var side_button = document.createElement("p");
    side_button.setAttribute('class', 'linterna-magica-side-update-notifier-button-wrap');
    side_button.setAttribute('id', 'linterna-magica-side-update-notifier-button-wrap');
    var logo = this.create_side_update_notifier_link();
    logo.textContent = '';
    logo.setAttribute('class',
		      'linterna-magica-side-update-notifier-button');
    side_button.appendChild(logo);
    var update_icon = document.createElement('span');
    update_icon.setAttribute('class', 'linterna-magica-side-update-'+
			     'notifier-button-update-icon');
    logo.appendChild(update_icon);
    var close = this.create_side_update_notifier_close_link();
    side_button.appendChild(close);
    close.addEventListener("click", this.remove_side_update_notifier, false);
    document.body.appendChild(side_button);
}
LinternaMagica.prototype.create_side_update_notifier_link = function()
{
    var date = this.updates_data.date;
    var version = this.updates_data.version;
    var format_date =  this.updates_data.format_date;
    var update_info =
	this._("New version is available.")+"\n"+
	"Linterna Mágica"+" "+version+
	" "+this._("released at")+" "+this._(format_date[2]) + " "+
 	this._(format_date[1]) + " "+this._(format_date[3])+"\n"+
	this._("Read the news section at the home page");
    var link = this.pack_external_link(
	this.homepage+"/#news",
	update_info);
    link.setAttribute("title", update_info);
    return link;
}
LinternaMagica.prototype.create_side_update_notifier_close_link = function()
{
    var close = document.createElement("a");
    close.textContent="x";
    close.setAttribute("href", "#");
    close.setAttribute("class", "linterna-magica-side-update-"+
		       "notifier-button-close")
    close.setAttribute("title", this._("Remove update notifier"));
    return close;
} 
LinternaMagica.prototype.remove_side_update_notifier = function(event, element)
{
    var update_notifier = 
	document.getElementById('linterna-magica-side-update-'+
				'notifier-button-wrap');
    if (!update_notifier)
    {
	return null;
    }
    update_notifier.parentNode.removeChild(update_notifier);
}
LinternaMagica.prototype.compute_preferred_hd_link = function(hd_links)
{
    var preferred_link_index = null;
    if (this.preferred_hd_quality > 0)
    {
	if (hd_links[this.preferred_hd_quality])
	{
	    preferred_link_index = this.preferred_hd_quality;
	}
	else
	{
	    preferred_link_index = hd_links.length;
	}
    }
    else if (this.preferred_hd_quality < 0)
    {
	var quality = Math.abs(this.preferred_hd_quality);
	preferred_link_index = Math.floor(((hd_links.length)*quality));
    }
    if (preferred_link_index == 0)
    {
	preferred_link_index = 1;
    }
    if (Math.abs(this.preferred_hd_quality) > 0.5 &&
	hd_links.length == 2)
    {
	preferred_link_index = hd_links.length;
    }
    return Math.abs(hd_links.length-preferred_link_index);
}
LinternaMagica.prototype.extract_cookies = function()
{
    this.cookies = document.cookie.split(";");
    return this.cookies;
}
LinternaMagica.prototype.store_cookies = function(expire)
{
    if (!this.cookies)
    {
	return null;
    }
    var cookies = this.cookies;
    var past_date = new  Date(1983, 9, 27);
    var domain = window.location.hostname;
    var self = this;
    var val = this.call_site_function_at_position.apply(self,[
	"set_cookies_domain",
	window.location.hostname]);
    if (!val)
    {
	return null;
    }
    else if (typeof(val) == "string")
    {
	domain = val;
    }
    for (var i=0, l=cookies.length; i<l; i++)
    {
	 var val = this.call_site_function_at_position.apply(self,[
	     "process_cookies",
	     window.location.hostname]);
	try 
	{
	    if (typeof(val) == "string")
	    {
		document.cookie = cookies[i]+
		    (expire ? "; expires="+
		     past_date.toUTCString(): "")+val;
	    }
	}
	catch(e)
	{
	    this.log("LinternaMagica.store_cookies:\n"+
		     "Exception while setting cookie with"+
		     " site specific string: "+e,1);
	}
	try
	{
	    document.cookie = cookies[i]+
		(expire ? "; expires="+past_date.toUTCString(): "")+
		"; domain="+domain+"; path=/; host="+domain+"; ";
	}
	catch(e)
	{
	    this.log("LinternaMagica.store_cookies:\n"+
		     "Exception while setting cookie: "+e,1);
	}
    }
}
LinternaMagica.prototype.restore_cookies = function()
{
    this.store_cookies(0);
}
LinternaMagica.prototype.expire_cookies = function ()
{
    this.store_cookies(1);
}
LinternaMagica.prototype.create_video_object = function(object_data)
{
    if (typeof(object_data) !== "object")
    {
	return;
    }
    object_data.outer_height = object_data.height-1;
    object_data.height -= this.controls ? 36 : 24;
    var toggle_plugin = null;
    var id = object_data.linterna_magica_id;
    this.log("LinternaMagica.create_video_object:\n"+
	     "Creating video object with linterna_magica_id "+id,2);
    if (((id-1) >= 0))
    {
	var lm_instance = 
	    document.getElementById("linterna-magica-"+(id-1));
	if (lm_instance && lm_instance.parentNode &&
	    lm_instance.parentNode == object_data.parent)
	{
	     this.log("LinternaMagica.create_video_object:\n"+
		      "It seems object with linterna_magica_id "+id+
		      " will be created at the same place where object "+
		      "with linterna_magica_id "+(id-1)+" already exists. "+
		      "Not creating object with id #"+id,1);
	    return null;
	}
    }
    var container = document.createElement("div");
    var object_tag_wrapper = document.createElement("div");
    var object_tag = document.createElement("object");
    var message = document.createElement("p");
    var param = document.createElement("param");
    container.setAttribute("id", "linterna-magica-"+id);
    container.setAttribute("class", "linterna-magica");
    if (object_data.width < this.min_width) {
	container.setAttribute("class", "linterna-magica-lower");
    }
    container.setAttribute("dir", this.languages[this.lang].__direction);
    var lang_code = this.lang.split("_")[0];
    if (!lang_code)
    {
	lang_code = "en";
    }
    container.setAttribute("xml:lang", lang_code);
    container.setAttribute("lang", lang_code);
    container.style.setProperty("width",
				(object_data.width+"px"), "important");
    container.style.setProperty("height",
				(object_data.outer_height+"px"), "important");
    object_tag_wrapper.setAttribute("id", "linterna-magica-video-object-wrapper-"+id);
    object_tag_wrapper.setAttribute("class", "linterna-magica-video-object-wrapper");
    object_tag_wrapper.style.setProperty("height", object_data.height+"px",
				 "important");
    object_tag_wrapper.style.setProperty("width", object_data.width+"px",
				 "important");
    object_tag_wrapper.style.setProperty("display", "block",
					 "important");
    var site_html5_player =
	this.find_site_html5_player_wrapper(object_data.parent);
    var toggle_plugin_switch_type = 
	site_html5_player ? "html5" : "plugin";
    object_tag.setAttribute("width", object_data.width);
    object_tag.setAttribute("height", object_data.height);
    object_tag.setAttribute("id","linterna-magica-video-object-"+id);
    object_tag.setAttribute("class","linterna-magica-video-object");
    object_tag.setAttribute("standby", this._("Loading video..."));
    if (object_data.link)
    {
	var mime = object_data.mime ? object_data.mime : "video/flv";
	if (/mp4|m4v|quicktime/i)
	{
	    var mp4 = navigator.mimeTypes["video/mp4"];
	    if (mp4 && mp4.enabledPlugin && mp4.enabledPlugin.name &&
		/totem/i.test(mp4.enabledPlugin.description))
	    {
		mime = "video/flv";
	    }
	}
	object_tag.setAttribute("type", mime);
	object_tag.setAttribute("data", object_data.link);
    }
    message.textContent = this._("Waiting for video plugin...");
    message.style.setProperty("height", object_data.height+"px",
				 "important");
    message.style.setProperty("width", object_data.width+"px",
				 "important");
    param.setAttribute("name", "autoplay");
    var started_clip = this.find_started_clip();
    param.setAttribute("value",
		       (started_clip !== null) ? "false" : this.autostart);
    object_tag.appendChild(param);
    param = document.createElement("param");
    param.setAttribute("name", "showcontrols");
    param.setAttribute("value", (this.controls ? "false": "true"));
    object_tag.appendChild(param);
    param = document.createElement("param");
    param.setAttribute("name", "toolbar");
    param.setAttribute("value", (this.controls ? "false": "true"));
    object_tag.appendChild(param);
    param = document.createElement("param");
    param.setAttribute("name", "controller");
    param.setAttribute("value", (this.controls ? "false": "true"));
    object_tag.appendChild(param);
    param = document.createElement("param");
    param.setAttribute("name", "cache");
    param.setAttribute("value",  true);
    object_tag.appendChild(param);
    object_tag.appendChild(message);
    object_tag_wrapper.appendChild(object_tag);
    container.appendChild(object_tag_wrapper);
    var about_box = this.create_about_box(id);
    about_box.style.setProperty("height", (object_data.height-40)+"px",
				"important");
    container.appendChild(about_box);
    object_tag.linterna_magica_id =
	parseFloat(object_data.linterna_magica_id+".1");
    if (this.plugin_is_installed || site_html5_player)
    {
	toggle_plugin =
	    this.create_toggle_plugin_link("link-not-in-header", id,
					  toggle_plugin_switch_type);
	var before = null;
	if (this.plugin_is_installed && !site_html5_player)
	{
	    before = this.get_flash_video_object(id) ?
		this.get_flash_video_object(id) : null;
	}
	else if (site_html5_player)
	{
	    before = site_html5_player;
	}
	if (before && before.nextSibling)
	{
	    object_data.parent.insertBefore(toggle_plugin, before.nextSibling);
	}
	else
	{
	    object_data.parent.appendChild(toggle_plugin);
	}
	if (((this.priority.self > this.priority.plugin) && 
	     this.plugin_is_installed && !site_html5_player) ||
	    ((this.priority.self > this.priority.html5) &&
	     site_html5_player))
	{
	    toggle_plugin.style.setProperty("display", "none",
					    "important");
	}
	this.add_css_class(object_data.parent, "linterna-magica-ws-video-parent");
    }
    if (this.updates_data)
    {
	var update_info = this.create_update_info_box(id, object_data.height);
	container.appendChild(update_info);
    }
    var controls = this.create_controls(object_data);
    object_tag.setAttribute("data", object_data.link);
    container.appendChild(controls);
    var site_player =  this.get_flash_video_object(id);
    if (!site_player)
    {
	site_player = site_html5_player;
    }
    if ((((this.priority.self > this.priority.plugin) &&
	  !site_html5_player) || 
	 ((this.priority.self > this.priority.html5) &&
	  site_html5_player)) &&
	site_player &&
	site_player.parentNode)
    {
	if(site_player.nextSibling)
	{
	    object_data.use_sibling = site_player.nextSibling;
	}
	if (!site_html5_player)
	{
	    this.hide_flash_video_object(id,site_player.parentNode);
	}
	else 
	{
	    this.pause_site_html5_player(object_data.parent);
	    this.hide_site_html5_player(object_data.parent);
	}
    }
    if (toggle_plugin)
    {
	object_data.parent.insertBefore(container, toggle_plugin);
    }
    else
    {
	if (object_data.use_sibling)
	{
	    object_data.parent.insertBefore(
		container,
		object_data.use_sibling);
	}
	else
	{
	    if (object_data.parent)
	    {
		object_data.parent.appendChild(container);
	    }
	}
    }
    if (((this.priority.self < this.priority.plugin) && 
	 this.plugin_is_installed) || 
	((this.priority.self < this.priority.html5) && 
	 site_html5_player))
    {
	this.hide_lm_interface(object_data.linterna_magica_id);
    }
    if (site_player)
    {
	site_player.style.setProperty("height", object_data.outer_height+"px",
				      "important");
	site_player.style.setProperty("position", "relative", "important");
	site_player.style.setProperty("z-index", "9999999", "important");
	site_player.style.setProperty("background-color",
				      "black", "important");
	site_player.style.setProperty("border",
				     "1px solid #36393E", "important");
    }
    object_tag.style.setProperty("height", object_data.height+"px",
				 "important");
    object_tag.style.setProperty("width", object_data.width+"px",
				 "important");
    if (this.plugin_is_installed)
    {
	object_data.parent.style.
	    setProperty("background-color", "transparent",
			"important");
	if (object_data.parent.parentNode)
	{
	    object_data.parent.parentNode.
		style.setProperty("background-color", "transparent",
				  "important");
	}
    }
    if (this.controls &&
	(this.priority.self > this.priority.plugin))
    {
	this.player.init.apply(this,[id]);
    }
    if (!this.controls && !this.get_player_name(id))
    {
	this.player.set_player_name.apply(this,[id]);
    }
    var self = this;
    var val = this.call_site_function_at_position.apply(self,[
	"css_fixes",
	window.location.hostname, object_data]);
    return null;
}
LinternaMagica.prototype.create_stylesheet = function()
{
    var style = document.createElement("style");
    var head = null;
    try
    {
	head = document.getElementsByTagName("head");
    }
    catch(e)
    {
	return;
    }
    if (!head)
    {
	return null;
    }
    head = head[0];
var button_about_lower="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMTSURBVEiJ7ZVNaJRXFIbfeyc2PwYNqHEkiYlYZVSi1rbixoUipf4QlKItWipoUBQEEVyWmkUhoKXUCv6g6EIXKmqjIgiiojSixELMgMWmNTL5ZuLoJGbi2Ll/53QxM99Mx0nJJrue5XnOed97zr18n2BmjGfIcVX/32AsUQYA3heX6wMWrZDyTPDK+r7iooGWy59CiqWCkRAI3KntaHmZY9H1HQ2S7UoJUc5OdE6/viFc2CuYGd6a88tI4IGQvKL+2ld3czDWcr3KUOqEYGz5V5PAd/VV8vtIig4D2F2AGMDR+MvhvR937TD+BHeS4dplE+fi0ds/gpsLqlNq6DCATf3q9dmfYlf/rPtgqmoNfhaqlhVtvcPYCqBhyKZO/jxw7S8mKt81Y22odsLkXTVTKgcBfOsbPE/Faj8qb8LzdCyYEw+vOjldsNh+c/i38A+xX77OZJ/hymAnjjTt7JlbUdd8O9nd1R691JrruZ18wu0NW58umTh738VNFw9svLDRSQAgIiijQUT+6dPWLVRG48ZQVwjAISnlHGb+hJmPX0p0Niuj0TH4cDEz/0hEC5xzzQCOXR18OE8ZXTXrVWKeP4F2BspqGDK+Qe+IV9dYPgXVovK053n7Czb3eFto3Xxl9fJqUXk6Go3uK2C7vwmtnqWs/vxv6yYB2WdK5KCshnX5CXrTkUZlNRonTP0VRTFNVj8ejQVlTZeyGveT3U2+gXGZFRlr/cK3pCqU0SgjmS4WESzTozEQKWU0Royq8g0cZVZEzvl11looq6ELcmNjBGU1XHbd2Qlc9g7yE1jKiBBKiIyBmax5xgAZV0v5BpctdCVO+V/MN0DmPssAwBkNRRpL0HjwVNOedgBYhJllymho0u+JaOuguDSz2SfvnM4beDQcv8VhfIjguRliUh8ARDgR6kPiyzdIvS4WeUGJ/iS/Q0nm4tEReoc3nI77Bj0iEmdm3MOzzWDk3qoEACFEolikBxEPPApjLyogIITIGwDoB9D23rwAtNYDJdK/A2grxQKBQC8RtWU1M1/T8Yxx/+H8A47I3NLKIAqPAAAAAElFTkSuQmCC";var button_about="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAAWCAYAAAAowQktAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA2MSURBVGiB7VlpeFXVuX7X3udkOMkJkkBMcnKSMAQwRpCaKjJIQal1pAyKeIt1gBa8tago2j5eImKh2nK1UgQRBUUFpFhERG0FREGmhCEhYMAAydn7nMzDmfbea7w/NFxQBNvH9l6fh/ffmr7v/Z53vWuvvTdRSuE8/v9D+78mcB7fDueF+p7gvFDfE5wX6nsC19kG629+6yNo4t6sdbccAgDj1jXJuq39HqBzstdPbP73UPznYdy0xufStOmQqi807BNMW+rbONZovGnNlYqQWwFSoAjZZofDCwu23Gl/dX3oprVTNEJiF64f+8a3zdkweu10CbIv++2xH3+XtZzVUZTT4TaVaSfbbUhgnPe24PKcNers2Zpxw8qfVI9e7/2OeP7DqL1x9UVSiErK2DgqRC1l/OcCdFftdases4XYanN+pcNZPWXsMS05ebdx65rkU9efuG5VARPs5xIJ6/6RvDZn+ZSybt9tNedwlMMpNrXvz5uKCTsB4OrPZzqU0j2U0rYm3PKN6058lJ/A3Ow9jbUOBLD/u6X87UCps6Cdxz4ZWz33kITMTCD67A+K5txMQObsilQvejTwClVKuXslZN71UuEDT6Od3Afg6c71TLAfTa55bs+RuFEQQujQt8np8/k8ACIA3jcx4Tut56xCUcHQxMInHfXDlN6ZozIHTK22Qu8AKK+4dkWKxp2HCciVCqpaZ3LeRR//IrSZHXZfofWBVPLJqpEvNYNg28Wb7llaMWJprqZp9xOoHgrkuEtqf+635c4TnfEPjlp6EVHkV1Ck38Wb7r56x+A1yWnJ4RkAhoHgcyHUvP5bJhud8w+PWnaNEHI8IfAqQjYXDwssQ2mpBACb0yGzAis0CdkXwD6qxKI5gdUHH80Zh1LjjalKqc0AUEMbp33Yvn/HVd7iYfhSqM+uebHPQSs45t4Lr+9fnJQXrhy26NlLPpnW1pn3sxHLCwQR0whRBSDaLo/Qni/YcqfNOfdOzbl+0g9Teh8B8HonRyXFOICkKkX+fvGWu1dAQe0YvCa5iycyDUpeoZTWpDS5pPjDyRXfpMVZjz6HU0gpT7Z/2/2G8GVJvS6cmDE8BgDcjr7jcH4P5U6lw9mwOJG7dw1akPZ6cFu6wynaWExzhGPbnLIDwxb24ZJVUuZc7AhaTrkzNC6tqvIRS/oBQNlViy+nlO12OL3aEU45ACS6m9c5nP6CcqfSYfRKLtnu7UNf9gLAvuGLHrOovZ4KGnEEraLMmbV3c+abAEAIcTHBklKJZ7Fpmv1M05wohMhvYG1+h1PYkl5lmuY1pmleA2BYddy4opV25ADA3uGLR8YZr2Cc9ezhzlzsCDqcadi/Y/BL6QCwb8QLJXFpVTiCDrAYP+gwZ0KrtHdXXPvHlIaGhobRaZfXZesZ/i85PmJR+x2bU25z9rnDnVl7hz9/4/ahL3sT3U17LeZMsgUtdzhNoIzt2Tvi+Z98kxZndxRnoEKcbK9sLUsdk3o5KpzqLvyqBUVKqBFPNby1YFf8SH6a2/O3Zbm/nkpcGANYH1HOMK9hDa20a20ALWvzH3kqLqxdk+qe3QvgIqXU2jcLHpY69McB3MaFM40p2Xpb7R/XA/C8OZT21RX58dyGNS+UxWvyvXryO8vzpt/nAh29Y/AzWwjRH9/YUfaHl9s3pyulEoelFD1wf7ebXt095M8js7KyGihnmJg+bGUn9/r6+sbb+o76gHJ2h2ma2zr7TdPc/kjxfxhtNNoFABin84O87f2HjGW1AHq5iOv51fkz7tNAHwUw06HOwiYe3jHVWHQUQHay5n78tbwH5zmxxBndu3d/ZnGPe3t31b2JuwYtSFO6enxDR9mKZW2bUgFEL3B5RlfVHq3aOeS50hgTninGwg0RYRURQnauznsooBPtOQB9zqTFuR0FdrJdH23zOJzCtJpTLcfu2UojbLd1dBwhpD7CrbEVseNajFo9qaMph1MQhQylVJZSyhtl8UEhu3XUE90nTHnqwkmDZ3W/pTRgN5ZYzC4BgEanY+DG9jIfgDFKKTPmxHp20Jgst45dTQgJRaV91/7YMWVx1o8y2d9iDnm5bfNkAC1KKfZJ7NCrhtMcijNnsK7rXodTpEvPaTc5IhFzOP16oVI6Fndc5SVL3Dan/Rc3f9C5s+u54s9uaN/jciQbXF6yxG0xp+SZpvUjAXgACEuyVZ9GP4tQ7gwjhKQ00Q5fB40mtKvoAIs5ia+1b/0xgCYA/nYeX+f3+5ODTst1fwvv80WE5SOE1Cil7n0ouHycw2nhRyXzz3gROcetj0GccvQBDihn4Bwoj31eaHHbLaUcZZrmfYSQQXHueKpts7Ca1dEwi2GSd/g20zRvM01zpek0p8a5bfq1jJmZ8M7xk4z734/sb/9reMdBAGik7fkRYR83TbMwGAzO2xypvMwRVEtKSioxTfPXuq6PCPN4uuk0+9aGt+dywbWRnqLxhmH8NhgMziCETLC43Ssiohmd3Bljp9UjpATlp/cBgFASTDCMa57brZVGtOFJ/ZabpjndNM1ZUsrBUsmSMI1njml8snsHi2lXJBUuNE3zni/rHq4JNSRGrRwAYIJDSI7nmjcO4YKT6V1vHm+a5kzTNH/m8XiKA4GAVWXVFfXQu9eYpnm7YRhzAAxK05KzKGewBUs9kxbnOPookpQ7bWPx7CwAUILolFNwCNTztuxcLV2EQl/ciAzDaHmuaFokLGMXEEJUpVWLYrf/9ncHzD6g3Fi/KVbpvtlTkv2H1rfvqqJGW6E7K21q2qiuO6wjFwGAxZ3EdOI52Jm7RURyuGCipqamAwDq6upqni6aHGti7RnrY2XeS9x58QmeIY++94N5hxBJDb+QPuVyAKTWbsrt5E6+sg2lFKBncJSQHIxzUEoHbI0d5KOS+t+8YcDsJeUV2P/igKl9uBRahMdThBCX74pX20MT+43acOnvfNmu7o0vZEzpp6BIhMW9AMAFBwVFhX0sp9ZpaOqjd/vvD0rmTkhsYW3PeCdNerDv+E1lzjHvzC6jPe9eOvvulK54dWn6tOwmdGiUU+jfYJ1zXM8ZLtXy59uKzQeA3om+axzOwDkHI1JzyOm70xEcjmKax+PpeCWyVTzgvb45U+vyCmFYucmqbMzGBfFfekYNhUdJAui1tOXTt2N75v8JABWMuJWrtTMWl0JzvuIIJqQCuE4lb1rQ/l7k8bTxXcBZAxJjUklV18jDiIEmdHLXyOl/BgQknDM4igkJR2NQSrWsi+9xXebq8XEKSSq/pAiMMVg1vJFm6Km6pmntq2KfagP1HgdcGqutZXVxpZQrJNuUhySSL2Jx2IpDAu0Lwx/U/VfqON3hLBhLgYAgZgl6HVjNdjg7Y9V/uiyx5zNOIxYDzN0kwvWpeiI0Kb7GDwDI2X5zXOLvowr0zJ+VJOVVAsCH7Eh7Ow3XKshCoTDERfTfVQaqczvnF+UWluvQ/lJpVM/z+XxbAXRJgF46JfHanc/T96YrpSb1dGX89D+TryOv2FszK1hgBSHkQcMwXrk4tzCQQFyP7AscfgMA+vh6PpxM3BMPGNU/+N/4vY8magnPNoqO1QAOA1g+q8v4JVEaT3vWev9BD0m4PY0kTg6pcFVXkrJ1VpfbvbccLD1poZ65BY91IZ4b9wUODTq1zr65vT5MQdJ+LSv5N6FQqByAOdY75N6B7MKMuc4710ngiW6ad34dbSrVdf2QUmrjg57RpVzF+y+3t912e/KQe9JI0uG5HetGpiekhYqQ3XcPOZEkpSwHMOOx1NEbArTZv4Lu8AXMwBs+n28ZgCu6wTtmhucGzyLr7wMM1bo0U0vbPr/3hKt/tKWUf1WLszqqVcbQKo+/tpcd/0JVQgYqpSCl5JqmOVA4LWCHijOllAUAuq5PFEK8SiH+utDZ+LTH4ym1LCvjGG/ZMyPyWhyAmxAy3zTNVwGgXcUFFOKdsaLKZjE49PT4liDSjpmm2ezz+UYDeP2Jjr/cB0AHUBZVdltU2TFCCFplVJ0qEgA4ivEmhL/2qSiqbB6FHTXLqpjf7x8npVz5VmT70bcADsAA8LkpWqP19fUxn8/300Tifm2B9e4JDUQfqOd3+FU6PuKHdgJARFnYxqrDjY2NR3w+3x0AFj0Zffv3AJIArC8sLFxr2/b0pKSkpc2IfPab+Ko4AAqgrF52WGcSCTiHo3w+X79T2x6P53g8Hu+RnZ1dU1tbm5ScnJxZV1dX0zmek5OT73a7w7W1tSdfDv1+f7JSymMYRgsA5ObmZiil+mmadjgQCJw86vLy8nrZtt3Q2NgYBYD8/PyujLG0YDBY2zknKyurR0pKSmvnc4sQovl8vkuUUnYwGDzi9/t7WpbVmJqayhhjeYZhHDmVv9/vT5dSppqmWXdqf25ubq5SyjZNs/mUvj4APKZpHvT5fFmnjr+Y/6u5gJypAAEQslEe0HeLY3eEQqFVOTk5hcFg8KhSSgBAcXFxQktLywCXyxUMBALmqXkLCgqyOef5SqkKAB5CSJJhGAbOgLMKdR5nxi/zru/VX2ZnVonQBRu1qrEMfGxCQkKv48ePt/+rcp4X6p+Az+erBuDDF+9SJwghYwzDOPCvzHnWZ9R5nBmapt0gpcySUhqhUOjEvyPneUd9T/A/IErEM0eDUZgAAAAASUVORK5CYII=";var button_close="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHRSURBVDiN7ZRBaxNBFMd/O5vYLRIiVi+bDZXFY4+FlV5rG/0A5lIQPHnprV5L8FrsB8jJU7HEL+C2ei2m5+YmIWYJtFTBYtJuZnd2PDQRCp1CkAiCA+/w3pv/jz+PN2NprZnGEVOh/gf/FXDupuaXlZ1HQujXZDNVf//ZGUB75X0RMWxkmVV7uL/22aS1TOt2tPx2SVj6A1DAoumQVgBiciGaAPiZaevJwqcXBxM5VkpuplAYpYHUhJdWkmBUK1iwCTy9Tm+c8XpU324NOkqmEplKpJKBVDIY561BR61H9W2T3ghuxycbteNdu3XeZZgmV6J13qV2vGu345ONicFSyqqNOExUwm/Xo0hUgo04lFJWTXrjjN/NvxIXSSxsSzBMkys9z5rjzd3nYjbvGI0Zwf243wAW1SjvpKcAPMjdH19Z7Kt+A6hMBO4mp1t3uL08Y+Xtr+ob9YuPALycfcy8fY+hTtQPBlsmvXGPS6VSWBZzq6v5BXbkAbFOmgCOlQ/Wbi2xlxwRZd/3er3etY6N4HK5HGRZFgJFoOk4zuUDieMQCIAzIUQliqLmtQCttTE8zwtc1w193y+Oa77vF13XDT3PC27SGh3/6fn3vs2pgX8Bg8wBdrm0KpsAAAAASUVORK5CYII=";var button_debug="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKlSURBVDiN3ZVNSJRRFIbf8818zfiXQoamJWpYtAkqIguCQvvZmZQg1KJy0WZwES0swpAstCBcRSpYgYXmQjFcJFiaGi20onSjjDTTzICOpqPOz3fvnXtblGLOqEPgprO6cN/34dz3wLmklMJmlLYp1P8bPFXUfhFVVTHrKZbhTRd1JgVF0KcrLe1nInxJfnVekczK6ip9AIWoAPN6wPFTL3O50KesOk9XJGmKBVRKOKGYQTWDcA8KCgSKBl8XLGTQBlPw5MiCx5Ydn46FsL/UGtYKCZrGJL8xWvCUtEJp7ENZ9WrvupldtT9uDPCQc5dle29IMCRr8dVchIuY4IBEHA+zWyHOHdG8a4KHjtflputJt22Ohryp0NwbhCW4YMlMMDDB0D8/yp55e9ov2Gtzo/kjh0eg/vxHNVC4jj9RBSVDnLZlWbIgg2ia7cG3kEOmmpNtg9+L6qHuyHXBbw/VXFaEm61zA1e2mPWdxYlHmgHoKzVMCZhhkhrR7xcrlBYMV7Su1EQMb14aHZXTLQdn5HxfSeJRsyH48p2hOIaNCeRb89C6+KEyx5rWNbro8bU5uh0KFX9xIjK2eRvPzcj5M0SUc8CU/Wop04AIgcIKr/1D+BSwhw/rOXefz737PMhHJjIyMkpWcyLAFoulnYiOuVwu1wv/APsYGkd34CtqfB0wBMc2Suhs8vcqSLSd1fefYIxtdbvdras5EVHY7Xbf0nmEO/2j4gcAIIXiuSEMPU/bUTcmJ8X9xY69nPNhr9e7uJoRteOVRUQNAFpSVNyTcvNp1wAbQ5f4MktElwD0WSyW9DW9seyKht3XkieNhbJ69f6hZtL2OJ1O+0aemMCZmZmpAPoB9LjdbtuGBsS4Nq1WKyeiWo/HUx6LHoix43+pTftBfgH9ckVzZr7+0wAAAABJRU5ErkJggg==";var button_download="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEgSURBVDiN7dSxSwMxFMfxb0qloxQ65RwdBIUb3ATFwg110E1RsP+IyyWL/0gFRTcd7HBQUXBzOFBwcPS2QnEsis+lhVauSYucIPgg0yOf/MgLUSJCEVUqRP2HfwUuT2q8bp8bhYpdmwWxC1d7Jq+nXM/tZevEKCEXF4VdvD7MRZ1wEAQGiJu1Os1afazX6nZodTsANsuy2RMP8YPqBvvVdQDOenec9m6dqBcexXfn1wC4eLv3ok44WT02eIYHYqOHo9wDnIkvQ2uUyIThKbuTxrmoEx5eQaMS0qiEY712P6XdT+Gnw4vmVojKywAkH08k749O1AuP4pulJQBuPp+9KAAi4l1aa6O1lsEy0+zxJv6WHG/SQU0Nz1p/79ssDP4Cg+q5/b71LOIAAAAASUVORK5CYII=";var button_fullscreen="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFESURBVDiN7ZS9SgNBFEbPJCKSxtpVsA3RJ7C0Dyk0laKtb2BSGdIkNr5BirQqCFoqgqUotgpiZ4Iign/Z3cnsOhZmdaM7hEVWEPxgqsM93Jk7XKG1JomkErH+i39FPGQCrfyWBtCC8sRusR5m1/nNikCsAYzvFUUssaskAEJ/r3O9LmLALzWKmzcHAEyNTM45s41smJ11rnKXsg1AlcV44sbdPgA1a8l3lFwOs3v1fBTwatyOgXWAx+5LwU27fcBWdibgppiH12qVADamV/LBe39EYwc8tjiI9BXOF7Hy1KAyhGkJbWfLdYBzv1140k7f8EZTmZNsauwQYP6iFtm5sWPHk6sAt97D8Y467WMLwzO2k37nQExx7/pSqzTQDLOOL3POq4wq+4zWOvJYlqV7pxTBKgE31Se2K4zD+2n+3tpMTPwGJ7yv1xBxhTcAAAAASUVORK5CYII=";var button_higher_quality="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAG+SURBVDiN7ZRNSFRhFIafMz96p6RFUODMlXCZRBhJJLTJjSBBgTSbIQoqqFWbgoSBNkK4cycIRi6shVuDBFdF0SKK/hY1iZJzFUIhzWnuN/fe77TIwBK7MjBB0Ls8h/Ocl8PhFVWlEUo0hPof/FfAqS2V/GRyoWLvgDxse5C/Xy9Yfnm3/GTy46o/DloAIoGCqMxa0VMoZRKJF2D71fI5s54ZdZ+ere7I8ZuVLwOodi2H62uOpCstyeYiIs9RLoCsgO4GHADfMT0unN6RYxFJZrPZcaAAREDhduu5zoOZtpsAJbM4VDJLnX17jvYCteZd1b2Hp69XYh3ncrkBVe0C3m8sKr7+Nve1PbUfgOLixDXA6ckcAmgya6luYCYWXC6XB4HBzbVbHefv+YHpBjjTcmwCUesH5rICr2rzcye2OcXWr/hNQRTgBwaAk00dFwH8wPApXGZ4dar9BszWBQ43wCERb8OFkQOJfcefBB+OPKuVNJ1Ov9tuLhZciyKqGEIsd6uPrm5qvfTmvaW6wUEU4tsfYOCSiPRbax9ba8f+NCdxeey67hVVHQGM53lOnJGfalhWxDquV/9ebDYM/B1CM7lrgVPaxwAAAABJRU5ErkJggg==";var button_minimize="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABmSURBVDiNY/z//z8DLQATTUwdNXjU4FGDB8hgFlwSBxwbOYgxwGF//Q+SDP71kfU7MQYzMDAwkmbwn19Emosd4DT455/fFBnMiKs8lpaWJqqgfvr0KdagoFmqwOliSsHQyyA0MxgAF2sZ8VNoIFcAAAAASUVORK5CYII=";var button_muted="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKXSURBVDiN5ZRPSJNhHMe/z96981+SE9famIhWFHV0KQX592BU0qUsiFCQPFQUdOrQZR2yEgwpwszsUnRYFiIpHSQlqKC8CGWF4sS9a7o5dbq97/M+756ng5dcIxcoBH3he/rB5/fly48fEUJgM2TaFOr/B/YQj+lN2a2GDQdXuDO7DMGbvQ1eKXlmThcyffiFwywnegHoXPCLc8uR4QkWXPCEvFHlk0IE1l5XWokn654cNBAf1Rg9oOkUE3PT9ePLPtqxMFDiztnRJYQw0ko8VtldTEw8Y3WzqRaEtAOwAMB0fLYswpZ2XZ17uu2Idf/QZdux4wAeJDNSJtY5HaQGG6cGG1cNek9lmkVlGqLaClRGM66FnhkC4vHI0pg7ZqjVo+6u7LTAMT0ua4ziV8d1DREaRWu4F0dz3TnPi660r3CtNaCGjbgc35MWOEAjrt/ACQ1tkT4UyTZWn1U6FdONuMVieRhjas6kFuDJjJQda0yHyunqZmKCLJtxZ74fNpKLKss+rWW2My8Bnt1tb1SjTPC7i4NbmnB7fXBHdMBvAimxmbfifH4d7s+/gkkQnMgsR8CIiAR4GEB8WeXnPrLJlRkjFE6rihCPMoNwNFtrcT3sxWd9BjXSXuhMh24wOByOiptZp2tURi8N0c+CMeZPZpBUb/PMzrrSRmult22+L/iF+q0ACrJgKTgllcNCzIvORF45JN7zyHj7fgaRbEVRLqwLHq72mHks80Nn5PXCO+37dkmSKiilVkmSBgDsJoSM+P3+KpfL1SSEuAGgWlGUb2klri0ua/2qKydlWT7k8/l+AEBhYWE+5/wlIUQAaBFC9CQSibPBYHAqVZ0QQqwxALPT6ey32+3FybO/ccrEG6F/89H/ST8BJ/eSBJQag0AAAAAASUVORK5CYII=";var button_pause="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVDiN7ZS7SgQxAEVPZt1hFGTBZsHKasHGclu/wG7Bz/BTxF+wU+z8Aq1kShELKytht/AxmskkmZlY6IzxMUWELRY23b25HA4pIpxzzONEc6EuwYsNXum6eNg7O3K4/SavVmYEoHrxXdMJxMnm+eQgCPym8wEwbLK1dQRg+tXQmw2Cja+ebsc7a1ttPn68WAeYbOy23XV+Px6FgmWpYmlUm4sqigD8TpYqDjZWViOFB6b4gGn1bRMM1taQo371uWesrQkHF6VG1v5TfBr3vK7+h3FmczMTz22W/bIGmJmvLnN5p3In+LRKU2C7yXEUvwJcljf+LD0MBQMvwLS1y7IaIEmS6Y/Nn0csP/rFBb8Dxfx0WKljgVAAAAAASUVORK5CYII=";var button_play="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFKSURBVDiN7dW9SgNBEAfw/wRB0ScQ8gTWSqyEVDZprfISlulMH7ARG9EupBIUQcwDSDTGgB+IBEUMbHJFRGKR292b21sLI0pgIxeNVQamGva3wy47S9ZajCMSY1En8L/AU65CK7O/RoQFopnC/FHGjws7O1ZGzklWeT/oNp5Wi1kQ6E/g487lkgo0VKCTknXxLr13dp/eXf41LEM5LVnhW6Z6oa7UV7aL1fRWcmSYDUOxHkySgc6y5MZpanOjvrgz61rvvDw2Boq1q0wAoUues2MnrA1DDsAWQE0/4tC/wGvUAwC0sBGz45ChEl9w07zgQNXwbDqfewwNJxz2j+LN+ijzDa5ME/YDLBFRTgghRoJ7kdIn+hqV6AEMAwBVIloXQpz/1O1QuBzd1vqzWlhrc57nlWyM4e2EAfQA5AEU2u127CdNkx9k7PA7Y1e8lCIaYdsAAAAASUVORK5CYII=";var button_stop="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAAAAADFHGIkAAAAAXNCSVQI5gpbmQAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAG2SURBVBgZbcE/jAxRHAfw73vvN7Nv9p+9dRuLk9iIE1dRcAkFURDZamn0JHSiUepEoaVQX6tViCsoNHeJxhXHkTiy4XKx3JnZnZn33u+ZXZfT3OcjHmFvtCqJwiAMSMI7a/LcGMvsQZLCUhTpsDGl0s1Rmo5G8OzZUxDoSqXZ7i8tD2bnj5XXScA5x16d09V6J7n3pXbiVGlt4fMV4Rw7x54iXZ1ZWLrWndPKbr9YvPWgbW1uwOpy5eDL5Zu3z+6vVeutk0eGz7psjLWsuvX8ae9uR2Is6pQ/Ll6N89xYqcsP52/MYIe6dDFeqYUkQfr3cPYM8OQTChd6+vrbV3cCCVD4rXZYAM/fYKyHufZ7Q0p4WR7Uj4f4L5ySWsAzxYnKfijkmIgTYWWapMbS/ap6nQkMMPFhxfTzx38AEBB/bQo/xMTm6tZPMigQvEs29vlGKwBw1MT9QZSiQBhV1rVVp89XUXj3fWMrYhREC6FvHNLKAxDeJGuloUeBPLLyr/xAwAJeuqwfpIwxMQ2gJEQzkGAeblPmMCGmUZAlCM9CgDPsIIzxCEoJy4xdJPAPMwCBXdTB3v4CXaW5Fw2FHHQAAAAASUVORK5CYII=";var button_toggle_plugin="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEjSURBVDiNY/z//z8DLQATTUwdNZguBrNgE3wQuEGA9c/v91h1MP6zlN4UfoIsgxk+fGD4wY5d6j8TIyEzGRgYcATFnI9H+H/8/smADS9/vl+HGIOxO4vhO8P3Xz+xyqiwSmiftp3mAeN/ZXm9x2F//R+iDP7xg4HhB9sPrAbLMgkV/Pz9owAu8IVfkIGB4QORLv7B8OM3dhejg3vfHrA4YBHHavDZvw+/Xnr7FM6XZhFiCOIyw2rwJeY33AwMDG+IMvjBr7d/fv3+Bef//P8btw9+Yg8y7AY/ePBFUlLSE8YXY+AJ+PH7Zzo2tdiNxWHw/////zAwMOyA8VPlvTS+43Dxd2YSDEYHO/5dvrDt30WscmxMbB+xidOsrGAcrUFobjAA4JR2HtFlEWEAAAAASUVORK5CYII=";var button_unmuted="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIUSURBVDiN7ZRNaBNBGIbfnd3UpLEQsGgySxJzsUVPIqUtKKIiaI/+BMVevHjpwZPFs14EwVMEFTwYIVB6kICCPRREEATrQcQSJZYi3fyoRZPY7M7u/HgQROKI6yGC4Affad555uXl+8ZQSqEfRfpC/Q/+K2ArrNA5dm8LAj4HYFgSMUWU+VhKNZO+n1/Q6UM5rk4Vd3vd7pIXsENuwJAun6q5gTfDOCtVjxYnQztePnwrIzgGAcAkZBIK1xWMGAC88z+MHsxkqBCicMk+c3d8844CgD29DEO3IEv7Co8AY7/u0TV/nW0zh+jx1atjA8QqzedmYzIQufGn55s/6rRRdPzuJi9g0DXjDELKxbntFz75kl98vbEmmQp29TK04BWvMfprsI8vvttyA7cbj8eLLmexl+5qtJehzdjjAVzFdEfwRIBzH28mAsljd7ZOW59lRN7oPInOhAHfbi9WAEwAwBCJYTq6FwkyCADwpQ8BuU4I6bQD63SFO+03vFYLFcV71WZN2UJTtlDlDVzbeIAV1vweRSqVOnIlmt/Z9dnlh+4LUwjxtpehnQrbtjPAt3EjhCSllMUBWOmT5hgSRpwNG9EclFWeF88WlpUz4jhO/ieIUuq3nc1mU5TS55RSRSmtKKVg2/YJSmnDtu0J3R2tY10lk8m4aZolACORSOQA57wshDhbr9df6fShwX9a/9632TfwV7TMPVNYMSByAAAAAElFTkSuQmCC";var button_update="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKHSURBVDiN1ZXbS1RRFMa/dc5MjowU4yVmHCWZyezBjHLMILCwnoUIjcAeJKIbdAF98B+oIOihl8igoCIjw6DCBymhzBeZKRinMuyiOGfyklYzzeXss8/ePeSI2KiD4EML1sv37e/HYrFgk5QSa1HKmlD/S7BlpQdTDd1HpUKFEJITkSEgkiCKQyhxcMPv7GmcXhVYNzmHKa9msN5TnuJbKrfiKmrfnreMJiZGGGdY2L0zgZ6a/rN5qwYTEW8bvV3+20hC58Z8b8/1XOj0tnmXzGW640Bdh0tVxBMh5LGdr04F3W73iyP5dfXNBXsxGB9BviUPm3NcADBjkWJH5cvT41lNbArWrnPDxwXvnpPOdP0Y0F9HP+DKxGO0h+/ia3JS6NwoiJvmoaxXkeDJfYwbCKdmBgBA07RhLs2LlyYfISH0ZwmhB/qiQYVxAzEj0ZA92EiVM85wc7b3QFpzOByXATy12WzNNptt/yc9Ms44A+d8dyZGxnPT9FnTbcmHR90YTGuhUIgBmJ+uteJwQOdG6TfzJ8t64hE9ojLOsGfdlrKupiZ1sd/hO2H1Wcq2Mc7wLjVmyxr8PBX8GDOSUE1lqxjy3Ltf1e5Ie50VrYUbYo4HZJL3l5FAXyo0nImR8dyKi4uv11q9Jw9aa0B/pQSAACAJoGoAuRISXWwQb8zRa5qmncsK7HQ6PaqqBj1UZG9Ud8XtlGNf6MdkKv7QHLSPye9RAJWapv1zxxnBc1MfJ6IbCoicWJ8qo6JxAPRFTpdOIZojIAURtYTD4TtZryJdJSUl9VLKWwA2LbI+SylbIpFI/1LZZcEA4PP5rJFIpApANQAQkd/lcg35/X5judyK4NXWmv0gfwDbFT1AjIcyUgAAAABJRU5ErkJggg==";var header_background="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAYCAAAAAAaUhg7AAAAAXNCSVQI5gpbmQAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAmSURBVAjXY2xjYGC5CMR/gfgfFP/FTzOKMjAwMaBilv9YxOQYGACA4w25ovZkiQAAAABJRU5ErkJggg==";var slider_knob="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAUCAQAAADBqR7CAAAAAnNCSVQICFXsRgQAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAABrklEQVQoz22RMUsbARiGv7vL9Y5y9ojcUOkQoxBjGo7kBhHEonTo0BZBkbT9BVLqT2g3u7jYFJQgEqvg5CAUsYVmCKlDKDgVrYs4mErjJCTFFK9Ph5DrhZZne9+Hb3g/QRAEDZNeYiRJkyRGLyZau2sLEWyGmGKRXUrsssgUQ9hEOoqKTdbPXzXLLPGSJcpcNf08WWxURFAwSbYKR3hYJBglgYXHEa0CSUwUQcO5nq03B0iwT4MGDfZJMEC9eT2LgyboxC+LC0QpcxZQJsoCl0Xi6IJBql6ZYJKvXUwywY8KKQzBYLhWSZHjcxc5UtQqDGMIOrH62zlc3neRZo6LPDF0QcNpPV33bdbYDFjlFuv+rxwOqqBgce/gu8E8KwHPMTg4YxwLRRBM0t8+ZXgYuvIAj+OP3MXorNtz+OwFg+wE9DPP8QxWe11BkD2teHGDZUqUKPEGnY3anhJ+oyCnr0eYoUqVKo8Y4/RVpwmU8/i733184ZAqDpv++Z1/FMT7EOEJJ0wTwdv5m4eU7ON+VG6iEid7/78Kktm+jUYfma1w2qW4Ubfg/nRXXDuc/gE0j6y40AVJmAAAAABJRU5ErkJggg==";var css_data ="body div#top_content_boxdiv.dmpi_video_playerv4 div.linterna-magica,.linterna-magica{background-color:transparent!important;color:black!important;text-align:center!important;position:relative!important;clear:left!important;height:auto!important;z-index:99!important;min-height:212px!important;}.linterna-magica{border-bottom:1px solid #36393E!important;}.linterna-magica p{color:#ffffff!important}.linterna-magica-web-log-header a,.linterna-magica a{outline:0!important;}div.linterna-magica-controls-time-slider{height:12px!important;}.linterna-magica-toggle-plugin,.linterna-magica-remote-clip-buttons a{display:block!important;text-decoration:none!important;width:106px!important;height:24px!important;position:absolute!important;right:0px!important;background:url('"+button_about+"') 0 0 no-repeat!important;line-height:3000px!important;overflow:hidden!important;bottom:0px!important;}.linterna-magica-logo{display:block!important;text-decoration:none!important;width:106px!important;height:22px!important;line-height:3000px!important;overflow:hidden!important;background:url('"+button_about+"') 0 0 no-repeat!important;cursor:help!important;z-index:9999!important;float:right!important;}.linterna-magica-lower .linterna-magica-logo{width:24px!important;background:url('"+button_about_lower+"') 0 0 no-repeat!important;}.linterna-magica-remote-clip-buttons,.linterna-magica-toggle-plugin-wrapper{position:relative!important;z-index:999999!important;display:block!important;right:0px!important;width:100%!important;height:24px!important;background-color:transparent!important;clear:both!important;top:0px!important;}.linterna-magica-toggle-plugin-outer-frame{display:block!important;width:106px!important;height:24px!important;position:absolute!important;right:0!important;top:0!important;background-color:#666666!important;background-image:-webkit-gradient(linear,left top,left bottom,from(#666666),to(#1a1a1a))!important;background-image:-webkit-linear-gradient(top,#666666,#1a1a1a)!important;background-image:-moz-linear-gradient(top,#666666,#1a1a1a)!important;background-image:linear-gradient(to bottom,#666666,#1a1a1a)!important;border-color:#222222!important;border-width:1px 0!important;border-style:solid!important;-webkit-border-radius:6px 6px 0 0!important;-moz-border-radius:6px 6px 0 0!important;border-radius:6px 6px 0 0!important;}.linterna-magica-remote-clip-buttons a{float:right!important;right:0px!important;}a.linterna-magica-remote-clip-visit-page-button{background:#3e3e3e url('"+button_about+"') 0 0 no-repeat!important;border-left:none!important;-webkit-border-radius:0 6px 0 0!important;-moz-border-radius:0 6px 0 0!important;border-radius:0 6px 0 0!important;}a.linterna-magica-remote-clip-close-button{background:#3e3e3e url('"+button_close+"') 0 0 no-repeat!important;height:24px!important;width:24px!important;position:absolute!important;display:block!important;right:104px!important;border-right:none!important;-webkit-border-radius:6px 0 0 0!important;-moz-border-radius:6px 0 0 0!important;border-radius:6px 0 0 0!important;}body div#top_content_box div.dmpi_video_playerv4,div.linterna-magica-update-info-box,.linterna-magica-update-info-box,div.linterna-magica-about-box,.linterna-magica-about-box{background:#000000!important;font-size:12px!important;line-height:1.3em!important;padding-top:20px!important;font-family:'Liberation Sans','Arial',sans-serif!important;display:block!important;position:relative!important;z-index:999999!important;width:100%!important;padding-bottom:20px!important;}.linterna-magica-about-box{overflow:auto!important;}.linterna-magica-update-info-box p,.linterna-magica-about-box p{margin:1px 5%!important;padding-top:8px!important;color:#ffffff!important;text-align:center!important;font-weight:normal!important;}.linterna-magica-update-info-box object,.linterna-magica-about-box object{height:70px!important;margin-left:25%!important;position:relative!important;display:block!important;}.linterna-magica-update-info-box p a,.linterna-magica-about-box p a{color:#bbbbbb!important;text-decoration:underline!important;font-style:none!important;}.linterna-magica-update-info-box p a:hover,.linterna-magica-about-box p a:hover{text-decoration:none!important;}body div#top_content_box div.dmpi_video_playerv4div.linterna-magica-controls,.linterna-magica-controls{background-color:#666666!important;background-image:-webkit-gradient(linear,left top,left bottom,from(#666666),to(#1a1a1a))!important;background-image:-webkit-linear-gradient(top,#666666,#1a1a1a)!important;background-image:-moz-linear-gradient(top,#666666,#1a1a1a)!important;background-image:linear-gradient(to bottom,#666666,#1a1a1a)!important;border:none!important;color:black!important;height:22px!important;width:inherit!important;font-family:'Liberation Sans','Arial',sans-serif!important;font-size:10px!important;font-weight:normal!important;display:block!important;bottom:0px!important;position:relative!important;text-align:center!important;color:#e6e6e6!important;}a.linterna-magica-controls-buttons{display:block!important;float:left!important;height:22px!important;width:22px!important;position:relative!important;text-decoration:none!important;padding:0px!important;overflow:hidden!important;line-height:3000px!important;outline:none!important;}a.linterna-magica-controls-buttons-play{background:url('"+button_play+"') 0 0 no-repeat!important;margin-left:1px!important;}a.linterna-magica-controls-buttons-pause{background:url('"+button_pause+"') 0 0 no-repeat!important;margin-left:1px!important;}a.linterna-magica-controls-buttons-stop{background:url('"+button_stop+"') 0 0 no-repeat!important;width:24px!important;}a.linterna-magica-controls-buttons-mute{background:url('"+button_unmuted+"') 0 0 no-repeat!important;width:24px!important;}a.linterna-magica-controls-buttons-unmute{background:url('"+button_muted+"') 0 0 no-repeat!important;width:24px!important;}a.linterna-magica-controls-buttons-fullscreen{background:url('"+button_fullscreen+"') 0 0 no-repeat!important;width:26px!important;float:right!important;}body div#top_content_box div.dmpi_video_playerv4div.linterna-magica-controls-horizontal-slider,.linterna-magica-controls-horizontal-slider{line-height:10px!important;float:left!important;clear:none!important;height:10px!important;position:relative!important;color:#ffffff!important;width:100%!important;}.linterna-magica-controls-slider-knob{padding:0px!important;height:8px!important;width:8px!important;display:block!important;position:relative!important;top:-1px!important;background-color:#e84ead!important;background-image:-webkit-gradient(linear,left top,left bottom,from(#e84ead),to(#951b66))!important;background-image:-webkit-linear-gradient(top,#e84ead,#951b66)!important;background-image:-moz-linear-gradient(top,#e84ead,#951b66)!important;background-image:linear-gradient(to bottom,#e84ead,#951b66)!important;border-style:solid!important;border-width:2px!important;border-color:#e6e6e6!important;-webkit-border-radius:6px!important;-moz-border-radius:6px!important;border-radius:6px!important;z-index:9999!important;}.linterna-magica-video-download-link{background:url('"+button_download+"') 0 0 no-repeat!important;height:24px!important;width:24px!important;position:relative!important;text-decoration:none!important;padding:0px!important;overflow:hidden!important;line-height:3000px!important;outline:none!important;display:block!important;float:right!important;}.linterna-magica-toggle-plugin-header{background:url('"+button_toggle_plugin+"') 0 0 no-repeat!important;height:24px!important;width:24px!important;position:relative!important;text-decoration:none!important;padding:0px!important;overflow:hidden!important;line-height:3000px!important;outline:none!important;display:block!important;float:left!important;}.linterna-magica-toggle-plugin-header{position:relative!important;text-decoration:none!important;padding:0px!important;overflow:hidden!important;line-height:3000px!important;outline:none!important;display:block!important;float:right!important;}.linterna-magica-controls-slider-text{top:-20px!important;padding:1px!important;display:block!important;float:left!important;position:relative!important;font-size:11px!important;overflow:hidden!important;cursor:default!important;background-color:transparent!important;}.linterna-magica-controls-volume-slider{height:10px!important;width:80px!important;display:block!important;line-height:10px!important;}.linterna-magica-controls-time-slider-text{top:5px!important;color:#ffffff!important;margin-left:5px!important;}body.dm_page_html_videodiv#top_content_box div.dmpi_video_playerv4 divdiv.linterna-magica-hd-links-list,.linterna-magica-hd-links-list{width:350%!important;height:auto!important;bottom:35px!important;left:-270%!important;overflow-y:auto!important;overflow-x:hidden!important;background-color:#333333!important;border:solid #555555!important;border-width:1px 1px!important;position:absolute!important;font-size:13px!important;padding:0px 0!important;z-index:99999!important;}.linterna-magica-hd-links-list ul{padding:0!important;margin:0!important;list-style:none!important;}.linterna-magica-hd-links-list ul li{padding:0!important;margin:0!important;list-style:none!important;line-height:1.2em!important;}.linterna-magica-hd-links-list ul li a{padding:0!important;margin:0!important;color:#dddddd!important;padding:2px 5px!important;text-decoration:none!important;font-weight:bold!important;display:block!important;background:none!important;}.linterna-magica-hd-links-list ul li a:hover{background:#222222!important;color:#ffffff!important;}.linterna-magica-switch-hd{background:url('"+button_higher_quality+" ') 0 0 no-repeat!important;height:24px!important;width:24px!important;position:relative!important;text-decoration:none!important;padding:0px!important;overflow:hidden!important;line-height:3000px!important;outline:none!important;display:block!important;float:left!important;z-index:9999!important;}.linterna-magica-hd-wrapper{display:block!important;float:right!important;position:relative!important;width:24px!important;}#videoPlayer,div.sectionContent,section,#video-wAd,bleeding,multimedia{overflow:visible!important;top:0px!important;padding:5px!important}.linterna-magica-side-update-notifier-button-update-icon,.linterna-magica-update-notifier-link{background:url('"+button_update+"') 0 0 no-repeat!important;height:24px!important;width:24px!important;position:relative!important;text-decoration:none!important;padding:0px!important;overflow:hidden!important;line-height:3000px!important;outline:none!important;display:block!important;float:right!important;}.linterna-magica-side-update-notifier-button-update-icon{background:url('"+button_update+"') 0 0 no-repeat!important;left:-106px!important;}.linterna-magica-web-log-link{background:url('"+button_debug+"') 0 0 no-repeat!important;height:22px!important;width:22px!important;position:relative!important;text-decoration:none!important;padding:0px!important;overflow:hidden!important;line-height:3000px!important;outline:none!important;display:block!important;float:right!important;}div.linterna-magica-web-log,.linterna-magica-web-log{display:inline!important;border:1px solid #36393E!important;background-color:#000000!important;color:black!important;text-align:left!important;position:relative!important;clear:left!important;position:fixed!important;float:right!important;right:10px!important;bottom:28px!important;left:10px!important;right:10px!important;height:250px!important;z-index:10000000000000000!important;-webkit-border-radius:6px 6px 0 0!important;-moz-border-radius:6px 6px 0 0!important;border-radius:6px 6px 0 0!important;}.linterna-magica-web-log p{color:#ffffff!important;margin:0.5em 0!important;}.linterna-magica-web-log-header{text-align:left!important;line-height:10px!important;color:#333333!important;background-color:#666666!important;background-image:-webkit-gradient(linear,left top,left bottom,from(#666666),to(#1a1a1a))!important;background-image:-webkit-linear-gradient(top,#666666,#1a1a1a)!important;background-image:-moz-linear-gradient(top,#666666,#1a1a1a)!important;background-image:linear-gradient(to bottom,#666666,#1a1a1a)!important;height:24px!important;line-height:24px!important;border:solid #666666!important;border-width:1px 0px!important;position:relative!important;overflow:visible!important;vertical-align:middle!important;-webkit-border-radius:6px 6px 0 0!important;-moz-border-radius:6px 6px 0 0!important;border-radius:6px 6px 0 0!important;}.linterna-magica-web-log-header p{font-size:12px!important;position:relative!important;line-height:24px!important;padding:0!important;margin:0!important;letter-spacing:normal!important;font-family:'Liberation Sans','Arial',sans-serif!important;text-indent:5px!important;}.linterna-magica-web-log-header a{display:block!important;margin:0!important;top:0!important;position:relative!important;padding:0!important;color:#ffffff!important;width:24px!important;height:24px!important;text-decoration:none!important;overflow:hidden!important;line-height:3000px!important;}.linterna-magica-web-log-right-buttons{float:right!important;right:0!important;}.linterna-magica-web-log-left-buttons{float:left!important;left:0!important;}.linterna-magica-web-log-header a.linterna-magica-web-log-close{background:url('"+button_close+"') 0 0 no-repeat!important;}.linterna-magica-web-log-header a.linterna-magica-web-log-collapse{background:url('"+button_minimize+"') 0 0 no-repeat!important;}.linterna-magica-web-log-messages{height:85%!important;overflow:auto!important;padding:5px 15px!important;line-height:1.35em!important;}.linterna-magica-log-to-web-message span{display:block!important;}.linterna-magica-log-to-web-message{border-bottom:1px solid rgb(152,152,152)!important;border-left:1px solid rgb(152,152,152)!important;padding-left:3px!important;padding-bottom:3px!important;}.linterna-magica-side-update-notifier-button-wrap,.linterna-magica-web-log-debug-button-wrap{position:fixed!important;left:20px!important;bottom:0px!important;line-height:10000px!important;width:154px!important;height:22px!important;padding:0!important;margin:0!important;border:1px solid #36393E!important;z-index:10000000000000000!important;background-color:#666666!important;background-image:-webkit-gradient(linear,left top,left bottom,from(#666666),to(#1a1a1a))!important;background-image:-webkit-linear-gradient(top,#666666,#1a1a1a)!important;background-image:-moz-linear-gradient(top,#666666,#1a1a1a)!important;background-image:linear-gradient(to bottom,#666666,#1a1a1a)!important;border-color:#222222!important;border-width:1px 0!important;border-style:solid!important;-webkit-border-radius:6px 6px 0 0!important;-moz-border-radius:6px 6px 0 0!important;border-radius:6px 6px 0 0!important;}.linterna-magica-side-update-notifier-button-wrap{left:185px!important;}p.linterna-magica-side-update-notifier-button-wrap:hover,p.linterna-magica-web-log-debug-button-wrap:hover{bottom:0px!important;}.linterna-magica-web-log-debug-button-wrap a:hover{text-decoration:none!important;padding:0!important;margin:0!important;color:black!important;}.linterna-magica-side-update-notifier-button,.linterna-magica-web-log-debug-button{background:transparent url('"+button_about+"') 0 0 no-repeat!important;height:22px!important;width:106px!important;display:block!important;border:none!important;left:24px!important;position:relative!important}.linterna-magica-side-update-notifier-button-close,.linterna-magica-web-log-debug-button-close{background:transparent url('"+button_close+"') 0 0 no-repeat!important;width:24px!important;height:24px!important;position:relative!important;left:130px!important;display:block!important;overflow:hidden!important;border:none!important;top:-22px!important;}.linterna-magica-web-log-debug-button-bug{background:transparent url('"+button_debug+"') 0 0 no-repeat!important;height:24px!important;width:24px!important;display:block!important;position:relative!important;overflow:hidden!important;border:none!important;left:-24px!important;}.linterna-magica-video-object-wrapper,.linterna-magica-video-object,.linterna-magica-video-object p{display:block!important;position:relative!important;background-color:black!important;}.linterna-magica-update-info-box,.linterna-magica-about-box,.linterna-magica-video-object-wrapper{border-top:1px solid #36393E!important;border-right:1px solid #36393E!important;}.linterna-magica-controls-time-slider,.linterna-magica-controls{border-right:1px solid #36393E!important;}.linterna-magica-controls-time-slider-outer-frame{height:10px!important;background-color:#1a1a1a!important;background-image:-webkit-gradient(linear,left top,left bottom,from(#1a1a1a),to(#666666))!important;background-image:-webkit-linear-gradient(top,#1a1a1a,#666666)!important;background-image:-moz-linear-gradient(top,#1a1a1a,#666666)!important;background-image:linear-gradient(to bottom,#1a1a1a,#666666)!important;border-color:#222222!important;border-width:1px 0!important;border-style:solid!important;position:relative!important;}.linterna-magica-controls-volume-slider-outer-frame{display:block!important;float:left!important;width:80px!important;height:10px!important;background-color:#1a1a1a!important;background-image:-webkit-gradient(linear,left top,left bottom,from(#1a1a1a),to(#666666))!important;background-image:-webkit-linear-gradient(top,#1a1a1a,#666666)!important;background-image:-moz-linear-gradient(top,#1a1a1a,#666666)!important;background-image:linear-gradient(to bottom,#1a1a1a,#666666)!important;border-color:#3E3E3E!important;border-width:0px 1px!important;border-style:solid!important;position:relative!important;-webkit-border-radius:5px!important;-moz-border-radius:5px!important;border-radius:5px!important;margin-top:6px!important;}.linterna-magica-controls-volume-slider-outer-frame .linterna-magica-controls-horizontal-slider-progress-bar{-webkit-border-radius:2px!important;-moz-border-radius:2px!important;border-radius:2px!important;top:4px!important;}.linterna-magica-controls-horizontal-slider-progress-bar{background-color:#e84ead!important;background-image:-webkit-gradient(linear,left top,left bottom,from(#e84ead),to(#951b66))!important;background-image:-webkit-linear-gradient(top,#e84ead,#951b66)!important;background-image:-moz-linear-gradient(top,#e84ead,#951b66)!important;background-image:linear-gradient(to bottom,#e84ead,#951b66)!important;width:0!important;height:4px!important;position:absolute!important;display:block!important;top:3px!important;}.linterna-magica-lower{}.linterna-magica-ws-video-parent{background-color:transparent!important;}";
    style.type= "text/css";
    style.textContent=css_data;
    head.appendChild(style);
}
LinternaMagica.prototype.check_flash_plugin = function()
{
    var is_installed = false;
    var nav = window.navigator;
    if (nav && nav.mimeTypes &&
	nav.mimeTypes.length > 0 &&
	nav.plugins &&
	nav.plugins.length > 0)
    {
	if (nav.mimeTypes["application/x-shockwave-flash"] &&
	    nav.plugins["Shockwave Flash"])
	{
	    is_installed = true;
	}
    }
    if (is_installed)
    {
	var flash_plugin = nav.plugins["Shockwave Flash"].filename;
	var plugin_name = /gnash/i.test(flash_plugin) ? "Gnash" :
	    /lightspark/i.test(flash_plugin) ? "Lightspark" :
	    /totem-vegas/i.test(flash_plugin) ? "Totem Vegas" :
	    "a flash plugin";
	this.log("LinternaMagica.check_flash_plugin:\n"+
		 "Flash plugin ("+plugin_name+") detected. ",2);
    }
    this.plugin_is_installed = is_installed;
}
LinternaMagica.prototype.is_swf_object = function(element)
{
    if (!/HTML(embed|object|iframe)element/i.test(element))
    {
	return null;
    }
    var detected_via ="";
    var is_swf = false;
    var classid_string = ".*D27CDB6E-AE6D-11cf-96B8-444553540000.*";
    var classid_re = new RegExp(classid_string, "i");
    if (element.hasAttribute('type') &&
	/.*-shockwave-flash.*/.test(element.getAttribute("type")))
    {
	is_swf = true;
	detected_via = "type";
    }
    else if (element.hasAttribute("codebase")
	     && /.*flash.*/.test(element.getAttribute('codebase')))
    {
	is_swf = true;
	detected_via = "codebase";
    }
    else if (element.hasAttribute('classid')
	     && element.getAttribute('classid').match(classid_re))
    {
	is_swf = true;
	detected_via = "classid";
    }
    else if (element.hasAttribute("data") ||
	     element.hasAttribute("src"))
    {
	var attr = element.getAttribute("data")
	    ? element.getAttribute("data") :
	    element.getAttribute("src");
	if (attr.match(/\.swf/))
	{
	    is_swf = true;
	    detected_via = "file extension (.swf)";
	}
	else if (element.localName.toLowerCase() == "iframe")
	{
	    var self = this;
	    var val = this.call_site_function_at_position.apply(self,[
		"do_not_force_iframe_detection",
		window.location.hostname]);
	    if (!val)
	    {
		return false;
	    }
	    is_swf = true;
	    detected_via = "forced for iframe";
	}
    }
    if (detected_via)
    {
	this.log("LinternaMagica.is_swf_object:\n"+
		 "SWF DOM object found.",1);
	this.log("LinternaMagica.is_swf_object:\n"+
		 "SWF <"+element.localName+"> "+
		 (element.hasAttribute("id") ? 
		  (" with id \""+element.getAttribute("id")+"\" " ) :"") +
		 "detected via \""+detected_via+"\".", 2);
    }
    return is_swf;
}
LinternaMagica.prototype.detect_object_in_remote_site = function()
{
    var data = this.detect_remotely_embeded;
    var url = null;
    for (var s=0; s<this.remote_sites.length; s++)
    {
	var site = this.remote_sites[s];
	var site_re = new RegExp (site.site_name_regex,"i");
	var video_id_re = new RegExp (site.video_id_regex,"i");
	var url_template_data = null;
	if (window.location.hostname.match(site_re))
	{
	    this.log("LinternaMagica.detect_object_in_remote_site:\n"+
		     "Seems object is located at it's original site."+
		     " Skipping remote site detection."+site_re, 2);
	    break;
	}
	this.log("LinternaMagica.detect_object_in_remote_site:\n"+
		 "Checking if object matches "+site_re, 5);
	if (data.match(site_re))
	{
	    this.log("LinternaMagica.detect_object_in_remote_site:\n"+
		     "Object matches "+site_re, 3);
	    url_template_data = data.match(video_id_re);
	}
	else
	{
	    continue;
	}
	if (url_template_data)
	{
	    url = site.url_template;
	    for (var to_be_replaced in site.regex_replace_map)
	    {
		var index = site.regex_replace_map[to_be_replaced];
		var pos = url_template_data.length-index;
		var replace_data = url_template_data[pos];
		replace_data = replace_data.split("&")[0].split("?")[0];
		var regex = new RegExp ( "<"+to_be_replaced+">", "ig");
		url = url.replace(regex, replace_data);
	    }
	    this.log("LinternaMagica.detect_object_in_remote_site:\n"+
		     "Extracted remote link to video clip for object "+url, 1);
	    break;
	}
    }
    return url;
}
LinternaMagica.prototype.remote_sites = new Array();
LinternaMagica.prototype.remote_sites.add_site =
function (site_name_regex, video_id_regex, url_template, regex_replace_map)
{
    var site = new Object();
    if (!regex_replace_map)
    {
	regex_replace_map = new Object();
    }
    if (regex_replace_map.video_id == undefined)
    {
	regex_replace_map.video_id = 1;
    }
    site.site_name_regex = site_name_regex;
    site.video_id_regex = video_id_regex;
    site.regex_replace_map = regex_replace_map;
    site.url_template = url_template;
    this.push(site);
}
LinternaMagica.prototype.remote_sites.add_site(
    "vbox7\\\.com","ext\\\.swf\\\?vid=(.*)", 
    "http://vbox7.com/play:<video_id>");
LinternaMagica.prototype.remote_sites.add_site(
    "youtube\\\.com|youtube-nocookie\\\.com",
     "(v|embed)\\\/(.*)\\\&*",
    "http://youtube.com/watch?v=<video_id>");
LinternaMagica.prototype.remote_sites.add_site(
    "dailymotion\\\.com",
    "swf(\\\/video)*\\\/(.*)\\\?*",
    "http://dailymotion.com/video/<video_id>");
LinternaMagica.prototype.remote_sites.add_site(
    "vimeo\\\.com",
    "(moogaloop\\\.swf\\\?clip_id\\\=|\\\/video\\\/)(.*)",
    "http://vimeo.com/<video_id>");
LinternaMagica.prototype.remote_sites.add_site(
    "metacafe\\\.com",
    "metacafe\\\.com\\\/fplayer\\\/(.*)\\\.swf",
    "http://metacafe.com/watch/<video_id>");
LinternaMagica.prototype.remote_sites.add_site(
    "video\\\.google\\\.",
    "video\\\.google\\\.(.*)/googleplayer\\\.swf\\\?docid=([0-9-]+)\\\&",
    "http://video.google.<tld>/videoplay?docid=<video_id>", 
    {tld:2, video_id:1});
LinternaMagica.prototype.remote_sites.add_site(
    "viddler\\\.com",
    "viddler\\\.com\\\/(mini|embed|simple)\\\/([a-zA-Z0-9]+)\\\/",
    "http://viddler.com/v/<video_id>");
LinternaMagica.prototype.create_remote_site_link = function(object_data)
{
    var p= document.createElement("p");
    var a = this.pack_external_link(object_data.remote_site_link,
				    "Linterna Mágica >>");
    var title = this.
	_("Watch this video at it's original site with Linterna Mágica");
    a.setAttribute("class", "linterna-magica-remote-clip-visit-page-button");
    a.setAttribute("title", title + " ("+object_data.remote_site_link+")");
    p.appendChild(a);
    var close = document.createElement("a");
    close.textContent="x";
    close.setAttribute("href", "#");
    close.setAttribute("class", "linterna-magica-remote-clip-close-button");
    close.setAttribute("title", this._("Remove this button, if it overlaps images or text in the page."));
    var close_click_function =  function(ev)
    {
    	ev.preventDefault();
	var wrapper =  this.parentNode;
	wrapper.nextSibling.style.removeProperty("top");
	wrapper.parentNode.removeChild(wrapper);
    };
    close.addEventListener("click", close_click_function, false);
    p.appendChild(close);
    p.setAttribute("class", "linterna-magica-remote-clip-buttons");
    return p;
}
LinternaMagica.prototype.if_node_is_inserted = function(event,element)
{
    this.log("LinternaMagica.if_node_inserted:\n"+
	     "Insetred node detected in element: "+event.relatedNode,7);
    this.extract_objects_from_dom(event.relatedNode);
}
LinternaMagica.prototype.extract_objects_from_dom = function(element)
{
    if (!element)
	var element = document;
    var objects = this.create_object_list(element);
    for (var i=0, l=objects.length; i< l ; i++)
    {
	var object = objects[i];
	if (object.linterna_magica_id != undefined)
	{
	    this.log("LinternaMagica.extract_objects_from_dom:\n"+
		     "Skipping processed object with linterna_magica_id:"+
		     this.get_marked_object_id(object)+
		     ", localName <"+objects[i].localName+">"+
		     (objects[i].hasAttribute("id") ? 
		      " and id: "+objects[i].getAttribute("id"):""),2);
	    continue;
	}
	var object_data = new Object();
	if (this.skip_object_if_id(object.getAttribute("id")))
	{
	    continue;
	}
	if (this.delete_object_if_id(object.getAttribute("id")))
	{
	    if (object &&
		document.getElementById(object.getAttribute("id")) &&
		object.parentNode)
	    {
		object.parentNode.removeChild(object);
	    }
	    continue;
	}
     	if (this.is_swf_object(object)
     	    || (this.is_swf_object(object)
     		&& !this.is_swf_object(object.parentNode)))
     	{
	    var extracted_data = new Object();
	    var self = this;
	    var val = this.call_site_function_at_position.apply(self,[
		"skip_video_id_extraction",
		window.location.hostname]);
	    if (!val)
	    {
		return null;
	    }
	    else if (typeof(val) == "boolean")
	    {
		this.create_param_list(object);
		extracted_data = this.extract_link_from_param_list();
	    }
	    else
	    {
		extracted_data = val;
	    }
	    object_data.remote_site_link = extracted_data.remote_site_link;
	    object_data.link = extracted_data.link;
	    object_data.video_id = extracted_data.video_id;
	    object_data.hd_links =
		extracted_data.hd_links || null;
	    if (!object_data.link && !object_data.video_id && 
		!object_data.remote_site_link)
	    {
		this.log("LinternaMagica.extract_objects_from_dom:\n"+
			 "No video_id, link or remote site link"+
			 " found. Not creating video oject or remote"+
			 " video button.",1);
		continue;
	    }
	    if (object_data.video_id)
	    {
		var self = this;
		var val = this.call_site_function_at_position.apply(self,[
		    "skip_xhr_if_video_id",
		    window.location.hostname, object_data]);
		if (!val)
		{
		    return null;
		}
		else if(typeof(val) != "boolean")
		{
		    object_data = val;
		}
	    }
	    var parent = object.parentNode.localName.toLowerCase();
	    if (parent === "object" ||
		parent === "embed")
	    {
		this.log("LinternaMagica.extract_objects_from_dom:\n"+
			 "Using <"+object.localName+"> parentNode: <"+
			 object.parentNode.localName+">.",1);
		this.mark_flash_object(object);
		object = object.parentNode;
	    }
	    if (!object.parentNode)
	    {
		this.log("LinternaMagica.extract_objects_from_dom:\n"+
			 "Object's parent node dissapeared."+
			 " No link found (yet) in this object.",1);
		return null;
	    }
	    this.mark_flash_object(object);
	    object_data.parent = object.parentNode;
	    object_data.width = this.extract_object_width(object);
	    object_data.height = this.extract_object_height(object);
	    object_data.linterna_magica_id =
		this.get_marked_object_id(object);
	    this.log("LinternaMagica.extract_objects_from_dom:\n"+
		     "Object linterna_magica_id set to: "+
		     object_data.linterna_magica_id,2);
	    if (object_data.remote_site_link)
	    {
		this.log("LinternaMagica.extract_objects_from_dom:\n"+
			 "Link to remote site found."+
			 " Adding redirect button.",1);
		var remote_site = 
		    this.create_remote_site_link(object_data);
		var before =  object;
		if (before && before.nextSibling)
		{
		    object_data.parent.insertBefore(remote_site,
						    before.nextSibling);
		}
		else
		{
		    object_data.parent.appendChild(remote_site);
		}
		object.parentNode.style.setProperty("overflow",
						    "visible", "important");
		object.parentNode.parentNode.
		    style.setProperty("overflow", 
				      "visible", "important");
		object.parentNode.parentNode.
		    parentNode.style.setProperty("overflow", "visible",
						 "important");
		continue;
	    }
	    else if (object_data.link)
	    {
		this.log("LinternaMagica.extract_objects_from_dom:\n"+
			 "Removing plugin install warning.",2);
		if (!object_data.parent)
		{
		    this.log("LinternaMagica.extract_objects_from_dom:\n"+
			     "Object's parent node dissapeared."+
			     "A link is found for this object.",1);
		    return null;
		}
		this.remove_plugin_install_warning(object_data.parent);
		this.log("LinternaMagica.extract_objects_from_dom:\n"+
			 "Creating video object.",1);
		this.create_video_object(object_data);
	    }
	    else if (object_data.video_id)
	    {
		if ((!/blip\.tv/i.test(window.location.hostname) &&
		     ((object.hasAttribute('src') &&
		       /blip\.tv/i.test(object.getAttribute('src'))) ||
		      (object.hasAttribute('data') && 
		       /blip\.tv/i.test(object.getAttribute('data'))))) || 
		    (/blip\.tv/i.test(window.location.hostname) && 
		     ((object.hasAttribute('src') &&
		       /blip\.tv\/play/i.test(object.getAttribute('src'))) ||
		      (object.hasAttribute('data') && 
		       /blip\.tv\/play/i.test(object.getAttribute('data'))))))
		{
		    this.request_bliptv_jsonp_data(object_data);
		}
		else if ((
		    !/livestream\.com/i.test(window.location.hostname) &&
			((object.hasAttribute('src') &&
			  /livestream\.com/i.test(
			      object.getAttribute('src'))) ||
			 (object.hasAttribute('data') &&
			  /livestream\.com/i.test(
			      object.getAttribute('data'))))) ||
			 (/livestream\.com/i.test(
			     window.location.hostname) &&
			  ((object.hasAttribute('src') &&
			    /livestream\.com/i.test(
				object.getAttribute('src'))) ||
			   (object.hasAttribute('data') && 
			    /livestream\.com/i.test(
				object.getAttribute('data'))))))
		{
		    this.request_livestreamcom_jsonp_data(object_data);
		}
		else if (this.wait_xhr)
		{
		    this.log("LinternaMagica.extract_objects_from_dom:\n"+
			     "Waiting "+this.wait_xhr+
			     " ms ("+(this.wait_xhr/1000)+
			     " s) before requesting video link via"+
			     " video_id "+object_data.video_id+" ",1);
		    var self = this;
		    var data = object_data;
		    setTimeout(function() {
			self.request_video_link.apply(self,[data]);
		    }, this.wait_xhr);
		}
		else
		{
		    this.log("LinternaMagica.extract_objects_from_dom:\n"+
			     "Requesting video link via video_id "+
			     object_data.video_id,1);
		    this.request_video_link(object_data);
		}
	    }
	}
	else
	{
	    this.log("LinternaMagica.extract_objects_from_dom:\n"+
		     "Skipping object number "+i+
		     " with localName <"+objects[i].localName+">"+
		     (objects[i].hasAttribute("id") ? 
		      " and with id: "+objects[i].getAttribute("id"):""),1);
	}
    }
}
LinternaMagica.prototype.extract_object_width =
function(element)
{
    if (!/HTML(embed|iframe|object)element/i.test(element))
    {
	return null;
    }
    var width = null ;
    if (element.hasAttribute("width")
	&& !/\%/.test(element.getAttribute("width"))
	&& !isNaN(element.getAttribute("width")))
    {
	width = element.getAttribute("width");
    }
    else if (element.clientWidth)
    {
	width = element.clientWidth;
    }
    else if (element.offsetWidth)
    {
	width = element.offsetWidth;
    }
    else if(element.parentNode.clientWidth)
    {
	width = element.parentNode.clientWidth;
    }
    else
    {
	width = element.parentNode.offsetWidth;
    }
    if (!width || (width < this.absolute_min_width))
    {
	width = this.absolute_min_width;
    }
    return parseInt(width);
}
LinternaMagica.prototype.extract_object_height =
function(element)
{
    if (!/HTML(embed|iframe|object)element/i.test(element))
    {
	return null;
    }
    var height = null ;
    if (element.hasAttribute("height")
	&& !/\%/.test(element.getAttribute("height"))
	&& !isNaN(element.getAttribute("height")))
    {
	height = element.getAttribute("height");
    }
    else if (element.clientHeight)
    {
	height = element.clientHeight;
    }
    else if (element.offsetHeight &&
	     !/video\.google\./i.test(window.location.href))
    {
	height = element.offsetHeight;
    }
    else if (element.parentNode.clientHeight)
    {
	height = element.parentNode.clientHeight;
    }
    else if(element.parentNode.clientHeight)
    {
	height = element.parentNode.clientHeight;
    }
    else
    {
	height = element.parentNode.offsetHeight;
    }
    if (!height || (height<this.absolute_min_height))
    {
	height = this.absolute_min_height;
    }
    return parseInt(height);
}
LinternaMagica.prototype.extract_link_from_param_list = function()
{
    if (!this.param_list)
    {
	return null;
    }
    var params = this.param_list;
    var extracted = new Object();
    for(var p=0, lenp=params.length; p < lenp; p++)
    {
	var param = params[p];
	if(/flashvars|movie|data|src/i.test(param.name))
	{
	    this.log("LinternaMagica.extract_objects_from_dom:\n"+
	     	     "Checking if param "+param.name+
		     " is matching remote site.",1);
	    this.detect_remotely_embeded = param.value;
	    extracted.remote_site_link = this.detect_object_in_remote_site();
	    if (extracted.remote_site_link)
	    {
		break;
	    }
	    var self = this;
	    var val = this.call_site_function_at_position.apply(self,[
		"skip_link_extraction",
		window.location.hostname]);
	    if (val && typeof(val) == "boolean")
	    {
		this.log("LinternaMagica.extract_link_from_param_list:\n"+
			 "Trying to extract a link from"+
			 " param/attribute \""+param.name+"\"",4);
		if (!extracted.link)
		{
		    this.extract_link_data = param.value;
		    extracted.link = this.extract_link();
		}
	    }
	    else if (typeof(val) != "boolean")
	    {
		extracted = val;
	    }
	    if (!extracted.link)
	    {
		this.log("LinternaMagica.extract_link_from_param_list:\n"+
			 "Trying to extract video_id from"+
		     	 " param/attribute \""+param.name+"\"",4);
		if (!extracted.video_id)
		{
		    this.extract_video_id_data = param.value;
		    extracted.video_id = this.extract_video_id();
		}
	    }
	}
	if (extracted.link)
	{
	    this.extract_link_data = param.value;
	    var self = this;
	    var val = this.call_site_function_at_position.apply(self,[
		"extract_hd_links_from_dom_if_link",
		window.location.hostname]);
	    if (val && typeof(val) != "boolean")
	    {
		extracted.hd_links = val;
		break;
	    }
	}
	if (extracted.link || extracted.video_id)
	{
	    break;
	}
    }
    return extracted;
}
LinternaMagica.prototype.create_object_list = function(element)
{
    if (!element)
	var element = document;
    var o = element.getElementsByTagName("object");
    var e = element.getElementsByTagName("embed");
    var ifr = element.getElementsByTagName("iframe");
    var objects = new Array();
    for (var i=0, l=e.length; i <l; i++)
    {
	objects.push(e[i]);
    }
    for (var i=0, l=o.length; i <l; i++)
    {
	objects.push(o[i]);
    }
    for (var i=0, l=ifr.length; i <l; i++)
    {
	objects.push(ifr[i]);
    }
    return objects;
}
LinternaMagica.prototype.create_param_list = function(element)
{
    if (!element)
	return null;
    var par = element.getElementsByTagName("param");
    var params = new Array();
    for  (var p=0, lenp=par.length; p <lenp; p++)
    {
	params.push(par[p]);
    }
    for  (var p =0, lenp=element.attributes.length; p <lenp; p++)
    {
	params.push(element.attributes[p]);
    }
    this.param_list = params;
}
LinternaMagica.prototype.extract_object_from_script_flowplayer = function()
{
    var constructor_re = new RegExp(
	".*(flowplayer|$f)\\\s*\\\(([^,]+)\\\s*,\\\s*.*",
	"im");
    var data = this.script_data;
    var constructor = data.match(constructor_re);
    var el;
    var object_data = new Object();
    if (!constructor)
    {
	return null;
    }
    el = constructor[2].replace(/\'|\"/g, "");
    el = document.getElementById(el);
    if (!el)
    {
	this.log("LinternaMagica.extract_object_from_script_flowplayer:\n"+
		 "No player holder element found with id "+el,4);
	return null;
    }
    object_data.parent = el;
    object_data.width = el.clientWidth ? el.clientWidth: el.offsetWidth;
    object_data.height = el.clientHeight ? el.clientHeight: el.offsetHeight;
    this.extract_link_data = data;
    object_data.link = this.extract_link();
    if (object_data.link)
    {
	object_data.linterna_magica_id = 
	    this.mark_flash_object("extracted-from-script");
	return object_data;
    }
    return null;
}
LinternaMagica.prototype.fix_flowplayer_links = function(link)
{
    if (!link)
    {
	return null;
    }
    if (!/^http/i.test(link))
    {
	var data = this.extract_link_data;
	var base_url_re = new RegExp(
	    "(\\\"|\\\')*baseUrl(\\\'|\\\")*\\\s*:\\\s*(\\\'|\\\")"+
		"([^\\\'\\\"\\\,]+)(\\\'|\\\")",
	    "im");
	var base_url = data.match(base_url_re);
	if (base_url)
	{
	    link = base_url[base_url.length-2]+"/"+link;
	}
	if (/^\.\.\//i.test(link))
	{
	    var href = window.location.href.split("/");
	    var base_url = href.slice(0,(href.lenght-1)).join("/");
	    link = base_url +"/" +link;
	}
    }
    return link;
}
LinternaMagica.prototype.extract_object_from_script_jwplayer = function()
{
    var constructor_re = new RegExp(
	".*jwplayer\\\((\\\"|\\\')(\\\w+)(\\\"|\\\')\\\)\\\.setup",
	"im");
    var data = this.script_data;
    var constructor = data.match(constructor_re);
    var el, width, height;
    var object_data = new Object();
    if (!constructor)
    {
	return null;
    }
    el = constructor[2];
    el = document.getElementById(el);
    if (!el)
    {
	this.log("LinternaMagica.extract_object_from_script_jwplayer:\n"+
		 "No player holder element found with id "+el,4);
	return null;
    }
    width = data.match(/width:\s*([0-9]+),/);
    height = data.match(/height:\s*([0-9]+),/);
    if (width)
    {
	width = width[1];
    }
    else
    {
	width = el.clientWidth ? el.clientWidth: el.offsetWidth;
    }
    if (height)
    {
	height = height[1];
    }
    else
    {
	height = el.clientHeight ? el.clientHeight: el.offsetHeight;
    }
    if (! width || ! height)
    {
	return null;
    }
    object_data.parent = el;
    object_data.width = width;
    object_data.height = height;
    var hd = this.extract_jwplayer_hd_links(data);
    object_data.hd_links = (hd && hd.length) ? hd : null;
    object_data.link = (hd && hd.length) ? hd[hd.length-1].url : null;
    if (object_data.link)
    {
	object_data.linterna_magica_id = 
	    this.mark_flash_object("extracted-from-script");
	return object_data;
    }
    return null;
}
LinternaMagica.prototype.extract_jwplayer_hd_links = function(data)
{
    var hd_links_re = new RegExp (
	"levels(\\\"|\\\')*\\\s*:\\\s*\\\[.*",
	"img");
    var links_data = data.match(hd_links_re);
    if (!links_data || !links_data.length)
    {
	return null;
    }
    links_data = links_data[0];
    hd_links_re = new RegExp (
	"\\\{[^\\\}]+",
	"img");
    var count = 0;
    var hd_links = new Array();
    var link_data = null;
    while (link_data = hd_links_re.exec(links_data))
    {
	count++;
	var link = new Object();
	this.extract_link_data = link_data[0];
	link.url = this.extract_link();
	var label = link_data[0].match(/width(\"|\')*\s*:\s*([0-9]+),/);
	if (!label)
	{
	    label = this._("Link") + " " + count;
	}
	else
	{
	    label = label[label.length-1] +"p";
	}
	link.label = label;
	hd_links.push(link);
    }
    return hd_links;
}
LinternaMagica.prototype.
    extract_object_from_script_pokkariplayer =  function ()
{
    var data = this.script_data;
    var constructor_re = new RegExp (
	"(.*)\\\s*=\\\s*"+
	    "PokkariPlayer\\\.GetInstanceByMimeType\\\(\\\"(.*)\\\"\\\,",
	"im");
    var constructor = data.match(constructor_re);
    if (!constructor)
    {
	return null;
    }
    var mime_raw = constructor[constructor.length-1].split(/,/);
    var mime =  mime_raw[mime_raw.length-1];
    var player  = constructor[constructor.length-2];
    player = player.replace(/\s*var\s*/,"").replace(" ","");
    var url_re = new RegExp(player+
			    '\\\.setPrimaryMediaUrl\\\(\\\"(.*)\\\"');
    var url = data.match(url_re);
    url = url[url.length-1];
    var width = data.match(/PokkariPlayerOptions\.maxWidth\s*=\s*(\d+)\;/);
    width=width[width.length-1];
    var height = data.match(/PokkariPlayerOptions\.maxHeight\s*=\s*(\d+)\;/);
    height = height[height.length-1];
    var element = data.match(/player\.setPlayerTarget\(.*\'(.*)\'.*/);
    element = element[element.length-1];
    element = document.getElementById(element);
    if (!element)
	return null;
    var embed_object = element.getElementsByTagName("object")[0];
    var linterna_magica_id = null;
    if (embed_object)
    {
	linterna_magica_id = this.mark_flash_object(embed_object);
    }
    else
    {
	linterna_magica_id =
	    this.mark_flash_object("extracted-from-script");
    }
    var object_data = new Object();
    object_data.linterna_magica_id = linterna_magica_id;
    object_data.width = width;
    object_data.height = height;
    object_data.link = url;
    object_data.mime = mime;
    object_data.parent = element;
    return object_data;
}
LinternaMagica.prototype.extract_objects_from_scripts = function()
{
    var scripts = document.getElementsByTagName("script");
    if(!scripts)
    {
	return;
    }
    for (var s=scripts.length-1; s>0; s--)
    {
	if (!scripts[s].textContent)
	{
	    continue;
	}
	this.script_data = scripts[s].textContent;
	var object_data = null;
	var self = this;
	var val = this.call_site_function_at_position.apply(self,[
	    "skip_script_processing",
	    window.location.hostname]);
	if (!val)
	{
	    continue;
	}
	var self = this;
	var val = this.call_site_function_at_position.apply(self,[
	    "extract_object_from_script",
	    window.location.hostname]);
	if (this.sites[window.location.hostname] && !val)
	{
	    this.log("LinternaMagica.extract_objects_from_scripts:\n"+
		     "Site specific code did not return object data. Skipping"+
		     " general purpose extraction",6);
	    continue;
	}
	if (val && typeof(val) != "boolean")
	{
	    object_data = val;
	}
	if (!object_data)
	{
	    object_data =
		this.extract_object_from_script_swfobject();
	}
	if (!object_data)
	{
	    object_data =
		this.extract_object_from_script_ufo();
	}
	if (!object_data)
	{
	    object_data =
		this.extract_object_from_script_flowplayer();
	}
	if (!object_data)
	{
	    object_data =
		this.extract_object_from_script_jwplayer();
	}
	if (!object_data)
	{
	    object_data =
		this.extract_object_from_script_pokkariplayer();
	}
	if (object_data && object_data.width && object_data.height)
	{
	    if(object_data.height < this.absolute_min_height)
	    {
		object_data.height = this.absolute_min_height;
	    }
	    if (object_data.width < this.absolute_min_width)
	    {
		object_data.width = this.absolute_min_width;
	    }
	}
	if(object_data && object_data.video_id && !object_data.link)
	{
	    this.log("LinternaMagica.constructor:\n"+
		     "Requesting video link via video_id "+
		     object_data.video_id,1);
	    this.request_video_link(object_data);
	}
	if (object_data && object_data.link)
	{
	    var self = this;
	    var val = this.call_site_function_at_position.apply(self,[
		"replace_extracted_object_from_script",
		window.location.hostname,object_data]);
	    if (val && typeof(val) == "boolean")
	    {
		this.log("LinternaMagica.extract_objects_from_scripts:\n"+
	    		 "Removing plugin install warning.",2);
	    	this.remove_plugin_install_warning(object_data.parent);
	    	this.create_video_object(object_data);
	    }
	}
	if (object_data && (object_data.video_id || object_data.link))
	{
	    var self = this;
	    var val = this.call_site_function_at_position.apply(self,[
		"stop_if_one_extracted_object_from_script",
		window.location.hostname]);
	    if (!val)
	    {
		break;
	    }
	}
    }
}
LinternaMagica.prototype.extract_object_from_script_swfobject = function()
{
    var constructor_re = new RegExp(
	"(swfobject.embedSWF|(\\\w+|window\\\[\\\"\\\w+\\\"\\\])\\\s*="+
	    "\\\s*new\\\s*SWFObject)\\\("+
	    "([^,]+)"+
	    "\\\s*,\\\s*([^,]+)"+
	    "\\\s*,\\\s*([^,]+)"+
	    "\\\s*,\\\s*([^,]+)"+
	    "\\\s*,\\\s*([^,\\\)]+)"+
	    "(\\\s*,\\\s*([^,\\\)]+)){0,1}"+
	    "(\\\s*,\\\s*([^,\\\)]+)){0,1}"+
	    "(\\\s*,\\\s*([^,\\\)]+)){0,1}"+
	    "(\\\s*,\\\s*([^,\\\)]+)){0,1}"+
	    "(\\\s*,\\\s*([^,\\\)]+)){0,1}"+
	    "\\\)",
	"img");
    var data = this.script_data;
    var constructor = null;
    var var_name = null;
    var id_re = null;
    var el = null;
    var count = 0;
    var last_constructor = null;
    while (constructor = constructor_re.exec(data))
    {
	last_constructor = constructor;
	el = constructor[4].replace(/\'|\"/g, "");
	if (!document.getElementById(el))
	{
	    var_name = 
		constructor[2].replace(/window\[\"/,"").
		replace(/\"\]/,"");
	    id_re = new RegExp(
		var_name+"\\."+
		    "write\\("+"("+"\\'"+'|\\"'+")*"+
		    "([A-Za-z0-9_-]+)"+"("+"\\'"+'|\\"'+")*"+
		    "\\)",
		"ig");
	    el = null;
	    var inner_count = 0;
	    while (el = id_re.exec(data))
	    {
		//
		if (inner_count >= count)
		{
		    break;
		}
		inner_count++;
	    }
	    if (!el)
	    {
		this.log("LinternaMagica.extract_object_from_script_"+
			 "swfobject:\n"+
			 "No id extracted from SWFObject.write method "+
			 "id_re" +id_re,4);
		continue;
	    }
	    el = el[el.length-2];
	    //
	    if (document.getElementById(el))
	    {
		break;
	    }
	}
	count++;
    }
    constructor = last_constructor;
    if (!document.getElementById(el))
    {
	return null;
    }
    var height, width;
    var object_data= new Object();
    if (this.skip_object_if_id(el))
    {
	return null;
    }
    object_data.parent = document.getElementById(el);
    if (!object_data.parent)
    {
	this.log("LinternaMagica.extract_object_from_script_swfobject:\n"+
		 "Wrong element id (or wrong regex)"+el,1);
	return null;
    }
    object_data.width = constructor[5].replace(/\'|\"/g, "");
    object_data.height = constructor[6].replace(/\'|\"/g, "");
    if (/%/i.test(object_data.width))
    {
	object_data.width = object_data.parent.clientWidth;
    }
    if (/%/i.test(object_data.height))
    {
	object_data.height = object_data.parent.clientHeight;
    }
    this.extract_link_data = data;
    object_data.link = this.extract_link();
    if (!object_data.link)
    {
	this.extract_video_id_data = data;
	var self = this;
	var val = this.call_site_function_at_position.apply(self,[
	    "libswfobject_skip_video_id_extraction",
	    window.location.hostname,object_data]);
	if (val && typeof(val) == "boolean")
	{
	    object_data.video_id = this.extract_video_id();
	}
	else if(val)
	{
	    object_data.video_id = val;
	}
    }
    if (object_data.video_id || object_data.link)
    {
	this.log("LinternaMagica.extract_object_from_script_swfobject:\n"+
		 "SWF object extracted from script ",1);
	object_data.linterna_magica_id =
	    this.mark_flash_object("extracted-from-script");
	var self = this;
	var val = this.call_site_function_at_position.apply(self,[
	    "extract_hd_links_from_script_if_link",
	    window.location.hostname, data]);
	if (val && typeof(val) != "boolean")
	{
	    object_data.hd_links = val;
	}
	return object_data;
    }
    return null;
}
LinternaMagica.prototype.extract_object_from_script_ufo = function()
{
    var constructor_re = new RegExp(
	"UFO\\\.create\\\(\\\s*([a-zA-Z0-9]+)\\\s*,\\\s*"+
	    "(\\\"|\\\')([a-zA-Z0-9-_]+)(\\\"|\\\')",
	"im");
    var data = this.script_data;
    var constructor = data.match(constructor_re);
    if (!constructor)
    {
	return null;
    }
    if (!document.getElementById(constructor[3]))
    {
	return null;
    }
    var object_data = new Object();
    object_data.parent = document.getElementById(constructor[3]);
    var ufo_variable_re ="var\\\s*"+constructor[1]+"\\\s*=\\\s*\\\{.*";
    var w_h_re = "\\\s*(\\\"|\\\')*(\\\d+)(\\\'|\\\")*";
    var width_re = new RegExp(
	ufo_variable_re+"width:"+w_h_re,
	"im");
    var height_re = new RegExp(
	ufo_variable_re+"height:"+w_h_re,
	"im");
    object_data.width = data.match(width_re);
    object_data.height = data.match(height_re);
    if (object_data.width)
    {
	object_data.width = object_data.width[object_data.width.length-2];
    }
    else
    {
	return null;
    }
    if (object_data.height)
    {
	object_data.height = object_data.height[object_data.height.length-2];
    }
    else
    {
	return null;
    }
    this.extract_link_data = data;
    object_data.link = this.extract_link();
    if (!object_data.link)
    {
	this.extract_video_id_data = data;
	object_data.video_id = this.extract_video_id();
    }
    if (object_data.link || object_data.video_id)
    {
	this.log("LinternaMagica.extract_object_from_script_ufo:\n"+
		 "SWF object extracted from script ",1);
	object_data.linterna_magica_id =
	    this.mark_flash_object("extracted-from-script");
	return object_data;
    }
    return null;
}
LinternaMagica.prototype.extract_link = function()
{
    if (!this.extract_link_data)
    {
	return null;
    }
    var data = this.extract_link_data;
    var self = this;
    var val = this.call_site_function_at_position.apply(self,[
	"set_video_link_regex",
	window.location.hostname]);
    var link_re = null;
    var link_position = null;
    if (val && typeof(val) != "boolean")
    {
	link_re = val.link_re;
	link_position = val.link_position;
    }
    else
    {
	link_re = new RegExp (
	    "\\\{{0}.*(video|flv_ur|streamer|file|moviepath|videourl|"+
		"mediaurl|audio|soundfile|sdurl|videopath|flv|url|ms|"+
		"nextmovie|flvaddress)"+
		"(\\\"|\\\')*\\\s*(\\\=|\\\:|\\\,)\\\s*(\\\"|\\\')*"+
	  	 "(.*\\\."+
		"(flv|mp4|mp3)"+ 
		"((\\\?|\\\&)?\\\w+\\\=[A-Za-z0-9_\\\-]+"+
		"\\\&?)*)(?!\\\.)",
	    "i");
    }
    if (link_position == null ||
	typeof(link_position) == "undefined")
    {
	link_position = 4;
    }
    var link = unescape(data).match(link_re);
    if (link && link[link.length-link_position])
    {
	link = unescape(link[link.length-link_position]);
	link = link.replace(/\\\//g, "/");
	link = link.replace(/ /g, "%20");
	var self = this;
	var val = this.call_site_function_at_position.apply(self,[
	    "process_extracted_link",
	    window.location.hostname, link]);
	if (val && typeof(val) != "boolean")
	{
	    link = val;
	}
	var self = this;
	var val = this.call_site_function_at_position.apply(self,[
	    "do_not_clean_amps_in_extracted_link",
	    window.location.hostname]);
	if (val)
	{
	    link = link.split("&")[0];
	    this.log("LinternaMagica.extract_link:\n"+
		     " Link split at the first ampersand",3);
	    link = link.replace(/[^:]\/\//, "/");
	}
	self = this;
	val = this.call_site_function_at_position.apply(self,[
	    "skip_flowplayer_links_fix",
	    window.location.hostname]);
	if (val)
	{
	    if (data.match(/.*flowplayer.*/))
	    {
		link = this.fix_flowplayer_links(link);
	    }
	}
	this.log("LinternaMagica.extract_link:\n"+
		 " Extracted link: "+link,1);
	return link;
    }
    else
    {
	this.log("LinternaMagica.extract_link:\n"+
		 "No link found.",4);
    }
    return null;
}
LinternaMagica.prototype.extract_video_id = function()
{
    if (!this.extract_video_id_data)
    {
	return null;
    }
    var data = this.extract_video_id_data;
    data = "&"+data;
    var video_id_re = null;
    var match_site = null;
    var video_id_position = null;
    if (/blip\.tv/i.test(data))
    {
	match_site = "blip.tv";
    }
    else
    {
	match_site = window.location.hostname;
    }
    var self = this;
    var val = this.call_site_function_at_position.apply(self,[
	"set_video_id_regex",
	match_site]);
    if (val && typeof(val) !== "boolean")
    {
	video_id_re = val.video_id_re;
	video_id_position = val.video_id_position;
    }
    else
    {
	video_id_re = new RegExp (
	    "(\\\"|\\\'|\\\&|\\\?|\\\;|\\\/|\\\.|\\\=)(itemid|"+
		"clip_id|audio|soundfile|clip|video_id|vid|"+
		"player_config\\\.php\\\?v|"+
		"videoid|media_id|vkey|video3|_videoid|"+
		"vimeo_clip_|php&ID|\\\/video_embed\\\/\\\?id)"+
		"(\\\"|\\\')*(\\\=|\\\:|,|\\\/)\\\s*(\\\"|\\\')*"+
		"([a-zA-Z0-9\\\-\\\_]+)",
	"i");
    }
    if (video_id_position == null ||
	typeof(video_id_position) == "undefined")
    {
	video_id_position = 1;
    }
    var video_id =data.match(video_id_re);
    if (video_id)
    {
	video_id = video_id[video_id.length-video_id_position];
	this.log("LinternaMagica.extract_video_id:\n"+
		 "Extracted video id : "+video_id,1);
	return video_id;
    }
    else
    {
	this.log("LinternaMagica.extract_video_id:\n"+
		 "No video_id found. ",4);
    }
    return null;
}
LinternaMagica.prototype.skip_objects =
    [ "brozar[a-z0-9]+_.*_scroll",
      "flashRateObject", "VideoCharts", 
      "^f[0-9]+[a-z]+",
      "^fb[0-9]+[a-z]+",
      "easyXDM_DISQUS_net_default[0-9]+_provider",
      "twitterIframe"];
LinternaMagica.prototype.skip_object_if_id = function(id_string)
{
    if (!id_string)
	return false;
    if (!this.skip_objects_re)
    {
	this.skip_objects_re = new RegExp (
	    this.skip_objects.join("|"),
	    "i");
	this.log("LinternaMagica.skip_object_if_id:\n"+
		 "No skip_objects regular expression. Creating : "+
		 this.skip_objects_re,5);
    }
    if (id_string.match(this.skip_objects_re))
    {
	this.log("LinternaMagica.skip_object_if_id:\n"+
		 "Skipping forbiden object with id "+id_string,1);
	return true;
    }
    return false;
}
LinternaMagica.prototype.delete_objects = [ "videosync", "videoad" ];
LinternaMagica.prototype.delete_object_if_id = function(id_string)
{
    if (!id_string)
	return false;
    if (!this.delete_objects_re)
    {
	this.delete_objects_re = new RegExp (
	    this.delete_objects.join("|"),
	    "i");
	this.log("LinternaMagica.delete_object_if_id:\n"+
		 "No delete_objects regular expression. Creating : "+
		 this.delete_objects_re,5);
    }
    if (id_string.match(this.delete_objects_re))
    {
	this.log("LinternaMagica.delete_object_if_id:\n"+
		 "Deleting forbiden object with id "+id_string,1);
	return true;
    }
    return false;
}
LinternaMagica.prototype.switch_to_hd_link = function(event, element)
{
    event.preventDefault();
    var div = element.parentNode.parentNode.parentNode;
    var id = div.getAttribute("id").split(/-/);
    id = id[id.length-1];
    var dw_link = document.getElementById(
	"linterna-magica-video-download-link-"+id);
    var video_object = document.getElementById(
	"linterna-magica-video-object-"+id);
    var selected_link = document.getElementById(
	"linterna-magica-selected-hd-link-"+id);
    if (dw_link && video_object)
    {
	dw_link.setAttribute("href",
			     element.getAttribute("href"));
	video_object.setAttribute("data",
				  element.getAttribute("href"));
	var sibling = video_object.nextSibling;
	var parent = video_object.parentNode;
	var new_video = video_object.cloneNode(true);
	video_object.parentNode.removeChild(video_object);
	if (sibling)
	{
	    parent.insertBefore(new_video, sibling);
	}
	else
	{
	    parent.appendChild(new_video);
	}
	if (this.controls)
	{
	    this.player.init.apply(this,[id]);
	}
	else if(!this.controls && !this.get_player_name(id))
	{
	    this.player.set_player_name.apply(this,[id]);
	}
	var control_id = "linterna-magica-controls-button-play-"+id;
	var play = document.getElementById(control_id);
	if (play)
	{
	    play.style.setProperty("display", "none", "important");
	}
	control_id = "linterna-magica-controls-button-pause-"+id;
	var pause = document.getElementById(control_id);
	if (pause)
	{
	    pause.style.removeProperty("display");
	}
	if (selected_link)
	{
	    this.unselect_hd_link_in_list(selected_link);
	}
	this.select_hd_link_in_list(element,id);
	div.style.setProperty("display", "none", "important");
	this.set_video_object_width_on_hd_list_display_change(id);
    }
}
LinternaMagica.prototype.show_or_hide_hd_links = function(event, element)
{
    event.preventDefault();
    var id = element.getAttribute("id").split(/-/);
    id = id[id.length-1];
    var hd_list = element.nextSibling;
    if (hd_list)
    {
	var display = hd_list.style.getPropertyValue("display");
	if (display)
	{
	    hd_list.style.removeProperty("display");
	    this.set_video_object_width_on_hd_list_display_change(id);
	    var self = this;
	    var hd_list_blur_function = function(ev)
	    {
		var timeout_function = function()
		{
		    if (document.activeElement &&
			((document.activeElement.hasAttribute("id") &&
			document.activeElement.getAttribute("id") 
			  != "linterna-magia-selected-hd-link-"+id) ||
			 !document.activeElement.hasAttribute("id")))
		    {
			hd_list.style.setProperty("display", 
						  "none", "important");
			self.
			    set_video_object_width_on_hd_list_display_change.
			    apply(self, [id]);
		    }
		    element.removeEventListener("blur",
						hd_list_blur_function,
						true);
		};
		setTimeout(timeout_function, 250);
	    };
	    element.addEventListener("blur", hd_list_blur_function, true);
	}
	else
	{
	    hd_list.style.setProperty("display", "none", "important");
	    this.set_video_object_width_on_hd_list_display_change(id);
 	}
    }
    return true;
}
LinternaMagica.prototype.set_video_object_width_on_hd_list_display_change =
function(linterna_magica_id)
{
    var hd_list = document.getElementById("linterna-magica-hd-links-list-"+
					 linterna_magica_id);
    var lm_video = this.get_video_object(linterna_magica_id);
    if (!hd_list || !lm_video)
    {
	return;
    }
    if (hd_list.video_normal_width == undefined)
    {
	var hd_list_width = hd_list.clientWidth ? 
	    hd_list.clientWidth : hd_list.offsetWidth ? 
	    hd_list.offsetWidth : 120;
	hd_list.video_normal_width = 
	    parseInt(lm_video.style.getPropertyValue("width"));
	hd_list.video_reduced_width = 
	    hd_list.video_normal_width - hd_list_width - 20;
    }
    if (hd_list.style.getPropertyValue('display'))
    {
	lm_video.style.setProperty("width", hd_list.video_normal_width+"px",
				   "important");
    }
    else
    {
	lm_video.style.setProperty("width", hd_list.video_reduced_width+"px",
			       "important");
    }
}
LinternaMagica.prototype.select_hd_link_in_list = function(element,id)
{
    if (typeof(element) != "object" ||
	id == "undefined")
    {
	return element;
    }
    element.style.setProperty("border-style", "solid", "important");
    element.style.setProperty("border-width", "1px", "important");
    element.style.setProperty("border-color", "#bbbbbb", "important");
    element.style.setProperty("background-color", "#151515", "important");
    element.style.setProperty("color", "#ffffff", "important");
    element.setAttribute("id", "linterna-magica-selected-hd-link-"+id);
    return element;
}
LinternaMagica.prototype.unselect_hd_link_in_list = function(element)
{
    if (typeof(element) != "object")
    {
	return element;
    }
    element.removeAttribute("id");
    element.style.removeProperty("border-width");
    element.style.removeProperty("border-color");
    element.style.removeProperty("border-style");
    element.style.removeProperty("background-color");
    element.style.removeProperty("color");
    if (element.style.getPropertyValue("border"))
    {
	element.style.setProperty("border-width", "0px", "important");
    }
    return element;
}
LinternaMagica.prototype.create_hd_links_button = function(object_data)
{
    var id = object_data.linterna_magica_id;
    var self = this;
    var hd_links = this.create_hd_links_list(object_data);
    var hd_wrapper = document.createElement("div");
    hd_wrapper.setAttribute("id", "linterna-magica-hd-wrapper-"+id);
    hd_wrapper.setAttribute("class", "linterna-magica-hd-wrapper");
    var hd_button = document.createElement("a");
    hd_button.setAttribute("href","#");
    hd_button.textContent = this._("HQ");
    hd_button.setAttribute("title", this._("Higher quality"));
    hd_button.setAttribute("id", "linterna-magica-switch-hd-"+id);
    hd_button.setAttribute("class", "linterna-magica-switch-hd");
    var hd_button_click_function =  function(ev)
    {
	var el = this;
	self.show_or_hide_hd_links.apply(self, [ev, el]);
    };
    hd_button.addEventListener("click",
			       hd_button_click_function, false);
    hd_wrapper.appendChild(hd_button);
    hd_wrapper.appendChild(hd_links);
    return hd_wrapper;
}
LinternaMagica.prototype.create_hd_links_list = function(object_data)
{
    var id = object_data.linterna_magica_id;
    var self = this;
    var hd_links = document.createElement("div");
    var preferred_link =  object_data.preferred_link;
    hd_links.setAttribute("id", "linterna-magica-hd-links-list-"+id);
    hd_links.setAttribute("class", "linterna-magica-hd-links-list");
    hd_links.style.setProperty("display","none","important");
    var ul = document.createElement("ul");
    for(var link=0; link<object_data.hd_links.length; link++)
    {
	var li = document.createElement("li");
	var button = document.createElement("a");
	button.setAttribute("href",object_data.hd_links[link].url);
	if (object_data.hd_links[link].more_info)
	{
	    button.setAttribute("title",
				object_data.hd_links[link].more_info);
	}
	button.textContent = object_data.hd_links[link].label;
	var button_click_function = function(ev)
	{
	    var el = this;
	    self.switch_to_hd_link.apply(self, [ev, el]);
	};
	button.addEventListener("click",
				button_click_function , false);
	if (link == preferred_link)
	{
	    this.select_hd_link_in_list(button,id);
	    object_data.link = object_data.hd_links[link].url;
	}
	li.appendChild(button);
	ul.appendChild(li);
    }
    hd_links.appendChild(ul);
    return hd_links;
}
LinternaMagica.prototype.pack_external_link = function(href,text)
{
    var a = document.createElement('a');
    var data = "data:text/html;charset=utf-8;base64,";
    data += btoa(
	"<html><head><meta http-equiv='refresh' content='0;url="+
	href+"' /></head><body></body></html>");
    var txt = document.createTextNode(text);
    a.setAttribute("href", data);
    a.appendChild(txt);
    return a;
}
LinternaMagica.prototype.create_controls = function(object_data)
{
    var id = object_data.linterna_magica_id;
    var controls_wrapper = document.createElement("div");
    if (this.controls)
    {
	this.volume_slider_timers[id] = new Array();
	var controls_time_slider = document.createElement("div");
	controls_time_slider.setAttribute("class", "linterna-magica-controls-time-slider");
	controls_time_slider.setAttribute("id", "linterna-magica-controls-time-slider-wrapper-"+id);
	controls_time_slider.style.setProperty("width",
					       ((parseInt(object_data.width))+"px"),
					       "important");
	var mouse_scroll = /WebKit/i.test(navigator.userAgent) ?
	    "mousewheel" : "DOMMouseScroll";
	var time_slider = this.create_time_slider(object_data);
	var time_slider_scroll_function = function(ev)
	{
	    var el = this;
	    self.time_slider_scroll_event.apply(self, [ev, el]);
	};
	time_slider.addEventListener(mouse_scroll, 
				     time_slider_scroll_function, false);
	var time_slider_click_function =  function(ev)
	{
	    var el = this;
	    self.time_slider_click_event.apply(self, [ev, el]);
	};
	time_slider.addEventListener("click", time_slider_click_function, false);
	var time_knob = time_slider.getElementsByTagName("a")[0];
	time_knob.addEventListener("mousedown", function(ev)
				   {
				       ev.preventDefault();
				       clearInterval(self.player_timers[id]);
				       delete self.player_timers[id];
				       self.slider_control.apply(self, [ev]);
				   }, false);
	controls_time_slider.appendChild(time_slider);
	controls_wrapper.appendChild(controls_time_slider);
    }
    var controls = document.createElement("div");
    controls.setAttribute("class", "linterna-magica-controls");
    controls.setAttribute("id", "linterna-magica-controls-"+id);
    controls.style.setProperty("width",
			     ((parseInt(object_data.width))+"px"),
			     "important");
    if (this.controls)
    {
	var self = this;
	var started_clip = this.find_started_clip();
	var play = this.create_play_button(object_data);
	if (this.autostart && started_clip == null)
	{
	    play.style.setProperty("display", "none", "important");
	}
	var play_click_function = function(ev)
	{
	    var el = this;
	    self.play_button_click_event.apply(self, [ev, el]);
	};
	play.addEventListener("click", play_click_function, false);
	controls.appendChild(play);
	var pause = this.create_pause_button(object_data);
	if (!this.autostart || started_clip !== null)
	{
	    pause.style.setProperty("display", "none", "important");
	}
	var pause_click_function = function(ev)
	{
	    var el = this;
	    self.pause_button_click_event.apply(self, [ev, el]);
	};
	pause.addEventListener("click", pause_click_function, false);
	controls.appendChild(pause);
	var mute = this.create_mute_button(object_data);
	var mute_click_function = function(ev)
	{
	    var el = this;
	    self.mute_button_click_event.apply(self, [ev, el]);
	};
	mute.addEventListener("click", mute_click_function, false);
	var mute_mouse_over_function = function(ev)
	{
	    var el = this;
	    var id = el.getAttribute("id").split('-');
	    id = id[id.length-1];
	    self.mute_button_mouse_over_event.apply(self, [ev, el]);
	    for(var i=0,l=self.volume_slider_timers[id].length; i<l; i++)
	    {
		clearTimeout(self.volume_slider_timers[id][i]);
		self.volume_slider_timers[id].pop(i);
	    }
	    el.addEventListener("mouseout", volume_slider_hide_function, false);
	}
	mute.addEventListener("mouseover", mute_mouse_over_function, false);
	mute.addEventListener("mousemove", mute_mouse_over_function, false);
	var volume_slider_hide_function = function(ev)
	{
	    var el = this;
	    var id = el.getAttribute("id").split('-');
	    id = id[id.length-1];
	    var volume_slider_hide_timeout_function = function ()
	    {
		self.volume_slider_hide_event.apply(self, [ev, el]);
	    }
	    var time_id = setTimeout(volume_slider_hide_timeout_function, 700);
	    self.volume_slider_timers[id].push(time_id);
	}
	mute.addEventListener("mouseout", volume_slider_hide_function, false);
	controls.appendChild(mute);
	var volume_slider  = this.create_volume_slider(object_data);
	var volume_slider_scroll_function = function(ev)
	{
	    var el = this;
	    self.volume_slider_scroll_event.apply(self, [ev, el]);
	};
	volume_slider.addEventListener(mouse_scroll,
				       volume_slider_scroll_function, false);
	var volume_slider_click_function = function(ev)
	{
	    var el = this;
	    self.volume_slider_click_event.apply(self, [ev, el]);
	};
	volume_slider.addEventListener("click",
				       volume_slider_click_function, false);
	volume_slider.addEventListener("mouseover", mute_mouse_over_function, false);
	volume_slider.addEventListener("mousemove", mute_mouse_over_function, false);
	volume_slider.addEventListener("mouseout", volume_slider_hide_function, false);
	var volume_knob = volume_slider.getElementsByTagName("a")[0];
	volume_knob.addEventListener("mousedown", function(ev)
				     {
					 ev.preventDefault();
					 self.slider_control.apply(self, [ev]);
				     }, false);
	controls.appendChild(volume_slider);
	var time_text = document.createElement("span");
	time_text.style.display = "none";
	time_text.setAttribute("class", "linterna-magica-controls-slider-text "+
			       " linterna-magica-controls-time-slider-text");
	time_text.setAttribute("id", "linterna-magica-controls-"+
			       "time-slider-text-"+id);
	time_text.textContent="--:--:--";
	controls.appendChild(time_text);
    }
    if (object_data.hd_links)
    {
	var p = 
	    this.compute_preferred_hd_link(object_data.hd_links);
	if (p == null || isNaN(p))
	{
	    p = object_data.hd_links[object_data.hd_links.length-1];
	}
	object_data.preferred_link = p;
	object_data.link = object_data.hd_links[p].url;
	var hd_links = this.create_hd_links_button(object_data);
	controls.appendChild(hd_links);
    }
    if (controls) {
	var fullscreen = this.create_fullscreen_button(object_data);
	var fullscreen_click_function = function(ev)
	{
	    var el = this;
	    self.fullscreen_button_click_event.apply(self, [ev, el]);
	};
	fullscreen.addEventListener("click",
				    fullscreen_click_function, false);
	controls.appendChild(fullscreen);
    }
    var dw_link = document.createElement("a");
    dw_link.textContent = this._("Download");
    dw_link.setAttribute("title", this._("Save the video clip"));
    dw_link.setAttribute("id", "linterna-magica-video-download-link-"+id);
    dw_link.setAttribute("class", "linterna-magica-video-download-link");
    dw_link.setAttribute("href", object_data.link);
    if (!object_data.link)
    {
	dw_link.style.setProperty("display", "none", "important");
    }
    controls.appendChild(dw_link);
    var site_html5_player =
	this.find_site_html5_player_wrapper(object_data.parent);
    var toggle_plugin_switch_type = 
	site_html5_player ? "html5" : "plugin";
    if (this.plugin_is_installed || site_html5_player)
    {
	var toggle_plugin = 
	    this.create_toggle_plugin_link(null,id,
					   toggle_plugin_switch_type);
	controls.appendChild(toggle_plugin);
    }
    if (this.debug_level && this.log_to == "web")
    {
	var log_link  =  this.create_web_log_link();
	log_link.setAttribute("class", 
			      "linterna-magica-web-log-link");
	log_link.setAttribute("id",
			      "linterna-magica-web-log-link-"+id);
	log_link.addEventListener("click",
				  this.show_or_hide_web_log, false);
	controls.appendChild(log_link);
    }
    var self = this;
    var update_notifier = this.create_update_notifier_link(id);
    if (!this.updates_data)
    {
	update_notifier.style.setProperty("display", "none", "important");
    }
    var notifier_click_function = function(ev)
    {
	var el = this;
	self.show_or_hide_update_info.apply(self, [ev, el]);
    };
    update_notifier.addEventListener("click",
				     notifier_click_function,
				     false);
    controls.appendChild(update_notifier);
    var about_lm = document.createElement("a");
    about_lm.textContent = "Linterna Mágica";
    about_lm.setAttribute("href", "#");
    about_lm.setAttribute("title", this._("About")+ " Linterna Mágica " +
			     this.version);
    about_lm.setAttribute("id", "linterna-magica-logo-"+id);
    about_lm.setAttribute("class", "linterna-magica-logo");
    var self = this;
    about_lm.addEventListener("click", function(ev)
				 {
				     var el = this;
				     self.about.apply(self, [ev, el]);
				 }, false);
    controls.appendChild(about_lm);
    if (this.get_document_direction() == "rtl" || 
	this.languages[this.lang].__direction == "rtl")
    {
	controls.setAttribute("dir", "rtl");
	var children = controls.childNodes;
	var class_b = "linterna-magica-controls-buttons";
	var class_hs = "linterna-magica-controls-horizontal-slider";
	for(var b=0,l=children.length; b<l; b++)
	{
	    var child = children[b];
	    var has_b_class = 
		this.object_has_css_class(child, class_b);
	    var has_hs_class = 
		this.object_has_css_class(child, class_hs);
	    if (has_b_class || has_hs_class)
	    {
		child.style.setProperty("float", "right", "important");
	    }
	}
    }
    controls_wrapper.appendChild(controls);
    return controls_wrapper;
}
LinternaMagica.prototype.create_play_button = function(object_data)
{
    var lm_id = object_data.linterna_magica_id;
    var play = document.createElement("a");
    play.setAttribute("class", "linterna-magica-controls-buttons "+
		      "linterna-magica-controls-buttons-play");
    play.setAttribute("id", "linterna-magica-controls-button-play-"+lm_id);
    play.setAttribute("href", "#");
    play.setAttribute("title", this._("Play"));
    play.textContent = "Pa";
    return play;
}
LinternaMagica.prototype.play_button_click_event = function(event, element)
{
    event.preventDefault();
    element.style.setProperty("display", "none", "important");
    var id = element.getAttribute("id").
	replace(/linterna-magica-controls-button-play-/,"");
    var pause = document.getElementById("linterna-magica-controls-button-pause-"+id);
    pause.style.removeProperty("display");
    var self = this;
    this.player.play.apply(self, [id]);
    this.player_timers[id] = setInterval(
	function()
	{
	    self.ticker.apply(self, [id]);
	}, 500);
}
LinternaMagica.prototype.create_pause_button = function(object_data)
{
    var lm_id = object_data.linterna_magica_id;
    var pause = document.createElement("a");
    pause.setAttribute("class", "linterna-magica-controls-buttons "+
		       "linterna-magica-controls-buttons-pause");
    pause.setAttribute("id", "linterna-magica-controls-button-pause-"+lm_id);
    pause.setAttribute("href", "#");
    pause.setAttribute("title", this._("Pause"));
    pause.textContent ="Pa";
    return pause;
}
LinternaMagica.prototype.pause_button_click_event = function(event, element)
{
    event.preventDefault();
    element.style.setProperty("display", "none", "important");
    var id = element.getAttribute("id").
	replace(/linterna-magica-controls-button-pause-/,"");
    var play = document.getElementById("linterna-magica-controls-button-play-"+id);
    play.style.removeProperty("display");
    var self = this;
    this.player.pause.apply(self, [id]);
    clearInterval(self.player_timers[id]);
    delete this.player_timers[id];
}
LinternaMagica.prototype.create_time_slider = function(object_data)
{
    var lm_id = object_data.linterna_magica_id;
    var self = this;
    var time_slider_outer = document.createElement("div");
    time_slider_outer.setAttribute("title", this._("Time"));
    time_slider_outer.setAttribute("class",
			     "linterna-magica-controls-time-slider-outer-frame");
    time_slider_outer.setAttribute("id",
			     "linterna-magica-controls-time-slider-outer-frame-"+lm_id);
    var time_slider = document.createElement("div");
    time_slider.setAttribute("title", this._("Time"));
    time_slider.setAttribute("class",
			     "linterna-magica-controls-horizontal-slider");
    time_slider.setAttribute("id",
			     "linterna-magica-controls-time-slider-"+lm_id);
    var time_knob_move = null;
    var doc_dir = this.get_document_direction();
    if (doc_dir == "rtl" ||
	this.languages[this.lang].__direction == "rtl")
    {
	time_knob_move = "right";
    }
    else
    {
	time_knob_move = "left";
    }
    var progress_bar = document.createElement("div");
    progress_bar.setAttribute("title", this._("Time"));
    progress_bar.setAttribute("class", "linterna-magica-controls-horizontal-"+
			   "slider-progress-bar");
    progress_bar.setAttribute("id", "linterna-magica-controls-"+
			   "time-slider-progress-bar-"+lm_id);
    var time_knob = document.createElement("a");
    time_knob.setAttribute("title", this._("Time"));
    time_knob.setAttribute("class", "linterna-magica-controls-slider-knob");
    time_knob.setAttribute("id", "linterna-magica-controls-"+
			   "time-slider-knob-"+lm_id);
    time_knob.style.setProperty(time_knob_move, "0px", "important");
    time_knob.setAttribute("href", "#");
    time_slider.appendChild(time_knob);
    time_slider_outer.appendChild(progress_bar);
    time_slider_outer.appendChild(time_slider);
    return time_slider_outer;
}
LinternaMagica.prototype.time_slider_scroll_event = function (event, element)
{
    event.preventDefault();
    var self = this;
    var id = element.getAttribute("id").
	replace(/linterna-magica-controls-time-slider-outer-frame-/,"");
    var pos = this.slider_control.apply(self, [event]);
    if (pos.direction > 0)
    {
	this.player.forward.apply(self,[id,pos.val]);
    }
    else
    {
	this.player.rewind.apply(self,[id,pos.val]);
    }
}
LinternaMagica.prototype.time_slider_click_event = function (event, element)
{
    event.preventDefault();
    var self = this;
    var raw_id = element.getAttribute("id");
    var id = raw_id.split('-');
    id = id[id.length-1];
    if (!id)
    {
	return;
    }
    clearInterval(this.player_timers[id]);
    delete this.player_timers[id];
    var pos =  this.slider_control.apply(self, [event]);
    if (pos.direction > 0)
    {
	this.player.forward.apply(self,[id,pos.val]);
    }
    else
    {
	this.player.rewind.apply(self,[id,pos.val]);
    }
    this.player_timers[id] =
	setInterval(
	    function()
	    {
		self.ticker.apply(self,[id]);
	    }, 500);
}
LinternaMagica.prototype.create_volume_slider = function(object_data)
{
    var lm_id = object_data.linterna_magica_id;
    var self = this;
    var volume_slider_outer = document.createElement("div");
    volume_slider_outer.setAttribute("class", "linterna-magica-controls-volume-"+
				     "slider-outer-frame");
    volume_slider_outer.setAttribute("id", "linterna-magica-controls-"+
			       "volume-slider-outer-frame-"+lm_id);
    volume_slider_outer.setAttribute("title", this._("Volume control"));
    volume_slider_outer.style.setProperty("display", "none", "important");
    var volume_slider = document.createElement("div");
    volume_slider.setAttribute("class",
			       "linterna-magica-controls-horizontal-slider "+
			       "linterna-magica-controls-volume-slider");
    volume_slider.setAttribute("id", "linterna-magica-controls-"+
			       "volume-slider-"+lm_id);
    volume_slider.setAttribute("title", this._("Volume control"));
    var progress_bar = document.createElement("div");
    progress_bar.setAttribute("title", this._("Volume"));
    progress_bar.setAttribute("class", "linterna-magica-controls-horizontal-"+
			   "slider-progress-bar");
    progress_bar.setAttribute("id", "linterna-magica-controls-"+
			   "volume-slider-progress-bar-"+lm_id);
    var volume_knob_move = null;
    var doc_dir = this.get_document_direction();
    if (doc_dir == "rtl" ||
	this.languages[this.lang].__direction == "rtl")
    {
	volume_knob_move = "right";
    }
    else
    {
	volume_knob_move = "left";
    }
    var volume_knob = document.createElement("a");
    volume_knob.setAttribute("class", "linterna-magica-controls-slider-knob");
    volume_knob.setAttribute("id",
			     "linterna-magica-controls-"+
			     "volume-slider-knob-"+lm_id);
    volume_knob.style.setProperty(volume_knob_move, "0px", "important");
    volume_knob.setAttribute("href", "#");
    volume_knob.setAttribute("title", this._("Volume control"));
    volume_slider.appendChild(volume_knob);
    volume_slider_outer.appendChild(progress_bar);
    volume_slider_outer.appendChild(volume_slider);
    return volume_slider_outer;
}
LinternaMagica.prototype.volume_slider_scroll_event = function (event, element)
{
    event.preventDefault();
    var self = this;
    var id = element.getAttribute("id").
	replace(/linterna-magica-controls-volume-slider-/,"");
    event.preventDefault();
    var pos = self.slider_control.apply(self, [event]);
    this.player.set_volume.apply(self, [id, pos.val]);
}
LinternaMagica.prototype.volume_slider_click_event = function (event, element)
{
    event.preventDefault();
    var self = this;
    var id = element.getAttribute("id").
	replace(/linterna-magica-controls-volume-slider-outer-frame-/,"");
    event.preventDefault();
    var pos = self.slider_control.apply(self, [event]);
    this.player.set_volume.apply(self, [id, pos.val]);
}
LinternaMagica.prototype.create_mute_button = function(object_data)
{
    var lm_id = object_data.linterna_magica_id;
    var mute = document.createElement("a");
    mute.setAttribute("class", "linterna-magica-controls-buttons "+
		      "linterna-magica-controls-buttons-mute");
    mute.setAttribute("id", "linterna-magica-controls-button-mute-"+lm_id);
    mute.setAttribute("href", "#");
    mute.setAttribute("title", this._("Mute"));
    mute.textContent ="M";
    return mute;
}
LinternaMagica.prototype.mute_button_mouse_over_event = function (event, element)
{
    var self = this;
    var mute = element;
    var id = element.getAttribute("id").
	replace(/linterna-magica-controls-button-mute-/,"");
    var id_string = "linterna-magica-controls-volume-slider-outer-frame-"+id;
    var volume_slider = 
	document.getElementById(id_string);
    if (!volume_slider)
    {
	return null;
    }
    volume_slider.style.removeProperty("display");
}
LinternaMagica.prototype.mute_button_click_event = function (event, element)
{
    event.preventDefault();
    var self = this;
    var mute = element;
    var id = element.getAttribute("id").
	replace(/linterna-magica-controls-button-mute-/,"");
    var volume =
	this.player.toggle_mute.apply(self,[id]);
    var volume_slider =
	document.getElementById("linterna-magica-controls-"+
				"volume-slider-"+id);
    var volume_knob = 
	document.getElementById("linterna-magica-controls-"+
			    "volume-slider-knob-"+id);
    var volume_progress =
 	document.getElementById("linterna-magica-controls-"+
				"volume-slider-progress-bar-"+id);
    if (/M/i.test(mute.textContent))
    {
	mute.setAttribute("title", this._("Unmute"));
	mute.textContent = "U";
	mute.setAttribute("class",
			  "linterna-magica-controls-buttons "+
			  "linterna-magica-controls-"+
			  "buttons-unmute");
	volume_slider.setAttribute("title",this._("Muted"));
	volume_knob.setAttribute("title",this._("Muted"));
	mute.lm_volume_knob_direction = 
	    volume_knob.style.getPropertyValue('left') ? "left" : "right";
	mute.lm_volume_knob_position =
	    volume_knob.style.getPropertyValue(
		mute.lm_volume_knob_direction);
	volume_knob.style.setProperty(mute.lm_volume_knob_direction,
				      "0px", "important");
	volume_progress.style.setProperty("width", "0px", "important");
    }
    else
    {
	mute.setAttribute("title", this._("Mute"));
	mute.textContent = "M";
	mute.setAttribute("class", "linterna-magica-controls-buttons "+
			  "linterna-magica-controls-buttons-mute");
	volume_slider.setAttribute("title", this._("Volume control"));
	volume_knob.setAttribute("title", this._("Volume control"));
	volume_knob.style.setProperty(mute.lm_volume_knob_direction,
				      mute.lm_volume_knob_position,
				      "important");
	volume_progress.style.setProperty("width", 
					  (mute.lm_volume_knob_position ? 
					   parseInt(mute.lm_volume_knob_position)+3 :
					   0)+"px",
					  "important");
    }
}
LinternaMagica.prototype.volume_slider_hide_event = function(event, element)
{
    if (!element.hasAttribute('id'))
    {
 	return null;
    }
    var id = element.getAttribute("id").split('-');
    id = id[id.length-1];
    var volume_slider = 
	document.getElementById("linterna-magica-controls-"+
				"volume-slider-outer-frame-"+id);
    if (!volume_slider)
    {
	return null;
    }
    volume_slider.style.setProperty("display", "none", "important");
}
LinternaMagica.prototype.create_fullscreen_button = function(object_data)
{
    var lm_id = object_data.linterna_magica_id;
    var fullscreen = document.createElement("a");
    fullscreen.setAttribute(
	"class", "linterna-magica-controls-buttons "+
	    "linterna-magica-controls-buttons-fullscreen");
    fullscreen.setAttribute("id", 
			    "linterna-magica-controls-button-fullscreen-"+lm_id);
    fullscreen.setAttribute("href", "#");
    fullscreen.setAttribute("title", this._("Fullscreen"));
    fullscreen.textContent ="Fs";
    return fullscreen;
}
LinternaMagica.prototype.fullscreen_button_click_event = function (event, element)
{
    event.preventDefault();
    var id = element.getAttribute("id").
	replace(/linterna-magica-controls-button-fullscreen-/,"");
    var self = this;
    this.player.fullscreen.apply(self, [id]);
}
LinternaMagica.prototype.create_toggle_plugin_link =
function(not_in_header,id,switch_type)
{
    var toggle_plugin = document.createElement("a");
    var self = this;
    var wrapper = null;
    toggle_plugin.setAttribute("href", "#");
    if (not_in_header)
    {
	toggle_plugin.setAttribute("class", "linterna-magica-toggle-plugin");
    }
    var toggle_plugin_click_function = function(ev)
    {
	var el = this;
	self.toggle_plugin.apply(self, [ev, el]);
    };
    toggle_plugin.addEventListener("click",
				   toggle_plugin_click_function, false);
    if (not_in_header)
    {
	toggle_plugin.textContent = "Linterna Mágica >>";
	toggle_plugin.setAttribute("id", 
				   "linterna-magica-toggle-plugin-"+id);
	var span = document.createElement("span");
	span.setAttribute("class", "linterna-magica-toggle-plugin-outer-frame");
	span.appendChild(toggle_plugin);
	wrapper = document.createElement("p");
	wrapper.appendChild(span);
	wrapper.setAttribute("class", "linterna-magica-toggle-plugin-wrapper");
    }
    else
    {
	if (/html5/i.test(switch_type))
	{
	    toggle_plugin.textContent = this._("HTML5");
	}
	else
	{
	    toggle_plugin.textContent = this._("Plugin");
	}
	toggle_plugin.setAttribute("class", 
				   "linterna-magica-toggle-plugin-header");
	toggle_plugin.setAttribute("id", 
				   "linterna-magica-toggle-plugin-header-"+id);
    }
    if (/html5/i.test(switch_type))
    {
	var title = this.
	    _("Switch between site's HTML5 player and Linterna Mágica");
	toggle_plugin.setAttribute("title", title);
    }
    else
    {
	var flash_mime_type = navigator.mimeTypes['application/x-shockwave-flash'];
	var flash_plugin = flash_mime_type.enabledPlugin ? 
	    flash_mime_type.enabledPlugin.filename : '';
	var title = this.
	    _("Switch between flash plugin and Linterna Mágica");
	if (/gnash/i.test(flash_plugin))
	{
	    title = this.
		_("Switch between the Gnash plugin for flash and Linterna Mágica");
	}
	else if (/lightspark/i.test(flash_plugin))
	{
	    title = this.
		_("Switch between the Lightspark plugin for flash and Linterna Mágica");
	}
	else if (/totem-vegas/i.test(flash_plugin))
	{
	    title = this.
		_("Switch between the Totem Vegas plugin for flash and Linterna Mágica");
	}
	toggle_plugin.setAttribute("title",title);
    }
    return wrapper ? wrapper : toggle_plugin;
}
LinternaMagica.prototype.toggle_plugin = function(event,element)
{
    event.preventDefault();
    var linterna_magica_id = element.getAttribute("id");
    linterna_magica_id = linterna_magica_id.split("-");
    linterna_magica_id = linterna_magica_id[linterna_magica_id.length-1];
    var lm_interface =
	document.getElementById("linterna-magica-"+linterna_magica_id);
    if (!lm_interface)
    {
	return null;
    }
    var html5_parent = null;
    var site_player = 
	this.get_flash_video_object(linterna_magica_id,
				    lm_interface.parentNode);
    if (!site_player)
    {
	html5_parent = lm_interface.parentNode;
	site_player = 
	    this.find_site_html5_player_wrapper(html5_parent);
	if (!site_player)
	{
	    return null;
	}
    }
    if (!site_player.style.getPropertyValue("display") &&
	lm_interface.style.getPropertyValue("display"))
    {
	this.log("LinternaMagica.toggle_plugin:\n"+
		 "Replacing/hiding swf object (id:"+
		 linterna_magica_id+
		 ") with video object.", 4);
	if (!html5_parent)
	{
	    this.hide_flash_video_object(linterna_magica_id, 
					 site_player.parentNode);
	}
	else
	{
	    this.pause_site_html5_player(html5_parent);
	    this.hide_site_html5_player(html5_parent);
	}
	this.show_lm_interface(linterna_magica_id);
	if (this.controls)
	{
	    this.player.init.apply(this,[linterna_magica_id]);
	}
	var ext_toggle_wrapper = lm_interface.nextSibling;
	ext_toggle_wrapper.style.setProperty("display", "none", "important");
    }
    else if (!lm_interface.style.getPropertyValue("display") &&
	     site_player.style.getPropertyValue("display"))
    {
	this.log("LinternaMagica.toggle_plugin:\n"+
		 "Replacing/hiding video object (id:"+
		 linterna_magica_id+
		 ") with swf object.", 4);
	if (!html5_parent)
	{
	    this.show_flash_video_object(linterna_magica_id, 
					 site_player.parentNode);
	}
	else
	{
	    this.show_site_html5_player(html5_parent);
	}
	var about = document.getElementById("linterna-magica-about-box-"+
					    linterna_magica_id);
	var update_info =
	    document.getElementById("linterna-magica-update-info-box-"+
				    linterna_magica_id);
	if (about && !about.style.display)
	{
	    this.about(null, about);
	}
	if (update_info && !update_info.style.display)
	{
	    this.show_or_hide_update_info(null, update_info);
	}
	this.hide_lm_interface(linterna_magica_id);
	var ext_toggle_wrapper = lm_interface.nextSibling;
	ext_toggle_wrapper.style.removeProperty("display");
    }
}
LinternaMagica.prototype.create_checker_frame = function(data)
{
    if (!data || typeof(data) != "object")
    {
	return null;
    }
    if (!data.parser_timeout)
    {
	data.parser_timeout_counter = 0;
	var self = this;
	data.parser_timeout = 
	    setInterval(function()
			{
			    self.jsonp_data_parser.apply(self,[data]);
			}, 10);
    }
    var checker_frame = document.createElement("object");
    checker_frame.setAttribute("id", data.frame_id);
    var frame_script = function()
    {
	window[jsonp_function] = function (request_data)
	{
	    var hash = /#/i.test(receiver_location) ? "" : "#";
	    var data = json_parser.json_to_string(request_data);
	    data = encodeURI(data);
	    var packed_data = btoa(data);
	    window.parent.location = decodeURI(receiver_location)+hash+
		encodeURI("&linterna_magica&lm_request_data="+
			  packed_data+
			  "&linterna_magica");
	};
    };
    var frame_data = 
	"<html><head>"+
	"<script async='async' defer='defer' type='text/javascript'>"+
	"var json_parser = new Object(); json_parser.json_to_string = "+
	this.json_to_string.toString()+"; "+
	"var jsonp_function ='"+data.jsonp_function+"'; "+
	"var receiver_location='"+
	encodeURI(window.location)+"';("+frame_script.toString()+")();"+
	"</script>"+
	"<script async='async' defer='defer' type='text/javascript' src='"+
	data.jsonp_script_link+"'>"+
	"</script>"+
	"</head><body></body></html>";
    checker_frame.setAttribute("data",
			       "data:text/html;charset=UTF-8;base64,"+
			       btoa(frame_data));
    checker_frame.setAttribute("width","1px");
    checker_frame.setAttribute("height", "1px");
    document.getElementsByTagName("body")[0].appendChild(checker_frame);
}
LinternaMagica.prototype.jsonp_data_parser = function(data)
{
    if (!data || typeof(data) !== "object")
    {
	return null;
    }
    data.parser_timeout_counter++;
    if (data.parser_timeout_counter >= 10000)
    {
	clearInterval(data.parser_timeout);
    }
    if (/linterna_magica/i.test(window.location))
    {
	clearInterval(data.parser_timeout);
	var jsonp_data  = 
	    window.location.toString().split("&linterna_magica");
	history.go(-1);
	var o = document.getElementById(data.frame_id);
	if (o)
	{
	    o.parentNode.removeChild(o);
	}
	jsonp_data = jsonp_data[1].split("lm_request_data=")[1].split("&")[0];
	jsonp_data = this.string_to_json(decodeURI(atob(jsonp_data)));
	data.parser_function.apply(this, [jsonp_data, data.user_data]);
    }
}
LinternaMagica.prototype.json_to_string = function (json_object)
{
    var json_as_string = null;
    if (typeof(JSON) == "object" &&
	typeof(JSON.stringify) == "function")
    {
	try
	{
	    json_as_string = JSON.stringify(json_object);
	}
	catch(e)
	{
	}
    }
    return json_as_string;
}
LinternaMagica.prototype.string_to_json = function (json_string)
{
    var json_object = null;
    if (typeof(JSON) == "object" &&
	typeof(JSON.parse) == "function")
    {
	try
	{
	    json_object  = JSON.parse(json_string)
	}
	catch(e)
	{
	}
    }
    return json_object;
}
LinternaMagica.prototype._ = function (string)
{
    if (this.lang == "C")
    {
	return string;
    }
    var use_lang = this.languages[this.lang];
    return use_lang ? 
	use_lang[string] ? use_lang[string] : string : string ;
}
LinternaMagica.prototype.N_ = function (string)
{
    return this._(string);
}
LinternaMagica.prototype.set_env_lang = function()
{
    var env_lang = navigator.language.replace("-", "_");
    if (env_lang.toLowerCase() == "c")
    {
	env_lang = "en_US";
    }
    if(!/[a-zA-Z]{2}(_|-)[a-zA-Z]{2}/.test(env_lang))
    {
	env_lang = env_lang.toLowerCase()+"_"+
	    env_lang.toUpperCase();
    }
    env_lang = env_lang.split(/_/);
    env_lang[env_lang.length-1] = 
	env_lang[env_lang.length-1].toUpperCase();
    env_lang[0] = 
	env_lang[0].toLowerCase();
    env_lang = env_lang.join("_");
    this.env_lang = env_lang;
}
LinternaMagica.prototype.get_document_direction = function()
{
    var html = document.getElementsByTagName("html");
    var dir = html[0].hasAttribute("dir") ? 
	html[0].getAttribute("dir") : null;
    if (!dir)
    {
	var body = document.getElementsByTagName("body");
	dir = body[0].hasAttribute("dir") ? 
	    body[0].getAttribute("dir") : null;
    }
    if (!dir || (dir.toLowerCase() !== "rtl" &&
		 dir.toLowerCase() !== "ltr"))    {
	dir = "ltr";
    }
    return dir.toLowerCase();
}
LinternaMagica.prototype.log = function(message, level)
{
    if (!this.debug_level || this.disabled_log)
    {
	return;
    }
    if (!level)
    {
	level = 1;
    }
    if (this.debug_level >= level)
    {
	var date = new Date();
	var str =  [date.getHours(), date.getMinutes(),
		    date.getSeconds(), date.getMilliseconds()].join(":");
	var host_get = window.self;
	var host = host_get.location.hostname;
	var indent = "";
	if (this.log_to != "web")
	{
	    for (var i=0, l=level; i<l; i++)
	    {
		indent += "\t";
	    }
	}
	var log_string = message + " at "+host + " time: "+str;
	var level_string =  " ("+level+") ";
	log_string = log_string.replace(/^/g, indent+level_string).
	    replace(/\n/g, "\n"+indent+level_string);
	try
	{
 	    if (this.log_to == "web")
 	    {
 		var row = document.createElement('p');
 		row.setAttribute("class", 
				 "linterna-magica-log-to-web-message");
		var lines = log_string.split(/\n/);
 		var t = document.createTextNode(lines[0]);
 		row.appendChild(t);
		for (var i=1,l=lines.length; i<l; i++)
		{
		    var span = document.createElement("span");
		    var t = document.createTextNode(lines[i]);
		    span.appendChild(t);
		    row.appendChild(span);
		}
		row.style.setProperty("margin-left", 
				      parseInt(3.5*level)+"px", "important");
		var bg_color = parseInt(136 - 32*level);
		row.style.setProperty("background-color", 
				      "rgb("+bg_color+","+bg_color+","+
				      bg_color+")", "important");
 		this.logger.appendChild(row);
 	    }
 	    else
 	    {
 		throw "Log to web not selected.";
 	    }
	}
	catch(e)
	{
	    try
	    {
		console.log(log_string);
	    }
	    catch(e)
	    {
		this.disabled_log = true;
	    }
	}
    }
}
LinternaMagica.prototype.create_web_logger = function()
{
    var logger = document.createElement("div");
    logger.setAttribute("id", "linterna-magica-web-log");
    logger.setAttribute("class", "linterna-magica-web-log");
    if (!logger)
    {
	this.log("LinternaMagica.create_web_logger:\n"+
		 "Unable to create web log. Will log to console.",1);
	return null;
    }
    var debug_button = document.createElement("p");
    debug_button.setAttribute('class', 'linterna-magica-web-log-debug-button-wrap');
    debug_button.setAttribute('id', 'linterna-magica-web-log-debug-button-wrap');
    var logo = this.create_web_log_link();
    logo.textContent = '';
    logo.setAttribute('class',
		      'linterna-magica-web-log-debug-button');
    debug_button.appendChild(logo);
    logo.addEventListener('click', this.show_or_hide_web_log, true);
    var bug = document.createElement('span');
    bug.setAttribute('class', 'linterna-magica-web-log-debug-button-bug');
    logo.appendChild(bug);
    var close = this.create_web_log_close_link();
    close.setAttribute('class',
		       'linterna-magica-web-log-debug-button-close');
    debug_button.appendChild(close);
    close.addEventListener('click', this.remove_web_log, true);
    document.body.appendChild(debug_button);
    var header = document.createElement("div");
    header.setAttribute("class",
			"linterna-magica-web-log-header");
    header.setAttribute('title', this._("Double-click to change the size"));
    var p = document.createElement("p");
    var bug_header = this.create_web_log_link();
    bug_header.setAttribute("class", 
			  "linterna-magica-web-log-link "+
			   " linterna-magica-web-log-left-buttons");
    bug_header.setAttribute('title', this._("Click to change the size"));
    bug_header.addEventListener('click',this.change_web_log_height, false);
    p.appendChild(bug_header);
    var txt = document.createTextNode(this._(
	"Linterna Mágica error and debug messages"));
    p.appendChild(txt);
    header.appendChild(p);
    var close = this.create_web_log_close_link();
    p.appendChild(close);
    close.addEventListener("click", this.remove_web_log, false);
    var collapse_log = document.createElement("a");
    collapse_log.textContent="-";
    collapse_log.setAttribute("href", "#");
    collapse_log.setAttribute("title", this._("Hide debug messages"));
    collapse_log.setAttribute("class", "linterna-magica-web-log-collapse "+
			      " linterna-magica-web-log-right-buttons");
    p.appendChild(collapse_log);
    collapse_log.addEventListener("click",
				   this.show_or_hide_web_log, false);
    header.addEventListener('dblclick',this.change_web_log_height, false);
    logger.appendChild(header);
    var body  = document.createElement("div");
    body.setAttribute("id", "linterna-magica-web-log-messages");
    body.setAttribute("class", "linterna-magica-web-log-messages");
    body.setAttribute('title',
		      this._("Ctrl+double-click to select all messages"));
    var self = this;
    var body_click_function = function(ev)
    {
	var el = this;
	self.select_all_text_in_element.apply(self, [ev, el]);
    };
    body.addEventListener('dblclick',body_click_function, true);
    logger.appendChild(body);
    this.logger = body;
    this.logger_with_header = logger;
    if (this.web_log_expand)
    {
	debug_button.style.setProperty("display", "none", "important");
	logger.style.removeProperty("display");
    }
    else
    {
	logger.style.setProperty("display", "none", "important");
	debug_button.style.removeProperty("display");
    }
    return logger;
}
LinternaMagica.prototype.create_web_log_link = function()
{
    var log_link = document.createElement("a");
    log_link.setAttribute("title",
			  this._("Linterna Mágica error and debug messages"));
    log_link.setAttribute("href", "#");
    log_link.textContent = this._("Debug messages");
    return log_link;
}
LinternaMagica.prototype.create_web_log_close_link = function()
{
    var close = document.createElement("a");
    close.textContent="x";
    close.setAttribute("href", "#");
    close.setAttribute("class", "linterna-magica-web-log-close "+
		       " linterna-magica-web-log-right-buttons");
    close.setAttribute("title", this._("Remove log"));
    return close;
}
LinternaMagica.prototype.show_or_hide_web_log = function(event, element)
{
    event.preventDefault();
    var logger = document.getElementById('linterna-magica-web-log');
    var debug_button = document.
	getElementById('linterna-magica-web-log-debug-button-wrap');
    if (!logger || !debug_button)
    {
	return null;
    }
    var visible_logger = logger.style.getPropertyValue('display');
    if (visible_logger)
    {
	debug_button.style.setProperty("display", "none", "important");
	logger.style.removeProperty("display");
    }
    else
    {
	logger.style.setProperty("display", "none", "important");
	debug_button.style.removeProperty("display");
    }
}
LinternaMagica.prototype.remove_web_log = function(event, element)
{
    var logger = document.getElementById('linterna-magica-web-log');
    var debug_button = document.
	getElementById('linterna-magica-web-log-debug-button-wrap');
    if (!logger || !debug_button)
    {
	return null;
    }
    debug_button.parentNode.removeChild(debug_button);
    logger.parentNode.removeChild(logger);
    var log_buttons = document.querySelectorAll('.linterna-magica-web-log-link');
    for(var i=0, l=log_buttons.length; i<l; i++)
    {
	var link = log_buttons[i];
	link.parentNode.removeChild(link);
    }
}
LinternaMagica.prototype.change_web_log_height = function(event, element)
{
    var logger = document.getElementById('linterna-magica-web-log');
    var body = document.getElementById('linterna-magica-web-log-messages');
    if(!logger || !body)
    {
	return null;
    }
    var is_max = logger.style.getPropertyValue('height');
    if (is_max)
    {
	logger.style.removeProperty('height');
	body.style.removeProperty('height');
    }
    else
    {
	logger.style.setProperty('height', '93%', 'important');
	body.style.setProperty('height', '93%', 'important');
    }
}
LinternaMagica.prototype.select_all_text_in_element =
function(event, element)
{
    if (!window.getSelection)
    {
	this.tripple_click = 0;
	return null;
    }
    if (event.ctrlKey)
    {
	var range = document.createRange();
	range.selectNode(element);
	window.getSelection().addRange(range);
    }
}
LinternaMagica.prototype.player.set_player_name = function(id)
{
    var name = null;
    var video_object = this.get_video_object(id);
    if (!video_object)
    {
	return null;
    }
    var mimeTypes = navigator.mimeTypes;
    var mime = mimeTypes[video_object.getAttribute("type")];
    if (mime && mime.enabledPlugin && mime.enabledPlugin.name)
    {
	name =mime.enabledPlugin.name;
    }
    else
    {
	name = "unknown";
    }
    if(name)
    {
	this.log("LinternaMagica.player.set_player_name:\n"+
		 "Name set to "+name,3);
	video_object.lm_player_name = name;
    }
    return name;
}
LinternaMagica.prototype.get_player_name = function(id)
{
    var name = null;
    var video_object = this.get_video_object(id);
    if (video_object)
    {
	name = video_object.lm_player_name;
    }
    return name;
}
LinternaMagica.prototype.player.state = function(id)
{
    var video_object = this.get_video_object(id);
    var player_name = this.get_player_name(id);
    if (!video_object || !player_name)
    {
	return null;
    }
    var time = new Object();
    time.duration = null;
    time.position = null;
    time.string = "--:--:--";
    if (/gecko-mediaplayer/.test(player_name))
    {
	switch(video_object.playState)
	{
	case 0:
	    time.state = this._("Loading");
	    break;
	case  6:
	    time.state = this._("Buffering");
	    break;
	}
	if (!time.state)
	{
	    try
	    {
		time.position = video_object.getTime();
		time.duration = video_object.getDuration();
		time.percent = video_object.getPercent();
	    }
	    catch(e)
	    {
		return null;
	    }
	}
    }
    else if (/vlc/i.test(player_name))
    {
	if (video_object.input)
	{
	    switch (video_object.input.state)
	    {
	    case 0:
		time.state = this._("Loading");
		break;
	    case 2:
		time.state = this._("Buffering");
		break;
	    }
	}
	if (!time.state && video_object.input)
	{
	    try
	    {
		time.position = video_object.input.time/1000;
		time.duration = video_object.input.length/1000;
		time.percent = (time.position/time.duration);
		time.percent = time.percent ? time.percent : 0;
	    }
	    catch(e)
	    {
		return null;
	    }
	}
    }
    else if (/xine/i.test(player_name))
    {
	try
	{
	    var state = video_object.controls.GetPlayState();
	    if (state !== 4 && state !== 3)
		time.state = this._("Loading");
	}
	catch(e)
	{
	    return null;
	}
	if (!time.state)
	{
	    try
	    {
		time.position = video_object.controls.GetPosition()/1000;
		time.duration = video_object.controls.GetLength()/1000;
		time.percent =  (time.position/time.duration);
		time.percent = time.percent ? time.percent : 0;
	    }
	    catch(e)
	    {
		return null;
	    }
	}
    }
    else if (/quicktime plug-in/i.test(player_name))
    {
	var status;
	try
	{
	   status = video_object.GetPluginStatus();
	}
	catch(e)
	{
	    status ="NOT_READY";
	}
	switch(status)
	{
	case "Loading":
	case "Waiting":
	    time.state = this._("Loading");
	    break;
	case "NOT_READY":
	    time.state = this._("Waiting plugin");
	    break;
	}
	if (!time.state)
	{
	    try
	    {
		time.position = video_object.GetTime()/1000;
		time.duration = video_object.GetDuration()/1000;
		time.percent = (time.position/time.duration);
		time.percent = time.percent ? time.percent : 0;
	    }
	    catch(e)
	    {
		return null;
	    }
	}
    }
    if (time.state)
    {
	var dots = Math.random()*7;
	for (var d=0; d <dots ; d ++)
	{
	    time.state += ".";
	}
    }
    var sec_pos = Math.round(time.position) % 60;
    var min_pos = Math.floor(time.position / 60) % 60;
    var hour_pos = Math.floor(time.position / 3600);
    var sec_dur = Math.round(time.duration) % 60;
    var min_dur = Math.floor(time.duration / 60) % 60;
    var hour_dur = Math.floor(time.duration / 3600);
    time.string = (hour_pos ?
		   (hour_pos+":") : "")+
	(min_pos+":")+
	((sec_pos<10)?"0"+sec_pos:sec_pos) +" / "+
	(hour_dur ? (hour_dur+":") : "") +
	(min_dur+":")+
	((sec_dur<10)?"0"+sec_dur:sec_dur);
    return time;
}
LinternaMagica.prototype.player.pause = function(id)
{
    var video_object = this.get_video_object(id);
    var player_name = this.get_player_name(id);
    if (!video_object || !player_name)
    {
	return null;
    }
    if (/gecko-mediaplayer/.test(player_name))
    {
    	video_object.Pause();
    }
    else if (/vlc/i.test(player_name))
    {
	video_object.playlist.togglePause();
    }
    else if (/xine/i.test(player_name))
    {
	video_object.controls.pause();
    }
    else if (/quicktime plug-in/i.test(player_name))
    {
	video_object.Stop();
    }
}
LinternaMagica.prototype.player.play = function(id)
{
    var video_object = this.get_video_object(id);
    var player_name = this.get_player_name(id);
    if (!video_object || !player_name)
    {
	return null;
    }
    if (/gecko-mediaplayer/.test(player_name) ||
	/totem/.test(player_name))
    {
	video_object.Play();
    }
    else if (/vlc/i.test(player_name))
    {
	video_object.playlist.play();
    }
    else if (/xine/i.test(player_name))
    {
	video_object.controls.play();
    }
    else if (/quicktime plug-in/i.test(player_name))
    {
	video_object.Play();
    }
}
LinternaMagica.prototype.player.stop = function(id)
{
    var video_object = this.get_video_object(id);
    var player_name = this.get_player_name(id);
    if(!video_object || !player_name)
    {
	return null;
    }
    if (/gecko-mediaplayer/.test(player_name))
    {
	video_object.Stop();
    }
    else if (/vlc/i.test(player_name))
    {
	if (video_object.playlist)
	{
	    video_object.playlist.stop();
	}
    }
    else if (/xine/i.test(player_name))
    {
	video_object.controls.stop();
    }
    else if (/quicktime plug-in/i.test(player_name))
    {
	video_object.Rewind();
    }
}
LinternaMagica.prototype.player.forward = function(id,time)
{
    var video_object = this.get_video_object(id);
    var player_name = this.get_player_name(id);
    if (!video_object || !player_name)
    {
	return null;
    }
    if (!time)
    {
	time = 10000;
    }
    if (/gecko-mediaplayer/.test(player_name) ||
	/quicktime plug-in/i.test(player_name))
    {
	if (/%/.test(time))
	{
	    time = parseInt((parseInt(time)* (
		    /quicktime/i.test(player_name) ?
		    video_object.GetDuration() :
		    video_object.getDuration())/100));
	}
	else
	{
	    time = ((/quicktime/i.test(player_name) ?
		     video_object.GetTime() :
		     video_object.getTime())
		    +time/1000);
	}
	if (/gecko-mediaplayer/.test(player_name))
	{
	    video_object.Seek(time);
	}
	else if (/quicktime plug-in/i.test(player_name))
	{
	    video_object.SetTime(time);
	}
    }
    else if (/vlc/i.test(player_name))
    {
	if (/%/.test(time))
	{
	    time = parseInt((parseInt(time)*video_object.input.length)/100);
	}
	else
	{
	    time = video_object.input.time+time;
	}
	video_object.input.time = time;
    }
    else if (/xine/i.test(player_name))
    {
	if (/%/.test(time))
	{
	    time = parseInt((parseInt(time)*
			     video_object.controls.GetPosition())/100);
	}
	else
	{
	    time = video_object.controls.GetPosition() + time;
	}
	video_object.controls.SetPosition(time);
    }
}
LinternaMagica.prototype.player.rewind = function(id,time)
{
    var video_object = this.get_video_object(id);
    var player_name = this.get_player_name(id);
    if (!video_object || !player_name)
    {
	return null;
    }
    if (!time)
	time = 10000;
    if (/gecko-mediaplayer/.test(player_name)
	|| /quicktime plug-in/i.test(player_name))
    {
	if (/%/.test(time))
	{
	    time = parseInt((parseInt(time)* (
		    /quicktime/i.test(player_name) ?
		    video_object.GetDuration() :
		    video_object.getDuration())/100));
	}
	else
	{
	    time = ((/quicktime/i.test(player_name) ?
		     video_object.GetTime() :
		     video_object.getTime())
		    +time/1000);
	}
	if (/gecko-mediaplayer/.test(player_name))
	{
	    video_object.Seek(time);
	}
	else if (/quicktime plug-in/i.test(player_name))
	{
	    video_object.SetTime(time);
	}
    }
    else if (/vlc/i.test(player_name))
    {
	if (/%/.test(time))
	{
	    time = parseInt((parseInt(time)*video_object.input.length)/100);
	}
	else
	{
	    time = video_object.input.time-time;
	}
	video_object.input.time = time;
    }
    else if (/xine/i.test(player_name))
    {
	if (/%/.test(time))
	{
	    time = parseInt((parseInt(time)*
			     video_object.controls.GetPosition())/100);
	}
	else
	{
	    time = video_object.controls.GetPosition() - time;
	}
	video_object.controls.SetPosition(time);
    }
}
LinternaMagica.prototype.player.fullscreen = function(id)
{
    var video_object = this.get_video_object(id);
    var player_name = this.get_player_name(id);
    if (!video_object || !player_name)
    {
	return null;
    }
    if (/gecko-mediaplayer/.test(player_name))
    {
	video_object.fullscreen = true;
	video_object.ShowControls = true;
    }
    else if (/vlc/i.test(player_name))
    {
	video_object.video.toggleFullscreen();
    }
}
LinternaMagica.prototype.player.set_volume = function (id, volume)
{
    var video_object = this.get_video_object(id);
    var player_name = this.get_player_name(id);
    if (!video_object || !player_name)
    {
	return null;
    }
    volume  = parseInt(volume.replace(/%/,""));
    if (/gecko-mediaplayer/.test(player_name))
    {
	video_object.SetVolume(volume);
    }
    else if (/vlc/i.test(player_name))
    {
	video_object.audio.volume = volume;
    }
    else if (/quicktime plug-in/i.test(player_name))
    {
	video_object.SetVolume(parseInt(255*volume/100));
    }
}
LinternaMagica.prototype.player.toggle_mute = function (id)
{
    var video_object = this.get_video_object(id);
    var player_name = this.get_player_name(id);
    if (!video_object || !player_name)
    {
	return null;
    }
    var vol = null;
    if (/gecko-mediaplayer/.test(player_name) ||
	/quicktime plug-in/i.test(player_name))
    {
	if (!video_object.lm_player_volume)
	{
	    vol = video_object.GetVolume();
	    video_object.lm_player_volume = vol;
	    video_object.SetVolume(0);
	}
	else
	{
	    vol = video_object.lm_player_volume;
	    video_object.SetVolume(parseInt(vol));
	    delete video_object.lm_player_volume;
	    if (/quicktime/i.test(player_name))
		vol = parseInt(vol * 100/255);
	}
    }
    else if (/vlc/i.test(player_name))
    {
	video_object.audio.toggleMute();
	vol = video_object.audio.volume;
    }
    return vol ? vol+"%" : "--" ;
}
LinternaMagica.prototype.slider_control = function(event)
{
    var knob  = null;
    var slider = null;
    var progress = null;
    if (event.target.nodeType == 3)
    {
	slider = event.target.parentNode.parentNode;
	knob = slider.getElementsByTagName("a")[0];
    }
    if (/span/i.test(event.target.localName))
    {
	slider = event.target.parentNode;
	knob =  slider.getElementsByTagName("a")[0];
    }
    else if (/a/i.test(event.target.localName))
    {
	knob = event.target;
	slider = knob.parentNode;
    }
    else if (/div/i.test(event.target.localName))
    {
	knob = event.target.
	    getElementsByTagName("a")[0];
	slider = event.target;
    }
    progress = slider.previousSibling;
    if (!knob)
    {
	return null;
    }
    var move = null;
    var doc_dir =  this.get_document_direction();
    if (doc_dir == "rtl" ||
	this.languages[this.lang].__direction == "rtl")
    {
	move = "right";
    }
    else
    {
	move = "left";
    }
    var old_position = parseInt(knob.style.getPropertyValue(move));
    var direction = 0;
    var position = old_position;
    var offset_left = 0;
    var obj = slider;
    if (obj.offsetParent) {
	do {
	    offset_left += obj.offsetLeft;
	} while (obj = obj.offsetParent);
    }
    if (event.type == "mousewheel")
    {
	direction = event.wheelDelta;
    }
    else if(event.type == "DOMMouseScroll")
    {
	direction = -event.detail;
    }
    if (direction < 0)
    {
	position = parseInt(old_position - (slider.clientWidth*10/100));
    }
    else if (direction > 0)
    {
	position = parseInt(old_position + (slider.clientWidth*10/100));
    }
    if (event.type == "click" ||
	event.type == "mousemove")
    {
	if (/^a$/i.test(event.target.localName))
	{
	    position = old_position;
	}
	else
	{
	    position = event.pageX -
		offset_left-
		knob.clientWidth/2;
	    if (move == "right")
	    {
		position = Math.abs(position- slider.clientWidth);
	    }
	    if (position > old_position)
	    {
		direction = 1;
	    }
	    else
	    {
		direction = -1;
	    }
	}
    }
    else if (event.type == "mousedown" &&
	     /a/i.test(event.target.localName))
    {
	var self = this;
	var mouse_up_listener = function(ev)
	{
	    slider.removeEventListener(
		"mousemove",
		mouse_move_listener,
		false);
	    knob.removeEventListener(
		"mouseup",
		mouse_up_listener,
		false);
	};
	var mouse_move_listener = function(ev)
	{
	    self.slider_control.apply(self,[ev]);
	};
	slider.addEventListener("mousemove",mouse_move_listener,false);
	knob.addEventListener("mouseup",mouse_up_listener, false);
    }
    if ((position+knob.clientWidth) > slider.clientWidth)
    {
	if (direction > 0) {
	    position = slider.clientWidth - knob.clientWidth;
	}
    }
    if (position < 0)
    {
	position = 0;
    }
    knob.style.setProperty(move,
			   position +"px",
			   "important");
    progress.style.setProperty("width",
			   (position ? 
			    position+3:0) +"px",
			   "important");
    var percent = (parseInt((
	position/(slider.clientWidth-knob.clientWidth))*100));
    if (percent > 100)
    {
	percent = 100;
    }
    var return_data = new Object();
    return_data.val = percent +"%";
    return_data.direction = direction;
    return return_data;
}
LinternaMagica.prototype.ticker = function(id)
{
    var self = this;
    var time_and_state = self.player.state.
	apply(self,[id]);
    if (!time_and_state)
    {
	return;
    }
    if ((time_and_state.position && time_and_state.duration) &&
	(time_and_state.position >= time_and_state.duration))
    {
	clearInterval(self.player_timers[id]);
	delete self.player_timers[id];
	return;
    }
    var time_text = document.
	getElementById("linterna-magica-controls-time-slider-text-"+id);
    if (!time_and_state.state)
    {
	time_text.textContent =time_and_state.string;
    }
    else
    {
	time_text.textContent = time_and_state.state;
    }
    var progress_bar  = document.
	getElementById("linterna-magica-controls-time-"+
		       "slider-progress-bar-"+id);
    var knob  = document.
	getElementById("linterna-magica-controls-time-slider-knob-"+id);
    if (knob)
    {
	var move = null;
	if (this.languages[this.lang].__direction == "ltr" ||
	    this.languages[this.lang].__direction !== "rtl")
	{
	    move = "left";
	}
	else if (this.languages[this.lang].__direction == "rtl")
	{
	    move = "right";
	}
	var slider = knob.parentNode;
	var pos = parseInt(slider.clientWidth *
			   time_and_state.percent);
	if (pos > (slider.clientWidth-knob.clientWidth))
	{
	    pos = slider.clientWidth - knob.clientWidth;
	}
	knob.style.setProperty(move,
			       pos+"px",
			       "important");
	progress_bar.style.setProperty("width",
				       (pos+3)+"px",
			       "important");
    }
}
LinternaMagica.prototype.remove_plugin_install_warning = function(element)
{
    if (!element || typeof(element) != 'object')
    {
	return;
    }
    var teaser = document.getElementById("flash_teaser");
    if (teaser)
    {
	teaser.parentNode.removeChild(teaser);
    }
    var f10 = document.getElementById("flash10-promo-div");
    if (f10)
    {
	f10.parentNode.removeChild(f10);
    }
    var text_re = new RegExp (
	".*(flash|flash(\\\s*)player|shockwave).*",
	"i");
    var remove;
    var node = element.firstChild;
    var new_node = null;
    while (node)
    {
	remove = false;
	var size = null;
	try {
	    size = (new XMLSerializer().serializeToString(node)).length;
	}
	catch(e)
	{
	    continue;
	}
	if (size > 5120)
	{
	    node = node.nextSibling || null;
	    continue;
	}
	this.log("LinternaMagica.remove_plugin_install_warning:\n"+
		 "elements "+element.childNodes.length+
		 " node "+node,5);
	if (node.nextSibling)
	{
	    new_node = node.nextSibling;
	}
	else
	{
	    new_node = null;
	}
	if ( node.nodeType ==3 ||
	     (node.localName && node.localName.toLowerCase() != "object" &&
	      node.localName.toLowerCase() != "embed" ))
	{
	    this.log("LinternaMagica.remove_plugin_install_warning:\n"+
		     "Cheking node "+node,4);
	    if (node.textContent.match(text_re) ||
		(node.innerHTML && node.innerHTML.match(text_re)) ||
		(node.localName && /br/i.test(node.localName)) ||
		(node.localName && /img/i.test(node.localName)) ||
		(node.href && node.href.match(text_re)) ||
		(node.hasAttribute && 
		 node.hasAttribute("bginactive") &&
		 node.getAttribute("bginactive").match(/flashblock/)))
	    {
		this.log("LinternaMagica.remove_plugin_install_warning:\n"+
			 "Removing node "+node,4);
		if (/^a$/i.test(node.localName) &&
		    node.nextSibling &&
		    node.nextSibling.nodeType === 3 &&
		    /player/i.test(node.nextSibling.textContent))
		{
		    this.log("LinternaMagica.remove_plugin_install_warning:\n"+
			     "Removing node's sibling sharing"+
			     " half the text "+node.nextSibling,4);
		    new_node = node.nextSibling.nextSibling;
		    node.parentNode.removeChild(node.nextSibling);
		}
		node.parentNode.removeChild(node);
	    }
	}
	var self = this;
	var val = this.call_site_function_at_position.apply(self,[
	    "plugin_install_warning_loop",
	    window.location.hostname, node]);
	if (val && typeof(val) != "boolean")
	{
	    node = val;
	}
	node = new_node;
    }
    var self = this;
    var val = this.call_site_function_at_position.apply(self,[
	"plugin_install_warning",
	window.location.hostname, node]);
    if (val && typeof(val) != "boolean")
    {
	node = val;
    }
}
LinternaMagica.prototype.request_bliptv_jsonp_data =
function (object_data)
{
    var jsonp_request_data = new Object();
    jsonp_request_data.frame_id = "bliptv_jsonp_data_fetcher";
    jsonp_request_data.parser_timeout = this.bliptv_jsonp_timeout;
    jsonp_request_data.parser_timeout_counter = 
	this.bliptv_jsonp_timeout_counter;
    jsonp_request_data.jsonp_script_link = 
	"http://blip.tv/players/episode/"+object_data.video_id+
	"?skin=json&callback=bliptv_video_data&version=2";
    jsonp_request_data.jsonp_function = "bliptv_video_data";
    jsonp_request_data.parser_function = this.parse_bliptv_jsonp_data;
    jsonp_request_data.user_data = object_data;
    this.log("LinternaMagica.request_bliptv_jsonp_data:\n"+
	     "Requesting (JSONP) Blip.tv video link via video_id "+
	     object_data.video_id,1);
    this.create_checker_frame(jsonp_request_data);
}
LinternaMagica.prototype.parse_bliptv_jsonp_data = function(data, object_data)
{
    data = data[0].Post;
    object_data.link = data.mediaUrl;
    var hd_links = new Array();
    var sort_fun = function(a, b)
    {
	return ((parseInt(a.media_width) > parseInt(b.media_width)) ? -1 : 
		(parseInt(a.media_width) < parseInt(b.media_width)) ? 1 :0);
    };
    data.additionalMedia.sort(sort_fun);
    for (var i=0, l=data.additionalMedia.length; i<l; i++)
    {
	var link_data = data.additionalMedia[i];
	var link = new Object();
	link.url = link_data.url;
	link.label = link_data.role+
	    " ("+link_data.media_width+"x"+link_data.media_height+" "+
	    " "+link_data.description+" "+
	    link_data.video_codec.toUpperCase()+", "+
	    link_data.audio_codec.toUpperCase()+")";
	hd_links.push(link);
    }
    object_data.hd_links = hd_links;
    this.create_video_object(object_data);
}
LinternaMagica.prototype.sites["blip.tv"] = new Object();
LinternaMagica.prototype.sites["www.blip.tv"] = "blip.tv";
LinternaMagica.prototype.sites["blip.tv"].set_video_id_regex = function()
{
    var result = new Object();
    result.video_id_re = new RegExp(
	"blip\\\.tv\\\/(play|rss\\\/flash)\\\/([0-9A-Za-z_%-]+)&*",
	"i");
    result.video_id_position = 1;
    return result;
}
LinternaMagica.prototype.sites["blip.tv"].plugin_install_warning_loop =
function(node)
{
    if (node.parentNode)
    {
        node.parentNode.removeChild(node);
    }
    return null;
}
LinternaMagica.prototype.sites["blip.tv"].prepare_xhr =
function(object_data)
{
    var result= new Object();
    result.address = "/rss/flash/"+object_data.video_id;
    return result;
}
LinternaMagica.prototype.sites["blip.tv"].process_xhr_response =
function(args)
{
    var client = args.client;
    var object_data = args.object_data;
    var xml = client.responseXML;
    try
    {
	var embed_id =
	    xml.getElementsByTagName("embedLookup");
	if (embed_id && typeof(embed_id[0]) == "undefined")
	{
	    embed_id = 
		xml.getElementsByTagName("blip:embedLookup");
	}
	object_data.video_id = embed_id[0].textContent;
	this.request_bliptv_jsonp_data(object_data);
    }
    catch(e)
    {
	this.log("LinternaMagica.prototype.request_video"+
		 "_link_parse_response:\n"+
		 "Exception in Blip.tv while parsing XML",1);
    }
    return null;
}
LinternaMagica.prototype.sites["boozho.com"] = new Object();
LinternaMagica.prototype.sites["www.boozho.com"] = "boozho.com";
LinternaMagica.prototype.sites["boozho.com"].prepare_xhr =
function(object_data)
{
    var result = new Object();
    result.address = "/player_playlist.php?v="+object_data.video_id;
    return result;
}
LinternaMagica.prototype.sites["boozho.com"].process_xhr_response =
function(args)
{
    var client = args.client;
    var object_data = args.object_data;
    var xml = client.responseXML;
    var rel_url = xml.getElementsByTagName("movie_path")[0].textContent;
    object_data.link = "http://www.boozho.com/"+rel_url;
    return object_data;
}
LinternaMagica.prototype.sites["clipovete.com"] = new Object();
LinternaMagica.prototype.sites["www.clipovete.com"] = "clipovete.com";
LinternaMagica.prototype.sites["clipovete.com"].set_video_link_regex =
function()
{
    var result = new Object();
    result.link_re =  new RegExp (
	"\\\&video=(.*)\\\&(video_id)=(.*)",
	"i");
    result.link_position = 3;
    return result;
}
LinternaMagica.prototype.sites["clipovete.com"].process_extracted_link = function(link)
{
    return  "http://storage.puiako.com/clipovete.com/videos/"+link +".flv";
}
LinternaMagica.prototype.sites["blip.tv"].plugin_install_warning =
function(node)
{
    var ads = document.getElementById('ads_video');
    if (ads)
    {
    	ads.parentNode.removeChild(ads);
    }
    return null;
}
LinternaMagica.prototype.extract_dailymotion_links = function(data)
{
    var links_re = new RegExp (
	"sdurl"+
	    "(\\\"|\\\')*\\\s*(\\\=|\\\:|\\\,)\\\s*(\\\"|\\\')*"+
	    "(.*(\\\?auth\\\=[A-Za-z0-9\\\-\\\.]+)"+
	    "(\\\&|\\\"|\\\'){1})\\\,{1}",
	"i");
    var links = unescape(data).match(links_re);
    if (links && links[0])
    {
	links =  links[0].replace(/,$/, "").split(/,/);
	var hd_links = new Array();
	for (var lnk=0; lnk<links.length; lnk++)
	{
	    var link = new Object();
	    var link_data = links[lnk];
	    link.label = link_data.match(/\w+-\d+x\d+/i);
	    link.url =  link_data.replace(/\\\//g, "/").replace(
		    /(\"\s*:\s*\")|(\"\s*|,\s*\")|hdurl|hqurl|sdurl|\}/ig,
		"").replace(/hd720url|hd1080url/ig,"");
	    this.log("LinternaMagica.extract_dailymotion_links:\n"+
		     "Extracted link  : "+link.url,4);
	    hd_links.unshift(link)
	}
	return hd_links;
    }
    return null;
}
LinternaMagica.prototype.sites["dailymotion.com"] = new Object();
LinternaMagica.prototype.sites["www.dailymotion.com"] = "dailymotion.com";
LinternaMagica.prototype.sites["dailymotion.com"].no_flash_plugin_installed =
function()
{
    var data = new Object();
    data.video_id = window.location.pathname;
    if (this.wait_xhr)
    {
    	this.log("LinternaMagica.extract_objects_from_dom:\n"+
    		 "Waiting "+this.wait_xhr+
    		 " ms ("+(this.wait_xhr/1000)+
    		 " s) before requesting video link via"+
    		 " video_id "+data.video_id+" ",1);
    	var self = this;
    	setTimeout(function() {
    	    self.request_video_link.apply(self,[data]);
    	}, this.wait_xhr);
    }
    else
    {
	this.request_video_link(data);
    }
    return true;
}
LinternaMagica.prototype.sites["dailymotion.com"].process_cookies =
function()
{
    return "; domain=.dailymotion.com; path=/; host="+window.location.hostname+"; ";
}
LinternaMagica.prototype.sites["dailymotion.com"].do_not_force_iframe_detection =
function()
{
    return false;
}
LinternaMagica.prototype.sites["dailymotion.com"].skip_video_id_extraction =
function ()
{
    var extracted_data = new Object();
    extracted_data.video_id = window.location.pathname;
    return  extracted_data;
}
LinternaMagica.prototype.sites["dailymotion.com"].
    libswfobject_skip_video_id_extraction =
function()
{
    this.log("LinternaMagica.sites.libswfobject_skip_video_"+
	     "id_extraction:\n"+
	     "Video id forced to "+window.location.pathname,1);
    return window.location.pathname;
}
LinternaMagica.prototype.sites["dailymotion.com"].prepare_xhr =
function(object_data)
{
    var result = new Object();
    result.address = object_data.video_id;
    this.extract_cookies();
    this.expire_cookies();
    if (/html5_switch=1/i.test(document.cookie))
    {
	document.cookie = "html5_switch=0;";
    }
    return result;
}
LinternaMagica.prototype.sites["dailymotion.com"].process_xhr_response =
function(args)
{
    var client = args.client;
    var object_data = args.object_data;
    if (!object_data.linterna_magica_id && 
	!object_data.parent)
    {
	object_data.parent = 
	    this.get_first_element_by_class("dmpi_video_playerv[0-9]+");
	if (!object_data.parent)
	{
	    return null;
	}
	object_data.width = object_data.parent.clientWidth ? 
	    object_data.parent.clientWidth : object_data.offsetWidht ?
	    object_data.offsetWidht : null ;
	object_data.height = object_data.parent.clientHeight ? 
	    object_data.parent.clientHeight : object_data.offsetWidht ?
	    object_data.offsetWidht : null ;
    }
    var hd_links = this.extract_dailymotion_links(client.responseText);
    object_data.link = hd_links ? hd_links[hd_links.length-1].url : null;
    object_data.hd_links = (hd_links && hd_links.length) ? hd_links : null;
    if (/restore/i.test(this.process_cookies))
    {
	this.restore_cookies();
    }
    if (/html5_switch=0/i.test(document.cookie))
    {
	document.cookie = "html5_switch=1;";
    }
	if (!object_data.width || !object_data.height || !object_data.link)
	{
	    return null;
	}
    return object_data;
}
LinternaMagica.prototype.sites["dailymotion.com"].insert_object_after_xhr =
function(object_data)
{
    if (/html5_switch=1/i.test(document.cookie))
    {
	this.log("LinternaMagica.request_video_link_parse response:\n"+
		 "Creating video object with url: "+object_data.link,1);
	this.create_video_object(object_data);
	return false;
    }
    return true;
}
LinternaMagica.prototype.sites["dailymotion.com"].css_fixes =
function(object_data)
{
    var parent = object_data.parent;
    parent.style.setProperty("margin-bottom", "30px", "important");
    var html5_error = 
	this.get_first_element_by_class("error_screen");
    if (html5_error)
    {
	var lm = document.getElementById("linterna-magica-"+
					 object_data.linterna_magica_id);
	if (lm && !lm.style.display)
	{
	    html5_error.style.setProperty("display", "none", "important");
	}
	var toggle_header =
	    document.getElementById("linterna-magica-toggle-plugin-header-"+
				    object_data.linterna_magica_id);
	var toggle_after =
	    document.getElementById("linterna-magica-toggle-plugin-"+
				    object_data.linterna_magica_id);
	var header_fn = function(ev)
	{
	    var err_screen  = document.querySelector(".error_screen");
	    if (!err_screen)
	    {
		return;
	    }
	    if (err_screen.style.display)
	    {
		err_screen.style.removeProperty("display");
	    }
	    else
	    {
		err_screen.style.setProperty("display", 
					     "none", "important");
	    }
	};
	if (toggle_header)
	{
	    toggle_header.addEventListener("click",header_fn,false);
	}
	if (toggle_after)
	{
	    toggle_after.addEventListener("click",header_fn,false);
	}
    }
    return null;
}
LinternaMagica.prototype.sites["dailymotion.com"].skip_flowplayer_links_fix =
function(object_data)
{
    return false;
}
LinternaMagica.prototype.sites["dailymotion.com"].custom_html5_player_finder =
function(parent)
{
    var html5_player_element = null;
    if (parent.hasAttribute("id"))
    {
	var token = parent.getAttribute("id").split("_");
	if (token && token[1])
	{
	    html5_player_element = 
		document.getElementById("container_player_"+token[1]);
	}
    }
    return html5_player_element;
}
LinternaMagica.prototype.detect_facebook_flash_upgrade = function(object_data)
{
    this.facebook_flash_upgrade_counter++;
    var child = object_data.parent.firstChild;
    var insert_object = null;
    if (this.facebook_flash_upgrade_counter >= 20 ||
	(child &&  /embed|object/i.test(child.localName)) ||
	(child && /flash|player/i.test(child.textContent)))
    {
	clearInterval(this.facebook_flash_upgrade_timeout);
	this.log("LinternaMagica.detect_facebook_flash_upgrade:\n"+
		 "Removing plugin install warning.",2);
	this.remove_plugin_install_warning(object_data.parent);
	this.log("LinternaMagica.detect_facebook_flash_upgrade:\n"+
		 "Creating video object.",2);
	this.create_video_object(object_data);
    }
}
LinternaMagica.prototype.sites["facebook.com"] = new Object();
LinternaMagica.prototype.sites["www.facebook.com"] = "facebook.com";
LinternaMagica.prototype.sites["facebook.com"].
    replace_extracted_object_from_script =
function(object_data)
{
    if (!this.facebook_flash_upgrade_timeout)
    {
	this.log("LinternaMagica.sites.replace_extracted_"+
		 "object_from_script:\n"+
		 "Delaying video object creation in Facebook.",3);
	this.facebook_flash_upgrade_counter = 0;
	var data = object_data;
	var self = this;
	this.facebook_flash_upgrade_timeout =
	    setInterval(function() {
	    	self.detect_facebook_flash_upgrade.
	    	    apply(self,[data]);
	    }, 500);
    }
    return false;
}
LinternaMagica.prototype.sites["facebook.com"].set_video_link_regex =
function()
{
    var result = new Object();
    //
    //
    if (!this.script_data)
    {
	result.link_re = new RegExp (
	    "thumb_url=(.*)&video_src=(.*)&(motion_log)=(.*)",
	    "i");
	result.link_position = 3;
    }
    else
    {
 	result.link_re = new RegExp (
	    "(\\\"|\\\')video(\\\"|\\\'),\\\s*(\\\"|\\\')([^\\\"\\\']+)(\\\"|\\\'){1}",
 	    "i");
	result.link_position = 2;
    }
    return result;
}
LinternaMagica.prototype.sites["facebook.com"].process_extracted_link = function(link)
{
    link = unescape(link.replace(/\\u0025/g, "%"));
    link = link.split(',');
    link = link[0] ? link[0] : link;
    link = link.split('"');
    link = link[3] ? link[3] : link.join();
    link = link.replace(/\\\//g, "/");
    return link;
}
LinternaMagica.prototype.sites["facebook.com"].
do_not_clean_amps_in_extracted_link = "video.google.com";
LinternaMagica.prototype.sites["facebook.com"].
skip_script_processing = function()
{
    if (/(video|photo)\.php/i.test(window.location.href) &&
	this.script_data.length >= 26214400 )
    {
	return false;
    }
    else if (!/(video|photo)\.php/i.test(window.location.href) &&
    	     this.script_data.length >= 5120)
    {
    	return false;
    }
    return true;
}
LinternaMagica.prototype.sites["facebook.com"].
extract_hd_links_from_script_if_link =
function()
{
    var data = this.script_data;
    var hd_strings = ["sd_src", "hd_src" ];
    var hd_links = new Array();
    var l,i;
    var link_re = new RegExp (
	"(\\\"|\\\')video(\\\"|\\\'),\\\s*(\\\"|\\\')"+
	    "([^\\\"\\\']+)(\\\"|\\\'){1}",
	"i");
    var match = data.match(link_re);
    if (!match || !match[match.length-2])
    {
	return;
    }
    var links = unescape(match[match.length-2].replace(/\\u0025/g, "%"));
    links = links.split(/,/);
    for (var i=0, l=links.length; i<l; i++)
    {
	if (!/_src/i.test(links[i]))
	{
	    continue;
	}
	var link = new Object();
	link.url = 
	    this.sites["facebook.com"].
	    process_extracted_link(links[i])+"#";
	if (/sd_src/i.test(links[i]))
	{
	    link.label = this._("Low") 
	    link.more_info = "MPEG-4, H.264";
	}
	else
	{
	    link.label = this._("High");
	    link.more_info = "MPEG-4, H.264";
	}
	hd_links.unshift(link);
    }
    if (hd_links.length > 0)
    {
	return hd_links;
    }
    return null;
}
LinternaMagica.prototype.sites["facebook.com"].css_fixes =
function(object_data)
{
    var next = document.querySelector(".photoPageNextNav");
    var prev = document.querySelector(".photoPagePrevNav");
    var fb_nav_click_fn = function(ev)
    {
	window.location = this.getAttribute("href");
    }
    if (next)
    {
	next.addEventListener("click", fb_nav_click_fn, false);
    }
    if (prev)
    {
	prev.addEventListener("click", fb_nav_click_fn, false);
    }
}
LinternaMagica.prototype.sites["facebook.com"].flash_plugin_installed = "youtube.com";
LinternaMagica.prototype.sites["video.google.com"] = new Object();
LinternaMagica.prototype.sites["video.google.com.au"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.com.br"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.ca"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.bg"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.cn"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.fr"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.de"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.it"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.nl"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.pl"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.es"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.co.uk"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.com.ar"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.ru"] = "video.google.com";
LinternaMagica.prototype.sites["encrypted.google.com"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.com"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.com.au"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.com.br"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.ca"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.bg"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.cn"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.fr"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.de"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.it"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.nl"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.pl"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.es"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.co.uk"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.com.ar"] = "video.google.com";
LinternaMagica.prototype.sites["www.google.ru"] = "video.google.com";
LinternaMagica.prototype.sites["images.google.com"] = "video.google.com";
LinternaMagica.prototype.sites["video.google.com"].
skip_script_processing = function()
{
    return false;
}
LinternaMagica.prototype.sites["video.google.com"].set_video_link_regex =
function()
{
    var result = new Object();
    result.link_re = new RegExp (
	"videourl=(.*)\\\&(thumbnailurl)=(.*)" ,
	"i");
    result.link_position = 3;
    return result;
}
LinternaMagica.prototype.sites["video.google.com"].
    do_not_clean_amps_in_extracted_link =
function()
{
    return false;
}
LinternaMagica.prototype.sites["indieflix.com"] = new Object();
LinternaMagica.prototype.sites["www.indieflix.com"] = "indieflix.com";
LinternaMagica.prototype.sites["indieflix.com"].custom_html5_player_finder =
function(parent)
{
    var html5_player_element = null;
    html5_player_element = 
	document.getElementById("player_displayarea");
    return html5_player_element;
}
LinternaMagica.prototype.sites["indieflix.com"].do_not_force_iframe_detection =
function()
{
    return false;
}
LinternaMagica.prototype.sites["indieflix.com"].css_fixes =
function(object_data)
{
    var id = object_data.linterna_magica_id;
    var toggle_plugin = 
	document.getElementById("linterna-magica-toggle-plugin-"+id);
    if (toggle_plugin)
    {
	var p = toggle_plugin.parentNode;
	p.style.setProperty("top", (parseInt(object_data.height)+5)+"px",
			    "importnat");
    }
    var lm = document.getElementById("linterna-magica-"+id);
    var central_player = lm.parentNode.parentNode;
    if (central_player)
    {
	central_player.style.setProperty("overflow", "visible",
					 "important");
    }
    lm.style.setProperty("z-index", "99999999", "important");
    return false;
}
LinternaMagica.prototype.sites["indieflix.com"].
replace_extracted_object_from_script =
function(object_data)
{
    if (!this.indieflix_html5_element_timeout)
    {
	this.log("LinternaMagica.sites.replace_extracted_"+
		 "object_from_script:\n"+
		 "Delaying video object creation in Indieflix.",3);
	this.indieflix_html5_element_counter = 0;
	var data = object_data;
	var self = this;
	this.indieflix_html5_element_timeout =
	    setInterval(function() {
	    	self.detect_indieflix_html5_element.
	    	    apply(self,[data]);
	    }, 2000);
    }
    return false;
}
LinternaMagica.prototype.detect_indieflix_html5_element =
function(object_data)
{
    this.indieflix_html5_element_counter++;
    var html5_element = 
	this.find_site_html5_player_wrapper(object_data.parent);
    var insert_object = null;
    if (this.indieflix_html5_element_counter >= 1 || html5_element)
    {
	clearInterval(this.indieflix_html5_element_timeout);
	this.log("LinternaMagica.detect_indieflix_html5_element:\n"+
		 "Removing plugin install warning.",2);
	this.remove_plugin_install_warning(object_data.parent);
	this.log("LinternaMagica.detect_indieflix_html5_element:\n"+
		 "Creating video object.",2);
	this.create_video_object(object_data);
    }
}
LinternaMagica.prototype.sites["jwak.net"] = new Object();
LinternaMagica.prototype.sites["www.jwak.net"] = "jwak.net";
LinternaMagica.prototype.sites["jwak.net"].set_video_link_regex =
function()
{
    var result = new Object();
    result.link_re = new RegExp (
	"addVariable\\\((\\\"|\\\')streamer(\\\"|\\\'),\\\s*"+
	    "(\\\"|\\\')([^\\\"\\\']+)(\\\"|\\\')(\\\))\\\;{1}",
	"i");
    result.link_position = 3;
    return result;
}
LinternaMagica.prototype.sites["khanacademy.org"] = new Object();
LinternaMagica.prototype.sites["www.khanacademy.org"] = "khanacademy.org";
LinternaMagica.prototype.sites["khanacademy.org"].css_fixes =
function(object_data)
{
    if (object_data.parent && object_data.parent.hasAttribute("id") &&
	/youtube_blocked/i.test(object_data.parent.getAttribute("id")))
    {
	var parent = object_data.parent;
	parent.style.setProperty("left", "0px", "important");
	parent.style.setProperty("position", "relative", "important");
	parent.style.setProperty("visibility", "visible", "important");
	for (var i=0, l=this.found_flash_video_objects;i<l;i++)
	{
	    var fo = this.get_flash_video_object(i);
	    if (fo &&
		fo.linterna_magica_id != object_data.linterna_magica_id)
	    {
		fo.parentNode.style.setProperty("display", "none",
						"important");
	    }
	}
	parent.style.setProperty("margin-bottom", "20px", "important");
    }
    return null;
}
LinternaMagica.prototype.sites["kickstarter.com"] = new Object();
LinternaMagica.prototype.sites["www.kickstarter.com"] = "kickstarter.com";
LinternaMagica.prototype.sites["kickstarter.com"].no_flash_plugin_installed =
function()
{
    var selectors = document.querySelectorAll(".video-player");
    var object_data = null;
    var link = null;
    var width = null;
    var height = null;
    var parent = null;
    if (selectors && selectors.length)
    {
	for (var i=0,l=selectors.length;i<l;i++)
	{
	    var s = selectors[i];
	    if(s.hasAttribute("data-video"))
	    {
		this.extract_link_data = "video="+s.getAttribute("data-video");
		link = this.extract_link();
		width = parseInt(s.style.getPropertyValue("width"));
		height = parseInt(s.style.getPropertyValue("height"));
		if (!width)
		{
		    width = s.clientWidth;
		}
		if (!height)
		{
		    height = s.clientHeight;
		}
		for (var j=0,ln=s.childNodes.length;j<ln;j++)
		{
		    parent = s.childNodes[j];
		    if (parent.hasAttribute("class") &&
			/overlay/i.test(parent.getAttribute("class")))
		    {
			break;
		    }
		    if (j=l)
		    {
			parent = s;
		    }
		}
		if (link && width && height && parent)
		{
		    break;
		}
	    }
	}
	var object_data = new Object();
	object_data.link = link;
	object_data.width = width;
	object_data.height = height;
	object_data.parent = parent;
	object_data.linterna_magica_id = 
	    this.mark_flash_object("extracted-by-code");
	this.remove_plugin_install_warning(object_data.parent);
	this.create_video_object(object_data);
	return true;
    }
    return null;
}
LinternaMagica.prototype.sites["kickstarter.com"].css_fixes =
function(object_data)
{
    var id = object_data.linterna_magica_id;
    var lm = document.getElementById("linterna-magica-"+id);
    if (lm)
    {
	var grand_parent = lm.parentNode.parentNode;
	var h = parseInt(lm.style.getPropertyValue("height"));
	grand_parent.style.setProperty("height", h+'px', "important");
    }
    var popup = document.getElementById("growl_section");
    if (popup)
    {
	popup.style.setProperty("z-index", "-9999999", "important");
    }
    object_data.parent.style.setProperty("line-height", "0px", "important");
    return false;
}
LinternaMagica.prototype.sites["livestream.com"] = new Object();
LinternaMagica.prototype.sites["www.livestream.com"] = "livestream.com";
LinternaMagica.prototype.sites["livestream.com"].set_video_id_regex =
function()
{
    var result = new Object();
    result.video_id_re = new RegExp(
	"(clip|\\\&t)=(pla[_-a-zA-Z0-9]+|[0-9]+)",
	"i");
    result.video_id_position = 1;
    return result;
}
LinternaMagica.prototype.request_livestreamcom_jsonp_data =
function (object_data)
{
    var flash_object =
	this.get_flash_video_object(object_data.linterna_magica_id);
    if (!flash_object)
    {
	return null;
    }
    var attrib = null;
    var channel_re = null;
    if (flash_object.localName.toLowerCase() == "embed" || 
	flash_object.localName.toLowerCase() == "iframe")
    {
	attrib = "src";
    }
    else if (flash_object.localName.toLowerCase() == "object")
    {
	attrib = "data";
    }
    if (flash_object.localName.toLowerCase() == "object" || 
	flash_object.localName.toLowerCase() == "embed")
    {
	channel_re = new RegExp (
	    "channel=(.*)&",
	    "i");
    }
    else if (flash_object.localName.toLowerCase() == "iframe")
    {
	channel_re = new RegExp ("\\\/embed\\\/(.*)\\\?");
    }
    var data = flash_object.getAttribute(attrib);
    if (!data)
    {
	return null;
    }
    var channel = data.match(channel_re);
    if (!channel || (channel && !channel[channel.length-1]))
    {
	return null;
    }
    channel = channel[channel.length-1];
    var jsonp_key =
	/pla[_A-Za-z0-9\-]+/i.test(object_data.video_id) ? "id" : "t";
    var jsonp_request_data = new Object();
    jsonp_request_data.frame_id = "livestreamcom_jsonp_data_fetcher";
    jsonp_request_data.parser_timeout = this.livestreamcom_jsonp_timeout;
    jsonp_request_data.parser_timeout_counter = 
	this.livestream_jsonp_timeout_counter;
    jsonp_request_data.jsonp_script_link = "http://x"+channel+
	"x.api.channel.livestream.com/3.0/getstream.json?"+jsonp_key+"="+
	object_data.video_id+"&callback=livestreamcom_video_data";
	"http://blip.tv/players/episode/"+object_data.video_id+
	"?skin=json&callback=bliptv_video_data&version=2";
    jsonp_request_data.jsonp_function = "livestreamcom_video_data";
    jsonp_request_data.parser_function =
	this.parse_livestreamcom_jsonp_data;
    jsonp_request_data.user_data = object_data;
    this.log("LinternaMagica.request_bliptv_jsonp_data:\n"+
	     "Requesting (JSONP) Livestream.com video link via video_id "+
	     object_data.video_id,1);
    this.create_checker_frame(jsonp_request_data);
}
LinternaMagica.prototype.parse_livestreamcom_jsonp_data =
function(data,object_data)
{
    object_data.link = data.progressiveUrl ? 
	data.progressiveUrl : data.rtspUrl;
    if (data.progressiveUrl && data.rtspUrl)
    {
	object_data.hd_links = new Array();
	var hd_link = new Object();
	hd_link.label = this._("RTSP link");
	hd_link.url = data.rtspUrl;
	object_data.hd_links.push(hd_link);
	hd_link = new Object();
	hd_link.label = this._("Progressive link");
	hd_link.url = data.progressiveUrl;
	object_data.hd_links.push(hd_link);
    }
    this.create_video_object(object_data);
}
LinternaMagica.prototype.sites["livestream.com"].css_fixes =
function(object_data)
{
    var featured = document.getElementById("featured");
    if (featured)
    {
	var lm = 
	    document.getElementById("linterna-magica-"+
				    object_data.linterna_magica_id);
	if (lm)
	{
	    lm.parentNode.parentNode.parentNode.style.
		setProperty("bottom", "60px", "important");
	}
    }
    var lm_object =
	document.getElementById("linterna-magica-video-object-"+
				object_data.linterna_magica_id);
    if (lm_object)
    {
	lm_object.style.setProperty("left", "0px", "important");
    }
}
LinternaMagica.prototype.sites["metacafe.com"] = new Object();
LinternaMagica.prototype.sites["www.metacafe.com"] = "metacafe.com";
LinternaMagica.prototype.sites["metacafe.com"].process_extracted_link =
function(link)
{
    var data = this.extract_link_data;
    if (/flv/i.test(link))
    {
	link = link.replace(/&gdaKey/i, "?__gda__");
    }
    else
    {
	var key_re = new RegExp(
	    link.slice(link.length-15).replace(/\\\./g,"\\\\\\.")+
		"\\\"\\\,\\\"key\\\"\\\:\\\"([0-9A-Za-z\\\_]+)\\\"",
	    "i");
	var key = unescape(data).match(key_re);
	link = link+"?__gda__="+key[key.length-1];
    }
    link = link.replace("[", "%5B").
	replace(" ", "%20").replace("]", "%5D");
    return link;
}
LinternaMagica.prototype.sites["mqsto.com"] = new Object();
LinternaMagica.prototype.sites["www.mqsto.com"] = "mqsto.com";
LinternaMagica.prototype.sites["mqsto.com"].process_extracted_link =
function(link)
{
    if (!/^http/i.test(link))
    {
	link = "http://mqsto\.com/video/"+link;
    }
    return link;
}
LinternaMagica.prototype.sites["mqsto.com"].css_fixes =
function(object_data)
{
    var move_down_fb_frame = 100;
    object_data.parent.style.setProperty("height",
					 (parseInt(object_data.height)+
					  26+move_down_fb_frame+
					 2+
					 (this.controls ? 24 : 0))+"px",
					 "important");
    return false;
}
LinternaMagica.prototype.create_myvideode_link = function(create_from_text)
{
    var link = null;
    if (create_from_text)
    {
	link = create_from_text;
    }
    else
    {
	var links = document.getElementsByTagName("link");
	for (var lnk=0; lnk <links.length; lnk++)
	{
	    var raw_link = links[lnk];
	    if (raw_link.hasAttribute("rel")
		&& /image_src/i.test(raw_link.getAttribute("rel")))
	    {
		link = raw_link.getAttribute("href");
		break;
	    }
	}
    }
    if (link)
    {
	link = link.replace(/thumbs\/|_\d+/g,"").replace(/\.jpg/,".flv");
    }
    return link;
}
LinternaMagica.prototype.sites["myvideo.de"] = new Object();
LinternaMagica.prototype.sites["www.myvideo.de"] = "myvideo.de";
LinternaMagica.prototype.sites["myvideo.de"].flash_plugin_installed = "theonion.com";
LinternaMagica.prototype.sites["myvideo.de"].skip_xhr_if_video_id =
function(object_data)
{
    object_data.link = this.create_myvideode_link();
    if (object_data.link)
    {
	object_data.video_id = null;
    }
    return object_data ;
}
LinternaMagica.prototype.sites["myvideo.de"].prepare_xhr =
function(object_data)
{
    var result = new Object();
    result.address = "/watch/"+object_data.video_id+"/";
    return result;
}
LinternaMagica.prototype.sites["myvideo.de"].process_xhr_response =
function(args)
{
    var object_data = args.object_data;
    var client = args.client;
    try
    {
	var thumb_url = client.responseText.split(/image_src/)[1];
	thumb_url = thumb_url.split(/\/\>/)[0].split(/\'/)[2];
	object_data.link = this.create_myvideode_link(thumb_url);
    }
    catch(e)
    {
	return null;
    }
    return object_data;
}
LinternaMagica.prototype.sites["pri.org"] = new Object();
LinternaMagica.prototype.sites["www.pri.org"] = "pri.org";
LinternaMagica.prototype.sites["pri.org"].no_flash_plugin_installed =
function()
{
    return true;
}
LinternaMagica.prototype.sites["pri.org"].skip_link_extraction = function()
{
    var player = document.getElementById("shoutcast");
    if (!player)
    {
	return null;
    }
    var extracted_data = new Object();
    extracted_data.link = "http://www.pri.org/stream/listen.pls";
    extracted_data.hd_links = new Array();
    var links = ["pri1", "pri1-fallback", "pri2-fallback" ];
    for (var pl=0, l=links.length; pl<l; pl++  )
    {
	var link = new Object();
	var cnt = parseInt(pl+1);
	link.url = "http://pri-ice.streamguys.biz/"+links[pl];
	link.label = this._("Link")+" "+cnt;
	link.more_info = "Public Radio International #"+cnt+" - "+(cnt > 1 ? 32 : 64)+"kbs";
	extracted_data.hd_links.push(link);
    }
    return extracted_data;
}
LinternaMagica.prototype.sites["reuters.com"] = new Object();
LinternaMagica.prototype.sites["www.reuters.com"] = "reuters.com";
LinternaMagica.prototype.sites["reuters.com"].set_video_link_regex =
function()
{
    var result = new Object();
    result.link_re =  new RegExp (
	"videoURL=(.*)(\\\&{1})(.*)",
	"i");
    result.link_position = 3;
    return result;
}
LinternaMagica.prototype.sites["reuters.com"].css_fixes =
function(object_data)
{
    var extra_height = 100;
    var fourth_parent = object_data.parent.parentNode.parentNode.parentNode;
    if (fourth_parent)
    {
	fourth_parent.style.setProperty("overflow", "visible", "important");
	fourth_parent.style.
	    setProperty("height", 
			(parseInt(object_data.height)+26+
			 extra_height+
			 2+
			 (this.controls ? 24 : 0)  )+"px",
			"important");
    }
    return false;
}
LinternaMagica.prototype.create_tedcom_link = function(relative_link)
{
    if (relative_link)
    {
	relative_link = relative_link.replace(/ms|hs|ls/,"").
	    replace(/\"/g,"").replace("mp4:","").replace(":","").
	    replace("=","").replace(",","");
	var link = "http://video.ted.com/"+relative_link;
	return link;
    }
    return null;
}
LinternaMagica.prototype.extract_tedcom_hd_links = function(data)
{
    var links_re = new RegExp (
	"(?:\\\&)*\\\w{2}(\\\=|\\\:)*\\\s*(\\\"|\\\')*"+
	    "(.*\\\.(flv|mp4))(\\\&|\\\",$)",
	"img");
    var links = unescape(data).match(links_re);
    if (!links)
    {
	return false;
    }
    if (links[0].match(/&hs=/))
    {
	links = links[0].split("&vw")[0].split("&").slice(1,4);
    }
    else
    {
	links = links.slice(0,3);
    }
    if (!links)
	return;
    var hd_links = new Array();
    for (var lnk=0; lnk<links.length; lnk++)
    {
	var link = new Object();
	link.url = this.create_tedcom_link(links[lnk]);
	var label = link.url.match(/-(\w+)\.(flv|mp4)/);
	if (!label)
	{
	    label = this._("Link")+" "+lnk+1;
	}
	else
	{
	    label = label[label.length-2];
	    label = label.slice(0,1).toUpperCase() + label.slice(1);
	}
	link.label = label;
	this.log("LinternaMagica.extract_tedcom_hd_links:\n"+
		 "Extracted link  : "+link.url,1);
	hd_links.push(link);
    }
    if (hd_links.length)
	return hd_links;
    return null;
}
LinternaMagica.prototype.sites["ted.com"] = new Object();
LinternaMagica.prototype.sites["www.ted.com"] = "ted.com";
LinternaMagica.prototype.sites["ted.com"].before_options_init = function()
{
    if(!/[A-Za-z0-9]+/i.test(window.location.pathname))
    {	
    	   this.log("LinternaMagica.sites.before_options_init:\n"+
    		    "Skipping TED front page!"+
    		    " Blocks Firefox and forks.");
    	return false;
    }
    return true;
}
LinternaMagica.prototype.sites["ted.com"].extract_hd_links_from_dom_if_link =
function(data)
{
    this.log("LinternaMagica.sites.extract_hd_links_from_dom_if_link:\n"+
	     "Trying to extract ted.com HQ links ",1);
    return this.extract_tedcom_hd_links(data);
}
LinternaMagica.prototype.sites["ted.com"].extract_hd_links_from_script_if_link =
function()
{
    var data = this.extract_link_data;
    this.log("LinternaMagica.sites.extract_hd_links_from_script_if_link:\n"+
	     "Trying to extract ted.com HQ links ",1);
    return this.extract_tedcom_hd_links(data);
}
LinternaMagica.prototype.sites["ted.com"].skip_script_processing =
function()
{
    if (this.script_data.length >= 15000)
    {
	this.log("LinternaMagca.sites.skip_script_processing:\n"+
		 "Skipping script processing, because it is too big.");
	return false;
    }
    return true;
}
LinternaMagica.prototype.sites["ted.com"].process_extracted_link =
function(link)
{
    link = this.create_tedcom_link(link);
    return link;
}
LinternaMagica.prototype.sites["theonion.com"] = new Object();
LinternaMagica.prototype.sites["www.theonion.com"] = "theonion.com";
LinternaMagica.prototype.sites["theonion.com"].extract_object_from_script =
function()
{
    var player_container = document.getElementById("player_container");
    if (!player_container)
    {
	return null;
    }
    var data = this.script_data;
    var video_id_re = new RegExp (
	"var\\\s*afns_video_id\\\s*="+
	    "\\\s*(\\\"|\\\')([0-9]+)(\\\"|\\\')");
    var video_id = data.match(video_id_re);
    if (!video_id)
    {
	return null;
    }
    video_id = video_id[video_id.length-2];
    var width = player_container.clientWidth;
    var height = player_container.clientHeight;
    if (!width || !height)
    {
	return null;
    }
    var flash_object = document.getElementById("player_container_api");
    var object_data = new Object();
    object_data.video_id = video_id;
    object_data.width = width;
    object_data.height = height;
    object_data.parent = player_container;
    if (flash_object)
    {
	object_data.linterna_magica_id = 
	    this.mark_flash_object(flash_object);
    }
    else
    {
	object_data.linterna_magica_id = 
	    this.mark_flash_object("extracted-from-script");
    }
    return object_data;
}
LinternaMagica.prototype.capture_theonion_clip_change = function(object_data)
{
    var list = document.getElementById("onn_recent");
    if (!list || !/HTMLUListElement/i.test(list))
    {
	return null;
    }
    var self = this;
    this.theonion_click_wrapper_function = function(ev)
    {
	var el = this;
	var od = object_data;
	self.theonion_clip_change_click_function.apply(self,[ev,el,od]);
    };
    var buttons = list.getElementsByTagName("li");
    for (var i=0,l=buttons.length; i<l; i++)
    {
	var li = buttons[i];
	li.addEventListener("click",
			    this.theonion_click_wrapper_function, true);
    }
}
LinternaMagica.prototype.theonion_clip_change_click_function =
function(event,element,object_data)
{
    var p = element.getElementsByTagName("p");
    for (var i=0, l=p.length; i<l; i++)
    {
	if (p[i].hasAttribute("rel") &&
	    p[i].hasAttribute("class") &&
	    /title/i.test(p[i].getAttribute("class")))
	{
	    object_data.video_id = p[i].getAttribute("rel");
	    this.request_video_link(object_data);
	    var lm = this.get_video_object(object_data.linterna_magica_id);
	    lm = lm.parentNode;
	    object_data.parent.removeChild(lm);
	    break;
	}
    }
}
LinternaMagica.prototype.sites["theonion.com"].flash_plugin_installed =
function()
{
    this.log("LinternaMagica.sites.flash_plugin_installed:\n",
	     "Calling default function to extract scripts");
    return this.sites.__no_flash_plugin_installed.apply(this, [arguments]);
}
LinternaMagica.prototype.sites["theonion.com"].prepare_xhr =
function(object_data)
{
    var result = new Object();
    result.address = "/ajax/onn/embed/"+object_data.video_id+".json";
    return result;
}
LinternaMagica.prototype.sites["theonion.com"].process_xhr_response =
function(args)
{
    var client = args.client;
    var object_data = args.object_data;
   var onion_data = eval("("+client.responseText+")");
    object_data.link = onion_data.video_url;
    if (!this.theonion_click_wrapper_function)
    {
	this.capture_theonion_clip_change(object_data);
    }
    return object_data;
}
LinternaMagica.prototype.sites["tv7.bg"] = new Object();
LinternaMagica.prototype.sites["www.tv7.bg"] = "tv7.bg";
LinternaMagica.prototype.sites["tv7.bg"].process_extracted_link =
function(link)
{
    if (!/^http/i.test(link))
    {
	link = "/"+link;
    }
    return link;
}
LinternaMagica.prototype.sites["tv7.bg"].css_fixes =
function(object_data)
{
    object_data.parent.parentNode.style.
	setProperty("height",
		    (parseInt(object_data.height)+26+
		     2+
		     (this.controls ? 24 : 0)  )+"px",
		    "important");
    object_data.parent.parentNode.style.
	setProperty("width",
		    (parseInt(object_data.width+2))+"px",
		    "important");
    var third_parent = object_data.parent.parentNode.parentNode;
    if (third_parent)
    {
	third_parent.style.setProperty("overflow", "visible", "important");
	third_parent.style.
	    setProperty("height", 
			(parseInt(object_data.height)+26+
			 2+
			 (this.controls ? 24 : 0)  )+"px",
			"important");
    }
    return false;
}
LinternaMagica.prototype.sites["vbox7.com"] = new Object();
LinternaMagica.prototype.sites["www.vbox7.com"] = "vbox7.com";
LinternaMagica.prototype.sites["vbox7.com"].prepare_xhr =
function(object_data)
{
    var result = new Object();
    result.address ="/play/magare.do";
    result.method = "POST";
    result.data = "vid="+object_data.video_id;
    result.content= "application/x-www-form-urlencoded";
    return result;
}
LinternaMagica.prototype.sites["vbox7.com"].process_xhr_response =
function(args)
{
    var client = args.client;
    var object_data = args.object_data;
    object_data.link = client.responseText.split(/videoFile=/i)[1].split("&")[0];
    return object_data;
}
LinternaMagica.prototype.sites["viddler.com"] = new Object();
LinternaMagica.prototype.sites["www.viddler.com"] = "viddler.com";
LinternaMagica.prototype.sites["viddler.com"].prepare_xhr =
function(object_data)
{
    var result = new Object();
    result.address = "/videos/"+object_data.video_id+
	"/lightbox?tab=download&view_video=0";
    return result;
}
LinternaMagica.prototype.sites["viddler.com"].process_xhr_response =
function(args)
{
    var object_data = args.object_data;
    var client = args.client;
    var xml = client.responseXML;
    if (!xml)
    {
	var html = '<html xmlns="http://www.w3.org/1999/xhtml">'+
            '<body><div>'+client.responseText+'</div></body></html>';
	if (window.DOMParser)
        {
	    try
	    {
		xml = (new DOMParser()).
                    parseFromString(html, "application/xml");
	    }
	    catch(e)
	    {
		this.log('LinternaMagica.sites["viddler.com"].'+
			 'process_xhr_response:\n'+
			 "Unable to parse XML string created"+
			 "from client.responseText.",4);
	    }
        }
    }
    if (!xml)
    {
	return null;
    }
    var file_desc = xml.querySelectorAll(".file-desc");
    if (!file_desc)
    {
	return null;
    }
    var hd_links = new Array();
    for (var i=0, l=file_desc.length;i<l; i++)
    {
	var link = new Object();
	var td = file_desc[i].parentNode.getElementsByTagName('td');
	link.label = td[1].textContent.
	    replace(/[0-9]+\s*x\s*/,'').replace(/$/, 'p')+" "+
	    td[0].textContent.replace(/Source\s*/,'');
	link.more_info = td[1].textContent.replace(/\s/g,'') + " "+
	    td[0].textContent+", "+
	    td[2].textContent;
	var url = td[3].getElementsByTagName('a');
	url =  (url && url[0]) ? url[0].getAttribute('href') : null;
	link.url = url;
	link.file_size = td[2].textContent.replace(/\s*MB\s*$/i,'');
	link.video_width = td[1].textContent.replace(/x.*/,'');
	hd_links.push(link);
    }
    var sort_fun = function (a, b)
    {
	if (parseInt(a.video_width) > parseInt(b.video_width))
	{
	    return -1;
	}
	else if (parseInt(a.video_width) < parseInt(b.video_width))
	{
	    return 1;
	}
	else
	{
	    if (parseFloat(a.file_size) > parseFloat(b.file_size))
	    {
		return -1;
	    }
	    else if (parseFloat(a.file_size) <  parseFloat(b.file_size))
	    {
		return 1;
	    }
	    else
	    {
		return 0;
	    }
	    return 0;
	}
    }
    hd_links.sort(sort_fun);
    object_data.link = (hd_links.length > 0) ? hd_links[0].url : null;
    object_data.hd_links = (hd_links.length > 1) ? hd_links : null;
    return object_data;
}
LinternaMagica.prototype.sites["viddler.com"].
skip_script_processing = function()
{
    return false;
}
LinternaMagica.prototype.sites["viddler.com"].css_fixes = function(object_data)
{
    object_data.parent.style.setProperty("overflow", 
					 "visible", "important");
    object_data.parent.
	parentNode.style.setProperty("overflow", "visible", "important");
    var hd_links = document.getElementById('linterna-magica-hd-links-list-'+
					   object_data.linterna_magica_id);
    if(hd_links)
    {
	hd_links.style.setProperty("width", "8%", "important");
    }
    return false;
}
LinternaMagica.prototype.sites["videoclipsdump.com"] = new Object();
LinternaMagica.prototype.sites["www.videoclipsdump.com"] = "videoclipsdump.com";
LinternaMagica.prototype.sites["videoclipsdump.com"].prepare_xhr =
function(object_data)
{
    var result = new Object();
    result.address = "/player/cbplayer/settings.php?vid="+
	object_data.video_id;
    return result;
}
LinternaMagica.prototype.sites["videoclipsdump.com"].process_xhr_response =
function(args)
{
    var client = args.client;
    var object_data = args.object_data;
    var xml = client.responseXML;
    var path = xml.getElementsByTagName("videoPath")[0];
    if (path)
    {
	object_data.link = path.getAttribute("value");
    }
    return object_data;
}
LinternaMagica.prototype.extract_signature_vimeo = function()
{
    var data = this.script_data;
    var signature = null;
    if (!data)
    {
	return null;
    }
    var signature_re =  new RegExp(
	"(\\\"|\\\')*signature(\\\"|\\\')*:(\\\"|\\\')*([^,\\\"\\\']+)(\\\"|\\\')*",
	"im");
    signature = data.match(signature_re);
    if (signature && signature[signature.length-2])
    {
	signature = signature[signature.length-2];
    }
    return signature;
}
LinternaMagica.prototype.extract_time_stamp_vimeo = function()
{
    var data = this.script_data;
    var time_stamp = null;
    if (!data)
    {
	return null;
    }
    var time_stamp_re =  new RegExp(
	"(\\\"|\\\')*[^_]timestamp(\\\"|\\\')*:(\\\"|\\\')*([^,\\\"\\\']+)(\\\"|\\\')*",
	"im");
    time_stamp = data.match(time_stamp_re);
    if (time_stamp && time_stamp[time_stamp.length-2])
    {
	time_stamp = time_stamp[time_stamp.length-2];
    }
    return time_stamp;
}
LinternaMagica.prototype.extract_codec_and_quality_vimeo = function()
{
    var data = this.script_data;
    if (!data)
    {
	return null;
    }
    var files_re =  new RegExp(
	"(\\\"|\\\')*files(\\\"|\\\')*:(\\\"|\\\')*([^\\\}]+)",
	"im");
    var files = data.match(files_re);
    if (!files && !files[files.length-1]);
    this.log("LinternaMagica.prototype.extract_codec_and_quality_vimeo:\n"+
	     "Result from files_re: "+files,5);
    var codecs_data_re = new RegExp(
	"(\\\"|\\\')*([^:,\\\"\\\']+)(\\\'|\\\")*:\\\[([^\\\]]+)\\\]",
	"img");
    var codecs_data =  null;
    var codecs = new Object();
    codecs.length = -1;
    while(codecs_data = codecs_data_re.exec(files[files.length-1]))
    {
	if (codecs_data && codecs_data[codecs_data.length-1] &&
	    codecs_data[codecs_data.length-3])
	{
	    var name = codecs_data[codecs_data.length-3];
	    var quality = codecs_data[codecs_data.length-1];
	    quality = quality.replace(/\"|\'|/g, '').split(/,/);
	    codecs[name] = quality;
	    this.log("LinternaMagica.extract_codec_and_quality_vimeo:\n"+
		     "Extracted codec "+name+". "+
		     "Available quality: "+quality.join(", ")+".",5);
	    codecs.length++;
	}
    }
    if (codecs.length == -1)
    {
	codecs = null;
    }
    delete codecs.length;
    return codecs;
}
LinternaMagica.prototype.create_links_vimeo = function(args)
{
    if(!args)
    {
	return null;
    }
    var links = new Array();
    for (var c in args.codecs)
    {
	for (var i=0,l=args.codecs[c].length;i<l; i++)
	{
	    var q = args.codecs[c][i].toLowerCase();
	    var link = new Object();
	    link.url = "http://player.vimeo.com/play_redirect?quality="+q+
		"&codecs="+c+
		"&clip_id="+args.object_data.video_id+
		"&time="+args.time_stamp+
		"&sig="+args.signature+"&type=html5_desktop_local";
	    var res = null;
	    if (q == "mobile")
	    {
		res = "480p";
	    }
	    else if (q ==  "sd")
	    {
		res = "640p";
	    }
	    else if (q == "hd")
	    {
		res = "1280p";
	    }
	    else
	    {
		res = "Unknown";
	    }
	    var codec = c.toUpperCase();
	    link.label = res + " "+codec;
	    link.more_info = codec+ " "+q.toUpperCase()+" "+res;
	    links.push(link);
	}
    }
    return (links && links.length >=0) ? links : null;
}
LinternaMagica.prototype.sites["vimeo.com"] = new Object();
LinternaMagica.prototype.sites["www.vimeo.com"] = "vimeo.com";
LinternaMagica.prototype.sites["vimeo.com"].flash_plugin_installed = "youtube.com";
LinternaMagica.prototype.sites["vimeo.com"].extract_object_from_script = function()
{
    var player_element_re = new RegExp(
	"player[0-9]+_[0-9]+_element\\\s*=\\\s*"+
	    "document.getElementById\\\(\\\'([a-zA-Z0-9_]+)\\\'\\\)",
	"im");
    var data = this.script_data;
    var player_element = data.match(player_element_re);
    if (!player_element)
    {
	return null;
    }
    var el = document.getElementById(player_element[1]);
    if (!el)
    {
	return null;
    }
    var video_id = data.match(/\"id\":([0-9]+),/);
    if (video_id)
    {
	video_id = video_id[1];
    }
    var width = el.clientWidth || el.offsetWidth || 
	el.parentNode.clientWidth || el.parentNode.offsetWidth;
    var height = el.clientHeight || el.offsetHeight || 
	el.parentNode.clientHeight || el.parentNode.offsetHeight;
    if (video_id && width && height)
    {
	var object_data = new Object();
	object_data.width = width;
	object_data.height = height;
	object_data.video_id = video_id;
	object_data.parent = el;
	object_data.mime = "video/mp4";
	var time_stamp = this.extract_time_stamp_vimeo();
	var signature = this.extract_signature_vimeo();
	if (!time_stamp)
	{
	    this.log("LinternaMagica.extract_object_from_script_vimeo:\n"+
		     "Unable to extract time stamp. Giving up.",1);
	    return null;
	}
	if (!signature)
	{
	    this.log("LinternaMagica.extract_object_from_script_vimeo:\n"+
		     "Unable to extract signature. Giving up.",1);
	    return null;
	}
	var codecs = this.extract_codec_and_quality_vimeo();
	var args  = new Object();
	args.object_data = object_data;
	args.codecs = codecs;
	args.time_stamp = time_stamp;
	args.signature = signature;
	var hd_links = this.create_links_vimeo(args);
	object_data.hd_links = hd_links;
	object_data.link = hd_links ? hd_links[hd_links.length-1].url : null;
	if (!object_data.link)
	{
	    return null;
	}
	this.log("LinternaMagica.extract_object_from_script_vimeo:\n"+
		 "Object data extracted from script ",1);
	object_data.linterna_magica_id =
	    this.mark_flash_object("extracted-from-script");
	return object_data;
    }
    return null;
}
LinternaMagica.prototype.sites["vimeo.com"].css_fixes = function(object_data)
{
    if (object_data.parent.firstChild &&
	/HTMLDiv/i.test(object_data.parent.firstChild))
    {
	object_data.parent.removeChild(object_data.parent.firstChild);
	var flash_object = 
	    this.get_flash_video_object(object_data.linterna_magica_id, 
					object_data.parent);
	if (flash_object)
	{
	    flash_object.style.setProperty("position", 
					   "relative", "important");
	}
    }
    object_data.parent.style.
	setProperty("overflow", "visible", "important");
    object_data.parent.parentNode.style.
	setProperty("overflow", "visible", "important");
    object_data.parent.parentNode.style.
	setProperty("background-color", "transparent", "important");
    object_data.parent.parentNode.style.
	setProperty("background-image", "none", "important");
    var object_tag = 
	document.getElementById("linterna-magica-video-object-"+
				object_data.linterna_magica_id);
    if (object_tag)
    {
	object_tag.style.setProperty("position","relative","important");
    }
    var third_parent = object_data.parent.parentNode.parentNode;
    if (third_parent)
    {
	third_parent.style.setProperty("overflow", "visible",
				       "important");
	third_parent.style.setProperty("height", 
				       (parseInt(object_data.height)+26+
					2+
					(this.controls ? 24 : 0)  )+40+"px",
				       "important");
	third_parent.style.
	    setProperty("background-color", "transparent", "important");
    }
    var fourth_parent = object_data.parent.parentNode.
	parentNode.parentNode;
    if (fourth_parent)
    {
	fourth_parent.style.setProperty("overflow", "visible",
					"important");
	fourth_parent.style.setProperty("height", 
					(parseInt(object_data.height)+26+
					 2+
					 (this.controls ? 24 : 0)  )+40+"px",
					"important");
    }
    object_data.parent.parentNode.style.
	setProperty("height", (parseInt(object_data.height)+26+
		     2+
		     (this.controls ? 24 : 0)  )+"px", "important");
    object_data.parent.parentNode.style.
	setProperty("width", (parseInt(object_data.width+2))+"px",
		    "important");
    var site_html5_player = 
	this.find_site_html5_player_wrapper(object_data.parent);
    if (site_html5_player)
    {
	site_html5_player.style.setProperty("height", "87%", "important");
	site_html5_player.style.setProperty("margin-bottom", 
					    "5px", "important");
    }
    var lm = document.getElementById("linterna-magica-"+
     				     object_data.linterna_magica_id);
    if (lm)
    {
    	var div_sbu = lm.previousSibling;
    	if (/HTMLDiv/i.test(div_sbu) && 
	    div_sbu.hasAttribute("class") && 
	    /s bu/i.test(div_sbu.getAttribute("class")) &&
	    !site_html5_player)
    	{
    	    div_sbu.parentNode.removeChild(div_sbu);
    	}
    } 
    if (lm)
    {
    	var div = lm.previousSibling;
    	if (/HTMLDiv/i.test(div))
    	{
    	    div.parentNode.removeChild(div);
    	}
    } 
    var gallery = document.getElementById("videos_gallery");
    if (gallery)
    {
	gallery.style.setProperty("margin-top", "90px", "important");
    }
    this.vimeo_fix_navigation();
    return false;
}
LinternaMagica.prototype.sites["vimeo.com"].
    process_duplicate_object_before_xhr =
function(object_data)
{
    this.log("LinternaMagica.sites.process_duplicate_object_before_xhr:\n"+
             "Removing/hiding duplicate object ",1);
    this.hide_flash_video_object(object_data.linterna_magica_id,
                                 object_data.parent);
    return false;
}
LinternaMagica.prototype.sites["vimeo.com"].
    skip_video_id_extraction = function()
{
    return null;
}
LinternaMagica.prototype.vimeo_fix_navigation = function()
{
    var vimeo_fix_list = function (list_id) 
    {
	var list = document.getElementById(list_id);
	if (!list)
	{
	    return false;
	}
	var vimeo_list_click_fn = function(ev)
	{
	    window.location = this.getAttribute("href");
	}
	var li_elements = list.getElementsByTagName('li');
	for (var i=0, l=li_elements.length; i<l; i++)
	{
	    var li = li_elements[i];
	    var a = li.getElementsByTagName("a");
	    if (a && a[0]) {
		a[0].addEventListener("click", vimeo_list_click_fn, true);
	    }
	}
	return true;
    }
    if (window.location.pathname == '/')
    {
	vimeo_fix_list('featured_videos');
	var featured_ = document.getElementById("featured_videos");
	if (featured_videos)
	{
	    featured_videos.addEventListener("DOMNodeInserted",
				    function(e)
				    {
					var timeout = function()
					{
					    vimeo_fix_list('featured_videos');
					}
					setTimeout(timeout, 500);
					setTimeout(timeout, 1200);
					setTimeout(timeout, 5000);
				    }, false);
	}
    }
    else
    {
	var brozar = document.getElementById("brozar");
	if (brozar)
	{
	    brozar.addEventListener("DOMNodeInserted", 
				    function(e)
				    {
					var timeout = function()
					{
					    vimeo_fix_list('clips');
					}
					setTimeout(timeout, 500);
					setTimeout(timeout, 1200);
					setTimeout(timeout, 5000);
				    }, false);
	}
    }
}
LinternaMagica.prototype.sites["yourlisten.com"] = new Object();
LinternaMagica.prototype.sites["www.yourlisten.com"] = "yourlisten.com";
LinternaMagica.prototype.sites["yourlisten.com"].set_video_link_regex =
function()
{
    var result = new Object();
    result.link_re = new RegExp(
	"soundfile=(.*)",
	"i");
    result.link_position = 1;
    return result;
}
LinternaMagica.prototype.sites["yourlisten.com"].
    do_not_clean_amps_in_extracted_link = "video.google.com";
LinternaMagica.prototype.sites["yourlisten.com"].css_fixes =
function(object_data)
{
    var computed_height = 
	document.defaultView.
	getComputedStyle(object_data.parent).getPropertyValue("height");
    object_data.parent.style.
	setProperty("height",
		    (parseInt(computed_height)+50)+"px",
		    "important");
    object_data.parent.style.setProperty("margin-bottom",
					 "50px", "important");
    return false;
}
LinternaMagica.prototype.extract_youtube_fmt_parameter = function()
{
    var data = this.script_data;
    var fmt_re = new RegExp (
	"(\\\"|\\\'|\\\&)fmt_list"+
	    "(\\\"|\\\')*(\\\=|\\\:|,)\\\s*(\\\"|\\\')*"+
	    "([a-zA-Z0-9\\\-\\\_\\\%\\\=\\\/,\\\\]+)");
    var fmt = data.match(fmt_re);
    if (fmt)
    {
	fmt = fmt[fmt.length-1].replace(/\\/g, "");
	this.log("LinternaMagica.extract_youtube_fmt_parameter:\n"+
		 "Extracted fmt  : "+fmt,1);
	return unescape(fmt);
    }
    else
    {
	this.log("LinternaMagica.extract_youtube_fmt_parameter:\n"+
		 "No fmt parameter found. ",1);
    }
    return null;
}
LinternaMagica.prototype.create_youtube_links = function(fmt, fmt_url_map)
{
    if (fmt && fmt_url_map)
    {
	fmt = unescape(fmt).split(/,/);
	var links = new Array();
	for (var f=0; f<fmt.length; f++)
	{
	    var link_data = fmt[f].split(/\//);
	    var link = new Object();
	    var label="";
	    var more_info = "";
	    var fmt_id = link_data[0];
	    switch (fmt_id)
	    {
	    case '5':
	    case '34':
	    case '35':
		label += "FLV";
		break;
	    case '18':
	    case '22':
	    case '37':
	    case '38':
	    case '82':
	    case '83':
	    case '84':
	    case '85':
		label += "MP4";
		break;
	    case '43':
	    case '44':
	    case '45':
	    case '46':
	    case '100':
	    case '101':
	    case '102':
		label += " WebM";
		break;
	    case '13':
	    case '17':
	    case '36':
		label += " 3GP";
		break;
	    default:
		label += this._("Unkown container");
	    }
	    switch (fmt_id)
	    {
	    case '82':
	    case '83':
	    case '84':
	    case '85':
	    case '100':
	    case '101':
	    case '102':
		label += " 3D";
		break;
	    default:
		"";
	    }
	    switch (fmt_id)
	    {
	    case '5':
		more_info += "Sorenson H.263, MP3";
		break;
	    case '18':
	    case '22':
	    case '34':
	    case '35':
	    case '37':
	    case '38':
	    case '82':
	    case '83':
	    case '84':
	    case '85':
		more_info += "MPEG-4 AVC (H.264), AAC";
		break;
	    case '43':
	    case '44':
	    case '45':
	    case '46':
	    case '100':
	    case '101':
	    case '102':
		more_info += "VP8, Vorbis";
		break;
	    case '13':
	    case '17':
	    case '36':
		more_info += "MPEG-4 Visual, AAC";
		break;
	    default:
		more_info += " " + this._("Unkown encoding");
	    }
	    link.label  = link_data[1].split(/x/)[1] + "p " +label;
	    link.more_info = link_data[1] + " " +label+ " " + more_info;
	    if (!fmt_url_map[fmt_id])
	    {
		this.log("LinternaMagica.create_youtube_links:\n"+
			 "Missing URL for fmt_id "+fmt_id+
			 " in array map fmt_url_map",5);
		continue;
	    }
	    link.url = fmt_url_map[fmt_id];
	    this.log("LinternaMagica.create_youtube_links:\n"+
		     "Extracted link  : "+link.url,4);
	   links.push(link);
	}
	return links;
    }
    return null;
}
LinternaMagica.prototype.detect_youtube_flash_upgrade = function(object_data)
{
    this.youtube_flash_upgrade_counter++;
    var watch_player = document.getElementById("watch7-player");
    var fancy_alert = null;
    if(watch_player && watch_player.hasAttribute("class") &&
       /flash-player/i.test(watch_player.getAttribute("class")))
    {
	var alert = watch_player.querySelector(".yt-alert-message");
	if (alert && /flash player/i.test(alert.textContent))
	{
	    fancy_alert = true;
	}
    }
    if (document.getElementById("movie_player") ||
	document.getElementById("movie_player-html5") ||
	fancy_alert ||
	this.youtube_flash_upgrade_counter >= 5 )
    {
	clearInterval(this.youtube_flash_upgrade_timeout);
	this.log("LinternaMagica.detect_youtube_flash_upgrade:\n"+
		 "Removing plugin install warning.",2);
	this.remove_plugin_install_warning(object_data.parent);
	this.log("LinternaMagica.detect_youtube_flash_upgrade:\n"+
		 "Creating video object.",2);
	setTimeout(this.create_video_object(object_data), 1000);
    }
}
LinternaMagica.prototype.extract_youtube_fmt_url_map = function()
{
    var data = this.script_data;
    var fmt_re = new RegExp (
	"(\\\"|\\\'|\\\&|\\\&amp;)url_encoded_fmt_stream_map"+
	    "(\\\"|\\\')*(\\\=|\\\:|,)\\\s*(\\\"|\\\')*"+
	    "([a-zA-Z0-9\\\-\\\_\\\%\\\=\\\/,\\\\\.\|:=&%\?\+]+)");
    var fmt = data.match(fmt_re);
    if (fmt)
    {
	this.log("LinternaMagica.extract_youtube_fmt_url_map:\n"+
		 "Extracted fmt_url_map.",1);
	this.log("LinternaMagica.extract_youtube_fmt_url_map:\n"+
		 "RAW map variable:"+fmt,5);
	var map = new Object();
	fmt = fmt[fmt.length-1].replace(/\\\//g, "/");
	fmt = fmt.split(/,/);
	var links = 0;
	for (var url=0; url<fmt.length; url++) 
	{
	    var link = fmt[url].match(/(url|conn)=([^&]+)/);
	    var fmt_id = fmt[url].match(/itag=([0-9]+)/);
	    var sig = fmt[url].replace(/\\u0026/g, '&').match(/sig=[^&]+/);
		sig = sig[sig.length-1].replace(/sig/,'signature');
	    if (fmt_id && link)
	    {
		links++;
		link = unescape(link[link.length-1]);
		link = link.replace(/\\u0026stream=/, '/');
		link = link.split(/\\u0026/)[0];
		map[fmt_id[fmt_id.length-1]] =  link+"&"+sig;
	    }
	}
	return links ? map: null;
    }
    else
    {
	this.log("LinternaMagica.extract_youtube_fmt_url_map:\n"+
		 "No fmt_url_map parameter found. ",1);
    }
    return null;
}
LinternaMagica.prototype.sites["youtube.com"] = new Object();
LinternaMagica.prototype.sites["www.youtube.com"] = "youtube.com";
LinternaMagica.prototype.sites["www.youtube-nocookie.com"] = "youtube.com";
LinternaMagica.prototype.sites["youtube-nocookie.com"] = "youtube.com";
LinternaMagica.prototype.sites["youtube.com"].flash_plugin_installed =
function()
{
    return this.sites.__no_flash_plugin_installed.apply(this, [arguments]);
}
LinternaMagica.prototype.sites["youtube.com"].skip_script_processing =
function()
{
    return true;
}
LinternaMagica.prototype.sites["youtube.com"].skip_link_extraction = function()
{
    this.log("LinternaMagica.sites.skip_link_extraction:\n"+
	     "Skipping link extraction in YouTube. Might bloat "+
	     "GNU IceCat and other forks and versions of Firefox.",4);
    return false;
}
LinternaMagica.prototype.sites["youtube.com"].skip_video_id_extraction = function()
{
    this.log("LinternaMagica.sites.skip_video_id_extraction:\n"+
	     "Skipping video_id extraction in YouTube.",4);
    return false;
}
LinternaMagica.prototype.sites["youtube.com"].extract_object_from_script =
function()
{
    var data = this.script_data;
    if (!data.match(/var\s*swfConfig/) &&
	!data.match(/yt\.setConfig/))
    {
 	return null;
    }
    var height = data.match(/\"height\"\:\s*\"([0-9]+)\"/);
    var width = data.match(/\"width\"\:\s*\"([0-9]+)\"/);
    this.extract_video_id_data = data;
    var fmt = this.extract_youtube_fmt_parameter();
    var maps = this.extract_youtube_fmt_url_map();
    var hd_links = this.create_youtube_links(fmt, maps);
    var link = (hd_links && hd_links.length) ? hd_links : null;
    var embed_id = data.match(/\"id\"\:\s*\"([a-zA-Z0-9_\-]+)\"/);
    if (!link)
    {
	return null;
    }
    if (height)
    {
	height = height[height.length-1];
    }
    if (width)
    {
	width = width[width.length-1];
    }
    if (embed_id)
    {
	embed_id= embed_id[embed_id.length-1];
    }
    var p = this.get_first_element_by_class("flash-player");
    p = p ? p : this.get_first_element_by_class("html5-player");
    if (!width || !height)
    {
	height = p ? p.clientHeight : null;
	width  = p ? p.clientWidth : null;
    }
    if (!width || !height)
    {
	this.log("LinternaMagica.extract_object_from_script_youtube:\n"+
		 "Missing object data "+
		 "\n H: "+height+
		 "\n W:"+width, 3);
	return null;
    }
    this.log("LinternaMagica.extract_object_from_script_youtube:\n"+
	     " H: "+height+
	     "\n W:"+width+
	     "\n embedid "+embed_id,2);
    var object_data = new Object();
    var linterna_magica_id = null;
    object_data.width= width;
    object_data.height= height;
    object_data.link = hd_links ? hd_links[hd_links.length-1].url : null;
    object_data.hd_links = link;
    if (embed_id)
    {
	embed_object = document.getElementById(embed_id);
	if (embed_object)
	{
	    if (this.plugin_is_installed)
	    {
		linterna_magica_id =
		    this.mark_flash_object(embed_object);
		object_data.parent = embed_object.parentNode;
	    }
	}
    }
    if (!embed_id ||
	!embed_object ||
	(embed_object &&
	 !this.plugin_is_installed))
    {
	linterna_magica_id =
	    this.mark_flash_object("extracted-from-script");
	object_data.parent =  p;
    }
    object_data.linterna_magica_id = linterna_magica_id;
    return object_data;
}
LinternaMagica.prototype.sites["youtube.com"].
    stop_if_one_extracted_object_from_script =
function()
{
    this.log("LinternaMagica.sites.stop_if_"+
	     "one_extracted_object_from_script:\n"+
 	     "Found one object in YouTube. Stopping script processing",3);
    return false;
}
LinternaMagica.prototype.sites["youtube.com"].
    replace_extracted_object_from_script = 
function(object_data)
{
    if (!this.youtube_flash_upgrade_timeout)
    {
	this.youtube_flash_upgrade_counter = 0;
	var data = object_data;
	var self = this;
	this.youtube_flash_upgrade_timeout = setInterval(
	    function() {
		self.detect_youtube_flash_upgrade.apply(self,[data]);
	    }, 3000);
    }
    return false;
}
LinternaMagica.prototype.sites["youtube.com"].css_fixes =
function(object_data)
{
    this.log("LinternaMagica.youtube.css_fixes:\n "+
	     "Harvesting (possible) lost flash video object with "+
	     "linterna_magica_id "+ object_data.linterna_magica_id);
    var movie_player = document.getElementById('movie_player');
    if (movie_player) {
	movie_player.linterna_magica_id = object_data.linterna_magica_id;
    }
    if (this.priority.self > this.priority.plugin)
    {
	this.hide_flash_video_object(object_data.linterna_magica_id);
    }
    if (document.getElementById("playnav-playview"))
    {
	var el = 	document.getElementById("playnav-playview");
	el.style.setProperty("margin-top", "50px", "important");
	var user_nav = document.getElementById("user_playlist_navigator");
	if (user_nav)
	{
	    user_nav.style.setProperty("overflow", "visible", "important");
	    var height = document.defaultView.getComputedStyle(user_nav).
		getPropertyValue("height");
	    user_nav.style.setProperty("height",
				       (parseInt(height)+50)+"px",
				       "important");
	}
	var playnav_body = document.getElementById("playnav-body");
	if (playnav_body)
	{
	    playnav_body.style.setProperty("overflow",
					   "visible", "important");
	    var color = document.defaultView.getComputedStyle(user_nav).
		getPropertyValue("background-color");
	    color = color ? color : "#999999";
	    playnav_body.style.setProperty("border-top",
	     				   "1px solid "+color,  "important");
	}
	var playnav_play_content =
	    document.getElementById("playnav-play-content");
	if (playnav_play_content)
	{
	    var height = document.defaultView.
		getComputedStyle(playnav_play_content).
		getPropertyValue("height");
	    playnav_play_content.style.
		setProperty("height",
			    (parseInt(height)+50)+"px",
			    "important");
	}
    }
    object_data.parent.style.setProperty("overflow", "visible", "important");
    var site_html5_player = 
	this.find_site_html5_player_wrapper(object_data.parent);
    if (site_html5_player)
    {
	site_html5_player.style.setProperty("margin-bottom", "30px", "important");
	object_data.parent.style.setProperty("margin-bottom",
						 "50px", "important");
    }
    var html5_wrapper = document.getElementById("movie_player-html5");
    if (html5_wrapper)
    {
	var html5_warning = html5_wrapper.querySelector(".video-fallback");
	//
	if (!html5_warning)
	{
	    html5_warning =
		html5_wrapper.querySelector(".html5-video-fallback");
	}
	if (html5_warning &&
	    !/none/i.test(html5_warning.style.getPropertyValue('display')))
	{
	    html5_wrapper.style.setProperty('display', "none", "important");
	    //
	    if (this.priority.html5 > this.priority.self)
 	    {
		var id = object_data.linterna_magica_id;
		this.show_lm_interface(id);
		toggle_plugin = 
		    document.getElementById("linterna-magica-"+
					    "toggle-plugin-"+id);
		var pn = toggle_plugin.parentNode.parentNode;
		pn.removeChild(toggle_plugin.parentNode);
		toggle_plugin_header =
		    document.getElementById("linterna-magica-"+
					    "toggle-plugin-header-"+id);
		toggle_plugin_header.parentNode.removeChild(toggle_plugin_header);
	    }
	    var controls = html5_wrapper.querySelector(".html5-video-controls");
	    var container = html5_wrapper.querySelector(".html5-video-container");
	    if (controls)
	    {
		controls.style.setProperty("display", "none", "important");
	    }
	    if (container)
	    {
		container.style.setProperty("display", "none", "important");
	    }
	}
    }
    var watch7 = document.getElementById('watch7-player');
    if (watch7)
    {
	watch7.style.setProperty("height", 
				 (parseInt(object_data.outer_height)+
				  24)+"px", "important");
	var movie_player = document.getElementById("movie_player");
	if (movie_player)
	{
	    movie_player.style.setProperty("height", 
					   parseInt(object_data.outer_height)+
					   "px", "important");
	}
    }
    return false;
}
LinternaMagica.prototype.mark_flash_object = function(element)
{
    this.found_flash_video_objects ++;
    if (element != "extracted-from-script" ||
	element != "extracted-by-code")
    {
	element.linterna_magica_id = this.found_flash_video_objects;
    }
    return this.found_flash_video_objects;
}
LinternaMagica.prototype.get_flash_video_object =
function(linterna_magica_id)
{
    var object_list = this.create_object_list();
    for (var i=0, l=object_list.length; i<l; i++)
    {
	var o = object_list[i];
	if (o.linterna_magica_id != undefined &&
	    o.linterna_magica_id == linterna_magica_id)
	{
	    return o;
	}
    }
    return null;
}
LinternaMagica.prototype.get_marked_object_id =
function(element)
{
    return element.linterna_magica_id;
}
LinternaMagica.prototype.get_first_element_by_class =
function(className, parent)
{
    var top = parent ? parent : document;
    var children = top.getElementsByTagName("*");
    if (!children)
    {
	return null;
    }
    for (var i=0, l=children.length; i <l; i++)
    {
	var el = children[i];
	if (this.object_has_css_class(el, className))
	{
	    return el;
	}
    }
    return null;
}
LinternaMagica.prototype.object_has_css_class = function (element, className)
{
    var class_regex = new RegExp ("\\\s*("+className+")\\\s*","");
    var matches_class = element.hasAttribute("class") ? 
	element.getAttribute("class").match(class_regex) : null;
    if (matches_class)
    {
	return matches_class[matches_class.length-1];
    }
    return false;
}
LinternaMagica.prototype.add_css_class = function(element, class_name)
{
    if (!this.object_has_css_class(element, class_name))
    {
	var c = element.getAttribute("class");
	element.setAttribute("class", c+" "+class_name);
    }
    return element.getAttribute("class");
}
LinternaMagica.prototype.get_video_object = function(linterna_magica_id)
{
    var video_object = null;
    video_object = document.
	getElementById("linterna-magica-video-object-"+linterna_magica_id);
    return video_object;
}
LinternaMagica.prototype.show_lm_interface = function(linterna_magica_id)
{
    var lm_interface = document.getElementById("linterna-magica-"+
					       linterna_magica_id);
    this.__show_lm(lm_interface);
}
LinternaMagica.prototype.hide_lm_interface = function(linterna_magica_id)
{
    var lm_interface = document.getElementById("linterna-magica-"+
					       linterna_magica_id);
    this.__hide_lm(lm_interface, linterna_magica_id);
}
LinternaMagica.prototype.hide_lm_video_object = function(linterna_magica_id)
{
    var video_object = document.getElementById("linterna-magica-"+
					       "video-object-wrapper-"+
					       linterna_magica_id);
    this.__hide_lm(video_object, linterna_magica_id);
}
LinternaMagica.prototype.show_lm_video_object = function(linterna_magica_id)
{
    var video_object = document.getElementById("linterna-magica-"+
					       "video-object-wrapper-"+
					       linterna_magica_id);
    this.__show_lm(video_object);
}
LinternaMagica.prototype.__show_lm = function(element)
{
    if (!element)
    {
	return null;
    }
    element.style.removeProperty("display");
}
LinternaMagica.prototype.__hide_lm = function(element, linterna_magica_id)
{
    if (!element)
    {
	return null;
    }
    var self = this;
    this.player.stop.apply(self, [linterna_magica_id]);
    element.style.setProperty("display", "none", "important");
}
LinternaMagica.prototype.show_flash_video_object =
function(linterna_magica_id,parent)
{
    var flash_object = 
	this.get_flash_video_object(linterna_magica_id,parent);
    if (!flash_object)
    {
	return null;
    }
    flash_object = this.force_flash_video_object_start(flash_object);
    flash_object.style.removeProperty("display");
    return flash_object;
}
LinternaMagica.prototype.hide_flash_video_object =
function(linterna_magica_id, parent)
{
    var flash_object =
	this.get_flash_video_object(linterna_magica_id, parent);
    if (!flash_object)
    {
	return null;
    }
    flash_object = this.force_flash_video_object_stop(flash_object);
    flash_object.style.setProperty("display", "none", "important");
    return flash_object;
}
LinternaMagica.prototype.force_flash_video_object_stop =
function(flash_object)
{
    var clone = this.force_flash_video_object_src(flash_object, 
						     "x-fake-flash");
    clone = 
	this.force_flash_video_object_type(clone,
				       "x-fake/x-flash-stopped");
    clone = this.force_flash_video_object_injection(flash_object, clone);
    return clone;
}
LinternaMagica.prototype.force_flash_video_object_start =
function(flash_object)
{
    var clone = this.force_flash_video_object_src(flash_object, "swf");
    clone = 
	this.force_flash_video_object_type(clone,
				       "application/x-shockwave-flash");
    clone = this.force_flash_video_object_injection(flash_object, clone);
    return clone;
}
LinternaMagica.prototype.force_flash_video_object_src =
function(flash_object, src)
{
    if (!flash_object || !src)
    {
	return null;
    }
    var old_src = null;
    if (/swf/i.test(src))
    {
	old_src = "x-fake-flash";
    }
    else if (/x-fake-flash/i.test(src))
    {
	old_src = "swf";
    }
    else
    {
	return flash_object;
    }
    var src_attribute = 
	/object/i.test(flash_object.localName) ? "data" : "src";
    var full_src = flash_object.getAttribute(src_attribute);
    if (!full_src)
    {
	return flash_object;
    }
    full_src = full_src.replace('.'+old_src, '.'+src);
    var clone = flash_object.cloneNode(true);
    clone.linterna_magica_id = flash_object.linterna_magica_id;
    clone.setAttribute(src_attribute, full_src);
    return clone;
}
LinternaMagica.prototype.force_flash_video_object_injection =
function(flash_object, clone)
{
    var sibling = flash_object.nextSibling ? 
	flash_object.nextSibling : null;
    var parent = flash_object.parentNode;
    flash_object.parentNode.removeChild(flash_object);
    if (sibling)
    {
	parent.insertBefore(clone, sibling);
    }
    else
    {
	parent.appendChild(clone);
    }
    return clone;
}
LinternaMagica.prototype.force_flash_video_object_type =
function(flash_object, type)
{
    if (!flash_object || !type)
    {
	return null;
    }
    var clone = flash_object.cloneNode(true);
    clone.linterna_magica_id = flash_object.linterna_magica_id;
    flash_object = clone;
    flash_object.setAttribute("type", type);
    return flash_object;
}
LinternaMagica.prototype.find_started_clip = function()
{
    var started = null;
    var self = this;
    for (var i=0,l=this.found_flash_video_objects; i<l; i++)
    {
	var state = self.player.state.apply(self,[i]);
	if (this.get_video_object(i) &&
	    state && state.string)
	    {
		started = i;
		break;
	    }
    }
    return started;
}
LinternaMagica.prototype.find_site_html5_player_wrapper =
function(parent)
{
    if (!parent)
    {
	return null;
    }
    var self = this;
    var html5_player_holder = null;
    var t = null;
    var html5_player_element = null;
    var val = this.call_site_function_at_position.apply(self,[
	"custom_html5_player_finder",
	window.location.hostname, parent]);
    if (val && typeof(val) != "boolean")
    {
	html5_player_element = val;
    }
    else 
    {
	html5_player_element = parent.getElementsByTagName("video");
	if (!html5_player_element || !html5_player_element.length)
	{
	    html5_player_element  =  parent.getElementsByTagName("canvas");
	    if (!html5_player_element || !html5_player_element.length)
	    {
		return null;
	    }
	}
	html5_player_element = html5_player_element[0];
    }
    html5_player_holder = html5_player_element.parentNode;
    while (parent != html5_player_holder)
    {
	t = html5_player_holder;
	if (!html5_player_holder)
	{
	    continue;
	}
	html5_player_holder = html5_player_holder.parentNode;
    }
    if (t !== null)
    {
	html5_player_holder = t;
    }
    if (html5_player_holder == parent)
    {
	html5_player_holder = html5_player_element;
    }
    return html5_player_holder;
}
LinternaMagica.prototype.hide_site_html5_player =
function(parent)
{
    var html5_player =
	this.find_site_html5_player_wrapper(parent);
    if (!html5_player)
    {
	return null;
    }
    html5_player.style.setProperty("display", "none", "important");
    return html5_player;
}
LinternaMagica.prototype.show_site_html5_player =
function(parent)
{
    var html5_player =
	this.find_site_html5_player_wrapper(parent);
    if (!html5_player)
    {
	return null;
    }
    html5_player.style.removeProperty("display");
    return html5_player;
}
LinternaMagica.prototype.pause_site_html5_player =
function(parent)
{
    if (!parent)
    {
	return null;
    }
    var video = parent.getElementsByTagName("video");
    if (!video || !video.length)
    {
	return null;
    }
    video = video[0];
    video.pause();
}
LinternaMagica.prototype.request_video_link = function(object_data)
{
    var protocol = window.location.protocol;
    var host = window.location.host;
    var location_href = window.location.href;
    var video_id = object_data.video_id;
    var address = null;
    var method ="GET";
    var data =null;
    var content= null;
    var client = new XMLHttpRequest();
    if (!this.requested_ids[video_id+host])
    {
	this.requested_ids[video_id+host]=1;
    }
    else
    {
	this.log("LinternaMagica.request_video_link:\n"+
		 "Video with id  "+video_id+
		 " is being processed. Skipping this request."+host,1);
	var self = this;
	var val = this.call_site_function_at_position.apply(self,[
	    "process_duplicate_object_before_xhr",
	    host, object_data]);
	return null;
    }
    var self = this;
    var val = this.call_site_function_at_position.apply(self,[
	"prepare_xhr",
	host, object_data]);
    if (val && typeof(val) != "boolean")
    {
	address = val.address ? val.address : address ;
	method = val.method ? val.method : method;
	data = val.data ? val.data : data;
	content = val.content ? val.content : content;
    }
    var self = this;
    client.onreadystatechange = function() {
	var client = this;
	self.request_video_link_parse_response(client, object_data);
    }
    if (!address)
    {
	this.log("LinternaMagica.request_video_link:\n"+
		 "No address availible for host "+host,1);
	return null;
    }
    if (!/^http/i.test(address))
    {
	address = protocol+"//"+host+address;
    }
    client.open(method,address ,true);
    if (content)
    {
	client.setRequestHeader("Content-Type", content);
    }
    client.send(data);
}
LinternaMagica.prototype.request_video_link_parse_response =
function(client, object_data)
{
    if (client.readyState == 4 && client.status == 200)
    {
	var host = window.location.hostname;
	if (this.requested_ids[object_data.video_id+host])
	{
	    delete this.requested_ids[object_data.video_id+host];
	}
	var url;
	var mime= "video/flv";
	var self = this;
	var val = this.call_site_function_at_position.apply(self,[
	    "process_xhr_response",
	    host, {client: client, object_data:object_data}]);
	if (!val ||  typeof(val) == "boolean" || (val && !val.link))
	{
	    return null;
	}
	else
	{
	    object_data = val;
	}
	if (!object_data.mime)
	{
	    object_data.mime = mime;
	}
	var self = this;
	var val = this.call_site_function_at_position.apply(self,[
	    "insert_object_after_xhr",
	    host, object_data]);
	if (val)
	{
	    this.log("LinternaMagica.request_video_link_parse_response:\n"+
		     "Removing plugin install warning.",2);
	    this.remove_plugin_install_warning(object_data.parent);
	    this.log("LinternaMagica.request_video_link_parse response:\n"+
		     "Creating video object with url: "+object_data.link,1);
	    this.create_video_object(object_data);
	}
    }
}
function linterna_magica_init ()
{
    delete LinternaMagica.static_strings;
    window.linterna_magica_init_counter ++;
    var ready_to_init = 0;
    if (window.linterna_magica_init_counter >= 6 ||
	window.linterna_magica_user_config != undefined || 
       	window.LinternaMagica_L10N != undefined)
    {
	clearInterval(window.linterna_magica_init_timeout);
	ready_to_init = 1;
    }
    if (ready_to_init)
    {
	var config = new Object();
	for (var o in linterna_magica_options)
	{
	    if (window.linterna_magica_user_config != undefined &&
		window.linterna_magica_user_config[o] != undefined)
	    {
		config[o] = window.linterna_magica_user_config[o];
	    }
	    else
	    {
		config[o] = linterna_magica_options[o];
	    }
	}
	delete window.linterna_magica_user_config;
	for (var loc in window.LinternaMagica_L10N)
	{
	     LinternaMagica.prototype.languages[loc] =
		window.LinternaMagica_L10N[loc];
	    var dir = window.LinternaMagica_L10N[loc]["__direction"];
	    if (dir != "rtl" &&
		dir != "ltr")
	    {
		dir = "ltr";
	    }
	    LinternaMagica.prototype.languages[loc]["__direction"] = 
		dir.toLowerCase();
	}
	delete window.LinternaMagica_L10N;
	var larerna_magica = new LinternaMagica(config);
    }
}
window.linterna_magica_init_counter = 0;
window.linterna_magica_init_timeout = 
    setInterval(linterna_magica_init, 250);
})();
