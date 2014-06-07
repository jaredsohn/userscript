// ==UserScript==
// @name           phpBB2 profile info
// @description    show additional user info on a user's profile page.
// @include        *profile.php?mode=viewprofile*
// ==/UserScript==

var table = document.getElementsByTagName('TABLE')[4];

var user = new Object();

var base_url = window.location.protocol + '//' + window.location.host;
var admin_url = base_url + '/admin';
var search_url = base_url + '/search.php';
var modcp_url = base_url + '/modcp.php';

var sid;
var inputs = document.getElementsByTagName('INPUT');
for (var i=0; i<inputs.length; i++) {
  if(inputs[i].name == "sid") {
    sid = inputs[i].value;
    break;
  }
}

user.id = window.location.search.match(/u=(\d*)/)[1];
user.name = table.childNodes[1].firstChild.childNodes[1].innerHTML.match(/:: (.*)/)[1];
  
table.innerHTML += '<tr><td class="catLeft" colspan="2" align="center"><form style="margin: 0" method="post" action="' + admin_url + '/admin_users.php?sid=' + sid + '"><b><span class="cattitle">More info <input type="hidden" name="mode" value="edit"><input type="hidden" name="username" value="' + user.name + '"><input type="submit" value="management"></form></span></b></td></tr><tr><td id="output" class="row1 gensmall" colspan="2"></td></tr>';

function log(out, indent)
{
  var output = document.getElementById('output');
  if(indent)
    output.innerHTML += '<div style="margin-left: 40px; text-indent: -20px">' + out + '</div>';
  else
    output.innerHTML += out + '<br>';
}

function getUserInfo()
{

  log('Looking up userinfo...');
    
  //----------------------
  //  get user's email
  //----------------------
  GM_xmlhttpRequest({
    method:"POST",
    url:admin_url + '/admin_users.php?sid=' + sid,
    headers:{
      "Content-type":"application/x-www-form-urlencoded",
      },
    data:'username=' + user.name + '&mode=edit&submituser=Look+up+user',
    onload:function(details) {
      var match = details.responseText.match(/<input.*?>/ig);
      for(var i=0; i<match.length; i++) {
        if(match[i].indexOf('"email"') > -1) {
          user.email = match[i].match(/value="(.*?)"/)[1];
        }
        else if(match[i].indexOf('"user_status') > -1 && match[i].indexOf('"checked"') > -1) {
          user.active = match[i].match(/value="(.*?)"/)[1] > 0 ? true : false;
        }
      }
      
      for(prop in user)
        log('user.' + prop + ': ' + user[prop], true);

      //----------------------
      //  get last post and forum ids
      //----------------------
      GM_xmlhttpRequest({
        method:"GET",
        url:search_url + '?search_author=' + user.name,
        onload:function(details) {
          try {
            var firstPostID = details.responseText.match(/"viewtopic.php\?p=(\d*)/)[1];
            var firstForumID = details.responseText.match(/"viewforum.php\?f=(\d*)/)[1];
            var firstPostDate = details.responseText.match(/Posted: (.*?)&/)[1];
            
            user.lastpost = firstPostID;
            
            log('user.lastpost: <a href="/viewtopic.php?p=' + user.lastpost + '#' + user.lastpost + '">' + firstPostDate + '</a>', true);
          }
          catch (e){
            if(!firstPostID || !firstForumID) {
              log('No posts found. Quitting...');
              return;
            }
          }
          //----------------------
          //  get all ip's
          //----------------------
          GM_xmlhttpRequest({
            method:"GET",
            url:modcp_url + '?mode=ip&p=' + firstPostID + '&f=' + firstForumID + '&sid=' + sid,
            onload:function(details) {
              user.ips = details.responseText.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/ig);
              user.latest_ip = user.ips[0];
              user.alter_egos_for_latest_ip = details.responseText.match(/<a href="profile.php\?mode=viewprofile.*<\/a>/ig);
              for(alter_ego in user.alter_egos_for_latest_ip)
                if (user.alter_egos_for_latest_ip[alter_ego].indexOf('>' + user.name + '<') > -1)
                  user.alter_egos_for_latest_ip.splice(alter_ego, 1);
              
              log('user.ips: ' + user.ips.join(", "), true);
              log('user.latest_ip: ' + user.latest_ip, true);
              if(user.alter_egos_for_latest_ip.length > 0)
                log('user.alter_egos_for_latest_ip: ' + user.alter_egos_for_latest_ip, true);
            }
          });
        }
      });
    }
  });
}

getUserInfo();