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

*/

// --------------------------------------------------------------------
// ==UserScript==
// @name           Delicious Stumbles
// @namespace      http://internetducttape.com
// @description    Adds a link to del.icio.us that submits all links on the page to StumbleUpon
// @include        http://del.icio.us/*
// @include        http://*stumbleupon.com/submit?*
// @version        2.01
// ==/UserScript==

(function () {

  var su_logo = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAPcAAAAAAP///wBJkgBKkgpMjQpIhxZJfmWBnVhwiFhtggBSmwdOkCFUgQBZpQBZ'+
    'ogBWngBTnABUmwBUmABSlgBSlQFZpBZThwBiqgBepQBbowBcowBaogBcoAVdnwhZlmKFnwBuuABu'+
    'twBorQBlqgNssgVlqQZmqgpuswBvuAButgFzu2ybuaLN5yB7raLO6KLN5gFuqAh3sg2HxBB2qBeD'+
    'uRV4rR+AtE6bwqHS7J25yBF/tBeLwy+VxFOs11mx2W+32oOzyX/Q7a/j9pja7uP3/b/p8/j9/uz7'+
    '/fb9/vX9/u38/fj+/vr+/vv+/vr9/fz+/urs7P3+/vn++9/x5fX++Or98M/73Ov98Or977/0yur9'+
    '7sT4zGbcc3bhhILdjBPBIxS1Ihe7Jxq+KR/GLiLMMiHJMCHJMTzKShq6JyXGMSjANSzENg+2GCzF'+
    'NQPJCCDaJDTyOTjfPdD20c/10ADSAADRAADQAADPAADBAAC8AAC7AQC0AQCzAACsAAHQAQHFAgGs'+
    'AQLUAgK3AwO9BQXUBQnZCQvfDAvaCwrKDArCCwzFDA7fDhPoExnrGSjsKEfeR0PJQ3rbeoTrhHzO'+
    'fHXCdf7+/v39/fz8/Pv7+/r6+vn5+fj4+Pf39/b29vLy8vHx8erq6unp6ejo6OXl5ePj4+Dg4N/f'+
    '39bW1szMzMbGxsXFxcPDw8LCwq+vr66urqysrKmpqaioqJSUlJKSkpCQkIqKioiIiIeHh4aGhn5+'+
    'fnFxcXBwcP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALwALAAAAAAQABAA'+
    'AAj/AAMIDFDpkiZOnTptwlRpYABMBOVIisPI0KNIpD4xHFhpDpxGiwoFqkMHEapQmhp2dHSIkB87'+
    'de7c0TOFlahMleS8+fNljJkyZNzgyXMlxypQliYNyrLkyBElT6wI2oPlxQFUmSC1qdTjRAkTNyqh'+
    '6VOFBYNXmxKxoUJEiI8JLSqp6aPFBQVZnBQBStNlC5MaNiqt4YMFhwRbnCiJCQOGS5QZMZJ4OSPl'+
    'h4VbmqA0efLEyJAKDYIgcVKEBIJZmEbxoKEDRoQRGETI2MGhwC5YlT4BUREiBQgUIVBcULAAQa1U'+
    'ATSVWtHhwQYNGRxAIIAglytTBD2dcvXBg4ABBhLoF6rV6pQngZc8mVIVixYuXLNgpTLl6VJAADs=';

  function deliciousSubmitOneSUFromExtension () {
    // CODE FOR del.icio.us extension or direct url submit
    var su = document.createElement('a');
    su.id = "su";
    su.className = "su_submit";
    su.href = "javascript:;";
    su.target = '_blank';
    su.addEventListener("click", function(ev) {
			  su.href = getStumbleSubmit();
			}, false);
    var img = document.createElement('img');
    img.src = su_logo;
    su.appendChild(img);
    var text = document.createTextNode(' Submit to StumbleUpon');
    su.appendChild(text);

    GM_addStyle(".su_submit { border: 1px solid #fc0; border-left: 0; border-right:0; background-color: #ffc; margin-top: 10px; padding: 3px 10px;} .su_submit a { font-weight: bolder;}");

    var save = $x("//*[@id='suggestions']");
    if (save.length > 0) {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.colSpan = 2;
      tr.appendChild(td);
      td.appendChild(su);
      insertAfter(tr, save[0]);
    }
    else {
      var body = document.getElementsByTagName('body')[0];
      insertAfter(su, body);    
    }
  }

  function getStumbleSubmit () {
    var inputs = document.getElementsByTagName('input');
    var href = "";
    var title = "";
    var notes = "";
    var tags = "";
    for (var i=0; i<inputs.length; i++) {
      var input = inputs[i];
      if (input.id == "url") {
	href = input.value;
      }
      if (input.id == "description") {
	title = input.value;
      }
      if (input.id == "tags") {
	tags = input.value;
	tags = tags.replace(/\s/g, ",");
	tags = tags.replace(/,$/g, "");
      }
    }
    inputs = document.getElementsByTagName('textarea');
    for (var i=0; i<inputs.length; i++) {
      var input = inputs[i];
      if (input.id == "notes") {
	notes = input.value;
      }
    }
    var submit = "url="+escape(href)+"&title="+escape(title);
    var extra = "&notes="+escape(notes)+"&tags="+escape(tags);
    var stumble = "http://www.stumbleupon.com/submit?"+submit+extra;	
    return(stumble);
  }

  function deliciousAddLinksSU () {
    // CODE FOR del.icio.us

    GM_addStyle("a.su_submit:link { color: #9999FF !important;}");

    var lis = document.getElementsByTagName('li');
   
    for (var i=0; i<lis.length; i++) {
      var li = lis[i];
      if (li.className == "post") {
	var href = "";
	var title = "";
	var notes = "";
	var tags = "";
	var insert;
	for (var j=0; j<li.childNodes.length; j++) {
	  var child = li.childNodes[j];
	  if (child.className == "notes") {
	    notes = child.innerHTML;
	  }
	  else if (child.className == "desc") {
	    href = child.firstChild.href;
	    title = child.firstChild.text;
	  }
	  else if (child.className == "meta") {
	    for (var k=0; k<child.childNodes.length; k++) {
	      if (child.childNodes[k].className == "tag") {
		if (tags != "") {
		  tags += ",";
		}
		tags += child.childNodes[k].text;
	      }
	    }
	  }
	  else if (child.className == "commands") {
	    insert = child;
	  }
	}
	var submit = "url="+escape(href)+"&title="+escape(title);
	var extra = "&notes="+escape(notes)+"&tags="+escape(tags);
	var stumble = "http://www.stumbleupon.com/submit?"+submit+extra;	
      
	if (insert) {
	  var su = document.createElement('a');
	  su.id = "su";
	  su.className = "su_submit";
	  su.href = stumble;
	  su.target = "_blank";
	  var img = document.createElement('img');
	  img.src = su_logo;
	  su.appendChild(img);
	  var text = document.createTextNode(' stumble /');
	  su.appendChild(text);
	  insert.parentNode.insertBefore(su, insert);
	}
      }
    }
  }

  function deliciousSubmitAllSU () { 
    // CODE FOR del.icio.us
    var lis = document.getElementsByTagName('li');
   
    for (var i=0; i<lis.length; i++) {
      var li = lis[i];
      if (li.className == "post") {
	var href = "";
	var title = "";
	var notes = "";
	var tags = "";
	for (var j=0; j<li.childNodes.length; j++) {
	  var child = li.childNodes[j];
	  if (child.className == "notes") {
	    notes = child.innerHTML;
	  }
	  else if (child.className == "desc") {
	    href = child.firstChild.href;
	    title = child.firstChild.text;
	  }
	  else if (child.className == "meta") {
	    for (var k=0; k<child.childNodes.length; k++) {
	      if (child.childNodes[k].className == "tag") {
		if (tags != "") {
		  tags += ",";
		}
		tags += child.childNodes[k].text;
	      }
	    }
	  }
	}
	var submit = "url="+escape(href)+"&title="+escape(title);
	var extra = "&notes="+escape(notes)+"&tags="+escape(tags);
	var stumble = "http://www.stumbleupon.com/submit?"+submit+extra;	
	GM_openInTab( stumble );
      }
    }
  }

  function handleStumbleUpon () {
    // CODE FOR StumbleUpon
    var notes = "";
    var tags = "";

    // Decode notes and tags passed by URL
    var search = document.location.search;
    var pairs = search.split("&");
    for(var i=0; i<pairs.length; i++) {
      var fields = pairs[i].split("=");
      if (fields[0] == "notes") {
	notes = unescape(fields[1]);
      }
      if (fields[0] == "tags") {
	tags = unescape(fields[1]);
      }
    }
    // Fill in the form

    var form_index = 0;
    var form = document.getElementsByTagName("form")[form_index];
    if (form) {
      //      form.elements.namedItem("referer").value = form.elements.namedItem("url").value;
      form.elements.namedItem("commentText").value = notes;
      if (form.elements.namedItem("adult")) {
	// If the page already exists then you may not be asked to fill in this field.
	form.elements.namedItem("adult").value = "0";
	form.elements.namedItem("adult").checked = true;
      }
      // /html/body/div[3]/div/div/div/div/div/form/div/div/div/div[2]/ul
      // /html/body/div[3]/div/div/div/div/div/form/p[3]
      var autotags = $x(".//p[3]", form);
      if (autotags.length > 0) {	
	var tags = tags.split(',');
	tag_str = 'Delicious tags: ';
	tags.forEach(function(r) {
		       tag_str += "<a onclick=\"add_suggested_tag('"+r+"');\" href=\"javascript:void(0);\">"+r+"</a>, ";

		     });
	var p = document.createElement('p');
	p.innerHTML = tag_str;
	p.className = "fieldLabel textNoEm";
	insertAfter(p, autotags[0]);
      }
    }
    var button = $x("//*[@id='submit_button']");
    if(button.length > 0) {
      button[0].focus();
    }
  }


  // XPATH
  function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
  }



  // InsertAfter
  function insertAfter(newNode, node) {
    // var link = document.getElementById("the_link");
    // var icon = document.createElement("img");
    // icon.src = "…";
    // insertAfter(icon, link);
    return node.parentNode.insertBefore(newNode, node.nextSibling);
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

  autoUpdateFromUserscriptsDotOrg({
    name: 'Delicious Stumbles',
	url: 'http://userscripts.org/scripts/source/12274.user.js',
	version: "2.01",
	});


  if (document.location.host == "del.icio.us") {
    if (document.location.href.match(/^http:\/\/del.icio.us\/.*?\?url=/)) {
      deliciousSubmitOneSUFromExtension();
    }
    else {
      GM_addStyle("#idt-delicious-stumbles { border: 1px solid #fc0; border-left: 0; border-right:0; background-color: #ffc; margin-top: 10px; padding: 3px 10px;} #idt-delicious-stumbles a { font-weight: bolder;}");

      var div_array = document.getElementsByTagName('div');
      if (typeof( window[ 'div_array' ] ) != "undefined") {
	var start = document.getElementsByTagName('div')[0];
	var div = document.createElement('div');
	div.innerHTML = "<a href='http://InternetDuctTape.com' title='Visit InternetDuctTape to find more delicious scripts'>Delicious Stumbles</a>: Use <b>Tools >> Greasemonkey >> User Script Commands</b> to submit all bookmarks to StumbleUpon";
	div.id = "idt-delicious-stumbles";
	start.insertBefore(div, start.parentNode.nextSibling);
      }
      GM_registerMenuCommand('Submit del.icio.us bookmarks to StumbleUpon', deliciousSubmitAllSU);
      deliciousAddLinksSU();
    }
  }
  else if (document.location.host == "www.stumbleupon.com") {
    handleStumbleUpon();
  }
})();
