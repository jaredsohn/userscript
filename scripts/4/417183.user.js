// ==UserScript==
// @name       RR Spam
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://rivalregions.com/*
// @copyright  2012+, You
// ==/UserScript==

var MIN_LEVEL = 45;
var MAX_LEVEL = 46;
var MESSAGE = 'Привет. Дело в том, что я хочу освободить Москву от оккупации коммунистов Румынии и создать сильное успешное государство, но в моих начинаниях мне нужны люди. Мне нужен ты. Только вместе, единым фронтом мы сможем обрести свободу и поднять нашу державу. Вступай в мою партию Патриоты. Ты нужен нам...'; //Вставляй свое сообщение сюды


var users = new Array();
var users_count = 0;
var users_gathered = false;

var messages_sent = 0;

var timer = null;

var checkUsers = function(user_list) {
    for(var i = 0; i < user_list.children().length;i++)
    {
        user_level = user_list.children().eq(i).children().eq(2).text()*1;
        
        if( user_level >= MIN_LEVEL && user_level <= MAX_LEVEL)
        {
            users[users.length] = user_list.children().eq(i).children().eq(1).attr('action');
        }
        else if(user_level < MIN_LEVEL)
        {
            users_gathered = true;
        }
    }
    
};


var getUsers =  function() {
    console.log('GET USERS FROM' + users_count + ' TO ' + (users_count + 25).toString());
    clearTimeout(timer);
    $.ajax({
        
        url: '/listed/region/0/0/' + users_count,
        success: function(data) { 
            if(data != '')
            {
                if(users_count == 0)
                {
                    checkUsers($(data).find('#list_tbody'));
                }
                else
                {
                    table_body = $('<tbody id="list_tbody"> </tbody>');
                    table_body.append(data);
                    checkUsers(table_body);
                }
                users_count += 25;
                
                if(users_gathered == false)
                {
                    timer = setTimeout(getUsers, 2000);
                }
                else
                {
                   checkProfiles();
                }
                
            }
        
        }
        });
};

var checkProfiles = function() {
  if(messages_sent < users.length)
  {
    setHandlerOnSlideShow(function() {
        
            if(checkParty() == true)
            {
              sendMessage();
            }
            else
            {
              users.splice(messages_sent,1);
              $('#slide_close').click();
              timer = setTimeout(checkProfiles,2000);
              
            }
            
         
        
    });
    slide_header(users[messages_sent]);
  }
   else
  {
      console.log(users);
  }
};

var sendMessage = function() {
    setHandlerOnSlideShow(function() {
        console.log('SEND MESSAGE TO ' + users[messages_sent]);
        $('#message').val(MESSAGE);
        $('#chat_send').click();
        messages_sent++;
        $('#slide_close').click();
        timer = setTimeout(checkProfiles,2000);
    });
    $('#slide_profile_send_message').click();
                          
};
var checkParty = function() {
    
    party_index = 7;
    
    if($('.tip.papers_profile.white.imp').text().trim() !=  '')
    {
        party_index = 8;
    }
    
    if($('.p_sa_h.slide_profile_data').eq(1).children().eq(party_index).text().trim() == 'Беспартийный')
    {
        return true;
    }
    
    return false;
}
var setHandlerOnSlideShow = function(func) {
    unsafeWindow.slide_header = function(n) {
        
        if(n != undefined)
	{
		if(antiflood_navigation.indexOf(n) <= -1)
		{
			if(socket != "undefined")
			{
				socket.$events	=	0;
			}

			antiflood_navigation.push(n);
			$('#l_image_target').imgAreaSelect({remove:true});
		    var tmp = $(location).attr('href').split('.com/#');
			var tmp2 = $(location).attr('href').split('.com');
			if(tmp[1] != undefined || tmp2[1]	==	'/' || tmp2[1]	==	'')
			{
				$.ajax({
					dataType: "html",
			        type: "GET",
			        data : {c : (new Date()).getTime()},
			        url: '/'	+	n,
					success: function(data) {
						if(data	==	'no_hp')
						{
							no_hp();
						}
						else
						{
							$('#header_slide_inner').animate({
								opacity: 0
							}, 200, function() {
								$('#header_slide_inner').html(data).animate({
									opacity: 1,
								}, 200, function(){
									$('.tip').tipTip();
                                    func();
								});
								$('#header_slide').animate({
									opacity: 1,
									height: '100%'
								}, 300);
								hash_place(n);
							});

							$('.note_tip').fadeOut(50, function() {
								$('.note_tip').remove();
							});
						}
					}
				});
			}
			else
			{
				window.location	=	"/#" + hash_return(n);
			}
		}
	}    
    
 };
};
getUsers();