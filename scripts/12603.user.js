// ==UserScript==
// @name	Embed Microformats in Facebook
// @include	*.facebook.com/profile.php*
// ==/UserScript==
//





// INSERT VCARD CLASS INTO PROFILE
var profile;
profile = document.getElementById('userprofile');
profile.className += ' vcard';


// INSERT FN CLASS
var allDivs = document.evaluate(
"//div[@class='profile_name']",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
////////if (snapshotLength)
var fnDiv = allDivs.snapshotItem(0)
fnDiv.className += ' fn';

//INSERT ADDRESS
var homeTown;
homeTown = document.getElementById('Hometown-data');
homeTown.className += ' adr';

localityAndRegion = homeTown.getElementsByTagName('a');
localityAndRegion[0].className += ' locality';
localityAndRegion[1].className += ' region';

//INSERT TEL





//INSERT EMAIL
///////////////////its an image.  we cant


//CAN WE TAG A PHOTO?
var profileImage
profileImage = document.getElementById('profileimage');
var profileImgSrc
profileImgSrc = profileImage.getElementsByTagName('img');
profileImgSrc[0].className += ' photo';

//INSERT WEBSITE or this,url


