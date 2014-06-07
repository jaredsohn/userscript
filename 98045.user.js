// ==UserScript==                    
// @name Instructables AllSteps PDF Extra link
// @description Creates a pdf icon so you can download the pdf for free. Please comment, so other people can read some of your feedback.
// @include http://*.instructables.com/id/*
// @exclude http://*.instructables.com/id/*/?download=pdf
// @exclude http://*.instructables.com/pdf/*
// ==/UserScript==
//
url = location.href;
if(url.indexOf('instructables.com/id/')!=-1 ){
  var iStart = url.indexOf('instructables.com/id/') + 'instructables.com/id/'.length;
  var iStop  = url.indexOf('/',iStart);
  var key    = url.substring(iStart,iStop);
  var target = 'http://www.instructables.com/pdf/' + key + '/' + key + '.pdf';
  
  var link_div = document.createElement('div');
  var link_a   = document.createElement('a');
  var link_img = document.createElement('img');	
  
  var img64 = "R0lGODlhMAAwAHAAACH5BAAAAAAALAAAAAAwADAAhwAAAAAAMwAAZgAAmQAAzAAA/wArAAArMwArZgArmQArzAAr/wBVAABVMwBVZgBVmQBVzABV/wCAAACAMwCAZgCAmQCAzACA/wCqAACqMwCqZgCqmQCqzACq/wDVAADVMwDVZgDVmQDVzADV/wD/AAD/MwD/ZgD/mQD/zAD//zMAADMAMzMAZjMAmTMAzDMA/zMrADMrMzMrZjMrmTMrzDMr/zNVADNVMzNVZjNVmTNVzDNV/zOAADOAMzOAZjOAmTOAzDOA/zOqADOqMzOqZjOqmTOqzDOq/zPVADPVMzPVZjPVmTPVzDPV/zP/ADP/MzP/ZjP/mTP/zDP//2YAAGYAM2YAZmYAmWYAzGYA/2YrAGYrM2YrZmYrmWYrzGYr/2ZVAGZVM2ZVZmZVmWZVzGZV/2aAAGaAM2aAZmaAmWaAzGaA/2aqAGaqM2aqZmaqmWaqzGaq/2bVAGbVM2bVZmbVmWbVzGbV/2b/AGb/M2b/Zmb/mWb/zGb//5kAAJkAM5kAZpkAmZkAzJkA/5krAJkrM5krZpkrmZkrzJkr/5lVAJlVM5lVZplVmZlVzJlV/5mAAJmAM5mAZpmAmZmAzJmA/5mqAJmqM5mqZpmqmZmqzJmq/5nVAJnVM5nVZpnVmZnVzJnV/5n/AJn/M5n/Zpn/mZn/zJn//8wAAMwAM8wAZswAmcwAzMwA/8wrAMwrM8wrZswrmcwrzMwr/8xVAMxVM8xVZsxVmcxVzMxV/8yAAMyAM8yAZsyAmcyAzMyA/8yqAMyqM8yqZsyqmcyqzMyq/8zVAMzVM8zVZszVmczVzMzV/8z/AMz/M8z/Zsz/mcz/zMz///8AAP8AM/8AZv8Amf8AzP8A//8rAP8rM/8rZv8rmf8rzP8r//9VAP9VM/9VZv9Vmf9VzP9V//+AAP+AM/+AZv+Amf+AzP+A//+qAP+qM/+qZv+qmf+qzP+q///VAP/VM//VZv/Vmf/VzP/V////AP//M///Zv//mf//zP///wAAAAAAAAAAAAAAAAj/APcJHEiwoMGDCBMqJBiN3j5lD6E91LcMWj2LFCnSi6ZMmcOFIJURg6is3rJl9ZRFu5hyWUOOI4ll0gRyoL56+jbSU+Zu2KRhHentDBp0p1Fl+kZmmqlvITSew86ZA0f1W61sWKe9yjaNq9dpXbO9GpvqlR9GxCZlWqZQZrup375lkwb2mzau0rB+m0Y3W61vqeiiQuWq0FlomjJNgngwWiZJw8DJ9TVwnjZb2cBlvqvNrt27msGN9VNoUUeZmRgXrKc4smZ0+uZm4zw786u7sEDX1kbIzysqjDqKVKzapibIkrHB/oYKHDqH+WDVEzhP8/R98zKLTUXoz6JlwhOn/y4YbRiac3K/iRvIDt2+ctpgZ9v2Xj59c7fNEqIiRt9pZYplcp1A9BzXi2bZrOdNV+7Z5Q5B7LwDoV29FcKfMuCJNNx4Az3Gi2SuyDdNLbC9Fhtnvpw4211mWdifhpoMA4pMxAzk2CS2yDVNOPt4k5d7mkk3kFwDevZHd1SEsU+GHcWYGGP0PIZZNq50NU0qfEmjpTSo8IUKl9MMhsorvf1GRRVhXCTcSAAmNl00xLxxyyKM0BkGnXQywksvktjCiy29+MlIL7zMCQudk0giyVolYfifTIx1lBoxmhBDDChLLRYNW9F0qk80+4AK6jntOATqdDpB45Bwpw0k0UZNNf9VoCSaXLRTPfSwtcxNTdmC00sblWQReA+l1NFCywzzhkdskfTQkhTtA85O0C6jU0W5OtoRWwoB9RMoSD0ErjLJRPoJSeXKNAkoKT2LlLWqJeOLMH7aYksttWy1VVmBSfMKv1rqy69Zpo3XaEsWCSQTO73EBctcWtaizStaivXNllvVsiU2rrhCCCFhQDOStRWRdJFAigkTTr4XBzxQO68MRMw0vAwUjiupZKOKK34Qsgi4FFnUaEfXpXyLX6psWcs+4diizy3SxjyM0+H8u1XHhJgVRjKgFGvR1yfvowka7dw78ZbZ7GML1ODso/GDbecIC2Fj9kwII0+RBC/JDun/o0ka5mCmsdIDDbP0LdIQo08vA1GZDSxk9haGf9DsavmnKgmkyaBWZekyL3NNs8/FxLhji9r/asVdz1QsUiyG2ab00T6gnIcvLFtK880+iEuzNDHD6FP16Ko8/gosHkv+kEdfO1Q5Y4/dAlju/hLT8ivu9GK67+4ERrd+fvihpDISNQqeTiin8c3xc1FMvZb9bollKq5w/LEfVIjfVLEcNWQtqPsgBiYasYjSiGERi7jTIm6xtrUx8BYPhKAtCliISSTKggJZiape0i6BpEtDMUkMGohhioLsjyDnGIZECNKUdgxjGO1wh1D8t5CkLOZdnwrVQHixOwLRox3gwEzF/85xjiDywh2VOyFCWPOGYdTjJfv4SEO04Y6ktIOIMtzf1MAxDHokxR0VGRBCRLaYp+wDV6ByCFV4Qo8n7uNTnWILPYhxDlsQkR5JrOFxanWRleSQHtOYXTSacqqb6ORT9HghS5ClrHedEVRIBMc5BqlDVD3xkipJSUOemDmF+E0SxEAJRs6hjHZoo5I2AhVEkngRkhFtdghJVmr8Mx1bVDGQAnlTF6O4D6CwpFLPgkY0EqYQOI2QU1KJhjaGsaQ3hooRNAFVGjwCqkx8AlXWCltCCpQai8zDaeDgBag+NR1lqOUhxJDEMjAFILVIiibFaYx5iPFEd9SxVLnU4TASs6IMtWQqLYkRT1rieRBuks+SqmRJUzIFoH2oRRPQUMtIJpEG4nArISIbYRRfkpFmLWkS4pmEY2ZiTmvGqYy7WghrUiPHTZZzow0NKUgxMZMAoWYkNVGM4jjIEa8ZCyfaSkmNTrMrTTRqIcMxKps0BML/GHVNTf3PsUICin1a1UmZqGpi9pkJ4GEVQDPhaowIuk1KwmqQL0XkPsBWvjeq0q0DCggAOw==";
  
  link_div.setAttribute('class', 'tooltipByID ttid_PDF'); 
  link_a.setAttribute('href', target ); 	
  link_img.setAttribute('src', 'data:image/gif;base64,' + img64 ); 
  
  link_a.appendChild(link_img);
  link_div.appendChild(link_a);
  
  
  document.getElementById('steps-container').removeChild(document.getElementById('steps-container').lastChild);
  document.getElementById('steps-container').removeChild(document.getElementById('steps-container').lastChild);
  document.getElementById('steps-container').removeChild(document.getElementById('steps-container').lastChild);
  document.getElementById('steps-container').appendChild(link_div);
  
  //remove link to pdf from action links
  document.getElementById('actionLinksTop').removeChild(document.getElementById('actionLinksTop').firstChild);
 
  //remove google ads on top of page
  //document.getElementById('google_ads_div_workshop_leaderboard').parentNode.removeChild(document.getElementById('google_ads_div_workshop_leaderboard'));
  //document.getElementById('you').removeChild(document.getElementById('you').firstChild);	
  
  //remove google ads in right hand side bar
  //document.getElementById('google_ads_div_workshop_med_rectangle').parentNode.removeChild(document.getElementById('google_ads_div_workshop_med_rectangle'));
}     