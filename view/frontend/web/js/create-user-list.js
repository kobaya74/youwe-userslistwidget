define(['jquery', 'mage/translate'], function ($) {
    'use strict';

    return function (config, element) {
        const { apiUrl } = config;
        const emailText = $.mage.__('Send me an email');

        async function handleApi() {
            try {
                const response = await fetch(apiUrl);
                const result = await response.json();
                const usersFragment = document.createDocumentFragment();

                for (const user of result.data) {
                    const { avatar, first_name, last_name, email } = user;

                    const userEl = document.createElement(`li`);
                    userEl.classList.add('user');
                    userEl.innerHTML = `
                        <img class="avatar" src="${avatar}" alt="${first_name}_${last_name}"/>
                        <div class="name"> ${first_name} ${last_name}</div>
                        <a href="mailto:${email}" class="mail">${emailText}</a>`;

                    usersFragment.appendChild(userEl);
                }

                document.querySelector('.users').appendChild(usersFragment);
            } catch (error) {
                return Promise.reject(new Error(`Error fetching users: ${error}`));
            }
        }

        document.querySelector('#fetch-users').addEventListener('click', handleApi);
    };
});
