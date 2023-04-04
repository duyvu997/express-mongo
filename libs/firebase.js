import admin from 'firebase-admin';
import serviceAccount from '../firebase-service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (
  to,
  title,
  body,
  clickAction,
  icon,
  data,
  channelId = 'default_fcm_id'
) => {
  if (!to) {
    return;
  }

  try {
    const message = {
      token: to,
      notification: {
        title,
        body,
      },
      data,
      android: {
        priority: 'high',
        notification: {
          imageUrl: icon || undefined,
          clickAction: clickAction || undefined,
          sound: 'default',
          channelId,
        },
      },
      apns: {
        payload: {
          aps: {
            'mutable-content': 1,
            category: clickAction || undefined,
            sound: 'default',
          },
        },
        fcmOptions: {
          imageUrl: icon || undefined,
        },
      },
    };
    const result = await admin.messaging().send(message);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default { sendNotification };