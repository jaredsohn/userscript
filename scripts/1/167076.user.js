// ==UserScript==
// @name           MAS
// @namespace      http://webaugmentation.org/examples/DBLP
// @description    Coge Informaciones en ehu.es y muestra en moodle. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @author         Alexsanderson Vieira Santos
// @onekin:sticklet
// @sticklet:preview http://dblp.uni-trier.de/pers/hd/d/D=iacute=az:Oscar.html
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("<b>NEWS</b>").
  WhenOnWall("moodle4.ehu.es/*").
   SelectBrick("//td[@id='left-column']/div").
   ExtractContent("^(.)").As("$load").// text
  InlayLever("button").At("after","$load").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.informatika.ehu.es/p248-home/es").
   SelectBrick("//div[@class='r01clearfix r01gClsContentList r01gClsContentListlst_noticias r01gborderlst_noticias' and @id='r01gContentListlst_noticias']").
   ExtractContent("^(.*)").As("$news").// text
  StickNote("<b><div>News of Informatika Facultatea</div></b> $news"),

 Sticklet("<b>EVENTOS</b>").
  WhenOnWall("moodle4.ehu.es/*").
   SelectBrick("//td[@id='left-column']/div").
   ExtractContent("^(.)").As("$data").// text
  InlayLever("button").At("after","$data").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.enplegua.ehu.es/p288-home/es/").
   SelectBrick("//div[@class='r01clearfix r01gClsContentList r01gClsContentListlst_eventos r01gborderlst_eventos' and @id='r01gContentListlst_eventos']").
   ExtractContent("^(.*)").As("$noticias").// text
  StickNote("<b><div>Events at the University</div></b> $noticias"),

 Sticklet("<b>JOBS</b>").
  WhenOnWall("moodle4.ehu.es/*").
   SelectBrick("//td[@id='left-column']/div").
   ExtractContent("^(.)").As("$job").// text
  InlayLever("button").At("after","$job").
  OnTriggeringLeverBy("click").
  LoadNote("http://www.ehu.es/enplegugunea/es/").
   SelectBrick("//div[@id='noticiasHome']").
   ExtractContent("^(.*)").As("$not").// text
  StickNote("<b><div>Job Opportunities</div></b> $not"),

 Sticklet("<b>Archives of $pesquisa</b>").
  WhenOnWall("http://moodle4.ehu.es/course/view.php?id=4132").
   SelectBrick("//font[1]/span/span").
   ExtractContent("^(.*)$").As("$pesquisa").// text
  InlayLever("button").At("after","$pesquisa").
  OnTriggeringLeverBy("click").
  LoadNote("http://scholar.google.es/scholar?hl=en&q=$pesquisa").
   SelectBrick("//div[@id='gs_ccl']").
   ExtractContent("(.*)").As("$sip").// text
  StickNote("<b><div>Busca en Google Scholar</div></b> $sip"),

 Sticklet("(Help for $mytitle)").
  WhenOnWall("moodle4.ehu.es/*").
   SelectBrick("//font[1]/span/span").
   ExtractContent("^(.*)$").As("$mytitle").// text
  InlayLever("link").At("after","$mytitle").
  OnTriggeringLeverBy("click").
  LoadNote("osearch://www.w3schools.com/?$mytitle").
   SelectBrick("//div[@id='leftcolumn']").
   ExtractContent("(.*)").As("$articles").// text
  StickNote("<ul><li>$articles</li></ul>")]);