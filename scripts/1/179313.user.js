// ==UserScript==
// @name GitHubPinger
// @namespace GitHubPinger
// @description Adds some really janky "messaging" on GitHub.
// @include /^https?://github\.com/[0-9A-Za-z]+$/
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @require http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @resource JQueryUIStyle http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @require https://github.com/michael/github/blob/master/lib/underscore-min.js
// @require https://raw.github.com/michael/github/master/lib/base64.js
// @require https://raw.github.com/michael/github/master/github.js
// @grant GM_addStyle
// @grant GM_getResourceText
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @version 0.12
// ==/UserScript==

function loadJQueryUIStyle() {
    GM_addStyle(GM_getResourceText("JQueryUIStyle"));
}

function loggedIn() {
    return $('body').hasClass('logged_in');
}

function getUsername() {
    GM_setValue('ghpTarget', window.location.pathname.replace('/',''));
}

function createMessageDialog() {
    return $(
        "<div id='githubpinger-message-dialog' class='dialog' title='GitHubPinger'>"+
            "<p>Send a message to " + GM_getValue('ghpTarget', 'not_a_user') + "? Please be considerate!</p>"+
            "<form><textarea id='message-body' class='text ui-widget-content' style='width:100%; height:200px;'></textarea></form>"+
        "</div>"
    ).dialog({
        height: 400,
        width: 500,
        modal: true,
        autoOpen: false,
        buttons: {
            "Send (as PR)": function() {
                sendAsPR($('#message-body').val());
                $(this).dialog("close");
            },
            "Clear login stash": function() {
                GM_deleteValue('ghpUsername');
                GM_deleteValue('ghpPassword');
                $(this).dialog("close");
                $('#githubpinger-login-dialog').dialog('open');
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });
}

function sendAsPR(message) {
    var github = connectToGitHub();
    var yourUser = github.getUser();
    yourUser.userRepos(GM_getValue('ghpTarget', 'not_a_user'), function(err, repos) {
        var repo_d;
        for (x=0; x<repos.length; ++x) {
            if (repos[x].owner.login == GM_getValue('ghpTarget', 'not_a_user')) {
                repo_d = repos[x];
                break;
            }
        }
        var repo = github.getRepo(GM_getValue('ghpTarget', 'not_a_user'), repo_d.name);
        console.log(repo_d.name+" will be forked.");
        repo.fork(function(err){
            console.error(err);
        });
        repo.contents('master', '', function(err, contents) {
            if (err) {
                console.error(err);
            } else {
                var msg = $('#message-body').val();
                var timestamp = new Date().getTime();
                var yourRepo = github.getRepo(GM_getValue('ghpUsername', 'not_logged_in'), repo_d.name);
                yourRepo.write(
                    'master',
                    'GitHubPinger-'+timestamp+'.txt',
                    'GitHubPinger Message:\n---------------------\n\n'+msg,
                    "GitHubPinger message from "+GM_getValue('ghpUsername', '???'),
                    function (err) {
                        console.error(err);
                    }
                );
                (function waitForCommitComplete(i) {
                    setTimeout(function () {
                        yourRepo.contents('master', '', function(err, contents) {
                            if (err || i === 0) {
                            } else {
                                if ($.grep(JSON.parse(contents), function(e) {
                                    return e.name == 'GitHubPinger-'+timestamp+'.txt';
                                }).length == 1) {
                                    beCute(yourRepo, repo, $('#message-body').val());
                                } else {
                                    waitForCommitComplete(--i);
                                }
                            }
                        });
                    }, 3000);
                })(10);
            }
        });
    });
}

function createLoginDialog() {
    return $(
        "<div id='githubpinger-login-dialog' class='dialog' title='Authenticate'>"+
            "<p>Authenticate so you can fork a repository (required, unfortunately).</p>"+
            "<form><label style='display:block; float:left;'><input type='text' id='ghp-username' class='text ui-widget-content' style='display:block; position:relative; width:110%;'/>Username</label>"+
            "<label style='display:block; float:right; padding-right:4.5em;'><input type='password' id='ghp-password' class='text ui-widget-content' style='display:block; position:relative; width:110%;'/>Password</label></form>"+
        "</div>"
    ).dialog({
        height:300,
        width:500,
        modal:true,
        autoOpen: false,
        buttons: {
            "Stash login": function() {
                // todo: make this secure as soon as you know how to
                GM_setValue("ghpUsername", $('#ghp-username').val());
                GM_setValue("ghpPassword", $('#ghp-password').val());
                $(this).dialog("close");
                $('#githubpinger-message-dialog').dialog('open');
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        }
    });
}

function clicky() {
    loadJQueryUIStyle();
    createLoginDialog();
    createMessageDialog();
    if (GM_getValue("ghpUsername", "not_logged_in") == "not_logged_in") {
        $('#githubpinger-login-dialog').dialog('open');
    } else {
        $('#githubpinger-message-dialog').dialog('open');
    }
}

function addButton() {
    this.$buttonNode = $('<a>Message</a>');
    $buttonNode.val('href', '');
    $buttonNode.addClass('minibutton');

    $buttonNode.click(clicky);

    $('div .tabnav-right').prepend($buttonNode);
}

function connectToGitHub() {
    var github = new Github({
        username: GM_getValue('ghpUsername', false),
        password: GM_getValue('ghpPassword', false)
    });
    return github;
}

function beCute(yourRepo, theirRepo, msg) {
    theirRepo.createPullRequest(
        {
            title: "GitHubPinger message! Do not merge this ever.",
            body: msg,
            head: GM_getValue('ghpUsername', 'not_logged_in') + ":master",
            base: "master"
        },
        function(err, pullRequest) {
            if (err) {
                alert("Message failed.");
            } else {
                theirRepo.show(function(err, repo) {
                    alert("Message succeeded! You forked "+repo.name+".");
                });
            }
        }
    );
}

function letsGetPinging() {
    if (loggedIn()) {
        getUsername();
        addButton();
    }
}

letsGetPinging();