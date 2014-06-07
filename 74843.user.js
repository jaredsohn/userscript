// ==UserScript==
// @name Hide Questions on Tumblr Dashboard
// @description Will hide the "Ask" questions and responses on your Tumblr dashboard, with a link to show if you do want to read it
// @version 0.2
// @namespace bluemonkcreative
// @copyright 2010, Bill Turner (http://bluemonkcreative.com/)
// @license MIT; http://www.opensource.org/licenses/mit-license.php
// @include http://tumblr.com/dashboard
// @include http://tumblr.com/dashboard/*
// @include http://www.tumblr.com/dashboard
// @include http://www.tumblr.com/dashboard/*
//
// @history   0.2   Will now catch two questions in a row / new way of grabbing Tumblr username
// @history   0.1   Initial Release
//
// ==/UserScript==

var allPosts = document.getElementsByTagName('li');

function check_for_questions()
{
  for (var i = 0; i < allPosts.length; i++)
  {
    if (allPosts[i].innerHTML.match(/post_question/gi))
    {
      if (allPosts[i].style.display != 'none')
      {
        var post_id = allPosts[i].id;

        // Get the tumblrer's name
        var name_xpath = "//li[@id='"+post_id+"']/div[@class='tags']/a[1]";
        var name_link = document.evaluate(name_xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var tumblrer = name_link.snapshotItem(0).innerHTML;
        tumblrer = tumblrer.split(" ")[1];

        // Create the hidden notice
        var hidden_notice = document.createElement('li');
        hidden_notice.className = 'notification single_notification';
        hidden_notice.id = 'notice_' + post_id;
        hidden_notice.innerHTML = '<b>A Q&A post from ' + tumblrer + ' has been hidden. <a href="#" onclick="document.getElementById(\'' + post_id + '\').style.display=\'\'; document.getElementById(\'' + hidden_notice.id + '\').style.display=\'none\'; return false;">Click here</a> to show it.</b>';

        // Hiding - on!
        allPosts[i].parentNode.insertBefore(hidden_notice, allPosts[i].nextSibling);
        allPosts[i].style.display = 'none';
      }
    }
  }
}

//setInterval(check_for_questions, 200); // uncomment this line, and comment out the one below if you're using 'endless scrolling'
check_for_questions();
