// ==UserScript==
// @name           Change ctrl+o Paths to Localhost
// @namespace      http://userscripts.org/users/70005
// @description    This script checks to see if you're viewing a page in your "localhost" directory without using "localhost" in the URL (similar to if you used file > open or ctrl+o to open the file instead of typing the address). If it determines that you are, it will replace the file path with "localhost". Script is easily customizable for any directory structure.
// @include        *
// ==/UserScript==
var phpPath='file:///C:/xampp/htdocs/' //the path to your PHP files
var phpPathReplace='http://localhost/' //the path your browser requires to run the files as PHP
var place=window.location.href;
		if (place.indexOf(phpPath)!=-1){
			location.href=place.replace(phpPath, phpPathReplace);
			}