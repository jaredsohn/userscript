// ==UserScript==
// @name          Peek at Facebook
// @namespace     http://www.hoja.idv.tw/peekFB
// @description   Hide/Show the header, sides, and styles in Facebook.
// @author        gatorliu(at)gmail
// @homepage
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @version       1.0.5.20121212
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
(function() {

   var version="1.0.5.20121212"

   //To disable peekControlPanel when on a website embedded "like" by iframe 
   if (!_("blueBarHolder")) {return;}

   var ckupdate_uri="http://userscripts.org/scripts/source/118293.meta.js"
   var ad_str= '<hr>'
         + '<iframe src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FPeek-at-FB%2F107123866070056&amp;width=292&amp;height=62&amp;colorscheme=light&amp;show_faces=false&amp;border_color&amp;stream=false&amp;header=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:292px; height:62px;" allowTransparency="true"></iframe>'
         + '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=EYY3CXYTAXZFE" title="Donate to this script for improvements" target="_blank"><img src="https://www.paypalobjects.com/en_US/i/btn/x-click-butcc-donate.gif" alt="Donate!" /></a>'

   var aboutmsg = "<p>ver: " +version+ "<br><br><a href='http://userscripts.org/scripts/show/118293' target='_blank'>more info</a></p>"
   var updatemsg = function (v) {
      return "<div style='margin-top:20px ;background-color:#f80; border: 1px #f80 solid'><p>New version( " + v +" ) is available.<br><a href='http://userscripts.org/scripts/source/118293.user.js'>Click here for update</a></p></div>"
   }


   function getCookie(c_name){
      if (document.cookie.length>0){
         var c_list = document.cookie.split("\;");
         for ( i in c_list ){
            var cook = c_list[i].split("=");
            if ( cook[0].trim() == c_name ) { return unescape(cook[1]); }
         }  
     }
     return 0
   }
   function setCookie(c_name,value,expiredays){
      if (expiredays == null) {
         var exdate=new Date()
         exdate.setDate(exdate.getDate()+expiredays)
         document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString)
      } else {
         document.cookie=c_name+ "=" +escape(value)
      }
   }



    function checkUpdate(url) {

        http_request = false;
         try {
           if (window.XMLHttpRequest) { // Mozilla, Safari,... 
               http_request = new XMLHttpRequest();
               if (http_request.overrideMimeType) {
                   http_request.overrideMimeType('text/xml');
               }
           } else if (window.ActiveXObject) { // IE
               try {
                   http_request = new ActiveXObject("Msxml2.XMLHTTP");
               } catch (e) {
                   try {
                       http_request = new ActiveXObject("Microsoft.XMLHTTP");
                   } catch (e) {}
               }
           }
           if (!http_request) {
               return false;
           }
           http_request.onreadystatechange = getVersion;
           http_request.open('GET', url, true);
           http_request.send(null);
         }
         catch (err) {
            return false;
         }
    }

    function getVersion() {
         new_version = null;
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {
                var metadataBlock = http_request.responseText;
                //alert(metadataBlock)
                //var lines = metadataBlock.split(/\n/).filter(/\/\/ @/);
                var lines = metadataBlock.split(/\n/);
                //alert(typeof(lines))
                for ( i in lines) {
                   var arr=lines[i].match(/\/\/ @(\S+)\s*(.*)/);
                   if (arr && arr[1] == "version") {
                      //alert(arr[2])
                      if (arr[2] != version ) {
                           var txt = updatemsg(arr[2])
                           //var updbox = msgbox(txt )
                           //document.body.appendChild(updbox);
                           //updbox.style.display="block"
                           aboutmsg += txt
                           about.setHtml(aboutmsg)
                           about.style.display="block"
                      }
                     break;
                   }
                }
            }
        }

    }
   var favicon = null;
   function rmfavicon() {
     var links = document.getElementsByTagName("head")[0].getElementsByTagName("link");
     for (var i=0; i<links.length; i++) {
       var link = links[i];
       //if ( link.type=="image/x-icon" && link.rel=="shortcut icon") {
       if ( link.rel=="shortcut icon") {
         try{
            if ( favicon == null) {
               favicon = link;
            }
            document.getElementsByTagName("head")[0].removeChild(link);
            //alert("rmfavicon : " + favicon);
         } catch(e) {
            // do nothing
         }
         return;
       }
     }
   }
   function addfavicon() {
         rmfavicon();
         var link = document.createElement("link");
         link.type = "image/x-icon";
         link.rel = "shortcut icon";
         link.href = "data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA////AAdr7QDO2+sAbaXtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERERERABEQETREREREREMRRDMzMzMzRAFDQkREREQ0AUNCJERERDQBQzIjMzMzNAFDMiMzMzM0AUMyIiJDMzQBQzIiIiQzNBFDMiMzIjM0EUMyIzMiMzQRQzIiIiQzNBBDNCIiQzM0EUQzMzMzM0QANEREREREQwEQAAAAAAAAD//wAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAD//wAA";
         document.getElementsByTagName("head")[0].appendChild(link);
   }
   function restorefavicon() {
         //alert("restorefavicon:" + favicon.href + ";" + favicon.rel);
         if ( favicon != null) {
             rmfavicon();
            var link = document.createElement("link");
            favicon.type = "image/x-icon";
            link.rel = "shortcut icon";
            link.href = favicon.href;
            document.getElementsByTagName("head")[0].appendChild(favicon);
         }
   }



var onmouseover = function(div, fn) { try { div.onmouseover = fn } catch(err) { $(div).mouseover(fn);}}
var onmouseout = function(div, fn) { try { div.onmouseout = fn } catch(err) { $(div).mouseout(fn);}}
var onclick = function(div, fn) { try { div.onclick = fn } catch(err) { $(div).click(fn);}}

   if ( getCookie("checkUpdate") == 0) {
      checkUpdate( ckupdate_uri)
      setCookie("checkUpdate", 1, 2);
   }
     
var css = " .hideIfOffline a, a.uiMediaThumb, a.UIImageBlock_Image, a.uiPhotoThumb {border: #CCC 1px solid;}"
   + " .UIThumbPager_Thumbs img{visibility: visible;}" // 添加留言時，自動parse的url所產生的圖
   + " .uiUfi .ufiItem {background-color: #fff;}"
   + " img {visibility: hidden;}"
   + " a img {visibility:hidden;}  a:hover img {visibility:visible;}"
   + " a i {visibility:hidden;}  a:hover i {visibility:visible;}"
   //+ " a i.img {visibility:visible;}" // small icon
   + " img.spotlight, img.fbPhotoImage {visibility:visible;}" // photo on album
   //+ " #pageLogo {visibility:hidden !important;} "
   //+ " #pageLogo {display:none !important;} "
   + " #blueBar {background-color: #fff !important}"
   //+ " #headNav {background-color: #fff;}"
   + " #pageNav a {color: #ccc; font-weight: normal;}"
   + " #pageNav a:hover {background-color: #fff; text-decoration:underline;}"
   + " a {color: #ccc; font-weight: normal;}"
   + " .UIStandardFrame_SidebarAds {visibility:hidden;}"
   + " .fbJewel .jewelCount span {background-color: #fff; color: #f80; border-color: #f80 !important}"   
   + " .count {background-color: #fff; color: #f80 !important}" //counter in sidebar
   // about msgbox
   + " .peekmsg a {color: #3B3598; font-weight: normal;}"
   + " .peekmsg a img  {visibility: visible}"

var logo = _("pageLogo").firstChild;
   onmouseover(logo, function() {this.style.backgroundColor=""; this.innerHTML=""});
   onmouseout(logo , function() {if (isoff == 0) {this.style.backgroundColor="white"; this.innerHTML="PeekFB"}});
   
var isoff = getCookie("isoff"); // 0=on, 1=off 
var about = msgbox(aboutmsg);
document.body.appendChild(about);
pcp = peekControlPanel();
try { pcp.appendChild(hideButton("<", ["leftCol"], "flag_L"), "flag_L","Left Sidebar"); } catch(err){}
try { pcp.appendChild(hideButton("^", ["blueBarHolder"], "flag_U", "Navigation")); } catch(err){}
try { pcp.appendChild(hideButton(">", ["rightCol","pagelet_sidebar"], "flag_R", "Right Sidebar")); } catch(err){}

   function _(id){ return document.getElementById(id)}
   function peekControlPanel() {
      var newdiv = document.createElement('div');
      //newdiv.className = className;
      //newdiv.style.background = "#fff"
      newdiv.innerHTML = ""
      newdiv.style.height="22px"
      newdiv.style.width="22px"
      newdiv.style.textAlign="center"
      //newdiv.style.verticalAlign="middle"
      //newdiv.setAttribute("class", "fbJewel")
      //newdiv.style.position="relative"
      newdiv.style.position="fixed"
      newdiv.style.bottom = "1px";
      newdiv.style.left = "50%";
      //newdiv.style.cssFloat="left"
      newdiv.style.border="1px solid #bbb"
      newdiv.style.zIndex="100"
      //newdiv.style.borderBottom="1px solid #aaa"
       {
         var info = document.createElement('div');
         info.style.backgroundColor = "#f80"
         info.style.color = "#fff"
         info.innerHTML = "P"
         info.style.verticalAlign="bottom"
         info.style.width="16px"
         info.style.height="16px"
         info.style.textDecoration="underline"
         info.style.margin="2px"
         info.style.textAlign="center"
         info.style.cssFloat="left"
         info.style.border="1px solid #f80"
         info.style.visibility="visible"
         info.style.cursor="pointer"
         info.title = "About"
         onclick(info, function() {
            //about.setHtml( aboutmsg);
            //about.style.visibility = "visible"
            about.style.display = "block"
         });
         newdiv.appendChild(info)
      }
      {
         function switches(init) {
            // switch(on/off)  style 
            if (init == null) {
               isoff = (isoff == 0) ? 1 : 0 ;//alert(isoff + "  " + css)
            }
               setCookie("isoff", isoff)
            if (isoff == 0) {
               if (typeof GM_addStyle != "undefined") {
                  GM_addStyle(css);
               } else if (typeof PRO_addStyle != "undefined") {
                  PRO_addStyle(css);
               } else if (typeof addStyle != "undefined") {
                  addStyle(css);
               } else {

                  var heads = document.getElementsByTagName("head");
                  if (heads.length > 0) {
                     var node = document.createElement("style");
                     node.type = "text/css";
                     node.media="peekfb"
                     node.setAttribute('id', "peekfb");
                     node.appendChild(document.createTextNode(css));
                     heads[0].appendChild(node); 
                  }
               }
               logo.style.backgroundColor="white";
               logo.style.color="#F80";
               logo.innerHTML="PeekFB"
               logo.style.textDecoration="underline"
               stylesw.style.backgroundColor = "#fff"
               stylesw.style.color = "#3B5998"
               stylesw.title = "Show Style"
               addfavicon();
            } else {
               // off
               var heads = document.getElementsByTagName("head");
               var l = heads[0].childNodes
               var txt
               for (i=l.length-1; i>0 ; i--) {
               //try {alert( heads[0].lastChild.media  + "-" + heads[0].lastChild.id); }catch (err) {}
                  try { txt = l[i].childNodes[0].wholeText} catch(err) {txt=""}
                  if (txt == css ) {
                     //alert(i);
                     heads[0].removeChild( l[i]);
                     break;
                  }
               }
               logo.style.backgroundColor="";
               logo.innerHTML=""
               stylesw.style.backgroundColor = "#44f"
               stylesw.style.color = "#fff"
               stylesw.title = "Hide style"
               restorefavicon();
            }
         }


         var stylesw = document.createElement('div'); // style switch
         stylesw.innerHTML = "S"
         stylesw.style.verticalAlign="bottom"
         stylesw.style.textAlign="right"
         stylesw.style.width="16px"
         stylesw.style.height="16px"
         stylesw.style.margin="2px"
         stylesw.style.textAlign="center"
         stylesw.style.cssFloat="right"
         stylesw.style.border="1px solid #3B5998"
         stylesw.style.visibility="visible"
         stylesw.style.cursor="pointer"
         onclick(stylesw, function () { switches()});
         switches(true)
         
         newdiv.appendChild(stylesw)
      }
try {
      newdiv.onmouseover = function () {
         newdiv.style.backgroundColor = "#ddd";
         newdiv.style.width = ""
         info.style.border="1px solid #fff"
      }
      newdiv.onmouseout = function () {
         newdiv.style.backgroundColor = "";
         newdiv.style.width="22px"
         info.style.border="1px solid #f80"
      }
} catch(err) { //for firefox
      $(newdiv).mouseover(function () {
         newdiv.style.backgroundColor = "#ddd";
         newdiv.style.width = ""
         info.style.border="1px solid #fff"
      }).mouseout(function () {
         newdiv.style.backgroundColor = "";
         newdiv.style.width="22px"
         info.style.border="1px solid #f80"
      });
}
      document.body.appendChild(newdiv);
      return newdiv;
   }



   function hideButton(html, ctrlDivs, flag_name, title) {

      function switches(btm, ctrlDivs, flag_name, title, init) {
         var ctrlFlag = getCookie(flag_name); // 0:button up, 1:button down
         if (init == null) {
            ctrlFlag = (ctrlFlag ==0 ) ? 1 :0
         }
         if ( ctrlFlag == 0) {
            for (i in ctrlDivs) { try { _(ctrlDivs[i]).style.display="block";} catch (e) {} }
            btm.style.borderLeft = "1px solid #fff"
            btm.style.borderTop = "1px solid #fff"
            btm.style.borderRight = "1px solid #888"
            btm.style.borderBottom = "1px solid #aaa"
            btm.style.color = "#000"
            btm.title = "Hide " + title
         } else {
            for (i in ctrlDivs) { try { _(ctrlDivs[i]).style.display="none"; } catch (e) {} }
            btm.style.borderLeft = "1px solid #888"
            btm.style.borderTop = "1px solid #888"
            btm.style.borderRight = "1px solid #fff"
            btm.style.borderBottom = "1px solid #fff"
            btm.style.color = "#fff"
            btm.title = "show " + title
         }
         //   alert (flag_name + "=" + ctrlFlag)
         return ctrlFlag
      }
      var newdiv = document.createElement('div');
      newdiv.style.color = "#000"
      newdiv.style.backgroundColor = "#bbb";
      newdiv.innerHTML = html;
      newdiv.style.width="16px"
      newdiv.style.height="16px"
      newdiv.style.margin="2px"
      newdiv.style.textAlign="center"
      newdiv.style.cssFloat="left"
      switches(newdiv, ctrlDivs, flag_name, title, true);
      onclick(newdiv, function() {
         setCookie( flag_name, switches(newdiv ,ctrlDivs, flag_name, title));
      });

      newdiv.style.visibility="visible"
      newdiv.style.cursor="pointer"

      return newdiv
   }
   function msgbox(html, width, height) {
      var newdiv = document.createElement('div');
      newdiv.style.color = "#000"
      newdiv.style.backgroundColor = "#fff";
      //newdiv.innerHTML = html;
      //newdiv.style.height="150px"
      if ( width != null) { newdiv.style.width = width;  }
      if (height != null) { newdiv.style.height = height;}
      newdiv.style.margin="1px"
      newdiv.style.border="1px #f80 solid"
      newdiv.style.textAlign="center"
      newdiv.style.verticalAlign="middle"
      //newdiv.style.cssFloat="left"
      newdiv.style.position="fixed"
      newdiv.style.left = "50%";
      newdiv.style.bottom = "30px";
      var title = '<h1>Peek at Facebook</h1>';
      var adtitle = title 

      //var gad_test = "<scr" + "ipt>alert(1);</scr" + "ipt>"
         {
         var btClose = document.createElement('div');
         btClose.style.color = "#fff";
         btClose.style.backgroundColor="#f80"
         btClose.style.cssFloat="right";
         btClose.style.width="18px";
         btClose.style.height="18px";
         btClose.style.fontSize="16px";
         btClose.innerHTML="<b>X</b>";
         btClose.style.cursor="pointer"
         onclick(btClose, function() {
               newdiv.style.display="none"
         } );
         newdiv.appendChild(btClose);
      }
      {
         var ct = document.createElement('div');
         ct.className="peekmsg"
         ct.style.margin = "10px";
         ct.innerHTML =  title + html + ad_str

         newdiv.appendChild(ct);
      }
      newdiv.setHtml = function (html){
         ct.innerHTML = title + html+ ad_str

      }
      newdiv.style.display="none"

      return newdiv
      
   }



})();
