// ==UserScript==
// @name           Google SERP Exporter
// @namespace      vipextools
// @description    Exports Google's SERPs in all kinds of funny ways. Do with it what you like. I use it as part of the “find the serp dominators” workflow: The Link Builder’s Guide To Analyzing SERP Dominators For Link Opportunities http://searchengineland.com/the-link-builders-guide-to-analyzing-serp-dominators-for-link-opportunities-21076
// @include        http://www.google.*/search?*
// ==/UserScript==

/*
Version: 0.1 is only going to export the domains, because that is usually all that is needed for the purpose of analyzing the serp dominators.

Steps:

1) Go to advanced search
2) Search for a term wth 100 results activated
3) Klick on the red link: VIPEX Domain Exporter →
4) Copy your stuff and use however you like

I hope you like it. If you do, please donate to a charity of you choosing :-)

*/

// var console = unsafeWindow.console;

//getElementsByCLassName by Stephen Chapman, http://javascript.about.com/library/bldom08.htm
document.getElementsByClassName = function(cl)
{
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++)
	{
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
};

function get_unique_domains()
{
	var cites = document.getElementsByClassName('l');
	var hrefs = [];
	var counter = 1;
	var checkdomains = [];
	var domains = [];
	for (var i=0;i<cites.length;i++)
	{
		var ref = cites[i];
		if (ref.parentNode.className == 'r') // Now we are in an organic result
		{
			var href = ref.href;
			hrefs.push(href);
			var domain = href.split('/')[2];
			if (checkdomains[domain] == undefined) // only get unique domains, as with 100 results there is a lot of duplication
			{
				checkdomains[domain] = true;
				domains.push(domain)
				counter++; // maybe used later
			}
		}
	}
	return domains;
}

var topstuff = document.getElementById('topstuff'); //only do it in advanced search. maybe there is a better way?

if (topstuff)
{
	var doms = get_unique_domains();
	var domstring = '<h3>Here are your de-duplicated domains (click, copy &amp; paste):</h3>';
	domstring += '<textarea onclick="this.select()" style="width: 90%; height: 280px">';
	for (var i=0; i<doms.length;i++) domstring += doms[i] + "\n";
	domstring += '</textarea>';

	var exporter = document.createElement('a');
	exporter.innerHTML = 'VIPEX Domain Exporter →';
	exporter.style.cssText = 'text-decoration: none; color: red; font-weight: bold; margin: 10px 0; display: block;';
	exporter.href = '#';

	exporter.addEventListener("click", function(e) {
		var wrapper = document.createElement('div');
		wrapper.style.cssText = 'width: 100%; height: 300px; padding: 10px; margin: 12px 0';
		wrapper.innerHTML = domstring;
		topstuff.appendChild(wrapper);
		this.style.cssText = 'display: none';
		return false;
	}, false);

	topstuff.appendChild(exporter);
}