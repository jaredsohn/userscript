// ==UserScript==
// @name           hai shi bu neng du
// @version 0.2.7
// @uso:version 0.2.7
// @namespace      com.ruocaled.bangumi
// @description    send message to xuejie if checkbox is checked
// @include        */rakuen/topic/group/*
// @include        */group/topic/*
// @include        */group/reply/*/edit
// @include        */ep/*
// @include        */subject/ep/edit_reply/*
// @include        */group/*

// @include        */subject/reply/*/edit
// @include        */subject/topic/*
// @include        */topic/subject/*
// @include        */blog/reply/edit/*


// ==/UserScript==

//
var form = document.getElementById('ReplyForm');
var old_url = form.getAttribute('action');
console.log(old_url);

var tipContainer = document.getElementsByClassName('tip')[document.getElementsByClassName('tip').length - 1];
tipContainer.innerHTML = '发给学姐：';
var checkbox = document.createElement('input');
checkbox.type = 'checkbox';


tipContainer.appendChild(checkbox);

checkbox.onclick = function (){
    if (checkbox.checked) {
        form.setAttribute('action','/subject/topic/892/new_reply')

    }
    else {
        form.setAttribute('action',old_url);

    }
}

