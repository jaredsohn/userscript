// ==UserScript==
// @name           CodePlex Usability Enhancements
// @namespace      userstyles.org
// @description    Handles whitespace problem in issue tracker description
// @include        http://*.codeplex.com/WorkItem/View.aspx?WorkItemId=*
// @include        http://codeplex.com/*/WorkItem/View.aspx?WorkItemId=*
// @include        http://www.codeplex.com/*/WorkItem/View.aspx?WorkItemId=*
// @include        http://*.codeplex.com/Thread/View.aspx?ThreadId=*
// @include        http://codeplex.com/Thread/View.aspx?ThreadId=*
// @include        http://www.codeplex.com/*/Thread/View.aspx?ThreadId=*
// ==/UserScript==

(function(){
	function ltrim(s) {
		var l = 0;
		while(l < s.length && (s[l] == ' ' || s[l] == '\r' || s[l] == '\n' || s[l] == '\t')) {
			l++;
		}
		return s.substring(l, s.length);
	}
	
	function getElementsByClassName(classname, node) {
		if(!node) node = document.getElementsByTagName("body")[0];
		var a = [];
		var re = new RegExp('\\b' + classname + '\\b');
		var els = node.getElementsByTagName("*");
		for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);
		return a;
	}

	/* trim some whitespace */
	if (el = document.getElementById('ctl00_ctl00_MasterContent_Content_DescriptionPanel')) {
		el.innerHTML = '\n' + ltrim(el.innerHTML);
	}

	/* permalinks in discussion posts */
	var elements = getElementsByClassName('Details');
	for (var i = 0; i < elements.length; i++) {
		anchors = elements[i].getElementsByTagName('a');
		anchor = anchors[0];

		permalink = document.createElement('a');
		permalink.innerHTML = '#' + (i + 1);
		permalink.href = '#' + anchor.name;
		permalink.className = 'permalink';

		elements[i].appendChild(permalink);
	}
})();