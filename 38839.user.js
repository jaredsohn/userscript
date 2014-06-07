// ==UserScript==
// @name           whitenoise
// @namespace      
// @description    Sends random data to search engines on an adhoc basis
// @include        *
// ==/UserScript==

var search_engines = new Array();
search_engines[0] = 'http://www.google.com/search?hl=en&q=';
search_engines[1] = 'http://search.yahoo.com/search?p=';
search_engines[2] = 'http://search.msn.com/results.aspx?q=';

function ord( string ) {
     return (string+'').charCodeAt(0);
}
function chr(AsciiNum)
{
	return String.fromCharCode(AsciiNum)
}

function rand ( max, min )
{
  return Math.floor( (Math.random() * (max - min + 1) ) + min );
}

function rnd_ua() {
	  var user_agents = ['Mozilla/5.0 (Windows; U; Windows NT 5.1; it; rv:1.9.1b2) Gecko/20081201 Firefox/3.1b2',
		     'Mozilla/5.0 (X11; U; SunOS sun4u; en-US; rv:1.9b5) Gecko/2008032620 Firefox/3.0b5',
		     'Mozilla/5.0 (X11; U; Linux x86_64; pt-BR; rv:1.9b5) Gecko/2008041515 Firefox/3.0b5',
		     'Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9pre) Gecko/2008042312 Firefox/3.0b5',
		     'Mozilla/5.0 (Windows; U; Windows NT 6.0; fr; rv:1.9b5) Gecko/2008032620 Firefox/3.0b5',
		     'Mozilla/5.0 (Windows; U; Windows NT 6.0; de; rv:1.9b5) Gecko/2008032620 Firefox/3.0b5',
		     'Mozilla/5.0 (Windows; U; Windows NT 5.2; nl; rv:1.9b5) Gecko/2008032620 Firefox/3.0b5',
		     'Mozilla/5.0 (Windows; U; Windows NT 5.2; fr; rv:1.9b5) Gecko/2008032620 Firefox/3.0b5',
		     'Mozilla/5.0 (Windows; U; Windows NT 5.1; ja; rv:1.9b5) Gecko/2008032620 Firefox/3.0b5',
		     'Mozilla/5.0 (Windows; U; Windows NT 5.1; fr; rv:1.9b5) Gecko/2008032620 Firefox/3.0b5',
		     'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.4; en-GB; rv:1.9b5) Gecko/2008032619 Firefox/3.0b5',
		     'Windows-RSS-Platform/1.0 (MSIE 7.0; Windows NT 5.1)',
		     'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30)',
		     'Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 6.0)',
		     'Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; .NET CLR 1.0.3705; Media Center PC 3.1; Alexa Toolbar; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
		     'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
		     'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP)',
		     'Mozilla/4.0 (compatible; MSIE 6.0b; Windows 98; Win 9x 4.90)',
		     'Mozilla/4.0 (compatible; MSIE 6.0b; Windows NT 5.0; .NET CLR 1.1.4322)',
		     'Mozilla/4.0 (compatible; MSIE 6.01; Windows NT 6.0)',
		     'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; User-agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; http://bsalsa.com) ; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.04506; Media Center PC 5.0)',
		     'Mozilla/4.0 (compatible; MSIE 5.5b1; Mac_PowerPC)',
		     'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.0; YComp 5.0.2.4)',
		     'Mozilla/4.0 (compatible; MSIE 5.0; Windows 98; DigExt; YComp 5.0.2.6; yplus 1.0)',
		     'Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; Sprint:SCH-i320; Smartphone; 176x220)',
		     'Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; Sprint;PPC-i830; PPC; 240x320)',
		     'Mozilla/2.0 (compatible; MSIE 3.01; Windows 95)',
		     'Mozilla/1.22 (compatible; MSIE 2.0; Windows 3.1)',
		     'Opera/9.63 (X11; Linux i686; U; de) Presto/2.1.1',
		     'Opera/9.62 (Windows NT 5.1; U; en) Presto/2.1.1',
		     'Opera/9.61 (X11; Linux x86_64; U; fr) Presto/2.1.1',
		     'Opera/9.60 (X11; Linux i686; U; ru) Presto/2.1.1',
		     'Opera/9.52 (X11; Linux x86_64; U; en)',
		     'Opera/10.00 (X11; Linux i686 ; U; Fedora 9; en) Presto/2.2.0',
		     'Mozilla/5.0 (Macintosh; ; Intel Mac OS X; fr; rv:1.8.1.1) Gecko/20061204 Opera'
		     
];

  return user_agents[ rand( user_agents.length, 0 ) ];
}

function gen_rnd_word ( wlen ) {
  var word = '';
  
  for (var i = 0; i < wlen; ++i) {
    word += chr(rand(ord('z'), ord('a')));		 
  }
  return word;
}

function gen_rnd_sentence( slen ) {
  var s = '';
  for (var i = 0; i < slen; ++i) {
    s += gen_rnd_word(rand(10,2)) + "%20";
  } 
  return s;
}

for (var i = 0; i < rand(3,1); ++i) {
  GM_xmlhttpRequest({
    method: 'POST',
	      url: search_engines[ rand(1,0) ] + gen_rnd_sentence( rand(10, 3) ),
	      headers: {
      'User-agent': rnd_ua(),
        'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	      onload: function(responseDetails) {    }
  });  
}
