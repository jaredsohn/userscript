// ==UserScript==
// @name        /r/NFL logo-er
// @author		/u/MrSpontaneous
// @namespace   com.thirteenbytes
// @include     /^https?://www\.reddit\.com/r/nfl(/.*)?$/
// @version     1
// @description	Adds a link to the reddit homepage back to the top-left of r/NFL
// ==/UserScript==

/*
        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
                    Version 2, December 2004 

 Copyright (C) 2004 Sam Hocevar <sam@hocevar.net> 

 Everyone is permitted to copy and distribute verbatim or modified 
 copies of this license document, and changing it is allowed as long 
 as the name is changed. 

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 

  0. You just DO WHAT THE FUCK YOU WANT TO.
*/

GM_addStyle('.reddit-nfl-snoo-logo { position: absolute; }' + 
			'.reddit-nfl-snoo-logo img {'+
				'display: inline;'+
				'padding: 0 50px 0 3px;' +
				'opacity: 0.2;' +
				'-moz-transition: opacity 0.5s;'+
				'transition: opacity 0.5s;}' +
			'.reddit-nfl-snoo-logo img:hover {' +
				'opacity: 1;'+
				'-moz-transition: opacity 0.3s;'+
				'transition: opacity 0.3s;}');

var imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAmCAMAAABnA+JrAAACXlBMVEUAAQAAAgABBAACBQEEBwIFCAQHCQUICwcKDAgLDQoMDwsOEAwPEQ0QEg8RExASFBETFBIUFRMaHBkbHBocHRsdHxweHx0fIB4gIR8iJCEjJCIkJSMlJyQmKCUoKScpKygqLCksLSstLiwuLy0vMS4xMzAyMzE2ODU6Ozk7PTo9PzxAQT9BQkBERkNFR0RISUdKTEpPUU5RU1BSVFFUVVNVVlT4MAD6MQBXWVbyNAD7MwD1NwD1NwP2OADuOwDwPABdX1z/OQD5OwD6PABfYV7yPwNiZGH+QADwRQNkZWP/QgBlZmRoaWftSxFpa2hqbGnoTxlrbWrsUhxucG11d3R2eHV4end5e3h6fHl8fnt+gH3zZzaAgn/pazqChIGDhYKEhoOHiYaIiofmdkWJi4iKjImLjYqNj4zpe1uSlJGTlZLrgliUlpOXmZaYmpfni1zqjV6dn5zvjWaeoJ2foZ6gop+ipKHrlm+kpqOlp6SmqKXknXjumnnvm3rsnnurrartn3ywsq7pqIDsp420trO1t7TsrIrprZa3ubbtr5K5u7i6vLm8vrvutpfrtqO+wb3Awr7CxMHDxcLwu6frvafExsPHycbJy8jKzMnLzsrvx6/Nz8vO0MzP0c7Q0s/u0LvU1tPa3Nnb3drc3tve4N3w3dLz3s3y4NTj5eH04tfk5uP35Nnm6OXn6ebu8O347+jw8u/x8/Dy9PHz9fL29ez39u309/P4+O73+fb4+vf7+vH5+/j2/fL/+vn6/Pn9+//3/f/7/fr//Pr+/P/4/v///fv//f/5///8//v+//z0vrUSAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfdBBoULRSJjzFUAAACsUlEQVQ4y6VV+U8TQRTul2wmTbEoIp4oXnhfKCbaNEQqWl3xwAtFVBA8QPG+L7xQFLyQS20i4kWCKBUPamV12/3l/Vfu7OzSAqGt8f0wmbfzzTffvPfmrc0W3+yAPR5GkiSBkTBtFhAbzMAkJkGyM5wnqpViwyWHsYcBC0hRKS82un8Vy0gh2oHYQvoPcXYQ9aQjvhBBPvr4uYwEhfC5bqMSE5KIMfYvaDgTgjkQZUlx8gc452RvLiotLy5YPjdFd9lwVSMBE3e3fgySacEuX0kGjApxRuoKGJsOSedd1URDrHWDDmRInWLWFdjNL1QJzGsjCihaKBSykBopAaL2JcB26vEZCUrGA6InQBVfD6uk6qOAhlVV7LoIVBN9YpKuNo3oOVBPll4tHNaMSdjST80Mj4nW6uTIpEAqGgRQfXa9UR8Np097dePeZ62Pb/XB0U27wANMO3GYFyX9CZS5XSuP/OJYVdNuuT2urZ3cUegs8mgGF46FyZNMFY/csuzNaeRsKnVuzJVl1wmhijJZgZGsEcAhU+EFlyzLnqtaiKNfrPF6vav39IqlU1aiGHwm+r7H65XdDwX63bpcr+w6SiKgHVZ6RsIv7vX7516Px132Q+imKzke15b3QolCPH7ckuAX1GHt2+2Td7+SsVcPduPpax9I0QaibWgZlO5w9FQ4byOFsp/i2rFIDxjvtz6qpEYQStR0euTpYZ+Zd5XaowlfB63cV0YVOkONSeTD0i4L21uEAyZHA6QBPaDGRGRByq6409xSd2b9GEx4I742DWoB4DTGuZcnW68ypVjRaYP8hhjyJGe/FKeSr7qqtKTiUvN3Qdw2f4CM/seZVd9L0THh93u6YphWrzeHqZtquyPQnrptMwFHrA6BtEX5heUHC/MXj+OeFOcnw6xbMrvt/+wv2u7p4lVFZEUAAAAASUVORK5CYII=";

var list = document.querySelector('div.usertext-body .md h6 + h5 + h6 + ul');

var link = document.createElement('li');
link.setAttribute('class', 'reddit-nfl-snoo-logo');
link.innerHTML = '<a href="/"><img src="' + imageData + '"/></a>';
list.insertBefore(link, list.firstChild);
