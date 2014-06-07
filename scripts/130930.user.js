// ==UserScript==
// @name            Cityville Linkexplorer
// @namespace       http://www.facebook.com/*
// @run-at          document-end
// @include         *cityville.zynga.com/crew.php?mId*
// @include         *cityville.zynga.com/gifts.php?action*
// @include         *cityville.zynga.com/request.php?itemName*
// @include         *cityville.zynga.com/upgradeHelp.php?wId*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright       Andreas Seyfarth
// @author          Andreas Seyfarth
// @version         0001
// @license         http://creativecommons.org/licenses/by-nc-nd/3.0/deed.de
// ==/UserScript==

var FBurl = "http://apps.facebook.com/cityville/?fb_source=bookmark_apps&ref=bookmarks&count=0&fb_bmpos=1_0";
var ZYurl = "http://fb-zc1.cityville.zynga.com/?fb_source=bookmark_apps&ref=bookmarks&count=0&fb_bmpos=1_0";

var database = {
    cityvilleexchange: {
              url:    "http://www.cityvilleexchange.com/index.php",
              data:   function (uri) 
                  { 
                      return 'op=chkPostLink&uri=' +escape(uri) 
                  },
              response: function(response) 
                  {
                      var json = eval("(" + response + ")");
                      return json.msg;       
                  }
    },
    linkboerse: {
              url:    "http://linkboerse.browsergamescheats.com/insert.php",
              data:   function(uri) 
                  { 
                      return 'url=' +escape(uri) 
                  },
              response: function(response) 
                  {
                      return $(response).text();        
                  }
    },
    cityvillelinkexchange: {
              url:    "http://www.cityvillelinkexchange.com/core/plugin.php",
              data:   function (uri) 
                  {  
                      return 'url=' +escape(uri)  
                  },
              response: function(response) 
                  {
                      return response;       
                  }
    }               
}

var lang = {
      de: {
          send:         "Sende an Datenbank",
          abbort:       "Ok",
          showlink:     "Link anzeigen"
      },
      en : {
          send:         "Send",
          abbort:       "Ok",
          showlink:     "Show link"    
      }
}

switch (navigator.language) {
    case "de-DE":
        language = "de";
        break;
    case "de":
        language = "de";
        break;
    case "en":
        language = "en";
        break;
    default:
        language = "en";
        break;
}

GM_log(document.URL);
GM_log(navigator.language);


waitforprogress ();

function waitforprogress () {
    if(!$('.zui_mfs_selector').length)
        window.setTimeout(function() { waitforprogress () }, 1000);
    else
        grab_uri();
}

function grab_uri () {
    var grab = document.body.innerHTML.match(/button_href \: \"(.+)\"/i);
    GM_log(grab[1]);
    window_height = 220;
    window_width  = 600;
    x = screen.availWidth   - 230;
    y = screen.availHeight  - 200;
    
    cv_container = document.createElement("div");
    cv_container.id = "cv_container";
	  document.body.appendChild(cv_container);
	  $(cv_container).hide()
                  .html('<div id="cv_text"></div><div id="cv_dbs" class="zui_listselector_body"></div><div class="zui_mfs_centercontent_buttons" id="cv_btn"></div>');
    
    $('#cv_dbs').append('<div id="cv_dblist" class="zui_listselector_dual_vert_unselectedcontainer"></div>');
    //$('#cv_dblist').append('<div class="zui_listselector_dual_unselected_item zui_listselector_dual_vert_unselected_item zui_clearfix"><input type="radio" name="cityvilleexchange"><span>cityvilleexchange.com</span></div>');
    //$('#cv_dblist').append('<div class="zui_listselector_dual_unselected_item zui_listselector_dual_vert_unselected_item zui_clearfix"><input type="radio" name="linkboerse"><span>linkboerse.org</span></div>');
    //$('#cv_dblist').append('<div class="zui_listselector_dual_unselected_item zui_listselector_dual_vert_unselected_item zui_clearfix"><input type="radio" name="cityvillelinkexchange"><span>cityvillelinkexchange.com</span></div>');
    $('#cv_dblist').append('<br>Send to www.cityvillelinkexchange.com<br><br><br>');
    
    // Layer1 Buttons
    $('#cv_btn').html('<a id="cv_btn_send" class="zui_button zui_default_button zui_button_image zui_default_button_image zui_default zui_mfs_button_send zui_button_primary"><span>' + lang[language].send + '</span></a> <a id="cv_btn_ok" class="zui_button zui_default_button zui_button_image zui_default_button_image zui_default zui_mfs_button_send zui_button_primary"><span>' + lang[language].abbort + '</span></a>');
    
    // Opener
    $('a[class~="zui_mfs_button_cancel"]').after('<a id="cv_lnkextract" class="zui_button zui_default zui_mfs_button_cancel zui_base_enabled zui_button_enabled zui_enabled"><span>' + lang[language].showlink + '</span></a>');
    
    $('#cv_text').text(grab[1]).click(function () { SelectText('cv_text') });
    
    // Buttons click functions
    $('#cv_lnkextract, #cv_btn_ok').click(function() 
        {
            $(cv_container).fadeToggle('slow');            
        });
    
    $('#cv_btn_send').click(function ()
        {
            mydb = "cityvilleexchange";
            db_query = database[mydb].data(grab[1]);
            GM_xmlhttpRequest({
                method: 'POST',
                url: database[mydb].url,
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                data:  db_query,
                onload: function (r) {
                        $('#cv_text').text(database[mydb].response(r.responseText))
                        $('#cv_btn_send').hide();
                        }
            });        
        });
        
    style_btn       = '#cv_btn{text-align:center}';
    style_text      = '#cv_text{height:120px;text-align:center;vertical-align:middle;word-wrap:break-word}';
    style_container = '#cv_container{position:fixed;border:6px solid #FF9966;height:'+ window_height + 'px;width:' + window_width + 'px;top:50%;right:50%;margin-top:-' +(window_height/2) + 'px;margin-right:-' + (window_width/2)  + 'px;padding:15px;background-color:#FFF;z-Index:1000}';
    addGlobalStyle(style_btn + style_text + style_container);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function SelectText(element) {
    var doc = document;
    var text = doc.getElementById(element);    
    if (doc.body.createTextRange) { // ms
        var range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
        
    }
}