// ==UserScript==
// @name        Campfire Avatars
// @namespace   http://*campfirenow.com
// @description Inserts avatars of your homies
// @author      Lukasz Korecki
// @include     *.campfirenow.com/room*
// @require     http://ajax.googleapis.com/ajax/libs/prototype/1.6.1.0/prototype.js
// ==/UserScript==

   function add_avatars() {
     $$('.author').each(
       function(elem) {
         if( ! elem.hasClassName("processed")) {
           var login = elem.innerHTML.replace(" ","").replace(".","").toLowerCase();
           if(avatars[login] != undefined) {
             elem.insert(avatar_elem(avatars[login]));
           } else {
             elem.insert(avatar_elem("http://retroavatar.appspot.com/api?alpha=true&name="+login));
           }
           elem.addClassName("processed");
         }

       });
   }

   // avatars list
   // created using login = campfire_login.replace(" ","").replace(".", "");
   // Campfire Name -> Testy Testington
   // Transcript Name -> Testy T.
   // Userscript Name -> testt
   var avatars = {
     "testt" : "http://example.com/avatar.jpg" // Testy T.
   };

   function avatar_elem(url) {
     return {
       "before" : new Element("div").update(new Element("img", {"src" : url, "height" : "32px" } ))
     };
   }
function load_libs() {
var proto_url = "http://prototypejs.org/javascripts/prototype.js";
var script = document.createElement('script');
    script.src = proto_url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

// GO! GO! GO!
load_libs();
add_avatars();

   Campfire.Transcript.prototype.insertMessages_original_2 = Campfire.Transcript.prototype.insertMessages;

   Campfire.Transcript.prototype.insertMessages = function() {
	   messages = this.insertMessages_original_2.apply(this, arguments);
	   add_avatars();
	   return messages;
   };
