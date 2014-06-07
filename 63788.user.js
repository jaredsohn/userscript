// ==UserScript==
// @name           Twitter_Directionality
// @namespace      http://www.strawjackal.org
// @description    Switches text direction by language on twitter.com
// @include        http://twitter.com/*
// ==/UserScript==

  function twitterflip_sanitize_text(data)
  {
	return data.replace(/@\w+/, "");
  }

  function twitterflip_count_it(text, match)
  {
	var matches = text.match(new RegExp(match, "g"));
	return matches != null ? matches.length : 0;
  }

  function twitterflip_is_hebrew(text)
  {
    text  = twitterflip_sanitize_text(text);
  var count_eng = twitterflip_count_it(text, "[a-zA-Z]");
    var count_heb = twitterflip_count_it(text, "[\\u05B0-\\u05F4\\uFB1D-\\uFBF4]");
    var count_arb = twitterflip_count_it(text, "[\\u060C-\\u06FE\\uFB50-\\uFEFC]");

	//alert ("Original text: " + text + "\nEnglish chars: " + count_eng + "\nHebrew chars: " + count_heb);
    return count_eng < (count_heb + count_arb);
  }
  
function twitterFlip_getElementsByClassName(classname, node) {

    if (!node) 
	{ node = document.getElementsByTagName("body")[0]; }
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for (var i = 0, j = els.length; i < j; i++)
	{
        if (re.test(els[i].className))
		{
			a.push(els[i]);
		}
	}
    return a;
}

function flipTwitter() {

    var tweets = twitterFlip_getElementsByClassName('status-body', null);
	for (var i = 0; i < tweets.length; i++) 
    {
	    var tweet = tweets[i];
		var entry_content = twitterFlip_getElementsByClassName('entry-content', tweet)[0];
		var text = entry_content.innerText ||  entry_content.textContent;
	
		if (twitterflip_is_hebrew(text))
		{
			tweet.style.direction='rtl';
			tweet.style.textAlign='right';

			//var actions_hover = twitterFlip_getElementsByClassName('actions-hover', tweet)[0];
			//actions_hover.style.float = 'left';
			//actions_hover.style.left = '40px';
			var actions_hover = twitterFlip_getElementsByClassName('entry-meta', tweet)[0];
			actions_hover.style.direction='ltr';
			actions_hover.style.textAlign = 'left';
			
			var tweeter_screen_name = twitterFlip_getElementsByClassName('screen-name', tweet)[0];
			tweeter_screen_name.style.unicodeBidi = 'embed';
		}
    }

}

window.addEventListener(
'load',
flipTwitter() ,
true);