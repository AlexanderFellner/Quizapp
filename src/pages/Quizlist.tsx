import React, { Fragment, useEffect, useState } from "react";
import {
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
  IonAlert,
  IonCard,
  IonCardContent,
} from "@ionic/react";
//import { getDocumentsOnce, getDocumentOnce } from "../firebase/Database";
import credentials from "../firebase/Credentials";
import { logOutOutline } from "ionicons/icons";
import { logout } from "../firebase/Authentication";
import { useHistory } from "react-router-dom";
import { getUserPointsSum } from "../firebase/Authentication";
const firebase = credentials();

//let collection = firebase.firestore().collection("Kategorien");
const Quizlist: React.FC = () => {
  /*   let [doc, setDoc] = useState<firebase.firestore.DocumentData>([]);
  let [docs, setDocs] = useState<firebase.firestore.DocumentData[]>([]); */
  let [items, setItems] = useState<string[]>([]);
  let [categories, setCategories] = useState<string[]>([]);
  let [collection] = useState(firebase.firestore().collection("Kategorien"));
  let [userPoints, setUserPoints] = useState<number>();
  let [showAlert, setShowAlert] = useState<boolean>(false);
  let [userName, setUserName] = useState<string | undefined | null>();

  useEffect(() => {
    collection.get().then((snapshot) => {
      let data = snapshot.docs.map((doc) => {
        let id = doc.id;
        categories.push(id);
        setCategories(categories);
        // let objkey = Object.keys(doc.data());
        console.log(id);
        return id;
      });
      setItems([...data]);
    });
    if (firebase.auth().currentUser?.uid != null) {
      getUserPoints(firebase.auth().currentUser?.uid);
    }

    /* let unsubscribe = collection.onSnapshot((snapshot) => {
      console.log(snapshot.docs);
      let data = snapshot.docs.map((doc) => {
        console.log(doc.data());
        let id = doc.id;
        ids.push(id);
        setIds(ids);

        console.log(Object.keys(doc.data()));
        let objkey = Object.keys(doc.data());
        return objkey[0];
      });
      setItems(data);
      // console.log(data);
    }); */
    //return () => unsubscribe();
  }, [collection]);
  const history = useHistory();
  const Logout = () => {
    logout();
    history.push("/login");
  };
  const getUserPoints = async (uuid?: string) => {
    if (uuid != null) {
      userPoints = await getUserPointsSum(uuid);
      if (isNaN(userPoints)) {
        setUserPoints(0);
      } else {
        setUserPoints(userPoints);
      }
      userName = firebase.auth().currentUser?.email;
      userName = userName?.toLowerCase();
      const pos = userName?.indexOf("@");
      userName = userName?.substring(0, pos);
      setUserName(userName);

      setShowAlert(true);
    }
  };

  return (
    <Fragment>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonButton>{userName}</IonButton>
        </IonButtons>
        <IonTitle>Quizliste</IonTitle>
        <IonButtons slot="primary">
          <IonButton>{userPoints}</IonButton>
          <IonButton onClick={Logout}>
            <IonIcon icon={logOutOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonAlert
        isOpen={showAlert}
        header={"Benutzerpunkte"}
        message={`Deine Gesamtpunkteanzahl ist ${userPoints} `}
        buttons={["OK"]}
      ></IonAlert>
      <IonContent>
        <IonList>
          <IonCard>
            <IonCardContent>
              {items.map((item, index) => {
                return (
                  <IonItem key={index} href={`/category/${categories[index]}`}>
                    <IonLabel>{item}</IonLabel>
                  </IonItem>
                );
              })}
            </IonCardContent>
          </IonCard>
        </IonList>
      </IonContent>
    </Fragment>
  );
};
export default Quizlist;
