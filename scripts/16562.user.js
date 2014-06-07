// ==UserScript==
// @name		GoogleTagCloudMaker
// @include		http://www.google.*/search*
// @description		Make Tag Cloud from Google search result.
// @version		0.1.2
// ==/UserScript==

// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html

(function(){
    var base = 'http://'+location.host+'/search';
    var gs = new Array();
    var kwd2item = new Array();
    var maxfontsize = 1;

    //separator
    var sep = ' ' + unescape('%u3000');

    //emchar
    var emchar = new Array();
    emchar['digit'] = unescape('%uFF10-%uFF19');
    emchar['cChar'] = unescape('%uFF21-%uFF3A');
    emchar['lChar'] = unescape('%uFF41-%uFF5A');
    emchar['hKana']  = unescape('%u3042-%u3093');
    emchar['kKana']  = unescape('%u30A1-%u30F4%u30FC');
    emchar['kanji'] = unescape('%u4E00-%u9FA0');
    emchar['other'] = unescape('%u2015%uFF1D%uFF0B%uFF01%uFF1F');
	
    //NG word
    var exclude = 'above about add agree all allow also an and any are as at be below between but by can cant contain correspondingly der die das ein eine er sie es descriptions do doesnt each either entirely first following for found from full fully get getting has have higher how if in include included includes including is it least less made make making may modify more most must need new no non not of on only or other otherwise our particular partially party per please prior right same see shall should similar some specifies specify such than that the their there these third this to try two under us use used using via visit want way we what when where which will with within without would you your youre wc sp co jp org com net ac ne de us uk since gt lt amp co jp '+unescape('%u3053%u308C %u3042%u308C %u305D%u308C %u3069%u308C %u3053%u306E %u305D%u306E %u3042%u306E %u3069%u306E %u3053%u3053 %u305D%u3053 %u3042%u305D%u3053 %u3069%u3053 %u3053%u3061%u3089 %u3042%u3061%u3089 %u305D%u3061%u3089 %u3069%u3061%u3089');

    /************************************************************
     * sub routines
     ************************************************************/
    /************************************************************
     * definition of getElementsByClass				*/
    document.getElementsByClass = function (searchClass) {
	if (document.all) {
	    var classElements = new Array();
	    var allElements = document.all;
	    for (var i = 0, j = 0; i < allElements.length; i++) {
		if (allElements[i].className == searchClass) {
		    classElements[j] = allElements[i];
		    j++;
		}
	    }   
	} else if (document.getElementsByTagName) {
	    var classElements = new Array();
	    var allElements = document.getElementsByTagName('*');
	    for (var i = 0, j = 0; i < allElements.length; i++) {
		if (allElements[i].className == searchClass) {
		    classElements[j] = allElements[i];
		    j++;
		}
	    }       
	} else {
	    return;
	}

	return classElements;
    }

    /************************************************************
     * get all text in element					*/
    var getText = function(g){
	//comment out
	g.innerHTML = g.innerHTML.replace(/<!.+?>/, '');
	g.title = g.innerHTML.match(/(<span class="w">.+?<\/span>.+?)?<a.+?>(.+?)<\/a>/)[2];
	g.title = g.title.replace(/<b>(.+?)<\/b>/g, function($0){return $0.replace(/<.+?>/g, '');});
	g.body = (g.innerHTML.match(/<font size=\"-1\">(.+?)<br><span/) == null) ? "":g.innerHTML.match(/<font size=\"-1\">(.+?)<br><span/)[1];
	g.body = g.body.replace(/<.+?>(.+?)<\/.+?>/g, function($0){return $0.replace(/<.+?>/g, '');});
	return g;
    }
    /************************************************************
     * get key words from strings				*/
    var getKeys = function(id, g){

	//get candidates of keyword
	var matchStr = '(g.title+\' \'+g.body).match(/' +
	'['+emchar['digit']+']+|' +
	'['+emchar['cChar']+']+|' +
	'['+emchar['lChar']+']+|' +
//	'['+emchar['hKana']+']+|' +
	'['+emchar['kKana']+']+|' +
	'['+emchar['kanji']+']+|' +
	'[a-zA-Z0-9\\\-\\\_]+/g)';
	var t_kwords = eval(matchStr);

	for(var i = 0; i < t_kwords.length; i++){
	    //make lower case
	    var t_kword = t_kwords[i].toLowerCase();
	    var rep = '/(['+emchar['cChar']+emchar['lChar']+emchar['digit']+']+)/';
	    t_kword = t_kword.replace(rep, function($0){ return String.fromCharCode($0.charCodeAt(0) - 65248);});

	    //exclude NG word||one char||only digit||search query and register key words
	    if(!(t_kword.match(ngExp, 'g') ||	//NG word
		 t_kword.match(/^.$/) ||	//one char
		 t_kword.match(/^[\d\-\+\!\=]+$/)||	//only digit
		 t_kword.match(sqExp)		//search query
		 )){
		pushKwd(t_kword, id);
	    }
	}
    }
	
    /************************************************************
     * add keywords for array					*/
    var pushKwd = function(kwd, id){
	//if kwd is not registered
	if(!kwd2item[kwd] || typeof(kwd2item[kwd]) == 'function'){
	    kwd2item[kwd] = new Array();
	    kwd2item[kwd][id] = 1;
	    kwd2item[kwd]['sum'] = 1;
	}
	//if kwd has been registered
	else{
	    if(!kwd2item[kwd][id]){
		kwd2item[kwd][id] = 0;
	    }
	    kwd2item[kwd][id]++;
	    kwd2item[kwd]['sum']++;

	    maxfontsize = (maxfontsize > kwd2item[kwd]['sum']) ? maxfontsize : kwd2item[kwd]['sum'];
	}
    }
    /************************************************************/
    /* get search queries					*/
    /* return Array						*/
    var getSearchQuery = function(){
	var qs = document.getElementsByTagName('input');
	for(var i = 0; i < qs.length; i++){
	    if(qs[i].name.match(/^q$/)){
		var str = qs[i].value;
		str = str.replace(/\//g, '\\/');
		str = str.replace(/([\+\-\.\?\!\=\^\$])/g, function($0){ return '\\'+$0;});
		str = str.replace(/\"/g, '');
		eval('str = str.replace(/(['+emchar['cChar']+emchar['lChar']+emchar['digit']+'])/g, function($0){ return String.fromCharCode($0.charCodeAt(0) - 65248);})');
		return eval('str.split(/['+sep+']+/)');
	    }
	}
    }

    /************************************************************
     * show kwd2item						*/
    var showKwd2Item = function(){
	var ka, kb;
	var str = ''
	for(var ka in kwd2item){
	    for(var kb in kwd2item[ka]){
		if(!kb.match(/sum/)){
		    if(kwd2item[ka][kb] >= 1){
			str = str + ka + '=>' + kb + '(' +kwd2item[ka][kb] + ')\n';
		    }
		}
	    }
	}
	alert('keywords is\n'+str);
    }

    /************************************************************
     * highlight selected keyword				*/
    var highlightKeyword = function(kwd){
	var kws = document.getElementById('cloud').childNodes;
	for(var i = 1; i < kws.length; i++){
	    kws[i].style.color = '';
	}
	if(kwd){
	    kwd.style.color = 'red';
	}
    }
    /************************************************************
     * rearray items						*/
    var reArrayItems = {
	timeout : null,
	reArrayOn : function(e){
	    clearTimeout(this.timeout);
	    this.timeout = setTimeout(
		      function(){
			  try{
			      if(e.target.id.match(/^clear$/)){
				  highlightKeyword();
				  var parent = document.getElementById('p_node');
				  var children = parent.getElementsByTagName('div');
				  for(var i = 0; i < children.length ; i++){
				      var child = document.getElementById(i);
				      child.style.backgroundColor = '#ffffff';
				      parent.removeChild(child);
				      parent.insertBefore(child, null);
				  }
			      }else{
				  highlightKeyword(e.target);
				  var parent = document.getElementById('p_node');

				  for(var i = 0; i < parent.getElementsByTagName('div').length; i++){
				      if(kwd2item[e.target.id][i]){
					  var child = document.getElementById(i);
					  child.style.backgroundColor = '#efefef';
					  parent.removeChild(child);
					  parent.insertBefore(child, parent.firstChild);
				      }else{
					  var child = document.getElementById(i);
					  child.style.backgroundColor = '#ffffff';
					  parent.removeChild(child);
					  parent.insertBefore(child, null);
				      }
				  }
			      }			      
			  }catch(e){
			      alert("Exception: " + e);
			  }
		      },
		      //400msec
		      400);
	},
	//reset time counter
	reArrayOff : function(e){
	    clearTimeout(this.timeout);
	}
    }
    
    /************************************************************
     * make TagCloud						*/
    var makeTagCloud = function(){
	var cloud = document.createElement('div');
	cloud.setAttribute('id', 'cloud');
	cloud.style.width = '30%';
	cloud.style.border = 'solid 1px #0000cc';
	cloud.style.backgroundColor = '#e5ecf9';
	cloud.style.position = 'relative';
	cloud.style.cssFloat = 'right';
	cloud.style.marginTop = '10px';
	cloud.style.padding = '5px';
	cloud.style.wordSpacing = '10px';
	cloud.style.lineHeight = '200%';

	cloud.insertBefore(createNavi(), null);
	
	for(var ka in kwd2item){
	    if(kwd2item[ka]['sum'] > 1){
		var item = document.createElement('a');
		item.setAttribute('href', base+'?q='+getSearchQuery().join('+') + "+" + ka);
		item.setAttribute('class', 'keyword');
		item.setAttribute('id', ka);
		item.style.fontSize = Math.floor(kwd2item[ka]['sum'] / maxfontsize * 12 + 8) + "pt";
		item.style.textDecoration = 'none';
		item.insertBefore(document.createTextNode(ka + '(' + kwd2item[ka]['sum'] + ') '), null);
		cloud.insertBefore(item, null);
	    }
	}
// 	cloud.insertBefore(document.getElementById('navbar'), null);
	
	return cloud;
    }


    /************************************************************
     * add mouse event to each keyword				*/
    var addKeywordEvents = function() {
	var cloud = document.getElementById('cloud');
	var ks = cloud.childNodes;
	for (var i = 0; i < ks.length; i++) {
	    if(!ks[i].tagName.match(/div/i)){
		ks[i].addEventListener('mouseover', reArrayItems.reArrayOn, false);
		ks[i].addEventListener('mouseout', reArrayItems.reArrayOff, false);
	    }
	}
	var clear = document.getElementById('clear')
	clear.addEventListener('mouseover', reArrayItems.reArrayOn, false);
	clear.addEventListener('mouseout', reArrayItems.reArrayOff, false);
    }

    /************************************************************/
    /* search sponsor menu and return that object if there is	*/
    /* but now sponsor menu is judged according to two attribute*/
    var getSponsorSite = function(){
	var ts = document.body.getElementsByTagName('table');
	for(var i = 0; i < ts.length; i++){
	    if(ts[i].getAttribute('width') == '25%' && ts[i].getAttribute('align') == 'right'){
		ts[i].setAttribute('id', 'sponsor');
		return ts[i];
	    }
	}
	return null;
    }

    /************************************************************/
    /* get top div of search results				*/
    var getTopSearchRes = function(){
	var ts = document.body.getElementsByTagName('div');
	if(ts.length >= 2){
	    return ts[1];
	}
	return null;
    }

    /************************************************************/
    /* create Next and Back Navigator				*/
    var createNavi = function(){
	var div = document.createElement('div');

	if(document.getElementById('nn')){
	    var nn = document.createElement('a');
	    nn.setAttribute('href', document.getElementById('nn').parentNode.getAttribute('href'));
	    nn.insertBefore(document.createTextNode('Next>>'), null);
	    nn.style.textDecoration = 'none';
	    nn.style.color = '#000000';
	    nn.style.backgroundColor = '#999999';
	    nn.style.position = 'relative';
	    nn.style.cssFloat = 'right';
	    div.insertBefore(nn, null);
	}

	var np = document.createElement('a');
	if(document.getElementById('np')){
	    np.setAttribute('href', document.getElementById('np').parentNode.getAttribute('href'));
	}else{
 	    np.style.display = 'none';
	}
	np.insertBefore(document.createTextNode('<<Back'), null);
	np.style.textDecoration = 'none';
	np.style.color = '#000000';
	np.style.backgroundColor = '#999999';
	np.style.position = 'relative';
	np.style.cssFloat = 'left';
	div.insertBefore(np, null);
	
	var cl = document.createElement('div');
	cl.insertBefore(document.createTextNode('Clear'), null);
	cl.style.textDecoration = 'none';
	cl.style.color = '#000000';
	cl.style.backgroundColor = '#999999';
	cl.setAttribute('align', 'center');
	cl.setAttribute('id', 'clear');
	div.insertBefore(cl, null);

	return div;
    }

    /****************************************************************/
    /* main program
     ****************************************************************/
     //make NG words
    var ngExp = eval('/^('+exclude.split(/[ ]/g).join(')$|^(') + ')$/i');
    
    //get search query
    var sqExp = eval('/^('+getSearchQuery().join(')$|^(')+')$/i');

    //get search result element
    var top = getTopSearchRes();
	
    //get Object whose class is 'g' and tag is 'p'
    var dummy = new Array();
    dummy = document.getElementsByClass('g');
    for(var i = 0; i < dummy.length; i++){
	if(dummy[i].tagName.match(/div/i)) gs.push(dummy[i]);
    }

    if(gs.length == 0) return null;

    //get Text of each item and add attribute id
    for(var i = 0; i < gs.length; i++){
	if(gs[i].parentNode.tagName.match(/blockquote/i)){
	    gs[i].parentNode.setAttribute('id', i);
	}else{
	    gs[i].setAttribute('id', i);
	}
	getKeys(i, getText(gs[i]));
    }

    //set id 'p_node' to the parent node of search result
    if(gs[0]){
	gs[0].parentNode.setAttribute('id', 'p_node');
    }
    
    //get Sponsor bar
    var sponsor = getSponsorSite();

    //if there is sponsor meny
    if(sponsor){
	sponsor.parentNode.removeChild(sponsor);
	sponsor.setAttribute('align', null);
	sponsor.setAttribute('width', '100%');
	sponsor.style.position = 'relative';
	sponsor.style.cssFloat = 'right';
	
	var d = document.createElement('div');
	d.style.width = '30%';
	d.style.position = 'relative';
	d.style.cssFloat = 'right';
	
	var c = makeTagCloud();
	c.style.width = '100%';
	d.insertBefore(c, null);
	d.insertBefore(sponsor, null);
	document.body.insertBefore(d, top);
    }else{
	document.body.insertBefore(makeTagCloud(), top);
    }

    //attach mouse event to each key word
    addKeywordEvents();
})();
