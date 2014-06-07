// ==UserScript==
// @id             answers.yahoo.com-b16a5787-c885-4a65-aa30-4a5554d3877e@smk
// @name           Yahoo answers unfix
// @description    Unfixes navbar & headers for yahoo answers
// @namespace      smk
// @include        http://answers.yahoo.com/*
// @run-at         document-end
// ==/UserScript==

function unfixTopNavbar(){
    GM_addStyle(
		'.page-has-scrolled #yucsHead, .page-has-scrolled #uhead {'+
		'	border-bottom: none !important;'+
		'	box-shadow: none !important;'+
		'	background: none !important;'+
		'}'+
		''+
		'#uhead {'+
		'	width: 100%;'+
		'}'+
		''+
		'#yucsHead {'+
		'	position: static !important;'+
		'	width: 100%;'+
		'}'
	)
}

function unfixNavbar(){
    /**
	unfix the "recent, popular navbar"
	*/
    GM_addStyle(
		'#nav.tab-dock, #nav-menu.tab-dock {'+
		'	position: static !important;'+
		'}'+
		'#nav > .sort-filter {'+
		'	margin-top: 0px !important;'+
		'}'
	)

	function connectObserver(observer){
		let node=document.querySelector('#yan-questions');
		if(!node) return;
		node=node.parentNode;
		if(!node) return;
		observer.observe(node, {attributes: true});
	}
	let observer=new MutationObserver(function(mutations){
		observer.disconnect();
		mutations.forEach(function(mutation){
			mutation.target.style.marginTop='auto';
		});
		connectObserver(observer);
	});
	connectObserver(observer);
}

function unfixQuestionNavbar(){
	/**
	unfix the question navbar with the question section and 'Next' link in it
	*/
	GM_addStyle(
		'#ya-cbc.dock-action {'+
		'	background: none !important;'+
		'	box-shadow: none !important;'+
		'}'
	)

	function connectObserver(observer){
		let node=document.querySelector('#ya-cbc');
		if(!node) return;
		node=node.parentNode;
		if(!node) return;
		observer.observe(node, {attributes: true});
	}
	let observer=new MutationObserver(function(mutations){
		observer.disconnect();
		mutations.forEach(function(mutation){
			mutation.target.style.top='auto';
		});
		connectObserver(observer);
	});
	connectObserver(observer);
}

function unfixLeftRail(){
	/**
	unfix the left sidebar
	*/
	GM_addStyle(
		'#left-rail.bottom-fixed {'+
		'   bottom: auto !important'+
		'}'+
		'.top-nav.fixed {'+
		'	position: static !important;'+
		'}'
	)
}

function unfixBodyContainer(){
	function connectObserver(observer){
		let node=document.querySelector('#ya-body-container');
		observer.observe(node, {attributes: true});
	}
	let observer=new MutationObserver(function(mutations){
		observer.disconnect();
		mutations.forEach(function(mutation){
			mutation.target.style.top='auto';
		});
		connectObserver(observer);
	});
	connectObserver(observer);
}

function main(){
	unfixTopNavbar();
	unfixNavbar();
	unfixLeftRail();
	unfixQuestionNavbar();
	unfixBodyContainer();
}

main();
