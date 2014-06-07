// ==UserScript==
// @name           Blogger free-form date field
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Adds a free form-date text field after the date selectors, where you may type or paste a timestamp, rather than madly clicking about the date and time selectors. Present version understands Y-M-D h:m, D M Y h:m, M/D/Y h:m and some partial variants, "today" and "yesterday", though only 24 hour time. (Month names and common short forms are handled in English, French and Swedish.) <p> As a side feature, this script also allows you to enter blog or diary entries from years not listed in the year drop-down (in case you would want to publish your pre-1990 writing or posts far into the future).
// @include        http://www.blogger.com/post-create.g?blogID=*
// @include        http://www.blogger.com/post-edit.g?blogID=*
// ==/UserScript==

var changedColor = '#F0FFF0';
var form = document.forms.namedItem( 'stuffform' );
if(!form) return;
var postYear = form.elements.namedItem( 'postYear' );
var postAMPM = form.elements.namedItem( 'postAMPM' );
var lastDate, timer, inited = false;
var maxWidth = location.pathname.match( /create/ ) ? 144 : 120;

// date parsing tests, in order of preference (first matching entry wins)
// Patterns are actually regexps, where Year, Month, Day, Hour and Minute
// are substituted for match groups matching such an entity, and used for
// the appropriate unit of time in the datetime parsing routine. If you
// must use match groups of your own, make sure they start with ?: or
// they will mess up the parsing logic. "month" only matches month names.
var tests = ['Year-Month-Day,? *Hour:Minute', // most specific / unmistakeable
	     'Day +month?,? *\'?Year?,? *Hour:Minute',
	     'month? *Day,? *\'?Year?,? *Hour:Minute',
	     'Month/Day/Year,? +Hour:Minute',
	     'Year-Month-Day',
	     'Day +month,? *\'?Year?',
	     'month +Day,? *\'?Year?',
	     'Month/Day/Year',
	     'Hour:Minute'];  // least specific, when all above formats failed

// feel free to add month names in lots of languages here; these now cover
// English, Swedish and French, and pair up with the month number as shown
var months = { jan:1,january:1,januari:1,janvier:1,
	       feb:2,february:2,februari:2,'février':2,fevrier:2,
	       mar:3,march:3,mars:3,
	       apr:4,april:4,avril:4,
	       may:5,maj:5,mai:5,
	       jun:6,june:6,juni:6,juin:6,
	       jul:7,july:7,juli:7,juillet:7,
	       aug:8,august:8,augusti:8,'août':8,aout:8,
	       sep:9,september:9,septembre:9,
	       oct:10,october:10,okt:10,oktober:10,octobre:10,
	       nov:11,november:11,novembre:11,
	       dec:12,december:12,'décembre':12,decembre:12 };

// ditto relative date references; these will get resolved to ISO Y-M-D dates,
// before applying the match rules in the tests list above
var symbolic = { today:date(), 'aujourd\'?hui':date(), idag:date(),
		 yesterday:date(-1), hier:date(-1), 'ig\xE5r':date(-1) };

EventMgr = // avoid leaking event handlers
{
  _registry:null,
  initialize:function() {
    if(this._registry == null) {
      this._registry = [];
      EventMgr.add(window, "_unload", this.cleanup);
    }
  },
  add:function(obj, type, fn, useCapture) {
    this.initialize();
    if(typeof obj == "string")
      obj = document.getElementById(obj);
    if(obj == null || fn == null)
      return false;
    if(type=="unload") {
      // call later when cleanup is called. don't hook up
      this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
      return true;
    }
    var realType = type=="_unload"?"unload":type;
    obj.addEventListener(realType, fn, useCapture);
    this._registry.push({obj:obj, type:type, fn:fn, useCapture:useCapture});
    return true;
  },
  cleanup:function() {
    for(var i = 0; i < EventMgr._registry.length; i++) {
      with(EventMgr._registry[i]) {
        if(type=="unload")
	  fn();
        else {
	  if(type=="_unload") type = "unload";
	  obj.removeEventListener(type,fn,useCapture);
        }
      }
    }
    EventMgr._registry = null;
  }
};

function date( add )
{
  var day = new Date();
  if( add )
    day = new Date( day.getTime() + add*864e5 );
  var y = day.getFullYear(), m = day.getMonth(), d = day.getDate();
  return [y, m+1, d].join('-');
}

function resetFieldBackgrounds( )
{
  var i, f, fields = 'Hour,Minute,AMPM,Month,Day,Year'.split( ',' );
  for( var i=0; i<fields.length; i++ )
  {
    f = form.elements.namedItem( 'post'+fields[i] );
    f.style.background = '#FFFFFF';
    if( !inited )
      EventMgr.add( f, 'change', resetFieldBackgrounds, false );
  }
}

function trigDateListener( event )
{
  var widget = event.target;
  if( widget.value == 'enter date/time here' )
    widget.value = '';
  if( timer ) clearTimeout( timer );
  timer = setTimeout( function(){ readFreeFormDate( widget ); }, 50 );
}

function readFreeFormDate( widget, reallyAddYear )
{
  timer = null;
  var plain = widget.value;
  if( !reallyAddYear && lastDate && (lastDate == plain) )
    return 0; // unchanged
  lastDate = plain;
  for( var alias in symbolic )
    plain = plain.replace( new RegExp( alias, 'i' ), symbolic[alias] );
  //if( reallyAddYear )alert( 'Yep.' );

  var match = { Year   : '((?:\\d||[1-9]\\d{2})\\d\\b)', // 2/4-figure number
		Day    : '((?:[ 0]?[1-9]|[12]\\d|3[01])\\b)',	 // (0?)1..31
		Hour   : '([ 01]?\\d|2[0-3])',			 // (0?)0..23
		Minute : '([0-5]?\\d)' };			 // (0?)0..59
  var i, month = [];
  for( i in months )
    month.push( i );
  match.Month = '([ 0]?[1-9]|1[0-2]|' + month.join('|') + ')';// name/(0?1)..12
  match.month = '(' + month.join('|') + ')';                  // only the names

  // reset field backgrounds to "unaffected mode"
  resetFieldBackgrounds( widget.form );

  for( i=0; i<tests.length; i++ )
  {
    var matched = [];
    var re = tests[i].replace( /(Year|[mM]onth|Day|Hour|Minute)/g,
			       function( what )
    {
      matched.push( what );
      return match[what];
    });
    re = new RegExp( re, 'i' );
    if( re = re.exec( plain ) )
    {
      //alert( 'Matched '+i+': '+matched.join(' ')+'\n['+re.join(']\n[')+']' );
      var j, field, form = widget.form, name, value, index, asNum, ampm, year;
      for( j=0; j<matched.length; j++ )
      {
	if( !(value = re[j+1]) ) continue;
	value = value.toLowerCase();
	//alert( matched[j] +' ['+ value +'] (length '+ value.length +')' );
	asNum = parseInt( value, 10 );
	switch( name = matched[j] )
	{
	  case 'Year':
	    if( value.length <= 2 )
	    {
	      year = (new Date).getFullYear() + 1;
	      var century = Math.floor( year / 100 );
	      year %= 100;
	      if( asNum > year )
		asNum += --century * 100;
	      else
		asNum += century * 100;
	    }

	    var last = postYear.options.length - 1;
	    var min = parseInt( postYear.options[0].value );
	    var max = parseInt( postYear.options[last].value );
	    if( (asNum < min) || (asNum > max) )
	    {
	      if( !reallyAddYear ) // add a five-second grace delay before we
	      {			   // assume an out-of-bounds year *is* a year
		//alert( 'Really '+matched.join(' ')+'? ['+re.join('/')+']' );
		setTimeout( function(){ readFreeFormDate(widget,1);}, 5e3 );
		continue;
	      }
	      if( asNum < min )
		year = min - 1;
	      else
		year = max + 1;
	      while( (year < min && year >= asNum) ||
		     (year > max && year <= asNum) )
	      {
		var option = postYear.ownerDocument.createElement( 'option' );
		option.setAttribute( 'value', year+'' );
		option.innerHTML = year+'';
		if( year < min )
		{
		  postYear.insertBefore( option, postYear.firstChild );
		  min = year--;
		}
		else
		{
		  postYear.appendChild( option );
		  year++;
		}
	      }
	    }
	    index = asNum - min;
	    break;

	  case 'month':
	  case 'Month':
	    index = (months[value] || asNum) - 1;
	    name = 'Month';
	    break;

	  default:
	  case 'Day':
	    index = asNum - 1;
	    break;

	  case 'Hour':
	    ampm = 0;
	    if( asNum > 11 )
	    {
	      ampm = 1;
	      asNum -= 12;
	    }
	    postAMPM.selectedIndex = ampm;
	    postAMPM.style.background = changedColor;
	    index = (asNum || 12) - 1;
	    break;

	  case 'Minute':
	    index = asNum; // only widget where index 0 does map to 0
	    break;
	}
	field = form.elements.namedItem( 'post'+name );
	field.selectedIndex = index;
	field.style.background = changedColor;
      }
      break; // fields updated from our date; don't try any other formats
    }
  }
}

var dateField = document.createElement( 'input' );
dateField.setAttribute( 'type', 'text' );
dateField.setAttribute( 'maxwidth', maxWidth+'' );
dateField.setAttribute( 'value', 'enter date/time here' );
dateField.setAttribute( 'style', 'position:relative; left:4px;' );
postYear.parentNode.insertBefore( dateField, postYear.nextSibling );
EventMgr.add( dateField, 'focus', trigDateListener, false );
EventMgr.add( dateField, 'keyup', trigDateListener, false );
EventMgr.add( dateField, 'change', trigDateListener, false );
EventMgr.add( dateField, 'keydown', trigDateListener, false );
