// ==UserScript==
// @name           FavIcon Yahoo! Mail
// @namespace      http://blog.kodono.info/wordpress/greasemonkey/
// @description    Change la couleur du logo de Yahoo! Mail (en bleu quand nouveaux messages)
// @version        2009103100
// @include        http://*.mail.yahoo.com/*
// ==/UserScript==

window.addEventListener('load', function() {
			instance = new YahooMailFaviconAlerts;
}, true);


function YahooMailFaviconAlerts() {
	var self = this;
	
	this.construct = function() {
		this.head = document.getElementsByTagName("head")[0];
		this.pixelMaps = {};
		
		this.timer = setInterval(this.poll, 500);
		this.poll();
		
		return true;
	}
	
	this.drawUnreadCount = function(unread) {
  	return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAADAFBMVEXO7dw+If8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
           "AAAAAAAAAAAAAAAAAAAAAAMAAAAAAAQAAAAAAAUAAAAAAAYAAAAAAAcAAAAAAAgAAAAAAAkAAAAAAAoAAAAAAAsAAAAAAAwAAAAAAA0AAAAAAA4AAAAAAA8AAAAAABAAAAAAABEAAAAAABIAAAAAABMAAAAAABQAAAAAABUAAAAAABYAAAAAABcAAAAAABgAAAAAABkAAAAAABoAAAAAABsAAAAAABwAAAAAAB0AAAAAAB4AAAAAAB8AAAAAAAAAAAEAAB8AAAEAAAAAAAIAAB8AAAIAAAAAAAMAAB8AAAMAAAAA" +
           "AAQAAB8AAAQAAAAAAAUAAAEAAAUAAAIAAAUAAAMAAAUAAAQAAAUAAAUAAAUAAAYAAAUAAAcAAAUAAAgAAAUAAAkAAAUAAAoAAAUAAAsAAAUAAAwAAAUAAB8AAAUAAA0AAAYAAB8AAAYAAA0ADqAAAEsAAAEAADwCAgMCAgICAgICAgICAgICAgICAgICAgIBBAEBBAEICAkICAgICAgBBAgADugAAfcAAAEAAD0AAAAAAAAAAAEAAAAAAAIAAAAAAAMAAAAAAAQAAAAAAAUAAAAAAAYAAAAAAAcAAAAAAAgAAAAA" +
           "AAkAAAAAAAoAAAAAAAsAAAAAAAwAAAAAAA0AAAAAAA4AAAAAAA8AAAAAABAAAAAAABEAAAAAABIAAAAAABMAAAAAABQAAAAAABUAAAAAABYAAAAAABcAAAAAABgAAAAAABkAAAAAABoAAAAAABsAAAAAABwAAAAAAB0AAACiQHsrAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAFBJREFUeNpjYBgWgBEZkKUArgZdPYiNRQWSAmQzGTE4WAURZqAoRFOBZhmGS9Gci9W/DDgUMBCSR7MUW7iR" +
           "rIABrwKccYJLP1qckqFgFBAAABRZAOFmgibhAAAAAElFTkSuQmCC";
    // nouvelle icône de Yahoo! Mail (le cercle avec un Y dedans et en violet) mais en verte:
    /*return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEXO7dzG5b6NzH5MrS4WiQIr"+
           "jB78/PwHbQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
           "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
           "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
           "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvcfwAAABvcuAAAABvsQAAAABvshwAAABvszgAAABv"+
           "tDAAAABvtogAAABvt3AAAABvuJAAAABvuZwAAABvu3wAAABvvJwAAABvwfAABHQAADMAAAEAACQC"+
           "AgMCAgICAgICAgIBBAEICAgICAgBDAgABKQAATcAAAEAACUAAAAAAAAAAAEAAORzZIBzZIAABWQz"+
           "MjE3NjVCMDlKSEdaV1ZzZKBzZKAABGAAABAAABcAAAAAAAVvTSYAACQAACMAAAAAABN5UyZydOl2"+
           "IGVpdHIAAEQAACcAAAAAABV5JlNydOloIGV6aXJhdG4AAGgAABsAAAAAAAlvUiZpdGEAAG5zZSBz"+
           "ZSAAAERzamxvqvBzaoBvr1xzaqBvhZRzasRvhpxzatxvcfxzavhvcuBzakgAAMQAABsAAAAAAAvp"+
           "RCZlbGEAANwAADMAAAAAACBhJlRlbGwgZWR6IGEgZW50IGVhdmEuLmwAAQwAACMAAAAAABNhZEFl"+
           "dHAnbCBnYW0uLi5zZcxzZcwAAGRzamxvqvBzaoBvr1xzaqBvhZRzasRvhpxzatxvcfxzavhvcuBz"+
           "akhvsQBzaxBvshxza0Bvszhza2BvtDBza3gAAZAAABsAAAAAAAp1JkRxaWwAAagAABsAAAAAAAll"+
           "JlJyZGEAAcAAACcAAAAAABYmZVJyZGEgZWdvdHVpdGEAAeQAACsAAAAAABluJkVyZGFuZW14ZSBp"+
           "cukucnUAAC5zZqyiv7zXAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAF1JREFU"+
           "eNqdj4kNwDAMAsH42X/j4iQTFCmSOb8B/oghK+gwM4G1tS8uoNjNskSDghx1jOHIILA59rIZVPIA"+
           "k/UJeaYWRNu7JcpLHe1Yl/CdMVdnrd5hLtfmS39+9gEfyAIm0QQbtwAAAABJRU5ErkJggg==";*/
 	}
	this.getIcon = function() {
		/*return  "/favicon.ico";*/
	 // on utilise l'ancienne favicon de Yahoo (le Y! rouge) au lieu de la nouvelle
	 return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBI"+
          "WXMAAABIAAAASABGyWs+AAAAz0lEQVRIx+1TQRLDIAjEfgx9Gfgy8GX2wDBMjEYPnemh3UNIkMCy"+
          "AsAf30bv9jy1IoiI9vUJJBERkd4BVFUBcq611ghQdUtEFH5mf7vGj1BFRATIeTxhjhwXRYzQXYF5"+
          "50TmD4XMIpolIiKaKRn6L67mmch4HoWvRI3CPY8T3N7Rmshz4fh/rpArczwsY6Lo5Hkod/GvYwaQ"+
          "832QzDvzO8YhZF4M31p6v8O5Ar6WHj92vlvbtCPAXEope8K+rq0BAKTkhZlbay3854r/8St4A+Wy"+
          "MUjZ5QemAAAAAElFTkSuQmCC"
	}	
	this.getUnreadCount = function() {
  	var cnt = document.getElementsByClassName("folderCount");
  	if (cnt.length>0 && cnt[0].previousSibling && cnt[0].previousSibling.previousSibling && cnt[0].previousSibling.previousSibling.innerHTML=="Boîte de réception")
  	  return cnt[0].innerHTML.replace(/\(/,"").replace(/\)/,"");
		return false;
	}
	this.getUnreadCountIcon = function() {
		var unread = self.getUnreadCount();		
		return self.drawUnreadCount(unread);
	}
	this.poll = function() {
		if(self.getUnreadCount()) {
			self.setIcon(self.getUnreadCountIcon());
		} else {
			self.setIcon(self.getIcon());
		}
	}
	
	this.setIcon = function(icon) {
		var links = self.head.getElementsByTagName("link");
		for (var i = 0; i < links.length; i++)
			if (links[i].type == "image/x-icon" && 
			   (links[i].rel == "shortcut icon" || links[i].rel=="icon") &&
			   links[i].href != icon)
				self.head.removeChild(links[i]);
			else if(links[i].href == icon)
				return;

		var newIcon = document.createElement("link");
		newIcon.type = "image/x-icon";
		newIcon.rel = "shortcut icon";
		newIcon.href = icon;
		return self.head.appendChild(newIcon);
	}
	
	this.toString = function() { return '[object YahooMailFaviconAlerts]'; }
	
	return this.construct();
}