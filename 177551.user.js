// ==UserScript==
// @name        ATS 5.3 Tweaks
// @namespace   www.abovetopsecret.com
// @description Some tweaks and fixes for ATS 5.3
// @include     *abovetopsecret.com/forum/thread*
// @include     *abovetopsecret.com/forum/viewthread*
// @include     *abovetopsecret.com/forum/post*
// @version     1.6
// ==/UserScript==

if(typeof $ == 'undefined'){ var $ = unsafeWindow.jQuery; }

var feed_vis = false;
var feed_it1 = null;
var feed_it2 = null;
var feed_con = '<div id="resLive" style="width:600px;height:400px;overflow:auto;"><div id="liveFeed1"><div id="L1" class="rsinfo3"><i class="icon-leaf"></i> new </div><div id="live1"></div></div><div id="liveFeed2"><div id="L2" class="rsinfo3 flaggedB"><i class="icon-flag"></i> flagged </div><div id="live2"></div></div></div>';
var feed_box = '<div id="feed_box" style="border:1px solid #0F1212;border-radius:10px 0px 0px 0px;background-color:#202428;z-index:99;height:420px;width:600px;position:fixed;bottom:0px;right:0px"><div style="background-color:#505860;width:100%;height:20px;border-radius:10px 0px 0px 0px;margin-bottom:5px;"><span style="width:150px;float:left;line-height:20px;font-size:0.9em;margin-left:5px;color:#60D060;">ATS LIVE</span><a id="close-fbox" style="line-height:20px;cursor:pointer;width:20px;float:right;display:block;color:#B6C4C7">X</a></div>'+feed_con+'</div>';
var feed_btn = '<a id="feed-btn" style="cursor:pointer;"><li><i class="uiAlt icon-fixed-width icon-beer icon-large" style="padding-top:0.15em;"></i></li></a>';
var img_start = '<img border="0" align="absmiddle" src="http://files.abovetopsecret.com/images/smilies/';
var img_user = '<img border="0" align="absmiddle" src="http://files.abovetopsecret.com/files/img/';
var img_omem = '<img border="0" align="absmiddle" src="http://files.abovetopsecret.com/images/member/';
var page_url = $(location).attr('href');

function format_data(data) {
  data = data.replace(/<br>/g, '');
  data = data.replace(/window.opener.location.href='/g, '');
  data = data.replace(/href="javascript:void\(0\);"/g, 'target="_blank"');
  data = data.replace(/';"/g, '" style="display:block;margin-bottom:5px;margin-top:5px"');
  data = data.replace(/class="feedBlock"/g, 'class="feedBlock" style="font-size:0.88em;padding:0px;"');
  return data.replace(/onclick=/g, 'href=');
}

function update_feed(feed_num) {
  if (feed_num == 1) {
    var feed_url = '../_feed_new.php';
  } else {
    var feed_url = '../_feed_flags.php';
  }

  $.get(feed_url, function(data,status){
    if(status == "success"){
      data = format_data(data);
      $('#live'+feed_num).html("").fadeOut(100);
      $('#live'+feed_num).html(data).fadeIn(1500);
    };
  });
}

function init_feed() {
  $.get('../_feed_new.php', function(data,status){
    if(status == "success"){
	  data = format_data(data);	 
      $('#live1').html(data).fadeIn(1500);
    };
  });

  $.get('../_feed_flags.php', function(data,status){
    if(status == "success"){
      data = format_data(data);
      $('#live2').html(data).fadeIn(1500);
    };
  });
	
  feed_it1 = setInterval(function() { update_feed(1); }, 120500);
  feed_it2 = setInterval(function() { update_feed(2); }, 60000);
}

function close_feed() {
  clearInterval(feed_it1);
  clearInterval(feed_it2);
  $('#feed_box').remove();
  feed_vis = false;
}

function toggle_feed() {
  if (feed_vis == false) {
    $('body').append(feed_box);
    $('a#close-fbox').click(close_feed);
    init_feed();
    feed_vis = true;
  } else {
    close_feed();
  }
}

function stretch_posts() {
  $('div.postcontainer').each(function(index, obj) {
    var postDivHeight = $(obj).parent().outerHeight(true);
    var postConHeight = $(obj).outerHeight(true);

    if (postConHeight < postDivHeight) {
      $(obj).height((postDivHeight-35) + 'px');
    }
  
    $(obj).css('border-color', $(obj).css('border-top-color'));
  });
}

if ($('a#colorDark').length == 0) {
  var foot_bgc = '#10181A';
  var post_grad = 'linear-gradient(to bottom, #404348 0%, #282B2D 100%)';
  var box_shad = '0 6px 12px #202428';
  var foot_bord = '5px solid #000000';
} else {
  var foot_bgc = '#DEDDDC';
  var post_grad = 'linear-gradient(to bottom, #f6f4f2 0%, #ffffff 100%)';
  var box_shad = '0 6px 12px #D4D2D0';
  var foot_bord = '5px solid #4A4A4A';
}

var pagenum = $('.rsinfo4').html().replace('page: ', '');
$('i.icon-circle').replaceWith('<u><b>'+pagenum+'</b></u>');
$('a.multitxt').css('font-size', '1.19em');
$('span.multitxt').css('font-size', '1.19em');
$('div.toolbelt').css('margin', '10px 16px 20px');
$('div#toolbelt').css('margin', '10px 16px 20px'); // css error
$('div#threadheader').css('height', '96px');
$('div.footer').css('border-bottom', foot_bord);
$('div.footer').css('background-color', foot_bgc);
$('div.postcontainer').css('background', post_grad);
$('div.postcontainer').css('box-shadow', box_shad);
$('div.postcontainer').css('border-style', 'solid');
$('div.postcontainer').css('border-width', '5px 1px');
$('div.more').css('border-bottom', '1px solid #424F4A');
$('div.posttopL').css('width', 'auto');
$('div.posttopL').css('white-space', 'nowrap');
$('h1.rsinfo1').css('margin-top', '0px');
$('blockquote.external').css('display', 'block');
$('blockquote.quotebox').css('display', 'block');
$('blockquote#quotebox').css('display', 'block'); // css error
$('a#aboutATS').after(feed_btn);
$('a#feed-btn').click(toggle_feed);
$('a#aboutATS').remove();
$('span.rsinfo4').remove();

$('.sm-happy').replaceWith(img_start+'smile.gif">');
$('.sm-unhappy').replaceWith(img_start+'sad.gif">');
$('.sm-grin').replaceWith(img_start+'biggrin.gif">');
$('.sm-wink').replaceWith(img_start+'wink.gif">');
$('.sm-cool').replaceWith(img_start+'cool.gif">');
$('.sm-angry').replaceWith(img_start+'mad.gif">');
$('.sm-surprised').replaceWith(img_start+'shocked.gif">');
$('.sm-tongue').replaceWith(img_start+'tongue.gif">');
$('.sm-up').replaceWith(img_start+'thumbup.gif">');
$('.sm-down').replaceWith(img_start+'thumbdown.gif">');
$('.sm-displeased').replaceWith(img_start+'puzzled.gif">');
$('.sm-laugh').replaceWith(img_start+'lol.gif">');
$('.sm-duh').replaceWith(img_start+'duh.gif">');
$('.sm-wow').replaceWith(img_start+'wow.gif">');
$('.sm-roll').replaceWith(img_start+'roll.gif">');
$('.sm-caution').replaceWith(img_start+'exclamation.gif">');
$('.sm-eyeroll').replaceWith(img_start+'rolleyes.gif">');
$('.sm-barf').replaceWith(img_start+'regan.gif">');
$('.sm-shock').replaceWith(img_start+'flaming.gif">');
$('.sm-devil').replaceWith(img_start+'ats2485_banana.gif">');
$('.sm-saint').replaceWith(img_start+'ats2484_afroman.gif">');
$('.sm-how').replaceWith(img_start+'ats2500_new_shocked.gif">');
$('.sm-ban').replaceWith(img_start+'ats2496_icon_banned.gif">');
$('.sm-cry').replaceWith(img_user+'ol522295b2.gif">');
$('.sm-hey').replaceWith(img_user+'yy52229f38.gif">');
$('.sm-beer').replaceWith(img_user+'nc52302f8c.gif">');
$('.sm-spam').replaceWith(img_user+'sy52229c00.gif">');
$('.sm-gomods').replaceWith(img_user+'yq52229be9.gif">');
$('.sm-bomb').replaceWith(img_user+'cl52229c21.gif">');
$('.sm-ham').replaceWith(img_user+'rf52229f08.gif">');
$('.sm-stop').replaceWith(img_user+'fi52229f57.gif">');
$('.sm-medal').replaceWith(img_user+'ly522295ef.gif">');
$('.sm-meh').replaceWith(img_user+'qg5222955c.gif">');
$('.sm-mnky').replaceWith(img_user+'fi522298a5.gif">');
$('.sm-question').replaceWith(img_user+'rp52156985.gif">');
$('.sm-idea').replaceWith(img_omem+'91341cbea5eb.gif">');
$('.sm-love').replaceWith(img_omem+'0db2214d23c7.gif">');

if (page_url.search("/forum/post") == -1) {
  $(window).load(stretch_posts);
}