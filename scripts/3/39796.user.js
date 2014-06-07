// ==UserScript==
// @name           RMP Killfile (interactive)
// @namespace      www.ratemyprofessors.com/jive/vodka
// @description    allows you to ignore posts from specific users
// @include        http://www.ratemyprofessors.com/*
// @include       http://ratemyprofessors.com/*
// ==/UserScript==

var Bans = Array("troll", "spammer");
Bans = eval(GM_getValue('banned', Bans.toSource()));

var banRegs = Array();
for(var ban in Bans){
    //create a regular expression using the user's name
    var re = new RegExp();
    re.compile('\s*posted by\: ' + Bans[ban] + '\s*');
    banRegs.push(re);
}
var basicRe = new RegExp();
basicRe.compile(/\s*posted by\: /);

var spans = document.getElementsByTagName('span');
for(var span=0; span<spans.length; span++){
    if(spans[span].className=='messageAuthor'){
        var test = spans[span];
        if(test.childNodes[0].nodeValue){
            var block=0;
            var newLink = 0;
            var user='';
            for(var re in banRegs){
                if(test.childNodes[0].nodeValue){
                    if(test.childNodes[0].nodeValue.match(banRegs[re]) || test.childNodes[0].nodeValue.match(/\s*posted by\:\s*$/)){

                        user = test.childNodes[0].nodeValue.replace(basicRe, '');
                        user = user.replace(/\s/g, '');
                        var ublock = document.createElement('a');
                        ublock.addEventListener('click', function(e){var elem=e.currentTarget.nextSibling; var user = elem.innerHTML.replace(/\s*posted by\: /, ''); user = user.replace(/\s/g, ''); var banned = GM_getValue('banned'); banned = eval(banned); var banned2 = banned; for(var b=(banned2.length-1); b>=0; b--){if(user==banned2[b]){banned.splice(b,1);} GM_setValue('banned', banned.toSource());} for(var span2=0; span2<spans.length; span2++){if(spans[span2] && spans[span2].childNodes[0]){var uname = spans[span2].childNodes[0].nodeValue.replace('posted by\: ', ''); uname = uname.replace(/\s/g, ''); if(uname==user){var tbl = spans[span2].parentNode.parentNode.parentNode.parentNode; tbl.style.display=""; if(tbl.previousSibling){tbl.parentNode.removeChild(tbl.previousSibling); }}}}}, false);

                        ublock.appendChild(document.createTextNode('Unblock user '));
                        test.parentNode.insertBefore(ublock, test);
                        while(test && test.nodeName.toUpperCase() != 'TABLE'){
                            test = test.parentNode;
                        }
                        test.style.display='none';
                        newLink = document.createElement('a');
                        newLink.setAttribute('onclick', 'if(this.nextSibling.style.display=="none"){this.nextSibling.style.display="";}else{this.nextSibling.style.display="none";}');
                        newLink.appendChild(document.createTextNode('Show/Hide blocked comment'));
                        block=1;
                    }else{
                        if(test.childNodes[0] && test.childNodes[0].nodeValue){
                            user = test.childNodes[0].nodeValue.replace(basicRe, '');
                            newLink = document.createElement('a');
                            newLink.addEventListener('click', function(e){var banned = GM_getValue('banned'); banned = eval(banned); var elem=e.currentTarget.nextSibling; var user = elem.innerHTML.replace('posted by\: ', ''); user = user.replace(/\s/g, ''); var banned2 = banned; for(var u in banned2){if(banned2[u]==user){banned.splice(u, 0);}} if(user){banned.push(user);} GM_setValue('banned', banned.toSource()); for(var span2=0; span2<spans.length; span2++){if(spans[span2] && spans[span2].childNodes[0]){var uname = spans[span2].childNodes[0].nodeValue.replace('posted by\: ', ''); uname = uname.replace(/\s/g, ''); if(uname==user){var tbl = spans[span2].parentNode.parentNode.parentNode.parentNode; tbl.style.display="none"; if(!tbl.previousSibling || tbl.previousSibling.innerHTML!='Show/Hide blocked comment'){var link = document.createElement('a'); link.appendChild(document.createTextNode('Show/Hide blocked comment')); link.setAttribute('onclick', 'if(this.nextSibling.style.display=="none"){this.nextSibling.style.display="";}else{this.nextSibling.style.display="none";}'); tbl.parentNode.insertBefore(link, tbl);}}}}}, false);

                            newLink.appendChild(document.createTextNode('Block this user '));
                        }
                    }
                }
               
            }
            if(newLink){
                test.parentNode.insertBefore(newLink, test);
            }
        }
    }
}
