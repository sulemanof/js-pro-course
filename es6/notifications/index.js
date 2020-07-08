import { createNotificationsModal } from './create_modal.js';

const isNotificationsDisabled = JSON.parse(localStorage.getItem('isNotificationsDisabled'));

if (!isNotificationsDisabled) {
    createNotificationsModal();
 }
 