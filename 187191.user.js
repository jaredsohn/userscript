// ==UserScript==
// @name        CleanTube
// @description Tired of YouTube's cluttered interface? Just want to focus on the video? CleanTube removes the comments section, suggested videos side-bar, and left-hand "Guide" sidebar. It can be customised easily to only remove specific bits—see information in the source file.
// @namespace   RainCity471/GM/CleanTube
// @include     http://www.youtube.com/watch?*v=*
// @include     https://www.youtube.com/watch?*v=*
// @version     1
// @grant       none
// ==/UserScript==
/* 
 * ===============================================
 * ========== CUSTOMISING CLEANTUBE ==============
 * CleanTube can be customised to change which bits of the interface are removed.
 * To remove a specific element, add "//" (without the quotes) to the start of the line below its title. This will comment out the line. For instance, to remove the comments section, add "//" before the line starting with "cmts.parentNode..."
*/
// get elements
var vdsSdbr = document.getElementById('watch7-sidebar-contents');
var cmts = document.getElementById('watch-discussion');
var gde = document.getElementById('guide');
// delete elements
//
// Add "//" to the start of a line to stop the element being deleted.
// ---- suggested videos sidebar -------
vdsSdbr.parentNode.removeChild(vdsSdbr);
// -------------------------------------

// ------ comments ---------------------
cmts.parentNode.removeChild(cmts);
// -------------------------------------

// ------ guide ------------------------
gde.parentNode.removeChild(gde);
// -------------------------------------