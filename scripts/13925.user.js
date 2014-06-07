// -----------------------------------------------------------------------------
//
// CC Extended Preferences
// Version 1.0
// 2007-11-15
// Copyright (c) 2007, loopinvariant, loopspam@gmail.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No Images in Signatures", and click Uninstall.
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          CC Extended Preferences
// @namespace     loopspam@gmail.com
// @description   Extends the preferences available to users on the ConquerClub Forums.  Extended preferences are added at the end of "My Profile/Preferences."
// @include       http://www.conquerclub.com/forum/*
// ==/UserScript==
//
// -----------------------------------------------------------------------------

// *****************************************************************************
// Class: Options
// Description: Interface for saving, loading, and updating persistent options
//    values.
// *****************************************************************************
function Options() {

  // ---------------------------------------------------------------------------
  // Option values.
  // ---------------------------------------------------------------------------
  this.version = 1;
  this.showAvatars = true;
  this.showSignatures = false;

  // ---------------------------------------------------------------------------
  // Test if the property is an option value.  Functions and variables that
  // start with an unerscore "_" are not considered to be options.
  // ---------------------------------------------------------------------------
  this.IsOption = function(aKey) {
    if((typeof this[aKey] == "undefined") || (aKey.substring(0,1) == "_") || (typeof this[aKey] == "function")) {
      return false;
    }
    return true;
  }

  // ---------------------------------------------------------------------------
  // Load the options.
  // ---------------------------------------------------------------------------
  this.Load = function() {
    for(var lKey in this) {
      if(this.IsOption(lKey)) {
	this[lKey] = GM_getValue(lKey, this[lKey]);
      }
    }

    // If the version number is older than current, update the data as
    // necessary.
    // (Future, put in a call chain to upgrade from 1 -> 2, 2 -> 3, etc.)
  };

  // ---------------------------------------------------------------------------
  // Save the options.
  // ---------------------------------------------------------------------------
  this.Save = function() {
    for(var lKey in this) {
      if(this.IsOption(lKey)) {
	GM_setValue(lKey, this[lKey]);
      }
    }
  };

  // Load the current version.
  this.Load();
}

// *****************************************************************************
// Function: InsertExtendedPreferences
// Description: Insert the extended preferences form elements.
// *****************************************************************************
function InsertExtendedPreferences()
{
  // ---------------------------------------------------------------------------
  // Insert the section header.
  // ---------------------------------------------------------------------------
  function InsertPreferencesHeader(aElement)
  {
    var lTR = document.createElement("tr"), lTH = document.createElement("th");

    lTH.innerHTML = 'CC Extended Preferences';
    lTH.className = "thSides";
    lTH.colSpan = 2;
    lTH.height = 12;
    lTH.vAlign = "middle";

    lTR.insertBefore(lTH, null);
    aElement.parentNode.insertBefore(lTR, aElement);
  };

  // ---------------------------------------------------------------------------
  // Insert the section footer.
  // ---------------------------------------------------------------------------
  function InsertPreferencesFooter(aElement)
  {
    var lTR = document.createElement("tr"), lTD = document.createElement("td");

    lTD.innerHTML = '&nbsp;';
    lTD.className = "catSides";
    lTD.colSpan = 2;
    lTD.height = 28;

    lTR.insertBefore(lTD, null);
    aElement.parentNode.insertBefore(lTR, aElement);
  };

  // ---------------------------------------------------------------------------
  // Insert the avatar preferences.
  // ---------------------------------------------------------------------------
  function InsertAvatarPreferences(aElement)
  {
    var lTR, lTD, lSpan1, lSpan2, lText1, lText2, lText3, lRadioYes, lRadioNo;
    var lOptions = new Options();


    // Create the row.
    lTR = document.createElement("tr");

    // Create the column 0 elements.
    lTD = document.createElement("td");
    lSpan1 = document.createElement("span");
    lText1 = document.createElement("text");

    // Build the text and put it in the span.
    lText1.textContent = "Show forum avatars:";
    lSpan1.insertBefore(lText1, null);

    // Build the span and put it in the column.
    lSpan1.className = "gen";
    lTD.insertBefore(lSpan1, null);

    // Build column 0 and put it in the row.
    lTD.className = "row1";
    lTR.insertBefore(lTD, null);

    // Create the column 1 elements.
    lTD = document.createElement("td");
    lSpan1 = document.createElement("span");
    lSpan2 = document.createElement("span");
    lInputYes = document.createElement("input");
    lInputNo = document.createElement("input");
    lText1 = document.createElement("text");
    lText2 = document.createElement("text");
    lText3 = document.createElement("text");
    
    // Build the 'yes' input.
    lInputYes.name = "showavatars";
    lInputYes.value = 1;
    lInputYes.type = "radio";
    lInputYes.checked = lOptions.showAvatars == true;
    lInputYes.addEventListener("click", function() { 
      var lOptions = new Options();
      lOptions.showAvatars = true;
      lOptions.Save(); }, false);

    // Build the 'no' input.
    lInputNo.name = "showavatars";
    lInputNo.value = 0;
    lInputNo.type = "radio";
    lInputNo.checked = lOptions.showAvatars == false;
    lInputNo.onClick = function () { GM_log("no"); };
    lInputNo.addEventListener("click", function() { 
      var lOptions = new Options();
      lOptions.showAvatars = false;
      lOptions.Save(); }, false);

    // Build the spans.
    lSpan1.className = lSpan2.className = "gen";

    // Build the text.
    lText1.textContent = "Yes ";
    lText2.textContent = "No ";
    lText3.innerHTML = "&nbsp;&nbsp;&nbsp;";

    // Build them.
    lSpan1.insertBefore(lText1, null);
    lSpan2.insertBefore(lText2, null);
    lTD.insertBefore(lInputYes, null);
    lTD.insertBefore(lSpan1, null);
    lTD.insertBefore(lText3, null);
    lTD.insertBefore(lInputNo, null);
    lTD.insertBefore(lSpan2, null);

    // Build column 1 and put it in the row.
    lTD.className = "row2";
    lTR.insertBefore(lTD, null);

    // Add the row.
    aElement.parentNode.insertBefore(lTR, aElement);
  };

  // ---------------------------------------------------------------------------
  // Insert the signature preferences.
  // ---------------------------------------------------------------------------
  function InsertSignaturePreferences(aElement)
  {
    var lTR, lTD, lSpan1, lSpan2, lText1, lText2, lText3, lRadioYes, lRadioNo;
    var lOptions = new Options();


    // Create the row.
    lTR = document.createElement("tr");

    // Create the column 0 elements.
    lTD = document.createElement("td");
    lSpan1 = document.createElement("span");
    lText1 = document.createElement("text");

    // Build the text and put it in the span.
    lText1.textContent = "Show forum signatures:";
    lSpan1.insertBefore(lText1, null);

    // Build the span and put it in the column.
    lSpan1.className = "gen";
    lTD.insertBefore(lSpan1, null);

    // Build column 0 and put it in the row.
    lTD.className = "row1";
    lTR.insertBefore(lTD, null);

    // Create the column 1 elements.
    lTD = document.createElement("td");
    lSpan1 = document.createElement("span");
    lSpan2 = document.createElement("span");
    lInputYes = document.createElement("input");
    lInputNo = document.createElement("input");
    lText1 = document.createElement("text");
    lText2 = document.createElement("text");
    lText3 = document.createElement("text");
    
    // Build the 'yes' input.
    lInputYes.name = "showsignatures";
    lInputYes.value = 1;
    lInputYes.type = "radio";
    lInputYes.checked = lOptions.showAvatars == true;
    lInputYes.addEventListener("click", function() { 
      var lOptions = new Options();
      lOptions.showSignatures = true;
      lOptions.Save(); }, false);

    // Build the 'no' input.
    lInputNo.name = "showsignatures";
    lInputNo.value = 0;
    lInputNo.type = "radio";
    lInputNo.checked = lOptions.showAvatars == false;
    lInputNo.onClick = function () { GM_log("no"); };
    lInputNo.addEventListener("click", function() { 
      var lOptions = new Options();
      lOptions.showSignatures = false;
      lOptions.Save(); }, false);

    // Build the spans.
    lSpan1.className = lSpan2.className = "gen";

    // Build the text.
    lText1.textContent = "Yes ";
    lText2.textContent = "No ";
    lText3.innerHTML = "&nbsp;&nbsp;&nbsp;";

    // Build them.
    lSpan1.insertBefore(lText1, null);
    lSpan2.insertBefore(lText2, null);
    lTD.insertBefore(lInputYes, null);
    lTD.insertBefore(lSpan1, null);
    lTD.insertBefore(lText3, null);
    lTD.insertBefore(lInputNo, null);
    lTD.insertBefore(lSpan2, null);

    // Build column 1 and put it in the row.
    lTD.className = "row2";
    lTR.insertBefore(lTD, null);

    // Add the row.
    aElement.parentNode.insertBefore(lTR, aElement);
  };

  // ---------------------------------------------------------------------------
  // Insert the contact information.
  // ---------------------------------------------------------------------------
  function InsertContactInformation(aElement)
  {
    var lTR, lTD, lSpan1, lSpan2, lText1, lText2, lText3, lRadioYes, lRadioNo;

    // Create the row.
    lTR = document.createElement("tr");

    // Create the column 0 elements.
    lTD = document.createElement("td");
    lSpan1 = document.createElement("span");
    lText1 = document.createElement("text");

    // Build the text and put it in the span.
    lText1.textContent = "Report bugs, comments, questions:";
    lSpan1.insertBefore(lText1, null);

    // Build the span and put it in the column.
    lSpan1.className = "gen";
    lTD.insertBefore(lSpan1, null);

    // Build column 0 and put it in the row.
    lTD.className = "row1";
    lTR.insertBefore(lTD, null);

    // Create the column 1 elements.
    lTD = document.createElement("td");
    lSpan1 = document.createElement("span");
    lText1 = document.createElement("text");

    // Build the text and put it in the span.
    lText1.innerHTML = '<a href="mailto:loopspam@gmail.com?subject=CC Extended Prefs 1.0">Send email to Loopinvariant</a>';
    lSpan1.insertBefore(lText1, null);

    // Build the span and put it in the column.
    lSpan1.className = "gen";
    lTD.insertBefore(lSpan1, null);

    // Build column 0 and put it in the row.
    lTD.className = "row2";
    lTR.insertBefore(lTD, null);

    // Add the row.
    aElement.parentNode.insertBefore(lTR, aElement);
  }

  // ---------------------------------------------------------------------------
  // Insert the extended preferences form.
  // ---------------------------------------------------------------------------
  function InsertPreferencesForm(aElement)
  {
    InsertPreferencesHeader(aElement);
    InsertContactInformation(aElement);
    InsertAvatarPreferences(aElement);
    InsertSignaturePreferences(aElement);
    InsertPreferencesFooter(aElement);
  };

  // ---------------------------------------------------------------------------
  // Process the preferences page.
  // ---------------------------------------------------------------------------
  function ProcessPreferences()
  {
    // Search for the TH elements of the correct class.
    var lSnapshot = document.evaluate(
				      "//TH[@class='thSides']",
				      document,
				      null,
				      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				      null);
    
    // Search the results for the text identifier.
    for(var i = 0; i < lSnapshot.snapshotLength; i++) {
      var lElement = lSnapshot.snapshotItem(i);
      if(lElement.innerHTML == "Avatar control panel") {
	InsertPreferencesForm(lElement.parentNode);
      }
    }
  };

  // ---------------------------------------------------------------------------
  // Begin execution.
  // ---------------------------------------------------------------------------
  ProcessPreferences();
}

// *****************************************************************************
// Function: HideAvatars
// Description: Strips the avatars from forum posts.
// *****************************************************************************
function HideAvatars()
{
  // ---------------------------------------------------------------------------
  // Process an individual avatar.
  // ---------------------------------------------------------------------------
  function ProcessOneAvatar(aAvatarSpan)
  {
    // Find all the IMGs in the span.
    var lImageSnapshot = document.evaluate(
					     "IMG",
					     aAvatarSpan,
					     null,
					     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					     null);

    // Process them.
    for(var i = 0; i < lImageSnapshot.snapshotLength; i++) {
      var lMatchString = "http://www.conquerclub.com/forum/images/avatars";
      var lImage = lImageSnapshot.snapshotItem(i);

      // Is it an avatar image?
      if(lMatchString != lImage.src.substring(0, lMatchString.length)) {
	continue;
      }

      // Remove the IMG from the parent.
      lImage.parentNode.removeChild(lImage);
    }
  };

  // ---------------------------------------------------------------------------
  // Process an avatar.
  // ---------------------------------------------------------------------------
  function ProcessAvatars()
  {
    // Search for SPANs that contain avatars.
    var lSnapShot = document.evaluate(
				      "//SPAN[@class='postdetails']",
				      document,
				      null,
				      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				      null);
    
    // Process each individual span.
    for(var i = 0; i < lSnapShot.snapshotLength; i++) {
      ProcessOneAvatar(lSnapShot.snapshotItem(i));
    }
  };

  // ---------------------------------------------------------------------------
  // Begin execution.
  // ---------------------------------------------------------------------------
  ProcessAvatars();
}

// *****************************************************************************
// Function: HideSignatures
// Description: Strips the signatures from forum posts.
// *****************************************************************************
function HideSignatures()
{
  // ---------------------------------------------------------------------------
  // Remove the child nodes that form the signature
  // ---------------------------------------------------------------------------
  function RemoveSignatureNodes(aSpan, aChildIndex)
  {
    // Remove the signature line and all the nodes that follow it.
    while(aChildIndex < aSpan.childNodes.length) {
      var lChild = aSpan.childNodes[aChildIndex];
      lChild.parentNode.removeChild(lChild);
    }

    // Remove the nodes that follow the parent of the signature node.
    var lSiblings = aSpan.parentNode.childNodes;
    var lIndex;

    for(var i = 0; i < lSiblings.length; i++) {
      if(lSiblings[i] == aSpan) {
	lIndex = i + 1;
	break;
      }
    }

    while(lIndex < lSiblings.length) {
      lSiblings[lIndex].parentNode.removeChild(lSiblings[lIndex]);
    }
  }

  // ---------------------------------------------------------------------------
  // Process an individual post.
  // ---------------------------------------------------------------------------
  function ProcessOnePost(aSpan)
  {
    // Iterate over the children until we find the signature separator.
    for(var i = 0; i < aSpan.childNodes.length; i++) {
      if(aSpan.childNodes[i].textContent == "_________________") {
	RemoveSignatureNodes(aSpan, i);
	break;
      }
    }
  };

  // ---------------------------------------------------------------------------
  // Find all the postbody SPANs.
  // ---------------------------------------------------------------------------
  function ProcessPosts()
  {
    // Search for the separator DIV lines before the signatures.
    var lSnapshot = document.evaluate(
				      "//SPAN[@class='postbody']",
				      document,
				      null,
				      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				      null);
			      
    // Process each individual span.
    for(var i = 0; i < lSnapshot.snapshotLength; i++) {
      ProcessOnePost(lSnapshot.snapshotItem(i));
    }
  };

  // ---------------------------------------------------------------------------
  // Begin execution.
  // ---------------------------------------------------------------------------
  ProcessPosts();
}

// *****************************************************************************
// Function: main
// Description:  Entry point.  Manages the initial settings load, and determines
//    which functionality to employ based on where the user is on the CC site.
// *****************************************************************************
function main()
{
  var lOptions = new Options();
  var lForumPageBase = "http://www.conquerclub.com/forum/viewtopic.php";
  var lProfilePageBase = "http://www.conquerclub.com/forum/profile.php";

  // Profile page.
  if(lProfilePageBase == window.location.href.substring(0, lProfilePageBase.length)) {
    InsertExtendedPreferences();
  }

  // Forums page.
  if(lForumPageBase == window.location.href.substring(0, lForumPageBase.length)) {
    if(false == lOptions.showAvatars) {
      HideAvatars();
    }

    if(false == lOptions.showSignatures) {
      HideSignatures();
    }
  }
}

// *****************************************************************************
// Begin script execution.
// *****************************************************************************
main();
