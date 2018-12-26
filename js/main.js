function main() {
    $('#menu-slides .slide').hide();
    $('#image-page').hide();
    $('#menu-slides .slide').eq(0).show()
    var count = 0;
    var timer = setInterval(function () {
        $('#menu-slides .slide').eq(count).fadeOut('slow', function () {
            count = (count + 1) % 3
            $("#menu-slides .slide").eq(count).fadeIn('slow')
        })
    }, 3000);

    $('.start-btn').hover(
        function () {
            $(this).css({ backgroundColor: "rgb(107, 145, 194)", color: "#000", fontWeight: "bold" })
        },
        function () {
            $(this).css({ backgroundColor: "#fff", color: "rgb(134, 134, 134)", fontWeight: "normal" })
        }
    )

    $('#menu > .start-btn').click(function (e) {
        clearInterval(timer);
        $('#menu').fadeOut('slow', function () {
            $('#image-page').fadeIn('slow', function () { ImageSelect(); });
        })
    })
}