// ==UserScript==
// @name           Tweak Google Menu
// @author         Tomas Luis Alemany
// @description    Allows you to tweak the new Google menu
// @website        http://userscripts.org/scripts/show/119821
// @version        0.573
// @namespace      tgm
//
// @updateURL      http://userscripts.org/scripts/source/119821.user.js
//
// @include        https://*.google.*
// @include        http://*.google.*
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js
//
// @history        0.573  Fix: position of 'Remove' spot.
// @history        0.572  Updated to lastest jquery api.
// @history        0.571  Added new option to remove options using drag and drop from the menu directly.
// @history        0.57   Code cleanup. Added new configuration options: Toolbar thinner and now you can customize the menu options over the menu directly.
// @history        0.565  Code cleanup.
// @history        0.564  Fixed: neverending reload loop problem on some pages.
// @history        0.563  Code cleanup.
// @history        0.561  Code cleanup. Added new configuration options: URL target and reset to defaults.
// @history        0.56   Code cleanup. Added Google Voice option (user request) and some other options.
// @history        0.5534 Fix: LocalStorage API - getValue function. (I give up... by now if you use Chrome you should use Tampermonkey extension)
// @history        0.5533 Fix: LocalStorage API - getValue function. (I'm trying to find a way to store a setting between config page and get it from other google site...)
// @history        0.5532 Fix: LocalStorage API - getValue function. 
// @history        0.5531 Fix: fixed (really now) a minor issue in configuration menu.
// @history        0.553  Fix: minor issue in configuration menu.
// @history        0.552  Fix: stupid error in the URL of Translate service.
// @history        0.551  Fix: stupid error in the URL of URL Shortener service. 
// @history        0.55   New configuration menu to customize the menu graphically. Code cleanning. 
// @history        0.541  Added better LocalStorage API.
// @history        0.54   Added function to activate the new Google Toolbar if it's not activated
// @history        0.53   Added simple options to update configuration keys.
// @history        0.52   Fix: first run key definition and compatibility with Chrome.
// @history        0.5    Initial release.
//
// ==/UserScript==

/* ============================================================================
   Toolbox: Collection of functions to do things easier.
   ============================================================================ */
// Toolbox: LocalStorage API - Compatibility for Chrome
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {

   var keyPrefix = "tgm."; // I also use a '.' for seperation
   this.GM_log = function (message) {console.info(message);}
   this.GM_getValue = function (key, defValue) {var retval = window.localStorage.getItem(keyPrefix + key);if (retval == null) {return defValue;} return retval;}
   this.GM_setValue = function (key, value) {try {window.localStorage.setItem(keyPrefix + key, value);} catch (e) {GM_log("error setting value: " + e);}}
   this.GM_deleteValue = function (key) {try {window.localStorage.removeItem(keyPrefix + key);} catch (e) {GM_log("error removing value: " + e);}}
   this.GM_listValues = function () {var list = [];var reKey = new RegExp("^" + keyPrefix);
   for (var i = 0, il = window.localStorage.length; i < il; i++) {
      var key = window.localStorage.key(i);if (key.match(reKey)) {list.push(key.replace(keyPrefix, ''));}}return list;
   }
}

// Toolbox: Get root URL.
var getRootURL = function () {return /https?:\/\/[a-zA-Z0-9]+\.([^\/]+)/i.exec(document.URL)[1];};

// Toolbox: Get the text from a string without HTML tags.
var regExp = /<\/?[^>]+>/gi; var replaceTags = function (xStr){xStr = xStr.replace(regExp,"");return xStr;};

// Toolbox: Compare two arrays and return the diferences as an string separated by ','.
var diffArray = function (arr1, arr2) {var diff = []; for (var x=0;x<arr1.length;x++) {if (arr2.indexOf(arr1[x])<0) {var e=arr1[x];diff.push(e);}}return diff.join(",");};

// Toolbox: add CSS to heads of the document
var addCSS= function (css) {
    var head = document.getElementsByTagName("head");
    if (head.length > 0) {var node = document.createElement("style");node.type = "text/css";node.appendChild(document.createTextNode(css));head[0].appendChild(node);}
};

/* ============================================================================
   Code to activate the new Google Toolbar if it's not activated yet.
   Thanks to @Boondoklife: http://userscripts.org/scripts/review/119530
   ============================================================================ */
var checkNewBar = function () {

   if (document.cookie.indexOf("ID=03fd476a699d6487") == -1 || document.cookie.indexOf("TM=1322688084") == -1) {
      var newCookie = "PREF=ID=03fd476a699d6487:U=88e8716486ff1e5d:FF=0:LD=en:CR=2:TM=1322688084:LM=1322688085:S=McEsyvcXKMiVfGds; path=/; domain=.";
      newCookie += getRootURL();
      document.cookie = newCookie;
   }
};

/* ============================================================================
   Reset config settings
   ============================================================================ */
var resetConfig = function () {

   var arr = ["options","off","menu1","menu2","target","version"];
   for (var x=0;x<arr.length;x++) {var k=arr[x];GM_deleteValue(k);}
};

/* ============================================================================
   Save the changes made on the menu configuration and reload the page.
   ============================================================================ */
var applyConfiguration = function () {

   var msg_apply = "Do you want to apply this Google Menu configuration?";
   var confirmApply = confirm(msg_apply);
   if (confirmApply == true) {
      // Url target configuration
      var refTargetbox = document.getElementById('cfg_target');
      if (refTargetbox.checked == true) {GM_setValue("target","_blank");} else {GM_setValue("target","_self");}
      
      // Toolbar thinner
      var refThinnerbox = document.getElementById('cfg_tbszck');
      var tgm_thinner = refThinnerbox.checked;
      GM_setValue("thinner", tgm_thinner);
      if (tgm_thinner == true) {var refBarSize = document.getElementById('cfg_tbsize');GM_setValue("barsize", refBarSize.value);}

      // Menu buttons configuration
      //var refList = $("#gbzc").sortable("toArray")
	  var refList = document.getElementById('bml').getElementsByTagName('li');
      var m1=[]; var m2=[]; var flg='mm';
      for (var i = 0; i < refList.length; i++) {
         if (refList[i].id == 'seconmenu') {flg = 'sm';}
         if (refList[i].id == 'disableop') {flg = 'od';}
         if (flg == 'mm') {var e=refList[i].id;m1.push(e);}
         if (flg == 'sm' && refList[i].id!='seconmenu') {var e=refList[i].id; m2.push(e);}
      }
      if (m1.length > 0) {GM_setValue("menu1", m1.join(","));}
      GM_setValue("menu2", m2.join(","));
      GM_setValue("off", diffArray(tgm_op,m1.concat(m2)));
      window.location.reload();
   } else {return false;}
};

/* ============================================================================
   Add custom options to the menu. (soon)
   ============================================================================ */
var showAddCustom = function () {
   document.getElementById('cfg_modal').style.display = 'block';
   document.getElementById('cfg_addform').style.display = 'block';
};

var closeAddCustom = function (action) {
   document.getElementById('cfg_modal').style.display = 'none';
   document.getElementById('cfg_addform').style.display = 'none';
};

/* ============================================================================
   Draw the configuration menu.
   ============================================================================ */
var showConfigSettings = function () {

   document.getElementsByClassName("products")[0].setAttribute ("style", "display: none");

// Configuration Menu
   var cfg_srt = document.createElement('div'); cfg_srt.id = 'cfg';
   var cfg_srthtml = '<h2>Tweak Google Menu</h2>';
   cfg_srthtml += 'Version: ' + tgm_version + '<br>';
   cfg_srthtml += 'Author: <a href="https://plus.google.com/108933141203316709598/posts" target="_blank">Tomas J. Luis Alemany</a><br>';
   cfg_srthtml += 'Homepage: <a href="http://userscripts.org/scripts/show/119821" target="_blank">http://userscripts.org/scripts/show/119821</a><br><br>';
   cfg_srthtml += 'Click over the Drag and drop the options to reorder them as you wish and finally press the button Apply Changes,';
   cfg_srthtml += 'that you will find at the bottom of this page. Go back to Google homepage and enjoy your new customized Google menu.<br>';

// Menu Options 
   cfg_srthtml += '<br><b>Main Menu</b>';
   cfg_srthtml += '<ul id="bml" class="cfg_menu_options" style="list-style-type: none; margin: 0; padding: 0;">';
   for (var x=0;x<tgm_menu1.length;x++) {
      var key = "button." + tgm_menu1[x];
      var btna = JSON.parse(GM_getValue(key));
      var btnstyle = 'margin: 1px; padding-left: 5px; padding-right: 5px; width: 100px;';
      btnstyle += 'border: 1px solid #000000; display: inline-block; background-color: #000000;';
      btnstyle += 'color: #ffffff; white-space:nowrap; overflow: hidden;text-overflow: ellipsis; cursor:move;';
      cfg_srthtml += '<li id="' + tgm_menu1[x] + '" class="bmm" style="' + btnstyle + '">' + btna.label + '</li>';
   }
   cfg_srthtml += '<li id="seconmenu" class="nosort"><br><b>Secondary</b></li>';
   for (var y=0;y<tgm_menu2.length;y++) {
      if (tgm_menu2[y]) {
         var key = "button." + tgm_menu2[y];
         var btnb = JSON.parse(GM_getValue(key));
         var btnstyle = 'margin: 1px; padding-left: 5px; padding-right: 5px; width: 100px;';
         btnstyle += 'border: 1px solid #000000; display: inline-block; background-color: #ffffff;';
         btnstyle += 'white-space:nowrap; overflow: hidden;text-overflow: ellipsis; cursor:move;';
         cfg_srthtml += '<li id="' + tgm_menu2[y] + '" class="bsm" style="' + btnstyle + '">' + btnb.label + '</li>';
      }
   }
   cfg_srthtml += '<li id="disableop" class="nosort"><br><b>Other Options Available</b></li>';
   for (var z=0;z<tgm_off.length;z++) {
      if (tgm_off[z]) {
         var key = "button." + tgm_off[z];
         var btnc = JSON.parse(GM_getValue(key));
         var btnstyle = 'margin: 1px; padding-left: 5px; padding-right: 5px; width: 100px;';
         btnstyle += 'border: 1px solid #000000; display: inline-block; background-color: #f5f5f5;';
         btnstyle += 'white-space:nowrap; overflow: hidden;text-overflow: ellipsis; cursor:move;';
         cfg_srthtml += '<li id="' + tgm_off[z] + '" class="bdo" style="' + btnstyle + '">' + btnc.label + '</li>';
      }
   }
   cfg_srthtml +='</ul>';

// Menu Style
   cfg_srthtml +='<ul id="cfg_style" style="list-style-type: none; margin: 0; padding: 0;">';
   cfg_srthtml +='<li><br><b>Other settings:</b></li>';
   cfg_srthtml +='<li><input type="checkbox" id="cfg_target"> Open pages in a new tab/window.</li>';
   cfg_srthtml +='<li><input type="checkbox" id="cfg_tbszck"> Change toolbar size: ';
   cfg_srthtml +='<input type="text" id="cfg_tbsize" style="width: 18px;" maxlength="2" value="'+tgm_barsize+'" disabled="disabled"></li>';
   cfg_srthtml +='</ul><br>';
   cfg_srt.innerHTML = cfg_srthtml;

// Buttons toolbar  
   var cfg_btn = document.createElement('div');
   cfg_btn.setAttribute("style","border-top: 1px solid #DDDDDD; padding-top: 10px");
   var btnstyle = 'width: 110px; display: inline-block; white-space:nowrap; overflow: hidden;text-overflow: ellipsis; margin-right: 5px';
   var cfg_btnHTML ='<span>';
   cfg_btnHTML +='<input type="button" id="btn_reset" value="Reset Default" style="'+ btnstyle +'">';
   cfg_btnHTML +='<input type="button" id="btn_add" value="Add Custom" style="'+ btnstyle +'">';
   cfg_btnHTML +='<input type="button" id="btn_apply" value="Apply Changes" style="'+ btnstyle +'" disabled="disabled">';
   cfg_btnHTML +='</span>';
   cfg_btn.innerHTML = cfg_btnHTML;

// Popup to create custom options   
   var cfg_modal = document.createElement('div');
   cfg_modal.id = 'cfg_modal';
   cfg_modal.setAttribute("style","position:absolute;top:0px;left:0px;width:100%;height:100%;background-color:#000;opacity:0.5;display:none;"); 
   var cfg_addform = document.createElement('div');
   cfg_addform.id = 'cfg_addform';
   cfg_addform.setAttribute("style","position:absolute;top:50px;left:50px;width:400px;background-color:#fff;display:none;");
   var cfg_addformHTML = '<div style="width=100%;height=18px;background-color:#000;color:#fff;position:relative;padding-left:10px;vertical-align:center;display:block;">Add custom button</div>';
   cfg_addformHTML += '<div style="display:block; height:100%; padding: 10px;"><ul style="list-style-type:none;margin:0;padding:0;width:100%;">';
   cfg_addformHTML += '<li>Code:</li>';
   cfg_addformHTML += '<li><input type="text" id="btncode" value=""></li>';
   cfg_addformHTML += '<li>Name:</li>';
   cfg_addformHTML += '<li><input type="text" id="btnlabel" value=""></li>';
   cfg_addformHTML += '<li>URL address:</li>';
   cfg_addformHTML += '<li><input type="text" id="btnurl" value=""></li>';
   cfg_addformHTML += '<li>Image address:</li>';
   cfg_addformHTML += '<li><input type="text" id="btnimgurl" value=""></li>';
   cfg_addformHTML += '<li>Image position:</li>';
   cfg_addformHTML += '<li><input type="text" id="btnimgpos" value=""></li>';
   cfg_addformHTML += '<li>Image size:</li>';
   cfg_addformHTML += '<li><input type="text" id="btnimgsiz" value=""></li>';
   cfg_addformHTML += '</ul></div><div style="position:relative;width:100$; height: 24px; border-top: 1px solid #666; padding-left: 8px; padding-top: 8px; padding-bottom: 8px;"><u>';
   cfg_addformHTML += '<input type="button" id="btn_accept" value="Accept" style="'+ btnstyle +'">';
   cfg_addformHTML += '<input type="button" id="btn_cancel" value="Cancel" style="'+ btnstyle +'">';
   cfg_addformHTML += '</ul></div>';
   cfg_addform.innerHTML = cfg_addformHTML;
    
// Show configuration options
   var refMain = document.getElementById('main');
   if (refMain) {
      // spawn config menu
      refMain.appendChild(cfg_srt);
      refMain.appendChild(cfg_btn);
      refMain.appendChild(cfg_modal);
      refMain.appendChild(cfg_addform);
      
      // define options values
      var refTarget = document.getElementById('cfg_target');
      if (tgm_target == "_blank") {refTarget.setAttribute("checked","checked");}
      var refThinner = document.getElementById('cfg_tbszck'); refThinner.checked=tgm_thinner;
      var refBarSize = document.getElementById('cfg_tbsize'); refBarSize.disabled=!tgm_thinner;

      // define options behaviour
      $(".cfg_menu_options").sortable({cancel: ".nosort",zIndex: 90000,update: function(event,ui){$("#btn_apply").removeAttr("disabled");$("#btn_add").attr("disabled", "disabled");}});
      refTarget.addEventListener('click', function(){$("#btn_apply").removeAttr("disabled");$("#btn_add").attr("disabled", "disabled");}, false);
      refThinner.addEventListener('click', function(){refBarSize.disabled=!refThinner.checked;$("#btn_apply").removeAttr("disabled");$("#btn_add").attr("disabled", "disabled");}, false);
      refBarSize.addEventListener('focus', function(){$("#btn_apply").removeAttr("disabled");$("#btn_add").attr("disabled", "disabled");}, false);

      // define buttons configuration
      var msg_reset = "If you continue Google Menu will be restored to default configuration.\n\nDo you want to continue?";
      var btn_reset = document.getElementById('btn_reset');
      btn_reset.href="#"; btn_reset.addEventListener('click', function(){var r = confirm(msg_reset); if (r == true) {resetConfig();}}, false);
      var btn_add = document.getElementById('btn_add');
      btn_add.href="#"; btn_add.addEventListener('click', function(){showAddCustom();}, false);
      var btn_apply = document.getElementById('btn_apply');
      btn_apply.href="#"; btn_apply.addEventListener('click', function(){applyConfiguration();}, false);
      var btn_accept = document.getElementById('btn_accept');
      btn_accept.href="#"; btn_accept.addEventListener('click', function(){closeAddCustom(true);}, false);
      var btn_cancel = document.getElementById('btn_cancel');
      btn_cancel.href="#"; btn_cancel.addEventListener('click', function(){closeAddCustom(false);}, false);
   }
};

/* ============================================================================
   Add Menu1 button (Main menu)
   ============================================================================ */
var addMenu1Button = function(btnid) {

   var btnhtml = '';
   var btn = JSON.parse(GM_getValue("button." + btnid));
   if (btn) {
      var btnhtml = '<li class="gbt" id="m1' + btnid + '"><a class="gbzt" id="gb_899" href="' + btn.url + '"';
      btnhtml += 'target="' + tgm_target + '">';
      btnhtml += '<span style="background-image: url(' + btn.imgurl + ');';
      btnhtml += 'background-size: ' + btn.imgsiz + ';';
      btnhtml += 'background-position: ' + btn.imgpos + '; background-repeat:no-repeat;" class="gbtb2"></span><span class="gbts">' + btn.label + '</span></a></li>';
   }
   return btnhtml;
};

/* ============================================================================
   Add Menu2 button (Secondary menu)
   ============================================================================ */
var addMenu2Button = function(btnid) {

   var btnhtml = '';
   var btn = JSON.parse(GM_getValue("button." + btnid));
   if (btn) {
      var btnhtml = '<li class="gbmtc" id="m2' + btnid + '"><a class="gbmt" id="gb_999" href="' + btn.url + '"';
      btnhtml += 'target="' + tgm_target + '">';
      btnhtml += '<span style="background-image: url(' + btn.imgurl + ');';
      btnhtml += 'background-size: ' + btn.imgsiz + ';';
      btnhtml += 'background-position: ' + btn.imgpos + '; background-repeat:no-repeat;" class="gbtb2"></span>';
      btnhtml += '<span class="gbts">' + btn.label + '</span></a></li>';
   }
   return btnhtml;
};

/* ============================================================================
   Add EvenMore button 
   ============================================================================ */
var addEvenMoreButton = function () {

   // Get button parameters.
   var btn = JSON.parse(GM_getValue("button.evenmore"));
   // Create the button.
   var ebtnp = document.getElementById('gbdi');
   if (ebtnp) {
      var ebtn = document.createElement('div');ebtn.setAttribute("id", "gbtem");ebtn.setAttribute("class", "gbmtc");
      ebtnp.appendChild(ebtn);
      var ebtnHTML = '<a class="gbmt" href='+ btn.url +'><span class="gbts" ';
      ebtnHTML += 'style="background-image: url(' + btn.imgurl + '); opacity: .55;';
      ebtnHTML += 'background-position: ' + btn.imgpos + ';';
      ebtnHTML += 'background-size: ' + btn.imgsiz + '; background-repeat:no-repeat;"';
      ebtnHTML += '>' + btn.label + '</span></a>';
      ebtn.innerHTML = ebtnHTML;
   }
};

/* ============================================================================
   Add Menu2 buttons
   ============================================================================ */
var addMenu2 = function () {

   var node = document.getElementById("gbd"); if (node) {node.parent.removeChild(node);} 
   var menu2 = document.createElement("div");
   menu2.setAttribute("id","gbd");
   menu2.setAttribute("class","gbm");
   menu2.setAttribute("aria-owner","gbztm");
   menu2.setAttribute("style","height: auto; width: auto; visibility: hidden;");
   var menu2HTML = '<div id="gbdi" class="gbmc"><div id="gbmb" style="visibility: hidden;"></div>';
   menu2HTML += '<div id="gbm1" class="gbmasc">';
   // Add the buttons of the secondary menu.
   for (x=0;x<=tgm_menu2.length;x++) {if (tgm_menu2[x]) {menu2HTML += addMenu2Button(tgm_menu2[x]);}}
   menu2HTML += '</div></div>';
   menu2.innerHTML = menu2HTML; node = document.getElementById('gbtm'); if (node) {node.appendChild(menu2);}
};

/* ============================================================================
   Get menu options order and store into localDB
   ============================================================================ */
var updateMenuOrder = function (idsInOrder) {

   var m1 = []; var m2 = [];	
   for (x=0;x<idsInOrder.length;x++) {
      var e = document.getElementById(idsInOrder[x]);
      var a = e.getElementsByTagName("a");
      var tm = e.parentNode.id;
      var el = idsInOrder[x].slice(2);
      e.removeAttribute("class");
      a[0].removeAttribute("class");
      if (tm == 'gbzc') {
         m1.push(el);
         e.setAttribute("class","gbt");
         a[0].setAttribute("class","gbzt");
      } else {
         m2.push(el);
         e.setAttribute("class","gbmtc");
         a[0].setAttribute("class","gbmt");
      }
   }
   if (m1.length==0) {
      alert("Sorry but at least one option must remain in the main menu.");
   } else {
      GM_setValue("menu1", m1.join(","));
      GM_setValue("menu2", m2.join(","));
   }
};

/* ============================================================================
   Make Menu Sortable
   ============================================================================ */
var makeSortable = function () {
   css = ".gbtc .gbmasc {list-style-type: none; margin: 0; padding: 0;}"; addCSS(css);
   $("#gbzc").sortable({
      items: "li:not(#gbtm)",
      distance: 30,
      zIndex: 10009,
      opacity: 0.75,
      update: function(event,ui){
         var idsInOrder = $("#gbzc").sortable("toArray");
         updateMenuOrder(idsInOrder);window.location.reload();
      },
      start: function(e, ui) {prt = $(ui.item).parent().attr('id'); $("#rmhelper").css("display","block");},
      receive: function(e, ui) {sortableIn = 1;},
      over: function(e, ui) {sortableIn = 1;},
      out: function(e, ui) {sortableIn = 0;},
      beforeStop: function(e, ui) {
         if (sortableIn == 0 && $(ui.item).parent().attr('id') == prt) {
            var msg_remove = "Do you want to remove this option from Google menu?";
            var r = confirm(msg_remove); if (r == true) {
               ui.item.remove();
               var idsInOrder = $("#gbzc").sortable("toArray");
               updateMenuOrder(idsInOrder);window.location.reload();
            }
         }
         $("#rmhelper").css("display","none");
      }
   });
};

/* ============================================================================
   Draw customized Google Menu
   ============================================================================ */
var showCustomMenu = function () {
    
   // Get the username to use it on G+ button.
   var refGooglePlus = document.getElementById('gb_119');
   if (refGooglePlus) {GM_setValue("button.gplus",'{"label":"' + replaceTags(refGooglePlus.innerHTML) + '","url":"https://plus.google.com","imgurl":"http://ssl.gstatic.com/gb/images/j_40368b96.png","imgpos":"-111px 0px","imgsiz":"auto"}');}
   // Find Google menu element.
   var refMenuContent = document.getElementById('gbzc');
   if (refMenuContent) {
      // Remove all the content of the original Google menu.
      refMenuContent.parentNode.removeChild(refMenuContent);
      // And replace it with the customized Google menu.
      var refMenuList = document.createElement("ol");
      refMenuList.setAttribute("id", "gbzc");
      refMenuList.setAttribute("class", "gbtc");
      var refMenuListHTML = '';     
      // Add the rest of the main menu buttons.
      for (x=0;x<=tgm_menu1.length;x++) {if (tgm_menu1[x]) {refMenuListHTML += addMenu1Button(tgm_menu1[x]);}}
      // Add the more button.
      refMenuListHTML += '<li id="gbtm" class="gbt">';
      refMenuListHTML += '<a  id="gbztm" class="gbgt" aria-owns="gbd" aria-haspopup="true" href="http://www.google.com/intl/en/options/">';
      refMenuListHTML += '<span class="gbts gbtsa" id="gbztms">More</span></span></a>';
      refMenuListHTML += '</li>';
      refMenuList.innerHTML = refMenuListHTML;var refMenu = document.getElementById('gbz');if (refMenu) {refMenu.appendChild(refMenuList);}
      // Add secondary menu buttons.
      addMenu2();
      // Add the 'Evenmore' button.
      addEvenMoreButton();
   
      var rmhelper = document.createElement('div');
      rmhelper.setAttribute("id","rmhelper");
      var rmhelper_top = document.getElementById('gbtm').offsetTop  + document.getElementById('gbtm').offsetHeight + document.getElementById('gb').offsetHeight + 4;
      var css = "position: absolute;\
                 left: -16px;top: " + rmhelper_top + "px;\
                 padding: 8px 16px 8px 64px;\
                 width: 112px; height: 26px;\
                 border: 1px dotted red; -moz-border-radius: 10px; border-radius: 10px;\
                 background-color: #fffeff;\
                 opacity: 0.25;\
                 display: none;\
                 z-index: 1;";
      rmhelper.setAttribute("style",css);
      rmhelper.innerHTML = '<span>Remove</span>';
      document.getElementById('gbq1').appendChild(rmhelper);
   
      makeSortable();
   }
};

/* ============================================================================
   Make toolbar thinner
   ============================================================================ */
var makeToolbarThinner = function (size) {

      var gtbLogoL = 44;
      var gtbMenuL = 24;
      var gtbHeight = size;
      var gtbArrow = size-(((4000/72)*size)/100);
      var gtbLogoT =((size-26)/2)+2;
      var gtbLogoB = ((size-26)/2)-2;
      var gtbMenuT = size-9;
      var gtbSign = ((size-30)/2);

      //Toolbar height
  var css =  "#gb {height: "+ gtbHeight +"px;}";
      css += "#gb.gbes, #gb.gbesi {height:"+ gtbHeight +"px;}";
      css += ".c-i-Yd-V-xe {height:"+ gtbHeight +"px !important;}";
      css += "#gb.gbem, #gb.gbemi {height:"+ gtbHeight +"px;}"; 
      css +=  "#gbx1.gbes, #gbx2.gbes, #gbqlw.gbes, #gb.gbesi #gbx1, #gb.gbesi #gbx2, #gb.gbesi #gbqlw {height:"+ gtbHeight +"px;}";
      css += "#gbx1.gbem, #gbx2.gbem, #gbqlw.gbem, #gb.gbemi #gbx1, #gb.gbemi #gbx2, #gb.gbemi #gbqlw {height:"+ gtbHeight +"px;}";
      css +=  "#gbx1, #gbx2, #gbqlw, #gb #gbx1, #gb #gbx2, #gb #gbqlw {height:"+ gtbHeight +"px;}";

      //Google logo
      css += ".gbqfh #gbql.gbes, #gb.gbesi .gbqfh #gbql {margin-top: " + gtbLogoT + "px; margin-bottom: " + gtbLogoB + "px;}";
      css += ".gbqfh #gbql.gbem, #gb.gbemi .gbqfh #gbql {margin-top: " + gtbLogoT + "px; margin-bottom: " + gtbLogoB + "px;}";
      css += ".gbqfh #gbql {margin-top: " + gtbLogoT + "px; margin-bottom: " + gtbLogoB + "px;}";

      //Arrow to the Right of the Google logo
      css += "#gbmail.gbes, #gb.gbesi #gbmail {top: " + gtbArrow + "px}";
      css += "#gbmail.gbem, #gb.gbemi #gbmail {top: " + gtbArrow + "px}";
      css += "#gbmail, #gb #gbmail {top: " + gtbArrow + "px}";

      //Left Menu
      css += ".gbesi #gbq1 .gbmab, .gbes #gbq1 .gbmab {margin-top: " + gtbMenuT + "px;}";
      css += ".gbesi #gbq1 .gbmac, .gbes #gbq1 .gbmac {margin-top: " + gtbMenuT + "px;}";
      css += ".gbesi #gbq1.gbto #gbz, .gbesi #gbq1.gbto #gbs, .gbes #gbq1.gbto #gbz, .gbes #gbq1.gbto #gbs {top:"+ gtbHeight +"px !important;}";      
      css += ".gbemi #gbq1 .gbmac, .gbem #gbq1 .gbmac {margin-top: " + gtbMenuT + "px;}";
      css += ".gbemi #gbq1 .gbmab, .gbem #gbq1 .gbmab {margin-top: " + gtbMenuT + "px;}";
      css += ".gbemi #gbq1.gbto #gbz, .gbemi #gbq1.gbto #gbs, .gbem #gbq1.gbto #gbz, .gbem #gbq1.gbto #gbs {top:"+ gtbHeight +"px !important;}";      
      css += "#gbq1 .gbmab {margin-top: " + gtbMenuT + "px;}";
      css += "#gbq1 .gbmac {margin-top: " + gtbMenuT + "px;}";
      css += "#gbq1.gbto #gbz, #gbq1.gbto #gbs {top:"+ gtbHeight +"px !important;}";

      //Right Side
      css += "#gbu.gbes, #gbn.gbes, #gbq2.gbes, #gbq3.gbes, #gb.gbesi #gbu, #gb.gbesi #gbn, #gb.gbesi #gbq2, #gb.gbesi #gbq3 {padding-top: " + gtbSign + "px; padding-bottom: " + gtbSign + "px;}";
      css += "#gbu.gbem, #gbn.gbem, #gbq2.gbem, #gbq3.gbem, #gb.gbemi #gbu, #gb.gbemi #gbn, #gb.gbemi #gbq2, #gb.gbemi #gbq3 {padding-top: " + gtbSign + "px; padding-bottom: " + gtbSign + "px;}";
      css += "#gbu, #gbn, #gbq2, #gbq3, #gb #gbu, #gb #gbn, #gb #gbq2, #gb #gbq3 {padding-top: " + gtbSign + "px; padding-bottom: " + gtbSign + "px;}";
      css += "#gbv.gbes, #gbn.gbes, #gbq2.gbes, #gbq3.gbes, #gb.gbesi #gbv, #gb.gbesi #gbn, #gb.gbesi #gbq2, #gb.gbesi #gbq3 {padding-top: " + gtbSign + "px; padding-bottom: " + gtbSign + "px;}";
      css += "#gbv.gbem, #gbn.gbem, #gbq2.gbem, #gbq3.gbem, #gb.gbemi #gbv, #gb.gbemi #gbn, #gb.gbemi #gbq2, #gb.gbemi #gbq3 {padding-top: " + gtbSign + "px; padding-bottom: " + gtbSign + "px;}";
      css += "#gbv, #gbn, #gbq2, #gbq3, #gb #gbv, #gb #gbn, #gb #gbq2, #gb #gbq3 {padding-top: " + gtbSign + "px; padding-bottom: " + gtbSign + "px;}";

  addCSS(css);
};

/* ============================================================================
   Definition of the properties of each button of the menu.
   To add new buttons use the following schema. Be careful to use a unique <code> and then add it to 'tgm_av' parameter.
   GM_setValue("button.<code>",'{"label":"<button label>","url":"<button url>","imgurl":"<image url>","imgpos":"<image position>","imgsiz":"<image size>"}');
   ============================================================================ */
var defButtons = function () {

   // Default Google menu options
   var def_imgurl = "http://ssl.gstatic.com/gb/images/j_40368b96.png";
   var evnmoreimg = "http://www.google.com/reader/ui/345992534-settings.png";
   GM_setValue("button.evenmore",'{"label":"Even More","url":"http://www.google.com/intl/en/options/","imgurl":"'+ evnmoreimg +'","imgpos":"20px 10px","imgsiz":"24px 24px"}');
   GM_setValue("button.gplus",'{"label":"Google+","url":"https://plus.google.com","imgurl":"' + def_imgurl + '","imgpos":"-111px 0px","imgsiz":"auto"}');
   GM_setValue("button.search",'{"label":"Search Web","url":"https://www.google.com","imgurl":"' + def_imgurl + '","imgpos":"-266px -124px","imgsiz":"auto"}');
   GM_setValue("button.blogger",'{"label":"Blogger","url":"https://www.blogger.com/?tab=wj","imgurl":"' + def_imgurl + '","imgpos":"0px -207px","imgsiz":"auto"}');
   GM_setValue("button.books",'{"label":"Books","url":"http://books.google.com/bkshp?hl=en&tab=wp","imgurl":"' + def_imgurl + '","imgpos":"-259px -267px","imgsiz":"auto"}');
   GM_setValue("button.calendar",'{"label":"Calendar","url":"https://www.google.com/calendar","imgurl":"' + def_imgurl + '","imgpos":"-148px -37px","imgsiz":"auto"}');
   GM_setValue("button.documents",'{"label":"Documents","url":"https://www.google.com/docs","imgurl":"' + def_imgurl + '","imgpos":"-192px 0px","imgsiz":"auto"}');
   GM_setValue("button.finance",'{"label":"Finance","url":"https://www.google.com/finance?tab=we","imgurl":"' + def_imgurl + '","imgpos":"-74px -207px","imgsiz":"auto"}');
   GM_setValue("button.gmail",'{"label":"Gmail","url":"https://mail.google.com","imgurl":"' + def_imgurl + '","imgpos":"-185px -37px","imgsiz":"auto"}');
   GM_setValue("button.maps",'{"label":"Maps","url":"https://www.google.com/maps","imgurl":"' + def_imgurl + '","imgpos":"-148px -267px","imgsiz":"auto"}');
   GM_setValue("button.mobile",'{"label":"Mobile","url":"https://www.google.com/mobile/","imgurl":"' + def_imgurl + '","imgpos":"0px 0px","imgsiz":"auto"}');
   GM_setValue("button.music",'{"label":"Music","url":"https://music.google.com","imgurl":"' + def_imgurl + '","imgpos":"0px -244px","imgsiz":"auto"}');
   GM_setValue("button.news",'{"label":"News","url":"https://www.google.com/news","imgurl":"' + def_imgurl + '","imgpos":"-111px -37px","imgsiz":"auto"}');
   GM_setValue("button.offers",'{"label":"Offers","url":"https://www.google.com/offers","imgurl":"' + def_imgurl + '","imgpos":"-222px -267px","imgsiz":"auto"}');
   GM_setValue("button.photos",'{"label":"Photos","url":"https://plus.google.com/u/0/photos?tab=wq","imgurl":"' + def_imgurl + '","imgpos":"-111px -267px","imgsiz":"auto"}');
   GM_setValue("button.reader",'{"label":"Reader","url":"https://www.google.com/reader","imgurl":"' + def_imgurl + '","imgpos":"-143px -74px","imgsiz":"auto"}');
   GM_setValue("button.images",'{"label":"Search Images","url":"https://www.google.com/images","imgurl":"' + def_imgurl + '","imgpos":"-37px -207px","imgsiz":"auto"}');
   GM_setValue("button.videos",'{"label":"Search Videos","url":"https://video.google.com","imgurl":"' + def_imgurl + '","imgpos":"-67px -37px","imgsiz":"auto"}');
   GM_setValue("button.shopping",'{"label":"Shopping","url":"https://www.google.com/prdhp?hl=en&tab=wf","imgurl":"' + def_imgurl + '","imgpos":"-229px -124px","imgsiz":"auto"}');
   GM_setValue("button.translate",'{"label":"Translate","url":"http://translate.google.com","imgurl":"' + def_imgurl + '","imgpos":"-37px 0px","imgsiz":"auto"}');
   GM_setValue("button.wallet",'{"label":"Wallet","url":"https://wallet.google.com/manage/","imgurl":"' + def_imgurl + '","imgpos":"-30px -37px","imgsiz":"auto"}');
   GM_setValue("button.youtube",'{"label":"YouTube","url":"https://www.youtube.com/?tab=w1","imgurl":"' + def_imgurl + '","imgpos":"-185px -267px","imgsiz":"auto"}');

   // TGM options
   GM_setValue("button.market",'{"label":"Market","url":"https://market.android.com/?hl=en","imgurl":"http://market.android.com/static/client/images/logo.png","imgpos":"0px 0px","imgsiz":"auto"}');
   GM_setValue("button.picasa",'{"label":"Picasa","url":"http://picasaweb.google.com","imgurl":"http://picasa.google.com/images/logo_picasa_large.png","imgpos":"0px 0px","imgsiz":"91px 32px"}');
   GM_setValue("button.blogs",'{"label":"Search Blogs","url":"https://www.google.com/blogsearch","imgurl":"http://www.google.com/images/icons/product/blogs-32.gif","imgpos":"0px 0px","imgsiz":"auto"}');
   GM_setValue("button.scholar",'{"label":"Scholar","url":"https://scholar.google.com","imgurl":"http://www.google.com/images/icons/feature/chalkboard_123-y48.png","imgpos":"0px 0px","imgsiz":"32px 32px"}');
   GM_setValue("button.alerts",'{"label":"Alerts","url":"https://www.google.com/alerts","imgurl":"http://www.google.com/images/icons/product/alerts-32.png","imgpos":"0px 0px","imgsiz":"auto"}');
   GM_setValue("button.groups",'{"label":"Groups","url":"https://groups.google.com","imgurl":"http://www.google.com/images/icons/product/discussions-32.gif","imgpos":"0px 0px","imgsiz":"auto"}');
   GM_setValue("button.shorturl",'{"label":"URL Shortener","url":"http://goo.gl/","imgurl":"http://www.google.com/analytics/images/icons/ga-v2-analysis-power-tools.png","imgpos":"0px 0px","imgsiz":"32px 32px"}');
   GM_setValue("button.code",'{"label":"Code","url":"http://code.google.com/intl/en/","imgurl":"http://www.google.com/images/icons/product/code-32.png","imgpos":"0px 0px","imgsiz":"auto"}');
   GM_setValue("button.games",'{"label":"Games","url":"https://plus.google.com/u/0/games","imgurl":"https://ssl.gstatic.com/s2/oz/images/login-sprite-2410be458fb70957ee50b03b9d4fe1ae.png","imgpos":"0px -160px","imgsiz":"32px 192px"}');
   GM_setValue("button.hangout",'{"label":"Hangout","url":"https://talkgadget.google.com/hangouts/4e4d291e4a12d267b60a1f9dcc118812d6f459e5?hl=en-GB&authuser=0#ceveryone","imgurl":"https://ssl.gstatic.com/s2/oz/images/login-sprite-2410be458fb70957ee50b03b9d4fe1ae.png","imgpos":"0px 0px","imgsiz":"32px 192px"}');
   GM_setValue("button.voice",'{"label":"Voice","url":"https://www.google.com/voice","imgurl":"http://www.google.com/images/icons/feature/phone_handset-y32.png","imgpos":"0px 0px","imgsiz":"auto"}');
   GM_setValue("button.analytics",'{"label":"Analytics","url":"https://www.google.com/analytics","imgurl":"http://www.google.com/images/icons/product/analytics-32.png","imgpos":"0px 0px","imgsiz":"auto"}');
   GM_setValue("button.gadsense",'{"label":"Adsense","url":"https://www.google.com/adsense","imgurl":"http://www.google.es/images/icons/product/adwords-32.png","imgpos":"0px 0px","imgsiz":"auto"}');
   GM_setValue("button.webtools",'{"label":"Webmaster Tools","url":"https://www.google.com/webmasters/tools","imgurl":"https://ssl.gstatic.com/images/icons/product/webmaster_tools-32.png","imgpos":"0px 0px","imgsiz":"auto"}');
   GM_setValue("button.compiler", '{"label":"Closure Compiler","url":"http://closure-compiler.appspot.com/home","imgurl":"http://code.google.com/intl/en/closure/images/logo32px.png","imgpos":"4px 0px","imgsiz":"28px 28px"}');
};

/* ============================================================================
   Inizialitation of script settings
   ============================================================================ */

// Check if this script is a new version and store the script version.
var tgm_version = "0.573"; var tgm_resert = false;

if (!GM_getValue("version") || (GM_getValue("version")!=tgm_version && tgm_resert==true)) {
   resetConfig();
   checkNewBar();
   window.location.reload();
}; GM_setValue("version",tgm_version);

// Get 'target' value.
var tgm_target = GM_getValue("target","_blank"); GM_setValue("target",tgm_target);
//Get 'thinner' value.
var tgm_thinner = GM_getValue("thinner", false); GM_setValue("thinner",tgm_thinner);
var tgm_barsize = GM_getValue("barsize", "72"); GM_setValue("barsize",tgm_barsize);
if (tgm_thinner == true) {makeToolbarThinner(tgm_barsize);};

// Default menu configuration. To add new button add it under "tgm_av" and don't forget to define its details in 'defButtons' function.
var tgm_m1 = ["gplus","search","images","maps","youtube","news","gmail","documents"];
var tgm_m2 = ["calendar","translate","mobile","books","music","offers","wallet","shopping","blogger","reader","finance","photos","videos"];
var tgm_av = ["market","picasa","blogs","scholar","alerts","groups","shorturl","code","games","hangout","voice","analytics","gadsense","webtools","compiler"];

// Get list of all options available and store it in a key.
var tgm_op = tgm_m1.concat(tgm_m2,tgm_av); // List of all menu options
GM_setValue("options", tgm_op.join(","));

// Check if configuration keys exist in the local DB. If not then create them with the default values.
// Then get their value to use them later in the script.
if (GM_getValue("menu1")==undefined) {GM_setValue("menu1", tgm_m1.join(","));}
var tgm_menu1 = GM_getValue("menu1").split(",");
if (GM_getValue("menu2")==undefined) {GM_setValue("menu2", tgm_m2.join(","));}
var tgm_menu2 = GM_getValue("menu2").split(",");
GM_setValue("off", diffArray(tgm_op,tgm_menu1.concat(tgm_menu2)));
var tgm_off = GM_getValue("off").split(",");

// Store button details on the local DB
defButtons();

/* ============================================================================
   Tweak Google menu
   ============================================================================ */
if((document.location+"").indexOf("www.google.com/intl/en/about/products/index.html") != -1) {
// If you are in the 'Evenmore' page, show the configuration menu.
   showConfigSettings();
   checkNewBar();
} else {
// If not then activate the new Google toolbar and show the customized menu.
   showCustomMenu();
}

