// ==UserScript==
// @name           Auto Fist!
// @namespace      kol.interface.unfinished
// @description    Plays the Dungeon Fist! mini-game in KoL for you.
// @include        http://*kingdomofloathing.com/choice.php*
// @include        http://*kingdomofloathing.com/arcade.php*
// @include        http://127.0.0.1:*/arcade.php*
// @include        http://127.0.0.1:*/choice.php*
// @version        1.2
// ==/UserScript==

// Version 1.2
// - disable when there's a Finish From Memory button.
// Version 1.1
// - added a button after the game is over that allows you to
//   repeat it automatically a specified number of times.
// - sped it up a bit.
// Version 1.0

function df() {
	var path=['Go West','Fight!', // demons
			  'Go South','Fight!', // ghosts
			  'Go East', // strength potion
			  'Go West',
			  'Go North',
			  'Go East',
			  'Go North','Fight!', // grunts, potion
			  'Go North',
			  'Go North','Fight!', // grunts
			  'Go East', // magic potion
			  'Go East','Fight!', // ghosts
			  'Go South', // shoot the food
			  'Go North',
			  'Go West',
			  'Go West',
			  'Go South',
			  'Go East',
			  'Go South','Fight!', // death
			  'Go East','Fight!', // demons
			  'Go South',
			  'Go South','Use Potion', // ghosts, food
			  'Go North',
			  'Go North',
			  'Go West',
			  'Go South',
			  'Go South', // treasure
			  'Go North',
			  'Go North',
			  'Go North',
			  'Go West',
			  'Go North',
			  'Go West']; // exit
	
	var pwd; // for play-again
	
	function doAction(vars,callback,time) {
		GM_xmlhttpRequest({
				method: "POST",
					url: "http://" + location.host + "/choice.php",
					headers: {"Content-type": "application/x-www-form-urlencoded"},
					data: vars,
					onload: function(response){
					var d = document.getElementById('fistresult');
					if (!d) {
						var p = document.body.firstChild;
						while (p.nextSibling && p.tagName!='CENTER') {
							p = p.nextSibling;
						}
						d = document.createElement('center');
						d.setAttribute('id','fistresult');
						p.parentNode.replaceChild(d,p);
					}
					d.innerHTML = response.responseText;
					if (callback)
						setTimeout(callback,time);
					//location.reload(); 
				}
			});
	}
	
	function press(input,callback,time) {
		input.setAttribute('style','color:red;');
		var f = input.parentNode;
		while (f.tagName!='FORM')
			f = f.parentNode;
		var ps = document.evaluate('.//input',f,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var args = '';
		for (var i=ps.snapshotLength-1;i>=0;i--) {
			var p = ps.snapshotItem(i);
			var n = p.getAttribute('name');
			if (n) {
				if (args)
					args += '&';
				args += n+'='+encodeURI(p.getAttribute('value'));
				if (n=='pwd')
					pwd = p.getAttribute('value'); // save
			}
		}
		doAction(args,callback,time);
	}
	
	function check() {
		var opt = document.evaluate( '//input[@value="Attack!"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		if (opt.singleNodeValue) {
			var snap = document.evaluate( '//b[text()="Dungeon Fist!"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if (snap.singleNodeValue) {
				var r = GM_getValue('repeat',0);
				if (r>0) {
					remaining(r);
				}
			}
			press(opt.singleNodeValue,check,300);
		} else
			process();
	}
	
	function process() {
		var snap = document.evaluate( '//b[text()="Dungeon Fist!"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		var r = GM_getValue('repeat',0);
		if (snap.singleNodeValue) {
			if (r>0) {
				remaining(r);
			}
			var state = getState();
			var opt = document.evaluate( '//p[contains(.,"You drop your token into the Dungeon Fist! machine")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if (opt.singleNodeValue)
				state = 0;
			opt = document.evaluate( '//input[@value="'+path[state]+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if (opt.singleNodeValue) {
				setState(Number(state)+1);
				press(opt.singleNodeValue,(path[state]=='Fight!') ? check : process,300);
			} else {
				GM_log("lost sync");
				setState(0);
			}
		} else {
			snap = document.evaluate( '//p[contains(.,"FINAL SCORE:")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			snap2 = document.evaluate( '//a[contains(.,"Go back to the Game Grid Arcade")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if (snap.singleNodeValue && snap2.singleNodeValue) {
				if (r>0) {
					if (pwd) {
						//GM_log('repeating: '+r);
						GM_setValue('repeat',(r-1));
						window.location.pathname = 'arcade.php?action=game&whichgame=3&pwd='+pwd;
					} else {
						GM_log('lost track of pwd, cannot repeat.');
						GM_setValue('repeat',0);
					}
				} else {
					var b = document.createElement('input');
					b.setAttribute('type','button');
					b.setAttribute('value','Play Again');
					var s = document.createElement('select');
					s.setAttribute('id','playdfagain');
					b.addEventListener('click',doAgain,false);
					for (var i=0;i<20;i++) {
						var option = document.createElement('option');
						option.appendChild(document.createTextNode(String(i+1)));
						option.setAttribute('value',i+1);
						s.appendChild(option);
					}
					var p = snap2.singleNodeValue;
					while (p && p.tagName!='TABLE') 
						p = p.parentNode;
					var tr = document.createElement('tr');
					var t = document.createElement('td');
					var c = document.createElement('center');
					c.appendChild(b);
					c.appendChild(document.createTextNode('\u00A0\u00A0'));
					c.appendChild(s);
					t.appendChild(c);
					tr.appendChild(t);
					p.appendChild(tr);
				}
			} else
				GM_setValue('repeat',0);
		} 
	}
	
	function remaining(r) {
		var rs = document.getElementById('dfrepetition');
		var reps = (r==1) ? ' repetition remaining' : ' repetitions remaining';
		if (!rs) {
			rs = document.createElement('span');
			rs.setAttribute('id','dfrepetition');
			rs.appendChild(document.createTextNode(r+reps)); 
			document.body.appendChild(document.createElement('br')); 
			document.body.appendChild(rs);
		} else {
			rs.replaceChild(document.createTextNode(r+reps),rs.firstChild);
		}
	}
	
	function doAgain() {
		var s = document.getElementById('playdfagain');
		if (s && pwd) {
			var times = s.options[s.options.selectedIndex].value;
			//GM_log('repeating '+times+' times with '+pwd);
			GM_setValue('repeat',(times-1));
			window.location.pathname = 'arcade.php?action=game&whichgame=3&pwd='+pwd;
		}
	}
	
	function getState() {
		var s = GM_getValue('state',0);
		if (s>=path.length) s = 0;
		return s;
	}
	
	function setState(s) {
		GM_setValue('state',s);
	}
	
	check();
}

if (document.evaluate( '//b[text()="Dungeon Fist!"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue &&
    !document.evaluate( '//input[@value="Finish from Memory"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
    df();
} else {
    //if (document.evaluate( '//td[text()="You don\'t have enough time to play a video game.  In fact -- get back to work!"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)
    GM_setValue('repeat',0);
}
