// ==UserScript==
// @name           VN Ghetto Quote 2
// @namespace      sd.vn
// @description    Lets non-insiders use quotes
// @include        http://vnboards.ign.com/PostForms/*
// ==/UserScript==

/* 
By Arc_DT of AC Friends. Come visit us. You can't be any worse than the people we already have.

I have a fairly unique name, so I don't like to toss it around casually. In case I'd ever need to prove this was my work,
here's a Sha1 hash of my full name:

199ff211819355809c2df61565412c63c13a774e
*/

//2009-02-07: Fixed a bug that eats the first character after replacing a [/qoute] tag


window.addEventListener("load",function(e){
// Initial width and change in size of the dashes
	var dashLength=70,indent=6,dashStep=4;

// See if we have the required page layout
	var textareas=document.getElementsByTagName('textarea');
	if(!textareas.length)return;
	textareas[0].style.fontFamily='verdana,sans-serif';

// Initialize variables
	var testDashes='';
	for(var i=0;i<dashStep;i++)testDashes+='_';
	var ghettoExp=new RegExp('__\\{(.*)\\}'+testDashes);
	var post=textareas[0].value,scanPosition=0,names=[],nameLevel=0;

// Step through the quoted post by what's found first: start/end standard/ghetto quotes
	while(scanPosition<post.length){
		var nextStart=post.indexOf('[quote=',scanPosition);if(nextStart==-1)nextStart=post.length;
		var nextEnd=post.indexOf('[/quote]',scanPosition);if(nextEnd==-1)nextEnd=post.length;
		var nextGhetto=post.indexOf('__{',scanPosition);if(nextGhetto==-1)nextGhetto=post.length;

// Start standard quote
		if(nextStart<nextEnd && nextStart<nextGhetto){
			var endBracket=post.indexOf(']',nextStart);
			if(endBracket==-1)endBracket=post.length;
			var name=post.substring(nextStart+('[quote=').length,endBracket);
			names[nameLevel++]=name;
			var dashes='_';
			for(i=0;i<dashLength-name.length;i++)dashes+='_';
			post=post.substring(0,nextStart)+'\n__{'+name+'}'+dashes+'\n\n'+post.substring(endBracket+1);
			dashLength-=dashStep;
			scanPosition=endBracket+10;
			}

// End standard quote
		else if(nextEnd<nextStart && nextEnd<nextGhetto){
			dashLength+=dashStep;
			name=names[--nameLevel];
			var dashes='';
			for(i=0;i<dashLength-name.length;i++)dashes+='_';
			post=post.substring(0,nextEnd)+'\n\n__{/'+name+'}'+dashes+'\n\n'+post.substring(nextEnd+('[/quote]').length);
			scanPosition=nextEnd+(dashes+'{/'+name+'}__\n\n').length+2;
			}

// Fix existing ghetto length
		else if(nextGhetto<nextStart && nextGhetto<nextEnd){
			for(i=0;i<nameLevel;i++)post=post.substring(0,nextGhetto-2)+post.substring(nextGhetto-2).replace(ghettoExp,'__{$1}');
			scanPosition=nextGhetto+10;
			}

// All equal means none remain unhandled
		else
			scanPosition=post.length;
		}// End main loop

// Respace bracketed items to prevent "eaten" quotes
	post=post.replace(/\[([^ ])/g,'[ $1').replace(/([^ ])\]/g,'$1 ]');

// Unwrap text
	var maxline=dashLength+indent;
	var paragraphs=post.split('\r\n');
	if(paragraphs.length==1)paragraphs=post.split('\n');
	for(i=0;i<paragraphs.length;i++)if(!paragraphs[i].match(String.fromCharCode(160))&&paragraphs[i].match(/ /)){
		var words=paragraphs[i].split(' '),line=words[0];
		for(var j=1;j<words.length;j++){
			if((line+words[j]).length>maxline){
				for(var k=paragraphs.length;k>i;k--)paragraphs[k]=paragraphs[k-1];
				for(var k=0;k<j;k++)words.shift();
				paragraphs[i+1]=words.join(' ');
				paragraphs[i]=line;
				break;
				}
			else line+=' '+words[j];
			}
		}
	post=paragraphs.join('\n');
	var indentLevel=0,lines=post.split('\n');
	for(i=0;i<lines.length;i++){
		var lead='',indentSteps=indentLevel;
		if(lines[i].match(/^\_+\{/)){
			if(lines[i].match(/^\_+\{\/./)){indentLevel--;}
			else{indentLevel++;indentSteps++;}
			}
		for(var j=0;j<indentSteps*indent;j++)lead+=String.fromCharCode(160);
		lines[i]=lead+lines[i];
		}
	post=lines.join('\n');
	
	textareas[0].value=post;
	},false);

