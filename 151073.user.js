// ==UserScript==
// @name		PornHub Simplifier
// @namespace	<none>
// @summary		simplifies m.pornhub.com video pages
// @description	simplifies the mobile pornhub site on video pages
// @version		1.06
// @date		2012-11-08
// @creator 	porncodemonkey
// @include     http://m.pornhub.com/video/show/title/*vkey/*
// @include     http://www.m.pornhub.com/video/show/title/*vkey/*
// @include     http://pornhub.com
// @include     http://www.pornhub.com
// @include     http://pornhub.com/*
// @include     http://www.pornhub.com/*
// @exclude     http://m.pornhub.com/
// @exclude     http://www.m.pornhub.com/
// @preview     http://img594.imageshack.us/img594/4903/mpornhubcomsimplifierce.png
// @homepage	<none>
// @run-at document-end
// ==/UserScript==

// ==ToDo==
// @todo            firefox test
// @todo            opera test
// @todo            chrome test
// @todo            screenshots (new)
// @todo            switch to old site (m.pornhub.com)
// ==/ToDo==

// ==ChangeLog==
// @history        1.06 switch link added to m.pornhub.com to all video links (2012-11-08)
// @history        1.06 re-arranged display on video pages on m.pornhub.com (2012-11-08)
// @history        1.05 no execution if error found on m.pornhub.com (2012-10-28)
// @history        1.04 link to m.pornhub.com on video on pornhub.com added (2012-10-28)
// @history        1.04 link to pornhub.com added (2012-10-28)
// @history        1.03 download file id added to input field (2012-10-28)
// @history        1.03 disabled input field for further links (2012-10-28)
// @history        1.03 input field contains only valid windows charaters (2012-10-28)
// @history        1.02 optional censorizement for screenshot preview images - clean.censore = true (2012-10-27)
// @history        1.01 classnames added to all elements (2012-10-26)
// @history        1.00 first release (2012-10-26)
// ==/ChangeLog==


// foreach function from http://www.naden.de/blog/javascript-foreach
Object.prototype.foreach = function ( callback_object_function ) {
	var debug = false;
	for ( var k in this ) {
		if ( this.hasOwnProperty ( k ) ) {
			if ( typeof callback_object_function == 'function' ) {
				callback_object_function ( k, this[ k ] );
			} else {
				if ( debug ) console && console.log ( 'foreach callback_object_function is not a function', this.caller, ' near line (54)' );
			}
		}
	}
}

//foreach function from http://www.naden.de/blog/javascript-foreach
Array.prototype.foreach = function ( callback_array_function ) {
	var debug = false;
	for ( var k = 0; k < this.length; k++ ) {
		if ( typeof callback_array_function == 'function' ) {
			callback_array_function ( k, this[ k ] );
		} else {
			if ( debug ) console && console.log ( 'foreach callback_array_function is not a function', this.caller, ' near line (67)' );
		}
	}
}

// created Larry Osterman
// edited by Community
// http://stackoverflow.com/a/5842701/1610180
// modified by porncodemonkey
function getMethods ( obj ) {
	var debug = false;
	if ( typeof obj == 'object' ) {
		var methods = [];
		if ( debug ) console && console.log ( 'Object ' + obj.toString () + ' has the following properties', ' near line (80)' );
		for ( property in obj ) {
			if ( property ) {
				if ( debug ) console && console.log ( typeof obj[property] );
				if ( typeof obj[property] == 'function' ) {
					if ( typeof property.toString == 'function' ) {
						methods.push ( property.toString () );
					} else if ( typeof property != 'string' ) {
						methods.push ( property );
					}
				}
				if ( debug ) console.log ( property, ' near line (91)' );
			}
		}
		return methods;
	} else {
		console && console.log ( 'object expected in function getMethods got : ' + typeof obj, ' near line (96)' );
	}
	return false;
}

/*
// getMethods
// Makram Saleh
// http://stackoverflow.com/a/5842695/1610180
// modified by porncodemonkey
function getMethods ( obj ) {
	if ( typeof obj == 'object' ) {
		var res = [];
		for ( var m in obj ) {
			if (typeof obj (m) == "function") {
				res.push (m)
			}
		}
		return res;
	}
	return false;
}
*/
function findPos ( obj ) {
	if ( obj.offsetParent ) {
		var curleft = 0 ,
	    curtop = 0;
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while ( obj = obj.offsetParent );
		return [curleft,curtop];
	}
	return false;
}

// check_type
String.prototype.check_type = function () {
	console && console.log ( 'string : ', this, ' near line (134)' );
};
Object.prototype.check_type = function () {
	console && console.log ( 'object : ', this, ' near line (137)' );
	if ( typeof this.foreach === 'function' ) {
		//
		var types = {
			functions: [] ,
			arrays: [] ,
			objects: [] ,
			strings: [] ,
			unknown: [] ,
			falsy: []
		}
		this.foreach ( function ( k, v ) {
			// 
			if ( typeof v === 'function' ) {
				types.functions.push ( k );
			} else if ( typeof v === 'string' ) {
				types.strings.push ( k );
			} else if ( typeof v === 'array' ) {
				types.arrays.push ( k );
			} else if ( typeof v === 'object' ) {
				types.objects.push ( k );
			} else {
				types.unknown.push ( k + ', type : ' + typeof v );
			}
			if ( !v ) {
				types.falsy.push ( k );
			}
		});
	}
	return types;
};
Object.prototype.check_type = function () {
	console && console.log ( 'object : ', this, ' near line (169)' );
	if ( typeof this.foreach === 'function' ) {
		//
		var types = {
			functions: [] ,
			arrays: [] ,
			objects: [] ,
			strings: [] ,
			unknown: [] ,
			falsy: []
		}
		this.foreach ( function ( k, v ) {
			// 
			if ( typeof v === 'function' ) {
				types.functions.push ( k );
			} else if ( typeof v === 'string' ) {
				types.strings.push ( k );
			} else if ( typeof v === 'array' ) {
				types.arrays.push ( k );
			} else if ( typeof v === 'object' ) {
				types.objects.push ( k );
			} else {
				types.unknown.push ( k + ', type : ' + typeof v );
			}
			if ( !v ) {
				types.falsy.push ( k );
			}
		});
	}
	return types;
};

// function to check if host is allowed
function allowed_host ( href ) {

	var debug = false,
		debug_return = false;
	
	var url = document.createElement ( 'a' );
	if ( url ) {
		href = url.href = href;
	} else {
		console && console.log ( 'url falsy', ' near line (211)' );
	}
	
	if ( debug || debug_return ) { // for debug output
		console && console.log ( ': START OF : allowed_host ( href ) - href : ', href, ' near line (215)' );
	} // for debug output OFF
	if ( debug && url ) {
		if ( typeof url.check_type === 'function' ) {
			var types = url.check_type ();
			console && console.log ( types, ' near line (220)' );
		} else {
			console && console.log ( 'check_types is not a method of the object url', ' near line (222)' );
		}
	}
	
	// check if allowed is allowed domain
	var allowed = {
		domains: {
			methods: [
				'host' ,
				'hostname' ,
				'origin'
			] ,
			values: [
				'm.pornhub.com' ,
				'www.m.pornhub.com' ,
				'pornhub.com' ,
				'www.pornhub.com'
			]
		} ,
		protocols: {
			methods: [
				'protocol' ,
				'origin'
			] ,
			values: [
				//'http://' ,
				'http:' 
			]
		} ,
		is: false
	};
	
	if ( allowed ) { // if allowed is not falsy
		if ( !allowed.is ) { // if not already allowed
			if ( debug ) { // for debug output
				console && console.log ( 'allowed defined', allowed );
			} // for debug output OFF
			if ( typeof allowed.foreach === 'function' ) { // if function foreach exists for allowed
				if ( debug ) { // for debug output
					console && console.log ( 'allowed.foreach exists', ' near line (261)' );
				} // for debug output OFF
				allowed.foreach ( function ( allowed_key, allowed_val ) { // foreach allowed
					if ( !allowed.is ) { // if not already allowed
						if ( debug ) { // for debug output
							console && console.log ( 'allowed_key : ', allowed_key, ' near line (266)' );
							console && console.log ( 'allowed_val : ', allowed_val, ' near line (267)' );
						} // for debug output OFF
						if ( allowed_val ) { // if allowed not falsy
							if ( allowed_val.methods && allowed_val.values ) { // if allowed_val.methods AND allowed_val.values is not falsy
								if ( debug ) { // for debug output
									console && console.log ( 'allowed_val.methods : ', allowed_val.methods, ' near line (272)' );
								} // for debug output OFF
								if ( typeof allowed_val.methods.foreach === 'function' && typeof allowed_val.values.foreach === 'function' ) { // if function foreach exists for allowed_val.methods AND allowed_val.values
									if ( debug ) {
										console && console.log ( 'allowed_val.methods.foreach exists' );
									}
									allowed_val.methods.foreach ( function ( method_key, method_val ) { // foreach allowed_val.methods
										if ( !allowed.is ) { // if not already allowed
											if ( debug ) { // for debug output
												console && console.log ( 'method_key : ', method_key, ' near line (281)' );
												console && console.log ( 'method_val : ', method_val, ' near line (282)' );
											} // for debug output OFF
											if ( method_val ) { // if method_val is not falsy
												//console && console.log ( '// if method_val is not falsy' );
												if ( url[method_val] ) { // if url[method_val ] is not falsy
													//console && console.log ( '// if parameter var method_val exists in url' );
													if ( typeof allowed_val.values.foreach === 'function' ) { // if function foreach exists for allowed_val.values
														//console && console.log ( '// if function foreach exists for allowed_val.values' );
														allowed_val.values.foreach ( function ( values_key, values_val ) { // foreach allowed_val.values
															if ( debug ) { // for debug output
																console && console.log ( '// foreach allowed_val.values', ' near line (292)' );
																console && console.log ( 'values_key : ', values_key, ' near line (293)' );
																console && console.log ( 'values_val : ', values_val, ' near line (294)' );
															} // for debug output OFF
															if ( !allowed.is ) { // if not already allowed
																// CHECK TYPE
																if ( allowed_key === 'domains' ) { // if domains case
																	if ( debug ) { // for debug output
																		console && console.log ( '// if domains case', ' near line (300)' );
																	} // for debug output OFF
																	var val = url[method_val].indexOf ( values_val );
																	if ( val !== -1 ) { // if values_val found in url[method_val]
																		allowed.is = true;
																		if ( debug || debug_return ) { // for debug output
																			console && console.warn ( values_val + ' FOUND in ' + 'url.' + method_val, ' - like expected so allowed', ' near line (306)' );
																			console && console.log ( 'url[method_val] : ', url[method_val], ' near line (307)' );
																			console && console.log ( 'values_val : ', values_val, ' near line (308)' );
																			console && console.log ( 'val ( indexOf () ) : ', val, ' near line (309)' );
																			console && console.log ( 'href : ', href, ' near line (310)' );
																			console && console.warn ( ': END OF : function allowed_host ( href ) = return TRUE', ' near line (311)' );
																			return true;
																		} // for debug output OFF
																	}  // if values_val found in url[method_val] OFF
																} // if domains case OFF
																else if ( allowed_key === 'protocols' ) { // if protocols case
																	if ( debug ) { // for debug output
																		console && console.log ( '// if protocols case', ' near line (318)' );
																	} // for debug output OFF
																	var val = url[method_val].indexOf ( values_val );
																	if ( val === -1 ) { // if values_val NOT found in url[method_val]
																		allowed.is = true;
																		if ( debug || debug_return  ) { // for debug output
																			console && console.warn ( values_val + ' NOT FOUND in ' + 'url.' + method_val, ' - like expected so allowed', ' near line (324)' );
																			console && console.log ( 'url[method_val] : ', url[method_val], ' near line (325)' );
																			console && console.log ( 'values_val : ', values_val, ' near line (326)' );
																			console && console.log ( 'val ( indexOf () ) : ', val, ' near line (327)' );
																			console && console.log ( 'href : ', href, ' near line (328)' );
																			console && console.warn ( 'abort foreach', ' near line (329)' );
																		} // for debug output OFF
																		return; // abort foreach
																	}  // if values_val NOT found in url[method_val] OFF
																} // if protocols case OFF
																// CHECK TYPE OFF
															} // if not already allowed OFF
														}); // foreach allowed_val.values OFF
													} // if function foreach exists for allowed_val.values OFF
												} // if url[method_val ] is not falsy OFF
											} // if method_val is not falsy OFF
										} // if not already allowed OFF
										else {
											if ( debug ) {
												console && console.warn ( 'abort foreach' );
											}
											return; // abort foreach
										}
									}); // foreach allowed_val.methods OFF
								} // if function foreach exists for allowed_val.methods AND allowed_val.values OFF
							} // if allowed_val.methods AND allowed_val.values is not falsy OFF
						} // if allowed not falsy OFF
					} // if not already allowed OFF
					else {
						if ( debug ) {
							console && console.warn ( 'abort foreach', ' near line (354)' );
						}
						return; // abort foreach
					}
				}); //  // foreach allowed OFF
			}  // if function foreach exists for allowed OFF
		} // if not already allowed OFF
	} // if allowed is not falsy OFF
	if ( allowed.is )
	{
		return true;
	}
	else
	{
		return false;
	}
} // function allowed_host ( href ) OFF

// function to exlude vkey or viewkey id from given string
function vkey ( href ) {

	var debug = false ,
	    debug_return = false;
	if ( debug || debug_return  ) console && console.warn ( ': START OF : function vkey ( href ) - href : ', href, ' near line (377)' );
	
	var url = document.createElement ( 'a' );
	if ( url ) {
		href = url.href = href;
	} else {
		console && console.log ( 'url falsy', ' near line (383)' );
	}
	
	if ( !search ) { // if search is falsy
		var search = [
			'vkey/' ,
			'viewkey='
		];
	} // if search is falsy OFF
	
	var id = '';
	if ( search ) { // if search is not falsey
		if ( debug ) { // for debug output
			console && console.log ( 'search array defined', ' near line (396)' );
		} // for debug output OFF
		if ( typeof search.foreach === 'function' ) { // if foreach function exists
			if ( debug ) { // for debug output
				console && console.log ( 'search.foreach exists', ' near line (400)' );
			} // for debug output OFF
			search.foreach ( function ( search_key, search_val ) { // foreach
				if ( debug ) { // for debug output
					console && console.log ( 'search_key : ', search_key, ' near line (404)' );
					console && console.log ( 'search_val : ', search_val, ' near line (405)' );
				} // for debug output OFF
				if ( typeof search_val === 'string' ) { // if is string
					if ( debug ) { // for debug output
						console && console.log ( 'search_val is string', ' near line (409)' );
					} // for debug output OFF
					if ( typeof href.indexOf === 'function' ) { // if indexOf function exists
						if ( debug ) { // for debug output
							console && console.log ( 'href.indexOf function exists', ' near line (413)' );
						} // for debug output OFF
						var search_start = href.indexOf ( search_val ); // start integer
						if ( search_start !== -1 ) { // if search_start is NOT -1
							if ( typeof href.substr === 'function' && href.length ) { // if substr functions exists AND length is string
								if ( debug ) { // for debug output
									console && console.log ( 'href.substr (function) AND href.length (string) exists', ' near line (419)' );
								} // for debug output OFF
								console && console.log ( 'search_start : ', search_start, ' near line (421)' );
								id = href.substr ( search_start + search_val.length, href.length ); // id
								console && console.log ( 'id : ', id, ' near line (423)' );
								if ( id ) { // if id is not falsey
									if ( debug || debug_return  ) { // for debug output
										console && console.warn ( 'id FOUND in href', ' near line (426)' );
										console && console.log ( 'href : ', href, ' near line (427)' );
										console && console.log ( 'id : ', id, ' near line (428)' );
										console && console.log ( 'abort foreach cause id found', ' near line (429)' );
									} // for debug output OFF
									return; // abort foreach id
								} // if id is not falsey OFF
							}   // if substr functions exists AND length is string OFF
						} // if search_start is NOT -1 OFF
					} // if indexOf function exists OFF
				}  // if is string OFF
			}); // foreach OFF
		} // if foreach function exists OFF
	} // if search is not falsey OFF
	
	if ( debug  || debug_return ) { // for debug output
		console && console.log ( 'href : ', href, ' near line (442)' );
		console && console.warn ( ': END OF : function vkey ( href ) = return FALSE', ' near line (443)' );
	} // for debug output OFF
	
	if ( id ) {
		return id; // return extracted id
	}
	else {
		return false; // return false
	}
}; // function vkey ( href ) OFF


// test
var debug = true;
if ( debug ) { // for debug output
	if ( typeof vkey === 'function' ) { // if function vkey exists
		var vkeys = [] ,
			hrefs =
			[
				window.location.origin ,
				window.location.host ,
				window.location.hostname ,
				window.location.pathname ,
				window.location.search , 
				'file:///C:/Dokumente%20und%20Einstellungen/' , 
				'http://www.prankvidz.com/video_show/hot-euro-babe-34875?utm_source=ph&utm_medium=traffic_trade&utm_campaign=ph_trade_box6' ,
				'http://www.tube8.com/teen/mycollegerule-interracial-threesome/6141931/?utm_source=pornhub&utm_medium=traffic_trade&utm_campaign=pornhub_trade_box1' ,
				'http://www.pornhub.com/view_video.php?viewkey=2105403660' ,
				'http://m.pornhub.com/video/show/title/slutty_big_tit_blonde_maid_sarah_jessie_fucks_her_boss_for_a_rais/vkey/118126401'
			];
		if ( typeof hrefs.foreach === 'function' ) { // if function foreach exists on hrefs
			hrefs.foreach ( function ( href_key, href_val ) { // foreach on hrefs
				var allowed_host_return = allowed_host ( href_val );
				var vkey_return = vkey ( href_val );
				if ( allowed_host_return && vkey_return ) {
					console && console.warn ( 'both found', ' near line (478)' );
				} else {
					console && console.warn ( 'both NOT found', ' near line (480)' );
				}
				console && console.log ( 'href_val ' + href_val, ' near line (482)' );
				console && console.log ( 'allowed_host ( href_val ) = ' + allowed_host_return, ' near line (483)' );
				console && console.log ( 'vkey ( href_val ) = ' + vkey_return, ' near line (484)' );
			}); // foreach on hrefs OFF
		} // if function foreach exists on hrefs
	} // if function vkey exists
} // for debug output OFF
// test OFF

// pornhub.com - DESKTOP
// pornhub.com - DESKTOP
// pornhub.com - DESKTOP
// pornhub.com - DESKTOP
// pornhub.com - DESKTOP
if ( window.location.host === 'www.pornhub.com' || window.location.host === 'pornhub.com' ) {
	console && console.log ( 'on pornhub.com' );
	
	// h1 title
	//var h1 = document.getElementsByClassName ( 'section_title' );
	var debug = false;
	var h1 = document.getElementsByTagName ( 'h1' );
	if ( h1 )
	{
		h1.foreach ( function ( h1_key, h1_value ) {
			if( typeof h1_value === 'object' ) {
				if ( debug ) {
					console && console.log ( 'h1_key : ', h1_key, typeof h1_key, ' near line (507)' );
					console && console.log ( 'h1_value : ', h1_value, typeof h1_value, ' near line (508)' );
				}
				var switch_id = 'mpornhub_switch_title' , 
					switch_class = 'mpornhub_switch_title mpornhub_switch';
				var title_switch = document.getElementById ( switch_id );
				if ( !title_switch && typeof h1_value == 'object' ) {
					if ( debug ) {
						console && console.log ( 'is object', ' near line (515)' );
						console && console.log ( typeof vkey, ' near line (516)' );
					}
					var vkey_ = vkey ( window.location.href );
					var element = '';
					if ( vkey_ && allowed_host ( window.location.href ) ) {
						var title = h1_value.innerHTML;
						//var url = 'http://m.pornhub.com/video/show/title/' + none_alphanumeric_string ( title.replace ( /\W/g, '_' ) ) + '/vkey/' + vkey_;
						if ( typeof title.replace === 'function' ) {
							var url = 'http://m.pornhub.com/video/show/title/' + title.replace ( /[^a-zA-Z0-9]/g, '_' ) + '/vkey/' + vkey_;
							element += '<a href="' + url + '" class="' + switch_class + '" id="' + switch_id + '" style="margin-left: 1em; font-size: 9px;">';
							element += 'video on m.pornhub.com';
							element += '</a>';
							if ( debug ) console && console.log ( 'new html (append) for h1' );
						} else {
							if ( debug ) console && console.log ( 'title has no function called replace', ' near line (534)' );
						}
					}
					if ( element ) {
						if ( debug ) console && console.log ( 'switch (element) is defined : ', element );
						if( h1_value.hasOwnProperty ( 'children' ) ) {
							if ( debug ) console && console.log ( 'h1.children : ', h1.children );
						}
						if( h1_value.hasOwnProperty ( 'innerHTML' ) ) {
							if ( debug ) console && console.log ( 'new innerHTML' );
							h1_value.innerHTML += element;
						}
					}
				}
			}
		});
	} else {
		console && console.log ( 'h1 undefined : ', typeof h1, h1, ' near line (535)' );
	}
	
	
	// if
	// (
	// window.location.href.indexOf ( '/video?c=' ) || 
	// window.location.href.indexOf ( 'view_video.php?viewkey=' ) ||
	// window.location.href.indexOf ( '/pornstar/' )
	// )
	var debug = false;
	var wrap = document.getElementsByClassName ( 'wrap' );
	if ( wrap ) {
		var wrap_elements = [];
		wrap.foreach ( function ( w_key, w_val ) {
			var element = '';
			if ( typeof w_val === 'object' ) {
				//<a href="video link with vkey" title="video title" class="img">
				//<div class="duration">
				if ( w_val.hasOwnProperty ( 'children' ) ) {
					if ( debug ) {
						console && console.warn ( 'w_key : ', w_key, ' near line (567)' );
						console && console.log ( 'w_val : ', w_val, ' near line (568)' );
					}
					var wrap_children = w_val.children ,
						wrap_switch_id_start = 'mpornhub_switch_wrap_' ,
					    wrap_switch_id = '' ,
						wrap_switch_class = 'mpornhub_switch_wrap mpornhub_switch';
					if ( wrap_children ) {
						if ( debug ) console && console.log ( 'wrap_children : ', wrap_children, ' near line (573)' );
						wrap_children.foreach ( function ( c_key, c_val ) {
						
							if ( typeof c_val === 'object' ) {
								if ( debug ) {
									console && console.log ( 'c_key : ', c_key, ' near line (577)' );
									console && console.log ( 'c_val : ', c_val, ' near line (578)' );
								}
							
								if ( c_val.hasOwnProperty ( 'tagName' ) ) {
									if ( debug ) console && console.log ( 'c_val.tagName : ', c_val.tagName, ' near line (579)' );
									
									// GRAB LINK ON
									if ( c_val.tagName === 'A' ) {
										if ( c_val.hasOwnProperty ( 'className' ) ) {
											if ( debug ) console && console.log ( 'c_val.className : ', c_val.className, ' near line (580)' );
											if ( c_val.className === 'img' ) {
												if ( debug ) console && console.log ( 'className = img FOUND', ' near line (585)' );
												var wrap_vkey = vkey ( c_val.href );
												var wrap_title = c_val.title;
												wrap_switch_id = wrap_switch_id_start + wrap_vkey;
												wrap_switch_element = document.getElementById ( wrap_switch_id );
												if ( wrap_switch_id && allowed_host ( c_val.href ) ) {
													if ( debug ) console && console.log ( 'wrap_switch_id and allowed_host ( c_val.href ) BOTH true' , ' near line (592)' );
													if ( !wrap_switch_element && wrap_vkey ) {
														if ( debug ) console && console.log ( 'wrap_switch_element not defined AND wrap_vkey defined (like excepted)', ' near line (594)' );
														if ( typeof wrap_title.replace === 'function' ) {
															if ( debug ) console && console.log ( 'wrap_title has a function calles replace' , ' near line (596)' );
															// http://m.pornhub.com/video/show/title/Jana_Cova_Engaging_In_A_Lesbo_Adventure/vkey/1112949411
															element = '<a href="http://m.pornhub.com/video/show/title/' + wrap_title.replace ( /[^a-zA-Z0-9]/g, '_' ) + '/vkey/' + wrap_vkey + '" class="' + wrap_switch_class + '" id="' + wrap_switch_id + '" style="font-size: 9px; margin-left: 3px;">mobile</a>';
															if ( debug ) console && console.warn ( 'link to mobile page in var element', ' near line (607)' );
														}
														// if ( typeof wrap_title.replace === 'function' ) END
														else {
															if ( debug ) console && console.log ( 'wrap_title has no function called replace', ' near line (605)' );
														} // ELSE OF if ( typeof wrap_title.replace === 'function' ) END
													} // if ( !wrap_switch_element )
												} // if ( wrap_switch_id && allowed_host ( c_val.href ) ) END
											} // if ( c_val.className === 'img' ) END
										} // if ( c_val.hasOwnProperty ( 'className' ) ) END
									} // if ( c_val.tagName === 'div' ) END
									// GRAB LINK OFF
									
									// PUSH LINK ON
									if ( c_val.tagName === 'DIV' && element ) {
										if ( c_val.hasOwnProperty ( 'className' ) ) {
											if ( c_val.className === 'thumbnail-info-wrapper' ) {
												//
												if ( c_val.hasOwnProperty ( 'children' ) ) {
													c_val.children.foreach ( function ( div_key, div_val ) {
														if ( typeof div_val === 'object' ) {
															if ( debug ) {
																console && console.log ( 'div_key : ', div_key, ' near line 627' );
																console && console.log ( 'div_val : ', div_val, ' near line 628' );
															}
															if ( div_val.hasOwnProperty ( 'tagName' ) ) {
																if ( div_val.tagName === 'VAR' ) {
																	if ( div_val.hasOwnProperty ( 'className' ) ) {
																		if ( div_val.className === 'duration' ) {
																			div_val.innerHTML += element;
																			element = '';
																		}
																	}
																}
															}
														}
													});
												}
											}
										}
									}
									// PUSH LINK OFF
									
								} // if ( c_val.hasOwnProperty ( 'tagName' ) ) END
							} // if ( typeof c_val === 'object' ) END
						});
					}
				}
			}
		});
	}
}

// m.pornhub.com - MOBILE
// m.pornhub.com - MOBILE
// m.pornhub.com - MOBILE
// m.pornhub.com - MOBILE
// m.pornhub.com - MOBILE
else if ( window.location.host === 'm.pornhub.com' || window.location.host === 'www.m.pornhub.com' ) {
	
	console && console.log ( 'on m.pornhub.com', ' near line (636)' );
	var debug = true;
	var execute = true;
	var error = document.getElementsByClassName ( 'error' );
	if ( debug ) {
		console && console.log ( 'typeof error : ', typeof error, ' near line (641)' );
		console && console.log ( 'error : ', error, ' near line (642)' );
		console && console.log ( 'typeof error.innerHTML : ', typeof error.innerHTML, ' near line (643)' );
		console && console.log ( 'error.innerHTML : ', error.innerHTML, ' near line (644)' );
		console && console.log ( 'error.length : ', error.length, ' near line (645)' );
	}
	if ( error.length > 0 ) {
		console && console.log ( 'execution stoped cause of error', ' near line (648)' );
		execute = false;
	}
	if ( execute ) {
		var thumbs = document.getElementsByClassName ( 'thumb' );
		var anchors = document.getElementsByClassName ( 'link_block' );
		var details = document.getElementsByClassName ( 'details' );
		var h1 = document.getElementsByTagName ( 'h1' );
		var h2 = document.getElementsByTagName ( 'h2' );
		var clean = {
			censore: true ,
			images: [] ,
			links: [] ,
			titles: [] ,
			file_ids: [] ,
			details: [] ,
			iteration: 0 ,
			debug: false ,
			debugging: {
				main: false ,
				thumbs: false ,
				details: false ,
				anchor: false ,
				h1: false ,
				h2: false ,
				clean: true ,
				censore: false
			}
		};

		 // DETAILS
		
		var debug = ( clean.debug || clean.debugging.details ) ? true : false;
		debug = true;
		if ( debug ) console && console.log ( 'images', details.length );
		details.foreach ( function ( key, detail ) {
			if ( detail ) {
				if ( debug ) console && console.log ( detail );
				//var details = '';
				if ( detail.hasOwnProperty ( 'innerHTML' ) ) {
					if ( detail.innerHTML ) {
						if ( debug ) console && console.log ( detail.innerHTML );
						clean.details.push ( detail.innerHTML );
					}
				}
			}
		});
		
		// THUMBS
		
		var debug = ( clean.debug || clean.debugging.thumbs ) ? true : false;
		debug = false;
		var thumb;
		if ( debug ) console && console.log ( 'images', thumbs.length );
		thumbs.foreach ( function ( key, thumb ) {
			if ( thumb ) {
				if ( debug ) console && console.log ( thumb );
				var bg_image = '';
				if ( thumb.style ) {
					if ( thumb.style.backgroundImage ) {
						if ( debug ) console && console.log ( thumb.style.backgroundImage );
						bg_image = thumb.style.backgroundImage;
						if ( typeof bg_image.replace === 'function' ) {
							var search = {
								start: 'url(' ,
								stop: ')' 
							};
							var replace = {
								start: '',
								stop: ''
							};
							search.foreach ( function ( search_key, search_value ) {
								var replace_value = '';
								if ( replace ) {
									if ( replace[search_key] ) {
										replace_value = replace[search_key];
									}
								}
								bg_image = bg_image.replace ( search_value, replace_value );
								if ( debug ) console && console.log ( bg_image )
							});
						} else {
							console && console.log ( 'bg_image has no function called replace', ' near line (709)' );
						}
						if ( debug ) console && console.log ( bg_image )
					}
				}
				if ( bg_image ) {
					if ( debug ) console && console.log ( 'pushed bg_image to clean.images', ' near line (715)' )
					clean.images.push ( bg_image );
				} else if ( key < thumbs.length ) {
					if ( debug ) console && console.log ( 'pushed UNDEFINED to clean.images', ' near line (718)' )
					clean.images.push ( 'UNDEFINED' );
				}
			}
		});

		//var debug = ( clean.debug || clean.debugging.thumbs ) ? true : false;
		////debug = true;
		//if ( debug  ) console && console.log ( 'images', ' near line (727)' );
		//for ( var i = 0; i < thumbs.length; i++ )
		//{
		//	if ( debug ) console && console.log ( thumb, ' near line (730)' );
		//	clean.images.push ( thumb );
		//	thumb = thumbs[i].style.backgroundImage;
		//	if ( typeof thumb.replace === 'function' ) {
		//		thumb = thumb.replace ( 'url (', '' );
		//		thumb = thumb.replace ( ')', '' );
		//		thumb = thumb.replace ( '"', '' );
		//	} else {
		//		console && console.log ( 'thumb has no function called replace', ' near line (738)' );
		//	}
		//}

		// ANCHOR

		var debug = ( clean.debug || clean.debugging.anchor ) ? true : false;
		//debug = true;
		if ( debug ) console && console.log ( 'links', ' near line (748)' );
		var anchor;
		for ( var i = 0; i < anchors.length; i++ ) {
			if ( debug ) console && console.log ( anchor, ' near line (751)' );
			anchor = anchors[i].href;
			if ( anchor ) {
				if ( debug ) console && console.log ( 'anchor pushed to clean.links', anchor, ' near line (754)' );
				clean.links.push ( anchor );
			}
			//var vkey = 'vkey/';
			//var vkey_search = anchor.indexOf ( vkey );
			//if ( vkey_search !== -1 )
			//{
			//	var vkey_id = anchor.substring ( vkey_search + vkey.length, anchor.length );
			//	if ( debug ) console && console.log ( 'vkey_id : ', vkey_id, ' near line (763)' );
			//	id = vkey_id;
			//}
			//else 
			var mp4 = '.mp4';
			var mp4_search = anchor.indexOf ( mp4 );
			var file_id = '';
			if ( mp4_search !== -1 ) {
				var split = anchor.split ( '/' );
				split.foreach ( function ( split_key, split_value ) {
					if ( split_value.indexOf ( mp4 ) !== -1 ) {
						var question_mark = split_value.indexOf ( '?' );
						if ( question_mark !== -1 ) {
							file_id = split_value.substring ( 0, question_mark - mp4.length );
						}
						if ( debug ) console && console.warn ( 'found ID - file_id : ', file_id, ' in split_key : ', split_key, ' split_value : ', split_value, ' near line (779)' );
					}
				});
			}
			if ( file_id ) {
				if ( debug ) console && console.log ( 'id pushed to clean.file_ids', file_id, ' near line (784)' );
				clean.file_ids.push ( file_id );
			}
		}

		// H1

		var debug = ( clean.debug || clean.debugging.h1 ) ? true : false;
		//debug = true;
		if ( debug ) console && console.log ( 'h1', ' near line (793)' );
		//debug = true;
		var h_1;
		for ( var i = 0; i < h1.length; i++ ) {
			if ( debug ) console && console.log ( h_1, ' near line (797)' );
			h_1 = h1[i].innerHTML;
			clean.titles.push ( h_1 );
		}

		// H2
		var debug = ( clean.debug || clean.debugging.h2 ) ? true : false;
		//debug = true;
		if ( debug ) console && console.log ( 'h2', ' near line (805)' );
		//debug = true;
		var h_2, start, stop;
		for ( var i = 0; i < h2.length; i++ ) {
			if ( debug ) console && console.log ( h2[i] );
			if ( typeof h2[i].innerHTML != undefined ) {
				h_2 = h2[i].innerHTML;
				if ( debug ) console && console.log ( h_2, typeof h_2, ' near line (812)' );
				if ( typeof h_2 === 'string' ) {
					// console && console.log ( 'is string' );
					start = h_2.indexOf ( '>', 2 );
					start = start + 1;
					stop = h_2.indexOf ( '<', start );
					h_2 = h_2.substring ( start, stop );
					clean.titles.push ( h_2 );
					if ( debug ) console && console.log ( h_2, ' near line (820)' );
				} else {
					if ( debug ) console && console.log ( 'typeof h_2 : ', typeof h_2, ' near line (822)' );
					if ( debug ) console && console.log ( 'typeof h_2.indexOf : ' , typeof h_2.innerHTML, ' near line (823)' );
					if ( debug ) console && console.log ( 'typeof h_2.substring : ' , typeof h_2.substring, ' near line (824)' );
				}
			} else {
				if ( debug ) console && console.log ( 'typeof h2[i].innerHTML : ' , typeof h2[i].innerHTML, ' near line (827)' );
			}
		}

		// CLEAN
		var debug = ( clean.debug || clean.debugging.clean ) ? true : false;
		//debug = true;
		if ( debug ) console && console.log ( clean, ' near line (834)' );

		// MAIN
		var debug = ( clean.debug || clean.debugging.main ) ? true : false;
		//debug = true;
		if (   clean.images.length == clean.links.length 
			&& clean.images.length == clean.titles.length 
			&& clean.links.length == clean.titles.length ) {
			if ( debug ) console && console.log ( 'same length', ' near line (842)' );
			if ( debug ) console && console.log ( 'clean.links.length : ' + clean.links.length, ' near line (843)' );
			if ( debug ) console && console.log ( 'clean.images.length : ' + clean.images.length, ' near line (844)' );
			if ( debug ) console && console.log ( 'clean.titles.length : ' + clean.titles.length, ' near line (845)' );
			clean.iteration = clean.images.length;
			
			var elements = '', 
				further_links = false,
				clean_input_chars = [
					'?',
					'/',
					'\\',
					':',
					'*',
					'?',
					'<',
					'>',
					'|'
				];
			//detail_replacement = 
			//{
			//	/style="float: left;"/g: '',
			//	/&nbsp;|&nbsp;/g: ''
			//};
			for ( var i = 0; i < clean.iteration; i++ ) {
				var image = clean.images[i] ,
					link = clean.links[i] ,
					title = clean.titles[i] ,
					file_id = clean.file_ids[i] ,
					detail = clean.details[i] ,
					search = 'vkey/',
					id = ( i > 0 ) ? vkey ( link ) : vkey ( window.location.pathname );
					//               vkey from link       vkey id from browser url
					
					//detail_replacement.foreach ( function ( detail_search, detail_replace ) {
					//	detail = detail.replace ( detail_search, detail_replace );
					//});
					detail = detail.replace ( /style="float: left;"/g, '' );
					detail = detail.replace ( /&nbsp; /g, '&nbsp;' );
					detail = detail.replace ( /&nbsp;&nbsp;/g, '' );
					for ( var pipe_i = 0; pipe_i < 3; pipe_i++ ) {
						detail = detail.replace ( "|", '' );
					}
					
				if ( title && id && i === 0 ) {
					elements += '<div class="extra_title">';
					var input_value = title + ' - ' + id;
					if ( typeof input_value.replace === 'function' ) {
						if ( file_id ) {
							input_value += ' - ' + file_id;
						}
						clean_input_chars.foreach ( function ( char_key, char_value ) {
							input_value = input_value.replace ( char_value, '' );
						});
						elements += '<input type="text" onclick="this.select ();" class="extra_input" style="width: 160px;" value="' + input_value + '" />';
						elements += '</div>';
					} else {
						console && console.log ( 'input_value has no function called replace', ' near line (883)' );
					}
				}
				
				if ( debug ) console && console.log ( 'image : ', image, 'link : ', link, 'title : ', title, ' near line (887)' );
				var element = '<div class="extra_links" style="margin-bottom: 1em;">';
				element += '<a href="' + link + '">';
				element += '<img src="' + image + '" class="extra_thumb">';
				element += '</a>';
				if ( id ) {
					element += '<a href="http://www.pornhub.com/view_video.php?viewkey=' + id + '" class="pornhub_switch" style="color: #FF9900;">video on pornhub.com</a>';
				}
				element += '<div class="details">';
				if ( i === 0 ) {
					element += '<h2 class="h5 extra_sub_title"><a href="' + link + '">' + title + '</a></h2>';
					element += detail;
					element += '<p><a href="' + link + '" class="download">[download...]</a></p>';
				} else {
					element += detail;
				}
				element += '</div>' + "\n";
				element += '</div>';
				element += "\n";
				if ( clean.debug || clean.debugging.main  ) console && console.log ( element, ' near line (899)' );
				elements += element;
				if ( i === 0 ) {
					further_links = true;
					elements  += '<div id="further_links" style="margin-top: 1em;">' + "\n" + '<div style="margin-bottom: 1em; font-weight: bold; font-size: 1.2em;" class="extra_further_links_headline">Further Links</div>' + "\n";
				}
			}
			if ( further_links ) {
				elements += '</div>';
			}
			elements += '<style type="text/css">' + "\n";
			elements += 'p { padding-top: 0; margin-top: 0; padding-bottom: 0; margin-bottom: 0; }' + "\n";
			elements += '.details p a[href^="/video/"], .download { color: #FF9900; display: block; padding-top: 2px; }' + "\n";
			elements += 'h2 { padding-top: 5px; padding-bottom: 3px; }' + "\n";
			elements += 'extra_further_links_headline { background-color: darkgray; }' + "\n";
			elements += 'details > h5 { height: auto !important; overflow: auto !important; }' + "\n";
			elements += '</style>' + "\n";
			
			if ( document.getElementById ( 'extra_links' ) ) {
				document.getElementById ( 'extra_links' ).innerHTML = elements;
			} else {
				var body = document.getElementsByTagName ( 'body' );
				var oldBody = body.innerHMTL;
				body[0].innerHTML = '<div id="extra_links" style="margin: auto; width: 160px;">' + elements + '</div>';
				//body[0].innerHTML += '<div id="extra_links" style="position: fixed; top: 10px; left: 10px;">' + elements + '</div>';
			}
		}

		// censore output for screenshots
		var debug = ( clean.debug || clean.debugging.censor ) ? true : false;
		//debug = true;
	}
}