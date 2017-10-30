// ==UserScript==
// @name        Google Calendar - Resize Navigation Sidebar
// @namespace   calendar.google.com
// @author cbop-dev (https://github.com/cbop-dev)
// @version 0.4
// @description Makes the G-Cal navigation sidebar re-sizable and hideable. Adds a column border and drag-button that can be dragged with the mouse, and a show/hide toggle button. Now works in new GCal UI (2017) as well as previous one!
// @license MIT License (Expat)
// @include       https://calendar.google.com/calendar/r*
// @grant       none
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
//window.alert('test');
var i = 0;
var gCal2017update = true;
gCal2017update = $('.AOL3Kb').length;
var dragging = false;
var main = $('#mainbody');
var nav = $('#nav');
//main = $('.YPCqFe');
//nav = $('.AOL3Kb');
var containerClass = "#maincell";

if (gCal2017update) {
    main = $('.YPCqFe');
    nav = $('.AOL3Kb');
    containerClass = '.TOTjfb';
}

var defaultPosition = '225';
var lastPosition = defaultPosition;
var minNavPosition = 35;

var bgc = $('#mainnav').css('background-color');
if (!bgc) {
   bgc = 'white';
}

$('#lvHeader').css('background-color',bgc);
var container = $(containerClass);

var ghostbar = $('<div>',
                 {id:'ghostbar',
                  css: {
                      'background-color': 'rgba(0,0,0,.5)',
                      height: '100%',
                      top: '0',
                      'margin-left': gCal2017update ? nav.css('width') : main.css('margin-left'),
                      'width': '3px',
                      'cursor': 'col-resize',
                      'float': 'left',
                      'position': 'absolute',
                      'z-index': '50'

                  },
                  class: 'ghost'
                 }).appendTo(containerClass);

var ghostEZdragbar = $('<div>',
                       {id:'ghostEZdragbar',
                        css: {
                            height: 'auto',
                            'min-height': '10px',
                            top: '0px',
                            'background-color': 'rgba(0,0,0,.5)',
                            'margin-left': gCal2017update ? nav.css('width') : main.css('margin-left'),
                            'width': 'auto',
                            'cursor': 'col-resize',
                            'float': 'left',
                            'position': 'absolute',
                            'z-index': '50',
                            color: 'white',
                            'text-align': 'center'
                        },
                        text: '\u25C4\u25BA',
                        class: 'ghost'
                       }).appendTo(containerClass);

var ghostToggleNav = $('<div>',
                       {id:'ghostToggleNav',
                        css: {
                            height: 'auto',
                            'min-height': '7px',
                            top: ghostEZdragbar.css('height'),
                            'background-color': 'rgba(0,0,0,.5)',
                            'margin-left': gCal2017update ? nav.css('width') : main.css('margin-left'),
                            'width': 'auto',
                            'cursor': 'pointer',
                            'float': 'left',
                            'position': 'absolute',
                            'z-index': '50',
                            color: 'white',
                            'text-align': 'center',


                        },
                        class: 'ghost',
                        text: '\u2715'
                       }).appendTo(containerClass);

ghostEZdragbar.css('left',"-" + ghostEZdragbar.css('width'));
ghostToggleNav.css('left',"-" + ghostToggleNav.css('width'));

function moveNav(x) {
    $('.ghost').css('margin-left', x );
    main.css('margin-left', x);
    nav.css('width', x - 32);
    //nav.css('-moz-box-flex', '0 0 ' + x);
    //nav.css('flex', '0 0 ' + x);
    nav.css('flex-basis', x);
}

function hideNav() {
    moveNav(0);
    nav.hide();
}


var mouseMoveNav = function(e) {

    e.preventDefault();
    dragging = true;

    $(document).mousemove(function (e) {
        if (e.pageX >= minNavPosition) {
            $('.ghost').css('margin-left', e.pageX + 2);
            //ghostEZdragbar.css('margin-left', e.pageX + 2);
        }
    });
};

ghostbar.mousedown(mouseMoveNav);
ghostEZdragbar.mousedown(mouseMoveNav);
ghostToggleNav.on('click', function(e) {
    if ( ghostbar.css('display') == 'none' ){ //already hidden; toggle to visible
        ghostToggleNav.text("\u2715");
        ghostToggleNav.css('width', 'auto');
        ghostToggleNav.css('top', ghostEZdragbar.css('height'));
        nav.show();
        moveNav(lastPosition);
        ghostToggleNav.css('left',"-" + ghostToggleNav.css('width'));
        $('.ghost').show();
    }
    else { // visible, going to hide nav bar:
        lastPosition = nav.width() +40;
        $('.ghost').hide();
        hideNav();
        ghostToggleNav.css('top', '0px');
        ghostToggleNav.css('left', 0);
        ghostToggleNav.text('\u25BA');
        ghostToggleNav.css('width', 'auto');
        ghostToggleNav.show();
    }
});

window.onload = function() {
    //window.alert("Onload!");
};

$(document).mouseup(function (e) {
    if (dragging)
    {
        moveNav(e.pageX > minNavPosition ? e.pageX : minNavPosition);

        $(document).unbind('mousemove');
        dragging = false;
    }
});

$(window).on('hashchange', function() {
    if (location.hash.lastIndexOf('#main', 0) === -1) {
        $('.ghost').hide();
    }
    else
    {
        $('.ghost').show();
    }
});
