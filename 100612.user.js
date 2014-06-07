// ==UserScript==
// @name           2p2 Comments
// @author         gaming_mouse
// @namespace      forumserver.twoplustwo.com
// @include        http://forumserver.twoplustwo.com/*/*/*/*
// @include        http://forumserver.twoplustwo.com/private.php?*
// ==/UserScript==

/*
	We make use of the following function by Robert Nyman
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/	
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

function stripHtml(html) {
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}

function nl2br(input_string)
{
	if (input_string == '')
		return '';
	return input_string.replace(/(\r\n|\r|\n)/g, '<br />');
}


/**
 * Hack for Chrome, which doesn't support GM_getValue/GM_setValue
 * See http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
 */

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


/**
 * @param usernameLink - DOM element representing the <a> tag
 * which surrounds a poster's username
 */

function NoteHelper(usernameLink) {
	this.usernameLink = usernameLink;
	this.username = this.getUsername();
	this.noteDiv = null;
	this.editDiv = null;
	this.editListener = null; //so we can remove listeners we add
	this.saveListener = null; //so we can remove listeners we add
	this.undertitle = this.usernameLink.parentNode.parentNode.childNodes[3]; // listen for events on undertitle text
	this.noteLocation = this.getNoteLocation();
}
NoteHelper.staticAllHelpers = new Array();

NoteHelper.prototype.getUsername = function() {
	return stripHtml(this.usernameLink.innerHTML);
}

NoteHelper.prototype.getNoteLocation = function() {

	usernameContainerDiv = this.usernameLink.parentNode.parentNode;
	numChildren = usernameContainerDiv.childNodes.length; //varies for some users
	statsDiv = usernameContainerDiv.childNodes[numChildren-2]; //section with "Join Date:", "Posts: ", etc
	return statsDiv;
}

NoteHelper.prototype.displayNote = function() {

	if (!this.noteDiv) 
		this.createNoteDiv();
  
	curNote = GM_getValue(this.username, '');

	preamble = (curNote == '') ? '' : '------- NOTES -------<br/>';
	this.noteDiv.innerHTML = preamble + nl2br(curNote);
}

NoteHelper.prototype.createNoteDiv = function() {
	
	newDiv = document.createElement('div');
	newDiv.style.width = '145px';
	this.noteDiv = newDiv;

	this.noteLocation.appendChild(this.noteDiv);
}

NoteHelper.prototype.listenForEdit = function() {

	if (this.saveListener)
		this.undertitle.removeEventListener('click', this.saveListener, true);

	var me = this; // need a local var to make the closure work
	editCallback = function() { me.editNote(); }
	this.editListener = editCallback;
	this.undertitle.addEventListener('click', editCallback, true);
}

NoteHelper.prototype.editNote = function() {

	if (!this.editDiv) 
		this.createEditDiv();

	this.editDiv.style.display = 'inline';
	this.listenForSave();
}

NoteHelper.prototype.createEditDiv = function() {

	newDiv = document.createElement('textarea');
	newDiv.setAttribute('rows', 10);
	newDiv.setAttribute('cols', 17);
	newDiv.value = GM_getValue(this.username, ''); 
	this.editDiv = newDiv;

	elmAfterUndertitle = this.usernameLink.parentNode.parentNode.childNodes[4];
	parentDiv = this.usernameLink.parentNode.parentNode;
	parentDiv.insertBefore(this.editDiv, elmAfterUndertitle);
}

NoteHelper.prototype.listenForSave = function() {

	this.undertitle.removeEventListener('click', this.editListener, true);

	var me = this; // need a local var to make the closure work
	saveCallback = function() { me.saveNote(); }
	this.saveListener = saveCallback;
	this.undertitle.addEventListener('click', saveCallback, true);
}

NoteHelper.prototype.saveNote = function() {

	GM_setValue(this.username, this.editDiv.value);
	this.editDiv.style.display = 'none';
	this.redisplayAllNotes();
	this.listenForEdit();
}

/**
 * Need this so that when you save a note, all posts by user get 
 * updated, in case user has multiple posts on this page
 */
NoteHelper.prototype.redisplayAllNotes = function() {

	noteHelpers = NoteHelper.staticAllHelpers;
	for (var i=0; i<noteHelpers.length; i++) {
		curHelper = noteHelpers[i];
		if (curHelper.username != this.username)
			continue;
		curHelper.displayNote();
	}
}

/**
 * Main function which sets up all the note helpers,
 * which in turn do the real work
 */

function createNoteHelpers() {
	var usernames = getElementsByClassName('bigusername', null, document);
	noteHelpers = NoteHelper.staticAllHelpers;

	for (var i=0; i<usernames.length; i++) {
		curHelper = new NoteHelper(usernames[i]);
		curHelper.displayNote();
		curHelper.listenForEdit();
		noteHelpers.push(curHelper);
	}
}

createNoteHelpers();
