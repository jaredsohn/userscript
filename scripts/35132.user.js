// ==UserScript==
// @name           Eric Lippert's Fabulous Adventures in Coding Reformatted
// @description    Make Eric Lippert's blog (http://blogs.msdn.com/ericlippert/) look like Jeff Atwood's Coding Horror (http://www.codinghorror.com/blog/). See also: http://www.codinghorror.com/blog/archives/000750.html
// @namespace      http://userscripts.org
// @include        http://blogs.msdn.com/ericlippert/*
// ==/UserScript==

//add dateline
var datelines = document.getElementsByClassName("BlogPostFooter");
for(var i = 0; i < datelines.length; i++)
{
	var post = datelines[i].parentNode.tagName == "DIV" ? datelines[i].parentNode : datelines[i].parentNode.parentNode.parentNode.parentNode.parentNode;
	var matches = datelines[i].innerHTML.match(/\w+ \d{1,2}, \d{4}/);
	post.innerHTML = "<h2 class='date'>" + matches[0] + "</h2>" + post.innerHTML;
}

//remove empty paragraphs
var paragraphs = document.getElementsByTagName("p");
for(var i = 0; i < paragraphs.length; i++)
{
	if(paragraphs[i].innerHTML == "&nbsp;" || paragraphs[i].innerHTML.length == 0)
	{
		paragraphs[i].parentNode.removeChild(paragraphs[i]);
		i--;
	}
}

//add a class to comments by the author himself
var links = document.evaluate("//h4[contains(@class, 'CommentTitle')]/a[.='Eric Lippert']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; i++) 
  links.snapshotItem(i).parentNode.parentNode.className += " byAuthor";
  
//change the class of code spans containing <p>s or <br>s
var codeBlocks = document.evaluate("//span[contains(@class, 'code') and (p or br)]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < codeBlocks.snapshotLength; i++)
		codeBlocks.snapshotItem(i).className = "codeBlock";
	
//remove <font> tags
var fonts = document.getElementsByTagName('font');
while(fonts.length > 0)
{
  var span = document.createElement('span');
  span.innerHTML = fonts[0].innerHTML;
  fonts[0].parentNode.replaceChild(span,fonts[0]);
}

//remove style attributes from <span> tags
var spans = document.getElementsByTagName('span');
for(var i = 0; i < spans.length; i++)
{
	spans[i].style.fontFamily = "";
	spans[i].style.fontSize = "";
	spans[i].style.color = "";
}

//apply css
var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = "\
*,.mine,.CommonSubTitle,#comments > h3                            {font-family:calibri,tahoma,arial,sans-serif;color:#000}\
body                                                              {background-color:white}\
a,a:link                                                          {color:rgb(0,102,204);text-decoration:none}\
a:hover                                                           {color:rgb(17,68,119);text-decoration:underline}\
a:visited                                                         {color:rgb(162,66,124)}\
p,li,div,#CommonCommentForm,.CommentTitle,.BlogPostFooter,\
.CommonSinglePager,.mine,.CommonSubTitle,.lnk3                    {font-size:10.5pt}\
h4                                                                {margin-bottom: 3px;}\
td,.CommonSidebarArea,#CommonRightColumn,.BlogPostArea            {border:0}\
.CommonSidebarHeader,.BlogPostHeader,.BlogPostHeader a,\
.BlogPostHeader a:visited,#comments > h3                          {color:#666}\
blockquote,.spec,.CommentContent,#CommonCommentForm               {color:#333}\
.BlogPostContent,.mine,.CommentText                               {line-height:140%}\
.CommonContentArea h2 + .CommonContent + .CommonContent           {margin-left:182px;margin-right:200px;margin-top:44px}\
#CommonFooter,#TagSideBar,#ArchiveSideBar,.CommentAvatar,\
#CommonLeftColumn,#CommonHeader,#CommonCommentForm h3,\
#postToolbar,.CommonRateControlReadOnly                           {display:none}\
.CommonContent > h2.CommonSubTitle                                {margin-top:75px}\
\
/*Fabulous Adventures in Coding*/\
.CommonTitle a,.CommonTitle a:visited,.CommonTitle a:hover        {text-decoration:none;color:#000}\
.CommonTitle                                                      {position:absolute;left:8px;top:7px;font-size:30pt;\
                                                                   font-weight:900;height:70px;padding-left:150px;margin-top:0;\
                                                                   background: url(/Themes/default/msdn_masthead_ltr.gif) no-repeat 0 10px}\
/*Eric Lippert's Blog*/\
.CommonContentArea h2 + .CommonContent                            {position:absolute;left:8px;top:50px;padding-left: 152px;font-size:11pt}\
\
/*post date, title, contents*/\
.date                                                             {margin-bottom: -10px;font-size:16pt}\
.BlogPostHeader a                                                 {margin-top: 15px}\
.BlogPostHeader,.BlogPostHeader a,.BlogPostHeader a:visited       {font-size:14pt}\
.spec,blockquote                                                  {background:#F5F5F5;margin:0 auto;padding:0px 5px;display:block}\
.code                                                             {font-family:monospace;color:#000}\
.codeBlock,.codeBlock p                                           {font-family:monospace;line-height:100%;color:#000}\
.codeBlock                                                        {display:block;margin:5px;padding:0 5px;overflow:auto;width:95%;\
                                                                   max-height:450px;margin:0 auto;line-height:100%;border:silver 2px dotted}\
\
/*right column goes on the left*/\
#CommonRightColumn                                                {position:absolute;left:10px;width:170px;margin-top:110px}\
.CommonSidebarHeader                                              {padding-bottom:3px}\
#CommonRightColumn,.CommonSidebarHeader                           {background-color:#fff}\
\
/*comments*/\
#comments > h3                                                    {font-size:10.5pt}\
#comments table                                                   {border-spacing:0 10px}\
.CommentTitle                                                     {font-weight:normal;margin-bottom:10px;margin-top:5px}\
.CommentContent,#CommonCommentForm                                {background-color:#f5f5f5;padding:5px 5px 15px 10px}\
.byAuthor, .yellowbox                                             {background-color:rgb(255,236,199)}\
.yellowbox                                                        {padding-left: 5px}\
.byAuthor .yellowbox                                              {border: none; padding: 0; margin: 0}\
.CommentFooter                                                    {margin-top:10px}\
#CommonCommentForm .smallbox,#CommonCommentForm textarea          {border:1px solid rgb(167,166,170)}\
";
document.getElementsByTagName("head")[0].appendChild(style);