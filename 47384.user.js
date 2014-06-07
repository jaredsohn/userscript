// ==UserScript==
// @name          Google Apps (Mail) Blue Favicon
// @description   Blue favicon for the Google Apps-based e-mail service
// @version       1.0.0-EN (2009042400)
// @copyright     2009, Andris (http://www.andris.name/)
// @author        Andris
// @contributor   !user (http://userscripts.org/users/54353)
// @include       http://mail.domain.tld*
// @include       http://mail.google.com/a/domain.tld/*
// @include       http://www.google.com/a/domain.tld/*
// @include       https://mail.google.com/a/domain.tld/*
// @include       https://www.google.com/a/domain.tld/*
// ==/UserScript==

//
// This script forces a custom favicon for the Google-based e-mail service for
// your domain.
//
// The current custom favicon looks like the blue envelope. It is based on the
// original GMail red envelope in which the R(ed) and B(lue) components have
// been swapped. You can use any custom icon for your own domain - all you need
// is to encode it to Base64 using any suitable tool including the excellent
// online service Base64 Online -
// http://www.motobit.com/util/base64-decoder-encoder.asp .
//
// Do not forget to edit the @include properties above to match your domain.
//
// This script is just a modification of the !user's "Google's Old Favicon"
// published at http://userscripts.org/scripts/show/27548 . Thanks !user for
// the idea!
//
// Andris - andris@aernet.ru - http://www.andris.name/
//

var head = document.getElementsByTagName('head')[0];
var icon = document.createElement('link');

icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');

icon.setAttribute('href', 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANo4OP/aODj/+aen//mnp//5p6f/+aen//mnp//5p6f/+aen//mnp//5p6f/+aen//mnp//5p6f/2jg4/9o4OP/aODj/2jg4///i4v///////////////////////////////////////////////////////+Li/9o4OP/aODj/2jg4/9o4OP/5p6f//+Li/////////////////////////////////////////////+Li//mnp//aODj/2jg4/9o4OP/aODj//+Li//mnp///4uL////////////ygYH/8oGB/////////////+Li//mnp///4uL/2jg4/9o4OP/aODj/2jg4////////4uL/+aen//+2tv/ygYH/6Vpa/+laWv/ygYH//7a2//mnp///4uL//////9o4OP/aODj/2jg4/9o4OP////////////+2tv/ygYH/6Vpa/9o4OP/aODj/6Vpa//KBgf//trb////////////aODj/2jg4/9o4OP/aODj////////////ygYH/6Vpa/9o4OP//trb//7a2/9o4OP/pWlr/8oGB////////////2jg4/9o4OP/aODj/2jg4///////ygYH/6Vpa/9o4OP//trb/////////////trb/2jg4/+laWv/ygYH//////9o4OP/aODj/2jg4/9o4OP/ygYH/6Vpa/9o4OP//trb///////////////////////+2tv/aODj/6Vpa//KBgf/aODj/2jg4/9o4OP/aODj/2jg4/9o4OP//trb//////////////////////////////////7a2/9o4OP/aODj/2jg4/9o4OP/aODj/2jg4/9o4OP/ygYH/+aen//mnp//5p6f/+aen//mnp//5p6f/+aen//mnp//ygYH/2jg4/9o4OP/aODj/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//+sQf//rEEAAKxBAACsQQAArEEAAKxBAACsQQAArEEAAKxBAACsQQAArEEAAKxBAACsQf//rEH//6xB//+sQQ==');

head.appendChild(icon);
