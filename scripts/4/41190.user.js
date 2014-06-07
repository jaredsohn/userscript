// ==UserScript==
// @name          Realtor Monkey Canada
// @namespace     http://code.google.com/p/realtormonkey
// @description   Track Prices On realtor.ca
// @include       http://www.realtor.ca/propertyDetails*
// ==/UserScript==


function init()
{
    initGears();
    initDB();

    mls = parse_MLS();
    price = parse_price();
    //alert(mls);
    //alert(price);

    now = new Date();
    timestamp = now.getTime();

    listing = listing_retrieve( mls );
    if ( listing ) {
	listing_add_price( mls, price );
    }
    else {
	listing_create( mls );
	listing_add_price( mls, price );
    }    

    price_history = listing_price_history( mls );

    price_history_string = "\n";
    for (  index in price_history ) {
	price_history_string = price_history_string + sprintf( "timestamp: %s, price: %s\n", price_history[index].timestamp, price_history[index].price );
    }
    var err = new Error(); 
    err.name = "Listing Price History"; 
    err.message = price_history_string;
    throw(err); 

}


function parse_MLS()
{
    td = document.getElementById( 'CONTENT' );
    content = td.innerHTML;
    re = /MLS.\: (\w+) /;
    matches = re.exec(content);
    mls = matches[1];
    return mls;
}

function parse_price()
{
    td = document.getElementById( 'CONTENT' );
    content = td.innerHTML;
    re = /For Sale\: \$(\d+\,?\d+)/;
    matches = re.exec(content);
    price = matches[1];
    price = price.replace( /\,/, '');
    return price;
}

// Correct gears init code
var server = null;
var store = null;
function initGears() {
    if (!unsafeWindow.google) unsafeWindow.google= {};
    if (!unsafeWindow.google.gears){
	try {
	    unsafeWindow.google.gears = {};
	    unsafeWindow.google.gears.factory = unsafeWindow.GearsFactory();
	} catch(e) {
	    alert("Problem in initializing Gears: " + e.message)
		}
	if (!unsafeWindow.google.gears){
	    unsafeWindow.google.gears= {factory: new GearsFactory()};
	}
    }
}

function initDB()
{
    try {
	server = unsafeWindow.google.gears.factory.create('beta.localserver' );
	store = server.createStore("realtormonkeycanada");
	db = unsafeWindow.google.gears.factory.create('beta.database' );
	if (db) {
		db.open('realtormonkeycanada');
		create_listing_stmt = 'create table if not exists listings ' +
		    '( listing_id INTEGER PRIMARY KEY AUTOINCREMENT' + 
		    ', MLS varchar(16)' + 
		    ', URL varchar(255)' +
		    ', property_id INTEGER' +
		    ', added_timestamp INTEGER ' +
		    ')';

		create_price_stmt = 'create table if not exists prices (' + 
		    '  prices_id INTEGER PRIMARY KEY AUTOINCREMENT ' + 
		    ', listing_id INTEGER ' + 
		    ', price INTEGER ' + 
		    ', timestamp INTEGER' + 
		    ')';
		db.execute( create_listing_stmt );
		db.execute( create_price_stmt );
	}
    } catch(e) {
	alert( e.message );
    }

}

function listing_create( mls ) {
    try {
	server = unsafeWindow.google.gears.factory.create('beta.localserver' );
	store = server.createStore("realtormonkeycanada");
	db = unsafeWindow.google.gears.factory.create('beta.database' );
	if (db) {
	    db.open('realtormonkeycanada');
	    now = new Date();
	    
	    insert_stmt = sprintf( 'insert into listings ( MLS, added_timestamp ) values ( \'%s\', %s )', 
				   mls, now.getTime() );
	    db.execute(insert_stmt);
	}

    } catch(e) {
	alert( e.message );
    }
}

function listing_retrieve( mls ) {

    listings = [];
    try {
	server = unsafeWindow.google.gears.factory.create('beta.localserver' );
	store = server.createStore("realtormonkeycanada");
	db = unsafeWindow.google.gears.factory.create('beta.database' );
	if (db) {
	    db.open('realtormonkeycanada');
	    select_stmt = sprintf( 'select * from listings where mls = \'%s\'', mls );
	    
	    rs = db.execute( select_stmt );
	    while ( rs.isValidRow() ) {
		listing = {};
		listing['listing_id'] = rs.fieldByName( 'listing_id' );
		listing['mls'] = rs.fieldByName( 'MLS' );
		listing['added_timestamp'] = rs.fieldByName( 'added_timestamp' );
		listings.push( listing );
		rs.next();
	    }
	}
    }
    catch( e ) { 
	alert( e.message );
    }

    return listings.pop();
}

function listing_add_price( mls, price ) 
{
    listing = listing_retrieve( mls );
    if( listing && listing.listing_id )	{
	now = new Date();
	timestamp = now.getTime();
	price_data = { 'timestamp':timestamp, 'price':price, 'MLS':mls, 'listing_id':listing.listing_id };
	price_add( price_data );
    }
    else {
	alert( 'listing:'  + listing );
    }

}


function price_add( price_data )
{
    try {
	server = unsafeWindow.google.gears.factory.create('beta.localserver' );
	store = server.createStore("realtormonkeycanada");
	db = unsafeWindow.google.gears.factory.create('beta.database' );
	db.open('realtormonkeycanada');
	insert_statement = sprintf( 'insert into prices ( listing_id, price, timestamp ) values ( %s, %s, %s )', 
				    price_data.listing_id, price_data.price, price_data.timestamp );
	db.execute( insert_statement );
    }
    catch( e ) { 
	alert( e.message );
    }

}
function triggerAllowDialog(){
    unsafeWindow.addEventListener("load",
			    function(){
				new GearsFactory().create('beta.localserver', '1.0');
				location.href = location.href;
				return false;
			    }, true);
}

function listing_price_history( mls ) {

    price_history = [];
    try {
	server = unsafeWindow.google.gears.factory.create('beta.localserver' );
	store = server.createStore("realtormonkeycanada");
	db = unsafeWindow.google.gears.factory.create('beta.database' );
	if (db) {
	    db.open('realtormonkeycanada');
	    select_stmt = sprintf( 'select p.price, p.timestamp from listings l, prices p where l.mls = \'%s\' and l.listing_id = p.listing_id order by p.timestamp', mls );
	    rs = db.execute( select_stmt );
	    last_price = 0;
	    while ( rs.isValidRow() ) {
		if ( rs.fieldByName( 'price' ) != last_price ) {
		    price = rs.fieldByName( 'price' );
		    timestamp = rs.fieldByName( 'timestamp' );
		    new_price = { 'price' : price, 'timestamp' : timestamp };
		    price_history.push( new_price );
		    last_price = price;
		}
		rs.next();
	    }
	}
    }
    catch( e ) { 
	alert( e.message );
    }

    return price_history;

}

window.addEventListener("load", function(e) {
	init();
    }, false);

function sprintf( ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // + namespaced by: Michael White (http://getsprink.com)
    // +    tweaked by: Jack
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Paulo Ricardo F. Santos
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: sprintf("%01.2f", 123.1);
    // *     returns 1: 123.10
    // *     example 2: sprintf("[%10s]", 'monkey');
    // *     returns 2: '[    monkey]'
    // *     example 3: sprintf("[%'#10s]", 'monkey');
    // *     returns 3: '[####monkey]'
 
    var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuidfegEG])/g;
    var a = arguments, i = 0, format = a[i++];
 
    // pad()
    var pad = function(str, len, chr, leftJustify) {
        if (!chr) chr = ' ';
        var padding = (str.length >= len) ? '' : Array(1 + len - str.length >>> 0).join(chr);
        return leftJustify ? str + padding : padding + str;
    };
 
    // justify()
    var justify = function(value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
        var diff = minWidth - value.length;
        if (diff > 0) {
            if (leftJustify || !zeroPad) {
                value = pad(value, minWidth, customPadChar, leftJustify);
            } else {
                value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
            }
        }
        return value;
    };
 
    // formatBaseX()
    var formatBaseX = function(value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
        // Note: casts negative numbers to positive ones
        var number = value >>> 0;
        prefix = prefix && number && {'2': '0b', '8': '0', '16': '0x'}[base] || '';
        value = prefix + pad(number.toString(base), precision || 0, '0', false);
        return justify(value, prefix, leftJustify, minWidth, zeroPad);
    };
 
    // formatString()
    var formatString = function(value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
        if (precision != null) {
            value = value.slice(0, precision);
        }
        return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
    };
 
    // finalFormat()
    var doFormat = function(substring, valueIndex, flags, minWidth, _, precision, type) {
        if (substring == '%%') return '%';
 
        // parse flags
        var leftJustify = false, positivePrefix = '', zeroPad = false, prefixBaseX = false, customPadChar = ' ';
        var flagsl = flags.length;
        for (var j = 0; flags && j < flagsl; j++) switch (flags.charAt(j)) {
            case ' ': positivePrefix = ' '; break;
            case '+': positivePrefix = '+'; break;
            case '-': leftJustify = true; break;
            case "'": customPadChar = flags.charAt(j+1); break;
            case '0': zeroPad = true; break;
            case '#': prefixBaseX = true; break;
	    }
 
        // parameters may be null, undefined, empty-string or real valued
        // we want to ignore null, undefined and empty-string values
        if (!minWidth) {
            minWidth = 0;
        } else if (minWidth == '*') {
            minWidth = +a[i++];
        } else if (minWidth.charAt(0) == '*') {
            minWidth = +a[minWidth.slice(1, -1)];
        } else {
            minWidth = +minWidth;
        }
 
        // Note: undocumented perl feature:
        if (minWidth < 0) {
            minWidth = -minWidth;
            leftJustify = true;
        }
 
        if (!isFinite(minWidth)) {
            throw new Error('sprintf: (minimum-)width must be finite');
        }
 
        if (!precision) {
            precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type == 'd') ? 0 : void(0);
        } else if (precision == '*') {
            precision = +a[i++];
        } else if (precision.charAt(0) == '*') {
            precision = +a[precision.slice(1, -1)];
        } else {
            precision = +precision;
        }
 
	// grab value using valueIndex if required?
        var value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];
	switch (type) {
	case 's': return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
	case 'c': return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
	case 'b': return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
	case 'o': return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
	case 'x': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
	case 'X': return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad).toUpperCase();
	case 'u': return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
	case 'i':
	case 'd': {
	    var number = parseInt(+value);
	    var prefix = number < 0 ? '-' : positivePrefix;
	    value = prefix + pad(String(Math.abs(number)), precision, '0', false);
	    return justify(value, prefix, leftJustify, minWidth, zeroPad);
	}
	case 'e':
	case 'E':
	case 'f':
	case 'F':
	case 'g':
	case 'G': {
	    var number = +value;
	    var prefix = number < 0 ? '-' : positivePrefix;
	    var method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
	    var textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
	    value = prefix + Math.abs(number)[method](precision);
	    return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
	}
	default: return substring;
        }
    };
 
    return format.replace(regex, doFormat);
}
