(function(app) {
    app.service('GetDataSVC', GetDataSVC);

    function GetDataSVC($timeout) {
        return {
            getFooterData: getFooterData,
            getTopNav: getTopNav,
            getMailChimpTranslation: getMailChimpTranslation
        };

        function getFooterData() {
            return [{
                "title": "Обучение",
                "linkList": [{
                        "title": "Форматы обучения",
                        "url": "http://kabacademy.com/programm-online/"
                    }, {
                        "title": "Самостоятельное обучение",
                        "url": "http://kabacademy.com/"
                    }, {
                        "title": "Онлайн курсы",
                        "url": "http://kabacademy.com/programm-online/uznat-bolshe-ob-obuchenii-v-mak/"
                    },

                    {
                        "title": "Очное обучение",
                        "url": "http://kabacademy.com/filialyi/"
                    }
                ]
            }, {
                "title": "",
                "linkList": [{
                        "title": "Преподаватели",
                        "url": "http://kabacademy.com/nashi-prepodavateli/"
                    }, {
                        "title": "Программа обучения",
                        "url": "http://kabacademy.com/?p=453"
                    }, {
                        "title": "Сервисы для студентов",
                        "url": "http://kabacademy.com/?p=391"
                    },

                    {
                        "title": "Учебные материалы",
                        "url": "http://kabacademy.com/?p=388"
                    }
                ]
            }, {
                "title": "О нас",
                "linkList": [{
                        "title": "Что такое каббала",
                        "url": "http://kabacademy.com/nauka-kabbala/"
                    }, {
                        "title": "Михаэль Лайтман",
                        "url": "http://kabacademy.com/about-us/dr-michael-laitman/"
                    }, {
                        "title": "Каббалисты",
                        "url": "http://kabacademy.com/nauka-kabbala/kabbalistyi/"
                    },

                    {
                        "title": "Книги",
                        "url": "http://www.kbooks.ru/"
                    }
                ]
            }, {
                "title": "Наши сайты",
                "linkList": [{
                        "title": "Информационный портал",
                        "url": "http://www.kabbalah.info/rus/"
                    }, {
                        "title": "Блог М.Лайтмана",
                        "url": "http://www.laitman.ru/"
                    }, {
                        "title": "Каббала ТВ",
                        "url": "http://www.kab.tv/rus/"
                    },

                    {
                        "title": "Зоар ТВ",
                        "url": "http://www.zoar.tv/"
                    }
                ]
            }];
        }

        function getTopNav() {
            return [{
                "url": "http://kabacademy.com/programm-online/",
                "title": "Как мы учимся?"
            }, {
                "url": "http://kabacademy.com/filialyi/",
                "title": "Очное обучение"
            }, {
                "url": "http://kabacademy.com/programm-online/uznat-bolshe-ob-obuchenii-v-mak/",
                "title": "On-line обучение"
            }, {
                "url": "http://www.kbooks.ru/katalog/list/120",
                "title": "магазин книг"
            }];
        }


        /*** get object of messases translation */
        function getMailChimpTranslation() {
            return {
                required: "Это поле необходимо заполнить.",
                remote: "Пожалуйста, введите правильное значение.",
                email: "Пожалуйста, введите корректный адрес электронной почты.",
                url: "Пожалуйста, введите корректный URL.",
                date: "Пожалуйста, введите корректную дату.",
                dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
                number: "Пожалуйста, введите число.",
                digits: "Пожалуйста, вводите только цифры.",
                creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
                equalTo: "Пожалуйста, введите такое же значение ещё раз.",
                accept: "Пожалуйста, выберите файл с правильным расширением.",
                maxlength: jQuery.validator.format("Пожалуйста, введите не больше {0} символов."),
                minlength: jQuery.validator.format("Пожалуйста, введите не меньше {0} символов."),
                rangelength: jQuery.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
                range: jQuery.validator.format("Пожалуйста, введите число от {0} до {1}."),
                max: jQuery.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
                min: jQuery.validator.format("Пожалуйста, введите число, большее или равное {0}.")
            };
        }
    }


})(angular.module('bbWebinar'));
