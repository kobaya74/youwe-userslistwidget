define(['jquery', 'mage/translate'], function ($) {
    'use strict';

    return function (config) {
        /* eslint one-var: ["error", { var: "never" }] */

        /** Fetch API and create the user list from the request */
        class UserList {
            /**
             * @param {Object} configImport - imported config from PHTML file
             */
            constructor(configImport) {
                const { apiUrl, userList, submitButton } = configImport;

                this.apiUrl = apiUrl;
                this.userList = userList;
                this.submitButton = submitButton;
                this.emailText = $.mage.__('Send me an email');
                this.userListEl = document.querySelector(this.userList);
                this.submitButtonEl = document.querySelector(this.submitButton);
                this.usersFetched = false;
            }

            init() {
                this.eventListener('click');
            }

            /**
             * @param {String} listenerType - type of the event listener
             */
            eventListener(listenerType) {
                const handleButton = () => this.handleApi();

                this.submitButtonEl.addEventListener(
                    listenerType,
                    handleButton
                );
            }

            /**
             * @param {Object[]} users - array of fetched users objects
             */
            renderUserList(users) {
                const usersFragment = document.createDocumentFragment();

                for (const user of users) {
                    const {
                        avatar,
                        first_name: firstName,
                        last_name: lastName,
                        email
                    } = user;

                    const userEl = document.createElement('li');

                    userEl.classList.add('user');
                    userEl.innerHTML = `
                            <img class="avatar" src="${avatar}" alt="${firstName}_${lastName}"/>
                            <div class="name"> ${firstName} ${lastName}</div>
                            <a href="mailto:${email}" class="mail">${this.emailText}</a>`;

                    usersFragment.appendChild(userEl);
                }

                this.userListEl.appendChild(usersFragment);

                // Mark users as fetched
                this.usersFetched = true;

                // Disable the submit button
                this.submitButtonEl.disabled = true;
            }

            async handleApi() {
                // Create a loader element
                const loader = document.createElement('div');

                loader.classList.add('loader');
                loader.innerHTML = '<div class="spinner"></div>';

                this.userListEl.appendChild(loader);

                if (this.usersFetched) {
                    loader.remove();
                    throw new Error('Users have already been added!');
                }

                try {
                    const response = await fetch(this.apiUrl);
                    const result = await response.json();
                    const users = result.data;

                    if (users?.length) {
                        this.renderUserList(users);
                    }
                } catch (error) {
                    throw new Error(`Error fetching users: ${error}`);
                } finally {
                    // Remove the loader
                    loader.remove();
                }
            }
        }

        const userList = new UserList(config);

        userList.init();
    };
});
