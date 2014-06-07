// ==UserScript==
// @name           FlickrInvitr
// @namespace      vispillo
// @include        http://www.flickr.com/photos/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var selected = {};
var ownersGroups = new Array;

var id = document.location.href.split('/')[5];
var css =   '#invites-list > li {list-style-type:disc;list-style-position:inside;}\n'
          + '#invites-list > li:nth-child(odd) {background: #eee;}\n'
          + '#invites-list { width:525px}\n'
          + '#invites-list > li > img {float:right}\n'
          + '#invites-list > li > img:hover {cursor:pointer}\n'
          + '#invites-list > li > label {float:right;margin-right:25px;vertical-align:middle}\n'       
          + '#invites-list > li > input {float:right;margin-right:5px;margin-top:2px;vertical-align:middle}\n'
          + '#groupselector {margin-bottom:5px;margin-top:5px;}\n';
magicCookie = getJSVariable(/auth_hash[ :]+\'([^\']+)\'/)
apiKey      = getJSVariable(/api_key[ :]+\'([^\']+)\'/)
owner       = getJSVariable(/ownerNsid[ :]+\'([^\']+)\'/)
user        = getJSVariable(/nsid[ :]+\'([^\']+)\'/);
in_prog     = false;
if (owner != user) {
  addGlobalStyle(css);
  addSelector();
  document.getElementById("comments").addEventListener('DOMNodeInserted', checkAndProcess, true);
}

function checkAndProcess(arg) {
  if ((document.getElementsByClassName('comment-button-post')[0] != undefined) && (document.getElementById('invitr-container') == undefined) && (!in_prog)) {
    in_prog = true;
    addSelector();
  }  
}

function changeHandler (e) {
  if ((e.target.value != 'null') && (selected[e.target.value.replace('@','at')] == undefined)) {
    selected[e.target.value.replace('@','at')] = $(e.target).find(':selected').text();
    addLink(e.target.value.replace('@','at'),$(e.target).find(':selected').text());
  }
}

function getGroups (userid) {
  var listener = {
    flickr_people_getPublicGroups_onLoad: function(success, responseXML, responseText, params){
      if(success){
        jQuery.each(responseXML.getElementsByTagName('group'),function (i,item) {
          ownersGroups.push(item.getAttribute('nsid').replace('@','at'));
        });
 	    }
      $('#waiting-img').hide();
	  }
  };
  $('#waiting-img').show();
	syncApiCall('flickr.people.getPublicGroups',{user_id:userid,auth_hash:magicCookie }, listener);  
}
  
function sendAdminInvite (groupid,photoid) {
  var listener = {
    flickr_groups_invite_photo_invite_onLoad: function(success, responseXML, responseText, params){
      if(success){
        frag_url = 'http://www.flickr.com/photo_group_invites_fragment.gne?id='+photoid+'&cachebust='+(new Date()).getTime();
  	  	jQuery.get(frag_url,function (data,resp) {
          document.getElementById('invites').setAttribute('class','');
          document.getElementById('invites').innerHTML=data;
    		});
  		}else{
 	    }
    }
  };
  apiCall('flickr.groups.invite.photo.invite', {group_id:groupid,photo_id:photoid, auth_hash:magicCookie }, listener);  
}
  
function apiCall (apimethod, params , callback) {
  var self = this;
  var argstring = '';
  var key = apiKey;
  var callbackstring = apimethod.replace(/\./g,'_');
  callbackstring += '_onLoad';
  for (var arg in params) {
    argstring += '&'+arg+'='+params[arg];
  }
  url = 'http://www.flickr.com/services/rest/?method='+apimethod+argstring+'&api_key='+key;
  jQuery.get(url, function (data,text) {
    status = data.getElementsByTagName('rsp')[0].getAttribute('stat') == 'ok' ? 1 : 0;
    callback[callbackstring](status,data,text,null);
  });
}
  
function syncApiCall (apimethod, params , callback) {
  var self = this;
  var argstring = '';
  var key = apiKey;
  var callbackstring = apimethod.replace(/\./g,'_');
  callbackstring += '_onLoad';
  for (var arg in params) {
    argstring += '&'+arg+'='+params[arg];
  }
  url = 'http://www.flickr.com/services/rest/?method='+apimethod+argstring+'&api_key='+key;
    jQuery.ajax({ url:url,async:false,success:function (data,text) {
      status = data.getElementsByTagName('rsp')[0].getAttribute('stat') == 'ok' ? 1 : 0;
      callback[callbackstring](status,data,text,null);
    }
  });
}
  
function addLink ( groupid, groupname ) {
  if (ownersGroups.length == 0)
    getGroups(owner);
  
  link = $('<a>').attr('href','http://www.flickr.com/groups/'+groupid.replace('at','@')).text(groupname);
  li = $('<li>').attr('id','group-invite-'+groupid).append('<span>');
  li.find('span').append(link);
  img = $('<img src="http://l.yimg.com/g/images/spaceball.gif" width="14" height="14" align="top" alt="[x]" class="delete-x"/>');
  img.click(function (e) {
    delete selected[$(this).parent().attr('id').split('-')[2]];
    //selected.splice(selected.indexOf($(this).parent().attr('id').split('-')[2]),1);
    $(this).parent().remove();
  });
  li.append(img);
  if (ownersGroups.indexOf(groupid) == -1) {
    li.append('<label for="user-group-invite-'+groupid.replace('@','at')+'">Also invite user?</label>');
    li.append('<input type="checkbox" checked="checked" id="user-group-invite-'+groupid.replace('@','at')+'" />');
  }
  else {
    li.append('<label style="color:grey" for="user-group-invite-'+groupid.replace('@','at')+'">Already a member</label>');
    //li.append('<input type="checkbox" disabled="disabled" id="user-group-invite-'+groupid.replace('@','at')+'" />');      
  }      
  li.appendTo('#invites-list');  
  $('#groupselector').val('null');  
}
  
function addSelector () {
  $('<div>').attr('id','invitr-container').insertBefore('div.buttons').append('<ul id="invites-list"></ul>');
  $('<select>').attr('id','groupselector').append('<option value="null">--- Invite this photo to... ---</option>').change(changeHandler).appendTo('#invitr-container');
  $('<img>').attr('src','http://l.yimg.com/g/images/progress/balls-16x8-white.gif').attr('id','waiting-img').hide().appendTo('#invitr-container');
  var url = 'http://www.flickr.com/add_to_group_fragment.gne?id='+id+'&cachebust='+(new Date()).getTime();
  jQuery.get(url,function (data,text) {
    resp = $(data);
    var groups = Array;
    $(resp).find('ul.add-to-selector li.group').each(function (i,item) {
      groups[$(item).attr('data-group-id')] = $(item).find('strong').text();
      $("<option>").val($(item).attr('data-group-id')).text($(item).find('strong').text()).appendTo('#groupselector');
    });      
  });
  document.getElementsByClassName('comment-button-post')[0].addEventListener('click',submitHandler,true);
  for (i in selected) {
    addLink (i,selected[i]);
  }
  in_prog = false;
}
  
function sendUserInvite(user,group) {
  url = 'http://www.flickr.com/groups_invite.gne';
  var params = {
    'done_send':	'SEND THE INVITE',
    'id': group,
    'send_to' : user
  }
  params['contact_'+user] = 1;
  jQuery.post(url,params,
    function (data,text) {
      //console.log('successfully called user group invite');
    }
  );
}
  
function submitHandler(e) {
  for (i in selected) {
    if ($('#user-group-invite-'+i).attr('checked')) {
      sendUserInvite(owner,i.replace('at','@'));
      sendAdminInvite(i.replace('at','@'),id);        
    }
    else {
      sendAdminInvite(i.replace('at','@'),id);
    }
  }
  selected = {}
}

function getJSVariable (regex) {
  // Credit for this function goes to Alesa Dam
  // Some slight modifications for use with jQuery
  var retval;
  $('script').each( function (i,script) {
    if (retval != undefined) {
      return;
    }
    var html = script.innerHTML;
    try {
      retval = html.match(regex)[1];
    } catch (e) {
    }
  });
  return retval;
}

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
