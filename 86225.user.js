// ==UserScript==
// @name           NGBBS Inline poster
// @namespace      http://userscripts.org/users/vitaminp
// @include        http://www.newgrounds.com/bbs/topic/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#popin .box .headingFake { position: relative; display: block; height: 25px; margin: 0pt 0pt 5px; padding: 0pt; background: none repeat scroll 0% 0% transparent; color: rgb(102, 109, 122); }');
addGlobalStyle(".box .headingFake { position: relative; display: block; height: 24px; margin: -42px -5px 8px; padding: 5px; background: url(\"http://img.ngfiles.com/slants.gif\") repeat scroll 0% 0% transparent; color: rgb(102, 109, 122); }")
addGlobalStyle(".headingFake .btn, .headingFake .button { float: right; margin: 3px 0pt 0pt 5px; }")
var posts = document.getElementsByClassName('heading');
var link = new Array()
var quote = new Array()
function GetUploadController()
{
return(BBSPost.ImageUploader);
} 

var html_helper = new HTMLHelper();
var BBSPost = new BBSPoster();
for (i = 0; i < posts.length; i++){	
if (!posts[i].id.match(/bbspost/)) continue;
link.push(posts[i].getElementsByClassName('btn')[0].firstChild.href)
posts[i].getElementsByClassName('btn')[0].setAttribute("id",i)
posts[i].getElementsByClassName('btn')[0].addEventListener('click',function(e){
	post(link[this.id*1-1],this.id,false,posts[this.id*1].id)	
},false)
posts[i].getElementsByClassName('btn')[0].firstChild.removeAttribute("href");
quote.push(posts[i].getElementsByClassName('btn')[1].firstChild.href)
posts[i].getElementsByClassName('btn')[1].setAttribute("id",i)
posts[i].getElementsByClassName('btn')[1].addEventListener('click',function(e){
	post(quote[this.id*1-1],this.id,true,posts[this.id*1].id)	
},false)	
posts[i].getElementsByClassName('btn')[1].firstChild.removeAttribute("href");
	var insertBefore1 = posts[i].getElementsByClassName('btn')[0];
	var e1 = document.createElement('span');	
	e1.className = "btn LinkPost";
	e1.setAttribute("id",i)
	e1.innerHTML = "<a>Link Post</a>"
	e1.style.display = 'none';
	e1.addEventListener('click',function(e){
	linkPost(posts[this.id*1].id)	
	},false)		
	posts[i].insertBefore(e1, insertBefore1);
	var insertBefore2 = posts[i].getElementsByClassName('btn')[1];
	var e2 = document.createElement('span');	
	e2.className = "btn QuotePost";
	e2.setAttribute("id",i)
	e2.style.display = 'none';
	e2.innerHTML = "<a>Quote Post</a>"
	e2.addEventListener('click',function(e){
	quotePost(posts[this.id*1].id,this.id)	
	},false)		
	posts[i].insertBefore(e2, insertBefore2);
}
function quotePost(thePost,theId){
var Quote = document.getElementById(thePost).parentNode.parentNode.getElementsByClassName("nosig")[0].cloneNode(true);
var Stamp = new Array()
for (var t = Quote.getElementsByClassName("quotestamp").length-1; t>=0; t--){
Stamp.push(Quote.getElementsByClassName("quotestamp")[t].textContent)
}
var Details = "At "+ document.getElementById(thePost).getElementsByTagName("p")[document.getElementById(thePost).getElementsByTagName("p").length*1-1].textContent.replace("Posted at: ","")+", "+document.getElementById(thePost).getElementsByTagName("h3")[0].textContent+" wrote:\n"
for (var i = Quote.getElementsByTagName("blockquote").length-1, l = 0; i >= l; i--) {
if(Quote.getElementsByTagName("blockquote")[i].parentNode.className == "nosig"){
Quote.getElementsByTagName("blockquote")[i].textContent = ": "+Quote.getElementsByTagName("blockquote")[i].textContent.replace(/\n|\r/g,"\n: ")
if(Quote.getElementsByTagName("blockquote")[i].nextSibling.textContent != "\n\n"){
Quote.getElementsByTagName("blockquote")[i].textContent = Quote.getElementsByTagName("blockquote")[i].textContent+"\n\n"
}
}else{

Quote.getElementsByTagName("blockquote")[i].textContent = ": "+Quote.getElementsByTagName("blockquote")[i].textContent.replace(/\n|\r/g,"\n: ")+"\n\n"
}
}
for (var t = Stamp.length-1; t>=0; t--){

Quote.textContent=Quote.textContent.replace(": "+Stamp[t],Stamp[t])
}
Quote.textContent=": "+Quote.textContent.replace(/^\s+|\s+$/g, '').replace(/\n|\r/g,"\n: ")+"\n"
Quote.textContent = Details + Quote.textContent
document.getElementById("body").value += Quote.textContent
}
function linkPost(thePost){
document.getElementById("body").value += "<a href="+document.location.host +document.location.pathname +"#"+thePost+">"+thePost.replace("_heading","")+"</a>"
}
/*--------------------------------------Post Creator--------------------------------------*/ //-----------------------SHIT LEFT TO DO
function post(url,i,quote,thePost){
divfrm = document.createElement("div")
popindiv= document.createElement("div")
popindiv.innerHTML = "<div style=\"display: none; z-index: 60;\" id=\"popin\">	<div class=\"box title\">		<div class=\"boxtop\"><div><div></div></div></div>		<div class=\"boxl\">			<div class=\"boxr\">				<div class=\"boxm\">					<div class=\"headsizer\">						<div class=\"headingFake\">							<h1 id=\"popin_prompt\" class=\"ngpres\">Enter URL:</h1>							<span class=\"btn kill\" id =\"Cancel\"><a>Cancel</a></span>							<span class=\"btn\"><a id=\"popin_enter\">Enter</a></span>						</div>					</div>					<input id=\"popin_value\" class=\"inputfield\type=\"text\"><div id=\"formstuff\"><textarea id=\"popin_code\" class=\"textarea\"style='display: none;width:476px'></textarea></div>				<div id=\"popin_bottom\"></div>				</div>			</div>		</div>		<div class=\"boxbot\"><div><div></div></div></div>	</div></div>"
document.body.appendChild(popindiv)
divfrm.innerHTML = "<div id='formstuff' class='asbda'>		<div class='box title'>			<div class='boxtop'><div></div></div>			<div class='boxl'>				<div class='boxr'>					<div class='boxm'>						<form name='mainform' id='mainform' method='post' action='/bbs/post/reply/1186403'>						<input type='hidden' name='forum_id' id='forum_id' value='1'>						<div class='headsizer'>							<div class='headingFake'>								<h2 class='i-bbs'>Newgrounds<strong class='gray'>:</strong> <span>New reply in '"+document.getElementsByClassName("bread")[0].lastChild.previousSibling.innerHTML+"', you say?</span></h2>	<span id=\"rembutton\" class=\"btn kill\"><a><span class=\"del\">Close</span></a></span>													</div>						</div>						<ul style='text-align: center; display: block;' class='bread'>NEWGROUNDS BBS INLINE POSTER BY <a href='http://vitaminp.newgrounds.com'>VITAMINP</a></ul>						<div class='hr'><hr></div>									<input type='hidden' name='bbsimage_temp_upload_id' id='bbsimage_temp_upload_id' value=''>			<input type='hidden' name='bbsimage_delete' id='bbsimage_delete' value=''>											<div class='line'>							<span class='fl' id='usrnm'>							<label>Username</label>:</span>											</div>						<div class='line zero'>							<span class='fl'>							<label>Password</label>:</span>							<input type='password' id='userpass' name='userpass' class='inputfield medinput' maxlength='10' tabindex='2'>							<p class='short'>Did you forget? No problem, <a href='/join/forgot'>click here</a>!</p>						</div>						<div class='line zero'>							<span class='fl'><label>Thread Mood</label>:</span>							<input type='hidden' name='icon' id='icon' value='6'>							<div id='smiley6' class='smiley_on'><a href='#' onclick='javascript:MakeSmileySelection(6);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-6.gif' alt='None'></a></div><div id='smiley1' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(1);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-1.gif' alt='Happy'></a></div><div id='smiley15' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(15);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-15.gif' alt='Elated'></a></div><div id='smiley17' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(17);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-17.gif' alt='Sad'></a></div><div id='smiley2' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(2);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-2.gif' alt='Angry'></a></div><div id='smiley19' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(19);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-19.gif' alt='Mad as Hell'></a></div><div id='smiley16' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(16);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-16.gif' alt='Misunderstood'></a></div><div id='smiley18' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(18);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-18.gif' alt='Crying'></a></div><div id='smiley5' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(5);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-5.gif' alt='Questioning'></a></div><div id='smiley4' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(4);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-4.gif' alt='Shouting'></a></div><div id='smiley14' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(14);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-14.gif' alt='Expressionless'></a></div><div id='smiley9' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(9);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-9.gif' alt='Resigned'></a></div><div id='smiley10' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(10);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-10.gif' alt='Winking'></a></div><div id='smiley12' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(12);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-12.gif' alt='Goofy'></a></div><div id='smiley3' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(3);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-3.gif' alt='Thinking'></a></div><div id='smiley7' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(7);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-7.gif' alt='Kissing'></a></div><div id='smiley8' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(8);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-8.gif' alt='Blushing'></a></div><div id='smiley11' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(11);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-11.gif' alt='Muted'></a></div><div id='smiley13' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(13);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-13.gif' alt='Beaten'></a></div><div id='smiley20' class='smiley_off'><a href='#' onclick='javascript:MakeSmileySelection(20);return(false)'><img width='22' height='22' src='http://img.ngfiles.com/emoticons/emote-20.gif' alt='Sleeping'></a></div>						</div>						<div class='line' style = 'height: 2.2em;'>							<span class='fl'>							<label>Quick HTML</label>:</span>							<span class='btn' id='Link'><a>Link</a></span>							<span class='btn' id='Email'><a>E-Mail</a></span>							<span class='btn' id='Bold'><a>Bold</a></span>							<span class='btn' id='Italic'><a>Italic</a></span>							<span class='btn' id='Underlined'><a>Underlined</a></span>	<span class='btn' id='Code'><a>Code</a></span>												</div>						<div class='line'>							<div class='fl'>								<label for='body'>Message</label>:								<dl class='sublabel'>								<dt>HTML you may use:</dt>								<dd><span class='yellow'>&lt;a&gt;</span> <a href='#' onclick='return(false);'>link</a></dd>								<dd><span class='yellow'>&lt;strong&gt;</span> <strong>bold</strong></dd>								<dd><span class='yellow'>&lt;em&gt;</span> <em>italic</em></dd>								<dd><span class='yellow'>&lt;ins&gt;</span> <ins>underline</ins></dd>																</dl>							</div>							<textarea id='body' name='body' rows='12' cols='75' tabindex='3'></textarea>							<div class='inputnote zero'>								<span class='btn' id='clear'><a>Clear Form</a></span>																<p>Characters remaining: <strong id='body_chars_remaining' class='yellow' margin='0 4px 0 0'></strong>   Percent Quoted: <strong id='body_quote_remaining' class='yellow'></strong></p>							</div>													</div>													</form>						<div class='line'>							<span class='fl'><label for='bbsimage_real'>Include Picture?</label>:</span>										<form method='post' enctype='multipart/form-data' target='bbsimage_iframe' id='bbsimage_form' action='/upload/' onsubmit='return(false);'>			<div id='bbsimage_progress'>				<div class='fileinput'>					<input type='file' name='bbsimage_real' id='bbsimage_real' class='thefile'>					<div class='facadeform'>						<span class='btn'><a>Browse…</a></span>						<input type='text' id='bbsimage_fake' name='bbsimage_fake' class='fakefile inputfield' readonly='readonly'>					</div>				</div>			</div>			<input type='hidden' name='bbsimage_previous_upload_id' id='bbsimage_previous_upload_id' value=''>			<input type='hidden' name='upload_type_id' value='1'>			<input type='hidden' name='upload_subtype_id' value='4'>			<input type='hidden' name='upload_generic_id' value=''>			<input type='hidden' name='upload_prefix' value='bbsimage'>			<input type='hidden' name='upload_submitted' value='1'>			</form>									<p>File must be a .gif or .jpg and no larger than 150k, and must not exceed 599px wide by 700px tall.</p>										<div id='bbsimage' style='overflow: visible; display: none;'><div id='bbsimage_wrapper' style='visibility: hidden; height: 112px;'>			<div id='bbsimage_wrapper_inner' style='display: block;'>				<div class='upload_thumbs'>					<div>						<span class='framesizer' style='height: 100px; width: 100px;'><iframe width='100' height='112' frameborder='0' scrolling='no' name='bbsimage_iframe' id='bbsimage_iframe' src='/upload/'></iframe></span>				<h4 id='bbsimage_filename'></h4>		<em><strong>Filesize:</strong> <span id='bbsimage_filesize'>x</span></em><em><strong>Height:</strong> <span id='bbsimage_height'></span> pixels</em><em><strong>Width:</strong> <span id='bbsimage_width'></span> pixels</em>								<span class='btn kill'><a id='Delete'>Delete</a></span>						<br clear='left'>					</div>				</div>				<br clear='left'>			</div>			</div></div>								</div>						<div class='lastline'>							<span class='fl'>							<label>All done?</label>:</span>							<span class='btn' id='postbutton'><a tabindex='5'>Post it! &gt;</a></span>							<p id='statusbar' style='display: none;'>								<span class='working'>									Please wait while your response is submitted.								</span>							</p>							<p class='short'>&nbsp;</p>						</div>					</div>				</div>			</div>			<div class='boxbot'><div></div></div>		</div>	</div>"

var Check = setInterval(function() { CheckCharsRemaining('body', 8192, 0)}, 1500);
var posts = document.getElementsByClassName('heading');
for(j=0;j<posts.length;j++){
if (!posts[j].id.match(/bbspost/)) continue;
posts[j].getElementsByClassName('btn')[0].style.display = 'block'
posts[j].getElementsByClassName('btn')[1].style.display = 'block'
posts[j].getElementsByClassName('btn')[2].style.display = 'none'
posts[j].getElementsByClassName('btn')[3].style.display = 'none'
}
document.getElementById("mainform").insertBefore(divfrm,document.getElementsByClassName('heading')[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling)
//document.body.appendChild(divfrm)




if(document.getElementById("loginbox_loggedin").style.display == 'block'){
var logged_in = true
}else{
var logged_in = false
}
if(logged_in){
document.getElementById('usrnm').parentNode.innerHTML +='<span class="infoknown" id="name">VitaminP</span><p class="short gray">Not you? Make sure to <a href="/account/logout">log out</a>.</p>'
document.getElementById("name").textContent = document.getElementById("loginbox_username").textContent
document.getElementById("userpass").parentNode.removeChild(document.getElementById("userpass").nextSibling.nextSibling)
document.getElementById("userpass").parentNode.innerHTML += '<span class="infoknown" id="password">&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</span>'
document.getElementById("userpass").parentNode.removeChild(document.getElementById("userpass"))
}else{
document.getElementById('usrnm').parentNode.innerHTML += "	<input type='text' id='username' name='username' class='inputfield medinput' maxlength='20' tabindex='1' value=''>							<p>You must have a <strong>Grounds Gold</strong> account to post. <a href='/account/signup'>Sign up now</a> if you don't! (It's super fast and easy &ndash; and best of all, <strong>FREE!</strong></p>"
if(document.getElementById("lb_username").value != ""){
document.getElementById("username").value = document.getElementById("lb_username").value
}
if(document.getElementById("lb_userpass").value != ""){
document.getElementById("userpass").value = document.getElementById("lb_userpass").value
}
}
if(document.getElementsByClassName("bread")[0].firstChild.nextSibling.nextSibling.nextSibling.firstChild.href.replace("http://www.newgrounds.com/bbs/forum/","")!= 2 && document.getElementsByClassName("bread")[0].firstChild.nextSibling.nextSibling.nextSibling.firstChild.href.replace("http://www.newgrounds.com/bbs/forum/","") != 7){
var deadCode = document.createElement("span")
deadCode.innerHTML = "<span>Code</span>"
deadCode.className = "btn dead";
document.getElementById('Code').parentNode.replaceChild(deadCode,document.getElementById('Code'))
}
document.getElementById('Link').addEventListener('click',function(e){
html_helper.Launch(html_helper.TYPE_LINK, 'body');
},false)	
document.getElementById('Email').addEventListener('click',function(e){
html_helper.Launch(html_helper.TYPE_EMAIL, 'body')
},false)	
document.getElementById('Bold').addEventListener('click',function(e){
html_helper.Launch(html_helper.TYPE_BOLD, 'body')
},false)	
document.getElementById('Italic').addEventListener('click',function(e){
html_helper.Launch(html_helper.TYPE_ITALIC, 'body')
},false)	
document.getElementById('Underlined').addEventListener('click',function(e){
html_helper.Launch(html_helper.TYPE_UNDERLINED, 'body')
},false)	
try{document.getElementById('Code').addEventListener('click',function(e){
html_helper.Launch(html_helper.TYPE_CODE, 'body')
},false)}catch(e){}
document.getElementById('Cancel').addEventListener('click',function(e){
html_helper.Cancel();
},false)	
document.getElementById('postbutton').addEventListener('click',function(e){
BBSPost.Save();
},false)
document.getElementById('Delete').addEventListener('click',function(e){
GetUploadController('bbsimage').Delete()
},false)
document.getElementById('rembutton').addEventListener('click',function(e){
Close(i)
},false)
document.getElementById('bbsimage_real').addEventListener('change',function(e){
GetUploadController('bbsimage').ChoseFile();
},false)
document.getElementById('clear').addEventListener('click',function(e){
ClearTextArea('body', 8192)
},false)
if(quote){
quotePost(thePost,i)
}
}
/*-------------------------------------------END------------------------------------------*/
function Close(i){
var posts = document.getElementsByClassName('heading');
for(j=0;j<posts.length;j++){
if (!posts[j].id.match(/bbspost/)) continue;
posts[j].getElementsByClassName('btn')[3].style.display = 'block'
posts[j].getElementsByClassName('btn')[2].style.display = 'block'
posts[j].getElementsByClassName('btn')[1].style.display = 'none'
posts[j].getElementsByClassName('btn')[0].style.display = 'none'
}
StopCharsRemaining('body')
document.getElementById("mainform").removeChild(document.getElementsByClassName('heading')[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling)
}
/*--------------------------------------HTML HELPER--------------------------------------*/ //-----------------------COMPLETED WOOP DE WOOP
function HTMLHelper()
{
	// Our elements.
	this.BACKGROUND_DIV 	= "overlayblackout";
	this.FOREGROUND_DIV 	= "popin";
	this.HELPER_INPUT 		= "popin_value";
	this.HELPER_LINK 		= "popin_enter";
	this.HELPER_TEXT		= "popin_prompt";
	this.HELPER_BOTTOM  = "popin_bottom";

	// Transitions go here.
	this.EFFECTS_IN = 0.05;
	this.EFFECTS_OUT = 0.15;

	// The different types of HTML we'll help with
	this.TYPE_LINK				= 1;
	this.TYPE_EMAIL				= 2;
	this.TYPE_BOLD				= 3;
	this.TYPE_ITALIC			= 4;
	this.TYPE_UNDERLINED		= 5;
	this.TYPE_EMBED				= 6;
	this.TYPE_CODE 				= 7;
	
	var textarea_element;
	var stored_selection = "";
	var stored_link = "";

	var ourbody, pbackground;



	this.Launch = function(html_type, telement)
	{
		textarea_element = telement;

		// Set up our background and append it to the body.
		ourbody = document.getElementsByTagName("body").item(0);
		pbackground = document.createElement("div");
		pbackground.setAttribute("id", html_helper.BACKGROUND_DIV);
		pbackground.style.display = 'none';
		pbackground.addEventListener('click',function(e){
		html_helper.Cancel();
		},false)	
		ourbody.appendChild(pbackground);

		// Let's set up the positioning of the background and the prompt,
		// prior to doing anything else.
		GetElement(html_helper.BACKGROUND_DIV).style.top = 0 + "px";
		GetElement(html_helper.BACKGROUND_DIV).style.left = 0 + "px";
		GetElement(html_helper.BACKGROUND_DIV).style.width = ScrollDimensionsInfo()[0] + "px"; //"800px"; //dimensions[0] + "px";
		GetElement(html_helper.BACKGROUND_DIV).style.height = ScrollDimensionsInfo()[1] + "px"; //"600px"; //dimensions[1] + "px";
		GetElement(html_helper.BACKGROUND_DIV).style.zIndex = 20;

		GetPopup().style.top = (Math.round(GetPageScrollPos()+(InnerDimensionsInfo()[1]/3))) + "px";
		GetPopup().style.left = ((InnerDimensionsInfo()[0]-500)/2) + "px";
		GetPopup().zIndex = 99;

		switch(html_type)
		{
			case this.TYPE_LINK:
				GetLinkURL();
				break;

			case this.TYPE_EMAIL:
				GetEmailAddress();
				break;

			case this.TYPE_BOLD:
				LaunchSimpleHelper('Bold', '<strong>', '</strong>');
				break;

			case this.TYPE_ITALIC:
				LaunchSimpleHelper('Italic', '<em>', '</em>');
				break;

			case this.TYPE_UNDERLINED:
				LaunchSimpleHelper('Underlined', '<ins>', '</ins>');
				break;

			case this.TYPE_EMBED:
				launchEmbedHelper();
				break;

			case this.TYPE_CODE:
				LaunchSimpleHelper('Code', '<code>', '</code>');
				this.HELPER_INPUT 		= "popin_code";
				document.getElementById("popin_value").style.display = "none"
				document.getElementById("popin_code").style.display = "block"
				break;
				
			default:
				alert("Blah");
				break;
		}
	}

	this.Cancel = function()
	{
		// Clear out any stored selections.
		stored_selection = "";
		stored_link = "";
		try{GetElement(html_helper.HELPER_LINK).removeEventListener('click',ETEXTf,false)}catch(e){}
		try{GetElement(html_helper.HELPER_LINK).removeEventListener('click',EMAILf,false)}catch(e){}
		try{GetElement(html_helper.HELPER_LINK).removeEventListener('click',LINKf,false) }catch(e){}
		try{GetElement(html_helper.HELPER_LINK).removeEventListener('click',URLf,false)  }catch(e){} 
		try{GetElement(html_helper.HELPER_LINK).removeEventListener('click',SIMPLEf,false)  }catch(e){} 
		try{GetElement(html_helper.HELPER_INPUT).removeEventListener('keypress', GetKeyLinkURL, false);}catch(e){}
		try{GetElement(html_helper.HELPER_INPUT).removeEventListener('keypress', GetKeyLinkText, false);}catch(e){}
		try{GetElement(html_helper.HELPER_INPUT).removeEventListener('keypress', GetKeyEmailAddress, false);}catch(e){}
		try{GetElement(html_helper.HELPER_INPUT).removeEventListener('keypress', GetKeyEmailText, false);}catch(e){}
		try{GetElement(html_helper.HELPER_INPUT).removeEventListener('keypress', GetKeySimple, false);}catch(e){}
		// We don't want this value lingering.
		this.ClearValueField();

		// Get rid of our prompt.
		GetElement(html_helper.BACKGROUND_DIV).style.display = "none";
		GetPopup().style.display = "none";
		document.getElementById("popin_value").style.display = "block"
		document.getElementById("popin_code").style.display = "none"
		this.HELPER_INPUT 		= "popin_value";
		try{GetElement(html_helper.HELPER_LINK).removeEventListener('click',SIMPLEf,false)  }catch(e){} 
		try{GetElement(html_helper.HELPER_INPUT).removeEventListener('keypress', GetKeySimple, false);}catch(e){}
		// Show the select boxes again.
		ShowSelects();

		// Return focus to our textarea.
		GetElement(textarea_element).focus();
	}

	function GetLinkURL()
	{

		// We're carrying these values around. Better keep track of them.
		tarea = new TextareaManipulation();
		tarea.GetSelection(textarea_element);
		stored_selection = tarea.GetText();
		GetElement(html_helper.HELPER_TEXT).innerHTML = "Enter the URL you'd like to link to";
		GetElement(html_helper.HELPER_LINK).addEventListener('click',URLf = function(e){
html_helper.ReceiveLinkURL();
},false)	
GetElement(html_helper.HELPER_INPUT).addEventListener('keypress', GetKeyLinkURL = function(e){var event = e || window.event;var code = event.charCode || event.keyCode;if(code == 13)	{html_helper.ReceiveLinkURL()}}, false);

		ShowPrompt();
	}

	this.ReceiveLinkURL = function()
	{	
				stored_link = document.getElementById(html_helper.HELPER_INPUT).value;
GetElement(html_helper.HELPER_INPUT).removeEventListener('keypress', GetKeyLinkURL, false);
GetElement(html_helper.HELPER_LINK).removeEventListener('click',URLf,false) 



		if(stored_link == "")
		{
			// We clear out values and try again, until the user enters a link
			// (or clicks cancel).
			this.Cancel();
			GetLinkURL();
		} else
		{
			if(stored_selection != "")
			{
				// We have a selection from which to wrap this URL around.
				tarea.Insert("<a href=\"" + DoGoodLink(stored_link) + "\">" + stored_selection + "</a>");
				this.Cancel();
			} else
			{
				GetElement(html_helper.HELPER_TEXT).innerHTML = "Enter a label (or leave blank)";
				GetElement(html_helper.HELPER_LINK).addEventListener('click',LINKf = function(e){
html_helper.ReceiveLinkText();
},false)					
				GetElement(html_helper.HELPER_INPUT).value = "";
				GetElement(html_helper.HELPER_INPUT).addEventListener('keypress', GetKeyLinkText = function(e){var event = e || window.event;var code = event.charCode || event.keyCode;if(code == 13)	{html_helper.ReceiveLinkText()}}, false);
				ShowPrompt();
			}
		}
	}

	function DoGoodLink(link)
	{
		// Check that we're starting with the correct protocol.
		var expr = /^(((https?|ftp):\/\/)|aim:goim|skype|\/)/i;

		if(!(expr.exec(link)))
		{
			link = "http://" + link;
		}
		return(link);
	}

	this.ReceiveLinkText = function()
	{
GetElement(html_helper.HELPER_INPUT).removeEventListener('keypress', GetKeyLinkText, false);
GetElement(html_helper.HELPER_LINK).removeEventListener('click',LINKf,false) 
		var ins_text;
		if(document.getElementById(html_helper.HELPER_INPUT).value.length == 0)
		{
			ins_text = stored_link;
		} else
		{
			ins_text = document.getElementById(html_helper.HELPER_INPUT).value;
		}

		GetElement(textarea_element).value = GetElement(textarea_element).value + "<a href=\"" + DoGoodLink(stored_link) + "\">" + ins_text + "</a>";
		this.Cancel();
	}

	function GetEmailAddress()
	{

		// We're carrying these values around. Better keep track of them.
		tarea = new TextareaManipulation();
		tarea.GetSelection(textarea_element);
		stored_selection = tarea.GetText();
		GetElement(html_helper.HELPER_TEXT).innerHTML = "Enter the e-mail address you'd like to link to";
		GetElement(html_helper.HELPER_LINK).addEventListener('click',EMAILf =function(){
html_helper.ReceiveEmailAddress();
},false)
GetElement(html_helper.HELPER_INPUT).addEventListener('keypress', GetKeyEmailAddress = function(e){var event = e || window.event;var code = event.charCode || event.keyCode;if(code == 13)	{html_helper.ReceiveEmailAddress()}}, false);
		ShowPrompt();
	}

	this.ReceiveEmailAddress = function()
	{
		stored_link = GetElement(html_helper.HELPER_INPUT).value;
GetElement(html_helper.HELPER_INPUT).removeEventListener('keypress', GetKeyEmailAddress, false);
GetElement(html_helper.HELPER_LINK).removeEventListener('click',EMAILf,false) 
		if(stored_link == "")
		{
			// Again, if this is blank, we don't want to continue.
			this.Cancel();
			GetEmailAddress();
		} else
		{
			if(!(IsGoodEmail(stored_link)))
			{
				alert("Invalid e-mail address!");
				this.Cancel();
			} else
			{
				if(stored_selection != "")
				{
					// We have a selection from which to wrap this URL around.
					tarea.Insert("<a href=\"mailto:" + stored_link + "\">" + stored_selection + "</a>");
					this.Cancel();
				} else
				{
					GetElement(html_helper.HELPER_TEXT).innerHTML = "Enter a label (or leave blank)";
					GetElement(html_helper.HELPER_LINK).addEventListener('click',ETEXTf =function(){
html_helper.ReceiveEmailText()
},false)
					GetElement(html_helper.HELPER_INPUT).value = "";
GetElement(html_helper.HELPER_INPUT).addEventListener('keypress', GetKeyEmailText = function(e){var event = e || window.event;var code = event.charCode || event.keyCode;if(code == 13)	{html_helper.ReceiveEmailText()}}, false);
					ShowPrompt();
				}
			}
		}
	}

	this.ReceiveEmailText = function()
	{
GetElement(html_helper.HELPER_INPUT).removeEventListener('keypress', GetKeyEmailText, false);
	GetElement(html_helper.HELPER_LINK).removeEventListener('click',ETEXTf,false) 
		var ins_text;
		if(document.getElementById(html_helper.HELPER_INPUT).value.length == 0)
		{
			ins_text = stored_link;
		} else
		{
			ins_text = document.getElementById(html_helper.HELPER_INPUT).value;
		}

		GetElement(textarea_element).value = GetElement(textarea_element).value + "<a href=\"mailto:" + stored_link + "\">" + ins_text + "</a>";
		this.Cancel();
	}

	function IsGoodEmail(email)
	{
		var our_good_chars = /[^a-z0-9\-_\.]/ig;
		var our_parts = email.split('@');

		if(our_parts.length < 2)
		{
			return(false);
		} else
		if((our_good_chars.exec(our_parts[0])) || (our_good_chars.exec(our_parts[1])))
		{
			return(false);
		} else
		{
			var our_domain_parts = our_parts[1].split(".");
			if(our_domain_parts.length < 2)
			{
				return(false);
			}
		}

		return(true);
	}

	function launchEmbedHelper() {
		document.getElementById(html_helper.HELPER_TEXT).innerHTML = 'Paste the embed code from the site';
		document.getElementById(html_helper.HELPER_LINK).addEventListener('click',function(e){
html_helper.receiveEmbed()
},false)
		document.getElementById(html_helper.HELPER_BOTTOM).innerHTML =
			'<p class="large last"><em>Currently allowing embed tags from the following sites:</em></p>'
			+ '<p class="large last"><strong>YouTube</strong>, <strong>Revver</strong>, <strong>Vimeo</strong>, and <strong>GameTrailers</strong>.</p>'
		;
		try{GetElement(html_helper.HELPER_INPUT).removeEventListener('keypress', GetKey, false);}catch(e){}
		InitKeyHandler('html_helper.receiveEmbed();');
		ShowPrompt();
	}

	this.receiveEmbed = function () {
		this.RetrieveInput(GetElement(html_helper.HELPER_INPUT).value, open, close);

		// We are going to get the cursor position here.
		var tarea = new TextareaManipulation();
		tarea.GetVariables(textarea_element);
		tarea.ResetCursor(GetElement(textarea_element).value.length);

		// Close the dialogue box.
		this.Cancel();
	}

	function LaunchSimpleHelper(keyword, open, close)
	{
		tarea = new TextareaManipulation();
		tarea.GetSelection(textarea_element);
		var our_selection = tarea.GetText();

		if(our_selection != "")
		{
			// The user selected some text. Now we have to wrap that text in our tags.
			tarea.Insert(open + our_selection + close);
		} else
		{
			// We have to manually get something back from the user.
			GetElement(html_helper.HELPER_TEXT).innerHTML = "Enter Text You'd Like To Appear in " + keyword;
			GetElement(html_helper.HELPER_LINK).addEventListener('click',SIMPLEf = function(e){
html_helper.ReceiveSimple(open,close)
},false)
GetElement(html_helper.HELPER_INPUT).addEventListener('keypress', GetKeySimple = function(e){var event = e || window.event;var code = event.charCode || event.keyCode;if(code == 13)	{html_helper.ReceiveSimple(open,close);}}, false);
			ShowPrompt();
		}
	}


	this.ReceiveSimple = function(open, close)
	{
		// Set the value we got, if we got any.
		this.RetrieveInput(GetElement(html_helper.HELPER_INPUT).value, open, close);

		// We are going to get the cursor position here.
		var tarea = new TextareaManipulation();
		tarea.GetVariables(textarea_element);
		tarea.ResetCursor(GetElement(textarea_element).value.length);

		// Close the dialogue box.
		this.Cancel();
	}

	this.RetrieveInput = function(text, open, close)
	{
		if(text.length > 0)
		{
			GetElement(textarea_element).value = GetElement(textarea_element).value + open + text + close;
		}
	}

	this.ClearValueField = function()
	{
		GetElement(html_helper.HELPER_INPUT).value = "";
	}

	function GetElement(id)
	{
		return(document.getElementById(id));
	}

	function ShowPrompt()
	{
		HideSelects();
		GetElement(html_helper.BACKGROUND_DIV).style.display = "block";
		GetPopup().style.display = "block";
		GetElement(html_helper.HELPER_INPUT).focus();
	}

	function GetPopup()
	{
		return(GetElement(html_helper.FOREGROUND_DIV));
	}

	// Browser related functions.
	function InnerDimensionsInfo()
	{
		var dimensions = new Array(2);

		if(self.innerWidth)
		{
			dimensions[0] = self.innerWidth;
			dimensions[1] = self.innerHeight;
		} else
		if(document.documentElement && document.documentElement.clientWidth)
		{
			dimensions[0] = document.documentElement.clientWidth;
			dimensions[1] = document.documentElement.clientHeight;
		} else
		if(document.body)
		{
			dimensions[0] = document.body.clientWidth;
			dimensions[1] = document.body.clientHeight;
		}

		return(dimensions);
	}

	function ScrollDimensionsInfo()
	{
		var dimensions = new Array(2);

		if(window.innerHeight && window.scrollMaxY)
		{
			dimensions[0] = document.body.scrollWidth;
			dimensions[1] = window.innerHeight + window.scrollMaxY;
		} else
		if(document.body.scrollHeight > document.body.offsetHeight)
		{
			dimensions[0] = document.body.scrollWidth;
			dimensions[1] = document.body.scrollHeight;
		} else
		{
			dimensions[0] = document.body.offsetWidth;
			dimensions[1] = document.body.offsetHeight;
		}

		return(dimensions);
	}

	function GetPageScrollPos()
	{
		var offset;

		if(self.pageYOffset)
		{
			offset = self.pageYOffset;
		} else
		if((document.documentElement) && (document.documentElement.scrollTop))
		{
			offset = document.documentElement.scrollTop;
		} else
		if(document.body)
		{
			offset = document.body.scrollTop;
		}

		return(offset);
	}

	function ShowSelects()
	{
		var selects = document.getElementsByTagName("select");
		for(var i = 0; i != selects.length; i++)
		{
			selects[i].style.visibility = "visible";
		}
	}

	function HideSelects()
	{
		var selects = document.getElementsByTagName("select");
		for(var i = 0; i != selects.length; i++)
		{
			selects[i].style.visibility = "hidden";
		}
	}

	// Our text field specific stuff.
	function TextareaManipulation()
	{
		var start_position = null, end_position = null, full_length = null, selection_text = null;
		var our_element;

		this.GetSelection = function(element)
		{
			our_element = document.getElementById(element);

			if((document.selection) && (document.selection.createRange) && (document.selection.createRange().parentElement))
			{
				our_element.focus();

				var original = our_element.value.replace(/\r\n/g, "\n");
				var therange = document.selection.createRange();

				var separator = Math.round(Math.random()*100*new Date()).toString(); //'#$%^%$#';

				selection_text = therange.text;
				therange.text = separator;
				var eitheror = our_element.value.split(separator);

				start_position = eitheror[0].length;
				therange.moveStart("character", -separator.length);

				therange.text = selection_text;

				end_position = our_element.value.length-eitheror[1].length;
			} else
			if(our_element.selectionStart >= 0)
			{
				start_position = our_element.selectionStart;
				end_position = our_element.selectionEnd;
				selection_text = (our_element.value.substr(start_position, end_position-start_position));
			}
		}

		this.GetText = function()
		{
			return(selection_text);
		}

		this.Insert = function(text)
		{
			our_element.value = our_element.value.substr(0, start_position) + text + our_element.value.substr(end_position, our_element.value.length);

			this.ResetCursor(start_position+text.length);
		}

		this.GetVariables = function(element)
		{
			our_element = element;
		}

		this.ResetCursor = function(position)
		{
			if(our_element.selectionStart)
			{
				our_element.focus();
				our_element.setSelectionRange(position, position);
			} else
			if(our_element.createTextRange)
			{
				var range = our_element.createTextRange();
				range.move('character', position);
				range.select();
			}
		}
	}
}
/*-------------------------------------------END------------------------------------------*/

/*--------------------------------------BBS Poster--------------------------------------*/ //-----------------------SHIT LEFT TO DO
function BBSPoster()
{
	var AJAX_SUBMIT_PAGE 		= "/ajax/makebbspost.php";
	var IMAGE_UPLOAD_NAME 		= "bbsimage";
	var ACCEPTED_FILE_EXTENSIONS	= new Array("jpg", "jpeg", "gif");

	//var submit_button = document.getElementById("postbutton")

	// Include our code for image uploading and make it public
	this.ImageUploader = new FileUploadController(IMAGE_UPLOAD_NAME, 1, ACCEPTED_FILE_EXTENSIONS);
if(document.getElementById("loginbox_loggedin").style.display == 'block'){
var logged_in = true
}else{
var logged_in = false
}
	var is_response;
	var has_agreed = true;

	this.Save = function()
	{
		// First make sure an image upload isn't currently in progress --------------------------------------------Broken
		if(this.ImageUploader.UploadInProgress())
		{
			alert("Please wait for your image upload to finish.");
			return;
		}

		// Check whether this is a response to an existing thread, or a new thread altogether.
		is_response = document.location.pathname.split('/',4)[3].toString().length > 0;

		// We'll start all the way up here with our params.
		var params = new Array();


			has_agreed = true;
			params["has_agreed"] = "Y"


		if(!(logged_in))
		{
			var username_element = document.getElementById("username");
			if(username_element.value.length == 0)
			{
				alert("You must enter your username!");
				username_element.focus();
				return;
			}

			var password_element = document.getElementById("userpass");
			if(password_element.value.length == 0)
			{
				alert("You must enter your password!");
				password_element.focus();
				return;
			}
		}

		var subject_element = document.getElementsByClassName("bread")[0].lastChild.previousSibling.innerHTML;
		if(!(is_response))
		{
			if(subject_element.length < 3)
			{
				alert("You must enter a subject, of at least three characters in length.");
				subject_element.focus();
				return;
			}
		}

		var body_element = document.getElementById("body");
		if(body_element.value.length == 0)
		{
			alert("You must enter some text!");
			body_element.focus();
			return;
		}

		if(!(has_agreed))
		{
			alert("You must agree to the terms and conditions of posting!");
			agreement_element.focus();
			return;
		}

		StartStatusAnimation();
		//return;

		if(!(logged_in))
		{
			params["username"] = username_element.value;
			params["userpass"] = password_element.value;
		}

		params["subject"] = subject_element;
		params["forum_id"] = document.getElementsByClassName("bread")[0].firstChild.nextSibling.nextSibling.nextSibling.firstChild.href.replace("http://www.newgrounds.com/bbs/forum/","");
		params["thread_id"] = document.location.pathname.split('/',4)[3].toString()
		params["icon_id"] = document.getElementById("icon").value;
		params["body"] = document.getElementById("body").value;

		// See if this includes an image
		var upload_id = document.getElementById(IMAGE_UPLOAD_NAME + "_temp_upload_id").value;
		if(upload_id != "")
		{
			// Yep, they attached an image
			params["upload_id"] = upload_id;
		}
		else if(document.getElementById(IMAGE_UPLOAD_NAME + "_delete").value == 1)
		{
			params["delete_image"] = 1;
		}

		var userkey_element = document.getElementById("userkey");
		if(userkey_element)
		{
			params["userkey"] = userkey_element.value;
		}

		var ajax = new AjaxRequest(AJAX_SUBMIT_PAGE);
		ajax.Send(params, HandlePostSave, HandleErrorCleanup);
	}

	function StartStatusAnimation()
	{
		document.getElementById("statusbar").style.display = "block";
		var button_str = (is_response ? "Submitting Response" : "Posting Thread");
		//submit_button.Disable(button_str);------------------------------------------------------------------------Broken
	}

	function StopStatusAnimation()
	{
		document.getElementById("statusbar").style.display = "none";
		//submit_button.Enable();-----------------------------------------------------------------------------------Broken
	}

	function HandlePostSave(response)
	{
		window.location.href = response.GetField("post_url");
	}

	function HandleErrorCleanup()
	{
		StopStatusAnimation();
	}
}
/*-------------------------------------------END------------------------------------------*/

/*--------------------------------------Image Upload------------------------------------*/ //-----------------------SHIT LEFT TO DO
function FileUploadController(id, type, accepted_extensions, save_button_id)
{
	// The different types of things we can upload
	var TYPE_IMAGE				= 1;
	var TYPE_FLASH				= 2;
	var TYPE_AUDIO				= 3;
	var TYPE_FLASH_PROJECT			= 4;
	var TYPE_TEXT				= 5;
	var TYPE_ARCHIVE			= 6;
	var TYPE_PDFPDF_ICON			= 7;

	// This is fake, but at least we can accept any file with this, with minimal file information returned.
	var TYPE_ANONYMOUS		= 1000;

	// This guy will show/hide the image, depending on what happens
	var window_displayer = null;

	// Watch whether there's an upload in progress or not
	var upload_in_progress = false;

	// Hang onto whatever's in place of where we swap in the progress bar
	var original_progress_bar_html = null;

	// Let's try to pre-load the progress bar, in the hopes of speeding things up
	//var progress_image = new Image();								// This will never actually get used,
	//progress_image.src = "http://img.ngfiles.com/form-loadbar.gif";			// it's just to force the browser to load it

	// The save button, if there is one.
	var save_button = (save_button_id == null) ? null : new Button(save_button_id);

	// This is some jiggery pokery that will allow us to send a callback function when necessary... Like when we
	// need to juggle between file types and sending the type_id
	//var callback_function = null;
	
	this.setType = function(mytype) 
	{
		type = mytype;
	}

	this.ChoseFile = function()
	{
	document.getElementById('bbsimage_iframe').addEventListener('load',function(e){
	eval(document.getElementById('bbsimage_iframe').contentWindow.document.getElementsByTagName("script")[0].innerHTML.replace(/(\n|.)*parent./g,"").replace(/;(\n|.)*./g,""))

/*this.style.visibility ="visible"
this.parentNode.parentNode.parentNode.parentNode.parentNode.style.visibility ="visible"
this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display ="block"
UploadFinished();*/
},false)
		// ARRRRRRRGGH!!!!!
		var useragent = navigator.userAgent.toLowerCase();
		if((useragent.indexOf("safari") != -1) && (useragent.indexOf("mac") != -1))
		{
			var expr = /applewebkit\/([0-9]+(\.[0-9]+)*)/g;
			var result;

			if((result = expr.exec(useragent)) && (parseInt(result[1]) < 522))
			{
				alert("Sorry, Safari users... you need version 3 or better to use this feature.\n\nIf you can't upgrade, perhaps consider using Firefox.");
				return;
			}
		}

		// Let's check up front that they're not submitting an inappopriate file type
		var extension = GetFileExtension();

		if(extension != null)
		{
			if(accepted_extensions.indexOf(extension) == -1)
			{
				var msg = "Error - you are attempting to upload a file with the extension:\n";
				msg += "\n";
				msg += "    ." + extension + "\n";
				msg += "\n";
				msg += "Your file must have one of the following extensions:\n";
				msg += "\n";
				msg += "    ." + accepted_extensions.join(" .");
				alert(msg);
				return;
			}
		}
		else
		{
			var msg = "Error - the file you're attempting to upload has no extension.\n";
			msg += "\n";
			msg += "Your file must have one of the following extensions:\n";
			msg += "\n";
			msg += "    ." + accepted_extensions.join(" .");
			alert(msg);
			return;
		}
		
		upload_in_progress = true;

		// If we've previously chosen an image, let's close it
		if(GetWindowDisplayer().IsOpen()){ 
		document.getElementById('bbsimage_iframe').style.visibility ="hidden";
		document.getElementById('bbsimage_iframe').parentNode.parentNode.parentNode.parentNode.parentNode.style.visibility ="hidden";
		document.getElementById('bbsimage_iframe').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display ="none";
		ProcessFileChoice()
		}else{ 
		ProcessFileChoice();
		}
		//GetWindowDisplayer().IsOpen() ? GetWindowDisplayer().Close(ProcessFileChoice) : ProcessFileChoice(); 
	}

	this.AddFile = function(temp_upload_id, params)
	{
		// Store the IDs so everything works when we submit the form
		document.getElementById(id + "_temp_upload_id").value = temp_upload_id;
		document.getElementById(id + "_previous_upload_id").value = temp_upload_id;

		// In case we deleted a previous image - clear this
		document.getElementById(id + "_delete").value = "";

		// Display the pretty info next to the thumbnail
		DisplayUploadInfo(params.split("|"));

		// I HATE having to hardcode this height... sigh.
		var iframe = document.getElementById(id + '_iframe');
		if(type == TYPE_IMAGE || type == TYPE_AUDIO) {
			iframe.height = 112;
			iframe.width = 100;
			iframe.parentNode.style.height = '100px';
			iframe.parentNode.style.width = '100px';
		} else if(type == TYPE_FLASH || type == TYPE_FLASH_PROJECT || type == TYPE_TEXT || type == TYPE_ARCHIVE || type == TYPE_PDF) {
			iframe.height = 67;
			iframe.width = 55;
			iframe.parentNode.style.height = '55px';
			iframe.parentNode.style.width = '55px';
		}

		// Finally, show the thumbnail!
		document.getElementById('bbsimage_iframe').style.visibility ="visible"
document.getElementById('bbsimage_iframe').parentNode.parentNode.parentNode.parentNode.parentNode.style.visibility ="visible"
document.getElementById('bbsimage_iframe').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display ="block"
//GetWindowDisplayer().Open(UploadFinished); 

UploadFinished()
	}

	this.Delete = function()
	{
		// Reset all our status stuff
		UploadFinished();

		// Blank out everything
		document.getElementById(id + "_temp_upload_id").value = "";
		document.getElementById(id + "_fake").value = "";
		document.getElementById(id + "_real").value = "";

		// Also note that they actually deleted something that was there
		document.getElementById(id + "_delete").value = 1;

		// If the window's open, close it
		document.getElementById('bbsimage_iframe').style.visibility ="hidden"
document.getElementById('bbsimage_iframe').parentNode.parentNode.parentNode.parentNode.parentNode.style.visibility ="hidden"
document.getElementById('bbsimage_iframe').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display ="none"
/*if(GetWindowDisplayer().IsOpen())
{
GetWindowDisplayer().Close();
} */
	}

	this.UploadInProgress = function()
	{
		return(upload_in_progress);
	}

	this.GetWindowDisplayer = function()
	{
		return(GetWindowDisplayer());
	}

	this.resetIframeDimensions = function (width, height) {
		alert('width: ' + width + ', height: ' + height);
	}

	function ProcessFileChoice()
	{
		// Stick the short filename in the fake form
		var filename = GetFilename();
		document.getElementById(id + "_fake").value = filename;
		// We're cleared for takeoff, submit the form
		document.getElementById(id + '_form').submit();

		// Now that the form is submitted, we can activate the snazzy progress bar
		var progress_div = document.getElementById(id + "_progress");
		original_progress_bar_html = progress_div.innerHTML;
		progress_div.innerHTML = "<span class=\"upload_working formtext\"><span>" + filename + "</span></span><span class=\"btn dead\"><span>Uploading</span></span>";

		if(hasSaveButton())
		{
			getSaveButton().Disable();
		}
	}

	function UploadFinished()
	{		

		// Swap out the progress bar
		if(original_progress_bar_html != null)
		{
	
			document.getElementById(id + "_progress").innerHTML = original_progress_bar_html;
			document.getElementById('bbsimage_real').addEventListener('change',function(e){
GetUploadController('bbsimage').ChoseFile();
},false)
		}

		// Also clear out the file upload
		document.getElementById(id + '_real').value = '';

		if(hasSaveButton())
		{
			getSaveButton().Enable();
		}

		upload_in_progress = false;
	}
	
	function GetWindowDisplayer()
	{
		if(window_displayer == null)
		{
			window_displayer = new WindowDisplayer(id);
		}

		return(window_displayer);
	}

	function GetFilename()
	{
		// Grab only the last part of the filename to display
		var parts = document.getElementById(id + "_real").value.split(/(\/|\\)/g);
		return(parts[parts.length - 1]);
	}

	function GetFileExtension()
	{
		var parts = GetFilename().split(/\./g);
		return((parts.length > 1) ? parts[parts.length - 1].toLowerCase() : null);
	}

	function DisplayUploadInfo(params)
	{
		switch(type)
		{
			case TYPE_IMAGE:
				document.getElementById(id + '_filename').innerHTML = params[0];
				document.getElementById(id + '_filesize').innerHTML = params[1];
				
				if (document.getElementById(id + '_height')) {
					document.getElementById(id + '_height').innerHTML = params[2];
				}
				
				if (document.getElementById(id + '_width')) {
					document.getElementById(id + '_width').innerHTML = params[3];
				}
				
				break;

			case TYPE_FLASH:
				document.getElementById(id + '_filename').innerHTML = params[0];
				document.getElementById(id + '_filesize').innerHTML = params[1];
				break;

			case TYPE_AUDIO:
				document.getElementById(id + '_filename').innerHTML = params[0];
				document.getElementById(id + '_filesize').innerHTML = params[1];
				if (document.getElementById(id + '_length')) {
					document.getElementById(id + '_length').innerHTML = params[2];
				}

				break;

			case TYPE_FLASH_PROJECT:
				document.getElementById(id + '_filename').innerHTML = params[0];
				document.getElementById(id + '_filesize').innerHTML = params[1];
				
				break;
				
			case TYPE_ANONYMOUS:
				document.getElementById(id + '_filename').innerHTML = params[0];
				document.getElementById(id + '_filesize').innerHTML = params[1];
				break;
				
			case TYPE_TEXT:
				document.getElementById(id + '_filename').innerHTML = params[0];
				document.getElementById(id + '_filesize').innerHTML = params[1];
				break;
				
			case TYPE_ARCHIVE:
				document.getElementById(id + '_filename').innerHTML = params[0];
				document.getElementById(id + '_filesize').innerHTML = params[1];
				break;

			case TYPE_PDF:
				document.getElementById(id + '_filename').innerHTML = params[0];
				document.getElementById(id + '_filesize').innerHTML = params[1];
				break;
		}
	}

	function hasSaveButton()
	{
		return getSaveButton() != null;
	}

	function getSaveButton()
	{
		return save_button;
	}


}
/*-------------------------------------------END------------------------------------------*/

function WindowDisplayer(id, renderhack_callback, open_link_text)
{
	var EFFECTS_DURATION 				= 500;		// Seconds

	var open_callback = null;
	var close_callback = null;
	var animation_in_progress = false;
	var original_link_text = null;	// Will be set upon first open
	var self = this;
	var offset_hack = 0;			// Sometimes we need to offset the animation by some arbitrary amount

	this.Open = function(callback)
	{
		if(!(animation_in_progress))
		{
			animation_in_progress = true;
			SetLinkText();
			open_callback = (typeof callback == "function" ? callback : null);
			
			SlideDown();
		}
	}

	this.Close = function(callback)
	{
		if(!(animation_in_progress))
		{
			animation_in_progress = true;
			SetLinkText();
			close_callback = (typeof callback == "function" ? callback : null);
			FadeOutBox();
		}
	}

	this.Toggle = function(callback)
	{
		GetOpenStatus() ? self.Close(callback) : self.Open(callback);
	}

	this.IsOpen = function()
	{
		return(GetOpenStatus());
	}

	this.isInProgress = function ()
	{
		return animation_in_progress;
	};

	this.SetOffsetHack = function(offset)
	{
		offset_hack = offset;
	}

	this.SetOriginalLinkText = function(text)
	{
		original_link_text = text;
	}

	function SlideDown()
	{
		$('#'+id).slideDown(EFFECTS_DURATION, FadeInBox);
	}

	function getWrapper()
	{
		if (typeof id === 'string') {
			return document.getElementById(id + '_wrapper');
		} else {
			return id.down();
		}
	}

	function getWrapperInner()
	{
		if (typeof id === 'string') {
			return document.getElementById(id + '_wrapper_inner');
		} else {
			return getWrapper().down();
		}
	}

	function SlideUp()
	{
		var container_div = getWrapper();

		// Hide the container for the box that just got faded out (and is already invisible)
		container_div.style.visibility = "hidden";

		// Now do the slide!
		$('#'+id).slideUp(EFFECTS_DURATION, FinishClose);
	}

	function FadeInBox()
	{
		var container_div = getWrapper();
		var container_div_inner = getWrapperInner();

		// First we explicitly give ourselves the height of the space that opened up previously
		container_div.style.height = (offset_hack + container_div.offsetHeight) + "px";

		// Now that we've set the height, hide the content (don't worry, it's invisible)
		container_div_inner.style.display = "none";

		// And now make it visible (it's display: none so we won't see it yet)
		container_div.style.visibility = "visible";

		// Finally - do the fade-in, in the space we just opened up
		$(container_div_inner).fadeIn(EFFECTS_DURATION, FinishOpen);
	}

	function FadeOutBox()
	{
		// We need to "harden" our height again before we do this
		var container_div = getWrapper();
		container_div.style.height = (offset_hack + container_div.offsetHeight) + "px";

		// Alright, now we can fade out the inner but keep the height
		$(getWrapper()).fadeTo(EFFECTS_DURATION, SlideUp);
	}

	function FinishOpen()
	{
		// Wipe out the "hard" height we gave ourselves during the transition
		getWrapper().style.height = null;

		RenderingHacks();

		if(open_callback != null)
		{
			open_callback();
			RenderingHacks();		// Doing this twice might not be necessary in all cases.  Oh well.  !@#$%*.
		}

		animation_in_progress = false;
	}

	function FinishClose()
	{
		// Now that we've closed our outermost div, we can give display back to the inner wrapper
		getWrapperInner().style.display = "block";

		RenderingHacks();

		if(close_callback != null)
		{
			close_callback();
			RenderingHacks();
		}

		animation_in_progress = false;
	}

	function SetLinkText()
	{
		var element = GetLinkElement();

		if((element) && (typeof open_link_text != "undefined"))
		{
			if(original_link_text == null)		// Let's store away what's there now
			{
				original_link_text = GetLinkElement().firstChild.data;
			}

			GetLinkElement().firstChild.data = (GetOpenStatus() ? original_link_text : open_link_text);
		}
	}

	function GetLinkElement()
	{
		if (typeof id === 'string') {
			return document.getElementById(id + '_link');
		} else {
			return document.getElementById(id.id + '_link');
		}
	}

	function GetOpenStatus()
	{
		var wrapper_element = getWrapper();
		return((wrapper_element) && (wrapper_element.style.visibility != "hidden"));
	}

	// This function is necessary to work around different browser quirks.  Maybe one day... it'll go away...
	function RenderingHacks()
	{
		if(typeof renderhack_callback == "function")
		{
			renderhack_callback(id);
		}
	}
}

/* Static members/methods */
(function () {
	var window_displayers = {};

	WindowDisplayer.getFor = function (div)
	{
		div_id = document.getElementById(div).identify();
		if (!window_displayers[div_id]) {
			window_displayers[div_id] = new WindowDisplayer(div);
		}

		return window_displayers[div_id];
	};

	WindowDisplayer.hasFor = function (div)
	{
		div_id = document.getElementById(div).identify();

		return !!window_displayers[div_id]
	};
	
	WindowDisplayer.open = function (div, callback)
	{
		var window_displayer = WindowDisplayer.getFor(div);
		if (!window_displayer.isInProgress()) {
			return window_displayer.Open(callback);
		}
	};

	WindowDisplayer.close = function (div, callback)
	{
		var window_displayer = WindowDisplayer.getFor(div);
		if (!window_displayer.isInProgress()) {
			return WindowDisplayer.getFor(div).Close(callback);
		}
	};

})();


/*--------------------------------------Ajax Request------------------------------------*/ //-----------------------COMPLETED WOOP DE WOOP
function AjaxRequest(url)
{
	// Wait this many seconds before considering it an error
	var ERROR_TIMEOUT = 30;

	// Our HTTP response needs to contain one of these
	var STATUS_ERROR 			= 0;
	var STATUS_SUCCESS 			= 1;
	var STATUS_ERROR_SILENT		= 2;

	this.linked_object = null;
	
	this.LinkObject = function(link_to)
	{
		this.linked_object = link_to;
	}

	// PUBLIC - function to actually do the AJAX communication
	this.Send = function(params_array, success_handler, error_handler)
	{
		// Do some basic parameter checking
		if((url == "") || (typeof success_handler != "function") || ((params_array != null) && (AssociativeArrayIsEmpty(params_array))))
		{
			return(false);
		}

		// Check for an error callback
		if(typeof error_handler != "function")
		{
			error_handler = null;
		}


		// Kick off our function to watch for a timeout
		var timeout_watch = setTimeout(function() {

			// Inform the user of the timeout
			alert("We were unable to contact the Newgrounds server.  Please wait a moment and try again.");

			// If we've got a callback, call it
			if(error_handler != null)
			{
				error_handler(null, this.linked_object);
			}
		}, (ERROR_TIMEOUT * 1000));

		// Closures make for a beautiful way to handle AJAX responses, no globals needed!


		// Now let's build a query string of our data
		var query_string = "";

		if(params_array != null)
		{
			for(var params_key in params_array)
			{
				// If you're using Prototype.js, your array will have a bunch of extra stuff you don't want
				if(typeof params_array[params_key] != "function")
				{
					query_string += "&" + URLEscape(params_key) + "=" + URLEscape(params_array[params_key]);
				}
			}

			// Hack off the leading "&"
			query_string = query_string.substring(1);

			// If we have a security key, add it on the end
			var security_key = document.getElementById("userkey");
			if(security_key)
			{
				query_string += "&userkey=" + URLEscape(security_key.value);
			}
		}

		// Right here is the magic part of AJAX - do the HTTP request
		GM_xmlhttpRequest(
{
	method: "POST",
	url: url,
   	headers: {
        'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-GB; rv:1.9.2.12) Gecko/20101026 Firefox/3.6.12',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
    	},
	data: query_string,
	onload: function(http_request)
	{

	http_request.responseXML = new DOMParser().parseFromString(http_request.responseText,'text/xml');
				if(http_request.readyState == 4)
			{
				if(http_request.status == 200)
				{
					// Cancel our earlier timeout watcher, since we got a response
					clearTimeout(timeout_watch);

					// Check the response for validity
					switch (http_request.responseText.charAt(0)) {
						case "<":
							response = new AjaxResponse(http_request, this.linked_object);
							break;
						default :
							response = new JSONResponse(http_request, this.linked_object);
							break;
					}
					if(HttpResponseIsValid(response, error_handler))
					{
						// If it's valid, call our handler
						success_handler(response);
					}
				}
				// Possibly handle other HTTP response codes here?
			}
	}})
		// We're done here.  Our handler will pick up when we get a response back.
		return(true);
	}

	// PRIVATE - function to get the super-magical XMLHttpRequest object that's key to AJAX
	function GetHttpRequestObject()
	{
		var new_request = null;

		if(window.XMLHttpRequest)		// For smart browsers
		{
			new_request = new XMLHttpRequest();
		}
		else if(window.ActiveXObject)	// For IE (lame)
		{
			try {
				new_request = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e) {
				// If we're here, we couldn't make that object - try another one
				try {
					new_request = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch(e) {
					// We absolutely can't do AJAX.  Sorry.
					new_request = null;
				}
			}
		}

		return(new_request);
	}

	// PRIVATE - function to check the integrity of the XML received by the server
	function HttpResponseIsValid(response, error_handler)
	{

		// Did we get valid XML in our response?
		var status = response.GetField("status");
		if(status == null)
		{
			// Probably a PHP error - somehow, we didn't get valid XML back.
			alert("Server error.  Please wait a moment and try again.");

			// If we're on staging, be a pal and display the error here
			if(IsStaging())
			{
				alert(response.ToString());
			}

			if(error_handler != null)
			{
				error_handler();
			}

			return(false);
		}

		// We have valid XML.  What's our status?
		if(status == STATUS_ERROR)
		{
			// Application error.
			alert("Error - " + response.GetField("errormsg"));

			if(error_handler != null)
			{
				// errorcode will be null if there is none
				error_handler(response.GetField("errorcode"), response.GetLinkedObject());
			}

			return(false);
		}
		else if(status == STATUS_ERROR_SILENT)
		{
			// Just return false, don't do any error displaying
			return(false);
		}

		return(true);
	}

	function IsStaging()
	{
		return(window.location.href.indexOf("staging.newgrounds.com") >= 0 || window.location.href.indexOf("ng-local.newgrounds.com") >= 0);
	}

	// PRIVATE - utility function to see if an associative array's empty or not
	function AssociativeArrayIsEmpty(arr)
	{
		for (var key in arr)
		{
			if(typeof arr[key] != "function")	// This is to combat the stuff Prototype adds
			{
				// If there's one thing here, it's not empty
				return(false);
			}
		}

		return(true);
	}

	// PRIVATE - an improved version of escape() for sending our data across
	function URLEscape(text)
	{
		text = escape(text);
		text = text.replace(/\+/g, "%2B");		// Normal escape() ignores plus signs.
		return(text);
	}
	
	// This object represents the JSON response we'll get back from the server
	function JSONResponse(http_response, linked)
	{
		// Use this as a shortcut - it'll remember if it's validated or not, after the first test
		var validated = null;
		
		var json_object = null;
		
		if (http_response.responseText.isJSON()) {
			var json_object = http_response.responseText.evalJSON();
		} else {
			var json_object = null;
		}

		this.GetLinkedObject = function()
		{
			return(linked);
		}
		
		// Use this to get the value of a field that only appears once in the response
		this.GetField = function(fieldname)
		{
			var field = null;
			if(ResponseIsValid())
			{
				if (json_object && json_object[fieldname] != undefined) {
					return (json_object[fieldname]);
				}
			}

			return (null);
		}
		
		this.GetObject = function()
		{
			return (json_object);
		}

		// Checks the basic integrity of the DOM in the http_response object
		function ResponseIsValid()
		{
			// This keeps us from doing the tests below repeatedly
			if(validated == null && (http_response) && (json_object))
			{
				validated = true;
			}

			return(validated);
		}

		// Useful for debugging
		this.ToString = function()
		{
			return(http_response.responseText);
		}
	}
	
	// This object represents the XML response we'll get back from the server
	function AjaxResponse(http_response, linked)
	{
	
		// Use this as a shortcut - it'll remember if it's validated or not, after the first test
		var validated = null;
		
		this.GetLinkedObject = function()
		{
			return(linked);
		}
		
		// Use this to get the value of a field that only appears once in the response
		this.GetField = function(fieldname)
		{
			var field = null;
			if(ResponseIsValid())
			{
			
				// Now check for this specific field
				var field_arr = this.GetNodes(fieldname);
				if((field_arr) && (field_arr.length == 1) && (field_arr[0].firstChild) && (field_arr[0].firstChild.data) && (field_arr[0].firstChild.data != ""))
				{
					field = field_arr[0].firstChild.data;
				}
			}

			return(field);
		}

		// This function returns full-fledged DOM nodes
		this.GetNodes = function(nodename)
		{
			var nodes = new Array();
			if(ResponseIsValid())
			{
				nodes = http_response.responseXML.documentElement.getElementsByTagName(nodename);
			}

			return(nodes);
		}

		// Checks the basic integrity of the DOM in the http_response object
		function ResponseIsValid()
		{
			return(true);
		}

		// Useful for debugging
		this.ToString = function()
		{
			return(http_response.responseText);
		}
	}
}


// --- Chars Remaining ---
function CharactersRemaining(textarea, maxnum, remaining_char_count_elem)
{

if (!textarea) {
return;
}

var chars_remaining = maxnum - textarea.value.length;
//alert(chars_remaining)
if(chars_remaining < 0)
{
textarea.value = textarea.value.substring(0, maxnum);
chars_remaining = 0;
}

if (!remaining_char_count_elem) {
remaining_char_count_elem = document.getElementById(textarea.id + "_chars_remaining");
}
if(textarea.value.match(/(^|\n): .*/gi)){
var quote = textarea.value.match(/(^|\n): .*/gi)
var quoten = quote.length
var quotel = quote.join("").length-(2*(quoten))
var quotep = (quotel/textarea.value.length)*100
document.getElementById("body_quote_remaining").innerHTML = quotep.toFixed(0)+"%"
}else{
document.getElementById("body_quote_remaining").innerHTML = "0%"
}
remaining_char_count_elem.innerHTML = FormatNumber(chars_remaining);
}

// Like above, but we have to have _chars_remaining_minus_html
function CharactersRemainingMinusHTML(textarea, maxnum, maxnumminushtml)
{
 CharactersRemaining(textarea, maxnumminushtml);

 var chars_remaining = maxnum - textarea.value.replace(/<\/?(a|i(ns)?|b|u|em|strong).*?>/ig, '').length;
 if(chars_remaining < 0)
 {
chars_remaining = 0;
 }

 document.getElementById(textarea.id + "_chars_remaining_minus_html").innerHTML = FormatNumber(chars_remaining);
}

// Use this to kick off our chars remaining stuff. Recalculating on each keypress is too intensive.
var chars_remaining_timeouts = new Array();
function CheckCharsRemaining(id, max_chars, max_chars_minus_html)
{

 if(max_chars_minus_html > 0)
{
 CharactersRemainingMinusHTML(document.getElementById(id), max_chars, max_chars_minus_html);
 }
 else
 {
 CharactersRemaining(document.getElementById(id), max_chars);
 }


}

function CheckCharsRemainingInElem(id_or_elem, max_chars, max_chars_minus_html, remaining_char_count_elem)
{
 var elem = $(id_or_elem);
 var check_chars;

if (max_chars_minus_html > 0) {
 check_chars = function () {
 CharactersRemainingMinusHTML(elem, max_chars, max_chars_minus_html);
 };
 } else {
 check_chars = function () {
 CharactersRemaining(elem, max_chars, remaining_char_count_elem, remaining_char_count_elem);
 };
 }

 check_chars();
 chars_remaining_timeouts[elem.identify()] = setInterval(check_chars, 1500);
}

function StopCharsRemaining(id)
{
clearTimeout(chars_remaining_timeouts[id]);
} 

function FormatNumber(num)
{
 num = num.toString();
var len = num.length;

if(len <= 3)
{
return(num);
}
else if(len <= 6)
{
return(num.substring(0, len - 3) + "," + num.substring(len - 3, len));
}
else if(len <= 9)
{
return(num.substring(0, len - 6) + "," + num.substring(len - 6, len - 3) + "," + num.substring(len - 3, len));
}
 else if(len <= 12)
 {
 return(num.substring(0, len - 9) + "," + num.substring(len - 9, len - 6) + "," + num.substring(len - 6, len - 3) + "," + num.substring(len - 3, len));
 }
 else // We can only handle numbers up to 999,999,999,999
 {
 return(-1);
 }
} 

function ClearTextArea(textarea, maxnum, maxnumminushtml)
{
if(confirm("Are you sure you want to clear this textarea?"))
{
document.getElementById(textarea).value = "";
if(typeof maxnumminushtml != "undefined")
{
CharactersRemainingMinusHTML(textarea, maxnum, maxnumminushtml);
}else{
CharactersRemaining(textarea, maxnum);
}
}
} 

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_152', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_152', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=152&version=1.04';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();