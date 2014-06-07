// ==UserScript==
// @name       		Kaskus Quote Spoiler
// @namespace  		http://userscripts.org/scripts/show/173958
// @version    		0.2.2
// @description 	Add spoiler to each quote, available only for new kaskus
// @license             GNU General Public Licence (GPL)
// @include    		*.kaskus.*/thread/*
// @include    		*.kaskus.*/post/*
// @include    		*.kaskus.*/show_post/*
// @require 		http://update.sizzlemctwizzle.com/173958.js
// @copyright  		2013, anggiedimasta
// @author			@anggiedimasta, arfintladroseko
// ==/UserScript==
/**
 * 
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 * 
 * Credits: 
 *  - jQuery <http://jquery.com/>.
 *  - Kaskus Quote like Spoiler by ngengs <http://userscripts.org/scripts/show/173890>.
 * 
 * Changelog:
 * ==========
 * 
 * 0.2.2
 * - fixed button value for new kaskus
 * 0.2.1
 * - first release, beta version
 */

(function() {
    this.KQS = function() {
        $(".post-quote > span:last-child").css("border-radius","3px").hide();
        $(".post-quote > span:first-child").html("Quote: <input type='button' value='Show All' class='btn btn-quote-show-all' style='margin:2px;font-size:10px;padding:2px;width:60px!important;cursor:pointer;border-radius:3px'/> <input type='button' value='Show' class='btn btn-quote-show' style='margin:2px;font-size:10px;padding:2px;width:60px!important;cursor:pointer;border-radius:3px'/>");
        
        $(".btn-quote-show").click(function(){
            if ($(this).val() == "Show") {
                $(this).parent("span").parent(".post-quote").children("span").last().fadeIn("slow");
                $(this).prop('value','Hide');
            } else {
                $(this).parent("span").parent(".post-quote").children("span").last().fadeOut("slow");
                $(this).prop('value','Show');
            }
        });
        
        $(".btn-quote-show-all").click(function(){
            if ($(this).val() == "Show All") {
                $(".post-quote > span:last-child").fadeIn("slow");
                $(".btn-quote-show-all").prop('value','Hide All');
                $(".btn-quote-show").prop('value','Hide');
            } else {
                $(".post-quote > span:last-child").fadeOut("slow");
                $(".btn-quote-show-all").prop('value','Show All');
                $(".btn-quote-show").prop('value','Show');
            }
        });
    } 
    
    KQS();
})();