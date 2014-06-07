// ==UserScript==
// @name           CPAN and meta::cpan interlinks
// @namespace      http://www.clipland.com/
// @description    Add CPAN links to meta::cpan and vice-versa
// @version        0.2
// @author         clipland
// @license        GNU GPL License
// @grant          none
// @include        https://metacpan.org/pod/*
// @include        https://metacpan.org/release/*
// @include        http://search.cpan.org/*
// @updateURL      https://userscripts.org/scripts/source/186311.meta.js
// @downloadURL    https://userscripts.org/scripts/source/186311.user.js
// ==/UserScript==

/*
 * This file is a part of "CPAN and meta::cpan interlinks", which has been
 * placed under the GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
 *
 * Copyright (c) 2013, Clipland GmbH
 *
 * For brevity, the full license is omitted here but can be obtained at:
 * http://www.gnu.org/licenses/gpl.txt
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 */

if( location.href.match(/metacpan/) ){
    var h = document.getElementsByClassName('nav-header');
	for(var i=0;i<h.length;i++){
		if(h[i].innerHTML.match(/S.C.O/)){
            h[i].innerHTML = 'CPAN';
		}
	}
}else{
	var div = document.getElementsByClassName("noprint")[1];
	var elem = document.getElementById("permalink").nextElementSibling.nextElementSibling.innerHTML.split('-');
	elem.pop();
	var name = elem.join("::");
	div.innerHTML += "<br style=\"clear:both;\"><p style=\"text-align: right;\"><a href=\"https://metacpan.org/pod/" + name +"\">meta::cpan</a></p>";
}
