const SUpE_META=<><![CDATA[
// ==UserScript==
// @name        GasBuddyBlues
// @shortname   GB
// @namespace   tag:GasBuddyPhilly@yahoo.com,2008-05:monkey
// @description Improves UI for GasBuddy.com and affiliated sites.
// @released    2008/12/21 23:46:45
// @version     2008/12/21 23:46:45
// @copyright   <GasBuddyPhilly@yahoo.com>
// @license     <http://gnu.org/licenses/gpl-3.0.html>
// @frequency   12 hours
// @releaseURL  http://userscripts.org/scripts/source/25918.meta.js
// @scriptURL   http://userscripts.org/scripts/source/25918.user.js
// @releaseURL  http://userscripts.org/scripts/review/25918?format=txt
// @scriptURL   http://userscripts.org/scripts/source/25918.user.js
// @releaseURL  http://userscripts.org/scripts/source/25918.user.js?
// @scriptURL   http://userscripts.org/scripts/source/25918.user.js
// @include     *//gasbuddy.com/*
// @include     *//www.gasbuddy.com/*
// @include     *//*gasprices.com/*
// @include     *//66.70.86.248/*
// ==/UserScript==
]]></>.toString();

//This script is copyright <GasBuddyPhilly@yahoo.com>
//(except where otherwise noted)
// and licensed under <http://gnu.org/licenses/gpl-3.0.html>,
// incorporated herein by reference.

//-=-=-=- Main line code
//-=-=- user settings for this script
//-=- basic settings
var O_TY=GM_getValue('GBTYUsesLastFSL',false);
var O_LL=GM_getValue('GBPriceMapSettings','');
var O_TL=GM_getValue('GB2LineTopicLists',false);
var O_RV=GM_getValue('GBMessageOrderReversed',false);
//-=- advanced settings, settable only via about:config
//(and forced to exist, to make it easier to find and change them)
//(do not change unless you know what you're doing)
var O_TT=GM_getValue('GBPriceTableSortable','notset');
if(O_TT=='notset')
{O_TT=false;
 GM_setValue('GBPriceTableSortable',O_TT);
};
var O_MS=GM_getValue('GBOpenExtraMSLFields','notset');
if(O_MS=='notset')
{O_MS=false;
 GM_setValue('GBOpenExtraMSLFields',O_MS);
};

//-=-=- global (to this invocation of the script) pseudo-constants
//(never changing, unless/until the user moves to a different page)
//-=- those that are readable before the page is fully loaded
//the protocol part of the URL
var PTC=window.location.protocol;
//the host name from the URL (with port number, if any)
var HOS=window.location.host;
//the path part of the URL (if any)
var PTH=window.location.pathname.toLowerCase().substr(1);
 //("substr(1)" here removes the initial "/" from the string)
//the GET params from the URL (if any), both as a string, and parsed
// into an array
var PMS=window.location.search.substr(1);
 //("substr(1)" here removes the initial "?" from the string)
var PSP=pseP(PMS,true);
 //("true" here means names are canonicalized toLowerCase)
//the hash part of the URL, if it exists
var HSH=window.location.hash.substr(1);
 //("substr(1)" here removes the initial "#" from the string)
//-=- those initialized only if pertinent to the current page
var LSS,FVS,MSS,TSS;//the value of the 'list', 'FAV', 'member_search',
// and 'TopicSearch' params, if they exist
//-=- those that must wait to be initialized until after the page loads
var ME;//the name of the currently logged in user (if any)

//-=-=- global (to this incarnation of the script) variables
//(referenced in several places, or likely to be in the future)
//regular expressions (expressed as strings to allow for mix and match)
var Ax='#(0*16|x0*a)';          //part of the entities for u00A0-u00A9
var Ns='&(nbsp|'+Ax+'0);';      //entity alternatives for u00A0
var Ct='&(cent|'+Ax+'2);';      //entity alternatives for u00A2
var Ws='(\\s|'+Ns+')*';         //HTML alternatives for white space
var Df='(\\d\\d?(\\.\\d)?'+Ws+'(c(ents?)?|Â?¢|'+Ct+')|'+
 '\\$?\\d?\\.\\d\\d(\\.?\\d)?)';//price differential possibilities
var Pd='(\\+'+Ws+Df+')';        //positive differentials
var Nd='(-'+Ws+Df+')';          //negative differentials
//interpretation of current setting for number of lines per topic
var Otl=O_TL?'<br />':'&nbsp;';
//current setting for page message order
//(as opposed to the user default; they start out the same, but users
// can change either without changing the other)
var Orv=O_RV;

//-=-=- main code injectors
//the page redirections (done ahead of the other code for speed)
GBB_redirect();
//the self-updater subsystem
SUpE_SelfUpdater();
//the Greasemonkey menu commands
GM_registerMenuCommand('GB Sticky FSLs',GBB_SetUTY);
GM_registerMenuCommand('GB Topic Lists',GBB_SetLns);
GM_registerMenuCommand('GB Message Order',GBB_SetOrd);
 //(additional commands are added by the self-updater)
//the style sheet changes to be made
GM_addStyle(getSTYL());
//the main line code
GBB_onDOMload({type:'GBBscripted'});
 //(expects an event object as a parameter; "GBBscripted" is my fake
 // event for this - allowing distinction, if necessary)
/*window.addEventListener('load',GBB_Onfullload,false);*/

//-=-=-=- Primary routines
//(here's where the real magic begins)
//-=-=- page redirections
function GBB_redirect()
{//working variables
 var el;      //page element tested for
 var nch;     //component for building new URL
//-=- redirection of the "Thank You" pages
 if(O_TY&&PTH=='price_thankyou.aspx')
 {LSS=getP(PSP,'list'.toLowerCase());
   //(".toLowerCase()" included for completeness; adjusts to the
   // canonicalization from when PSP was created)
  if(LSS.length==0)//(only if no FSL is listed in the page URL, and ...)
  {nch=GM_getValue('internal.mruFSL','');
   if(nch)//(... only if a previous FSL has been recorded)
   {window.location.replace(PTC+'//'+HOS+'/'+PTH+'?'+PMS+'&'+
    'list='+nch);
    //(produces "?&" with no other parms, but so does GB)
   };
  };
 };
//-=- redirection of the map pages (but not the temp. map)
 if(PTH=='map_gas_prices.aspx')
 {if(PSP=='')//(only if no parameters are present in URL, and ...)
  {if(O_LL!='')//(... only if a custom URL has been set by the user)
   {window.location.replace(PTC+'//'+HOS+'/'+PTH+'?'+O_LL);
   };
  };
 };
//-=- redirection of the subframe of the PM pages
 if(PTH=='pm_list.aspx')
 {nch=GM_getValue('internal.PMframeURL','');
   //(XXX:  might be better to pass this in HSH instead)
  if(nch)
  {window.location.replace(PTC+'//'+HOS+nch);
  };
 };
};

function GBB_onDOMload(e)
{//initialize remaining pseudo-constants
 ME=xp1('//span[@id="TB_lblLogInStatus"]/a');
 if(!ME)
 {ME=xp1('//span[@id="ctl00_TB_lblLogInStatus"]/a');
 };
 if(ME)
 {ME=ME.innerHTML;
 };
 //working variables
 var i,j,lyst;//counters, data array
 var el,el2;  //page elements acted on, or used to pinpoint them
 var ros;     //elements (usually table rows) selected via XPath
 var snl,roe; //ros.snapshotLength, ros.snapshotItem[i]
 var cls;     //child elements (usually table cells) within roe
 var nuc,npa; //new content to be added, parent element for new content
 var nch,nct; //component parts for building new content

//-=-=- Code affecting most every page
 //the moving of "link" and "style" tags from "body" to "head"
 //(this WAS needed for the map page, but apparently has since been
 // fixed; still checked here anyway as a precaution)
 ros=xpo('//body//style|//body//link');
 snl=ros.snapshotLength;
 npa=document.getElementsByTagName('head')[0];
 for(i=snl-1;i>=0;i--)//done backwards to keep in order
 {roe=ros.snapshotItem(i);
  npa.insertBefore(roe,npa.firstChild);
 };
 //the size adjustment for the modification message (if present)
 el=document.getElementById('ctl00_linkOldHome');
 if(el)
 {el.parentNode.style.fontSize='80%';
 };
 //the cleanup of the top line for logged-in users
 el=xp1('//span[@id="TB_lblLogInStatus"]/a');
 if(!el)
 {el=xp1('//span[@id="ctl00_TB_lblLogInStatus"]/a');
 };//(XXX: redundant - similar code used to set ME variable)
 if(el)
 {npa=el.parentNode;
  npa.removeChild(el);
  npa.innerHTML='';
  npa.appendChild(el);
 };
 el=document.getElementById('TB_lblTotalPoints');
 if(!el)
 {el=document.getElementById('ctl00_TB_lblTotalPoints');
 };
 if(el)
 {npa=el.parentNode;
  npa.removeChild(el);
  el2=document.getElementById('TB_lblTodayPoints');
  if(!el2)
  {el2=document.getElementById('ctl00_TB_lblTodayPoints');
  };
  if(el2)
  {//el2.parentNode should be npa, but don't take chances...
   el2.parentNode.removeChild(el2);
  };
  npa.innerHTML='';
  npa.appendChild(el);
  npa.innerHTML+=' Points (';
  npa.appendChild(el2);
  npa.innerHTML+=' Today)';
 };
 //the new header image map, making "GasBuddy.com" a clickable link
 el=document.getElementById('HB_imgHeadbar');
 if(!el)//not found, try alternate id
 {el=document.getElementById('ctl00_HB_imgHeadbar');
 };
 if(el)//if either found,
 {//remove surrounding anchor ...
  el.parentNode.parentNode.replaceChild(el,el.parentNode);
  //... and add image map
  nuc=document.createElement('map');
  nuc.id='GBBbmap';
  nuc.name='GBBbmap';
  nuc.innerHTML=
   ' <area coords="100,0,223,22" href="http://gasbuddy.com/"\n'+
   '  shape="rect">\n'+
   ' <area href="/" shape="default">';
   //(when areas overlap, it's the first one listed that gets acted on)
  el.parentNode.insertBefore(nuc,el);
  el.useMap='#GBBbmap';
  //the new Google custom search box
  //(now positioned based on the logo image's position)
  //(not added to map pages because of some bizarre interaction that
  // causes clicks to be registered to the wrong spot)
  if(PTH!='map_gas_prices.aspx'&&PTH!='price_by_county.aspx'&&
   PTH!='gb_gastemperaturemap.aspx'&&
   PTH!='gb_can_gastemperaturemap.aspx')
  {el2=document.getElementsByTagName('form')[0];
   npa=document.createElement('div');//new parent for form, because ...
   npa.style.position='relative';//... has no effect on table elements
   npa.id='GBBgoogP';
   el2.parentNode.insertBefore(npa,el2);
   npa.insertBefore(el2,null);
   nuc=document.createElement('div');
   nuc.id='GBBgoogD';
   npa.insertBefore(nuc,null);
   nuc.innerHTML=
    '<form action="http://www.google.com/cse" id="cse-search-box"\n'+
    ' target="_blank">\n'+
    ' <input name="cx" type="hidden"\n'+
    '  value="007696795982603367820:r1feapbmmqs" />\n'+
    ' <input name="ie" type="hidden" value="UTF-8" />\n'+
    ' <input id="GBBgoogQ" name="q" type="text" /><input\n'+
    '  name="sa" type="submit" value="Search" />\n'+
    '</form>\n'+
    '';//end of HTML
   nch=findPos(el);
   nuc.style.left=nch[0]!=null?(nch[0]+426)+'px':'428px';
   nuc.style.top=nch[1]!=null?(nch[1]-4)+'px':'1.3em';
   nct=document.getElementById('GBBgoogQ');
   if(nct)
   {nct.addEventListener('focus',gosI,false);
    nct.addEventListener('blur',gosO,false);
   };
  };
 };
 //the new nonzero highlight to be added to the "Inbox" notifications at
 // the top of every page, and to the "My Activity" box on the home page
 InbH({type:'GBBscripted'});
  //(expects an event object as a parameter; "GBBscripted" is my fake
  // event for this - allowing distinction, if necessary)
 //the shortening of the primary menu to fit on a single line
 el=xp1('//a[@href="price_by_county.aspx"]/span');
 if(el)
 {el.innerHTML='Price Temperature Map';
 };

//-=-=- Code affecting every site's home page, as well as the
// search results and "Thank You" pages
 if(PTH==''||PTH.search(/index\.aspx$/)>-1||PTH=='price_thankyou.aspx'||
  PTH=='gaspricesearch.aspx'||PTH=='reportgasprices.aspx')
 {
//-=- Code affecting the price lists (including those on the "Thank
// You" pages)
  //the highlighting of any price differences found in the comments
  ros=xpo('//td[@class="PAddress"]');
  snl=ros.snapshotLength;
  for(i=0;i<snl;i++)
  {roe=ros.snapshotItem(i);
   roe.innerHTML=roe.innerHTML.replace(new RegExp(Pd,'gim'),
    '<span class="GBBhibd">$1</span>').replace(new RegExp(Nd,'gim'),
    '<span class="GBBhigd">$1</span>');
  };
  //the reorg of the price lists to allow sorting with TableTools
  //(XXX:  scan is repetitive; see about combining this with the above)
  if(O_TT)
  {ros=xpo('//table[@class="PriceTable"]/tbody/'+
    'tr[@class="PTableRow"]/td|'+
    '//table[@class="PriceTable"]/tbody/'+
    'tr[@class="PTableRowHighlight"]/td');
   snl=ros.snapshotLength;
   for(i=0;i<snl;i++)
   {roe=ros.snapshotItem(i);
    roe.removeAttribute('rowspan');
    if(roe.className=='PAddress')
    {el2=roe.parentNode;
     el2.setAttribute('GBBmark','GBB_this1');
     nuc=xp1('//tr[@GBBmark="GBB_this1"]/preceding-sibling::tr[1]/'+
      'td[@class="PFind"]');
      //(easier than scanning for and tossing whitespace nodes)
      //(strangely, [1] - NOT [last()] - is needed to switch from
      // getting the FIRST preceding-sibling to
      // getting THE preceding-sibling)
     el2.removeAttribute('GBBmark');
     if(nuc)
     {//set inner divs to inline, to save vertical space on page
      nuc.setAttribute('GBBmark','GBB_this2');
      nch=xp1('//td[@GBBmark="GBB_this2"]/div');
      if(nch)
      {nch.style.display='inline';
      };
      nuc.removeAttribute('GBBmark');
      nuc.innerHTML=roe.innerHTML+'<br>'+nuc.innerHTML;
      nuc.className='PAddress';
     };
     el2.parentNode.removeChild(el2);
    };
   };
  };
//-=- Code affecting the Favorite Stations Lists
  el=document.getElementById('FPI_ddlMemberStationsList');
  if(el)
  {//the saving of the currently selected FSL as default
   GM_setValue('internal.mruFSL',el.options[el.selectedIndex].value);
   //the new line break after the FSL pick list
   el2=document.createElement('br');
   el.parentNode.insertBefore(el2,el.nextSibling);
  };
  //the moving of the "Show/Hide" links into the header row ...
  el=xp1('//*[@id="cmtstatus"]/parent::td/parent::tr');
  if(el)
  {el.id='GBBtrdFSL';
   ros=xpo('//tr[@id="GBBtrdFSL"]/td/a');
   snl=ros.snapshotLength;
   for(i=0;i<=snl;i++)//note "<=", not "<"
   {roe=ros.snapshotItem(i);
    if(snl-i>2)//i<4, assuming snl==6 (as expected)
    {roe.innerHTML=roe.innerHTML.substr(0,1);
    };
    nuc=xp1('//tr[@id="GBBtrdFSL"]/following-sibling::tr/th['+
     (i+1)+']');
    if(nuc)
    {if(snl-i>2)//i<4
     {nuc.innerHTML='';
      nuc.appendChild(roe);
     };
     if(snl-i==2)//i==4
     {nuc.innerHTML=nuc.innerHTML.substr(0,7)+' (';
      nuc.appendChild(roe);
      nuc.innerHTML+=')';
     };
     if(snl-i==1)//i==5
     {nct=nuc.innerHTML;
      nuc.innerHTML='';
      nuc.colSpan=2;
      npa=document.createElement('table');
      npa.width='100%';
      npa.innerHTML='\n'+
       ' <tr>\n'+
       '  <td style="color:#FFFFFF; width:100%;">'+nct+'</td>\n'+
       '  <td id="GBBhlpFSL" style="background-color:#FFFFFF;\n'+
       '   text-align:right;"></td>\n'+
       ' </tr>\n'+
       '';//end of HTML
      nuc.appendChild(npa);
      nch=document.getElementById('GBBhlpFSL');
      nch.appendChild(roe);
     };
     if(snl-i==0)//i==6
     {nuc.style.display='none';
     };
    };
   };
   //... and the suppression of the old row for them
   el.style.display='none';
  };
  //the rebuilding of the status column
  ros=xpo('//span[starts-with(@id,"sm_id")]');
  snl=ros.snapshotLength;
  for(i=0;i<snl;i++)
  {roe=ros.snapshotItem(i);
   npa=xp1('//*[@id="'+roe.id+
    '"]/parent::td/following-sibling::td[last()]');
   if(npa)
   {//the creation of links to the MSL for each FSL entry
    nch=roe.innerHTML;
    if(nch!=0)
    {npa.innerHTML='<a href="/addmasterstation.aspx?sm_id='+nch+
      '" style="cursor:crosshair;" target="_blank">MSL</a><br>'+
      npa.innerHTML;
    };
    //the copying of the "alt" text to "title" for the status images
    el2=xp1('//td[@id="'+npa.id+'"]/a/img');
    //(assumes npa has an id, and that there's only one img inside)
    if(el2)
    {el2.title=el2.alt;
    };
    //the suppression of the ordinary text below the status images
    nct=xp1('//td[@id="'+npa.id+'"]/span');
    //(assumes npa has an id, and that there's only one span inside)
    if(nct)
    {nct.style.display='none';
    };
   };
  };
 };

//-=-=- Code affecting the separate FSL editing pages
 if(PTH=='member_fav_stations_edit.aspx')
 {//the change of the sort order list into a plain text box
  ros=xpo('//select[contains(@id,"ddlsort_order")]|'+
   '//select[contains(@id,"ddlAddSortOrder")]');
   //(should really use "ends-with", but XPath has no such function)
  snl=ros.snapshotLength;
  for(i=0;i<snl;i++)
  {roe=ros.snapshotItem(i);
   nct=roe.id;
   roe.id='GBBsoXFSL';//to avoid id conflict
   nch=roe.name;
   roe.name='GBB$soXFSL';//to avoid name conflict
   j=roe.options[0].value;
   nuc=document.createElement('input');
   nuc.id=nct;
   nuc.maxLength=3;
   nuc.name=nch;
   nuc.size=3;
   nuc.type='text';
   nuc.value=j;
   roe.parentNode.replaceChild(nuc,roe);
  };
 };
//-=- Code affecting the "Manage FSLs" page
 if(PTH=='maintainfavstationslist.aspx')
 {//the editing of the malformed FSL URLs into something useful
  ros=xpo('//a[contains(@href,"?lid=")]|//a[contains(@href,"&lid=")]');
  snl=ros.snapshotLength;
  for(i=0;i<snl;i++)
  {roe=ros.snapshotItem(i);
   nct=roe.href.match(/[\?&]lid=([0-9]+)/)[1];
   roe.href='/price_thankyou.aspx?list='+nct;
  };
 };

//-=-=- Code affecting the map pages
 if(PTH=='map_gas_prices.aspx'||PTH=='price_by_county.aspx')
 {//the new link to allow users to set a "custom map" page
  //(much of this page is built with client-side JS - including the box
  // for this link - so we have to wait for it to finish to add it)
  window.setTimeout(lMUp,1000)//do this one second from now
 };

//-=-=- Code affecting the Master Station List pages
 if(PTH=='addmasterstation.aspx')
 {//the newly revealed (but usually disabled) "Site" field
  el=document.getElementById('AddMasterStation3_ddlSite');
  if(el)
  {el2=xp1('//select[@id="AddMasterStation3_ddlSite"]/'+
    'parent::td/preceding-sibling::td');
   if(el2)
   {el2.colSpan=1;
    nuc=document.createElement('div');
    nuc.innerHTML='Site<br>';
    el.parentNode.insertBefore(nuc,el);
    el.parentNode.style.display='block';
    if(!O_MS)
    {el.disabled=true;
    };
    el.style.width='auto';
   };
  };
  //the "State/Prov" field (opened as well for advanced users)
  if(O_MS)
  {el=document.getElementById('AddMasterStation3_ddlState');
   if(el)
   {el.disabled=false;
   };
  };
  //the new line break in the address header
  el=document.getElementById('AddMasterStation3_txtAddress');
  el.parentNode.innerHTML=el.parentNode.innerHTML.
   replace(/(Exact\s+Street\s+Address)/,'$1<br>');
 };

//-=-=- Code affecting the FAQ page
 if(PTH=='faq.aspx')
 {//correct script-induced mis-scrolling for FAQ URLs with "#"
  if(HSH)
  {//wait for things to settle down, then reset scroll spot
   window.setTimeout
   ('document.getElementById("'+HSH+'").scrollIntoView();\n'+
    'window.scrollBy(-9999,-16);',1000//do this one second from now
   );
  };
 };

//-=-=- Code affecting the forum pages
//-=- Code affecting the main forum page
 if(PTH=='forum_category.aspx')
 {//the corrections of inaccurate terminology ("forum" vs. "category")
  ros=xpo('//tr[@class="DetailTableHeader"]|'+
   '//tr[@class="DetailTableHeader"]/following-sibling::*[1]');
  snl=ros.snapshotLength;
  for(i=0;i<snl;i++)
  {roe=ros.snapshotItem(i);
   if(roe.className=='DetailTableHeader')
   {roe.innerHTML=roe.innerHTML.replace(/Favorite Message Forums/,
     'Favorite Forum Categories');
   }else
   {cls=roe.getElementsByTagName('th');
    if(cls.length==0)
    {nuc=document.createElement('tr');
     roe.parentNode.insertBefore(nuc,roe);
     nuc.innerHTML='<th colspan="2"'+
      ' style="padding-left:5px; text-align:left;">Forum</th>\n'+
      '<th>Topics</th>\n'+
      '<th>Messages</th>\n'+
      '';//end of HTML
    }else
    {cls[0].innerHTML='Category';
    };
   };
  };
 };
//-=- Code affecting the forum topic lists
 if(PTH=='forum_topics.aspx')
 {//the reformatting of the "Last Post" column
  //(in either one- or two-line format)
  ros=xpo('//table[@class="forum"]/tbody/tr/td[4]|'+
   '//table[@class="forumtopic"]/tbody/tr/td[4]');
  snl=ros.snapshotLength;
  for(i=0;i<snl;i++)
  {roe=ros.snapshotItem(i);
    roe.removeAttribute('width');
   roe.innerHTML=roe.innerHTML.replace(/(\d+)\s+(\d+)/m,
    '$1'+Otl+'$2');
   roe.innerHTML=roe.innerHTML.replace(/(\d+)\s+([AP]M)?/m,
    '$1&nbsp;$2');
  };
  //the alignment of the "Posts" column
  ros=xpo('//table[@class="forum"]/tbody/tr/td[5]|'+
   '//table[@class="forumtopic"]/tbody/tr/td[5]');
  snl=ros.snapshotLength;
  for(i=0;i<snl;i++)
  {roe=ros.snapshotItem(i);
    roe.align='right';
  };
  //the useless "Rating" column
  //(can't easily be done via CSS alone, since the elements to be
  // suppressed may get moved below)
  ros=xpo('//table[@class="forum"]/tbody/tr/td[6]|'+
   '//table[@class="forumtopic"]/tbody/tr/td[6]');
  snl=ros.snapshotLength;
  for(i=0;i<snl;i++)
  {roe=ros.snapshotItem(i);
   roe.className='GBBsuppress';
  };
  //the new "Category" column added to the "Favorite Topics" and
  // "Search by Author" pages
  //get pertinent URL parameters, if they exist
  FVS=getP(PSP,'FAV'.toLowerCase());
  MSS=getP(PSP,'member_search'.toLowerCase());
  TSS=getP(PSP,'TopicSearch'.toLowerCase());
   //(".toLowerCase()" in each of these adjusts to the canonicalization
   // from when PSP was created)
  if(ck4P(FVS,'Y',true)||MSS.length>0||TSS.length>0)
   //("true" here means the value test is case insensitive)
   //(both MSS and TSS must be tested, because some pages leave off one,
   // and others leave off the other)
  {ros=xpo('//table[@class="forum"]/tbody/tr|'+
    '//table[@class="forumtopic"]/tbody/tr');
   snl=ros.snapshotLength;
   if(snl>1)//then insert category column
   {lyst=getLYST();
    for(i=0;i<snl;i++)
    {roe=ros.snapshotItem(i);
     cls=roe.getElementsByTagName('td');
     nuc=document.createElement('td');
     if(i==0)
     {nuc.className='BrightFont';
      nuc.innerHTML='Category';
     }else
     {nch=cls[1].getElementsByTagName('a')[0].href;
      nch=nch.substr(nch.indexOf('?')+1);
      npa=pseP(nch,true);
      nch=getP(npa,'category'.toLowerCase())[0];
      for(j=0;j<lyst.length;j++)
      {if(nch==lyst[j].CatNo)
       {nct=lyst[j].Descr;
        break;
       };
      };
      if(j==lyst.length)
      {nct='unknown ('+nch+')';
      };
      nuc.innerHTML='<a href="forum_topics.aspx?category='+nch+
       '">'+nct+'</a>';//end of HTML
     };
     roe.insertBefore(nuc,cls[0]);
    };
   };
   //the unnecessary "Started by" column on the "topics started by" page
   //(which IS necessary on other pages using this same format)
   if(ck4P(TSS,'Y',true)&&MSS.length==1)
    //(both tests are needed; the second one rules out an odd but useful
    // set of pages not available by normal means)
   {el=xp1('//th[@class="pagetitle"]');
    nuc=xp1('//table[@class="forum"]/tbody/tr[2]/td[4]/a|'+
     '//table[@class="forumtopic"]/tbody/tr[2]/td[4]/a').innerHTML;
     //(user name is in column 4 now, since we added a new column above)
    el.innerHTML='Message Forum - Topics Started by <a\n'+
     ' class="reverse"\n'+
     ' href="profile.aspx?member='+encodeURIComponent(nuc)+'"\n'+
     ' style="font-size:100%;"'+'>'+nuc+'</a>'+
     '';//end of HTML
    //now that we've copied the name, suppress the column
    ros=xpo('//table[@class="forum"]/tbody/tr/td[4]|'+
     '//table[@class="forumtopic"]/tbody/tr/td[4]');
    snl=ros.snapshotLength;
    for(i=0;i<snl;i++)
    {roe=ros.snapshotItem(i);
     roe.className='GBBsuppress';
    };
   };
  };
 };
//-=- Code affecting the forum message pages (and similar pages)
 j=0;
 j=(PTH=='forum_msg.aspx')?1:j;//regular or reply version
  //(PTH doesn't distinguish between the two)
 j=(PTH.search(/^news\/.*\/index\.aspx$/)==0)?3:j;//news version
 j=(PTH=='news_page.aspx')?4:j;//news-reply version
 if(j==1)//regular or reply version
 {//the new (or modified) "Hide Top Msg" link, with textual feedback
  el=document.getElementById('FM_lbllnk');
  if(!el)
  {el=document.getElementById('ctl00_Content_ForumMsg1_lbllnk');
   if(!el)
   {el2=document.getElementById('FM_lnkReply');
    if(!el2)
    {el2=document.getElementById('ctl00_Content_ForumMsg1_lnkReply');
     if(el2)
     {el=document.createElement('span');
      if(PTH=='forum_msg.aspx')
      {el.id='FM_lbllnk';
       el2.parentNode.insertBefore(el,el2);
      };
     };
    };
   };
  };
  if(el)
  {el.innerHTML='<a><span id="GBBmhTogg">Hide</span> Top Msg</a>';
   el.addEventListener
   ('click',
    function(e)
     //(this must be a function, not an invocation of a function;
     // adding parameters turns it into an invocation, so it must be
     // encapsulated within a second, anonymous function)
    {ShHi(e,'tbl_stats','GBBmhTogg');
    },
    false
   );
  };
 };
 if(j==3||j==4)//news or news-reply versions
 {//"Hide Top Msg" is pointless here, so we suppress it
  //(currently only necessary on news-reply version, but tested for on
  // regular news version anyway)
  el=document.getElementById('NewsPage1_FM_lbllnk');
  if(el)
  {el.style.display='none';
  };
  //add in the forgotten "forum" stylesheet
  el=document.getElementsByTagName('head')[0];
  nuc=document.createElement('link');
  nuc.href='/css/forum.css';
  nuc.rel='stylesheet';
  nuc.type='text/css';
  el.insertBefore(nuc,el.firstChild);
   //(must be before our Gm-inserted style sheet, so we can override it)
 };
 if(j>0)//all versions
 {//the new highlighting of the author block for one's own messages
  if(ME)//else not logged in - skip it
  {ros=xpo('//td[@class="ForumStats"]');
   snl=ros.snapshotLength;
   for(i=0;i<snl;i++)
   {roe=ros.snapshotItem(i);
    if(roe.getElementsByTagName('a')[0].innerHTML==ME)
    {roe.style.backgroundColor='#FFCC00';
    };
   };
  };
  //the new span to designate message order, and the new link to allow
  // the user to toggle it
  el=xp1('//tr[@class="DetailTableHeader1"]/th[1]');
  if(el)
  {el.innerHTML='REPLIES (<span\n'+
    ' id="GBBmoDesig"></span>est first - <a\n'+
    ' id="GBBmoTogg">toggle</a>)';//end of HTML
   el2=document.getElementById('GBBmoTogg');
   if(el2)
   {el2.addEventListener('click',riMO,false);
   };
  };
  //the reversal of the message order (if the option for it is set), ...
  if(O_RV)
  {rvMO();
  };
  //... and the setting of the span contents
  ioMO();
  //the removal of trailing whitespace from the message editing field
  //(harmless on versions that don't have it)
  el=xp1('//textarea[@id="FM_FPM_txtMSG"]|'+
   '//textarea[@id="ctl00_Content_ForumMsg1_FPM_txtMSG"]');
  if(el)
  {el.value=el.value.replace(/\s+$/g,'');
   el.focus();
  };
 };

//-=-=- Code affecting the private messaging pages
//-=- Code affecting the main PM page (outer frame)
 if(PTH=='pm.aspx')
 {//the new profile icons added to the PM page's user lists
  el=document.getElementById('divBuddies');
  if(el)
  {iPMc.call(el,{type:'GBBscripted'});
    //(iPMc operates on "this", so ".call" is required to set the
    // appropriate "this" within the function)
    //(expects an event object as a parameter; "GBBscripted" is my fake
    // event for this - allowing distinction, if necessary)
  };
  el=document.getElementById('divRequests');
  if(el)//don't assume that the one being there means they're all there
  {iPMc.call(el,{type:'GBBscripted'});
  };
  el=document.getElementById('divPendingRequests');
  if(el)
  {iPMc.call(el,{type:'GBBscripted'});
  };
  el=document.getElementById('divIgnore');
  if(el)
  {iPMc.call(el,{type:'GBBscripted'});
  };
 };
//-=- Code affecting the conversation lists (none as yet)
//-=- Code affecting individual conversations
 if(PTH=='pm_detail.aspx')
 {//the new linkifier for PM conversations
  el=document.getElementById('divConversation');
  if(el)
  {//this page is built entirely with client-side JS, so we have to wait
   // for it to complete before we can scan for and convert links
   window.setTimeout(lCon,1500);//do this 1.5 seconds from now
    //(one second occasionally isn't enough)
  };
 };
//-=- Code affecting the PM new conversation creation pages
//(only, so far, but may be used for other pages later)
 if('/'+PTH+'?'+PMS==GM_getValue('internal.PMframeURL',''))
 {//reset the frame redirector:  you're here, so it's been done - BUT,
  // when this script is active, the outer PM page seems to get loaded
  // twice; why, I don't know, but to compensate, we wait five seconds
  // before doing the reset, so that the data is still there in case
  // the redirect will need to be done over again
  window.setTimeout
  (function()
   {GM_setValue('internal.PMframeURL','')
   },
   5000
  );
 };

//-=-=- Code affecting the profile pages
 if(PTH=='profile.aspx'||PTH=='myprofile.aspx')
 {//the new "Show topics" links on everyone's profile pages
  el=xp1('//*[@class="profImg"]//img');
   //(profImg is the only item in this section that's consistently
   // identifiable on every version of the profile page, but sometimes
   // it's a div, and sometimes it's a td)
  if(el)
  {nct=document.getElementById('MemProfile1_lblmember_id');
   if(!nct)
   {nct=document.getElementById('MyGasbuddyInfo1_lblmember_id');
   };
   if(nct)
   {nct=nct.innerHTML;
    nuc=document.createElement('div');
    nuc.innerHTML='<a\n'+
     ' href="forum_topics.aspx?topicsearch=Y&member_search='+
     encodeURIComponent(nct)+'">Topics\n'+
     ' '+(nct==ME?'I':nct)+' started</a><br>\n'+
     ' <a href="forum_topics.aspx?topicsearch=N&member_search='+
     encodeURIComponent(nct)+'">Topics\n'+
     ' '+(nct==ME?'I':nct)+' participated in</a>';//end HTML (for now)
    el.parentNode.parentNode.insertBefore(nuc,
     el.parentNode.nextSibling);
    //the new "send PM" links on the profile pages of those on your list
    if(ME&&nct!=ME)//not logged in?  my own profile?  skip it
    {el2=document.getElementById('MemProfile1_InviteBuddy');
     if(!el2)//yet to be invited?  skip it
     {nch=document.createElement('br');
      nuc.insertBefore(nch,null);
      roe=document.createElement('a');
      roe.href='/pm.aspx';
      roe.addEventListener
      ('click',
       function()
       {GM_setValue('internal.PMframeURL',
         '/pm_send.aspx?to='+encodeURIComponent(nct));
         //XXX:  might be better to pass this in HSH instead
       },
       false
      );
      nuc.insertBefore(roe,null);
      roe.innerHTML='Send a PM to '+nct;
     };
    };
   };
  };
  //the unnecessary forced line breaks in the upper section of the
  // profile pages (so far there's only one, but just in case ...)
  ros=xpo('//div[@id="profile_text"]/ul/li/label/br');
  snl=ros.snapshotLength;
  for(i=0;i<snl;i++)
  {roe=ros.snapshotItem(i);
   roe.parentNode.removeChild(roe);
  };
  //the redundant info in the Points Summary of the "My Profile" page
  //(the numbers themselves are in spans with ids, but we want to
  // suppress the entire row containing the cell containing the span)
  el=document.getElementById
   ('MyPhotos1_PointsFormView_lblMessagesPosted');
  if(el)
  {el.parentNode.parentNode.style.display='none';
  };
  el=document.getElementById('MyPhotos1_PointsFormView_lblDays_Active');
  if(el)
  {el.parentNode.parentNode.style.display='none';
  };
  el=document.getElementById('MyPhotos1_PointsFormView_lblRank');
  if(el)
  {el.parentNode.parentNode.style.display='none';
  };
  //the missing info in the "Details of Points" section of the
  // "My Profile" page
  el=xp1('//table[@id="MyPhotos1_PointsFormView"]//'+
   'table//td[2]//tr[3]');
  if(el)
  {nuc=document.createElement('tr');
   el.parentNode.insertBefore(nuc,el);//(must insert before filling)
   nuc.innerHTML=' <td>Become a Member</td>\n'+
    ' <td style="text-align:right;">100</td>\n'+
    ' <td style="text-align:right;">0</td>\n'+
     //(this is wrong on one's first day, but good enough)
    '';//end of HTML
  };
 };

//-=-=- Code affecting the photo pages (none as yet)
};

function GBB_SetUTY()
{if(confirm('The current behavior for GB "Thank You" pages\n'+
  'is to show the "'+(O_TY?'previously used':'GB default')+
  '" FSL.  Would you\n'+
  'like to change this to "'+(O_TY?'GB default':'previously used')+
  '" for future\n'+
  'page loads?'+
  ''))//end of text
 {O_TY=!O_TY;
  GM_setValue('GBTYUsesLastFSL',O_TY);
 };
};
function GBB_SetMap()
{var el=document.getElementById('txtLinkToPage');
 if(el)
 {var nct=el.value.replace(/.*\?/,'');
  if(confirm('The parameters for the GB map page are currently\n'+
   (O_LL?'"'+O_LL+'".\n':'unspecified.  ')+
   'Are you sure you want to change them to\n'+
   '"'+nct+'"\n'+
   'for future page loads?'+
   ''))//end of text
  {O_LL=nct;
   GM_setValue('GBPriceMapSettings',O_LL);
  };
 };
};
function GBB_SetLns()
{if(confirm('The current setting for GB topic lists shows them in\n'+
  '"'+(O_TL?'two':'one')+'-line format".  '+
  'Would you like to change this to \n'+
  '"'+(O_TL?'one':'two')+'-line format" for future page loads?'+
  ''))//end of text
 {O_TL=!O_TL;//changes the default, NOT the "per page" (Orv) value
  GM_setValue('GB2LineTopicLists',O_TL);
 };
};
function GBB_SetOrd()
{if(confirm('The current default for GB message order is\n'+
  '"'+(O_RV?'old':'new')+'est first".  '+
  'Would you like to change this to \n'+
  '"'+(O_RV?'new':'old')+'est first" for future page loads?\n\n'+
  '(The toggle on the page itself only changes that\n'+
  'page, not the default.)'+
  ''))//end of text
 {O_RV=!O_RV;//changes the default, NOT the "per page" (Orv) value
  GM_setValue('GBMessageOrderReversed',O_RV);
 };
};

//-=-=-=- Subroutines
//~!~!~!~ Self-updater
function SUpE_SelfUpdater()
{//localizable strings
 const CKNOW='Check Now For ';
 const UPDTE=' Update';
 const SETTT='Set ';
 const UPIVL=' Update Interval';
 const ITAPP='It appears this is the first time you\'ve used\n'+
  'the ';
 const ISDES=' script.\n'+
  'This script is designed to automatically\n'+
  'check for updates every ';
 const CHIVL='.\n'+
  'Would you like to change this interval?'
 const HWLNG='How long would you like the ';
 const WAITB='\n'+
  'script to wait between update checks?\n'+
  'Enter an interval such as "12 hours" or "1 week".';
 const DIDNT='I didn\'t understand that.\n\n';
 const UPIN4='The update interval for the ';
 const REMAI='\n'+
  'script remains set at ';
 const UMAYS='.  You may\n'+
  'select "';
 const FRMTH='" from the\n'+
  '"User Script Commands..." menu at any time\n'+
  'to change this.';
 const THRIS='There is an update available for the\n';
 const GRSCR=' Greasemonkey script.';
 const INSIT='\n'+
  'Would you like to install it?';
 const UWILB='You will be reminded about this update again\n'+
  'in ';
 const THRNO='There is no update available for the\n';
 const SELFU='The self-updater for the ';
 const WASUN='\n'+
  'script was unable to locate any valid update\n'+
  'information.  This could mean that this\n'+
  'computer has lost its Internet connection, or\n'+
  'that the original site for this script has gone\n'+
  'down, moved, or disappeared.\n\n'+
  'This script will check again in '
 //l10n not recommended
 const S_LU='SUpE_LastUpdateCheck';
 const S_UF='SUpE_UpdateFrequency';
 const INVDT='Invalid Date';

 var parms=parseParms(SUpE_META);
 if(!parms.shortname)
 {parms.shortname=parms.name;
 };
 GM_registerMenuCommand
 (SETTT+parms.shortname+UPIVL,
  function()
  {GM_setValue(S_UF,askUF(parms,GM_getValue(S_UF)));
  }
 );
 GM_registerMenuCommand
 (CKNOW+parms.shortname+UPDTE,
  function()
  {parms.m=true;
   doUpCk();
  }
 );
 var LU=new Date(GM_getValue(S_LU,''));
 if(LU.toString()==INVDT)
 {LU=new Date(0);
  GM_setValue(S_LU,LU.toString());
 };
 var UF=GM_getValue(S_UF,'');
 if(!toMillis(UF))
 {if(!confirm(ITAPP+parms.name+ISDES+parms.frequency+CHIVL))
  {UF=parms.frequency;
   GM_setValue(S_UF,UF);
   alert(UPIN4+parms.name+REMAI+UF+UMAYS+SETTT+parms.shortname+UPIVL+
    FRMTH);
  }else
  {UF=askUF(parms,parms.frequency);
   GM_setValue(S_UF,UF);
  };
 };
 if(Number(new Date(LU))+toMillis(UF)<=new Date())
 {doUpCk();
 };
 function doUpCk()
 {LU=new Date();
  GM_setValue(S_LU,LU.toString());
  doXHRs();
 };
 function doXHRs(xhr)
 {var lyn,dte;
  GM_log('pass '+parms.i);
  if(!xhr)
  {GM_log('no response to look at - moving on');
   nextXHR(parms);
  }else
  {GM_log('response received');
   if(!xhr.status)
   {GM_log('no status found in response - moving on');
    nextXHR(parms);
   }else
   {GM_log('status code of "'+xhr.status+'" received');
    if(xhr.status!=200)
    {GM_log('error status received - moving on');
     nextXHR(parms);
    }else
    {GM_log('successful status received');
     if(!xhr.responseText)
     {GM_log('no response text received - moving on');
      nextXHR(parms);
     }else
     {GM_log(xhr.responseText.length+
       ' characters of response text received');
      lyn=xhr.responseText.
       match(/\/\/ \@released\s+([^\r\n<]+)\s*[\r\n<]/);
      if(!lyn||!lyn[1])
      {GM_log('no release date in response text - moving on');
       nextXHR(parms);
      }else
      {dte=new Date(lyn[1]);
       if(dte.toString()==INVDT)
       {GM_log('release date uninterpretable - moving on');
        nextXHR(parms);
       }else
       {GM_log('release date of "'+dte.toString()+
         '" found in response');
        GM_log('comparing to installed release - "'+
         parms.released.toString()+'"');
        if(parms.released<dte)
        {GM_log('release found is newer - '+
         'getting new release from '+parms.scriptURLs[parms.i-1]);
         if(confirm(THRIS+parms.name+GRSCR+INSIT))
         {GM_openInTab(parms.scriptURLs[parms.i-1]);
         }else
         {alert(UWILB+UF+UMAYS+SETTT+parms.shortname+UPIVL+FRMTH);
         };
         //reset for next time (if any)
         parms.i=0;
         parms.m=false;
        }else
        {GM_log('release found is not newer - ending update check');
         if(parms.m)
         {alert(THRNO+parms.name+GRSCR);
         };
         //reset for next time (if any)
         parms.i=0;
         parms.m=false;
        };//end if(parms.released<dte)
       };//end if(dte.toString()==INVDT)
      };//end if(!lyn||!lyn[1])
     };//end if(!xhr.responseText)
    };//end if(xhr.status!=200)
   };//end if(!xhr.status)
  };//end if(!xhr)
 };//end doXHRs()
 function nextXHR(pms)
 {if(pms.releaseURLs[pms.i])
  {GM_log('update check #'+(pms.i+1)+' - checking '+
    pms.releaseURLs[pms.i]);
   GM_xmlhttpRequest
   ({method:            'GET',
     url:               pms.releaseURLs[pms.i],
     headers:
     {'Cache-Control':  'no-cache',
      'Pragma':         'no-cache'
     },
     onerror:           doXHRs,
     onload:            doXHRs
    }
   );
   pms.i++;
  }else
  {GM_log('ran out of places to look for updates');
   if(confirm(SELFU+pms.name+WASUN+UF+CHIVL))
   {UF=askUF(pms,UF);
    GM_setValue(S_UF,UF);
   };
   //reset for next time (if any)
   pms.i=0;
   pms.m=false;
  };
 };

 //subroutines
 function parseParms(metaBlock)
 {var metalines=metaBlock.match(/^\/\/ \@\S+\s+.+$/gm);
  var metaparms=new ParmPack;
  var lineparts,i;
  for(i=0;i<metalines.length;i++)
  {lineparts=metalines[i].match(/^\/\/ \@(\S+)\s+(.+)$/);
   switch(lineparts[1])
   {case 'name':
    case 'shortname':
     metaparms[lineparts[1]]=lineparts[2];
     break;
    case 'released':
     metaparms[lineparts[1]]=new Date(lineparts[2]);
     break;
    case 'frequency':
     if(toMillis(lineparts[2]))
     {metaparms[lineparts[1]]=lineparts[2];
     };
     break;
    case 'releaseURL':
    case 'scriptURL':
     metaparms[lineparts[1]+'s'].push(lineparts[2]);
     break;
   };
  };
  return metaparms;
 };
 function toMillis(lyne)
 {if(!lyne)
  {return null;
  };
  var wurds=lyne.split(/\s+/);
  if(wurds.length!=2)
  {return null;
  };
  switch(wurds[1].toLowerCase())
  {case 'months':
   case 'month':
    wurds[0]*=4.4;//close enough
   case 'weeks':
   case 'week':
    wurds[0]*=7;
   case 'days':
   case 'day':
    wurds[0]*=24;
   case 'hours':
   case 'hour':
    wurds[0]*=60;
   case 'minutes':
   case 'minute':
    return wurds[0]*60*1000;
   default:
    return null;
  };
 };
 function askUF(pms,was)
 {var x=prompt(HWLNG+pms.name+WAITB,was);
  if(x==null)
  {alert(UPIN4+pms.name+REMAI+was+UMAYS+SETTT+pms.shortname+UPIVL+
    FRMTH);
   return was;
  }else
  {while(!toMillis(x))
   {x=prompt(DIDNT+HWLNG+pms.name+WAITB,was);
    if(x==null)
    {alert(UPIN4+pms.name+REMAI+was+UMAYS+SETTT+pms.shortname+UPIVL+
      FRMTH);
     return was;
    };
   };
   return x;
  };
 };

 //constructor
 function ParmPack()
 {this.name=null;
  this.shortname=null;
  this.released=null;
  this.frequency=null;
  this.releaseURLs=[];
  this.scriptURLs=[];
  this.i=0;
  this.m=false;
 };
};
//~!~!~!~ End of Self-updater code

//-=-=- XPath query shortcuts
function xpo(qry)
{return document.evaluate(qry,document,null,
  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
};
function xp1(qry)
{return document.evaluate(qry,document,null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
};

//-=-=- URL parameter parsing
function pseP(str,cin)
{if(str.length==0)
 {return [];
 };
 var prs=str.split('&');
 var i,nnv,j;
 var ary=[];
 for(i=0;i<prs.length;i++)
 {nnv=prs[i].split('=');
  if(cin)//case insensitive names
  {nnv[0]=nnv[0].toLowerCase();
  };
  for(j=0;j<ary.length;j++)
  {if(ary[j][0]==nnv[0])
   {break;
   };
  };
  if(j==ary.length)//then not found
  {ary.push(new Array(nnv[0],new Array(nnv[1])));
  }else
  {ary[j][1].push(nnv[1]);
  };
 };
 return ary;
};
function getP(ary,nam)
{var i;
 for(i=0;i<ary.length;i++)
 {if(ary[i][0]==nam)
  {break;
  };
 };
 if(i==ary.length)//then not found
 {return new Array();
 }else
 {return ary[i][1];
 };
};
function ck4P(sry,vlu,civ)
{var i;
 for(i=0;i<sry.length;i++)
 {if(civ)//case insensitive values
  {if(sry[i].toLowerCase()==vlu.toLowerCase())
   {return true;
   };
  }else
  {if(sry[i]==vlu)
   {return true;
   };
  };
 };
 return false;//if not found
};
function ckPv(ary,nam,vlu,civ)
{var vls=getP(ary,nam);
 return ck4P(vls,vlu,civ);
};

//-=-=- find position of an element
//slightly modified from <http://www.quirksmode.org/js/findpos.html>
function findPos(obj)
{var curleft=0;
 var curtop=0;
 if(obj.offsetParent)
 {do
  {curleft+=obj.offsetLeft;
   curtop+=obj.offsetTop;
  }while(obj=obj.offsetParent);//assignment (=), not equality test (==)
  return[curleft,curtop];
 }else
 {return[null,null];
 };
};

//-=-=- inbox highlighter
function InbH(e)
{var ros,snl,i,roe,npa;
 var n=0;
 ros=xpo('//*[contains(@id,"PMUnreadMsg")]|'+
  '//*[contains(@id,"PMBuddyReq")]');
  //(should really use "ends-with", but XPath has no such function)
 snl=ros.snapshotLength;
 for(i=0;i<snl;i++)
 {roe=ros.snapshotItem(i);
  n+=(+roe.innerHTML);
 };
 for(i=0;i<snl;i++)
 {roe=ros.snapshotItem(i);
  npa=roe.parentNode.parentNode;
  //prevent recursion
  npa.removeEventListener('DOMNodeInserted',InbH,false);
  if(n>0)
  {npa.className='GBBinbxY';
  }else
  {npa.className='GBBinbxN';
  };
  //detect changes
  npa.addEventListener('DOMNodeInserted',InbH,false);
 };
};

//-=-=- Google search field
function gosI(e)
{this.style.background='#FFFFFF';
};
function gosO(e)
{if(this.value=='')
 {this.style.background='#FFFFFF left no-repeat'+
  ' url(http://www.google.com/coop/intl/'+
    'en/images/google_custom_search_watermark.gif)';
 };
};

//-=-=- show/hide toggling
function ShHi(e,togn,txtn)
{var tgel=document.getElementById(togn);
 var f=true;
 var txel;
 if(txtn)
 {txel=document.getElementById(txtn);
 };
 if(tgel)
 {if(tgel.style.display=='none')
  {tgel.style.display='inline';
  }else
  {tgel.style.display='none';
   f=false;
  };
 };
 if(txel)
 {if(txtn&&f)
  {txel.innerHTML='Hide';
  }else
  {txel.innerHTML='Show';
  };
 };
};

//-=-=- link to map
function lMUp()
{var el=document.getElementById('txtLinkToPage');
 var nuc,el2;
 if(el)
 {nuc=document.createElement('span');
  nuc.innerHTML='&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+
   '&nbsp;<a id="GBBdMap" style="cursor:pointer;">Set as default</a>';
  el.parentNode.insertBefore(nuc,el);
  el2=document.getElementById('GBBdMap');
  if(el2)
  {el2.addEventListener('click',GBB_SetMap,false);
  };
 };
};

//-=-=- message ordering
function rvMO()
{var ros=xpo('//table[@class="forumtable"]/tbody[count(tr)>3]/tr');
 var snl=ros.snapshotLength;
 var i,roe,oi,oro,rns;
 for(i=0;i<Math.floor(snl/4)*2;i++)
 {roe=ros.snapshotItem(i);
  oi=snl-i;
  oi-=(oi%2)?0:2;
  oro=ros.snapshotItem(oi);
  rns=roe.nextSibling;
  oro.parentNode.replaceChild(roe,oro);
  roe.parentNode.insertBefore(oro,rns);
 };
};
function ioMO()
{var el=document.getElementById('GBBmoDesig');
 if(el)
 {el.innerHTML=Orv?'old':'new';
 };
};
function riMO(e)
{rvMO();
 Orv=!Orv;
 ioMO();
};

//-=-=- column insertion for PM page
function iPMc(e)
{//prevent recursion
 this.removeEventListener('DOMNodeInserted',iPMc,false);
 var ros=xpo('//div[@id="'+this.id+'"]/table/tbody/tr');
 var snl=ros.snapshotLength;
 var i,roe,cls,mbr,nuc;
 for(i=0;i<snl;i++)
 {roe=ros.snapshotItem(i);
  cls=roe.getElementsByTagName('td');
  mbr=cls[0];
  while(mbr.childNodes[0].tagName!=undefined)
  {mbr=mbr.childNodes[0];
  };
  mbr=mbr.innerHTML;
  if(mbr.length<=19)//>19 is an error message
  {if(cls[1]&&cls[1].innerHTML.search(/profile/)!=-1)
   {//do nothing; profile cell already present
   }else
   {nuc=document.createElement('td');
    nuc.className='tablelist';
    nuc.style.width='16px';
    if(mbr=='GB Moderator')
    {//keep cell empty
    }else
    {nuc.innerHTML='<a href="/profile.aspx?member='+
      encodeURIComponent(mbr)+'"\n'+
      ' target="_blank"><img border="0" height="16"\n'+
      ' src="'+getPICN()+'"\n'+
      ' title="View profile for '+mbr+'" width="16"></a>'+
      '';//end of HTML
    };
    roe.insertBefore(nuc,cls[0].nextSibling);
     //(simulate insertAfter, since cls[1] may or may not exist)
   };
  };
 };
 //detect changes
 this.addEventListener('DOMNodeInserted',iPMc,false);
};

//-=-=- linkification
function lCon()
{ros=xpo
 ('//div[starts-with(@id,"conv_msg0")]|'+
  '//div[starts-with(@id,"conv_msg1")]|'+
  '//div[starts-with(@id,"conv_msg2")]|'+
  '//div[starts-with(@id,"conv_msg3")]|'+
  '//div[starts-with(@id,"conv_msg4")]|'+
  '//div[starts-with(@id,"conv_msg5")]|'+
  '//div[starts-with(@id,"conv_msg6")]|'+
  '//div[starts-with(@id,"conv_msg7")]|'+
  '//div[starts-with(@id,"conv_msg8")]|'+
  '//div[starts-with(@id,"conv_msg9")]'
 );
 snl=ros.snapshotLength;
 for(i=0;i<snl;i++)
 {roe=ros.snapshotItem(i);
  lkfy(roe);
 };
};
function lkfy(el)
{el.innerHTML=el.innerHTML.replace
 (/\[L=([^\s\]]+)\]([^\[]+)\[\/L\]/g,
  '<a href="$1" target="_blank">$2</a>'
 );
};

//-=-=-=- pseudo-constants
//(not declared with const because of their size; pages that don't need
// them would be slowed down parsing the declarations)
//-=-=- style sheet modifications
function getSTYL()
{return ''+//param must start on this line, or JS assumes ";" (EOS)
//-=- Styles relevant to most every page
 //an attempt to set a consistent font and style for the entire site
 //(I still don't think this works everywhere; if I find places where
 // it doesn't, I'll add them)
 'body, table, select, input\n'+
 '{font-family:"Verdana","Arial","Helvetica","sans-serif";\n'+
 ' font-weight:normal;\n'+
 '}\n'+
 'body\n'+
 '{font-size:10pt;\n'+
 '}\n'+
 'select, input\n'+
 '{font-size:80%;\n'+
 '}\n'+
 'textarea\n'+
 '{font-family:inherit; font-size:inherit;\n'+
 '}\n'+
 //an attempt to standardize the font and style for all clickable links
 //(overriden many times in the various pages, all of which -
 // hopefully - are overridden themselves later in this style sheet)
 'a, a:link, a:visited, a:hover, a:active\n'+
 '{color:#0066CC; font-weight:normal; text-decoration:none;\n'+
 '}\n'+
 //a generic custom style to suppress various items on various pages
 '.GBBsuppress\n'+
 '{display:none;\n'+
 '}\n'+
 //generic custom styles for alternate highlighting of various items
 '.GBBhibd\n'+
 '{background-color:#FF6699;\n'+
 '}\n'+
 '.GBBhigd\n'+
 '{background-color:#33CC66;\n'+
 '}\n'+
 //the cleanup of the top line for logged-in users
 '#TB_panMember, #ctl00_TB_panMember,\n'+
 '#TB_panVisitor, #ctl00_TB_panVisitor\n'+
 '{padding-left:0.5em;\n'+
 '}\n'+
 '#TB_panMember span, #TB_panMember2 span,\n'+
 '#ctl00_TB_panMember span, #ctl00_TB_panMember2 span\n'+
 '{font-weight:normal !important;\n'+
 '}\n'+//
 '#TB_imgCar, #ctl00_TB_imgCar\n'+
 '{vertical-align:top;\n'+
 '}\n'+
 //custom styles for the "Inbox" notifications at the top of every page
 // and in the "My Activity" box on the home page (when logged in)
 '.GBBinbxY\n'+
 '{background-color:#FFCC00;\n'+
 '}\n'+
 '.GBBinbxN, .GBBinbxY\n'+
 '{color:#0066CC; padding:2px;\n'+
 '}\n'+
 '.GBBinbxN img, .GBBinbxY img\n'+
 '{vertical-align:top;\n'+
 '}\n'+
 '.GBBinbxN td, .GBBinbxY td\n'+
 '{color:#0066CC;\n'+
 '}\n'+
 '.GBBinbxN b, .GBBinbxY b\n'+
 '{font-weight:normal;\n'+
 '}\n'+
 //the Google text ads to the extreme top right of every page
 //(the ad structure consists of a table header of class="TextAdHeader",
 // with an unclassed anchor inside it, with spans of any or all three
 // of these classes inside of that)
 '.TextAdHeader, .TextAdText, .TextAdLink\n'+
 '{color:#0066CC; text-decoration:none;\n'+
 '}\n'+
 //custom styles for the new Google search box
 '#GBBgoogD\n'+
 '{height:1.5em; min-height:18px; min-width:350px;\n'+
 ' position:absolute;\n'+
 '}\n'+
 '#GBBgoogD form\n'+
 '{white-space:nowrap;\n'+
 '}\n'+
 '#GBBgoogQ\n'+
 '{background:#FFFFFF left no-repeat\n'+
 '  url(http://www.google.com/coop/intl/en/'+
    'images/google_custom_search_watermark.gif);\n'+
 ' border:1px solid #7E9DB9; font-size:85%; min-height:16px;\n'+
 ' min-width:119px; padding:2px; width:25em;\n'+
 '}\n'+
 //adjustments to the new GB price search
 //(something here - I'm still not sure what - causes this to appear
 // below its proper position; this is to compensate for that)
 '.GBHDsbox\n'+
 '{margin-top:-60px;\n'+
 '}\n'+
 '.GBHDheader, .GBHDsearch, .ac_text, .ac_wm_text, .main_col\n'+
 '{font-family:inherit;\n'+
 '}\n'+
 //the links in the main menu bar and fuel types bar
 //(the main menu anchors are not classed; this class is used on spans
 // within the anchor instead)
 //(this class should not be confused with class="Menu", class="Menu2",
 // class="Menu_Photo", class="highlight", class="highlight2", or
 // class="highlight_Photo", all of which are also used in the main menu
 // bar)
 '.menu\n'+
 '{color:#0066CC; font-weight:normal;\n'+
 '}\n'+
 //links in the secondary menu bar
 //(again, the font change causes these to overflow their space)
 'a.reverse, a.reverse:link, a.reverse:visited,\n'+
 ' a.reverse:hover, a.reverse:active\n'+
 '{color:#99CCFF; font-size:80%; text-decoration:none;\n'+
 '}\n'+
 'a.reverse[disabled], a.reverse[disabled]:link,\n'+
 ' a.reverse[disabled]:visited, a.reverse[disabled]:hover,\n'+
 ' a.reverse[disabled]:active\n'+
 '{color:#FFFFFF;\n'+
 '}\n'+
 //the FSL header bar
 '.BrightFont\n'+
 '{font-weight:normal;\n'+
 '}\n'+
 '.BrightFont a, .BrightFont a:link, .BrightFont a:visited,\n'+
 ' .BrightFont a:hover, .BrightFont a:active\n'+
 '{color:#99CCFF;\n'+
 '}\n'+
 //links at the bottom of the page
 'a.black, a.black:link, a.black:visited,\n'+
 ' a.black:hover, a.black:active\n'+
 '{color:#0066CC; text-decoration:none;\n'+
 '}\n'+
//-=- Styles relevant to every site's home page
 //links to change the fuel type shown in the listings
 //(these were implicitly styled above, but the specific declarations
 // with class and pseudo-class must also be overridden)
 'a.FuelType, a.FuelType:link, a.FuelType:visited,\n'+
 ' a.FuelType:hover, a.FuelType:active\n'+
 '{color:#0066CC; font-size:120%; font-weight:normal;\n'+
 '}\n'+
 'a.FuelTypeActive, a.FuelTypeActive:link, a.FuelTypeActive:visited,\n'+
 ' a.FuelTypeActive:hover, a.FuelTypeActive:active\n'+
 '{color:#99CCFF; font-size:120%; font-weight:normal;\n'+
 '}\n'+
 //links to searches for the clicked-on station name or area
 'a.PTLink, a.PTLink:link, a.PTLink:visited,\n'+
 ' a.PTLink:hover, a.PTLink:active\n'+
 '{color:#0066CC; font-weight:normal; text-decoration:none;\n'+
 '}\n'+
 //(station names in FSLs are within a span set to bold; !important is
 // required to override this)
 'a.PTLink span\n'+
 '{font-weight:normal !important;\n'+
 '}\n'+
 //links to member profiles
 'a.MPLink, a.MPLink:link, a.MPLink:visited,\n'+
 ' a.MPLink:hover, a.MPLink:active\n'+
 '{color:#0066CC; font-weight:normal; text-decoration:none;\n'+
 '}\n'+
 //the login block on the home page, and on the separate login page
 //(this undoes a side effect of other code here)
 'tr.login\n'+
 '{font-size:100%;\n'+
 '}\n'+
//-=- Styles relevant to the Favorite Station List pages (none as yet)
//-=- Styles relevant to the map pages
 //(whoever designed this is overly obsessed with exact pixel sizes!)
 //(all styles are set directly on the HTML tags; !important is
 // required to override them)
 //the prices in the station popup
 '#spnReg, #spnMid, #spnPrem, #spnDiesel\n'+
 '{padding-left:0 !important;\n'+
 '}\n'+
 //the ad block and comments field in the station popup
 '#tblAds div, #txtComments\n'+
 '{height:auto !important;\n'+
 '}\n'+
 //the "Submit" and "Cancel" buttons in the station popup
 '#btnSubmitPrices, #btnCancelSubmitPrices\n'+
 '{font-size:80% !important; height:auto !important;\n'+
 ' width:50% !important;\n'+
 '}\n'+
//-=- Styles relevant to the Master Station List pages
 //the captions and help text on the individual station pages
 '.fieldcaption, .fieldcaption b, .fieldcaption strong\n'+
 '{font-weight:normal;\n'+
 '}\n'+
 //the submit buttons on the individual station pages
 '#AddMasterStation3_btnAddMasterStation,\n'+
 '#AddMasterStation3_cmdCancel\n'+
 '{font-size:100%;\n'+
 '}\n'+
 //the popup box for station status
 '#divStatusPopup\n'+
 '{left:8px !important;\n'+
 '}\n'+
 //the column headings on the leaderboard page
 //(style is set directly on the anchors; !important is required to
 // override this)
 '#MSLLB_lbSite, #MSLLB_lbTotal, #MSLLB_lbTPC, #MSLLB_lbEntered24\n'+
 '{color:#99CCFF !important;\n'+
 '}\n'+
 //the active tab on the "Recent Changes" page
 'a.recent_activetab\n'+
 '{color:#99CCFF\n'+
 '}\n'+
 //the "edit" links on the "Recent Changes" page
 'td.recent_editlink\n'+
 '{color:#0066CC; text-decoration:none;\n'+
 '}\n'+
//-=- Styles relevant to the FAQ page (none as yet)
//-=- Styles relevant to the forum pages
 //the category heading on the forum topic list pages
 '#FT_lblCategory, #FT_lblCategoryBottom\n'+
 '{font-weight:normal;\n'+
 '}\n'+
 //the "Post New Topic" links on the forum topic list pages
 '#FT_lnkNew b, ctl00_Content_FT_lnkNew b\n'+
 '{font-weight:normal;\n'+
 '}\n'+//(as opposed to ...)
 //the unnecessary and confusing "Post New Topic" links on the forum
 // message pages
 '#FM_lnkNew, #ctl00_Content_ForumMsg1_lnkNew\n'+
 '{display:none;\n'+
 '}\n'+
 //the useless "Rate this topic" section on the forum message pages
 '#forumtop tr:first-child+tr\n'+
 '{display:none;\n'+
 '}\n'+
 //the "Hide Top Msg" link - now added to all forum message pages
 //(color is not set on this span, but on the unnamed, unclassed anchor
 // within it; !important is required to override this)
 '#FM_lbllnk a, #NewsPage1_FM_lbllnk a,\n'+
 ' #ctl00_Content_ForumMsg1_lbllnk a\n'+
 '{color:#99CCFF !important; cursor:pointer;\n'+
 '}\n'+
 //the "Post a Reply" and "Back to Topics" links at the top and bottom
 // of the forum message pages
 //(this undoes a side effect of "a.reverse" above)
 '#FM_lnkReply, #NewsPage1_FM_lnkReply,\n'+
 ' #FM_aBacktoTopics, #NewsPage1_FM_aBacktoTopics,\n'+
 ' #FM_lnkReply2, #NewsPage1_FM_lnkReply2,\n'+
 ' #FM_aBacktoTopics2, #NewsPage1_FM_aBacktoTopics2,\n'+
 ' #ctl00_Content_ForumMsg1_lnkReply,\n'+
 ' #ctl00_Content_ForumMsg1_aBacktoTopics\n'+
 '{font-size:100%;\n'+
 '}\n'+
 //this script's custom link for toggling message order
 '#GBBmoTogg\n'+
 '{color:#99CCFF; cursor:pointer;\n'+
 '}\n'+
 //the "Check Spelling" and "Edit" buttons on the forum message posting
 // pages
 '#FM_FPM_btnPreview, #NewsPage1_FM_FPM_btnPreview,\n'+
 ' #FM_FPM_btnEditMSG, #NewsPage1_FM_FPM_btnEditMSG,\n'+
 ' #ctl00_Content_ForumMsg1_FPM_btnPreview,\n'+
 ' #ctl00_Content_ForumMsg1_FPM_btnEditMSG\n'+
 '{display:none;\n'+
 '}\n'+
 //the left side block on individual forum messages
 //(only really needed for Opera)
 '.ForumStats\n'+
 '{vertical-align:top;\n'+
 '}\n'+
//-=- Styles relevant to the private messaging pages
 //the name sections on the left side of the main messaging page
 '#divBuddies, #divPendingRequests\n'+
 '{height:201px;\n'+
 '}\n'+
 //the individual name rows on the left side of the main messaging page
 'tr.mout, tr.listover, tr.listout\n'+
 '{height:17px;\n'+
 '}\n'+
 //the "Previous" and "Next" links (if any) in the PM subframe
 //(style is set directly in the HTML; !important is required to
 // override this)
 '.pm_header a\n'+
 '{color:99CCFF !important;\n'+
 '}\n'+
 //the list of messages in the PM subframe
 'a.PMLink, a.PMLink:link, a.PMLink:visited,\n'+
 ' a.PMLink:hover, a.PMLink:active\n'+
 '{color:0066CC; text-decoration:none;\n'+
 '}\n'+
 //the expanded message text in the PM subframe
 'div.PMFullMessage\n'+
 '{font-family:inherit;\n'+
 '}\n'+
 //the "Check Spelling" button in the editing section of the PM
 // subframe
 '#btnPreview\n'+
 '{display:none;\n'+
 '}\n'+
//-=- Styles relevant to the profile pages
 //the primary menu on all profile pages
 '.selected_Photo\n'+
 '{font-weight:normal;\n'+
 '}\n'+
 //the tertiary menu on all profile pages
 '.headband\n'+
 '{font-weight:normal;\n'+
 '}\n'+
 '.bNav\n'+
 '{height:auto;\n'+
 '}\n'+
 '.bNav a, .bNav a:link, .bNav a:visited,\n'+
 ' .bNav a:hover, .bNav a:active, .bNav li a:hover\n'+
 '{color:#0066CC;\n'+
 ' font-family:inherit; font-size:80%;\n'+
 ' font-weight:normal; text-decoration:none;\n'+
 '}\n'+
 '.selTab a, .selTab a:link, .selTab a:visited, .selTab a:hover,\n'+
 ' .selTab a:active, li.selTab span a:hover\n'+
 '{color:#99CCFF; text-decoration:none;\n'+
 '}\n'+
 //the links under the main photo on the user's own profile page
 '.profImg a:hover\n'+
 '{text-decoration:none;\n'+
 '}\n'+
 //headings for the member stats and data sections on all profile pages
 '#profile_about h4, .profile_info h4\n'+
 '{height:auto; text-decoration:none; width:9em;\n'+
 '}\n'+
 //labels for individual stats and data lines on all profile pages
 '#profile_about label, .profile_info label\n'+
 '{width:10em;\n'+
 '}\n'+
 //data for individual stats lines on all profile pages
 '.profile_info b\n'+
 '{font-weight:normal;\n'+
 '}\n'+
 //the buddy list column on all profile pages
 //(unequal heights for previous divs can sometimes screw this up)
 '#MemProfile1_buddy_photo_table\n'+
 '{clear:both;\n'+
 '}\n'+
 //the captions for the avatars on the profile and buddy list pages
 '.buddyItem a span\n'+
 '{font-weight:normal;\n'+
 '}\n'+
 //the data entries on one's own profile page
 //(for some reason, setting these by the class's children, as GB does,
 // doesn't work here)
 //(font style is specified by parent class as above, but also
 // explicitly set as an attribute of these spans; !important would be
 // required to override this, but we don't do this, to keep the empty
 // fields differentiable)
 //(font weight is also explicitly set as an attribute of these spans,
 // but :hover action is left to the CSS; nevertheless, !important is
 // required to override both of these)
 '#pro_span_Birthday, #pro_span_Hobbies,\n'+
 ' #pro_span_Job, #pro_span_Education,\n'+
 ' #pro_span_Foods, #pro_span_TVShows,\n'+
 ' #pro_span_Movies, #pro_span_Quote,\n'+
 ' #pro_span_Tips\n'+
 '{color:#0066CC; font-weight:normal !important;\n'+
 '}\n'+
 '#pro_span_Birthday:hover, #pro_span_Hobbies:hover,\n'+
 ' #pro_span_Job:hover, #pro_span_Education:hover,\n'+
 ' #pro_span_Foods:hover, #pro_span_TVShows:hover,\n'+
 ' #pro_span_Movies:hover, #pro_span_Quote:hover,\n'+
 ' #pro_span_Tips:hover\n'+
 '{background-color:lightgrey !important;\n'+
 '}\n'+
 //the data entries on other users' profile pages
 //(for some reason, setting these by the class's children, as GB does,
 // doesn't work here)
 //(the font styling from the spans is also overridden here, to keep the
 // empty fields differentiable)
 //(in this version of the page, font weight is set with HTML bold tags;
 // because of this, !important is not required to override this, but IS
 // required to override the :hover action)
 '#MemProfile1_lblBirthday b, #MemProfile1_lblHobbies b,\n'+
 ' #MemProfile1_lblJob b, #MemProfile1_lblEducation b,\n'+
 ' #MemProfile1_lblFoods b, #MemProfile1_lblTVShows b,\n'+
 ' #MemProfile1_lblMovies b, #MemProfile1_lblQuote b,\n'+
 ' #MemProfile1_lblTips b\n'+
 '{font-style:normal; font-weight:normal;\n'+
 '}\n'+
 '#MemProfile1_lblBirthday:hover, #MemProfile1_lblHobbies:hover,\n'+
 ' #MemProfile1_lblJob:hover, #MemProfile1_lblEducation:hover,\n'+
 ' #MemProfile1_lblFoods:hover, #MemProfile1_lblTVShows:hover,\n'+
 ' #MemProfile1_lblMovies:hover, #MemProfile1_lblQuote:hover,\n'+
 ' #MemProfile1_lblTips:hover\n'+
 '{background-color:lightgrey !important;\n'+
 '}\n'+
 //the "Report this Photo" link on other people's profile pages
 'td.help_link a, td.help_link a:link, td.help_link a:visited,\n'+
 ' td.help_link a:hover, td.help_link a:active\n'+
 '{color:#0066CC; text-decoration:none;\n'+
 '}\n'+
 //the headings for the photo sections of everyone's profile pages
 '.blHead\n'+
 '{font-size:100%; font-weight:normal;\n'+
 '}\n'+
 '.myItem h4 a, .myItem h4 a:link, .myItem h4 a:visited,\n'+
 ' .myItem h4 a:hover, .myItem h4 a:active \n'+
 '{color:#FFFFFF; font-weight:normal; text-decoration:none;\n'+
 '}\n'+
 '.myItem h4 a[href], .myItem h4 a[href]:link,\n'+
 ' .myItem h4 a[href]:visited, .myItem h4 a[href]:hover,\n'+
 ' .myItem h4 a[href]:active \n'+
 '{color:#99CCFF; font-weight:normal; text-decoration:none;\n'+
 '}\n'+
 //the full buddy list page
 '#buddyList\n'+
 '{margin:0; width:auto;\n'+
 '}\n'+
//-=- Styles relevant to the photo pages
 //the page numbering on the individual album pages
 //(these styles are now used on the forum pages as well)
 '.bList\n'+
 '{display:table-row;\n'+
 '}\n'+
 '.bList a, .bList a:link, .bList a:visited,\n'+
 ' .bList a:hover, .bList a:active\n'+
 '{color:#0066CC; font-size:100%;\n'+
 '}\n'+
 '.pagerPanel2 .bList a, .pagerPanel2 .bList a:visited\n'+
 '{color:#99CCFF;\n'+
 '}\n'+
  //(above is used only on the forum message pages, but must be listed
  // after the main "bList" entries to override them)
 '.pagerList\n'+
 '{margin:2px;\n'+
 '}\n'+
 '.pagerList span\n'+
 '{display:inline; float:none;\n'+
 '}\n'+
 '.pagerList a, .pagerList a:link, .pagerList a:visited,\n'+
 ' .pagerList a:hover, .pagerList a:active\n'+
 //(for forum pages, !important is required to override - but why?)
 '{color:#0066CC !important; display:inline !important;\n'+
 ' float:none !important; font-size:100% !important;\n'+
 ' text-decoration:none !important;\n'+
 '}\n'+
 '.pagerList a[style], .pagerList a[style]:link,\n'+
 ' .pagerList a[style]:visited, .pagerList a[style]:hover,\n'+
 ' .pagerList a[style]:active\n'+
 '{color:#99CCFF !important;\n'+
 '}\n'+
 //the "Previous" and "Next Photo" links on individual photo pages
 '#navButtons a, #navButtons a:link, #navButtons a:visited,\n'+
 ' #navButtons a:hover, #navButtons a:active\n'+
 '{color:#0066CC; font-weight:normal;\n'+
 '}\n'+
 //the "Set as Cover Photo" label on one's own photo pages
 '.commentInfo table label\n'+
 '{color:#0066CC;\n'+
 '}\n'+
 //the title and caption fields on one's own individual photo pages
 //(I have no idea where the :hover action is actually specified, but
 // this works to kill it anyway)
 '.detailInforEdit span, .detailInforEdit span:hover\n'+
 '{background-color:inherit; color:#0066CC;\n'+
 '}\n'+
 '';//end of initial style declarations
 //(other situation-dependent changes may be made in the main code)
};

//-=-=- icon from <http://famfamfam.com/lab/icons/silk>;
// licensed under <http://creativecommons.org/licenses/by/2.5>
function getPICN()
{return 'data:image/png;base64,'+
 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FI'+
 'NwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKjSURB'+
 'VDjLlZNbSJNhGMfnTZddJHS4iFJzdhFSRAc6WClJNmbMZrA%2B0x0%2BdQesXGpT'+
 'nDo3aylmSToSgqiMqNTmFC1aOVMHuSG6DS22SK8aMQPZwanj375vMPuoC3vhz3P1'+
 '%2FPi9z%2Fu8LACsqampc6MtJD6ocvBOtBcsFuvwBrObak632Wz%2Bz9Yx2K0WDB'+
 'elYW1tbUOhISqVapPRaBS%2BvV2K8a5SDBemIRQKMRIIBOD3%2B%2BNZWlrC6upq'+
 'DMA0GMEQwWY0%2B3w%2BtKvL0MLZCm3ONqiILHyZm8PKygrTYEhbirGHJRgSsLG8'+
 'vEynpnselZUN0HN3QHM%2BEdpoLTu5GdcLL6wD4gYTMYPBS2yEw2E6qqfzqMo7gT'+
 'tkBh5X5qI8exeq%2BftBZiYjGAwwDQYbS%2FCpsxgD%2Bak0nUrVk%2B%2BolpHw'+
 'OYwIzprw09KBXy4TepoKooBg5J8G%2FXmp9IAoAHWNtvudGDdIEXC%2BQGj2DTwm'+
 'HWqUCiwuLvqjgIPrBvXFGH1Aop%2B3J95M1j8HJzcPdTo9tEoh2m4Kobh6A8VSOe'+
 '62tiIhIeEI02BiBMbcFBpgNpuh092CRCIBn38Rhq5HGBh%2BDy6XC5FIBJlcgaPH'+
 'jhviBqZaEpZ2Cfo4KfQAv907A8szHdSNeiiV5cjn88Hj8VBQQKBILEW3oQme1tMR'+
 'hoEtatCbk0wbeAfq8bKWi8tiBfR6PTQaDQiCQHNzMwiRFGpxNjwdXM%2B6QbUEH9'+
 'tE6M2OAcIhP34sfIW6oQlyuYy%2BikAgoGuJ4hoW3C5kpO88%2B5fB66wkRCIR%2'+
 'BiWoQVKrS22jy%2BWC1%2BvFnye%2BBxUVFUndnH3ou3IIrzKT4Ha7MRddV6fTiZ'+
 'mZGUxPT8PhcNB1cnISdrsdVqs1BqBAVISpW07VHdiukbATyf%2F5zr8BNamLpjmU'+
 'SloAAAAASUVORK5CYII%3D';
};

//-=-=- forum list from <http://GeoCities.com/GasBuddyFAQ/sitemap.html>
//(with a few updates and other tweaks)
//-=- constructor function
function lr(cgyn,parn,sytf,cgyf,llvl,c3lc,a2lc,naym,urpt)
{this.CatNo=cgyn;
 this.ParentNode=parn;
 this.InSites=(sytf==0?false:true);
 this.IsSite=(sytf==2?true:false);
 this.InCats=(cgyf==0?false:true);
 this.IsCat=(cgyf==2?true:false);
 this.LLevel=llvl;
 this.Country=c3lc;
 this.Abbr=a2lc;
 this.Descr=naym;
 this.URLPart=urpt;
};
//-=- loader function
function getLYST()
{return new Array
 (new lr(   0,  -1,1,1,0,'',   '','Choose one',                  ''),
  new lr(   1,   0,0,1,1,'',   '', 'Main',                       ''),
  new lr(1067,   1,0,2,2,'',   '',  'GasBuddy Local Discussion', ''),
  new lr(1232,1067,1,2,3,'CAN','CAN','Canada',                   ''),
  new lr(1234,1232,2,2,4,'CAN','AB' , 'Alberta',
                                                  'Alberta'        ),
  new lr(1057,1234,2,2,5,'CAN','AB' ,  'Calgary, AB',
                                                  'Calgary'        ),
  new lr(1058,1234,2,2,5,'CAN','AB' ,  'Edmonton, AB',
                                                  'Edmonton'       ),
  new lr(1185,1232,2,2,4,'CAN','BC' , 'British Columbia',
                                                  'BC'             ),
  new lr(1065,1185,2,2,5,'CAN','BC' ,  'Vancouver, BC',
                                                  'Vancouver'      ),
  new lr(1350,1185,2,2,5,'CAN','BC' ,  'Victoria, BC',
                                                  'Victoria'       ),
  new lr(1201,1232,2,2,4,'CAN','MB' , 'Manitoba',
                                                  'Manitoba'       ),
  new lr(1066,1201,2,2,5,'CAN','MB' ,  'Winnipeg, MB',
                                                  'Winnipeg'       ),
  new lr(1210,1232,2,2,4,'CAN','NB' , 'New Brunswick',
                                                  'NewBrunswick'   ),
  new lr(1211,1232,2,2,4,'CAN','NF' , 'Newfoundland',
                                                  'Newfoundland'   ),
  new lr(1215,1232,2,2,4,'CAN','NS' , 'Nova Scotia',
                                                  'NovaScotia'     ),
  new lr(1059,1215,2,2,5,'CAN','NS' ,  'Halifax, NS',
                                                  'Halifax'        ),
  new lr(1217,1232,2,2,4,'CAN','ON' , 'Ontario',
                                                  'Ontario'        ),
  new lr(1060,1217,2,2,5,'CAN','ON' ,  'Hamilton, ON',
                                                  'Hamilton'       ),
  new lr(1061,1217,2,2,5,'CAN','ON' ,  'London, ON',
                                                  'London'         ),
  new lr(1064,1217,2,2,5,'CAN','ON' ,  'Toronto, ON',
                                                  'Toronto'        ),
  new lr(1219,1232,2,2,4,'CAN','PE' , 'Prince Edward Island',
                                                  'PEI'            ),
  new lr(1343,1232,2,2,4,'CAN','QC' , 'Québec',
                                                  'Quebec'         ),
  new lr(1348,1343,2,2,5,'CAN','QC' ,  'Montréal, QC',
                                                  'Montreal'       ),
  new lr(1349,1343,2,2,5,'CAN','QC' ,  'Québec City, QC',
                                                  'QuebecCity'     ),
  new lr(1222,1232,2,2,4,'CAN','SK' , 'Saskatchewan',
                                                  'Sask'           ),
  new lr(1062,1222,2,2,5,'CAN','SK' ,  'Regina, SK',
                                                  'Regina'         ),
  new lr(1063,1222,2,2,5,'CAN','SK' ,  'Saskatoon, SK',
                                                  'Saskatoon'      ),
  new lr(1233,1067,1,2,3,'USA','USA','USA',                      ''),
  new lr(1180,1233,2,2,4,'USA','AL' , 'Alabama',
                                                  'Alabama'        ),
  new lr(1076,1180,2,2,5,'USA','AL' ,  'Birmingham, AL',
                                                  'Birmingham'     ),
  new lr(1117,1180,2,2,5,'USA','AL' ,  'Mobile, AL',
                                                  'Mobile'         ),
  new lr(1120,1180,2,2,5,'USA','AL' ,  'Montgomery, AL',
                                                  'Montgomery'     ),
  new lr(1181,1233,2,2,4,'USA','AK' , 'Alaska',
                                                  'Alaska'         ),
  new lr(1071,1181,2,2,5,'USA','AK' ,  'Anchorage, AK',
                                                  'Anchorage'      ),
  new lr(1183,1233,2,2,4,'USA','AZ' , 'Arizona',
                                                  'Arizona'        ),
  new lr(1133,1183,2,2,5,'USA','AZ' ,  'Phoenix, AZ',
                                                  'Phoenix'        ),
  new lr(1160,1183,2,2,5,'USA','AZ' ,  'Tucson, AZ',
                                                  'Tucson'         ),
  new lr(1184,1233,2,2,4,'USA','AR' , 'Arkansas',
                                                  'Arkansas'       ),
  new lr(1109,1184,2,2,5,'USA','AR' ,  'Little Rock, AR',
                                                  'LittleRock'     ),
  new lr(1186,1233,2,2,4,'USA','CA' , 'California',
                                                  'California'     ),
  new lr(1074,1186,2,2,5,'USA','CA' ,  'Bakersfield, CA',
                                                  'Bakersfield'    ),
  new lr(1095,1186,2,2,5,'USA','CA' ,  'Fresno, CA',
                                                  'Fresno'         ),
  new lr(1110,1186,2,2,5,'USA','CA' ,  'Los Angeles, CA',
                                                  'LosAngeles'     ),
  new lr(1118,1186,2,2,5,'USA','CA' ,  'Modesto, CA',
                                                  'Modesto'        ),
  new lr(1128,1186,2,2,5,'USA','CA' ,  'Oakland, CA',
                                                  'Oakland'        ),
  new lr(1174,1186,2,2,5,'USA','CA' ,  'Orange County, CA',
                                                  'OrangeCounty'   ),
  new lr(1140,1186,2,2,5,'USA','CA' ,  'Riverside, CA',
                                                  'Riverside'      ),
  new lr(1358,1186,2,2,5,'USA','CA' ,  'Sacramento, CA',
                                                  'Sacto'          ),
  new lr(1179,1186,2,2,5,'USA','CA' ,  'San Bernardino, CA',
                                                  'SanBernardino'  ),
  new lr(1144,1186,2,2,5,'USA','CA' ,  'San Diego, CA',
                                                  'SanDiego'       ),
  new lr(1145,1186,2,2,5,'USA','CA' ,  'San Francisco, CA',
                                                  'SanFran'        ),
  new lr(1146,1186,2,2,5,'USA','CA' ,  'San Jose, CA',
                                                  'SanJose'        ),
  new lr(1154,1186,2,2,5,'USA','CA' ,  'Stockton, CA',
                                                  'Stockton'       ),
  new lr(1173,1186,2,2,5,'USA','CA' ,  'Ventura, CA',
                                                  'Ventura'        ),
  new lr(1187,1233,2,2,4,'USA','CO' , 'Colorado',
                                                  'Colorado'       ),
  new lr(1188,1187,2,2,5,'USA','CO' ,  'Colorado Springs, CO',
                                                  'ColoradoSprings'),
  new lr(1089,1187,2,2,5,'USA','CO' ,  'Denver, CO',
                                                  'Denver'         ),
  new lr(1189,1233,2,2,4,'USA','CT' , 'Connecticut',
                                                  'Connecticut'    ),
  new lr(1079,1189,2,2,5,'USA','CT' ,  'Bridgeport, CT',
                                                  'Bridgeport'     ),
  new lr(1098,1189,2,2,5,'USA','CT' ,  'Hartford, CT',
                                                  'Hartford'       ),
  new lr(1123,1189,2,2,5,'USA','CT' ,  'New Haven, CT',
                                                  'NewHaven'       ),
  new lr(1167,1189,2,2,5,'USA','CT' ,  'Waterbury, CT',
                                                  'Waterbury'      ),
  new lr(1166,1233,2,2,4,'USA','DC' , 'District of Columbia',
                                                  'WashingtonDC'   ),
  new lr(1190,1233,2,2,4,'USA','DE' , 'Delaware',
                                                  'Delaware'       ),
  new lr(1168,1190,2,2,5,'USA','DE' ,  'Wilmington, DE',
                                                  'Wilmington'     ),
  new lr(1191,1233,2,2,4,'USA','FL' , 'Florida',
                                                  'FloridaState'   ),
  new lr(1103,1191,2,2,5,'USA','FL' ,  'Jacksonville, FL',
                                                  'Jacksonville'   ),
  new lr(1115,1191,2,2,5,'USA','FL' ,  'Miami, FL',
                                                  'Miami'          ),
  new lr(1131,1191,2,2,5,'USA','FL' ,  'Orlando, FL',
                                                  'Orlando'        ),
  new lr(1157,1191,2,2,5,'USA','FL' ,  'Tallahassee, FL',
                                                  'Tallahassee'    ),
  new lr(1158,1191,2,2,5,'USA','FL' ,  'Tampa, FL',
                                                  'Tampa'          ),
  new lr(1192,1233,2,2,4,'USA','GA' , 'Georgia',
                                                  'Georgia'        ),
  new lr(1072,1192,2,2,5,'USA','GA' ,  'Atlanta, GA',
                                                  'Atlanta'        ),
  new lr(1360,1192,2,2,5,'USA','GA' ,  'Savannah, GA',
                                                  'Savannah'       ),
  new lr(1193,1233,2,2,4,'USA','HI' , 'Hawaii',
                                                  'Hawaii'         ),
  new lr(1099,1193,2,2,5,'USA','HI' ,  'Honolulu, HI',
                                                  'Honolulu'       ),
  new lr(1194,1233,2,2,4,'USA','ID' , 'Idaho',
                                                  'Idaho'          ),
  new lr(1077,1194,2,2,5,'USA','ID' ,  'Boise, ID',
                                                  'Boise'          ),
  new lr(1195,1233,2,2,4,'USA','IL' , 'Illinois',
                                                  'Illinois'       ),
  new lr(1083,1195,2,2,5,'USA','IL' ,  'Chicago, IL',
                                                  'Chicago'        ),
  new lr(1196,1233,2,2,4,'USA','IN' , 'Indiana',
                                                  'Indiana'        ),
  new lr(1178,1196,2,2,5,'USA','IN' ,  'Gary, IN',
                                                  'Gary'           ),
  new lr(1101,1196,2,2,5,'USA','IN' ,  'Indianapolis, IN',
                                                  'Indy'           ),
  new lr(1197,1233,2,2,4,'USA','IA' , 'Iowa',
                                                  'IowaState'      ),
  new lr(1090,1197,2,2,5,'USA','IA' ,  'Des Moines, IA',
                                                  'DesMoines'      ),
  new lr(1137,1197,2,2,5,'USA','IA' ,  'Quad Cities, IA',
                                                  'QuadCities'     ),
  new lr(1198,1233,2,2,4,'USA','KS' , 'Kansas',
                                                  'Kansas'         ),
  new lr(1238,1198,2,2,5,'USA','KS' ,  'Wichita, KS',
                                                  'Wichita'        ),
  new lr(1199,1233,2,2,4,'USA','KY' , 'Kentucky',
                                                  'Kentucky'       ),
  new lr(1107,1199,2,2,5,'USA','KY' ,  'Lexington, KY',
                                                  'Lexington'      ),
  new lr(1111,1199,2,2,5,'USA','KY' ,  'Louisville, KY',
                                                  'Louisville'     ),
  new lr(1200,1233,2,2,4,'USA','LA' , 'Louisiana',
                                                  'Louisiana'      ),
  new lr(1125,1200,2,2,5,'USA','LA' ,  'New Orleans, LA',
                                                  'NewOrleans'     ),
  new lr(1149,1200,2,2,5,'USA','LA' ,  'Shreveport, LA',
                                                  'Shreveport'     ),
  new lr(1113,1233,2,2,4,'USA','ME' , 'Maine',
                                                  'Maine'          ),
  new lr(1202,1233,2,2,4,'USA','MD' , 'Maryland',
                                                  'Maryland'       ),
  new lr(1075,1202,2,2,5,'USA','MD' ,  'Baltimore, MD',
                                                  'Baltimore'      ),
  new lr(1203,1233,2,2,4,'USA','MA' , 'Massachusetts',
                                                  'Massachusetts'  ),
  new lr(1078,1203,2,2,5,'USA','MA' ,  'Boston, MA',
                                                  'Boston'         ),
  new lr(1152,1203,2,2,5,'USA','MA' ,  'Springfield, MA',
                                                  'Springfield'    ),
  new lr(1169,1203,2,2,5,'USA','MA' ,  'Worcester, MA',
                                                  'Worcester'      ),
  new lr(1204,1233,2,2,4,'USA','MI' , 'Michigan',
                                                  'Michigan'       ),
  new lr(1091,1204,2,2,5,'USA','MI' ,  'Detroit, MI',
                                                  'Detroit'        ),
  new lr(1096,1204,2,2,5,'USA','MI' ,  'Grand Rapids, MI',
                                                  'GrandRapids'    ),
  new lr(1106,1204,2,2,5,'USA','MI' ,  'Lansing, MI',
                                                  'Lansing'        ),
  new lr(1205,1233,2,2,4,'USA','MN' , 'Minnesota',
                                                  'Minnesota'      ),
  new lr(1162,1205,2,2,5,'USA','MN' ,  'Twin Cities, MN',
                                                  'TwinCities'     ),
  new lr(1206,1233,2,2,4,'USA','MS' , 'Mississippi',
                                                  'Mississippi'    ),
  new lr(1102,1206,2,2,5,'USA','MS' ,  'Jackson, MS',
                                                  'Jackson'        ),
  new lr(1207,1233,2,2,4,'USA','MO' , 'Missouri',
                                                  'Missouri'       ),
  new lr(1104,1207,2,2,5,'USA','MO' ,  'Kansas City, MO',
                                                  'KC'             ),
  new lr(1153,1207,2,2,5,'USA','MO' ,  'St. Louis, MO',
                                                  'StLouis'        ),
  new lr(1119,1233,2,2,4,'USA','MT' , 'Montana',
                                                  'Montana'        ),
  new lr(1208,1233,2,2,4,'USA','NE' , 'Nebraska',
                                                  'Nebraska'       ),
  new lr(1108,1208,2,2,5,'USA','NE' ,  'Lincoln, NE',
                                                  'Lincoln'        ),
  new lr(1130,1208,2,2,5,'USA','NE' ,  'Omaha, NE',
                                                  'Omaha'          ),
  new lr(1209,1233,2,2,4,'USA','NV' , 'Nevada',
                                                  'Nevada'         ),
  new lr(1163,1209,2,2,5,'USA','NV' ,  'Las Vegas, NV',
                                                  'Vegas'          ),
  new lr(1122,1233,2,2,4,'USA','NH' , 'New Hampshire',
                                                  'NewHampshire'   ),
  new lr(1212,1233,2,2,4,'USA','NJ' , 'New Jersey',
                                                  'NewJersey'      ),
  new lr(1226,1212,2,2,5,'USA','NJ' ,  'Trenton, NJ',
                                                  'Trenton'        ),
  new lr(1124,1233,2,2,4,'USA','NM' , 'New Mexico',
                                                  'NewMexico'      ),
  new lr(1182,1124,2,2,5,'USA','NM' ,  'Albuquerque, NM',
                                                  'Albuquerque'    ),
  new lr(1213,1233,2,2,4,'USA','NY' , 'New York',
                                                  'NewYorkState'   ),
  new lr(1069,1213,2,2,5,'USA','NY' ,  'Albany, NY',
                                                  'Albany'         ),
  new lr(1080,1213,2,2,5,'USA','NY' ,  'Buffalo, NY',
                                                  'Buffalo'        ),
  new lr(1351,1213,2,2,5,'USA','NY' ,  'Long Island, NY',
                                                  'LongIsland'     ),
  new lr(1126,1213,2,2,5,'USA','NY' ,  'New York City, NY',
                                                  'NewYork'        ),
  new lr(1141,1213,2,2,5,'USA','NY' ,  'Rochester, NY',
                                                  'Rochester'      ),
  new lr(1155,1213,2,2,5,'USA','NY' ,  'Syracuse, NY',
                                                  'Syracuse'       ),
  new lr(1214,1233,2,2,4,'USA','NC' , 'North Carolina',
                                                  'NorthCarolina'  ),
  new lr(1082,1214,2,2,5,'USA','NC' ,  'Charlotte, NC',
                                                  'Charlotte'      ),
  new lr(1092,1214,2,2,5,'USA','NC' ,  'Durham, NC',
                                                  'Durham'         ),
  new lr(1097,1214,2,2,5,'USA','NC' ,  'Greensboro, NC',
                                                  'Greensboro'     ),
  new lr(1138,1214,2,2,5,'USA','NC' ,  'Raleigh, NC',
                                                  'Raleigh'        ),
  new lr(1127,1233,2,2,4,'USA','ND' , 'North Dakota',
                                                  'NorthDakota'    ),
  new lr(1216,1233,2,2,4,'USA','OH' , 'Ohio',
                                                  'Ohio'           ),
  new lr(1068,1216,2,2,5,'USA','OH' ,  'Akron, OH',
                                                  'Akron'          ),
  new lr(1084,1216,2,2,5,'USA','OH' ,  'Cincinnati, OH',
                                                  'Cincy'          ),
  new lr(1085,1216,2,2,5,'USA','OH' ,  'Cleveland, OH',
                                                  'Cleveland'      ),
  new lr(1087,1216,2,2,5,'USA','OH' ,  'Columbus, OH',
                                                  'Columbus'       ),
  new lr(1177,1216,2,2,5,'USA','OH' ,  'Dayton, OH',
                                                  'Dayton'         ),
  new lr(1159,1216,2,2,5,'USA','OH' ,  'Toledo, OH',
                                                  'Toledo'         ),
  new lr(1236,1233,2,2,4,'USA','OK' , 'Oklahoma',
                                                  'Oklahoma'       ),
  new lr(1129,1236,2,2,5,'USA','OK' ,  'Oklahoma City, OK',
                                                  'OklahomaCity'   ),
  new lr(1161,1236,2,2,5,'USA','OK' ,  'Tulsa, OK',
                                                  'Tulsa'          ),
  new lr(1218,1233,2,2,4,'USA','OR' , 'Oregon',
                                                  'Oregon'         ),
  new lr(1135,1218,2,2,5,'USA','OR' ,  'Portland, OR',
                                                  'Portland'       ),
  new lr(1220,1233,2,2,4,'USA','PA' , 'Pennsylvania',
                                                  'Pennsylvania'   ),
  new lr(1070,1220,2,2,5,'USA','PA' ,  'Allentown, PA',
                                                  'Allentown'      ),
  new lr(1132,1220,2,2,5,'USA','PA' ,  'Philadelphia, PA',
                                                  'Philly'         ),
  new lr(1134,1220,2,2,5,'USA','PA' ,  'Pittsburgh, PA',
                                                  'Pittsburgh'     ),
  new lr(1147,1220,2,2,5,'USA','PA' ,  'Scranton, PA',
                                                  'Scranton'       ),
  new lr(1221,1233,2,2,4,'USA','RI' , 'Rhode Island',
                                                  'RhodeIsland'    ),
  new lr(1136,1221,2,2,5,'USA','RI' ,  'Providence, RI',
                                                  'Providence'     ),
  new lr(1223,1233,2,2,4,'USA','SC' , 'South Carolina',
                                                  'SouthCarolina'  ),
  new lr(1086,1223,2,2,5,'USA','SC' ,  'Columbia, SC',
                                                  'Columbia'       ),
  new lr(1150,1233,2,2,4,'USA','SD' , 'South Dakota',
                                                  'SouthDakota'    ),
  new lr(1224,1233,2,2,4,'USA','TN' , 'Tennessee',
                                                  'Tennessee'      ),
  new lr(1105,1224,2,2,5,'USA','TN' ,  'Knoxville, TN',
                                                  'Knoxville'      ),
  new lr(1114,1224,2,2,5,'USA','TN' ,  'Memphis, TN',
                                                  'Memphis'        ),
  new lr(1121,1224,2,2,5,'USA','TN' ,  'Nashville, TN',
                                                  'Nashville'      ),
  new lr(1225,1233,2,2,4,'USA','TX' , 'Texas',
                                                  'Texas'          ),
  new lr(1073,1225,2,2,5,'USA','TX' ,  'Austin, TX',
                                                  'Austin'         ),
  new lr(1353,1225,2,2,5,'USA','TX' ,  'Corpus Christi, TX',
                                                  'CorpusChristi'  ),
  new lr(1088,1225,2,2,5,'USA','TX' ,  'Dallas, TX',
                                                  'Dallas'         ),
  new lr(1093,1225,2,2,5,'USA','TX' ,  'El Paso, TX',
                                                  'ElPaso'         ),
  new lr(1094,1225,2,2,5,'USA','TX' ,  'Fort Worth, TX',
                                                  'FortWorth'      ),
  new lr(1100,1225,2,2,5,'USA','TX' ,  'Houston, TX',
                                                  'Houston'        ),
  new lr(1143,1225,2,2,5,'USA','TX' ,  'San Antonio, TX',
                                                  'SanAntonio'     ),
  new lr(1227,1233,2,2,4,'USA','UT' , 'Utah',
                                                  'Utah'           ),
  new lr(1142,1227,2,2,5,'USA','UT' ,  'Salt Lake City, UT',
                                                  'SaltLake'       ),
  new lr(1164,1233,2,2,4,'USA','VT' , 'Vermont',
                                                  'Vermont'        ),
  new lr(1228,1233,2,2,4,'USA','VA' , 'Virginia',
                                                  'Virginia'       ),
  new lr(1139,1228,2,2,5,'USA','VA' ,  'Richmond, VA',
                                                  'Richmond'       ),
  new lr(1165,1228,2,2,5,'USA','VA' ,  'Virginia Beach, VA',
                                                  'VirginiaBeach'  ),
  new lr(1229,1233,2,2,4,'USA','WA' , 'Washington',
                                                  'Washington'     ),
  new lr(1148,1229,2,2,5,'USA','WA' ,  'Seattle, WA',
                                                  'Seattle'        ),
  new lr(1151,1229,2,2,5,'USA','WA' ,  'Spokane, WA',
                                                  'Spokane'        ),
  new lr(1156,1229,2,2,5,'USA','WA' ,  'Tacoma, WA',
                                                  'Tacoma'         ),
  new lr(1230,1233,2,2,4,'USA','WV' , 'West Virginia',
                                                  'WestVirginia'   ),
  new lr(1081,1230,2,2,5,'USA','WV' ,  'Charleston, WV',
                                                  'Charleston'     ),
  new lr(1231,1233,2,2,4,'USA','WI' , 'Wisconsin',
                                                  'Wisconsin'      ),
  new lr(1112,1231,2,2,5,'USA','WI' ,  'Madison, WI',
                                                  'Madison'        ),
  new lr(1116,1231,2,2,5,'USA','WI' ,  'Milwaukee, WI',
                                                  'Milwaukee'      ),
  new lr(1170,1233,2,2,4,'USA','WY' , 'Wyoming',
                                                  'Wyoming'        ),
  new lr(1056,   1,0,2,2,'',   '',  'General Gas Talk',          ''),
  new lr(1356,   1,0,2,2,'',   '',  'All Things Ethanol',        ''),
  new lr(1054,   1,0,2,2,'',   '',  'Fuel Economy',              ''),
  new lr(1175,   1,0,2,2,'',   '',  'Car Talk',                  ''),
  new lr(1172,   1,0,2,2,'',   '',  'Boycott / Gasout Talk',     ''),
  new lr(1237,   1,0,2,2,'',   '',  'Suggest an improvement',    ''),
  new lr(1055,   1,0,2,2,'',   '',  'Talk back to us!',          ''),
  new lr(1171,   1,0,2,2,'',   '',  'How did you find us?',      ''),
  new lr(1176,   1,0,2,2,'',   '',  'Off Topic',                 ''),
  new lr(1235,   1,0,2,2,'',   '',  'Just For Fun',              ''),
  new lr(1332,   1,0,2,2,'',   '',  'Games / Trivia',            ''),
  new lr(1331,   1,0,2,2,'',   '',  'Voting Polls',              ''),
  new lr(1357,   1,0,2,2,'',   '',  'News Articles',             ''),
  new lr(1355,   1,0,2,2,'',   '',  'In Memoriam',               ''),
  new lr(   2,   0,0,1,1,'',   '', 'Automotive',                 ''),
  new lr(1275,   2,0,2,2,'',   '',  'Acura',                     ''),
  new lr(1263,   2,0,2,2,'',   '',  'Audi',                      ''),
  new lr(1273,   2,0,2,2,'',   '',  'BMW',                       ''),
  new lr(1276,   2,0,2,2,'',   '',  'Buick',                     ''),
  new lr(1274,   2,0,2,2,'',   '',  'Cadillac',                  ''),
  new lr(1247,   2,0,2,2,'',   '',  'Chevrolet',                 ''),
  new lr(1264,   2,0,2,2,'',   '',  'Chrysler',                  ''),
  new lr(1280,   2,0,2,2,'',   '',  'Country',                   ''),
  new lr(1250,   2,0,2,2,'',   '',  'Daewoo',                    ''),
  new lr(1272,   2,0,2,2,'',   '',  'Daihatsu',                  ''),
  new lr(1240,   2,0,2,2,'',   '',  'Dodge',                     ''),
  new lr(1256,   2,0,2,2,'',   '',  'Ducati',                    ''),
  new lr(1278,   2,0,2,2,'',   '',  'Ford',                      ''),
  new lr(1279,   2,0,2,2,'',   '',  'Geo',                       ''),
  new lr(1246,   2,0,2,2,'',   '',  'GMC',                       ''),
  new lr(1359,   2,0,2,2,'',   '',  'Goldwing',                  ''),
  new lr(1266,   2,0,2,2,'',   '',  'Harley-Davidson',           ''),
  new lr(1242,   2,0,2,2,'',   '',  'Honda',                     ''),
  new lr(1249,   2,0,2,2,'',   '',  'Hummer',                    ''),
  new lr(1283,   2,0,2,2,'',   '',  'Hyundai',                   ''),
  new lr(1239,   2,0,2,2,'',   '',  'Infiniti',                  ''),
  new lr(1252,   2,0,2,2,'',   '',  'Isuzu',                     ''),
  new lr(1244,   2,0,2,2,'',   '',  'Jaguar',                    ''),
  new lr(1282,   2,0,2,2,'',   '',  'Jeep',                      ''),
  new lr(1271,   2,0,2,2,'',   '',  'Kia',                       ''),
  new lr(1269,   2,0,2,2,'',   '',  'Land Rover',                ''),
  new lr(1241,   2,0,2,2,'',   '',  'Lexus',                     ''),
  new lr(1255,   2,0,2,2,'',   '',  'Lincoln',                   ''),
  new lr(1259,   2,0,2,2,'',   '',  'Mazda',                     ''),
  new lr(1254,   2,0,2,2,'',   '',  'Mercedes-Benz',             ''),
  new lr(1243,   2,0,2,2,'',   '',  'Mercury',                   ''),
  new lr(1284,   2,0,2,2,'',   '',  'Mini',                      ''),
  new lr(1251,   2,0,2,2,'',   '',  'Mitsubishi',                ''),
  new lr(1340,   2,0,2,2,'',   '',  'Motorcycles',               ''),
  new lr(1253,   2,0,2,2,'',   '',  'Nissan',                    ''),
  new lr(1248,   2,0,2,2,'',   '',  'Oldsmobile',                ''),
  new lr(1267,   2,0,2,2,'',   '',  'Peugeot',                   ''),
  new lr(1257,   2,0,2,2,'',   '',  'Plymouth',                  ''),
  new lr(1265,   2,0,2,2,'',   '',  'Pontiac',                   ''),
  new lr(1258,   2,0,2,2,'',   '',  'Porsche',                   ''),
  new lr(1362,   2,0,2,2,'',   '',  'Royal Enfield',             ''),
  new lr(1285,   2,0,2,2,'',   '',  'Saab',                      ''),
  new lr(1261,   2,0,2,2,'',   '',  'Saturn',                    ''),
  new lr(1342,   2,0,2,2,'',   '',  'Scion',                     ''),
  new lr(1270,   2,0,2,2,'',   '',  'Subaru',                    ''),
  new lr(1281,   2,0,2,2,'',   '',  'Suzuki',                    ''),
  new lr(1363,   2,0,2,2,'',   '',  'TATA Motors',               ''),
  new lr(1260,   2,0,2,2,'',   '',  'Toyota',                    ''),
  new lr(1268,   2,0,2,2,'',   '',  'Triumph',                   ''),
  new lr(1262,   2,0,2,2,'',   '',  'Volkswagen',                ''),
  new lr(1245,   2,0,2,2,'',   '',  'Volvo',                     ''),
  new lr(1277,   2,0,2,2,'',   '',  'Yamaha',                    ''),
  new lr(   3,   0,0,1,1,'',   '', 'Computer',                   ''),
  new lr(1287,   3,0,2,2,'',   '',  'Apple / Mac computers',     ''),
  new lr(1286,   3,0,2,2,'',   '',  'PC computers',              ''),
  new lr(   4,   0,0,1,1,'',   '', 'Education',                  ''),
  new lr(1288,   4,0,2,2,'',   '',  'College / University',      ''),
  new lr(1289,   4,0,2,2,'',   '',  'High school / Grade school',''),
  new lr(   5,   0,0,1,1,'',   '', 'Entertainment',              ''),
  new lr(1294,   5,0,2,2,'',   '',  'Books',                     ''),
  new lr(1290,   5,0,2,2,'',   '',  'Humor / Jokes',             ''),
  new lr(1293,   5,0,2,2,'',   '',  'Movies',                    ''),
  new lr(1292,   5,0,2,2,'',   '',  'Music',                     ''),
  new lr(1295,   5,0,2,2,'',   '',  'Theater',                   ''),
  new lr(1291,   5,0,2,2,'',   '',  'TV shows',                  ''),
  new lr(   6,   0,0,1,1,'',   '', 'Health',                     ''),
  new lr(1297,   6,0,2,2,'',   '',  'Diet / Eating',             ''),
  new lr(1296,   6,0,2,2,'',   '',  'Exercise / Fitness',        ''),
  new lr(1298,   6,0,2,2,'',   '',  'Medical',                   ''),
  new lr(   7,   0,0,1,1,'',   '', 'News',                       ''),
  new lr(1304,   7,0,2,2,'',   '',  'Business news',             ''),
  new lr(1299,   7,0,2,2,'',   '',  'Canada news',               ''),
  new lr(1303,   7,0,2,2,'',   '',  'Science news',              ''),
  new lr(1301,   7,0,2,2,'',   '',  'Technology news',           ''),
  new lr(1302,   7,0,2,2,'',   '',  'US news',                   ''),
  new lr(1300,   7,0,2,2,'',   '',  'World news',                ''),
  new lr(   8,   0,0,1,1,'',   '', 'Politics',                   ''),
  new lr(1305,   8,0,2,2,'',   '',  'Canada politics',           ''),
  new lr(1307,   8,0,2,2,'',   '',  'US politics',               ''),
  new lr(1306,   8,0,2,2,'',   '',  'World politics',            ''),
  new lr(   9,   0,0,1,1,'',   '', 'Religion',                   ''),
  new lr(1313,   9,0,2,2,'',   '',  'Atheism / Agnosticism',     ''),
  new lr(1312,   9,0,2,2,'',   '',  'Buddhism',                  ''),
  new lr(1309,   9,0,2,2,'',   '',  'Christianity',              ''),
  new lr(1310,   9,0,2,2,'',   '',  'Hinduism',                  ''),
  new lr(1314,   9,0,2,2,'',   '',  'Islam',                     ''),
  new lr(1311,   9,0,2,2,'',   '',  'Judaism',                   ''),
  new lr(1333,   9,0,2,2,'',   '',  'LDS (Mormonism)',           ''),
  new lr(1341,   9,0,2,2,'',   '',  'Religious Debate',          ''),
  new lr(1336,   9,0,2,2,'',   '',  'Jehovah\'s Witnesses',      ''),
  new lr(1308,   9,0,2,2,'',   '',  'Other religions',           ''),
  new lr(  10,   0,0,1,1,'',   '', 'Sports',                     ''),
  new lr(1315,  10,0,2,2,'',   '',  'Auto racing',               ''),
  new lr(1317,  10,0,2,2,'',   '',  'CFL (Canadian football)',   ''),
  new lr(1354,  10,0,2,2,'',   '',  'College sports',            ''),
  new lr(1320,  10,0,2,2,'',   '',  'Golf',                      ''),
  new lr(1322,  10,0,2,2,'',   '',  'MLB (baseball)',            ''),
  new lr(1319,  10,0,2,2,'',   '',  'NBA (basketball)',          ''),
  new lr(1321,  10,0,2,2,'',   '',  'NFL (football)',            ''),
  new lr(1318,  10,0,2,2,'',   '',  'NHL (hockey)',              ''),
  new lr(1316,  10,0,2,2,'',   '',  'Other sports',              ''),
  new lr(  11,   0,0,1,1,'',   '', 'Travel',                     ''),
  new lr(1323,  11,0,2,2,'',   '',  'Canada travel',             ''),
  new lr(1326,  11,0,2,2,'',   '',  'US travel',                 ''),
  new lr(1325,  11,0,2,2,'',   '',  'Winter getaways',           ''),
  new lr(1324,  11,0,2,2,'',   '',  'World travel',              ''),
  new lr(  12,   0,0,1,1,'',   '', 'Video Games',                ''),
  new lr(1328,  12,0,2,2,'',   '',  'Handheld games',            ''),
  new lr(1330,  12,0,2,2,'',   '',  'Microsoft XBox',            ''),
  new lr(1329,  12,0,2,2,'',   '',  'Nintendo',                  ''),
  new lr(1352,  12,0,2,2,'',   '',  'PC games',                  ''),
  new lr(1327,  12,0,2,2,'',   '',  'Sony Playstation',          '')
 );
};
