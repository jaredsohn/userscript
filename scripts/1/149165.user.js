    // ==UserScript==
    // @name           Kurahen 2.0
    // @description    BBcode + lista-email + zamiana tytułu + antysmalec + autokapcza + ukryte boardy
    // @version        3.0
    // @include        http://www.karachan.org/*
    // @include        http://karachan.org/*
    // ==/UserScript==
     
    document.body.innerHTML = document.body.innerHTML.replace('Homoseksualne prawiczki i miłośnicy drobiu', 'Random')
    document.title = document.title.replace('Homoseksualne prawiczki i miłośnicy drobiu', 'Random')
    document.body.innerHTML = document.body.innerHTML.replace('background-image:url(data:image/gif;base64,', '<--//')
    document.body.innerHTML = document.body.innerHTML.replace('/css/images/empty_captcha.png"', 'http://www.karachan.org/captcha.php?" ')    
    document.body.innerHTML = document.body.innerHTML.replace('>b</a>', '>b</a> / <a href="/&#1101;&#1083;&#1080;&#1090;&#1072;/" title="ruski">ruski</a> / <a href="/wykop/" title="wykop">wykop</a>')
           
    function lista(){
        var inputs=document.getElementsByTagName("input");
            for(i=0;i<inputs.length;i++){
                if(inputs[i].name=="em"){
                    inputs[i].name="kurahen";
                    inputs[i].type="hidden";
                    dzie=inputs[i].parentNode;
                    dzie.innerHTML='<select name="em" style="width:100px"><option value="" selected="selected">Bump</option><option value="sage">Sage </option><option value="noko">Noko </option></select>';
                    break;
                    }
            }
    }
    window.addEventListener("load", lista, false);
     
    function bb(){  
        var subject=document.getElementsByName("subject");
            for(i=0;i<subject.length;i++){
                if(subject[i].name=="subject"){
                    dzie2=subject[i].parentNode;
                    dzie2.innerHTML="<input  type='submit' value='Wyślij' accesskey='z' />" + "<input type='button' value='b' onclick='tag1=\"[b]\"; tag2=\"[/b]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){      s1=(txt.value).substring(0, txt.selectionStart);        s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd); s3=(txt.value).substring(txt.selectionEnd, txt.textLength);     txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>" + "<input type='button' value='i' onclick='tag1=\"[i]\"; tag2=\"[/i]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){        s1=(txt.value).substring(0, txt.selectionStart);        s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd); s3=(txt.value).substring(txt.selectionEnd, txt.textLength);     txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>" + "<input type='button' value='u' onclick='tag1=\"[u]\"; tag2=\"[/u]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){        s1=(txt.value).substring(0, txt.selectionStart);        s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd); s3=(txt.value).substring(txt.selectionEnd, txt.textLength);     txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>" + "<input type='button' value='s' onclick='tag1=\"[s]\"; tag2=\"[/s]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){        s1=(txt.value).substring(0, txt.selectionStart);        s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd); s3=(txt.value).substring(txt.selectionEnd, txt.textLength);     txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>" + "<input type='button' value='spoiler' onclick='tag1=\"[spoiler]\"; tag2=\"[/spoiler]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){      s1=(txt.value).substring(0, txt.selectionStart);        s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd); s3=(txt.value).substring(txt.selectionEnd, txt.textLength);     txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>" + "<input type='button' value='small' onclick='tag1=\"[small]\"; tag2=\"[/small]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){    s1=(txt.value).substring(0, txt.selectionStart);        s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd); s3=(txt.value).substring(txt.selectionEnd, txt.textLength);     txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>" + "<input type='button' value='code' onclick='tag1=\"[code]\"; tag2=\"[/code]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){       s1=(txt.value).substring(0, txt.selectionStart);        s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd); s3=(txt.value).substring(txt.selectionEnd, txt.textLength);     txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
                    break;
                    }
            }
    }
    window.addEventListener("load", bb, false);
