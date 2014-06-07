Metadata(<><![CDATA[
// ==UserScript==
// @name           Job Adviser
// @namespace      http://webaugmentation.org/examples/Job
// @description    Augment Monster jobs with jobs at CareeBuilder and estimated incoming at Trovit.co.uk. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://dl.dropbox.com/u/20318901/96604.user.js
// @onekin:sticklet
// @sticklet:preview   http://jobsearch.monster.com/search/computer-science_5
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
]]></>);
StickletBox([
 Sticklet("Jobs at CareerBuilder.com").
  WhenOnWall("jobsearch.monster.com/*"). 
   SelectBrick("//a[@class='jobTitle fnt11_js']/@title").ExtractContent("(.*)").As("$jobtitle").
  InlayLever("link").At("after","$jobtitle").
  OnTriggeringLeverBy("click").
  LoadNote("http://jobs.careerbuilder.com/jobseeker/jobs/JobResults.aspx?SB%3Asbkw=$jobtitle").
   SelectBrick("//table[@class='jl_tbl']/..").ExtractContent("(.*)").As("$job").
  StickNote("$job"),
  
 Sticklet("Estimated incoming at Trovit.co.uk").
  WhenOnWall("jobsearch.monster.com/*"). 
   SelectBrick("//a[@class='jobTitle fnt11_js']/@title").ExtractContent("^([^-]*)-(.)*$").As("$jobtitle").
  InlayLever("link").At("after","$jobtitle").
  OnTriggeringLeverBy("click").
  LoadNote("http://jobs.trovit.co.uk/index.php/cod.jobs_stats/similar_search.$jobtitle").
   SelectBrick("//div[@class='content']//dl/..").ExtractContent("(.*)").As("$incoming").
  StickNote("$incoming")]
  );