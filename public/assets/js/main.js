/*
    Twenty by HTML5 UP
    html5up.net | @n33co
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    skel.breakpoints({
        wide: '(max-width: 1680px)',
        normal: '(max-width: 1280px)',
        narrow: '(max-width: 980px)',
        narrower: '(max-width: 840px)',
        mobile: '(max-width: 736px)'
    });

    $(function() {

        var $window = $(window),
            $body = $('body'),
            $header = $('#header'),
            $banner = $('#banner');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            $body.removeClass('is-loading');
        });

        // CSS polyfills (IE<9).
        if (skel.vars.IEVersion < 9)
            $(':last-child').addClass('last-child');

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on narrower.
        skel.on('+narrower -narrower', function() {
            $.prioritize(
                '.important\\28 narrower\\29',
                skel.breakpoint('narrower').active
            );
        });

        // Scrolly links.
        $('.scrolly').scrolly({
            speed: 1000,
            offset: -10
        });

        // Dropdowns.
        $('#nav > ul').dropotron({
            mode: 'fade',
            noOpenerFade: true,
            expandMode: (skel.vars.touch ? 'click' : 'hover')
        });

        // Off-Canvas Navigation.

        // Navigation Button.
        $(
                '<div id="navButton">' +
                '<a href="#navPanel" class="toggle"></a>' +
                '</div>'
            )
            .appendTo($body);

        // Navigation Panel.
        $(
                '<div id="navPanel">' +
                '<nav>' +
                $('#nav').navList() +
                '</nav>' +
                '</div>'
            )
            .appendTo($body)
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left',
                target: $body,
                visibleClass: 'navPanel-visible'
            });

        // Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
        if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
            $('#navButton, #navPanel, #page-wrapper')
            .css('transition', 'none');

        // Header.
        // If the header is using "alt" styling and #banner is present, use scrollwatch
        // to revert it back to normal styling once the user scrolls past the banner.
        // Note: This is disabled on mobile devices.
        if (!skel.vars.mobile && $header.hasClass('alt') && $banner.length > 0) {

            $window.on('load', function() {

                $banner.scrollwatch({
                    delay: 0,
                    range: 1,
                    anchor: 'top',
                    on: function() {
                        $header.addClass('alt reveal');
                    },
                    off: function() {
                        $header.removeClass('alt');
                    }
                });

            });

        }

    });

    // window.headerImages = [
    //     'http://www.shirooni.com/International-Artist-Residency-Resources/2014/10/ceramics-green-slip-Plates-01.jpg',
    //     'http://www.oldstablesstudio.co.uk/cms/oss-content/uploads/2015/06/home-slide-1.jpg'
    // ];

    // window.imgCount = -1;

    // function preloadImages(array) {
    //     if (!preloadImages.list) {
    //         preloadImages.list = [];
    //     }
    //     var list = preloadImages.list;
    //     for (var i = 0; i < array.length; i++) {
    //         var img = new Image();
    //         img.onload = function() {
    //             var index = list.indexOf(this);
    //             if (index !== -1) {
    //                 // remove image from the array once it's loaded
    //                 // for memory consumption reasons
    //                 list.splice(index, 1);
    //             }
    //         };
    //         list.push(img);
    //         img.src = array[i];
    //     }
    // }


    // function changeHeaderImage() {
    //     window.imgCount = (window.imgCount + 1) % window.headerImages.length;

    //     var bgImg = $('#banner').css('background-image');
    //     if (bgImg === undefined) return;
    //     var arr = bgImg.split(',');

    //     arr[1] = 'url("' + window.headerImages[window.imgCount] + '")';

    //     console.log(arr);
    //     $('#banner').css('background-image', arr.join(','));
    //     // $('#banner').css('background-image', 'none');
    // }

    // // rotate header images
    // preloadImages(window.headerImages);
    // changeHeaderImage();
    // setInterval(changeHeaderImage, 3000);

})(jQuery);

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-68664268-1', 'auto');
ga('send', 'pageview');
