// ==UserScript==
// @name           OWA Link Unwrap
// @namespace      http://userscripts.org/users/aniline
// @description    Re-map links to actual target instead of through OWA servers.
// @author         aniline
// @include        http://*/owa/*
// @include        https://*/owa/*
// @version        0.3
// ==/UserScript==

function strip_owa(s) {
    var m = s.match('(http[s]?)(://)(.*)(/owa/redir.aspx.*URL=)(.*)');
    return (m == null) || (m.length != 6) ? s : unescape(m[5]);
}

function replace_owa_anchors(el) {
    var repl_root = (el != undefined) ? 
	el.getElementsByTagName('a') :
	document.getElementById("divRPContainer").getElementsByTagName('a');

    if (repl_root != undefined) {
	var l = repl_root.length;
	for (var i=0; i<l; i++) {
	    var a = repl_root[i];
	    var nhref = strip_owa(a.href);;
	    console.debug('Unwrapping :', nhref);
	    if (nhref != a.href) {
		a.href = nhref;
		a.style['borderBottom'] = '1px dashed red';
		a.style['textDecoration'] = 'none';
	    }
	}
    }

    return repl_root;
}

conv_expand_ob = new MutationObserver(function(mutations) {
    mutations.forEach(function (m) {
	if (m.addedNodes.length > m.removedNodes.length) {
	    console.debug('Updating on conversation expand');
	    for (var i=0; i<m.addedNodes.length; i++)
		replace_owa_anchors(m.addedNodes[i]);
	}
    });
});

conv_load_ob = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
	if (mutation.addedNodes.length > mutation.removedNodes.length) {
	    console.debug('Updating on conversation load');
	    replace_owa_anchors();
	    conv_expand_ob.disconnect();
	    conv_expand_ob.observe(document.getElementById("divItmPrts"), { childList: true, subtree: true });
	}
    });
});

readingpane_ob = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > mutation.removedNodes.length) {
	  conv_load_ob.disconnect();
	  conv_load_ob.observe(document.getElementById("ifRP"), { childList: true });
	  replace_owa_anchors();

	  conv_expand_ob.disconnect();
	  conv_expand_ob.observe(document.getElementById("divItmPrts"), { childList: true, subtree: true });
      }
  });
});

readingpane_ob.observe(document.getElementById("divRP"), { childList: true });
replace_owa_anchors();
