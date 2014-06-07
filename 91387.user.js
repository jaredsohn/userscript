// ==UserScript==
// @name          سيكربت إظهار هدف المقاليع من تعريب أخوكم : محمد احمد 20
// @description   Zeigt in Angriffen mit Katapulten das Zielgebäude in der Befehlsinfo an
// @namespace     تعريب : محمد احمد 20
// @include       http://*ae.tribalwars.ae/game.php?*screen=place*try=confirm*
// @include       http://*.die-staemme.de/game.php?*screen=info_command*id=*type=own*
// @exclude       http://forum.die-staemme.de/*
// ==/UserScript==

// ds.catsAimsInCommand.user.js

// {$ dsScript $}
// version = 1.0
// author = تعريب أخوكم محمد احمد 20
// clients = firefox
// areas = .ae
// worlds = all
// premium = works
// description[de] = يقوم هذا السيكربت بإظهار هدف المقاليع 
// screenshot[0] = http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.catsAimsInCommand_0.png
// {$ /dsScript $}


// (c) by C1B1SE

var buildings = {
  'مركز القرية'	:	'Hauptgeb%E4ude',
  'الثكنات'	:	'Kaserne',
  'الإسطبل'	:	'Stall',
  'الورشة'	:	'Werkstatt',
  'الأكادمية'	:	'Adelshof',
  'الحداد'	:	'Schmiede',
  'نقطة التجمع'	:	'Versammlungsplatz',
  'النصب التذكاري'	:	'Statue',
  'السوق'	:	'Marktplatz',
  'الخشاب'	:	'Holzfäller',
  'حفرة الطمي'	:	'Lehmgrube',
  'منجم الحديد'	:	'Eisenmine',
  'المزارع'	:	'Bauernhof',
  'المخازن'	:	'Speicher',
  'الحائط'	:	'Wall'
  };


var dom = new html();
var page = new page('catsAims_');

function page(prefix)
  {
  this.url = document.location.href;
  this.world = this.url.split('//')[1].split('.')[0];
  this.prefix = prefix + this.world + '_';
  this.GM = (typeof GM_setValue == typeof function(){});

  this.buildings = eval(buildings);

  this.load = function(key)
    {
    key = this.prefix + key;
    if(!this.GM)
      {
      var value = document.cookie.match('/'+key+'=(.*?)(?:;|$)/');
      if(value)
        return unescape(value[1]);
      return false;
      }
    else
      {
      return GM_getValue(key);
      }
    }

  this.save = function(key,value,add,deli)
    {
    if(add)
      {
      value = (this.load(key)!=''?(this.load(key)+(deli?deli:'')):'')+value;
      }
    key = this.prefix + key;
    if(!this.GM)
      {
      value = escape(value);
      document.cookie = key+'='+value+'; تنتهي='+(new Date(2050, 1, 1)).toGMTString()+';';
      }
    else
      GM_setValue(key,value);
    }


  this.action_saveAttack = function()
    {
    var dom = new html();
    if(dom.name('المباني')[0])
      {
      var old = dom.findByAttr(document,'القيمة','موافق')[0];
      old.setAttribute('id','oldOK');
      old.style.display = 'لا شيئ';
      var inp = dom.n('input');
      inp.setAttribute('نوع','زر');
      inp.setAttribute('القيمة','موافق');
      dom.addEvent(inp,'click',function()
        {
        var targetId = dom.trim(dom.findByInner(document,'Ziel:')[0].parentNode.getElementsByTagName('a')[0].href.split('=').pop());
        var originId = dom.trim(document.location.href.split('&')[0].split('=').pop());
        var duration = dom.findByInner(document,'Dauer:')[0].parentNode.getElementsByTagName('td')[1].firstChild.data.split(':');
        var now = new Date();
        now = now.getTime();
        now += parseInt(duration[0]*60*60*1000);
        now += parseInt(duration[1]*60*1000);
        now += parseInt(duration[2]*1000);
        var aim;
        for(var re, i = 0,elist = dom.name('المباني')[0].getElementsByTagName('الخيارات'), len = elist.length; i < len; i++)
          if(elist[i].selected)
            aim = elist[i].value;
        var value = originId+','+targetId+','+now+','+aim;
       page.save('الهجمات',value,true,';');
        dom.id('oldOK').click();
        });
      old.parentNode.insertBefore(inp,old);
      }
    }

  this.action_showAttack = function(position)
    {
    var dom = new html();
    var catCell = dom.findByAttr(document,'العنوان','Katapult');
    if(catCell[0])
      {
      var table = catCell[0].parentNode.parentNode.parentNode;
      for(var i = 0,elist = table.getElementsByTagName('tr')[0].getElementsByTagName('th'), len = elist.length; i < len; i++)
        {
        if(elist[i] == catCell[0].parentNode)
          {
          if(table.getElementsByTagName('tr')[1].getElementsByTagName('td')[i].firstChild.data != '0')
            {
            var origin = dom.trim(dom.findByInner(document,'Dorf:')[0].parentNode.getElementsByTagName('a')[0].href.split('=').pop());
            var target = dom.trim(dom.findByInner(document,'Dorf:')[1].parentNode.getElementsByTagName('a')[0].href.split('=').pop());
            var value = this.load('الهجمات');
            var p = value.indexOf(origin+','+target);
            if(p != -1)
              {
              var data = value.split(';');
              var attacks = new Array();
              var now = new Date();
              now = now.getTime();
              for(var i = 0, len = data.length; i < len; i++)
                {
                var tmp = data[i].split(',');
                if(parseInt(tmp[2]) < now)
                  {
                  delete(data[i]);
                  this.save('الهجمات',data.join(';'));
                  }
                else if(data[i].indexOf(origin+','+target) != -1)
                  {
                  var arrival = dom.findByInner(document,'Ankunft:')[0].parentNode.getElementsByTagName('td')[1].firstChild.data.split(' ');
                  arrival[0] = arrival[0].split('.');
                  arrival[1] = arrival[1].split(':');
                  var time = new Date();
                  with(time)
                    {
                    setDate(arrival[0][0]);
                    setMonth(parseInt(arrival[0][1])-1);
                    setFullYear('20'+arrival[0][2]);
                    setHours(arrival[1][0]);
                    setMinutes(arrival[1][1]);
                    setSeconds(arrival[1][2]);
                    }
                  time = time.getTime() / 1000;
                  tmp[2] = parseInt(tmp[2]) / 1000;

                  if(tmp[2] < time+60 && tmp[2] > time-60)
                    {
                    var tr = dom.n('tr');

                    var td = dom.n('td');
                    td.setAttribute('colspan',2);
                    td.appendChild(dom.text('Katapultziel:'));
                    tr.appendChild(td);

                    var td = dom.n('td');
                    td.appendChild(dom.text(unescape(this.buildings[tmp[3]])));
                    tr.appendChild(td);

                    var arrival_in = dom.findByInner(document,'Ankunft in:')[0];
                    arrival_in.parentNode.parentNode.insertBefore(tr,arrival_in.parentNode.nextSibling);

                    break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }


  // Constructor
  if(this.url.indexOf('screen=place') != -1 && this.url.indexOf('try=confirm') != -1)
    {
    this.action_saveAttack();
    }

  else if(this.url.indexOf('screen=info_command') != -1 && this.url.indexOf('type=own') != -1)
    {
    this.action_showAttack();
    }

  }



function html()
  {
  // (c) c1b1.de
  // Do not change or use without permission

  this.n = function(type)
    {
    return document.createElement(type);
    }

  this.text = function(c)
    {
    return document.createTextNode(c);
    }

  this.id = function(type)
    {
    return document.getElementById(type);
    }

  this.tag = function(type)
    {
    return document.getElementsByTagName(type);
    }

  this.name = function(type)
    {
    return document.getElementsByName(type);
    }

  this.class = function(type)
    {
    return document.getElementsByClassName(type);
    }

  this.findByAttr = function(obj,attr,value)
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i][attr] == value)
        {
        list[a] = obj.getElementsByTagName('*')[i];
        a++;
        }
      }
    list['length'] = a;
    return list;
    }

  this.findByInner = function(obj,value)
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i].firstChild)
        {
        if(obj.getElementsByTagName('*')[i].firstChild.data)
          {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1)
            {
            list[a] = obj.getElementsByTagName('*')[i];
            a++;
            }
          }
        }
      }
    list['length'] = a;
    return list;
    }

  this.appendChilds = function(obj)
    {
    for(var i = 1; i < arguments.length; i++)
      arguments[0].appendChild(arguments[i]);
    }

  this.removeChilds = function(obj)
    {
    while(obj.firstChild)
      {
      obj.removeChild(obj.firstChild);
      }
    }

  this.dumpObj = function(e,html,count)
    {
    if(!count)
      count = 0;
    var spaces = '  ';
    for(var i = 0; i < count; i++)
      spaces += '  ';
    if(html)
      n = '<br />\n';
    else
      n = '\n';
    var o = '( '+typeof(e)+' )'+n;
    for(var p in e)
      o+= spaces+p+' = '+'( '+typeof(e[p])+' ) '+(typeof(e[p]) == 'object'?(this.dumpObj(e[p],html,(count+2))):e[p])+n;
    return o;
    }

  this.trim = function(str)
    {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
    }

  this.mouseEventTarget = function(e)
    {
    if(e.target)
      return e.target;
    else if (e.srcElement)
      return e.srcElement;
    else
      return false;
    }


  // Flexible Javascript Events by John Resig (ejohn.org)
  // http://ejohn.org/projects/flexible-javascript-events/
  this.addEvent = function( obj, type, fn )
    {
    if(obj.attachEvent)
      {
      obj['e'+type+fn] = fn;
      obj[type+fn] = function(){obj['e'+type+fn](window.event);}
      obj.attachEvent( 'on'+type, obj[type+fn] );
      }
    else
      obj.addEventListener( type, fn, false );
    }

  this.removeEvent = function( obj, type, fn )
    {
    if(obj.detachEvent)
      {
      obj.detachEvent( 'on'+type, obj[type+fn] );
      obj[type+fn] = null;
      }
    else
      obj.removeEventListener( type, fn, false );
    }

  return true;
  }