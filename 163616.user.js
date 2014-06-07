// ==UserScript==
// @name           Github: Read all repository descriptions in repository list page
// @description    Read all descriptions in Github repository list page
// @version        1.1
// @author         vzvu3k6k
// @match          https://github.com/*
// @namespace      http://vzvu3k6k.tk/
// @license        public domain
// ==/UserScript==

// This script works on
//   A. https://github.com/<organization> (eg. https://github.com/github)
//   B. https://github.com/<user>?tab=repositories(#) (eg. https://github.com/mojombo?tab=repositories)
//   C. https://github.com/<user|organization>/repositories (eg. https://github.com/mattn/repositories)

(function(){
    const loadNum = 30; // the number of repositories in page C
    const owner = location.pathname.split("/")[1];
    var apiParam, pageNumOffset = 0;
    var loading = false;

    // check page type
    if(/^\/[^\/]+\/repositories/.test(location.pathname)){ // C
        apiParam = "sort=full_name&direction=asc";
        var match = location.search.match(/page=(\d+)/);
        if(match){
            pageNumOffset = parseInt(match[1], 10) - 1;
        }
        showDetails();
    }else if(document.querySelector('[data-tab="repo"] .selected')){ // A, B
        apiParam = "sort=pushed&direction=desc";
    }else{
        return;
    }

    document.addEventListener("scroll", showDetails);

    function showDetails(){
        var firstSimple = getFirstSimpleRepoOnDisplay();
        if(firstSimple == null) return;
        if(loading) return;

        var pageNum = Math.ceil((toArray(getRepos()).indexOf(firstSimple) + 1) / loadNum) + pageNumOffset;
        var loadingRepos = toArray(getRepos()).slice((pageNum - 1) * loadNum, pageNum * loadNum)
                .filter(function(i){return i.classList.contains("simple");});
        addLoadIcons(loadingRepos);
        loading = true;

        getDetails(owner, apiParam, pageNum, loadNum,
            function onload(repos){
                removeLoadIcons(loadingRepos);

                var repoData = {};
                for(var i = 0, l = repos.length; i < l; i++){
                    repoData[repos[i].full_name] = repos[i];
                }

                var simpleRepos = getSimpleRepos();
                for(var i = 0, l = simpleRepos.length; i < l; i++){
                    var repo = simpleRepos[i];
                    var data = repoData[getRepoFullName(repo)];
                    if(data){
                        addBody(repo, data.description, data.updated_at);
                    }
                }

                loading = false;
            },
            function onerror(){
                console.info("xhr error");
                removeListener();
            });
    };

    function removeListener(){document.removeEventListener("scroll", showDetails);};

    // Gets details of repos
    function getDetails(user, param, page, perPage, callback, onErrorCallback){
        var url = "https://api.github.com/users/" + user + "/repos?type=owner&" + param + "&per_page=" + perPage + "&page=" + page;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function(){
            var result = JSON.parse(this.responseText);
            callback(result);
        };
        xhr.onErrorCallback = onErrorCallback;
        xhr.send(null);
    };

    // Adds description and last updated time to a repository element
    function addBody(repoElement, descriptionText, updatedAtText){
        var body = document.createElement("div");
        body.classList.add("body");
        var description = document.createElement("p");
        description.classList.add("description");
        description.textContent = descriptionText || "(No Description)";
        body.appendChild(description);
        var update_at = document.createElement("p");
        update_at.classList.add("updated-at");
        update_at.textContent = "Last updated: " + updatedAtText;
        body.appendChild(update_at);

        repoElement.appendChild(body);
        repoElement.classList.remove("simple");
        repoElement.classList.add("not-simple-any-more");
    };

    // returns {repository_owner}/{project_name} (eg. mojombo/jekyll)
    function getRepoFullName(repoElement){
        return repoElement.querySelector("h3 a").href.replace("https://github.com/", "");
    };

    // returns all repository elements
    function getRepos(){
        return document.querySelectorAll(".repolist > li");
    };

    // returns repository elements without description
    function getSimpleRepos(){
        return document.querySelectorAll(".repolist > li.simple");
    };

    // returns the first visible repository element without description
    function getFirstSimpleRepoOnDisplay(){
        var repos = getSimpleRepos();
        for(var i = 0; i < repos.length; i++){
            if(repos[i].style.display != "none"){
                var top = repos[i].getBoundingClientRect().top;
                if(top > 0 && top < window.innerHeight)
                    return repos[i];
            }
        }
        return null;
    };

    // Adds load icons to repositories
    function addLoadIcons(repoElements){
        for(var i = 0; i < repoElements.length; i++){
            var h3 = repoElements[i].querySelector("h3");
            h3.insertAdjacentHTML("afterbegin", '<img src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-64.gif" width="20" height="20" class="_loading-icon">');
        }
    };

    function removeLoadIcons(repoElements){
        for(var i = 0; i < repoElements.length; i++){
            var icon = repoElements[i].querySelector("._loading-icon");
            icon.parentNode.removeChild(icon);
        }
    };

    // NodeList -> Array
    function toArray(nodelist){
        return Array.prototype.slice.call(nodelist);
    }
})();
