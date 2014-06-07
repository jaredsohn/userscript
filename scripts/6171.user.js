// ==UserScript==
// @name		GoogleTagCloudMaker
// @namespace		http://d.hatena.ne.jp/muddydixon/
// @author		Muddy Dixon <muddydixon@gmail.com>
// @include		http://www.google.*/search*
// @description		Make Tag Cloud from Google search result.
// @version		0.2.0
// ==/UserScript==

// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html

// @data		2006-10-11		This file is created
// @todo					the case search query include "" (quoted words)
// @todo					the case Japanese cannot be used by bwosere.
// @data		2006-10-26		Change below points
//						set navi-bar in tag cloud
//						navi-bar has less than 3 links. (1) backword, (2) clear items, (3) forward.
// @data		2006-11-07		Change below points
//						highlight onmouse keywords in tag cloud
//						clean source file (@getText())
// @data		2007-02-07		Change below points
//						error occurs when kwd is native code of javascript (e.g. pop, push)
//						error occurs when there is not next page
// @data		2007-12-27		Refactoring
// @data		2008-03-14		Treat with Google layout change
var $ = function(elm){return document.getElementById(elm)}
var base = 'http://'+location.host+'/search';
var sq = document.title.replace(/\s+-\s+Google.+$/i, '').split(/\s+/);
var tags = null;

var TagCloud = function(tags){if(tags) this.attachTags(tags)};
TagCloud.prototype = {
    attachTags : function(tags){
	this.tags = tags;
    },
    createTagCloud : function(){
	var maxfontsize = 0;
	for(var word in this.tags)
	    maxfontsize = (maxfontsize > this.tags[word].sum) ? maxfontsize : this.tags[word].sum;
	var cloud = document.createElement('div');
	cloud.id = 'tagCloud';
	for(var word in this.tags)
	    if(this.tags[word].sum > 1){
		var tag = document.createElement('a');
		tag.id = word;		tag.className = 'keyword';
		tag.style.fontSize = Math.floor(this.tags[word].sum / maxfontsize * 12 + 8) + "pt";
		tag.addEventListener('mouseover', this.highLightOn, false);
		tag.addEventListener('mouseout', this.highLightOff, false);
		tag.setAttribute('href', base+'?q='+sq.join('+') + "+" + word);
		tag.innerHTML = word + '(' + this.tags[word].sum + ') ';
		cloud.insertBefore(tag, null);
	    }
	return cloud;
    },
    timeout : null,
    highLightOn : function(evt){
	clearTimeout(this.timeout);
	this.timeout = setTimeout(
	  function(){
	      evt.target.style.color = 'red';
	      var focusedTag = tags[evt.target.id];
	      var ps = $('pnode').getElementsByTagName('div');
	      if(focusedTag){
		  for(var i = 0, l = ps.length; i < l; i++){
		      if(!(ps[i] && ps[i].id && ps[i].id.match(/^p(\d+)$/))) continue;
		      var p_id = ps[i].id.match(/^p(\d+)$/)[1];
		      if(focusedTag[p_id] > 0){
			  if(!ps[i].className.match(/highlight/)){
			      ps[i].className += ' highlight';
			  }
		      }else{
			  ps[i].className = ps[i].className.replace(/\s*highlight/g, '');
		      }
		  }
		  for(var i = 0, l = ps.length; i < l; i++){
		      if(!(ps[i] && ps[i].id && ps[i].id.match(/^p(\d+)$/))) continue;
		      var p_id = ps[i].id.match(/^p(\d+)$/)[1];
		      if(focusedTag[p_id] > 0)
			  $('pnode').insertBefore(ps[i], ($('pnode').firstChild ? $('pnode').firstChild : null));
		  }
	      }else{
		  for(var i = 0, l = ps.length; i < l; i++){
		      if(!(ps[i] && ps[i].id && ps[i].id.match(/^p(\d+)$/))) continue;
		      $('pnode').insertBefore($('p'+i), null);
		      $('p'+i).className = $('p'+i).className.replace(/\s*highlight/g, '');
		  }
	      }
	  },400
	);
    },
    highLightOff : function(evt){
	clearTimeout(this.timeout);
	evt.target.style.color = '';
    }
};

var GoogleTagCloud = function(){this.init()};
GoogleTagCloud.prototype = {
    emchr : {'digit' : unescape('%uFF10-%uFF19'),
	     'cChar' : unescape('%uFF21-%uFF3A'),
	     'lChar' : unescape('%uFF41-%uFF5A'),
	     'hKana' : unescape('%u3042-%u3093'),
	     'kKana' : unescape('%u30A1-%u30F4%u30FC'),
	     'kanji' : unescape('%u4E00-%u9FA0'),
	     'other' : unescape('%u2015%uFF1D%uFF0B%uFF01%uFF1F') },
    rep : null,
    sqExp : eval('/^('+sq.join(')$|^(')+')$/i'),
    ngExp : eval('/^('+('above about add agree all allow also an and any are as at be below between but by can cant contain correspondingly descriptions do doesnt each either entirely first following for found from full fully get getting has have higher how if in include included includes including is it least less made make making may modify more most must need new no non not of on only or other otherwise our particular partially party per please prior right same see shall should similar some specifies specify such than that the their there these third this to try two under us use used using via visit want way we what when where which will with within without would www you your youre wc sp co jp org com net ac ne de us uk since gt lt amp co jp '+unescape('%u3053%u308C %u3042%u308C %u305D%u308C %u3069%u308C %u3053%u306E %u305D%u306E %u3042%u306E %u3069%u306E %u3053%u3053 %u305D%u3053 %u3042%u305D%u3053 %u3069%u3053 %u3053%u3061%u3089 %u3042%u3061%u3089 %u305D%u3061%u3089 %u3069%u3061%u3089 %u30AD%u30E3%u30C3%u30B7%u30E5 %u95A2%u9023 %u30DA%u30FC%u30B8 %u30E1%u30E2')).split(/[ ]/g).join(')$|^(')+')$/i'),
    words : new Array(),
    
    getWords : function(resNode, id){
	var title, body;
	var divs = resNode.getElementsByTagName('div');
	for(var i = 0, l = divs.length; i < l; i++) if(divs[i].className == 'sml') body = divs[i].innerHTML.replace(/<.+?>/g, '');
	var as = resNode.getElementsByTagName('a');
	for(var i = 0, l = as.length; i < l; i++) if(as[i].className == 'l') title = as[i].innerHTML.replace(/<.+?>/g, '');

	var t_kwords = eval('(title+\' \'+body).match(/' +
			    '['+this.emchr['digit']+']+|' +
			    '['+this.emchr['cChar']+']+|' +
			    '['+this.emchr['lChar']+']+|' +
			    //	'['+this.emchr['hKana']+']+|' +
			    '['+this.emchr['kKana']+']+|' +
			    '['+this.emchr['kanji']+']+|' +
			    '[a-zA-Z0-9\\\-\\\_]+/g)');
	
	for(var i = 0, l = t_kwords.length; i < l; i++){
	    //make lower case
	    var t_kword = t_kwords[i].toLowerCase();
	    t_kword = t_kword.replace(this.rep, function($0){ return String.fromCharCode($0.charCodeAt(0) - 65248);});
	    
	    //exclude NG word||one char||only digit||search query and register key words
	    if(!(t_kword.match(this.ngExp, 'g') ||	//NG word
		 t_kword.match(/^.$/) ||	//one char
		 t_kword.match(/^[\d\-\+\!\=]+$/)||	//only digit
		 t_kword.match(this.sqExp)		//search query
		 )){
		this._pushKwd(t_kword, id);
	    }
	}
    },
    _pushKwd : function(word, id){
	if(!this.words[word]){		this.words[word] = new Array();	this.words[word].sum = 0;}
	if(!this.words[word][id])	this.words[word][id] = 0;
	this.words[word][id]++;	this.words[word].sum++;
    },
    createNavibar : function(){
	var div = document.createElement('div');
	if($('nn')){
	    var nn = document.createElement('a');
	    nn.setAttribute('href', $('nn').parentNode.getAttribute('href'));
	    nn.style.cssFloat = 'right';	    nn.innerHTML = 'Next&gt;&gt;';
	    nn.className = 'navi';	    div.insertBefore(nn, null);
	}
	if($('np')){
	    var np = document.createElement('a');
	    np.setAttribute('href', $('np').parentNode.getAttribute('href'));
	    np.style.cssFloat = 'left';	    np.innerHTML = '&lt;&lt;Prev';
	    np.className = 'navi';	    div.insertBefore(np, null);
	}
	var cl = document.createElement('div');
	cl.innerHTML = 'Clear';	cl.setAttribute('align', 'center');
	cl.id = '__clear';	div.insertBefore(cl, null);
	cl.addEventListener('mouseover', new TagCloud().highLightOn, false);
	cl.addEventListener('mouseout', new TagCloud().highLightOff, false);
	return div;
    },
    versionCheck : function(){
	
    },
    init : function(){
	GM_addStyle('#tagCloud {width : 100%; border : 1px solid #0000CC; background : #E5ECF9; postion : relative; margin-top : 10px; z-index:1000;'
		    +'padding : 0px; word-spacing : 10px; line-height : 200%;}'
		    +'.keyword {text-decoration : none}'
		    +'.highlight {background : #EFEFEF}'
		    +'.navi, #__clear {text-decoration : none; color:black; background:#999999;postion:relative;}');
	var resNodes = document.evaluate('//div[@class="g"]', document.body, null, 7, null);
	if(resNodes.snapshotItem(0)) resNodes.snapshotItem(0).parentNode.id = 'pnode';
	
	this.rep = '/(['+this.emchr['cChar']+this.emchr['lChar']+this.emchr['digit']+']+)/';
	for(var i = 0, l = resNodes.snapshotLength; i < l; i++){
	    resNodes.snapshotItem(i).id = 'p'+i;
	    this.getWords(resNodes.snapshotItem(i), i);
	}
	tags = this.words;
	var cloud = new TagCloud(this.words);
	var d = document.createElement('div');	d.style.cssFloat = 'right';	d.style.width = '30%';  d.style.marginTop = '10px';
	d.insertBefore(this.createNavibar(), null);
	d.insertBefore(cloud.createTagCloud(), null);
	if($('mbEnd')) d.insertBefore($('mbEnd'), null);
	document.body.insertBefore(d, $('res'));
    }
};
new GoogleTagCloud();
