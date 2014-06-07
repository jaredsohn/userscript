// ==UserScript==
// @name           xanga comment notifer
// @namespace      ariah fine http://blog.iamnotashamed.net
// @description    checks new comments on xanga and notifies you if you have any.
// @include        *
// ==/UserScript==

if (document.location.href.indexOf('http://www.xanga.com/Private/feedback.aspx') != -1) {              

  	 var comments = document.body.innerHTML.match(/FeedbackLog1_lblCom2">([0-9]+)/);

var commentCount = parseInt(comments[1]);

  GM_setValue('xanga_comments', commentCount );

}

else
{
// Configuration: Set the url of your page.
config_url = 'http://www.xanga.com/Private/feedback.aspx?tab=comments';

// No need to fiddle below here unless you know what you're doing ;)

GM_xmlhttpRequest({
	method: 'GET',
	url: config_url,
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'application/xml+xhtml,text/xml',
	},
	onload: function(responseDetails) {
		var cheers = responseDetails.responseText.match(/FeedbackLog1_lblCom2">([0-9]+)/);
		
		var cheercount = parseInt(cheers[1]);
		cheercount = cheercount - GM_getValue('xanga_comments', 0);
		if (cheercount > 0) 
	{ 
	                          
			
			
			div = document.createElement('div');
			div.style.pixelTop = 0;
			div.style.pixelLeft = 0;
			div.style.backgroundColor = '#ffffff';
			div.style.fontFamily = 'Verdana';
			div.style.paddingTop = 2;

			div.style.paddingBottom = 2;
			
			div.innerHTML = '<a style="text-decoration: none; color: #000000;" href="http://www.xanga.com/Private/feedback.aspx?tab=comments">' + (cheercount) + ' new comment(s) on your xanga!</a>';

			document.body.insertBefore(div, document.body.firstChild);
		
	}	
	}
});                            

}
