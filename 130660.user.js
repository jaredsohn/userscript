// ==UserScript==
// @name           namedItAsYouLike
// @namespace      http://www.onekin.org/namedItAsYouLike
// @include        *
// @include        about:blank?WikiLayerRendering
// @require        http://webaugmentation.org/wikilayer/wikilayer.js
// @defaultWiki    en.wikipedia.org
// ==/UserScript==
LayerOnArticle("XML").
 AfterSection("References").
 EmbedNote("== My own references ==\n* [http://www.amazon.com/dp/0201771861 Processing XML with Java] Nice book. Also available at the University Library!");

LayerOnArticle("Category:XML").
 BeforeSection("1").
 EmbedNote("See who has found this article interesting enough to be bookmarked in Delicious. [http://delicious.com/url/?url=en.wikipedia.org/wiki/$article CLICK HERE] .");

LayerOnArticle("XML").
 AfterSection("Characters and escaping").
 EmbedNote(extractSection("en.citizendium.org/wiki/XML", "XML Specification and Origin"));

LayerOnHistory("XML").
 AfterUser().
 EmbedNote(extractFromPage("http://wpcvn.com/s/karma?username=$user",".//karma/_text/text()"));

LayerOnArticle("XML").
 BeforeSection("Characters and escaping").
 EmbedNote(extractSection("JAXB","Default data type bindings"));

LayerOnArticle("Category:World_Wide_Web_Consortium_standards").
 BeforeSection("1").OnClickingButton().PostNote(extractFromPage("http://www.indeed.com/jobtrends?q=$article",".//td[1]/img"));
  
LayerOnArticle("XML").
 AfterSection("References").
 EmbedNote("== Some references to help you with the lab this Friday ==\n"+
           "* [http://www.amazon.com/dp/0201771861 Processing XML with Java]  Nice book. Also available at the University Library!\n"+
           "* http://moodle3.ehu.es/mod/assignment/view.php?id=228040 This is the Moodle link to upload your JAXB assignment\n"+
           "* [http://jaxb.dev.java.net/tutorial/ A JAXB Tutorial] A nice tutorial by Wolfgang Laun. Helpful tips inside!! \n"+ 
           "* [http://www.jcp.org/en/jsr/detail?id=222 JSR 222] Dull stuff. Only the brave");
           
LayerOnArticle("XML").
 AfterSection("XML Schema").EmbedNote(extractFromPage("http://zvon.org/comp/m/xml_schema.html",".//dl"));