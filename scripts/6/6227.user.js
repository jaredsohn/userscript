
// ==UserScript==
// @name            Flickrati Lite
// @author          mort
// @namespace       http://www.simplelogica.net/cajondesastre/flickrati_lite/
// @description     Check who's linking to any Flickr photo page, via Technorati
// @license         Creative Commons Attribution License
// @version	        0.1
// @include         http://www.flickr.com/photos/*/*
// @include         http://flickr.com/photos/*/*
// @released        2006-11-06
// @updated         2006-11-06
// @compatible      Greasemonkey
// ==/UserScript==

/* 
 * This file is a Greasemonkey user script. To install it, you need 
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit 
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 * 
 * To uninstall this script, go to your "Tools" menu and select 
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/

(function(){
	
    //object constructor
    function flickrati(){
				var d = document;	
				if (d.getElementById('button_bar')) {

					// assign variables
					var loc = window.location;
					var button_bar = d.getElementById('button_bar');
					
					var logo_src = "data:image/gif,GIF89a6%00%18%00%E6%00%00D%A4%00%E2%FE%E3%B2%B2%B2fff333%7F%BFbr%BF9%DB%F0%C9%5C%B5)%CC%CC%CC%99%99%99N%AC%1C%B0%E3%93%7F%7F%7F%EE%FF%FFC%A7%0B%AA%D6%85%E5%E5%E5%93%C5q%D9%D9%D9%3A%BC%00%C8%E4%B4%FB%FF%E9%D6%EA%D8%FF%F8%FFT%A5%11%C6%E6%AFI%AC%00%F0%FD%F0%EE%F9%D4%7F%C9S%8D%D1%60%B3%DD%9B%99%D4%7F%8C%8C%8CX%AC%23J%BD%01%C6%EF%BDH%B3%06%CF%ED%A6%3B%B7%01%FF%FF%FF%E7%EE%DF%F1%FD%E7z%BCLm%B44_%AD%22V%BA%10%BA%E2%AA%FF%FF%F6%D4%F7%DAH%B5%00%F2%F2%F2H%AC%07%87%C8%5C%9A%DAa%E0%F2%D4%D5%E8%C6%86%C0%60%F0%F9%DF%F6%FF%F7%9B%CEv%BF%ED%B6%A6%D6%82h%BE%3A%D1%EE%CBB%C4%00P%BB%00i%B6!%3D%AF%00%5C%AD%12%7D%C5ID%B5%00Q%B2%00%CD%E6%AC%CF%EF%BFX%B7%0A%F1%F9%E3%88%CAV%F8%FF%E2%9E%DC%7B%5C%B3%22%BC%DB%96%E3%FD%DFh%BD-%89%C5eK%A8%0A%F4%FF%ED%E6%F1%CD%B8%EC%96%98%D1z%7D%CAY%C6%E2%A7A%BE%00%F7%F7%DEL%AA%0E%FF%FF%F1%60%B3!%F8%FF%FFP%AC%00%CE%E6%B5L%BB%05%D5%ED%CC%D1%EC%C5%7B%C5c%7B%C16a%B4*S%AE%0D%8E%D6%60%E9%FA%E1%81%BCL%E2%F8%D6%83%C5bE%AE%00%F7%FF%E4%9D%DA%83%C1%E2%9Fk%BB0H%A7%0F%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%04%14%00%FF%00%2C%00%00%00%006%00%18%00%00%07%FF%80)%82%83%84%85%86%87%88%89%8A%8B%8C%8B%0Eb1%18%92%18b%8911%8D%99%8A%60%9C%60%9A%9F%A0%83b%A3%A1%A5%A6%A7%A8%83%3CoK9*%A3%A3W8fm%98%A9%9FXDq%19t%98S!uLIah%3Er%3C%18%B7%8C%5C%1B(%5B%1C)Mi%003%D5%D5kR%60%95%CA%8A%1A%1B%1B%0C%82%3F%00CCe%E7e3-%01%DB%DC%88%15VHY%82%1FE%E5%F7%E5Q2%83%03%22%83%13%03%04%0C%120%60%C0%84%14%22%0E%22%3C%08P%A0%20%82%06S(%A9%81%02%8A%20%185f%90%D8%B8q%83%9B%2B%82%06%24%10%E0oB%83%04%0A%04%0AP%90%20%01%8D%14%03%08%24%88%99%C0%24J%95%2C%5DJ%ACA%01%C8%0EAs%16%C4%E9B4%8E%81%03%97R%10HA%E3%E0%CC%14%0A%14%A4%88%A0%20%22%CC%99X%9FF%9DZU%E1D!%26zX%10%14%A4%C7%91%23U%40%B4%11%E4i%E9S%ADR%97%F9%25%B8%1A%B2%E5%00%A8q%EB%A6%A8P%A3%0B%09%2B%10%22a%E8%84%88%C0%5DA%09%08%C4U%40%40%A6%5E%BA%89%177%9E%9BBC%8D%8DH%E0%08%B2%F0%C4%D6%8A%13%3D.%B8%EB%F6%A5%9C%09-)J%14%60%E1%C4%86%07*c%8C%9C%19%9D%A8%82%1D%12C%8C%DC%60c%02%89%EF%DFH%5E%2C%A1%7D(%06%97%07D7%A2%20%CA%9C%F9%083%C4%0Fu%D01%22%8A%9A%EBQ%C2h%DF%EEB%02%87d%D1%0B%81%D9%B1%A3%83%F9%1DM%D2%ABo%022%BC%7Be%3Cx%BC%9FO%DFT%20%00%3B";
					
					var logo_src_bw = "data:image/gif,GIF89a6%00%18%00%B3%00%00qqq%FF%FF%FF%C5%C5%C5%A5%A5%A5%E6%E6%E6%99%99%99%B5%B5%B5%DE%DE%DE%F7%F7%F7%EF%EF%EF%D6%D6%D6%AC%AC%AC%BD%BD%BD%CC%CC%CC%00%00%00%00%00%00!%F9%04%04%14%00%FF%00%2C%00%00%00%006%00%18%00%00%04%FB0%C8I%AB%BD8%EB%CD%BB%FF%A0%86%20ai%9Eh%AA%9A%09A%24U%22%AFa2%14%85%22!%CDr%0F%0C%C2%88%C69%E0%18%24%C4%02%C7%C4%E9%88%1BcN%D2%C0%0D%AE%CC%05%09%9A%91%1E%24%82fs%00%93%14%16%13B%A11%A9%16%08%81%05%3C%0EW%B3%A98%B8%F4.%BD%FA%0B%06%5B%05%07%3D%01%04%03%07%06l%0D%06%07%07%24%05%00F%92%87%89%8B%8D%8F%01RZT7Mr%13%00%01%08z%05%01%06%06%01%09%06ofF%AFF%A7%A9%AB%AD%9AL%02%5B%04%02%A8%0C%0A%5B%12%A2%B1%B1%A8%14%83%01%C6%C7%8E%A6%C4%13%C6R8w%1C%00%A6%12%07%00%A9%A7%00%92%AE%DC%D6%D8%06%DA_%B6L%0C%13%BF%08%07%02e%5C%17%CFk%86%0C%06%0C%F3K%B5%EC%16%EE%02abVs%F7%15%EE%AC%F8%F93%C0%DF%BF%09%09%18%0C%5C8%10%D7%C1%0B2%22%8E%98H%F1%A1%C5%8B%183j%AC%10%01%00%3B";
					
				
					// create elements
					var tlink = d.createElement('a');
					var tlink_img = d.createElement('img');
					
					// set atttributes
					tlink.setAttribute('title','Technorati cosmos for this photo');
					tlink.setAttribute('href','http://technorati.com/search/'+escape(window.location));
					
					tlink_img.setAttribute('src',logo_src_bw);
					tlink_img.setAttribute('alt','Technorati logo');
					
					tlink_img.addEventListener('mouseover',function(){this.src=logo_src;},false);
					tlink_img.addEventListener('mouseout',function(){this.src=logo_src_bw;},false);
					
					
					// append children
					tlink.appendChild(tlink_img);
					button_bar.appendChild(tlink);
					
				}
    };
    
    //instantiate and run 
    var flickrati = new flickrati();


})();
