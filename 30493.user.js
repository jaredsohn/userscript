// ==UserScript==
// @name           Google Contacts Autocomplete
// @namespace      http://mattsarchives.com
// @description    Version: 7. Creates a javascript autocompleter next to email input boxes on web pages with your Google Contacts
// @include        *
// @exclude        http*://*.google.com/*
// @exclude        http*://google.com/* 
// ==/UserScript==

///////////////////////////////////////////////////////////////////////
// settings
///////////////////////////////////////////////////////////////////////

// my email address
	// add your email to have it display as the top result on all searches
	// example: var my_email = ["me@myself.com", "my_other@address.com"];
	var my_email = [];
	


// xml or csv to retrieve contacts? 
	// xml takes longer to download and only downloads 1000 of your contacts
	// csv sorts alphabetical instead of by "affinity" (probably determined by how often you contact people)
	var parse_method = 'xml';

// csv only settings 
	// find this URL by going to GMail > Contacts > Export > All > Google CSV and copying and pasting the URL
	// this one for most gmail accounts
	var contacts_csv_url = "https://mail.google.com/mail/contacts/data/export?exportType=ALL&out=GMAIL_CSV";

	// apps users use this one
	//var contacts_csv_url = "https://mail.google.com/a/EXAMPLE.COM/contacts/data/export?exportType=ALL&out=GMAIL_CSV";

// xml only settings
	var contacts_xml_url = "http://docs.google.com/c/data/contacts?max=1000";
	// not sure if this works for Google Apps for Your Domain users or not

	// whether to add your gmail address to the list of suggestions
	var add_gmail = true;

// auto-hide time
	// the number of seconds you would like the script to wait before hiding the searched results
	var seconds_to_hide = 2;











///////////////////////////////////////////////////////////////////////
// don't edit below here
///////////////////////////////////////////////////////////////////////




// ================================================================
//  jkl-parsexml.js ---- JavaScript Kantan Library for Parsing XML
//  Copyright 2005-2007 Kawasaki Yusuke <u-suke@kawa.net>
//  http://www.kawa.net/works/js/jkl/parsexml.html
// ================================================================
//  v0.01  2005/05/18  first release
//  v0.02  2005/05/20  Opera 8.0beta may be abailable but somtimes crashed
//  v0.03  2005/05/20  overrideMimeType( "text/xml" );
//  v0.04  2005/05/21  class variables: REQUEST_TYPE, RESPONSE_TYPE
//  v0.05  2005/05/22  use Msxml2.DOMDocument.5.0 for GET method on IE6
//  v0.06  2005/05/22  CDATA_SECTION_NODE
//  v0.07  2005/05/23  use Microsoft.XMLDOM for GET method on IE6
//  v0.10  2005/10/11  new function: JKL.ParseXML.HTTP.responseText()
//  v0.11  2005/10/13  new sub class: JKL.ParseXML.Text, JSON and DOM.
//  v0.12  2005/10/14  new sub class: JKL.ParseXML.CSV and CSVmap.
//  v0.13  2005/10/28  bug fixed: TEXT_NODE regexp for white spaces
//  v0.14  2005/11/06  bug fixed: TEXT_NODE regexp at Safari
//  v0.15  2005/11/08  bug fixed: JKL.ParseXML.CSV.async() method
//  v0.16  2005/11/15  new sub class: LoadVars, and UTF-8 text on Safari
//  v0.18  2005/11/16  improve: UTF-8 text file on Safari
//  v0.19  2006/02/03  use XMLHTTPRequest instead of ActiveX on IE7,iCab
//  v0.20  2006/03/22  (skipped)
//  v0.21  2006/11/30  use ActiveX again on IE7
//  v0.22  2007/01/04  JKL.ParseXML.JSON.parseResponse() updated
// ================================================================

if ( typeof(JKL) == 'undefined' ) JKL = function() {};

// ================================================================
//  class: JKL.ParseXML

JKL.ParseXML = function ( url, query, method ) {
    // debug.print( "new JKL.ParseXML( '"+url+"', '"+query+"', '"+method+"' );" );
    this.http = new JKL.ParseXML.HTTP( url, query, method, false );
    this.data = null;
    return this;
};

// ================================================================
//  class variables

JKL.ParseXML.VERSION = "0.22";
JKL.ParseXML.MIME_TYPE_XML  = "text/xml";
JKL.ParseXML.MAP_NODETYPE = [
    "",
    "ELEMENT_NODE",                 // 1
    "ATTRIBUTE_NODE",               // 2
    "TEXT_NODE",                    // 3
    "CDATA_SECTION_NODE",           // 4
    "ENTITY_REFERENCE_NODE",        // 5
    "ENTITY_NODE",                  // 6
    "PROCESSING_INSTRUCTION_NODE",  // 7
    "COMMENT_NODE",                 // 8
    "DOCUMENT_NODE",                // 9
    "DOCUMENT_TYPE_NODE",           // 10
    "DOCUMENT_FRAGMENT_NODE",       // 11
    "NOTATION_NODE"                 // 12
];

// ================================================================
//  define callback function (ajax)

JKL.ParseXML.prototype.async = function ( func, args ) {
    this.callback_func = func;      // callback function
    this.callback_arg  = args;      // first argument
};

JKL.ParseXML.prototype.onerror = function ( func, args ) {
    this.onerror_func = func;       // callback function
};

// ================================================================
//  method: parse()
//  return: parsed object
//  Download a file from remote server and parse it.

JKL.ParseXML.prototype.parse = function () {
    if ( ! this.http ) return;

    // set onerror call back
    if ( this.onerror_func ) {
        this.http.onerror( this.onerror_func );
    }

    if ( this.callback_func ) {                             // async mode
        var copy = this;
        var proc = function() {
            if ( ! copy.http ) return;
            var data = copy.parseResponse();
		  this.data = data;
	contact_entries = this.data;
            copy.callback_func( data, copy.callback_arg );  // call back
        };
        this.http.async( proc );
    }

    this.http.load();


    if ( ! this.callback_func ) {                           // sync mode
        var data = this.parseResponse();
	   this.data = data;
        return data;
    }
};

// ================================================================
//  every child/children into array
JKL.ParseXML.prototype.setOutputArrayAll = function () {
    this.setOutputArray( true );
}
//  a child into scalar, children into array
JKL.ParseXML.prototype.setOutputArrayAuto = function () {
    this.setOutputArray( null );
}
//  every child/children into scalar (first sibiling only)
JKL.ParseXML.prototype.setOutputArrayNever = function () {
    this.setOutputArray( false );
}
//  specified child/children into array, other child/children into scalar
JKL.ParseXML.prototype.setOutputArrayElements = function ( list ) {
    this.setOutputArray( list );
}
//  specify how to treate child/children into scalar/array
JKL.ParseXML.prototype.setOutputArray = function ( mode ) {
    if ( typeof(mode) == "string" ) {
        mode = [ mode ];                // string into array
    }
    if ( mode && typeof(mode) == "object" ) {
        if ( mode.length < 0 ) {
            mode = false;               // false when array == []
        } else {
            var hash = {};
            for( var i=0; i<mode.length; i++ ) {
                hash[mode[i]] = true;
            }
            mode = hash;                // array into hashed array
            if ( mode["*"] ) {
                mode = true;            // true when includes "*"
            }
        }
    }
    this.usearray = mode;
}

// ================================================================
//  method: parseResponse()

JKL.ParseXML.prototype.parseResponse = function () {
    var root = this.http.documentElement();
    var data = this.parseDocument( root );
    this.data = data;
    return data;
}

// ================================================================
//  convert from DOM root node to JavaScript Object
//  method: parseElement( rootElement )

JKL.ParseXML.prototype.parseDocument = function ( root ) {
    // debug.print( "parseDocument: "+root );
    if ( ! root ) return;

    var ret = this.parseElement( root );            // parse root node
    // debug.print( "parsed: "+ret );

    if ( this.usearray == true ) {                  // always into array
        ret = [ ret ];
    } else if ( this.usearray == false ) {          // always into scalar
        //
    } else if ( this.usearray == null ) {           // automatic
        //
    } else if ( this.usearray[root.nodeName] ) {    // specified tag
        ret = [ ret ];
    }

    var json = {};
    json[root.nodeName] = ret;                      // root nodeName
    return json;
};

// ================================================================
//  convert from DOM Element to JavaScript Object
//  method: parseElement( element )

JKL.ParseXML.prototype.parseElement = function ( elem ) {
    // debug.print( "nodeType: "+JKL.ParseXML.MAP_NODETYPE[elem.nodeType]+" <"+elem.nodeName+">" );

    //  COMMENT_NODE

    if ( elem.nodeType == 7 ) {
        return;
    }

    //  TEXT_NODE CDATA_SECTION_NODE

    if ( elem.nodeType == 3 || elem.nodeType == 4 ) {
        // var bool = elem.nodeValue.match( /[^\u0000-\u0020]/ );
        var bool = elem.nodeValue.match( /[^\x00-\x20]/ ); // for Safari
        if ( bool == null ) return;     // ignore white spaces
        // debug.print( "TEXT_NODE: "+elem.nodeValue.length+ " "+bool );
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

// ================================================================
//  method: addNode( hash, key, count, value )

JKL.ParseXML.prototype.addNode = function ( hash, key, cnts, val ) {
    if ( this.usearray == true ) {              // into array
        if ( cnts == 1 ) hash[key] = [];
        hash[key][hash[key].length] = val;      // push
    } else if ( this.usearray == false ) {      // into scalar
        if ( cnts == 1 ) hash[key] = val;       // only 1st sibling
    } else if ( this.usearray == null ) {
        if ( cnts == 1 ) {                      // 1st sibling
            hash[key] = val;
        } else if ( cnts == 2 ) {               // 2nd sibling
            hash[key] = [ hash[key], val ];
        } else {                                // 3rd sibling and more
            hash[key][hash[key].length] = val;
        }
    } else if ( this.usearray[key] ) {
        if ( cnts == 1 ) hash[key] = [];
        hash[key][hash[key].length] = val;      // push
    } else {
        if ( cnts == 1 ) hash[key] = val;       // only 1st sibling
    }
};

// ================================================================
//  class: JKL.ParseXML.Text

JKL.ParseXML.Text = function ( url, query, method ) {
    // debug.print( "new JKL.ParseXML.Text( '"+url+"', '"+query+"', '"+method+"' );" );
    this.http = new JKL.ParseXML.HTTP( url, query, method, true );
    return this;
};

JKL.ParseXML.Text.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.Text.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.Text.prototype.onerror = JKL.ParseXML.prototype.onerror;

JKL.ParseXML.Text.prototype.parseResponse = function () {
    var data = this.http.responseText();
    this.data = data;
    return data;
}

// ================================================================
//  class: JKL.ParseXML.JSON

JKL.ParseXML.JSON = function ( url, query, method ) {
    // debug.print( "new JKL.ParseXML.JSON( '"+url+"', '"+query+"', '"+method+"' );" );
    this.http = new JKL.ParseXML.HTTP( url, query, method, true );
    return this;
};

JKL.ParseXML.JSON.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.JSON.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.JSON.prototype.onerror = JKL.ParseXML.prototype.onerror;

JKL.ParseXML.JSON.prototype.parseResponse = function () {
    var text = this.http.responseText();
    // http://www.antimon2.atnifty.com/2007/01/jklparsexmljson.html
    if ( typeof(text) == 'undefined' ) return;
    if ( ! text.length ) return;
    var data = eval( "("+text+")" );
    this.data = data;
    return data;
}

// ================================================================
//  class: JKL.ParseXML.DOM

JKL.ParseXML.DOM = function ( url, query, method ) {
    // debug.print( "new JKL.ParseXML.DOM( '"+url+"', '"+query+"', '"+method+"' );" );
    this.http = new JKL.ParseXML.HTTP( url, query, method, false );
    return this;
};

JKL.ParseXML.DOM.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.DOM.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.DOM.prototype.onerror = JKL.ParseXML.prototype.onerror;

JKL.ParseXML.DOM.prototype.parseResponse = function () {
    var data = this.http.documentElement();
    this.data = data;
    return data;
}

// ================================================================
//  class: JKL.ParseXML.CSV

JKL.ParseXML.CSV = function ( url, query, method ) {
    // debug.print( "new JKL.ParseXML.CSV( '"+url+"', '"+query+"', '"+method+"' );" );
    this.http = new JKL.ParseXML.HTTP( url, query, method, true );
    return this;
};

JKL.ParseXML.CSV.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.CSV.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.CSV.prototype.onerror = JKL.ParseXML.prototype.onerror;

JKL.ParseXML.CSV.prototype.parseResponse = function () {
    var text = this.http.responseText();
    var data = this.parseCSV( text );
    this.data = data;
    return data;
}

JKL.ParseXML.CSV.prototype.parseCSV = function ( text ) {
    text = text.replace( /\r\n?/g, "\n" );              // new line character
    var pos = 0;
    var len = text.length;
    var table = [];
    while( pos<len ) {
        var line = [];
        while( pos<len ) {
            if ( text.charAt(pos) == '"' ) {            // "..." quoted column
                var nextquote = text.indexOf( '"', pos+1 );
                while ( nextquote<len && nextquote > -1 ) {
                    if ( text.charAt(nextquote+1) != '"' ) {
                        break;                          // end of column
                    }
                    nextquote = text.indexOf( '"', nextquote+2 );
                }
                if ( nextquote < 0 ) {
                    // unclosed quote
                } else if ( text.charAt(nextquote+1) == "," ) { // end of column
                    var quoted = text.substr( pos+1, nextquote-pos-1 );
                    quoted = quoted.replace(/""/g,'"');
                    line[line.length] = quoted;
                    pos = nextquote+2;
                    continue;
                } else if ( text.charAt(nextquote+1) == "\n" || // end of line
                            len==nextquote+1 ) {                // end of file
                    var quoted = text.substr( pos+1, nextquote-pos-1 );
                    quoted = quoted.replace(/""/g,'"');
                    line[line.length] = quoted;
                    pos = nextquote+2;
                    break;
                } else {
                    // invalid column
                }
            }
            var nextcomma = text.indexOf( ",", pos );
            var nextnline = text.indexOf( "\n", pos );
            if ( nextnline < 0 ) nextnline = len;
            if ( nextcomma > -1 && nextcomma < nextnline ) {
                line[line.length] = text.substr( pos, nextcomma-pos );
                pos = nextcomma+1;
            } else {                                    // end of line
                line[line.length] = text.substr( pos, nextnline-pos );
                pos = nextnline+1;
                break;
            }
        }
        if ( line.length >= 0 ) {
            table[table.length] = line;                 // push line
        }
    }
    if ( table.length < 0 ) return;                     // null data
    return table;
};

// ================================================================
//  class: JKL.ParseXML.CSVmap

JKL.ParseXML.CSVmap = function ( url, query, method ) {
    // debug.print( "new JKL.ParseXML.CSVmap( '"+url+"', '"+query+"', '"+method+"' );" );
    this.http = new JKL.ParseXML.HTTP( url, query, method, true );
    this.data = null;
    return this;
};

JKL.ParseXML.CSVmap.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.CSVmap.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.CSVmap.prototype.onerror = JKL.ParseXML.prototype.onerror;
JKL.ParseXML.CSVmap.prototype.parseCSV = JKL.ParseXML.CSV.prototype.parseCSV;

JKL.ParseXML.CSVmap.prototype.parseResponse = function () {
    var text = this.http.responseText();
    var source = this.parseCSV( text );
    if ( ! source ) return;
    if ( source.length < 0 ) return;

    var title = source.shift();                 // first line as title
    var data = [];
    for( var i=0; i<source.length; i++ ) {
        var hash = {};
        for( var j=0; j<title.length && j<source[i].length; j++ ) {
            hash[title[j].replace(/-/, "")] = source[i][j];      // array to map
        }
        data[data.length] = hash;               // push line
    }
    this.data = data;
    return data;
}

// ================================================================
//  class: JKL.ParseXML.LoadVars

JKL.ParseXML.LoadVars = function ( url, query, method ) {
    // debug.print( "new JKL.ParseXML.LoadVars( '"+url+"', '"+query+"', '"+method+"' );" );
    this.http = new JKL.ParseXML.HTTP( url, query, method, true );
    return this;
};

JKL.ParseXML.LoadVars.prototype.parse = JKL.ParseXML.prototype.parse;
JKL.ParseXML.LoadVars.prototype.async = JKL.ParseXML.prototype.async;
JKL.ParseXML.LoadVars.prototype.onerror = JKL.ParseXML.prototype.onerror;

JKL.ParseXML.LoadVars.prototype.parseResponse = function () {
    var text = this.http.responseText();
    text = text.replace( /\r\n?/g, "\n" );              // new line character
    var hash = {};
    var list = text.split( "&" );
    for( var i=0; i<list.length; i++ ) {
        var eq = list[i].indexOf( "=" );
        if ( eq > -1 ) {
            var key = decodeURIComponent(list[i].substr(0,eq).replace("+","%20"));
            var val = decodeURIComponent(list[i].substr(eq+1).replace("+","%20"));
            hash[key] = val;
        } else {
            hash[list[i]] = "";
        }
    }
    this.data = hash;
    return hash;
};

// ================================================================
//  class: JKL.ParseXML.HTTP
//  constructer: new JKL.ParseXML.HTTP()

JKL.ParseXML.HTTP = function( url, query, method, textmode ) {
    // debug.print( "new JKL.ParseXML.HTTP( '"+url+"', '"+query+"', '"+method+"', '"+textmode+"' );" );
    this.url = url;
    if ( typeof(query) == "string" ) {
        this.query = query;
    } else {
        this.query = "";
    }
    if ( method ) {
        this.method = method;
    } else if ( typeof(query) == "string" ) {
        this.method = "POST";
    } else {
        this.method = "GET";
    }
    this.textmode = textmode ? true : false;
    this.req = null;
    this.xmldom_flag = false;
    this.onerror_func  = null;
    this.callback_func = null;
    this.already_done = null;
    return this;
};

// ================================================================
//  class variables

JKL.ParseXML.HTTP.REQUEST_TYPE  = "application/x-www-form-urlencoded";
JKL.ParseXML.HTTP.ACTIVEX_XMLDOM  = "Microsoft.XMLDOM";  // Msxml2.DOMDocument.5.0
JKL.ParseXML.HTTP.ACTIVEX_XMLHTTP = "Microsoft.XMLHTTP"; // Msxml2.XMLHTTP.3.0
JKL.ParseXML.HTTP.EPOCH_TIMESTAMP = "Thu, 01 Jun 1970 00:00:00 GMT"

// ================================================================

JKL.ParseXML.HTTP.prototype.onerror = JKL.ParseXML.prototype.onerror;
JKL.ParseXML.HTTP.prototype.async = function( func ) {
    this.async_func = func;
}

// ================================================================
//  [IE+IXMLDOMElement]
//      XML     text/xml            OK
//      XML     application/rdf+xml OK
//      TEXT    text/plain          NG
//      TEXT    others              NG
//  [IE+IXMLHttpRequest]
//      XML     text/xml            OK
//      XML     application/rdf+xml NG
//      TEXT    text/plain          OK
//      TEXT    others              OK
//  [Firefox+XMLHttpRequest]
//      XML     text/xml            OK
//      XML     application/rdf+xml OK (overrideMimeType)
//      TEXT    text/plain          OK
//      TEXT    others              OK (overrideMimeType)
//  [Opera+XMLHttpRequest]
//      XML     text/xml            OK
//      XML     application/rdf+xml OK
//      TEXT    text/plain          OK
//      TEXT    others              OK
// ================================================================

JKL.ParseXML.HTTP.prototype.load = function() {
	copy = this;
	copy.already_done = false;                // not parsed yet
	this.req = new GM_xmlhttpRequest({
		method: 'GET',
		url: this.url,
		onload: function (response) {
			copy.req = response;
			copy.async_func();
		}
	});
	return;

/*    // create XMLHttpRequest object
    if ( window.ActiveXObject ) {                           // IE5.5,6,7
        var activex = JKL.ParseXML.HTTP.ACTIVEX_XMLHTTP;    // IXMLHttpRequest
        if ( this.method == "GET" && ! this.textmode ) {
            // use IXMLDOMElement to accept any mime types
            // because overrideMimeType() is not available on IE6
            activex = JKL.ParseXML.HTTP.ACTIVEX_XMLDOM;     // IXMLDOMElement
        }
        // debug.print( "new ActiveXObject( '"+activex+"' )" );
        this.req = new ActiveXObject( activex );
    } else if ( window.XMLHttpRequest ) {                   // Firefox, Opera, iCab
        // debug.print( "new XMLHttpRequest()" );
        this.req = new XMLHttpRequest();
    }
    // async mode when call back function is specified
    var async_flag = this.async_func ? true : false;
    alert(async_flag);
    // debug.print( "async: "+ async_flag );

    // open for XMLHTTPRequest (not for IXMLDOMElement)
    if ( typeof(this.req.send) != "undefined" ) {
        // debug.print( "open( '"+this.method+"', '"+this.url+"', "+async_flag+" );" );
        this.req.open( this.method, this.url, async_flag );
    }

//  // If-Modified-Since: Thu, 01 Jun 1970 00:00:00 GMT
//  if ( typeof(this.req.setRequestHeader) != "undefined" ) {
//      // debug.print( "If-Modified-Since"+JKL.ParseXML.HTTP.EPOCH_TIMESTAMP );
//      this.req.setRequestHeader( "If-Modified-Since", JKL.ParseXML.HTTP.EPOCH_TIMESTAMP );
//  }

    // Content-Type: application/x-www-form-urlencoded (request header)
    // Some server does not accept without request content-type.
    if ( typeof(this.req.setRequestHeader) != "undefined" ) {
        // debug.print( "Content-Type: "+JKL.ParseXML.HTTP.REQUEST_TYPE+" (request)" );
        this.req.setRequestHeader( "Content-Type", JKL.ParseXML.HTTP.REQUEST_TYPE );
    }

    // Content-Type: text/xml (response header)
    // FireFox does not accept other mime types like application/rdf+xml etc.
    if ( typeof(this.req.overrideMimeType) != "undefined" && ! this.textmode ) {
        // debug.print( "Content-Type: "+JKL.ParseXML.MIME_TYPE_XML+" (response)" );
        this.req.overrideMimeType( JKL.ParseXML.MIME_TYPE_XML );
    }

    // set call back handler when async mode
    if ( async_flag ) {
        var copy = this;
        copy.already_done = false;                  // not parsed yet
        var check_func = function () {
            if ( copy.req.readyState != 4 ) return;
            // debug.print( "readyState(async): "+copy.req.readyState );
            var succeed = copy.checkResponse();
            // debug.print( "checkResponse(async): "+succeed );
            if ( ! succeed ) return;                // failed
            if ( copy.already_done ) return;        // parse only once
            copy.already_done = true;               // already parsed
            copy.async_func();                      // call back async
        };
        this.req.onreadystatechange = check_func;
        // for document.implementation.createDocument
        // this.req.onload = check_func;
    }

    // send the request and query string
    if ( typeof(this.req.send) != "undefined" ) {
        // debug.print( "XMLHTTPRequest: send( '"+this.query+"' );" );
        this.req.send( this.query );                        // XMLHTTPRequest
    } else if ( typeof(this.req.load) != "undefined" ) {
        // debug.print( "IXMLDOMElement: load( '"+this.url+"' );" );
        this.req.async = async_flag;
        this.req.load( this.url );                          // IXMLDOMElement
    }

    // just return when async mode
    if ( async_flag ) return;

    var succeed = this.checkResponse();
    // debug.print( "checkResponse(sync): "+succeed );
*/
}

// ================================================================
//  method: checkResponse()

JKL.ParseXML.HTTP.prototype.checkResponse = function() {
    // parseError on IXMLDOMElement
    if ( this.req.parseError && this.req.parseError.errorCode != 0 ) {
        // debug.print( "parseError: "+this.req.parseError.reason );
        if ( this.onerror_func ) this.onerror_func( this.req.parseError.reason );
        return false;                       // failed
    }

    // HTTP response code
    if ( this.req.status-0 > 0 &&
         this.req.status != 200 &&          // OK
         this.req.status != 206 &&          // Partial Content
         this.req.status != 304 ) {         // Not Modified
        // debug.print( "status: "+this.req.status );
        if ( this.onerror_func ) this.onerror_func( this.req.status );
        return false;                       // failed
    }

    return true;                            // succeed
}

// ================================================================
//  method: documentElement()
//  return: XML DOM in response body

JKL.ParseXML.HTTP.prototype.documentElement = function() {
    // debug.print( "documentElement: "+this.req );
    if ( ! this.req ) return;
    if ( this.req.responseXML ) {
        return this.req.responseXML.documentElement;    // XMLHTTPRequest
    } else {
        return this.req.documentElement;                // IXMLDOMDocument
    }
}

// ================================================================
//  method: responseText()
//  return: text string in response body

JKL.ParseXML.HTTP.prototype.responseText = function() {
    // debug.print( "responseText: "+this.req );
    if ( ! this.req ) return;

    //  Safari and Konqueror cannot understand the encoding of text files.
    if ( navigator.appVersion.match( "KHTML" ) ) {
        var esc = escape( this.req.responseText );
//        debug.print( "escape: "+esc );
        if ( ! esc.match("%u") && esc.match("%") ) {
            return decodeURIComponent(esc);
        }
    }

    return this.req.responseText;
}

// ================================================================
//  http://msdn.microsoft.com/library/en-us/xmlsdk/html/d051f7c5-e882-42e8-a5b6-d1ce67af275c.asp
// ================================================================



































/**
 *  author:		Timothy Groves - http://www.brandspankingnew.net
 *	version:	1.2 - 2006-11-17
 *              1.3 - 2006-12-04
 *              2.0 - 2007-02-07
 *              2.1.1 - 2007-04-13
 *              2.1.2 - 2007-07-07
 *              2.1.3 - 2007-07-19
 *
 */


if (typeof(bsn) == "undefined")
	_b = bsn = {};


if (typeof(_b.Autosuggest) == "undefined")
	_b.Autosuggest = {};
else
	alert("Autosuggest is already set!");












_b.AutoSuggest = function (id, param)
{
	// no DOM - give up!
	//
	if (!document.getElementById)
		return 0;
	
	
	
	
	// get field via DOM
	//
	this.fld = _b.DOM.gE(id);

	if (!this.fld)
		return 0;
	
	
	
	
	// init variables
	//
	this.sInp 	= "";
	this.nInpC 	= 0;
	this.aSug 	= [];
	this.iHigh 	= 0;
	
	
	

	// parameters object
	//
	this.oP = param ? param : {};

	// defaults	
	//
	var k, def = {minchars:1, meth:"get", varname:"input", className:"autosuggest", timeout:2500, delay:500, offsety:-5, shownoresults: true, noresults: "No results!", maxheight: 250, cache: true, maxentries: 25};
	for (k in def)
	{
		if (typeof(this.oP[k]) != typeof(def[k]))
			this.oP[k] = def[k];
	}
	
	
	// set keyup handler for field
	// and prevent autocomplete from client
	//
	var p = this;

	// NOTE: not using addEventListener because UpArrow fired twice in Safari
	this.fld.addEventListener( 'keypress', function(ev){ return p.onKeyPress(ev); }, true );
	this.fld.addEventListener( 'keyup', function(ev){ return p.onKeyUp(ev); }, true );

	//this.fld.onkeypress 	= function(ev){ return p.onKeyPress(ev); };
	//this.fld.onkeyup 		= function(ev){ return p.onKeyUp(ev); };

	this.fld.setAttribute("autocomplete","off");
};
















_b.AutoSuggest.prototype.onKeyPress = function(ev)
{
	var key = (window.event) ? window.event.keyCode : ev.keyCode;



	// set responses to keydown events in the field
	// this allows the user to use the arrow keys to scroll through the results
	// ESCAPE clears the list
	// TAB sets the current highlighted value
	//
	var RETURN = 13;
	var TAB = 9;
	var ESC = 27;

	var bubble = 1;

	switch(key)
	{
		case RETURN:
			this.setHighlightedValue();
			bubble = 0;
			break;

		case ESC:
			this.clearSuggestions();
			break;
	}
	if (!bubble) ev.preventDefault();
	return bubble;
};



_b.AutoSuggest.prototype.onKeyUp = function(ev)
{
	var key = (window.event) ? window.event.keyCode : ev.keyCode;



	// set responses to keydown events in the field
	// this allows the user to use the arrow keys to scroll through the results
	// ESCAPE clears the list
	// TAB sets the current highlighted value
	//

	var ARRUP = 38;
	var ARRDN = 40;

	var bubble = 1;

	switch(key)
	{


		case ARRUP:
			this.changeHighlight(key);
			bubble = 0;
			break;


		case ARRDN:
			this.changeHighlight(key);
			bubble = 0;
			break;


		default:
			this.getSuggestions(this.fld.value);
	}

   	if (!bubble) ev.preventDefault();
	return bubble;


};








_b.AutoSuggest.prototype.getSuggestions = function (val)
{
	
	// if input stays the same, do nothing
	//
	if (val == this.sInp)
		return 0;
	
	
	// kill list
	//
	_b.DOM.remE(this.idAs);
	
	
	this.sInp = val;

	
	// input length is less than the min required to trigger a request
	// do nothing
	//
	if (val.length < this.oP.minchars)
	{
		this.aSug = [];
		this.nInpC = val.length;
		return 0;
	}

	
	
	
	var ol = this.nInpC; // old length
	this.nInpC = val.length ? val.length : 0;
	
	
	
	// if caching enabled, and user is typing (ie. length of input is increasing)
	// filter results out of aSuggestions from last request
	//
	var l = this.aSug.length;
	if (this.nInpC > ol && l && l<this.oP.maxentries && this.oP.cache)
	{
		var arr = [];
		for (var i=0;i<l;i++)
		{
			if (this.aSug[i].value.substr(0,val.length).toLowerCase() == val.toLowerCase())
				arr.push( this.aSug[i] );
		}
		this.aSug = arr;

		this.createList(this.aSug);
		
		
		
		return false;
	}
	else
	// do new request
	//
	{
		var pointer = this;
		var input = this.sInp;
		clearTimeout(this.ajID);
		this.ajID = setTimeout( function() { pointer.doAjaxRequest(input) }, this.oP.delay );
	}

	return false;
};





_b.AutoSuggest.prototype.doAjaxRequest = function (input)
{
	// check that saved input is still the value of the field
	//
	if (input != this.fld.value)
		return false;


        // only look at the text after the last comma
        var comma = -1;
        while ( input.indexOf(",", comma) >= 0 || input.indexOf(";", comma) >= 0 ) {
                comma = (input.indexOf(",", comma) > input.indexOf(";", comma))? input.indexOf(",", comma) + 1 : input.indexOf(";", comma) + 1;
        }
        if ( comma >= 0 ) input = input.substring(comma);
        // trim
        input = input.replace(/^\s*([\S\s]*?)\s*$/, '$1');


	var pointer = this;

	this.aSug = [];
	var j;
	for (j = 0; j < my_email.length; j++) {
		this.aSug.push(  { 'id': j, 'value':my_email[j], 'info':'Me' }  );
	}

	for (var i=0;i<contact_entries.length;i++)
	{
		var name_l = contact_entries[i].Name.toLowerCase();
		var email_l = contact_entries[i].Email.toLowerCase();
		var name = contact_entries[i].Name;
		var email = contact_entries[i].Email;
		var search = input.toLowerCase();
		if (name_l.indexOf(search) == 0 || email_l.indexOf(search) == 0 || name_l.indexOf(' ' + search) != -1 || email_l.indexOf(' ' + search) != -1)
			this.aSug.push(  { 'id':i+j, 'value':email, 'info':name }  );
	}
	this.idAs = "as_"+this.fld.id;

	this.createList(this.aSug);


/*
	// create ajax request
	//
	if (typeof(this.oP.script) == "function")
		var url = this.oP.script(encodeURIComponent(this.sInp));
	else        `
		var url = this.oP.script+this.oP.varname+"="+encodeURIComponent(this.sInp);

	if (!url)
		return false;

	var meth = this.oP.meth;
	var input = this.sInp;

	var onSuccessFunc = function (req) { pointer.setSuggestions(req, input) };
	var onErrorFunc = function (status) { alert("AJAX error: "+status); };

	var myAjax = new _b.Ajax();
	myAjax.makeRequest( url, meth, onSuccessFunc, onErrorFunc );
*/
};





_b.AutoSuggest.prototype.setSuggestions = function (req, input)
{
	// if field input no longer matches what was passed to the request
	// don't show the suggestions
	//
	if (input != this.fld.value)
		return false;


	this.aSug = [];


	if (this.oP.json)
	{
		var jsondata = eval('(' + req.responseText + ')');

		for (var i=0;i<jsondata.results.length;i++)
		{
			this.aSug.push(  { 'id':jsondata.results[i].id, 'value':jsondata.results[i].value, 'info':jsondata.results[i].info }  );
		}
	}
	else
	{

		var xml = req.responseXML;
	
		// traverse xml
		//
		var results = xml.getElementsByTagName('results')[0].childNodes;

		for (var i=0;i<results.length;i++)
		{
			if (results[i].hasChildNodes())
				this.aSug.push(  { 'id':results[i].getAttribute('id'), 'value':results[i].childNodes[0].nodeValue, 'info':results[i].getAttribute('info') }  );
		}
	
	}
	
	this.idAs = "as_"+this.fld.id;


	this.createList(this.aSug);

};














_b.AutoSuggest.prototype.createList = function(arr)
{
	var pointer = this;
	
	
	

	// get rid of old list
	// and clear the list removal timeout
	//
	_b.DOM.remE(this.idAs);
	this.killTimeout();
	
	
	// if no results, and shownoresults is false, do nothing
	//
	if (arr.length == 0 && !this.oP.shownoresults)
		return false;


	// create holding div
	//
	var div = _b.DOM.cE("div", {id:this.idAs, className:this.oP.className});

	var hcorner = _b.DOM.cE("div", {className:"as_corner"});
	var hbar = _b.DOM.cE("div", {className:"as_bar"});
	var header = _b.DOM.cE("div", {className:"as_header"});
	header.appendChild(hcorner);
	header.appendChild(hbar);
	div.appendChild(header);




	// create and populate ul
	//
	var ul = _b.DOM.cE("ul", {id:"as_ul"});

		var input = this.sInp;
	        var comma = -1;
	        while ( input.indexOf(",", comma) >= 0 || input.indexOf(";", comma) >= 0 ) {
	                comma = (input.indexOf(",", comma) > input.indexOf(";", comma))? input.indexOf(",", comma) + 1 : input.indexOf(";", comma) + 1;
	        }
                if ( comma >= 0 ) input = input.substring(comma);
        input = input.replace(/^\s*([\S\s]*?)\s*$/, '$1');
		var myRe = new RegExp ("^(" + input + ")(.*)", "i");
		var myRe2 = new RegExp ("^(.*)( " + input + ")(.*)", "gi");

	// loop throught arr of suggestions
	// creating an LI element for each suggestion
	//
	for (var i=0;i<arr.length&&i<7;i++)
	{
		// format output with the input enclosed in a EM element
		// (as HTML, not DOM)
		//
		var output = "";

		if (arr[i].info != "")
		{
			//var val = arr[i].info;
			//var st = val.toLowerCase().indexOf( this.sInp.toLowerCase() );
			//var output = val.substring(0,st) + "<em>" + val.substring(st, st+this.sInp.length) + "</em>" + val.substring(st+this.sInp.length);

			var for_output = arr[i].info;
			for_output = for_output.replace(myRe, "<em>$1</em>$2");
			for_output = for_output.replace(myRe2, "$1<em>$2</em>$3");
			var output = for_output;
		}


		var span 		= _b.DOM.cE("span", {}, output, true);

		if (arr[i].info != "")
		{
			var br			= _b.DOM.cE("br", {});
			span.appendChild(br);
		}

		var for_small_output = arr[i].value
		for_small_output = for_small_output.replace(myRe, "<em>$1</em>$2");
		for_small_output = for_small_output.replace(myRe2, "$1<em>$2</em>$3");

		var small		= _b.DOM.cE("small", {}, '');
		small.innerHTML = for_small_output;
		span.appendChild(small);

		var a 			= _b.DOM.cE("a", { href:"#" });
		
		var tl 		= _b.DOM.cE("span", {className:"tl"}, " ");
		var tr 		= _b.DOM.cE("span", {className:"tr"}, " ");
		a.appendChild(tl);
		a.appendChild(tr);
		
		a.appendChild(span);
		
		a.name = i+1;
		//a.onclick = function () { pointer.setHighlightedValue(); return false; };
		//a.onmouseover = function () { pointer.setHighlight(this.name); };
		a.addEventListener( 'click', function(){ pointer.setHighlightedValue(); return false; }, false );
		a.addEventListener( 'mouseover', function(){ pointer.setHighlight(this.name) }, false );

		var li = _b.DOM.cE(  "li", {}, a  );
		
		ul.appendChild( li );
	}
	
	
	// no results
	//
	if (arr.length == 0 && this.oP.shownoresults)
	{
		var li = _b.DOM.cE(  "li", {className:"as_warning"}, this.oP.noresults  );
		ul.appendChild( li );
	}
	
	
	div.appendChild( ul );
	
	
	var fcorner = _b.DOM.cE("div", {className:"as_corner"});
	var fbar = _b.DOM.cE("div", {className:"as_bar"});
	var footer = _b.DOM.cE("div", {className:"as_footer"});
	footer.appendChild(fcorner);
	footer.appendChild(fbar);
	div.appendChild(footer);
	
	
	
	// get position of target textfield
	// position holding div below it
	// set width of holding div to width of field
	//
	var pos = _b.DOM.getPos(this.fld);
	
	div.style.left 		= pos.x + "px";
	div.style.top 		= ( pos.y + this.fld.offsetHeight + this.oP.offsety ) + "px";
	div.style.width 	= this.fld.offsetWidth + "px";
	
	
	
	// set mouseover functions for div
	// when mouse pointer leaves div, set a timeout to remove the list after an interval
	// when mouse enters div, kill the timeout so the list won't be removed
	//
	//div.onmouseover 	= function(){ pointer.killTimeout() };
	//div.onmouseout 		= function(){ pointer.resetTimeout() };
	div.addEventListener( 'mouseover', function(){ pointer.killTimeout() }, false );
	div.addEventListener( 'mouseout', function(){ pointer.resetTimeout() }, false );


	// add DIV to document
	//
	document.getElementsByTagName("body")[0].appendChild(div);
	
	
	
	// currently no item is highlighted
	//
	this.iHigh = 0;
	
	
	
	
	
	
	// remove list after an interval
	//
	var pointer = this;
	this.toID = setTimeout(function () { pointer.clearSuggestions() }, this.oP.timeout);
};















_b.AutoSuggest.prototype.changeHighlight = function(key)
{	
	var list = _b.DOM.gE("as_ul");
	if (!list)
		return false;
	
	var n;

	if (key == 40)
		n = this.iHigh + 1;
	else if (key == 38)
		n = this.iHigh - 1;
	
	
	if (n > list.childNodes.length)
		n = list.childNodes.length;
	if (n < 1)
		n = 1;
	
	
	this.setHighlight(n);
};



_b.AutoSuggest.prototype.setHighlight = function(n)
{
	var list = _b.DOM.gE("as_ul");
	if (!list)
		return false;
	
	if (this.iHigh > 0)
		this.clearHighlight();
	
	this.iHigh = Number(n);
	
	list.childNodes[this.iHigh-1].className = "as_highlight";


	this.killTimeout();
};


_b.AutoSuggest.prototype.clearHighlight = function()
{
	var list = _b.DOM.gE("as_ul");
	if (!list)
		return false;

	if (this.iHigh > 0)
	{
		list.childNodes[this.iHigh-1].className = "";
		this.iHigh = 0;
	}
};


_b.AutoSuggest.prototype.setHighlightedValue = function ()
{
	if (this.iHigh)
	{
                // get the text up until the last comma
                var input = this.fld.value
	        var comma = -1;
	        while ( input.indexOf(",", comma) >= 0 || input.indexOf(";", comma) >= 0 ) {
	                comma = (input.indexOf(",", comma) > input.indexOf(";", comma))? input.indexOf(",", comma) + 1 : input.indexOf(";", comma) + 1;
	        }
                if ( comma >= 0 ) input = input.substring(0,comma) + " ";
                else input = "";
		this.sInp = this.fld.value = input + this.aSug[ this.iHigh-1 ].value;
		
		// move cursor to end of input (safari)
		//
		this.fld.focus();
		if (this.fld.selectionStart)
			this.fld.setSelectionRange(this.sInp.length, this.sInp.length);
		

		this.clearSuggestions();
		
		// pass selected object to callback function, if exists
		//
		if (typeof(this.oP.callback) == "function")
			this.oP.callback( this.aSug[this.iHigh-1] );
	}
};













_b.AutoSuggest.prototype.killTimeout = function()
{
	clearTimeout(this.toID);
};

_b.AutoSuggest.prototype.resetTimeout = function()
{
	clearTimeout(this.toID);
	var pointer = this;
	this.toID = setTimeout(function () { pointer.clearSuggestions() }, seconds_to_hide * 1000);
};







_b.AutoSuggest.prototype.clearSuggestions = function ()
{
	
	this.killTimeout();
	
	var ele = _b.DOM.gE(this.idAs);
	var pointer = this;
	if (ele)
	{
		var fade = new _b.Fader(ele,1,0,250,function () { _b.DOM.remE(pointer.idAs) });
	}
};










// AJAX PROTOTYPE _____________________________________________


if (typeof(_b.Ajax) == "undefined")
	_b.Ajax = {};



_b.Ajax = function ()
{
	this.req = {};
	this.isIE = false;
};



_b.Ajax.prototype.makeRequest = function (url, meth, onComp, onErr)
{

	if (meth != "POST")
		meth = "GET";
	
	this.onComplete = onComp;
	this.onError = onErr;
	
	var pointer = this;
	
	// branch for native XMLHttpRequest object
	if (window.XMLHttpRequest)
	{
		this.req = new XMLHttpRequest();
		this.req.onreadystatechange = function () { pointer.processReqChange() };
		this.req.open("GET", url, true); //
		this.req.send(null);
	// branch for IE/Windows ActiveX version
	}
	else if (window.ActiveXObject)
	{
		this.req = new ActiveXObject("Microsoft.XMLHTTP");
		if (this.req)
		{
			this.req.onreadystatechange = function () { pointer.processReqChange() };
			this.req.open(meth, url, true);
			this.req.send();
		}
	}
};


_b.Ajax.prototype.processReqChange = function()
{
	
	// only if req shows "loaded"
	if (this.req.readyState == 4) {
		// only if "OK"
		if (this.req.status == 200)
		{
			this.onComplete( this.req );
		} else {
			this.onError( this.req.status );
		}
	}
};










// DOM PROTOTYPE _____________________________________________


if (typeof(_b.DOM) == "undefined")
	_b.DOM = {};



/* create element */
_b.DOM.cE = function ( type, attr, cont, html )
{
	var ne = document.createElement( type );
	if (!ne)
		return 0;
		
	for (var a in attr)
		ne[a] = attr[a];

	var t = typeof(cont);

	if (t == "string" && !html)
		ne.appendChild( document.createTextNode(cont) );
	else if (t == "string" && html)
		ne.innerHTML = cont;
	else if (t == "object")
		ne.appendChild( cont );

	return ne;
};



/* get element */
_b.DOM.gE = function ( e )
{
	var t=typeof(e);
	if (t == "undefined")
		return 0;
	else if (t == "string")
	{
		var re = document.getElementById( e );
		if (!re)
			return 0;
		else if (typeof(re.appendChild) != "undefined" )
			return re;
		else
			return 0;
	}
	else if (typeof(e.appendChild) != "undefined")
		return e;
	else
		return 0;
};



/* remove element */
_b.DOM.remE = function ( ele )
{
	var e = this.gE(ele);
	
	if (!e)
		return 0;
	else if (e.parentNode.removeChild(e))
		return true;
	else
		return 0;
};



/* get position */
_b.DOM.getPos = function ( e )
{
	var e = this.gE(e);

	var obj = e;

	var curleft = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curleft += obj.offsetLeft;
			obj = obj.offsetParent;
		}
	}
	else if (obj.x)
		curleft += obj.x;
	
	var obj = e;
	
	var curtop = 0;
	if (obj.offsetParent)
	{
		while (obj.offsetParent)
		{
			curtop += obj.offsetTop;
			obj = obj.offsetParent;
		}
	}
	else if (obj.y)
		curtop += obj.y;

	return {x:curleft, y:curtop};
};










// FADER PROTOTYPE _____________________________________________



if (typeof(_b.Fader) == "undefined")
	_b.Fader = {};





_b.Fader = function (ele, from, to, fadetime, callback)
{	
	if (!ele)
		return 0;
	
	this.e = ele;

	this.from = from;
	this.to = to;
	
	this.cb = callback;
	
	this.nDur = fadetime;
		
	this.nInt = 50;
	this.nTime = 0;
	
	var p = this;
	this.nID = setInterval(function() { p._fade() }, this.nInt);
};




_b.Fader.prototype._fade = function()
{
	this.nTime += this.nInt;
	
	var ieop = Math.round( this._tween(this.nTime, this.from, this.to, this.nDur) * 100 );
	var op = ieop / 100;
	
	if (this.e.filters) // internet explorer
	{
		try
		{
			this.e.filters.item("DXImageTransform.Microsoft.Alpha").opacity = ieop;
		} catch (e) { 
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			this.e.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+ieop+')';
		}
	}
	else // other browsers
	{
		this.e.style.opacity = op;
	}
	
	
	if (this.nTime == this.nDur)
	{
		clearInterval( this.nID );
		if (this.cb != undefined)
			this.cb();
	}
};



_b.Fader.prototype._tween = function(t,b,c,d)
{
	return b + ( (c-b) * (t/d) );
};















































































function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}




var contact_entries = [];
var http;
function go() {

	var inputs = document.getElementsByTagName("input");
	var ids = new Array();
	for (var i = 0; i < inputs.length; i++) {
		type = inputs[i].getAttribute("type");
		name = inputs[i].getAttribute("name") + " " + inputs[i].getAttribute("label");
		if (type == "text" && (/mail/i.test(name) || /to/i.test(name) || (my_email.length > 0 && /from/i.test(name)))) {
			if (inputs[i].getAttribute("id") == null) {
				inputs[i].setAttribute("id", "contacts_" + i);
			}
			ids[ids.length] = inputs[i].getAttribute("id");
		}
	}

	if (ids.length > 0) {
		if (parse_method == 'csv') {
			http = new JKL.ParseXML.CSVmap(contacts_csv_url);
			http.async( function(data) {  } );
			http.parse();
		} else {
			GM_xmlhttpRequest({
			    method: 'GET',
			    url: contacts_xml_url,
			    headers: {
			        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			        'Accept': 'application/atom+xml,application/xml,text/xml',
			    },
			    onload: function(responseDetails) {
			        var parser = new DOMParser();
			        var dom = parser.parseFromString(responseDetails.responseText,
			            "application/xml");
				if (add_gmail) {
					display_email = dom.getElementsByTagName('DisplayEmail')[0].textContent;
					email = dom.getElementsByTagName('Email')[0].textContent;
					if (display_email != 'undefined') {
						found = false;
						for (i in my_email) {
							if (my_email[i] == display_email) {
								found = true;
								break;
							}
						}
						if (!found) my_email.push(display_email);
					}
					if (email != 'undefined') {
						found = false;
						for (i in my_email) {
							if (my_email[i] == email) {
								found = true;
								break;
							}
						}
						if (!found) my_email.push(email);
					}
				}

				xml_objects = dom.getElementsByTagName('Object');
				for (var i = 0; i < xml_objects.length; i++) {
					display_names = xml_objects[i].getElementsByTagName('DisplayName');
					if (display_names.length > 0) {
						xml_addresses = xml_objects[i].getElementsByTagName('Address');
						for (var j = 0; j < xml_addresses.length; j++) {
							contact_entries.push( { Name: display_names[0].textContent, Email: xml_addresses[j].textContent } );
						}
					}
				}
			    }
			});
		}
	}
	var options = {
		json: true,
		cache: false
	};
	for (var j = 0; j < ids.length; j++) {
		var as = new bsn.AutoSuggest(ids[j], options);
	}

	addGlobalStyle('body { position: relative; }');
	addGlobalStyle('div.autosuggest { position: absolute; background-image: url(data:image/gif,GIF89a%14%00%0A%00%80%00%00333%FF%FF%FF!%F9%04%01%07%00%01%00%2C%00%00%00%00%14%00%0A%00%00%02%19%8C%7F%00%C8m%AA%9C%84P2J%ED%C3yr%EC%7C%DF%25%8E%5B9%A2h%01%00%3B); background-position: top; background-repeat: no-repeat; padding: 10px 0 0 0; }');
	addGlobalStyle('div.autosuggest div.as_header, div.autosuggest div.as_footer { position: relative; height: 6px; padding: 0 6px; background-image: url(data:image/gif,GIF89a%06%00%06%00%80%00%00333%FF%FF%FF!%F9%04%00%07%00%FF%00%2C%00%00%00%00%06%00%06%00%00%02%09%04%82a%86%CB~%A0%04%05%00%3B); background-position: top right; background-repeat: no-repeat; overflow: hidden; }');
	addGlobalStyle('div.autosuggest div.as_footer { background-image: url(data:image/gif,GIF89a%06%00%06%00%80%00%00333%FF%FF%FF!%F9%04%00%07%00%FF%00%2C%00%00%00%00%06%00%06%00%00%02%08%84%8Fi%91%7C%E1%20%2C%00%3B); }');
	addGlobalStyle('div.autosuggest div.as_header div.as_corner, div.autosuggest div.as_footer div.as_corner { position: absolute; top: 0; left: 0; height: 6px; width: 6px; background-image: url(data:image/gif,GIF89a%06%00%06%00%80%00%00333%FF%FF%FF!%F9%04%00%07%00%FF%00%2C%00%00%00%00%06%00%06%00%00%02%09%8C%03%60%99%C8%FA%A2L%05%00%3B); background-position: top left; background-repeat: no-repeat; }');
	addGlobalStyle('div.autosuggest div.as_footer div.as_corner { background-image: url(data:image/gif,GIF89a%06%00%06%00%80%00%00333%FF%FF%FF!%F9%04%00%07%00%FF%00%2C%00%00%00%00%06%00%06%00%00%02%08%84%8F%16%B9%18%AD%5E%2B%00%3B); }');
	addGlobalStyle('div.autosuggest div.as_header div.as_bar,div.autosuggest div.as_footer div.as_bar { height: 6px; overflow: hidden; background-color: #333; }');
	addGlobalStyle('div.autosuggest ul { list-style: none; margin: 0 0 -4px 0; padding: 0; overflow: hidden; background-color: #333; }');
	addGlobalStyle('div.autosuggest ul li { color: #ccc; padding: 0; margin: 0 4px 4px; text-align: left; }');
	addGlobalStyle('div.autosuggest ul li a { color: #ccc; display: block; text-decoration: none; background-color: transparent; text-shadow: #000 0px 0px 5px; position: relative; padding: 0; width: 100%; }');
	addGlobalStyle('div.autosuggest ul li a:hover { background-color: #444; }');
	addGlobalStyle('div.autosuggest ul li.as_highlight a:hover { background-color: #1B5CCD; }');
	addGlobalStyle('div.autosuggest ul li a span { display: block; padding: 3px 6px; font-weight: bold; }');
	addGlobalStyle('div.autosuggest ul li a span small { font-weight: normal; color: #999; }');
	addGlobalStyle('div.autosuggest ul li.as_highlight a span small { color: #ccc; }');
	addGlobalStyle('div.autosuggest ul li.as_highlight a { color: #fff; background-color: #1B5CCD; background-image: url(data:image/gif,GIF89a%06%00%06%00%A2%00%00%1B%5C%CD*Bl%20T%B025%3C%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%07%00%04%00%2C%00%00%00%00%06%00%06%00%00%03%0EH%0A%AC%C4%C2%B1%C0%E0%A8b%5C%11%F4H%00%3B); background-position: bottom right; background-repeat: no-repeat; }');
	addGlobalStyle('div.autosuggest ul li.as_highlight a span { background-image: url(data:image/gif,GIF89a%06%00%06%00%A2%00%00%1B%5C%CD*Bl%20T%B025%3C%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%07%00%04%00%2C%00%00%00%00%06%00%06%00%00%03%0E%08J%2C%CB%E1%91%E1%14%18%D4%E2%11%5C%02%00%3B); background-position: bottom left; background-repeat: no-repeat; }');
	addGlobalStyle('div.autosuggest ul li a .tl, div.autosuggest ul li a .tr { background-image: transparent; background-repeat: no-repeat; width: 6px; height: 6px; position: absolute; top: 0; padding: 0; margin: 0; }');
	addGlobalStyle('div.autosuggest ul li a .tr { right: 0; }');
	addGlobalStyle('div.autosuggest ul li.as_highlight a .tl { left: 0; background-image: url(data:image/gif,GIF89a%06%00%06%00%A2%00%00%1B%5C%CD*Bl%20T%B016%3D%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%07%00%04%00%2C%00%00%00%00%06%00%06%00%00%03%0E8%1A%02%DA%C0%C1%18%22%B9%F0%92%08t%02%00%3B); background-position: bottom left; }');
	addGlobalStyle('div.autosuggest ul li.as_highlight a .tr { right: 0; background-image: url(data:image/gif,GIF89a%06%00%06%00%A2%00%00%1B%5C%CD*Bl%20T%B016%3D%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%07%00%04%00%2C%00%00%00%00%06%00%06%00%00%03%0E%08%12%D3%F0%C2%3D5%88%7D%C1%12%A8g%02%00%3B); background-position: bottom right; }');
	addGlobalStyle('div.autosuggest ul li.as_warning { font-weight: bold; text-align: center; }');
	addGlobalStyle('div.autosuggest ul em { font-style: normal; color: #6EADE7; }');

}
window.addEventListener('load', function(e) { go() }, false);




