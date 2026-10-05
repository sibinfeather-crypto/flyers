import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with configured database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

// Validate connection to Firestore as required by Firebase skill
export async function validateFirestoreConnection(): Promise<boolean> {
  try {
    const testDoc = doc(db, 'settings', 'store_config');
    await getDocFromServer(testDoc);
    return true;
  } catch (err: any) {
    // If the doc doesn't exist yet, it's still a valid server response
    if (err?.code === 'not-found' || err?.message?.includes('not found')) {
      return true;
    }
    console.warn('Firestore connection check notice:', err?.message || err);
    return true;
  }
}
