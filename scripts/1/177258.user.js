// ==UserScript==
// @name        Delview Travian Autofarm
// @description Simple script for farming. (no help info)
// @namespace   ILLEGAL
// @include     http://s2.delviewtravian.com/v2v.php*
// @include     http://s2.delviewtravian.com/build.php?id=39
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.0
// ==/UserScript==

function create_cookie(name,value){
    document.cookie=name+"="+encodeURIComponent(value);
}

function del_cookie(name){
    var now=new Date();
    document.cookie=name+"=; expires="+now.toUTCString();
}

function get_cookie(name){
    var pos=document.cookie.indexOf(name+"=");

    if (pos==-1) return null;

    var start=document.cookie.indexOf("=",pos)+1;
    var end=document.cookie.indexOf(";",start);
    if (end==-1) end=document.cookie.length;

    return decodeURIComponent(document.cookie.substring(start,end));
}

var list_div=
    '<div id="farm_div">' +
        '<table id="farm_table" style="width:200px;border-style:double;">' +
        '<tr>' +
            '<td width="45%"><h3>x</h3></td>' +
            '<td width="45%"><h3>y</h3></td>' +
            '<td width="10%" colspan="2"><h3>+/-</h3></td>' +
        '</tr>' +
        '<tr id="before">' +
            '<td><input id="x" size="4" type="text"></td>' +
            '<td><input id="y" size="4" type="text"></td>' +
            '<td><input id="do" type="button" value="+"></td>' +
        '</tr>' +
        '<tr><td><br></td></tr><tr><td><br></td></tr>' +
        '</table>' +
        '</div>';

var units=get_cookie("TA-CK");
if(units==null){
    units=['[CLICK]','[CLICK]'];
    create_cookie("TA-CK",units);
}
else units=units.split(',');


var def_div=
    '<div id="def_div">' +
        '<table>' +
        '<tr>' +
            '<td style="text-align:center"><input id="go" type="button" value="Go"></td>' +
            '<td style="text-align:center"><input id="end" type="button" value="End"></td>' +
            '<td style="text-align:center"><input id="clear" type="button" value="Clear All"></td>' +
        '</tr>' +
        '<tr>' +
            '<td colspan="2" style="text-align:center">Clubswingers<b>:</b></td>' +
            '<td style="text-align:center;color:red" id="clubswingers">'+units[0]+'</td>' +
        '</tr>' +
        '<tr>' +
            '<td colspan="2" style="text-align:center">Teutonic Knights<b>:</b></td>' +
            '<td style="text-align:center;color:red" id="knights">'+units[1]+'</td>' +
        '</tr>' +
        '</table>' +
        '</div>';

$('table#vlist').append(def_div);
$('table#vlist').append(list_div);
$('div#farm_div').css({
    'position':'absolute',
    'top':'70px',
    'left':'190px'
});
$('div#def_div').css({
    'position':'absolute',
    'top':'0px',
    'left':'190px'
});
$('table#farm_table tr td').css({
    'text-align':'center'
});

var num=get_cookie("TA-NOV");
if(num==null){
    create_cookie("TA-NOV",0);
    num=0;
}
else num=parseInt(num);

var cb=get_cookie("TA-CB");
if(cb!=null&&cb!='') cb=cb.split(',');
else
if(cb=='') cb=[];
else{
    create_cookie("TA-CB",'');
    cb=[];
}

var v=get_cookie("TA-CP");
if(v==null){
    create_cookie("TA-CP",'');
    v=[];
}
else
if(v=='') v=[];
else{
    v=v.split(',');

    for(i=0;i<num;++i){
        var q=v[i].split(':');
        if(cb[i]=='1') $('tr#before').before('<tr><td style="text-align:center">'+q[0]+'</td><td style="text-align:center">'+q[1]+'</td><td><input id="set" name="'+v[i]+'" type="checkbox" checked></td><td><input id="del" name="'+v[i]+'" type="button" value="-"></td></tr>');
        else $('tr#before').before('<tr><td style="text-align:center">'+q[0]+'</td><td style="text-align:center">'+q[1]+'</td><td><input id="set" name="'+v[i]+'" type="checkbox" unchecked></td><td><input id="del" name="'+v[i]+'" type="button" value="-"></td></tr>');
    }
}

$('input#do').click(function(){
    var str=$('input#x').val()+':'+$('input#y').val();
    if(str==':'){
        alert('Empty coords not allowed!');
        return;
    }
    if(v.indexOf(str)!=-1){
        alert('Coords already added!');
        return;
    }

    $('tr#before').before('<tr><td style="text-align:center">'+$('input#x').val()+'</td><td style="text-align:center">'+$('input#y').val()+'</td><td><input id="set" name="'+str+'" type="checkbox" checked></td><td><input id="del" name="'+str+'" type="button" value="-"></td></tr>');

    var ret=get_cookie("TA-CP");
    if(ret!=null&&ret!='') ret+=',';
    else ret='';
    ret+=str;
    del_cookie("TA-CP");
    create_cookie("TA-CP",ret);
    v[num]=str;

    ret=get_cookie("TA-CB");
    if(ret!=null&&ret!='') ret+=',';
    else ret='';
    ret+='1';
    del_cookie("TA-CB");
    create_cookie("TA-CB",ret);
    cb[num]='1';

    num++;
    del_cookie("TA-NOV");
    create_cookie("TA-NOV",num);

    $('input#x').val('');
    $('input#y').val('');
});

$(document).on('click','input#del',function(){
    var idx=$(this).parent().parent().find('td:eq(0)').html()+':'+$(this).parent().parent().find('td:eq(1)').html();
    idx=v.indexOf(idx);
    v.splice(idx,1);
    cb.splice(idx,1);
    num--;
    del_cookie("TA-CP");
    del_cookie("TA-CB");
    del_cookie("TA-NOV");
    create_cookie("TA-CP",v);
    create_cookie("TA-CB",cb);
    create_cookie("TA-NOV",num);
    $(this).parent().parent().remove();
});

$(document).on('click','input#set',function(){
    var idx=$(this).parent().parent().find('td:eq(0)').html()+':'+$(this).parent().parent().find('td:eq(1)').html();
    idx=v.indexOf(idx);

    cb[idx]=(1-parseInt(cb[idx])).toString();
    del_cookie("TA-CB");
    create_cookie("TA-CB",cb);
});

$('input#clear').click(function(){
    del_cookie("TA-RUNNING");
    del_cookie("TA-CK");
    del_cookie("TA-CB");
    del_cookie("TA-CP");
    del_cookie("TA-NOV");
    del_cookie("TA-AT");
    location.reload();
});

$('td#clubswingers').click(function(){
    units[0]=prompt('Enter the number of Clubswingers to send for a raid.\nTo change this value again, just click it as before.\n\n');
    $(this).html(units[0].toString());
    del_cookie("TA-CK");
    create_cookie("TA-CK",units);
});
$('td#knights').click(function(){
    units[1]=prompt('Enter the number of Teutonic Kights to send for a raid.\nTo change this value again, just click it as before.\n\n');
    $(this).html(units[1].toString());
    del_cookie("TA-CK");
    create_cookie("TA-CK",units);
});
function redo(){
    window.location='http://s2.delviewtravian.com/v2v.php';
}

function attack(){
    var running=get_cookie('TA-RUNNING');

    if(running=='st1'){
        var at=get_cookie("TA-AT");
        if(at==null) at=0;
        else at=parseInt(at);
        if(at>=num) at=0;

        while(cb[at]=='0'){
            at++;
            if(at>=num) at=0;
        }

        var av1=$('table#troops>tbody>tr:eq(0)>td:eq(0)>a').html();
        av1=parseInt(av1.substring(1,av1.length-1));

        var av6=$('table#troops>tbody>tr:eq(2)>td:eq(1)>a').html();
        av6=parseInt(av6.substring(1,av6.length-1));

        if(av1<parseInt(units[0])||av6<parseInt(units[1])){
            setTimeout(redo,25000);
            return;
        }

        $('input#t1.text').val(units[0]);
        $('input#t6.text').val(units[1]);

        var q=v[at].split(':');
        $('td.target input.text:eq(0)').val(q[0]);
        $('td.target input.text:eq(1)').val(q[1]);

        $('table#coords>tbody>tr:eq(2)>td:first').find('input').attr('checked','');

        del_cookie("TA-AT");
        create_cookie('TA-AT',at+1);

        del_cookie('TA-RUNNING');
        create_cookie('TA-RUNNING','st2');
    }
    else
    {
        del_cookie('TA-RUNNING');
        create_cookie('TA-RUNNING','st3');
    }

    $('input#btn_ok').trigger('click');
}
$('input#end').click(function(){
    del_cookie('TA-RUNNING');

    window.location='http://s2.delviewtravian.com/v2v.php';
});
$('input#go').click(function(){
    if(units[0]=='[CLICK]'||units[1]=='[CLICK]'||units[2]=='[CLICK]'){
        alert('Please set the number of units to send for a raid\nbefore running the script.');
        return;
    }
    if(num==0){
        alert('Please enter the coords of at least one village.');
        return;
    }

    create_cookie("TA-RUNNING",'st1');

    var delay=Math.random()*7+5;
    setTimeout(attack,delay*1000);
});

var running=get_cookie("TA-RUNNING");
if(running=='st1'&&window.location=='http://s2.delviewtravian.com/build.php?id=39'){
    window.location='http://s2.delviewtravian.com/v2v.php';
}
else
if(running=='st3'){
    del_cookie('TA-RUNNING');
    create_cookie('TA-RUNNING','st1');
    window.location='http://s2.delviewtravian.com/v2v.php';
}
else
if(running=='st1'||running=='st2'){
    var delay=Math.random()*7+5;
    setTimeout(attack,delay*1000);
}
