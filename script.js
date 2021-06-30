$(function () {
    let i = 1;
    let formClass = '';
    let inputClass = '';
    let li = '';
    let email = '';

    // submit click
    $('.js-submit').on('click', function (event) {
        event.preventDefault();
        let count = 0;
        inputClass = '.js-input' + i;

        // check empty inputs
        $(inputClass).each(function () {
            if (($(this).val()).length == 0) {
                $(this).addClass('mistake');
                count++;
            }
            else {
                $(this).removeClass('mistake');
                if (count < 0 || count == 0) count = 0;
                else count--;
            }
        });

        if (i < 4) {
            // change forms
            if (count == 0) {
                formClass = '.js-form' + i;
                li = '.js-li' + i;
                $(formClass).removeClass('open');
                $(li).removeClass('color');
                $(formClass).addClass('close');
                i++;
                formClass = '.js-form' + i;
                li = '.js-li' + i;
                $(formClass).addClass('open');
                $(li).addClass('color');

            }
            if (i == 3) {
                email = $('.js-email-address').val();
            }
        } if (i == 4) {
            $('.js-nav').addClass('close');
            $('.js-order-summary').addClass('wrapper-transparent');
            $('.js-main-summary').addClass('z-index');
            $('.js-put-email').text(email);

            // delivery day
            let date = $('.js-datepicker').datepicker('getDate');
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let lastDay = (new Date(year, month, 0)).getDate();
            $('.js-delivery-day').text(deliveryDay(day, month, year, lastDay));


        }
    });

    // location click
    $('.form1__location').on('click', function () {
        if (YMaps.location) {
            $('.js-city').val(YMaps.location.city);
            $('.js-country').val(YMaps.location.country);
        } else {
            alert('Необходимо разрешить доступ к Вашей геопозиции')
        }
    });

    // datepicker
    $('.js-datepicker').datepicker({
        dateFormat: 'dd/mm/yy'
    });

    // card mask
    $('.js-card-num').mask('9999 9999 9999 9999');
    $('.js-card-code').mask('999');
});

function deliveryDay(day, month, year, lastDay) {
    if (day + 7 <= lastDay) {
        day += 7;
    } else {
        day = (day + 7) - lastDay;
        if (month + 1 <= 12) {
            month++;
        } else {
            month = 1;
            year++;
        }
    }

    return (`${check(day)}/${check(month)}/${year}`);
}

function check(param) {
    paramS = param.toString();
    paramNew = '0';
    if (paramS.length == 1) paramNew += paramS;
    else if (paramS.length == 0) paramNew = '00';
    else paramNew = paramS;
    return paramNew;
}
