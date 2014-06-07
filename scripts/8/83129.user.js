// ==UserScript==
// @name          Kaskus Quick Reply With Verification Code
// @namespace     http://facebook.com/avtomat.kalashnikov
// @include       http://*.kaskus.us/showthread.php*
// @version       100717104
// @vversion      v1.0
// @description   provide a quick reply feature, under circumstances capcay required.
// @author        Andi Raditya
// @moded         idx (http://userscripts.org/users/idx)
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// 
// v1.0 - 2010-07-17
// Fix refetch when avatar changed.
//
// 
// version 0.1 - 2010-06-29
// Init
//------ 
//
// ==/UserScript==
(function () {

// Initialize Global Variables
var gvar=function() {}

gvar.sversion = 'v' + '1.04';
gvar.codename = 'KQR';

const OPTIONS_BOX = {
  KEY_SAVE_SAVED_AVATAR:   []
};

GM_addGlobalScript=function(script) { // Redefine GM_addGlobalScript with a better routine
    var sel=document.createElement('script'); sel.setAttribute('type','text/javascript'); 
	if(script.match(/^http\:\/\/.+/)){
	  sel.setAttribute('src', script);
	}else{
	  sel.appendChild(document.createTextNode(script));
	}
	var hds = getTag('head');
	if(!hds)
	   document.body.insertBefore(sel, document.body.firstChild);
	else
	   hds[0].appendChild(sel);	   
    return sel;
}
GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
    var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
    var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
    if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
    return sel;
}
Avatar = {
    uri:null,
    cached:null,
	result:null,
	userID:null,
    init:function(userID){
	  Avatar.userID=userID;
	  Avatar.uri='http:/'+'/www.kaskus.us/member.php?u='+Avatar.userID;
	},
	request:function(callback){	
	  GM_xmlhttpRequest( {
		method:'GET',
		url: Avatar.uri + (Avatar.cached ? '':'#' + Math.random().toString().replace('0.','')),
		onload: function(html) {
		  var rets = html;
	      Avatar.result = (callback!=null ? callback(rets,Avatar.userID) : rets);	      
		}
	  } );
	}
};
// utk add - remove element
Dom = {
  get: function(el) {
    if(!el) return false;
    if (typeof el === 'string') {
      return document.getElementById(el);
    } else {
      return el;
    }
  },
  add: function(el, dest) {    
    var el = this.get(el);
    var dest = this.get(dest);
    dest.appendChild(el);
  },
  remove: function(el) {
    var el = this.get(el);
    el.parentNode.removeChild(el);
  }
};
Event = {
  add: function() {
    if (window.addEventListener) {
      return function(el, type, fn) {
        Dom.get(el).addEventListener(type, fn, false);
      };	  
    } else 
	if (window.attachEvent) {
      return function(el, type, fn) {
        var f = function() {
          fn.call(Dom.get(el), window.event);
        };
        Dom.get(el).attachEvent('on' + type, f);
      };
    }
  }()
};



// initialize global var
function init(){
  // initialize gvar if needed..
  gvar.domain = 'http://'+'kaskus.us/';
  gvar.avatarLink = 'http://'+'img.kaskus.us/customavatars/avatar';
  gvar.titlename = 'Kaskus Quick Reply v1.04 ';
  gvar.scriptId = '83129';
  gvar.textareaExpander = [true,100,500];  //[flag,minHeight,MaxHeight]
  gvar.avaUser = [];  // [userID,username,avatarFN]
  
  gvar.silahken = 'Untuk mengaktifkan. Click Reset... Copyright By MintKaskus'
  
  GM_addGlobalScript(gvar.domain + 'clientscript/vbulletin_quick_reply.js?v=383');
  GM_addGlobalScript(gvar.domain + 'clientscript/vbulletin_ajax_imagereg.js?v=380');

  // load jQuery script
  GM_addGlobalScript('http://'+'ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
  
  // place global style 
  GM_addGlobalStyle(getCSS()); 
  
  ApiBrowserCheck();
  
  //chk avatar
  check_avatar();
  
  load_wait();
}



// =====
// START
function start_Main(){
	
	fetch_property();
	
	// keadaan ga nongolin qr_ :: thread closed; ..
	if(!gvar.newreply) {
	  show_alert('Thread nya udah di close ama momod.', 0); return;
	}
	
	GM_addGlobalScript( getSCRIPT() );
	
	$("#qr_error_tbody").parent().hide();
	
	$('a:contains("QUOTE")').each(function(){
		var hr = $(this).attr("href");
		hr = hr.split("&p=");
		$(this).html('<img src="images/buttons/quote.gif" alt="Reply With Quote" border="0" />');
		$(this).after('\n\n<a href="newreply.php?do=newreply&amp;p='+hr[1]+'" rel="nofollow" id="qr_'+hr[1]+'" onclick="gm_qrfocus(); return false;"><img src="images/buttons/quickreply.gif" alt="Quick reply to this message" border="0" /></a>');
		$("#qr_"+hr[1]).click(function(){
		  $("html, body").animate({scrollTop:$("#message").offset().top - 240}, 800);
		  getById('humaninput').disabled=false;;
		  var tA = getById('message');
		  tA.disabled=false;
		  if(tA.innerHTML==gvar.silahken)
		    tA.innerHTML='';
		  tA.focus();
		})
	});
		
	{
    $('script:contains("mqlimit")').next().after(
	  '<!-- start form quick reply -->\n\n'
	  +'<div id="qr_maincontainer">\n'
	  +'<form action="newreply.php?do=postreply&amp;t='+gvar.threadid+'" method="post" name="vbform" id="vbform">'
	  
	  +'<table class="tborder" cellpadding="6" cellspacing="1" border="0" align="center"><thead>'+'<tr><td id="vB_Editor_001" class="vBulletin_editor tcat" colspan="2">' + '<a href="javascript:;" id="atoggle" onclick="return my_toogle_quick();return false;"><img id="collapseimg_quickreply" src="images/buttons/collapse_tcat.gif" alt="" border="0" /></a>'+gvar.titlename+' '+HtmlUnicodeDecode('&#8212;')+' <a href="http:/'+'/userscripts.org/scripts/show/'+gvar.scriptId.toString()+'" id="home_link" target="_blank" title="Home Kaskus Quick Reply - '+gvar.sversion+'">'+gvar.sversion+'</a></td></tr></thead>'
      +'<tbody id="collapseobj_quickreply" style="display:;"><tr><td class="panelsurround" align="center"><div class="panel">'
	  +'<div class="qr_container">'
	  	  
	  // Multi quote container
	  +'<input id="mq_container" type="hidden" value=""/>\n'
	  // Quoted notice
	  +'<div id="quoted_notice" class="g_notice"></div>'
	  
	    //vB_Editor_QR_textarea
        +'<div class="smallfont">Message:&nbsp;<a id="textarea_clear" href="javascript:;" title="Clear Editor">reset</a></div><div id="" class="vBulletin_editor"><table cellpadding="0" cellspacing="0"><tr><td class="txta_cont"><textarea name="message" id="message" class="textarea" rows="10" tabindex="1" dir="ltr" disabled="disabled">'+gvar.silahken+'</textarea></td><td id="qravatar_cont"></td></tr></table></div>'
		
		
		// reserved container for Image Verification
	    +'<div id="capcay_container"><br/>Lagi dicari capcaynya sebentar ya..</div>' 
		
		+'</div>'		
		+'</div>'
		+'<div style="margin-top:6px;">'
		+'<input type="hidden" name="fromquickreply" value="0" />'
		+'<input type="hidden" name="s" value="" />'
		+'<input type="hidden" name="securitytoken" value="'+gvar.securitytoken+'" />'
	    +'<input type="hidden" name="do" value="postreply" id="qr_do" />'
		+'<input type="hidden" name="t" value="'+gvar.threadid+'" id="qr_threadid" />'
		+'<input type="hidden" name="p" value="'+gvar.page+'" id="qr_postid" />'
		+'<input type="hidden" name="specifiedpost" value="1" id="qr_specifiedpost" />'
		+'<input type="hidden" name="parseurl" value="1" />'
		+'<input type="hidden" name="loggedinuser" value="'+gvar.userid+'" />'
		+'<input type="hidden" name="multiquoteempty" id="multiquote_empty_input" value="only" />'
		+'<input type="hidden" name="wysiwyg" id="vB_Editor_001_mode" value="0" />'
		+'<input type="hidden" id="clicker" value="" />'
		+'<input type="hidden" name="styleid" value="0" />'	  
		
		
		+'<button class="button" accesskey="s" title="(Alt + S)" name="sbutton" tabindex="3" id="qr_submit" onClick="clickedelm(this.value)">Tancap Gan!</button><input type="submit" class="button" value="Go Advanced" accesskey="x" title="(Alt + X)" name="preview" tabindex="4" id="qr_preview" onClick="clickedelm(this.value)" /></div>'
		
		+'</td></tr></tbody></table></form>'
		+'\n<div id="script_container"> </div>\n'
	    +'\n</div>\n'
	    +'<!-- / end form quick reply -->\n\n'
		);
	}
	
	// prep event after dom ready
	$(document).ready(function() {

	  // prep event submit
	  $('#vbform').submit(function(e) {
		
	    if($('#clicker').attr('value') != 'Go Advanced'){
		  if($('#humaninput').attr('value')==''){
		    if($('#humaninput').attr('disabled')!=false) return false;
	  	    alert('Masukin atuh Capcaynya..');
	  	    $('#humaninput').focus();
		    return false;
		  }else{
		    if(gvar.multiquote) deselect_it(gvar.multiquote); // deselect multi quote
		  }
		  //e.preventDefault();
	  	}
	  	else{
	  	  var act = $(this).attr('action');
	  	  $(this).attr('action', gvar.newreply);
		  $('#qr_do').attr('value', 'newreply');
	      //e.preventDefault();
	      return true;
	    }
	  });
	  
	  // finding & event multi-quote toggle	
	  var mq='';
	  $("img[id^='mq_']").each(function(index){
	    var thisId='';
		var curVal,newval,selected;
	    if($(this).attr('src').indexOf('multiquote_on')!=-1){
		  thisId=$(this).attr("id").replace(/mq_/g,'');
		  mq+=','+thisId;
		}
		$(this).click(function(){
		   curVal=$('#mq_container').val();
		   selected=($(this).attr('src').indexOf('multiquote_on')!=-1);
		   
		   thisId= $(this).attr("id").replace(/mq_/g,'');
		   thisId= (curVal.indexOf(','+thisId)!=-1 ? ','+thisId:thisId);
		   if(selected){
		     newval=(curVal!=''? (curVal.indexOf(thisId)==-1?curVal+','+thisId : curVal.replace(thisId,'')):thisId);
		   }else{
		     newval=(curVal.indexOf(thisId)!=-1 ? curVal.replace(thisId,'') : curVal);			 
		   }
		   $('#mq_container').attr('value',newval);
		   gvar.multiquote=newval;
		   chk_newval(newval,'mq_container');
		}); // end click
	  }); // end each
	  
	  if(mq!='') {
	    mq=mq.substring(1, mq.length);
	    $('#mq_container').attr('value',mq);
		gvar.multiquote=mq;
		chk_newval(mq,'mq_container');
	  }
	  
	  // get the reply form; :: snippet by Indra Prasetya
	  //show_alert('get capcay..');
      $.ajax({
           url: gvar.newreply,
           cache: true,
           success: function(reply_html)
           {
			  var hash = $(reply_html).find("#hash").val();
			  gvar.securitytoken = $('input[name="securitytoken"]').val();
			  if(hash != undefined){
			    $('#capcay_container').html(
	   '<fieldset class="fieldset" id="fieldset_capcay" style="width:49%;"><legend>Image Verification</legend>'
	  +'<table id="tbl_capcay" cellpadding="0" cellspacing="2"  border="0" width="500px"><tr>'
	  +'<td width="200px">'
	  +'<div class="warn">Security Image saat ini dinyalakan karena adanya spam &amp; user yang mengcopy javascript ke browser (hati-hati password anda tercuri)</div><br/>'	  
	  +'<a href="http:/'+'/kask.us/3882791" target="_blank">Penjelasan Lengkap Klik Ini</a>'
	  +'</td><td align="center">'
	  +'<img id="imagereg" src="image.php?type=hv&amp;hash='+hash+'" alt="capcay" title="capcay" width="151" height="61" border="0" /><br/>'
	  +'<span id="refresh_imagereg" style="display:none"><a id="refresh_capcay" href="javascript:;" tabindex="5">Refresh Image</a></span>'
	  +'</td><td align="right" valign="top"><br/><label for="humaninput">Tulis Capcaynya disini '
	  +'<div id="progress_imagereg" style="display:none;float:left;margin:20px 0 0 5px;"><img src="images/misc/progress.gif" alt="Loading..." /></div>'
	  +'<input type="text" tabindex="2" class="" name="humanverify[input]" id="humaninput" size="5" maxlength="6" disabled="disabled"/>'
	  +'</label>'
	  +'<input id="hash" type="hidden" name="humanverify[hash]" value="'+hash+'" />'
	  +'</td></tr></table></fieldset>'
	  );
	  $("#humaninput").addClass("idleinput");
	  $("#humaninput").focus(function(){
                $(this).addClass("activeField").removeClass("idleinput");
	    }).blur(function(){
                $(this).removeClass("activeField").addClass("idleinput");
	    });
	  $("#refresh_capcay").click(function(){ var hi=$('#humaninput'); hi.focus(); hi.select();});
	  $("#imagereg").click(function(){ var hi=$('#humaninput'); hi.focus(); hi.select();});
	  $('#capcay_container').after('<script>vB_AJAX_ImageReg_Init();</script>');
			  }else{
			    $('#capcay_container').html('<span id="g_notice">Capcay Disabled</span>');
			  }
           },
           error: function(msg)
           {
              $("#reply_area").html("<br>The page you are looking for is temporarily unavailable.");
           }
      }); // end get the reply form
	  

	  // event textarea autogrowth
	  if(gvar.textareaExpander[0])
	    $("textarea[class*=textarea]").TextAreaExpander(gvar.textareaExpander[1],gvar.textareaExpander[2]);
		

	  // append avatar
	  show_alert('attaching Avatar..');
	  if(isDefined(gvar.avaUser[2]))
	    appendAvatar();
	  
	  // event reset / clear textarrea
	  Event.add(getById('textarea_clear'), 'click', function(){ clear_txtarea(); window.setTimeout(function(){getById('message').focus()},5)});

	  //=====
	}); // end document ready

}
// end start_Main()


function clickIt(){
   SimulateMouse(getById('refresh_capcay'), 'click');
}

function clear_txtarea(){
   var txta = 'message';   
   var par=getById(txta).parentNode;
   par.removeChild(getById(txta));
   var el=mycreateElement('textarea',{id:txta, name:txta, rows:10, tabindex:'1', dir:'ltr','class':'textarea'});
   par.appendChild(el);		 
   if(gvar.textareaExpander[0]){
     window.setTimeout(function() {			 
       $("#"+txta).TextAreaExpander(gvar.textareaExpander[1],gvar.textareaExpander[2]);       
     }, 1);
   }
   getById('humaninput').disabled=false;
}

function check_avatar(){
  var uid = getUserId();
  var buffer=getValueForId(uid, 'SAVED_AVATAR');
  if(!buffer){  
    Avatar.init( uid );
    Avatar.cached=true;;
    Avatar.request(profile_parser); 
  }else{
    gvar.avaUser = [buffer[0],buffer[1],buffer[2]];
  }
}

function setValueForId(userID, value, gmkey){
    var i, ks = 'KEY_SAVE_'+gmkey;
	var info = getValue(ks);
	
	if(!userID) return null;	
	if(!info){
		setValue(ks, userID+"="+value);
		return;
	}	
	info = info.split(';');
	for(i=0; i<info.length; i++){
		if(info[i].split('=')[0]==userID){
			info.splice(i,1,userID+"="+value);
			setValue(ks, info.join(';'));
			return;
		}
	}	
	info.splice(i,0,userID+"="+value);
	setValue(ks, info.join(';'));
	
}
//values stored in format "userID=value;..."
function getValueForId(userID, gmkey){
	var info = getValue('KEY_SAVE_'+gmkey);
	if(!info || !userID)
		return null;
	
	info = info.split(';');
	for(var i=0; i<info.length; i++){
		if(info[i].split('=')[0]==userID){		   
			var values = info[i].split('=')[1].split('::');
			return [userID, values[0],values[1]]; //userID,username,avatarLink
		}
	}	
	return null;
}
function delValueForId(userID, gmkey){
  var ks = 'KEY_SAVE_'+gmkey;
  var info = getValue(ks);
  info = info.split(';'); var tmp=[];
  for(var i=0; i<info.length; i++){
    if(info[i].split('=')[0]!=userID)
      tmp.push(info[i]);    
  }
  setValue(ks, tmp.join(';'));
}


function getUserId(){
  var xp="//a[contains(@href, 'member.php')]", id;
  var logusers=document.evaluate(xp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(logusers)
    id = logusers.snapshotItem(0).href.match(/member\.php\?u=(\d+$)/);
  return id[1];
}

function profile_parser(page,uid){
  var dpage, result={};
  page=page.responseText;
  if(page.indexOf('<td><img src="' + gvar.avatarLink)!=-1){
    dpage = page.split('<td><img src="' + gvar.avatarLink)[1].split('</td>')[0];
    if(ret = dpage.match(/^([^"]+)/)) {
	   result['img'] = ret[1]; // avatar_url
	}
  }
  dpage = page.split('View Profile')[1];
  if(ret = dpage.match(/\:[\s|]*([^<]+)/)) 
      result['kaskus_id'] = ret[1]; // kaskus_id
  
  gvar.avaUser = [uid,result['kaskus_id'],result['img']];
  setValueForId(uid, result['kaskus_id']+'::'+result['img'], 'SAVED_AVATAR'); //save it
  
  // apend avatar element from gvar
  appendAvatar();
}

function appendAvatar(){
   var dvCon, dv, el, Attr
   var avId = 'imgAvatar';
   getById('qravatar_cont').innerHTML='';
   if(isDefined(gvar.avaUser[2]) && gvar.avaUser[2]!=''){
	   dvCon=mycreateElement('div',{style:'border:1px solid red;text-align:center;padding:2px;'});	   
       Attr={border:0,style:'max-height:100px,max-width:100px',
             id:avId,src:gvar.avatarLink+gvar.avaUser[2]};
       el=mycreateElement('img',Attr);
	   dv=mycreateElement('div',{id:'qravatar_refetch'},false,'<a id="refetch" class="cleanlink" href="javascript:;"><small>refetch</small></a>');
	   dvCon.appendChild(el);
	   dvCon.appendChild(dv);
       getById('qravatar_cont').appendChild(dvCon);
	   
	   Event.add(dvCon, 'mouseover', function(){dv.style.display='';});
	   Event.add(dvCon, 'mouseout', function(){dv.style.display='none';});
	   // change className behaviour when img is loaded
	   Event.add(getById(avId), 'load', function(){
		 var cls = 'qravatar_refetch_hover' + (getById(avId).clientHeight==0 ? '_0':'');
		 Event.add(dvCon, 'mouseover', function(){dv.className=cls;});
	     Event.add(dvCon, 'mouseout', function(){dv.className.replace(cls,'');});	   
		 dv.setAttribute('style', 'display:none;position:absolute;');
	   } );
	   Event.add(getById('refetch'), 'click', function(){ refetch_avatar(this.parentNode.parentNode); });	   
   }   
   el=mycreateElement('a',{href:'http:/'+'/www.kaskus.us/member.php?u='+gvar.avaUser[0]},false,'<b><small>'+gvar.avaUser[1]+'</small></b>');
   getById('qravatar_cont').appendChild(el);
}

function refetch_avatar(par){
  var lw=par.clientWidth;
  Dom.remove(par);
  var qravatar_cont=getById('qravatar_cont');
  var el=mycreateElement('div',{style:'min-width:'+lw+'px'},false,'Fetching,.');
  qravatar_cont.insertBefore(el, qravatar_cont.firstChild);
  delValueForId(gvar.avaUser[0],'SAVED_AVATAR');  

  check_avatar();
}

// routine for fetching quoted post
function chk_newval(val, target){
  var tgt, notice = $('#quoted_notice');
  var txta = 'message'; // id textarea di QR
  if(val.length>1){	 
    notice.html('You have selected one or more posts to quote. <a href="javascript:;" id="quote_now">Quote these posts now</a> or '+
	'<a href="javascript:;" id="deselect_them">deselect them</a>. ');
	notice.show();
	
	$('#quote_now').click(function(){
	  var nr_txta = 'vB_Editor_001_textarea'; // id textarea di newreply
	  getById(txta).disabled='disabled';
	  notice.html('<span>Fetching...</span>');
	  $.ajax({
           url: gvar.newreply,
           cache: true,
           success: function(reply_html)
           {
		     var vb_Editor_content = $(reply_html).find("#"+nr_txta).html();			 
			 clear_txtarea();
			 $('#'+txta).html(vb_Editor_content);
			 window.setTimeout(function(){getById(txta).focus()},5);
			 notice.hide(); // hide notice
			 clickIt(); // refresh capcay
		   },
		   error: function(reply_html)
		   {
			  notice.show('<span>ERROR...!</span>');
			  console.log('Error found');
			  getById(txta).disabled=false;
		   }
	  });
	});
	
	$('#deselect_them').click(function(){
	    deselect_it(val)
	});
  }else{
    notice.hide(); // hide notice
    return;
  }
 
}

// deselect selected multi quote
function deselect_it(ids){
  var mq = ids.split(",");
  for(var i=0 in mq){
    if(mq[i]!=''){
	  var par=getById('mq_'+mq[i]);
	  SimulateMouse(par, 'click');
	}
  }  
}


/**
 * TextAreaExpander plugin for jQuery
 * v1.0
 * Expands or contracts a textarea height depending on the
 * quatity of content entered by the user in the box.
 * By Craig Buckler, Optimalworks.net
 *
 * As featured on SitePoint.com:
 * http://www.sitepoint.com/blogs/2009/07/29/build-auto-expanding-textarea-1/
**/
function txtareaExpander(){
   if(typeof($)!='function') {
     show_alert('jQuery not loaded. txtareaExpander aborted. returning..', 0); return;
   };
	(function($) {
	  // jQuery plugin definition
	  $.fn.TextAreaExpander = function(minHeight, maxHeight) {
		var hCheck = !($.browser.msie || $.browser.opera);
		// resize a textarea
		function ResizeTextarea(e) {
			// event or initialize element?
			e = e.target || e;
			// set height restrictions
			var p = e.className.match(/expand(\d+)\-*(\d+)*/i);
			e.expandMin = minHeight || (p ? parseInt('0'+p[1], 10) : 0);
			e.expandMax = maxHeight || (p ? parseInt('0'+p[2], 10) : 99999);			
			// find content length and box width
			var vlen = e.value.length, ewidth = e.offsetWidth;
			if (vlen != e.valLength || ewidth != e.boxWidth) {
				if (hCheck && (vlen < e.valLength || ewidth != e.boxWidth)) e.style.height = "0px";
				var h = Math.max(e.expandMin, Math.min(e.scrollHeight, e.expandMax));
				e.style.overflow = (e.scrollHeight > h ? "auto" : "hidden");
				e.style.height = h + "px";
				e.valLength = vlen;
				e.boxWidth = ewidth;
			}
			return true;
		};
		// initialize
		this.each(function() {
			// is a textarea?
			if (this.nodeName.toLowerCase() != "textarea") return;
			// initial resize
			ResizeTextarea(this);
			// zero vertical padding and add events
			if (!this.Initialized) {
				this.Initialized = true;
				$(this).css("padding-top", 0).css("padding-bottom", 0);
				$(this).bind("keypress", ResizeTextarea).bind("focus", ResizeTextarea);
			}
		});
		return this;
	  };
	})($);
}

// check wheter jQuery is already loaded
function load_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { 
    window.setTimeout(load_wait,100); 
  }else { 
    $ = unsafeWindow.jQuery;
	txtareaExpander();
    start_Main();
  }
}

function fetch_property(){
   if(typeof($)!='function') {
     show_alert('jQuery not loaded. fetch_property aborted. returning..', 0); return;
   };
   gvar.securitytoken = $('input[name="securitytoken"]').val();
   gvar.page = null;
   gvar.threadid = $('a[href*=\'nextoldest\']').attr('href').split('&')[0].split('t=')[1];
   gvar.userid = $('a[href*="member.php?u"]').attr('href').split('u=')[1];
   
   // find first element postid
   gvar.newreply = is_opened_thread();
   var match = /\Wp=(\d+)/.exec(gvar.newreply);
   if(gvar.newreply && match){
     gvar.page = match[1];
   }
}

function is_opened_thread(){
	var anode = $('body').find("td.smallfont:first a");
	if(!anode) {
	  //  failed find td
	  return false;
	}
 	if (anode.html().indexOf('Closed Thread')==-1){
	  return anode.attr("href"); // yes thread is not closed
	} else {
	  return false;
	}	  
}


// SCRIPT Global
function getSCRIPT() {
  var script =
    'var d = document;'+	
	'function gm_qrfocus(){'+
	 'if(d.getElementById(\'collapseobj_quickreply\').style.display=="none") '+
	 '  my_toogle_quick();'+	 
	 'recapcay();'+	
	'};'+
	'function recapcay(){'+
	 'var el_ref = d.getElementById("refresh_capcay");'+
	 'var evObj = d.createEvent("MouseEvents");'+
	 'evObj.initEvent("click", true, false);'+
	 'if(el_ref) el_ref.dispatchEvent(evObj);'+
	 '};'+
	'function clickedelm(val){'+
	  ' d.getElementById("clicker").value=val;'+
	 '};'+
	'function my_toogle_quick(){'+
	 'if(d.getElementById(\'collapseobj_quickreply\').style.display=="none") '+
	 '  recapcay();'+
	 'return toggle_collapse(\'quickreply\');'+
	'};';
	return script;
}

// CSS Global
function getCSS() {
  var css =    
   '.qr_container'
   +'{max-width:100%;width:auto !important;margin:5px;text-align:left;}'
  +'.g_notice'
   +'{display:none;padding:.4em;margin-bottom:3px;font-size:11px;background:#DFC;border:1px solid #CDA;line-height:16px;}'
  +'#atoggle'
   +'{float:right;}'
  +'.vBulletin_editor table, #vbform .tborder'
   +'{min-width:100%;}'
  +'.vBulletin_editor table td'
   +'{vertical-align:top;}'
  +'#qravatar_cont'
   +'{text-align:center;font-size:10px;}'
  +'.txta_cont'
   +'{min-width:100%;padding-right:5px;}'
  +'#message'
   +'{width:100%;}'
  +'.textarea'
   +'{clear:both;width:100%;height:100px;}'
  +'#capcay_container'
   +'{text-align:left;font-size:10px;}'
  +'#home_link'
   +'{text-decoration:underline;}'
  +'.cleanlink, #textarea_clear'
   +'{text-decoration:none;}'
  +'.qravatar_refetch_hover_0'
   +'{margin-top:0;}'
  +'.qravatar_refetch_hover'
   +'{margin-top:-100px;}'
  +'#qravatar_refetch'
   +'{background:#DFC;border:1px solid #CDA;}'
  +'.warn'
   +'{color:#FF0000;font-size:9px;}'
  +'.idleinput, .activeField'
   +'{font-size:24px;border:1px solid #B1B1B1;text-align:center;padding:2px;}'
  +'.idleinput'
   +'{color:blue;background:#FEEB9E;}'
  +'.activeField'
   +'{background:#FFF;}'
  +'';
  return css;
}


// my static routine
function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }
function getValue(key) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_getValue(key,data[0]));
}
function setValue(key, value) {
  var data=OPTIONS_BOX[key];
  return (!data ? '': GM_setValue(key,value));
}
function getTag(name, parent){
    if(isUndefined(parent)) parent = document;
	if(typeof(parent)!='object') parent = document;	
	return parent.getElementsByTagName(name);
}
function getById(id, parent){
  if(!parent)
    parent = document;
  var obj = false
  try{obj = parent.getElementById(id)}catch(e){};
  return obj;
}
function SimulateMouse(elem,event) {
  var evObj = document.createEvent('MouseEvents');
  evObj.initEvent(event, true, false);
  elem.dispatchEvent(evObj);
}
function mycreateElement(type, attrArray, evtListener, html){
	var node = document.createElement(type);
	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}
	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	}  
	if(html) node.innerHTML = html;
	
	return node;
}
function HtmlUnicodeDecode(a){
 var b="";if(a==null){return(b)}
 var l=a.length;
 for(var i=0;i<l;i++){
  var c=a.charAt(i);
  if(c=='&'){
    var d=a.indexOf(';',i+1);
	if(d>0){
	  var e=a.substring(i+1,d);
	  if(e.length>1&&e.charAt(0)=='#'){
	    e=e.substring(1);
		if(e.charAt(0).toLowerCase()=='x'){c=String.fromCharCode(parseInt('0'+e))}else{c=String.fromCharCode(parseInt(e))}
	  }else{
	    switch(e){case"nbsp":c=String.fromCharCode(160)}
	  }i=d;
	}
  }b+=c;
 }return b;
};

//=========================== BROWSER DETECTION / ADVANCED SETTING ===========================================//
function ApiBrowserCheck() {
  //delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }

  
  var needApiUpgrade=false;
  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; show_alert('Opera detected...',0);
  }
  if(typeof(GM_setValue)!='undefined') {
    var gsv=GM_setValue.toString();
    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; show_alert('GreaseMonkey Api detected...',0); } // test GM_hitch
    else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; show_alert('Bugged Chrome GM Api detected...',0); }
  } else { needApiUpgrade=true; show_alert('No GM Api detected...',0); }

  if(needApiUpgrade) {
    GM_isAddon=true; show_alert('Try to recreate needed GM Api...',0);
    //OPTIONS_BOX['FLASH_PLAYER_WMODE'][3]=2; OPTIONS_BOX['FLASH_PLAYER_WMODE_BCHAN'][3]=2; // Change Default wmode if there no greasemonkey installed
    var ws=null; try { ws=typeof(unsafeWindow.localStorage) } catch(e) { ws=null; } // Catch Security error
    if(ws=='object') {
      show_alert('Using localStorage for GM Api.',0);
      GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
      GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      show_alert('Using temporarilyStorage for GM Api.',0); gvar.temporarilyStorage=new Array();
      GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
    }
    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
    if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      show_alert('Using XMLHttpRequest for GM Api.',0);
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
  } } } // end needApiUpgrade
  GM_getIntValue=function(name,defValue) { return parseInt(GM_getValue(name,defValue),10); }
}

// ------------
// my ge-debug
function show_alert(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  GM_log('('+arguments.callee.counter+') '+msg);
  if(force==0) { return; }
}


// ------
init();
// ------

})();
/* Mod By Idx. */