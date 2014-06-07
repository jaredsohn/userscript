// ==UserScript==
// @name       For Rule34
// @namespace  http://nigthadow.co.cc/
// @version    0.1
// @description  enter something useful
// @match      http://rule34.xxx/index.php?page=post&s=list*
// @copyright  2012+, You
// ==/UserScript==

var panel = document.createElement('div');
panel.style.position = 'fixed';
panel.style.top = '0';
panel.style.right = '0';
panel.style.zIndex = '9999';
document.body.appendChild(panel);
var slider = document.createElement('div');
slider.style.width = '100%';
slider.style.overflow = 'hidden';
slider.style.position = 'relative';
var inner = document.createElement('div');
slider.appendChild(inner);
var content = document.querySelector('#post-list .content');
content.insertBefore(slider, content.children[0]);
var pageTxt = document.createElement('span');
panel.appendChild(pageTxt);
var imgs = content.querySelectorAll('.preview');
for(var i = 0; i < imgs.length; i++){
    imgs[i].parentNode.parentNode.style.display = 'none';
    var img = document.createElement('img');
    img.src = 'http://img.rule34.xxx/rule34//images' + imgs[i].src.match(/\/[0-9]+\//g)[0] + imgs[i].src.match(/\/[^/]*$/)[0].replace('/thumbnail_', '');
    img.style.width = '100%';
    img.style.display = 'none';
    inner.appendChild(img);
}
var index = -1;
if(inner.children.length > 0){
    inner.children[0].style.display = 'block';
    index = 0;
    pageTxt.innerText = index + 1 + '/' + inner.children.length;
}
var slideLeft = document.createElement('div');
slideLeft.style.position = 'absolute';
slideLeft.style.left = '0';
slideLeft.style.top = '0';
slideLeft.style.height = '100%';
slideLeft.style.width = '40%';
slideLeft.style.cursor = 'pointer';
slideLeft.onclick = function(){
    if(index > 0){
        inner.children[index].style.display = 'none';
        index--;
        inner.children[index].style.display = 'block';
    }
    else{
        var aa = document.querySelectorAll('#paginator .pagination a');
        for(var i = 0; i < aa.length; i++){
            if(aa[i].innerText === '<'){
                aa[i].click();
            }
        }
    }
    pageTxt.innerText = index + 1 + '/' + inner.children.length;
};
slider.appendChild(slideLeft);

var slideRight = document.createElement('div');
slideRight.style.position = 'absolute';
slideRight.style.right = '0';
slideRight.style.top = '0';
slideRight.style.height = '100%';
slideRight.style.width = '40%';
slideRight.style.cursor = 'pointer';
slideRight.onclick = function(){
    if(index < inner.children.length - 1){
        inner.children[index].style.display = 'none';
        index++;
        inner.children[index].style.display = 'block';
    }
    else{
        var aa = document.querySelectorAll('#paginator .pagination a');
        for(var i = 0; i < aa.length; i++){
            if(aa[i].innerText === '>'){
                aa[i].click();
            }
        }
    }
    pageTxt.innerText = index + 1 + '/' + inner.children.length;
};
slider.appendChild(slideRight);

var sidebar = document.querySelector('#post-list .sidebar');
var toggleBtn = document.createElement('button');
toggleBtn.onclick = function(){
    if(sidebar.style.display === 'none'){
        sidebar.style.display = 'block';
        content.style.width = '77%';
    }
    else{
        sidebar.style.display = 'none';
        content.style.width = '100%';
    }
};
toggleBtn.innerText = 'ToggleSidebar';
panel.appendChild(toggleBtn);
toggleBtn.click();
var thumbnailBtn = document.createElement('button');
thumbnailBtn.onclick = function(){
    if(imgs.length > 0){
        var display = '';
        if(imgs[0].parentNode.parentNode.style.display === 'none'){
            display = 'block';
        }
        else{
            display = 'none';
        }
        for(var i = 0; i < imgs.length; i++){
            imgs[i].parentNode.parentNode.style.display = display;
        }
    }
};
thumbnailBtn.innerText = 'ToggleThumbnail';
panel.appendChild(thumbnailBtn);