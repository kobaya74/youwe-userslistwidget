define(['jquery', 'mage/translate'], function ($) {
    'use strict';

    return function (config, element) {
        const { apiUrl, userList, submitButton } = config;
        const emailText = $.mage.__('Send me an email');
        const userListEl = document.querySelector(userList);
        const submitButtonEl = document.querySelector(submitButton);

        // Track if users have already been fetched and added
        let usersFetched = false;

        async function handleApi() {
            // Create a loader element
            const loader = document.createElement('div');
            loader.classList.add('loader');
            loader.innerHTML = '<div class="spinner"></div>';

            userListEl.appendChild(loader);

            if (usersFetched) {
                loader.remove();
                throw new Error('Users have already been added!');
            }

            try {
                const response = await fetch(apiUrl);
                const result = await response.json();
                const users = result.data;

                if (users?.length) {
                    const usersFragment = document.createDocumentFragment();

                    for (const user of users) {
                        const { avatar, first_name, last_name, email } = user;

                        const userEl = document.createElement('li');
                        userEl.classList.add('user');
                        userEl.innerHTML = `
                        <img class="avatar" src="${avatar}" alt="${first_name}_${last_name}"/>
                        <div class="name"> ${first_name} ${last_name}</div>
                        <a href="mailto:${email}" class="mail">${emailText}</a>`;

                        usersFragment.appendChild(userEl);
                    }

                    userListEl.appendChild(usersFragment);

                    // Mark users as fetched
                    usersFetched = true;

                    // Disable the submit button
                    submitButtonEl.disabled = true;
                }

            } catch (error) {
                throw new Error(`Error fetching users: ${error}`);
            } finally {
                // Remove the loader
                loader.remove();
            }
        }

        submitButtonEl.addEventListener('click', handleApi);
    };
});
