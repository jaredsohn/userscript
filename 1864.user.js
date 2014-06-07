/*

Title:
	del.icio.us rss viewer

Description:
	This is a Greasemonkey user script for Firefox.

	This script enables user to see RSS feed directly.

Author:
	Toru Watanabe, mail: toru.wata at gmail dot com

Last Updated:
	Oct 3, 2005

*/

// ==UserScript==
// @name	delicious rss reader
// @namespace		http://toru.wata.gmail.com/userscripts/del.tag
// @description		stylesheet for delicious rss
// @include		http://del.icio.us/rss/*
// ==/UserScript==

(function(){
  var cssStyle = "\n\
 html,body,form,ul,li,h1,h3,p,ol.posts{\n\
   margin:0;\n\
   padding:0\n\
 }\n\
 body {\n\
   color: #557;\n\
   background: #eee;\n\
   font: small verdana;\n\
 }\n\
 a {\n\
   color: #000;\n\
   text-decoration: none;\n\
 }\n\
 a:link {\n\
   color: #000;\n\
   text-decoration: none;\n\
 }\n\
 a:hover {\n\
   color: #c00;\n\
   text-decoration: none;\n\
   position: relative;\n\
   top: 1px;\n\
   left: 1px;\n\
 }\n\
 ol {\n\
   list-style-type: none\n\
 }\n\
 .meta {\n\
   color: #999;\n\
   padding-left: 5px;\n\
   line-height: 150%;\n\
   background: #fff8da;\n\
   margin-left: 3px;\n\
   margin-right: 3px;\n\
   border-bottom: 1px #aaa solid;\n\
   border-right: 1px #aaa solid;\n\
   border-left: 1px #aaa solid;\n\
   -moz-border-radius: 0 0 4px 4px;\n\
 }\n\
 .extended {\n\
   color: #999;\n\
   padding-left: 5px;\n\
   line-height: 150%;\n\
   background: #fff8da;\n\
   margin-left: 3px;\n\
   margin-right: 3px;\n\
   border-right: 1px #aaa solid;\n\
   border-left: 1px #aaa solid;\n\
   font-size: 80%;\n\
   border-bottom: 1px #eaeaea solid;\n\
 }\n\
 .banner h1 {\n\
   background: url(\"http://del.icio.us/img/delicious.gif\") norepeat !important;\n\
 }\n\
 .banner h1, .banner h1 a {\n\
   font-weight: bold !important;\n\
   font-size: 15px;\n\
   color: #fff;\n\
 }\n\
 .right.list {\n\
   float: left;\n\
   background-color: #fff8da;\n\
   width: 160px;\n\
	 margin-top: 10px;\n\
   border: 1px solid #ccc;\n\
   -moz-border-radius: 6px 6px 6px 6px;\n\
   position: static;\n\
   padding: 5px;\n\
   font-size: 11px;\n\
 }\n\
 .banner {\n\
   padding: 9px !important;\n\
   background-color: #483521 !important;\n\
   background-position: 0 0 ;\n\
   background-repeat: repeat-x;\n\
   height: 30px;\n\
   position: fixed;\n\
   left: 0;\n\
   top: 0;\n\
   width: 100%;\n\
 }\n\
 .post {\n\
   padding-left: 10px;\n\
   padding-top: 0.5em;\n\
   margin: 0;\n\
 }\n\
 .delPage{\n\
   margin-top: 50px;\n\
   width: 70%;\n\
   background: transparent;\n\
 }\n\
 .posts {\n\
   padding-left: 20px;\n\
   padding-bottom: 5px;\n\
   padding-right: 20px;\n\
   margin-left: 180px !important;\n\
   background: transparent;\n\
 }\n\
 h3.desc a {\n\
   color: #600;\n\
   display: block;\n\
   border-top: 1px #aaa solid;\n\
   border-left: 1px #aaa solid;\n\
   border-right: 1px #aaa solid;\n\
   -moz-border-radius: 4px 4px 0 0;\n\
   border-bottom: 1px #eaeaea solid;\n\
   font-size: 12px;\n\
   font-weight: bold;\n\
   padding: 3px;\n\
   margin-right: 3px;\n\
   margin-left: 3px;\n\
   background: #fff8da;\n\
 }";

  var xsl_str = '<?xml version="1.0"?>\n\
<xsl:stylesheet version="1.0"\n\
 	 xmlns="http://www.w3.org/1999/xhtml"\n\
   xmlns:xsl="http://www.w3.org/1999/XSL/Transform"\n\
   xmlns:rss="http://purl.org/rss/1.0/"\n\
   xmlns:cc="http://web.resource.org/cc/"\n\
   xmlns:taxo="http://purl.org/rss/1.0/modules/taxonomy/"\n\
   xmlns:dc="http://purl.org/dc/elements/1.1/"\n\
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"\n\
  >\n\
  <xsl:key name="tagname" match="/rdf:RDF/rss:item/taxo:topics/rdf:Bag/rdf:li" use="@resource"/>\n\
  <xsl:variable name="current_href">'+window.location.href+'</xsl:variable>\n\
  <xsl:output method="html" media-type="text/html"/>\n\
  <xsl:template match="/">\n\
    <html><head>\n\
      <title><xsl:value-of select="/rdf:RDF/rss:channel/rss:title"/></title>\n\
      <style type="text/css">'+cssStyle+'</style>\n\
      <link rel="alternate" type="application/rss+xml">\n\
        <xsl:attribute name="title"><xsl:value-of select="/rdf:RDF/rss:channel/rss:title"/></xsl:attribute>\n\
        <xsl:attribute name="href">'+window.location.href+'</xsl:attribute></link>\n\
    </head>\n\
    <body>\n\
      <xsl:apply-templates select="/rdf:RDF/rss:channel"/>\n\
      <div class="delPage"><ol class="posts">\n\
        <xsl:apply-templates select="/rdf:RDF/rss:item"/>\n\
      </ol></div>\n\
    </body></html>\n\
  </xsl:template>\n\
  <xsl:template match="rss:channel">\n\
    <div class="banner">\n\
     <h1><a><xsl:attribute name="href"><xsl:value-of select="rss:link"/></xsl:attribute>\n\
     <xsl:value-of select="rss:title"/></a></h1>\n\
    </div>\n\
    <div class="right list">\n\
      <ol>\n\
      <xsl:for-each select="/rdf:RDF/rss:item/taxo:topics/rdf:Bag/rdf:li[generate-id(.)=generate-id(key('+"'tagname'"+',@resource))]">\n\
      <li>\n\
      <xsl:call-template name="count_tags"><xsl:with-param name="tag_uri"><xsl:value-of select="@resource"/></xsl:with-param></xsl:call-template>\n\
      <xsl:text>&#x20;</xsl:text>\n\
      <xsl:choose>\n\
      <xsl:when test="contains(substring-after($current_href,'+"'rss/'"+'),'+"'/'"+')">\n\
      <a><xsl:attribute name="href"><xsl:value-of select="$current_href"/>+<xsl:value-of select="substring-after(@resource,' + "'tag/'" + ')"/></xsl:attribute><xsl:value-of select="substring-after(@resource,' + "'tag/'" + ')"/></a></xsl:when>\n\
      <xsl:when test="$current_href='+"'http://del.icio.us/rss/'"+'">\n\
      <a><xsl:attribute name="href"><xsl:value-of select="$current_href"/>\n\
      <xsl:text>tag/</xsl:text><xsl:value-of select="substring-after(@resource,' + "'tag/'" + ')"/></xsl:attribute><xsl:value-of select="substring-after(@resource,' + "'tag/'" + ')"/></a></xsl:when>\n\
      <xsl:otherwise>\n\
      <a><xsl:attribute name="href"><xsl:value-of select="$current_href"/>\n\
      <xsl:text>/</xsl:text>\n\
      <xsl:value-of select="substring-after(@resource,' + "'tag/'" + ')"/></xsl:attribute><xsl:value-of select="substring-after(@resource,' + "'tag/'" + ')"/></a></xsl:otherwise>\n\
      </xsl:choose></li>\n\
      </xsl:for-each>\n\
      </ol>\n\
    </div>\n\
  </xsl:template>\n\
  <xsl:template match="rss:item">\n\
   <li class="post"><h3 class="desc">\n\
    <a rel="nofollow" target="_blank">\n\
     <xsl:attribute name="href"><xsl:value-of select="rss:link"/></xsl:attribute>\n\
     <xsl:value-of select="rss:title"/>\n\
    </a></h3>\n\
    <xsl:if test="rss:description">\n\
      <div class="extended"><xsl:value-of select="rss:description"/></div>\n\
    </xsl:if>\n\
    <div class="meta">\n\
     posted by <a><xsl:attribute name="href">http://del.icio.us/<xsl:value-of select="dc:creator"/></xsl:attribute>\n\
     <xsl:value-of select="dc:creator"/></a> on <xsl:value-of select="dc:date"/>\n\
    </div>\n\
   </li>\n\
  </xsl:template>\n\
  <xsl:template name="count_tags">\n\
    <xsl:param name="tag_uri"></xsl:param>\n\
    <xsl:value-of select="count(/rdf:RDF/rss:item/taxo:topics/rdf:Bag/rdf:li[@resource=$tag_uri])"/>\n\
  </xsl:template>\n\
</xsl:stylesheet>';

			var processor = new XSLTProcessor();
			var dataXSL = new DOMParser().parseFromString(xsl_str, "text/xml");

  try{
			processor.importStylesheet(dataXSL);
      dataXML = document;
			var ownerDocument = document.implementation.createDocument("", "", null);
			var newFragment = processor.transformToFragment(dataXML, ownerDocument);
			var oldLink = dataXML.documentElement.firstChild;
			dataXML.documentElement.replaceChild(newFragment, oldLink);
			var oldLink = dataXML.documentElement.firstChild.nextSibling;
 			while(oldLink != null)
 			{
 				oldLinkX = oldLink.nextSibling;
 				
 				if(oldLinkX != null)
 				dataXML.documentElement.removeChild(oldLink);
 						
 				oldLink = oldLinkX;
 			}	
		}catch(ex){
		}


})();	
