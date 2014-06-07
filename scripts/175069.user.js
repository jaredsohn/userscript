// ==UserScript==
// @name          Zhihu muter
// @namespace     https://twitter.com/ahxxm
// @description   Clean up.
// @include       http://*.zhihu.com/*
// @version 	  0.1

// ==/UserScript==


/*
CHANGELOG
0.1  Aug 1, 2013 initial version
TODO {
    “你可能不想认识的人”的bug
    评论里的遮蔽
    相关问题：其实这可能不算todo，因为若对一个话题感兴趣，也许能忽略这种提问方式。
    存储和修改mutelist，打包上传到google store / 直接用userscripts安装后生效 -> @updateURL     https://userscripts.org/ *
}
*/

// define id and keyword list
var mutelist = ["yolfilm", "佐藤謙一", "柳如婳",  ,"Lawrence Li", "罗威"];
var keywords = ["如何评价", "怎么评价", "如何优雅","怎么优雅", "如何看待", "怎么看待"] // #这些人有病吧

// much thanks to  @CMS http://stackoverflow.com/questions/1933602/how-to-getelementbyclass-instead-of-getelementbyid-with-javascript
// but there's already a getElementsByClassName function... 


// 1. answer page
// 1.1 answers
function no_more_hurted_face(className, tomute) {
    var elements = document.getElementsByClassName(className);
    n = elements.length;
    for (var i = 0; i < n; i++) {
        var e = elements[i];
        for (var j = 0,len = tomute.length; j < len; j++){
            var muteword = tomute[j] + '</a>'; // in case that other answers have mute id(s) in it
            if (e.innerHTML.search(muteword) > -1) {
                e.style.display = 'none';
            }
        }
    }
}

// 1.2 relating questions (bug inside!)
function relate_but_undirectlookable(){
    var related_questions = document.getElementsByClassName('question_link');
    var rqlength = related_questions.length;
    var keylength = keywords.length;

    for (var i = 0; i < rqlength; i++) {
        var question = related_questions[i];
        for (var j = 0; j < keylength; j++) {
            if (question.innerHTML.search(keywords[j]) > -1){
                question.style.display = 'none';
            }
        }
    }
}


// 2. timeline
// 2.1 answers

// title 
function toggle_title(className, tomute) {
    var elements = document.getElementsByClassName(className);
    n = elements.length;
    for (var i = 0; i < n; i++) {
        var e = elements[i];
        for (var j = 0,len = tomute.length; j < len; j++){
            var muteword = tomute[j]
            if (e.innerHTML.search(muteword) > -1) {
                e.style.display = 'none';
            }
        }
    }
}

// 2.2 people you may know
function people_you_may_not_want_to_know(){
    var recommended = document.getElementById('zh-trendings').firstChild.childNodes;
    var reclength = recommended.length;
    n = mutelist.length;

    for (var i = 0; i < reclength; i++){
        people = recommended[i];
        for (var j = 0; j < n; j++) {
            var mutepeople = mutelist[j];
            if ( people.innerHTML.search(mutepeople) = -1){
                people.style.display = "none";
            }
        }
    }
}


// put them together
function timeline_optimize(){
    // annoying ids
    no_more_hurted_face('feed-item folding feed-item-hook feed-item-a', mutelist) // answers
    no_more_hurted_face('feed-item folding feed-item-hook feed-item-p', mutelist) // articles
    no_more_hurted_face('feed-item folding feed-item-hook feed-item-q', mutelist) // question following

    // annoying titles
    toggle_title('feed-item folding feed-item-hook feed-item-a', keywords);

    // annoying recommendations
    people_you_may_not_want_to_know();
}


// 3.local storage [too lazy]TODO 

// main function
// get current url to decide what to do
hrefValue = window.location.href; 

if (hrefValue.search('question') > -1){
    no_more_hurted_face('zm-item-answer', mutelist);
    // relate_but_undirectlookable();
    }
    else{
        timeline_optimize();
    }