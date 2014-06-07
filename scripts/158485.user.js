// ==UserScript==
// @name           PTP Send Points
// @description    Send points to forum post authors
// @version        0.4
//
// @include        *passthepopcorn.me/forums.php?action=viewthread*
// @include        *passthepopcorn.me/forums.php?page=*action=viewthread*
// ==/UserScript==

threadTitle = document.getElementsByTagName('title')[0].innerHTML.split(' :: PassThePopcorn')[0];
ownUserID = document.getElementsByClassName('user-info-bar__link')[0].href.split('id=')[1];
ownUserName = document.getElementsByClassName('user-info-bar__link')[0].innerHTML;
fPT = document.getElementsByClassName('forum_post');
authKey = document.head.innerHTML.split('var authkey = "')[1].split('"')[0];
summary = document.createElement('div');
summary.setAttribute('class', 'box pad');
summary.setAttribute('style', 'text-align: center;');
bp = document.getElementById('reply_box');
bp.parentNode.insertBefore(summary, bp);
regex = new RegExp(ownUserName, 'gi');
amntRegex = new RegExp('[0-9,]+', 'g');

if(!localStorage.amnt)
  localStorage.amnt = false;
if(!localStorage.msg)
  localStorage.msg = false;
if(!localStorage.hat)
  localStorage.hat = false;

var postIDArray = [];
for (var post=0; post<fPT.length; post++)// in fPT)
{
  postID = fPT[post].id;
  if(postIDArray.indexOf(postID) != -1)
  {
    continue;
  }
  uname = fPT[post].getElementsByClassName('username')[0]
  postUserID = uname.href.split('id=')[1];
  postUserName = uname.innerHTML;
  sendSomethingDiv = document.createElement('div');
  sendSomethingDiv.setAttribute('style', 'text-align: center;');
  sendPointsSpan = document.createElement('div');
  sendSomethingDiv.appendChild(sendPointsSpan);
  fPT[post].getElementsByClassName('forum-post__avatar')[0].appendChild(sendSomethingDiv);
  if (postUserID == ownUserID)
  {
    settings_fill(sendPointsSpan);
  }
  else
  {
    postBody = fPT[post].getElementsByClassName('forum-post__body')[0].innerHTML;
    amount = '';
    if(JSON.parse(localStorage.amnt))
    {
      named = postBody.match(regex);
      if(named)
      {
        lines = postBody.split("\n");
        for(var i = lines.length-1; i >= 0; i--)
        {
          if(lines[i].match(regex))
          {
            amountStr = lines[i].match(amntRegex);
            if(amountStr)
            { 
              amount = amountStr[amountStr.length-1].replace(',', '');
              break;
            }
          }
        }
      }
    }

    postLink = fPT[post].getElementsByClassName('forum-post__id')[0].href;
    sPAmount = document.createElement('input');
    sPAmount.setAttribute('type', 'text');
    sPAmount.setAttribute('style', 'background: #555; border-color: #000; width: 75px; height: 22px; text-align: center;');
    sPAmount.setAttribute('title', 'Amount');
    sPAmount.value = amount;
    sPMessage = document.createElement('textarea');
    sPMessage.setAttribute('style', 'background: #555; border-color: #000; width: 75px; height: 22px; text-align: center; float: right;');
    sPMessage.setAttribute('title', 'Message');
    if(JSON.parse(localStorage.msg))
      sPMessage.value = '[url='+postLink+']'+threadTitle+'[/url]';
    sPLink = document.createElement('a');
    sPLink.setAttribute('href', 'javascript:void(0)');
    sPLink.innerHTML = '<b>[Send Points]</b>';
    sPLink.addEventListener('click', send_points.bind( {}, postUserName, sendPointsSpan), false);
    sendPointsSpan.appendChild(sPAmount);
    sendPointsSpan.appendChild(sPMessage);
    sendPointsSpan.appendChild(document.createElement('br'));
    sendPointsSpan.appendChild(sPLink);

    if(JSON.parse(localStorage.hat))
    {
      sendHatsDiv = document.createElement('div');
      sendHatsDiv.setAttribute('style', 'display: none;');
      sendSomethingDiv.appendChild(sendHatsDiv);

      s = document.createElement('span');
      s.innerHTML = ' ';
      sendPointsSpan.appendChild(s);

      sHLink = document.createElement('a');
      sHLink.setAttribute('href', 'javascript:void(0)');
      sHLink.setAttribute('style', 'opacity: 0.5;');
      sHLink.innerHTML = '[Send Hats]';
      sHLink.addEventListener('click', toggle_display.bind( {}, sendPointsSpan, sendHatsDiv), false);
      sendPointsSpan.appendChild(sHLink);

      anonCheck = document.createElement('input');
      anonCheck.type = 'checkbox';
      anonLabel = document.createElement('span');
      anonLabel.innerHTML = ': Anonymous';
      sendHatsDiv.appendChild(anonCheck);
      sendHatsDiv.appendChild(anonLabel);
      sendHatsDiv.appendChild(document.createElement('br'));

      cost = document.createElement('span');
      cost.innerHTML = 'Cost: 75,000';

      days = document.createElement('input');
      days.type = 'number';
      days.value = '1';
      days.addEventListener('change', changeCost.bind( {}, cost, days), false);
      days.setAttribute('style', 'background: #555; border-color: #000; width: 2em; height: 16px; text-align: center;');
      daysLabel = document.createElement('span');
      daysLabel.innerHTML = ': Days';
      sendHatsDiv.appendChild(days);
      sendHatsDiv.appendChild(daysLabel);
      sendHatsDiv.appendChild(document.createElement('br'));

      hatMessage = document.createElement('textarea');
      hatMessage.setAttribute('style', 'background: #555; border-color: #000; height: 16px; width: 130px; text-align: center;');
      hatMessage.setAttribute('title', 'Message');
      sendHatsDiv.appendChild(hatMessage);
      sendHatsDiv.appendChild(document.createElement('br'));

      sPLink2 = document.createElement('a');
      sPLink2.setAttribute('href', 'javascript:void(0)');
      sPLink2.innerHTML = '[Send Points]';
      sPLink2.setAttribute('style', 'opacity: 0.5;');
      sPLink2.addEventListener('click', toggle_display.bind( {}, sendPointsSpan, sendHatsDiv), false);
      sHLink2 = document.createElement('a');
      sHLink2.setAttribute('href', 'javascript:void(0)');
      sHLink2.innerHTML = '<b>[Send Hats]</b>';
      sHLink2.addEventListener('click', send_hat.bind( {}, postUserID, sendHatsDiv), false);
      sendHatsDiv.appendChild(sPLink2);
      sendHatsDiv.appendChild(sHLink2);
      sendHatsDiv.appendChild(document.createElement('br'));
      sendHatsDiv.appendChild(cost);
    }
  }
  postIDArray.push(postID);
}

function changeCost(cost, days)
{
  cost.innerHTML = 'Cost: '+(75000*parseInt(days.value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");// 75,000 multiplied by days, replace/comma separate result
}

function toggle_display(sendPointsSpan, sendHatsDiv)
{
  if(sendPointsSpan.getAttribute('hidden') != "true")
  {
    sendPointsSpan.setAttribute('style', 'display: none;');
    sendHatsDiv.setAttribute('style', 'display: block;');
    sendPointsSpan.setAttribute('hidden', true);
  }
  else
  {
    sendPointsSpan.setAttribute('style', 'display: block;');
    sendHatsDiv.setAttribute('style', 'display: none;');
    sendPointsSpan.setAttribute('hidden', false);
  }
}

function settings_fill(span)
{
    settingsLink = document.createElement('a');
    settingsLink.setAttribute('href', 'javascript:void(0)');
    settingsLink.addEventListener('click', settings.bind( {}, span), false);
    settingsLink.innerHTML = '[Send Points Settings]';
    span.appendChild(settingsLink);
}

function settings(span)
{
  span.innerHTML = '';
  div = document.createElement('div');
  div.setAttribute('style', 'text-align: left;');
  span.appendChild(div);

  amnt = JSON.parse(localStorage.amnt);
  amntPrefillCheck = document.createElement('input');
  amntPrefillCheck.type = 'checkbox';
  amntPrefillCheck.checked = amnt;
  amntPrefillLabel = document.createElement('span');
  amntPrefillLabel.innerHTML = ': Prefill amount';
  div.appendChild(amntPrefillCheck);
  div.appendChild(amntPrefillLabel);
  div.appendChild(document.createElement('br'));

  msg = JSON.parse(localStorage.msg);
  msgPrefillCheck = document.createElement('input');
  msgPrefillCheck.type = 'checkbox';
  msgPrefillCheck.checked = msg;
  msgPrefillLabel = document.createElement('span');
  msgPrefillLabel.innerHTML = ': Prefill message';
  div.appendChild(msgPrefillCheck);
  div.appendChild(msgPrefillLabel);
  div.appendChild(document.createElement('br'));

  hat = JSON.parse(localStorage.hat);
  hatCheck = document.createElement('input');
  hatCheck.type = 'checkbox';
  hatCheck.checked = hat;
  hatLabel = document.createElement('span');
  hatLabel.innerHTML = ': Send hats';
  div.appendChild(hatCheck);
  div.appendChild(hatLabel);
  div.appendChild(document.createElement('br'));

  saveLink = document.createElement('a');
  saveLink.setAttribute('href', 'javascript:void(0)');
  saveLink.innerHTML = '[Save]';
  saveLink.addEventListener('click', save_settings.bind( {}, span), false);
  span.appendChild(document.createElement('br'));
  span.appendChild(saveLink);
}

function save_settings(span)
{
  checks = span.getElementsByTagName('input');
  localStorage.amnt = checks[0].checked;
  localStorage.msg = checks[1].checked;
  localStorage.hat = checks[2].checked;
  span.innerHTML = '';
  settings_fill(span);
}

function send_points(username, span)
{
	amount = span.getElementsByTagName('input')[0].value;
	message = encodeURIComponent(span.getElementsByTagName('textarea')[0].value);
	span.innerHTML = '[Sending Points]';
	GM_xmlhttpRequest({
		method: "POST",
		url: "bonus.php?action=send",
		data: "auth=" + authKey + "&username=" + username + "&amount=" + amount + "&message=" + message,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
      mess = response.responseText.split('color: red;text-align:center;">');
      if(mess.length < 2)
      {
        document.body.innerHTML = '<p>Failed to send points, hopefully this page has the error message as to why. If the message is that you need cookies enabled, turn on 3rd party cookies.</p>' + response.responseText;
      } else
      {
			  span.innerHTML = '[Points Sent]';
			  summary.innerHTML += response.responseText.split('color: red;text-align:center;">')[1].split('</p>')[0] + '<br />';
      }
		}
	});
}

function send_hat(userID, span)
{
  inputs = span.getElementsByTagName('input');
  anonymous = inputs[0].checked
  days = inputs[1].value;
  message = encodeURIComponent(span.getElementsByTagName('textarea')[0].value);
  postData = 'extra={"mult":' + days + ',"anon":' + anonymous + ',"user":' + userID;
  if(message == '')
    postData += ',"comm": false}';
  else
    postData += ',"comm":"' + message + '"}';
  postData += '&addpoints=' + (75000*(parseInt(days))).toString();
  span.innerHTML = '[Sending Hat]';
  GM_xmlhttpRequest({
    method: "POST",
    url: "bonus.php?action=purchase&type=9&itemid=26&confirm=1",
    data: postData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    onload: function(response) {
      span.innerHTML = '[Hat Sent]';
      summary.innerHTML += response.responseText.split('color: red;text-align:center;">')[1].split('</p>')[0] + '<br />';
    }
  });
}

Function.prototype.bind = function ( thisObject ) {
	var method = this;
	var oldargs = [].slice.call( arguments, 1);
	return function () {
		var newargs = [].slice.call( arguments );
		return method.apply( thisObject, oldargs.concat( newargs ));
	};
}
