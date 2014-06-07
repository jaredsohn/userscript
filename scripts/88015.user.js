// ==UserScript==
// @name           F365 Toolbar
// @namespace      http://f365.com/
// @include        http://forum.football365.com/*
// @exclude        http://forum.football365.com/boss.htm
// @exclude        http://forum.football365.com/index.php?t=smladd
// ==/UserScript==


var s = '#smilies img {float:left;} #nav, #nav ul {padding: 0;margin: 0;list-style: none;line-height: 1; }#nav ul {border: 1px solid #ccc;}#nav a {display: block; padding: 5px; width: 10em;}#nav li {float: left;width: 10em;}#nav li ul {position: absolute;background: white;width: 10em;left: -999em;}#nav li ul ul {margin: -1em 0 0 10em;}#nav li:hover ul ul, #nav li:hover ul ul ul, #nav li.sfhover ul ul, #nav li.sfhover ul ul ul {left: -999em;}#nav li:hover ul, #nav li li:hover ul, #nav li li li:hover ul, #nav li.sfhover ul, #nav li li.sfhover ul, #nav li li li.sfhover ul {left: auto;}';
var scr = '\
function writeSmiley(smiley)\
{\
  var textField =document.getElementById(\'txtb\');\
  \
  if(textField)\
  {\
    if(document.selection)\
    {\
      textField.focus();\
      var sel =document.selection.createRange();\
      sel.text = smiley;\
    }\
    else if(textField.selectionStart || textField.selectionStart == 0)\
    {\
      var startPos = textField.selectionStart;\
      var endPos = textField.selectionEnd;\
      textField.value = textField.value.substring(0, startPos) + smiley + textField.value.substring(endPos, textField.value.length);\
    }\
    else\
    {\
      textField.value += smiley;\
    }\
  }\
}\
\
function goToLastPage()\
{\
  var baseUrl = \'http://forum.football365.com/index.php?t=msg\';  \
  var spans = document.getElementsByTagName("span");\
  var threadID;\
  var pages;\
  var startPost;\
  \
  for(var i = 0; i < spans.length; i++)\
  {\
  	if(spans[i].getAttribute("class") == "SmallText fb")\
	{\
	  var pageStart = spans[i].innerHTML.indexOf("Pages (") + "Pages (".length;\
	  var pageEnd = spans[i].innerHTML.indexOf(")");\
	  pages = parseInt(spans[i].innerHTML.substring(pageStart, pageEnd));\
	  startPost = (pages - 1) * 40;\
	  \
	  var links = spans[i].getElementsByTagName("a");\
	  \
	  for(var j = 0; j < links.length; j++)\
	  {\
	  	if(links[j].getAttribute("href").indexOf("&th=") != -1)\
		{\
		  var startPos = links[j].getAttribute("href").indexOf("&th=");\
		  var endPos = links[j].getAttribute("href").indexOf("&", startPos + 4);\
		  threadID = links[j].getAttribute("href").substring(startPos, endPos);\
		  break;\
		}\
	  }\
	  \
	  break;\
	}\
  }\
  \
  if (threadID && startPost) \
  {\
         document.location = baseUrl + threadID + \'&start=\' + startPost;\
  }\
}';


var cssnode = document.createTextNode(s);
var css=document.createElement('style');
css.type='text/css';

css.appendChild(cssnode);

document.getElementsByTagName('head')[0].appendChild(css);


var script=document.createElement('script');
script.type='text/javascript';
script.innerHTML = scr;

document.getElementsByTagName('head')[0].appendChild(script);



sfHover = function() {
	var sfEls = document.getElementById("nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);



document.body.style.paddingTop = '20px';

var bar = document.createElement('div');                                                                                                                                                                                                                                          
bar.style.position = 'fixed';
bar.style.top = '0px';
bar.style.padding = '10px';

bar.style.width = '100%';
bar.style.backgroundColor = '#ffffff';

// forum menu
var menu = '<ul id="nav">\
	<li>\
		<a href="#">F365 Forum</a>\
		<ul>\
			<li><a href="http://forum.football365.com/index.php?t=thread&frm_id=2">Forum Home</a></li>\
			<li><a href="http://forum.football365.com/index.php?t=msg&th=165816&start=0">Forum Index</a></li>\
			<li><a href="http://forum.football365.com/index.php?t=uc&">User Control Panel</a></li>\
			<li><a href="http://www.football365.com/">F365 Home</a></li>\
		</ul>\
	</li>\
	<li><a href="http://forum.football365.com/boss.htm">Look Busy!</a></li>\
	<li>\
		<a href="#">Smilies</a>\
		<ul>\
		  <li><a href="#">Smilies</a>\
			<ul id="smilies">\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_redface.gif" /><a href="#" onclick="writeSmiley(\' :blush: \')">Blush</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_razz.gif" /><a href="#" onclick="writeSmiley(\' :p \')">Tongue</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_mad.gif" /><a href="#" onclick="writeSmiley(\' :x \')">Angry</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_lol.gif" /><a href="#" onclick="writeSmiley(\' :lol: \')">Laughing</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_cool.gif" /><a href="#" onclick="writeSmiley(\' 8) \')">Cool</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_confused.gif" /><a href="#" onclick="writeSmiley(\' :? \')">Confused</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_eek.gif" /><a href="#" onclick="writeSmiley(\' 8o \')">Shocked</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_surprised.gif" /><a href="#" onclick="writeSmiley(\' :o \')">Big Happy</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_sad.gif" /><a href="#" onclick="writeSmiley(\' :( \')">Sad</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_smile.gif" /><a href="#" onclick="writeSmiley(\' :) \')">Happy</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_biggrin.gif" /><a href="#" onclick="writeSmiley(\' :d \')">Big Grin</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_cry.gif" /><a href="#" onclick="writeSmiley(\' :cry: \')">Cry</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_evil.gif" /><a href="#" onclick="writeSmiley(\' :evil: \')">Evil</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/scared.gif" /><a href="#" onclick="writeSmiley(\' :scared: \')">Scared</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_twisted.gif" /><a href="#" onclick="writeSmiley(\' :twisted: \')">Twisted</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_rolleyes.gif" /><a href="#" onclick="writeSmiley(\' :roll: \')">Roll-Eyes</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_wink.gif" /><a href="#" onclick="writeSmiley(\' ;) \')">Wink</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_neutral.gif" /><a href="#" onclick="writeSmiley(\' :| \')">Neutral</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_dead.gif" /><a href="#" onclick="writeSmiley(\' x( \')">Dead</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_frown.gif" /><a href="#" onclick="writeSmiley(\' :frown: \')">Frown</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/nodding.gif" /><a href="#" onclick="writeSmiley(\' :nod: \')">Nod</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/shakey.gif" /><a href="#" onclick="writeSmiley(\' :shakey: \')">Shake</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_proud.gif" /><a href="#" onclick="writeSmiley(\' :proud: \')">Proud</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_smug.gif" /><a href="#" onclick="writeSmiley(\' :smug: \')">Smug</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_uhoh.gif" /><a href="#" onclick="writeSmiley(\' :uhoh: \')">Uh-Oh</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/icon_yawn.gif" /><a href="#" onclick="writeSmiley(\' :yawn: \')">Yawn</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/1.gif" /><a href="#" onclick="writeSmiley(\' :sulk: \')">Sulk</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/5.gif" /><a href="#" onclick="writeSmiley(\' :toppa: \')">Toppa</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/6.gif" /><a href="#" onclick="writeSmiley(\' :bun: \')">Bunny</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/spaz.gif" /><a href="#" onclick="writeSmiley(\' :spaz: \')">Spaz</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/wave_smiley.gif" /><a href="#" onclick="writeSmiley(\' :wave: \')">Wave</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/rix855.gif" /><a href="#" onclick="writeSmiley(\'  :facepalm : \')">Facepalm</a></li>\
	          <li><img src="http://forum.football365.com/images/smiley_icons/post-5758-1225601204.gif" /><a href="#" onclick="writeSmiley(\'  :picard : \')">Picard</a></li>\
	      </ul>\
		</li>\
		<li><a href="#">Graphics</a>\
	      <ul> \
	          <li><a href="#" onclick="writeSmiley(\' :?: \')">Question</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :badger: \')">Badger</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :arrow: \')">Arrow</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :thumbup: \')">Thumbs Up</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :thumbdown: \')">Thumbs Down</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :banana: \')">Banana</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :adore: \')">Adore</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :ninja: \')">Ninja</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :bananahat: \')">Banana Hat</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :bananajump: \')">Banana Jump</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :bananaskip: \')">Banana Skip</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :llama: \')">Banana Llama</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :hitit: \')">I\'d Hit It</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :poundit: \')">Poundit</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :bananagroove: \')">Banana Groove</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :dance: \')">Dance</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :rule1: \')">Rule 1</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :admin: \')">Admin Power</a></li>\
	          <li><a href="#" onclick="writeSmiley(\' :hunt: \')">Witch-hunt</a></li>\
	      </ul>\
	      </li>\
	      <li><a href="#">Football</a>\
	      <ul>\
	          <li><a href="#" onclick="writeSmiley(\' :fergie: \')">Fergie Anti-Climax</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/q6un2eqa3q0n163kmxs.gif[/img]\\n\')">Matt Le Tissier Shock</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/4vx5cnlc1uqhfgnoh26.gif[/img]\\n\')">Benitez Wizard</a></li>\
	      </ul>\
			</li>\
			<li><a href="#">LOLcat-style</a>\
	      <ul>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/wbqqz1hmbw31dyuzc14z.jpg[/img]\\n\')">Has Stick, Is Perfect Day</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/c3c3bhskd4ie6teccpus.jpg[/img]\\n\')">Ceiling Cat</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/4j3u263wzx6j9q9v27bv.jpg[/img]\\n\')">F**k You, I\'m an Anteater</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/98z46g6i0ivt9jqikhw7.jpg[/img]\\n\')">This is relevant to my interests</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/if79nrdqxvylhqbyffr8.jpg[/img]\\n\')">I will wank over this later</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/sl8my3pmef365jizcpae.jpg[/img]\\n\')">What you did there, I see it</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/dnvmttczehc8ajeuk0cn.jpg[/img]\\n\')">May I present to you the ocean</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/5gwlaxb7nbnc1ho6kqbd.jpg[/img]\\n\')">This is Fluffy, destroyer of worlds</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/2rob72a67shsl8wfrf14.jpg[/img]\\n\')">Picard WTF</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/btean9wgblp0yzf9f26.gif[/img]\\n\')">Baby O RLY</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/dolphinhitnozp.gif[/img]\\n\')">Dolphin Hit</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/fuuuuuhppt.gif[/img]\\n\')">Fuuuu</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/kittenslapvqsz.gif[/img]\\n\')">Kitten Slap</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/kramerdancetsor.gif[/img]\\n\')">Kramer Dance</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/puppyrapeaqkh.gif[/img]\\n\')">Puppy Rape</a></
	      </ul>\
			</li>\
			<li><a href="#">Other</a>\
	      <ul>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/6t8d3wace8r0qekm4mk.jpg[/img]\\n\')">Ted Bates Statue</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/nkcs0m6avc9xocslh4hn.jpg[/img]\\n\')">WOF</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/4o9vq0jva2h736e5l5xj.jpg[/img]\\n\')">Forum Coat</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.awooga.org/images/be0tx5d7o9qhcg7nu7.gif[/img]\\n\')">Trish Attic with Paddle</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/fags2o06.jpg[/img]\\n\')">1 in 3 Fags</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/fengapapit7pps.jpg[/img]\\n\')">Fenga Papit</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/imagiraffeqofx.jpg[/img]\\n\')">Look at this duck</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/pow-right-in-the-kissepr2n.jpg[/img]\\n\')">POW! Right in the kisser</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/mjffurtp2.jpg[/img]\\n\')">Michael J. Fox Fuuuuu</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/whos_awesomens9j.jpg[/img]\\n\')">Who's Awesome</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/wwf5tr5.jpg[/img]\\n\')">WWF Panda Wrestle</a></li>\
	          <li><a href="#" onclick="writeSmiley(\'\\n[img]http://www.abload.de/img/sheep7o1d.gif[/img]\\n\')">Sheep</a></li>\ 
	      </ul>\
			</li>\
		</ul>\
	</li>\
	<li><a href="#" onclick="goToLastPage();">Last page</a></li>\
</ul>';

document.body.appendChild(bar);


bar.innerHTML += menu;