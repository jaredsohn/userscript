// ==UserScript==
// @name           Vine Video Download
// @namespace      http://www.lumerias.com/
// @description    Download videos from Twitter's Vine.co short video app.
// @version        1.2
// @author         lumerias
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABolJREFUWMPtV1lMVVcUtUlNtGlTk1Zr7I8f/Wo/2qZJEztgTBoFRGRWmUEGmScZ9DGoQKGAPFRQEMQnRYhMYrWOZZ4RmdECZZKx8BgEHojCXd37pJqmiUUQmzTpTU4g95531t5rr7X3vatW/Vevu3fvvmNjY7NNS0vLTUdHJ+PAgQPl7u7ujTExMZqvDfTcuXNvJiYmbiTgaxoaGiBwuLq6Sj4+PvD19UVAQICUlJSE6OjoT1YcfP/+/SFbtmwZ3LNnDxwdHeHi4gLKGjt37oS/vz/S09NhbGzMQSA8PLx1RUCzsrI2bNu27YKDg8Mc0Qs/Pz94enrCwMAAnHVycjKqqqpA5UBxcTHi4+Ph4eEhnT9/Hurq6h8vG9jJyWmtra2tPy3k5uYiKChIZEzUw9raGgUFBaipqUF1dTVu374tnl+5ckXc09PTQ1paGkxMTI4sC/zUqVMfENAk1REymUw6ePAgjIyMuNYi29raWjQ2NqK5ufn5amhoEPc5oIyMDMFCZGRk/pLBSVhfampqzgcGBgqqLS0twXTm5eUJEF73799He3s7Ojs7ny+FQoH8/Hyxt6ioSDBFAYwuCdzNze2LHTt2iKy9vLxEjSsqKlBaWirKkJ2djQcPHqCrqwv9/f0YGBgQq6mpCT0PH2JkZARnzpxBeXm5KNPRo0dB15qXAjczM3uPxDbt7OwssdAoGMEAU86La1tfX4+WlhYMDg5idHQUY2NjApSp/+lyJuwtDJFGTmBBUv0RHBwM0pLVouCU6WYCf2JhYQF7e3twzVnx/D8fzgfW1dUJxXP2lZWVmJychEqlwtTUFHp7exER8QNSLiiEC3g/l4CsCDU1tR8XDYCAM01NTSVzc3Ow6hmcBUes4N69eyJ7VjWDNja1iLLMzc1hdnZW3GM22traRO25HMzYnwmwgAcXDYDqXb13715wANRsBP1MITeZ1NRUEURKSgqGh4dhrfUpTsfFoqOjA+Pj41AqlRgaGhLMcHl4L2uAE6EzpJCQECXpZfViDDjHxcWJjDkA0gGot4vWSnYSDLD6jx07hqzsHJBNRTDPRNjT04PW1laxh+mPjY2FoaGh6I505qVFGYiIiFhrZWXFjUbi2lHXExTyPQ6orKxMHMyLHcF0d3d3o6+vT4iQZoOwJveGqKgoMJsUvEQBD7y0BYluS/Y+24fFx5lzSTgQth/TyuJjUTL9HCQLjrN9Rjvv1dXVlfgcsmDv+vXrNy2pD1CdR9gJXD+yjwiG+wEPHwZgkZWUlAgRsit4FRYWgsYvtm/fDjs7O4n1o62tXbCsFrxr164yaiQSa4EOE42IRy5r4uzZs6Ib8uI5wMAsUnKP+MvB8iSk3+otewBRpkbUPplGcTCzwFQzC2xLnnY5OTmCIWaKn/GAMjY2we7duy9TA9v4yuOXssmSy+XCAZSVxNnxIGI9MCCxJN4FWCcstgMm2giSeY/RNLzo7e39+Yq8A1DH20SH51MAk8TEAoMyI+wKzpyoXti5SweRUZGQhxyEh4M1ouVy6fjx4zh06NCGF7Z7c6u3tbU11qUoEvRDjgSE2dg7rvvHQEJDQ1fv27dvE2ngtL6+/jwxMWNvZxcSEROfntc4jo5BFVSPF8gFtQiKL8e1kg5s3frNCFnZnyz7/l/Pkh2WeXX3j86WN/cuJMqDMXQnAi23FU9l3m5Lf2cIlafc+LlyQmrofITx6TlINPJyL+cs7Hf02W1j765NbOmSTr49efLk1zQPvqJu6Frf2IxepUoqqldCfrEG4d6WFeZGOq70bOllc5eFKrLKJ1DUoMTD4RlMqp5idu4pT79f/r6XmtRbt27dmp2bh9Q5OIOCJqXkG5qseiWNpKYkbT4cdQmXivtR2jKG3/qnoJx4jN9HJ6SbN2/Nx5yIKQwLCyumgApIzKpHj6YwQs9r2iaguNEOAxNr9Vd3i4vnd0dOXsOlwlHperUSdR0TGBh7TGzMizWheoKn8xIWFhbQ1z8otfZN4mpZH6wdPIJX7DXdztr4M5dDx0v9oq/iRs0oqh6Mo6VnGnXtEygjZjqHpjH7+An6lCpUtc1IgRGKcbWP3n1jxb8XPA9/H+0fXz2dcLULVyqUyC4bwoU7/bhWpcTdX8dRSYElZJbD1ERX67V9MVF/WOPtJ9M3cwro9T6Rj8jLA0i42i3lVowgo2REcvKNvP6vfTMGeVp8aGXrpm7jdiTUwSe62NYjLNPM1HDjqv+vF1x/AE0+SV6N1SY3AAAAAElFTkSuQmCC
// @license        GNU GPL License
// @grant          none
// @updateURL      https://userscripts.org/scripts/source/164590.user.js
// @include        http://vine.co/v/*
// @include        https://vine.co/v/*
// @include        http://www.vine.co/v/*
// @include        https://www.vine.co/v/*
// @include        https://userscripts.org/scripts/source/164590.meta.js
// ==/UserScript==

/*
 * This file is a part of Vine Video Download, which has been placed under
 * the GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007
 *
 * Copyright (c) 2013,2014, Lumerias.com / Clipland GmbH
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

var meta_video = get_meta('twitter:player:stream');

if(meta_video){
	var url = meta_video.split("?")[0];

	add_html(
		"<a href=\"" + url +"\">Download this Vine</a>"
		+"<br><a href=\"http://www.lumerias.com/downloadvideos?url="+ encodeURIComponent(url) +"&context="+ encodeURIComponent(location.href) +"\">Download, and tell Lumerias</a>"
                +" <a href=\"http://www.lumerias.com/downloadvideos#why\" style=\"color: #aaa;\">(why?)</a>"
                + "</div>"
	);
}else{
	add_html(
		"<span style=\"color: #aaa;\">"
		+"Vine Download didn't work."
		+ "</span>"
	);
}

function add_html(string) {
    var div = document.getElementsByTagName("body")[0];
    div.innerHTML += "<div style=\"position:absolute; top:7px; right:100px; z-index:1999; padding: 10px; border: 2px solid #ccc; border-radius: 15px; font-size: 0.7em;\">" + string + "</div>";
}


function get_meta(key) {
	var metas = document.getElementsByTagName('meta');

	for (i=0; i<metas.length; i++){
		if (metas[i].getAttribute("property") == key){
			return metas[i].getAttribute("content");
		}
	}

	return '';
} 