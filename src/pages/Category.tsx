import React, { Fragment, useEffect, useState } from "react";
import {
  IonContent,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonList,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { RouteComponentProps, useHistory } from "react-router";
import credentials from "../firebase/Credentials";
import Card from "../components/Card";
import { logOutOutline } from "ionicons/icons";
import { logout, getUserPointsSum } from "../firebase/Authentication";

const firebase = credentials();

const Category: React.FC<RouteComponentProps<{ category: string }>> = ({
  match,
}) => {
  let [subCategories, setSubCategories] = useState<string[]>([]);
  let [collection] = useState<
    firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  >();
  let [userPoints, setUserPoints] = useState<number>();
  let [userName, setUserName] = useState<string | undefined | null>();
  useEffect(() => {
    firebase
      .firestore()
      .collection("Kategorien")
      .doc(match.params.category)
      .collection("Unterkategorien")
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((doc) => {
          // console.log(doc.id);
          return doc.id;
        });
        setSubCategories(data);
      });
    /* doc.onSnapshot((snapshot) => {
      console.log(snapshot.data());
      if (snapshot.data()![match.params.item] != null) {
        console.log(snapshot.data()![match.params.item]);

        setItems([...snapshot.data()![match.params.item]]);
      }
    }); */
    // console.log("in useEffect von Category");
  }, [collection]);
  const questions = (item: string) => {
    console.log(item);
  };
  const history = useHistory();
  const Logout = () => {
    logout();
    history.push("/login");
  };
  return (
    <Fragment>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/quizlist"></IonBackButton>
        </IonButtons>
        <IonTitle> {match.params.category}</IonTitle>
        <IonButtons slot="primary">
          <IonButton></IonButton>
          <IonButton onClick={Logout}>
            <IonIcon icon={logOutOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonContent>
        <IonList>
          {subCategories.map((subcategory, index) => {
            return (
              <Card
                key={index}
                color="white"
                backgroundColor="#f542a1"
                category={match.params.category}
                subcategory={subcategory}
              >
                {" "}
                <div style={{ paddingTop: 50 }}>{subcategory}</div>
              </Card>
            );
          })}
        </IonList>
      </IonContent>
    </Fragment>
  );
};
export default Category;
