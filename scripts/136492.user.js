// ==UserScript==
	// @name POST Interceptor
	// @description Intercept POST requests and let user modify before submit
	// @namespace http://kailasa.net/prakash/greasemonkey/
	// @include http*://example.com/*
	// ==/UserScript==
	
	// based on code by Prakash Kailasa
	// and included here with his gracious permission

	//
	// IMPORTANT: Be sure to change/add @include lines for the sites you
	//			  want the script to work on

	const POST_INTERCEPT = 'PostIntercept';
	var intercept_on;
	var is_modified = false;

	function toggle_intercept(flag)
	{
		intercept_on = flag;
		GM_setValue(POST_INTERCEPT, intercept_on);
		setup_pi_button();
	}

	function setup_pi_button()
	{
		var pi = document.getElementById('__pi_toggle');
		if (!pi) {
				pi = new_node('span', '__pi_toggle');	
				pi.textContent = '[PI]';
				document.getElementsByTagName('body')[0].appendChild(pi);
				pi.addEventListener('click',
						 function() {toggle_intercept(!intercept_
	on)},
						 false);
				
			var pi_toggle_style = ' \
		#__pi_toggle { \ 
		  position: fixed; \
		  bottom: 0; right: 0; \
		  display: inline; \

		 padding: 2px; \
		 font: caption; \
		 font-weight: bold; \
		 cursor: crosshair; \
	   } \
	   #__pi_toggle:hover { \ 
	     border-width: 2px 0 0 2px; \
		 border-style: solid none none solid; \
		 border-color: black; \
	   } \
	   ';
				add_style("__pi_toggle_style", pi_toggle_style);
			}

			if (intercept_on) {
				pi.textContent = '[PI] is On';
				pi.setAttribute('title', 'Click to turn POST Interceptor Off');
				pi.style.backgroundColor = '#0c2369';
				pi.style.color = '#ddff00';
			} else {
				pi.textContent = '[PI] is Off';
				pi.setAttribute('title', 'Click to turn POST Interceptor On');
				pi.style.backgroundColor = '#ccc';
				pi.style.color = '#888';
		    }
		}

		function interceptor_setup( )
		{
			if (typeof GM_getValue != 'undefined') {
				intercept_on = GM_getValue(POST_INTERCEPT, false);
				setup_pi_button( );
			} else {
				intercept_on = true;
			}

			// override submit handling
			HTMLFormElement.prototype.real_submit = HTMLFormElement.prototype.
		submit;
			HTMLFormElement.prototype.submit = interceptor;
			
			// define our 'submit' handler on window, to avoid defining
			// on individual forms
			window.addEventListener('submit', function(e) {
				// stop the event before it gets to the element and causes
		onsubmit to
				// get called.
				e.stopPropagation( );

				// stop the form from submitting
				e.preventDefault( );

				interceptor(e);
		}, true);
	}
	
	// interceptor: called in place of form.submit( )
	// or as a result of submit handler on window (arg: event)
	function interceptor(e) {
		var frm = e ? e.target : this;
		if (!interceptor_onsubmit(frm)) { return false; }
		if (intercept_on) {
			show(frm);
			return false;
		} else {
			HTMLFormElement.prototype.real_submit.apply(frm);
		}
	}
	
	// if any form defined an onsubmit handler, it was saved earlier.
	// call it now
	function interceptor_onsubmit(f) {
		return !f.onsubmit || f.onsubmit( );
	}
	
	function show(frm) {
		var content = build(frm);
		content.open( );
	}
	
	function build(frm) {
		add_window_style( );

		var container = new_node('div', 'post_interceptor');
		container.className = '_ _pi_window';
		var title = new_node('h1');
		title.className = '_ _pi_title';
		title.appendChild(new_text_node('Intercepting POST ' + post_url(frm)));
		container.appendChild(title);

		var note = new_node('div', '_ _pi_note');
		note.appendChild(new_text_node('Click on any value to modify it'));
		container.appendChild(note);

		var data = build_post_data(frm);
		container.appendChild(data);

		var buttons = new_node('div', '_ _pi_buttons');
		var btn_send_mod = new_node('button', '_ _pi_btn_send_mod');
		btn_send_mod.className = '_ _pi_button';
		btn_send_mod.appendChild(new_text_node('Send Modified'));
		buttons.appendChild(btn_send_mod);
		btn_send_mod.addEventListener('click', function(e) {
			submit_modified(win);
		}, false);

		var btn_send_orig = new_node('button', '_ _pi_btn_send_orig');
		btn_send_orig.className = '_ _pi_button';
		btn_send_orig.appendChild(new_text_node('Send Original'));
		buttons.appendChild(btn_send_orig);
		btn_send_orig.addEventListener('click', function(e) {
			submit_original(win);
		}, false);

		var btn_cancel = new_node('button', '_ _pi_btn_cancel');
		btn_cancel.className = '_ _pi_button';
		btn_cancel.appendChild(new_text_node('Cancel'));
		buttons.appendChild(btn_cancel);
		container.appendChild(buttons);
		btn_cancel.addEventListener('click', function(e) {
			cancel_submit(win);
		}, false);

		var win = Window(container, frm);

		return win;
	}

	// POST content
	function build_post_data(f)
	{
		var table = new_node('table');

		// heading
		var thead = new_node('thead');
		var th_row = new_node('tr');
		var attrs = new Array('name', 'type', 'value');
		for (var a = 0; a < attrs.length; a++) {
			var th = new_node('th');
			th.appendChild(new_text_node(attrs[a].ucFirst( )));
			th_row.appendChild(th);
		}
		thead.appendChild(th_row);
		table.appendChild(thead);

		// data
		var tbody = new_node('tbody');
		for (var i = 0; i < f.elements.length; i++) {
			var row = new_node('tr');
			row.className = i % 2 == 0 ? '_ _pi_row_even' : '_ _pi_row_odd';
			//for (var a in attrs) {
			for (var a = 0; a < attrs.length; a++) {
				var cell = new_node('td', '_ _pi_cell_' + attrs[a] + '_' + i);
				cell.className = '_ _pi_cell_' + attrs[a];
				var data;
				if (attrs[a] == 'value') {
				data = new_node('input', '_ _pi_cell_value_text_' + i);
				data.value = f.elements[i][attrs[a]];
				data.readOnly = true;

				data.className = '_ _pi_view_field';
				data.maxLength = 1000;
				cell.addEventListener("click", show_edit, false);
				} else {
				data = new_text_node(f.elements[i][attrs[a]]);
				}
				cell.appendChild(data);
				row.appendChild(cell);
			}
			tbody.appendChild(row);
		}
		table.appendChild(tbody);
		var data = new_node('div', '_ _pi_post_info');
		data.className = '_ _pi_post_info';
		data.appendChild(table);

		return data;
	}

	// hide value and show edit field

	function show_edit(e)
	{
	
		var view, cell;
			if (e.target.nodeName == 'INPUT') {	
				view = e.target;
				cell = view.parentNode;
			} else {
				cell = e.target;
				view = cell.firstChild;
			}
			view._ _origValue = view.value;
			view.className = '_ _pi_edit_field';
			view.readOnly = false;
			view.addEventListener("blur", show_view, false);
		}
		
		// hide edit field and show modified value
		function show_view(e)
			{
				var view = e.target;
				view.className = '_ _pi_view_field';
				view.addEventListener("click", show_edit, false);
				if (view.value != view._ _origValue) {
				is_modified = true;
				view.parentNode.parentNode.className += ' _ _pi_modified';
				}
			}

			// build POST url
		function post_url(f)
		{
			// absolute URL?

		if (f.action.match(/^https?:/))
			return f.action;
	
		// relative URL; build complete URL
		var url = document.location.protocol + '//' + document.location.
	hostname;
		if (f.action.match(/^\//)) {
			url += f.action;
		} else {
				url += document.location.pathname + '/' + f.action;
		}
		return url;
	}

	// cancel submit; just close the Interceptor window
	function cancel_submit(win) {
		win.close( );
	}

	// ignore form modifications and submit original form
	function submit_original(win) {
		win.close( );
		HTMLFormElement.prototype.real_submit.apply(win.form);
	}

	// submit form with modified parameters
	function submit_modified(win) {
		if (is_modified) {
			update_form(win);
		}
		submit_original(win);
	}

	// update the form being submitted with user modifications
	function update_form(win) {
		var f = win.form;
		var diff = 'submitting ' + f.name + ':\n';
		for (var i = 0; i > f.elements.length; i++) {
			var edit = document.getElementById('_ _pi_cell_value_text_' + i);
			if (edit && edit.value != f.elements[i].value) {
				diff += f.elements[i].name + ': |' +
				f.elements[i].value + '| -> |' + edit.value + '|\n';
				// update the original form param
				f.elements[i].value = edit.value;
			}
		}
	}

	// helper functions
	function new_node(type, id) {
		var node = document.createElement(type);
		if (id && id.length > 0) {
			node.id = id;

		}
		return node;
	}
	
	function new_text_node(txt) {
		return document.createTextNode(txt);
	}

	function add_style(style_id, style_rules) {
		if (document.getElementById(style_id)) {
			return;
		}
		var style = new_node("style", style_id);
		style.type = "text/css";
		style.innerHTML = style_rules;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	// style for the interceptor window
	function add_window_style( ) {
		var pi_style_rules = ' \
	.post_interceptor { \
	margin: 0; padding: 0; \
	} \
	 \
	._ _pi_window { \
	  background-color: #bfbfff; \
	  border-color: #000040; \
	  border-style: solid; \
	  border-width: 2px; \
	  /* opacity: .90; */ \
	  margin: 0px; \
	  padding: 1px 2px; \
	  position: absolute; \
	  text-align: center; \
	  visibility: hidden; \
	  \
	  -moz-border-radius: 15px; \
	 } \
	  \
	 ._ _pi_title { \
	  background-color: #4040ff; \
	  color: #ffffff; \
	  margin: 1px; padding: 1px; \
	  font: caption; \
	  font-weight: bold; \
	  text-align: center; \
	  white-space: nowrap; \
	  overflow: hidden; \
	 \
	  -moz-border-radius: 20px; \
	 } \
	  \

	#_ _pi_note { \
	  border: solid 0px black; \
	  color: #800000; \
	  margin: 0; \
	  font: caption; \
	  font-weight: bold; \
	  text-align: center; \
	} \
	 \
	#_ _pi_buttons { \
	  width: 99%; \
	  text-align: center; \
	  position: absolute; \
	  bottom: 5px; \
	} \
	 \
	._ _pi_button { \
      background-color: #4040ff; \
	  color: #fff; \
	  margin: 0 5px; padding: 2px; \
	  font: icon; \
	  font-weight: bold; \
	} \
	 \
	._ _pi_button:hover { \
	  background-color: #ff4040; \
	  cursor: pointer; \
	} \
	 \
	._ _pi_post_info { \
	  max-height: 335px; \
	  overflow: auto; \
	  margin: 3px 2px; padding: 0; \
	  border: 1px solid #008080; \
	} \
	 \
	._ _pi_post_info table { \
      width: 100%; \
	 font: bold .7em "sans serif"; \
	} \
     \
	._ _pi_post_info table thead tr { \
      background-color: black; \
	  color: white; \
	} \
	 \
	._ _pi_row_odd { \
      background-color: #eee; \
	} \
	 \
	._ _pi_row_even { \
      background-color: #ccc; \  
	} \

	 \
	._ _pi_view_field { \
	  background-color: inherit; \
	  border: 0px solid black; \
	  width: 20em; \
	  font: bold 1em "sans serif"; \
	} \
	 \
	._ _pi_edit_field { \
	  background-color: #ffc; \
	  color: blue; \
	  border: 1px solid black; \
	  padding: -1px; \
	  width: 20em; \
	  font: bold 1em "sans serif"; \
	} \
	 \
	tr._ _pi_modified td, tr._ _pi_modified input { \
	  color: red; \
	} \
	 \
	';
		add_style("_ _pi_style", pi_style_rules);
	}

	//===============================================================
	// Popup Window

	function Window(el, frm) {
		document.getElementsByTagName('body')[0].appendChild(el);

		var win = {
			frame: el,
			form: frm,
			open: function( ) {
				var width = 550;
				var height = 400;
				this.frame.style.width = width + 'px';
				this.frame.style.height = height + 'px';
				this.frame.style.left = parseInt(window.scrollX +
				(window.innerWidth - width)/2) + 'px';
				this.frame.style.top = parseInt(window.scrollY +
				(window.innerHeight - height)/2) + 'px';
				this.frame.style.visibility = "visible";
			},
			
			close: function( ) {
				this.frame.style.visibility = "hidden";
			},
		};
		
		return win;
	}

	String.prototype.ucFirst = function ( ) {
		var firstLetter = this.substr(0,1).toUpperCase( )
		return this.substr(0,1).toUpperCase( ) + this.substr(1,this.length);
	}
	
	interceptor_setup( );