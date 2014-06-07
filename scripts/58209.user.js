// ==UserScript==
// @name 	      	Yahoo! Answers API Stylesheet
// @namespace 		http://userscripts.org/users/107071
// @author 	      	LarryDKB
// @description       	Adds a simple stylesheet to the Yahoo! Answers API.
//	     	      	-Guidance from the following
//	     	      	-http://dacc.exaptic.com/ by Daniel A Carleton
//	     	      	-http://userscripts.org/scripts/show/1864 by Toru Watanabe
// @version 		0.9.0
// @include 		http://answers.yahooapis.com/AnswersService/V1/getByUser*
// ==/UserScript==

var xsl_str = '<?xml version="1.0" encoding="utf-8"?><!-- DWXMLSource="getByUserRSS.xml" -->\n\
<!DOCTYPE xsl:stylesheet  [\n\
<!ENTITY nbsp   "&#160;">\n\
<!ENTITY copy   "&#169;">\n\
<!ENTITY reg    "&#174;">\n\
<!ENTITY trade  "&#8482;">\n\
<!ENTITY mdash  "&#8212;">\n\
<!ENTITY ldquo  "&#8220;">\n\
<!ENTITY rdquo  "&#8221;">\n\
<!ENTITY pound  "&#163;">\n\
<!ENTITY yen    "&#165;">\n\
<!ENTITY euro   "&#8364;">\n\
]>\n\
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\n\
<xsl:output method="html" encoding="utf-8" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"/>\n\
<xsl:template match="/">\n\
<html xmlns="http://www.w3.org/1999/xhtml">\n\
<head>\n\
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n\
<title>Yahoo! Answers</title>\n\
</head>\n\
<body>\n\
<xsl:for-each select="rss/channel/item">\n\
<p style="font-family:arial; font-size:80%; text-align: left;"><a style="text-decoration:none;" href="{link}"><xsl:value-of select="title"/></a></p>\n\
<p style="font-family:arial; color:#777; font-size:80%;"><xsl:value-of select="description"/></p>\n\
<p style="font-family:arial; color:#777; font-size:60%;"><xsl:value-of select="pubDate"/></p>\n\
</xsl:for-each>\n\
</body>\n\
</html>\n\
</xsl:template>\n\
</xsl:stylesheet>';

var xslt = new DOMParser().parseFromString(xsl_str, "text/xml");
 
var processor = new XSLTProcessor();
processor.importStylesheet(xslt);

var tmpdoc = document.implementation.createDocument("", "", null);
var fragment = processor.transformToFragment(document, tmpdoc);
document.replaceChild(fragment, document.documentElement);