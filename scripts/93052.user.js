// ==UserScript==
// @name    Lepro smileys
// @include http://leprosorium.ru/*
// @include http://*.leprosorium.ru/*
// ==/UserScript==
var textarea = false;
var toolbar = false;

function getCursor(input){
	var result = {start: 0, end: 0};
	if (input.setSelectionRange){
		result.start= input.selectionStart;
		result.end = input.selectionEnd;
	} else if (!document.selection) {
		return false;
	} else if (document.selection && document.selection.createRange) {
		var range = document.selection.createRange();
		var stored_range = range.duplicate();
		stored_range.moveToElementText(input);
		stored_range.setEndPoint('EndToEnd', range);
		result.start = stored_range.text.length - range.text.length;
		result.end = result.start + range.text.length;
	}
	return result;
}
 
function setCursor(txtarea, start, end){
	if(txtarea.createTextRange) {
		var range = txtarea.createTextRange();
		range.move("character", start);
		range.select();
	} else if(txtarea.selectionStart) {
		txtarea.setSelectionRange(start, end);
	}
}

function insert_tag(startTag, endTag){
	var txtarea = document.getElementById("comment_textarea") || document.getElementById("comments-textarea");
	txtarea.focus();
 
	var scrtop = txtarea.scrollTop;
 
	var cursorPos = getCursor(txtarea);
	var txt_pre = txtarea.value.substring(0, cursorPos.start);
	var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
	var txt_aft = txtarea.value.substring(cursorPos.end);
 
	if (cursorPos.start == cursorPos.end){
		var nuCursorPos = cursorPos.start + startTag.length;
	}else{
		var nuCursorPos=String(txt_pre + startTag + txt_sel + endTag).length;
	}
	txtarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;
	setCursor(txtarea,nuCursorPos,nuCursorPos);
 
	if (scrtop) txtarea.scrollTop=scrtop;
}


if (window.location.href.indexOf("comments") != - 1 || window.location.href.indexOf("inbox") != - 1) {
    textarea = document.getElementById('comment_textarea');
    if (textarea) toolbar = textarea.parentNode.previousSibling.previousSibling;
}

if (window.location.href.indexOf("write") != - 1) {
    textarea = document.getElementById('comment_textarea');
    toolbar = document.querySelector('.textarea_editor');
}

if (window.location.href.indexOf("asylum") != - 1) {
    textarea = document.getElementById('comment_textarea');
    toolbar = textarea.parentNode.parentNode.parentNode.rows[0].cells[0];
}

var smileys = [
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0100-smile.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0101-sadsmile.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0102-bigsmile.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0103-cool.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0105-wink.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0106-crying.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0107-sweating.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0108-speechless.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0109-kiss.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0110-tongueout.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0111-blush.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0112-wondering.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0113-sleepy.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0114-dull.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0115-inlove.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0116-evilgrin.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0117-talking.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0118-yawn.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0119-puke.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0120-doh.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0121-angry.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0122-itwasntme.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0123-party.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0124-worried.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0125-mmm.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0126-nerd.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0127-lipssealed.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0128-hi.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0129-call.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0130-devil.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0131-angel.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0132-envy.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0133-wait.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0134-bear.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0135-makeup.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0136-giggle.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0137-clapping.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0138-thinking.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0139-bow.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0140-rofl.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0141-whew.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0142-happy.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0143-smirk.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0144-nod.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0145-shake.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0146-punch.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0147-emo.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0148-yes.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0149-no.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0150-handshake.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0151-skype.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0152-heart.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0153-brokenheart.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0154-mail.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0155-flower.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0156-rain.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0157-sun.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0158-time.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0159-music.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0160-movie.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0161-phone.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0162-coffee.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0163-pizza.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0164-cash.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0165-muscle.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0166-cake.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0167-beer.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0168-drink.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0169-dance.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0170-ninja.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0171-star.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0172-mooning.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0173-middlefinger.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0174-bandit.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0175-drunk.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0176-smoke.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0177-toivo.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0178-rock.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0179-headbang.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0180-bug.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0181-fubar.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0182-poolparty.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0183-swear.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0184-tmi.gif",
"http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0185-heidy.gif"
]
if (textarea) {
    var d = document.createElement('a');

    d.innerHTML = "<img src='http://www.andernetas.lt/pocius/Skype%20Emoticons%20&%20Flags%20Cheatsheet_failai/emoticon-0100-smile.gif'>";
    d.href = "#";
    d.addEventListener("click", function(e){
        var div = document.createElement("div");

        div.style.position = "absolute";
        div.style.zIndex = "9999";
        div.style.left = e.pageX + 'px';
        div.style.top = e.pageY + 'px';
        div.style.border = "1px solid #aaa";
        div.style.backgroundColor = "white";
        for(var i = 0, n = smileys.length; i < n; i += 1){
            var img = document.createElement("img");

            img.src = smileys[i];
            img.style.margin = "5px";
            img.addEventListener("click", function(evt){
                insert_tag('<img src="' + evt.target.src + '" alt="image">', '');
                document.body.removeChild(div);
            });
            div.appendChild(img);
            if((i + 1) % 10 == 0){
                var br = document.createElement("br");

                div.appendChild(br);
            }
        }
        document.body.appendChild(div);
        e.stopPropagation();
        e.preventDefault();
        return false;
    });
    toolbar.appendChild(d);  
} 

