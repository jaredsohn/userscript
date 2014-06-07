// ==UserScript==
// @name            plurk smile v1.0
// @namespace       http://userscripts.org/
// @description     麦咪和熊熊(預備用)
// @include         http://www.plurk.com/*
// modified log:   
// ==/UserScript==


// ********** Main Script ***********
var smileData = [];

smileData.push([
	'麦咪和熊熊',
	'http://i678.photobucket.com/albums/vv145/yayun68/maimi/',
	[
		'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
		'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
		'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
		'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
		'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
		'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
		'61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif',
		'71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif',
		'81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif',
		'91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif',
        ]
]);

smileData.push([
	'麦咪和熊熊2',
	'http://i678.photobucket.com/albums/vv145/yayun68/maimi/',
	[
		'101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',
		'111.gif','112.gif','113.gif','114.gif','115.gif','16.gif','117.gif','118.gif','119.gif','120.gif',
		'121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','129.gif','130.gif',
		'131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','37.gif','138.gif','139.gif','140.gif',
		'141.gif','142.gif','143.gif','144.gif','145.gif','146.gif','417.gif','148.gif','149.gif','150.gif',
		'151.gif','152.gif','153.gif','154.gif','155.gif','156.gif','157.gif','158.gif','159.gif','160.gif',
		'161.gif','162.gif','163.gif','164.gif','165.gif','166.gif','167.gif','168.gif','169.gif','170.gif',
		'171.gif','172.gif','173.gif','174.gif','175.gif','176.gif','177.gif','178.gif','179.gif','180.gif',
		'181.gif','182.gif','183.gif','184.gif','185.gif','186.gif','187.gif','188.gif','189.gif','190.gif',
		'191.gif','192.gif',		
        ]
]);


var isinit = false;
var currInput = null;
var rplreg = /\[(\d+) (\d+)\]/g;
var pageState = location.href.split('/')[3];

window.addEventListener('load', function()
{
    setTimeout(function()
    {
        var selImgs = document.getElementsByClassName('smily_holder');

        // bind key up event
        if(pageState == 'p')
            getById('input_permalink').addEventListener('keyup', replaceSmile, false);
        else
        {
            getById('input_big').addEventListener('keyup', replaceSmile, false);
            getById('input_small').addEventListener('keyup', replaceSmile, false);
        }

        // create tabs
        for(var i=0; i<selImgs.length; i++)
        {
            selImgs[i].setAttribute('ref', selImgs.length - i);
            selImgs[i].addEventListener('click', function()
            {
                isinit || setTimeout(init, 1000);
                currInput = pageState != 'p' ? this.getAttribute('ref') == 2 ? getById('input_big') : getById('input_small') : getById('input_permalink');
            }, false);
        }
    }, 2000);
}, false);


// init
function init()
{
    isinit = true;
    // init contents
    for(var i=0; i<smileData.length; i++)
    {
        addTab(i, smileData[i]);
    }
    // init css
    getById('emoticons_show').style.width  = '100%';
    getById('emoticons_show').style.height = '150px';
    getById('emoticons_show').style.overflow = 'auto';
}

function replaceSmile()
{
    if(rplreg.test(this.value))
        this.value = this.value.replace(rplreg, doReplace);
}

function doReplace(str, datid, smileid)
{
    arr = smileData[datid];
    if (typeof(arr) != 'undefined')
    {
        if(typeof(arr[2][smileid]) != 'undefined')
            str = ' ' + smileData[datid][1] + smileData[datid][2][smileid] + ' ';
    }
    return str;
}

function addTab(id, data)
{
    var myli = document.createElement('li');
    myli.className = 'emoticon_selecter';
    myli.innerHTML = '<a href="javascript:void 0;">'+data[0]+'</a>';
    myli.addEventListener('click', function()
    {
        addImages(this, id);
    }, false);

    getById('emoticons_tabs').getElementsByTagName('ul')[0].appendChild(myli);
}

function addImages(obj, ind)
{
    var showDiv = getById('emoticons_show');
    var lis = getById('emoticons_tabs').getElementsByTagName('li');
    for(var i=0; i<lis.length; i++)
        lis[i].className = 'emoticon_selecter';

    obj.className += ' current';

    var data = smileData[ind];
    var baseUrl = data[1];
    var str = '<div>';
    for(var i=0, dat = data[2], _url; i<dat.length; i++)
    {
        _url = baseUrl + dat[i];
        str += '<a href="javascript:void 0;"><img src="'+_url+'" alt="'+dat[i]+'" title="['+ind+' '+i+']" /></a>';

    }
    str += '</div>';
    showDiv.innerHTML = str;
    
    var imgs = showDiv.getElementsByTagName('img');
    for(var i=0; i<imgs.length; i++)
    {
        imgs[i].addEventListener('click', function()
        {
            currInput.value += ' ' + this.src + ' ';
            currInput.focus();
        }, false);
    }
}

function getById(oid)
{
    return document.getElementById(oid);
}