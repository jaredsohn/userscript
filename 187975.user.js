// ==UserScript==
// @name          Stack Exchange post monitor
// @description   a hacky bugfix of Stack Exchange questions not updating properly. 
// @description   currently fixes the posts not updating their deleted/undeleted status.
// @include       http://*stackexchange.com/*
// @include       http://*stackoverflow.com/*
// @include       http://*mathoverflow.com/*
// @include       http://*serverfault.com/*
// @include       http://*superuser.com/*
// @include       http://*stackapps.com/*
// @include       http://*askubuntu.com/*
// @version       1.9
// ==/UserScript==

(function () {
    
    if(!$.fn.addBack) $.fn.addBack = function(selector){
        return this.andSelf().filter(selector);    
    };

    function UpdateTask(target) {
        this.target = $(target);
	//in case of questions: `closest` will find the parent element.
        //in case of answers inside a close dialog: `closest` will find `div.show-original`
        //in case of answers on a question page: `closest` will find `#mainbar`
        //in case of the 10k tools: nothing can be found
        this.questionId  =  this.target.closest(":has([data-questionid])").find("[data-questionid]").data("questionid");
        this.answerId = this.target.data("answerid");
    }

    UpdateTask.prototype.addSelf = function () {
        var thisTask = this,
            questionIdPromise = $.Deferred();
        updateTasks.push(this);
        updateTasksById[this.answerId || this.questionId] = this;
        if (this.questionId) {
            questionIdPromise.resolve(this.questionId);
        } else {
            //todo: this is ugly as a sin, even for a fallback. Use [the API][1] instead
            //[1]: http://api.stackexchange.com/docs/answers-by-ids
            $.get("/posts/" + this.answerId + "/edit").then(function (response) {
                questionIdPromise.resolve(
                    $(response).find("a.cancel-edit").attr("href").match(/questions\/(\d+)/)[1]
                );
            });
        }
        questionIdPromise.then(function (questionId) {
            if (!updateTasksByQuestionId[questionId]) updateTasksByQuestionId[questionId] = [];
            updateTasksByQuestionId[questionId].push(thisTask);
        });
    };

    UpdateTask.updateAll = function () {
        var visibilityState = document.visibilityState || document.webkitVisibilityState || "visible";
        if (visibilityState === "visible") {
            for (var questionId in updateTasksByQuestionId) {
                var updateTasksForQuestion = updateTasksByQuestionId[questionId];
                if (updateTasksForQuestion.some(function(x){return x.target.is(":visible")})) {
                    $.get("/questions/" + questionId, {
                        dataType: "html"
                    }).then(function (questionId, updateTasksForQuestion, response) {
                        $response = $(response);
                        if($(".pager-answers a", $response).length){
                            console.log("paging not supported");
                            return;
                        }
                        updateTasksForQuestion.forEach(function (updateTask) {
                            var $targetInResponse;
                            if (updateTask.answerId) {
                                $targetInResponse = $("#answer-" + updateTask.answerId, $response);
                            } else {
                                $targetInResponse = $("#question", $response);
                            }
                            //yep, even deleted questions are `.deleted-answer`s.
                            if ($targetInResponse.is(":not(.deleted-answer)")) {
                                updateTask.target.removeClass("deleted-answer");
                            } else {
                                updateTask.target.addClass("deleted-answer");
                            }
                        });
                    }.bind(null, questionId, updateTasksForQuestion))
                    .fail(function (updateTasksForQuestion, jqxhr) {
                        if(jqxhr.status === 404){
                            updateTasksForQuestion.forEach(function(updateTask){
                                updateTask.target.addClass("deleted-answer");
                            })
                        }else if (jqxhr.status > 0){
                            console.log(arguments);
                        }
                    }.bind(null,updateTasksForQuestion));
                }
            }
        }
    };

    ///

    var UPDATE_TARGET_SELECTOR = "div[data-answerid], div[data-questionid]",

        updateTasks = [],
        updateTasksById = {},
        updateTasksByQuestionId = {};

    ///

    $(UPDATE_TARGET_SELECTOR).each(function () {
        new UpdateTask(this).addSelf();
    });

    new MutationObserver(function (records) {
        records.forEach(function (record) {
            $(record.addedNodes)
                .find(UPDATE_TARGET_SELECTOR).addBack(UPDATE_TARGET_SELECTOR)
                .each(function () {
                new UpdateTask(this).addSelf();
            });
        });
    }).observe(document.body, {
        childList: true,
        subtree: true
    });

    setInterval(UpdateTask.updateAll, 10000);
})();
