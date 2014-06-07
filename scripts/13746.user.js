// ==UserScript==
// @name           Zuhaib Auto Signature
// @namespace      http://www.orkut.com/Community.aspx?cmm=35287125
// @description    Auto signature ... Zuhaib...
// @include        http://www.orkut.com/Scrapbook.aspx*
// @include        http://www.orkut.com/CommMsgPost.aspx*
// @author       ... Zuhaib .... - http://www.orkut.com/Profile.aspx?uid=866782896269416874 
// ==/UserScript==



var signature="\n\n\n\n\n[b][blue][/blue]\n[maroon][/maroon][red] [/red][violet] [/violet]\n[:p][i][green][u][/u] ..... [:p][/green]\n[teal][u]Common Sense Is Not So Common[/u]  ......[/teal][/b][:o]\n";
 

//body of script......
var write=document.getElementsByTagName('textarea')[0].value;document.getElementsByTagName('textarea')[0].value=write+signature;
void(0);
