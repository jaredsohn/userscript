// ==UserScript==
// @name        bibsaver
// @namespace   http://oneplus.info
// @include     http://aclweb.org/anthology/*.bib
// @include     http://scholar.google.com/scholar.bib?*
// @description With this script, you are allowed to save bib to a github repo.
// @version     0.0.3
// @require     http://code.jquery.com/jquery-1.10.2.min.js
// @require     https://raw.github.com/michael/github/master/lib/base64.js
// @require     https://raw.github.com/michael/github/master/lib/underscore-min.js
// @require     https://raw.github.com/michael/github/master/github.js
// @require     https://raw.github.com/vkaravir/bib-publication-list/master/lib/BibTex-0.1.2.js
// @grant       none
// ==/UserScript==

var button_element = document.createElement ('div');
button_element.innerHTML = '<button id="bibsaver_save" type="button">save to github</button>';
document.body.appendChild (button_element);

var msg_element = document.createElement('div');
msg_element.setAttribute ('id', 'bibsaver_msg');
document.body.appendChild (msg_element);

var username = "Oneplus";
var password = "password";
var reponame = "bib";
var branchname = "experimental"; // you can use selected branch to save bib

var parser = new BibTex();

var bibElement = document.getElementsByTagName('pre')[0];
var bibText = bibElement.innerHTML;

parser.content = bibText;
parser.parse();

var bibEntryCite = parser["data"][0]["cite"];

var github = new Github({
  username: username,
  password: password
});

var repo = github.getRepo(username, reponame);

var sha = null;
var content = null;


$("#bibsaver_save").click(function(){
    $.get(
        "https://api.github.com/repos/" + username + "/" + reponame + "/git/refs/heads/" + branchname,
        function(data) {
            console.log(data.object.sha);      
            sha = data.object.sha;
            
            $.get(
                "https://api.github.com/repos/" + username + "/" + reponame + "/contents/db.bib?ref=" + branchname,
                function(data) {
                    content = Base64.decode( data.content );
                    entries = $.trim(content).split("\n\n");
                    
                    var has_key = false;

                    for (var i = 0; i < entries.length; ++ i) {
                        parser.content = entries[i];
                        parser.parse();
                        
                        if (parser["data"].length > 0 && parser["data"][0]["cite"] == bibEntryCite) {
                            has_key = true;
                            break;
                        }
                    }
                    
                    if (has_key) {
                        $('#bibsaver_msg').text("This bib has already been saved.");
                    } else {
                        repo.write(branchname, 
                                   "db.bib",
                                   bibText + "\n" + content,
                                   "bib from : " + window.location.href,
                                   function(err) {
                                        if (err) {
                                            $('#bibsaver_msg').text(err);
                                        } else {
                                            $('#bibsaver_msg').text("Successfully save bib to repo.");
                                        }
                                    });
                    }
                });
        });
    });