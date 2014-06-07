// ==UserScript==
// @name				DeviantLinker
// @namespace		AIM:berleberly
// @description	Adds direct-to-content links to DeviantArt galleries.
// @include			http://*.deviantart.com/*
// ==/UserScript==

/* Revision notes:
07039	Started with FADL-07039.  Chopped out great gobs of bullshit.
07040	#1-3 implemented.  Works, I think.  Colors could be improved.
07040 #4-5 added.
*/

// Start time:
var start = new Date();

// Revision date ( date +%y%j ) ######################################## rev ###
var rev = '07137';
// Prev: 07040b

// Put a bit on the page ############################################# put() ###
function put() {
	// 0=goesbefore 1=tag 2=content
	var ourobject = document.createElement( arguments[1] );
	// Add the content to the object
	ourobject.innerHTML = arguments[2] ;
	// Insert the object on the page before goesbefore
	document.body.insertBefore( ourobject, arguments[0] );
	// We'll also return this object so you can easily put something before it.
	return ourobject;
};


// All programs need pointless bloat! ################################ BLOAT ###
var mote = start.getMilliseconds(); // I don't need even pseudo-random.
// I optimized these with The GIMP, trimming off dead space, colormap
// minimization, etc.  (Wish I could do 2 or 3 bpp...)
if ( mote < 750 ) { // 75%
	mote // smile (93B)
		='R0lGODlhDwAPAJEBAAAAAL+/v///AAAAACH5BAEAAAEALAAAAAAPAA8AAAIujA'
		+'2Zx5EC4WIgWnnqvQBJLTyhE4khaG5Wqn4tp4ErFnMY+Sll9naUfGpkFL5DAQA7'
		+"' width='15' height='15' alt='smile'>"
		;
} else if ( mote < 900 ) { // 15%
	mote // laughing (923B, 64% reduction from 2595B)
		='R0lGODlhDwAPAKEAAAAAAJyc/////wAAACH/C05FVFNDQVBFMi4wAwEAAAA'
		+'h+QQFZAADACwAAAAADwAPAAACNpwNmceTAeFiIFp5qtIqAAQIohCOSzKm6W'
		+'a2Yle+q1fRzybV1/7pO+b46T6ISAeY8dEaSUWjAAAh+QQFZAADACwFAAsAA'
		+'QABAAACAkQBACH5BAUKAAMALAEAAwANAAkAAAIeXDKphgarAApvVJskFbx3'
		+'TQHiKB7miTbQGpEi6y4FACH5BAUKAAMALAIABAALAAYAAAIP3IKXhu3qooy'
		+'m2gqy1qMAACH5BAUKAAMALAIAAgALAAcAAAIS3ICXBuH9jpsU0muy3pyhDw'
		+'IFACH5BAUKAAMALAIAAgALAAcAAAISXI5oAc1+wJiSsolzzbzzBB4FACH5B'
		+'AUKAAMALAIAAgALAAcAAAIS3ICXBuH9jpsU0muy3pyhDwIFACH5BAUKAAMA'
		+'LAIAAgALAAcAAAISXI5oAc1+wJiSsolzzbzzBB4FACH5BAUKAAMALAIAAgA'
		+'LAAcAAAIS3ICXBuH9jpsU0muy3pyhDwIFACH5BAUKAAMALAIAAgALAAcAAA'
		+'ISXI5oAc1+wJiSsolzzbzzBB4FACH5BAUKAAMALAIAAgALAAcAAAIS3ICXB'
		+'uH9jpsU0muy3pyhDwIFACH5BAUKAAMALAIAAgALAAcAAAISXI5oAc1+wJiS'
		+'solzzbzzBB4FACH5BAUKAAMALAIAAgALAAcAAAIS3ICXBuH9jpsU0muy3py'
		+'hDwIFACH5BAUKAAMALAIAAgALAAcAAAISXI5oAc1+wJiSsolzzbzzBB4FAC'
		+'H5BAUKAAMALAIAAgALAAcAAAIS3ICXBuH9jpsU0muy3pyhDwIFACH5BAUKA'
		+'AMALAIAAgALAAcAAAISXI5oAc1+wJiSsolzzbzzBB4FACH5BAUKAAMALAIA'
		+'AgALAAcAAAIS3ICXBuH9jpsU0muy3pyhDwIFACH5BAVkAAMALAIAAwALAAM'
		+'AAAIM3ISXhoDixAC0WlAAACH5BAVkAAMALAQABAAGAAEAAAIDhG4FACH5BA'
		+'VkAAMALAQABAAHAAEAAAIDlGBXACH5BAVkAAMALAIAAgALAAUAAAIRXI5oA'
		+'c1+gJiShjFxzq37VgAAIfkEBfQBAwAsAgAIAAsABQAAAgqMjzHLPQkjenIU'
		+'ACH5BAEKAAMALAMABgAJAAYAAAIPlDUnwDDthpwy2HupljAWADs='
		+"' width='15' height='15' alt='laughing'>"
		;
} else if ( mote < 985 ) { // 8.5%
	mote // grinpimp (150B, 2% reduction from 153B)
		='R0lGODlhEQAWAMIAAAAAAP8AAAD/AFn/yP///wAAAAAAAAAAAC'
		+'H5BAEAAAcALAAAAAARABYAAANbeKrQ12BJFiqoIc6Hu92Xh2kS'
		+'ZJqgoK4ruQBs7DxnXYu4Ze8zMAyNH9AHLAF/PmLyJWw6i48hD5'
		+'okEADWq3UZxWq3WyoQTOZ2v1pzdJgNQplSt+tFFM42DNQkAQA7'
		+"' width='17' height='22' alt='grinpimp'>"
		;
} else { // 1.5%
	mote // thefinger (183B, 81% reduction from 986B)
		='R0lGODlhIQAPAMIAAAAAAAAIAFX/zP///wAAAAAAAAAAAAAAACH5BAEKAAQAL'
		+'AAAAAAhAA8AAAN8SLrM8a/JSZ+4N9LdAv4Z13WZV4bO5AWOYHpA5rYsWRMmqN'
		+'+r1CurB2BIHAoAi18yFhjiXINBICqNwghD2C3GPT6nVavV2+U+QciVeH2NgVh'
		+'uDPIbrv7ilzlWnixRLTMKcXqCeS0uEC8MboSFXg45JQ2MEgCWjUCJE5d6CQA7'
		+"' width='33' height='15' alt='thefinger'>"
		;
};
mote=' <img align=bottom src=\'data:image/gif;base64,'+mote;

var lem; // Last placed EleMent. (easier to type than lpe)
// Announce our presence. ####################################### (announce) ###
lem=put( document.body.lastChild.nextSibling, 'div',
	'You\'re using the <i>DeviantLinker</i> GreaseMonkey script by '
	+'<a href="aim:berleberly">berleberly</a>.'
	+mote+'</div>\n');
// Unset mote, 'cause it can be kinda big.
mote='';

// Only work on Gallery pages. ##################################### GO/NOGO ###
// No-go page check.  On a gallery page?
// (Usernames have letters, numbers, hyphen, and must be >=3 chars long.)
if (window.location.href.match(
	/^http:\/\/[a-z0-9-][a-z0-9-][a-z0-9-]+\.deviantart.com\/gallery\/\??(&.+)?$.*/i
	) ) {
// I'm not going to indent everything for this block.
// Apparently Sun didn't want any GOTO in JavaScript.  Fascists.


// Common strings ############################################ ic hida S U D ###
var ic = '3';	// Which icN server to use.
var hida = 'http://ic'+ic+'.deviantart.com/';


// METHod function array!  ########################################## meth[] ###
// Filename format check, breakdown, and construction
// We use an array 'cause it makes for an easy loop, trying each method in turn.
// True, unlike the FADL that spawned this we don't have so damned many, but
// I already have this great infrastructure developed in case it's needed.
// We have to order these carefully- some are more inclusive than others!
// I'm numbering them as I create them, and listing known interactions.
// Unfortunately the weird ordering may not be performance-optimal, but when
// you're running GreaseMonkey you probably expect a little overhead anyways.
// I'll still try to keep the less-common (or just older, really) patterns
// low in the list so it's not too bad.  (The reason for noting collisions.)
// meth[N](URL) will return false if it can't do it, an array if it can.
// [ URL, filename, comment ]
//##############################################################################
//##############################################################################
// Counter: 3
var meth = [
	// #1 fsNN
	// http://tn1-2.d....com/fs12/150/i/2006/301/2/c/NEStalgia_by_jasinski.jpg
	// http://ic1.deviantart.com/fs12/i/2006/301/2/c/NEStalgia_by_jasinski.jpg
	// caps:  fs12/ i/2006/301/2/c/ filename.ext
	function() { return ( arguments[0].match(
		/^http:\/\/tn\d-\d\.deviantart\.com\/(fs\d+\/)\d+\/(.\/\d\d\d\d\/\d+\/.\/.\/)([^\/]+\.(?:jpg|gif|png|jpeg))$/i
		)?[
		hida + RegExp.$1 + RegExp.$2 + RegExp.$3
		,RegExp.$3
		,'#1']:false );
	},
	// #3 just some oddness
	// http://tn1-4.deviantart.com/150/fs7.deviantart.com/i/2005/239/7/0/L....jpg
	// http://ic1.deviantart.com/fs7/i/2005/239/7/0/L_we_all_love_you_by_....jpg
	// fsN /i/.../0/ file.ext
	function() { return ( arguments[0].match(
		/^http:\/\/tn\d-\d.deviantart.com\/\d+\/((?:fs|images)\d)\.deviantart\.com(\/.\/\d\d\d\d\/\d+\/.\/.\/)([^\/]+.(?:jpg|gif|png|jpeg))$/i
		)?[
		hida + RegExp.$1 + RegExp.$2 + RegExp.$3
		,RegExp.$3
		,'#3']:false );
	},
	// #2 older, my sample from 2002.
	// http://tn1-1.deviantart.com/150/i/2002/23/2/a/little_star.jpg
	// http://ic3.deviantart.com/images/i/2002/23/2/a/little_star.jpg
	// i/.../a/ name.ext
	function() { return ( arguments[0].match(
		/^http:\/\/tn\d-\d\.deviantart.com\/\d+\/(.\/\d\d\d\d\/\d+\/.\/.\/)([^\/]+\.(?:jpg|gif|png|jpeg))$/i
		)?[
		hida + 'images/' + RegExp.$1 + RegExp.$2
		,RegExp.$2
		,'#2']:false );
	},
	// #4 an odd flavor
	// http://tn1-4.deviantart.com/150/i/4/f/8/City_Sun_2.jpg
	// http://fc01.deviantart.com/images/i/4/f/8/City_Sun_2.jpg
	// i/...8/ file.ext
	// Fortunately it looks like I can still use icN instead of fc01.  :)
	function() { return ( arguments[0].match(
		/^http:\/\/tn\d-\d\.deviantart.com\/\d+\/(.\/.\/.\/.\/)([^\/]+\.(?:jpg|gif|png|jpeg))$/i
		)?[
		hida + 'images/' + RegExp.$1 + RegExp.$2
		,RegExp.$2
		,'#4']:false );
	},
	// #5 an old flavor?  Very general regex!  Don't move up in list!
	// http://tn1-2.deviantart.com/150/large/indyart/popart/Mike_and_Celeste.jpg
	// http://ic1.deviantart.com/images/large/indyart/popart/Mike_and_Celeste.jpg
	// large/...popart/ name.ext
	function() { return ( arguments[0].match(
		/^http:\/\/tn\d-\d\.deviantart.com\/\d+\/(large\/[^\/]+\/[^\/]+\/)([^\/]+\.(?:jpg|gif|png|jpeg))$/i
		)?[
		hida + 'images/' + RegExp.$1 + RegExp.$2
		,RegExp.$2
		,'#5']:false );
	}
]; // End of meth[]
//##############################################################################
//##############################################################################


// IS THumbnail? ###################################################### isth ###
var isth = /http:\/\/tn[^.]+\.deviantart.com\/.+\./i;


/////////////////////////////////////////////////////////////////////////MAIN///

// Loop thru <img> elements. ################################### (<img>loop) ###
// Image element Array (ea would look like "each", so...)
var ia = document.getElementsByTagName('img');
// Processed Count, Linked Count, and Meth Output.
var pc=0, lc=0, mo;
// The loop proper- we work with each ImageArray[i].
for (var i=0; i < ia.length; i++ ) {
	// Ignore non-thumbnails and non-images.  (And offsite images.)
	if (!isth.exec(ia[i].src)) { continue; };
	// meth[] loop.  ########################################## (meth[] loop) ###
	// j counts off each element in meth.
	for (var j in meth) {
		// The function wants the <img src=URL, and we store/see what it returns
		if ( mo=meth[j](ia[i].src) ) { // We got something, so we can make a link!
			pc++; lc++ // Increment ProcessedCount and LinkedCount
			// Output a link.
			// (I used to use 'a' for second parameter, but then the numbers
			// change color/style with the link when you point at 'em.)
			lem=put(lem.nextSibling,'div',
				(pc<10?'0':'')+pc+': <a href="'+mo[0]+'">'
				+mo[1]+'</a> <font color="#DEDEDE">'+mo[2]+'</font></div>\n');
			break; // Stop running the fadl loop, we can do the next ia.
		}; // FI got something
	}; // DONE
	if (!mo) { // Did we succeed, or shall we note our miserable failure?
		lem=put(lem.nextSibling,'div', (++pc<10?'0':'') + pc +': Failed '
			+ia[i].src +', "'+ ia[i].alt +'"</div>\n');
	}; // FI fail
}; // end ia loop

// Put on the footer. ############################################ (goodbye) ###
// (Lets me know the thing didn't die halfway, reports final numbers.)
put(document.body.lastChild.nextSibling,'div',
	'R'+rev+' - Result: '
	+lc+' link'+(lc==1?'':'s')+', '
	+(j=pc-lc)+' fail'+(j==1?'':'s')+', '
	+(i-pc)+' skipped.'
	+(j?' URL='+window.location.href
	+'<br><a href="aim:berleberly">Send me an IM</a>'
	+' of this output (at least the last two lines) to report this bug!'
	:'')
	+' <font color="#DEDEDE">'+(new Date()-start)+'ms</font>'
	+'</div>\n');

} else { // NOGO: #################################################### NOGO: ###
	put(document.body.lastChild.nextSibling, 'div',
	'R'+rev+" - Page URL doesn't match regexp- no action taken."
	+' <font color="#DEDEDE">'+(new Date()-start)+'ms</font>'
	+'</div>\n');
};

///// ///// ///////////////////////////////////////////////////////////////////////////////// berleberly                                                vim:ts=3
