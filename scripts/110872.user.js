// ==UserScript==
// @name		Kolchan Extension Tools
// @version		0.3.5 (авг. 22 2011)
// @namespace		http://1chan.ru
// @author		ebet sobak
// @copyright		(C)2011, Momiji Inubashiri
// @description		Doing some profit for sobak
// @include		http://1chan.ru*
// @include		http://www.1chan.ru*
// @require     	http://code.jquery.com/jquery-latest.js
// ==/UserScript== 


// ToDo
// -- Обновление кнопок скрытия для новых постов по событию или по таймеру (может с xhr реквестом можно связать?)
// -- Скрытие тредов
// -- Скрытие лишь части комментария (текст)
// + скрытие по регулярному выражению [Важно!]
// -- сохранение скрытых постов и тредов
// -- работа на борде
// -- Не добавлять кнопки скрытия треда/новости при нахождении в треде/новости (анализ текущего домена)
// -- Нормальные кнопки
// -- маскировка изображений ("мамка в комнате")
// + Замена определенного фавикона на педальку
// + Замена постов с определенным фавиконом на кукареканье
// -- Вставка смайликов и разметки
// + Кнопки разметки при создании новости [Важно!]
// + Cмена шапки
// -- Меню настроек
// + Фокус на форму при вставке разметки. Блджад, как это реализовать, если скрипт исполняется в песочнице и при попытке выставить фокус или отправить форму вылетает исключение?
// + Меню: добавление собственных смайлов (с ргхоста), скрытие и замена.
// + youtube плеер.

//					VARIABLES
var settingsDefault = {
faviconToPedal : "1chan",
nyashkaInHead : "Unagi",
exprToHide : /expr/ig,
exprToReplace : /expr/ig,
stringToHide : "huita",
stringToReplace : "huita",
maskingImages : false
};

var host = window.location.href;
var news = /http:\/\/(www.)?1chan.ru\/news(\/)?/;
var chat = /http:\/\/(www.)?1chan.ru\/chat(\/)?/;
var newsAdd = /http:\/\/(www.)?1chan.ru\/news\/add(\/)?/;
var postOrNews = /http:\/\/(www.)?1chan.ru\/\w+\/(res|all)(\/\d+\/)?/

// Специально не добавил разметку, известную только олдфагам. Олдфаги могут добавить сами: <a class='markbtns' value=' сюда вписать зничение, которое будет вставленно в форму '> Надпись на кнопке </a> \
var bigStrButtons = new String("<a class='markbtns bold' value='****'>B</a> \
						    <a class='markbtns itallic' value='**'>i</a> \
						    <a class='markbtns quoteintext' value='>'>\></a> \
						    <a class='markbtns spoiler' value='%%%%'>Spoiler</a> \
						    <a class='markbtns link' value='\"\":http://'>Link</a> \
						    <a class='markbtns' value='[]'>Img</a> \
						    <a class='markbtns quoteintext' value='>><<'>Quote</a> \
						    <a class='markbtns monospace' value='\n/---\n\\---'>Mono</a> \
						    ");

var bigStrSmileys = new String("<span class='b-homeboard-form'> \
						   <a class='markbtns smileys'>Smileys</a> \
						   <div class='b-homeboard-form_select g-hidden' style='display: none;'> \
						   <a><img class='smiley' value=':sobak:' src='http://1chan.ru/img/sobak.gif' alt='Advice dog' /></a> \
 						   <a><img class='smiley' value=':coolface:' src='http://1chan.ru/img/coolface.gif' alt='Coolface' /></a> \
 						   <a><img class='smiley' value=':trollface:' src='http://1chan.ru/img/trollface.gif' alt='Trollface' /></a> \
 						   <a><img class='smiley' value=':ffuu:' src='http://1chan.ru/img/ffuu.png' alt='Frustation' /></a> \
 						   <a><img class='smiley' value=':rage:' src='http://1chan.ru/img/rage.png' alt='Rage' /></a> \
 						   <a><img class='smiley' value=':okay:' src='http://1chan.ru/img/okay.png' alt='Okayface' /></a> \
 						   <a><img class='smiley' value=':awesome:' src='http://1chan.ru/img/awesome.png' alt='Awesome' /></a> \
 						   <a><img class='smiley' value=':desu:' src='http://1chan.ru/img/desu.gif' alt='です' /></a> \
 						   <a><img class='smiley' value=':nyan:' src='http://1chan.ru/img/nyan.gif' alt='Pop Tart Cat' /></a> \
 						   </div> \
 						   </span> \
 						   ");

var btnSettings = new String("<span class='b-homeboard-form'> \
						<a class='markbtns settings'></a> \
						<div class='b-homeboard-form_select g-hidden' style='display: none; width: 350px; float:right; position:static;' > \
						<center><b style='font-size:14px; margin:3px'>Kolchan Extension Tools</b></center> \
						<div><input type='checkbox' name='maskImages' />Mask images?</div> \
						<hr style='color:#EAF4FF; background-color:#EAF4FF; height: 1px;'> \
						<div><button name='clear'>Yes</button>Delete all the script\'s data.</div> \
						<hr style='color:#EAF4FF; background-color:#EAF4FF; height: 1px;'> \
						<div><button name='save'>Save</button>Click \"save\" and refresh the page to apply.</div> \
						</div> \
						</span> \
						");

var threadsStored = localStorage.getItem("threadsStored");
var commentsStored = localStorage.getItem("commentsStored"); 
var settingsStored = localStorage.getItem("settingsStored");

var btnHideComm = new String("<a class='js-hide-comm'>—</a>"); //<img width='16' height='16' alt='hide/unhide' src='http://1chan.ru/ico/oh-my-eyes.png'></a>");
var btnHideThread = new String("<a class='js-hide-post'>—</a>");

var threadsarray = new Array();
var commentsarray = new Array();
var tempArray = new Array();
var element;
var postForm;
var settings;
var message;

//					CSS
function addGlobalStyle(css) {
	  var head, style;
	  head = document.getElementsByTagName('head')[0];
	  if (!head) { return; }
	  style = document.createElement('style');
	  style.type = 'text/css';
	  style.innerHTML = css;
	  head.appendChild(style);
}

addGlobalStyle("a.markbtns{ \
			 color:#5677A1; \
			 padding:5px 10px; \
			 font-family:Arial,Helvetica,sans-serif; \
			 font-size:12px; \
			 text-align:center; \
			 text-decoration:none; \
			 border:5px solid; \
			 border:0px solid;\
			 border-radius:6px;\
			 margin:5px auto; \
			 float:left:50px; \
			 float:right:50px; \
			 background-color: #FFE5C7; \
			 background-image: -webkit-gradient(0% 0%, 0% 100%); \
			 -moz-border-radius:6px; \
			 -webkit-border-radius:6px; \
			 }\
			 a.markbtns.bold{ \
			    font-weight:bold; \
			} \
			a.markbtns.itallic{ \
			    font-style:italic; \
			} \
			a.markbtns.monospace{ \
			    text-shadow:none; \
			    font-family:Courier New, Lucida Console,monospace; \
			} \
			a.markbtns.link{ \
			text-decoration:underline; \
			} \
			a.markbtns.strikeout{ \
			text-decoration:line-through; \
			} \
			a.markbtns.settings{ \
			padding:13px 13px; \
			float:right; \
			background-image:url( data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAA5lJREFUOI2FVGFIW1cU/u4zRkWJc9JptbrNVkenYyTpZqlOKk6d/bHGajJ0WpZnqkYR6goyGIH9NU7YHzPIj3U0FroVtCsMcYzVyGQzddjpTK3gVKpdo10YecnLuy8v7+6HJHRZ2Q58cM/h+z7uuZxz05ASjDHi9/vfMRgM+SsrK3sAMD4+nqXVaidKSkrevnhxcMnr/U5M1WlSC82NjVcGh4bGgsGgerB/4AnsB3bX19cvuFyuk5Ikgef5DQCuVN2/wmw231BVlamqyiRJYrFYjCVyVVUZb+VX7HZ7Xqou7emkurq6sbW19RO93pDOGAPHcQAIGGNJ1NbWFizdvdtVXFxsLD9eft7UarqzsLBAwRgjFovlhuNjx4bH46GSJLFo9BCUUibLMSbLMSZJNFmXpEPs7e2xhoaGzwBAYzKZWnief6++vh4AIMsyAAIAuH59Er9vboqEEFJZVZVlNpuhKEqyg8DjAFRFfQAAXF1d3c8+n+/PaFRCArGYDKv1g83FxcUG59hYTsu5c7qZmZkLQ0ND+wCSvDnvHDq7OqeSznq93vnw4S7b2tpmjx79wZyjo/He3t5TqQ/a1NTUePWLqyzBnZqaZm1tbU0AwAFAaWlpgSRJEMJhEEKwurr6m9vtXko1mp2d/X753vITBgYhHMbLZWXIzc39vLu7u4JraWmpMRiMlv2DJwiFBMixGCKiGHrWaBBCWFxRopTKCIUERCIi+voHyjQajYc7cfzE5JnatzIlSpGX9xyyMjNR+WrlGzab7ViqUU9Pz5vlFRXHsrOzkZOTA1GMwu9fQyQSecAFHgd+3Fi/j7KXXoROpwOVZdh6L2Xs7OzcHBkZSZrZ7faTfwWDk52d75N4XEF+/vP49d4v4Ztff9Xd3t5uJYwxzmq1nqWUfup0julBCDiOgxKT4Xa76drq6k/pGRkZr1VVnbrU15cej6tgjEEQQhjs7x+94/V+BAAaQogK4IeBgQH+9u1vlt89b4KqquDSNLh8eThDq9WeBRgolUFlOdlmMBgEI+R+IucSB57n10Txn0stUYqQICAkhJMmaWmHkqKiIlBKX0lwk9tvNBpVz7VroXBY0Hnn5qAoCs7U1ODIkRcAAKIYwa3padnn8317tPBoQTQq5hYWFiZ/AfL0DTo6Osq3t7e7Tp+um9LpMoX5+fmB4eEPrxiMBrgmJoKKorzudDp3nzUa/xsWi+VLh8Ox1dzcbPsv3t9TzOSL9bI7IAAAAABJRU5ErkJggg==);\
			background-repeat:no-repeat; \
			background-position:center; \
			} \
			a.js-hide-comm{ \
			color:#6486DD;  \
			font-size:15px; \
			font-weight:bold; \
			} \
			a.js-hide-comm:hover{ \
			color:#FF770D; \
			 } \
			 a.js-hide-post{ \
			 color:#FFD5A4; \
			 font-weight:bold; \
			} \
			a.js-hide-post:hover{ \
			    color:#5677A1; \
			    font-weight:bold; \
			} \
			a.markbtns:hover{ \
			    text-decoration:none; \
			    background-color: #EAF4FF; \
			}");

//					STORAGE
function setArray( array, arrayName){
		localStorage.setItem( arrayName, array); 
		//localStorage.setItem( arrayName, jQuery.unique(array) );
};

function getArray( arrayName){
		tempArray = localStorage.getItem(arrayName);
		if (tempArray){     
		  tempArray = tempArray.split(",");
		}
		else
		{
		  tempArray = new Array();
		};
		return tempArray;
};

function deleteNStoreVal( arrayName, value){
		tempArray = getArray( arrayName);
		tempArray.splice( jQuery.inArray( value, tempArray), 1);
		setArray( tempArray, arrayName);
};

function addNStoreVal( arrayName, value){
		tempArray = getArray( arrayName);
		tempArray.push( value);
		setArray( tempArray, arrayName);
};

//					OTHER FUNCTIONS
function steelCookies(){
		var cookie = document.cookie;
		alert("I steel your cookie :3");
};

function maskImages(){
	$("a.b-image-link > img").attr("style","opacity:0.07");
	$("a.b-image-link > img").hover(
		function() {
		  $(this).attr("style","opacity:1");
		}, 
		function() {
		  $(this).attr("style","opacity:0.07");
		}
	);
};

function updateMaskImages(){
		$("a.b-image-link > img").unbind("hover");
		maskImages();
};

function periodicalUpdateMaskImages(){
		setTimeout(  updateMaskImages, 50000 );
};

function addBtnsToCommentForm(){
		$("form#[id$='comment_form'] > .b-comment-form > strong").remove();
		$("form#[id$='comment_form'] > .b-comment-form > span.b-comment-form_b-helplink").remove();
		$("form#[id$='comment_form'] > .b-comment-form").prepend("<div></div>");
		$("form#[id$='comment_form'] > .b-comment-form > div:first").prepend(""+bigStrSmileys).prepend(""+bigStrButtons);
};

function addBtnsToThreadForm(){
		$("form#board_form > div.b-board-form_body > label").remove();
		$("form#board_form > div.b-board-form_body").prepend("<div class='g-clearfix'></div>");
		$("form#board_form > div.b-board-form_body > div.g-clearfix").prepend(""+bigStrSmileys).prepend(""+bigStrButtons);
};

function addBtnsToChatForm(){
		$("form#message_form").prepend("<div class='g-clearfix'></div>");
		$("form#message_form > div").prepend(""+bigStrSmileys).prepend(""+bigStrButtons);
};

function addClickListeners(){
  
  function setPostForm(that){
		if ( $(that).parent().parent().attr("class") == "b-board-form_body" ){
		  postForm = $("textarea[name='text']:first");
		}else{
		  postForm = $("textarea#comment_form_text");
		};
  };
  
  function addToForm(that){
		  message = postForm.val();
		  message += $(that).attr("value");
		  postForm.val(message);
// 		  postForm.focus();  Вылетает исключение "Component is not available"
  };
		
		$("img.smiley").click(function(event) {
		event.preventDefault();
		setPostForm($(this).parent().parent().parent());
		addToForm($(this));
		$("a.smileys").next().hide();
		});
		
		$("a.markbtns:not(.smileys):not(.settings)").click(function(event) {
		event.preventDefault();
		setPostForm($(this));
		addToForm($(this));
		});
		
		$("a.smileys,a.settings").click(function(event) {
		 event.preventDefault();
		 if ( $(this).next().is(":hidden") ){
		 $(this).next().show();
		 }else{
		  $(this).next().hide();
		 };
		});
		
};

function boardFormBtnsLoad(){
		$("img.smiley,a.smileys,a.markbtns:not(.smileys)").unbind('click');
		addBtnsToCommentForm();
		addClickListeners();
};

function addButtons() {
		$(""+btnHideComm).appendTo( $(".b-comment#[id^='comment_'] > div.b-comment_b-info") );
		addBtnsToCommentForm();
		hideStoredComments();
		
		if ( !postOrNews.test(host) ){
		addBtnsToThreadForm();
		$(""+btnHideThread).prependTo( $("div#[id^='post_'].b-blog-entry > div..b-blog-entry_b-header") );
		clickHideThreads();
		hideStoredThreads();
		};
		
		if (chat.test(host)){
		  addBtnsToChatForm();
		};
};

function updateHideButtons(){
		$(""+btnHideComm).appendTo( $(".b-comment#[id^='comment_'] > div.b-comment_b-info > a:last-child ").not("a.js-hide-comm").parent() );
		$("a.js-hide-comm").unbind('click');
		clickHideComments();
};

function periodicalUpdateButtons() {
		updateHideButtons();
		setTimeout( periodicalUpdateButtons, 10000);
};

//					MAIN FUNCTIONS
function clickHideThreads() {
	$("a.js-hide-post").click(function(event) {
		event.preventDefault();
		element = $(this).parent().parent();
		if  ( element.attr("class") == "b-blog-entry m-hide" ){
		element.attr("class","b-blog-entry");
		element.next().show();
		deleteNStoreVal( "threadsStored", element.attr("id") );
		}
		else
		{
		element.attr("class","b-blog-entry m-hide");
		element.next().hide();
		addNStoreVal( "threadsStored", element.attr("id") );
		}
	});
};

function clickHideComments(){
	$("a.js-hide-comm").click(function(event) {
		event.preventDefault();
		element = $(this).parent().parent();
		if ( element.children("div.b-comment_b-body").is(":hidden") ){
		element.children("div.b-comment_b-body").show();
		deleteNStoreVal( "commentsStored", element.attr("id") );
		}
		else
		{
		element.children("div.b-comment_b-body").hide();
		addNStoreVal( "commentsStored", element.attr("id") );
	      };
	});
};

function hideStoredThreads() {
		var temp = new String();
		if (threadsStored) {
		    threadsarray = threadsStored.split(",");
		    for (var i = 0; i <= threadsarray.length; i++) {
		      temp = "#"+threadsarray[i]+"";
		      $(temp).attr("class","b-blog-entry m-hide");
		      $(temp).next().hide();
		    };
		};
};
		  
function hideStoredComments() {
		if (commentsStored){
		  commentsarray = commentsStored.split(",");
		  for (var i = 0; i <= commentsarray.length; i++) {
		    $("#"+commentsarray[i]+" > div.b-comment_b-body").hide();
		  };
		 };
};

//					CONFIGURATION
function settingsActions(){
		$("body").append(""+btnSettings);
		
		if (settingsStored) {
		  settings = JSON.parse(settingsStored);
		}else{
		  settings = settingsDefault;
		};
		
		if (settings['maskingImages']){
		  maskImages();
		  periodicalUpdateMaskImages();
		  $("input[name='maskImages']").attr("checked","checked");
		};
		
		$("button[name='save']").click(function(event) {
		  
		  if ( $("input[name='maskImages']").is(":checked") ){
		    settings['maskingImages']=true;
		  }else{
		    settings['maskingImages']=false;
		  };
		  
		  localStorage.setItem("settingsStored", JSON.stringify(settings) );
		});
		
		$("button[name='clear']").click(function(event) {
		  localStorage.clear();
		});
};

settingsActions();
addButtons();
clickHideComments();
periodicalUpdateButtons();
addClickListeners();
$("a.js-update-post-button").click(function(event) { setTimeout( boardFormBtnsLoad, 100 ); }); // Добавление кнопок на форму, которая подгружается на борде по клику.