function ImageSelect() {
    $('.image-selection').children().each(function (i, item) {
        $(item).hover(
            function () {
                $(this).css({ opacity: 1.0 });
            },
            function () {
                $(this).css({ opacity: 0.7 });
            }
        )

        $(item).click(function () {
            $(this).css({ boxShadow: "0px 13px 15px grey"});
            $(this).addClass('clicked');
            $(this).siblings().each(function (j, pic) {
                $(pic).removeClass('clicked');
                $(pic).css({ boxShadow: "none"})
            });
            $('#image-page > .start-btn').fadeIn(500);
        })
    })

    var image;

    $('#image-page > .start-btn').click(function () {
        //Find which image has been chosen
        $('.image-selection').children().each(function (i, item) {
            if ($(item).hasClass('clicked')) {
                switch (i) {
                    case 0:
                        image = 'img/cat.jpg';
                        break;
                    case 1:
                        image = 'img/meow.jpg';
                        break;
                    case 2:
                        image = 'img/pikachu.jpg';
                        break;
                    default: return;
                }
                $(item).removeClass('clicked');
                $(item).css('box-shadow', '0px 0px 0px');
                $('#image-page > .start-btn').hide();
                $(item).unbind('mouseenter mouseleave');
            }
        })

        $('#image-page').animate({ left: -900, opacity: 0 }, 1000, function () {
            $('#image-page').hide(0, function () {
                $('#select').show();
                $('#puzzle-page')
                    .show()
                    .animate({ left: 0 }, 1000, function () {
                        Puzzle();
                    })
                $('#puzzle').css({
                    display: "flex",
                    flexFlow: "row wrap",
                    justifyContent: "center",
                    alignItems: "center"
                })

            });
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    $('#puzzle').append(`<div class="puz p${i * 3 + j + 1}" style="background: url('${image}') no-repeat ${j * -150}px ${i * -150}px"></div>`)
                }
            }
            $('#puzzle > .p1').css({ background: "none", height: "150px", width: "150px" })
        })
    })
}