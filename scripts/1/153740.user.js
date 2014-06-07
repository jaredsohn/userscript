// ==UserScript==
// @id             Github-display-package-dependencies
// @name           Github: display package.json dependencies
// @version        1.4
// @namespace      http://efcl.info/
// @author         azu
// @description    Github: display package.json dependencies
// @include        https://github.com/*/*
// @run-at         document-end
// ==/UserScript==

(function (){
    var repositoryURL = document.querySelector('meta[property="og:url"]').getAttribute("content");
    /* USER/repositoryNAME */
    var userRepoPath = repositoryURL.replace("https://github.com/", "");
    var owner = userRepoPath.split("/").shift();
    var repoName = userRepoPath.split("/").pop();
    var permalink = document.querySelector('link[rel="permalink"]');
    var treeSHA;
    if(permalink == null){
        // new Design
        treeSHA = document.getElementById("js-command-bar-field").dataset.sha;
    }else{
        treeSHA = permalink.href.split("/").pop();
    }
    if (!treeSHA && userRepoPath) {
        return null;
    }

    var main = function (){
        getTree({
            "owner": owner,
            "name": repoName,
            "sha": treeSHA
        }, function (err, result){
            if (err) {
                console.log("not found tree", err);
                return;
            }
            var url = getPackageJSON(JSON.parse(result));
            if (!url) {
                console.log("not found package.json");
                return;
            }
            getFileRawContent(url, function (err, content){
                if (err) {
                    console.log("doesn't get content", err);
                    return;
                }
                var packageJSON = JSON.parse(content);
                var insertLists = [];
                var dependenciesList = createDependenciesList(packageJSON);
                var devDependenciesList = createDevDependenciesList(packageJSON);
                var bundledDependenciesList = createBundledDependenciesList(packageJSON);
                dependenciesList && insertLists.push(dependenciesList);
                devDependenciesList && insertLists.push(devDependenciesList);
                bundledDependenciesList && insertLists.push(bundledDependenciesList);
                if(insertLists.length > 0) {
                    insertGMCSS();
                    insertDependencies(insertLists)
                }
            });
        });
    };

    function insertGMCSS(){
        GM_addStyle("a[data-npm-version] {" +
            "    border-bottom: 1px dotted #333;" +
            "    position: relative;" +
            "    cursor: pointer;" +
            "}" +
            "a[data-npm-version]:hover:after {" +
            "    content: attr(data-npm-version);" +
            "    position: absolute;" +
            "    white-space: nowrap;" +
            "    background: rgba(0, 0, 0, 0.85);" +
            "    padding: 3px 6px;" +
            "    color: #FFF;" +
            "    border-radius: 3px;" +
            "    margin-top: -2em;" +
            "}");
    }

    function getElementForInsert(){
        // 〜2013-06-18 Design
        var elem;
        elem = document.querySelector(".repo-desc-homepage");
        if(elem == null){
            // new Design
            // https://github.com/blog/1529-repository-next
            elem = document.querySelector(".repository-description");
        }
        return elem
    }
    var insertDependencies = function (insertLists){
        // insert to element
        var insertEle = getElementForInsert();
        var table = document.createElement("table");
        table.setAttribute("style", "margin: 5px 0;");
        var tbody = document.createElement("tbody");
        insertLists.forEach(function (dependenciesList, idx, object){
            var th = document.createElement("td");
            th.setAttribute("style", "font-size:15x;font-weight:bold; margin: 5px 0;");
            th.textContent = dependenciesList["title"];
            var tr = document.createElement("tr");
            tr.setAttribute("style", "font-size:13px;margin:3px;word-break:break-all;word-wrap: break-word;");
            var td = document.createElement("td");
            for (var i = 0, len = dependenciesList.list.length; i < len; i++) {
                var obj = dependenciesList.list[i];
                var aTag = document.createElement("a");
                aTag.title = obj["name"];
                aTag.href = obj["url"];
                aTag.textContent = obj["name"];
                aTag.setAttribute("data-npm-version", obj["version"]);
                td.appendChild(aTag);
                if (i != len - 1) {
                    td.appendChild(document.createTextNode(", "));
                }
            }
            tr.appendChild(td);
            tbody.appendChild(th);
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        insertEle.appendChild(table);
    };

    // MAIN
    main();

    // http://developer.github.com/v3/git/trees/
    // GET /repos/:owner/:repo/git/trees/:sha
    function getTree(repo, callback){
        var owner = repo.owner,
            repoName = repo.name,
            sha = repo.sha;
        var treeAPI = "https://api.github.com/repos/" + owner + "/" + repoName + "/git/trees/" + sha;
        GM_xmlhttpRequest({
            method: "GET",
            url: treeAPI,
            onload: function (res){
                callback(null, res.responseText);
            },
            onerror: function (res){
                callback(res);
            }
        });
    }

    function getFileRawContent(url, callback){
        // http://swanson.github.com/blog/2011/07/09/digging-around-the-github-v3-api.html
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            headers: {"Accept": "application/vnd.github-blob.raw"},
            onload: function (res){
                callback(null, res.responseText);
            },
            onerror: function (res){
                callback(res);
            }
        });
    }

    // create dependencies
    function createDependenciesList(packageJSON){
        if (!("dependencies" in packageJSON) || isEmptyObject(packageJSON["dependencies"])) {
            return null;
        }
        var list = [];
        var dependencies = packageJSON["dependencies"];
        var keys = Object.keys(dependencies);
        for (var i = 0, len = keys.length; i < len; i++) {
            var packageName = keys[i];
            list.push({
                "name": packageName,
                "url": "https://npmjs.org/package/" + packageName,
                "version": dependencies[packageName]
            });
        }
        return {
            "title": "Dependencies:",
            "list": list
        };
    }


    function createDevDependenciesList(packageJSON){
        if (!("devDependencies" in packageJSON) || isEmptyObject(packageJSON["devDependencies"])) {
            return null;
        }
        var list = [];
        var dependencies = packageJSON["devDependencies"];
        var keys = Object.keys(dependencies);
        for (var i = 0, len = keys.length; i < len; i++) {
            var packageName = keys[i];
            list.push({
                "name": packageName,
                "url": "https://npmjs.org/package/" + packageName,
                "version": dependencies[packageName]
            });
        }
        return {
            "title": "DevDependencies:",
            "list": list
        };
    }
    function createBundledDependenciesList(packageJSON){
        if ((("bundledDependencies" in packageJSON) && isEmptyObject(packageJSON["bundledDependencies"])) ||
            (("bundleDependencies" in packageJSON) && isEmptyObject(packageJSON["bundleDependencies"]))) {
            return null;
        }
        var list = [];
        var dependencies = packageJSON["bundleDependencies"] || packageJSON["bundledDependencies"];
        if(!dependencies){
            return null;
        }
        for (var i = 0, len = dependencies.length; i < len; i++) {
            var packageName = dependencies[i];
            list.push({
                "name": packageName,
                "url": "https://npmjs.org/package/" + packageName,
                "version": "*"
            });
        }
        return {
            "title": "bundledDependencies:",
            "list": list
        };
    }
    /**
     * detect object is empty
     * @param object
     * @returns {boolean}
     */
    function isEmptyObject(object){
        return Object.keys(object).length === 0;
    }

    // "package.json"があるならURLを返す
    function getPackageJSON(json){
        var tree = json["tree"];
        for (var i = 0, len = tree.length; i < len; i++) {
            var obj = tree[i];
            if (obj["type"] === "blob" && obj["path"] === "package.json") {
                return obj["url"];
            }
        }
        return null;
    }

})();