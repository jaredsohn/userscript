// ==UserScript==
// @name           Craigslist Email To Me
// @description    Adds a "email to Me" link with email address hardcoded before "email this posting to friend"
// @namespace      http://chadnorwood.com/
// @author         Chad Norwood
// @date           2008-10-06
// @include        http://*.craigslist.org/*
// ==/UserScript==
//
//  Copyright (C) 2008 Chad Norwood
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.
//


// EDIT HERE - replace with your email 
//
email_receiver = "code@chadnorwood.com";


// emails you receive will be from this address,
// you can change as long as its a valid email address
email_sender   = "craigslist_email_to_me%40yahoo.com";
email_to_me = "email to ME";

// escape() does not convert everything
// convert "@" => "%40", "+" => "%2B"
function url_encode_email(email) {
  enc = email.replace(/\@/g, "%40");
  enc = enc.replace(/\+/g, "%2B");
  return enc;
}

function main() {
  a_ef = document.getElementById( 'ef' ); // "Email This Posting To A Friend"
  ef_href = a_ef.getAttribute("href"); // href="/email.friend?postingID=867859440"

  if ("/email.friend" != ef_href.substring(0,13)) {
    //alert("Chad abort");
    return;
  }

  // create new element
  a_me = document.createElement( 'a' );
  a_me.id = 'ef_me';
  a_me.href = ef_href + "&action=send_email&type=&email=" + email_sender + "&rcptAddress=";
  a_me.href += url_encode_email(email_receiver);
  a_me.title = "email " + email_receiver;
  a_me.innerHTML = email_to_me;

  // This part is tricky - "email this posting to a friend" (a_ef) does a "float right" 
  // To avoid messing with CSS styles, we will replace a_ef with a div having same id,
  // put our new "email to ME" and a copy of a_ef inside of it,
  // so the whole thing floats right together

  // not sure if this is the best way to separate the two links
  space = document.createElement("nobr");
  space.innerHTML = " - ";

  div_ef = document.createElement("div");
  div_ef.id = 'ef';

  a_ef2 = a_ef.cloneNode(true);
  a_ef2.id = 'a_ef';

  a_ef_parent = a_ef.parentNode;
  a_ef_parent.replaceChild( div_ef, a_ef);

  div_ef.appendChild(a_ef2);
  div_ef.insertBefore( space, a_ef2);
  div_ef.insertBefore( a_me, space);

    // alert("Chad done!");
}

main();
