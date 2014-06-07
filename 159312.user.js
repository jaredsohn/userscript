// ==UserScript==
// @name           HF Infamous Username Styles
// @author         Coffee
// @namespace      Makes anfamous members usernames red
// @include http://hackforums.net/* 
// @include http://www.hackforums.net/* 
// ==/UserScript==
             
              




var html = document.body.innerHTML;
html = html.replace( /BagHead/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Baghead</b></font></span>' );   
html = html.replace( /iNuke/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>iNuke</b></font></span>' );  
html = html.replace( /McFlurry/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>McFlurry</b></font></span>' );  
html = html.replace( /Morchid/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Morchid</b></font></span>' );  
html = html.replace( /Nathaniel/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Nathaniel</b></font></span>' );  
html = html.replace( /Renowned/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Renowned</b></font></span>' );  
html = html.replace( /ShadowCloud/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>ShadowCloud</b></font></span>' );  
html = html.replace( /Coffee/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Coffee</b></font></span>' );         
html = html.replace( /Apple J4ck./g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Apple J4ck</b></font></span>' );  
html = html.replace( /Mr. Snow/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Mr. Snow</b></font></span>' );  
html = html.replace( /Dr. Whitehat/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Dr. Whitehat</b></font></span>' );  
html = html.replace( /Snow/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Snow</b></font></span>' );  
html = html.replace( /Soulmate/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Soulmate</b></font></span>' );  
html = html.replace( /TheVortex/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>TheVortex</b></font></span>' );  
html = html.replace( /ven0m/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>ven0m</b></font></span>' );  
html = html.replace( /Qwazz/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Qwazz</b></font></span>' );  
html = html.replace( /Auron/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Auron</b></font></span>' );  
html = html.replace( /Retribute/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Retribute</b></font></span>' );  
html = html.replace( /Premortal/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Premortal</b></font></span>' );  
html = html.replace( /D3xus/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>D3xus</b></font></span>' );  
html = html.replace( /- Sam -/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>- Sam -</b></font></span>' );  
html = html.replace( /Pali/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Pali</b></font></span>' );  
html = html.replace( /Daisy/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Daisy</b></font></span>' );  
html = html.replace( /malichi/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>malichi</b></font></span>' );  
html = html.replace( /Twinkles/g, '<span style="text-shadow: 1px 2px 5px #000000"><font color="#FF4500"><b>Twinkles</b></font></span>' );  
document.body.innerHTML = html;