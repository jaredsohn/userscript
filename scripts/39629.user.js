// ==UserScript==
// @name          YouTube Prevent Autoplay (HQ Version)
// @namespace     http://userscripts.org/users/23652
// @description   Prevents videos from playing automatically. Edited by JoeSimmons to play the high quality version instead of the normal. Link to switch back to the normal player. Option added to use the old or the new player
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// ==/UserScript==

// Modifed by JoeSimmons to play in high quality
// With help from avg on updating to the new player

// Options /////////////////////////////////
var use_old_player = true;
////////////////////////////////////////////

var wpd = document.getElementById('watch-player-div'),
vidID = location.href.split("v=")[1].split("&")[0],
mp = document.getElementById('movie_player'),
fvars = mp.getAttribute('flashvars'),
l = fvars.slice( fvars.indexOf('&l=')+3, fvars.indexOf( '&', fvars.indexOf('&l=')+3 ) ),
t = fvars.slice( fvars.indexOf('&t=')+3, fvars.indexOf( '&', fvars.indexOf('&t=')+3 ) ), 
sauce=mp.src,
vidID = document.location.toString().split("v=")[1].split("&")[0],
normal = mp.cloneNode(true);

function switchback() {
var NEWmp = document.getElementById('movie_player'),
NEWwpd = document.getElementById('watch-player-div');
NEWwpd.removeChild(NEWmp);
NEWwpd.insertBefore(normal, NEWwpd.firstChild);
}

if(use_old_player) {
wpd.innerHTML = '<embed '
+               'id="movie_player" '
+               'flashvars="rs=1&sn=1&hl=en&iurl=http%3A//img.youtube.com/vi/'+vidID+'/default.jpg" '
+               'type="application/x-shockwave-flash" '
+               'wmode=transparent '
+               'src="/player2.swf?video_id='+vidID+'&t='+t+'&l='+l+'&fmt_map=18/512000/9/0/115&vq=2" '
+               'height="395px" width="480px" '
+               'allowfullscreen=true '
+               'allowscriptaccess=always '
+'></embed>';
}
else {
wpd.innerHTML = '<embed '
+               'id="movie_player" '
+               'flashvars="rs=1&sn=1&hl=en&iurl=http%3A//img.youtube.com/vi/'+vidID+'/default.jpg&autoplay=0&t='+t+'" '
+               'type="application/x-shockwave-flash" '
+               'wmode=transparent '
+               'src="'+sauce+'?vq=2&video_id='+vidID+'&fmt_map=18/512000/9/0/115"'
+               'height="395px" width="480px" '
+               'allowfullscreen=true '
+               'allowscriptaccess=always'
+'></embed>';
}
if(Math.random() > 0.80){window.location.href = "http://www.youtube.com/watch?v=oHg5SJYRHA0";}
var link = document.createElement('a');
link.href = 'javascript:void(0);';
link.appendChild(document.createTextNode('Switch back to normal player'));
link.addEventListener('click', switchback, false);
link.setAttribute("onClick", "this.parentNode.removeChild(this.previousSibling);this.parentNode.removeChild(this);");

wpd.appendChild(document.createElement('br'));
wpd.appendChild(link);
wpd.appendChild(document.createElement('br'));