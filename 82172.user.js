// ==UserScript==
// @name           Forumwarz BBCode Buttons
// @namespace      WHAT THE FUCK IS THIS FOR?
// @description    Adds BBCode Buttons for Flamebate
// @include        http://www.forumwarz.com/discussions/*
// @include        http://*.forumwarz.com/discussions/*
// @include        http://www.forumwarz.com/idc
// @include        http://*.forumwarz.com/idc
// ==/UserScript==

var funcador = [];

// Surrounds the selected text with text1 and text2.
function surroundText(text1, text2, textarea)
{
	// Can a text range be created?
	if (typeof(textarea.caretPos) != "undefined" && textarea.createTextRange)
	{
		var caretPos = textarea.caretPos, temp_length = caretPos.text.length;

		caretPos.text = caretPos.text.charAt(caretPos.text.length - 1) == ' ' ? text1 + caretPos.text + text2 + ' ' : text1 + caretPos.text + text2;

		if (temp_length == 0)
		{
			caretPos.moveStart("character", -text2.length);
			caretPos.moveEnd("character", -text2.length);
			caretPos.select();
		}
		else
			textarea.focus(caretPos);
	}
	// Mozilla text range wrap.
	else if (typeof(textarea.selectionStart) != "undefined")
	{
		var begin = textarea.value.substr(0, textarea.selectionStart);
		var selection = textarea.value.substr(textarea.selectionStart, textarea.selectionEnd - textarea.selectionStart);
		var end = textarea.value.substr(textarea.selectionEnd);
		var newCursorPos = textarea.selectionStart;
		var scrollPos = textarea.scrollTop;

		textarea.value = begin + text1 + selection + text2 + end;

		if (textarea.setSelectionRange)
		{
			if (selection.length == 0)
				textarea.setSelectionRange(newCursorPos + text1.length, newCursorPos + text1.length);
			else
				textarea.setSelectionRange(newCursorPos, newCursorPos + text1.length + selection.length + text2.length);
			textarea.focus();
		}
		textarea.scrollTop = scrollPos;
	}
	// Just put them on the end, then.
	else
	{
		textarea.value += text1 + text2;
		textarea.focus(textarea.value.length - 1);
	}
}

function add_button(name,text1,text2,img){
	var where, newElement;
	where = document.URL.replace(/.*\//,"") == "idc" ? document.getElementById('talk') : document.getElementById('post');
	//where = getElementsByClassName('note');
	if (where) {
		if(!img){
			newElement = document.createElement('input');
			newElement.setAttribute("value", name);
			newElement.setAttribute("id", "button_"+name);
			newElement.setAttribute("type", "button");
		}else{
			newElement = document.createElement('img');
			newElement.setAttribute("src", img);
			newElement.setAttribute("title", name);
			newElement.setAttribute("id", "button_"+name);
			newElement.setAttribute("class", "bbcode_button");
			where.innerHTML += '<style>.bbcode_button{margin:1px 2px 1px 1px;cursor: pointer;background-image:url(data:image/gif;base64,R0lGODlhFwAWALMMAMnJydLS0l5eXtjY2Ozs7LOzs+bm5unp6ampqdzc3PPz89/f3wAAAAAAAAAAAAAAACH5BAEAAAwALAAAAAAXABYAAASRkIWCqr24lsAWAsthjGRZLgCCqmLrvq0HFMBB3Hiu4zNt2sCgcPYZJBbIpHJ5TCECxqN0Sj0OAhVolbm8ZqPcsPe5DSuxTyPYnBxr1+zEOAqPD7Jle8VoiDPvCHwwgzGAAwYECoqLjI0EBnc+jZOTBz0IB5SaigcINFmbk2ggFAKmp6ippp4LHT0FsLGysyAMEQA7);height:22px;width:23px;}.bbcode_button:hover{background-image:url(data:image/gif;base64,R0lGODlhFwAWAMQbAEm/OtD7w9781Nr9zZfmieH92sX3t+n948v9vajwlO796tT8ybn7rFzIV3bObcn+weD20dX7xtryyrL4ptD3wdv0zazlotj+0tnuyOX93+X/1wAAAAAAAAAAAAAAAAAAACH5BAEAABsALAAAAAAXABYAAAXL4PYQTlk2aNoALNA41jY5BIPceG4YTE82FgLhoYEYB4LkscKURBAJ0wQpWSqvS4PjZYtQL98w1UAAOCaGgPrB1rkZ5UaXksOl64FJvPvs4x9qAQ8MCS58C4GJiBGLFHCGdIqLjJQDjI9ydGBinAuYh1ZYSZafXgWiqElkkKetrq+tq5mwtK6rAFOwB7u8vRq3UwrCw8TDGcPAAsW7xMfEEXEJC73F1Qq/DmYwnANOGBAYmlAoFi8ECRPpCevs7T8NBBsW2S319vU0GyEAOw==);}</style>'
		}
		funcador[name] = function(){surroundText(text1,text2, document.URL.replace(/.*\//,"") == "idc" ? document.getElementById('boring_stuff') :  document.URL.replace(/.*\//,"") == "idc" ? document.getElementById('talk') : document.getElementById('discussion_post_body'));}
		newElement.addEventListener('click', funcador[name], false);
		where.parentNode.insertBefore(newElement, where.previousSibling);
	}
}

function add_dropdown(name, dd_array, txt1, txt2){
    var choice, newElement, where = document.URL.replace(/.*\//,"") == "idc" ? document.getElementById('talk') : document.getElementById('post');
    if (where) {
        newElement = document.createElement('select');
        newElement.setAttribute("title", name);
	newElement.setAttribute("id", "dropdown_"+name);
        choice = document.createElement('option');
        choice.innerHTML = name;
        choice.value = "n/a";
        newElement.appendChild(choice);
        for (var i = 0; i < dd_array.length; i++) {
            choice = document.createElement('option');
            choice.innerHTML = dd_array[i];
            choice.value = dd_array[i];
            newElement.appendChild(choice);
        }
        newElement.addEventListener('change', function() {
            surroundText(txt1.replace("xx", this.value),txt2, document.URL.replace(/.*\//,"") == "idc" ? document.getElementById('boring_stuff') :  document.URL.replace(/.*\//,"") == "idc" ? document.getElementById('talk') : document.getElementById('discussion_post_body'));
            this.value = "n/a";
        }, false);
        where.parentNode.insertBefore(newElement, where.previousSibling);
    }
}

//add the buttons
//I'VE MADE IT SIMPLE SO THAT YOU CAN ADD MORE IF YOU WANT TO
/*
add_button(name, text1, text2[, img]);
name = unique name/label for the button (dunno if it actually breaks if not unique but better not risk it
text1 = start of the tag e.g. '[b]'
text2 = end of the tag e.g. '[/b]'
img (optional) = image url or base64 data for the image if you prefer image based buttons than buttons
*/
add_button('Bold','[b]','[/b]','data:image/gif;base64,R0lGODlhFwAWAIAAAAAAAP///yH5BAUUAAEALAAAAAAXABYAAAImjI+py+0Po5y0gYsvxYZL70Wg9mVkCXQnNKao6rLmWtX2jef6HhQAOw==');
add_button('Italics','[i]','[/i]','data:image/gif;base64,R0lGODlhFwAWAIAAAAAAAP///yH5BAEAAAEALAAAAAAXABYAAAIgjI+py+0Po5w0gotryJpXT4GTKJHW1WGoxrbuC8dyUAAAOw==');
add_button('Underline','[u]','[/u]','data:image/gif;base64,R0lGODlhFwAWAIAAAAAAAP///yH5BAEAAAEALAAAAAAXABYAAAIojI+py+0Po5yUgQsCzvIeP4Ea15FiJJ5QSqJmu77VBlczjdn6zvd+AQA7');
add_button('Strikethrough','[s]','[/s]','data:image/gif;base64,R0lGODlhFwAWAIAAAAAAAP///yH5BAEAAAEALAAAAAAXABYAAAImjI+py+0Po5z0gRtAxVlTnm0gdJXmOVopeayq4TpaWdX2jef6vhQAOw==');
add_button('Rainbow','[rainbow]','[/rainbow]','data:image/gif;base64,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');
add_button('Spoiler','[spoiler]','[/spoiler]','data:image/gif;base64,R0lGODlhFwAWAOYAAAQGCuWmA4qKUFpWQ9Wvk/vwGkM/LZmZmd+uWf/Vd4eFaTMzM+S+R//4aGhoVOzsWMOgRLKqhPXECPXDgCEhIf3ovr+wl7a2LEJJUv/yQf/orGtrcFtbYv/UUPbUKb2aWq6trWZmZuXlZkhISKqaVxgZHeGiZ4yMjfzHUrGxZv/yp1lZWzw8O//5I763p///UPnbRui6Ao+PaMKyiv/cCrKnXM3NWpmZM/i9WUJCQsS+OHx8fJNvRxAQECkpKfK6c//yZP/uUd2xEvrbpGdQOf//QFNSUv/JS//rK/XMFFNPPVtbaMzMZqalaLixSh4YDGdjUce6unl6bIR4Ucq4VzI3Q//2UbSzs5KHWKSkpP//M4aGhv/eVunNCs2wnPfXOP//Xuy1A8KrSlNTYf/YSy4pGEI6OpeAQ8+xKhkQB3NiQykjFf/srkpOWzo8QP/lJXNzcvTZC//ihPbpaGFhb///Zv/fDl9aSPO8SLW0XpmZmf/wW2ZmZvrlVMCoeMzMzCH5BAUUAH8ALAAAAAAXABYAAAf/gH+Cg4SFhoeEUV4EBF5RiIcWJhNDFRVDPyYWkINGPHIqbKJsKglEIZwsC0YIOK6vHxg+RogjFAtVakcovCh4Sm4LJRuGJz23LFUQZMxkZ1WqFD0ghQvHCwtuA2QdHQw5qgvStINXACUUPgs5OSRcXFMYOQs+0iWEJwA9JT5uI20ruFBpY2SEGx8legCgJmhHmidlDCi5AwUKCSwV7ygxsOZJmgOD/ASQkMTDFxgw+pCg0gflFw9JJATYJGiGBDtIMgTZA2ROCAUNgOwJkuENjTAuBrmIgTODFTBgmtChw6QOGCsZkNAQUggNziIvwIjYQFZKAzAvimgVUyhCnBZgV8HI2AAHDp0UaIu06MKQkBO4L2wsoQtnQ4gHL7QUqHHoig4tRRxwIEt2jAC9TiBdsXHDzYoVIUJwMOLmQh5ODY3kGMF6RA4jJ1APinJgy44dW7LI3m0oEAA7');
add_button('Youtube','[youtube]','[/youtube]', "data:image/gif;base64,R0lGODlhFwAWAOZoAAAAABERESIiIjMzM1VVVXd3d/8AAP8CAv8FBf8KCv8LC/8PD/8QEP8SEv8SE/8WFv8ZGf8dHf8eHv8fHv8gHv8iIv8mJv8nJ/8oKP8rK/8sLP8uLv8vL/8xMf8zM/80NP81Nf82Nv83N/84OP88PP89Pf9BQf9ERP9KSv9NTf9RUf9WVv9XV/9ZWf9aWv9bW/9dXf9hYf9jY/9kZP9lZf9paf9ubv9wcP9ycv92dv95ef98fIiIiLu7u/+Cgv+Dg/+Fhf+Ihv+env+goP+hof+iov+lpf+mpv+pqf+qqv+srP+urv+vr/+wsP+ysv+zs/+3t/+5uczMzN3d3f/Cwv/Gxv/Jyf/Ly//R0f/U1P/Y2P/a2v/d3f/e3v/f3+7u7v/g4P/i4v/m5v/v7//y8v/29v/7+////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAABoACwAAAAAFwAWAAAH7oBogoOEhYaHiImKi4ZnZwCPjpKTjodnUwA8AFOUlJZnBQAEXwIAAo9SAZKfXwBSZwJfAT2uqpWNjq6wsrQ8tmefqKSmZwMAkLeFncurjUwWDhQeISMTGyxBVFhJwI0QWo4XDAZkHAYWEkg53coeCGcoKCkgXU4iDUcZJeyEZx8HZS6IERKFyJgoQ8J4OcBv0BkPCsx4qAKkiJIXSqBs4bKgoaCHCfxdwWGkiYwnVljoqOARzRkSIT1kOWMkypklO86AedDyDAwNJjCMOLGhg4oNC2hEcNHzzI8aNmK0cOFixYwbMnwkY8S1q9evgQAAOw==");
add_button('Image','[img]','[/img]','data:image/gif;base64,R0lGODlhFwAWANUAACNrDPzanllqMOfn1vz37G5iXbLL7KvO1i0xIbW1nJlvmZm857C4y/z822uQb9Lz88bG0LWMW7jy/+C2hN2uc57S/+/v4rWcnM61Y5+ce+TOhoy9Y6WljL21c63nxoyl3s61tZycnFo5c6Wltf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACQALAAAAAAXABYAAAaPQJJwSCwaj8ikcslsFifQaJRCpSYnhKx222hQroTPYnEwGMYLiPdqWVQqkrjnrY6AGRXO4fEQHBh1bAUODgUeGwAIABADdkgUBA6KAAICIggFjI5HFBYKAgoZHQGkAZpJkCCkGqwTGBgMjagWIwm2FxcZGSGnjwQWwAPCw8KbRhQRycrLyk7Oz9DR0tPUQ0EAOw==');
add_button('Quote','[quote]','[/quote]','data:image/gif;base64,R0lGODlhFwAWAMQAAPT0yE1NTe3tkfHxq6ampgAAAE9PTQYAAVteWVNTUU5OTgQGCE5OTaWmpmxnYU5NTU1OTk9NTf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAXABYAAAVeoCSOZGmeaKqubGsGcCwHawDceA7QqT38QOCO0AMICsikYDAsCp7QJzNARNmSymXTaoxCp9WT7YldaKlOr3QrBgTf7JcOx4y/ZoibIxFOEf6AEXYuEjCEYoeJiosnIQA7');
add_button('Code','[code]','[/code]','data:image/gif;base64,R0lGODlhFwAWAIAAAP///wAAACH5BAUUAAAALAAAAAAXABYAAAIohI+py+0Po5wpBGCpyVnzO1liJ42id5FhCq4mZarQp2Fsjef6zvdAAQA7');
add_button('List','[ul][li]','[/li][li][/li][/ul]','data:image/gif;base64,R0lGODlhFwAWAJEAAAAAAAAAhP///wAAACH5BAEAAAIALAAAAAAXABYAAAImlI+py+0PYwpUKhoM2Hw7bIXiCI5C2XVfZbbuxJJsyq3Zi+f67hQAOw==');
//add_button('Color','[color=xx]','[/color]','data:image/gif;base64,R0lGODlhFwAWALMAAM6cnISEhP9jY1paWs4xMZwxMZwAAIQAAGMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAXABYAAARFMMlJq7046827/xaAgBRAHAMpCcSpmgiBpCBrtAcIJyzqATYJzsNqGU80jemEaMZcm15gOmUVOM5ApdmhVqaqsHhMHkcAADs=');
//add_button('Size','[size=xx]','[/size]','data:image/gif;base64,R0lGODlhFwAWAIAAAAAAAP///yH5BAEAAAEALAAAAAAXABYAAAI1jI+py+0PF4gMWJqsfjvHjkzcdIXQVR6ig66GW5EwrGi2ya5pQGe62/vcMKodkXdMKpfMQwEAOw==');
add_button('Center','[center]','[/center]','data:image/gif;base64,R0lGODlhFwAWAIAAAAAAAP///yH5BAUUAAEALAAAAAAXABYAAAIfjI+py+0Po5wIWEtzupzr32FfFnajZp5U6anuC8duAQA7');
//add_button('notallcapsincd','[color=white]notallcapsincd[/color]','');

add_dropdown('Color', "brown marroon red orange yellow olive lime green teal aqua blue navy purple fuchsia gray silver white black".split(" "), '[color=xx]', '[/color]');
add_dropdown('Size', [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30], '[size=xx]', '[/size]');