import { DocumentReference, DocumentData, setDoc, SetOptions } from "firebase/firestore";

export async function setFirestoreDocument<T extends { [x: string]: any; }>(
  docRef: DocumentReference<DocumentData>,
  docData: T,
  options: SetOptions = { merge: false }
): Promise<[{ success: true } | null, any]> {
  try {
    await setDoc(docRef, docData, options);
    return [{ success: true }, null];
  } catch (error) {
    return [null, error];
  }
}