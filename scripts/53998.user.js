// ==UserScript==
// @name           odysNonScript
// @namespace      http://odys
// @description    does nothing
// @include        http://www.anonib.com/*
// ==/UserScript==


// Find all <img>
foreach($dom->find('img') as $element)
{
	$element.width = "5000"
}