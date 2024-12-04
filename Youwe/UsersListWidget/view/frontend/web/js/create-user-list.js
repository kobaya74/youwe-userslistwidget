define(['jquery', 'mage/translate'], function ($) {
    'use strict';

    return function (config, element) {
        const { apiUrl } = config;
        const emailText = $.mage.__('Send me an email');

        const handleApi = () => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(result => {
                    result.data.forEach(function (user) {
                        const { avatar, first_name, last_name, email } = user;

                        const userEl = Object.assign(document.createElement(`li`), {
                            innerHTML: `
                                  <img class="avatar" src="${avatar}" alt="${first_name}_${last_name}"/>
                                  <div class="name"> ${first_name} ${last_name}</div>
                                  <a href="mailto:${email}" class="mail">${emailText}</a>`,
                            classList: [`user`],
                        });

                        document.querySelector('.users').appendChild(userEl);
                    });
                });
        };

        document.querySelector('#fetch-users').addEventListener('click', handleApi);
    };
});
