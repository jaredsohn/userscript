// ==UserScript==
// @name           Blog Comment Autofill
// @author         Shanti Braford http://onwebapps.com/
// @namespace      bca
// @description    Auto-fills your Name, Email and Website URL on Blogs
// @include        *
// ==/UserScript==

function getTypeOfBlog() {
  var metas = document.getElementsByTagName('meta');
  var generator = 'not_found';
  for (var i = 0; i < metas.length; i++) {
    var meta_name = metas[i].getAttribute('name');
    if (meta_name) {
      if (meta_name.toLowerCase() == 'generator') {
        generator = metas[i].getAttribute('content');
        break;
      }
    }
  }
  if (generator != 'not_found') {
    generator = generator.toLowerCase();
    if (generator.indexOf('wordpress') > -1) {
      generator = 'wordpress';
    } else if (generator.indexOf('typepad') > -1) {
      generator = 'typepad';
    }
  }
  return generator;
}

function giveFocus(id) {
  var textareas = document.getElementsByTagName("textarea");
	for(var i=0; i < textareas.length; i++) {
		if(textareas[i].id == id) {
			textareas[i].focus();
			break;
		}
	}
}

function autofillComment() {
	var author = GM_getValue('author');
	var email  = GM_getValue('email');
	var url    = GM_getValue('url');
	if(author == '') {
		author = prompt("What name should be used for comments?");
		author = author || '';
		GM_setValue("author", author);
	}
	if(email == '') {
		email = prompt("What email should be used for comments?");
		email = email || '';
		GM_setValue("email", email);
	}
	if(url == '') {
		url = prompt("What url should be used for comments?");
		url = url || '';
		GM_setValue("url", url);
	}
	var blog_type = getTypeOfBlog();
	
  //alert(blog_type);
  if (blog_type != 'not_found') {
    var warned = GM_getValue('warned');
    if (warned == '') {
      warned = 0;
    }
    if ((warned < 1) && ((author == undefined) || (email == undefined) || (url == undefined))) {
      alert("Author, Email or URL not set for Blog Comment Autofill Greasemonkey script.\n\nType 'about:config' into the URL address bar.\n\nFilter by 'bca'.  Doubleclick on the entries on the left to change your settings.");
  	  GM_setValue("warned", warned+1);
    }
    switch(blog_type) {
      case 'wordpress':
      	if(document.getElementById('author') && author != undefined) document.getElementById('author').value = author;
      	if(document.getElementById('email') && email != undefined) document.getElementById('email').value = email;
      	if(document.getElementById('url') && url != undefined) document.getElementById('url').value = url;
      	//giveFocus('comment');
      	break;
      case 'typepad':
      	if(document.getElementById('comment-author') && author != undefined) document.getElementById('comment-author').value = author;
      	if(document.getElementById('comment-email') && email != undefined) document.getElementById('comment-email').value = email;
      	if(document.getElementById('comment-url') && url != undefined) document.getElementById('comment-url').value = url;
      	//giveFocus('comment-text');
        break;
    }
  }
}

function firstRun() {
  var first_run = GM_getValue("firstrun");
  if (first_run == undefined) {
    GM_setValue("author", "");
    GM_setValue("email", "");
    GM_setValue("url", "");
    GM_setValue("firstrun", false);
  }
}

firstRun();
autofillComment();
