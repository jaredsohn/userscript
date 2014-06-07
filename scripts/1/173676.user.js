// ==UserScript==
// @name           energysaving.css
// @description    oneleaf css
// @version        1.0
// @match          http://www.nael-lilik.com
// ==/UserScript==
 
div#energysaving, div#energysaving * {  -moz-border-radius: 0;  -webkit-border-radius: 0;  border: 0;  background-color: #000000; } div#energysaving {  margin: 0;  padding: 0;  position: absolute;  left: 50%;  top: 50%;  opacity: 0;  -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";  filter: alpha(opacity=0);  text-align: center;  z-index: 100; } @media screen { body>div#energysaving { position: fixed; } } div#energysaving p {  margin: 0;  padding: 0;  width: 100%;  font-size: 18px;  font-family: arial;  color: #333333;  position: relative;  top: 40%;  line-height: 20px;  font-weight: bold;  text-align: center;  text-shadow: none; } div#energysaving p span {  color: #555555;  font-size: 12px;  font-weight: normal; } div#energysaving div#copyrightOnlineLeaf {  padding: 0;  margin: 0;  color: #333333;  font-size: 12px;  font-weight: normal;  position: absolute;  bottom: 20px;  text-align: center;  width: 100%;  height: 20px;  left: 0%; }