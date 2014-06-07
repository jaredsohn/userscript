/ Based on the original emoticonsforblogger by kendhin
// Modified by anom (http://artikel-saya.web.id) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Kaskus Icon for Blogger
// @namespace      http://artikel-saya.web.id
// @description    You can use Kaskus emoticons in Blogger.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==


a = document.getElementById('comments');
if(a) {
	b = a.getElementsByTagName("DD");
	for(i=0; i < b.length; i++) {
            if (b.item(i).getAttribute('CLASS') == 'comment-body') {
    _str = b.item(i).innerHTML.replace(/:f/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/q11.gif' alt='' class='smiley'/>");
	_str = _str.replace(/:D/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/14.gif' alt='' class='smiley'/>");
	_str = _str.replace(/B)/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/05.gif' alt='' class='smiley'/>");
	_str = _str.replace(/:x/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/001.gif' alt='' class='smiley'/>");
    _str = _str.replace(/:$/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/07.gif' alt='' class='smiley'/>");
	 
	 _str = _str.replace(/:;\)/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/47.gif' alt='' class='smiley'/>");
	 _str = _str.replace(/x(/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/12.gif' alt='' class='smiley'/>");
    _str = _str.replace(/:@/gi, "<img src='http://www.kaskus.us/images/smilies/bingungs.gif' alt='' class='smiley'/>");
     _str = _str.replace(/:~/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/q20.gif' alt='' class='smiley'/>");
	_str = _str.replace(/:))/gi, "<img src='http://www.kaskus.us/images/smilies/mahos.gif' alt='' class='smiley'/>");
    _str = _str.replace(/:(/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/06.gif' alt='' class='smiley'/>");
    _str = _str.replace(/:s/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/15.gif' alt='' class='smiley'/>"); 
    _str = _str.replace(/:o/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/47.gif' alt='' class='smiley'/>"); 
                b.item(i).innerHTML = _str;
            }
	}
}

a = document.getElementById('comments');
if(a) {
	c = a.getElementsByTagName("DD");
	for(i=0; i < c.length; i++) {
            if (c.item(i).getAttribute('CLASS') == 'comment-body-author') {
    _str = b.item(i).innerHTML.replace(/:f/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/q11.gif' alt='' class='smiley'/>");

	_str = _str.replace(/:D/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/14.gif' alt='' class='smiley'/>");
	_str = _str.replace(/B)/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/05.gif' alt='' class='smiley'/>");
	_str = _str.replace(/:x/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/001.gif' alt='' class='smiley'/>");
    _str = _str.replace(/:$/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/07.gif' alt='' class='smiley'/>");
	
	_str = _str.replace(/:;\)/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/47.gif' alt='' class='smiley'/>");
	_str = _str.replace(/x(/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/12.gif' alt='' class='smiley'/>");
    _str = _str.replace(/:@/gi, "<img src='http://www.kaskus.us/images/smilies/bingungs.gif' alt='' class='smiley'/>");
    _str = _str.replace(/:~/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/q20.gif' alt='' class='smiley'/>");
	_str = _str.replace(/:))/gi, "<img src='http://www.kaskus.us/images/smilies/mahos.gif' alt='' class='smiley'/>");
    _str = _str.replace(/:(/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/06.gif' alt='' class='smiley'/>");
	_str = _str.replace(/:s/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/15.gif' alt='' class='smiley'/>"); 
    _str = _str.replace(/:o/gi, "<img src='http://www.kaskus.us/images/smilies/sumbangan/47.gif' alt='' class='smiley'/>"); 
                c.item(i).innerHTML = _str;
            }
	}
}