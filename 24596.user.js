/*
  --------------------------------------------------------------------
  How to Install a Greasemonkey Script
  --------------------------------------------------------------------

  - You need the Firefox web browser - Download and install
  http://www.mozilla.com/en-US/firefox/

  - You need to install Greasemonkey - How-To
  http://internetducttape.com/2007/08/23/howto-install-firefox-extensions-screenshots/

  - Install this script - How-To
  http://internetducttape.com/2007/08/24/howto-use-firefox-greasemonkey-userscripts-screenshots/

  --------------------------------------------------------------------
*/
// ==UserScript==
// @name           WordPress Comment Ninja v1 for WordPress 2.3x or lower
// @namespace      http://internetducttape.com
// @description    Respond to comments directly by post and/or email from inside your WordPress dashboard
// @include        */wp-admin/edit-comments.php
// @include        */wp-admin/edit-comments.php?s=*&submit=Search&mode=view
// @include        */wp-admin/edit-comments.php?apage=*
// @include        *?wp-comment-ninja=*
// @include        *mail.google.com/mail/x/*&to=*&subject=*&body=*
// @exclude        */wp-admin/edit-comments.php?page=*
// @exclude        *mode=edit*
// @version        0.51
// ==/UserScript==
/*
  --------------------------------------------------------------------

  2008/01/02 - 0.51
  - BUGFIX: changed multi-author blog code to work with WordPress 2.3.2 and WordPress.com
  - updated documentation

  2008/01/02 - 0.5
  - don't display comment ninja in mass-edit mode, since it doesn't work on that mode
  - wordpress.com added avatars to the comment display and they were being sent in emails
  - on multi-author blogs it grays out the comments you can't edit

  2007/11/05 - 0.41
  - Fixed "send by" typos.

  2007/10/04
  - Changed includes to allow search results to show up

  2007/09/25 - 0.40
  - Wait a bit before sending the comment, might fix problem with comments being blocked
  - BUGFIX: Respond link didn't display for guest bloggers who weren't full admins
  - maybe BUGFIX: Respond link doesn't display on older versions of WordPress (specifically 2.03)
  - potentional BUG: If last line of respond comment is a link then post comment loads that instead of comment page?
    Can't reproduce it right now.

  2007/09/17 - 0.3
  - Was setting the subject: same as to:, stupid

  2007/09/15 - 0.2
  - Added icon to the respond link
  - Fixed up includes to avoid other comment pages like mass edit mode or moderation
  - Fixed problem with trying to run it without Firebug installed

*/

var commentninja_version = "0.51";

/*--------------------------------------------------------------------
  Helper Objects
  --------------------------------------------------------------------*/

var FrameObj = function (zindex) {
  // from: http://wiki.greasespot.net/HTML_injection_tips
  var css = 'position:fixed; z-index:'+zindex+'; bottom:0; left:0; border: 1px solid #000; margin:0; padding:0; width: 300px; height: 30px; ';
  var iframe = document.createElement('iframe');
  iframe.setAttribute('style', css);

  // The about:blank page becomes a blank(!) canvas to modify
  iframe.src = 'about:blank';

  document.body.appendChild(iframe);

  // Make sure Firefox initializes the DOM before we try to use it.
  iframe.addEventListener("load", function() {
			    var doc = iframe.contentDocument;
			    doc.body.style.background = "#ffff99";
			    doc.body.innerHTML = 'WordPress Comment Ninja is loaded';
			  }, false);
  iframe.style.display = 'none';
  this.iframe = iframe;
};

FrameObj.prototype = {
  bg: function(color) {this.iframe.contentDocument.body.style.background = color; },
  display: function(text) {
    // Display a message in the iframe
    this.bg("#ffff99");
    this.iframe.contentDocument.body.innerHTML = text;
    this.displayOn();
  },
  displayOn: function() { this.iframe.style.display = 'block'; },
  displayOff: function() { this.iframe.style.display = 'none'; },
  target: function(url) {
    this.iframe.src = url;
  },
  store: function(text) {
    // load a page in the iframe
    this.iframe.contentDocument.body.innerHTML = text;
  }, 
  get: function() {
    // Get the DOM for the page loaded in the iframe
    return(this.iframe.contentDocument.body);
  },
  fadeOff: function() {
    var thisObj = this;
    setTimeout( function(){ thisObj.displayOff() }, 2500);
  }
};


var statusObj = new FrameObj('9999');
var resObj = new FrameObj('9998');

/*--------------------------------------------------------------------
  MAIN
  --------------------------------------------------------------------*/

(function() {
  // Check for URLs with the wp-comment-ninja argument -- that means post a comments
  var m = document.location.href.match(/\?wp-comment-ninja=(.*?)$/);
  if (m) {      
    window.addEventListener("load", function(e) { postCommentNinja(document, document.location.href, unescape(m[1])); }, false);    
  }
  else {
    // Check for gmail mobile urls with to/subject/body preloaded
    var m = document.location.href.match(/\/\/mail.google.com\/mail\/x\/.*?&to=(.*?)&subject=(.*?)&body=(.*?)&/);
    if (m) {
      window.addEventListener("load", function(e) { sendGmailMobile(document, unescape(m[1]), unescape(m[2]), unescape(m[3])); }, false);         
    }
    else {
      // This must be a comment page
      makeMenuToggle("WPCN_USE_GMAIL", false, "Use Gmail to send email instead of browser default", "Use browser default to send email (mailto: links)", "WordPress Comment Ninja");
      window.addEventListener("load", function(e) { commentNinja(); }, false);          
    }
  }
 })();

/*--------------------------------------------------------------------
  Post a Comment
  --------------------------------------------------------------------*/

function postCommentNinja(source, url, body) {
  function findCommentBox(source) {
    var tas = $x("//textarea", source);
    console.log("findCommentBox");
    console.log(tas);
    //  var tas = document.getElementsByTagName('textarea');
    for(var index=0; index<tas.length; index++) {
      var i = tas[index];
      if (i.id = "comment") {
	return (i);
      }
    }
    console.log("warning: couldn't find the comment box");
    return null;
  }

  function submitForm(formChild, value) {
    var p = formChild.parentNode;
    while(
	  (p.nodeName != "FORM") &&
	  (p.parentNode != null)
	  ) {
      p = p.parentNode;
    }      
    if(p.nodeName == "FORM") {
      console.log("Submitted comment");
      p.submit();
      return 1;
    }
    return 0;
  }

  var submitted = 0;
  console.log("postCommentNinja(", source,", ", url, ", ", body, ")");
  var comment_box = findCommentBox(source);
  if (comment_box != null) {
    comment_box.value = body;
    submitted = submitForm(comment_box);
  }
  if (!submitted) {
    alert("warning: could not submit comment!");
  }
}

/*--------------------------------------------------------------------
  Send a Gmail
  --------------------------------------------------------------------*/

function sendGmailMobile(source, to, subject, body) {
  var tas = $x("//textarea", source);
  tas.forEach(function(i) {
		if (i.id == "body") { i.value = body; }
	      }
	      );
  var inputs = $x("//input", source);
  inputs.forEach(function(i) {
		   if (i.id == "to") { i.value = to; }
		   if (i.id == "sub") { i.value = subject; }    
		 }
		 );  
  inputs.forEach(function(i) {
		   if (i.id == "send") { i.click(); }
		 }
		 );  
}

function startGmailMobile(to, subject, body) {
  console.log("emailing with gmail mobile");

  function findGmailCompose(source) {
    var compose = $x('//*[@id="bnc"]', source);
    console.log(compose);
    if (compose.length > 0) {
      return(compose[0].href);
    }
    else {
      return null;
    }
  }

  // Connect to Gmail mobile and send a test message
  var gmail_mobile = 'http://mail.google.com/mail/x/';
  GM_xmlhttpRequest({
    method:"GET",
	url:gmail_mobile,
	headers:{
	"User-Agent":"WordPress Comment Ninja",
	  "Accept":"text/monkey,text/xml",
	  },
	onload:function(request) {	
	resObj.store(request.responseText);	
	var compose_url = findGmailCompose(resObj.get());
	if (compose_url) {
	  GM_openInTab(gmail_mobile+compose_url+"&to="+escape(to)+"&subject="+escape(subject)+"&body="+escape(body));
	  statusObj.display('Sending email with Gmail Mobile ... ');
	}
	else {
	  statusObj.display('Could not connect to Gmail!');
	  GM_openInTab('https://mail.google.com');
	  alert("Could not connect to Gmail. Make sure you're already logged in.");
	}
      }
    });
}


/*--------------------------------------------------------------------
  Send an Email
  --------------------------------------------------------------------*/

function openMailtoTab(to, subject, body) {
  var url = 'mailto:'+to+'?subject='+escape(subject)+'&body='+escape(body);
  console.log(url);
  statusObj.display('Sending email using mailto ... ');
  GM_openInTab(url);
}

/*--------------------------------------------------------------------
  Comment Administration
  --------------------------------------------------------------------*/

function commentNinja() {
  autoUpdateFromUserscriptsDotOrg({
    name: 'WordPress Comment Ninja',
	url: 'http://userscripts.org/scripts/source/24596.user.js',
	version: commentninja_version,
	});

  // Styles
  var styles = "#idt-nfo { border: 1px solid #fc0; border-left: 0; border-right:0; background-color: #ffc; margin-top: 10px; padding: 3px 10px;} #idt-nfo a { font-weight: bolder;} #idt-nfo img { float:left; border: 1px solid #999; margin: 5px 15px 5px 5px; }";
  styles += "ul.idt-comment-ninja-input {list-style:none; border: 1px solid #fc0; border-left: 0; border-right:0; background-color: #ffc; margin-top: 10px; padding: 3px 10px; }";
  styles += "ul.idt-comment-ninja-input .idt-data {display:none;}";
  styles += "img.idt-fix-height { position:relative; bottom:-4px;}";
  styles += "li.idt-not-mine {background-color: #c1c1c1; margin-left: 30px;}";
  styles += "li.idt-not-mine.alternate {background-color: #a1a1a1;}";
  GM_addStyle(styles);

  function displayInfo() {
    var h = $x("/html/body/div[contains(@class,'wrap')]/h2");
    if (h.length > 0) {
      var idt_logo = 'data:image/gif;base64,'+
	'R0lGODlhqgCCAPcAAFxaXKyurARerNTa3ByGxGyu3JyepHx+fNzu9ESazJTG5ARyvDyGxOTm5MzO'+
	'1GxubLzCxIySlCR+vIy63PT6/Lza7DSOxFym1ARqtGym1LTS5LS6vISKjOTy/GRmZDSGxFyazDyS'+
	'zHy23KTO5BxyvMzm9HR2dCx+vKSmpPT29LzW7MTKzJSanIzC5LS2vNzi5Hyu1ISGjOzu7FSi1Ax6'+
	'vMzi9ARuvCyGzESW1FxiZLS2tARmtISGhEya1KTG5NTW1BR+xBRqtEySxKyutNze5Hx+hOTm7Gxu'+
	'dMTGzJSWnIy+5MTe9Gyq3Ly+xIyOlGRmbNzq9HR2fKSmrOzu9CSCxFxeZARitNze3CSKxHSy3Jyi'+
	'pJzK5BR2vESOxMzS1MTGxJSWlJS+3Pz+/MTe7DSOzGSq1ARutHSq1KzS7Ly+vIyOjPT2/CyKxFyi'+
	'1DyWzKTO7NTq9DSCxMzOzJyenJzC5ISy3Ax6xCyKzEye1ByCxKyytHyChOTq7GxydGRqbHR6fKSq'+
	'rCR6vFSWzFSazNTW3ESKxOz2/GSezOzy9LTW7FxeXARirAR2vKTK5BRutDSSzNza3CSGxHSu3OTu'+
	'9JzG5MTCxJSSlJS63Pz6/MTa7GSm1AxqtHSm1Ly6vIyKjESSzIS23KzO5NTm9DR+vMTW7MzKzJya'+
	'nJTC5OTi5ISu1BR6vNTi9GRiZAxmtBx+xKSipNTS1DSKxDSKzFSe1LSytISChOzq7HRydGxqbHx6'+
	'fKyqrPTy9AD//wD//wD//wD//4gAAGYAABYAAAAAAAC0/AHj5AATEwAAAAA01gBkWACDTAB8AFf4'+
	'3PT35IATE3wAAOAYd+PuMBOQTwB8AIgAEGa35RaSEwB8AHD/NGX/ZC3/g2z/fG9QzWfv5W8XEwAA'+
	'ABE0uQBk/wCD/wB8fwT4iADk5QATEwAAAAPnUABk7wCDFwB8AACINABkZACDgwB8fAAAUAAA7wAA'+
	'FwAAAAQwwQAAGAAAAAAAAAMBAAAAAAAAAAAAAAAanQAA/wAARwAAACH5BAAAAAAALAAAAACqAIIA'+
	'Bwj/AMUIHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuX'+
	'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'+
	'+IL/8oQ/GU6P24e/+Izf+I7/+JC/EAEBADs=';

      main = document.createElement('blockquote');
      main.id = "idt-nfo";

      var img = document.createElement('img');
      img.src = idt_logo;

      var a = document.createElement('a');
      a.href = "http://InternetDuctTape.com/tools/";
      a.title = "More tools from Internet Duct Tape";
      a.appendChild(img);
      main.appendChild(a);

      a = document.createElement('a');
      a.innerHTML = 'Using <strong>WordPress Comment Ninja</strong> version '+commentninja_version+' extension by InternetDuctTape.com'; 
      a.href = "http://internetducttape.com/tools/wordpress/wordpress-comment-ninja/";
      main.appendChild(a);
      var info = document.createElement('div');
      var email = "Using browser default for sending emails (mailto:)";
      var test_gmail = "";
      if (WPCN_USE_GMAIL) {
	email = "Using Gmail for sending emails";
	test_gmail = ' or <a title="Send a test email to engtech" idt="testSendEmail" href="javascript:;">test sending an email to engtech</a>';
      }
      info.innerHTML = '<blockquote>'+email+'</blockquote><p>Go to <b>Tools >> Greasemonkey >> User Script Commands</b> to change your email setting</p>' + 
	'<p><b>New users:</b> Test <a title="Test posting a comment on your blog" idt="testPostComment" href="javascript:;">posting a comment on your blog</a>'+test_gmail+'<br />Get started by clicking on the "Respond" link underneath a comment.</p>';
      main.appendChild(info);
      insertAfter(main, h[0]);
    }
  }

  displayInfo();


  function buildReloadLink() {
    var img_reload = 'data:image/gif;base64,'+
      'R0lGODlhEAAQAMQfALnik2aXQv7+/dPut73llbfala3LmW6gSWqdQ2eYRGqaSLfck568iYrUQN7y'+
      'zF6RPLTXlYjUP8XwmYfQQLbYl4jRQGiaQsPumNbyu7nglNPzsLXYlf7+/lCHK////////yH5BAEA'+
      'AB8ALAAAAAAQABAAAAV14CeOXumJ5Uh6ShAo5XOqnINgA4YdRpeKHE9nAABUGguMb1bqMDpQyiRC'+
      '8HGAQoupcyFklqSEJwgtg03otOnTNFs94lVHc5EsPRYrSiiJTChlTz9NEgsNFUUQPgJyBgcFBRsQ'+
      'Cg5XKh4yLC4wM5dMayqhoqMhADs=';

    var span = $x("//span[contains(@class,'current')]");
    if (span.length > 0) {
      span[0].className = "";
      var old = span[0].innerHTML;
      span[0].innerHTML = "<a class='page-numbers' title='Click to reload current page' href=''>"+old+"&nbsp;<img valign='bottom' class='idt-fix-height' src='"+img_reload+"' /></a>";

    }
  }

  buildReloadLink();

  // Use event delegation instead of having a ton of event listeners
  document.addEventListener("click", clickListener, false);

  // http://www.famfamfam.com/lab/icons/mini/icons/icon_download.gif
  var img_respond = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAMQAAIWOl8rKyoibetPT02hoarm6usPDw/Pz89ra2uTk5Hl6e6mrpmGNRH2vWunp'+
    '6e3t7ZPNX47LVbW1tZPIa5nXWvv7+1hZXfT2+HFxcfNXV2FhYZ6ens7OzvDw8GOPRf///yH5BAAA'+
    'AAAALAAAAAAQABAAAAWf4CeOX9SQJGIYi+CZniBsQCEa5Nt44nUBIlvCQ6RMiB7ORRH8JCoeCAUS'+
    'YVQ4H+ZH8kEgDp5Gg9HhYDGiRRcRODDIBvMH/VEPBgVJpyORyOl2d2aDcgQiGwd7D4sPDo6Ohh8b'+
    'HSoFlpYSBRwOkZN3AxwBHxMGGQYJGocXn6EBKwYFHakfAAgXHY2PDgkdARYiAArCGBgExhrIFpEo'+
    'zCQhADs=';

  // Add the "Respond" link to each comment
  var i = $x(".//*[contains(@class,'commentlist')]/li/p[last()]");
  i.forEach(function(r) {
	      // Hack - wish there was elements or classes here to make this cleaner
	      // Injecting an element to append to
	      
	      var permission = $x(".//*[contains(@class,'unapprove')]", r);
	      if (permission.length > 0) {
		r.innerHTML = r.innerHTML.replace(' [', ' [ <span class="idt-respond"></span><span> | </span>');
	      } else {
		r.parentNode.className += " idt-not-mine";
		r.innerHTML = r.innerHTML.replace(' [', ' [ <span class="idt-respond"></span>');
	      }
	      var insert = $x(".//*[contains(@class,'idt-respond')]", r);
	      if (insert[0]) {
		var img = document.createElement('img');
		img.src = img_respond;
		img.className = 'idt-fix-height';
		img.setAttribute("idt", "buildBoxImg");
		var respond = document.createElement('a');
		respond.appendChild(img);
		respond.appendChild(document.createTextNode(" Respond"));

		respond.href = "javascript:;";
		//		respond.addEventListener("click", buildBox, false);
		respond.setAttribute("idt", "buildBox");
		respond.title = "Click to open comment respond box";
		insert[0].appendChild(respond);
	      }
	    });
  return;
}

/*--------------------------------------------------------------------
  Control Logic - catch user events
  --------------------------------------------------------------------*/

// IMAGE SOURCES

// http://www.famfamfam.com/lab/icons/mini/icons/action_stop.gif
var img_close = 'data:image/gif;base64,'+
  'R0lGODlhEAAQAMQfAOt0dP94eOFjY/a0tP/JyfFfX/yVlf6mppNtbf5qanknJ9dVVeZqat5eXpiM'+
  'jGo4OIUvL3pGRthWVuhvb1kaGv39/f1lZdg7O/7Y2F8/P+13d4tcXNRTU2dCQv///////yH5BAEA'+
  'AB8ALAAAAAAQABAAAAV/4Cd+Xml6Y0pGTosgEap6G0YQh6FDskhjGg0AMJkwAjxfBygkGhmCAAXl'+
  '6QyGnuLFI4g+qNbixLMNdBNfkpXBLncbial6AC17Gvg4eND1BPB3cHJVBguGhwsSHHo+GRqKHJGR'+
  'CQo9JI4WBZoFFpUVMw8QCqMQU58qJCclqKytIQA7';

// http://www.famfamfam.com/lab/icons/mini/icons/icon_mail.gif
var img_email = 'data:image/gif;base64,'+
  'R0lGODlhEAAQAMQfAPr8/VVritvj7IqsyElVa+Ps9MvT2rvc/aPQ/KrU/Or0/nmYspzN/LbZ/FJg'+
  'eXiQq0NLXHWPrJnA1sDf/CkxQ9RSXD5FVa/X/H2fudPn8HyjwMPg/WV/nG+Or////////yH5BAEA'+
  'AB8ALAAAAAAQABAAAAV+4CeOZGmepKeubKtmkjTMA7YsD8c5qgT8wCDAwPMMAJvJ4dBoXBIJhICg'+
  'Ok6UzQugUkEoqB4NYPJ4RGYJhcILUWEAyywUgWAI2p5F4WA+D+gMdhYqHQVZT4CBBYMeHAYFBQKS'+
  'kwIFBhQqDwGbDg4EBBAQFhYURS6nKiiqqyUhADs=';

// http://www.famfamfam.com/lab/icons/mini/icons/comment_new.gif

var img_comment = 'data:image/gif;base64,'+
  'R0lGODlhEAAQANUqALHX/HaZtrfa/Lrc/fL1+V13lcDf/Vpwiejz/rTZ/O72/4GnwmF8m362N4S8'+
  'O4/EROr0//z9/pa805XJSEhacZLHR2eHp+fz/onAP5DFRZbKSubv9/n6/IC4OIvAQHqzM5fLS77e'+
  '/ZvN/OLq9KvU+6TR+3KsLVNle+zx9////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
  'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACoALAAAAAAQABAAAAaMQJUq'+
  'RUwJj8hjymQqOo3CImhSXCwCAQt0qak8MM0IYTMaFYzLjMfRMEEMhlBoRGA4Ox+FAhEaCEIABGcp'+
  'EksmCnF+CQAkgkQLHAgIFwKLJCQlJSMHRAEofQKMmCUiIiMnnSiKjJmlpqhDniizsyIls7BRDAwF'+
  'BwcnuBRQSk/AuUlJKSfHyEjKw83Ow0EAOw==';


function clickListener(ev) {
  function buildBox(respond) {
    // They clicked on the respond link!
    console.log("");
    console.log("USER CLICKED RESPOND");

    var c = respond.parentNode.parentNode;
    console.log ("comment classname: ", c.className);

    if (c.className == "idt-built-form") {
      console.log("Class already exists");
      var box = $x(".//ul[contains(@class,'idt-comment-ninja-input')]", c);
      if (box.length > 0) {
	console.log("found box, style is: "+box[0].style.display);
	if (box[0].style.display == "block") {
	  // Already open, so close.
	  box[0].style.display = "none";
	}
	else {
	  box[0].style.display = "block";
	  box[0].focus();
	}
      }
      else {
	console.log("warning: could not find box: "+c.innerHTML);
      }
    }
    else {


      // ANALYZE DATA AND STORE

      var c_name = $x(".//p/strong", c)[0].textContent;
      console.log("name: "+c_name);

      var c_email = $x(".//p/a", c)[0].textContent;
      console.log("comment: "+c.innerHTML);
      console.log("email: "+c_email);

      var post_link = $x(".//p[last()]/a[last()]", c)[0];

      var c_link = post_link.href;
      console.log("link: "+c_link);

      var c_id = c.id; 
      console.log("c_id: "+c_id);

      var c_post = post_link.innerHTML;
      console.log("post: "+c_post);

      var data_parent = document.createElement('li');
      data_parent.className = 'idt-cn';
      var data_store = document.createElement('ul');
      data_store.className = 'idt-cn';
      data_parent.appendChild(data_store);

      // Store the data used for the comment responders
      var data1 = document.createElement('li');
      data1.id = "idt-cn-name";
      data1.className = "idt-data";
      data1.innerHTML = c_name;
      data_store.appendChild(data1);

      var data2 = document.createElement('li');
      data2.id = "idt-cn-email";
      data2.className = "idt-data";
      data2.innerHTML = c_email;
      data_store.appendChild(data2);

      var data3 = document.createElement('li');
      data3.id = "idt-cn-link";
      data3.className = "idt-data";
      data3.innerHTML = c_link;
      data_store.appendChild(data3);

      var data4 = document.createElement('li');
      data4.id = "idt-cn-respond";
      data4.className = "idt-data";
      data4.innerHTML = c_id;
      data_store.appendChild(data4);

      var data5 = document.createElement('li');
      data5.id = "idt-cn-post";
      data5.className = "idt-data";
      data5.innerHTML = c_post;
      data_store.appendChild(data5);

      // Create an input form
      var ul = document.createElement('ul');
      ul.className = "idt-comment-ninja-input";
      ul.style.display = "block";

      var li = document.createElement('li');
      var p1 = document.createElement('p');
      p1.innerHTML = "Don't worry about addressing the commenter or referring to their comment... that is handled for you.";
      var ta = document.createElement('textarea');
      ta.setAttribute('rows', 6);
      ta.setAttribute('cols', 80);
      var p2 = document.createElement('p');
      p2.innerHTML = "Respond by: ";

      var post_email = document.createElement('a');
      //post_email.addEventListener("click", sendPostAndEmail, false);
      post_email.setAttribute("idt", "sendPostAndEmail");
      post_email.title = "Click to send response as a blog comment and by email";
      post_email.innerHTML = "<img class='idt-fix-height' src='"+img_comment+"' /><img class='idt-fix-height' src='"+img_email+"' /> Email and Comment";
      post_email.href = "javascript:;";

      var email = document.createElement('a');
      email.innerHTML = "<img class='idt-fix-height' src='"+img_email+"' /> Email";
      //email.addEventListener("click", sendEmailAndClose, false);
      email.setAttribute("idt", "sendEmailAndClose");
      email.title = "Click to send response as an email";
      email.href = "javascript:;";

      var post = document.createElement('a');
      post.innerHTML = "<img class='idt-fix-height' src='"+img_comment+"' /> Comment";  
      //post.addEventListener("click", sendPostAndClose, false);
      post.setAttribute("idt", "sendPostAndClose");
      post.title = "Click to send response as a blog comment";
      post.href = "javascript:;";

      var close = document.createElement('a');
      //close.addEventListener("click", closeBox, false);
      close.setAttribute("idt", "closeBox");
      close.innerHTML = "<img class='idt-fix-height' src='"+img_close+"' /> Close";
      close.title = "Click to close response box";
      close.href = "javascript:;";

      // Connect the input form
      ul.appendChild(data_parent);
      ul.appendChild(li);
      li.appendChild(p1);
      insertAfter(ta, p1);
      insertAfter(p2, ta);
      // Be smart. Only add the email option if you have an email address.
      if (isEmail(c_email)) {
	console.log(c_email+" is an email address");
	p2.appendChild(post_email);
	insertAfter(post, post_email);
	insertAfter(email, post);
	insertAfter(close, email);
	var txt = document.createTextNode(" | ");
	insertAfter(txt, email);
	var txt3 = document.createTextNode(" | ");
	insertAfter(txt3, post_email);
      }
      else {
	console.log(c_email+" is NOT an email address");
	p2.appendChild(post);
	insertAfter(close, post);
      }
      var txt2 = document.createTextNode(" | ");
      insertAfter(txt2, post);

      // Append the input form to the comment
      insertAfter(ul, c.lastChild);

      c.className = "idt-built-form";

      ta.focus();
    }
  }

  function sendPostAndClose(ev) {
    sendPost(ev);
    respondedAndCloseBox(ev);
  }

  function sendPost(ev) {
    var box = getBox(ev);
    var data_store = box.childNodes[0].childNodes[0];
    var c_name    = data_store.childNodes[0].innerHTML; 
    var c_email   = data_store.childNodes[1].innerHTML; 
    var c_link    = data_store.childNodes[2].innerHTML;
    var c_id      = data_store.childNodes[3].innerHTML;
    var c_post    = data_store.childNodes[4].innerHTML;
    var response  = box.childNodes[1].childNodes[1].value;
    console.log("%s: name: %s, email: %s, link: %s, id: %s", "sendPost", c_name, c_email, c_link, c_id);

    var body = '@<a href="'+c_link+'#'+c_id+'">'+c_name+"</a>:\n\n"+response;

    statusObj.display('Posting comment ... ');
    GM_openInTab(c_link+"#respond?wp-comment-ninja="+escape(body));
    //sendPostBackground(c_link, body);
  }

  function testPostComment() {
    statusObj.display('Testing posting a comment ... ');
    var links = $x("//ol[contains(@id,'the-comment-list')]/li/p[last()]/a[last()]");
    console.log(links);
    if (links.length > 0) {
      var c_link = links[0].href;
      var body = "This is a test comment from <a href='http://InternetDuctTape.com/tools'>WordPress Comment Ninja</a> sent by the blog administrator";
      GM_openInTab(c_link+"#respond?wp-comment-ninja="+escape(body));
      statusObj.display("Comment posted!");
      alert("There is a new tab with the test comment. Take a look.");
    }
    else {
      statusObj.display("Couldn't post a comment!");
      alert("WordPress Comment Ninja encountered an error when trying to post a test comment");
    }
    statusObj.fadeOff();
  }



  function sendEmailAndClose(ev) {
    sendEmail(ev);
    respondedAndCloseBox(ev);
  }

  function sendEmail(ev) {
    var box = getBox(ev);
    var data_store = box.childNodes[0].childNodes[0];
    var c_name    = data_store.childNodes[0].innerHTML; 
    var c_email   = data_store.childNodes[1].innerHTML; 
    var c_link    = data_store.childNodes[2].innerHTML;
    var c_id      = data_store.childNodes[3].innerHTML;
    var c_post    = data_store.childNodes[4].innerHTML;
    var response  = box.childNodes[1].childNodes[1].value;
    console.log("%s: name: %s, email: %s, link: %s, id: %s", "sendEmail", c_name, c_email, c_link, c_id);

    var to = c_email;

    var subject = 're: '+c_post;

    var body = c_name+",\n\n"+response+"\n\nClick to respond:\n"+c_link+"#respond\n\nYour original comment:\n"+c_link+"#"+c_id+"\n\nSent by WordPress Comment Ninja\nhttp://internetducttape.com/tools/wordpress/wordpress-comment-ninja/\n";
  
    if (WPCN_USE_GMAIL) {
      console.log("Using Gmail mobile, to: %s, subject: %s, body: %s", to, subject, body);
      startGmailMobile(to, subject, body);
    }
    else {
      console.log("Using Mailto, to: %s, subject: %s, body: %s", to, subject, body);
      openMailtoTab(to, subject, body);
    }
  }

  function sendPostAndEmail(ev) {
    sendPost(ev);
    sendEmail(ev);
    respondedAndCloseBox(ev)
      }

  function respondedAndCloseBox(ev) {
    var box = getBox(ev);
    var responded = document.createElement('p');
    responded.innerHTML = "<i>Responded to this post.</i>";
    box.parentNode.appendChild(responded);
    statusObj.displayOff();
    closeBox(ev);
  }

  function closeBox(ev) {
    var box = getBox(ev);
    box.style.display = "none";
    statusObj.fadeOff();
  }

  function getBox(box) {
    var p = box;
    while (p.className != 'idt-comment-ninja-input') {
      p = p.parentNode;
    }
    return(p);
  }

  function testSendEmail() {
    console.log("testGmailMobile()");
    // little bit of email obsfucation
    var to = "eng"+"technology";
    to += "@";
    to += "gmail";
    to += ".c";
    to += "om";

    var subject = "Testing WordPress Comment Ninja Email Send";

    var body = "This is a test message from http://"+document.location.hostname+"   Please ignore.";

    startGmailMobile(to, subject, body);

    statusObj.fadeOff();
  }


  var type = ev.target.getAttribute("idt");
  if (type) {
    console.log("user clicked on ", type);
    if (type == "buildBox") {
      buildBox(ev.target.parentNode);
    }
    if (type == "buildBoxImg") {
      buildBox(ev.target.parentNode.parentNode);
    }
    else if (type == "closeBox") {
      closeBox(ev.target.parentNode);
    }
    else if (type == "sendPostAndEmail") {
      sendPostAndEmail(ev.target.parentNode);
    }
    else if (type == "sendPostAndClose") {
      sendPostAndClose(ev.target.parentNode);
    }
    else if (type == "sendEmailAndClose") {
      sendEmailAndClose(ev.target.parentNode);
    }
    else if (type == "testPostComment") {
      testPostComment();
    }
    else if (type == "testSendEmail") {
      testSendEmail();
    }
  }
}

/*--------------------------------------------------------------------
  Common Utility Functions
  --------------------------------------------------------------------*/

function insertAfter(newNode, node) {
  // var link = document.getElementById("the_link");
  // var icon = document.createElement("img");
  // icon.src = "…";
  // insertAfter(icon, link);
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

var reEmail = /^.+\@.+\..+$/

  function isEmail (s) {   
  return reEmail.test(s)
}

  function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
  }

// Make a toggle menu item
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // The first argument is the key used with GM_get/setValue and is also the variable which will hold the current value. 
  // The second argument is the default value.
  // The third and fourth arguments are the text to be displayed in the menu for toggling on and toggling off, respectively. 
  // The fifth argument is an optional prefix for those menu items.
  // Only one menu command is added, that will toggle the option. 
  // Page will reload when toggle is called.
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
			   GM_setValue(key, !window[key]);
			   location.reload();
			 });
}

function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  // Update code from Junk Blocker: http://loonyone.livejournal.com/
  // usage example
  // autoUpdateFromUserscriptsDotOrg({
  //   name: 'RSS+Atom Feed Subscribe Button Generator',
  //   url: 'http://userscripts.org/scripts/source/688.user.js',
  //   version: "1.2",
  // });
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.

    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

    GM_xmlhttpRequest({
      method: 'GET',
	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  onload: function(result) {
	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	  var theOtherVersion = parseFloat(RegExp.$1);
	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	  }
	}
      });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}