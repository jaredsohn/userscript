// ==UserScript==
// @name                LaBrute (Muxxu) Manager
// @namespace 		none
// @version 		0.1
// @description 	register for tournaments and fight opponents in training
// @copyright 		Waitlin, supergaijin
// @include 		http*://labrute.muxxu.com/*
// All credits & main code & copyright go to Waitlin & myself for our work, but mostly to Wailtin for his expertise :p
// ==/UserScript==


// Here is a link, but you can style it like a button using CSS.
var $ui = document.createElement("a");

/* href attribute isn't really required since the <a<'s been
    dynamically generated, but let's keep on being standard. You can't
    put an empty href, but we want it not to change the page, so we put
    "#". Anyway, our "click" listener will abort the default behavior. */
$ui.setAttribute("href", "#");

// nothing to say here :P
$ui.textContent = "Click to open options";

/* Here, our listener. When triggered, it receives one argument, whose
   type is Event. In this case, it also has the type MouseEvent. */
$ui.addEventListener("click", function( event ){
    
});

/* Styling! It can be done with GM_addStyle. I don't know if one method
   is better than another, but GM_addStyle is convenient, because it
    adds new <style> tags in the <head> for you. Besides,
    this syntax is perhaps more readable... It's just a matter of
    preference :) All you need is to add an ID onto your element. To
    avoid collisions with existing IDs, I use to prefix my ones with the
    script's namespace. You didn't put a namespace, but let's assume it's
    "supergaijin" :P */
$ui.id = "supergaijin-ui";
GM_addStyle("#supergaijin-ui {\
    position: fixed;\
    bottom: 0;\
    left: 89%;\
    color: #3d3;\
    background: #333;\
    border: 4px solid #ccc;\
    -moz-border-radius: 8px;\
    padding: 2px 8px 2px 8px;\
}");

document.body.appendChild($ui);

/* Labrute's submit() method simply acts like when the user clicks on
   the "submit" button, whatever the field values. Here, I guess we'll
    have to type in the username and the password. */
    
/*entering the username & password will be handled by the ui.  it should
   enter them in the following locations, posted here for easy reference:
   
<form id="logger" class="form" method="POST" action="/user/login">

  <label>Email ou Identifiant</label>
  <input class ="field" name="login">

  <label>Mot de passe</label>
  <input class ="field" name="pass"> */
