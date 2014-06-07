// ==UserScript==
// @name            AutoCloseAdsPopup
// @author          darkyndy
// @description     Auto Close Ads Popup
// @include         *
// @version         0.1
// ==/UserScript==

//---------------------------------------------------------------------------------------------------
//    Copyright (C) 2009 darkyndy
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    For a copy of the latest GNU General Public License, see <http://www.gnu.org/licenses/gpl.html>.

// If you distribute a modified version of Videoembed, you are encouraged to use
// my name in the credits, and a copy of the license above.
//---------------------------------------------------------------------------------------------------


/*
ChangeLog
version 0.1
- this script is under development (beta version)
- this script will auto-close pop-up's from gamebookers.com
*/

function blockList(){
  var blockSiteList = [];
  blockSiteList.push("gamebookers.com\/promotions.ap");
  for(var i=0;i<blockSiteList.length;i=i+1){
    if(location.href.match(blockSiteList[i])){
    	window.close();
    }
  }
}

blockList();