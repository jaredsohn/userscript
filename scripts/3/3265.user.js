// ==UserScript==
// @namespace     http://profiles.yahoo.com/dog_surfer
// @name          Titan jump to grid
// @description   Jump from splash to TV listing grid
// @include       http://ww*.titantv.com/commandcenter*
// ==/UserScript==

// After Titan logon is complete (manually or using AutoLogonJ),
// Jump from 
// 	ww1.titantv.com/commandcenter/index.aspx to 
// 	ww1.titantv.com/ttv/Grid/grid.aspx
// or jump from
// 	ww2.titantv.com/commandcenter/index.aspx to
// 	ww2.titantv.com/ttv/Grid/grid.aspx

(function() {

window.location.href = "http://"+(window.location.host)+"/ttv/Grid/grid.aspx";

})();