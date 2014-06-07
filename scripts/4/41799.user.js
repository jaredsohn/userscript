
// ==UserScript==
// @name           Troll Filter for vB v1.0 beta
// @namespace      http://footabulous.com/trollfilter
// @include        http://forums.digitalpoint.com/*
// ==/UserScript==

//(function() {

var defaultReplacement = 'King Troll Here!!!';

// Usernames should be all lower case.
var badUsers = {

'example_user_1': defaultReplacement,

'example_user_2': '<span style="font-size: 150%; font-weight: bold; color: #ff0000;">I\'m a goob!!!</span>',

'example_user_3': '<img src="http://i235.photobucket.com/albums/ee120/raacchheelll_photos/RickRoll.gif" />'

};

var tableList = document.getElementsByTagName('TABLE');

var postElemsToReplace = new Array;
var aList = new Array;
var postID, i;

for (i in tableList)
{
  if (/post\d+/.test(tableList[i].id))
  {
    aList = tableList[i].getElementsByTagName('A');

    for (var j in aList)
    {
      if (aList[j].className == 'bigusername')
      {
        if( aList[j].innerHTML.toLowerCase() in badUsers)
        {
          postID = 'td_post_'+tableList[i].id.match(/\w+?(\d+)/)[1];

          postElemsToReplace.push({element:postID, user:aList[j].innerHTML.toLowerCase()});
        }
      }
    }
  }
}

for (i in postElemsToReplace)
{
  var postMessageEl = document.getElementById(postElemsToReplace[i]['element']);

  postMessageEl.innerHTML = badUsers[postElemsToReplace[i]['user']];
}

//})();

