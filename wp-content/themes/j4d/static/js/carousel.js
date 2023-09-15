(function ($) {
$.fn.infiniteCarousel = function (wrapperSelector) {
    function repeat(str, num) {
        return new Array( num + 1 ).join( str );
    }
  
    return this.each(function () {
        var $wrapper = $(wrapperSelector, this),
            $slider = $wrapper.find('> ul'),
            $items = $slider.find('> li'),
            $single = $items.filter(':first'),
            
            singleWidth = $single.outerWidth(), //parseInt($single.width()) + parseInt($single.css('padding-left')) + parseInt($single.css('padding-right')),
            visible = Math.ceil($wrapper.innerWidth() / singleWidth), // note: doesn't include padding or border
            currentPage = 1,
            pages = Math.ceil($items.length / visible);            

        // 1. Pad so that 'visible' number will always be seen, otherwise create empty items
        if (($items.length % visible) != 0) {
            $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
            $items = $slider.find('> li');
        }

        // 2. Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
        $items.filter(':first').before($items.slice(- visible).clone().addClass('cloned'));
        $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
        $items = $slider.find('> li'); // reselect
        
        // 3. Set the left position to the first 'real' item
        // $wrapper.css('scrollLeft', singleWidth * visible); // * -1
        $wrapper.get(0).scrollLeft = singleWidth * visible;
        
        // 4. Bind to the forward and back buttons
        $('a.back', this).click(function () {
            return gotoPage(currentPage - 1);                
        });
        
        $('a.forward', this).click(function () {
            return gotoPage(currentPage + 1);
        });
        
        // 5. paging function
        function gotoPage(page) {
            var dir = page < currentPage ? -1 : 1, // page < currentPage ? 1 : -1,
                n = Math.abs(currentPage - page),
                left = singleWidth * dir * visible * n;
            
            // console.log('currentPage', currentPage, 'left', left, 'n', n);
            
            $wrapper.filter(':not(:animated)').animate({
                scrollLeft : '+=' + left
            }, 500, function () {
                if (page == 0) {
                    currentPage = pages;
                    // $wrapper.css('scrollLeft', singleWidth * visible * pages); //  * -1
                    this.scrollLeft = singleWidth * visible * pages;
                } else if (page > pages) {
                    currentPage = 1;
                    this.scrollLeft = singleWidth * visible; //  * -1
                    // $wrapper.css('scrollLeft', singleWidth * visible); //  * -1
                    // reset back to start position
                } else {
                    currentPage = page;
                }
            });                
            
            return false;
        }
        
        // create a public interface to move to a specific page
        $(this).bind('goto', function (event, page) {
            gotoPage(page);
        });
    });  
};

$(function () {
    $('#scrollButtons > div').before('<a href="#" class="back"><img src="/wp-content/themes/j4d/static/images/scroll_left.png" width="19" height="20" alt="Scroll Left" title="Scroll Left" class="scrollLeft" /></a>').after('<a class="forward" href="#"><img src="/wp-content/themes/j4d/static/images/scroll_right.png" width="19" height="20" alt="Scroll Right" title="Scroll Right" class="scrollRight" /></a>').parent().infiniteCarousel('> div');
});
})(jQuery);
