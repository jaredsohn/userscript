// ==UserScript==
// @name          IPAc-en
// @namespace     *
// @description   converts all incidents of {{pron-en}} to {{IPAc-en}}
// @include       http://en.wikipedia.org/*action=edit*
// @include				http://en.wikipedia.org/w/*action=submit*
// @include				https://secure.wikimedia.org/*action=edit*
// ==/UserScript==

Array.prototype.find = function(searchStr) {
  var returnArray = false;
  for (i=0; i<this.length; i++) {
    if (typeof(searchStr) == 'function') {
      if (searchStr.test(this[i])) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    } else {
      if (this[i]===searchStr) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    }
  }
  return returnArray;
}

////////////////////////////
// string_edit
// example:
//
// 	 var editHTML = new string_edit(document.body.innerHTML);
//
//   editHTML.cut(0, '<h2', INCLUDE_END);
//   editHTML.add(']', '">', REPLACE);
//
//   $(document).ready(function() {
//	   document.body.innerHTML = editHTML.finish();
//   });
//
//------
// function: cut
//  start  : the position to start the cut, may be a number or string/regex (search for position)
// 	end    : the position to end the cut, may be a number (# of characters after the last character of start) or string/regex (search after the last character of start)
// 	return : the removed section of string (includes start, excludes end); characters up to the beginning of start are moved to newHTML
// 	         if start or end are invalid or not found then return false; if SAVE_START && DELETE_START or INCLUDE_END && DELETE_END then return false
//
// flags:
// 	DELETE_UPTO  : characters up to the beginning of start are deleted
// 	SAVE_START   : characters in start are moved to newHTML instead of included in cut
// 	DELETE_START : characters in start are deleted
// 	INCLUDE_END  : characters in end are included in the cut
// 	DELETE_END   : characters in end are deleted
//
// note: regex 'global' flag is not supported
//
//------
// function: add
//  insert   : the string to insert
// 	position : the position to insert the string (before this position), may be a number or string/regex
// 	return   : the position that the string was inserted; if the position wasn't found then return false
//
// flags:
// 	DELETE_UPTO : characters up to the beginning of position are deleted
// 	REPLACE     : characters in position are deleted
// 	AFTER       : string is insterted after position
//
// note: regex 'global' flag is not supported


const DELETE_UPTO  = 0x1;

const SAVE_START   = 0x2;
const DELETE_START = 0x4;
const INCLUDE_END  = 0x8;
const DELETE_END   = 0x10;

const REPLACE      = 0x2;
const AFTER        = 0x4;

function string_edit(originalstring)
{
	this.originalHTML = originalstring;
	this.newHTML = '';

	////////////////////////////
	// function: cut
	//  start  : the position to start the cut, may be a number or string/regex (search for position)
	// 	end    : the position to end the cut, may be a number (# of characters after the last character of start) or string/regex (search after the last character of start)
	// 	return : the removed section of string (includes start, excludes end); characters up to the beginning of start are moved to newHTML
	// 	         if start or end are invalid or not found then return false; if SAVE_START && DELETE_START or INCLUDE_END && DELETE_END then return false
	//
	// flags:
	// 	DELETE_UPTO  : characters up to the beginning of start are deleted
	// 	SAVE_START   : characters in start are moved to newHTML instead of included in the cut
	// 	DELETE_START : characters in start are deleted
	// 	INCLUDE_END  : characters in end are included in the cut
	// 	DELETE_END   : characters in end are deleted
	//
	// note: regex 'global' flag is not supported

	this.cut = function (start, end, flags)
	{
		// check flags
		if ( ((flags & SAVE_START) && (flags & DELETE_START)) || ((flags & INCLUDE_END) && (flags & DELETE_END)) )
		  return false;

		// determine startpoint, check validity
		var startpoint;
		var startlength;
		var startstring;
		if (!(isNaN(start)))
		{
			startpoint = start;
			if ( (startpoint < 0) || (startpoint > this.originalHTML.length) )
				return false;

			startlength = 0;
		}
		else
		{
			startpoint = this.originalHTML.search(start);
			if (startpoint < 0)
				return false;

			startstring = this.originalHTML.match(start)[0];
			startlength = startstring.length;
		}

		// determine endpoint, check validity
	  var endpoint;
	  var endlength;
		if (!isNaN(end))
		{
		  endpoint = startpoint + end;
			var endlength = 0;
		}
		else
		{
			var tempHTML = this.originalHTML.slice(startpoint + startlength);
		  endpoint = tempHTML.search(end) + startpoint + startlength;
			endlength = tempHTML.match(end)[0].length;
		}

		if ( (endpoint < 0) || (endpoint > this.originalHTML.length) )
			return false;


		// tweak startpoint & endpoint if flags are set
		if (flags & SAVE_START)
		{
			if (flags & DELETE_UPTO)
				newHTML += startstring;
			else
				startpoint += startlength;
		}
		if (flags & INCLUDE_END)
		  endpoint += endlength;


	  var trimstring;
		if (flags & DELETE_START)
		  trimstring = this.originalHTML.slice(startpoint + startlength, endpoint);
		else
		  trimstring = this.originalHTML.slice(startpoint, endpoint);

	  if (!(flags & DELETE_UPTO))
			this.newHTML += this.originalHTML.slice(0, startpoint);

		if (flags & DELETE_END)
	    this.originalHTML = this.originalHTML.slice(endpoint + endlength);
		else
	    this.originalHTML = this.originalHTML.slice(endpoint);


	  return trimstring;
	};


	////////////////////////////
	// function: add
	//  insert   : the string to insert
	// 	position : the position to insert the string (before this position), may be a number or string/regex
	// 	return   : the position that the string was inserted; if the position wasn't found then return false
	//
	// flags:
	// 	DELETE_UPTO : characters up to the beginning of position are deleted
	// 	REPLACE     : characters in position are deleted
	// 	AFTER       : string is insterted after position
	//
	// note: regex 'global' flag is not supported

	this.add = function (insert, position, flags)
	{
		// if REPLACE is set make sure AFTER is not
		if (flags & REPLACE)
		  flags &= ~AFTER;

		// determine positionpoint, check validity
	  var positionpoint;
	  var positionlength;
		if (!isNaN(position))
		{
		  positionpoint = position;
		  positionlength = 0;
		}
		else
		{
		  positionpoint = this.originalHTML.search(position);
			positionlength = this.originalHTML.match(position)[0].length;
		}

	  if ( (positionpoint < 0) || (positionpoint > this.originalHTML.length) )
	    return false;


	  if (!(flags & DELETE_UPTO))
      this.newHTML += this.originalHTML.slice(0, positionpoint);
		if (flags & AFTER)
		{
			this.newHTML += this.originalHTML.slice(positionpoint, positionpoint + positionlength);
		  positionpoint += positionlength;
	  }
    this.newHTML += insert;

		if (flags & REPLACE)
		  positionpoint += positionlength;

	  this.originalHTML = this.originalHTML.slice(positionpoint);

	  return positionpoint;
	};

	this.finish = function()
	{
		this.newHTML += this.originalHTML;

		return this.newHTML;
	}

	return true;
}




doReplace = function(button){
	var changecount = 0;
	var wikibox = document.getElementById('wpTextbox1');
	var wikisummary = document.getElementById('wpSummary');	
	var flags = ['pron', 'pronunciation', 'lang', 'english', 'local', 'ipa', 'us', 'uk', 'icon', 'noicon'];
	var digraphs = [];
	for ( var i = 0; i < 10; i++ )
		digraphs[i] = [];

	digraphs[1] = [ 'ⁱ', 'ᵊ', 'b', 'd', 'ð', 'f', 'ɡ', 'h', 'j', 'k', 'l', 'm', 'n', 'ŋ', 'θ', 'p', 'r', 's', 'ʃ', 't', 'v', 'w', 'z', 'ʒ', 'x', 'ʔ', 'ɒ', 'æ', 'ɛ', 'ɪ', 'ɨ', 'ʊ', 'ʌ', 'ɝ', 'ɚ', 'ə', 'ɵ', 'i', 'ʉ', 'ˈ', 'ˌ', '.' ];
	digraphs[2] = [ 'ɪr', 'ɛr', 'eɪ', 'ær', 'aɪ', 'ɒr', 'dʒ', 'ŋg', 'tʃ', 'hw', 'iː', 'ɔː', 'ɜː', 'ɔr', 'ɔɪ', 'ɑː', 'ɑ:', 'ɑr', 'aʊ', 'oʊ', 'uː', 'ʌr', 'ɜr', 'ʊr', 'ər', 'ən', 'əm', 'əl', 'jʉ' ];
	digraphs[3] = [ 'ɛər', 'ɪər', 'ɔər', 'ʊər', 'juː' ];
	digraphs[4] = [ 'jʊər', 'aɪər', 'aʊər', 'ɔɪər' ];
	
	// add translations
	digraphs[1] = digraphs[1].concat( [ "'", ',', '_', '-', 'D', 'J', 'ʤ', ,'ʧ', 'N', 'g', 'T', 'S', 'C', 'Z', '?', '&', '{', '}', 'E', 'I', 'O', 'Q', 'U', 'V', '3', 'y', 'ɫ', 'â', 'ä', 'ŏ', 'ă', 'ī', 'ĕ', 'ā', 'ĭ', 'ĭr', 'ē', 'ô', 'ō', 'ū', 'ŭ', 'n̩', 'm̩', '·', 'l̩' ] );
	digraphs[2] = digraphs[2].concat( [ 'ᵊl', 'ᵊm', 'ᵊn', 'dh', 'dZ', 'ng', 'th', 'sh', 'ch', 'tS', 'zh', 'A:', 'a:', 'ah', 'aa', 'ar', 'ae', 'ai', 'aI', 'ye', 'au', 'aU', 'ow', 'ei', 'eI', 'ay', '&r', 'i:', 'ee', 'ir',  'o:', 'O:', 'aw', 'or', 'Or', 'oi', 'OI', 'oy', 'ou', 'oU', '@u', '@U', 'oh', 'oe', 'oo', 'u:', 'ur', '3r', '3:', '@:', 'ur', 'ir', 'er', '@r', 'i-', 'I-', '@n', 'o-', '@m', 'u-', 'U-', '@l', 'aː', 'ɑɹ', 'är', 'âr', 'ŏr', 'īr', 'Er', 'ĕr', 'ăr', 'æɹ', 'ār', 'ēr', 'ɔ:', 'ɔɹ', 'ôr', 'əʊ', 'əu', 'ɔʊ', 'ɔu', 'oɹ', 'ōr', 'ŏŏ', 'ōō', 'ŭr', 'ew', 'ūr', 'Vr', 'ʌɹ', 'ŭr', '3:', 'ɜɹ', 'ûr', 'əɹ', 'əɫ', 'ɝː' ] );
	digraphs[3] = digraphs[3].concat( [ 'dzh', 'eye', 'aer', 'eir', 'eIr', 'air', 'e@r', 'E@r', 'i:r', 'I@r', 'i@r', 'eer', 'awr', 'oUr', 'ohr', 'oor', 'urr', '3:r', '@:r', 'u:r', 'u@r', 'U@r', 'ou-', 'ju-', 'yu-', 'jU-', 'yU-', 'aɪr', 'aIr', 'aʊr', 'aUr', 'ɛɪɹ', 'ɛəɹ', 'ɪəɹ', 'iːɹ', 'ɔɪr', 'oyr', 'ɔəɹ', 'ɔʊɹ', 'oʊɹ', 'ʊəɹ', 'ōōr', 'ju:', 'yu:', 'yew', 'urr', '(d)', '(j)', '(t)', '(ɪ)', '(i)', '(@)', '(ə)' ] );
	digraphs[4] = digraphs[4].concat( [ 'ə(r)', 'ɜ(r)', 'ɔ(r)' ] );
	digraphs[5] = digraphs[5].concat( [ 'schwa', 'yoor', 'ɔə(r)' ] );
	digraphs[8] = digraphs[8].concat( [ "'''oo'''", '<s>o</s>', '<s>ɪ</s>', '<s>ʊ</s>' ] );
	digraphs[9] = digraphs[9].concat( [ 'j<s>ʊ</s>', 'y<s>ʊ</s>' ] );

	function splitIPA(ipa){
		if (ipa == null)
			return '';

		var parameters = ipa.split('|');
		var workingIPA = '';
		var newIPA ='';
		
		for (var i = 0; i < parameters.length; i++){
			if ( (parameters[i].toLowerCase().search('.ogg') > -1) || (parameters[i].toLowerCase().search('.wav') > -1) ) {
				if (parameters[i].toLowerCase().search('audio=') > -1)
					newIPA += parameters[i] + '|';
				else
					newIPA += 'audio=' + parameters[i] + '|';
			}
			else if (flags.find(parameters[i].toLowerCase())){
				if ((parameters[i].toLowerCase() == 'us') || (parameters[i].toLowerCase() == 'uk') || (parameters[i].toLowerCase() == 'local'))
					newIPA += parameters[i] + '|';
			}
			else
				workingIPA += parameters[i];
		}

		while (workingIPA.length > 0){
	  	var nextphoneme = nextPhoneme(workingIPA);
	  	var phoneme = workingIPA.substr(0, nextphoneme);
	  	if (phoneme == ' ') phoneme = '_';
			if (phoneme != '/') newIPA += phoneme + '|';
			workingIPA = workingIPA.substr(nextphoneme);
		}

		return newIPA.slice(0, -1);
	}

	function nextPhoneme(ipa){
		var length = (ipa.length < digraphs.length - 1) ? ipa.length : digraphs.length - 1;
		var ipatemp;

		while (length > 1){
			ipatemp = ipa.substr(0,length);
			for (var phoneme = 0; phoneme < digraphs[length].length; phoneme++)
				if (ipatemp == digraphs[length][phoneme])
					return length;
			length--;
		}
		
		// if a single character phoneme, check that it is valid
		ipatemp = ipa.substr(0,1);
		
		//alert(ipatemp);
		
		var malformedphoneme = true;
		for (var phoneme = 0; phoneme < digraphs[1].length; phoneme++) {
			if (ipatemp == digraphs[1][phoneme]) {
				malformedphoneme = false;
				break;
			}
		}
		if ((malformedphoneme == true) & (ipatemp != ' ') & (ipatemp != '/')) {
			malformedIPA += ipatemp;
			button.style.backgroundColor = 'red';
		}

		if (ipa.length > 0)
			return 1;

		return 0;
	}



	var editpage = new string_edit(wikibox.value);
	var malformedIPA = '';
	
	var templates = /({{IPA-audio\||{{Audio-IPA\||{{pron-en\||{{Pron-en\||{{pronEng\||{{PronEng\||{{IPAc-en\||{{IPAc-en_confirm\||{{IPA-en\||{{pronounced\|)/;
	var ipa = editpage.cut(templates, /}}/, DELETE_START);
	while (ipa != false) {
		changecount++;
		malformedIPA = '';
		var newIPA = splitIPA(ipa);

    editpage.add('{{IPAc-en', 0);

		if (malformedIPA != ''){
			//{{IPAc-en_confirm}} deprecated
			//editpage.add('_confirm', 0);
			alert(malformedIPA);
			editpage.add('zzz', 0);
		}

// 		if ( (changecount == 1) & (button.value == 'IPAc-en') )
// 			editpage.add('|icon|' + newIPA, 0);
// 		else
			editpage.add('|' + newIPA, 0);

		ipa = editpage.cut(templates, /}}/, DELETE_START);
	}

	wikibox.value = editpage.finish();

  if (button.value == 'IPAc-en') wikisummary.value += ' IPAc-en conversion';
	button.value = changecount + ' change' + ((changecount != 1)? 's' : '');

// 	setTimeout("window.find('IPAc-en');", 1000);
	window.find('IPAc-en');
}


window.addEventListener('load', function(){
	var ipabutton = document.createElement('input');

	ipabutton.type = 'button';
	ipabutton.value = 'IPAc-en';
	ipabutton.addEventListener('click', function(){ doReplace(this) }, false);
	ipabutton.setAttribute("accesskey", "a")
	
	document.getElementById('p-tb').appendChild(ipabutton);

  }, true);
