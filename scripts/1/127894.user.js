// =========================================================================================
// QuActiveChat v1.1 
// QuActiveChat is a tabbed chat interface for Kingdom of Loathing (www.kingdomofloathing.com) 
// =========================================================================================
// Modifications Copyright 2012, Kevin Jones. All rights reserved.
// Original source Copyright 2010, Chris Theron. All rights reserved.
//
// Released under the GPL license: 
// http://www.gnu.org/copyleft/gpl.html
// =========================================================================================
// Also released under the simplified BSD license:
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
//   1. Redistributions of source code must retain the above copyright notice, this list of
//      conditions and the following disclaimer.
//
//   2. Redistributions in binary form must reproduce the above copyright notice, this list
//      of conditions and the following disclaimer in the documentation and/or other materials
//      provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY KEVIN JONES AND CHRIS THERON ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
// FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CHRIS THERON OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// The views and conclusions contained in the software and documentation are those of the
// authors and should not be interpreted as representing official policies, either expressed
// or implied, of Chris Theron pr Kevin Jones.
// =========================================================================================


// ==UserScript==
// @name			QuActiveChat
// @namespace		www.bewarethefgc.com
// @description		Quack-Enhanced Tabbed Chat for KoL
// @author			Lopey
// @include			*kingdomofloathing.com/lchat.php
// @include			http://127.0.0.1:*/lchat.php
// @include			http://localhost:*/lchat.php
// ==/UserScript==
//
// =====================================================================================
// CREDITS
// =====================================================================================
// Modified from Chez's ActiveChat implementation (http://userscripts.org/scripts/show/83477)
// Based on CDM's Tabbed KoL Chat (https://github.com/cdmoyer/cdm-s-kol-greasemonkeys)
// KoLMafia gCLI integration code borrowed from KolMafia
// icons from http://www.famfamfam.com/lab/icons/silk/
//
// =================================================================================
// INSTALLATION NOTES
// =================================================================================
// Account Page\Chat Options\Show tag in current channel must be *enabled*
// KoLmafia\Preferences\Browser\Integrate chat and relay browser gCLI interfaces must be *deselected*
// KoLmafia\Preferences\Browser\Reformat incoming chat HTML must be *deselected*
// Mafia Daily Build 8046/Version 13.9 or later required for ascension log integration
// To run this, the variable quacks down below must be set with the comma-separated list of playerIDs
// of whom you'd like to have chat. The script must be loaded, the option to make people quack must be 
// turned on and saved, and then chat must be reloaded.
//
// =================================================================================
// CHANGE LOG
// =================================================================================
/*
QUACTIVE CHAT:
1.1     Incorporation of changes from Chris Fisher (Gemelli)
        Firefox support readded
        eliminate private message tweaking
        etc.
1.0 	Branch off of Active Chat.

ORIGINAL ACTIVE CHAT:
2.1.2	Added BSD Licence
2.1.1	Fixed some parsing issues with AFH relay messages that doesn't contain a player name
		Added support for AFH/k Private clan messages
		Set focus back to text input box after clicking on tabs
		Renamed some elements to make ActiveChat play nicely with Clump's Chat Control Panel again		
2.1		Added /alert
		Added /toggle
		Added support for AFH/k Chat relay bots
		Ctrl-Left/Right now swicthes between chat channels
		Ctrl-Up/Down switches between toolbar icons
2.0		Added various options to display events in tabs
		Options to use diffent styling for incoming and outgoing pm's
		Show Noblesse Oblige Calendar Info
0.2.7	Fixed parsing errors with pm's
		Convert PM tab titles to lowercase to avoid duplicate tabs
0.2.6	New PM tabs highlighted in green instead of red
0.2.5	Don't submit blank messages
		Single-clicking on the active tab places a marker at the bottom even if no marker exists already
0.2.4	New Events now always force the events panel to scroll to the bottom
		Single-clicking on the active channel tab moves the marker (if any) to the bottom
0.2.3	Fixed issues with math functions (messages startin with =)
		Fixed issues with sidebar refreshes
		Added wildcard instead of explicit port number for relay browsers
0.2.2	Added support for gothy
		Fixed password hash issues with newer mafia build (r8208 and later)
		Fixed issues with Vivala effect in /haiku
0.2.1	Fixed some resize/drag issues with FF 3.6
0.2.0	First Public Release
		Rearranged HTML structure and panel positioning
		Draggable resizing of events panel
0.1.5	Format output from /last
		Added option to close tabs without confirming
		Added option to stop listening to channels after closing tabs
		Altered input no longer appears in input box before being submitted
		Fixed bug with links sent in private tabs
0.1.4	Fixed color bleed after Mod Announcements/Warnings
		Minor tweaks to tab styles
0.1.3	Added Startup options
			/clannies
		Properly handle channel switching events
		Look for <hr> when truncating data
		Tweaked display of some events
		Messages sent by the current user doesn't trigger red tabs
0.1.2	Added option to refresh charpane from CLI output
		Added option to display private messages in black
		Added option to use Ctrl-Up/Ctrl-Down to switch tabs
0.1.1	Fixed messages from Haiku channel
		Fixed bugs with private messages and tabs
		CLI Command cache (use up/down arrows)
		Seperate buffer sizes for Events, CLI, Chat
		Additional Startup options
			/idleoff
			/who
			/friends
		/options displays config panel
0.1.0	Original release
*/

/****
function main() { try {
// gm emulation code
// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }
    
    GM_log = function(message) {
        console.log(message);
    }

    GM_openInTab = function(url) {
        return window.open(url, "_blank");
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}
// end of gm emulation code
****/


unsafeWindow = this['unsafeWindow'] || window;

// ================================================================================= //
// CONSTANTS ======================================================================= //
// ================================================================================= //
var AC_VERSION = "2.1.2";
var AC_MARGIN = 4;
var AC_BAR_HEIGHT = 6;
var AC_INFO_MINHEIGHT = 40;
var AC_TOOL_MINHEIGHT = 40;
var AC_PVT_TITLE = "*";
var AC_PVT_ID = "pvt_";

var AC_IMAGE_LOG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK5SURBVBgZBcFPaJZ1HADwz%2B95n3e6uTnREGdljRKtGCYiHTLxkIUmQeeCOnXzVnQIoi5BQV08TMo6GIiHiKI6ZEWgszzEmtpqSDP7s9ycm9NN977vnuf37fNJEWH%2FG6df6l676vki2YXVSCAhEpFVOU8uzMX36daNV88MH%2BoApIhw8O2zZz45vOuhokjrgoYAIALC7NKKEz8vmP67fee3XyfWjwwfakMJRSNt6yob68avaRQpkYhMHVlVheWV2r6tffYPjNi4eLyncWCodf7jI1Jr6sUSUkq9EdHoajQkIZALZOpEIWlPf27r4jndQy%2FoH9xp4c9tJk4de7eEIEGBlAgJREqKRP%2FyKXVcsH7r4%2BYnf9eVOvrWbtK7YUt%2FCRBB2SBJIiW5Doqkd3nEllWj%2Bgef1r56UldP8tfYhJt3UhTtuR0FRBAoU6FISYFGkaxePG1LfKv%2FgYNa%2F30oNW9o9vbpzvOOXj%2BwsvvwZ5cKCGSkRJGSIiWtK19af%2FuU%2Fgef1ZoaVjRXdG7db%2BbMed173zJVD2QoIFdEkBG4fflrPYs%2F2vjIMzrTxzS6QvvWfWZGRs3tGZY2bFdnoICcQ0QQTI%2Be1L3wk5W82dWLR2Qtt%2BfvNnNuwuLeo1LvgNXNpK4CFFBn6iAysxc%2F8vCel636Z8SlL84a%2B2be%2BHdjlh57R9WzWaDZKFSdCpSQq5AjvPlLx9DkrM74VwZ3POHm7JzJsUk%2F7PvU9Sv3yipwYlPTSjuDEqqqVtcMrG0a%2F%2BOa9z8Ytnv7oOXNOyw9edyjffeIIIIL1yqRw0qrAiVU7ZyrnKNTS%2Bte%2F9flFCYlkJdIS5UcRJEUOSnLlKs6V1DCSqueWdPVuOu1oc6aiCgEGdDfXYIIuptJSnKzkRbrKk9BCSnFe0%2B9cvq5lNLOED0AgkAIIEAr5zxaFk7A%2F5IUWNTkV3l%2FAAAAAElFTkSuQmCC";
var AC_IMAGE_CLI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGfSURBVDjLpVOxSgNBEJ297B2iiUmToKABCxEVKyGVoJ%2BQLp1RxE4sRAQL26RVsLHRQouAkMoq%2FyD5Ads0ErDIQe5udu%2Bc2eTCGU4MuPCYmbvZN292d0QURfCfJZ9eXh9WV5aPpW3bUQigQg0YKFBKQcAgP0AE38eRDcgShp6HX%2F3PS0mbT5dumyJ%2F%2BA5HmQ24337%2Bs6oQAIXFrN28e1yXUjqifHYO9uYHXIgyFGR2JukL83OACoVEreDg6ppYRSosyzKYjhlrO3sgozCETCYD%2FX7%2FR1LahmRcLBYhny%2BApVQ4kdVut6HRaMx8A0iHbGmtgS7AoFarQaVSgWq1amLHcSb%2FkqCDMzbAAGSAynxgtFot6Ha70Ol0TMK07GRb3Db6PkiWEVer1%2BsmgeM4kdf0GZgHRAWVGiuIZSUPMFkxLWYFih6WxHELcdVpklgBx0mfLTIBP09mY4LRK0uvGCMm4T2%2BIgLXdQekIFcqlVKTfyNh6%2FueJ3u93s3W7v4J8eYCzUNEw4SjYeIelUbja%2FKRrlxT1VBzDg68ofsm%2FjvO35HitdVS%2F1ysAAAAAElFTkSuQmCC";
var AC_IMAGE_CONFIG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1%2BjfqAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGSSURBVCjPVVFNSwJhEF78Ad79Cf6PvXQRsotUlzKICosuRYmR2RJR0KE6lBFFZVEbpFBSqKu2rum6llFS9HHI4iUhT153n6ZtIWMOM%2B%2FMM88z7wwH7s9Ub16SJcnbmrNcxVm2q7Z8%2FQPvEOtntpj92NkCqITLepEpjix7xQtiLOoQ2b6%2BE7YAN%2F5nfOEJ2WbKqOIOJ4bYVMEQx4LfBBQDsvFMhUcCVU1%2FCxVXmDBGA5ZETrhDCQVcYAPbyEJBhvrnBVPiSpNr6cYDNCQwo4zzU%2FySckkgDYuNuVpI42T9k4gLKGMPs%2FxPzzovQiY2hQYe0jlJfyNNhTqiWDYBq%2FwBMcSRpnyPzu1oS7WtxjVBSthU1vgVksiQ3Dn6Gp5ah2YOKQo5GiuHPA6xT1EKpxQNCNYejgIR457KKio0S56YckjSa9jo%2F%2F3mrj%2BBV0QQagqGTOo%2BY7gZIf1puP3WHoLhEb2PjTlCTCWGXtbp8DCX3hZuOdaIc9A%2BaQvWk4ihq95p67a7nP%2Bu%2BWs%2Br0dql9z%2Fzv0NCYhdCPKZ7oYAAAAASUVORK5CYII%3D";
var AC_IMAGE_BAR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAACCAYAAAA5Ht7JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACxJREFUeNpi3L9nGwM%2BoKtv%2FL%2B9rYXBx9uTkVQ2AxGAiZACkGHksokBAAEGALTSHgpqbvlnAAAAAElFTkSuQmCC";
var AC_IMAGE_CAL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHRJREFUeNpi%2FP%2F%2FP4N1yr7%2FDOQCkAFWyXv%2FkwNA%2BliQDWO0LoGzjzZ7MVjXbsPJ%2F3%2B0B0wzMVAIKDYAxQsgZ5LCxzAAn58xwsDJaWSGwZ07VAiDs5SEwVljBgZjPF6AJU90ZyL4IBLVBEZKcyPYAEoAQIABACYRdWyAHAouAAAAAElFTkSuQmCC";
var AC_IMAGE_NOCAL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHhJREFUeNpitEre%2B5%2BBTHB0jhMjC5RBsmbrlH1gmgUmwGhdgjC52YvBunYbTv7%2Foz1wNhMDhYBiA1iQnYkSQAT4GAbg8zNGGDg5jcwwuHOHCmFwlpIwOGvMwGCMxwvIyRPdmRA%2BiDTGbgAsY5ADGP%2F%2F%2F09RNAIEGAA3Wjegj8DhRQAAAABJRU5ErkJggg%3D%3D";

var AC_IMAGE_EVENTS = new Array;
AC_IMAGE_EVENTS[0] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIySURBVDjLpdNdTFJhGAdw120X3XXR5kU33fQxS0%2B5Yl24lFnQKsvl2nJLM0fmXLNASceKgAv8yBGgJPEhkcIShEEYKuKU1IxcTm0WUDiJ1Fpbm1tZ%2F855186oLS%2Fk4r%2F34n2e355z9rwZADLSyX8vCm%2BWU6fqT38%2B21S4ztPy1rmK4lXF5Ry%2F%2FHwm6LjoHN8QOGOgUOe9iGByCJ7FJ5BMX0ORiosfa1%2FwTHqQIAQ4VCHbwpXL53iWHPAe7QefJAvq4G2MLY9gcnUcQ0kf%2FAkvAm4DPvhl6Lq%2BjwEuESD7inLrCWXJ10BygC56SgpHlofxfGUMjvhjDH7sR1e0Hfq3VmiqKSwOt6CldCcD7CDA3qrOXfRo37tjRojC5SRt81KYIxp4lxx0%2BmCOaqEON8NeR2Ght5ppBvsTT9Yqai60F%2Fy0vTehPlyBW%2BFKAliiOvQnPGQKY%2BQ%2BTOOdCCjzEPU2%2FA1wxIaH3a8N0C20ouGVAI3TVVC9kcEa0yO0MgrfkptM0mprwqypGKG2AgaYYYEsqfGFI94D4csy1E6VonlWgt64Fb6EG7aYGTdGK1ETEv6yu%2BwEcDQeZoA7LHBEJfxkiejQQxczccZtEE8JwHNRKLMK1rRzng6R3xU8kLkdM%2FoidAh2M8BRFsi7W%2FIu38wBty8bXCcdSy6OyfjfUneCbjj34OoeMkHq92%2B4SP8A95wSTlrA%2FISGnxZAmgeV%2BewKbwqwi3MZQLQZQP3nFTLnttS73y9CuFIqo%2FimAAAAAElFTkSuQmCC";
AC_IMAGE_EVENTS[1] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIxSURBVDjLpdNdSFNhGAfww0Cri%2BgyKLowpMC%2BLsooEy%2BSgqJuKqRIiIQKkryoi4zaUmbWSHKdPkYz05xdnKNobmwW6Vi6tbk2TDYl82PTTSr3PXe2s2T%2BO%2BdgYwV54S7%2BvBcvz4%2FneXleAgCRTf570UXdLda9ORUytW1LDbbkp1TK8h8PLu1rvn92C7houBxfEbA%2FE%2BHn4C6wAQMYTxO8vbkwvMjBYiKED3X7BUQAaFqao6XLgxZyDaxyAp9JArYnBCLjd5CM2bDIupCI6MEEtRjQtWK2rx7t13fzQMUfYHNfx7H4wtQ9xFwPEZuuR%2BI7jWSgH9H5FrBRI4KeGgTcN6CoKoT3YyMaL%2BTxwCYBoOi6M5%2B6i37xgM9YICQ8elnAmKCai4YDJHCPnEDnrUJMdFfxxUg%2FIk2JlSPq7anYtAw%2B0x74zXs54AqYGRLxMN9FK%2Fyem5hySpcMDYfh6hX%2FDXRR15yhcclS2FEBv%2BUgl0OIjFWCmVUgGR9FzE8h6mvGF7MMY21lMJNHecCZBrRUWXhhcrn9ga0IOy4Kxey8BoGZWnwbKsCkbSOGX%2BcJwFtJEQ9I04C%2Bo5SNTojBuOXc3I8Qn1Nh7v062BUiWHXnWLtD%2B1TVTxt7anPhfHUayqs7eKAkDajbz3tN5HpYH4swJBfBQq7Fu6aSROZOcAWlLyt3Ch1kzr%2FiIv0DyHpqirMCvloVJ7MChGJ9w5H0Cq8K6Lx9gAeqVwM8X%2F6F%2FLkh8%2B43zznRPkqpYfEAAAAASUVORK5CYII%3D";
AC_IMAGE_EVENTS[2] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIrSURBVDjLpdNfSFNhGMdx6Q9RDoIuLAQtYVuWpZSunKQXjYIKwdBqkJkEYRhIBEFRRmVbGYNB2hTnVKaGzWFq%2Fim0mLgyLTNjpdSFJkX%2FhCxYY26db%2BecYliQF3rx44Xz8nzO8748bxgQNp%2F8d8OoS41s0Ca0uBPXvu3VqMYbk%2BParx5Nsl3RRyHmjpjdswKfosOF6ey9CENPEFqdBNM2MaKNJ%2BD7StflLTIiA8bUrQu8sUuavOrF017lIrwxYqIXErSWwOsR%2BPgBhgZhoA9XWw0T3UbqTsZLwBEZMKUkhvtUS3uxW6G%2BGmrEtfsuPH0MXR3gGf79vfIGZQUa3vWYMR%2BOkYBIGbBpN6r9qxUvZEBsmYMZUHwR6sSiPjf0P4RaG1OnTvidZzS8uV0gFRO6xBaNMiOgXjmB3QY5WZB7AK5dAkc9PBdb7%2BoUu6pgpLRkymXazlhn4d%2FAYMIqg2Axf8NQCHnZcCwHTAZodsD4GPTch3vtDJeX88q%2Bn77rOyXAEwK%2BrFe0in8Iyq1n7oKic9B0C9wugjerf34%2FlPXDr08PuPJyZKD5fIoEFIUAX2x4v2AthYZaMXaEjlb8Og2TaxTCs317BgMWs%2F59fm7V5qgIPFWZVOTHSUBaCGhMXmd9GR%2FhnVQuEz6LGVWt8DuSYh%2FNnAmxQFd5fIPcwczzzzpI%2FwDFLRe2zQsYHShLnxcgFz8w7QiN8JwA59lkCTg9F8Dy5xVK6%2FKZe78AQiW2y4SvvaoAAAAASUVORK5CYII%3D";

var AC_CSS = 
'.clearfix {display: inline-block;}' + "\n" + 
'.clearfix:after {content: " "; display: block; height: 0; clear: both; visibility: hidden;}' + "\n" + 

'body {height:100%; margin:0}' + "\n" + 

'#activechat {position:absolute; top:' + AC_MARGIN + 'px; bottom:' + AC_MARGIN + 'px; left:' + AC_MARGIN + 'px; right:' + AC_MARGIN + 'px; font-family: arial; font-size: 12px;}' + "\n" + 

'#ac_tool_box {position:absolute; left:0px; right:0px; margin:0px}' + "\n" + 
'#ac_info_box {position:absolute; left:0px; right:0px; margin:0px}' + "\n" + 

'#ac_slider {position: absolute;  left:0px; right:0px; height:' + AC_BAR_HEIGHT + 'px; background: transparent url(' + AC_IMAGE_BAR + ') no-repeat 50% 50%} ' + "\n" +
'#ac_slider:hover {cursor:s-resize} ' + "\n" +
'#ac_slider.active {background-color:#DD9; background-repeat:repeat-x; cursor:s-resize} ' + "\n" +

'#ac_toolbar {position:absolute; left:0px; right:0px; background-color:#eee; border:1px solid blue; padding:3px 0px 0px 3px; margin:0; list-style-type:none}' + "\n" + 
'#ac_toolbar li {cursor:pointer; display:inline; float:left; font-weight: bold; margin:0px 3px 3px 0px}' + "\n" + 
'#ac_toolbar li.ac_tool {border-width:1px; border-style:solid; background-repeat:no-repeat; background-position:center center; padding: 3px 10px;}' + "\n" + 
'#ac_toolbar li.ac_tab {border:0px; padding: 0px}' + "\n" + 
'#ac_toolbar li.ac_tab span {border-width:1px; border-style:solid; padding: 3px 4px; display:block}' + "\n" + 

'.ac_tool_off {background-color: #DDD; border-color:#999}' + "\n" + 
'.ac_tool_on {background-color: #FFF; border-color:#888}' + "\n" +

'li.ac_tab_events {color: #006; background-color: #BBF; border-color:green}' + "\n" +
'li.ac_tab_kol {color: #006; background-color: #BBF; border-color:#006}' + "\n" +
'li.ac_tab_listen {color: #006; background-color: #BBF; border-color:#006}' + "\n" +
'li.ac_tab_pm {color: #006; background-color: #BBF; border-color:blue}' + "\n" +

'li.ac_tab_kol span.ac_tab_on {color: #000; background-color: #BBBBFF; border-color:#666}' + "\n" +
'li.ac_tab_kol span.ac_tab_off {color: #333; background-color: #DDDDDD; border-color:#666}' + "\n" +
'li.ac_tab_kol span.ac_tab_new {color: #333; background-color: #FFCC00; border-color:#666}' + "\n" +
'li.ac_tab_kol span.ac_tab_dead {color: #666; background-color: #BBB; border-color:#666}' + "\n" +
'li.ac_tab_kol span.ac_tab_sleep {color: #777; background-color: #DDD; border-color:#666}' + "\n" +

'li.ac_tab_events span.ac_tab_on {color: #000; background-color: #BBBBFF; border-color:#666}' + "\n" +
'li.ac_tab_events span.ac_tab_off {color: #333; background-color: #DDDDDD; border-color:#666}' + "\n" +
'li.ac_tab_events span.ac_tab_new {color: #333; background-color: #ACD373; border-color:#666}' + "\n" +
'li.ac_tab_events span.ac_tab_dead {color: #333; background-color: #BBB; border-color:#666}' + "\n" +
'li.ac_tab_events span.ac_tab_sleep {color: #777; background-color: #DDD; border-color:#666}' + "\n" +

'li.ac_tab_alerts span.ac_tab_on {color: #000; background-color: #BBBBFF; border-color:#666}' + "\n" +
'li.ac_tab_alerts span.ac_tab_off {color: #333; background-color: #DDDDDD; border-color:#666}' + "\n" +
'li.ac_tab_alerts span.ac_tab_new {color: #EEE; background-color: #DD0000; border-color:#900}' + "\n" +
'li.ac_tab_alerts span.ac_tab_dead {color: #333; background-color: #BBB; border-color:#666}' + "\n" +
'li.ac_tab_alerts span.ac_tab_sleep {color: #777; background-color: #DDD; border-color:#666}' + "\n" +

'li.ac_tab_pm span.ac_tab_on {color: #000; background-color: #BBBBFF; border-color:#666}' + "\n" +
'li.ac_tab_pm span.ac_tab_off {color: #333; background-color: #DDDDDD; border-color:#666}' + "\n" +
'li.ac_tab_pm span.ac_tab_new {color: #333; background-color: #ACD373; border-color:#666}' + "\n" +
'li.ac_tab_pm span.ac_tab_dead {color: #333; background-color: #BBB; border-color:#666}' + "\n" +
'li.ac_tab_pm span.ac_tab_sleep {color: #777; background-color: #DDD; border-color:#666}' + "\n" +

'.ac_panel {position: absolute; left:0px; right:0px; border: 1px solid red; color: #000; background-color: #FFF; padding: 0px; }' + "\n" +

'.ac_chat_events, .ac_chat_channel, .ac_chat_private {border: 1px solid red; color: #000; background-color: #FFF; padding: 0px;}' + "\n" +
'.ac_chat_events {border: 1px solid green; color: #000; background-color: #FFF}' + "\n" +
'.ac_chat_channel {border: 1px solid blue; color: #000; background-color: #FFF}' + "\n" +
'.ac_chat_private {border: 1px solid red; color: #000; background-color: #FFF}' + "\n" +

'.ac_titlebar {color:#fff; font-weight:bold; text-align:left; padding: 0px}' + "\n" +
'.ac_title {padding: 2px 5px}' + "\n" +
'.ac_links {float:right; list-style-type:none; margin:2px; padding:0px}' + "\n" +
'.ac_links li {color:#CCCCCC; display:inline; margin:0px 0px 0px 4px}' + "\n" +
'.ac_links a {color:#CCCCCC}' + "\n" +
'.ac_panel_form {border:0px; color: #000; background-color: #FFF; padding: 2px}' + "\n" +
'.ac_panel_content {padding: 4px; bottom:0px; left:0px; right:0px; overflow-y: scroll; overflow-x: hidden; line-height:1.3} ' + "\n" +

'.ac_panel_content table {font-size: 12px; background-color: #F6F6F6; width:100%} ' + "\n" +
'.ac_panel_content fieldset {margin:4px} ' + "\n" +
'.ac_panel_content legend {font-weight:bold} ' + "\n" +

'hr {margin:1px 0px; text-align:center; background-color: #E6E6E6; border:0 none; height:1px} ' + "\n" +
'hr.marker, hr.ghost {margin:1px 0px; background-color: #999999; height:1px} ' + "\n" +
'#ac_events_content hr {margin:4px 0px; background-color: #999999; height:2px; border-bottom: 1px solid white} ' + "\n" +

'.ac_chat_channel .ac_titlebar {background-color: blue}' + "\n" +
'.ac_chat_channel .ac_panel_form {border-top: 1px solid blue; color: #000; background-color: #EEE}' + "\n" +

'.ac_chat_events .ac_titlebar {background-color: green}' + "\n" +
'.ac_chat_events .ac_panel_form {border-top: 1px solid green; color: #000; background-color: #EEE}' + "\n" +

'p.event {background-color: #F6F6F6; margin: 0px; padding: 1px 0px}' + "\n" +
'p.timestamp {background-color: white; margin: 0px; padding: 1px 0px; text-align:center}' + "\n" +
'p.message {background-color: white; margin: 0px; padding: 1px 0px}' + "\n" +
'p.spaced {padding-top: 8px}' + "\n" +

'#ac_events_panel {border:1px solid green; color: #000; background-color: #F6F6F6}' + "\n" +
'#ac_events_titlebar {background-color:green}' + "\n" +
'#ac_events_title {}' + "\n" +
'#ac_events_form {border-top: 1px solid green; color: #000; background-color: #EEE}' + "\n" +

'#ac_cli_panel {border: 1px solid black; color: #000; background-color: #FFF}' + "\n" +
'#ac_cli_titlebar {background-color: black}' + "\n" +
'#ac_cli_form {border-top: 1px solid black; color: #000; background-color: #EEE}' + "\n" +

'#ac_log_panel {border: 1px solid #CC9900; color: #000; background-color: #FFF}' + "\n" +
'#ac_log_titlebar {background-color: #CC9900}' + "\n" +
'#ac_log_form {border-top: 1px solid #CC9900; color: #000; background-color: #EEE}' + "\n" +

'#ac_cal_panel {border: 1px solid #666699; color: #000; background-color: #FFF}' + "\n" +
'#ac_cal_titlebar {background-color: #666699}' + "\n" +
'#ac_cal_form {border-top: 1px solid #666699; color: #000; background-color: #EEE}' + "\n" +
'#ac_cal_content {color:#333333; padding:4px 10px; line-height:1.4}' + "\n" +
'#ac_cal_content h3 {border-bottom: 1px solid #666699; color: #666699; width:100%; margin: 8px 0px 2px 0px}' + "\n" +
'#ac_cal_content h3:first-child {margin-top: 4px}' + "\n" +
'#ac_cal_status {font-size: 12px}' + "\n" +

'#ac_cfg_panel {border: 1px solid #cc3300; color: #000; background-color: #FFF}' + "\n" +
'#ac_cfg_titlebar {background-color: #cc3300}' + "\n" +
'#ac_cfg_form {border-top: 1px solid #cc3300; color: #000; background-color: #EEE}' + "\n" +

'#optionsform {vertical-align:middle; font-weight:normal}' + "\n" +

'.ac_inputform {margin:0px}' + "\n" +
'.ac_inputform table {padding:0px; border:0px; border-spacing:0px}' + "\n" +

'.ac_checkbox {vertical-align:middle; margin:3px 4px 4px 4px}' + "\n" +
'.ac_input {border:1px solid #333; width:100%; padding: 2px 2px; font-size:10pt}' + "\n" +
'.ac_button {border:2px solid black; background-color:white; font-size:10pt; font-weight:bold; font-family:arial}'
;

//Options Configurable via the Config Panel
var AC_OPTIONS = new Object;
AC_OPTIONS['loadchannels'] = 'Display channels listened to';
AC_OPTIONS['loadplayers'] = 'Display players in current channel';
AC_OPTIONS['loadcontacts'] = 'Display your contacts online';
AC_OPTIONS['loadclannies'] = 'Display clannies online';
AC_OPTIONS['idleoff'] = 'Disable idle timeout';
AC_OPTIONS['quack'] = 'Make people quack';
AC_OPTIONS['qtargets'] = 'Comma separated player ID quackers';

AC_OPTIONS['hidetags'] = 'Remove channel tags';
AC_OPTIONS['timestamp'] = 'Add Timestamp to chat messages';
AC_OPTIONS['pminblue'] = "Show incoming PM's in blue";
AC_OPTIONS['pmoutblue'] = "Show outgoing PM's in blue";
AC_OPTIONS['verticalkeys'] = 'Use ctrl-up and ctrl-down for changing channels';
AC_OPTIONS['confirmonclose'] = 'Confirm when closing tabs';
AC_OPTIONS['killonclose'] = 'Stop listening when closing tabs';

AC_OPTIONS['suppressevents'] = 'Suppress login/logout notification';
AC_OPTIONS['eventstarget'] = 'Send Chat Events to...';

AC_OPTIONS['showcli'] = 'Enable Mafia gCLI integration';
AC_OPTIONS['showlog'] = 'Enable Ascension Log integration';
AC_OPTIONS['clirefresh'] = 'Allow CLI to refresh character pane';
AC_OPTIONS['showcalendar'] = 'Show Noblesse Oblige Calendar Info';
AC_OPTIONS['afhbots'] = 'Enable support for AFH chat relay bots';

AC_OPTIONS['infotop'] = 'Show Events at top of chat panel';
AC_OPTIONS['tabstop'] = 'Show Tabs at top of chat panel';

//Other options configurable via about:config
AC_OPTIONS['chatbuffer'] = 'Max chat buffer size, in characters (0 = unlimited)';
AC_OPTIONS['eventsbuffer'] = 'Max events buffer size, in characters (0 = unlimited)';
AC_OPTIONS['clibuffer'] = 'Max CLI buffer size, in characters (0 = unlimited)';
AC_OPTIONS['debug'] = 'Send Debug Messages to Javascript console';
AC_OPTIONS['firebug'] = 'Send Debug Messages to Firebug console';
AC_OPTIONS['infoheight'] = 'Height of the events panel (Automatically updated when panel is resized)';
AC_OPTIONS['alerts'] = 'Alert List';

//Defaults for all options
var AC_DEFAULTS = new Object;
AC_DEFAULTS['showcli'] = false;
AC_DEFAULTS['showlog'] = false;
AC_DEFAULTS['clirefresh'] = false;
AC_DEFAULTS['debug'] = false;
AC_DEFAULTS['firebug'] = false;
AC_DEFAULTS['hidetags'] = false;
AC_DEFAULTS['timestamp'] = false;
AC_DEFAULTS['verticalkeys'] = false;
AC_DEFAULTS['infotop'] = false;
AC_DEFAULTS['tabstop'] = true;
AC_DEFAULTS['loadchannels'] = true;
AC_DEFAULTS['loadplayers'] = false;
AC_DEFAULTS['loadcontacts'] = false;
AC_DEFAULTS['loadclannies'] = false;
AC_DEFAULTS['confirmonclose'] = true;
AC_DEFAULTS['killonclose'] = false;
AC_DEFAULTS['eventstarget'] = 'docked';
AC_DEFAULTS['suppressevents'] = false;
AC_DEFAULTS['showcalendar'] = false;
AC_DEFAULTS['afhbots'] = false;
AC_DEFAULTS['idleoff'] = false;
AC_DEFAULTS['quack'] = false;
AC_DEFAULTS['pmoutblue'] = true;
AC_DEFAULTS['pminblue'] = true;
AC_DEFAULTS['chatbuffer'] = 30000;
AC_DEFAULTS['eventsbuffer'] = 20000;
AC_DEFAULTS['clibuffer'] = 50000;
AC_DEFAULTS['infoheight'] = 240;
AC_DEFAULTS['alerts'] = '';
AC_DEFAULTS['qtargets'] = '13,99999999'

//Options that are no longer used, and will be deleted or renamed on startup
var AC_OBSOLETE = new Object;
AC_OBSOLETE['tabposition'] = 'delete';
AC_OBSOLETE['buffer'] = 'chatbuffer';
AC_OBSOLETE['privateblue'] = 'delete';
AC_OBSOLETE['eventsheight'] = 'infoheight';
AC_OBSOLETE['eventstop'] = 'infotop';

// ================================================================================= //
// GLOBAL VARIABLES ================================================================ //
// ================================================================================= //

var playerID = '';
var playerHash = '';
var isLoaded = false;
var lastEvent = '';
var chatCycles = 0;
var startupCycles = 1;
var notifyState = 0;
var iNeedSomeClosure = false;
var isRelay = true;					//true if Relay Browser detected
document.ac_kolChannel = '';		//Active KoL Channel
document.ac_lastChannel = '';		//Last Channel to which messages were sent
document.ac_currentChannel = '';	//Current Channel being viewed
document.ac_currentTool = '';		//Current visible Tool Panel (config, cli, log, chat, events, cal)
document.ac_currentInfo = '';		//Current visible Info Panel (events)
document.ac_chats = new Object;		//All Channel Content
document.ac_status = new Object;	//All Channel Statuses (awake, dead, sleeping)
document.ac_lastchat = new Object;	//Last Message type in each channel (chat, event, rule, marker)
document.ac_options = new Array;
document.ac_alerts = new Array;
document.ac_sleepers = new Array;

var cliCommands = new Array();
var cliCount = 0;

var chatHistory = new Array;
var chatCurrent = null; 
var chatPointer = -1;
var CHATMAX = 20;

var eventHistory = new Array;
var eventCurrent = null;
var eventPointer = -1;
var EVENTMAX = 20;

var isRefreshing = false;

var ac_sliderPosition;
var ac_infoMaxHeight;
var ac_infoMinHeight;
var ac_dragStartY = 0;
var ac_dragLastY = 0;
var ac_dragInProgress =  false;

var NODate = null;
var NOStatus = '';

var afhPlayerList;

// QUACK QUACK QUACK QUACK

var quacks = '13';	// Players to be quacked.  Separate player IDs with commas.  NO SPACES BETWEEN IDS AND COMMAS!
var quackall = false;					// QUACK THEM ALL
var unquackable = true;					// Set to false if you don't want the 'unquacked' channel to appear
var unquackhigh = false;				// Set to true if you want the unquacked channel to highlight when someone gets quacked

var separator = ',';
if (quacks.indexOf(separator)==0){
	quacks = quacks + ',999999999';
}

// ================================================================================= //
// IMPLEMENT STRING AND DATE FUNCTIONS ============================================= //
// ================================================================================= //
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}
String.prototype.fixRules = function () {
	var tmp = this;
    tmp = tmp.replace(/<hr><hr><hr><hr>/gi, "<hr>").replace(/<hr><hr><hr>/gi, "<hr>").replace(/<hr><hr>/gi, "<hr>");
	tmp = tmp.replace(/<hr class="marker"><hr>/gi, '<hr class="ghost">').replace(/<hr><hr class="marker">/gi, '<hr class="ghost">');
	tmp = tmp.replace(/<hr class="ghost"><hr>/gi, '<hr class="ghost">').replace(/<hr><hr class="ghost">/gi, '<hr class="ghost">');
	return tmp;
}
String.prototype.stripFont = function () {
	return this.replace(/<font color="[#0-9a-z]*">/gi, '').replace(/<\/font>/gi, '');
}
String.prototype.addMarker = function () {
	return this + '<hr class="marker">';
}
String.prototype.removeMarker = function () {
	return this.replace(/<hr class="ghost">/gi, '<hr>').replace(/<hr class="marker">/gi, '');
}
String.prototype.moveMarker = function () {
	return this.removeMarker().addMarker().fixRules();
}
Date.prototype.addMinutes = function (n) {
	this.setTime(this.getTime() + (n*60000));
	return this;
}
Date.prototype.addDays = function (n) {
	this.setTime(this.getTime() + (n*86400000));
	return this;
}

// ================================================================================= //
// INITIALIZATION CODE ============================================================= //
// ================================================================================= //

// Insert Style Sheet
function ac_createStyles() {
	$("body").append('<style type="text/css">' + AC_CSS + '</style>');
}

// Create the Tabs Container, as well as the toolbar
function ac_createTabs() {

	//Create Tabs Container
	$("#ac_tool_box").append('<ul id="ac_toolbar" class="clearfix"></div>');

	// Configuration Icon
	$("#ac_toolbar").append('<li id="ac_tool_cfg" class="ac_tool ac_tool_off">&nbsp;</li>');
	$("#ac_tool_cfg").attr('style', 'background-image:url(' + AC_IMAGE_CONFIG + ')');
	$("#ac_tool_cfg").attr('title', "Configure ActionChat");
	$("#ac_tool_cfg").click(function () { 
		ac_showConfigPanel();
	});

	// Create Calendar Icon and attach event handler
	if (ac_getValue('showcalendar')) {
		$("#ac_toolbar").append('<li id="ac_tool_cal" class="ac_tool ac_tool_off">&nbsp;</li>');
		$("#ac_tool_cal").attr('style', 'background-image:url(' + AC_IMAGE_NOCAL + ')');
		$("#ac_tool_cal").attr('title', "Noblesse Oblige Calendar Info");
		$("#ac_tool_cal").click(function () { 
			ac_showCalendarPanel();
		});
	}

	// Create Log Notes Icon and attach event handler
	if (ac_getValue('showlog') && (isRelay)) {
		$("#ac_toolbar").append('<li id="ac_tool_log" class="ac_tool ac_tool_off">&nbsp;</li>');
		$("#ac_tool_log").attr('style', 'background-image:url(' + AC_IMAGE_LOG + ')');
		$("#ac_tool_log").attr('title', "Ascension Log Notes");
		$("#ac_tool_log").click(function () { 
			ac_showLogPanel();
		});
	}
	
	// Create CLI Icon and attach event handler
	if (ac_getValue('showcli') && (isRelay)) {
		$("#ac_toolbar").append('<li id="ac_tool_cli" class="ac_tool ac_tool_off">&nbsp;</li>');
		$("#ac_tool_cli").attr('style', 'background-image:url(' + AC_IMAGE_CLI + ')');
		$("#ac_tool_cli").attr('title', "Integrated Mafia gCLI");
		$("#ac_tool_cli").click(function () { 
			ac_showCLIPanel();
		});
	}

	// Create Events Icon and attach event handler
	if (true) {
		$("#ac_toolbar").append('<li id="ac_tool_events" class="ac_tool ac_tool_off">&nbsp;</li>');
		$("#ac_tool_events").attr('style', 'background-image:url(' + AC_IMAGE_EVENTS[0] + ')');
		$("#ac_tool_events").attr('title', "Events");
		$("#ac_tool_events").click(function () { 
			ac_showEventsPanel();
		});
		if (ac_getValue('eventstarget') != 'docked') {
			$("#ac_tool_events").hide();
		}
	}

	
}

//Create all Content Panels
function ac_createPanels() {

	// Create ActiveChat Container
	$("body").append('<div id="activechat"></div>');
	
	// Create Panel Containers
	$("#activechat").append('<div id="ac_tool_box"></div>');
	$("#activechat").append('<div id="ac_info_box"></div>');

	ac_createTabs();
	ac_createChatPanel();
	ac_createCLIPanel();
	ac_createLogPanel();
	ac_createConfigPanel();
	ac_createCalendarPanel();
	ac_createEventPanel();
	ac_createSliderPanel();

	if (ac_getValue('eventstarget')!='panel') {
		$("#ac_events_panel").hide();
		$("#ac_slider").hide();
		$("#ac_info_box").hide();
	}
	
	document.body.removeChild(document.getElementById('menu'));
	var rcm = document.createElement('div');
	rcm.id = 'menu';
	rcm.className = 'rcm';
	document.body.appendChild(rcm);
}

// Create Chat Panel
function ac_createChatPanel() {

	$("#ac_tool_box").append('<div id="ac_chat_panel" class="ac_panel ac_chat_channel"></div>');
	$("#ac_chat_panel").append('<div id="ac_chat_titlebar" class="ac_titlebar"></div>');

	$("#ac_chat_titlebar").append('<ul id="ac_chat_links" class="ac_links"></ul>');
	$("#ac_chat_titlebar").append('<div id="ac_chat_title" class="ac_title">Chat Messages</div>');
	
	$("#ac_chat_panel").append('<div id="ac_chat_content" class="ac_panel_content"><!-- --></div>');
	$("#ac_chat_panel").append('<div id="ac_chat_form" class="ac_panel_form"></div>');
	
	$("#ac_chat_links").append('<li><a id="ac_link_chatclear" href="#" title="Clear channel content">[clear]</a></li>');
	$("#ac_chat_links").append('<li><a id="ac_link_chatclean" href="#" title="Remove events">[clean up]</a></li>');

	$("form[name='chatform']").attr("id", "chatform");
	$("#chatform").attr("class", "ac_inputform");
	$("#chatform").empty();
	$("#chatform").append('<div id="InputForm"><table width="100%"><tr><td><input id="graf" class="ac_input" type="text" name="graf" maxlength="200" autocomplete="off"></td><td width="1"><input type="button" id="chatbutton" class="ac_button"  value="Chat"></td></tr></table></div>');

	$("#chatform").appendTo($("#ac_chat_form"));

	// Attach Event handlers
	$('#graf').keyup(function(event) {
		event.stopPropagation();
		ac_chatKeyUp(event);
	});
	$("#chatbutton").click(function () { 
      ac_submitChat($("#graf").val(), true);
    });
	$("#ac_link_chatclear").click(function () { 
      ac_clearChannel();
    });
	$("#ac_link_chatclean").click(function () { 
      ac_cleanChannel();
    });

}

// Create Events Panel
function ac_createEventPanel(data) {

	// Create Event Panel Container and Resize Bar
	if (ac_getValue('eventstarget')=='panel') {
		$("#ac_info_box").append('<div id="ac_events_panel" class="ac_panel"></div>');
	} else {
		$("#ac_tool_box").append('<div id="ac_events_panel" class="ac_panel"></div>');
	}

	// Create DOM Elements
	$("#ac_events_panel").append('<div id="ac_events_titlebar" class="ac_titlebar">');
	$("#ac_events_titlebar").append('<ul id="ac_events_links" class="ac_links"></ul>');
	$("#ac_events_titlebar").append('<div id="ac_events_title" class="ac_title">Chat Events</div>');
	$("#ac_events_links").append('<li><a href="lchat.php" title="Reload Chat">[reload]</a></li>');
	$("#ac_events_panel").append('<div id="ac_events_content" class="ac_panel_content"></div>');
	
	if (ac_getValue('eventstarget') != 'panel') {
		$("#ac_events_panel").append('<div id="ac_events_form" class="ac_panel_form"></div>');
		$("#ac_events_form").append('<form id="eventsform" class="ac_inputform" onsubmit="return false;" ></form>');
		$("#eventsform").append('<table width="100%"><tr><td><input  maxlength="200" class="ac_input" type="text" id="eventinput" name="eventinput" autocomplete="off"></td><td width="1"><input type="button" id="eventsbutton" class="ac_button" value="Run"></td></tr></table>');
	}
	
	if (data) {
		$("#ac_events_content").html(data);
	}

	// Attach Event handlers
	$('#eventinput').keyup(function(event) {
		event.stopPropagation();
		ac_eventKeyUp(event);
	});
	$("#eventbutton").click(function () { 
      ac_submitEvent();
    });
}

// Creates the NO Calendar Panel panel
function ac_createCalendarPanel() {
	
	// Create DOM Elements
	$("#ac_tool_box").append('<div id="ac_cal_panel" class="ac_panel" style="display:none"></div>');
	$("#ac_cal_panel").append('<div id="ac_cal_titlebar" class="ac_titlebar">');
	$("#ac_cal_titlebar").append('<ul id="ac_cal_links" class="ac_links"></ul>');
	$("#ac_cal_titlebar").append('<div id="ac_cal_title" class="ac_title">Noblesse Oblige Daily Info</div>');
	$("#ac_cal_links").append('<li><a href="http://noblesse-oblige.org/calendar/" target="_new" title="Open Noblesse Oblige Calendar">[website]</a></li>');

	$("#ac_cal_panel").append('<div id="ac_cal_content" class="ac_panel_content"></div>');
	
	$("#ac_cal_panel").append('<div id="ac_cal_form" class="ac_panel_form"></div>');
	$("#ac_cal_form").append('<form id="calform" class="ac_inputform" onsubmit="return false;" ></form>');
	$("#calform").append('<table width="100%"><tr><td><span id="ac_cal_status"></span></td><td width="1"><input type="button" id="calbutton" class="ac_button" value="Reload"></td></tr></table>');

	var button = document.getElementById('calbutton');
	button.addEventListener("click", ac_getCalendarInfo, true);
	
}


// Creates the integrated Mafia gCLI panel
function ac_createCLIPanel() {
	
	// Create DOM Elements
	$("#ac_tool_box").append('<div id="ac_cli_panel" class="ac_panel" style="display:none"></div>');
	$("#ac_cli_panel").append('<div id="ac_cli_titlebar" class="ac_titlebar">');
	$("#ac_cli_titlebar").append('<ul id="ac_cli_links" class="ac_links"></ul>');
	$("#ac_cli_titlebar").append('<div id="ac_cli_title" class="ac_title">Mafia CLI</div>');

	$("#ac_cli_panel").append('<div id="ac_cli_content" class="ac_panel_content"></div>');
	$("#ac_cli_panel").append('<div id="ac_cli_form" class="ac_panel_form"></div>');
	$("#ac_cli_form").append('<form id="cliform" class="ac_inputform" onsubmit="return false;" ></form>');
	$("#cliform").append('<table width="100%"><tr><td><input  maxlength="200" class="ac_input" type="text" id="cliinput" name="cliinput" autocomplete="off"></td><td width="1"><input type="button" id="clibutton" class="ac_button" value="Execute"></td></tr></table>');

	// Attach Event handlers
	$('#cliinput').keyup(function(event) {
		event.stopPropagation();
		ac_cliKeyUp(event);
	});
	$("#clibutton").click(function () { 
      ac_submitCLICommand();
    });
}

// Creates the Mafia Log panel
function ac_createLogPanel() {
	
	// Create DOM Elements
	$("#ac_tool_box").append('<div id="ac_log_panel" class="ac_panel" style="display:none"></div>');
	$("#ac_log_panel").append('<div id="ac_log_titlebar" class="ac_titlebar">');
	$("#ac_log_titlebar").append('<ul id="ac_log_links" class="ac_links"></ul>');
	$("#ac_log_titlebar").append('<div id="ac_log_title" class="ac_title">Ascension Log Notes</div>');
	
	$("#ac_log_panel").append('<div id="ac_log_content" class="ac_panel_content"></div>');
	$("#ac_log_panel").append('<div id="ac_log_form" class="ac_panel_form"></div>');
	$("#ac_log_form").append('<form id="logform" class="ac_inputform" onsubmit="return false;" ></form>');	
	$("#logform").append('<table width="100%"><tr><td><input  maxlength="200" class="ac_input" type="text" id="loginput" name="loginput" autocomplete="off"></td><td width="1" valign="top"><input type="button" id="logbutton" class="ac_button" value="Log"></td></tr></table>');

	// Attach Event handlers
	$('#loginput').keyup(function(event) {
		if (event.keyCode == '13') {
			event.preventDefault();
			ac_submitLog();
		}
	});
	$("#logbutton").click(function () { 
      ac_submitLog();
    });
}

// Creates the Configuration panel
function ac_createConfigPanel() {
	
	// Create DOM Elements
	$("#ac_tool_box").append('<div id="ac_cfg_panel" class="ac_panel" style="display:none"></div>');
	$("#ac_cfg_panel").append('<div id="ac_cfg_titlebar" class="ac_titlebar">');
	$("#ac_cfg_titlebar").append('<ul id="ac_cfg_links" class="ac_links"></ul>');
	$("#ac_cfg_titlebar").append('<div id="ac_cfg_title" class="ac_title">Configure ActiveChat (Version ' +  AC_VERSION + ')</div>');
	
	$("#ac_cfg_panel").append('<div id="ac_cfg_content" class="ac_panel_content"></div>');
	$("#ac_cfg_panel").append('<div id="ac_cfg_form" class="ac_panel_form"></div>');
	$("#ac_cfg_content").append('<form id="optionsform" class="ac_inputform" onsubmit="return false;" ></form>');	
	$("#ac_cfg_form").append('<form id="cfgform" class="ac_inputform" onsubmit="return false;" ></form>');	
	$("#cfgform").append('<table width="100%"><tr><td valign="top"><input type="button" id="cfgsave" class="ac_button" value="Save Settings" disabled="disabled"> <input type="button" id="cfgreload" class="ac_button" value="Reload Chat" onclick="window.location=\'lchat.php\'></td></tr></table>');
	
	//Create Option Checkboxes	
	$("#optionsform").append('<fieldset id="startupset">');
	$("#startupset").append('<legend>On Startup (Requires restart)</legend>');
	$("#startupset").append(ac_getCheckboxHTML('loadchannels') + '<br>');
	$("#startupset").append(ac_getCheckboxHTML('loadplayers') + '<br>');
	$("#startupset").append(ac_getCheckboxHTML('loadcontacts') + '<br>');
	$("#startupset").append(ac_getCheckboxHTML('loadclannies') + '<br>');
	$("#startupset").append(ac_getCheckboxHTML('idleoff') + '<br>');
	$("#startupset").append(ac_getCheckboxHTML('quack') + '<br>');
	$("#startupset").append(ac_getTextBoxHTML('qtargets') + '<br>');

	$("#optionsform").append('<fieldset id="displayset">');
	$("#displayset").append('<legend>Display</legend>');
	$("#displayset").append(ac_getCheckboxHTML('hidetags') + '<br>');
	$("#displayset").append(ac_getCheckboxHTML('timestamp') + '<br>');
	$("#displayset").append(ac_getCheckboxHTML('pminblue') + '<br>');
	$("#displayset").append(ac_getCheckboxHTML('pmoutblue') + '<br>');
	$("#displayset").append(ac_getCheckboxHTML('verticalkeys') + '<br>');
	$("#displayset").append(ac_getCheckboxHTML('confirmonclose') + '<br>');
	$("#displayset").append(ac_getCheckboxHTML('killonclose') + '<br>');
	$("#displayset").append(ac_getCheckboxHTML('suppressevents') + '<br>');

	$("#optionsform").append('<fieldset id="eventset">');
	$("#eventset").append('<legend>Send events to</legend>');

	$("#eventset").append(ac_getRadioHTML('eventstarget', 'panel', 'A separate events panel') + '<br>');
	$("#eventset").append(ac_getRadioHTML('eventstarget', 'docked', 'A toolbar panel (with a cute little icon)') + '<br>');
	$("#eventset").append(ac_getRadioHTML('eventstarget', 'tab', "A separate 'events' tab") + '<br>');
	$("#eventset").append(ac_getRadioHTML('eventstarget', 'channel', 'The current (KoL) channel') + '<br>');
	$("#eventset").append(ac_getRadioHTML('eventstarget', 'active', 'The active tab') + '<br>');
	$("#eventset").append(ac_getRadioHTML('eventstarget', 'none', 'Valhalla') + '<br>');

	$("#optionsform").append('<fieldset id="toolset">');
	$("#toolset").append('<legend>Optional Tools (Requires restart)</legend>');
	$("#toolset").append(ac_getCheckboxHTML('showlog') + '<br>');
	$("#toolset").append(ac_getCheckboxHTML('showcli') + '<br>');
	$("#toolset").append(ac_getCheckboxHTML('clirefresh') + '<br>');
	$("#toolset").append(ac_getCheckboxHTML('showcalendar') + '<br>');
	$("#toolset").append(ac_getCheckboxHTML('afhbots') + '<br>');

	$("#optionsform").append('<fieldset id="layoutset">');
	$("#layoutset").append('<legend>Layout</legend>');
	$("#layoutset").append(ac_getCheckboxHTML('infotop') + '<br>');
	$("#layoutset").append(ac_getCheckboxHTML('tabstop') + '<br>');

	// Enabled button when options changes
	$("#optionsform input").change(function () { 
		$("#cfgsave").attr("disabled", '');
    });
	
	// Add Event handler to Button
	var button = document.getElementById('cfgsave');
	button.addEventListener("click", ac_saveConfigPanel, true);

}

function ac_createSliderPanel() {
	$("#activechat").append('<div id="ac_slider" class="ac_slider"></div>');
	document.getElementById('ac_slider').addEventListener('mousedown', ac_startSlider, false);
	
}

function ac_blurTools() {
	$("#ac_toolbar li[id^='ac_tool_']").attr("class", "ac_tool ac_tool_off");
}

function ac_switchTool(tool) {
	ac_blurChannel();
	ac_blurTools();
	$("#ac_tool_box .ac_panel").hide();
	$("#ac_" + tool + "_panel").show();
	$("#ac_tool_" + tool).attr("class", "ac_tool ac_tool_on");
	document.ac_currentTool = tool;
	document.ac_resizePanels();
}

// ================================================================================= //
// CALENDAR PANEL FUNCTIONS ======================================================== //
// ================================================================================= //

function ac_showCalendarPanel() {
	ac_switchTool("cal");
}

function ac_getCalendarInfo() {
	
	var kolDate = new Date();
	
	//Get current KOL Date...probably not very accurate
	kolDate.addMinutes(kolDate.getTimezoneOffset());
	kolDate.addMinutes(-360);
	if (kolDate.getHours() > 21) {
		kolDate.addDays(1);
	}
	
	//Testing failures
	//kolDate.addDays(2);
	
	//Get NO URL for daily data
	y = kolDate.getFullYear();
	m = kolDate.getMonth() + 1;
	d = kolDate.getDate();
	file =  'daily_' + y + (m < 10 ? '0' + m : m) + (d < 10 ? '0' + d : d) + '.html';
	url = 'http://noblesse-oblige.org/calendar/' + file;
	
	NODate = kolDate;
	ac_setCalendarStatus('Fetching data: ' + file);
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				$('#ac_cal_content').html(responseDetails.responseText.replace('<a href="clovers.html">Read me about clovers</a>',''));
				$('#ac_cal_status').html(NODate.toDateString());
			} else {
				$('#ac_cal_content').html('No data available');
				$('#ac_cal_status').html('<font color="red">' + NODate.toDateString() + '</font>');
			}
		}
	});
}

function ac_setCalendarStatus(text) {
	$('#ac_cal_status').html(text);
}

// ================================================================================= //
// LOG PANEL FUNCTIONS ============================================================= //
// ================================================================================= //

function ac_showLogPanel() {
	ac_switchTool("log");
	$("#loginput").focus();
}

function ac_submitLog() {

	var sComment = $("#loginput").val();
	$("#loginput").val("");
	
	if (sComment == "") {
		return true;
	}
	
	$.get("/KoLmafia/submitCommand?cmd=" + unsafeWindow.URLEncode('fecho Note: ' + sComment) + "&pwd=" + playerHash, function(data){
	});
		
	sComment = ac_getTimeStamp() + sComment + "<br>"; 
	 
	var newdata = $("#ac_log_content").html() + sComment;
	ac_smartScroll('ac_log_content', newdata, true);
	$("#loginput").focus();
	return true;
}

// ================================================================================= //
// INTEGRATED GCLI PANEL FUNCTIONS ================================================= //
// ================================================================================= //

function ac_showCLIPanel() {

	ac_switchTool("cli");
	$("#cliinput").focus();
}

function ac_startCLI() {
	if (isRelay && ac_getValue('showcli')) {
		ac_getCLIUpdate();
	}
}

function ac_stopCLI() {
}
function ac_pauseCLI() {
}
function ac_resumeCLI() {
}

function ac_cliKeyUp(e) {

	var key = window.event ? e.keyCode : e.which;

	if ( key == 13 ) {
		ac_submitCLICommand();

	} else if ( key == 38 && cliCount > 0 ) {
		$("#cliinput").val(cliCommands[ --cliCount ]);

	} else if ( key == 40 && cliCount + 1 < cliCommands.length ) {
		$("#cliinput").val(cliCommands[ ++cliCount ]);
	}

	if ( e.stopPropagation ) {
		e.stopPropagation();
	}
}

function ac_submitCLICommand() {

	var command = $("#cliinput").val();
	$("#cliinput").val("");
	
	if (command == "") {
		return true;
	}
	
	cliCount = cliCommands.push( command );

	if ( command == "clear" || command == "cls" ) {
		$("#ac_cli_content").html("");
		return true;
	}

	$.get("/KoLmafia/submitCommand?cmd=" + unsafeWindow.URLEncode(command) + "&pwd=" + playerHash, function(data){
	});
	 
	 $("#cliinput").focus();
	 return true;
}

function ac_getCLIUpdate() {
	
	$.get("/KoLmafia/messageUpdate?pwd=" + playerHash, function(data){
		ac_refreshCLI(data);
	});
 
	setTimeout( ac_getCLIUpdate, 3000 );
	return true;
}

function ac_refreshCLI(data) {
	if (data.length < 2 ) {
		return;
	}

	var newdata = ac_truncateData($("#ac_cli_content").html(), ac_getValue('clibuffer')) + data;
	if (document.ac_currentTool == "cli") {
		ac_smartScroll('ac_cli_content', newdata);
	} else {
		$("#ac_cli_content").html(newdata);
	}
	if ((data.indexOf("<!-- REFRESH -->") > 0) && (ac_getValue('clirefresh'))) {
		unsafeWindow.top.charpane.location.reload(true); 
	}
}

// ================================================================================= //
// CONFIG PANEL FUNCTIONS ========================================================== //
// ================================================================================= //

function ac_showConfigPanel() {
	ac_switchTool("cfg");
}

function ac_saveConfigPanel() {

	//Remember old Events target
	var oldTarget = ac_getValue('eventstarget');

	//Get new target
	var newTarget = $("#optionsform input[name='ac_radio_eventstarget']:checked").val();
	ac_setValue('eventstarget', newTarget);
	
	//Process the rest of the checkboxes
	$("#optionsform input.ac_checkbox").each(function(index) {
		key = $(this).attr("id").replace('ac_check_', '');
		ac_setValue(key, $(this).attr("checked"));
	  });
	  
	ac_setValue('qtargets', document.getElementById('ac_text_qtargets').value);
	
	//Save everything
	ac_saveOptions();

	$("#cfgsave").attr("disabled", 'disabled');
	$("#cfgsave").blur();

	//Move some stuff around
	if (oldTarget != newTarget) {
	
		if (newTarget == 'panel' || oldTarget == 'panel') {
			var oldData = $("#ac_events_content").html();
			$("#ac_events_panel").remove();
			ac_createEventPanel(oldData);
		}

		if (newTarget == 'panel') {
			$("#ac_info_box").show();
			$("#ac_slider").show();
			$("#ac_events_panel").show();
			$("#ac_tool_events").hide();
			$("#ac_tab_events").hide();

		} else if (newTarget == 'docked') {
			$("#ac_info_box").hide();
			$("#ac_slider").hide();
			$("#ac_events_panel").hide();
			$("#ac_tool_events").show();
			$("#ac_tab_events").hide();

		} else if (newTarget == 'tab'){
			$("#ac_info_box").hide();
			$("#ac_slider").hide();
			$("#ac_events_panel").hide();
			$("#ac_tool_events").hide();
			$("#ac_tab_events").show();

		} else {
			$("#ac_info_box").hide();
			$("#ac_slider").hide();
			$("#ac_events_panel").hide();
			$("#ac_tool_events").hide();
			$("#ac_tab_events").hide();
		}
	}
	document.ac_resizePanels();
}

function ac_loadOptions() {

	var oldValue;
	var newKey;
	var newValue;

	//First handle obsolete/renamed options
	for (var oldKey in AC_OBSOLETE) {
		oldValue = GM_getValue(oldKey);
		if (oldValue != undefined) {
			newKey = AC_OBSOLETE[oldKey];
			if (newKey != 'delete') {
				newValue = GM_getValue(newKey);
				if (newValue == undefined) {
					GM_setValue(newKey, oldValue);
				}
			}
			GM_deleteValue(oldKey);
		}	
	}

	// Now load all options
	for (var key in AC_OPTIONS) {
		document.ac_options[key] = ac_loadOption(key, AC_DEFAULTS[key]);
	}
	
	// Load Alert List
	ac_loadAlerts();
	
}
function ac_loadOption(key, defaultValue) {	
	var value = GM_getValue(key);
	if (value == undefined) {
		GM_setValue(key, defaultValue);
		value = defaultValue;
	}
	return value;
}

function ac_saveOptions() {
	for (var key in AC_OPTIONS) {
		ac_saveOption(key, document.ac_options[key]);
	}
}

function ac_saveOption(key, value) {
	GM_setValue(key, value);
}

function ac_getValue(key) {
	return document.ac_options[key]; 
}
function ac_setValue(key, value) {
	document.ac_options[key] = value;
}

function ac_loadAlerts() {
	if (document.ac_options['alerts'] == '') {
		document.ac_alerts = [];
	} else {
		document.ac_alerts = document.ac_options['alerts'].split(",");
	}
}

function ac_saveAlerts() {
	if (document.ac_alerts.length == 0) {
		document.ac_options['alerts'] = "";
	} else if (document.ac_alerts.length == 1) {
		document.ac_options['alerts'] = document.ac_alerts[0];
	} else {
		document.ac_options['alerts'] = document.ac_alerts.join(",");
	}
	window.setTimeout(function() {GM_setValue("alerts", document.ac_options['alerts']);}, 0);
}


// ================================================================================= //
// CHANNEL FUNCTIONS =============================================================== //
// ================================================================================= //

function ac_addChannel(channel) {
	
	var title = '';
	var sClass = 'kol';
	var	title = channel;
	
	if (channel.indexOf(AC_PVT_ID)==0) {
		title = AC_PVT_TITLE + channel.substr(AC_PVT_ID.length);
		sClass = "pm";
	} else if (channel == 'events') {
		sClass = "events";
	} else if (channel == 'alerts') {
		sClass = "alerts";
	}
		
	//If the tab doesn't exist, create it and attach event listeners
	if (!document.getElementById('ac_tab_' + channel)) {
		$("#ac_toolbar").append('<li id="ac_tab_' + channel + '" class="ac_tab ac_tab_' + sClass + '"></li> ');
		$("#ac_tab_" + channel).append('<span class="ac_tab_off">' + title + '</span> ');

		$("#ac_tab_" + channel).click(function (event) {
			ac_showChannel(channel);
			$("#graf").focus();
		});
		$("#ac_tab_" + channel).dblclick(function (event) {
			ac_hideChannel(channel); 
			$("#graf").focus();
		});
		$("#ac_tab_" + channel).bind("contextmenu",function(e){
			ac_toggleChannel(channel); 
			$("#graf").focus();
			return false; //disable the context menu
		});

		document.ac_status[channel] = 'awake';
		document.ac_resizePanels();
	} else {
		if (document.ac_status[channel] == 'awake') {
		} else if (document.ac_status[channel] == 'dead') {
			document.ac_status[channel] = 'awake';
			//$("#ac_tab_" + channel).attr('class', 'ac_tab ac_tab_off');
			$("#ac_tab_" + channel + " span").attr("class", "ac_tab_off");
		} else if (document.ac_status[channel] == 'sleep') {
		}
	
	}

	if (!document.ac_chats[channel]) { 
		document.ac_chats[channel] = ""; 
	}
	if (!document.ac_lastchat[channel]) { 
		document.ac_lastchat[channel] = "chat"; 
	}
}

function ac_clearChannel() {
	document.ac_chats[document.ac_currentChannel] = '';
	$('#ac_chat_content').html('');
}

function ac_cleanChannel() {
	$("#ac_chat_content p.event").remove();
	$("#ac_chat_content table").remove();
	$("#ac_chat_content hr").remove();
	var newdata = $("#ac_chat_content").html();
	document.ac_chats[document.ac_currentChannel] = newdata;
	$("#ac_chat_content").html(newdata);
}

function ac_blurChannel() {

	// Chat Channel
	if ((document.ac_currentChannel != '') && (document.ac_currentTool == "chat")) {
	
		//Change appareance of tab
		if (document.ac_status[document.ac_currentChannel] == 'awake') {
			$("#ac_tab_" + document.ac_currentChannel + " span").attr("class", "ac_tab_off");
		} else if (document.ac_status[document.ac_currentChannel] == 'sleep') {
			$("#ac_tab_" + document.ac_currentChannel + " span").attr("class", "ac_tab_sleep");
		} else {
			$("#ac_tab_" + document.ac_currentChannel + " span").attr("class", "ac_tab_dead");
		}

		//Place marker
		var olddata = document.ac_chats[document.ac_currentChannel];
		if (olddata != '') {
			document.ac_chats[document.ac_currentChannel] = olddata.moveMarker();
		}
	}	
}

function ac_hideChannel(channel) {
	
	// Don't close if this is the current KOL Channel
	if (channel == document.ac_kolChannel) { 
		return false;
	}
	// Also don't close if this is the Events Tab
	if (channel == 'events') { 
		return false;
	}
	
	var title = channel;
	if (channel.indexOf(AC_PVT_ID)==0) {
		title = AC_PVT_TITLE + channel.substr(AC_PVT_ID.length);
	}
	
	var tab = document.getElementById('ac_tab_' + channel);
	if (!tab) {
		return false;
	}

	var bClose =  true;
	if (ac_getValue('confirmonclose')) { 
		bClose = confirm('Close the tab "' + title + '"? (OK to Close)');
	}
	if (bClose) {
		document.getElementById('ac_toolbar').removeChild(tab); 
		ac_showChannel(document.ac_kolChannel);
		document.ac_resizePanels();
		if (!ac_isPrivate(channel) && channel != 'events' && channel != 'alerts' && channel != 'private' && ac_getValue('killonclose') && (document.ac_status[channel] != 'dead')) {
			document.ac_status[channel] = 'dead';
			unsafeWindow.submitchat('/l ' + channel);
		}
	}

	return false;
}

function ac_killChannel(channel) {
	if (!ac_isPrivate(channel) && (document.ac_status[channel]=='awake')) {
		document.ac_status[channel] = 'dead';
		$("#ac_tab_" + channel + " span").attr("class", "ac_tab_dead");

	}
}

function ac_toggleChannel(channel) {

	var title = channel;
	if (channel.indexOf(AC_PVT_ID)==0) {
		title = AC_PVT_TITLE + channel.substr(AC_PVT_ID.length);
	}

	if (document.getElementById('ac_tab_' + channel)) {

		if (document.ac_status[channel] == 'awake') {
			document.ac_status[channel] = 'sleep';
			$("#ac_tab_" + channel + " span").attr("class", "ac_tab_sleep");
			ac_addEvent('<font color="green">Channel <b>' + title + '</b> is now asleep</font>');
		} else if (document.ac_status[channel] == 'sleep') {
			document.ac_status[channel] = 'awake';
			$("#ac_tab_" + channel + " span").attr("class", "ac_tab_off");
			ac_addEvent('<font color="green">Channel <b>' + title + '</b> is now awake</font>');
		} else if (document.ac_status[channel] == 'dead') {
		}
	}
	
	//alert(JSON.stringify(document.ac_status));

}


function ac_showChannel(channel) {

	var title = channel;
	if (channel.indexOf(AC_PVT_ID)==0) {
		title = AC_PVT_TITLE + channel.substr(AC_PVT_ID.length);
	}

	if (document.ac_currentTool == 'chat' && document.ac_currentChannel == channel) {

		//Move marker to bottom
		var olddata = document.ac_chats[channel];
		if (olddata != '') {
			var newdata = olddata.moveMarker();
			document.ac_chats[channel] = newdata;
			ac_smartScroll('ac_chat_content', newdata);
		}
		$("#graf").focus();
		return true;

	} else {

		// Switch Panels if required
		if (document.ac_currentTool != 'chat') {
			document.ac_currentTool = "chat";
			ac_blurTools();
			$("#ac_tool_box .ac_panel").hide();
			$("#ac_chat_panel").show();
		}

		// Switch Channels if required
		if (document.ac_currentChannel != channel) {
			ac_blurChannel();
			document.ac_currentChannel = channel;
		}

		// Update Content
		var newdata = document.ac_chats[channel];
		ac_smartScroll('ac_chat_content', newdata);
			
		// Change tab and Title, focus and resize
		$("#ac_tab_" + channel + " span").attr("class", "ac_tab_on");

		if (channel=="events") {
			$("#ac_chat_panel").attr("class", "ac_panel ac_chat_events");
			$("#ac_chat_title").html("events");
		} else {
			$("#ac_chat_panel").attr("class", "ac_panel ac_chat_channel");
			$("#ac_chat_title").html(title);
		}
				
		$("#graf").focus();
		document.ac_resizePanels();	

	}

}


// ================================================================================= //
// EVENT FUNCTIONS ================================================================= //
// ================================================================================= //

function ac_showEventsPanel() {
	ac_switchTool('events');
	notifyState = 0;
	$("#ac_tool_events").attr('style', 'background-image:url(' + AC_IMAGE_EVENTS[0] + ')');
	$("#eventinput").focus();
	document.ac_resizePanels();
}

function ac_addEvent(line) {

	var ignore = false;
	var done = false;
	var preRule = false;
	var postRule = false;
	var isLogOnOff = false;
	var wrapper = "event";

	//Remove all whitespace
	line = line.trim();

	
	if (line.indexOf('<!--alldone-->') != -1) {
		done = true;
	}

	// Get rid of the standard welcome text
	if ((line.indexOf('<center>Welcome to') != -1) ||
		(line.indexOf('<b>LoathingChat</b>') != -1) ||
		(line.indexOf('version 0.9301') != -1) ||
		(line.indexOf("If you're using a weird browser") != -1) ||
		(line.indexOf('Type <b>/?</b> for help') != -1)) {
		ignore = true;
		done = true;
	}
		
	if (!done) {
		// Currently in channel...
		if (line.indexOf('Currently in channel: ') != -1) {
			line = line.stripFont();
			channel = line.substr(line.lastIndexOf(':')+1).trim();
			if (channel != '') {
				document.ac_kolChannel = channel;
				ac_addChannel(channel);
				ac_showChannel(channel);
			}
			line = '<font color="green">Currently in channel: <b>' + channel + '</b></font>';
			lastEvent = 'welcome';
			iNeedSomeClosure = false;
			done = true;

		} else if (lastEvent == 'welcome') {
			line = line.stripFont();
			wrapper = "event spaced";
			lastEvent = 'description';
			iNeedSomeClosure = false;
			done = true;

		} else if (lastEvent == 'description') {
			line = line.stripFont();
			lastEvent = 'other';
			wrapper = "event spaced";
			postRule = true;
			isLoaded = true;
			iNeedSomeClosure = true;
			done = true;

		// Currently listening to channels...
		} else if (line.indexOf('Currently listening to channels:') != -1) {
			line = line + '</font>';
			preRule = true;
			lastEvent = 'channellist';
			iNeedSomeClosure = true;
			done = true;
		
		} else if (lastEvent == 'channellist') {
			if (line.indexOf('&nbsp;') == 0) {
				channel = line.replace(/&nbsp;/g,'').trim();
				channel = channel.replace(/<b>/gi,'').replace(/<\/b>/gi,'');
				if (channel != '') {
					ac_addChannel(channel);
				}
				iNeedSomeClosure = true;
				done = true;
			} else {
				preRule = true;
				iNeedSomeClosure = false;
				lastEvent = 'other';
			}
		}
	}
	
	if (!done) {
		// Last 10 private messages
		if (line.indexOf('<font color="blue"><b>from <a target="mainpane"') != -1) {
			line = line.replace('<font color="blue">','');
			line = '<b><font color="green">Last 10 private messages:</font></b></p><p class="event">' + line;
			line = line.replace('from ', '');
			preRule = true;
			lastEvent = 'lastpms';
			iNeedSomeClosure = true;
			done = true;
		} else if (lastEvent=='lastpms') {
			if (line.indexOf('<b>from <a target="mainpane"') == 0) {
				line = line.replace('from ', '');
				iNeedSomeClosure = true;
				done = true;
			} else {
				preRule = true;
				iNeedSomeClosure = false;
				lastEvent = 'other';
			}
		}
	}
	
	if (!done) {
		// Now listening to...
		if (line.indexOf('Now listening to channel: ') != -1) {
			channel = line.substr(line.lastIndexOf(':')+1).replace('</font>','').trim();
			line = line.replace(channel,'<b>' + channel + '</b>');
			if (channel != '') {
				ac_addChannel(channel);
			}
			lastEvent = "other";
			iNeedSomeClosure = false;
			done = true;
		
		// No longer listening to
		} else if (line.indexOf('No longer listening to channel: ') != -1) {
			channel = line.substr(line.lastIndexOf(':')+1).replace('</font>','').trim();
			line = line.replace(channel,'<b>' + channel + '</b>');
			if (channel != '') {
				ac_killChannel(channel);
			}
			lastEvent = "other";
			iNeedSomeClosure = false;
			done = true;

		// Now talking in channel
		} else if (line.indexOf('You are now talking in channel: ') != -1) {
			channel = line.substr(line.lastIndexOf(':')+1).replace('.','').replace('</font>','').trim();
			line = line.replace(channel,'<b>' + channel + '</b>');
			if (channel != document.ac_kolChannel) {
				document.ac_kolChannel = channel;
				ac_addChannel(channel);
				ac_showChannel(channel);
			}
			lastEvent = "newchannel";
			preRule = true;
			iNeedSomeClosure = false;
			done = true;

		} else if (lastEvent == 'newchannel') {
			wrapper = "event spaced";
			line = line.stripFont();
			lastEvent = 'other';
			iNeedSomeClosure = false;
			postRule = true;
			done = true;
			
		// Players in channel
		// Contacts online
		// Clan members online
		} else if (line.indexOf('<td class="tiny"><center><b>') != -1) {
			line = line.replace('<td class="tiny"><center><b>', '<td><font color="green"><b>');
			line = line.replace('</b></center>','</b></font></td></tr><tr><td class="tiny">');
			iNeedSomeClosure = false;
			preRule = true;
			postRule = true;
			wrapper = "";
			done = true;

		// System Messages
		} else if (line.indexOf('<font color="red">System Message</font>') != -1) {
			line = '<font color="red">' + line.stripFont().replace('System Message','<font color="red">System Message</font>')  + '</font>';
			iNeedSomeClosure = false;
			preRule = true;
			postRule = true;
			lastEvent = "other";
			done = true;

		// MMG Messages
		} else if (line.indexOf('Meat bet, and you') != -1) {
			iNeedSomeClosure = false;
			preRule = true;
			postRule = true;
			lastEvent = "other";
			done = true;
			
		// Recent announcements
		} else if (line.indexOf('<b>Recent Announcements:</b>') != -1) {
			line = '<font color="green"><b>Recent Announcements:</b></font>';
			preRule = true;
			iNeedSomeClosure = true;
			lastEvent = "updates";
			done = true;
			
		} else if (lastEvent == 'updates') {
			if (line == '<hr>') {
				iNeedSomeClosure = false;
				lastEvent = "other";
				done = true;
			} else {
				wrapper = "event spaced";
				done = true;
			}
		}
	}

	//Everything else
	if (!done) {
		if (line=='') {
			ignore = true;
		} else if ( !isLoaded ) {
			ignore = true;
		} else if (line=='<hr>') {
			iNeedSomeClosure = false;
		} else {
			lastEvent = 'event';
		}
	}

	//Is this a logon/logoff message?
	if ( (line.indexOf('logged on') != -1) || (line.indexOf('logged off') != -1) ) {
		isLogOnOff = true;
	}
	
	if (line.indexOf('<!--alldone-->') != -1) {
		if (iNeedSomeClosure) {
			line = '<hr>';
		} else {
			ignore = true;
		}
	} else if (line == '<hr>') {
		//It's perfect...don't mess with it!
	} else {

		//Wrap in paragraph
		if (wrapper != '') {
			line = '<p class="' + wrapper + '">' + line + '</p>';
		}
		
		//Add leading HR
		if (preRule) {
			line = '<hr>' + line;
		}
		//Add trailing HR
		if (postRule) {
			line = line + '<hr>';
		}
	}
			

	//Dispatch it to all enabled tabs/panels
	if (!ignore) {
		target = ac_getValue('eventstarget');
		if (target == 'tab') {
			ac_addChat('events', line, true);

		} else if ((target == 'panel') || (target == 'docked')) {
			var newdata = ac_truncateData($("#ac_events_content").html(), ac_getValue('eventsbuffer')) + line;
			newdata = newdata.fixRules();
			ac_smartScroll('ac_events_content', newdata, true);
			
			if ( (target == 'docked') && (chatCycles > startupCycles )) {
				newState = (isLogOnOff) ? 1 : 2;
				if (newState > notifyState) {
					$("#ac_tool_events").attr('style', 'background-image:url(' + AC_IMAGE_EVENTS[newState] + ')');
					notifyState = newState;
				}
			}
			
		} else if (target == 'channel') {
			ac_addChat(document.ac_kolChannel, line, true);

		} else if (target == 'active') {
			ac_addChat(document.ac_currentChannel, line, true);

		} else {
			//Send it to Valhalla!
		}
		
	} else {
		//ac_debug('IGNORED');
	}
}

function ac_eventKeyUp(e) {

	var key = window.event ? e.keyCode : e.which;
	var message;

	if ( key == 13 ) {
		ac_submitEvent($("#eventinput").val(), true);

	} else if ((key == 38 || key == 40)) {
		if (eventPointer == -1) {
			eventCurrent = $("#eventinput").val();
		}
		if (key == 38) {
			eventPointer++;
			if (eventPointer >= EVENTMAX || !eventHistory[eventPointer]) {
				eventPointer = -1;
				message = eventCurrent;
			} else { 
				message = eventHistory[eventPointer];
			}
		} else if (key == 40) {
			eventPointer--;
			if (eventPointer == -1) {
				message = eventCurrent;
			} else if (eventPointer < 0) {
				eventPointer = eventHistory.length - 1;
				message = eventHistory[eventPointer];
			} else {
				message = eventHistory[eventPointer];
			}
		}
		$("#eventinput").val(message);
	} 

	if ( e.stopPropagation ) {
		e.stopPropagation();
	}
}

function ac_submitEvent(txt, history) {

	var txt = txt.trim();
	var chat = txt;
		
	var isEmote = (txt.indexOf('/me') == 0 || txt.indexOf('/em') == 0);
	var isCommand = (txt.indexOf('/') == 0);
	var sendto = '';
	
	if (history) {
		eventHistory.unshift(chat);
		if (eventHistory.length > EVENTMAX) {
			eventHistory.pop();
		}
		eventPointer = -1;
		eventCurrent = null; 	
	}
	
	// Blank messages
	if (txt == '') {
		return false;

	// Configure
	} else if (txt == '/options') {
		ac_showConfigPanel();
		$("#eventinput").val('');
		return false;

	// Clear
	} else if (txt == '/cls' || txt == '/clear') {
		$("#event_content").html("");
		$("#eventinput").val('');
		return false;
		
	// Clear All
	} else if (txt == '/clsa' || txt == '/clearall') {
		for (var c in document.ac_chats) {
			document.ac_chats[c] = '<!-- -->';
		}
		document.getElementById('ac_chat_content').innerHTML = '<!-- -->';
		$("#event_content").html("");
		$("#eventinput").val('');
		return false;
	
	// Mark
	} else if (txt == '/mark') {
		var line = '<p class="timestamp">&mdash;&mdash;&mdash;&nbsp;' + ac_getTimeStamp() + '&nbsp;&mdash;&mdash;&mdash;</p>';
		newdata = ac_truncateData($("#event_content").html(), ac_getValue('eventbuffer')) + line;
		ac_smartScroll('event_content', newdata, true);
		$("#eventinput").val('');
		return false;
		
	// Toggle Channels
	} else if (txt.indexOf('/toggle ') == 0) {
		var temp = new Array();
		temp = txt.split(' ');
		ac_toggleChannel(temp[1]);
		$("#graf").val('');
		return false;
	
	// Alerts
	} else if (txt.indexOf('/alert ') == 0) {
		var temp = "";
		temp = txt.replace(/\/alert /i,"");
		ac_toggleAlerts(temp);
		$("#graf").val('');
		return false	
			
	// Math Stuff
	} else 	if (txt.indexOf('=') == 0) {
		var math = /= *([0-9.]*) *([+*/-]) *([0-9.]*)/.exec(txt);
		if (math && math[1] && math[2] && math[3] && math[1] != '' && math[2] != '' && math[3] != '') {
			var result = 0;	
			var a = parseFloat(math[1]);
			var b = parseFloat(math[3]);
			if (math[2] == '+') { result = a + b; }
			else if (math[2] == '-') { result = a - b; }
			else if (math[2] == '*') { result = a * b; }
			else if (math[2] == '/') { result = a / b; }

			ac_addEvent(math[0].replace(/^=/,'') + ' = <b>' + result + '</b>');
			$("#eventinput").val('');
			return false;			
		}
	
	// Who
	} else if (txt.match('^/w(?:ho)? *$')) {
	
	// Emotes
	} else if (isEmote) {
	
	// Other Commands
	} else if (isCommand) {

	// Everything else
	} else {
	}
	
	unsafeWindow.submitchat(chat);
	$("#eventinput").val('');
}


// ================================================================================= //
// CHAT FUNCTIONS ================================================================== //
// ================================================================================= //

function ac_addChat(channel, line, isEvent) {

	//Discard invalid messages
	if (!channel || channel=='') {
		return;
	}
	if (line == '') {
		return;
	}

	var isPrivate = (channel.indexOf(AC_PVT_ID)==0);
	var isSender = false;
	var newMode = (isEvent ? 'event' : 'chat');

	//If we don't have a tab for this channel yet, create one
	if (!document.getElementById('ac_tab_'+channel)) {
		ac_addChannel(channel);
	}

	var olddata = document.ac_chats[channel];

	// Mod Announcements / Warnings
	if (line.indexOf('<font color="green">Mod Announcement</font>') != -1) {
		line = line + '</font>';
	}
	if (line.indexOf('<font color="red">Mod Warning</font>') != -1) {
		line = line + '</font>';
	}
	if (line.indexOf('</font>') == 0) {
		line = line.replace('</font>','');
	}

	
	if (isEvent) {
		isSender = false;
	} else {
	
		//Do AFH Relay stuff
		if (ac_getValue('afhbots') && !isPrivate ) {
			line = afh_relayChat(line);
		}
	
		// Hide Tags
		if (ac_getValue('hidetags') && channel != 'alerts') {
			line = line.replace('[' + channel + ']', '');
		}
			
		// Add Timestamp
		if (ac_getValue('timestamp')) {
			line = ac_getTimeStamp() + line;
		}

		if (isPrivate) {
			isSender = (line.indexOf('<b>private to <a') != -1);
			if ( (isSender && !ac_getValue('pmoutblue')) || (!isSender && !ac_getValue('pminblue'))){
				line = line.stripFont();
			}
		} else {
			isSender = (line.indexOf('showplayer.php?who=' + playerID) != -1);
		}
		
		if (channel == 'pvp') {
		line = '<p class="message">' + line + '</font></p>';
		}
		else {
		line = '<p class="message">' + line + '</p>';
		}
	}
	
	//If we switched between a event and a chat message, put a HR between them
	if (document.ac_lastchat[channel] != newMode) {
		line = '<hr>' + line;
		document.ac_lastchat[channel] = newMode;
	}
	
	//Update the content
	var newdata = ac_truncateData(olddata, ac_getValue('chatbuffer')) + line;
	newdata = newdata.fixRules();
	document.ac_chats[channel] = newdata;

	//Determine if we should notify or not
	var isLogOnOff = false;
	var notify = true;
	if ( (line.indexOf('logged on') != -1) || (line.indexOf('logged off') != -1) ) {
		isLogOnOff = true;
	}
	if (isEvent) {
		if (chatCycles <= startupCycles) {
			notify = false;
		} else if (isLogOnOff && ac_getValue('suppressevents')) {
			notify = false;
		}
	} else {
		if (isSender) {
			notify = false;
		}
	}
	if (document.ac_status[channel] == 'sleep') {
		notify = false;
	}
	
	if(channel == 'unquacked' && !unquackhigh) {
		notify = false;
	}
	
	
	if (document.ac_currentTool == "chat") {
		if (channel == document.ac_currentChannel) {
			ac_smartScroll('ac_chat_content', newdata);
		} else {
			if (notify) {
				$("#" + 'ac_tab_' + channel + " span").attr("class", "ac_tab_new");
			}
		}

	} else {
		if (notify) {
			$("#" + 'ac_tab_' + channel + " span").attr("class", "ac_tab_new");
		}
	}

}

function ac_refreshChat() {

	//Get new chat messages
	var chat = document.getElementById("ChatWindow").innerHTML.replace(/<!--lastseen:[0-9]+-->/g,'');


	if (chat.length > 0) {
		chatCycles++;
		iNeedSomeClosure = false;
		
		chat = chat.replace(/<p>/g,'<br>').replace(/<\/p>/g,'');
		var lines = chat.split("<br>");

		for (i = 0; i < lines.length; i++) {
			var channel = '';
			var isPrivate = false;
			var line = lines[i].trim();
			
			ac_debug(line);

			//Get rid of crap
			line = line.replace('<!--viva-->','');
			if (line.indexOf('</font>') == 0) {
				line = line.replace('</font>','');
			}

			if (line != '') {

				// Tagged (channel) messages
				var channelreg = /<font color="?[#0-9a-zA-Z]*"?>\[([^\]]+)\]</; 
				if (match = channelreg.exec(line) ) {
					channel = match[1];
				}
				if (channel == 'link') { channel = ''; }
			
				// Private messages
				if (channel == '') {
					if (line.indexOf('color="blue"') != -1) {
						var pmreg = /<font color="blue"><b>private to <a[^>]*><font[^>]*>([^<]+)</;
						var pmreg2 = /<a[^>]*><font[^>]*>(?:<b>)?([^(]+) \(private\):/;
						if (match3 = pmreg.exec(line)) {
							channel = AC_PVT_ID + match3[1].replace(/ /g, '_').toLowerCase();
							isPrivate = true;
						} else if (match4 = pmreg2.exec(line)) {
							channel = AC_PVT_ID + match4[1].replace(/ /g, '_').toLowerCase();
							isPrivate = true;
						}
					}
				}			

				// Players in channel
				if ((channel == '') && line.indexOf('<td class="tiny"><center><b>Players in channel') != -1) {
					channel = "events";
				}

				if (channel == '' ) {
					//Haiku
					if (line.indexOf('<') == -1 && document.ac_lastChannel == 'haiku') {
						channel = 'haiku';
					} else if (line.indexOf('And has won the game [') == 0 && document.ac_lastChannel == 'haiku') {
						channel = 'haiku';
						
					//Gothy
					} else if (	(line.indexOf('<b>') == -1) && 
								(line.indexOf('<i>') > 0) && 
								(document.ac_lastChannel != 'events')) {
						channel = document.ac_lastChannel;
					} else {
						channel = "events";
					}
				}
				
				afhreplaced = 0;
				// AFH Private Clan messages
				if (ac_getValue('afhbots') && channel == 'clan' && line.toLowerCase().replace("</b>","").replace(/<!--(.)*-->/,"").indexOf("</a>: private:") != -1) {
					line = line.replace(/PRIVATE:/i, '');
					//line = line.replace(/\[clan\]/, '');
					channel = 'private';
					afhreplaced = 1;
				}
				
				if (channel == "events") {
					ac_addEvent(line);
				} else {
					var anyquacks=0;
					var unquacked = line;
					if (ac_getValue('quack') && !isPrivate) {
						var quackthis = 0;
						var targets = ac_getValue('qtargets').split(separator);
						for (var target in targets) {
							//ac_debug("target=",targets[target]);
							if (line.indexOf('who='+targets[target]) > 0 || quackall) {
								quackthis=1;
							}
						}
						if (quackthis == 1) {	
							ac_debug("target match");
							var quackline='';
							var startpoint;
							var textline;
							var endline="";
							console.log("line=",line);
							if (line.lastIndexOf('<i>')>0) {
								startpoint=line.indexOf('</b>');
								var possiblestart = line.lastIndexOf('<i>');
								if (possiblestart > startpoint){
									quackline = quackline + line.slice(0,possiblestart+3);
									textline = line.slice(possiblestart+3, line.lastIndexOf('</i>'));}
								else {
								quackline = quackline + line.slice(0,startpoint+5);
								textline = line.slice(startpoint+5, line.lastIndexOf('</i>'));
								}
								endline = "</i>";
							}
							else {
								if (startpoint=line.indexOf('</b>:')==-1) {
									startpoint=line.indexOf(':</b>');
								}
								else {
								startpoint=line.indexOf('</b>:');
								}
								quackline = quackline + line.slice(0,startpoint+6);
								var templine = line.slice(startpoint+6, line.length);
								if (channel == 'pvp') {
									var endpoint;
									endpoint = templine.indexOf('</font>');
									textline = templine.slice(startpoint+6, endpoint);
									endline = templine.slice(endpoint, templine.length);
								}
								else {
									textline = line.slice(startpoint+6, line.length);
								//endline = "</p>";
								}
							}
							console.log("quackline=",quackline);
							console.log("textline=",textline);
							var link = '';
							var start=0;
							var end=0;
							if (textline.indexOf('<a') >= 0) {
								start = textline.indexOf('<a');
								end = textline.indexOf('/a>');
								var result;
								var textlink;
								if (result = /http\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}/.exec(textline)) {
									ac_debug("regex match");
									textlink=result[0];
								}	
								link=textline.slice(start,end+3);
								startline2 = textline.slice(0,start)+ ' ';
								endline2 = textline.slice(end+3, textline.length);
								console.log("startline2=",startline2);
								console.log("endline2=",endline2);
								textline = startline2+"PLACEHOLDER"+endline2;
								console.log("link=",link);
								console.log("textline=",textline);
									//quackline = quackline + link+ ' '+textlink+' ';
									ac_debug("quackline=",quackline)
							}
							var totallength;	
							var words = textline.split(" ");
							for (var word in words) {
								console.log("word=",words[word]);
								if (words[word].slice(0,4)=="http") {
									quackline = quackline+words[word]+' ';
								}
								else {
									if (words[word]=="PLACEHOLDER") {
									quackline = quackline+link+' ';
									}
									else {
										var randomnumber=Math.floor(Math.random()*10);
										//ac_debug("randomnumber=",randomnumber);
										if (randomnumber<=6) {
											// QUACK
											anyquacks = 1;
											var initstring;
											var termstring;
											var thisword = words[word];
											var quacklit;
											firstletter = thisword.charAt(0);
											//ac_debug(first=",firstletter");
											lastletter= thisword.charAt(thisword.length-1);
											//ac_debug(last=",lastletter");

											if(/[^\w\s]/.test(firstletter)) { 
												//ac_debug("first punctuation");
												initstring=firstletter;
												thisword = thisword.slice(1);
												//ac_debug("new thisword=",thisword);
											}
											else initstring='';
											//console.log("initstring=",initstring);
											if(/[^\w\s]/.test(lastletter)) {
												//console.log("last punct.");
												termstring=lastletter;
												thisword = thisword.slice(0,thisword.length-2);
												//console.log("new thisword=",thisword);
											}
											else termstring='';
											//console.log("termstring=",termstring);

											if(thisword === thisword.toUpperCase()) quacklit='QUACK';
											else if (thisword[0] === thisword[0].toUpperCase()) quacklit='Quack';
											else quacklit='quack';

											quacklit = initstring+quacklit+termstring+' ';
											quackline = quackline + quacklit;
											console.log("quackline=",quackline);
										}
										else {
											quackline = quackline + words[word]+ ' ';
											console.log("quackline=",quackline);
										}
									}
								}
							}
							line = quackline+endline;
							console.log("final line=",line);
						}
					}
					
					//Display chat message
					ac_addChat(channel, line, false);

					if(anyquacks == 1 && unquacked) ac_addChat('unquacked', unquacked, false);
					
					// Alerts
					if (!isPrivate && document.ac_alerts.length > 0) {
					
						var iColon = line.indexOf(":");
						if (iColon > -1) {
							for (q = 0; q < document.ac_alerts.length; q++) {
								var sAlert = document.ac_alerts[q];
								var start = line.toLowerCase().indexOf(sAlert.toLowerCase(), iColon);
								if (sAlert != "" && start != -1) {
									beginning = line.substring(0, start);
									end = line.substring(start + sAlert.length, line.length);
									middle = '<b><font color=red>' + line.substring(start, start + sAlert.length) + '</b></font>';
									ac_addChat('alerts', beginning + middle + end, false);
								}
							}
						}
					}
				}

				document.ac_lastChannel = channel;
				
			}
		}
		
		ac_addEvent('<!--alldone-->');
	}
	document.getElementById("ChatWindow").innerHTML = "";
	window.setTimeout(ac_refreshChat, 2500);
}

function ac_submitChat(txt, history) {

	txt = txt.trim();
	chat = txt;
		
	var isWrongChannel = ((document.ac_currentChannel != document.ac_kolChannel) && (document.ac_currentChannel != 'events') );
	var isEmote = (txt.indexOf('/me') == 0 || txt.indexOf('/em') == 0);
	var isCommand = (txt.indexOf('/') == 0);
	var isPrivate = false;
	var isVirtual = false;
	var sendto = '';
	
	if (history) {
		chatHistory.unshift(chat);
		if (chatHistory.length > CHATMAX) {
			chatHistory.pop();
		}
		chatPointer = -1;
		chatCurrent = null; 	
	}
	
	// Is this a PM channel?
	if (document.ac_currentChannel.indexOf(AC_PVT_ID) == 0) {
		isPrivate = true;
		sendto = document.ac_currentChannel.substr(AC_PVT_ID.length).replace(/ /g,'_');
	}

	// Is this a virtual channel
	if (document.ac_currentChannel == 'events' || document.ac_currentChannel == 'alerts' || document.ac_currentChannel == 'private') {
		isVirtual = true;
	}
	
	// Blank messages
	if (txt == '') {
		return false;

	// Configure
	} else if (txt == '/options') {
		ac_showConfigPanel();
		$("#graf").val('');
		return false;

	// Clear
	} else if (txt == '/cls' || txt == '/clear') {
		document.ac_chats[document.ac_currentChannel] = '<!-- -->';
		document.getElementById('ac_chat_content').innerHTML = '<!-- -->';
		$("#graf").val('');
		return false;
		
	// Clear All
	} else if (txt == '/clsa' || txt == '/clearall') {
		for (var c in document.ac_chats) {
			document.ac_chats[c] = '';
		}
		document.getElementById('ac_chat_content').innerHTML = '<!-- -->';
		$("#graf").val('');
		return false;
	
	// Mark
	} else if (txt == '/mark') {
		var line = '<p class="timestamp">&mdash;&mdash;&mdash;&nbsp;' + ac_getTimeStamp() + '&nbsp;&mdash;&mdash;&mdash;</p>';
		newdata = ac_truncateData(document.ac_chats[document.ac_currentChannel], ac_getValue('chatbuffer')) + line;
		document.ac_chats[document.ac_currentChannel] = newdata;
		ac_smartScroll('ac_chat_content', newdata, true);
		$("#graf").val('');
		return false;
	
	// Toggle Channels
	} else if (txt.indexOf('/toggle ') == 0) {
		var temp = new Array();
		temp = txt.split(' ');
		ac_toggleChannel(temp[1]);
		$("#graf").val('');
		return false;
	
	// Alerts
	} else if (txt.indexOf('/alert ') == 0) {
		var temp = "";
		temp = txt.replace(/\/alert /i,"");
		ac_toggleAlerts(temp);
		$("#graf").val('');
		return false	

	} else if (txt == '/who afhk') {
		chat = '/msg afhk who';
	
	} else if (txt == '/who afh') {
		chat = '/msg afh who';
			
	} else if (txt.indexOf('/alerts') == 0) {
		ac_showAlerts();
		$("#graf").val('');
		return false	
		
	// Math Stuff
	} else 	if (txt.indexOf('=') == 0) {
		var math = /= *([0-9.]*) *([+*/-]) *([0-9.]*)/.exec(txt);
		if (math && math[1] && math[2] && math[3] && math[1] != '' && math[2] != '' && math[3] != '') {
			var result = 0;	
			var a = parseFloat(math[1]);
			var b = parseFloat(math[3]);
			if (math[2] == '+') { result = a + b; }
			else if (math[2] == '-') { result = a - b; }
			else if (math[2] == '*') { result = a * b; }
			else if (math[2] == '/') { result = a / b; }

			ac_addEvent(math[0].replace(/^=/,'') + ' = <b>' + result + '</b>');
			$("#graf").val('');
			return false;			
		} else {
			if (isPrivate) {
				chat = '/msg ' + sendto + ' ' + txt;
			} else if (document.ac_currentChannel == 'events' || document.ac_currentChannel == 'alerts') {
				chat = '/' + document.ac_kolChannel + ' ' + txt;
			} else if (document.ac_currentChannel == 'private') {
				chat = '/clan PRIVATE: ' + txt;
			} else if (isWrongChannel) {
				chat = '/' + document.ac_currentChannel + ' ' + txt;
			}
		}

	// Who
	} else if (txt.match('^/w(?:ho)? *$')) {
		if (isPrivate) {
		} else if (document.ac_currentChannel == 'events' || document.ac_currentChannel == 'alerts') {
			chat = '/who ' + (document.ac_kolChannel);
		} else if (document.ac_currentChannel == 'private') {
			chat = '/who clan';
		} else if (isWrongChannel) {
			chat = '/who ' + (document.ac_currentChannel);
		}
	
	// Emotes
	} else if (isEmote) {
		if (isPrivate) {
			chat = '/msg ' + sendto + ' ' + txt;
		} else if (document.ac_currentChannel == 'events' || document.ac_currentChannel == 'alerts') {
			chat = '/' + document.ac_kolChannel + ' ' + txt;
		} else if (document.ac_currentChannel == 'private') {
			chat = '/clan PRIVATE: ' + txt;
		} else if (isWrongChannel) {
			chat = '/' + document.ac_currentChannel + ' ' + txt;
		}
	
	// Other Commands
	} else if (isCommand) {

	// Everything else
	} else {
		if (isPrivate) {
			chat = '/msg ' + sendto + ' ' + txt;
		} else if (document.ac_currentChannel == 'events' || document.ac_currentChannel == 'alerts') {
			chat = '/' + document.ac_kolChannel + ' ' + txt;
		} else if (document.ac_currentChannel == 'private') {
			chat = '/clan PRIVATE: ' + txt;
		} else if (isWrongChannel) {
			chat = '/' + document.ac_currentChannel + ' ' + txt;
		}
	}
	
	unsafeWindow.submitchat(chat);
}

function ac_chatKeyUp(e) {

	var key = window.event ? e.keyCode : e.which;

	if ( key == 13 ) {
		ac_submitChat($("#graf").val(), true);

	} else if ((key == 38 || key == 40)) {
		if (chatPointer == -1) {
			chatCurrent = $("#graf").val();
		}
		if (key == 38) {
			chatPointer++;
			if (chatPointer >= CHATMAX || !chatHistory[chatPointer]) {
				chatPointer = -1;
				message = chatCurrent;
			} else { 
				message = chatHistory[chatPointer];
			}
		} else if (key == 40) {
			chatPointer--;
			if (chatPointer == -1) {
				message = chatCurrent;
			} else if (chatPointer < 0) {
				chatPointer = chatHistory.length - 1;
				message = chatHistory[chatPointer];
			} else {
				message = chatHistory[chatPointer];
			}
		}
		$("#graf").val(message);
	} 

	if ( e.stopPropagation ) {
		e.stopPropagation();
	}
}

// ================================================================================= //
// MISC FUNCTIONS ================================================================== //
// ================================================================================= //


document.ac_resizePanels = function () {

	tool = document.ac_currentTool;
	//info = document.ac_currentInfo;
	info = 'events';

	//Resize with Events Panel
	if (ac_getValue('eventstarget')=='panel') {

		var clientHeight = document.body.clientHeight;
		bTabsTop = ac_getValue('tabstop');
		bInfoTop = ac_getValue('infotop');

		//Calculate Height of main containers
		var infoBoxHeight = ac_getValue('infoheight');
		var toolBoxHeight = clientHeight - infoBoxHeight - (AC_MARGIN * 2) - AC_BAR_HEIGHT - 2;
		var tabHeight = document.getElementById('ac_toolbar').offsetHeight;

		//Calculate height of ToolBox elements
		var toolPanelHeight = toolBoxHeight - tabHeight - AC_MARGIN - 2;
		var toolTitleHeight = document.getElementById('ac_' + tool + '_titlebar').offsetHeight;
		var toolForm = document.getElementById('ac_' + tool + '_form');
		if (toolForm) {
			var toolFormHeight = toolForm.offsetHeight;
			var toolContentHeight = toolPanelHeight - toolFormHeight - toolTitleHeight - 8;
		} else {
			var toolFormHeight = 0;
			var toolContentHeight = toolPanelHeight - toolTitleHeight - 8;
		}
		document.getElementById("ac_tool_box").style.height = toolBoxHeight;
		document.getElementById('ac_' + tool + '_panel').style.height = toolPanelHeight;
		document.getElementById('ac_' + tool + '_content').style.height = toolContentHeight;

		//Calculate height of InfoBox elements
		var infoPanelHeight = infoBoxHeight;
		var infoTitleHeight = document.getElementById('ac_' + info + '_titlebar').offsetHeight;
		var infoContentHeight = infoPanelHeight - infoTitleHeight - 8;
		document.getElementById("ac_info_box").style.height = infoBoxHeight + 2;
		document.getElementById('ac_' + info + '_panel').style.height = infoPanelHeight;
		document.getElementById('ac_' + info + '_content').style.height = infoContentHeight;

		//Set boundaries for slider
		ac_toolMinHeight = toolTitleHeight + toolFormHeight + AC_TOOL_MINHEIGHT;
		ac_infoMinHeight = infoTitleHeight + AC_INFO_MINHEIGHT;
		ac_infoMaxHeight = clientHeight - tabHeight - (AC_MARGIN * 3) - AC_BAR_HEIGHT - 4 - ac_toolMinHeight;
		
		if (bInfoTop) {
			document.getElementById("ac_info_box").style.top = "0px";
			document.getElementById("ac_info_box").style.bottom = "auto";
			document.getElementById("ac_tool_box").style.top = "auto";
			document.getElementById("ac_tool_box").style.bottom = "0px";
			document.getElementById("ac_slider").style.bottom = toolBoxHeight;
		} else {
			document.getElementById("ac_info_box").style.top = "auto";
			document.getElementById("ac_info_box").style.bottom = "0px";
			document.getElementById("ac_tool_box").style.top = "0px";
			document.getElementById("ac_tool_box").style.bottom = "auto";
			document.getElementById("ac_slider").style.bottom = infoBoxHeight + 2;
		}
		
		if (bTabsTop) {
			document.getElementById('ac_toolbar').style.top = '0px';
			document.getElementById('ac_toolbar').style.bottom = 'auto';
			document.getElementById('ac_' + document.ac_currentTool + '_panel').style.top = 'auto';
			document.getElementById('ac_' + document.ac_currentTool + '_panel').style.bottom = '0px';
		} else {
			document.getElementById('ac_toolbar').style.top = 'auto';
			document.getElementById('ac_toolbar').style.bottom = '0px';
			document.getElementById('ac_' + document.ac_currentTool + '_panel').style.top = '0px';
			document.getElementById('ac_' + document.ac_currentTool + '_panel').style.bottom = 'auto';
		}

	//Resize without Events Panel
	} else {

		var clientHeight = document.body.clientHeight;
		bTabsTop = ac_getValue('tabstop');
		
		//Calculate Height of main containers
		var toolBoxHeight = clientHeight - (AC_MARGIN*2);
		var tabHeight = document.getElementById('ac_toolbar').offsetHeight;

		//Calculate height of ToolBox elements
		var toolPanelHeight = toolBoxHeight - tabHeight - AC_MARGIN - 2;
		var toolTitleHeight = document.getElementById('ac_' + tool + '_titlebar').offsetHeight;
		var toolForm = document.getElementById('ac_' + tool + '_form');
		if (toolForm) {
			var toolFormHeight = toolForm.offsetHeight;
			var toolContentHeight = toolPanelHeight - toolFormHeight - toolTitleHeight - 8;
		} else {
			var toolFormHeight = 0;
			var toolContentHeight = toolPanelHeight - toolTitleHeight - 8;
		}
		document.getElementById("ac_tool_box").style.height = toolBoxHeight;
		document.getElementById('ac_' + tool + '_panel').style.height = toolPanelHeight;
		document.getElementById('ac_' + tool + '_content').style.height = toolContentHeight;

		if (bTabsTop) {
			document.getElementById('ac_toolbar').style.top = '0px';
			document.getElementById('ac_toolbar').style.bottom = 'auto';
			document.getElementById('ac_' + document.ac_currentTool + '_panel').style.top = 'auto';
			document.getElementById('ac_' + document.ac_currentTool + '_panel').style.bottom = '0px';
		} else {
			document.getElementById('ac_toolbar').style.top = 'auto';
			document.getElementById('ac_toolbar').style.bottom = '0px';
			document.getElementById('ac_' + document.ac_currentTool + '_panel').style.top = '0px';
			document.getElementById('ac_' + document.ac_currentTool + '_panel').style.bottom = 'auto';
		}

	}

}

function ac_debug(sLine) {
	if (ac_getValue('firebug')) {
		if(unsafeWindow.console) {
			unsafeWindow.console.info("'" + sLine + "'");
		}
	}
	if (ac_getValue('debug')) {
		GM_log(sLine);
	}
}

function ac_smartScroll(containerid, html, force) {

	dv = document.getElementById(containerid);
	
	if (dv) {
		var autoscroll = (dv.scrollTop == dv.scrollHeight - dv.clientHeight) ? true : false;
		dv.innerHTML = html;
		if (autoscroll || force) {
			dv.scrollTop = dv.scrollHeight - dv.clientHeight;
		}
	}
}

function ac_addData(olddata, line, max) {
	return ac_truncateData(olddata, max) + line;
}

function ac_truncateData(data, max) {
	var iStart = 0;
	var iEnd = 0;
	var iTable = 0;
	var iPara = 0;
	var iHR = 0;

	if (max > 0) {
		while (data.length > max ) {
			iStart = data.indexOf("<");
			if (iStart != -1 ) {
				iTable = data.indexOf( "<table", iStart + 1);
				iPara = data.indexOf( "<p", iStart + 1);
				iHR = data.indexOf( "<hr", iStart + 1);
				iEnd = Math.min((iTable == -1) ? 100000 : iTable, (iPara == -1) ? 100000 : iPara, (iHR == -1) ? 100000 : iHR);
				if (iEnd != 100000 ) {
					data = data.substring(iEnd);
				} else {
					data = "";
				}
			} else {
				data = "";
			}
		}
	}	
	return data;
}

function ac_getTimeStamp() {
	now = new Date();
	hours = now.getHours();
	mins = now.getMinutes();
	if (hours < 10) { hours = '0' + hours; }
	if (mins < 10) { mins = '0' + mins; }
	return '[' + hours + ':' + mins + ']';
}

function ac_isPrivate(channel) {
	return (channel.indexOf(AC_PVT_ID)==0);
}

function ac_getCheckboxHTML(key) {
	return '<input id="ac_check_' + key + '" type="checkbox" class="ac_checkbox" name="acoptions" value="' + key + '"' + (ac_getValue(key) ? ' checked="checked"' : '') + '><label for="ac_check_' + key + '">' + AC_OPTIONS[key] + '</label>';
}

function ac_getTextBoxHTML(key) {
	return '<label for="ac_text_"' + key + '">' + AC_OPTIONS[key] + '</label><br><input id="ac_text_' + key + '" type="text" class="ac_textbox" name="actext" value="' + ac_getValue(key) +'">';
}
	
function ac_getRadioHTML(key, value, label) {
	name = 'ac_radio_' + key;
	id = name + value;
	checked = (ac_getValue(key)==value) ? ' checked="checked"' : '';
	return '<input id="' + id + '" type="radio" class="ac_radio" name="' + name + '" value="' + value + '"' + checked + '><label for="' + id + '">' + label + '</label>';
}	

function ac_toggleAlerts(sList) {

	var alerts = sList.split(',');
	var newalert = '';
	
	for (i = 0; i < alerts.length ; i++ ) {
		newalert = alerts[i].trim();
		
		if (document.ac_alerts.indexOf(newalert) == -1) {
			document.ac_alerts[document.ac_alerts.length] = newalert;
			ac_addEvent('<font color="green"><b>' + newalert + '</b> added to alert list</font>');

		} else {
			var pos = document.ac_alerts.indexOf(newalert);
			if (document.ac_alerts.length > 1) {
				document.ac_alerts.splice(pos, 1);
			} else {
				document.ac_alerts = [];
			}

			ac_addEvent('<font color="green"><b>' + newalert + '</b> removed from alert list</font>');
		}
	}
	ac_saveAlerts();
	ac_showAlerts();

}

function ac_showAlerts() {
	ac_addEvent('<font color="green"><b>Active alerts: </b>' + document.ac_alerts.join(', ') + '</font>');
}

// Autodetect Mafia Relay Browsing
function ac_detectRelay() {
	if (window.location.hostname == '127.0.0.1') {
		isRelay = true;
	} else {
		isRelay = false;
	}
}


function ac_getHash() {
    var charpane = unsafeWindow.top.frames['charpane'];
    var headTag = charpane.document.getElementsByTagName('head')[0]; 
    var pwdIndex = headTag.innerHTML.indexOf("pwdhash =")+11;
    var pwdEnd = headTag.innerHTML.indexOf(";", pwdIndex)-1;
    var pwdhash = headTag.innerHTML.substring(pwdIndex,pwdEnd);
    return pwdhash;
}

// ================================================================================= //
// RESIZE FUNCTIONS ================================================================ //
// ================================================================================= //

function ac_startSlider(event) {

	event.preventDefault();

	var newY = event.pageY;
	ac_sliderPosition = ac_getValue('infoheight');

	ac_dragStartY = newY;
	ac_dragLastY = newY;
	ac_dragInProgress =  true;
	$("#ac_slider").addClass("active");

	document.addEventListener('mousemove', ac_moveSlider, true);
	document.addEventListener('mouseup', ac_stopSlider, true);
	
	return false;

}

function ac_moveSlider(event) {

	event.preventDefault();

	if (ac_dragInProgress) {
		var newY = event.pageY;
		if (newY != ac_dragLastY) {
			var delta = (ac_getValue('infotop') ? (ac_dragStartY - newY) : (newY - ac_dragStartY));
			var newHeight = ac_sliderPosition - (delta);
			if (newHeight <= ac_infoMaxHeight && newHeight >= ac_infoMinHeight) {
				ac_setValue('infoheight', newHeight);
				document.ac_resizePanels();
			}
			ac_dragLastY = newY;
			$("#ac_slider").focus();
		}	
	}
	return false;
}

function ac_stopSlider(event) {
	
	event.preventDefault();

	ac_dragInProgress =  false;

	document.removeEventListener('mousemove', ac_moveSlider, true);
	document.removeEventListener('mouseup', ac_stopSlider, true);
	
	$("#ac_slider").removeClass("active");
	ac_saveOption('infoheight', document.ac_options['infoheight']);
	return false;
	
}

// ================================================================================= //
// AFH CHAT RELAY BOTS ============================================================= //
// ================================================================================= //

function afh_getMemberList() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://alliancefromhell.com/scripts/greasemonkey/tcnames/names.txt',
		onload: function(response) {
			if(JSON && JSON.parse) {
				afhMembers = JSON.parse(response.responseText);
			}
			else {
				afhMembers = eval(response.responseText);
			}
		}
	});
}

function afh_relayChat(line) {

	//AFH Chat Bot Voodoo===================================================
	var bots = /AFHk|AFHobo|AFH/i;
	var botid = /1736458|1736451|1736457/;
	var botid2 = /\(#1736458\)|\(#1736451\)|\(#1736457\)/;
	var reg1 = /[\[\({]/;
	var reg2 = /[\]\)\}]/;
	var tag = '';
	
	var pos = line.indexOf(']</font>');
	if (pos != -1) {
		tag = line.substr(0, pos + 8);
		line = line.replace(tag, '');
	}
	
	if (line.match(bots) && line.match(botid) && line.match(reg1) && line.match(reg2) && !line.match(botid2)) {
		
	
		speaker = line.split(reg1);
		speaker = speaker[1].split(reg2);
		speaker1 = "[" + speaker[0] + "]";
		speaker2 = "(" + speaker[0] + ")";
		speaker3 = "{" + speaker[0] + "}";
		if (line.indexOf(speaker1) != -1) {
			line = line.replace(bots, speaker[0] + " (AFH)");
			line = line.replace(speaker1, "");
		}
		if (line.indexOf(speaker2) != -1) {
			line = line.replace(bots, speaker[0] + " (AFHk)");
			line = line.replace(speaker2, "");
		}
		if (line.indexOf(speaker3) != -1) {
			line = line.replace(bots, speaker[0] + " (AFHobo)");
			line = line.replace(speaker3, "");
		}

		var sender = speaker[0].toLowerCase();
		if (afhMembers.indexOf(sender) != -1) {
			line = line.replace(botid, afhMembers[(afhMembers.indexOf(sender))+1]);
		}

	}

	return tag + line;
}



// ================================================================================= //
// EVENT HANDLERS ================================================================== //
// ================================================================================= //

document.ac_onKeyPress = function (ev) {

	var left = 37;
	var right = 39;
	var up = 38;
	var down = 40;
	
	if (ac_getValue('verticalkeys')) {
		left = 40;
		right = 38;
		up = 39;
		down = 37;
	}

	var goto ='';
	
	//Ctrl-Left/Right switches between chat tabs
	if (ev.ctrlKey && (ev.keyCode == left || ev.keyCode == right)) {
	
		var tabs = $("#ac_toolbar li[id^='ac_tab_']:visible");
		var first = tabs.eq(0).attr("id").replace('ac_tab_', '');
		var last = tabs.eq(tabs.length-1).attr("id").replace('ac_tab_', '');
		var current = document.ac_currentChannel;
		
		if (document.ac_currentTool != "chat") {
			goto = current;
		}  else if (ev.keyCode == left) {
			if (current == first) {
				goto = last;
			} else {
				goto = $("#ac_tab_" + current).prev().attr("id").replace('ac_tab_', '');
			}
		} else if (ev.keyCode == right) {
			if (current == last) {
				goto = first;
			} else {
				goto = $("#ac_tab_" + current).next().attr("id").replace('ac_tab_', '');
			}
		}

		if (goto != current || document.ac_currentTool != "chat") {
			ac_showChannel(goto);
			return false;
		}

	}

	//Ctrl-Up/Down switches between toolbar icons
	if (ev.ctrlKey && (ev.keyCode == up || ev.keyCode == down)) {
	
		var tool = $("#ac_toolbar li[id^='ac_tool_']:visible");
		var first = tool.eq(0).attr("id").replace('ac_tool_', '');
		var last = tool.eq(tool.length-1).attr("id").replace('ac_tool_', '');
		var current = document.ac_currentTool;
		
		if (current == 'chat') {
			goto = last;
		} else if (ev.keyCode == down) {
			if (current == first) {
				goto = last;
			} else {
				goto = $("#ac_tool_" + current).prev().attr("id").replace('ac_tool_', '');
			}
		} else if (ev.keyCode == up) {
			if (current == last) {
				goto = first;
			} else {
				goto = $("#ac_tool_" + current).next().attr("id").replace('ac_tool_', '');
			}
		}

		if (goto != current) {
			if (goto == 'cfg') {
				ac_showConfigPanel();
			} else if (goto == 'cal') {
				ac_showCalendarPanel();
			} else if (goto == 'log') {
				ac_showLogPanel();
			} else if (goto == 'cli') {
				ac_showCLIPanel();
			} else if (goto == 'events') {
				ac_showEventsPanel();
			}
			return false;
		}

	}

	return true;

}

// ================================================================================= //
// ACTIVECHAT!!! =================================================================== //
// ================================================================================= //

//Make parent jQuery Object easily accesible
$ = unsafeWindow.jQuery;
playerID = unsafeWindow.playerid;
playerHash = unsafeWindow.pwdhash;

//Hide Original Chat Window and form
$("#ChatWindow").hide();

//Load Options
ac_detectRelay();
ac_loadOptions();

//Create Components
document.ac_currentTool = "chat";
ac_createStyles();
ac_createTabs();
ac_createPanels();

// Set up event handlers
document.ac_originitsizes = unsafeWindow.initsizes;
unsafeWindow.initsizes = document.ac_resizePanels;
window.addEventListener('keydown', document.ac_onKeyPress, true);

//Create Events Tab, and show it if enabled
document.ac_chats['events'] = '';
document.ac_lastchat['events'] = 'chat';
ac_addChannel('events');
if (ac_getValue('eventstarget') != 'tab') {
	$("#ac_tab_events").hide();
}

// Perform startup chat commands
var aCommands = new Array();
if (ac_getValue('loadchannels')) {
	aCommands.push('/listen');
}
if (ac_getValue('loadplayers')) {
	aCommands.push('/who');
}
if (ac_getValue('loadcontacts')) {
	aCommands.push('/friends');
}
if (ac_getValue('loadclannies')) {
	aCommands.push('/clannies');
}
if (ac_getValue('idleoff') && !isRelay) {
	aCommands.push('/idleoff');
}
if (aCommands.length > 0) {
	startupCycles++;
	sCommand = aCommands.join(" && ");
	ac_submitChat(sCommand, false);
}

// Fetch NO Calendar Info if enabled
if (ac_getValue('showcalendar')) {
	ac_getCalendarInfo();
}

// Get AFH PlayerList if enabled
if (ac_getValue('afhbots')) {
	afh_getMemberList();
}

// Start Chat
$("#graf").focus();
ac_refreshChat();

// Start CLI
ac_startCLI();

/***
} catch (e) { console.debug(e); window.ac_exception = e; } }


function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
			}, false);
	document.body.appendChild(script);
}

addJQuery(main);
***/

// ================================================================================= //
// TODO LIST ======================================================================= //
// ================================================================================= //
