// ==UserScript==
// @name          Revised MySpace Home Page
// @description      Hides the unnecessary things and moves a few things around to make it more efficient in my opinion. Not meant for 800 x 600 resolution.
// @namespace     http://userscripts.org/users/34883
// @include       http://home.myspace.com/*=user
// @include       http://home.myspace.com/*=user&*
// ==/UserScript==

//------------------------------------------------
//Hide Some things
//------------------------------------------------
document.getElementById('squareAd').setAttribute('style','display:none;');
document.getElementById('googlead').setAttribute('style','display:none;');
document.getElementById('featuredprofilerounded').setAttribute('style','display:none;');
document.getElementById('marketingcontent').setAttribute('style','display:none;');
document.getElementById('addressbook').setAttribute('style','display:none;');

//------------------------------------------------
//Hide headControls
//------------------------------------------------
document.getElementById('headControls').setAttribute('style','visibility:hidden; height:0px;');

//------------------------------------------------
//Move some crap and bring myUrl back
//------------------------------------------------
document.getElementById('userdisplay').setAttribute('style','position:absolute; left:50%; top:277px; margin-left:170px; width:300px;');
document.getElementById('manage').setAttribute('style','position:absolute; left:50%; top:585px; margin-left:230px; width:181px;');
document.getElementById('myUrl').setAttribute('style','visibility:visible; position:absolute; left:50%; top:330px; margin-left:178px; width:250px;');

//------------------------------------------------
//Make profile views bold and hide green tabs
//------------------------------------------------
 GM_addStyle('#userdisplay .middle #views {'
            +'font-size:11px !important;'
            +'font-weight:bold !important;'
            +'}'
            +'#userdisplay .middle strong {'
            +'font-size:10px;'
            +'font-weight:normal;'
            +'}'
            +'#userdisplay img {'
            +'max-width:140px;'
            +'}'
            +'.tabsDiv .content div.contentWrapper {'
            +'display:none;'
            +'}'     
            +'.tabsDiv .tabsRow .tab {'
            +'display:none;'
            +'}'
            +'.tabsDiv .content {'
            +'display:none;'
            +'}');