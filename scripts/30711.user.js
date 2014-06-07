// ==UserScript==
// @name           derStandard.at 2.0
// @namespace      http://blog.sebmos.com/
// @description    Verbessert und modernisiert die Kommentar-Funktion von derStandard.at
// @include        http://derstandard.at/?*
// @include        http://diestandard.at/?*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
	  "a.GM_rate		{ display: block; float: right; margin: 0px 5px 1px 0px; width: 13px; height: 12px; }"
	+ "a.GM_rate img	{ border: 0px; }"
	+ "a.GM_rate img.active	{ display: none; }"
	+ "a.GM_rate:hover img	{ display: none; }"
	+ "a.GM_rate:hover img.active	{ display: inline; }"
	+ "div.GM_new_post_container	{ font-size: 13px; max-width: 486px; margin-bottom: 10px; }"
	+ "textarea.GM_new_post	{ width: 100%; height: 250px; margin: 3px 0px; }"
	+ "input.GM_post_title	{ width: 100%; }"
	+ "input.GM_button	{ float: right; font-weight: bold; background-color: #7B9999; border: 1px solid #093875; color: #093875; font-size: 11px; padding: 3px 5px; }"
	+ "span.GM_char_counter	{ display: block; padding: 3px 0px; font-size: 13px; }"
	+ "div#GM_message_box	{ position: fixed; top: 30px; left: 30px; width: 672px; padding: 20px; background: #000; color: #FFF; font-family: sans-serif; font-size: 18px; font-weight: bold; opacity: 0.0; text-align: center; -moz-border-radius: 15px; z-index: 99999; }"
	+ "div.GM_post_options	{ margin-bottom: 3px; }"
	+ "a.GM_post_options	{ float: right; margin: 3px 10px; }"
	+ "div#GM_comments_loading	{ text-align: center; margin: 30px 0px; width: 486px; font-weight: bold; font-size: 12pt; }"
);

document.GMderStandard = {};

/*
 * Resources
 */
document.GMderStandard.resources = new Array();
document.GMderStandard.resources["postForm_data"] = new Array();
document.GMderStandard.resources["newPost_postIDs"] = new Array();
document.GMderStandard.resources["ratePost_postIDs"] = new Array();
document.GMderStandard.resources["message_box_timeout"] = false;
document.GMderStandard.resources["arrow_2"] = "data:image/gif,GIF89a%0D%00%0C%00%91%00%00%FF%FF%FF%00%9A0%01%2Cr%00%2Bq!%F9%04%04%14%00%FF%00%2C%00%00%00%00%0D%00%0C%00%00%02%23%9C%8E%89%C0%EDp%5Ex%B1%85%EB*%C0%98U%BEM%90%C0L%97%E9%91%A5)%8E%AB%25~R%FA%D4%CA%8D%14%00%3B";
document.GMderStandard.resources["arrow_2_active"] = "data:image/gif,GIF89a%0D%00%0C%00%B3%00%00%FF%FF%FF%E2%F4%E7%CF%EC%D8%C8%EA%D2%AD%DF%BC%99%D7%AC%8E%D2%A3o%C6%8A%60%C0~O%B9pK%B8m%00%9A0%01%2Cr%00%2Bq%00%00%00%00%00%00!%F9%04%04%14%00%FF%00%2C%00%00%00%00%0D%00%0C%00%00%04%3D%B0%B1I%2B%05%18%04%122%98Y%60%2CF%87%81%DA%B8%90%26(%AE%CAZ~%0CP%AC%C9%92%2F%05m%EB%2B%60%0F4%40%AC%0E%2B%C4%C0w%23%09T%C3%DAm%F6%8Aj8!%ACeK%89%00%00%3B";
document.GMderStandard.resources["arrow_1"] = "data:image/gif,GIF89a%0D%00%0C%00%91%00%00%FF%FF%FF%00%9A0%01%2Cr%00%2Bq!%F9%04%04%14%00%FF%00%2C%00%00%00%00%0D%00%0C%00%00%02%1F%9C%8E%89%C0%EDp%9E%8C.%3C%CA%82vxoF%7D%C0%17%3E%16%24HW%AA6X%AB%C4H%01%00%3B";
document.GMderStandard.resources["arrow_1_active"] = "data:image/gif,GIF89a%0D%00%0C%00%B3%00%00%FF%FF%FF%E2%F4%E7%CF%EC%D8%AD%DF%BC%99%D7%AC%8E%D2%A3o%C6%8A%00%9A0%01%2Cr%00%2Bq%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%04%14%00%FF%00%2C%00%00%00%00%0D%00%0C%00%00%0430%A1I%2B%058k0u%18%81%D6aAq%14!6%96G%8B%AA%08%C0%1E%86%1Bv%84%2B%98%07%C1%C5%B9%17%CB%D7%F9%A4d%A0%DFf9Zf%2CPJ%04%00%3B";
document.GMderStandard.resources["arrow_0"] = "data:image/gif,GIF89a%0D%00%0C%00%91%00%00%FF%FF%FF%CF%00%00%01%2Cr%00%2Bq!%F9%04%04%14%00%FF%00%2C%00%00%00%00%0D%00%0C%00%00%02!%9C%8E%89%C0%EDp%9E%8C%D2%D1%F00%14%2Ch%E01%14%88%85%22%D7x%DF%96%3Dc%C5%C2%A7B%0B%05%00%3B";
document.GMderStandard.resources["arrow_0_active"] = "data:image/gif,GIF89a%0D%00%0C%00%B3%00%00%FF%FF%FF%FA%E2%E2%F6%CF%CF%F0%AD%AD%EC%99%99%EA%8E%8E%E4oo%CF%00%00%01%2Cr%00%2Bq%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%04%14%00%FF%00%2C%00%00%00%00%0D%00%0C%00%00%0430%A1I%2B%058k0%B7%EF%C1%10d%E1%D8%11G1%06%C5Ap%08%80%A6B%EB%C2%00%7B%1C%C6%AE%E29%5Bj%04%0C%0E3%1D%92H%93%F4%20-%D0I%04%00%3B";
document.GMderStandard.resources["loading"] = "data:image/gif,GIF89a%0C%00%0C%00%E6%00%00%FF%FF%FF%FD%FD%FD%FB%FB%FB%F9%F9%F9%F7%F7%F7%F5%F5%F5%F3%F3%F3%F0%F0%F0%EE%EE%EE%EC%EC%EC%EA%EA%EA%E8%E8%E8%E6%E6%E6%E4%E4%E4%E2%E2%E2%E0%E0%E0%DE%DE%DE%DC%DC%DC%DA%DA%DA%D8%D8%D8%D6%D6%D6%D3%D3%D3%D1%D1%D1%CF%CF%CF%CD%CD%CD%CB%CB%CB%C9%C9%C9%C7%C7%C7%C5%C5%C5%C3%C3%C3%C1%C1%C1%BF%BF%BF%BD%BD%BD%BB%BB%BB%B9%B9%B9%B6%B6%B6%B4%B4%B4%B2%B2%B2%B0%B0%B0%AE%AE%AE%AC%AC%AC%AA%AA%AA%A8%A8%A8%A6%A6%A6%A4%A4%A4%A2%A2%A2%A0%A0%A0%9E%9E%9E%9B%9B%9B%99%99%99%97%97%97%95%95%95%93%93%93%91%91%91%8F%8F%8F%8D%8D%8D%8B%8B%8B%89%89%89%87%87%87%85%85%85%83%83%83%81%81%81~~~%7C%7C%7Czzzxxxvvvtttrrrpppnnnllljjjhhhfffdddaaa___%5D%5D%5D%5B%5B%5BYYYWWWUUUSSSQQQOOOMMMKKKIIIFFFDDDBBB%40%40%40%3E%3E%3E%3A%3A%3A888666444222000...%2C%2C%2C)))'''%25%25%25%23%23%23!!!%1F%1F%1F%1D%1D%1D%1B%1B%1B%19%19%19%17%17%17%15%15%15%13%13%13%11%11%11%0F%0F%0F%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%09%0A%00t%00%2C%00%00%00%00%0C%00%0C%00%00%07p%80tt%06%2CZp%82%00%00%82t%0CKnbZt%00%03%04%8A%06HrC%15%8A%00%02%07%05%00'g%3B%8A%8B%00%05%0B%04NX%10%8B%8B%02%0C%0C%60K%A5%AE%00%0F%13%5EH%B5%A6%11%17FM%0E%AE%82%04%18%15!U0%BC%00%14%22%0C%057T%2F%0C%89%08%1B*%18%02t%084J%3C1%2C-%2F%1D%04%8B%04%1C4%3F%3A)%12%DAt%81%00!%F9%04%09%0A%00t%00%2C%00%00%00%00%0C%00%0C%00%00%07o%80tt%05'PjmW%2C%06%82t%0AAbXQT%60qO%0B%83%3Eb%3B%12%00%00%15N_%82%22Y3%00%8Ct%07%01%A6BJ%0E%A7%8C%02%01Q%3E%A6%AF%83%05M%3B%B5%A7%00%07%088%3E%97%AF%01%0A%09%1AD%25%BBt%00%0A%11%06%03%2B%40%23%09%9D%06%10%18%0E%A6%07'7%2C%23%1E%1E%1D%11%02%8C%03%14%25%2C(%1B%0C%01%82%81%00!%F9%04%09%0A%00t%00%2C%00%00%00%00%0C%00%0C%00%00%07l%80tt%04!D%5B%5EL'%05%82t%086RKFHUfH%0B%832Q1%0F%00%00%12%3FoJ%07%1AH)%00%8Ct%00%3Dn%2B4%3A%0A%A8%82%12aY%3E0%A7%B1%00Wp%3A-%B8%B1%82*%2F%08%C0%9Dt%131%1A%BF%A9%03%04%00%02%1E-%18%06%9D%03%07%09%CE%83%1B%24%1C%15%11%0F%0E%07%BF%01%0D%18%1B%16%0E%05%B8%81%00!%F9%04%05%0A%00t%00%2C%00%00%00%00%0C%00%0C%00%00%07p%80tt%03%1A7LP%40%22%05%82t%06%2BB%3D%3A%3DIX%3E%0A%83'%3F'%0C%00%00%0F7a%40%06%147%20%00%8Ct%006b%26%26%2C%08%A8%82%10YQ-%23%A7%B1%00Qk*%A6%B1%A9Tn%1D%20%06%BF%15aX%0C%20%12%B8%8CHp%2C%01%13%1D%0F%03%82%9D!D%0Bt%02%10%16%0F%0B%07%05%02%00%02%8C%00%07%0D%0C%09%04%01%8C%81%00!%F9%04%09%0A%00t%00%2C%00%00%00%00%0C%00%0C%00%00%07h%80t%82%12(7%3B1%1A%82%8A%1D-%2B*-7D1%07%82%19%2B%1A%08%82%0B%2BM4t%0C%23%15%8A%8A%2CQ%20%17%1A%05%A3%82%0DIC%1A%14%AB%8AE%5B%17%11%B2%82I%5E%0F%10%02%B2%10VL%05%0F%94%AB%3Bf't%08%0B%04%00%82%14EqH%06%82%05%06%03%00%0CcpL%0C%A3%01%02%00%0D%5C%2C%D4t%81%00!%F9%04%09%0A%00t%00%2C%00%00%00%00%0C%00%0C%00%00%07p%80tt%01%0B%19%24(%23%12%02%82t%02%11%1C%1C%1B%1F%261%24%06t%00%0E%18%0F%05%00%00%07%1F%3B'%03%05%12%0A%00%8C%98!%3E%18%0B%0C%8B%A9t%0A%3A5%0A%09%A8%B1%008I%08%07%B8%A9%00%3CN%04%04%BF%8C%0EH%40%01%02%01%B93X!%98%00%16%1B%9E%13%3Cb%3D%05%82%1BdeVSZcA%0A%8C%09.YolR'%DBt%81%00!%F9%04%09%0A%00t%00%2C%00%00%00%00%0C%00%0C%00%00%07n%80tt%00%04%0C%14%17%15%0B%01%82%83%07%0D%0D%10%12%17%20%18%04%82%05%09%07%02%83%04%14'%1B%02%01%05%03%00%8C%83%17%2C%11%01%02%A5%A6t%07)%26%00%AD%AE%00)7%0E%0D%B4%8C%00-%3B%5Dc%14%AEt%0A81%2Cq%3F%BB%B6G%1A%06LsB%13%B3%101Q2%96%0CJiYLHMT7%08%8C%05)Ob%5EF%22%96t%81%00!%F9%04%09%0A%00t%00%2C%00%00%00%00%0C%00%0C%00%00%07o%80t%82%00%02%06%08%09%05%00%82t%02t%01%02%05%07%0A%10%0C%8D%0BC%1C%8B%8E%0A%15%0F%01%2CqH%9At%00%0D%1A%0AXb%15%A3t%04%1A%19nV%8A%A3%00%1B%23lS%B3%9A%00%1F(RZ%11%AC%07(%23'e8%BA%A4%1E4%13%06Be9%10%00%00%0C%26%3E%25%03t%0A%40ZK%3E%3B%3EA*%06%8B%05%23CRM8%1A%D9t%81%00%3B";

/*
 * General Functions
 */
document.GMderStandard.checkLoggedIn = function(r)
{
	if (r.responseText.indexOf("<b>derStandard.at</b> | <b>Login</b>") > -1)
	{
		alert("Sie sind zur Zeit nicht eingeloggt! Bitte loggen Sie "
			+ "sich ein, indem Sie auf \"Login/Registrierung\" "
			+ "in der Navigationsleiste an der unteren Seite des "
			+ "Fensters klicken!");
		
		return false;
	}
	
	return true;
};

document.GMderStandard.createMessage = function(message)
{
	var box = document.getElementById("GM_message_box");
	if (box)
	{
		window.clearTimeout(document.GMderStandard.resources["message_box_timeout"]);
	}
	else
	{
		box = document.createElement("div");
		box.setAttribute("id", "GM_message_box");
		document.getElementsByTagName("body")[0].appendChild(box);
		
		box = document.getElementById("GM_message_box");
	}
	
	box.innerHTML = message;
	
	box.style.opacity = "0";
	
	document.GMderStandard.fadeInMessage();
};

document.GMderStandard.fadeInMessage = function()
{
	var box = document.getElementById("GM_message_box");
	var opacity = box.style.opacity * 20;
	opacity++;
	
	if (opacity > 14)
	{
		document.GMderStandard.resources["message_box_timeout"] =
			window.setTimeout(
				document.GMderStandard.fadeOutMessage,
				4000
			);
		
		return;
	}
	
	box.style.opacity = opacity / 20;
	
	document.GMderStandard.resources["message_box_timeout"] =
		window.setTimeout(document.GMderStandard.fadeInMessage, 50);
};

document.GMderStandard.fadeOutMessage = function()
{
	var box = document.getElementById("GM_message_box");
	var opacity = box.style.opacity * 20;
	opacity--;
	
	if (opacity < 0)
	{
		box.parentNode.removeChild(box);
		return;
	}
	
	box.style.opacity = opacity / 20;
	
	document.GMderStandard.resources["message_box_timeout"] =
		window.setTimeout(document.GMderStandard.fadeOutMessage, 50);
};

document.GMderStandard.maxChars = function(e)
{
	var maxlength = 750;
	var element = document.getElementById(e.target.id);
	var input = element.value.length;
	
	if (input > maxlength)
	{
		element.value = element.value.substring(0, maxlength-1);
		input = maxlength;
	}
	
	document.getElementById("GM_new_post_"
		+ element.getAttribute("rel")
		+ "_counter").innerHTML = maxlength - input;
}

document.GMderStandard.init = function()
{
	/* Instant Ratings */
	// DEACTIVATED because server gives weird response
	if (true == false)
	{
    // Load Former Ratings
    var cookies = document.cookie.split(";");
    var already_rated = "";
    for (var i = 0; i < cookies.length; i++)
    {
      var c = cookies[i].replace(/^\s+|\s+$/g, '') ;
      
      if (c.length > 9 && c.substr(0, 9) == "GM_rating")
      {
        already_rated = " " + c.substr(10) + " ";
      }
    }
    // Load Rating Buttons
    var elements = document.evaluate(
      "//a[@title='Dieses Posting bewerten']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    for (var i = 0; i < elements.snapshotLength; i++)
    {
      var element = elements.snapshotItem(i);
      
      element = element.parentNode;
      
      var post_id = element.id;
      // last digit is box indicator (1 = ratings, 2 = report, etc.)
      post_id = post_id.substr(0, post_id.length - 1);
      
      if (already_rated.indexOf(" " + post_id + " ") > -1)
      {
        element.innerHTML = "Abgestimmt&nbsp;&nbsp;";
        continue;
      }
      
      document.GMderStandard.IRP.init(element);
    }
	}
	
	/* Instant Comments */
	// Load Commenting Buttons
	var elements = document.evaluate(
		"//a[@title='Auf dieses Posting antworten']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	for (var i = 0; i < elements.snapshotLength; i++)
	{
		var element = elements.snapshotItem(i);
		element.setAttribute("onclick", "return false");
		element.addEventListener(
			"click",
			document.GMderStandard.loadNewPostForm,
			false
		);
	}
	// Load Main New Comment Button
	// DEACTIVATED, because not detectable ATM
	if (true == false)
	{
    var elements = document.evaluate(
      "//area[@alt='Meinung posten']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    for (var i = 0; i < elements.snapshotLength; i++)
    {
      var element = elements.snapshotItem(i);
      element.setAttribute("onclick", "return false");
      element.addEventListener(
        "click",
        document.GMderStandard.loadNewPostForm,
        false
      );
    }
	}
	
	/* Infinite Comments Scrolling */
	// DEACTIVATED, because not working ATM
	if (true == false)
	{
    if (!document.GMderStandard.ICS.initialized)
    {
      var divs = document.evaluate(
        "//div[@class='paging Num']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      for (var i = 0; i < divs.snapshotLength; i++)
      {
        var e = divs.snapshotItem(i);
        
        // hide pages selector
        e.parentNode.style.display = "none";
        
        // remove text "1 to X postings" from info line
        if (e.parentNode.previousSibling)
        {
          var x = e.parentNode.previousSibling;
          if (x.innerHTML.indexOf("|") > 0)
          {
            x.innerHTML = x.innerHTML.substr(0,
              x.innerHTML.indexOf("|"));
          }
        }
        
        // if this is first link, load infinite scrolling stuff
        if (i == 0)
        {
          // count pages
          var pages = 0;
          for (var z = 0; z < e.childNodes.length; z++)
          {
            if (e.childNodes[z].tagName == "A")
              pages++;
          }
          
          // save pages to var
          document.GMderStandard.ICS.pages = pages;
          
          // load position where new comments are to be included
          var links = document.evaluate(
            "//a[@name='forumend']",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null
          );
          if (links.snapshotLength > 0)
          {
            // take last one and use later
            document.GMderStandard.ICS.forum_end =
              links.snapshotItem(
                links.snapshotLength - 1
              );
          }
          
          // start scrolling event handler
          window.addEventListener(
            "scroll",
            document.GMderStandard.ICS.scroll,
            false
          );
        }
      }
      document.GMderStandard.ICS.initialized = true;
    }
   }
};

/*
 * Infinite Comments Scrolling
 */
document.GMderStandard.ICS = {};

document.GMderStandard.ICS.initialized	= false;
document.GMderStandard.ICS.loading	= false;
document.GMderStandard.ICS.pages	= 0;
document.GMderStandard.ICS.pages_loaded	= 1;
document.GMderStandard.ICS.forum_end;

document.GMderStandard.ICS.scroll = function(e)
{
	// don't try if all comments have been
	// loaded
	if (document.GMderStandard.ICS.pages -
		document.GMderStandard.ICS.pages_loaded == 0)
		return;
	// don't try if already loading
	// something
	if (document.GMderStandard.ICS.loading)
		return;
	
	// calculate position from bottom in px
	var pos_from_bottom =
		  document.height
		- window.innerHeight
		- window.scrollY;
	
	// don't try if more than two 
	// screen heights away from bottom
	if (pos_from_bottom > window.innerHeight * 2)
		return;
	
	// start!
	document.GMderStandard.ICS.load();
};

document.GMderStandard.ICS.load = function()
{
	// set as loading
	this.loading = true;
	
	// increase number of loaded pages
	this.pages_loaded++;
	
	// set loading message on bottom of page
	var div = document.createElement("div");
	div.setAttribute("id", "GM_comments_loading");
	div.innerHTML = "Die nächsten Kommentare werden gerade geladen...";
	
	this.forum_end.parentNode.insertBefore(
		div,
		this.forum_end
	);
	
	var url = document.location.href;
	if (url.indexOf("&") > -1)
		url = url.substr(0, url.indexOf("&"));
	if (url.indexOf("#") > -1)
		url = url.substr(0, url.indexOf("#"));
	
	// send request for new comments
	GM_xmlhttpRequest({
		method:	'GET',
		url:	url
				+ "&_seite=" + (this.pages_loaded + 1)
				+ "&sap=2",
		onload: document.GMderStandard.ICS.process
	});
};

document.GMderStandard.ICS.process = function(r)
{
	var h = r.responseText;
	
	// go to start of comments table
	if (h.indexOf("<div id=\"community\">") == -1)
		return;
	h = h.substr(h.indexOf("<div id=\"community\">"));
	
	if (h.indexOf("<form") == -1)
		return;
	h = h.substr(h.indexOf("<form"));
	h = h.substr(h.indexOf(">") + 1);
	
	if (h.indexOf("<table") == -1)
		return;
	h = h.substr(h.indexOf("<table"));
	
	// cut off end of comments table
	if (h.lastIndexOf("<a name=\"forumend\"") == -1)
		return;
	h = h.substr(0, h.lastIndexOf("<a name=\"forumend\""));
	
	// create div to include after comments table
	var d = document.createElement("div");
	d.innerHTML = h;
	
	// load position where comments are to be included
	document.GMderStandard.ICS.forum_end.parentNode.insertBefore(
		d,
		document.GMderStandard.ICS.forum_end
	);
	
	// remove loading sign
	document.getElementById("GM_comments_loading")
		.parentNode.removeChild(
			document.getElementById(
				"GM_comments_loading"
			)
		);
	
	// set as not loading
	document.GMderStandard.ICS.loading = false;
	
	document.GMderStandard.init();
};


/*
 * Instant Rating
 */
document.GMderStandard.IRP = {};

document.GMderStandard.IRP.init = function(element)
{
	var post_id = element.id;
	// last digit is box indicator (1 = ratings, 2 = report, etc.)
	post_id = post_id.substr(1, post_id.length - 2);
	
	element.innerHTML = ""
		+ "<a href='JavaScript:void(0)' name='0' rel='rate_"
		+ post_id + "' "
		+ "title='unn&ouml;tig' class='GM_rate'><img src='"
		+ document.GMderStandard.resources["arrow_0"]
		+ "' alt='-' /><img src='"
		+ document.GMderStandard.resources["arrow_0_active"]
		+ "' alt='-' class='active' /></a>"
		+ "<a href='JavaScript:void(0)' name='1' rel='rate_"
		+ post_id + "' "
		+ "title='interessant' class='GM_rate'><img src='"
		+ document.GMderStandard.resources["arrow_1"]
		+ "' alt='+' /><img src='"
		+ document.GMderStandard.resources["arrow_1_active"]
		+ "' alt='+' class='active' /></a>"
		+ "<a href='JavaScript:void(0)' name='2' rel='rate_"
		+ post_id + "' "
		+ "title='brilliant' class='GM_rate'><img src='"
		+ document.GMderStandard.resources["arrow_2"]
		+ "' alt='++' /><img src='"
		+ document.GMderStandard.resources["arrow_2_active"]
		+ "' alt='++' class='active' /></a>"
		+ "";
	
	var children = document.evaluate(
		"//a[@rel='rate_" + post_id + "']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);
	
	for (var z = 0; z < children.snapshotLength; z++)
	{
		var child = children.snapshotItem(z);
		
		child.addEventListener(
			"click",
			function(e)
			{
				var post_id = e.target.parentNode.id;
				if (post_id == "")
					post_id = e.target.parentNode.parentNode.id;
				post_id = post_id.substr(1, post_id.length - 2);
				
				document.GMderStandard.ratePost(
					post_id,
					e.target.getAttribute("name"));
			},
			false
		);
	}
};

document.GMderStandard.ratePost = function(post_id, rating)
{
	// http://derstandard.at/?id=1216917890281&_pid=10176909
	var ref = document.location.href;
	ref = ref.substr(ref.indexOf("id=") + 3);
	if (ref.indexOf("&") > 0)
		ref = ref.substr(0, ref.indexOf("&"));
	
	var url = "http://" + document.location.hostname
		+ "/?page=postbewerten&postID=" + post_id
		+ "&ref=" + ref + "&act=send";
	
	document.GMderStandard.resources["ratePost_postIDs"].push(post_id);
	
	document.getElementById(post_id + "1").innerHTML =
		"<img src='" + document.GMderStandard.resources["loading"]
		+ "' alt='Lädt...' />";
	
	GM_xmlhttpRequest({
		method:	'POST',
		url:	url,
		headers:
		{
			'Content-type': 'application/x-www-form-urlencoded',
			'Referer': 'http://' + document.location.hostname
				+ '/?page=postbewerten&postID=' + post_id
		},
		data:	encodeURI("bewertung=" + rating),
		onload: function(r) {
			var post_id = document.GMderStandard.resources["ratePost_postIDs"][0];
			document.GMderStandard.resources["ratePost_postIDs"].shift();
			
			if (!document.GMderStandard.checkLoggedIn(r))
			{
				// re-set rating links
				document.GMderStandard.IRP.init(document.getElementById(post_id + "1"));
				
				return false;
			}
			
			document.getElementById(post_id + "1").innerHTML = "Abgestimmt&nbsp;&nbsp;";
			
			var cookies = document.cookie.split(";");
			var cookies_new = "";
			var already_rated = "";
			for (var i = 0; i < cookies.length; i++)
			{
				var c = cookies[i].replace(/^\s+|\s+$/g, '') ;
				
				if (c.length > 9 &&
					c.substr(0, 9) == "GM_rating")
				{
					already_rated = c.substr(10);
				}
				else
				{
					cookies_new += ";" + cookies[i];
				}
			}
			already_rated += " " + post_id;
			cookies_new = "GM_rating=" + already_rated + cookies_new;
			
			document.cookie = cookies_new;
			
			document.GMderStandard.createMessage("Die Bewertung "
				+ "wurde abgeschickt.");
		}
	});
};

/*
 * Instant Comments
 */
document.GMderStandard.loadNewPostForm = function(e)
{
	var p, post_id, rel;
	
	p = e.target;
	if (p.tagName == "AREA")
	{
		post_id = document.location.href;
		post_id = post_id.substr(post_id.indexOf("id=") + 3);
		if (post_id.indexOf("&") > -1)
		{
			post_id = post_id.substr(0, post_id.indexOf("&"));
		}
		
		rel = "ref";
		
		// move 2 nodes back
		for (var i = 0; i < 2; i++)
		{
			p = p.parentNode;
		}
		
		for (var i = 0; i < p.childNodes.length; i++)
		{
			if (p.childNodes[i].tagName == "MAP")
			{
				p = p.childNodes[i];
				break;
			}
		}
	}
	else
	{
		if (p.tagName != "A")
			p = p.parentNode;
		
		// get post ID
		p = p.parentNode;
		post_id = p.id;
		post_id = post_id.substr(1, post_id.length - 2);
		
		rel = "re";
		
		// move 9 nodes back
		for (var i = 0; i < 9; i++)
		{
			p = p.parentNode;
		}
	}
	
	var _box_id = "GM_new_post_" + post_id;
	
	if (document.getElementById(_box_id))
	{
		if (document.getElementById(_box_id + "_textarea").value != "" ||
			document.getElementById(_box_id + "_headline").value != "")
			return false;
		else
		{
			document.GMderStandard.closeNewPostBox(post_id);
			return false;
		}
	}
	
	var box = document.createElement("div");
	box.setAttribute("id", _box_id);
	box.setAttribute("class", "GM_new_post_container");
	
	if (p.nextSibling)
	{
		p.parentNode.insertBefore(box, p.nextSibling);
	}
	else
	{
		p.appendChild(box);
	}
	
	box.innerHTML = '<p style="text-align:center;">L&auml;dt...</p>';
	
	document.GMderStandard.resources["postForm_data"].push([post_id, rel]);
	
	GM_xmlhttpRequest({
		method:	'GET',
		url:	"http://" + document.location.hostname
			+ "/?page=post&" + rel + "=" + post_id,
		headers:
		{
			'Referer': document.location.href
		},
		onload: function(r)
		{
			if (!document.GMderStandard.checkLoggedIn(r))
			{
				var data = document.GMderStandard.resources["postForm_data"][0];
				document.GMderStandard.closeNewPostBox(data[0]);
				return false;
			}
			
			document.GMderStandard.createNewPostForm(r);
		}
	});
};

document.GMderStandard.createNewPostForm = function(r)
{
	var data = document.GMderStandard.resources["postForm_data"][0];
	document.GMderStandard.resources["postForm_data"].shift();
	
	var post_id = data[0];
	var rel = data[1];
	
	var _box_id = "GM_new_post_" + post_id;
	
	/* Load options */
	var options = "";
	
	var h = r.responseText;
	while (h.indexOf("<input") > -1)
	{
		h = h.substr(h.indexOf("<input") + 1);
		var input = h;
		input = input.substr(0, input.indexOf(">"));
		
		if (input.indexOf("type=\"checkbox\"") == -1)
			continue;
		if (input.indexOf("value=\"") == -1)
			continue;
		
		if (input.indexOf("checked") > -1)
			var checked = true;
		else
			var checked = false;
		
		var name = input.substr(input.indexOf("name=\"") + 6);
		name = name.substr(0, name.indexOf("\""));
		
		options += '<label><input type="checkbox" name="'
			+ name + '" value="1" '
			+ 'id="' + _box_id + '_' + name + '" ';
		if (checked)
			options += 'checked="checked" ';
		options += '/> ';
		switch (name)
		{
		case "ShowEmail":
			options += "Email-Adresse &ouml;ffentlich anzeigen (nicht "
				+ "empfohlen!)";
			break;
		case "SendAllPostings":
			options += "Alle Kommentare zu diesem Artikel per "
				+ "E-Mail-Adresse erhalten";
			break;
		case "SendReactions":
			options += "Alle Antworten auf meinen Kommentar per "
				+ "E-Mail erhalten";
			break;
		case "ShowVisitCard":
			options += "Meine Visitenkarte anzeigen";
			break;
		case "ShowAllPostings":
			options += "Ich bin damit einverstanden, dass alle "
				+ "meine Postings abrufbar sind";
			break;
		}
		options += '</label><br />';
	}
	
	var box = document.getElementById(_box_id);
	
	box.innerHTML = '<input type="text" name="uberschrift" maxlength="250" '
		+ 'class="GM_post_title" id="' + _box_id + '_headline" /><br />'
		+ '<textarea class="GM_new_post" '
		+ 'id="' + _box_id + '_textarea" '
		+ 'rel="' + post_id + '"></textarea>'
		+ '<div style="display:none;" id="' + _box_id + '_options" '
		+ 'class="GM_post_options">'
		+ options
		+ '</div>'
		+ '<input class="GM_button" '
		+ 'type="button" '
		+ 'value="posten" '
		+ 'rel="' + rel + "=" + post_id + '" '
		+ 'id="' + _box_id + '_button" />'
		+ '<a href="JavaScript:void(0)" onclick="'
		+ 'document.getElementById(\'' + _box_id + '_options\').style'
		+ '.display = \'block\';document.getElementById(\''
		+ _box_id + '_optionslink\').style.display = \'none\';" '
		+ 'class="GM_post_options" id="'
		+ _box_id + '_optionslink">Optionen</a>'
		+ '<span class="GM_char_counter"><span id="' + _box_id
		+ '_counter">750</span> Zeichen frei</span>';
	
	document.getElementById(_box_id + "_headline").focus();
	
	document.getElementById(_box_id + "_textarea").addEventListener(
		"keyup",
		document.GMderStandard.maxChars,
		false
	);
	document.getElementById(_box_id + "_textarea").addEventListener(
		"keydown",
		document.GMderStandard.maxChars,
		false
	);
	
	document.getElementById(_box_id + "_button").addEventListener(
		"click",
		document.GMderStandard.sendNewPost,
		false
	);
};

document.GMderStandard.sendNewPost = function(e)
{
	var post_id = e.target.getAttribute("rel");
	var rel = post_id.substr(0, post_id.indexOf("="));
	post_id = post_id.substr(post_id.indexOf("=") + 1);
	
	var referer = "http://" + document.location.hostname
		+ "/?page=post&" + rel + "=" + post_id;
	var url = referer + "&act=send";
	
	var _box_id = "GM_new_post_" + post_id;
	
	var text = document.getElementById(_box_id + "_textarea").value;
	var headline = document.getElementById(_box_id + "_headline").value;
	
	// change "&" character
	text = text.replace(/&/gi, '&amp;');
	headline = headline.replace(/&/gi, '&amp;');
	
	document.getElementById(_box_id + "_button").value =
		"Lädt...";
	document.getElementById(_box_id + "_button").disabled =
		true;
	
	document.GMderStandard.resources["newPost_postIDs"].push(post_id);
	
	var options = "";
	if (document.getElementById(_box_id + "_ShowEmail").checked)
		options += "&ShowEmail=1";
	if (document.getElementById(_box_id + "_SendAllPostings").checked)
		options += "&SendAllPostings=1";
	if (document.getElementById(_box_id + "_SendReactions").checked)
		options += "&SendReactions=1";
	if (document.getElementById(_box_id + "_ShowVisitCard").checked)
		options += "&ShowVisitCard=1";
	if (document.getElementById(_box_id + "_ShowAllPostings").checked)
		options += "&ShowAllPostings=1";
	
	GM_xmlhttpRequest({
		method:	'POST',
		url:	url,
		headers:
		{
			'Content-type': 'application/x-www-form-urlencoded',
			'Referer': referer
		},
		data:	encodeURI("kommentar=" + text + "&uberschrift=" + headline + options),
		onload: function(r) {
			if (!document.GMderStandard.checkLoggedIn(r))
				return false;
			
			var post_id = document.GMderStandard.resources["newPost_postIDs"][0];
			document.GMderStandard.resources["newPost_postIDs"].shift();
			
			document.GMderStandard.closeNewPostBox(post_id);
			
			document.GMderStandard.createMessage("Der Beitrag "
				+ "wurde abgeschickt.");
		}
	});
};

document.GMderStandard.closeNewPostBox = function(post_id)
{
	var box = document.getElementById("GM_new_post_" + post_id);
	box.parentNode.removeChild(box);
};

/*
 * Start derStandard.at 2.0
 */
document.GMderStandard.init();