// ==UserScript==
// @name           Reroute links to journal articles your institution can access
// @namespace      geological-supplies.com/scripts
// @description     If your institution uses EZproxy to allow off-campus access to web pages, this script will re-write links to point to a version that you have access to.
// @include        *
// @exclude *myaccess.library.utoronto.ca* 
// @exclude http://*interscience.wiley.com*interscience.wiley.com/* 
// @exclude http://www.earthscape.org/* 
// @exclude http://www.maikonline.com/* 
// @exclude *?CRETRY=1&amp;SRETRY=0
// @exclude *?CRETRY=1&SRETRY=0
// @version 	0.30 - Link directly to the PDF file instead of to a frameset
// @version		0.21 - Support for a wide range of academic sites (regexp fixed)
// @version		0.20 - Support for a wide range of academic sites
// ==/UserScript==

as = document.getElementsByTagName("a");
for (var myA in as) {
	a = as[myA];
	href = a.href;
	if (a.removeEventListener) {
		a.removeEventListener("click");
		a.onclick = function() {};
	}
	if (href) {
		if (href.match(/jstor\.org.*\d+\.pdf$/)) {
			href += "?acceptTC=true";
			a.target = "";
		}
		if (href.match(/\/cgi\/reprint\/\d+\//) && href.substr(-4) != ".pdf") {
			href = href + ".pdf"; // Only for reprints
		}
		a.href = href
						.replace(".pdf+html", ".pdf")
						.replace(/sepmonline\./, "geoscienceworld.")
						.replace(/(dx\.doi\.org|jstor\.org|\.tandfonline\.com|\.annualreviews.org|\.lyellcollection\.org|\.informit\.com\.au|\.jbc\.org|\.oxfordjournals\.org|\.royalsociety\.org|\.oed\.com|geology\.gsapubs\.org|ieeexplore\.ieee\.org|jgslegacy\.lyellcollection\.org|ini\.sagepub\.com|journals\.cambridge\.org|onlinelibrary\.wiley\.com|pt\.wkhealth\.com|biolbull\.org|\.agu\.org|\.iop\.org|\.publish\.csiro\.au|\.scopus\.com|\.transplantjournal\.com|isiknowledge\.com|\.geoscienceworld\.org|sciencemag\.org|scienceonline\.org|apps\.isiknowledge\.com|arjournals\.annualreviews\.org|jgs\.lyellcollection\.org|jme\.bmj\.com|journals\.cambridge\.org|journals\.royalsociety\.org|pubs\.acs\.org|scitation\.aip\.org|sub3\.isiknowledge\.com|(?:onlinelibrary|\.interscience)\.wiley\.com|\.bioone\.org|\.gsajournals\.org|\.informaworld\.com|\.ingentaconnect\.com|\.isiknowledge\.com|\.journals\.uchicago\.edu|\.lyellcollection\.org|\.nature\.com|\.pnas\.org|\.sciencedirect\.com|\.scopus\.com|\.springerlink\.com|commerce\.metapress\.com|onlinelibrary\.wiley\.com|www\.amjbot\.org)\//, "$1.myaccess.library.utoronto.ca/")
						;
	}
}