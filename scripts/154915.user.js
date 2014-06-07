// ==UserScript==
// @name        Reddit: Direct image links
// @version     3.0
// @include     http://www.reddit.com/*
// ==/UserScript==

var links = document.evaluate('//p//a[@href]', document, null, 6, null);

for (var i = 0; i < links.snapshotLength; i ++) {

    var snap = links.snapshotItem(i);
	
    if (snap.href.match(/http:\/\/(www\.)?imgur\.com\/(.+)/) && snap.href.indexOf("/a/") == -1 && snap.href.indexOf("gallery") == -1 && snap.href.indexOf("blog") == -1 && snap.href.indexOf(".jpg") == -1 && snap.href.indexOf(".png") == -1 && snap.href.indexOf(".gif") == -1 && snap.href.indexOf(".jpeg") == -1 && snap.href.indexOf(",") == -1) {
        if (snap.href.indexOf("/r/") != -1) {
            if (snap.href.match(/r\/.*?\/{1}/)) {
                snap.href = snap.href.replace(/r\/[a-zA-Z-0-9]*.{1}/, "");
                var id = snap.href.substr(17);
                snap.href = "http://i.imgur.com/"+id+".jpg";
            }
        }
        else {
            var id = snap.href.substr(17);
            snap.href = "http://i.imgur.com/"+id+".jpg";
        }
    }
	
	else if (snap.href.match(/http:\/\/(www\.)?quickmeme\.com\/meme\/(.+)/) && snap.href.indexOf(".jpg") == -1 && snap.href.indexOf(".png") == -1 && snap.href.indexOf(".gif") == -1 && snap.href.indexOf(".jpeg") == -1) {	
			var id = snap.href.substr(30).slice(0, - 1);
            snap.href = "http://i.qkme.me/"+id+".jpg";
	}
	
	else if (snap.href.match(/http:\/\/m.quickmeme\.com\/meme\/(.+)/) && snap.href.indexOf(".jpg") == -1 && snap.href.indexOf(".png") == -1 && snap.href.indexOf(".gif") == -1 && snap.href.indexOf(".jpeg") == -1) {	
			var id = snap.href.substr(28).slice(0, - 1);
            snap.href = "http://i.qkme.me/"+id+".jpg";
	}
	
	else if (snap.href.match(/http:\/\/(www\.)?qkme\.me\/(.+)/) && snap.href.indexOf("id=") == -1 && snap.href.indexOf(".jpg") == -1 && snap.href.indexOf(".png") == -1 && snap.href.indexOf(".gif") == -1 && snap.href.indexOf(".jpeg") == -1) {
			var id = snap.href.substr(15);
            snap.href = "http://i.qkme.me/"+id+".jpg";
	}
	
	else if (snap.href.match(/http:\/\/(www\.)?qkme\.me\/(.+)/) && snap.href.indexOf("id=") != -1 && snap.href.indexOf(".jpg") == -1 && snap.href.indexOf(".png") == -1 && snap.href.indexOf(".gif") == -1 && snap.href.indexOf(".jpeg") == -1) {
			var id = snap.href.substr(15).slice(0, - 13);
            snap.href = "http://i.qkme.me/"+id+".jpg";
	}
	
	else if (snap.href.match(/http:\/\/(www\.)?memegenerator\.net\/instance\/(.+)/) && snap.href.indexOf(".jpg") == -1 && snap.href.indexOf(".png") == -1 && snap.href.indexOf(".gif") == -1 && snap.href.indexOf(".jpeg") == -1) {
			var id = snap.href.substr(34);
            snap.href = "http://cdn.memegenerator.net/instances/400x/"+id+".jpg";
	}
	
	else if (snap.href.match(/http:\/\/(www\.)?imgflip.com\/i\/(.+)/) && snap.href.indexOf(".jpg") == -1 && snap.href.indexOf(".png") == -1 && snap.href.indexOf(".gif") == -1 && snap.href.indexOf(".jpeg") == -1) {
			var id = snap.href.substr(21);			
            snap.href = "http://i.imgflip.com/"+id+".jpg";
	}
	
	else if (snap.href.match(/http:\/\/(www\.)?livememe.com\/(.+)/)) {
			if (snap.href.indexOf(".jpg") == -1) {
				var id = snap.href.substr(24);
				snap.href = "http://i.lvme.me/"+id+".jpg";
			}
			else {
				var id = snap.href.substr(24);
				snap.href = "http://i.lvme.me/"+id;
			}
	}

	else if (snap.href.match(/http:\/\/memedad.com\/meme\/(.+)/) && snap.href.indexOf(".jpg") == -1)  {
			var id = snap.href.substr(24);
            snap.href = "http://memedad.com/memes/"+id+".jpg";
	}
	
	else if (snap.href.match(/http:\/\/makeameme.org\/(.+)/) && snap.href.indexOf(".jpg") == -1 && snap.href.indexOf(".png") == -1) {
			var id = snap.href.substr(26);
            snap.href = "http://makeameme.org/media/created/"+id+".jpg";
	}

}