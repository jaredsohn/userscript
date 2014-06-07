// ==UserScript==
// @name                Smiley icon
// @author              http://mltan100.googlepages.com/
// @description         post icon
// @include             http://mltan100.googlepages.com/emoticons.js
// @contributors        -
// ==/UserScript==


// @name Emoticon  [everything]

function showsbtext(id,index) {
var bookmarktext=document.getElementById(id);
var sbValues= new Array();
  sbValues[0] = 'Bookmark:';
  sbValues[1] = 'Add to <strong>Digg</strong>';
  sbValues[2] = 'Add to <strong>Delicious</strong>';
  sbValues[3] = 'Add to <strong>Blinklist</strong>';
  sbValues[4] = 'Add to <strong>Yahoo Web</strong>';
  sbValues[5] = 'Add to <strong>Netvouz</strong>';
  sbValues[6] = 'Add to <strong>Ma.gnolia</strong>';
  sbValues[7] = 'Add to <strong>Fark</strong>';
  sbValues[8] = 'Add to <strong>Furl</strong>';
  sbValues[9] = 'Add to <strong>Technorati</strong>';
  sbValues[10] = 'Add to <strong>Simpy</strong>';
  sbValues[11] = 'Add to <strong>Spurl</strong>';
  sbValues[12] = 'Add to <strong>Newsvine</strong>';
  sbValues[13] = 'Add to <strong>Blinkbits</strong>';
  sbValues[14] = 'Add to <strong>Smarkings</strong>';
  sbValues[15] = 'Add to <strong>Segnalo</strong>';
  sbValues[16] = 'Add to <strong>De.lirio.us</strong>';
  sbValues[17] = 'Add to <strong>Reddit</strong>';
  sbValues[18] = 'Add to <strong>Wists</strong>';
  sbValues[19] = 'Add to <strong>Google</strong>';
document.getElementById(bookmarktext.id).innerHTML = sbValues[index];
}


document.getElementsByClassName = function(clsName){
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for(var i = 0;i < elements.length;i++){
        if(elements[i].className.indexOf(" ") >= 0){
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++){
                if(classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}

function addSmiley(dummy)
{
  var d = [], i=0, def = ['post-body','entry-content','comment-body'];

  for(i=0;i<def.length;i++)
  {
	var content = document.getElementsByClassName(def[i]);
	for(var j=0;j<content.length;j++)
		d.push(content[j]);
  }

  for(i=0;i<arguments.length;i++)
  {
	var content = document.getElementsByClassName(arguments[i]);
	for(var m=0;m<content.length;m++)
		d.push(content[m]);
  }

  for(var i=0;i<d.length;i++)
  {
     d[i].innerHTML = d[i].innerHTML.replace (/\/nobigdeal/ig,"<img style='border: 0; padding:0'  src='http://farm2.static.flickr.com/1427/712360170_9c2a21ab5b_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/hihi/ig,"<img style='border: 0; padding:0' src='http://farm1.static.flickr.com/148/409434711_7c32198636_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/wahaha/ig,"<img style='border: 0; padding:0'  src='http://farm1.static.flickr.com/158/409434721_0a3ee7ea41_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/omg/ig,"<img style='border: 0; padding:0'  src='http://farm1.static.flickr.com/167/409428414_963eff3677_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/no/ig,"<img style='border: 0; padding:0'  src='http://farm1.static.flickr.com/166/409434720_46d32dda83_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/dignose/ig,"<img style='border: 0; padding:0'  src='http://farm1.static.flickr.com/176/409434716_15a0125bdf_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/sweat/ig,"<img style='border: 0; padding:0'  src='http://farm1.static.flickr.com/171/409428410_64dafd1e42_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/shock/ig,"<img style='border: 0; padding:0'  src='http://farm2.static.flickr.com/1199/698528140_b56f9dabac_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/floor/ig,"<img style='border: 0; padding:0'  src='http://farm2.static.flickr.com/1173/698474628_19dedfacd5_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/XD/ig,"<img style='border: 0; padding:0'  src='http://farm2.static.flickr.com/1340/698474700_7456a5ef02_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/hmm/ig,"<img style='border: 0; padding:0'  src='http://farm2.static.flickr.com/1178/712360134_b8ebc3161b_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/blur/ig,"<img style='border: 0; padding:0'  src='http://farm2.static.flickr.com/1250/712360148_2611573995_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/blush/ig,"<img style='border: 0; padding:0'  src='http://farm2.static.flickr.com/1298/712360160_d7dfa9317b_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/bye/ig,"<img style='border: 0; padding:0'  src='http://farm4.static.flickr.com/3051/2556978145_c2ca7f9058_o.gif'/>")
     d[i].innerHTML = d[i].innerHTML.replace (/\/please/ig,"<img style='border: 0; padding:0'  src='http://farm4.static.flickr.com/3190/2556985183_445f43c546_o.gif'/>")


d[i].innerHTML = d[i].innerHTML.replace (/\:\(/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\)\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/o:\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\-B/ig,"<img style='border: 0; padding:0'   src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\=\;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\-c/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/101.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\)\]/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/100.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\~X\(/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\-h/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\I-\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\8-\|/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\L-\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:-\&amp;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:-\$/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\[-\(/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:O\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/34.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\8-\}/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\&lt;\:\-P/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\(\:\|/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\=P\~/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:-\?/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\#\-O/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:-SS/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\@-\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\^O/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:-\&lt;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\&lt;\)\:\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\o=\&gt;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\o-\+/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\(\%\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/75.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\"\&gt;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\[\-o\&lt;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\$\-\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\-\"/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/b-\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/b-\(/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\)\&gt;\-/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\\\:D\//ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\&gt;\:\//ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\;\)\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\-\@/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\^\:\)\^/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif'>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\-j/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\(\*\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/o-\&gt;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\&gt;\-\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:\-L/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\8-x/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\*\-\:\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/58.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\~O\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\(\~\~\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/56.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\*\*\=\=/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/55.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\%\%\-/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/54.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\@\}\;\-/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\~\:\&gt;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\/\:\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\&gt;\:\D\&lt;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif' alt='>:-D<'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\&gt;:\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif'/>")       
 d[i].innerHTML =d[i].innerHTML.replace(/\=\)\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif' alt='=)'/>")
 d[i].innerHTML =d[i].innerHTML.replace(/\=\(\(/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif' alt='=('/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:\(\|\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/51.gif' />")
d[i].innerHTML = d[i].innerHTML.replace(/\:\(\(/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif' />")
d[i].innerHTML = d[i].innerHTML.replace(/\:\-\*/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif' />")
d[i].innerHTML = d[i].innerHTML.replace(/\:\|/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\;;\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif' />")
d[i].innerHTML = d[i].innerHTML.replace(/\;\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif' alt=';)'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:D/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif' alt=':-D'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:\-\//ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif' alt=':-C'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:-T/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/104.gif'alt=':-T'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:x/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif'alt=':X'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:&gt;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif' alt=':>'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\#:-S/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif' alt='hash :- S'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:-S/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif' alt=':-S'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:o3/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/108.gif' alt=':o3' />")
d[i].innerHTML = d[i].innerHTML.replace(/\8-\&gt;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif'alt='8-&gt;'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:-W/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif'alt=':-w'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\[-*x/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif' alt='[-X'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\s*x\(/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif' alt='X('/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:-O/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif' alt=':-O'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\&gt;:P/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif' alt='>:P'/>") 
d[i].innerHTML = d[i].innerHTML.replace(/\=D&gt;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif' alt='=D>'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\s=;/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif' alt='=;>'/>")
d[i].innerHTML = d[i].innerHTML.replace(/\:\-\?\?/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\%\-\(/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/107.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\@\)/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/49.gif'/>")
d[i].innerHTML = d[i].innerHTML.replace (/\:\P/ig,"<img style='border: 0; padding:0'  src='http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif'/>")

    }
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

addLoadEvent(function(){
	addSmiley();
});