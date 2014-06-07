// ==UserScript==
// @name           Upload Screenshot Parse Image URL
// @namespace      http://www.uploadscreenshot.com/image/
// @include        http://www.uploadscreenshot.com/image/*
// @include        http://www.uploadscreenshot.com/userupload*
// @reference        http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  var find_main = false;
  var main_url = "";
  var main_a = "";
  var tbody;
for (var i = 0; i < 6; i++)
{
     var textarea;
     if (i == 0)
          textarea = $('[name="textarea"]');
     else
          textarea = $('[name="textarea'+i+'"]');
  
     if (textarea.length == 0)
          continue;
  
     var code = textarea.val();
  
     var parts = code.split("http://img");
  
     if (parts.length < 2)
          continue;
  
     var imgurl;

     if (parts[1].indexOf("'") > -1)
           imgurl = parts[1].substr(0, parts[1].indexOf("'"));
     else if (parts[1].indexOf('"') > -1)
           imgurl = parts[1].substr(0, parts[1].indexOf('"'));
     else
           imgurl = parts[1].substr(0, parts[1].indexOf('['));
     imgurl = 'http://img' + imgurl;
  
     var a = "<a href='"+imgurl+"' style='display:block;' target='_blank'>"+imgurl+"</a>";
     textarea.after(a);
  
     if ((imgurl.indexOf('main') != -1 || imgurl.indexOf('-orig.') != -1))
     {
          tbody = textarea.parents("tbody:first");
     
       if (imgurl.indexOf('-orig.') != -1 || main_url == "")
     {
         main_url = imgurl;
          main_a = a;
     }
          find_main = true;
     }
}

if (find_main == true)
{
     var input = '<a name="txtShortKey2_anchor" id="txtShortKey2_anchor" /><input type="text" size="110" value="'+main_url+'" onclick="this.select();" id="txtShortKey2" name="txtShortKey2">';
          tbody.prepend('<tr><td valign="middle"><strong>Main Image: </strong></td><td valign="middle">'+input+main_a+'</td></tr>');

     setTimeout(function () {
               $("#txtShortKey2").select();
               if (location.href.indexOf('#txtShortKey2_anchor') == -1)
               {
                    location.href = location.href + '#txtShortKey2_anchor';
               }
            
          }, 500);
}

var upload_url = "http://www.uploadscreenshot.com/userupload";
if (find_main == true)
     upload_url = upload_url + "?last_image=" + main_url;

var upload_tr = $('<tr><td valign="middle"><strong>Upload</strong></td><td valign="middle"><a href="'+upload_url+'">Auto direct to Upload after <span class="second">30</span> sec</a> <button type="button" class="cancel">Cancel</button></td></tr>');
tbody.prepend(upload_tr);

var second = upload_tr.find('.second:first');

countdown_cancel = false;
var countdown = function () {
     if (countdown_cancel != false)
          return;

     var s = parseInt(second.html());
     if (s > 0)
     {
          s--;
          second.html(s);

          setTimeout(function () {
               countdown();
          }, 1000);
     }
     else
     {
          location.href = upload_url;
     }
};

countdown();

var cancel_button = upload_tr.find('button.cancel').click(function () {
     $(this).parents("tr:first").remove();
     countdown_cancel = true;
});

}

function main2() {

     var needle = 'last_image=http://img';
     var image_index = location.href.indexOf(needle);
     if (image_index == -1)
          return;
     
     image_index = image_index + needle.length - 10;

     var main_url = location.href.substr(image_index, location.href.length - image_index);

     var cropped_url = main_url;
     var needle_str = "/orig/"
     if (main_url.indexOf('/main/') > -1)
          needle_str = "/main/";

     needle = main_url.lastIndexOf(needle_str);
     var needle2 = needle + needle_str.length;

     cropped_url = main_url.substring(0, needle) + "/cropped/" + main_url.substring(needle2, main_url.length);

     if (main_url.indexOf("-orig") > -1)
     {
          needle_str = "-orig";
          needle =cropped_url.lastIndexOf(needle_str);
          needle2 = needle + needle_str.length;

          cropped_url =cropped_url.substring(0, needle) + cropped_url.substring(needle2,cropped_url.length);
     }
     

     var image_div = $('<div id="lastImage" style="text-align:center;background-color:#F8F8F8;"></div>').insertBefore('#mainContent');
    
     image_div.html('<h1 style="margin:0;">Last Upload Image</h1> <div style="float:left;margin-left: 5em;"><a href="'+main_url+'"><img src="' +cropped_url+'" border="0" width="161" height="100" /></a></div>  <input type="text" size="80" style="text-align:center" value="'+main_url+'" onclick="this.select();" id="txtShortKey2" name="txtShortKey2">' + "<a href='"+main_url+"' style='display:block;' target='_blank'>"+main_url+"</a>");
}

// load jQuery and execute the main function
if (location.href.indexOf('http://www.uploadscreenshot.com/image/') > -1)
     addJQuery(main);
else
     addJQuery(main2);
