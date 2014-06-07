// ==UserScript==
// @name          stylish extension hack for google chrome
// @namespace     http://www.userstyles.org/
// @website       http://userscripts.org/scripts/review/156221
// @version       0.20
// @include       chrome-extension://fjnbnpbmkenffdnngjfgmeleoegfcffe*
// @match         chrome-extension://fjnbnpbmkenffdnngjfgmeleoegfcffe*
// @run-at        document-end
// @icon          http://s3.amazonaws.com/uso_ss/19427/large.png?1357869777
// @history       see http://userscripts.org/scripts/review/156221 for detailed change log
// @todo          present mode - just display specific styles - by ids > input[type="checkbox"] fields
// @description   see http://userscripts.org/scripts/review/156221 for detailed installation instruction
// ==/UserScript==
if ( window.location.origin == "chrome-extension://fjnbnpbmkenffdnngjfgmeleoegfcffe" )
{
	var options = 
	{
		debug: false, // do you need some options.debug output ?
		show_code: false, // do want to publish your css code on userstyles.org ?
		modify: true, // if false this hack doesnt modify the page layout
		present: false, // do you want to make screenshots with special styles?
		present_ids: [ '21', '78', '148' ], // so grab some style ids and put them here...
		reg_exp:
		{
			pattern: RegExp ( '[^A-Za-z0-9]', 'g' ) ,
			modifiers: 'gi'
		} ,
		// make sure that your have different styles
		// 1. is updateable
		// 2. has a update available
		// 3. that match with the online version
		// 4. disabled
		dialog:
		{
			help: 'try helpMePlease(); for some handsome javascript functions'
		}
	}
	
	// need for OTHER COLORS
	var colors =
	{
		black		:	'#000000' ,
		dark_gray	:	'#222222' ,
		middle_gray	:	'#555555' ,
		silver		:	'#C0C0C0' ,
		white		:	'#FFFFFF' ,
		green		:	'#AFC462' ,
		orange		:	'#CF9B76' ,
		blue		:	'#9EC7DE' ,
		red			:	'#BD3F31' ,
		yellow		:	'#FCF005' ,
		rgba3409	:	'rgba(34,34,34,0.9)' ,
		/* editor related colors */
		'CodeMirror'		:	'#3196CF' ,
		'cm-atom'		:	'#33B1A2' ,
		'cm-builtin'		:	'#916AEC' ,
		'cm-comment'		:	'#925517' ,
		'cm-def'			:	'#3BA811' ,
		'cm-error'		:	'#F51313' ,
		'cm-keyword'		:	'#9B0095' ,
		'cm-meta'		:	'#705E5E' ,
		'cm-number'		:	'#2CC5B9' ,
		'cm-operator'	:	'#D4E746' ,
		'cm-property'	:	'#DBB4B4' ,
		'cm-qualifier'	:	'#C9C248' ,
		'cm-string'		:	'#E09D25' ,
		'cm-string-2'	:	'#DB9E73' ,
		'cm-tag'			:	'#7D9B0F' ,
		'cm-tab'			:	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAYAAACXU8ZrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUFBMTg1MTM3RERGMTFFMkI2RDZCQzY0NkU3OTFDNDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUFBMTg1MTQ3RERGMTFFMkI2RDZCQzY0NkU3OTFDNDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1QUExODUxMTdEREYxMUUyQjZENkJDNjQ2RTc5MUM0OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1QUExODUxMjdEREYxMUUyQjZENkJDNjQ2RTc5MUM0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhXCrLkAAAAySURBVHjaYvj//z8DGlZB5zMxYII7QKyCLMCCLoAEVKAaGBiwWIduJVbrECZAAUCAAQCW7jmHDiuwgwAAAABJRU5ErkJggg==' ,
		'cm-variable-2'	:	'#834FA0'
	};
	// need for OTHER COLORS ends here
	
	var button_names =
	{
		de:
		{
			main: 'Filter Option',
			updateable: 'Aktualisierbar',
			none_updateable: 'Nicht Aktualisierbar',
			all_styles: 'Alle Stile' ,
			convert_urls: 'Konvertiere URLs : links'
		} ,
		en:
		{
			main: 'Filter Option',
			updateable: 'Updateable',
			none_updateable: 'Not Updatable',
			all_styles: 'All Styles',
			convert_urls: 'Convert URLs : links'
		}
	};
	
	// user language
	var possible_languages = Object.keys ( button_names );
	var user_language = window.navigator.language;
	var possible_language_found = false;
	for ( pl_key in possible_languages )
	{
		if ( typeof possible_languages[pl_key] == 'string' )
		{
			if ( user_language.indexOf ( possible_languages[pl_key] ) !== -1 )
			{
				possible_language_found = true;
			}
		}
	}
	if ( possible_language_found === false )
	{
		user_language = 'en';
	}
	// niiiiiiiiiceeeeeeeee
	//http://stackoverflow.com/a/6969486
	function escapeRegExp(str)
	{
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}
	
	// just to make things more readable
	var px = function ( num ) { return num + 'px'; };
	var em = function ( num ) { return num + 'em'; };
	var pc = function ( num ) { return num + '%'; }
	// just to make things more complex :D
	var rgba = function ( color1, color2, color3, alpha )
	{
		var color = [];
		if ( arguments.length == 4 )
		{
			for ( a in arguments )
			{
				if ( typeof arguments[a] == 'string' )
				{
					color.push ( arguments[a] );
				}
			}
			return 'rgba(' + color.join ( ',' ) + ')';
		}
	};
	
	var helpMePlease = function ()
	{
		// helpMePlease ()
		var messages =
		[
			"check_applies_to_urls ( );    // replace the relating URLs with clickable links" ,
			"toggle_by_class_name ( 'disabled' );    // shows only DISABELED styles" ,
			"toggle_by_class_name ( 'enabled' );    // shows only ACTIVE styles" ,
			"toggle_by_attribute ( 'style-update-url', true );    // shows all UPDATE-ABLE styles" ,
			"toggle_by_attribute ( 'style-update-url', false );    // hides all UPDATE-ABLE styles" ,
			"toggle_all ( true );    // shows ALL styles" ,
			"toggle_all ( false );    // hides ALL styles" ,
			"show_hidden_features ();    // display hidden features in filter options" ,
			'options.debug = true;    // to turn on debug mode will produce many console.log calls.'
		];
		console && console.log ( messages.join ( "\n" ) );
	};
	
	var error_div_id = 'stylish_modified_error_custom';
	var error_div_message = 'Please Check another Filter Method';
	var error_div_style = 'background-color: ' + colors.red + '; color: ' + colors.black + '; font-weight: bold; border: 2px solid ' + colors.yellow + '; border-radius: 10px; padding: 10px; margin: 50px; margin-top: 50px; margin-left: 320px; text-align: center; min-width: 100px; max-width: 500px;';
	
	var modify_attribute = function ( html_element, mod )
	{
		// modify_attribute ( html_element, mod )
		if ( typeof html_element == 'object' && typeof mod == 'object' )
		{
			var old_values = {};
			var values_set = 0;
			var error = 0;
			var get_attribute = false;
			var set_attribute = false;
			if ( typeof html_element.getAttribute == 'function' )
			{
				get_attribute = true;
			}
			if ( typeof html_element.setAttribute == 'function' )
			{
				set_attribute = true;
			}
			for ( attr in mod )
			{
				if ( typeof mod[attr] == 'string' )
				{
					if ( options.debug ) console && console.log ( attr + ' : ' + mod[attr] );
					if ( get_attribute )
					{
						old_values[attr] = html_element.getAttribute ( attr );
					}
					if ( set_attribute )
					{
						html_element.setAttribute ( attr, mod[attr]  );
						values_set++;
					}
				}
			}
			if ( Object.keys ( old_values ).length )
			{
				return old_values;
			}
			else
			{
				return values_set;
			}
		}
	};
	
	var toggle = function ( html_element, force )
	{
		// toggle ( html_element, force ) // returns previous display value
		var debug = ( options.debug ) ? options.debug : false;
		
		if ( debug ) console && console.log ( 'toggle ( html_element, force ) -', ' html_element : ', html_element, ' force : ', force );
		if ( typeof html_element == 'object' && html_element )
		{
			if ( html_element.style || html_element.hasOwnProperty ( 'style' ) )
			{
				var display_mode = '';
				if ( typeof force == 'string' )
				{
					display_mode = force;
				}
				else
				{
					if ( html_element.style.display == '' )
					{
						display_mode = 'none';
					}
					else
					{
						display_mode = '';
					}
				}
				var previous_mode = html_element.style.display;
				html_element.style.display = display_mode;
				return previous_mode;
			}
		}
		return false;
	}
	
	var toggle_by_class_name = function ( class_name, positiv )
	{
		// toggle_by_class_name ( class_name, positiv ) // positiv (default/empty?) = true
		var debug = ( options.debug ) ? options.debug : false;
		
		// set positiv by default
		if ( positiv === undefined ) { positiv = true; }
		
		var installed = document.getElementById ( 'installed' );
		if ( installed )
		{
			if ( typeof installed.hasChildNodes == 'function' )
			{
				if ( installed.hasChildNodes () )
				{
					var children = installed.children;
					for ( c in children )
					{
						// TOGGLE IT
						var found = false;
						var current_classnames = children[c].className;
						if ( current_classnames )
						{
							var current_classnames_array = [ children[c].className ];
							if ( current_classnames.indexOf ( ' ' ) !== -1 )
							{
								current_classnames_array = current_classnames.split ( ' ' );
							}
							for ( selected_classname in current_classnames_array )
							{
								if ( current_classnames_array[selected_classname] == class_name )
								{
									found = true;
								}
							}
						}
						if ( options.debug )
						{
							if ( found === true )
							{
								console && console.warn ( 'found class_name ( ' + class_name + ' )' );
							}
							else if ( found == false )
							{
								console && console.warn ( 'class_name ( ' + class_name + ' ) NOT FOUND' );
							}
							console && console.log ( 'positiv search = ' + positiv );
						}
						if ( ( found === true && positiv === true ) || ( found === false && positiv === false ) )
						{
							toggle ( children[c], 'block' );
						}
						else if ( ( found === false && positiv === true ) || found === true && positiv === false )
						{
							toggle ( children[c], 'none' );
						}
					}
				}
			}
		}
		check_display ();
	};
	
	var show_hidden_features = function ( )
	{
		// shows hidden features - if available it returns true
		var found = false;
		var debug = ( options.debug ) ? options.debug : false;
		
		if ( debug ) console.log ( 'show_hidden_filter_button() ' );
		var ele = document.querySelectorAll ( '#button-container button' );
		if ( ele )
		{
			if ( debug ) console && console.log ( typeof ele, ele );
			for ( e in ele )
			{
				if ( debug ) console && console.log ( typeof ele[e], ele[e] );
				if ( typeof ele[e] == 'object' )
				{
					var what = toggle ( ele[e], 'inline' );
					if ( what !== 'inline' )
					{
						found = true;
					}
				}
			}
		}
		if ( found )
		{
			console && console.log ( 'hidden features are available now' );
		}
		return found;
	}
	
	var toggle_by_attribute = function ( attribute_key, positiv )
	{
		// toggle_by_attribute ( attribute_key, positiv ) // positiv (default/empty?) = true
		// setting default mode
		var debug = ( options.debug ) ? options.debug : false;
		
		if ( positiv == undefined ) { positiv = true; }
		if ( debug ) console && console.log ( 'toggle_by_attribute ( attribute_key, positiv ) - attribute_key : ', attribute_key, ' - positiv : ', positiv );
		
		var installed = document.getElementById ( 'installed' );
		if ( installed )
		{
			if ( typeof installed.hasChildNodes == 'function' )
			{
				if ( installed.hasChildNodes () )
				{
					var children = installed.children;
					for ( c in children )
					{
						if ( typeof children[c] == 'object' )
						{
							if ( children[c].style || children[c].hasOwnProperty ( 'style' ) )
							{
								var found = false;
								if ( ( children[c].getAttribute ( attribute_key ) && positiv )
								   || ( !children[c].getAttribute ( attribute_key ) && !positiv ) )
								{
									found = true;
									if ( debug ) console && console.log ( 'found' );
								}
								// TOGGLE IT
								if ( found === false )
								{
									if ( debug ) console && console.log ( 'toggle it : none' );
									toggle ( children[c], 'none' );
								}
								else if ( found === true )
								{
									if ( debug ) console && console.log ( 'toggle it : block' );
									toggle ( children[c], 'block' );
								}
							}
						}
					}
				}
			}
		}
		check_display ();
	};
	
	var toggle_all = function ( positiv )
	{
		// toggle_all ( positiv ) // positiv (default/empty?) = true
		// positiv by default
		if ( positiv === undefined ) { positiv = true; }
		var installed = document.getElementById ( 'installed' );
		if ( installed )
		{
			if ( typeof installed.hasChildNodes == 'function' )
			{
				if ( installed.hasChildNodes () )
				{
					var children = installed.children;
					for ( c in children )
					{
						if ( positiv === true )
						{
							toggle ( children[c], 'block' );
						}
						else
						{
							toggle ( children[c], 'none' );
						}
					}
				}
			}
		}
		check_display ();
	};
	
	var check_display = function ( positiv )
	{
		// check_display ( positiv ) // positiv (default/empty?) = true
		//var options.debug = true;
		if ( options.debug ) console && console.log ( 'check_visibility ( positiv )  - positiv : ' + positiv );
		// positiv by default
		if ( positiv === undefined ) { positiv = true; if ( options.debug ) { console && console.log ( 'positiv set by default to true' ); } }
		var installed = document.getElementById ( 'installed' );
		if ( installed )
		{
			if ( options.debug ) console && console.log ( installed );
			if ( typeof installed.hasChildNodes == 'function' )
			{
				if ( installed.hasChildNodes () )
				{
					var children = installed.children;
					if ( options.debug ) console && console.log ( children );
					var visible = false;
					for ( c in children )
					{
						if ( typeof children[c] == 'object' )
						{
							if ( children[c].style.visibility && options.debug )
							{
								console && console.log ( 'check visibility for :', children[c] );
							}
							if ( children[c].style.display !== 'none' && children[c].style.visibility !== 'hidden' )
							{
								if ( options.debug ) console && console.log ( children[c] );
								visible = true;
							}
						}
					}
					if ( options.debug )
					{
						if ( visible === false )
						{
							console && console.log ( 'no visible element found' );
						}
						else
						{
							console && console.log ( 'at least one element is visible' );
						}
						console && console.log ( 'positiv search = ' + positiv );
					}
					if ( ( visible === true && positiv === true ) || visible === false && positiv === false )
					{
						toggle ( document.getElementById ( error_div_id ), false );
						if ( options.debug ) console && console.log ( 'returns true' );
						return true;
					}
					else if ( ( visible === false && positiv === true ) || visible === true && positiv === false )
					{
						display_error_div ( error_div_id, error_div_message, error_div_style );
						if ( options.debug ) console && console.log ( 'returns false' );
						return false;
					}
				}
			}
		}
		if ( options.debug ) console && console.log ( 'returns undefined' );
		return undefined;
	};
	
	var display_error_div = function ( id, message, style )
	{
		// display_error_div ( id, message, style ) - generates an div element and place it at the bottom of body / html - if elements already exists innerHTML will be overwritten with (string) message
		if ( message !== undefined && id !== undefined )
		{
			var base = document.getElementsByTagName ( 'body' );
			if ( base )	{ if ( base[0] ) { base = base[0]; } }
			if ( !base ) {
				if ( options.debug ) console && console.log ( 'problems with the base' );
				base = document.getElementsByTagName ( 'html' );
				if ( base[0] ) { base = base[0]; }
				else { base = ''; }
			}
			if ( base )
			{
				var div = document.getElementById ( id );
				if ( !div )
				{
					if ( options.debug ) console && console.log ( 'creating error div' );
					var div = document.createElement ( 'div' );
					div.setAttribute ( 'id', id );
					base.appendChild ( div );
					div = document.getElementById ( id );
				}
				if ( typeof div == 'object' )
				{
					if ( style )
					{
						div.setAttribute ( 'style', style );
					}
					div.innerHTML = message;
					toggle ( id, true );
					if ( options.debug ) console && console.log ( 'error div is available and should be visible' );
					if ( options.debug ) console && console.log ( 'returns true' );
					return true;
				}
			}
			else if ( options.debug )
			{
				console && console.log ( 'still problems with the base' );
			}
		}
		if ( options.debug ) console && console.log ( 'returns false' );
		return false;
	};
		
	var toggle_class = function ( html_element, insert_it, delete_it )
	{
		// toggle_class ( html_element, insert_it, delete_it ) - toggle classnames in html elements 
		if ( typeof html_element == 'object' )
		{
			if ( html_element.className || html_element.hasOwnProperty ( 'className' ) )
			{
				var classnames = html_element.className.split ( ' ' );
				var new_classnames = [];
				for ( c in classnames )
				{
					if ( classnames[c] && classnames[c] !== delete_it && classnames[c] !== insert_it && classnames[c] !== ' ' )
					{
						new_classnames.push ( classnames[c] );
					}
				}
				if ( insert_it && insert_it !== ' ' )
				{
					new_classnames.push ( insert_it );
				}
				if ( options.debug ) console && console.log ( new_classnames );
				if ( new_classnames.length == 0 )
				{
					html_element.className = '';
				}
				else if ( new_classnames.length > 1 )
				{
					html_element.className = new_classnames.join ( ' ' );
				}
				else
				{
					html_element.className = new_classnames[0];
				}
			}
		}
	};
	
	var delete_class = function ( html_element, delete_it )
	{
		// shortcut for toggle_class ( html_element, insert_it = empty, delete_it );
		toggle_class ( html_element, '', delete_it );
	};
	
	var insert_class = function ( html_element, insert_it )
	{
		// shortcut for toggle_class ( html_element, insert_it, delete_it = empty );
		toggle_class ( html_element, insert_it, '' );
	};
	
	var button_normalize = function ( current_id )
	{
		if ( options.debug ) console && console.log ( "document.querySelector ( '#button-container' ) : ", document.querySelector ( '#button-container' ), ' current_id : ' + current_id );
		var container = document.querySelector ( '#button-container' );
		if ( typeof container.hasChildNodes == 'function' )
		{
			if ( container.hasChildNodes () )
			{
				var children = container.children;
				for ( c in children )
				{
					if ( typeof children[c] == 'object' )
					{
						toggle_class ( children[c], '', 'selected' );
					}
				}
			}
		}
		var current = document.getElementById ( current_id );
		if ( current )
		{
			var filter_option = document.getElementById ( 'current-filter-option' );
			if ( typeof filter_option == 'object' )
			{
				filter_option.innerHTML = current.innerHTML;
			}
			toggle_class ( current, 'selected' );
		}
	};
	
	// document.getElementById ( 'only-updateable-styles-button' ).addEventListener ( 'click', show_only_updateable_styles );
	var show_only_updateable_styles = function ()
	{
		// show_only_updateable_styles () shortcut to toggle_by_attribute ( 'style-update-url', true ) + button_normalize ( 'only-updateable-styles-button' )
		toggle_by_attribute ( 'style-update-url', true );
		button_normalize ( 'only-updateable-styles-button' );
		return true;
	}
	
	// document.getElementById ( 'none-updateable-styles-button' ).addEventListener ( 'click', show_none_updateable_styles );
	var show_none_updateable_styles = function ()
	{
		// show_none_updateable_styles () shortcut to toggle_by_attribute ( 'style-update-url', false ) + button_normalize ( 'none-updateable-styles-button' )
		toggle_by_attribute ( 'style-update-url', false );
		button_normalize ( 'none-updateable-styles-button' );
		return true;
	}
	
	// document.getElementById ( 'all-styles' ).addEventListener ( 'click', show_all_styles );
	var show_all_styles = function ()
	{
		// show_all_styles () shortcut to toggle_all ( true ) + button_normalize ( 'all-styles' )
		toggle_all ( true );
		button_normalize ( 'all-styles' );
		return true;
	}
	
	// document.getElementById ( 'convert-applies-urls-button' ).addEventListener ( 'click', check_applies_to_urls );
	var check_applies_to_urls = function ()
	{
		var debug = false;
		// check_applies_to_urls ()
		var applies_to = document.getElementsByClassName ( 'applies-to' );
		if ( applies_to )
		{
			for ( a in applies_to )
			{
				if ( typeof applies_to[a] == 'object' )
				{
					if ( applies_to[a].innerHTML || applies_to[a].hasOwnProperty ( 'innerHTML' ) )
					{
						if ( applies_to[a].innerHTML !== '' )
						{
							if ( options.debug || debug )
							{
								console && console.log ( a, applies_to[a] );
								console && console.log ( applies_to[a].innerHTML );
							}
							var new_inner_html = '';
							if ( applies_to[a].innerHTML.indexOf ( ':' ) !== -1 )
							{
								if ( options.debug || debug  ) console && console.log ( applies_to[a].innerHTML.indexOf ( ':' ) );
								var link = applies_to[a].innerHTML;
								new_inner_html += link.substring ( 0, applies_to[a].innerHTML.indexOf ( ':' ) +2 );
								if ( options.debug || debug  ) console && console.log ( link.substring ( 0, applies_to[a].innerHTML.indexOf ( ':' ) +1 ) );
								var links = link.substring ( applies_to[a].innerHTML.indexOf ( ':' )+2, link.length );
								var links = links.split ( ', ' );
								var links_it = [];
								if ( options.debug || debug  ) console && console.log ( links );
								for ( l in links )
								{
									if ( typeof links[l] == 'string' )
									{
										var placeholder = '<span style="color: ' + colors.yellow + ';">' + links[l] + '</span>';
										if ( options.debug || debug  ) console && console.log ( l + ' : ' + links[l] );
										(options.debug || debug ) && console && console.log ( 'first char : ' + links [ l ].charAt ( 0 ) + ' - ' + links [ l ].charAt ( 0 ).match ( /[^A-Za-z]/ ) );
										if ( links [ l ].charAt ( 0 ).match ( /[^A-Za-z]/ ) ) {
											links_it.push ( placeholder );
										}
										else if ( links[l].indexOf ( 'http://' ) !== -1 || links[l].indexOf ( 'https://' ) !== -1 )
										{
											links_it.push ( '<a href="' + links[l] + '">' + links[l] + '</a>' );
										}
										else if ( links[l].indexOf ( '.' ) !== -1 )
										{
											links_it.push ( '<a href="http://' + links[l] + '">' + links[l] + '</a>' );
										}
										else
										{
											links_it.push ( placeholder );
										}
									}
								}
								new_inner_html += links_it.join ( ', ' );
								applies_to[a].innerHTML = new_inner_html;
								document.getElementById ( 'convert-applies-urls-button' ).style.display = 'none';
								if ( options.debug || debug  ) console && console.log ( 'disabled manual execution button to prevent links in links' );
							}
						}
						else if ( options.debug || debug  )
						{
							console && console.log ( 'applies_to[a].innerHTML is empty' );
						}
					}
					else if ( options.debug || debug  )
					{
						console.log ( 'applies_to[a].innerHTML doesnt exists' );
					}
				}
				else if ( options.debug || debug  )
				{
					console.log ( 'applies_to[a] is not an object' );
				}
			}
		}
		else if ( options.debug || debug  )
		{
			console.log ( 'no elements with class applies-to grabbed' );
		}
	};
	
	var toggle_css = function ()
	{
		var style = document.getElementById ( 'code_for_stylish' );
		if ( !style )
		{
			return show_code_for_stylish ();
		}
		else
		{
			return toggle ( style );
		}
	}
	
	var show_code_for_stylish = function ()
	{
		if ( document.getElementById ( 'code_for_stylish' ) )
		{
			document.getElementById ( 'code_for_stylish' ).style.display = 'block';
			return true;
		}
		else
		{
			// display optimized css code for userstyles.org
			var get_max_key_length = function ( obj )
			{
				var max_key_length = 0;
				for ( key in Object.keys ( obj ) )
				{
					max_key_length = Math.max ( Object.keys ( obj )[key].length, max_key_length );
				}
				return max_key_length;
			}
			var get_max_value_length = function ( obj )
			{
				var max_key_length = 0;
				for ( key in obj )
				{
					max_key_length = Math.max ( obj[key].length, max_key_length );
				}
				return max_key_length;
			}
			var str_replace = function ( num, str_ )
			{
				var str = '';
				for ( var i = 0; i < num; i++ )
				{
					str += str_;
				}
				return str;
			}
			
			var style = document.getElementById ( 'stylish_hack_for_google_chrome' );
			if ( style ) 
			{
				console && console.log ( style.innerHTML );
				document.getElementById ( 'stylish_hack_for_google_chrome' );
				stylish = style.innerHTML;
				if ( colors )
				{
					var max_key_length = get_max_key_length ( colors );
					var max_val_length = get_max_value_length ( colors );
					if ( options.debug ) console && console.log ( max_key_length, max_val_length );
					var color_placeholder = "\t" + '/* COLOR REPLACEMENT EXAMPLE STARTS HERE */' + "\n";
					for ( c in colors )
					{
						var dif_key_length = max_key_length - c.length;
						var reg_exp = new RegExp ( escapeRegExp ( colors[c] ) , options.reg_exp.modifiers );
						//if ( options.debug ) console && console.log ( reg_exp, colors[c] );
						//var color_var = colors[c].replace( options.reg_exp.pattern, ""); // 000000 is not so good as a variable name
						//options.debug && console && console.log ( reg_exp, c );
						console && console.log ( reg_exp, c );
						var color_var = c.replace( options.reg_exp.pattern, "");
						color_placeholder += "\t" + '/* ' + c + str_replace ( dif_key_length, '&nbsp;' ) + ' : ' + colors[c] + '   /*[[' + color_var + ']]*/       */' + "\n" ;
						// replacing all colors with userstyles.org variables
						stylish = stylish.replace ( reg_exp, '/*[[' + color_var + ']]*/' );
					}
				}
				stylish = "\t" + stylish.replace ( /\n/g, "\n\t" );
				color_placeholder += "\t" + '/* COLOR REPLACEMENT EXAMPLE   ENDS HERE */' + "\n";
				var id = 'code_for_stylish';
				var textarea = document.createElement ( 'textarea' );
				textarea.setAttribute ( 'id', id );
				var inline_style = [];
				inline_style.push ( 'position: fixed' );
				inline_style.push ( 'top: ' + px (0) );
				inline_style.push ( 'left: ' + px (0) );
				inline_style.push ( 'height: ' + pc (90) );
				inline_style.push ( 'padding: ' + em (1) );
				inline_style.push ( 'margin: ' + em (1) );
				inline_style.push ( 'width: ' + pc (90) );
				textarea.setAttribute ( 'style', inline_style.join ( '; ' ) + ';' );
				textarea.innerHTML = color_placeholder + "\n\n" + stylish;
				var body = document.getElementsByTagName ( 'body' );
				if ( body )
				{
					if ( body[0] )
					{
						body[0].appendChild ( textarea )
						var select_all = function ( )
						{
							this.select();
						};
						document.getElementById ( id ).addEventListener ( 'click', select_all );
						return true;
					}
				}
			}
		}
		return false;
	};
	
	( function (){

		var DomReady = window.DomReady = {};

		// Everything that has to do with properly supporting our document ready event. Brought over from the most awesome jQuery. 

		var userAgent = navigator.userAgent.toLowerCase ();

		// Figure out what browser is being used
		var browser = {
			version: ( userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [] )[1],
			safari: /webkit/.test ( userAgent ),
			opera: /opera/.test ( userAgent ),
			msie: ( /msie/.test ( userAgent ) ) && ( !/opera/.test ( userAgent ) ),
			mozilla: ( /mozilla/.test ( userAgent) ) && ( !/(compatible|webkit)/.test ( userAgent ) )
		};    

		var readyBound = false;	
		var isReady = false;
		var readyList = [];

		// Handle when the DOM is ready
		function domReady () {
			// Make sure that the DOM is not already loaded
			if( !isReady ) {
				// Remember that the DOM is ready
				isReady = true;
			
				if( readyList ) {
					for( var fn = 0; fn < readyList.length; fn++ ) {
						readyList[fn].call ( window, [] );
					}
				
					readyList = [];
				}
			}
		};

		// From Simon Willison. A safe way to fire onload w/o screwing up everyone else.
		function addLoadEvent ( func ) {
		  var oldonload = window.onload;
		  if ( typeof window.onload != 'function' ) {
			window.onload = func;
		  } else {
			window.onload = function () {
			  if ( oldonload ) {
				oldonload ();
			  }
			  func ();
			}
		  }
		};

		// does the heavy work of working through the browsers idiosyncracies (let's call them that) to hook onload.
		function bindReady () {
			if( readyBound ) {
				return;
			}
		
			readyBound = true;

			// Mozilla, Opera (see further below for it) and webkit nightlies currently support this event
			if ( document.addEventListener && !browser.opera ) {
				// Use the handy event callback
				document.addEventListener ( "DOMContentLoaded", domReady, false );
			}

			// If IE is used and is not in a frame
			// Continually check to see if the document is ready
			if ( browser.msie && window == top ) ( function () {
				if ( isReady ) return;
				try {
					// If IE is used, use the trick by Diego Perini
					// http://javascript.nwbox.com/IEContentLoaded/
					document.documentElement.doScroll ( "left" );
				} catch ( error ) {
					setTimeout ( arguments.callee, 0 );
					return;
				}
				// and execute any waiting functions
				domReady();
			})();

			if( browser.opera ) {
				document.addEventListener( "DOMContentLoaded", function () {
					if ( isReady ) return;
					for ( var i = 0; i < document.styleSheets.length; i++ )
						if ( document.styleSheets[i].disabled ) {
							setTimeout( arguments.callee, 0 );
							return;
						}
					// and execute any waiting functions
					domReady();
				}, false);
			}

			if ( browser.safari ) {
				var numStyles;
				( function() {
					if ( isReady ) return;
					if ( document.readyState != "loaded" && document.readyState != "complete" ) {
						setTimeout( arguments.callee, 0 );
						return;
					}
					if (numStyles === undefined) {
						var links = document.getElementsByTagName( "link" );
						for ( var i=0; i < links.length; i++ ) {
							if( links[i].getAttribute( 'rel' ) == 'stylesheet' ) {
								numStyles++;
							}
						}
						var styles = document.getElementsByTagName( "style" );
						numStyles += styles.length;
					}
					if ( document.styleSheets.length != numStyles ) {
						setTimeout( arguments.callee, 0 );
						return;
					}
				
					// and execute any waiting functions
					domReady();
				} ) ();
			}

			// A fallback to window.onload, that will always work
			addLoadEvent( domReady );
		};

		// This is the public function that people can use to hook up ready.
		DomReady.ready = function(fn, args) {
			// Attach the listeners
			bindReady ();
		
			// If the DOM is already ready
			if ( isReady ) {
				// Execute the function immediately
				fn.call ( window, [] );
			} else {
				// Add the function to the wait list
				readyList.push ( function() { return fn.call ( window, [] ); } );
			}
		};
		
		bindReady ();
		
	} ) ();
	
	if ( typeof DomReady !== undefined ) {
		if( typeof DomReady.ready === 'function' ) {
			DomReady.ready ( function () {
				// if document is loaded and ready for manipulation START
	
					// SCRIPT STUFF STARTS HERE
					
					console && console.log ( 'stylish modification script executed' );
					console && console.log ( options.dialog.help );
					
					if ( typeof merge !== 'function' )
					{
						merge = function ( o1, o2 )
						{
							if ( typeof o1 == 'object' && typeof o2 == 'object' )
							{
								console && console.log ( Object.keys ( o1 ).length, Object.keys ( o2 ).length );
								// Function to merge all of the properties from one object into another
								for ( var i in o2 )
								{
									console && console.log ( i );
									o1[i] = o2[i];
								}
							}
							return o1;
						};
					}
					
					
					var border_width = px (1);
					var border_style = 'solid';
					// moved to the top
					// additional style infos
					var font_family = 'monospace';
					var border_radius = px (5);
					var font_weight = 'bold';
					var input_normal =
					{
						backgroundColor: colors.dark_gray ,
						borderColor: colors.silver ,
						borderRadius: border_radius ,
						borderStyle: border_style ,
						borderWidth: border_width ,
						color: colors.silver ,
						padding: px (5)
					};
					var text_normal =
					{
						backgroundColor: colors.dark_gray ,
						borderColor: colors.silver ,
						borderRadius: border_radius ,
						borderStyle: border_style ,
						borderWidth: border_width ,
						color: colors.blue + ' !important;'
						/*,
						resize: 'both' 
						*/
						/*
						padding: px (5) ,
						width: pc ( 80 ) + ' !important' ,
						minWidth: px (388 ) + ' !important'
						*/
					};
					var input_hover =
					{
						backgroundColor: colors.dark_gray ,
						borderColor: colors.orange ,
						color: colors.orange
					};
					var input_selected =
					{
						backgroundColor: colors.dark_gray ,
						borderColor: colors.orange ,
						color: colors.orange ,
						borderWidth: px (1)
					};
					var input_delete_normal =
					{
						borderColor: colors.red ,
						color: colors.red
					};
					var input_delete_hover =
					{
						backgroundColor: colors.red ,
						borderColor: colors.white ,
						color: colors.black
					};
					var input_check_update_normal =
					{
						borderColor: colors.blue ,
						color: colors.silver
					};
					var input_check_update_hover =
					{
						backgroundColor: colors.middle_gray + ' !important',
						borderColor: colors.orange + ' !important' ,
						color: colors.silver + ' !important'
					};
					var input_update_normal =
					{
						backgroundColor: colors.yellow + ' !important',
						borderColor: colors.white + ' !important' ,
						color: colors.black + ' !important'
					};
					var input_update_hover =
					{
						backgroundColor: colors.dark_gray + ' !important',
						borderColor: colors.green + ' !important' ,
						color: colors.yellow + ' !important'
					};
					var input_save_normal = input_update_hover;
					input_save_normal['fontWeight'] = 'bold';
					var input_save_focus =
					{
						backgroundColor: colors.blue + ' !important',
						color: colors.white + ' !important' ,
						borderColor: colors.white + ' !important'
					};
					
					var ele = {};
					if ( options.modify )
					{
						ele =
						{
							getElementsByTagName:
							{
								body :
								{
									backgroundColor: colors.black ,
									color: colors.green ,
									fontWeight: font_weight
								} ,
								a :
								{
									color: colors.blue ,
								} ,
								'a:visited' :
								{
									color: colors.blue ,
								} ,
								button:
								{
									backgroundColor: colors.dark_gray ,
									borderWidth: border_width ,
									borderStyle: border_style ,
									borderColor: colors.green ,
									borderRadius: border_radius ,
									color: colors.green ,
									cursor: 'pointer' ,
									padding: px (5) ,
									paddingLeft: px (10) ,
									paddingRight: px (10)
								} ,
								'button:hover':
								{
									backgroundColor: colors.green ,
									borderColor: colors.orange ,
									color: colors.black
								} ,
								'button.update': input_update_normal ,
								'button.update:hover': input_update_hover ,
								'input': input_normal ,
								'input:focus': input_selected ,
								'input:hover': input_hover ,
								label :
								{
									cursor: 'pointer'
								} ,
								
								'select': input_normal ,
								'select:focus': input_selected ,
								'select:hover': input_hover
								/* ,
								'textarea': text_normal ,
								'textarea:focus': input_selected,
								'textarea:hover': input_hover
								*/
							} ,
							getElementById:
							{
								'to-mozilla-help':
								{
									cursor: 'help'
								} ,
								'sections-help':
								{
									cursor: 'help'
								} ,
								'save-button': input_check_update_normal ,
								'save-button:hover': input_update_normal ,
								'save-button.focus': input_update_normal ,
								'save-button.focus:hover': input_save_focus ,
								'check-all-updates': input_check_update_normal ,
								'check-all-updates:hover': input_update_normal ,
								'installed':
								{
									'paddingBottom': px (30)
								} ,
								'sections':
								{
									'paddingBottom': px (30)
								}
							} ,
							getElementsByClassName:
							{
								'applies-to-help':
								{
									cursor: 'help'
								} ,
								'remove-applies-to': input_delete_normal ,
								'remove-applies-to:hover': input_delete_hover ,
								'delete': input_delete_normal ,
								'delete:hover': input_delete_hover ,
								'check-update': input_check_update_normal ,
								'check-update:hover': input_update_normal, /* input_check_update_hover , */
								'update-note': { color: colors.blue } ,
								
								'CodeMirror-gutter':
								{
									backgroundColor: colors.green ,
									borderWidth: '0px'
								} ,
								'CodeMirror-gutter-text': { color: colors.black } ,
								/* css input - part 1 of 2 */
								'CodeMirror': text_normal ,
								'CodeMirror:focus': input_selected,
								'CodeMirror:hover': input_hover
							} ,
							querySelector:
							{
								'#header:first-child img:first-of-type:not(#to-mozilla-help)':
								{
									border: px (7) + ' solid ' + colors.white
								} ,
								'#filter-options':
								{
									backgroundColor: colors.dark_gray ,
									border: px (1) + ' solid ' + colors.middle_gray ,
									borderRadius: border_radius ,
									color: colors.silver ,
									padding: px (10) ,
									position: 'fixed' ,
									 bottom: em (2) ,
									 left: em (1) ,
									textAlign: 'center'
								} ,
								'#filter-options:hover':
								{
									backgroundColor: colors.rgba3409 ,
									color: colors.dark_gray ,
									padding: px (15) ,
									bottom: px (0) ,
									left: px (0) ,
									borderRadius: px (0) ,
									borderTopRightRadius: border_radius,
									borderWidth: px (0) ,
									borderTopWidth: px (1) ,
									borderRightWidth: px (1) ,
									maxWidth: pc (90) ,
									maxHeight: px (90)
								} ,
								'#filter-options:hover #filter-options-toggle': { display: 'none' } ,
								'#filter-options #button-container': { display: 'none' } ,
								'#filter-options:hover #button-container': { display: 'block' } ,
								/*'#filter-options:hover .selected': input_update_hover,*/
								'#filter-options:hover .selected':
								{
									opacity: '0.5' ,
									cursor: 'default'
								} ,
								'#current-filter-option': { color: colors.orange } ,
								/* css input - part 1 of 2 */
								/* editor colors */
								'.CodeMirror pre.CodeMirror-cursor' : { borderColor : colors.yellow } ,
								'CodeMirror'						: { color : colors['CodeMirror'] } ,
								'.cm-s-default span.cm-atom'		: { color : colors['cm-atom'] } ,
								'.cm-s-default span.cm-builtin'		: { color : colors['cm-builtin'] } ,
								'.cm-s-default span.cm-comment'		: { color : colors['cm-comment'] } ,
								'.cm-s-default span.cm-def'			: { color : colors['cm-def'] } ,
								'.cm-s-default span.cm-error'		: { color : colors['cm-error'] } ,
								'.cm-s-default span.cm-keyword'		: { color : colors['cm-keyword'] } ,
								'.cm-s-default span.cm-meta'		: { color : colors['cm-meta'] } ,
								'.cm-s-default span.cm-number'		: { color : colors['cm-number'] } ,
								'.cm-s-default span.cm-operator'	: { color : colors['cm-operator'] } ,
								'.cm-s-default span.cm-property'	: { color : colors['cm-property'] } ,
								'.cm-s-default span.cm-qualifier'	: { color : colors['cm-qualifier'] } ,
								'.cm-s-default span.cm-string'		: { color : colors['cm-string'] } ,
								'.cm-s-default span.cm-string-2'	: { color : colors['cm-string-2'] } ,
								'.cm-s-default span.cm-tag'			: { color : colors['cm-tag'] } ,
								'.cm-s-default span.cm-variable-2'	: { color : colors['cm-variable-2'] } ,
								'.cm-s-default span.cm-tab' : {
									backgroundImage : 'url(' + colors['cm-tab'] + ')' ,
									backgroundPosition : 'center center' ,
									backgroundRepeat : 'no-repeat'
								}
								/* ,
								// nice idea but cause to other display failures not so funny...
								// Who is afraid of the boggie-man?
								'.cm-s-default span.cm-error:before' : {
									content : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDgxQ0E3MkQ3REUxMTFFMjg5QUNGMDJGNTgyRkRFM0QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDgxQ0E3MkU3REUxMTFFMjg5QUNGMDJGNTgyRkRFM0QiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEODFDQTcyQjdERTExMUUyODlBQ0YwMkY1ODJGREUzRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEODFDQTcyQzdERTExMUUyODlBQ0YwMkY1ODJGREUzRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv3utDUAAABPSURBVHjajI/BCcAwDANlJ6Nk/4k6SotCCgVH6iMHxiDEGYMkZIZmiZ3xIN5dw/wpQItqQg8YqZaPajPTTTfF+qZa1rlabOC5yV4WrinAAPSAL/8ux1fwAAAAAElFTkSuQmCC)' ,
									width: '9px' ,
									heigth : '9px' ,
									marginRight : '2px' ,
									paddingTop : '1px'
								}*/
							}
						};
					}
					
					/*
					
					// merge two objects together...
					// but i changed this to a better variant
					if ( present )
					{
						console && console.log ( 'presential mode' );
						/*
						var present_ele =
						{
							getElementsByTagName:
							{
								// presential mode
								'div.enabled' : { display: 'none' } ,
								'div.disabled' : { display: 'none' }, 
								'div.enabled:last-of-type' : { display: 'block !important' } ,
								'div.disabled:last-of-type' : { display: 'block !important' }
							}
						}
						
						if ( Object.keys ( ele ).length >= 1 )
						{
							console && console.log ( present_ele );
							var newGEBTN =
							{
								getElementsByTagName: merge ( ele.getElementsByTagName, present_ele.getElementsByTagName )
							}
							
							console && console.log ( newGEBTN );
							ele = merge ( ele, newGEBTN );
						}
						else
						{
							console && console.log ( ele );
							ele = present_ele;
						}
						console && console.log ( ele );
					}
					*/
					
					var cssImplode = function ( obj )
					{
						// cssImplode ( obj )
						var style = '';
						var id = 'StylishHackForGoogleChromeCSS';
						var css_check = document.getElementById ( id );
						//console && console.log ( 'obj : ', obj, ' css_check : ', css_check );
						if ( typeof obj == 'object' && !css_check )
						{
							//console && console.log ( 'obj typeof object - check' );
							//console && console.log ( 'css_check not an instanceof HTMLElement' );
							var style = document.createElement ( 'style' );
							style.setAttribute ( 'type', 'text/css' );
							style.setAttribute ( 'language', 'StyleSheet' );
							style.setAttribute ( 'id', id );
							var css = '';
							for ( method in obj )
							{
								if ( typeof method == 'string' && typeof obj[method] == 'object' )
								{
									if (
										( method.indexOf ( 'getElementById' ) !== -1 )
									 || ( method.indexOf ( 'getElementsByClassName' ) !== -1 )
									 || ( method.indexOf ( 'getElementsByTagName' ) !== -1 )
									 || ( method.indexOf ( 'querySelector' ) !== -1 )
									)
									{
										for ( selector in obj[method] )
										{
											if ( typeof obj[method][selector] == 'object' )
											{
												var element = '';
												if ( !element && ( method.indexOf ( 'Id' ) !== -1 ) )
												{
													element = document.createElement ( 'div' );
													style.innerHTML += '#' + selector + "\n";
												}
												else if ( !element && ( method.indexOf ( 'ClassName' ) !== -1 ) )
												{
													element = document.createElement ( 'div' );
													style.innerHTML += '.' + selector + "\n";
												}
												else if ( !element && ( method.indexOf ( 'querySelector' ) !== -1 ) )
												{
													element = document.createElement ( 'div' );
													style.innerHTML += '' + selector + "\n";
												}
												else if ( !element && ( method.indexOf ( 'TagName' ) !== -1 ) )
												{
													element = document.createElement ( selector );
													style.innerHTML += '' + selector + "\n";
												}
												if ( element )
												{
													style.innerHTML += '{' + "\n";
													for ( css in obj[method][selector] )
													{
														if ( typeof obj[method][selector][css] == 'string' )
														{
															var value = obj[method][selector][css];
															key = css;
															
															// replacing Uppercase Characters with lowercase Characters and leading minus
															var character_set = ( 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' );
															var chars = character_set.split ( '' );
															for ( chr in chars )
															{
																if ( typeof chars[chr] == 'string' )
																{
																	var my_reg_ex = new RegExp ( chars[chr], 'g' );
																	key = key.replace ( my_reg_ex, '-' + chars[chr].toLowerCase () );
																}
															}
															style.innerHTML += "\t" + key + ': ' + value + ';' + "\n";
														}
													}
													style.innerHTML += '}' + "\n";
												}
											}
										}
										style.innerHTML += '';
									}
								}
							}
						}
						if ( css_check instanceof HTMLElement ) {
							console && console.log ( 'a style with id : ' + id + ' already exists so we wouldn\' inject it from the javascript part.' );
						}
						if ( typeof obj !== 'object' ) {
							console && console.log ( 'the argument obj is not an object - it is : ' + typeof obj );
						}
						return style;
					}
					var style = cssImplode ( ele );
					//console && console.log ( 'style : ', style, ' ele : ', ele );
					if ( style )
					{
						//console && console.log ( 'style check' );
						if ( typeof style == 'object' )
						{
							//console && console.log ( 'style typeof object check' );
							//present = true;
							//present = false;
							if ( options.present )
							{
								//console && console.log ( 'presential mode' );
								var style_it = '#installed div { display: none; } ';
								var style_it_ids = [];
								for ( ids in present_ids )
								{
									style_it_ids.push ( '#installed div[style-id="' + present_ids[ids] + '"]' );
								}
								style_it += style_it_ids.join ( ', ' );
								style_it += ' { display: block !important; }';
								style.innerHTML += style_it;
							}
							var head = document.getElementsByTagName ( 'head' );
							if ( head )
							{
								//console && console.log ( 'head check' );
								if ( head[0] )
								{
									//console && console.log ( 'head [ 0 ] check' );
									if ( typeof head[0].appendChild == 'function' )
									{
										//console && console.log ( 'head [ 0 ].appendChild == function check' );
										head[0].appendChild ( style );
										// FUNCTION END
									}
								}
							}
						}
					}
					
					/*
					// damn it - causes an error
					// onclick=""
					// Refused to execute inline event handler because it violates the following Content Security Policy directive: "script-src 'self' chrome-extension-resource:".
					// href=" javascript"
					// Refused to execute JavaScript URL because it violates the following Content Security Policy directive: "script-src 'self' chrome-extension-resource:".
					var button_check_all_updates = document.getElementById ( 'check-all-updates' );
					if ( button_check_all_updates )
					{
						var attributes =
						{
							'onclick':
								'toggle_by_classname ( \'can-update\', true );'
						};
						modify_attribute ( button_check_all_updates, attributes );
					}
					*/
					
					
			// SCRIPT STUFF ENDS HERE
			// if document is loaded and ready for manipulation STOP
			} );
		};
	}
	
	document.addEventListener ( 'DOMContentLoaded', function () {
		var body = document.getElementsByTagName ( 'body' );
		var installed = document.getElementById ( 'installed' );
		var sections = document.getElementById ( 'sections' );
		if ( body && installed )
		{
			if ( body[0] )
			{
				var button_set = 
				{
					'only-updateable-styles-button': { name: button_names[user_language].updateable, func: show_only_updateable_styles } ,
					'none-updateable-styles-button': { name: button_names[user_language].none_updateable, func: show_none_updateable_styles } ,
					'all-styles': { name: button_names[user_language].all_styles, func: show_all_styles, className: 'selected' } ,
					'convert-applies-urls-button': { name: button_names[user_language].convert_urls, func: check_applies_to_urls } ,
					'toggle-css-code-button': { name: 'css', func: toggle_css, require: options.show_code } ,
				}
				var execute_functions_after_loading =
				[
					check_applies_to_urls
				];
				var div = document.createElement ( 'div' );
				div.setAttribute ( 'class', 'small-buttons' );
				div.setAttribute ( 'id', 'filter-options' );
				var toggle_div = document.createElement ( 'div' );
				toggle_div.setAttribute ( 'id', 'filter-options-toggle' );
				toggle_div.innerHTML = button_names[user_language].main + ' : ';
				div.appendChild ( toggle_div );
				var span = document.createElement ( 'span' );
				span.setAttribute ( 'id', 'current-filter-option' );
				span.innerHTML = button_set['all-styles'].name;
				toggle_div.appendChild ( span );
				var button_container = document.createElement ( 'div' );
				button_container.setAttribute ( 'id', 'button-container' );
				for ( b in button_set )
				{
					if ( typeof button_set[b] == 'object' )
					{
						if ( typeof button_set[b].name == 'string' && typeof button_set[b].func == 'function' )
						{
								var current_button = document.createElement ( 'button' );
								current_button.setAttribute ( 'id', b );
								current_button.innerHTML = button_set[b].name;
								if ( button_set[b].require === false )
								{
									current_button.setAttribute ( 'style', 'display: none' );
								}
								if ( typeof button_set[b].className == 'string' )
								{
									current_button.setAttribute ( 'class', button_set[b].className );
								}
								// insert to container
								button_container.appendChild ( current_button );
						}
					}
				}
				if ( button_container.innerHTML !== '' )
				{
					div.appendChild ( button_container );
					if ( div.innerHTML !== '' )
					{
						body[0].appendChild ( div );
						// add Event Listener click on created buttons
						for ( b in button_set )
						{
							if ( typeof button_set[b] == 'object' )
							{
								if ( typeof button_set[b].name == 'string' && typeof button_set[b].func == 'function' )
								{
									if ( options.debug ) console && console.log ( b.toString () + ' EventListener Click handled by ' + button_set[b].func.toString ().split ( "\n" )[2].replace ( /\t/g, '' ) );
									document.getElementById ( b.toString () ).addEventListener ( 'click', button_set[b].func );
								}
							}
						}
					}
				}
				/*
				// Exceute functions after loading
				for ( efal in execute_functions_after_loading )
				{
					if ( typeof execute_functions_after_loading[efal] == 'function' )
					{
						if ( options.debug ) console && console.log ( efal + ' functions executed ' + execute_functions_after_loading[efal].toString ().split ( "\n" )[2].replace ( /\t/g, '' ) );
						execute_functions_after_loading[efal] ();
					}
				}
				*/
			}
		}
		else if ( body && sections ) {
			//console && console.log ( 'body[0] : ', body[0] );
			console && console.log ( 'sections found' );
			// var codemirrors = document.getElementsByClassName ( 'CodeMirror' );
			var found = false;
			var pressedSaveButton = function () {
				if ( this instanceof HTMLElement ) {
					if ( typeof this.removeEventListener == 'function' ) {
						this.className = this.className.replace ( 'focus', '' );
						if ( typeof pressedSaveButton == 'function' ) {
							this.removeEventListener ( 'click', pressedSaveButton, false );
						}
						if ( typeof body[0].addEventListener == 'function' && typeof checkDocument == 'function' ) {
							body[0].addEventListener ( 'click', checkDocument, false );
							body[0].addEventListener ( 'keyup', checkDocument, false );
						}
					}
				}
			};
			var focusSaveButton = function () {
				var button = document.getElementById ( 'save-button' );
				if ( button ) {
					if ( options.debug ) console && console.log ( button );
					button.setAttribute ( 'class', 'focus' );
					button.addEventListener ( 'click', pressedSaveButton, false );
					return true;
				} else {
					if ( options.debug ) console && console.log ( 'button not found' );
					return false;
				}
			};
			var checkDocument = function () {
				var class_names = [ 'cm', 'CodeMirror' ];
				var checkParents = function ( element ) {
					var found = false;
					if ( element.className ) {
						for ( n in class_names ) {
							if ( typeof class_names [ n ] == 'string' ) {
								if ( element.className.indexOf ( class_names [ n ] ) >= 0 ) {
									found = true;
								}
							}
						}
					}
					if ( found ) { return found; }
					if ( element.parentElement ) {
						if ( options.debug ) console && console.log ( 'element.parentElement : ', element.parentElement );
						var found = checkParents ( element.parentElement );
					}
					if ( found ) { return found; }
				};
				if ( event.target ) {
					if ( options.debug ) console && console.log ( 'clicked  (event.target) : ', event.target );
					var found = checkParents ( event.target );
					if ( found ) {
						body[0].removeEventListener ( 'click', checkDocument, false );
						body[0].removeEventListener ( 'keyup', checkDocument, false );
						focusSaveButton ();
						
					}
					if ( options.debug ) console && console.log ( 'found : ' + found );
				} else {
					if ( options.debug ) console && console.log ( 'clicked (event) : ', event );
				}
			};
			if ( body [ 0 ] ) {
				if ( typeof body [ 0 ].addEventListener ) {
					if ( options.debug ) console && console.log ( 'typeof body [ 0 ].addEventListener : ' + typeof body [ 0 ].addEventListener + ' ADDED' );
					body[0].addEventListener ( 'click', checkDocument, false );
					body[0].addEventListener ( 'keyup', checkDocument, false );
				}
			}
		}
	} );
	/*
	// have to add the listener to the check all update button and execute it after each style got the infos back. otherwise it will disable all styles.
	document.addEventListener ( 'DOMContentLoaded', function () {
		document.getElementById ( 'only-updateable-styles-button' ).addEventListener ( 'click', show_only_updateable_styles );
	} );
	*/
}