// ==UserScript==
// @name                        Base Mok
// @namespace                   Lord Script
// @description                 Based on Ika-core.
// @author                      Lord1982
// ==/UserScript==

// Ika-core, a collection of modules(sripts) to beutify and assist web page interaction.
//    Copyright (C) 2008 GBozouris
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
//
//    You are not allowed to offer this programm for download or redistribute it 
//    in any way except directions stated at the www.ika-core.org website.
//    This programm is offered for download only at www.ika-core.org.
//     If you downloaded this programm from another location please report it 
//     at the www.ika-core.org website.
//     This programm maybe downloaded automatically by You but only form the location 
//     mentioned above.
//     The code remains as is, no alteration or modification should be done without the 
//     written permission of the auhtor.
//     This script is not permited to be incorporated into any of your program/s or 
//     any proprietary programs.
//     This script will comunicate with www.ika-core.org to check for upgrades,
//     or for any other means. Any damage by usage of bandwidth by this programm
//     is considered your expense and fault and not the auhtors.
//     In other means , you know what you are doing.
//     Any damage inflicted in general to others (Companies, individuals etc) by use of 
//     this code is your responsibility. 
var b1=new Date();
bench=node('div','benchid','noclass','position:absolute;top:2px;left:2px;color:black;font-size:9px','0' );
document.getElementById('GF_toolbar').appendChild(bench);	

var queryserver=getserverindex();
var serverindex=queryserver[1];
var world = /([0-9]+)/.exec(location.host);
	world = RegExp.$1;
var country=queryserver[0];
var alliancefullnm;var alliancenm;var alliance;var chaturl;var forumurl;var forumurlnew;var Alliance;var Allies;var NoAlliance;var Enemies;var corsairmenu;var legend;var TreatyYes;var TreatyNo;var updatenotification;var txtplswait;var txtmap;var txtrefresh;var txtcoorddata;var txtmapdata;var txtmapdata2;var txtpagedata;var txtinfodata;var txtsorting;var txtchkplayer;var scheduler=[[0,0]];var bubbles=0;var timelapse=0;
var getbody=document.getElementsByTagName('body')[0];
var core_vers=51;
var ika="http://www.ika-core.org/search";

Alliance	=	GM_getValue("AllianceColor","#0000FF");
Allies		=	GM_getValue("AlliesColor","cyan");
NoAlliance	=	GM_getValue("NoAllianceColor","purple");
Enemies		=	GM_getValue("EnemiesColor","red");

//IMAGES
var bulbinimg='data:image/gif;base64,R0lGODlhDgAVAPcAAAAAAP///1BPVV5dZF9eZmVkbF5eZlxcZF5fZ11eZlxdZXx9g1lbY19haXByeXJ0e0tOVk9SWlNWXl1gaFteZl9ial5haWVocGRnb2JlbW5xeWxvd2tudlZaYlhcZFtfZ2hsdG1xeXl9haGlrV9jarG1vExRWVRZYVpfZ15ja11ialtgaGFmbmBlbV9kbGJnb2ludmhtdWdsdG5ze2xxeXJ3f3F2fnB1fXh9hXd8hHZ7g3V6gnR5gXN4gHyBiXuAiHl+hoOIkIGGjoCFjYqPl4iNlYeMlIaLk4WKkoSJkZGWnpCVnY+UnI6Tm42SmoyRmYuQmJidpZabo5SZoZOYoJ2iqpugqKOosLC1va2yuqyxuZeZmTY2Nf/+3P/82Pbz1e7py/XuzLizm8rFq8G8o7u2np6Zg7OtlcK8o5mXj5yWgbavl6agiqCahaujiqafiaGYfpyTe7uymZqTfqSejn93ZIiAbYiBb4+Jeqqfh5CHc6OZg6ieiL2ymomAbqKYhKiein99eyQkJP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIMALAAAAAAOABUAAAj4AAcJHJRjB48ZMVgMXChESJAhOWrEaLFwUBIiTZ4QSVKlhA8VA4c4abKECZQiU7BoQYKCYBInSqhEYULkSJIsVlAc0BGkyY0oUqhAOfKDBpIRK2wIITKjRo8bMGS46IDjyocZQI4YoQHFyUMeJ1ioQBGDB5AgSWA8FMGAgwsUKF7QsKHjB4sFOzRIYEFiRcsCMDY88OAgBIgIDQwkGGjhBYYLETIImFBBQUUKCFKYUAFhAIGKAsVsoZMmEJ4zoAe9AfSli5w/alKjsZMHTh0/a1Kz2RPGSx8+c1KT0eMmzp02ZVKbGQOm+RgzqQdxmS5IUHSBALJXDAgAOw=='; 
var heartimg='data:image/gif;base64,R0lGODlhDwAPANUvAL0vAOo7AP9CAcUxANE0APM9AN84APU9ANg2ANw3AMgyALIsAPo/AcAwAP9GAf9DALAsAP9FAbwvAN03ALguAMIwAMMxAOU5AP9DAfY+AOA4APw/AOE4AP9FAMcyAKAoALcuAKQpAKsrALMtALsVFbQUFK4rAK8sAP9HAP9IAQEBAaEoAM40AMwzAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJGQAvACwAAAAADwAPAAAGgsCXcEgsCl3IItI1dIEsLOaRZQExXaMGaxK4BiasxghJUSACDIFKwAggFBSkpGUoCCKOiKBgaEmQACwcGRgOKQ4YGRwsAFd0dnh6fC1SLmZoAhhsbgpSLy5bAQUZBV9RRC5QCAYcBghUnkcNCi0sLQoNsU0UEgAScUZNJicmukZLRkEAIfkEBRkALwAsAAAAAA8ADwAABmvAl3BILBqPRJeyqHQNXSFSxSl0VUghqqsEIFycrgsBUNJCBonDw/U4JAYQ7cKj2XRQnY3Gs6C+XGhqHW1vfn9dFwcbB2IAhn8VBAkaCQRTRi4LAAMeAwB9Ry4iEAsQIo9JHysfqExLSLBDQQA7';
var smackimg='data:image/gif;base64,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';
var sunshineimg='data:image/gif;base64,R0lGODlhKgAXALP/AAAAAP7zAPvKAPicAP///+7u7tzc3NHR0cbGxsDAwLCwsJGRkR4eHh0dHQAAAAAAACH5BAEAAAkALAAAAAAqABcAQAT3MMlJq70419bSOQkHBCQpnAPAeZ/SYY2SMA2jMAxShMDZC4MgQMhRLHIKQGL30lBK0GjJeekUEAwDgXBoSAMnYDAGMBgAshVVA2i31/DKdx6vJ9xvu4Wj2xKYJG0lbWNLfkwZfAc4EowNYZAoQQNkaEkKiBQNCw14HJ8SQ5OjKRR4KptNequsrXoka7Cus3afoHcjYD5KIbZqVHwFW4BSklZ+BjROwQXCBMmDuQGEQQwHzc2LqhvWWNZmCI9RkJNkCgdtB+HbKwc3MjgI4T6RQmMKSWhtZsoTMTQEOG1C0EtUCjyTlODBxyecpl8ZqCXkFTEPLT0RAAA7';
var spyimg='data:image/gif;base64,R0lGODlhEQASAOZLAAAAAI/Kgf/yHP6oDf6kDP6xDo/Yg0Y6J4/hho/dhP/pGf61Do/Sgv7FEP6sDe/v7urp6NfW0/7CD5pwG1VLM01BLlZGLfnuImNWM31yXvb29v65Dv39/f7KEEJBPf69D2NXQESdlnFjOv7ZFT5/ev/tG+zylLq4soBdJuz0lWlcO5uYjbWWI/zhGIiAbv/kGJiDQ5KMeG5hRuvglui/FteMEf///+vome6qEJWQfOubD8vk49mYEuTtxV9UOuTuxT2IhElFO++9EuL32ubUOePamUJCP+3VHXVoRVtILJHYgf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEsALAAAAAARABIAQAfUgEuCSxo5SCoiKjIxGoNLNgAGkpIADQABmJgAjoMnHkEeJ5xLAKWmACUKLaemghkTGwsFpgMEBBMZjiswFwK+CqojNBgrggAhCQjKygBKDAyZJJsuLA3WErIFDgO1Ey6OEAc8DhblBDUHEKMRIkS9qUcsIBGODxS9vgIKLyMdHUIHHpDaMcSEiRQpALwAcONHjxlFpB1LkKAURQDPSmECsokCKwkfZp2iICgChg0fsBXQxq1WEnqCHhzAIWtbLQI6Ao6CAAJFhZ8ofKgb5YiDEQ5EAwEAOw==';
var korniza='data:image/png;base64,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';
var gradient='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAPCAYAAAAlH6X5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAENJREFUeNokxLsBQFAURMFjE0UqUq4IHchkCni4nxWYYDjXxcS1W8wTIgt1v8iZqCuQ/17UGcgxkPNBXYlcNxrHxjcA1C0o34kTyXMAAAAASUVORK5CYII=';
var ximg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAABGdBTUEAALGPC%2FxhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjMxN4N3hgAAAOVJREFUKFNjYACC%2FwwM64D4FhQ7QMUOI4lJgsTgACjhAMT%2FoRikeQ4S3w9FMYwDtQWmCUZX%2Bfj4HAbiW1CMsAmoIeY7M%2FNjmMknxMUfABXNAeL%2FUIxqE1ChMRB3v2Fn%2F7xTVvb%2FQnV1mEIQXYXhLKBimCf%2Fv%2BDk%2FPWUmxumYQ42xSBPgkLp%2F1MurkUwZ22XkzuNYTo0hECKQTZ0gzx5k5%2F%2FG8gGkE0gz6IHaTc0hECKQZ681WRi8v%2BCsPClK4KC%2F0FsrH4ACjpAgw4UjN0gU5GDFMMfIEVAvA6mGKrBD2oryBBwsAIAPx6aHBmyUZsAAAAASUVORK5CYII%3D";
var searchimg='data:image/png;base64,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';

function lang() {
	//used to check if a lang is working
	//country='de';
	//default chat provided by ika-core.org
	if 	(chaturl=='.') chaturl='http://www.ika-core.org/chat/';	
	switch (country) {
   case 'gr':
		CheckVersionBubbleNegative=	"ÎˆÎºÎ±Î½Î± Î­Î»ÎµÎ³Ï‡Î¿ Î³Î¹Î± Î½Î­Î± Î­ÎºÎ´Î¿ÏƒÎ·, Î´ÎµÎ½ Ï…Ï€Î¬ÏÏ‡ÎµÎ¹ ÎºÎ±Î¼Î¯Î± Î±Ï…Ï„Î· Ï„Î·Î½ ÏƒÏ„Î¹Î³Î¼Î®.";
		NewCoreVersion="ÎÎ­Î± Î­ÎºÎ´Î¿ÏƒÎ· ÎºÎµÎ½Ï„ÏÎ¹ÎºÎ¿Ï Script";
		SideBar_News="ÎÎ­Î±";
		SideBar_NewsT="Ika-Core - Î¤Î± ÎÎ­Î± ÎºÎ¬Î¸Îµ Î­ÎºÎ´Î¿ÏƒÎ·Ï‚.";
		SideBar_Drag="ÎšÏÎ±Ï„Î®ÏƒÏ„Îµ Ï€Î±Ï„Î·Î¼Î­Î½Î¿ Ï„Î¿ Ï€Î¿Î½Ï„Î¯ÎºÎ¹ Î³Î¹Î± Î½Î± ÏƒÏÏÎµÏ„Îµ Ï„Î·Î½ Î¼Ï€Î¬ÏÎ± Ï€Î¬Î½Ï‰/ÎºÎ¬Ï„Ï‰";
		SideBar_Search="Î‘Î½Î±Î¶Î®Ï„Î·ÏƒÎ·";
		SideBar_SearchT="Î‘Î½Î±Î¶Î®Ï„Î·ÏƒÎ· Î Î¬Î¹Ï‡Ï„Î·/Î£Ï…Î¼Î¼Î±Ï‡ÎµÎ¯Î±Ï‚";
		SideBar_ToolsT="Î”ÎµÏƒÎ¼Î¿Î¯ Î£Ï…Î¼Î¼Î±Ï‡ÎµÎ¯Î±Ï‚";
		SideBar_Notes="Î£Î·Î¼ÎµÎ¹ÏŽÏƒÎµÎ¹Ï‚";
		SideBar_NotesT="Î£Î·Î¼ÎµÎ¹Ï‰Î¼Î±Ï„Î¬ÏÎ¹Î¿";
		SideBar_Allies="Î£ÏÎ¼Î¼Î±Ï‡Î¿Î¹";
		SideBar_AlliesT="Î›Î¯ÏƒÏ„Î± Î£Ï…Î¼Î¼Î¬Ï‡Ï‰Î½";
		SideBar_Enemies="Î•Ï‡Î¸ÏÎ¿Î¯";
		SideBar_EnemiesT="Î›Î¯ÏƒÏ„Î± Î•Ï‡Î¸ÏÏŽÎ½";
		SideBar_Friends="Î¦Î¯Î»Î¿Î¹";
		SideBar_FriendsT="Î›Î¯ÏƒÏ„Î± Î¦Î¯Î»Ï‰Î½";
		SideBar_Games="Î¨Ï…Ï‡Î±Î³Ï‰Î³Î¯Î±";
		SideBar_GamesT="ÎœÎµÎ½Î¿Ï Î Î±Î¹Ï‡Î½Î¹Î´Î¹ÏŽÎ½";
		SideBar_Indexing="Î‘ÏÏ‡Î¹ÎºÎ¿Ï€Î¿Î¯Î·ÏƒÎ·";
		SideBar_IndexingT="Î ÏÏŒÎ¿Î´Î¿Ï‚ Ï„Î·Ï‚ Î‘ÏÏ‡Î¹ÎºÎ¿Ï€Î¿Î¯Î·ÏƒÎ·Ï‚ Ï„Î¿Ï… ÎšÏŒÏƒÎ¼Î¿Ï… ÏƒÎ¿Ï….";
		SideBar_Settings="Î¡Ï…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚";
		SideBar_SettingsT="Î“ÎµÎ½Î¹ÎºÎ­Ï‚ Î¡Ï…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚";
		SideBar_Chat="ÎšÎ¿Ï…Î²ÎµÎ½Ï„Î¿ÏÎ»Î±";
		SideBar_ChatT="ÎšÎ­Î½Ï„ÏÎ¿ Î•Ï€Î¹ÎºÎ¿Î¹Î½Ï‰Î½Î¯Î±Ï‚ Î£Ï…Î¼Î¼Î±Ï‡Î¹ÏŽÎ½";
		SideBar_Search_Save="Î‘Ï€Î¿Î¸Î®ÎºÎµÏ…ÏƒÎ·";		
		SideBar_Search_Add="Î ÏÎ¿ÏƒÎ¸Î®ÎºÎ·";		
		SideBar_Search_QuickSearch="Î“ÏÎ®Î³Î¿ÏÎ· Î‘Î½Î±Î¶Î®Ï„Î·ÏƒÎ·";
		SideBar_Search_Player="Î Î±Î¯Ï‡Ï„Î·Ï‚";
		SideBar_Search_City="Î ÏŒÎ»Î·";
		SideBar_Search_PlayerStatus="ÎšÎ±Ï„Î¬ÏƒÏ„Î±ÏƒÎ· Î Î±Î¯Ï‡Ï„Î·";
		SideBar_Search_PlayerAll="'ÎŸÎ»ÎµÏ‚";
		SideBar_Search_PlayerUnknown="'Î‘Î³Î½Ï‰ÏƒÏ„Î·";
		SideBar_Search_PlayerNormal="ÎšÎ±Î½Î¿Î½Î¹ÎºÎ®";
		SideBar_Search_PlayerInactive="Î‘Î½ÎµÎ½ÎµÏÎ³Î®";
		SideBar_Search_PlayerVacation="Î”Î¹Î±ÎºÎ¿Ï€ÏŽÎ½";
		SideBar_Search_Alliance="Î£Ï…Î¼Î¼Î±Ï‡ÎµÎ¯Î±";
		SideBar_Search_Radius="Î‘ÎºÏ„Î¯Î½Î± Î‘Î½Î±Î¶Î®Ï„Î·ÏƒÎ·Ï‚";
		SideBar_Search_Search="Î‘Î½Î±Î¶Î®Ï„Î·ÏƒÎ·";
		SideBar_Search_Clear="ÎšÎ±Î¸Î±ÏÎ¹ÏƒÎ¼ÏŒÏ‚";
		SideBar_Search_AdvancedSearch="Î ÏÎ¿Ï‡Ï‰ÏÎ·Î¼Î­Î½Î· Î‘Î½Î±Î¶Î®Ï„Î·ÏƒÎ·";
		SideBar_Search_EnemyAlliances="Î•Ï‡Î¸ÏÎ¹ÎºÎ­Ï‚ Î£Ï…Î¼Î¼Î±Ï‡ÎµÎ¯ÎµÏ‚";
		SideBar_Search_MilitaryScore="Î£Ï„ÏÎ±Ï„Î¹Î¿Ï„Î¹ÎºÏŒ Î£ÎºÎ¿Ï";
		SideBar_Search_GoldScore="Î§ÏÏ…ÏƒÏŒÏ‚";
		SideBar_Search_Between="Î¼ÎµÏ„Î±Î¾Ï";
		SideBar_Search_And="ÎºÎ±Î¹";
		SideBar_Search_TownHallLevel="Î•Ï€Î¯Ï€ÎµÎ´Î¿ Î”Î·Î¼Î±ÏÏ‡ÎµÎ¯Î¿Ï…";
		AllianceMenu=[
		["Î‘Ï€Î¿ÏƒÏ„Î¿Î»Î® ÎšÏ…ÎºÎ»Î¹ÎºÎ¿Ï<br> ÎœÎ®Î½Ï…Î¼Î±Ï„Î¿Ï‚","ÎšÏ…ÎºÎ»Î¹ÎºÏŒ Î¼Î®Î½Ï…Î¼Î± Ï€ÏÎ¿Ï‚ ÏŒÎ»Î¿Ï…Ï‚ Ï„Î¿Ï…Ï‚ Î£ÏÎ¼Î¼Î±Ï‡Î¿Ï…Ï‚"],
		["Forum "+alliancefullnm,"Î ÏÎ¿Ï‚ Ï„Î¿ Forum Î£Ï…Î¼Î¼Î±Ï‡Î¯Î±Ï‚ "],
		["Forum "+alliancefullnm +" <br> Î½Î­ÎµÏ‚ ÎºÎ±Ï„Î±Ï‡Ï‰ÏÎ®ÏƒÎµÎ¹Ï‚","Î ÏÎ¿Ï‚ Ï„Î¿ Forum Î£Ï…Î¼Î¼Î±Ï‡Î¯Î±Ï‚, Î½Î­ÎµÏ‚ ÎºÎ±Ï„Î±Ï‡Ï‰ÏÎ®ÏƒÎµÎ¹Ï‚ "],
		["Chatbox(ÎÎ­Î¿ Î Î±ÏÎ¬Î¸Ï…ÏÎ¿)","Î¤Î¿ Chat Ï„Î·Ï‚ Î£Ï…Î¼Î¼Î±Ï‡Î¯Î±Ï‚, Î±Î½Î¿Î¯Î³ÎµÎ¹ ÏƒÎµ Î½Î­Î¿ Ï€Î±ÏÎ¬Î¸Ï…ÏÎ¿"],
		["Chatbox(Î”Î¹Ï‡Î¿Ï„ÏŒÎ¼Î·ÏƒÎ·)","Î¤Î¿ Chat Ï„Î·Ï‚ Î£Ï…Î¼Î¼Î±Ï‡Î¯Î±Ï‚, Î±Î½Î¿Î¯Î³ÎµÎ¹ ÏƒÏ„Î¿ Î¯Î´Î¹Î¿ Ï€Î±ÏÎ¬Î¸Ï…ÏÎ¿ ÏƒÏ„Î¿ ÎºÎ¬Ï„Ï‰ Î¼Î­ÏÎ¿Ï‚ "],
		["Î¥Ï€Î¿Î»Î¿Î³Î¹ÏƒÏ„Î®Ï‚ ÎœÎ¬Ï‡Î·Ï‚","Î•ÏÎ³Î±Î»ÎµÎ¯Î¿ Î³Î¹Î± Ï„Î¿Ï…Ï‚ Ï…Ï€Î¿Î»Î¿Î³Î¹ÏƒÎ¼Î¿ÏÏ‚ Ï„Ï‰Î½ ÏƒÏ„ÏÎ±Ï„ÎµÏ…Î¼Î¬Ï„Ï‰Î½ ... "],
		["Î‘Î½Î±Î²Î¬Î¸Î¼Î¹ÏƒÎ· Î•ÏÎ³Î±Î»ÎµÎ¯Ï‰Î½ ÏƒÏ…Î¼Î¼Î±Ï‡Î¯Î±Ï‚"+alliancefullnm,"Î‘Î½Î±Î²Î¬Î¸Î¼Î¹ÏƒÎ· Ï„Ï‰Î½ ÎµÏÎ³Î±Î»ÎµÎ¯Ï‰Î½ ÏƒÏ„Î·Î½ Ï„ÎµÎ»ÎµÏ…Ï„Î±Î¯Î± Î­ÎºÎ´Î¿ÏƒÎ·"]];	   
		IslandLegendAllies="â€¢ Î£ÏÎ¼Î¼Î±Ï‡Î¿Î¹";
		IslandLegendNoAlliance="â€¢ Î§Ï‰ÏÎ¯Ï‚ ÏƒÏ…Î¼Î¼Î±Ï‡Î¯Î±";
		IslandLegendEnemies="â€¢ Î•Ï‡Î¸ÏÎ¿Î¯";
		TreatyAll="Î•Î»Î­Ï‡Î¸Î·ÎºÎ±Î½ ÏŒÎ»Î¿Î¹ Î¿Î¹ Ï€Î±Î¯Ï‡Ï„ÎµÏ‚. ÎšÎ¯Ï„ÏÎ¹Î½Î¿ Î­Ï‡Î¿Ï…Î½ Î¿Î¹ Ï‡Ï‰ÏÎ¯Ï‚ ÏƒÏ…Î½Î¸Î®ÎºÎ· ÎºÎ±Î¹ Î“ÎºÏÎ¹ Î±Ï…Ï„Î¿Î¯ Î¼Îµ ÏƒÏ…Î½Î¸Î®ÎºÎ·."
		TreatyYes="ÎˆÏ‡ÎµÏ„Îµ Î®Î´Î· Ï€Î¿Î»Î¹Ï„Î¹ÏƒÎ¼Î¹ÎºÎ® ÏƒÏ…Î¼Ï†Ï‰Î½Î¯Î± Î¼Îµ Ï„Î¿Î½ Ï€Î±Î¯Ï‡Ï„Î· Î±Ï…Ï„ÏŒÎ½.";
		TreatyNo="Î”ÎµÎ½ Î²ÏÎ­Î¸Î·ÎºÎµ ÎºÎ±Î¼Î¯Î± Ï€Î¿Î»Î¹Ï„Î¹ÏƒÎ¼Î¹ÎºÎ® ÏƒÏ…Î¼Ï†Ï‰Î½Î¯Î± Î¼Îµ Ï„Î¿Î½ Ï€Î±Î¯Ï‡Ï„Î· Î±Ï…Ï„ÏŒÎ½.";
		updatenotification="Î¥Ï€Î¬ÏÏ‡ÎµÎ¹ Î¼Î¹Î± Î½Î­Î± Î­ÎºÎ´Î¿ÏƒÎ· Ï„Ï‰Î½ Î•ÏÎ³Î±Î»ÎµÎ¯Ï‰Î½ Ï„Î·Ï‚ ÏƒÏ…Î¼Î¼Î±Ï‡Î¯Î±Ï‚"+alliancefullnm+".\n Î•Î¬Î½ Î¸Î­Î»ÎµÏ„Îµ Î½Î± ÎºÎ¬Î½ÎµÏ„Îµ Î±Î½Î±Î²Î¬Î¸Î¼Î¹ÏƒÎ· Ï€Î¹Î­ÏƒÏ„Îµ ÎŸÎš Î³Î¹Î± Î½Î± Î¼ÎµÏ„Î±Î²ÎµÎ¯Ï„Îµ ÏƒÏ„Î·Î½ ÏƒÎµÎ»Î¯Î´Î± Î±Î½Î±Î²Î±Î¸Î¼Î¹ÏƒÎ·Ï‚ www.ika-core.org.";
		txtplswait="Î Î±ÏÎ±ÎºÎ±Î»ÏŽ Î ÎµÏÎ¹Î¼Î­Î½ÎµÏ„Îµ";
		txtrefresh="Î‘Î½Î±Î½Î­Ï‰ÏƒÎ·";
		txtpagedata="- Î•ÏÏÎµÏƒÎ· ÏƒÎµÎ»Î¯Î´Î±Ï‚";
		txtinfodata="- Î•ÏÏÎµÏƒÎ· Î Î±Î¯Ï‡Ï„Î·";
		txtchkplayer="- ÎˆÎ»ÎµÎ³Ï‡Î¿Ï‚ Î Î±Î¯Ï‡Ï„Î·";
		CultureTreaties="Î Î¿Î»Î¹Ï„Î¹ÏƒÏ„Î¹ÎºÎ®"; //magic word for treaties fix
		CultureTreatiesCancel=" Î‘ÎºÏÏÏ‰ÏƒÎ· Î Î¿Î»Î¹Ï„Î¹ÏƒÏ„Î¹ÎºÎ®Ï‚ ÏƒÏ…Î¼Ï†Ï‰Î½Î¯Î±Ï‚ Ï€ÎµÏÎ¹Î¿Ï…ÏƒÎ¹Î±ÎºÏŽÎ½ ÏƒÏ„Î¿Î¹Ï‡ÎµÎ¯Ï‰Î½";
		CultureTreatiesRequest=" Î‘Î¯Ï„Î·ÏƒÎ· Î Î¿Î»Î¹Ï„Î¹ÏƒÏ„Î¹ÎºÎ®Ï‚ ÏƒÏ…Î¼Ï†Ï‰Î½Î¯Î±Ï‚ Ï€ÎµÏÎ¹Î¿Ï…ÏƒÎ¹Î±ÎºÏŽÎ½ ÏƒÏ„Î¿Î¹Ï‡ÎµÎ¯Ï‰Î½";
	  break;
	case 'fr':		
		CheckVersionBubbleNegative= "AprÃ¨s vÃ©rification, il n'y a pas de nouvelle version.";
		NewCoreVersion="il y a une nouvelle Version";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Cliquer et maintener pour dÃ©placer la barre latÃ©rale";
		SideBar_Search="Recherches";
		SideBar_SearchT="Chercher joueur/alliance";
		SideBar_ToolsT="liens de l'Alliance";
		SideBar_Notes="Notes";
		SideBar_NotesT="Notes rapides";
		SideBar_Allies="AlliÃ©s";
		SideBar_AlliesT="Liste des AlliÃ©s";
		SideBar_Enemies="Ennemis";
		SideBar_EnemiesT="Joueurs Ennemis";
		SideBar_Friends="Amis";
		SideBar_FriendsT="Liste d'amis";
		SideBar_Games="Jeux";
		SideBar_GamesT="Menu des jeux";
		SideBar_Indexing="Mise Ã  jour";
		SideBar_IndexingT="Etat de la mise Ã  jour du monde";
		SideBar_Settings="RÃ©glages";
		SideBar_SettingsT="RÃ©glages - Configuration gÃ©nÃ©rale";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat global";
		SideBar_Search_Add="Ajouter";
		SideBar_Search_Save="Sauver";
		SideBar_Search_QuickSearch="Recherche rapide";
		SideBar_Search_Player="Joueur";
		SideBar_Search_City="City"
		SideBar_Search_PlayerStatus="Statut Joueur";
		SideBar_Search_PlayerAll="Tous";
		SideBar_Search_PlayerUnknown="Inconnu";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactif";
		SideBar_Search_PlayerVacation="Vacances";
		SideBar_Search_Alliance="Alliance";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Recherche";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Recherche avancÃ©e";
		SideBar_Search_EnemyAlliances="Alliances ennemies";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Envoyer un<br> message","Envoyer un message Ã  tous les membres"],
		["Forum","Forum des "+alliancenm],
		["Nouveaux posts" ,"Voir les derniers posts "+alliancenm],
		["Chatbox","Discuter avec les autres membres"],
		["Chatbox(Frame)","Discuter avec les autres membres "],
		["Simulateur de bataille", "Simulateur de bataille"],
		["Update du script des "+alliancenm,"Le dernier script"]];
		IslandLegendAllies="â€¢ Allies";
		IslandLegendNoAlliance="â€¢ Sans Alliance";
		IslandLegendEnemies="â€¢ Enemies";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="You already have a cultural Treaty with this Player";
		TreatyNo="No cultural treaties found for this player.";
		updatenotification="Il y a une nouvelle version du script des "+alliancefullnm+".\n Mettez Ã  jour le script en www.ika-core.org?";
		txtplswait="Attendez";
		txtrefresh="Consultez";
		txtpagedata="- Page en cours";
		txtinfodata="- Information en cours";
		txtchkplayer="- Compte de joueur";
		CultureTreaties="ultur"; //magic word
		CultureTreatiesCancel=" Cancel Cultural Treaty";
		CultureTreatiesRequest=" Request Cultural Treaty";
		break;
	case 'tr':	
		CheckVersionBubbleNegative=   "Yeni sÃ¼rÃ¼m kontrolÃ¼ yaptÄ±m, ÅŸu anda yok.";
		NewCoreVersion="Yeni Ã‡ekirdek SÃ¼rÃ¼mÃ¼";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Kenar Ã§ubuÄŸunu hareket ettirmek iÃ§in basÄ±lÄ± tutup sÃ¼rÃ¼kleyin";
		SideBar_Search="Arama";
		SideBar_SearchT="Oyuncu/Ä°ttifak Arama";
		SideBar_ToolsT="Ä°ttifak KÄ±sayollarÄ±";
		SideBar_Notes="Notlar";
		SideBar_NotesT="HÄ±zlÄ± Notlar";
		SideBar_Allies="Dostlar";
		SideBar_AlliesT="Dostlar - Liste";
		SideBar_Enemies="DÃ¼ÅŸmanlar";
		SideBar_EnemiesT="DÃ¼ÅŸman Oyuncular";
		SideBar_Friends="ArkadaÅŸlar";
		SideBar_FriendsT="ArkadaÅŸ Listesi";
		SideBar_Games="Oyunlar";
		SideBar_GamesT="Oyun MenÃ¼sÃ¼";
		SideBar_Indexing="Ä°ndeksleme";
		SideBar_IndexingT="DÃ¼nya Ä°ndekslemesi Durumu";
		SideBar_Settings="SeÃ§enekler";
		SideBar_SettingsT="SeÃ§enekler - Genel Ayarlar ";
		SideBar_Chat="Sohbet";
		SideBar_ChatT="Genel Sohbet";
		SideBar_Search_Add="Ekle";
		SideBar_Search_Save="Kaydet";     
		SideBar_Search_QuickSearch="HÄ±zlÄ± Arama";
		SideBar_Search_Player="Oyuncu";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Oyuncu Durumu";
		SideBar_Search_PlayerAll="TÃ¼mÃ¼";
		SideBar_Search_PlayerUnknown="Bilinmeyen";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Ä°naktif";
		SideBar_Search_PlayerVacation="Tatil";
		SideBar_Search_Alliance="Ä°ttifak";
		SideBar_Search_Radius="YarÄ±Ã§ap";
		SideBar_Search_Search="Ara";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="GeliÅŸmiÅŸ Arama";
		SideBar_Search_EnemyAlliances="DÃ¼ÅŸman Ä°ttifaklar";   
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["SirkÃ¼ler<br> Mesaj","BÃ¼tÃ¼n Ã¼yelere mesaj gÃ¶nder"],
		[alliancenm+" Forum ","Ä°ttifak Forumu "],
		[alliancenm +" yeni forum mesajlarÄ±","Ä°ttifak Forumu, son eklenenler "],
		["Sohbet (Yeni Pencere)","Ä°ttifak Sohbet, yeni pencerede gÃ¶sterim"],
		["Sohbet (Ã‡erÃ§eve)","Ä°ttifak Sohbet, Ã§erÃ§eve iÃ§inde gÃ¶sterim "],
		["SavaÅŸ HesaplayÄ±cÄ±","SavaÅŸ hesaplamalarÄ± ... "],
		[alliancenm+" AraÃ§larÄ± GÃ¼ncelle ","Eklenti gÃ¼ncelleme" ]];
		IslandLegendAllies="â€¢ Dost";
		IslandLegendNoAlliance="â€¢ Ä°ttifaksÄ±z";
		IslandLegendEnemies="â€¢ DÃ¼ÅŸman";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Bu oyuncu ile zaten kÃ¼ltÃ¼rel antlaÅŸmanÄ±z var";
		TreatyNo="Bu oyuncu ile kÃ¼ltÃ¼rel antlaÅŸmanÄ±z yok.";
		updatenotification=alliancenm+" AraÃ§larÄ±nÄ±n yeni sÃ¼rÃ¼mÃ¼ var.\n www.ika-core.org.";
		txtplswait="LÃ¼tfen Bekleyin";
		txtrefresh="Yenile";
		txtpagedata="- Sayfa AlÄ±nÄ±yor";
		txtinfodata="- Bilgi AlÄ±nÄ±yor";
		txtchkplayer="- Oyuncu Kontrol Ediliyor";
		CultureTreaties="Ã¼ltÃ¼r"; //magic word for treaties fix, does it work??? please post on userscripts
		CultureTreatiesCancel=" KÃ¼ltÃ¼rel AnlaÅŸmayÄ± Ä°ptal Et";
		CultureTreatiesRequest=" KÃ¼ltÃ¼rel AnlaÅŸma Teklif Et";
		break;
	case 'de':		
		CheckVersionBubbleNegative=	"Ich hab fuer ne neue version gecheckt, es gibt leider keine.";
		NewCoreVersion="Neue Core Version";
		SideBar_News="Neues";
		SideBar_NewsT="Ika-Core Version Neuigkeiten";
		SideBar_Drag="Linke mouse taste druecken und halten um dass seitliche menu rauf und runter zu schieben";
		SideBar_Search="Suchen";
		SideBar_SearchT="Spieler/Allianz Suche";
		SideBar_ToolsT="Allianz Links";
		SideBar_Notes="Notizen";
		SideBar_NotesT="Notizbuch";
		SideBar_Allies="Allierten";
		SideBar_AlliesT="Allierten Liste";
		SideBar_Enemies="Feinde";
		SideBar_EnemiesT="Feindliche Spieler";
		SideBar_Friends="Freunde";
		SideBar_FriendsT="Maine Freunde";
		SideBar_Games="Unterhaltung";
		SideBar_GamesT="Untehaltungs Menu";
		SideBar_Indexing="Index";
		SideBar_IndexingT="Welt Index";
		SideBar_Settings="Einstellungen";
		SideBar_SettingsT="Einstellungen und Konfiguration ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Globales Chat";
		SideBar_Search_Add="Hinzufuegen";
		SideBar_Search_Save="Speichern";		
		SideBar_Search_QuickSearch="SchnellSuche";
		SideBar_Search_Player="Spieler";
		SideBar_Search_City="Stadt";
		SideBar_Search_PlayerStatus="Spieler Status";
		SideBar_Search_PlayerAll="Alle";
		SideBar_Search_PlayerUnknown="Unbekannt";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inaktiv";
		SideBar_Search_PlayerVacation="Ferien";
		SideBar_Search_Alliance="Allianz";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Suchen";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Fortgeschrittene Suche";
		SideBar_Search_EnemyAlliances="Feindliche Allianzen";		
		SideBar_Search_MilitaryScore="Militaer Punkte";
		SideBar_Search_GoldScore="Gold Punkte";
		SideBar_Search_Between="zwischen";
		SideBar_Search_And="und";
		SideBar_Search_TownHallLevel="Rathaus Level";		
		AllianceMenu=[
		["Allianz<br> Rundmail","Sende Mail an alle Allianzmitglieder "],
		["Forum: "+alliancefullnm,"Zum Allianz-Forum "],
		[alliancefullnm +": Forum News","Neue BeitrÃ¤ge im Forum "],
		["Chatbox(New Window)","Allianz Chat, in neuem Fenster "],
		["Chatbox(Frame)","Allianz Chat, in einem Frame "],
		["Battle Calc","Calculates a battle ... "],
		[" Update "+alliancefullnm+" Tools ","Gets the latest script"]];
		IslandLegendAllies="â€¢ Allierten";
		IslandLegendNoAlliance="â€¢ Ohne Allianz";
		IslandLegendEnemies="â€¢ Feinde";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Es besteht bereits ein KulturgÃ¼terabkommen mit diesem Spieler.";
		TreatyNo="Es besteht kein KulturgÃ¼terabkommen mit diesem Spieler.";
		updatenotification="Es gibt eine neue Version vom "+alliancefullnm+" Tools.\n Jezt das Script updaten auf www.ika-core.org?";
		maplegend=["Deine Inseln","Gesuchte Inseln","Ãœbereinstimmende Inseln","Keine Ãœbereinstimmung","Sea","Click fÃ¼r mehr Infos."];
		txtplswait="Bitte warten!";
		txtrefresh="Refresh";
		txtpagedata="- Hole Seite";
		txtinfodata="- Hole Info";
		txtchkplayer="- Checke Spieler";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" KulturgÃ¼terabkommen kÃ¼ndigen";
		CultureTreatiesRequest=" KulturgÃ¼terabkommen anbieten";
		break;
	case 'es':
		CheckVersionBubbleNegative= "BusquÃ© una nueva versiÃ³n, ninguna por ahora.";
		NewCoreVersion="Nueva VersiÃ³n Core";
		SideBar_News="Novedades";
		SideBar_NewsT="Nuevas versiones";
		SideBar_Drag="Oprime y Arrastra para mover este MenÃº";
		SideBar_Search="Buscar";
		SideBar_SearchT="Buscar jugador/alianza";
		SideBar_ToolsT="Enlaces de la Alianza";
		SideBar_Notes="Notas";
		SideBar_NotesT="Anotaciones";
		SideBar_Allies="Aliados";
		SideBar_AlliesT="Lista de Aliados";
		SideBar_Enemies="Enemigos";
		SideBar_EnemiesT="Lista de Enemigos";
		SideBar_Friends="Amigos";
		SideBar_FriendsT="Lista de Amigos";
		SideBar_Games="Juegos";
		SideBar_GamesT="MenÃº de Juegos";
		SideBar_Indexing="Indexando";
		SideBar_IndexingT="Progreso del Indexado del Mundo";
		SideBar_Settings="Configuraciones";
		SideBar_SettingsT="Configuraciones Generales ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat Global";
		SideBar_Search_Add="Agregar";
		SideBar_Search_Save="Guardar";
		SideBar_Search_QuickSearch="BÃºsqueda RÃ¡pida";
		SideBar_Search_Player="Jugador";
		SideBar_Search_City="Colonia";
		SideBar_Search_PlayerStatus="Estado";
		SideBar_Search_PlayerAll="Todos";
		SideBar_Search_PlayerUnknown="Desconocido";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactivo";
		SideBar_Search_PlayerVacation="Vacaciones";
		SideBar_Search_Alliance="Alianza";
		SideBar_Search_Radius="Radio";
		SideBar_Search_Search="Buscar";
		SideBar_Search_Clear="Limpiar";
		SideBar_Search_AdvancedSearch="BÃºsqueda Avanzada";
		SideBar_Search_EnemyAlliances="Alianzas Enemigas";	
		SideBar_Search_MilitaryScore="generales";
		SideBar_Search_GoldScore="Oro";
		SideBar_Search_Between="entre";
		SideBar_Search_And="y";
		SideBar_Search_TownHallLevel="Intendencia";		
		AllianceMenu=[
		["Mensaje a la<br> Alianza","mensaje a la alianza"],
		["Foro "+alliancefullnm,"Foro de la Alianza "],
		["Foro " + alliancefullnm +"	mensajes no leÃ­dos","Nuevos Mensajes Foro de la Alianza "],
		["Chatbox(Nueva Ventana)","Chat de la Alianza, En Nueva Ventana"],
		["Chatbox(Frame)","Chat de la Alianza, muestra en chat en frames"],
		["Calculadora de Batallas","Calculadora de Batallas"],
		[" Actualizar Herramientas"+alliancefullnm,"Actualizar script"]];
		IslandLegendAllies="â€¢ Aliados";
		IslandLegendNoAlliance="â€¢ No Aliados";
		IslandLegendEnemies="â€¢ Enemigos";
		TreatyAll="En amarillo quienes ya tiene acuerdo y en gris quien no.";
		TreatyYes="TÃº tienes un acuerdo cultural con este jugador";
		TreatyNo="No tienes acuerdo cultural con este jugador.";
		updatenotification="Existe una nueva versiÃ³n de las Herramientas "+alliancefullnm+" .\n Oprime OK si deseas actualizarlas ahora.";
		txtplswait="Espere...";
		txtrefresh="Actualizar";
		txtpagedata="- Obteniendo PÃ¡gina";
		txtinfodata="- Obteniendo InformaciÃ³n";
		txtchkplayer="- Verificando Jugador";
		CultureTreaties="Cultura"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancelar Acuerdo Cultural";
		CultureTreatiesRequest=" Solicitar Acuerdo Cultural";
		break;      
	case 'cn':
	case 'hk':
	case 'tw':
		CheckVersionBubbleNegative=	"I checked for a new version , there is none at the moment.";
		NewCoreVersion="New Core Version";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Hold and Drag to move the SideBar";
		SideBar_Search="Search";
		SideBar_SearchT="Search player/alliance";
		SideBar_ToolsT="Alliance Links";
		SideBar_Notes="Notes";
		SideBar_NotesT="Quick Notes";
		SideBar_Allies="Allies";
		SideBar_AlliesT="Allies - List";
		SideBar_Enemies="Enemies";
		SideBar_EnemiesT="Enemy Players";
		SideBar_Friends="Friends";
		SideBar_FriendsT="Friends List";
		SideBar_Games="Games";
		SideBar_GamesT="Games Menu";
		SideBar_Indexing="Indexing";
		SideBar_IndexingT="World Indexing Progress";
		SideBar_Settings="Settings";
		SideBar_SettingsT="Settings - General Configuration ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Global Chat";
		SideBar_Search_Add="Add";
		SideBar_Search_Save="Save";		
		SideBar_Search_QuickSearch="Quick Search";
		SideBar_Search_Player="Player";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Player Status";
		SideBar_Search_PlayerAll="All";
		SideBar_Search_PlayerUnknown="Unknown";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactive";
		SideBar_Search_PlayerVacation="Vacation";
		SideBar_Search_Alliance="Alliance";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Search";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Advanced Search";
		SideBar_Search_EnemyAlliances="Enemy Alliances";		
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		[" ç™¼é€ç›Ÿå…§è¨Šæ¯","å‚³è¨Šæ¯çµ¦æ‰€æœ‰è¯ç›Ÿæˆå“¡ "],
		[alliancefullnm+" çš„è«–å£‡","è¯ç›Ÿè«–å£‡ "],
		[alliancefullnm +" è«–å£‡çš„æ–°å¸– ","è¯ç›Ÿè«–å£‡çš„æ–°ç™¼è¨€ "],
		["ç›Ÿå…§åŠæ™‚é€š(æ–°è¦–çª—)","åœ¨æ–°è¦–çª—é–‹å•Ÿç›Ÿå…§åŠæ™‚é€š "  ],
		["ç›Ÿå…§åŠæ™‚é€š(åŒé )","åœ¨åŒä¸€é é¡¯ç¤ºç›Ÿå…§åŠæ™‚é€š(ç„¡æ³•è‡ªå‹•æ›´æ–°) "],
		["æˆ°é¬¥æ¨¡æ“¬å™¨","æˆ°åŠ›çš„è¨ˆç®— "],
		[alliancefullnm+" Tools çš„è…³æœ¬æ›´æ–°","æ›´æ–°è‡³æœ€æ–°çš„è…³æœ¬"]];
		IslandLegendAllies="â€¢ è¯ç›Ÿ";
		IslandLegendNoAlliance="â€¢ ç„¡è¯ç›Ÿ";
		IslandLegendEnemies="â€¢ æ•µå°å‹¢åŠ›";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="æ­¤çŽ©å®¶å·²å’Œä½ ç°½ç½²éŽæ–‡åŒ–æ¢ç´„";
		TreatyNo="ç„¡æ–‡åŒ–æ¢ç´„";
		updatenotification=" åµæ¸¬åˆ°æ–°ç‰ˆçš„ "+alliancefullnm+" Tools.\n æŒ‰ç¢ºå®šå°‡é€£çµåˆ° www.ika-core.org æ›´æ–°";
		txtplswait="è™•ç†ä¸­, è«‹è€å¿ƒç­‰å¾…";
		txtrefresh="è³‡æ–™æ›´æ–°";
		txtpagedata="- å–å¾—é é¢";
		txtinfodata="- å–å¾—è³‡æ–™";
		txtchkplayer="- èª¿æŸ¥çŽ©å®¶";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" å–æ¶ˆæ–‡åŒ–æ¢ç´„";
		CultureTreatiesRequest=" ç°½ç½²æ–‡åŒ–æ¢ç´„";
		break;
	case 'pt':
		CheckVersionBubbleNegative="Procurei por uma nova versÃ£o, nÃ£o existe nenhuma de momento.";
		NewCoreVersion="Nova VersÃ£o Core";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Pressiona e arrasta para mover o Menu Lateral";
		SideBar_Search="Procurar";
		SideBar_SearchT="Procurar Jogador/AlianÃ§a";
		SideBar_ToolsT="HiperligaÃ§Ãµes AlianÃ§a";
		SideBar_Notes="Notas";
		SideBar_NotesT="Notas InstantÃ¢neas";
		SideBar_Allies="Aliados";
		SideBar_AlliesT="Lista de Aliados";
		SideBar_Enemies="Inimigos";
		SideBar_EnemiesT="Jogadores Inimigos";
		SideBar_Friends="Amigos";
		SideBar_FriendsT="Lista de Amigos";
		SideBar_Games="Jogos";
		SideBar_GamesT="Menu de Jogos";
		SideBar_Indexing="IndexaÃ§Ã£o";
		SideBar_IndexingT="Ãndice de Progresso do Mundo";
		SideBar_Settings="PreferÃªncias";
		SideBar_SettingsT="PreferÃªncias - ConfiguraÃ§Ã£o Geral ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat Global";
		SideBar_Search_Add="Adicionar";     
		SideBar_Search_Save="Gravar";     
		SideBar_Search_QuickSearch="Procura RÃ¡pida";
		SideBar_Search_Player="Jogador";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Status do Jogador";
		SideBar_Search_PlayerAll="Todos";
		SideBar_Search_PlayerUnknown="Desconhecido";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactivo";
		SideBar_Search_PlayerVacation="Ferias";
		SideBar_Search_Alliance="AlianÃ§a";
		SideBar_Search_Radius="Raio";
		SideBar_Search_Search="Procurar";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Procura AvanÃ§ada";
		SideBar_Search_EnemyAlliances="AlianÃ§as Inimigas";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Enviar para AlianÃ§a<br> Mensagem","Enviar mensagem para todos os Aliados"],
		["Forum "+alliancefullnm,"Para o FÃ³rum da AlianÃ§a " ],
		[alliancefullnm +" Ver novos Posts","Para o FÃ³rum da AlianÃ§a, Ãºltimos posts ",],
		["Chatbox(New Window)","Chat da AlianÃ§a, abre numa nova janela"],
		["Chatbox(Frame)","Chat da AlianÃ§a, mostra o chat num frame sem recarregar "],
		["Calc de Batalha","Calcula uma Batalha ... "],
		[" Actualiza as Ferramentas da "+alliancefullnm,"ObtÃ©m o ultimo Script"]];
		IslandLegendAllies="â€¢ Aliados";
		IslandLegendNoAlliance="â€¢ Sem Aliados";
		IslandLegendEnemies="â€¢ Inimigos";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="JÃ¡ tens um tratado de cultura com este jogador";
		TreatyNo="NÃ£o foram encontrados tratados de cultura com este jogador";
		updatenotification="Existe uma nova versÃ£o das ferramentas da "+alliancefullnm+".\n Clica OK, se quiseres podes ir a www.ika-core.org e actualizar agora.";
		txtplswait="Por Favor, Esperar";
		txtrefresh="Actualizar";
		txtpagedata="- A Receber Pagina";
		txtinfodata="- A Receber InformaÃ§Ãµes";
		txtchkplayer="- A Verificar Jogador";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancelar Tratado de Cultura";
		CultureTreatiesRequest=" Solicitar Tratado de Cultura";
		break;
	case 'bg':
		  CheckVersionBubbleNegative=   "ÐÑÐ¼Ð° Ð½Ð¾Ð²Ð° Ð²ÐµÑ€ÑÐ¸Ñ Ð·Ð° Ð¼Ð¾Ð¼ÐµÐ½Ñ‚Ð°.";
          NewCoreVersion="ÐÐ°Ð»Ð¸Ñ‡Ð¸Ðµ Ð½Ð° Ð½Ð¾Ð²Ð° Ð²ÐµÑ€ÑÐ¸Ñ.";
          SideBar_News="ÐÐ¾Ð²Ð¾ÑÑ‚Ð¸";
          SideBar_NewsT="Ika-Core Ð½Ð¾Ð²Ð¾Ð²ÑŠÐ²ÐµÐ´ÐµÐ½Ð¸Ñ";
          SideBar_Drag="Ð—Ð°Ð´Ñ€ÑŠÐ¶Ñ‚Ðµ Ð¸ Ð¿Ð»ÑŠÐ·Ð½ÐµÑ‚Ðµ ÑÐºÑ€Ð¾Ð»ÐµÑ€Ð°";
          SideBar_Search="Ð¢ÑŠÑ€ÑÐ¸";
          SideBar_SearchT="Ð¢ÑŠÑ€ÑÐ¸ Ð¸Ð³Ñ€Ð°Ñ‡/ÑÑŠÑŽÐ·";
          SideBar_ToolsT="Ð’Ñ€ÑŠÐ·ÐºÐ¸ Ð½Ð° ÑÑŠÑŽÐ·Ð°";
          SideBar_Notes="Ð‘ÐµÐ»ÐµÐ¶ÐºÐ¸";
          SideBar_NotesT="Ð‘ÑŠÑ€Ð·Ð¸ Ð±ÐµÐ»ÐµÐ¶ÐºÐ¸";
          SideBar_Allies="Ð¡ÑŠÑŽÐ·Ð¸";
          SideBar_AlliesT="Ð¡Ð¿Ð¸ÑÑŠÐº Ð½Ð° ÑÑŠÑŽÐ·Ð¸";
          SideBar_Enemies="Ð’Ñ€Ð°Ð³Ð¾Ð²Ðµ";
          SideBar_EnemiesT="Ð˜Ð³Ñ€Ð°Ñ‡Ð¸";
          SideBar_Friends="ÐŸÑ€Ð¸ÑÑ‚ÐµÐ»Ð¸";
          SideBar_FriendsT="Ð¡Ð¿Ð¸ÑÑŠÐº Ð½Ð° Ð¿Ñ€Ð¸ÑÑ‚ÐµÐ»Ð¸";
          SideBar_Games="Ð˜Ð³Ñ€Ð¸";
          SideBar_GamesT="ÐœÐµÐ½ÑŽ Ð¸Ð³Ñ€Ð¸";
          SideBar_Indexing="Ð˜Ð½Ð´ÐµÐºÑÐ¸Ñ€Ð°Ð½Ðµ";
          SideBar_IndexingT="Ð Ð°Ð·Ð²Ð¸Ñ‚Ð¸Ðµ Ð½Ð° ÑÐ²ÑÑ‚ ÐÐ»Ñ„Ð°";
          SideBar_Settings="ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸";
          SideBar_SettingsT="ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸ - ÐšÐ¾Ð½Ñ„Ð¸Ð³ÑƒÑ€Ð¸Ñ€Ð°Ð½Ðµ ";
          SideBar_Chat="Ð§Ð°Ñ‚";
          SideBar_ChatT="ÐžÐ±Ñ‰ Ñ‡Ð°Ñ‚";
          SideBar_Search_Add="ÐŸÑ€Ð¸Ð±Ð°Ð²Ð¸";     
          SideBar_Search_Save="Ð—Ð°Ð¿Ð°Ð·Ð¸";     
          SideBar_Search_QuickSearch="Ð‘ÑŠÑ€Ð·Ð¾ Ñ‚ÑŠÑ€ÑÐµÐ½Ðµ";
          SideBar_Search_Player="Ð˜Ð³Ñ€Ð°Ñ‡";
          SideBar_Search_City="City";
		  SideBar_Search_PlayerStatus="Ð¡Ñ‚Ð°Ñ‚ÑƒÑ Ð½Ð° Ð¸Ð³Ñ€Ð°Ñ‡Ð°";
          SideBar_Search_PlayerAll="Ð’ÑÐ¸Ñ‡ÐºÐ¸";
          SideBar_Search_PlayerUnknown="ÐÐµÐ¸Ð·Ð²ÐµÑÑ‚ÐµÐ½";
          SideBar_Search_PlayerNormal="ÐÐ¾Ñ€Ð¼Ð°Ð»ÐµÐ½";
          SideBar_Search_PlayerInactive="ÐÐµÐ°ÐºÑ‚Ð¸Ð²ÐµÐ½";
          SideBar_Search_PlayerVacation="ÐžÑ‚Ð¿ÑƒÑÐºÐ°";
          SideBar_Search_Alliance="Ð¡ÑŠÑŽÐ·";
          SideBar_Search_Radius="Ð Ð°Ð´Ð¸ÑƒÑ";
          SideBar_Search_Search="Ð¢ÑŠÑ€ÑÐ¸";
		  SideBar_Search_Clear="Clear";
          SideBar_Search_AdvancedSearch="Ð Ð°Ð·ÑˆÐ¸Ñ€ÐµÐ½Ð¾ Ñ‚ÑŠÑ€ÑÐµÐ½Ðµ";
          SideBar_Search_EnemyAlliances="Ð’Ñ€Ð°Ð¶ÐµÑÐºÐ¸ ÑÑŠÑŽÐ·Ð¸";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
          AllianceMenu=[
          ["Ð˜Ð·Ð¿Ñ€Ð°Ñ‚Ð¸ ÑÑŠÐ¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ<br> Ð´Ð¾ ÑÑŠÑŽÐ·Ð°","Ð˜Ð·Ð¿Ñ€Ð°Ñ‚Ð¸ ÑÑŠÐ¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ Ð½Ð° Ð²ÑÐ¸Ñ‡ÐºÐ¸ ÑÑŠÑŽÐ·Ð½Ð¸Ñ†Ð¸"],
          ["Ð¤Ð¾Ñ€ÑƒÐ¼ "+alliancefullnm,"ÐšÑŠÐ¼ Ñ„Ð¾Ñ€ÑƒÐ¼Ð° Ð½Ð° ÑÑŠÑŽÐ·Ð° " ],
          [alliancefullnm +" Ð½Ð¾Ð²Ð¸ Ð¿ÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸Ð¸ Ð²ÑŠÐ² Ñ„Ð¾Ñ€ÑƒÐ¼Ð°","ÐšÑŠÐ¼ Ð¿Ð¾ÑÐ»ÐµÐ´Ð½Ð¸Ñ‚Ðµ Ð¿ÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸Ð¸ Ð²ÑŠÐ² Ñ„Ð¾Ñ€ÑƒÐ¼Ð° Ð½Ð° ÑÑŠÑŽÐ·Ð° ",],
          ["Ð§Ð°Ñ‚ ÑÑ‚Ð°Ñ(ÐÐ¾Ð² Ð¿Ñ€Ð¾Ð·Ð¾Ñ€ÐµÑ†)","ÐžÑ‚Ð²Ð°Ñ€Ñ Ñ‡Ð°Ñ‚ ÑÑ‚Ð°ÑÑ‚Ð° Ð½Ð° ÑÑŠÑŽÐ·Ð° Ð² Ð½Ð¾Ð² Ð¿Ñ€Ð¾Ð·Ð¾Ñ€ÐµÑ†"],
          ["Ð§Ð°Ñ‚ ÑÑ‚Ð°Ñ(ÐŸÐ¾Ð´Ñ€Ð°Ð¼ÐºÐ°)","ÐŸÐ¾ÐºÐ°Ð·Ð²Ð° Ñ‡Ð°Ñ‚ ÑÑ‚Ð°ÑÑ‚Ð° Ð½Ð° ÑÑŠÑŽÐ·Ð° Ð² Ð¿Ð¾Ð´Ñ€Ð°Ð¼ÐºÐ° "],
          ["ÐšÐ°Ð»ÐºÑƒÐ»Ð°Ñ‚Ð¾Ñ€ Ð½Ð° Ð±Ð¸Ñ‚ÐºÐ¸","ÐŸÐ»Ð°Ð½Ð¸Ñ€Ð°Ð¹ Ð±Ð¸Ñ‚ÐºÐ° ... "],
          [" ÐžÐ±Ð½Ð¾Ð²Ð¸ "+alliancefullnm+" Tools ","Ð’Ð·ÐµÐ¼Ð¸ Ð¿Ð¾ÑÐ»ÐµÐ´Ð½Ð¸Ñ ÑÐºÑ€Ð¸Ð¿Ñ‚"]];
          IslandLegendAllies="â€¢ Ð¡ÑŠÑŽÐ·Ð½Ðº";
          IslandLegendNoAlliance="â€¢ ÐÐµÑƒÑ‚Ñ€Ð°Ð»ÐµÐ½";
          IslandLegendEnemies="â€¢ Ð’Ñ€Ð°Ð³";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
          TreatyYes="Ð˜Ð¼Ð°Ñ‚Ðµ Ð´Ð¾Ð³Ð²Ð¾Ñ€ Ð·Ð° ÐºÑƒÐ»Ñ‚ÑƒÑ€ÐµÐ½ Ð¾Ð±Ð¼ÐµÐ½ Ñ Ñ‚Ð¾Ð·Ð¸ Ð¸Ð³Ñ€Ð°Ñ‡.";
          TreatyNo="ÐÑÐ¼Ð°Ñ‚Ðµ Ð´Ð¾Ð³Ð¾Ð²Ð¾Ñ€ Ð·Ð° ÐºÑƒÐ»Ñ‚ÑƒÑ€ÐµÐ½ Ð¾Ð±Ð¼ÐµÐ½ Ñ Ñ‚Ð¾Ð·Ð¸ Ð¸Ð³Ñ€Ð°Ñ‡.";
          updatenotification="Ð˜Ð¼Ð° Ð½Ð¾Ð²Ð° Ð²ÐµÑ€ÑÐ¸Ñ Ð½Ð° "+alliancefullnm+" Tools.\n ÐÐ°Ñ‚Ð¸ÑÐ½Ð¸ OK, Ð°ÐºÐ¾ Ð¸ÑÐºÐ°Ñˆ Ð´Ð° Ð¾Ñ‚Ð¸Ð´ÐµÑˆ Ð½Ð° www.ika-core.org Ð¸ Ð´Ð° Ð¾Ð±Ð½Ð¾Ð²Ð¸Ñˆ.";
          txtplswait="ÐœÐ¾Ð»Ñ, Ð¸Ð·Ñ‡Ð°ÐºÐ°Ð¹Ñ‚Ðµ";
          txtrefresh="ÐžÐ¿Ñ€ÐµÐ½ÑÐ½Ð¸";
          txtpagedata="- ÐŸÐ¾Ð»ÑƒÑ‡Ð°Ð²Ð°Ð½Ðµ Ð½Ð° ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°";
          txtinfodata="- ÐŸÐ¾Ð»ÑƒÑ‡Ð°Ð²Ð°Ð½Ðµ Ð½Ð° Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ";
          txtchkplayer="- ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð½Ð° Ð¸Ð³Ñ€Ð°Ñ‡Ð°";
          CultureTreaties="ultur"; //magic word for treaties fix
          CultureTreatiesCancel=" ÐžÑ‚Ð¼ÐµÐ½Ð¸ Ð´Ð¾Ð³Ð¾Ð²Ð¾Ñ€Ð° Ð·Ð° ÐºÑƒÐ»Ñ‚ÑƒÑ€ÐµÐ½ Ð¾Ð±Ð¼ÐµÐ½.";
          CultureTreatiesRequest=" ÐŸÐ¾Ð¸ÑÐºÐ°Ð¹ Ð´Ð¾Ð³Ð¾Ð²Ð¾Ñ€ Ð·Ð° ÐºÑƒÐ»Ñ‚ÑƒÑ€ÐµÐ½ Ð¾Ð±Ð¼ÐµÐ½.";
		break;
	case 'it':
		CheckVersionBubbleNegative= "Ho cercato una nuova versione , non ce ne sono al momento.";
		NewCoreVersion="Nuova versione di Core";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Clicca e tieni premuto per spostare la barra";
		SideBar_Search="Cerca";
		SideBar_SearchT="Cerca giocatori/alleanza";
		SideBar_ToolsT="Collegamenti Alleanza";
		SideBar_Notes="Note";
		SideBar_NotesT="Note Rapide";
		SideBar_Allies="Alleati";
		SideBar_AlliesT="Alleati - Lista";
		SideBar_Enemies="Nemici";
		SideBar_EnemiesT="Giocatori Nemici";
		SideBar_Friends="Amici";
		SideBar_FriendsT="Lista Amici";
		SideBar_Games="Gioco";
		SideBar_GamesT="Menu di Gioco";
		SideBar_Indexing="Indicizzando";
		SideBar_IndexingT="Processo Indicizzazione del mondo";
		SideBar_Settings="Settaggi";
		SideBar_SettingsT="Settaggi - Configurazione Generale ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Chat Globale";
		SideBar_Search_Add="Aggiungi";
		SideBar_Search_Save="Salva";
		SideBar_Search_QuickSearch="Ricerca Rapida";
		SideBar_Search_Player="Giocatore";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Stato del Giocatore";
		SideBar_Search_PlayerAll="Tutti";
		SideBar_Search_PlayerUnknown="Sconosciuto";
		SideBar_Search_PlayerNormal="Normale";
		SideBar_Search_PlayerInactive="Inattivo";
		SideBar_Search_PlayerVacation="Vacanza";
		SideBar_Search_Alliance="Alleanza";
		SideBar_Search_Radius="Raggio Isole";
		SideBar_Search_Search="Cerca";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Ricerca Avanzata";
		SideBar_Search_EnemyAlliances="Alleanze Nemiche";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Send Alliance<br> Messaggio","Invia Messaggio all'Alleanza"],
		["Forum "+alliancefullnm,"Al Forum dell'Alleanza" ],
		[alliancefullnm +" new forum posts","Al Forum dell'Alleanza, ultimo post ",],
		["Chatbox(New Window)","Chat dell'alleanza, apri in una nuova finestra"],
		["Chatbox(Frame)","Chat dell'alleanza, mostra chat in un frame senza ricaricare "],
		["Battle Calc","Calcolatore di battaglie ... "],
		[" Update "+alliancefullnm+" Tools ","Ottieni l'ultimo script"]];
		IslandLegendAllies="â€¢ Alleati";
		IslandLegendNoAlliance="â€¢ Senza Alleanza";
		IslandLegendEnemies="â€¢ Nemici";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Hai giÃ  un accordo culturale con questo giocatore.";
		TreatyNo="Nessun accordo culturale con questo giocatore.";
		updatenotification="C'Ã¨ una nuova versione di "+alliancefullnm+" Tools.\n Clicca su OK se vuoi andare su www.ika-core.org and update ora.";
		txtplswait="Attendere Prego";
		txtrefresh="Aggiornamento";
		txtpagedata="- Ottenimento Pagina";
		txtinfodata="- Ottenimento Informazioni";
		txtchkplayer="- Controllo Giocatore";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancella Accordo Culturale";
		CultureTreatiesRequest=" Richiedi Accordo Culturale";
		break;
	case 'hu':
		CheckVersionBubbleNegative="EllenÅ‘riztem, de pillanatnyilag nincs Ãºj verziÃ³.";
		NewCoreVersion="Ãšj Core verziÃ³";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core KiadÃ¡s hÃ­rek";
		SideBar_Drag="Ragadd meg lenyomott bal egÃ©rgombal az oldalsÃ¡vot az Ã¡thelyezÃ©shez";
		SideBar_Search="KeresÃ©s";
		SideBar_SearchT="JÃ¡tÃ©kos/SzÃ¶vetsÃ©g keresÃ©se";
		SideBar_ToolsT="SzÃ¶vetsÃ©g linkek";
		SideBar_Notes="Jegyzetek";
		SideBar_NotesT="Gyors Jegyzet";
		SideBar_Allies="SzÃ¶vetsÃ©gesek";
		SideBar_AlliesT="SzÃ¶vetsÃ©gesek listÃ¡ja";
		SideBar_Enemies="EllensÃ©gek";
		SideBar_EnemiesT="EllensÃ©ges jÃ¡tÃ©kosok";
		SideBar_Friends="BarÃ¡tok";
		SideBar_FriendsT="BarÃ¡tok listÃ¡ja";
		SideBar_Games="JÃ¡tÃ©kok";
		SideBar_GamesT="JÃ¡tÃ©kok menÃ¼";
		SideBar_Indexing="IndexÃ¡lÃ¡s";
		SideBar_IndexingT="VilÃ¡g IndexÃ¡lÃ¡sa folyamatban";
		SideBar_Settings="BeÃ¡llÃ­tÃ¡sok";
		SideBar_SettingsT="BeÃ¡llÃ­tÃ¡sok - AlapvetÅ‘ konfigorÃ¡ciÃ³ ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Globalis Chat";
		SideBar_Search_Add="HozzÃ¡ad";
		SideBar_Search_Save="MentÃ©s";     
		SideBar_Search_QuickSearch="GyorskeresÅ‘";
		SideBar_Search_Player="JÃ¡tÃ©kos";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="JÃ¡tÃ©kos stÃ¡tusza";
		SideBar_Search_PlayerAll="Ã–sszes";
		SideBar_Search_PlayerUnknown="Ismeretlen";
		SideBar_Search_PlayerNormal="NormÃ¡l";
		SideBar_Search_PlayerInactive="InaktÃ­v";
		SideBar_Search_PlayerVacation="VakÃ¡ciÃ³";
		SideBar_Search_Alliance="SzÃ¶vetsÃ©g";
		SideBar_Search_Radius="SugÃ¡r";
		SideBar_Search_Search="KeresÃ©s";
		SideBar_Search_Clear="TÃ¶rlÃ©s";
		SideBar_Search_AdvancedSearch="SpeciÃ¡lis keresÅ‘";
		SideBar_Search_EnemyAlliances="EllensÃ©ges szÃ¶vetsÃ©gek";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["SzÃ¶vetsÃ©g<br> KÃ¶rÃ¼zenet","Ãœzenet kÃ¼ldÃ©se az Ã¶sszes szÃ¶vetsÃ©gesnek"],
		["FÃ³rum "+alliancefullnm,"A SzÃ¶vetsÃ©gi fÃ³rum megnyitÃ¡sa " ],
		[alliancefullnm +" Ãšj FÃ³rum hozzÃ¡szÃ³lÃ¡sok","A SzÃ¶vetsÃ©gi fÃ³rum legÃºjabb hozzÃ¡szÃ³lÃ¡sai ",],
		["Chat (Ãºj ablakban)","SzÃ¶vetsÃ©g Chat, Ãšj ablakban nyÃ­lik meg"],
		["Chat (keretben)","SzÃ¶vetsÃ©g Chat, a chat megjelenÃ­tÃ©se keretben, ÃºjratÃ¶ltÃ©s nÃ©lkÃ¼l "],
		["Harci kalkulÃ¡tor","Harc kikalkulÃ¡lÃ¡sa ... "],
		[ +alliancefullnm+" SzerszÃ¡mkÃ©szlet frissÃ­tÃ©se ","A legfrissebb script megszerzÃ©se"]];
		IslandLegendAllies="â€¢ SzÃ¶vetsÃ©gesek";
		IslandLegendNoAlliance="â€¢ Nincs szÃ¶vetsÃ©gben";
		IslandLegendEnemies="â€¢ EllensÃ©gek";
		TreatyAll="Minden jÃ¡tÃ©kos ellenÅ‘rizve. SÃ¡gra szÃ­nÅ±ekkel nincs egyezmÃ©ny, a szÃ¼rkÃ©kkel van.";
		TreatyYes="A jÃ¡tÃ©kossal kultÃºrÃ¡lis egyezmÃ©nyed van";
		TreatyNo="A jÃ¡tÃ©kossal nincs kultÃºrÃ¡lis egyezmÃ©nyed";
		updatenotification="Itt talÃ¡lhatÃ³ a "+alliancefullnm+" SzerszÃ¡mkÃ©szlet legÃºjabb vÃ¡ltozata.\n Klikkelj az OK gombra, ha szeretnÃ©d megnyitni a www.ika-core.org oldalt, Ã©s frissÃ­tenÃ©l.";
		txtplswait="KÃ©rlek vÃ¡rj";
		txtrefresh="FrissÃ­tÃ©s";
		txtpagedata="- Oldal lekÃ©rÃ©se";
		txtinfodata="- InfÃ³ lekÃ©rÃ©se";
		txtchkplayer="- JÃ¡tÃ©kos ellenÅ‘rzÃ©se";
		CultureTreaties="ultÃº"; //magic word for treaties fix
		CultureTreatiesCancel=" KultÃºrÃ¡lis egyezmÃ©ny megszÃ¼ntetÃ©se";
		CultureTreatiesRequest=" KultÃºrÃ¡lis egyezmÃ©ny felajÃ¡nlÃ¡sa";
	break;
	case 'br':
		CheckVersionBubbleNegative="Procurei por novas versÃµes do Core, nÃ£o hÃ¡ nenhuma disponÃ­vel no momento.";
		NewCoreVersion="Nova VersÃ£o do Core";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Clique e arraste para mover o Menu Lateral";
		SideBar_Search="Procurar";
		SideBar_SearchT="Procurar Jogadores/AlianÃ§as";
		SideBar_ToolsT="Links da AlianÃ§a";
		SideBar_Notes="AnotaÃ§Ãµes";
		SideBar_NotesT="AnotaÃ§Ãµes RÃ¡pidas";
		SideBar_Allies="Aliados";
		SideBar_AlliesT="Lista de Aliados";
		SideBar_Enemies="Inimigos";
		SideBar_EnemiesT="Jogadores Inimigos";
		SideBar_Friends="Amigos";
		SideBar_FriendsT="Lista de Amigos";
		SideBar_Games="Jogos";
		SideBar_GamesT="Menu de Jogos";
		SideBar_Indexing="IndexaÃ§Ã£o";
		SideBar_IndexingT="Progresso da IndexaÃ§Ã£o do Mundo";
		SideBar_Settings="PreferÃªncias";
		SideBar_SettingsT="PreferÃªncias - ConfiguraÃ§Ãµes Gerais ";
		SideBar_Chat="Bate-Papo";
		SideBar_ChatT="Bate-Papo Global";
		SideBar_Search_Add="Adicionar";     
		SideBar_Search_Save="Salvar";     
		SideBar_Search_QuickSearch="Busca RÃ¡pida";
		SideBar_Search_Player="Jogador";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Estado do Jogador";
		SideBar_Search_PlayerAll="Todos";
		SideBar_Search_PlayerUnknown="Desconhecido";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inativo";
		SideBar_Search_PlayerVacation="FÃ©rias";
		SideBar_Search_Alliance="AlianÃ§a";
		SideBar_Search_Radius="Raio";
		SideBar_Search_Search="Busca";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Busca AvanÃ§ada";
		SideBar_Search_EnemyAlliances="AlianÃ§as Inimigas";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Send Alliance<br> Message","Enviar mensagem para todos os aliados"],
		["Forum "+alliancefullnm,"Para o FÃ³rum da AlianÃ§a" ],
		[alliancefullnm +" novos posts","Para o FÃ³rum da AlianÃ§a, Ãºltimos posts ",],
		["Chatbox(New Window)","Bate-Papo da AlianÃ§a, abre em uma nova janela "],
		["Chatbox(Frame)","Bate-Papo da AlianÃ§a, mostra o chat em um frame que nÃ£o recarrega "],
		["Battle Calc","Calculadora de batalhas ... "],
		[" Update "+alliancefullnm+" Tools ","Pegar o Ãºltimo Script"]];
		IslandLegendAllies="â€¢ Aliados";
		IslandLegendNoAlliance="â€¢ Sem AlianÃ§a";
		IslandLegendEnemies="â€¢ Inimigos";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="VocÃª jÃ¡ tem um tratado cultural com esse jogador.";
		TreatyNo="NÃ£o foram encontrados tratados culturais com este jogador.";
		updatenotification="Existe uma nova versÃ£o das ferramentas da  "+alliancefullnm+".\n Clique em OK se vocÃª quer ir para www.ika-core.org e atualizar agora.";
		txtplswait="Por Favor Espere";
		txtrefresh="Atualizar";
		txtpagedata="- Criando PÃ¡gina";
		txtinfodata="- Conseguindo InformaÃ§Ã£o";
		txtchkplayer="- Checando Jogador";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancelar Tratado Cultural";
		CultureTreatiesRequest=" Requisitar Tratado Cultural";
	break;
	case 'ru':
		CheckVersionBubbleNegative="ÐÐµÑ‚Ñƒ Ð½Ð¾Ð²Ñ‹Ñ… Ð²ÐµÑ€ÑÐ¸Ð¹ Ð² Ð´Ð°Ð½Ð½Ñ‹Ð¹ Ð¼Ð¾Ð¼ÐµÐ½Ñ‚.";
		NewCoreVersion="ÐÐ¾Ð²Ð°Ñ Ð²ÐµÑ€ÑÐ¸Ñ ÑÐ´Ñ€Ð°";
		SideBar_News="ÐÐ¾Ð²Ð¾ÑÑ‚Ð¸";
		SideBar_NewsT="Ika-Core Ð¾ÑÐ½Ð¾Ð²Ð½Ñ‹Ðµ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ñ";
		SideBar_Drag="Ð£Ð´ÐµÑ€Ð¶Ð¸Ð²Ð°Ð¹Ñ‚Ðµ Ð¸ Ð´Ð²Ð¸Ð³Ð°Ð¹Ñ‚Ðµ Ð´Ð»Ñ Ð¿ÐµÑ€ÐµÐ¼ÐµÑ‰ÐµÐ½Ð¸Ñ Ð±Ð¾ÐºÐ¾Ð²Ð¾Ð³Ð¾ Ð¼ÐµÐ½ÑŽ";
		SideBar_Search="ÐŸÐ¾Ð¸ÑÐº";
		SideBar_SearchT="ÐŸÐ¾Ð¸ÑÐº Ð¸Ð³Ñ€Ð¾ÐºÐ°/Ð°Ð»ÑŒÑÐ½ÑÐ°";
		SideBar_ToolsT="Ð¡ÑÑ‹Ð»ÐºÐ¸ Ð½Ð° Ð°Ð»ÑŒÑÐ½Ñ";
		SideBar_Notes="Ð—Ð°Ð¼ÐµÑ‚ÐºÐ¸";
		SideBar_NotesT="Ð‘Ñ‹ÑÑ‚Ñ€Ñ‹Ðµ Ð·Ð°Ð¼ÐµÑ‚ÐºÐ¸";
		SideBar_Allies="Ð¡Ð¾ÑŽÐ·Ð½Ð¸ÐºÐ¸";
		SideBar_AlliesT="Ð¡Ð¿Ð¸ÑÐ¾Ðº ÑÐ¾ÑŽÐ·Ð½Ð¸ÐºÐ¾Ð²";
		SideBar_Enemies="Ð’Ñ€Ð°Ð³Ð¸";
		SideBar_EnemiesT="Ð¡Ð¿Ð¸ÑÐ¾Ðº Ð²Ñ€Ð°Ð³Ð¾Ð²";
		SideBar_Friends="Ð”Ñ€ÑƒÐ·ÑŒÑ";
		SideBar_FriendsT="Ð¡Ð¿Ð¸ÑÐ¾Ðº Ð´Ñ€ÑƒÐ·ÐµÐ¹";
		SideBar_Games="Ð˜Ð³Ñ€Ñ‹";
		SideBar_GamesT="ÐœÐµÐ½ÑŽ Ð¸Ð³Ñ€Ñ‹";
		SideBar_Indexing="Indexing";
		SideBar_IndexingT="ÐŸÑ€Ð¾Ð³Ñ€ÐµÑÑ Ð¼Ð¸Ñ€Ð°";
		SideBar_Settings="ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸";
		SideBar_SettingsT="ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸ - ÐžÐ±Ñ‰Ð°Ñ ÐºÐ¾Ð½Ñ„Ð¸Ð³ÑƒÑ€Ð°Ñ†Ð¸Ñ ";
		SideBar_Chat="Ð§Ð°Ñ‚";
		SideBar_ChatT="Ð“Ð»Ð¾Ð±Ð°Ð»ÑŒÐ½Ñ‹Ð¹ Ñ‡Ð°Ñ‚";
		SideBar_Search_Add="Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ";      
		SideBar_Search_Save="Ð¡Ð¾Ñ…Ñ€Ð°Ð½Ð¸Ñ‚ÑŒ";      
		SideBar_Search_QuickSearch="Ð‘Ñ‹ÑÑ‚Ñ€Ñ‹Ð¹ Ð¿Ð¾Ð¸ÑÐº";
		SideBar_Search_Player="Ð˜Ð³Ñ€Ð¾Ðº";
		SideBar_Search_City="Ð“Ð¾Ñ€Ð¾Ð´";
		SideBar_Search_PlayerStatus="Ð˜Ð³Ñ€Ð¾Ð²Ð¾Ð¹ ÑÑ‚Ð°Ñ‚ÑƒÑ";
		SideBar_Search_PlayerAll="Ð’ÑÐµ";
		SideBar_Search_PlayerUnknown="ÐÐµÐ¾Ð¿Ñ€ÐµÐ´ÐµÐ»Ñ‘Ð½Ð½Ñ‹Ðµ";
		SideBar_Search_PlayerNormal="ÐÐ¾Ñ€Ð¼Ð°Ð»ÑŒÐ½Ñ‹Ðµ";
		SideBar_Search_PlayerInactive="ÐÐµÐ°ÐºÑ‚Ð¸Ð²Ð½Ñ‹Ðµ";
		SideBar_Search_PlayerVacation="Ð’ Ð¾Ñ‚Ð¿ÑƒÑÐºÐµ";
		SideBar_Search_Alliance="ÐÐ»ÑŒÑÐ½Ñ";
		SideBar_Search_Radius="Ð Ð°Ð´Ð¸ÑƒÑ";
		SideBar_Search_Search="ÐŸÐ¾Ð¸ÑÐº";
		SideBar_Search_Clear="ÐžÑ‡Ð¸ÑÑ‚Ð¸Ñ‚ÑŒ";
		SideBar_Search_AdvancedSearch="Ð Ð°ÑÑˆÐ¸Ñ€ÐµÐ½Ð½Ñ‹Ð¹ Ð¿Ð¾Ð¸ÑÐº";
		SideBar_Search_EnemyAlliances="Ð’Ñ€Ð°Ð¶ÐµÑÐºÐ¸Ðµ Ð°Ð»ÑŒÑÐ½ÑÑ‹";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ ÐÐ»ÑŒÑÐ½ÑÑƒ<br> Ð¡Ð¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ","ÐžÑ‚Ð¿Ñ€Ð°Ð²Ð¸Ñ‚ÑŒ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ Ð²ÑÐµÐ¼ ÑÐ¾ÑŽÐ·Ð½Ð¸ÐºÐ°Ð¼"],
		["Ð¤Ð¾Ñ€ÑƒÐ¼ "+alliancefullnm,"ÐÐ° Ñ„Ð¾Ñ€ÑƒÐ¼ Ð°Ð»ÑŒÑÐ½ÑÐ° " ],
		[alliancefullnm +" Ð½Ð¾Ð²Ñ‹Ðµ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ Ð½Ð° Ñ„Ð¾Ñ€ÑƒÐ¼Ðµ","Ðš Ð¿Ð¾ÑÐ»ÐµÐ´Ð½Ð¸Ð¼ ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ Ð½Ð° Ñ„Ð¾Ñ€ÑƒÐ¼Ðµ Ð°Ð»ÑŒÑÐ½ÑÐ° ",],
		["Chatbox(Ð’ Ð½Ð¾Ð²Ð¾Ð¼ Ð¾ÐºÐ½Ðµ)","Ð§Ð°Ñ‚ Ð°Ð»ÑŒÑÐ½ÑÐ°, Ð¾Ñ‚ÐºÑ€Ñ‹Ð²Ð°ÐµÑ‚ÑÑ Ð² Ð½Ð¾Ð²Ð¾Ð¼ Ð¾ÐºÐ½Ðµ"],
		["Chatbox(Frame)","Ð§Ð°Ñ‚ Ð°Ð»ÑŒÑÐ½ÑÐ°, Ñ‡Ð°Ñ‚ Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶Ð°ÐµÑ‚ÑÑ Ð² frames Ð±ÐµÐ· Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ñ "],
		["ÐšÐ°Ð»ÑŒÐºÑƒÐ»ÑÑ‚Ð¾Ñ€ Ð±Ð¸Ñ‚Ð²","Ð’Ñ‹Ñ‡Ð¸ÑÐ»ÐµÐ½Ð¸Ðµ Ð±Ð¸Ñ‚Ð²Ñ‹ ... "],
		[" ÐžÐ±Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ "+alliancefullnm+" Tools ","ÐŸÐ¾Ð»ÑƒÑ‡Ð¸Ñ‚ÑŒ Ð¿Ð¾ÑÐ»ÐµÐ´Ð½Ð¸Ð¹ ÑÐºÑ€Ð¸Ð¿Ñ‚"]];
		IslandLegendAllies="â€¢ Ð¡Ð¾ÑŽÐ·Ð½Ð¸ÐºÐ¸";
		IslandLegendNoAlliance="â€¢ ÐÐµÐ¹Ñ‚Ñ€Ð°Ð»ÑŒÐ½Ñ‹Ðµ";
		IslandLegendEnemies="â€¢ Ð’Ñ€Ð°Ð³Ð¸";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="Ð’Ñ‹ Ð¸Ð¼ÐµÐµÑ‚Ðµ ÐºÑƒÐ»ÑŒÑ‚ÑƒÑ€Ð½Ñ‹Ð¹ Ð´Ð¾Ð³Ð¾Ð²Ð¾Ñ€ Ñ ÑÑ‚Ð¸Ð¼ Ð¸Ð³Ñ€Ð¾ÐºÐ¾Ð¼";
		TreatyNo="ÐÐ¸ÐºÐ°ÐºÐ¸Ðµ ÐºÑƒÐ»ÑŒÑ‚ÑƒÑ€Ð½Ñ‹Ðµ Ð´Ð¾Ð³Ð¾Ð²Ð¾Ñ€Ð° Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ñ‹ Ð´Ð»Ñ ÑÑ‚Ð¾Ð³Ð¾ Ð¸Ð³Ñ€Ð¾ÐºÐ°.";
		updatenotification="Ð•ÑÑ‚ÑŒ Ð±Ð¾Ð»ÐµÐµ Ð½Ð¾Ð²Ð°Ñ Ð²ÐµÑ€ÑÐ¸Ñ "+alliancefullnm+" Tools.\n ÐÐ°Ð¶Ð¼Ð¸Ñ‚Ðµ Ð½Ð° OK, ÐµÑÐ»Ð¸ Ð’Ñ‹ Ñ…Ð¾Ñ‚Ð¸Ñ‚Ðµ Ð¿ÐµÑ€ÐµÐ¹Ñ‚Ð¸ Ð½Ð° www.ika-core.org Ð¸ Ð¾Ð±Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ ÑÐµÐ¹Ñ‡Ð°Ñ.";
		txtplswait="ÐŸÐ¾Ð¶Ð°Ð»ÑƒÐ¹ÑÑ‚Ð° Ð¿Ð¾Ð´Ð¾Ð¶Ð´Ð¸Ñ‚Ðµ";
		txtrefresh="ÐžÐ±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ";
		txtpagedata="- ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ð¡Ñ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹";
		txtinfodata="- ÐŸÐ¾Ð»ÑƒÑ‡ÐµÐ½Ð¸Ðµ Ð˜Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ð¸";
		txtchkplayer="- ÐŸÑ€Ð¾Ð²ÐµÑ€ÐºÐ° Ð¸Ð³Ñ€Ð¾ÐºÐ°";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" ÐžÑ‚Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ ÐšÑƒÐ»ÑŒÑ‚ÑƒÑ€Ð½Ñ‹Ð¹ Ð”Ð¾Ð³Ð¾Ð²Ð¾Ñ€";
		CultureTreatiesRequest=" Ð—Ð°Ð¿Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ ÐšÑƒÐ»ÑŒÑ‚ÑƒÑ€Ð½Ñ‹Ð¹ Ð”Ð¾Ð³Ð¾Ð²Ð¾Ñ€";
      break;
	case 'pl':
		CheckVersionBubbleNegative="Aktualnie nie ma nowej wersji skryptu";
		NewCoreVersion="Nowa wersja skryptu";
		SideBar_News="NowoÅ›ci"; //NEW
		SideBar_NewsT="NowoÅ›ci na temat wersji Ika-Core"; //NEW
		SideBar_Drag="Kliknij i przeciÄ…gnij aby przesunÄ…Ä‡ SideBar";
		SideBar_Search="Wyszukaj";
		SideBar_SearchT="Wyszukaj gracza/sojusz";
		SideBar_ToolsT="Linki sojuszu";
		SideBar_Notes="Notatki";
		SideBar_NotesT="Szybkie notatki";
		SideBar_Allies="Sojusze";
		SideBar_AlliesT="Lista sojuszy";
		SideBar_Enemies="Wrogowie";
		SideBar_EnemiesT="Lista wrogÃ³w";
		SideBar_Friends="Przyjaciele";
		SideBar_FriendsT="Lista przyjaciÃ³Å‚";
		SideBar_Games="Gry";
		SideBar_GamesT="Menu gier";
		SideBar_Indexing="Indeksowanie";
		SideBar_IndexingT="PostÄ™p indeksowania Å›wiata";
		SideBar_Settings="Ustawienia";
		SideBar_SettingsT="Ustawienia - OgÃ³lne ";
		SideBar_Chat="Czat";
		SideBar_ChatT="Czat ogÃ³lny";
		SideBar_Search_Add="Dodaj";     
		SideBar_Search_Save="Zapisz";     
		SideBar_Search_QuickSearch="Szybkie wyszukiwanie";
		SideBar_Search_Player="Gracz";
		SideBar_Search_City="Miasto"; //NEW
		SideBar_Search_PlayerStatus="Status gracza";
		SideBar_Search_PlayerAll="Wszystkie";
		SideBar_Search_PlayerUnknown="Nieznany";
		SideBar_Search_PlayerNormal="Normalny";
		SideBar_Search_PlayerInactive="Nieaktywny";
		SideBar_Search_PlayerVacation="Urlop";
		SideBar_Search_Alliance="Sojusz";
		SideBar_Search_Radius="PromieÅ„";
		SideBar_Search_Search="Szukaj";
		SideBar_Search_Clear="WyczyÅ›Ä‡"; //NEW
		SideBar_Search_AdvancedSearch="Wyszukiwanie zaawansowane";
		SideBar_Search_EnemyAlliances="Wrogie sojusze";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["WyÅ›lij wiadomoÅ›Ä‡ sojuszowÄ…","WyÅ›lij wiadomoÅ›Ä‡ do wszystkich sojusznikÃ³w"],
		["Forum "+alliancefullnm,"do forum sojuszu " ],
		[alliancefullnm +" nowe posty na forum","PrzejdÅº do najnowych postÃ³w na forum sojuszu ",],
		["Czat(Nowe okno)","Czat sojuszu w nowym oknie"],
		["Czat(Ramka)","Czat sojuszu w ramce, bez odÅ›wieÅ¼ania "],
		["Kalkulator bitw","SprawdÅº swoje szanse w bitwie "],
		[" Uaktualnienie "+alliancefullnm+" Tools ","Pobiera najnowszÄ… wersje skryptu"]];
		IslandLegendAllies="â€¢ Sojusz";
		IslandLegendNoAlliance="â€¢ Brak sojuszu";
		IslandLegendEnemies="â€¢ WrÃ³g";
		TreatyAll="Wszyscy gracze zostali sprawdzeni - kolor Å¼Ã³Å‚ty oznacza brak traktatu, szary juÅ¼ podpisany traktat.";
		TreatyYes="JuÅ¼ masz podpisany traktat kulturowy z tym graczem.";
		TreatyNo="Brak podpisanych traktatÃ³w kulturowych z tym graczem.";
		updatenotification="PojawiÅ‚a sie nowa wersja "+alliancefullnm+" Tools.\n Kliknij OK jeÅ›li chcesz przejÅ›Ä‡ do www.ika-core.org i zaktualizowaÄ‡ skrypt.";
		txtplswait="ProszÄ™ czekaÄ‡";
		txtrefresh="OdÅ›wieÅ¼";
		txtpagedata="- Pobieram stronÄ™";
		txtinfodata="- Pobieram informacje";
		txtchkplayer="- Sprawdzam gracza";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Zerwij traktat kulturowy";
		CultureTreatiesRequest=" PoproÅ› o traktat kulturowy";
	break;
	case 'rs':
		CheckVersionBubbleNegative=   "ÐŸÑ€Ð¾Ð²ÐµÑ€Ð¸Ð¾ ÑÐ°Ð¼ Ð´Ð° Ð»Ð¸ Ð¿Ð¾ÑÑ‚Ð¾Ñ˜Ð¸ Ð½Ð¾Ð²Ð¸Ñ˜Ð° Ð²ÐµÑ€Ð·Ð¸Ñ˜Ð°, Ñ‚Ñ€ÐµÐ½ÑƒÑ‚Ð½Ð¾ Ð½ÐµÐ¼Ð° Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¸Ñ….";
		NewCoreVersion="ÐÐ¾Ð²Ð° Core Ð²ÐµÑ€Ð·Ð¸Ñ˜Ð°";
		SideBar_News="ÐÐ¾Ð²Ð¾ÑÑ‚Ð¸"; //NEW
		SideBar_NewsT="Ika-Core Ð½Ð¾Ð²Ð¾ÑÑ‚Ð¸ Ð¾ Ð¸Ð·Ð´Ð°ÑšÐ¸Ð¼Ð°"; //NEW
		SideBar_Drag="ÐšÐ»Ð¸ÐºÐ½Ð¸ Ð¸ Ð¿Ñ€ÐµÐ²ÑƒÑ†Ð¸ Ð´Ð° Ð¿Ñ€ÐµÐ¼ÐµÑÑ‚Ð¸Ñˆ Ð¼ÐµÐ½Ð¸";
		SideBar_Search="ÐŸÑ€ÐµÑ‚Ñ€Ð°Ð³Ð°";
		SideBar_SearchT="Ð¢Ñ€Ð°Ð¶ÐµÑšÐµ Ð¸Ð³Ñ€Ð°Ñ‡Ð°/ÑÐ°Ð²ÐµÐ·Ð°";
		SideBar_ToolsT="Ð›Ð¸Ð½ÐºÐ¾Ð²Ð¸ ÑÐ°Ð²ÐµÐ·Ð°";
		SideBar_Notes="Ð‘ÐµÐ»ÐµÑˆÐºÐµ";
		SideBar_NotesT="ÐšÑ€Ð°Ñ‚ÐºÐµ Ð±ÐµÐ»ÐµÑˆÐºÐµ";
		SideBar_Allies="Ð¡Ð°Ð²ÐµÐ·Ð½Ð¸Ñ†Ð¸";
		SideBar_AlliesT="Ð¡Ð¿Ð¸ÑÐ°Ðº ÑÐ°Ð²ÐµÐ·Ð½Ð¸ÐºÐ°";
		SideBar_Enemies="ÐÐµÐ¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™Ð¸";
		SideBar_EnemiesT="ÐÐµÐ¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™ÑÐºÐ¸ Ð¸Ð³Ñ€Ð°Ñ‡Ð¸";
		SideBar_Friends="ÐÐµÐ¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™ÑÐºÐ¸ ÑÐ°Ð²ÐµÐ·Ð¸";
		SideBar_FriendsT="Ð¡Ð¿Ð¸ÑÐ°Ðº Ð¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™Ð°";
		SideBar_Games="Ð˜Ð³Ñ€Ð¸Ñ†Ðµ";
		SideBar_GamesT="Ð˜Ð·Ð±Ð¾Ñ€ Ð¸Ð³Ñ€Ð¸Ñ†Ð°";
		SideBar_Indexing="Ð˜Ð½Ð´ÐµÐºÑÐ¸Ñ€Ð°ÑšÐµ";
		SideBar_IndexingT="ÐÐ°Ð¿Ñ€ÐµÐ´Ð°Ðº Ð¸Ð½Ð´ÐµÐºÑÐ¸Ñ€Ð°ÑšÐ° ÑÐ²ÐµÑ‚Ð°";
		SideBar_Settings="ÐŸÐ¾Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐ°";
		SideBar_SettingsT="ÐŸÐ¾Ð´ÐµÑˆÐ°Ð²Ð°ÑšÐ° - Ð¾Ð¿ÑˆÑ‚Ð° ÐºÐ¾Ð½Ñ„Ð¸Ð³ÑƒÑ€Ð°Ñ†Ð¸Ñ˜Ð°";
		SideBar_Chat="Ð‹Ð°ÑÐºÐ°ÑšÐµ";
		SideBar_ChatT="ÐžÐ¿ÑˆÑ‚Ð¾ Ñ›Ð°ÑÐºÐ°ÑšÐµ";
		SideBar_Search_Add="Ð”Ð¾Ð´Ð°Ñ˜";     
		SideBar_Search_Save="Ð¡Ð°Ñ‡ÑƒÐ²Ð°Ñ˜";     
		SideBar_Search_QuickSearch="Ð‘Ñ€Ð·Ð° Ð¿Ñ€ÐµÑ‚Ñ€Ð°Ð³Ð°";
		SideBar_Search_Player="Ð˜Ð³Ñ€Ð°Ñ‡";
		SideBar_Search_City="Ð“Ñ€Ð°Ð´"; //NEW
		SideBar_Search_PlayerStatus="Ð¡Ñ‚Ð°Ñ‚ÑƒÑ Ð¸Ð³Ñ€Ð°Ñ‡Ð°";
		SideBar_Search_PlayerAll="Ð¡Ð²Ð¸";
		SideBar_Search_PlayerUnknown="ÐÐµÐ¿Ð¾Ð·Ð½Ð°Ñ‚";
		SideBar_Search_PlayerNormal="ÐÐºÑ‚Ð¸Ð²Ð°Ð½";
		SideBar_Search_PlayerInactive="ÐÐµÐ°ÐºÑ‚Ð¸Ð²Ð°Ð½";
		SideBar_Search_PlayerVacation="ÐžÐ´ÑÑƒÑ‚Ð°Ð½";
		SideBar_Search_Alliance="Ð¡Ð°Ð²ÐµÐ·";
		SideBar_Search_Radius="Ð£Ð´Ð°Ñ™ÐµÐ½Ð¾ÑÑ‚";
		SideBar_Search_Search="Ð¢Ñ€Ð°Ð¶Ð¸";
		SideBar_Search_Clear="ÐžÑ‡Ð¸ÑÑ‚Ð¸"; //NEW
		SideBar_Search_AdvancedSearch="ÐÐ°Ð¿Ñ€ÐµÐ´Ð½Ð° Ð¿Ñ€ÐµÑ‚Ñ€Ð°Ð³Ð°";
		SideBar_Search_EnemyAlliances="ÐÐµÐ¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™ÑÐºÐ¸ ÑÐ°Ð²ÐµÐ·Ð¸";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["ÐŸÐ¾ÑˆÐ°Ñ™Ð¸ ÐºÑ€ÑƒÐ¶Ð½Ñƒ<br> Ð¿Ð¾Ñ€ÑƒÐºÑƒ","ÐŸÐ¾ÑˆÐ°Ñ™Ð¸ Ð¿Ð¾Ñ€ÑƒÐºÑƒ ÑÐ²Ð¸Ð¼ ÑÐ°Ð²ÐµÐ·Ð½Ð¸Ñ†Ð¸Ð¼Ð°"],
		["Ð¤Ð¾Ñ€ÑƒÐ¼ "+alliancefullnm,"ÐŸÐ¾ÑÐµÑ‚Ð¸ Ñ„Ð¾Ñ€ÑƒÐ¼ ÑÐ°Ð²ÐµÐ·Ð° " ],
		[alliancefullnm +" Ð½Ð¾Ð²Ðµ Ð¿Ð¾Ñ€ÑƒÐºÐµ Ð½Ð° Ñ„Ð¾Ñ€ÑƒÐ¼Ñƒ","ÐŸÑ€Ð¾Ñ‡Ð¸Ñ‚Ð°Ñ˜ Ð¿Ð¾ÑÐ»ÐµÐ´ÑšÐµ Ð¿Ð¾Ñ€ÑƒÐºÐµ Ð½Ð° Ñ„Ð¾Ñ€ÑƒÐ¼Ñƒ ÑÐ°Ð²ÐµÐ·Ð° ",],
		["Ð‹Ð°ÑÐºÐ°ÑšÐµ(Ð½Ð¾Ð²Ð¸ Ð¿Ñ€Ð¾Ð·Ð¾Ñ€)","Ð¡Ð°Ð²ÐµÐ·Ð½Ð¾ Ñ›Ð°ÑÐºÐ°ÑšÐµ, Ð¾Ñ‚Ð²Ð°Ñ€Ð° ÑÐµ Ñƒ Ð½Ð¾Ð²Ð¾Ð¼ Ð¿Ñ€Ð¾Ð·Ð¾Ñ€Ñƒ"],
		["Ð‹Ð°ÑÐºÐ°ÑšÐµ(Ð¾ÐºÐ²Ð¸Ñ€)","Ð¡Ð°Ð²ÐµÐ·Ð½Ð¾ Ñ›Ð°ÑÐºÐ°ÑšÐµ, Ð¿Ñ€Ð¸ÐºÐ°Ð·ÑƒÑ˜Ðµ Ñ›Ð°ÑÐºÐ°ÑšÐµ Ð¿Ð¾Ð¼Ð¾Ñ›Ñƒ Ð¾ÐºÐ²Ð¸Ñ€Ð° - Ð±ÐµÐ· Ð½Ð¾Ð²Ð¾Ð³ ÑƒÑ‡Ð¸Ñ‚Ð°Ð²Ð°ÑšÐ° "],
		["ÐšÐ°Ð»ÐºÑƒÐ»Ð°Ñ‚Ð¾Ñ€ Ð±Ð¾Ñ€Ð±Ðµ","ÐŸÑ€ÐµÐ´Ð²Ð¸Ñ’Ð° Ð¸ÑÑ…Ð¾Ð´ Ð±Ð¸Ñ‚ÐºÐµ ... "],
		[" ÐÐ¶ÑƒÑ€Ð¸Ñ€Ð°Ñ˜ "+alliancefullnm+" Ð°Ð»Ð°Ñ‚Ðµ ","ÐŸÑ€ÐµÑƒÐ·Ð¸Ð¼Ð°ÑšÐµ Ð½Ð°Ñ˜ÑÐ²ÐµÐ¶Ð¸Ñ˜Ðµ ÑÐºÑ€Ð¸Ð¿Ñ‚Ðµ"]];
		IslandLegendAllies="â€¢ Ð¡Ð°Ð²ÐµÐ·Ð½Ð¸Ñ†Ð¸";
		IslandLegendNoAlliance="â€¢ Ð‘ÐµÐ· ÑÐ°Ð²ÐµÐ·Ð°";
		IslandLegendEnemies="â€¢ ÐÐµÐ¿Ñ€Ð¸Ñ˜Ð°Ñ‚ÐµÑ™Ð¸";
		TreatyAll="Ð¡Ð²Ð¸ Ð¸Ð³Ñ€Ð°Ñ‡Ð¸ ÑÑƒ Ð¿Ñ€Ð¾Ð²ÐµÑ€ÐµÐ½Ð¸. Ð–ÑƒÑ‚Ð¾Ð¼ Ð±Ð¾Ñ˜Ð¾Ð¼ ÑÑƒ Ð¾Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸ Ð¸Ð³Ñ€Ð°Ñ‡Ð¸ ÑÐ° ÐºÐ¾Ñ˜Ð¸Ð¼Ð° Ð½ÐµÐ¼Ð°Ñ‚Ðµ ÑÐ¿Ð¾Ñ€Ð°Ð·ÑƒÐ¼, Ð° ÑÐ¸Ð²Ð¾Ð¼ Ð¾Ð½Ð¸ ÑÐ° ÐºÐ¾Ñ˜Ð¸Ð¼Ð° Ð¸Ð¼Ð°Ñ‚Ðµ.";
		TreatyYes="Ð’ÐµÑ› Ð¸Ð¼Ð°Ñ‚Ðµ ÐºÑƒÐ»Ñ‚ÑƒÑ€Ð½Ð¸ ÑÐ¿Ð¾Ñ€Ð°Ð·ÑƒÐ¼ ÑÐ° Ð¾Ð²Ð¸Ð¼ Ð¸Ð³Ñ€Ð°Ñ‡ÐµÐ¼";
		TreatyNo="ÐšÑƒÐ»Ñ‚ÑƒÑ€Ð½Ð¸ ÑÐ¿Ð¾Ñ€Ð°Ð·ÑƒÐ¼Ð¸ ÑÐ° Ð¾Ð²Ð¸Ð¼ Ð¸Ð³Ñ€Ð°Ñ‡ÐµÐ¼ Ð½Ð¸ÑÑƒ Ð½Ð°Ñ’ÐµÐ½Ð¸.";
		updatenotification="ÐŸÐ¾ÑÑ‚Ð¾Ñ˜Ð¸ Ð½Ð¾Ð²Ð¸Ñ˜Ð° Ð²ÐµÑ€Ð·Ð¸Ñ˜Ð° ÑÐºÑ€Ð¸Ð¿Ñ‚Ðµ "+alliancefullnm+" Ð°Ð»Ð°Ñ‚Ð¸.\n ÐšÐ»Ð¸ÐºÐ½Ð¸Ñ‚Ðµ ÐžÐš Ð°ÐºÐ¾ Ð¶ÐµÐ»Ð¸Ñ‚Ðµ Ð´Ð° Ð¿Ð¾ÑÐµÑ‚Ð¸Ñ‚Ðµ www.ika-core.org Ð¸ Ð¿Ñ€ÐµÑƒÐ·Ð¼ÐµÑ‚Ðµ Ñ˜Ðµ.";
		txtplswait="ÐœÐ¾Ð»Ð¸Ð¼Ð¾, ÑÐ°Ñ‡ÐµÐºÐ°Ñ˜Ñ‚Ðµ";
		txtrefresh="ÐžÑÐ²ÐµÐ¶Ð¸";
		txtpagedata="- ÐŸÑ€Ð¸Ð¿Ñ€ÐµÐ¼Ð°ÑšÐµ ÑÑ‚Ñ€Ð°Ð½Ðµ";
		txtinfodata="- ÐŸÑ€Ð¸Ð¿Ñ€ÐµÐ¼Ð°ÑšÐµ Ð¸Ð½Ñ„Ð¾Ñ€Ð¼Ð°Ñ†Ð¸Ñ˜Ð°";
		txtchkplayer="- ÐŸÑ€Ð¾Ð²ÐµÑ€Ð°Ð²Ð°ÑšÐµ Ð¸Ð³Ñ€Ð°Ñ‡Ð°";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" ÐžÑ‚ÐºÐ°Ð¶Ð¸ ÐºÑƒÐ»Ñ‚ÑƒÑ€Ð½Ð¸ ÑÐ¿Ð¾Ñ€Ð°Ð·ÑƒÐ¼";
		CultureTreatiesRequest=" ÐŸÐ¾Ð½ÑƒÐ´Ð¸ ÐºÑƒÐ»Ñ‚ÑƒÑ€Ð½Ð¸ ÑÐ¿Ð¾Ñ€Ð°Ð·ÑƒÐ¼";
	break;
	case 'ba':
		CheckVersionBubbleNegative="Provereno za nove verzije, trenutno nema dostupnih.";
		NewCoreVersion="Nova Core Verzija";
		SideBar_News="Novosti"; //NEW
		SideBar_NewsT="Ika-Core release novosti"; //NEW
		SideBar_Drag="Pritisni i Prevuci za pomeranje SideBara";
		SideBar_Search="Pretraga";
		SideBar_SearchT="TraÅ¾i igraÄa/savez";
		SideBar_ToolsT="Savezni linkovi";
		SideBar_Notes="BeleÅ¡ke";
		SideBar_NotesT="Brze BeleÅ¡ke";
		SideBar_Allies="Saveznici";
		SideBar_AlliesT="Saveznici - Lista";
		SideBar_Enemies="Neprijatelji";
		SideBar_EnemiesT="Neprijateljski IgraÄi";
		SideBar_Friends="Prijatelji";
		SideBar_FriendsT="Lista Prijatelja";
		SideBar_Games="Igre";
		SideBar_GamesT="Meni Igara";
		SideBar_Indexing="Indeksiranje";
		SideBar_IndexingT="Indeksiranje Sveta u Toku";
		SideBar_Settings="PodeÅ¡avanja";
		SideBar_SettingsT="PodeÅ¡avanja - OpÅ¡ta PodeÅ¡avanja ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Globalni Chat";
		SideBar_Search_Add="Dodaj";     
		SideBar_Search_Save="SaÄuvaj";     
		SideBar_Search_QuickSearch="Brza Pretraga";
		SideBar_Search_Player="IgraÄ";
		SideBar_Search_City="Grad"; //NEW
		SideBar_Search_PlayerStatus="Status IgraÄa";
		SideBar_Search_PlayerAll="Svi";
		SideBar_Search_PlayerUnknown="Nepoznati";
		SideBar_Search_PlayerNormal="Standardni";
		SideBar_Search_PlayerInactive="Neaktivni";
		SideBar_Search_PlayerVacation="Odmor";
		SideBar_Search_Alliance="Savez";
		SideBar_Search_Radius="Radijus";
		SideBar_Search_Search="Pretraga";
		SideBar_Search_Clear="ObriÅ¡i"; //NEW
		SideBar_Search_AdvancedSearch="Napredna Pretraga";
		SideBar_Search_EnemyAlliances="Neprijateljski Savezi";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Send Alliance<br> Message","PoÅ¡alji poruku svim saveznicima"],
		["Forum "+alliancefullnm,"SkoÄi na Forum Saveza " ],
		[alliancefullnm +" new forum posts","Skoi na Forum Saveza, poslednje poruke ",],
		["Chatbox(New Window)","Savezni Chat, otvara se u novom prozoru"],
		["Chatbox(Frame)","Savezni Chat, prikazuje chat u okvirima bez novog uÄitavanja "],
		["Battle Calc","PreraÄunava bitku ... "],
		[" Update "+alliancefullnm+" Tools ","Preuzmi najsveÅ¾iju skriptu"]];
		IslandLegendAllies="â€¢ Saveznici";
		IslandLegendNoAlliance="â€¢ Bez Saveza";
		IslandLegendEnemies="â€¢ Neprijatelji";
		TreatyAll="Svi igraÄi su provereni. Å½uta boja predstavlja bez ugovora, Siva za postojeÄ‡e.";
		TreatyYes="VeÄ‡ imate kulturni Sporazum sa ovim igraÄem";
		TreatyNo="Nema kulturnih Sporazuma pronaÄ‘enih za ovog igraÄa.";
		updatenotification="Postoji sveÅ¾ija verzija "+alliancefullnm+" Alata.\n Kliknite na OK ako Å¾elite da odete na www.ika-core.org i aÅ¾urirate sada.";
		txtplswait="Molimo SaÄekajte";
		txtrefresh="OsveÅ¾i";
		txtpagedata="- Pripremam Stranu";
		txtinfodata="- Pripremam Info";
		txtchkplayer="- Provera IgraÄa";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" OtkaÅ¾i Kulturni Sporazum";
		CultureTreatiesRequest=" ZatraÅ¾i Kulturni Sporazum";
	break;
	case 'ae':
		CheckVersionBubbleNegative=   "Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø­Ø§Ù„ÙŠØ§ Ø£ÙŠ Ù†Ø³Ø®Ø© Ø¬Ø¯ÙŠØ¯Ø©";
		NewCoreVersion="Ù†Ø³Ø®Ø© Ø¬Ø¯ÙŠØ¯Ø©";
		SideBar_News="Ø£Ø®Ø¨Ø§Ø±"; //NEW
		SideBar_NewsT="Ika-Core Ø£Ø®Ø¨Ø§Ø±"; //NEW
		SideBar_Drag="Ø§Ø³Ø­Ø¨ Ùˆ Ø§ÙÙ„Øª Ù„ØªØ­Ø±Ùƒ Ø§Ù„Ø´Ø±ÙŠØ·";
		SideBar_Search="Ø¨Ø­Ø«";
		SideBar_SearchT="Ø¨Ø­Ø« Ø¹Ù† Ù„Ø§Ø¹Ø¨ÙŠÙ† / ØªØ­Ø§Ù„ÙØ§Øª";
		SideBar_ToolsT="Ø±ÙˆØ§Ø¨Ø· Ø§Ù„ØªØ­Ø§Ù„Ù";
		SideBar_Notes="Ø§Ù„Ù…Ù„Ø§Ø­Ø¸Ø§Øª";
		SideBar_NotesT="Ù…Ù„Ø§Ø­Ø¸Ø§Øª Ø³Ø±ÙŠØ¹Ø©";
		SideBar_Allies="Ø§Ù„Ø­Ù„ÙØ§Ø¡";
		SideBar_AlliesT="Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø­Ù„ÙØ§Ø¡";
		SideBar_Enemies="Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¡";
		SideBar_EnemiesT="Ø§Ù„Ù„Ø§Ø¹Ø¨ÙˆÙ† Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¡";
		SideBar_Friends="Ø§Ù„Ø£ØµØ¯Ù‚Ø§Ø¡";
		SideBar_FriendsT="Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø£ØµØ¯Ù‚Ø§Ø¡";
		SideBar_Games="Ø§Ù„Ø£Ù„Ø¹Ø§Ø¨";
		SideBar_GamesT="Ù‚Ø§Ø¦Ù…Ø© Ø§Ù„Ø£Ù„Ø¹Ø§Ø¨";
		SideBar_Indexing="ÙÙ‡Ø±Ø³";
		SideBar_IndexingT="Ø¹Ù…Ù„ÙŠØ© ÙÙ‡Ø±Ø³Ø© Ø§Ù„Ø¹Ø§Ù„Ù…";
		SideBar_Settings="Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª";
		SideBar_SettingsT="Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø¹Ø§Ù…Ø© ";
		SideBar_Chat="Ù…Ø­Ø§Ø¯Ø«Ø©";
		SideBar_ChatT="Ù…Ø­Ø§Ø¯Ø«Ø© Ø¹Ø§Ù„Ù…ÙŠØ©";
		SideBar_Search_Add="Ø£Ø¶Ù";     
		SideBar_Search_Save="Ø­ÙØ¸";     
		SideBar_Search_QuickSearch="Ø¨Ø­Ø« Ø³Ø±ÙŠØ¹";
		SideBar_Search_Player="Ù„Ø§Ø¹Ø¨";
		SideBar_Search_City="Ù…Ø¯ÙŠÙ†Ø©"; //NEW
		SideBar_Search_PlayerStatus="Ø­Ø§Ù„Ø© Ø§Ù„Ù„Ø§Ø¹Ø¨";
		SideBar_Search_PlayerAll="ÙƒÙ„";
		SideBar_Search_PlayerUnknown="ØºÙŠØ± Ù…Ø¹Ø±ÙˆÙ";
		SideBar_Search_PlayerNormal="Ù…ØªÙˆØ§Ø¬Ø¯";
		SideBar_Search_PlayerInactive="ØºÙŠØ± ÙØ¹Ø§Ù„";
		SideBar_Search_PlayerVacation="Ø¹Ø·Ù„Ø©";
		SideBar_Search_Alliance="ØªØ­Ø§Ù„Ù";
		SideBar_Search_Radius="Ø´Ø¹Ø§Ø¹ Ø§Ù„Ø¨Ø­Ø«";
		SideBar_Search_Search="Ø¨Ø­Ø«";
		SideBar_Search_Clear="Ù…Ø³Ø­"; //NEW
		SideBar_Search_AdvancedSearch="Ø¨Ø­Ø« Ù…ØªÙ‚Ø¯Ù…";
		SideBar_Search_EnemyAlliances="Ø§Ù„ØªØ­Ø§Ù„ÙØ§Øª Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¡";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Ø£Ø±Ø³Ù„ Ù„Ù„ØªØ­Ø§Ù„Ù<br> Ø±Ø³Ø§Ù„Ø©","Ø£Ø±Ø³Ù„ Ø±Ø³Ø§Ù„Ø© Ù„ÙƒÙ„ Ø§Ù„ØªØ­Ø§Ù„ÙØ§Øª"],
		["ØµÙØ­Ø© Ø§Ù„ØªØ­Ø§Ù„Ù "+alliancefullnm,"Ø¥Ù„Ù‰ ØµÙØ­Ø© Ø§Ù„ØªØ­Ø§Ù„Ù " ],
		[alliancefullnm +" Ø±Ø³Ø§Ù„Ø© Ø¬Ø¯ÙŠØ¯Ø©","Ø¥Ù„Ù‰ ØµÙØ­Ø© Ø§Ù„ØªØ­Ø§Ù„Ù , Ø¢Ø®Ø± Ø§Ù„Ø±Ø³Ø§Ø¦Ù„ ",],
		["ØµÙ†Ø¯ÙˆÙ‚ Ø§Ù„Ù…Ø­Ø§Ø¯Ø«Ø© -Ø¥Ø·Ø§Ø± Ø¬Ø¯ÙŠØ¯Ø©","Ù…Ø­Ø§Ø¯Ø«Ø© Ø§Ù„ØªØ­Ø§Ù„Ù , ÙØªØ­ ÙÙŠ Ø¥Ø·Ø§Ø± Ø¬Ø¯ÙŠØ¯"],
		["ØµÙ†Ø¯ÙˆÙ‚ Ø§Ù„Ù…Ø­Ø§Ø¯Ø«Ø© -Ø¥Ø·Ø§Ø±","Ù…Ø­Ø§Ø¯Ø«Ø© Ø§Ù„ØªØ­Ø§Ù„Ù , ÙØªØ­ ÙÙŠ Ù†ÙØ³ Ø¥Ø·Ø§Ø±"],
		["Ø­Ø§Ø³Ø¨Ø© Ø§Ù„Ù…Ø¹Ø±ÙƒØ©","Ø­Ø³Ø§Ø¨ Ù…Ø¹Ø±ÙƒØ© ... "],
		[" ØªØ­Ø¯ÙŠØ« "+alliancefullnm+" Ø£Ø¯ÙˆØ§Øª ","Ø£Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¢Ø®Ø± Ø³ÙƒØ±ÙŠØ¨Øª"]];
		IslandLegendAllies="â€¢ ØªØ­Ø§Ù„ÙØ§Øª";
		IslandLegendNoAlliance="â€¢ Ù„Ø§ ÙŠÙˆØ¬Ø¯ ØªØ­Ø§Ù„Ù";
		IslandLegendEnemies="â€¢ Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¡";
		TreatyAll="ÙƒÙ„ Ø§Ù„Ù„Ø§Ø¹Ø¨ÙŠÙ† ØªÙ… ÙØ­ØµÙ‡Ù… . Ø§Ù„Ø£ØµÙØ± Ù„Ù…Ù† Ù„ÙŠØ³ Ù„Ø¯ÙŠÙ‡Ù… Ù…Ø¹Ø§Ù‡Ø¯Ø§Øª Ø«Ù‚Ø§ÙÙŠØ© , Ùˆ Ø§Ù„Ø±Ù…Ø§Ø¯ÙŠ Ù„Ù…Ù† ØªÙˆØ¬Ø¯ Ù„Ù‡Ù… Ù…Ø¹Ø§Ù‡Ø¯Ø§Øª Ø«Ù‚Ø§ÙÙŠØ© Ù‚Ø§Ø¦Ù…Ø©.";
		TreatyYes="Ø£Ù†Øª Ø¹Ù†Ø¯Ùƒ Ø­Ø§Ù„ÙŠØ§ Ù…Ø¹Ø§Ù‡Ø¯Ø© Ø«Ù‚Ø§ÙÙŠØ© Ù…Ø¹ Ù‡Ø°Ø§ Ø§Ù„Ù„Ø§Ø¹Ø¨";
		TreatyNo="Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…Ø¹Ø§Ù‡Ø¯Ø§Øª Ø«Ù‚Ø§ÙÙŠØ© Ù„Ø¯Ù‰ Ø§Ù„Ù„Ø§Ø¹Ø¨.";
		updatenotification="Ù‡Ù†Ø§Ùƒ Ù†Ø³Ø®Ø© Ø¬Ø¯ÙŠØ¯Ø© Ù…Ù†  "+alliancefullnm+" Ø§Ø¶ØºØ· Ø¹Ù„Ù‰ Ù†Ø¹Ù… Ø¥Ø°Ø§ Ø£Ø±Ø¯Øª ØªØ­Ø¯ÙŠØ«Ù‡Ø§ Ù…Ù† Ø§Ù„Ù…ØµØ¯Ø±";
		txtplswait="Ø§Ù†ØªØ¸Ø± Ù„Ùˆ Ø³Ù…Ø­Øª";
		txtrefresh="ØªØ­Ø¯ÙŠØ«";
		txtpagedata="- Ø§Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ ØµÙØ­Ø©";
		txtinfodata="- Ø§Ù„Ø­ØµÙˆÙ„ Ø¹Ù„Ù‰ Ù…Ø¹Ù„ÙˆÙ…Ø§Øª";
		txtchkplayer="- ÙØ­Øµ Ù„Ø§Ø¹Ø¨";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Ø¥Ù„ØºØ§Ø¡ Ù…Ø¹Ø§Ù‡Ø¯Ø© Ø«Ù‚Ø§ÙÙŠØ©";
		CultureTreatiesRequest=" Ø·Ù„Ø¨ Ù…Ø¹Ø§Ù‡Ø¯Ø© Ø«Ù‚Ø§ÙÙŠØ©";
	break;
	case 'nl':
		CheckVersionBubbleNegative=   "Ik zocht naar een nieuwe versie, op dit ogenblik is die er niet.";
		NewCoreVersion="Nieuwe Core Versie";
		SideBar_News="Nieuws"; //NEW
		SideBar_NewsT="Ika-Core release nieuws"; //NEW
		SideBar_Drag="Klik en sleep om de SideBar te verplaatsen";
		SideBar_Search="Zoek";
		SideBar_SearchT="Zoek speler/alliantie";
		SideBar_ToolsT="Alliantie Links";
		SideBar_Notes="Notities";
		SideBar_NotesT="Snelle Notitie";
		SideBar_Allies="Allianties";
		SideBar_AlliesT="Allianties - Lijst";
		SideBar_Enemies="Vijanden";
		SideBar_EnemiesT="Vijandige spelers";
		SideBar_Friends="Vrienden";
		SideBar_FriendsT="Vriendenlijst";
		SideBar_Games="Spelletjes";
		SideBar_GamesT="Spelletjes Menu";
		SideBar_Indexing="Indexering";
		SideBar_IndexingT="Wereld Indexering Voortgang";
		SideBar_Settings="Instellingen";
		SideBar_SettingsT="Instellingen - Algemene Configuratie";
		SideBar_Chat="Chat";
		SideBar_ChatT="Global Chat";
		SideBar_Search_Add="Voeg toe";     
		SideBar_Search_Save="Bewaar";     
		SideBar_Search_QuickSearch="Snel zoeken";
		SideBar_Search_Player="Speler";
		SideBar_Search_City="Stad"; //NEW
		SideBar_Search_PlayerStatus="Speler Status";
		SideBar_Search_PlayerAll="All";
		SideBar_Search_PlayerUnknown="Onbekend";
		SideBar_Search_PlayerNormal="Normaal";
		SideBar_Search_PlayerInactive="Inactief";
		SideBar_Search_PlayerVacation="Vakantie";
		SideBar_Search_Alliance="Alliantie";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Zoek";
		SideBar_Search_Clear="Verwijder"; //NEW
		SideBar_Search_AdvancedSearch="Geavanceerd zoeken";
		SideBar_Search_EnemyAlliances="Vijandige allianties";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Verzend alliantie<br> Bericht","Verzend een bericht naar alle allianties"],
		["Forum "+alliancefullnm,"Naar het forum van de alliantie " ],
		[alliancefullnm +" nieuwe forum posts","Naar het forum van de alliantie, laatste berichten ",],
		["Chatbox(New Window)","Alliantie Chat, opent in een nieuw venster"],
		["Chatbox(Frame)","Alliantie Chat, toont chat in frames zonder herladen "],
		["Gevechts Calc","Berekent een gevecht ... "],
		[" Update "+alliancefullnm+" Tools ","Verkrijg de nieuwste script"]];
		IslandLegendAllies="â€¢ Allianties";
		IslandLegendNoAlliance="â€¢ Geen alliantie";
		IslandLegendEnemies="â€¢ Vijanden";
		TreatyAll="Alle spelers zijn gecontroleerd. Geel voor geen verdrag, en grijs voor bestaand verdrag.";
		TreatyYes="Je hebt al een cultureel verdrag met deze speler";
		TreatyNo="Geen cultureel verdrag gevonden met deze speler.";
		updatenotification="Er is weer een nieuwe versie van "+alliancefullnm+" Tools.\n Klik op OK als je nu naar www.ika-core.org wil gaan en nu wil updaten.";
		txtplswait="Even geduld";
		txtrefresh="Vernieuw";
		txtpagedata="- Pagina verkrijgen";
		txtinfodata="- Info verkrijgen";
		txtchkplayer="- Speler controleren";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Zeg cultureel verdrag op";
		CultureTreatiesRequest=" Vraag cultureel verdrag aan";	
	break;
	case 'lt':
		CheckVersionBubbleNegative=   "Å iuo metu naujos versijos nÄ—ra.";
		NewCoreVersion="Nauja Core versija";
		SideBar_News="Naujienos";
		SideBar_NewsT="Ika-Core versijos naujienos";
		SideBar_Drag="paspausk ir stumk, kad pajudintum Ä¯rankiÅ³ juostÄ…";
		SideBar_Search="PaieÅ¡ka";
		SideBar_SearchT="IeÅ¡koti Å¾aidÄ—jo/aljanso";
		SideBar_ToolsT="AljansÅ³ nuorodos";
		SideBar_Notes="UÅ¾raÅ¡ai";
		SideBar_NotesT="Greiti uÅ¾raÅ¡ai";
		SideBar_Allies="SÄ…jungininkai";
		SideBar_AlliesT="SajungininkÅ³ sÄ…raÅ¡as";
		SideBar_Enemies="PrieÅ¡ai";
		SideBar_EnemiesT="Å½aidÄ—jai - prieÅ¡ai";
		SideBar_Friends="Draugai";
		SideBar_FriendsT="DraugÅ³ sÄ…raÅ¡as";
		SideBar_Games="Å½aidimai";
		SideBar_GamesT="Å½aidimÅ³ menu";
		SideBar_Indexing="Indeksavimas";
		SideBar_IndexingT="Pasaulio indeksavimo progresas";
		SideBar_Settings="Nustatymai";
		SideBar_SettingsT="Nustatymai - Bendros nuostatos ";
		SideBar_Chat="Chat'as";
		SideBar_ChatT="Pasaulinis chat'as";
		SideBar_Search_Add="PridÄ—ti";      
		SideBar_Search_Save="IÅ¡saugoti";      
		SideBar_Search_QuickSearch="Greita paieÅ¡ka";
		SideBar_Search_Player="Å½aidÄ—jas";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Å½aidÄ—jo bÅ«sena";
		SideBar_Search_PlayerAll="Visi";
		SideBar_Search_PlayerUnknown="neÅ¾inomas";
		SideBar_Search_PlayerNormal="Normalus";
		SideBar_Search_PlayerInactive="Neaktyvus";
		SideBar_Search_PlayerVacation="Atostogauja";
		SideBar_Search_Alliance="Aljansas";
		SideBar_Search_Radius="Spindulys";
		SideBar_Search_Search="PaieÅ¡ka";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="IÅ¡plÄ—sta paieÅ¡ka";
		SideBar_Search_EnemyAlliances="PrieÅ¡Å³ aljansai";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		['Send Alliance<br> Message','Send message to all the allies'],
		['Forum '+alliancefullnm,'To the Forum of the Alliance ' ],
		[alliancefullnm +' new forum posts','To the Forum of the Alliance, latest posts ',],
		['Chatbox(New Window)','Alliance Chat, opens in a new window'],
		['Chatbox(Frame)','Alliance Chat, displays chat in frames with no reload '],
		['Battle Calc','Calculates a battle ... '],
		[' Update '+alliancefullnm+' Tools ','Gets the latest script']];
		IslandLegendAllies="â€¢ Aljansai";
		IslandLegendNoAlliance="â€¢ NÄ—ra aljanse";
		IslandLegendEnemies="â€¢ PrieÅ¡ai";
		TreatyYes="Tu jau turi kultÅ«rinÄ™ sutartÄ¯ su Å¡iuo Å¾aidÄ—ju";
		TreatyNo="Nerasta kultÅ«riniÅ³ sutarÄiÅ³ su Å¡iuo Å¾aidÄ—ju.";
		updatenotification='There is a newer version of '+alliancefullnm+' Tools.\n Click on OK if you would like to go to www.ika-core.org and update now.';
		txtplswait="PraÅ¡au palaukti";
		txtrefresh="Atnaujinti";
		txtpagedata='- Getting Page';
		txtinfodata='- Getting Info';
		txtchkplayer='- Checking Player';
		CultureTreaties='ultur'; //magic word for treaties fix
		CultureTreatiesCancel=" AtÅ¡aukti kultÅ«rinÄ™ sutartÄ¯";
		CultureTreatiesRequest=" PraÅ¡yti kultÅ«rinÄ—s sutarties";
	break;
	default:
		CheckVersionBubbleNegative=	"I checked for a new version , there is none at the moment.";
		NewCoreVersion="New Core Version";
		SideBar_News="News";
		SideBar_NewsT="Ika-Core release news";
		SideBar_Drag="Hold and Drag to move the SideBar";
		SideBar_Search="Search";
		SideBar_SearchT="Search player/alliance";
		SideBar_ToolsT="Alliance Links";
		SideBar_Notes="Notes";
		SideBar_NotesT="Quick Notes";
		SideBar_Allies="Allies";
		SideBar_AlliesT="Allies - List";
		SideBar_Enemies="Enemies";
		SideBar_EnemiesT="Enemy Players";
		SideBar_Friends="Friends";
		SideBar_FriendsT="Friends List";
		SideBar_Games="Games";
		SideBar_GamesT="Games Menu";
		SideBar_Indexing="Indexing";
		SideBar_IndexingT="World Indexing Progress";
		SideBar_Settings="Settings";
		SideBar_SettingsT="Settings - General Configuration ";
		SideBar_Chat="Chat";
		SideBar_ChatT="Global Chat";
		SideBar_Search_Add="Add";		
		SideBar_Search_Save="Save";		
		SideBar_Search_QuickSearch="Quick Search";
		SideBar_Search_Player="Player";
		SideBar_Search_City="City";
		SideBar_Search_PlayerStatus="Player Status";
		SideBar_Search_PlayerAll="All";
		SideBar_Search_PlayerUnknown="Unknown";
		SideBar_Search_PlayerNormal="Normal";
		SideBar_Search_PlayerInactive="Inactive";
		SideBar_Search_PlayerVacation="Vacation";
		SideBar_Search_Alliance="Alliance";
		SideBar_Search_Radius="Radius";
		SideBar_Search_Search="Search";
		SideBar_Search_Clear="Clear";
		SideBar_Search_AdvancedSearch="Advanced Search";
		SideBar_Search_EnemyAlliances="Enemy Alliances";
		SideBar_Search_MilitaryScore="Military Score";
		SideBar_Search_GoldScore="Gold Score";
		SideBar_Search_Between="between";
		SideBar_Search_And="and";
		SideBar_Search_TownHallLevel="TownHall Level";		
		AllianceMenu=[
		["Send Alliance<br> Message","Send message to all the allies"],
		["Forum "+alliancefullnm,"To the Forum of the Alliance " ],
		[alliancefullnm +" new forum posts","To the Forum of the Alliance, latest posts ",],
		["Chatbox(New Window)","Alliance Chat, opens in a new window"],
		["Chatbox(Frame)","Alliance Chat, displays chat in frames with no reload "],
		["Battle Calc","Calculates a battle ... "],
		[" Update "+alliancefullnm+" Tools ","Gets the latest script"]];
		IslandLegendAllies="â€¢ Allies";
		IslandLegendNoAlliance="â€¢ No Alliance";
		IslandLegendEnemies="â€¢ Enemies";
		TreatyAll="All players have been checked. Yellow for no treaty and Gray for existing.";
		TreatyYes="You already have a cultural Treaty with this Player";
		TreatyNo="No cultural treaties found for this player.";
		updatenotification="There is a newer version of "+alliancefullnm+" Tools.\n Click on OK if you would like to go to www.ika-core.org and update now.";
		txtplswait="Please Wait";
		txtrefresh="Refresh";
		txtpagedata="- Getting Page";
		txtinfodata="- Getting Info";
		txtchkplayer="- Checking Player";
		CultureTreaties="ultur"; //magic word for treaties fix
		CultureTreatiesCancel=" Cancel Cultural Treaty";
		CultureTreatiesRequest=" Request Cultural Treaty";
		break;
	}
}

function getserverindex(){
	var servers={
	'ikariam.de':['de','0'],
	'ikariam.org':['en','1'],
	'ae.ikariam.com':['ae','2'],
	'ar.ikariam.com':['ar','3'],
	'ba.ikariam.com':['ba','4'],
	'ikariam.bg':['bg','5'],
	'ikariam.com.br':['br','6'],
	'by.ikariam.org':['by','7'],
	'cl.ikariam.org':['bl','8'],
	'ikariam.cn':['cn','9'],
	'ikariam.cz':['cz','10'],
	'ikariam.dk':['dk','11'],
	'ee.ikariam.org':['ee','12'],
	'eg.ikariam.org':['eg','13'],
	'ikariam.es':['es','14'],
	'fi.ikariam.com':['fi','15'],
	'ikariam.fr':['fr','16'],
	'ikariam.gr':['gr','17'],
	'hr.ikariam.org':['hr','18'],
	'ikariam.hk':['hk','19'],
	'ikariam.hu':['hu','20'],
	'id.ikariam.org':['id','21'],
	'ih.ikariam.org':['ih','22'],
	'ikariam.co.il':['il','23'],
	'in.ikariam.org':['in','24'],
	'ir.ikariam.org':['in','25'],
	'ikariam.it':['it','26'],
	'jp.ikariam.org':['jp','27'],
	'kr.ikariam.org':['kr','28'],
	'ikariam.lt':['lt','29'],
	'ikariam.lv':['lv','30'],
	'me.ikariam.org':['me','31'],
	'ikariam.com.mx':['mx','32'],
	'ikariam.nl':['nl','33'],
	'ikariam.no':['no','34'],
	'ikariam.pe':['pe','35'],
	'ikariam.ph':['ph','36'],
	'ikariam.pl':['pl','37'],
	'ikariam.com.pt':['pt','38'],
	'ikariam.ro':['ro','39'],
	'ikariam.ru':['ru','40'],
	'sa.ikariam.org':['sa','41'],
	'ikariam.se':['se','42'],
	'ikariam.si':['si','43'],
	'ikariam.sk':['sk','44'],
	'ikariam.net':['tr','45'],
	'ikariam.tw':['tw','46'],
	'ikariam.com':['us','47'],
	'ikariam.com.ua':['ua','48'],
	'ikariam.com.ve':['ve','49'],
	'ikariam.vn':['vn','50'],
	'co.ikariam.com':['co','51'],
	'ikariam.rs':['rs','52']
	}
	return servers[location.host.substr(location.host.indexOf('.')+1)];
}
var sea='&sea=12';
//check for update
function checkupdate(text){
	var testversion=text.split('var version=')[1];
	testversion=testversion.split(';')[0];
	newversion=parseInt(testversion);
	addsbubble('diplomat',CheckVersionBubbleNegative,9);
	if (version < newversion) 
		if (confirm(updatenotification+ '\nv' + newversion)) {
			location.href = scriptlocation;
		}
	get('http://www.ika-core.org/scripts/ika-core.js?v='+Math.floor(Math.random()*65535),checkcoreupdate);
}
//check for update
function checkcoreupdate(text){
	var testversion=text.split('var core_vers=')[1];
	testversion=testversion.split(';')[0];
	newversion=parseInt(testversion);
	if (core_vers < newversion) 
		if (confirm(updatenotification + '\n'+NewCoreVersion+': v' + newversion)) {
			location.href = scriptlocation;
		}
}

function version_update(){
	if(GM_getValue("LastUpdateMe")){
		var lastSearch;
		lastSearch = parseInt(GM_getValue("LastUpdateMe"));
		//check time elapsed from last update
		var now = parseInt(new Date().getTime());
		var searchFreq = 43200*1000; //
		//check update
		if(now - lastSearch > searchFreq){
			GM_setValue("LastUpdateMe", ""+now);
			get(scriptlocation,checkupdate);
		}
	} else GM_setValue("LastUpdateMe", ""+new Date().getTime());
}

//GM_setValue("LastUpdateMe", ""+(new Date().getTime()-560000000*1000));

//CSS used for menus and player info tables
GM_addStyle("\
table#cor {\
			-moz-box-sizing:border-box;\
			-moz-outline: #ff9900 ridge 5px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;\
			border-collapse:separate;\
			border-spacing:0px;\
			display:table;\
			margin-bottom:0;\
			margin-top:0;\
			text-indent:0;\
			color:#542C0F;\
			font-size:11px;}\
tbody#cor {\
		display:table-row-group;\
		vertical-align:middle;\
}\
#corsairprogress { position:fixed; z-index:500;padding:3px 3px 3px 3px;margin:0px 0px 0px 0px;}\
#nfoframe{z-index:55;background-color:#FDF7DD;;font:normal 12px Arial, Helvetica, sans-serif;text-align:center;color:#542c0f;position:fixed;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px; -moz-outline: #ff9900 ridge 2px;-moz-outline-radius: 10px 10px 10px 10px;-moz-outline-offset:0px;}\
#nfoframeclose,.search_player,.mapview,.search_alliance,.page,.pagebar,.markscores,.savenotes,.gameplay,.questowner,.questally,.checktreaty,.plunderbash ,#nfomapbutton,#nfomapbuttona{background:#F6EBBC;text-decoration:none;cursor:pointer;font-size:9px;padding:1px 1px 1px 1px;margin:3px 5px 3px 5px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;-moz-outline:none;}\
#nfoframeclose:hover,.search_player:hover,.mapview:hover,.search_alliance:hover,.page:hover,.pagebar:hover,.markscores:hover,.savenotes:hover,.gameplay:hover,.questowner:hover,.questally:hover,.checktreaty:hover,#nfomapbutton:hover,#nfomapbuttona:hover,.plunderbash:hover {background:orange;text-decoration:none;}\
#nfoframeclose:active,.search_player:active,.mapview:active,.search_alliance:active,.page:active,.pagebar:active,.markscores:active,.savenotes:active,.gameplay:active,.questowner:active,.questally:active,.checktreaty:active,#nfomapbutton:active,#nfomapbuttona:active,.plunderbash:active {background:red;}\
.dragclass{ position : relative; cursor : move;}\
.korniza{width:100%;height:5px;background:url("+korniza+") repeat 0 0}\
#nfoplayer,#nfoalliance{background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584}\
#embassy #container #mainview .contentBox01h .content table#memberList td.action { margin:0 auto; float: none}\
#sidemenu {\
width:90px;\
background: transparent;\
z-index:500;\
position:fixed;\
}\
#sidemenu ul {\
list-style: none;\
margin: 0;\
padding: 0;\
}\
#sidemenu a, #sidemenu h2 {\
font: bold 10px/11px arial, helvetica, sans-serif;\
display: block;\
margin: 0;\
padding: 2px 2px;\
}\
#sidemenu h2 {\
background: #EDB76D;\
text-transform: uppercase;\
-moz-outline:#EDA76D outset 2px;\
-moz-outline-radius:0px 10px 10px 0px;\
font-size:9px;\
height:13px;\
width:60px;\
}\
#sidemenu a {\
color: #542C0F;\
width:80px;\
background: #ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;\
text-decoration: none;\
-moz-outline:#FF9900 outset 1px;\
-moz-outline-radius:0px 6px 6px 0px;\
margin: 2px 0px 2px 0px;\
}\
#sidemenu a:hover {\
background: #ECbF7E;\
}\
#sidemenu li {position: relative;}\
#sidemenu ul ul ul {\
position: absolute;\
top: 0;\
left: 96%;\
border-color:#ffffff #C9A584 #997554 #C9A584;\
border-style:double;\
border-width:3px;\
background:#F6EBBC;\
}\
div#sidemenu ul ul ul,\
div#sidemenu ul ul li:hover ul ul\
{display: none;}\
div#sidemenu ul ul li:hover ul,\
div#sidemenu ul ul ul li:hover ul\
{display: block;}\
.111elisthead { background:#EDB76D;-moz-outline:#EDA76D outset 2px;-moz-outline-radius:10px 10px 0px 0px;} \
.111elistmain { background:#F6EBBC;-moz-outline:#FF9900 inset 1px;margin:0px 0px 0px 0px;}\
.111elistfoot { height:2px; background:#542C0F;-moz-outline:#FF9900 outset 1px;-moz-outline-radius:0px 0px 20px 20px;margin:0px 0px 0px 0px;}\
.blevels,.clevels {\
background:#000;\
font-size:9px;\
margin:0;\
padding:0px 0px 0px 0px;\
color:#fff;-moz-outline: black ridge 3px;\
-moz-outline-radius: 8px 8px 8px 8px;\
text-align:center;\
position:absolute;\
}\
.elistmain {}\
.elisthead {background:url("+gradient+") repeat 0 0;color:#542C0F;font-weight:bold; font-size:11px;line-height:15px;}\
.elistfoot {}\
.backlight{position:relative;left:-30px;top-140px;width:130px;height:130px;background:transparent;z-index:-500;opacity:1}\
");

//some standard functions
var XPFirst		= XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList		= XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter		= XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
var XPIterOrder	= XPathResult.ORDERED_NODE_ITERATOR_TYPE;

function clickTo(img,action,cursor) {
	if (img) {
		img.addEventListener("click", action, false);
		switch (cursor){
			case 1:
				if (img.style) img.style.cursor = "pointer";
				break;
			case 2:
				if (img.style) img.style.cursor = "crosshair";
				break;
		}
	}
}

function mapevt(e){
	var obj;
	if (!e) var e = window.event;
	if (e.target) obj = e.target;
	else if (e.srcElement) obj = e.srcElement;
	return obj;
}

function get(url, cb , tag) {
	GM_xmlhttpRequest({method: "GET",
						url: url,
						onload: function(xhr) { cb(xhr.responseText, tag); }});
}

function post(url, data, cb, tag) {
	GM_xmlhttpRequest({	method: "POST",
						url: url,
						headers:{'Content-type':'application/x-www-form-urlencoded'},
						data:encodeURI(data),
						onload: function(xhr) { cb(xhr.responseText, tag); }});
}

function getItem(type, ul) {
	return $X('li[contains(concat(" ",normalize-space(@class)," ")," '+type+' ")]',ul||cityinfoPanel());
}

function cityinfoPanel() {
	return $X('id("information")//ul[@class="cityinfo"]');
}

function cityinfoPanelIsland() {
	return XX('.//div[@id="infocontainer"]', XPFirst);
}

function node(type, id, className, style, content, title ) {
	var n = document.createElement(type||"div"); 
	if (id) n.setAttribute('id',id);
	if (className) n.className = className;
	if (title) n.setAttribute('title',title);
	if (style) n.setAttribute('style',style);
	if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString();
	return n;
}

function remove(node){
  return node.parentNode.removeChild(node);
}

function btn(parent,id,name,txt,title,evt,x,extrastyle){
	if (parent) {
		if (!x) x='0';
		if (!extrastyle) extrastyle='';
		var button=node('a',id, name,'font-size:7px;margin:0px 0px 10px '+x+'px;'+extrastyle,txt,title);
		if(button) {
			parent.appendChild(button);
			if (evt) clickTo(button,evt,1);
		}
	}
}
var th='http://www.ika-core.org/';
function click(node) {
	var event = node.ownerDocument.createEvent("MouseEvents");
	event.initMouseEvent("click", true, true, node.ownerDocument.defaultView,1, 0, 0, 0, 0, false, false, false, false, 0, node);
	node.dispatchEvent(event);
}

function onClick(node, fn, capture, e) {
	node.addEventListener((e||"") + "click", fn, !!capture);
}

function fmtNumber(n) {
	n += "";
	for (var i = n.length - 3; i > 0; i -= 3)
		n = n.slice(0, i) +","+ n.slice(i);
	return n;
}

function number(n) {
	n = { string: 1, number: 1 }[typeof n] ? n+"" : n.textContent;
	return parseInt(n.replace(/\D+/g, "") || "0", 10);
}

function trim(str) {
	return str.replace(/^\s+|\s+$/g, "");
}

function $() {
	if (arguments.length == 1) return get$(arguments[0]);
	var elements = [];
	$c(arguments).each(function(el){
		elements.push(get$(el));
	});
	return elements;

	function get$(el){
		if (typeof el == 'string') el = document.getElementById(el);
		return el;
	}
}

function $x( xpath, root ) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
	switch (got.resultType) {
		case got.STRING_TYPE:
			return got.stringValue;
		case got.NUMBER_TYPE:
			return got.numberValue;
		case got.BOOLEAN_TYPE:
			return got.booleanValue;
		default:
			while (next = got.iterateNext())
			result.push( next );
			return result;
	}
}

function $X( xpath, root ) {
	var got = $x( xpath, root );
	return got instanceof Array ? got[0] : got;
}

function XX(xpath, xpres, startnode, myhtml){
	if (!startnode) {startnode=document;}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	if (myhtml) ret.singleNodeValue.innerHTML=myhtml;
	return	xpres == XPFirst ? ret.singleNodeValue : ret;
}

function forall(query,startnode, call){
	var objs=XX(query,XPList,startnode);
	for (var i = 0; i < objs.snapshotLength; i++) 
		call(objs.snapshotItem(i),i);
}

function forallrows(tbl,startrow,call){
	for (var i=startrow; i<tbl.rows.length ; i++) 
		call(tbl,i);
}
/*
function time(t) {
	t = t || Date.now();
	return Math.floor(t / 6e4) - 2e7; // ~minute precision is enough
}
*/

var n = 500;
var dragok = false;
var y,x,d,dy,dx;
var xaxismove=false;
var yaxismove=false;

	function move(e){
		if (!e) e = window.event;
		if (dragok){			
			if (xaxismove) d.style.left = dx + e.clientX - x + "px";
			if (yaxismove) d.style.top  = dy + e.clientY - y + "px";
			return false;
		}
	}

	function down(e){
		if (!e) e = window.event;
		var temp = (typeof e.target != "undefined")?e.target:e.srcElement;
		if (temp.tagName != "HTML"|"BODY" && temp.className != "dragclass"){
			temp = (typeof temp.parentNode != "undefined")?temp.parentNode:temp.parentElement;
		}
		switch (temp.className){
			case "dragclass":
				var obj=$(temp.title);
				xaxismove=true;
				yaxismove=true;
			break;
			case "dragsidemenu":
				var obj=$("sidemenu");
				xaxismove=false;
				yaxismove=true;
				//alert(obj.innerHTML);
				//var obj=temp.parentNode.parentNode.parentNode.parentNode.parentNode;
			break;
				
		}
		if (obj){ 
			dragok = true;
			obj.style.zIndex = n++;
			d = obj;
			dx = parseInt(obj.style.left+0);
			dy = parseInt(obj.style.top+0);
			x = e.clientX;
			y = e.clientY;
			document.addEventListener('mousemove',move,false);
			return false;
		}			
	}

	function up(){
		dragok = false;		
		document.removeEventListener('mousemove',move,false);
		if(d)
		switch (d.id){			
			case "sidemenu":
				if (parseInt(d.style.top)<0) d.style.top="0px";
				GM_setValue("SideBarTop",d.style.top);
			break;				
		}
	}
	
document.addEventListener('mousedown',down,false);
document.addEventListener('mouseup',up,false); 


//progresbar
var duration=3; // Specify duration of progress bar in seconds
var _progressWidth = 100;// Display width of progress bar.
var _progressBar = "|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||";
var _progressEnd = 5;
var _progressAt = 0;
var col=th+'/colector/';

function ProgressCreate(end,tag) {
	_progressEnd = end;
	_progressAt = 0;
	if (!tag) tag='';
	getbody.appendChild(node('div','corsairprogress','','left:'+parseInt((window.innerWidth/2)-200)+'px; top:'+parseInt((window.innerHeight/2) - 40)+'px;','<FORM name=dialog id=dialog><TABLE border=2  bgcolor="#F6EBBC" id="cor"><TR><TD ALIGN="center">'+txtplswait+'&nbsp;'+tag+'<BR><input type=text name="corsairbar" id="corsairbar" size="' + _progressWidth/2 + '" style="color:navy;"></TD></TR></TABLE></FORM>'));
	ProgressUpdate();
}

function ProgressDestroy() {
	remove($("corsairprogress"));
}

function ProgressStepIt() {
	_progressAt++;
	if(_progressAt > _progressEnd) _progressAt = _progressAt % _progressEnd;
	ProgressUpdate();
}

function ProgressUpdate() {
	var n = (_progressWidth / _progressEnd) * _progressAt;
	var bar = $("corsairbar");
	var temp = _progressBar.substring(0, n);
	bar.value = temp;
}

//used to make chat displayed in a frame
unsafeWindow.makeframes = function(elm) {    
	if (parent != self) 
		top.location.href = location.href;
	else {
		var frameset = document.createElement("frameset");
		var loc=location.href;
		frameset.cols = null;
		frameset.rows = "50%, 40%";
		frameset.setAttribute('style','overflow-y: hidden !important;overflow-x: hidden !important;margin:0px;padding:0px;');
		frameset.setAttribute('id','framechat');

		var newFrame1 = document.createElement("frame");
		newFrame1.id = "newFrame1";
		newFrame1.name = "newFrame1";
		newFrame1.src = "http://"+location.host+"/index.php";
		newFrame1.setAttribute('target','_self');
		newFrame1.setAttribute('style','overflow-x: hidden;');
		var newFrame2 = document.createElement("frame");
		newFrame2.id = "newFrame2";
		newFrame2.name = "newFrame2";
		newFrame2.src = elm;
		newFrame2.setAttribute('style','overflow-x: hidden;');

		frameset.appendChild(newFrame1);
		frameset.appendChild(newFrame2);
		document.body=frameset;
		document.body.parentNode.setAttribute("style","overflow-y: hidden !important;overflow-x: hidden !important;margin:0px;padding:0px;");
	}
}

function twitch(gmvar){
	if(!GM_getValue(gmvar)) GM_setValue(gmvar, "1");
}

function togglevar(gmvar){
	if (GM_getValue(gmvar)=='1') {
		GM_setValue(gmvar, "0");
	} else {
		GM_setValue(gmvar, "1");
	}
}

function testvar(gmvar){
	twitch(gmvar);
	if (GM_getValue(gmvar)=='1') return true;
	return false;
}	

var resgoods={'wine':1,'marble':2,'crystal':3,'sulfur':4};
function islandview(){	
	culttreaties=GM_getValue("CultTtreaties");
	if (testvar("IslandInVac")) {
		GM_addStyle(".vacation {text-decoration:line-through}");
		GM_addStyle(".inactivity {text-decoration:underline;}");
	}
	if (testvar("IslandInactiveBlink")) {
		GM_addStyle(".inactivity {text-decoration:blink;}");	
	}
	var paNode=$('breadcrumbs').parentNode;
	if (paNode) {
		if (testvar("IslandLegend")) {paNode.appendChild(node('li','corlegend','','position:absolute;top:193px;left:270px;width:120px;height:100px;z-index:49','\
				<font color="'+Alliance+'" size=1>â€¢ '+alliancefullnm+'</font><br>\
				<font color="'+Allies+'" size=1>'+IslandLegendAllies+'</font><br>\
				<font color="'+NoAlliance+'" size=1>'+IslandLegendNoAlliance+'</font><br>\
				<font color="'+Enemies+'" size=1>'+IslandLegendEnemies+'</font><br>'));}
		if (GM_getValue('IslandToggleButtons', '1') == '1') {
			btn(paNode, 'shownamestoggle', 'gameplay', 'N', 'Hides or shows the player names under the Cities.', function(){
				togglevar("IslandPlayerNames");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:640px;width:5px;z-index:54;');
			btn(paNode, 'shownamesextratoggle', 'gameplay', 'E', 'Strikes through players on vacation and underlines inactives.', function(){
				togglevar("IslandInVac");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:655px;width:5px;z-index:54;');
			btn(paNode, 'showlegendtoggle', 'gameplay', 'Â§', 'Show or hide the Highlight Legend.', function(){
				togglevar("IslandLegend");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:670px;width:5px;z-index:54');
			btn(paNode, 'showlevlesislandtoggle', 'gameplay', 'L', 'Show or hide the City Levels.', function(){
				togglevar("IslandLevels");
				location.href = location.href;
			}, 5, 'position:absolute;top:155px;left:685px;width:5px;z-index:54');
		}
	}
	try {
	var wood=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]',XPFirst);
	var woodlvl=wood.className.split('level')[1];
	var res=XX('//ul[@id="islandfeatures"]/li[not(contains(@class,"wood")) and not(@id)]',XPFirst);
	var reslvl=res.className.split(' level')[1];
	res.setAttribute('style','z-index:0;');			
	if (testvar("IslandLevels")) {
		var as = node('a', 'clevels', 'clevels', 'background:#743C1F;width:12px;height:12px;top:20px;left:12px;', woodlvl);
		wood.appendChild(as);
		var as = node('a', 'clevels', 'clevels', 'background:#743C1F;width:12px;height:12px;top:15px;left:48px;', reslvl);
		res.appendChild(as);
	}

	var friendslist=GM_getValue("Friends","").split('#,#');
	var enemieslist=GM_getValue("Enemies","").split('#,#');
	forall("//li[contains(@class,'cityLocation')]", null, function(objpar,i){
		var iconleft=-10;
		var p=i+'=';
		var obj=XX(".//ul[@class='cityinfo']",XPFirst,objpar);
		if (obj){
			var ally=XX(".//li[@class='ally']/a",XPFirst,obj);
			var owner=XX(".//li[@class='owner']/span/following::text()[1]",XPFirst,obj).textContent;
			var city=XX(".//a/span",XPFirst,obj.parentNode);
			var cityimage=XX(".//div",XPFirst,obj.parentNode);
			var citylvl=XX(".//li[@class='citylevel']/span/following::text()[1]",XPFirst,obj).textContent;
			var spy=XX(".//li[@class='spy']",XPFirst,obj);
			if (testvar("IslandFriends")) for (var q=0;q<friendslist.length-1;q++){
				if (friendslist[q]==trim(owner)) {				
				var spynode=node('span',null,null,'background:transparent url('+heartimg+') no-repeat scroll 0px center;position:absolute;height:15px;width:15px;top:45px;left:'+iconleft+'px;z-index:800;margin:0;padding:0px 0px 0px 0px;');
				spynode.title="He is your friend!";
				iconleft+=16;
				city.parentNode.appendChild(spynode);
				}
			}
			if (testvar("IslandCultTreaties")&&culttreaties)
				 if (culttreaties.indexOf(","+trim(owner)+",") != -1) {		
					var spynode=node('span',null,null,'background:transparent url('+sunshineimg+') no-repeat scroll 0px center;position:absolute;height:23px;width:42px;top:41px;left:'+iconleft+'px;z-index:800;margin:0;padding:0px 0px 0px 0px;');
					spynode.title="You have a cultural treaty with this player!";
					iconleft+=43;
					city.parentNode.appendChild(spynode);
			}			
			if (testvar("IslandEnemies")) for (var q=0;q<enemieslist.length-1;q++){
				if (enemieslist[q]==trim(owner)) {				
				var spynode=node('span',null,null,'background:transparent url('+smackimg+') no-repeat scroll 0px center;position:absolute;height:20px;width:50px;top:42px;left:'+iconleft+'px;z-index:800;margin:0;padding:0px 0px 0px 0px;');
				spynode.title="He is your enemy!";
				iconleft+=50;
				city.parentNode.appendChild(spynode);
				}
			}
			if (testvar("IslandSpies")) if (spy) {
				var spynode=node('span',null,null,'background:transparent url('+spyimg+') no-repeat scroll 0px center;position:absolute;height:18px;width:20px;top:45px;left:'+iconleft+'px;z-index:800;margin:0;padding:0px 0px 0px 0px;');
				spynode.title="We have a Spy(007 James Bond etc.) in this City!";
				city.parentNode.appendChild(spynode);
			}
			if (testvar("IslandHighlight")) {
				if (ally) {
					if (testvar("IslandPlayerNames")) {
						var extranames = node('span', null, 'textLabel cornames', 'left: -10px; top: 84px; cursor: pointer;font-size:8px;', '<span class="before"></span>' + owner + '(' + ally.textContent + ')<span class="after"></span>');
						city.parentNode.appendChild(extranames);
					}
					for (var j = 1; j < alliance.length; j++) 
						if (ally.innerHTML == alliance[j][0]) {
							setCityColors(ally, city,cityimage, alliance[j][1], 'opacity:0.9;');
							break;
						}
				}
				else {
					if (testvar("IslandPlayerNames")) {
						var extranames = node('span', null, 'textLabel cornames', 'left: -10px; top: 84px; cursor: pointer;font-size:9px;', '<span class="before"></span>' + owner + '<span class="after"></span>');
						city.parentNode.appendChild(extranames);
					}
					setCityColors(null, city,cityimage,  NoAlliance, '');					
				}
			}
			if (testvar("IslandLevels")) {
				var as = node('a', 'clevels', 'clevels', 'top:30px;left:25px;width:12px;height:12px;', citylvl);
				city.parentNode.appendChild(as);
			}
		} else {
		}
	});
		} catch(e){}
}

function setCityColors(ally,city,cityimage,bcol,extrastyle){
	if (city) {
		cityimage.setAttribute('style', 'opacity:0.8');
		var nd=node("canvas",null,"backlight");
		if (nd.getContext) {
			var ctx = nd.getContext('2d');
			ctx.scale(2,1);
			var radgrad = ctx.createRadialGradient(75, 55, 25, 75, 70, 55);
			radgrad.addColorStop(0.0, bcol);
			radgrad.addColorStop(1, 'rgba(255,255,255,0)');
			ctx.fillStyle = radgrad;
			ctx.fillRect(0, 0, 150, 150);			
		}
		city.parentNode.parentNode.appendChild(nd);
	}
}

var islandsearch;
var islandsearchs=0;
var rand=Math.floor(Math.random()*65535)
var tm=120000;
if(!GM_getValue("GlobRand")) GM_setValue("GlobRand", Math.floor(Math.random()*65535));
var globrand=GM_getValue("GlobRand");
var debug=0;
if (debug==1){
  tm=5000;
  var debugwin=node('div','debug','dynamic','position:absolute;');
  getbody.appendChild(debugwin);  
}
	
function parsescore(text){
	s=text.split('<td class="score">');
	if (s[1]) {
		s=number(s[1].split('<')[0]);
		return s;
	} else {
		return 0;
	}	
}

function getplayerdata(text,tag){
	for (i=0;i<16;i++){
		if (tag[i]){			
			if (tag[i][1] == 0) {
				tag[i][1]= 1;
				if (debug==1) debugwin.innerHTML+='GP '+tag[i][0]+' MS<br>';	
				post('http://'+location.host+'/index.php','view=highscore&highscoreType=army_score_main&searchUser='+tag[i][0],getplayerdata,tag);			
				return ;
			}
			if (tag[i][1] == 1) {
				var score=parsescore(text);
				if (debug==1) debugwin.innerHTML+='P:'+tag[i][0]+' MS='+score+'<br>';	
				tag["data"][0]=tag["data"][0]+"&plscm"+i+"="+score;
				tag[i][1]= 2;
				if (debug==1) debugwin.innerHTML+='GP '+tag[i][0]+' GS<br>';	
				post('http://'+location.host+'/index.php','view=highscore&highscoreType=trader_score_secondary&searchUser='+tag[i][0],getplayerdata,tag);
				return ;
			}
			if (tag[i][1] == 2) {
				var score=parsescore(text);
				if (debug==1) debugwin.innerHTML+='P:'+tag[i][0]+' GS='+score+'<br>';	
				tag["data"][0]=tag["data"][0]+"&plscg"+i+"="+score;
				tag[i][1]= 3;
			}
		}
	}
	if (debug==1) debugwin.innerHTML+=tag["data"][0]+'<br>';	
	GM_xmlhttpRequest({	method: "POST",url: col+'col.php',headers:{'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(tag["data"][0])});	
}




function getisle(text,tag){
	var par=[];
	text=text.split('<span class="island">')[1];
	text=text.split('<div id="cityNav">')[0];
	var nm=text.split('</span>')[0].split('[');
	text='<div id="rambazamba">'+text.split('<div id="mainview">')[1];
	var fake=node('div','','','',text);
	//var id=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]/a',XPFirst,fake).href.split('&id=')[1];
	var wood=XX('//ul[@id="islandfeatures"]/li[contains(@class,"wood")]',XPFirst,fake).className.split('level')[1];
	var res=XX('//ul[@id="islandfeatures"]/li[not(contains(@class,"wood")) and not(@id)]',XPFirst,fake).className.split(' level');
	var wond=XX('//ul[@id="islandfeatures"]/li[@id="wonder"]',XPFirst,fake).className.split('wonder')[1];
	var data='s='+serverindex+'&w='+world+'&id='+tag+'&is='+nm[0]+'&ix='+nm[1].split(':')[0]+'&iy='+nm[1].split(':')[1].split(']')[0]+'&iw='+wond+'&ir='+resgoods[res[0]]+'&irl='+res[1]+'&iwl='+wood;
	forall("//li[contains(@class,'cityLocation')]", fake, function(objpar,i){
		var p=i+'=';
		var obj=XX(".//ul[@class='cityinfo']",XPFirst,objpar);
		if (obj){
			var ally=XX(".//li[@class='ally']/a",XPFirst,obj);
			var owner=XX(".//li[@class='owner']/span/following::text()[1]",XPFirst,obj).textContent;
			var pils=XX(".//li[@class='name']/span/following::text()[1]",XPList,obj);
			if (pils.snapshotItem(1)) {var pil=number(pils.snapshotItem(1).textContent);} else {var pil=0;}
			var city=XX(".//a/span",XPFirst,obj.parentNode);
			var pst=0;
			var stvac=XX(".//span[@class='vacation']",XPFirst,city);
			var stina=XX(".//span[@class='inactivity']",XPFirst,city);
			if (stvac) pst=1;
			if (stina) pst=2;
			var citynm=XX(".//li[@class='name']/span/following::text()[1]",XPFirst,obj).textContent;
			var citylvl=XX(".//li[@class='citylevel']/span/following::text()[1]",XPFirst,obj).textContent;
			if (ally) {
				data+='&cid'+p+city.parentNode.id.split('city_')[1]+'&pst'+p+pst+'&p'+p+trim(owner)+'&pil'+p+pil+'&c'+p+citynm+'&a'+p+ally.innerHTML+'&t'+p+citylvl+'&po'+p+objpar.id.split('cityLocation')[1];
			} else	{
				data+='&cid'+p+city.parentNode.id.split('city_')[1]+'&pst'+p+pst+'&p'+p+trim(owner)+'&pil'+p+pil+'&c'+p+citynm+'&a'+p+'-&t'+p+citylvl+'&po'+p+objpar.id.split('cityLocation')[1];
			}
			par[i]=[trim(owner),0];
		} else {
				data+='&cid'+p+'0&pst'+p+'0&p'+p+'&pil'+p+'0&c'+p+'&a'+p+'&t'+p+'0&po'+p+objpar.id.split('cityLocation')[1]+'&plscg'+p+'0'+'&plscm'+p+'0';
			par[i]=["",3];
		}		
	});
	data+="&grid="+globrand+"&rid="+rand+"&v=11&scv=1";
	par["data"]=[data,0];
	getplayerdata("",par);
}

function getisles(){
	if (islandsearch.length>0) {
		var isle=number(islandsearch[0]);
		if (debug==1) debugwin.innerHTML+='before isle '+isle+'.<br>';
		if (isle>0 && isle<5800) get('http://'+location.host+'/index.php?view=island&id='+isle,getisle,islandsearch[0]);
		if (debug==1) debugwin.innerHTML+='Isle finished('+isle+').<br>';
		islandsearch.splice(0,1);
		setTimeout(getisles,islandsearchs);
	} else setTimeout(servwhat,islandsearchs);
}

function servresponse(text,tag){
	if (debug==1) debugwin.innerHTML+=globrand+'='+rand+' text='+text+'<br>';
	islandsearch=text.split(',');
	islandsearchs=number(islandsearch[islandsearch.length-1]);
	islandsearch.splice(islandsearch.length-1,1);
	if (islandsearchs<10000) islandsearchs=tm;
	if (debug==1) debugwin.innerHTML+='Timeout='+islandsearchs+'<br>';
	setTimeout(getisles,islandsearchs);
}

var runs=0;setTimeout(servwhat,tm);
function servwhat(){
	if (debug == 1) {
		if (debug==1) debugwin.innerHTML+='Starting with tm='+tm+'<br>';
		if (runs==0) post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=0",servresponse,'req');
		else post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=1",servresponse,'req');
	} else {
		if (runs==0) post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=0",servresponse,'req');
		else post( col+'rob.php','s='+serverindex+'&w='+world+"&grid="+globrand+"&rid="+rand+"&c=1",servresponse,'req');
	}
	runs++;
}

function smallimages(obj,sx,sy){
	forall('//img', obj, function(obj,i){
		obj.width=sx;obj.height=sy;
	});
};

function deleteLastRow(tbl,rows){
	for (var i=0; i < rows; i++) tbl.deleteRow(tbl.rows.length-1);
}

function informpost(text,tag){
	ProgressStepIt();
	switch (tag) {
		case 'player':
			ProgressStepIt();
			nfoframe=$("nfoframe");
			nfoframe.innerHTML=text;
			ProgressStepIt();
			clickTo(XX('//a[@class="search_alliance"]',XPFirst, nfoframe),showplayernfo,1);
			clickTo(XX('//a[@class="search_player"]',XPFirst, nfoframe),showplayernfo,1);
		break;
		case 'ally':
			ProgressStepIt();
			nfoframe=$("nfoframe");
			nfoframe.innerHTML=text;
			ProgressStepIt();
			clickTo(XX('//a[@class="search_alliance"]',XPFirst, nfoframe),showplayernfo,1);
			forall('//a[@class="page"]', nfoframe, function(obj,i){
					clickTo(obj,showplayernfo,1);
					ProgressStepIt();
			});

		break;
		case 'searchbar':
			ProgressStepIt();
			nfoframe=$("nfoframe");
			nfoframe.innerHTML=text;
			ProgressStepIt();
			forall('//a[@class="pagebar"]', nfoframe, function(obj,i){
					clickTo(obj,showplayernfo,1);
					ProgressStepIt();
			});

		break;
	}
	ProgressDestroy();
}

function showplayernfo(e){
	var nfo=$("nfoframe");
	if (!nfo) {
		var nfo=node('div','nfoframe',null,"left:"+parseInt((window.innerWidth/2)-200)+"px;top:"+parseInt((window.innerHeight/2) - 200)+"px;");
		getbody.appendChild(nfo);
	}
	var srcEl=mapevt(e);
	if (srcEl) {		
		switch (srcEl.className) {
			case 'questowner':
				ProgressCreate(10,txtinfodata);
				post(ika+'/search_player.php','s='+serverindex+'&w='+world+'&p='+srcEl.title+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,'player');
				break;
			case 'questally':
				ProgressCreate(10,txtinfodata);
				nfo.setAttribute('style','top:160px;left:'+parseInt((window.innerWidth/2)-300)+'px;');
				post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+srcEl.title+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,'ally');
				break;
			case 'inseln':
				ProgressCreate(10,txtcoorddata);
				var coord=srcEl.title.split(',')[0];
				post(ika+'/suche.php?view=suche_stadt','seite=&land_i='+serverindex+'&wunder=0&welt='+world+'&highscoreType=0&spieler=&allianz=&insel_name=&stadt=&x_sc_i=0&x='+coord.split(':')[0]+'&x2_sc_i=0&x2=&y_sc_i=0&y='+coord.split(':')[1]+'&y2_sc_i=0&y2=&holz_sc_i=0&holz_level=&luxus_i=0&luxus_sc_i=0&luxusgut_level=&rathaus_sc_i=0&rathaus=&besiedelt_sc_i=0&besiedelt=&asc_desc=&sortierung_i=0&asc_desc_2_i=0&sortierung_2_i=0&submit=Search',informpost,'mapisland');
			case 'nfomapbuttona':
				var alliance=XX('//input[@id="nfoalliance"]',XPFirst,nfo);
				if (alliance) {
					ProgressCreate(10,txtmapdata2);
					get(ika+'/suche.php?view=weltkarte&old_view=ikariam_spieler&land='+country+'&welt='+world+'&wunder=0&insel_name=&x=&y=&x2=&y2=&y=&holz_level=&besiedelt=&x_sc==&y_sc==&holz_sc==&besiedelt_sc==&luxus=luxusgut&luxus_sc==&luxusgut_level=&spieler=&allianz='+alliance.value+'&stadt=&rathaus=&rathaus_sc==',informpost,'map');
				}
				break;
			case 'nfomapbuttonp':
				var player=XX('//input[@id="nfoplayer"]',XPFirst,nfo);
				if (player){
					ProgressCreate(10,txtmapdata);
					get(ika+'/suche.php?view=weltkarte&old_view=ikariam_spieler&land='+country+'&welt='+world+'&wunder=0&insel_name=&x=&y=&x2=&y2=&y=&holz_level=&besiedelt=&x_sc==&y_sc==&holz_sc==&besiedelt_sc==&luxus=luxusgut&luxus_sc==&luxusgut_level=&spieler='+player.value+'&allianz=&stadt=&rathaus=&rathaus_sc==',informpost,'map');
				}
				break;
			case 'search_player':
				var player=XX('//input[@id="nfoplayer"]',XPFirst,nfo);
				if (player) {
					ProgressCreate(10,txtpagedata);
					post(ika+'/search_player.php','s='+serverindex+'&w='+world+'&p='+player.value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,'player');
				}
				break;
			case 'search_alliance':
				var alliance=XX('//input[@id="nfoalliance"]',XPFirst,nfo);
				if (alliance) {
					ProgressCreate(10,txtpagedata);
					post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+alliance.value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+sea,informpost,'ally');
				}
				break;
			case 'page':
				var page=srcEl.title;
				var alliance=XX('//input[@id="nfoalliance"]',XPFirst,nfo);
				if (alliance) {
					ProgressCreate(10,txtpagedata);
					post(ika+'/search_ally.php','s='+serverindex+'&w='+world+'&a='+alliance.value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+'&pg='+page+sea,informpost,'ally');
				}
				break;
			case 'pagebar':
				var page=srcEl.title;
				var stable=$('searchtable');
				if (stable){
					ProgressCreate(10,txtinfodata);
					nfo.setAttribute('style','top:160px;left:'+parseInt((window.innerWidth/2)-300)+'px;');
					post(ika+'/searchbar.php','s='+serverindex+'&w='+world+'&p='+XX('//input[@name="SearchPlayer"]',XPFirst,stable).value+ '&msl=' + XX('//input[@name="SearchMilitaryScoreL"]', XPFirst, stable).value + '&msh=' + XX('//input[@name="SearchMilitaryScoreH"]', XPFirst, stable).value + '&gsl=' + XX('//input[@name="SearchGoldScoreL"]', XPFirst, stable).value + '&gsh=' + XX('//input[@name="SearchGoldScoreH"]', XPFirst, stable).value + '&thl=' + XX('//input[@name="SearchTownHallLevelL"]', XPFirst, stable).value + '&thh=' + XX('//input[@name="SearchTownHallLevelH"]', XPFirst, stable).value +'&c='+XX('//input[@name="SearchCity"]',XPFirst,stable).value+'&st='+XX('//select[@name="SearchStatus"]',XPFirst,stable).value+'&a='+XX('//input[@name="SearchAlliance"]',XPFirst,stable).value+'&rad='+XX('//input[@name="SearchRadius"]',XPFirst,stable).value+'&prc='+XX('//li[@class="viewCity"]/a',XPFirst).href.split('id=')[1]+'&pg='+page+sea,informpost,'searchbar');
				}
				break;
		}
	}
}

function markscores(){
var table = XX('//table[@id="memberList"]',XPFirst);
	if (table) {
		var allieslist = '';
		var score;
		forallrows(table, 1, function(tbl, i){
			score=trim(tbl.rows[i].cells[4].innerHTML.split('(')[0]);
			allieslist += "," + tbl.rows[i].cells[1].innerHTML + "#^^" + number(score) + ",";
			tbl.rows[i].cells[4].innerHTML=score+"("+score+")";
		});
		GM_setValue("AlliesEmbassyList",allieslist);
	}		
}

function Embassy() {
	var table = XX('//table[@id="memberList"]',XPFirst);
	if (table) {
		var allyscore = $X('id("mainview")/div[@class="contentBox01h"][1]//tbody/tr[4]/td[2]');		
		var allymembers = $X('id("mainview")/div[@class="contentBox01h"][1]//tbody/tr[2]/td[2]');		
		if (allyscore && allymembers){
			var allyscorenr=number(allyscore.textContent.substr(allyscore.textContent.indexOf("(")+1));			
			var allymembersnr=number(allymembers.textContent);			
			allyscore.innerHTML+=" --- Average Points Per Member: "+fmtNumber(parseInt(allyscorenr/allymembersnr/100));
		}
		var lastcell=table.rows[i].cells.length-1;		
		//GM_setValue("AlliesEmbassyList","")				
		var allieslist=GM_getValue("AlliesEmbassyList","");		
		btn(table.rows[0].cells[lastcell-1],'markscores','markscores','Mark','Mark the scores(Put the actual score to the grey ones).',markscores,5);			
		forallrows(table,1,function(tbl,i){
			var status=tbl.rows[i].cells[0];
			var player=tbl.rows[i].cells[1];			
			var ind=allieslist.indexOf(","+player.innerHTML+"#^^");
			if ( ind==-1) {
				allieslist+=","+player.innerHTML+"#^^"+number(tbl.rows[i].cells[4].innerHTML)+",";			
				GM_setValue("AlliesEmbassyList",allieslist);											
				player.innerHTML+="(Noob)";
				player.setAttribute("style","color:blue;");
			} else {
				var spl=allieslist.substr(ind+1);
				spl=spl.substr(0,spl.indexOf(','));
				spl=spl.split("#^^")[1];
				tbl.rows[i].cells[4].innerHTML+=" <span style='color:darkgray'>("+fmtNumber(spl)+")</span>";
			}			
			if (status.className != "online") {
				if (status.title.search('01.01.1970') != -1) {
					status.innerHTML = "<div style='width:80px;float:left'><img src='"+bulbinimg+"' style='width:10px;height:13px;'/>&nbsp;&nbsp;"+SideBar_Search_PlayerInactive+"</div>";
					status.setAttribute('class', "");
					status.parentNode.setAttribute('style', "color:gray;");
					status.setAttribute('style', "text-align:left;");
				}
				else {
					status.setAttribute('class', "");
					status.setAttribute('style', "color:brown;text-align:left;float:left");
					status.innerHTML = "<div style='width:80px;'><img src='skin/layout/bulb-off.gif' style='width:10px;height:13px;'/>&nbsp;" + status.title.split(":")[1] + "</div>";
				}
			} else {
					status.innerHTML = "<div style='width:80px;float:left'><img src='skin/layout/bulb-on.gif' style='width:10px;height:13px;'/>&nbsp;&nbsp;Online</div>";
					status.setAttribute('class', "");				
					status.setAttribute('style', "text-align:left;");
			}
		});
		
		if (testvar("EmbassyCheckTreaties")) {
			table.rows[0].cells[lastcell].setAttribute('style','width:120px');			
			btn(table.rows[0].cells[lastcell],'chktreatyall','checktreaty','Ñº','Check all Players.',checkplayer,5);
			forallrows(table,1,function(tbl,i){				
				var player=tbl.rows[i].cells[1].innerHTML;
				btn(tbl.rows[i].cells[lastcell],'chktreaty'+i,'checktreaty','Ñº',player,checkplayer,2);
			});
		}
		if (testvar("EmbassyPlayerSearch")) 
			table.rows[0].cells[lastcell].setAttribute('style','width:120px');			
			forallrows(table,1,function(tbl,i){
				var player=tbl.rows[i].cells[1].innerHTML;
				btn(tbl.rows[i].cells[lastcell],'questowner'+i,'questowner','?',player,showplayernfo,2);		
			});
		
	}
}

//check the message senders for museum stuff
function checkculturetreaty(text,musplayer){
	var fake=node("div",'','','',text);
	ProgressStepIt();
	var found=0;
	var mplayers="";
			forall('//td[@class="player"]', fake, function(obj,i){				
				mplayers+=","+obj.innerHTML+",";
			});
			
	GM_setValue("CultTtreaties",mplayers);
	if (musplayer=="Check all Players."){
		forall('//*[@class="checktreaty"]',0,function(obj2,i){
				obj2.parentNode.parentNode.setAttribute('style','background-color:#FDF790;');
			});	
		forall('//td[@class="player"]', fake, function(obj,i){
			ProgressStepIt();
			
			forall('//*[@class="checktreaty"][@title="'+obj.innerHTML+'"]',0,function(obj2,i){
				obj2.parentNode.parentNode.setAttribute('style','background-color:lightgray;');
			});		
		});	
		addsbubble('diplomat',TreatyAll);
	} else {
		forall('//td[@class="player"]', fake, function(obj,i){
			ProgressStepIt();
			if (obj.innerHTML==musplayer) found=1;
		});

		if (found==1) {
			addsbubble('diplomat',TreatyYes);
			forall('//*[@class="checktreaty"][@title="'+musplayer+'"]',0,function(obj,i){
				obj.parentNode.parentNode.setAttribute('style','background-color:lightgray;');
			});
		}
		else {
			addsbubble('diplomat',TreatyNo);
			forall('//*[@class="checktreaty"][@title="'+musplayer+'"]',0,function(obj,i){
				obj.parentNode.parentNode.setAttribute('style','background-color:#FDF790;');
			});
		}
	}	
	ProgressDestroy();
}

function getposmuseum(text,musplayer){
	var fake=node("div",'','','',text);
	ProgressStepIt();
	buf=XX('//li[@class="museum"]/a', XPFirst,fake);
	ProgressStepIt();
	get(buf.href,checkculturetreaty,musplayer);
}

function checkplayer(e) { 
	var musplayer;
	ProgressCreate(10,txtchkplayer);
	var obj=mapevt(e);
	ProgressStepIt();
	musplayer=obj.title;
	ProgressStepIt();
	get(XX('//li[@class="viewCity"]/a',XPFirst).href,getposmuseum,musplayer);
}

function Messages(){
	var tbl=XX('//table[@id="messages"]',XPFirst);
	if (tbl) {	
		if (testvar("MessageCheckTreaties")) {
			btn(tbl.rows[0].cells[0], 'chktreatyall', 'checktreaty', 'Ñº', 'Check all Players.', checkplayer, 5);
			for (i = 1; i < tbl.rows.length - 5; i = i + 3) {
				var player = trim(tbl.rows[i].cells[2].textContent);
				btn(tbl.rows[i].cells[0], 'chktreaty' + i, 'checktreaty', 'Ñº', player, checkplayer, 5);
			}
		}
		
		if (testvar("MessagePlayerSearch")) {
			for (i = 1; i < tbl.rows.length - 5; i = i + 3) {
					var player = trim(tbl.rows[i].cells[2].textContent);
					btn(tbl.rows[i].cells[1], 'questowner' + i, 'questowner', '?', player, showplayernfo, 5);
				}
		}
	}
		
}

function fixtreaties(){
	forall("//select[@id='treaties']/option", null, function(obj,i){
		if (obj.firstChild.nodeValue.search(CultureTreaties)!=-1)
		switch (obj.value){
			case '0':
				obj.firstChild.nodeValue = CultureTreatiesCancel;
				break;
			case '1':
				obj.firstChild.nodeValue = CultureTreatiesCancel;
				break;
			case '2':
				obj.firstChild.nodeValue = CultureTreatiesRequest;
		}
	});
}

function playgames(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.id) {
			case 'marioplay':
				if ($("mario")) {
					remove($("mario"));
					return;
				}
				var mydiv = node('iframe', 'mario', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:275px;height:225px; z-index:99;top:200px;left:420px;', null)
				mydiv.src = 'http://www.nihilogic.dk/labs/mario8kb/';
				getbody.appendChild(mydiv);
				break;
			case 'bobleplay':
				if ($("boble")) {
					remove($("boble"));
					return;
				}
				var mydiv = node('div', 'boble', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:275px;height:225px; z-index:99;top:200px;left:420px;', null)
				mydiv.innerHTML = '<embed height="400" width="400" align="" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" menu="false" name="BubbleBobbleTheRevival.swf" bgcolor="#FFFFFF" quality="high" src="http://www.fititis.gr/fititis2/components/flash/BubbleBobbleTheRevival.swf"/><noembed/>';
				getbody.appendChild(mydiv);
				break;
			case 'tetrisplay':
				if ($("tetris")) {
					remove($("tetris"));
					return;
				}
				var mydiv = node('iframe', 'tetris', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:325px;height:325px; z-index:99;top:200px;left:420px;', null)
				mydiv.src = 'http://code.gosu.pl/dl/JsTetris/demo/JsTetris.html';
				getbody.appendChild(mydiv);
				break;
			case 'slotplay':
				if ($("slot")) {
					remove($("slot"));
					return;
				}
				var mydiv = node('iframe', 'slot', null, 'border: 1px solid black; overflow: hidden; position: absolute; background-color: rgb(107, 140, 255);width:765px;height:365px; z-index:99;top:200px;left:320px;', null)
				mydiv.src = 'http://slotmachine.braincast.nl';
				getbody.appendChild(mydiv);
				break;
		}
	}
}

function talkbubble(who,text,fontsize,timeout){
	var x=20;
	var y=-165;
	if (!fontsize) {
		switch (text.split(' ').length) {
			case 1:
				fontsize='19';
			break;
			case 2:
				fontsize='18';
			break;
			case 3:
				fontsize='17';
			break;
			case 4:
				fontsize='15';
			break;
			case 5:
				fontsize='12';
			break;
			default:
				fontsize='10';
		}
	}	
	var parelm;
	switch (who) {
		case 'mayor':
			parelm=$('advCities');
		break;
		case 'general':
			parelm=$('advMilitary');
		break;
		case 'scientist':
			parelm=$('advResearch');
		break;
		case 'diplomat':
			parelm=$('advDiplomacy');
		break;
	}
	bubbles++;
	var canvas=node('canvas','speechbubble'+bubbles,null,'position:relative;top:'+y+'px;left:'+x+'px;width:250px;height:150px;z-index:300;opacity:0.8');
	canvas.setAttribute('onmousemove','this.parentNode.removeChild(this)');
	var canvastext=node('table','speechbubbletext'+bubbles,null,'position:relative;top:'+parseInt(y-125)+'px;text-align:center;vertical-align:middle;left:'+parseInt(x+40)+'px;width:110px;height:57px;z-index:300;font-weight:600;font-family:comic;font-size:'+fontsize+'px','<tr><td>'+text+'</td></tr>');
	if (canvas.getContext){
		var ctx = canvas.getContext('2d');
		//speech bubble 
		ctx.scale(1.5,0.9);
		ctx.beginPath();
		ctx.moveTo(75,25);
		ctx.quadraticCurveTo(25,25,25,62.5);
		ctx.quadraticCurveTo(25,100,50,100);
		ctx.quadraticCurveTo(50,120,30,125);
		ctx.quadraticCurveTo(60,120,65,100);
		ctx.quadraticCurveTo(125,100,125,62.5);
		ctx.quadraticCurveTo(125,25,75,25);
		ctx.stroke();
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fill();
	parelm.appendChild(canvas);
	parelm.appendChild(canvastext);
	}
	if(timeout) addschedule('destroybubble('+bubbles+')',parseInt(timelapse+timeout));
	else {
		timeout=parseInt(text.split(' ').length/2);
		if (timeout<2) timeout=2;
		addschedule('destroybubble('+bubbles+')',parseInt(timelapse+timeout));
	}
}

function destroybubble(bubid){
	var bub=$('speechbubble'+bubid);
	var bubtext=$('speechbubbletext'+bubid);	
	if (bub) remove(bub);
	if (bubtext) remove(bubtext);
}

function schedulerhandler(){
	timelapse++;
	if (scheduler){
		for (var i=0;i<scheduler.length;i++){
			if (scheduler[i][0]==timelapse) {
				eval(scheduler[i][1]);
				scheduler.splice(i,1); //remove queue
				if (i>0) i--;
			}
		}
	}
}

function addschedule(what,tm){
	scheduler.push([tm ,what]);
}

function addsbubble(who,text,tm){
	if (tm) addschedule('talkbubble("'+who+'","'+text+'")',tm);
	else addschedule('talkbubble("'+who+'","'+text+'")',timelapse+1);
}


addsbubble('mayor','Check out ika-core.org', 175);
addsbubble('scientist','Oh Yeah', 177);
addsbubble('general','It rocks!', 180);

function extrapost(url, data, reqvalue, c, hiturl) {
	GM_xmlhttpRequest({	method: "POST",
						url: url,
						headers:{'Content-type':'application/x-www-form-urlencoded'},
						data:encodeURI('actionRequest='+reqvalue+'&'+data),
						onload: function(xhr) { 
							ProgressStepIt();
							GM_xmlhttpRequest({method: "GET",url: hiturl,onload: function(xhr) {							
								var getactionreq=node("div",null,null,null,xhr.responseText);
								var actionreq=XX('//form[@id="plunderForm"]//input[@name="actionRequest"]',XPFirst,getactionreq);
								c--;
								if (actionreq) {
									if (c>0){
										setTimeout(function() { extrapost('http://'+location.host+'/index.php',data,actionreq.value,c,hiturl); }, parseInt(GM_getValue('BashDelay','2000')));																						
									} else {
										location.href=hiturl;
									}
								} else {
									alert("Could not do "+c+" attacks.");
									location.href=hiturl;
								}
								}});						
						}});
}

function actionshandler(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.className) {
			   case 'plunderbash':
					var postdata='';
					var reqvalue='';
					forall('//form[@id="plunderForm"]//input',null,function(obj,i){
					if(obj.name)
					   if (obj.name=="actionRequest") {
						  reqvalue=obj.value;
					   } else {
						  postdata+=obj.name+'='+obj.value+'&';
					   }
					else
					   postdata+='submit='+obj.value;
					});
					
					if (srcEl.id=='plunderbash2') {
				var c=2;
				ProgressCreate(2,"Attacking x"+c);
				}
					if (srcEl.id=='plunderbash3') {
				var c=3;
				ProgressCreate(3,"Attacking x"+c);
				}
				if (srcEl.id=='plunderbash4') {
				var c=4;
				ProgressCreate(4,"Attacking x"+c);
				}
				if (srcEl.id=='plunderbash5') {
				var c=5;
				ProgressCreate(5,"Attacking x"+c);
				}
				if (srcEl.id=='plunderbash6') {
				var c=6;
				ProgressCreate(6,"Attacking x"+c);
				}
					//else var c=6;
					//ProgressCreate(7,"Attacking x"+c);
					setTimeout(function() { extrapost('http://'+location.host+'/index.php',postdata,reqvalue,c,location.href); }, 0);                                    
				 break;
			case 'schedule':
			alert('lala');
			break;
		}
	}
}

//sidebar
function sidemenu(){
	var top=GM_getValue("SideBarTop","300px");	
	if (parseInt(top)<10) top='10px';
	if (parseInt(top)>600) top='600px';
	var sidebarnode = node("div","sidemenu",null,"left:0px;top:"+top+";",'<ul id="sidebarrow"></ul>');	
	getbody.appendChild(sidebarnode);
	clickTo(sidebarnode,sidebarevents,1);
	sidebarnode.addEventListener("mousemove",sidebareventsmousemove,false);
}

function sidetab(api,nm,title,width,height,initfunc,tag){
	var sidebarnode=$("sidebarrow");
	switch (tag){
		case "mover":
			sidebarnode.innerHTML += '\
				<li><ul><li class="dragsidemenu"><div style="cursor : move;width:12px;height:18px;background: #ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;-moz-outline:#EDA76D outset 4px;-moz-outline-radius:10px 10px 10px 10px;font-size:14px;" Title="' + title + '">â†•</div>\
				</li></ul></li>';
		break;
		case "menu":
			sidebarnode.innerHTML += '\
				<li><ul><li>\
				<a href="#" Title="' + title + '" id="'+api+'alink" class="speedalink">' + nm + '</a>\
				' +	initfunc(width,title) +	'\
				</li></ul></li>';
		break;
		default:			
			sidebarnode.innerHTML += '\
			<li><ul><li><a href="#" Title="' + title + '" id="'+api+'alink" class="speedalink">' + nm + '</a>\
			<ul><li>\
					<div class="korniza" style="width:'+width+'px;"></div>\
					<div class="elisthead" style="width:'+width+'px;">'+title+'</div>\
					<div class="korniza" style="width:'+width+'px;"></div>\
					<div class="elistmain" style="width:'+width+'px;height:'+height+'px;" id="'+api+'main"></div>\
					<div class="elistfoot" style="width:'+width+'px;"></div>\
			</li></ul></li></ul></li>';
	}
	if (initfunc) initfunc();
}

function sidebarevents(e){
	var srcEl=mapevt(e);
	if (srcEl) {
		switch (srcEl.className) {
			case "questally":
				showplayernfo(e);
				break;
			case "questowner":
				showplayernfo(e);
				break;
			case "savenotes":
				GM_setValue('ikanotes', $('sidenotes').value);
				break;
			case "playgames":
				playgames(e);
				break;
			case "addfriend":
				if ($('friendname').value == '') {
					alert("Please type in your Friends Name!");
					return
				}
				GM_setValue("Friends", GM_getValue("Friends", "") + $('friendname').value + '#,#');
				friends();
				break;
			case "delfriend":
				GM_setValue("Friends", GM_getValue("Friends", "").replace(srcEl.title + '#,#', ''));
				friends();
				break;
			case "addenemy":
				if ($('Enemiesname').value == '') {
					alert("Please type in your Enemies Name!");
					return
				}
				GM_setValue("Enemies", GM_getValue("Enemies", "") + $('Enemiesname').value + '#,#');
				enemies();
				break;
			case "delenemy":
				GM_setValue("Enemies", GM_getValue("Enemies", "").replace(srcEl.title + '#,#', ''));
				enemies();
				break;
			case "savesettings":
				forall('.//input', $('ikacoresettings'), function(obj, i){
				
					if (obj.type == "checkbox") {
						if (obj.checked == true) 
							GM_setValue(obj.name, '1')
						else 
							GM_setValue(obj.name, '0');
					}
					if (obj.type == "text") {
						GM_setValue(obj.name, obj.value);
					}
				});
				
				
				GM_setValue("Enemies", GM_getValue("Enemies", "").replace(srcEl.title + '#,#', ''));
				enemies();
				break;
			case "SearchMainQuickSearch":
				forall('.//input', $('ikasearch'), function(obj, i){
					if (obj.type == "text") {
						GM_setValue(obj.name, obj.value);
					}
				});
				var nfo = $("nfoframe");
				if (!nfo) {
					var nfo = node('div', 'nfoframe', null, "left:" + parseInt((window.innerWidth / 2) - 300) + "px;top:160px;");
					getbody.appendChild(nfo);
				}
				var stable = $('searchtable');
				if (stable) {
					ProgressCreate(10, txtinfodata);
					nfo.setAttribute('style', 'top:160px;left:' + parseInt((window.innerWidth / 2) - 300) + 'px;');
					post(ika + '/searchbar.php', 's=' + serverindex + '&w=' + world + '&p=' + XX('//input[@name="SearchPlayer"]', XPFirst, stable).value + '&msl=' + XX('//input[@name="SearchMilitaryScoreL"]', XPFirst, stable).value + '&msh=' + XX('//input[@name="SearchMilitaryScoreH"]', XPFirst, stable).value + '&gsl=' + XX('//input[@name="SearchGoldScoreL"]', XPFirst, stable).value + '&gsh=' + XX('//input[@name="SearchGoldScoreH"]', XPFirst, stable).value + '&thl=' + XX('//input[@name="SearchTownHallLevelL"]', XPFirst, stable).value + '&thh=' + XX('//input[@name="SearchTownHallLevelH"]', XPFirst, stable).value +'&c=' + XX('//input[@name="SearchCity"]', XPFirst, stable).value + '&st=' + XX('//select[@name="SearchStatus"]', XPFirst, stable).value + '&a=' + XX('//input[@name="SearchAlliance"]', XPFirst, stable).value + '&rad=' + XX('//input[@name="SearchRadius"]', XPFirst, stable).value + '&prc=' + XX('//li[@class="viewCity"]/a', XPFirst).href.split('id=')[1]+sea, informpost, 'searchbar');
				}
				break;
			case "SearchMainQuickClear":
				forall('.//input', $('ikasearch'), function(obj, i){
					if (obj.type == "text") {
						obj.value="";
					}
				});				
				break;
		}		
/*		if (srcEl.id) {		
			switch (srcEl.id) {
			}
		}*/
	}
}

function sidebareventsmousemove(e){
//various speed hacks
	var srcEl=mapevt(e);
	if (srcEl) {
//		switch (srcEl.className) {			
//			case "speedalink":
//				alert(XX(".//div[@class='elistmain']",XPFirst,srcEl.parentNode));
//		}		
		if (srcEl.id) {		
//		alert(srcEl.id);
		//alert(XX(".//div[@class='elistmain']",XPFirst,srcEl).id);
			switch (srcEl.id) {
				case "Settingsmain":
				case "SettingsCont":
					settingscont();
					break;
			}
		}
	}
}


function sidetabs(){
	sidemenu();
	sidetab("","", SideBar_Drag, 0,0 ,null,"mover");
	if (GM_getValue("SideBarSearch",1)==1)  sidetab("search", SideBar_Search, SideBar_SearchT, "500", "100%;",search);
	if (GM_getValue("SideBarTools",1)==1) 	sidetab("Tools", ''+alliancenm+'â„¢', SideBar_ToolsT, 200, "100%",tools,"menu");
	if (GM_getValue("SideBarNotes",1)==1) 	sidetab("Notes",SideBar_Notes, SideBar_NotesT, 400, 400,notesinit);
	if (GM_getValue("SideBarAllies",1)==1) 	sidetab("Allies",SideBar_Allies, SideBar_AlliesT, 100, "100%", alliancelist,"menu");
	if (GM_getValue("SideBarEnemies",1)==1) sidetab("Enemies",SideBar_Enemies, SideBar_EnemiesT, 150, 340, enemies);
	if (GM_getValue("SideBarFriends",1)==1) sidetab("Friends",SideBar_Friends, SideBar_FriendsT, 150, 270,friends);
	}

function tools(width,title){	
		var tempmenu='<li><div class="korniza" style="width:'+width+'px"></div>\
<div class="elisthead" style="width:'+width+'px;">'+title+'</div>\
<div class="korniza" style="width:'+width+'px"></div>';
		var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;-moz-outline:none;border-bottom:brown dotted 1px" ';
		corsairmenu=[['http://'+location.host+'/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&type=50' , AllianceMenu[0][1], AllianceMenu[0][0],'','-'],
		[forumurl	,  AllianceMenu[1][1], AllianceMenu[1][0],''],
		[forumurlnew,  AllianceMenu[2][1], AllianceMenu[2][0],'','-'],
		['http://ikariamlibrary.com/?content=IkaFight' ,  AllianceMenu[5][1], AllianceMenu[5][0],'window.open(this.href, this.target, \'width=1070,height=800\'); return false;','-'],
		['http://www.ika-core.org',  AllianceMenu[6][1], AllianceMenu[6][0],'']];	   
		for (i=0;i<corsairmenu.length;i++) {
			switch (corsairmenu[i][0]) {
			case '.':
				break;
			case '':
				if (corsairmenu[i][3]!="makeframes('.');") tempmenu+='<li><center><a '+style+' target="_blank" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			default:
				tempmenu+='<li><center><a '+style+' target="_blank" href="'+corsairmenu[i][0]+'" title="'+corsairmenu[i][1]+'" onclick="'+corsairmenu[i][3]+'">'+corsairmenu[i][2]+'</a></center></li>';
				break;
			}
		}
 	tempmenu+='<div class="elistfoot" style="width:'+width+'px;"/>';	
   return '<ul>'+tempmenu+'</ul>';
}

function indexing(width,title){
	var maplink=ika+'/world.php?sx=3.4&sy=2.8&s='+serverindex+'&w='+world+'&perc=1';
	var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;-moz-outline:none;border-bottom:brown dotted 1px" ';
	return "<ul><li><div class=\"korniza\"></div>\
	<div class=\"elisthead\" style=\"width:100%;\">"+title+"</div>\
	<div class=\"korniza\"></div>\
	<li><a href='#' onclick='document.getElementById(\"progmap\").src=\""+maplink+"\"' "+style+">Get Map</a></li><li><a href='http://www.ika-core.org' target='_blank' "+style+">Data by ika-core.org</span><br><img id='progmap' src=''/></a><div class='elistfoot' style='width:"+width+"px;'/></li></ul>";
}

function news(){
	var masternode=$("Newsmain");
	var notes=GM_getValue("ikanotes","Escribir aqui.");
	var injct='';
	injct+='\
<div style="height:200px;text-align: left; overflow: -moz-scrollbars-vertical; overflow-x: auto; overflow-y: auto;">\
Nuevo Scipt
<div>';
	masternode.innerHTML=injct;	
}

function chat(){
}

function alliancelist(width,title){	
	var style=' style="width:90%;cursor:pointer;margin:0px 0px 0px 0px;padding:1px 2px 1px 2px;-moz-outline:none;" ';
	var tempmenu='<li><div class="korniza"></div>\
<div class="elisthead" style="width:100%;">'+title+'</div>\
<div class="korniza"></div>';
   for (var i=0;i<alliance.length;i++){
		if (alliance[i][1]==Alliance){
			tempmenu+='<li><a id="questally" class="questally" title="'+alliance[i][0]+'" '+style+'>'+alliance[i][0]+'</a></li>';
		}
	}
   for (var i=0;i<alliance.length;i++){
		if (alliance[i][1]==Allies){
			tempmenu+='<li><a id="questally" class="questally" title="'+alliance[i][0]+'" '+style+'>'+alliance[i][0]+'</a></li>';
		}
	}
  	tempmenu+='<div class="elistfoot" style="width:'+parseInt(width+8)+'px;"/>';	
	return '<ul>'+tempmenu+'</ul>';
}

function notesinit(){
	var masternode=$("Notesmain");
	var notes=GM_getValue("ikanotes","Empty.");
	var injct='<textarea id="sidenotes" cols="57" wrap="soft" rows="21" style="background:#ECCF8E;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584">'+notes+'</textarea><br>';
	var style=' style="display: inline;width:40px;cursor:pointer;margin:5px 5px 5px 5px;padding:2px 2px 2px 2px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;-moz-outline:none;" ';
	injct+='<br><a id="savenotes" class="savenotes" title="Click to save notes" '+style+'>'+SideBar_Search_Save+'</a>';
	masternode.innerHTML=injct;
}

function enemies(){
	var masternode=$("Enemiesmain");
	var style=' style="display: inline;width:40px;height:10px;cursor:pointer;margin:3px 0px 0px 0px;padding:0px 1px 1px 0px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;-moz-outline:none;" ';
	var style2=' style="width:16px;height:16px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;-moz-outline:none;" ';
	var style3=' style="width:16px;height:13px;cursor:pointer;margin:3px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;-moz-outline:none;" ';
	var enemieslist=GM_getValue("Enemies","").split('#,#');
	var injct='\
<div style="height:210px;  overflow: -moz-scrollbars-vertical; overflow-x: auto; overflow-y: auto;">\
<table id="enemiestable" cellpading=2 cellmargin=2 border=0><tbody>';
	for (var i=0;i<enemieslist.length-1;i++){
		injct+='<tr><td style="width:120px;border-bottom:brown dotted 1px;color:red;">'+enemieslist[i]+'</td><td><img id="questowner" class="questowner" title="'+enemieslist[i]+'" '+style2+' src="'+searchimg+'"/></TD><TD><img '+style3+' class="delenemy" title="'+enemieslist[i]+'" src="'+ximg+'"/></td></tr>';
	}
	injct+='</tbody></table></div><br>';
	injct+='<input id="Enemiesname" type="text" title="Type in Enemy Name" value="" size="17%" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-color:#5D4C2F #C9A584 #ffffff #C9A584;border-style:double;"/><br>';
	injct+='<div style="width:100%;height:1px;padding:3px 3px 3px 3px;"/><a id="add" class="addenemy" title="Click to add a new Enemy " '+style+'>'+SideBar_Search_Add+'</a>';
	var style=' style="width:149px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;-moz-outline:none;border-bottom:brown dotted 1px" ';
	var tempmenu='<br><br><div class="elisthead" style="width:98%">'+SideBar_Search_EnemyAlliances+'</div>';
	for (var i=0;i<alliance.length;i++){
		if (alliance[i][1]==Enemies){
			tempmenu+='<center><a id="questally" class="questally" title="'+alliance[i][0]+'" style="margin:2px 3px 3px 0px;padding:1px 2px 1px 2px;-moz-outline:none;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;">'+alliance[i][0]+'</a></center>';
		}
	}
	masternode.innerHTML=injct+tempmenu;
	
}

function friends(){
	var masternode=$("Friendsmain");
	var style=' style="display: inline;width:32px;height:10px;cursor:pointer;margin:3px 3px 3px 3px;padding:0px 1px 1px 0px;border-color:#ffffff #C9A584 #5D4C2F #C9A584 ;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;-moz-outline:none;" ';
	var style2=' style="width:16px;height:16px;cursor:pointer;margin:0px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;-moz-outline:none;" ';
	var style3=' style="width:16px;height:13px;cursor:pointer;margin:3px 0px 0px 0px;padding:0px 0px 0px 0px;border:none;background:none;-moz-outline:none;" ';
	var friendslist=GM_getValue("Friends","").split('#,#');
	var injct='\
<div style="height:210px;  overflow: -moz-scrollbars-vertical; overflow-x: auto; overflow-y: auto;">\
<table id="friendstable" cellpading=2 cellmargin=2 border=0><tbody>';
	for (var i=0;i<friendslist.length-1;i++){
		injct+='<tr><td style="width:120px;border-bottom:brown dotted 1px;color:green;">'+friendslist[i]+'</td><td><img id="questowner" class="questowner" title="'+friendslist[i]+'" '+style2+' src="'+searchimg+'"/></TD><TD><img '+style3+' class="delfriend" title="'+friendslist[i]+'" src="'+ximg+'" /></td></tr>';		
	}
	injct+='</tbody></table></div><br>';
	injct+='<input id="friendname" type="text" title="Type in Friend Name" value="" size="17%" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-color:#5D4C2F #C9A584 #ffffff #C9A584;border-style:double;border-width:1px;"/><br>';
	injct+='<div style="width:100%;height:1px;padding:3px 3px 3px 3px;"/><a id="add" class="addfriend" title="Click to add a new Friends " '+style+'>'+SideBar_Search_Add+'</a>';
	masternode.innerHTML=injct;
}

function iscrow(label,gmval,br){
	var out='';
	var configvalue=GM_getValue(gmval,'1');
	if (configvalue=='1') {
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="checkbox" checked name="'+gmval+'" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;"/></td>';
	}else{
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="checkbox" name="'+gmval+'" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;"/></td>';
	}	
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}

function istrow(label,sz,gmval,defval,br,title){
	var out='';
	if (title) var tle=' Title="'+title+'" ' 
		else var tle='';
		
	var configvalue=GM_getValue(gmval,defval);
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"><input type="text" value="'+configvalue+'" size="'+sz+'" name="'+gmval+'" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}
function istrowttx(label,sz,gmval,defval,br,title){
	var out='';
	if (title) var tle=' Title="'+title+'" ' 
		else var tle='';
		
	var configvalue=GM_getValue(gmval,defval);
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td colspan=3 style="padding:10px 10px 10px 10px;"><input type="text" value="'+configvalue+'" size="'+sz+'" name="'+gmval+'" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}

function istrowex(label,sz,gmval,defval1,defval2,br,title){
	var out='';
	if (title) var tle=' Title="'+title+'" ' 
		else var tle='';
		
	var configvalue1=GM_getValue(gmval+'L',defval1);
	var configvalue2=GM_getValue(gmval+'H',defval2);
		out='<td style="padding:2px 0px 2px 4px;">'+label+'</td><td style="padding:10px 10px 10px 10px;"> '+SideBar_Search_Between+' <input type="text" value="'+configvalue1+'" size="'+sz+'" name="'+gmval+'L" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/> '+SideBar_Search_And+' <input type="text" value="'+configvalue2+'" size="'+sz+'" name="'+gmval+'H" '+tle+' style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}

function isbrow(label,cls,title,br){
	var out='<td style="padding:10px 10px 10px 10px;"><input type="button" value="'+label+'" name="'+label+'" class="'+cls+'" style="cursor:pointer;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;"/></td>';
	if (br) out+='</tr><tr style="border-bottom:1px dotted #E4B873;">';
	return out; 
}
function settings(){
	var masternode = $("Settingsmain");
	masternode.innerHTML += "<center><div id='SettingsCont' style='width:100%;height:100%;font-weight:bold;'><br><br>Move your mouse over here to show the settings.<br>";
	masternode.innerHTML += "It has been done this way to improve perfomance.<br><br></div>";
}

function settingscont(){
	var settingsnode = $("ikacoresettings");
	if (!settingsnode) {
		var masternode = $("Settingsmain");
		masternode.innerHTML = '\
<div id="ikacoresettings" style="height:280px;cursor:default;overflow: -moz-scrollbars-vertical; overflow-x: none; overflow-y: auto;border-bottom:1px solid #ffffff;">\
<table id="settingstable" class="table01">\
<thead><tr><td colspan=4><h3><b><u>Side Bar Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow(SideBar_Search, 'SideBarSearch') +
		iscrow(SideBar_Notes, 'SideBarNotes', 1) +
		iscrow(SideBar_Allies, 'SideBarAllies') +
		iscrow(SideBar_Enemies, 'SideBarEnemies', 1) +
		iscrow(SideBar_Friends, 'SideBarFriends') +
		iscrow(SideBar_Games, 'SideBarGames', 1) +
		iscrow(alliancefullnm, 'SideBarTools') +
		iscrow(SideBar_Indexing, 'SideBarIndexing', 1) +
		iscrow(SideBar_Chat, 'SideBarChat') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Attack/Schedule Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrow('Attack Delay (in milisec, 1000 ms=1 sec)', 4, 'BashDelay', 2000) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>City View Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Toggle buttons', 'CityToggleButtons') +
		iscrow('Building Levels', 'CityBuildingLevels') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Island View Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">\
<td colspan=4>Colors can be defined as strings like: red, lightyellow <br>\
or as hexadecimal like #rrggbb <br>\
for example #800000 (darkred).<td></tr>' +
		istrow('Alliance Color ', 4, 'AllianceColor', 'blue') +
		istrow('No Alliance Color ', 4, 'NoAllianceColor', 'purple', 1) +
		istrow('Allies Color ', 4, 'AlliesColor', 'cyan') +
		istrow('Enemies Color ', 4, 'EnemiesColor', 'red', 1) +
		iscrow('City/Resource Levels', 'IslandLevels', 1) +
		iscrow('Toggle Buttons', 'IslandToggleButtons') +
		iscrow('City/Resource Levels', 'IslandLevels', 1) +
		iscrow('Player Names under Cities', 'IslandPlayerNames') +
		iscrow('Text Effects for Inactives<br> and Players on Vacation', 'IslandInVac', 1) +
		iscrow('Make Inactives text blink', 'IslandInactiveBlink') +
		iscrow('Show Highlight Legend', 'IslandLegend', 1) +
		iscrow('Highlight Cities based<br> on Alliance', 'IslandHighlight') +
		iscrow('Heart next to<br> Friends Cities', 'IslandFriends', 1) +
		iscrow('Icon next to<br> Enemies Cities', 'IslandEnemies') +
		iscrow('Icon next to Cities <br> with Spies', 'IslandSpies', 1) +
		iscrow('Icon next to Cities <br> with signed Cultural Treaty.', 'IslandCultTreaties') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Messsages View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Check treaty buttons', 'MessageCheckTreaties') +
		iscrow('Find player Cities button', 'MessagePlayerSearch') +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Embassy View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Check treaty buttons', 'EmbassyCheckTreaties') +
		iscrow('Find player Cities button', 'EmbassyPlayerSearch', 1) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Highscore View</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		iscrow('Find Alliance Cities Button', 'HighscoreAllianceSearch') +
		iscrow('Find Player Cities Button', 'HighscorePlayerSearch', 1) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Chat Sidebar</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrow('Width', 3, 'ChatWidth', 1009) +
		istrow('Height', 3, 'ChatHeight', 400, 1) +
		'</tr></tbody><thead><tr><td colspan=4><h3><b><u>Alliance Message Settings</u></b></h3></td></tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873">' +
		istrowttx('Signature(write #br# to change row)', 20, 'Signature', '', 1) +
		'</tr></tbody></table></div>\
<div style="width:100%;height:1px;padding:1px 0px 0px 0px;background:#C9A584"/>\
<div style="width:100%;height:1px;padding:1px 0px 0px 0px;background:#5D4C2F"/>\
<div style="width:100%;height:5px;padding:5px 5px 5px 5px;"/>\
<a id="savesettings" class="savesettings" title="Click to save settings" style="display: inline;width:40px;height:10px;cursor:pointer;margin:0px 3px 0px 3px;padding:0px 1px 1px 0px;border-color:#ffffff #C9A584 #5D4C2F #C9A584;border-style:double;border-width:3px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;-moz-outline:none;">' +
		SideBar_Search_Save +
		'</a>';
	}
}
function search(){
	var masternode=$("Searchmain");
	masternode.innerHTML+='\
<div id="ikasearch" style="cursor:default">\
<table id="searchtable" class="table01" width="100%">\
<thead><tr>\
<td style="font-weight:600;font-size:12px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-right:#C9A584 solid 1px;padding:3px 3px 3px 3px;">'+SideBar_Search_QuickSearch+'</td>\
<td style="font-weight:0;font-size:12px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:gray;border-right:#C9A584 solid 1px;border-bottom:#C9A584 solid 1px;padding:3px 3px 3px 3px;">'+SideBar_Search_AdvancedSearch+'</td>\
<td style="font-weight:0;font-size:12px;background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:gray;border-right:#C9A584 solid 1px;border-bottom:#C9A584 solid 1px;padding:3px 3px 3px 3px;">Island Search</td>\
</tr></thead><tbody><tr style="border-bottom:1px dotted #E4B873"><td colspan="3">\
<div id="mainsearch"><table width="100%"><tr>'
+istrow(SideBar_Search_Player,12,'SearchPlayer','',1,"Use the '%' as a Wildcard, example: pa% will fetch paul,pauline etc")
+istrow(SideBar_Search_City,12,'SearchCity','',1,"Use the '%' as a Wildcard, example: Ath% will fetch Athens, etc")+'\
<tr><td style="padding:2px 0px 2px 4px;">'+SideBar_Search_PlayerStatus+'</td>\
<td style="padding:10px 10px 10px 10px;">\
<select id="SearchStatus" name="SearchStatus" title="Select the Player Status" style="background:#ECCF8E url(/skin/input/button.gif) repeat-x scroll 0 0;color:#542C0F;border-style:double;border-color:#5D4C2F #C9A584 #ffffff #C9A584">\
	<option Title="Player Status:All" value="%">'+SideBar_Search_PlayerAll+'</option>\
	<option Title="Player Status:Unknown" value="-1">'+SideBar_Search_PlayerUnknown+'</option>\
	<option Title="Player Status:Normal" value="0">'+SideBar_Search_PlayerNormal+'</option>\
	<option Title="Player Status:Vacation" value="1">'+SideBar_Search_PlayerVacation+'</option>\
	<option Title="Player Status:Inactive" value="2">'+SideBar_Search_PlayerInactive+'</option>\
</select></td></tr>'
+istrow(SideBar_Search_Alliance,1,'SearchAlliance','',1,"Use the '%' as a Wildcard, example: A% will fetch all starting with A, %S will get all ending with S, use the - (minus) for no alliance")
+istrow(SideBar_Search_Radius,1,'SearchRadius','',1,"Leave blank for any radius, must be a number. Specifies the distance of your results. example: 2 will show only 2 islands away.")
+istrowex(SideBar_Search_TownHallLevel,5,'SearchTownHallLevel',0,32,1,"Type in low and high limit.")
+istrowex(SideBar_Search_MilitaryScore,5,'SearchMilitaryScore',0,99999,1,"Type in low and high limit.")
+istrowex(SideBar_Search_GoldScore,8,'SearchGoldScore',0,99999999,1,"Type in low and high limit.")
+isbrow(SideBar_Search_Clear,'SearchMainQuickClear',"Click to clear Search Criteria")
+isbrow(SideBar_Search_Search,'SearchMainQuickSearch',"Click to start Search")
+'</tr></table></div>\
<div id="advanced" style="visibility:hidden"><table width="100%"><tr>'
+'</tr></table></div>\
</td></tbody></table></div>';
/*<hr>\
<h3><b><u>Advanced Search</u></b></h3>\
Radius&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
X&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Y&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Island&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Island resource type&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Townhall Level&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Limit results&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
Player Status&nbsp;<input type="text" value="" name="showlevelscity"/><br>\
<hr>\
</div>\
';*/
}
function gameslist(width,title){	
	var style=' style="width:'+width+'px;cursor:pointer;margin:0px 0px 0px -2px;padding:2px 2px 2px 2px;-moz-outline:none;border-bottom:brown dotted 1px" ';
//	var tempmenu='<li><div class="elisthead" style="width:'+width+'px;border-bottom:brown outset 2px">'+title+'</div>\
	var tempmenu='<li><div class="korniza"></div>\
	<div class="elisthead" style="width:100%;">'+title+'</div>\
	<div class="korniza"></div>\
	<li><a id="marioplay" class="playgames" '+style+' title="Opens mini Mario bros game, its better than Ikariam. trust me.">Mario Bros</a></li>\
	<li><a id="bobleplay" class="playgames" '+style+' title="Opens mini Buble Boble game, some action to ikariam players. weeeeeeeeeeh.">Buble Boble</a></li>\
	<li><a id="tetrisplay" class="playgames" '+style+' title="Opens mini Tetris game, for the brains among u.">Tetris</a></li>\
	<li><a id="slotplay" class="playgames" '+style+' title="Opens mini slot machine, viva Las Vegas.">Slot Machine</a></li>';
  	tempmenu+='<div class="elistfoot" style="width:'+width+'px;"/>';	
	return '<ul>'+tempmenu+'</ul>';
}

function Highscores(){
	var magic=XX('//select[@name="highscoreType"]',XPFirst);
	if (magic){
		var magic=XX('//td[@class="allytag"]',XPFirst);
		if (magic) {
		if (testvar('HighscorePlayerSearch'))
			forall('.//td[@class="name"]',$('mainview') , function(obj,i){;
				btn(XX('.//td[@class="action"]',XPFirst,obj.parentNode),'questowner'+i,'questowner','?',obj.innerHTML,showplayernfo,5);});
		if (testvar('HighscoreAllianceSearch'))
			forall('.//td[@class="allytag"]', null, function(obj, i){
				btn(obj, 'questally' + i, 'questally', '?', obj.textContent, showplayernfo, 5);
			});			
		} else {
		if (testvar('HighscoreAllianceSearch'))
		forall('.//td[@class="name"]',$('mainview') , function(obj,i){;
				var ally=obj.textContent.split('(')[1];
					ally=ally.split(')')[0];					
				btn(XX('.//td[@class="action"]',XPFirst,obj.parentNode),'questally'+i,'questally','?',ally,showplayernfo,5);});	
		}
	}
}

function focus(direction){
    var all = getCityLinks();
    var now = unsafeWindow.selectedCity;
    var cur = $X('id("cityLocation' + now + '")/a') || all[all.length - 1];
    if (all.length) {
        now = all.map(function(a){
            return a.id;
        }).indexOf(cur.id);
        click(all[(now + direction + all.length * 3) % all.length]);
    }
}

function getCityLinks(){
    return $x('id("cities")/li[contains(@class,"city level")]/a');
}

function keyHandler(evt){

    function invoke(a){
        a = $X('id("actions")/ul[@class="cityactions"]/li[@class="' + a + '"]/a');
        return function(){
            if (a && a.href) 
                location.href = a.href;
        };
    }
    
    function counterClockwise(){
        focus(-1);
    }
    function clockwise(){
        focus(1);
    }
    
    function tab(){
        if (!evt.altKey && !evt.ctrlKey && !evt.metaKey) 
            focus(evt.shiftKey ? -1 : 1);
    }
    
    function invoketogo(a){
        return function(){
            location.href = a;
        };
    }
    var srcEl = mapevt(evt);
    if (srcEl.tagName=="HTML") {	   
	    var keys = {
	        "\t": tab,
	        j: counterClockwise,
	        k: clockwise,
	        c: invoke("diplomacy"),
	        t: invoke("transport"),
	        p: invoke("plunder"),
	        b: invoke("blockade"),
	        s: invoke("espionage"),
	        i: invoketogo("http://" + location.host + "/index.php?view=tradeAdvisor&oldView=militaryAdvisorCombatReports"),
	        m: invoketogo("http://" + location.host + "/index.php?view=militaryAdvisorCombatReports&oldView=militaryAdvisorCombatReports"),
	        d: invoketogo("http://" + location.host + "/index.php?view=diplomacyAdvisor&oldView=tradeAdvisor"),
	        n: invoketogo("http://" + location.host + "/index.php?view=merchantNavy")
	    };
	    
	    var action = keys[String.fromCharCode(evt.keyCode || evt.charCode)];
	    if (action && evt.ctrlKey==false && evt.altKey==false) {
	        //fucks up copy paste (ctrl+c,ctrl+p, etc)
			//evt.stopPropagation();
	        //evt.preventDefault();
	        action();
	    }
	}    
}

function TransporterOver(){DestinationCitiesTransporter.style.visibility="visible";}
function TransporterHide(){DestinationCitiesTransporter.style.visibility="hidden";}
var pnode = $('breadcrumbs');
var citySelect = $("citySelect");
var htmls = "";
var TransporterNode=node('div','IkaCoreTransporter','IkaCoreTransporter','float:left;position:relative;top:-2px;','<img height="22" width="28" alt="Transport" title="Transport Goods to one of your Cities" src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif"/>-');
var DestinationCitiesTransporter=node('div','DestinationCitiesTransporter','DestinationCitiesTransporter','position:absolute;visibility:hidden;width:400px;background:#F6EBBC none repeat scroll 0 0;color:#542C0F;border-color:#ffffff #5D4C2F #000000 #C9A584;border-style:double;border-width:3px;');
htmls+='<div style="background:#ECCF8E url('+gradient+') repeat-x scroll 0 0;width:100%;height:15px;text-align:center;line-heigth:15px;font-size:11px;font-weight:bold;">Transport to:</div>';

htmls+='<table style="width:100%;">';
for(var i=0;i<citySelect.length;i++) if (!citySelect[i].selected) htmls+='\
<tr style="border-bottom:dotted 1px yellow"><td style="color:#542C0F;padding:5px 5px 5px 5px;">â—&nbsp;<b>'+citySelect[i].text+'</b></td><td><i>'+citySelect[i].title.split(':')[1]+'</i></td>\
<td><a href="index.php?view=transport&amp;destinationCityId='+citySelect[i].value+'" style="margin:0px 2px 0px 10px"><img height="20" width="24" alt="Transport" title="Transport Goods to one of your Cities" src="skin/actions/transport.gif" style="float:right"/></a>\
</td><td><a href="index.php?view=deployment&deploymentType=fleet&destinationCityId='+citySelect[i].value+'" style="margin:0px 2px 0px 2px"><img height="20" width="24" alt="Transport" title="Move Fleet to one of your Cities" src="skin/actions/move_fleet.gif" style="float:right"/></a>\
<td><a href="index.php?view=deployment&deploymentType=army&destinationCityId='+citySelect[i].value+'" style="margin:0px 2px 0px 2px"><img height="20" width="24" alt="Transport" title="Move Army to one of your Cities" src="skin/actions/move_army.gif" style="float:right"/></a>\
</td></tr>';
htmls+='</table>';

DestinationCitiesTransporter.innerHTML=htmls;
TransporterNode.appendChild(DestinationCitiesTransporter);
pnode.insertBefore(TransporterNode,pnode.firstChild);
TransporterNode.addEventListener('mouseover',TransporterOver,false);
TransporterNode.addEventListener('mouseout',TransporterHide,false);

var timez = new Date().getHours();
function main(){
	lang();
	version_update();
	var bodyid=getbody.id;
	switch (bodyid){
		case "island":
			islandview();
			var playerlookup=cityinfoPanelIsland();
			if (playerlookup) clickTo(playerlookup,showplayernfo,1);
			forall('//ul[@class="cityinfo"]/li[@class="owner"]', null, function(obj,i){ btn(obj,'questowner'+i,'questowner','?',trim(obj.textContent.split(':')[1]),null,10);});
			forall('//ul[@class="cityinfo"]/li[@class="ally"]', null, function(obj,i){ btn(obj,'questally'+i,'questally','?',trim(obj.textContent.split(':')[1]),null,30);});
		break;
		case "city":
			btn(getItem('owner'),'questowner','questowner','?',trim(getItem('owner').textContent.split(':')[1]),showplayernfo);
			btn(getItem('ally'),'questally','questally','?',trim(getItem('ally').textContent.split(':')[1]),showplayernfo);
			if (GM_getValue('CityToggleButtons','1')=='1'){
				var paNode=$('breadcrumbs').parentNode;
				if (paNode) btn(paNode,'ShowLevelsCityToggle','gameplay','L','Hides or shows the Buildings Levels.',function(){ togglevar("CityBuildingLevels");location.href=location.href;},5,'position:absolute;top:155px;left:655px;width:5px;z-index:54;');
			}
			if(GM_getValue('CityBuildingLevels','1')=='1'){
					forall('//ul[@id="locations"]/li[contains(@id,"position")]/a', null, function(obj,i){ 
						var lvl = obj.title.replace(/[^\d-]+/g, "");
						if (lvl.length>0) {
							var as=node('a','blevels','blevels',"width:12px;height:12px;top:10px;left:25px;",lvl);
							obj.parentNode.appendChild(as);}
					});		
			};
		break;
		case "museum":
			var mplayers="";
			forall('//td[@class="player"]', null, function(obj,i){				
				mplayers+=","+obj.innerHTML+",";
			});
			GM_setValue("CultTtreaties",mplayers);
			//alert(mplayers);
		break;
		case "branchOffice":
			var table=XX('//table[@class="tablekontor"]', XPList).snapshotItem(1);
			if (table) {
				forallrows(table, 1, function(tbl,i){
					var nm=tbl.rows[i].cells[0].textContent.split('(')[1];
					if (nm) {
						nm=nm.split(')')[0];
						btn(tbl.rows[i].cells[tbl.rows[i].cells.length-1],'questowner'+i,'questowner','?',nm,showplayernfo,5);
					}
				});
			}
		break;
		/*case "plunder":
		 var form=XX('//form[@id="plunderForm"]//input[@type="submit"]',XPFirst).parentNode;
		 btn(form,'plunderbash2','plunderbash','x2 Attack','Attack the city 2 times.',actionshandler,80,';color:#542C0F;font-size:11px;');
		 btn(form,'plunderbash3','plunderbash','x3 Attack','Attack the city 3 times.',actionshandler,20,';color:#542C0F;font-size:11px;');
		 btn(form,'plunderbash4','plunderbash','x4 Attack','Attack the city 4 times.',actionshandler,20,';color:#542C0F;font-size:11px;');
		 btn(form,'plunderbash5','plunderbash','x5 Attack','Attack the city 5 times.',actionshandler,20,';color:#542C0F;font-size:11px;');
		 btn(form,'plunderbash6','plunderbash','x6 Attack','Attack the city 6 times.',actionshandler,20,';color:#542C0F;font-size:11px;');
		 btn(form,'schedule','plunderbash','Schedule Attack(not yet working)','Attack the city at a specified time.',actionshandler,20,';color:#542C0F;font-size:11px;');
		 break;*/
		case "sendMessage":
		case "sendAllyMessage":
			var messagetext=XX('//textarea[@id="text"]',XPFirst);

			var sigbuf=GM_getValue("Signature","");
			sigbuf = sigbuf.replace( new RegExp( "(#)(B|b)(R|r)(#)", "g" ), "\n" );			
			messagetext.innerHTML="\n\n"+sigbuf+messagetext.innerHTML;			
		break;
			
	}
	setInterval ( schedulerhandler, 1000 );
	sidetabs();	
	Embassy();
	Messages();
	Highscores();
	
	//key setup
//	if (bodyid !="townHall" || bodyid !="options" || bodyid !="sendAllyMessage" || bodyid !="sendMessage" ) {
    	addEventListener('keypress', keyHandler, true);
//	}	
}

function ToolsMenu(){}
function sortAllies(){}
function showchat(){}

var b2=new Date();
bench.innerHTML='ika-core:'+Math.ceil((b2.getTime()-b1.getTime()))+' ms';
