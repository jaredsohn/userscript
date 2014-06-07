// ==UserScript==
// @name       diary followers checker
// @namespace  http://userscripts.org/scripts/show/486953
// @author     dpleshakov (http://userscripts.org/users/473776)
// @version    1.0
// @include    *://*diary.ru/?favorite*
// ==/UserScript==

var lastUpdateKey = "diaryRu.followersChecker.lastUpdate";
var followersCountKey = "diaryRu.followersChecker.followers.count";
var followersKeyMask = "diaryRu.followersChecker.followers.";
var newFollowersKey = "diaryRu.followersChecker.followers.new";
var leavedFollowersKey = "diaryRu.followersChecker.followers.leaved";

var informationDivClassName = "diaryRu_followersChecker_information";

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function SaveFollowers(followers) {
    var storedFoolowersCount = parseInt(localStorage.getItem(followersCountKey));
    if(storedFoolowersCount !== NaN) {
        for(var index = 0; index < storedFoolowersCount; ++index) {
            localStorage.removeItem(followersKeyMask + index.toString() + ".name");
            localStorage.removeItem(followersKeyMask + index.toString() + ".url");
        }
    }
    
    localStorage.setItem(followersCountKey, followers.length);
    for(var index = 0; index < followers.length; ++index) {
        localStorage.setItem(followersKeyMask + index.toString() + ".name", followers[index].name);
        localStorage.setItem(followersKeyMask + index.toString() + ".url", followers[index].url);
    }
}

function GetStoredFollowers() {
    var followers = [];
    var storedFoolowersCount = parseInt(localStorage.getItem(followersCountKey));
    for(var index = 0; index < storedFoolowersCount; ++index) {
        followers.push({'name': localStorage.getItem(followersKeyMask + index.toString() + ".name"), 'url': localStorage.getItem(followersKeyMask + index.toString() + ".url")});
    }
    return followers;
}

function UpdateLocalStorage(followers) {
    localStorage.setItem(lastUpdateKey, new Date().getDate());
    SaveFollowers(followers);
}

function GetDifference(firstArray, secondArray) {
    var difference = [];
    for(var index = 0; index < secondArray.length; ++index) {
        var element = firstArray[index];
        if(secondArray.indexOf(element) === -1) {
            difference.push(element);
        }
    }
    return difference;
}

function GetFollowers() {
    var followers = [];
    var anchors = document.querySelectorAll("#pchs li a");
    for(var index = 0; index < anchors.length; ++index) {
        followers.push({'name': anchors[index].innerHTML, 'url': anchors[index].href});
    }
    return followers;
}

function OneFollowerToString(oneFollower) {
    return "<a href='" + oneFollower.url + "'>" + oneFollower.name + "</a>";
}

function FollowersToString(followers) {
    var result = "";
    for(var index = 0; index < followers.length; ++index) {
        if(index > 0) {
            result = result + ", ";
        }
        restult = result + OneFollowerToString(followers[index]);
    }
    return result;
}

function CreateInformationDiv(newFollowersString, leavedFollowersString) {
    var informationDiv = document.getElementById(informationDivClassName);
    if(informationDiv == null) {
        var informationDiv = document.createElement("div");
        informationDiv.setAttribute("id", informationDivClassName);
        informationDiv.setAttribute("class", "menuSection");
        document.getElementById("pchs").parentNode.appendChild(informationDiv);
    }
    var newFollowersInformation = "<p><b>New followers:</b> " + newFollowersString + "</p>";
    var leavedFollowersInformation = "<p><b>Leaved followers:</b> " + leavedFollowersString + "</p>";
    informationDiv.innerHTML = newFollowersInformation + leavedFollowersInformation;
}
 
if(!supports_html5_storage()) {
    return false;
}

function main() {
    var currentFollowers = GetFollowers();
    var lastUpdate = localStorage.getItem(lastUpdateKey);
    
    if(lastUpdate == null) {
        UpdateLocalStorage(currentFollowers);
        CreateInformationDiv([], []);
    } else if (lastUpdate < new Date().getDate()) {
        var lastFollowers = GetStoredFollowers();
        
        var newFollowersString = FollowersToString(GetDifference(currentFollowers, lastFollowers));
        var leavedFollowersString = FollowersToString(GetDifference(lastFollowers, currentFollowers));

        localStorage.setItem(newFollowersKey, newFollowersString);
        localStorage.setItem(leavedFollowersKey, leavedFollowersString);

        CreateInformationDiv(newFollowersString, leavedFollowersString);
        
        UpdateLocalStorage(currentFollowers);
    } else {
        var newFollowersString = localStorage.getItem(newFollowersKey);
        var leavedFollowersString = localStorage.getItem(leavedFollowersString);
        if (newFollowersString == null) newFollowersString = "";
        if (leavedFollowersString == null) leavedFollowersString = "";

        CreateInformationDiv(newFollowersString, leavedFollowersString);
    }
}

main();