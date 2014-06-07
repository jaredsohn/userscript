// GCal Event Color Codes
// This scripts allows you to activate and alternate set of color codes
// for events in your Google Calendars. Define a category name starting with !
// and give the colors you want for the background and border of the event.
// The color coding is enabled and disabled by clicking on the little calendar icon
// added to the corner of the main calendar frame. Any questions can be directed to
// mjeffryes+userscripts@gmail.com. Enjoy!
// ==UserScript==
// @name        GCal Event Color Codes
// @namespace   http://www.hmc.edu/~mjeffryes
// @description Color codes GCal events using tags
// @include     http://www.google.tld/calendar/*
// @include     https://www.google.tld/calendar/*
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////////////////
//load a new ColorCoder object on start 
window.addEventListener("load", function() { unsafeWindow.gccc = new GCalColorCoder(); }, false);

//////////////////////////////////////////////////////////////////////////////////////////
// Tag class
function Tag( string )
{
 	if( string && (string[0] != ';') ) //name must have a value
 		this.loadFromString( string );
}

Tag.prototype = {
	name: "none",
	bg_color: "rgb(0,0,0)",
	fg_color: "rgb(0,0,0)",
	keywords: [ ],
	regexp: /.*/i,
	
	loadFromString: function( string )
	{
		[this.name, this.fg_color, this.bg_color, keywordstr] = string.split(';');
		if( this.name != "none" )
		{
			this.keywords = keywordstr.split(',').filter( function(e,i,a){ return e; } );
			this.regexp = new RegExp( this.keywords.concat( this.name ).join( '|' ), 'i' );
		}
	},
	
	toString: function()
	{
		return [this.name, this.fg_color, this.bg_color, this.keywords ].join(';');
	},
	
	style: function()
	{
		return 'dl#' + this.name + '.cbrd { ' +
			'border-color: ' + this.fg_color + ' !important; ' +
			'background-color: ' + this.bg_color + ' !important; } ' +
			'dl#' + this.name + '.cbrd dt, div#' + this.name + '.rb-n' +
			' { background-color: ' + this.fg_color + ' !important; } ' +
			'div#' + this.name + '.te { color: ' + this.fg_color + ' !important; }';
	},
	
	button: function( index )
	{
		'<div id="' + this.name + '" class="rb-n" onclick="gccc.show_form(\'' + index + '\')"' +
		' style="padding: 2px; margin: 3px; background-color: #AAAAAA;"></div>'
		tag_div = document.createElement( 'div' );
		tag_div.setAttribute( 'id', this.name );
		tag_div.setAttribute( 'class', 'rb-n' );
		tag_div.setAttribute( 'style', 'padding: 2px; margin: 3px; background-color: #AAAAAA;' );
		tag_div.setAttribute( 'onclick', 'gccc.show_form("' + index + '")' );
		tag_div.innerHTML = this.name;
		return tag_div;
	},
	
	detail: function( index )
	{
		return '<input id="index" type="hidden" value="' + index + '">' +
			'Tag: <input id="name" type="text" value="' + this.name + '">' +
			'Border Color: <input id="fg_color" type="text" value="' + this.fg_color + '">' +
			'Background Color: <input id="bg_color" type="text" value="' + this.bg_color + '">' +
			'Keywords: <input id="keywords" type="text" value="' + this.keywords + '">' 
	},
	
	form_style: function()
	{	
		return "border: 1px solid "+this.fg_color+"; background-color: "+this.bg_color+";" + 
			"color: #FFFFFF; width: 160px;  padding: 3px; z-index: 1; ";
	},
};

///////////////////////////////////////////////////////////////////////////////////////////
//GCalColorCoder class

function GCalColorCoder()
{
	this.buttons = new Object();
	//register toggles
	this.tag_prefix = (makeMenuToggle("tag_sym",true,"Use '!'","Use '#'","Tag prefix"))?'!':'#';
	this.on = {'color': makeMenuToggle("color",true,"GCCC Colors","Default Colors","On Page Load"),
				'sum' : makeMenuToggle("sum",true,"Sums Off","Sums On","On Page Load")};
	this.tag_regexp = new RegExp( this.tag_prefix + "[a-z]+");
	//initialize event tags
	//this.tags.map( function(tag,i,tags){ tags[tag.name] = tag } );
	this.load_tags();
	this.xsearch = document.createExpression(
		'//dl[@class="cbrd" and not(@id)] | //div[contains(@class,"ca-evp") and (contains(@class,"rb-n") or contains(@class,"te")) and not(@id)]'
		, null);
	document.body.addEventListener("DOMSubtreeModified", function(){unsafeWindow.gccc.tagNodes();}, false);  
	//Add stylesheet and UI elements
	this.style = addGlobalStyle( this.tags.map( function(tag,i,a){ return tag.style(); } ).join(' ') );
	this.insert(single_xpath('//div[@class="nb_0"]'));
	//sync
	this.update();
}

GCalColorCoder.prototype = {
	name: "gccc",
	
	icons:
	{
		'color': { true: "images/icon_success.gif", false: "images/icon_r_no.gif"},
		'sum'  : { true: "images/opentriangle.gif", false: "images/triangle.gif"},
	},
		
	// sync page state with object state
	update: function()
	{
		body_div = single_xpath( "//div//div[@id='lhscalinner_"+this.name+"']" );
		body_div.style.display = ( this.on['sum'] ? "inherit" : "none" );
		this.style.disabled = !this.on['color'];
		this.tagNodes(); 
	},
	
	// search for events that don't have an id field and set it to the right tag
	tagNodes: function()
	{
		xresult = this.xsearch.evaluate( document, XPathResult.ANY_UNORDERED_NODE_TYPE, null );
		if( node = xresult.singleNodeValue )
		{
			node.setAttribute( 'id', this.matchTag( node.textContent ) );
		}
	},
	
	matchTag: function( text )
	{
		if( match = this.tag_regexp.exec( text ) )
			text = String( match ).substring( 1 );
		return this.tags.filter( function(tag,i,a){ return tag.regexp.exec( text ); } )[0].name;
	},
	
	//toggle color codes on and off
	toggle: function( btnid )
	{
		mbool = this.on[btnid] = !this.on[btnid];
		this.buttons[btnid].childNodes[1].src = this.icons[btnid][this.on[btnid]];
		window.setTimeout( function(){ GM_setValue( btnid, mbool ) } , 0 );
		this.update();
	},
	
	show_form: function(index)
	{
		if( !index ) { index = this.tags.length - 1; }
		this.form.innerHTML =  '<form>' + this.tags[index].detail(index) + '</form>';
		btn1 = document.createElement('button');
		btn2 = document.createElement('button');
		btn1.innerHTML="save";
		btn2.innerHTML="cancel";
		btn1.setAttribute('onclick', this.name + '.save_form()');
		btn2.setAttribute('onclick', this.name + '.hide_form()');
		this.form.appendChild(btn1);
		this.form.appendChild(btn2);
		this.insertlink(this.form, "delete", this.name+'.form.children[0].elements[1].value = "";'+this.name+'.save_form();' );
		this.div.appendChild(this.form);
		[absx,absy] = findPos(this.div);
		this.form.setAttribute( 'style', this.tags[index].form_style() + ' display: inherit; ' + 
			'position: absolute; left: ' + (absx+120) + 'px; top: ' + absy + 'px;'  );
	},

	hide_form: function()
	{
		this.form.setAttribute('style', 'display: none;');
	},
	
	save_form: function()
	{
		elems = Array.map( this.form.children[0].elements, function(e,i,a){ return e.value } );
		this.replace_tag( elems.shift(), new Tag(elems.join(';')) );
		this.save_tags();
		this.repop_sidebar();
		this.update_style();
		this.form.setAttribute('style', 'display: none;');
	},
	
	replace_tag: function( old_index, new_tag )
	{
		replace = this.tags[old_index].name != "none"; //don't replace none tag
	    if( new_tag.name == "none" ){ 
			this.tags.splice( old_index, replace );
		} else {
			this.tags.splice( old_index, replace, new_tag );
		}
	},
	
	save_tags: function()
	{
		window.setTimeout( function() { GM_setValue( "tags", unsafeWindow.gccc.tags.join('!') ); }, 0 );
	},
	
	load_tags: function()
	{
		this.tags = GM_getValue( "tags", "" ).split( '!' ).map( function(e,i,a){ return new Tag(e); } );
	},
	
	repop_sidebar: function()
	{
		this.div.children[2].children[0].innerHTML = "";
		this.insertlist(this.div.children[2].children[0]);
	},
	
	update_style: function()
	{
		this.style = addGlobalStyle( this.tags.map( function(tag,i,a){ return tag.style(); } ).join(' '), this.style );
	},
	
	//insert the visual elements
	insert: function( loc )
	{
		//clone model
		this.div = loc.cloneNode( true );
		loc.parentNode.insertBefore( this.div, loc );
		this.div.innerHTML = this.div.innerHTML.replace( /id="([a-zA-Z]*)_my/g, 'id="$1_'+this.name );
		
		this.title    = this.div.children[1];
		this.body     = this.div.children[2].children[0];
		this.footer   = this.div.children[2].children[1];
		this.form = document.createElement('div');
		//clear copied data
		[this.title, this.body, this.footer.children[0], this.footer.children[1]].map( function(e,a,i){ e.innerHTML=""; } );
		//construct our data
		this.insertbutton( this.title, 'sum', '' );
		this.insertbutton( this.title, 'color', 'Color Codes:' );
		this.insertlist( this.body );
		this.insertlink( this.footer.children[1], 'new tag', this.name+ '.show_form()' );

	},

	//insert a toggle button
	insertbutton: function( loc, btnid, label )
	{
		this.buttons[btnid] = document.createElement( 'span' );
		this.buttons[btnid].innerHTML=label+' <img src="' + this.icons[btnid][this.on[btnid]] + '"/>';
		this.buttons[btnid].setAttribute( 'onclick', this.name+'.toggle(\''+btnid+'\')' );
		loc.appendChild( this.buttons[btnid] );
	},
	 	
	//insert a toggle button
	insertlist: function( loc )
	{
		this.tags.map( function(tag,index,a){ loc.appendChild( tag.button(index) ) } );
	},
	
	//insert a link button
	insertlink: function( loc, label, onclick )
	{
		link = document.createElement( 'span' );
		link.setAttribute( 'class', 'lk' );
		link.innerHTML = label;
		link.setAttribute( 'onclick', onclick );
		loc.appendChild( link );
	},

};

//////////////////////////////////////////////////////////////////////////////////////////
//Helper code for adding global css rules (http://diveintogreasemonkey.org/patterns/add-css.html)
function addGlobalStyle( css, style )
{
    head = document.getElementsByTagName( 'head' )[0];
    if ( !head ) { return; }
    if( !style )
    {
    	style = document.createElement( 'style' );
    	style.type = 'text/css';
    }
    style.innerHTML = css;
    head.appendChild( style );
    return style;
}

//////////////////////////////////////////////////////////////////////////////////////////
//Helper code snippit for adding menu toggle items (http://wiki.greasespot.net/Code_snippets)
function makeMenuToggle( key, defaultValue, toggleOn, toggleOff, prefix )
{
	// Add menu toggle and return value
	GM_registerMenuCommand( ( prefix ? prefix+": " : "" ) + ( window[key] ? toggleOff : toggleOn ),
  		function() { GM_setValue( key, !window[key] ); } );
	return GM_getValue( key, defaultValue );
}
////////////////////////////////////////////////////////////////////////////////////////////////////
//XPath Helpers
function xpath( query )
{
	return document.evaluate( query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
}
function single_xpath( query )
{
	return xpath( query ).snapshotItem( 0 );
} 
////////////////////////////////////////////////////////////////////////////////////////////////////
//Get abs position of an element
function findPos(obj)
{
	var curleft = curtop = 0;
	do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	return [curleft,curtop];
}
