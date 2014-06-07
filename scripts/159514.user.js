// ==UserScript==
// @name fontspring.com - mark free fonts
// @description inserts marks for free fonts - on some pages the clicks will insert some style infos - hope this helps to stay focused
// @namespace http://fontspring.com/fonts/
// @website http://userscripts.org/scripts/show/159514
// @id fontspring_com_fonts_mark_free_fonts
// @noframes
// @license Creative Commons
// @license Share, Distribute, Modify
// @version 0.11
// @history 0.11 bug fixes
// @history 0.10 browser compatibilty fixes
// @history 0.9 bug fixing II
// @history 0.8 bug fixing
// @history 0.7 script clean up
// @history 0.6 bug fixing on download page
// @history 0.5 improved code more sites affected by the infos
// @history 0.4 improved style informations and faster execution
// @history 0.3 script executed after 5 seconds setTimeout included
// @history 0.2 added a debug variable to avoid console output
// @history 0.1 first version
// @for-greasemonkey
// @grant none
// @inculde http://fontspring.com/*
// @inculde http://www.fontspring.com/*
// @inculde https://fontspring.com/*
// @inculde https://www.fontspring.com/*
// @for-chrome
// @match http://fontspring.com/*
// @match http://www.fontspring.com/*
// @match https://fontspring.com/*
// @match https://www.fontspring.com/*

// @run-at document-end
// ==/UserScript==

var script_name = 'fontspring.com mark free fonts';
var loaded = false;
var date = new Date();
var hide_later_handler = '';
var counter_container_id = 'fontSpringComFreeFontsCounterContainer';
var counter_info_class_name_to_hide_later = 'fontSpringComFreeFontCounterInfoForHidding';

// mighty document ready from jQuery
(function(){var DomReady=window.DomReady={};var userAgent=navigator.userAgent.toLowerCase();var browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:(/msie/.test(userAgent))&&(!/opera/.test(userAgent)),mozilla:(/mozilla/.test(userAgent))&&(!/(compatible|webkit)/.test(userAgent))};var readyBound=false;var isReady=false;var readyList=[];function domReady(){if(!isReady){isReady=true;if(readyList){for(var fn=0;fn<readyList.length;fn++){readyList[fn].call(window,[]);}readyList=[];}}};function addLoadEvent(func){var oldonload=window.onload;if(typeof window.onload!='function'){window.onload=func;}else{window.onload=function(){if(oldonload){oldonload();}func();}}};function bindReady(){if(readyBound){return;}readyBound=true;if(document.addEventListener&&!browser.opera){document.addEventListener("DOMContentLoaded",domReady,false);}if(browser.msie&&window==top)(function(){if(isReady)return;try{document.documentElement.doScroll("left");}catch(error){setTimeout(arguments.callee,0);return;}domReady();})();if(browser.opera){document.addEventListener("DOMContentLoaded",function(){if(isReady)return;for(var i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);return;}domReady();},false);}if(browser.safari){var numStyles;(function(){if(isReady)return;if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return;}if(numStyles===undefined){var links=document.getElementsByTagName("link");for(var i=0;i<links.length;i++){if(links[i].getAttribute('rel')=='stylesheet'){numStyles++;}}var styles=document.getElementsByTagName("style");numStyles+=styles.length;}if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);return;}domReady();})();}addLoadEvent(domReady);};DomReady.ready=function(fn,args){bindReady();if(isReady){fn.call(window,[]);}else{readyList.push(function(){return fn.call(window,[]);});}};bindReady();})();

var pParent = function ( element ) {
	if ( element instanceof HTMLElement ) {
		if ( element.hasOwnProperty ( 'parentElement' ) || typeof element.parentElement !== 'undefined' || element.parentElement !== null ) {
			return element.parentElement;
		}
	}
	return false;
};
var cChilds = function ( element) {
	if ( element instanceof HTMLElement ) {
		if ( element.hasChildNodes ( ) ) {
			return element.children;
		}
	}
	return false;
};

var cClass = function ( element ) {
	if ( element instanceof HTMLElement ) {
		if ( element.className.indexOf ( 'sale_unit' ) !== -1 && element.nodeName == 'DIV' ) {
			return true;
		}
	}
	return false;
};

var toggleElement = function ( element, force ) {
	var function_name = 'toggleElement';
	if ( element instanceof HTMLElement ) {
		if ( element.style.display === 'none' || force === true ) {
			element.style.display = '';
			return true;
		} else if ( element.style.display !== 'none' || force === false ) {
			element.style.display = 'none';
			return false;
		}
	}
}

var toggleElementsByClassName = function ( class_name, force ) {
	var function_name = 'toggleElementsByClassName';
	var type = '';
	if ( class_name ) {
		var eleme = document.getElementsByClassName ( class_name );
		if ( eleme.length >= 1 ) {
			for ( nt in eleme ) {
				if ( eleme [ nt ] instanceof HTMLElement ) {
					type = toggleElement ( eleme [ nt ], force );
				}
			}
		}
	}
	return type;
}

var toggleElementById = function ( id, force ) {
	var function_name = 'toggleElementById';
	if ( id ) {
		var container = document.getElementById ( id );
		if ( container instanceof HTMLElement ) {
			return toggleElement ( container, force );
		}
	}
	return false;
}

var addClass = function ( element, class_name ) {
	var function_name = 'addClass';
	var debug = false;
	debug && console && console.log  ( function_name, ' element : ', element, ' class_name : ', class_name );
	if ( element instanceof HTMLElement ) {
		if ( element.className.indexOf ( class_name ) === -1 ) {
			var not_found = true;
			var clas = element.className.split ( ' ' );
			if ( clas.length >= 1 ) {
				for ( ses in clas ) {
					if ( typeof clas [ ses ] == 'string' ) {
						if ( clas [ ses ] == class_name ) {
							not_found = false;
							break;
							
						}
					}
				}
			}
			if ( not_found ) {
				clas.push ( class_name );
				element.className = clas.join ( ' ' );
				return true;
			}
		}
	}
	return false;
}

var removeClass = function ( element, class_name ) {
	var function_name = 'removeClass';
	if ( element instanceof HTMLElement ) {
		if ( element.className.indexOf ( class_name ) !== -1 ) {
			clas = element.className.split ( ' ' );
			var c = [];
			var not_found = true;
			for ( es in clas ) {
				if ( clas [ es ] !== class_name ) {
					c.push ( clas [ es ] );
				} else if ( clas [ es ] === class_name ) {
					not_found = false;
				}
			}
			element.className = c.join ( ' ' );
			if ( element.className.indexOf ( class_name ) === -1 ) {
				return true;
			}
		}
	}
	return false;
}

var createUniqueId = function ( hash ) {
	var function_name = 'createUniqueId';
	var reg_exp = new RegExp ( '([^A-Za-z0-9]*)', 'g' );
	var id = ( hash ) ? hash.replace ( reg_exp, '' ) : '';
	id += '__'
	id += window.location.href.replace ( reg_exp, '' );
	//if ( !date instanceof Date ) date = new Date ();
	//id += '_' + date.getTime ();
	id += '__' + script_name.replace ( reg_exp, '' );
	return id;
}

var countAffectedElements = function ( class_name ) {
	var function_name = 'countAffectedElements';
	var affected = 0;
	var elements = document.getElementsByClassName ( class_name );
	if ( elements.length >= 1 ) {
		affected = elements.length;
	}
	return affected;
};

var executeLaterHandlers = {
	max : 5 ,
	time : 2000
};

var executeLater = function ( func, time, name ) {
	var function_name = 'executeLater';
	if ( typeof func !== 'function' ) {
		console && console.log ( 'first argument have to by type of function' );
		console && console.log ( 'define it for e.g. :' );
		console && console.log ( 'executeLater ( function () { yourActualFunctionName( arguments, ifneeded ); }, time, name );' );
		console && console.log ( '2nd example - predefined time from executeLaterHandlers will set the timeout.' );
		console && console.log ( 'executeLater ( function () { yourActualFunctionName( arguments, ifneeded ); }, name );' );
		return false;
	}
	if ( typeof time == 'string' ) {
		name = time;
		time = executeLaterHandlers.time;
	}
	if ( typeof func == 'function' && typeof time == 'number' && typeof name == 'string' ) {
		if ( !executeLaterHandlers.hasOwnProperty ( name ) || typeof executeLaterHandlers [ name ] !== 'undefined' || executeLaterHandlers [ name ] !== null ) {
			executeLaterHandlers [ name ] = {
				'current' : 0,
				'handler' : undefined,
				'func' : func
			};
		}
		executeLaterHandlers [ name ].current = executeLaterHandlers [ name ].current + 1;
		if ( executeLaterHandlers [ name ].current >= executeLaterHandlers.max ) {
			window.clearTimeout ( executeLaterHandlers [ name ].handler )
			return false;
			// prevent of to much turn arounds
		}
		// terminate previous handlers
		if ( executeLaterHandlers [ name ].handler ) {
			window.clearTimeout ( executeLaterHandlers [ name ].handler );
			executeLaterHandlers [ name ].handler = undefined;
		}
		// execute handlers
		executeLaterHandlers [ name ].handler = window.setTimeout ( func, time );
		executeLaterHandlers [ name ].func = func;
		return executeLaterHandlers [ name ].func;
	}
};

var counterInfoButton = function ( not_clicked, force, source_element ) {
	var function_name = 'counterInfoButton';
	if ( hide_later_handler ) {
		window.clearTimeout ( hide_later_handler );
	}
	var element = document.getElementById ( id + 'Button' );
	var id = createUniqueId ( counter_container_id );
	var container = document.getElementById ( id );
	element = document.getElementById ( id + 'Button' );
	if ( element instanceof HTMLElement ) {
		type = toggleElementsByClassName ( counter_info_class_name_to_hide_later, force );
		if ( type === true ) {
			removeClass ( element, 'passive' );
			addClass ( element, 'active' );
			element.innerHTML = '-';
			element.title = 'Click to Minimize Content';
		} else if ( type === false ) {
			removeClass ( element, 'active' );
			addClass ( element, 'passive' );
			element.innerHTML = '+';
			element.title = 'Click to Maximize Content';
		}
	}
}

var createCounterContainer = function () {
	var function_name = 'createCounterContainer';
	var id = createUniqueId ( counter_container_id );
	var container = document.getElementById ( id );
	if ( container ) {
		return container;
	} else {
		var bod = document.getElementsByTagName ( 'body' );
		if ( bod.length >= 1 ) {
			if ( bod [ 0 ] ) {
				var container = document.createElement ( 'div' );
				container.setAttribute ( 'id', id );
				container_css = [
					'background-color : rgba(255,0,0,0.6);' ,
					'border : 2px solid #FC6565;' ,
					'border-radius : 5px;' ,
					'bottom : 0px;' ,
					'color : rgba(0,0,0,1);' ,
					'display : none;' ,
					'font-size : 14px;' ,
					'font-family : monospace;' ,
					'min-height : 15px;' ,
					'margin : 5px;' ,
					'padding : 5px;' ,
					'position : fixed;' ,
					'right : 0px;' ,
					'text-align : right;' ,
					'min-width : 20px;' ,
				];
				container.setAttribute ( 'style', container_css.join ( ' ' ) );
				var button = document.createElement ( 'div' );
				button.setAttribute ( 'id', id + 'Button' );
				button_css = [
					'background-color : #FC6565;' ,
					'border-radius : 5px;' ,
					'cursor : pointer;' ,
					'margin-top : -15px;' ,
					'text-align : center;' ,
				];
				button.setAttribute ( 'style', button_css.join ( ' ' ) );
				button.setAttribute ( 'title', 'Hide Info' );
				button.innerHTML = '-';
				if ( typeof button.addEventListener == 'function' ) {
					button.addEventListener ( 'click', function () { counterInfoButton ( false, undefined, this ); }, false );
				} else {
					button.attachEvent ( 'onclick', function () { counterInfoButton ( false, undefined, this ); } );
				}
				container.appendChild ( button );
				// to body
				bod [ 0 ].appendChild ( container );
				var container_check = document.getElementById ( id );
				if ( container_check instanceof HTMLElement ) {
					return container_check;
				}
			}
		}
	}
}

var createAffectedCounter = function ( hash, count, title ) {
	var function_name = 'createAffectedCounter';
	var debug = false;
	debug && console && console.log ( 'hash : ', hash , ' count : ', count );
	// unique id
	var id = createUniqueId ( hash );
	var counter = document.getElementById ( id );
	var container = createCounterContainer ();
	var for_return = false;
	toggleElementsByClassName ( counter_info_class_name_to_hide_later, true ); // turn everything on to avoid troubles
	if ( counter instanceof HTMLElement ) {
		if ( title ) counter.title = title;
		counter.innerHTML = ''+count+'';
		for_return = true;
	} else if ( container instanceof HTMLElement ) {
		var marked_counter = document.createElement ( 'div' );
		marked_counter.setAttribute ( 'id', id );
		marked_counter.innerHTML = ''+count+'';
		marked_counter.setAttribute ( 'style', '' );
		if ( title ) marked_counter.setAttribute ( 'title', title );
		container.appendChild ( marked_counter );
		var container_check = document.getElementById ( id );
		if ( container_check instanceof HTMLElement ) {
			for_return = true;
		}
	}
	if ( for_return === true ) {
		toggleElementById ( createUniqueId ( counter_container_id ), true );
	}
	if ( hide_later_handler ) {
		window.clearTimeout ( hide_later_handler );
	}
	hide_later_handler = window.setTimeout ( function () { counterInfoButton ( true, false, undefined ); }, 5000 );
	return for_return;
}

var accountInvoiceDownloadButtons = function () {
	var function_name = 'addEventToDownloadButtons';
	var executed = false;
	var submits = document.getElementsByClassName ( 'generic_submit' );
	if ( submits.length >= 1 ) {
		for ( button in submits ) {
			if ( submits [ button ] instanceof HTMLElement ) {
				addClass ( submits [ button ], function_name );
				if ( typeof submits [ button ].addEventListener == 'function' ) {
					submits [ button ].addEventListener ( 'click', function () { accountInvoiceDownloadButtonsMarkClickedButton ( this ); }, false );
				} else {
					submits [ button ].attachEvent ( 'onclick', function () { accountInvoiceDownloadButtonsMarkClickedButton ( this ); } );
				}
				executed = true;
			}
		}
	}
	if ( executed === false && submits.length <= 0 ) {
		var handler = executeLater ( function () { accountInvoiceDownloadButtons ( ) }, function_name );
		console && console.log ( function_name + '() didnt get any elements - give a new try' );
	} else {
		var affected_elements = countAffectedElements ( function_name );
		createAffectedCounter ( function_name, '<span class="' + counter_info_class_name_to_hide_later + '">Total Download Button Count : </span>' + affected_elements, 'total count of download buttons' );
	}
}

var accountInvoiceDownloadButtonsMarkClickedButton = function ( source_element ) {
	var function_name = 'accountInvoiceDownloadButtonsMarkClickedButton';
	var executed = false;
	if ( source_element instanceof HTMLElement ) {
		var element =
			( source_element.nodeName === 'SPAN' )
				? source_element.parent
				: source_element;
		if ( element ) {
			addClass ( element, function_name );
			element.style.opacity = '0.5';
			if ( typeof element.removeEventListener == 'function' ) {
				element.removeEventListener ( 'click', function () { accountInvoiceDownloadButtonsMarkClickedButton ( this ); }, false );
			} else {
				element.detachEvent ( 'onclick', function () { accountInvoiceDownloadButtonsMarkClickedButton ( this ); } );
			}
			executed = true;
		}
	}
	if ( executed === false ) {
		console && console.log ( function_name + '() not executed' );
		// no new try - cause it is an event handler
	} else {
		var affected_elements = countAffectedElements ( function_name );
		createAffectedCounter ( function_name, '<span class="' + counter_info_class_name_to_hide_later + '">Total Download Button Count : </span>' + affected_elements, 'total count of clicked download buttons (multiple counting possible)' );
	}
}


var foundryFocusAsClicked = function ( ) {
	var function_name = 'foundryFocusAsClicked';
	var executed = false;
	var link = document.getElementsByTagName ( 'a' );
	var found = false;
	if ( link.length >= 1 ) {
		for ( s in link ) {
			if ( link [ s ] instanceof HTMLElement ) {
				if ( link [ s ].href.indexOf ( '/foundry/' ) !== -1 ) {
					link [ s ].setAttribute ( 'target', '_blank' );
					if ( link [ s ].href.indexOf ( '?sort=' ) === -1 ) {
						link [ s ].href += '?sort=alpha';
					}
					var reg_exp = new RegExp ( ' ', 'g' );
					link [ s ].setAttribute ( 'id', 'foundry_' + link [ s ].innerHTML.replace ( reg_exp, '' ) );
					if ( typeof link [ s ].addEventListener == 'function' ) {
						link [ s ].addEventListener ( 'click', function () { foundryFocusAsClickedMarkEvent ( this ) }, false );
					} else {
						link [ s ].attachEvent ( 'onclick', function () { foundryFocusAsClickedMarkEvent ( this ) } );
					}
					addClass ( link [ s ], function_name );
					found = true;
				}
			}
		}
	}
	if ( found === false ) {
		var handler = executeLater ( function () { foundryFocusAsClicked () }, function_name );
		console && console.log ( function_name + '() didnt find any elements - give a new try' );
	} else if ( found === true ) {
		createAffectedCounter ( function_name, '<span class="' + counter_info_class_name_to_hide_later + '">Event Click Listeners : </span>' + countAffectedElements ( function_name ), 'event listeners added to set last focused link' );
	}
	return found;
};

var foundryFocusAsClickedMarkEvent = function ( source_element ) {
	var function_name = 'foundryFocusAsClickedMarkEvent';
	var func_name = 'foundryFocusAsClicked';
	var found = false;
	if ( source_element instanceof HTMLElement ) {
		addClass ( source_element, function_name );
		source_element.style.color = '#FC6565';
		found_name = source_element.innerHTML;
		window.location.hash = '#' + source_element.id;
		found = true;
	}
	if ( found ) {
		createAffectedCounter ( function_name, '<span class="' + counter_info_class_name_to_hide_later + '">Last Clicked Foundry : </span>' + found_name, 'Last Clicked foundry Name' );
	}
	return found;
};

var foundryListing = function ( ) {
	var function_name = 'foundryListing';
	var executed = false;
	var acti = document.getElementsByClassName ( 'fu_action' );
	var css = [
		'background-color : #FC6565;'
	];
	var fonts_in_total = 0;
	var debug = false;
	if ( typeof turns_counter == 'number' ) {
		turns_counter++;
	}
	for ( on in acti ) {
		if ( acti [ on ] instanceof HTMLElement ) {
			if ( acti [ on ].innerHTML.indexOf ( 'FREE' ) !== -1 ) {
				var number_of_free_fonts = acti [ on ].innerHTML.substring ( acti [ on ].innerHTML.indexOf ( '(' )+1, acti [ on ].innerHTML.lastIndexOf ( ' ' ) );
				number_of_free_fonts = parseInt ( number_of_free_fonts );
				fonts_in_total = fonts_in_total + number_of_free_fonts;
				acti [ on ].setAttribute ( 'style', css.join ( ' ' ) );
				var parent = pParent ( acti [ on ] );
				if ( parent ) {
					parent.setAttribute ( 'style', css.join ( ' ' ) );
					if ( parent.className.indexOf ( 'fu_info' ) !== -1 ) {
						var par_parent = pParent ( parent );
						if ( par_parent ) {
							addClass ( par_parent, function_name );
							executed = true;
						} else {
							addClass ( acti [ on ], function_name );
						}
						
						var childr = cChilds ( parent );
						if ( childr ) {
							for ( en in childr ) {
								if ( childr [ en ] instanceof HTMLElement ) {
									var chi = cChilds ( childr [ en ] );
									if ( chi ) {
										for ( ld in chi ) {
											if ( chi [ ld ] instanceof HTMLElement ) {
												var get_link_element = false;
												if ( chi [ ld ].className.indexOf ( 'fam_info' ) !== -1 ) {
													get_link_element = true;
												}
												if ( get_link_element === true ) {
													if ( chi [ ld ].hasChildNodes () ) {
														var child_li = chi [ ld ].children;
														for ( nk in child_li ) {
															if ( child_li [ nk ] instanceof HTMLElement ) {
																if ( child_li [ nk ].nodeName === 'A' ) {
																	child_li [ nk ].setAttribute ( 'style', css.join ( ' ' ) );
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
	if ( executed === false && !acti ) {
		var handler = executeLater ( function () { foundryListing () }, function_name );
		console && console.log ( 'not executed - give a new try?' );
	} else {
		var affected_count = countAffectedElements ( function_name );
		if ( fonts_in_total !== affected_count ) {
			createAffectedCounter ( function_name, '<span class="' + counter_info_class_name_to_hide_later + '">Free Sets : </span>' + countAffectedElements ( function_name ), 'total count of free font families' );
			createAffectedCounter ( function_name + 'TotalCount', '<span class="' + counter_info_class_name_to_hide_later + '">Free Fonts : </span>' + fonts_in_total, 'total count of all free fonts' );
			toggleElementById ( function_name + 'TotalCount', true );
		} else {
			toggleElementById ( function_name + 'TotalCount', false );
			createAffectedCounter ( function_name, '<span class="' + counter_info_class_name_to_hide_later + '">Free Fonts : </span>' + countAffectedElements ( function_name ), 'total count of free font families' );
		}
	}
}

var fontsListing = function ( ) {
	var function_name = 'fontsListing'
	var debug = true;
	var executed = false;
	var some_how_executed = false;
	if ( typeof turns_counter == 'number' ) {
		turns_counter++;
	}
	var ss_price = document.getElementsByClassName ( 'ss_price' );
	//debug && console && console.log ( ss_price );
	if ( ss_price.length >= 1 ) {
		for ( p in ss_price ) {
			if ( ss_price [ p ] instanceof HTMLElement ) {
				//debug && console && console.log ( ss_price [ p ] );
				if ( ss_price [ p ].innerHTML == 'FREE' ) {
					var css = [
						'background-color: #FC6565 !important;'
					];
					ss_price [ p ].setAttribute ( 'style', css.join ( ' ' ) );
					some_how_executed = true;
					try {
						var parent = ss_price [ p ].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
						if ( parent ) {
							if ( parent.className.indexOf ( 'cart_form' ) !== -1 ) {
								addClass ( parent, function_name );
							}
						}
					} catch ( e ) {
						// no error output
					}
				}
			}
		}
	}
	
	if ( executed === false && ss_price.length <= 0 ) {
		var handler = executeLater ( function () { fontsListing () }, function_name );
		console && console.log ( 'not executed - give a new try?' );
	} else {
		createAffectedCounter ( function_name, '<span class="' + counter_info_class_name_to_hide_later + '">Free Fonts : </span>' + countAffectedElements ( function_name ), 'total count of free fonts on this page' );
	}
};

// if document is loaded start start
if ( typeof DomReady !== undefined ) {
	if( typeof DomReady.ready === 'function' ) {
		DomReady.ready ( function () {
			// if document is loaded and ready for manipulation START
				// avoid loading twice
				loaded = true;
				var exclude_these = [
					// paths
					//'/account' ,
					'/cart' ,
					'/ffdemo/iframe'
				];
				var include_these = {
					// first found will be executed
					// no other will executed too
					// paths : function ( s )
					// inside font family listings
					'/a2z' : function () { foundryListing ( ); } , // all fonts
					'/bestselling' : function () { foundryListing ( ); } , // bestselling fonts
					'/new' : function () { foundryListing ( ); } , // new fonts
					'/fresh' : function () { foundryListing ( ); } , // fresh & hot
					'/fonts' : function () { fontsListing ( ); } , // font product page
					// multiple font family listings
					'/classification' : function () { foundryListing ( ); } , // font overview of a selected tag
					'/tag' : function () { foundryListing ( ); } , // font overview of a selected tag
					'/free' : function () { foundryListing ( ); } , // set of free fonts
					'/picks' : function () { foundryListing ( ); } , // our picks - fonrspring selected fonts
					'/userfavorites' : function () { foundryListing ( ); } , // all user favorites
					'/myfavorites' : function () { foundryListing ( ); } , // your aka my favrites
					'/foundry/' : function () { foundryListing ( ); } , // selected foundry font overview
					// stay focus on last clicked foundry
					'/foundry' : function () { foundryFocusAsClicked ( ); } , // all foundries
					// stay focus on last clicked download button
					'/account/invoice' : function () { accountInvoiceDownloadButtons ( ); } // download page
				};
				var exclude_it = false;
				for ( paths in exclude_these ) {
					if ( typeof exclude_these [ paths ] == 'string' ) {
						if ( window.location.pathname.indexOf ( exclude_these [ paths ] ) !== -1 ) {
							exclude_it = true;
							break;
						}
					}
				}
				if ( !exclude_it ) {
					for ( path in include_these ) {
						if ( window.location.pathname.indexOf ( path ) !== -1 && typeof include_these [ path ] == 'function' ) {
							include_it = true;
							if ( typeof include_these [ path ] == 'function' ) {
								include_these [ path ] ();
								break;
							}
						}
					}
				}
			// if document is loaded and ready for manipulation STOP
		} );
	};
}
// if document is loaded stop stop