$(document).ready(function(){
    $("[data-image-slider]").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        centerMode: true,
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    })

    if($(window).width() <= 768) {
        $(".featured-grid-section .grid-items").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            dots: true,
            infinite: true,
            autoplay: false,
            adaptiveHeight: true
        })

        $('.compare-products-section .tab-content-item').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            dots: true,
            infinite: true,
            autoplay: false,
            adaptiveHeight: true
        })

        $('.rooms-grid').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            dots: true,
            infinite: true,
            autoplay: false,
            adaptiveHeight: true
        })
    }

    $('.tab-header-item').on('click', function(e){
        $(this).closest('.tab-header').find('.tab-header-item').removeClass('active');
        $(this).addClass('active');
        const tabTitle = $(this).data('tab-title');
        $(this).closest('.tab-container').find('.tab-content-item').hide();
        $('.tab-content-item[data-tab-title="' + tabTitle + '"]').show();
    });
    var product = $('.product_name').text().toString().split('(');
    var product_name = product[0];
    var product_description = product[1].replace(')','');
    $('#product_name').text(product_name);
    $('#product_description').text(product_description);

    $(".shopify-payment-button").addClass('hidden');

    $("label",$(".selector-wrapper")).each(function(){
        var label = $(this).text();
        label = label.replace('(','&nbsp;&nbsp;&nbsp;<a href="#" style="font-size: 14px;color:gray;text-decoration: underline;">');
        label = label.replace(')','</a>');
        $(this).html(label);
    });

    $('.custom_description').each(function(){
        var description = $(this).html();
        while (description.indexOf('(') > -1 || description.indexOf(')') > -1 || description.indexOf('{') > -1 || description.indexOf('}') > -1) {
            description = description.replace('(','<strong>');
            description = description.replace(')','</strong>');
            description = description.replace('{','<a href="#" style="color:#000;text-decoration: underline;">');
            description = description.replace('}','</a>');
        }
        $(this).html(description);
    });

    $(".single-option-selector").each(function(index){
        var html = '<div class="select-form-btn">';
        // if(index == 0) html = '<div class="select-form-btn" style="justify-content:flex-start;">';

        $(this).children().each(function(){
            var option = $(this).text();
            var hidden = 'hidden';
            if($('[value="' + $(this).text() + '"]')[0].selected) hidden = '';
            // if(index == 0) html += '<a href="javascript:;" class="select-a">';
            // else html += '<a href="javascript:;" class="select-a" style="width: 48%;">';
            html += '<a href="javascript:;" class="select-a">'
            if(option.indexOf('L ') > -1) {
                option = option.replace('L ', '<strong>L </strong>');
            }
            else if(option.indexOf('XS ') > -1) {
                option = option.replace('XS ', '<strong>XS </strong>');
            }
            else if(option.indexOf('S ') > -1) {
                option = option.replace('S ', '<strong>S </strong>');
            }
            else if(option.indexOf('M ') > -1) {
                option = option.replace('M ', '<strong>M </strong>');
            }
            else option = '<strong style="font-size:14px;">' + option + '</strong>';
            html += option;
            html += '<label class="custom-checkbox ' + hidden + '" data-id="'+index+'"><input type="checkbox" checked="checked"><span class="custom-checkmark"></span></label></a>';
        });
        html += '</div>';

        $(this).parent().parent().append(html);
        $(this).parent().hide();

        $(".select-a").click(function(){
            var dataId = $('label', $(this)).data('id');
            $('[value="' + $(this).text().trim() + '"]')[0].selected = true;
            $('[data-id="'+dataId+'"]').addClass('hidden');
            $('label', $(this)).removeClass('hidden');
            $(".single-option-selector").change();
        });
    });
})