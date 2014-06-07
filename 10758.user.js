// ==UserScript==
// @name           Twitter Powertoys
// @namespace      http://simplelogica.net/cajondesastre/twitterpowertoys/
// @description    Duplicates twitter navigation at the top of the status box + adds a "send personal message" link besides every user name on the timeline
// @include        http://twitter.com/home
// @include        http://twitter.com/home?page=*
// @author         Manuel González Noriega (mort) (manuel@simplelogica.net)
// @license        Creative Commons Attribution License
// @version	       0.1
// @released       2007-07-18
// @updated        2007-07-18
// @compatible     Greasemonkey
// ==/UserScript==


(function(){
	
	var d = document;
	// Use these vars to switch off and on either feature
	var do_topnav = true;
	var do_pm = true;
	
	function twittertopnav() {
				
		if (getElementsByClassName('pagination')) {
			var pag = getElementsByClassName('pagination')[0].innerHTML;
			var tab = getElementsByClassName('tab')[0];
			var newpag = d.createElement('div');
			newpag.setAttribute('class','pagination');
			newpag.setAttribute('id','ptpagination2');
			newpag.innerHTML = pag;
			var h2header = tab.firstChild.nextSibling;
			tab.insertBefore(newpag, h2header.nextSibling);				
			
			addGlobalStyle('div#ptpagination2 { float: none;text-align: right; }');
			
			
		}
	}
	
	function twitterpersonalmessage() {
		
		var tds = getElementsByClassName('content','td');		
		var total_tds = tds.length;
		
		for (var i = 0; i<total_tds;i++) {
			td = tds[i];
			// td > strong > a > [nick]
			var strong_link =  td.firstChild.nextSibling;
			var link = td.firstChild.nextSibling.firstChild;
			var nick = td.firstChild.nextSibling.firstChild.firstChild.nodeValue;
			
			var m_link = d.createElement('a');
			var m_text = d.createTextNode(' (m) ');
			m_link.appendChild(m_text);
			m_link.setAttribute('href','http://twitter.com/direct_messages/create/'+nick);
			m_link.setAttribute('title','Send a personal message to '+nick);
			m_link.setAttribute('id','ptpersonalmessage');
			
			// TODO: this is fucking ugly. Use ids/classnames and make it a little less weak, please
			var span_meta = strong_link.nextSibling.nextSibling.nextSibling.nextSibling;
						
			span_meta.parentNode.insertBefore(m_link, span_meta.nextSibling);

			addGlobalStyle('a#ptpersonalmessage { font-size:x-small }');
		}
		
		
	}
	
	
	function getElementsByClassName(className, tag, elm){
		var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
		var tag = tag || "*";
		var elm = elm || document;
		var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
		var returnElements = [];
		var current;
		var length = elements.length;
		for(var i=0; i<length; i++){
			current = elements[i];
			if(testClass.test(current.className)){
				returnElements.push(current);
			}
		}
		return returnElements;
	}
	
	function addGlobalStyle(css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	}

	if (do_topnav) {
		var topnav = new twittertopnav();		
	}
	
	if (do_pm) {
		var pm = new twitterpersonalmessage();
	}
	
	
	
})();

