// ==UserScript==
// @name           Old Livejournal Polls
// @namespace      http://userscripts.omer.bar-or.org/
// @description    Allows users with old LiveJournal accounts to add polls to their journals. Adds a new button to "Add a Poll" when posting in HTML mode.
// @include        http://www.livejournal.com/update.bml
// ==/UserScript==

function OldLiveJournalPollsQuestion(id) {
  this.id = id;
  this.prev = null;
  this.next = null;
  this.maxOptionId = 0;
  this.container = document.createElement("div");
  this.optionsList = document.createElement("ul");
  this.titleInput = document.createElement("input");
  this.typeSelect = document.createElement("select");
  this.appendOption = function(option)
  {
    this.optionsList.appendChild(option);
  }
  this.toHTML = function(prefix)
  {
    var html = '';
    html += prefix+'<h3>'+this.titleInput.value+'</h3>\n';
    var isRadio = (this.typeSelect.selectedIndex == 0);
    if(isRadio)
    {
      html += this.toHTMLRadio(prefix);
    }
    else
    {
      html += this.toHTMLCheckbox(prefix);
    }
    return html;
  }
  this.toDisplayHTML = function(poll_id,prefix)
  {
    var html = '';
    html += prefix+'<h3>'+this.titleInput.value+'</h3>\n';
    html += prefix+'<ul style="list-style-type: none;">\n';
    for(var i = 0; i < this.optionsList.childNodes.length; i++)
    {
      var option = this.optionsList.childNodes[i];
      var optionInput = option.getElementsByTagName('input')[0];
      if(optionInput.value.trim() != '')
      {
        var pollValue = optionInput.getAttribute('data-id');
        html += prefix+'  <li>'+optionInput.value+'\n';
        html += prefix+'    <img title="results for this option" alt="results for this option" src="'+OldLiveJournalPolls.defaults.showPollURL+'?poll_id='+poll_id+'&question_id='+this.id+'&option_id='+pollValue+'">\n';
        html += prefix+'  </li>\n';
      }
    }
    html += prefix+'</ul>\n';
    return html;
  }
  this.toHTMLRadio = function(prefix)
  {
    var html = prefix+'<ul style="list-style-type: none;">\n';
    for(var i = 0; i < this.optionsList.childNodes.length; i++)
    {
      var option = this.optionsList.childNodes[i];
      var optionInput = option.getElementsByTagName('input')[0];
      if(optionInput.value.trim() != '')
      {
        var pollValue = optionInput.getAttribute('data-id');
        var pollId = 'Poll_'+this.id+'_'+pollValue;
        html += prefix+'  <li><input type="radio" id="'+pollId+'" value="'+pollValue+'" name="question_'+this.id+'"><label for="'+pollId+'">'+optionInput.value+'</label></li>\n';
      }
    }
    html += prefix+'</ul>\n';
    return html;
  }
  this.toHTMLCheckbox = function(prefix)
  {
    var html = prefix+'<ul style="list-style-type: none;">\n';
    for(var i = 0; i < this.optionsList.childNodes.length; i++)
    {
      var option = this.optionsList.childNodes[i];
      var optionInput = option.getElementsByTagName('input')[0];
      if(optionInput.value.trim() != '')
      {
        var pollId = 'Poll_'+this.id+'_'+optionInput.getAttribute('data-id');
        var pollName = 'question_'+this.id+'_'+optionInput.getAttribute('data-id');
        html += prefix+'  <li><input type="checkbox" id="'+pollId+'" name="'+pollName+'"><label for="'+pollId+'">'+optionInput.value+'</label></li>\n';
      }
    }
    html += prefix+'</ul>\n';
    return html;
  }
}

OldLiveJournalPolls = {};

OldLiveJournalPolls.defaults = {};
OldLiveJournalPolls.defaults.numOptions = 4;
OldLiveJournalPolls.defaults.questionContainerFollowerId = "OldLiveJournalPollsQuestionContainerFollower";
OldLiveJournalPolls.defaults.createPollURL = "http://userscripts.omer.bar-or.org/old_livejournal_polls/create_poll.php";
OldLiveJournalPolls.defaults.submitPollURL = "http://userscripts.omer.bar-or.org/old_livejournal_polls/submit_poll.php";
OldLiveJournalPolls.defaults.showPollURL = "http://userscripts.omer.bar-or.org/old_livejournal_polls/show_poll.php";
OldLiveJournalPolls.defaults.defaultHeaders = {
  'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
  'Content-type': 'application/x-www-form-urlencoded',
  'Accept': 'text/json'
};
OldLiveJournalPolls.defaults.showLink = "javascript:void(0);"

OldLiveJournalPolls.reset = function()
{
  OldLiveJournalPolls.showingPollCreator = false;
  if(OldLiveJournalPolls.pollCreator)
  {
    delete OldLiveJournalPolls.pollCreator;
  }
  OldLiveJournalPolls.pollCreator = null;

  if(OldLiveJournalPolls.questions)
  {
    delete OldLiveJournalPolls.questions;
  }
  OldLiveJournalPolls.questions = new Array();
  OldLiveJournalPolls.currentQuestion = 0;

  if(OldLiveJournalPolls.createForm)
  {
    delete OldLiveJournalPolls.createForm;
  }
  OldLiveJournalPolls.createForm = null;

  OldLiveJournalPolls.maxQuestionId=0;
  OldLiveJournalPolls.prevQuestionAnchor = null;
  OldLiveJournalPolls.nextQuestionAnchor = null;
}

OldLiveJournalPolls.addLink = function()
{
  var toolsDiv = document.getElementById("htmltools");
  if(toolsDiv)
  {
    var toolsUl = toolsDiv.getElementsByTagName("ul")[0];
    var link = document.createElement("li");
    var anchor = document.createElement("a");
    var text = document.createTextNode("Add Poll");
    anchor.appendChild(text);
    anchor.addEventListener("click", function () {
      OldLiveJournalPolls.showPollCreator(window);
      return false;
    },true);
    anchor.setAttribute("href",OldLiveJournalPolls.defaults.showLink);
    anchor.setAttribute("style","background: transparent url(/stc/fck/editor/plugins/livejournal/lj_strip.png) no-repeat scroll 0 -48px; padding-left: 24px;");
    link.appendChild(anchor);
    link.setAttribute("class","poll");
    toolsUl.appendChild(link);
  }
  /*
  else
  {
    var toolbar = document.getElementById("xToolbar");
    if(toolbar)
    {
      var divs = toolbar.getElementsByTagName("div");
      for(var i = 0; i < divs.length; i++)
      {
        var div = divs[i];
        if(div.title == "LiveJournal Poll")
        {
          div.getElementsByTagName("img")[0].addEventListener("click", function (e) {
            e.stopPropagation();
            OldLiveJournalPolls.showPollCreator(window.parent);
          },false);
          break;
        }
      }
    }
  }
  */
}
OldLiveJournalPolls.showPollCreator = function(win)
{
  var div = document.createElement("div");
  div.setAttribute("class","ippu lj_ippu");
  div.setAttribute("style","position: fixed; z-index: 1000; width: 60%; height: auto; left: 257px; top: 81px;");
  var titleDiv = OldLiveJournalPolls.createTitleDiv(win);
  var formDiv = OldLiveJournalPolls.createFormDiv(win);
  div.appendChild(titleDiv);
  div.appendChild(formDiv);
  OldLiveJournalPolls.showingPollCreator = true;
  OldLiveJournalPolls.pollCreator = div;
  win.document.body.appendChild(div);
}
OldLiveJournalPolls.dropPollCreator = function(win)
{
  if(OldLiveJournalPolls.showingPollCreator)
  {
    win.document.body.removeChild(OldLiveJournalPolls.pollCreator);
  }
  OldLiveJournalPolls.reset();
}
OldLiveJournalPolls.createTitleDiv = function(win)
{
  var title = document.createElement("div");
  title.setAttribute("class","lj_ippu_titlebar");
  title.setAttribute("style", "width: 100%;");
  var cancel = document.createElement("div");
  cancel.setAttribute("style","float: right; padding-right: 8px;");
  var cancelImg = document.createElement("img");
  cancelImg.setAttribute("height","15");
  cancelImg.setAttribute("width","15");
  cancelImg.setAttribute("src","http://l-stat.livejournal.com/img/CloseButton.gif");
  cancelImg.addEventListener("click",function() { OldLiveJournalPolls.dropPollCreator(win) },false);
  cancel.appendChild(cancelImg);
  title.appendChild(cancel);
  title.appendChild(document.createTextNode("Insert New Poll"));
  return title;
}
OldLiveJournalPolls.createFormDiv = function(win)
{
  var formDiv = document.createElement("div");
  var questionNavigator = document.createElement("div");
  var prevQuestionAnchor = document.createElement("a");
  prevQuestionAnchor.removeAttribute("href");
  prevQuestionAnchor.innerHTML = "&larr; Previous question";
  prevQuestionAnchor.addEventListener("click",function() {
      var prevQuestion = OldLiveJournalPolls.questions[OldLiveJournalPolls.currentQuestion].prev;
      if(prevQuestion != null)
      {
        OldLiveJournalPolls.switchQuestion(prevQuestion);
      }
      },false);
  OldLiveJournalPolls.prevQuestionAnchor = prevQuestionAnchor;
  var nextQuestionAnchor = document.createElement("a");
  nextQuestionAnchor.removeAttribute("href");
  nextQuestionAnchor.innerHTML = "Next question &rarr;";
  nextQuestionAnchor.addEventListener("click",function() {
      var nextQuestion = OldLiveJournalPolls.questions[OldLiveJournalPolls.currentQuestion].next;
      if(nextQuestion != null)
      {
        OldLiveJournalPolls.switchQuestion(nextQuestion);
      }
      },false);
  OldLiveJournalPolls.nextQuestionAnchor = nextQuestionAnchor;
  questionNavigator.appendChild(prevQuestionAnchor);
  questionNavigator.appendChild(document.createTextNode(" | "));
  questionNavigator.appendChild(nextQuestionAnchor);

  var addQuestionDiv = document.createElement("div");
  addQuestionDiv.setAttribute("style","float:right;");
  var addQuestionButton = document.createElement("input");
  addQuestionButton.setAttribute("type","button");
  addQuestionButton.setAttribute("value","Add Question");
  addQuestionButton.addEventListener("click",function() {
      var question = OldLiveJournalPolls.createFormQuestion(win,OldLiveJournalPolls.maxQuestionId);
      OldLiveJournalPolls.maxQuestionId++;
      },false);
  addQuestionDiv.appendChild(addQuestionButton);
  questionNavigator.appendChild(addQuestionDiv);
  formDiv.appendChild(questionNavigator);
  OldLiveJournalPolls.createForm = document.createElement("form");
  form = OldLiveJournalPolls.createForm;
  form.setAttribute("style","clear: both;");
  var newOption = document.createElement("a");
  newOption.id = OldLiveJournalPolls.defaults.questionContainerFollowerId;
  newOption.setAttribute("href",OldLiveJournalPolls.defaults.showLink);
  newOption.addEventListener("click",function () {
        var question = OldLiveJournalPolls.questions[OldLiveJournalPolls.currentQuestion];
        var option = OldLiveJournalPolls.createFormOption(win,1,question.maxOptionId);
        question.appendOption(option);
        question.maxOptionId++;
      },false);
  newOption.appendChild(document.createTextNode("Add Option"));
  form.appendChild(newOption);
  var submit = document.createElement("input");
  submit.setAttribute("type","button");
  submit.setAttribute("name","submit");
  submit.setAttribute("value","Submit");
  submit.addEventListener("click", function(e) {
      OldLiveJournalPolls.submitForm(win);
      }, false);
  form.appendChild(submit);

  OldLiveJournalPolls.maxQuestionId=1;
  var question1 = OldLiveJournalPolls.createFormQuestion(win,OldLiveJournalPolls.maxQuestionId);
  OldLiveJournalPolls.maxQuestionId++;
  formDiv.appendChild(form);
  return formDiv;
}
OldLiveJournalPolls.createFormQuestion = function(win,questionId)
{
  var question = new OldLiveJournalPollsQuestion(questionId);
  var titleLabel = document.createElement("label");
  titleLabel.setAttribute("for","OldLiveJournalPollsTitle_"+questionId);
  titleLabel.appendChild(document.createTextNode("Title: "));
  question.container.appendChild(titleLabel);
  question.titleInput.setAttribute("type","text");
  question.titleInput.setAttribute("name","title_"+questionId);
  question.titleInput.setAttribute("id","OldLiveJournalPollsTitle_"+questionId);
  question.container.appendChild(question.titleInput);
  var typeDiv = document.createElement("div");
  var typeLabel = document.createElement("label");
  typeLabel.setAttribute("for","OldLiveJournalPollsType_"+questionId);
  typeLabel.appendChild(document.createTextNode("Question Type: "));
  typeDiv.appendChild(typeLabel);
  question.typeSelect.options[0] = new Option("Radio Buttons","radio",true,true);
  question.typeSelect.options[1] = new Option("Check Boxes","check",false,false);
  typeDiv.appendChild(question.typeSelect);
  question.container.appendChild(typeDiv);
  var optionsDiv = document.createElement("div");
  optionsDiv.appendChild(document.createTextNode("Options:"));
  for(var i = 1; i <= OldLiveJournalPolls.defaults.numOptions; i++)
  {
    var option = OldLiveJournalPolls.createFormOption(win,questionId,i);
    question.optionsList.appendChild(option);
  }
  question.maxOptionId = OldLiveJournalPolls.defaults.numOptions+1;
  optionsDiv.appendChild(question.optionsList);
  question.container.appendChild(optionsDiv);
  if(OldLiveJournalPolls.currentQuestion != 0)
  {
    var curQuestion = OldLiveJournalPolls.questions[OldLiveJournalPolls.currentQuestion];
    question.next = curQuestion.next;
    curQuestion.next = question;
    if(question.next)
      question.next.prev = question;
    question.prev = curQuestion;
  }
  OldLiveJournalPolls.questions[questionId] = question;
  OldLiveJournalPolls.switchQuestion(question);
  return question;
}
OldLiveJournalPolls.switchQuestion = function(question)
{
  var form = OldLiveJournalPolls.createForm;
  var questionFollower = null;
  for(var i = 0; i < form.childNodes.length; i++)
  {
    if(form.childNodes[i].id == OldLiveJournalPolls.defaults.questionContainerFollowerId)
    {
      questionFollower = form.childNodes[i];
      break;
    }
  }
  if(questionFollower == null)
  {
    GM_log("BUG! No Question Follower...");
    return;
  }
  if(OldLiveJournalPolls.currentQuestion != 0)
  {
    form.removeChild(OldLiveJournalPolls.questions[OldLiveJournalPolls.currentQuestion].container);
  }
  form.insertBefore(question.container,questionFollower);
  OldLiveJournalPolls.currentQuestion = question.id;
  if(question.prev == null)
    OldLiveJournalPolls.prevQuestionAnchor.removeAttribute("href");
  else
    OldLiveJournalPolls.prevQuestionAnchor.setAttribute("href",OldLiveJournalPolls.defaults.showLink);
  if(question.next == null)
    OldLiveJournalPolls.nextQuestionAnchor.removeAttribute("href");
  else
    OldLiveJournalPolls.nextQuestionAnchor.setAttribute("href",OldLiveJournalPolls.defaults.showLink);
}
OldLiveJournalPolls.createFormOption = function(win,question,option)
{
  var li = document.createElement("li");
  li.setAttribute("id","OldLiveJournalPollsOption_"+question+"_"+option);
  var input = document.createElement("input");
  input.setAttribute("type","text");
  input.setAttribute("name","option_"+question+"_"+option);
  input.setAttribute("data-id",option);
  li.appendChild(input);
  var cancelImg = document.createElement("img");
  cancelImg.setAttribute("height","15");
  cancelImg.setAttribute("width","15");
  cancelImg.setAttribute("style","background-color: #444444");
  cancelImg.setAttribute("src","http://l-stat.livejournal.com/img/CloseButton.gif");
  cancelImg.addEventListener("click",
      function() {
        var opt = win.document.getElementById("OldLiveJournalPollsOption_"+question+"_"+option);
        opt.parentNode.removeChild(opt);
        }
      ,false);
  li.appendChild(cancelImg);
  return li;
}
OldLiveJournalPolls.submitForm = function(win)
{
  var description = OldLiveJournalPolls.getDescription();
  if(description == '')
  {
    alert("Please include at least one question!");
    return;
  }
  var urldata = 'username='+encodeURIComponent(OldLiveJournalPolls.getUsername());
  urldata += '&description='+encodeURIComponent(description);
  GM_xmlhttpRequest({
    method: 'POST',
    url: OldLiveJournalPolls.defaults.createPollURL,
    headers: OldLiveJournalPolls.defaults.defaultHeaders,
    data: urldata,
    onload: function(response) {
      if(response.status == 200)
      {
        var id = response.responseText.trim();
        OldLiveJournalPolls.insertForm(id);
        OldLiveJournalPolls.insertResults(id);
        OldLiveJournalPolls.dropPollCreator(win);
      }
      else
      {
        alert("Server-side error: " + response.statusText);
        GM_log("GOT ERROR RESPONSE: " + response.status + " " + response.statusText + " " + response.responseText);
      }
    },
    onerror: function(response) {
      alert("Server-side error: " + response.statusText);
      GM_log("GOT ERROR RESPONSE: " + response.status + " " + response.statusText + " " + response.responseText);
    }
  });
}
OldLiveJournalPolls.insertForm = function(id)
{
  var draft = document.getElementById("draft");

  var currQuestion = OldLiveJournalPolls.getFirstQuestion();

  var formHTML = '\n<form method="post" action="'+OldLiveJournalPolls.defaults.submitPollURL+'">\n';
  formHTML += '  <ul style="list-style-type: none;">\n';
  while(currQuestion != null)
  {
    if(currQuestion.titleInput.value.trim() != '')
    {
      formHTML += '    <li>\n';
      formHTML += currQuestion.toHTML('      ');
      formHTML += '    </li>\n';
    }
    currQuestion = currQuestion.next;
  }
  formHTML += '  </ul>\n';
  formHTML += '  <input type="hidden" value="'+id+'" name="poll_id">\n';
  formHTML += '  <input type="submit" value="Submit!" name="submit">\n';
  formHTML += '</form>\n';

  draft.value += formHTML;
}
OldLiveJournalPolls.insertResults = function(id)
{
  var draft = document.getElementById("draft");
  var currQuestion = OldLiveJournalPolls.getFirstQuestion();
  var html = '<a href="#" name="Poll_'+id+'_results"></a>\n';
  html += '<ul style="list-style-type: none;">\n';
  while(currQuestion != null)
  {
    if(currQuestion.titleInput.value.trim() != '')
    {
      html += '  <li>\n';
      html += currQuestion.toDisplayHTML(id,'    ');
      html += '  </li>\n';
    }
    currQuestion = currQuestion.next;
  }
  html += '</ul>\n';
  draft.value += html;
  
}
OldLiveJournalPolls.getFirstQuestion = function()
{
  var currQuestion = OldLiveJournalPolls.questions[OldLiveJournalPolls.currentQuestion];
  while(currQuestion.prev != null)
  {
    currQuestion = currQuestion.prev;
  }
  return currQuestion;
}
OldLiveJournalPolls.getDescription = function()
{
  var titles = new Array();
  var currQuestion = OldLiveJournalPolls.getFirstQuestion();
  while(currQuestion != null)
  {
    var titleInput = currQuestion.titleInput;
    if(titleInput.value.trim() != '')
    {
      titles.push(titleInput.value);
    }
    currQuestion = currQuestion.next;
  }
  return titles.join(', ');
}
OldLiveJournalPolls.getUsername = function()
{
  var usernameContainer = document.getElementById("current_username");
  return usernameContainer.innerHTML;
}
window.addEventListener("load", function(e)
    {
    OldLiveJournalPolls.reset();
    OldLiveJournalPolls.addLink();
    }, true);
