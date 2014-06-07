// ==UserScript==
// @name       HwmHelper
// @version    0.1
// @match      http://www.heroeswm.ru/frames.php?room=*
// @match      http://www.heroeswm.ru/frames.php
// ==/UserScript==
d = document;
chatline = d.getElementById('chatline');

chatline.addEventListener('load', DOMAddHelpers, false);

function DOMAddHelpers()
{
    chantline_td = chatline.contentDocument.getElementsByTagName('td')[5];
    helpers = d.createElement('select');
    helpers.id = 'helpers';
    
    values = GM_listValues();
    for (var cur_key in values) 
    {
        option = d.createElement('option');
        option.value = values[cur_key];
        option.innerHTML = values[cur_key];
        helpers.appendChild(option);
    }
    
    
    add_helper = d.createElement('a');
    add_helper.id = 'add_helper';
    add_helper.href = 'javascript:void(0)';
    add_helper.style.fontSize = '11px';
    add_helper.style.color = 'black';
    //add_helper.style.textDecoration = 'none';
    add_helper.innerHTML = 'Д';
    
    delete_helper = d.createElement('a');
    delete_helper.id = 'delete_helper';
    delete_helper.href = 'javascript:void(0)';
    delete_helper.style.fontSize = '11px';
    delete_helper.style.color = 'black';
    delete_helper.style.marginLeft = '1px';
    //add_helper.style.textDecoration = 'none';
    delete_helper.innerHTML = 'У';
    
    chantline_td.appendChild(helpers);
    chantline_td.appendChild(add_helper);
    chantline_td.appendChild(delete_helper);
    
    helpers.addEventListener('change', UpdateMessage, false);
    add_helper.addEventListener('click', ShowPopup, false);
    delete_helper.addEventListener('click', DeleteHelper, false);
}

function UpdateHelpers()
{
    helpers = chatline.contentDocument.getElementById('helpers');
    helpers.innerHTML = '';
    
    values = GM_listValues();
    for (var cur_key in values) 
    {
        option = d.createElement('option');
        option.value = values[cur_key];
        option.innerHTML = values[cur_key];
        helpers.appendChild(option);
    }
}

function UpdateMessage()
{
   chatline.contentDocument.getElementsByTagName('input')[3].value = GM_getValue(chatline.contentDocument.getElementById('helpers').value);
}

function ShowPopup()
{
    popup = d.createElement('div');
    popup.id = 'popup';
    popup.style.position = 'absolute';
    popup.style.top = '30%';
    popup.style.left = '30%';
    popup.style.border = '1px solid rgb(170, 187, 204)';
    popup.style.borderRadius = '5px';
    popup.style.backgroundColor = 'rgb(255, 255, 255)';
    popup.style.opacity = '0.98';
    popup.style.padding = '5px';
    
    
    p1 = d.createElement('p');
    p1.innerHTML = 'Название: ';
    title = d.createElement('input');
    title.id = 'helper_title';
    title.type = 'text';
    title.style.width = '527px';
    
    p2 = d.createElement('p');
    p2.innerHTML = 'Текст: <br>';
    text = d.createElement('textarea');
    text.id = 'helper_text';
    text.style.width = '600px';
    text.style.height = '100px';
    
    submit_button = d.createElement('button');
    submit_button.innerHTML = 'Добавить';
    
    popup_close = d.createElement('div');
    popup_close.style.float = 'right';
    popup_close.style.lineHeight = '19px';
    popup_close.style.marginLeft = '10px';
    
    popup_close_image = d.createElement('img');
    popup_close_image.style.width = '24px';
    popup_close_image.src = 'http://hwmguide.ru/images/upload/7d67d865.png';
    
    popup_close_image.addEventListener('click', HidePopup, false);
    submit_button.addEventListener('click', AddHelper, false);
    
    p1.appendChild(title);
    p2.appendChild(text);
    popup_close.appendChild(popup_close_image);
    
    popup.appendChild(p1);
    popup.appendChild(p2);
    popup.appendChild(submit_button);
    popup.appendChild(popup_close);
    d.getElementsByTagName('html')[0].appendChild(popup);
    
    
}

function HidePopup()
{
    d.body.parentNode.removeChild(d.getElementById('popup'));
}

function AddHelper()
{
    title = d.getElementById('helper_title').value;
    console.log(title);
    text = d.getElementById('helper_text').value;
    console.log(text);
    if(GM_getValue(title) !== undefined)
    {
        alert('Такой хелпер уже существует!');
    }
    else
    {
        if(title.toString() !== '' && text.toString() !== '')
        {
            GM_setValue(title, text);
            HidePopup();
            UpdateHelpers();
        }
        else
        {
            alert('Не введено название или текст хелпера.');
        }
    }
}

function DeleteHelper()
{
    GM_deleteValue(chatline.contentDocument.getElementById('helpers').value);
    UpdateHelpers();
}