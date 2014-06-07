// ==UserScript==
// @name           Quote Helper
// @namespace      http://www.advancedanime.com/profile.php?member=nemesis_monkey
// @description    Helps make quoting on the advancedanime forum easier by adding a simple quote function.
// @include        http://www.advancedanime.com/forum.php?t=*
// @include        http://advancedanime.com/forum.php?t=*
// @include        advancedanime.com/forum.php?t=*
// Version         1.1.01052011
// ==/UserScript==

var ForumQuote = {
	Quote : function() {
		var rows = this.getForumRows();
		for(i=1;i<rows.length;i++){
			var td = this.getForumRowsTD(rows[i]);
			this.addQuoteButton(td, 'quotebutton');
		}
		var inputs = gF.getClass('quotebutton');
		for(g=0;g<inputs.length;g++){
			var name = this.getPosterName(inputs[g]);
			inputs[g].setAttribute('pname', name);
		}
		this.setEvent(inputs);
	},
	getQuoteDiv : function(OBJ) {
		return OBJ.getElementsByTagName("td")[1].getElementsByTagName("div")[0];
	},
	getForumRows : function() {
		var forum = gF.getClass('forum')[0];
		var tr = forum.getElementsByTagName("tr");
		return tr;
	},
	getForumRowsTD : function(OBJ) {
		return OBJ.getElementsByTagName("td")[1];
	},
	addQuoteButton : function(OBJ, CLASS) {
		var elem = document.createElement('input');
			elem.setAttribute("class",CLASS);
			elem.setAttribute("type","submit");
			elem.setAttribute("value","Quote");
			elem.setAttribute("style","float:right;margin-right:5px;margin-top:-15px;");
			OBJ.appendChild(elem);
		return true;
	},
	setEvent : function(OBJArray) {
		for(i=0;i<OBJArray.length;i++){
			OBJArray[i].addEventListener('click',function(){ForumQuote.getSelectedText(this);},true);
		}
	},
	getSelectedText : function(OBJ) {
		var txt = window.getSelection();
		var name = OBJ.getAttribute('pname');
		if(txt != ''){
			var Quotes = {
				quote : txt,
				poster : name
			}
			var quote = ForumQuote.formatPost(Quotes);
		} else {
			txt = this.parseDOMquote(OBJ);
			var Quotes = {
				quote : txt,
				poster : name
			}
			var quote = ForumQuote.formatPost(Quotes);
		}
		var formEle = document.getElementsByTagName('textarea')[0];
		var pretext = formEle.value;
		var newVal = pretext + quote;
		document.getElementById('post_new').style.display='block';
		formEle.value = newVal;
		formEle.scrollTop=formEle.scrollHeight;
		formEle.focus();
	},
	getPosterName : function(OBJ) {
		var LeftSisterTD = OBJ.parentNode.parentNode.firstChild;
		var Name = LeftSisterTD.getElementsByTagName('a')[0].innerHTML;
		Name = Name.replace('<b>','');
		Name = Name.replace('<\/b>','');
		return Name;
	},
	parseDOMquote : function(OBJ) {
		var div = OBJ.parentNode.getElementsByTagName('div')[0];
		var txt = div;

		txt = txt.innerHTML.replace(/(<br\s*\/?>\s*)+/g,'<br/>');
		txt = txt.replace(/\t+/g,'');
		txt = txt.replace(/<br\/>/gi,'\n');
		txt = txt.replace(/<strong>/gi,'[b]');
		txt = txt.replace(/<\/strong>/gi,'[b]');
		txt = txt.replace(/<del>/gi,'[s]');
		txt = txt.replace(/<\/del>/gi,'[\/s]');
		txt = txt.replace(/<sup>/gi,'[sup]');
		txt = txt.replace(/<\/sup>/gi,'[\/sup]');
		txt = txt.replace(/<sub>/gi,'[sub]');
		txt = txt.replace(/<\/sub>/gi,'[\/sub]');
		txt = txt.replace(/<\/?[^>]+(>|$)/gi, '');
		
		return txt;
	},
	formatPost : function(DATA){
		var name = DATA.poster;
		var text = DATA.quote;
		var txt = "\n[quote][b]"+name+"[\/b]\n"+text+"[\/quote] \n"
		return txt;
	},
	detP : function() {
	var forum = gF.getClass('forum');
		if(forum.length > 0) {
			var reg = /This\stopic\sis\slocked/,gi;
			var isLocked = gF.getClass('options');
			for(i=0;i<isLocked.length;i++){
				var text = isLocked[i].innerHTML;
				if(reg.test(text)){return false;}
			}
			return true;
		}
		else return false;
	},
	init : function() {
		if(this.detP()) this.Quote();
	}
}

var gF = {
	getClass : function(CLASS,NODE) {
		var startNode = NODE || document;
		var AllTags = startNode.getElementsByTagName("*");
			var Elems = new Array();
			var re = new RegExp("(^|\\s+)" + CLASS + "(\\s+|$)");
			for (var i=0; i<AllTags.length; i++){
				if (re.test(AllTags[i].className)) Elems[Elems.length] = AllTags[i];
			}
		return Elems;
	}
}
var url = document.location.href;
if(url.search(/forum\.php\?t\=/i) >= 0)
ForumQuote.init();