// ==UserScript==
// @name          TO1 Edit Page V2
// @namespace     http://userscripts.org/people/17268
// @description	  TO1 Edit Page V2
// @include       http://profileedit.myspace.com/index.cfm?fuseaction=profile.interests*
// @include	  http://profileedit.myspace.com/Modules/ProfileEdit/Pages/Interests.aspx*
// ==/UserScript==

	s= 'input[id*="headline"] {position:relative; margin-left:130px;}\n';
	s+= 'textarea {height:300px; position:relative; margin-left:130px;}\n';
	s+= 'div.row {display:block; width:100px;}\n';
	s+= 'label {color:blue; font-size:2em; display:block; margin-left:100px; text-align:left !important;}\n';
	s+= 'div div div div div div.left, input[id*="preview"] {display:none;}\n';
	s+= 'input[id*="previewTop"], input[id*="previewBottom"] {display:inline;}\n';

GM_addStyle(s);