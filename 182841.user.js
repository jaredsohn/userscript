// ==UserScript==
// @name          Fallen Sword: add shortcuts to attack buttons
// @namespace     fallensword titans
// @description   Adds keyboard shortcuts to attack buttons that not already have it.
// @include       http://www.fallensword.com/index.php?cmd=world
// @version       1.2
// @grant         none
// @downloadURL   https://userscripts.org/scripts/source/182841.user.js
// @updateURL     https://userscripts.org/scripts/source/182841.meta.js
// @icon          https://s3.amazonaws.com/uso_ss/icon/182841/large.png
// ==/UserScript==

// compatibility for Chrome
if (!Array.forEach) {
   Array.forEach = function( context, callback ){
      Array.prototype.forEach.call(context, callback);
   };
}

/* We're using the MutationObserver in a common way: register it to a
   target (here #actionList) and observe the addition of direct children
   (here <li> elements). The links we want to modify are indirect
   descendants of these <li>. */
var observer = new MutationObserver(function( mutations ){
   mutations.forEach(function( mutation ){
      // we only want added nodes (the <li> elements).
      if (!mutation.addedNodes) return;

      // iterate over each added <li>
      Array.forEach(mutation.addedNodes, function( $li ){
         // we only want to attack creatures
         if (!$li.classList.contains("creature")) return;
         var creatureName = $li.textContent;
         
         // quickly select the attack link
         var $attackLink = $li.querySelector("a.verb.attack");

         // for some items, there is no attack link, so do nothing.
         if (!$attackLink) return;

         // check if the attack link already has a shortcut
         if (/\battack-\d\b/i.test($attackLink.className)) {
            console.debug(creatureName +
               ": no need to add a shortcut class.");
            return;
         }

         // finally add the shortcut
         console.debug(creatureName + ": shortcut class added!");
         $attackLink.classList.add("attack-1");

      });
   });
});

observer.observe(
   // observe mutations on the list
   document.querySelector('#actionList'),
   // observe only children addition or removal
   { childList: true }
);
