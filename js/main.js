$(function () {
    $('#menu-slides .slide').hide();
    $('#image-page').hide();
    $('#menu-slides .slide').eq(0).show()
    var count = 0;
    setInterval(function () {
        $('#menu-slides .slide').eq(count).fadeOut('slow', function () {
            count = (count + 1) % 3
            $("#menu-slides .slide").eq(count).fadeIn('slow')
        })
    }, 3000);

    $('#menu > .start-btn').click(function (e) {
        $('#menu').fadeOut('slow', function () {
            $('#image-page').fadeIn('slow', function () { ImageSelect(); });
        })
    })
});