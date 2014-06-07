// ==UserScript==
// @id             Redirect2archive
// @name           Redirect2archive
// @version        1.0
// @namespace      4chan
// @author         FrozenVoid
// @description    Redirects dead 4chan threads to archive
// @include        https://boards.4chan.org/*
// @include        http://boards.4chan.org/*
// @run-at         document-end
// ==/UserScript==
var t=document.title.toString();var l=document.location.toString()
if(t.search("404 Not Found")!=-1){
if(l.search(/\/g\/|\/sci\/|\/diy\//)!=-1){
document.location=document.location.toString().replace("boards.4chan.org","archive.installgentoo.net").replace("res/","thread/S")}else if(l.search(/\/adv\/|\/hr\/|\/o\/|\/pol\/|\/s4s\/|\/tg\/|\/tv\/|\/x\//)!=-1){

document.location=document.location.toString().replace("boards.4chan.org","archive.4plebs.org").replace("res/","thread/")
}else if (l.search(/\/a\/|\/co\/|\/gd\/|\/jp\/|\/m\/|\/q\/|\/sp\/|\/v\/|\/vg\/|\/vp\/|\/vr\/|\/wsg\//)!=-1){
document.location=document.location.toString().replace("boards.4chan.org","archive.foolz.us").replace("res/","thread/")
}else if(l.search(/\/cgl\/|\/con\/|\/mu\/|\/w\//)!=-1){
document.location=document.location.toString().replace("boards.4chan.org","rbt.asia").replace("res/","thread/")
}else if(l.search(/\/an\/|\/fit\/|\/k\/|\/mlp\/|\/r9k\/|\/toy\//)!=-1){
document.location=document.location.toString().replace("boards.4chan.org","archive.heinessen.com").replace("res/","thread/")
}else if(l.search(/\/3\/|\/ck\/|\/fa\/|\/ic\/|\/lit\//)!=-1){
document.location=document.location.toString().replace("boards.4chan.org","warosu.org").replace("res/","thread/")

}else if (l.search(/\/c\/|\/int\/|\/out\/|\/po\//)!=-1){
document.location=document.location.toString().replace("boards.4chan.org","archive.thedarkcave.org").replace("res/","thread/")
}else if(l.search(/\/d\/|\/i\//)!=-1){
document.location=document.location.toString().replace("boards.4chan.org","loveisover.me").replace("res/","thread/")
}else if (l.search(/\/u\//)!=-1){
document.location=document.location.toString().replace("boards.4chan.org","nsfw.foolz.us").replace("res/","thread/")}

}