// ==UserScript==
// @name          Stack Exchange Editing Tools
// @author        Ben Pilbrow
// @description	  Adds in some editing tools
// @include       http://*.stackexchange.com/posts/*/edit*
// @include       http://*.stackexchange.com/questions/*
// @include       http://askubuntu.com/posts/*/edit*
// @include       http://askubuntu.com/questions/*
// @include       http://serverfault.com/posts/*/edit*
// @include       http://serverfault.com/questions/*
// @include       http://stackoverflow.com/posts/*/edit*
// @include       http://stackoverflow.com/questions/*
// @include       http://superuser.com/posts/*/edit*
// @include       http://superuser.com/questions/*
// @include       http://meta.*.stackexchange.com/posts/*/edit*
// @include       http://meta.*.stackexchange.com/questions/*
// @include       http://meta.serverfault.com/posts/*/edit*
// @include       http://meta.serverfault.com/questions/*
// @include       http://meta.stackoverflow.com/posts/*/edit*
// @include       http://meta.stackoverflow.com/questions/*
// @include       http://meta.superuser.com/posts/*/edit*
// @include       http://meta.superuser.com/questions/*
// @include       http://stackapps.com/posts/*/edit*
// @include       http://stackapps.com/questions/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

/*
Inspired by the SE Editor Toolkit userscript (http://stackapps.com/questions/2209/se-editor-toolkit)
*/

var ProperCaseWords = ["ActiveSync", "Active Directory", "Adobe", "CentOS", "Cisco", "Compaq", "Dell", "DNS", "FTP", "Fujitsu", "Google", "GPO", "HP", "HTML", "IBM", "IIS", "Internet Explorer", "iPad", "iPhone", "KVM", "LAN", "Linux", "Microsoft", "MySQL", "NAS", "NetApp", "Netgear", "OpenSSH", "OWA", "pfSense", "PHP", "PostgreSQL", "PowerShell", "RAID", "Samsung", "SAN", "SAS", "SATA", "Seagate", "SharePoint", "SQL", "SSH", "Symantec", "Ubuntu", "VBScript", "VPN", "VPS", "Western Digital", "Windows Server", "Windows Vista", "Windows XP"];
var ReplaceWords = [
	["alot", "a lot"],
	["cant", "can't"],
	["couldnt", "couldn't"],
	["i", "I"],
	["IE(6|7|8|9)", "Internet Explorer $1"],
	["IIS(6|7|7.5)", "IIS $1"],
	["im", "I'm"],
	["isnt", "isn't"],
	["pl[sz]", "please"],
	["RAID(0|1|5|6|10|50)", "RAID $1"],
	["shouldnt", "shouldn't"],
	["teh", "the"],
	["u", "you"],
	["winxp", "Windows XP"],
	["wont", "won't"],
	["youre", "you're"]
];

var EditLocationRegex = new RegExp("http://(.*?)/posts/(\\d+)/edit");
var ViewLocationRegex = new RegExp("http://(.*?)/questions/(\\d+)/(.*)");

if(EditLocationRegex.test(window.location.href))
{
	$(function() {
		//Move the text box down an ickle bit
		$('#wmd-button-bar').css('padding-bottom', 30);
		
		//Add new buttons
		$('#wmd-button-bar').append('<div style="float: left;"><input type="button" value="AutoCorrect" id="edit-autocorrect" /></div>');
		
		//AutoCorrect Button
		$('#edit-autocorrect').click(function() {
			var ProperCaseWords = ["ActiveSync", "Active Directory", "Adobe", "CentOS", "Cisco", "Compaq", "Dell", "DNS", "FTP", "Fujitsu", "Google", "GPO", "HP", "HTML", "HTTP", "IBM", "IIS", "Internet Explorer", "iPad", "iPhone", "KVM", "LAN", "Linux", "Microsoft", "MySQL", "NAS", "NetApp", "Netgear", "OpenSSH", "OWA", "pfSense", "PHP", "PostgreSQL", "RAID", "Samsung", "SAN", "SAS", "SATA", "Seagate", "SharePoint", "SQL", "SSH", "SSL", "Symantec", "Ubuntu", "VBScript", "VPN", "VPS", "Western Digital", "Windows Server", "Windows Vista", "Windows XP"];
			var ReplaceWords = [
				["alot", "a lot"],
				["cant", "can't"],
				["couldnt", "couldn't"],
				["i", "I"],
				["IE(6|7|8|9)", "Internet Explorer $1"],
				["IIS(6|7|7.5)", "IIS $1"],
				["im", "I'm"],
				["isnt", "isn't"],
				["pl[sz]", "please"],
				["RAID(0|1|5|6|10|50)", "RAID $1"],
				["shouldnt", "shouldn't"],
				["teh", "the"],
				["u", "you"],
				["winxp", "Windows XP"],
				["wont", "won't"],
				["youre", "you're"]
			];
			
			var EditorValue = $('#wmd-input').val();
			var TitleValue = ($('#title').length) ? $('#title').val() : '';
			
			//Uppercase the first letter of the title (blatantly ripped off from http://stackoverflow.com/questions/1026069/capitalize-first-letter-of-string-in-javascript/1026087#1026087)
			TitleValue = TitleValue.charAt(0).toUpperCase() + TitleValue.slice(1);
			
			//Some people get excited!!!!!!!
			EditorValue = EditorValue.replace(/!+/g, '!');
			TitleValue = TitleValue.replace(/!+/g, '!');
			
			//Do some people have sticky keyboards or something????????????
			EditorValue = EditorValue.replace(/\?+/g, '?');
			TitleValue = TitleValue.replace(/\?+/g, '?');
			
			//Proper case some words
			for(var i = 0; i < ProperCaseWords.length; i++)
			{
				var ReplaceRegex = new RegExp("\\b" + ProperCaseWords[i] + "\\b", 'gi');
				
				EditorValue = EditorValue.replace(ReplaceRegex, ProperCaseWords[i]);
				TitleValue = TitleValue.replace(ReplaceRegex, ProperCaseWords[i]);
			}
			
			//Replace some words
			for(var i = 0; i < ReplaceWords.length; i++)
			{
				var ReplaceRegex = new RegExp("\\b" + ReplaceWords[i][0] + "\\b", 'gi');
				
				EditorValue = EditorValue.replace(ReplaceRegex, ReplaceWords[i][1]);
				TitleValue = TitleValue.replace(ReplaceRegex, ReplaceWords[i][1]);
			}
			
			//Split the post line by line
			var PostLines = EditorValue.split("\n");
			
			//This barfs if there's less than 5 lines in a post - do it manually. It probably needs nuking anyway if it's that short...
			if(PostLines.length > 5)
			{
				//For the first 5 lines, strip off greetings. First 5 lines because some people like to put random empty lines before/after their hello
				for(var i = 0; i < 5; i++)
				{
					PostLines[i] = PostLines[i].replace(/(hello|hey|hi|greetings) ? ?(experts|friends|server fault|serverfault)? ?(\?|!)?,?/gi, '');
				}
				
				//For the last 5 lines, strip off thanks messages. Last 5 lines because of the random spacing as above
				for(var i = PostLines.length; i > PostLines.length - 5; i--)
				{
					var ThisLine = i - 1;
					
					PostLines[ThisLine] = PostLines[ThisLine].replace(/(cheers|thanks|thank you) ?(!|,|.)?/gi, '');
				}
			}
			
			//Stitch EditorValue back together from the trimmed junk
			EditorValue = PostLines.join("\n");
			
			//Finally set the editor input and question title to their AutoCorrected values. Also run trim() on both for good measures
			if($('#title').length)
			{
				$('#title').val(TitleValue.trim());
			}
			
			$('#wmd-input').val(EditorValue.trim());
		});
	});
}

if(ViewLocationRegex.test(window.location.href))
{
	$(function() {
		$('.post-text').each(function() {
			var EditorValue = $(this).html();
			
			//Highlight words that can be proper-cased
			for(var i = 0; i < ProperCaseWords.length; i++)
			{
				var ReplaceRegex = new RegExp("\\b" + ProperCaseWords[i] + "\\b", 'gi');
				
				var RegexResult = EditorValue.match(ReplaceRegex);
				
				if(RegexResult)
				{
					if(RegexResult[0] != ProperCaseWords[i])
					{
						EditorValue = EditorValue.replace(ReplaceRegex, '<span class="diff-delete">'+ RegexResult[0] +'</span><span class="diff-add">' + ProperCaseWords[i] + '</span>');
					}
				}
			}
			
			//Highlight words that can be replaced
			for(var i = 0; i < ReplaceWords.length; i++)
			{
				var ReplaceRegex = new RegExp("\\b" + ReplaceWords[i][0] + "\\b", 'gi');
				
				var RegexResult = EditorValue.match(ReplaceRegex);
				
				if(RegexResult)
				{
					EditorValue = EditorValue.replace(ReplaceRegex, '<span class="diff-delete">'+ RegexResult[0] +'</span><span class="diff-add">' + ReplaceWords[i][1] + '</span>');
				}
			}
			
			$(this).html(EditorValue);
		});
	});
}