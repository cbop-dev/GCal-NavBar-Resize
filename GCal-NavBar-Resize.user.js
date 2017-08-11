// ==UserScript==
// @name        Google Calendar - Resize Navigation Sidebar
// @namespace   calendar.google.com
// @version 0.2.2
// @description Makes the G-Cal navigation sidebar re-sizable. Adds a column border that can be dragged with the mouse.
// @license MIT License (Expat)
// @include       https://calendar.google.com/calendar/render*
// @grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
//window.alert('test');
var i = 0;
var dragging = false;
var main = $('#mainbody');
var nav = $('#nav');
var scrollbarID = '#chrome_cover2';
var scrollbar = $(scrollbarID);

var ghostbar = $('<div>',
                        {id:'ghostbar',
                         css: {
                                height: main.outerHeight(),
                                top: main.offset().top,
                               'background-color': 'black',
		                           height: '100%',
                               top: '0',
		                           'margin-left': $('#mainbody').css('margin-left'),
		                           'width': '3px',
		                           'cursor': 'col-resize',
		                           'float': 'left',
		                           'position': 'absolute',
                               'z-index': '50'             
                               }
                        }).appendTo('#maincell');

ghostbar.mousedown(function (e) {

  e.preventDefault();
  dragging = true;
  
  $(document).mousemove(function (e) {

    ghostbar.css('margin-left', e.pageX + 2);
  });
});

window.onload = function() {
  //window.alert("Onload!");
};

$(document).mouseup(function (e) {
  if (dragging)
  {
    $('#mainbody').css('margin-left', e.pageX + 10);
   ghostbar.css('margin-left', e.pageX + 2);
    $('#nav').css('width', e.pageX - 30);
  
    $(document).unbind('mousemove');
    dragging = false;
  }
});

$(window).on('hashchange', function() {
  if (location.hash.lastIndexOf('#main', 0) === -1) {
     $('#ghostbar').hide();
    /*window.alert("hiding!");*/
  }
  else
  {
    //window.alert("showing!");
    $('#ghostbar').show();
  }
});
