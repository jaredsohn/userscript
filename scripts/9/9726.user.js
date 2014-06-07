<!--

function replaceText() {
// no support
if(!document.getElementById) {
return;
}

bodyText = document.getElementById("body");
s = bodyText.innerHTML;

// replace
s = s.replace(/:o3/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/108.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-\?\?/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/%-\(/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/107.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:@\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/49.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/3:-o/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/50.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/3:-O/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/50.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:\(\|\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/51.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/~:&gt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/@\};-/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/%%-/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/54.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\*\*==/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/55.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\(~~\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/56.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/~o\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/~O\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\*-:\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/58.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/8-x/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/8-X/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/=:\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/60.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/&gt;-\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-*l/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-*L/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\[-o&lt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\[-O&lt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\$-\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-"/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/b-\(/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/B-\(/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:\)&gt;-/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\[-x/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\[-X/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\\:D\//g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\\:d\//g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/&gt;:\//g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/;\)\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-@/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\^:\)\^/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-j/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-J/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\(\*\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/o-&gt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/o=&gt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/o-\+/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\(%\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/75.gif" style="border:0; margin:0; padding:0;"/> ');

s = s.replace(/o:-\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/&lt;:-p/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/&lt;:-P/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/O:-\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:\)\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/&gt;:\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/&lt;\):\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:\)\]/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/100.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\/:\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-*\)/g, '<img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:\(\(/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif" style="border:0; margin:0; padding:0;"/> ');

s = s.replace(/:-*\(/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/;;\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/;-*\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif" style="border:0; margin:0; padding:0;"/> ');

s = s.replace(/&gt;:D&lt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/&gt;:d&lt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:D/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:d/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-\//g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-*x/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-*X/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:"&gt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/&gt;:-*P/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/&gt;:-*p/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-*p/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-*P/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-*\*/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/=\(\(/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-o/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-O/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/~X\(/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/~x\(/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/X\(/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/x\(/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-*&gt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/B-\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/b-\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-ss/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-SS/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/#:-s/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/#:-S/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-s/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-S/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\(:\|/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:\|/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/=\)\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-b/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-B/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/=;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-c/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/101.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-h/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-t/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/104.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/8-&gt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/I-\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/i-\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/8-\|/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/L-\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/l-\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-&amp;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-\$/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/\[-\(/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:o\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/34.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:O\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/34.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/8-\}/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/=p~/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/=P~/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-\?/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/#-o/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/#-O/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/=d&gt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/=D&gt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/@-\)/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:\^o/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:\^O/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-w/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-W/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif" style="border:0; margin:0; padding:0;"/> ');
s = s.replace(/:-*&lt;/g, ' <img src="http://us.i1.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif" style="border:0; margin:0; padding:0;"/> ');

bodyText.innerHTML = s;
}

-->