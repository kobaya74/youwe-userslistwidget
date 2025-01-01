define(['jquery', 'mage/translate'], function ($) {
    'use strict';

    return function (config, element) {
        const { apiUrl } = config;
        const emailText = $.mage.__('Send me an email');

        // Track if users have already been fetched and added
        let usersFetched = false;

        async function handleApi() {
            if (usersFetched) {
                console.warn('Users have already been added!');
                return;
            }

            try {
                const response = await fetch(apiUrl);
                const result = await response.json();
                const users = result.data;

                if (users.length) {
                    const usersFragment = document.createDocumentFragment();

                    for (const user of users) {
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

                    // Mark users as fetched
                    usersFetched = true;

                    // Optionally disable the button
                    document.querySelector('#fetch-users').disabled = true;
                }

            } catch (error) {
                console.error(`Error fetching users: ${error}`);
            }
        }

        document.querySelector('#fetch-users').addEventListener('click', handleApi);
    };
});
