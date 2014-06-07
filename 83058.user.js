// ==UserScript==
// @name            OMG! No Need Karma~
// @include         http://www.plurk.com/*
// @description    	04/08/2010 / Pacote de emoticons com todos os emoticons oficiais do Plurk.   
// author Juice Fruit~

// ********** Main Script ***********
var smileData = [];

smileData.push([
	'OMG! NnK~',
	'http://i784.photobucket.com/albums/yy124/poucopop/emotiplurk/NNK/',
	[ '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif','011.gif','012-3.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif','061.gif','062.gif','063.gif','064.gif','065.gif',
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
            if (document.getElementById('input_big')) { getById('input_big').addEventListener('keyup', replaceSmile, false); }
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
    getById('emoticons_show').style.height = '200px';
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
        str += '<a href="javascript:void 0;"><img width="40" src="'+_url+'" alt="'+dat[i]+'" title="['+ind+' '+i+']" /></a>';

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

// PlurkMark This!//

window.setInterval(
	function(){
		permalink_container = document.evaluate('//*[@class="perma_link"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		permalink = document.evaluate('//*[@class="perma_link"]/a[@href]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		plurkmarkthis = document.evaluate('//*[@id="plurkmarkThis"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		if(permalink != null && permalink_container != null){
			GM_log("Creating link");
			if(plurkmarkthis.singleNodeValue != null){
				permalink_container.singleNodeValue.removeChild(plurkmarkthis.singleNodeValue);
			}
			var plurkmark = document.createElement('a');
			plurkmark.innerHTML = "Juice Fruits~";
			plurkmark.setAttribute('id','plurkmarkThis');
			plurkmark.setAttribute('href', "http://www.plurk.com/CupCakeits");
			plurkmark.setAttribute('target','_blank');
			plurkmark.setAttribute('style','position:absolute;left:4px;');
                        
                          
			permalink_container.singleNodeValue.appendChild(plurkmark);
		}
	},
	5000
);

// ==/UserScript==