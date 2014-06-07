// ==UserScript==
// @name          Wear My Bar
// @namespace     DiseaseHF
// @description   Allows you to see yourself wearing a custom user bar.
// @include       *hackforums.net/showthread.php*
// @version 	    1.0
// ==/UserScript==
// Notes:
//    Please keep in mind that this is a user script.  It's only
//    affecting your view of Hack Forums.  Other members will
//    continue to see your userbar per the settings in your profile.
//    In short, this only allows you to see yourself wearing a
//    custom user bar.  Pure aesthetics, nothing more.
//
//    In order for this script to be useful you will need to modify the
//    my_bar variable located within the WearMyBar function.  You may
//    optionally input your user ID (my_id), but the script will
//    automatically locate that for you.  Inputting it will prevent the
//    script from finding your UID every time you view a thread.  This
//    isn't an expensive procedure though, so it's not critical to avoid.

function WearMyBar ()
{
  // Change this to the user bar you wish to see yourself wearing
  this.my_bar = 'http://domain.tld/path/to/image.ext';
  
  // Set your UID, otherwise the script will identify it for you
  this.my_id = 0;
  
  // Do not modify
  this.p_elems = new Array ();
}

WearMyBar.prototype = {

  grab_user_id: function ()
  {
    var anchors = document.getElementsByTagName ('a');
    
    for (var i = 0, len = anchors.length; i < len; i++)
    {
      if (anchors.item (i).getAttribute ('href') !== null &&
        anchors.item (i).getAttribute ('href').match (/profile&uid=(\d+)/))
      {
        this.my_id = RegExp.$1;
        break;
      }
    }
  },
  
  get_user_profiles: function ()
  {
    var mps = document.getElementsByTagName ('td');
    var my_mp_href = new RegExp ('uid=' + this.my_id);
    
    for (var i = 0, len = mps.length; i < len; i++)
    {
      var uid_a = mps.item (i).getElementsByTagName ('a')[1];
      
      if (typeof uid_a === 'undefined')
        continue;
      
      if (mps.item (i).getAttribute ('width') == '15%' &&
        mps.item (i).getElementsByTagName ('a')[1].href.match (my_mp_href))
      {
        this.p_elems.push (i);
      }
    }
  },
  
  switch_bars: function ()
  {
    this.get_user_profiles ();
    
    if (this.p_elems.length === 0)
      return false;
    
    var posts = document.getElementsByTagName ('td');
    
    for (var i = 0, len = this.p_elems.length; i < len; i++)
    {
      var img = posts.item (this.p_elems[i]).getElementsByTagName ('img');
      
      for (var m = 0, m_len = img.length; m < m_len; m++)
      {
        if (img.item (m).getAttribute ('title') !== null &&
          ! img.item (m).getAttribute ('src').match (/ds\/awards/))
        {
          img.item (m).setAttribute ('src', this.my_bar);
        }
      }
    }
  }

}

var wear_my_bar = new WearMyBar ();

if (wear_my_bar.my_id === 0)
  wear_my_bar.grab_user_id ();
  
if (wear_my_bar.my_id !== 0)
  wear_my_bar.switch_bars ();