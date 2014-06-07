// ==UserScript==
// @name                        HKGalden Icon+
// @version                     2.1.4.2046
// @description         More Icons for HKGalden Forum
// @icon                https://i.na.cx/0vDGt.gif
// @require       	http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @include             https://*hkgalden.com/view*
// @include             http://*hkgalden.com/view*
// @include             https://*hkgalden.com/reply*
// @include             http://*hkgalden.com/reply*
// @include             https://*hkgalden.com/post*
// @include             http://*hkgalden.com/post*
// @updateURL           https://userscripts.org/scripts/source/172932.meta.js
// @downloadURL         https://userscripts.org/scripts/source/172932.user.js
// ==/UserScript==

//HKGalden Icon+ Script is brought to you by: BB_Warrior (HKgalden ID:3794)

var win=this.unsafeWindow;
var id = new Array();
var thumbnail = new Array();
var iconSets = new Array();
var codeSets = new Array();
var oimg = ['369', 'adore', 'agree', 'angel', 'angry', 'ass', 'banghead', 'biggrin', 'bomb', 'bouncer', 'bouncy', 'bye', 'censored', 'chicken', 'clown', 'cry', 'dead', 'devil', 'donno', 'fire', 'flowerface', 'frown', 'fuck', '@', 'good', 'hehe', 'hoho', 'kill2', 'kill', 'kiss', 'love', 'no', 'offtopic', 'oh', 'photo', 'shocking', 'slick', 'smile', 'sosad', 'surprise', 'tongue', 'wink', 'wonder2', 'wonder', 'yipes', 'z'];
var ocode = ['[369]','#adore#','#yup#','O:-)',':-[','#ass#','[banghead]',':D','[bomb]','[bouncer]','[bouncy]','#bye#','[censored]','#cn#',':o)',':~(','xx(',':-]','#ng#','#fire#','[flowerface]',':-(','fuck','@_@','#good#','#hehe#','#hoho#','#kill2#','#kill#','^3^','#love#','#no#','[offtopic]',':O','[photo]','[shocking]','[slick]',':)','[sosad]','#oh#',':P',';-)','???','?_?','[yipes]','Z_Z'];
var chosen = "toggemt";
//alert(chosen);
var show = true;
var loaded = false;
var thisversionname = "2.1.4";
var thisversion = "2.1";
//var $ = function (selector) {
//        return document.querySelector(selector);
//}
var mobile = false;
if(document.URL.indexOf("m.hkgalden") != -1)
	mobile = true;

var $$ = function (selector) {
	return document.querySelectorAll(selector);
}

var doc = document.querySelector('head');

//what to do after that set of icon is clicked
function chooseActions(btn) {
	//alert(btn.id);
	// if icons are already showing
	if ( show){
      	
	//if clicked iconset is different from the showing iconsets, an animated silde and change iconset
	if ( chosen != btn.id){
	silde();
	setTimeout( function(t){
	changeiconset(btn.id);
	chosen = btn.id;
	$('#loadgif').show();
	GM_setValue("chosen", btn.id);
	},100);
	
	setTimeout( function(t){silde();$('#loadgif').hide();},1100);
	
	//if not, just silde out
	}else{
	silde();
	show = false;
	}
      
      //show icons
    }else{
      	if ( chosen != btn.id){
        	changeiconset(btn.id);
        	chosen = btn.id;
        	$('#loadgif').show();
        	GM_setValue("chosen", btn.id);
        	setTimeout( function(t){silde();show = true;$('#loadgif').hide();},1100);        	
	}else{
      	 silde();
   	 show = true;
   	
	}
   	}
}

//to slide in and out (show and hide) the icons
function silde(){
	var script = document.createElement('script');
	script.innerHTML = "$('#gae .emt').slideToggle(150);";
	document.body.appendChild(script);
	document.body.removeChild(document.body.lastChild);
}

//replace each icon with that specific set of icon
function changeiconset(bid){
	var icons = document.querySelector(".emt");
	
	//different if the chosen set is the original set
	if ( bid == "toggemt"){
	for (var j = 0; j < 46; j++) {
	icons.childNodes[j*2].setAttribute("data-code", ocode[j]);
	icons.childNodes[j*2].setAttribute("title", ocode[j]);
	icons.childNodes[j*2].setAttribute("alt", ocode[j]);
	icons.childNodes[j*2].childNodes[0].src = '/face/hkg/' +oimg[j] +'.gif';
	}
	}else{
	for (var j = 0; j < 46; j++) {
	if( !mobile){
	icons.childNodes[j*2].setAttribute("data-code", codeSets[bid.substr(7)][j]);
	icons.childNodes[j*2].setAttribute("title", codeSets[bid.substr(7)][j]);
	icons.childNodes[j*2].setAttribute("alt", codeSets[bid.substr(7)][j]);
	}else{
	  icons.childNodes[j*2].setAttribute("data-code", "[img]"+iconSets[bid.substr(7)][j]+"[/img]");
	  icons.childNodes[j*2].setAttribute("title", "[img]"+iconSets[bid.substr(7)][j]+"[/img]");
	  icons.childNodes[j*2].setAttribute("alt", "[img]"+iconSets[bid.substr(7)][j]+"[/img]");
	}
	icons.childNodes[j*2].childNodes[0].src = iconSets[bid.substr(7)][j];
	}
	}
	setTimeout(function(t){}, 3000);
}


//start altering the interface
function addIcons() {
	
	//get the original biggrin thumbnail
    var originalBtn = document.querySelector("#toggemt");
        
    // original icons chosen and shown by default
    originalBtn.parentNode.chosenBtn = "";
    originalBtn.parentNode.allHidden = false;
	
	// clone button and pad its id
	for ( var val in id){
	var cloneID = val;
	var cloneBtn = document.querySelector("#toggemt").cloneNode(true);
	originalBtn.parentNode.appendChild(cloneBtn);
	cloneBtn.id += cloneID;
	var firstBtn;
	if ( cloneBtn.id == GM_getValue("chosen"))
	firstBtn = cloneBtn;
	 
	//change thumbnail and disable onclick toggle function
	cloneBtn.childNodes[0].setAttribute('src', thumbnail[val]);
	cloneBtn.setAttribute('title', val);
	cloneBtn.setAttribute('alt', val);
	cloneBtn.setAttribute('onclick', "");
	
	//activate chooseActions function while specific thumbnail was clicked
	if ( cloneID != "separate")
	cloneBtn.addEventListener("click", (function(c) { return function(e){ chooseActions(this, iconSets[c]); } })(cloneID), false);
	else
	cloneBtn.addEventListener("click",(function(){}));
	}
	var loadgif = originalBtn.cloneNode(true);
	loadgif.id = "loadgif";
	loadgif.childNodes[0].setAttribute('src', "http://i.na.cx/p6JO9.gif");
	loadgif.setAttribute('onclick', "");
	
	//originalBtn.setAttribute('onclick', "");
	originalBtn.parentNode.appendChild(loadgif);
	
	// add click event to original icon btn
	
	
	originalBtn.setAttribute('onclick', "");
	originalBtn.addEventListener("click", function(e) {chooseActions(this, "")}, false);
	
	if ( firstBtn != null)
	chooseActions(firstBtn, iconSets[firstBtn.id.substr(7)]);
	
	$('#loadgif').hide();
	
}

function submitfasthack(form, button, reply){
	$('#temp_' + form).remove();
	var fr = $('#' + form); 
	fr.clone(true, true).attr('id','temp_' + form).insertAfter(fr).hide();
	
	var text = $('#' + form + ' #ta').val();
	for ( var id in codeSets)
	for ( var j in codeSets[id]){
	while (text.indexOf(codeSets[id][j]) != -1)
	text = text.replace(codeSets[id][j],'[img]'+iconSets[id][j]+'[/img]');
	}
	
	$('#temp_' + form + ' #ta').val(text);
	var script = document.createElement('script');
	
	//alert(document.URL);
    script.innerHTML = "$(document).on('click','#temp_" + button +"',function(e){e.preventDefault();if($('#gae #ta').val().length > 0){$('#temp_" + button +"').attr('disabled',true);$.ajax({type:'POST',url:'/ajax/fastreply',data:$('#temp_" + form + "').serialize(),success: function(data){if(data.status == 'success'){$('#reply_content').val('');window.location.reload();}else if(data.status == 'error'){alert('Error:'+data.msg);window.location.reload();}}});}else{notify('請輸入回覆內容');}});";
	script.innerHTML +="$(document).on('keydown','#gae #ta',function(f){if(f.ctrlKey && f.keyCode == 13){$('#temp_" + button + "').click();}});";
    document.body.appendChild(script);
	document.body.removeChild(document.body.lastChild);
    
    //
}

function submitreplyhack(form, button, reply){
	$('#temp_' + form).remove();
	var fr = $('#' + form); 
	fr.clone(true, true).attr('id','temp_' + form).insertAfter(fr).hide();
	
	var text = $('#' + form + ' #ta').val();
	for ( var id in codeSets)
	for ( var j in codeSets[id]){
	while (text.indexOf(codeSets[id][j]) != -1)
	text = text.replace(codeSets[id][j],'[img]'+iconSets[id][j]+'[/img]');
	}
	
	$('#temp_' + form + ' #ta').val(text);
	var script = document.createElement('script');
	
	//alert(document.URL);
    script.innerHTML = "$(document).on('click','#temp_" + button +"',function(e){e.preventDefault();if($('#gae #ta').val().length > 0){$('#temp_" + button +"').attr('disabled',true);$.ajax({xhr:function(){var xhr = new window.XMLHttpRequest();xhr.upload.addEventListener('progress',function(evt){if(evt.lengthComputable){var percentComplete = Math.round((evt.loaded/evt.total)*100);$('#prog-bar .prog').css({'width':percentComplete+'%'});$('#prog-bar .perc').html(percentComplete +'%');}},false);return xhr;},type:'POST',url:'/ajax/" + reply + "',data:$('#temp_" + form + "').serialize(),success:function(data){console.dir(data);if(data.status == 'success'){$('#prog-bar').remove();location.href = data.return;}else{$('#new_topic').attr('disabled',false);$('#prog-bar .prog').css({'width':0});$('#prog-bar .perc').empty()}},});}else{notify('請輸入回覆內容');}})";
	

    document.body.appendChild(script);
	document.body.removeChild(document.body.lastChild);
    
}

function previewhack(form, button, reply){
	$('#temp_' + form).remove();
	var fr = $('#' + form); 
	fr.clone(true, true).attr('id','temp_' + form).insertAfter(fr).hide();
	
	var text = $('#' + form + ' #ta').val();
	for ( var id in codeSets)
	for ( var j in codeSets[id]){
	while (text.indexOf(codeSets[id][j]) != -1)
	text = text.replace(codeSets[id][j],'[img]'+iconSets[id][j]+'[/img]');
	}
	
	$('#temp_' + form + ' #ta').val(text);
	var script = document.createElement('script');
  script.innerHTML = "$(document).on('click','#temp_" + button + "',function(e){e.preventDefault();$.fancybox.showActivity;if($('#gae #ta').val().length > 0){$.ajax({type:'POST',url:'/ajax/preview/" + reply + "',data:$('#temp_" + form + "' ).serialize(),success:function(data){$.fancybox({minWidth:'70%',minHeight:'70%','content':data,});$.fancybox.hideActivity;}});}else{notify('請輸入回覆內容');}});";
	document.body.appendChild(script);
	document.body.removeChild(document.body.lastChild);

}

win.icontocode = function(text){
	for ( var id in iconSets)
	for ( var j in iconSets[id]){
	//alert(iconSets[id][j]);
	while (text.indexOf('[img]'+iconSets[id][j]+'[/img]') != -1)
	text = text.replace('[img]'+iconSets[id][j]+'[/img]', codeSets[id][j]);
	}
	return text;
}

function quotehack(){
	
	$('.fast_quote').each(function(){
	var newquote = $(this).clone().attr('class', 'temp_fast_quote');
	newquote.insertAfter($(this).hide());});

	var script = document.createElement('script');
  script.innerHTML = "$(document).on('click','.temp_fast_quote',function(){mQuoteVals = {'quote_type':$(this).attr('data-type'),'quote_id':$(this).attr('data-id')}; $.ajax({type:'POST',url:'/ajax/quote/',data:mQuoteVals,dataType:'json',success:function(rdata){$('#fpy').addClass('fcs');$('#gae #ta').focus().val('').val(icontocode(rdata.quote_content)+'\\n');}});});";
	document.body.appendChild(script);
	document.body.removeChild(document.body.lastChild);
	
}

function buttonhack(){

    
	//hack all fastquote
	quotehack();
	
	//hack fast - preview
	$("#preview_fast_reply").attr('id','temp_preview_fast_reply');
	$("#temp_preview_fast_reply").attr("type", "button");
	$("#temp_preview_fast_reply").click(function(){previewhack("fast_reply", "preview_fast_reply", "reply")});
	
	//hack newpost, reply - preview
	$("#preview_topic").attr('id','temp_preview_topic');
	$("#temp_preview_topic").attr("type", "button");
	if (document.URL.indexOf("post") == -1)
	$("#temp_preview_topic").click(function(){previewhack("reply_topic", "preview_topic", "reply")});
	else
	$("#temp_preview_topic").click(function(){previewhack("post_new_topic", "preview_topic", "topic")});
	
	//hack fast - submit	
	$("#submit_fast_reply").attr('id','temp_submit_fast_reply');
	$("#temp_submit_fast_reply").attr("type", "button");
	$("#temp_submit_fast_reply").click(function(){submitfasthack("fast_reply","submit_fast_reply", "reply")});
	
	//hack reply - submit	
	$("#reply").attr('id','temp_reply');
	$("#temp_reply").attr("type", "button");
	$("#temp_reply").click(function(){submitreplyhack("reply_topic","reply", "reply")});
	
	//hack newpost - submit	
	if (document.URL.indexOf("post") != -1){
	var board = document.URL.substr(document.URL.indexOf("post")+5,2);
	$("#post_topic").attr('id','temp_post_topic');
	$("#temp_post_topic").attr("type", "button");
	$("#temp_post_topic").click(function(){submitreplyhack("post_new_topic","post_topic", "post/" + board)});
	}
    
    	
    $(document).on('keydown','#gae #ta',function(e){if(e.ctrlKey && e.keyCode == 13){$('#temp_reply').click();$('#temp_submit_fast_reply').click();$('#temp_post_topic').click();}});
	
}

//change the img tag to icon+ code right after reply page is loaded
function tahack(){
	var text = $("#gae #ta").val();
	for ( var id in iconSets)
	for ( var j in iconSets[id]){
	//alert(iconSets[id][j]);
	while (text.indexOf('[img]'+iconSets[id][j]+'[/img]') != -1)
	text = text.replace('[img]'+iconSets[id][j]+'[/img]', codeSets[id][j]);
	}
	$("#gae #ta").val(text);
}

win.icondialog = function(message){
    var ans = confirm(message);
	if (ans)
		window.location.href = "http://userscripts.org/scripts/source/172932.user.js";
}

function updatedialog(message){
    var ans = confirm(message);
	if (ans)
		window.location.href = "http://userscripts.org/scripts/source/172932.user.js";
}

win.faildialog = function(message){
    var ans = confirm(message);
	if (ans)
		window.location.href = "http://www.gmail.com";
}

function errordialog(message){
    var ans = confirm(message);
	if (ans)
		window.location.href = "http://www.gmail.com";
}

function actp(s){
		
	
	var a = document.createElement('a');
	a.innerHTML = "Icon+";
	if ( s == "fail"){
		var message = "HKGalden Icon+ Script Error!\\n\\nLogin (or logout) Gmail after pressing OK for fixing it.";
		a.setAttribute('onclick', 'faildialog("'+message+'")');
	}else{
		var message = "HKGalden Icon+ Script V" + thisversionname + "\\n\\nWritten by BB_Warrior (ID:3794) @ HKGalden\\n\\nYou could press OK to install the latest update.";
	    a.setAttribute('onclick', 'icondialog("'+message+'")');
	}
	$(a).insertBefore($(".actp a:nth-child(2)"));
	//var script = document.createElement('script');
	//script.innerHTML = "$(window).scroll(function(){if($(document).height() > $(window).height()+8 && $(this).scrollTop() > 0){$('#gb').addClass('zx');}else if($(this).scrollTop() == 0){$('#gb').removeClass('zx');}if($(this).scrollTop() > 400){$('#iconplus').fadeIn(250);}else{$('#iconplus').fadeOut(250);}});});";
	//document.body.appendChild(script);
	//document.body.removeChild(document.body.lastChild);
}

// reply/post content not yet loaded on run
function contentCheck() {
	if (document.querySelector("#gae")) {
	loaded = true;
	if (document.URL.indexOf("reply") != -1)
	tahack();
	if (!mobile)
	buttonhack();
	addIcons();
	actp("normal");
	} else {
	setTimeout(contentCheck, 300);
	}
}

//if loginned user cannot load the google api callback, prompt out the notice.
function LoadedCheck() {
        if (!loaded && document.querySelector('.actp').childNodes.length == 3) {
            errordialog("HKGalden Icon+ Script Error!\n\nLogin (or logout) Gmail after pressing OK for fixing it.");
            actp("fail");
        } 
}


win.mainfunction = function (json) {

	//to fetch the data from the google spreadsheet
	var obj = json.feed.entry[0];
	var update = true;
	for (var key in obj){
	if ( key.indexOf("script") != -1 ){
	var version = obj[key].$t;
	if ( version.indexOf(thisversion) != -1) update = false;
	if ( version.indexOf("error") != -1) update = null;
	}
	if( key.indexOf("gsx")==0 && key.indexOf("script") == -1){
	id[key.substr(4)] = key.substr(4);
	thumbnail[key.substr(4)]=obj[key].$t;
	}
	}
	if (update == true) updatedialog("Latest HKGalden Icon+ Script (V" + thisversionname + ") released! \n\nPress OK and install this script again for update.");
	if (update == null) alert("HKGalden Icon+ Script is not compatible with the latest HKGalden Forum! \n\nPlease temporarily disable this script. \n\nKeep an eye on the posts in HKGalden of Icon+ Script and wait for the next update.");
	var numOfRows = json.feed.entry.length;
	for ( var val in id){
	iconSets[val] = new Array();
	codeSets[val] = new Array();
	for ( var j = 1; j < numOfRows; j++){                           
	var entry = json.feed.entry[j];
	iconSets[val][j-1] = entry["gsx$" + val].$t;
	//alert(iconSets[val][j-1]);
	codeSets[val][j-1] = ocode[j-1].substr(0,1) + val + ocode[j-1].substr(1);
	}
	}
	 
	//check if the interface is loaded
	setTimeout(contentCheck, 300);
}

var jsonapi = document.createElement('script');
jsonapi.src = 'https://spreadsheets.google.com/feeds/list/0ApEyQph2NSyNdDA2WmNpR2tPQkdsR2JtRnYwcy1NRHc/od6/public/values?alt=json-in-script&callback=mainfunction';
var doc = document.querySelector('head');
doc.appendChild(jsonapi);

setTimeout(LoadedCheck, 10000);