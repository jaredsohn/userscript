// ==UserScript==
// @author	Don Draper - http://promote-my-site.com
// @name	Twitter Friend Adder
// @description Adds some useful features to the twitter html interface
// If you're finding this useful, how about following lt_draper ?
// @include	http://twitter.com/*/followers*
// @include	http://twitter.com/*/friends*
// @include	http://twitter.com/friends*
// @include	https://twitter.com/*/followers*
// @include	https://twitter.com/friends*
// @include	https://twitter.com/*/friends*
// ==/UserScript==


var MAX_DUMP_DEPTH = 10;

function dumpObj(obj, name, indent, depth) {
       if (depth > MAX_DUMP_DEPTH) {
              return indent + name + ": <Maximum Depth Reached>\n";
       }

       if (typeof obj == "object") {
              var child = null;
              var output = indent + name + "\n";
              indent += "\t";
              for (var item in obj)
              {
                    try {
                           child = obj[item];
                    } catch (e) {
                           child = "<Unable to Evaluate>";
                    }

                    if (typeof child == "object") {
                           output += dumpObj(child, item, indent, depth + 1);
                    } else {
                           output += indent + item + ": " + child + "\n";
                    }
              }
              return output;
       } else {
              return obj;
       }
}

// Easy wrapper for the httpdrequest method in GM
function pms_get( call_method, call_url, cb ) {

		GM_xmlhttpRequest({
      method: call_method,
      url:call_url,
      headers:{
        "User-Agent":navigator.userAgent
      },
      onload:cb,
      onerror:function(details)
          {
						 GM_log("Error contacting Server: "+details);
          }
    });
}


var MutualsShown = 0;
var Cancel_Ops = 0;

// Query twitter API for mutual/non-mutual info
function ShowMutuals() {

	spans = document.getElementsByTagName('span');
	for (i=0; i < spans.length; i++) {
		 if ( /mutual-/.test(spans[i].id ) ) {
				spans[i].parentNode.removeChild( spans[i] );
		 }
	}

	spans = document.getElementsByTagName('a');
		 var td_parent
	for (i=0; i < spans.length; i++) {

		 //if (spans[i].className == 'url uid' && spans[i].rel=='contact') {
		 //if (spans[i].className == 'url' && spans[i].rel=='contact') {
		 td_parent=spans[i].parentNode;
        if (/twitter\.com/.test(spans[i].href) && td_parent.className == 'thumb vcard') {

				friend = spans[i].href.substr(spans[i].href.lastIndexOf('/')+1);
                    //GM_log("here we go:"+friend);
					iam = document.title.substr('Twitter / People '.length);
					iam = iam.substr(0, iam.indexOf(' '));
					url  = 'http://twitter.com/friendships/exists?user_a='+friend+'&user_b='+iam;
        	pms_get( 'GET', url , followed_info);
		 }
	}
}

function CancelAll() {
		GM_setValue("PMS_twfr_drop", 'not dropping');
	  GM_setValue("PMS_twfr_run", 'not running');
		Cancel_Ops = 1;
}


function DropAllNonMutuals() {

		GM_setValue("PMS_twfr_drop", 'dropping');
		DropNonMutuals(0);

}

function DropNonMutuals(i) {

	if (Cancel_Ops == 1) {
		GM_log("canceling");
		return;
	}


	// Check if we're running a mass drop and whether mutuals have already been done
	var running = GM_getValue("PMS_twfr_drop", 'not dropping');
	if ( i == 0 && running == 'dropping' && MutualsShown == 0 ) {
			ShowMutuals();
			MutualsShown = 1;
			// Give it a 10 second head start
      window.setTimeout(function (){DropNonMutuals(i)},10000,false);
			return;
	}


	spans = document.getElementsByTagName('span');


	if (i >= spans.length) {

		// If we're already running, then start on button 0
		if ( running == 'dropping' ) {

			 next = document.getElementById('pms_next');
			 if (next != null) {
			 		location.href = next.href;
			 }
		}

		return;
	}

		if ( /not_mutual-/.test(spans[i].id ) ) {

			 userid = spans[i].id.substr('non_mutual-'.length);
			 btnid = 'remove-btn'+userid;

			 button = document.getElementById(btnid);

 			 spans[i].parentNode.removeChild( spans[i] );

 			 evt=document.createEvent("MouseEvents");
 			 if(evt && evt.initMouseEvent) {
				evt.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
				button.dispatchEvent(evt);
 			 }
     window.setTimeout(function (){DropNonMutuals(i+1)},500,false);
		} else {
			DropNonMutuals(i+1);
		}


}

function friend_info( response ) {

	friend = response.finalUrl.substr( response.finalUrl.lastIndexOf('/')+1 );

	s1 = response.responseText.split('span id="following_count" class="stats_count numeric"');
	following_count = s1[1].substr(1, s1[1].indexOf("<")-1);

	s1 = response.responseText.split('span id="follower_count" class="stats_count numeric"');
	follower_count = s1[1].substr(1, s1[1].indexOf("<")-1);

	s1 = response.responseText.split('<span id="update_count" class="stat_count"');
	updates = s1[1].substr(1, s1[1].indexOf("<")-1);

 spans = document.getElementsByTagName('a');

	 for (i=0; i < spans.length; i++) {

		 td_parent=spans[i].parentNode;
		 hr_friend = spans[i].href.substr( spans[i].href.lastIndexOf('/')+1);
        if (/twitter\.com/.test(spans[i].href) && td_parent.className == 'thumb vcard' && hr_friend == friend) {
            tr_parent=td_parent.parentNode;
            userid=tr_parent.id.substr('user_'.length)
	 			// Label for the status
            sElement = document.createElement('span');


            // Label for the status
            sElement = document.createElement('span');
            sElement.innerHTML = '<br />&nbsp;Following: '+following_count+' Followers: '+follower_count+' Updates: '+updates+'&nbsp;';
            sElement.id = 'following-'+userid;
            //sElement.setAttribute("style","float:right");
            tags=td_parent.parentNode.getElementsByTagName('td');
            for (n=0; n<tags.length; ++n) {
                if (tags[n].className=='user-detail') {
                    tags[n].appendChild(sElement);
                    break;
                }
            }
            break;
        }
     }

 }

function followed_info( response ) {

	 friend = response.finalUrl.substr( response.finalUrl.indexOf('user_a=')+7 );
	 friend = friend.substr( 0, friend.indexOf('&user_b'));

	 spans = document.getElementsByTagName('a');
    var td_parent
	 for (i=0; i < spans.length; i++) {

		 td_parent=spans[i].parentNode;
		 hr_friend = spans[i].href.substr( spans[i].href.lastIndexOf('/')+1);
        if (/twitter\.com/.test(spans[i].href) && td_parent.className == 'thumb vcard' && hr_friend == friend) {
            tr_parent=td_parent.parentNode;
            userid=tr_parent.id.substr('user_'.length)
	 			// Label for the status
            sElement = document.createElement('span');

            if (response.responseText == 'true' ) {
                sElement.innerHTML = '&nbsp;(Mutual)&nbsp;';
                sElement.id = 'mutual-'+userid;
                sElement.setAttribute("style","float:right");
            } else {
                sElement.innerHTML = '&nbsp;(Not Mutual)&nbsp;';
                sElement.id = 'not_mutual-'+userid;
                sElement.setAttribute("style","float:right; color:red");
            }
            td_parent.appendChild(sElement);
					//button.innerHTML = sElement.innerHTML;
     			//divs[k].insertBefore(sElement, button.nextSibling);

          //pms_get( 'GET', 'http://twitter.com/users/show/'+friend+'.xml', friend_info );
          pms_get( 'GET', 'http://twitter.com/'+friend, friend_info );

		 			break;
		 	}

	 }
}

// Grab all the buttons for the followers
var fp = document.getElementsByTagName("button");

// Iterate through this function for each follow button on the page
function AddAllFollowers( j ) {

		//GM_log("add:"+j);
	// Turn off those pesky alerts, we don't care
document.location =
'javascript:function confirm(message) {' +
'return 1;'+
'}';

document.location =
'javascript:function alert(message) {' +
'return 1;'+
'}';

	if (Cancel_Ops == 1) {
		GM_log("canceling");
		return;
	}

		// Let future invocations know that we're already running
		GM_setValue("PMS_twfr_run", 'running');

		// If we're at the end of the page
		 if ( j == fp.length ) {

			// Look for the Next button
			nexttags = document.getElementsByTagName('a');
			for (i=0; i < nexttags.length; i++) {
				 if (nexttags[i].rel == 'me next') {
						break;
				 }
			}
			// Ok, we found it
			if (i < nexttags.length) {
				// Go to the next page
				document.location = nexttags[i].href;
				return;
			}
			// Otherwise, we didn't find a next button, so we're done.  Let the next invocation know.
		  GM_setValue("PMS_twfr_run", 'not running');
			return;
		 }

		 // Get the timing delay they've told us
		 waitval = document.getElementById('pms_wait').value;

		 // Multiply by 1000 because it's ms
		 waitval = waitval * 1000;

		 // If this button is a follow button
		 //if ( fp[j].innerHTML == 'follow' ) {
		 if ( fp[j].getAttribute('href') == '/friendships/create/' ) {
		//GM_log("okdd:"+j);

			// Send a mouse event to the button to make it happen
 			evt=document.createEvent("MouseEvents");
 			if(evt && evt.initMouseEvent) {
				evt.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
				fp[j].dispatchEvent(evt);
 			}

		 // Timeout for the wait, then try the next button
     window.setTimeout(function (){AddAllFollowers(j+1)},waitval,false);
		 } else {
				// This wasn't a follow button, so just skip to the next one without a wait
				AddAllFollowers(j+1);
		 }

		return;
}

// This is for the followers page
var hr = window.location.href;

if ( /followers/.test(hr) || ( /friends/.test(hr) && !/twitter.com\/friends/.test(hr) ) ) {

// Place our custom interface
ndivs = document.getElementsByTagName("h2");

// Somehow we must be on the wrong page is this is length zero, should not ever happen
if (ndivs.length > 0) {
		navdiv = ndivs[0];

    newElement = document.createElement('input');
		newElement.value = "Cancel";
		newElement.type = "button";
   	newElement.setAttribute("style","float:right");
		newElement.addEventListener("click", function() { CancelAll() }, false );
    navdiv.parentNode.insertBefore(newElement, navdiv);

// Add a button to add all friends to the page
    newElement = document.createElement('input');
		newElement.value = "Add All Followers";
		newElement.type = "button";
		newElement.addEventListener("click", function() { AddAllFollowers(0)	}, false );
    navdiv.parentNode.insertBefore(newElement, navdiv);

		// Input field for the wait
		waitElement = document.createElement('input');
		waitElement.value = "2";
		waitElement.type = 'text';
		waitElement.id = 'pms_wait';
		waitElement.size = 5;
    navdiv.parentNode.insertBefore(waitElement, navdiv);

		// Label for the wait
		sElement = document.createElement('span');
		sElement.innerHTML = '&nbsp;Delay in Seconds&nbsp;';
    waitElement.parentNode.insertBefore(sElement, waitElement);

}

	// Find out if we're already running
	var running = GM_getValue("PMS_twfr_run", 'not running');

	// If we're already running, then start on button 0
	if ( running == 'running' ) {
		AddAllFollowers(0);
	}

}


// This is for the friends page
if ( /twitter.com\/friends/.test(window.location.href) ) {

	// Turn off those pesky alerts, we don't care
document.location =
'javascript:function confirm(message) {' +
'return 1;'+
'}';

document.location =
'javascript:function alert(message) {' +
'return 1;'+
'}';


ndivs = document.getElementsByTagName("h2");

// Somehow we must be on the wrong page is this is length zero, should not ever happen
if (ndivs.length > 0) {
		navdiv = ndivs[0];

		// Find the next button
		nexts = document.getElementsByTagName('a');
		for (i=0; i < nexts.length; i++) {
			 if (nexts[i].rel == 'me next') {
				// Add the Button
    		newElement = document.createElement('a');
				newElement.id = 'pms_next';
				newElement.className = nexts[i].className;
				newElement.innerHTML = nexts[i].innerHTML;
				newElement.href = nexts[i].href;
   			newElement.setAttribute("style","float:right");
    		navdiv.parentNode.insertBefore(newElement, navdiv);
				break;
			 }
		}

    // Add a button to drop all non mutuals
    newElement = document.createElement('input');
		newElement.value = "Drop Non-Mutuals";
		newElement.type = "button";
   	newElement.setAttribute("style","float:right");
		newElement.addEventListener("click", function() { DropNonMutuals(0) }, false );
    navdiv.parentNode.insertBefore(newElement, navdiv);

    newElement = document.createElement('span');
   	newElement.setAttribute("style","float:right");
		newElement.innerHTML = '&nbsp;&nbsp;';
    navdiv.parentNode.insertBefore(newElement, navdiv);

    // Add a button to show mutuals/non-mutuals
    newElement = document.createElement('input');
		newElement.value = "Show Mutual Status";
		newElement.type = "button";
   	newElement.setAttribute("style","float:right");
		newElement.addEventListener("click", function() { ShowMutuals() }, false );
    navdiv.parentNode.insertBefore(newElement, navdiv);


    newElement = document.createElement('span');
   	newElement.setAttribute("style","float:right");
		newElement.innerHTML = '&nbsp;&nbsp;';
    navdiv.parentNode.insertBefore(newElement, navdiv);

    // Add a button to Drop All non-mutuals, everywhere
    newElement = document.createElement('input');
		newElement.value = "Drop ALL Non-Mutuals";
		newElement.type = "button";
   	newElement.setAttribute("style","float:right");
		newElement.addEventListener("click", function() { DropAllNonMutuals() }, false );
    navdiv.parentNode.insertBefore(newElement, navdiv);


    newElement = document.createElement('span');
   	newElement.setAttribute("style","float:right");
		newElement.innerHTML = '&nbsp;&nbsp;';
    navdiv.parentNode.insertBefore(newElement, navdiv);

    // Add a button to Drop All non-mutuals, everywhere
    newElement = document.createElement('input');
		newElement.value = "Cancel";
		newElement.type = "button";
   	newElement.setAttribute("style","float:right");
		newElement.addEventListener("click", function() { CancelAll() }, false );
    navdiv.parentNode.insertBefore(newElement, navdiv);

// There's a bug in Twitter's Remove Code that throws an error so that we can't click the button more than twice.
// Intercept their removeUser function and replace with a version that works.  It adds an element with an id of
// "block"+user_id so that there's something for their code to change the style on and it won't fail.
document.location = "javascript:function removeUser(user_id, screen_name, authenticity_token) {"+
"newElement = document.createElement('input');" +
"newElement.type = 'hidden';"+
"newElement.id = 'block'+user_id;" +
"document.body.insertBefore(newElement,document.body.firstChild);" +
" new Ajax.Request('/friendships/destroy/' + user_id + '?authenticity_token=' + authenticity_token, { "+
" asynchronous: true, " +
" evalScripts: true, " +
" onComplete: function(transport) { " +
" if (transport.responseText.match(/success/)) { " +
" new Ajax.Request('http://twitter.com/account/refresh_follow_control/'+user_id+'?action_taken=removed', {" +
" asynchronous: true, " +
" evalScripts: true, " +
" onComplete: null " +
" });" +
//" refresh_follow_control(user_id, 'removed'); " +
" } else { " +
" borked(); " +
" } " +
" } " +
" }); "+
"} ";

	// Find out if we're already running
	var running = GM_getValue("PMS_twfr_drop", 'not dropping');

	// If we're already running, then start on button 0
	if ( running == 'dropping' ) {
    window.setTimeout(function (){DropNonMutuals(0)},2000,false);
	}




}

}



