// ==UserScript==
// @name         rss_reader
// @namespace    http://gomaxfire.dnsdojo.com/go
// @description  rss_reader
// @include      *
// ==/UserScript==

/******************************
refine to do.
ªÖ¸§¯ÈkY
ReaderªÖ¸§¯È
|-FeedMap
  |- Feed*
     |- Entry*

Parser
- parse (string -> Entry)

Reader
- import
- export
- addFeed
- removeFeed
- updateEntries
- updateAllEntries
- saveFeeds
- loadFeeds
- loadEntries
- saveEntries

Viewer
- updateFeeds
- addFeed
- removeFeed
- viewOnlyHotFeed
- viewAllFeed
- viewFeed
- viewEntry
- scrollDown
- scrollUp
- viewNextEntry
- viewPreviousEntry
- viewOldEntries

TabManager

debug
objectToJson
xmlToObject
Date.W3cDTF 

******************************/


var debugEnable = true;

// debug
function debug(s){
	if(debugEnable && unsafeWindow.console && unsafeWindow.console.debug){
		unsafeWindow.console.debug(s);
	}
}

function debugByJSON(object){
	if(debugEnable && unsafeWindow.console && unsafeWindow.console.debug){
		unsafeWindow.console.debug(new SerializerJS(object).toJSON());
	}
}


// Date/W3CDTF.js -- W3C Date and Time Formats
Date.W3CDTF = function ( dtf ) {
    var dd = new Date();
    dd.setW3CDTF = Date.W3CDTF.prototype.setW3CDTF;
    dd.getW3CDTF = Date.W3CDTF.prototype.getW3CDTF;
    if ( dtf ) this.setW3CDTF( dtf );
    return dd;
};

Date.W3CDTF.VERSION = "0.04";

Date.W3CDTF.prototype.setW3CDTF = function( dtf ) {
    var sp = dtf.split( /[^0-9]/ );

    // invalid format
    if ( sp.length < 6 || sp.length > 8 ) return;

    // invalid time zone
    if ( sp.length == 7 ) {
        if ( dtf.charAt( dtf.length-1 ) != "Z" ) return;
    }

    // to numeric
    for( var i=0; i<sp.length; i++ ) sp[i] = sp[i]-0;

    // invalid range
    if ( sp[0] < 1970 ||                // year
         sp[1] < 1 || sp[1] > 12 ||     // month
         sp[2] < 1 || sp[2] > 31 ||     // day
         sp[3] < 0 || sp[3] > 23 ||     // hour
         sp[4] < 0 || sp[4] > 59 ||     // min
         sp[5] < 0 || sp[5] > 60 ) {    // sec
        return;                         // invalid date 
    }

    // get UTC milli-second
    var msec = Date.UTC( sp[0], sp[1]-1, sp[2], sp[3], sp[4], sp[5] );

    // time zene offset
    if ( sp.length == 8 ) {
        if ( dtf.indexOf("+") < 0 ) sp[6] *= -1;
        if ( sp[6] < -12 || sp[6] > 13 ) return;    // time zone offset hour
        if ( sp[7] < 0 || sp[7] > 59 ) return;      // time zone offset min
        msec -= (sp[6]*60+sp[7]) * 60000;
    }

    // set by milli-second;
    return this.setTime( msec );
};

Date.W3CDTF.prototype.getW3CDTF = function() {
    var year = this.getFullYear();
    var mon  = this.getMonth()+1;
    var day  = this.getDate();
    var hour = this.getHours();
    var min  = this.getMinutes();
    var sec  = this.getSeconds();

    // time zone
    var tzos = this.getTimezoneOffset();
    var tzpm = ( tzos > 0 ) ? "-" : "+";
    if ( tzos < 0 ) tzos *= -1;
    var tzhour = tzos / 60;
    var tzmin  = tzos % 60;

    // sprintf( "%02d", ... )
    if ( mon  < 10 ) mon  = "0"+mon;
    if ( day  < 10 ) day  = "0"+day;
    if ( hour < 10 ) hour = "0"+hour;
    if ( min  < 10 ) min  = "0"+min;
    if ( sec  < 10 ) sec  = "0"+sec;
    if ( tzhour < 10 ) tzhour = "0"+tzhour;
    if ( tzmin  < 10 ) tzmin  = "0"+tzmin;
    var dtf = year+"-"+mon+"-"+day+"T"+hour+":"+min+":"+sec+tzpm+tzhour+":"+tzmin;
    return dtf;
};
/*

=head1 NAME

Date.W3CDTF - W3C Date and Time Formats

=head1 SYNOPSIS

    var dd = new Date.W3CDTF();         // now
    document.write( "getW3CDTF: "+ dd.getW3CDTF() +"ý_n" );

    dd.setW3CDTF( "2005-04-23T17:20:00+09:00" );
    document.write( "toLocaleString: "+ dd.toLocaleString() +"ý_n" );

=head1 DESCRIPTION

This module understands the W3CDTF date/time format, an ISO 8601 profile, 
defined by W3C. This format as the native date format of RSS 1.0.
It can be used to parse these formats in order to create the appropriate objects.

=head1 METHODS

=head2 new()

This constructor method creates a new Date object which has 
following methods in addition to Date's all native methods.

=head2 setW3CDTF( "2006-02-15T19:40:00Z" )

This method parse a W3CDTF datetime string and sets it.

=head2 getW3CDTF()

This method returns a W3CDTF datetime string.
Its timezone is always local timezone configured on OS.

=head1 SEE ALSO

http://www.w3.org/TR/NOTE-datetime

=head1 AUTHOR

Yusuke Kawasaki http://www.kawa.net/

=head1 COPYRIGHT AND LICENSE

Copyright (c) 2005-2006 Yusuke Kawasaki. All rights reserved.
This program is free software; you can redistribute it and/or 
modify it under the Artistic license. Or whatever license I choose,
which I will do instead of keeping this documentation like it is.

=cut
*/



//
// Tab process
//
var ENTRY_ID_PREFIX = "__entry__id__";
var FEED_ID_PREFIX = "__feed__id__";

function toggleView(event){
    var mainDiv = document.getElementById("__feed_reader__");
    var feedsDiv = document.getElementById("__feed_reader_feeds__");
    var outer = document.getElementById("__feed_reader_outer__");
    if(mainDiv){
		if(mainDiv.style.display == "block"){
			mainDiv.style.display = "none";
		} else {
			mainDiv.style.display = "block";
		}
    }
    if(feedsDiv){
		if(feedsDiv.style.display == "block"){
			feedsDiv.style.display = "none";
		} else {
			feedsDiv.style.display = "block";
		}
    }
    if(outer){
		if(outer.style.display == "block"){
			outer.style.display = "none";
		} else {
			outer.style.display = "block";
		}
    }
}

function setTab(linkFuncFactory){
    var tab = function ( node, id, corner, action, fg, bg, border ) {
		border = border || 'black';
		fg = fg || border;
		bg = bg || 'white';
		function addStyles( node, styles )  {
			for( var i in styles )
				node.style[i] = styles[i];
		};

		function borderize( node ){
			var container = document.createElement( 'div' );
			var div = document.createElement( 'div' ), i;
			var hor = corner&1 ? 'Right' : 'Left', ch = corner&1 ? 'Left' : 'Right';
			var ver = corner&2 ? 'Bottom' : 'Top', cv = corner&2 ? 'Top' : 'Bottom';
			var styles = { zIndex:'99999', position:'fixed', width:'auto',
						   padding:'0px', border:'0px' };
			styles[hor.toLowerCase()] = styles[ver.toLowerCase()] = '0px';
			styles[ch.toLowerCase()] = 'auto';
			var common = { border:'0px solid '+border, overflow:'hidden',
						   display:'block', backgroundColor:bg, fontSize:'1px',
						   padding:'0px', width:'auto' },
				divstyle = { border:'0px solid '+border, background:bg,
							 width:'auto', paddingLeft:'5px', paddingRight:'5px',
							 cursor:'pointer' },
					round = [{height:'2px'},{height:'1px'},{height:'1px'},{height:'0px'}];
					for( i=0; i<round.length; i++ )  {
						round[i]['margin'+ch] = [1,2,3,5][i] + 'px';
						round[i]['border'+ch+'Width'] = [1,1,2,0][i] + 'px';
					}
					round[3]['border'+ver+'Width'] = '1px';
					divstyle['padding'+cv+'Width'] = '1px';
					divstyle['padding'+ver+'Width'] = '2px';
					divstyle['border'+ch+'Width'] = '1px';
          
					div.appendChild( node );
					addStyles( div, divstyle );
					addStyles( container, styles );
					if( ver == 'Top' )
						container.appendChild( div );
					for( var i=0; i<round.length; i++ )  {
						node = document.createElement( 'div' );
						addStyles( node, common );
						addStyles( node, round[ver=='Top' ? i : 3-i] );
						container.appendChild( node );
					}
					if( ver != 'Top' )
						container.appendChild( div );
					return container;
		};
    
		function addTab( node, id )  {
			var a = document.getElementById( id );
			var style = { textDecoration:'none', background:bg, color:fg,
						  paddingBottom:(corner&2?'5px':'1px'),
						  paddingTop:(corner&2?'1px':'5px') };
			if( a )
				return; // done that
			else {
				a = document.createElement( 'div' );
				addStyles( a, style );
				a.id = id + '-link';
				if( action )
					a.addEventListener( 'click', action, false );
				var div = borderize( a );
				div.id = id;
				document.body.appendChild( div );
			}
			a.appendChild( node );
		};
    
		addTab( node, id );
    }


    var feeds = [], links = document.getElementsByTagName( 'link' );
    var types = [ 'rdf', 'atom', 'rss' ], i, j, div, g, c, node, feed, id;
    var named = 'FeedReader';
    var color = '#1A8DBA';

    for( i=0; i<links.length; i++ )
		if( links[i].rel.match( /alternate/i ) )
			for( j=0; j<types.length; j++ )
				if( links[i].type.toLowerCase().match( types[j] ) ||
					links[i].href.toLowerCase().match( types[j] ) )  {
					feeds.push({type:types[j], 
								href:links[i].href, 
								title:links[i].title});
					break;
				}

    div = document.createElement( 'div' );
    node = document.createElement( 'a' );
    node.appendChild(document.createTextNode("Feed Reader"));
    node.addEventListener("click", toggleView, true);

    div.appendChild( node );
    div.style.font = 'xx-small bolder Helvetica,Arial,sans-serif';
    div.title = "Subscribe to this site's feeds via "+named+"!";
    for( i=0; i<feeds.length; i++ )	{
		feed = feeds[i];
		node = document.createElement( 'a' );
		node.title = 'Subscribe to ' + feed.title;
		node.addEventListener("click", linkFuncFactory(feed), true);
		node.innerHTML = feed.type.toUpperCase();
		node.setAttribute( 'style', 'margin:0 2px; background-color:'+color+'; '+
						   'padding:2px; color:white; text-decoration:none;' );
		div.appendChild( node );
	}
    node = document.createElement( 'a' );
    node.innerHTML = 'X';
    node.title = 'Close';
    node.href = 'javascript:void document.body.removeChild(document.getElementById("tab-'+named+'-subscribe"))';
    node.setAttribute( 'style', 'padding:1px 2px; background-color:white; ' +
					   'margin:1px 2px; color:'+color+'; text-decoration:none;' +
					   'border:1px solid '+color+';' );
    div.appendChild( node );
    tab( div, 'tab-'+named+'-subscribe', 0 );
    //  }
  
}



//
// JavaScript Object to JSON String
//
function SerializerJS( obj ){
    this.object = obj;
}

SerializerJS.prototype.toJSON = function (){
    var buf = '';
    return _serialize2json_no_recursion( buf, this.object );
}
  
    function _serialize2json_no_recursion( buf, obj ){
		var spool = '';
		var que = new Array();
		que.push( obj );

		while( 0 < que.length ){
			var o = que.shift();

			if( o instanceof Array ){
				var newQue = new Array();
				newQue.push('[');

				for(var i=0; i < o.length; ++i){
					if( typeof o[i] == 'string' ){
						o[i] = o[i].replace(/\"/g,'\"');
						o[i] = o[i].replace(/[\n\r]/g,'\n');
						newQue.push('"'+o[i]+'"');
					}else{
						newQue.push(o[i]);
					}
					newQue.push(',');
				}
				var lastVal = newQue.pop();
				if( lastVal != ',' ){
					newQue.push(lastVal);
				}

				newQue.push(']');
				for( var r = 0; r < que.length; ++r ){
					newQue.push( que[r] );
				}

				que = newQue;

			}else if( typeof o == 'string' 
					  || typeof o == 'number'
					  || typeof o == 'function'
					  || typeof o == 'boolean' ){
				spool += o;

			}else if( typeof o == 'object' ){
				var newQue = new Array();
				newQue.push('{');
				for( var e in o ){
					newQue.push('"'+e+'"');
					newQue.push(':');
					if( typeof o[e] == 'string' ){
						o[e] = o[e].replace(/"/g,'\\"'); //'
											o[e] = o[e].replace(/[\n\r]/g,'\n');
											newQue.push('"'+o[e]+'"');
											}else{
							newQue.push(o[e]);
						}
						newQue.push(',');
					}
					var lastVal = newQue.pop();
					if( lastVal != ',' ){
						newQue.push(lastVal);
					}
					newQue.push('}');
					for( var r = 0; r < que.length; ++r ){
						newQue.push( que[r] );
					}

					que = newQue;

				}else{
					// What happened!?
					//alert('unknown type: '+ typeof o +'\n'+ o );
					return null;
				}
			}

			return spool;
		}

		// ========================================================================
		//  XML.ObjTree -- XML source code from/to JavaScript object like E4X
		// ========================================================================

		if ( typeof(XML) == 'undefined' ) XML = function() {};

		//  constructor

		XML.ObjTree = function () {
			return this;
		};

		//  class variables

		XML.ObjTree.VERSION = "0.24";

		//  object prototype

		XML.ObjTree.prototype.xmlDecl = '<?xml version="1.0" encoding="UTF-8" ?>\n';
		XML.ObjTree.prototype.attr_prefix = '-';
		XML.ObjTree.prototype.overrideMimeType = 'text/xml';

		//  method: parseXML( xmlsource )

		XML.ObjTree.prototype.parseXML = function ( xml ) {
			var root;
			if ( window.DOMParser ) {
				var xmldom = new DOMParser();
				//      xmldom.async = false;           // DOMParser is always sync-mode
				var dom = xmldom.parseFromString( xml, "application/xml" );
				if ( ! dom ) return;
				root = dom.documentElement;
			} else if ( window.ActiveXObject ) {
				xmldom = new ActiveXObject('Microsoft.XMLDOM');
				xmldom.async = false;
				xmldom.loadXML( xml );
				root = xmldom.documentElement;
			}
			if ( ! root ) return;
			return this.parseDOM( root );
		};

		//  method: parseHTTP( url, options, callback )

		XML.ObjTree.prototype.parseHTTP = function ( url, options, callback ) {
			var myopt = {};
			for( var key in options ) {
				myopt[key] = options[key];                  // copy object
			}
			if ( ! myopt.method ) {
				if ( typeof(myopt.postBody) == "undefined" &&
					 typeof(myopt.postbody) == "undefined" &&
					 typeof(myopt.parameters) == "undefined" ) {
					myopt.method = "get";
				} else {
					myopt.method = "post";
				}
			}
			if ( callback ) {
				myopt.asynchronous = true;                  // async-mode
				var __this = this;
				var __func = callback;
				var __save = myopt.onComplete;
				myopt.onComplete = function ( trans ) {
					var tree;
					if ( trans && trans.responseXML && trans.responseXML.documentElement ) {
						tree = __this.parseDOM( trans.responseXML.documentElement );
					} else if ( trans && trans.responseText ) {
						tree = __this.parseXML( trans.responseText );
					}
					__func( tree, trans );
					if ( __save ) __save( trans );
				};
			} else {
				myopt.asynchronous = false;                 // sync-mode
			}
			var trans;
			if ( typeof(HTTP) != "undefined" && HTTP.Request ) {
				myopt.uri = url;
				var req = new HTTP.Request( myopt );        // JSAN
				if ( req ) trans = req.transport;
			} else if ( typeof(Ajax) != "undefined" && Ajax.Request ) {
				var req = new Ajax.Request( url, myopt );   // ptorotype.js
				if ( req ) trans = req.transport;
			}
			//  if ( trans && typeof(trans.overrideMimeType) != "undefined" ) {
			//      trans.overrideMimeType( this.overrideMimeType );
			//  }
			if ( callback ) return trans;
			if ( trans && trans.responseXML && trans.responseXML.documentElement ) {
				return this.parseDOM( trans.responseXML.documentElement );
			} else if ( trans && trans.responseText ) {
				return this.parseXML( trans.responseText );
			}
		}

		//  method: parseDOM( documentroot )

		XML.ObjTree.prototype.parseDOM = function ( root ) {
			if ( ! root ) return;

			this.__force_array = {};
			if ( this.force_array ) {
				for( var i=0; i<this.force_array.length; i++ ) {
					this.__force_array[this.force_array[i]] = 1;
				}
			}

			var json = this.parseElement( root );   // parse root node
			if ( this.__force_array[root.nodeName] ) {
				json = [ json ];
			}
			if ( root.nodeType != 11 ) {            // DOCUMENT_FRAGMENT_NODE
				var tmp = {};
				tmp[root.nodeName] = json;          // root nodeName
				json = tmp;
			}
			return json;
		};

		//  method: parseElement( element )

		XML.ObjTree.prototype.parseElement = function ( elem ) {
			//  COMMENT_NODE
			if ( elem.nodeType == 7 ) {
				return;
			}

			//  TEXT_NODE CDATA_SECTION_NODE
			if ( elem.nodeType == 3 || elem.nodeType == 4 ) {
				var bool = elem.nodeValue.match( /[^ý|x00-ý|x20]/ );
				if ( bool == null ) return;     // ignore white spaces
				return elem.nodeValue;
			}

			var retval;
			var cnt = {};

			//  parse attributes
			if ( elem.attributes && elem.attributes.length ) {
				retval = {};
				for ( var i=0; i<elem.attributes.length; i++ ) {
					var key = elem.attributes[i].nodeName;
					if ( typeof(key) != "string" ) continue;
					var val = elem.attributes[i].nodeValue;
					if ( ! val ) continue;
					key = this.attr_prefix + key;
					if ( typeof(cnt[key]) == "undefined" ) cnt[key] = 0;
					cnt[key] ++;
					this.addNode( retval, key, cnt[key], val );
				}
			}

			//  parse child nodes (recursive)
			if ( elem.childNodes && elem.childNodes.length ) {
				var textonly = true;
				if ( retval ) textonly = false;        // some attributes exists
				for ( var i=0; i<elem.childNodes.length && textonly; i++ ) {
					var ntype = elem.childNodes[i].nodeType;
					if ( ntype == 3 || ntype == 4 ) continue;
					textonly = false;
				}
				if ( textonly ) {
					if ( ! retval ) retval = "";
					for ( var i=0; i<elem.childNodes.length; i++ ) {
						retval += elem.childNodes[i].nodeValue;
					}
				} else {
					if ( ! retval ) retval = {};
					for ( var i=0; i<elem.childNodes.length; i++ ) {
						var key = elem.childNodes[i].nodeName;
						if ( typeof(key) != "string" ) continue;
						var val = this.parseElement( elem.childNodes[i] );
						if ( ! val ) continue;
						if ( typeof(cnt[key]) == "undefined" ) cnt[key] = 0;
						cnt[key] ++;
						this.addNode( retval, key, cnt[key], val );
					}
				}
			}
			return retval;
		};

		//  method: addNode( hash, key, count, value )

		XML.ObjTree.prototype.addNode = function ( hash, key, cnts, val ) {
			if ( this.__force_array[key] ) {
				if ( cnts == 1 ) hash[key] = [];
				hash[key][hash[key].length] = val;      // push
			} else if ( cnts == 1 ) {                   // 1st sibling
				hash[key] = val;
			} else if ( cnts == 2 ) {                   // 2nd sibling
				hash[key] = [ hash[key], val ];
			} else {                                    // 3rd sibling and more
				hash[key][hash[key].length] = val;
			}
		};

		//  method: writeXML( tree )

		XML.ObjTree.prototype.writeXML = function ( tree ) {
			var xml = this.hash_to_xml( null, tree );
			return this.xmlDecl + xml;
		};

		XML.ObjTree.prototype.writeXMLWithoutXmlDeclaration = function ( tree ) {
			var xml = this.hash_to_xml( null, tree );
			return xml;
		};

		//  method: hash_to_xml( tagName, tree )

		XML.ObjTree.prototype.hash_to_xml = function ( name, tree ) {
			var elem = [];
			var attr = [];
			for( var key in tree ) {
				if ( ! tree.hasOwnProperty(key) ) continue;
				var val = tree[key];
				if ( key.charAt(0) != this.attr_prefix ) {
					if ( typeof(val) == "undefined" || val == null ) {
						elem[elem.length] = "<"+key+" />";
					} else if ( typeof(val) == "object" && val.constructor == Array ) {
						elem[elem.length] = this.array_to_xml( key, val );
					} else if ( typeof(val) == "object" ) {
						elem[elem.length] = this.hash_to_xml( key, val );
					} else {
						elem[elem.length] = this.scalar_to_xml( key, val );
					}
				} else {
					attr[attr.length] = " "+(key.substring(1))+'="'+(this.xml_escape( val ))+'"';
				}
			}
			var jattr = attr.join("");
			var jelem = elem.join("");
			if ( typeof(name) == "undefined" || name == null ) {
				// no tag
			} else if ( elem.length > 0 ) {
				if ( jelem.match( /\n/ )) {
					jelem = "<"+name+jattr+">"+jelem+"</"+name+">\n";
				} else {
					jelem = "<"+name+jattr+">"  +jelem+"</"+name+">\n";
				}
			} else {
				jelem = "<"+name+jattr+" />\n";
			}
			return jelem;
		};

		//  method: array_to_xml( tagName, array )

		XML.ObjTree.prototype.array_to_xml = function ( name, array ) {
			var out = [];
			for( var i=0; i<array.length; i++ ) {
				var val = array[i];
				if ( typeof(val) == "undefined" || val == null ) {
					out[out.length] = "<"+name+" />";
				} else if ( typeof(val) == "object" && val.constructor == Array ) {
					out[out.length] = this.array_to_xml( name, val );
				} else if ( typeof(val) == "object" ) {
					out[out.length] = this.hash_to_xml( name, val );
				} else {
					out[out.length] = this.scalar_to_xml( name, val );
				}
			}
			return out.join("");
		};

		//  method: scalar_to_xml( tagName, text )

		XML.ObjTree.prototype.scalar_to_xml = function ( name, text ) {
			if ( name == "#text" ) {
				return this.xml_escape(text);
			} else {
				return "<"+name+">"+this.xml_escape(text)+"</"+name+">\n";
			}
		};

		//  method: xml_escape( text )

		XML.ObjTree.prototype.xml_escape = function ( text ) {
			return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
		};

		//
		// RSS Reader
		//

		var Reader = {
			scrolling : false,
			scrollSize: 50,
			getOuter:function(){
				if(!this.outer){
					this.outer = document.getElementById("__feed_reader_outer__");
				}
				return this.outer;
			},
			getInner:function(){
				if(!this.inner){
					this.inner = document.getElementById("__feed_reader_inner__");
				}
				return this.inner;
			},
			currentFeed:0,
			currentId :0,
			viewFeed : function(id){
				var feedsDiv = document.getElementById("__feed_reader_feeds__");
				var feedDiv = feedsDiv.getElementsByTagName("div")[id];
				if(feedDiv){
					readFeedFactory(feeds.feeds[id])(null);
				}
			},
			viewNextFeed : function(){
				this.viewFeed(this.currentFeed + 1);
			},
			viewPreviousFeed : function(){
				this.viewFeed(this.currentFeed - 1);
			},
			viewEntry : function(id){
				if(Reader.scrolling){
					return;
				}
				var entryId = ENTRY_ID_PREFIX + id;
				var entry = document.getElementById(entryId);
				if(entry){
					if(id != this.currentId){
						var oldEntry = document.getElementById(ENTRY_ID_PREFIX + this.currentId);
						if(oldEntry){
							with(oldEntry.style){
								backgroundColor = "white";
							}
						}
					}
					with(entry.style){
						backgroundColor = "lightyellow";
					}
					var outer = this.getOuter();
					var inner = this.getInner();
					this.currentId = id;
					Reader.scroll(entry.offsetTop);
				}
			},
			viewNextEntry : function(){
				this.viewEntry(this.currentId + 1);
			},
			viewPreviousEntry : function(){
				this.viewEntry(this.currentId - 1);
			},
			openEntry: function(){
				var entryId = ENTRY_ID_PREFIX + this.currentId;
				var entry = document.getElementById(entryId);
				var a = entry.getElementsByTagName("a")[0];
				if(a){
					var href = a.href;
					GM_openInTab(href);
				}
			},
			scroll : function(to){
				var inner = this.getInner();
				var outer = this.getOuter();
				if(!Reader.scrolling && 0 <= to && to <= inner.scrollHeight){
					Reader.scrolling = true;
					Reader.scrollAux(to);
				}
			},
			scrollAux : function(to){
				var outer = this.getOuter();
				var d = to - outer.scrollTop;
				if(Math.abs(d) < this.scrollSize){
					outer.scrollTop = to;
					Reader.scrolling = false;
				} else {
					var pre = outer.scrollTop;
					if(d > 0){
						outer.scrollTop += this.scrollSize;
					} else {
						outer.scrollTop -= this.scrollSize;
					}
					if(pre != outer.scrollTop){
						setTimeout(function(){Reader.scrollAux(to);}, 10);
					} else {
						Reader.scrolling = false;
					}
				}
			},
			scrollUp:function(){
				var outer = this.getOuter();
				var curTop = outer.scrollTop;
				Reader.scroll(curTop + 50);
			},
			scrollDown:function(){
				var outer = this.getOuter();
				var curTop = outer.scrollTop;
				Reader.scroll(curTop - 50);
			}

		};

		function accessRSS(url,func){
			GM_xmlhttpRequest({method:"GET", 
						url:url,
						onload:func});
		}

		function xmlToJson(xml){
			var xotree = new XML.ObjTree();
			var json = xotree.parseXML(xml);
			return json;
		}

		function objectToXml(object){
			var xotree = new XML.ObjTree();
			var xml = xotree.writeXMLWithoutXmlDeclaration(object);
			return xml;
		}

		function putFeedAnchor(id, readFeedFactory, feedDiv, feed){
			var div = document.createElement("div");
			div.id = FEED_ID_PREFIX + id;
			var a = document.createElement("a");
			a.className = "__feed_reader__feed";
			var text = document.createTextNode(decodeURIComponent(feed.title));
			a.appendChild(text);
			a.addEventListener("click", readFeedFactory(feed), true);
			var x = document.createElement("a");
			var text = document.createTextNode("X");
			x.appendChild(text);
			x.className = "__feed_reader__closebox";
			x.style.border = "1px solid #333333";
			x.addEventListener("click", function(event){
					var feedArray = feeds.feeds;
					var index = feedArray.indexOf(feed);
					if(index >= 0){
debug("all:"+feedArray.length);
						var pre = feedArray.slice(0, index);
						var post = feedArray.slice(index + 1, feedArray.length);
debug("pre:"+pre.length);
debug("post:"+post.length);
						feeds.feeds = pre.concat(post);
						saveFeeds(feeds);
						//GM_setValue("feeds", "(" +
						//		new SerializerJS(feeds).toJSON() + ")");
						feedDiv.removeChild(div);
					}
				}, true);
			div.appendChild(a);
			div.appendChild(document.createTextNode(" "));
			div.appendChild(x);
			feedDiv.appendChild(div);
		}

		function loadFeeds(){
			var feedsText = GM_getValue("feeds");
			if(feedsText){
  			  feeds = eval(decodeURIComponent(feedsText));
			}
			if(!feeds){
				feeds = {feeds:[]};
			}
			return feeds;
		}
		
		function saveFeeds(feeds){
			GM_setValue("feeds", encodeURIComponent("(" +
						new SerializerJS(feeds).toJSON() + ")"));
		}
		
		function setTitleFactory(feed){
			var setTitle = function(xhr){
				var feedInfo = getFeedInfo(xhr);
				var title = feedInfo.title
				feed.title = encodeURIComponent(title);
				feeds = loadFeeds();
				feedArray = feeds.feeds;
				feedArray.push(feed);
				saveFeeds(feeds);
				var feedDiv = document.getElementById("__feed_reader_feeds__");
				putFeedAnchor(feeds.feeds.length, readFeedFactory, feedDiv, feed);

			};
			return setTitle;

		}

		function removeScriptElements(node){
			var array = [];
			for(var i=0;i<node.childNodes.length;i++){
				array.push(node.childNodes[i]);
			}
			array.forEach(function(child){
					var attrs = child.attributes;
					if(attrs && attrs.length){
						var length = attrs.length;
						for(var i=0; i<length;i++){
							if(attrs[i].name.indexOf("on") == 0){
					//			debug("script attribute[" + attrs[i].name + "]:" + attrs[i].value);
								child.removeAttribute(attrs[i]);
							}
						}
					}
					if(child.tagName == "SCRIPT"){
						//debug("script:" + child.innerHTML);
						node.removeChild(child);
					} else {
						removeScriptElements(child);
					}
				});
		}

		function getContentText(element){
			var text = element;
			if(typeof element == "string"){
				return element;
			}
			if(typeof element == "object"){
				//debug(new SerializerJS(element).toJSON());
				text = element["#cdata-section"];
				if(!text){
					text = objectToXml(element);
					if(!text){
						text = element["#text"];
					}
				}
			} 
			if(typeof element == "undefined"){
				text = "";
			}
			if(text && typeof text == "string" && 
			   element["-mode"] && element["-mode"] == "escaped"){
				text = text.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, "\"").replace(/&amp;/g, "&");
			}
			return text;
		}


		function getFeedInfo(xhr){
			var xmlTree = xmlToJson(xhr.responseText);
			var feedinfo = {};
			var feed = xmlTree.feed;
			var rdf = xmlTree["rdf:RDF"];
			var rss = xmlTree.rss;
			if(feed){
				feedinfo.title = getContentText(feed.title);
				feedinfo.originalURL = getEntryLink(feed);
				feedinfo.updateDate = getDatetimeForAtom(feed);
				//debug("atom update:" +feedinfo.updateDate);
				feedinfo.description = feed.tagline;
			} else if(rdf){
				var rdfChannel = rdf.channel;
				feedinfo.title = getContentText(rdfChannel.title);
				feedinfo.originalURL = rdfChannel.link;
				feedinfo.updateDate = rdfChannel["dc:date"];
				if(!feedinfo.updateDate){
					feedinfo.updateDate = getLastUpdateDatetimeForRdf(rdf.item);
				}
				//debug("rdf update:" +feedinfo.updateDate);
				feedinfo.description = rdfChannel.description;
			} else if(rss){
				var rssChannel = rss.channel;
				feedinfo.title = getContentText(rssChannel.title);
				feedinfo.originalURL = rssChannel.link;
				feedinfo.updateDate = getLastUpdateDatetimeForRss(rssChannel.item);
				//debug("rss update:" +feedinfo.updateDate);
				feedinfo.description = rssChannel.description;
			}
			return feedinfo;
		}

		function getLastUpdateDatetimeForRdf(items){
			var lastDateString = "";
			var last = 0;
			items.forEach(function(item){
					var dateString = item["dc:date"];
					if(dateString){
						var datetime = new Date.W3CDTF();
						datetime.setW3CDTF(dateString);
						var time = datetime.getTime();
						if(time > last){
							last = time;
							lastDateString = dateString;
						}
					}
				});
			return lastDateString;
		}

		function getLastUpdateDatetimeForRss(items){
			var lastDateString = "";
			var last = 0;
			items.forEach(function(item){
					var dateString = item.pubDate;
					if(!dateString){
						dateString = item["dc:date"];
					}
					var datetime = new Date.W3CDTF();
					datetime.setW3CDTF(dateString);
					var time = datetime.getTime();
					if(time > last){
						last = time;
						lastDateString = dateString;
					}
				});
			return lastDateString;
		}


		function getFeedFromRegistryByURL(url){
			if(!feeds){
				feeds = loadFeeds();
			}
			var array = feeds.feeds;
			for(var i=0;i<array.length;i++){
				var curFeed = array[i];
				if(curFeed.href == url){
					return curFeed;
				}
			}
			return null;
		}

		function getFeedIndexFromRegistryByURL(url){
			if(!feeds){
				feeds = loadFeeds();
			}
			var array = feeds.feeds;
			for(var i=0;i<array.length;i++){
				var curFeed = array[i];
				if(curFeed.href == url){
					return i;
				}
			}
			return null;
		}

		function getFeedDiv(index){
			var feedDiv = null;
			var feedsDiv = document.getElementById("__feed_reader_feeds__");
			if(feedsDiv){
				var feedDivs = feedsDiv.getElementsByTagName("div");
				if(feedDivs){
					feedDiv = feedDivs[index];
				}
			}
			return feedDiv;
		}

		function appendFeedInfo(feedDiv, feedInfo){
			var div = document.createElement("div");
			div.id = "__feed_reader_feed_information__";

			var a = document.createElement("a");
			a.href = feedInfo.originalURL;
			a.appendChild(document.createTextNode("original site"));
			a.style.color = "white";

			var updateDateDiv = document.createElement("div");
			updateDateDiv.innerHTML = formatDatetime(feedInfo.updateDate);
			updateDateDiv.style.margin = "0";
			updateDateDiv.style.padding = "0";
			var descriptionDiv = document.createElement("div");
			descriptionDiv.innerHTML = getContentText(feedInfo.description);
			descriptionDiv.style.margin = "0";
			descriptionDiv.style.padding = "0";

			div.appendChild(updateDateDiv);
			div.appendChild(a);
			div.appendChild(descriptionDiv);
			removeScriptElements(div);
			feedDiv.appendChild(div);
			//debug(feedInfo.type);
		}

		function removeFeedInfo(feedDiv){
			if(feedDiv){
				var infoDiv = document.getElementById("__feed_reader_feed_information__");
				if(infoDiv){
					feedDiv.removeChild(infoDiv);
				}
			}
		}

		function testFactory(url, type){
			var test = function(xhr){
				//debug(Reader.currentURL + ":" + url);
				if(Reader.currentURL != url){
					return;
				}
				makeField();
				var outer = document.getElementById("__feed_reader_outer__");
				var inner = document.getElementById("__feed_reader_inner__");
				var xmlTree = xmlToJson(xhr.responseText);
				var feed = xmlTree.feed;
				var rdf = xmlTree["rdf:RDF"];
				var rss = xmlTree.rss;
				var feedIndex = getFeedIndexFromRegistryByURL(url);
				if(feedIndex != null){
					
					var feedInfo = feeds.feeds[feedIndex];
					var info = getFeedInfo(xhr);
					//debug(decodeURIComponent(info.title));
					feedInfo.title = info.title;
					feedInfo.originalURL = info.originalURL;
					feedInfo.updateDate = info.updateDate;
					feedInfo.description = info.description;
					
					var base = document.createElement("base");
					base.href = feedInfo.originalURL;
					//debug(base.href);
					inner.appendChild(base);

					var feedDiv = getFeedDiv(feedIndex);
					appendFeedInfo(feedDiv, feedInfo);
				}
				
				var date = "";
				if(feed){ // atom
					date = feed.updated;
					var entries = feed.entry;
					var i=0;
					entries.forEach(function(entry){
							var div = makeEntryDivAtom(entry, i);
							inner.appendChild(div);
							i++;
						});
				} else if(rdf){
					var rdfChannel = rdf.channel;
					date = rdfChannel["dc:date"];
					var entries = xmlTree["rdf:RDF"].item;
					var i=0;
					entries.forEach(function(entry){
							var div = makeEntryDivRdf(entry, i);
							inner.appendChild(div);
							i++;
						});
				} else if(rss){
					var rssChannel = rss.channel;
					var entries = rssChannel.item;
					var i=0;
					entries.forEach(function(entry){
							var div = makeEntryDivRss(entry, i);
							inner.appendChild(div);
							i++;
						});
				}
				if(date){
					//debug(formatDatetime(date));
				}
				Reader.viewEntry(0);

			};
			return test;
		}

		function keyProcess(event){
			if(event.target && event.target.tagName &&
			   (event.target.tagName == "INPUT" ||
				event.target.tagName == "TEXTAREA" )){
			} else {
				var prevent = function(event){
					event.preventDefault();
					event.returnValue = false;
				};
				var enable = document.getElementById("__feed_reader_feeds__").style.display == "block";
				var key = event.keyCode;
				if((key == 40 ||key == 74) && enable){ // down or 'j'
					Reader.viewNextEntry();
					window.status = "next entry";
					prevent(event);
				} else if((key == 38 || key == 75) && enable){ // up or 'k'
					Reader.viewPreviousEntry();
					window.status = "previous entry";
					prevent(event);
				} else if((key == 39 || key == 83) && enable){ // right or 's'
					Reader.viewNextFeed();
					window.status = "next feed";
					prevent(event);
				} else if((key == 37 || key == 65) && enable){ // left or 'a'
					Reader.viewPreviousFeed();
					window.status = "previous feed";
					prevent(event);
				} else if(key == 70 && event.ctrlKey){ // ctrl + 'f'
					toggleView(null);
					window.status = "toggle view of feed reader";
					prevent(event);
				} else if(key == 86 && enable){ // 'v'
					Reader.openEntry();
					window.status = "open entry into new tab";
					prevent(event);
				} else if(key == 79 && enable){ // 'o'
					viewImporter();
					window.status = "view importer";
					prevent(event);
				} else if(key == 32){ // space
					if(event.shiftKey){ // + shiftKey
						Reader.scrollDown();
					} else {
						Reader.scrollUp();
					}
					prevent(event);
				}
			}
		}

		function setEventListener(){
			document.addEventListener("keydown", keyProcess, false);
			window.addEventListener("resize", setSize, true);
		}



		function makeDiv(id){
			var div = document.getElementById(id);
			if(!div){
				div = document.createElement("div");
				div.id = id;
			}
			return div;
  
		}

		function removeChildren(element){
			var children = element.childNodes;
			var array = [];
			for(var i=0;i<children.length;i++){
				array.push(children[i]);
			}
			array.forEach(function(child){
					element.removeChild(child);
				});
		}

		function makeField(){
			var feedsDiv = document.getElementById("__feed_reader_feeds__");
			var outer = document.getElementById("__feed_reader_outer__");
			var inner = document.getElementById("__feed_reader_inner__");
			if(!outer){
				outer = makeDiv("__feed_reader_outer__");
				with(outer.style){
					width = (getPageWidth() - 340) + "px";
					height = (getPageHeight() - 40) + "px";
					//overflow = "hidden";
					overflow = "scroll";
					position = "fixed";
					top = "30px";
					left = "315px";
					padding = "0";
					backgroundColor = "white";
					border  = "1px solid #333333";
					display = feedsDiv.style.display;
                    zIndex = "99998";
				}
				inner = makeDiv("__feed_reader_inner__");
				with(inner.style){
					position = "relative";
					margin = "5px";
					padding = "5px";
					backgroundColor = "white";
				}
				outer.appendChild(inner);
				document.body.appendChild(outer);
			}
			removeChildren(inner);
			//inner.style.top = "0px";

		}

		function formatDatetime(datetimeString){
			if(!datetimeString){
				return datetimeString;
			}
			var datetime = new Date.W3CDTF();
			datetime.setW3CDTF(datetimeString);
			if(datetime.getFullYear()){
				var array = [];
				array.push(datetime.getFullYear()+"");
				array.push("/");
				array.push((datetime.getMonth()+1)+"");
				array.push("/");
				array.push(datetime.getDate()+"");
				array.push(" ");
				array.push(datetime.getHours()+"");
				array.push(":");
				array.push(datetime.getMinutes()+"");
				array.push(":");
				array.push(datetime.getSeconds()+"");
				return array.join("");
			} else {
				return datetimeString;
			}

		}
		
		function makeEntryDiv(entry, id){
			var div = document.createElement("div");
			div.id = ENTRY_ID_PREFIX + id;
			div.className = "__feed_reader__entry";

			var a = document.createElement("a");
			a.className = "__feed_reader__title";
			a.href = getContentText(entry.href);
			var text = document.createTextNode(getContentText(entry.title));
			a.appendChild(text);
			div.appendChild(a);

			if(entry.datetime){
				var datetimeDiv = document.createElement("div");
				datetimeDiv.className = "__feed_reader__datetime";
				datetimeDiv.appendChild(document.createTextNode(formatDatetime(entry.datetime)));
				div.appendChild(datetimeDiv);
			}
			
			if(entry.content){
				var contentDiv = document.createElement("div");
				contentDiv.className = "__feed_reader__content";
				var content = getContentText(entry.content);
				contentDiv.innerHTML = content;
				removeScriptElements(contentDiv);
				div.appendChild(contentDiv);
			}

			return div;
		}

		function getEntryLink(entry){
			var href = entry.link["-href"];
			if(!href){
				var links = {};
				entry.link.forEach(function(l){
						links[l["-rel"]] = l["-href"];
					});
				href = links.alternate;
				if(!href){
					href = links.related;
				}
			}
			return href;
		}

		function getDatetimeForAtom(item){
			var datetime = item.modified;
			if(!datetime){
				datetime = item.updated;
				if(!datetime){
					datetime = item.published;
					if(!datetime){
						datetime = item.issued;
						if(!datetime){
							datetime = item.created;
						} else {
							datetime = "";
						}
					}
				}
			}
			return datetime;
		}

		function makeEntryDivAtom(entry, id){
			var info = {};
			info.href = getEntryLink(entry);
			info.title = entry.title;
			info.content = entry.content;
			info.datetime = getDatetimeForAtom(entry);
			return makeEntryDiv(info, id);
		}

		function makeEntryDivRdf(item, id){
			var info = {};
			info.href = item["-rdf:about"];
			info.title = item.title;
			info.content = item["content:encoded"];
			if(!info.content){
				info.content = item.description;
			} 
			if(!content){
				info.content = "";
			}
			info.datetime = item["dc:date"];
			return makeEntryDiv(info, id);
		}

		function makeEntryDivRss(item, id){
			var info = {};
			info.href = item.link;
			info.title = item.title;
			info.content = item["content:encoded"];
			if(!info.content){
				info.content = item.description;
			}
			info.datetime = item.pubDate;
			if(!info.datetime){
				info.datetime = item["dc:date"];
				debug("info.datetime:" + info.datetime);
			}
			return makeEntryDiv(info, id);
		}

		var feeds = loadFeeds();


		var addFeedFactory = function(feed){
			var feedArray = feeds.feeds;
			var length = feedArray.length;
			var addFeed = function(event){
				var exist = false;
				for(var i=0;i<length;i++){
					var element = feedArray[i];
					var curHref = element.href;
					if(curHref == feed.href){
						exist = true;
						break;
					}
				}
				if(!exist){
					accessRSS(feed.href, setTitleFactory(feed));
				}
			}
			return addFeed;
		}

		function makeFeedField(){
			var main = document.createElement("div");
			main.id = "__feed_reader__";
			with(main.style){
				display = "none";
				position = "fixed";
				top = "0";
				left = "0";
				width = "100%";
				//height = getPageHeight()+ "px";
				height = document.body.clientHeight+ "px";
				backgroundColor = "#333333";
				opacity = "0.95";
                zIndex = "99997";
			}
			var div = document.createElement("div");
			div.id = "__feed_reader_feeds__";
			with(div.style){
				width = "300px";
				height = (getPageHeight() - 40) + "px";
				overflow = "scroll";
				position = "fixed";
				top = "30px";
				left = "10px";
				padding = "0";
				backgroundColor = "white";
				border  = "1px solid #333333";
				display = "none";
                zIndex = "99998";
			}
			document.body.appendChild(main);
			document.body.appendChild(div);
			return div;

		}

		function readFeedFactory(feed){
			var readFeed = function(event){
				var id = feeds.feeds.indexOf(feed);
				var feedId = FEED_ID_PREFIX + id;
				var feedDiv = document.getElementById(feedId);
				if(feedDiv){
					if(id != Reader.currentFeed){
						var oldFeedDiv = document.getElementById(FEED_ID_PREFIX + Reader.currentFeed);
						removeFeedInfo(oldFeedDiv);
						with(oldFeedDiv.style){
							backgroundColor = "white";
							color = "black";
						}
						var oldA = oldFeedDiv.getElementsByTagName("a")[0];
						oldA.style.color = "blue";
					}
					with(feedDiv.style){
						backgroundColor = "blue";
						color = "white";
					}
					var a = feedDiv.getElementsByTagName("a")[0];
					a.style.color = "white";
					Reader.currentFeed = id;
				}
				makeField();
				var inner = document.getElementById("__feed_reader_inner__");
				inner.innerHTML = "getting feed..."
				Reader.currentURL = feed.href;
				accessRSS(feed.href, testFactory(feed.href, feed.type));
			};
			return readFeed;
		}

		function makeStyle(){
			var buffer = [];
			buffer.push("#tab-FeedReader-subscribe {");
			buffer.push("  font-family:verdana, sans-serif;");
			buffer.push("}");
			buffer.push("#tab-FeedReader-subscribe a {");
			buffer.push("  text-decoration : underline;");
			buffer.push("  color : blue;");
			buffer.push("}");
			buffer.push("#__feed_reader__ {");
			buffer.push("  font-family:verdana, sans-serif;");
			buffer.push("}");
			buffer.push("#__feed_reader_feeds__ a, #__feed_reader_inner__ a {");
			buffer.push("  background : transparent;");
			buffer.push("  text-decoration : underline;");
			buffer.push("  color : blue;");
			buffer.push("}");
			buffer.push("#__feed_reader_feeds__ a.__feed_reader__feed{");
			buffer.push("  font-size : small;");
			buffer.push("  margin : 0px;");
			buffer.push("}");
			buffer.push("#__feed_reader_feeds__ div{");
			buffer.push("  text-align : left;");
			buffer.push("  margin-top : 3px;");
			buffer.push("  margin-bottom : 0px;");
			buffer.push("  margin-left : 5px;");
			buffer.push("  padding : 0px;");
			buffer.push("  font-size : medium;");
			buffer.push("}");
			buffer.push("#__feed_reader_inner__ blockquote {");
			buffer.push("  background-color :#EEEEEE;");
			buffer.push("  margin :5px;");
			buffer.push("  padding :5px;");
			buffer.push("  border : 1px dashed #333333;");
			buffer.push("}");
			buffer.push("#__feed_reader_inner__ a.__feed_reader__title {");
			buffer.push("  text-decoration : underline;");
			buffer.push("  backgroundColor : white;");
			buffer.push("  color : blue;");
			buffer.push("  font-size : large;");
			buffer.push("}");
			buffer.push("#__feed_reader_feeds__ a.__feed_reader__closebox {");
			buffer.push("  border : 1px solid #333333;");
			buffer.push("  text-decoration : none;");
			buffer.push("  backgroundColor : white;");
			buffer.push("  color : black;");
			buffer.push("}");
			buffer.push("#__feed_reader_inner__ div.__feed_reader__entry {");
			buffer.push("  padding-top : 10px;");
			buffer.push("  padding-bottom : 10px;");
			buffer.push("  border-top : 2px solid #CCCCFF;");
			buffer.push("  text-align : left;");
			buffer.push("}");
			buffer.push("#__feed_reader_inner__ div.__feed_reader__content {");
			buffer.push("  padding : 5px;");
			buffer.push("  text-align : left;");
			buffer.push("}");
			buffer.push("#__feed_reader_inner__ div.__feed_reader__datetime {");
			buffer.push("  color : black;");
			buffer.push("  font-size : x-small;");
			buffer.push("}");
			buffer.push("#__feed_reader_inner__ div.__feed_reader__content {");
			buffer.push("  color : black;");
			buffer.push("  font-size : small;");
			buffer.push("}");
			buffer.push("#__feed_reader_feed_information__ div,#__feed_reader_feed_information__ a{");
			buffer.push("  font-size : small;");
			buffer.push("  color : white;");
			buffer.push("}");
			return buffer.join("\n");
			
		}

		function setFeedList(readFeedFactory){
			
			GM_addStyle(makeStyle());
			var feedDiv = makeFeedField();
			var feedArray = feeds.feeds;
			var i=0;
			feedArray.forEach(function(feed){
					putFeedAnchor(i, readFeedFactory, feedDiv, feed);
					i++;
				});
			Reader.viewFeed(0);
  
		}
    
		function getPageHeight(){
			return self.innerHeight;
		}
		function getPageWidth(){
			return self.innerWidth;
		}

		function setSize(event){
			var pageHeight = getPageHeight();
			var pageWidth = getPageWidth();
			var feedsDiv = document.getElementById("__feed_reader_feeds__");
			var outerDiv = document.getElementById("__feed_reader_outer__");
			if(outerDiv){
				feedsDiv.style.height = (pageHeight - 80)+ "px";
				outerDiv.style.height = (pageHeight - 80)+ "px";
				outerDiv.style.width = (pageWidth - 340)+ "px";
			}
		}



		if(parent.document == document){ 
			setTab(addFeedFactory);
			setFeedList(readFeedFactory);
			setEventListener();
		}
		
		function getOutlines(opml){
                        var queue = [opml];
			var array = [];
			while(queue.length > 0){
				var node = queue[0];
				for(child in node){
					//debug("child:" + child);
					if(node["-xmlUrl"]){
						debug("add:" + node["-xmlUrl"]);
						array.push(node);
					} else if(typeof node[child].sort == "function"){
						debug("add children:" + child);
						queue = queue.concat(node[child]);
					} else if(child == "outline" && node[child]["-xmlUrl"]){
						//debug("add:" + node[child]["-xmlUrl"]);
						//array.push(node[child]);
					} else if(child.indexOf("-") != 0 && !child.match(/[0-9]+/)){
						debug("enqueue child:" + child);
						queue.push(node[child]);
					}
				}
				queue.shift();
			}
 			return array;
		}

		function importOPML(opmlxml){
			var registFeed = function(feed){
				var feedArray = feeds.feeds;
				var length = feedArray.length;
				var exist = false;
				for(var i=0;i<length;i++){
					var element = feedArray[i];
					var curHref = element.href;
					if(curHref == feed.href){
						exist = true;
						break;
					}
				}
				if(!exist){
					debug("import :" + feed.href);
					feedArray.push(feed);
				}
			};
			var opml = xmlToJson(opmlxml);
			//var outlines = opml.opml.body.outline;
			var outlines = getOutlines(opml.opml.body.outline);
			var feedsDiv = document.getElementById("__feed_reader_feeds__");
//			var nextId = feedsDiv.getElementsByTagName("div").length;
			feeds = loadFeeds();
			var nextId = feeds.feeds.length;
			outlines.forEach(function(outline){
					var feed = {href:outline["-xmlUrl"], 
								type:outline["-type"], 
								title:encodeURIComponent(outline["-title"])};
					if(registFeed(feed)){
						putFeedAnchor(nextId, readFeedFactory, feedsDiv, feed);
						nextId++;
					}
				});
			saveFeeds(feeds);
			//GM_setValue("feeds", "(" + new SeriazlierJS(feeds).toJSON() +")");
		}

		function viewImporter(){
			var div = document.createElement("div");
			with(div.style){
				border = "2px solid #000000";
				position = "fixed";
				top = "50px";
				left = "50px";
				zIndex = "99999";
			}
			var textarea = document.createElement("input");
			var button = document.createElement("input");
			button.value = "import";
			button.type = "button";
			button.addEventListener("click", 
						function(event){
							//debug(textarea.value);
							GM_xmlhttpRequest({method:"GET", 
										url:textarea.value,
										onload:function(xhr){
											//debug(xhr.responseText);
											importOPML(xhr.responseText);
											document.body.removeChild(div);
										}
									}); 
						},
						true);
			div.appendChild(textarea);
			div.appendChild(button);
			document.body.appendChild(div);
		}