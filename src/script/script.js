$(document).ready(function() {
    new WOW(
        {
            animateClass: 'animate__animated',
        }
    ).init();

    $('#burger').click(function() {
        $('#menu').addClass('open');
    });

    $('#menu *').click(function() {
        $('#menu').removeClass('open');
    });

    $('.button-product-item').click(function(e) {
        $('.order-info-input').val($(e.target).parents('.product-item').find('.product-item-title').text().trim());
        $('#order')[0].scrollIntoView({ behavior: 'smooth' });
    });
    $('.main-button').click(function() {
        $('#products')[0].scrollIntoView({behavior: 'smooth'});
    })
    const numberPhone = $('.order-form-input-number');
    numberPhone.mask('+375 (00) 000 - 00 - 00').css('color', 'rgb(130, 19, 40)');




    $('.button-order-form').click(function(e) {
        const product = $('.order-info-input').val().trim();
        const name = $('.order-form-input-name').val().trim();
        const number = numberPhone.val().trim();

        let hasError = false;

        // Сброс предыдущих ошибок
        $('.error').css('opacity', '0');
        $('.input').removeClass('input-error');
        // Валидация полей
        if (!product) {
            $('.error-product').css('opacity', '1');
            $('.order-info-input').addClass('input-error');
            hasError = true;
        }
        if (!name) {
            $('.error-name').css('opacity', '1');
            $('.order-form-input-name').addClass('input-error');
            hasError = true;
        }
        if (!number || number.indexOf('_') !== -1 || number.length < 23) {
            $('.error-number').css('opacity', '1');
            $('.order-form-input-number').addClass('input-error');
            hasError = true;
        }

        if (!hasError) {
            $('.loader-block').css('display', 'flex');
            $.ajax({
                method: "POST",
                url: 'https://testologia.ru/checkout',
                data: { name: name, product: product, phone: number }
            })
                .done(function(response) {
                    $('.loader-block').hide();
                    if (response.success) {
                        $('.order-info').hide();
                        $('.order-image').hide();
                        $('.strawberry-one').hide();
                        $('.strawberry-two').hide();
                        $('.order-container').css('display','block');
                        $('.order-success').show();
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                        $('.order-info-input').val('');
                        $('.order-form-input-name').val('');
                        numberPhone.val('');
                    }
                })
                .fail(function() {
                    $('.loader-block').hide();
                    alert('Возникла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.');
                    $('.order-info-input').val('');
                    $('.order-form-input-name').val('');
                    numberPhone.val('');
                });
        }
    });
});

