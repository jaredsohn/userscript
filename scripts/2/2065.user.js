// Greasemonkey for Firefox: http://greasemonkey.mozdev.org/
// TO INSTALL: Click on 'Tools' menu and select 'Install This User Script'
///////////////////////////////////////////////////////////////////////////////
// MapQuest.com: Jump to Print Directions    Version 1.0                     //
// Copyright 2005 Matt Wright                http://www.scriptarchive.com/   //
// Created On: 2005-11-02                    Last Modified: 2005-11-02       //
///////////////////////////////////////////////////////////////////////////////
// This script relies on the layout and format of MapQuest.com as of last    //
// modified date. Should you experience any problems, disable this script    //
// in greasemonkey and look for a newer version.                             //
///////////////////////////////////////////////////////////////////////////////
// COPYRIGHT NOTICE                                                          //
// Copyright 2005 Matthew M. Wright  All Rights Reserved.                    //
//                                                                           //
// Redistribution and use, with or without modification, are permitted       //
// provided that the following conditions are met:                           //
//                                                                           //
//   * Redistribution must retain the above copyright notice, this list of   //
//     conditions and the following disclaimer.                              //
//   * Neither the name Matt Wright or Matt's Script Archive may be used to  //
//     endorse or promote products derived from this software without        //
//     specific prior written permission.                                    //
//                                                                           //
// This software is provided "as is" and any express or implied warranties,  //
// including, but not limited to, the implied warranties of merchantability  //
// and fitness for a particular purpose are disclaimed. In no event shall    //
// Matt's Script Archive, Inc. or contributors be liable for any direct,     //
// indirect, incidental, special, exemplary or consequential damages         //
// (including, but not limited to, procurement of substitute goods or        //
// services; loss of use, data or profits; or business interruption) however //
// caused and on any theory of liability, whether in contract, strict        //
// liability, or tort (include negligence or otherwise) arising in any way   //
// out of the use of this software, even if advised of the possibility of    //
// such damage.                                                              //
///////////////////////////////////////////////////////////////////////////////

// ==UserScript==
// @name          MapQuest.com: Jump to Print Directions
// @namespace     http://www.scriptarchive.com/
// @description	  Point driving direction form directly to print-friendly page
// @include       http://www.mapquest.com/*
// ==/UserScript==

(function() {
	var formNode = document.getElementById('ddform');

	if (formNode) {
		for (i=0; i<formNode.elements.length; i++) {
			if (formNode.elements[i].name == 'do') {
				formNode.elements[i].value = 'prt';
			}
		}
	}

})();
