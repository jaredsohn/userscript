//-----------------------------------------------------------------------//
// Monkey Smileys
// An-Zu Colection
// Visit my blog at http://andre-zutto.blogspot.com
//-----------------------------------------------------------------------//



// ==UserScript==
// @name           Monkey Smileys
// ==/UserScript==

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

window.addEventListener("load", function(e) {

function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";
	buttons += emoticonButton(":mHurm:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mHurm.gif");
	buttons += emoticonButton(":mCamera:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mCamera.gif");
	buttons += emoticonButton(":mCubit:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mCubit.gif");
	buttons += emoticonButton(":mDuit:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mDuit.gif");
	buttons += emoticonButton(":mSelam:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mSelam.gif");
	buttons += emoticonButton(":mNgumpat:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mNgumpat.gif");
	buttons += emoticonButton(":mPanas:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mPanas.gif");
	buttons += emoticonButton(":mNo:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mNo.gif");
	buttons += emoticonButton(":mThinking:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mThinking.gif");
	buttons += emoticonButton(":mRempit:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mRempit.gif");
	buttons += emoticonButton(":mSurrender:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mSurrender.gif");
	buttons += emoticonButton(":mPening:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mPening.gif");
	buttons += emoticonButton(":mKening:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mKening.gif");
	buttons += emoticonButton(":mKorek:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mKorek.gif");
	buttons += emoticonButton(":mSmoking:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mSmoking.gif");
	buttons += emoticonButton(":mMandi:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mMandi.gif");
	buttons += emoticonButton(":mBom:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mBom.gif");
	buttons += emoticonButton(":mGelak:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mGelak.gif");
	buttons += emoticonButton(":mGuilty:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mGuilty.gif");
        buttons += emoticonButton(":mSakit:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mSakit.gif");
	buttons += emoticonButton(":mKanta:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mKanta.gif");
	buttons += emoticonButton(":mMuka:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mMuka.gif");
	buttons += emoticonButton(":mJahat:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mJahat.gif");
	buttons += emoticonButton(":mKipas:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mKipas.gif");
	buttons += emoticonButton(":mPeluh:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mPeluh.gif");
	buttons += emoticonButton(":mBerangan:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mBerangan.gif");
	buttons += emoticonButton(":mHantuk:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mHantuk.gif");
	buttons += emoticonButton(":mHihi:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mHihi.gif");
	buttons += emoticonButton(":mTorchlight:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mTorchlight.gif");
	buttons += emoticonButton(":mLove:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mLove.gif");
	buttons += emoticonButton(":mHaha:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mHaha.gif");
	buttons += emoticonButton(":mCry:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mCry.gif");
	buttons += emoticonButton(":mKenyang:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mKenyang.gif");
	buttons += emoticonButton(":mSad:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mSad.gif");
	buttons += emoticonButton(":mStudy:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mStudy.gif");
	buttons += emoticonButton(":mFlu:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mFlu.gif");
	buttons += emoticonButton(":mWekk:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mWekk.gif");
	buttons += emoticonButton(":mGergaji:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mGergaji.gif");
	buttons += emoticonButton(":mRambut:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mRambut.gif");
	buttons += emoticonButton(":mDarah:", "http://i983.photobucket.com/albums/ae312/luvanis/monyet/mDarah.gif");
	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img  class=\\\"emoticon\\\"  src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);

    
