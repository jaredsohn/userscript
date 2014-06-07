// ==UserScript==
// @name           Search Hosting Ukraine FAQ
// @description    Search plugin for http://ukraine.com.ua/Faq
// @author         komaval kmakymv@gmail.com
// @include        https://ukraine.com.ua/Faq/*
// @version        0.1beta
// ==/UserScript==

var unsafeWindow = this['unsafeWindow'] || window;

unsafeWindow.HU = {
  containerStyle: 'border:grey groove 0px; padding: 4px; font-size:14px; font-weight: bold;line-height:1.8em; background: #f8f8f8; margin-bottom:25px;',
  inpStyle: 'margin:5px; width: 300px; border: groove grey 1px',
  inpValue: 'Enter searching string',
  defStr: "No matching results",
  init: function(){
    var inp = document.createElement('input');
    inp.setAttribute('style',this.inpStyle);
    inp.setAttribute('onkeyup','HU.search(this.value)');
    inp.value = this.inpValue;
    inp.setAttribute('onclick', "if(this.value === '"+this.inpValue+"'){this.value = ''}");
    var wrapper = document.getElementsByClassName('main')[0];
    wrapper.insertBefore(inp, wrapper.firstChild);
    this.container = document.createElement('div');
    this.container.setAttribute('style', this.containerStyle);
    this.container.innerHTML = this.defStr;
    wrapper.insertBefore(this.container, wrapper.firstChild.nextSibling);
    this.index();
  },

  index: function(){
    this.li = document.getElementsByClassName('faq2');
    this.indexDB = new Array;
    this.db = new Array;
    
    for(var i=0; i<this.li.length;i++){
      this.db[this.db.length] = this.li[i].getElementsByTagName('a')[0].innerHTML;
    }
    
    
/* For feature (smart search)
    var string = this.db.join(' ');
    var chars = string.split('');
    var words = string.split(/[\/\.\,\"\;\'\?\!\)\(\<\>\[\]\_\s*]/ig);
    
    for(var i=0; i<words.length;i++){
      if(!(words[i] in this.indexDB)){
        this.indexDB.push(words[i]);
      } 
    }
    this.indexDB = this.indexDB.join("\n");
  
*/
  },
  
  search: function(req){
    var reDelim = /[\/\.\,\"\;\'\?\!\)\(\<\>\[\]\_\s]/ig,
        reWhitesp = /\s{1,}/ig,
        reTrim = /^\s*([\S\s]*?)\s*$/;
    req = req.replace(reDelim, ' ').replace(reWhitesp, ' ').replace(reTrim, '$1');
    expr = req.split(reDelim).join('|');
    var re = new RegExp(expr,'mig');
    var tmp = [];
    for(var i=0;i<this.db.length;i++){
      var res = this.db[i].match(re);
      if(res !== null && req !== ''){
        tmp.push(res.length+"|"+ i);
      }
    }
    tmp.sort();
    var retest = new RegExp(req+".*",'igm');
    this.display(tmp);
  },
 
  display: function(arr){
    var str = '';
    if(arr.length == 0){str = this.defStr};
    for(var i in arr){
      str += this.li[arr[i].split("|")[1]].innerHTML + "<br>";
    }
    this.container.innerHTML = str;
  }
}

unsafeWindow.addEventListener('load',unsafeWindow.HU.init(),false);