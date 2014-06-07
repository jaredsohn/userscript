// ==UserScript==
// @name          [CIS] *chan Improvement javaScript
// @author 	      Praetox
// @namespace     http://praetox.com/n.php/oth/chan
// @description   Assorted improvements to imageboards
// @include       http://*.4chan.org/*.html
// ==/UserScript==

/* --ABOUT--------------------------------------v1.0--
 *        *chan Improvement javaScript (cis.js)
 *       First version finished 2009/01/21 10:00
 * ---------------------------------------------------
 * Released under the GNU General Public License, etc.
 * http://www.gnu.org/licenses/gpl-3.0-standalone.html
 * --ABOUT--------------------------------------------
 */

//////////////////////////////
// CONFIGURATION
//
// Either "4chan" or "BWC"
var imageboard = "4chan";
//
// END OF CONFIGURATION
//////////////////////////////



//Set chan-specific config
var imThDir = "";
var rpIdPre = "";
if (imageboard=="4chan") {
	imThDir = "/thumb/";
	rpIdPre = "";
}
if (imageboard=="BWC") {
	imThDir = "/th/";
	rpIdPre = "r";
}

//Inits the script
ptPrep_tooltip();
ptPrep_imexpand();


/* IMAGE EXPANDER */
var ptImgLst;
function ptPrep_imexpand() {
	var OP = document.getElementsByTagName("blockquote")[0];
	OP.innerHTML += '<br /><a href="javascript:ptAwesome()">Expand all images</a>';
	ptImgLst = ptGetImages(); //prepare on-click handlers, etc
}
function ptAwesome() {
	for (a=0; a<ptImgLst.length; a++) {
		ptToggleImg(a); //toggle all
	}
}
function ptGetImages() {
	var ret = new Array(); var rnum = 0;
	var hrefs = document.getElementsByTagName("a");
	for (a=0; a<hrefs.length; a++) {
		var img = hrefs[a].getElementsByTagName("img")[0];
		if (!img) continue;
		if (img.src.indexOf(imThDir)>0) {
			ret[rnum] = img; //put image in ret
			img.title = rnum; //ptr for click handler
			img.alt = hrefs[a].href; //fullsize url
			hrefs[a].removeAttribute("href"); //lol
			img.onclick = ptToggleImgC; //click handler
			rnum++; //increment image index
		}
	}
	return ret;
}
function ptToggleImg(a) {
	var img = ptImgLst[a]; //too lazy to rewrite rite nao
	var tmp=img.src; img.src=img.alt; img.alt=tmp; //swap
	img.removeAttribute("width"); //full width
	img.removeAttribute("height"); //full height
	img.style.border = "1px solid #000";
	img.style.padding = "2px";
	img.style.background = "#fff";
}
function ptToggleImgC() {
	var a = this.title; //this ptr
	ptToggleImg(a); //toggle me
}

/* TOOLTIP */
var ptTipDiv; //the tooltip
var ptLastRply; //last reply
function ptPrep_tooltip() {
	ptTipDiv = document.createElement('div'); //maek it
	ptTipDiv.setAttribute('class','reply'); //same design as the rest of 4chon
	ptTipDiv.setAttribute('style','position:absolute;'+ //or, then again...
		'display:none;border:2px solid #400;padding:8px'); //maybe not.
	document.body.appendChild(ptTipDiv); //...but add it to the DOM tree
	var hrefs = document.getElementsByClassName("quotelink"); //get links
	for (a=0; a<hrefs.length; a++) { //and iterate all of them
		hrefs[a].onmouseover = ptShowTip; //show
		hrefs[a].onmousemove = ptShowTip; //show
		hrefs[a].onmouseout = ptHideTip; //hide
	}
}
function ptShowTip(e) {
	var id = rpIdPre + this.href.split("#")[1];
	var reply = document.getElementById(id);
	if (!reply&&ptLastRply=="wut" || //not ITT
		(reply&&reply==ptLastRply)) { //viewing
		//Already set the style
		ptMoveTip(e); return;
	}
	if (reply) { //the ref is not null, proceed
		var st = getComputedStyle(reply, ""); //get real size
		var w = st.width.substring(0, st.width.length-2); //width
		var h = st.height.substring(0, st.height.length-2); //height
		var x = e.pageX + 32; //calc horizontal position
		var y = e.pageY - (h/2) - 16; //calc vertical pos
		ptTipDiv.style.top = y + "px"; //set horz
		ptTipDiv.style.left = x + "px"; //set vert
		ptTipDiv.style.width = w + "px"; //set width
		ptTipDiv.style.height = h + "px"; //set height
		ptTipDiv.innerHTML = reply.innerHTML; //apply post
		ptLastRply = reply; //in case user moves mouse
	}else{ //this post is not in the thread... oh snap.
		var x = e.pageX + 32; //calc horizontal pos
		var y = e.pageY - (60/2) - 16; //calc vert pos
		ptTipDiv.style.left = x + "px"; //set horz
		ptTipDiv.style.top = y + "px"; //set vert
		ptTipDiv.style.width = "280px"; //set width
		ptTipDiv.style.height = "60px"; //set height
		ptTipDiv.innerHTML = '<h1 style="color:#f00">Post not ITT</h1>';
		ptLastRply = "wut";
	}
	ptTipDiv.style.display = "block"; //dispay it
}
function ptMoveTip(e) {
	//Let's not waste precious cpu cycles, ne?
	var x = e.pageX + 32; //calc horizontal position
	ptTipDiv.style.left = x; //set horz
}
function ptHideTip() {
	ptTipDiv.style.display = "none"; //hide it
	ptLastRply = null; //clear ref so it's reshown
}
//eof