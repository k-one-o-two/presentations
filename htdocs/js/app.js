/**
 * User: k102
 * Date: 26.01.15
 * Time: 15:23
 */

/**
 * App class. Constructor creates 'fast open buttons'
 * @constructor
 */
function PresentationApp () {

    this.presentationsArray = [];
    this.nowOpen = null;

    $.each($('.presentation'), function (k, v) {
        this.presentationsArray.push(new Presentation($(v)));

        var _fastOpener = $('<a href="#" class="btn small white presentationOpenerBtn">');
        _fastOpener.html(k);

        $('#fastOpenContainer').append(_fastOpener);
    }.bind(this));

    this.fastOpenButtonsEvent();
    this.showGridEvent();
    this.prevNextEvents();
};

/**
 * Highlight the button corresponding to the current presentation
 */
PresentationApp.prototype.highlightFastButton = function () {
    $('#fastOpenContainer a').addClass('white');
    if (this._currentIndex != null) {
        $('#fastOpenContainer a').eq(this._currentIndex).removeClass('white');
    }
};

/**
 * Handle click on 'fast open button'
 */
PresentationApp.prototype.fastOpenButtonsEvent = function () {
    $('.presentationOpenerBtn').click(function (e) {
        e.preventDefault();
        this._currentIndex = $('.presentationOpenerBtn').index($(e.target));

        if (this.nowOpen != null) {
            this.nowOpen.close();
        }
        this.nowOpen = this.presentationsArray[this._currentIndex];
        this.nowOpen.create();
        this.highlightFastButton();
    }.bind(this));
};

/**
 * Handle click on 'show grid' button
 */
PresentationApp.prototype.showGridEvent = function () {
    $('#seeAll').click(function (e) {
        e.preventDefault();
        this.showGrid();
    }.bind(this));
};

/**
 * Handle click on prev and next buttons
 */
PresentationApp.prototype.prevNextEvents = function () {
    $('#_next').off('click');
    $('#_next').click(function (e) {
        e.preventDefault();
        this.nowOpen.next();
    }.bind(this));

    $('#_prev').off('click');
    $('#_prev').click(function (e) {
        e.preventDefault();
        this.nowOpen.prev();
    }.bind(this));
};

/**
 * Show grid with presentation thumbnails
 */
PresentationApp.prototype.showGrid = function () {
    this._currentIndex = null;
    this.highlightFastButton();

    $('#seeAllContainer').empty();

    this.presentationsArray.forEach(function (_pr) {

        var _gridTpl = _pr.shrink();

        $('.imgContainer', _gridTpl).css('display', 'block');

        _gridTpl.click(function (e) {
            e.preventDefault();
            this.nowOpen = _pr;
            this.nowOpen.create();

            this._currentIndex = this.presentationsArray.indexOf(_pr);
            this.highlightFastButton();
        }.bind(this));

        $('#seeAllContainer').append(_gridTpl);
    }.bind(this));

    if (!$('#seeAllContainer').is(':visible')) {
        $('#seeAllContainer').fadeIn();
    }
};


$(document).ready(function () {
    var _app = new PresentationApp();
    _app.showGrid();
});