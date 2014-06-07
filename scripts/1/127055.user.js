// ==UserScript==
// @name			FBSmile Chat Facebook
// @description		Facebook اضافة الرموز لنوافذ المحادثات في
// @version			1.7
// @author			RaKaN Al-Harbi
// @namespace		https://www.facebook.com/pages/FBSmile-Chat/200443440057919
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


	var HttpsOn = window.location.href.match('https://')?true:false;

	var lnkImages = (HttpsOn?'https://s-':'http://')+'static.ak.fbcdn.net/images/';
	var lnkResources = (HttpsOn?'https://s-':'http://')+'static.ak.fbcdn.net/rsrc.php/';
	var lnkGraph = (HttpsOn?'https://':'http://')+'graph.facebook.com/';    
    var lnkScript = (HttpsOn?'https://':'http://')+'www.facebook.com/pages/FBSmile-Chat/200443440057919';
    var lnkRAKAN = (HttpsOn?'https://':'http://')+'www.facebook.com/rakan938';
    var lnkMemeDB = "http://sites.google.com/site/rakan938/meme_by_turbolego_com.xml";

    var fbc_name = 'FBSmile Chat Facebook';
    var fbc_aunm = 'RaKaN Al-Harbi';
    var fbc_ver = '1.7';
    
    var fbc_lstV_a = 'class="uiMediaThumb" style="margin:2px;text-decoration:none;"';
    var fbc_lstV_b = '<div class="tagWrapper">';
    var fbc_lstV_c = '<div class="left blackwash"/><div class="right blackwash"/><div class="top blackwash"/><div class="bottom blackwash"/></div>';
    var fbc_lstV_d = '<span class="uiButtonText" style="font-size:larger;">';
    var fbc_lstV_e = 'background-repeat:no-repeat;display:inline-block;height:16px;width:16px';
	var fbc_lstV_f = '/picture?type=thumbnail';
    var fbc_lstV_h = 'direction:ltr;display:none;width:100%;overflow:auto;overflow-x:hidden;';
    
    var fbc_desc = 'اضافة الرموز لنوافذ المحادثات في Facebook';
    var fbc_lstV_g = 'هذه الصور تخضع لسياسة تطبيق Graph API الخاص بفيس بوك, والتي تحد من الإستخدام المفرط للصور, لذلك قد لا تظهر ( لبعض الوقت فقط ) إذا بالغت في إستخدامها أو أستعراضها .';

    var headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		var styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML = 
            '.fbc_cmd{cursor:pointer;background-position:-0px -34px;}'+
            '.fbc_bYlw{direction:rtl;text-align:justify;border-bottom:none;border-left:none;border-right:none;margin:6px -10px -11px -10px;}'+
            '.sp_afub6d{background-image:url('+lnkResources+'v1/y-/r/IdaDugpPYZb.png);'+fbc_lstV_e+'}'+
            '.sx_2a25ac{background-position:-16px -34px}'+
            '.sx_e5943a{background-position:-16px -272px}'+
            '.sp_cxh3bh{background-image:url('+lnkResources+'v1/yq/r/BmIxP1-tXDZ.png);'+fbc_lstV_e+'}'+
            '.sx_acd4ba{background-position:-33px -91px}'+
            '.sp_4cc1bv{background-image:url('+lnkResources+'v1/yd/r/7J5PXq5zFmL.png);'+fbc_lstV_e+'}'+
            '.sx_7d47f4{background-position:-0px -0px}'+
            '.fbc_meme_hr{display:none;margin-right:-10px;margin-left:-10px;}';
		headTag.appendChild(styleTag);
	}
    
	document.addEventListener('DOMNodeInserted', fbc_in_hed, false);        
        
    $('.fbc_lnkEmoticons').live('click',function(){ fbc_DialogBox('الرموز التعبيرية',fbc_lstEmoticons_A(),
        '<label class="fbc_btn_emo_ico uiButton uiButtonConfirm uiButtonDisabled"><input type="button" value="الرموز التعبيرية"/></label>'+
        '<label class="fbc_btn_emo_img uiButton uiButtonConfirm"><input type="button" value="الرموز المصورة"/></label>'+
        '<label class="fbc_btn_emo_smp uiButton uiButtonConfirm"><input type="button" value="الرموز الخطية"/></label>');
    });
    $('.fbc_btn_emo_ico, .fbc_btn_emo_img, .fbc_btn_emo_smp').live('click',function(){
        if($(this).is('.uiButtonDisabled')){return false;}
        $(this).addClass('uiButtonDisabled');        
        $('.fbc_dialg .dialog_title span').empty().text($(this).find('input').val());
    });
    $('.fbc_btn_emo_ico').live('click',function(){
        $('.fbc_dialg .dialog_body .clearfix').empty().html(fbc_lstEmoticons_A());
        $('.fbc_btn_emo_img, .fbc_btn_emo_smp').removeClass('uiButtonDisabled');
    });
    $('.fbc_btn_emo_img').live('click',function(){
        $('.fbc_dialg .dialog_body .clearfix').empty().html(fbc_lstEmoticons_B());
        $('.fbc_btn_emo_ico, .fbc_btn_emo_smp').removeClass('uiButtonDisabled');
    });
    $('.fbc_btn_emo_smp').live('click',function(){
        $('.fbc_dialg .dialog_body .clearfix').empty().html(fbc_lstEmoticons_C());
        $('.fbc_btn_emo_img, .fbc_btn_emo_ico').removeClass('uiButtonDisabled');
    });
    $('.fbc_lnkSymbols').live('click',function(){ fbc_DialogBox('الرموز الحرفية',fbc_lstSymbols(),'');});
    $('.fbc_lnkArt').live('click',function(){ fbc_DialogBox('الرموز المركبة',fbc_lstArts(),'');});
    $('.fbc_lnkFriends').live('click',function(){ fbc_DialogBox('رموز الأعضاء في هذه الصفحة',fbc_lstFriends(),
        '<label class="fbc_btn_update uiButton uiButtonConfirm"><input type="button" value="تحديث"/></label>');
    });
    $('.fbc_btn_update').live('click',function(){$('.fbc_dialg .dialog_body .clearfix').empty().html(fbc_lstFriends());});
    $('.fbc_lnkMemes').live('click',function(){ fbc_DialogBox('الرموز الكبيرة',fbc_lstMemes(),
        '<label class="fbc_btn_mem_spt uiButton uiButtonConfirm"><input type="button" value="مساهمة"/></label>');
    });
    $('.fbc_btn_mem_spt').live('click',function(){
        if($(this).is('.uiButtonDisabled')){return false;}
        $(this).addClass('uiButtonDisabled');        
        $('.fbc_dialg .dialog_body .clearfix').empty().html(
            'للمساهمة في إضافة رموز لهذا السكريبت قم بتنزيل الملفين التاليين على جهازك :'+
            '<ol style="text-align:left;direction:ltr;">'+
            '<li><a href="http://turbolego.com/L.txt" target="_blank">http://turbolego.com/L.txt</a> .</li>'+
            '<li><a href="'+lnkMemeDB+'" target="_blank">'+lnkMemeDB+'</a> .</li>'+
            '</ol>'+
            'الآن :'+
            '<ol>'+
            '<li>أنسخ ( كود الرمز - أسم الرمز - أسم صاحب الرمز ) الذي تريد أضافته من ( الملف الأول ) .</li>'+
            '<li>قم بإضافة ( المنسوخ ) لـ ( الملف الثاني ) حسب تنسيق XML للملف وبتشفير UTF-8 .</li>'+
            '<li>أحفظ الملف الثاني المعدل وأرسله ( كمرفق أو كرابط ) لأي من صناديق البريد التالية :'+
            '<ul style="text-align:left;direction:ltr;">'+
            '<li><a href="mailto:rakan938@hotmail.com">rakan938@hotmail.com</a> .'+
            '<li><a href="mailto:rakan938@gmail.com">rakan938@gmail.com</a> .'+
            '<li><a href="mailto:rakan938@facebook.com">rakan938@facebook.com</a> .'+
            '<ul>'+
            '</li>'+
            '</ol>'
        );
    });
    $('.fbc_meme_list a').live('click',function(){
        var code = $(this).attr('alt');
        var name = $(this).text();
        var by_n = $(this).attr('title').split(':')[0];
        var by_l = $(this).attr('name');
        $('.fbc_meme_list li').css('color','black');
        $('.fbc_meme_img').empty().html(fbc_lstMemes_Arr(code,name));
        $('.fbc_meme_info_name').empty().html(name);
        if(by_l){
            $('.fbc_meme_info_by').empty().html('<a href="'+by_l+'" target="_blank">'+by_n+'</a>');
        }else{
            $('.fbc_meme_info_by').empty().html(by_n);
        }
        $(this).closest('li').css('color','red');
    });
    $('.fbc_lnkAbout').live('click',function(){ fbc_DialogBox('حول السكريبت',fbc_About(),'');});
    $('.fbc_btn_cancel').live('click',function(){ $('.fbc_dialg').remove();});
    $('.fbc_box_cmd').live('click',function(){
        $('.uiTextareaAutogrow.input').removeClass('fbc_trg_inp');
        var inp = $(this).parents().eq(7).find('.uiTextareaAutogrow.input');
        inp.addClass('fbc_trg_inp').focus();
    });    
    $('.fbc_dialg .uiMediaThumb').live('click',function(){
        var inp = $('.fbMercuryChatTab').find('.fbc_trg_inp');
		var pos = inp.getCursorPosition();
		var setInp = inp.val().substring(0,pos) + $(this).attr('alt') + inp.val().substring(pos);
        inp.val(setInp).focus();
        $('.fbc_dialg').remove();
    });    
    $('.fbMercuryChatTab .uiTextareaAutogrow.input').live('click',function(){
        $('.uiTextareaAutogrow.input').removeClass('fbc_trg_inp');
        $(this).addClass('fbc_trg_inp');
    });
	$('.fbc_cmd').live('mousedown',function(){ 
        $(this).parents().eq(2).find('.fbc_box_cmd').slideToggle('fast');
    }).live('mouseenter',function(){ 
        $(this).parents().eq(2).find('.fbc_box_cmd').slideDown(100);
    });
        
	function fbc_in_hed(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
			fbc_in_box_cmd(event.target);
	}

	function fbc_in_box_cmd(fbc_chat) {
		var fbc_chat_box = fbc_chat.getElementsByClassName('fbNubFlyoutHeader')[0];
        var fbc_a = '<span class="uiButtonGroupItem buttonItem">';
        var fbc_b = 'uiButton uiButtonOverlay';
        var fbc_c = 'mrs img sp_afub6d';
        var fbc_d = '<span class="uiButtonText" style="font-size:larger;">';
        var fbc_e = 'tooltip-alignh="center" data-hover="tooltip"';
        var fbc_chat_box_cmd = 
        '<span class="uiButtonGroup uiButtonGroupOverlay" style="margin:3px 3px 5px 3px;">'+
            fbc_a+'<a href="#" title="الرموز التعبيرية" '+fbc_e+' class="fbc_lnkEmoticons '+fbc_b+'">'+'<i class="'+fbc_c+' sx_2a25ac"/>'+'</a>'+'</span>'+
            fbc_a+'<a href="#" title="الرموز الحرفية" '+fbc_e+' class="fbc_lnkSymbols '+fbc_b+'">'+fbc_d+'✽</span>'+'</a>'+'</span>'+
            fbc_a+'<a href="#" title="الرموز المركبة" '+fbc_e+' class="fbc_lnkArt '+fbc_b+'">'+fbc_d+'⊙_☉</span>'+'</a>'+'</span>'+
            fbc_a+'<a href="#" title="رموز الأعضاء في هذه الصفحة" '+fbc_e+' class="fbc_lnkFriends '+fbc_b+'">'+'<i class="mrs img sp_cxh3bh sx_acd4ba"/>'+'</a>'+'</span>'+
            fbc_a+'<a href="#" title="الرموز الكبيرة" '+fbc_e+' class="fbc_lnkMemes '+fbc_b+'">'+'<i class="mrs img sp_4cc1bv sx_7d47f4"/>'+'</a>'+'</span>'+
            fbc_a+'<a href="#" title="حول السكريبت" '+fbc_e+' class="fbc_lnkAbout '+fbc_b+'">'+'<i class="'+fbc_c+' sx_e5943a"/>'+'</a>'+'</span>'+
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
            '<a href="#" onclick="return false;" class="sp_afub6d fbc_cmd" style="margin-top:5px;" title="الرموز" tooltip-alignh="center" data-hover="tooltip"/>'
        );
	}
    
    function fbc_DialogBox(title,bodyContent,btn_plus) {
	   $('.fbc_dialg').remove();
	   var str = '<div class="generic_dialog_popup" style="top:125px;">'+
				'<div class="pop_container_advanced">'+
					'<div class="pop_content">'+
					'<h2 class="dialog_title"><span>'+title+'</span></h2>'+
						'<div class="dialog_content">'+
							'<div class="dialog_body"><div class="clearfix">'+bodyContent+'</div></div>'+
							'<div class="dialog_buttons clearfix">'+
                                '<div class="dialog_buttons_msg"></div>'+
                                btn_plus+
								'<label class="fbc_btn_cancel uiButton"><input type="button" name="cancel" value="إلغاء"/></label>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
	   $("body").append('<div class="fbc_dialg generic_dialog pop_dialog pop_dialog_rtl" style="z-index:999999999;">'+str+'</div>');
    }
            
    function fbc_About() {
        var str ='';
        str += '<div style="text-align:left;direction:ltr;"><h2>'+fbc_name+' '+fbc_ver+'</h2></div>';
        str += '<div style="text-align:left;direction:ltr;"><a href="'+lnkScript+'">'+lnkScript+'</a></div>';
        str += '<br/>';
        str += '<div>'+fbc_desc+'</div>';
        str += '<div style="direction:ltr;"><a href="'+lnkRAKAN+'">'+lnkRAKAN+'</a> :( '+fbc_aunm+' ) برمجة</div>';
        str +='<hr style="margin-right:-10px;margin-left:-10px;"/>';
        str += '<div>شكرا لـ:</div>';
        str += '<div><a href="'+(HttpsOn?'https://':'http://')+'www.facebook.com/Michaethefox">Michael Fox</a></div>';
        return str;
    }
    
    function fbc_lstEmoticons_A() {
        var str ='';
        var arrA = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3', '(Y)'];
    	for(i=0;i<arrA.length;i+=1) {
            str += '<a href="#" alt="'+arrA[i]+'" title="'+arrA[i]+'" '+fbc_lstV_a+'>'+fbc_lstV_b;
            str += '<img class="emote_img" src="'+lnkImages+'blank.gif" style="background-position:-'+16*i+'px 0px;"/>';
    		str += fbc_lstV_c+'</a>';
    	}
        var arrB = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];
    	for(i=0;i<arrB.length;i+=2) {
    		str += '<a href="#" alt="'+arrB[i]+'" title="'+arrB[i]+'" '+fbc_lstV_a+'>'+fbc_lstV_b;
            str += '<img class="emote_custom" src="'+lnkImages + arrB[i+1]+'"/>'+fbc_lstV_c+'</a>';
    	}
        return str;
    }

    function fbc_lstEmoticons_B() {
        var str ='';
        str +='<div style="height:120px;overflow:auto;overflow-x:hidden;">'
        var arr = ['[[329135803797520]]','[[329135820464185]]','[[329135840464183]]','[[329135853797515]]',
                   '[[329135873797513]]','[[329135897130844]]','[[329135923797508]]','[[329135930464174]]',
                   '[[329135960464171]]','[[329135987130835]]','[[329136013797499]]','[[329136037130830]]',
                   '[[329136063797494]]','[[329136083797492]]','[[329136127130821]]','[[329136157130818]]',
                   '[[329136210464146]]','[[329136230464144]]','[[329136240464143]]','[[329136250464142]]',
                   '[[329136277130806]]','[[329136300464137]]','[[329136323797468]]','[[329136337130800]]',
                   '[[329136357130798]]','[[329136390464128]]','[[329136413797459]]','[[329136433797457]]',
                   '[[329136443797456]]','[[329136463797454]]','[[329136487130785]]','[[329136510464116]]',
                   '[[329136533797447]]','[[329136563797444]]','[[329136593797441]]','[[329136610464106]]',
                   '[[329136627130771]]','[[329136633797437]]','[[329136640464103]]','[[329136647130769]]',
                   '[[329136663797434]]','[[329136680464099]]','[[329136690464098]]','[[329136700464097]]',
                   '[[329136717130762]]','[[329136747130759]]','[[329136783797422]]','[[329136790464088]]',
                   '[[329136817130752]]','[[329136847130749]]','[[329136873797413]]','[[329136893797411]]',
                   '[[329136917130742]]','[[329136933797407]]','[[329136953797405]]','[[329136963797404]]',
                   '[[329136983797402]]','[[329137003797400]]','[[329137010464066]]','[[329137027130731]]',
                   '[[329137050464062]]','[[329137083797392]]','[[329137107130723]]','[[329137143797386]]',
                   '[[329137177130716]]','[[329137197130714]]','[[329137223797378]]','[[329137240464043]]',
                   '[[329137270464040]]','[[329137297130704]]','[[329137307130703]]','[[329137323797368]]',
                   '[[329137340464033]]','[[329137360464031]]','[[329137380464029]]','[[329137400464027]]',
                   '[[329137443797356]]','[[329137473797353]]','[[329137490464018]]',
                   
                   '[[348367578524911]]','[[191313654303915]]','[[191316447636969]]','[[191323557636258]]',
                   '[[191325690969378]]','[[191325924302688]]','[[191327717635842]]','[[191327857635828]]',
                   '[[191327974302483]]','[[192120940889853]]',
                   
                   '[[126138614064758]]','[[126229577388995]]','[[126226617389291]]','[[126218570723429]]',
                   '[[126229860722300]]','[[121697754525998]]','[[121703541192086]]','[[394930959230]]',
                   '[[126138614064758]]','[[126229577388995]]','[[126226617389291]]','[[126218157390137]]',
                   '[[126138614064758]]','[[126138614064758]]','[[126230880722198]]','[[126229860722300]]',
                   '[[126216480723638]]','[[389448181885]]','[[425716684438]]','[[126229700722316]]',
                   '[[126228947389058]]','[[389448871885]]','[[348357068525962]]'
        ];
    	for(i=0;i<arr.length;i+=1) {
            str += '<a href="#" alt="'+arr[i]+'" title="'+arr[i]+'" '+fbc_lstV_a+'>'+fbc_lstV_b;
            str += '<img src="'+lnkGraph + arr[i].replace(/\]]|\[\[/g,'') + fbc_lstV_f+'" class="emote_custom"/>'+fbc_lstV_c+'</a>';
    	}
        str +='</div>';
        str +='<div class="pam uiBoxYellow fbc_bYlw">'+fbc_lstV_g+'</div>';
        return str;
    }
    
    function fbc_lstEmoticons_C() {
        var str ='';
        str +='<div style="height:120px;overflow:auto;overflow-x:hidden;">'
        var arr = ['[[362237430487357]]','[[362237447154022]]','[[362237470487353]]','[[362237480487352]]',
                   '[[362237497154017]]','[[362237540487346]]','[[362237567154010]]','[[362237593820674]]',
                   '[[362237610487339]]','[[362237643820669]]','[[362237677153999]]','[[362237700487330]]',
                   '[[362237727153994]]','[[362237747153992]]','[[362237793820654]]','[[362237850487315]]',
                   '[[362237867153980]]','[[362237877153979]]','[[362237897153977]]','[[362237907153976]]',
                   '[[362237917153975]]','[[362237970487303]]','[[362238013820632]]','[[362238070487293]]',
                   '[[362238117153955]]','[[362238133820620]]','[[362238153820618]]','[[362238170487283]]',
                   '[[362238190487281]]','[[362238220487278]]','[[362238253820608]]','[[362238287153938]]',
                   '[[362238313820602]]','[[362238333820600]]','[[362238400487260]]','[[362238417153925]]',
                   '[[362238433820590]]','[[362238457153921]]','[[362238487153918]]','[[362238500487250]]',
                       
                   '[[363461117031655]]','[[363460537031713]]','[[363460563698377]]','[[363460583698375]]',
                   '[[363460607031706]]','[[363460617031705]]','[[363460630365037]]','[[363460653698368]]',
                   '[[363460687031698]]','[[363460703698363]]','[[363460710365029]]','[[363460727031694]]',
                   '[[363460763698357]]','[[363460793698354]]','[[363460820365018]]','[[363460843698349]]',
                   '[[363460887031678]]','[[363460910365009]]','[[363460920365008]]','[[363460940365006]]',
                   '[[363460953698338]]','[[363460967031670]]','[[363460973698336]]','[[363460997031667]]',
                   '[[363461023698331]]','[[363461033698330]]','[[363461050364995]]','[[363461070364993]]',
                   '[[363461090364991]]','[[363461147031652]]','[[363461177031649]]','[[363461207031646]]',
                   '[[363461217031645]]','[[363461233698310]]','[[363461247031642]]','[[363461273698306]]',
                   '[[363461290364971]]','[[363461307031636]]','[[363461317031635]]','[[363461330364967]]'
        ];
    	for(i=0;i<arr.length;i+=1) {
    		str += '<a href="#" alt="'+arr[i]+'" title="'+arr[i]+'" '+fbc_lstV_a+'>'+fbc_lstV_b;
            str += '<img src="'+lnkGraph + arr[i].replace(/\]]|\[\[/g,'') + fbc_lstV_f+'" class="emote_custom"/>'+fbc_lstV_c+'</a>';
    	}
        str +='</div>';
        str +='<div class="pam uiBoxYellow fbc_bYlw">'+fbc_lstV_g+'</div>';
        return str;
    }
    
    function fbc_lstSymbols() {
        var str ='';
        var arr = ['✈','♬','☑','☎','☒','☻','♤','☤','☹','♀','✩','✉','✇','✖','♨','❦','☁','✌','♛','❁','☪','☂'
                  ,'✏','♝','❀','☭','☃','☛','♞','✿','☚','♘','✾','☯','☾','☝','♖','✽','✝','☄','☟','♟','✺'
                  ,'☥','✂','✍','♕','✵','☮','☠','❤','☆','★','♫','✔','►','Ω','ッ','●','♣','♪','☼','◄','❥','♂','◘'
                  ,'♠','♦','☺','○','↕','‼','¶','↑','↓','→','←','▲','▼','©','™','¹','²','³','¼','½','¾','⅓','⅔','№','℗','℞','℧','♈'
                  ,'♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'
        ];
    	for(i=0;i<arr.length;i+=1) {
    		str += '<a href="#" alt="'+arr[i]+'" title="'+arr[i]+'" '+fbc_lstV_a+'>';
            str += fbc_lstV_b+fbc_lstV_d+arr[i]+'</span>'+fbc_lstV_c+'</a>';
    	}
        return str;
    }

    function fbc_lstArts() {
        var str ='';
        var arr = ['◠◡◠','◔◡◔','◉◡◉','❂◡❂','^◡^','°◡°','≧◡≦','(─‿‿─)','ᵔ.ᵔ','^.^'
                  ,'(¬‿¬)','(●̮̮̃•)','(̃-̮̮̃-)','(-̮̮̃•)','(×̯×)','(•̮̮̃-̃)','(^,^)','乂⍲‿⍲乂','◠‿◠','☜(˚▽˚)☞'
                  ,'๏̯͡๏','๏̯̃๏','ಠ_ರ','╯.╰','ಥ_ಥ','(╥﹏╥)'
                  ,'◕ ‿ ◕','◡‿◡','◠‿◠','❀‿❀','(>‘o’)>','(ノಠ益ಠ)ノ','⊙_☉','⊙.☉','≧⁰,⁰≦','(O.O)','ૅ.ે'
                  ,'(~_^)','ό,ὸ','◐.̃◐','ಠ_ಠ','ʘ‿ʘ','➳♥','웃❤유','☜♡☞','(ᵕ.ᵕ)','εїз','Ƹ̵̡Ӝ̵̨̄Ʒ','┏(・o･)┛','(´ー`)','(´∇｀)'
        ];
    	for(i=0;i<arr.length;i+=1) {
    		str += '<a href="#" alt="'+arr[i]+'" title="'+arr[i]+'" '+fbc_lstV_a+'>';
    		str += fbc_lstV_b+fbc_lstV_d+arr[i]+'</span>'+fbc_lstV_c+'</a>';
    	}
        return str;
    }
    
    function fbc_lstMemes() {
        var str ='';
        str +='<div class="fbc_meme_info" style="display:none;">'
        str +='<div class="lfloat" style="direction:ltr;"><strong class="fbc_meme_info_name"></strong> :الرمز</div>'
        str +='<div class="rfloat" style="direction:ltr;"><strong class="fbc_meme_info_by"></strong> :بواسطة</div>'
        str +='<div style="clear:both;"></div>';
        str +='</div>';
        str +='<div class="fbc_meme_error" style="display:none;">';
        str +='<div style="color:red;text-align:justify;"><strong class="fbc_meme_error_txt">خطأ.</strong></div>';
        str +='</div>';        
        str +='<div class="fbc_meme_loading">';
        str +='<div class="rfloat"><img class="jewelLoading img" src="'+lnkResources+'v1/yb/r/GsNJNwuI-UM.gif" alt=""/></div>';
        str +='<div class="lfloat" style="text-align:justify;"><strong>الرجاء الإنتظار ...</strong></div>';
        str +='<div style="clear:both;"></div>';
        str +='</div>';        
        str +='<hr class="fbc_meme_hr"/>';
        str +='<div class="fbc_meme_img" style="'+fbc_lstV_h+'text-align:center;height:130px;"></div>';
        str +='<hr class="fbc_meme_hr"/>'
        str +='<div class="fbc_meme_list " style="'+fbc_lstV_h+'text-align:justify;height:75px;">';
        str += '<ol type="1" start="1" style="margin-top:0;">';
        str += '</ol>';
        str +='</div>';        
        str +='<div class="pam uiBoxYellow fbc_bYlw">'+fbc_lstV_g+'</div>';
        fbc_lstMemes_lst();        
        return str;
    }

    function fbc_lstMemes_lst() {
        GM_xmlhttpRequest({
            method: "GET",
            url: lnkMemeDB,
            headers:{
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Accept': 'application/atom+xml,application/xml,text/xml',
                'Cache-Control': 'Public',
            },
            onload: function(res) {
                var xmlData = res.responseText;
                if(res.status === 200){
                    $(xmlData).find('icon').each(function(i){
                        var name = $(this).find('name').text();
                            name = (name) ? (name) : 'Unknown';
                        var by_n = $(this).find('by').attr('name');
                            by_n = (by_n) ? (by_n) : 'Unknown';
                        var by_l = $(this).find('by').attr('link');
                            by_l = (by_l) ? ('http://'+by_l) : '';
                        var code = $(this).find('code').text();
                        if(i === 0){
                            $('.fbc_meme_info_name').empty().html(name);
                            $('.fbc_meme_img').empty().html(fbc_lstMemes_Arr(code,name));
                            if(by_l){
                                $('.fbc_meme_info_by').empty().html('<a href="'+by_l+'" target="_blank">'+by_n+'</a>');
                            }else{
                                $('.fbc_meme_info_by').empty().html(by_n);
                            }
                        }
                        $('.fbc_meme_list ol').append('<li><a name="'+by_l+'" alt="'+code+'" title="'+by_n+' :بواسطة" href="#">'+name+'</a></li>');
                        $('.fbc_meme_list ol li').eq(0).css('color','red');
                    });
                    $('.fbc_meme_loading').hide();
                    $('.fbc_meme_info').show();
                    $('.fbc_meme_img').show();
                    $('.fbc_meme_list').show();
                    $('.fbc_meme_hr').show();
                }else{
                    $('.fbc_meme_loading').hide();
                    $('.fbc_meme_info').hide();
                    $('.fbc_meme_error').show();
                    $('.fbc_meme_error_txt').empty().html('حصل خطأ مجهول, الرجاء إعادة المحاولة مرة اخرى.');
                }
            }
        });
    }
        
    function fbc_lstMemes_Arr(img, title) {
        var str = '';
        var num = 0;
        var nums = img.split('\\n')[0].split(']]').length -1;
        var arr = img.match(/[^\[[]+/g);
        var alt = img.replace(/\\n| /g,'');
        str += '<a href="#" alt="'+alt+'" title="'+title+'" '+fbc_lstV_a+'>';
        for(i=0;i<arr.length;i+=1) {
            var pid = arr[i].replace(/[^\d.]/g,'');
            if(pid){
                num++;
      		    str += '<img src="'+lnkGraph + pid + fbc_lstV_f +'" class="emote_custom"/>';
                if(num==nums){str +='<br/>';num=0;}
            }
        }
        str += '</a>';
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
    		str += '<a href="#" alt="'+arrTHS[1]+'" title="'+arrTHS[1]+'" '+fbc_lstV_a+'>'+fbc_lstV_b;
    		str += '<img class="emote_custom" src="'+arrTHS[0]+'"/>'+fbc_lstV_c+'</a>';
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