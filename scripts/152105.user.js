// ==UserScript==
// @name        originaltrilogy.com forum light theme
// @namespace   box
// @description A black text on white background theme
// @include     http://originaltrilogy.com/forum/*
// @include     https://originaltrilogy.com/forum/*
// @version     1.31
// ==/UserScript==
var newStyle = document.createElement('style');
newStyle.type = 'text/css';
newStyle.innerHTML = '\
a,\
body.Page,\
body.Page blockquote,\
body.Page blockquote blockquote,\
body.mceContentBody blockquote blockquote,\
body.mceContentBody blockquote,\
body.Page blockquote,\
body.mceContentBody blockquote,\
h1.Header,\
h1.Header a,\
h1.HeaderRightContent,\
h1.HeaderRightContent a,\
h2.Header,\
h2.Header a,\
h2.ListHeader,\
p.TopicAuthor a,\
p.DraftPostAuthor a,\
p.BookmarkPostAuthor a,\
p.PMAuthor a,\
p.SubcategoryDescription,\
span.CurrentPage,\
span.PostAuthorTitle,\
span.PMAuthorTitle,\
ul.ForumActions,\
ul.MainNav,\
ul.MainNav li a,\
ul.MainNav li.Active a,\
ul.MainNav li.Current a,\
ul.MainNav li ul.Secondary,\
ul.MainNav li ul.Secondary li a.Active,\
ul.TopicActions,\
ul.PMFolderActions,\
#Footer,\
#LoginStatus,\
#LoginStatusContentIn a,\
#LoginStatusContentIn a.PrivateMessageNotice,\
#LoginStatusContentOut a,\
#PageContent,\
.BookmarkPostDetails,\
.BookmarkPostInfo,\
.DraftPostDetails,\
.DraftPostInfo,\
.FirstPost,\
.FirstPost .PostTitle,\
.FirstPost .PostActions,\
.FirstPost .PostSignature,\
.FormBox,\
.ForumDetails,\
.ForumInfo,\
.ListBox,\
.PaginationContentEnd a,\
.PaginationContent a,\
.PM .PMTitle,\
.PMDetails,\
.PMInfo,\
.PM .PMActions,\
.PM .PMSignature,\
.PMAuthorActions a,\
.PMContent,\
.PMContent a,\
.PMContent a:hover,\
.PMContent a:visited,\
.PMDate,\
.PMSignature a,\
.PostAuthorActions a,\
.PostAuthorTitle,\
.PostContent,\
.PostContent a,\
.PostContent a:hover,\
.PostContent a:visited,\
.PostDate,\
.PostModifiedNote,\
.PostSignature a,\
.PostTitle,\
.ResponsePost,\
.ResponsePost .PostActions,\
.ResponsePost .PostSignature,\
.ResponsePost .PostTitle,\
.TopicDetails,\
.TopicInfo\
{background-image:none;background-color:white;color:black;}\
\
ul.MainNav li.Active a,\
ul.MainNav li.Current a,\
ul.MainNav li ul.Secondary li a.Active,\
#LoginStatusContentIn a,\
#LoginStatusContentIn a.PrivateMessageNotice\
{ border: 1px solid black;}\
\
#Footer,\
#Footer a,\
#LoginStatus,\
#LoginStatusContentOut a,\
#PageContent,\
#PrimaryContent,\
.BannerAd,\
.Breadcrumbs,\
.Breadcrumbs a,\
.BreadcrumbsAndSearch,\
.InfoBox a,\
.Navigation\
{background-color:whitesmoke;background-image:none;}\
\
#header h1,\
#header ul#primary-nav li a,\
#header ul#primary-nav li a:hover,\
#header ul#primary-nav li.current a,\
.PaginationContentEnd a,\
.Pagination a\
{background-image:none;background-color:whitesmoke;text-indent:0;}'
document.getElementsByTagName('head')[0].appendChild(newStyle);