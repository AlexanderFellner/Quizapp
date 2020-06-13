import credentials from "./Credentials";

const firebase = credentials();

export function login(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}
export function register(email: string, password: string) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((usercred) => {
      if (usercred.user != null) {
        console.log(usercred.user.uid);
      }
      if (usercred.user == null) {
        console.log("user is null");
      }
    });
}
export function userStateChanged() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(`The user is logged in. The emails user is ${user.email} `);
    } else {
      console.log("The user is not logged in");
    }
  });
}
export function logout() {
  firebase.auth().signOut();
}
export async function createUserFields(
  uuid?: string,
  category?: string,
  subcategory?: string,
  points?: number
) {
  if (uuid && category && subcategory && points) {
    points = +points;
    let pointssum = await getUserPointsSum(uuid);
    // Because one subcategory of a special category will not be closed if a
    // user finished the subcategory the points will now be summed up even if the
    // user played the same subcategory several times.
    pointssum = pointssum + points;
    firebase
      .firestore()
      .collection("Users")
      .doc(uuid)
      .update({ pointssum: pointssum })
      .then((res) => {
        firebase
          .firestore()
          .doc(`Users/${uuid}`)
          .collection("Kategorien")
          .doc(`${category}`)
          .set({})
          .then((res) => {
            firebase
              .firestore()
              .doc(`Users/${uuid}`)
              .collection("Kategorien")
              .doc(`${category}`)
              .collection("Unterkategorien")
              .doc(`${subcategory}`)
              .set({ points: points });
          });
      });
  }
}

export async function getUserPointsSum(uuid?: string) {
  let snapshot = await firebase.firestore().collection("Users").doc(uuid).get();
  let obj = snapshot.data();
  if (obj!["pointssum"] == null) {
    // window.alert("keine Punkte");
    return 0;
  } else {
    // window.alert("Points " + obj!["pointssum"]);
    return +obj!["pointssum"];
  }
}
