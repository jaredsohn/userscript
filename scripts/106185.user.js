// ==UserScript==
// @name           LeproBattlefieldHelper
// @namespace      http://kt.era.ee/lepra/
// @description    Этот скрипт не надо устанавливать. См. LeproBattlefield.
// ==/UserScript==

function xpathOneEx(query, root) {
    return document.evaluate(query, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function xpathOne(query) {
    return xpathOneEx(query, document);
}
function xpathMany(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// -- Random number generator ----------------------------------------
// (http://stackoverflow.com/questions/424292/how-to-create-my-own-javascript-random-number-generator-that-i-can-also-set-the-s)
function RNG(seed) {
  // LCG using GCC's constants
  this.m = 0x100000000; // 2**32;
  this.a = 1103515245;
  this.c = 12345;

  this.state = seed ? seed : Math.floor(Math.random() * (this.m-1));
}
RNG.prototype.nextInt = function() {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
}
RNG.prototype.nextFloat = function() {
  // returns in range [0,1]
  return this.nextInt() / (this.m - 1);
}

Comment = function(elPost) {
    collectText = function(node) {
        if (node.tagName == 'IMG') return ' [КАРТИНКА]';
        if (node.tagName == 'BR') return '\n';
        var r = node.nodeValue ? node.nodeValue : '';
        for (var i in node.childNodes) {
            r = r + ' ' + collectText(node.childNodes[i]);
        }
        return r;
    }
    this.div = elPost;
    this.id = this.div.getAttribute("id");
    this.text =  collectText(xpathOneEx("div[@class='dt']", this.div));
    this.textShort = this.text;
    if (this.textShort.length > 200) this.textShort = this.textShort.substr(0,190) + '...';
    this.dataDiv = xpathOneEx("div[@class='dd']", this.div);
    this.author = xpathOneEx("div/a[contains(@href, 'users')]", this.dataDiv).innerHTML;
	
	var re = /(\d\d)\.(\d\d)\.(\d\d\d\d) в (\d\d)\.(\d\d)/
	var m = re.exec(this.dataDiv.innerHTML);
	if (m != null) {
		this.date = [m[3],m[2],m[1],m[4],m[5]];
		this.dateStr = '' + m[3] + m[2] + m[1] + m[4] + m[5];
	}
	else {
		this.date = null;
		this.dateStr = '';
	}

	//this.rating = xpathOneEx("div//span[@class='rating']/em", this.div).innerHTML;
	this.replyto = xpathOneEx("div//a[@replyto]", this.div);
	if (this.replyto != null) this.replyto = this.replyto.getAttribute("replyto");
}

// List all comments on the page
Comment.listAll = function() {
	var comments = xpathMany("//div[@id='js-commentsHolder']/div[contains(@class,'post')]");
	var cmts = Array();
	for (var i = 0; i < comments.snapshotLength; i++) {
		var elm = comments.snapshotItem(i);
		cmts.push(new Comment(elm));
	}
	
	// Sort comments by date
	cmts.sort(function(a,b) { return b.dateStr < a.dateStr ? 1 : -1; });
	
	// Index comments
	Comment.cmtIndex = new Object();
	for (var i = 0; i < cmts.length; i++) Comment.cmtIndex[cmts[i].id] = cmts[i];

	// Set "replyto" links
	for (var i = 0; i < cmts.length; i++) {
		if (cmts[i].replyto != null && Comment.cmtIndex.hasOwnProperty(cmts[i].replyto)) {
			cmts[i].replyto = Comment.cmtIndex[cmts[i].replyto];
		}
		else cmts[i].replyto = null;
	}
	
	// For each comment find whether it is last and whether it is first
	var tmp = new Object();
	for (var i = cmts.length - 1; i >= 0; i--) {
		if (!tmp.hasOwnProperty(cmts[i].author)) {
			cmts[i].isLastAuthor = true;
			tmp[cmts[i].author] = true;
		}
		// What about the author of the reply-to comment
		if (cmts[i].replyto != null) {
			// Author of the reply-to comment
			var replyToAuthor = cmts[i].replyto.author;
			if (!tmp.hasOwnProperty(replyToAuthor)) {
				cmts[i].isLastReplyToAuthor = true;
				tmp[replyToAuthor] = true;
			}
		}
	}
	tmp = new Object();
	for (var i = 0; i < cmts.length; i++) {
		if (!tmp.hasOwnProperty(cmts[i].author)) {
			cmts[i].isFirst = true;
			tmp[cmts[i].author] = true;
		}
	}

	return cmts;
}


// -- Create the application's elements -------------------------------------------------
function App() {
	if (document.getElementById("postanimation") == null) {
		var root = document.createElement('DIV');
		root.setAttribute("id", "postanimation");
		root.setAttribute("style", "display: none; position: fixed; top: 10px; left: 10px; bottom: 10px; right: 10px; background-color: white; z-index: 25000; opacity: 0.9; border: 1px solid black;");
		document.body.appendChild(root);
	}
	this.cvs = document.getElementById("postanimation");
	this.cvs.innerHTML = '<div style="position: absolute; left: 10px; top: 10px; font-weight: bold; font-size: 20px;">Поле битвы</div><a id="postanimationClose" style="display: block; position: absolute; right: 1px; top: 1px; width: 20px; height: 20px; text-align: center; font-size: 15px; line-height: 15px; background-color: #ddd; font-weight: bold; cursor: pointer;" onclick="this.parentNode.style.display=\'none\'; return false;">X</a><div id="postlog" style="overflow: scroll; position: fixed; left: 11px; right: 11px; height: 100px; bottom: 11px; color: #888;"></div>';
	this.log = document.getElementById("postlog");
	this.log.innerHTML = '';
	this.taken = new Object();
	this.authors = new Object();	
	this.rng = new RNG(1);
	
	// List comments and sort them by date-time
	this.cmts = Comment.listAll();
}


// -- Draw visuals -----------------------------------------------------------------------
App.prototype.draw = function() {
	// Show app
	this.cvs.style.display = "block";
	this.dims = $(this.cvs).getSize(); // MooTools
	
	this.rowHeight = 25;
	this.topMargin = 15;
	this.rowCount = ((this.dims.y - 2*this.topMargin - 100) / this.rowHeight); // It's more fun without Math.floor
	this.leftMargin = 15;
	this.colWidth = 100;
	this.colCount = ((this.dims.x - 2*this.leftMargin - this.colWidth) / this.colWidth);
	

	// Now collect all authors
	for (var i = 0; i < this.cmts.length; i++) {
		if (!this.authors.hasOwnProperty(this.cmts[i].author)) this.authors[this.cmts[i].author] = new Author(this.cmts[i].author, this);
	}
	
	this.animate(this.cmts);
}


App.prototype.animateComment = function(cmt, callback) {
	var self = this;
	var replytoAuthor = null;
	if (cmt.replyto != null) replytoAuthor = self.authors[cmt.replyto.author];
	var author = self.authors[cmt.author];
	var authorEl = $(author.div);
	
	function logMessage() {
		var el = document.createElement('DIV');
		el.setAttribute("style", "margin-bottom: 2px");
		var s = '<b>' + cmt.author;
		if (replytoAuthor != null) s = s + ' > ' + replytoAuthor.name;
		s = s + ':</b> ' + cmt.textShort;
		el.innerHTML = s;
		self.log.appendChild(el);
		self.log.scrollTop = self.log.scrollHeight;
	}
	
	// First see whether we have to show the author
	var m = new Fx.Morph(authorEl, { duration: 200, link: 'chain' });
	
	if (!author.visible) {
		// Yes, we first need to show the author
		author.div.style.display = 'inline-block';
		author.visible = true;
		m.chain(function() { m.start({top: [0, author.y]}); });
	}
	
	// Now see whether the message is directed to someone
	if (replytoAuthor != null) {
		// Yes, we need to tween the author to replytoauthor
		m.chain( function() { this.start({left: replytoAuthor.x, top: replytoAuthor.y}); });
		m.chain( function() { logMessage(); this.callChain(); });
		m.chain( function() { this.start({left: author.x, top: author.y }); });
	}
	else {
		// Just flash
		m.chain( function() { this.start({'background-color': '#444'}) });
		m.chain( function() { logMessage(); this.callChain(); });
		m.chain( function() { this.start({'background-color': '#eee'}) });
	}
	
	// Finally, see whether it was the last message of this author
	if (cmt.isLastAuthor) {
		m.chain(function() { this.start({'top': 0}); });
		m.chain(function() { author.div.style.display = "none"; author.visible = false; this.callChain(); });
	}

	// Same for the replytoAuthor
	if (cmt.isLastReplyToAuthor) {
		m.chain(function() { 
			var e = $(replytoAuthor.div);
			e.set('morph', {'duration': 200 });
			e.morph({'top': 0});
			e.get('morph').chain(function() { 
				replytoAuthor.div.style.display = "none";
				replytoAuthor.visible = false;
				this.callChain();
				});
			this.callChain();
		});
	}
	
	if (callback != null) m.chain(callback);
	m.callChain();
}

App.prototype.animate = function(cmts) {
	var animationSequence = cmts;
	var animationIndex = 0;
	var self = this;
	function doStep() {
		function endStep() {
			animationIndex++;
			if (animationIndex < animationSequence.length && self.cvs.style.display != "none") setTimeout(doStep, 100);
		}
		self.animateComment(animationSequence[animationIndex], endStep);
	}
	setTimeout(doStep, 100);
}

function Author(name, app, authors) {
	// Create author div
	this.name = name;
	this.div = document.createElement('DIV');
	this.div.innerHTML = '<img style="vertical-align: middle" src="http://img.leprosorium.com/1178290"> '+name;
	
	// Find a random location for this div
	var safety = 10;
	while (safety-- > 0) {
		this.row = app.rng.nextInt() % app.rowCount;
		this.col = app.rng.nextInt() % app.colCount;
		
		// Is this cell taken?
		if (!app.taken.hasOwnProperty(this.row * app.colCount + this.col)) break;
	}
	
	this.y = this.row * app.rowHeight + app.topMargin;
	this.x = this.col * app.colWidth + app.leftMargin;
	
	this.div.setAttribute("style", "font-size: 13px; position: absolute; top: " + this.y + "px; left: " + this.x + "px; display: none; background-color: #eee; border: 1px dashed #ccc; padding: 2px;");
	this.visible = false;
	app.cvs.appendChild(this.div);
}


var app = new App();
app.draw();
