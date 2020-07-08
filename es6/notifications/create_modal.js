import { isUndefined } from "lodash";
import $ from "jquery";

async function getNotifications() {
    const stream = await fetch('./notifications.json');
    return stream.json();
}

function createPagination(notificationsCount, currentIndex) {
    const radioBtns = [];

    for (let i = 0; i < notificationsCount; i++) {
        radioBtns.push(`<input id="notificationRadio-${i}" type="radio" ${i === currentIndex ? 'checked' : ''}>`)
    }

    const template = `<div id="radioBtnGroup" class="radioBtnGroup">${radioBtns.join('')}</div>`;

    return template;
}

export async function createNotificationsModal() {
    const notifications = await getNotifications();
    const root = document.querySelector('#root');
    let currentNotification = 0;

    const template = `
        <div id="notificationContainer" class="notificationContainer">
            <div class="notificationWrapper">
                <div id="notification" class="notification">
                    <p>${notifications[currentNotification].id}. ${notifications[currentNotification].title}</p>
                    <p>${notifications[currentNotification].phrase}</p>
                </div>
                <div class="notificationClose">
                    <button id="notificationCloseBtn">
                        <div class="xCross1">
                            <div class="xCross2"></div>
                        </div>
                    </button>
                </div> 
            </div>
            <div class="notificationFooter">
                <input id="disableNotifications" type="checkbox" />
                <div class="pagination">
                    <button id="previousButton"><i class="arrow left"></i></button>
                    ${createPagination(notifications.length, currentNotification)}
                    <button id="nextButton"><i class="arrow right"></i></button>
                </div>
            </div>
        </div>
    `;

    root.innerHTML = template;

    const notification = document.querySelector('#notification');
    const notificationContainer = document.querySelector('#notificationContainer');

    const updateNotification = (index) => {
        const currentRadio = document.querySelector(`#notificationRadio-${currentNotification}`);
        const nextRadio = document.querySelector(`#notificationRadio-${index}`);
        currentRadio.checked = false;
        nextRadio.checked = true;
        currentNotification = index;

        notification.innerHTML = `
            <p>${notifications[index].id}. ${notifications[index].title}</p>
            <p>${notifications[index].phrase}</p>
        `;
    };

    document.querySelector('#radioBtnGroup').addEventListener('click', (ev) => {
        const selectedNotification = ev.target.id && ev.target.id.split('notificationRadio-')[1];

        if (!isUndefined(selectedNotification)) {
            updateNotification(selectedNotification);
        }
    })

    document.querySelector('#previousButton').addEventListener('click', () => {
        let index = currentNotification - 1;

        if (index < 0) {
            index = notifications.length - 1;
        }

        updateNotification(index);
    })
    document.querySelector('#nextButton').addEventListener('click', () => {
        const index = (currentNotification + 1) % notifications.length
        updateNotification(index);
    })

    document.querySelector('#notificationCloseBtn').addEventListener('click', () => {
        root.removeChild(notificationContainer);
    })

    document.querySelector('#disableNotifications').addEventListener('change', (ev) => {
        localStorage.setItem('isNotificationsDisabled', ev.target.checked)
    })
}
