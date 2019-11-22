import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export function initFirestore(): admin.firestore.Firestore {
  admin.initializeApp(functions.config().firebase);
  return admin.firestore();
}
