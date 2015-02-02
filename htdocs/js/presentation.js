/**
 * User: k102
 * Date: 26.01.15
 * Time: 15:33
 */
/**
 * Presentation class
 * @param element jQuery element with images
 * @constructor
 */
function Presentation (element) {
    this._current = null;
    this._currentIndex = 0;
    this._imgCount = 0;

    this._dummy = element;

}

/**
 * Show expanded pressentation
 */
Presentation.prototype.create = function () {
    $('#seeAllContainer').fadeOut(function(){
        this._dummy.fadeIn();
    }.bind(this));

    $('#prevNextButtons').show();

    this._element = $('.imgContainer', this._dummy);
    $('.imgContainer:not(:first)',this._dummy).hide();

    this._imgCount = $('.imgContainer',this._dummy).length;
    this._current = $('.imgContainer:first',this._dummy);

    this.checkCurrentIndex();

};

/**
 * Check if prev or next button should be hidden
 */
Presentation.prototype.checkCurrentIndex = function () {
    this._currentIndex = this._element.index(this._current);
    if (this._currentIndex == 0) {
        $('#_prev').hide();
    } else {
        $('#_prev').show();
    }

    if (this._currentIndex == (this._imgCount - 1)) {
        $('#_next').hide();
    }
    else {
        $('#_next').show();
    }
};

/**
 * Show next image
 */
Presentation.prototype.next = function () {
    if (this._current.next().length) {
        this._current.fadeOut(function(){
            this._current = this._current.next();
            this._current.fadeIn();
            this.checkCurrentIndex();
        }.bind(this));
    }

};

/**
 * Show previous image
 */
Presentation.prototype.prev = function () {
    if (this._current.prev().length) {
        this._current.fadeOut(function(){
            this._current = this._current.prev();
            this._current.fadeIn();
            this.checkCurrentIndex();
        }.bind(this));
    }
};

/**
 * Close the presentation
 */
Presentation.prototype.close = function(){
    this._dummy.hide();
    $('#prevNextButtons').hide();
};

/**
 * Shrink the presentation for the grid
 * @returns {*|jQuery|HTMLElement} shrinked first presentation image
 */
Presentation.prototype.shrink = function(){
    this._dummy.hide();
    $('#prevNextButtons').hide();

    var _img = $('p.imgContainer:first',this._dummy),
        _gridTpl = $('<article class="grid_4"></article>');

    _gridTpl.append(_img.clone());

    return _gridTpl;
};