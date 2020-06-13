import credentials from "./Credentials";
const firebase = credentials();
export function getDocumentsOnce(collection: string) {
  return firebase
    .firestore()
    .collection(collection)
    .get()
    .then((snapshot) => {
      //console.log(snapshot.docs);
      return snapshot.docs;
    });
}

export function getDocumentOnce(collection: string, document: string) {
  return firebase
    .firestore()
    .collection(collection)
    .doc(document)
    .get()
    .then((doc) => {
      console.log(doc.data());
      return doc.data();
    });
}
export function documentsListener(collection: string) {
  return firebase
    .firestore()
    .collection(collection)
    .onSnapshot((snapshot) => {});
}
