// ==UserScript==
// @name           zpovednice odpovez uzivateli
// @namespace      deamonicky script
// @description    prida tlačítko pro rychlou odpověď a vloží jméno uživatele do textu odpovědi
// @include        http://zpovednice.cz/detail.php?statusik=*
// @include        http://spovednica.sk/detail.php?statusik=*
// @include        http://www.zpovednice.cz/detail.php?statusik=*
// @include        http://www.spovednica.sk/detail.php?statusik=*
// @include        http://zpovednice.cz/profil.php*
// @include        http://spovednica.sk/profil.php*
// @include        http://www.zpovednice.cz/profil.php*
// @include        http://www.spovednica.sk/profil.php*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


var button_text = "odpovez"; // NOT WORKING
var name_prefix = "";
var name_suffix = ":\n\n";

// DEBUG: $(".signnick,.signunreg").css("border","13px solid red");
$(".signnick,.signunreg").append('<button id="doanswer">'+button_text+'</button>').click(
	function () {

		// get text
			var textaround = $(this).parent().text();
			// DEBUG: alert('"'+textaround+'"');
			var textwithoutprefix = textaround.replace(/^(&nbsp;|\s)+/gim,'');
			// DEBUG: alert('no prefix:"'+textwithoutprefix+'"');
			// TODO: put button_text there		
			// GO FROM BACK (not working?)
			// var textwithoutsufix = textwithoutprefix.replace(/(&nbsp;|\n|\r|\s)+$/gim,'');
			// alert('"'+textwithoutsufix+'"');
			// GO FROM FRONT
			var textwithoutsufix = textwithoutprefix.split("odpovez")[0];//replace(/odpovez(\S\s)*$/gi,'');//.replace(/(&nbsp;|\n|\r|\s)+$/gim,'');
			// DEBUG: alert('no suffix:"'+textwithoutsufix+'"');		
			var textwithoutendlines = jQuery.trim(textwithoutsufix);//
			//var textwithoutendlines = textwithoutsufix.replace(/(&nbsp;|\s|\n|\r)+$/,'');
			// DEBUG: alert('no endlines:"'+textwithoutendlines+'"');
			// less elegant way:
			var textname = textwithoutendlines;

		// insert header
			//$("textarea").html
			//$("textarea").html().append('')+;"ffffff");
			/* functional solution
			var X = $("textarea").html; // function pointer
			X(X()+textname);
			// TODO: why it is not working?
			*/
			//var X = $("textarea").val;
			//X(X()+name_prefix+textname+name_suffix);
			//alert($("textarea").height());//attr("rows"));
			//alert($("textarea").val().length);
			var space_between; // each reply should have some space after last text
			if ($("textarea").val().length > 1) {
				space_between = "\n\n"; // n-th reply
			} else {
				space_between = ""; // first reply
			}
			$("textarea").val($("textarea").val()+space_between+name_prefix+textname+name_suffix);

		// move cursor
			// NOT WORKING
			//$("textarea").setSelectionRange(3, 3);
			// scroll to end
			// impossible to do for me,
			// but this one worked :-D
			// scrolling is implied by cursor
			// http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area/3576885#3576885
			var textarea_length = $("textarea").val().length;
			var cursor_index = textarea_length; // it is really not -1 :)
			$("textarea")[0].selectionStart = cursor_index; 
			$("textarea")[0].selectionEnd = cursor_index;

		// scroll to textarea
			$("textarea").focus();
			// NOT WORKING:
			// $("textarea").scrollTo('100%', 800 );
			//alert($("textarea").prop('clientHeight'));
			//$("textarea").scrollTop = $("textarea").scrollHeight;
			//$("textarea")[0].scrollTop($("textarea")[0].scrollHeight);//moveEnd($("textarea")[0].scrollHeight);//(999999);
	}
);

// copypasta
$(".guestnick,.guestnote").append('<button id="doanswer">'+button_text+'</button>').click(
	function () {

		// get text
			var textaround = $(this).text();
			// DEBUG: alert('"'+textaround+'"');
			var textwithoutprefix = textaround;//.replace(/^(&nbsp;|\s)+/gim,'');
			// DEBUG: alert('no prefix:"'+textwithoutprefix+'"');
			// TODO: put button_text there		
			// GO FROM BACK (not working?)
			// var textwithoutsufix = textwithoutprefix.replace(/(&nbsp;|\n|\r|\s)+$/gim,'');
			// alert('"'+textwithoutsufix+'"');
			// GO FROM FRONT
			var textwithoutsufix = textwithoutprefix.split(button_text)[0].split(":")[0];//replace(/odpovez(\S\s)*$/gi,'');//.replace(/(&nbsp;|\n|\r|\s)+$/gim,'');
			// DEBUG: alert('no suffix:"'+textwithoutsufix+'"');		
			var textwithoutendlines = jQuery.trim(textwithoutsufix);//
			//var textwithoutendlines = textwithoutsufix.replace(/(&nbsp;|\s|\n|\r)+$/,'');
			// DEBUG: alert('no endlines:"'+textwithoutendlines+'"');
			// less elegant way:
			var textname = textwithoutendlines;

		// insert header
			//$("textarea").html
			//$("textarea").html().append('')+;"ffffff");
			/* functional solution
			var X = $("textarea").html; // function pointer
			X(X()+textname);
			// TODO: why it is not working?
			*/
			//var X = $("textarea").val;
			//X(X()+name_prefix+textname+name_suffix);
			//alert($("textarea").height());//attr("rows"));
			//alert($("textarea").val().length);
			var space_between; // each reply should have some space after last text
			if ($("textarea").val().length > 1) {
				space_between = "\n\n"; // n-th reply
			} else {
				space_between = ""; // first reply
			}
			$("textarea").val($("textarea").val()+space_between+name_prefix+textname+name_suffix);

		// move cursor
			// NOT WORKING
			//$("textarea").setSelectionRange(3, 3);
			// scroll to end
			// impossible to do for me,
			// but this one worked :-D
			// scrolling is implied by cursor
			// http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area/3576885#3576885
			var textarea_length = $("textarea").val().length;
			var cursor_index = textarea_length; // it is really not -1 :)
			$("textarea")[0].selectionStart = cursor_index; 
			$("textarea")[0].selectionEnd = cursor_index;

		// scroll to textarea
			$("textarea").focus();
			// NOT WORKING:
			// $("textarea").scrollTo('100%', 800 );
			//alert($("textarea").prop('clientHeight'));
			//$("textarea").scrollTop = $("textarea").scrollHeight;
			//$("textarea")[0].scrollTop($("textarea")[0].scrollHeight);//moveEnd($("textarea")[0].scrollHeight);//(999999);
	}
);

