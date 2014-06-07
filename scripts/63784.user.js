// ==UserScript==
// @name                eJahan travel
// @description	        Podróż 4x za 1 kliknięciem
// @include		http://www.ejahan.com/profile--move.html
// @include		http://ejahan.com/profile--move.html
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

url = "http://www.ejahan.com/profile--move.html";
// Main
function letsJQuery() {
$(document).ready(function(){

$("#buttons").parent().after("<a id=\"travel\">Travel 4 times</a>");

$("#travel").click(function(){

window.setTimeout(function() {
				GM_xmlhttpRequest({
				method: "POST",
				url: url,
				headers:{
				'Host': 'www.ejahan.com',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'pl,en-us;q=0.7,en;q=0.3',
				'Accept-Encoding': 'gzip,deflate',
				'Accept-Charset': 'ISO-8859-2,utf-8;q=0.7,*;q=0.7',
				'Keep-Alive': '300',
				'Connection': 'keep-alive',
				'Referer': 'http://www.ejahan.com/profile--move.html',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
				'Pragma': 'no-cache',
				'Content-Encoding': 'gzip',
				},
				data: "ticket=2&CountryID=7&RegionID=114&subtravel=1" // tu sprawdza, które opcje są zaznaczone w formularzu i wkleja do stringu
				})},0);
				
window.setTimeout(function() {
				GM_xmlhttpRequest({
				method: "POST",
				url: url,
				headers:{
				'Host': 'www.ejahan.com',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'pl,en-us;q=0.7,en;q=0.3',
				'Accept-Encoding': 'gzip,deflate',
				'Accept-Charset': 'ISO-8859-2,utf-8;q=0.7,*;q=0.7',
				'Keep-Alive': '300',
				'Connection': 'keep-alive',
				'Referer': 'http://www.ejahan.com/profile--move.html',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
				'Pragma': 'no-cache',
				'Content-Encoding': 'gzip',
				},
				data: "ticket=2&CountryID=7&RegionID=111&subtravel=1" // tu sprawdza, które opcje są zaznaczone w formularzu i wkleja do stringu
				})},0);
				
window.setTimeout(function() {
				GM_xmlhttpRequest({
				method: "POST",
				url: url,
				headers:{
				'Host': 'www.ejahan.com',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'pl,en-us;q=0.7,en;q=0.3',
				'Accept-Encoding': 'gzip,deflate',
				'Accept-Charset': 'ISO-8859-2,utf-8;q=0.7,*;q=0.7',
				'Keep-Alive': '300',
				'Connection': 'keep-alive',
				'Referer': 'http://www.ejahan.com/profile--move.html',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
				'Pragma': 'no-cache',
				'Content-Encoding': 'gzip',
				},
				data: "ticket=2&CountryID=7&RegionID=114&subtravel=1" // tu sprawdza, które opcje są zaznaczone w formularzu i wkleja do stringu
				})},0);
				
window.setTimeout(function() {
				GM_xmlhttpRequest({
				method: "POST",
				url: url,
				headers:{
				'Host': 'www.ejahan.com',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'pl,en-us;q=0.7,en;q=0.3',
				'Accept-Encoding': 'gzip,deflate',
				'Accept-Charset': 'ISO-8859-2,utf-8;q=0.7,*;q=0.7',
				'Keep-Alive': '300',
				'Connection': 'keep-alive',
				'Referer': 'http://www.ejahan.com/profile--move.html',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
				'Pragma': 'no-cache',
				'Content-Encoding': 'gzip',
				},
				data: "ticket=2&CountryID=7&RegionID=115&subtravel=1" // tu sprawdza, które opcje są zaznaczone w formularzu i wkleja do stringu
				})},0);
				
				});
				
				});}