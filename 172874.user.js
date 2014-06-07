// ==UserScript==
// @name          Wowhead Colorblind Mode
// @namespace     http://www.wowhead.com/user=Nulgar
// @description   Attempt to create a Colorblind Mode of Wowhead
// @include       http://*.wowhead.com/*
// @grant         none
// @version       0.2
// ==/UserScript==

// Change (shorten) the colorblind descriptions here. Simple text, no markup possible.
// Don't edit outside the quotes!
var qualities = {};
qualities[0] = " (Poor)";
qualities[1] = " (Common)";
qualities[2] = " (Uncommon)";
qualities[3] = " (Rare)";
qualities[4] = " (Epic)";
qualities[5] = " (Legendary)";
qualities[6] = " (Artifact)";
qualities[7] = " (Heirloom)";

// Hearthstone cards
var qualities_cards = {};
qualities_cards[0] = " (Free Card)";
qualities_cards[1] = " (Common Card)";
qualities_cards[2] = " (Uncommon Card)"; // these don't exist
qualities_cards[3] = " (Rare Card)";
qualities_cards[4] = " (Epic Card)";
qualities_cards[5] = " (Legendary Card)";
qualities_cards[6] = " (Artifact Card)"; // these don't exist
qualities_cards[7] = " (Heirloom Card)"; // these don't exist

var color = "rgb(204, 204, 204)";

// DO NOT EDIT BELOW THIS LINE

var css = document.createElement('style');
css.type = 'text/css';

var content = ""

// 3rd
content = "";
for(var i=0;i<=7;i++) {
 content += (
  "a[href*='/item='].q§:after, a[href*='/itemset='].q§:after, a[href*='/transmog-set='].q§:after,"+  // items and sets
  "span.q§ > a[href*='/item=']:after, div.q§ > a[href*='/item=']:after, "+ // special links for items
  "div.name > a[href*='/npc='].q§:after, "+ // battle pets
  "span.q§ > a:not(.q§)[href*='/spell=']:after, div:not(.small) > a[href*='/spell='].q§:after, "+ // colored crafting links, bit of filtering so we don't include Use/Equip effects
  "b.q§:after"+ // item name on detail pages and in tooltips
  " { content:'"+qualities[i]+"'; }\n"+
  "a[href*='/hearthstone/card='].q§:after { content:'"+qualities_cards[i]+"' }\n"+ // Hearthstone cards!
//  "a.q§:hover:after, span.q§ > a:hover:after, b.q§:hover:after { display:none; }"+ // proof-of-concept removal of added text on mouseover, looks awful though
  "").replace(/§/g,i);
}
content +=
   // exclusions
   "th > b:after { color:red;display:none }\n"+ // quest level and other grey notes in tooltips
//            "div.small > a.q1:after { content:'';display:none; }\n"+ // certain spell links

   // user links
   "a.comment-blue:after { content:' (A)' }\n"+ // Wowhead admins
   "a.comment-green:after { content:' (M)' }\n"+ // Wowhead moderators
   "a.comment-gold:after { content:' (VIP)' }\n"+ // Wowhead VIPs (e.g. former staff)

   // forum posts
   "div.comment-blue[class*=forums-post-body]:before { content:'Admin post'; }\n"+
   "div.comment-green[class*=forums-post-body]:before { content:'Mod post'; }\n"+
   "div.comment-gold[class*=forums-post-body]:before { content:'VIP post'; }\n"+
   // general

   // forum post edits (="commentary" to moderated posts/threads), database comments
   "div.comment-blue[class*=quote]:before, div.comment-blue[class*=comment-body]:before { content:'Admin comment'; }\n"+
   "div.comment-green[class*=quote]:before { content:'Mod comment'; }\n"+ // can't properly identify mod comments, as normal comments with a rating >10 have the same markup
   "div.comment-gold[class*=quote]:before, div.comment-gold[class*=comment-body]:before { content:'VIP comment'; }\n"+ // non-existent right now

   // database comment replies
   "td.comment-blue[class*=reply-text] > p.comment-reply-author:before { content:'Admin reply'; }\n"+
   "td.comment-green[class*=reply-text] > p.comment-reply-author:before { content:'Mod reply'; }\n"+ // normal users' replies with a rating >10, on the other hand, aren't green (for now)
   "td.comment-gold[class*=reply-text] > p.comment-reply-author:before { content:'VIP reply'; }\n"+

   // general staff markup
   "div.comment-blue:before, div.comment-green:before, div.comment-gold:before, td[class*=reply-text] > p.comment-reply-author:before, div[class*=comment-body] > span.q3:before"+
   " { border:50px ridge rgba(255,255,255,0.5);border-width:0px 1px 1px 0px;border-radius:5px;"+
      "font-size:75%;background-color:rgba(255,255,255,0.1);fdloat:left;padding:1pt 4pt 1pt 4pt;margin-right:4pt; }\n"+
   // forum posts
//   "div[class*=forums-post-body]:before"+
//   " { margin-right:4pt;margin-left:-5pt;position:relative; }\n"+
   // edits
   "div[class*=quote]:before { float:right;margin-right:-15px;margin-top:-15px;line-height:150%;border-width:0px 0px 1px 1px; }\n"+
   // comments, replies - no difference from general atm
//   "div[class*=comment-body]:before, td[class*=reply-text] > p.comment-reply-author:before, div[class*=comment-body] > span.q3:before"+
//   " { float:none;border-width:0px 1px 1px 0px;border-radius:5px 5px 5px 5px; }\n"+
   "td[class*=reply-text] > p.comment-reply-author:before { font-size:100%; }"+

   // Blizz Rep comments - only the comments are identifiable, in other places it appears as a "simple" VIP
   "div[class*=comment-body] > span.q3:before { content:'Blizzard Representative'; padding-left:4pt }"+ // Araxom! Or whichever Blizzard representative will have that ungrateful position after him
   // placed here since I would have to overwrite the padding from the previous lines anyway

   ":after, :before { "+  // as far as I can see, Wowhead doesn't use the :after (or :before) pseudo class, so this generic use is safe
   "color:"+color+";"+ // to ensure the text has a good contrast to Wowhead's dark background, omit it to keep the quality color.
//   "font-style:italic;"+ // remove the _first_ two backslashes in this line to make the text cursive
   "}";

css.appendChild(document.createTextNode(
 content
 ));

document.getElementsByTagName("head")[0].appendChild(css);
//alert(css.innerHTML);