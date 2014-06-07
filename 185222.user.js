// ==UserScript==
// @name TheGuyWhoMadeWhiteImgurTheme
// @description turns imgur almost white, but really more like bright gray
// ==/UserScript==
@namespace url(http://www.w3.org/1999/xhtml);
@-moz-document domain(imgur.com) {

/* bg brightest  #f0f0f0
   bg bright     #d0d0d0
   text dark        #555
 */


/* background */
html, .textbox, body, .arrows, .inline, .social, .prev, .next, .search,
#caption_textarea, #fixed-side-footer-links
{ background: #f0f0f0 !important; }

.panel, .post
{ background: #d0d0d0 !important;
  color: #555 !important; }

/* sidebar with other posts */
.nav-image 
{ background-color: #fff !important; }

.selection
{ background: #f0f0f0 !important; }

.image-title
{ color: #555 !important; }

.pane
{ background: #f0f0f0 !important; }


/* comments */
.author, .account-user-name
{ color: #888 !important; } /* apparently only timestamp */

.author span
{ color: #860 !important; } /* comment points */

img
{ background-color:    #d0d0d0 !important;
  border-top-color:    #f0f0f0 !important;
  border-left-color:   #f0f0f0 !important; 
  border-right-color:  #f0f0f0 !important; 
  border-bottom-color: #f0f0f0 !important;  }

span, .textbox
{ color: #555 !important; }

/*#topbar { display:none !important; }*/ /* uncomment to hide topbar (for unregistered users) */

/* green texts */
.selection
{ color: #6aac00 !important; }

h2
{ color: #555 !important; text-shadow: none !important; }

/* sort buttons */
.title-n
{ border-left-style: none !important; }

#image-title
{ color: #555 !important; text-shadow: none !important; }

.button-medium, .submit-caption-button, #navPrev, #navNext, #navBrowse
{ background: #f0f0f0 !important;  color: #555 !important; }