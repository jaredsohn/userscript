// ==UserScript==
// @name           Job Adviser
// @namespace      http://webaugmentation.org/examples/Job
// @description    Augment Monster jobs with jobs at CareeBuilder and estimated incoming at Trovit.co.uk. Required Sticklet extension for Firefox. For more information, go to https://addons.mozilla.org/firefox/addon/Sticklet/.
// @include        *
// @include        about:blank?Sticklet
// @require        http://userscripts.org/scripts/source/96602.user.js
// @onekin:sticklet
// @sticklet:preview   http://jobsearch.monster.com/search/computer-science_5
// @sticklet:facebook
// @sticklet:twitter
// ==/UserScript==
StickletBox([
 Sticklet("Jobs at CareerBuilder.com").
  WhenOnWall("jobsearch.monster.com/*"). 
   SelectBrick("//div[@class='jobTitleContainer' and position()=1]/a").ExtractContent("(.*)").As("$jobtitle").
  InlayLever("link").At("after","$jobtitle").
  OnTriggeringLeverBy("click").
  LoadNote("http://jobs.careerbuilder.com/jobseeker/jobs/JobResults.aspx?SB%3Asbkw=$jobtitle").
   SelectBrick("//table[@class='jl_tbl']/..").ExtractContent("(.*)").As("$job").
  StickNote("$job")]);