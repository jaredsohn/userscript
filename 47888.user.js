// ==UserScript==
// @name           FreeBase HTML Tables
// @namespace      FreeBase HTML Tables
// @description    Augments HTML tables with data from Freebase, and allows you to quickly contribute data from the table to Freebase.
// @include        *
// ==/UserScript==

USERNAME=""
PASSWORD=""

/**   
  * Version: 1.0 Alpha-1    * Build Date: 13-Nov-2007   * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.   
  * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.    
  * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/   
  */  
Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|after|from)/i,subtract:/^(\-|before|ago)/i,yesterday:/^yesterday/i,today:/^t(oday)?/i,tomorrow:/^tomorrow/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^min(ute)?s?/i,hour:/^h(ou)?rs?/i,week:/^w(ee)?k/i,month:/^m(o(nth)?s?)?/i,day:/^d(ays?)?/i,year:/^y((ea)?rs?)?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a|p)/i},abbreviatedTimeZoneStandard:{GMT:"-000",EST:"-0400",CST:"-0500",MST:"-0600",PST:"-0700"},abbreviatedTimeZoneDST:{GMT:"-000",EDT:"-0500",CDT:"-0600",MDT:"-0700",PDT:"-0800"}}; Date.getMonthNumberFromName=function(name){var n=Date.CultureInfo.monthNames,m=Date.CultureInfo.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}} return-1;};Date.getDayNumberFromName=function(name){var n=Date.CultureInfo.dayNames,m=Date.CultureInfo.abbreviatedDayNames,o=Date.CultureInfo.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}} return-1;};Date.isLeapYear=function(year){return(((year%4===0)&&(year%100!==0))||(year%400===0));};Date.getDaysInMonth=function(year,month){return[31,(Date.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};Date.getTimezoneOffset=function(s,dst){return(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()]:Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];};Date.getTimezoneAbbreviation=function(offset,dst){var n=(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST:Date.CultureInfo.abbreviatedTimeZoneStandard,p;for(p in n){if(n[p]===offset){return p;}} return null;};Date.prototype.clone=function(){return new Date(this.getTime());};Date.prototype.compareTo=function(date){if(isNaN(this)){throw new Error(this);} if(date instanceof Date&&!isNaN(date)){return(this>date)?1:(this<date)?-1:0;}else{throw new TypeError(date);}};Date.prototype.equals=function(date){return(this.compareTo(date)===0);};Date.prototype.between=function(start,end){var t=this.getTime();return t>=start.getTime()&&t<=end.getTime();};Date.prototype.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};Date.prototype.addSeconds=function(value){return this.addMilliseconds(value*1000);};Date.prototype.addMinutes=function(value){return this.addMilliseconds(value*60000);};Date.prototype.addHours=function(value){return this.addMilliseconds(value*3600000);};Date.prototype.addDays=function(value){return this.addMilliseconds(value*86400000);};Date.prototype.addWeeks=function(value){return this.addMilliseconds(value*604800000);};Date.prototype.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,this.getDaysInMonth()));return this;};Date.prototype.addYears=function(value){return this.addMonths(value*12);};Date.prototype.add=function(config){if(typeof config=="number"){this._orient=config;return this;} var x=config;if(x.millisecond||x.milliseconds){this.addMilliseconds(x.millisecond||x.milliseconds);} if(x.second||x.seconds){this.addSeconds(x.second||x.seconds);} if(x.minute||x.minutes){this.addMinutes(x.minute||x.minutes);} if(x.hour||x.hours){this.addHours(x.hour||x.hours);} if(x.month||x.months){this.addMonths(x.month||x.months);} if(x.year||x.years){this.addYears(x.year||x.years);} if(x.day||x.days){this.addDays(x.day||x.days);} return this;};Date._validate=function(value,min,max,name){if(typeof value!="number"){throw new TypeError(value+" is not a Number.");}else if(value<min||value>max){throw new RangeError(value+" is not a valid value for "+name+".");} return true;};Date.validateMillisecond=function(n){return Date._validate(n,0,999,"milliseconds");};Date.validateSecond=function(n){return Date._validate(n,0,59,"seconds");};Date.validateMinute=function(n){return Date._validate(n,0,59,"minutes");};Date.validateHour=function(n){return Date._validate(n,0,23,"hours");};Date.validateDay=function(n,year,month){return Date._validate(n,1,Date.getDaysInMonth(year,month),"days");};Date.validateMonth=function(n){return Date._validate(n,0,11,"months");};Date.validateYear=function(n){return Date._validate(n,1,9999,"seconds");};Date.prototype.set=function(config){var x=config;if(!x.millisecond&&x.millisecond!==0){x.millisecond=-1;} if(!x.second&&x.second!==0){x.second=-1;} if(!x.minute&&x.minute!==0){x.minute=-1;} if(!x.hour&&x.hour!==0){x.hour=-1;} if(!x.day&&x.day!==0){x.day=-1;} if(!x.month&&x.month!==0){x.month=-1;} if(!x.year&&x.year!==0){x.year=-1;} if(x.millisecond!=-1&&Date.validateMillisecond(x.millisecond)){this.addMilliseconds(x.millisecond-this.getMilliseconds());} if(x.second!=-1&&Date.validateSecond(x.second)){this.addSeconds(x.second-this.getSeconds());} if(x.minute!=-1&&Date.validateMinute(x.minute)){this.addMinutes(x.minute-this.getMinutes());} if(x.hour!=-1&&Date.validateHour(x.hour)){this.addHours(x.hour-this.getHours());} if(x.month!==-1&&Date.validateMonth(x.month)){this.addMonths(x.month-this.getMonth());} if(x.year!=-1&&Date.validateYear(x.year)){this.addYears(x.year-this.getFullYear());} if(x.day!=-1&&Date.validateDay(x.day,this.getFullYear(),this.getMonth())){this.addDays(x.day-this.getDate());} if(x.timezone){this.setTimezone(x.timezone);} if(x.timezoneOffset){this.setTimezoneOffset(x.timezoneOffset);} return this;};Date.prototype.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};Date.prototype.isLeapYear=function(){var y=this.getFullYear();return(((y%4===0)&&(y%100!==0))||(y%400===0));};Date.prototype.isWeekday=function(){return!(this.is().sat()||this.is().sun());};Date.prototype.getDaysInMonth=function(){return Date.getDaysInMonth(this.getFullYear(),this.getMonth());};Date.prototype.moveToFirstDayOfMonth=function(){return this.set({day:1});};Date.prototype.moveToLastDayOfMonth=function(){return this.set({day:this.getDaysInMonth()});};Date.prototype.moveToDayOfWeek=function(day,orient){var diff=(day-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};Date.prototype.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};Date.prototype.getDayOfYear=function(){return Math.floor((this-new Date(this.getFullYear(),0,1))/86400000);};Date.prototype.getWeekOfYear=function(firstDayOfWeek){var y=this.getFullYear(),m=this.getMonth(),d=this.getDate();var dow=firstDayOfWeek||Date.CultureInfo.firstDayOfWeek;var offset=7+1-new Date(y,0,1).getDay();if(offset==8){offset=1;} var daynum=((Date.UTC(y,m,d,0,0,0)-Date.UTC(y,0,1,0,0,0))/86400000)+1;var w=Math.floor((daynum-offset+7)/7);if(w===dow){y--;var prevOffset=7+1-new Date(y,0,1).getDay();if(prevOffset==2||prevOffset==8){w=53;}else{w=52;}} return w;};Date.prototype.isDST=function(){console.log('isDST');return this.toString().match(/(E|C|M|P)(S|D)T/)[2]=="D";};Date.prototype.getTimezone=function(){return Date.getTimezoneAbbreviation(this.getUTCOffset,this.isDST());};Date.prototype.setTimezoneOffset=function(s){var here=this.getTimezoneOffset(),there=Number(s)*-6/10;this.addMinutes(there-here);return this;};Date.prototype.setTimezone=function(s){return this.setTimezoneOffset(Date.getTimezoneOffset(s));};Date.prototype.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r[0]+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};Date.prototype.getDayName=function(abbrev){return abbrev?Date.CultureInfo.abbreviatedDayNames[this.getDay()]:Date.CultureInfo.dayNames[this.getDay()];};Date.prototype.getMonthName=function(abbrev){return abbrev?Date.CultureInfo.abbreviatedMonthNames[this.getMonth()]:Date.CultureInfo.monthNames[this.getMonth()];};Date.prototype._toString=Date.prototype.toString;Date.prototype.toString=function(format){var self=this;var p=function p(s){return(s.toString().length==1)?"0"+s:s;};return format?format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g,function(format){switch(format){case"hh":return p(self.getHours()<13?self.getHours():(self.getHours()-12));case"h":return self.getHours()<13?self.getHours():(self.getHours()-12);case"HH":return p(self.getHours());case"H":return self.getHours();case"mm":return p(self.getMinutes());case"m":return self.getMinutes();case"ss":return p(self.getSeconds());case"s":return self.getSeconds();case"yyyy":return self.getFullYear();case"yy":return self.getFullYear().toString().substring(2,4);case"dddd":return self.getDayName();case"ddd":return self.getDayName(true);case"dd":return p(self.getDate());case"d":return self.getDate().toString();case"MMMM":return self.getMonthName();case"MMM":return self.getMonthName(true);case"MM":return p((self.getMonth()+1));case"M":return self.getMonth()+1;case"t":return self.getHours()<12?Date.CultureInfo.amDesignator.substring(0,1):Date.CultureInfo.pmDesignator.substring(0,1);case"tt":return self.getHours()<12?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator;case"zzz":case"zz":case"z":return"";}}):this._toString();}; Date.now=function(){return new Date();};Date.today=function(){return Date.now().clearTime();};Date.prototype._orient=+1;Date.prototype.next=function(){this._orient=+1;return this;};Date.prototype.last=Date.prototype.prev=Date.prototype.previous=function(){this._orient=-1;return this;};Date.prototype._is=false;Date.prototype.is=function(){this._is=true;return this;};Number.prototype._dateElement="day";Number.prototype.fromNow=function(){var c={};c[this._dateElement]=this;return Date.now().add(c);};Number.prototype.ago=function(){var c={};c[this._dateElement]=this*-1;return Date.now().add(c);};(function(){var $D=Date.prototype,$N=Number.prototype;var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),de;var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;} return this.moveToDayOfWeek(n,this._orient);};};for(var i=0;i<dx.length;i++){$D[dx[i]]=$D[dx[i].substring(0,3)]=df(i);} var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;} return this.moveToMonth(n,this._orient);};};for(var j=0;j<mx.length;j++){$D[mx[j]]=$D[mx[j].substring(0,3)]=mf(j);} var ef=function(j){return function(){if(j.substring(j.length-1)!="s"){j+="s";} return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$D[de]=$D[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}}());Date.prototype.toJSONString=function(){return this.toString("yyyy-MM-ddThh:mm:ssZ");};Date.prototype.toShortDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern);};Date.prototype.toLongDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.longDatePattern);};Date.prototype.toShortTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern);};Date.prototype.toLongTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.longTimePattern);};Date.prototype.getOrdinal=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}}; (function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;} break;} return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];} rx.push(r[0]);s=r[1];} return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];} return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];} throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));} return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;} if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;} try{r=(px[i].call(this,s));}catch(e){r=null;} if(r){return r;}} throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;} try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);} rx.push(r[0]);s=r[1];} return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];} return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;} rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;} s=q[1];} if(!r){throw new $P.Exception(s);} if(q){throw new $P.Exception(q[1]);} if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}} return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;} rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;} if(!last&&q[1].length===0){last=true;} if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}} p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}} if(rx[1].length<best[1].length){best=rx;} if(best[1].length===0){break;}} if(best[0].length===0){return best;} if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);} best[1]=q[1];} return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);} return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];} if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);} var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}} return rx;};Date.Grammar={};Date.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=((s.length==3)?Date.getMonthNumberFromName(s):(Number(s)-1));};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<Date.CultureInfo.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];var now=new Date();this.year=now.getFullYear();this.month=now.getMonth();this.day=1;this.hour=0;this.minute=0;this.second=0;for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}} this.hour=(this.meridian=="p"&&this.hour<13)?this.hour+12:this.hour;if(this.day>Date.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");} var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});} return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;} for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}} if(this.now){return new Date();} var today=Date.today();var method=null;var expression=!!(this.days!=null||this.orient||this.operator);if(expression){var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(this.weekday){this.unit="day";gap=(Date.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);} if(this.month){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;} if(!this.unit){this.unit="day";} if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;} if(this.unit=="week"){this.unit="day";this.value=this.value*7;} this[this.unit+"s"]=this.value*orient;} return today.add(this);}else{if(this.meridian&&this.hour){this.hour=(this.hour<13&&this.meridian=="p")?this.hour+12:this.hour;} if(this.weekday&&!this.day){this.day=(today.addDays((Date.getDayNumberFromName(this.weekday)-today.getDay()))).getDate();} if(this.month&&!this.day){this.day=1;} return today.set(this);}}};var _=Date.Parsing.Operators,g=Date.Grammar,t=Date.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=Date.CultureInfo.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));} fn=_C[keys]=_.any.apply(null,px);} return fn;};g.ctoken2=function(key){return _.rtoken(Date.CultureInfo.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.mm,g.ss],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^(\+|\-)?\s*\d\d\d\d?/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^(\+|\-)\s*\d\d\d\d/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[Date.CultureInfo.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw Date.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));} return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["yyyy-MM-ddTHH:mm:ss","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){} return g._start.call({},s);};}());Date._parse=Date.parse;Date.parse=function(s){var r=null;if(!s){return null;} try{r=Date.Grammar.start.call({},s);}catch(e){return null;} return((r[1].length===0)?r[0]:null);};Date.getParseFunction=function(fx){var fn=Date.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;} return((r[1].length===0)?r[0]:null);};};Date.parseExact=function(s,fx){return Date.getParseFunction(fx)(s);}; 

/*jslint evil: true */

/*global JSON */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!unsafeWindow.JSON) {
    unsafeWindow.JSON = {};
}
(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z';
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof unsafeWindow.JSON.stringify !== 'function') {
        unsafeWindow.JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('unsafeWindow.JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof unsafeWindow.JSON.parse !== 'function') {
        unsafeWindow.JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('unsafeWindow.JSON.parse');
        };
    }
})();

/**
 * metaweb.js: 
 *
 * This file implements a Metaweb.read() utility function using a <script>
 * tag to generate the HTTP request and the URL callback parameter to
 * route the response to a specified JavaScript function.
 **/
unsafeWindow.Metaweb = {}                         // Define our namespace

//unsafeWindow.Metaweb.HOST = "http://sandbox.api.freebase.com"; // The Metaweb server
unsafeWindow.Metaweb.HOST = "http://sandbox.freebase.com"; // The Metaweb server
unsafeWindow.Metaweb.MQLREAD = "/api/service/mqlread"; // The mqlread service on that server
unsafeWindow.Metaweb.MQLWRITE = "/api/service/mqlwrite"; // The mqlwrite service on that server
unsafeWindow.Metaweb.LOGIN    = "/api/account/login"; // The login service on that server

// This function submits one or more MQL queries to the mqlread service.
// When the results are available, it asynchronously passes them to 
// the specified callback functions.  The function expects an even number
// of arguments: each pair of arguments consists of a query and a 
// callback function.
unsafeWindow.Metaweb.read = function(/* q0, f0 [, q1, f1...] */)
{
    // Figure out how many queries we've been passed
    if (arguments.length < 2 || arguments.length % 2 == 1)
        throw "Wrong number of arguments to unsafeWindow.Metaweb.read().  Nargs=" + arguments.length;
    var nqueries = arguments.length / 2;

    // Place each query in a query envelope, and put each query envelope
    // in an outer envelope.  Also, store the callbacks in an array for
    // later use.
    var envelope = {}                          // The outer envelope
    var callbacks = new Array(nqueries);       // An array to hold callbacks
    for(var i = 0; i < nqueries; i++) {        // For each query/callback pair
        var inner = {"query": arguments[i*2]}; // Make inner query envelope
        var qname = "q" + i;                   // Property name for the query
        envelope[qname] = inner;               // Put inner envelope in outer
        callbacks[i] = arguments[i*2 + 1];     // Callback for the query
    }
    
    // Serialize and encode the envelope object.
    var serialized = unsafeWindow.JSON.stringify(envelope);    // http://json.org/json2.js
    //if(serialized.match(/Stanford/))
    //GM_log('envelope: ' + serialized);
    var encoded = encodeURIComponent(serialized); // Core JavaScript function

    // Start building the URL
    var url = unsafeWindow.Metaweb.HOST + unsafeWindow.Metaweb.MQLREAD +  // Base mqlread URL
        "?queries=" + encoded;                  // Queries request parameter

    // Get a callback function name for this url
    var callbackName = unsafeWindow.Metaweb.makeCallbackName(url);

    // Add the callback parameter to the URL
    //url += "&callback=unsafeWindow.Metaweb." + callbackName;
    url += "&callback=window.Metaweb." + callbackName;

    // Create the script tag that will fetch the contents of the url
    var script = document.createElement("script");

    // Define the function that will be invoked by the script tag.
    // This function expects to be passed an outer response envelope.
    // It extracts query results and passes them to the corresponding callback.
    // The function throws exceptions on errors. Since it is invoked
   // asynchronously, those exceptions can't be caught, but they will
    // appear in the browser's JavaScript console as useful diagnostics.
    unsafeWindow.Metaweb[callbackName] = function(outer) {
        // Throw an exception if there was an invocation error.
        if (outer.code != "/api/status/ok") {  // Should never happen
            var error = outer.messages[0];
//            throw outer.status + ": " + error.code + ": " + error.message;
            GM_log(outer.status + ": " + error.code + ": " + error.message);
            return
        }

        var errors = [];  // An array of error messages to be thrown later

        // For each query, get the response envelope, test for success,
        // and pass query results to the corresponding callback function.
        // If any query (or callback) fails, save an error to throw later.
        for(var i = 0; i < nqueries; i++) {
            var qname = "q" + i;            // Query property name
            var inner = outer[qname];       // Extract inner envelope
            // Check for query success or failure
            if (inner.code == "/api/status/ok") {
                try {
                    callbacks[i](inner.result); // On success, call callback
                } catch(ex) {
                    // Remember any exceptions caused by the callback
                    errors.push("Exception from callback #" + i + ": " + ex);
                }
            }
            else {
                // If it failed, add all of its error messages to errors[].
                for(var j = 0; j < inner.messages.length; j++) {
                    var error = inner.messages[j];
                    var msg = "mqlread error in query #" + i +
                        ": " + error.code + ": " + error.message + "\n" + serialized;
                    errors.push(msg);
                }
                //Call it anyway (to keep track of counts)
                callbacks[i](null);
            }
        }

        // Now perform some cleanup
        document.body.removeChild(script);   // Remove the <script> tag
        delete unsafeWindow.Metaweb[callbackName];        // Delete this function

        // Finally, if there were any errors, raise an exception now so they
        // at least get reported in the JavaScript console.
//        if (errors.length > 0) throw errors.join("\n");
        if (errors.length > 0) {GM_log(errors.join("\n")); return;}
    };

    // Now set the URL of the script tag and add that tag to the document.
    // This triggers the HTTP request and submits the query.
    script.src = url
    document.body.appendChild(script);
};

// This function returns a callback name that is not currently in use.
// Ideally, to support caching, the name ought to be based on the URL so the
// same URL always generates the same name.  For simplicity, however, we
// just increment a counter here.
unsafeWindow.Metaweb.makeCallbackName = function(url) {
    return "_" + unsafeWindow.Metaweb.makeCallbackName.counter++;                     
};
unsafeWindow.Metaweb.makeCallbackName.counter = 0; // Initialize the callback name counter.



unsafeWindow.Metaweb.SEARCH = "/api/service/search";  // URL path to the search service

// Invoke the Metaweb search service for the specified query.
// Asynchronously pass the array of results to the specified callback function.
// 
// The first argument can be a string for simple searches or an object
// for more complex searches.  If it is a string, it should take the form
//    [type:]text[*]
// That is: the text to be searched for, optionally prefixed by a type id
// and a colon and optionally suffixed with an asterisk.  Specifying a type 
// sets the type parameter for the search, and adding an asterisk makes it a 
// prefix search.
//
// If query argument is an object, then its properties are translated into 
// search parameters.  In this case, the object must include either 
// a property named query (for an exact match) or a property named prefix
// (for a prefix match).  Other legal properties are the same as the 
// allowed parameters for the search service: type, type_strict, domain, 
// limit, start, and so on.  To specify multiple types, set the 
// type property to an array of type ids.  To specify a single type, set
// the type property to a single id.
unsafeWindow.Metaweb.search = function(query, callback) {
    var q = {};  // The query object

    if (typeof query == "string") {
        // If the query argument is a string, we must convert it to an object.
        // First, see if there is a type prefix
        var colon = query.indexOf(':');
        if (colon != -1) {
            q.type = query.substring(0, colon);
            query = query.substring(colon + 1);
        }

        // Next see if there is an asterisk suffix
        if (query.charAt(query.length-1) == '*') // prefix match
            q.prefix = query.substring(0, query.length-1);
        else
            q.query = query;
    }
    else { 
        // Otherwise, assume the query argument is an object and 
        // copy its properties into the q object.
        for(var p in query) q[p] = query[p];
    }

    // With mqlread, we would JSON-encode the query object q.  For the search
    // service, we convert the properties of q to an array of URL parameters
    var parameters = [];
    for(var name in q) {
        var value = q[name];

        if (typeof value != "object") { // A single value for the parameter
            var param = name + "=" + encodeURIComponent(value.toString());
            parameters.push(param);
        }
        else { // Otherwise, there is an array of values: multiple types
            for(var index in value) {
                var elt = value[index];
                var param = name + "=" + encodeURIComponent(elt.toString());
                parameters.push(param);
            }
        }
    }

    // Now convert the array of parameters into a URL 
    var url = unsafeWindow.Metaweb.HOST + unsafeWindow.Metaweb.SEARCH + "?" + parameters.join('&');

    // Generate a name for the function that will receive the results
    var cb = unsafeWindow.Metaweb.makeCallbackName(url);

    // Add the JSONP callback parameter to the url
    url += "&callback=unsafeWindow.Metaweb." + cb;

    // Create the script tag that will fetch that URL
    var script = document.createElement("script");

    // Define the function that handles the results from that URL
    unsafeWindow.Metaweb[cb] = function(envelope) {
        // Clean up by erasing this function and deleting the script tag
        document.body.removeChild(script);
        delete unsafeWindow.Metaweb[cb];

        // If the query was successful, pass results to the callback
        // Otherwise, throw an error message
        if (envelope.code == "/api/status/ok")
            callback(envelope.result);
        else {
            throw "unsafeWindow.Metaweb.search: " + envelope.messages[0].code +
                ": " + envelope.messages[0].message;
        }
    }
}

/************************************************************
modifications to existing javascript libraries
*/

String.prototype.trim = function() {
    // Strip leading and trailing white-space
    //return this.replace(/^[\s\n]*|[\s\n]*$/g, "");
    return this.replace(/^[\s]*|[\s]*$/g, "");
}

String.prototype.normalize_space = function() {
    // Replace repeated spaces, newlines and tabs with a single space
    // Also removes anything in parenthesis.

    string = this.replace(/\s+\(.*\)$/, "")    //Get rid of stuff in parenthesis
    return string.replace(/^\s*|\s(?=\s)|\s*$/g, "");
}

/************************************************************
globals
*/
//NUMBER_OF_TYPES_DISPLAY = 20
//NUMBER_OF_TYPES_DISPLAY = 15
NUMBER_OF_TYPES_DISPLAY = 10
EVALUATION_MODE = true

//QUERY_BUNDLE_SIZE = 40
QUERY_BUNDLE_SIZE = 30

var menuStyle = 'z-Index: 999; width: 195px; background: #666; border: #333 solid 2px; -moz-opacity: 0.95; margin: 2px; color: #FFF; font-size: 12px; padding: 2px;'


/************************************************************
utilities
*/
function getEventX(e) {
    if(e.pageX) {
        return e.pageX
    }
    else if(e.clientX) {
        return e.clientX + document.body.scrollLeft
    }
}

function getEventY(e) {
    if(e.pageY) {
        return e.pageY
    }
    else if(e.clientY) {
        return e.clientY + document.body.scrollTop
    }
}

function isDate(s) {
    if(s.match(/^(jan|feb|march|april|may|june|july|aug|sept|oct|dec)/i)) {
        return true
    }
    if(s.match(/^(\d{4})/)) {
        return true
    }
    if(s.match(/^\d{1,2}[\/\-\\]\d{1,2}?[\/\-\\]\d{2,4}/)) {
        return true
    }
    return false
}

//Generates a flat menu from description (2 levels - leaf objects contain 'score' and 'callback')
//NOTE: deletes any items whose score is NULL
generateFlatMenu = function(description, header) {
    var menu = document.createElement("table")
    menu.setAttribute('style', menuStyle)
    menu.style.display  = 'none'
    menu.style.position = 'absolute'
    document.body.appendChild(menu)

    //Calls user function, and closes the menu
    var clickCallback = function(userFun, menu) {
        return function(event) {
            userFun(event)
            menu.style.display='none'
        }
    }

    var rows = new Array()
    for(var item in description)
        for(var subItem in description[item]) 
            if(description[item][subItem].score) {
                rows.push({item:item, subItem:subItem, score:description[item][subItem].score, callback:description[item][subItem].callback})
                //GM_log(subItem + "\t" + rows[rows.length-1].score)
            }

    var head  = document.createElement("tr")
    var X = document.createElement("p")
    X.innerHTML = "X".bold()
    X.align = 'right'
    //X.style.color='blue'
    X.addEventListener('click', function(event){menu.style.display='none'}, true)
    var hCol1  = head.insertCell(0)
    hCol1.colSpan = "2"
    hCol1.textContent = header
    var hCol2  = head.insertCell(1)
    hCol2.appendChild(X)
    menu.appendChild(head)

    //Sort the rows by score
    rows = rows.sort(function(a,b){return b.score - a.score})

    for(var r in rows) {
        r = rows[r]

        if(!r.score)
            continue

        var row = document.createElement("tr")

        var col1 = row.insertCell(0)
        col1.textContent = r.item
        col1.setAttribute('style', menuStyle)
        col1.addEventListener('click', clickCallback(r.callback, menu), true)

        var col2 = row.insertCell(1)
        col2.textContent = r.subItem
        col2.setAttribute('style', menuStyle)
        col2.addEventListener('click', clickCallback(r.callback, menu), true)

        var col3 = row.insertCell(2)
        col3.textContent = r.score
        col3.setAttribute('style', menuStyle)
        col3.addEventListener('click', clickCallback(r.callback, menu), true)

        menu.appendChild(row)
    }
    return menu    
}


//Generates an HTML menu from a description object
//Description object contains keys with menu names, and hashes to submenus, or callback functions.
generateMenu = function(description, depth) {
    //GM_log(depth)
    var menu = document.createElement("table")
    menu.setAttribute('style', menuStyle)
    menu.style.display  = 'none'
    var zIndex = parseFloat(menu.style['zIndex']) + depth
    menu.style['zIndex'] = zIndex.toString()
    menu.style.position = 'absolute'
    document.body.appendChild(menu)

    var closeSubMenus = function(menu) {
        menu.style.display = 'none'
        for(var r in menu.rows) {
            for(var c in menu.rows[r].children) {
                closeSubMenus(menu.rows[r].children[c])
            }
        }
    }

    var expandMenuCallback = function(index, siblings) {
        return function(event) {
            //GM_log(unsafeWindow.JSON.stringify(event))

            for(var i in siblings) {
                if(i != index) {
                    //siblings[i].style.display='none'
                    closeSubMenus(siblings[i])
                }
            }

            siblings[index].style.left = getEventX(event) + "px"
            siblings[index].style.top  = getEventY(event) + "px"
            siblings[index].style.display = ''
        }
    }

    var children = new Array()
    for(var item in description) {
        var row = document.createElement("tr")
        var col = row.insertCell(0)
        col.textContent = item
        col.setAttribute('style', menuStyle)
        col.style['zIndex'] = zIndex
        if(typeof(description[item]) == 'function') {
            col.addEventListener('click', description[item], true)
        } else if(typeof(description[item]) == 'object') {
            var cIdx = children.length
            children[cIdx] = generateMenu(description[item], depth+1)
            col.addEventListener('click', expandMenuCallback(cIdx,children), true)
        }
        row.children = children
        menu.appendChild(row)
    }
    return menu
}
//unsafeWindow.x = generateMenu({'ab':{'abccc':1, 'def':2}, 'add':'bsd', 'aaa':'def'}, 0)
//return

login = function(username, password) {
    var url = unsafeWindow.Metaweb.HOST + unsafeWindow.Metaweb.LOGIN
    var headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    //var body = encodeURIComponent(unsafeWindow.JSON.stringify({'username':username,
    //var body = encodeURIComponent('field=username&value=' + username + '&field=password&value=' + password)
    var body = 'username=' + username + '&password=' + password

    //GM_log(url + "\t" + body)
    GM_xmlhttpRequest({method:'GET', 
                       url:url + '?' + body, 
                       //url:url,
                       headers:{
                           'Content-Type': 'application/x-www-form-urlencoded'
                       }, 
                       //data:body, 
                       onload: function(responseDetails) {
                           //GM_log(unsafeWindow.JSON.stringify(responseDetails))
                           //GM_log(responseDetails.responseHeaders)
                           unsafeWindow.Metaweb.cookies = new Array()

                           var headers = responseDetails.responseHeaders.split("\n")
                           for(var h in headers) {
                               if(headers[h].match(/^Set-Cookie:/))
                                  unsafeWindow.Metaweb.cookies.push(headers[h])
                           }
                       },
                       onerror: function(responseDetails) {
                           GM_log(unsafeWindow.JSON.stringify(responseDetails))
                       }
                      })
}

//Enter your Freebase username and password here to contribute:
if(USERNAME != '' && PASSWORD != '')
    login(USERNAME, PASSWORD)

mqlWrite = function(q, onComplete) {
    var url = unsafeWindow.Metaweb.HOST + unsafeWindow.Metaweb.MQLWRITE
    var headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Metaweb-Request': 'True'
    }
    for(var c in unsafeWindow.Metaweb.cookies) {
        headers['Cookie'] = unsafeWindow.Metaweb.cookies[c]
    }

    var serialized = unsafeWindow.JSON.stringify({'query':q})
    //var body       = encodeURIComponent('query='+serialized)
    var body       = 'query='+serialized

    /*
    GM_log(url)
    GM_log(body)
    return
*/

    //GM_log(url + "\t" + body + "\t" + unsafeWindow.JSON.stringify(headers))
    GM_xmlhttpRequest({method: 'POST',
                       url:url,
                       headers:headers,
                       data:body,
                       onload: function(details) {
                           GM_log(unsafeWindow.JSON.stringify(details))
                           if(onComplete && details)
                               onComplete(details.responseText)
                       },
                       onerror: function(details) {
                           GM_log(unsafeWindow.JSON.stringify(details))
                       }
                      })
}

function getNumber(obj)
{
    if(typeof(obj) == "string" || typeof(obj) == "number") {
        return parseFloat(obj)
    } else {
        for(var p in obj) {
            if((typeof(obj[p]) == "string" || typeof(obj[p]) == "number") && parseFloat(obj[p])) {
                return parseFloat(obj[p])
            }
        }
    }
}

function getString(obj)
{
    if(typeof(obj) == "string" || typeof(obj) == "number") {
        return obj
    } else {
        return obj.name
    }
}

/*
is e an element of array a?
*/
function arrayContains(a, e)
{
	for(var i in a)
		if(a[i] == e)
			return true;
	return false;
}

//based on: http://en.wikibooks.org/wiki/Algorithm_implementation/Strings/Levenshtein_distance
//and:  http://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
function levenshtein( a, b )
{
	var i;
	var j;
	var cost;
	var d = new Array();
 
	if ( a.length == 0 )
	{
		return b.length;
	}
 
	if ( b.length == 0 )
	{
		return a.length;
	}
 
	for ( i = 0; i <= a.length; i++ )
	{
		d[ i ] = new Array();
		d[ i ][ 0 ] = i;
	}
 
	for ( j = 0; j <= b.length; j++ )
	{
		d[ 0 ][ j ] = j;
	}
 
	for ( i = 1; i <= a.length; i++ )
	{
		for ( j = 1; j <= b.length; j++ )
		{
			if ( a.charAt( i - 1 ) == b.charAt( j - 1 ) )
			{
				cost = 0;
			}
			else
			{
				cost = 1;
			}
 
			d[ i ][ j ] = Math.min( d[ i - 1 ][ j ] + 1, d[ i ][ j - 1 ] + 1, d[ i - 1 ][ j - 1 ] + cost );
			
			if(
         i > 1 && 
         j > 1 &&  
         a.charAt(i - 1) == b.charAt(j-2) && 
         a.charAt(i-2) == b.charAt(j-1)
         ){
          d[i][j] = Math.min(
            d[i][j],
            d[i - 2][j - 2] + cost
          )
         
			}
		}
	}
 
	return d[ a.length ][ b.length ];
}

/**********************************************************************/

/*
taken from the Wiktionary top-100 lists from TV and Project Gutenberg (ergo two lines of words), with some duplicates removed, forced to all lowercase
*/
var mostCommonWords =
[
	'a', 'about', 'all', 'and', 'are', 'as', 'at', 'back', 'be', 'because', 'been', 'but', 'can', 'can\'t', 'come', 'could', 'did', 'didn\'t', 'do', 'don\'t', 'for', 'from', 'get', 'go', 'going', 'good', 'got', 'had', 'have', 'he', 'her', 'here', 'he\'s', 'hey', 'him', 'his', 'how', 'i', 'if', 'i\'ll', 'i\'m', 'in', 'is', 'it', 'it\'s', 'just', 'know', 'like', 'look', 'me', 'mean', 'my', 'no', 'not', 'now', 'of', 'on', 'one', 'or', 'out', 'really', 'right', 'say', 'see', 'she', 'so', 'some', 'something', 'tell', 'that', 'that\'s', 'the', 'then', 'there', 'they', 'think', 'this', 'time', 'to', 'up', 'want', 'was', 'we', 'well', 'were', 'what', 'when', 'who', 'why', 'will', 'with', 'would', 'yeah', 'yes', 'you', 'your', 'you\'re',
	'after', 'any', 'an', 'before', 'be', 'by', 'down', 'first', 'great', 'had', 'has', 'have', 'her', 'he', 'him', 'his', 'if', 'into', 'in', 'is', 'its', 'it', 'i', 'know', 'like', 'little', 'made', 'man', 'may', 'men', 'me', 'more', 'mr', 'much', 'must', 'my', 'not', 'now', 'no', 'of', 'one', 'only', 'on', 'or', 'other', 'our', 'out', 'over', 'said', 'see', 'she', 'should', 'some', 'so', 'such', 'than', 'that', 'their', 'them', 'then', 'there', 'these', 'they', 'the', 'this', 'time', 'to', 'two', 'upon', 'up', 'us', 'very', 'was', 'were', 'we', 'what', 'when', 'which', 'who', 'will', 'with', 'would', 'your', 'you' 
];

/*
return a measure of the distance (>= 0) between two sets of word tokens

words1, words2: Arrays of strings
*/
function stringDistanceUsingWords(words1, words2)
{
	/*
	normalize
	*/
	for(var i = 0; i < words1.length; i++) words1[i] = words1[i].toLowerCase();
	for(var i = 0; i < words2.length; i++) words2[i] = words2[i].toLowerCase();

	/*
	remove very common words
	*/
	var words1new = new Array();
	var words2new = new Array();
	for(var i = 0; i < words1.length; i++)
		if(!arrayContains(mostCommonWords, words1[i]))
			words1new.push(words1[i]);
	for(var i = 0; i < words2.length; i++)
		if(!arrayContains(mostCommonWords, words2[i]))
			words2new.push(words2[i]);

	var minDist = 1000000; //a very large number
	for(var i1 = 0; i1 < words1new.length; i1++)
		for(var i2 = 0; i2 < words2new.length; i2++)
		{
			var dist = levenshtein(words1new[i1], words2new[i2]) 
							/ Math.sqrt((words1new[i1].length + words2new[i2].length) / 2); //weight by a function decreasing in word length
			if(dist < minDist) minDist = dist;
		}
	return minDist; //don't adjust for sizes of the word sets (because I don't know how)
}

/**********************************************************************/

reGuid       = new RegExp('^/guid/')
reType       = new RegExp('^/type/')

//A list of all the properties of Freebase's /type/object (in general these are not interesting for schema matching)
var objProperties = new Object()
objProperties.attribution = 1
objProperties.name = 1
objProperties.permission = 1
objProperties.timestamp = 1
objProperties.creator = 1
objProperties.key = 1
objProperties.guid = 1
objProperties.type = 1
objProperties.id = 1

isArray = function(obj) {
    if(typeof(obj) != 'object')
        return false
    if (obj.constructor.toString().indexOf("Array") == -1)
        return false;
    else
        return true;
}

attributes = function(obj) {
    var result = new Array()
    for(var att in obj) {
        result.push(att)
    }
    return result
}

//Returns true if the entire object is empty (false otherwise)
removeEmpty = function(obj) {
    //GM_log('removeEmpty\t' + obj + "\t" + typeof(obj))
    var allEmpty = true
    //if(obj == null || obj==undefined)
    if(typeof(obj) != 'number' && 
       typeof(obj) != 'boolean' && 
       typeof(obj) != 'string' && !obj) {
        return true
    }
    if(typeof(obj) != 'object')
        return false
    for(var a in obj) {
        //GM_log(a + "\t" + obj[a])
        if(removeEmpty(obj[a])) {
            //GM_log('deleting ' + a)
            delete obj[a]
        } else if(isArray(obj[a]) && obj[a].length == 0) {
            delete obj[a]
        } else {
            allEmpty = false
        }
    }
    //GM_log(unsafeWindow.JSON.stringify(obj) + "\t" + allEmpty)
    return allEmpty
}
/* Test removeEmpty
*/
//x = {a:{b:{c:1}, d:{e:{}}}}
//GM_log(unsafeWindow.JSON.stringify(x))
//removeEmpty(x)
//GM_log(unsafeWindow.JSON.stringify(x))
//return

//Test if an object contains only nulls (no numbers or strings)
allNull = function(obj) {
    //if(obj == null || depth > MAX_DEPTH)
    if(obj == null)
        return true
    else if(typeof(obj) == "number" ||
            typeof(obj) == "string")
        return false
    else if(typeof(obj) != "object")
        return true

    for(var p in obj) {
        if(!allNull(obj[p]))
            return false
    }
    return true
}

function getProperties(object) {
    var a = new Array()
    for(var p in object) {
        a[a.length] = p
    }
    return a
}

function sortProperties(object) {
    var p = getProperties(object)
    return p.sort(function(a,b) {return object[b] - object[a]})
}

function sortProperties2(object, f) {
    return p.sort(f)
}

/*
return an Array of the first n elements of an enumeration of objs, or fewer than n if that's all there are
*/
function enumerateWithMax(objs, n)
{
    var result = new Array();
    Array.forEach(objs, function(obj) {if(result.length < n) result.push(obj);});
    return result;
}

/*
return an Array of the first n elements of objs that aren't in cmpSet, along with all the elements of objs before that that are in cmpSet

objs: some sort of ordered list
*/
function enumerateNotInAnotherSetWithMax(objs, cmpSet, n)
{
    var cmpHash = new Object(); //obj -> 1 if it's in cmpSet
    for(var i = 0; i < cmpSet.length; i++) cmpHash[cmpSet[i]] = 1;

    var result = new Array();
    var inCommon = new Array();
    Array.forEach(objs, 
		  function(obj)
		  {
		      if(result.length < n)
		      {
			  if(cmpSet[obj]) inCommon.push(obj);
			  else result.push(obj);
		      }
		  }
	         );
    return result.concat(inCommon);
}


/************************************************************
global storage
*/

unsafeWindow.cs544 = {};
var cs544 = unsafeWindow.cs544;

cs544.typeBlacklist = //hardcoded list of types that show up everywhere and so that get downgraded in importance
[
    '/common/topic',
    '/music/track'
];
cs544.typeFreqs = {}; //freebase type string -> count of all freebase entities of that type

/************************************************************
table class
*/

//Constructor
function Table(tel,tNum)
{
    this._dom  = tel
    this._tNum = tNum

    this._dom.style['z-Index'] = 999

    this.nRows = tel.rows.length
    //this.nCols = tel.rows[this.nRows-1].cells.length
    this.nCols = 0
    for(var i=0; i<this.nRows; i++) {
        if(tel.rows[i].cells.length > this.nCols) {
            this.nCols = tel.rows[i].cells.length
        }
    }

    //GM_log(tNum + "\t" + this.nRows + "\t" + this.nCols)

    this.findHeader()

    //Add an extra header for displaying menus
    if(this.nRows > 2) {
        var displayMenu = this._dom.insertRow(this.headerStart)
        for(var i=0; i<this.nCols; i++) {
            var cell = displayMenu.insertCell(i)
            cell.innerHTML = 'Add to Freebase'
        }
        this.headerStart += 1
        this.nRows += 1
    }

    this.nRows -= this.headerStart

    //GM_log(this.headerStart)

    this._nTypeCallbacks = new Array();
    this._nTypeFreqCallbacks = new Array();
    for(var i=0; i<this.nCols; i++)
    {
    	this._nTypeCallbacks[i] = 0;
    	this._nTypeFreqCallbacks[i] = 0;
    }
    this.numColsTypeFreqCallbacksDone = 0;

    this.colTypeCounts = new Array()
    this._RC_TypeTable = new Array()
    this.stringTypes   = new Object()   //Hash from strings to types
    this.topTypes      = new Array()
    this.stringProps   = new Object()           //Types and property values for each string
    this.props         = new Object()           //Properties and property types for each type
    this.cosineDistance    = new Array()            //Stores cosine distance between numeric properties and numeric columns
    this.absDistance    = new Array()            //Stores absolute magnitude distance between numeric properties and numeric columns
    this.stringInstanceDistance = new Array()            //Stores average string distance between attributes and column values
    this.propHeaderEditDistance = new Array()   //Stores edit distance between each column and each property of each type
    this.columnTypes = new Array();
    this.propCounts  = new Object()             //Stores the frequency of each property's value


    //this.numberRe = new RegExp(/^[\s\n]*[\d,\.]+[\s\n]*$/)
    this.numberRe = new RegExp(/^[\s\n]*[\d,\.]+\s*\w{0,5}[\s\n]*$/)
    this.entityRe = new RegExp(/^(\d\.)?[\s\n]*[a-zA-z]/)     //Entity should at least start w/ A-Z

    this.computeColumnTypes();
}

//Data
Table.prototype._dom
Table.prototype._tNum	//Identify this table uniquely in the page

Table.prototype.nRows
Table.prototype.nCols
Table.prototype.numEntityCols //number of columns that seem to contain entity names
Table.prototype.headerStart

Table.prototype.numberRe
Table.prototype.entityRe

Table.prototype.columnTypes
Table.prototype.colIsEntity

Table.prototype._nTypeCallbacks	//Number of get-type-for-entity callbacks still waiting for each column

Table.prototype._nTypeFreqCallbacks //# of get-global-count-for-type callbacks outstanding for each column
Table.prototype.numColsTypeFreqCallbacksDone //count of columns for which all get-count-for-type callbacks have completed

Table.prototype._RC_TypeTable	//Types to display to user (one table per col)

Table.prototype.colTypeCounts
Table.prototype.stringTypes
Table.prototype.props
Table.prototype.propCounts
Table.prototype.distance
Table.prototype.propHeaderEditDistance

Table.prototype.topTypes
Table.prototype.stringProps

//Methods

//A simpler version.  Find the first row of <th> which has the right number of cols.
Table.prototype.findHeader = function() {
    var h = null
    var foundTH = false

    for(var irow=0; irow<this._dom.rows.length; irow++) {
        var th = false
        for(var j in this._dom.rows[irow].cells) {
            if(this._dom.rows[irow].cells[j].localName == "TH")
                th = true
        }
        if(this._dom.rows[irow].cells.length == this.nCols && th) {
            h = irow
            foundTH = true
        } else {
            if(foundTH)
                break
            else if(this._dom.rows[irow].cells.length == this.nCols && !h) {
                h = irow
                break
            }
        }
    }

    if(h && h<10)
        this.headerStart = h
    else
        this.headerStart = 0 
}

//TODO: make this work better on headers...
Table.prototype.getCellContent = function(i,j) {
    var i2 = i + this.headerStart

    if(this._dom.rows.length > i2 &&
       this._dom.rows[i2].cells.length > j) {
        //if(this.columnTypes[j] == 'number' && i>this.headerStart) {
        if(this.columnTypes[j] == 'number' && i2>this.headerStart) {
            return parseFloat(this._dom.rows[i2].cells[j].textContent.normalize_space().replace(/,/g, ""))
        }
        else if(this.columnTypes[j] == 'date') {
            dateContent = this._dom.rows[i2].cells[j].innerHTML
            dateContent = dateContent.replace(/<span[^>]*>([^<]*)<[^>]*>/,"")    //Many dates (in Wikipedia) are repeated, once for sorting, and once for display
            dateContent = dateContent.replace(/<[^>]*>/g, "")
            if(!dateContent)
                dateContent = this._dom.rows[i2].cells[j].textContent
            //Get rid of anything after any punctuation
            dateContent = dateContent.replace(/[\&\\\/\(\)].*/, "")
            return dateContent
        } else {
            var result = this._dom.rows[i2].cells[j].textContent
                /*
            if(result.match(/[^\s]+.*\n/)) {
                //result = result.match(/.+\n/)[0]
            }
    */
            if(result.match(/[^\s\n].*\n/))
                result = result.match(/[^\s\n][^\n]*/)[0]

            result = result.normalize_space().trim()
            result = result.replace(/\s+\(.*\)$/, "")    //Get rid of stuff in parenthesis
            //result = result.replace(/.+[,\/\\:].*$/,    "")       //Split comma seperated stuff (E.g. Seattle, WA)

            //if(this.columnTypes[j] != 'number') {
            //    result = result.replace(/[,\/\\:].*$/,    "")       //Split comma seperated stuff (E.g. Seattle, WA)
            //}
            //result = result.replace(/\-\-/g, ", ")         //Replace double spaces with comma-space
            result = result.replace(/\-+/g, " ")         //Replace dashes with single space
            result = result.replace(/^\d+\. /, "")       //Take care of "numbered columns" (e.g. 1. XXX, 2. YYY, etc...)
            result = result.replace(/\W+/g, " ")           //Replace spaces and punctuation
            result = result.replace(/^\s+/, "")     //Remove spaces from beginning and end
            result = result.replace(/\s+$/, "")     //Remove spaces from beginning and end
            return result
        }
    } else {
        return null
    }
}

Table.prototype.getCell = function(i,j) {
    var i2 = i + this.headerStart

    if(this._dom.rows.length > i2 &&
       this._dom.rows[i2].cells.length > j) {
        return this._dom.rows[i2].cells[j]
    } else {
        return null
    }
}

/********************/

Table.prototype.computeColumnTypes = function()
{
    //GM_log('computeColumnTypes');
    this.numEntityCols = 0;
    this.numberCnt = new Array();
    this.entityCnt = new Array();
    this.dateCnt = new Array();
    this.colIsEntity = new Array(); //each element is a boolean for whether that column holds entities (as opposed to numbers or free text)
    for( var j=0; j<this.nCols; j++ )
    {
	this.numberCnt[j] = 0;
	this.entityCnt[j] = 0;
        this.dateCnt[j]   = 0;
        for(var i = 0; i < this.nRows; i++) {
            //var content = this.getCellContent(i,j)
            var content = this.getCell(i,j)
            if(content) {
                htmlContent = content.innerHTML
                content = content.textContent
            }
	    if(content != null)
	    {
                dateContent = htmlContent
                dateContent = dateContent.replace(/<span[^>]*>([^<]*)<[^>]*>/,"")    //Many dates (in Wikipedia) are repeated, once for sorting, and once for display
                dateContent = dateContent.replace(/<[^>]*>/g, "")
                if(!dateContent)
                    dateContent = content
                //Get rid of anything after any punctuation
                dateContent = dateContent.replace(/[\&\\\/\(\)].*/, "")

                //var p = Date.parse(dateContent)
                //GM_log(j + "\t" + p + "\t" + dateContent)
                if(isDate(dateContent)) {
                    this.dateCnt[j]++;
                }
                else if( content.match(this.entityRe) && content.length < 100 )
		{
		    this.entityCnt[j]++;
		}
		if(content.match(this.numberRe))
                    //if(parseFloat(content))
		{
                    this.numberCnt[j]++;
		}
		else
		{
		    //TODO ?
		}
	    }
        }

        //GM_log('dateCnt' + this.dateCnt)
        //GM_log('numberCnt' + this.numberCnt)
        //GM_log('entityCnt' + this.entityCnt)

        //NOTE: need to add corresponding column type checks in building the menu if new types are added.

	//if( dateCnt[j] == this.nRows && numberCnt[j] < this.nRows / 2 )
        if( this.dateCnt[j] >= this.entityCnt[j] && this.dateCnt[j] >= this.numberCnt[j] )
        {
            this.columnTypes[j] = 'date'
            this.colIsEntity[j] = false;
        }
	else if( this.entityCnt[j] > this.nRows / 2 && this.entityCnt[j] > this.numberCnt[j]) // More than half look like entities
	{
	    this.numEntityCols++;
	    this.colIsEntity[j] = true;
            this.columnTypes[j] = 'string'
            //			GM_log(' col ' + j + ' is entity');
	}
	else
	{
	    this.colIsEntity[j] = false;
            //this.columnTypes[j] = 'string'
            this.columnTypes[j] = 'number'
            //			GM_log(' col ' + j + ' is not entity');
	}
    }
    
    /*
	numEntityCols should be set by the time we get here, so it can be correctly read by any callbacks we start
	*/
    var queries = new Array()
    this.nCallbacks = 0
    for( var j=0; j<this.nCols; j++ )
    {
	if(this.colIsEntity[j]) // More than half look like entities, go ahead and query Freebase for the types
	{
	    /*
			get all possible types for all elements
			*/
	    for( var i=1; i<this.nRows; i++ ) //assume first row is header
	    {
		var cellContent = this.getCellContent(i,j);
                if(!cellContent)
                    continue
		var keyContent  = cellContent.replace(/ /g, "_")
		if(cellContent != null && cellContent != "")
		{
		    var query1 = [{
			name: null,
                        key: [{value: keyContent}],
                        id: null,
			type: []
		    }];
		    var query2 = [{
                        name: cellContent,
                        id:null,
			type: []
		    }];
		    
		    //Need to use a closure to bind the object to the callback
		    var tmpThis = this
		    this._nTypeCallbacks[j]++	//Keep track of how many callbacks we're waiting for, so that we know when it's done...
		    
		    //Generates closures which can be used for callback.
		    var callbackClosure = 
			function(column, element)
		    {
			return function(result) {tmpThis.getTypesCallback(result,column,element)};
		    }
		    
                    //					GM_log('getting types for col ' + j);

                    queries.push(query1)
                    queries.push(callbackClosure(j, cellContent))
                    queries.push(query2)
                    queries.push(callbackClosure(j, cellContent))

                    //unsafeWindow.test = queries

                    this.nCallbacks += 2

                    //TODO: maybe replace Metaweb.read with the "search service"?
                    //if(this.nCallbacks % 10 == 0) {
                    if(queries.length > QUERY_BUNDLE_SIZE) {
                        unsafeWindow.Metaweb.read.apply(null, queries)
                        queries = new Array()
                    }

		    //unsafeWindow.Metaweb.read(query, callbackClosure(j, cellContent));
		}
	    }
	}
    }
    if(queries.length > 0) {
        unsafeWindow.Metaweb.read.apply(null, queries)        
    }
}

/*
element: the string we asked for the types of
*/
Table.prototype.getTypesCallback = function(result, colNum, element)
{
    var types = {};

    if(result) {
        for(var i = 0; i < result.length; i++) {
	    for(var j = 0; j < result[i].type.length; j++) {
	        types[result[i].type[j]] = 1;

                if(!this.stringTypes[element]) {
                    this.stringTypes[element] = new Object()
                }
                if(!this.stringTypes[element][result[i].type[j]])
                    this.stringTypes[element][result[i].type[j]] = new Object()
                this.stringTypes[element][result[i].type[j]][result[i].id] = 1
            }
        }

        if(this.colTypeCounts[colNum] == null) this.colTypeCounts[colNum] = new Array();
        var str = 'types for ' + element + ': {';
        for(var type in types)
        {
            if(type.match(reGuid))   //Skip these /guid/... types
                continue
	    if(this.colTypeCounts[colNum][type] == null) {
                this.colTypeCounts[colNum][type] = 1;
            } else {
                this.colTypeCounts[colNum][type]++;
            }
	    str += type + ' ';
        }
        //	GM_log(str + '}');
    }

    this._nTypeCallbacks[colNum]--
    if(this._nTypeCallbacks[colNum] == 0) this.typeCallbacksDone(colNum);
}

/*
called after all get-type callbacks for the given column return
*/
Table.prototype.typeCallbacksDone = function(colNum)
{
    if(this.colTypeCounts[colNum] == null) return;
    
    var types = sortProperties(this.colTypeCounts[colNum]);
    this.getTypeFreqs(colNum, types);
}

/********************/

/*
get global freebase entity count for each type in types

types: enumerable
*/
Table.prototype.getTypeFreqs = function(colNum, types)
{
    //    GM_log('getting freqs for col ' + colNum);
    //top N non-blacklisted types wrt count found in table, plus blacklisted types we found a lot of
    var bestTypes = enumerateNotInAnotherSetWithMax(types, cs544.typeBlacklist, 25);
    /*	GM_log('top N types:');
	Array.forEach(bestTypes, function(obj) {GM_log(obj);});
	for(var i = 0; i < bestTypes.length; i++)
*/
    var queriesNCallbackClosures = new Array(); //arguments to Metaweb.read(), in order
    for(var i = 0; i < bestTypes.length; i++)
    {
	var fbType = bestTypes[i];
	if(cs544.typeFreqs[fbType] == null) //if we haven't already queried for this type
	{
	    var query = [{
		type: fbType,
		return: 'estimate-count'
	    }];
	    var tmpThis = this;
	    var callbackClosure = 
	        function(colNum, type)
            {
		return function(result) {tmpThis.getTypeFreqsCallback(result, colNum, type);};
	    };
	    this._nTypeFreqCallbacks[colNum]++;
	    
	    queriesNCallbackClosures.push(query);
	    queriesNCallbackClosures.push(callbackClosure(colNum, fbType));
	}
    }
    if(queriesNCallbackClosures.length > 0) {
        unsafeWindow.Metaweb.read.apply(null, queriesNCallbackClosures);
    } else {
        //Need to increment the count, so we know when we're done...
        this.numColsTypeFreqCallbacksDone++
    }
}

/*
really only a function of typeName; colNum is only necessary to help us count outstanding callbacks, and I'm not sure that's actually needed -- EVH
*/
Table.prototype.getTypeFreqsCallback = function(result, colNum, typeName)
{
    //	GM_log('freq for type ' + typeName + ' = ' + result);
    cs544.typeFreqs[typeName] = result;
    
    this._nTypeFreqCallbacks[colNum]--;
    if(this._nTypeFreqCallbacks[colNum] == 0)
    {
        //GM_log(colNum + " done")
	this.numColsTypeFreqCallbacksDone++;
	if(this.numColsTypeFreqCallbacksDone == this.numEntityCols) this.typeFreqCallbacksDone();
    }
}

/*
return an estimate of the number of entities of type typeName in freebase
*/
function getGlobalTypeFreq(typeName)
{
    var defaultGuess = 10000; //should be more than the counts of most entity types -- if we don't know about a type we should probably downgrade it
    if(cs544.typeFreqs[typeName]) return cs544.typeFreqs[typeName];
    else return defaultGuess;
}

/*
called after type-freq callbacks all return (ie we have counts for all types found for all columns)
*/
Table.prototype.typeFreqCallbacksDone = function()
{
    var minGlobalFreq = 1000; //minimum global type freq we'll use in the TFIDF formula (avoid overweighting very rare types)
    userRe  = new RegExp("^/user/") // Regex for recognizing user types
    musicRe = new RegExp("^/music/") // Regex for recognizing music types
    this.colTypeTFIDFScores = new Array(); //for each column, hash of typename -> tf/idf score for that col and type
    for(var colNum = 0; colNum < this.nCols; colNum++)
        if(this.colIsEntity[colNum]) {

    	this.colTypeTFIDFScores[colNum] = new Object();
    	for(var type in this.colTypeCounts[colNum])
    	{
            //				GM_log('getting tfidf for ' + type);
	    this.colTypeTFIDFScores[colNum][type] = Math.pow(this.colTypeCounts[colNum][type],2) / Math.sqrt(Math.max(getGlobalTypeFreq(type), minGlobalFreq));
            if(type.match(userRe) || type.match(musicRe)) {
                this.colTypeTFIDFScores[colNum][type] *= 0.5      //Penalize user types (less reliable?)
            }
    	}
	
	var types = sortProperties(this.colTypeTFIDFScores[colNum]);
	
	//TODO: Query Freebase to get attribute mappings from types to other columns
	this._RC_TypeTable[colNum]    = document.createElement("table");
	this._RC_TypeTable[colNum].id = 'RC_Menu-' + this._tNum + '-' + colNum
	this._RC_TypeTable[colNum].innerHTML = ''
	
	//shared by all callbacks we're about to create
	var tmpThis = this;
	
        var callbackClosure = function(column) {
            return function(event) {
                tmpThis._RC_TypeTable[column].style.display = 'none';
            }
        }

	//Add some callbacks to the context menu
	this._RC_TypeTable[colNum].addEventListener('click', callbackClosure(colNum), true)
	
        this._RC_TypeTable[colNum].innerHTML += '<tr><td>' + colNum + '</td></tr>';

	var nTypes = 0
        this.topTypes[colNum] = new Object()
	for(var t in types)
	    //    	if(!cs544.typeBlacklist.contains(types[t])) even blacklisted types are sometimes appropriate -- EVH
	{
            if(types[t].match(reType) || 
               types[t].match(reGuid) || 
               types[t].match(/^\/user\//) || 
               types[t].match(/^\/base\//))  //Filter out /type/* or /guid/* or user defined types
                continue
            this.topTypes[colNum][types[t]] = 1            //query for all attribute values of all strings with these types.
	    //this._RC_TypeTable[colNum].innerHTML += '<tr><td>' + types[t] + '</td><td>' + this.colTypeTFIDFScores[colNum][types[t]] + '</td><tr>'
            this._RC_TypeTable[colNum].innerHTML += '<tr><td>' + types[t] + 
                '</td><td>' + this.colTypeTFIDFScores[colNum][types[t]] + '</td>' +
                '</td><td>' + this.colTypeCounts[colNum][types[t]] + '</td></tr>'
	    if(nTypes++ >= NUMBER_OF_TYPES_DISPLAY) break;
	}
        
	this._RC_TypeTable[colNum].setAttribute('style', menuStyle)
	this._RC_TypeTable[colNum].style.position = 'absolute'
	
	var children = this._RC_TypeTable[colNum].getElementsByTagName("*")
	for(var i=0; i<children.length; i++) children[i].setAttribute('style', menuStyle);
	
	//Insert at bottom of page (not visible)
	this._RC_TypeTable[colNum].style.display = 'none';
	document.body.appendChild(this._RC_TypeTable[colNum])
	
	//Now add handlers to all cells in the column
	for(var i=1; i<this.nRows; i++)
	{
	    if(this.getCell(i,colNum) == null) continue;
	    
	    this.getCell(i,colNum).style.background = 'DarkGray';
	    
	    var callbackClosure = function(column)
	    {
	    	return function(event)
	    	{
	    	    tmpThis._RC_TypeTable[column].style.left = getEventX(event) + "px";
	    	    tmpThis._RC_TypeTable[column].style.top  = getEventY(event) + "px";
	    	    tmpThis._RC_TypeTable[column].style.display = '';
	    	}
	    };
	    this.getCell(i,colNum).addEventListener('click', callbackClosure(colNum), true);
	}
    }

    //Fetches the properties for all types in topTypes
    this.getProperties()
    //this.generateColumnMaps() //Needs to be called in callback
}

/*
TODO: split this out into getProperties, and getPropertyValues.  We can do a better job of
querying if we know which types we are querying for.  (for example, getting the right
values for dated integers...)
*/

//Fetches the attributes for all types in topTypes and stores them in this.props
Table.prototype.getProperties = function() {
    var queries = new Array()   //arguments to Metaweb.read()

    this.nCallbacks = 0
    this.nComplete  = 0
    for(var col=0; col<this.nCols; col++) {
        for(var t in this.topTypes[col]) {

            var propTypeQuery = {
                id :         t,
                type :       "/type/type",
                properties : [{"expected_type":null, "name":null, "key":null}]
            };

            //For getting the properties and expected types
            var tmpThis = this
            var callbackClosurePT = function(type) {
                return function(result) {
                    if(result != null) {
                        if(!tmpThis.props[type])
                            tmpThis.props[type] = new Object()
                        for(var i in result.properties) {
                            var key = result.properties[i].key
                            if(key == null || objProperties[key])
                                continue
                            tmpThis.props[type][key] = result.properties[i]
                        }
                    }

                    tmpThis.nComplete++
                    if(tmpThis.nComplete == tmpThis.nCallbacks) {
                        tmpThis.getPropertyValues()
                    }
                }
            }

            queries.push(propTypeQuery)
            queries.push(callbackClosurePT(t))

            this.nCallbacks++

            //Can't bundle too many queries together...
            //if(this.nCallbacks % 10 == 0) {
            if(queries.length > QUERY_BUNDLE_SIZE) {
                unsafeWindow.Metaweb.read.apply(null, queries);
                queries = new Array()
            }
        }
    }
    
    //Complete any odd queries
    if(queries.length > 0) {
        unsafeWindow.Metaweb.read.apply(null, queries);
    }
}

//Fetches the attribute values for all string data in this.stringProps
Table.prototype.getPropertyValues = function() {
    var queries = new Array()   //arguments to Metaweb.read()

    this.nCallbacks = 0
    this.nComplete  = 0
    for(var col=0; col<this.nCols; col++) {
        //for(i in this.topTypes[col]) {
        //var t = this.topTypes[col][i]
        for(var row=1; row<this.nRows; row++) {
            var s = this.getCellContent(row,col)
            var k
            if(typeof(s) == 'string')
                k = s.replace(/ /g, "_")
            else
                k = s
            if(!s || !this.stringTypes[s])
                continue

            //GM_log(row + "\t" + col + "\t" + s)

            for(var t in this.stringTypes[s]) {
                if(!this.topTypes[col] || !this.topTypes[col][t])
                    continue

                for(var id in this.stringTypes[s][t]) {
                    var propValQuery = [{
                        type: t,
                        id:id,
                        "*": []
                    }];

                    var measurementUnitQuery = [{
                        type: t,
                        id:id
                    }];

                    for(var prop in this.props[t]) {
                        if(objProperties[prop] || prop == 'undefined')     //Don't bother with properties of /type/object
                            continue

                        //GM_log(t + "\t" + prop)

                        if(this.props[t][prop].expected_type &&
                           this.props[t][prop].expected_type.match(/^\/measurement_unit\//)) { 
                            //Have to go one more step to get the number
                            measurementUnitQuery[0][prop] = [{
                                "*": null,
                                optional: true
                            }]
                        }
                    }

                    //For getting the values
                    var tmpThis = this
                    var callbackClosurePV = function(string, type) {

                        
                        return function(result) {
                            if(result != null) {
                                for(var i in result) {
                                    if(typeof result[i] == 'function')      //TODO Wierd case...  this is from http://grad-schools.usnews.rankingsandreviews.com/grad/com/search
                                        continue

                                    if(!tmpThis.stringProps[string])
                                        tmpThis.stringProps[string] = new Object()
                                    if(!tmpThis.stringProps[string][type])
                                        tmpThis.stringProps[string][type] = new Object()

                                    for(var prop in result[i]) {
                                        if(allNull(result[i][prop]))
                                            continue

                                        tmpThis.stringProps[string][type][prop] = result[i][prop]

                                        if(!result[i][prop] || result[i][prop].length == 0)       //Skip empty lists and nulls
                                            continue
                                        if(!tmpThis.propCounts[type])
                                            tmpThis.propCounts[type] = new Object()
                                        if(!tmpThis.propCounts[type][prop])
                                            tmpThis.propCounts[type][prop] = new Object()
                                        tmpThis.propCounts[type][prop][string] = 1
                                    }
                                }
                            }
                            tmpThis.nComplete++

                            //GM_log(string + "\t" + type + "\t" + tmpThis.nComplete + "\t" + tmpThis.nCallbacks)
                            if(tmpThis.nComplete == tmpThis.nCallbacks) {
                                tmpThis.generateColumnMaps()
                                tmpThis.displayAdditionalColumns()
                            }
                        }
                    }

                    queries.push(propValQuery)              //Properties "*"
                    queries.push(callbackClosurePV(s,t))

                    queries.push(measurementUnitQuery)      //Measurement units (require an extra level)
                    queries.push(callbackClosurePV(s,t))
                    
                    this.nCallbacks += 2

                    if(queries.length > 15) {  //measurementUnitQuery has more stuff....
                        unsafeWindow.Metaweb.read.apply(null, queries);
                        queries = new Array()
                    }
                }
            }
        }
    }
    //Complete any odd queries
    if(queries.length > 0) {
        unsafeWindow.Metaweb.read.apply(null, queries);
    }
}

/*
Gives the user the option to display additional columns in the table via Freebase
*/
Table.prototype.displayAdditionalColumns = function() {
    //GM_log('displayAdditionalColumns')

    //menu
    menuCell = document.createElement('th')
    menuCell.textContent = "Add Column"
    menuCell.style.backgroundColor = 'LightBlue'
    this._dom.rows[this.headerStart].appendChild(menuCell)

    //TODO:  Need to keep track of the current column
    //User needs to select a column whose properties to display
    
    var tmpThis = this
    var choosePropCallback = function(type, property) {
        return function(event) {
            var header   = tmpThis._dom.rows[tmpThis.headerStart]
            var cellHead = header.insertCell(header.cells.length-1)
            var cells = new Array()
            for(var irow=1; irow<tmpThis.nRows; irow++) {
                var row     = tmpThis._dom.rows[irow+tmpThis.headerStart]
                cells[irow] = row.insertCell(row.cells.length)
            }

            for(var eCol=0; eCol<tmpThis.nCols; eCol++) {
                //alert(tmpThis.colIsEntity[eCol])
                if(!tmpThis.colIsEntity[eCol])
                    continue

                cellHead.textContent = property
                for(var irow=1; irow<tmpThis.nRows; irow++) {
                    var row    = tmpThis._dom.rows[irow+tmpThis.headerStart]
                    var entity = tmpThis.getCellContent(irow, eCol)
                    var cell   = cells[irow]
                    
                    if(!tmpThis.stringProps[entity] ||
                       !tmpThis.stringProps[entity][type] ||
                       !tmpThis.stringProps[entity][type][property])
                        continue
                    
                    //Make sure it's a list
                    var values
                    //if(!tmpThis.stringProps[entity][type][property].length > 0)
                    if(isArray(tmpThis.stringProps[entity][type][property].length))
                        values = [tmpThis.stringProps[entity][type][property]]
                    else
                        values = tmpThis.stringProps[entity][type][property]

                    for(var v in values) {
                        var value = values[v]
                        if(typeof(value) == "string" || typeof(value) == "number") {
                            cell.innerHTML += value + "<br>"
                        } else {
                            for(var p in value)
                                if(typeof(value[p]) == "number") {
                                    cell.innerHTML += value[p] + "<br>"
                                }
                        }
                    }
                    //cell.innerHTML += values.join("<br>")

                    //cell.textContent = type + "<br>" + property
                    //tmpThis._dom.rows[irow].appendChild(cell)
                }
            }
            tmpThis.attMenu.style.display='none'
        }
    }

    this.attMenu = document.createElement("table")
    this.attMenu.innerHTML = 'test'
    this.attMenu.setAttribute('style', menuStyle)
    this.attMenu.style.position = 'absolute'
    this.attMenu.style.display = 'none'
    document.body.appendChild(this.attMenu)

    //fill in this.attMenu
    for(var type in this.props) {
        for(var prop in this.props[type]) {
            var propName = this.props[type][prop].name
            if(!this.propCounts[type] || !this.propCounts[type][prop])
                continue

            var row  = document.createElement("tr")

            var col1 = row.insertCell(0)
            col1.textContent = type
            col1.setAttribute('style', menuStyle)
            col1.addEventListener('click', choosePropCallback(type, prop), true)

            var col2 = row.insertCell(1)
            col2.textContent = propName
            col2.setAttribute('style', menuStyle)
            col2.addEventListener('click', choosePropCallback(type, prop), true)

            var col3 = row.insertCell(2)
            col3.textContent = attributes(this.propCounts[type][prop]).length
            col3.addEventListener('click', choosePropCallback(type, prop), true)            

            this.attMenu.appendChild(row)
        }
    }

    var tmpThis = this
    var propMenuCallback = function(event) {
        tmpThis.attMenu.style.left    = getEventX(event) + "px"
        tmpThis.attMenu.style.top     = getEventY(event) + "px"
        tmpThis.attMenu.style.display = ''        
    }

    menuCell.addEventListener('click', propMenuCallback, true)

}

Table.prototype.stringInstDist = function(eCol,nCol,type,propName) {
    var sum   = 0
    var count = 0

    for(var iRow=1; iRow<this.nRows; iRow++) {
        var c1str   = this.getCellContent(iRow,eCol)
        var c2str   = this.getCellContent(iRow,nCol)

        if(propName && c2str && 
           this.stringProps[c1str] && 
           this.stringProps[c1str][type] && 
           this.stringProps[c1str][type][propName] &&
           this.stringProps[c1str][type][propName][0]) {
            //var prop    = this.stringProps[c1str][type][propName].value
            var prop    = this.stringProps[c1str][type][propName][0].toString()

            distance = levenshtein(prop, c2str)
            sum += distance / (Math.min(prop.length, c2str.length) + 1)
            count += 1
        }
    }

    /*
    GM_log("propName = " + propName +
           "\nCol  = " + nCol +
           "\nsum = " + sum +
           "\ncount = " + count)
*/

    return sum/count
}

Table.prototype.absDist = function(eCol,nCol,type,propName) {
    var sum   = 0
    var count = 0

    for(var iRow=1; iRow<this.nRows; iRow++) {
        var c1str   = this.getCellContent(iRow,eCol)
        var c2num   = parseFloat(this.getCellContent(iRow,nCol))

        if(this.stringProps[c1str] && 
           this.stringProps[c1str][type] && 
           this.stringProps[c1str][type][propName]) {
            //var prop    = this.stringProps[c1str][type][propName].value
            var prop    = this.stringProps[c1str][type][propName][0]
            var propVal = getNumber(prop)

            //GM_log(type + "\t" + propName + "\t" + propVal + "\t" + c2num + "\t" + unsafeWindow.JSON.stringify(prop))

            sum   += Math.abs(propVal - c2num) / Math.min(Math.abs(propVal), Math.abs(c2num))
            count += 1
        }
    }

    /*
    GM_log("propMag = " + propMag +
           "\ncolMag  = " + colMag +
           "\ndotProd = " + dotProd)
*/

    return sum/count
}

//computes the cosine distance between a numeric column (nCol) in the HTML table
//and a specific (numeric) attribute of the entities of type "type" in eCol
Table.prototype.cosine = function(eCol,nCol,type,propName) {
    var propMag = 0  //Property magnitude
    var colMag  = 0  //Column Magnitude
    var dotProd = 0

    for(var iRow=1; iRow<this.nRows; iRow++) {
        var c1str   = this.getCellContent(iRow,eCol)
        var c2num   = parseFloat(this.getCellContent(iRow,nCol))

        if(this.stringProps[c1str] && 
           this.stringProps[c1str][type] && 
           this.stringProps[c1str][type][propName]) {
            //var prop    = this.stringProps[c1str][type][propName].value
            var prop    = this.stringProps[c1str][type][propName][0]
            var propVal = getNumber(prop)

            //GM_log(type + "\t" + propName + "\t" + propVal + "\t" + c2num + "\t" + unsafeWindow.JSON.stringify(prop))

            propMag += propVal * propVal
            //colMag  += c1num   * c1num
            //dotProd += propVal * c1num
            colMag  += c2num   * c2num
            dotProd += propVal * c2num
        }
    }

    colMag  = Math.sqrt(colMag)
    propMab = Math.sqrt(propMag)

    if(propMag == 0)
        return 0

    /*
    GM_log("propMag = " + propMag +
           "\ncolMag  = " + colMag +
           "\ndotProd = " + dotProd)
*/

    return dotProd / (colMag * propMag)
}

//Generates arrays of scores between the indicated column and each property
Table.prototype.generateColumnMaps = function() {
    GM_log('generateColumnMaps')

    var propScore = new Array()   //Will contain the score between property p and column j
    var colMag  = new Array()    //Magnitudes of columns
    var propMag = new Object()   //Magnitudes of property arrays

    //Compute cosine distance where applicable
    for(var eCol = 0; eCol<this.nCols; eCol++) {
        this.cosineDistance[eCol] = new Object()
        this.absDistance[eCol]    = new Object()
        this.stringInstanceDistance[eCol] = new Object()
        for(var type in this.topTypes[eCol]) {
            if(!this.cosineDistance[eCol][type]) {
                this.cosineDistance[eCol][type] = new Object()
                this.absDistance[eCol][type]    = new Object()
            }
            if(!this.stringInstanceDistance[eCol][type])
                this.stringInstanceDistance[eCol][type] = new Object()
            for(var prop in this.props[type]) {
                if(!this.cosineDistance[eCol][type][prop]) {
                    this.cosineDistance[eCol][type][prop] = new Array()
                    this.absDistance[eCol][type][prop]    = new Array()
                }
                if(!this.stringInstanceDistance[eCol][type][prop])
                    this.stringInstanceDistance[eCol][type][prop] = new Array()
                //GM_log(type + "\t" + prop + "\t" + this.props[type][prop].expected_type)      //TODO: check for more types...
                var expected_type = this.props[type][prop].expected_type
                if(expected_type &&
                   (expected_type == "/type/float" ||
                    expected_type == "/type/int" ||
                    expected_type.match(/^\/measurement_unit\//))) {
                    //GM_log(eCol + "\t" + "\t" + "\t" + type + "\t" + prop)
                    //Numeric distance
                    for(var aCol = 0; aCol<this.nCols; aCol++)
                        if(this.columnTypes[aCol] == 'number') {
                            //GM_log(eCol + "\t" + aCol + "\t" + "\t" + type + "\t" + prop)
                            this.cosineDistance[eCol][type][prop][aCol] = this.cosine(eCol,aCol,type,prop)
                            this.absDistance[eCol][type][prop][aCol]    = this.absDist(eCol,aCol,type,prop)
                        }
                } else {
                    for(var aCol = 0; aCol<this.nCols; aCol++)
                        if(this.columnTypes[aCol] == 'string' || this.columnTypes[aCol] == 'date') {
                            this.stringInstanceDistance[eCol][type][prop][aCol] = this.stringInstDist(eCol,aCol,type,prop)
                        }
                }
            }
        }
    }
    
    removeEmpty(this.cosineDistance)    
    removeEmpty(this.absDistance)
    removeEmpty(this.stringInstanceDistance)

    //Get a list of unique "top types"
    var allTopTypes = new Object()
    for(var col=0; col<this.nCols; col++) {
        for(var type in this.topTypes[col]) {
            allTopTypes[type] = 1
        }
    }

    //Compute edit distance between property and column name
    for(var col = 0; col<this.nCols; col++) {
        this.propHeaderEditDistance[col] = new Object()
        for(var type in allTopTypes) {
            for(var key in this.props[type]) {
                var prop = this.props[type][key].name 
                //GM_log(type + "\t" + prop)
                if(!this.propHeaderEditDistance[col][type])
                    this.propHeaderEditDistance[col][type] = new Object()
                if(this.getCellContent(0,col)) {
                    //this.propHeaderEditDistance[col][type][prop] = levenshtein(prop,this.getCellContent(0,col))
                    this.propHeaderEditDistance[col][type][prop] = stringDistanceUsingWords(prop.split(" "),this.getCellContent(0,col).split(" "))
                }
            }
        }
    }

    //Rank properties for each column, and display menu.
    //Menu: type->column->property_or_add_new
    this.generateColumnHeaderMenus()
}

//Called once propHeaderEditDistance, and distance (cosine) are computed.
//Generates menus for each column header allowing the user to add attribute values to Freebase (or create a new attribute?)
Table.prototype.generateColumnHeaderMenus = function() {
    //GM_log('generateColumnHeaders')
    var tmpThis = this
    var chooseMapCallback = function(eCol, aCol, type, property) {
        return function(event) {
            //GM_log('choseMapCallback\t' + type + "\t" + property)
            for(var row=0; row<tmpThis.nRows; row++) {
                var entity = tmpThis.getCellContent(row,eCol)
                var value  = tmpThis.getCellContent(row,aCol)
                //GM_log(entity + "\t" + value)
                if(entity && value &&
                   //tmpThis.stringTypes[entity] &&
                   //tmpThis.stringTypes[entity][type] &&
                   tmpThis.stringProps[entity] &&
                   tmpThis.stringProps[entity][type] &&
                   !tmpThis.stringProps[entity][type][property] &&      //Doesn't already exist in Freebase!
                   getProperties(tmpThis.stringTypes[entity][type]).length == 1) { //Only one value
                    for(var id in tmpThis.stringTypes[entity][type]) {
                        var query = {
                            id:id,
                            type:type
                        }

                        expected_type = tmpThis.props[type][property].expected_type

                        if(expected_type.match(/^\/type/)) {
                            if(expected_type == "/type/int" ||
                               expected_type == "/type/float") {
                                query[property] = {
                                    connect: 'insert',
                                    value:   parseFloat(value)
                                }
                            } else if (expected_type == "/type/text") {
                                query[property] = {
                                    connect: 'insert',
                                    value:   value,
                                    lang: 'en'
                                }
                            } else if(expected_type == "/type/datetime") {
                                if(!value.match(/^\d{3,4}$/)) {
                                    v = Date.parse(value)
                                    if(v) {
                                        v = v.toJSONString().replace("T00:00:00Z","")
                                    }
                                } else {
                                    v = value
                                }
                                    
                                if(v) {
                                    query[property] = {
                                        connect: 'insert',
                                        value: v,
                                        type: expected_type
                                    }
                                }
                            }
                        } else if(expected_type.match(/^\/measurement_unit/)) {
                            query[property] = {
                                create:  'unless_connected',
                                //connect: 'insert',
                                type:     expected_type,
                                number:   value
                            }
                        } else {
                            //I didn't think this would work... But it does!
                            query[property] = {
                                connect: 'insert',
                                name:    value,
                                type:    expected_type
                            }
                        }

                        GM_log(unsafeWindow.JSON.stringify(query))
                        mqlWrite(query, null)
                    }
                }
            }
        }
    }

    this.mapMenus     = new Array()
    this.mapMenusHTML = new Array()
    for(var aCol=0; aCol<this.nCols; aCol++) {
        this.mapMenus[aCol] = new Object()
        for(var type in this.props) {
            //this.mapMenus[aCol][type] = new Object()
            for(var eCol=0; eCol<this.nCols; eCol++) {
                //this.mapMenus[aCol][type][eCol] = new Object()
                var typeCol = type + "\tcol=" + eCol
                if(!this.mapMenus[aCol][typeCol])
                    this.mapMenus[aCol][typeCol] = new Object()
                if(this.colIsEntity[eCol] && eCol != aCol) {
                    for(var prop in this.props[type]) {
                        //GM_log(aCol + "\t" + type + "\t" + prop)
                        /*
                        if(this.props[type][prop].expected_type == "/type/float" ||
                           this.props[type][prop].expected_type == "/type/int" ||
                           this.props[type][prop].expected_type == "/type/text" ||
                           this.props[type][prop].expected_type == "/type/datetime" ||
                           this.props[type][prop].expected_type == "/type/rawstring") {
*/
                        if(EVALUATION_MODE || this.props[type][prop].expected_type.match(/^\/type/)) {
                            var propName = this.props[type][prop].name
                            this.mapMenus[aCol][typeCol][propName] = {}
                            this.mapMenus[aCol][typeCol][propName].callback = chooseMapCallback(eCol, aCol, type, prop)
                            this.mapMenus[aCol][typeCol][propName].score    = this.matchScore(eCol, aCol, type, prop)
                            //GM_log(prop + "\t" + this.props[type][prop].expected_type + "\t" + typeof( this.mapMenus[aCol][typeCol][propName]))
                        }
                    }
                }
            }
        }
        removeEmpty(this.mapMenus[aCol])
        this.mapMenusHTML[aCol] = generateFlatMenu(this.mapMenus[aCol], 'Add to Freebase')
    }

    var tmpThis = this
    var displayMenuCallback = function(column) {
        return function(event) {
            //GM_log('displayMenu' + column)
            tmpThis.mapMenusHTML[column].style.left = getEventX(event) + "px"
            tmpThis.mapMenusHTML[column].style.top  = getEventY(event) + "px"
            tmpThis.mapMenusHTML[column].style.display = ''
        }
    }

    for(var i=0; i<this.nCols; i++) {
        var buttonRow = this.headerStart -1
        if(this._dom.rows[buttonRow] && this._dom.rows[buttonRow].cells[i])
            this._dom.rows[buttonRow].cells[i].addEventListener('click', displayMenuCallback(i), true)
    }
}

//Returns a score for this mapping based on a variety of factors
Table.prototype.matchScore = function(eCol, aCol, type, prop) {
    var editSimilarity
    var cosineSimilarity
    var absSimilarity
    var tfIDF
    var stringInstSim

    //Edit distance is computed using the name (not the key)
    var propName = this.props[type][prop].name

    var propType
    //Return null for non-matching types
//    GM_log('type ' + type + ', prop ' + prop);// + ': ' + unsafeWindow.JSON.stringify(this.props[type][prop]));
    if(this.props[type][prop].expected_type == "/type/float" ||
       this.props[type][prop].expected_type == "/type/int" ||
       (this.props[type][prop].expected_type &&
        this.props[type][prop].expected_type.match(/^\/measurement_unit/))) {
        propType = 'number'
    } else if(this.props[type][prop].expected_type == "/type/datetime") {
        propType = 'date'
    } else {
        propType = 'string'
    }
    /*
    else if(this.props[type][prop].expected_type == "/type/text" ||
            this.props[type][prop].expected_type == "/type/rawstring") {
        propType = 'string'        
    }
*/
    
    //GM_log(type + "\t" + prop + "\t" + propType + "\t" + this.columnTypes[aCol])
    if(propType != this.columnTypes[aCol] && 
       !(propType == 'date'   && this.columnTypes[aCol] == 'number' || 
         propType == 'number' && this.columnTypes[aCol] == 'date')) {
        return null
    }

    if(this.propHeaderEditDistance[aCol] != null && 
       this.propHeaderEditDistance[aCol][type] != null &&
       this.propHeaderEditDistance[aCol][type][propName] != null) {
        editSimilarity = 1/this.propHeaderEditDistance[aCol][type][propName]
    } else {
        editSimilarity = -1
    }
    if(this.cosineDistance[eCol] &&
       this.cosineDistance[eCol][type] &&
       this.cosineDistance[eCol][type][prop] &&
       this.cosineDistance[eCol][type][prop][aCol]){
        cosineSimilarity = 1-this.cosineDistance[eCol][type][prop][aCol]
        absSimilarity    = 1/this.absDistance[eCol][type][prop][aCol]
    } else {
        cosineSimilarity = -1
        absSimilarity    = -1
    }
    if(this.stringInstanceDistance[eCol] &&
       this.stringInstanceDistance[eCol][type] &&
       this.stringInstanceDistance[eCol][type][prop] &&
       this.stringInstanceDistance[eCol][type][prop][aCol]) {
        stringInstSim = 1/this.stringInstanceDistance[eCol][type][prop][aCol]
    } else {
        stringInstSim = -1
    }
    if(this.colTypeTFIDFScores[eCol][type] &&
       this.colTypeTFIDFScores[eCol][type]) {
        tfIDF = this.colTypeTFIDFScores[eCol][type]
    } else {
        tfIDF = -1
    }

    var result = 1.0/(1.0 + Math.exp(-(editSimilarity + Math.max(absSimilarity, cosineSimilarity) + tfIDF + stringInstSim)))
    
    /*
    if(aCol == 1)
        GM_log(eCol + "\t" + aCol + "\t" + type + "\t" + prop + '\n' +
               'editSimilarity  =' + editSimilarity + '\n' +
               'cosineSimilarity=' + cosineSimilarity + '\n' +
               'tfIDF         =' + tfIDF + '\n' +
               'result        =' + result)
*/

    return result
}

/************************************************************
main
*/

var tables = document.getElementsByTagName('table');
unsafeWindow.Metaweb.tables = new Array();
for(var iTab=0; iTab<tables.length; iTab++ )
{
    var t = new Table(tables[iTab], iTab);
    unsafeWindow.Metaweb.tables[iTab] = t;
}

unsafeWindow.Metaweb.currentEvent = null;
