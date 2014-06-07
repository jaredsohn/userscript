// ==UserScript==
// @name          Ctrl+Enter Wikifies and Submits
// @description   Allows submitting on Ctrl+Enter in any input and textarea. Accepts a bit of wiki markup.
// @author        Tim Babych
// @homepage      http://clear.com.ua/projects/firefox/ctrl_enter
// @version       0.8
// @icon          http://clear.com.ua/projects/ctrl_enter/icons/ctrl-enter_64.png
// @include       *
// @namespace     tymofiy_ctrl_enter
// ==/UserScript==

function zakavych(text) {
    
    if (text.match(/[а-ягўєї]/i)) {
        var smart_quotes = '$1«$2»$3' 
        var backlink_prefix = text.match(/[ієїґ]/i) ? '' : 'ru_'
    } else {
        var smart_quotes = '$1“$2”$3'
        var backlink_prefix = 'en_'
    }
    
    var replacements = [
   
    // typographic quotes
    [/(\s+|^)"([^\"]+?)"(\s+|$|\.|\,|\!|\?)/g, smart_quotes],

    // nice citations
    // ugly tableish layout because LJ strips style attr in comments
    [/\({2}([\S\s]+?)\){2}\n?/g, '<table cellspacing=0 cellpadding=2><tr><td width=5 bgcolor="silver">&nbsp;</td><td bgcolor="#eeeeee" width=5>&nbsp;</td><td bgcolor="#eeeeee">$1</td><td bgcolor="#eeeeee" valign="bottom"><a href="//clear.com.ua/'+backlink_prefix+'ctrl">&bdquo;</a></td></tr></table>'],
    
    // ukrainian apostrophe
    [/([б-щБ-ЩҐ])[\*'`]([а-яєїА-ЯЄЇ])/g, '$1’$2'],
    
    // trademark (TM) and such
    [/\((tm|TM|тм|ТМ)\)/g, '™'],
    
    // copyright (C) and such
    [/\([cCсС]\)/g, '©'],    
    
    // registered (R) and such
    [/\([rRрР]\)/g, '\®'],
    
    // mdash -- one or two minuses surrounded by spaces
    [/(\s+|^)--?(\s+)/g, '$1—$2'],
    
    // **bold**	
    [/\*{2}([^\*]+?)\*{2}/g, '<b>$1</b>'],
    
    // //italic//
    [/([^\:]|^)\/{2}(.+?[^:])\/{2}/g, '$1<i>$2</i>'],
    
    // --strikeout--
    [/([^\!]|^)-{2}([^-]+?)-{2}/g, '$1<s>$2</s>'],

    // __underlined__
    [/_{2}([^_]+?)_{2}/g, '<u>$1</u>'],
    
    // ndash for number ranges: 1995-2005
    [/(\s)(\d+)-(\d+)(\s)/g, '$1$2–$3$4'],
    
    // ellipsis	
    [/\.\.\./g, '…'],
    
    // strip extra LFs at the end
    [/\n*$/, '']
    ];

    s = text
    for( i=0; i < replacements.length; i++) {
	s = s.replace(replacements[i][0], replacements[i][1])
    }
    
    return s
}

function trigger_submit_on_ctrl_enter(e) {
    if ((e.keyCode==13) && (e.ctrlKey || e.shiftKey)) {
	p = this.parentNode
	i = 0
	if (this.nodeName == 'TEXTAREA')
	    this.value = zakavych(this.value)

	while (p.nodeName != 'FORM' && i++ < 100) 
	    p = p.parentNode

	if (p.nodeName == 'FORM' && e.ctrlKey) 
	    p.submit()
    }
}

// weird, yeah
if (window.opera){
    XPathResult = window.XPathResult;
}
// Go!
allInps = document.evaluate("//textarea[not(@id='instant_comment_textarea')] | //select | //input", document, null, 
			    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allInps.snapshotLength; i++) {
    t = allInps.snapshotItem(i);
    t.addEventListener("keydown", trigger_submit_on_ctrl_enter, 0);
}
