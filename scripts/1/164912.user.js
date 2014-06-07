// ==UserScript==
// @name          F23-youtube
// @description   Obok linka z fimem youtube, bombayTV i vocaroo pojawia się przycisk PLAY
// @include       http://forum.o2.pl/temat.php*
// @author        kocham agnieszkę, anarchiste
// @version       0.3
// ==/UserScript==

/*
 * Changelog:
 * 
 * 0.3 - dodano odtwarzanie z vocaroo
 * 0.2 - dodano odtwarzanie filmów z BombayTV
 * 0.1 - pierwsze wydanie
 */

function addElementAfter(node,oncli,tag,htm)
{
  var ne = document.createElement(tag);
  ne.setAttribute('onclick',oncli);
  if(htm) ne.innerHTML = htm;
  node.parentNode.insertBefore(ne,node.nextSibling);
}

var ahrefs = document.getElementsByTagName("a");

for (i = 0; i < ahrefs.length; i++) {
	var a = ahrefs[i].getAttribute("href");
	if (a != null) {
		if (a.indexOf('youtube.com') != -1) {
			var ind = a.indexOf('v=');
			if (ind != -1) {
				var end = a.indexOf('&',ind);
				if (end != -1) {
					var link_ytb = a.substr((ind + 2),(end-(ind+2)));
				} else {
					var link_ytb = a.substr((ind + 2));
				}
				addElementAfter(ahrefs[i],'this.innerHTML=\'<br/><iframe width="420" height="315" src="http://www.youtube.com/embed/'+link_ytb+'" frameborder="0" allowfullscreen></iframe>\';','span','<span style="color:red;font-weight:bold">&nbsp;PLAY&nbsp;</span>');
			}
		}
		
		if (a.indexOf('youtu.be') != -1) {
			var ind = a.lastIndexOf('/');
			if (ind != -1) {
				var link_ytb = a.substr(ind);
				addElementAfter(ahrefs[i],'this.innerHTML=\'<br/><iframe width="420" height="315" src="http://www.youtube.com/embed/'+link_ytb+'" frameborder="0" allowfullscreen></iframe>\';','span','<span style="color:red;font-weight:bold">&nbsp;PLAY&nbsp;</span>');
				
			}
		}
		
		if (a.indexOf('grapheine.com/bombaytv') != -1) {
			var ind_beg = a.lastIndexOf('-');
			var ind_end = a.lastIndexOf('.html');
			
			if ((ind_beg != -1) && ( ind_end != -1)) {
				var link_btv = a.substr((ind_beg+1),(ind_end - ind_beg-1));
				addElementAfter(ahrefs[i],'this.innerHTML=\'<br/><object width="400" height="370"><param name="movie" value="http://www.grapheine.com/bombaytv/bt.swf?code='+link_btv+'"></param><embed src="http://www.grapheine.com/bombaytv/bt.swf?code='+link_btv+'" type="application/x-shockwave-flash" width="400" height="370" allowScriptAccess="always"></embed></object>\';','span','<span style="color:red;font-weight:bold">&nbsp;PLAY&nbsp;</span>');
				
			}
		}
		
		if (a.indexOf('vocaroo.com') != -1) {
			var ind = a.lastIndexOf('/');
			if (ind != -1) {
				var link_voc = a.substr((ind+1));
				addElementAfter(ahrefs[i],'this.innerHTML=\'<br/><object width="220" height="140"><param name="movie" value="http://vocaroo.com/mediafoo.swf?playMediaID='+link_voc+'&autoplay=1"></param><param name="wmode" value="transparent"></param><embed src="http://vocaroo.com/mediafoo.swf?playMediaID='+link_voc+'&autoplay=1" width="220" height="140" wmode="transparent" type="application/x-shockwave-flash"></embed></object>\';','span','<span style="color:red;font-weight:bold">&nbsp;PLAY&nbsp;</span>');
				
			}
		}
		
		
	}
}
