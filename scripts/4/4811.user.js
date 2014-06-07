// ==UserScript==
// @name          Flickr - People in this photo
// @namespace     http://jacobdehart.com/js/greasemonkey
// @description	  Tag a photo with flickr:user=username (replacing username with their actual flickr username) and this script will display a link to the user in the photo! It also displays a fancy little thumbnail image of the user
// @include       http://*flickr.com/*
// @exclude       http://*flickr.com/photos/tags/*
// @exclude       http://*flickr.com/photos/organize/*
// ==/UserScript==

/*
Updates
------
1st June 2007 added a "Photos of this user" menu item to user's buddy menus, when selected the user is 
              redirected to the flickr:user=username tag page for that user, but only if there are tagged photos available
*/

( function () {

  // function that will be added to the buddy menu
  unsafeWindow.viewimagesofthisuser=function(node) {
    if(node.getElementsByTagName("strong")[0])
      username=node.getElementsByTagName("strong")[0].innerHTML;
    else if (node.getElementsByTagName('p')[0].innerHTML.match(/^You are blocking/))
      username=node.getElementsByTagName('p')[0].innerHTML.split('You are blocking')[1];
    else
      alert('Error retrieving username, so cant display any photos of them, sorry :(');
    if(username) {

      var listener = {
        flickr_photos_search_onLoad: function(success, responseXML, responseText, params){
          if(success) {
            if(responseText.match(/rsp stat="ok"/)) {
              if(!responseText.match(/pages="0"/)) // if theres at least one photo available
                document.location.href='http://flickr.com/photos/tags/flickr:user=' + username;
              else
                alert('There are no photos available tagged with "flickr:user=' + username + '"');
            }
            else
              alert('error accessing the api');
          }
        }
      }; // end api listener
						
      unsafeWindow.F.API.callMethod('flickr.photos.search', { per_page:1,machine_tags:"flickr:user=" + username } , listener); //desc
    }
  } // end viewimagesofthisuser function

  // add new menu item "Photos of this user" to buddy icon menu
  photosofuserlink=document.createElement('a');
  photosofuserlink.setAttribute('class','block');
  photosofuserlink.setAttribute('id','user_photos_link');
  photosofuserlink.setAttribute('href','javascript:;');
  photosofuserlink.setAttribute('onclick','viewimagesofthisuser(this.parentNode.parentNode)');
  photosofuserlink.textContent='Photos of this User';

  buddymenuinpoint=document.getElementById('personmenu_contacts_link');
  if(buddymenuinpoint)
    buddymenuinpoint.parentNode.insertBefore(photosofuserlink,buddymenuinpoint.nextSibling);


// check if we are on a photo page
picid=unsafeWindow.page_photo_id;
if (!picid) 
  return;

//check for person tags
foundpeople = [];
if(!unsafeWindow.global_photos[picid])
  return;
for (i in unsafeWindow.global_photos[picid].tags_rawA) {
  uname='';
  if (unsafeWindow.global_photos[picid].tags_rawA[i].match(/flickr\:user=/i)) {
    uname=unsafeWindow.global_photos[picid].tags_rawA[i].split(/flickr\:user=/i)[1];
  }
 
  if (unsafeWindow.global_photos[picid].tags_rawA[i].match('person:')) {
    uname=unsafeWindow.global_photos[picid].tags_rawA[i].split('person:')[1];
  }
  if (uname) {
    foundpeople.push([uname]);
  }
}

// Person Object
flickr_Person = function(uname){
	this.getNSID = function(uname){
		self = this;
		return GM_xmlhttpRequest({
			method    : "GET",
			onload    : function(res){
				matches = res.responseText.match(/<user id="([0-9@N]+)"/);
				if(matches && (matches.length==2)){ // Found it!
					self.getInfo(matches[1],uname);
				}
			},
			url       : "http://www.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key="+unsafeWindow.global_magisterLudi+"&username="+uname
		});
	}
	this.getInfo = function(nsid,uname){
		self = this;
		return GM_xmlhttpRequest({
			method    : "GET",
			onload    : function(res){
				iconserver = res.responseText.match(/iconserver="([0-9]+)"/)[1];
				photosurl = res.responseText.match(/<photosurl>(.*)<\/photosurl>/)[1];
				self.buildLink(nsid,uname,iconserver,photosurl);
			},
			url       : "http://www.flickr.com/services/rest/?method=flickr.people.getInfo&api_key="+unsafeWindow.global_magisterLudi+"&user_id="+nsid
		});
	}
	this.buildLink = function(nsid,uname,iconserver,photosurl){
          try {  // handle whether flickrPM is installed or not
            pmlinks=unsafeWindow.makeLinks(nsid); // makeLinks is defined in flickr.pm.user.js 
          } 
          catch(e) {
            pmlinks='';
          }
	  this.dv = document.getElementById('person'+uname);
	  this.dv.innerHTML = '<table cellspacing="3" cellpadding="0" border="0"><tr><td><a href="'+photosurl+'"><img id="FriendBuddyIcon' + nsid + '" alt="view profile" class="FriendBuddyIcon" src="http://static.flickr.com/'+iconserver+'/buddyicons/'+nsid+'.jpg" width="24" height="24"></a></td><td>&nbsp;<a href="'+photosurl+'" class="plain">'+uname+'</a> ' + pmlinks + '</td></tr></table>';
          unsafeWindow.newbuddyfunction("FriendBuddyIcon" + nsid);	
	}
	this.getNSID(uname);
}

// Build Person Objects
if(foundpeople.length>0){
	otherdiv = document.getElementById('other_contexts_p');
	anotherdiv = document.getElementById('otherContexts_div');
	newdiv = document.createElement("DIV");
        if(!otherdiv)
	  anotherdiv.appendChild(newdiv);
        else
          otherdiv.parentNode.insertBefore(newdiv,otherdiv);
	newdiv.className = "TagList";
        newdiv.id = "peopleinphoto";
	newdiv.innerHTML = '<h4>People in this photo</h4>';
	for(i in foundpeople){
		newdiv.innerHTML += '<div style="height:22px;" id="person'+foundpeople[i][0]+'"></div>';
		new flickr_Person(foundpeople[i][0]);
	}

}

unsafeWindow.getObjectMethodClosure=function(object, method) {
  return function(arg) {
    return object[method](arg); 
  }
}

unsafeWindow.newbuddyfunction=function(theimgid){ //adds buddymenu to usericon
  // many thanks to mortimer? for the help with this part! :D
  imgs=document.getElementById(theimgid);
  if((imgs.getAttribute('id')) && (imgs.getAttribute('id').match('FriendBuddyIcon'))) {
    var bid = imgs.getAttribute('id').split('FriendBuddyIcon')[1];
    var img2 = unsafeWindow.document.getElementById('FriendBuddyIcon'+bid);
    img2.nsid = bid;
    imgs.addEventListener('mouseover',unsafeWindow.getObjectMethodClosure(unsafeWindow.document.getElementById('person_hover'),'icon_mouseover'),true);
    imgs.addEventListener('mouseout',unsafeWindow.getObjectMethodClosure(unsafeWindow.document.getElementById("person_hover"),'icon_mouseout'),true);

    var id="hover_img" + bid;
    if (!unsafeWindow.document.getElementById(id)) {  
      var new_img = document.createElement("IMG");
      new_img.id = id;
      new_img.nsid = bid;
      new_img.src = imgs.getAttribute('src');
      new_img.className = "person_hover_img";
      document.getElementById("person_hover_link").appendChild(new_img);
      var new_img2 = unsafeWindow.document.getElementById(id);
      new_img2.nsid = bid;
    }
  }
} // end new buddy function 


// if user is not logged in, no need to continue
tadid=document.getElementById('tagadder');
if(!tadid)
  return;

unsafeWindow.addusertag= function(form) {
  //alert(form.to_nsid[form.to_nsid.selectedIndex].value + ' ' + form.to_nsid[form.to_nsid.selectedIndex].textContent);
  if(form.to_nsid[form.to_nsid.selectedIndex].value !='' && form.to_nsid[form.to_nsid.selectedIndex].value!=0) {
    retval=unsafeWindow.tagrs_addTag(unsafeWindow.page_photo_id, "\"flickr:user=" + form.to_nsid[form.to_nsid.selectedIndex].textContent +'\"');
  }
  return false;
}

unsafeWindow.dspadduserform=function () {

 GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.flickr.com/messages_write.gne',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey - Add user to picture',
      'Referer': 'http://flickr.com/messages_write.gne',
    },
    onload: function(responseDetails) {
      //alert(responseDetails.responseStatus + ' ' + responseDetails.responseText )
       conselbox="<p><form action='' onSubmit='return addusertag(this);'><select id='conselbox' " + responseDetails.responseText.split("\<select")[1].split("\<\/select\>")[0] + "</select><input class='Butt' type='submit' value='Add User to Photo'></form></p>";
       document.getElementById('conseldiv').innerHTML=conselbox;
       //add current user
       document.getElementById('conselbox').options[1].value =unsafeWindow.global_nsid;
       document.getElementById('conselbox').options[1].textContent =unsafeWindow.global_name;
      }
    });
}

conseldiv=document.createElement('div');
conseldiv.setAttribute('id','conseldiv');
conseldiv.innerHTML="<p><A class='plain' href='javascript:;' onclick='dspadduserform();return false;'>Add a user to this photo</a></p>";
tadid.parentNode.insertBefore(conseldiv, tadid.nextSibling);

}) (); // end anonymous function

