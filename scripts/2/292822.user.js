// ==UserScript==
// @name        Skaista Klase
// @namespace   eklase
// @description Ļaunais e-klases paplašinājums tagad arī uz firefox!
// @include     *.e-klase.lv/*
// @version     1
// @run-at document-end
// ==/UserScript==

// functions prefixed with "act_" do something,
// while the ones prefixed with "js_" return code to be injected

function act_change_login_form_target() {
	// this simply changes the form target to a value that doesn't indicate
	// that a new window should be opened.
	document.getElementById('eklase_login').target = '';
}

function js_dont_create_windows() {
	// this replaces m_own(), the function used by eklase to create popups,
	// with a function that returns a dummy object that doesn't do anything
	// (yet supports .focus(), since they call it)
	return 'function m_own() { return {"focus": function () {}}; }\n';
}

function fixCSS() {
	GM_addStyle("body {" + 
	"	    height: auto !important;" + 
	"	}" + 
	"" + 
	"	#bc_wrap," + 
	"	#content_wrap," + 
	"	#top_adv_box_r {" + 
	"	    width: auto !important;" + 
	"	    max-width: 800px;" + 
	"	}" + 
	"" + 
	"	.top_nav {" + 
	"	    overflow-x: hidden !important;" + 
	"	}" + 
	"" + 
	"	#footer {" + 
	"	    width: 0px !important;" + 
	"	    height: 0px !important;" + 
	"	}" + 
	"" + 
	"	#top_adv_box," + 
	"	#top_adv_box_r," + 
	"	#top_sub_nav," + 
	"	#idx_content," + 
	"	.open_faq," + 
	"	.q," + 
	"	#mn_dbg," + 
	"	#fake_ph_uname," + 
	"	#fake_ph_pass," + 
	"	#slide_wrap," + 
	"	.todays_names," + 
	"	#btn_live_demo," + 
	"	#wall_left," + 
	"	#wall_right {" + 
	"	    display: none !important;" + 
	"	}" + 
	"" + 
	"	#btn_search {" + 
	"	    right: 1px !important;" + 
	"	}" + 
	"" + 
	"	#btn_archive {" + 
	"	    right: 109px !important;" + 
	"	}" + 
	"" + 
	"	.soc_icons {" + 
	"	    right: 176px !important;" + 
	"	}" + 
	"" + 
	"	#login_box_main {" + 
	"	    background: #86BF3C !important;" + 
	"	    border-radius: 10px !important;" + 
	"	    width: 100% !important;" + 
	"	    height: 145px !important;" + 
	"	    top: 100px !important;" + 
	"	}" + 
	"" + 
	"	#eklase_login input {" + 
	"	    width: 95% !important;" + 
	"	    left: 2.5% !important;" + 
	"	    border: 2px solid #658F4A !important;" + 
	"	    border-radius: 10px !important;" + 
	"	    background: white !important;" + 
	"	}" + 
	"" + 
	"	#eklase_login button {" + 
	"	    background: #658F4A !important;" + 
	"	    border-radius: 10px !important;" + 
	"	    width: 95% !important;" + 
	"	    left: 2.5% !important;" + 
	"	}");
}

function do_everything() {
	act_change_login_form_target();

	var script = js_dont_create_windows();
	var element = document.createElement('script');
	element.textContent = script;
	document.body.appendChild(element);
}

fixCSS();
do_everything();

