// ==UserScript==
// @name       UFABC AutoGet Dados do Portal do Aluno
// @namespace  https://www.facebook.com/fernando.freitas.alves
// @version    0.2a
// @description  Executa um script que exporta as informações do portal do aluno e para o UFABC Help
// @author     Fernando Freitas Alves
// @copyright  2014+, Fernando Freitas Alves
// @include    http://aluno.ufabc.edu.br/*
// include    http://aluno.ufabc.edu.br/ficha_individual/*
// ==/UserScript==

var popup = null,
    message,
    targetOrigin_domain   = 'http://fernando-freitas-alves.github.io',
    targetOrigin_path     = '/ufabc/portal-do-aluno.html',
    targetOrigin          = targetOrigin_domain + targetOrigin_path,
    pathFichaIndividual   = 'aluno.ufabc.edu.br/ficha_individual',
    pathFichasIndividuais = 'aluno.ufabc.edu.br/fichas_individuais',
    timedMsg,
    ufabcHelpImg       = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYzI5NzI0My1kMTRhLTViNDctYmM0Ni04NDExMDNhOGFmZDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjgyMTRGRjVBMDQ2MTFFMzg2QkVGOEQzQTREMDQ1NjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjgyMTRGRjRBMDQ2MTFFMzg2QkVGOEQzQTREMDQ1NjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3NDVkMWUxLTc4OTAtZjY0MC04OTgzLTk5MzFlYTU5MWU4MiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDphYzI5NzI0My1kMTRhLTViNDctYmM0Ni04NDExMDNhOGFmZDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz58EgtLAAAB80lEQVR42uyXPyxDQRzHr0iLkmDwJ7FICAkWiQZtIsz+hGDoxmCwSBhswmIgEiJRJiOJBImOGqQa0UXYDK+LgRBhM/j7veSGl+a99t29u9cO75d8hr73671P7t/vzhOJRIhAdIJh0AuaQDX4Ai/gFlyCE6ARm1HEmd8HVkCXwTsvqGcMglVwBBZASlSwwGJeIVgDMRM5s7bHwB0YV92D22Ba8Btl4IB9a19FD07YkNN/Zxc0yBak82qDyIlyNn+lCtJFUUfkxQgolSnYQeSGD7TKFPQT+eGTKfioQPBJpuAZ+JMol+KtLtkENVayZMW6in1wBrxJkLsAOyoEn1ltfbchd882/F9VtfgadIMbQcFD8KrysEDjAfSAUXAOfjj+OwU8Thy36BAdMypAyOA8WAvmQInuf7QG97PTELfgFQhmyaO9NQ82dc8+QNQkf4/V8IG0XoyJDHHQQh49DwY42tXYwhrSHVbp1KhUOQdF4hS0gWW24YfzTZDGJ1gC7aDGKcFZ8M16JR26qTeaDPuiwfO4STuUuKhggM1Lo6gCzRxthTK9c2KIHb128oSX3WX8GapLKpeCdA/cyvC+BUzmchUXW+jhvNhmbN9XXcF8XMVRCzlhK6XPHWJX0BV0BV1BQhIW8uitLqn7neS8F4tG4l+AAQBmglsilfmTowAAAABJRU5ErkJggg==',
    ufabcHelpImgHover1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYzI5NzI0My1kMTRhLTViNDctYmM0Ni04NDExMDNhOGFmZDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTY3RkY0RENBMDQ2MTFFM0JBQjRCREEyN0Q5NTgxQjYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTY3RkY0REJBMDQ2MTFFM0JBQjRCREEyN0Q5NTgxQjYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmZlZjQxY2M4LTBiZDgtNTA0ZC1iMzdhLWQ5MDdkNGE4MGYzYSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDphYzI5NzI0My1kMTRhLTViNDctYmM0Ni04NDExMDNhOGFmZDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz48U6XoAAAB60lEQVR42uyXPyxDQRzHrzQtSoLBn1FCSLBINGgTkXT0JwRDNwaDRcJgExaLSCoSYTKSSETSjhqkGtFF2AztYiBE2Awo35OTvDT9c3fvrn3D+yWfoe/9eu+T+/s7BwkHiET0gjEwCNpAA/gEz+AGXIATkCQmwyEoOATWQR9Hbhocg2WQkhUs48wrBxsgyin33/YkuAVTsoJOzrwdMCf5jWpwyL51oKMHp03IGb+zB1pUC7pAiKiJGjZ/lQrSRdFM1MU4qFIp2EPUhht0qhT0EPXhVin4oEHwUaXgKfhRKJcSPV0KCSbZkaUqNnXsg/PgVYHcOdjVIfgERsCbCbk7tuGndZ3FV6AfXEsKHoEXncUCjXswACbAGfgW+O/sX+VUhHLLGLXAn6UebAKLoDIjP8CqIeFq5hL4CuTR3loCW4Zn7yCSI3+fneHDGb0YlRliH0cerQe9Au0m2cIaNRSrdGrU6ZyDMhEGXWCNbfhBqwnS+ACroBs0FktwAXyxXsmEbuqtOYZ9JcvzWI52KDFZQS+bl9miHrQLtOXP964YQ2wqnBrbdrG7jCfP6ZIqpSDdA7fzvO8AM6VcxRUcPWyJbcb0fdUWtOIqjnDkBHmOPnuIbUFb0Ba0BQmJc+TRW13C8DsheC+WjfivAAMAzWNZqvhm7pEAAAAASUVORK5CYII=',
    ufabcHelpImgHover2 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3FpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYzI5NzI0My1kMTRhLTViNDctYmM0Ni04NDExMDNhOGFmZDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkNFQzBGQjBBMDUxMTFFMzlBNDFDODk0RDU2QUE2QUIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkNFQzBGQUZBMDUxMTFFMzlBNDFDODk0RDU2QUE2QUIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmI5MDM5MDM5LTc4NjUtMmM0My05MjNmLTE2MWRmZmJjZjRiOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDphYzI5NzI0My1kMTRhLTViNDctYmM0Ni04NDExMDNhOGFmZDMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7TtvetAAADjElEQVR42uyXa0gUURTHz+zO7uTu5q6b5KNFSV2V8pVR+Sox/BCUSLElWVFJDxBEsY9BIEEFPUgiKQjsSxZUEFiUvcu10hSxD0GimyRWGKbRQ/Ox27nLKNvsnZ3Z3RG/7B9+LHvPYeY/M/fecy4DzcXgJYaFzoIGWG1cDiJag5QihYgVWYpMIcNIN/ICuYP0gwyZu8/B6NB9akxFGzxg3S1mrgh5jXQgR5ECJIo8EqJFLEgJcgbpRW4iCVIGCzijaMzboCEJLiaVCUfVyGnkCZID8kSubUN6kO2+ElM4k2iMFV6zLasWtCpWmNeAHILAZEBu8Pe6TkuI05rkvcGyxJ2QZ7IKc3YEYc7zPpcR6ryxcHIMhlmgMaVcGCfz6jwoo8XICVrApAmTNhhhTocwlZa2KGJAOW1FdMJBvYqTNrjHYKHFs0FZEScrvQYZVtpgtmEZLa4H5cX5O3ndytBTDQ7Og8EvARhkIFlPnWqPEZeC5hy06hLOSi0SRgNdPz/S4v18yVJKZ2mDDMNIGHRNQqG9GmzvG2HcOSnMqURGFDD3HLkUyAbKywm3HU2ge1kF7WN9njlf+fo6GoS5d/yG7wzCIK9fDsixV8HB3msw5ZyZHSUNQi7SHqBB0jR8EwuaWL0fBt2ahiu9V0HbWgXHB5rBMU66KPiA5CHbkGfIjB8GK/iOx28x1H6QWqiSYV90LtTErIfM8Hj3g/PtlrAfjEZqSfEUXKGY74a8NDb1ByJaSkUN2vE3X8IeeVtHkHr3P2MqnIrbDIdjN2Ad1dHyE/kavsVjrAnZRUsenvwBUQ9togbl7nPeN8Aaqo4pgpb4TbDRvAIv5vUVS3ijpGmdQGKFi23SOQ3c2zqcoW/8mYMy5fwLM0MPoPhVDaieVkBt3y0YmvjumdGMpCF1/Ib/X7tEFiHXdVLUXPBvUOyZl6yCysgssEVmQJ7RCpxKM/vZ9yLH3MvQ5QRNN54MPj+SXCSBGKzmq4Kakkde4Tqkb3YaQEQ6Gs6EUnMa5GNDrFNrIaGnHgYG75GMVn6x0WRnA/y4a0XMuQ9p5JgxZxCnAYx0QgOBPzGCDqfi709zZyZf56ng5mAgck17mpMUO49WtPxZRu+jujgW0iDZAy/4iKci+/2vxcppkYw3DAtpUBGFDAar+Vokd2XklAtLX+gThwyGDIYMhgzSDbbJyCOnug6P/x1+nosDVds/AQYAltnJHniRURwAAAAASUVORK5CYII=',
    ufabcHelpImgHover  = ufabcHelpImgHover2;

window.addEventListener("message", receiveMessage, false);

window.setTimeout(function()
{
    if (pathContains(pathFichaIndividual))
    {
        insertCSS('#top #ufabc-help       { width:      32px;' + '\n' +
                  '                         margin-top: 8px;' + '\n' +
                  '                         background-image:  url(' + ufabcHelpImg + ');' + '\n' +
                  '                         background-repeat: no-repeat; }' + '\n' +
                  '#top #ufabc-help:hover { background-image:  url(' + ufabcHelpImgHover + '); }');
        button = insertElement('li',
                               'ufabc-help',
                               'Exportar dados para o UFABC Help',
                               null,
                               exec,
                               document.getElementById('top').getElementsByTagName("UL")[0],
                               null,
                               'contatos');
    }
    else
    {
        if (popup !== null)
        {
            menuLateral = document.getElementById('menu_lateral');
            menuLateral.parentNode.removeChild(menuLateral);
            insertCSS('#conteudo { width: auto;}');
        }
        if (pathContains(pathFichasIndividuais))
        {
        	// TODO: Verificar se vale a pena autoselecionar o curso
        }
        else insertCSS('#conteudo { margin-left:  0;' +
                       '            margin-right: 420px;}');
    }
}, 0);

function pathContains(path)
{
    return location.href.indexOf(path) != -1;
}

function insertCSS(css)
{
    head  = document.head || document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet)
         style.styleSheet.cssText = css;
    else style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}

function getElement(element)
{
    elementObj = null;
    if (element !== null)
    {
        if (typeof element == 'string' && element != '')  elementObj = document.getElementById(element);
    	else  if (typeof element == 'object')             elementObj = element;
    }
    return elementObj;
}

function insertElement(type, id, title, innerHTML, onclick, target, before, after)
{
    elementTarget = getElement(target);
    if (elementTarget !== null)
    {
        elementBefore = getElement(before);
        elementAfter  = getElement(after);
        if (elementBefore === null &&
            elementAfter  !== null)                 elementBefore = elementAfter.nextSibling;
        
    	element = document.createElement(type);
        if (id        !== null && id        != '')  element.id        = id;
        if (title     !== null && title     != '')  element.title     = title;
        if (innerHTML !== null && innerHTML != '')  element.innerHTML = innerHTML;
        if (onclick   !== null && onclick   != '')  element.onclick   = onclick;
        
        if (elementBefore !== null)                 elementTarget.insertBefore(element, elementBefore);
        else                                        elementTarget.appendChild(element);
        return document.getElementById(id);
    }
    return null;
}

function exec()
{
    page  = document.getElementById('page');
    
    // Recupera o nome
    nome  = page.getElementsByTagName('p')[2].innerHTML;
    ini   = nome.lastIndexOf('>') + 1;
    lst   = nome.length;
    nome  = nome.substring(ini, lst).trim();
    
    // Recupera o e-mail institucional
    email = null;
    tabela = document.getElementsByTagName('a');
    for (i = 0; i < tabela.length; i++)
    	if (tabela[i].href == 'http://aluno.ufabc.edu.br/sair')
        {
            email = tabela[i].parentNode.innerHTML;
            ini   = 0;
            lst   = email.indexOf('|');
    		email = email.substring(ini, lst).trim();
            email = email + '@aluno.ufabc.edu.br';
            break;
        }
    
    // Recupera o RA
    RA    = page.getElementsByTagName('p')[3].innerHTML;
    ini   = RA.indexOf('>', RA.indexOf('>') + 1) + 1;
    lst   = RA.indexOf('&');
    RA    = RA.substring(ini, lst).trim();
    
    // Recupera o curso
    curso = page.getElementsByTagName('p')[3].innerHTML;
    ini   = curso.lastIndexOf('>') + 1;
    lst   = curso.length;
    curso = curso.substring(ini, lst).trim();
    
    // Recupera os quadrimestres e disciplinas cursadas
    quadAno       = [];
    quadNum       = [];
    discCodigo    = [];
    discNome      = [];
    discCreditos  = [];
    discConceito  = [];
    discSituacao  = [];
    discCategoria = [];
    k = 0;
    tabela = document.getElementsByClassName('ano_periodo');
    for (i = 0; i < tabela.length; i++)
        if (tabela[i] !== null)
        {
            // Recupera o quadrimestre e o ano
            quadAno[k] = tabela[i].innerHTML;
            ini        = 0;
            lst        = quadAno[k].indexOf(' de ');
            quadNum[k] = quadAno[k].substring(ini, lst).trim();
            ini        = lst + 4;
            lst        = quadAno[k].length;
            quadAno[k] = quadAno[k].substring(ini, lst).trim();
            
            // Recupera as disciplinas do quadrimestre
            discCodigo[k]    = [];
            discNome[k]      = [];
            discCreditos[k]  = [];
            discConceito[k]  = [];
            discSituacao[k]  = [];
            discCategoria[k] = [];
            l = 0;
            item = tabela[i].parentNode.nextSibling.nextSibling;
            while (item !== null && item.childNodes[1].className != 'ano_periodo')
            {
                discCodigo[k][l]    = item.childNodes[ 1].innerHTML;
                discNome[k][l]      = item.childNodes[ 3].innerHTML;
                discCreditos[k][l]  = item.childNodes[ 5].innerHTML;
                discConceito[k][l]  = item.childNodes[ 7].innerHTML;
                discSituacao[k][l]  = item.childNodes[ 9].innerHTML;
                discCategoria[k][l] = item.childNodes[11].innerHTML;
                do item = item.nextSibling
                while (item !== null && item.firstChild === null);
            	l++;
            }
            k++;
        }
    
    // Cria o arquivo XML
    XML   = document.createElement("div");
    aluno = document.createElement("aluno");
    
    // Nome
    nomeNode = document.createElement("nome");
    nomeNode.innerHTML = nome;
    aluno.appendChild(nomeNode);
    
    // E-mail institucional
    emailNode = document.createElement("email");
    emailNode.innerHTML = email;
    aluno.appendChild(emailNode);
    
    // RA
    RANode = document.createElement("RA");
    RANode.innerHTML = RA;
    aluno.appendChild(RANode);
    
    // Curso
    cursoNode = document.createElement("curso");
    cursoNode.innerHTML = curso;
    aluno.appendChild(cursoNode);
    
    // Quadrimestres e disciplinas
    historicoNode = document.createElement("historico");
    for (k = 0; k < quadNum.length; k++)
    {
        quadNumNode = document.createElement("quadrimestre");
        quadNumNode.setAttribute('ano', quadAno[k]);
        quadNumNode.setAttribute('num', quadNum[k]);
        for (l = 0; l < discCodigo[k].length; l++)
        {
        	disciplinaNode    = document.createElement("disciplina");
        	disciplinaNode.setAttribute('codigo', discCodigo[k][l]);
        	discNomeNode      = document.createElement("nome");
        	discCreditosNode  = document.createElement("creditos");
        	discConceitoNode  = document.createElement("conceito");
        	discSituacaoNode  = document.createElement("situacao");
        	discCategoriaNode = document.createElement("categoria");
        	discNomeNode.innerHTML      = discNome[k][l];
        	discCreditosNode.innerHTML  = discCreditos[k][l];
        	discConceitoNode.innerHTML  = discConceito[k][l];
        	discSituacaoNode.innerHTML  = discSituacao[k][l];
        	discCategoriaNode.innerHTML = discCategoria[k][l];
    		disciplinaNode.appendChild(discNomeNode);
    		disciplinaNode.appendChild(discCreditosNode);
    		disciplinaNode.appendChild(discConceitoNode);
    		disciplinaNode.appendChild(discSituacaoNode);
    		disciplinaNode.appendChild(discCategoriaNode);
            quadNumNode.appendChild(disciplinaNode);
        }
    	historicoNode.appendChild(quadNumNode);
    }
    aluno.appendChild(historicoNode);
    
    XML.appendChild(aluno);
    
    //document.getElementById('page').innerHTML = XML.innerHTML;
    //document.getElementById('page').innerHTML = btoa(XML.innerHTML);
    //document.getElementById('page').innerHTML = lzw_encode(XML.innerHTML);
    
    //location.href = "data:application/xml;charset=utf-8;base64," + btoa(XML.innerHTML);
    
    //downloadURI("data:application/xml;charset=utf-8," + XML.innerHTML, 'Portal do aluno - ' + nome + '.xml');
    /*
    XMLkey = "ufabc-help-aluno-XML";
    setStoreValue(XMLkey, XML.innerHTML);
    xmlDoc = parseXML(getStoreValue(XMLkey));
    alert(xmlDoc.getElementsByTagName("curso")[0].childNodes[0].nodeValue);
    */
    message      = btoa(XML.innerHTML);
    message      = encodeURIComponent(message);
    message 	 = 'aluno=' + message;
    if (popup === null)
    	popup    = window.open(targetOrigin);
    timedMsg     = setInterval(enviarMensagem, 1000);
    console.log('Envio repetitivo de mensagem iniciado.');
}

function enviarMensagem()
{
    if (popup !== null)
    {
        popup.postMessage(message, targetOrigin);
        console.log('Mensagem enviada.');
    }
}

function receiveMessage(event)
{
    console.log('Mensagem recebida.');
    console.log('Origem: ' + event.origin);
    if (event.origin !== targetOrigin_domain)
    {
        console.log('Site desconhecido.');
        return;
    }
    console.log('Site conhecido.');
    if (event.data == 'GetData')
    {
        popup = event.source;
        if (pathContains(pathFichaIndividual))
        {
            popup.postMessage('Page opened', event.origin);
            console.log('Mensagem enviada ao remetente.');
            exec();
        }
    }
    else if (event.data == 'Close page')
    {
        window.close();
    }
    else if (event.data == 'Page opened')
    {
    	popup.postMessage('Done', targetOrigin);
        console.log('Mensagem de conclusão enviada.');
        clearInterval(timedMsg);
        console.log('Envio repetitivo de mensagem cancelado com sucesso.');
    }
}

function downloadURI(uri, name)
{
    link = document.createElement('a');
    link.download = name;
    link.href = uri;
    link.click();
}

function parseXML(s)
{
    if (window.DOMParser)
    	xmlDoc = new DOMParser().parseFromString(s, "text/xml");
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(s);
    }
    return xmlDoc;
}


function setStoreValue(key, value)
{
    if (localStorage)
        localStorage.setItem(key, value);
    else $.cookies.set(key, value);
}

function getStoreValue(key) {
    if (localStorage)
         return localStorage.getItem(key);
    else return $.cookies.get(key);
}

function loadXMLDoc(dname) 
{
    if (window.XMLHttpRequest)
         xhttp = new XMLHttpRequest();                    // code for IE7+, Firefox, Chrome, Opera, Safari
    else xhttp = new ActiveXObject("Microsoft.XMLHTTP");  // code for IE6, IE5
    xhttp.open("GET", dname, false);
    xhttp.send();
    return xhttp.responseXML;
}

// LZW-compress a string
function lzw_encode(s)
{
    dict = {};
    data = (s + "").split("");
    out  = [];
    var currChar;
    phrase = data[0];
    code   = 256;
    for (i = 1; i < data.length; i++)
    {
        currChar = data[i];
        if (dict[phrase + currChar] != null)
            phrase += currChar;
        else
        {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase = currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (i = 0; i < out.length; i++)
        out[i] = String.fromCharCode(out[i]);
    return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s)
{
    dict      = {};
    data      = (s + "").split("");
    currChar  = data[0];
    oldPhrase = currChar;
    out       = [currChar];
    code      = 256;
    phrase;
    for (i = 1; i < data.length; i++)
    {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256)
             phrase = data[i];
        else phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        out.push(phrase);
        currChar   = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}