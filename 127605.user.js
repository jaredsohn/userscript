// ==UserScript==
// @name			Facebook Smile Chat
// @description			Smile for facebook
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @author			El Audoramus Gabriella Espadas
// @version			1.0
// @versionnumber	1.0
// @namespace		http://www.facebook.com/espadas.cyber
// ==/UserScript==


	var HttpsOn = window.location.href.match('https://')?true:false;
	var ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	var ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';
    var fbc_name = 'Facebook Smile Chat';
    var fbc_desc = 'Version 1.0 [BETA]';
    var fbc_page = 'http://www.facebook.com/espadas.cyber';
    var fbc_aunm = 'El Audoramus Gabriella Espadas';
    var fbc_aupg = HttpsOn?'http://www.facebook.com/hackeeeeeeeeeeeeed':'http://www.facebook.com/hackeeeeeeeeeeeeed';
    var fbc_ver = 1.0;
    
    var fbc_lstV_a = 'class="uiMediaThumb" style="margin:2px;text-decoration:none;"';
    var fbc_lstV_b = '<div class="tagWrapper">';
    var fbc_lstV_c = '<div class="left blackwash"/><div class="right blackwash"/><div class="top blackwash"/><div class="bottom blackwash"/></div>';
    var fbc_lstV_d = '<span class="uiButtonText" style="font-size:larger;">';
    var fbc_lstV_e = 'background-repeat:no-repeat;display:inline-block;height:16px;width:16px';
	
    var headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		var styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML = 
            '.fbc_cmd{cursor:pointer;background-position:-0px -34px;}'+
            '.sp_afub6d{background-image:url('+ResourcesURL+'v1/y-/r/IdaDugpPYZb.png);'+fbc_lstV_e+'}'+
            '.sx_2a25ac{background-position:-16px -34px}'+
            '.sx_e5943a{background-position:-16px -272px}'+
            '.sp_cxh3bh{background-image:url('+ResourcesURL+'v1/yq/r/BmIxP1-tXDZ.png);'+fbc_lstV_e+'}'+
            '.sx_acd4ba{background-position:-33px -91px}';
		headTag.appendChild(styleTag);
	}
    
	document.addEventListener('DOMNodeInserted', fbc_in_hed, false);
    	    
    $('.fbc_lnkEmoticons').live('click',function(){ fbc_DialogBox('Emoticon',fbc_lstEmoticons());});
    $('.fbc_lnkSymbols').live('click',function(){ fbc_DialogBox('Symbol',fbc_lstSymbols());});
    $('.fbc_lnkArt').live('click',function(){ fbc_DialogBox('Special Emoticon',fbc_lstArts());});
    $('.fbc_lnkFriends').live('click',function(){ fbc_DialogBox('Emoticon Friend',fbc_lstFriends(),true);});
    $('.fbc_lnkAbout').live('click',function(){ fbc_DialogBox('About',fbc_About());});
    $('.fbc_btn_cancel').live('click',function(){ $('.fbc_dialg').remove(); });
    $('.fbc_btn_update').live('click',function(){$('.fbc_dialg .dialog_body .clearfix').empty().html(fbc_lstFriends());});
    $('.fbc_dialg .uiMediaThumb').live('click',function(){
        var inp = $('.fbDockChatTab.openToggler .uiTextareaAutogrow.input');
		var pos = inp.getCursorPosition();
		var setInp = inp.val().substring(0,pos) + $(this).attr('alt') + inp.val().substring(pos);
        inp.val(setInp);
        $('.fbc_dialg').remove();
    });
	$('.fbc_cmd').live('mousedown',function(){ 
        $(this).parent().parent().parent().find('.fbc_box_cmd').slideToggle("fast");
    }).live('mouseenter',function(){ 
        $(this).parent().parent().parent().find('.fbc_box_cmd').slideDown(100);
    });
        
	function fbc_in_hed(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
			fbc_in_box_cmd(event.target);
	}

	function fbc_in_box_cmd(fbc_chat) {
		var fbc_chat_box = fbc_chat.getElementsByClassName('fbNubFlyoutHeader')[0];
        var fbc_a = '<span class="uiButtonGroupItem buttonItem">';
        var fbc_b = 'uiButton uiButtonOverlay uiButtonLarge';
        var fbc_c = 'mrs img sp_afub6d';
        var fbc_d = '<span class="uiButtonText" style="font-size:larger;">';
        var fbc_e = 'tooltip-alignh="center" data-hover="tooltip"';
        var fbc_chat_box_cmd = 
        '<span class="uiButtonGroup uiButtonGroupOverlay" style="margin:3px 3px 5px 3px;">'+
            fbc_a+'<a href="#" title="Emoticon" '+fbc_e+' class="fbc_lnkEmoticons '+fbc_b+'">'+'<i class="'+fbc_c+' sx_2a25ac"/>'+'</a>'+'</span>'+
            fbc_a+'<a href="#" title="Symbol" '+fbc_e+' class="fbc_lnkSymbols '+fbc_b+'">'+fbc_d+'►</span>'+'</a>'+'</span>'+
            fbc_a+'<a href="#" title="Special Emoticon" '+fbc_e+' class="fbc_lnkArt '+fbc_b+'">'+fbc_d+'^_^</span>'+'</a>'+'</span>'+
            fbc_a+'<a href="#" title="Emoticon Friend" '+fbc_e+' class="fbc_lnkFriends '+fbc_b+'">'+'<i class="mrs img sp_cxh3bh sx_acd4ba"/>'+'</a>'+'</span>'+
            fbc_a+'<a href="#" title="About" '+fbc_e+' class="fbc_lnkAbout '+fbc_b+'">'+'<i class="'+fbc_c+' sx_e5943a"/>'+'</a>'+'</span>'+
        '</span>';
        $(fbc_chat_box).append(
            '<div class="sheetContainer" style="width:100%;">'+
            '<div class="sheet" style="bottom:0px;width:100%;">'+
            '<div class="UIImageBlock clearfix">'+
            '<div class="fbc_box_cmd" style="display:none;">'+fbc_chat_box_cmd+'</div>'+
            '</div></div></div>'
        );
        var vhf = fbc_chat.getElementsByClassName('fbNubFlyoutTitlebar')[0];
        $(vhf).find('.mls').append(
            '<a href="#" onclick="return false;" class="sp_afub6d fbc_cmd" style="margin-top:5px;" title="Open Smile" tooltip-alignh="center" data-hover="tooltip"/>'
        );
        
	}
    
    function fbc_DialogBox(title,bodyContent,btn_update) {
	   $('.fbc_dialg').remove();
	   var upd_btn = (btn_update)?'<label class="fbc_btn_update uiButton uiButtonLarge uiButtonConfirm"><input type="button" name="update"  value="Refresh"/></label>':'';
	   var str = '<div class="generic_dialog_popup" style="top:125px;">'+
				'<div class="pop_container_advanced">'+
					'<div class="pop_content">'+
					'<h2 class="dialog_title"><span>'+title+'</span></h2>'+
						'<div class="dialog_content">'+
							'<div class="dialog_body"><div class="clearfix">'+bodyContent+'</div></div>'+
							'<div class="dialog_buttons clearfix">'+
								'<label class="fbc_btn_cancel uiButton uiButtonLarge"><input type="button" name="cancel" value="Close"/></label>'+
                                upd_btn+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
	   $("body").append('<div class="fbc_dialg generic_dialog pop_dialog" style="z-index:999999999;">'+str+'</div>');
    }
            
    function fbc_About() {
	   return '<h2>'+fbc_name+'</h2><div>'+fbc_desc+'</div>'+
	   '<div>Fans Page:<a href="'+fbc_page+'">'+fbc_page+'</a><br/>'+
	   '<p>Created By El Audoramus Gabriella Espadas:<br/><a href="'+fbc_aupg+'">'+fbc_aupg+'</a></p></div>';
    }
    
    function fbc_lstEmoticons() {
        var str ='';
        var arrEmoA = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3', '(Y)'];
    	for(i=0;i<arrEmoA.length;i+=1) {
    		str += 
                '<a href="#" alt="'+arrEmoA[i]+'" title="'+arrEmoA[i]+'" '+fbc_lstV_a+'>'+fbc_lstV_b+
                '<img class="emote_img" src="'+ImagesURL+'blank.gif" style="background-position:-'+16*i+'px 0px;"/>'+
                fbc_lstV_c+'</a>';
    	}
        var arrEmoB = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];
    	for(i=0;i<arrEmoB.length;i+=2) {
    		str += 
                '<a href="#" alt="'+arrEmoB[i]+'" title="'+arrEmoB[i]+'" '+fbc_lstV_a+'>'+fbc_lstV_b+
                '<img class="emote_custom" src="'+ImagesURL + arrEmoB[i+1]+'"/>'+fbc_lstV_c+'</a>';
    	}
        return str;
    }

    function fbc_lstSymbols() {
        var str ='';
        var arrSymp = ['✈','♬','☑','☎','☒','☻','♤','☤','☹','♀','✩','✉','✇','✖','♨','❦','☁','✌','♛','❁','☪','☂'
                        ,'✏','♝','❀','☭','☃','☛','♞','✿','☚','♘','✾','☯','☾','☝','♖','✽','✝','☄','☟','♟','✺'
                        ,'☥','✂','✍','♕','✵','☮','☠','❤','☆','★','♫','✔','►','Ω','ッ','●','♣','♪','☼','◄','❥','♂','◘'
                        ,'♠','♦','☺','○','↕','‼','¶','↑','↓','→','←','▲','▼','©','™','¹','²','³','¼','½','¾','⅓','⅔','№','℗','℞','℧','♈'
                        ,'♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'
        ];
    	for(i=0;i<arrSymp.length;i+=1) {
    		str += 
                '<a href="#" alt="'+arrSymp[i]+'" title="'+arrSymp[i]+'" '+fbc_lstV_a+'>'+
                fbc_lstV_b+fbc_lstV_d+arrSymp[i]+'</span>'+fbc_lstV_c+'</a>';
    	}
        return str;
    }

    function fbc_lstArts() {
        var str ='';
        var arrArt = ['◠◡◠','◔◡◔','◉◡◉','❂◡❂','^◡^','°◡°','≧◡≦','(─‿‿─)','ᵔ.ᵔ','^.^'
                        ,'(¬‿¬)','(●̮̮̃•)','(̃-̮̮̃-)','(-̮̮̃•)','(×̯×)','(•̮̮̃-̃)','(^,^)','乂⍲‿⍲乂','◠‿◠','☜(˚▽˚)☞'
                        ,'๏̯͡๏','๏̯̃๏','ಠ_ರ','╯.╰','ಥ_ಥ','(╥﹏╥)'
                        ,'◕ ‿ ◕','◡‿◡','◠‿◠','❀‿❀','(>‘o’)>','(ノಠ益ಠ)ノ','⊙_☉','⊙.☉','≧⁰,⁰≦','(O.O)','ૅ.ે'
                        ,'(~_^)','ό,ὸ','◐.̃◐','ಠ_ಠ','ʘ‿ʘ','➳♥','웃❤유','☜♡☞','(ᵕ.ᵕ)','εїз','Ƹ̵̡Ӝ̵̨̄Ʒ','┏(・o･)┛','(´ー`)','(´∇｀)'
        ];
    	for(i=0;i<arrArt.length;i+=1) {
    		str += 
                '<a href="#" alt="'+arrArt[i]+'" title="'+arrArt[i]+'" '+fbc_lstV_a+'>'+
                fbc_lstV_b+fbc_lstV_d+arrArt[i]+'</span>'+fbc_lstV_c+'</a>';
    	}
        return str;
    }

    function fbc_lstFriends() {
        var $img = $(
            'img.pic'+
            ', img.uiProfilePhoto'+
            ', img.friend'+
            ', img.fbProfileLargePortraitImgScaleWidth'+
            ', img.scaledImageFitWidth'
        );
        var arrSRC = [], arrNAM = [], str = '';
        $img.each(function () {
            var xSRC = $(this).attr("src");
            var xNAM = '';
            xNAM = xSRC.split('/');
            xNAM = xNAM[xNAM.length-1].split('_');
            xNAM = xNAM[1];
            if(xSRC.length>0 && !isNaN(xNAM) ){
                arrSRC.push(xSRC+'|[['+xNAM+']]');
            }
        });
        var arrSRC_U = uniqueArray(arrSRC);
        $(arrSRC_U).each(function (i,v) {
            var arrTHS = v.split('|');
    		str += 
                '<a href="#" alt="'+arrTHS[1]+'" title="'+arrTHS[1]+'" '+fbc_lstV_a+'>'+fbc_lstV_b+
                '<img class="emote_custom" src="'+arrTHS[0]+'"/>'+fbc_lstV_c+'</a>';
        });
        return str;
    }
    
    function uniqueArray(arr){
        var uniques=[];
        for(var i=arr.length;i--;){
            var val=arr[i];
            if($.inArray(val,uniques)===-1){uniques.unshift(val);}
        }
        return uniques;
    }         
    
    (function( $ ){
        jQuery.fn.getCursorPosition = function(){
            if(this.lengh == 0) return -1;
            return $(this).getSelectionStart();
        }
        jQuery.fn.getSelectionStart = function(){
            if(this.lengh == 0) return -1;
            input = this[0];
            var pos = input.value.length;
            if (input.createTextRange) {
                var r = document.selection.createRange().duplicate();
                r.moveEnd('character', input.value.length);
                if (r.text == '')
                    pos = input.value.length;
                pos = input.value.lastIndexOf(r.text);
            } else if(typeof(input.selectionStart)!="undefined")
                pos = input.selectionStart;
            return pos;
        }
        return this;
    })( jQuery );