// ==UserScript==
// @name        HideRecruitersSeek
// @namespace   http://amxl.com/greasemonkey-scripts
// @description Hide Recruiters on Seek
// @run-at      document-start
// @include     http://www.seek.co.nz/*
// @include     http://www.seek.com.au/*
// @version     2
// ==/UserScript==

// Define our interceptor to filter the jobs...

var exactRecruiters = ["Global Attract", "Robert Walters", "ninetwenty", "MTR",
                       "Beyond Services Limited", "Tardis Group", "Attribute Consulting", "Real Time Australia P/L",
                       "Mitchellake Consulting", "Scope Placements", "Genesis IT&T P/L", "Skilled Group",
                       "ADP Employer Services", "Greythorn", "Delivery Centric Pty Ltd", "Itcom",
                       "TRC Group", "Radley Group", "ecareer employment services", "Hudson",
                       "Aptus Personnel", "The Network", "Michael Page Technology", "S2M",
                       "Chandler Macleod Group", "Command Group Pty Ltd", "Reveal Limited",
                       "Ambition Technology", "Rowben Consulting", "Ready Willing and Able",
                       "TRA Global"
                       ];
var matchRecruiters = ["Recruit", "recruit", "Resourcing",
                       "Absolute IT", "Comspek", "Manpower", "Hays", "Professional People",
                       "Lloyd Executive", "Candle", "Talent Vault", "Randstad", "iKas International", "Talent2",
                       "Peoplebank", "Experis", "QJumpers"
                       ];

function isRecruiter(name) {
  if (name.contains("Recruitment") || name.contains("Recruiter"))
    return true;
  for (var i in exactRecruiters)
    if (name == exactRecruiters[i])
      return true;
  for (var i in matchRecruiters)
    if (name.contains(matchRecruiters[i]))
      return true;
  return false;
}

function filterRecruiters(result) {
  var oldData = result.data;
  result.data = [];
  for (var i in oldData) {
    var adv = oldData[i].advertiser.description;
    if (!isRecruiter(adv))
      result.data.push(oldData[i]);
  }
  return result;
}

window.addEventListener('beforescriptexecute', function(e) {
    if (e.target.src.contains("search.modules.js")) {
      require(["dataservice.jobs"], function (jobDataService) {
          jobDataService.oldGetJobSearchResult = jobDataService.getJobSearchResult;
          jobDataService.getJobSearchResult = function(params, criteria) {
            params.oldSuccess = params.success;
            params.success = function(result) {
              params.oldSuccess(filterRecruiters(result));
            }
            return jobDataService.oldGetJobSearchResult(params, criteria);
          }
        });
    }
  });
