// ==UserScript==
// @name      Flickr Photo Stream In Situ Permissions and Licensing
// @namespace   http://mrjoro.org/flickr/
// @description   Allows in situ settings of permissions and licensing on the flickr photo stream page without needing to jump to a new page.
// @include     http://www.flickr.com/photos/*
// @include     http://flickr.com/photos/*
// ==/UserScript==

// Version 0.13
// November 8, 2005
// Joseph Rozier
// http://mrjoro.org

// TO CHANGE THE COMMENT/METADATA PERMISSIONS, CHANGE THE perm_comment AND perm_addmeta VARS BELOW

// History
// 0.13 (November 8, 2005); now set comments/meta permissions to recommended levels instead of "only you"
// 0.12 (October 31, 2005); fixed typo that kept permissions change from working
// 0.11 (October 29, 2005): fixed post URL so that it will work with www.flickr.com as well as flickr.com, reset boxes after selection
// 0.10 (October 29, 2005): Original

// This work is licensed under the Creative Commons
// Attribution-NonCommercial License. To view a copy
// of this license, visit 
// http://creativecommons.org/licenses/by-nc/2.5/
// or send a letter to 
// Creative Commons, 559 Nathan Abbott Way, Stanford, California 94305, USA.

(function()
{
	var lastRequestCompleted = true;

	// a "class" to hold information about each photo on the page
	function PhotoDescription()
	{
		// the anchor ("a" element) for the permissions
		this.permAnchor = null;
		
		// the anchor ("a" element) for the license type; this may
		// be null if there is no license type (i.e. if the
		// permissions is set to be private)
		this.licAnchor = null;
		
		// the flickr id for the photo
		this.photoId = null;
		
		// an element that will be used to provide in-situ status
		this.insituStatus = null;
	};
	
	function setInsituStatusText(photoDesc,statusText)
	{
		photoDesc.insituStatus.innerHTML = statusText;
		photoDesc.insituStatus.style.display = "block";
	}


	function clearInsituStatusText(photoDesc)
	{
		photoDesc.insituStatus.style.display = "none";
		photoDesc.insituStatus.innerHTML = "";
	};
	
	
	// this will hold the descriptions for all of the photos on the page
	var photoDescriptions = new Array();
	
	// terrible, terrible... but this is a global variable to hold the
	// "current" photo under consideration (since we use callbacks)
	var currentPhoto;
	

	// ---------------- PERMISSIONS -----------------
	
	// this will display the permissions popup in the correct location;
	// the permissions anchors are modified to call this method
	// when the user clicks on them
	window.mrjoro_displayPermissionsSelection = function(index)
	{
		if(!lastRequestCompleted)
		{
			return;
		}
		
		lastRequestCompleted = false;
		
		currentPhoto = photoDescriptions[index];

		var left = getActualLeft(currentPhoto.permAnchor);
		var top = getActualTop(currentPhoto.permAnchor);

		permBox.setAttribute("style","position:absolute; border: 1px solid black; color:gray; top:" + top + "px;left:" + left + "px;");
		permBox.style.display = "block";
	};

	// this will just hide the permissions box; note the cancel
	// button in the permission popup will call this method
	window.mrjoro_cancelPermissionsSelection = function()
	{
		permBox.style.display = "none";
		mrjoro_resetPermissionSelection();
		lastRequestCompleted = true;
	};
	
	window.mrjoro_resetPermissionsSelection = function()
	{
		document.getElementById("permTypeSelect").value = -1;		
	}

	
	// this is called whenever the user has made a selection
	// in the permissions drop-down; note that currentPhoto
	// was set already
	window.mrjoro_requestToModifyPermissions = function()
	{
	

		// first, hide the box
		permBox.style.display = "none";
			
		// the permTypeSelect element was created in the
		// innerHTML above, and it will contain the
		// selection the user made in the drop-down box
		var permType = document.getElementById("permTypeSelect").value;

		mrjoro_resetPermissionsSelection();

		var is_public=0;
		var is_private=0;
		var is_friend=0;
		var is_family=0;
		
		if(permType == 0)
		{
			is_public = 1;
			is_private = 0;
			is_friend = 0;
			is_family = 0;
		}
		else
		{
			is_public = 0;
			is_private = 1;
			if(permType == 1)
			{
				is_friend = 1;
			}
			else if(permType == 2)
			{
				is_family = 1;
			}
			else if(permType == 3)
			{
				is_friend = 1;
				is_family = 1;
			}
		}
		

		setInsituStatusText(currentPhoto,"Please wait...");

		// make the request
		// we are making a post to the same page that the user would
		// have been on if they weren't using this script (photo_settings.gne),
		// so we have to pass in the parameters it is expecting
		window.mrjoro_xmlhttp = new XMLHttpRequest();

		// this provides the callback method

		window.mrjoro_xmlhttp.onreadystatechange=window.mrjoro_requestToModifyPermissionsResponseHandler;
		window.mrjoro_xmlhttp.open("POST","/photo_settings.gne",true);
		window.mrjoro_xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

		// for now, we will set the comments and notes permissions to
		// the recommended level (all flickr members can add comments, only
		// contacts can add notes and tags
		
		// comment permissions
		// only you (0)
		// your friends and/or family (1)
		// your contacts (2)
		// any flickr member (recommended) (3)
		var perm_comment = 3;
		
		// metadata permissions
		// only you (0)
		// your friends and/or family (1)
		// your contacts (recommended) (2)
		// any flickr member (3)
		var perm_addmeta = 2;

		// global_auth_hash is defined on the page by flickr; we pass it as the magic cookie
		var paramString = 
			"id="+currentPhoto.photoId+
			"&done=1&is_public=" + is_public +
			"&is_private=" + is_private + 
			"&is_friend=" + is_friend + 
			"&is_family=" + is_family + 
			"&perm_comment=" + perm_comment + 
			"&perm_addmeta=" + perm_addmeta + 
			"&magic_cookie=" + global_auth_hash + 
			"&Submit=Submit";
		window.mrjoro_xmlhttp.send(paramString);
	};		

	// called back by the system when making the XMLHttpRequest
	window.mrjoro_requestToModifyPermissionsResponseHandler = function()
	{
		// the XMLHttpRequest will callback to this method
		// several times; readyState 4 indicates it has
		// completed the request
		if(window.mrjoro_xmlhttp.readyState != 4)
		{
			return;
		}
		
		lastRequestCompleted = true;
		
		// if there was a problem making the request,
		// the HTTP status will not be 200
		if(window.mrjoro_xmlhttp.status != 200)
		{
			alert("Unable to complete request.");
			clearInsituStatusText(currentPhoto);
			return;
		}
		

		// this causes the page to refresh, which will
		// ensure that the user sees the accurate state
		// of the license types/permissions that flickr
		// sees
		location.reload();
		
		// we don't bother clearing the status text if we
		// are doing a reload, since it will be cleared
		// automatically
		
	};	


	// ---------------- LICENSE TYPE -----------------


	// this will display the license popup in the correct location;
	// the license anchors are modified to call this method
	// when the user clicks on them
	window.mrjoro_displayLicenseSelection = function(index)
	{
		if(!lastRequestCompleted)
		{
			return;
		}
		
		lastRequestCompleted = false;
		
		currentPhoto = photoDescriptions[index];

		var left = getActualLeft(currentPhoto.licAnchor);
		var top = getActualTop(currentPhoto.licAnchor);

		// position the license selection box near the original icon
		licenseBox.setAttribute("style","position:absolute; border: 1px solid black; color:gray; top:" + top + "px;left:" + left + "px;");
		
		// display the license selection box
		licenseBox.style.display = "block";
		
	};

	// this will just hide the license box; note the cancel
	// button in the license popup will call this method	
	window.mrjoro_cancelLicenseSelection = function()
	{
		licenseBox.style.display = "none";
		window.mrjoro_resetLicenseSelection();
		lastRequestCompleted = true;
	};
	
	window.mrjoro_resetLicenseSelection = function()
	{
		document.getElementById("licenseTypeSelect").value = -1;		
	}
	

	// this is called whenever the user has made a selection
	// in the license drop-down; note that currentPhoto
	// was set already	
	window.mrjoro_requestToModifyLicense = function()
	{
		licenseBox.style.display = "none";

		// licenseTypeSelect was created in the innerHTML for
		// the license popup; it will contain the value
		// the user selected for the license type (which were
		// chosen to match the license type values that flickr
		// understands
		var licenseType = document.getElementById("licenseTypeSelect").value;
		window.mrjoro_resetLicenseSelection();
		
		setInsituStatusText(currentPhoto,"Please wait...");

		// we make a post to the target used on the license selection
		// page, with the parameters the target is expecting
		window.mrjoro_xmlhttp = new XMLHttpRequest();
		window.mrjoro_xmlhttp.onreadystatechange=window.mrjoro_requestToModifyLicenseResponseHandler;
		
		window.mrjoro_xmlhttp.open("POST","/photo_license.gne",true);
		window.mrjoro_xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		window.mrjoro_xmlhttp.send("id="+currentPhoto.photoId+"&done=1&license="+licenseType+"&Submit=Submit");
		
	};

	// called back by the system when making the XMLHttpRequest
	window.mrjoro_requestToModifyLicenseResponseHandler = function()
	{
		// the XMLHttpRequest will callback to this method
		// several times; readyState 4 indicates it has
		// completed the request	
		if(window.mrjoro_xmlhttp.readyState != 4)
		{
			return;
		}

		lastRequestCompleted = true;

		
		// if there was a problem making the request,
		// the HTTP status will not be 200
		if(window.mrjoro_xmlhttp.status != 200)
		{
			alert("Unable to complete request.");
			clearInsituStatusText(currentPhoto);
			return;
		}

		// this causes the page to refresh, which will
		// ensure that the user sees the accurate state
		// of the license types/permissions that flickr
		// sees
		location.reload();

		// we don't bother clearing the status text if we
		// are doing a reload, since it will be cleared
		// automatically

	};
	


	// --------------- POPUP SETUP -------------		
	// we setup HTML for the permissions and the license type popups; note
	// that the onchange attribute of these callout to the appropriate
	// method (and that there is also a cancel)
	// it does not matter where we add these in the document because
	// they are styled as popups
	var permBox = document.createElement("div");
	permBox.innerHTML = "<select id='permTypeSelect' onchange='window.mrjoro_requestToModifyPermissions();'><option value='-1'>- Choose A Permission Type -</option><option value='0'>Public</option><option value='1'>Private, Friends</option><option value='2'>Private, Family</option><option value='3'>Private, Friends and Family</option><option value='4'>Private</option></select><input class='DeleteButt' value='CANCEL' onclick='window.mrjoro_cancelPermissionsSelection();' type='button'/>";
	document.body.appendChild(permBox);
	permBox.style.display = "none";	

	var licenseBox = document.createElement("div");
	licenseBox.innerHTML = "<select id='licenseTypeSelect' onchange='window.mrjoro_requestToModifyLicense();'><option value='-1'>- Choose A License -</option><option value='0'>None (All rights reserved)</option><option value='4'>Attribution License</option><option value='6'>Attribution-NoDerivs License</option><option value='3'>Attribution-NonCommercial-NoDervis License</option><option value='2'>Attribution-NonCommercial License</option><option value='1'>Attribution-NonCommercial-ShareAlike License</option><option value='5'>Attribution-ShareAlike License</option></select><input class='DeleteButt' value='CANCEL' onclick='window.mrjoro_cancelLicenseSelection();' type='button'/>";
	document.body.appendChild(licenseBox);
	licenseBox.style.display = "none";		

	
	// -------------- PHOTO DISCOVERY AND ANCHOR MODIFICATION ------------------
		

	// we need to find the permissions links and the license type links; we
	// want to change them so that instead of going to the indicated page,
	// they will call our javascript methods to popup the appropriate
	// selection box
	
	// finding these elements is a bit hacky, necessarily requiring us
	// to look at flickr's HTML and working back from there (this is
	// a problem inherent in Greasemonkey); if flickr ever changes their
	// photo pages, the following will most likely need to change
	
	// for the permission type, we want to find the anchors ("a" elements)
	// that have "Set privacy permissions for this photo" as the title,
	// but only those that have an img child (the ones with text should
	// remain unchanged... those are the "set privacy" text links)
	
	// note that the license typ is only displayed if the permissions
	// type is public... flickr does not let you set a license otherwise
	// so we will have the search for the license anchor within the
	// for loop below

	var imgNodesXpath = "//a[@title = 'Set privacy permissions for this photo']/img";
	var imgNodes = 
		document.evaluate( imgNodesXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for(var i=0; i<imgNodes.snapshotLength; i++)
	{
		// first, grab the id from the href in the
		// parent node (remember, we grabbed the img
		// element above, so the parent is the a element)
		var img = imgNodes.snapshotItem(i);
		var a = img.parentNode;

		photoDescriptions[i] = new PhotoDescription();
		photoDescriptions[i].permAnchor = a;

		var href = a.getAttribute("href");

		// grab the photo id from the href; it is the id in
		// the href, so we'll do a search for id= and then stop at
		// the ampersand 

		var idIndex = href.indexOf('id=');
		var startIndex = idIndex+3;
		var ampIndex = href.indexOf('&',startIndex);

		var photoId = href.substring(startIndex,ampIndex);
		
		photoDescriptions[i].photoId = photoId;

		// now, set the href to use our javascript instead
		a.setAttribute("href","javascript:window.mrjoro_displayPermissionsSelection(" + i + ");");

		// now, create an in situ status p element, which we can use
		// to say "Please wait" after the user makes a selection
		photoDescriptions[i].insituStatus = document.createElement("p");
		
		// put it after the paragraph containing the icons
		a.parentNode.parentNode.insertBefore(photoDescriptions[i].insituStatus,a.parentNode.nextSibling);
		photoDescriptions[i].insituStatus.style.display="none";

		// we also want to make the permissions adjustable
		// flickr has the following rules:
		// (1) permissions may only be set on public photos
		// (2) only those photos that have a cc license have
		// an icon and link on the photo stream page

		// so, we need to make sure to only add the ability
		// to change permissions based on if a photos is
		// public, and then we need to add a link if the
		// photo is not cc-licensed

		if(img.getAttribute("alt") == 'This photo is public')
		{
			// since it is public, we can modify licensing

			// if there is an a sibling to the a that has
			// an alt "This photo is licensed", then we
			// will just use that a... otherwise, we will
			// need to create a new a and add it as an
			// immediate sibling

			// get any a tags under the parent that contain
			// an img tag whose alt is "This photo is licensed"

			var licImgNodesXpath = "a/img[@alt = 'This photo is licensed']";
			var licImgNodes = 
				document.evaluate( licImgNodesXpath, a.parentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

			var hrefjs = "javascript:window.mrjoro_displayLicenseSelection(" + i + ");";
			if(licImgNodes.snapshotLength > 0)
			{
				// there is a license icon, so grab the
				// parent link and set the href
				var licImg = licImgNodes.snapshotItem(0);
				var licA = licImg.parentNode;
				licA.setAttribute("href",hrefjs);

				photoDescriptions[i].licAnchor = licA;
			}
			else
			{
				// we will need to create a link...
				var cLink = document.createElement("a");
				cLink.setAttribute("href",hrefjs);
				cLink.setAttribute("style","text-decoration:none");
				cLink.appendChild(document.createTextNode(" Â©"));
				a.parentNode.insertBefore(cLink,a.nextSibling);

				photoDescriptions[i].licAnchor = cLink;
			}
		}

	}

// ----------------- HELPER METHODS ------------

	// the following are convenience methods for finding the
	// actual location on the given element; since this
	// script is for Firefox, we just use Firefox's method
	// of determining this
	getActualLeft = function(e)
	{
		var cur = 0;

		while(e.offsetParent != null)
		{
			cur += e.offsetLeft;
			e = e.offsetParent;
		}

		return cur;
	};

	getActualTop = function(e)
	{
		var cur = 0;

		while(e.offsetParent != null)
		{
			cur += e.offsetTop;
			e = e.offsetParent;
		}

		return cur;
	};

		

})();	
