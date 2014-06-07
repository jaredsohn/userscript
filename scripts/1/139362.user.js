// ==UserScript==
// @name       eMsg
// @version    1.0.0
// @ori author   eCitizen Elonid
// @edit author  eCitizen -
// @link       http://userscripts.org/scripts/review/139362
// @include    http://www.erepublik.com/*
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

function loadHTML(sURL, onReady)
{
  var request = CreateRequest();

  if (request != "")
  { 
    // делаем запрос
    request.open('GET', sURL, false);
    request.send();

    // возвращаем текст
    return request.responseText;
  }
  return "";
}

function CreateRequest()
{
  var request=null;

  // пытаемся создать объект для MSXML 2 и старше
  if(!request) try {
    request=new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e){}

  // не вышло... попробуем для MSXML 1
  if(!request) try {
    request=new ActiveXObject('Microsoft.XMLHTTP');
  } catch (e){}

  // не вышло... попробуем для Mozilla
  if(!request) try {
    request=new XMLHttpRequest();
  } catch (e){}

  if(!request)
    // ничего не получилось...
    return "";
  return request;
}

function SendMessage(from, to, subject, message)
{
  var token = getToken();
  var cookie = document.cookie;

  var request = CreateRequest();

  alert('1 CreateRequest');

  var params = '_token=' + token + '&citizen_name=' + to + '&citizen_subject=' + subject + '&citizen_message=' + message;

  request.open('POST', '/en/main/messages-compose/' + to, true);

  request.setRequestHeader('Host', 'www.erepublik.com');
  request.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; rv:13.0) Gecko/20100101 Firefox/13.0.1');
  request.setRequestHeader('Accept', 'text/html, */*');
  request.setRequestHeader('Accept-Language', 'ru-ru,ru;q=0.8,en-us;q=0.5,en;q=0.3');
  request.setRequestHeader('Accept-Encoding', 'gzip, deflate');
  request.setRequestHeader('Connection', 'keep-alive');
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.setRequestHeader('Referer', 'http://www.erepublik.com/en/main/messages-compose/' + from);
  request.setRequestHeader('Pragma', 'no-cache');
  request.setRequestHeader('Cookie', document.cookies);
  request.setRequestHeader('Cache-Control', 'no-cache');

  //alert('2 request.setRequestHeader');

  request.send(params);

  //GM_xmlhttpRequest({
  //    method: "POST",
  //    url: 'http://www.erepublik.com/en/main/messages-compose/' + to,
  //    data: params,
  //    headers: {
  //        'Host' : 'www.erepublik.com',
  //        'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; rv:13.0) Gecko/20100101 Firefox/13.0.1',
  //        'Accept' : 'text/html, */*',
  //        'Accept-Language' : 'ru-ru,ru;q=0.8,en-us;q=0.5,en;q=0.3',
  //        'Accept-Encoding' : 'gzip, deflate',
  //        'Cookie' : cookie,
  //        'Referer' : 'http://www.erepublik.com/en/main/messages-compose/' + from
  //    },
  //    onload: function(response) {
  //      alert(response.responseText);
  //    }
  //});
    
  alert('3 request.send');
}

function getToken()
{
	var html = loadHTML('/en/military/campaigns');
	var regEx = /value="\S{32,32}"/;
	var token = regEx.exec(html) + "";
	return token.replace(/value="/g,'').replace(/"/g,'');
}

function setToken()
{
}

unsafeWindow.jQuery.fn.btnSendClick = function()
{
	try{
		var members = [];

		/*if (document.getElementById('party').checked) {
			members = $.fn.getPartyMembers(document.getElementById('party').value);
		}
		else if (document.getElementById('KA').checked) {
			var index = document.getElementById('regiments').selectedIndex;
			var items = document.getElementById('regiments').options;
			members = $.fn.getRegimentMembers(items[index].value);
		}
		else*/ if (document.getElementById('byid').checked) {
			members = document.getElementById('to').value.split(',');
		}

		$(members).each(function(i){SendMessage(getCurrentMember, members[i], document.getElementById('subjectMsg').value, document.getElementById('bodyMsg').value);});
	} catch(e) {
		alert(e.message)
	}
}

function getCurrentMember()
{
	return $('.user_info a')[0].href.split('/')[$('.user_info a')[0].href.split('/').length-1];
}

function getPartyMembers(url)
{
	var html = "";
	var index = 1;
	var linkCnt = 0;
	var pos = 0;
	var pageAddresses = [];
	var addresses = [];
	var str = "";

	do {
		linkCnt = 0;
		html = loadHTML(url + index);
		
		var regEx = /\/en\/main\/messages-compose\/[0-9]{1,8}/g;

		while ((pageAddresses = regEx.exec(html)) != null) {
			addresses.push(pageAddresses[0].replace(/\/en\/main\/messages-compose\//, ''));
			linkCnt++;
		}
	
		index++;
	} while (linkCnt > 0);

	str = addresses.join();
	return str;
}

function getRegimentMembers(url)
{
	var html = "";
	var pageAddresses = [];
	var addresses = [];
	var str = "";

	html = loadHTML(url);
	
	var regEx = /memberid="[0-9]{1,8}/g;

	while ((pageAddresses = regEx.exec(html)) != null) {
		addresses.push(pageAddresses[0].split('"')[1]);
	}

	str = addresses.join();
	return str;
}

function initUI()
{
  if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = window;
  }

  unsafeWindow.jQuery.fx.off = true;

	$($('#content .column')[1]).append('<div id="msgEl" style="position:relative;float:bottom;"><table id="tblMsg"></table></div>');
	$('#tblMsg').append('<tr><td><input id="byid" type="radio" checked name="browser" value="none">ID игрока:</td><td><input id="to" type="text"></input></td></tr>');
	$('#tblMsg').append('<tr><td colspan="2"><input id="party" type="radio" name="browser" value="/en/party-members/communist-party-3414/">Ком.Партия</td></tr>');
	$('#tblMsg').append('<tr><td><input id="KA" type="radio" name="browser" value="/en/main/group-list/members/621/">КА</td><td><select id="regiments" name="regiment[]"><option selected disabled>Выберите отряд</option><option value="/en/main/group-list/members/621/1076">1-й</option><option value="/en/main/group-list/members/621/1077">2-й</option><option value="/en/main/group-list/members/621/1078">3-й</option></select></td></tr>');
	$('#tblMsg').append('<tr><td>subject:</td><td><input id="subjectMsg" type="text"></input></td></tr>');
	$('#tblMsg').append('<tr><td colspan="2">messege:</td></tr><tr><td colspan="2"><textarea id="bodyMsg" name="comment" cols="48" rows="8"></textarea></td></tr>');
	$('#tblMsg').append('<tr><td colspan="2"><input id="save" type="button" value="Send Message" onclick="javascript:$j.fn.btnSendClick();" /></td></tr>');

  // remove idle timer
  $j(document).ready(function () {
    clearInterval(unsafeWindow.globalSleepInterval);
    unsafeWindow.shootLockout = 1;
  });
}

function GM_wait() {

  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $j = unsafeWindow.jQuery;
    initUI();
  }

}

GM_wait();