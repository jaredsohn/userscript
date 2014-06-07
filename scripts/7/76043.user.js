// ==UserScript==
// @name           eksitirt
// @namespace      eksisozluk
// @include        http://sozluk.sourtimes.org/show.asp*
// @include        http://eksisozluk.com/show.asp*
// @include        http://www.eksisozluk.com/show.asp*
// ==/UserScript==


//Copyright 2007, Google Inc.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//  3. Neither the name of Google Inc. nor the names of its contributors may be
//     used to endorse or promote products derived from this software without
//     specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Sets up google.gears.*, which is *the only* supported way to access Gears.
//
// Circumvent this file at your own risk!
//
// In the future, Gears may automatically define google.gears.* without this
// file. Gears may use these objects to transparently fix bugs and compatibility
// issues. Applications that use the code below will continue to work seamlessly
// when that happens.

(function() {
  // We are already defined. Hooray!
  if (window.google && google.gears) {
    return;
  }

  var factory = null;

  // Firefox
  if (typeof GearsFactory != 'undefined') {
    factory = new GearsFactory();
  } else {
    // IE
    try {
      factory = new ActiveXObject('Gears.Factory');
      // privateSetGlobalObject is only required and supported on IE Mobile on
      // WinCE.
      if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
        factory.privateSetGlobalObject(this);
      }
    } catch (e) {
      // Safari
      if ((typeof navigator.mimeTypes != 'undefined')
           && navigator.mimeTypes["application/x-googlegears"]) {
        factory = document.createElement("object");
        factory.style.display = "none";
        factory.width = 0;
        factory.height = 0;
        factory.type = "application/x-googlegears";
        document.documentElement.appendChild(factory);
      }
    }
  }

  // *Do not* define any objects if Gears is not installed. This mimics the
  // behavior of Gears defining the objects in the future.
  if (!factory) {
    return;
  }

  // Now set up the objects, being careful not to overwrite anything.
  //
  // Note: In Internet Explorer for Windows Mobile, you can't add properties to
  // the window object. However, global objects are automatically added as
  // properties of the window object in all browsers.
  if (!window.google) {
    google = {};
  }

  if (!google.gears) {
    google.gears = {factory: factory};
  }
})();
// =============================================================================
//@copyright      2009, James Campos
//@license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined))
{
  GM_addStyle = function(css) {
   var style = document.createElement('style');
   style.textContent = css;
   document.getElementsByTagName('head')[0].appendChild(style);
  }
  
  GM_deleteValue = function(name) {
   localStorage.removeItem(name);
  }
  
  GM_getValue = function(name, defaultValue) {
   var value = localStorage.getItem(name);
   if (!value)
     return defaultValue;
   var type = value[0];
   value = value.substring(1);
   switch (type) {
     case 'b':
       return value == 'true';
     case 'n':
       return Number(value);
     default:
       return value;
   }
  }
  
  GM_log = function(message) {
   return;
   console.log(message);
  }
  
  /*GM_registerMenuCommand = function(name, funk) {
  //todo
  }*/
  
  GM_setValue = function(name, value) {
   value = (typeof value)[0] + value;
   localStorage.setItem(name, value);
  }
}

//=============================================================================
// From http://www.webmasterworld.com/javascript/3647600.htm
function showDeadCenterDiv(Xwidth,Yheight, div)
{ 
  //First, determine how much the visitor has scrolled
  
  var scrolledX, scrolledY; 
  if (self.pageYOffset )
  { 
    scrolledX = self.pageXOffset; 
    scrolledY = self.pageYOffset; 
  }
  else
    if( document.documentElement && document.documentElement.scrollTop )
    { 
      scrolledX = document.documentElement.scrollLeft; 
      scrolledY = document.documentElement.scrollTop; 
    } 
    else 
      if( document.body )
      { 
        scrolledX = document.body.scrollLeft; 
        scrolledY = document.body.scrollTop; 
      }
  
  //Next, determine the coordinates of the center of browser's window
  
  var centerX, centerY; 
  if (self.innerHeight ) 
  { 
    centerX = self.innerWidth; 
    centerY = self.innerHeight; 
  } else if( document.documentElement && document.documentElement.clientheight ) 
  { 
    centerX = document.documentElement.clientWidth; 
    centerY = document.documentElement.clientheight; 
  } else if( document.body ) 
  { 
    centerX = document.body.clientWidth; 
    centerY = document.body.clientheight; 
  }
  
  //Xwidth is the width of the div, Yheight is the height of the 
  //div passed as arguments to the function: 
  var leftOffset = scrolledX + (centerX - Xwidth) / 2; 
  var topOffset = scrolledY + (centerY - Yheight) / 2; 
  //the initial width and height of the div can be set in the 
  //style sheet with display:none; divid is passed as an argument to // the function 
  var o=div; 
  var r=o.style; 
  r.position='absolute'; 
  r.top   = (topOffset-50) + 'px'; 
  r.left  = leftOffset + 'px'; 
  r.display = "block"; 
} 

//==========================================================================
//TODO: Block listesini duzelt
//Akilli bakinizlari (* olanlar) acacak secenek getir + (2009-07-31)
//Spoiler ibarelerini blokla (+ 2009-08-08)
//Youtube embedleri (+ 2009-08-08)
//Entri kullanicinin en begenilenlerinde/kotulenenlerinde ise bunu isaretle (2009-10-04)
//Blok listesindeki "ekle" tusunu islevsellestir

if (typeof unsafeWindow=='undefined')
  unsafeWindow = window;

eksitirt = {};
(function(){
  
  function save_data(name, value)
  {
    if (GM_setValue)
    {
      return GM_setValue(name, value);      
    }
    else
      if (window.localStorage)
      {
        window.localStorage[name] = value;
        return;
      }
  }
  function load_data(name)
  {
    if (GM_getValue)
    {
      return GM_getValue(name);      
    }
    else
      if (window.localStorage)
      {
        return window.localStorage[name];
      }
  }
  
  function de(s) { return document.getElementById(s);       }
  function dt(s) { return document.getElementsByTagName(s); }
  function dc(s) { return document.createElement(s);        }
  function dct(s){ return document.createTextNode(s);       }

  /*function debug(str)
  {
    if (de("debugdiv"))
      de("debugdiv").innerHTML += str + "<br>";
  }
  function install_debug()
  {
    var dv = dc("div");
    dv.setAttribute("id", "debugdiv");
    if (de('el')) de("el").appendChild(dv);
  }*/

  // ================ Creates the css styles required. =================================
  function createStyles()
  {
    console.log('Creating css styles');
    var newStyle = dc('style');
    
    if (!document_head)
      console.log('document_head is null');
     
    document_head.appendChild(newStyle);
    
    var sheet = null;    
    sheet = newStyle.sheet;    
    var textNode = null;
    if (!sheet)
    {
      textNode = dct("");
      newStyle.appendChild(textNode);
    }
    function addStyle(styleName, styleDef)
    {
      var styleText = styleName + ' {' + styleDef + '}';
      if (sheet)
        sheet.insertRule(styleText, sheet.cssRules.length);
      else
        textNode.data += styleText + "\n";     
    }
    
    addStyle(".spoilerDiv:hover",   "background-image:none;background-color:transparent");
    //addStyle(".spoilerDiv",         "background-image:url('http://www.imdb.com/images/spoilers.gif'); background-color:white");
    addStyle(".spoilerDiv",         "background-color:white; background-image:url('data:image/gif;base64,R0lGODlhPAASALMAAP9/f/+1tf/v7//39////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAPAASAAAEmZDISau9OOvNu/9gKI4iAEjml5LgunYvG8YbnQkmEAiDGeg8yU83cZ0Ig2GgqDvZMKYBzgnUDQi/HZFgFFaXXIBAgD1ycmMUQNqdqt9hpJGcDFw5Q1983+UfczlwWGAeAkNhAz1/J4pwfRRPZ2JuPlleWmB9WW57nRuGOVc+QBNKTHBJPkEvkRh3gjKxGq2ytbS1uLm6uywRAAA7');");
    addStyle("#debugdiv",           "width:800px;height:200px; background-color:#aaffaa");
    addStyle(".settingsDiv",        "width:600px;min-height:300px; position:absolute;background-color:#aaffaa; border:1px solid black");
    addStyle(".settingsDiv table",  "margin:0px auto;");
  //  addStyle(".settingsDiv thead",  "text-align:center;margin:0px auto;");

    addStyle(".settingsDiv tfoot",  "text-align:center;margin:0px auto;");
    addStyle(".settingsDiv ul",     "list-style-type:none;");
    addStyle(".settingsDiv li",     "display:inline");
    addStyle(".settingsDiv li a",   "border-right:1px solid black; width:50px;padding-left:10px; padding-right:20px; height:20px");
    
    addStyle(".tirt_block_list",    "border:1px solid black");
    addStyle(".blocked_div",        "width:100%; color:#999999; border:1px solid #cccccc; margin: 5px 5px 5px 5px; padding: 5px 5px 5px 5px");
    addStyle(".blocked_div a",      "color:#999999");
    addStyle(".tirt_settings_pager",       "");
    addStyle(".tirt_settings_pager_on",    "background-color: #6D84B4;color:white");
    addStyle(".expandImageError",   "background-color:red");
    addStyle(".scrollDownBottom",   "margin-left:50px;font-size:0.8em;");
    if (sheet)console.log('Created ' + sheet.cssRules.length + ' styles.');
  }
  

  var SozlukOptions = {
      options:{ "dontAskBlock":false,
                "displayBlockInfo":true,
                "expandPictures":true,                             
                "embedYoutube":true,
                "hideSpoilers":true,
                "gotobottomlink":true,
               },
      get:function(sOption)			          {	if (!this.options) load();
                                             return this.options[sOption];	
                                          },
      set:function(sOption, value)	      {	this.options[sOption] = value; },
      setAndSave:function(sOption, value) { this.options[sOption] = value;  this.save(sOption); },
      save:function(option)
      {
        save_data("option_" + option, this.options[option]);
      },
      save_all:function()
      {
        // option variable will have the keys, not the values.
        for (var option in this.options)
          this.save(option);
      },
      load:function()
      {
        for (var option in this.options)
          this.options[option] = load_data("option_" + option);
      }
  };
  SozlukOptions.load();

  /*
  (function(){
    function SozlukEntry()
    {
      this.html = null;
      this.userName = null;
      this.id = null;
    };

    function EntryList(listElement)
    {
      var entryArray = [];
      var entryList = document.getElementById("el").getElementsByTagName("li");
      var numEntries = entryList.length;
      for (i=0; i<numEntries; i++)
      {
        var curEl 		= entryList[i];								            // li object
        var entryId 	= parseInt(curEl.id.substr(1));				    // entry id
        var oDiv 		  = curEl.getElementsByTagName("div")[0];		// user div
        var oA 			  = oDiv.getElementsByTagName("a")[0];		  // user name link
        var userName	= oA.innerHTML;								            // user name

        entryItem = SozlukEntry();
        entryItem.id = entryId;
        entryItem.userName = userName;
        entryItem.html = curEl.innerHTML;
        this.entryArray.append(entryItem);
      }
    };
  })();
   */

  // ------------------------------------------------- <ENTRY MANAGER > ----------------------------------------------------------
  var entryManager = {

      entryList:  null,      
      init:         function()    { if (de("el")) 
                                      this.entryList = de("el").getElementsByTagName("li"); 
                                  },
      getEntryList: function()	  {	return this.entryList;			},
      getEntry:     function(idx)	{	return this.entryList[idx];		},
      getEntryText: function(entryIndex)
      {
        var curEl 		= this.getEntry(entryIndex);									// li object	
        var entryEnd 	= curEl.innerHTML.indexOf("<br><div class=\"aul\">");	

        if (entryEnd>=0)
        {		
          //var s = curEl.innerHTML.substr(0, entryEnd);
          //var sRemaining = curEl.innerHTML.substr(entryEnd);
          return curEl.innerHTML.substr(0, entryEnd);
        }
        return null;
      },

      getEntryControlPanel:function(entryIndex)
      {
        var curEl 		= this.getEntry(entryIndex);	// li object	
        var entryEnd 	= curEl.innerHTML.indexOf("<br><div class=\"aul\">");	

        if (entryEnd>=0)
        {		
          //var s = curEl.innerHTML.substr(0, entryEnd);
          var sRemaining = curEl.innerHTML.substr(entryEnd);
          //return curEl.innerHTML.substr(0, entryEnd);
          return sRemaining;
        }
        return null;
      },

      getEntryId:function(entryIndex)
      {
        var curEl 		= this.getEntry(entryIndex);						// li object
        var entryId 	= parseInt(curEl.id.substr(1));				// entry id
        return entryId;
      },

      getEntryUserName:function(entryIndex)
      {
        var curEl 		= this.getEntry(entryIndex);						// li object
        var userDiv 	= curEl.getElementsByTagName("div")[0];		// user div
        var userA 		= userDiv.getElementsByTagName("a")[0];		// user name link
        var userName	= userA.innerHTML;							// user name
        return userName;
      },

      showEntry:function(entryIndex)
      {

      }
  };
  entryManager.init();
  // ------------------------------------------------- </ENTRY MANAGER > ----------------------------------------------------------


  // -------------------------------------------------------- < USER BLOCKING > ---------------------------------------------------------

  // --------------------------------------------- <BLOCK LIST> -------------------------------------------
  var blockList = {
      
      blockArray:null,
      
      load:function()
      {
        this.blockArray = this.getBlockList();
      },
      
      getBlockList:function()
      {
        var ret = load_data("blockedUsers");
        if (ret)
        {
          if (ret.length>0)
          {
            var array = [];
            var tmp = ret.split(",");
            for (i=0; i<tmp.length; i++)
              if (tmp[i].length>0)
                array[array.length] = tmp[i];

            return array;
          }
        }
        return [];
      },
      
      save:function()
      {
        if (this.blockArray)
        {
          var str = this.blockArray.join(',');
          if (str)
            save_data("blockedUsers", str);
        }
        else
          save_data("blockedUsers", "");
      },
      
      blockUser:function(userName)
      {
        this.blockArray = this.getBlockList();

        if (this.blockArray==null)
        {
          this.blockArray = new Array();
          this.blockArray[0] = userName;
        }
        else
          this.blockArray[ this.blockArray.length] = userName;

        this.save();
        return true;
      },
      
      isUserBlocked:function(userName)
      {
        if (this.blockArray==null)
          return false;

        return (this.blockArray.indexOf(userName)>=0)	
      },
      
      removeBlock:function(userName)
      {
        var newList = [];
        for (i=0; i<this.blockArray.length; i++)
          if (userName!=this.blockArray[i])
            newList[newList.length] = this.blockArray[i];

        if (newList.length>0)
          this.blockArray = newList;
        else
          this.blockArray = null;
      }      
  };
  blockList.load();
  // --------------------------------------------- </BLOCK LIST> -------------------------------------------
  
  var blockTable = null,
      txtNewBlockUserName = null;
  
  function user_name_to_id(userName)
  {
    return userName.replace(' ', '_');
  }

  function addBlockRow(table, userName)
  {
    function get_block_table_row_id(userName)
    {
      return 'tirt_blocktable_tr_' + user_name_to_id(userName);
    }
    function update_blocked_user_count()
    {
       var count_element = de("tirt_blocklist_length");
       if (count_element)
         count_element.innerHTML = blockList.getBlockList().length;
    }
    function removeBlock(userName)
    {
      if (confirm(userName + " kullanicisinin engelini kaldirmak istiyor musunuz?"))
      {
        blockList.removeBlock(userName);
        blockList.save();
        showUserEntries(userName);
        return true;
      }
      return false;
    }
    function on_click_removeBlock(userName)
    {
      if (removeBlock(userName))
      {
        // Remove the row from the table      
        var row = de(get_block_table_row_id(userName));
        row.parentNode.removeChild(row);

        // Update row count
        update_blocked_user_count();
      }
    }
    
      var tr  = table.getElementsByTagName('tbody')[0].insertRow(-1);
      tr.id   = get_block_table_row_id(userName);
      
      var td1 = tr.insertCell(0);
      var td2 = tr.insertCell(1);
      
      td1.appendChild(dct(userName));
      td2.appendChild(create_button('kaldir', function(){on_click_removeBlock(userName)}) );
      
      update_blocked_user_count();
  }
  
  function on_add_new_block()
  {    
    if (txtNewBlockUserName)
    {
       var userName = txtNewBlockUserName.value;
       if (blockList.blockUser(userName))
       {
         hideUserEntries(userName);
         addBlockRow(blockTable, userName);
         return true;
       }
    }
    return false;
  }
  
  function createBlockList()
  {
    var blockDiv        = dc("div");
    blockDiv.className  = 'tirt_block_list';

    var blockedUsers    = blockList.getBlockList();

    blockTable          = dc('table');
    blockTable.appendChild(dc('thead'));
    blockTable.appendChild(dc('tbody'));
    blockTable.appendChild(dc('tfoot'));
  
    var numBlocked  = blockedUsers ? blockedUsers.length : 0;
    blockTable.getElementsByTagName('thead')[0].innerHTML = "<tr><th colspan=2>Engellenmis Yazarlar (<span id=tirt_blocklist_length>" + numBlocked + "</span>)</th></tr>";
    
    if (blockedUsers)
    {
      for (i=0; i<blockedUsers.length; i++)    
        addBlockRow(blockTable, blockedUsers[i]);
    }
    
    var tr = blockTable.getElementsByTagName('tfoot')[0].insertRow(-1);
    
    // Add new block text box
    var td1 = tr.insertCell(0);
    txtNewBlockUserName = dc('input');
    txtNewBlockUserName.setAttribute('type', 'text');
    td1.appendChild(txtNewBlockUserName);
    
    // Add new block button
    var td2 = tr.insertCell(1);
    td2.innerHTML = "<a id=tirt_block_list_add_btn class=but href='#'> ekle </a>";    
    var but = td2.childNodes[0];    
    but.addEventListener('click', on_add_new_block, false);
    
    // link everything
    blockDiv.appendChild(blockTable);
    return blockDiv;
  };

  function blockUser(userName)
  {
    if (blockList.isUserBlocked(userName)==false)
    {
      var ask = SozlukOptions.get('dontAskBlock');
      if (ask || confirm(userName + " kullanicisini engellemek istiyor musunuz?"))
      {
        if (blockList.blockUser(userName))
        {
          hideUserEntries(userName);
          return true;
        }
        else
        {
          alert("HATA! " + userName + " engellenemedi!");
        }
      }
    }
    else
      alert(userName + " zaten engellenmis.");
    return false;
  };

  function showEntry(entryId)
  {
    var block_div = de("block" + entryId); 
    if (block_div)      block_div.style.display = "none";

    var real_div = de("d" + entryId); 
    if (real_div)      real_div.style.display = "";	
  };

  function hideEntry(entryId)
  {
    var entryDiv = de("d" + entryId);
    if (entryDiv)
    {
      console.log("d" + entryId + " found");
      if (SozlukOptions.get('displayBlockInfo')==true)
      {
        
        console.log('displayBlockInfo: true');
        var blockDiv = dc("div");
        blockDiv.className = 'blocked_div';
        blockDiv.setAttribute("id", "block" + entryId);
        blockDiv.innerHTML = entryDiv.value + ". entry gizlendi <a href='javascript:showEntry(" + entryId + ")' id=l" + entryId + " title=\"her seye ragmen entriyi goster\">(goster)</a>";
        
        //blockDiv.addEventListener("click", function(e){onClickShowEntry(entryId);}, false);
        blockDiv.addEventListener("click", function(){ showEntry(entryId);}, false);      
      //var wrapperDiv = document.createElement("div");

      

        /*for (i=0; i<entryDiv.childNodes.length; i++)
        {	wrapperDiv.appendChild(entryDiv.childNodes[i]);
          //entryDiv.removeChild(entryDiv.childNodes[i]);
  
        }
  
        for (i=0; i<entryDiv.childNodes.length; i++)
          entryDiv.removeChild(entryDiv.childNodes[i]);
  
        //alert(entryDiv.innerHTML);
        //wrapperDiv.innerHTML = entryDiv.innerHTML;
  
  
        //entryDiv.innerHTML = "";
  
        entryDiv.appendChild(wrapperDiv);
        entryDiv.appendChild(blockDiv);
        wrapperDiv.style.display 	= "none";
        blockDiv.style.display		= "block";*/
        entryDiv.parentNode.insertBefore(blockDiv, entryDiv);
      }
      entryDiv.style.display = "none";
    }
    else
      console.log("d" + entryId + " NOT found");
  }
  
  function hideUserEntries(userName)
  {
     return setUserEntryVisibility(userName, false);
  }
  function showUserEntries(userName)
  {
     return setUserEntryVisibility(userName, true);
  }  
  function setUserEntryVisibility(userName, visible)
  {
    var entries = entryManager.getEntryList();
    if (entries)
    {
      console.log('Hiding ' + entries.length + ' entries of user ' + userName);
      for (i=0; i<entries.length; i++)
        if (entryManager.getEntryUserName(i)==userName)
          if (visible)
            showEntry(entryManager.getEntryId(i));
          else
            hideEntry(entryManager.getEntryId(i));
    }
      console.log('No entry to hide');
  }
  // -------------------------------------------------------- < /USER BLOCKING > ---------------------------------------------------------
  function getUserNameFromEntryId(entryId)
  {
    var curEl     = document.getElementById("d" + entryId);
    var oDiv      = curEl.getElementsByTagName("div")[0];
    var oA        = oDiv.getElementsByTagName("a")[0];
    var userName  = oA.innerHTML;
    return userName;
  };

  function getTargetElement(e)
  {
    var targ;
    if (!e) var e = window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
    if (targ.nodeType == 3) // defeat Safari bug
      targ = targ.parentNode;
    return targ;
  };

  /*function onClickBlockUser(e)
  {
    var targ 		  = getTargetElement(e);
    var entryId		= parseInt(targ.id.substr( 5));		// len("block")=5
    var userName	= getUserNameFromEntryId(entryId);
    blockUser(userName);
  };*/

  // -------------------------------------------------------- < LINK CHECKING > ---------------------------------------------------------
  /*
  function setLinkWaiting(linkId)
  {
    document.getElementById(linkId).style.backgroundColor = "#ffff88";
  };
  function setLinkEmpty(linkId)
  {
    document.getElementById(linkId).style.backgroundColor = "#ff8888";
  };
  function setLinkNotEmpty(linkId)
  {
    document.getElementById(linkId).style.backgroundColor = "#88ff88";
  };

  function isLinkEmpty(linkId)
  {

    var linkObj = document.getElementById(linkId);
    if (linkObj==null)
    {	
      debug("NULL link object: " + linkId);
      return;
    }
    var strTitle = linkObj.innerHTML;
    if (strTitle=="eksi sozluk" || strTitle=="yaran entryler")
    {
      setLinkFull(linkId);
      return;
    }

    setLinkWaiting(linkId);	
    //var strUrl = 'http://sozluk.sourtimes.org/show.asp?t='+strTitle+'/1';
    var strUrl = 'show.asp?t='+strTitle+'/1';
    debug("checking <a href='" + strUrl + "'>" + strUrl + "</a>. for " + linkId);

    GM_xmlhttpRequest(
        {
          method:'GET',
          url:strUrl,
          headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload:function(responseDetails)
        {	
          if (responseDetails.readyState==4)

            // Bos basliklarda --meta name="robots" content="noindex"-- yazisi var:
            if (responseDetails.responseText.indexOf("meta name=\"robots\" content=\"noindex\"")<0)
            {
              // Baslikta entri var:
              setLinkNotEmpty(linkId);
              debug("response from <a href='" + strUrl + "'>" + strUrl + "</a> for " + linkId + " is OK");
            }
            else
            {
              // Baslikta entri yok:
              setLinkEmpty(linkId);
              debug("response from <a href='" + strUrl + "'>" + strUrl + "</a> for " + linkId + " is EMPTY");
            }
        }
        });
  };*/
  // -------------------------------------------------------- </ LINK CHECKING > ---------------------------------------------------------
  /*
  function customEntryFormat(strEntyLi)
  {
    //return strEntryLi.replace(/\<li\svalue=\"([0-9]*)\"\sd\=\"d([0-9]*)\"\>([.]*)\<div\sclass\=\"aul\"\>/gi, 'aaaaaaaaaaaaaaaaa');
    return strEntryLi;
  };
  */

  // --------------------------------------------------- < INLINE ENTRY EXPANDING > ---------------------------------------------------------
  // NOT YET:
  /*unsafeWindow.expandEntryInline = function(strUrl, spanObj)
  {
    var divObj = spanObj.getElementsByTagName('span')[0];
    if (!divObj)
    {
      divObj = document.createElement("span");	
      divObj.setAttribute("style", "background-color:yellow;display:inline;");
      divObj.innerHTML = ' yukleniyor...';
      spanObj.appendChild(divObj);
      //spanObj.getElementsByTagName("a")[1].locked = true;
      spanObj.childNodes[1].locked = true;
    }

    var hreq = unsafeWindow.gax();
    hreq.open('GET', 'http://sozluk.sourtimes.org/show.asp?' + strUrl, true);
    hreq.send(null);
    hreq.onreadystatechange = function()
    {
      if (hreq.readyState == 4)
      {						
        //var sHtml = hreq.responseText.match(/\<li(.*)\<\/li\>/gi);	
        var sTitle = hreq.responseText.match(/\<h1\sclass=\"title\"\>(.*)\<\/h1\>/gi);
        var sHtml = hreq.responseText.match(/\<li\svalue=\"([0-9]*)\"\s\sid=\"d([0-9]*)\"\>(.*)\<div\sclass=\"aul\"\>\(\<a\shref=\"show\.asp\?t=(.*)\"\>(.*)\<\/a\>\,\s(.*)\)/gi);				

        //<li value="2"  id="d139407">entry buraya geliyor<br /><div class="aul">(<a href="show.asp?t=otisabi">otisabi</a>, 17.04.2000 00:43)<script type='text/javascript'>e(256,139407,due('otisabi'));</script></div></li>
        //alert( sHtml.match(/\<li(.*)\<div\sclass\=\"aul\"\>/gi) );

        if (sHtml)
        {
          divObj.innerHTML = "<ol style=\"width:90%;background-color:#aaffaa\">" + sTitle + "<br>" + sHtml + "</ol>";	
          divObj.style.backgroundColor = 'yellow';
        }
        else
        {	
          divObj.innerHTML = "boyle bir entry yok.";
          divObj.style.backgroundColor = 'red';
        }
        hreq = false;
      }
    }
  };

  unsafeWindow.entryExpanderOnMouseOver = function (obj)
  {
    var childObj = obj.childNodes[1];
    if (childObj)
      childObj.style.display="inline";
  };
  unsafeWindow.entryExpanderOnMouseOut = function (obj)
  {
    var childObj = obj.childNodes[1];
    if (childObj)
      if (childObj.locked!=true)
        childObj.style.display="none";
  };
  */
  /*
  // NOT YET
  var addBakinizExpanderButton = function(strEntry)
  {
    //var bkzRegexBaslikEntryNo = /\<a\sclass\=\"(b|gb|id)\"\shref\=\"show\.asp\?([t|id]\=[^\"]*)\"\>([^\"]*[\/\#][0-9]*)\<\/a\>/gi;		// baslik/entryNo ve baslik/#entryId
    var bkzRegexBaslikEntryNo = /\<a\sclass\=\"(b|gb|id)\"\shref\=\"show\.asp\?([^\"]*)\"\>([^\"]*\/#?[0-9]*|\#[0-9]*)\<\/a\>/gi;		// baslik/entryNo, baslik/#entryId  ve #entryId
    //return strEntry.replace(bkzRegexBaslikEntryNo, '<a class=\"$1\" href=\"show.asp?t=$2\">$3</a> <input type=button value=\"+"\>');
    //return strEntry.replace(bkzRegexBaslikEntryNo, '<span><a class=\"$1\" href=\"show.asp?t=$2\" onmouseover=\'this.nextSibling.style.display=\"inline\"\' onmouseout=\'this.nextSibling.style.display=\"none\"\'>$3</a><a href=# onclick=expand style=\"display:none\"> [+]</a></span>');

    return strEntry.replace(bkzRegexBaslikEntryNo, '<span onmouseover=entryExpanderOnMouseOver(this) onmouseout=entryExpanderOnMouseOut(this)><a class=\"$1\" href=\"show.asp?$2\" >$3</a><input type=button value=\"+\" onclick=\"expandEntryInline(\'$2\', this.parentNode)\" style=\"border:none;display:none\" title=\"bu sayfa icinde ac\"></span>');
    //return strEntry.replace(bkzRegexBaslikEntryNo, '<span onmouseover=entryExpanderOnMouseOver(this) onmouseout=entryExpanderOnMouseOut(this)><a class=\"$1\" href=\"show.asp?$2\" >$3</a><a href=# onclick=\"expandEntryInline(\'$2\', this.parentNode)\" style=\"display:none\" title=\"bu sayfa icinde ac\"> [+]</a></span>');
  };
  */
  // --------------------------------------------------- < /INLINE ENTRY EXPANDING > ---------------------------------------------------------

  // --------------------------------------------------- < IMAGE EXPANDING > ---------------------------------------------------------
  function expandImage(obj)
  {	
    var maxDim = 800;
    var nw = obj.naturalWidth;
    var nh = obj.naturalHeight;

    if (nw==0 || nh==0)
      return;

    if (nw>nh && nw>maxDim)
    {	
      var b = (obj.width==maxDim);
      obj.width 	= b ? nw : maxDim;
      obj.height	= b ? nh : maxDim * nh / nw;
    }
    else
    {
      if (nh>maxDim)
      {
        var b = (obj.height==maxDim);
        obj.width 	= b ? nw : maxDim * nw / nh;
        obj.height 	= b ? nh : maxDim;
      }
    }
  };
  function expandPictures(strEntry)
  {
    //	<a rel="nofollow" class="url" target="_blank" href="http://google.com/82.jpg" title="http://google.com/82.jpg">http://google.com/82.jpg</a>
    //strEntry = strEntry.replace(/\<a\srel\=\"nofollow\"\sclass\=\"url\"\starget\=\"\_blank\"\shref\=\"(http:\/\/.*\.(jpg|jpeg|gif|png))\"\>(http:\/\/.*\.(jpg|jpeg|gif|png))\<\/a\>/gi, "<img src=\"$1\" alt=\"$1\" align=top onload=\"expandImage(this)\" onclick=expandImage(this)>");
   
    /*original:
    strEntry = strEntry.replace(/<a rel=\"nofollow\" class\=\"url\"\starget\=\"\_blank\"\shref\=\"(http:\/\/[^\"\?]*\.(jpg|jpeg|gif|png))\"(?:(\stitle=\".*\")?)\>(http:\/\/.*\.(jpg|jpeg|gif|png))\<\/a\>/gi, "<a href=\"$1\" target=_blank title=\"$1\">$1</a><br><img src=\"$1\" title=\"$1\" alt=\"$1\" align=top onerror=\"this.src='';this.alt='[resim bulunamadi!]';this.style.backgroundColor='red';\" onclick=expandImage(this)>");
    return strEntry.replace(/<a rel=\"nofollow\" class\=\"url\"\starget\=\"\_blank\"\shref\=\"(http:\/\/[^\"]*\.(?:php|asp|aspx)+[^\"]*\.(?:jpg|jpeg|gif|png))\"(?:(\stitle=\".*\")?)\>(.*)\<\/a\>/gi, "<a href=\"$1\" target=_blank title=\"$1\">$1</a><br><iframe src=\"$1\" width=100% height=400>");
    */
    strEntry = strEntry.replace(/<a rel=\"nofollow\" class=\"url\" target=\"_blank\" href=\"(http:\/\/[^\"\?]*\.(jpg|jpeg|gif|png|bmp))\"(?:( title=\"[^\"]*\")?)>([^<]*)<\/a>/gi, 
                    "<a href=\"$1\" target=_blank title=\"$2\">$4</a><br><img src=\"$1\" title=\"$1\" alt=\"$1\" align=top onerror=\"this.src='';this.alt='[ resim yuklenemedi! ]';this.className='expandImageError';\" onclick='expandImage(this)'>");
    return strEntry.replace(/<a rel=\"nofollow\" class\=\"url\"\starget\=\"\_blank\"\shref\=\"(http:\/\/[^\"]*\.(?:php|asp|aspx)+[^\"]*\.(?:jpg|jpeg|gif|png))\"(?:(\stitle=\".*\")?)\>(.*)\<\/a\>/gi, "<a href=\"$1\" target=_blank title=\"$1\">$1</a><br><iframe src=\"$1\" width=100% height=400>");
  };
  // --------------------------------------------------- < /IMAGE EXPANDING > ---------------------------------------------------------

  /*
  // --------------------------------------------------- < BKZ CHECKING > ---------------------------------------------------------
  function expandBakiniz(strEntry)
  {
    //	<sup class="ab"><a title="(bkz: swh)" href="show.asp?t=swh">*</a></sup>	
    return strEntry.replace(/\<sup\sclass\=\"ab\"\>\<a\stitle\=\"\(bkz\:\s([^\"]*)\)\"\shref\=\"show\.asp\?t\=([^\"]*)\"\>\*\<\/a\>\<\/sup\>/gi , "<sup><a href=\"show.asp?t=$1\">*($1)</a></sup>");
  };
  var aHrefCount = 0;
  var linkAdresses = [];
  
  function checkBakinizlar(strEntry)
  {
    //var bkzRegexGlobal = /\(bkz\:\s\<a\sclass\=\"b\"\shref\=\"show\.asp\?t\=(?:[^\"]*)\"\>([^\"]*)\<\/a\>\)/gi;
    //var bkzRegexLocal = /\(bkz\:\s\<a\sclass\=\"b\"\shref\=\"show\.asp\?t\=(?:[^\"]*)\"\>([^\"]*)\<\/a\>\)/i;		


    // http://sozluk.sourtimes.org/show.asp?t=fenerbarca ----- 2. entrydeki kesme isaretini almiyor
    // http://sozluk.sourtimes.org/show.asp?t=timsah%C4%B1n+boyu+sadece+%C3%BC%C3%A7+metre+y%C3%BCzmeye+devam+edin  --- Buradaki 2. entryde de 
    // " `candiri` nun boyu bi barnak cimmeye devam edin " cumlesine... kisminda candiri'yi alamiyor.
    var bkzRegexGlobal = /\<a\sclass\=\"([g]*b)\"\shref\=\"show\.asp\?t\=(?:[^\"]*)\"\>([^\"]*)\<\/a\>/gi;
    var bkzRegexLocal = /\<a\sclass\=\"([g]*b)\"\shref\=\"show\.asp\?t\=(?:[^\"]*)\"\>([^\"]*)\<\/a\>/i;				

    var matches = strEntry.match(bkzRegexGlobal);
    if (matches!=null)
    {	
      for (i=0; i<matches.length; i++)
      {	
        //strEntry = strEntry.replace(bkzRegexLocal, "(bkz: <a class=\"$1\" href=\"show.asp?t=$2\" id=idbkzlink" + aHrefCount + ">$2</a>)");
        strEntry = strEntry.replace(bkzRegexLocal, "<a class=\"$1\" href=\"show.asp?t=$2\" id=idbkzlink" + aHrefCount + ">$2</a>");
        //linkAdresses.add( matches[i] );	
        aHrefCount++;			
      }
    }
    return strEntry;
  };*/
  // --------------------------------------------------- < /BKZ CHECKING > ---------------------------------------------------------

  // --------------------------------------------------- < SPOILER HIDING > ---------------------------------------------------------
  function hideSpoilers(strEntry)
  {
    // --- <a class="gb" href="show.asp?t=spoiler">spoiler</a> ---
    // ....
    //--- <a class="gb" href="show.asp?t=spoiler">spoiler</a> ---
    return strEntry.replace(/((\-\-\-\s\<a\sclass=\"gb\"\shref=\"show\.asp\?t=spoiler\"\>spoiler\<\/a\>\s\-\-\-)(.*)(\-\-\-\s\<a\sclass=\"gb\"\shref=\"show\.asp\?t=spoiler\"\>spoiler\<\/a\>\s\-\-\-))/gi, "$2<div onmouseover=\"this.firstChild.style.visibility='visible';\" onmouseout=\"this.firstChild.style.visibility='hidden';\" class=spoilerDiv><span style=\"visibility:hidden\">$3</span></div>$4");
  };
  // --------------------------------------------------- < /SPOILER HIDING > ---------------------------------------------------------

  // --------------------------------------------------- < YOUTUBE EMBED > ---------------------------------------------------------
  function embedYoutube(strEntry)
  {
    //<object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/UNa4ihamGvU&hl=en&fs=1&"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/UNa4ihamGvU&hl=en&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>
    return strEntry.replace(/\<a\srel\=\"nofollow\"\sclass\=\"url\"\starget\=\"\_blank\"\shref\=\"(http:\/\/(www\.)?youtube\.com\/watch\?v\=([^\"]*))"(?:(\stitle=\".*\")?)\>(.*)\<\/a\>/gi, "<a href=\"$1\" target=_blank title=\"$1\">$1</a><br><object width=\"425\" height=\"344\"><param name=\"movie\" value=\"http://www.youtube.com/v/$3&hl=en&fs=1&\"></param><param name=\"allowFullScreen\" value=\"true\"></param><param name=\"allowscriptaccess\" value=\"always\"></param><embed src=\"http://www.youtube.com/v/$3&hl=en&fs=1&\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"425\" height=\"344\"></embed></object>");
  };
  // --------------------------------------------------- < /YOUTUBE EMBED > ---------------------------------------------------------
  
  /*
  // NOT YET
  function removeAdCss()
  {
    if (document.getElementsByTagName("link")[2])
      document.getElementsByTagName("link")[2].parentNode.removeChild(document.getElementsByTagName("link")[2]);
  };
  // NOT YET
  function checkLinks()
  {
    // TODO: duplicate leri tekrar request etmesin:
    for (i=0; i<aHrefCount; i++)
    {
      isLinkEmpty("idbkzlink" + i);
    }
  };
  */

  function filterEntries() {
  
    function addBlockButton(userName, entryId) {
    
      // --- <Add block button> ---
      var oBtn = dc("a");
      oBtn.innerHTML = " engelle ";
      oBtn.setAttribute("href", "javascript:eksitirt.blockUser('"+userName+"')");
      oBtn.setAttribute("class", "but");
      oBtn.setAttribute("title", userName + " kullanicisinin entrilerini engelle");     
      oBtn.setAttribute("id", "block" + entryId);     
      //oBtn.addEventListener("click", function(e){onClickBlockUser(e);}, false);
      oBtn.addEventListener("click", function(){return blockUser(userName);}, false);

      var buttonTable = de("m"+entryId).getElementsByTagName("table")[0];
      if (buttonTable) {
        buttonTable.rows[0].insertCell(-1).appendChild(document.createTextNode(" "));     // bos td
        buttonTable.rows[0].insertCell(-1).appendChild(oBtn);                 // yeni butonun td'si
      }
      // --- </Add block button> ---
    }
    
    var bOptionExpandPictures = SozlukOptions.get('expandPictures');
    var bOptionHideSpoilers   = SozlukOptions.get('hideSpoilers');
    var bOptionEmbedYoutube   = SozlukOptions.get('embedYoutube');
    var bOptionChangeEntry    = bOptionExpandPictures||bOptionHideSpoilers||bOptionEmbedYoutube;  // If anyone is true
    
    var entryListHtmlEntity = de("el");
    if (!entryListHtmlEntity)
    { 
      console.log('de(el) is null');
      return;
    }
    
    var entryList = entryListHtmlEntity.getElementsByTagName("li");
    if (!entryList)
    {
      console.log('de(li) is null');
      return;
    }
    var numEntries = entryList.length;
    for (i=0; i<numEntries; i++)
    {
      var curEl     = entryList[i];								          // li object
      var entryId   = parseInt(curEl.id.substr(1));				  // entry id
      var oDiv      = curEl.getElementsByTagName("div")[0];		// user div
      var oA        = oDiv.getElementsByTagName("a")[0];		  // user name link
      var userName  = oA.innerHTML;								          // user name

      if (bOptionChangeEntry)
      {
        // Entry textini bul:		
        var entryEnd = curEl.innerHTML.indexOf("<br><div class=\"aul\">");		
        if (entryEnd>=0)
        {		
          var s = curEl.innerHTML.substr(0, entryEnd);				// s = entri texti
          var sRemaining = curEl.innerHTML.substr(entryEnd);
          var changed = false;
          //s = addBakinizExpanderButton(s);
          //s = expandBakiniz(s);
          //s = checkBakinizlar(s);
          
          if (bOptionExpandPictures)
          {
            changed = true;
            s = expandPictures(s);
          }
          
          if (bOptionHideSpoilers)
          {
            changed = true;
            s = hideSpoilers(s);
          }
  
          if (bOptionEmbedYoutube)
          {
            changed = true;
            s = embedYoutube(s);
          }
  
          // New entry + remaining table
          if (changed)
            curEl.innerHTML = s + sRemaining;
        }
      }

      if (blockList.isUserBlocked(userName))
      {
        console.log('User ' + userName + ' blocked, hiding entry');
        hideEntry(entryId);
        oDiv.innerHTML += "(User blocked)";
      }
      else
      {
        // --- Add block button ---
        console.log('User ' + userName + ' not blocked, adding block button');
        addBlockButton(userName, entryId);
      }
    }
  };

  /* NOTYET!
  function filterAds()
  {
    de("panel").style.display = "none";
  }*/
  
  function create_link_button(text, desc_text, handler_func)
  {
    var button = dc('a');
    button.innerHTML = text;
    button.href = '#';
    button.title = desc_text;
    button.className = "icon";
    button.addEventListener('click', handler_func, false);
    
    var span = dc('span');
    span.className = 'but minibut';
    span.appendChild(button);
    return span;
  }
  function create_unstyled_link_button(text, desc_text, handler_func)
  {
    var button = dc('a');
    button.innerHTML = text;
    button.href = '#';
    button.title = desc_text;
    button.className = "icon";
    button.addEventListener('click', handler_func, false);
    return button;
  }
  function create_button(value, handler_func)
  {
    var button = dc('input');
    button.setAttribute('type', 'button');
    button.className = 'but';
    button.addEventListener('click', handler_func, false);
    button.value = value;
    return button;
  }
  //=========================================================================
  eksitirt.install_settings = function()
  {
    var tbody = null;
    var setting_pages = {};
    var setting_pager_buttons = {};
    var nav_button_list = null;
    
    function add_settings_button()
    {
      var ws = de('ws');
      if (ws) ws.parentNode.insertBefore(create_link_button('O', 'Eksilabs Ayarlari', show_settings), ws.nextSibling);
    }
    function hide_settings()
    {
      var main_div = de('tirt_settings');
      if (main_div) main_div.style.display = 'none';
    }    
    // General Settings:
    function create_general_settings_page()
    {
      var general_options = { 'dontAskBlock':'Engellerken soru sorma',
                              'displayBlockInfo':'Gizlenen entryler icin bilgi goster',
                              '_1':'-',
                              'expandPictures': 'Resimleri goster',                             
                              'embedYoutube':   'YouTube videolarini goster',
                              'hideSpoilers':   'Spoiler ibarelerini gizle',
                              'gotobottomlink': 'Sayfanin sonuna git tusu goster'
                              };
      var general_options_buttons = {};

      function save_general_settings()
      {        
        for (option in general_options)
          if (general_options[option]!="-")  // skip seperators
            SozlukOptions.set(option, general_options_buttons[option].checked);
        SozlukOptions.save_all();
        alert("Ayarlar kaydedildi.");
      }
      function add_option(table, option_text, option_name)
      {
        // Insert row
        var tr = table.insertRow(-1);
        if (option_text=='-')
        {
          // Add seperator row
          var hr = dc('hr');
          var td = tr.insertCell(0);
          td.colSpan = 2;
          td.appendChild(hr);
        }
        else
        {
          // Create check box
          var d = dc('input');
          d.setAttribute('type', 'checkbox');
          if (SozlukOptions.get(option_name)==true)
            d.setAttribute('checked', 'checked');
         
          general_options_buttons[option_name] = d;
         
          // insert columns
          tr.insertCell(0).appendChild(d);
          tr.insertCell(1).appendChild(dct(option_text));
        }
      }
      var div = dc('div');
      var option_table = dc('table');
      
      // Add options
      for (option in general_options)
        add_option(option_table, general_options[option], option);
      
      div.appendChild(option_table);
      div.appendChild(create_button('Kaydet',save_general_settings));
      return div;
    }
    function show_settings()
    { 
      setting_pages = { 'Genel':create_general_settings_page(),
                        'Blok Listesi':createBlockList()};
      function switch_page(tab_name)
      {
        for (page in setting_pages)
          if (tab_name!=page)
          {
            setting_pages[page].style.display = 'none';
            setting_pager_buttons[page].className = 'tirt_settings_pager';
          }
       
        setting_pages[tab_name].style.display = 'block';
        setting_pager_buttons[tab_name].className = 'tirt_settings_pager_on';
      }
      function add_setting_page(table_body, tab_name, tab_div)
      {      
        //var button = create_button(tab_name, function(){switch_page(tab_name);} );
        var button = create_unstyled_link_button(tab_name, tab_name, function(){switch_page(tab_name);} );
        button.className = 'tirt_settings_pager';
        setting_pager_buttons[tab_name] = button;
        
        var li = dc('li');
        li.appendChild(button);
        nav_button_list.appendChild(li);
        
        tab_div.style.display = 'none';      
        table_body.appendChild(tab_div);
      }
      var main_div = null;
      var main_div = de('tirt_settings');
      if (!main_div)
      {
        main_div = dc('div');
        main_div.className = 'settingsDiv';
        main_div.setAttribute('id', 'tirt_settings');
        main_div.innerHTML = '<br><b><center>Eksitirt Ayarlar</center></b>';
              
        var nav_table = dc('table');
        var thead = dc('thead');
        tbody = dc('tbody');
        var tfoot = dc('tfoot');
        nav_table.appendChild(thead);
        nav_table.appendChild(tbody);
        nav_table.appendChild(tfoot);
        
        var nav_row   = thead.insertRow(-1);       
        nav_button_list = dc('ul');
        nav_row.insertCell(0).appendChild(nav_button_list);
        thead.insertRow(-1).insertCell(0).appendChild(dc('hr'));  // page seperator
        
        main_div.appendChild(nav_table);
        
        // Kapat tusu
        tfoot.insertRow(-1).insertCell(0).appendChild(create_button('Kapat', hide_settings));
  
        document_body.appendChild(main_div);
        
      }
      
      tbody.innerHTML = '';
      nav_button_list.innerHTML = '';
      for (page in setting_pages)
        add_setting_page(tbody, page, setting_pages[page]);
      switch_page('Genel');
  
      main_div.style.display = 'block';
      showDeadCenterDiv(600, 300, main_div);
    }
    
    add_settings_button();
  };
  
  function add_go_to_bottom_button()
  {
    var h1 = dt('h1')[0];
    if (h1)
    {
     // Create the anchor 
      var anchor = dc('a');
      anchor.name = 'bottom';
      var el = de('el');
      if (el && el.nextSibling)
      {
        el.nextSibling.appendChild(anchor);
        var btn = dc('a');
        btn.href = '#bottom';
        btn.className = 'scrollDownBottom';
        btn.innerHTML = '(sona git)';
        h1.appendChild(btn);
      }
    }
    else
      console.log('h1 tag not found');
  }
//=============== Entry point ================================================
  eksitirt.install = function()
  {
    createStyles();
    eksitirt.install_settings();

    filterEntries();
    
    
    add_go_to_bottom_button();    
  };

  var document_body = dt('body')[0];
  var document_head = dt('head')[0];
  
  
  unsafeWindow.expandImage = expandImage;
  eksitirt.blockUser = blockUser;
})();


eksitirt.install();
