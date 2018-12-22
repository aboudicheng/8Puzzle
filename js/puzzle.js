function Puzzle() {
    $('select').change(function() {
        if (this.selectedIndex !== 0) {
            $('#select > .start-btn').fadeIn('slow', function() {
                $(this).click(function() {
                    $('#select').fadeOut('slow');
                    $()
                })
            });
        }
        else {
            $('#select > .start-btn').hide();
        }
    })
}

function shuffle() {
    $('#puzzle').children().slice(1, -1).each(function(i, item) {

    })
}