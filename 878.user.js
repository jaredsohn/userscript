// ==UserScript==
// @name          Pitchfork Mediator
// @namespace     http://unlit.net/
// @include       http://pitchforkmedia.com/*
// @include       http://*.pitchforkmedia.com/*
// @description   Kill the ads and replaces the flash navigation with text, including browse by letter.
// @exclude

// ==/UserScript==
(function() {

		// get all td tags

		var TDs = document.getElementsByTagName('td');
		TDs[0].style['display'] = 'none';

		// loop through all the TDs on the page
		for ( y = 0; y < TDs.length; y++ )
		{
			var height = TDs[y].getAttribute('height');
			if (height == '94'|| height == '96' || height == '97' || height == '274')
				TDs[y].style['display'] = 'none';
		}

		var TABLEs = document.getElementsByTagName('table');
		var newDIV = document.createElement('DIV');
		var beginning = document.body.firstChild;
		var DIV = document.body.insertBefore(newDIV,beginning);
		DIV.innerHTML = "<span class=\"titlestory\"><a href=\"http://www.pitchforkmedia.com\">Pitchfork</a><strong>&nbsp;|&nbsp;<a href=\"http://www.pitchforkmedia.com/features/\">Features</a>&nbsp;|&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/\">Record Reviews</a>&nbsp;|&nbsp;<a href=\"http://www.pitchforkmedia.com/news/\">News</a>&nbsp;|&nbsp;<a href=\"http://pitchforkmedia.com/tracks/\">Track Reviews</a>&nbsp;|&nbsp;<a href=\"http://www.pitchforkmedia.com/mp3/\">Free Downloads</a>&nbsp;|&nbsp;<a href=\"http://www.pitchforkmedia.com/best/\">Best New Music</a>&nbsp;&nbsp;</strong></span><form method=post action=\"http://www.pitchforkmedia.com/cgibin/engine.cgi\"><INPUT type=\"text\" name=\"keywords\" size=\"14\" maxlength=\"50\" class=\"form1\" value=\"Search\" onFocus=\"clearDefault(this)\"><input type=\"image\" value=\"GO\" src=\"/img/go.gif\" align=\"top\" class=\"button1\">&nbsp;&nbsp;<select name=\"engine\" class=\"form2\"><option selected=\"selected\" value=\"Reviews|http://pitchforkmedia.com/cgi-bin/search2/search.cgi?terms=\">Reviews</option><option value=\"News|http://pitchforkmedia.com/cgi-bin/search3/search.cgi?terms=\">News</option></select>&nbsp;&nbsp;Reviews Archive: &nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/a/\">A</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/b/\">B</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/c/\">C</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/d/\">D</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/e/\">E</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/f/\">F</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/g/\">G</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/h/\">H</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/i/\">I</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/j/\">J</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/k/\">K</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/l/\">L</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/m/\">M</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/n/\">N</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/o/\">O</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/p/\">P</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/q/\">Q</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/r/\">R</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/s/\">S</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/t/\">T</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/u/\">U</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/v/\">V</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/w/\">W</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/x/\">X</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/y/\">Y</a>&nbsp;<a href=\"http://www.pitchforkmedia.com/record-reviews/z/\">Z</a>&nbsp;</form>";
})();