// ==UserScript==
// @name           'Smiley Arena 2' by Discount-Maniac
// @namespace      Discount-Maniac
// @description    The second set of smileys to make you completely expressive like you really are. Contains exclusive DesiDime emoticons as well :)
// @icon           http://i.imgur.com/m6Wzt.png
// @include        http://*.desidime.*/*
// ==/UserScript==


addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += '<img src=\"'+image+'\">';
}

function dip() {
	var smileyarr = new Array();	
	smileyarr["2cents"]="http://cdn0.desidime.com/smileys/2cents.gif";
	smileyarr["2guns"]="http://cdn0.desidime.com/smileys/2guns.gif";
	smileyarr["affirmative"]="http://cdn0.desidime.com/smileys/affirmative.gif";
	smileyarr["agree"]="http://cdn0.desidime.com/smileys/agree.gif";
	smileyarr["angry spin"]="http://cdn0.desidime.com/smileys/angry spin.gif";
	smileyarr["ashamed"]="http://cdn0.desidime.com/smileys/ashamed.gif";
	smileyarr["attacked"]="http://cdn0.desidime.com/smileys/attacked.gif";
	smileyarr["basket ball"]="http://cdn0.desidime.com/smileys/basket ball.gif";
	smileyarr["blasted"]="http://cdn0.desidime.com/smileys/blasted.gif";
	smileyarr["bleh"]="http://cdn0.desidime.com/smileys/bleh.gif";
	smileyarr["blush"]="http://cdn0.desidime.com/smileys/blush.gif";
	smileyarr["brb"]="http://cdn0.desidime.com/smileys/brb.gif";
	smileyarr["buddy"]="http://cdn0.desidime.com/smileys/buddy.gif";
	smileyarr["c ya"]="http://cdn0.desidime.com/smileys/c ya.gif";
	smileyarr["c ya 2"]="http://cdn0.desidime.com/smileys/c ya 2.gif";
	smileyarr["cookie"]="http://cdn0.desidime.com/smileys/cookie.gif";
	smileyarr["cool"]="http://cdn0.desidime.com/smileys/cool.gif";
	smileyarr["cowboy"]="http://cdn0.desidime.com/smileys/cowboy.gif";
	smileyarr["cry"]="http://cdn0.desidime.com/smileys/cry.gif";
	smileyarr["dance"]="http://cdn0.desidime.com/smileys/dance.gif";
	smileyarr["deal"]="http://cdn0.desidime.com/smileys/deal.gif";
	smileyarr["deny"]="http://cdn0.desidime.com/smileys/deny2.gif";
	smileyarr["deserted"]="http://cdn0.desidime.com/smileys/deserted.gif";
	smileyarr["detective"]="http://cdn0.desidime.com/smileys/detective.gif";
	smileyarr["disagree"]="http://cdn0.desidime.com/smileys/disagree.gif";
	smileyarr["hilarious"]="http://cdn0.desidime.com/smileys/hilarious.gif";
	smileyarr["dj"]="http://cdn0.desidime.com/smileys/dj.gif";
	smileyarr["dumb"]="http://cdn0.desidime.com/smileys/dumb.gif";
	smileyarr["exercise"]="http://cdn0.desidime.com/smileys/excercise.gif";
	smileyarr["facepalm"]="http://cdn0.desidime.com/smileys/facepalm.gif";
	smileyarr["furious"]="http://cdn0.desidime.com/smileys/furious.gif";
	smileyarr["fishing"]="http://cdn0.desidime.com/smileys/fishin.gif";
	smileyarr["gone case"]="http://cdn0.desidime.com/smileys/idiot.gif";
	smileyarr["good luck"]="http://cdn0.desidime.com/smileys/good luck.gif";
	smileyarr["gotcha"]="http://cdn0.desidime.com/smileys/gotcha.gif";
	smileyarr["handshake"]="http://cdn0.desidime.com/smileys/handshake.gif";
	smileyarr["hats off"]="http://cdn0.desidime.com/smileys/hats off.gif";
	smileyarr["hello"]="http://cdn0.desidime.com/smileys/hello.gif";
	smileyarr["hi"]="http://cdn0.desidime.com/smileys/hi.gif";
	smileyarr["high 5"]="http://cdn0.desidime.com/smileys/high 5.gif";
	smileyarr["hunter"]="http://cdn0.desidime.com/smileys/hunter.gif";
	smileyarr["invisible"]="http://cdn0.desidime.com/smileys/invisible.gif";
	smileyarr["kill time"]="http://cdn0.desidime.com/smileys/kill time.gif";
	smileyarr["knuppel"]="http://cdn0.desidime.com/smileys/knuppel.gif";
	smileyarr["lauded"]="http://cdn0.desidime.com/smileys/lauded.gif";
	smileyarr["laugh"]="http://cdn0.desidime.com/smileys/laugh.gif";
	smileyarr["nahnahna"]="http://cdn0.desidime.com/smileys/nahnahna.gif";
	smileyarr["no"]="http://cdn0.desidime.com/smileys/no.gif";
	smileyarr["nun-chucks"]="http://cdn0.desidime.com/smileys/nun-chucks.gif";
	smileyarr["oh yes"]="http://cdn0.desidime.com/smileys/oh yes.gif";
	smileyarr["ouch"]="http://cdn0.desidime.com/smileys/ouch.gif";
	smileyarr["painter"]="http://cdn0.desidime.com/smileys/painter.gif";
	smileyarr["peek-a-boo"]="http://cdn0.desidime.com/smileys/peek-a-boo.gif";
	smileyarr["phew"]="http://cdn0.desidime.com/smileys/phew.gif";
	smileyarr["plane"]="http://cdn0.desidime.com/smileys/plane.gif";
	smileyarr["plus one"]="http://cdn0.desidime.com/smileys/plus one.gif";
	smileyarr["point n laugh"]="http://cdn0.desidime.com/smileys/point n laugh.gif";
	smileyarr["popcorn"]="http://cdn0.desidime.com/smileys/popcorn.gif";
	smileyarr["pray"]="http://cdn0.desidime.com/smileys/pray.gif";
	smileyarr["price"]="http://cdn0.desidime.com/smileys/price.gif";
	smileyarr["pull hair"]="http://cdn0.desidime.com/smileys/pullhair.gif";
	smileyarr["read"]="http://cdn0.desidime.com/smileys/read.gif";
	smileyarr["roll ball"]="http://cdn0.desidime.com/smileys/roll ball.gif";
	smileyarr["scared"]="http://cdn0.desidime.com/smileys/scared.gif";
	smileyarr["scary tv"]="http://cdn0.desidime.com/smileys/scary tv.gif";
	smileyarr["shut up"]="http://cdn0.desidime.com/smileys/shut up.gif";
	smileyarr["slaphead"]="http://cdn0.desidime.com/smileys/slaphead.gif";
	smileyarr["smitten"]="http://cdn0.desidime.com/smileys/smitten.gif";
	smileyarr["sneaky"]="http://cdn0.desidime.com/smileys/sneaky.gif";
	smileyarr["stop"]="http://cdn0.desidime.com/smileys/stop.gif";
	smileyarr["suicide"]="http://cdn0.desidime.com/smileys/suicide.gif";
	smileyarr["surfing"]="http://cdn0.desidime.com/smileys/surfing.gif";
	smileyarr["threaten"]="http://cdn0.desidime.com/smileys/threaten.gif";
	smileyarr["toffee"]="http://cdn0.desidime.com/smileys/toffee.gif";
	smileyarr["tooth"]="http://cdn0.desidime.com/smileys/tooth.gif";
	smileyarr["unexpected"]="http://cdn0.desidime.com/smileys/unexpected.gif";
	smileyarr["band"]="http://cdn0.desidime.com/smileys/band.gif";
	smileyarr["bad day"]="http://cdn0.desidime.com/smileys/bad day.gif";
	smileyarr["congrats"]="http://cdn0.desidime.com/smileys/congrats.gif";
	smileyarr["ebay"]="http://cdn0.desidime.com/smileys/ebay.gif";
	smileyarr["wacko"]="http://cdn0.desidime.com/smileys/wacko.gif";
	smileyarr["hang"]="http://cdn0.desidime.com/smileys/hang.gif";
	smileyarr["injured"]="http://cdn0.desidime.com/smileys/injured.gif";
	smileyarr["happy bday"]="http://cdn0.desidime.com/smileys/happy bday.gif";
	smileyarr["LOL"]="http://cdn0.desidime.com/smileys/lol.gif";
	smileyarr["football"]="http://cdn0.desidime.com/smileys/football.gif";
	smileyarr["ROFL"]="http://cdn0.desidime.com/smileys/rofl.gif";
	smileyarr["dead"]="http://cdn0.desidime.com/smileys/dead.gif";
	smileyarr["swing"]="http://cdn0.desidime.com/smileys/swing.gif";
	smileyarr["repost"]="http://cdn0.desidime.com/smileys/repost.gif";
	smileyarr["welcome"]="http://cdn0.desidime.com/smileys/welcome.gif";
	smileyarr["you rock"]="http://cdn0.desidime.com/smileys/you rock.gif";
	smileyarr["DesiDime"]="http://cdn0.desidime.com/smileys/DesiDime.gif";
	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
				
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML='<img src=\"'+smileyarr[title]+'\" title=\"'+title+'\">';
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);


// DM's profile link: http://www.desidime.com/users/2374