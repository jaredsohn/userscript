// ==UserScript==
// @name       get user of ip
// @version    0.2
// @description  enter something useful
// @run-at         document-end
// @grant       none
// @include http://*.inn.co.il/Forum/Forum.aspx/*
// @copyright  2012+, shmuelj
// ==/UserScript==
(function(h){h.deparam=function(i,j){var d={},k={"true":!0,"false":!1,"null":null};h.each(i.replace(/\+/g," ").split("&"),function(i,l){var m;var a=l.split("="),c=decodeURIComponent(a[0]),g=d,f=0,b=c.split("]["),e=b.length-1;/\[/.test(b[0])&&/\]$/.test(b[e])?(b[e]=b[e].replace(/\]$/,""),b=b.shift().split("[").concat(b),e=b.length-1):e=0;if(2===a.length)if(a=decodeURIComponent(a[1]),j&&(a=a&&!isNaN(a)?+a:"undefined"===a?void 0:void 0!==k[a]?k[a]:a),e)for(;f<=e;f++)c=""===b[f]?g.length:b[f],m=g[c]=
f<e?g[c]||(b[f+1]&&isNaN(b[f+1])?{}:[]):a,g=m;else h.isArray(d[c])?d[c].push(a):d[c]=void 0!==d[c]?[d[c],a]:a;else c&&(d[c]=j?void 0:"")});return d}})(jQuery);


$(".Links").append('<span id="cip" class="Link Letter"> בדוק IP</span>');
$("#cip").click(function(){abcd();});
window.abcd = function (){
    var reg = /new Forum.Topic\(\d+,\d+,(\d+)/g;
    var ip = prompt("מה הIP?");
    var divi = $("<div style='position: absolute;top: 100px;left: 100px;border: solid 3px #476d84;background: white;'></div>")
    $(document.body).append(divi);
    var Scount = 0;
    var Scount_div = $("<span>0</span>");
    var Pcount = 0;
    var Pcount_div = $("<span>0</span>");
    divi.append($("<p>דפים בבדיקה: </p>").append(Pcount_div));
    divi.append($("<p>שרשורים בבדיקה: </p>").append(Scount_div));
    var niks = [];
    var psges = [];
    for (var j=1;j<4;j++){
        Pcount++;
        Pcount_div.html(Pcount);
        $.get("http://" + location.host + "/Forum/Forum.aspx/f" + Forum.ID+"-"+j,function(data){
            Pcount--;
            Pcount_div.html(Pcount);
            
            while (match = reg.exec(data)) {
                Scount++;
                Scount_div.html(Scount);
                $.post('/Forum/Admin/Admin.ashx',{js: 1,action: "ip",forum_id: Forum.ID,Topic_ID:match[1]},function(data,b,c){
                    eval(data.split("\n")[0].replace("/*ok*/ (function () {",""));
                    Scount--;
                    Scount_div.html(Scount);
                    console.log(this);
                    for(var i=0;i<arr.length;i++){
                        
                        if(arr[i][5]==ip){
                            //console.log(arr[i])
                            if (!niks[arr[i][4]]){
                                niks[arr[i][4]] = $('<p></br><a  href=/Forum/lmf_Profile.aspx/'+arr[i][4]+'>'+(arr[i][3]+'').toHTML()+'</a>:<span id="sirsor"></span></p>')
                                divi.append(niks[arr[i][4]])
                            }
                            niks[arr[i][4]].find('#sirsor').append('<a href=/Forum/Forum.aspx/t'+$.deparam(this.data).Topic_ID+'#'+arr[i][0]+'>'+(arr[i][1]+'').toHTML()+'</a>&gt;');
                        }
                        
                    }
                });
            }
            
        });
    }
}